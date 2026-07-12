import{r as a,j as n,B as P}from"./index-TQprzHkU.js";import{u as J,C as K,T as Q,P as _,a as Z,b as ee,c as ne}from"./useComponentProps-CjYSqekE.js";import{P as y}from"./PreviewSwitch-CcPSwIGg.js";import{u as te}from"./useForceRerender-Dq8YDj2j.js";import{R as oe}from"./RefreshButton-C5Kl5Rs7.js";import{C as re}from"./Customize-BdikCFm5.js";import{P as se}from"./PreviewInput-v-5qWA2Q.js";import{P as j}from"./PreviewColorPickerCustom-BFsDkSOr.js";import"./index-DQmtNYX5.js";import"./CodeHighlighter-Dx4QNbvH.js";import"./rotate-ccw-_xDu3G0k.js";/* empty css                       */const ie=(u,t)=>{const s=t.x-u.x,c=t.y-u.y;return Math.sqrt(s*s+c*c)},M=(u,t,s,c)=>{const p=c-Math.abs(c*u/t);return Math.max(s,p+s)},ae=(u,t)=>{let s;return(...c)=>{clearTimeout(s),s=setTimeout(()=>{u.apply(void 0,c)},t)}},ce=({text:u="Compressa",fontFamily:t="Roboto Flex",fontUrl:s="https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wdth,wght@8..144,25..151,100..1000&display=swap",width:c=!0,weight:p=!0,italic:w=!0,alpha:g=!1,flex:C=!0,stroke:S=!1,scale:F=!1,textColor:x="#FFFFFF",strokeColor:v="#FF0000",className:k="",minFontSize:b=24})=>{const o=a.useRef(null),e=a.useRef(null),T=a.useRef([]),h=a.useRef({x:0,y:0}),m=a.useRef({x:0,y:0}),[I,Y]=a.useState(b),[B,V]=a.useState(1),[N,L]=a.useState(1),E=u.split("");a.useEffect(()=>{const r=i=>{m.current.x=i.clientX,m.current.y=i.clientY},d=i=>{const l=i.touches[0];m.current.x=l.clientX,m.current.y=l.clientY};if(window.addEventListener("mousemove",r),window.addEventListener("touchmove",d,{passive:!0}),o.current){const{left:i,top:l,width:f,height:R}=o.current.getBoundingClientRect();h.current.x=i+f/2,h.current.y=l+R/2,m.current.x=h.current.x,m.current.y=h.current.y}return()=>{window.removeEventListener("mousemove",r),window.removeEventListener("touchmove",d)}},[]);const $=a.useCallback(()=>{if(!o.current||!e.current)return;const{width:r,height:d}=o.current.getBoundingClientRect();let i=r/(E.length/2);i=Math.max(i,b),Y(i),V(1),L(1),requestAnimationFrame(()=>{if(!e.current)return;const l=e.current.getBoundingClientRect();if(F&&l.height>0){const f=d/l.height;V(f),L(f)}})},[E.length,b,F]);a.useEffect(()=>{const r=ae($,100);return r(),window.addEventListener("resize",r),()=>window.removeEventListener("resize",r)},[$]),a.useEffect(()=>{let r;const d=()=>{if(h.current.x+=(m.current.x-h.current.x)/15,h.current.y+=(m.current.y-h.current.y)/15,e.current){const l=e.current.getBoundingClientRect().width/2;T.current.forEach(f=>{if(!f)return;const R=f.getBoundingClientRect(),q={x:R.x+R.width/2,y:R.y+R.height/2},z=ie(h.current,q),X=c?Math.floor(M(z,l,5,200)):100,O=p?Math.floor(M(z,l,100,900)):400,G=w?M(z,l,0,1).toFixed(2):0,H=g?M(z,l,0,1).toFixed(2):1,A=`'wght' ${O}, 'wdth' ${X}, 'ital' ${G}`;f.style.fontVariationSettings!==A&&(f.style.fontVariationSettings=A),g&&f.style.opacity!==H&&(f.style.opacity=H)})}r=requestAnimationFrame(d)};return d(),()=>cancelAnimationFrame(r)},[c,p,w,g]);const W=a.useMemo(()=>n.jsx("style",{children:`
        @import url('${s}');

        .flex {
          display: flex;
          justify-content: space-between;
        }

        .stroke span {
          position: relative;
          color: ${x};
        }
        .stroke span::after {
          content: attr(data-char);
          position: absolute;
          left: 0;
          top: 0;
          color: transparent;
          z-index: -1;
          -webkit-text-stroke-width: 3px;
          -webkit-text-stroke-color: ${v};
        }

        .text-pressure-title {
          color: ${x};
        }
      `}),[t,s,x,v]),U=[k,C?"flex":"",S?"stroke":""].filter(Boolean).join(" ");return n.jsxs("div",{ref:o,style:{position:"relative",width:"100%",height:"100%",background:"transparent"},children:[W,n.jsx("h1",{ref:e,className:`text-pressure-title ${U}`,style:{fontFamily:t,textTransform:"uppercase",fontSize:I,lineHeight:N,transform:`scale(1, ${B})`,transformOrigin:"center top",margin:0,textAlign:"center",userSelect:"none",whiteSpace:"nowrap",fontWeight:100,width:"100%"},children:E.map((r,d)=>n.jsx("span",{ref:i=>{T.current[d]=i},"data-char":r,style:{display:"inline-block",color:S?void 0:x},children:r},d))})]})},le=`// Component ported from https://codepen.io/JuanFuentes/full/rgXKGQ

import { useEffect, useRef, useState, useMemo, useCallback } from 'react';

const dist = (a, b) => {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  return Math.sqrt(dx * dx + dy * dy);
};

const getAttr = (distance, maxDist, minVal, maxVal) => {
  const val = maxVal - Math.abs((maxVal * distance) / maxDist);
  return Math.max(minVal, val + minVal);
};

const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

const TextPressure = ({
  text = 'Compressa',
  fontFamily = 'Roboto Flex',
  fontUrl = 'https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wdth,wght@8..144,25..151,100..1000&display=swap',

  width = true,
  weight = true,
  italic = true,
  alpha = false,

  flex = true,
  stroke = false,
  scale = false,

  textColor = '#FFFFFF',
  strokeColor = '#FF0000',
  className = '',

  minFontSize = 24
}) => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const spansRef = useRef([]);

  const mouseRef = useRef({ x: 0, y: 0 });
  const cursorRef = useRef({ x: 0, y: 0 });

  const [fontSize, setFontSize] = useState(minFontSize);
  const [scaleY, setScaleY] = useState(1);
  const [lineHeight, setLineHeight] = useState(1);

  const chars = text.split('');

  useEffect(() => {
    const handleMouseMove = e => {
      cursorRef.current.x = e.clientX;
      cursorRef.current.y = e.clientY;
    };
    const handleTouchMove = e => {
      const t = e.touches[0];
      cursorRef.current.x = t.clientX;
      cursorRef.current.y = t.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    if (containerRef.current) {
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      mouseRef.current.x = left + width / 2;
      mouseRef.current.y = top + height / 2;
      cursorRef.current.x = mouseRef.current.x;
      cursorRef.current.y = mouseRef.current.y;
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  const setSize = useCallback(() => {
    if (!containerRef.current || !titleRef.current) return;

    const { width: containerW, height: containerH } = containerRef.current.getBoundingClientRect();

    let newFontSize = containerW / (chars.length / 2);
    newFontSize = Math.max(newFontSize, minFontSize);

    setFontSize(newFontSize);
    setScaleY(1);
    setLineHeight(1);

    requestAnimationFrame(() => {
      if (!titleRef.current) return;
      const textRect = titleRef.current.getBoundingClientRect();

      if (scale && textRect.height > 0) {
        const yRatio = containerH / textRect.height;
        setScaleY(yRatio);
        setLineHeight(yRatio);
      }
    });
  }, [chars.length, minFontSize, scale]);

  useEffect(() => {
    const debouncedSetSize = debounce(setSize, 100);
    debouncedSetSize();
    window.addEventListener('resize', debouncedSetSize);
    return () => window.removeEventListener('resize', debouncedSetSize);
  }, [setSize]);

  useEffect(() => {
    let rafId;
    const animate = () => {
      mouseRef.current.x += (cursorRef.current.x - mouseRef.current.x) / 15;
      mouseRef.current.y += (cursorRef.current.y - mouseRef.current.y) / 15;

      if (titleRef.current) {
        const titleRect = titleRef.current.getBoundingClientRect();
        const maxDist = titleRect.width / 2;

        spansRef.current.forEach(span => {
          if (!span) return;

          const rect = span.getBoundingClientRect();
          const charCenter = {
            x: rect.x + rect.width / 2,
            y: rect.y + rect.height / 2
          };

          const d = dist(mouseRef.current, charCenter);

          const wdth = width ? Math.floor(getAttr(d, maxDist, 5, 200)) : 100;
          const wght = weight ? Math.floor(getAttr(d, maxDist, 100, 900)) : 400;
          const italVal = italic ? getAttr(d, maxDist, 0, 1).toFixed(2) : 0;
          const alphaVal = alpha ? getAttr(d, maxDist, 0, 1).toFixed(2) : 1;

          const newFontVariationSettings = \`'wght' \${wght}, 'wdth' \${wdth}, 'ital' \${italVal}\`;

          if (span.style.fontVariationSettings !== newFontVariationSettings) {
            span.style.fontVariationSettings = newFontVariationSettings;
          }
          if (alpha && span.style.opacity !== alphaVal) {
            span.style.opacity = alphaVal;
          }
        });
      }

      rafId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(rafId);
  }, [width, weight, italic, alpha]);

  const styleElement = useMemo(() => {
    return (
      <style>{\`
        @import url('\${fontUrl}');

        .flex {
          display: flex;
          justify-content: space-between;
        }

        .stroke span {
          position: relative;
          color: \${textColor};
        }
        .stroke span::after {
          content: attr(data-char);
          position: absolute;
          left: 0;
          top: 0;
          color: transparent;
          z-index: -1;
          -webkit-text-stroke-width: 3px;
          -webkit-text-stroke-color: \${strokeColor};
        }

        .text-pressure-title {
          color: \${textColor};
        }
      \`}</style>
    );
  }, [fontFamily, fontUrl, textColor, strokeColor]);

  const dynamicClassName = [className, flex ? 'flex' : '', stroke ? 'stroke' : ''].filter(Boolean).join(' ');

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        background: 'transparent'
      }}
    >
      {styleElement}
      <h1
        ref={titleRef}
        className={\`text-pressure-title \${dynamicClassName}\`}
        style={{
          fontFamily,
          textTransform: 'uppercase',
          fontSize: fontSize,
          lineHeight,
          transform: \`scale(1, \${scaleY})\`,
          transformOrigin: 'center top',
          margin: 0,
          textAlign: 'center',
          userSelect: 'none',
          whiteSpace: 'nowrap',
          fontWeight: 100,
          width: '100%'
        }}
      >
        {chars.map((char, i) => (
          <span
            key={i}
            ref={el => {
              spansRef.current[i] = el;
            }}
            data-char={char}
            style={{
              display: 'inline-block',
              color: stroke ? undefined : textColor
            }}
          >
            {char}
          </span>
        ))}
      </h1>
    </div>
  );
};

export default TextPressure;
`,ue=`// Component ported from https://codepen.io/JuanFuentes/full/rgXKGQ

import { useEffect, useRef, useState, useMemo, useCallback } from 'react';

const dist = (a, b) => {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  return Math.sqrt(dx * dx + dy * dy);
};

const getAttr = (distance, maxDist, minVal, maxVal) => {
  const val = maxVal - Math.abs((maxVal * distance) / maxDist);
  return Math.max(minVal, val + minVal);
};

const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

const TextPressure = ({
  text = 'Compressa',
  fontFamily = 'Roboto Flex',
  fontUrl = 'https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wdth,wght@8..144,25..151,100..1000&display=swap',

  width = true,
  weight = true,
  italic = true,
  alpha = false,

  flex = true,
  stroke = false,
  scale = false,

  textColor = '#FFFFFF',
  strokeColor = '#FF0000',
  strokeWidth = 2,
  className = '',

  minFontSize = 24
}) => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const spansRef = useRef([]);

  const mouseRef = useRef({ x: 0, y: 0 });
  const cursorRef = useRef({ x: 0, y: 0 });

  const [fontSize, setFontSize] = useState(minFontSize);
  const [scaleY, setScaleY] = useState(1);
  const [lineHeight, setLineHeight] = useState(1);

  const chars = text.split('');

  useEffect(() => {
    const handleMouseMove = e => {
      cursorRef.current.x = e.clientX;
      cursorRef.current.y = e.clientY;
    };
    const handleTouchMove = e => {
      const t = e.touches[0];
      cursorRef.current.x = t.clientX;
      cursorRef.current.y = t.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    if (containerRef.current) {
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      mouseRef.current.x = left + width / 2;
      mouseRef.current.y = top + height / 2;
      cursorRef.current.x = mouseRef.current.x;
      cursorRef.current.y = mouseRef.current.y;
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  const setSize = useCallback(() => {
    if (!containerRef.current || !titleRef.current) return;

    const { width: containerW, height: containerH } = containerRef.current.getBoundingClientRect();

    let newFontSize = containerW / (chars.length / 2);
    newFontSize = Math.max(newFontSize, minFontSize);

    setFontSize(newFontSize);
    setScaleY(1);
    setLineHeight(1);

    requestAnimationFrame(() => {
      if (!titleRef.current) return;
      const textRect = titleRef.current.getBoundingClientRect();

      if (scale && textRect.height > 0) {
        const yRatio = containerH / textRect.height;
        setScaleY(yRatio);
        setLineHeight(yRatio);
      }
    });
  }, [chars.length, minFontSize, scale]);

  useEffect(() => {
    const debouncedSetSize = debounce(setSize, 100);
    debouncedSetSize();
    window.addEventListener('resize', debouncedSetSize);
    return () => window.removeEventListener('resize', debouncedSetSize);
  }, [setSize]);

  useEffect(() => {
    let rafId;
    const animate = () => {
      mouseRef.current.x += (cursorRef.current.x - mouseRef.current.x) / 15;
      mouseRef.current.y += (cursorRef.current.y - mouseRef.current.y) / 15;

      if (titleRef.current) {
        const titleRect = titleRef.current.getBoundingClientRect();
        const maxDist = titleRect.width / 2;

        spansRef.current.forEach(span => {
          if (!span) return;

          const rect = span.getBoundingClientRect();
          const charCenter = {
            x: rect.x + rect.width / 2,
            y: rect.y + rect.height / 2
          };

          const d = dist(mouseRef.current, charCenter);

          const wdth = width ? Math.floor(getAttr(d, maxDist, 5, 200)) : 100;
          const wght = weight ? Math.floor(getAttr(d, maxDist, 100, 900)) : 400;
          const italVal = italic ? getAttr(d, maxDist, 0, 1).toFixed(2) : 0;
          const alphaVal = alpha ? getAttr(d, maxDist, 0, 1).toFixed(2) : 1;

          const newFontVariationSettings = \`'wght' \${wght}, 'wdth' \${wdth}, 'ital' \${italVal}\`;

          if (span.style.fontVariationSettings !== newFontVariationSettings) {
            span.style.fontVariationSettings = newFontVariationSettings;
          }
          if (alpha && span.style.opacity !== alphaVal) {
            span.style.opacity = alphaVal;
          }
        });
      }

      rafId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(rafId);
  }, [width, weight, italic, alpha]);

  const styleElement = useMemo(() => {
    return (
      <style>{\`
        @import url('\${fontUrl}');
        .stroke span {
          position: relative;
          color: \${textColor};
        }
        .stroke span::after {
          content: attr(data-char);
          position: absolute;
          left: 0;
          top: 0;
          color: transparent;
          z-index: -1;
          -webkit-text-stroke-width: \${strokeWidth}px;
          -webkit-text-stroke-color: \${strokeColor};
        }
      \`}</style>
    );
  }, [fontFamily, fontUrl, textColor, strokeColor, strokeWidth]);

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden bg-transparent">
      {styleElement}
      <h1
        ref={titleRef}
        className={\`text-pressure-title \${className} \${
          flex ? 'flex justify-between' : ''
        } \${stroke ? 'stroke' : ''} uppercase text-center\`}
        style={{
          fontFamily,
          fontSize: fontSize,
          lineHeight,
          transform: \`scale(1, \${scaleY})\`,
          transformOrigin: 'center top',
          margin: 0,
          fontWeight: 100,
          color: stroke ? undefined : textColor
        }}
      >
        {chars.map((char, i) => (
          <span key={i} ref={el => {
              spansRef.current[i] = el;
            }} data-char={char} className="inline-block">
            {char}
          </span>
        ))}
      </h1>
    </div>
  );
};

export default TextPressure;
`,fe=`// Component ported from https://codepen.io/JuanFuentes/full/rgXKGQ

import { useEffect, useRef, useState, useMemo, useCallback } from 'react';

interface TextPressureProps {
  text?: string;
  fontFamily?: string;
  fontUrl?: string;
  width?: boolean;
  weight?: boolean;
  italic?: boolean;
  alpha?: boolean;
  flex?: boolean;
  stroke?: boolean;
  scale?: boolean;
  textColor?: string;
  strokeColor?: string;
  className?: string;
  minFontSize?: number;
}

const dist = (a: { x: number; y: number }, b: { x: number; y: number }) => {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  return Math.sqrt(dx * dx + dy * dy);
};

const getAttr = (distance: number, maxDist: number, minVal: number, maxVal: number) => {
  const val = maxVal - Math.abs((maxVal * distance) / maxDist);
  return Math.max(minVal, val + minVal);
};

const debounce = (func: (...args: any[]) => void, delay: number) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

const TextPressure: React.FC<TextPressureProps> = ({
  text = 'Compressa',
  fontFamily = 'Roboto Flex',
  fontUrl = 'https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wdth,wght@8..144,25..151,100..1000&display=swap',
  width = true,
  weight = true,
  italic = true,
  alpha = false,
  flex = true,
  stroke = false,
  scale = false,
  textColor = '#FFFFFF',
  strokeColor = '#FF0000',
  className = '',
  minFontSize = 24
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const spansRef = useRef<(HTMLSpanElement | null)[]>([]);

  const mouseRef = useRef({ x: 0, y: 0 });
  const cursorRef = useRef({ x: 0, y: 0 });

  const [fontSize, setFontSize] = useState(minFontSize);
  const [scaleY, setScaleY] = useState(1);
  const [lineHeight, setLineHeight] = useState(1);

  const chars = text.split('');

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorRef.current.x = e.clientX;
      cursorRef.current.y = e.clientY;
    };
    const handleTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      cursorRef.current.x = t.clientX;
      cursorRef.current.y = t.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    if (containerRef.current) {
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      mouseRef.current.x = left + width / 2;
      mouseRef.current.y = top + height / 2;
      cursorRef.current.x = mouseRef.current.x;
      cursorRef.current.y = mouseRef.current.y;
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  const setSize = useCallback(() => {
    if (!containerRef.current || !titleRef.current) return;

    const { width: containerW, height: containerH } = containerRef.current.getBoundingClientRect();

    let newFontSize = containerW / (chars.length / 2);
    newFontSize = Math.max(newFontSize, minFontSize);

    setFontSize(newFontSize);
    setScaleY(1);
    setLineHeight(1);

    requestAnimationFrame(() => {
      if (!titleRef.current) return;
      const textRect = titleRef.current.getBoundingClientRect();

      if (scale && textRect.height > 0) {
        const yRatio = containerH / textRect.height;
        setScaleY(yRatio);
        setLineHeight(yRatio);
      }
    });
  }, [chars.length, minFontSize, scale]);

  useEffect(() => {
    const debouncedSetSize = debounce(setSize, 100);
    debouncedSetSize();
    window.addEventListener('resize', debouncedSetSize);
    return () => window.removeEventListener('resize', debouncedSetSize);
  }, [setSize]);

  useEffect(() => {
    let rafId: number;
    const animate = () => {
      mouseRef.current.x += (cursorRef.current.x - mouseRef.current.x) / 15;
      mouseRef.current.y += (cursorRef.current.y - mouseRef.current.y) / 15;

      if (titleRef.current) {
        const titleRect = titleRef.current.getBoundingClientRect();
        const maxDist = titleRect.width / 2;

        spansRef.current.forEach(span => {
          if (!span) return;

          const rect = span.getBoundingClientRect();
          const charCenter = {
            x: rect.x + rect.width / 2,
            y: rect.y + rect.height / 2
          };

          const d = dist(mouseRef.current, charCenter);

          const wdth = width ? Math.floor(getAttr(d, maxDist, 5, 200)) : 100;
          const wght = weight ? Math.floor(getAttr(d, maxDist, 100, 900)) : 400;
          const italVal = italic ? getAttr(d, maxDist, 0, 1).toFixed(2) : '0';
          const alphaVal = alpha ? getAttr(d, maxDist, 0, 1).toFixed(2) : '1';

          const newFontVariationSettings = \`'wght' \${wght}, 'wdth' \${wdth}, 'ital' \${italVal}\`;

          if (span.style.fontVariationSettings !== newFontVariationSettings) {
            span.style.fontVariationSettings = newFontVariationSettings;
          }
          if (alpha && span.style.opacity !== alphaVal) {
            span.style.opacity = alphaVal;
          }
        });
      }

      rafId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(rafId);
  }, [width, weight, italic, alpha]);

  const styleElement = useMemo(() => {
    return (
      <style>{\`
        @import url('\${fontUrl}');

        .flex {
          display: flex;
          justify-content: space-between;
        }

        .stroke span {
          position: relative;
          color: \${textColor};
        }
        .stroke span::after {
          content: attr(data-char);
          position: absolute;
          left: 0;
          top: 0;
          color: transparent;
          z-index: -1;
          -webkit-text-stroke-width: 3px;
          -webkit-text-stroke-color: \${strokeColor};
        }

        .text-pressure-title {
          color: \${textColor};
        }
      \`}</style>
    );
  }, [fontFamily, fontUrl, flex, stroke, textColor, strokeColor]);

  const dynamicClassName = [className, flex ? 'flex' : '', stroke ? 'stroke' : ''].filter(Boolean).join(' ');

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        background: 'transparent'
      }}
    >
      {styleElement}
      <h1
        ref={titleRef}
        className={\`text-pressure-title \${dynamicClassName}\`}
        style={{
          fontFamily,
          textTransform: 'uppercase',
          fontSize: fontSize,
          lineHeight,
          transform: \`scale(1, \${scaleY})\`,
          transformOrigin: 'center top',
          margin: 0,
          textAlign: 'center',
          userSelect: 'none',
          whiteSpace: 'nowrap',
          fontWeight: 100,
          width: '100%'
        }}
      >
        {chars.map((char, i) => (
          <span
            key={i}
            ref={el => {
              spansRef.current[i] = el;
            }}
            data-char={char}
            style={{
              display: 'inline-block',
              color: stroke ? undefined : textColor
            }}
          >
            {char}
          </span>
        ))}
      </h1>
    </div>
  );
};

export default TextPressure;
`,de=`// Component ported from https://codepen.io/JuanFuentes/full/rgXKGQ

import { useEffect, useRef, useState, useMemo, useCallback } from 'react';

interface TextPressureProps {
  text?: string;
  fontFamily?: string;
  fontUrl?: string;
  width?: boolean;
  weight?: boolean;
  italic?: boolean;
  alpha?: boolean;
  flex?: boolean;
  stroke?: boolean;
  scale?: boolean;
  textColor?: string;
  strokeColor?: string;
  strokeWidth?: number;
  className?: string;
  minFontSize?: number;
}

const dist = (a: { x: number; y: number }, b: { x: number; y: number }) => {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  return Math.sqrt(dx * dx + dy * dy);
};

const getAttr = (distance: number, maxDist: number, minVal: number, maxVal: number) => {
  const val = maxVal - Math.abs((maxVal * distance) / maxDist);
  return Math.max(minVal, val + minVal);
};

const debounce = (func: (...args: any[]) => void, delay: number) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

const TextPressure: React.FC<TextPressureProps> = ({
  text = 'Compressa',
  fontFamily = 'Roboto Flex',
  fontUrl = 'https://fonts.googleapis.com/css2?family=Roboto+Flex:opsz,wdth,wght@8..144,25..151,100..1000&display=swap',
  width = true,
  weight = true,
  italic = true,
  alpha = false,
  flex = true,
  stroke = false,
  scale = false,
  textColor = '#FFFFFF',
  strokeColor = '#FF0000',
  strokeWidth = 2,
  className = '',
  minFontSize = 24
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const spansRef = useRef<(HTMLSpanElement | null)[]>([]);

  const mouseRef = useRef({ x: 0, y: 0 });
  const cursorRef = useRef({ x: 0, y: 0 });

  const [fontSize, setFontSize] = useState(minFontSize);
  const [scaleY, setScaleY] = useState(1);
  const [lineHeight, setLineHeight] = useState(1);

  const chars = text.split('');

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorRef.current.x = e.clientX;
      cursorRef.current.y = e.clientY;
    };
    const handleTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      cursorRef.current.x = t.clientX;
      cursorRef.current.y = t.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    if (containerRef.current) {
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      mouseRef.current.x = left + width / 2;
      mouseRef.current.y = top + height / 2;
      cursorRef.current.x = mouseRef.current.x;
      cursorRef.current.y = mouseRef.current.y;
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  const setSize = useCallback(() => {
    if (!containerRef.current || !titleRef.current) return;

    const { width: containerW, height: containerH } = containerRef.current.getBoundingClientRect();

    let newFontSize = containerW / (chars.length / 2);
    newFontSize = Math.max(newFontSize, minFontSize);

    setFontSize(newFontSize);
    setScaleY(1);
    setLineHeight(1);

    requestAnimationFrame(() => {
      if (!titleRef.current) return;
      const textRect = titleRef.current.getBoundingClientRect();

      if (scale && textRect.height > 0) {
        const yRatio = containerH / textRect.height;
        setScaleY(yRatio);
        setLineHeight(yRatio);
      }
    });
  }, [chars.length, minFontSize, scale]);

  useEffect(() => {
    const debouncedSetSize = debounce(setSize, 100);
    debouncedSetSize();
    window.addEventListener('resize', debouncedSetSize);
    return () => window.removeEventListener('resize', debouncedSetSize);
  }, [setSize]);

  useEffect(() => {
    let rafId: number;
    const animate = () => {
      mouseRef.current.x += (cursorRef.current.x - mouseRef.current.x) / 15;
      mouseRef.current.y += (cursorRef.current.y - mouseRef.current.y) / 15;

      if (titleRef.current) {
        const titleRect = titleRef.current.getBoundingClientRect();
        const maxDist = titleRect.width / 2;

        spansRef.current.forEach(span => {
          if (!span) return;

          const rect = span.getBoundingClientRect();
          const charCenter = {
            x: rect.x + rect.width / 2,
            y: rect.y + rect.height / 2
          };

          const d = dist(mouseRef.current, charCenter);

          const wdth = width ? Math.floor(getAttr(d, maxDist, 5, 200)) : 100;
          const wght = weight ? Math.floor(getAttr(d, maxDist, 100, 900)) : 400;
          const italVal = italic ? getAttr(d, maxDist, 0, 1).toFixed(2) : '0';
          const alphaVal = alpha ? getAttr(d, maxDist, 0, 1).toFixed(2) : '1';

          const newFontVariationSettings = \`'wght' \${wght}, 'wdth' \${wdth}, 'ital' \${italVal}\`;

          if (span.style.fontVariationSettings !== newFontVariationSettings) {
            span.style.fontVariationSettings = newFontVariationSettings;
          }
          if (alpha && span.style.opacity !== alphaVal) {
            span.style.opacity = alphaVal;
          }
        });
      }

      rafId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(rafId);
  }, [width, weight, italic, alpha]);

  const styleElement = useMemo(() => {
    return (
      <style>{\`
        @import url('\${fontUrl}');
        .stroke span {
          position: relative;
          color: \${textColor};
        }
        .stroke span::after {
          content: attr(data-char);
          position: absolute;
          left: 0;
          top: 0;
          color: transparent;
          z-index: -1;
          -webkit-text-stroke-width: \${strokeWidth}px;
          -webkit-text-stroke-color: \${strokeColor};
        }
      \`}</style>
    );
  }, [fontFamily, fontUrl, stroke, textColor, strokeColor, strokeWidth]);

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden bg-transparent">
      {styleElement}
      <h1
        ref={titleRef}
        className={\`text-pressure-title \${className} \${
          flex ? 'flex justify-between' : ''
        } \${stroke ? 'stroke' : ''} uppercase text-center\`}
        style={{
          fontFamily,
          fontSize: fontSize,
          lineHeight,
          transform: \`scale(1, \${scaleY})\`,
          transformOrigin: 'center top',
          margin: 0,
          fontWeight: 100,
          color: stroke ? undefined : textColor
        }}
      >
        {chars.map((char, i) => (
          <span
            key={i}
            ref={el => {
              spansRef.current[i] = el;
            }}
            data-char={char}
            className="inline-block"
          >
            {char}
          </span>
        ))}
      </h1>
    </div>
  );
};

export default TextPressure;
`,he={usage:`// Component ported from https://codepen.io/JuanFuentes/full/rgXKGQ
// Font used - https://compressa.preusstype.com/
  
import TextPressure from './TextPressure';

// Note:
// Make sure the font you're using supports all the variable properties. 
// React Bits does not take responsibility for the fonts used

<div style={{position: 'relative', height: '300px'}}>
  <TextPressure
    text="Hello!"
    flex={true}
    alpha={false}
    stroke={false}
    width={true}
    weight={true}
    italic={true}
    textColor="#ffffff"
    strokeColor="#ff0000"
    minFontSize={36}
  />
</div>`,code:le,tailwind:ue,tsCode:fe,tsTailwind:de},me=[{name:"text",type:"string",default:'"Hello!"',description:"Text content that will be displayed and animated."},{name:"fontFamily",type:"string",default:"",description:"Name of the variable font family."},{name:"fontUrl",type:"string",default:"URL to a .woff2 or .ttf file",description:"URL for the variable font file (needed)"},{name:"flex",type:"boolean",default:"true",description:"Whether the characters are spaced using flex layout."},{name:"scale",type:"boolean",default:"false",description:"If true, vertically scales the text to fill its container height."},{name:"alpha",type:"boolean",default:"false",description:"If true, applies an opacity effect based on cursor distance."},{name:"stroke",type:"boolean",default:"false",description:"If true, adds a stroke effect around characters."},{name:"width",type:"boolean",default:"true",description:'If true, varies the variable-font "width" axis.'},{name:"weight",type:"boolean",default:"true",description:'If true, varies the variable-font "weight" axis.'},{name:"italic",type:"boolean",default:"true",description:'If true, varies the variable-font "italics" axis.'},{name:"textColor",type:"string",default:"true",description:"The fill color of the text"},{name:"strokeColor",type:"string",default:"#FFFFFF",description:'The stroke color that will be applied to the text when "stroke" is set to true'},{name:"className",type:"string",default:"#FF0000",description:"Additional class for styling the <h1> wrapper."},{name:"minFontSize",type:"number",default:"24",description:"Sets a minimum font-size to avoid overly tiny text on smaller screens."}],D={text:"Hello!",flex:!0,alpha:!1,stroke:!1,width:!0,weight:!0,italic:!0,textColor:"#ffffff",strokeColor:"#5227FF"},ze=()=>{const{props:u,updateProp:t,resetProps:s,hasChanges:c}=J(D),{text:p,flex:w,alpha:g,stroke:C,width:S,weight:F,italic:x,textColor:v,strokeColor:k}=u,[b,o]=te();return n.jsx(K,{props:u,defaultProps:D,resetProps:s,hasChanges:c,children:n.jsxs(Q,{children:[n.jsxs(_,{children:[n.jsxs(P,{position:"relative",className:"demo-container",bg:"#120F17",minH:400,maxH:450,overflow:"hidden",mb:6,children:[n.jsx(oe,{onClick:o}),n.jsx(P,{w:"100%",h:"100%",children:n.jsx(ce,{text:p,flex:w,alpha:g,stroke:C,width:S,weight:F,italic:x,textColor:v,strokeColor:k,minFontSize:36},b)})]}),n.jsxs(re,{children:[n.jsx(j,{title:"Text Color",color:v,onChange:e=>{t("textColor",e),o()}}),n.jsx(j,{title:"Stroke Color",color:k,onChange:e=>{t("strokeColor",e),o()}}),n.jsx(se,{title:"Text",value:p,placeholder:"Your text here...",width:200,maxLength:10,onChange:e=>t("text",e)}),n.jsx(y,{title:"Flex",isChecked:w,onChange:e=>{t("flex",e),o()}}),n.jsx(y,{title:"Alpha",isChecked:g,onChange:e=>{t("alpha",e),o()}}),n.jsx(y,{title:"Stroke",isChecked:C,onChange:e=>{t("stroke",e),o()}}),n.jsx(y,{title:"Width",isChecked:S,onChange:e=>{t("width",e),o()}}),n.jsx(y,{title:"Weight",isChecked:F,onChange:e=>{t("weight",e),o()}}),n.jsx(y,{title:"Italic",isChecked:x,onChange:e=>{t("italic",e),o()}})]}),n.jsx(Z,{data:me})]}),n.jsx(ee,{children:n.jsx(ne,{codeObject:he,componentName:"TextPressure"})})]})})};export{ze as default};
