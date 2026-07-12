import{r as d,j as e,N as V,B as E,T as X}from"./index-TQprzHkU.js";import{u as j,C as q,T as A,P as L,a as N,b as O,c as H}from"./useComponentProps-CjYSqekE.js";import{C as P}from"./Customize-BdikCFm5.js";import{P as u}from"./PreviewSlider-CCbi2och.js";import{D as W}from"./Dependencies-IIL9riMN.js";import{u as I}from"./useForceRerender-Dq8YDj2j.js";import"./index-DQmtNYX5.js";import"./CodeHighlighter-Dx4QNbvH.js";import"./rotate-ccw-_xDu3G0k.js";/* empty css                       */const $=({width:v=300,height:c=400,image:R="https://picsum.photos/300/400?grayscale",baseFrequency:M=.015,numOctaves:x=5,seed:w=4,maxDisplacement:f=400,movementBound:r=50,children:y})=>{const l=d.useRef(null),g=d.useRef(null),a=d.useRef({x:window.innerWidth/2,y:window.innerHeight/2}),m=d.useRef({...a.current}),h=d.useRef({width:window.innerWidth,height:window.innerHeight});return d.useEffect(()=>{const t=(n,s,o)=>(1-o)*n+o*s,b=(n,s,o,p,T)=>(n-s)*(T-p)/(o-s)+p,Y=(n,s,o,p)=>{const T=n-s,S=o-p;return Math.hypot(T,S)},z=()=>{h.current={width:window.innerWidth,height:window.innerHeight}},C=n=>{a.current={x:n.clientX,y:n.clientY}};window.addEventListener("resize",z),window.addEventListener("mousemove",C);const i={imgTransforms:{x:0,y:0,rz:0},displacementScale:0},B=()=>{let n=t(i.imgTransforms.x,b(a.current.x,0,h.current.width,-120,120),.1),s=t(i.imgTransforms.y,b(a.current.y,0,h.current.height,-120,120),.1),o=t(i.imgTransforms.rz,b(a.current.x,0,h.current.width,-10,10),.1);n>r&&(n=r+(n-r)*.2),n<-r&&(n=-r+(n+r)*.2),s>r&&(s=r+(s-r)*.2),s<-r&&(s=-r+(s+r)*.2),i.imgTransforms.x=n,i.imgTransforms.y=s,i.imgTransforms.rz=o,l.current&&V.set(l.current,{x:i.imgTransforms.x,y:i.imgTransforms.y,rotateZ:i.imgTransforms.rz});const p=Y(m.current.x,a.current.x,m.current.y,a.current.y);i.displacementScale=t(i.displacementScale,b(p,0,200,0,f),.06),g.current&&V.set(g.current,{attr:{scale:i.displacementScale}}),m.current={...a.current},D=requestAnimationFrame(B)};let D=requestAnimationFrame(B);return()=>{cancelAnimationFrame(D),window.removeEventListener("resize",z),window.removeEventListener("mousemove",C)}},[f,r]),e.jsxs("div",{className:"content",style:{width:`${v}px`,height:`${c}px`},ref:l,children:[e.jsxs("svg",{viewBox:"-60 -75 720 900",preserveAspectRatio:"xMidYMid slice",className:"svg",children:[e.jsxs("filter",{id:"imgFilter",children:[e.jsx("feTurbulence",{type:"turbulence",baseFrequency:M,numOctaves:x,seed:w,stitchTiles:"stitch",x:"0%",y:"0%",width:"100%",height:"100%",result:"turbulence1"}),e.jsx("feDisplacementMap",{ref:g,in:"SourceGraphic",in2:"turbulence1",scale:"0",xChannelSelector:"R",yChannelSelector:"B",x:"0%",y:"0%",width:"100%",height:"100%",result:"displacementMap3"})]}),e.jsx("g",{children:e.jsx("image",{href:R,x:"0",y:"0",width:"600",height:"750",filter:"url(#imgFilter)",preserveAspectRatio:"xMidYMid slice"})})]}),e.jsx("div",{className:"card-text",children:y})]})},k=`import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

import './DecayCard.css';

const DecayCard = ({
  width = 300,
  height = 400,
  image = 'https://picsum.photos/300/400?grayscale',
  baseFrequency = 0.015,
  numOctaves = 5,
  seed = 4,
  maxDisplacement = 400,
  movementBound = 50,
  children
}) => {
  const svgRef = useRef(null);
  const displacementMapRef = useRef(null);
  const cursor = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const cachedCursor = useRef({ ...cursor.current });
  const winsize = useRef({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const lerp = (a, b, n) => (1 - n) * a + n * b;

    const map = (x, a, b, c, d) => ((x - a) * (d - c)) / (b - a) + c;

    const distance = (x1, x2, y1, y2) => {
      const a = x1 - x2;
      const b = y1 - y2;
      return Math.hypot(a, b);
    };

    const handleResize = () => {
      winsize.current = { width: window.innerWidth, height: window.innerHeight };
    };

    const handleMouseMove = ev => {
      cursor.current = { x: ev.clientX, y: ev.clientY };
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    const imgValues = {
      imgTransforms: { x: 0, y: 0, rz: 0 },
      displacementScale: 0
    };

    const render = () => {
      let targetX = lerp(imgValues.imgTransforms.x, map(cursor.current.x, 0, winsize.current.width, -120, 120), 0.1);
      let targetY = lerp(imgValues.imgTransforms.y, map(cursor.current.y, 0, winsize.current.height, -120, 120), 0.1);
      let targetRz = lerp(imgValues.imgTransforms.rz, map(cursor.current.x, 0, winsize.current.width, -10, 10), 0.1);

      if (targetX > movementBound) targetX = movementBound + (targetX - movementBound) * 0.2;
      if (targetX < -movementBound) targetX = -movementBound + (targetX + movementBound) * 0.2;
      if (targetY > movementBound) targetY = movementBound + (targetY - movementBound) * 0.2;
      if (targetY < -movementBound) targetY = -movementBound + (targetY + movementBound) * 0.2;

      imgValues.imgTransforms.x = targetX;
      imgValues.imgTransforms.y = targetY;
      imgValues.imgTransforms.rz = targetRz;

      if (svgRef.current) {
        gsap.set(svgRef.current, {
          x: imgValues.imgTransforms.x,
          y: imgValues.imgTransforms.y,
          rotateZ: imgValues.imgTransforms.rz
        });
      }

      const cursorTravelledDistance = distance(
        cachedCursor.current.x,
        cursor.current.x,
        cachedCursor.current.y,
        cursor.current.y
      );
      imgValues.displacementScale = lerp(
        imgValues.displacementScale,
        map(cursorTravelledDistance, 0, 200, 0, maxDisplacement),
        0.06
      );

      if (displacementMapRef.current) {
        gsap.set(displacementMapRef.current, { attr: { scale: imgValues.displacementScale } });
      }

      cachedCursor.current = { ...cursor.current };

      rafId = requestAnimationFrame(render);
    };

    let rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [maxDisplacement, movementBound]);

  return (
    <div className="content" style={{ width: \`\${width}px\`, height: \`\${height}px\` }} ref={svgRef}>
      <svg viewBox="-60 -75 720 900" preserveAspectRatio="xMidYMid slice" className="svg">
        <filter id="imgFilter">
          <feTurbulence
            type="turbulence"
            baseFrequency={baseFrequency}
            numOctaves={numOctaves}
            seed={seed}
            stitchTiles="stitch"
            x="0%"
            y="0%"
            width="100%"
            height="100%"
            result="turbulence1"
          />
          <feDisplacementMap
            ref={displacementMapRef}
            in="SourceGraphic"
            in2="turbulence1"
            scale="0"
            xChannelSelector="R"
            yChannelSelector="B"
            x="0%"
            y="0%"
            width="100%"
            height="100%"
            result="displacementMap3"
          />
        </filter>
        <g>
          <image
            href={image}
            x="0"
            y="0"
            width="600"
            height="750"
            filter="url(#imgFilter)"
            preserveAspectRatio="xMidYMid slice"
          />
        </g>
      </svg>
      <div className="card-text">{children}</div>
    </div>
  );
};

export default DecayCard;
`,G=`.content {
  position: relative;
}

.svg {
  position: relative;
  width: 100%;
  height: 100%;
  display: block;
  will-change: transform;
}

.card-text {
  position: absolute;
  bottom: 1.2em;
  letter-spacing: -0.5px;
  font-weight: 900;
  left: 1em;
  font-size: 2.5rem;
  line-height: 1.5em;
}

.card-text::first-line {
  font-size: 4rem;
}
`,Z=`import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const DecayCard = ({
  width = 300,
  height = 400,
  image = 'https://picsum.photos/300/400?grayscale',
  baseFrequency = 0.015,
  numOctaves = 5,
  seed = 4,
  maxDisplacement = 400,
  movementBound = 50,
  children
}) => {
  const svgRef = useRef(null);
  const displacementMapRef = useRef(null);
  const cursor = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const cachedCursor = useRef({ ...cursor.current });
  const winsize = useRef({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const lerp = (a, b, n) => (1 - n) * a + n * b;
    const map = (x, a, b, c, d) => ((x - a) * (d - c)) / (b - a) + c;
    const distance = (x1, x2, y1, y2) => Math.hypot(x1 - x2, y1 - y2);

    const handleResize = () => {
      winsize.current = { width: window.innerWidth, height: window.innerHeight };
    };

    const handleMouseMove = ev => {
      cursor.current = { x: ev.clientX, y: ev.clientY };
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    const imgValues = {
      imgTransforms: { x: 0, y: 0, rz: 0 },
      displacementScale: 0
    };

    const render = () => {
      let targetX = lerp(imgValues.imgTransforms.x, map(cursor.current.x, 0, winsize.current.width, -120, 120), 0.1);
      let targetY = lerp(imgValues.imgTransforms.y, map(cursor.current.y, 0, winsize.current.height, -120, 120), 0.1);
      let targetRz = lerp(imgValues.imgTransforms.rz, map(cursor.current.x, 0, winsize.current.width, -10, 10), 0.1);

      if (targetX > movementBound) targetX = movementBound + (targetX - movementBound) * 0.2;
      if (targetX < -movementBound) targetX = -movementBound + (targetX + movementBound) * 0.2;
      if (targetY > movementBound) targetY = movementBound + (targetY - movementBound) * 0.2;
      if (targetY < -movementBound) targetY = -movementBound + (targetY + movementBound) * 0.2;

      imgValues.imgTransforms.x = targetX;
      imgValues.imgTransforms.y = targetY;
      imgValues.imgTransforms.rz = targetRz;

      if (svgRef.current) {
        gsap.set(svgRef.current, {
          x: imgValues.imgTransforms.x,
          y: imgValues.imgTransforms.y,
          rotateZ: imgValues.imgTransforms.rz
        });
      }

      const cursorTravelledDistance = distance(
        cachedCursor.current.x,
        cursor.current.x,
        cachedCursor.current.y,
        cursor.current.y
      );
      imgValues.displacementScale = lerp(
        imgValues.displacementScale,
        map(cursorTravelledDistance, 0, 200, 0, maxDisplacement),
        0.06
      );

      if (displacementMapRef.current) {
        gsap.set(displacementMapRef.current, { attr: { scale: imgValues.displacementScale } });
      }

      cachedCursor.current = { ...cursor.current };

      rafId = requestAnimationFrame(render);
    };

    let rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [maxDisplacement, movementBound]);

  return (
    <div ref={svgRef} className="relative" style={{ width: \`\${width}px\`, height: \`\${height}px\` }}>
      <svg
        viewBox="-60 -75 720 900"
        preserveAspectRatio="xMidYMid slice"
        className="relative w-full h-full block [will-change:transform]"
      >
        <filter id="imgFilter">
          <feTurbulence
            type="turbulence"
            baseFrequency={baseFrequency}
            numOctaves={numOctaves}
            seed={seed}
            stitchTiles="stitch"
            x="0%"
            y="0%"
            width="100%"
            height="100%"
            result="turbulence1"
          />
          <feDisplacementMap
            ref={displacementMapRef}
            in="SourceGraphic"
            in2="turbulence1"
            scale="0"
            xChannelSelector="R"
            yChannelSelector="B"
            x="0%"
            y="0%"
            width="100%"
            height="100%"
            result="displacementMap3"
          />
        </filter>
        <g>
          <image
            href={image}
            x="0"
            y="0"
            width="600"
            height="750"
            filter="url(#imgFilter)"
            preserveAspectRatio="xMidYMid slice"
          />
        </g>
      </svg>
      <div className="absolute bottom-[1.2em] left-[1em] tracking-[-0.5px] font-black text-[2.5rem] leading-[1.5em] first-line:text-[6rem]">
        {children}
      </div>
    </div>
  );
};

export default DecayCard;
`,J=`import React, { useEffect, useRef, ReactNode } from 'react';
import { gsap } from 'gsap';
import './DecayCard.css';

interface DecayCardProps {
  width?: number;
  height?: number;
  image?: string;
  baseFrequency?: number;
  numOctaves?: number;
  seed?: number;
  maxDisplacement?: number;
  movementBound?: number;
  children?: ReactNode;
}

const DecayCard: React.FC<DecayCardProps> = ({
  width = 300,
  height = 400,
  image = 'https://picsum.photos/300/400?grayscale',
  baseFrequency = 0.015,
  numOctaves = 5,
  seed = 4,
  maxDisplacement = 400,
  movementBound = 50,
  children
}) => {
  const svgRef = useRef<HTMLDivElement>(null);
  const displacementMapRef = useRef<SVGFEDisplacementMapElement>(null);
  const cursor = useRef<{ x: number; y: number }>({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
  });
  const cachedCursor = useRef<{ x: number; y: number }>({ ...cursor.current });
  const winsize = useRef<{ width: number; height: number }>({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const lerp = (a: number, b: number, n: number): number => (1 - n) * a + n * b;

    const map = (x: number, a: number, b: number, c: number, d: number): number => ((x - a) * (d - c)) / (b - a) + c;

    const distance = (x1: number, x2: number, y1: number, y2: number): number => {
      const a = x1 - x2;
      const b = y1 - y2;
      return Math.hypot(a, b);
    };

    const handleResize = (): void => {
      winsize.current = {
        width: window.innerWidth,
        height: window.innerHeight
      };
    };

    const handleMouseMove = (ev: MouseEvent): void => {
      cursor.current = { x: ev.clientX, y: ev.clientY };
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    const imgValues = {
      imgTransforms: { x: 0, y: 0, rz: 0 },
      displacementScale: 0
    };

    const render = () => {
      let targetX = lerp(imgValues.imgTransforms.x, map(cursor.current.x, 0, winsize.current.width, -120, 120), 0.1);
      let targetY = lerp(imgValues.imgTransforms.y, map(cursor.current.y, 0, winsize.current.height, -120, 120), 0.1);
      let targetRz = lerp(imgValues.imgTransforms.rz, map(cursor.current.x, 0, winsize.current.width, -10, 10), 0.1);

      if (targetX > movementBound) targetX = movementBound + (targetX - movementBound) * 0.2;
      if (targetX < -movementBound) targetX = -movementBound + (targetX + movementBound) * 0.2;
      if (targetY > movementBound) targetY = movementBound + (targetY - movementBound) * 0.2;
      if (targetY < -movementBound) targetY = -movementBound + (targetY + movementBound) * 0.2;

      imgValues.imgTransforms.x = targetX;
      imgValues.imgTransforms.y = targetY;
      imgValues.imgTransforms.rz = targetRz;

      if (svgRef.current) {
        gsap.set(svgRef.current, {
          x: imgValues.imgTransforms.x,
          y: imgValues.imgTransforms.y,
          rotateZ: imgValues.imgTransforms.rz
        });
      }

      const cursorTravelledDistance = distance(
        cachedCursor.current.x,
        cursor.current.x,
        cachedCursor.current.y,
        cursor.current.y
      );
      imgValues.displacementScale = lerp(
        imgValues.displacementScale,
        map(cursorTravelledDistance, 0, 200, 0, maxDisplacement),
        0.06
      );

      if (displacementMapRef.current) {
        gsap.set(displacementMapRef.current, {
          attr: { scale: imgValues.displacementScale }
        });
      }

      cachedCursor.current = { ...cursor.current };

      rafId = requestAnimationFrame(render);
    };

    let rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [maxDisplacement, movementBound]);

  return (
    <div className="content" style={{ width: \`\${width}px\`, height: \`\${height}px\` }} ref={svgRef}>
      <svg viewBox="-60 -75 720 900" preserveAspectRatio="xMidYMid slice" className="svg">
        <filter id="imgFilter">
          <feTurbulence
            type="turbulence"
            baseFrequency={baseFrequency}
            numOctaves={numOctaves}
            seed={seed}
            stitchTiles="stitch"
            x="0%"
            y="0%"
            width="100%"
            height="100%"
            result="turbulence1"
          />
          <feDisplacementMap
            ref={displacementMapRef}
            in="SourceGraphic"
            in2="turbulence1"
            scale="0"
            xChannelSelector="R"
            yChannelSelector="B"
            x="0%"
            y="0%"
            width="100%"
            height="100%"
            result="displacementMap3"
          />
        </filter>
        <g>
          <image
            href={image}
            x="0"
            y="0"
            width="600"
            height="750"
            filter="url(#imgFilter)"
            preserveAspectRatio="xMidYMid slice"
          />
        </g>
      </svg>
      <div className="card-text">{children}</div>
    </div>
  );
};

export default DecayCard;
`,U=`import React, { useEffect, useRef, ReactNode } from 'react';
import { gsap } from 'gsap';

interface DecayCardProps {
  width?: number;
  height?: number;
  image?: string;
  baseFrequency?: number;
  numOctaves?: number;
  seed?: number;
  maxDisplacement?: number;
  movementBound?: number;
  children?: ReactNode;
}

const DecayCard: React.FC<DecayCardProps> = ({
  width = 300,
  height = 400,
  image = 'https://picsum.photos/300/400?grayscale',
  baseFrequency = 0.015,
  numOctaves = 5,
  seed = 4,
  maxDisplacement = 400,
  movementBound = 50,
  children
}) => {
  const svgRef = useRef<HTMLDivElement | null>(null);
  const displacementMapRef = useRef<SVGFEDisplacementMapElement | null>(null);
  const cursor = useRef<{ x: number; y: number }>({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
  });
  const cachedCursor = useRef<{ x: number; y: number }>({ ...cursor.current });
  const winsize = useRef<{ width: number; height: number }>({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const lerp = (a: number, b: number, n: number): number => (1 - n) * a + n * b;
    const map = (x: number, a: number, b: number, c: number, d: number): number => ((x - a) * (d - c)) / (b - a) + c;
    const distance = (x1: number, x2: number, y1: number, y2: number): number => Math.hypot(x1 - x2, y1 - y2);

    const handleResize = (): void => {
      winsize.current = {
        width: window.innerWidth,
        height: window.innerHeight
      };
    };

    const handleMouseMove = (ev: MouseEvent): void => {
      cursor.current = { x: ev.clientX, y: ev.clientY };
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    const imgValues = {
      imgTransforms: { x: 0, y: 0, rz: 0 },
      displacementScale: 0
    };

    const render = () => {
      let targetX = lerp(imgValues.imgTransforms.x, map(cursor.current.x, 0, winsize.current.width, -120, 120), 0.1);
      let targetY = lerp(imgValues.imgTransforms.y, map(cursor.current.y, 0, winsize.current.height, -120, 120), 0.1);
      let targetRz = lerp(imgValues.imgTransforms.rz, map(cursor.current.x, 0, winsize.current.width, -10, 10), 0.1);

      if (targetX > movementBound) targetX = movementBound + (targetX - movementBound) * 0.2;
      if (targetX < -movementBound) targetX = -movementBound + (targetX + movementBound) * 0.2;
      if (targetY > movementBound) targetY = movementBound + (targetY - movementBound) * 0.2;
      if (targetY < -movementBound) targetY = -movementBound + (targetY + movementBound) * 0.2;

      imgValues.imgTransforms.x = targetX;
      imgValues.imgTransforms.y = targetY;
      imgValues.imgTransforms.rz = targetRz;

      if (svgRef.current) {
        gsap.set(svgRef.current, {
          x: imgValues.imgTransforms.x,
          y: imgValues.imgTransforms.y,
          rotateZ: imgValues.imgTransforms.rz
        });
      }

      const cursorTravelledDistance = distance(
        cachedCursor.current.x,
        cursor.current.x,
        cachedCursor.current.y,
        cursor.current.y
      );
      imgValues.displacementScale = lerp(
        imgValues.displacementScale,
        map(cursorTravelledDistance, 0, 200, 0, maxDisplacement),
        0.06
      );

      if (displacementMapRef.current) {
        gsap.set(displacementMapRef.current, {
          attr: { scale: imgValues.displacementScale }
        });
      }

      cachedCursor.current = { ...cursor.current };

      rafId = requestAnimationFrame(render);
    };

    let rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [maxDisplacement, movementBound]);

  return (
    <div ref={svgRef} className="relative" style={{ width: \`\${width}px\`, height: \`\${height}px\` }}>
      <svg
        viewBox="-60 -75 720 900"
        preserveAspectRatio="xMidYMid slice"
        className="relative w-full h-full block [will-change:transform]"
      >
        <filter id="imgFilter">
          <feTurbulence
            type="turbulence"
            baseFrequency={baseFrequency}
            numOctaves={numOctaves}
            seed={seed}
            stitchTiles="stitch"
            x="0%"
            y="0%"
            width="100%"
            height="100%"
            result="turbulence1"
          />
          <feDisplacementMap
            ref={displacementMapRef}
            in="SourceGraphic"
            in2="turbulence1"
            scale="0"
            xChannelSelector="R"
            yChannelSelector="B"
            x="0%"
            y="0%"
            width="100%"
            height="100%"
            result="displacementMap3"
          />
        </filter>
        <g>
          <image
            href={image}
            x="0"
            y="0"
            width="600"
            height="750"
            filter="url(#imgFilter)"
            preserveAspectRatio="xMidYMid slice"
          />
        </g>
      </svg>
      <div className="absolute bottom-[1.2em] left-[1em] tracking-[-0.5px] font-black text-[2.5rem] leading-[1.5em] first-line:text-[6rem]">
        {children}
      </div>
    </div>
  );
};

export default DecayCard;
`,_={dependencies:"gsap",usage:`import DecayCard from './DecayCard';

<DecayCard width={200} height={300} image="https://picsum.photos/300/400?grayscale">
  <h2>Decay<br/>Card</h2>
</DecayCard>`,code:k,css:G,tailwind:Z,tsCode:J,tsTailwind:U},F={width:300,height:400,baseFrequency:.015,numOctaves:5,seed:4,maxDisplacement:400,movementBound:50},me=()=>{const{props:v,updateProp:c,resetProps:R,hasChanges:M}=j(F),{width:x,height:w,baseFrequency:f,numOctaves:r,seed:y,maxDisplacement:l,movementBound:g}=v,[a,m]=I(),h=d.useMemo(()=>[{name:"children",type:"ReactNode",default:"",description:"The content (JSX) to be rendered inside the card."},{name:"width",type:"number",default:"300",description:"The width of the card in pixels."},{name:"height",type:"number",default:"400",description:"The height of the card in pixels."},{name:"image",type:"string",default:"",description:"Allows setting the background image of the card."},{name:"baseFrequency",type:"number",default:"0.015",description:"Base frequency for the turbulence filter. Lower values create larger, smoother patterns."},{name:"numOctaves",type:"number",default:"5",description:"Number of octaves for the turbulence filter. Higher values add finer detail."},{name:"seed",type:"number",default:"4",description:"Seed value for the turbulence random number generator."},{name:"maxDisplacement",type:"number",default:"400",description:"Maximum displacement scale applied when the cursor moves. Controls the intensity of the decay effect."},{name:"movementBound",type:"number",default:"50",description:"Maximum pixel distance the card can translate from its origin when following the cursor."}],[]);return e.jsx(q,{props:v,defaultProps:F,resetProps:R,hasChanges:M,children:e.jsxs(A,{children:[e.jsxs(L,{children:[e.jsx(E,{position:"relative",className:"demo-container",h:500,overflow:"hidden",children:e.jsx($,{width:x,height:w,baseFrequency:f,numOctaves:r,seed:y,maxDisplacement:l,movementBound:g,children:e.jsxs(X,{mixBlendMode:"overlay",children:["Decay",e.jsx("br",{}),"Card"]})},a)}),e.jsxs(P,{children:[e.jsx(u,{title:"Width",min:100,max:600,step:25,value:x,onChange:t=>{c("width",t),m()}}),e.jsx(u,{title:"Height",min:200,max:600,step:25,value:w,onChange:t=>{c("height",t),m()}}),e.jsx(u,{title:"Base Frequency",min:.001,max:.1,step:.001,value:f,onChange:t=>{c("baseFrequency",t),m()}}),e.jsx(u,{title:"Num Octaves",min:1,max:10,step:1,value:r,onChange:t=>{c("numOctaves",t),m()}}),e.jsx(u,{title:"Seed",min:0,max:100,step:1,value:y,onChange:t=>{c("seed",t),m()}}),e.jsx(u,{title:"Max Displacement",min:50,max:1e3,step:50,value:l,onChange:t=>c("maxDisplacement",t)}),e.jsx(u,{title:"Movement Bound",min:10,max:150,step:5,value:g,onChange:t=>c("movementBound",t)})]}),e.jsx(N,{data:h}),e.jsx(W,{dependencyList:["gsap"]})]}),e.jsx(O,{children:e.jsx(H,{codeObject:_,componentName:"DecayCard"})})]})})};export{me as default};
