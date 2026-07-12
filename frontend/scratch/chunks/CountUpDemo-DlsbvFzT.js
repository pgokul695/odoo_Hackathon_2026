import{r as d,cu as T,j as n,B as N}from"./index-TQprzHkU.js";import{u as P,C as j,T as U,P as v,a as F,b as M,c as k}from"./useComponentProps-CjYSqekE.js";import{R}from"./RefreshButton-C5Kl5Rs7.js";import{C as W}from"./Customize-BdikCFm5.js";import{P as D}from"./PreviewSlider-CCbi2och.js";import{P as L}from"./PreviewSelect-DZgUm0jD.js";import{P as G}from"./PreviewInput-v-5qWA2Q.js";import{D as O}from"./Dependencies-IIL9riMN.js";import{u as B}from"./useForceRerender-Dq8YDj2j.js";import{u as H}from"./use-spring-BIrPKcsd.js";import{u as A}from"./use-motion-value-rrV2ndVB.js";import"./index-DQmtNYX5.js";import"./CodeHighlighter-Dx4QNbvH.js";import"./rotate-ccw-_xDu3G0k.js";/* empty css                       */import"./use-transform-D9sL3to7.js";function z({to:r,from:t=0,direction:i="up",delay:p=0,duration:u=2,className:b="",startWhen:g=!0,separator:m="",onStart:l,onEnd:f}){const s=d.useRef(null),o=A(i==="down"?r:t),w=20+40*(1/u),e=100*(1/u),I=H(o,{damping:w,stiffness:e}),C=T(s,{once:!0,margin:"0px"}),y=c=>{const a=c.toString();if(a.includes(".")){const x=a.split(".")[1];if(parseInt(x)!==0)return x.length}return 0},h=Math.max(y(t),y(r)),V=d.useCallback(c=>{const a=h>0,x={useGrouping:!!m,minimumFractionDigits:a?h:0,maximumFractionDigits:a?h:0},S=Intl.NumberFormat("en-US",x).format(c);return m?S.replace(/,/g,m):S},[h,m]);return d.useEffect(()=>{s.current&&(s.current.textContent=V(i==="down"?r:t))},[t,r,i,V]),d.useEffect(()=>{if(C&&g){typeof l=="function"&&l();const c=setTimeout(()=>{o.set(i==="down"?t:r)},p*1e3),a=setTimeout(()=>{typeof f=="function"&&f()},p*1e3+u*1e3);return()=>{clearTimeout(c),clearTimeout(a)}}},[C,g,o,i,t,r,p,l,f,u]),d.useEffect(()=>{const c=I.on("change",a=>{s.current&&(s.current.textContent=V(a))});return()=>c()},[I,V]),n.jsx("span",{className:b,ref:s})}const _=`import { useInView, useMotionValue, useSpring } from 'motion/react';
import { useCallback, useEffect, useRef } from 'react';

export default function CountUp({
  to,
  from = 0,
  direction = 'up',
  delay = 0,
  duration = 2,
  className = '',
  startWhen = true,
  separator = '',
  onStart,
  onEnd
}) {
  const ref = useRef(null);
  const motionValue = useMotionValue(direction === 'down' ? to : from);

  const damping = 20 + 40 * (1 / duration);
  const stiffness = 100 * (1 / duration);

  const springValue = useSpring(motionValue, {
    damping,
    stiffness
  });

  const isInView = useInView(ref, { once: true, margin: '0px' });

  const getDecimalPlaces = num => {
    const str = num.toString();

    if (str.includes('.')) {
      const decimals = str.split('.')[1];

      if (parseInt(decimals) !== 0) {
        return decimals.length;
      }
    }

    return 0;
  };

  const maxDecimals = Math.max(getDecimalPlaces(from), getDecimalPlaces(to));

  const formatValue = useCallback(
    latest => {
      const hasDecimals = maxDecimals > 0;

      const options = {
        useGrouping: !!separator,
        minimumFractionDigits: hasDecimals ? maxDecimals : 0,
        maximumFractionDigits: hasDecimals ? maxDecimals : 0
      };

      const formattedNumber = Intl.NumberFormat('en-US', options).format(latest);

      return separator ? formattedNumber.replace(/,/g, separator) : formattedNumber;
    },
    [maxDecimals, separator]
  );

  useEffect(() => {
    if (ref.current) {
      ref.current.textContent = formatValue(direction === 'down' ? to : from);
    }
  }, [from, to, direction, formatValue]);

  useEffect(() => {
    if (isInView && startWhen) {
      if (typeof onStart === 'function') onStart();

      const timeoutId = setTimeout(() => {
        motionValue.set(direction === 'down' ? from : to);
      }, delay * 1000);

      const durationTimeoutId = setTimeout(
        () => {
          if (typeof onEnd === 'function') onEnd();
        },
        delay * 1000 + duration * 1000
      );

      return () => {
        clearTimeout(timeoutId);
        clearTimeout(durationTimeoutId);
      };
    }
  }, [isInView, startWhen, motionValue, direction, from, to, delay, onStart, onEnd, duration]);

  useEffect(() => {
    const unsubscribe = springValue.on('change', latest => {
      if (ref.current) {
        ref.current.textContent = formatValue(latest);
      }
    });

    return () => unsubscribe();
  }, [springValue, formatValue]);

  return <span className={className} ref={ref} />;
}
`,q=`import { useInView, useMotionValue, useSpring } from 'motion/react';
import { useCallback, useEffect, useRef } from 'react';

export default function CountUp({
  to,
  from = 0,
  direction = 'up',
  delay = 0,
  duration = 2,
  className = '',
  startWhen = true,
  separator = '',
  onStart,
  onEnd
}) {
  const ref = useRef(null);
  const motionValue = useMotionValue(direction === 'down' ? to : from);

  const damping = 20 + 40 * (1 / duration);
  const stiffness = 100 * (1 / duration);

  const springValue = useSpring(motionValue, {
    damping,
    stiffness
  });

  const isInView = useInView(ref, { once: true, margin: '0px' });

  const getDecimalPlaces = num => {
    const str = num.toString();

    if (str.includes('.')) {
      const decimals = str.split('.')[1];

      if (parseInt(decimals) !== 0) {
        return decimals.length;
      }
    }

    return 0;
  };

  const maxDecimals = Math.max(getDecimalPlaces(from), getDecimalPlaces(to));

  const formatValue = useCallback(
    latest => {
      const hasDecimals = maxDecimals > 0;

      const options = {
        useGrouping: !!separator,
        minimumFractionDigits: hasDecimals ? maxDecimals : 0,
        maximumFractionDigits: hasDecimals ? maxDecimals : 0
      };

      const formattedNumber = Intl.NumberFormat('en-US', options).format(latest);

      return separator ? formattedNumber.replace(/,/g, separator) : formattedNumber;
    },
    [maxDecimals, separator]
  );

  useEffect(() => {
    if (ref.current) {
      ref.current.textContent = formatValue(direction === 'down' ? to : from);
    }
  }, [from, to, direction, formatValue]);

  useEffect(() => {
    if (isInView && startWhen) {
      if (typeof onStart === 'function') onStart();

      const timeoutId = setTimeout(() => {
        motionValue.set(direction === 'down' ? from : to);
      }, delay * 1000);

      const durationTimeoutId = setTimeout(
        () => {
          if (typeof onEnd === 'function') onEnd();
        },
        delay * 1000 + duration * 1000
      );

      return () => {
        clearTimeout(timeoutId);
        clearTimeout(durationTimeoutId);
      };
    }
  }, [isInView, startWhen, motionValue, direction, from, to, delay, onStart, onEnd, duration]);

  useEffect(() => {
    const unsubscribe = springValue.on('change', latest => {
      if (ref.current) {
        ref.current.textContent = formatValue(latest);
      }
    });

    return () => unsubscribe();
  }, [springValue, formatValue]);

  return <span className={className} ref={ref} />;
}
`,J=`import { useInView, useMotionValue, useSpring } from 'motion/react';
import { useCallback, useEffect, useRef } from 'react';

interface CountUpProps {
  to: number;
  from?: number;
  direction?: 'up' | 'down';
  delay?: number;
  duration?: number;
  className?: string;
  startWhen?: boolean;
  separator?: string;
  onStart?: () => void;
  onEnd?: () => void;
}

export default function CountUp({
  to,
  from = 0,
  direction = 'up',
  delay = 0,
  duration = 2,
  className = '',
  startWhen = true,
  separator = '',
  onStart,
  onEnd
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(direction === 'down' ? to : from);

  const damping = 20 + 40 * (1 / duration);
  const stiffness = 100 * (1 / duration);

  const springValue = useSpring(motionValue, {
    damping,
    stiffness
  });

  const isInView = useInView(ref, { once: true, margin: '0px' });

  const getDecimalPlaces = (num: number): number => {
    const str = num.toString();
    if (str.includes('.')) {
      const decimals = str.split('.')[1];
      if (parseInt(decimals) !== 0) {
        return decimals.length;
      }
    }
    return 0;
  };

  const maxDecimals = Math.max(getDecimalPlaces(from), getDecimalPlaces(to));

  const formatValue = useCallback(
    (latest: number) => {
      const hasDecimals = maxDecimals > 0;

      const options: Intl.NumberFormatOptions = {
        useGrouping: !!separator,
        minimumFractionDigits: hasDecimals ? maxDecimals : 0,
        maximumFractionDigits: hasDecimals ? maxDecimals : 0
      };

      const formattedNumber = Intl.NumberFormat('en-US', options).format(latest);

      return separator ? formattedNumber.replace(/,/g, separator) : formattedNumber;
    },
    [maxDecimals, separator]
  );

  useEffect(() => {
    if (ref.current) {
      ref.current.textContent = formatValue(direction === 'down' ? to : from);
    }
  }, [from, to, direction, formatValue]);

  useEffect(() => {
    if (isInView && startWhen) {
      if (typeof onStart === 'function') {
        onStart();
      }

      const timeoutId = setTimeout(() => {
        motionValue.set(direction === 'down' ? from : to);
      }, delay * 1000);

      const durationTimeoutId = setTimeout(
        () => {
          if (typeof onEnd === 'function') {
            onEnd();
          }
        },
        delay * 1000 + duration * 1000
      );

      return () => {
        clearTimeout(timeoutId);
        clearTimeout(durationTimeoutId);
      };
    }
  }, [isInView, startWhen, motionValue, direction, from, to, delay, onStart, onEnd, duration]);

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest: number) => {
      if (ref.current) {
        ref.current.textContent = formatValue(latest);
      }
    });

    return () => unsubscribe();
  }, [springValue, formatValue]);

  return <span className={className} ref={ref} />;
}
`,K=`import { useInView, useMotionValue, useSpring } from 'motion/react';
import { useCallback, useEffect, useRef } from 'react';

interface CountUpProps {
  to: number;
  from?: number;
  direction?: 'up' | 'down';
  delay?: number;
  duration?: number;
  className?: string;
  startWhen?: boolean;
  separator?: string;
  onStart?: () => void;
  onEnd?: () => void;
}

export default function CountUp({
  to,
  from = 0,
  direction = 'up',
  delay = 0,
  duration = 2,
  className = '',
  startWhen = true,
  separator = '',
  onStart,
  onEnd
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(direction === 'down' ? to : from);

  const damping = 20 + 40 * (1 / duration);
  const stiffness = 100 * (1 / duration);

  const springValue = useSpring(motionValue, {
    damping,
    stiffness
  });

  const isInView = useInView(ref, { once: true, margin: '0px' });

  const getDecimalPlaces = (num: number): number => {
    const str = num.toString();
    if (str.includes('.')) {
      const decimals = str.split('.')[1];
      if (parseInt(decimals) !== 0) {
        return decimals.length;
      }
    }
    return 0;
  };

  const maxDecimals = Math.max(getDecimalPlaces(from), getDecimalPlaces(to));

  const formatValue = useCallback(
    (latest: number) => {
      const hasDecimals = maxDecimals > 0;

      const options: Intl.NumberFormatOptions = {
        useGrouping: !!separator,
        minimumFractionDigits: hasDecimals ? maxDecimals : 0,
        maximumFractionDigits: hasDecimals ? maxDecimals : 0
      };

      const formattedNumber = Intl.NumberFormat('en-US', options).format(latest);

      return separator ? formattedNumber.replace(/,/g, separator) : formattedNumber;
    },
    [maxDecimals, separator]
  );

  useEffect(() => {
    if (ref.current) {
      ref.current.textContent = formatValue(direction === 'down' ? to : from);
    }
  }, [from, to, direction, formatValue]);

  useEffect(() => {
    if (isInView && startWhen) {
      if (typeof onStart === 'function') {
        onStart();
      }

      const timeoutId = setTimeout(() => {
        motionValue.set(direction === 'down' ? from : to);
      }, delay * 1000);

      const durationTimeoutId = setTimeout(
        () => {
          if (typeof onEnd === 'function') {
            onEnd();
          }
        },
        delay * 1000 + duration * 1000
      );

      return () => {
        clearTimeout(timeoutId);
        clearTimeout(durationTimeoutId);
      };
    }
  }, [isInView, startWhen, motionValue, direction, from, to, delay, onStart, onEnd, duration]);

  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest: number) => {
      if (ref.current) {
        ref.current.textContent = formatValue(latest);
      }
    });

    return () => unsubscribe();
  }, [springValue, formatValue]);

  return <span className={className} ref={ref} />;
}
`,Q={dependencies:"motion",usage:`import CountUp from './CountUp'

<CountUp
  from={0}
  to={100}
  separator=","
  direction="up"
  duration={1}
  className="count-up-text"
/>`,code:_,tailwind:q,tsCode:J,tsTailwind:K},E={from:0,to:100,duration:1,delay:0,direction:"up",separator:","},dn=()=>{const{props:r,updateProp:t,resetProps:i,hasChanges:p}=P(E),{from:u,to:b,duration:g,delay:m,direction:l,separator:f}=r,[s,o]=B(),w=d.useMemo(()=>[{name:"to",type:"number",default:"—",description:"The target number to count up to."},{name:"from",type:"number",default:"0",description:"The initial number from which the count starts."},{name:"direction",type:"string",default:'"up"',description:'Direction of the count; can be "up" or "down". When this is set to "down", "from" and "to" become reversed, in order to count down.'},{name:"delay",type:"number",default:"0",description:"Delay in seconds before the counting starts."},{name:"duration",type:"number",default:"2",description:"Duration of the count animation - based on the damping and stiffness configured inside the component."},{name:"className",type:"string",default:'""',description:"CSS class to apply to the component for additional styling."},{name:"startWhen",type:"boolean",default:"true",description:"A boolean to control whether the animation should start when the component is in view. It basically works like an if statement, if this is true, the count will start."},{name:"separator",type:"string",default:'""',description:"Character to use as a thousands separator in the displayed number."},{name:"onStart",type:"function",default:"—",description:"Callback function that is called when the count animation starts."},{name:"onEnd",type:"function",default:"—",description:"Callback function that is called when the count animation ends."}],[]);return n.jsx(j,{props:r,defaultProps:E,resetProps:i,hasChanges:p,children:n.jsxs(U,{children:[n.jsxs(v,{children:[n.jsxs(N,{position:"relative",className:"demo-container",minH:200,children:[n.jsx(z,{from:u,to:b,duration:g,delay:m,direction:l,separator:f,className:"count-up-text"},s),n.jsx(R,{onClick:o})]}),n.jsxs(W,{children:[n.jsx(D,{title:"To",min:0,max:1e4,step:100,value:b,onChange:e=>{t("to",e),o()}}),n.jsx(D,{title:"From",min:0,max:1e3,step:10,value:u,onChange:e=>{t("from",e),o()}}),n.jsx(D,{title:"Duration",min:.5,max:10,step:.5,value:g,onChange:e=>{t("duration",e),o()}}),n.jsx(D,{title:"Delay",min:0,max:5,step:.5,value:m,onChange:e=>{t("delay",e),o()}}),n.jsx(L,{title:"Direction",value:l,options:[{value:"up",label:"Up"},{value:"down",label:"Down"}],onChange:e=>{t("direction",e),o()}}),n.jsx(G,{title:"Separator",value:f,placeholder:",",maxLength:1,onChange:e=>{t("separator",e),o()}})]}),n.jsx(F,{data:w}),n.jsx(O,{dependencyList:["motion"]})]}),n.jsx(M,{children:n.jsx(k,{codeObject:Q,componentName:"CountUp"})})]})})};export{dn as default};
