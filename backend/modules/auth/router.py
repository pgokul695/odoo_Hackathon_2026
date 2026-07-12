import random
import hashlib
from datetime import datetime, timedelta
from fastapi import APIRouter, Depends, HTTPException, status, Request
from sqlalchemy.orm import Session
from pydantic import BaseModel
from typing import Optional

from core.database import get_db
from core.response import StandardResponse, ErrorResponse
from core.security import get_password_hash, verify_password, create_access_token, get_current_user, check_rate_limit
from shared.models import User, OtpCode
from modules.notifications.service import notification_service

router = APIRouter()

# --- Pydantic Schemas ---
class SignupRequest(BaseModel):
    name: str
    email: str
    password: str

class VerifyOtpRequest(BaseModel):
    email: str
    code: str

class ResendOtpRequest(BaseModel):
    email: str
    purpose: str

class LoginRequest(BaseModel):
    email: str
    password: str

class ForgotPasswordRequest(BaseModel):
    email: str

class ResetPasswordRequest(BaseModel):
    email: str
    code: str
    new_password: str

class TwoFactorSettingsRequest(BaseModel):
    enabled: bool
    current_password: Optional[str] = None

# --- Helper Functions ---
def _generate_otp() -> str:
    return f"{random.randint(0, 999999):06d}"

def _hash_otp(code: str) -> str:
    return hashlib.sha256(code.encode()).hexdigest()

async def _issue_otp(db: Session, user: User, purpose: str):
    # Invalidate previous active OTPs for this purpose
    db.query(OtpCode).filter(
        OtpCode.user_id == user.id,
        OtpCode.purpose == purpose,
        OtpCode.consumed_at == None,
        OtpCode.expires_at > datetime.utcnow()
    ).update({"consumed_at": datetime.utcnow()})
    
    code = _generate_otp()
    code_hash = _hash_otp(code)
    
    otp = OtpCode(
        user_id=user.id,
        purpose=purpose,
        code_hash=code_hash,
        expires_at=datetime.utcnow() + timedelta(minutes=10)
    )
    db.add(otp)
    db.commit()
    
    # Send email async
    await notification_service.send_email(user.email, purpose, code)

# --- Routes ---

