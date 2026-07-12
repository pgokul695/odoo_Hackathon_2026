import{r as t,V as Z,Q as se,U as ae,W as le,Z as ce,Y as fe,$ as me,j as J,a2 as z,bS as F}from"./index-TQprzHkU.js";const he=({topColor:g="#5227FF",bottomColor:C="#FF9FFC",intensity:x=1,rotationSpeed:P=.3,interactive:a=!1,className:q="",glowAmount:S=.005,pillarWidth:E=3,pillarHeight:M=.4,noiseIntensity:T=.5,mixBlendMode:L="screen",pillarRotation:y=0,quality:h="high"})=>{const l=t.useRef(null),f=t.useRef(null),o=t.useRef(null),e=t.useRef(null),p=t.useRef(null),R=t.useRef(null),w=t.useRef(null),A=t.useRef(new Z(0,0)),G=t.useRef(0),_=t.useRef(P),[I,j]=t.useState(!0);return t.useEffect(()=>{const r=document.createElement("canvas");r.getContext("webgl")||r.getContext("experimental-webgl")||j(!1)},[]),t.useEffect(()=>{if(!l.current||!I)return;const r=l.current,s=r.clientWidth,i=r.clientHeight,N=new se;p.current=N;const K=new ae(-1,1,1,-1,0,1);R.current=K;const U=/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),ee=U||navigator.hardwareConcurrency&&navigator.hardwareConcurrency<=4;let m=h;ee&&h==="high"&&(m="medium"),U&&h!=="low"&&(m="low");const $={low:{iterations:24,waveIterations:1,pixelRatio:.5,precision:"mediump",stepMultiplier:1.5},medium:{iterations:40,waveIterations:2,pixelRatio:.65,precision:"mediump",stepMultiplier:1.2},high:{iterations:80,waveIterations:4,pixelRatio:Math.min(window.devicePixelRatio,2),precision:"highp",stepMultiplier:1}},c=$[m]||$.medium;let v;try{v=new le({antialias:!1,alpha:!0,powerPreference:m==="high"?"high-performance":"low-power",precision:c.precision,stencil:!1,depth:!1})}catch{j(!1);return}v.setSize(s,i),v.setPixelRatio(c.pixelRatio),r.appendChild(v.domElement),o.current=v;const k=u=>{const n=new z(u);return new F(n.r,n.g,n.b)},te=`
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `,re=`
      precision ${c.precision} float;

      uniform float uTime;
      uniform vec2 uResolution;
      uniform vec2 uMouse;
      uniform vec3 uTopColor;
      uniform vec3 uBottomColor;
      uniform float uIntensity;
      uniform bool uInteractive;
      uniform float uGlowAmount;
      uniform float uPillarWidth;
      uniform float uPillarHeight;
      uniform float uNoiseIntensity;
      uniform float uRotCos;
      uniform float uRotSin;
      uniform float uPillarRotCos;
      uniform float uPillarRotSin;
      uniform float uWaveSin;
      uniform float uWaveCos;
      varying vec2 vUv;

      const float STEP_MULT = ${c.stepMultiplier.toFixed(1)};
      const int MAX_ITER = ${c.iterations};
      const int WAVE_ITER = ${c.waveIterations};

      void main() {
        vec2 uv = (vUv * 2.0 - 1.0) * vec2(uResolution.x / uResolution.y, 1.0);
        uv = vec2(uPillarRotCos * uv.x - uPillarRotSin * uv.y, uPillarRotSin * uv.x + uPillarRotCos * uv.y);

        vec3 ro = vec3(0.0, 0.0, -10.0);
        vec3 rd = normalize(vec3(uv, 1.0));

        float rotC = uRotCos;
        float rotS = uRotSin;
        if(uInteractive && (uMouse.x != 0.0 || uMouse.y != 0.0)) {
          float a = uMouse.x * 6.283185;
          rotC = cos(a);
          rotS = sin(a);
        }

        vec3 col = vec3(0.0);
        float t = 0.1;
        
        for(int i = 0; i < MAX_ITER; i++) {
          vec3 p = ro + rd * t;
          p.xz = vec2(rotC * p.x - rotS * p.z, rotS * p.x + rotC * p.z);

          vec3 q = p;
          q.y = p.y * uPillarHeight + uTime;
          
          float freq = 1.0;
          float amp = 1.0;
          for(int j = 0; j < WAVE_ITER; j++) {
            q.xz = vec2(uWaveCos * q.x - uWaveSin * q.z, uWaveSin * q.x + uWaveCos * q.z);
            q += cos(q.zxy * freq - uTime * float(j) * 2.0) * amp;
            freq *= 2.0;
            amp *= 0.5;
          }
          
          float d = length(cos(q.xz)) - 0.2;
          float bound = length(p.xz) - uPillarWidth;
          float k = 4.0;
          float h = max(k - abs(d - bound), 0.0);
          d = max(d, bound) + h * h * 0.0625 / k;
          d = abs(d) * 0.15 + 0.01;

          float grad = clamp((15.0 - p.y) / 30.0, 0.0, 1.0);
          col += mix(uBottomColor, uTopColor, grad) / d;

          t += d * STEP_MULT;
          if(t > 50.0) break;
        }

        float widthNorm = uPillarWidth / 3.0;
        col = tanh(col * uGlowAmount / widthNorm);
        
        col -= fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453) / 15.0 * uNoiseIntensity;
        
        gl_FragColor = vec4(col * uIntensity, 1.0);
      }
    `,B=y*Math.PI/180,ne=Math.sin(.4),oe=Math.cos(.4),H=new ce({vertexShader:te,fragmentShader:re,uniforms:{uTime:{value:0},uResolution:{value:new Z(s,i)},uMouse:{value:A.current},uTopColor:{value:k(g)},uBottomColor:{value:k(C)},uIntensity:{value:x},uInteractive:{value:a},uGlowAmount:{value:S},uPillarWidth:{value:E},uPillarHeight:{value:M},uNoiseIntensity:{value:T},uRotCos:{value:1},uRotSin:{value:0},uPillarRotCos:{value:Math.cos(B)},uPillarRotSin:{value:Math.sin(B)},uWaveSin:{value:ne},uWaveCos:{value:oe}},transparent:!0,depthWrite:!1,depthTest:!1});e.current=H;const V=new fe(2,2);w.current=V;const ue=new me(V,H);N.add(ue);let W=null;const O=u=>{if(!a||W)return;W=window.setTimeout(()=>{W=null},16);const n=r.getBoundingClientRect(),d=(u.clientX-n.left)/n.width*2-1,ie=-((u.clientY-n.top)/n.height)*2+1;A.current.set(d,ie)};a&&r.addEventListener("mousemove",O,{passive:!0});let X=performance.now();const Q=1e3/(m==="low"?30:60),Y=u=>{if(!e.current||!o.current||!p.current||!R.current)return;const n=u-X;if(n>=Q){G.current+=.016*_.current;const d=G.current;e.current.uniforms.uTime.value=d,e.current.uniforms.uRotCos.value=Math.cos(d*.3),e.current.uniforms.uRotSin.value=Math.sin(d*.3),o.current.render(p.current,R.current),X=u-n%Q}f.current=requestAnimationFrame(Y)};f.current=requestAnimationFrame(Y);let b=null;const D=()=>{b&&clearTimeout(b),b=window.setTimeout(()=>{if(!o.current||!e.current||!l.current)return;const u=l.current.clientWidth,n=l.current.clientHeight;o.current.setSize(u,n),e.current.uniforms.uResolution.value.set(u,n)},150)};return window.addEventListener("resize",D,{passive:!0}),()=>{window.removeEventListener("resize",D),a&&r.removeEventListener("mousemove",O),f.current&&cancelAnimationFrame(f.current),o.current&&(o.current.dispose(),o.current.forceContextLoss(),r.contains(o.current.domElement)&&r.removeChild(o.current.domElement)),e.current&&e.current.dispose(),w.current&&w.current.dispose(),o.current=null,e.current=null,p.current=null,R.current=null,w.current=null,f.current=null}},[I,h]),t.useEffect(()=>{_.current=P},[P]),t.useEffect(()=>{if(!e.current)return;const r=s=>{const i=new z(s);return new F(i.r,i.g,i.b)};e.current.uniforms.uTopColor.value=r(g)},[g]),t.useEffect(()=>{if(!e.current)return;const r=s=>{const i=new z(s);return new F(i.r,i.g,i.b)};e.current.uniforms.uBottomColor.value=r(C)},[C]),t.useEffect(()=>{e.current&&(e.current.uniforms.uIntensity.value=x)},[x]),t.useEffect(()=>{e.current&&(e.current.uniforms.uInteractive.value=a)},[a]),t.useEffect(()=>{e.current&&(e.current.uniforms.uGlowAmount.value=S)},[S]),t.useEffect(()=>{e.current&&(e.current.uniforms.uPillarWidth.value=E)},[E]),t.useEffect(()=>{e.current&&(e.current.uniforms.uPillarHeight.value=M)},[M]),t.useEffect(()=>{e.current&&(e.current.uniforms.uNoiseIntensity.value=T)},[T]),t.useEffect(()=>{if(!e.current)return;const r=y*Math.PI/180;e.current.uniforms.uPillarRotCos.value=Math.cos(r),e.current.uniforms.uPillarRotSin.value=Math.sin(r)},[y]),I?J.jsx("div",{ref:l,className:`light-pillar-container ${q}`,style:{mixBlendMode:L}}):J.jsx("div",{className:`light-pillar-fallback ${q}`,style:{mixBlendMode:L},children:"WebGL not supported"})};export{he as default};
