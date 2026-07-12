import{r as u,j as e,aj as b,B as D,T as M}from"./index-TQprzHkU.js";import{u as N,C as $,T as j,P as B,a as E,b as H,c as O}from"./useComponentProps-CjYSqekE.js";import{C as A}from"./Customize-BdikCFm5.js";import{P as C}from"./PreviewSlider-CCbi2och.js";import{P as x}from"./PreviewSwitch-CcPSwIGg.js";import{P as G}from"./PreviewSelect-DZgUm0jD.js";import{P as I}from"./PreviewColorPickerCustom-BFsDkSOr.js";import{u as L}from"./use-motion-value-rrV2ndVB.js";import{u as V}from"./use-animation-frame-Mv9UND56.js";import{u as U}from"./use-transform-D9sL3to7.js";import"./index-DQmtNYX5.js";import"./CodeHighlighter-Dx4QNbvH.js";import"./rotate-ccw-_xDu3G0k.js";/* empty css                       */function W({children:p,className:r="",colors:g=["#5227FF","#FF9FFC","#B497CF"],animationSpeed:h=8,showBorder:o=!1,direction:a="horizontal",pauseOnHover:s=!1,yoyo:m=!0}){const[v,f]=u.useState(!1),i=L(0),d=u.useRef(0),n=u.useRef(null),t=h*1e3;V(c=>{if(v){n.current=null;return}if(n.current===null){n.current=c;return}const S=c-n.current;if(n.current=c,d.current+=S,m){const z=t*2,y=d.current%z;y<t?i.set(y/t*100):i.set(100-(y-t)/t*100)}else i.set(d.current/t*100)}),u.useEffect(()=>{d.current=0,i.set(0)},[h,i,m]);const l=U(i,c=>a==="horizontal"?`${c}% 50%`:a==="vertical"?`50% ${c}%`:`${c}% 50%`),F=u.useCallback(()=>{s&&f(!0)},[s]),k=u.useCallback(()=>{s&&f(!1)},[s]),P=a==="horizontal"?"to right":a==="vertical"?"to bottom":"to bottom right",w=[...g,g[0]].join(", "),T={backgroundImage:`linear-gradient(${P}, ${w})`,backgroundSize:a==="horizontal"?"300% 100%":a==="vertical"?"100% 300%":"300% 300%",backgroundRepeat:"repeat"};return e.jsxs(b.div,{className:`animated-gradient-text ${o?"with-border":""} ${r}`,onMouseEnter:F,onMouseLeave:k,children:[o&&e.jsx(b.div,{className:"gradient-overlay",style:{...T,backgroundPosition:l}}),e.jsx(b.div,{className:"text-content",style:{...T,backgroundPosition:l},children:p})]})}const Y=`import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, useMotionValue, useAnimationFrame, useTransform } from 'motion/react';
import './GradientText.css';

export default function GradientText({
  children,
  className = '',
  colors = ['#5227FF', '#FF9FFC', '#B497CF'],
  animationSpeed = 8,
  showBorder = false,
  direction = 'horizontal',
  pauseOnHover = false,
  yoyo = true
}) {
  const [isPaused, setIsPaused] = useState(false);
  const progress = useMotionValue(0);
  const elapsedRef = useRef(0);
  const lastTimeRef = useRef(null);

  const animationDuration = animationSpeed * 1000;

  useAnimationFrame(time => {
    if (isPaused) {
      lastTimeRef.current = null;
      return;
    }

    if (lastTimeRef.current === null) {
      lastTimeRef.current = time;
      return;
    }

    const deltaTime = time - lastTimeRef.current;
    lastTimeRef.current = time;
    elapsedRef.current += deltaTime;

    if (yoyo) {
      const fullCycle = animationDuration * 2;
      const cycleTime = elapsedRef.current % fullCycle;

      if (cycleTime < animationDuration) {
        progress.set((cycleTime / animationDuration) * 100);
      } else {
        progress.set(100 - ((cycleTime - animationDuration) / animationDuration) * 100);
      }
    } else {
      // Continuously increase position for seamless looping
      progress.set((elapsedRef.current / animationDuration) * 100);
    }
  });

  useEffect(() => {
    elapsedRef.current = 0;
    progress.set(0);
  }, [animationSpeed, progress, yoyo]);

  const backgroundPosition = useTransform(progress, p => {
    if (direction === 'horizontal') {
      return \`\${p}% 50%\`;
    } else if (direction === 'vertical') {
      return \`50% \${p}%\`;
    } else {
      // For diagonal, move only horizontally to avoid interference patterns
      return \`\${p}% 50%\`;
    }
  });

  const handleMouseEnter = useCallback(() => {
    if (pauseOnHover) setIsPaused(true);
  }, [pauseOnHover]);

  const handleMouseLeave = useCallback(() => {
    if (pauseOnHover) setIsPaused(false);
  }, [pauseOnHover]);

  const gradientAngle =
    direction === 'horizontal' ? 'to right' : direction === 'vertical' ? 'to bottom' : 'to bottom right';
  // Duplicate first color at the end for seamless looping
  const gradientColors = [...colors, colors[0]].join(', ');

  const gradientStyle = {
    backgroundImage: \`linear-gradient(\${gradientAngle}, \${gradientColors})\`,
    backgroundSize: direction === 'horizontal' ? '300% 100%' : direction === 'vertical' ? '100% 300%' : '300% 300%',
    backgroundRepeat: 'repeat'
  };

  return (
    <motion.div
      className={\`animated-gradient-text \${showBorder ? 'with-border' : ''} \${className}\`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {showBorder && <motion.div className="gradient-overlay" style={{ ...gradientStyle, backgroundPosition }} />}
      <motion.div className="text-content" style={{ ...gradientStyle, backgroundPosition }}>
        {children}
      </motion.div>
    </motion.div>
  );
}
`,_=`.animated-gradient-text {
  position: relative;
  margin: 0 auto;
  display: flex;
  max-width: fit-content;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 1.25rem;
  font-weight: 500;
  backdrop-filter: blur(10px);
  transition: box-shadow 0.5s ease-out;
  overflow: hidden;
  cursor: pointer;
}

.animated-gradient-text.with-border {
  padding: 0.35rem 0.75rem;
}

.gradient-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: inherit;
  z-index: 0;
  pointer-events: none;
}

.gradient-overlay::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  border-radius: inherit;
  width: calc(100% - 2px);
  height: calc(100% - 2px);
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: #120F17;
  z-index: -1;
}

.text-content {
  display: inline-block;
  position: relative;
  z-index: 2;
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}
`,q=`import { useState, useCallback, useEffect, useRef } from 'react';
import { motion, useMotionValue, useAnimationFrame, useTransform } from 'motion/react';

export default function GradientText({
  children,
  className = '',
  colors = ['#5227FF', '#FF9FFC', '#B497CF'],
  animationSpeed = 8,
  showBorder = false,
  direction = 'horizontal',
  pauseOnHover = false,
  yoyo = true
}) {
  const [isPaused, setIsPaused] = useState(false);
  const progress = useMotionValue(0);
  const elapsedRef = useRef(0);
  const lastTimeRef = useRef(null);

  const animationDuration = animationSpeed * 1000;

  useAnimationFrame(time => {
    if (isPaused) {
      lastTimeRef.current = null;
      return;
    }

    if (lastTimeRef.current === null) {
      lastTimeRef.current = time;
      return;
    }

    const deltaTime = time - lastTimeRef.current;
    lastTimeRef.current = time;
    elapsedRef.current += deltaTime;

    if (yoyo) {
      const fullCycle = animationDuration * 2;
      const cycleTime = elapsedRef.current % fullCycle;

      if (cycleTime < animationDuration) {
        progress.set((cycleTime / animationDuration) * 100);
      } else {
        progress.set(100 - ((cycleTime - animationDuration) / animationDuration) * 100);
      }
    } else {
      // Continuously increase position for seamless looping
      progress.set((elapsedRef.current / animationDuration) * 100);
    }
  });

  useEffect(() => {
    elapsedRef.current = 0;
    progress.set(0);
  }, [animationSpeed, progress, yoyo]);

  const backgroundPosition = useTransform(progress, p => {
    if (direction === 'horizontal') {
      return \`\${p}% 50%\`;
    } else if (direction === 'vertical') {
      return \`50% \${p}%\`;
    } else {
      // For diagonal, move only horizontally to avoid interference patterns
      return \`\${p}% 50%\`;
    }
  });

  const handleMouseEnter = useCallback(() => {
    if (pauseOnHover) setIsPaused(true);
  }, [pauseOnHover]);

  const handleMouseLeave = useCallback(() => {
    if (pauseOnHover) setIsPaused(false);
  }, [pauseOnHover]);

  const gradientAngle =
    direction === 'horizontal' ? 'to right' : direction === 'vertical' ? 'to bottom' : 'to bottom right';
  // Duplicate first color at the end for seamless looping
  const gradientColors = [...colors, colors[0]].join(', ');

  const gradientStyle = {
    backgroundImage: \`linear-gradient(\${gradientAngle}, \${gradientColors})\`,
    backgroundSize: direction === 'horizontal' ? '300% 100%' : direction === 'vertical' ? '100% 300%' : '300% 300%',
    backgroundRepeat: 'repeat'
  };

  return (
    <motion.div
      className={\`relative mx-auto flex max-w-fit flex-row items-center justify-center rounded-[1.25rem] font-medium backdrop-blur transition-shadow duration-500 overflow-hidden cursor-pointer \${showBorder ? 'py-1 px-2' : ''} \${className}\`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {showBorder && (
        <motion.div
          className="absolute inset-0 z-0 pointer-events-none rounded-[1.25rem]"
          style={{ ...gradientStyle, backgroundPosition }}
        >
          <div
            className="absolute bg-black rounded-[1.25rem] z-[-1]"
            style={{
              width: 'calc(100% - 2px)',
              height: 'calc(100% - 2px)',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)'
            }}
          />
        </motion.div>
      )}
      <motion.div
        className="inline-block relative z-2 text-transparent bg-clip-text"
        style={{ ...gradientStyle, backgroundPosition, WebkitBackgroundClip: 'text' }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
`,J=`import { useState, useCallback, useEffect, useRef, ReactNode } from 'react';
import { motion, useMotionValue, useAnimationFrame, useTransform } from 'motion/react';
import './GradientText.css';

interface GradientTextProps {
  children: ReactNode;
  className?: string;
  colors?: string[];
  animationSpeed?: number;
  showBorder?: boolean;
  direction?: 'horizontal' | 'vertical' | 'diagonal';
  pauseOnHover?: boolean;
  yoyo?: boolean;
}

export default function GradientText({
  children,
  className = '',
  colors = ['#5227FF', '#FF9FFC', '#B497CF'],
  animationSpeed = 8,
  showBorder = false,
  direction = 'horizontal',
  pauseOnHover = false,
  yoyo = true
}: GradientTextProps) {
  const [isPaused, setIsPaused] = useState(false);
  const progress = useMotionValue(0);
  const elapsedRef = useRef(0);
  const lastTimeRef = useRef<number | null>(null);

  const animationDuration = animationSpeed * 1000;

  useAnimationFrame(time => {
    if (isPaused) {
      lastTimeRef.current = null;
      return;
    }

    if (lastTimeRef.current === null) {
      lastTimeRef.current = time;
      return;
    }

    const deltaTime = time - lastTimeRef.current;
    lastTimeRef.current = time;
    elapsedRef.current += deltaTime;

    if (yoyo) {
      const fullCycle = animationDuration * 2;
      const cycleTime = elapsedRef.current % fullCycle;

      if (cycleTime < animationDuration) {
        progress.set((cycleTime / animationDuration) * 100);
      } else {
        progress.set(100 - ((cycleTime - animationDuration) / animationDuration) * 100);
      }
    } else {
      // Continuously increase position for seamless looping
      progress.set((elapsedRef.current / animationDuration) * 100);
    }
  });

  useEffect(() => {
    elapsedRef.current = 0;
    progress.set(0);
  }, [animationSpeed, yoyo]);

  const backgroundPosition = useTransform(progress, p => {
    if (direction === 'horizontal') {
      return \`\${p}% 50%\`;
    } else if (direction === 'vertical') {
      return \`50% \${p}%\`;
    } else {
      // For diagonal, move only horizontally to avoid interference patterns
      return \`\${p}% 50%\`;
    }
  });

  const handleMouseEnter = useCallback(() => {
    if (pauseOnHover) setIsPaused(true);
  }, [pauseOnHover]);

  const handleMouseLeave = useCallback(() => {
    if (pauseOnHover) setIsPaused(false);
  }, [pauseOnHover]);

  const gradientAngle =
    direction === 'horizontal' ? 'to right' : direction === 'vertical' ? 'to bottom' : 'to bottom right';
  // Duplicate first color at the end for seamless looping
  const gradientColors = [...colors, colors[0]].join(', ');

  const gradientStyle = {
    backgroundImage: \`linear-gradient(\${gradientAngle}, \${gradientColors})\`,
    backgroundSize: direction === 'horizontal' ? '300% 100%' : direction === 'vertical' ? '100% 300%' : '300% 300%',
    backgroundRepeat: 'repeat'
  };

  return (
    <motion.div
      className={\`animated-gradient-text \${showBorder ? 'with-border' : ''} \${className}\`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {showBorder && <motion.div className="gradient-overlay" style={{ ...gradientStyle, backgroundPosition }} />}
      <motion.div className="text-content" style={{ ...gradientStyle, backgroundPosition }}>
        {children}
      </motion.div>
    </motion.div>
  );
}
`,K=`import { useState, useCallback, useEffect, useRef, ReactNode } from 'react';
import { motion, useMotionValue, useAnimationFrame, useTransform } from 'motion/react';

interface GradientTextProps {
  children: ReactNode;
  className?: string;
  colors?: string[];
  animationSpeed?: number;
  showBorder?: boolean;
  direction?: 'horizontal' | 'vertical' | 'diagonal';
  pauseOnHover?: boolean;
  yoyo?: boolean;
}

export default function GradientText({
  children,
  className = '',
  colors = ['#5227FF', '#FF9FFC', '#B497CF'],
  animationSpeed = 8,
  showBorder = false,
  direction = 'horizontal',
  pauseOnHover = false,
  yoyo = true
}: GradientTextProps) {
  const [isPaused, setIsPaused] = useState(false);
  const progress = useMotionValue(0);
  const elapsedRef = useRef(0);
  const lastTimeRef = useRef<number | null>(null);

  const animationDuration = animationSpeed * 1000;

  useAnimationFrame(time => {
    if (isPaused) {
      lastTimeRef.current = null;
      return;
    }

    if (lastTimeRef.current === null) {
      lastTimeRef.current = time;
      return;
    }

    const deltaTime = time - lastTimeRef.current;
    lastTimeRef.current = time;
    elapsedRef.current += deltaTime;

    if (yoyo) {
      const fullCycle = animationDuration * 2;
      const cycleTime = elapsedRef.current % fullCycle;

      if (cycleTime < animationDuration) {
        progress.set((cycleTime / animationDuration) * 100);
      } else {
        progress.set(100 - ((cycleTime - animationDuration) / animationDuration) * 100);
      }
    } else {
      // Continuously increase position for seamless looping
      progress.set((elapsedRef.current / animationDuration) * 100);
    }
  });

  useEffect(() => {
    elapsedRef.current = 0;
    progress.set(0);
  }, [animationSpeed, yoyo]);

  const backgroundPosition = useTransform(progress, p => {
    if (direction === 'horizontal') {
      return \`\${p}% 50%\`;
    } else if (direction === 'vertical') {
      return \`50% \${p}%\`;
    } else {
      // For diagonal, move only horizontally to avoid interference patterns
      return \`\${p}% 50%\`;
    }
  });

  const handleMouseEnter = useCallback(() => {
    if (pauseOnHover) setIsPaused(true);
  }, [pauseOnHover]);

  const handleMouseLeave = useCallback(() => {
    if (pauseOnHover) setIsPaused(false);
  }, [pauseOnHover]);

  const gradientAngle =
    direction === 'horizontal' ? 'to right' : direction === 'vertical' ? 'to bottom' : 'to bottom right';
  // Duplicate first color at the end for seamless looping
  const gradientColors = [...colors, colors[0]].join(', ');

  const gradientStyle = {
    backgroundImage: \`linear-gradient(\${gradientAngle}, \${gradientColors})\`,
    backgroundSize: direction === 'horizontal' ? '300% 100%' : direction === 'vertical' ? '100% 300%' : '300% 300%',
    backgroundRepeat: 'repeat'
  };

  return (
    <motion.div
      className={\`relative mx-auto flex max-w-fit flex-row items-center justify-center rounded-[1.25rem] font-medium backdrop-blur transition-shadow duration-500 overflow-hidden cursor-pointer \${showBorder ? 'py-1 px-2' : ''} \${className}\`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {showBorder && (
        <motion.div
          className="absolute inset-0 z-0 pointer-events-none rounded-[1.25rem]"
          style={{ ...gradientStyle, backgroundPosition }}
        >
          <div
            className="absolute bg-black rounded-[1.25rem] z-[-1]"
            style={{
              width: 'calc(100% - 2px)',
              height: 'calc(100% - 2px)',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)'
            }}
          />
        </motion.div>
      )}
      <motion.div
        className="inline-block relative z-2 text-transparent bg-clip-text"
        style={{ ...gradientStyle, backgroundPosition, WebkitBackgroundClip: 'text' }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
`,Q={usage:`import GradientText from './GradientText'

// For a smoother animation, the gradient should start and end with the same color
  
<GradientText
  colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
  animationSpeed={3}
  showBorder={false}
  className="custom-class"
>
  Add a splash of color!
</GradientText>`,code:Y,css:_,tailwind:q,tsCode:J,tsTailwind:K},R={colors:["#5227FF","#FF9FFC","#B497CF"],animationSpeed:8,direction:"horizontal",pauseOnHover:!1,yoyo:!0,showBorder:!1},fn=()=>{const{props:p,updateProp:r,resetProps:g,hasChanges:h}=N(R),{colors:o,animationSpeed:a,direction:s,pauseOnHover:m,yoyo:v,showBorder:f}=p,i=(n,t)=>{const l=[...o];l[n]=t,r("colors",l)},d=u.useMemo(()=>[{name:"children",type:"ReactNode",default:"-",description:"The content to be displayed inside the gradient text."},{name:"className",type:"string",default:"''",description:"Adds custom classes to the root element for additional styling."},{name:"colors",type:"string[]",default:'["#5227FF", "#FF9FFC", "#B497CF"]',description:"Array of colors for the gradient effect."},{name:"animationSpeed",type:"number",default:"8",description:"Duration of one animation cycle in seconds."},{name:"direction",type:"'horizontal' | 'vertical' | 'diagonal'",default:"'horizontal'",description:"Direction of the gradient animation."},{name:"pauseOnHover",type:"boolean",default:"false",description:"Pauses the animation when hovering over the text."},{name:"yoyo",type:"boolean",default:"true",description:"Reverses animation direction at the end instead of looping."},{name:"showBorder",type:"boolean",default:"false",description:"Displays a gradient border around the text."}],[]);return e.jsx($,{props:p,defaultProps:R,resetProps:g,hasChanges:h,children:e.jsxs(j,{children:[e.jsxs(B,{children:[e.jsx(D,{position:"relative",className:"demo-container",minH:400,children:e.jsx(M,{fontSize:"3rem",as:"div",children:e.jsx(W,{colors:o,animationSpeed:a,direction:s,pauseOnHover:m,yoyo:v,showBorder:f,children:"Gradient Magic"})})}),e.jsxs(A,{children:[o.map((n,t)=>e.jsx(I,{title:`Color ${t+1}`,color:n,onChange:l=>i(t,l)},t)),e.jsx(C,{title:"Color Count",min:2,max:8,step:1,value:o.length,onChange:n=>{if(n>o.length){const t=[...o];for(;t.length<n;)t.push("#ffffff");r("colors",t)}else n<o.length&&r("colors",o.slice(0,n))}}),e.jsx(C,{title:"Animation Speed",min:1,max:20,step:.5,value:a,onChange:n=>r("animationSpeed",n),valueUnit:"s"}),e.jsx(G,{title:"Direction",options:[{value:"horizontal",label:"Horizontal"},{value:"vertical",label:"Vertical"},{value:"diagonal",label:"Diagonal"}],value:s,onChange:n=>r("direction",n)}),e.jsx(x,{title:"Yoyo",isChecked:v,onChange:n=>r("yoyo",n)}),e.jsx(x,{title:"Pause on Hover",isChecked:m,onChange:n=>r("pauseOnHover",n)}),e.jsx(x,{title:"Show Border",isChecked:f,onChange:n=>r("showBorder",n)})]}),e.jsx(E,{data:d})]}),e.jsx(H,{children:e.jsx(O,{codeObject:Q,componentName:"GradientText"})})]})})};export{fn as default};
