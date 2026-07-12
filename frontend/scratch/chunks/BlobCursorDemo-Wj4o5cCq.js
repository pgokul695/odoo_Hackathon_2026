import{r as h,N as X,j as t,B as Y,O as N}from"./index-TQprzHkU.js";import{u as P,C as $,T as G,P as A,a as V,b as H,c as _}from"./useComponentProps-CjYSqekE.js";import{D as q}from"./Dependencies-IIL9riMN.js";import{C as U}from"./Customize-BdikCFm5.js";import{P as i}from"./PreviewSlider-CCbi2och.js";import{P as W}from"./PreviewSelect-DZgUm0jD.js";import{P as B}from"./PreviewColorPickerCustom-BFsDkSOr.js";import"./index-DQmtNYX5.js";import"./CodeHighlighter-Dx4QNbvH.js";import"./rotate-ccw-_xDu3G0k.js";/* empty css                       */const Z=`'use client';

import { useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import './BlobCursor.css';

export default function BlobCursor({
  blobType = 'circle',
  fillColor = '#5227FF',
  trailCount = 3,
  sizes = [60, 125, 75],
  innerSizes = [20, 35, 25],
  innerColor = 'rgba(255,255,255,0.8)',
  opacities = [0.6, 0.6, 0.6],
  shadowColor = 'rgba(0,0,0,0.75)',
  shadowBlur = 5,
  shadowOffsetX = 10,
  shadowOffsetY = 10,
  filterId = 'blob',
  filterStdDeviation = 30,
  filterColorMatrixValues = '1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 35 -10',
  useFilter = true,
  fastDuration = 0.1,
  slowDuration = 0.5,
  fastEase = 'power3.out',
  slowEase = 'power1.out',
  zIndex = 100
}) {
  const containerRef = useRef(null);
  const blobsRef = useRef([]);

  const updateOffset = useCallback(() => {
    if (!containerRef.current) return { left: 0, top: 0 };
    const rect = containerRef.current.getBoundingClientRect();
    return { left: rect.left, top: rect.top };
  }, []);

  const handleMove = useCallback(
    e => {
      const { left, top } = updateOffset();
      const x = 'clientX' in e ? e.clientX : e.touches[0].clientX;
      const y = 'clientY' in e ? e.clientY : e.touches[0].clientY;

      blobsRef.current.forEach((el, i) => {
        if (!el) return;
        const isLead = i === 0;
        gsap.to(el, {
          x: x - left,
          y: y - top,
          duration: isLead ? fastDuration : slowDuration,
          ease: isLead ? fastEase : slowEase
        });
      });
    },
    [updateOffset, fastDuration, slowDuration, fastEase, slowEase]
  );

  useEffect(() => {
    const onResize = () => updateOffset();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [updateOffset]);

  return (
    <div
      ref={containerRef}
      className="blob-container"
      style={{ zIndex }}
      onMouseMove={handleMove}
      onTouchMove={handleMove}
    >
      {useFilter && (
        <svg style={{ position: 'absolute', width: 0, height: 0 }}>
          <filter id={filterId}>
            <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation={filterStdDeviation} />
            <feColorMatrix in="blur" values={filterColorMatrixValues} />
          </filter>
        </svg>
      )}

      <div className="blob-main" style={{ filter: useFilter ? \`url(#\${filterId})\` : undefined }}>
        {Array.from({ length: trailCount }).map((_, i) => (
          <div
            key={i}
            ref={el => {
              blobsRef.current[i] = el;
            }}
            className="blob"
            style={{
              width: sizes[i],
              height: sizes[i],
              borderRadius: blobType === 'circle' ? '50%' : '0%',
              backgroundColor: fillColor,
              opacity: opacities[i],
              boxShadow: \`\${shadowOffsetX}px \${shadowOffsetY}px \${shadowBlur}px 0 \${shadowColor}\`
            }}
          >
            <div
              className="inner-dot"
              style={{
                width: innerSizes[i],
                height: innerSizes[i],
                top: (sizes[i] - innerSizes[i]) / 2,
                left: (sizes[i] - innerSizes[i]) / 2,
                backgroundColor: innerColor,
                borderRadius: blobType === 'circle' ? '50%' : '0%'
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
`,J=`.blob-container {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.blob-main {
  pointer-events: none;
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: transparent;
  user-select: none;
  cursor: default;
}

.blob {
  position: absolute;
  will-change: transform;
  transform: translate(-50%, -50%);
}

.inner-dot {
  position: absolute;
}
`,K=`'use client';

import { useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';

export default function BlobCursor({
  blobType = 'circle',
  fillColor = '#5227FF',
  trailCount = 3,
  sizes = [60, 125, 75],
  innerSizes = [20, 35, 25],
  innerColor = 'rgba(255,255,255,0.8)',
  opacities = [0.6, 0.6, 0.6],
  shadowColor = 'rgba(0,0,0,0.75)',
  shadowBlur = 5,
  shadowOffsetX = 10,
  shadowOffsetY = 10,
  filterId = 'blob',
  filterStdDeviation = 30,
  filterColorMatrixValues = '1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 35 -10',
  useFilter = true,
  fastDuration = 0.1,
  slowDuration = 0.5,
  fastEase = 'power3.out',
  slowEase = 'power1.out',
  zIndex = 100
}) {
  const containerRef = useRef(null);
  const blobsRef = useRef([]);

  const updateOffset = useCallback(() => {
    if (!containerRef.current) return { left: 0, top: 0 };
    const rect = containerRef.current.getBoundingClientRect();
    return { left: rect.left, top: rect.top };
  }, []);

  const handleMove = useCallback(
    e => {
      const { left, top } = updateOffset();
      const x = 'clientX' in e ? e.clientX : e.touches[0].clientX;
      const y = 'clientY' in e ? e.clientY : e.touches[0].clientY;

      blobsRef.current.forEach((el, i) => {
        if (!el) return;
        const isLead = i === 0;
        gsap.to(el, {
          x: x - left,
          y: y - top,
          duration: isLead ? fastDuration : slowDuration,
          ease: isLead ? fastEase : slowEase
        });
      });
    },
    [updateOffset, fastDuration, slowDuration, fastEase, slowEase]
  );

  useEffect(() => {
    const onResize = () => updateOffset();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [updateOffset]);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMove}
      onTouchMove={handleMove}
      className="relative top-0 left-0 w-full h-full"
      style={{ zIndex }}
    >
      {useFilter && (
        <svg className="absolute w-0 h-0">
          <filter id={filterId}>
            <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation={filterStdDeviation} />
            <feColorMatrix in="blur" values={filterColorMatrixValues} />
          </filter>
        </svg>
      )}

      <div
        className="pointer-events-none absolute inset-0 overflow-hidden select-none cursor-default"
        style={{ filter: useFilter ? \`url(#\${filterId})\` : undefined }}
      >
        {Array.from({ length: trailCount }).map((_, i) => (
          <div
            key={i}
            ref={el => {
              blobsRef.current[i] = el;
            }}
            className="absolute will-change-transform transform -translate-x-1/2 -translate-y-1/2"
            style={{
              width: sizes[i],
              height: sizes[i],
              borderRadius: blobType === 'circle' ? '50%' : '0',
              backgroundColor: fillColor,
              opacity: opacities[i],
              boxShadow: \`\${shadowOffsetX}px \${shadowOffsetY}px \${shadowBlur}px 0 \${shadowColor}\`
            }}
          >
            <div
              className="absolute"
              style={{
                width: innerSizes[i],
                height: innerSizes[i],
                top: (sizes[i] - innerSizes[i]) / 2,
                left: (sizes[i] - innerSizes[i]) / 2,
                backgroundColor: innerColor,
                borderRadius: blobType === 'circle' ? '50%' : '0'
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
`,Q=`'use client';

import React, { useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import './BlobCursor.css';

export interface BlobCursorProps {
  blobType?: 'circle' | 'square';
  fillColor?: string;
  trailCount?: number;
  sizes?: number[];
  innerSizes?: number[];
  innerColor?: string;
  opacities?: number[];
  shadowColor?: string;
  shadowBlur?: number;
  shadowOffsetX?: number;
  shadowOffsetY?: number;
  filterId?: string;
  filterStdDeviation?: number;
  filterColorMatrixValues?: string;
  useFilter?: boolean;
  fastDuration?: number;
  slowDuration?: number;
  fastEase?: string;
  slowEase?: string;
  zIndex?: number;
}

export default function BlobCursor({
  blobType = 'circle',
  fillColor = '#5227FF',
  trailCount = 3,
  sizes = [60, 125, 75],
  innerSizes = [20, 35, 25],
  innerColor = 'rgba(255,255,255,0.8)',
  opacities = [0.6, 0.6, 0.6],
  shadowColor = 'rgba(0,0,0,0.75)',
  shadowBlur = 5,
  shadowOffsetX = 10,
  shadowOffsetY = 10,
  filterId = 'blob',
  filterStdDeviation = 30,
  filterColorMatrixValues = '1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 35 -10',
  useFilter = true,
  fastDuration = 0.1,
  slowDuration = 0.5,
  fastEase = 'power3.out',
  slowEase = 'power1.out',
  zIndex = 100
}: BlobCursorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const blobsRef = useRef<(HTMLDivElement | null)[]>([]);

  const updateOffset = useCallback(() => {
    if (!containerRef.current) return { left: 0, top: 0 };
    const rect = containerRef.current.getBoundingClientRect();
    return { left: rect.left, top: rect.top };
  }, []);

  const handleMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
      const { left, top } = updateOffset();
      const x = 'clientX' in e ? e.clientX : e.touches[0].clientX;
      const y = 'clientY' in e ? e.clientY : e.touches[0].clientY;

      blobsRef.current.forEach((el, i) => {
        if (!el) return;
        const isLead = i === 0;
        gsap.to(el, {
          x: x - left,
          y: y - top,
          duration: isLead ? fastDuration : slowDuration,
          ease: isLead ? fastEase : slowEase
        });
      });
    },
    [updateOffset, fastDuration, slowDuration, fastEase, slowEase]
  );

  useEffect(() => {
    const onResize = () => updateOffset();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [updateOffset]);

  return (
    <div
      ref={containerRef}
      className="blob-container"
      style={{ zIndex }}
      onMouseMove={handleMove}
      onTouchMove={handleMove}
    >
      {useFilter && (
        <svg style={{ position: 'absolute', width: 0, height: 0 }}>
          <filter id={filterId}>
            <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation={filterStdDeviation} />
            <feColorMatrix in="blur" values={filterColorMatrixValues} />
          </filter>
        </svg>
      )}

      <div className="blob-main" style={{ filter: useFilter ? \`url(#\${filterId})\` : undefined }}>
        {Array.from({ length: trailCount }).map((_, i) => (
          <div
            key={i}
            ref={el => {
              blobsRef.current[i] = el;
            }}
            className="blob"
            style={{
              width: sizes[i],
              height: sizes[i],
              borderRadius: blobType === 'circle' ? '50%' : '0%',
              backgroundColor: fillColor,
              opacity: opacities[i],
              boxShadow: \`\${shadowOffsetX}px \${shadowOffsetY}px \${shadowBlur}px 0 \${shadowColor}\`
            }}
          >
            <div
              className="inner-dot"
              style={{
                width: innerSizes[i],
                height: innerSizes[i],
                top: (sizes[i] - innerSizes[i]) / 2,
                left: (sizes[i] - innerSizes[i]) / 2,
                backgroundColor: innerColor,
                borderRadius: blobType === 'circle' ? '50%' : '0%'
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
`,ee=`'use client';

import React, { useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';

export interface BlobCursorProps {
  blobType?: 'circle' | 'square';
  fillColor?: string;
  trailCount?: number;
  sizes?: number[];
  innerSizes?: number[];
  innerColor?: string;
  opacities?: number[];
  shadowColor?: string;
  shadowBlur?: number;
  shadowOffsetX?: number;
  shadowOffsetY?: number;
  filterId?: string;
  filterStdDeviation?: number;
  filterColorMatrixValues?: string;
  useFilter?: boolean;
  fastDuration?: number;
  slowDuration?: number;
  fastEase?: string;
  slowEase?: string;
  zIndex?: number;
}

export default function BlobCursor({
  blobType = 'circle',
  fillColor = '#5227FF',
  trailCount = 3,
  sizes = [60, 125, 75],
  innerSizes = [20, 35, 25],
  innerColor = 'rgba(255,255,255,0.8)',
  opacities = [0.6, 0.6, 0.6],
  shadowColor = 'rgba(0,0,0,0.75)',
  shadowBlur = 5,
  shadowOffsetX = 10,
  shadowOffsetY = 10,
  filterId = 'blob',
  filterStdDeviation = 30,
  filterColorMatrixValues = '1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 35 -10',
  useFilter = true,
  fastDuration = 0.1,
  slowDuration = 0.5,
  fastEase = 'power3.out',
  slowEase = 'power1.out',
  zIndex = 100
}: BlobCursorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const blobsRef = useRef<(HTMLDivElement | null)[]>([]);

  const updateOffset = useCallback(() => {
    if (!containerRef.current) return { left: 0, top: 0 };
    const rect = containerRef.current.getBoundingClientRect();
    return { left: rect.left, top: rect.top };
  }, []);

  const handleMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
      const { left, top } = updateOffset();
      const x = 'clientX' in e ? e.clientX : e.touches[0].clientX;
      const y = 'clientY' in e ? e.clientY : e.touches[0].clientY;

      blobsRef.current.forEach((el, i) => {
        if (!el) return;
        const isLead = i === 0;
        gsap.to(el, {
          x: x - left,
          y: y - top,
          duration: isLead ? fastDuration : slowDuration,
          ease: isLead ? fastEase : slowEase
        });
      });
    },
    [updateOffset, fastDuration, slowDuration, fastEase, slowEase]
  );

  useEffect(() => {
    const onResize = () => updateOffset();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [updateOffset]);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMove}
      onTouchMove={handleMove}
      className="relative top-0 left-0 w-full h-full"
      style={{ zIndex }}
    >
      {useFilter && (
        <svg className="absolute w-0 h-0">
          <filter id={filterId}>
            <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation={filterStdDeviation} />
            <feColorMatrix in="blur" values={filterColorMatrixValues} />
          </filter>
        </svg>
      )}

      <div
        className="pointer-events-none absolute inset-0 overflow-hidden select-none cursor-default"
        style={{ filter: useFilter ? \`url(#\${filterId})\` : undefined }}
      >
        {Array.from({ length: trailCount }).map((_, i) => (
          <div
            key={i}
            ref={el => {
              blobsRef.current[i] = el;
            }}
            className="absolute will-change-transform transform -translate-x-1/2 -translate-y-1/2"
            style={{
              width: sizes[i],
              height: sizes[i],
              borderRadius: blobType === 'circle' ? '50%' : '0',
              backgroundColor: fillColor,
              opacity: opacities[i],
              boxShadow: \`\${shadowOffsetX}px \${shadowOffsetY}px \${shadowBlur}px 0 \${shadowColor}\`
            }}
          >
            <div
              className="absolute"
              style={{
                width: innerSizes[i],
                height: innerSizes[i],
                top: (sizes[i] - innerSizes[i]) / 2,
                left: (sizes[i] - innerSizes[i]) / 2,
                backgroundColor: innerColor,
                borderRadius: blobType === 'circle' ? '50%' : '0'
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
`,te={dependencies:"gsap",usage:`import BlobCursor from './BlobCursor';

<BlobCursor
  blobType="circle"
  fillColor="#5227FF"
  trailCount={3}
  sizes={[60, 125, 75]}
  innerSizes={[20, 35, 25]}
  innerColor="rgba(255,255,255,0.8)"
  opacities={[0.6, 0.6, 0.6]}
  shadowColor="rgba(0,0,0,0.75)"
  shadowBlur={5}
  shadowOffsetX={10}
  shadowOffsetY={10}
  filterStdDeviation={30}
  useFilter={true}
  fastDuration={0.1}
  slowDuration={0.5}
  zIndex={100}
/>`,code:Z,css:J,tailwind:K,tsCode:Q,tsTailwind:ee};function oe({blobType:m="circle",fillColor:r="#5227FF",trailCount:O=3,sizes:d=[60,125,75],innerSizes:f=[20,35,25],innerColor:z="rgba(255,255,255,0.8)",opacities:c=[.6,.6,.6],shadowColor:n="rgba(0,0,0,0.75)",shadowBlur:l=5,shadowOffsetX:R=10,shadowOffsetY:a=10,filterId:w="blob",filterStdDeviation:S=30,filterColorMatrixValues:D="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 35 -10",useFilter:C=!0,fastDuration:v=.1,slowDuration:x=.5,fastEase:g="power3.out",slowEase:E="power1.out",zIndex:y=100}){const e=h.useRef(null),p=h.useRef([]),u=h.useCallback(()=>{if(!e.current)return{left:0,top:0};const o=e.current.getBoundingClientRect();return{left:o.left,top:o.top}},[]),b=h.useCallback(o=>{const{left:s,top:M}=u(),F="clientX"in o?o.clientX:o.touches[0].clientX,I="clientY"in o?o.clientY:o.touches[0].clientY;p.current.forEach((T,k)=>{if(!T)return;const L=k===0;X.to(T,{x:F-s,y:I-M,duration:L?v:x,ease:L?g:E})})},[u,v,x,g,E]);return h.useEffect(()=>{const o=()=>u();return window.addEventListener("resize",o),()=>window.removeEventListener("resize",o)},[u]),t.jsxs("div",{ref:e,onMouseMove:b,onTouchMove:b,className:"relative top-0 left-0 w-full h-full",style:{zIndex:y},children:[C&&t.jsx("svg",{className:"absolute w-0 h-0",children:t.jsxs("filter",{id:w,children:[t.jsx("feGaussianBlur",{in:"SourceGraphic",result:"blur",stdDeviation:S}),t.jsx("feColorMatrix",{in:"blur",values:D})]})}),t.jsx("div",{className:"pointer-events-none absolute inset-0 overflow-hidden select-none cursor-default",style:{filter:C?`url(#${w})`:void 0},children:Array.from({length:O}).map((o,s)=>t.jsx("div",{ref:M=>{p.current[s]=M},className:"absolute will-change-transform transform -translate-x-1/2 -translate-y-1/2",style:{width:d[s],height:d[s],borderRadius:m==="circle"?"50%":"0",backgroundColor:r,opacity:c[s],boxShadow:`${R}px ${a}px ${l}px 0 ${n}`},children:t.jsx("div",{className:"absolute",style:{width:f[s],height:f[s],top:(d[s]-f[s])/2,left:(d[s]-f[s])/2,backgroundColor:z,borderRadius:m==="circle"?"50%":"0"}})},s))})]})}const j={blobType:"circle",fillColor:"#5227FF",trailCount:3,sizes:[60,125,75],innerSizes:[20,35,25],innerColor:"rgba(255,255,255,0.8)",opacities:[.6,.6,.6],shadowColor:"rgba(0,0,0,0.75)",shadowBlur:5,shadowOffsetX:10,shadowOffsetY:10,fastDuration:.1,slowDuration:.5,zIndex:100},be=()=>{const{props:m,updateProp:r,resetProps:O,hasChanges:d}=P(j),{blobType:f,fillColor:z,trailCount:c,sizes:n,innerSizes:l,innerColor:R,opacities:a,shadowColor:w,shadowBlur:S,shadowOffsetX:D,shadowOffsetY:C,fastDuration:v,slowDuration:x,zIndex:g}=m,E=h.useMemo(()=>[{name:"blobType",type:"'circle' | 'square'",default:"'circle'",description:"Shape of the blobs."},{name:"fillColor",type:"string",default:"'#5227FF'",description:"Background color of each blob."},{name:"trailCount",type:"number",default:"3",description:"How many trailing blobs."},{name:"sizes",type:"number[]",default:"[60, 125, 75]",description:"Sizes (px) of each blob. Length must be ≥ trailCount."},{name:"innerSizes",type:"number[]",default:"[20, 35, 25]",description:"Sizes (px) of inner dots. Length must be ≥ trailCount."},{name:"innerColor",type:"string",default:"'rgba(255,255,255,0.8)'",description:"Background color of the inner dot."},{name:"opacities",type:"number[]",default:"[0.6, 0.6, 0.6]",description:"Opacity of each blob. Length ≥ trailCount."},{name:"shadowColor",type:"string",default:"'rgba(0,0,0,0.75)'",description:"Box-shadow color."},{name:"shadowBlur",type:"number",default:"5",description:"Box-shadow blur radius (px)."},{name:"shadowOffsetX",type:"number",default:"10",description:"Box-shadow X offset (px)."},{name:"shadowOffsetY",type:"number",default:"10",description:"Box-shadow Y offset (px)."},{name:"filterId",type:"string",default:"'blob'",description:"Optional custom filter ID (for multiple instances)."},{name:"filterStdDeviation",type:"number",default:"30",description:"feGaussianBlur stdDeviation for SVG filter."},{name:"filterColorMatrixValues",type:"string",default:"'1 0 0 ...'",description:"feColorMatrix values for SVG filter."},{name:"useFilter",type:"boolean",default:"true",description:"Enable the SVG filter."},{name:"fastDuration",type:"number",default:"0.1",description:"GSAP duration for the lead blob."},{name:"slowDuration",type:"number",default:"0.5",description:"GSAP duration for the following blobs."},{name:"fastEase",type:"string",default:"'power3.out'",description:"GSAP ease for the lead blob."},{name:"slowEase",type:"string",default:"'power1.out'",description:"GSAP ease for the following blobs."},{name:"zIndex",type:"number",default:"100",description:"CSS z-index of the whole component."}],[]),y=(e,p,u,b)=>{const o=[...b];o[p]=e,r(u,o)};return t.jsx($,{props:m,defaultProps:j,resetProps:O,hasChanges:d,children:t.jsxs(G,{children:[t.jsxs(A,{children:[t.jsx(Y,{height:600,position:"relative",className:"demo-container",overflow:"hidden",children:t.jsx(oe,{blobType:f,fillColor:z,trailCount:c,sizes:n,innerSizes:l,innerColor:R,opacities:a,shadowColor:w,shadowBlur:S,shadowOffsetX:D,shadowOffsetY:C,fastDuration:v,slowDuration:x,zIndex:g})}),t.jsxs(U,{children:[t.jsx(B,{title:"Fill Color",color:z,onChange:e=>r("fillColor",e)}),t.jsx(B,{title:"Inner Color",color:R,onChange:e=>r("innerColor",e)}),t.jsx(B,{title:"Shadow Color",color:w,onChange:e=>r("shadowColor",e)}),t.jsx(W,{title:"Blob Type",options:[{value:"circle",label:"Circle"},{value:"square",label:"Square"}],value:f,onChange:e=>r("blobType",e)}),t.jsx(i,{title:"Trail Count",min:1,max:5,step:1,value:c,onChange:e=>{r("trailCount",e);const p=Array(e).fill(0).map((o,s)=>n[s]||n[n.length-1]||60),u=Array(e).fill(0).map((o,s)=>l[s]||l[l.length-1]||20),b=Array(e).fill(0).map((o,s)=>a[s]||a[a.length-1]||.6);r("sizes",p),r("innerSizes",u),r("opacities",b)}}),t.jsx(i,{title:"Lead Blob Size",min:10,max:200,step:1,value:n[0],onChange:e=>y(e,0,"sizes",n),isDisabled:c<1}),t.jsx(i,{title:"Lead Inner Dot Size",min:1,max:100,step:1,value:l[0],onChange:e=>y(e,0,"innerSizes",l),isDisabled:c<1}),t.jsx(i,{title:"Lead Blob Opacity",min:.1,max:1,step:.05,value:a[0],onChange:e=>y(e,0,"opacities",a),isDisabled:c<1}),t.jsx(i,{title:"Shadow Blur",min:0,max:50,step:1,value:S,onChange:e=>r("shadowBlur",e)}),t.jsx(i,{title:"Shadow Offset X",min:-50,max:50,step:1,value:D,onChange:e=>r("shadowOffsetX",e)}),t.jsx(i,{title:"Shadow Offset Y",min:-50,max:50,step:1,value:C,onChange:e=>r("shadowOffsetY",e)}),t.jsx(i,{title:"Fast Duration (Lead)",min:.01,max:2,step:.01,value:v,onChange:e=>r("fastDuration",e)}),t.jsx(i,{title:"Slow Duration (Trail)",min:.01,max:3,step:.01,value:x,onChange:e=>r("slowDuration",e)}),t.jsx(i,{title:"Z-Index",min:0,max:1e3,step:10,value:g,onChange:e=>r("zIndex",e)})]}),t.jsxs("p",{className:"demo-extra-info",style:{marginTop:"20px"},children:[t.jsx(N,{position:"relative",top:"-1px",mr:"2"})," SVG filters are not fully supported on Safari. Performance may vary."]}),t.jsx(V,{data:E}),t.jsx(q,{dependencyList:["gsap"]})]}),t.jsx(H,{children:t.jsx(_,{codeObject:te,componentName:"BlobCursor"})})]})})};export{be as default};
