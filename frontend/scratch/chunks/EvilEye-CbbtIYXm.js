import{r as T,j as A}from"./index-TQprzHkU.js";import{R as C,P as N,M as B}from"./Mesh-CwXV3WjE.js";import{T as P}from"./Texture-BkQWYNP2.js";import{T as L}from"./Triangle-64ffRKNB.js";function F(a){const l=a.replace("#","");return[parseInt(l.slice(0,2),16)/255,parseInt(l.slice(2,4),16)/255,parseInt(l.slice(4,6),16)/255]}function k(a=256){const l=new Uint8Array(a*a*4);function p(s,c,i){let n=s*374761393+c*668265263+i*1274126177;return n=Math.imul(n^n>>>13,1274126177),((n^n>>>16)>>>0)/4294967296}function y(s,c,i,n){const m=s/a*i,f=c/a*i,u=Math.floor(m),o=Math.floor(f),v=m-u,t=f-o,e=i|0,g=p((u%e+e)%e,(o%e+e)%e,n),r=p(((u+1)%e+e)%e,(o%e+e)%e,n),d=p((u%e+e)%e,((o+1)%e+e)%e,n),x=p(((u+1)%e+e)%e,((o+1)%e+e)%e,n);return g*(1-v)*(1-t)+r*v*(1-t)+d*(1-v)*t+x*v*t}for(let s=0;s<a;s++)for(let c=0;c<a;c++){let i=0,n=.4,m=0;for(let o=0;o<8;o++){const v=32*(1<<o);i+=n*y(c,s,v,o*31),m+=n,n*=.65}i/=m,i=(i-.5)*2.2+.5,i=Math.max(0,Math.min(1,i));const f=Math.round(i*255),u=(s*a+c)*4;l[u]=f,l[u+1]=f,l[u+2]=f,l[u+3]=255}return l}const U=`
attribute vec2 uv;
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0, 1);
}
`,D=`
precision highp float;

uniform float uTime;
uniform vec3 uResolution;
uniform sampler2D uNoiseTexture;
uniform float uPupilSize;
uniform float uIrisWidth;
uniform float uGlowIntensity;
uniform float uIntensity;
uniform float uScale;
uniform float uNoiseScale;
uniform vec2 uMouse;
uniform float uPupilFollow;
uniform float uFlameSpeed;
uniform vec3 uEyeColor;
uniform vec3 uBgColor;

void main() {
  vec2 uv = (gl_FragCoord.xy * 2.0 - uResolution.xy) / uResolution.y;
  uv /= uScale;
  float ft = uTime * uFlameSpeed;

  float polarRadius = length(uv) * 2.0;
  float polarAngle = (2.0 * atan(uv.x, uv.y)) / 6.28 * 0.3;
  vec2 polarUv = vec2(polarRadius, polarAngle);

  vec4 noiseA = texture2D(uNoiseTexture, polarUv * vec2(0.2, 7.0) * uNoiseScale + vec2(-ft * 0.1, 0.0));
  vec4 noiseB = texture2D(uNoiseTexture, polarUv * vec2(0.3, 4.0) * uNoiseScale + vec2(-ft * 0.2, 0.0));
  vec4 noiseC = texture2D(uNoiseTexture, polarUv * vec2(0.1, 5.0) * uNoiseScale + vec2(-ft * 0.1, 0.0));

  float distanceMask = 1.0 - length(uv);

  // Inner ring
  float innerRing = clamp(-1.0 * ((distanceMask - 0.7) / uIrisWidth), 0.0, 1.0);
  innerRing = (innerRing * distanceMask - 0.2) / 0.28;
  innerRing += noiseA.r - 0.5;
  innerRing *= 1.3;
  innerRing = clamp(innerRing, 0.0, 1.0);

  float outerRing = clamp(-1.0 * ((distanceMask - 0.5) / 0.2), 0.0, 1.0);
  outerRing = (outerRing * distanceMask - 0.1) / 0.38;
  outerRing += noiseC.r - 0.5;
  outerRing *= 1.3;
  outerRing = clamp(outerRing, 0.0, 1.0);

  innerRing += outerRing;

  // Inner eye
  float innerEye = distanceMask - 0.1 * 2.0;
  innerEye *= noiseB.r * 2.0;

  // Pupil with cursor tracking
  vec2 pupilOffset = uMouse * uPupilFollow * 0.12;
  vec2 pupilUv = uv - pupilOffset;
  float pupil = 1.0 - length(pupilUv * vec2(9.0, 2.3));
  pupil *= uPupilSize;
  pupil = clamp(pupil, 0.0, 1.0);
  pupil /= 0.35;

  // Outer eye
  float outerEyeGlow = 1.0 - length(uv * vec2(0.5, 1.5));
  outerEyeGlow = clamp(outerEyeGlow + 0.5, 0.0, 1.0);
  outerEyeGlow += noiseC.r - 0.5;
  float outerBgGlow = outerEyeGlow;
  outerEyeGlow = pow(outerEyeGlow, 2.0);
  outerEyeGlow += distanceMask;
  outerEyeGlow *= uGlowIntensity;
  outerEyeGlow = clamp(outerEyeGlow, 0.0, 1.0);
  outerEyeGlow *= pow(1.0 - distanceMask, 2.0) * 2.5;

  // Outer eye bg glow
  outerBgGlow += distanceMask;
  outerBgGlow = pow(outerBgGlow, 0.5);
  outerBgGlow *= 0.15;

  vec3 color = uEyeColor * uIntensity * clamp(max(innerRing + innerEye, outerEyeGlow + outerBgGlow) - pupil, 0.0, 3.0);
  color += uBgColor;

  gl_FragColor = vec4(color, 1.0);
}
`;function b({eyeColor:a="#FF6F37",intensity:l=1.5,pupilSize:p=.6,irisWidth:y=.25,glowIntensity:s=.35,scale:c=.8,noiseScale:i=1,pupilFollow:n=1,flameSpeed:m=1,backgroundColor:f="#000000"}){const u=T.useRef(null);return T.useEffect(()=>{if(!u.current)return;const o=u.current,v=new C({alpha:!0,premultipliedAlpha:!1}),t=v.gl;t.clearColor(0,0,0,0);const e=k(256),g=new P(t,{image:e,width:256,height:256,generateMipmaps:!1,flipY:!1});g.minFilter=t.LINEAR,g.magFilter=t.LINEAR,g.wrapS=t.REPEAT,g.wrapT=t.REPEAT;const r={x:0,y:0,tx:0,ty:0};function d(h){const E=o.getBoundingClientRect();r.tx=(h.clientX-E.left)/E.width*2-1,r.ty=-((h.clientY-E.top)/E.height*2-1)}function x(){r.tx=0,r.ty=0}o.addEventListener("mousemove",d),o.addEventListener("mouseleave",x);let w;function R(){v.setSize(o.offsetWidth,o.offsetHeight),w&&(w.uniforms.uResolution.value=[t.canvas.width,t.canvas.height,t.canvas.width/t.canvas.height])}window.addEventListener("resize",R),R();const I=new L(t);w=new N(t,{vertex:U,fragment:D,uniforms:{uTime:{value:0},uResolution:{value:[t.canvas.width,t.canvas.height,t.canvas.width/t.canvas.height]},uNoiseTexture:{value:g},uPupilSize:{value:p},uIrisWidth:{value:y},uGlowIntensity:{value:s},uIntensity:{value:l},uScale:{value:c},uNoiseScale:{value:i},uMouse:{value:[0,0]},uPupilFollow:{value:n},uFlameSpeed:{value:m},uEyeColor:{value:F(a)},uBgColor:{value:F(f)}}});const S=new B(t,{geometry:I,program:w});o.appendChild(t.canvas);let M;function G(h){M=requestAnimationFrame(G),r.x+=(r.tx-r.x)*.05,r.y+=(r.ty-r.y)*.05,w.uniforms.uMouse.value=[r.x,r.y],w.uniforms.uTime.value=h*.001,v.render({scene:S})}return M=requestAnimationFrame(G),()=>{var h;cancelAnimationFrame(M),window.removeEventListener("resize",R),o.removeEventListener("mousemove",d),o.removeEventListener("mouseleave",x),o.removeChild(t.canvas),(h=t.getExtension("WEBGL_lose_context"))==null||h.loseContext()}},[a,l,p,y,s,c,i,n,m,f]),A.jsx("div",{ref:u,className:"evil-eye-container"})}export{b as default};
