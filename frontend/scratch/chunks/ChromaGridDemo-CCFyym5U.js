import{r as i,N as g,j as r,B as S}from"./index-TQprzHkU.js";import{u as P,C as D,T as j,P as z,a as T,b as X,c as L}from"./useComponentProps-CjYSqekE.js";import{C as Y}from"./Customize-BdikCFm5.js";import{P as y}from"./PreviewSlider-CCbi2och.js";import{D as O}from"./Dependencies-IIL9riMN.js";import"./index-DQmtNYX5.js";import"./CodeHighlighter-Dx4QNbvH.js";import"./rotate-ccw-_xDu3G0k.js";/* empty css                       */const G=`import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import './ChromaGrid.css';

export const ChromaGrid = ({
  items,
  className = '',
  radius = 300,
  columns = 3,
  rows = 2,
  damping = 0.45,
  fadeOut = 0.6,
  ease = 'power3.out'
}) => {
  const rootRef = useRef(null);
  const fadeRef = useRef(null);
  const setX = useRef(null);
  const setY = useRef(null);
  const pos = useRef({ x: 0, y: 0 });

  const demo = [
    {
      image: 'https://i.pravatar.cc/300?img=8',
      title: 'Alex Rivera',
      subtitle: 'Full Stack Developer',
      handle: '@alexrivera',
      borderColor: '#4F46E5',
      gradient: 'linear-gradient(145deg, #4F46E5, #000)',
      url: 'https://github.com/'
    },
    {
      image: 'https://i.pravatar.cc/300?img=11',
      title: 'Jordan Chen',
      subtitle: 'DevOps Engineer',
      handle: '@jordanchen',
      borderColor: '#10B981',
      gradient: 'linear-gradient(210deg, #10B981, #000)',
      url: 'https://linkedin.com/in/'
    },
    {
      image: 'https://i.pravatar.cc/300?img=3',
      title: 'Morgan Blake',
      subtitle: 'UI/UX Designer',
      handle: '@morganblake',
      borderColor: '#F59E0B',
      gradient: 'linear-gradient(165deg, #F59E0B, #000)',
      url: 'https://dribbble.com/'
    },
    {
      image: 'https://i.pravatar.cc/300?img=16',
      title: 'Casey Park',
      subtitle: 'Data Scientist',
      handle: '@caseypark',
      borderColor: '#EF4444',
      gradient: 'linear-gradient(195deg, #EF4444, #000)',
      url: 'https://kaggle.com/'
    },
    {
      image: 'https://i.pravatar.cc/300?img=25',
      title: 'Sam Kim',
      subtitle: 'Mobile Developer',
      handle: '@thesamkim',
      borderColor: '#8B5CF6',
      gradient: 'linear-gradient(225deg, #8B5CF6, #000)',
      url: 'https://github.com/'
    },
    {
      image: 'https://i.pravatar.cc/300?img=60',
      title: 'Tyler Rodriguez',
      subtitle: 'Cloud Architect',
      handle: '@tylerrod',
      borderColor: '#06B6D4',
      gradient: 'linear-gradient(135deg, #06B6D4, #000)',
      url: 'https://aws.amazon.com/'
    }
  ];
  const data = items?.length ? items : demo;

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    setX.current = gsap.quickSetter(el, '--x', 'px');
    setY.current = gsap.quickSetter(el, '--y', 'px');
    const { width, height } = el.getBoundingClientRect();
    pos.current = { x: width / 2, y: height / 2 };
    setX.current(pos.current.x);
    setY.current(pos.current.y);
  }, []);

  const moveTo = (x, y) => {
    gsap.to(pos.current, {
      x,
      y,
      duration: damping,
      ease,
      onUpdate: () => {
        setX.current?.(pos.current.x);
        setY.current?.(pos.current.y);
      },
      overwrite: true
    });
  };

  const handleMove = e => {
    const r = rootRef.current.getBoundingClientRect();
    moveTo(e.clientX - r.left, e.clientY - r.top);
    gsap.to(fadeRef.current, { opacity: 0, duration: 0.25, overwrite: true });
  };

  const handleLeave = () => {
    gsap.to(fadeRef.current, {
      opacity: 1,
      duration: fadeOut,
      overwrite: true
    });
  };

  const handleCardClick = url => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleCardMove = e => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', \`\${x}px\`);
    card.style.setProperty('--mouse-y', \`\${y}px\`);
  };

  return (
    <div
      ref={rootRef}
      className={\`chroma-grid \${className}\`}
      style={{
        '--r': \`\${radius}px\`,
        '--cols': columns,
        '--rows': rows
      }}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      {data.map((c, i) => (
        <article
          key={i}
          className="chroma-card"
          onMouseMove={handleCardMove}
          onClick={() => handleCardClick(c.url)}
          style={{
            '--card-border': c.borderColor || 'transparent',
            '--card-gradient': c.gradient,
            cursor: c.url ? 'pointer' : 'default'
          }}
        >
          <div className="chroma-img-wrapper">
            <img src={c.image} alt={c.title} loading="lazy" />
          </div>
          <footer className="chroma-info">
            <h3 className="name">{c.title}</h3>
            {c.handle && <span className="handle">{c.handle}</span>}
            <p className="role">{c.subtitle}</p>
            {c.location && <span className="location">{c.location}</span>}
          </footer>
        </article>
      ))}
      <div className="chroma-overlay" />
      <div ref={fadeRef} className="chroma-fade" />
    </div>
  );
};

export default ChromaGrid;
`,I=`.chroma-grid {
  position: relative;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(var(--cols, 3), 320px);
  grid-auto-rows: auto;
  justify-content: center;
  gap: 0.75rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  box-sizing: border-box;

  --x: 50%;
  --y: 50%;
  --r: 220px;
}

@media (max-width: 1124px) {
  .chroma-grid {
    grid-template-columns: repeat(auto-fit, minmax(320px, 320px));
    gap: 0.5rem;
    padding: 0.5rem;
  }
}

@media (max-width: 480px) {
  .chroma-grid {
    grid-template-columns: 320px;
    gap: 0.75rem;
    padding: 1rem;
  }
}

.chroma-card {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 320px;
  height: auto;
  border-radius: 20px;
  overflow: hidden;
  border: 1px solid #333;
  transition: border-color 0.3s ease;
  background: var(--card-gradient);

  --mouse-x: 50%;
  --mouse-y: 50%;
  --spotlight-color: rgba(255, 255, 255, 0.3);
}

.chroma-card:hover {
  border-color: var(--card-border);
}

.chroma-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at var(--mouse-x) var(--mouse-y), var(--spotlight-color), transparent 70%);
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.5s ease;
  z-index: 2;
}

.chroma-card:hover::before {
  opacity: 1;
}

.chroma-img-wrapper {
  position: relative;
  z-index: 1;
  flex: 1;
  padding: 10px;
  box-sizing: border-box;
  background: transparent;
  transition: background 0.3s ease;
}

.chroma-img-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px;
  display: block;
}

.chroma-info {
  position: relative;
  z-index: 1;
  padding: 0.75rem 1rem;
  color: #fff;
  font-family: system-ui, sans-serif;
  display: grid;
  grid-template-columns: 1fr auto;
  row-gap: 0.25rem;
  column-gap: 0.75rem;
}

.chroma-info .role,
.chroma-info .handle {
  color: #aaa;
}

.chroma-overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 3;
  backdrop-filter: grayscale(1) brightness(0.78);
  -webkit-backdrop-filter: grayscale(1) brightness(0.78);
  background: rgba(0, 0, 0, 0.001);

  mask-image: radial-gradient(
    circle var(--r) at var(--x) var(--y),
    transparent 0%,
    transparent 15%,
    rgba(0, 0, 0, 0.1) 30%,
    rgba(0, 0, 0, 0.22) 45%,
    rgba(0, 0, 0, 0.35) 60%,
    rgba(0, 0, 0, 0.5) 75%,
    rgba(0, 0, 0, 0.68) 88%,
    white 100%
  );
  -webkit-mask-image: radial-gradient(
    circle var(--r) at var(--x) var(--y),
    transparent 0%,
    transparent 15%,
    rgba(0, 0, 0, 0.1) 30%,
    rgba(0, 0, 0, 0.22) 45%,
    rgba(0, 0, 0, 0.35) 60%,
    rgba(0, 0, 0, 0.5) 75%,
    rgba(0, 0, 0, 0.68) 88%,
    white 100%
  );
}

.chroma-fade {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 4;
  backdrop-filter: grayscale(1) brightness(0.78);
  -webkit-backdrop-filter: grayscale(1) brightness(0.78);
  background: rgba(0, 0, 0, 0.001);

  mask-image: radial-gradient(
    circle var(--r) at var(--x) var(--y),
    white 0%,
    white 15%,
    rgba(255, 255, 255, 0.9) 30%,
    rgba(255, 255, 255, 0.78) 45%,
    rgba(255, 255, 255, 0.65) 60%,
    rgba(255, 255, 255, 0.5) 75%,
    rgba(255, 255, 255, 0.32) 88%,
    transparent 100%
  );
  -webkit-mask-image: radial-gradient(
    circle var(--r) at var(--x) var(--y),
    white 0%,
    white 15%,
    rgba(255, 255, 255, 0.9) 30%,
    rgba(255, 255, 255, 0.78) 45%,
    rgba(255, 255, 255, 0.65) 60%,
    rgba(255, 255, 255, 0.5) 75%,
    rgba(255, 255, 255, 0.32) 88%,
    transparent 100%
  );

  opacity: 1;
  transition: opacity 0.25s ease;
}
`,$=`import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const ChromaGrid = ({ items, className = '', radius = 300, damping = 0.45, fadeOut = 0.6, ease = 'power3.out' }) => {
  const rootRef = useRef(null);
  const fadeRef = useRef(null);
  const setX = useRef(null);
  const setY = useRef(null);
  const pos = useRef({ x: 0, y: 0 });

  const demo = [
    {
      image: 'https://i.pravatar.cc/300?img=8',
      title: 'Alex Rivera',
      subtitle: 'Full Stack Developer',
      handle: '@alexrivera',
      borderColor: '#4F46E5',
      gradient: 'linear-gradient(145deg,#4F46E5,#000)',
      url: 'https://github.com/'
    },
    {
      image: 'https://i.pravatar.cc/300?img=11',
      title: 'Jordan Chen',
      subtitle: 'DevOps Engineer',
      handle: '@jordanchen',
      borderColor: '#10B981',
      gradient: 'linear-gradient(210deg,#10B981,#000)',
      url: 'https://linkedin.com/in/'
    },
    {
      image: 'https://i.pravatar.cc/300?img=3',
      title: 'Morgan Blake',
      subtitle: 'UI/UX Designer',
      handle: '@morganblake',
      borderColor: '#F59E0B',
      gradient: 'linear-gradient(165deg,#F59E0B,#000)',
      url: 'https://dribbble.com/'
    },
    {
      image: 'https://i.pravatar.cc/300?img=16',
      title: 'Casey Park',
      subtitle: 'Data Scientist',
      handle: '@caseypark',
      borderColor: '#EF4444',
      gradient: 'linear-gradient(195deg,#EF4444,#000)',
      url: 'https://kaggle.com/'
    },
    {
      image: 'https://i.pravatar.cc/300?img=25',
      title: 'Sam Kim',
      subtitle: 'Mobile Developer',
      handle: '@thesamkim',
      borderColor: '#8B5CF6',
      gradient: 'linear-gradient(225deg,#8B5CF6,#000)',
      url: 'https://github.com/'
    },
    {
      image: 'https://i.pravatar.cc/300?img=60',
      title: 'Tyler Rodriguez',
      subtitle: 'Cloud Architect',
      handle: '@tylerrod',
      borderColor: '#06B6D4',
      gradient: 'linear-gradient(135deg,#06B6D4,#000)',
      url: 'https://aws.amazon.com/'
    }
  ];

  const data = items?.length ? items : demo;

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    setX.current = gsap.quickSetter(el, '--x', 'px');
    setY.current = gsap.quickSetter(el, '--y', 'px');
    const { width, height } = el.getBoundingClientRect();
    pos.current = { x: width / 2, y: height / 2 };
    setX.current(pos.current.x);
    setY.current(pos.current.y);
  }, []);

  const moveTo = (x, y) => {
    gsap.to(pos.current, {
      x,
      y,
      duration: damping,
      ease,
      onUpdate: () => {
        setX.current?.(pos.current.x);
        setY.current?.(pos.current.y);
      },
      overwrite: true
    });
  };

  const handleMove = e => {
    const r = rootRef.current.getBoundingClientRect();
    moveTo(e.clientX - r.left, e.clientY - r.top);
    gsap.to(fadeRef.current, { opacity: 0, duration: 0.25, overwrite: true });
  };

  const handleLeave = () => {
    gsap.to(fadeRef.current, {
      opacity: 1,
      duration: fadeOut,
      overwrite: true
    });
  };

  const handleCardClick = url => {
    if (url) window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCardMove = e => {
    const c = e.currentTarget;
    const rect = c.getBoundingClientRect();
    c.style.setProperty('--mouse-x', \`\${e.clientX - rect.left}px\`);
    c.style.setProperty('--mouse-y', \`\${e.clientY - rect.top}px\`);
  };

  return (
    <div
      ref={rootRef}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className={\`relative w-full h-full flex flex-wrap justify-center items-start gap-3 \${className}\`}
      style={{
        '--r': \`\${radius}px\`,
        '--x': '50%',
        '--y': '50%'
      }}
    >
      {data.map((c, i) => (
        <article
          key={i}
          onMouseMove={handleCardMove}
          onClick={() => handleCardClick(c.url)}
          className="group relative flex flex-col w-[300px] rounded-[20px] overflow-hidden border-2 border-transparent transition-colors duration-300 cursor-pointer"
          style={{
            '--card-border': c.borderColor || 'transparent',
            background: c.gradient,
            '--spotlight-color': 'rgba(255,255,255,0.3)'
          }}
        >
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-500 z-20 opacity-0 group-hover:opacity-100"
            style={{
              background:
                'radial-gradient(circle at var(--mouse-x) var(--mouse-y), var(--spotlight-color), transparent 70%)'
            }}
          />
          <div className="relative z-10 flex-1 p-[10px] box-border">
            <img src={c.image} alt={c.title} loading="lazy" className="w-full h-full object-cover rounded-[10px]" />
          </div>
          <footer className="relative z-10 p-3 text-white font-sans grid grid-cols-[1fr_auto] gap-x-3 gap-y-1">
            <h3 className="m-0 text-[1.05rem] font-semibold">{c.title}</h3>
            {c.handle && <span className="text-[0.95rem] opacity-80 text-right">{c.handle}</span>}
            <p className="m-0 text-[0.85rem] opacity-85">{c.subtitle}</p>
            {c.location && <span className="text-[0.85rem] opacity-85 text-right">{c.location}</span>}
          </footer>
        </article>
      ))}
      <div
        className="absolute inset-0 pointer-events-none z-30"
        style={{
          backdropFilter: 'grayscale(1) brightness(0.78)',
          WebkitBackdropFilter: 'grayscale(1) brightness(0.78)',
          background: 'rgba(0,0,0,0.001)',
          maskImage:
            'radial-gradient(circle var(--r) at var(--x) var(--y),transparent 0%,transparent 15%,rgba(0,0,0,0.10) 30%,rgba(0,0,0,0.22)45%,rgba(0,0,0,0.35)60%,rgba(0,0,0,0.50)75%,rgba(0,0,0,0.68)88%,white 100%)',
          WebkitMaskImage:
            'radial-gradient(circle var(--r) at var(--x) var(--y),transparent 0%,transparent 15%,rgba(0,0,0,0.10) 30%,rgba(0,0,0,0.22)45%,rgba(0,0,0,0.35)60%,rgba(0,0,0,0.50)75%,rgba(0,0,0,0.68)88%,white 100%)'
        }}
      />
      <div
        ref={fadeRef}
        className="absolute inset-0 pointer-events-none transition-opacity duration-[250ms] z-40"
        style={{
          backdropFilter: 'grayscale(1) brightness(0.78)',
          WebkitBackdropFilter: 'grayscale(1) brightness(0.78)',
          background: 'rgba(0,0,0,0.001)',
          maskImage:
            'radial-gradient(circle var(--r) at var(--x) var(--y),white 0%,white 15%,rgba(255,255,255,0.90)30%,rgba(255,255,255,0.78)45%,rgba(255,255,255,0.65)60%,rgba(255,255,255,0.50)75%,rgba(255,255,255,0.32)88%,transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(circle var(--r) at var(--x) var(--y),white 0%,white 15%,rgba(255,255,255,0.90)30%,rgba(255,255,255,0.78)45%,rgba(255,255,255,0.65)60%,rgba(255,255,255,0.50)75%,rgba(255,255,255,0.32)88%,transparent 100%)',
          opacity: 1
        }}
      />
    </div>
  );
};

export default ChromaGrid;
`,U=`import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import './ChromaGrid.css';

export interface ChromaItem {
  image: string;
  title: string;
  subtitle: string;
  handle?: string;
  location?: string;
  borderColor?: string;
  gradient?: string;
  url?: string;
}

export interface ChromaGridProps {
  items?: ChromaItem[];
  className?: string;
  radius?: number;
  columns?: number;
  rows?: number;
  damping?: number;
  fadeOut?: number;
  ease?: string;
}

type SetterFn = (v: number | string) => void;

export const ChromaGrid: React.FC<ChromaGridProps> = ({
  items,
  className = '',
  radius = 300,
  columns = 3,
  rows = 2,
  damping = 0.45,
  fadeOut = 0.6,
  ease = 'power3.out'
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const fadeRef = useRef<HTMLDivElement>(null);
  const setX = useRef<SetterFn | null>(null);
  const setY = useRef<SetterFn | null>(null);
  const pos = useRef({ x: 0, y: 0 });

  const demo: ChromaItem[] = [
    {
      image: 'https://i.pravatar.cc/300?img=8',
      title: 'Alex Rivera',
      subtitle: 'Full Stack Developer',
      handle: '@alexrivera',
      borderColor: '#4F46E5',
      gradient: 'linear-gradient(145deg, #4F46E5, #000)',
      url: 'https://github.com/'
    },
    {
      image: 'https://i.pravatar.cc/300?img=11',
      title: 'Jordan Chen',
      subtitle: 'DevOps Engineer',
      handle: '@jordanchen',
      borderColor: '#10B981',
      gradient: 'linear-gradient(210deg, #10B981, #000)',
      url: 'https://linkedin.com/in/'
    },
    {
      image: 'https://i.pravatar.cc/300?img=3',
      title: 'Morgan Blake',
      subtitle: 'UI/UX Designer',
      handle: '@morganblake',
      borderColor: '#F59E0B',
      gradient: 'linear-gradient(165deg, #F59E0B, #000)',
      url: 'https://dribbble.com/'
    },
    {
      image: 'https://i.pravatar.cc/300?img=16',
      title: 'Casey Park',
      subtitle: 'Data Scientist',
      handle: '@caseypark',
      borderColor: '#EF4444',
      gradient: 'linear-gradient(195deg, #EF4444, #000)',
      url: 'https://kaggle.com/'
    },
    {
      image: 'https://i.pravatar.cc/300?img=25',
      title: 'Sam Kim',
      subtitle: 'Mobile Developer',
      handle: '@thesamkim',
      borderColor: '#8B5CF6',
      gradient: 'linear-gradient(225deg, #8B5CF6, #000)',
      url: 'https://github.com/'
    },
    {
      image: 'https://i.pravatar.cc/300?img=60',
      title: 'Tyler Rodriguez',
      subtitle: 'Cloud Architect',
      handle: '@tylerrod',
      borderColor: '#06B6D4',
      gradient: 'linear-gradient(135deg, #06B6D4, #000)',
      url: 'https://aws.amazon.com/'
    }
  ];
  const data = items?.length ? items : demo;

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    setX.current = gsap.quickSetter(el, '--x', 'px') as SetterFn;
    setY.current = gsap.quickSetter(el, '--y', 'px') as SetterFn;
    const { width, height } = el.getBoundingClientRect();
    pos.current = { x: width / 2, y: height / 2 };
    setX.current(pos.current.x);
    setY.current(pos.current.y);
  }, []);

  const moveTo = (x: number, y: number) => {
    gsap.to(pos.current, {
      x,
      y,
      duration: damping,
      ease,
      onUpdate: () => {
        setX.current?.(pos.current.x);
        setY.current?.(pos.current.y);
      },
      overwrite: true
    });
  };

  const handleMove = (e: React.PointerEvent) => {
    const r = rootRef.current!.getBoundingClientRect();
    moveTo(e.clientX - r.left, e.clientY - r.top);
    gsap.to(fadeRef.current, { opacity: 0, duration: 0.25, overwrite: true });
  };

  const handleLeave = () => {
    gsap.to(fadeRef.current, {
      opacity: 1,
      duration: fadeOut,
      overwrite: true
    });
  };

  const handleCardClick = (url?: string) => {
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleCardMove: React.MouseEventHandler<HTMLElement> = e => {
    const card = e.currentTarget as HTMLElement;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', \`\${x}px\`);
    card.style.setProperty('--mouse-y', \`\${y}px\`);
  };

  return (
    <div
      ref={rootRef}
      className={\`chroma-grid \${className}\`}
      style={
        {
          '--r': \`\${radius}px\`,
          '--cols': columns,
          '--rows': rows
        } as React.CSSProperties
      }
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      {data.map((c, i) => (
        <article
          key={i}
          className="chroma-card"
          onMouseMove={handleCardMove}
          onClick={() => handleCardClick(c.url)}
          style={
            {
              '--card-border': c.borderColor || 'transparent',
              '--card-gradient': c.gradient,
              cursor: c.url ? 'pointer' : 'default'
            } as React.CSSProperties
          }
        >
          <div className="chroma-img-wrapper">
            <img src={c.image} alt={c.title} loading="lazy" />
          </div>
          <footer className="chroma-info">
            <h3 className="name">{c.title}</h3>
            {c.handle && <span className="handle">{c.handle}</span>}
            <p className="role">{c.subtitle}</p>
            {c.location && <span className="location">{c.location}</span>}
          </footer>
        </article>
      ))}
      <div className="chroma-overlay" />
      <div ref={fadeRef} className="chroma-fade" />
    </div>
  );
};

export default ChromaGrid;
`,A=`import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

export interface ChromaItem {
  image: string;
  title: string;
  subtitle: string;
  handle?: string;
  location?: string;
  borderColor?: string;
  gradient?: string;
  url?: string;
}

export interface ChromaGridProps {
  items?: ChromaItem[];
  className?: string;
  radius?: number;
  damping?: number;
  fadeOut?: number;
  ease?: string;
}

type SetterFn = (v: number | string) => void;

const ChromaGrid: React.FC<ChromaGridProps> = ({
  items,
  className = '',
  radius = 300,
  damping = 0.45,
  fadeOut = 0.6,
  ease = 'power3.out'
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const fadeRef = useRef<HTMLDivElement>(null);
  const setX = useRef<SetterFn | null>(null);
  const setY = useRef<SetterFn | null>(null);
  const pos = useRef({ x: 0, y: 0 });

  const demo: ChromaItem[] = [
    {
      image: 'https://i.pravatar.cc/300?img=8',
      title: 'Alex Rivera',
      subtitle: 'Full Stack Developer',
      handle: '@alexrivera',
      borderColor: '#4F46E5',
      gradient: 'linear-gradient(145deg,#4F46E5,#000)',
      url: 'https://github.com/'
    },
    {
      image: 'https://i.pravatar.cc/300?img=11',
      title: 'Jordan Chen',
      subtitle: 'DevOps Engineer',
      handle: '@jordanchen',
      borderColor: '#10B981',
      gradient: 'linear-gradient(210deg,#10B981,#000)',
      url: 'https://linkedin.com/in/'
    },
    {
      image: 'https://i.pravatar.cc/300?img=3',
      title: 'Morgan Blake',
      subtitle: 'UI/UX Designer',
      handle: '@morganblake',
      borderColor: '#F59E0B',
      gradient: 'linear-gradient(165deg,#F59E0B,#000)',
      url: 'https://dribbble.com/'
    },
    {
      image: 'https://i.pravatar.cc/300?img=16',
      title: 'Casey Park',
      subtitle: 'Data Scientist',
      handle: '@caseypark',
      borderColor: '#EF4444',
      gradient: 'linear-gradient(195deg,#EF4444,#000)',
      url: 'https://kaggle.com/'
    },
    {
      image: 'https://i.pravatar.cc/300?img=25',
      title: 'Sam Kim',
      subtitle: 'Mobile Developer',
      handle: '@thesamkim',
      borderColor: '#8B5CF6',
      gradient: 'linear-gradient(225deg,#8B5CF6,#000)',
      url: 'https://github.com/'
    },
    {
      image: 'https://i.pravatar.cc/300?img=60',
      title: 'Tyler Rodriguez',
      subtitle: 'Cloud Architect',
      handle: '@tylerrod',
      borderColor: '#06B6D4',
      gradient: 'linear-gradient(135deg,#06B6D4,#000)',
      url: 'https://aws.amazon.com/'
    }
  ];

  const data = items?.length ? items : demo;

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    setX.current = gsap.quickSetter(el, '--x', 'px') as SetterFn;
    setY.current = gsap.quickSetter(el, '--y', 'px') as SetterFn;
    const { width, height } = el.getBoundingClientRect();
    pos.current = { x: width / 2, y: height / 2 };
    setX.current(pos.current.x);
    setY.current(pos.current.y);
  }, []);

  const moveTo = (x: number, y: number) => {
    gsap.to(pos.current, {
      x,
      y,
      duration: damping,
      ease,
      onUpdate: () => {
        setX.current?.(pos.current.x);
        setY.current?.(pos.current.y);
      },
      overwrite: true
    });
  };

  const handleMove = (e: React.PointerEvent) => {
    const r = rootRef.current!.getBoundingClientRect();
    moveTo(e.clientX - r.left, e.clientY - r.top);
    gsap.to(fadeRef.current, { opacity: 0, duration: 0.25, overwrite: true });
  };

  const handleLeave = () => {
    gsap.to(fadeRef.current, {
      opacity: 1,
      duration: fadeOut,
      overwrite: true
    });
  };

  const handleCardClick = (url?: string) => {
    if (url) window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCardMove: React.MouseEventHandler<HTMLElement> = e => {
    const c = e.currentTarget as HTMLElement;
    const rect = c.getBoundingClientRect();
    c.style.setProperty('--mouse-x', \`\${e.clientX - rect.left}px\`);
    c.style.setProperty('--mouse-y', \`\${e.clientY - rect.top}px\`);
  };

  return (
    <div
      ref={rootRef}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className={\`relative w-full h-full flex flex-wrap justify-center items-start gap-3 \${className}\`}
      style={
        {
          '--r': \`\${radius}px\`,
          '--x': '50%',
          '--y': '50%'
        } as React.CSSProperties
      }
    >
      {data.map((c, i) => (
        <article
          key={i}
          onMouseMove={handleCardMove}
          onClick={() => handleCardClick(c.url)}
          className="group relative flex flex-col w-[300px] rounded-[20px] overflow-hidden border-2 border-transparent transition-colors duration-300 cursor-pointer"
          style={
            {
              '--card-border': c.borderColor || 'transparent',
              background: c.gradient,
              '--spotlight-color': 'rgba(255,255,255,0.3)'
            } as React.CSSProperties
          }
        >
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-500 z-20 opacity-0 group-hover:opacity-100"
            style={{
              background:
                'radial-gradient(circle at var(--mouse-x) var(--mouse-y), var(--spotlight-color), transparent 70%)'
            }}
          />
          <div className="relative z-10 flex-1 p-[10px] box-border">
            <img src={c.image} alt={c.title} loading="lazy" className="w-full h-full object-cover rounded-[10px]" />
          </div>
          <footer className="relative z-10 p-3 text-white font-sans grid grid-cols-[1fr_auto] gap-x-3 gap-y-1">
            <h3 className="m-0 text-[1.05rem] font-semibold">{c.title}</h3>
            {c.handle && <span className="text-[0.95rem] opacity-80 text-right">{c.handle}</span>}
            <p className="m-0 text-[0.85rem] opacity-85">{c.subtitle}</p>
            {c.location && <span className="text-[0.85rem] opacity-85 text-right">{c.location}</span>}
          </footer>
        </article>
      ))}
      <div
        className="absolute inset-0 pointer-events-none z-30"
        style={{
          backdropFilter: 'grayscale(1) brightness(0.78)',
          WebkitBackdropFilter: 'grayscale(1) brightness(0.78)',
          background: 'rgba(0,0,0,0.001)',
          maskImage:
            'radial-gradient(circle var(--r) at var(--x) var(--y),transparent 0%,transparent 15%,rgba(0,0,0,0.10) 30%,rgba(0,0,0,0.22)45%,rgba(0,0,0,0.35)60%,rgba(0,0,0,0.50)75%,rgba(0,0,0,0.68)88%,white 100%)',
          WebkitMaskImage:
            'radial-gradient(circle var(--r) at var(--x) var(--y),transparent 0%,transparent 15%,rgba(0,0,0,0.10) 30%,rgba(0,0,0,0.22)45%,rgba(0,0,0,0.35)60%,rgba(0,0,0,0.50)75%,rgba(0,0,0,0.68)88%,white 100%)'
        }}
      />
      <div
        ref={fadeRef}
        className="absolute inset-0 pointer-events-none transition-opacity duration-[250ms] z-40"
        style={{
          backdropFilter: 'grayscale(1) brightness(0.78)',
          WebkitBackdropFilter: 'grayscale(1) brightness(0.78)',
          background: 'rgba(0,0,0,0.001)',
          maskImage:
            'radial-gradient(circle var(--r) at var(--x) var(--y),white 0%,white 15%,rgba(255,255,255,0.90)30%,rgba(255,255,255,0.78)45%,rgba(255,255,255,0.65)60%,rgba(255,255,255,0.50)75%,rgba(255,255,255,0.32)88%,transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(circle var(--r) at var(--x) var(--y),white 0%,white 15%,rgba(255,255,255,0.90)30%,rgba(255,255,255,0.78)45%,rgba(255,255,255,0.65)60%,rgba(255,255,255,0.50)75%,rgba(255,255,255,0.32)88%,transparent 100%)',
          opacity: 1
        }}
      />
    </div>
  );
};

export default ChromaGrid;
`,q={dependencies:"gsap",usage:`import ChromaGrid from './ChromaGrid'

const items = [
  {
    image: "https://i.pravatar.cc/300?img=1",
    title: "Sarah Johnson",
    subtitle: "Frontend Developer",
    handle: "@sarahjohnson",
    borderColor: "#3B82F6",
    gradient: "linear-gradient(145deg, #3B82F6, #000)",
    url: "https://github.com/sarahjohnson"
  },
  {
    image: "https://i.pravatar.cc/300?img=2",
    title: "Mike Chen",
    subtitle: "Backend Engineer",
    handle: "@mikechen",
    borderColor: "#10B981",
    gradient: "linear-gradient(180deg, #10B981, #000)",
    url: "https://linkedin.com/in/mikechen"
  }
];

<div style={{ height: '600px', position: 'relative' }}>
  <ChromaGrid 
    items={items}
    radius={300}
    damping={0.45}
    fadeOut={0.6}
    ease="power3.out"
  />
</div>`,code:G,css:I,tailwind:$,tsCode:U,tsTailwind:A},H=({items:n,className:l="",radius:b=300,columns:v=3,rows:p=2,damping:u=.45,fadeOut:m=.6,ease:f="power3.out"})=>{const a=i.useRef(null),x=i.useRef(null),c=i.useRef(null),d=i.useRef(null),s=i.useRef({x:0,y:0}),k=[{image:"https://i.pravatar.cc/300?img=8",title:"Alex Rivera",subtitle:"Full Stack Developer",handle:"@alexrivera",borderColor:"#4F46E5",gradient:"linear-gradient(145deg, #4F46E5, #000)",url:"https://github.com/"},{image:"https://i.pravatar.cc/300?img=11",title:"Jordan Chen",subtitle:"DevOps Engineer",handle:"@jordanchen",borderColor:"#10B981",gradient:"linear-gradient(210deg, #10B981, #000)",url:"https://linkedin.com/in/"},{image:"https://i.pravatar.cc/300?img=3",title:"Morgan Blake",subtitle:"UI/UX Designer",handle:"@morganblake",borderColor:"#F59E0B",gradient:"linear-gradient(165deg, #F59E0B, #000)",url:"https://dribbble.com/"},{image:"https://i.pravatar.cc/300?img=16",title:"Casey Park",subtitle:"Data Scientist",handle:"@caseypark",borderColor:"#EF4444",gradient:"linear-gradient(195deg, #EF4444, #000)",url:"https://kaggle.com/"},{image:"https://i.pravatar.cc/300?img=25",title:"Sam Kim",subtitle:"Mobile Developer",handle:"@thesamkim",borderColor:"#8B5CF6",gradient:"linear-gradient(225deg, #8B5CF6, #000)",url:"https://github.com/"},{image:"https://i.pravatar.cc/300?img=60",title:"Tyler Rodriguez",subtitle:"Cloud Architect",handle:"@tylerrod",borderColor:"#06B6D4",gradient:"linear-gradient(135deg, #06B6D4, #000)",url:"https://aws.amazon.com/"}],w=n!=null&&n.length?n:k;i.useEffect(()=>{const e=a.current;if(!e)return;c.current=g.quickSetter(e,"--x","px"),d.current=g.quickSetter(e,"--y","px");const{width:t,height:o}=e.getBoundingClientRect();s.current={x:t/2,y:o/2},c.current(s.current.x),d.current(s.current.y)},[]);const R=(e,t)=>{g.to(s.current,{x:e,y:t,duration:u,ease:f,onUpdate:()=>{var o,h;(o=c.current)==null||o.call(c,s.current.x),(h=d.current)==null||h.call(d,s.current.y)},overwrite:!0})},B=e=>{const t=a.current.getBoundingClientRect();R(e.clientX-t.left,e.clientY-t.top),g.to(x.current,{opacity:0,duration:.25,overwrite:!0})},F=()=>{g.to(x.current,{opacity:1,duration:m,overwrite:!0})},N=e=>{e&&window.open(e,"_blank","noopener,noreferrer")},E=e=>{const t=e.currentTarget,o=t.getBoundingClientRect(),h=e.clientX-o.left,M=e.clientY-o.top;t.style.setProperty("--mouse-x",`${h}px`),t.style.setProperty("--mouse-y",`${M}px`)};return r.jsxs("div",{ref:a,className:`chroma-grid ${l}`,style:{"--r":`${b}px`,"--cols":v,"--rows":p},onPointerMove:B,onPointerLeave:F,children:[w.map((e,t)=>r.jsxs("article",{className:"chroma-card",onMouseMove:E,onClick:()=>N(e.url),style:{"--card-border":e.borderColor||"transparent","--card-gradient":e.gradient,cursor:e.url?"pointer":"default"},children:[r.jsx("div",{className:"chroma-img-wrapper",children:r.jsx("img",{src:e.image,alt:e.title,loading:"lazy"})}),r.jsxs("footer",{className:"chroma-info",children:[r.jsx("h3",{className:"name",children:e.title}),e.handle&&r.jsx("span",{className:"handle",children:e.handle}),r.jsx("p",{className:"role",children:e.subtitle}),e.location&&r.jsx("span",{className:"location",children:e.location})]})]},t)),r.jsx("div",{className:"chroma-overlay"}),r.jsx("div",{ref:x,className:"chroma-fade"})]})},C={radius:300,damping:.45,fadeOut:.6},te=()=>{const{props:n,updateProp:l,resetProps:b,hasChanges:v}=P(C),{radius:p,damping:u,fadeOut:m}=n,f=i.useMemo(()=>[{name:"items",type:"Array",default:"Demo []",description:"Array of ChromaItem objects to display in the grid"},{name:"className",type:"string",default:"''",description:"Additional CSS classes to apply to the grid container"},{name:"radius",type:"number",default:"300",description:"Size of the spotlight effect in pixels"},{name:"damping",type:"number",default:"0.45",description:"Cursor follow animation duration in seconds"},{name:"fadeOut",type:"number",default:"0.6",description:"Fade-out animation duration in seconds when mouse leaves"},{name:"ease",type:"string",default:"'power3.out'",description:"GSAP easing function for animations"}],[]);return r.jsx(D,{props:n,defaultProps:C,resetProps:b,hasChanges:v,children:r.jsxs(j,{children:[r.jsxs(z,{children:[r.jsx(S,{position:"relative",className:"demo-container",h:"auto",overflow:"hidden",p:0,py:6,children:r.jsx(H,{radius:p,damping:u,fadeOut:m})}),r.jsxs(Y,{children:[r.jsx(y,{title:"Radius",min:50,max:800,step:25,value:p,onChange:a=>l("radius",a)}),r.jsx(y,{title:"Damping",min:.1,max:2,step:.05,value:u,onChange:a=>l("damping",a)}),r.jsx(y,{title:"Fade Out",min:.1,max:2,step:.05,value:m,onChange:a=>l("fadeOut",a)})]}),r.jsx(T,{data:f}),r.jsx(O,{dependencyList:["gsap"]})]}),r.jsx(X,{children:r.jsx(L,{codeObject:q,componentName:"ChromaGrid"})})]})})};export{te as default};
