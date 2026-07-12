import{r as S,N as E,j as n,B as I,F as L}from"./index-TQprzHkU.js";import{S as R,u as H,C as M,T as B,P as F,a as $,b as q,c as W}from"./useComponentProps-CjYSqekE.js";import{R as G}from"./RefreshButton-C5Kl5Rs7.js";import{D as U}from"./Dependencies-IIL9riMN.js";import{u as V}from"./useForceRerender-Dq8YDj2j.js";import{C as _}from"./Customize-BdikCFm5.js";import{P as i}from"./PreviewSlider-CCbi2och.js";import{P as w}from"./PreviewSwitch-CcPSwIGg.js";import{P}from"./PreviewSelect-DZgUm0jD.js";import"./index-DQmtNYX5.js";import"./CodeHighlighter-Dx4QNbvH.js";import"./rotate-ccw-_xDu3G0k.js";/* empty css                       */E.registerPlugin(R);const J=({children:C,container:t,distance:r=100,direction:b="vertical",reverse:s=!1,duration:m=.8,ease:u="power3.out",initialOpacity:l=0,animateOpacity:c=!0,scale:f=1,threshold:g=.1,delay:y=0,disappearAfter:p=0,disappearDuration:h=.5,disappearEase:v="power3.in",onComplete:d,onDisappearanceComplete:o,className:A="",...a})=>{const x=S.useRef(null);return S.useEffect(()=>{const e=x.current;if(!e)return;let T=t||document.getElementById("snap-main-container")||null;typeof T=="string"&&(T=document.querySelector(T));const D=b==="horizontal"?"x":"y",N=s?-r:r,k=(1-g)*100;E.set(e,{[D]:N,scale:f,opacity:c?l:1,visibility:"visible"});const O=E.timeline({paused:!0,delay:y,onComplete:()=>{d&&d(),p>0&&E.to(e,{[D]:s?r:-r,scale:.8,opacity:c?l:0,delay:p,duration:h,ease:v,onComplete:()=>o==null?void 0:o()})}});O.to(e,{[D]:0,scale:1,opacity:1,duration:m,ease:u});const z=R.create({trigger:e,scroller:T,start:`top ${k}%`,once:!0,onEnter:()=>O.play()});return()=>{z.kill(),O.kill()}},[t,r,b,s,m,u,l,c,f,g,y,p,h,v,d,o]),n.jsx("div",{ref:x,className:A,style:{visibility:"hidden"},...a,children:C})},K=`import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AnimatedContent = ({
  children,
  container,
  distance = 100,
  direction = 'vertical',
  reverse = false,
  duration = 0.8,
  ease = 'power3.out',
  initialOpacity = 0,
  animateOpacity = true,
  scale = 1,
  threshold = 0.1,
  delay = 0,
  disappearAfter = 0,
  disappearDuration = 0.5,
  disappearEase = 'power3.in',
  onComplete,
  onDisappearanceComplete,
  className = '',
  ...props
}) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let scrollerTarget = container || document.getElementById('snap-main-container') || null;

    if (typeof scrollerTarget === 'string') {
      scrollerTarget = document.querySelector(scrollerTarget);
    }

    const axis = direction === 'horizontal' ? 'x' : 'y';
    const offset = reverse ? -distance : distance;
    const startPct = (1 - threshold) * 100;

    gsap.set(el, {
      [axis]: offset,
      scale,
      opacity: animateOpacity ? initialOpacity : 1,
      visibility: 'visible'
    });

    const tl = gsap.timeline({
      paused: true,
      delay,
      onComplete: () => {
        if (onComplete) onComplete();
        if (disappearAfter > 0) {
          gsap.to(el, {
            [axis]: reverse ? distance : -distance,
            scale: 0.8,
            opacity: animateOpacity ? initialOpacity : 0,
            delay: disappearAfter,
            duration: disappearDuration,
            ease: disappearEase,
            onComplete: () => onDisappearanceComplete?.()
          });
        }
      }
    });

    tl.to(el, {
      [axis]: 0,
      scale: 1,
      opacity: 1,
      duration,
      ease
    });

    const st = ScrollTrigger.create({
      trigger: el,
      scroller: scrollerTarget,
      start: \`top \${startPct}%\`,
      once: true,
      onEnter: () => tl.play()
    });

    return () => {
      st.kill();
      tl.kill();
    };
  }, [
    container,
    distance,
    direction,
    reverse,
    duration,
    ease,
    initialOpacity,
    animateOpacity,
    scale,
    threshold,
    delay,
    disappearAfter,
    disappearDuration,
    disappearEase,
    onComplete,
    onDisappearanceComplete
  ]);

  return (
    <div ref={ref} className={className} style={{ visibility: 'hidden' }} {...props}>
      {children}
    </div>
  );
};

export default AnimatedContent;
`,Q=`import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AnimatedContent = ({
  children,
  container,
  distance = 100,
  direction = 'vertical',
  reverse = false,
  duration = 0.8,
  ease = 'power3.out',
  initialOpacity = 0,
  animateOpacity = true,
  scale = 1,
  threshold = 0.1,
  delay = 0,
  disappearAfter = 0,
  disappearDuration = 0.5,
  disappearEase = 'power3.in',
  onComplete,
  onDisappearanceComplete,
  className = '',
  ...props
}) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let scrollerTarget = container || document.getElementById('snap-main-container') || null;

    if (typeof scrollerTarget === 'string') {
      scrollerTarget = document.querySelector(scrollerTarget);
    }

    const axis = direction === 'horizontal' ? 'x' : 'y';
    const offset = reverse ? -distance : distance;
    const startPct = (1 - threshold) * 100;

    gsap.set(el, {
      [axis]: offset,
      scale,
      opacity: animateOpacity ? initialOpacity : 1,
      visibility: 'visible'
    });

    const tl = gsap.timeline({
      paused: true,
      delay,
      onComplete: () => {
        if (onComplete) onComplete();
        if (disappearAfter > 0) {
          gsap.to(el, {
            [axis]: reverse ? distance : -distance,
            scale: 0.8,
            opacity: animateOpacity ? initialOpacity : 0,
            delay: disappearAfter,
            duration: disappearDuration,
            ease: disappearEase,
            onComplete: () => onDisappearanceComplete?.()
          });
        }
      }
    });

    tl.to(el, {
      [axis]: 0,
      scale: 1,
      opacity: 1,
      duration,
      ease
    });

    const st = ScrollTrigger.create({
      trigger: el,
      scroller: scrollerTarget,
      start: \`top \${startPct}%\`,
      once: true,
      onEnter: () => tl.play()
    });

    return () => {
      st.kill();
      tl.kill();
    };
  }, [
    container,
    distance,
    direction,
    reverse,
    duration,
    ease,
    initialOpacity,
    animateOpacity,
    scale,
    threshold,
    delay,
    disappearAfter,
    disappearDuration,
    disappearEase,
    onComplete,
    onDisappearanceComplete
  ]);

  return (
    <div ref={ref} className={\`invisible \${className}\`} {...props}>
      {children}
    </div>
  );
};

export default AnimatedContent;
`,X=`import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AnimatedContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  container?: Element | string | null;
  distance?: number;
  direction?: 'vertical' | 'horizontal';
  reverse?: boolean;
  duration?: number;
  ease?: string;
  initialOpacity?: number;
  animateOpacity?: boolean;
  scale?: number;
  threshold?: number;
  delay?: number;
  disappearAfter?: number;
  disappearDuration?: number;
  disappearEase?: string;
  onComplete?: () => void;
  onDisappearanceComplete?: () => void;
}

const AnimatedContent: React.FC<AnimatedContentProps> = ({
  children,
  container,
  distance = 100,
  direction = 'vertical',
  reverse = false,
  duration = 0.8,
  ease = 'power3.out',
  initialOpacity = 0,
  animateOpacity = true,
  scale = 1,
  threshold = 0.1,
  delay = 0,
  disappearAfter = 0,
  disappearDuration = 0.5,
  disappearEase = 'power3.in',
  onComplete,
  onDisappearanceComplete,
  className = '',
  style,
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let scrollerTarget: Element | string | null = container || document.getElementById('snap-main-container') || null;

    if (typeof scrollerTarget === 'string') {
      scrollerTarget = document.querySelector(scrollerTarget);
    }

    const axis = direction === 'horizontal' ? 'x' : 'y';
    const offset = reverse ? -distance : distance;
    const startPct = (1 - threshold) * 100;

    gsap.set(el, {
      [axis]: offset,
      scale,
      opacity: animateOpacity ? initialOpacity : 1,
      visibility: 'visible'
    });

    const tl = gsap.timeline({
      paused: true,
      delay,
      onComplete: () => {
        if (onComplete) onComplete();

        if (disappearAfter > 0) {
          gsap.to(el, {
            [axis]: reverse ? distance : -distance,
            scale: 0.8,
            opacity: animateOpacity ? initialOpacity : 0,
            delay: disappearAfter,
            duration: disappearDuration,
            ease: disappearEase,
            onComplete: () => onDisappearanceComplete?.()
          });
        }
      }
    });

    tl.to(el, {
      [axis]: 0,
      scale: 1,
      opacity: 1,
      duration,
      ease
    });

    const st = ScrollTrigger.create({
      trigger: el,
      scroller: scrollerTarget || window,
      start: \`top \${startPct}%\`,
      once: true,
      onEnter: () => tl.play()
    });

    return () => {
      st.kill();
      tl.kill();
    };
  }, [
    container,
    distance,
    direction,
    reverse,
    duration,
    ease,
    initialOpacity,
    animateOpacity,
    scale,
    threshold,
    delay,
    disappearAfter,
    disappearDuration,
    disappearEase,
    onComplete,
    onDisappearanceComplete
  ]);

  return (
    <div ref={ref} className={className} style={{ visibility: 'hidden', ...style }} {...props}>
      {children}
    </div>
  );
};

export default AnimatedContent;
`,Y=`import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AnimatedContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  container?: Element | string | null;
  distance?: number;
  direction?: 'vertical' | 'horizontal';
  reverse?: boolean;
  duration?: number;
  ease?: string;
  initialOpacity?: number;
  animateOpacity?: boolean;
  scale?: number;
  threshold?: number;
  delay?: number;
  disappearAfter?: number;
  disappearDuration?: number;
  disappearEase?: string;
  onComplete?: () => void;
  onDisappearanceComplete?: () => void;
}

const AnimatedContent: React.FC<AnimatedContentProps> = ({
  children,
  container,
  distance = 100,
  direction = 'vertical',
  reverse = false,
  duration = 0.8,
  ease = 'power3.out',
  initialOpacity = 0,
  animateOpacity = true,
  scale = 1,
  threshold = 0.1,
  delay = 0,
  disappearAfter = 0,
  disappearDuration = 0.5,
  disappearEase = 'power3.in',
  onComplete,
  onDisappearanceComplete,
  className = '',
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let scrollerTarget: Element | string | null = container || document.getElementById('snap-main-container') || null;

    if (typeof scrollerTarget === 'string') {
      scrollerTarget = document.querySelector(scrollerTarget);
    }

    const axis = direction === 'horizontal' ? 'x' : 'y';
    const offset = reverse ? -distance : distance;
    const startPct = (1 - threshold) * 100;

    gsap.set(el, {
      [axis]: offset,
      scale,
      opacity: animateOpacity ? initialOpacity : 1,
      visibility: 'visible'
    });

    const tl = gsap.timeline({
      paused: true,
      delay,
      onComplete: () => {
        if (onComplete) onComplete();
        if (disappearAfter > 0) {
          gsap.to(el, {
            [axis]: reverse ? distance : -distance,
            scale: 0.8,
            opacity: animateOpacity ? initialOpacity : 0,
            delay: disappearAfter,
            duration: disappearDuration,
            ease: disappearEase,
            onComplete: () => onDisappearanceComplete?.()
          });
        }
      }
    });

    tl.to(el, {
      [axis]: 0,
      scale: 1,
      opacity: 1,
      duration,
      ease
    });

    const st = ScrollTrigger.create({
      trigger: el,
      scroller: scrollerTarget || window,
      start: \`top \${startPct}%\`,
      once: true,
      onEnter: () => tl.play()
    });

    return () => {
      st.kill();
      tl.kill();
    };
  }, [
    container,
    distance,
    direction,
    reverse,
    duration,
    ease,
    initialOpacity,
    animateOpacity,
    scale,
    threshold,
    delay,
    disappearAfter,
    disappearDuration,
    disappearEase,
    onComplete,
    onDisappearanceComplete
  ]);

  return (
    <div ref={ref} className={\`invisible \${className}\`} {...props}>
      {children}
    </div>
  );
};

export default AnimatedContent;
`,Z={dependencies:"gsap",usage:`import AnimatedContent from './AnimatedContent'

<AnimatedContent
  distance={150}
  direction="horizontal"
  reverse={false}
  duration={1.2}
  ease="bounce.out"
  initialOpacity={0.2}
  animateOpacity
  scale={1.1}
  threshold={0.2}
  delay={0.3}
>
  <div>Content to Animate</div>
</AnimatedContent>`,code:K,tailwind:Q,tsCode:X,tsTailwind:Y},j={direction:"vertical",distance:100,delay:0,reverse:!1,duration:.8,ease:"power3.out",initialOpacity:0,animateOpacity:!0,scale:1,threshold:.1,disappearAfter:0,disappearDuration:.5,disappearEase:"power3.in"},ue=()=>{const{props:C,updateProp:t,resetProps:r,hasChanges:b}=H(j),{direction:s,distance:m,delay:u,reverse:l,duration:c,ease:f,initialOpacity:g,animateOpacity:y,scale:p,threshold:h,disappearAfter:v,disappearDuration:d,disappearEase:o}=C,[A,a]=V(),x=S.useMemo(()=>[{name:"children",type:"ReactNode",default:"",description:"The content to be animated."},{name:"container",type:"string | HTMLElement",default:"null",description:"The scroll container to use for ScrollTrigger. Can be a selector string or an HTMLElement. Defaults to main container. Uses auto-detection (for snap-main-container id) if not provided."},{name:"distance",type:"number",default:"100",description:"Distance (in pixels) the component moves during animation."},{name:"direction",type:"string",default:'"vertical"',description:'Animation direction. Can be "vertical" or "horizontal".'},{name:"reverse",type:"boolean",default:"false",description:"Whether the animation moves in the reverse direction."},{name:"duration",type:"number",default:"0.8",description:"Duration of the animation in seconds."},{name:"ease",type:"string",default:'"power3.out"',description:"GSAP easing function for the animation."},{name:"initialOpacity",type:"number",default:"0",description:"Initial opacity before animation begins."},{name:"animateOpacity",type:"boolean",default:"true",description:"Whether to animate opacity during transition."},{name:"scale",type:"number",default:"1",description:"Initial scale of the component."},{name:"threshold",type:"number",default:"0.1",description:"Intersection threshold to trigger animation (0-1)."},{name:"delay",type:"number",default:"0",description:"Delay before animation starts (in seconds)."},{name:"onComplete",type:"function",default:"undefined",description:"Callback function called when animation completes."},{name:"dissappearAfter",type:"number",default:"0",description:"Time in seconds after which the content will disappear. Disabled if set to 0."},{name:"disappearDuration",type:"number",default:"0.5",description:"Duration of the disappearance animation in seconds."},{name:"disappearEase",type:"string",default:'"power3.in"',description:"GSAP easing function for the disappearance animation."},{name:"onDisappearanceComplete",type:"function",default:"undefined",description:"Callback function called when disappearance animation completes."},{name:"className",type:"string",default:"''",description:"Additional CSS classes to apply to the animated component."}],[]);return n.jsx(M,{props:C,defaultProps:j,resetProps:r,hasChanges:b,children:n.jsxs(B,{children:[n.jsxs(F,{children:[n.jsxs(I,{position:"relative",className:"demo-container",minH:400,overflow:"hidden",children:[n.jsx(G,{onClick:a}),n.jsx(J,{direction:s,delay:u,distance:m,reverse:l,duration:c,ease:f,initialOpacity:g,animateOpacity:y,scale:p,threshold:h,disappearAfter:v,disappearDuration:d,disappearEase:o,children:n.jsx(L,{fontSize:"xl",fontWeight:"bolder",justifyContent:"center",alignItems:"center",color:"#fff",h:100,borderRadius:"25px",border:"1px solid #2F293A",w:200,bg:"#120F17",children:"Animate Me"})},A)]}),n.jsxs(_,{children:[n.jsx(P,{title:"Direction",options:[{value:"vertical",label:"Vertical"},{value:"horizontal",label:"Horizontal"}],value:s,onChange:e=>{t("direction",e),a()}}),n.jsx(P,{title:"Ease",options:[{value:"power3.out",label:"power3.out"},{value:"bounce.out",label:"bounce.out"},{value:"elastic.out(1, 0.3)",label:"elastic.out"}],value:f,onChange:e=>{t("ease",e),a()}}),n.jsx(P,{title:"Disappear Ease",options:[{value:"power3.in",label:"power3.in"},{value:"bounce.in",label:"bounce.in"},{value:"elastic.in(1, 0.3)",label:"elastic.in"}],value:o,onChange:e=>{t("disappearEase",e),a()}}),n.jsx(w,{title:"Reverse Direction",isChecked:l,onChange:e=>{t("reverse",e),a()}}),n.jsx(w,{title:"Animate Opacity",isChecked:y,onChange:e=>{t("animateOpacity",e),a()}}),n.jsx(i,{title:"Distance",min:50,max:300,step:10,value:m,onChange:e=>{t("distance",e),a()}}),n.jsx(i,{title:"Duration",min:.1,max:3,step:.1,value:c,onChange:e=>{t("duration",e),a()}}),n.jsx(i,{title:"Delay",min:0,max:2,step:.1,value:u,onChange:e=>{t("delay",e),a()}}),n.jsx(i,{title:"Initial Opacity",min:0,max:1,step:.1,value:g,onChange:e=>{t("initialOpacity",e),a()}}),n.jsx(i,{title:"Initial Scale",min:.1,max:2,step:.1,value:p,onChange:e=>{t("scale",e),a()}}),n.jsx(i,{title:"Threshold",min:.1,max:1,step:.1,value:h,onChange:e=>{t("threshold",e),a()}}),n.jsx(i,{title:"Disappear After",min:0,max:5,step:.1,value:v,onChange:e=>{t("disappearAfter",e),a()}}),n.jsx(i,{title:"Disappear Duration",min:.5,max:3,step:.1,value:d,onChange:e=>{t("disappearDuration",e),a()}})]}),n.jsx($,{data:x}),n.jsx(U,{dependencyList:["gsap"]})]}),n.jsx(q,{children:n.jsx(W,{codeObject:Z,componentName:"AnimatedContent"})})]})})};export{ue as default};
