import{r as B,j as G}from"./index-TQprzHkU.js";import{R as U,P as _,M as b}from"./Mesh-CwXV3WjE.js";import{T as z}from"./Triangle-64ffRKNB.js";function F(s){const u=s.replace("#","");return[parseInt(u.slice(0,2),16)/255,parseInt(u.slice(2,4),16)/255,parseInt(u.slice(4,6),16)/255]}const D=`
attribute vec2 uv;
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0, 1);
}
`,W=`
precision highp float;

uniform float uTime;
uniform vec3 uResolution;
uniform float uSpeed;
uniform float uScale;
uniform float uRingCount;
uniform float uSpokeCount;
uniform float uRingThickness;
uniform float uSpokeThickness;
uniform float uSweepSpeed;
uniform float uSweepWidth;
uniform float uSweepLobes;
uniform vec3 uColor;
uniform vec3 uBgColor;
uniform float uFalloff;
uniform float uBrightness;
uniform vec2 uMouse;
uniform float uMouseInfluence;
uniform bool uEnableMouse;

#define TAU 6.28318530718
#define PI 3.14159265359

void main() {
  vec2 st = gl_FragCoord.xy / uResolution.xy;
  st = st * 2.0 - 1.0;
  st.x *= uResolution.x / uResolution.y;

  if (uEnableMouse) {
    vec2 mShift = (uMouse * 2.0 - 1.0);
    mShift.x *= uResolution.x / uResolution.y;
    st -= mShift * uMouseInfluence;
  }

  st *= uScale;

  float dist = length(st);
  float theta = atan(st.y, st.x);
  float t = uTime * uSpeed;

  float ringPhase = dist * uRingCount - t;
  float ringDist = abs(fract(ringPhase) - 0.5);
  float ringGlow = 1.0 - smoothstep(0.0, uRingThickness, ringDist);

  float spokeAngle = abs(fract(theta * uSpokeCount / TAU + 0.5) - 0.5) * TAU / uSpokeCount;
  float arcDist = spokeAngle * dist;
  float spokeGlow = (1.0 - smoothstep(0.0, uSpokeThickness, arcDist)) * smoothstep(0.0, 0.1, dist);

  float sweepPhase = t * uSweepSpeed;
  float sweepBeam = pow(max(0.5 * sin(uSweepLobes * theta + sweepPhase) + 0.5, 0.0), uSweepWidth);

  float fade = smoothstep(1.05, 0.85, dist) * pow(max(1.0 - dist, 0.0), uFalloff);

  float intensity = max((ringGlow + spokeGlow + sweepBeam) * fade * uBrightness, 0.0);
  vec3 col = uColor * intensity + uBgColor;

  float alpha = clamp(length(col), 0.0, 1.0);
  gl_FragColor = vec4(col, alpha);
}
`;function H({speed:s=1,scale:u=.5,ringCount:h=10,spokeCount:p=10,ringThickness:d=.05,spokeThickness:g=.01,sweepSpeed:w=1,sweepWidth:S=2,sweepLobes:x=1,color:R="#9f29ff",backgroundColor:C="#000000",falloff:M=2,brightness:E=1,enableMouseInteraction:n=!0,mouseInfluence:T=.1}){const f=B.useRef(null);return B.useEffect(()=>{if(!f.current)return;const i=f.current,v=new U({alpha:!0,premultipliedAlpha:!1}),e=v.gl;e.clearColor(0,0,0,0);let t,a=[.5,.5],l=[.5,.5];function k(o){const r=e.canvas.getBoundingClientRect();l=[(o.clientX-r.left)/r.width,1-(o.clientY-r.top)/r.height]}function y(){l=[.5,.5]}function c(){v.setSize(i.offsetWidth,i.offsetHeight),t&&(t.uniforms.uResolution.value=[e.canvas.width,e.canvas.height,e.canvas.width/e.canvas.height])}window.addEventListener("resize",c),c();const L=new z(e);t=new _(e,{vertex:D,fragment:W,uniforms:{uTime:{value:0},uResolution:{value:[e.canvas.width,e.canvas.height,e.canvas.width/e.canvas.height]},uSpeed:{value:s},uScale:{value:u},uRingCount:{value:h},uSpokeCount:{value:p},uRingThickness:{value:d},uSpokeThickness:{value:g},uSweepSpeed:{value:w},uSweepWidth:{value:S},uSweepLobes:{value:x},uColor:{value:F(R)},uBgColor:{value:F(C)},uFalloff:{value:M},uBrightness:{value:E},uMouse:{value:new Float32Array([.5,.5])},uMouseInfluence:{value:T},uEnableMouse:{value:n}}});const P=new b(e,{geometry:L,program:t});i.appendChild(e.canvas),n&&(e.canvas.addEventListener("mousemove",k),e.canvas.addEventListener("mouseleave",y));let m;function A(o){m=requestAnimationFrame(A),t.uniforms.uTime.value=o*.001,n?(a[0]+=.05*(l[0]-a[0]),a[1]+=.05*(l[1]-a[1]),t.uniforms.uMouse.value[0]=a[0],t.uniforms.uMouse.value[1]=a[1]):(t.uniforms.uMouse.value[0]=.5,t.uniforms.uMouse.value[1]=.5),v.render({scene:P})}return m=requestAnimationFrame(A),()=>{var o;cancelAnimationFrame(m),window.removeEventListener("resize",c),n&&(e.canvas.removeEventListener("mousemove",k),e.canvas.removeEventListener("mouseleave",y)),i.removeChild(e.canvas),(o=e.getExtension("WEBGL_lose_context"))==null||o.loseContext()}},[s,u,h,p,d,g,w,S,x,R,C,M,E,n,T]),G.jsx("div",{ref:f,className:"radar-container"})}export{H as default};
