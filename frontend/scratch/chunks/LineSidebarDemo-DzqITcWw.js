import{r,j as n,B as ee}from"./index-TQprzHkU.js";import{u as ne,C as te,T as re,P as ae,a as oe,b as se,c as ie}from"./useComponentProps-CjYSqekE.js";import{C as le}from"./Customize-BdikCFm5.js";import{P as l}from"./PreviewSlider-CCbi2och.js";import{P as G}from"./PreviewSwitch-CcPSwIGg.js";import{P as ce}from"./PreviewSelect-DZgUm0jD.js";import{P as O}from"./PreviewColorPickerCustom-BFsDkSOr.js";import"./index-DQmtNYX5.js";import"./CodeHighlighter-Dx4QNbvH.js";import"./rotate-ccw-_xDu3G0k.js";/* empty css                       */const X={linear:a=>a,smooth:a=>a*a*(3-2*a),sharp:a=>a*a*a},me=["Overview","Components","Animations","Backgrounds","Showcase","Playground","Templates","Changelog","Community","Resources","Documentation","Support"],fe=({items:a=me,accentColor:t="#A855F7",textColor:F="#c4c4c4",markerColor:y="#6c6c6c",showIndex:M=!0,showMarker:x=!0,proximityRadius:k=100,maxShift:_=30,falloff:v="smooth",markerLength:A=60,markerGap:P=0,tickScale:I=.5,scaleTick:T=!0,itemGap:$=20,fontSize:E=1.1,smoothing:u=100,defaultActive:b=null,onItemClick:c,className:R=""})=>{const C=r.useRef(null),e=r.useRef([]),S=r.useRef([]),Y=r.useRef([]),p=r.useRef(null),N=r.useRef(0),D=r.useRef(b),V=r.useRef(u),[j,J]=r.useState(b);D.current=j,V.current=u;const U=r.useCallback(i=>{const o=Math.min((i-N.current)/1e3,.05);N.current=i;const d=Math.max(V.current,1)/1e3,z=1-Math.exp(-o/d);let L=!1;const h=e.current;for(let s=0;s<h.length;s++){const f=h[s];if(!f)continue;const g=Math.max(S.current[s]||0,D.current===s?1:0),w=Y.current[s]||0,B=w+(g-w)*z,H=Math.abs(g-B)<.0015,q=H?g:B;Y.current[s]=q,f.style.setProperty("--effect",q.toFixed(4)),H||(L=!0)}p.current=L?requestAnimationFrame(U):null},[]),m=r.useCallback(()=>{p.current==null&&(N.current=performance.now(),p.current=requestAnimationFrame(U))},[U]),K=r.useCallback(i=>{const o=C.current;if(!o)return;const d=o.getBoundingClientRect(),z=i.clientY-d.top,L=X[v]??X.linear,h=e.current;for(let s=0;s<h.length;s++){const f=h[s];if(!f)continue;const g=f.offsetTop+f.offsetHeight/2,w=Math.abs(z-g);S.current[s]=L(Math.max(0,1-w/k))}m()},[v,k,m]),Q=r.useCallback(()=>{S.current=S.current.map(()=>0),m()},[m]),Z=r.useCallback((i,o)=>{J(i),c==null||c(i,o)},[c]);return r.useEffect(()=>{m()},[j,m]),r.useEffect(()=>()=>{p.current!=null&&cancelAnimationFrame(p.current)},[]),n.jsx("nav",{className:`line-sidebar${x?" line-sidebar--markers":""}${T?" line-sidebar--scale-tick":""}${R?` ${R}`:""}`,style:{"--accent-color":t,"--text-color":F,"--marker-color":y,"--marker-length":`${A}px`,"--marker-gap":`${P}px`,"--tick-scale":I,"--max-shift":`${_}px`,"--item-gap":`${$}px`,"--font-size":`${E}rem`,"--smoothing":`${u}ms`},children:n.jsx("ul",{ref:C,className:"line-sidebar__list",onPointerMove:K,onPointerLeave:Q,children:a.map((i,o)=>n.jsxs("li",{ref:d=>{e.current[o]=d},className:"line-sidebar__item","aria-current":j===o?"true":void 0,onClick:()=>Z(o,i),children:[x&&n.jsx("span",{className:"line-sidebar__marker","aria-hidden":"true"}),n.jsxs("span",{className:"line-sidebar__label",children:[M&&n.jsx("span",{className:"line-sidebar__index",children:String(o+1).padStart(2,"0")}),n.jsx("span",{className:"line-sidebar__text",children:i})]})]},`${i}-${o}`))})})},ue=`import { useRef, useState, useCallback, useEffect } from 'react';
import './LineSidebar.css';

const FALLOFF_CURVES = {
  linear: p => p,
  smooth: p => p * p * (3 - 2 * p),
  sharp: p => p * p * p
};

const DEFAULT_ITEMS = [
  'Overview',
  'Components',
  'Animations',
  'Backgrounds',
  'Showcase',
  'Playground',
  'Templates',
  'Changelog',
  'Community',
  'Resources',
  'Documentation',
  'Support'
];

const LineSidebar = ({
  items = DEFAULT_ITEMS,
  accentColor = '#A855F7',
  textColor = '#c4c4c4',
  markerColor = '#6c6c6c',
  showIndex = true,
  showMarker = true,
  proximityRadius = 100,
  maxShift = 30,
  falloff = 'smooth',
  markerLength = 60,
  markerGap = 0,
  tickScale = 0.5,
  scaleTick = true,
  itemGap = 20,
  fontSize = 1.1,
  smoothing = 100,
  defaultActive = null,
  onItemClick,
  className = ''
}) => {
  const listRef = useRef(null);
  const itemRefs = useRef([]);
  const targetsRef = useRef([]);
  const currentRef = useRef([]);
  const rafRef = useRef(null);
  const lastRef = useRef(0);
  const activeRef = useRef(defaultActive);
  const smoothingRef = useRef(smoothing);
  const [activeIndex, setActiveIndex] = useState(defaultActive);

  activeRef.current = activeIndex;
  smoothingRef.current = smoothing;

  // Single rAF loop that eases every item's --effect toward its target using
  // frame-rate independent exponential smoothing, so color, shift and scale
  // all move together without staggering CSS transitions.
  const runFrame = useCallback(now => {
    const dt = Math.min((now - lastRef.current) / 1000, 0.05);
    lastRef.current = now;
    const tau = Math.max(smoothingRef.current, 1) / 1000;
    const k = 1 - Math.exp(-dt / tau);

    let moving = false;
    const items = itemRefs.current;
    for (let i = 0; i < items.length; i++) {
      const el = items[i];
      if (!el) continue;
      const target = Math.max(targetsRef.current[i] || 0, activeRef.current === i ? 1 : 0);
      const cur = currentRef.current[i] || 0;
      const next = cur + (target - cur) * k;
      const settled = Math.abs(target - next) < 0.0015;
      const value = settled ? target : next;
      currentRef.current[i] = value;
      el.style.setProperty('--effect', value.toFixed(4));
      if (!settled) moving = true;
    }

    rafRef.current = moving ? requestAnimationFrame(runFrame) : null;
  }, []);

  const startLoop = useCallback(() => {
    if (rafRef.current != null) return;
    lastRef.current = performance.now();
    rafRef.current = requestAnimationFrame(runFrame);
  }, [runFrame]);

  const handlePointerMove = useCallback(
    e => {
      const list = listRef.current;
      if (!list) return;
      const rect = list.getBoundingClientRect();
      const pointerY = e.clientY - rect.top;
      const ease = FALLOFF_CURVES[falloff] ?? FALLOFF_CURVES.linear;
      const items = itemRefs.current;
      for (let i = 0; i < items.length; i++) {
        const el = items[i];
        if (!el) continue;
        const center = el.offsetTop + el.offsetHeight / 2;
        const distance = Math.abs(pointerY - center);
        targetsRef.current[i] = ease(Math.max(0, 1 - distance / proximityRadius));
      }
      startLoop();
    },
    [falloff, proximityRadius, startLoop]
  );

  const handlePointerLeave = useCallback(() => {
    targetsRef.current = targetsRef.current.map(() => 0);
    startLoop();
  }, [startLoop]);

  const handleClick = useCallback(
    (index, label) => {
      setActiveIndex(index);
      onItemClick?.(index, label);
    },
    [onItemClick]
  );

  useEffect(() => {
    startLoop();
  }, [activeIndex, startLoop]);

  useEffect(
    () => () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    },
    []
  );

  return (
    <nav
      className={\`line-sidebar\${showMarker ? ' line-sidebar--markers' : ''}\${scaleTick ? ' line-sidebar--scale-tick' : ''}\${className ? \` \${className}\` : ''}\`}
      style={{
        '--accent-color': accentColor,
        '--text-color': textColor,
        '--marker-color': markerColor,
        '--marker-length': \`\${markerLength}px\`,
        '--marker-gap': \`\${markerGap}px\`,
        '--tick-scale': tickScale,
        '--max-shift': \`\${maxShift}px\`,
        '--item-gap': \`\${itemGap}px\`,
        '--font-size': \`\${fontSize}rem\`,
        '--smoothing': \`\${smoothing}ms\`
      }}
    >
      <ul ref={listRef} className="line-sidebar__list" onPointerMove={handlePointerMove} onPointerLeave={handlePointerLeave}>
        {items.map((label, index) => (
          <li
            key={\`\${label}-\${index}\`}
            ref={el => {
              itemRefs.current[index] = el;
            }}
            className="line-sidebar__item"
            aria-current={activeIndex === index ? 'true' : undefined}
            onClick={() => handleClick(index, label)}
          >
            {showMarker && <span className="line-sidebar__marker" aria-hidden="true" />}
            <span className="line-sidebar__label">
              {showIndex && <span className="line-sidebar__index">{String(index + 1).padStart(2, '0')}</span>}
              <span className="line-sidebar__text">{label}</span>
            </span>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default LineSidebar;
`,pe=`.line-sidebar {
  --accent-color: #a855f7;
  --text-color: #c4c4c4;
  --marker-color: #6c6c6c;
  --marker-length: 60px;
  --marker-gap: 0px;
  --tick-scale: 0.5;
  --max-shift: 30px;
  --item-gap: 20px;
  --font-size: 1.1rem;
  --smoothing: 100ms;

  position: relative;
  display: flex;
  justify-content: flex-start;
}

.line-sidebar--markers {
  padding-left: calc(var(--marker-length) + var(--marker-gap));
}

.line-sidebar__list {
  list-style: none;
  margin: 0;
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  gap: var(--item-gap);
}

/* --effect (0..1) is driven per item by a rAF lerp in JS, so every derived
   property below reads the same continuously-animating value and stays in
   step, with no CSS transitions to stagger. */
.line-sidebar__item {
  position: relative;
  cursor: pointer;
}

/* Widen the pointer target so items react a touch before the cursor arrives */
.line-sidebar__item::before {
  content: '';
  position: absolute;
  inset: -6px -48px;
}

.line-sidebar__label {
  position: relative;
  display: inline-flex;
  align-items: baseline;
  font-size: var(--font-size);
  line-height: 1.2;
  color: color-mix(in srgb, var(--accent-color) calc(var(--effect, 0) * 100%), var(--text-color));
  transform: translateX(calc(var(--effect, 0) * var(--max-shift)));
}

.line-sidebar__index {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  margin-right: 0.6rem;
  font-size: 0.85em;
  opacity: calc(0.55 + var(--effect, 0) * 0.45);
}

.line-sidebar__marker {
  position: absolute;
  top: 50%;
  left: calc(-1 * var(--marker-length) - var(--marker-gap));
  height: 1px;
  width: var(--marker-length);
  background-color: color-mix(in srgb, var(--accent-color) calc(var(--effect, 0) * 100%), var(--marker-color));
  transform-origin: left center;
  transform: translateY(-50%) scaleX(calc(0.7 + var(--effect, 0) * 0.5));
}

/* Short static tick centered in the gap between two menu items */
.line-sidebar--markers .line-sidebar__item:not(:last-child)::after {
  content: '';
  position: absolute;
  top: calc(100% + var(--item-gap) / 2);
  left: calc(-1 * var(--marker-length) - var(--marker-gap));
  height: 1px;
  width: calc(var(--marker-length) * var(--tick-scale));
  background-color: var(--marker-color);
  opacity: 0.5;
  transform: translateY(-50%);
}

/* When enabled, the in-between ticks grow with cursor proximity too */
.line-sidebar--scale-tick .line-sidebar__item:not(:last-child)::after {
  transform-origin: left center;
  transform: translateY(-50%) scaleX(calc(0.7 + var(--effect, 0) * 0.6));
}
`,de=`import { useRef, useState, useCallback, useEffect } from 'react';

const FALLOFF_CURVES = {
  linear: p => p,
  smooth: p => p * p * (3 - 2 * p),
  sharp: p => p * p * p
};

const DEFAULT_ITEMS = [
  'Overview',
  'Components',
  'Animations',
  'Backgrounds',
  'Showcase',
  'Playground',
  'Templates',
  'Changelog',
  'Community',
  'Resources',
  'Documentation',
  'Support'
];

const LineSidebar = ({
  items = DEFAULT_ITEMS,
  accentColor = '#A855F7',
  textColor = '#c4c4c4',
  markerColor = '#6c6c6c',
  showIndex = true,
  showMarker = true,
  proximityRadius = 100,
  maxShift = 30,
  falloff = 'smooth',
  markerLength = 60,
  markerGap = 0,
  tickScale = 0.5,
  scaleTick = true,
  itemGap = 20,
  fontSize = 1.1,
  smoothing = 100,
  defaultActive = null,
  onItemClick,
  className = ''
}) => {
  const listRef = useRef(null);
  const itemRefs = useRef([]);
  const targetsRef = useRef([]);
  const currentRef = useRef([]);
  const rafRef = useRef(null);
  const lastRef = useRef(0);
  const activeRef = useRef(defaultActive);
  const smoothingRef = useRef(smoothing);
  const [activeIndex, setActiveIndex] = useState(defaultActive);

  activeRef.current = activeIndex;
  smoothingRef.current = smoothing;

  // Single rAF loop that eases every item's --effect toward its target using
  // frame-rate independent exponential smoothing, so color, shift and scale
  // all move together without staggering CSS transitions.
  const runFrame = useCallback(now => {
    const dt = Math.min((now - lastRef.current) / 1000, 0.05);
    lastRef.current = now;
    const tau = Math.max(smoothingRef.current, 1) / 1000;
    const k = 1 - Math.exp(-dt / tau);

    let moving = false;
    const items = itemRefs.current;
    for (let i = 0; i < items.length; i++) {
      const el = items[i];
      if (!el) continue;
      const target = Math.max(targetsRef.current[i] || 0, activeRef.current === i ? 1 : 0);
      const cur = currentRef.current[i] || 0;
      const next = cur + (target - cur) * k;
      const settled = Math.abs(target - next) < 0.0015;
      const value = settled ? target : next;
      currentRef.current[i] = value;
      el.style.setProperty('--effect', value.toFixed(4));
      if (!settled) moving = true;
    }

    rafRef.current = moving ? requestAnimationFrame(runFrame) : null;
  }, []);

  const startLoop = useCallback(() => {
    if (rafRef.current != null) return;
    lastRef.current = performance.now();
    rafRef.current = requestAnimationFrame(runFrame);
  }, [runFrame]);

  const handlePointerMove = useCallback(
    e => {
      const list = listRef.current;
      if (!list) return;
      const rect = list.getBoundingClientRect();
      const pointerY = e.clientY - rect.top;
      const ease = FALLOFF_CURVES[falloff] ?? FALLOFF_CURVES.linear;
      const items = itemRefs.current;
      for (let i = 0; i < items.length; i++) {
        const el = items[i];
        if (!el) continue;
        const center = el.offsetTop + el.offsetHeight / 2;
        const distance = Math.abs(pointerY - center);
        targetsRef.current[i] = ease(Math.max(0, 1 - distance / proximityRadius));
      }
      startLoop();
    },
    [falloff, proximityRadius, startLoop]
  );

  const handlePointerLeave = useCallback(() => {
    targetsRef.current = targetsRef.current.map(() => 0);
    startLoop();
  }, [startLoop]);

  const handleClick = useCallback(
    (index, label) => {
      setActiveIndex(index);
      onItemClick?.(index, label);
    },
    [onItemClick]
  );

  useEffect(() => {
    startLoop();
  }, [activeIndex, startLoop]);

  useEffect(
    () => () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    },
    []
  );

  const tickClass = showMarker
    ? \`after:absolute after:left-[calc(-1*var(--marker-length)-var(--marker-gap))] after:top-[calc(100%+var(--item-gap)/2)] after:h-px after:opacity-50 after:content-[''] last:after:content-none after:[background-color:var(--marker-color)] after:[width:calc(var(--marker-length)*var(--tick-scale))] \${
        scaleTick
          ? "after:origin-left after:[transform:translateY(-50%)_scaleX(calc(0.7+var(--effect,0)*0.6))]"
          : 'after:-translate-y-1/2'
      }\`
    : '';

  return (
    <nav
      className={\`relative flex justify-start\${showMarker ? ' [padding-left:calc(var(--marker-length)+var(--marker-gap))]' : ''}\${className ? \` \${className}\` : ''}\`}
      style={{
        '--accent-color': accentColor,
        '--text-color': textColor,
        '--marker-color': markerColor,
        '--marker-length': \`\${markerLength}px\`,
        '--marker-gap': \`\${markerGap}px\`,
        '--tick-scale': tickScale,
        '--max-shift': \`\${maxShift}px\`,
        '--item-gap': \`\${itemGap}px\`,
        '--font-size': \`\${fontSize}rem\`,
        '--smoothing': \`\${smoothing}ms\`
      }}
    >
      <ul
        ref={listRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className="m-0 flex list-none flex-col py-4 [gap:var(--item-gap)]"
      >
        {items.map((label, index) => (
          <li
            key={\`\${label}-\${index}\`}
            ref={el => {
              itemRefs.current[index] = el;
            }}
            aria-current={activeIndex === index ? 'true' : undefined}
            onClick={() => handleClick(index, label)}
            className={\`relative cursor-pointer before:absolute before:-inset-x-12 before:-inset-y-[6px] before:content-[''] \${tickClass}\`}
          >
            {showMarker && (
              <span
                aria-hidden="true"
                className="absolute left-[calc(-1*var(--marker-length)-var(--marker-gap))] top-1/2 h-px w-[length:var(--marker-length)] origin-left [background-color:color-mix(in_srgb,var(--accent-color)_calc(var(--effect,0)*100%),var(--marker-color))] [transform:translateY(-50%)_scaleX(calc(0.7+var(--effect,0)*0.5))]"
              />
            )}
            <span className="relative inline-flex items-baseline leading-[1.2] [color:color-mix(in_srgb,var(--accent-color)_calc(var(--effect,0)*100%),var(--text-color))] [font-size:var(--font-size)] [transform:translateX(calc(var(--effect,0)*var(--max-shift)))]">
              {showIndex && (
                <span className="mr-[0.6rem] font-mono text-[0.85em] [opacity:calc(0.55+var(--effect,0)*0.45)]">
                  {String(index + 1).padStart(2, '0')}
                </span>
              )}
              <span>{label}</span>
            </span>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default LineSidebar;
`,he=`import { useRef, useState, useCallback, useEffect, CSSProperties } from 'react';
import './LineSidebar.css';

type Falloff = 'linear' | 'smooth' | 'sharp';

export interface LineSidebarProps {
  items?: string[];
  accentColor?: string;
  textColor?: string;
  markerColor?: string;
  showIndex?: boolean;
  showMarker?: boolean;
  proximityRadius?: number;
  maxShift?: number;
  falloff?: Falloff;
  markerLength?: number;
  markerGap?: number;
  tickScale?: number;
  scaleTick?: boolean;
  itemGap?: number;
  fontSize?: number;
  smoothing?: number;
  defaultActive?: number | null;
  onItemClick?: (index: number, label: string) => void;
  className?: string;
}

const FALLOFF_CURVES: Record<Falloff, (p: number) => number> = {
  linear: p => p,
  smooth: p => p * p * (3 - 2 * p),
  sharp: p => p * p * p
};

const DEFAULT_ITEMS = [
  'Overview',
  'Components',
  'Animations',
  'Backgrounds',
  'Showcase',
  'Playground',
  'Templates',
  'Changelog',
  'Community',
  'Resources',
  'Documentation',
  'Support'
];

const LineSidebar = ({
  items = DEFAULT_ITEMS,
  accentColor = '#A855F7',
  textColor = '#c4c4c4',
  markerColor = '#6c6c6c',
  showIndex = true,
  showMarker = true,
  proximityRadius = 100,
  maxShift = 30,
  falloff = 'smooth',
  markerLength = 60,
  markerGap = 0,
  tickScale = 0.5,
  scaleTick = true,
  itemGap = 20,
  fontSize = 1.1,
  smoothing = 100,
  defaultActive = null,
  onItemClick,
  className = ''
}: LineSidebarProps) => {
  const listRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const targetsRef = useRef<number[]>([]);
  const currentRef = useRef<number[]>([]);
  const rafRef = useRef<number | null>(null);
  const lastRef = useRef(0);
  const activeRef = useRef<number | null>(defaultActive);
  const smoothingRef = useRef(smoothing);
  const [activeIndex, setActiveIndex] = useState<number | null>(defaultActive);

  activeRef.current = activeIndex;
  smoothingRef.current = smoothing;

  // Single rAF loop that eases every item's --effect toward its target using
  // frame-rate independent exponential smoothing, so color, shift and scale
  // all move together without staggering CSS transitions.
  const runFrame = useCallback((now: number) => {
    const dt = Math.min((now - lastRef.current) / 1000, 0.05);
    lastRef.current = now;
    const tau = Math.max(smoothingRef.current, 1) / 1000;
    const k = 1 - Math.exp(-dt / tau);

    let moving = false;
    const items = itemRefs.current;
    for (let i = 0; i < items.length; i++) {
      const el = items[i];
      if (!el) continue;
      const target = Math.max(targetsRef.current[i] || 0, activeRef.current === i ? 1 : 0);
      const cur = currentRef.current[i] || 0;
      const next = cur + (target - cur) * k;
      const settled = Math.abs(target - next) < 0.0015;
      const value = settled ? target : next;
      currentRef.current[i] = value;
      el.style.setProperty('--effect', value.toFixed(4));
      if (!settled) moving = true;
    }

    rafRef.current = moving ? requestAnimationFrame(runFrame) : null;
  }, []);

  const startLoop = useCallback(() => {
    if (rafRef.current != null) return;
    lastRef.current = performance.now();
    rafRef.current = requestAnimationFrame(runFrame);
  }, [runFrame]);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLUListElement>) => {
      const list = listRef.current;
      if (!list) return;
      const rect = list.getBoundingClientRect();
      const pointerY = e.clientY - rect.top;
      const ease = FALLOFF_CURVES[falloff] ?? FALLOFF_CURVES.linear;
      const items = itemRefs.current;
      for (let i = 0; i < items.length; i++) {
        const el = items[i];
        if (!el) continue;
        const center = el.offsetTop + el.offsetHeight / 2;
        const distance = Math.abs(pointerY - center);
        targetsRef.current[i] = ease(Math.max(0, 1 - distance / proximityRadius));
      }
      startLoop();
    },
    [falloff, proximityRadius, startLoop]
  );

  const handlePointerLeave = useCallback(() => {
    targetsRef.current = targetsRef.current.map(() => 0);
    startLoop();
  }, [startLoop]);

  const handleClick = useCallback(
    (index: number, label: string) => {
      setActiveIndex(index);
      onItemClick?.(index, label);
    },
    [onItemClick]
  );

  useEffect(() => {
    startLoop();
  }, [activeIndex, startLoop]);

  useEffect(
    () => () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    },
    []
  );

  return (
    <nav
      className={\`line-sidebar\${showMarker ? ' line-sidebar--markers' : ''}\${scaleTick ? ' line-sidebar--scale-tick' : ''}\${className ? \` \${className}\` : ''}\`}
      style={
        {
          '--accent-color': accentColor,
          '--text-color': textColor,
          '--marker-color': markerColor,
          '--marker-length': \`\${markerLength}px\`,
          '--marker-gap': \`\${markerGap}px\`,
          '--tick-scale': tickScale,
          '--max-shift': \`\${maxShift}px\`,
          '--item-gap': \`\${itemGap}px\`,
          '--font-size': \`\${fontSize}rem\`,
          '--smoothing': \`\${smoothing}ms\`
        } as CSSProperties
      }
    >
      <ul ref={listRef} className="line-sidebar__list" onPointerMove={handlePointerMove} onPointerLeave={handlePointerLeave}>
        {items.map((label, index) => (
          <li
            key={\`\${label}-\${index}\`}
            ref={el => {
              itemRefs.current[index] = el;
            }}
            className="line-sidebar__item"
            aria-current={activeIndex === index ? 'true' : undefined}
            onClick={() => handleClick(index, label)}
          >
            {showMarker && <span className="line-sidebar__marker" aria-hidden="true" />}
            <span className="line-sidebar__label">
              {showIndex && <span className="line-sidebar__index">{String(index + 1).padStart(2, '0')}</span>}
              <span className="line-sidebar__text">{label}</span>
            </span>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default LineSidebar;
`,ge=`import { useRef, useState, useCallback, useEffect, CSSProperties } from 'react';

type Falloff = 'linear' | 'smooth' | 'sharp';

export interface LineSidebarProps {
  items?: string[];
  accentColor?: string;
  textColor?: string;
  markerColor?: string;
  showIndex?: boolean;
  showMarker?: boolean;
  proximityRadius?: number;
  maxShift?: number;
  falloff?: Falloff;
  markerLength?: number;
  markerGap?: number;
  tickScale?: number;
  scaleTick?: boolean;
  itemGap?: number;
  fontSize?: number;
  smoothing?: number;
  defaultActive?: number | null;
  onItemClick?: (index: number, label: string) => void;
  className?: string;
}

const FALLOFF_CURVES: Record<Falloff, (p: number) => number> = {
  linear: p => p,
  smooth: p => p * p * (3 - 2 * p),
  sharp: p => p * p * p
};

const DEFAULT_ITEMS = [
  'Overview',
  'Components',
  'Animations',
  'Backgrounds',
  'Showcase',
  'Playground',
  'Templates',
  'Changelog',
  'Community',
  'Resources',
  'Documentation',
  'Support'
];

const LineSidebar = ({
  items = DEFAULT_ITEMS,
  accentColor = '#A855F7',
  textColor = '#c4c4c4',
  markerColor = '#6c6c6c',
  showIndex = true,
  showMarker = true,
  proximityRadius = 100,
  maxShift = 30,
  falloff = 'smooth',
  markerLength = 60,
  markerGap = 0,
  tickScale = 0.5,
  scaleTick = true,
  itemGap = 20,
  fontSize = 1.1,
  smoothing = 100,
  defaultActive = null,
  onItemClick,
  className = ''
}: LineSidebarProps) => {
  const listRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const targetsRef = useRef<number[]>([]);
  const currentRef = useRef<number[]>([]);
  const rafRef = useRef<number | null>(null);
  const lastRef = useRef(0);
  const activeRef = useRef<number | null>(defaultActive);
  const smoothingRef = useRef(smoothing);
  const [activeIndex, setActiveIndex] = useState<number | null>(defaultActive);

  activeRef.current = activeIndex;
  smoothingRef.current = smoothing;

  // Single rAF loop that eases every item's --effect toward its target using
  // frame-rate independent exponential smoothing, so color, shift and scale
  // all move together without staggering CSS transitions.
  const runFrame = useCallback((now: number) => {
    const dt = Math.min((now - lastRef.current) / 1000, 0.05);
    lastRef.current = now;
    const tau = Math.max(smoothingRef.current, 1) / 1000;
    const k = 1 - Math.exp(-dt / tau);

    let moving = false;
    const items = itemRefs.current;
    for (let i = 0; i < items.length; i++) {
      const el = items[i];
      if (!el) continue;
      const target = Math.max(targetsRef.current[i] || 0, activeRef.current === i ? 1 : 0);
      const cur = currentRef.current[i] || 0;
      const next = cur + (target - cur) * k;
      const settled = Math.abs(target - next) < 0.0015;
      const value = settled ? target : next;
      currentRef.current[i] = value;
      el.style.setProperty('--effect', value.toFixed(4));
      if (!settled) moving = true;
    }

    rafRef.current = moving ? requestAnimationFrame(runFrame) : null;
  }, []);

  const startLoop = useCallback(() => {
    if (rafRef.current != null) return;
    lastRef.current = performance.now();
    rafRef.current = requestAnimationFrame(runFrame);
  }, [runFrame]);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLUListElement>) => {
      const list = listRef.current;
      if (!list) return;
      const rect = list.getBoundingClientRect();
      const pointerY = e.clientY - rect.top;
      const ease = FALLOFF_CURVES[falloff] ?? FALLOFF_CURVES.linear;
      const items = itemRefs.current;
      for (let i = 0; i < items.length; i++) {
        const el = items[i];
        if (!el) continue;
        const center = el.offsetTop + el.offsetHeight / 2;
        const distance = Math.abs(pointerY - center);
        targetsRef.current[i] = ease(Math.max(0, 1 - distance / proximityRadius));
      }
      startLoop();
    },
    [falloff, proximityRadius, startLoop]
  );

  const handlePointerLeave = useCallback(() => {
    targetsRef.current = targetsRef.current.map(() => 0);
    startLoop();
  }, [startLoop]);

  const handleClick = useCallback(
    (index: number, label: string) => {
      setActiveIndex(index);
      onItemClick?.(index, label);
    },
    [onItemClick]
  );

  useEffect(() => {
    startLoop();
  }, [activeIndex, startLoop]);

  useEffect(
    () => () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    },
    []
  );

  const tickClass = showMarker
    ? \`after:absolute after:left-[calc(-1*var(--marker-length)-var(--marker-gap))] after:top-[calc(100%+var(--item-gap)/2)] after:h-px after:opacity-50 after:content-[''] last:after:content-none after:[background-color:var(--marker-color)] after:[width:calc(var(--marker-length)*var(--tick-scale))] \${
        scaleTick
          ? "after:origin-left after:[transform:translateY(-50%)_scaleX(calc(0.7+var(--effect,0)*0.6))]"
          : 'after:-translate-y-1/2'
      }\`
    : '';

  return (
    <nav
      className={\`relative flex justify-start\${showMarker ? ' [padding-left:calc(var(--marker-length)+var(--marker-gap))]' : ''}\${className ? \` \${className}\` : ''}\`}
      style={
        {
          '--accent-color': accentColor,
          '--text-color': textColor,
          '--marker-color': markerColor,
          '--marker-length': \`\${markerLength}px\`,
          '--marker-gap': \`\${markerGap}px\`,
          '--tick-scale': tickScale,
          '--max-shift': \`\${maxShift}px\`,
          '--item-gap': \`\${itemGap}px\`,
          '--font-size': \`\${fontSize}rem\`,
          '--smoothing': \`\${smoothing}ms\`
        } as CSSProperties
      }
    >
      <ul
        ref={listRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className="m-0 flex list-none flex-col py-4 [gap:var(--item-gap)]"
      >
        {items.map((label, index) => (
          <li
            key={\`\${label}-\${index}\`}
            ref={el => {
              itemRefs.current[index] = el;
            }}
            aria-current={activeIndex === index ? 'true' : undefined}
            onClick={() => handleClick(index, label)}
            className={\`relative cursor-pointer before:absolute before:-inset-x-12 before:-inset-y-[6px] before:content-[''] \${tickClass}\`}
          >
            {showMarker && (
              <span
                aria-hidden="true"
                className="absolute left-[calc(-1*var(--marker-length)-var(--marker-gap))] top-1/2 h-px w-[length:var(--marker-length)] origin-left [background-color:color-mix(in_srgb,var(--accent-color)_calc(var(--effect,0)*100%),var(--marker-color))] [transform:translateY(-50%)_scaleX(calc(0.7+var(--effect,0)*0.5))]"
              />
            )}
            <span className="relative inline-flex items-baseline leading-[1.2] [color:color-mix(in_srgb,var(--accent-color)_calc(var(--effect,0)*100%),var(--text-color))] [font-size:var(--font-size)] [transform:translateX(calc(var(--effect,0)*var(--max-shift)))]">
              {showIndex && (
                <span className="mr-[0.6rem] font-mono text-[0.85em] [opacity:calc(0.55+var(--effect,0)*0.45)]">
                  {String(index + 1).padStart(2, '0')}
                </span>
              )}
              <span>{label}</span>
            </span>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default LineSidebar;
`,xe={usage:`import LineSidebar from './LineSidebar';

<LineSidebar
  items={['Overview', 'Components', 'Animations', 'Backgrounds', 'Showcase']}
  accentColor="#A855F7"
  textColor="#c4c4c4"
  markerColor="#6c6c6c"
  showIndex
  showMarker
  proximityRadius={100}
  maxShift={30}
  falloff="smooth"
  markerLength={60}
  markerGap={0}
  tickScale={0.5}
  scaleTick
  itemGap={20}
  fontSize={1.1}
  smoothing={100}
  defaultActive={0}
  onItemClick={(index, label) => console.log(index, label)}
/>`,code:ue,css:pe,tailwind:de,tsCode:he,tsTailwind:ge},W={accentColor:"#A855F7",textColor:"#c4c4c4",markerColor:"#6c6c6c",showIndex:!0,showMarker:!0,proximityRadius:100,maxShift:30,falloff:"smooth",markerLength:60,markerGap:0,tickScale:.5,scaleTick:!0,itemGap:20,fontSize:1.1,smoothing:100},ke=["Overview","Components","Animations","Backgrounds","Showcase","Playground","Templates","Changelog"],ve=[{value:"linear",label:"Linear"},{value:"smooth",label:"Smooth"},{value:"sharp",label:"Sharp"}],Pe=()=>{const{props:a,updateProp:t,resetProps:F,hasChanges:y}=ne(W),{accentColor:M,textColor:x,markerColor:k,showIndex:_,showMarker:v,proximityRadius:A,maxShift:P,falloff:I,markerLength:T,markerGap:$,tickScale:E,scaleTick:u,itemGap:b,fontSize:c,smoothing:R}=a,C=r.useMemo(()=>[{name:"items",type:"string[]",default:"[...]",description:"Labels rendered as the list of sidebar entries."},{name:"accentColor",type:"string",default:'"#A855F7"',description:"Color items and markers shift toward as the cursor gets close."},{name:"textColor",type:"string",default:'"#c4c4c4"',description:"Resting color of the item labels."},{name:"markerColor",type:"string",default:'"#6c6c6c"',description:"Resting color of the leading marker lines."},{name:"showIndex",type:"boolean",default:"true",description:"Show the zero-padded index before each label."},{name:"showMarker",type:"boolean",default:"true",description:"Show the marker lines (and short ticks) beside each item."},{name:"proximityRadius",type:"number",default:"100",description:"Vertical distance in pixels within which the cursor influences an item."},{name:"maxShift",type:"number",default:"30",description:"Maximum horizontal shift in pixels the label slides at full proximity."},{name:"falloff",type:'"linear" | "smooth" | "sharp"',default:'"smooth"',description:"Curve mapping cursor distance to the proximity effect."},{name:"markerLength",type:"number",default:"60",description:"Length in pixels of the marker line; the in-between ticks scale from this too."},{name:"markerGap",type:"number",default:"0",description:"Gap in pixels between the labels and the markers."},{name:"tickScale",type:"number",default:"0.5",description:"Length of the in-between ticks as a fraction of markerLength."},{name:"scaleTick",type:"boolean",default:"true",description:"When true, the in-between ticks also grow with cursor proximity."},{name:"itemGap",type:"number",default:"20",description:"Vertical gap between items in pixels."},{name:"fontSize",type:"number",default:"1.1",description:"Font size of the labels in rem."},{name:"smoothing",type:"number",default:"100",description:"Transition duration in milliseconds for the proximity response."},{name:"defaultActive",type:"number | null",default:"null",description:"Index of the item selected on mount."},{name:"onItemClick",type:"(index, label) => void",default:"-",description:"Called when an item is clicked; the clicked item also becomes active."},{name:"className",type:"string",default:'""',description:"Additional CSS classes for the outer wrapper."}],[]);return n.jsx(te,{props:a,defaultProps:W,resetProps:F,hasChanges:y,children:n.jsxs(re,{children:[n.jsxs(ae,{children:[n.jsx(ee,{position:"relative",className:"demo-container",h:500,overflow:"hidden",display:"flex",alignItems:"center",justifyContent:"flex-start",pl:{base:6,md:12},py:12,children:n.jsx(fe,{...a,items:ke})}),n.jsxs(le,{children:[n.jsx(O,{title:"Accent",color:M,onChange:e=>t("accentColor",e)}),n.jsx(O,{title:"Text",color:x,onChange:e=>t("textColor",e)}),n.jsx(O,{title:"Marker",color:k,onChange:e=>t("markerColor",e)}),n.jsx(ce,{title:"Falloff",options:ve,value:I,onChange:e=>t("falloff",e),width:140}),n.jsx(l,{title:"Proximity Radius",min:40,max:280,step:5,value:A,valueUnit:"px",onChange:e=>t("proximityRadius",e)}),n.jsx(l,{title:"Max Shift",min:0,max:60,step:1,value:P,valueUnit:"px",onChange:e=>t("maxShift",e)}),n.jsx(l,{title:"Marker Length",min:20,max:200,step:5,value:T,valueUnit:"px",onChange:e=>t("markerLength",e)}),n.jsx(l,{title:"Marker Gap",min:0,max:60,step:1,value:$,valueUnit:"px",onChange:e=>t("markerGap",e)}),n.jsx(l,{title:"Tick Scale",min:0,max:1,step:.02,value:E,onChange:e=>t("tickScale",e)}),n.jsx(l,{title:"Item Gap",min:4,max:48,step:1,value:b,valueUnit:"px",onChange:e=>t("itemGap",e)}),n.jsx(l,{title:"Font Size",min:.8,max:2,step:.05,value:c,valueUnit:"rem",onChange:e=>t("fontSize",e)}),n.jsx(l,{title:"Smoothing",min:0,max:800,step:20,value:R,valueUnit:"ms",onChange:e=>t("smoothing",e)}),n.jsx(G,{title:"Show Index",isChecked:_,onChange:e=>t("showIndex",e)}),n.jsx(G,{title:"Show Marker",isChecked:v,onChange:e=>t("showMarker",e)}),n.jsx(G,{title:"Scale Ticks",isChecked:u,onChange:e=>t("scaleTick",e)})]}),n.jsx(oe,{data:C})]}),n.jsx(se,{children:n.jsx(ie,{codeObject:xe,componentName:"LineSidebar"})})]})})};export{Pe as default};
