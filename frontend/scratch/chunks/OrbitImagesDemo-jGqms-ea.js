import{r as v,j as i,aj as V,F as U}from"./index-TQprzHkU.js";import{u as B,C as F,T as K,P as _,a as G,b as J,c as Q}from"./useComponentProps-CjYSqekE.js";import{C as nn}from"./Customize-BdikCFm5.js";import{P as x}from"./PreviewSlider-CCbi2och.js";import{P as W}from"./PreviewSwitch-CcPSwIGg.js";import{P as k}from"./PreviewSelect-DZgUm0jD.js";import{R as en}from"./RefreshButton-C5Kl5Rs7.js";import{D as tn}from"./Dependencies-IIL9riMN.js";import{u as rn}from"./useForceRerender-Dq8YDj2j.js";import{u as sn}from"./use-motion-value-rrV2ndVB.js";import{a as an}from"./index-DqOuH-Kh.js";import{u as on}from"./use-transform-D9sL3to7.js";import"./index-DQmtNYX5.js";import"./CodeHighlighter-Dx4QNbvH.js";import"./rotate-ccw-_xDu3G0k.js";/* empty css                       */function z(t,n,s,e){return`M ${t-s} ${n} A ${s} ${e} 0 1 0 ${t+s} ${n} A ${s} ${e} 0 1 0 ${t-s} ${n}`}function T(t,n,s){return z(t,n,s,s)}function cn(t,n,s){const e=s/2;return`M ${t-e} ${n-e} L ${t+e} ${n-e} L ${t+e} ${n+e} L ${t-e} ${n+e} Z`}function hn(t,n,s,e){const r=s/2,a=e/2;return`M ${t-r} ${n-a} L ${t+r} ${n-a} L ${t+r} ${n+a} L ${t-r} ${n+a} Z`}function un(t,n,s){const e=s*Math.sqrt(3)/2,r=s/2;return`M ${t} ${n-e/1.5} L ${t+r} ${n+e/3} L ${t-r} ${n+e/3} Z`}function ln(t,n,s,e,r){const a=Math.PI/r;let h="";for(let c=0;c<2*r;c++){const u=c%2===0?s:e,l=c*a-Math.PI/2,d=t+u*Math.cos(l),f=n+u*Math.sin(l);h+=c===0?`M ${d} ${f}`:` L ${d} ${f}`}return h+" Z"}function dn(t,n,s){const e=s/30;return`M ${t} ${n+12*e} C ${t-20*e} ${n-5*e}, ${t-12*e} ${n-18*e}, ${t} ${n-8*e} C ${t+12*e} ${n-18*e}, ${t+20*e} ${n-5*e}, ${t} ${n+12*e}`}function mn(t,n,s,e){const r=s/2,a=e/2;return`M ${t} ${n} C ${t+r*.5} ${n-a}, ${t+r} ${n-a}, ${t+r} ${n} C ${t+r} ${n+a}, ${t+r*.5} ${n+a}, ${t} ${n} C ${t-r*.5} ${n+a}, ${t-r} ${n+a}, ${t-r} ${n} C ${t-r} ${n-a}, ${t-r*.5} ${n-a}, ${t} ${n}`}function gn(t,n,s,e,r){const a=[],h=r*20,c=s/2;for(let u=0;u<=h;u++){const l=t-c+s*u/h,d=n+Math.sin(u/h*r*2*Math.PI)*e;a.push(u===0?`M ${l} ${d}`:`L ${l} ${d}`)}for(let u=h;u>=0;u--){const l=t-c+s*u/h,d=n-Math.sin(u/h*r*2*Math.PI)*e;a.push(`L ${l} ${d}`)}return a.join(" ")+" Z"}function pn({item:t,index:n,totalItems:s,path:e,itemSize:r,rotation:a,progress:h,fill:c}){const u=c?n/s*100:0,l=on(h,d=>`${((d+u)%100+100)%100}%`);return i.jsx(V.div,{className:"orbit-item",style:{width:r,height:r,offsetPath:`path("${e}")`,offsetRotate:"0deg",offsetAnchor:"center center",offsetDistance:l},children:i.jsx("div",{style:{transform:`rotate(${-a}deg)`},children:t})})}function fn({images:t=[],altPrefix:n="Orbiting image",shape:s="ellipse",customPath:e,baseWidth:r=1400,radiusX:a=700,radiusY:h=170,radius:c=300,starPoints:u=5,starInnerRatio:l=.5,rotation:d=-8,duration:f=40,itemSize:R=64,direction:w="normal",fill:M=!0,width:y=100,height:C=100,className:S="",showPath:X=!1,pathColor:o="rgba(0,0,0,0.1)",pathWidth:q=2,easing:L="linear",paused:O=!1,centerContent:N,responsive:p=!1}){const P=v.useRef(null),[I,Z]=v.useState(null),m=r/2,g=r/2,j=v.useMemo(()=>{switch(s){case"circle":return T(m,g,c);case"ellipse":return z(m,g,a,h);case"square":return cn(m,g,c*2);case"rectangle":return hn(m,g,a*2,h*2);case"triangle":return un(m,g,c*2);case"star":return ln(m,g,c,c*l,u);case"heart":return dn(m,g,c*2);case"infinity":return mn(m,g,a*2,h*2);case"wave":return gn(m,g,a*2,h,3);case"custom":return e||T(m,g,c);default:return z(m,g,a,h)}},[s,e,m,g,a,h,c,u,l]);v.useLayoutEffect(()=>{if(!p||!P.current)return;const $=()=>{P.current&&Z(P.current.clientWidth/r)};$();const b=new ResizeObserver($);return b.observe(P.current),()=>b.disconnect()},[p,r]);const Y=sn(0);v.useEffect(()=>{if(O)return;const $=an(Y,w==="reverse"?-100:100,{duration:f,ease:L,repeat:1/0,repeatType:"loop"});return()=>$.stop()},[Y,f,L,w,O]);const H=p?"100%":typeof y=="number"?y:"100%",A=p?"auto":typeof C=="number"?C:typeof y=="number"?y:"auto",E=t.map(($,b)=>i.jsx("img",{src:$,alt:`${n} ${b+1}`,draggable:!1,className:"orbit-image"},$));return i.jsxs("div",{ref:P,className:`orbit-container ${S}`,style:{width:H,height:A,aspectRatio:p?"1 / 1":void 0},"aria-hidden":"true",children:[i.jsx("div",{className:p?"orbit-scaling-container orbit-scaling-container--responsive":"orbit-scaling-container",style:{width:p?r:"100%",height:p?r:"100%",transform:p&&I!==null?`translate(-50%, -50%) scale(${I})`:void 0,visibility:p&&I===null?"hidden":void 0},children:i.jsxs("div",{className:"orbit-rotation-wrapper",style:{transform:`rotate(${d}deg)`},children:[X&&i.jsx("svg",{width:"100%",height:"100%",viewBox:`0 0 ${r} ${r}`,className:"orbit-path-svg",children:i.jsx("path",{d:j,fill:"none",stroke:o,strokeWidth:q/(I??1)})}),E.map(($,b)=>i.jsx(pn,{item:$,index:b,totalItems:E.length,path:j,itemSize:R,rotation:d,progress:Y,fill:M},b))]})}),N&&i.jsx("div",{className:"orbit-center-content",children:N})]})}const $n=`// Component created by Dominik Koch
// https://x.com/dominikkoch

import { useMemo, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'motion/react';
import './OrbitImages.css';

function generateEllipsePath(cx, cy, rx, ry) {
  return \`M \${cx - rx} \${cy} A \${rx} \${ry} 0 1 0 \${cx + rx} \${cy} A \${rx} \${ry} 0 1 0 \${cx - rx} \${cy}\`;
}

function generateCirclePath(cx, cy, r) {
  return generateEllipsePath(cx, cy, r, r);
}

function generateSquarePath(cx, cy, size) {
  const h = size / 2;
  return \`M \${cx - h} \${cy - h} L \${cx + h} \${cy - h} L \${cx + h} \${cy + h} L \${cx - h} \${cy + h} Z\`;
}

function generateRectanglePath(cx, cy, w, h) {
  const hw = w / 2;
  const hh = h / 2;
  return \`M \${cx - hw} \${cy - hh} L \${cx + hw} \${cy - hh} L \${cx + hw} \${cy + hh} L \${cx - hw} \${cy + hh} Z\`;
}

function generateTrianglePath(cx, cy, size) {
  const height = (size * Math.sqrt(3)) / 2;
  const hs = size / 2;
  return \`M \${cx} \${cy - height / 1.5} L \${cx + hs} \${cy + height / 3} L \${cx - hs} \${cy + height / 3} Z\`;
}

function generateStarPath(cx, cy, outerR, innerR, points) {
  const step = Math.PI / points;
  let path = '';
  for (let i = 0; i < 2 * points; i++) {
    const r = i % 2 === 0 ? outerR : innerR;
    const angle = i * step - Math.PI / 2;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    path += i === 0 ? \`M \${x} \${y}\` : \` L \${x} \${y}\`;
  }
  return path + ' Z';
}

function generateHeartPath(cx, cy, size) {
  const s = size / 30;
  return \`M \${cx} \${cy + 12 * s} C \${cx - 20 * s} \${cy - 5 * s}, \${cx - 12 * s} \${cy - 18 * s}, \${cx} \${cy - 8 * s} C \${cx + 12 * s} \${cy - 18 * s}, \${cx + 20 * s} \${cy - 5 * s}, \${cx} \${cy + 12 * s}\`;
}

function generateInfinityPath(cx, cy, w, h) {
  const hw = w / 2;
  const hh = h / 2;
  return \`M \${cx} \${cy} C \${cx + hw * 0.5} \${cy - hh}, \${cx + hw} \${cy - hh}, \${cx + hw} \${cy} C \${cx + hw} \${cy + hh}, \${cx + hw * 0.5} \${cy + hh}, \${cx} \${cy} C \${cx - hw * 0.5} \${cy + hh}, \${cx - hw} \${cy + hh}, \${cx - hw} \${cy} C \${cx - hw} \${cy - hh}, \${cx - hw * 0.5} \${cy - hh}, \${cx} \${cy}\`;
}

function generateWavePath(cx, cy, w, amplitude, waves) {
  const pts = [];
  const segs = waves * 20;
  const hw = w / 2;
  for (let i = 0; i <= segs; i++) {
    const x = cx - hw + (w * i) / segs;
    const y = cy + Math.sin((i / segs) * waves * 2 * Math.PI) * amplitude;
    pts.push(i === 0 ? \`M \${x} \${y}\` : \`L \${x} \${y}\`);
  }
  for (let i = segs; i >= 0; i--) {
    const x = cx - hw + (w * i) / segs;
    const y = cy - Math.sin((i / segs) * waves * 2 * Math.PI) * amplitude;
    pts.push(\`L \${x} \${y}\`);
  }
  return pts.join(' ') + ' Z';
}

function OrbitItem({ item, index, totalItems, path, itemSize, rotation, progress, fill }) {
  const itemOffset = fill ? (index / totalItems) * 100 : 0;

  const offsetDistance = useTransform(progress, (p) => {
    const offset = (((p + itemOffset) % 100) + 100) % 100;
    return \`\${offset}%\`;
  });

  return (
    <motion.div
      className="orbit-item"
      style={{
        width: itemSize,
        height: itemSize,
        offsetPath: \`path("\${path}")\`,
        offsetRotate: '0deg',
        offsetAnchor: 'center center',
        offsetDistance,
      }}
    >
      <div style={{ transform: \`rotate(\${-rotation}deg)\` }}>{item}</div>
    </motion.div>
  );
}

export default function OrbitImages({
  images = [],
  altPrefix = 'Orbiting image',
  shape = 'ellipse',
  customPath,
  baseWidth = 1400,
  radiusX = 700,
  radiusY = 170,
  radius = 300,
  starPoints = 5,
  starInnerRatio = 0.5,
  rotation = -8,
  duration = 40,
  itemSize = 64,
  direction = 'normal',
  fill = true,
  width = 100,
  height = 100,
  className = '',
  showPath = false,
  pathColor = 'rgba(0,0,0,0.1)',
  pathWidth = 2,
  easing = 'linear',
  paused = false,
  centerContent,
  responsive = false,
}) {
  const containerRef = useRef(null);
  const [scale, setScale] = useState(null);

  const designCenterX = baseWidth / 2;
  const designCenterY = baseWidth / 2;

  const path = useMemo(() => {
    switch (shape) {
      case 'circle':
        return generateCirclePath(designCenterX, designCenterY, radius);
      case 'ellipse':
        return generateEllipsePath(designCenterX, designCenterY, radiusX, radiusY);
      case 'square':
        return generateSquarePath(designCenterX, designCenterY, radius * 2);
      case 'rectangle':
        return generateRectanglePath(designCenterX, designCenterY, radiusX * 2, radiusY * 2);
      case 'triangle':
        return generateTrianglePath(designCenterX, designCenterY, radius * 2);
      case 'star':
        return generateStarPath(designCenterX, designCenterY, radius, radius * starInnerRatio, starPoints);
      case 'heart':
        return generateHeartPath(designCenterX, designCenterY, radius * 2);
      case 'infinity':
        return generateInfinityPath(designCenterX, designCenterY, radiusX * 2, radiusY * 2);
      case 'wave':
        return generateWavePath(designCenterX, designCenterY, radiusX * 2, radiusY, 3);
      case 'custom':
        return customPath || generateCirclePath(designCenterX, designCenterY, radius);
      default:
        return generateEllipsePath(designCenterX, designCenterY, radiusX, radiusY);
    }
  }, [shape, customPath, designCenterX, designCenterY, radiusX, radiusY, radius, starPoints, starInnerRatio]);

  useLayoutEffect(() => {
    if (!responsive || !containerRef.current) return;
    const updateScale = () => {
      if (!containerRef.current) return;
      setScale(containerRef.current.clientWidth / baseWidth);
    };
    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [responsive, baseWidth]);

  const progress = useMotionValue(0);

  useEffect(() => {
    if (paused) return;
    const controls = animate(progress, direction === 'reverse' ? -100 : 100, {
      duration,
      ease: easing,
      repeat: Infinity,
      repeatType: 'loop',
    });
    return () => controls.stop();
  }, [progress, duration, easing, direction, paused]);

  const containerWidth = responsive ? '100%' : (typeof width === 'number' ? width : '100%');
  const containerHeight = responsive ? 'auto' : (typeof height === 'number' ? height : (typeof width === 'number' ? width : 'auto'));

  const items = images.map((src, index) => (
    <img
      key={src}
      src={src}
      alt={\`\${altPrefix} \${index + 1}\`}
      draggable={false}
      className="orbit-image"
    />
  ));

  return (
    <div
      ref={containerRef}
      className={\`orbit-container \${className}\`}
      style={{
        width: containerWidth,
        height: containerHeight,
        aspectRatio: responsive ? '1 / 1' : undefined,
      }}
      aria-hidden="true"
    >
      <div
        className={responsive ? 'orbit-scaling-container orbit-scaling-container--responsive' : 'orbit-scaling-container'}
        style={{
          width: responsive ? baseWidth : '100%',
          height: responsive ? baseWidth : '100%',
          transform: responsive && scale !== null ? \`translate(-50%, -50%) scale(\${scale})\` : undefined,
          visibility: responsive && scale === null ? 'hidden' : undefined,
        }}
      >
        <div
          className="orbit-rotation-wrapper"
          style={{ transform: \`rotate(\${rotation}deg)\` }}
        >
          {showPath && (
            <svg
              width="100%"
              height="100%"
              viewBox={\`0 0 \${baseWidth} \${baseWidth}\`}
              className="orbit-path-svg"
            >
              <path d={path} fill="none" stroke={pathColor} strokeWidth={pathWidth / (scale ?? 1)} />
            </svg>
          )}

          {items.map((item, index) => (
            <OrbitItem
              key={index}
              item={item}
              index={index}
              totalItems={items.length}
              path={path}
              itemSize={itemSize}
              rotation={rotation}
              progress={progress}
              fill={fill}
            />
          ))}
        </div>
      </div>

      {centerContent && (
        <div className="orbit-center-content">
          {centerContent}
        </div>
      )}
    </div>
  );
}
`,yn=`.orbit-container {
  position: relative;
  margin-left: auto;
  margin-right: auto;
}

.orbit-scaling-container {
  width: 100%;
  height: 100%;
  position: relative;
}

.orbit-scaling-container--responsive {
  position: absolute;
  left: 50%;
  top: 50%;
  transform-origin: center center;
}

.orbit-rotation-wrapper {
  width: 100%;
  height: 100%;
  transform-origin: center center;
  position: relative;
}

.orbit-path-svg {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.orbit-item {
  position: absolute;
  will-change: transform;
  user-select: none;
}

.orbit-center-content {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.orbit-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
`,bn=`// Component created by Dominik Koch
// https://x.com/dominikkoch

import { useMemo, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'motion/react';

function generateEllipsePath(cx, cy, rx, ry) {
  return \`M \${cx - rx} \${cy} A \${rx} \${ry} 0 1 0 \${cx + rx} \${cy} A \${rx} \${ry} 0 1 0 \${cx - rx} \${cy}\`;
}

function generateCirclePath(cx, cy, r) {
  return generateEllipsePath(cx, cy, r, r);
}

function generateSquarePath(cx, cy, size) {
  const h = size / 2;
  return \`M \${cx - h} \${cy - h} L \${cx + h} \${cy - h} L \${cx + h} \${cy + h} L \${cx - h} \${cy + h} Z\`;
}

function generateRectanglePath(cx, cy, w, h) {
  const hw = w / 2;
  const hh = h / 2;
  return \`M \${cx - hw} \${cy - hh} L \${cx + hw} \${cy - hh} L \${cx + hw} \${cy + hh} L \${cx - hw} \${cy + hh} Z\`;
}

function generateTrianglePath(cx, cy, size) {
  const height = (size * Math.sqrt(3)) / 2;
  const hs = size / 2;
  return \`M \${cx} \${cy - height / 1.5} L \${cx + hs} \${cy + height / 3} L \${cx - hs} \${cy + height / 3} Z\`;
}

function generateStarPath(cx, cy, outerR, innerR, points) {
  const step = Math.PI / points;
  let path = '';
  for (let i = 0; i < 2 * points; i++) {
    const r = i % 2 === 0 ? outerR : innerR;
    const angle = i * step - Math.PI / 2;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    path += i === 0 ? \`M \${x} \${y}\` : \` L \${x} \${y}\`;
  }
  return path + ' Z';
}

function generateHeartPath(cx, cy, size) {
  const s = size / 30;
  return \`M \${cx} \${cy + 12 * s} C \${cx - 20 * s} \${cy - 5 * s}, \${cx - 12 * s} \${cy - 18 * s}, \${cx} \${cy - 8 * s} C \${cx + 12 * s} \${cy - 18 * s}, \${cx + 20 * s} \${cy - 5 * s}, \${cx} \${cy + 12 * s}\`;
}

function generateInfinityPath(cx, cy, w, h) {
  const hw = w / 2;
  const hh = h / 2;
  return \`M \${cx} \${cy} C \${cx + hw * 0.5} \${cy - hh}, \${cx + hw} \${cy - hh}, \${cx + hw} \${cy} C \${cx + hw} \${cy + hh}, \${cx + hw * 0.5} \${cy + hh}, \${cx} \${cy} C \${cx - hw * 0.5} \${cy + hh}, \${cx - hw} \${cy + hh}, \${cx - hw} \${cy} C \${cx - hw} \${cy - hh}, \${cx - hw * 0.5} \${cy - hh}, \${cx} \${cy}\`;
}

function generateWavePath(cx, cy, w, amplitude, waves) {
  const pts = [];
  const segs = waves * 20;
  const hw = w / 2;
  for (let i = 0; i <= segs; i++) {
    const x = cx - hw + (w * i) / segs;
    const y = cy + Math.sin((i / segs) * waves * 2 * Math.PI) * amplitude;
    pts.push(i === 0 ? \`M \${x} \${y}\` : \`L \${x} \${y}\`);
  }
  for (let i = segs; i >= 0; i--) {
    const x = cx - hw + (w * i) / segs;
    const y = cy - Math.sin((i / segs) * waves * 2 * Math.PI) * amplitude;
    pts.push(\`L \${x} \${y}\`);
  }
  return pts.join(' ') + ' Z';
}

function OrbitItem({ item, index, totalItems, path, itemSize, rotation, progress, fill }) {
  const itemOffset = fill ? (index / totalItems) * 100 : 0;

  const offsetDistance = useTransform(progress, (p) => {
    const offset = (((p + itemOffset) % 100) + 100) % 100;
    return \`\${offset}%\`;
  });

  return (
    <motion.div
      className="absolute will-change-transform select-none"
      style={{
        width: itemSize,
        height: itemSize,
        offsetPath: \`path("\${path}")\`,
        offsetRotate: '0deg',
        offsetAnchor: 'center center',
        offsetDistance,
      }}
    >
      <div style={{ transform: \`rotate(\${-rotation}deg)\` }}>{item}</div>
    </motion.div>
  );
}

export default function OrbitImages({
  images = [],
  altPrefix = 'Orbiting image',
  shape = 'ellipse',
  customPath,
  baseWidth = 1400,
  radiusX = 700,
  radiusY = 170,
  radius = 300,
  starPoints = 5,
  starInnerRatio = 0.5,
  rotation = -8,
  duration = 40,
  itemSize = 64,
  direction = 'normal',
  fill = true,
  width = 100,
  height = 100,
  className = '',
  showPath = false,
  pathColor = 'rgba(0,0,0,0.1)',
  pathWidth = 2,
  easing = 'linear',
  paused = false,
  centerContent,
  responsive = false,
}) {
  const containerRef = useRef(null);
  const [scale, setScale] = useState(null);

  const designCenterX = baseWidth / 2;
  const designCenterY = baseWidth / 2;

  const path = useMemo(() => {
    switch (shape) {
      case 'circle':
        return generateCirclePath(designCenterX, designCenterY, radius);
      case 'ellipse':
        return generateEllipsePath(designCenterX, designCenterY, radiusX, radiusY);
      case 'square':
        return generateSquarePath(designCenterX, designCenterY, radius * 2);
      case 'rectangle':
        return generateRectanglePath(designCenterX, designCenterY, radiusX * 2, radiusY * 2);
      case 'triangle':
        return generateTrianglePath(designCenterX, designCenterY, radius * 2);
      case 'star':
        return generateStarPath(designCenterX, designCenterY, radius, radius * starInnerRatio, starPoints);
      case 'heart':
        return generateHeartPath(designCenterX, designCenterY, radius * 2);
      case 'infinity':
        return generateInfinityPath(designCenterX, designCenterY, radiusX * 2, radiusY * 2);
      case 'wave':
        return generateWavePath(designCenterX, designCenterY, radiusX * 2, radiusY, 3);
      case 'custom':
        return customPath || generateCirclePath(designCenterX, designCenterY, radius);
      default:
        return generateEllipsePath(designCenterX, designCenterY, radiusX, radiusY);
    }
  }, [shape, customPath, designCenterX, designCenterY, radiusX, radiusY, radius, starPoints, starInnerRatio]);

  useLayoutEffect(() => {
    if (!responsive || !containerRef.current) return;
    const updateScale = () => {
      if (!containerRef.current) return;
      setScale(containerRef.current.clientWidth / baseWidth);
    };
    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [responsive, baseWidth]);

  const progress = useMotionValue(0);

  useEffect(() => {
    if (paused) return;
    const controls = animate(progress, direction === 'reverse' ? -100 : 100, {
      duration,
      ease: easing,
      repeat: Infinity,
      repeatType: 'loop',
    });
    return () => controls.stop();
  }, [progress, duration, easing, direction, paused]);

  const containerWidth = responsive ? '100%' : (typeof width === 'number' ? width : '100%');
  const containerHeight = responsive ? 'auto' : (typeof height === 'number' ? height : (typeof width === 'number' ? width : 'auto'));

  const items = images.map((src, index) => (
    <img
      key={src}
      src={src}
      alt={\`\${altPrefix} \${index + 1}\`}
      draggable={false}
      className="w-full h-full object-contain"
    />
  ));

  return (
    <div
      ref={containerRef}
      className={\`relative mx-auto \${className}\`}
      style={{
        width: containerWidth,
        height: containerHeight,
        aspectRatio: responsive ? '1 / 1' : undefined,
      }}
      aria-hidden="true"
    >
      <div
        className={responsive ? 'absolute left-1/2 top-1/2' : 'relative w-full h-full'}
        style={{
          width: responsive ? baseWidth : '100%',
          height: responsive ? baseWidth : '100%',
          transform: responsive && scale !== null ? \`translate(-50%, -50%) scale(\${scale})\` : undefined,
          visibility: responsive && scale === null ? 'hidden' : undefined,
          transformOrigin: 'center center',
        }}
      >
        <div
          className="relative w-full h-full"
          style={{
            transform: \`rotate(\${rotation}deg)\`,
            transformOrigin: 'center center',
          }}
        >
          {showPath && (
            <svg
              width="100%"
              height="100%"
              viewBox={\`0 0 \${baseWidth} \${baseWidth}\`}
              className="absolute inset-0 pointer-events-none"
            >
              <path d={path} fill="none" stroke={pathColor} strokeWidth={pathWidth / (scale ?? 1)} />
            </svg>
          )}

          {items.map((item, index) => (
            <OrbitItem
              key={index}
              item={item}
              index={index}
              totalItems={items.length}
              path={path}
              itemSize={itemSize}
              rotation={rotation}
              progress={progress}
              fill={fill}
            />
          ))}
        </div>
      </div>

      {centerContent && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          {centerContent}
        </div>
      )}
    </div>
  );
}
`,xn=`// Component created by Dominik Koch
// https://x.com/dominikkoch

import { useMemo, useEffect, useLayoutEffect, useRef, useState, ReactNode } from 'react';
import { motion, useMotionValue, useTransform, animate, MotionValue } from 'motion/react';
import './OrbitImages.css';

type OrbitShape =
  | 'ellipse'
  | 'circle'
  | 'square'
  | 'rectangle'
  | 'triangle'
  | 'star'
  | 'heart'
  | 'infinity'
  | 'wave'
  | 'custom';

interface OrbitImagesProps {
  images?: string[];
  altPrefix?: string;
  shape?: OrbitShape;
  customPath?: string;
  baseWidth?: number;
  radiusX?: number;
  radiusY?: number;
  radius?: number;
  starPoints?: number;
  starInnerRatio?: number;
  rotation?: number;
  duration?: number;
  itemSize?: number;
  direction?: 'normal' | 'reverse';
  fill?: boolean;
  width?: number | '100%';
  height?: number | 'auto';
  className?: string;
  showPath?: boolean;
  pathColor?: string;
  pathWidth?: number;
  easing?: 'linear' | 'easeIn' | 'easeOut' | 'easeInOut';
  paused?: boolean;
  centerContent?: ReactNode;
  responsive?: boolean;
}

interface OrbitItemProps {
  item: ReactNode;
  index: number;
  totalItems: number;
  path: string;
  itemSize: number;
  rotation: number;
  progress: MotionValue<number>;
  fill: boolean;
}

function generateEllipsePath(cx: number, cy: number, rx: number, ry: number): string {
  return \`M \${cx - rx} \${cy} A \${rx} \${ry} 0 1 0 \${cx + rx} \${cy} A \${rx} \${ry} 0 1 0 \${cx - rx} \${cy}\`;
}

function generateCirclePath(cx: number, cy: number, r: number): string {
  return generateEllipsePath(cx, cy, r, r);
}

function generateSquarePath(cx: number, cy: number, size: number): string {
  const h = size / 2;
  return \`M \${cx - h} \${cy - h} L \${cx + h} \${cy - h} L \${cx + h} \${cy + h} L \${cx - h} \${cy + h} Z\`;
}

function generateRectanglePath(cx: number, cy: number, w: number, h: number): string {
  const hw = w / 2;
  const hh = h / 2;
  return \`M \${cx - hw} \${cy - hh} L \${cx + hw} \${cy - hh} L \${cx + hw} \${cy + hh} L \${cx - hw} \${cy + hh} Z\`;
}

function generateTrianglePath(cx: number, cy: number, size: number): string {
  const height = (size * Math.sqrt(3)) / 2;
  const hs = size / 2;
  return \`M \${cx} \${cy - height / 1.5} L \${cx + hs} \${cy + height / 3} L \${cx - hs} \${cy + height / 3} Z\`;
}

function generateStarPath(cx: number, cy: number, outerR: number, innerR: number, points: number): string {
  const step = Math.PI / points;
  let path = '';
  for (let i = 0; i < 2 * points; i++) {
    const r = i % 2 === 0 ? outerR : innerR;
    const angle = i * step - Math.PI / 2;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    path += i === 0 ? \`M \${x} \${y}\` : \` L \${x} \${y}\`;
  }
  return path + ' Z';
}

function generateHeartPath(cx: number, cy: number, size: number): string {
  const s = size / 30;
  return \`M \${cx} \${cy + 12 * s} C \${cx - 20 * s} \${cy - 5 * s}, \${cx - 12 * s} \${cy - 18 * s}, \${cx} \${cy - 8 * s} C \${cx + 12 * s} \${cy - 18 * s}, \${cx + 20 * s} \${cy - 5 * s}, \${cx} \${cy + 12 * s}\`;
}

function generateInfinityPath(cx: number, cy: number, w: number, h: number): string {
  const hw = w / 2;
  const hh = h / 2;
  return \`M \${cx} \${cy} C \${cx + hw * 0.5} \${cy - hh}, \${cx + hw} \${cy - hh}, \${cx + hw} \${cy} C \${cx + hw} \${cy + hh}, \${cx + hw * 0.5} \${cy + hh}, \${cx} \${cy} C \${cx - hw * 0.5} \${cy + hh}, \${cx - hw} \${cy + hh}, \${cx - hw} \${cy} C \${cx - hw} \${cy - hh}, \${cx - hw * 0.5} \${cy - hh}, \${cx} \${cy}\`;
}

function generateWavePath(cx: number, cy: number, w: number, amplitude: number, waves: number): string {
  const pts: string[] = [];
  const segs = waves * 20;
  const hw = w / 2;
  for (let i = 0; i <= segs; i++) {
    const x = cx - hw + (w * i) / segs;
    const y = cy + Math.sin((i / segs) * waves * 2 * Math.PI) * amplitude;
    pts.push(i === 0 ? \`M \${x} \${y}\` : \`L \${x} \${y}\`);
  }
  for (let i = segs; i >= 0; i--) {
    const x = cx - hw + (w * i) / segs;
    const y = cy - Math.sin((i / segs) * waves * 2 * Math.PI) * amplitude;
    pts.push(\`L \${x} \${y}\`);
  }
  return pts.join(' ') + ' Z';
}

function OrbitItem({ item, index, totalItems, path, itemSize, rotation, progress, fill }: OrbitItemProps) {
  const itemOffset = fill ? (index / totalItems) * 100 : 0;

  const offsetDistance = useTransform(progress, (p: number) => {
    const offset = (((p + itemOffset) % 100) + 100) % 100;
    return \`\${offset}%\`;
  });

  return (
    <motion.div
      className="orbit-item"
      style={{
        width: itemSize,
        height: itemSize,
        offsetPath: \`path("\${path}")\`,
        offsetRotate: '0deg',
        offsetAnchor: 'center center',
        offsetDistance,
      }}
    >
      <div style={{ transform: \`rotate(\${-rotation}deg)\` }}>{item}</div>
    </motion.div>
  );
}

export default function OrbitImages({
  images = [],
  altPrefix = 'Orbiting image',
  shape = 'ellipse',
  customPath,
  baseWidth = 1400,
  radiusX = 700,
  radiusY = 170,
  radius = 300,
  starPoints = 5,
  starInnerRatio = 0.5,
  rotation = -8,
  duration = 40,
  itemSize = 64,
  direction = 'normal',
  fill = true,
  width = 100,
  height = 100,
  className = '',
  showPath = false,
  pathColor = 'rgba(0,0,0,0.1)',
  pathWidth = 2,
  easing = 'linear',
  paused = false,
  centerContent,
  responsive = false,
}: OrbitImagesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number | null>(null);

  const designCenterX = baseWidth / 2;
  const designCenterY = baseWidth / 2;

  const path = useMemo(() => {
    switch (shape) {
      case 'circle':
        return generateCirclePath(designCenterX, designCenterY, radius);
      case 'ellipse':
        return generateEllipsePath(designCenterX, designCenterY, radiusX, radiusY);
      case 'square':
        return generateSquarePath(designCenterX, designCenterY, radius * 2);
      case 'rectangle':
        return generateRectanglePath(designCenterX, designCenterY, radiusX * 2, radiusY * 2);
      case 'triangle':
        return generateTrianglePath(designCenterX, designCenterY, radius * 2);
      case 'star':
        return generateStarPath(designCenterX, designCenterY, radius, radius * starInnerRatio, starPoints);
      case 'heart':
        return generateHeartPath(designCenterX, designCenterY, radius * 2);
      case 'infinity':
        return generateInfinityPath(designCenterX, designCenterY, radiusX * 2, radiusY * 2);
      case 'wave':
        return generateWavePath(designCenterX, designCenterY, radiusX * 2, radiusY, 3);
      case 'custom':
        return customPath || generateCirclePath(designCenterX, designCenterY, radius);
      default:
        return generateEllipsePath(designCenterX, designCenterY, radiusX, radiusY);
    }
  }, [shape, customPath, designCenterX, designCenterY, radiusX, radiusY, radius, starPoints, starInnerRatio]);

  useLayoutEffect(() => {
    if (!responsive || !containerRef.current) return;
    const updateScale = () => {
      if (!containerRef.current) return;
      setScale(containerRef.current.clientWidth / baseWidth);
    };
    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [responsive, baseWidth]);

  const progress = useMotionValue(0);

  useEffect(() => {
    if (paused) return;
    const controls = animate(progress, direction === 'reverse' ? -100 : 100, {
      duration,
      ease: easing,
      repeat: Infinity,
      repeatType: 'loop',
    });
    return () => controls.stop();
  }, [progress, duration, easing, direction, paused]);

  const containerWidth = responsive ? '100%' : (typeof width === 'number' ? width : '100%');
  const containerHeight = responsive ? 'auto' : (typeof height === 'number' ? height : (typeof width === 'number' ? width : 'auto'));

  const items = images.map((src, index) => (
    <img
      key={src}
      src={src}
      alt={\`\${altPrefix} \${index + 1}\`}
      draggable={false}
      className="orbit-image"
    />
  ));

  return (
    <div
      ref={containerRef}
      className={\`orbit-container \${className}\`}
      style={{
        width: containerWidth,
        height: containerHeight,
        aspectRatio: responsive ? '1 / 1' : undefined,
      }}
      aria-hidden="true"
    >
      <div
        className={responsive ? 'orbit-scaling-container orbit-scaling-container--responsive' : 'orbit-scaling-container'}
        style={{
          width: responsive ? baseWidth : '100%',
          height: responsive ? baseWidth : '100%',
          transform: responsive && scale !== null ? \`translate(-50%, -50%) scale(\${scale})\` : undefined,
          visibility: responsive && scale === null ? 'hidden' : undefined,
        }}
      >
        <div
          className="orbit-rotation-wrapper"
          style={{ transform: \`rotate(\${rotation}deg)\` }}
        >
          {showPath && (
            <svg
              width="100%"
              height="100%"
              viewBox={\`0 0 \${baseWidth} \${baseWidth}\`}
              className="orbit-path-svg"
            >
              <path d={path} fill="none" stroke={pathColor} strokeWidth={pathWidth / (scale ?? 1)} />
            </svg>
          )}

          {items.map((item, index) => (
            <OrbitItem
              key={index}
              item={item}
              index={index}
              totalItems={items.length}
              path={path}
              itemSize={itemSize}
              rotation={rotation}
              progress={progress}
              fill={fill}
            />
          ))}
        </div>
      </div>

      {centerContent && (
        <div className="orbit-center-content">
          {centerContent}
        </div>
      )}
    </div>
  );
}
`,vn=`// Component created by Dominik Koch
// https://x.com/dominikkoch

import { useMemo, useEffect, useLayoutEffect, useRef, useState, ReactNode } from 'react';
import { motion, useMotionValue, useTransform, animate, MotionValue } from 'motion/react';

type OrbitShape =
  | 'ellipse'
  | 'circle'
  | 'square'
  | 'rectangle'
  | 'triangle'
  | 'star'
  | 'heart'
  | 'infinity'
  | 'wave'
  | 'custom';

interface OrbitImagesProps {
  images?: string[];
  altPrefix?: string;
  shape?: OrbitShape;
  customPath?: string;
  baseWidth?: number;
  radiusX?: number;
  radiusY?: number;
  radius?: number;
  starPoints?: number;
  starInnerRatio?: number;
  rotation?: number;
  duration?: number;
  itemSize?: number;
  direction?: 'normal' | 'reverse';
  fill?: boolean;
  width?: number | '100%';
  height?: number | 'auto';
  className?: string;
  showPath?: boolean;
  pathColor?: string;
  pathWidth?: number;
  easing?: 'linear' | 'easeIn' | 'easeOut' | 'easeInOut';
  paused?: boolean;
  centerContent?: ReactNode;
  responsive?: boolean;
}

interface OrbitItemProps {
  item: ReactNode;
  index: number;
  totalItems: number;
  path: string;
  itemSize: number;
  rotation: number;
  progress: MotionValue<number>;
  fill: boolean;
}

function generateEllipsePath(cx: number, cy: number, rx: number, ry: number): string {
  return \`M \${cx - rx} \${cy} A \${rx} \${ry} 0 1 0 \${cx + rx} \${cy} A \${rx} \${ry} 0 1 0 \${cx - rx} \${cy}\`;
}

function generateCirclePath(cx: number, cy: number, r: number): string {
  return generateEllipsePath(cx, cy, r, r);
}

function generateSquarePath(cx: number, cy: number, size: number): string {
  const h = size / 2;
  return \`M \${cx - h} \${cy - h} L \${cx + h} \${cy - h} L \${cx + h} \${cy + h} L \${cx - h} \${cy + h} Z\`;
}

function generateRectanglePath(cx: number, cy: number, w: number, h: number): string {
  const hw = w / 2;
  const hh = h / 2;
  return \`M \${cx - hw} \${cy - hh} L \${cx + hw} \${cy - hh} L \${cx + hw} \${cy + hh} L \${cx - hw} \${cy + hh} Z\`;
}

function generateTrianglePath(cx: number, cy: number, size: number): string {
  const height = (size * Math.sqrt(3)) / 2;
  const hs = size / 2;
  return \`M \${cx} \${cy - height / 1.5} L \${cx + hs} \${cy + height / 3} L \${cx - hs} \${cy + height / 3} Z\`;
}

function generateStarPath(cx: number, cy: number, outerR: number, innerR: number, points: number): string {
  const step = Math.PI / points;
  let path = '';
  for (let i = 0; i < 2 * points; i++) {
    const r = i % 2 === 0 ? outerR : innerR;
    const angle = i * step - Math.PI / 2;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    path += i === 0 ? \`M \${x} \${y}\` : \` L \${x} \${y}\`;
  }
  return path + ' Z';
}

function generateHeartPath(cx: number, cy: number, size: number): string {
  const s = size / 30;
  return \`M \${cx} \${cy + 12 * s} C \${cx - 20 * s} \${cy - 5 * s}, \${cx - 12 * s} \${cy - 18 * s}, \${cx} \${cy - 8 * s} C \${cx + 12 * s} \${cy - 18 * s}, \${cx + 20 * s} \${cy - 5 * s}, \${cx} \${cy + 12 * s}\`;
}

function generateInfinityPath(cx: number, cy: number, w: number, h: number): string {
  const hw = w / 2;
  const hh = h / 2;
  return \`M \${cx} \${cy} C \${cx + hw * 0.5} \${cy - hh}, \${cx + hw} \${cy - hh}, \${cx + hw} \${cy} C \${cx + hw} \${cy + hh}, \${cx + hw * 0.5} \${cy + hh}, \${cx} \${cy} C \${cx - hw * 0.5} \${cy + hh}, \${cx - hw} \${cy + hh}, \${cx - hw} \${cy} C \${cx - hw} \${cy - hh}, \${cx - hw * 0.5} \${cy - hh}, \${cx} \${cy}\`;
}

function generateWavePath(cx: number, cy: number, w: number, amplitude: number, waves: number): string {
  const pts: string[] = [];
  const segs = waves * 20;
  const hw = w / 2;
  for (let i = 0; i <= segs; i++) {
    const x = cx - hw + (w * i) / segs;
    const y = cy + Math.sin((i / segs) * waves * 2 * Math.PI) * amplitude;
    pts.push(i === 0 ? \`M \${x} \${y}\` : \`L \${x} \${y}\`);
  }
  for (let i = segs; i >= 0; i--) {
    const x = cx - hw + (w * i) / segs;
    const y = cy - Math.sin((i / segs) * waves * 2 * Math.PI) * amplitude;
    pts.push(\`L \${x} \${y}\`);
  }
  return pts.join(' ') + ' Z';
}

function OrbitItem({ item, index, totalItems, path, itemSize, rotation, progress, fill }: OrbitItemProps) {
  const itemOffset = fill ? (index / totalItems) * 100 : 0;

  const offsetDistance = useTransform(progress, (p: number) => {
    const offset = (((p + itemOffset) % 100) + 100) % 100;
    return \`\${offset}%\`;
  });

  return (
    <motion.div
      className="absolute will-change-transform select-none"
      style={{
        width: itemSize,
        height: itemSize,
        offsetPath: \`path("\${path}")\`,
        offsetRotate: '0deg',
        offsetAnchor: 'center center',
        offsetDistance,
      }}
    >
      <div style={{ transform: \`rotate(\${-rotation}deg)\` }}>{item}</div>
    </motion.div>
  );
}

export default function OrbitImages({
  images = [],
  altPrefix = 'Orbiting image',
  shape = 'ellipse',
  customPath,
  baseWidth = 1400,
  radiusX = 700,
  radiusY = 170,
  radius = 300,
  starPoints = 5,
  starInnerRatio = 0.5,
  rotation = -8,
  duration = 40,
  itemSize = 64,
  direction = 'normal',
  fill = true,
  width = 100,
  height = 100,
  className = '',
  showPath = false,
  pathColor = 'rgba(0,0,0,0.1)',
  pathWidth = 2,
  easing = 'linear',
  paused = false,
  centerContent,
  responsive = false,
}: OrbitImagesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number | null>(null);

  const designCenterX = baseWidth / 2;
  const designCenterY = baseWidth / 2;

  const path = useMemo(() => {
    switch (shape) {
      case 'circle':
        return generateCirclePath(designCenterX, designCenterY, radius);
      case 'ellipse':
        return generateEllipsePath(designCenterX, designCenterY, radiusX, radiusY);
      case 'square':
        return generateSquarePath(designCenterX, designCenterY, radius * 2);
      case 'rectangle':
        return generateRectanglePath(designCenterX, designCenterY, radiusX * 2, radiusY * 2);
      case 'triangle':
        return generateTrianglePath(designCenterX, designCenterY, radius * 2);
      case 'star':
        return generateStarPath(designCenterX, designCenterY, radius, radius * starInnerRatio, starPoints);
      case 'heart':
        return generateHeartPath(designCenterX, designCenterY, radius * 2);
      case 'infinity':
        return generateInfinityPath(designCenterX, designCenterY, radiusX * 2, radiusY * 2);
      case 'wave':
        return generateWavePath(designCenterX, designCenterY, radiusX * 2, radiusY, 3);
      case 'custom':
        return customPath || generateCirclePath(designCenterX, designCenterY, radius);
      default:
        return generateEllipsePath(designCenterX, designCenterY, radiusX, radiusY);
    }
  }, [shape, customPath, designCenterX, designCenterY, radiusX, radiusY, radius, starPoints, starInnerRatio]);

  useLayoutEffect(() => {
    if (!responsive || !containerRef.current) return;
    const updateScale = () => {
      if (!containerRef.current) return;
      setScale(containerRef.current.clientWidth / baseWidth);
    };
    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [responsive, baseWidth]);

  const progress = useMotionValue(0);

  useEffect(() => {
    if (paused) return;
    const controls = animate(progress, direction === 'reverse' ? -100 : 100, {
      duration,
      ease: easing,
      repeat: Infinity,
      repeatType: 'loop',
    });
    return () => controls.stop();
  }, [progress, duration, easing, direction, paused]);

  const containerWidth = responsive ? '100%' : (typeof width === 'number' ? width : '100%');
  const containerHeight = responsive ? 'auto' : (typeof height === 'number' ? height : (typeof width === 'number' ? width : 'auto'));

  const items = images.map((src, index) => (
    <img
      key={src}
      src={src}
      alt={\`\${altPrefix} \${index + 1}\`}
      draggable={false}
      className="w-full h-full object-contain"
    />
  ));

  return (
    <div
      ref={containerRef}
      className={\`relative mx-auto \${className}\`}
      style={{
        width: containerWidth,
        height: containerHeight,
        aspectRatio: responsive ? '1 / 1' : undefined,
      }}
      aria-hidden="true"
    >
      <div
        className={responsive ? 'absolute left-1/2 top-1/2' : 'relative w-full h-full'}
        style={{
          width: responsive ? baseWidth : '100%',
          height: responsive ? baseWidth : '100%',
          transform: responsive && scale !== null ? \`translate(-50%, -50%) scale(\${scale})\` : undefined,
          visibility: responsive && scale === null ? 'hidden' : undefined,
          transformOrigin: 'center center',
        }}
      >
        <div
          className="relative w-full h-full"
          style={{
            transform: \`rotate(\${rotation}deg)\`,
            transformOrigin: 'center center',
          }}
        >
          {showPath && (
            <svg
              width="100%"
              height="100%"
              viewBox={\`0 0 \${baseWidth} \${baseWidth}\`}
              className="absolute inset-0 pointer-events-none"
            >
              <path d={path} fill="none" stroke={pathColor} strokeWidth={pathWidth / (scale ?? 1)} />
            </svg>
          )}

          {items.map((item, index) => (
            <OrbitItem
              key={index}
              item={item}
              index={index}
              totalItems={items.length}
              path={path}
              itemSize={itemSize}
              rotation={rotation}
              progress={progress}
              fill={fill}
            />
          ))}
        </div>
      </div>

      {centerContent && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          {centerContent}
        </div>
      )}
    </div>
  );
}
`,wn={dependencies:"motion",usage:`// Component created by Dominik Koch
// https://x.com/dominikkoch

import OrbitImages from './OrbitImages'

const images = [
  "https://picsum.photos/300/300?grayscale&random=1",
  "https://picsum.photos/300/300?grayscale&random=2",
  "https://picsum.photos/300/300?grayscale&random=3",
  "https://picsum.photos/300/300?grayscale&random=4",
  "https://picsum.photos/300/300?grayscale&random=5",
  "https://picsum.photos/300/300?grayscale&random=6",
];

<OrbitImages
  images={images}
  shape="ellipse"
  radiusX={340}
  radiusY={80}
  rotation={-8}
  duration={30}
  itemSize={80}
  responsive={true}
/>`,code:$n,css:yn,tailwind:bn,tsCode:xn,tsTailwind:vn},Cn=[{label:"Ellipse",value:"ellipse"},{label:"Circle",value:"circle"},{label:"Square",value:"square"},{label:"Rectangle",value:"rectangle"},{label:"Triangle",value:"triangle"},{label:"Star",value:"star"},{label:"Heart",value:"heart"},{label:"Infinity",value:"infinity"},{label:"Wave",value:"wave"}],Pn=[{label:"Normal",value:"normal"},{label:"Reverse",value:"reverse"}],D={shape:"ellipse",radiusX:340,radiusY:80,radius:160,rotation:-8,duration:30,itemSize:80,direction:"normal",fill:!0,showPath:!0,paused:!1},qn=()=>{const[t,n]=rn(),{props:s,updateProp:e,resetProps:r,hasChanges:a}=B(D),{shape:h,radiusX:c,radiusY:u,radius:l,rotation:d,duration:f,itemSize:R,direction:w,fill:M,showPath:y,paused:C}=s,S=["https://picsum.photos/300/300?grayscale&random=1","https://picsum.photos/300/300?grayscale&random=2","https://picsum.photos/300/300?grayscale&random=3","https://picsum.photos/300/300?grayscale&random=4","https://picsum.photos/300/300?grayscale&random=5","https://picsum.photos/300/300?grayscale&random=6"],X=v.useMemo(()=>[{name:"images",type:"string[]",default:"[]",description:"Array of image URLs to orbit along the path."},{name:"altPrefix",type:"string",default:'"Orbiting image"',description:"Prefix for auto-generated alt attributes."},{name:"shape",type:"string",default:'"ellipse"',description:"Preset shape: ellipse, circle, square, rectangle, triangle, star, heart, infinity, wave, or custom."},{name:"customPath",type:"string",default:"undefined",description:'Custom SVG path string (used when shape="custom").'},{name:"baseWidth",type:"number",default:"1400",description:"Base width for the design coordinate space used for responsive scaling."},{name:"radiusX",type:"number",default:"700",description:"Horizontal radius for ellipse/rectangle shapes."},{name:"radiusY",type:"number",default:"170",description:"Vertical radius for ellipse/rectangle shapes."},{name:"radius",type:"number",default:"300",description:"Radius for circle, square, triangle, star, heart shapes."},{name:"starPoints",type:"number",default:"5",description:"Number of points for star shape."},{name:"starInnerRatio",type:"number",default:"0.5",description:"Inner radius ratio for star (0-1)."},{name:"rotation",type:"number",default:"-8",description:"Rotation angle of the entire orbit path in degrees."},{name:"duration",type:"number",default:"40",description:"Duration of one complete orbit in seconds."},{name:"itemSize",type:"number",default:"64",description:"Width/height of each orbiting item in pixels."},{name:"direction",type:"string",default:'"normal"',description:'Animation direction: "normal" or "reverse".'},{name:"fill",type:"boolean",default:"true",description:"Whether to distribute items evenly around the orbit."},{name:"width",type:'number | "100%"',default:"100",description:'Container width in pixels or "100%".'},{name:"height",type:'number | "auto"',default:"100",description:'Container height in pixels or "auto".'},{name:"className",type:"string",default:'""',description:"Additional CSS class for the container."},{name:"showPath",type:"boolean",default:"false",description:"Whether to show the orbit path for debugging."},{name:"pathColor",type:"string",default:'"rgba(0,0,0,0.1)"',description:"Stroke color when showPath is true."},{name:"pathWidth",type:"number",default:"2",description:"Stroke width when showPath is true."},{name:"easing",type:"string",default:'"linear"',description:"Animation easing: linear, easeIn, easeOut, easeInOut."},{name:"paused",type:"boolean",default:"false",description:"Whether the animation is paused."},{name:"centerContent",type:"ReactNode",default:"undefined",description:"Custom content rendered at the center of the orbit."},{name:"responsive",type:"boolean",default:"false",description:"Enable responsive scaling based on container width."}],[]);return i.jsx(F,{props:s,defaultProps:D,resetProps:r,hasChanges:a,children:i.jsxs(K,{children:[i.jsxs(_,{children:[i.jsxs(U,{overflow:"hidden",justifyContent:"center",alignItems:"center",h:400,position:"relative",className:"demo-container",children:[i.jsx(fn,{images:S,shape:h,radiusX:c,radiusY:u,radius:l,rotation:d,duration:f,itemSize:R,direction:w,fill:M,showPath:y,paused:C,responsive:!0,pathColor:"rgba(255,255,255,0.15)"},t),i.jsx(en,{onClick:n})]}),i.jsxs(nn,{children:[i.jsx(k,{title:"Shape",name:"orbit-shape",width:140,value:h,options:Cn,onChange:o=>{e("shape",o),n()}}),i.jsx(k,{title:"Direction",name:"orbit-direction",width:120,value:w,options:Pn,onChange:o=>{e("direction",o),n()}}),i.jsx(x,{title:"Radius X",min:50,max:600,step:10,value:c,valueUnit:"px",onChange:o=>{e("radiusX",o),n()}}),i.jsx(x,{title:"Radius Y",min:50,max:600,step:10,value:u,valueUnit:"px",onChange:o=>{e("radiusY",o),n()}}),i.jsx(x,{title:"Radius",min:50,max:600,step:10,value:l,valueUnit:"px",onChange:o=>{e("radius",o),n()}}),i.jsx(x,{title:"Rotation",min:-180,max:180,step:1,value:d,valueUnit:"°",onChange:o=>{e("rotation",o),n()}}),i.jsx(x,{title:"Duration",min:5,max:120,step:5,value:f,valueUnit:"s",onChange:o=>{e("duration",o),n()}}),i.jsx(x,{title:"Item Size",min:20,max:120,step:4,value:R,valueUnit:"px",onChange:o=>{e("itemSize",o),n()}}),i.jsx(W,{title:"Fill (Distribute Evenly)",isChecked:M,onChange:o=>{e("fill",o),n()}}),i.jsx(W,{title:"Show Path",isChecked:y,onChange:o=>{e("showPath",o),n()}}),i.jsx(W,{title:"Paused",isChecked:C,onChange:o=>{e("paused",o),n()}})]}),i.jsx(G,{data:X}),i.jsx(tn,{dependencyList:["motion"]})]}),i.jsx(J,{children:i.jsx(Q,{codeObject:wn,componentName:"OrbitImages"})})]})})};export{qn as default};
