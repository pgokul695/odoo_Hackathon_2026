import{r as b,j as n,F as E}from"./index-TQprzHkU.js";import{u as A,C as $,T as N,P as j,a as T,b as z,c as H}from"./useComponentProps-CjYSqekE.js";import{C as I}from"./Customize-BdikCFm5.js";import{P as x}from"./PreviewSlider-CCbi2och.js";import{P as k}from"./PreviewColorPickerCustom-BFsDkSOr.js";import"./index-DQmtNYX5.js";import"./CodeHighlighter-Dx4QNbvH.js";import"./rotate-ccw-_xDu3G0k.js";/* empty css                       */function W({rows:o=9,columns:t=9,containerSize:c="80vmin",lineColor:p="#efefef",lineWidth:l="1vmin",lineHeight:m="6vmin",baseAngle:f=-10,className:h="",style:u={}}){const i=b.useRef(null);b.useEffect(()=>{const e=i.current;if(!e)return;const r=e.querySelectorAll("span"),y=s=>{r.forEach(a=>{const g=a.getBoundingClientRect(),R=g.x+g.width/2,M=g.y+g.height/2,w=s.x-R,C=s.y-M,L=Math.sqrt(C*C+w*w)||1,S=Math.acos(w/L)*180/Math.PI*(s.y>M?1:-1);a.style.setProperty("--rotate",`${S}deg`)})};if(window.addEventListener("pointermove",y),r.length){const s=Math.floor(r.length/2),a=r[s].getBoundingClientRect();y({x:a.x,y:a.y})}return()=>{window.removeEventListener("pointermove",y)}},[o,t]);const d=o*t,v=Array.from({length:d},(e,r)=>n.jsx("span",{style:{"--rotate":`${f}deg`,backgroundColor:p,width:l,height:m}},r));return n.jsx("div",{ref:i,className:`magnetLines-container ${h}`,style:{display:"grid",gridTemplateColumns:`repeat(${t}, 1fr)`,gridTemplateRows:`repeat(${o}, 1fr)`,width:c,height:c,...u},children:v})}const Y=`import { useRef, useEffect } from 'react';
import './MagnetLines.css';

export default function MagnetLines({
  rows = 9,
  columns = 9,
  containerSize = '80vmin',
  lineColor = '#efefef',
  lineWidth = '1vmin',
  lineHeight = '6vmin',
  baseAngle = -10,
  className = '',
  style = {}
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = container.querySelectorAll('span');

    const onPointerMove = pointer => {
      items.forEach(item => {
        const rect = item.getBoundingClientRect();
        const centerX = rect.x + rect.width / 2;
        const centerY = rect.y + rect.height / 2;

        const b = pointer.x - centerX;
        const a = pointer.y - centerY;
        const c = Math.sqrt(a * a + b * b) || 1;
        const r = ((Math.acos(b / c) * 180) / Math.PI) * (pointer.y > centerY ? 1 : -1);

        item.style.setProperty('--rotate', \`\${r}deg\`);
      });
    };

    window.addEventListener('pointermove', onPointerMove);

    if (items.length) {
      const middleIndex = Math.floor(items.length / 2);
      const rect = items[middleIndex].getBoundingClientRect();
      onPointerMove({ x: rect.x, y: rect.y });
    }

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
    };
  }, [rows, columns]);

  const total = rows * columns;
  const spans = Array.from({ length: total }, (_, i) => (
    <span
      key={i}
      style={{
        '--rotate': \`\${baseAngle}deg\`,
        backgroundColor: lineColor,
        width: lineWidth,
        height: lineHeight
      }}
    />
  ));

  return (
    <div
      ref={containerRef}
      className={\`magnetLines-container \${className}\`}
      style={{
        display: 'grid',
        gridTemplateColumns: \`repeat(\${columns}, 1fr)\`,
        gridTemplateRows: \`repeat(\${rows}, 1fr)\`,
        width: containerSize,
        height: containerSize,
        ...style
      }}
    >
      {spans}
    </div>
  );
}
`,B=`.magnetLines-container {
  display: grid;
  grid-template-columns: repeat(var(--columns), 1fr);
  grid-template-rows: repeat(var(--rows), 1fr);

  justify-items: center;
  align-items: center;

  width: 80vmin;
  height: 80vmin;
}

.magnetLines-container span {
  display: block;
  transform-origin: center;
  will-change: transform;
  transform: rotate(var(--rotate));
}
`,q=`import { useRef, useEffect } from 'react';

export default function MagnetLines({
  rows = 9,
  columns = 9,
  containerSize = '80vmin',
  lineColor = '#efefef',
  lineWidth = '1vmin',
  lineHeight = '6vmin',
  baseAngle = -10,
  className = '',
  style = {}
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = container.querySelectorAll('span');

    const onPointerMove = pointer => {
      items.forEach(item => {
        const rect = item.getBoundingClientRect();
        const centerX = rect.x + rect.width / 2;
        const centerY = rect.y + rect.height / 2;

        const b = pointer.x - centerX;
        const a = pointer.y - centerY;
        const c = Math.sqrt(a * a + b * b) || 1;
        const r = ((Math.acos(b / c) * 180) / Math.PI) * (pointer.y > centerY ? 1 : -1);

        item.style.setProperty('--rotate', \`\${r}deg\`);
      });
    };

    window.addEventListener('pointermove', onPointerMove);

    if (items.length) {
      const middleIndex = Math.floor(items.length / 2);
      const rect = items[middleIndex].getBoundingClientRect();
      onPointerMove({ x: rect.x, y: rect.y });
    }

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
    };
  }, [rows, columns]);

  const total = rows * columns;
  const spans = Array.from({ length: total }, (_, i) => (
    <span
      key={i}
      className="block origin-center"
      style={{
        backgroundColor: lineColor,
        width: lineWidth,
        height: lineHeight,
        '--rotate': \`\${baseAngle}deg\`,
        transform: 'rotate(var(--rotate))',
        willChange: 'transform'
      }}
    />
  ));

  return (
    <div
      ref={containerRef}
      className={\`grid place-items-center \${className}\`}
      style={{
        gridTemplateColumns: \`repeat(\${columns}, 1fr)\`,
        gridTemplateRows: \`repeat(\${rows}, 1fr)\`,
        width: containerSize,
        height: containerSize,
        ...style
      }}
    >
      {spans}
    </div>
  );
}
`,X=`import React, { useRef, useEffect, CSSProperties } from 'react';
import './MagnetLines.css';

interface MagnetLinesProps {
  rows?: number;
  columns?: number;
  containerSize?: string;
  lineColor?: string;
  lineWidth?: string;
  lineHeight?: string;
  baseAngle?: number;
  className?: string;
  style?: CSSProperties;
}

const MagnetLines: React.FC<MagnetLinesProps> = ({
  rows = 9,
  columns = 9,
  containerSize = '80vmin',
  lineColor = '#efefef',
  lineWidth = '1vmin',
  lineHeight = '6vmin',
  baseAngle = -10,
  className = '',
  style = {}
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = container.querySelectorAll<HTMLSpanElement>('span');

    const onPointerMove = (pointer: { x: number; y: number }) => {
      items.forEach(item => {
        const rect = item.getBoundingClientRect();
        const centerX = rect.x + rect.width / 2;
        const centerY = rect.y + rect.height / 2;

        const b = pointer.x - centerX;
        const a = pointer.y - centerY;
        const c = Math.sqrt(a * a + b * b) || 1;
        const r = ((Math.acos(b / c) * 180) / Math.PI) * (pointer.y > centerY ? 1 : -1);

        item.style.setProperty('--rotate', \`\${r}deg\`);
      });
    };

    const handlePointerMove = (e: PointerEvent) => {
      onPointerMove({ x: e.x, y: e.y });
    };

    window.addEventListener('pointermove', handlePointerMove);

    if (items.length) {
      const middleIndex = Math.floor(items.length / 2);
      const rect = items[middleIndex].getBoundingClientRect();
      onPointerMove({ x: rect.x, y: rect.y });
    }

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, [rows, columns]);

  const total = rows * columns;
  const spans = Array.from({ length: total }, (_, i) => (
    <span
      key={i}
      style={
        {
          '--rotate': \`\${baseAngle}deg\`,
          backgroundColor: lineColor,
          width: lineWidth,
          height: lineHeight
        } as CSSProperties
      }
    />
  ));

  return (
    <div
      ref={containerRef}
      className={\`magnetLines-container \${className}\`}
      style={{
        display: 'grid',
        gridTemplateColumns: \`repeat(\${columns}, 1fr)\`,
        gridTemplateRows: \`repeat(\${rows}, 1fr)\`,
        width: containerSize,
        height: containerSize,
        ...style
      }}
    >
      {spans}
    </div>
  );
};

export default MagnetLines;
`,_=`import React, { useRef, useEffect, CSSProperties } from 'react';

interface MagnetLinesProps {
  rows?: number;
  columns?: number;
  containerSize?: string;
  lineColor?: string;
  lineWidth?: string;
  lineHeight?: string;
  baseAngle?: number;
  className?: string;
  style?: CSSProperties;
}

const MagnetLines: React.FC<MagnetLinesProps> = ({
  rows = 9,
  columns = 9,
  containerSize = '80vmin',
  lineColor = '#efefef',
  lineWidth = '1vmin',
  lineHeight = '6vmin',
  baseAngle = -10,
  className = '',
  style = {}
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = container.querySelectorAll<HTMLSpanElement>('span');

    const onPointerMove = (pointer: { x: number; y: number }) => {
      items.forEach(item => {
        const rect = item.getBoundingClientRect();
        const centerX = rect.x + rect.width / 2;
        const centerY = rect.y + rect.height / 2;

        const b = pointer.x - centerX;
        const a = pointer.y - centerY;
        const c = Math.sqrt(a * a + b * b) || 1;
        const r = ((Math.acos(b / c) * 180) / Math.PI) * (pointer.y > centerY ? 1 : -1);

        item.style.setProperty('--rotate', \`\${r}deg\`);
      });
    };

    const handlePointerMove = (e: PointerEvent) => {
      onPointerMove({ x: e.x, y: e.y });
    };

    window.addEventListener('pointermove', handlePointerMove);

    if (items.length) {
      const middleIndex = Math.floor(items.length / 2);
      const rect = items[middleIndex].getBoundingClientRect();
      onPointerMove({ x: rect.x, y: rect.y });
    }

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, [rows, columns]);

  const total = rows * columns;
  const spans = Array.from({ length: total }, (_, i) => (
    <span
      key={i}
      className="block origin-center"
      style={{
        backgroundColor: lineColor,
        width: lineWidth,
        height: lineHeight,
        //@ts-ignore
        '--rotate': \`\${baseAngle}deg\`,
        transform: 'rotate(var(--rotate))',
        willChange: 'transform'
      }}
    />
  ));

  return (
    <div
      ref={containerRef}
      className={\`grid place-items-center \${className}\`}
      style={{
        gridTemplateColumns: \`repeat(\${columns}, 1fr)\`,
        gridTemplateRows: \`repeat(\${rows}, 1fr)\`,
        width: containerSize,
        height: containerSize,
        ...style
      }}
    >
      {spans}
    </div>
  );
};

export default MagnetLines;
`,D={usage:`import MagnetLines from './MagnetLines';

<MagnetLines
  rows={9}
  columns={9}
  containerSize="60vmin"
  lineColor="tomato"
  lineWidth="0.8vmin"
  lineHeight="5vmin"
  baseAngle={0}
  style={{ margin: "2rem auto" }}
/>`,code:Y,css:B,tailwind:q,tsCode:X,tsTailwind:_},P={rows:10,columns:12,containerSize:"40vmin",lineWidth:"2px",lineHeight:"30px",baseAngle:-10,lineColor:"#efefef"},nn=()=>{const{props:o,updateProp:t,resetProps:c,hasChanges:p}=A(P),{rows:l,columns:m,containerSize:f,lineWidth:h,lineHeight:u,baseAngle:i,lineColor:d}=o,v=b.useMemo(()=>[{name:"rows",type:"number",default:"9",description:"Number of grid rows."},{name:"columns",type:"number",default:"9",description:"Number of grid columns."},{name:"containerSize",type:"string",default:"80vmin",description:"Specifies the width and height of the entire grid container."},{name:"lineColor",type:"string",default:"#efefef",description:"Color for each line (the <span> elements)."},{name:"lineWidth",type:"string",default:"1vmin",description:"Specifies each line’s thickness."},{name:"lineHeight",type:"string",default:"6vmin",description:"Specifies each line’s length."},{name:"baseAngle",type:"number",default:"-10",description:"Initial rotation angle (in degrees) before pointer movement."},{name:"className",type:"string",default:"",description:"Additional class name(s) applied to the container."},{name:"style",type:"object",default:"{}",description:"Inline styles for the container."}],[]);return n.jsx($,{props:o,defaultProps:P,resetProps:c,hasChanges:p,children:n.jsxs(N,{children:[n.jsxs(j,{children:[n.jsx(E,{overflow:"hidden",justifyContent:"center",pb:"1em",alignItems:"center",className:"demo-container",children:n.jsx(W,{rows:l,columns:m,containerSize:f,lineWidth:h,lineHeight:u,baseAngle:i,lineColor:d})}),n.jsxs(I,{children:[n.jsx(x,{title:"Rows",min:3,max:20,step:1,value:l,onChange:e=>t("rows",e)}),n.jsx(x,{title:"Columns",min:3,max:20,step:1,value:m,onChange:e=>t("columns",e)}),n.jsx(x,{title:"Base Angle",min:-180,max:180,step:5,value:i,onChange:e=>t("baseAngle",e)}),n.jsx(k,{title:"Line Color",color:d,onChange:e=>t("lineColor",e)})]}),n.jsx(T,{data:v})]}),n.jsx(z,{children:n.jsx(H,{codeObject:D,componentName:"MagnetLines"})})]})})};export{nn as default};
