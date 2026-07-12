import{r as p,j as n,aj as R,B as E,bp as F}from"./index-TQprzHkU.js";import{u as I,C as N,T as P,P as K,a as V,b as O,c as L}from"./useComponentProps-CjYSqekE.js";import{R as _}from"./RefreshButton-C5Kl5Rs7.js";import{D as W}from"./Dependencies-IIL9riMN.js";import{u as H}from"./useForceRerender-Dq8YDj2j.js";import{C as U}from"./Customize-BdikCFm5.js";import{P as $}from"./PreviewSlider-CCbi2och.js";import{P as T}from"./PreviewSelect-DZgUm0jD.js";import"./index-DQmtNYX5.js";import"./CodeHighlighter-Dx4QNbvH.js";import"./rotate-ccw-_xDu3G0k.js";/* empty css                       */const z=(t,o)=>{const c=new Set([...Object.keys(t),...o.flatMap(e=>Object.keys(e))]),s={};return c.forEach(e=>{s[e]=[t[e],...o.map(i=>i[e])]}),s},q=({text:t="",delay:o=200,className:c="",animateBy:s="words",direction:e="top",threshold:i=.1,rootMargin:u="0px",animationFrom:b,animationTo:l,easing:h=f=>f,onAnimationComplete:a,stepDuration:C=.35})=>{const f=s==="words"?t.split(" "):t.split(""),[v,S]=p.useState(!1),d=p.useRef(null);p.useEffect(()=>{if(!d.current)return;const m=new IntersectionObserver(([r])=>{r.isIntersecting&&(S(!0),m.unobserve(d.current))},{threshold:i,rootMargin:u});return m.observe(d.current),()=>m.disconnect()},[i,u]);const A=p.useMemo(()=>e==="top"?{filter:"blur(10px)",opacity:0,y:-50}:{filter:"blur(10px)",opacity:0,y:50},[e]),B=p.useMemo(()=>[{filter:"blur(5px)",opacity:.5,y:e==="top"?5:-5},{filter:"blur(0px)",opacity:1,y:0}],[e]),x=b??A,g=l??B,y=g.length+1,M=C*(y-1),j=Array.from({length:y},(m,r)=>y===1?0:r/(y-1));return n.jsx("p",{ref:d,className:c,style:{display:"flex",flexWrap:"wrap"},children:f.map((m,r)=>{const D=z(x,g),w={duration:M,times:j,delay:r*o/1e3};return w.ease=h,n.jsxs(R.span,{className:"inline-block will-change-[transform,filter,opacity]",initial:x,animate:v?D:x,transition:w,onAnimationComplete:r===f.length-1?a:void 0,children:[m===" "?" ":m,s==="words"&&r<f.length-1&&" "]},r)})})},G=`import { motion } from 'motion/react';
import { useEffect, useRef, useState, useMemo } from 'react';

const buildKeyframes = (from, steps) => {
  const keys = new Set([...Object.keys(from), ...steps.flatMap(s => Object.keys(s))]);

  const keyframes = {};
  keys.forEach(k => {
    keyframes[k] = [from[k], ...steps.map(s => s[k])];
  });
  return keyframes;
};

const BlurText = ({
  text = '',
  delay = 200,
  className = '',
  animateBy = 'words',
  direction = 'top',
  threshold = 0.1,
  rootMargin = '0px',
  animationFrom,
  animationTo,
  easing = t => t,
  onAnimationComplete,
  stepDuration = 0.35
}) => {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(ref.current);
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const defaultFrom = useMemo(
    () =>
      direction === 'top' ? { filter: 'blur(10px)', opacity: 0, y: -50 } : { filter: 'blur(10px)', opacity: 0, y: 50 },
    [direction]
  );

  const defaultTo = useMemo(
    () => [
      {
        filter: 'blur(5px)',
        opacity: 0.5,
        y: direction === 'top' ? 5 : -5
      },
      { filter: 'blur(0px)', opacity: 1, y: 0 }
    ],
    [direction]
  );

  const fromSnapshot = animationFrom ?? defaultFrom;
  const toSnapshots = animationTo ?? defaultTo;

  const stepCount = toSnapshots.length + 1;
  const totalDuration = stepDuration * (stepCount - 1);
  const times = Array.from({ length: stepCount }, (_, i) => (stepCount === 1 ? 0 : i / (stepCount - 1)));

  return (
    <p ref={ref} className={className} style={{ display: 'flex', flexWrap: 'wrap' }}>
      {elements.map((segment, index) => {
        const animateKeyframes = buildKeyframes(fromSnapshot, toSnapshots);

        const spanTransition = {
          duration: totalDuration,
          times,
          delay: (index * delay) / 1000
        };
        spanTransition.ease = easing;

        return (
          <motion.span
            className="inline-block will-change-[transform,filter,opacity]"
            key={index}
            initial={fromSnapshot}
            animate={inView ? animateKeyframes : fromSnapshot}
            transition={spanTransition}
            onAnimationComplete={index === elements.length - 1 ? onAnimationComplete : undefined}
          >
            {segment === ' ' ? '\\u00A0' : segment}
            {animateBy === 'words' && index < elements.length - 1 && '\\u00A0'}
          </motion.span>
        );
      })}
    </p>
  );
};

export default BlurText;
`,J=`import { motion } from 'motion/react';
import { useEffect, useRef, useState, useMemo } from 'react';

const buildKeyframes = (from, steps) => {
  const keys = new Set([...Object.keys(from), ...steps.flatMap(s => Object.keys(s))]);

  const keyframes = {};
  keys.forEach(k => {
    keyframes[k] = [from[k], ...steps.map(s => s[k])];
  });
  return keyframes;
};

const BlurText = ({
  text = '',
  delay = 200,
  className = '',
  animateBy = 'words',
  direction = 'top',
  threshold = 0.1,
  rootMargin = '0px',
  animationFrom,
  animationTo,
  easing = t => t,
  onAnimationComplete,
  stepDuration = 0.35
}) => {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(ref.current);
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const defaultFrom = useMemo(
    () =>
      direction === 'top' ? { filter: 'blur(10px)', opacity: 0, y: -50 } : { filter: 'blur(10px)', opacity: 0, y: 50 },
    [direction]
  );

  const defaultTo = useMemo(
    () => [
      {
        filter: 'blur(5px)',
        opacity: 0.5,
        y: direction === 'top' ? 5 : -5
      },
      { filter: 'blur(0px)', opacity: 1, y: 0 }
    ],
    [direction]
  );

  const fromSnapshot = animationFrom ?? defaultFrom;
  const toSnapshots = animationTo ?? defaultTo;

  const stepCount = toSnapshots.length + 1;
  const totalDuration = stepDuration * (stepCount - 1);
  const times = Array.from({ length: stepCount }, (_, i) => (stepCount === 1 ? 0 : i / (stepCount - 1)));

  return (
    <p ref={ref} className={\`blur-text \${className} flex flex-wrap\`}>
      {elements.map((segment, index) => {
        const animateKeyframes = buildKeyframes(fromSnapshot, toSnapshots);

        const spanTransition = {
          duration: totalDuration,
          times,
          delay: (index * delay) / 1000
        };
        spanTransition.ease = easing;

        return (
          <motion.span
            className="inline-block will-change-[transform,filter,opacity]"
            key={index}
            initial={fromSnapshot}
            animate={inView ? animateKeyframes : fromSnapshot}
            transition={spanTransition}
            onAnimationComplete={index === elements.length - 1 ? onAnimationComplete : undefined}
          >
            {segment === ' ' ? '\\u00A0' : segment}
            {animateBy === 'words' && index < elements.length - 1 && '\\u00A0'}
          </motion.span>
        );
      })}
    </p>
  );
};

export default BlurText;
`,Q=`import { motion, Transition } from 'motion/react';
import { useEffect, useRef, useState, useMemo } from 'react';

type BlurTextProps = {
  text?: string;
  delay?: number;
  className?: string;
  animateBy?: 'words' | 'letters';
  direction?: 'top' | 'bottom';
  threshold?: number;
  rootMargin?: string;
  animationFrom?: Record<string, string | number>;
  animationTo?: Array<Record<string, string | number>>;
  easing?: (t: number) => number;
  onAnimationComplete?: () => void;
  stepDuration?: number;
};

const buildKeyframes = (
  from: Record<string, string | number>,
  steps: Array<Record<string, string | number>>
): Record<string, Array<string | number>> => {
  const keys = new Set<string>([...Object.keys(from), ...steps.flatMap(s => Object.keys(s))]);

  const keyframes: Record<string, Array<string | number>> = {};
  keys.forEach(k => {
    keyframes[k] = [from[k], ...steps.map(s => s[k])];
  });
  return keyframes;
};

const BlurText: React.FC<BlurTextProps> = ({
  text = '',
  delay = 200,
  className = '',
  animateBy = 'words',
  direction = 'top',
  threshold = 0.1,
  rootMargin = '0px',
  animationFrom,
  animationTo,
  easing = (t: number) => t,
  onAnimationComplete,
  stepDuration = 0.35
}) => {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(ref.current as Element);
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const defaultFrom = useMemo(
    () =>
      direction === 'top' ? { filter: 'blur(10px)', opacity: 0, y: -50 } : { filter: 'blur(10px)', opacity: 0, y: 50 },
    [direction]
  );

  const defaultTo = useMemo(
    () => [
      {
        filter: 'blur(5px)',
        opacity: 0.5,
        y: direction === 'top' ? 5 : -5
      },
      { filter: 'blur(0px)', opacity: 1, y: 0 }
    ],
    [direction]
  );

  const fromSnapshot = animationFrom ?? defaultFrom;
  const toSnapshots = animationTo ?? defaultTo;

  const stepCount = toSnapshots.length + 1;
  const totalDuration = stepDuration * (stepCount - 1);
  const times = Array.from({ length: stepCount }, (_, i) => (stepCount === 1 ? 0 : i / (stepCount - 1)));

  return (
    <p ref={ref} className={className} style={{ display: 'flex', flexWrap: 'wrap' }}>
      {elements.map((segment, index) => {
        const animateKeyframes = buildKeyframes(fromSnapshot, toSnapshots);

        const spanTransition: Transition = {
          duration: totalDuration,
          times,
          delay: (index * delay) / 1000,
          ease: easing
        };

        return (
          <motion.span
            key={index}
            initial={fromSnapshot}
            animate={inView ? animateKeyframes : fromSnapshot}
            transition={spanTransition}
            onAnimationComplete={index === elements.length - 1 ? onAnimationComplete : undefined}
            style={{
              display: 'inline-block',
              willChange: 'transform, filter, opacity'
            }}
          >
            {segment === ' ' ? '\\u00A0' : segment}
            {animateBy === 'words' && index < elements.length - 1 && '\\u00A0'}
          </motion.span>
        );
      })}
    </p>
  );
};

export default BlurText;
`,X=`import { motion, Transition, Easing } from 'motion/react';
import { useEffect, useRef, useState, useMemo } from 'react';

type BlurTextProps = {
  text?: string;
  delay?: number;
  className?: string;
  animateBy?: 'words' | 'letters';
  direction?: 'top' | 'bottom';
  threshold?: number;
  rootMargin?: string;
  animationFrom?: Record<string, string | number>;
  animationTo?: Array<Record<string, string | number>>;
  easing?: Easing | Easing[];
  onAnimationComplete?: () => void;
  stepDuration?: number;
};

const buildKeyframes = (
  from: Record<string, string | number>,
  steps: Array<Record<string, string | number>>
): Record<string, Array<string | number>> => {
  const keys = new Set<string>([...Object.keys(from), ...steps.flatMap(s => Object.keys(s))]);

  const keyframes: Record<string, Array<string | number>> = {};
  keys.forEach(k => {
    keyframes[k] = [from[k], ...steps.map(s => s[k])];
  });
  return keyframes;
};

const BlurText: React.FC<BlurTextProps> = ({
  text = '',
  delay = 200,
  className = '',
  animateBy = 'words',
  direction = 'top',
  threshold = 0.1,
  rootMargin = '0px',
  animationFrom,
  animationTo,
  easing = (t: number) => t,
  onAnimationComplete,
  stepDuration = 0.35
}) => {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(ref.current as Element);
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const defaultFrom = useMemo(
    () =>
      direction === 'top' ? { filter: 'blur(10px)', opacity: 0, y: -50 } : { filter: 'blur(10px)', opacity: 0, y: 50 },
    [direction]
  );

  const defaultTo = useMemo(
    () => [
      {
        filter: 'blur(5px)',
        opacity: 0.5,
        y: direction === 'top' ? 5 : -5
      },
      { filter: 'blur(0px)', opacity: 1, y: 0 }
    ],
    [direction]
  );

  const fromSnapshot = animationFrom ?? defaultFrom;
  const toSnapshots = animationTo ?? defaultTo;

  const stepCount = toSnapshots.length + 1;
  const totalDuration = stepDuration * (stepCount - 1);
  const times = Array.from({ length: stepCount }, (_, i) => (stepCount === 1 ? 0 : i / (stepCount - 1)));

  return (
    <p ref={ref} className={\`blur-text \${className} flex flex-wrap\`}>
      {elements.map((segment, index) => {
        const animateKeyframes = buildKeyframes(fromSnapshot, toSnapshots);

        const spanTransition: Transition = {
          duration: totalDuration,
          times,
          delay: (index * delay) / 1000,
          ease: easing
        };

        return (
          <motion.span
            key={index}
            initial={fromSnapshot}
            animate={inView ? animateKeyframes : fromSnapshot}
            transition={spanTransition}
            onAnimationComplete={index === elements.length - 1 ? onAnimationComplete : undefined}
            style={{
              display: 'inline-block',
              willChange: 'transform, filter, opacity'
            }}
          >
            {segment === ' ' ? '\\u00A0' : segment}
            {animateBy === 'words' && index < elements.length - 1 && '\\u00A0'}
          </motion.span>
        );
      })}
    </p>
  );
};

export default BlurText;
`,Y={dependencies:"motion",usage:`import BlurText from "./BlurText";

const handleAnimationComplete = () => {
  console.log('Animation completed!');
};

<BlurText
  text="Isn't this so cool?!"
  delay={150}
  animateBy="words"
  direction="top"
  onAnimationComplete={handleAnimationComplete}
  className="text-2xl mb-8"
/>`,code:G,tailwind:J,tsCode:Q,tsTailwind:X},k={text:"Isn't this so cool?!",animateBy:"words",direction:"top",delay:200},un=()=>{const{props:t,updateProp:o,resetProps:c,hasChanges:s}=I(k),{animateBy:e,direction:i,delay:u}=t,[b,l]=H(),h=p.useMemo(()=>[{name:"text",type:"string",default:'""',description:"The text content to animate."},{name:"animateBy",type:"string",default:'"words"',description:"Determines whether to animate by 'words' or 'letters'."},{name:"direction",type:"string",default:'"top"',description:"Direction from which the words/letters appear ('top' or 'bottom')."},{name:"delay",type:"number",default:"200",description:"Delay between animations for each word/letter (in ms)."},{name:"stepDuration",type:"number",default:"0.35",description:"The time taken for each letter/word to animate (in seconds)."},{name:"threshold",type:"number",default:"0.1",description:"Intersection threshold for triggering the animation."},{name:"rootMargin",type:"string",default:'"0px"',description:"Root margin for the intersection observer."},{name:"onAnimationComplete",type:"function",default:"undefined",description:"Callback function triggered when all animations complete."}],[]);return n.jsx(N,{props:t,defaultProps:k,resetProps:c,hasChanges:s,children:n.jsxs(P,{children:[n.jsxs(K,{children:[n.jsxs(E,{position:"relative",className:"demo-container",minH:400,overflow:"hidden",children:[n.jsx(_,{onClick:l}),n.jsx(q,{text:t.text,animateBy:e,direction:i,delay:u,onAnimationComplete:()=>F("✅ Animation Finished!"),className:"blur-text-demo"},b)]}),n.jsxs(U,{children:[n.jsx(T,{title:"Animate By",options:[{value:"words",label:"Words"},{value:"letters",label:"Letters"}],value:e,onChange:a=>{o("animateBy",a),l()}}),n.jsx(T,{title:"Direction",options:[{value:"top",label:"Top"},{value:"bottom",label:"Bottom"}],value:i,onChange:a=>{o("direction",a),l()}}),n.jsx($,{title:"Delay",min:50,max:500,step:10,value:u,valueUnit:"ms",onChange:a=>{o("delay",a),l()}})]}),n.jsx(V,{data:h}),n.jsx(W,{dependencyList:["motion"]})]}),n.jsx(O,{children:n.jsx(L,{codeObject:Y,componentName:"BlurText"})})]})})};export{un as default};
