import{r as l,j as E}from"./index-TQprzHkU.js";import{R as M,P as A,M as S}from"./Mesh-CwXV3WjE.js";import{T}from"./Triangle-64ffRKNB.js";import{C as m}from"./Color-YRkaOI4u.js";const F=`
attribute vec2 uv;
attribute vec2 position;

varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = vec4(position, 0, 1);
}
`,L=`
precision highp float;

uniform float uTime;
uniform vec3 uColor;
uniform vec3 uResolution;
uniform vec2 uMouse;
uniform float uAmplitude;
uniform float uSpeed;

varying vec2 vUv;

void main() {
  float mr = min(uResolution.x, uResolution.y);
  vec2 uv = (vUv.xy * 2.0 - 1.0) * uResolution.xy / mr;

  uv += (uMouse - vec2(0.5)) * uAmplitude;

  float d = -uTime * 0.5 * uSpeed;
  float a = 0.0;
  for (float i = 0.0; i < 8.0; ++i) {
    a += cos(i - d - a * uv.x);
    d += sin(uv.y * i + a);
  }
  d += uTime * 0.5 * uSpeed;
  vec3 col = vec3(cos(uv * vec2(d, a)) * 0.6 + 0.4, cos(a + d) * 0.5 + 0.5);
  col = cos(col * cos(vec3(d, a, 2.5)) * 0.5 + 0.5) * uColor;
  gl_FragColor = vec4(col, 1.0);
}
`;function j({color:f=[1,1,1],speed:d=1,amplitude:h=.1,mouseReact:r=!0,...y}){const u=l.useRef(null),s=l.useRef({x:.5,y:.5});return l.useEffect(()=>{if(!u.current)return;const n=u.current,a=new M,e=a.gl;e.clearColor(1,1,1,1);let t;function c(){a.setSize(n.offsetWidth*1,n.offsetHeight*1),t&&(t.uniforms.uResolution.value=new m(e.canvas.width,e.canvas.height,e.canvas.width/e.canvas.height))}window.addEventListener("resize",c,!1),c();const C=new T(e);t=new A(e,{vertex:F,fragment:L,uniforms:{uTime:{value:0},uColor:{value:new m(...f)},uResolution:{value:new m(e.canvas.width,e.canvas.height,e.canvas.width/e.canvas.height)},uMouse:{value:new Float32Array([s.current.x,s.current.y])},uAmplitude:{value:h},uSpeed:{value:d}}});const R=new S(e,{geometry:C,program:t});let v;function g(o){v=requestAnimationFrame(g),t.uniforms.uTime.value=o*.001,a.render({scene:R})}v=requestAnimationFrame(g),n.appendChild(e.canvas);function p(o){const i=n.getBoundingClientRect(),w=(o.clientX-i.left)/i.width,x=1-(o.clientY-i.top)/i.height;s.current={x:w,y:x},t.uniforms.uMouse.value[0]=w,t.uniforms.uMouse.value[1]=x}return r&&n.addEventListener("mousemove",p),()=>{var o;cancelAnimationFrame(v),window.removeEventListener("resize",c),r&&n.removeEventListener("mousemove",p),n.removeChild(e.canvas),(o=e.getExtension("WEBGL_lose_context"))==null||o.loseContext()}},[f,d,h,r]),E.jsx("div",{ref:u,className:"iridescence-container",...y})}export{j as default};
