import{r as n,W as X,Q as Z,U as D,V as A,a2 as F,Z as J,$ as K,Y as ee,j as te}from"./index-TQprzHkU.js";const ue=`
void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`,oe=`
precision highp float;

uniform float uTime, uAttenuation, uLineThickness;
uniform float uBaseRadius, uRadiusStep, uScaleRate;
uniform float uOpacity, uNoiseAmount, uRotation, uRingGap;
uniform float uFadeIn, uFadeOut;
uniform float uMouseInfluence, uHoverAmount, uHoverScale, uParallax, uBurst;
uniform vec2 uResolution, uMouse;
uniform vec3 uColor, uColorTwo;
uniform int uRingCount;

const float HP = 1.5707963;
const float CYCLE = 3.45;

float fade(float t) {
  return t < uFadeIn ? smoothstep(0.0, uFadeIn, t) : 1.0 - smoothstep(uFadeOut, CYCLE - 0.2, t);
}

float ring(vec2 p, float ri, float cut, float t0, float px) {
  float t = mod(uTime + t0, CYCLE);
  float r = ri + t / CYCLE * uScaleRate;
  float d = abs(length(p) - r);
  float a = atan(abs(p.y), abs(p.x)) / HP;
  float th = max(1.0 - a, 0.5) * px * uLineThickness;
  float h = (1.0 - smoothstep(th, th * 1.5, d)) + 1.0;
  d += pow(cut * a, 3.0) * r;
  return h * exp(-uAttenuation * d) * fade(t);
}

void main() {
  float px = 1.0 / min(uResolution.x, uResolution.y);
  vec2 p = (gl_FragCoord.xy - 0.5 * uResolution.xy) * px;
  float cr = cos(uRotation), sr = sin(uRotation);
  p = mat2(cr, -sr, sr, cr) * p;
  p -= uMouse * uMouseInfluence;
  float sc = mix(1.0, uHoverScale, uHoverAmount) + uBurst * 0.3;
  p /= sc;
  vec3 c = vec3(0.0);
  float rcf = max(float(uRingCount) - 1.0, 1.0);
  for (int i = 0; i < 10; i++) {
    if (i >= uRingCount) break;
    float fi = float(i);
    vec2 pr = p - fi * uParallax * uMouse;
    vec3 rc = mix(uColor, uColorTwo, fi / rcf);
    c = mix(c, rc, vec3(ring(pr, uBaseRadius + fi * uRadiusStep, pow(uRingGap, fi), i == 0 ? 0.0 : 2.95 * fi, px)));
  }
  c *= 1.0 + uBurst * 2.0;
  float n = fract(sin(dot(gl_FragCoord.xy + uTime * 100.0, vec2(12.9898, 78.233))) * 43758.5453);
  c += (n - 0.5) * uNoiseAmount;
  gl_FragColor = vec4(c, max(c.r, max(c.g, c.b)) * uOpacity);
}
`;function ae({color:T="#fc42ff",colorTwo:y="#42fcff",speed:I=1,ringCount:b=6,attenuation:H=10,lineThickness:B=2,baseRadius:O=.35,radiusStep:P=.1,scaleRate:k=.1,opacity:G=1,blur:d=0,noiseAmount:z=.1,rotation:Y=0,ringGap:N=1.5,fadeIn:j=.7,fadeOut:W=.5,followMouse:_=!1,mouseInfluence:q=.2,hoverScale:V=1.2,parallax:$=.05,clickBurst:Q=!1}){const p=n.useRef(null),R=n.useRef(null),r=n.useRef([0,0]),s=n.useRef([0,0]),c=n.useRef(0),v=n.useRef(!1),i=n.useRef(0);return R.current={color:T,colorTwo:y,speed:I,ringCount:b,attenuation:H,lineThickness:B,baseRadius:O,radiusStep:P,scaleRate:k,opacity:G,noiseAmount:z,rotation:Y,ringGap:N,fadeIn:j,fadeOut:W,followMouse:_,mouseInfluence:q,hoverScale:V,parallax:$,clickBurst:Q},n.useEffect(()=>{const u=p.current;if(!u)return;let o;try{o=new X({alpha:!0})}catch{return}if(!o.capabilities.isWebGL2){o.dispose();return}o.setClearColor(0,0),u.appendChild(o.domElement);const h=new Z,x=new D(-.5,.5,.5,-.5,.1,10);x.position.z=1;const t={uTime:{value:0},uAttenuation:{value:0},uResolution:{value:new A},uColor:{value:new F},uColorTwo:{value:new F},uLineThickness:{value:0},uBaseRadius:{value:0},uRadiusStep:{value:0},uScaleRate:{value:0},uRingCount:{value:0},uOpacity:{value:1},uNoiseAmount:{value:0},uRotation:{value:0},uRingGap:{value:1.6},uFadeIn:{value:.5},uFadeOut:{value:.75},uMouse:{value:new A},uMouseInfluence:{value:0},uHoverAmount:{value:0},uHoverScale:{value:1},uParallax:{value:0},uBurst:{value:0}},g=new J({vertexShader:ue,fragmentShader:oe,uniforms:t,transparent:!0}),U=new K(new ee(1,1),g);h.add(U);const l=()=>{const a=u.clientWidth,e=u.clientHeight,m=Math.min(window.devicePixelRatio,2);o.setSize(a,e),o.setPixelRatio(m),t.uResolution.value.set(a*m,e*m)};l(),window.addEventListener("resize",l);const C=new ResizeObserver(l);C.observe(u);const w=a=>{const e=u.getBoundingClientRect();r.current[0]=(a.clientX-e.left)/e.width-.5,r.current[1]=-((a.clientY-e.top)/e.height-.5)},M=()=>{v.current=!0},L=()=>{v.current=!1,r.current[0]=0,r.current[1]=0},E=()=>{i.current=1};u.addEventListener("mousemove",w),u.addEventListener("mouseenter",M),u.addEventListener("mouseleave",L),u.addEventListener("click",E);let f;const S=a=>{f=requestAnimationFrame(S);const e=R.current;s.current[0]+=(r.current[0]-s.current[0])*.08,s.current[1]+=(r.current[1]-s.current[1])*.08,c.current+=((v.current?1:0)-c.current)*.08,i.current*=.95,i.current<.001&&(i.current=0),t.uTime.value=a*.001*e.speed,t.uAttenuation.value=e.attenuation,t.uColor.value.set(e.color),t.uColorTwo.value.set(e.colorTwo),t.uLineThickness.value=e.lineThickness,t.uBaseRadius.value=e.baseRadius,t.uRadiusStep.value=e.radiusStep,t.uScaleRate.value=e.scaleRate,t.uRingCount.value=e.ringCount,t.uOpacity.value=e.opacity,t.uNoiseAmount.value=e.noiseAmount,t.uRotation.value=e.rotation*Math.PI/180,t.uRingGap.value=e.ringGap,t.uFadeIn.value=e.fadeIn,t.uFadeOut.value=e.fadeOut,t.uMouse.value.set(s.current[0],s.current[1]),t.uMouseInfluence.value=e.followMouse?e.mouseInfluence:0,t.uHoverAmount.value=c.current,t.uHoverScale.value=e.hoverScale,t.uParallax.value=e.parallax,t.uBurst.value=e.clickBurst?i.current:0,o.render(h,x)};return f=requestAnimationFrame(S),()=>{cancelAnimationFrame(f),window.removeEventListener("resize",l),C.disconnect(),u.removeEventListener("mousemove",w),u.removeEventListener("mouseenter",M),u.removeEventListener("mouseleave",L),u.removeEventListener("click",E),u.removeChild(o.domElement),o.dispose(),g.dispose()}},[]),te.jsx("div",{ref:p,className:"magic-rings-container",style:d>0?{filter:`blur(${d}px)`}:void 0})}export{ae as default};
