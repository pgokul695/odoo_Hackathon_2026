import{r as F,j as I}from"./index-TQprzHkU.js";import{R as S,P,M as Y}from"./Mesh-CwXV3WjE.js";import{T as _}from"./Triangle-64ffRKNB.js";function m(s){const t=s.replace("#","");return[parseInt(t.slice(0,2),16)/255,parseInt(t.slice(2,4),16)/255,parseInt(t.slice(4,6),16)/255]}const D=`
attribute vec2 uv;
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0, 1);
}
`,k=`
precision highp float;

uniform float uTime;
uniform vec3 uResolution;
uniform float uSpeed;
uniform float uInnerLines;
uniform float uOuterLines;
uniform float uWarpIntensity;
uniform float uRotation;
uniform float uEdgeFadeWidth;
uniform float uColorCycleSpeed;
uniform float uBrightness;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform vec2 uMouse;
uniform float uMouseInfluence;
uniform bool uEnableMouse;

#define HALF_PI 1.5707963

float hashF(float n) {
  return fract(sin(n * 127.1) * 43758.5453123);
}

float smoothNoise(float x) {
  float i = floor(x);
  float f = fract(x);
  float u = f * f * (3.0 - 2.0 * f);
  return mix(hashF(i), hashF(i + 1.0), u);
}

float displaceA(float coord, float t) {
  float result = sin(coord * 2.123) * 0.2;
  result += sin(coord * 3.234 + t * 4.345) * 0.1;
  result += sin(coord * 0.589 + t * 0.934) * 0.5;
  return result;
}

float displaceB(float coord, float t) {
  float result = sin(coord * 1.345) * 0.3;
  result += sin(coord * 2.734 + t * 3.345) * 0.2;
  result += sin(coord * 0.189 + t * 0.934) * 0.3;
  return result;
}

vec2 rotate2D(vec2 p, float angle) {
  float c = cos(angle);
  float s = sin(angle);
  return vec2(p.x * c - p.y * s, p.x * s + p.y * c);
}

void main() {
  vec2 coords = gl_FragCoord.xy / uResolution.xy;
  coords = coords * 2.0 - 1.0;
  coords = rotate2D(coords, uRotation);

  float halfT = uTime * uSpeed * 0.5;
  float fullT = uTime * uSpeed;

  float mouseWarp = 0.0;
  if (uEnableMouse) {
    vec2 mPos = rotate2D(uMouse * 2.0 - 1.0, uRotation);
    float mDist = length(coords - mPos);
    mouseWarp = uMouseInfluence * exp(-mDist * mDist * 4.0);
  }

  float warpAx = coords.x + displaceA(coords.y, halfT) * uWarpIntensity + mouseWarp;
  float warpAy = coords.y - displaceA(coords.x * cos(fullT) * 1.235, halfT) * uWarpIntensity;
  float warpBx = coords.x + displaceB(coords.y, halfT) * uWarpIntensity + mouseWarp;
  float warpBy = coords.y - displaceB(coords.x * sin(fullT) * 1.235, halfT) * uWarpIntensity;

  vec2 fieldA = vec2(warpAx, warpAy);
  vec2 fieldB = vec2(warpBx, warpBy);
  vec2 blended = mix(fieldA, fieldB, mix(fieldA, fieldB, 0.5));

  float fadeTop = smoothstep(uEdgeFadeWidth, uEdgeFadeWidth + 0.4, blended.y);
  float fadeBottom = smoothstep(-uEdgeFadeWidth, -(uEdgeFadeWidth + 0.4), blended.y);
  float vMask = 1.0 - max(fadeTop, fadeBottom);

  float tileCount = mix(uOuterLines, uInnerLines, vMask);
  float scaledY = blended.y * tileCount;
  float nY = smoothNoise(abs(scaledY));

  float ridge = pow(
    step(abs(nY - blended.x) * 2.0, HALF_PI) * cos(2.0 * (nY - blended.x)),
    5.0
  );

  float lines = 0.0;
  for (float i = 1.0; i < 3.0; i += 1.0) {
    lines += pow(max(fract(scaledY), fract(-scaledY)), i * 2.0);
  }

  float pattern = vMask * lines;

  float cycleT = fullT * uColorCycleSpeed;
  float rChannel = (pattern + lines * ridge) * (cos(blended.y + cycleT * 0.234) * 0.5 + 1.0);
  float gChannel = (pattern + vMask * ridge) * (sin(blended.x + cycleT * 1.745) * 0.5 + 1.0);
  float bChannel = (pattern + lines * ridge) * (cos(blended.x + cycleT * 0.534) * 0.5 + 1.0);

  vec3 col = (rChannel * uColor1 + gChannel * uColor2 + bChannel * uColor3) * uBrightness;
  float alpha = clamp(length(col), 0.0, 1.0);

  gl_FragColor = vec4(col, alpha);
}
`;function N({speed:s=.3,innerLineCount:t=32,outerLineCount:p=36,warpIntensity:h=1,rotation:g=-45,edgeFadeWidth:x=0,colorCycleSpeed:y=1,brightness:C=.2,color1:w="#ffffff",color2:T="#ffffff",color3:M="#ffffff",enableMouseInteraction:l=!0,mouseInfluence:E=2}){const f=F.useRef(null);return F.useEffect(()=>{if(!f.current)return;const r=f.current,c=new S({alpha:!0,premultipliedAlpha:!1}),e=c.gl;e.clearColor(0,0,0,0);let o,n=[.5,.5],u=[.5,.5];function W(a){const i=e.canvas.getBoundingClientRect();u=[(a.clientX-i.left)/i.width,1-(a.clientY-i.top)/i.height]}function A(){u=[.5,.5]}function d(){c.setSize(r.offsetWidth,r.offsetHeight),o&&(o.uniforms.uResolution.value=[e.canvas.width,e.canvas.height,e.canvas.width/e.canvas.height])}window.addEventListener("resize",d),d();const L=new _(e),R=g*Math.PI/180;o=new P(e,{vertex:D,fragment:k,uniforms:{uTime:{value:0},uResolution:{value:[e.canvas.width,e.canvas.height,e.canvas.width/e.canvas.height]},uSpeed:{value:s},uInnerLines:{value:t},uOuterLines:{value:p},uWarpIntensity:{value:h},uRotation:{value:R},uEdgeFadeWidth:{value:x},uColorCycleSpeed:{value:y},uBrightness:{value:C},uColor1:{value:m(w)},uColor2:{value:m(T)},uColor3:{value:m(M)},uMouse:{value:new Float32Array([.5,.5])},uMouseInfluence:{value:E},uEnableMouse:{value:l}}});const b=new Y(e,{geometry:L,program:o});r.appendChild(e.canvas),l&&(e.canvas.addEventListener("mousemove",W),e.canvas.addEventListener("mouseleave",A));let v;function B(a){v=requestAnimationFrame(B),o.uniforms.uTime.value=a*.001,l?(n[0]+=.05*(u[0]-n[0]),n[1]+=.05*(u[1]-n[1]),o.uniforms.uMouse.value[0]=n[0],o.uniforms.uMouse.value[1]=n[1]):(o.uniforms.uMouse.value[0]=.5,o.uniforms.uMouse.value[1]=.5),c.render({scene:b})}return v=requestAnimationFrame(B),()=>{var a;cancelAnimationFrame(v),window.removeEventListener("resize",d),l&&(e.canvas.removeEventListener("mousemove",W),e.canvas.removeEventListener("mouseleave",A)),r.removeChild(e.canvas),(a=e.getExtension("WEBGL_lose_context"))==null||a.loseContext()}},[s,t,p,h,g,x,y,C,w,T,M,l,E]),I.jsx("div",{ref:f,className:"line-waves-container"})}export{N as default};
