import{c8 as xe,cj as he,al as C,am as _,cg as ve,cA as Ce,cB as Se,ap as Ne,cb as Re,cC as be,cD as q,cE as Ve,cF as we,an as We,ao as V,r as m,aq as Ee,cG as X,j as c,aj as Te,B as A,F as Fe}from"./index-TQprzHkU.js";import{u as Le,C as Me,T as Pe,P as Oe,a as Be,b as je,c as ze}from"./useComponentProps-CjYSqekE.js";import{D as He}from"./Dependencies-IIL9riMN.js";import{P as w}from"./PreviewSlider-CCbi2och.js";import{u as ke}from"./use-motion-value-event--5XYQEPB.js";import{u as Q}from"./use-motion-value-rrV2ndVB.js";import{u as Xe}from"./use-spring-BIrPKcsd.js";import{u as D}from"./use-transform-D9sL3to7.js";import{u as Ae}from"./use-animation-frame-Mv9UND56.js";import{C as De}from"./Customize-BdikCFm5.js";import"./index-DQmtNYX5.js";import"./CodeHighlighter-Dx4QNbvH.js";import"./rotate-ccw-_xDu3G0k.js";/* empty css                       */const E=new WeakMap;let f;const Z=(e,n,s)=>(t,r)=>r&&r[0]?r[0][e+"Size"]:he(t)&&"getBBox"in t?t.getBBox()[n]:t[s],$e=Z("inline","width","offsetWidth"),Ye=Z("block","height","offsetHeight");function Ie({target:e,borderBoxSize:n}){var s;(s=E.get(e))==null||s.forEach(t=>{t(e,{get width(){return $e(e,n)},get height(){return Ye(e,n)}})})}function Ge(e){e.forEach(Ie)}function Ue(){typeof ResizeObserver>"u"||(f=new ResizeObserver(Ge))}function Je(e,n){f||Ue();const s=xe(e);return s.forEach(t=>{let r=E.get(t);r||(r=new Set,E.set(t,r)),r.add(n),f==null||f.observe(t)}),()=>{s.forEach(t=>{const r=E.get(t);r==null||r.delete(n),r!=null&&r.size||f==null||f.unobserve(t)})}}const T=new Set;let v;function Ke(){v=()=>{const e={get width(){return window.innerWidth},get height(){return window.innerHeight}};T.forEach(n=>n(e))},window.addEventListener("resize",v)}function _e(e){return T.add(e),v||Ke(),()=>{T.delete(e),!T.size&&typeof v=="function"&&(window.removeEventListener("resize",v),v=void 0)}}function qe(e,n){return typeof e=="function"?_e(e):Je(e,n)}function ee(e,n){let s;const t=()=>{const{currentTime:r}=n,l=(r===null?0:r.value)/100;s!==l&&e(l),s=l};return C.preUpdate(t,!0),()=>_(t)}const Qe=50,$=()=>({current:0,offset:[],progress:0,scrollLength:0,targetOffset:0,targetLength:0,containerLength:0,velocity:0}),Ze=()=>({time:0,x:$(),y:$()}),en={x:{length:"Width",position:"Left"},y:{length:"Height",position:"Top"}};function Y(e,n,s,t){const r=s[n],{length:o,position:l}=en[n],i=r.current,u=s.time;r.current=e[`scroll${l}`],r.scrollLength=e[`scroll${o}`]-e[`client${o}`],r.offset.length=0,r.offset[0]=0,r.offset[1]=r.scrollLength,r.progress=ve(0,r.scrollLength,r.current);const a=t-u;r.velocity=a>Qe?0:Ce(r.current-i,a)}function nn(e,n,s){Y(e,"x",n,s),Y(e,"y",n,s),n.time=s}function tn(e,n){const s={x:0,y:0};let t=e;for(;t&&t!==n;)if(Se(t))s.x+=t.offsetLeft,s.y+=t.offsetTop,t=t.offsetParent;else if(t.tagName==="svg"){const r=t.getBoundingClientRect();t=t.parentElement;const o=t.getBoundingClientRect();s.x+=r.left-o.left,s.y+=r.top-o.top}else if(t instanceof SVGGraphicsElement){const{x:r,y:o}=t.getBBox();s.x+=r,s.y+=o;let l=null,i=t.parentNode;for(;!l;)i.tagName==="svg"&&(l=i),i=t.parentNode;t=l}else break;return s}const B={start:0,center:.5,end:1};function I(e,n,s=0){let t=0;if(e in B&&(e=B[e]),typeof e=="string"){const r=parseFloat(e);e.endsWith("px")?t=r:e.endsWith("%")?e=r/100:e.endsWith("vw")?t=r/100*document.documentElement.clientWidth:e.endsWith("vh")?t=r/100*document.documentElement.clientHeight:e=r}return typeof e=="number"&&(t=n*e),s+t}const sn=[0,0];function rn(e,n,s,t){let r=Array.isArray(e)?e:sn,o=0,l=0;return typeof e=="number"?r=[e,e]:typeof e=="string"&&(e=e.trim(),e.includes(" ")?r=e.split(" "):r=[e,B[e]?e:"0"]),o=I(r[0],s,t),l=I(r[1],n),o-l}const on={All:[[0,0],[1,1]]},ln={x:0,y:0};function an(e){return"getBBox"in e&&e.tagName!=="svg"?e.getBBox():{width:e.clientWidth,height:e.clientHeight}}function cn(e,n,s){const{offset:t=on.All}=s,{target:r=e,axis:o="y"}=s,l=o==="y"?"height":"width",i=r!==e?tn(r,e):ln,u=r===e?{width:e.scrollWidth,height:e.scrollHeight}:an(r),a={width:e.clientWidth,height:e.clientHeight};n[o].offset.length=0;let d=!n[o].interpolate;const y=t.length;for(let g=0;g<y;g++){const x=rn(t[g],a[l],u[l],i[o]);!d&&x!==n[o].interpolatorOffsets[g]&&(d=!0),n[o].offset[g]=x}d&&(n[o].interpolate=Ne(n[o].offset,Re(t),{clamp:!1}),n[o].interpolatorOffsets=[...n[o].offset]),n[o].progress=be(0,1,n[o].interpolate(n[o].current))}function un(e,n=e,s){if(s.x.targetOffset=0,s.y.targetOffset=0,n!==e){let t=n;for(;t&&t!==e;)s.x.targetOffset+=t.offsetLeft,s.y.targetOffset+=t.offsetTop,t=t.offsetParent}s.x.targetLength=n===e?n.scrollWidth:n.clientWidth,s.y.targetLength=n===e?n.scrollHeight:n.clientHeight,s.x.containerLength=e.clientWidth,s.y.containerLength=e.clientHeight}function pn(e,n,s,t={}){return{measure:r=>{un(e,t.target,s),nn(e,s,r),(t.offset||t.target)&&cn(e,s,t)},notify:()=>n(s)}}const N=new WeakMap,G=new WeakMap,O=new WeakMap,U=e=>e===document.scrollingElement?window:e;function ne(e,{container:n=document.scrollingElement,...s}={}){if(!n)return q;let t=O.get(n);t||(t=new Set,O.set(n,t));const r=Ze(),o=pn(n,e,r,s);if(t.add(o),!N.has(n)){const i=()=>{for(const y of t)y.measure(Ve.timestamp);C.preUpdate(u)},u=()=>{for(const y of t)y.notify()},a=()=>C.read(i);N.set(n,a);const d=U(n);window.addEventListener("resize",a,{passive:!0}),n!==document.documentElement&&G.set(n,qe(n,a)),d.addEventListener("scroll",a,{passive:!0}),a()}const l=N.get(n);return C.read(l,!1,!0),()=>{var a;_(l);const i=O.get(n);if(!i||(i.delete(o),i.size))return;const u=N.get(n);N.delete(n),u&&(U(n).removeEventListener("scroll",u),(a=G.get(n))==null||a(),window.removeEventListener("resize",u))}}const J=new Map;function mn(e){const n={value:0},s=ne(t=>{n.value=t[e.axis].progress*100},e);return{currentTime:n,cancel:s}}function te({source:e,container:n,...s}){const{axis:t}=s;e&&(n=e);const r=J.get(n)??new Map;J.set(n,r);const o=s.target??"self",l=r.get(o)??{},i=t+(s.offset??[]).join(",");return l[i]||(l[i]=!s.target&&we()?new ScrollTimeline({source:n,axis:t}):mn({container:n,...s})),l[i]}function fn(e,n){const s=te(n);return e.attachTimeline({timeline:n.target?void 0:s,observe:t=>(t.pause(),ee(r=>{t.time=t.iterationDuration*r},s))})}function dn(e){return e.length===2}function yn(e,n){return dn(e)?ne(s=>{e(s[n.axis].progress,s)},n):ee(e,te(n))}function gn(e,{axis:n="y",container:s=document.scrollingElement,...t}={}){if(!s)return q;const r={axis:n,container:s,...t};return typeof e=="function"?yn(e,r):fn(e,r)}const xn=()=>({scrollX:V(0),scrollY:V(0),scrollXProgress:V(0),scrollYProgress:V(0)}),W=e=>e?!e.current:!1;function hn({container:e,target:n,...s}={}){const t=We(xn),r=m.useRef(null),o=m.useRef(!1),l=m.useCallback(()=>(r.current=gn((i,{x:u,y:a})=>{t.scrollX.set(u.current),t.scrollXProgress.set(u.progress),t.scrollY.set(a.current),t.scrollYProgress.set(a.progress)},{...s,container:(e==null?void 0:e.current)||void 0,target:(n==null?void 0:n.current)||void 0}),()=>{var i;(i=r.current)==null||i.call(r)}),[e,n,JSON.stringify(s.offset)]);return Ee(()=>{if(o.current=!1,W(e)||W(n)){o.current=!0;return}else return l()},[l]),m.useEffect(()=>{if(o.current)return X(!W(e)),X(!W(n)),l()},[l]),t}function vn(e){const n=Q(e.getVelocity()),s=()=>{const t=e.getVelocity();n.set(t),t&&C.update(s)};return ke(e,"change",()=>{C.update(s,!1,!0)}),n}function Cn(e){const[n,s]=m.useState(0);return m.useLayoutEffect(()=>{function t(){e.current&&s(e.current.offsetWidth)}return t(),window.addEventListener("resize",t),()=>window.removeEventListener("resize",t)},[e]),n}const Sn=({scrollContainerRef:e,texts:n=[],velocity:s=100,className:t="",damping:r=50,stiffness:o=400,numCopies:l=6,velocityMapping:i={input:[0,1e3],output:[0,5]},parallaxClassName:u="parallax",scrollerClassName:a="scroller",parallaxStyle:d,scrollerStyle:y})=>{function g({children:x,baseVelocity:R=s,scrollContainerRef:j,className:se="",damping:re,stiffness:oe,numCopies:le,velocityMapping:h,parallaxClassName:ie,scrollerClassName:ae,parallaxStyle:ce,scrollerStyle:ue}){const F=Q(0),pe=j?{container:j}:{},{scrollY:me}=hn(pe),fe=vn(me),de=Xe(fe,{damping:re??50,stiffness:oe??400}),L=D(de,(h==null?void 0:h.input)||[0,1e3],(h==null?void 0:h.output)||[0,5],{clamp:!1}),z=m.useRef(null),H=Cn(z);function ye(p,M,S){const P=M-p;return((S-p)%P+P)%P+p}const ge=D(F,p=>H===0?"0px":`${ye(-H,0,p)}px`),b=m.useRef(1);Ae((p,M)=>{let S=b.current*R*(M/1e3);L.get()<0?b.current=-1:L.get()>0&&(b.current=1),S+=b.current*S*L.get(),F.set(F.get()+S)});const k=[];for(let p=0;p<le;p++)k.push(c.jsxs("span",{className:se,ref:p===0?z:null,children:[x," "]},p));return c.jsx("div",{className:ie,style:ce,children:c.jsx(Te.div,{className:ae,style:{x:ge,...ue},children:k})})}return c.jsx("section",{children:n.map((x,R)=>c.jsx(g,{className:t,baseVelocity:R%2!==0?-s:s,scrollContainerRef:e,damping:r,stiffness:o,numCopies:l,velocityMapping:i,parallaxClassName:u,scrollerClassName:a,parallaxStyle:d,scrollerStyle:y,children:x},R))})},Nn=`import { useRef, useLayoutEffect, useState } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame
} from 'motion/react';
import './ScrollVelocity.css';

function useElementWidth(ref) {
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    function updateWidth() {
      if (ref.current) {
        setWidth(ref.current.offsetWidth);
      }
    }
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, [ref]);

  return width;
}

export const ScrollVelocity = ({
  scrollContainerRef,
  texts = [],
  velocity = 100,
  className = '',
  damping = 50,
  stiffness = 400,
  numCopies = 6,
  velocityMapping = { input: [0, 1000], output: [0, 5] },
  parallaxClassName = 'parallax',
  scrollerClassName = 'scroller',
  parallaxStyle,
  scrollerStyle
}) => {
  function VelocityText({
    children,
    baseVelocity = velocity,
    scrollContainerRef,
    className = '',
    damping,
    stiffness,
    numCopies,
    velocityMapping,
    parallaxClassName,
    scrollerClassName,
    parallaxStyle,
    scrollerStyle
  }) {
    const baseX = useMotionValue(0);
    const scrollOptions = scrollContainerRef ? { container: scrollContainerRef } : {};
    const { scrollY } = useScroll(scrollOptions);
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
      damping: damping ?? 50,
      stiffness: stiffness ?? 400
    });
    const velocityFactor = useTransform(
      smoothVelocity,
      velocityMapping?.input || [0, 1000],
      velocityMapping?.output || [0, 5],
      { clamp: false }
    );

    const copyRef = useRef(null);
    const copyWidth = useElementWidth(copyRef);

    function wrap(min, max, v) {
      const range = max - min;
      const mod = (((v - min) % range) + range) % range;
      return mod + min;
    }

    const x = useTransform(baseX, v => {
      if (copyWidth === 0) return '0px';
      return \`\${wrap(-copyWidth, 0, v)}px\`;
    });

    const directionFactor = useRef(1);
    useAnimationFrame((t, delta) => {
      let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

      if (velocityFactor.get() < 0) {
        directionFactor.current = -1;
      } else if (velocityFactor.get() > 0) {
        directionFactor.current = 1;
      }

      moveBy += directionFactor.current * moveBy * velocityFactor.get();
      baseX.set(baseX.get() + moveBy);
    });

    const spans = [];
    for (let i = 0; i < numCopies; i++) {
      spans.push(
        <span className={className} key={i} ref={i === 0 ? copyRef : null}>
          {children}&nbsp;
        </span>
      );
    }

    return (
      <div className={parallaxClassName} style={parallaxStyle}>
        <motion.div className={scrollerClassName} style={{ x, ...scrollerStyle }}>
          {spans}
        </motion.div>
      </div>
    );
  }

  return (
    <section>
      {texts.map((text, index) => (
        <VelocityText
          key={index}
          className={className}
          baseVelocity={index % 2 !== 0 ? -velocity : velocity}
          scrollContainerRef={scrollContainerRef}
          damping={damping}
          stiffness={stiffness}
          numCopies={numCopies}
          velocityMapping={velocityMapping}
          parallaxClassName={parallaxClassName}
          scrollerClassName={scrollerClassName}
          parallaxStyle={parallaxStyle}
          scrollerStyle={scrollerStyle}
        >
          {text}
        </VelocityText>
      ))}
    </section>
  );
};

export default ScrollVelocity;
`,Rn=`.parallax {
  position: relative;
  overflow: hidden;
}

.scroller {
  display: flex;
  white-space: nowrap;
  text-align: center;
  font-family: sans-serif;
  font-size: 2.25rem;
  font-weight: bold;
  letter-spacing: -0.02em;
  filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.1));
}

.scroller span {
  flex-shrink: 0;
}

@media (min-width: 768px) {
  .scroller {
    font-size: 5rem;
    line-height: 5rem;
  }
}
`,bn=`import { useRef, useLayoutEffect, useState } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame
} from 'motion/react';

function useElementWidth(ref) {
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    function updateWidth() {
      if (ref.current) {
        setWidth(ref.current.offsetWidth);
      }
    }
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, [ref]);

  return width;
}

export const ScrollVelocity = ({
  scrollContainerRef,
  texts = [],
  velocity = 100,
  className = '',
  damping = 50,
  stiffness = 400,
  numCopies = 6,
  velocityMapping = { input: [0, 1000], output: [0, 5] },
  parallaxClassName,
  scrollerClassName,
  parallaxStyle,
  scrollerStyle
}) => {
  function VelocityText({
    children,
    baseVelocity = velocity,
    scrollContainerRef,
    className = '',
    damping,
    stiffness,
    numCopies,
    velocityMapping,
    parallaxClassName,
    scrollerClassName,
    parallaxStyle,
    scrollerStyle
  }) {
    const baseX = useMotionValue(0);
    const scrollOptions = scrollContainerRef ? { container: scrollContainerRef } : {};
    const { scrollY } = useScroll(scrollOptions);
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
      damping: damping ?? 50,
      stiffness: stiffness ?? 400
    });
    const velocityFactor = useTransform(
      smoothVelocity,
      velocityMapping?.input || [0, 1000],
      velocityMapping?.output || [0, 5],
      { clamp: false }
    );

    const copyRef = useRef(null);
    const copyWidth = useElementWidth(copyRef);

    function wrap(min, max, v) {
      const range = max - min;
      const mod = (((v - min) % range) + range) % range;
      return mod + min;
    }

    const x = useTransform(baseX, v => {
      if (copyWidth === 0) return '0px';
      return \`\${wrap(-copyWidth, 0, v)}px\`;
    });

    const directionFactor = useRef(1);
    useAnimationFrame((t, delta) => {
      let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

      if (velocityFactor.get() < 0) {
        directionFactor.current = -1;
      } else if (velocityFactor.get() > 0) {
        directionFactor.current = 1;
      }

      moveBy += directionFactor.current * moveBy * velocityFactor.get();
      baseX.set(baseX.get() + moveBy);
    });

    const spans = [];
    for (let i = 0; i < (numCopies ?? 1); i++) {
      spans.push(
        <span className={\`flex-shrink-0 \${className}\`} key={i} ref={i === 0 ? copyRef : null}>
          {children}&nbsp;
        </span>
      );
    }

    return (
      <div className={\`\${parallaxClassName} relative overflow-hidden\`} style={parallaxStyle}>
        <motion.div
          className={\`\${scrollerClassName} flex whitespace-nowrap text-center font-sans text-4xl font-bold tracking-[-0.02em] drop-shadow md:text-[5rem] md:leading-[5rem]\`}
          style={{ x, ...scrollerStyle }}
        >
          {spans}
        </motion.div>
      </div>
    );
  }

  return (
    <section>
      {texts.map((text, index) => (
        <VelocityText
          key={index}
          className={className}
          baseVelocity={index % 2 !== 0 ? -velocity : velocity}
          scrollContainerRef={scrollContainerRef}
          damping={damping}
          stiffness={stiffness}
          numCopies={numCopies}
          velocityMapping={velocityMapping}
          parallaxClassName={parallaxClassName}
          scrollerClassName={scrollerClassName}
          parallaxStyle={parallaxStyle}
          scrollerStyle={scrollerStyle}
        >
          {text}
        </VelocityText>
      ))}
    </section>
  );
};

export default ScrollVelocity;
`,Vn=`import React, { useRef, useLayoutEffect, useState } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame
} from 'motion/react';
import './ScrollVelocity.css';

interface VelocityMapping {
  input: [number, number];
  output: [number, number];
}

interface VelocityTextProps {
  children: React.ReactNode;
  baseVelocity: number;
  scrollContainerRef?: React.RefObject<HTMLElement>;
  className?: string;
  damping?: number;
  stiffness?: number;
  numCopies?: number;
  velocityMapping?: VelocityMapping;
  parallaxClassName?: string;
  scrollerClassName?: string;
  parallaxStyle?: React.CSSProperties;
  scrollerStyle?: React.CSSProperties;
}

interface ScrollVelocityProps {
  scrollContainerRef?: React.RefObject<HTMLElement>;
  texts: React.ReactNode[];
  velocity?: number;
  className?: string;
  damping?: number;
  stiffness?: number;
  numCopies?: number;
  velocityMapping?: VelocityMapping;
  parallaxClassName?: string;
  scrollerClassName?: string;
  parallaxStyle?: React.CSSProperties;
  scrollerStyle?: React.CSSProperties;
}

function useElementWidth<T extends HTMLElement>(ref: React.RefObject<T | null>): number {
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    function updateWidth() {
      if (ref.current) {
        setWidth(ref.current.offsetWidth);
      }
    }
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, [ref]);

  return width;
}

export const ScrollVelocity: React.FC<ScrollVelocityProps> = ({
  scrollContainerRef,
  texts = [],
  velocity = 100,
  className = '',
  damping = 50,
  stiffness = 400,
  numCopies = 6,
  velocityMapping = { input: [0, 1000], output: [0, 5] },
  parallaxClassName = 'parallax',
  scrollerClassName = 'scroller',
  parallaxStyle,
  scrollerStyle
}) => {
  function VelocityText({
    children,
    baseVelocity = velocity,
    scrollContainerRef,
    className = '',
    damping,
    stiffness,
    numCopies,
    velocityMapping,
    parallaxClassName,
    scrollerClassName,
    parallaxStyle,
    scrollerStyle
  }: VelocityTextProps) {
    const baseX = useMotionValue(0);
    const scrollOptions = scrollContainerRef ? { container: scrollContainerRef } : {};
    const { scrollY } = useScroll(scrollOptions);
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
      damping: damping ?? 50,
      stiffness: stiffness ?? 400
    });
    const velocityFactor = useTransform(
      smoothVelocity,
      velocityMapping?.input || [0, 1000],
      velocityMapping?.output || [0, 5],
      { clamp: false }
    );

    const copyRef = useRef<HTMLSpanElement>(null);
    const copyWidth = useElementWidth(copyRef);

    function wrap(min: number, max: number, v: number): number {
      const range = max - min;
      const mod = (((v - min) % range) + range) % range;
      return mod + min;
    }

    const x = useTransform(baseX, v => {
      if (copyWidth === 0) return '0px';
      return \`\${wrap(-copyWidth, 0, v)}px\`;
    });

    const directionFactor = useRef<number>(1);
    useAnimationFrame((t, delta) => {
      let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

      if (velocityFactor.get() < 0) {
        directionFactor.current = -1;
      } else if (velocityFactor.get() > 0) {
        directionFactor.current = 1;
      }

      moveBy += directionFactor.current * moveBy * velocityFactor.get();
      baseX.set(baseX.get() + moveBy);
    });

    const spans = [];
    for (let i = 0; i < (numCopies ?? 6); i++) {
      spans.push(
        <span className={className} key={i} ref={i === 0 ? copyRef : null}>
          {children}&nbsp;
        </span>
      );
    }

    return (
      <div className={parallaxClassName} style={parallaxStyle}>
        <motion.div className={scrollerClassName} style={{ x, ...scrollerStyle }}>
          {spans}
        </motion.div>
      </div>
    );
  }

  return (
    <section>
      {texts.map((text, index) => (
        <VelocityText
          key={index}
          className={className}
          baseVelocity={index % 2 !== 0 ? -velocity : velocity}
          scrollContainerRef={scrollContainerRef}
          damping={damping}
          stiffness={stiffness}
          numCopies={numCopies}
          velocityMapping={velocityMapping}
          parallaxClassName={parallaxClassName}
          scrollerClassName={scrollerClassName}
          parallaxStyle={parallaxStyle}
          scrollerStyle={scrollerStyle}
        >
          {text}
        </VelocityText>
      ))}
    </section>
  );
};

export default ScrollVelocity;
`,wn=`import React, { useRef, useLayoutEffect, useState } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame
} from 'motion/react';

interface VelocityMapping {
  input: [number, number];
  output: [number, number];
}

interface VelocityTextProps {
  children: React.ReactNode;
  baseVelocity: number;
  scrollContainerRef?: React.RefObject<HTMLElement>;
  className?: string;
  damping?: number;
  stiffness?: number;
  numCopies?: number;
  velocityMapping?: VelocityMapping;
  parallaxClassName?: string;
  scrollerClassName?: string;
  parallaxStyle?: React.CSSProperties;
  scrollerStyle?: React.CSSProperties;
}

interface ScrollVelocityProps {
  scrollContainerRef?: React.RefObject<HTMLElement>;
  texts: React.ReactNode[];
  velocity?: number;
  className?: string;
  damping?: number;
  stiffness?: number;
  numCopies?: number;
  velocityMapping?: VelocityMapping;
  parallaxClassName?: string;
  scrollerClassName?: string;
  parallaxStyle?: React.CSSProperties;
  scrollerStyle?: React.CSSProperties;
}

function useElementWidth<T extends HTMLElement>(ref: React.RefObject<T | null>): number {
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    function updateWidth() {
      if (ref.current) {
        setWidth(ref.current.offsetWidth);
      }
    }
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, [ref]);

  return width;
}

export const ScrollVelocity: React.FC<ScrollVelocityProps> = ({
  scrollContainerRef,
  texts = [],
  velocity = 100,
  className = '',
  damping = 50,
  stiffness = 400,
  numCopies = 6,
  velocityMapping = { input: [0, 1000], output: [0, 5] },
  parallaxClassName,
  scrollerClassName,
  parallaxStyle,
  scrollerStyle
}) => {
  function VelocityText({
    children,
    baseVelocity = velocity,
    scrollContainerRef,
    className = '',
    damping,
    stiffness,
    numCopies,
    velocityMapping,
    parallaxClassName,
    scrollerClassName,
    parallaxStyle,
    scrollerStyle
  }: VelocityTextProps) {
    const baseX = useMotionValue(0);
    const scrollOptions = scrollContainerRef ? { container: scrollContainerRef } : {};
    const { scrollY } = useScroll(scrollOptions);
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
      damping: damping ?? 50,
      stiffness: stiffness ?? 400
    });
    const velocityFactor = useTransform(
      smoothVelocity,
      velocityMapping?.input || [0, 1000],
      velocityMapping?.output || [0, 5],
      { clamp: false }
    );

    const copyRef = useRef<HTMLSpanElement>(null);
    const copyWidth = useElementWidth(copyRef);

    function wrap(min: number, max: number, v: number): number {
      const range = max - min;
      const mod = (((v - min) % range) + range) % range;
      return mod + min;
    }

    const x = useTransform(baseX, v => {
      if (copyWidth === 0) return '0px';
      return \`\${wrap(-copyWidth, 0, v)}px\`;
    });

    const directionFactor = useRef<number>(1);
    useAnimationFrame((t, delta) => {
      let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

      if (velocityFactor.get() < 0) {
        directionFactor.current = -1;
      } else if (velocityFactor.get() > 0) {
        directionFactor.current = 1;
      }

      moveBy += directionFactor.current * moveBy * velocityFactor.get();
      baseX.set(baseX.get() + moveBy);
    });

    const spans = [];
    for (let i = 0; i < (numCopies ?? 6); i++) {
      spans.push(
        <span className={\`flex-shrink-0 \${className}\`} key={i} ref={i === 0 ? copyRef : null}>
          {children}&nbsp;
        </span>
      );
    }

    return (
      <div className={\`\${parallaxClassName} relative overflow-hidden\`} style={parallaxStyle}>
        <motion.div
          className={\`\${scrollerClassName} flex whitespace-nowrap text-center font-sans text-4xl font-bold tracking-[-0.02em] drop-shadow md:text-[5rem] md:leading-[5rem]\`}
          style={{ x, ...scrollerStyle }}
        >
          {spans}
        </motion.div>
      </div>
    );
  }

  return (
    <section>
      {texts.map((text, index) => (
        <VelocityText
          key={index}
          className={className}
          baseVelocity={index % 2 !== 0 ? -velocity : velocity}
          scrollContainerRef={scrollContainerRef}
          damping={damping}
          stiffness={stiffness}
          numCopies={numCopies}
          velocityMapping={velocityMapping}
          parallaxClassName={parallaxClassName}
          scrollerClassName={scrollerClassName}
          parallaxStyle={parallaxStyle}
          scrollerStyle={scrollerStyle}
        >
          {text}
        </VelocityText>
      ))}
    </section>
  );
};

export default ScrollVelocity;
`,Wn={dependencies:"motion",usage:`import ScrollVelocity from './ScrollVelocity';
  
<ScrollVelocity
  texts={['React Bits', 'Scroll Down']} 
  velocity={velocity} 
  className="custom-scroll-text"
/>`,code:Nn,css:Rn,tailwind:bn,tsCode:Vn,tsTailwind:wn},K={velocity:100,numCopies:6,damping:50,stiffness:400},$n=()=>{const{props:e,updateProp:n,resetProps:s,hasChanges:t}=Le(K),{velocity:r,numCopies:o,damping:l,stiffness:i}=e,u=m.useMemo(()=>[{name:"scrollContainerRef",type:"React.RefObject<HTMLElement>",default:"undefined",description:"Optional ref for a custom scroll container to track scroll position."},{name:"texts",type:"React.ReactNode[]",default:"[]",description:"Array of items to display as scrolling content. Accepts strings, JSX elements, icons, or any valid React node."},{name:"velocity",type:"number",default:"100",description:"Base velocity for scrolling; sign is flipped for odd indexed texts."},{name:"className",type:"string",default:'""',description:"CSS class applied to each text copy (span)."},{name:"damping",type:"number",default:"50",description:"Damping value for the spring animation."},{name:"stiffness",type:"number",default:"400",description:"Stiffness value for the spring animation."},{name:"numCopies",type:"number",default:"6",description:"Number of copies of the text rendered for a continuous scrolling effect."},{name:"velocityMapping",type:"{ input: number[]; output: number[] }",default:"{ input: [0, 1000], output: [0, 5] }",description:"Mapping from scroll velocity to a movement multiplier for dynamic scrolling."},{name:"parallaxClassName",type:"string",default:'"parallax"',description:"CSS class for the parallax container."},{name:"scrollerClassName",type:"string",default:'"scroller"',description:"CSS class for the scroller container."},{name:"parallaxStyle",type:"React.CSSProperties",default:"undefined",description:"Inline styles for the parallax container."},{name:"scrollerStyle",type:"React.CSSProperties",default:"undefined",description:"Inline styles for the scroller container."}],[]);return c.jsx(Me,{props:e,defaultProps:K,resetProps:s,hasChanges:t,children:c.jsxs(Pe,{children:[c.jsxs(Oe,{children:[c.jsx(A,{position:"relative",className:"demo-container",h:400,overflow:"hidden",children:c.jsx(Fe,{position:"relative",justifyContent:"center",alignItems:"center",children:c.jsx(Sn,{texts:["React Bits","Scroll Down"],velocity:r,numCopies:o,damping:l,stiffness:i,className:"custom-scroll-text"})})}),c.jsxs(De,{children:[c.jsx(w,{title:"Velocity",min:10,max:500,step:10,value:r,onChange:a=>n("velocity",a)}),c.jsx(w,{title:"Num Copies",min:2,max:12,step:1,value:o,onChange:a=>n("numCopies",a)}),c.jsx(w,{title:"Damping",min:10,max:100,step:5,value:l,onChange:a=>n("damping",a)}),c.jsx(w,{title:"Stiffness",min:100,max:800,step:50,value:i,onChange:a=>n("stiffness",a)})]}),c.jsx(Be,{data:u}),c.jsx(He,{dependencyList:["motion"]}),c.jsx(A,{mb:"50vh"})]}),c.jsx(je,{children:c.jsx(ze,{codeObject:Wn,componentName:"ScrollVelocity"})})]})})};export{$n as default};
