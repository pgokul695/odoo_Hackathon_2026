import{r as f,a1 as y,j as r,a2 as z,a3 as x,a4 as T,V as E,B as w,T as F}from"./index-TQprzHkU.js";import{u as b,C as P,T as M,P as U,a as R,b as A,c as j}from"./useComponentProps-CjYSqekE.js";import{R as H}from"./RefreshButton-C5Kl5Rs7.js";import{D as G}from"./Dependencies-IIL9riMN.js";import{u as D}from"./useForceRerender-Dq8YDj2j.js";import{P as v}from"./PreviewSlider-CCbi2och.js";import{P as N}from"./PreviewSwitch-CcPSwIGg.js";import{P as _}from"./PreviewColorPickerCustom-BFsDkSOr.js";import{C as W}from"./Customize-BdikCFm5.js";import{u as $,C as k,a as C}from"./react-three-fiber.esm-Drbih_yn.js";import{s as B}from"./shaderMaterial-yvJhjW9I.js";import"./index-DQmtNYX5.js";import"./CodeHighlighter-Dx4QNbvH.js";import"./rotate-ccw-_xDu3G0k.js";/* empty css                       */function V(n,e,i=.9){return e*i+n*(1-i)}const I=n=>Math.sqrt(1-Math.pow(n-1,2));class L{constructor({size:e=256,maxAge:i=750,radius:o=.3,intensity:a=.2,interpolate:s=0,smoothing:g=0,minForce:t=.3,blend:c="screen",ease:u=I}={}){this.size=e,this.maxAge=i,this.radius=o,this.intensity=a,this.ease=u,this.interpolate=s,this.smoothing=g,this.minForce=t,this.blend=c,this.trail=[],this.force=0,this.initTexture()}initTexture(){this.canvas=document.createElement("canvas"),this.canvas.width=this.canvas.height=this.size;const e=this.canvas.getContext("2d");if(e===null)throw new Error("2D not available");this.ctx=e,this.ctx.fillStyle="black",this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height),this.texture=new y(this.canvas),this.canvas.id="touchTexture",this.canvas.style.width=this.canvas.style.height=`${this.canvas.width}px`}update(e){this.clear(),this.trail.forEach((i,o)=>{i.age+=e*1e3,i.age>this.maxAge&&this.trail.splice(o,1)}),this.trail.length||(this.force=0),this.trail.forEach(i=>{this.drawTouch(i)}),this.texture.needsUpdate=!0}clear(){this.ctx.globalCompositeOperation="source-over",this.ctx.fillStyle="black",this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height)}addTouch(e){const i=this.trail[this.trail.length-1];if(i){const o=i.x-e.x,a=i.y-e.y,s=o*o+a*a,g=Math.max(this.minForce,Math.min(s*1e4,1));if(this.force=V(g,this.force,this.smoothing),this.interpolate){const t=Math.ceil(s/Math.pow(this.radius*.5/this.interpolate,2));if(t>1)for(let c=1;c<t;c++)this.trail.push({x:i.x-o/t*c,y:i.y-a/t*c,age:0,force:g})}}this.trail.push({x:e.x,y:e.y,age:0,force:this.force})}drawTouch(e){const i={x:e.x*this.size,y:(1-e.y)*this.size};let o=1;e.age<this.maxAge*.3?o=this.ease(e.age/(this.maxAge*.3)):o=this.ease(1-(e.age-this.maxAge*.3)/(this.maxAge*.7)),o*=e.force,this.ctx.globalCompositeOperation=this.blend;const a=this.size*this.radius*o,s=this.ctx.createRadialGradient(i.x,i.y,Math.max(0,a*.25),i.x,i.y,Math.max(0,a));s.addColorStop(0,`rgba(255, 255, 255, ${this.intensity})`),s.addColorStop(1,"rgba(0, 0, 0, 0.0)"),this.ctx.beginPath(),this.ctx.fillStyle=s,this.ctx.arc(i.x,i.y,Math.max(0,a),0,Math.PI*2),this.ctx.fill()}}function O(n={}){const{size:e,maxAge:i,radius:o,intensity:a,interpolate:s,smoothing:g,minForce:t,blend:c,ease:u}=n,m=f.useMemo(()=>new L(n),[e,i,o,a,s,g,t,c,u]);$((l,h)=>void m.update(h));const d=f.useCallback(l=>m.addTouch(l.uv),[m]);return[m.texture,d]}const q=({id:n="goo-filter",strength:e=10})=>r.jsx("svg",{className:"goo-filter-container",children:r.jsx("defs",{children:r.jsxs("filter",{id:n,children:[r.jsx("feGaussianBlur",{in:"SourceGraphic",stdDeviation:e,result:"blur"}),r.jsx("feColorMatrix",{in:"blur",type:"matrix",values:"1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9",result:"goo"}),r.jsx("feComposite",{in:"SourceGraphic",in2:"goo",operator:"atop"})]})})}),J=B({resolution:new E,mouseTrail:null,gridSize:100,pixelColor:new z("#ffffff")},`
    varying vec2 vUv;
    void main() {
      gl_Position = vec4(position.xy, 0.0, 1.0);
    }
  `,`
    uniform vec2 resolution;
    uniform sampler2D mouseTrail;
    uniform float gridSize;
    uniform vec3 pixelColor;

    vec2 coverUv(vec2 uv) {
      vec2 s = resolution.xy / max(resolution.x, resolution.y);
      vec2 newUv = (uv - 0.5) * s + 0.5;
      return clamp(newUv, 0.0, 1.0);
    }

    float sdfCircle(vec2 p, float r) {
        return length(p - 0.5) - r;
    }

    void main() {
      vec2 screenUv = gl_FragCoord.xy / resolution;
      vec2 uv = coverUv(screenUv);

      vec2 gridUv = fract(uv * gridSize);
      vec2 gridUvCenter = (floor(uv * gridSize) + 0.5) / gridSize;

      float trail = texture2D(mouseTrail, gridUvCenter).r;

      gl_FragColor = vec4(pixelColor, trail);
    }
  `);function K({gridSize:n,trailSize:e,maxAge:i,interpolate:o,easingFunction:a,pixelColor:s}){const g=C(l=>l.size),t=C(l=>l.viewport),c=f.useMemo(()=>new J,[]);c.uniforms.pixelColor.value=new z(s);const[u,m]=O({size:512,radius:e,maxAge:i,interpolate:o||.1,ease:a||(l=>l)});u&&(u.minFilter=x,u.magFilter=x,u.wrapS=T,u.wrapT=T);const d=Math.max(t.width,t.height)/2;return r.jsxs("mesh",{scale:[d,d,1],onPointerMove:m,children:[r.jsx("planeGeometry",{args:[2,2]}),r.jsx("primitive",{object:c,gridSize:n,resolution:[g.width*t.dpr,g.height*t.dpr],mouseTrail:u})]})}function Q({gridSize:n=40,trailSize:e=.1,maxAge:i=250,interpolate:o=5,easingFunction:a=m=>m,canvasProps:s={},glProps:g={antialias:!1,powerPreference:"high-performance",alpha:!0},gooeyFilter:t,color:c="#ffffff",className:u=""}){return r.jsxs(r.Fragment,{children:[t&&r.jsx(q,{id:t.id,strength:t.strength}),r.jsx(k,{...s,gl:g,className:`pixel-canvas ${u}`,style:t&&{filter:`url(#${t.id})`},children:r.jsx(K,{gridSize:n,trailSize:e,maxAge:i,interpolate:o,easingFunction:a,pixelColor:c})})]})}const X=`/* eslint-disable react/no-unknown-property */
import { useMemo } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { shaderMaterial, useTrailTexture } from '@react-three/drei';
import * as THREE from 'three';

import './PixelTrail.css';

const GooeyFilter = ({ id = 'goo-filter', strength = 10 }) => {
  return (
    <svg className="goo-filter-container">
      <defs>
        <filter id={id}>
          <feGaussianBlur in="SourceGraphic" stdDeviation={strength} result="blur" />
          <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
      </defs>
    </svg>
  );
};

const DotMaterial = shaderMaterial(
  {
    resolution: new THREE.Vector2(),
    mouseTrail: null,
    gridSize: 100,
    pixelColor: new THREE.Color('#ffffff')
  },
  \`
    varying vec2 vUv;
    void main() {
      gl_Position = vec4(position.xy, 0.0, 1.0);
    }
  \`,
  \`
    uniform vec2 resolution;
    uniform sampler2D mouseTrail;
    uniform float gridSize;
    uniform vec3 pixelColor;

    vec2 coverUv(vec2 uv) {
      vec2 s = resolution.xy / max(resolution.x, resolution.y);
      vec2 newUv = (uv - 0.5) * s + 0.5;
      return clamp(newUv, 0.0, 1.0);
    }

    float sdfCircle(vec2 p, float r) {
        return length(p - 0.5) - r;
    }

    void main() {
      vec2 screenUv = gl_FragCoord.xy / resolution;
      vec2 uv = coverUv(screenUv);

      vec2 gridUv = fract(uv * gridSize);
      vec2 gridUvCenter = (floor(uv * gridSize) + 0.5) / gridSize;

      float trail = texture2D(mouseTrail, gridUvCenter).r;

      gl_FragColor = vec4(pixelColor, trail);
    }
  \`
);

function Scene({ gridSize, trailSize, maxAge, interpolate, easingFunction, pixelColor }) {
  const size = useThree(s => s.size);
  const viewport = useThree(s => s.viewport);

  const dotMaterial = useMemo(() => new DotMaterial(), []);
  dotMaterial.uniforms.pixelColor.value = new THREE.Color(pixelColor);

  const [trail, onMove] = useTrailTexture({
    size: 512,
    radius: trailSize,
    maxAge: maxAge,
    interpolate: interpolate || 0.1,
    ease: easingFunction || (x => x)
  });

  if (trail) {
    trail.minFilter = THREE.NearestFilter;
    trail.magFilter = THREE.NearestFilter;
    trail.wrapS = THREE.ClampToEdgeWrapping;
    trail.wrapT = THREE.ClampToEdgeWrapping;
  }

  const scale = Math.max(viewport.width, viewport.height) / 2;

  return (
    <mesh scale={[scale, scale, 1]} onPointerMove={onMove}>
      <planeGeometry args={[2, 2]} />
      <primitive
        object={dotMaterial}
        gridSize={gridSize}
        resolution={[size.width * viewport.dpr, size.height * viewport.dpr]}
        mouseTrail={trail}
      />
    </mesh>
  );
}

export default function PixelTrail({
  gridSize = 40,
  trailSize = 0.1,
  maxAge = 250,
  interpolate = 5,
  easingFunction = x => x,
  canvasProps = {},
  glProps = {
    antialias: false,
    powerPreference: 'high-performance',
    alpha: true
  },
  gooeyFilter,
  color = '#ffffff',
  className = ''
}) {
  return (
    <>
      {gooeyFilter && <GooeyFilter id={gooeyFilter.id} strength={gooeyFilter.strength} />}
      <Canvas
        {...canvasProps}
        gl={glProps}
        className={\`pixel-canvas \${className}\`}
        style={gooeyFilter && { filter: \`url(#\${gooeyFilter.id})\` }}
      >
        <Scene
          gridSize={gridSize}
          trailSize={trailSize}
          maxAge={maxAge}
          interpolate={interpolate}
          easingFunction={easingFunction}
          pixelColor={color}
        />
      </Canvas>
    </>
  );
}
`,Y=`.goo-filter-container {
  position: absolute;
  overflow: hidden;
  z-index: 1;
}

.pixel-canvas {
  position: absolute;
  z-index: 1;
}
`,Z=`/* eslint-disable react/no-unknown-property */
import { useMemo } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { shaderMaterial, useTrailTexture } from '@react-three/drei';
import * as THREE from 'three';

const GooeyFilter = ({ id = 'goo-filter', strength = 10 }) => {
  return (
    <svg className="absolute overflow-hidden z-1">
      <defs>
        <filter id={id}>
          <feGaussianBlur in="SourceGraphic" stdDeviation={strength} result="blur" />
          <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
      </defs>
    </svg>
  );
};

const DotMaterial = shaderMaterial(
  {
    resolution: new THREE.Vector2(),
    mouseTrail: null,
    gridSize: 100,
    pixelColor: new THREE.Color('#ffffff')
  },
  \`
    varying vec2 vUv;
    void main() {
      gl_Position = vec4(position.xy, 0.0, 1.0);
    }
  \`,
  \`
    uniform vec2 resolution;
    uniform sampler2D mouseTrail;
    uniform float gridSize;
    uniform vec3 pixelColor;

    vec2 coverUv(vec2 uv) {
      vec2 s = resolution.xy / max(resolution.x, resolution.y);
      vec2 newUv = (uv - 0.5) * s + 0.5;
      return clamp(newUv, 0.0, 1.0);
    }

    float sdfCircle(vec2 p, float r) {
        return length(p - 0.5) - r;
    }

    void main() {
      vec2 screenUv = gl_FragCoord.xy / resolution;
      vec2 uv = coverUv(screenUv);

      vec2 gridUv = fract(uv * gridSize);
      vec2 gridUvCenter = (floor(uv * gridSize) + 0.5) / gridSize;

      float trail = texture2D(mouseTrail, gridUvCenter).r;

      gl_FragColor = vec4(pixelColor, trail);
    }
  \`
);

function Scene({ gridSize, trailSize, maxAge, interpolate, easingFunction, pixelColor }) {
  const size = useThree(s => s.size);
  const viewport = useThree(s => s.viewport);

  const dotMaterial = useMemo(() => new DotMaterial(), []);
  dotMaterial.uniforms.pixelColor.value = new THREE.Color(pixelColor);

  const [trail, onMove] = useTrailTexture({
    size: 512,
    radius: trailSize,
    maxAge: maxAge,
    interpolate: interpolate || 0.1,
    ease: easingFunction || (x => x)
  });

  if (trail) {
    trail.minFilter = THREE.NearestFilter;
    trail.magFilter = THREE.NearestFilter;
    trail.wrapS = THREE.ClampToEdgeWrapping;
    trail.wrapT = THREE.ClampToEdgeWrapping;
  }

  const scale = Math.max(viewport.width, viewport.height) / 2;

  return (
    <mesh scale={[scale, scale, 1]} onPointerMove={onMove}>
      <planeGeometry args={[2, 2]} />
      <primitive
        object={dotMaterial}
        gridSize={gridSize}
        resolution={[size.width * viewport.dpr, size.height * viewport.dpr]}
        mouseTrail={trail}
      />
    </mesh>
  );
}

export default function PixelTrail({
  gridSize = 40,
  trailSize = 0.1,
  maxAge = 250,
  interpolate = 5,
  easingFunction = x => x,
  canvasProps = {},
  glProps = {
    antialias: false,
    powerPreference: 'high-performance',
    alpha: true
  },
  gooeyFilter,
  color = '#ffffff',
  className = ''
}) {
  return (
    <>
      {gooeyFilter && <GooeyFilter id={gooeyFilter.id} strength={gooeyFilter.strength} />}
      <Canvas
        {...canvasProps}
        gl={glProps}
        className={\`absolute z-1 \${className}\`}
        style={gooeyFilter && { filter: \`url(#\${gooeyFilter.id})\` }}
      >
        <Scene
          gridSize={gridSize}
          trailSize={trailSize}
          maxAge={maxAge}
          interpolate={interpolate}
          easingFunction={easingFunction}
          pixelColor={color}
        />
      </Canvas>
    </>
  );
}
`,ee=`/* eslint-disable react/no-unknown-property */
import React, { useMemo } from 'react';
import { Canvas, useThree, CanvasProps, ThreeEvent } from '@react-three/fiber';
import { shaderMaterial, useTrailTexture } from '@react-three/drei';
import * as THREE from 'three';

import './PixelTrail.css';

interface GooeyFilterProps {
  id?: string;
  strength?: number;
}

interface DotMaterialUniforms {
  resolution: THREE.Vector2;
  mouseTrail: THREE.Texture | null;
  gridSize: number;
  pixelColor: THREE.Color;
}

interface SceneProps {
  gridSize: number;
  trailSize: number;
  maxAge: number;
  interpolate: number;
  easingFunction: (x: number) => number;
  pixelColor: string;
}

interface PixelTrailProps {
  gridSize?: number;
  trailSize?: number;
  maxAge?: number;
  interpolate?: number;
  easingFunction?: (x: number) => number;
  canvasProps?: Partial<CanvasProps>;
  glProps?: WebGLContextAttributes & { powerPreference?: string };
  gooeyFilter?: { id: string; strength: number };
  color?: string;
  className?: string;
}

const GooeyFilter: React.FC<GooeyFilterProps> = ({ id = 'goo-filter', strength = 10 }) => {
  return (
    <svg className="goo-filter-container">
      <defs>
        <filter id={id}>
          <feGaussianBlur in="SourceGraphic" stdDeviation={strength} result="blur" />
          <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
      </defs>
    </svg>
  );
};

const DotMaterial = shaderMaterial(
  {
    resolution: new THREE.Vector2(),
    mouseTrail: null,
    gridSize: 100,
    pixelColor: new THREE.Color('#ffffff')
  },
  /* glsl vertex shader */ \`
    varying vec2 vUv;
    void main() {
      gl_Position = vec4(position.xy, 0.0, 1.0);
    }
  \`,
  /* glsl fragment shader */ \`
    uniform vec2 resolution;
    uniform sampler2D mouseTrail;
    uniform float gridSize;
    uniform vec3 pixelColor;

    vec2 coverUv(vec2 uv) {
      vec2 s = resolution.xy / max(resolution.x, resolution.y);
      vec2 newUv = (uv - 0.5) * s + 0.5;
      return clamp(newUv, 0.0, 1.0);
    }

    float sdfCircle(vec2 p, float r) {
        return length(p - 0.5) - r;
    }

    void main() {
      vec2 screenUv = gl_FragCoord.xy / resolution;
      vec2 uv = coverUv(screenUv);

      vec2 gridUv = fract(uv * gridSize);
      vec2 gridUvCenter = (floor(uv * gridSize) + 0.5) / gridSize;

      float trail = texture2D(mouseTrail, gridUvCenter).r;

      gl_FragColor = vec4(pixelColor, trail);
    }
  \`
);

function Scene({ gridSize, trailSize, maxAge, interpolate, easingFunction, pixelColor }: SceneProps) {
  const size = useThree(s => s.size);
  const viewport = useThree(s => s.viewport);

  const dotMaterial = useMemo(() => new DotMaterial(), []);
  dotMaterial.uniforms.pixelColor.value = new THREE.Color(pixelColor);

  const [trail, onMove] = useTrailTexture({
    size: 512,
    radius: trailSize,
    maxAge: maxAge,
    interpolate: interpolate || 0.1,
    ease: easingFunction || ((x: number) => x)
  }) as [THREE.Texture | null, (e: ThreeEvent<PointerEvent>) => void];

  if (trail) {
    trail.minFilter = THREE.NearestFilter;
    trail.magFilter = THREE.NearestFilter;
    trail.wrapS = THREE.ClampToEdgeWrapping;
    trail.wrapT = THREE.ClampToEdgeWrapping;
  }

  const scale = Math.max(viewport.width, viewport.height) / 2;

  return (
    <mesh scale={[scale, scale, 1]} onPointerMove={onMove}>
      <planeGeometry args={[2, 2]} />
      <primitive
        object={dotMaterial}
        gridSize={gridSize}
        resolution={[size.width * viewport.dpr, size.height * viewport.dpr]}
        mouseTrail={trail}
      />
    </mesh>
  );
}

export default function PixelTrail({
  gridSize = 40,
  trailSize = 0.1,
  maxAge = 250,
  interpolate = 5,
  easingFunction = (x: number) => x,
  canvasProps = {},
  glProps = {
    antialias: false,
    powerPreference: 'high-performance',
    alpha: true
  },
  gooeyFilter,
  color = '#ffffff',
  className = ''
}: PixelTrailProps) {
  return (
    <>
      {gooeyFilter && <GooeyFilter id={gooeyFilter.id} strength={gooeyFilter.strength} />}
      <Canvas
        {...canvasProps}
        gl={glProps}
        className={\`pixel-canvas \${className}\`}
        style={gooeyFilter ? { filter: \`url(#\${gooeyFilter.id})\` } : undefined}
      >
        <Scene
          gridSize={gridSize}
          trailSize={trailSize}
          maxAge={maxAge}
          interpolate={interpolate}
          easingFunction={easingFunction}
          pixelColor={color}
        />
      </Canvas>
    </>
  );
}
`,re=`import { shaderMaterial, useTrailTexture } from '@react-three/drei';
import { Canvas, CanvasProps, ThreeEvent, useThree } from '@react-three/fiber';
import React, { useEffect, useMemo } from 'react';
import * as THREE from 'three';

interface GooeyFilterProps {
  id?: string;
  strength?: number;
}

interface DotMaterialUniforms {
  resolution: THREE.Vector2;
  mouseTrail: THREE.Texture | null;
  gridSize: number;
  pixelColor: THREE.Color;
}

interface SceneProps {
  gridSize: number;
  trailSize: number;
  maxAge: number;
  interpolate: number;
  easingFunction: (x: number) => number;
  pixelColor: string;
}

interface PixelTrailProps {
  gridSize?: number;
  trailSize?: number;
  maxAge?: number;
  interpolate?: number;
  easingFunction?: (x: number) => number;
  canvasProps?: Partial<CanvasProps>;
  glProps?: WebGLContextAttributes & { powerPreference?: string };
  gooeyFilter?: { id: string; strength: number };
  color?: string;
  className?: string;
}

const GooeyFilter: React.FC<GooeyFilterProps> = ({ id = 'goo-filter', strength = 10 }) => {
  return (
    <svg className="z-1 absolute overflow-hidden">
      <defs>
        <filter id={id}>
          <feGaussianBlur in="SourceGraphic" stdDeviation={strength} result="blur" />
          <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
      </defs>
    </svg>
  );
};

const DotMaterial = shaderMaterial(
  {
    resolution: new THREE.Vector2(),
    mouseTrail: null,
    gridSize: 100,
    pixelColor: new THREE.Color('#ffffff')
  },
  /* glsl vertex shader */ \`
    varying vec2 vUv;
    void main() {
      gl_Position = vec4(position.xy, 0.0, 1.0);
    }
  \`,
  /* glsl fragment shader */ \`
    uniform vec2 resolution;
    uniform sampler2D mouseTrail;
    uniform float gridSize;
    uniform vec3 pixelColor;

    vec2 coverUv(vec2 uv) {
      vec2 s = resolution.xy / max(resolution.x, resolution.y);
      vec2 newUv = (uv - 0.5) * s + 0.5;
      return clamp(newUv, 0.0, 1.0);
    }

    float sdfCircle(vec2 p, float r) {
        return length(p - 0.5) - r;
    }

    void main() {
      vec2 screenUv = gl_FragCoord.xy / resolution;
      vec2 uv = coverUv(screenUv);

      vec2 gridUv = fract(uv * gridSize);
      vec2 gridUvCenter = (floor(uv * gridSize) + 0.5) / gridSize;

      float trail = texture2D(mouseTrail, gridUvCenter).r;

      gl_FragColor = vec4(pixelColor, trail);
    }
  \`
);

const identityEase = (x: number) => x;

function Scene({ gridSize, trailSize, maxAge, interpolate, easingFunction, pixelColor }: SceneProps) {
  const size = useThree(s => s.size);
  const viewport = useThree(s => s.viewport);

  const dotMaterial = useMemo(() => new DotMaterial(), []);
  useEffect(() => {
    return () => {
      dotMaterial.dispose();
    };
  }, [dotMaterial]);

  useEffect(() => {
    (dotMaterial.uniforms.pixelColor.value as THREE.Color).set(pixelColor);
  }, [dotMaterial, pixelColor]);

  const [trail, onMove] = useTrailTexture({
    size: 512,
    radius: trailSize,
    maxAge: maxAge,
    interpolate: interpolate || 0.1,
    ease: easingFunction || identityEase
  }) as [THREE.Texture | null, (e: ThreeEvent<PointerEvent>) => void];

  useEffect(() => {
    if (!trail) return;
    trail.minFilter = THREE.NearestFilter;
    trail.magFilter = THREE.NearestFilter;
    trail.wrapS = THREE.ClampToEdgeWrapping;
    trail.wrapT = THREE.ClampToEdgeWrapping;
  }, [trail]);

  const scale = Math.max(viewport.width, viewport.height) / 2;

  return (
    <mesh scale={[scale, scale, 1]} onPointerMove={onMove}>
      <planeGeometry args={[2, 2]} />
      <primitive
        object={dotMaterial}
        gridSize={gridSize}
        resolution={[size.width * viewport.dpr, size.height * viewport.dpr]}
        mouseTrail={trail}
      />
    </mesh>
  );
}

export default function PixelTrail({
  gridSize = 40,
  trailSize = 0.1,
  maxAge = 250,
  interpolate = 5,
  easingFunction = identityEase,
  canvasProps = {},
  glProps = {
    antialias: false,
    powerPreference: 'high-performance',
    alpha: true
  },
  gooeyFilter,
  color = '#ffffff',
  className = ''
}: PixelTrailProps) {
  return (
    <>
      {gooeyFilter && <GooeyFilter id={gooeyFilter.id} strength={gooeyFilter.strength} />}
      <Canvas
        {...canvasProps}
        gl={glProps}
        className={\`absolute z-1 \${className}\`}
        style={gooeyFilter ? { filter: \`url(#\${gooeyFilter.id})\` } : undefined}
      >
        <Scene
          gridSize={gridSize}
          trailSize={trailSize}
          maxAge={maxAge}
          interpolate={interpolate}
          easingFunction={easingFunction}
          pixelColor={color}
        />
      </Canvas>
    </>
  );
}
`,ie={dependencies:"three @react-three/fiber @react-three/drei",usage:`import PixelTrail from './PixelTrail';

<div style={{ height: '500px', position: 'relative', overflow: 'hidden'}}>
  <PixelTrail
    gridSize={50}
    trailSize={0.1}
    maxAge={250}
    interpolate={5}
    color="#fff"
    gooeyFilter={{ id: "custom-goo-filter", strength: 2 }}
  />
</div>`,code:X,css:Y,tailwind:Z,tsCode:ee,tsTailwind:re},S={gridSize:50,trailSize:.1,maxAge:250,interpolate:5,color:"#5227FF",gooeyEnabled:!0,gooStrength:2},xe=()=>{const{props:n,updateProp:e,resetProps:i,hasChanges:o}=b(S),{gridSize:a,trailSize:s,maxAge:g,interpolate:t,color:c,gooeyEnabled:u,gooStrength:m}=n,[d,l]=D(),h=f.useMemo(()=>[{name:"gridSize",type:"number",default:"40",description:"Number of pixels in grid."},{name:"trailSize",type:"number",default:"0.1",description:"Size of each trail dot."},{name:"maxAge",type:"number",default:"500",description:"Duration of the trail effect."},{name:"interpolate",type:"number",default:"5",description:"Interpolation factor for pointer movement."},{name:"color",type:"string",default:"#ffffff",description:"Pixel color."},{name:"gooeyFilter",type:"object",default:"{ id: 'custom-goo-filter', strength: 5 }",description:"Configuration for gooey filter."}],[]);return r.jsx(P,{props:n,defaultProps:S,resetProps:i,hasChanges:o,children:r.jsxs(M,{children:[r.jsxs(U,{children:[r.jsxs(w,{position:"relative",className:"demo-container",h:400,p:0,overflow:"hidden",children:[r.jsx(H,{onClick:l}),r.jsx(Q,{gridSize:a,trailSize:s,maxAge:g,interpolate:t,color:c,gooeyFilter:u?{id:"custom-goo-filter",strength:m}:void 0},d),r.jsx(F,{position:"absolute",zIndex:0,fontSize:"clamp(2rem, 6vw, 6rem)",color:"#2F293A",fontWeight:900,children:"Move Cursor."})]}),r.jsxs(W,{children:[r.jsx(v,{title:"Grid Size",min:10,max:100,step:1,value:a,onChange:p=>{e("gridSize",p),l()}}),r.jsx(v,{title:"Trail Size",min:.05,max:.5,step:.01,value:s,onChange:p=>{e("trailSize",p),l()}}),r.jsx(v,{title:"Max Age",min:100,max:1e3,step:50,value:g,onChange:p=>{e("maxAge",p),l()}}),r.jsx(v,{title:"Interpolate",min:0,max:10,step:.1,value:t,onChange:p=>{e("interpolate",p),l()}}),r.jsx(_,{title:"Color",color:c,onChange:p=>{e("color",p),l()}}),r.jsx(N,{title:"Gooey Filter",isChecked:u,onChange:p=>{e("gooeyEnabled",p),l()}}),u&&r.jsx(v,{title:"Gooey Strength",min:1,max:20,step:1,value:m,onChange:p=>{e("gooStrength",p),l()}})]}),r.jsx(R,{data:h}),r.jsx(G,{dependencyList:["@react-three/fiber","@react-three/drei","three"]})]}),r.jsx(A,{children:r.jsx(j,{codeObject:ie,componentName:"PixelTrail"})})]})})};export{xe as default};
