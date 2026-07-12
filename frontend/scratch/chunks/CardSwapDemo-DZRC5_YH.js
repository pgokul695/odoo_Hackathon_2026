import{r as i,R as F,N as j,j as e,B as p,T as C,I as M,d$ as $,e0 as Y,e1 as X}from"./index-TQprzHkU.js";import{u as V,C as B,T as _,P as W,a as U,b as q,c as J}from"./useComponentProps-CjYSqekE.js";import{C as Q}from"./Customize-BdikCFm5.js";import{D as G}from"./Dependencies-IIL9riMN.js";import{P as S}from"./PreviewSlider-CCbi2och.js";import{P as K}from"./PreviewSwitch-CcPSwIGg.js";import{P as Z}from"./PreviewSelect-DZgUm0jD.js";import{u as ee}from"./useForceRerender-Dq8YDj2j.js";import"./index-DQmtNYX5.js";import"./CodeHighlighter-Dx4QNbvH.js";import"./rotate-ccw-_xDu3G0k.js";/* empty css                       */const ne="/assets/cs1-Chee3isR.webp",te="/assets/cs2-D7NMRsmg.webp",re="/assets/cs3-BURQntE8.webp",ae=`import React, { Children, cloneElement, forwardRef, isValidElement, useEffect, useMemo, useRef } from 'react';
import gsap from 'gsap';
import './CardSwap.css';

export const Card = forwardRef(({ customClass, ...rest }, ref) => (
  <div ref={ref} {...rest} className={\`card \${customClass ?? ''} \${rest.className ?? ''}\`.trim()} />
));
Card.displayName = 'Card';

const makeSlot = (i, distX, distY, total) => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 1.5,
  zIndex: total - i
});
const placeNow = (el, slot, skew) =>
  gsap.set(el, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    transformOrigin: 'center center',
    zIndex: slot.zIndex,
    force3D: true
  });

const CardSwap = ({
  width = 500,
  height = 400,
  cardDistance = 60,
  verticalDistance = 70,
  delay = 5000,
  pauseOnHover = false,
  onCardClick,
  skewAmount = 6,
  easing = 'elastic',
  children
}) => {
  const config =
    easing === 'elastic'
      ? {
          ease: 'elastic.out(0.6,0.9)',
          durDrop: 2,
          durMove: 2,
          durReturn: 2,
          promoteOverlap: 0.9,
          returnDelay: 0.05
        }
      : {
          ease: 'power1.inOut',
          durDrop: 0.8,
          durMove: 0.8,
          durReturn: 0.8,
          promoteOverlap: 0.45,
          returnDelay: 0.2
        };

  const childArr = useMemo(() => Children.toArray(children), [children]);
  const refs = useMemo(
    () => childArr.map(() => React.createRef()),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [childArr.length]
  );

  const order = useRef(Array.from({ length: childArr.length }, (_, i) => i));

  const tlRef = useRef(null);
  const intervalRef = useRef();
  const container = useRef(null);

  useEffect(() => {
    const total = refs.length;
    refs.forEach((r, i) => placeNow(r.current, makeSlot(i, cardDistance, verticalDistance, total), skewAmount));

    const swap = () => {
      if (order.current.length < 2) return;

      const [front, ...rest] = order.current;
      const elFront = refs[front].current;
      const tl = gsap.timeline();
      tlRef.current = tl;

      tl.to(elFront, {
        y: '+=500',
        duration: config.durDrop,
        ease: config.ease
      });

      tl.addLabel('promote', \`-=\${config.durDrop * config.promoteOverlap}\`);
      rest.forEach((idx, i) => {
        const el = refs[idx].current;
        const slot = makeSlot(i, cardDistance, verticalDistance, refs.length);
        tl.set(el, { zIndex: slot.zIndex }, 'promote');
        tl.to(
          el,
          {
            x: slot.x,
            y: slot.y,
            z: slot.z,
            duration: config.durMove,
            ease: config.ease
          },
          \`promote+=\${i * 0.15}\`
        );
      });

      const backSlot = makeSlot(refs.length - 1, cardDistance, verticalDistance, refs.length);
      tl.addLabel('return', \`promote+=\${config.durMove * config.returnDelay}\`);
      tl.call(
        () => {
          gsap.set(elFront, { zIndex: backSlot.zIndex });
        },
        undefined,
        'return'
      );
      tl.to(
        elFront,
        {
          x: backSlot.x,
          y: backSlot.y,
          z: backSlot.z,
          duration: config.durReturn,
          ease: config.ease
        },
        'return'
      );

      tl.call(() => {
        order.current = [...rest, front];
      });
    };

    swap();
    intervalRef.current = window.setInterval(swap, delay);

    if (pauseOnHover) {
      const node = container.current;
      const pause = () => {
        tlRef.current?.pause();
        clearInterval(intervalRef.current);
      };
      const resume = () => {
        tlRef.current?.play();
        intervalRef.current = window.setInterval(swap, delay);
      };
      node.addEventListener('mouseenter', pause);
      node.addEventListener('mouseleave', resume);
      return () => {
        node.removeEventListener('mouseenter', pause);
        node.removeEventListener('mouseleave', resume);
        clearInterval(intervalRef.current);
      };
    }
    return () => clearInterval(intervalRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardDistance, verticalDistance, delay, pauseOnHover, skewAmount, easing]);

  const rendered = childArr.map((child, i) =>
    isValidElement(child)
      ? cloneElement(child, {
          key: i,
          ref: refs[i],
          style: { width, height, ...(child.props.style ?? {}) },
          onClick: e => {
            child.props.onClick?.(e);
            onCardClick?.(i);
          }
        })
      : child
  );

  return (
    <div ref={container} className="card-swap-container" style={{ width, height }}>
      {rendered}
    </div>
  );
};

export default CardSwap;
`,se=`.card-swap-container {
  position: absolute;
  bottom: 0;
  right: 0;
  transform: translate(5%, 20%);
  transform-origin: bottom right;

  perspective: 900px;
  overflow: visible;
}

.card {
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 12px;
  border: 1px solid #fff;
  background: #000;

  transform-style: preserve-3d;
  will-change: transform;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

@media (max-width: 768px) {
  .card-swap-container {
    transform: scale(0.75) translate(25%, 25%);
  }
}

@media (max-width: 480px) {
  .card-swap-container {
    transform: scale(0.55) translate(25%, 25%);
  }
}
`,oe=`import React, { Children, cloneElement, forwardRef, isValidElement, useEffect, useMemo, useRef } from 'react';
import gsap from 'gsap';

export const Card = forwardRef(({ customClass, ...rest }, ref) => (
  <div
    ref={ref}
    {...rest}
    className={\`absolute top-1/2 left-1/2 rounded-xl border border-white bg-black [transform-style:preserve-3d] [will-change:transform] [backface-visibility:hidden] \${customClass ?? ''} \${rest.className ?? ''}\`.trim()}
  />
));
Card.displayName = 'Card';

const makeSlot = (i, distX, distY, total) => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 1.5,
  zIndex: total - i
});

const placeNow = (el, slot, skew) =>
  gsap.set(el, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    transformOrigin: 'center center',
    zIndex: slot.zIndex,
    force3D: true
  });

const CardSwap = ({
  width = 500,
  height = 400,
  cardDistance = 60,
  verticalDistance = 70,
  delay = 5000,
  pauseOnHover = false,
  onCardClick,
  skewAmount = 6,
  easing = 'elastic',
  children
}) => {
  const config =
    easing === 'elastic'
      ? {
          ease: 'elastic.out(0.6,0.9)',
          durDrop: 2,
          durMove: 2,
          durReturn: 2,
          promoteOverlap: 0.9,
          returnDelay: 0.05
        }
      : {
          ease: 'power1.inOut',
          durDrop: 0.8,
          durMove: 0.8,
          durReturn: 0.8,
          promoteOverlap: 0.45,
          returnDelay: 0.2
        };

  const childArr = useMemo(() => Children.toArray(children), [children]);
  const refs = useMemo(
    () => childArr.map(() => React.createRef()),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [childArr.length]
  );

  const order = useRef(Array.from({ length: childArr.length }, (_, i) => i));

  const tlRef = useRef(null);
  const intervalRef = useRef();
  const container = useRef(null);

  useEffect(() => {
    const total = refs.length;
    refs.forEach((r, i) => placeNow(r.current, makeSlot(i, cardDistance, verticalDistance, total), skewAmount));

    const swap = () => {
      if (order.current.length < 2) return;

      const [front, ...rest] = order.current;
      const elFront = refs[front].current;
      const tl = gsap.timeline();
      tlRef.current = tl;

      tl.to(elFront, {
        y: '+=500',
        duration: config.durDrop,
        ease: config.ease
      });

      tl.addLabel('promote', \`-=\${config.durDrop * config.promoteOverlap}\`);
      rest.forEach((idx, i) => {
        const el = refs[idx].current;
        const slot = makeSlot(i, cardDistance, verticalDistance, refs.length);
        tl.set(el, { zIndex: slot.zIndex }, 'promote');
        tl.to(
          el,
          {
            x: slot.x,
            y: slot.y,
            z: slot.z,
            duration: config.durMove,
            ease: config.ease
          },
          \`promote+=\${i * 0.15}\`
        );
      });

      const backSlot = makeSlot(refs.length - 1, cardDistance, verticalDistance, refs.length);
      tl.addLabel('return', \`promote+=\${config.durMove * config.returnDelay}\`);
      tl.call(
        () => {
          gsap.set(elFront, { zIndex: backSlot.zIndex });
        },
        undefined,
        'return'
      );
      tl.to(
        elFront,
        {
          x: backSlot.x,
          y: backSlot.y,
          z: backSlot.z,
          duration: config.durReturn,
          ease: config.ease
        },
        'return'
      );

      tl.call(() => {
        order.current = [...rest, front];
      });
    };

    swap();
    intervalRef.current = window.setInterval(swap, delay);

    if (pauseOnHover) {
      const node = container.current;
      const pause = () => {
        tlRef.current?.pause();
        clearInterval(intervalRef.current);
      };
      const resume = () => {
        tlRef.current?.play();
        intervalRef.current = window.setInterval(swap, delay);
      };
      node.addEventListener('mouseenter', pause);
      node.addEventListener('mouseleave', resume);
      return () => {
        node.removeEventListener('mouseenter', pause);
        node.removeEventListener('mouseleave', resume);
        clearInterval(intervalRef.current);
      };
    }
    return () => clearInterval(intervalRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardDistance, verticalDistance, delay, pauseOnHover, skewAmount, easing]);

  const rendered = childArr.map((child, i) =>
    isValidElement(child)
      ? cloneElement(child, {
          key: i,
          ref: refs[i],
          style: { width, height, ...(child.props.style ?? {}) },
          onClick: e => {
            child.props.onClick?.(e);
            onCardClick?.(i);
          }
        })
      : child
  );

  return (
    <div
      ref={container}
      className="absolute bottom-0 right-0 transform translate-x-[5%] translate-y-[20%] origin-bottom-right perspective-[900px] overflow-visible max-[768px]:translate-x-[25%] max-[768px]:translate-y-[25%] max-[768px]:scale-[0.75] max-[480px]:translate-x-[25%] max-[480px]:translate-y-[25%] max-[480px]:scale-[0.55]"
      style={{ width, height }}
    >
      {rendered}
    </div>
  );
};

export default CardSwap;
`,le=`import React, {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  ReactElement,
  ReactNode,
  RefObject,
  useEffect,
  useMemo,
  useRef
} from 'react';
import gsap from 'gsap';
import './CardSwap.css';

export interface CardSwapProps {
  width?: number | string;
  height?: number | string;
  cardDistance?: number;
  verticalDistance?: number;
  delay?: number;
  pauseOnHover?: boolean;
  onCardClick?: (idx: number) => void;
  skewAmount?: number;
  easing?: 'linear' | 'elastic';
  children: ReactNode;
}

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  customClass?: string;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(({ customClass, ...rest }, ref) => (
  <div ref={ref} {...rest} className={\`card \${customClass ?? ''} \${rest.className ?? ''}\`.trim()} />
));
Card.displayName = 'Card';

type CardRef = RefObject<HTMLDivElement | null>;
interface Slot {
  x: number;
  y: number;
  z: number;
  zIndex: number;
}

const makeSlot = (i: number, distX: number, distY: number, total: number): Slot => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 1.5,
  zIndex: total - i
});

const placeNow = (el: HTMLElement, slot: Slot, skew: number) =>
  gsap.set(el, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    transformOrigin: 'center center',
    zIndex: slot.zIndex,
    force3D: true
  });

const CardSwap: React.FC<CardSwapProps> = ({
  width = 500,
  height = 400,
  cardDistance = 60,
  verticalDistance = 70,
  delay = 5000,
  pauseOnHover = false,
  onCardClick,
  skewAmount = 6,
  easing = 'elastic',
  children
}) => {
  const config =
    easing === 'elastic'
      ? {
          ease: 'elastic.out(0.6,0.9)',
          durDrop: 2,
          durMove: 2,
          durReturn: 2,
          promoteOverlap: 0.9,
          returnDelay: 0.05
        }
      : {
          ease: 'power1.inOut',
          durDrop: 0.8,
          durMove: 0.8,
          durReturn: 0.8,
          promoteOverlap: 0.45,
          returnDelay: 0.2
        };

  const childArr = useMemo(() => Children.toArray(children) as ReactElement<CardProps>[], [children]);
  const refs = useMemo<CardRef[]>(() => childArr.map(() => React.createRef<HTMLDivElement>()), [childArr.length]);

  const order = useRef<number[]>(Array.from({ length: childArr.length }, (_, i) => i));

  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const intervalRef = useRef<number>(0);
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const total = refs.length;
    refs.forEach((r, i) => placeNow(r.current!, makeSlot(i, cardDistance, verticalDistance, total), skewAmount));

    const swap = () => {
      if (order.current.length < 2) return;

      const [front, ...rest] = order.current;
      const elFront = refs[front].current!;
      const tl = gsap.timeline();
      tlRef.current = tl;

      tl.to(elFront, {
        y: '+=500',
        duration: config.durDrop,
        ease: config.ease
      });

      tl.addLabel('promote', \`-=\${config.durDrop * config.promoteOverlap}\`);
      rest.forEach((idx, i) => {
        const el = refs[idx].current!;
        const slot = makeSlot(i, cardDistance, verticalDistance, refs.length);
        tl.set(el, { zIndex: slot.zIndex }, 'promote');
        tl.to(
          el,
          {
            x: slot.x,
            y: slot.y,
            z: slot.z,
            duration: config.durMove,
            ease: config.ease
          },
          \`promote+=\${i * 0.15}\`
        );
      });

      const backSlot = makeSlot(refs.length - 1, cardDistance, verticalDistance, refs.length);
      tl.addLabel('return', \`promote+=\${config.durMove * config.returnDelay}\`);
      tl.call(
        () => {
          gsap.set(elFront, { zIndex: backSlot.zIndex });
        },
        undefined,
        'return'
      );
      tl.to(
        elFront,
        {
          x: backSlot.x,
          y: backSlot.y,
          z: backSlot.z,
          duration: config.durReturn,
          ease: config.ease
        },
        'return'
      );

      tl.call(() => {
        order.current = [...rest, front];
      });
    };

    swap();
    intervalRef.current = window.setInterval(swap, delay);

    if (pauseOnHover) {
      const node = container.current!;
      const pause = () => {
        tlRef.current?.pause();
        clearInterval(intervalRef.current);
      };
      const resume = () => {
        tlRef.current?.play();
        intervalRef.current = window.setInterval(swap, delay);
      };
      node.addEventListener('mouseenter', pause);
      node.addEventListener('mouseleave', resume);
      return () => {
        node.removeEventListener('mouseenter', pause);
        node.removeEventListener('mouseleave', resume);
        clearInterval(intervalRef.current);
      };
    }
    return () => clearInterval(intervalRef.current);
  }, [cardDistance, verticalDistance, delay, pauseOnHover, skewAmount, easing]);

  const rendered = childArr.map((child, i) =>
    isValidElement<CardProps>(child)
      ? cloneElement(child, {
          key: i,
          ref: refs[i],
          style: { width, height, ...(child.props.style ?? {}) },
          onClick: e => {
            child.props.onClick?.(e as React.MouseEvent<HTMLDivElement>);
            onCardClick?.(i);
          }
        } as CardProps & React.RefAttributes<HTMLDivElement>)
      : child
  );

  return (
    <div ref={container} className="card-swap-container" style={{ width, height }}>
      {rendered}
    </div>
  );
};

export default CardSwap;
`,ie=`import React, {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  ReactElement,
  ReactNode,
  RefObject,
  useEffect,
  useMemo,
  useRef
} from 'react';
import gsap from 'gsap';

export interface CardSwapProps {
  width?: number | string;
  height?: number | string;
  cardDistance?: number;
  verticalDistance?: number;
  delay?: number;
  pauseOnHover?: boolean;
  onCardClick?: (idx: number) => void;
  skewAmount?: number;
  easing?: 'linear' | 'elastic';
  children: ReactNode;
}

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  customClass?: string;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(({ customClass, ...rest }, ref) => (
  <div
    ref={ref}
    {...rest}
    className={\`absolute top-1/2 left-1/2 rounded-xl border border-white bg-black [transform-style:preserve-3d] [will-change:transform] [backface-visibility:hidden] \${customClass ?? ''} \${rest.className ?? ''}\`.trim()}
  />
));
Card.displayName = 'Card';

type CardRef = RefObject<HTMLDivElement | null>;
interface Slot {
  x: number;
  y: number;
  z: number;
  zIndex: number;
}

const makeSlot = (i: number, distX: number, distY: number, total: number): Slot => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 1.5,
  zIndex: total - i
});

const placeNow = (el: HTMLElement, slot: Slot, skew: number) =>
  gsap.set(el, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    transformOrigin: 'center center',
    zIndex: slot.zIndex,
    force3D: true
  });

const CardSwap: React.FC<CardSwapProps> = ({
  width = 500,
  height = 400,
  cardDistance = 60,
  verticalDistance = 70,
  delay = 5000,
  pauseOnHover = false,
  onCardClick,
  skewAmount = 6,
  easing = 'elastic',
  children
}) => {
  const config =
    easing === 'elastic'
      ? {
          ease: 'elastic.out(0.6,0.9)',
          durDrop: 2,
          durMove: 2,
          durReturn: 2,
          promoteOverlap: 0.9,
          returnDelay: 0.05
        }
      : {
          ease: 'power1.inOut',
          durDrop: 0.8,
          durMove: 0.8,
          durReturn: 0.8,
          promoteOverlap: 0.45,
          returnDelay: 0.2
        };

  const childArr = useMemo(() => Children.toArray(children) as ReactElement<CardProps>[], [children]);
  const refs = useMemo<CardRef[]>(() => childArr.map(() => React.createRef<HTMLDivElement>()), [childArr.length]);

  const order = useRef<number[]>(Array.from({ length: childArr.length }, (_, i) => i));

  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const intervalRef = useRef<number>(0);
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const total = refs.length;
    refs.forEach((r, i) => placeNow(r.current!, makeSlot(i, cardDistance, verticalDistance, total), skewAmount));

    const swap = () => {
      if (order.current.length < 2) return;

      const [front, ...rest] = order.current;
      const elFront = refs[front].current!;
      const tl = gsap.timeline();
      tlRef.current = tl;

      tl.to(elFront, {
        y: '+=500',
        duration: config.durDrop,
        ease: config.ease
      });

      tl.addLabel('promote', \`-=\${config.durDrop * config.promoteOverlap}\`);
      rest.forEach((idx, i) => {
        const el = refs[idx].current!;
        const slot = makeSlot(i, cardDistance, verticalDistance, refs.length);
        tl.set(el, { zIndex: slot.zIndex }, 'promote');
        tl.to(
          el,
          {
            x: slot.x,
            y: slot.y,
            z: slot.z,
            duration: config.durMove,
            ease: config.ease
          },
          \`promote+=\${i * 0.15}\`
        );
      });

      const backSlot = makeSlot(refs.length - 1, cardDistance, verticalDistance, refs.length);
      tl.addLabel('return', \`promote+=\${config.durMove * config.returnDelay}\`);
      tl.call(
        () => {
          gsap.set(elFront, { zIndex: backSlot.zIndex });
        },
        undefined,
        'return'
      );
      tl.to(
        elFront,
        {
          x: backSlot.x,
          y: backSlot.y,
          z: backSlot.z,
          duration: config.durReturn,
          ease: config.ease
        },
        'return'
      );

      tl.call(() => {
        order.current = [...rest, front];
      });
    };

    swap();
    intervalRef.current = window.setInterval(swap, delay);

    if (pauseOnHover) {
      const node = container.current!;
      const pause = () => {
        tlRef.current?.pause();
        clearInterval(intervalRef.current);
      };
      const resume = () => {
        tlRef.current?.play();
        intervalRef.current = window.setInterval(swap, delay);
      };
      node.addEventListener('mouseenter', pause);
      node.addEventListener('mouseleave', resume);
      return () => {
        node.removeEventListener('mouseenter', pause);
        node.removeEventListener('mouseleave', resume);
        clearInterval(intervalRef.current);
      };
    }
    return () => clearInterval(intervalRef.current);
  }, [cardDistance, verticalDistance, delay, pauseOnHover, skewAmount, easing]);

  const rendered = childArr.map((child, i) =>
    isValidElement<CardProps>(child)
      ? cloneElement(child, {
          key: i,
          ref: refs[i],
          style: { width, height, ...(child.props.style ?? {}) },
          onClick: e => {
            child.props.onClick?.(e as React.MouseEvent<HTMLDivElement>);
            onCardClick?.(i);
          }
        } as CardProps & React.RefAttributes<HTMLDivElement>)
      : child
  );

  return (
    <div
      ref={container}
      className="absolute bottom-0 right-0 transform translate-x-[5%] translate-y-[20%] origin-bottom-right perspective-[900px] overflow-visible max-[768px]:translate-x-[25%] max-[768px]:translate-y-[25%] max-[768px]:scale-[0.75] max-[480px]:translate-x-[25%] max-[480px]:translate-y-[25%] max-[480px]:scale-[0.55]"
      style={{ width, height }}
    >
      {rendered}
    </div>
  );
};

export default CardSwap;
`,ce={dependencies:"gsap",usage:`import CardSwap, { Card } from './CardSwap'

<div style={{ height: '600px', position: 'relative' }}>
  <CardSwap
    cardDistance={60}
    verticalDistance={70}
    delay={5000}
    pauseOnHover={false}
  >
    <Card>
      <h3>Card 1</h3>
      <p>Your content here</p>
    </Card>
    <Card>
      <h3>Card 2</h3>
      <p>Your content here</p>
    </Card>
    <Card>
      <h3>Card 3</h3>
      <p>Your content here</p>
    </Card>
  </CardSwap>
</div>`,code:ae,css:se,tailwind:oe,tsCode:le,tsTailwind:ie},z=i.forwardRef(({customClass:a,...n},s)=>e.jsx("div",{ref:s,...n,className:`card ${a??""} ${n.className??""}`.trim()}));z.displayName="Card";const A=(a,n,s,o)=>({x:a*n,y:-a*s,z:-a*n*1.5,zIndex:o-a}),de=(a,n,s)=>j.set(a,{x:n.x,y:n.y,z:n.z,xPercent:-50,yPercent:-50,skewY:s,transformOrigin:"center center",zIndex:n.zIndex,force3D:!0}),ue=({width:a=500,height:n=400,cardDistance:s=60,verticalDistance:o=70,delay:g=5e3,pauseOnHover:D=!1,onCardClick:x,skewAmount:b=6,easing:w="elastic",children:y})=>{const l=w==="elastic"?{ease:"elastic.out(0.6,0.9)",durDrop:2,durMove:2,durReturn:2,promoteOverlap:.9,returnDelay:.05}:{ease:"power1.inOut",durDrop:.8,durMove:.8,durReturn:.8,promoteOverlap:.45,returnDelay:.2},v=i.useMemo(()=>i.Children.toArray(y),[y]),d=i.useMemo(()=>v.map(()=>F.createRef()),[v.length]),t=i.useRef(Array.from({length:v.length},(h,m)=>m)),I=i.useRef(null),R=i.useRef(),L=i.useRef(null);i.useEffect(()=>{const h=d.length;d.forEach((c,u)=>de(c.current,A(u,s,o,h),b));const m=()=>{if(t.current.length<2)return;const[c,...u]=t.current,f=d[c].current,r=j.timeline();I.current=r,r.to(f,{y:"+=500",duration:l.durDrop,ease:l.ease}),r.addLabel("promote",`-=${l.durDrop*l.promoteOverlap}`),u.forEach((T,O)=>{const P=d[T].current,E=A(O,s,o,d.length);r.set(P,{zIndex:E.zIndex},"promote"),r.to(P,{x:E.x,y:E.y,z:E.z,duration:l.durMove,ease:l.ease},`promote+=${O*.15}`)});const k=A(d.length-1,s,o,d.length);r.addLabel("return",`promote+=${l.durMove*l.returnDelay}`),r.call(()=>{j.set(f,{zIndex:k.zIndex})},void 0,"return"),r.to(f,{x:k.x,y:k.y,z:k.z,duration:l.durReturn,ease:l.ease},"return"),r.call(()=>{t.current=[...u,c]})};if(m(),R.current=window.setInterval(m,g),D){const c=L.current,u=()=>{var r;(r=I.current)==null||r.pause(),clearInterval(R.current)},f=()=>{var r;(r=I.current)==null||r.play(),R.current=window.setInterval(m,g)};return c.addEventListener("mouseenter",u),c.addEventListener("mouseleave",f),()=>{c.removeEventListener("mouseenter",u),c.removeEventListener("mouseleave",f),clearInterval(R.current)}}return()=>clearInterval(R.current)},[s,o,g,D,b,w]);const N=v.map((h,m)=>i.isValidElement(h)?i.cloneElement(h,{key:m,ref:d[m],style:{width:a,height:n,...h.props.style??{}},onClick:c=>{var u,f;(f=(u=h.props).onClick)==null||f.call(u,c),x==null||x(m)}}):h);return e.jsx("div",{ref:L,className:"card-swap-container",style:{width:a,height:n},children:N})},H={cardDistance:60,verticalDistance:70,delay:5e3,skewAmount:6,easing:"elastic",pauseOnHover:!1},De=()=>{const[a,n]=ee(),{props:s,updateProp:o,resetProps:g,hasChanges:D}=V(H),{cardDistance:x,verticalDistance:b,delay:w,skewAmount:y,easing:l,pauseOnHover:v}=s,d=i.useMemo(()=>[{name:"width",type:"number | string",default:"500",description:"Width of the card container"},{name:"height",type:"number | string",default:"400",description:"Height of the card container"},{name:"cardDistance",type:"number",default:"60",description:"X-axis spacing between cards"},{name:"verticalDistance",type:"number",default:"70",description:"Y-axis spacing between cards"},{name:"delay",type:"number",default:"5000",description:"Milliseconds between card swaps"},{name:"pauseOnHover",type:"boolean",default:"false",description:"Whether to pause animation on hover"},{name:"onCardClick",type:"(idx: number) => void",default:"undefined",description:"Callback function when a card is clicked"},{name:"skewAmount",type:"number",default:"6",description:"Degree of slope for top/bottom edges"},{name:"easing",type:"'linear' | 'elastic'",default:"'elastic'",description:"Animation easing type"},{name:"children",type:"ReactNode",default:"required",description:"Card components to display in the stack"}],[]);return e.jsx(B,{props:s,defaultProps:H,resetProps:g,hasChanges:D,children:e.jsxs(_,{children:[e.jsxs(W,{children:[e.jsxs(p,{className:"demo-container",h:500,overflow:"hidden",display:"flex",flexDirection:{base:"column",lg:"row"},position:"relative",children:[e.jsxs(p,{pl:{base:0,lg:0},w:{base:"100%",lg:"50%"},h:{base:"auto",lg:"100%"},display:"flex",flexDirection:"column",justifyContent:{base:"flex-start",lg:"center"},alignItems:{base:"center",lg:"flex-start"},textAlign:{base:"center",lg:"left"},pt:{base:8,lg:0},pb:{base:4,lg:0},px:{base:0,lg:0},children:[e.jsxs(C,{fontSize:{base:"2xl",md:"3xl",lg:"3xl"},mb:4,fontWeight:500,lineHeight:1.1,pl:{base:0,lg:"6rem"},children:["Card stacks have never"," ",e.jsx(p,{as:"span",display:{base:"inline",lg:"block"},children:"looked so good"})]}),e.jsx(C,{fontSize:{base:"lg",lg:"xl"},mb:4,fontWeight:400,lineHeight:1.1,color:"#999",pl:{base:0,lg:"6rem"},children:"Just look at it go!"})]}),e.jsx(p,{w:{base:"100%",lg:"50%"},h:{base:"400px",lg:"100%"},position:"relative",children:e.jsxs(ue,{cardDistance:x,verticalDistance:b,delay:w,skewAmount:y,easing:l,pauseOnHover:v,children:[e.jsxs(z,{customClass:"one",style:{display:"flex",flexDirection:"column",overflow:"hidden"},children:[e.jsx(p,{borderBottom:"1px solid #fff",bg:"linear-gradient(to top, #1B1722, #060606)",flexShrink:0,children:e.jsxs(C,{m:2,children:[e.jsx(M,{as:$,mr:2}),"Smooth"]})}),e.jsx(p,{position:"relative",flex:1,children:e.jsx("img",{src:ne,alt:"Card Swap Demo 1",style:{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",display:"block"}})})]}),e.jsxs(z,{customClass:"two",style:{display:"flex",flexDirection:"column",overflow:"hidden"},children:[e.jsx(p,{borderBottom:"1px solid #fff",bg:"linear-gradient(to top, #1B1722, #060606)",flexShrink:0,children:e.jsxs(C,{m:2,children:[e.jsx(M,{as:Y,mr:2}),"Reliable"]})}),e.jsx(p,{position:"relative",flex:1,children:e.jsx("img",{src:te,alt:"Card Swap Demo 2",style:{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",display:"block"}})})]}),e.jsxs(z,{customClass:"three",style:{display:"flex",flexDirection:"column",overflow:"hidden"},children:[e.jsx(p,{borderBottom:"1px solid #fff",bg:"linear-gradient(to top, #1B1722, #060606)",flexShrink:0,children:e.jsxs(C,{m:2,children:[e.jsx(M,{as:X,mr:2}),"Customizable"]})}),e.jsx(p,{position:"relative",flex:1,children:e.jsx("img",{src:re,alt:"Card Swap Demo 3",style:{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",display:"block"}})})]})]},a)})]}),e.jsxs(Q,{children:[e.jsx(K,{title:"Pause On Hover",isChecked:v,onChange:t=>{o("pauseOnHover",t),n()}}),e.jsx(S,{title:"Card Distance",min:30,max:100,step:5,value:x,onChange:t=>{o("cardDistance",t),n()}}),e.jsx(S,{title:"Vertical Distance",min:40,max:120,step:5,value:b,onChange:t=>{o("verticalDistance",t),n()}}),e.jsx(S,{title:"Delay (ms)",min:3e3,max:8e3,step:500,value:w,onChange:t=>{o("delay",t),n()}}),e.jsx(S,{title:"Skew Amount",min:0,max:12,step:1,value:y,onChange:t=>{o("skewAmount",t),n()}}),e.jsx(Z,{title:"Easing",options:[{value:"elastic",label:"Elastic"},{value:"linear",label:"Linear"}],value:l,onChange:t=>{o("easing",t),n()}})]}),e.jsx(U,{data:d}),e.jsx(G,{dependencyList:["gsap"]})]}),e.jsx(q,{children:e.jsx(J,{codeObject:ce,componentName:"CardSwap"})})]})})};export{De as default};
