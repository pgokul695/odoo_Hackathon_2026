import{r as m,V as p,Q as re,U as le,W as ce,bS as h,Z as ae,Y as ue,$ as fe,j as se,bT as me}from"./index-TQprzHkU.js";const de=`
precision highp float;

void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`,ve=`
precision highp float;

uniform float iTime;
uniform vec3  iResolution;
uniform float animationSpeed;

uniform bool enableTop;
uniform bool enableMiddle;
uniform bool enableBottom;

uniform int topLineCount;
uniform int middleLineCount;
uniform int bottomLineCount;

uniform float topLineDistance;
uniform float middleLineDistance;
uniform float bottomLineDistance;

uniform vec3 topWavePosition;
uniform vec3 middleWavePosition;
uniform vec3 bottomWavePosition;

uniform vec2 iMouse;
uniform bool interactive;
uniform float bendRadius;
uniform float bendStrength;
uniform float bendInfluence;

uniform bool parallax;
uniform float parallaxStrength;
uniform vec2 parallaxOffset;

uniform vec3 lineGradient[8];
uniform int lineGradientCount;

const vec3 BLACK = vec3(0.0);
const vec3 PINK  = vec3(233.0, 71.0, 245.0) / 255.0;
const vec3 BLUE  = vec3(47.0,  75.0, 162.0) / 255.0;

mat2 rotate(float r) {
  return mat2(cos(r), sin(r), -sin(r), cos(r));
}

vec3 background_color(vec2 uv) {
  vec3 col = vec3(0.0);

  float y = sin(uv.x - 0.2) * 0.3 - 0.1;
  float m = uv.y - y;

  col += mix(BLUE, BLACK, smoothstep(0.0, 1.0, abs(m)));
  col += mix(PINK, BLACK, smoothstep(0.0, 1.0, abs(m - 0.8)));
  return col * 0.5;
}

vec3 getLineColor(float t, vec3 baseColor) {
  if (lineGradientCount <= 0) {
    return baseColor;
  }

  vec3 gradientColor;
  
  if (lineGradientCount == 1) {
    gradientColor = lineGradient[0];
  } else {
    float clampedT = clamp(t, 0.0, 0.9999);
    float scaled = clampedT * float(lineGradientCount - 1);
    int idx = int(floor(scaled));
    float f = fract(scaled);
    int idx2 = min(idx + 1, lineGradientCount - 1);

    vec3 c1 = lineGradient[idx];
    vec3 c2 = lineGradient[idx2];
    
    gradientColor = mix(c1, c2, f);
  }
  
  return gradientColor * 0.5;
}

  float wave(vec2 uv, float offset, vec2 screenUv, vec2 mouseUv, bool shouldBend) {
  float time = iTime * animationSpeed;

  float x_offset   = offset;
  float x_movement = time * 0.1;
  float amp        = sin(offset + time * 0.2) * 0.3;
  float y          = sin(uv.x + x_offset + x_movement) * amp;

  if (shouldBend) {
    vec2 d = screenUv - mouseUv;
    float influence = exp(-dot(d, d) * bendRadius); // radial falloff around cursor
    float bendOffset = (mouseUv.y - screenUv.y) * influence * bendStrength * bendInfluence;
    y += bendOffset;
  }

  float m = uv.y - y;
  return 0.0175 / max(abs(m) + 0.01, 1e-3) + 0.01;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
  vec2 baseUv = (2.0 * fragCoord - iResolution.xy) / iResolution.y;
  baseUv.y *= -1.0;
  
  if (parallax) {
    baseUv += parallaxOffset;
  }

  vec3 col = vec3(0.0);

  vec3 b = lineGradientCount > 0 ? vec3(0.0) : background_color(baseUv);

  vec2 mouseUv = vec2(0.0);
  if (interactive) {
    mouseUv = (2.0 * iMouse - iResolution.xy) / iResolution.y;
    mouseUv.y *= -1.0;
  }
  
  if (enableBottom) {
    for (int i = 0; i < bottomLineCount; ++i) {
      float fi = float(i);
      float t = fi / max(float(bottomLineCount - 1), 1.0);
      vec3 lineCol = getLineColor(t, b);
      
      float angle = bottomWavePosition.z * log(length(baseUv) + 1.0);
      vec2 ruv = baseUv * rotate(angle);
      col += lineCol * wave(
        ruv + vec2(bottomLineDistance * fi + bottomWavePosition.x, bottomWavePosition.y),
        1.5 + 0.2 * fi,
        baseUv,
        mouseUv,
        interactive
      ) * 0.2;
    }
  }

  if (enableMiddle) {
    for (int i = 0; i < middleLineCount; ++i) {
      float fi = float(i);
      float t = fi / max(float(middleLineCount - 1), 1.0);
      vec3 lineCol = getLineColor(t, b);
      
      float angle = middleWavePosition.z * log(length(baseUv) + 1.0);
      vec2 ruv = baseUv * rotate(angle);
      col += lineCol * wave(
        ruv + vec2(middleLineDistance * fi + middleWavePosition.x, middleWavePosition.y),
        2.0 + 0.15 * fi,
        baseUv,
        mouseUv,
        interactive
      );
    }
  }

  if (enableTop) {
    for (int i = 0; i < topLineCount; ++i) {
      float fi = float(i);
      float t = fi / max(float(topLineCount - 1), 1.0);
      vec3 lineCol = getLineColor(t, b);
      
      float angle = topWavePosition.z * log(length(baseUv) + 1.0);
      vec2 ruv = baseUv * rotate(angle);
      ruv.x *= -1.0;
      col += lineCol * wave(
        ruv + vec2(topLineDistance * fi + topWavePosition.x, topWavePosition.y),
        1.0 + 0.2 * fi,
        baseUv,
        mouseUv,
        interactive
      ) * 0.1;
    }
  }

  fragColor = vec4(col, 1.0);
}

void main() {
  vec4 color = vec4(0.0);
  mainImage(color, gl_FragCoord.xy);
  gl_FragColor = color;
}
`,Y=8;function ge(v){let e=v.trim();e.startsWith("#")&&(e=e.slice(1));let c=255,a=255,n=255;return e.length===3?(c=parseInt(e[0]+e[0],16),a=parseInt(e[1]+e[1],16),n=parseInt(e[2]+e[2],16)):e.length===6&&(c=parseInt(e.slice(0,2),16),a=parseInt(e.slice(2,4),16),n=parseInt(e.slice(4,6),16)),new h(c/255,a/255,n/255)}function he({linesGradient:v,enabledWaves:e=["top","middle","bottom"],lineCount:c=[6],lineDistance:a=[5],topWavePosition:n,middleWavePosition:r,bottomWavePosition:l={x:2,y:-.7,rotate:-1},animationSpeed:I=1,interactive:x=!0,bendRadius:M=5,bendStrength:G=-.5,mouseDamping:C=.05,parallax:b=!0,parallaxStrength:L=.2,mixBlendMode:H="screen"}){const O=m.useRef(null),S=m.useRef(new p(-1e3,-1e3)),T=m.useRef(new p(-1e3,-1e3)),R=m.useRef(0),w=m.useRef(0),B=m.useRef(new p(0,0)),_=m.useRef(new p(0,0)),U=o=>{if(typeof c=="number")return c;if(!e.includes(o))return 0;const u=e.indexOf(o);return c[u]??6},E=o=>{if(typeof a=="number")return a;if(!e.includes(o))return .1;const u=e.indexOf(o);return a[u]??.1},q=e.includes("top")?U("top"):0,Q=e.includes("middle")?U("middle"):0,Z=e.includes("bottom")?U("bottom"):0,$=e.includes("top")?E("top")*.01:.01,J=e.includes("middle")?E("middle")*.01:.01,P=e.includes("bottom")?E("bottom")*.01:.01;return m.useEffect(()=>{const o=O.current;if(!o)return;let u=!0;const z=new re,A=new le(-1,1,1,-1,0,1);A.position.z=1;const t=new ce({antialias:!0,alpha:!1});t.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),t.domElement.style.width="100%",t.domElement.style.height="100%",o.appendChild(t.domElement);const f={iTime:{value:0},iResolution:{value:new h(1,1,1)},animationSpeed:{value:I},enableTop:{value:e.includes("top")},enableMiddle:{value:e.includes("middle")},enableBottom:{value:e.includes("bottom")},topLineCount:{value:q},middleLineCount:{value:Q},bottomLineCount:{value:Z},topLineDistance:{value:$},middleLineDistance:{value:J},bottomLineDistance:{value:P},topWavePosition:{value:new h((n==null?void 0:n.x)??10,(n==null?void 0:n.y)??.5,(n==null?void 0:n.rotate)??-.4)},middleWavePosition:{value:new h((r==null?void 0:r.x)??5,(r==null?void 0:r.y)??0,(r==null?void 0:r.rotate)??.2)},bottomWavePosition:{value:new h((l==null?void 0:l.x)??2,(l==null?void 0:l.y)??-.7,(l==null?void 0:l.rotate)??.4)},iMouse:{value:new p(-1e3,-1e3)},interactive:{value:x},bendRadius:{value:M},bendStrength:{value:G},bendInfluence:{value:0},parallax:{value:b},parallaxStrength:{value:L},parallaxOffset:{value:new p(0,0)},lineGradient:{value:Array.from({length:Y},()=>new h(1,1,1))},lineGradientCount:{value:0}};if(v&&v.length>0){const d=v.slice(0,Y);f.lineGradientCount.value=d.length,d.forEach((i,g)=>{const s=ge(i);f.lineGradient.value[g].set(s.x,s.y,s.z)})}const D=new ae({uniforms:f,vertexShader:de,fragmentShader:ve}),F=new ue(2,2),W=new fe(F,D);z.add(W);const ee=new me,K=()=>{if(!u)return;const d=o.clientWidth||1,i=o.clientHeight||1;t.setSize(d,i,!1);const g=t.domElement.width,s=t.domElement.height;f.iResolution.value.set(g,s,1)};K();const y=typeof ResizeObserver<"u"?new ResizeObserver(()=>{u&&K()}):null;y&&y.observe(o);const V=d=>{const i=t.domElement.getBoundingClientRect(),g=d.clientX-i.left,s=d.clientY-i.top,X=t.getPixelRatio();if(S.current.set(g*X,(i.height-s)*X),R.current=1,b){const te=i.width/2,ne=i.height/2,oe=(g-te)/i.width,ie=-(s-ne)/i.height;B.current.set(oe*L,ie*L)}},j=()=>{R.current=0};x&&(t.domElement.addEventListener("pointermove",V),t.domElement.addEventListener("pointerleave",j));let k=0;const N=()=>{u&&(f.iTime.value=ee.getElapsedTime(),x&&(T.current.lerp(S.current,C),f.iMouse.value.copy(T.current),w.current+=(R.current-w.current)*C,f.bendInfluence.value=w.current),b&&(_.current.lerp(B.current,C),f.parallaxOffset.value.copy(_.current)),t.render(z,A),k=requestAnimationFrame(N))};return N(),()=>{u=!1,cancelAnimationFrame(k),y&&y.disconnect(),x&&(t.domElement.removeEventListener("pointermove",V),t.domElement.removeEventListener("pointerleave",j)),F.dispose(),D.dispose(),t.dispose(),t.forceContextLoss(),t.domElement.parentElement&&t.domElement.parentElement.removeChild(t.domElement)}},[v,e,c,a,n,r,l,I,x,M,G,C,b,L]),se.jsx("div",{ref:O,className:"floating-lines-container",style:{mixBlendMode:H}})}export{he as default};