@router.post("/signup/", response_model=StandardResponse)
async def signup(req: SignupRequest, request: Request, db: Session = Depends(get_db)):
    client_ip = request.client.host if request.client else "unknown"
    check_rate_limit(client_ip)
    
    if db.query(User).filter(User.email == req.email).first():
        return ErrorResponse(message="Email already registered")
        
    user = User(
        name=req.name,
        email=req.email,
        hashed_password=get_password_hash(req.password)
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    
    await _issue_otp(db, user, "SIGNUP_VERIFICATION")
    
    return StandardResponse(message="User created. Please check your email for the verification code.")

@router.post("/verify-signup-otp/", response_model=StandardResponse)
async def verify_signup_otp(req: VerifyOtpRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == req.email).first()
    if not user:
        return ErrorResponse(message="Invalid request")
        
    otp = db.query(OtpCode).filter(
        OtpCode.user_id == user.id,
        OtpCode.purpose == "SIGNUP_VERIFICATION",
        OtpCode.consumed_at == None
    ).order_by(OtpCode.created_at.desc()).first()
    
    if not otp or otp.expires_at < datetime.utcnow():
        return ErrorResponse(message="OTP expired or invalid")
        
    if otp.attempts >= otp.max_attempts:
        return ErrorResponse(message="Too many failed attempts. Please request a new code.")
        
    if otp.code_hash != _hash_otp(req.code):
        otp.attempts += 1
        db.commit()
        return ErrorResponse(message="Invalid verification code")
        
    otp.consumed_at = datetime.utcnow()
    user.email_verified_at = datetime.utcnow()
    db.commit()
    
    access_token = create_access_token(data={"sub": str(user.id)})
    return StandardResponse(data={"token": access_token, "user": {"id": str(user.id), "name": user.name, "email": user.email}})

@router.post("/resend-otp/", response_model=StandardResponse)
async def resend_otp(req: ResendOtpRequest, db: Session = Depends(get_db)):
    # Rate limit by email to enforce 60s cooldown
    check_rate_limit(f"resend_{req.email}", window_seconds=60)
    
    user = db.query(User).filter(User.email == req.email).first()
    if not user:
        # Silently succeed to not leak emails
        return StandardResponse(message="If the email is registered, a code has been sent.")
        
    await _issue_otp(db, user, req.purpose)
    return StandardResponse(message="If the email is registered, a code has been sent.")

@router.post("/login/", response_model=StandardResponse)
async def login(req: LoginRequest, request: Request, db: Session = Depends(get_db)):
    client_ip = request.client.host if request.client else "unknown"
    check_rate_limit(f"login_{client_ip}")
    
    user = db.query(User).filter(User.email == req.email).first()
    if not user or not verify_password(req.password, user.hashed_password):
        # Return generic 400 manually matching the envelope structure 
        # (could use HTTPException but returning ErrorResponse model is standard here per envelope rules)
        return ErrorResponse(message="Invalid email or password")
        
    if not user.email_verified_at:
        # Re-issue signup OTP
        await _issue_otp(db, user, "SIGNUP_VERIFICATION")
        return StandardResponse(success=False, message="Please verify your email before logging in. A new code has been sent.", meta={"status_code": 403})
        
    if user.two_factor_enabled:
        await _issue_otp(db, user, "LOGIN_2FA")
        return StandardResponse(data={"requires_2fa": True, "email": user.email})
        
    access_token = create_access_token(data={"sub": str(user.id)})
    return StandardResponse(data={"token": access_token, "user": {"id": str(user.id), "name": user.name, "email": user.email}})

@router.post("/login/verify-otp/", response_model=StandardResponse)
async def login_verify_otp(req: VerifyOtpRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == req.email).first()
    if not user:
        return ErrorResponse(message="Invalid request")
        
    otp = db.query(OtpCode).filter(
        OtpCode.user_id == user.id,
        OtpCode.purpose == "LOGIN_2FA",
        OtpCode.consumed_at == None
    ).order_by(OtpCode.created_at.desc()).first()
    
    if not otp or otp.expires_at < datetime.utcnow():
        return ErrorResponse(message="OTP expired or invalid")
        
    if otp.attempts >= otp.max_attempts:
        return ErrorResponse(message="Too many failed attempts. Please request a new code.")
        
    if otp.code_hash != _hash_otp(req.code):
        otp.attempts += 1
        db.commit()
        return ErrorResponse(message="Invalid verification code")
        
    otp.consumed_at = datetime.utcnow()
    db.commit()
    
    access_token = create_access_token(data={"sub": str(user.id)})
    return StandardResponse(data={"token": access_token, "user": {"id": str(user.id), "name": user.name, "email": user.email}})

@router.post("/forgot-password/", response_model=StandardResponse)
async def forgot_password(req: ForgotPasswordRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == req.email).first()
    if user:
        await _issue_otp(db, user, "PASSWORD_RESET")
    return StandardResponse(message="If that email exists, we've sent a code.")

@router.post("/reset-password/", response_model=StandardResponse)
async def reset_password(req: ResetPasswordRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == req.email).first()
    if not user:
        return ErrorResponse(message="Invalid request")
        
    otp = db.query(OtpCode).filter(
        OtpCode.user_id == user.id,
        OtpCode.purpose == "PASSWORD_RESET",
        OtpCode.consumed_at == None
    ).order_by(OtpCode.created_at.desc()).first()
    
    if not otp or otp.expires_at < datetime.utcnow():
        return ErrorResponse(message="OTP expired or invalid")
        
    if otp.attempts >= otp.max_attempts:
        return ErrorResponse(message="Too many failed attempts. Please request a new code.")
        
    if otp.code_hash != _hash_otp(req.code):
        otp.attempts += 1
        db.commit()
        return ErrorResponse(message="Invalid verification code")
        
    otp.consumed_at = datetime.utcnow()
    user.hashed_password = get_password_hash(req.new_password)
    db.commit()
    
    return StandardResponse(message="Password has been reset successfully.")

@router.get("/me/", response_model=StandardResponse)
async def get_me(current_user: User = Depends(get_current_user)):
    return StandardResponse(data={"id": str(current_user.id), "name": current_user.name, "email": current_user.email, "two_factor_enabled": current_user.two_factor_enabled})

@router.post("/logout/", response_model=StandardResponse)
async def logout():
    return StandardResponse(message="Logged out successfully.")

@router.put("/settings/two-factor/", response_model=StandardResponse)
async def toggle_two_factor(req: TwoFactorSettingsRequest, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    if req.enabled:
        if not req.current_password or not verify_password(req.current_password, current_user.hashed_password):
            return ErrorResponse(message="Current password is required and must be valid to enable 2FA.")
            
    current_user.two_factor_enabled = req.enabled
    db.commit()
    return StandardResponse(message=f"Two-factor authentication {'enabled' if req.enabled else 'disabled'}.")
