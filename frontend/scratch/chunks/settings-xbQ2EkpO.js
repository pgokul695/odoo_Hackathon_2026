import{r as d,D as w,c as p}from"./index-TQprzHkU.js";function x(e,s=[]){const a=d.useRef(()=>{throw new Error("Cannot call an event handler while rendering.")});return d.useInsertionEffect(()=>{a.current=e}),d.useCallback((...i)=>{var n;return(n=a.current)==null?void 0:n.call(a,...i)},s)}function C(e,s){try{return e.addEventListener("change",s),()=>e.removeEventListener("change",s)}catch{return e.addListener(s),()=>e.removeListener(s)}}function E(e,s={}){const{fallback:a=[],ssr:i=!0,getWindow:n}=s,m=x(n),h=Array.isArray(e)?e:[e],b=a==null?void 0:a.filter(t=>t!=null),[f,c]=d.useState(()=>h.map((t,u)=>{if(!i){const{media:y,matches:v}=((n==null?void 0:n())??window).matchMedia(t);return{media:y,matches:v}}return{media:t,matches:!!b[u]}}));return d.useEffect(()=>{const t=m()??window;c(r=>{const l=h.map(o=>{const{media:k,matches:M}=t.matchMedia(o);return{media:k,matches:M}});return r.every((o,k)=>o.matches===l[k].matches&&o.media===l[k].media)?r:l});const u=h.map(r=>t.matchMedia(r)),y=r=>{c(l=>l.slice().map(o=>o.media===r.media?{...o,matches:r.matches}:o))},v=u.map(r=>C(r,y));return()=>v.forEach(r=>r())},[m]),f.map(t=>t.matches)}function _(e={}){var f;e.fallback||(e.fallback="base");const s=w();let a=!1;const n=s.breakpoints.values.map(({min:c,name:t})=>{const u={breakpoint:t,query:`(min-width: ${c})`,fallback:!a};return t===e.fallback&&(a=!0),u}).filter(({breakpoint:c})=>{var t;return!!((t=e.breakpoints)!=null&&t.includes(c))}),m=n.map(({fallback:c})=>c),b=E(n.map(c=>c.query),{fallback:m,ssr:e.ssr}).lastIndexOf(!0);return((f=n[b])==null?void 0:f.breakpoint)??e.fallback}function V(e,s){const i=w().normalizeValue(e),n=_({breakpoints:Object.keys(i),...s});return i[n]}/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g=[["path",{d:"m18 15-6-6-6 6",key:"153udz"}]],$=p("chevron-up",g);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const L=[["path",{d:"M12 15V3",key:"m9g1x1"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["path",{d:"m7 10 5 5 5-5",key:"brsn70"}]],A=p("download",L);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const z=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]],D=p("plus",z);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const B=[["path",{d:"M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",key:"1i5ecw"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]],I=p("settings",B);export{$ as C,A as D,D as P,I as S,V as u};
