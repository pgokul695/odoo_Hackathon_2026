import{r as d,j as e,B as h,F as m,I as g,T as l}from"./index-TQprzHkU.js";import{d as f}from"./index-DPWpC7gP.js";import{u as v,C as x,T as y,P as C,a as b,b as M,c as R}from"./useComponentProps-CjYSqekE.js";import{C as P}from"./Customize-BdikCFm5.js";import{P as S}from"./PreviewColorPickerCustom-BFsDkSOr.js";import"./index-DQmtNYX5.js";import"./CodeHighlighter-Dx4QNbvH.js";import"./rotate-ccw-_xDu3G0k.js";/* empty css                       */const $=({children:t,className:i="",spotlightColor:a="rgba(255, 255, 255, 0.25)"})=>{const n=d.useRef(null),o=s=>{const r=n.current.getBoundingClientRect(),p=s.clientX-r.left,u=s.clientY-r.top;n.current.style.setProperty("--mouse-x",`${p}px`),n.current.style.setProperty("--mouse-y",`${u}px`),n.current.style.setProperty("--spotlight-color",a)};return e.jsx("div",{ref:n,onMouseMove:o,className:`card-spotlight ${i}`,children:t})},F=`import { useRef } from 'react';
import './SpotlightCard.css';

const SpotlightCard = ({ children, className = '', spotlightColor = 'rgba(255, 255, 255, 0.25)' }) => {
  const divRef = useRef(null);

  const handleMouseMove = e => {
    const rect = divRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    divRef.current.style.setProperty('--mouse-x', \`\${x}px\`);
    divRef.current.style.setProperty('--mouse-y', \`\${y}px\`);
    divRef.current.style.setProperty('--spotlight-color', spotlightColor);
  };

  return (
    <div ref={divRef} onMouseMove={handleMouseMove} className={\`card-spotlight \${className}\`}>
      {children}
    </div>
  );
};

export default SpotlightCard;
`,N=`.card-spotlight {
  position: relative;
  border-radius: 1.5rem;
  border: 1px solid #222;
  background-color: #111;
  padding: 2rem;
  overflow: hidden;
  --mouse-x: 50%;
  --mouse-y: 50%;
  --spotlight-color: rgba(255, 255, 255, 0.05);
}

.card-spotlight::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at var(--mouse-x) var(--mouse-y), var(--spotlight-color), transparent 80%);
  opacity: 0;
  transition: opacity 0.5s ease;
  pointer-events: none;
}

.card-spotlight:hover::before,
.card-spotlight:focus-within::before {
  opacity: 0.6;
}
`,j=`import { useRef, useState } from 'react';

const SpotlightCard = ({ children, className = '', spotlightColor = 'rgba(255, 255, 255, 0.25)' }) => {
  const divRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = e => {
    if (!divRef.current || isFocused) return;

    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(0.6);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(0.6);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={\`relative rounded-3xl border border-neutral-800 bg-neutral-900 overflow-hidden p-8 \${className}\`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-in-out"
        style={{
          opacity,
          background: \`radial-gradient(circle at \${position.x}px \${position.y}px, \${spotlightColor}, transparent 80%)\`
        }}
      />
      {children}
    </div>
  );
};

export default SpotlightCard;
`,E=`import React, { useRef } from 'react';
import './SpotlightCard.css';

interface Position {
  x: number;
  y: number;
}

interface SpotlightCardProps extends React.PropsWithChildren {
  className?: string;
  spotlightColor?: \`rgba(\${number}, \${number}, \${number}, \${number})\`;
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = '',
  spotlightColor = 'rgba(255, 255, 255, 0.25)'
}) => {
  const divRef = useRef<HTMLDivElement>(null);

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = e => {
    if (!divRef.current) return;

    const rect = divRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    divRef.current.style.setProperty('--mouse-x', \`\${x}px\`);
    divRef.current.style.setProperty('--mouse-y', \`\${y}px\`);
    divRef.current.style.setProperty('--spotlight-color', spotlightColor);
  };

  return (
    <div ref={divRef} onMouseMove={handleMouseMove} className={\`card-spotlight \${className}\`}>
      {children}
    </div>
  );
};

export default SpotlightCard;
`,B=`import React, { useRef, useState } from 'react';

interface Position {
  x: number;
  y: number;
}

interface SpotlightCardProps extends React.PropsWithChildren {
  className?: string;
  spotlightColor?: \`rgba(\${number}, \${number}, \${number}, \${number})\`;
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = '',
  spotlightColor = 'rgba(255, 255, 255, 0.25)'
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState<number>(0);

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = e => {
    if (!divRef.current || isFocused) return;

    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(0.6);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(0.6);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={\`relative rounded-3xl border border-neutral-800 bg-neutral-900 overflow-hidden p-8 \${className}\`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-in-out"
        style={{
          opacity,
          background: \`radial-gradient(circle at \${position.x}px \${position.y}px, \${spotlightColor}, transparent 80%)\`
        }}
      />
      {children}
    </div>
  );
};

export default SpotlightCard;
`,T={usage:`import SpotlightCard from './SpotlightCard';
  
<SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(0, 229, 255, 0.2)">
  // Content goes here
</SpotlightCard>`,code:F,css:N,tailwind:j,tsCode:E,tsTailwind:B},c={spotlightColor:"#ffffff40"},z=()=>{const{props:t,updateProp:i,resetProps:a,hasChanges:n}=v(c),{spotlightColor:o}=t,s=d.useMemo(()=>[{name:"spotlightColor",type:"string",default:"rgba(255, 255, 255, 0.25)",description:"Controls the color of the radial gradient used for the spotlight effect."},{name:"className",type:"string",default:"",description:"Allows adding custom classes to the component."}],[]);return e.jsx(x,{props:t,defaultProps:c,resetProps:a,hasChanges:n,children:e.jsxs(y,{children:[e.jsxs(C,{children:[e.jsx(h,{position:"relative",className:"demo-container",py:10,children:e.jsx($,{className:"custom-spotlight-card",spotlightColor:o,children:e.jsxs(m,{h:"100%",direction:"column",alignItems:"flex-start",justifyContent:"center",children:[e.jsx(g,{mb:3,boxSize:12,as:f}),e.jsx(l,{fontWeight:600,fontSize:"1.4rem",letterSpacing:"-.5px",children:"Boost Your Experience"}),e.jsx(l,{color:"#a1a1aa",fontSize:"14px",mt:1,mb:8,children:"Get exclusive benefits, features & 24/7 support as a permanent club member."})]})})}),e.jsx(P,{children:e.jsx(S,{title:"Spotlight Color",color:o,onChange:r=>i("spotlightColor",r)})}),e.jsx(b,{data:s})]}),e.jsx(M,{children:e.jsx(R,{codeObject:T,componentName:"SpotlightCard"})})]})})};export{z as default};
