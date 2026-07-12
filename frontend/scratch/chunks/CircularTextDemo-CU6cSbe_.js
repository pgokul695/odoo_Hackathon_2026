import{cy as y,cz as h,an as D,aq as w,r as v,j as r,aj as k,B as H}from"./index-TQprzHkU.js";import{u as E,C as V,T as M,P,a as N,b as S,c as A}from"./useComponentProps-CjYSqekE.js";import{D as $}from"./Dependencies-IIL9riMN.js";import{C as j}from"./Customize-BdikCFm5.js";import{P as R}from"./PreviewSlider-CCbi2och.js";import{P as U}from"./PreviewSelect-DZgUm0jD.js";import{P as B}from"./PreviewInput-v-5qWA2Q.js";import{u as I}from"./use-motion-value-rrV2ndVB.js";import"./index-DQmtNYX5.js";import"./CodeHighlighter-Dx4QNbvH.js";import"./rotate-ccw-_xDu3G0k.js";/* empty css                       */function L(t){t.values.forEach(n=>n.stop())}function g(t,n){[...n].reverse().forEach(c=>{const a=t.getVariant(c);a&&h(t,a),t.variantChildren&&t.variantChildren.forEach(s=>{g(s,n)})})}function O(t,n){if(Array.isArray(n))return g(t,n);if(typeof n=="string")return g(t,[n]);h(t,n)}function z(){const t=new Set,n={subscribe(e){return t.add(e),()=>void t.delete(e)},start(e,c){const a=[];return t.forEach(s=>{a.push(y(s,e,{transitionOverride:c}))}),Promise.all(a)},set(e){return t.forEach(c=>{O(c,e)})},stop(){t.forEach(e=>{L(e)})},mount(){return()=>{n.stop()}}};return n}function W(){const t=D(z);return w(t.mount,[]),t}const Z=W,F=(t,n,e=!0)=>({from:n,to:n+360,ease:"linear",duration:t,type:"tween",repeat:e?1/0:0}),p=(t,n)=>({rotate:F(t,n),scale:{type:"spring",damping:20,stiffness:300}}),q=({text:t,spinDuration:n=20,onHover:e="speedUp",className:c=""})=>{const a=Array.from(t),s=Z(),l=I(0);v.useEffect(()=>{const o=l.get();s.start({rotate:o+360,scale:1,transition:p(n,o)})},[n,t,e,s,l]);const f=()=>{const o=l.get();if(!e)return;let i,u=1;switch(e){case"slowDown":i=p(n*2,o);break;case"speedUp":i=p(n/4,o);break;case"pause":i={rotate:{type:"spring",damping:20,stiffness:300},scale:{type:"spring",damping:20,stiffness:300}},u=1;break;case"goBonkers":i=p(n/20,o),u=.8;break;default:i=p(n,o)}s.start({rotate:o+360,scale:u,transition:i})},m=()=>{const o=l.get();s.start({rotate:o+360,scale:1,transition:p(n,o)})};return r.jsx(k.div,{className:`circular-text ${c}`,style:{rotate:l},initial:{rotate:0},animate:s,onMouseEnter:f,onMouseLeave:m,children:a.map((o,i)=>{const u=360/a.length*i,d=Math.PI/a.length,b=d*i,C=d*i,x=`rotateZ(${u}deg) translate3d(${b}px, ${C}px, 0)`;return r.jsx("span",{style:{transform:x,WebkitTransform:x},children:o},i)})})},G=`import { useEffect } from 'react';
import { motion, useAnimation, useMotionValue } from 'motion/react';

import './CircularText.css';

const getRotationTransition = (duration, from, loop = true) => ({
  from,
  to: from + 360,
  ease: 'linear',
  duration,
  type: 'tween',
  repeat: loop ? Infinity : 0
});

const getTransition = (duration, from) => ({
  rotate: getRotationTransition(duration, from),
  scale: {
    type: 'spring',
    damping: 20,
    stiffness: 300
  }
});

const CircularText = ({ text, spinDuration = 20, onHover = 'speedUp', className = '' }) => {
  const letters = Array.from(text);
  const controls = useAnimation();
  const rotation = useMotionValue(0);

  useEffect(() => {
    const start = rotation.get();
    controls.start({
      rotate: start + 360,
      scale: 1,
      transition: getTransition(spinDuration, start)
    });
  }, [spinDuration, text, onHover, controls, rotation]);

  const handleHoverStart = () => {
    const start = rotation.get();
    if (!onHover) return;

    let transitionConfig;
    let scaleVal = 1;

    switch (onHover) {
      case 'slowDown':
        transitionConfig = getTransition(spinDuration * 2, start);
        break;
      case 'speedUp':
        transitionConfig = getTransition(spinDuration / 4, start);
        break;
      case 'pause':
        transitionConfig = {
          rotate: { type: 'spring', damping: 20, stiffness: 300 },
          scale: { type: 'spring', damping: 20, stiffness: 300 }
        };
        scaleVal = 1;
        break;
      case 'goBonkers':
        transitionConfig = getTransition(spinDuration / 20, start);
        scaleVal = 0.8;
        break;
      default:
        transitionConfig = getTransition(spinDuration, start);
    }

    controls.start({
      rotate: start + 360,
      scale: scaleVal,
      transition: transitionConfig
    });
  };

  const handleHoverEnd = () => {
    const start = rotation.get();
    controls.start({
      rotate: start + 360,
      scale: 1,
      transition: getTransition(spinDuration, start)
    });
  };

  return (
    <motion.div
      className={\`circular-text \${className}\`}
      style={{ rotate: rotation }}
      initial={{ rotate: 0 }}
      animate={controls}
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
    >
      {letters.map((letter, i) => {
        const rotationDeg = (360 / letters.length) * i;
        const factor = Math.PI / letters.length;
        const x = factor * i;
        const y = factor * i;
        const transform = \`rotateZ(\${rotationDeg}deg) translate3d(\${x}px, \${y}px, 0)\`;

        return (
          <span key={i} style={{ transform, WebkitTransform: transform }}>
            {letter}
          </span>
        );
      })}
    </motion.div>
  );
};

export default CircularText;
`,_=`.circular-text {
  margin: 0 auto;
  border-radius: 50%;
  width: 200px;
  position: relative;
  height: 200px;
  font-weight: bold;
  color: #fff;
  font-weight: 900;
  text-align: center;
  cursor: pointer;
  transform-origin: 50% 50%;
  -webkit-transform-origin: 50% 50%;
}

.circular-text span {
  position: absolute;
  display: inline-block;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  font-size: 24px;
  transition: all 0.5s cubic-bezier(0, 0, 0, 1);
}
`,J=`import { useEffect } from 'react';
import { motion, useAnimation, useMotionValue } from 'motion/react';

const getRotationTransition = (duration, from, loop = true) => ({
  from,
  to: from + 360,
  ease: 'linear',
  duration,
  type: 'tween',
  repeat: loop ? Infinity : 0
});

const getTransition = (duration, from) => ({
  rotate: getRotationTransition(duration, from),
  scale: {
    type: 'spring',
    damping: 20,
    stiffness: 300
  }
});

const CircularText = ({ text, spinDuration = 20, onHover = 'speedUp', className = '' }) => {
  const letters = Array.from(text);
  const controls = useAnimation();
  const rotation = useMotionValue(0);

  useEffect(() => {
    const start = rotation.get();
    controls.start({
      rotate: start + 360,
      scale: 1,
      transition: getTransition(spinDuration, start)
    });
  }, [spinDuration, text, onHover, controls, rotation]);

  const handleHoverStart = () => {
    const start = rotation.get();
    if (!onHover) return;

    let transitionConfig;
    let scaleVal = 1;

    switch (onHover) {
      case 'slowDown':
        transitionConfig = getTransition(spinDuration * 2, start);
        break;
      case 'speedUp':
        transitionConfig = getTransition(spinDuration / 4, start);
        break;
      case 'pause':
        transitionConfig = {
          rotate: { type: 'spring', damping: 20, stiffness: 300 },
          scale: { type: 'spring', damping: 20, stiffness: 300 }
        };
        scaleVal = 1;
        break;
      case 'goBonkers':
        transitionConfig = getTransition(spinDuration / 20, start);
        scaleVal = 0.8;
        break;
      default:
        transitionConfig = getTransition(spinDuration, start);
    }

    controls.start({
      rotate: start + 360,
      scale: scaleVal,
      transition: transitionConfig
    });
  };

  const handleHoverEnd = () => {
    const start = rotation.get();
    controls.start({
      rotate: start + 360,
      scale: 1,
      transition: getTransition(spinDuration, start)
    });
  };

  return (
    <motion.div
      className={\`m-0 mx-auto rounded-full w-[200px] h-[200px] relative text-white font-black text-center cursor-pointer origin-center \${className}\`}
      style={{ rotate: rotation }}
      initial={{ rotate: 0 }}
      animate={controls}
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
    >
      {letters.map((letter, i) => {
        const rotationDeg = (360 / letters.length) * i;
        const factor = Math.PI / letters.length;
        const x = factor * i;
        const y = factor * i;
        const transform = \`rotateZ(\${rotationDeg}deg) translate3d(\${x}px, \${y}px, 0)\`;

        return (
          <span
            key={i}
            className="absolute inline-block inset-0 text-2xl transition-all duration-500 ease-[cubic-bezier(0,0,0,1)]"
            style={{ transform, WebkitTransform: transform }}
          >
            {letter}
          </span>
        );
      })}
    </motion.div>
  );
};

export default CircularText;
`,K=`import React, { useEffect } from 'react';
import { motion, useAnimation, useMotionValue, MotionValue, Transition } from 'motion/react';

import './CircularText.css';
interface CircularTextProps {
  text: string;
  spinDuration?: number;
  onHover?: 'slowDown' | 'speedUp' | 'pause' | 'goBonkers';
  className?: string;
}

const getRotationTransition = (duration: number, from: number, loop: boolean = true) => ({
  from,
  to: from + 360,
  ease: 'linear' as const,
  duration,
  type: 'tween' as const,
  repeat: loop ? Infinity : 0
});

const getTransition = (duration: number, from: number) => ({
  rotate: getRotationTransition(duration, from),
  scale: {
    type: 'spring' as const,
    damping: 20,
    stiffness: 300
  }
});

const CircularText: React.FC<CircularTextProps> = ({
  text,
  spinDuration = 20,
  onHover = 'speedUp',
  className = ''
}) => {
  const letters = Array.from(text);
  const controls = useAnimation();
  const rotation: MotionValue<number> = useMotionValue(0);

  useEffect(() => {
    const start = rotation.get();
    controls.start({
      rotate: start + 360,
      scale: 1,
      transition: getTransition(spinDuration, start)
    });
  }, [spinDuration, text, onHover, controls]);

  const handleHoverStart = () => {
    const start = rotation.get();

    if (!onHover) return;

    let transitionConfig: ReturnType<typeof getTransition> | Transition;
    let scaleVal = 1;

    switch (onHover) {
      case 'slowDown':
        transitionConfig = getTransition(spinDuration * 2, start);
        break;
      case 'speedUp':
        transitionConfig = getTransition(spinDuration / 4, start);
        break;
      case 'pause':
        transitionConfig = {
          rotate: { type: 'spring', damping: 20, stiffness: 300 },
          scale: { type: 'spring', damping: 20, stiffness: 300 }
        };
        break;
      case 'goBonkers':
        transitionConfig = getTransition(spinDuration / 20, start);
        scaleVal = 0.8;
        break;
      default:
        transitionConfig = getTransition(spinDuration, start);
    }

    controls.start({
      rotate: start + 360,
      scale: scaleVal,
      transition: transitionConfig
    });
  };

  const handleHoverEnd = () => {
    const start = rotation.get();
    controls.start({
      rotate: start + 360,
      scale: 1,
      transition: getTransition(spinDuration, start)
    });
  };

  return (
    <motion.div
      className={\`circular-text \${className}\`}
      style={{ rotate: rotation }}
      initial={{ rotate: 0 }}
      animate={controls}
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
    >
      {letters.map((letter, i) => {
        const rotationDeg = (360 / letters.length) * i;
        const factor = Math.PI / letters.length;
        const x = factor * i;
        const y = factor * i;
        const transform = \`rotateZ(\${rotationDeg}deg) translate3d(\${x}px, \${y}px, 0)\`;

        return (
          <span key={i} style={{ transform, WebkitTransform: transform }}>
            {letter}
          </span>
        );
      })}
    </motion.div>
  );
};

export default CircularText;
`,Q=`import React, { useEffect } from 'react';
import { motion, useAnimation, useMotionValue, MotionValue, Transition } from 'motion/react';
interface CircularTextProps {
  text: string;
  spinDuration?: number;
  onHover?: 'slowDown' | 'speedUp' | 'pause' | 'goBonkers';
  className?: string;
}

const getRotationTransition = (duration: number, from: number, loop: boolean = true) => ({
  from,
  to: from + 360,
  ease: 'linear' as const,
  duration,
  type: 'tween' as const,
  repeat: loop ? Infinity : 0
});

const getTransition = (duration: number, from: number) => ({
  rotate: getRotationTransition(duration, from),
  scale: {
    type: 'spring' as const,
    damping: 20,
    stiffness: 300
  }
});

const CircularText: React.FC<CircularTextProps> = ({
  text,
  spinDuration = 20,
  onHover = 'speedUp',
  className = ''
}) => {
  const letters = Array.from(text);
  const controls = useAnimation();
  const rotation: MotionValue<number> = useMotionValue(0);

  useEffect(() => {
    const start = rotation.get();
    controls.start({
      rotate: start + 360,
      scale: 1,
      transition: getTransition(spinDuration, start)
    });
  }, [spinDuration, text, onHover, controls]);

  const handleHoverStart = () => {
    const start = rotation.get();

    if (!onHover) return;

    let transitionConfig: ReturnType<typeof getTransition> | Transition;
    let scaleVal = 1;

    switch (onHover) {
      case 'slowDown':
        transitionConfig = getTransition(spinDuration * 2, start);
        break;
      case 'speedUp':
        transitionConfig = getTransition(spinDuration / 4, start);
        break;
      case 'pause':
        transitionConfig = {
          rotate: { type: 'spring', damping: 20, stiffness: 300 },
          scale: { type: 'spring', damping: 20, stiffness: 300 }
        };
        break;
      case 'goBonkers':
        transitionConfig = getTransition(spinDuration / 20, start);
        scaleVal = 0.8;
        break;
      default:
        transitionConfig = getTransition(spinDuration, start);
    }

    controls.start({
      rotate: start + 360,
      scale: scaleVal,
      transition: transitionConfig
    });
  };

  const handleHoverEnd = () => {
    const start = rotation.get();
    controls.start({
      rotate: start + 360,
      scale: 1,
      transition: getTransition(spinDuration, start)
    });
  };

  return (
    <motion.div
      className={\`m-0 mx-auto rounded-full w-[200px] h-[200px] relative font-black text-white text-center cursor-pointer origin-center \${className}\`}
      style={{ rotate: rotation }}
      initial={{ rotate: 0 }}
      animate={controls}
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
    >
      {letters.map((letter, i) => {
        const rotationDeg = (360 / letters.length) * i;
        const factor = Math.PI / letters.length;
        const x = factor * i;
        const y = factor * i;
        const transform = \`rotateZ(\${rotationDeg}deg) translate3d(\${x}px, \${y}px, 0)\`;

        return (
          <span
            key={i}
            className="absolute inline-block inset-0 text-2xl transition-all duration-500 ease-[cubic-bezier(0,0,0,1)]"
            style={{ transform, WebkitTransform: transform }}
          >
            {letter}
          </span>
        );
      })}
    </motion.div>
  );
};

export default CircularText;
`,X={dependencies:"motion",usage:`import CircularText from './CircularText';
  
<CircularText
  text="REACT*BITS*COMPONENTS*"
  onHover="speedUp"
  spinDuration={20}
  className="custom-class"
/>`,code:G,css:_,tailwind:J,tsCode:K,tsTailwind:Q},T={text:"REACT*BITS*COMPONENTS*",onHover:"speedUp",spinDuration:20},fn=()=>{const{props:t,updateProp:n,resetProps:e,hasChanges:c}=E(T),{text:a,onHover:s,spinDuration:l}=t,f=v.useMemo(()=>[{name:"text",type:"string",default:"''",description:"The text to display in a circular layout."},{name:"spinDuration",type:"number",default:"20",description:"The duration (in seconds) for one full rotation."},{name:"onHover",type:"'slowDown' | 'speedUp' | 'pause' | 'goBonkers'",default:"undefined",description:"Specifies the hover behavior variant. Options include 'slowDown', 'speedUp', 'pause', and 'goBonkers'."},{name:"className",type:"string",default:"''",description:"Optional additional CSS classes to apply to the component."}],[]),m=[{label:"Slow Down",value:"slowDown"},{label:"Speed Up",value:"speedUp"},{label:"Pause",value:"pause"},{label:"Go Bonkers",value:"goBonkers"}];return r.jsx(V,{props:t,defaultProps:T,resetProps:e,hasChanges:c,children:r.jsxs(M,{children:[r.jsxs(P,{children:[r.jsx(H,{position:"relative",className:"demo-container",h:400,overflow:"hidden",children:r.jsx(q,{text:a,onHover:s,spinDuration:l})}),r.jsxs(j,{className:"preview-options",children:[r.jsx(B,{title:"Text",value:a,placeholder:"Enter text...",width:220,maxLength:25,onChange:o=>n("text",o)}),r.jsx(U,{title:"On Hover",options:m,value:s,name:"setOnHover",width:150,onChange:o=>n("onHover",o)}),r.jsx(R,{min:1,title:"Spin Duration (s)",max:60,step:1,value:l,onChange:o=>n("spinDuration",o)})]}),r.jsx(N,{data:f}),r.jsx($,{dependencyList:["motion"]})]}),r.jsx(S,{children:r.jsx(A,{codeObject:X,componentName:"CircularText"})})]})})};export{fn as default};
