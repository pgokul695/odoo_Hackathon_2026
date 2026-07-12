import{r as k,j as t,B as $}from"./index-TQprzHkU.js";import{u as Y,C as Z,T as J,P as K,a as Q,b as ee,c as ne}from"./useComponentProps-CjYSqekE.js";import{D as te}from"./Dependencies-IIL9riMN.js";import{C as re}from"./Customize-BdikCFm5.js";import{P as l}from"./PreviewSlider-CCbi2och.js";import{P as oe}from"./PreviewSwitch-CcPSwIGg.js";import{P as z}from"./PreviewColorPickerCustom-BFsDkSOr.js";import{R as se,P as H,M as U}from"./Mesh-CwXV3WjE.js";import{T as ae}from"./Triangle-64ffRKNB.js";import{T as W}from"./Texture-BkQWYNP2.js";import{C as ie}from"./Color-YRkaOI4u.js";import"./index-DQmtNYX5.js";import"./CodeHighlighter-Dx4QNbvH.js";import"./rotate-ccw-_xDu3G0k.js";/* empty css                       */class ue{constructor(n,{width:s=n.canvas.width,height:r=n.canvas.height,target:p=n.FRAMEBUFFER,color:f=1,depth:c=!0,stencil:m=!1,depthTexture:x=!1,wrapS:C=n.CLAMP_TO_EDGE,wrapT:y=n.CLAMP_TO_EDGE,wrapR:b=n.CLAMP_TO_EDGE,minFilter:h=n.LINEAR,magFilter:w=h,type:E=n.UNSIGNED_BYTE,format:v=n.RGBA,internalFormat:T=v,unpackAlignment:A,premultiplyAlpha:P}={}){this.gl=n,this.width=s,this.height=r,this.depth=c,this.stencil=m,this.buffer=this.gl.createFramebuffer(),this.target=p,this.gl.renderer.bindFramebuffer(this),this.textures=[];const S=[];for(let i=0;i<f;i++)this.textures.push(new W(n,{width:s,height:r,wrapS:C,wrapT:y,wrapR:b,minFilter:h,magFilter:w,type:E,format:v,internalFormat:T,unpackAlignment:A,premultiplyAlpha:P,flipY:!1,generateMipmaps:!1})),this.textures[i].update(),this.gl.framebufferTexture2D(this.target,this.gl.COLOR_ATTACHMENT0+i,this.gl.TEXTURE_2D,this.textures[i].texture,0),S.push(this.gl.COLOR_ATTACHMENT0+i);S.length>1&&this.gl.renderer.drawBuffers(S),this.texture=this.textures[0],x&&(this.gl.renderer.isWebgl2||this.gl.renderer.getExtension("WEBGL_depth_texture"))?(this.depthTexture=new W(n,{width:s,height:r,minFilter:this.gl.NEAREST,magFilter:this.gl.NEAREST,format:this.stencil?this.gl.DEPTH_STENCIL:this.gl.DEPTH_COMPONENT,internalFormat:n.renderer.isWebgl2?this.stencil?this.gl.DEPTH24_STENCIL8:this.gl.DEPTH_COMPONENT16:this.gl.DEPTH_COMPONENT,type:this.stencil?this.gl.UNSIGNED_INT_24_8:this.gl.UNSIGNED_INT}),this.depthTexture.update(),this.gl.framebufferTexture2D(this.target,this.stencil?this.gl.DEPTH_STENCIL_ATTACHMENT:this.gl.DEPTH_ATTACHMENT,this.gl.TEXTURE_2D,this.depthTexture.texture,0)):(c&&!m&&(this.depthBuffer=this.gl.createRenderbuffer(),this.gl.bindRenderbuffer(this.gl.RENDERBUFFER,this.depthBuffer),this.gl.renderbufferStorage(this.gl.RENDERBUFFER,this.gl.DEPTH_COMPONENT16,s,r),this.gl.framebufferRenderbuffer(this.target,this.gl.DEPTH_ATTACHMENT,this.gl.RENDERBUFFER,this.depthBuffer)),m&&!c&&(this.stencilBuffer=this.gl.createRenderbuffer(),this.gl.bindRenderbuffer(this.gl.RENDERBUFFER,this.stencilBuffer),this.gl.renderbufferStorage(this.gl.RENDERBUFFER,this.gl.STENCIL_INDEX8,s,r),this.gl.framebufferRenderbuffer(this.target,this.gl.STENCIL_ATTACHMENT,this.gl.RENDERBUFFER,this.stencilBuffer)),c&&m&&(this.depthStencilBuffer=this.gl.createRenderbuffer(),this.gl.bindRenderbuffer(this.gl.RENDERBUFFER,this.depthStencilBuffer),this.gl.renderbufferStorage(this.gl.RENDERBUFFER,this.gl.DEPTH_STENCIL,s,r),this.gl.framebufferRenderbuffer(this.target,this.gl.DEPTH_STENCIL_ATTACHMENT,this.gl.RENDERBUFFER,this.depthStencilBuffer))),this.gl.renderer.bindFramebuffer({target:this.target})}setSize(n,s){if(!(this.width===n&&this.height===s)){this.width=n,this.height=s,this.gl.renderer.bindFramebuffer(this);for(let r=0;r<this.textures.length;r++)this.textures[r].width=n,this.textures[r].height=s,this.textures[r].needsUpdate=!0,this.textures[r].update(),this.gl.framebufferTexture2D(this.target,this.gl.COLOR_ATTACHMENT0+r,this.gl.TEXTURE_2D,this.textures[r].texture,0);this.depthTexture?(this.depthTexture.width=n,this.depthTexture.height=s,this.depthTexture.needsUpdate=!0,this.depthTexture.update(),this.gl.framebufferTexture2D(this.target,this.gl.DEPTH_ATTACHMENT,this.gl.TEXTURE_2D,this.depthTexture.texture,0)):(this.depthBuffer&&(this.gl.bindRenderbuffer(this.gl.RENDERBUFFER,this.depthBuffer),this.gl.renderbufferStorage(this.gl.RENDERBUFFER,this.gl.DEPTH_COMPONENT16,n,s)),this.stencilBuffer&&(this.gl.bindRenderbuffer(this.gl.RENDERBUFFER,this.stencilBuffer),this.gl.renderbufferStorage(this.gl.RENDERBUFFER,this.gl.STENCIL_INDEX8,n,s)),this.depthStencilBuffer&&(this.gl.bindRenderbuffer(this.gl.RENDERBUFFER,this.depthStencilBuffer),this.gl.renderbufferStorage(this.gl.RENDERBUFFER,this.gl.DEPTH_STENCIL,n,s))),this.gl.renderer.bindFramebuffer({target:this.target})}}}const le=`import { Renderer, Program, Mesh, Color, Triangle, RenderTarget } from 'ogl';
import { useEffect, useRef } from 'react';

import './Strands.css';

const MAX_STRANDS = 12;
const MAX_COLORS = 8;

const VERT = \`#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
\`;

const FRAG = \`#version 300 es
precision highp float;

uniform float uTime;
uniform vec2 uResolution;
uniform vec3 uColors[\${MAX_COLORS}];
uniform int uColorCount;
uniform int uStrandCount;
uniform float uSpeed;
uniform float uAmplitude;
uniform float uWaviness;
uniform float uThickness;
uniform float uGlow;
uniform float uTaper;
uniform float uSpread;
uniform float uHueShift;
uniform float uIntensity;
uniform float uOpacity;
uniform float uScale;
uniform float uSaturation;

out vec4 fragColor;

const float PI = 3.14159265;

vec3 spectrum(float t) {
  return 0.5 + 0.5 * cos(2.0 * PI * (t + vec3(0.00, 0.33, 0.67)));
}

vec3 samplePalette(float t) {
  t = fract(t);
  float scaled = t * float(uColorCount);
  int idx = int(floor(scaled));
  float blend = fract(scaled);
  int nextIdx = idx + 1;
  if (nextIdx >= uColorCount) nextIdx = 0;
  return mix(uColors[idx], uColors[nextIdx], blend);
}

vec3 strandColor(float t) {
  if (uColorCount > 0) return samplePalette(t);
  return spectrum(t);
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution) / uResolution.y;
  uv /= max(uScale, 0.0001);

  float e = 0.06 + uIntensity * 0.94;
  float env = pow(max(cos(uv.x * PI * 1.3), 0.0), uTaper);

  vec3 col = vec3(0.0);

  for (int i = 0; i < \${MAX_STRANDS}; i++) {
    if (i >= uStrandCount) break;

    float fi = float(i);
    float ph = fi * 1.7 * uSpread;
    float freq = (2.0 + fi * 0.35) * uWaviness;
    float spd = 1.4 + fi * 1.2;

    float tt = uTime * uSpeed;
    float w = sin(uv.x * freq + tt * spd + ph) * 0.60
            + sin(uv.x * freq * 1.1 - tt * spd * 0.7 + ph * 1.7) * 0.40;

    float amp = (0.1 + 0.02 * e) * env * uAmplitude;
    float y = w * amp;

    float d = abs(uv.y - y);
    float thick = (0.001 + 0.05 * e) * (0.35 + env) * uThickness;
    float g = thick / (d + thick * 0.45);
    g = g * g;

    float h = fi / float(uStrandCount) + uv.x * 0.30 + uTime * 0.04 + uHueShift;
    col += strandColor(h) * g * env;
  }

  col *= 0.45 + 0.7 * e;
  col = 1.0 - exp(-col * uGlow);

  float gray = dot(col, vec3(0.2126, 0.7152, 0.0722));
  col = max(mix(vec3(gray), col, uSaturation), 0.0);

  float lum = max(max(col.r, col.g), col.b);
  float alpha = clamp(lum, 0.0, 1.0) * uOpacity;

  fragColor = vec4(col * uOpacity, alpha);
}
\`;

const GLASS_FRAG = \`#version 300 es
precision highp float;

uniform sampler2D uScene;
uniform vec2 uResolution;
uniform float uRadius;
uniform float uRefraction;
uniform float uDispersion;

out vec4 fragColor;

vec2 toUv(vec2 p) {
  return p * (uResolution.y / uResolution) + 0.5;
}

void main() {
  vec2 p = (gl_FragCoord.xy - 0.5 * uResolution) / uResolution.y;
  float d = length(p);
  float r = uRadius;

  float edge = fwidth(d) * 1.5;
  float mask = 1.0 - smoothstep(r - edge, r + edge, d);
  if (mask <= 0.0) {
    fragColor = vec4(0.0);
    return;
  }

  // sphere height: 0 at the rim, 1 at the center
  float z = sqrt(max(r * r - d * d, 0.0)) / r;
  float nd = d / r; // 0 at the center, 1 at the rim

  // refraction is confined to a narrow band near the rim; the rest stays undistorted
  vec2 dir = d > 0.0 ? p / d : vec2(0.0);
  float lens = smoothstep(0.85, 1.0, nd) * pow(nd, 6.0);
  vec2 offset = -dir * lens * uRefraction * 0.15;
  vec2 disp = -dir * lens * uDispersion * 0.012;

  vec3 light;
  light.r = texture(uScene, toUv(p + offset - disp)).r;
  light.g = texture(uScene, toUv(p + offset)).g;
  light.b = texture(uScene, toUv(p + offset + disp)).b;

  // neutral fresnel rim (no color tint so the glass stays clear)
  float fres = pow(1.0 - z, 3.0);
  vec3 rim = vec3(1.0) * fres * 0.18;

  // specular highlight from the upper-left
  vec2 lightDir = normalize(vec2(-0.55, 0.6));
  float spec = pow(max(dot(p / max(r, 1e-4), lightDir), 0.0), 6.0);
  spec *= smoothstep(r, r * 0.55, d);

  vec3 emissive = light + rim + vec3(spec) * 0.4;
  float emissiveA = clamp(max(max(emissive.r, emissive.g), emissive.b), 0.0, 1.0);

  // almost clear glass body: only a faint neutral darkening, mostly near the rim
  float bodyA = 0.05 + fres * 0.05;

  // composite emissive light over the clear body (premultiplied)
  float outA = emissiveA + bodyA * (1.0 - emissiveA);
  vec3 outRGB = emissive;

  outRGB *= mask;
  outA *= mask;

  fragColor = vec4(outRGB, outA);
}
\`;

const buildPalette = colors => {
  const filled = colors && colors.length ? colors : ['#ffffff'];
  const padded = [];
  for (let i = 0; i < MAX_COLORS; i++) {
    const hex = filled[i] ?? filled[filled.length - 1];
    const c = new Color(hex);
    padded.push([c.r, c.g, c.b]);
  }
  return padded;
};

export default function Strands({
  colors = ['#FF4242', '#7C3AED', '#06B6D4', '#EAB308'],
  count = 3,
  speed = 0.5,
  amplitude = 1,
  waviness = 1,
  thickness = 0.7,
  glow = 2.6,
  taper = 3,
  spread = 1,
  hueShift = 0,
  intensity = 0.6,
  saturation = 1.5,
  opacity = 1,
  scale = 1.5,
  glass = false,
  refraction = 1,
  dispersion = 1,
  glassSize = 1,
  className = '',
  style
}) {
  const propsRef = useRef({});
  propsRef.current = {
    colors,
    count,
    speed,
    amplitude,
    waviness,
    thickness,
    glow,
    taper,
    spread,
    hueShift,
    intensity,
    saturation,
    opacity,
    scale,
    glass,
    refraction,
    dispersion,
    glassSize
  };

  const ctnDom = useRef(null);

  useEffect(() => {
    const ctn = ctnDom.current;
    if (!ctn) return;

    const renderer = new Renderer({
      alpha: true,
      premultipliedAlpha: true,
      antialias: true
    });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.canvas.style.backgroundColor = 'transparent';

    const geometry = new Triangle(gl);
    if (geometry.attributes.uv) {
      delete geometry.attributes.uv;
    }

    const program = new Program(gl, {
      vertex: VERT,
      fragment: FRAG,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: [ctn.offsetWidth, ctn.offsetHeight] },
        uColors: { value: buildPalette(propsRef.current.colors) },
        uColorCount: { value: Math.min(propsRef.current.colors.length, MAX_COLORS) },
        uStrandCount: { value: Math.min(propsRef.current.count, MAX_STRANDS) },
        uSpeed: { value: speed },
        uAmplitude: { value: amplitude },
        uWaviness: { value: waviness },
        uThickness: { value: thickness },
        uGlow: { value: glow },
        uTaper: { value: taper },
        uSpread: { value: spread },
        uHueShift: { value: hueShift },
        uIntensity: { value: intensity },
        uOpacity: { value: opacity },
        uScale: { value: scale },
        uSaturation: { value: saturation }
      }
    });

    const mesh = new Mesh(gl, { geometry, program });

    const renderTarget = new RenderTarget(gl, {
      width: ctn.offsetWidth,
      height: ctn.offsetHeight
    });

    const glassProgram = new Program(gl, {
      vertex: VERT,
      fragment: GLASS_FRAG,
      uniforms: {
        uScene: { value: renderTarget.texture },
        uResolution: { value: [ctn.offsetWidth, ctn.offsetHeight] },
        uRadius: { value: 0.46 * glassSize },
        uRefraction: { value: refraction },
        uDispersion: { value: dispersion }
      }
    });
    const glassMesh = new Mesh(gl, { geometry, program: glassProgram });

    ctn.appendChild(gl.canvas);

    function resize() {
      if (!ctn) return;
      const width = ctn.offsetWidth;
      const height = ctn.offsetHeight;
      renderer.setSize(width, height);
      program.uniforms.uResolution.value = [width, height];
      renderTarget.setSize(width, height);
      glassProgram.uniforms.uResolution.value = [width, height];
    }
    window.addEventListener('resize', resize);
    resize();

    let animateId = 0;
    const update = t => {
      animateId = requestAnimationFrame(update);
      const current = propsRef.current;
      program.uniforms.uTime.value = t * 0.001;
      program.uniforms.uColors.value = buildPalette(current.colors);
      program.uniforms.uColorCount.value = Math.min(current.colors.length, MAX_COLORS);
      program.uniforms.uStrandCount.value = Math.min(Math.max(Math.round(current.count), 1), MAX_STRANDS);
      program.uniforms.uSpeed.value = current.speed;
      program.uniforms.uAmplitude.value = current.amplitude;
      program.uniforms.uWaviness.value = current.waviness;
      program.uniforms.uThickness.value = current.thickness;
      program.uniforms.uGlow.value = current.glow;
      program.uniforms.uTaper.value = current.taper;
      program.uniforms.uSpread.value = current.spread;
      program.uniforms.uHueShift.value = current.hueShift;
      program.uniforms.uIntensity.value = current.intensity;
      program.uniforms.uOpacity.value = current.opacity;
      program.uniforms.uScale.value = current.scale;
      program.uniforms.uSaturation.value = current.saturation;

      if (current.glass) {
        renderer.render({ scene: mesh, target: renderTarget });
        glassProgram.uniforms.uScene.value = renderTarget.texture;
        glassProgram.uniforms.uRefraction.value = current.refraction;
        glassProgram.uniforms.uDispersion.value = current.dispersion;
        glassProgram.uniforms.uRadius.value = 0.46 * current.glassSize;
        renderer.render({ scene: glassMesh });
      } else {
        renderer.render({ scene: mesh });
      }
    };
    animateId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(animateId);
      window.removeEventListener('resize', resize);
      if (ctn && gl.canvas.parentNode === ctn) {
        ctn.removeChild(gl.canvas);
      }
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={ctnDom} className={\`strands-container \${className}\`} style={style} />;
}
`,fe=`.strands-container {
  position: relative;
  width: 100%;
  height: 100%;
  background: transparent;
}

.strands-container canvas {
  display: block;
  width: 100%;
  height: 100%;
}
`,ce=`import { Renderer, Program, Mesh, Color, Triangle, RenderTarget } from 'ogl';
import { useEffect, useRef } from 'react';

const MAX_STRANDS = 12;
const MAX_COLORS = 8;

const VERT = \`#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
\`;

const FRAG = \`#version 300 es
precision highp float;

uniform float uTime;
uniform vec2 uResolution;
uniform vec3 uColors[\${MAX_COLORS}];
uniform int uColorCount;
uniform int uStrandCount;
uniform float uSpeed;
uniform float uAmplitude;
uniform float uWaviness;
uniform float uThickness;
uniform float uGlow;
uniform float uTaper;
uniform float uSpread;
uniform float uHueShift;
uniform float uIntensity;
uniform float uOpacity;
uniform float uScale;
uniform float uSaturation;

out vec4 fragColor;

const float PI = 3.14159265;

vec3 spectrum(float t) {
  return 0.5 + 0.5 * cos(2.0 * PI * (t + vec3(0.00, 0.33, 0.67)));
}

vec3 samplePalette(float t) {
  t = fract(t);
  float scaled = t * float(uColorCount);
  int idx = int(floor(scaled));
  float blend = fract(scaled);
  int nextIdx = idx + 1;
  if (nextIdx >= uColorCount) nextIdx = 0;
  return mix(uColors[idx], uColors[nextIdx], blend);
}

vec3 strandColor(float t) {
  if (uColorCount > 0) return samplePalette(t);
  return spectrum(t);
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution) / uResolution.y;
  uv /= max(uScale, 0.0001);

  float e = 0.06 + uIntensity * 0.94;
  float env = pow(max(cos(uv.x * PI * 1.3), 0.0), uTaper);

  vec3 col = vec3(0.0);

  for (int i = 0; i < \${MAX_STRANDS}; i++) {
    if (i >= uStrandCount) break;

    float fi = float(i);
    float ph = fi * 1.7 * uSpread;
    float freq = (2.0 + fi * 0.35) * uWaviness;
    float spd = 1.4 + fi * 1.2;

    float tt = uTime * uSpeed;
    float w = sin(uv.x * freq + tt * spd + ph) * 0.60
            + sin(uv.x * freq * 1.1 - tt * spd * 0.7 + ph * 1.7) * 0.40;

    float amp = (0.1 + 0.02 * e) * env * uAmplitude;
    float y = w * amp;

    float d = abs(uv.y - y);
    float thick = (0.001 + 0.05 * e) * (0.35 + env) * uThickness;
    float g = thick / (d + thick * 0.45);
    g = g * g;

    float h = fi / float(uStrandCount) + uv.x * 0.30 + uTime * 0.04 + uHueShift;
    col += strandColor(h) * g * env;
  }

  col *= 0.45 + 0.7 * e;
  col = 1.0 - exp(-col * uGlow);

  float gray = dot(col, vec3(0.2126, 0.7152, 0.0722));
  col = max(mix(vec3(gray), col, uSaturation), 0.0);

  float lum = max(max(col.r, col.g), col.b);
  float alpha = clamp(lum, 0.0, 1.0) * uOpacity;

  fragColor = vec4(col * uOpacity, alpha);
}
\`;

const GLASS_FRAG = \`#version 300 es
precision highp float;

uniform sampler2D uScene;
uniform vec2 uResolution;
uniform float uRadius;
uniform float uRefraction;
uniform float uDispersion;

out vec4 fragColor;

vec2 toUv(vec2 p) {
  return p * (uResolution.y / uResolution) + 0.5;
}

void main() {
  vec2 p = (gl_FragCoord.xy - 0.5 * uResolution) / uResolution.y;
  float d = length(p);
  float r = uRadius;

  float edge = fwidth(d) * 1.5;
  float mask = 1.0 - smoothstep(r - edge, r + edge, d);
  if (mask <= 0.0) {
    fragColor = vec4(0.0);
    return;
  }

  // sphere height: 0 at the rim, 1 at the center
  float z = sqrt(max(r * r - d * d, 0.0)) / r;
  float nd = d / r; // 0 at the center, 1 at the rim

  // refraction is confined to a narrow band near the rim; the rest stays undistorted
  vec2 dir = d > 0.0 ? p / d : vec2(0.0);
  float lens = smoothstep(0.85, 1.0, nd) * pow(nd, 6.0);
  vec2 offset = -dir * lens * uRefraction * 0.15;
  vec2 disp = -dir * lens * uDispersion * 0.012;

  vec3 light;
  light.r = texture(uScene, toUv(p + offset - disp)).r;
  light.g = texture(uScene, toUv(p + offset)).g;
  light.b = texture(uScene, toUv(p + offset + disp)).b;

  // neutral fresnel rim (no color tint so the glass stays clear)
  float fres = pow(1.0 - z, 3.0);
  vec3 rim = vec3(1.0) * fres * 0.18;

  // specular highlight from the upper-left
  vec2 lightDir = normalize(vec2(-0.55, 0.6));
  float spec = pow(max(dot(p / max(r, 1e-4), lightDir), 0.0), 6.0);
  spec *= smoothstep(r, r * 0.55, d);

  vec3 emissive = light + rim + vec3(spec) * 0.4;
  float emissiveA = clamp(max(max(emissive.r, emissive.g), emissive.b), 0.0, 1.0);

  // almost clear glass body: only a faint neutral darkening, mostly near the rim
  float bodyA = 0.05 + fres * 0.05;

  // composite emissive light over the clear body (premultiplied)
  float outA = emissiveA + bodyA * (1.0 - emissiveA);
  vec3 outRGB = emissive;

  outRGB *= mask;
  outA *= mask;

  fragColor = vec4(outRGB, outA);
}
\`;

const buildPalette = colors => {
  const filled = colors && colors.length ? colors : ['#ffffff'];
  const padded = [];
  for (let i = 0; i < MAX_COLORS; i++) {
    const hex = filled[i] ?? filled[filled.length - 1];
    const c = new Color(hex);
    padded.push([c.r, c.g, c.b]);
  }
  return padded;
};

export default function Strands({
  colors = ['#FF4242', '#7C3AED', '#06B6D4', '#EAB308'],
  count = 3,
  speed = 0.5,
  amplitude = 1,
  waviness = 1,
  thickness = 0.7,
  glow = 2.6,
  taper = 3,
  spread = 1,
  hueShift = 0,
  intensity = 0.6,
  saturation = 1.5,
  opacity = 1,
  scale = 1.5,
  glass = false,
  refraction = 1,
  dispersion = 1,
  glassSize = 1,
  className = '',
  style
}) {
  const propsRef = useRef({});
  propsRef.current = {
    colors,
    count,
    speed,
    amplitude,
    waviness,
    thickness,
    glow,
    taper,
    spread,
    hueShift,
    intensity,
    saturation,
    opacity,
    scale,
    glass,
    refraction,
    dispersion,
    glassSize
  };

  const ctnDom = useRef(null);

  useEffect(() => {
    const ctn = ctnDom.current;
    if (!ctn) return;

    const renderer = new Renderer({
      alpha: true,
      premultipliedAlpha: true,
      antialias: true
    });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.canvas.style.backgroundColor = 'transparent';

    const geometry = new Triangle(gl);
    if (geometry.attributes.uv) {
      delete geometry.attributes.uv;
    }

    const program = new Program(gl, {
      vertex: VERT,
      fragment: FRAG,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: [ctn.offsetWidth, ctn.offsetHeight] },
        uColors: { value: buildPalette(propsRef.current.colors) },
        uColorCount: { value: Math.min(propsRef.current.colors.length, MAX_COLORS) },
        uStrandCount: { value: Math.min(propsRef.current.count, MAX_STRANDS) },
        uSpeed: { value: speed },
        uAmplitude: { value: amplitude },
        uWaviness: { value: waviness },
        uThickness: { value: thickness },
        uGlow: { value: glow },
        uTaper: { value: taper },
        uSpread: { value: spread },
        uHueShift: { value: hueShift },
        uIntensity: { value: intensity },
        uOpacity: { value: opacity },
        uScale: { value: scale },
        uSaturation: { value: saturation }
      }
    });

    const mesh = new Mesh(gl, { geometry, program });

    const renderTarget = new RenderTarget(gl, {
      width: ctn.offsetWidth,
      height: ctn.offsetHeight
    });

    const glassProgram = new Program(gl, {
      vertex: VERT,
      fragment: GLASS_FRAG,
      uniforms: {
        uScene: { value: renderTarget.texture },
        uResolution: { value: [ctn.offsetWidth, ctn.offsetHeight] },
        uRadius: { value: 0.46 * glassSize },
        uRefraction: { value: refraction },
        uDispersion: { value: dispersion }
      }
    });
    const glassMesh = new Mesh(gl, { geometry, program: glassProgram });

    ctn.appendChild(gl.canvas);

    function resize() {
      if (!ctn) return;
      const width = ctn.offsetWidth;
      const height = ctn.offsetHeight;
      renderer.setSize(width, height);
      program.uniforms.uResolution.value = [width, height];
      renderTarget.setSize(width, height);
      glassProgram.uniforms.uResolution.value = [width, height];
    }
    window.addEventListener('resize', resize);
    resize();

    let animateId = 0;
    const update = t => {
      animateId = requestAnimationFrame(update);
      const current = propsRef.current;
      program.uniforms.uTime.value = t * 0.001;
      program.uniforms.uColors.value = buildPalette(current.colors);
      program.uniforms.uColorCount.value = Math.min(current.colors.length, MAX_COLORS);
      program.uniforms.uStrandCount.value = Math.min(Math.max(Math.round(current.count), 1), MAX_STRANDS);
      program.uniforms.uSpeed.value = current.speed;
      program.uniforms.uAmplitude.value = current.amplitude;
      program.uniforms.uWaviness.value = current.waviness;
      program.uniforms.uThickness.value = current.thickness;
      program.uniforms.uGlow.value = current.glow;
      program.uniforms.uTaper.value = current.taper;
      program.uniforms.uSpread.value = current.spread;
      program.uniforms.uHueShift.value = current.hueShift;
      program.uniforms.uIntensity.value = current.intensity;
      program.uniforms.uOpacity.value = current.opacity;
      program.uniforms.uScale.value = current.scale;
      program.uniforms.uSaturation.value = current.saturation;

      if (current.glass) {
        renderer.render({ scene: mesh, target: renderTarget });
        glassProgram.uniforms.uScene.value = renderTarget.texture;
        glassProgram.uniforms.uRefraction.value = current.refraction;
        glassProgram.uniforms.uDispersion.value = current.dispersion;
        glassProgram.uniforms.uRadius.value = 0.46 * current.glassSize;
        renderer.render({ scene: glassMesh });
      } else {
        renderer.render({ scene: mesh });
      }
    };
    animateId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(animateId);
      window.removeEventListener('resize', resize);
      if (ctn && gl.canvas.parentNode === ctn) {
        ctn.removeChild(gl.canvas);
      }
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={ctnDom} className={\`relative w-full h-full bg-transparent \${className}\`} style={style} />;
}
`,me=`import { Renderer, Program, Mesh, Color, Triangle, RenderTarget } from 'ogl';
import { useEffect, useRef, CSSProperties } from 'react';

import './Strands.css';

const MAX_STRANDS = 12;
const MAX_COLORS = 8;

const VERT = \`#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
\`;

const FRAG = \`#version 300 es
precision highp float;

uniform float uTime;
uniform vec2 uResolution;
uniform vec3 uColors[\${MAX_COLORS}];
uniform int uColorCount;
uniform int uStrandCount;
uniform float uSpeed;
uniform float uAmplitude;
uniform float uWaviness;
uniform float uThickness;
uniform float uGlow;
uniform float uTaper;
uniform float uSpread;
uniform float uHueShift;
uniform float uIntensity;
uniform float uOpacity;
uniform float uScale;
uniform float uSaturation;

out vec4 fragColor;

const float PI = 3.14159265;

vec3 spectrum(float t) {
  return 0.5 + 0.5 * cos(2.0 * PI * (t + vec3(0.00, 0.33, 0.67)));
}

vec3 samplePalette(float t) {
  t = fract(t);
  float scaled = t * float(uColorCount);
  int idx = int(floor(scaled));
  float blend = fract(scaled);
  int nextIdx = idx + 1;
  if (nextIdx >= uColorCount) nextIdx = 0;
  return mix(uColors[idx], uColors[nextIdx], blend);
}

vec3 strandColor(float t) {
  if (uColorCount > 0) return samplePalette(t);
  return spectrum(t);
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution) / uResolution.y;
  uv /= max(uScale, 0.0001);

  float e = 0.06 + uIntensity * 0.94;
  float env = pow(max(cos(uv.x * PI * 1.3), 0.0), uTaper);

  vec3 col = vec3(0.0);

  for (int i = 0; i < \${MAX_STRANDS}; i++) {
    if (i >= uStrandCount) break;

    float fi = float(i);
    float ph = fi * 1.7 * uSpread;
    float freq = (2.0 + fi * 0.35) * uWaviness;
    float spd = 1.4 + fi * 1.2;

    float tt = uTime * uSpeed;
    float w = sin(uv.x * freq + tt * spd + ph) * 0.60
            + sin(uv.x * freq * 1.1 - tt * spd * 0.7 + ph * 1.7) * 0.40;

    float amp = (0.1 + 0.02 * e) * env * uAmplitude;
    float y = w * amp;

    float d = abs(uv.y - y);
    float thick = (0.001 + 0.05 * e) * (0.35 + env) * uThickness;
    float g = thick / (d + thick * 0.45);
    g = g * g;

    float h = fi / float(uStrandCount) + uv.x * 0.30 + uTime * 0.04 + uHueShift;
    col += strandColor(h) * g * env;
  }

  col *= 0.45 + 0.7 * e;
  col = 1.0 - exp(-col * uGlow);

  float gray = dot(col, vec3(0.2126, 0.7152, 0.0722));
  col = max(mix(vec3(gray), col, uSaturation), 0.0);

  float lum = max(max(col.r, col.g), col.b);
  float alpha = clamp(lum, 0.0, 1.0) * uOpacity;

  fragColor = vec4(col * uOpacity, alpha);
}
\`;

const GLASS_FRAG = \`#version 300 es
precision highp float;

uniform sampler2D uScene;
uniform vec2 uResolution;
uniform float uRadius;
uniform float uRefraction;
uniform float uDispersion;

out vec4 fragColor;

vec2 toUv(vec2 p) {
  return p * (uResolution.y / uResolution) + 0.5;
}

void main() {
  vec2 p = (gl_FragCoord.xy - 0.5 * uResolution) / uResolution.y;
  float d = length(p);
  float r = uRadius;

  float edge = fwidth(d) * 1.5;
  float mask = 1.0 - smoothstep(r - edge, r + edge, d);
  if (mask <= 0.0) {
    fragColor = vec4(0.0);
    return;
  }

  // sphere height: 0 at the rim, 1 at the center
  float z = sqrt(max(r * r - d * d, 0.0)) / r;
  float nd = d / r; // 0 at the center, 1 at the rim

  // refraction is confined to a narrow band near the rim; the rest stays undistorted
  vec2 dir = d > 0.0 ? p / d : vec2(0.0);
  float lens = smoothstep(0.85, 1.0, nd) * pow(nd, 6.0);
  vec2 offset = -dir * lens * uRefraction * 0.15;
  vec2 disp = -dir * lens * uDispersion * 0.012;

  vec3 light;
  light.r = texture(uScene, toUv(p + offset - disp)).r;
  light.g = texture(uScene, toUv(p + offset)).g;
  light.b = texture(uScene, toUv(p + offset + disp)).b;

  // neutral fresnel rim (no color tint so the glass stays clear)
  float fres = pow(1.0 - z, 3.0);
  vec3 rim = vec3(1.0) * fres * 0.18;

  // specular highlight from the upper-left
  vec2 lightDir = normalize(vec2(-0.55, 0.6));
  float spec = pow(max(dot(p / max(r, 1e-4), lightDir), 0.0), 6.0);
  spec *= smoothstep(r, r * 0.55, d);

  vec3 emissive = light + rim + vec3(spec) * 0.4;
  float emissiveA = clamp(max(max(emissive.r, emissive.g), emissive.b), 0.0, 1.0);

  // almost clear glass body: only a faint neutral darkening, mostly near the rim
  float bodyA = 0.05 + fres * 0.05;

  // composite emissive light over the clear body (premultiplied)
  float outA = emissiveA + bodyA * (1.0 - emissiveA);
  vec3 outRGB = emissive;

  outRGB *= mask;
  outA *= mask;

  fragColor = vec4(outRGB, outA);
}
\`;

export interface StrandsProps {
  colors?: string[];
  count?: number;
  speed?: number;
  amplitude?: number;
  waviness?: number;
  thickness?: number;
  glow?: number;
  taper?: number;
  spread?: number;
  hueShift?: number;
  intensity?: number;
  saturation?: number;
  opacity?: number;
  scale?: number;
  glass?: boolean;
  refraction?: number;
  dispersion?: number;
  glassSize?: number;
  className?: string;
  style?: CSSProperties;
}

const buildPalette = (colors: string[]): number[][] => {
  const filled = colors && colors.length ? colors : ['#ffffff'];
  const padded: number[][] = [];
  for (let i = 0; i < MAX_COLORS; i++) {
    const hex = filled[i] ?? filled[filled.length - 1];
    const c = new Color(hex);
    padded.push([c.r, c.g, c.b]);
  }
  return padded;
};

export default function Strands({
  colors = ['#FF4242', '#7C3AED', '#06B6D4', '#EAB308'],
  count = 3,
  speed = 0.5,
  amplitude = 1,
  waviness = 1,
  thickness = 0.7,
  glow = 2.6,
  taper = 3,
  spread = 1,
  hueShift = 0,
  intensity = 0.6,
  saturation = 1.5,
  opacity = 1,
  scale = 1.5,
  glass = false,
  refraction = 1,
  dispersion = 1,
  glassSize = 1,
  className = '',
  style
}: StrandsProps) {
  const propsRef = useRef<Required<Omit<StrandsProps, 'className' | 'style'>>>({
    colors,
    count,
    speed,
    amplitude,
    waviness,
    thickness,
    glow,
    taper,
    spread,
    hueShift,
    intensity,
    saturation,
    opacity,
    scale,
    glass,
    refraction,
    dispersion,
    glassSize
  });
  propsRef.current = {
    colors,
    count,
    speed,
    amplitude,
    waviness,
    thickness,
    glow,
    taper,
    spread,
    hueShift,
    intensity,
    saturation,
    opacity,
    scale,
    glass,
    refraction,
    dispersion,
    glassSize
  };

  const ctnDom = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctn = ctnDom.current;
    if (!ctn) return;

    const renderer = new Renderer({
      alpha: true,
      premultipliedAlpha: true,
      antialias: true
    });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.canvas.style.backgroundColor = 'transparent';

    const geometry = new Triangle(gl);
    if (geometry.attributes.uv) {
      delete geometry.attributes.uv;
    }

    const program = new Program(gl, {
      vertex: VERT,
      fragment: FRAG,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: [ctn.offsetWidth, ctn.offsetHeight] },
        uColors: { value: buildPalette(propsRef.current.colors) },
        uColorCount: { value: Math.min(propsRef.current.colors.length, MAX_COLORS) },
        uStrandCount: { value: Math.min(propsRef.current.count, MAX_STRANDS) },
        uSpeed: { value: speed },
        uAmplitude: { value: amplitude },
        uWaviness: { value: waviness },
        uThickness: { value: thickness },
        uGlow: { value: glow },
        uTaper: { value: taper },
        uSpread: { value: spread },
        uHueShift: { value: hueShift },
        uIntensity: { value: intensity },
        uOpacity: { value: opacity },
        uScale: { value: scale },
        uSaturation: { value: saturation }
      }
    });

    const mesh = new Mesh(gl, { geometry, program });

    const renderTarget = new RenderTarget(gl, {
      width: ctn.offsetWidth,
      height: ctn.offsetHeight
    });

    const glassProgram = new Program(gl, {
      vertex: VERT,
      fragment: GLASS_FRAG,
      uniforms: {
        uScene: { value: renderTarget.texture },
        uResolution: { value: [ctn.offsetWidth, ctn.offsetHeight] },
        uRadius: { value: 0.46 * glassSize },
        uRefraction: { value: refraction },
        uDispersion: { value: dispersion }
      }
    });
    const glassMesh = new Mesh(gl, { geometry, program: glassProgram });

    ctn.appendChild(gl.canvas);

    function resize() {
      if (!ctn) return;
      const width = ctn.offsetWidth;
      const height = ctn.offsetHeight;
      renderer.setSize(width, height);
      program.uniforms.uResolution.value = [width, height];
      renderTarget.setSize(width, height);
      glassProgram.uniforms.uResolution.value = [width, height];
    }
    window.addEventListener('resize', resize);
    resize();

    let animateId = 0;
    const update = (t: number) => {
      animateId = requestAnimationFrame(update);
      const current = propsRef.current;
      program.uniforms.uTime.value = t * 0.001;
      program.uniforms.uColors.value = buildPalette(current.colors);
      program.uniforms.uColorCount.value = Math.min(current.colors.length, MAX_COLORS);
      program.uniforms.uStrandCount.value = Math.min(Math.max(Math.round(current.count), 1), MAX_STRANDS);
      program.uniforms.uSpeed.value = current.speed;
      program.uniforms.uAmplitude.value = current.amplitude;
      program.uniforms.uWaviness.value = current.waviness;
      program.uniforms.uThickness.value = current.thickness;
      program.uniforms.uGlow.value = current.glow;
      program.uniforms.uTaper.value = current.taper;
      program.uniforms.uSpread.value = current.spread;
      program.uniforms.uHueShift.value = current.hueShift;
      program.uniforms.uIntensity.value = current.intensity;
      program.uniforms.uOpacity.value = current.opacity;
      program.uniforms.uScale.value = current.scale;
      program.uniforms.uSaturation.value = current.saturation;

      if (current.glass) {
        renderer.render({ scene: mesh, target: renderTarget });
        glassProgram.uniforms.uScene.value = renderTarget.texture;
        glassProgram.uniforms.uRefraction.value = current.refraction;
        glassProgram.uniforms.uDispersion.value = current.dispersion;
        glassProgram.uniforms.uRadius.value = 0.46 * current.glassSize;
        renderer.render({ scene: glassMesh });
      } else {
        renderer.render({ scene: mesh });
      }
    };
    animateId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(animateId);
      window.removeEventListener('resize', resize);
      if (ctn && gl.canvas.parentNode === ctn) {
        ctn.removeChild(gl.canvas);
      }
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={ctnDom} className={\`strands-container \${className}\`} style={style} />;
}
`,de=`import { Renderer, Program, Mesh, Color, Triangle, RenderTarget } from 'ogl';
import { useEffect, useRef, CSSProperties } from 'react';

const MAX_STRANDS = 12;
const MAX_COLORS = 8;

const VERT = \`#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
\`;

const FRAG = \`#version 300 es
precision highp float;

uniform float uTime;
uniform vec2 uResolution;
uniform vec3 uColors[\${MAX_COLORS}];
uniform int uColorCount;
uniform int uStrandCount;
uniform float uSpeed;
uniform float uAmplitude;
uniform float uWaviness;
uniform float uThickness;
uniform float uGlow;
uniform float uTaper;
uniform float uSpread;
uniform float uHueShift;
uniform float uIntensity;
uniform float uOpacity;
uniform float uScale;
uniform float uSaturation;

out vec4 fragColor;

const float PI = 3.14159265;

vec3 spectrum(float t) {
  return 0.5 + 0.5 * cos(2.0 * PI * (t + vec3(0.00, 0.33, 0.67)));
}

vec3 samplePalette(float t) {
  t = fract(t);
  float scaled = t * float(uColorCount);
  int idx = int(floor(scaled));
  float blend = fract(scaled);
  int nextIdx = idx + 1;
  if (nextIdx >= uColorCount) nextIdx = 0;
  return mix(uColors[idx], uColors[nextIdx], blend);
}

vec3 strandColor(float t) {
  if (uColorCount > 0) return samplePalette(t);
  return spectrum(t);
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution) / uResolution.y;
  uv /= max(uScale, 0.0001);

  float e = 0.06 + uIntensity * 0.94;
  float env = pow(max(cos(uv.x * PI * 1.3), 0.0), uTaper);

  vec3 col = vec3(0.0);

  for (int i = 0; i < \${MAX_STRANDS}; i++) {
    if (i >= uStrandCount) break;

    float fi = float(i);
    float ph = fi * 1.7 * uSpread;
    float freq = (2.0 + fi * 0.35) * uWaviness;
    float spd = 1.4 + fi * 1.2;

    float tt = uTime * uSpeed;
    float w = sin(uv.x * freq + tt * spd + ph) * 0.60
            + sin(uv.x * freq * 1.1 - tt * spd * 0.7 + ph * 1.7) * 0.40;

    float amp = (0.1 + 0.02 * e) * env * uAmplitude;
    float y = w * amp;

    float d = abs(uv.y - y);
    float thick = (0.001 + 0.05 * e) * (0.35 + env) * uThickness;
    float g = thick / (d + thick * 0.45);
    g = g * g;

    float h = fi / float(uStrandCount) + uv.x * 0.30 + uTime * 0.04 + uHueShift;
    col += strandColor(h) * g * env;
  }

  col *= 0.45 + 0.7 * e;
  col = 1.0 - exp(-col * uGlow);

  float gray = dot(col, vec3(0.2126, 0.7152, 0.0722));
  col = max(mix(vec3(gray), col, uSaturation), 0.0);

  float lum = max(max(col.r, col.g), col.b);
  float alpha = clamp(lum, 0.0, 1.0) * uOpacity;

  fragColor = vec4(col * uOpacity, alpha);
}
\`;

const GLASS_FRAG = \`#version 300 es
precision highp float;

uniform sampler2D uScene;
uniform vec2 uResolution;
uniform float uRadius;
uniform float uRefraction;
uniform float uDispersion;

out vec4 fragColor;

vec2 toUv(vec2 p) {
  return p * (uResolution.y / uResolution) + 0.5;
}

void main() {
  vec2 p = (gl_FragCoord.xy - 0.5 * uResolution) / uResolution.y;
  float d = length(p);
  float r = uRadius;

  float edge = fwidth(d) * 1.5;
  float mask = 1.0 - smoothstep(r - edge, r + edge, d);
  if (mask <= 0.0) {
    fragColor = vec4(0.0);
    return;
  }

  // sphere height: 0 at the rim, 1 at the center
  float z = sqrt(max(r * r - d * d, 0.0)) / r;
  float nd = d / r; // 0 at the center, 1 at the rim

  // refraction is confined to a narrow band near the rim; the rest stays undistorted
  vec2 dir = d > 0.0 ? p / d : vec2(0.0);
  float lens = smoothstep(0.85, 1.0, nd) * pow(nd, 6.0);
  vec2 offset = -dir * lens * uRefraction * 0.15;
  vec2 disp = -dir * lens * uDispersion * 0.012;

  vec3 light;
  light.r = texture(uScene, toUv(p + offset - disp)).r;
  light.g = texture(uScene, toUv(p + offset)).g;
  light.b = texture(uScene, toUv(p + offset + disp)).b;

  // neutral fresnel rim (no color tint so the glass stays clear)
  float fres = pow(1.0 - z, 3.0);
  vec3 rim = vec3(1.0) * fres * 0.18;

  // specular highlight from the upper-left
  vec2 lightDir = normalize(vec2(-0.55, 0.6));
  float spec = pow(max(dot(p / max(r, 1e-4), lightDir), 0.0), 6.0);
  spec *= smoothstep(r, r * 0.55, d);

  vec3 emissive = light + rim + vec3(spec) * 0.4;
  float emissiveA = clamp(max(max(emissive.r, emissive.g), emissive.b), 0.0, 1.0);

  // almost clear glass body: only a faint neutral darkening, mostly near the rim
  float bodyA = 0.05 + fres * 0.05;

  // composite emissive light over the clear body (premultiplied)
  float outA = emissiveA + bodyA * (1.0 - emissiveA);
  vec3 outRGB = emissive;

  outRGB *= mask;
  outA *= mask;

  fragColor = vec4(outRGB, outA);
}
\`;

export interface StrandsProps {
  colors?: string[];
  count?: number;
  speed?: number;
  amplitude?: number;
  waviness?: number;
  thickness?: number;
  glow?: number;
  taper?: number;
  spread?: number;
  hueShift?: number;
  intensity?: number;
  saturation?: number;
  opacity?: number;
  scale?: number;
  glass?: boolean;
  refraction?: number;
  dispersion?: number;
  glassSize?: number;
  className?: string;
  style?: CSSProperties;
}

const buildPalette = (colors: string[]): number[][] => {
  const filled = colors && colors.length ? colors : ['#ffffff'];
  const padded: number[][] = [];
  for (let i = 0; i < MAX_COLORS; i++) {
    const hex = filled[i] ?? filled[filled.length - 1];
    const c = new Color(hex);
    padded.push([c.r, c.g, c.b]);
  }
  return padded;
};

export default function Strands({
  colors = ['#FF4242', '#7C3AED', '#06B6D4', '#EAB308'],
  count = 3,
  speed = 0.5,
  amplitude = 1,
  waviness = 1,
  thickness = 0.7,
  glow = 2.6,
  taper = 3,
  spread = 1,
  hueShift = 0,
  intensity = 0.6,
  saturation = 1.5,
  opacity = 1,
  scale = 1.5,
  glass = false,
  refraction = 1,
  dispersion = 1,
  glassSize = 1,
  className = '',
  style
}: StrandsProps) {
  const propsRef = useRef<Required<Omit<StrandsProps, 'className' | 'style'>>>({
    colors,
    count,
    speed,
    amplitude,
    waviness,
    thickness,
    glow,
    taper,
    spread,
    hueShift,
    intensity,
    saturation,
    opacity,
    scale,
    glass,
    refraction,
    dispersion,
    glassSize
  });
  propsRef.current = {
    colors,
    count,
    speed,
    amplitude,
    waviness,
    thickness,
    glow,
    taper,
    spread,
    hueShift,
    intensity,
    saturation,
    opacity,
    scale,
    glass,
    refraction,
    dispersion,
    glassSize
  };

  const ctnDom = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctn = ctnDom.current;
    if (!ctn) return;

    const renderer = new Renderer({
      alpha: true,
      premultipliedAlpha: true,
      antialias: true
    });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.canvas.style.backgroundColor = 'transparent';

    const geometry = new Triangle(gl);
    if (geometry.attributes.uv) {
      delete geometry.attributes.uv;
    }

    const program = new Program(gl, {
      vertex: VERT,
      fragment: FRAG,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: [ctn.offsetWidth, ctn.offsetHeight] },
        uColors: { value: buildPalette(propsRef.current.colors) },
        uColorCount: { value: Math.min(propsRef.current.colors.length, MAX_COLORS) },
        uStrandCount: { value: Math.min(propsRef.current.count, MAX_STRANDS) },
        uSpeed: { value: speed },
        uAmplitude: { value: amplitude },
        uWaviness: { value: waviness },
        uThickness: { value: thickness },
        uGlow: { value: glow },
        uTaper: { value: taper },
        uSpread: { value: spread },
        uHueShift: { value: hueShift },
        uIntensity: { value: intensity },
        uOpacity: { value: opacity },
        uScale: { value: scale },
        uSaturation: { value: saturation }
      }
    });

    const mesh = new Mesh(gl, { geometry, program });

    const renderTarget = new RenderTarget(gl, {
      width: ctn.offsetWidth,
      height: ctn.offsetHeight
    });

    const glassProgram = new Program(gl, {
      vertex: VERT,
      fragment: GLASS_FRAG,
      uniforms: {
        uScene: { value: renderTarget.texture },
        uResolution: { value: [ctn.offsetWidth, ctn.offsetHeight] },
        uRadius: { value: 0.46 * glassSize },
        uRefraction: { value: refraction },
        uDispersion: { value: dispersion }
      }
    });
    const glassMesh = new Mesh(gl, { geometry, program: glassProgram });

    ctn.appendChild(gl.canvas);

    function resize() {
      if (!ctn) return;
      const width = ctn.offsetWidth;
      const height = ctn.offsetHeight;
      renderer.setSize(width, height);
      program.uniforms.uResolution.value = [width, height];
      renderTarget.setSize(width, height);
      glassProgram.uniforms.uResolution.value = [width, height];
    }
    window.addEventListener('resize', resize);
    resize();

    let animateId = 0;
    const update = (t: number) => {
      animateId = requestAnimationFrame(update);
      const current = propsRef.current;
      program.uniforms.uTime.value = t * 0.001;
      program.uniforms.uColors.value = buildPalette(current.colors);
      program.uniforms.uColorCount.value = Math.min(current.colors.length, MAX_COLORS);
      program.uniforms.uStrandCount.value = Math.min(Math.max(Math.round(current.count), 1), MAX_STRANDS);
      program.uniforms.uSpeed.value = current.speed;
      program.uniforms.uAmplitude.value = current.amplitude;
      program.uniforms.uWaviness.value = current.waviness;
      program.uniforms.uThickness.value = current.thickness;
      program.uniforms.uGlow.value = current.glow;
      program.uniforms.uTaper.value = current.taper;
      program.uniforms.uSpread.value = current.spread;
      program.uniforms.uHueShift.value = current.hueShift;
      program.uniforms.uIntensity.value = current.intensity;
      program.uniforms.uOpacity.value = current.opacity;
      program.uniforms.uScale.value = current.scale;
      program.uniforms.uSaturation.value = current.saturation;

      if (current.glass) {
        renderer.render({ scene: mesh, target: renderTarget });
        glassProgram.uniforms.uScene.value = renderTarget.texture;
        glassProgram.uniforms.uRefraction.value = current.refraction;
        glassProgram.uniforms.uDispersion.value = current.dispersion;
        glassProgram.uniforms.uRadius.value = 0.46 * current.glassSize;
        renderer.render({ scene: glassMesh });
      } else {
        renderer.render({ scene: mesh });
      }
    };
    animateId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(animateId);
      window.removeEventListener('resize', resize);
      if (ctn && gl.canvas.parentNode === ctn) {
        ctn.removeChild(gl.canvas);
      }
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={ctnDom} className={\`relative w-full h-full bg-transparent \${className}\`} style={style} />;
}
`,pe={dependencies:"ogl",usage:`import Strands from './Strands';

<div style={{ width: '100%', height: '600px', position: 'relative' }}>
  <Strands
    colors={["#FF4242", "#7C3AED", "#06B6D4", "#EAB308"]}
    count={3}
    speed={0.5}
    amplitude={1}
    waviness={1}
    thickness={0.7}
    glow={2.6}
    taper={3}
    spread={1}
    intensity={0.6}
    saturation={1.5}
    opacity={1}
    scale={1.5}
    glass={false}
    refraction={1}
    dispersion={1}
    glassSize={1}
  />
</div>`,code:le,css:fe,tailwind:ce,tsCode:me,tsTailwind:de},B=12,F=8,X=`#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`,ge=`#version 300 es
precision highp float;

uniform float uTime;
uniform vec2 uResolution;
uniform vec3 uColors[${F}];
uniform int uColorCount;
uniform int uStrandCount;
uniform float uSpeed;
uniform float uAmplitude;
uniform float uWaviness;
uniform float uThickness;
uniform float uGlow;
uniform float uTaper;
uniform float uSpread;
uniform float uHueShift;
uniform float uIntensity;
uniform float uOpacity;
uniform float uScale;
uniform float uSaturation;

out vec4 fragColor;

const float PI = 3.14159265;

vec3 spectrum(float t) {
  return 0.5 + 0.5 * cos(2.0 * PI * (t + vec3(0.00, 0.33, 0.67)));
}

vec3 samplePalette(float t) {
  t = fract(t);
  float scaled = t * float(uColorCount);
  int idx = int(floor(scaled));
  float blend = fract(scaled);
  int nextIdx = idx + 1;
  if (nextIdx >= uColorCount) nextIdx = 0;
  return mix(uColors[idx], uColors[nextIdx], blend);
}

vec3 strandColor(float t) {
  if (uColorCount > 0) return samplePalette(t);
  return spectrum(t);
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution) / uResolution.y;
  uv /= max(uScale, 0.0001);

  float e = 0.06 + uIntensity * 0.94;
  float env = pow(max(cos(uv.x * PI * 1.3), 0.0), uTaper);

  vec3 col = vec3(0.0);

  for (int i = 0; i < ${B}; i++) {
    if (i >= uStrandCount) break;

    float fi = float(i);
    float ph = fi * 1.7 * uSpread;
    float freq = (2.0 + fi * 0.35) * uWaviness;
    float spd = 1.4 + fi * 1.2;

    float tt = uTime * uSpeed;
    float w = sin(uv.x * freq + tt * spd + ph) * 0.60
            + sin(uv.x * freq * 1.1 - tt * spd * 0.7 + ph * 1.7) * 0.40;

    float amp = (0.1 + 0.02 * e) * env * uAmplitude;
    float y = w * amp;

    float d = abs(uv.y - y);
    float thick = (0.001 + 0.05 * e) * (0.35 + env) * uThickness;
    float g = thick / (d + thick * 0.45);
    g = g * g;

    float h = fi / float(uStrandCount) + uv.x * 0.30 + uTime * 0.04 + uHueShift;
    col += strandColor(h) * g * env;
  }

  col *= 0.45 + 0.7 * e;
  col = 1.0 - exp(-col * uGlow);

  float gray = dot(col, vec3(0.2126, 0.7152, 0.0722));
  col = max(mix(vec3(gray), col, uSaturation), 0.0);

  float lum = max(max(col.r, col.g), col.b);
  float alpha = clamp(lum, 0.0, 1.0) * uOpacity;

  fragColor = vec4(col * uOpacity, alpha);
}
`,he=`#version 300 es
precision highp float;

uniform sampler2D uScene;
uniform vec2 uResolution;
uniform float uRadius;
uniform float uRefraction;
uniform float uDispersion;

out vec4 fragColor;

vec2 toUv(vec2 p) {
  return p * (uResolution.y / uResolution) + 0.5;
}

void main() {
  vec2 p = (gl_FragCoord.xy - 0.5 * uResolution) / uResolution.y;
  float d = length(p);
  float r = uRadius;

  float edge = fwidth(d) * 1.5;
  float mask = 1.0 - smoothstep(r - edge, r + edge, d);
  if (mask <= 0.0) {
    fragColor = vec4(0.0);
    return;
  }

  // sphere height: 0 at the rim, 1 at the center
  float z = sqrt(max(r * r - d * d, 0.0)) / r;
  float nd = d / r; // 0 at the center, 1 at the rim

  // refraction is confined to a narrow band near the rim; the rest stays undistorted
  vec2 dir = d > 0.0 ? p / d : vec2(0.0);
  float lens = smoothstep(0.85, 1.0, nd) * pow(nd, 6.0);
  vec2 offset = -dir * lens * uRefraction * 0.15;
  vec2 disp = -dir * lens * uDispersion * 0.012;

  vec3 light;
  light.r = texture(uScene, toUv(p + offset - disp)).r;
  light.g = texture(uScene, toUv(p + offset)).g;
  light.b = texture(uScene, toUv(p + offset + disp)).b;

  // neutral fresnel rim (no color tint so the glass stays clear)
  float fres = pow(1.0 - z, 3.0);
  vec3 rim = vec3(1.0) * fres * 0.18;

  // specular highlight from the upper-left
  vec2 lightDir = normalize(vec2(-0.55, 0.6));
  float spec = pow(max(dot(p / max(r, 1e-4), lightDir), 0.0), 6.0);
  spec *= smoothstep(r, r * 0.55, d);

  vec3 emissive = light + rim + vec3(spec) * 0.4;
  float emissiveA = clamp(max(max(emissive.r, emissive.g), emissive.b), 0.0, 1.0);

  // almost clear glass body: only a faint neutral darkening, mostly near the rim
  float bodyA = 0.05 + fres * 0.05;

  // composite emissive light over the clear body (premultiplied)
  float outA = emissiveA + bodyA * (1.0 - emissiveA);
  vec3 outRGB = emissive;

  outRGB *= mask;
  outA *= mask;

  fragColor = vec4(outRGB, outA);
}
`,j=d=>{const n=d&&d.length?d:["#ffffff"],s=[];for(let r=0;r<F;r++){const p=n[r]??n[n.length-1],f=new ie(p);s.push([f.r,f.g,f.b])}return s};function ve({colors:d=["#FF4242","#7C3AED","#06B6D4","#EAB308"],count:n=3,speed:s=.5,amplitude:r=1,waviness:p=1,thickness:f=.7,glow:c=2.6,taper:m=3,spread:x=1,hueShift:C=0,intensity:y=.6,saturation:b=1.5,opacity:h=1,scale:w=1.5,glass:E=!1,refraction:v=1,dispersion:T=1,glassSize:A=1,className:P="",style:S}){const i=k.useRef({});i.current={colors:d,count:n,speed:s,amplitude:r,waviness:p,thickness:f,glow:c,taper:m,spread:x,hueShift:C,intensity:y,saturation:b,opacity:h,scale:w,glass:E,refraction:v,dispersion:T,glassSize:A};const N=k.useRef(null);return k.useEffect(()=>{const u=N.current;if(!u)return;const R=new se({alpha:!0,premultipliedAlpha:!0,antialias:!0}),a=R.gl;a.clearColor(0,0,0,0),a.enable(a.BLEND),a.blendFunc(a.ONE,a.ONE_MINUS_SRC_ALPHA),a.canvas.style.backgroundColor="transparent";const D=new ae(a);D.attributes.uv&&delete D.attributes.uv;const e=new H(a,{vertex:X,fragment:ge,uniforms:{uTime:{value:0},uResolution:{value:[u.offsetWidth,u.offsetHeight]},uColors:{value:j(i.current.colors)},uColorCount:{value:Math.min(i.current.colors.length,F)},uStrandCount:{value:Math.min(i.current.count,B)},uSpeed:{value:s},uAmplitude:{value:r},uWaviness:{value:p},uThickness:{value:f},uGlow:{value:c},uTaper:{value:m},uSpread:{value:x},uHueShift:{value:C},uIntensity:{value:y},uOpacity:{value:h},uScale:{value:w},uSaturation:{value:b}}}),G=new U(a,{geometry:D,program:e}),M=new ue(a,{width:u.offsetWidth,height:u.offsetHeight}),_=new H(a,{vertex:X,fragment:he,uniforms:{uScene:{value:M.texture},uResolution:{value:[u.offsetWidth,u.offsetHeight]},uRadius:{value:.46*A},uRefraction:{value:v},uDispersion:{value:T}}}),V=new U(a,{geometry:D,program:_});u.appendChild(a.canvas);function O(){if(!u)return;const g=u.offsetWidth,o=u.offsetHeight;R.setSize(g,o),e.uniforms.uResolution.value=[g,o],M.setSize(g,o),_.uniforms.uResolution.value=[g,o]}window.addEventListener("resize",O),O();let I=0;const L=g=>{I=requestAnimationFrame(L);const o=i.current;e.uniforms.uTime.value=g*.001,e.uniforms.uColors.value=j(o.colors),e.uniforms.uColorCount.value=Math.min(o.colors.length,F),e.uniforms.uStrandCount.value=Math.min(Math.max(Math.round(o.count),1),B),e.uniforms.uSpeed.value=o.speed,e.uniforms.uAmplitude.value=o.amplitude,e.uniforms.uWaviness.value=o.waviness,e.uniforms.uThickness.value=o.thickness,e.uniforms.uGlow.value=o.glow,e.uniforms.uTaper.value=o.taper,e.uniforms.uSpread.value=o.spread,e.uniforms.uHueShift.value=o.hueShift,e.uniforms.uIntensity.value=o.intensity,e.uniforms.uOpacity.value=o.opacity,e.uniforms.uScale.value=o.scale,e.uniforms.uSaturation.value=o.saturation,o.glass?(R.render({scene:G,target:M}),_.uniforms.uScene.value=M.texture,_.uniforms.uRefraction.value=o.refraction,_.uniforms.uDispersion.value=o.dispersion,_.uniforms.uRadius.value=.46*o.glassSize,R.render({scene:V})):R.render({scene:G})};return I=requestAnimationFrame(L),()=>{var g;cancelAnimationFrame(I),window.removeEventListener("resize",O),u&&a.canvas.parentNode===u&&u.removeChild(a.canvas),(g=a.getExtension("WEBGL_lose_context"))==null||g.loseContext()}},[]),t.jsx("div",{ref:N,className:`strands-container ${P}`,style:S})}const q={color1:"#F97316",color2:"#7C3AED",color3:"#06B6D4",count:3,speed:.5,amplitude:1,waviness:1,thickness:.7,glow:2.6,taper:3,spread:1,hueShift:0,intensity:.6,saturation:2,opacity:1,scale:1.5,glass:!1,refraction:1,dispersion:1,glassSize:1},ke=()=>{const{props:d,updateProp:n,resetProps:s,hasChanges:r}=Y(q),{color1:p,color2:f,color3:c,count:m,speed:x,amplitude:C,waviness:y,thickness:b,glow:h,taper:w,spread:E,hueShift:v,intensity:T,saturation:A,opacity:P,scale:S,glass:i,refraction:N,dispersion:u,glassSize:R}=d,a=[p,f,c],D=k.useMemo(()=>[{name:"colors",type:"string[]",default:'["#FF4242", "#7C3AED", "#06B6D4", "#EAB308"]',description:"Palette of hex colors cycled across the strands. Pass an empty array to use the built-in rainbow spectrum."},{name:"count",type:"number",default:"3",description:"Number of strands woven through the animation."},{name:"speed",type:"number",default:"0.5",description:"How quickly the strands ripple and flow."},{name:"amplitude",type:"number",default:"1",description:"Vertical reach of each strand as it waves up and down."},{name:"waviness",type:"number",default:"1",description:"Density of the curves along each strand."},{name:"thickness",type:"number",default:"0.7",description:"Width of each glowing strand."},{name:"glow",type:"number",default:"2.6",description:"Strength of the luminous bloom around the strands."},{name:"taper",type:"number",default:"3",description:"How sharply the strands fade out toward the edges."},{name:"spread",type:"number",default:"1",description:"Separation between strands so they fan out instead of overlapping."},{name:"hueShift",type:"number",default:"0",description:"Rotates the colors around the strands for variation."},{name:"intensity",type:"number",default:"0.6",description:"Overall brightness and energy of the effect."},{name:"saturation",type:"number",default:"1",description:"Vibrance of the colors. Above 1 makes them more intense, below 1 fades to grayscale."},{name:"opacity",type:"number",default:"1",description:"Overall transparency of the rendered strands."},{name:"scale",type:"number",default:"1",description:"Zooms the whole effect in or out to make the strands bigger or smaller."},{name:"glass",type:"boolean",default:"false",description:"Renders the strands inside a refractive glass ball."},{name:"refraction",type:"number",default:"1",description:"How strongly the glass ball bends the light passing through it."},{name:"dispersion",type:"number",default:"1",description:"Amount of rainbow color separation along the edges of the glass ball."},{name:"glassSize",type:"number",default:"1",description:"Size of the glass ball relative to the canvas."}],[]);return t.jsx(Z,{props:d,defaultProps:q,resetProps:s,hasChanges:r,demoOnlyProps:["color1","color2","color3","color4"],computedProps:{colors:a},children:t.jsxs(J,{children:[t.jsxs(K,{children:[t.jsxs($,{position:"relative",className:"demo-container",h:500,p:0,overflow:"hidden",children:[t.jsx(ve,{colors:a,count:m,speed:x,amplitude:C,waviness:y,thickness:b,glow:h,taper:w,spread:E,hueShift:v,intensity:T,saturation:A,opacity:P,scale:S,glass:i,refraction:N,dispersion:u,glassSize:R}),"          "]}),t.jsxs(re,{className:"preview-options",children:[t.jsx(z,{title:"Color 1",color:p,onChange:e=>n("color1",e)}),t.jsx(z,{title:"Color 2",color:f,onChange:e=>n("color2",e)}),t.jsx(z,{title:"Color 3",color:c,onChange:e=>n("color3",e)}),t.jsx(l,{title:"Count",min:1,max:10,step:1,value:m,onChange:e=>n("count",e),width:150}),t.jsx(l,{title:"Speed",min:0,max:3,step:.1,value:x,onChange:e=>n("speed",e),width:150}),t.jsx(l,{title:"Amplitude",min:0,max:3,step:.1,value:C,onChange:e=>n("amplitude",e),width:150}),t.jsx(l,{title:"Waviness",min:.2,max:3,step:.1,value:y,onChange:e=>n("waviness",e),width:150}),t.jsx(l,{title:"Thickness",min:.2,max:4,step:.1,value:b,onChange:e=>n("thickness",e),width:150}),t.jsx(l,{title:"Glow",min:.3,max:3,step:.05,value:h,onChange:e=>n("glow",e),width:150}),t.jsx(l,{title:"Taper",min:.5,max:6,step:.1,value:w,onChange:e=>n("taper",e),width:150}),t.jsx(l,{title:"Spread",min:0,max:3,step:.1,value:E,onChange:e=>n("spread",e),width:150}),t.jsx(l,{title:"Hue Shift",min:0,max:1,step:.01,value:v,onChange:e=>n("hueShift",e),width:150}),t.jsx(l,{title:"Intensity",min:0,max:1,step:.05,value:T,onChange:e=>n("intensity",e),width:150}),t.jsx(l,{title:"Saturation",min:0,max:2,step:.05,value:A,onChange:e=>n("saturation",e),width:150}),t.jsx(l,{title:"Opacity",min:0,max:1,step:.05,value:P,onChange:e=>n("opacity",e),width:150}),t.jsx(l,{title:"Scale",min:.3,max:3,step:.1,value:S,onChange:e=>n("scale",e),width:150}),t.jsx(oe,{title:"Glass Ball",isChecked:i,onChange:e=>n("glass",e)}),t.jsx(l,{title:"Refraction",min:0,max:3,step:.05,value:N,isDisabled:!i,onChange:e=>n("refraction",e),width:150}),t.jsx(l,{title:"Dispersion",min:0,max:4,step:.05,value:u,isDisabled:!i,onChange:e=>n("dispersion",e),width:150}),t.jsx(l,{title:"Glass Size",min:.3,max:1,step:.01,value:R,isDisabled:!i,onChange:e=>n("glassSize",e),width:150})]}),t.jsx(Q,{data:D}),t.jsx(te,{dependencyList:["ogl"]})]}),t.jsx(ee,{children:t.jsx(ne,{codeObject:pe,componentName:"Strands"})})]})})};export{ke as default};
