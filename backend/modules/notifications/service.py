from .adapters import ProtoPostAdapter, ActivityLogAdapter

class NotificationService:
    def __init__(self):
        self.email_adapter = ProtoPostAdapter()
        self.activity_log = ActivityLogAdapter()

    async def send_email(self, to: str, purpose: str, code: str):
        if purpose == "SIGNUP_VERIFICATION":
            subject = "Verify your AssetFlow account"
            html = f"""
            <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto;">
                <h2>Verify your email</h2>
                <p>Your verification code is:</p>
                <h1 style="font-size: 32px; letter-spacing: 5px; color: #1a56db;">{code}</h1>
                <p style="color: #666; font-size: 14px;">This code expires in 10 minutes.</p>
                <p style="color: #999; font-size: 12px; margin-top: 30px;">If you didn't request this, you can safely ignore this email.</p>
            </div>
            """
        elif purpose == "PASSWORD_RESET":
            subject = "Your AssetFlow password reset code"
            html = f"""
            <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto;">
                <h2>Reset your password</h2>
                <p>Your password reset code is:</p>
                <h1 style="font-size: 32px; letter-spacing: 5px; color: #1a56db;">{code}</h1>
                <p style="color: #666; font-size: 14px;">This code expires in 10 minutes.</p>
                <p style="color: #999; font-size: 12px; margin-top: 30px;">If you didn't request a password reset, you can safely ignore this email.</p>
            </div>
            """
        elif purpose == "LOGIN_2FA":
            subject = "Your AssetFlow sign-in code"
            html = f"""
            <div style="font-family: sans-serif; max-width: 500px; margin: 0 auto;">
                <h2>Two-Factor Authentication</h2>
                <p>Your sign-in code is:</p>
                <h1 style="font-size: 32px; letter-spacing: 5px; color: #1a56db;">{code}</h1>
                <p style="color: #666; font-size: 14px;">This code expires in 10 minutes.</p>
                <p style="color: #999; font-size: 12px; margin-top: 30px;">If you didn't attempt to sign in, someone else might have your password. Consider resetting it.</p>
            </div>
            """
        else:
            raise ValueError(f"Unknown OTP purpose: {purpose}")

        result = await self.email_adapter.send(to=[to], subject=subject, html=html)
        
        log_msg = f"OTP for {purpose} sent to {to}. Success: {result.success}"
        if not result.success:
            log_msg += f". Error: {result.raw_error}"
        self.activity_log.log("EMAIL_SEND", log_msg)
        
        return result

notification_service = NotificationService()
