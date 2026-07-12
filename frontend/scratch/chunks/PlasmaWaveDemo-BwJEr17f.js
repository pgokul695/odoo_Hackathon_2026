import{r as R,j as n,B as y,F as C}from"./index-TQprzHkU.js";import{u as O,C as P,T,P as S,O as B,a as F,b as D,c as L}from"./useComponentProps-CjYSqekE.js";import{D as A}from"./Dependencies-IIL9riMN.js";import{u as z}from"./useForceRerender-Dq8YDj2j.js";import{C as I}from"./Customize-BdikCFm5.js";import{P as t}from"./PreviewSlider-CCbi2och.js";import{P as g}from"./PreviewColorPickerCustom-BFsDkSOr.js";import{B as k}from"./BackgroundContent-DECESWxY.js";import E from"./PlasmaWave-Cu6atA80.js";import"./index-DQmtNYX5.js";import"./CodeHighlighter-Dx4QNbvH.js";import"./rotate-ccw-_xDu3G0k.js";/* empty css                       */import"./PreviewSwitch-CcPSwIGg.js";import"./Mesh-CwXV3WjE.js";import"./Camera-BM3HOhP6.js";const _=`import { useRef, useEffect } from 'react';
import { Renderer, Camera, Transform, Program, Mesh, Geometry } from 'ogl';

import './PlasmaWave.css';

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  return [r, g, b];
}

const VERT = /* glsl */ \`
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
\`;

const FRAG = /* glsl */ \`
precision mediump float;
uniform float iTime;
uniform vec2  iResolution;
uniform vec2  uOffset;
uniform float uRotation;
uniform float uFocalLength;
uniform float uSpeed1;
uniform float uSpeed2;
uniform float uDir2;
uniform float uBend1;
uniform float uBend2;
uniform vec3  uColor1;
uniform vec3  uColor2;

const float lt   = 0.3;
const float pi   = 3.14159;
const float pi2  = 6.28318;
const float pi_2 = 1.5708;
#define MAX_STEPS 14

void mainImage(out vec4 C, in vec2 U) {
  float t = iTime * pi;
  float s = 1.0;
  float d = 0.0;
  vec2  R = iResolution;

  vec3 o = vec3(0.0, 0.0, -7.0);
  vec3 u = normalize(vec3((U - 0.5 * R) / R.y, uFocalLength));
  vec2 k = vec2(0.0);
  vec3 p;

  float t1 = t * 0.7;
  float t2 = t * 0.9;
  float tSpeed1 = t * uSpeed1;
  float tSpeed2 = t * uSpeed2 * uDir2;

  for (int i = 0; i < MAX_STEPS; ++i) {
    p = o + u * d;
    p.x -= 15.0;

    float px = p.x;
    float wob1 = uBend1 + sin(t1 + px * 0.8) * 0.1;
    float wob2 = uBend2 + cos(t2 + px * 1.1) * 0.1;

    float px2 = px + pi_2;
    vec2 sinOffset = sin(vec2(px, px2) + tSpeed1) * wob1;
    vec2 cosOffset = cos(vec2(px, px2) + tSpeed2) * wob2;

    vec2 yz = p.yz;
    float pxLt = px + lt;
    k.x = max(pxLt, length(yz - sinOffset) - lt);
    k.y = max(pxLt, length(yz - cosOffset) - lt);

    float current = min(k.x, k.y);
    s = min(s, current);
    if (s < 0.001 || d > 300.0) break;
    d += s * 0.7;
  }

  float sqrtD = sqrt(d);
  vec3 raw = max(cos(d * pi2) - s * sqrtD - vec3(k, 0.0), 0.0);
  raw.gb += 0.1;
  float maxC = max(raw.r, max(raw.g, raw.b));
  if (maxC < 0.15) discard;
  raw = raw * 0.4 + raw.brg * 0.6 + raw * raw;
  float lum = dot(raw, vec3(0.299, 0.587, 0.114));
  float w1 = max(0.0, 1.0 - k.x * 2.0);
  float w2 = max(0.0, 1.0 - k.y * 2.0);
  float wt = w1 + w2 + 0.001;
  vec3 c = (uColor1 * w1 + uColor2 * w2) / wt * lum * 3.5;
  C = vec4(c, 1.0);
}

void main() {
  vec2 coord = gl_FragCoord.xy + uOffset;
  coord -= 0.5 * iResolution;
  float c = cos(uRotation), s = sin(uRotation);
  coord = mat2(c, -s, s, c) * coord;
  coord += 0.5 * iResolution;

  vec4 color;
  mainImage(color, coord);
  gl_FragColor = color;
}
\`;

export default function PlasmaWave(props) {
  const {
    xOffset = 0,
    yOffset = 0,
    rotationDeg = 0,
    focalLength = 0.8,
    speed1 = 0.05,
    speed2 = 0.05,
    dir2 = 1.0,
    bend1 = 1,
    bend2 = 0.5,
    colors = ['#A855F7', '#06B6D4']
  } = props;

  const propsRef = useRef(props);
  propsRef.current = props;

  const containerRef = useRef(null);

  useEffect(() => {
    const ctn = containerRef.current;
    if (!ctn) return;

    const renderer = new Renderer({
      alpha: true,
      dpr: Math.min(window.devicePixelRatio, 1.5),
      antialias: false,
      depth: false,
      stencil: false,
      premultipliedAlpha: false,
      preserveDrawingBuffer: false,
      powerPreference: 'high-performance'
    });

    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    ctn.appendChild(gl.canvas);

    const camera = new Camera(gl);
    const scene = new Transform();

    const geometry = new Geometry(gl, {
      position: { size: 2, data: new Float32Array([-1, -1, 3, -1, -1, 3]) }
    });

    const uniformOffset = new Float32Array([xOffset, yOffset]);
    const uniformResolution = new Float32Array([1, 1]);
    const c1 = hexToRgb(colors[0]);
    const c2 = hexToRgb(colors[1]);

    const program = new Program(gl, {
      vertex: VERT,
      fragment: FRAG,
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: uniformResolution },
        uOffset: { value: uniformOffset },
        uRotation: { value: (rotationDeg * Math.PI) / 180 },
        uFocalLength: { value: focalLength },
        uSpeed1: { value: speed1 },
        uSpeed2: { value: speed2 },
        uDir2: { value: dir2 },
        uBend1: { value: bend1 },
        uBend2: { value: bend2 },
        uColor1: { value: c1 },
        uColor2: { value: c2 }
      }
    });

    new Mesh(gl, { geometry, program }).setParent(scene);

    function resize() {
      if (!ctn) return;
      const { width, height } = ctn.getBoundingClientRect();
      renderer.setSize(width, height);
      uniformResolution[0] = width * renderer.dpr;
      uniformResolution[1] = height * renderer.dpr;
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    }

    const ro = new ResizeObserver(resize);
    ro.observe(ctn);
    resize();

    const startTime = performance.now();
    let animateId;

    const update = (now) => {
      const {
        xOffset: xOff = 0,
        yOffset: yOff = 0,
        rotationDeg: rot = 0,
        focalLength: fLen = 0.8,
        speed1: s1 = 0.05,
        speed2: s2 = 0.05,
        dir2: d2 = 1.0,
        bend1: b1 = 1,
        bend2: b2 = 0.5,
        colors: cols = ['#A855F7', '#06B6D4']
      } = propsRef.current;

      uniformOffset[0] = xOff;
      uniformOffset[1] = yOff;
      program.uniforms.iTime.value = (now - startTime) * 0.001;
      program.uniforms.uRotation.value = (rot * Math.PI) / 180;
      program.uniforms.uFocalLength.value = fLen;
      program.uniforms.uSpeed1.value = s1;
      program.uniforms.uSpeed2.value = s2;
      program.uniforms.uDir2.value = d2;
      program.uniforms.uBend1.value = b1;
      program.uniforms.uBend2.value = b2;
      program.uniforms.uColor1.value = hexToRgb(cols[0]);
      program.uniforms.uColor2.value = hexToRgb(cols[1]);

      renderer.render({ scene, camera });
      animateId = requestAnimationFrame(update);
    };

    animateId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(animateId);
      ro.disconnect();
      if (ctn && gl.canvas.parentNode === ctn) {
        ctn.removeChild(gl.canvas);
      }
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={containerRef} className="plasma-wave-container" />;
}
`,M=`.plasma-wave-container {
  width: 100%;
  height: 100%;
}
`,j=`import { useRef, useEffect } from 'react';
import { Renderer, Camera, Transform, Program, Mesh, Geometry } from 'ogl';

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  return [r, g, b];
}

const VERT = /* glsl */ \`
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
\`;

const FRAG = /* glsl */ \`
precision mediump float;
uniform float iTime;
uniform vec2  iResolution;
uniform vec2  uOffset;
uniform float uRotation;
uniform float uFocalLength;
uniform float uSpeed1;
uniform float uSpeed2;
uniform float uDir2;
uniform float uBend1;
uniform float uBend2;
uniform vec3  uColor1;
uniform vec3  uColor2;

const float lt   = 0.3;
const float pi   = 3.14159;
const float pi2  = 6.28318;
const float pi_2 = 1.5708;
#define MAX_STEPS 14

void mainImage(out vec4 C, in vec2 U) {
  float t = iTime * pi;
  float s = 1.0;
  float d = 0.0;
  vec2  R = iResolution;

  vec3 o = vec3(0.0, 0.0, -7.0);
  vec3 u = normalize(vec3((U - 0.5 * R) / R.y, uFocalLength));
  vec2 k = vec2(0.0);
  vec3 p;

  float t1 = t * 0.7;
  float t2 = t * 0.9;
  float tSpeed1 = t * uSpeed1;
  float tSpeed2 = t * uSpeed2 * uDir2;

  for (int i = 0; i < MAX_STEPS; ++i) {
    p = o + u * d;
    p.x -= 15.0;

    float px = p.x;
    float wob1 = uBend1 + sin(t1 + px * 0.8) * 0.1;
    float wob2 = uBend2 + cos(t2 + px * 1.1) * 0.1;

    float px2 = px + pi_2;
    vec2 sinOffset = sin(vec2(px, px2) + tSpeed1) * wob1;
    vec2 cosOffset = cos(vec2(px, px2) + tSpeed2) * wob2;

    vec2 yz = p.yz;
    float pxLt = px + lt;
    k.x = max(pxLt, length(yz - sinOffset) - lt);
    k.y = max(pxLt, length(yz - cosOffset) - lt);

    float current = min(k.x, k.y);
    s = min(s, current);
    if (s < 0.001 || d > 300.0) break;
    d += s * 0.7;
  }

  float sqrtD = sqrt(d);
  vec3 raw = max(cos(d * pi2) - s * sqrtD - vec3(k, 0.0), 0.0);
  raw.gb += 0.1;
  float maxC = max(raw.r, max(raw.g, raw.b));
  if (maxC < 0.15) discard;
  raw = raw * 0.4 + raw.brg * 0.6 + raw * raw;
  float lum = dot(raw, vec3(0.299, 0.587, 0.114));
  float w1 = max(0.0, 1.0 - k.x * 2.0);
  float w2 = max(0.0, 1.0 - k.y * 2.0);
  float wt = w1 + w2 + 0.001;
  vec3 c = (uColor1 * w1 + uColor2 * w2) / wt * lum * 3.5;
  C = vec4(c, 1.0);
}

void main() {
  vec2 coord = gl_FragCoord.xy + uOffset;
  coord -= 0.5 * iResolution;
  float c = cos(uRotation), s = sin(uRotation);
  coord = mat2(c, -s, s, c) * coord;
  coord += 0.5 * iResolution;

  vec4 color;
  mainImage(color, coord);
  gl_FragColor = color;
}
\`;

export default function PlasmaWave(props) {
  const {
    xOffset = 0,
    yOffset = 0,
    rotationDeg = 0,
    focalLength = 0.8,
    speed1 = 0.05,
    speed2 = 0.05,
    dir2 = 1.0,
    bend1 = 1,
    bend2 = 0.5,
    colors = ['#A855F7', '#06B6D4']
  } = props;

  const propsRef = useRef(props);
  propsRef.current = props;

  const containerRef = useRef(null);

  useEffect(() => {
    const ctn = containerRef.current;
    if (!ctn) return;

    const renderer = new Renderer({
      alpha: true,
      dpr: Math.min(window.devicePixelRatio, 1.5),
      antialias: false,
      depth: false,
      stencil: false,
      premultipliedAlpha: false,
      preserveDrawingBuffer: false,
      powerPreference: 'high-performance'
    });

    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    ctn.appendChild(gl.canvas);

    const camera = new Camera(gl);
    const scene = new Transform();

    const geometry = new Geometry(gl, {
      position: { size: 2, data: new Float32Array([-1, -1, 3, -1, -1, 3]) }
    });

    const uniformOffset = new Float32Array([xOffset, yOffset]);
    const uniformResolution = new Float32Array([1, 1]);
    const c1 = hexToRgb(colors[0]);
    const c2 = hexToRgb(colors[1]);

    const program = new Program(gl, {
      vertex: VERT,
      fragment: FRAG,
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: uniformResolution },
        uOffset: { value: uniformOffset },
        uRotation: { value: (rotationDeg * Math.PI) / 180 },
        uFocalLength: { value: focalLength },
        uSpeed1: { value: speed1 },
        uSpeed2: { value: speed2 },
        uDir2: { value: dir2 },
        uBend1: { value: bend1 },
        uBend2: { value: bend2 },
        uColor1: { value: c1 },
        uColor2: { value: c2 }
      }
    });

    new Mesh(gl, { geometry, program }).setParent(scene);

    function resize() {
      if (!ctn) return;
      const { width, height } = ctn.getBoundingClientRect();
      renderer.setSize(width, height);
      uniformResolution[0] = width * renderer.dpr;
      uniformResolution[1] = height * renderer.dpr;
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    }

    const ro = new ResizeObserver(resize);
    ro.observe(ctn);
    resize();

    const startTime = performance.now();
    let animateId;

    const update = (now) => {
      const {
        xOffset: xOff = 0,
        yOffset: yOff = 0,
        rotationDeg: rot = 0,
        focalLength: fLen = 0.8,
        speed1: s1 = 0.05,
        speed2: s2 = 0.05,
        dir2: d2 = 1.0,
        bend1: b1 = 1,
        bend2: b2 = 0.5,
        colors: cols = ['#A855F7', '#06B6D4']
      } = propsRef.current;

      uniformOffset[0] = xOff;
      uniformOffset[1] = yOff;
      program.uniforms.iTime.value = (now - startTime) * 0.001;
      program.uniforms.uRotation.value = (rot * Math.PI) / 180;
      program.uniforms.uFocalLength.value = fLen;
      program.uniforms.uSpeed1.value = s1;
      program.uniforms.uSpeed2.value = s2;
      program.uniforms.uDir2.value = d2;
      program.uniforms.uBend1.value = b1;
      program.uniforms.uBend2.value = b2;
      program.uniforms.uColor1.value = hexToRgb(cols[0]);
      program.uniforms.uColor2.value = hexToRgb(cols[1]);

      renderer.render({ scene, camera });
      animateId = requestAnimationFrame(update);
    };

    animateId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(animateId);
      ro.disconnect();
      if (ctn && gl.canvas.parentNode === ctn) {
        ctn.removeChild(gl.canvas);
      }
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={containerRef} className="w-full h-full" />;
}
`,W=`import { useRef, useEffect } from 'react';
import { Renderer, Camera, Transform, Program, Mesh, Geometry } from 'ogl';

import './PlasmaWave.css';

function hexToRgb(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  return [r, g, b];
}

const VERT = /* glsl */ \`
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
\`;

const FRAG = /* glsl */ \`
precision mediump float;
uniform float iTime;
uniform vec2  iResolution;
uniform vec2  uOffset;
uniform float uRotation;
uniform float uFocalLength;
uniform float uSpeed1;
uniform float uSpeed2;
uniform float uDir2;
uniform float uBend1;
uniform float uBend2;
uniform vec3  uColor1;
uniform vec3  uColor2;

const float lt   = 0.3;
const float pi   = 3.14159;
const float pi2  = 6.28318;
const float pi_2 = 1.5708;
#define MAX_STEPS 14

void mainImage(out vec4 C, in vec2 U) {
  float t = iTime * pi;
  float s = 1.0;
  float d = 0.0;
  vec2  R = iResolution;

  vec3 o = vec3(0.0, 0.0, -7.0);
  vec3 u = normalize(vec3((U - 0.5 * R) / R.y, uFocalLength));
  vec2 k = vec2(0.0);
  vec3 p;

  float t1 = t * 0.7;
  float t2 = t * 0.9;
  float tSpeed1 = t * uSpeed1;
  float tSpeed2 = t * uSpeed2 * uDir2;

  for (int i = 0; i < MAX_STEPS; ++i) {
    p = o + u * d;
    p.x -= 15.0;

    float px = p.x;
    float wob1 = uBend1 + sin(t1 + px * 0.8) * 0.1;
    float wob2 = uBend2 + cos(t2 + px * 1.1) * 0.1;

    float px2 = px + pi_2;
    vec2 sinOffset = sin(vec2(px, px2) + tSpeed1) * wob1;
    vec2 cosOffset = cos(vec2(px, px2) + tSpeed2) * wob2;

    vec2 yz = p.yz;
    float pxLt = px + lt;
    k.x = max(pxLt, length(yz - sinOffset) - lt);
    k.y = max(pxLt, length(yz - cosOffset) - lt);

    float current = min(k.x, k.y);
    s = min(s, current);
    if (s < 0.001 || d > 300.0) break;
    d += s * 0.7;
  }

  float sqrtD = sqrt(d);
  vec3 raw = max(cos(d * pi2) - s * sqrtD - vec3(k, 0.0), 0.0);
  raw.gb += 0.1;
  float maxC = max(raw.r, max(raw.g, raw.b));
  if (maxC < 0.15) discard;
  raw = raw * 0.4 + raw.brg * 0.6 + raw * raw;
  float lum = dot(raw, vec3(0.299, 0.587, 0.114));
  float w1 = max(0.0, 1.0 - k.x * 2.0);
  float w2 = max(0.0, 1.0 - k.y * 2.0);
  float wt = w1 + w2 + 0.001;
  vec3 c = (uColor1 * w1 + uColor2 * w2) / wt * lum * 3.5;
  C = vec4(c, 1.0);
}

void main() {
  vec2 coord = gl_FragCoord.xy + uOffset;
  coord -= 0.5 * iResolution;
  float c = cos(uRotation), s = sin(uRotation);
  coord = mat2(c, -s, s, c) * coord;
  coord += 0.5 * iResolution;

  vec4 color;
  mainImage(color, coord);
  gl_FragColor = color;
}
\`;

interface PlasmaWaveProps {
  xOffset?: number;
  yOffset?: number;
  rotationDeg?: number;
  focalLength?: number;
  speed1?: number;
  speed2?: number;
  dir2?: number;
  bend1?: number;
  bend2?: number;
  colors?: [string, string];
}

export default function PlasmaWave(props: PlasmaWaveProps) {
  const {
    xOffset = 0,
    yOffset = 0,
    rotationDeg = 0,
    focalLength = 0.8,
    speed1 = 0.05,
    speed2 = 0.05,
    dir2 = 1.0,
    bend1 = 1,
    bend2 = 0.5,
    colors = ['#A855F7', '#06B6D4']
  } = props;

  const propsRef = useRef<PlasmaWaveProps>(props);
  propsRef.current = props;

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctn = containerRef.current;
    if (!ctn) return;

    const renderer = new Renderer({
      alpha: true,
      dpr: Math.min(window.devicePixelRatio, 1.5),
      antialias: false,
      depth: false,
      stencil: false,
      premultipliedAlpha: false,
      preserveDrawingBuffer: false,
      powerPreference: 'high-performance'
    });

    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    ctn.appendChild(gl.canvas);

    const camera = new Camera(gl);
    const scene = new Transform();

    const geometry = new Geometry(gl, {
      position: { size: 2, data: new Float32Array([-1, -1, 3, -1, -1, 3]) }
    });

    const uniformOffset = new Float32Array([xOffset, yOffset]);
    const uniformResolution = new Float32Array([1, 1]);
    const c1 = hexToRgb(colors[0]);
    const c2 = hexToRgb(colors[1]);

    const program = new Program(gl, {
      vertex: VERT,
      fragment: FRAG,
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: uniformResolution },
        uOffset: { value: uniformOffset },
        uRotation: { value: (rotationDeg * Math.PI) / 180 },
        uFocalLength: { value: focalLength },
        uSpeed1: { value: speed1 },
        uSpeed2: { value: speed2 },
        uDir2: { value: dir2 },
        uBend1: { value: bend1 },
        uBend2: { value: bend2 },
        uColor1: { value: c1 },
        uColor2: { value: c2 }
      }
    });

    new Mesh(gl, { geometry, program }).setParent(scene);

    function resize() {
      if (!ctn) return;
      const { width, height } = ctn.getBoundingClientRect();
      renderer.setSize(width, height);
      uniformResolution[0] = width * renderer.dpr;
      uniformResolution[1] = height * renderer.dpr;
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    }

    const ro = new ResizeObserver(resize);
    ro.observe(ctn);
    resize();

    const startTime = performance.now();
    let animateId: number;

    const update = (now: number) => {
      const {
        xOffset: xOff = 0,
        yOffset: yOff = 0,
        rotationDeg: rot = 0,
        focalLength: fLen = 0.8,
        speed1: s1 = 0.05,
        speed2: s2 = 0.05,
        dir2: d2 = 1.0,
        bend1: b1 = 1,
        bend2: b2 = 0.5,
        colors: cols = ['#A855F7', '#06B6D4']
      } = propsRef.current;

      uniformOffset[0] = xOff;
      uniformOffset[1] = yOff;
      program.uniforms.iTime.value = (now - startTime) * 0.001;
      program.uniforms.uRotation.value = (rot * Math.PI) / 180;
      program.uniforms.uFocalLength.value = fLen;
      program.uniforms.uSpeed1.value = s1;
      program.uniforms.uSpeed2.value = s2;
      program.uniforms.uDir2.value = d2;
      program.uniforms.uBend1.value = b1;
      program.uniforms.uBend2.value = b2;
      program.uniforms.uColor1.value = hexToRgb(cols[0]);
      program.uniforms.uColor2.value = hexToRgb(cols[1]);

      renderer.render({ scene, camera });
      animateId = requestAnimationFrame(update);
    };

    animateId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(animateId);
      ro.disconnect();
      if (ctn && gl.canvas.parentNode === ctn) {
        ctn.removeChild(gl.canvas);
      }
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, []);

  return <div ref={containerRef} className="plasma-wave-container" />;
}
`,G=`import { useRef, useEffect } from 'react';
import { Renderer, Camera, Transform, Program, Mesh, Geometry } from 'ogl';

function hexToRgb(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  return [r, g, b];
}

const VERT = /* glsl */ \`
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
\`;

const FRAG = /* glsl */ \`
precision mediump float;
uniform float iTime;
uniform vec2  iResolution;
uniform vec2  uOffset;
uniform float uRotation;
uniform float uFocalLength;
uniform float uSpeed1;
uniform float uSpeed2;
uniform float uDir2;
uniform float uBend1;
uniform float uBend2;
uniform vec3  uColor1;
uniform vec3  uColor2;

const float lt   = 0.3;
const float pi   = 3.14159;
const float pi2  = 6.28318;
const float pi_2 = 1.5708;
#define MAX_STEPS 14

void mainImage(out vec4 C, in vec2 U) {
  float t = iTime * pi;
  float s = 1.0;
  float d = 0.0;
  vec2  R = iResolution;

  vec3 o = vec3(0.0, 0.0, -7.0);
  vec3 u = normalize(vec3((U - 0.5 * R) / R.y, uFocalLength));
  vec2 k = vec2(0.0);
  vec3 p;

  float t1 = t * 0.7;
  float t2 = t * 0.9;
  float tSpeed1 = t * uSpeed1;
  float tSpeed2 = t * uSpeed2 * uDir2;

  for (int i = 0; i < MAX_STEPS; ++i) {
    p = o + u * d;
    p.x -= 15.0;

    float px = p.x;
    float wob1 = uBend1 + sin(t1 + px * 0.8) * 0.1;
    float wob2 = uBend2 + cos(t2 + px * 1.1) * 0.1;

    float px2 = px + pi_2;
    vec2 sinOffset = sin(vec2(px, px2) + tSpeed1) * wob1;
    vec2 cosOffset = cos(vec2(px, px2) + tSpeed2) * wob2;

    vec2 yz = p.yz;
    float pxLt = px + lt;
    k.x = max(pxLt, length(yz - sinOffset) - lt);
    k.y = max(pxLt, length(yz - cosOffset) - lt);

    float current = min(k.x, k.y);
    s = min(s, current);
    if (s < 0.001 || d > 300.0) break;
    d += s * 0.7;
  }

  float sqrtD = sqrt(d);
  vec3 raw = max(cos(d * pi2) - s * sqrtD - vec3(k, 0.0), 0.0);
  raw.gb += 0.1;
  float maxC = max(raw.r, max(raw.g, raw.b));
  if (maxC < 0.15) discard;
  raw = raw * 0.4 + raw.brg * 0.6 + raw * raw;
  float lum = dot(raw, vec3(0.299, 0.587, 0.114));
  float w1 = max(0.0, 1.0 - k.x * 2.0);
  float w2 = max(0.0, 1.0 - k.y * 2.0);
  float wt = w1 + w2 + 0.001;
  vec3 c = (uColor1 * w1 + uColor2 * w2) / wt * lum * 3.5;
  C = vec4(c, 1.0);
}

void main() {
  vec2 coord = gl_FragCoord.xy + uOffset;
  coord -= 0.5 * iResolution;
  float c = cos(uRotation), s = sin(uRotation);
  coord = mat2(c, -s, s, c) * coord;
  coord += 0.5 * iResolution;

  vec4 color;
  mainImage(color, coord);
  gl_FragColor = color;
}
\`;

interface PlasmaWaveProps {
  xOffset?: number;
  yOffset?: number;
  rotationDeg?: number;
  focalLength?: number;
  speed1?: number;
  speed2?: number;
  dir2?: number;
  bend1?: number;
  bend2?: number;
  colors?: [string, string];
}

export default function PlasmaWave(props: PlasmaWaveProps) {
  const {
    xOffset = 0,
    yOffset = 0,
    rotationDeg = 0,
    focalLength = 0.8,
    speed1 = 0.05,
    speed2 = 0.05,
    dir2 = 1.0,
    bend1 = 1,
    bend2 = 0.5,
    colors = ['#A855F7', '#06B6D4']
  } = props;

  const propsRef = useRef<PlasmaWaveProps>(props);
  propsRef.current = props;

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctn = containerRef.current;
    if (!ctn) return;

    const renderer = new Renderer({
      alpha: true,
      dpr: Math.min(window.devicePixelRatio, 1.5),
      antialias: false,
      depth: false,
      stencil: false,
      premultipliedAlpha: false,
      preserveDrawingBuffer: false,
      powerPreference: 'high-performance'
    });

    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    ctn.appendChild(gl.canvas);

    const camera = new Camera(gl);
    const scene = new Transform();

    const geometry = new Geometry(gl, {
      position: { size: 2, data: new Float32Array([-1, -1, 3, -1, -1, 3]) }
    });

    const uniformOffset = new Float32Array([xOffset, yOffset]);
    const uniformResolution = new Float32Array([1, 1]);
    const c1 = hexToRgb(colors[0]);
    const c2 = hexToRgb(colors[1]);

    const program = new Program(gl, {
      vertex: VERT,
      fragment: FRAG,
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: uniformResolution },
        uOffset: { value: uniformOffset },
        uRotation: { value: (rotationDeg * Math.PI) / 180 },
        uFocalLength: { value: focalLength },
        uSpeed1: { value: speed1 },
        uSpeed2: { value: speed2 },
        uDir2: { value: dir2 },
        uBend1: { value: bend1 },
        uBend2: { value: bend2 },
        uColor1: { value: c1 },
        uColor2: { value: c2 }
      }
    });

    new Mesh(gl, { geometry, program }).setParent(scene);

    function resize() {
      if (!ctn) return;
      const { width, height } = ctn.getBoundingClientRect();
      renderer.setSize(width, height);
      uniformResolution[0] = width * renderer.dpr;
      uniformResolution[1] = height * renderer.dpr;
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    }

    const ro = new ResizeObserver(resize);
    ro.observe(ctn);
    resize();

    const startTime = performance.now();
    let animateId: number;

    const update = (now: number) => {
      const {
        xOffset: xOff = 0,
        yOffset: yOff = 0,
        rotationDeg: rot = 0,
        focalLength: fLen = 0.8,
        speed1: s1 = 0.05,
        speed2: s2 = 0.05,
        dir2: d2 = 1.0,
        bend1: b1 = 1,
        bend2: b2 = 0.5,
        colors: cols = ['#A855F7', '#06B6D4']
      } = propsRef.current;

      uniformOffset[0] = xOff;
      uniformOffset[1] = yOff;
      program.uniforms.iTime.value = (now - startTime) * 0.001;
      program.uniforms.uRotation.value = (rot * Math.PI) / 180;
      program.uniforms.uFocalLength.value = fLen;
      program.uniforms.uSpeed1.value = s1;
      program.uniforms.uSpeed2.value = s2;
      program.uniforms.uDir2.value = d2;
      program.uniforms.uBend1.value = b1;
      program.uniforms.uBend2.value = b2;
      program.uniforms.uColor1.value = hexToRgb(cols[0]);
      program.uniforms.uColor2.value = hexToRgb(cols[1]);

      renderer.render({ scene, camera });
      animateId = requestAnimationFrame(update);
    };

    animateId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(animateId);
      ro.disconnect();
      if (ctn && gl.canvas.parentNode === ctn) {
        ctn.removeChild(gl.canvas);
      }
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, []);

  return <div ref={containerRef} className="w-full h-full" />;
}
`,q={dependencies:"ogl",usage:`import PlasmaWave from './PlasmaWave';
  
<PlasmaWave
  colors={["#A855F7", "#06B6D4"]}
  speed1={0.05}
  speed2={0.05}
  focalLength={0.8}
  bend1={1}
  bend2={0.5}
  dir2={1.0}
  rotationDeg={0}
/>`,code:_,css:M,tailwind:j,tsCode:W,tsTailwind:G},v={color1:"#A855F7",color2:"#06B6D4",speed1:.05,speed2:.05,focalLength:.8,bend1:1,bend2:.5,dir2:1,rotationDeg:0},an=()=>{const{props:p,updateProp:o,resetProps:x,hasChanges:h}=O(v),{color1:a,color2:s,speed1:i,speed2:l,focalLength:f,bend1:c,bend2:u,dir2:m,rotationDeg:d}=p,[w,r]=z(),b=R.useMemo(()=>[{name:"colors",type:"[string, string]",default:'["#A855F7", "#06B6D4"]',description:"Array of two hex colors — one for each plasma wave band."},{name:"speed1",type:"number",default:"0.05",description:"Speed of the first plasma wave."},{name:"speed2",type:"number",default:"0.05",description:"Speed of the second plasma wave."},{name:"dir2",type:"number",default:"1.0",description:"Direction multiplier for the second wave. Use -1 to reverse."},{name:"focalLength",type:"number",default:"0.8",description:"Focal length of the camera projection."},{name:"bend1",type:"number",default:"1",description:"Bend intensity of the first wave."},{name:"bend2",type:"number",default:"0.5",description:"Bend intensity of the second wave."},{name:"rotationDeg",type:"number",default:"0",description:"Rotation angle of the scene in degrees."},{name:"xOffset",type:"number",default:"0",description:"Horizontal offset of the viewport."},{name:"yOffset",type:"number",default:"0",description:"Vertical offset of the viewport."}],[]);return n.jsx(P,{props:p,defaultProps:v,resetProps:x,hasChanges:h,demoOnlyProps:["color1","color2"],computedProps:{colors:[a,s]},children:n.jsxs(T,{children:[n.jsxs(S,{children:[n.jsxs(y,{position:"relative",className:"demo-container",h:500,p:0,overflow:"hidden",children:[n.jsx(E,{colors:[a,s],speed1:i,speed2:l,focalLength:f,bend1:c,bend2:u,dir2:m,rotationDeg:d},w),n.jsx(k,{pillText:"New Background",headline:"Raymarched plasma waves powered by OGL"})]}),n.jsx(C,{justify:"flex-end",mt:2,mb:-2,children:n.jsx(B,{backgroundId:"plasma-wave",currentProps:{colors:[a,s],speed1:i,speed2:l,focalLength:f,bend1:c,bend2:u,dir2:m},defaultProps:{colors:["#A855F7","#06B6D4"],speed1:.05,speed2:.05,focalLength:.8,bend1:1,bend2:.5,dir2:1}})}),n.jsxs(I,{children:[n.jsx(g,{title:"Color 1",color:a,onChange:e=>{o("color1",e),r()}}),n.jsx(g,{title:"Color 2",color:s,onChange:e=>{o("color2",e),r()}}),n.jsx(t,{title:"Speed 1",min:0,max:.2,step:.005,value:i,onChange:e=>{o("speed1",e),r()}}),n.jsx(t,{title:"Speed 2",min:0,max:.2,step:.005,value:l,onChange:e=>{o("speed2",e),r()}}),n.jsx(t,{title:"Focal Length",min:.1,max:2,step:.05,value:f,onChange:e=>{o("focalLength",e),r()}}),n.jsx(t,{title:"Bend 1",min:0,max:3,step:.1,value:c,onChange:e=>{o("bend1",e),r()}}),n.jsx(t,{title:"Bend 2",min:0,max:3,step:.1,value:u,onChange:e=>{o("bend2",e),r()}}),n.jsx(t,{title:"Direction 2",min:-1,max:1,step:.1,value:m,onChange:e=>{o("dir2",e),r()}}),n.jsx(t,{title:"Rotation",min:0,max:360,step:1,value:d,onChange:e=>{o("rotationDeg",e),r()}})]}),n.jsx(F,{data:b}),n.jsx(A,{dependencyList:["ogl"]})]}),n.jsx(D,{children:n.jsx(L,{codeObject:q,componentName:"PlasmaWave"})})]})})};export{an as default};
