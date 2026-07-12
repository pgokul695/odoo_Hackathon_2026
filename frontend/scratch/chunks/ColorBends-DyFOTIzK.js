import{r as t,V as m,Q as H,U as Q,Y as Z,bS as N,Z as J,$ as K,W as ee,bM as ne,j as re,bT as oe}from"./index-TQprzHkU.js";const k=8,te=`
#define MAX_COLORS ${k}
uniform vec2 uCanvas;
uniform float uTime;
uniform float uSpeed;
uniform vec2 uRot;
uniform int uColorCount;
uniform vec3 uColors[MAX_COLORS];
uniform int uTransparent;
uniform float uScale;
uniform float uFrequency;
uniform float uWarpStrength;
uniform vec2 uPointer; // in NDC [-1,1]
uniform float uMouseInfluence;
uniform float uParallax;
uniform float uNoise;
uniform int uIterations;
uniform float uIntensity;
uniform float uBandWidth;
varying vec2 vUv;

void main() {
  float t = uTime * uSpeed;
  vec2 p = vUv * 2.0 - 1.0;
  p += uPointer * uParallax * 0.1;
  vec2 rp = vec2(p.x * uRot.x - p.y * uRot.y, p.x * uRot.y + p.y * uRot.x);
  vec2 q = vec2(rp.x * (uCanvas.x / uCanvas.y), rp.y);
  q /= max(uScale, 0.0001);
  q /= 0.5 + 0.2 * dot(q, q);
  q += 0.2 * cos(t) - 7.56;
  vec2 toward = (uPointer - rp);
  q += toward * uMouseInfluence * 0.2;

    for (int j = 0; j < 5; j++) {
      if (j >= uIterations - 1) break;
      vec2 rr = sin(1.5 * (q.yx * uFrequency) + 2.0 * cos(q * uFrequency));
      q += (rr - q) * 0.15;
    }

    vec3 col = vec3(0.0);
    float a = 1.0;

    if (uColorCount > 0) {
      vec2 s = q;
      vec3 sumCol = vec3(0.0);
      float cover = 0.0;
      for (int i = 0; i < MAX_COLORS; ++i) {
            if (i >= uColorCount) break;
            s -= 0.01;
            vec2 r = sin(1.5 * (s.yx * uFrequency) + 2.0 * cos(s * uFrequency));
            float m0 = length(r + sin(5.0 * r.y * uFrequency - 3.0 * t + float(i)) / 4.0);
            float kBelow = clamp(uWarpStrength, 0.0, 1.0);
            float kMix = pow(kBelow, 0.3); // strong response across 0..1
            float gain = 1.0 + max(uWarpStrength - 1.0, 0.0); // allow >1 to amplify displacement
            vec2 disp = (r - s) * kBelow;
            vec2 warped = s + disp * gain;
            float m1 = length(warped + sin(5.0 * warped.y * uFrequency - 3.0 * t + float(i)) / 4.0);
            float m = mix(m0, m1, kMix);
            float w = 1.0 - exp(-uBandWidth / exp(uBandWidth * m));
            sumCol += uColors[i] * w;
            cover = max(cover, w);
      }
      col = clamp(sumCol, 0.0, 1.0);
      a = uTransparent > 0 ? cover : 1.0;
    } else {
        vec2 s = q;
        for (int k = 0; k < 3; ++k) {
            s -= 0.01;
            vec2 r = sin(1.5 * (s.yx * uFrequency) + 2.0 * cos(s * uFrequency));
            float m0 = length(r + sin(5.0 * r.y * uFrequency - 3.0 * t + float(k)) / 4.0);
            float kBelow = clamp(uWarpStrength, 0.0, 1.0);
            float kMix = pow(kBelow, 0.3);
            float gain = 1.0 + max(uWarpStrength - 1.0, 0.0);
            vec2 disp = (r - s) * kBelow;
            vec2 warped = s + disp * gain;
            float m1 = length(warped + sin(5.0 * warped.y * uFrequency - 3.0 * t + float(k)) / 4.0);
            float m = mix(m0, m1, kMix);
            col[k] = 1.0 - exp(-uBandWidth / exp(uBandWidth * m));
        }
        a = uTransparent > 0 ? max(max(col.r, col.g), col.b) : 1.0;
    }

    col *= uIntensity;

    if (uNoise > 0.0001) {
      float n = fract(sin(dot(gl_FragCoord.xy + vec2(uTime), vec2(12.9898, 78.233))) * 43758.5453123);
      col += (n - 0.5) * uNoise;
      col = clamp(col, 0.0, 1.0);
    }

    vec3 rgb = (uTransparent > 0) ? col * a : col;
    gl_FragColor = vec4(rgb, a);
}
`,ue=`
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`;function le({className:_,style:U,rotation:M=90,speed:v=.2,colors:P=[],transparent:i=!0,autoRotate:F=0,scale:d=1,frequency:p=1,warpStrength:h=1,mouseInfluence:w=1,parallax:C=.5,noise:g=.15,iterations:y=1,intensity:R=1.5,bandWidth:x=6}){const B=t.useRef(null),T=t.useRef(null),S=t.useRef(null),E=t.useRef(null),I=t.useRef(null),W=t.useRef(M),b=t.useRef(F),O=t.useRef(new m(0,0)),X=t.useRef(new m(0,0)),V=t.useRef(8);return t.useEffect(()=>{const e=B.current,u=new H,c=new Q(-1,1,1,-1,0,1),a=new Z(2,2),o=Array.from({length:k},()=>new N(0,0,0)),n=new J({vertexShader:ue,fragmentShader:te,uniforms:{uCanvas:{value:new m(1,1)},uTime:{value:0},uSpeed:{value:v},uRot:{value:new m(1,0)},uColorCount:{value:0},uColors:{value:o},uTransparent:{value:i?1:0},uScale:{value:d},uFrequency:{value:p},uWarpStrength:{value:h},uPointer:{value:new m(0,0)},uMouseInfluence:{value:w},uParallax:{value:C},uNoise:{value:g},uIterations:{value:y},uIntensity:{value:R},uBandWidth:{value:x}},premultipliedAlpha:!0,transparent:!0});E.current=n;const s=new K(a,n);u.add(s);const r=new ee({antialias:!1,powerPreference:"high-performance",alpha:!0});T.current=r,r.outputColorSpace=ne,r.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),r.setClearColor(0,i?0:1),r.domElement.style.width="100%",r.domElement.style.height="100%",r.domElement.style.display="block",e.appendChild(r.domElement);const A=new oe,q=()=>{const l=e.clientWidth||1,f=e.clientHeight||1;r.setSize(l,f,!1),n.uniforms.uCanvas.value.set(l,f)};if(q(),"ResizeObserver"in window){const l=new ResizeObserver(q);l.observe(e),I.current=l}else window.addEventListener("resize",q);const L=()=>{const l=A.getDelta(),f=A.elapsedTime;n.uniforms.uTime.value=f;const j=(W.current%360+b.current*f)*Math.PI/180,G=Math.cos(j),$=Math.sin(j);n.uniforms.uRot.value.set(G,$);const z=X.current,D=O.current,Y=Math.min(1,l*V.current);z.lerp(D,Y),n.uniforms.uPointer.value.copy(z),r.render(u,c),S.current=requestAnimationFrame(L)};return S.current=requestAnimationFrame(L),()=>{S.current!==null&&cancelAnimationFrame(S.current),I.current?I.current.disconnect():window.removeEventListener("resize",q),a.dispose(),n.dispose(),r.dispose(),r.forceContextLoss(),r.domElement&&r.domElement.parentElement===e&&e.removeChild(r.domElement)}},[x,p,R,y,w,g,C,d,v,i,h]),t.useEffect(()=>{const e=E.current,u=T.current;if(!e)return;W.current=M,b.current=F,e.uniforms.uSpeed.value=v,e.uniforms.uScale.value=d,e.uniforms.uFrequency.value=p,e.uniforms.uWarpStrength.value=h,e.uniforms.uMouseInfluence.value=w,e.uniforms.uParallax.value=C,e.uniforms.uNoise.value=g,e.uniforms.uIterations.value=y,e.uniforms.uIntensity.value=R,e.uniforms.uBandWidth.value=x;const c=o=>{const n=o.replace("#","").trim(),s=n.length===3?[parseInt(n[0]+n[0],16),parseInt(n[1]+n[1],16),parseInt(n[2]+n[2],16)]:[parseInt(n.slice(0,2),16),parseInt(n.slice(2,4),16),parseInt(n.slice(4,6),16)];return new N(s[0]/255,s[1]/255,s[2]/255)},a=(P||[]).filter(Boolean).slice(0,k).map(c);for(let o=0;o<k;o++){const n=e.uniforms.uColors.value[o];o<a.length?n.copy(a[o]):n.set(0,0,0)}e.uniforms.uColorCount.value=a.length,e.uniforms.uTransparent.value=i?1:0,u&&u.setClearColor(0,i?0:1)},[M,F,v,d,p,h,w,C,g,y,R,x,P,i]),t.useEffect(()=>{const e=E.current,u=B.current;if(!e||!u)return;const c=a=>{const o=u.getBoundingClientRect(),n=(a.clientX-o.left)/(o.width||1)*2-1,s=-((a.clientY-o.top)/(o.height||1)*2-1);O.current.set(n,s)};return u.addEventListener("pointermove",c),()=>{u.removeEventListener("pointermove",c)}},[]),re.jsx("div",{ref:B,className:`color-bends-container ${_}`,style:U})}export{le as default};
