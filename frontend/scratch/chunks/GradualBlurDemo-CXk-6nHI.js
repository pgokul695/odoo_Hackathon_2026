import{R as O,r as c,j as r,B as z,F as H,T as V,M as D}from"./index-TQprzHkU.js";import{L as W}from"./lenis-DSWRnSg1.js";import{u as A,C as j,T as L,P as _,a as q,b as Y,c as X}from"./useComponentProps-CjYSqekE.js";import{C as J}from"./Customize-BdikCFm5.js";import{P as $}from"./PreviewSelect-DZgUm0jD.js";import{P as K}from"./PreviewSwitch-CcPSwIGg.js";import{D as Q}from"./Dependencies-IIL9riMN.js";import{P as x}from"./PreviewSlider-CCbi2och.js";import"./index-DQmtNYX5.js";import"./CodeHighlighter-Dx4QNbvH.js";import"./rotate-ccw-_xDu3G0k.js";/* empty css                       */const Z=`import React, { useEffect, useRef, useState, useMemo } from 'react';

import './GradualBlur.css';

const DEFAULT_CONFIG = {
  position: 'bottom',
  strength: 2,
  height: '6rem',
  divCount: 5,
  exponential: false,
  zIndex: 1000,
  animated: false,
  duration: '0.3s',
  easing: 'ease-out',
  opacity: 1,
  curve: 'linear',
  responsive: false,
  target: 'parent',
  className: '',
  style: {}
};

const PRESETS = {
  top: { position: 'top', height: '6rem' },
  bottom: { position: 'bottom', height: '6rem' },
  left: { position: 'left', height: '6rem' },
  right: { position: 'right', height: '6rem' },
  subtle: { height: '4rem', strength: 1, opacity: 0.8, divCount: 3 },
  intense: { height: '10rem', strength: 4, divCount: 8, exponential: true },
  smooth: { height: '8rem', curve: 'bezier', divCount: 10 },
  sharp: { height: '5rem', curve: 'linear', divCount: 4 },
  header: { position: 'top', height: '8rem', curve: 'ease-out' },
  footer: { position: 'bottom', height: '8rem', curve: 'ease-out' },
  sidebar: { position: 'left', height: '6rem', strength: 2.5 },
  'page-header': { position: 'top', height: '10rem', target: 'page', strength: 3 },
  'page-footer': { position: 'bottom', height: '10rem', target: 'page', strength: 3 }
};

const CURVE_FUNCTIONS = {
  linear: p => p,
  bezier: p => p * p * (3 - 2 * p),
  'ease-in': p => p * p,
  'ease-out': p => 1 - Math.pow(1 - p, 2),
  'ease-in-out': p => (p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2)
};

const mergeConfigs = (...configs) => configs.reduce((acc, c) => ({ ...acc, ...c }), {});
const getGradientDirection = position =>
  ({
    top: 'to top',
    bottom: 'to bottom',
    left: 'to left',
    right: 'to right'
  })[position] || 'to bottom';

const debounce = (fn, wait) => {
  let t;
  return (...a) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...a), wait);
  };
};

const useResponsiveDimension = (responsive, config, key) => {
  const [value, setValue] = useState(config[key]);
  useEffect(() => {
    if (!responsive) return;
    const calc = () => {
      const w = window.innerWidth;
      let v = config[key];
      if (w <= 480 && config[\`mobile\${key[0].toUpperCase() + key.slice(1)}\`])
        v = config[\`mobile\${key[0].toUpperCase() + key.slice(1)}\`];
      else if (w <= 768 && config[\`tablet\${key[0].toUpperCase() + key.slice(1)}\`])
        v = config[\`tablet\${key[0].toUpperCase() + key.slice(1)}\`];
      else if (w <= 1024 && config[\`desktop\${key[0].toUpperCase() + key.slice(1)}\`])
        v = config[\`desktop\${key[0].toUpperCase() + key.slice(1)}\`];
      setValue(v);
    };
    const debounced = debounce(calc, 100);
    calc();
    window.addEventListener('resize', debounced);
    return () => window.removeEventListener('resize', debounced);
  }, [responsive, config, key]);
  return responsive ? value : config[key];
};

const useIntersectionObserver = (ref, shouldObserve = false) => {
  const [isVisible, setIsVisible] = useState(!shouldObserve);

  useEffect(() => {
    if (!shouldObserve || !ref.current) return;

    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { threshold: 0.1 });

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, shouldObserve]);

  return isVisible;
};

function GradualBlur(props) {
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const config = useMemo(() => {
    const presetConfig = props.preset && PRESETS[props.preset] ? PRESETS[props.preset] : {};
    return mergeConfigs(DEFAULT_CONFIG, presetConfig, props);
  }, [props]);

  const responsiveHeight = useResponsiveDimension(config.responsive, config, 'height');
  const responsiveWidth = useResponsiveDimension(config.responsive, config, 'width');

  const isVisible = useIntersectionObserver(containerRef, config.animated === 'scroll');

  const blurDivs = useMemo(() => {
    const divs = [];
    const increment = 100 / config.divCount;
    const currentStrength =
      isHovered && config.hoverIntensity ? config.strength * config.hoverIntensity : config.strength;

    const curveFunc = CURVE_FUNCTIONS[config.curve] || CURVE_FUNCTIONS.linear;

    for (let i = 1; i <= config.divCount; i++) {
      let progress = i / config.divCount;
      progress = curveFunc(progress);

      let blurValue;
      if (config.exponential) {
        blurValue = Math.pow(2, progress * 4) * 0.0625 * currentStrength;
      } else {
        blurValue = 0.0625 * (progress * config.divCount + 1) * currentStrength;
      }

      const p1 = Math.round((increment * i - increment) * 10) / 10;
      const p2 = Math.round(increment * i * 10) / 10;
      const p3 = Math.round((increment * i + increment) * 10) / 10;
      const p4 = Math.round((increment * i + increment * 2) * 10) / 10;

      let gradient = \`transparent \${p1}%, black \${p2}%\`;
      if (p3 <= 100) gradient += \`, black \${p3}%\`;
      if (p4 <= 100) gradient += \`, transparent \${p4}%\`;

      const direction = getGradientDirection(config.position);

      const divStyle = {
        position: 'absolute',
        inset: '0',
        maskImage: \`linear-gradient(\${direction}, \${gradient})\`,
        WebkitMaskImage: \`linear-gradient(\${direction}, \${gradient})\`,
        backdropFilter: \`blur(\${blurValue.toFixed(3)}rem)\`,
        WebkitBackdropFilter: \`blur(\${blurValue.toFixed(3)}rem)\`,
        opacity: config.opacity,
        transition:
          config.animated && config.animated !== 'scroll'
            ? \`backdrop-filter \${config.duration} \${config.easing}\`
            : undefined
      };

      divs.push(<div key={i} style={divStyle} />);
    }

    return divs;
  }, [config, isHovered]);

  const containerStyle = useMemo(() => {
    const isVertical = ['top', 'bottom'].includes(config.position);
    const isHorizontal = ['left', 'right'].includes(config.position);
    const isPageTarget = config.target === 'page';

    const baseStyle = {
      position: isPageTarget ? 'fixed' : 'absolute',
      pointerEvents: config.hoverIntensity ? 'auto' : 'none',
      opacity: isVisible ? 1 : 0,
      transition: config.animated ? \`opacity \${config.duration} \${config.easing}\` : undefined,
      zIndex: isPageTarget ? config.zIndex + 100 : config.zIndex,
      ...config.style
    };

    if (isVertical) {
      baseStyle.height = responsiveHeight;
      baseStyle.width = responsiveWidth || '100%';
      baseStyle[config.position] = 0;
      baseStyle.left = 0;
      baseStyle.right = 0;
    } else if (isHorizontal) {
      baseStyle.width = responsiveWidth || responsiveHeight;
      baseStyle.height = '100%';
      baseStyle[config.position] = 0;
      baseStyle.top = 0;
      baseStyle.bottom = 0;
    }

    return baseStyle;
  }, [config, responsiveHeight, responsiveWidth, isVisible]);

  const { hoverIntensity, animated, onAnimationComplete, duration } = config;

  useEffect(() => {
    if (isVisible && animated === 'scroll' && onAnimationComplete) {
      const ms = parseFloat(duration) * 1000;
      const t = setTimeout(() => onAnimationComplete(), ms);
      return () => clearTimeout(t);
    }
  }, [isVisible, animated, onAnimationComplete, duration]);

  return (
    <div
      ref={containerRef}
      className={\`gradual-blur \${config.target === 'page' ? 'gradual-blur-page' : 'gradual-blur-parent'} \${config.className}\`}
      style={containerStyle}
      onMouseEnter={hoverIntensity ? () => setIsHovered(true) : undefined}
      onMouseLeave={hoverIntensity ? () => setIsHovered(false) : undefined}
    >
      <div
        className="gradual-blur-inner"
        style={{
          position: 'relative',
          width: '100%',
          height: '100%'
        }}
      >
        {blurDivs}
      </div>
    </div>
  );
}

const GradualBlurMemo = React.memo(GradualBlur);
GradualBlurMemo.displayName = 'GradualBlur';
GradualBlurMemo.PRESETS = PRESETS;
GradualBlurMemo.CURVE_FUNCTIONS = CURVE_FUNCTIONS;
export default GradualBlurMemo;

const injectStyles = () => {
  if (typeof document === 'undefined') return;

  const styleId = 'gradual-blur-styles';
  if (document.getElementById(styleId)) return;

  const styleElement = document.createElement('style');
  styleElement.id = styleId;
  styleElement.textContent = \`
  .gradual-blur { pointer-events: none; transition: opacity 0.3s ease-out; }
  .gradual-blur-parent { overflow: hidden; }
  .gradual-blur-inner { pointer-events: none; }\`;

  document.head.appendChild(styleElement);
};

if (typeof document !== 'undefined') {
  injectStyles();
}
`,ee=`import React, { useEffect, useRef, useState, useMemo } from 'react';

const DEFAULT_CONFIG = {
  position: 'bottom',
  strength: 2,
  height: '6rem',
  divCount: 5,
  exponential: false,
  zIndex: 1000,
  animated: false,
  duration: '0.3s',
  easing: 'ease-out',
  opacity: 1,
  curve: 'linear',
  responsive: false,
  target: 'parent',
  className: '',
  style: {}
};

const PRESETS = {
  top: { position: 'top', height: '6rem' },
  bottom: { position: 'bottom', height: '6rem' },
  left: { position: 'left', height: '6rem' },
  right: { position: 'right', height: '6rem' },
  subtle: { height: '4rem', strength: 1, opacity: 0.8, divCount: 3 },
  intense: { height: '10rem', strength: 4, divCount: 8, exponential: true },
  smooth: { height: '8rem', curve: 'bezier', divCount: 10 },
  sharp: { height: '5rem', curve: 'linear', divCount: 4 },
  header: { position: 'top', height: '8rem', curve: 'ease-out' },
  footer: { position: 'bottom', height: '8rem', curve: 'ease-out' },
  sidebar: { position: 'left', height: '6rem', strength: 2.5 },
  'page-header': { position: 'top', height: '10rem', target: 'page', strength: 3 },
  'page-footer': { position: 'bottom', height: '10rem', target: 'page', strength: 3 }
};

const CURVE_FUNCTIONS = {
  linear: p => p,
  bezier: p => p * p * (3 - 2 * p),
  'ease-in': p => p * p,
  'ease-out': p => 1 - Math.pow(1 - p, 2),
  'ease-in-out': p => (p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2)
};

const mergeConfigs = (...configs) => configs.reduce((acc, c) => ({ ...acc, ...c }), {});

const getGradientDirection = position => {
  const directions = {
    top: 'to top',
    bottom: 'to bottom',
    left: 'to left',
    right: 'to right'
  };
  return directions[position] || 'to bottom';
};

const debounce = (fn, wait) => {
  let t;
  return (...a) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...a), wait);
  };
};

const useResponsiveDimension = (responsive, config, key) => {
  const [val, setVal] = useState(config[key]);
  useEffect(() => {
    if (!responsive) return;
    const calc = () => {
      const w = window.innerWidth;
      let v = config[key];
      if (w <= 480 && config['mobile' + key[0].toUpperCase() + key.slice(1)])
        v = config['mobile' + key[0].toUpperCase() + key.slice(1)];
      else if (w <= 768 && config['tablet' + key[0].toUpperCase() + key.slice(1)])
        v = config['tablet' + key[0].toUpperCase() + key.slice(1)];
      else if (w <= 1024 && config['desktop' + key[0].toUpperCase() + key.slice(1)])
        v = config['desktop' + key[0].toUpperCase() + key.slice(1)];
      setVal(v);
    };
    const deb = debounce(calc, 100);
    calc();
    window.addEventListener('resize', deb);
    return () => window.removeEventListener('resize', deb);
  }, [responsive, config, key]);
  return responsive ? val : config[key];
};

const useIntersectionObserver = (ref, shouldObserve = false) => {
  const [isVisible, setIsVisible] = useState(!shouldObserve);

  useEffect(() => {
    if (!shouldObserve || !ref.current) return;

    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { threshold: 0.1 });

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, shouldObserve]);

  return isVisible;
};

const GradualBlur = props => {
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const config = useMemo(() => {
    const presetConfig = props.preset && PRESETS[props.preset] ? PRESETS[props.preset] : {};
    return mergeConfigs(DEFAULT_CONFIG, presetConfig, props);
  }, [props]);

  const responsiveHeight = useResponsiveDimension(config.responsive, config, 'height');
  const responsiveWidth = useResponsiveDimension(config.responsive, config, 'width');
  const isVisible = useIntersectionObserver(containerRef, config.animated === 'scroll');

  const blurDivs = useMemo(() => {
    const divs = [];
    const increment = 100 / config.divCount;
    const currentStrength =
      isHovered && config.hoverIntensity ? config.strength * config.hoverIntensity : config.strength;

    const curveFunc = CURVE_FUNCTIONS[config.curve] || CURVE_FUNCTIONS.linear;

    for (let i = 1; i <= config.divCount; i++) {
      let progress = i / config.divCount;
      progress = curveFunc(progress);

      let blurValue;
      if (config.exponential) {
        blurValue = Math.pow(2, progress * 4) * 0.0625 * currentStrength;
      } else {
        blurValue = 0.0625 * (progress * config.divCount + 1) * currentStrength;
      }
      const p1 = Math.round((increment * i - increment) * 10) / 10;
      const p2 = Math.round(increment * i * 10) / 10;
      const p3 = Math.round((increment * i + increment) * 10) / 10;
      const p4 = Math.round((increment * i + increment * 2) * 10) / 10;
      let gradient = \`transparent \${p1}%, black \${p2}%\`;
      if (p3 <= 100) gradient += \`, black \${p3}%\`;
      if (p4 <= 100) gradient += \`, transparent \${p4}%\`;

      const direction = getGradientDirection(config.position);

      const divStyle = {
        position: 'absolute',
        inset: '0',
        maskImage: \`linear-gradient(\${direction}, \${gradient})\`,
        WebkitMaskImage: \`linear-gradient(\${direction}, \${gradient})\`,
        backdropFilter: \`blur(\${blurValue.toFixed(3)}rem)\`,
        WebkitBackdropFilter: \`blur(\${blurValue.toFixed(3)}rem)\`,
        opacity: config.opacity,
        transition:
          config.animated && config.animated !== 'scroll'
            ? \`backdrop-filter \${config.duration} \${config.easing}\`
            : undefined
      };

      divs.push(<div key={i} style={divStyle} />);
    }

    return divs;
  }, [config, isHovered]);

  const containerStyle = useMemo(() => {
    const isVertical = ['top', 'bottom'].includes(config.position);
    const isHorizontal = ['left', 'right'].includes(config.position);
    const isPageTarget = config.target === 'page';

    const baseStyle = {
      position: isPageTarget ? 'fixed' : 'absolute',
      pointerEvents: config.hoverIntensity ? 'auto' : 'none',
      opacity: isVisible ? 1 : 0,
      transition: config.animated ? \`opacity \${config.duration} \${config.easing}\` : undefined,
      zIndex: isPageTarget ? config.zIndex + 100 : config.zIndex,
      ...config.style
    };

    if (isVertical) {
      baseStyle.height = responsiveHeight;
      baseStyle.width = responsiveWidth || '100%';
      baseStyle[config.position] = 0;
      baseStyle.left = 0;
      baseStyle.right = 0;
    } else if (isHorizontal) {
      baseStyle.width = responsiveWidth || responsiveHeight;
      baseStyle.height = '100%';
      baseStyle[config.position] = 0;
      baseStyle.top = 0;
      baseStyle.bottom = 0;
    }

    return baseStyle;
  }, [config, responsiveHeight, responsiveWidth, isVisible]);

  const { hoverIntensity, animated, onAnimationComplete, duration } = config;
  useEffect(() => {
    if (isVisible && animated === 'scroll' && onAnimationComplete) {
      const t = setTimeout(() => onAnimationComplete(), parseFloat(duration) * 1000);
      return () => clearTimeout(t);
    }
  }, [isVisible, animated, onAnimationComplete, duration]);

  return (
    <div
      ref={containerRef}
      className={\`gradual-blur \${config.target === 'page' ? 'gradual-blur-page' : 'gradual-blur-parent'} \${config.className}\`}
      style={containerStyle}
      onMouseEnter={hoverIntensity ? () => setIsHovered(true) : undefined}
      onMouseLeave={hoverIntensity ? () => setIsHovered(false) : undefined}
    >
      <div className="gradual-blur-inner relative w-full h-full">{blurDivs}</div>
    </div>
  );
};
const GradualBlurMemo = React.memo(GradualBlur);
GradualBlurMemo.displayName = 'GradualBlur';
GradualBlurMemo.PRESETS = PRESETS;
GradualBlurMemo.CURVE_FUNCTIONS = CURVE_FUNCTIONS;
export default GradualBlurMemo;
`,ne=`.gradual-blur-inner {
  position: relative;
  width: 100%;
  height: 100%;
}

.gradual-blur-inner > div {
  -webkit-backdrop-filter: inherit;
  backdrop-filter: inherit;
}

.gradual-blur {
  isolation: isolate;
}

@supports not (backdrop-filter: blur(1px)) {
  .gradual-blur-inner > div {
    background: rgba(0, 0, 0, 0.3);
    opacity: 0.5;
  }
}

.gradual-blur-fixed {
  position: fixed !important;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 1000;
}
`,te=`import React, { CSSProperties, useEffect, useRef, useState, useMemo, PropsWithChildren } from 'react';

import './GradualBlur.css';

type GradualBlurProps = {
  position?: 'top' | 'bottom' | 'left' | 'right';
  strength?: number;
  height?: string;
  width?: string;
  divCount?: number;
  exponential?: boolean;
  zIndex?: number;
  animated?: boolean | 'scroll';
  duration?: string;
  easing?: string;
  opacity?: number;
  curve?: 'linear' | 'bezier' | 'ease-in' | 'ease-out' | 'ease-in-out';
  responsive?: boolean;
  mobileHeight?: string;
  tabletHeight?: string;
  desktopHeight?: string;
  mobileWidth?: string;
  tabletWidth?: string;
  desktopWidth?: string;
  preset?:
    | 'top'
    | 'bottom'
    | 'left'
    | 'right'
    | 'subtle'
    | 'intense'
    | 'smooth'
    | 'sharp'
    | 'header'
    | 'footer'
    | 'sidebar'
    | 'page-header'
    | 'page-footer';
  gpuOptimized?: boolean;
  hoverIntensity?: number;
  target?: 'parent' | 'page';
  onAnimationComplete?: () => void;
  className?: string;
  style?: CSSProperties;
};

const DEFAULT_CONFIG: Partial<GradualBlurProps> = {
  position: 'bottom',
  strength: 2,
  height: '6rem',
  divCount: 5,
  exponential: false,
  zIndex: 1000,
  animated: false,
  duration: '0.3s',
  easing: 'ease-out',
  opacity: 1,
  curve: 'linear',
  responsive: false,
  target: 'parent',
  className: '',
  style: {}
};

const PRESETS: Record<string, Partial<GradualBlurProps>> = {
  top: { position: 'top', height: '6rem' },
  bottom: { position: 'bottom', height: '6rem' },
  left: { position: 'left', height: '6rem' },
  right: { position: 'right', height: '6rem' },
  subtle: { height: '4rem', strength: 1, opacity: 0.8, divCount: 3 },
  intense: { height: '10rem', strength: 4, divCount: 8, exponential: true },
  smooth: { height: '8rem', curve: 'bezier', divCount: 10 },
  sharp: { height: '5rem', curve: 'linear', divCount: 4 },
  header: { position: 'top', height: '8rem', curve: 'ease-out' },
  footer: { position: 'bottom', height: '8rem', curve: 'ease-out' },
  sidebar: { position: 'left', height: '6rem', strength: 2.5 },
  'page-header': {
    position: 'top',
    height: '10rem',
    target: 'page',
    strength: 3
  },
  'page-footer': {
    position: 'bottom',
    height: '10rem',
    target: 'page',
    strength: 3
  }
};

const CURVE_FUNCTIONS: Record<string, (p: number) => number> = {
  linear: p => p,
  bezier: p => p * p * (3 - 2 * p),
  'ease-in': p => p * p,
  'ease-out': p => 1 - Math.pow(1 - p, 2),
  'ease-in-out': p => (p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2)
};

const mergeConfigs = (...configs: Partial<GradualBlurProps>[]): Partial<GradualBlurProps> => {
  return configs.reduce((acc, config) => ({ ...acc, ...config }), {});
};

const getGradientDirection = (position: string): string => {
  const directions: Record<string, string> = {
    top: 'to top',
    bottom: 'to bottom',
    left: 'to left',
    right: 'to right'
  };
  return directions[position] || 'to bottom';
};

const debounce = <T extends (...a: any[]) => void>(fn: T, wait: number) => {
  let t: ReturnType<typeof setTimeout>;
  return (...a: Parameters<T>) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...a), wait);
  };
};

const useResponsiveDimension = (
  responsive: boolean | undefined,
  config: Partial<GradualBlurProps>,
  key: keyof GradualBlurProps
) => {
  const [val, setVal] = useState<any>(config[key]);
  useEffect(() => {
    if (!responsive) return;
    const calc = () => {
      const w = window.innerWidth;
      let v: any = config[key];
      const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
      const k = cap(key as string);
      if (w <= 480 && (config as any)['mobile' + k]) v = (config as any)['mobile' + k];
      else if (w <= 768 && (config as any)['tablet' + k]) v = (config as any)['tablet' + k];
      else if (w <= 1024 && (config as any)['desktop' + k]) v = (config as any)['desktop' + k];
      setVal(v);
    };
    const deb = debounce(calc, 100);
    calc();
    window.addEventListener('resize', deb);
    return () => window.removeEventListener('resize', deb);
  }, [responsive, config, key]);
  return responsive ? val : (config as any)[key];
};

const useIntersectionObserver = (ref: React.RefObject<HTMLDivElement | null>, shouldObserve: boolean = false) => {
  const [isVisible, setIsVisible] = useState(!shouldObserve);

  useEffect(() => {
    if (!shouldObserve || !ref.current) return;

    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { threshold: 0.1 });

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, shouldObserve]);

  return isVisible;
};

const GradualBlur: React.FC<PropsWithChildren<GradualBlurProps>> = props => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const config = useMemo(() => {
    const presetConfig = props.preset && PRESETS[props.preset] ? PRESETS[props.preset] : {};
    return mergeConfigs(DEFAULT_CONFIG, presetConfig, props) as Required<GradualBlurProps>;
  }, [props]);

  const responsiveHeight = useResponsiveDimension(config.responsive, config, 'height');
  const responsiveWidth = useResponsiveDimension(config.responsive, config, 'width');

  const isVisible = useIntersectionObserver(containerRef, config.animated === 'scroll');

  const blurDivs = useMemo(() => {
    const divs: React.ReactNode[] = [];
    const increment = 100 / config.divCount;
    const currentStrength =
      isHovered && config.hoverIntensity ? config.strength * config.hoverIntensity : config.strength;

    const curveFunc = CURVE_FUNCTIONS[config.curve] || CURVE_FUNCTIONS.linear;

    for (let i = 1; i <= config.divCount; i++) {
      let progress = i / config.divCount;
      progress = curveFunc(progress);

      let blurValue: number;
      if (config.exponential) {
        blurValue = Number(Math.pow(2, progress * 4)) * 0.0625 * currentStrength;
      } else {
        blurValue = 0.0625 * (progress * config.divCount + 1) * currentStrength;
      }

      const p1 = Math.round((increment * i - increment) * 10) / 10;
      const p2 = Math.round(increment * i * 10) / 10;
      const p3 = Math.round((increment * i + increment) * 10) / 10;
      const p4 = Math.round((increment * i + increment * 2) * 10) / 10;

      let gradient = \`transparent \${p1}%, black \${p2}%\`;
      if (p3 <= 100) gradient += \`, black \${p3}%\`;
      if (p4 <= 100) gradient += \`, transparent \${p4}%\`;

      const direction = getGradientDirection(config.position);

      const divStyle: CSSProperties = {
        position: 'absolute',
        inset: '0',
        maskImage: \`linear-gradient(\${direction}, \${gradient})\`,
        WebkitMaskImage: \`linear-gradient(\${direction}, \${gradient})\`,
        backdropFilter: \`blur(\${blurValue.toFixed(3)}rem)\`,
        WebkitBackdropFilter: \`blur(\${blurValue.toFixed(3)}rem)\`,
        opacity: config.opacity,
        transition:
          config.animated && config.animated !== 'scroll'
            ? \`backdrop-filter \${config.duration} \${config.easing}\`
            : undefined
      };

      divs.push(<div key={i} style={divStyle} />);
    }

    return divs;
  }, [config, isHovered]);

  const containerStyle: CSSProperties = useMemo(() => {
    const isVertical = ['top', 'bottom'].includes(config.position);
    const isHorizontal = ['left', 'right'].includes(config.position);
    const isPageTarget = config.target === 'page';

    const baseStyle: CSSProperties = {
      position: isPageTarget ? 'fixed' : 'absolute',
      pointerEvents: config.hoverIntensity ? 'auto' : 'none',
      opacity: isVisible ? 1 : 0,
      transition: config.animated ? \`opacity \${config.duration} \${config.easing}\` : undefined,
      zIndex: isPageTarget ? config.zIndex + 100 : config.zIndex,
      ...config.style
    };

    if (isVertical) {
      baseStyle.height = responsiveHeight;
      baseStyle.width = responsiveWidth || '100%';
      baseStyle[config.position] = 0;
      baseStyle.left = 0;
      baseStyle.right = 0;
    } else if (isHorizontal) {
      baseStyle.width = responsiveWidth || responsiveHeight;
      baseStyle.height = '100%';
      baseStyle[config.position] = 0;
      baseStyle.top = 0;
      baseStyle.bottom = 0;
    }

    return baseStyle;
  }, [config, responsiveHeight, responsiveWidth, isVisible]);

  const { hoverIntensity, animated, onAnimationComplete, duration } = config as any;
  useEffect(() => {
    if (isVisible && animated === 'scroll' && onAnimationComplete) {
      const t = setTimeout(() => onAnimationComplete(), parseFloat(duration) * 1000);
      return () => clearTimeout(t);
    }
  }, [isVisible, animated, onAnimationComplete, duration]);

  return (
    <div
      ref={containerRef}
      className={\`gradual-blur \${config.target === 'page' ? 'gradual-blur-page' : 'gradual-blur-parent'} \${config.className}\`}
      style={containerStyle}
      onMouseEnter={hoverIntensity ? () => setIsHovered(true) : undefined}
      onMouseLeave={hoverIntensity ? () => setIsHovered(false) : undefined}
    >
      <div
        className="gradual-blur-inner"
        style={{
          position: 'relative',
          width: '100%',
          height: '100%'
        }}
      >
        {blurDivs}
      </div>
    </div>
  );
};

const GradualBlurMemo = React.memo(GradualBlur);
GradualBlurMemo.displayName = 'GradualBlur';
(GradualBlurMemo as any).PRESETS = PRESETS;
(GradualBlurMemo as any).CURVE_FUNCTIONS = CURVE_FUNCTIONS;
export default GradualBlurMemo;

const injectStyles = () => {
  if (typeof document === 'undefined') return;
  const styleId = 'gradual-blur-styles';
  if (document.getElementById(styleId)) return;
  const styleElement = document.createElement('style');
  styleElement.id = styleId;
  styleElement.textContent = \`.gradual-blur{pointer-events:none;transition:opacity 0.3s ease-out}.gradual-blur-inner{pointer-events:none}\`;
  document.head.appendChild(styleElement);
};

if (typeof document !== 'undefined') {
  injectStyles();
}
`,ie=`import React, { CSSProperties, useEffect, useRef, useState, useMemo, PropsWithChildren } from 'react';

type GradualBlurProps = PropsWithChildren<{
  position?: 'top' | 'bottom' | 'left' | 'right';
  strength?: number;
  height?: string;
  width?: string;
  divCount?: number;
  exponential?: boolean;
  zIndex?: number;
  animated?: boolean | 'scroll';
  duration?: string;
  easing?: string;
  opacity?: number;
  curve?: 'linear' | 'bezier' | 'ease-in' | 'ease-out' | 'ease-in-out';
  responsive?: boolean;
  mobileHeight?: string;
  tabletHeight?: string;
  desktopHeight?: string;
  mobileWidth?: string;
  tabletWidth?: string;
  desktopWidth?: string;

  preset?:
    | 'top'
    | 'bottom'
    | 'left'
    | 'right'
    | 'subtle'
    | 'intense'
    | 'smooth'
    | 'sharp'
    | 'header'
    | 'footer'
    | 'sidebar'
    | 'page-header'
    | 'page-footer';
  gpuOptimized?: boolean;
  hoverIntensity?: number;
  target?: 'parent' | 'page';

  onAnimationComplete?: () => void;
  className?: string;
  style?: CSSProperties;
}>;

const DEFAULT_CONFIG: Partial<GradualBlurProps> = {
  position: 'bottom',
  strength: 2,
  height: '6rem',
  divCount: 5,
  exponential: false,
  zIndex: 1000,
  animated: false,
  duration: '0.3s',
  easing: 'ease-out',
  opacity: 1,
  curve: 'linear',
  responsive: false,
  target: 'parent',
  className: '',
  style: {}
};

const PRESETS: Record<string, Partial<GradualBlurProps>> = {
  top: { position: 'top', height: '6rem' },
  bottom: { position: 'bottom', height: '6rem' },
  left: { position: 'left', height: '6rem' },
  right: { position: 'right', height: '6rem' },

  subtle: { height: '4rem', strength: 1, opacity: 0.8, divCount: 3 },
  intense: { height: '10rem', strength: 4, divCount: 8, exponential: true },

  smooth: { height: '8rem', curve: 'bezier', divCount: 10 },
  sharp: { height: '5rem', curve: 'linear', divCount: 4 },

  header: { position: 'top', height: '8rem', curve: 'ease-out' },
  footer: { position: 'bottom', height: '8rem', curve: 'ease-out' },
  sidebar: { position: 'left', height: '6rem', strength: 2.5 },

  'page-header': {
    position: 'top',
    height: '10rem',
    target: 'page',
    strength: 3
  },
  'page-footer': {
    position: 'bottom',
    height: '10rem',
    target: 'page',
    strength: 3
  }
};

const CURVE_FUNCTIONS: Record<string, (p: number) => number> = {
  linear: p => p,
  bezier: p => p * p * (3 - 2 * p),
  'ease-in': p => p * p,
  'ease-out': p => 1 - Math.pow(1 - p, 2),
  'ease-in-out': p => (p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2)
};

const mergeConfigs = (...configs: Partial<GradualBlurProps>[]): Partial<GradualBlurProps> => {
  return configs.reduce((acc, config) => ({ ...acc, ...config }), {});
};

const getGradientDirection = (position: string): string => {
  const directions: Record<string, string> = {
    top: 'to top',
    bottom: 'to bottom',
    left: 'to left',
    right: 'to right'
  };
  return directions[position] || 'to bottom';
};

const debounce = <T extends (...a: any[]) => void>(fn: T, wait: number) => {
  let t: ReturnType<typeof setTimeout>;
  return (...a: Parameters<T>) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...a), wait);
  };
};
const useResponsiveDimension = (
  responsive: boolean | undefined,
  config: Partial<GradualBlurProps>,
  key: keyof GradualBlurProps
) => {
  const [val, setVal] = useState<any>(config[key]);
  useEffect(() => {
    if (!responsive) return;
    const calc = () => {
      const w = window.innerWidth;
      let v: any = config[key];
      const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
      const k = cap(key as string);
      if (w <= 480 && (config as any)['mobile' + k]) v = (config as any)['mobile' + k];
      else if (w <= 768 && (config as any)['tablet' + k]) v = (config as any)['tablet' + k];
      else if (w <= 1024 && (config as any)['desktop' + k]) v = (config as any)['desktop' + k];
      setVal(v);
    };
    const deb = debounce(calc, 100);
    calc();
    window.addEventListener('resize', deb);
    return () => window.removeEventListener('resize', deb);
  }, [responsive, config, key]);
  return responsive ? val : (config as any)[key];
};

const useIntersectionObserver = (ref: React.RefObject<HTMLDivElement>, shouldObserve: boolean = false) => {
  const [isVisible, setIsVisible] = useState(!shouldObserve);

  useEffect(() => {
    if (!shouldObserve || !ref.current) return;

    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { threshold: 0.1 });

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, shouldObserve]);

  return isVisible;
};

const GradualBlur: React.FC<GradualBlurProps> = props => {
  const containerRef = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;
  const [isHovered, setIsHovered] = useState(false);

  const config = useMemo(() => {
    const presetConfig = props.preset && PRESETS[props.preset] ? PRESETS[props.preset] : {};
    return mergeConfigs(DEFAULT_CONFIG, presetConfig, props) as Required<GradualBlurProps>;
  }, [props]);

  const responsiveHeight = useResponsiveDimension(config.responsive, config, 'height');
  const responsiveWidth = useResponsiveDimension(config.responsive, config, 'width');

  const isVisible = useIntersectionObserver(containerRef, config.animated === 'scroll');

  const blurDivs = useMemo(() => {
    const divs: React.ReactNode[] = [];
    const increment = 100 / config.divCount;
    const currentStrength =
      isHovered && config.hoverIntensity ? config.strength * config.hoverIntensity : config.strength;

    const curveFunc = CURVE_FUNCTIONS[config.curve] || CURVE_FUNCTIONS.linear;

    for (let i = 1; i <= config.divCount; i++) {
      let progress = i / config.divCount;
      progress = curveFunc(progress);

      let blurValue: number;
      if (config.exponential) {
        blurValue = Number(Math.pow(2, progress * 4)) * 0.0625 * currentStrength;
      } else {
        blurValue = 0.0625 * (progress * config.divCount + 1) * currentStrength;
      }

      const p1 = Math.round((increment * i - increment) * 10) / 10;
      const p2 = Math.round(increment * i * 10) / 10;
      const p3 = Math.round((increment * i + increment) * 10) / 10;
      const p4 = Math.round((increment * i + increment * 2) * 10) / 10;

      let gradient = \`transparent \${p1}%, black \${p2}%\`;
      if (p3 <= 100) gradient += \`, black \${p3}%\`;
      if (p4 <= 100) gradient += \`, transparent \${p4}%\`;

      const direction = getGradientDirection(config.position);

      const divStyle: CSSProperties = {
        maskImage: \`linear-gradient(\${direction}, \${gradient})\`,
        WebkitMaskImage: \`linear-gradient(\${direction}, \${gradient})\`,
        backdropFilter: \`blur(\${blurValue.toFixed(3)}rem)\`,
        opacity: config.opacity,
        transition:
          config.animated && config.animated !== 'scroll'
            ? \`backdrop-filter \${config.duration} \${config.easing}\`
            : undefined
      };

      divs.push(<div key={i} className="absolute inset-0" style={divStyle} />);
    }

    return divs;
  }, [config, isHovered]);

  const containerStyle: CSSProperties = useMemo(() => {
    const isVertical = ['top', 'bottom'].includes(config.position);
    const isHorizontal = ['left', 'right'].includes(config.position);
    const isPageTarget = config.target === 'page';

    const baseStyle: CSSProperties = {
      position: isPageTarget ? 'fixed' : 'absolute',
      pointerEvents: config.hoverIntensity ? 'auto' : 'none',
      opacity: isVisible ? 1 : 0,
      transition: config.animated ? \`opacity \${config.duration} \${config.easing}\` : undefined,
      zIndex: isPageTarget ? config.zIndex + 100 : config.zIndex,
      ...config.style
    };

    if (isVertical) {
      baseStyle.height = responsiveHeight;
      baseStyle.width = responsiveWidth || '100%';
      baseStyle[config.position] = 0;
      baseStyle.left = 0;
      baseStyle.right = 0;
    } else if (isHorizontal) {
      baseStyle.width = responsiveWidth || responsiveHeight;
      baseStyle.height = '100%';
      baseStyle[config.position] = 0;
      baseStyle.top = 0;
      baseStyle.bottom = 0;
    }

    return baseStyle;
  }, [config, responsiveHeight, responsiveWidth, isVisible]);

  const { hoverIntensity, animated, onAnimationComplete, duration } = config as any;
  useEffect(() => {
    if (isVisible && animated === 'scroll' && onAnimationComplete) {
      const t = setTimeout(() => onAnimationComplete(), parseFloat(duration) * 1000);
      return () => clearTimeout(t);
    }
  }, [isVisible, animated, onAnimationComplete, duration]);

  return (
    <div
      ref={containerRef}
      className={\`gradual-blur relative isolate \${config.target === 'page' ? 'gradual-blur-page' : 'gradual-blur-parent'} \${config.className}\`}
      style={containerStyle}
      onMouseEnter={hoverIntensity ? () => setIsHovered(true) : undefined}
      onMouseLeave={hoverIntensity ? () => setIsHovered(false) : undefined}
    >
      <div className="relative w-full h-full">{blurDivs}</div>
      {props.children && <div className="relative">{props.children}</div>}
    </div>
  );
};

const GradualBlurMemo = React.memo(GradualBlur);
GradualBlurMemo.displayName = 'GradualBlur';
(GradualBlurMemo as any).PRESETS = PRESETS;
(GradualBlurMemo as any).CURVE_FUNCTIONS = CURVE_FUNCTIONS;
export default GradualBlurMemo;

const injectStyles = () => {
  if (typeof document === 'undefined') return;
  const id = 'gradual-blur-styles';
  if (document.getElementById(id)) return;
  const el = document.createElement('style');
  el.id = id;
  el.textContent = \`.gradual-blur{pointer-events:none;transition:opacity .3s ease-out}.gradual-blur-inner{pointer-events:none}\`;
  document.head.appendChild(el);
};
if (typeof document !== 'undefined') {
  injectStyles();
}
`,oe={dependencies:"mathjs",usage:`// Component added by Ansh - github.com/ansh-dhanani

import GradualBlur from './GradualBlur';

<section style={{position: 'relative',height: 500,overflow: 'hidden'}}>
  <div style={{ height: '100%',overflowY: 'auto',padding: '6rem 2rem' }}>
    <!-- Content Here - such as an image or text -->
  </div>

  <GradualBlur
    target="parent"
    position="bottom"
    height="6rem"
    strength={2}
    divCount={5}
    curve="bezier"
    exponential={true}
    opacity={1}
  />
</section>`,code:Z,css:ne,tailwind:ee,tsCode:te,tsTailwind:ie},re={position:"bottom",strength:2,height:"6rem",divCount:5,exponential:!1,zIndex:1e3,animated:!1,duration:"0.3s",easing:"ease-out",opacity:1,curve:"linear",responsive:!1,target:"parent",className:"",style:{}},k={top:{position:"top",height:"6rem"},bottom:{position:"bottom",height:"6rem"},left:{position:"left",height:"6rem"},right:{position:"right",height:"6rem"},subtle:{height:"4rem",strength:1,opacity:.8,divCount:3},intense:{height:"10rem",strength:4,divCount:8,exponential:!0},smooth:{height:"8rem",curve:"bezier",divCount:10},sharp:{height:"5rem",curve:"linear",divCount:4},header:{position:"top",height:"8rem",curve:"ease-out"},footer:{position:"bottom",height:"8rem",curve:"ease-out"},sidebar:{position:"left",height:"6rem",strength:2.5},"page-header":{position:"top",height:"10rem",target:"page",strength:3},"page-footer":{position:"bottom",height:"10rem",target:"page",strength:3}},R={linear:n=>n,bezier:n=>n*n*(3-2*n),"ease-in":n=>n*n,"ease-out":n=>1-Math.pow(1-n,2),"ease-in-out":n=>n<.5?2*n*n:1-Math.pow(-2*n+2,2)/2},se=(...n)=>n.reduce((t,i)=>({...t,...i}),{}),ae=n=>({top:"to top",bottom:"to bottom",left:"to left",right:"to right"})[n]||"to bottom",le=(n,t)=>{let i;return(...d)=>{clearTimeout(i),i=setTimeout(()=>n(...d),t)}},N=(n,t,i)=>{const[d,e]=c.useState(t[i]);return c.useEffect(()=>{if(!n)return;const u=()=>{const p=window.innerWidth;let f=t[i];p<=480&&t[`mobile${i[0].toUpperCase()+i.slice(1)}`]?f=t[`mobile${i[0].toUpperCase()+i.slice(1)}`]:p<=768&&t[`tablet${i[0].toUpperCase()+i.slice(1)}`]?f=t[`tablet${i[0].toUpperCase()+i.slice(1)}`]:p<=1024&&t[`desktop${i[0].toUpperCase()+i.slice(1)}`]&&(f=t[`desktop${i[0].toUpperCase()+i.slice(1)}`]),e(f)},g=le(u,100);return u(),window.addEventListener("resize",g),()=>window.removeEventListener("resize",g)},[n,t,i]),n?d:t[i]},ce=(n,t=!1)=>{const[i,d]=c.useState(!t);return c.useEffect(()=>{if(!t||!n.current)return;const e=new IntersectionObserver(([u])=>d(u.isIntersecting),{threshold:.1});return e.observe(n.current),()=>e.disconnect()},[n,t]),i};function ue(n){const t=c.useRef(null),[i,d]=c.useState(!1),e=c.useMemo(()=>{const o=n.preset&&k[n.preset]?k[n.preset]:{};return se(re,o,n)},[n]),u=N(e.responsive,e,"height"),g=N(e.responsive,e,"width"),p=ce(t,e.animated==="scroll"),f=c.useMemo(()=>{const o=[],a=100/e.divCount,h=i&&e.hoverIntensity?e.strength*e.hoverIntensity:e.strength,s=R[e.curve]||R.linear;for(let l=1;l<=e.divCount;l++){let m=l/e.divCount;m=s(m);let b;e.exponential?b=Math.pow(2,m*4)*.0625*h:b=.0625*(m*e.divCount+1)*h;const G=Math.round((a*l-a)*10)/10,B=Math.round(a*l*10)/10,T=Math.round((a*l+a)*10)/10,M=Math.round((a*l+a*2)*10)/10;let E=`transparent ${G}%, black ${B}%`;T<=100&&(E+=`, black ${T}%`),M<=100&&(E+=`, transparent ${M}%`);const P=ae(e.position),U={position:"absolute",inset:"0",maskImage:`linear-gradient(${P}, ${E})`,WebkitMaskImage:`linear-gradient(${P}, ${E})`,backdropFilter:`blur(${b.toFixed(3)}rem)`,WebkitBackdropFilter:`blur(${b.toFixed(3)}rem)`,opacity:e.opacity,transition:e.animated&&e.animated!=="scroll"?`backdrop-filter ${e.duration} ${e.easing}`:void 0};o.push(r.jsx("div",{style:U},l))}return o},[e,i]),I=c.useMemo(()=>{const o=["top","bottom"].includes(e.position),a=["left","right"].includes(e.position),h=e.target==="page",s={position:h?"fixed":"absolute",pointerEvents:e.hoverIntensity?"auto":"none",opacity:p?1:0,transition:e.animated?`opacity ${e.duration} ${e.easing}`:void 0,zIndex:h?e.zIndex+100:e.zIndex,...e.style};return o?(s.height=u,s.width=g||"100%",s[e.position]=0,s.left=0,s.right=0):a&&(s.width=g||u,s.height="100%",s[e.position]=0,s.top=0,s.bottom=0),s},[e,u,g,p]),{hoverIntensity:v,animated:y,onAnimationComplete:C,duration:S}=e;return c.useEffect(()=>{if(p&&y==="scroll"&&C){const o=parseFloat(S)*1e3,a=setTimeout(()=>C(),o);return()=>clearTimeout(a)}},[p,y,C,S]),r.jsx("div",{ref:t,className:`gradual-blur ${e.target==="page"?"gradual-blur-page":"gradual-blur-parent"} ${e.className}`,style:I,onMouseEnter:v?()=>d(!0):void 0,onMouseLeave:v?()=>d(!1):void 0,children:r.jsx("div",{className:"gradual-blur-inner",style:{position:"relative",width:"100%",height:"100%"},children:f})})}const w=O.memo(ue);w.displayName="GradualBlur";w.PRESETS=k;w.CURVE_FUNCTIONS=R;const pe=()=>{if(typeof document>"u")return;const n="gradual-blur-styles";if(document.getElementById(n))return;const t=document.createElement("style");t.id=n,t.textContent=`
  .gradual-blur { pointer-events: none; transition: opacity 0.3s ease-out; }
  .gradual-blur-parent { overflow: hidden; }
  .gradual-blur-inner { pointer-events: none; }`,document.head.appendChild(t)};typeof document<"u"&&pe();const F={position:"bottom",strength:2,height:"7rem",divCount:5,curve:"bezier",target:"parent",exponential:!0,opacity:1},we=()=>{const{props:n,updateProp:t,resetProps:i,hasChanges:d}=A(F),{position:e,strength:u,height:g,divCount:p,curve:f,target:I,exponential:v,opacity:y}=n,C=c.useMemo(()=>[{name:"position",type:'"top" | "bottom" | "left" | "right"',default:'"bottom"',description:"Edge to attach the blur overlay."},{name:"strength",type:"number",default:"2",description:"Base blur strength multiplier (affects each layer)."},{name:"height",type:"string",default:'"6rem"',description:"Overlay height (for top / bottom positions)."},{name:"width",type:"string",default:"—",description:"Custom width (optional). Defaults to 100% for vertical positions or matches height for horizontal positions."},{name:"divCount",type:"number",default:"5",description:"Number of stacked blur layers (higher = smoother gradient)."},{name:"exponential",type:"boolean",default:"false",description:"Use exponential progression for stronger end blur."},{name:"curve",type:'"linear" | "bezier" | "ease-in"',default:'"linear"',description:"Distribution curve applied to layer progression."},{name:"opacity",type:"number",default:"1",description:"Opacity applied to each blur layer."},{name:"animated",type:'"boolean" | "scroll"',default:"false",description:'Fade in (true) or reveal on scroll ("scroll").'},{name:"duration",type:"string",default:'"0.3s"',description:"Animation duration (when animated)."},{name:"easing",type:"string",default:'"ease-out"',description:"Animation easing (opacity / backdrop-filter)."},{name:"hoverIntensity",type:"number",default:"—",description:"Multiplier applied to strength while hovered."},{name:"target",type:'"parent" | "page"',default:'"parent"',description:"Position relative to parent container or the entire page (fixed)."},{name:"preset",type:'"top" | "bottom" | "left" | "right"',default:"—",description:"Apply a predefined configuration bundle."},{name:"responsive",type:"boolean",default:"false",description:"Enable internal responsive recalculation (experimental)."},{name:"zIndex",type:"number",default:"1000",description:"Base z-index (page target adds +100)."},{name:"onAnimationComplete",type:"() => void",default:"—",description:"Callback fired after animated reveal completes."},{name:"className",type:"string",default:"—",description:"Additional class names appended to root element."},{name:"style",type:"React.CSSProperties",default:"—",description:"Inline style overrides merged into container style."}],[]),S=c.useRef(null);return c.useEffect(()=>{const o=S.current;if(!o)return;const a=window.matchMedia("(prefers-reduced-motion: reduce)").matches;if("ontouchstart"in window||navigator.maxTouchPoints>0||a)return;const s=new W({wrapper:o,content:o.firstElementChild,duration:2,smoothWheel:!0,smoothTouch:!1,touchMultiplier:1.2,wheelMultiplier:1,lerp:.1});let l;const m=b=>{s.raf(b),l=requestAnimationFrame(m)};return l=requestAnimationFrame(m),()=>{l&&cancelAnimationFrame(l),s.destroy()}},[]),r.jsx(j,{props:n,defaultProps:F,resetProps:i,hasChanges:d,children:r.jsxs(L,{children:[r.jsxs(_,{children:[r.jsxs(z,{position:"relative",className:"demo-container demo-container-dots",h:400,p:0,overflow:"hidden",children:[r.jsxs(H,{ref:S,flexDirection:"column",alignItems:"center",h:"100%",overflowY:"auto",overflowX:"hidden",px:6,py:"100px",position:"relative",w:"100%",css:{"&::-webkit-scrollbar":{display:"none"},scrollbarWidth:"none",msOverflowStyle:"none"},children:[r.jsx(V,{fontSize:"clamp(2rem, 4vw, 5rem)",fontWeight:900,zIndex:0,color:"#B497CF",children:"Scroll Down."}),r.jsx(D,{borderRadius:"50px",my:"100px",src:"https://images.unsplash.com/photo-1656536665219-da2b7deb314b?q=80&w=774&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",alt:"Lighthouse in the distance with purple colors.",w:"100%",maxW:"600px",border:"1px solid #2F293A",filter:"grayscale(0) brightness(2)"}),r.jsx(V,{fontSize:"clamp(2rem, 4vw, 5rem)",fontWeight:900,zIndex:0,color:"#B497CF",children:"Gradual Blur"})]}),r.jsx(w,{position:e,strength:u,height:e==="top"||e==="bottom"?g:"100%",divCount:p,curve:f,target:I,exponential:v,opacity:y,zIndex:10,width:e==="left"||e==="right"?"8rem":"100%"})]}),r.jsxs(J,{children:[r.jsx($,{title:"Position",name:"gradual-blur-position",value:e,options:[{label:"Top",value:"top"},{label:"Bottom",value:"bottom"}],onChange:o=>t("position",o)}),r.jsx($,{title:"Target",name:"gradual-blur-target",value:I,options:[{label:"Page",value:"page"},{label:"Parent",value:"parent"}],onChange:o=>t("target",o)}),r.jsx(K,{title:"Exponential",isChecked:v,onChange:o=>t("exponential",o)}),r.jsx(x,{title:"Strength",min:1,max:5,step:.5,value:u,onChange:o=>t("strength",o)}),r.jsx(x,{title:"Div Count",min:1,max:10,step:1,value:p,onChange:o=>t("divCount",o)}),r.jsx(x,{title:"Opacity",min:.1,max:1,step:.1,value:y,onChange:o=>t("opacity",o)})]}),r.jsx(q,{data:C}),r.jsx(Q,{dependencyList:["mathjs"]})]}),r.jsx(Y,{children:r.jsx(X,{codeObject:oe,componentName:"GradualBlur"})})]})})};export{we as default};
