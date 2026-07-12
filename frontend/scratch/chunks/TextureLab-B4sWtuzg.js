import{i as ot,r as g,m as le,j as i,k as ce,l as Ge,n as Ot,o as Nt,p as zt,q as Ft,s as Gt,t as Bt,v as Ht,w as Vt,x as Oe,y as Xt,z as Wt,A as qt,c as A,F as T,B as I,h as $t,X as Yt,b as Kt,T as w,I as j,C as Le,P as Ke,E as it}from"./index-TQprzHkU.js";import{P as m}from"./PreviewSlider-CCbi2och.js";import{P as te}from"./PreviewSelect-DZgUm0jD.js";import{P as J}from"./PreviewSwitch-CcPSwIGg.js";import{P as ie}from"./PreviewColorPickerCustom-BFsDkSOr.js";import{C as nt,S as Zt,E as Qt,T as Jt}from"./trash-2-CM0WN-HZ.js";import{R as er}from"./rotate-ccw-_xDu3G0k.js";import{D as tr,C as ke,P as rr,u as or,S as ir}from"./settings-xbQ2EkpO.js";import{S as nr}from"./sparkles-Br7UBlFR.js";/* empty css                       */const[at,he]=ot({name:"SliderContext",hookName:"useSliderContext",providerName:"<SliderProvider />"}),st=g.forwardRef((r,e)=>{const t=he(),a=le(t.getControlProps(),r);return i.jsx(ce.div,{...a,ref:e})});st.displayName="SliderControl";const[ar,sr]=ot({name:"SliderThumbPropsContext",hookName:"useSliderThumbPropsContext",providerName:"<SliderThumbPropsProvider />"}),lt=g.forwardRef((r,e)=>{const t=he(),{index:a}=sr(),s=le(t.getDraggingIndicatorProps({index:a}),r);return i.jsx(ce.span,{...s,ref:e,children:r.children||t.getThumbValue(a)})});lt.displayName="SliderDraggingIndicator";const ct=g.forwardRef((r,e)=>{const t=he(),a=le(t.getLabelProps(),r);return i.jsx(ce.label,{...a,ref:e})});ct.displayName="SliderLabel";const ut=g.forwardRef((r,e)=>{const[t,a]=Ge()(r,["value"]),s=he(),c=le(s.getMarkerProps(t),a);return i.jsx(ce.span,{...c,ref:e})});ut.displayName="SliderMarker";const dt=g.forwardRef((r,e)=>{const t=he(),a=le(t.getMarkerGroupProps(),r);return i.jsx(ce.div,{...a,ref:e})});dt.displayName="SliderMarkerGroup";const ft=g.forwardRef((r,e)=>{const t=he(),a=le(t.getRangeProps(),r);return i.jsx(ce.div,{...a,ref:e})});ft.displayName="SliderRange";const lr=r=>{const e=g.useId(),{getRootNode:t}=Ot(),{dir:a}=Nt(),s={id:e,dir:a,getRootNode:t,...r},c=zt(Gt,s);return Ft(c,Bt)},mt=g.forwardRef((r,e)=>{const[t,a]=Ge()(r,["aria-label","aria-labelledby","defaultValue","disabled","form","getAriaValueText","id","ids","invalid","max","min","minStepsBetweenThumbs","name","onFocusChange","onValueChange","onValueChangeEnd","orientation","origin","readOnly","step","thumbAlignment","thumbAlignment","thumbSize","value"]),s=lr(t),c=le(s.getRootProps(),a);return i.jsx(at,{value:s,children:i.jsx(ce.div,{...c,ref:e})})});mt.displayName="SliderRoot";const ht=g.forwardRef((r,e)=>{const[{value:t},a]=Ge()(r,["value"]),s=le(t.getRootProps(),a);return i.jsx(at,{value:t,children:i.jsx(ce.div,{...s,ref:e})})});ht.displayName="SliderRootProvider";const gt=g.forwardRef((r,e)=>{const[t,a]=Ge()(r,["index","name"]),s=he(),c=le(s.getThumbProps(t),a);return i.jsx(ar,{value:t,children:i.jsx(ce.div,{...c,ref:e})})});gt.displayName="SliderThumb";const pt=g.forwardRef((r,e)=>{const t=he(),a=le(t.getTrackProps(),r);return i.jsx(ce.div,{...a,ref:e})});pt.displayName="SliderTrack";const vt=g.forwardRef((r,e)=>{const{children:t,...a}=r,s=he(),c=le(s.getValueTextProps(),a);return i.jsx(ce.span,{...c,ref:e,children:t||s.value.join(", ")})});vt.displayName="SliderValueText";var cr=Wt("toast").parts("group","root","title","description","actionTrigger","closeTrigger");cr.build();var ur=(r,e)=>({...e,...Ht(r)});function dr(r={}){const e=ur(r,{placement:"bottom",overlap:!1,max:24,gap:16,offsets:"1rem",hotkey:["altKey","KeyT"],removeDelay:200,pauseOnPageIdle:!0});let t=[],a=[],s=new Set,c=[];const n=v=>(t.push(v),()=>{const y=t.indexOf(v);t.splice(y,1)}),o=v=>(t.forEach(y=>y(v)),v),u=v=>{if(a.length>=e.max){c.push(v);return}o(v),a.unshift(v)},d=()=>{for(;c.length>0&&a.length<e.max;){const v=c.shift();v&&(o(v),a.unshift(v))}},p=v=>{const y=v.id??`toast:${Xt()}`,q=a.find(G=>G.id===y);return s.has(y)&&s.delete(y),q?a=a.map(G=>G.id===y?o({...G,...v,id:y}):G):u({id:y,duration:e.duration,removeDelay:e.removeDelay,type:"info",...v,stacked:!e.overlap,gap:e.gap}),y},_=v=>(s.add(v),v?(t.forEach(y=>y({id:v,dismiss:!0})),a=a.filter(y=>y.id!==v),d()):(a.forEach(y=>{t.forEach(q=>q({id:y.id,dismiss:!0}))}),a=[],c=[]),v);return{attrs:e,subscribe:n,create:p,update:(v,y)=>p({id:v,...y}),remove:_,dismiss:v=>{v!=null?a=a.map(y=>y.id===v?o({...y,message:"DISMISS"}):y):a=a.map(y=>o({...y,message:"DISMISS"}))},error:v=>p({...v,type:"error"}),success:v=>p({...v,type:"success"}),info:v=>p({...v,type:"info"}),warning:v=>p({...v,type:"warning"}),loading:v=>p({...v,type:"loading"}),getVisibleToasts:()=>a.filter(v=>!s.has(v.id)),getCount:()=>a.length,promise:(v,y,q={})=>{if(!y||!y.loading){Vt("[zag-js > toast] toaster.promise() requires at least a 'loading' option to be specified");return}const G=p({...q,...y.loading,promise:v,type:"loading"});let Z=!0,Q;const ge=Oe(v).then(async W=>{if(Q=["resolve",W],fr(W)&&!W.ok){Z=!1;const K=Oe(y.error,`HTTP Error! status: ${W.status}`);p({...q,...K,id:G,type:"error"})}else if(y.success!==void 0){Z=!1;const K=Oe(y.success,W);p({...q,...K,id:G,type:"success"})}}).catch(async W=>{if(Q=["reject",W],y.error!==void 0){Z=!1;const K=Oe(y.error,W);p({...q,...K,id:G,type:"error"})}}).finally(()=>{var W;Z&&_(G),(W=y.finally)==null||W.call(y)});return{id:G,unwrap:()=>new Promise((W,K)=>ge.then(()=>Q[0]==="reject"?K(Q[1]):W(Q[1])).catch(K))}},pause:v=>{v!=null?a=a.map(y=>y.id===v?o({...y,message:"PAUSE"}):y):a=a.map(y=>o({...y,message:"PAUSE"}))},resume:v=>{v!=null?a=a.map(y=>y.id===v?o({...y,message:"RESUME"}):y):a=a.map(y=>o({...y,message:"RESUME"}))},isVisible:v=>!s.has(v)&&!!a.find(y=>y.id===v),isDismissed:v=>s.has(v),expand:()=>{a=a.map(v=>o({...v,stacked:!0}))},collapse:()=>{a=a.map(v=>o({...v,stacked:!1}))}}}var fr=r=>r&&typeof r=="object"&&"ok"in r&&typeof r.ok=="boolean"&&"status"in r&&typeof r.status=="number";const mr=r=>dr(r),{withProvider:xt,withContext:de}=qt({key:"slider"});xt(ht,"root",{forwardAsChild:!0});const hr=xt(mt,"root",{forwardAsChild:!0}),gr=de(pt,"track",{forwardAsChild:!0}),pr=de(ft,"range",{forwardAsChild:!0}),vr=de(gt,"thumb",{forwardAsChild:!0});de(vt,"valueText",{forwardAsChild:!0});de(ct,"label",{forwardAsChild:!0});const xr=de(dt,"markerGroup",{forwardAsChild:!0}),br=de(ut,"marker",{forwardAsChild:!0}),_r=de("div","markerIndicator");de(lt,"draggingIndicator",{forwardAsChild:!0});g.forwardRef(function(e,t){const{marks:a,...s}=e;return a!=null&&a.length?i.jsx(xr,{ref:t,...s,children:a.map((c,n)=>{const o=typeof c=="number"?c:c.value,u=typeof c=="number"?void 0:c.label;return i.jsxs(br,{value:o,children:[i.jsx(_r,{}),u!=null&&i.jsx("span",{className:"chakra-slider__marker-label",children:u})]},n)})}):null});const yr=de(st,"control",{forwardAsChild:!0});/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Er=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m14.31 8 5.74 9.94",key:"1y6ab4"}],["path",{d:"M9.69 8h11.48",key:"1wxppr"}],["path",{d:"m7.38 12 5.74-9.94",key:"1grp0k"}],["path",{d:"M9.69 16 3.95 6.06",key:"libnyf"}],["path",{d:"M14.31 16H2.83",key:"x5fava"}],["path",{d:"m16.62 12-5.74 9.94",key:"1vwawt"}]],Cr=A("aperture",Er);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Rr=[["circle",{cx:"9",cy:"9",r:"7",key:"p2h5vp"}],["circle",{cx:"15",cy:"15",r:"7",key:"19ennj"}]],Tr=A("blend",Rr);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Sr=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["circle",{cx:"12",cy:"12",r:"1",key:"41hilf"}]],Ze=A("circle-dot",Sr);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ar=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]],kr=A("circle",Ar);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ir=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 18a6 6 0 0 0 0-12v12z",key:"j4l70d"}]],wr=A("contrast",Ir);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Dr=[["rect",{width:"12",height:"12",x:"2",y:"10",rx:"2",ry:"2",key:"6agr2n"}],["path",{d:"m17.92 14 3.5-3.5a2.24 2.24 0 0 0 0-3l-5-4.92a2.24 2.24 0 0 0-3 0L10 6",key:"1o487t"}],["path",{d:"M6 18h.01",key:"uhywen"}],["path",{d:"M10 14h.01",key:"ssrbsk"}],["path",{d:"M15 6h.01",key:"cblpky"}],["path",{d:"M18 9h.01",key:"2061c0"}]],Mr=A("dices",Dr);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jr=[["path",{d:"M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z",key:"1ptgy4"}],["path",{d:"M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97",key:"1sl1rz"}]],Pr=A("droplets",jr);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Lr=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 2a7 7 0 1 0 10 10",key:"1yuj32"}]],Ur=A("eclipse",Lr);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Or=[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M12 18v-6",key:"17g6i2"}],["path",{d:"m9 15 3 3 3-3",key:"1npd3o"}]],Nr=A("file-down",Or);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const zr=[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M12 12v6",key:"3ahymv"}],["path",{d:"m15 15-3-3-3 3",key:"15xj92"}]],Fr=A("file-up",zr);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Gr=[["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}],["path",{d:"M3 7V5a2 2 0 0 1 2-2h2",key:"aa7l1z"}],["path",{d:"M17 3h2a2 2 0 0 1 2 2v2",key:"4qcy5o"}],["path",{d:"M21 17v2a2 2 0 0 1-2 2h-2",key:"6vwrx8"}],["path",{d:"M7 21H5a2 2 0 0 1-2-2v-2",key:"ioqczr"}]],Br=A("focus",Gr);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Hr=[["path",{d:"M12 3v18",key:"108xh3"}],["path",{d:"M3 12h18",key:"1i2n21"}],["rect",{x:"3",y:"3",width:"18",height:"18",rx:"2",key:"h1oib"}]],Vr=A("grid-2x2",Hr);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xr=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",key:"afitv7"}],["path",{d:"M3 9h18",key:"1pudct"}],["path",{d:"M3 15h18",key:"5xshup"}],["path",{d:"M9 3v18",key:"fh3hqa"}],["path",{d:"M15 3v18",key:"14nvp0"}]],Wr=A("grid-3x3",Xr);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qr=[["circle",{cx:"9",cy:"12",r:"1",key:"1vctgf"}],["circle",{cx:"9",cy:"5",r:"1",key:"hp0tcf"}],["circle",{cx:"9",cy:"19",r:"1",key:"fkjjf6"}],["circle",{cx:"15",cy:"12",r:"1",key:"1tmaij"}],["circle",{cx:"15",cy:"5",r:"1",key:"19l28e"}],["circle",{cx:"15",cy:"19",r:"1",key:"f4zoj3"}]],bt=A("grip-vertical",qr);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $r=[["path",{d:"M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z",key:"yt0hxn"}]],Yr=A("hexagon",$r);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Kr=[["path",{d:"M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z",key:"zw3jo"}],["path",{d:"M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12",key:"1wduqc"}],["path",{d:"M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17",key:"kqbvx6"}]],Zr=A("layers",Kr);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Qr=[["path",{d:"M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5",key:"1gvzjb"}],["path",{d:"M9 18h6",key:"x1upvd"}],["path",{d:"M10 22h4",key:"ceow96"}]],Jr=A("lightbulb",Qr);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const eo=[["path",{d:"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71",key:"1cjeqo"}],["path",{d:"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71",key:"19qd67"}]],to=A("link",eo);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ro=[["path",{d:"M8 3H5a2 2 0 0 0-2 2v3",key:"1dcmit"}],["path",{d:"M21 8V5a2 2 0 0 0-2-2h-3",key:"1e4gt3"}],["path",{d:"M3 16v3a2 2 0 0 0 2 2h3",key:"wsl5sc"}],["path",{d:"M16 21h3a2 2 0 0 0 2-2v-3",key:"18trek"}]],_t=A("maximize",ro);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const oo=[["rect",{width:"20",height:"14",x:"2",y:"3",rx:"2",key:"48i651"}],["line",{x1:"8",x2:"16",y1:"21",y2:"21",key:"1svkeh"}],["line",{x1:"12",x2:"12",y1:"17",y2:"21",key:"vw1qmm"}]],io=A("monitor",oo);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const no=[["path",{d:"M12 2v20",key:"t6zp3m"}],["path",{d:"m15 19-3 3-3-3",key:"11eu04"}],["path",{d:"m19 9 3 3-3 3",key:"1mg7y2"}],["path",{d:"M2 12h20",key:"9i4pu4"}],["path",{d:"m5 9-3 3 3 3",key:"j64kie"}],["path",{d:"m9 5 3-3 3 3",key:"l8vdw6"}]],ao=A("move",no);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const so=[["path",{d:"m14.622 17.897-10.68-2.913",key:"vj2p1u"}],["path",{d:"M18.376 2.622a1 1 0 1 1 3.002 3.002L17.36 9.643a.5.5 0 0 0 0 .707l.944.944a2.41 2.41 0 0 1 0 3.408l-.944.944a.5.5 0 0 1-.707 0L8.354 7.348a.5.5 0 0 1 0-.707l.944-.944a2.41 2.41 0 0 1 3.408 0l.944.944a.5.5 0 0 0 .707 0z",key:"18tc5c"}],["path",{d:"M9 8c-1.804 2.71-3.97 3.46-6.583 3.948a.507.507 0 0 0-.302.819l7.32 8.883a1 1 0 0 0 1.185.204C12.735 20.405 16 16.792 16 15",key:"ytzfxy"}]],lo=A("paintbrush",so);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const co=[["rect",{x:"14",y:"3",width:"5",height:"18",rx:"1",key:"kaeet6"}],["rect",{x:"5",y:"3",width:"5",height:"18",rx:"1",key:"1wsw3u"}]],uo=A("pause",co);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fo=[["path",{d:"M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",key:"10ikf1"}]],mo=A("play",fo);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ho=[["path",{d:"M3 7V5a2 2 0 0 1 2-2h2",key:"aa7l1z"}],["path",{d:"M17 3h2a2 2 0 0 1 2 2v2",key:"4qcy5o"}],["path",{d:"M21 17v2a2 2 0 0 1-2 2h-2",key:"6vwrx8"}],["path",{d:"M7 21H5a2 2 0 0 1-2-2v-2",key:"ioqczr"}],["path",{d:"M7 12h10",key:"b7w52i"}]],go=A("scan-line",ho);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const po=[["path",{d:"m18 14 4 4-4 4",key:"10pe0f"}],["path",{d:"m18 2 4 4-4 4",key:"pucp1d"}],["path",{d:"M2 18h1.973a4 4 0 0 0 3.3-1.7l5.454-8.6a4 4 0 0 1 3.3-1.7H22",key:"1ailkh"}],["path",{d:"M2 6h1.972a4 4 0 0 1 3.6 2.2",key:"km57vx"}],["path",{d:"M22 18h-6.041a4 4 0 0 1-3.3-1.8l-.359-.45",key:"os18l9"}]],vo=A("shuffle",po);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xo=[["line",{x1:"4",x2:"4",y1:"21",y2:"14",key:"1p332r"}],["line",{x1:"4",x2:"4",y1:"10",y2:"3",key:"gb41h5"}],["line",{x1:"12",x2:"12",y1:"21",y2:"12",key:"hf2csr"}],["line",{x1:"12",x2:"12",y1:"8",y2:"3",key:"1kfi7u"}],["line",{x1:"20",x2:"20",y1:"21",y2:"16",key:"1lhrwl"}],["line",{x1:"20",x2:"20",y1:"12",y2:"3",key:"16vvfq"}],["line",{x1:"2",x2:"6",y1:"14",y2:"14",key:"1uebub"}],["line",{x1:"10",x2:"14",y1:"8",y2:"8",key:"1yglbp"}],["line",{x1:"18",x2:"22",y1:"16",y2:"16",key:"1jxqpz"}]],yt=A("sliders-vertical",xo);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bo=[["path",{d:"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",key:"1s2grr"}]],_o=A("sparkle",bo);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yo=[["path",{d:"M8 19H5c-1 0-2-1-2-2V7c0-1 1-2 2-2h3",key:"lubmu8"}],["path",{d:"M16 5h3c1 0 2 1 2 2v10c0 1-1 2-2 2h-3",key:"1ag34g"}],["line",{x1:"12",x2:"12",y1:"4",y2:"20",key:"1tx1rr"}]],Eo=A("square-split-horizontal",yo);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Co=[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 4h.01",key:"1ujb9j"}],["path",{d:"M20 12h.01",key:"1ykeid"}],["path",{d:"M12 20h.01",key:"zekei9"}],["path",{d:"M4 12h.01",key:"158zrr"}],["path",{d:"M17.657 6.343h.01",key:"31pqzk"}],["path",{d:"M17.657 17.657h.01",key:"jehnf4"}],["path",{d:"M6.343 17.657h.01",key:"gdk6ow"}],["path",{d:"M6.343 6.343h.01",key:"1uurf0"}]],Ro=A("sun-dim",Co);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const To=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["circle",{cx:"12",cy:"12",r:"6",key:"1vlfrh"}],["circle",{cx:"12",cy:"12",r:"2",key:"1c9p78"}]],So=A("target",To);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ao=[["path",{d:"M12 4v16",key:"1654pz"}],["path",{d:"M4 7V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2",key:"e0r10z"}],["path",{d:"M9 20h6",key:"s66wpe"}]],ko=A("type",Ao);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Io=[["path",{d:"M12 3v12",key:"1x0j5s"}],["path",{d:"m17 8-5-5-5 5",key:"7q97r8"}],["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}]],Xe=A("upload",Io);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wo=[["path",{d:"m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72",key:"ul74o6"}],["path",{d:"m14 7 3 3",key:"1r5n42"}],["path",{d:"M5 6v4",key:"ilb8ba"}],["path",{d:"M19 14v4",key:"blhpug"}],["path",{d:"M10 2v2",key:"7u0qdc"}],["path",{d:"M7 8H3",key:"zfb6yr"}],["path",{d:"M21 16h-4",key:"1cnmox"}],["path",{d:"M11 3H9",key:"1obp7u"}]],Qe=A("wand-sparkles",wo);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Do=[["path",{d:"M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1",key:"knzxuh"}],["path",{d:"M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1",key:"2jd2cc"}],["path",{d:"M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1",key:"rd2r6e"}]],Mo=A("waves",Do);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jo=[["path",{d:"M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",key:"1xq2db"}]],Po=A("zap",jo);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Lo=[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["line",{x1:"21",x2:"16.65",y1:"21",y2:"16.65",key:"13gj7c"}],["line",{x1:"11",x2:"11",y1:"8",y2:"14",key:"1vmskp"}],["line",{x1:"8",x2:"14",y1:"11",y2:"11",key:"durymu"}]],Uo=A("zoom-in",Lo);/**
 * @license lucide-react v0.542.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Oo=[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["line",{x1:"21",x2:"16.65",y1:"21",y2:"16.65",key:"13gj7c"}],["line",{x1:"8",x2:"14",y1:"11",y2:"11",key:"durymu"}]],No=A("zoom-out",Oo),H=mr({placement:"bottom-end",pauseOnPageIdle:!0}),l={NOISE:"noise",DITHER:"dither",HALFTONE:"halftone",ASCII:"ascii",OVERLAY:"overlay",CHROMATIC:"chromatic",VIGNETTE:"vignette",SCANLINES:"scanlines",PIXELATE:"pixelate",BLUR:"blur",DISTORTION:"distortion",POSTERIZE:"posterize",EDGE:"edge",GRAIN:"grain",COLOR_GRADE:"color-grade",GLITCH:"glitch",CRT:"crt",DUOTONE:"duotone",KUWAHARA:"kuwahara",BARREL:"barrel",RIPPLE:"ripple",DISPLACEMENT:"displacement",LIGHT_LEAK:"light-leak",BLOOM:"bloom",RADIAL_BLUR:"radial-blur",MOSAIC:"mosaic",TILT_SHIFT:"tilt-shift",EXPOSURE:"exposure",VIBRANCE:"vibrance",DOT_DITHER:"dot-dither"},O={OVERLAY:"overlay",SOFT_LIGHT:"soft-light",MULTIPLY:"multiply",SCREEN:"screen"},ue={BAYER_2X2:"bayer2x2",BAYER_4X4:"bayer4x4",BAYER_8X8:"bayer8x8"},Ee={STANDARD:" .:-=+*#%@",BLOCKS:" ░▒▓█",SIMPLE:" .-+*#",DETAILED:" .':;!ilI1%@#"},se={PAPER:"paper",FILM_GRAIN:"film-grain",CANVAS:"canvas",DUST:"dust",CUSTOM:"custom"},Be={intensity:.15,scale:1,monochrome:!0,blendMode:O.OVERLAY},Et={method:ue.BAYER_4X4,levels:4,threshold:.5,scale:1},xe={CIRCLE:"circle",SQUARE:"square",DIAMOND:"diamond",LINE:"line",ELLIPSE:"ellipse",CROSS:"cross",RING:"ring"},He={gridSize:8,dotScale:1,angle:45,shape:xe.CIRCLE,softness:.5,contrast:0,invert:!1,colorMode:"original",dotColor:"#000000",backgroundColor:"#ffffff",mixOriginal:0},zo={charset:Ee.STANDARD,cellSize:8,color:!0,invert:!1,brightness:1,contrast:1,gamma:1,charBrightness:1,charColor:"#ffffff",backgroundColor:"#000000",backgroundBlend:1,edgeEnhance:0,cellGap:0},Ct={texture:se.PAPER,intensity:.3,scale:1,rotation:0,blendMode:O.OVERLAY,customTextureUrl:null},Ne={intensity:.008,angle:0,radial:!0},je={intensity:.5,size:.5,softness:.5,color:"#000000"},Rt={spacing:4,thickness:1,opacity:.3,horizontal:!0,offset:0},Tt={size:8,maintainAspect:!0},Fo={radius:3,type:"gaussian",angle:0},Go={type:"wave",amplitude:5,frequency:5,centerX:.5,centerY:.5},Ve={levels:4,preserveHue:!1},Bo={strength:1,threshold:.05,invert:!1,colorize:!1},ze={intensity:.15,size:1.5,luminanceResponse:.5,colored:!1},Fe={brightness:0,contrast:0,saturation:0,temperature:0,tint:0,shadows:"#000000",highlights:"#ffffff",shadowInfluence:0,highlightInfluence:0},St={intensity:.5,sliceCount:10,rgbShift:.02,angle:0,seed:0,blockSize:.1,colorShift:!0},At={curvature:.3,scanlineIntensity:.3,scanlineCount:400,vignetteIntensity:.3,brightness:1.1,rgbOffset:.002,flickerIntensity:.03,staticNoise:.05},Ho={shadowColor:"#1a0533",highlightColor:"#f5c542",contrast:1,intensity:1},kt={radius:4,sharpness:.5},Vo={amount:.3,centerX:.5,centerY:.5,zoom:1},Xo={amplitude:.02,wavelength:50,speed:1,centerX:.5,centerY:.5,damping:.5},Wo={scaleX:.05,scaleY:.05,useRedGreen:!0,customMapUrl:null},qo={color1:"#ff6b35",color2:"#f7931e",position:.3,angle:45,size:.6,intensity:.6,softness:.8,blendMode:O.SCREEN},It={radius:6,intensity:.8,threshold:.5,softThreshold:.5,blendMode:O.SCREEN},$o={intensity:.3,centerX:.5,centerY:.5,samples:32,zoom:!0},Yo={cellSize:20,irregularity:.5,edgeThickness:.04,edgeColor:"#1a1a1a",colorVariation:.05},Ko={focusPosition:.5,focusWidth:.2,blurRadius:8,angle:0,gradientSmooth:.3},Ae={exposure:0,highlights:0,shadows:0,blacks:0,whites:0},Pe={vibrance:.3,saturation:0},Zo={scale:1,threshold:.5,animated:!1,animationSpeed:1,invert:!1},De=r=>{const e=`${r}-${Date.now()}-${Math.random().toString(36).substr(2,9)}`;switch(r){case l.NOISE:return{id:e,type:r,enabled:!0,params:{...Be}};case l.DITHER:return{id:e,type:r,enabled:!0,params:{...Et}};case l.HALFTONE:return{id:e,type:r,enabled:!0,params:{...He}};case l.ASCII:return{id:e,type:r,enabled:!0,params:{...zo}};case l.OVERLAY:return{id:e,type:r,enabled:!0,params:{...Ct}};case l.CHROMATIC:return{id:e,type:r,enabled:!0,params:{...Ne}};case l.VIGNETTE:return{id:e,type:r,enabled:!0,params:{...je}};case l.SCANLINES:return{id:e,type:r,enabled:!0,params:{...Rt}};case l.PIXELATE:return{id:e,type:r,enabled:!0,params:{...Tt}};case l.BLUR:return{id:e,type:r,enabled:!0,params:{...Fo}};case l.DISTORTION:return{id:e,type:r,enabled:!0,params:{...Go}};case l.POSTERIZE:return{id:e,type:r,enabled:!0,params:{...Ve}};case l.EDGE:return{id:e,type:r,enabled:!0,params:{...Bo}};case l.GRAIN:return{id:e,type:r,enabled:!0,params:{...ze}};case l.COLOR_GRADE:return{id:e,type:r,enabled:!0,params:{...Fe}};case l.GLITCH:return{id:e,type:r,enabled:!0,params:{...St}};case l.CRT:return{id:e,type:r,enabled:!0,params:{...At}};case l.DUOTONE:return{id:e,type:r,enabled:!0,params:{...Ho}};case l.KUWAHARA:return{id:e,type:r,enabled:!0,params:{...kt}};case l.BARREL:return{id:e,type:r,enabled:!0,params:{...Vo}};case l.RIPPLE:return{id:e,type:r,enabled:!0,params:{...Xo}};case l.DISPLACEMENT:return{id:e,type:r,enabled:!0,params:{...Wo}};case l.LIGHT_LEAK:return{id:e,type:r,enabled:!0,params:{...qo}};case l.BLOOM:return{id:e,type:r,enabled:!0,params:{...It}};case l.RADIAL_BLUR:return{id:e,type:r,enabled:!0,params:{...$o}};case l.MOSAIC:return{id:e,type:r,enabled:!0,params:{...Yo}};case l.TILT_SHIFT:return{id:e,type:r,enabled:!0,params:{...Ko}};case l.EXPOSURE:return{id:e,type:r,enabled:!0,params:{...Ae}};case l.VIBRANCE:return{id:e,type:r,enabled:!0,params:{...Pe}};case l.DOT_DITHER:return{id:e,type:r,enabled:!0,params:{...Zo}};default:throw new Error(`Unknown effect type: ${r}`)}},wt={"analog-film":{name:"Analog Film",effects:[{type:l.EXPOSURE,enabled:!0,params:{...Ae,exposure:.05,highlights:-.15,shadows:.15,blacks:.05}},{type:l.COLOR_GRADE,enabled:!0,params:{...Fe,saturation:-.15,temperature:.08,contrast:-.05}},{type:l.GRAIN,enabled:!0,params:{...ze,intensity:.14,size:1.5}},{type:l.VIGNETTE,enabled:!0,params:{...je,intensity:.3,size:.55,softness:.9}}]},"film-noir":{name:"Film Noir",effects:[{type:l.EXPOSURE,enabled:!0,params:{...Ae,exposure:-.1,highlights:-.25,shadows:-.2,blacks:-.1,whites:.15}},{type:l.COLOR_GRADE,enabled:!0,params:{...Fe,saturation:-1,contrast:.35}},{type:l.GRAIN,enabled:!0,params:{...ze,intensity:.1,size:1.3}},{type:l.VIGNETTE,enabled:!0,params:{...je,intensity:.65,size:.4,softness:.85}}]},"lo-fi":{name:"Lo-Fi",effects:[{type:l.VIBRANCE,enabled:!0,params:{...Pe,vibrance:-.3,saturation:-.2}},{type:l.DITHER,enabled:!0,params:{...Et,method:ue.BAYER_4X4,levels:3,threshold:.6,scale:2}},{type:l.NOISE,enabled:!0,params:{...Be,intensity:.1,monochrome:!0}},{type:l.VIGNETTE,enabled:!0,params:{...je,intensity:.45,size:.4,softness:.65}}]},newsprint:{name:"Newsprint",effects:[{type:l.COLOR_GRADE,enabled:!0,params:{...Fe,saturation:-.85,temperature:.08}},{type:l.HALFTONE,enabled:!0,params:{...He,gridSize:5,colorMode:"monochrome",angle:45,contrast:.15,softness:.3,dotColor:"#1a1a1a",backgroundColor:"#f0ece4"}},{type:l.NOISE,enabled:!0,params:{...Be,intensity:.05,monochrome:!0,blendMode:O.OVERLAY}}]},"retro-crt":{name:"Retro CRT",effects:[{type:l.CRT,enabled:!0,params:{...At,curvature:.3,scanlineIntensity:.3,scanlineCount:300,vignetteIntensity:.4,rgbOffset:.002}},{type:l.CHROMATIC,enabled:!0,params:{...Ne,intensity:.003,radial:!0}}]},glitch:{name:"Glitch",effects:[{type:l.GLITCH,enabled:!0,params:{...St,intensity:.35,sliceCount:18,rgbShift:.015,colorShift:!0}},{type:l.CHROMATIC,enabled:!0,params:{...Ne,intensity:.01,angle:0}},{type:l.SCANLINES,enabled:!0,params:{...Rt,spacing:5,thickness:2,opacity:.12}}]},dreamy:{name:"Dreamy",effects:[{type:l.BLOOM,enabled:!0,params:{...It,radius:6,intensity:1.2,threshold:.4,softThreshold:.6}},{type:l.EXPOSURE,enabled:!0,params:{...Ae,exposure:.15,highlights:.2,shadows:.1}},{type:l.VIGNETTE,enabled:!0,params:{...je,intensity:.3,size:.5,softness:.9}}]},risograph:{name:"Risograph",effects:[{type:l.VIBRANCE,enabled:!0,params:{...Pe,vibrance:.25,saturation:.1}},{type:l.POSTERIZE,enabled:!0,params:{...Ve,levels:6}},{type:l.HALFTONE,enabled:!0,params:{...He,gridSize:4,colorMode:"original",shape:"circle",softness:.4,dotScale:.9}},{type:l.CHROMATIC,enabled:!0,params:{...Ne,intensity:.003}},{type:l.OVERLAY,enabled:!0,params:{...Ct,texture:se.PAPER,intensity:.12}},{type:l.GRAIN,enabled:!0,params:{...ze,intensity:.05,size:1.2}}]},"pixel-art":{name:"Pixel Art",effects:[{type:l.PIXELATE,enabled:!0,params:{...Tt,size:8}},{type:l.POSTERIZE,enabled:!0,params:{...Ve,levels:10}},{type:l.VIBRANCE,enabled:!0,params:{...Pe,vibrance:.35,saturation:.15}},{type:l.EXPOSURE,enabled:!0,params:{...Ae,contrast:.12}}]},"oil-paint":{name:"Oil Paint",effects:[{type:l.KUWAHARA,enabled:!0,params:{...kt,radius:4}},{type:l.VIBRANCE,enabled:!0,params:{...Pe,vibrance:.3,saturation:.1}},{type:l.EXPOSURE,enabled:!0,params:{...Ae,contrast:.15}}]}},Qo=()=>({image:null,imageUrl:null,video:null,videoUrl:null,mediaType:null,corsError:!1,isPlaying:!1,currentTime:0,duration:0,effects:[],seed:Math.floor(Math.random()*1e5),previewQuality:"draft",viewMode:"preview",exportFormat:"png",exportQuality:.92,exportScale:1,isExporting:!1,exportProgress:0,exportStatus:""}),Jo=[1,2,4],ei=({children:r,collapsible:e,isOpen:t,onToggle:a})=>i.jsxs(T,{align:"center",justify:"space-between",cursor:e?"pointer":"default",onClick:e?a:void 0,mb:3,children:[i.jsx(w,{fontSize:"11px",color:"var(--text-muted)",fontWeight:600,textTransform:"uppercase",letterSpacing:"0.5px",children:r}),e&&i.jsx(j,{as:t?ke:Le,boxSize:4,color:"var(--text-muted)"})]}),Dt={[l.NOISE]:nr,[l.DITHER]:Wr,[l.HALFTONE]:kr,[l.ASCII]:ko,[l.OVERLAY]:Zr,[l.CHROMATIC]:Cr,[l.VIGNETTE]:Ur,[l.SCANLINES]:go,[l.PIXELATE]:Vr,[l.BLUR]:Pr,[l.DISTORTION]:Mo,[l.POSTERIZE]:Ke,[l.EDGE]:Br,[l.GRAIN]:Tr,[l.COLOR_GRADE]:yt,[l.GLITCH]:Po,[l.CRT]:io,[l.DUOTONE]:wr,[l.KUWAHARA]:lo,[l.BARREL]:_t,[l.RIPPLE]:Ze,[l.DISPLACEMENT]:ao,[l.LIGHT_LEAK]:Zt,[l.BLOOM]:_o,[l.RADIAL_BLUR]:So,[l.MOSAIC]:Yr,[l.TILT_SHIFT]:Ro,[l.EXPOSURE]:Jr,[l.VIBRANCE]:Ke,[l.DOT_DITHER]:Ze},Mt={[l.NOISE]:"Grain",[l.DITHER]:"Dithering",[l.HALFTONE]:"Halftone",[l.ASCII]:"ASCII",[l.OVERLAY]:"Texture Overlay",[l.CHROMATIC]:"Chr. Aberration",[l.VIGNETTE]:"Vignette",[l.SCANLINES]:"Scan Lines",[l.PIXELATE]:"Pixelate",[l.BLUR]:"Blur",[l.DISTORTION]:"Distortion",[l.POSTERIZE]:"Posterize",[l.EDGE]:"Edge Detection",[l.GRAIN]:"Film Grain",[l.COLOR_GRADE]:"Color Grading",[l.GLITCH]:"Glitch Split",[l.CRT]:"CRT Monitor",[l.DUOTONE]:"Duotone",[l.KUWAHARA]:"Oil Paint",[l.BARREL]:"Barrel Distortion",[l.RIPPLE]:"Ripple",[l.DISPLACEMENT]:"Displacement",[l.LIGHT_LEAK]:"Light Leak",[l.BLOOM]:"Bloom",[l.RADIAL_BLUR]:"Zoom Blur",[l.MOSAIC]:"Stained Glass",[l.TILT_SHIFT]:"Tilt Shift",[l.EXPOSURE]:"Exposure",[l.VIBRANCE]:"Vibrance",[l.DOT_DITHER]:"Dot Dither"},Se=({icon:r,label:e,onClick:t,flex:a,disabled:s,title:c,...n})=>i.jsxs(T,{as:"button",type:"button",align:"center",justify:"center",gap:1.5,px:e?3:2,py:2,bg:"var(--bg-elevated)",border:"1px solid var(--border-primary)",borderRadius:"var(--radius-sm)",cursor:s?"not-allowed":"pointer",opacity:s?.5:1,onClick:s?void 0:t,transition:"all 0.15s",_hover:s?{}:{bg:"rgba(168, 85, 247, 0.1)",borderColor:"var(--color-primary)"},flex:a,title:c,...n,children:[i.jsx(j,{as:r,boxSize:3.5,color:"var(--text-muted)"}),e&&i.jsx(w,{fontSize:"11px",color:"var(--text-primary)",fontWeight:500,children:e})]}),ti=({params:r,onChange:e})=>i.jsxs(i.Fragment,{children:[i.jsx(m,{title:"Intensity",value:r.intensity,onChange:t=>e({...r,intensity:t}),min:0,max:1,step:.01}),i.jsx(m,{title:"Scale",value:r.scale,onChange:t=>e({...r,scale:t}),min:.5,max:4,step:.1}),i.jsx(J,{title:"Monochrome",isChecked:r.monochrome,onChange:t=>e({...r,monochrome:t})}),i.jsx(te,{title:"Blend Mode",value:r.blendMode,onChange:t=>e({...r,blendMode:t}),options:[{value:O.OVERLAY,label:"Overlay"},{value:O.SOFT_LIGHT,label:"Soft Light"},{value:O.MULTIPLY,label:"Multiply"},{value:O.SCREEN,label:"Screen"}]})]}),ri=({params:r,onChange:e})=>i.jsxs(i.Fragment,{children:[i.jsx(te,{title:"Method",value:r.method,onChange:t=>e({...r,method:t}),options:[{value:ue.BAYER_2X2,label:"Bayer 2×2"},{value:ue.BAYER_4X4,label:"Bayer 4×4"},{value:ue.BAYER_8X8,label:"Bayer 8×8"}]}),i.jsx(m,{title:"Color Levels",value:r.levels,onChange:t=>e({...r,levels:t}),min:2,max:16,step:1}),i.jsx(m,{title:"Threshold",value:r.threshold,onChange:t=>e({...r,threshold:t}),min:0,max:2,step:.05}),i.jsx(m,{title:"Pattern Scale",value:r.scale||1,onChange:t=>e({...r,scale:t}),min:.5,max:4,step:.1,valueUnit:"×"})]}),oi=({params:r,onChange:e})=>i.jsxs(i.Fragment,{children:[i.jsx(m,{title:"Grid Size",value:r.gridSize,onChange:t=>e({...r,gridSize:t}),min:3,max:40,step:1,valueUnit:"px"}),i.jsx(m,{title:"Dot Scale",value:r.dotScale,onChange:t=>e({...r,dotScale:t}),min:.2,max:2,step:.05}),i.jsx(m,{title:"Angle",value:r.angle,onChange:t=>e({...r,angle:t}),min:0,max:90,step:1,valueUnit:"°"}),i.jsx(te,{title:"Shape",value:r.shape,onChange:t=>e({...r,shape:t}),options:[{value:xe.CIRCLE,label:"Circle"},{value:xe.SQUARE,label:"Square"},{value:xe.DIAMOND,label:"Diamond"},{value:xe.ELLIPSE,label:"Ellipse"},{value:xe.LINE,label:"Line"},{value:xe.CROSS,label:"Cross"},{value:xe.RING,label:"Ring"}]}),i.jsx(m,{title:"Softness",value:r.softness,onChange:t=>e({...r,softness:t}),min:0,max:1,step:.05}),i.jsx(m,{title:"Contrast",value:r.contrast,onChange:t=>e({...r,contrast:t}),min:-1,max:1,step:.05}),i.jsx(te,{title:"Color Mode",value:r.colorMode,onChange:t=>e({...r,colorMode:t}),options:[{value:"original",label:"Original Colors"},{value:"monochrome",label:"Monochrome"},{value:"duotone",label:"Duotone"},{value:"cmyk",label:"CMYK"}]}),(r.colorMode==="monochrome"||r.colorMode==="duotone")&&i.jsxs(i.Fragment,{children:[i.jsx(ie,{title:"Dot Color",color:r.dotColor,onChange:t=>e({...r,dotColor:t})}),i.jsx(ie,{title:"Background",color:r.backgroundColor,onChange:t=>e({...r,backgroundColor:t})})]}),i.jsx(J,{title:"Invert",isChecked:r.invert,onChange:t=>e({...r,invert:t})}),i.jsx(m,{title:"Mix Original",value:r.mixOriginal,onChange:t=>e({...r,mixOriginal:t}),min:0,max:1,step:.05})]}),ii=({params:r,onChange:e})=>i.jsxs(i.Fragment,{children:[i.jsx(te,{title:"Character Set",value:r.charset,onChange:t=>e({...r,charset:t}),options:[{value:Ee.STANDARD,label:"Standard"},{value:Ee.BLOCKS,label:"Block Elements"},{value:Ee.SIMPLE,label:"Simple"},{value:Ee.DETAILED,label:"Detailed"}]}),i.jsx(m,{title:"Cell Size",value:r.cellSize,onChange:t=>e({...r,cellSize:t}),min:4,max:20,step:1,valueUnit:"px"}),i.jsx(m,{title:"Brightness",value:r.brightness??1,onChange:t=>e({...r,brightness:t}),min:.5,max:2,step:.05}),i.jsx(m,{title:"Contrast",value:r.contrast??1,onChange:t=>e({...r,contrast:t}),min:.5,max:2,step:.05}),i.jsx(m,{title:"Gamma",value:r.gamma??1,onChange:t=>e({...r,gamma:t}),min:.2,max:3,step:.05}),i.jsx(m,{title:"Character Brightness",value:r.charBrightness??1,onChange:t=>e({...r,charBrightness:t}),min:.5,max:3,step:.1}),i.jsx(J,{title:"Color Output",isChecked:r.color,onChange:t=>e({...r,color:t})}),!r.color&&i.jsx(ie,{title:"Character Color",color:r.charColor||"#ffffff",onChange:t=>e({...r,charColor:t})}),i.jsx(ie,{title:"Background Color",color:r.backgroundColor||"#000000",onChange:t=>e({...r,backgroundColor:t})}),i.jsx(m,{title:"Background Blend",value:r.backgroundBlend??1,onChange:t=>e({...r,backgroundBlend:t}),min:0,max:1,step:.05}),i.jsx(m,{title:"Cell Gap",value:r.cellGap??0,onChange:t=>e({...r,cellGap:t}),min:0,max:.5,step:.01}),i.jsx(m,{title:"Edge Enhance",value:r.edgeEnhance??0,onChange:t=>e({...r,edgeEnhance:t}),min:0,max:1,step:.05}),i.jsx(J,{title:"Invert Brightness",isChecked:r.invert||!1,onChange:t=>e({...r,invert:t})})]}),ni=({params:r,onChange:e})=>{const t=g.useRef(null),a=g.useCallback(s=>{var n;const c=(n=s.target.files)==null?void 0:n[0];if(c){r.customTextureUrl&&r.customTextureUrl.startsWith("blob:")&&URL.revokeObjectURL(r.customTextureUrl);const o=URL.createObjectURL(c);e({...r,texture:se.CUSTOM,customTextureUrl:o})}s.target.value=""},[r,e]);return i.jsxs(i.Fragment,{children:[i.jsx(te,{title:"Texture",value:r.texture,onChange:s=>e({...r,texture:s}),options:[{value:se.PAPER,label:"Paper"},{value:se.FILM_GRAIN,label:"Film Grain"},{value:se.CANVAS,label:"Canvas"},{value:se.DUST,label:"Dust & Scratches"},{value:se.CUSTOM,label:"Custom Upload"}]}),r.texture===se.CUSTOM&&i.jsxs(i.Fragment,{children:[i.jsx("input",{type:"file",ref:t,onChange:a,accept:"image/png,image/jpeg,image/webp",style:{display:"none"}}),i.jsx(T,{as:"button",type:"button",direction:"column",align:"center",justify:"center",gap:2,p:3,bg:r.customTextureUrl?"transparent":"var(--bg-elevated)",border:"1px dashed var(--color-primary)",borderRadius:"var(--radius-sm)",cursor:"pointer",onClick:()=>{var s;return(s=t.current)==null?void 0:s.click()},transition:"all 0.15s",_hover:{bg:"rgba(168, 85, 247, 0.1)"},position:"relative",overflow:"hidden",minH:"60px",children:r.customTextureUrl?i.jsxs(i.Fragment,{children:[i.jsx(I,{as:"img",src:r.customTextureUrl,position:"absolute",top:0,left:0,w:"100%",h:"100%",objectFit:"cover",opacity:.5}),i.jsx(w,{fontSize:"11px",color:"var(--color-primary)",fontWeight:500,zIndex:1,children:"Click to change texture"})]}):i.jsxs(i.Fragment,{children:[i.jsx(j,{as:Xe,boxSize:4,color:"#ffffff"}),i.jsx(w,{fontSize:"11px",color:"#ffffff",fontWeight:500,children:"Upload custom texture"})]})})]}),i.jsx(m,{title:"Intensity",value:r.intensity,onChange:s=>e({...r,intensity:s}),min:0,max:1,step:.01}),i.jsx(m,{title:"Scale",value:r.scale,onChange:s=>e({...r,scale:s}),min:.25,max:4,step:.05}),i.jsx(m,{title:"Rotation",value:r.rotation,onChange:s=>e({...r,rotation:s}),min:0,max:360,step:1,valueUnit:"°"}),i.jsx(te,{title:"Blend Mode",value:r.blendMode,onChange:s=>e({...r,blendMode:s}),options:[{value:O.OVERLAY,label:"Overlay"},{value:O.SOFT_LIGHT,label:"Soft Light"},{value:O.MULTIPLY,label:"Multiply"},{value:O.SCREEN,label:"Screen"}]})]})},ai=({params:r,onChange:e})=>i.jsxs(i.Fragment,{children:[i.jsx(m,{title:"Intensity",value:r.intensity,onChange:t=>e({...r,intensity:t}),min:0,max:.05,step:.001}),i.jsx(m,{title:"Angle",value:r.angle,onChange:t=>e({...r,angle:t}),min:0,max:360,step:1,valueUnit:"°"}),i.jsx(J,{title:"Radial",isChecked:r.radial,onChange:t=>e({...r,radial:t})})]}),si=({params:r,onChange:e})=>i.jsxs(i.Fragment,{children:[i.jsx(m,{title:"Intensity",value:r.intensity,onChange:t=>e({...r,intensity:t}),min:0,max:1,step:.01}),i.jsx(m,{title:"Size",value:r.size,onChange:t=>e({...r,size:t}),min:.1,max:1,step:.01}),i.jsx(m,{title:"Softness",value:r.softness,onChange:t=>e({...r,softness:t}),min:0,max:1,step:.01}),i.jsx(ie,{title:"Color",color:r.color,onChange:t=>e({...r,color:t})})]}),li=({params:r,onChange:e})=>i.jsxs(i.Fragment,{children:[i.jsx(m,{title:"Spacing",value:r.spacing,onChange:t=>e({...r,spacing:t}),min:2,max:20,step:1,valueUnit:"px"}),i.jsx(m,{title:"Thickness",value:r.thickness,onChange:t=>e({...r,thickness:t}),min:1,max:10,step:.5,valueUnit:"px"}),i.jsx(m,{title:"Opacity",value:r.opacity,onChange:t=>e({...r,opacity:t}),min:0,max:1,step:.01}),i.jsx(m,{title:"Offset",value:r.offset,onChange:t=>e({...r,offset:t}),min:0,max:20,step:.5,valueUnit:"px"}),i.jsx(J,{title:"Horizontal",isChecked:r.horizontal,onChange:t=>e({...r,horizontal:t})})]}),ci=({params:r,onChange:e})=>i.jsxs(i.Fragment,{children:[i.jsx(m,{title:"Pixel Size",value:r.size,onChange:t=>e({...r,size:t}),min:2,max:64,step:1,valueUnit:"px"}),i.jsx(J,{title:"Maintain Aspect",isChecked:r.maintainAspect,onChange:t=>e({...r,maintainAspect:t})})]}),ui=({params:r,onChange:e})=>i.jsxs(i.Fragment,{children:[i.jsx(te,{title:"Type",value:r.type,onChange:t=>e({...r,type:t}),options:[{value:"gaussian",label:"Gaussian"},{value:"radial",label:"Radial"},{value:"motion",label:"Motion"}]}),i.jsx(m,{title:"Radius",value:r.radius,onChange:t=>e({...r,radius:t}),min:0,max:7,step:.1}),r.type==="motion"&&i.jsx(m,{title:"Angle",value:r.angle,onChange:t=>e({...r,angle:t}),min:0,max:360,step:1,valueUnit:"°"})]}),di=({params:r,onChange:e})=>i.jsxs(i.Fragment,{children:[i.jsx(te,{title:"Type",value:r.type,onChange:t=>e({...r,type:t}),options:[{value:"wave",label:"Wave"},{value:"swirl",label:"Swirl"},{value:"bulge",label:"Bulge"}]}),i.jsx(m,{title:"Amplitude",value:r.amplitude,onChange:t=>e({...r,amplitude:t}),min:0,max:50,step:1}),i.jsx(m,{title:"Frequency",value:r.frequency,onChange:t=>e({...r,frequency:t}),min:1,max:20,step:.5}),(r.type==="swirl"||r.type==="bulge")&&i.jsxs(i.Fragment,{children:[i.jsx(m,{title:"Center X",value:r.centerX,onChange:t=>e({...r,centerX:t}),min:0,max:1,step:.01}),i.jsx(m,{title:"Center Y",value:r.centerY,onChange:t=>e({...r,centerY:t}),min:0,max:1,step:.01})]})]}),fi=({params:r,onChange:e})=>i.jsxs(i.Fragment,{children:[i.jsx(m,{title:"Levels",value:r.levels,onChange:t=>e({...r,levels:t}),min:2,max:16,step:1}),i.jsx(J,{title:"Preserve Hue",isChecked:r.preserveHue,onChange:t=>e({...r,preserveHue:t})})]}),mi=({params:r,onChange:e})=>i.jsxs(i.Fragment,{children:[i.jsx(m,{title:"Strength",value:r.strength,onChange:t=>e({...r,strength:t}),min:0,max:3,step:.1}),i.jsx(m,{title:"Threshold",value:r.threshold,onChange:t=>e({...r,threshold:t}),min:0,max:.5,step:.01}),i.jsx(J,{title:"Invert",isChecked:r.invert,onChange:t=>e({...r,invert:t})}),i.jsx(J,{title:"Colorize",isChecked:r.colorize,onChange:t=>e({...r,colorize:t})})]}),hi=({params:r,onChange:e})=>i.jsxs(i.Fragment,{children:[i.jsx(m,{title:"Intensity",value:r.intensity,onChange:t=>e({...r,intensity:t}),min:0,max:.5,step:.01}),i.jsx(m,{title:"Size",value:r.size,onChange:t=>e({...r,size:t}),min:.5,max:5,step:.1}),i.jsx(m,{title:"Luminance Response",value:r.luminanceResponse,onChange:t=>e({...r,luminanceResponse:t}),min:0,max:1,step:.01}),i.jsx(J,{title:"Colored",isChecked:r.colored,onChange:t=>e({...r,colored:t})})]}),gi=({params:r,onChange:e})=>i.jsxs(i.Fragment,{children:[i.jsx(m,{title:"Brightness",value:r.brightness,onChange:t=>e({...r,brightness:t}),min:-.5,max:.5,step:.01}),i.jsx(m,{title:"Contrast",value:r.contrast,onChange:t=>e({...r,contrast:t}),min:-.5,max:.5,step:.01}),i.jsx(m,{title:"Saturation",value:r.saturation,onChange:t=>e({...r,saturation:t}),min:-1,max:1,step:.01}),i.jsx(m,{title:"Temperature",value:r.temperature,onChange:t=>e({...r,temperature:t}),min:-1,max:1,step:.01}),i.jsx(m,{title:"Tint",value:r.tint,onChange:t=>e({...r,tint:t}),min:-1,max:1,step:.01}),i.jsx(ie,{title:"Shadows",color:r.shadows,onChange:t=>e({...r,shadows:t})}),i.jsx(m,{title:"Shadow Influence",value:r.shadowInfluence,onChange:t=>e({...r,shadowInfluence:t}),min:0,max:1,step:.01}),i.jsx(ie,{title:"Highlights",color:r.highlights,onChange:t=>e({...r,highlights:t})}),i.jsx(m,{title:"Highlight Influence",value:r.highlightInfluence,onChange:t=>e({...r,highlightInfluence:t}),min:0,max:1,step:.01})]}),pi=({params:r,onChange:e})=>i.jsxs(i.Fragment,{children:[i.jsx(m,{title:"Intensity",value:r.intensity,onChange:t=>e({...r,intensity:t}),min:0,max:1,step:.01}),i.jsx(m,{title:"Slice Count",value:r.sliceCount,onChange:t=>e({...r,sliceCount:t}),min:2,max:50,step:1}),i.jsx(m,{title:"RGB Shift",value:r.rgbShift,onChange:t=>e({...r,rgbShift:t}),min:0,max:.1,step:.001}),i.jsx(m,{title:"Angle",value:r.angle,onChange:t=>e({...r,angle:t}),min:0,max:360,step:1,valueUnit:"°"}),i.jsx(m,{title:"Block Size",value:r.blockSize,onChange:t=>e({...r,blockSize:t}),min:.02,max:.3,step:.01}),i.jsx(J,{title:"Color Shift",isChecked:r.colorShift,onChange:t=>e({...r,colorShift:t})})]}),vi=({params:r,onChange:e})=>i.jsxs(i.Fragment,{children:[i.jsx(m,{title:"Curvature",value:r.curvature,onChange:t=>e({...r,curvature:t}),min:0,max:1,step:.01}),i.jsx(m,{title:"Scanline Intensity",value:r.scanlineIntensity,onChange:t=>e({...r,scanlineIntensity:t}),min:0,max:1,step:.01}),i.jsx(m,{title:"Scanline Count",value:r.scanlineCount,onChange:t=>e({...r,scanlineCount:t}),min:100,max:800,step:10}),i.jsx(m,{title:"Vignette",value:r.vignetteIntensity,onChange:t=>e({...r,vignetteIntensity:t}),min:0,max:1,step:.01}),i.jsx(m,{title:"Brightness",value:r.brightness,onChange:t=>e({...r,brightness:t}),min:.5,max:1.5,step:.01}),i.jsx(m,{title:"RGB Offset",value:r.rgbOffset,onChange:t=>e({...r,rgbOffset:t}),min:0,max:.01,step:5e-4}),i.jsx(m,{title:"Flicker",value:r.flickerIntensity,onChange:t=>e({...r,flickerIntensity:t}),min:0,max:.2,step:.01}),i.jsx(m,{title:"Static Noise",value:r.staticNoise,onChange:t=>e({...r,staticNoise:t}),min:0,max:.2,step:.01})]}),xi=({params:r,onChange:e})=>i.jsxs(i.Fragment,{children:[i.jsx(ie,{title:"Shadow Color",color:r.shadowColor,onChange:t=>e({...r,shadowColor:t})}),i.jsx(ie,{title:"Highlight Color",color:r.highlightColor,onChange:t=>e({...r,highlightColor:t})}),i.jsx(m,{title:"Contrast",value:r.contrast,onChange:t=>e({...r,contrast:t}),min:.5,max:2,step:.05}),i.jsx(m,{title:"Intensity",value:r.intensity,onChange:t=>e({...r,intensity:t}),min:0,max:1,step:.01})]}),bi=({params:r,onChange:e})=>i.jsxs(i.Fragment,{children:[i.jsx(m,{title:"Radius",value:r.radius,onChange:t=>e({...r,radius:t}),min:1,max:5,step:1,valueUnit:"px"}),i.jsx(m,{title:"Sharpness",value:r.sharpness,onChange:t=>e({...r,sharpness:t}),min:0,max:1,step:.05})]}),_i=({params:r,onChange:e})=>i.jsxs(i.Fragment,{children:[i.jsx(m,{title:"Amount",value:r.amount,onChange:t=>e({...r,amount:t}),min:-1,max:1,step:.01}),i.jsx(m,{title:"Center X",value:r.centerX,onChange:t=>e({...r,centerX:t}),min:0,max:1,step:.01}),i.jsx(m,{title:"Center Y",value:r.centerY,onChange:t=>e({...r,centerY:t}),min:0,max:1,step:.01}),i.jsx(m,{title:"Zoom",value:r.zoom,onChange:t=>e({...r,zoom:t}),min:.5,max:2,step:.01})]}),yi=({params:r,onChange:e})=>i.jsxs(i.Fragment,{children:[i.jsx(m,{title:"Amplitude",value:r.amplitude,onChange:t=>e({...r,amplitude:t}),min:0,max:.1,step:.001}),i.jsx(m,{title:"Wavelength",value:r.wavelength,onChange:t=>e({...r,wavelength:t}),min:10,max:200,step:5}),i.jsx(m,{title:"Speed",value:r.speed,onChange:t=>e({...r,speed:t}),min:0,max:5,step:.1}),i.jsx(m,{title:"Center X",value:r.centerX,onChange:t=>e({...r,centerX:t}),min:0,max:1,step:.01}),i.jsx(m,{title:"Center Y",value:r.centerY,onChange:t=>e({...r,centerY:t}),min:0,max:1,step:.01}),i.jsx(m,{title:"Damping",value:r.damping,onChange:t=>e({...r,damping:t}),min:0,max:2,step:.05})]}),Ei=({params:r,onChange:e})=>{const t=g.useRef(null),a=g.useCallback(s=>{var n;const c=(n=s.target.files)==null?void 0:n[0];if(c){r.customMapUrl&&r.customMapUrl.startsWith("blob:")&&URL.revokeObjectURL(r.customMapUrl);const o=URL.createObjectURL(c);e({...r,customMapUrl:o})}s.target.value=""},[r,e]);return i.jsxs(i.Fragment,{children:[i.jsx(m,{title:"Scale X",value:r.scaleX,onChange:s=>e({...r,scaleX:s}),min:0,max:.2,step:.005}),i.jsx(m,{title:"Scale Y",value:r.scaleY,onChange:s=>e({...r,scaleY:s}),min:0,max:.2,step:.005}),i.jsx(J,{title:"Use Red/Green Channels",isChecked:r.useRedGreen,onChange:s=>e({...r,useRedGreen:s})}),i.jsx("input",{type:"file",ref:t,onChange:a,accept:"image/png,image/jpeg,image/webp",style:{display:"none"}}),i.jsxs(T,{as:"button",type:"button",direction:"column",align:"center",justify:"center",gap:2,p:3,bg:r.customMapUrl?"transparent":"var(--bg-elevated)",border:"1px dashed var(--color-primary)",borderRadius:"var(--radius-sm)",cursor:"pointer",onClick:()=>{var s;return(s=t.current)==null?void 0:s.click()},transition:"all 0.15s",_hover:{bg:"rgba(168, 85, 247, 0.1)"},position:"relative",overflow:"hidden",minH:"60px",children:[r.customMapUrl?i.jsx(I,{as:"img",src:r.customMapUrl,alt:"Displacement Map",w:"100%",h:"100%",objectFit:"cover",position:"absolute",top:0,left:0,opacity:.6}):null,i.jsx(w,{fontSize:"11px",color:"var(--text-muted)",zIndex:1,children:r.customMapUrl?"Click to change":"Upload Displacement Map"}),i.jsx(w,{fontSize:"10px",color:"var(--text-dimmed)",zIndex:1,children:"(Leave empty for procedural noise)"})]})]})},Ci=({params:r,onChange:e})=>i.jsxs(i.Fragment,{children:[i.jsx(ie,{title:"Color 1",color:r.color1,onChange:t=>e({...r,color1:t})}),i.jsx(ie,{title:"Color 2",color:r.color2,onChange:t=>e({...r,color2:t})}),i.jsx(m,{title:"Position",value:r.position,onChange:t=>e({...r,position:t}),min:-1,max:2,step:.01}),i.jsx(m,{title:"Angle",value:r.angle,onChange:t=>e({...r,angle:t}),min:0,max:360,step:1,valueUnit:"°"}),i.jsx(m,{title:"Size",value:r.size,onChange:t=>e({...r,size:t}),min:.1,max:2,step:.05}),i.jsx(m,{title:"Intensity",value:r.intensity,onChange:t=>e({...r,intensity:t}),min:0,max:1,step:.01}),i.jsx(m,{title:"Softness",value:r.softness,onChange:t=>e({...r,softness:t}),min:0,max:1,step:.01}),i.jsx(te,{title:"Blend Mode",value:r.blendMode,onChange:t=>e({...r,blendMode:t}),options:[{value:O.SCREEN,label:"Screen"},{value:O.OVERLAY,label:"Overlay"},{value:O.SOFT_LIGHT,label:"Soft Light"},{value:O.MULTIPLY,label:"Multiply"}]})]}),Ri=({params:r,onChange:e})=>i.jsxs(i.Fragment,{children:[i.jsx(m,{title:"Radius",value:r.radius,onChange:t=>e({...r,radius:t}),min:1,max:6,step:1,valueUnit:"px"}),i.jsx(m,{title:"Intensity",value:r.intensity,onChange:t=>e({...r,intensity:t}),min:0,max:3,step:.05}),i.jsx(m,{title:"Threshold",value:r.threshold,onChange:t=>e({...r,threshold:t}),min:0,max:1,step:.01}),i.jsx(m,{title:"Soft Threshold",value:r.softThreshold,onChange:t=>e({...r,softThreshold:t}),min:0,max:1,step:.01}),i.jsx(te,{title:"Blend Mode",value:r.blendMode,onChange:t=>e({...r,blendMode:t}),options:[{value:O.SCREEN,label:"Screen"},{value:O.OVERLAY,label:"Overlay"},{value:O.SOFT_LIGHT,label:"Soft Light"},{value:O.MULTIPLY,label:"Multiply"}]})]}),Ti=({params:r,onChange:e})=>i.jsxs(i.Fragment,{children:[i.jsx(m,{title:"Intensity",value:r.intensity,onChange:t=>e({...r,intensity:t}),min:0,max:1,step:.01}),i.jsx(m,{title:"Center X",value:r.centerX,onChange:t=>e({...r,centerX:t}),min:0,max:1,step:.01}),i.jsx(m,{title:"Center Y",value:r.centerY,onChange:t=>e({...r,centerY:t}),min:0,max:1,step:.01}),i.jsx(m,{title:"Samples",value:r.samples,onChange:t=>e({...r,samples:t}),min:8,max:64,step:1}),i.jsx(J,{title:"Zoom Blur",isChecked:r.zoom,onChange:t=>e({...r,zoom:t})})]}),Si=({params:r,onChange:e})=>i.jsxs(i.Fragment,{children:[i.jsx(m,{title:"Cell Size",value:r.cellSize,onChange:t=>e({...r,cellSize:t}),min:5,max:100,step:1,valueUnit:"px"}),i.jsx(m,{title:"Irregularity",value:r.irregularity,onChange:t=>e({...r,irregularity:t}),min:0,max:1,step:.01}),i.jsx(m,{title:"Edge Thickness",value:r.edgeThickness,onChange:t=>e({...r,edgeThickness:t}),min:0,max:.1,step:.005}),i.jsx(ie,{title:"Edge Color",color:r.edgeColor,onChange:t=>e({...r,edgeColor:t})}),i.jsx(m,{title:"Color Variation",value:r.colorVariation,onChange:t=>e({...r,colorVariation:t}),min:0,max:.5,step:.01})]}),Ai=({params:r,onChange:e})=>i.jsxs(i.Fragment,{children:[i.jsx(m,{title:"Focus Position",value:r.focusPosition,onChange:t=>e({...r,focusPosition:t}),min:0,max:1,step:.01}),i.jsx(m,{title:"Focus Width",value:r.focusWidth,onChange:t=>e({...r,focusWidth:t}),min:.05,max:.5,step:.01}),i.jsx(m,{title:"Blur Radius",value:r.blurRadius,onChange:t=>e({...r,blurRadius:t}),min:1,max:8,step:1,valueUnit:"px"}),i.jsx(m,{title:"Angle",value:r.angle,onChange:t=>e({...r,angle:t}),min:-90,max:90,step:1,valueUnit:"°"}),i.jsx(m,{title:"Gradient Smooth",value:r.gradientSmooth,onChange:t=>e({...r,gradientSmooth:t}),min:.05,max:.5,step:.01})]}),ki=({params:r,onChange:e})=>i.jsxs(i.Fragment,{children:[i.jsx(m,{title:"Exposure",value:r.exposure,onChange:t=>e({...r,exposure:t}),min:-3,max:3,step:.05,valueUnit:" EV"}),i.jsx(m,{title:"Highlights",value:r.highlights,onChange:t=>e({...r,highlights:t}),min:-1,max:1,step:.01}),i.jsx(m,{title:"Shadows",value:r.shadows,onChange:t=>e({...r,shadows:t}),min:-1,max:1,step:.01}),i.jsx(m,{title:"Blacks",value:r.blacks,onChange:t=>e({...r,blacks:t}),min:-1,max:1,step:.01}),i.jsx(m,{title:"Whites",value:r.whites,onChange:t=>e({...r,whites:t}),min:-1,max:1,step:.01})]}),Ii=({params:r,onChange:e})=>i.jsxs(i.Fragment,{children:[i.jsx(m,{title:"Vibrance",value:r.vibrance,onChange:t=>e({...r,vibrance:t}),min:-1,max:1,step:.01}),i.jsx(m,{title:"Saturation",value:r.saturation,onChange:t=>e({...r,saturation:t}),min:-1,max:1,step:.01})]}),wi=({params:r,onChange:e})=>i.jsxs(i.Fragment,{children:[i.jsx(m,{title:"Dot Size",value:r.scale,onChange:t=>e({...r,scale:t}),min:1,max:8,step:1,valueUnit:"px"}),i.jsx(m,{title:"Threshold",value:r.threshold,onChange:t=>e({...r,threshold:t}),min:.1,max:.9,step:.05}),i.jsx(J,{title:"Invert",isChecked:r.invert,onChange:t=>e({...r,invert:t})})]}),Di={[l.NOISE]:ti,[l.DITHER]:ri,[l.HALFTONE]:oi,[l.ASCII]:ii,[l.OVERLAY]:ni,[l.CHROMATIC]:ai,[l.VIGNETTE]:si,[l.SCANLINES]:li,[l.PIXELATE]:ci,[l.BLUR]:ui,[l.DISTORTION]:di,[l.POSTERIZE]:fi,[l.EDGE]:mi,[l.GRAIN]:hi,[l.COLOR_GRADE]:gi,[l.GLITCH]:pi,[l.CRT]:vi,[l.DUOTONE]:xi,[l.KUWAHARA]:bi,[l.BARREL]:_i,[l.RIPPLE]:yi,[l.DISPLACEMENT]:Ei,[l.LIGHT_LEAK]:Ci,[l.BLOOM]:Ri,[l.RADIAL_BLUR]:Ti,[l.MOSAIC]:Si,[l.TILT_SHIFT]:Ai,[l.EXPOSURE]:ki,[l.VIBRANCE]:Ii,[l.DOT_DITHER]:wi},jt=g.memo(({effect:r,onUpdate:e,onDelete:t,onToggle:a,onDuplicate:s,isDragging:c,onDragStart:n,onDragEnd:o,onDragOver:u,isExpanded:d,onExpandToggle:p})=>{const _=Dt[r.type],E=Di[r.type];return i.jsxs(I,{bg:"var(--bg-elevated)",border:c?"1px solid var(--color-primary)":"1px solid var(--border-primary)",borderRadius:"var(--radius-sm)",overflow:"hidden",opacity:c?.5:1,transition:"all 0.2s ease",transform:c?"scale(0.95)":"scale(1)",onDragOver:u,children:[i.jsxs(T,{align:"center",justify:"space-between",p:3,cursor:"pointer",onClick:p,_hover:{bg:"rgba(168, 85, 247, 0.05)"},children:[i.jsxs(T,{align:"center",gap:1,children:[i.jsx(T,{align:"center",justify:"center",w:5,h:5,cursor:"grab",draggable:!0,onDragStart:n,onDragEnd:o,onClick:R=>R.stopPropagation(),opacity:.4,_hover:{opacity:1},_active:{cursor:"grabbing"},children:i.jsx(j,{as:bt,boxSize:3,color:"var(--text-muted)"})}),i.jsx(j,{as:_,boxSize:3,color:r.enabled?"var(--color-primary)":"var(--text-muted)"}),i.jsx(w,{fontSize:"12px",color:r.enabled?"var(--text-primary)":"var(--text-muted)",fontWeight:500,children:Mt[r.type]})]}),i.jsxs(T,{align:"center",gap:1,children:[i.jsx(T,{as:"button",align:"center",justify:"center",w:6,h:6,borderRadius:"4px",cursor:"pointer",onClick:R=>{R.stopPropagation(),a(r.id)},_hover:{bg:"rgba(255,255,255,0.1)"},title:r.enabled?"Disable effect":"Enable effect",children:i.jsx(j,{as:r.enabled?it:Qt,boxSize:3.5,color:"var(--text-muted)"})}),i.jsx(T,{as:"button",align:"center",justify:"center",w:6,h:6,borderRadius:"4px",cursor:"pointer",onClick:R=>{R.stopPropagation(),s(r)},_hover:{bg:"rgba(255,255,255,0.1)"},title:"Duplicate effect",children:i.jsx(j,{as:nt,boxSize:3.5,color:"var(--text-muted)"})}),i.jsx(T,{as:"button",align:"center",justify:"center",w:6,h:6,borderRadius:"4px",cursor:"pointer",onClick:R=>{R.stopPropagation(),t(r.id)},_hover:{bg:"rgba(255,100,100,0.1)"},title:"Delete effect",children:i.jsx(j,{as:Jt,boxSize:3.5,color:"var(--text-muted)"})}),i.jsx(T,{as:"button",align:"center",justify:"center",w:6,h:6,borderRadius:"4px",cursor:"pointer",onClick:R=>{R.stopPropagation(),p()},_hover:{bg:"rgba(255,255,255,0.1)"},title:d?"Collapse":"Expand",children:i.jsx(j,{as:d?ke:Le,boxSize:4,color:"var(--text-muted)"})})]})]}),d&&E&&i.jsx(T,{direction:"column",gap:2,p:3,borderTop:"1px solid var(--border-primary)",children:i.jsx(E,{params:r.params,onChange:R=>e(r.id,{params:R})})})]})});jt.displayName="EffectCard";const Mi={texture:{label:"Texture",effects:[l.NOISE,l.GRAIN,l.DITHER,l.HALFTONE,l.DOT_DITHER,l.SCANLINES]},stylize:{label:"Stylize",effects:[l.ASCII,l.PIXELATE,l.POSTERIZE,l.EDGE,l.KUWAHARA,l.GLITCH,l.CRT,l.DUOTONE,l.MOSAIC]},color:{label:"Color & Light",effects:[l.COLOR_GRADE,l.EXPOSURE,l.VIBRANCE,l.CHROMATIC,l.VIGNETTE,l.LIGHT_LEAK,l.BLOOM]},distort:{label:"Distort",effects:[l.BLUR,l.RADIAL_BLUR,l.TILT_SHIFT,l.DISTORTION,l.BARREL,l.RIPPLE,l.DISPLACEMENT]},overlay:{label:"Overlay",effects:[l.OVERLAY]}},ji=({onAddEffect:r})=>{const[e,t]=g.useState(!1);return i.jsxs(I,{bg:"var(--bg-elevated)",border:"1px solid var(--border-primary)",borderRadius:"var(--radius-sm)",overflow:"hidden",mb:3,children:[i.jsxs(T,{as:"button",type:"button",align:"center",justify:"space-between",w:"100%",p:3,cursor:"pointer",onClick:()=>t(!e),_hover:{bg:"rgba(168, 85, 247, 0.1)"},transition:"all 0.15s",children:[i.jsxs(T,{align:"center",gap:2,children:[i.jsx(j,{as:rr,boxSize:4,color:"var(--text-muted)"}),i.jsx(w,{fontSize:"12px",color:"var(--text-primary)",fontWeight:500,children:"Add Effect"})]}),i.jsx(j,{as:e?ke:Le,boxSize:4,color:"var(--text-muted)"})]}),e&&i.jsx(T,{direction:"column",gap:3,p:3,borderTop:"1px solid var(--border-primary)",children:Object.entries(Mi).map(([a,s])=>i.jsxs(I,{children:[i.jsx(w,{fontSize:"10px",color:"var(--text-muted)",fontWeight:600,textTransform:"uppercase",letterSpacing:"0.5px",mb:2,children:s.label}),i.jsx(T,{gap:1.5,flexWrap:"wrap",css:{display:"grid",gridTemplateColumns:"repeat(2, 1fr)",gap:"6px"},children:s.effects.map(c=>i.jsxs(T,{as:"button",type:"button",align:"center",gap:2,px:2.5,py:2,bg:"var(--bg-body)",border:"1px solid var(--border-primary)",borderRadius:"var(--radius-sm)",cursor:"pointer",onClick:()=>{r(c),t(!1)},transition:"all 0.15s",_hover:{borderColor:"var(--color-primary)",bg:"rgba(168, 85, 247, 0.08)"},children:[i.jsx(j,{as:Dt[c],boxSize:3.5,color:"var(--text-muted)",flexShrink:0}),i.jsx(w,{fontSize:"11px",color:"var(--text-primary)",whiteSpace:"nowrap",fontWeight:450,children:Mt[c]})]},c))})]},a))})]})},Pi=({onLoadPreset:r})=>{const[e,t]=g.useState(!1);return i.jsxs(I,{bg:"var(--bg-elevated)",border:"1px solid var(--border-primary)",borderRadius:"var(--radius-sm)",overflow:"hidden",mb:4,children:[i.jsxs(T,{as:"button",type:"button",align:"center",justify:"space-between",w:"100%",p:3,cursor:"pointer",onClick:()=>t(!e),_hover:{bg:"rgba(168, 85, 247, 0.1)"},transition:"all 0.15s",children:[i.jsxs(T,{align:"center",gap:2,children:[i.jsx(j,{as:Qe,boxSize:4,color:"var(--text-muted)"}),i.jsx(w,{fontSize:"12px",color:"var(--text-primary)",fontWeight:500,children:"Presets"})]}),i.jsx(j,{as:e?ke:Le,boxSize:4,color:"var(--text-muted)"})]}),e&&i.jsx(I,{p:3,borderTop:"1px solid var(--border-primary)",css:{display:"grid",gridTemplateColumns:"repeat(2, 1fr)",gap:"6px"},children:Object.entries(wt).map(([a,s])=>i.jsxs(T,{as:"button",type:"button",align:"center",gap:2,px:2.5,py:2,bg:"var(--bg-body)",border:"1px solid var(--border-primary)",borderRadius:"var(--radius-sm)",cursor:"pointer",onClick:()=>r(a),transition:"all 0.15s",_hover:{borderColor:"var(--color-primary)",bg:"rgba(168, 85, 247, 0.08)"},children:[i.jsx(j,{as:Qe,boxSize:3.5,color:"var(--text-muted)",flexShrink:0}),i.jsx(w,{fontSize:"11px",color:"var(--text-primary)",whiteSpace:"nowrap",fontWeight:450,children:s.name})]},a))})]})},Li=({mediaType:r,exportFormat:e,exportQuality:t,exportScale:a,previewQuality:s,onExportFormatChange:c,onExportQualityChange:n,onExportScaleChange:o,onPreviewQualityChange:u})=>{const[d,p]=g.useState(!1),_=r==="video";return i.jsxs(I,{bg:"var(--bg-elevated)",border:"1px solid var(--border-primary)",borderRadius:"var(--radius-sm)",overflow:"hidden",children:[i.jsxs(T,{as:"button",type:"button",align:"center",justify:"space-between",w:"100%",p:3,cursor:"pointer",onClick:()=>p(!d),_hover:{bg:"rgba(168, 85, 247, 0.1)"},transition:"all 0.15s",children:[i.jsxs(T,{align:"center",gap:2,children:[i.jsx(j,{as:yt,boxSize:4,color:"var(--text-muted)"}),i.jsx(w,{fontSize:"12px",color:"var(--text-primary)",fontWeight:500,children:"Export Settings"})]}),i.jsx(j,{as:d?ke:Le,boxSize:4,color:"var(--text-muted)"})]}),d&&i.jsxs(T,{direction:"column",gap:3,p:3,children:[_?i.jsx(w,{fontSize:"11px",color:"var(--text-muted)",children:"Videos export as WebM format."}):i.jsxs(i.Fragment,{children:[i.jsx(te,{title:"Format",value:e,onChange:c,options:[{value:"png",label:"PNG (lossless)"},{value:"jpg",label:"JPG (smaller file)"}]}),e==="jpg"&&i.jsx(m,{title:"Quality",value:t,onChange:n,min:.7,max:1,step:.01}),i.jsx(te,{title:"Scale",value:a.toString(),onChange:E=>o(parseInt(E)),options:Jo.map(E=>({value:E.toString(),label:`${E}× ${E===1?"(original)":""}`}))})]}),i.jsx(te,{title:"Preview Quality",value:s,onChange:u,options:[{value:"draft",label:"Draft (fast)"},{value:"high",label:"High (accurate)"}]})]})]})},Je=r=>{const e=(n,o)=>Math.random()*(o-n)+n,t=(n,o)=>Math.floor(e(n,o+1)),a=()=>Math.random()>.5,s=n=>n[Math.floor(Math.random()*n.length)],c=()=>"#"+Math.floor(Math.random()*16777215).toString(16).padStart(6,"0");switch(r){case l.NOISE:return{intensity:e(.05,.2),scale:e(.8,1.5),monochrome:a(),blendMode:s(["overlay","soft-light"])};case l.DITHER:return{method:s(["bayer2x2","bayer4x4","bayer8x8"]),levels:t(3,6),threshold:e(.4,.6),scale:e(.8,1.5)};case l.HALFTONE:return{gridSize:t(4,12),dotScale:e(.7,1.2),angle:t(0,90),shape:s(["circle","square","diamond"]),softness:e(.3,.6),contrast:e(-.1,.2),invert:!1,colorMode:s(["original","monochrome"]),dotColor:"#000000",backgroundColor:"#ffffff",mixOriginal:e(.1,.3)};case l.DOT_DITHER:return{scale:t(1,3),threshold:e(.4,.6),invert:!1};case l.ASCII:return{charset:s([" .:-=+*#%@"," .-+*#"]),cellSize:t(4,8),colorMode:"original",invert:!1,contrast:e(1.1,1.4),brightness:e(1.1,1.3)};case l.CHROMATIC:return{intensity:e(.002,.008),angle:t(0,360),radial:a()};case l.VIGNETTE:return{intensity:e(.2,.5),size:e(.4,.6),softness:e(.4,.7),color:"#000000"};case l.SCANLINES:return{spacing:t(2,5),thickness:t(1,2),opacity:e(.1,.3),horizontal:a(),offset:t(0,5)};case l.PIXELATE:return{size:t(2,8),maintainAspect:!0};case l.BLUR:return{radius:e(.5,2),type:"gaussian",angle:0};case l.DISTORTION:return{type:s(["wave","bulge"]),amplitude:e(3,10),frequency:e(3,8),centerX:.5,centerY:.5};case l.POSTERIZE:return{levels:t(4,8),preserveHue:!0};case l.EDGE:return{strength:e(.5,1.2),threshold:e(.1,.25),invert:!1,colorize:!0};case l.GRAIN:return{intensity:e(.05,.15),size:e(1,2),luminanceResponse:e(.3,.6),colored:!1};case l.COLOR_GRADE:return{brightness:e(-.1,.1),contrast:e(-.15,.15),saturation:e(-.15,.2),temperature:e(-.15,.15),tint:e(-.1,.1),shadowInfluence:e(0,.15),highlightInfluence:e(0,.15)};case l.GLITCH:return{intensity:e(.1,.3),sliceCount:t(3,10),rgbShift:e(.005,.02),angle:t(0,15),seed:t(0,1e3),blockSize:e(.03,.1),colorShift:a()};case l.CRT:return{curvature:e(.05,.2),scanlineIntensity:e(.1,.3),scanlineCount:t(300,500),vignetteIntensity:e(.1,.3),brightness:e(1,1.15),rgbOffset:e(.001,.003),flickerIntensity:e(.01,.03),staticNoise:e(.01,.05)};case l.DUOTONE:{const o=s([{shadow:"#1a1a2e",highlight:"#eeeeff"},{shadow:"#2d132c",highlight:"#ffeef4"},{shadow:"#1a2639",highlight:"#f0f4ff"},{shadow:"#2c3e50",highlight:"#ecf0f1"},{shadow:"#1e3d59",highlight:"#f5f0e1"},{shadow:"#3d1a1a",highlight:"#fff5f5"}]);return{shadowColor:o.shadow,highlightColor:o.highlight,contrast:e(.95,1.05),intensity:e(.6,.8)}}case l.KUWAHARA:return{radius:t(2,4),sharpness:e(.4,.7)};case l.BARREL:return{amount:e(.05,.2),centerX:.5,centerY:.5,zoom:e(.95,1.05)};case l.RIPPLE:return{amplitude:e(.005,.02),wavelength:e(30,60),speed:e(.5,1.5),centerX:.5,centerY:.5,damping:e(.3,.6)};case l.LIGHT_LEAK:return{color1:c(),color2:c(),position:e(.2,.4),angle:t(0,360),size:e(.4,.6),intensity:e(.2,.4),softness:e(.5,.8),blendMode:"screen"};case l.BLOOM:return{radius:t(4,6),intensity:e(.3,.6),threshold:e(.5,.7),softThreshold:e(.4,.6),blendMode:"screen"};case l.RADIAL_BLUR:return{intensity:e(.05,.15),centerX:.5,centerY:.5,samples:t(16,32),zoom:!1};case l.MOSAIC:return{cellSize:t(15,30),irregularity:e(.3,.6),edgeThickness:e(.01,.03),edgeColor:"#000000",colorVariation:e(.05,.1)};case l.TILT_SHIFT:return{focusPosition:.5,focusWidth:e(.2,.4),blurRadius:t(4,8),angle:0,gradientSmooth:e(.3,.5)};case l.EXPOSURE:return{exposure:e(-.25,.25),highlights:e(-.15,.15),shadows:e(-.15,.15),blacks:e(-.1,.1),whites:e(-.1,.1)};case l.VIBRANCE:return{vibrance:e(-.15,.3),saturation:e(-.15,.15)};default:return{}}};function et({image:r,video:e,mediaType:t,corsError:a,effects:s,previewQuality:c,exportFormat:n,exportQuality:o,exportScale:u,isExporting:d,exportProgress:p,exportStatus:_,onMediaLoad:E,onClearMedia:R,onEffectsChange:C,onSeedChange:k,onPreviewQualityChange:P,onExportFormatChange:F,onExportQualityChange:Y,onExportScaleChange:B,onCopyToClipboard:$,onExport:re,onReset:V,toolSelector:ee}){const ne=g.useRef(null),[X,fe]=g.useState(""),[me,v]=g.useState(!1),y=g.useCallback(f=>{var S;const h=(S=f.target.files)==null?void 0:S[0];h&&E(h,"file"),f.target.value=""},[E]),q=g.useCallback(async()=>{if(X.trim()){v(!0);try{await E(X.trim(),"url"),fe("")}catch(f){H.create({title:"Failed to load media",description:f.message,type:"error",duration:3e3})}v(!1)}},[X,E]),[G,Z]=g.useState(null),Q=g.useCallback(f=>{const h=De(f);C([h,...s]),Z(h.id)},[s,C]),ge=g.useCallback((f,h)=>{C(s.map(S=>S.id===f?{...S,...h}:S))},[s,C]),pe=g.useCallback(f=>{C(s.filter(h=>h.id!==f))},[s,C]),W=g.useCallback(f=>{C(s.map(h=>h.id===f?{...h,enabled:!h.enabled}:h))},[s,C]),K=g.useCallback(f=>{const h={...f,id:`${f.type}-${Date.now()}-${Math.random().toString(36).substr(2,9)}`,params:{...f.params}},S=s.findIndex(N=>N.id===f.id),D=[...s];D.splice(S+1,0,h),C(D)},[s,C]),[oe,be]=g.useState(null),Ce=g.useCallback(f=>{be(f)},[]),Re=g.useCallback(()=>{be(null)},[]),Ie=g.useCallback((f,h)=>{if(f.preventDefault(),!oe||oe===h)return;const S=s.findIndex(z=>z.id===oe),D=s.findIndex(z=>z.id===h);if(S===-1||D===-1||S===D)return;const N=[...s],[L]=N.splice(S,1);N.splice(D,0,L),C(N)},[oe,s,C]),_e=g.useCallback(f=>{const h=wt[f];if(!h)return;const S=h.effects.map(D=>({...De(D.type),enabled:D.enabled,params:{...D.params}}));C(S),H.create({title:`Applied "${h.name}" preset`,type:"success",duration:2e3})},[C]),Te=g.useCallback(()=>{const f=[l.NOISE,l.DITHER,l.HALFTONE,l.DOT_DITHER,l.ASCII,l.CHROMATIC,l.VIGNETTE,l.SCANLINES,l.PIXELATE,l.BLUR,l.DISTORTION,l.POSTERIZE,l.EDGE,l.GRAIN,l.COLOR_GRADE,l.GLITCH,l.CRT,l.DUOTONE,l.KUWAHARA,l.RIPPLE,l.LIGHT_LEAK,l.BLOOM,l.RADIAL_BLUR,l.TILT_SHIFT,l.EXPOSURE,l.VIBRANCE],S=(()=>{const z=Math.random();return z<.3?2:z<.55?3:z<.75?4:z<.87?5:z<.94?6:z<.98?7:8})(),L=[...f].sort(()=>Math.random()-.5).slice(0,S).map(z=>{const ae=De(z);return{...ae,params:{...ae.params,...Je(z)}}});C(L),k(Math.floor(Math.random()*1e5)),H.create({title:`Applied ${S} random effects`,type:"success",duration:2e3})},[C,k]),ye=g.useCallback(()=>{if(s.length===0){H.create({title:"No effects to randomize",type:"info",duration:2e3});return}const f=s.map(h=>({...h,params:{...h.params,...Je(h.type)}}));C(f),H.create({title:`Randomized ${s.length} effect parameters`,type:"success",duration:2e3})},[s,C]),ve=g.useRef(null),b=g.useCallback(()=>{const f={name:"Custom Preset",version:1,effects:s.map(N=>({type:N.type,enabled:N.enabled,params:N.params}))},h=new Blob([JSON.stringify(f,null,2)],{type:"application/json"}),S=URL.createObjectURL(h),D=document.createElement("a");D.href=S,D.download="texture-lab-preset.json",D.click(),URL.revokeObjectURL(S),H.create({title:"Preset saved",type:"success",duration:2e3})},[s]),x=g.useCallback(f=>{var D;const h=(D=f.target.files)==null?void 0:D[0];if(!h)return;const S=new FileReader;S.onload=N=>{try{const L=JSON.parse(N.target.result);if(!L.effects||!Array.isArray(L.effects))throw new Error("Invalid preset format");const z=L.effects.map(ae=>({...De(ae.type),enabled:ae.enabled!==!1,params:{...De(ae.type).params,...ae.params}}));C(z),H.create({title:`Loaded "${L.name||"Custom"}" preset`,type:"success",duration:2e3})}catch{H.create({title:"Failed to load preset",description:"Invalid preset file format",type:"error",duration:3e3})}},S.readAsText(h),f.target.value=""},[C]);return i.jsxs(T,{direction:"column",h:"100%",minH:0,children:[ee&&i.jsx(I,{mb:4,flexShrink:0,children:ee}),i.jsxs(I,{flex:1,overflowY:"auto",minH:0,css:{"&::-webkit-scrollbar":{display:"none"},scrollbarWidth:"none"},children:[i.jsx(ei,{children:"Media Source"}),i.jsxs(T,{direction:"column",gap:2,mb:4,children:[i.jsx("input",{type:"file",ref:ne,onChange:y,accept:"image/png,image/jpeg,image/webp,video/mp4,video/webm,video/ogg",style:{display:"none"}}),i.jsxs(T,{gap:2,children:[i.jsx(Se,{icon:Xe,label:"Upload",onClick:()=>{var f;return(f=ne.current)==null?void 0:f.click()},flex:1,disabled:d}),i.jsx(Se,{icon:$t,label:"Sample",onClick:()=>E("https://images.unsplash.com/photo-1597848212624-a19eb35e2651?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D","url"),flex:1,disabled:d}),(r||e)&&!d&&i.jsx(Se,{icon:Yt,label:"Clear",onClick:R})]}),i.jsxs(T,{gap:2,children:[i.jsx(Kt,{placeholder:"Paste image or video URL...",value:X,onChange:f=>fe(f.target.value),size:"sm",bg:"var(--bg-elevated)",border:"1px solid var(--border-primary)",borderRadius:"var(--radius-sm)",color:"var(--text-primary)",fontSize:"12px",flex:1,_placeholder:{color:"var(--color-accent)"},_focus:{borderColor:"var(--color-primary)",boxShadow:"none"},onKeyDown:f=>f.key==="Enter"&&!d&&q(),disabled:d}),i.jsx(Se,{icon:to,onClick:q,disabled:!X.trim()||me||d})]}),a&&i.jsx(I,{bg:"rgba(255,100,100,0.1)",p:2,borderRadius:"6px",border:"1px solid rgba(255,100,100,0.3)",children:i.jsx(w,{fontSize:"11px",color:"#ff6b6b",children:"⚠️ CORS blocked. Export/copy disabled. Re-upload the media locally to enable."})})]}),i.jsx(Pi,{onLoadPreset:_e}),i.jsxs(T,{align:"center",justify:"space-between",mb:3,children:[i.jsxs(w,{fontSize:"11px",color:"var(--text-muted)",fontWeight:600,textTransform:"uppercase",letterSpacing:"0.5px",children:["Effects (",s.length,")"]}),i.jsxs(T,{gap:1,children:[i.jsx(Se,{icon:Mr,onClick:Te,title:"Randomize effects"}),i.jsx(Se,{icon:vo,onClick:ye,title:"Randomize parameters"})]})]}),i.jsx(ji,{onAddEffect:Q}),i.jsxs(T,{direction:"column",gap:2,mb:4,children:[s.map(f=>i.jsx(jt,{effect:f,onUpdate:ge,onDelete:pe,onToggle:W,onDuplicate:K,isDragging:oe===f.id,onDragStart:()=>Ce(f.id),onDragEnd:Re,onDragOver:h=>Ie(h,f.id),isExpanded:G===f.id,onExpandToggle:()=>Z(G===f.id?null:f.id)},f.id)),s.length===0&&i.jsx(I,{p:4,bg:"var(--bg-elevated)",border:"1px dashed var(--border-primary)",borderRadius:"var(--radius-sm)",textAlign:"center",children:i.jsx(w,{fontSize:"12px",color:"var(--text-muted)",children:"No effects added. Click “Add Effect” to get started."})})]})]}),i.jsxs(I,{pt:4,children:[i.jsxs(T,{gap:2,mb:3,children:[i.jsxs(T,{as:"button",flex:1,align:"center",justify:"center",gap:2,bg:"var(--bg-elevated)",border:"1px solid var(--border-primary)",borderRadius:"var(--radius-sm)",py:2,cursor:s.length===0?"not-allowed":"pointer",opacity:s.length===0?.5:1,onClick:s.length===0?void 0:b,transition:"all 0.15s",_hover:{borderColor:s.length===0?"var(--border-primary)":"var(--color-primary)"},children:[i.jsx(j,{as:Nr,boxSize:3.5,color:"var(--text-muted)"}),i.jsx(w,{fontSize:"12px",color:"var(--text-muted)",fontWeight:500,children:"Save Preset"})]}),i.jsxs(T,{as:"button",flex:1,align:"center",justify:"center",gap:2,bg:"var(--bg-elevated)",border:"1px solid var(--border-primary)",borderRadius:"var(--radius-sm)",py:2,cursor:"pointer",onClick:()=>{var f;return(f=ve.current)==null?void 0:f.click()},transition:"all 0.15s",_hover:{borderColor:"var(--color-primary)"},children:[i.jsx(j,{as:Fr,boxSize:3.5,color:"var(--text-muted)"}),i.jsx(w,{fontSize:"12px",color:"var(--text-muted)",fontWeight:500,children:"Load Preset"})]}),i.jsx("input",{type:"file",ref:ve,onChange:x,accept:"application/json",style:{display:"none"}})]}),i.jsx(Li,{mediaType:t,exportFormat:n,exportQuality:o,exportScale:u,previewQuality:c,onExportFormatChange:F,onExportQualityChange:Y,onExportScaleChange:B,onPreviewQualityChange:P}),i.jsxs(T,{gap:2,mb:2,mt:3,children:[t!=="video"&&i.jsxs(T,{as:"button",flex:1,align:"center",justify:"center",gap:2,bg:"var(--bg-elevated)",border:"1px solid var(--border-primary)",borderRadius:"var(--radius-sm)",py:2,cursor:a||!r?"not-allowed":"pointer",opacity:a||!r?.5:1,onClick:a||!r?void 0:$,transition:"all 0.15s",_hover:{borderColor:a||!r?"var(--border-primary)":"var(--color-primary)"},children:[i.jsx(j,{as:nt,boxSize:4,color:"var(--text-muted)"}),i.jsx(w,{fontSize:"12px",color:"var(--text-muted)",fontWeight:500,children:"Copy"})]}),i.jsxs(T,{as:"button",flex:1,align:"center",justify:"center",gap:2,bg:"var(--bg-elevated)",border:"1px solid var(--border-primary)",borderRadius:"var(--radius-sm)",py:2,cursor:d?"not-allowed":"pointer",opacity:d?.5:1,onClick:d?void 0:V,transition:"all 0.15s",_hover:{borderColor:d?"var(--border-primary)":"var(--color-primary)"},children:[i.jsx(j,{as:er,boxSize:4,color:"var(--text-muted)"}),i.jsx(w,{fontSize:"12px",color:"var(--text-muted)",fontWeight:500,children:"Reset"})]})]}),i.jsxs(T,{as:"button",align:"center",justify:"center",bg:"var(--color-primary)",borderRadius:"var(--radius-sm)",h:"44px",w:"100%",cursor:a||!r&&!e||d?"not-allowed":"pointer",opacity:a||!r&&!e?.5:1,onClick:a||!r&&!e||d?void 0:re,transition:"all 0.15s",_hover:{bg:a||!r&&!e||d?"var(--color-primary)":"#b96dfa"},overflow:"hidden",position:"relative",children:[i.jsx(I,{position:"absolute",left:"0",top:"0",bottom:"0",width:d?`${Math.max(0,Math.min(100,p))}%`:"0%",bg:"rgba(255, 255, 255, 0.2)",transition:"width 0.15s linear",pointerEvents:"none",zIndex:0}),i.jsxs(T,{align:"center",justify:d?"space-between":"center",w:"100%",px:4,position:"relative",zIndex:1,children:[i.jsxs(T,{align:"center",gap:2,children:[i.jsx(I,{as:"span",css:d?{animation:"spin 1s linear infinite","@keyframes spin":{"0%":{transform:"rotate(0deg)"},"100%":{transform:"rotate(360deg)"}}}:void 0,children:i.jsx(j,{as:tr,boxSize:4,color:"#fff"})}),i.jsx(w,{fontSize:"14px",color:"#fff",fontWeight:600,children:d?_||"Exporting...":t==="video"?"Export Video":`Export ${n.toUpperCase()}`})]}),i.jsxs(w,{fontSize:"14px",color:"#fff",fontWeight:600,fontFamily:"mono",opacity:d?1:0,w:d?"auto":0,overflow:"hidden",transition:"opacity 0.15s",children:[Math.round(p),"%"]})]})]})]})]})}const tt=r=>{if(!r||isNaN(r))return"0:00";const e=Math.floor(r/60),t=Math.floor(r%60);return`${e}:${t.toString().padStart(2,"0")}`};function Ui({image:r,video:e,mediaType:t,canvasRef:a,viewMode:s,onViewModeChange:c,onMediaDrop:n,onMediaLoad:o,isPlaying:u,currentTime:d,duration:p,onPlayPause:_,onSeek:E,isExporting:R}){var ye,ve;const C=g.useRef(null),k=g.useRef(null),[P,F]=g.useState(1),[Y,B]=g.useState({x:0,y:0}),[$,re]=g.useState(!1),[V,ee]=g.useState({x:0,y:0}),[ne,X]=g.useState(.5),[fe,me]=g.useState(!1),[v,y]=g.useState({width:0,height:0}),[q,G]=g.useState(!1),[Z,Q]=g.useState(!1);g.useEffect(()=>{if(!C.current)return;const b=new ResizeObserver(x=>{const{width:f,height:h}=x[0].contentRect;y({width:f,height:h})});return b.observe(C.current),()=>b.disconnect()},[]);const ge=g.useRef(null);g.useEffect(()=>{const b=t==="video"?e:r;if(!b||!v.width||ge.current===b)return;ge.current=b;const x=b.width||b.videoWidth,f=b.height||b.videoHeight,h=(v.width-40)/x,S=(v.height-40)/f,D=Math.min(h,S,1);F(D),B({x:0,y:0})},[r,e,t,v]);const pe=g.useCallback(b=>{b.preventDefault();const x=b.deltaY>0?.9:1.1;F(f=>Math.min(Math.max(f*x,.1),10))},[]),W=g.useCallback(b=>{(b.button===1||b.button===0&&Z)&&(b.preventDefault(),re(!0),ee({x:b.clientX,y:b.clientY}))},[Z]),K=g.useCallback(b=>{if($&&(B(x=>({x:x.x+(b.clientX-V.x),y:x.y+(b.clientY-V.y)})),ee({x:b.clientX,y:b.clientY})),fe&&k.current){const x=k.current.getBoundingClientRect(),f=(b.clientX-x.left)/x.width;X(Math.max(.05,Math.min(.95,f)))}},[$,fe,V]),oe=g.useCallback(()=>{re(!1),me(!1)},[]);g.useEffect(()=>{const b=f=>{var h;f.code==="Space"&&!f.repeat&&((h=document.activeElement)==null?void 0:h.tagName)!=="INPUT"&&(f.preventDefault(),Q(!0))},x=f=>{f.code==="Space"&&(Q(!1),re(!1))};return window.addEventListener("keydown",b),window.addEventListener("keyup",x),()=>{window.removeEventListener("keydown",b),window.removeEventListener("keyup",x)}},[]),g.useEffect(()=>(window.addEventListener("mousemove",K),window.addEventListener("mouseup",oe),()=>{window.removeEventListener("mousemove",K),window.removeEventListener("mouseup",oe)}),[K,oe]),g.useEffect(()=>{const b=C.current;if(b)return b.addEventListener("wheel",pe,{passive:!1}),()=>b.removeEventListener("wheel",pe)},[pe]);const be=g.useCallback(()=>{const b=t==="video"?e:r;if(!b||!v.width)return;const x=b.width||b.videoWidth,f=b.height||b.videoHeight,h=(v.width-40)/x,S=(v.height-40)/f;F(Math.min(h,S,1)),B({x:0,y:0})},[r,e,t,v]),Ce=g.useCallback(b=>{b.preventDefault(),b.stopPropagation(),!R&&b.dataTransfer.types.includes("Files")&&G(!0)},[R]),Re=g.useCallback(b=>{b.preventDefault(),b.stopPropagation(),G(!1)},[]),Ie=g.useCallback(b=>{var f;if(b.preventDefault(),b.stopPropagation(),G(!1),R)return;const x=(f=b.dataTransfer.files)==null?void 0:f[0];x&&(x.type.startsWith("image/")||x.type.startsWith("video/"))&&n&&n(x)},[n,R]),_e=g.useRef(null),Te=g.useCallback(b=>{var f;const x=(f=b.target.files)==null?void 0:f[0];x&&o(x,"file"),b.target.value=""},[o]);return i.jsxs(I,{ref:C,position:"relative",w:"100%",h:"100%",bg:"var(--bg-body)",overflow:"hidden",cursor:$?"grabbing":Z?"grab":"default",onMouseDown:W,onDragOver:Ce,onDragLeave:Re,onDrop:Ie,children:[q&&i.jsx(T,{position:"absolute",top:0,left:0,right:0,bottom:0,bg:"rgba(168, 85, 247, 0.15)",zIndex:100,align:"center",justify:"center",pointerEvents:"none",children:i.jsx(w,{fontSize:"lg",fontWeight:600,color:"#A855F7",children:"Drop image or video here"})}),i.jsx(I,{position:"absolute",top:0,left:0,right:0,bottom:0,opacity:.25,pointerEvents:"none",style:{backgroundImage:`
            linear-gradient(to right, var(--border-primary) 1px, transparent 1px),
            linear-gradient(to bottom, var(--border-primary) 1px, transparent 1px)
          `,backgroundSize:"20px 20px",backgroundPosition:"0 0, 0 0",maskImage:`
            repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 70%)
          `,WebkitMaskImage:`
            repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            radial-gradient(ellipse 60% 60% at 50% 50%, #000 30%, transparent 70%)
          `,maskComposite:"intersect",WebkitMaskComposite:"source-in"}}),i.jsxs(T,{ref:k,position:"absolute",top:"50%",left:"50%",transform:`translate(calc(-50% + ${Y.x}px), calc(-50% + ${Y.y}px)) scale(${P})`,transformOrigin:"center",transition:$?"none":"transform 0.1s ease-out",style:{background:"none"},display:r||e?"flex":"none",children:[i.jsx("canvas",{ref:a,style:{display:"block",borderRadius:"4px"}}),s==="split"&&r&&i.jsxs(I,{position:"absolute",top:0,left:0,right:0,bottom:0,overflow:"hidden",borderRadius:"4px",pointerEvents:"none",style:{background:"none"},children:[i.jsx(I,{position:"absolute",top:0,left:0,h:"100%",w:"100%",style:{background:"none",clipPath:`inset(0 ${(1-ne)*100}% 0 0)`},children:i.jsx("img",{src:r.src,alt:"Original",draggable:!1,onDragStart:b=>b.preventDefault(),style:{width:((ye=a.current)==null?void 0:ye.width)||r.width,height:((ve=a.current)==null?void 0:ve.height)||r.height,display:"block",background:"none",userSelect:"none",pointerEvents:"none"}})}),i.jsx(I,{position:"absolute",top:0,bottom:0,left:`${ne*100}%`,transform:"translateX(-50%)",w:"2px",bg:"white",boxShadow:"0 0 8px rgba(0,0,0,0.5)",pointerEvents:"auto",cursor:"ew-resize",onMouseDown:b=>{b.stopPropagation(),me(!0)},zIndex:10}),i.jsx(T,{position:"absolute",top:"50%",left:`${ne*100}%`,transform:"translate(-50%, -50%)",w:"32px",h:"32px",bg:"white",borderRadius:"50%",align:"center",justify:"center",cursor:"ew-resize",pointerEvents:"auto",boxShadow:"0 2px 12px rgba(0,0,0,0.5)",zIndex:11,onMouseDown:b=>{b.stopPropagation(),me(!0)},_hover:{bg:"#f0f0f0"},transition:"background 0.15s",children:i.jsx(j,{as:bt,boxSize:4,color:"#000"})}),i.jsx(I,{position:"absolute",top:2,left:2,bg:"rgba(0,0,0,0.7)",px:2,py:.5,borderRadius:"4px",pointerEvents:"none",children:i.jsx(w,{fontSize:"10px",color:"#fff",fontWeight:600,children:"ORIGINAL"})}),i.jsx(I,{position:"absolute",top:2,right:2,bg:"rgba(168, 85, 247, 0.8)",px:2,py:.5,borderRadius:"4px",pointerEvents:"none",children:i.jsx(w,{fontSize:"10px",color:"#fff",fontWeight:600,children:"EFFECT"})})]}),s==="before-after"&&r&&i.jsx(I,{position:"absolute",top:0,left:0,right:0,bottom:0,pointerEvents:"none",children:i.jsx("img",{src:r.src,alt:"Original",style:{width:"100%",height:"100%",objectFit:"cover",opacity:0,transition:"opacity 0.2s"},className:"before-image"})})]}),!r&&!e&&i.jsxs(T,{position:"absolute",top:0,left:0,right:0,bottom:0,align:"center",justify:"center",direction:"column",gap:1,as:"button",cursor:"pointer",onClick:()=>{var b;return(b=_e.current)==null?void 0:b.click()},children:[i.jsx("input",{type:"file",ref:_e,onChange:Te,accept:"image/png,image/jpeg,image/webp,video/mp4,video/webm,video/ogg",style:{display:"none"}}),i.jsx(I,{w:"60px",h:"60px",borderRadius:"16px",display:"flex",alignItems:"center",justifyContent:"center",children:i.jsx(j,{as:Xe,boxSize:8,color:"var(--border-primary)"})}),i.jsxs(w,{fontSize:"14px",color:"var(--text-muted)",textAlign:"center",children:["Upload an image/video",i.jsx("br",{}),"to get started"]})]}),i.jsxs(T,{position:"absolute",bottom:4,left:"50%",transform:"translateX(-50%)",gap:1,bg:"rgba(13, 7, 22, 0.9)",borderRadius:"8px",border:"1px solid var(--border-primary)",p:1,align:"center",children:[t==="video"&&e&&i.jsxs(i.Fragment,{children:[i.jsx(T,{as:"button",align:"center",justify:"center",w:7,h:7,borderRadius:"4px",cursor:R?"not-allowed":"pointer",bg:"rgba(168, 85, 247, 0.2)",onClick:R?void 0:_,transition:"all 0.15s",_hover:{bg:R?"rgba(168, 85, 247, 0.2)":"rgba(168, 85, 247, 0.4)"},opacity:R?.5:1,children:i.jsx(j,{as:u?uo:mo,boxSize:4,color:"var(--color-accent)"})}),i.jsxs(T,{align:"center",gap:2,px:2,minW:"180px",opacity:R?.5:1,children:[i.jsx(w,{fontSize:"10px",color:"var(--text-muted)",fontFamily:"mono",minW:"32px",children:tt(d)}),i.jsx(hr,{value:[d],onValueChange:R?void 0:({value:b})=>E(b[0]),min:0,max:p||1,step:.1,flex:1,disabled:R,children:i.jsxs(yr,{css:{cursor:R?"not-allowed":"pointer"},children:[i.jsx(gr,{bg:"var(--bg-elevated)",h:"4px",borderRadius:"2px",children:i.jsx(pr,{bg:"var(--color-primary)"})}),i.jsx(vr,{index:0,boxSize:2.5,bg:"#fff",borderRadius:"full",css:{display:R?"none":"block"}})]})}),i.jsx(w,{fontSize:"10px",color:"var(--text-muted)",fontFamily:"mono",minW:"32px",children:tt(p)})]}),i.jsx(I,{w:"1px",h:5,bg:"var(--border-primary)",mx:1})]}),i.jsx(Me,{icon:No,onClick:()=>F(b=>Math.max(b*.8,.1))}),i.jsx(T,{align:"center",justify:"center",px:2,minW:"50px",children:i.jsxs(w,{fontSize:"11px",color:"var(--text-muted)",fontFamily:"mono",children:[Math.round(P*100),"%"]})}),i.jsx(Me,{icon:Uo,onClick:()=>F(b=>Math.min(b*1.2,10))}),i.jsx(I,{w:"1px",h:5,bg:"var(--border-primary)",mx:1}),i.jsx(Me,{icon:_t,onClick:be}),t!=="video"&&i.jsxs(i.Fragment,{children:[i.jsx(I,{w:"1px",h:5,bg:"var(--border-primary)",mx:1}),i.jsx(Me,{icon:it,isActive:s==="preview",onClick:()=>c("preview")}),i.jsx(Me,{icon:Eo,isActive:s==="split",onClick:()=>c("split")})]})]}),i.jsx(w,{position:"absolute",bottom:4,right:4,fontSize:"10px",color:"var(--border-primary)",display:{base:"none",lg:"block"},children:"Scroll to zoom • Space + Drag to pan"})]})}const Me=({icon:r,onClick:e,isActive:t})=>i.jsx(T,{as:"button",align:"center",justify:"center",w:7,h:7,borderRadius:"4px",cursor:"pointer",bg:t?"rgba(168, 85, 247, 0.2)":"transparent",onClick:e,transition:"all 0.15s",_hover:{bg:t?"rgba(168, 85, 247, 0.3)":"rgba(255,255,255,0.1)"},children:i.jsx(j,{as:r,boxSize:4,color:t?"var(--color-accent)":"var(--text-muted)"})}),M=`
  attribute vec2 a_position;
  attribute vec2 a_texCoord;
  uniform float u_flipY;
  varying vec2 v_texCoord;

  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
    // When u_flipY is -1.0, we flip the texture Y coordinate
    // This corrects for the difference between image coordinates (top-left origin)
    // and WebGL coordinates (bottom-left origin)
    v_texCoord = vec2(a_texCoord.x, u_flipY < 0.0 ? 1.0 - a_texCoord.y : a_texCoord.y);
  }
`,Oi=`
  precision highp float;

  uniform sampler2D u_image;
  varying vec2 v_texCoord;

  void main() {
    gl_FragColor = texture2D(u_image, v_texCoord);
  }
`,Ni=`
  precision highp float;

  uniform sampler2D u_image;
  uniform float u_intensity;
  uniform float u_scale;
  uniform float u_seed;
  uniform bool u_monochrome;
  uniform int u_blendMode;
  uniform vec2 u_resolution;

  varying vec2 v_texCoord;

  // High-quality hash function for noise generation
  float hash12(vec2 p) {
    vec3 p3 = fract(vec3(p.xyx) * 0.1031);
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.x + p3.y) * p3.z);
  }

  // 2D noise function with smooth interpolation
  float noise2D(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);

    // Smoothstep for smoother interpolation
    vec2 u = f * f * (3.0 - 2.0 * f);

    // Four corners
    float a = hash12(i);
    float b = hash12(i + vec2(1.0, 0.0));
    float c = hash12(i + vec2(0.0, 1.0));
    float d = hash12(i + vec2(1.0, 1.0));

    return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
  }

  // Multi-octave noise for more natural film grain texture
  float filmGrain(vec2 uv, float seed) {
    float grain = 0.0;
    float amplitude = 1.0;
    float frequency = 1.0;

    for (int i = 0; i < 3; i++) {
      grain += amplitude * noise2D(uv * frequency + seed);
      amplitude *= 0.5;
      frequency *= 2.0;
    }

    return grain / 1.75; // Normalize to 0-1 range
  }

  // Blend modes
  vec3 blendOverlay(vec3 base, vec3 blend) {
    return mix(
      2.0 * base * blend,
      1.0 - 2.0 * (1.0 - base) * (1.0 - blend),
      step(0.5, base)
    );
  }

  vec3 blendSoftLight(vec3 base, vec3 blend) {
    return mix(
      base - (1.0 - 2.0 * blend) * base * (1.0 - base),
      base + (2.0 * blend - 1.0) * (sqrt(base) - base),
      step(0.5, blend)
    );
  }

  vec3 blendMultiply(vec3 base, vec3 blend) {
    return base * blend;
  }

  vec3 blendScreen(vec3 base, vec3 blend) {
    return 1.0 - (1.0 - base) * (1.0 - blend);
  }

  vec3 applyBlend(vec3 base, vec3 blend, int mode) {
    if (mode == 0) return blendOverlay(base, blend);
    if (mode == 1) return blendSoftLight(base, blend);
    if (mode == 2) return blendMultiply(base, blend);
    if (mode == 3) return blendScreen(base, blend);
    return base;
  }

  void main() {
    vec4 color = texture2D(u_image, v_texCoord);

    // Calculate grain coordinates with proper scaling
    vec2 grainCoord = v_texCoord * u_resolution / u_scale;

    vec3 grain;
    if (u_monochrome) {
      float g = filmGrain(grainCoord, u_seed);
      grain = vec3(g);
    } else {
      grain = vec3(
        filmGrain(grainCoord, u_seed),
        filmGrain(grainCoord, u_seed + 100.0),
        filmGrain(grainCoord, u_seed + 200.0)
      );
    }

    // Apply blend mode
    vec3 blended = applyBlend(color.rgb, grain, u_blendMode);

    // Mix based on intensity
    color.rgb = mix(color.rgb, blended, u_intensity);

    gl_FragColor = color;
  }
`,zi=`
  precision highp float;

  uniform sampler2D u_image;
  uniform float u_intensity;
  uniform float u_angle;
  uniform bool u_radial;
  uniform vec2 u_resolution;

  varying vec2 v_texCoord;

  #define PI 3.14159265359
  #define SAMPLES 8

  // Attempt to approximate spectral colors across samples
  vec3 spectralWeight(float t) {
    // t goes from -1 (red end) to +1 (blue end)
    // Approximate prism dispersion: red shifts one way, blue the other
    float r = smoothstep(0.0, 0.7, -t + 0.5);
    float g = 1.0 - abs(t) * 0.8;
    float b = smoothstep(0.0, 0.7, t + 0.5);
    return vec3(r, g, b);
  }

  void main() {
    vec2 center = vec2(0.5);
    vec2 dir;

    if (u_radial) {
      dir = normalize(v_texCoord - center + 0.0001) * u_intensity;
    } else {
      float angle = u_angle * PI / 180.0;
      dir = vec2(cos(angle), sin(angle)) * u_intensity;
    }

    // Multi-sample spectral dispersion
    vec3 color = vec3(0.0);
    vec3 totalWeight = vec3(0.0);

    for (int i = 0; i < SAMPLES; i++) {
      float t = (float(i) / float(SAMPLES - 1)) * 2.0 - 1.0; // -1 to +1
      vec2 offset = dir * t;
      vec3 sampleColor = texture2D(u_image, v_texCoord + offset).rgb;
      vec3 w = spectralWeight(t);
      color += sampleColor * w;
      totalWeight += w;
    }

    color /= totalWeight;
    float a = texture2D(u_image, v_texCoord).a;

    gl_FragColor = vec4(color, a);
  }
`,Fi=`
  precision highp float;

  uniform sampler2D u_image;
  uniform float u_intensity;
  uniform float u_size;
  uniform float u_softness;
  uniform vec3 u_color;
  uniform vec2 u_resolution;

  varying vec2 v_texCoord;

  void main() {
    vec4 color = texture2D(u_image, v_texCoord);

    vec2 center = vec2(0.5);
    float dist = distance(v_texCoord, center);

    // Calculate vignette
    float radius = u_size;
    float soft = u_softness * 0.5 + 0.001;
    float vignette = smoothstep(radius, radius - soft, dist);

    // Apply vignette
    color.rgb = mix(u_color, color.rgb, mix(1.0, vignette, u_intensity));

    gl_FragColor = color;
  }
`,Gi=`
  precision highp float;

  uniform sampler2D u_image;
  uniform float u_spacing;
  uniform float u_thickness;
  uniform float u_opacity;
  uniform bool u_horizontal;
  uniform float u_offset;
  uniform vec2 u_resolution;

  varying vec2 v_texCoord;

  void main() {
    vec4 color = texture2D(u_image, v_texCoord);

    vec2 pos = v_texCoord * u_resolution;
    float coord = u_horizontal ? pos.y : pos.x;
    coord += u_offset;

    float line = mod(coord, u_spacing);
    float scanline = step(u_thickness, line);

    color.rgb *= mix(1.0 - u_opacity, 1.0, scanline);

    gl_FragColor = color;
  }
`,Bi=`
  precision highp float;

  uniform sampler2D u_image;
  uniform float u_size;
  uniform bool u_maintainAspect;
  uniform vec2 u_resolution;

  varying vec2 v_texCoord;

  void main() {
    vec2 pixelSize;

    if (u_maintainAspect) {
      // Square pixels: equal block size in device pixels on both axes
      pixelSize = vec2(u_size) / u_resolution;
    } else {
      // Stretch to fill: same number of divisions (in UV) on each axis
      float minDim = min(u_resolution.x, u_resolution.y);
      float ps = u_size / minDim;
      pixelSize = vec2(ps);
    }

    vec2 coord = floor(v_texCoord / pixelSize + 0.5) * pixelSize;

    gl_FragColor = texture2D(u_image, coord);
  }
`,Hi=`
  precision highp float;

  uniform sampler2D u_image;
  uniform float u_radius;
  uniform int u_type; // 0 = gaussian, 1 = radial, 2 = motion
  uniform float u_angle;
  uniform vec2 u_resolution;

  varying vec2 v_texCoord;

  #define PI 3.14159265359

  vec4 gaussianBlur(vec2 uv, float radius) {
    vec4 color = vec4(0.0);
    vec2 texelSize = 1.0 / u_resolution;
    float total = 0.0;
    float sigma = max(radius * 0.5, 0.5);
    float invSigma2 = -0.5 / (sigma * sigma);

    for (int x = -7; x <= 7; x++) {
      for (int y = -7; y <= 7; y++) {
        float dist2 = float(x*x + y*y);
        if (dist2 > radius * radius) continue;
        float weight = exp(dist2 * invSigma2);
        vec2 offset = vec2(float(x), float(y)) * texelSize;
        color += texture2D(u_image, uv + offset) * weight;
        total += weight;
      }
    }

    return color / total;
  }

  vec4 radialBlur(vec2 uv, float radius) {
    vec4 color = vec4(0.0);
    vec2 center = vec2(0.5);
    vec2 dir = uv - center;
    float total = 0.0;

    const float samples = 20.0;
    for (float i = 0.0; i < 20.0; i++) {
      float t = i / samples * radius * 0.01;
      float weight = 1.0 - i / samples;
      color += texture2D(u_image, uv - dir * t) * weight;
      total += weight;
    }

    return color / total;
  }

  vec4 motionBlur(vec2 uv, float radius, float angle) {
    vec4 color = vec4(0.0);
    vec2 dir = vec2(cos(angle * PI / 180.0), sin(angle * PI / 180.0));
    vec2 texelSize = 1.0 / u_resolution;
    float total = 0.0;
    float sigma = max(radius * 0.5, 0.5);
    float invSigma2 = -0.5 / (sigma * sigma);

    for (float i = -7.0; i <= 7.0; i++) {
      float dist2 = i * i;
      if (dist2 > radius * radius) continue;
      float weight = exp(dist2 * invSigma2);
      vec2 offset = dir * texelSize * i * radius / 7.0;
      color += texture2D(u_image, uv + offset) * weight;
      total += weight;
    }

    return color / total;
  }

  void main() {
    if (u_type == 0) {
      gl_FragColor = gaussianBlur(v_texCoord, u_radius);
    } else if (u_type == 1) {
      gl_FragColor = radialBlur(v_texCoord, u_radius);
    } else {
      gl_FragColor = motionBlur(v_texCoord, u_radius, u_angle);
    }
  }
`,Vi=`
  precision highp float;

  uniform sampler2D u_image;
  uniform int u_type; // 0 = wave, 1 = swirl, 2 = bulge
  uniform float u_amplitude;
  uniform float u_frequency;
  uniform vec2 u_center;
  uniform vec2 u_resolution;

  varying vec2 v_texCoord;

  #define PI 3.14159265359

  vec2 waveDistortion(vec2 uv) {
    vec2 offset;
    offset.x = sin(uv.y * u_frequency * PI * 2.0) * u_amplitude / u_resolution.x;
    offset.y = sin(uv.x * u_frequency * PI * 2.0) * u_amplitude / u_resolution.y;
    return uv + offset;
  }

  vec2 swirlDistortion(vec2 uv) {
    vec2 centered = uv - u_center;
    float dist = length(centered);
    float angle = atan(centered.y, centered.x);

    float swirl = u_amplitude * 0.1 * (1.0 - dist);
    swirl = max(0.0, swirl);
    angle += swirl;

    return u_center + vec2(cos(angle), sin(angle)) * dist;
  }

  vec2 bulgeDistortion(vec2 uv) {
    vec2 centered = uv - u_center;
    float dist = length(centered);
    float radius = 0.5;

    if (dist < radius) {
      float percent = dist / radius;
      float bulge = sin(percent * PI * 0.5);
      float amount = 1.0 + u_amplitude * 0.01 * (1.0 - bulge);
      centered *= amount;
    }

    return u_center + centered;
  }

  void main() {
    vec2 distorted;

    if (u_type == 0) {
      distorted = waveDistortion(v_texCoord);
    } else if (u_type == 1) {
      distorted = swirlDistortion(v_texCoord);
    } else {
      distorted = bulgeDistortion(v_texCoord);
    }

    // Clamp to valid texture coordinates
    distorted = clamp(distorted, 0.0, 1.0);

    gl_FragColor = texture2D(u_image, distorted);
  }
`,Xi=`
  precision highp float;

  uniform sampler2D u_image;
  uniform int u_levels;
  uniform bool u_preserveHue;

  varying vec2 v_texCoord;

  vec3 rgb2hsv(vec3 c) {
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
    vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));
    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
  }

  vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
  }

  void main() {
    vec4 color = texture2D(u_image, v_texCoord);
    float lvl = float(u_levels);

    if (u_preserveHue) {
      vec3 hsv = rgb2hsv(color.rgb);
      hsv.z = floor(hsv.z * lvl + 0.5) / lvl;
      hsv.y = floor(hsv.y * lvl + 0.5) / lvl;
      color.rgb = hsv2rgb(hsv);
    } else {
      color.rgb = floor(color.rgb * lvl + 0.5) / lvl;
    }

    gl_FragColor = color;
  }
`,Wi=`
  precision highp float;

  uniform sampler2D u_image;
  uniform float u_strength;
  uniform float u_threshold;
  uniform bool u_invert;
  uniform bool u_colorize;
  uniform vec2 u_resolution;

  varying vec2 v_texCoord;

  void main() {
    vec2 texel = 1.0 / u_resolution;
    vec4 color = texture2D(u_image, v_texCoord);

    float tl = dot(texture2D(u_image, v_texCoord + vec2(-1.0, -1.0) * texel).rgb, vec3(0.299, 0.587, 0.114));
    float t  = dot(texture2D(u_image, v_texCoord + vec2( 0.0, -1.0) * texel).rgb, vec3(0.299, 0.587, 0.114));
    float tr = dot(texture2D(u_image, v_texCoord + vec2( 1.0, -1.0) * texel).rgb, vec3(0.299, 0.587, 0.114));
    float l  = dot(texture2D(u_image, v_texCoord + vec2(-1.0,  0.0) * texel).rgb, vec3(0.299, 0.587, 0.114));
    float r  = dot(texture2D(u_image, v_texCoord + vec2( 1.0,  0.0) * texel).rgb, vec3(0.299, 0.587, 0.114));
    float bl = dot(texture2D(u_image, v_texCoord + vec2(-1.0,  1.0) * texel).rgb, vec3(0.299, 0.587, 0.114));
    float b  = dot(texture2D(u_image, v_texCoord + vec2( 0.0,  1.0) * texel).rgb, vec3(0.299, 0.587, 0.114));
    float br = dot(texture2D(u_image, v_texCoord + vec2( 1.0,  1.0) * texel).rgb, vec3(0.299, 0.587, 0.114));

    float gx = -tl - 2.0*l - bl + tr + 2.0*r + br;
    float gy = -tl - 2.0*t - tr + bl + 2.0*b + br;

    float edge = sqrt(gx*gx + gy*gy) * u_strength;
    edge = smoothstep(u_threshold, u_threshold + 0.1, edge);

    if (u_invert) edge = 1.0 - edge;

    vec3 result;
    if (u_colorize) {
      result = color.rgb * edge;
    } else {
      result = vec3(edge);
    }

    gl_FragColor = vec4(result, color.a);
  }
`,qi=`
  precision highp float;

  uniform sampler2D u_image;
  uniform float u_intensity;
  uniform float u_size;
  uniform float u_luminanceResponse;
  uniform bool u_colored;
  uniform float u_seed;
  uniform vec2 u_resolution;

  varying vec2 v_texCoord;

  float hash(vec2 p) {
    vec3 p3 = fract(vec3(p.xyx) * 0.1031);
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.x + p3.y) * p3.z);
  }

  float grain(vec2 uv, float seed) {
    return hash(uv + seed) * 2.0 - 1.0;
  }

  void main() {
    vec4 color = texture2D(u_image, v_texCoord);

    float luma = dot(color.rgb, vec3(0.299, 0.587, 0.114));

    float response = mix(1.0, 1.0 - luma, u_luminanceResponse);

    vec2 grainUV = v_texCoord * u_resolution / u_size;

    vec3 grainValue;
    if (u_colored) {
      grainValue = vec3(
        grain(grainUV, u_seed),
        grain(grainUV, u_seed + 100.0),
        grain(grainUV, u_seed + 200.0)
      );
    } else {
      float g = grain(grainUV, u_seed);
      grainValue = vec3(g);
    }

    color.rgb += grainValue * u_intensity * response;
    color.rgb = clamp(color.rgb, 0.0, 1.0);

    gl_FragColor = color;
  }
`,$i=`
  precision highp float;

  uniform sampler2D u_image;
  uniform float u_brightness;
  uniform float u_contrast;
  uniform float u_saturation;
  uniform float u_temperature;
  uniform float u_tint;
  uniform vec3 u_shadows;
  uniform vec3 u_highlights;
  uniform float u_shadowInfluence;
  uniform float u_highlightInfluence;

  varying vec2 v_texCoord;

  vec3 rgb2hsv(vec3 c) {
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
    vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));
    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
  }

  vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
  }

  void main() {
    vec4 color = texture2D(u_image, v_texCoord);

    // Brightness: multiplicative feels more natural than additive
    color.rgb *= 1.0 + u_brightness;

    // Contrast: pivot around midpoint
    color.rgb = (color.rgb - 0.5) * (1.0 + u_contrast) + 0.5;

    // Saturation
    float luma = dot(color.rgb, vec3(0.299, 0.587, 0.114));
    color.rgb = mix(vec3(luma), color.rgb, 1.0 + u_saturation);

    // Temperature: shift red-blue balance
    color.r += u_temperature * 0.1;
    color.b -= u_temperature * 0.1;

    // Tint: shift green-magenta balance
    color.g += u_tint * 0.1;

    // Recalculate luma after adjustments for accurate shadow/highlight masks
    luma = dot(clamp(color.rgb, 0.0, 1.0), vec3(0.299, 0.587, 0.114));

    // Shadow tinting: mix toward shadow color in dark areas
    float shadowMask = 1.0 - smoothstep(0.0, 0.5, luma);
    color.rgb = mix(color.rgb, mix(color.rgb, u_shadows * luma * 2.0, 0.5), shadowMask * u_shadowInfluence);

    // Highlight tinting: mix toward highlight color in bright areas
    float highlightMask = smoothstep(0.5, 1.0, luma);
    color.rgb = mix(color.rgb, mix(color.rgb, u_highlights * luma, 0.5), highlightMask * u_highlightInfluence);

    color.rgb = clamp(color.rgb, 0.0, 1.0);

    gl_FragColor = color;
  }
`,Yi=`
  precision highp float;

  uniform sampler2D u_image;
  uniform int u_method;
  uniform int u_levels;
  uniform float u_threshold;
  uniform vec2 u_resolution;
  uniform float u_scale;

  varying vec2 v_texCoord;

  float bayer2(vec2 pos) {
    pos = floor(pos);
    float x = mod(pos.x, 2.0);
    float y = mod(pos.y, 2.0);
    return mod(x + y * 2.0, 4.0) / 4.0 + 1.0 / 8.0;
  }

  float bayer4(vec2 pos) {
    pos = floor(pos);
    return bayer2(pos * 0.5) * 0.25 + bayer2(pos);
  }

  float bayer8(vec2 pos) {
    pos = floor(pos);
    return bayer4(pos * 0.5) * 0.25 + bayer2(pos);
  }

  float getBayerThreshold(vec2 pos, int method) {
    if (method == 0) return bayer2(pos) - 0.5;
    if (method == 1) return bayer4(pos) - 0.5;
    return bayer8(pos) - 0.5;
  }

  vec3 quantize(vec3 color, int levels) {
    float lvl = float(levels - 1);
    return floor(color * lvl + 0.5) / lvl;
  }

  void main() {
    vec4 color = texture2D(u_image, v_texCoord);

    vec2 pixelPos = v_texCoord * u_resolution / u_scale;

    float threshold = getBayerThreshold(pixelPos, u_method);

    float spread = u_threshold / float(u_levels);
    vec3 dithered = color.rgb + threshold * spread;

    vec3 result = quantize(dithered, u_levels);

    gl_FragColor = vec4(clamp(result, 0.0, 1.0), color.a);
  }
`,Ki=`
  precision highp float;

  uniform sampler2D u_image;
  uniform float u_gridSize;
  uniform float u_dotScale;
  uniform float u_angle;
  uniform int u_shape;
  uniform float u_softness;
  uniform float u_contrast;
  uniform bool u_invert;
  uniform int u_colorMode;
  uniform vec3 u_dotColor;
  uniform vec3 u_backgroundColor;
  uniform float u_mixOriginal;
  uniform vec2 u_resolution;

  varying vec2 v_texCoord;

  #define PI 3.14159265359

  #define SHAPE_CIRCLE 0
  #define SHAPE_SQUARE 1
  #define SHAPE_DIAMOND 2
  #define SHAPE_LINE 3
  #define SHAPE_ELLIPSE 4
  #define SHAPE_CROSS 5
  #define SHAPE_RING 6

  vec2 rotate2D(vec2 p, float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return vec2(c * p.x - s * p.y, s * p.x + c * p.y);
  }

  // Shape distance functions (return 0 at center, 1 at edge)
  float sdCircle(vec2 p) {
    return length(p) * 2.0;
  }

  float sdSquare(vec2 p) {
    vec2 d = abs(p);
    return max(d.x, d.y) * 2.0;
  }

  float sdDiamond(vec2 p) {
    vec2 d = abs(p);
    return (d.x + d.y);
  }

  float sdLine(vec2 p) {
    return abs(p.y) * 2.0;
  }

  float sdEllipse(vec2 p) {
    return length(p * vec2(1.0, 1.6)) * 2.0;
  }

  float sdCross(vec2 p) {
    vec2 d = abs(p);
    return min(d.x, d.y) * 4.0;
  }

  float sdRing(vec2 p) {
    float d = length(p) * 2.0;
    return abs(d - 0.7) * 3.0;
  }

  float getShape(vec2 p, int shape) {
    if (shape == SHAPE_CIRCLE) return sdCircle(p);
    if (shape == SHAPE_SQUARE) return sdSquare(p);
    if (shape == SHAPE_DIAMOND) return sdDiamond(p);
    if (shape == SHAPE_LINE) return sdLine(p);
    if (shape == SHAPE_ELLIPSE) return sdEllipse(p);
    if (shape == SHAPE_CROSS) return sdCross(p);
    if (shape == SHAPE_RING) return sdRing(p);
    return sdCircle(p);
  }

  // CMYK conversion
  vec4 rgb2cmyk(vec3 rgb) {
    float k = 1.0 - max(max(rgb.r, rgb.g), rgb.b);
    float invK = 1.0 / (1.0 - k + 0.0001);
    float c = (1.0 - rgb.r - k) * invK;
    float m = (1.0 - rgb.g - k) * invK;
    float y = (1.0 - rgb.b - k) * invK;
    return vec4(c, m, y, k);
  }

  vec3 cmyk2rgb(vec4 cmyk) {
    float invK = 1.0 - cmyk.w;
    return vec3(
      (1.0 - cmyk.x) * invK,
      (1.0 - cmyk.y) * invK,
      (1.0 - cmyk.z) * invK
    );
  }

  float halftonePattern(vec2 pos, float intensity, float angle, int shape, float softness, float dotScale) {
    // Rotate the coordinate space
    vec2 rotated = rotate2D(pos, angle);

    // Get position within cell (-0.5 to 0.5)
    vec2 cell = fract(rotated) - 0.5;

    // Calculate shape distance
    float shapeDist = getShape(cell, shape);

    // The dot size is based on intensity - darker areas = bigger dots
    float dotSize = sqrt(intensity) * dotScale;

    // Antialiased edge
    float aa = softness * 0.15 + 0.02;
    float pattern = smoothstep(dotSize + aa, dotSize - aa, shapeDist);

    return pattern;
  }

  void main() {
    vec4 originalColor = texture2D(u_image, v_texCoord);

    // Calculate grid coordinates
    float aspectRatio = u_resolution.x / u_resolution.y;
    vec2 gridCoord = v_texCoord * vec2(u_resolution.x / u_gridSize, u_resolution.y / u_gridSize);

    // Sample color at cell center for more accurate color representation
    vec2 cellSize = u_gridSize / u_resolution;
    vec2 cellCenter = (floor(v_texCoord / cellSize) + 0.5) * cellSize;
    vec4 sampledColor = texture2D(u_image, cellCenter);

    // Apply contrast
    vec3 adjusted = sampledColor.rgb;
    adjusted = (adjusted - 0.5) * (1.0 + u_contrast) + 0.5;
    adjusted = clamp(adjusted, 0.0, 1.0);

    float angleRad = u_angle * PI / 180.0;

    vec3 result;

    if (u_colorMode == 0) {
      // Original colors mode - use image colors
      float r = halftonePattern(gridCoord, adjusted.r, angleRad, u_shape, u_softness, u_dotScale);
      float g = halftonePattern(gridCoord, adjusted.g, angleRad + 0.52, u_shape, u_softness, u_dotScale);
      float b = halftonePattern(gridCoord, adjusted.b, angleRad + 1.05, u_shape, u_softness, u_dotScale);

      if (u_invert) {
        result = vec3(1.0 - r, 1.0 - g, 1.0 - b);
      } else {
        result = vec3(r, g, b);
      }
    } else if (u_colorMode == 1) {
      // Monochrome mode
      float luma = dot(adjusted, vec3(0.299, 0.587, 0.114));
      float pattern = halftonePattern(gridCoord, luma, angleRad, u_shape, u_softness, u_dotScale);

      if (u_invert) pattern = 1.0 - pattern;

      result = mix(u_backgroundColor, u_dotColor, pattern);
    } else if (u_colorMode == 2) {
      // Duotone mode - single pattern with custom colors
      float luma = dot(adjusted, vec3(0.299, 0.587, 0.114));
      float pattern = halftonePattern(gridCoord, luma, angleRad, u_shape, u_softness, u_dotScale);

      if (u_invert) pattern = 1.0 - pattern;

      result = mix(u_backgroundColor, u_dotColor, pattern);
    } else {
      // CMYK mode
      vec4 cmyk = rgb2cmyk(adjusted);

      // Traditional CMYK halftone angles
      float cAngle = angleRad + 0.26;  // ~15°
      float mAngle = angleRad + 1.31;  // ~75°
      float yAngle = angleRad;         // 0°
      float kAngle = angleRad + 0.79;  // ~45°

      float c = halftonePattern(gridCoord, cmyk.x, cAngle, u_shape, u_softness, u_dotScale);
      float m = halftonePattern(gridCoord, cmyk.y, mAngle, u_shape, u_softness, u_dotScale);
      float y = halftonePattern(gridCoord, cmyk.z, yAngle, u_shape, u_softness, u_dotScale);
      float k = halftonePattern(gridCoord, cmyk.w, kAngle, u_shape, u_softness, u_dotScale);

      if (u_invert) {
        c = 1.0 - c;
        m = 1.0 - m;
        y = 1.0 - y;
        k = 1.0 - k;
      }

      result = cmyk2rgb(vec4(c, m, y, k));
    }

    // Mix with original color if desired
    result = mix(result, originalColor.rgb, u_mixOriginal);

    gl_FragColor = vec4(result, originalColor.a);
  }
`,Zi=`
  precision highp float;

  uniform sampler2D u_image;
  uniform sampler2D u_charAtlas;
  uniform float u_cellSize;
  uniform bool u_color;
  uniform bool u_invert;
  uniform int u_charCount;
  uniform vec2 u_resolution;
  uniform float u_brightness;
  uniform float u_contrast;
  uniform float u_gamma;
  uniform float u_charBrightness;
  uniform vec3 u_charColor;
  uniform vec3 u_backgroundColor;
  uniform float u_backgroundBlend;
  uniform float u_edgeEnhance;
  uniform float u_cellGap;

  varying vec2 v_texCoord;

  float getEdge(vec2 uv, vec2 texelSize) {
    float tl = dot(texture2D(u_image, uv + vec2(-1.0, -1.0) * texelSize).rgb, vec3(0.299, 0.587, 0.114));
    float t  = dot(texture2D(u_image, uv + vec2( 0.0, -1.0) * texelSize).rgb, vec3(0.299, 0.587, 0.114));
    float tr = dot(texture2D(u_image, uv + vec2( 1.0, -1.0) * texelSize).rgb, vec3(0.299, 0.587, 0.114));
    float l  = dot(texture2D(u_image, uv + vec2(-1.0,  0.0) * texelSize).rgb, vec3(0.299, 0.587, 0.114));
    float r  = dot(texture2D(u_image, uv + vec2( 1.0,  0.0) * texelSize).rgb, vec3(0.299, 0.587, 0.114));
    float bl = dot(texture2D(u_image, uv + vec2(-1.0,  1.0) * texelSize).rgb, vec3(0.299, 0.587, 0.114));
    float b  = dot(texture2D(u_image, uv + vec2( 0.0,  1.0) * texelSize).rgb, vec3(0.299, 0.587, 0.114));
    float br = dot(texture2D(u_image, uv + vec2( 1.0,  1.0) * texelSize).rgb, vec3(0.299, 0.587, 0.114));

    float gx = -tl - 2.0*l - bl + tr + 2.0*r + br;
    float gy = -tl - 2.0*t - tr + bl + 2.0*b + br;

    return sqrt(gx*gx + gy*gy);
  }

  void main() {
    vec2 cellCount = floor(u_resolution / u_cellSize);
    vec2 cellIndex = floor(v_texCoord * cellCount);
    vec2 cellUV = fract(v_texCoord * cellCount);

    // Cell gap - discard pixels in gap region
    if (u_cellGap > 0.0) {
      float halfGap = u_cellGap * 0.5;
      if (cellUV.x < halfGap || cellUV.x > 1.0 - halfGap ||
          cellUV.y < halfGap || cellUV.y > 1.0 - halfGap) {
        gl_FragColor = vec4(u_backgroundColor, 1.0);
        return;
      }
      // Remap cellUV to fill remaining space
      cellUV = (cellUV - halfGap) / (1.0 - u_cellGap);
    }

    vec2 sampleUV = (cellIndex + 0.5) / cellCount;
    vec4 sampleColor = texture2D(u_image, sampleUV);

    vec3 adjustedColor = sampleColor.rgb;
    adjustedColor = (adjustedColor - 0.5) * u_contrast + 0.5;
    adjustedColor = adjustedColor * u_brightness;
    adjustedColor = clamp(adjustedColor, 0.0, 1.0);

    float luma = dot(adjustedColor, vec3(0.299, 0.587, 0.114));

    // Apply gamma curve for tone mapping
    luma = pow(luma, 1.0 / u_gamma);

    if (u_edgeEnhance > 0.0) {
      vec2 texelSize = 1.0 / u_resolution;
      float edge = getEdge(sampleUV, texelSize);
      luma = mix(luma, luma + edge * 0.5, u_edgeEnhance);
      luma = clamp(luma, 0.0, 1.0);
    }

    if (u_invert) luma = 1.0 - luma;

    float charIdx = floor(luma * float(u_charCount - 1) + 0.5);
    charIdx = clamp(charIdx, 0.0, float(u_charCount - 1));

    vec2 atlasUV = vec2(
      (charIdx + cellUV.x) / float(u_charCount),
      1.0 - cellUV.y
    );

    vec4 charSample = texture2D(u_charAtlas, atlasUV);
    float charAlpha = clamp(charSample.r * u_charBrightness, 0.0, 1.0);

    // Character color: use original image color or custom char color
    vec3 charColor;
    if (u_color) {
      charColor = adjustedColor * charAlpha;
    } else {
      charColor = u_charColor * charAlpha;
    }

    // Background: blend between backgroundColor and original image
    vec3 bgColor = mix(u_backgroundColor, sampleColor.rgb, u_backgroundBlend);

    // Composite: character on top of background
    vec3 finalColor = mix(bgColor, charColor, charAlpha);

    gl_FragColor = vec4(finalColor, sampleColor.a);
  }
`,Qi=`
  precision highp float;

  uniform sampler2D u_image;
  uniform sampler2D u_overlay;
  uniform float u_intensity;
  uniform float u_scale;
  uniform float u_rotation;
  uniform int u_blendMode;
  uniform vec2 u_resolution;
  uniform bool u_hasOverlay;

  varying vec2 v_texCoord;

  #define PI 3.14159265359

  vec2 rotate2D(vec2 p, float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return vec2(c * p.x - s * p.y, s * p.x + c * p.y);
  }

  vec3 blendOverlay(vec3 base, vec3 blend) {
    return mix(
      2.0 * base * blend,
      1.0 - 2.0 * (1.0 - base) * (1.0 - blend),
      step(0.5, base)
    );
  }

  vec3 blendSoftLight(vec3 base, vec3 blend) {
    return mix(
      base - (1.0 - 2.0 * blend) * base * (1.0 - base),
      base + (2.0 * blend - 1.0) * (sqrt(base) - base),
      step(0.5, blend)
    );
  }

  vec3 blendMultiply(vec3 base, vec3 blend) {
    return base * blend;
  }

  vec3 blendScreen(vec3 base, vec3 blend) {
    return 1.0 - (1.0 - base) * (1.0 - blend);
  }

  vec3 applyBlend(vec3 base, vec3 blend, int mode) {
    if (mode == 0) return blendOverlay(base, blend);
    if (mode == 1) return blendSoftLight(base, blend);
    if (mode == 2) return blendMultiply(base, blend);
    if (mode == 3) return blendScreen(base, blend);
    return base;
  }

  void main() {
    vec4 color = texture2D(u_image, v_texCoord);

    if (u_hasOverlay) {
      // Calculate overlay coordinates with rotation and scale
      vec2 center = vec2(0.5);
      vec2 overlayCoord = v_texCoord - center;
      overlayCoord = rotate2D(overlayCoord, u_rotation * PI / 180.0);
      overlayCoord = overlayCoord / u_scale + center;
      overlayCoord = fract(overlayCoord); // Tile the texture

      vec4 overlay = texture2D(u_overlay, overlayCoord);
      vec3 blended = applyBlend(color.rgb, overlay.rgb, u_blendMode);
      color.rgb = mix(color.rgb, blended, u_intensity * overlay.a);
    }

    gl_FragColor = color;
  }
`,Ji=`
  precision highp float;

  uniform sampler2D u_image;
  uniform float u_intensity;
  uniform float u_sliceCount;
  uniform float u_rgbShift;
  uniform float u_angle;
  uniform float u_seed;
  uniform float u_blockSize;
  uniform bool u_colorShift;
  uniform vec2 u_resolution;

  varying vec2 v_texCoord;

  #define PI 3.14159265359

  float hash(float n) {
    return fract(sin(n) * 43758.5453123);
  }

  float hash2(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  void main() {
    vec2 uv = v_texCoord;

    // Slice-based displacement
    float sliceY = floor(uv.y * u_sliceCount);
    float sliceRand = hash(sliceY + u_seed);
    float sliceActive = step(1.0 - u_intensity, sliceRand);

    // Calculate displacement for this slice
    float displacement = (hash(sliceY * 2.0 + u_seed) - 0.5) * 2.0 * u_intensity * 0.1;
    displacement *= sliceActive;

    // Block-based glitch
    vec2 blockPos = floor(uv / u_blockSize);
    float blockRand = hash2(blockPos + vec2(u_seed));
    float blockActive = step(1.0 - u_intensity * 0.3, blockRand);
    vec2 blockDisp = vec2(
      (hash2(blockPos + vec2(u_seed, 0.0)) - 0.5) * 0.1,
      (hash2(blockPos + vec2(0.0, u_seed)) - 0.5) * 0.05
    ) * blockActive * u_intensity;

    // Apply displacement based on angle
    float angleRad = u_angle * PI / 180.0;
    vec2 dir = vec2(cos(angleRad), sin(angleRad));
    vec2 displaced = uv + dir * displacement + blockDisp;

    // RGB channel separation
    vec2 rgbOffset = dir * u_rgbShift * u_intensity;

    float r, g, b, a;
    if (u_colorShift) {
      r = texture2D(u_image, displaced + rgbOffset).r;
      g = texture2D(u_image, displaced).g;
      b = texture2D(u_image, displaced - rgbOffset).b;
    } else {
      vec3 col = texture2D(u_image, displaced).rgb;
      r = col.r;
      g = col.g;
      b = col.b;
    }
    a = texture2D(u_image, displaced).a;

    // Occasional color corruption
    float corrupt = step(1.0 - u_intensity * 0.1, hash2(blockPos + vec2(u_seed * 2.0)));
    if (corrupt > 0.5) {
      float swap = hash(sliceY + u_seed * 3.0);
      if (swap < 0.33) {
        float temp = r; r = g; g = b; b = temp;
      } else if (swap < 0.66) {
        float temp = r; r = b; b = temp;
      }
    }

    gl_FragColor = vec4(r, g, b, a);
  }
`,en=`
  precision highp float;

  uniform sampler2D u_image;
  uniform float u_curvature;
  uniform float u_scanlineIntensity;
  uniform float u_scanlineCount;
  uniform float u_vignetteIntensity;
  uniform float u_brightness;
  uniform float u_rgbOffset;
  uniform float u_flickerIntensity;
  uniform float u_staticNoise;
  uniform float u_seed;
  uniform vec2 u_resolution;

  varying vec2 v_texCoord;

  #define PI 3.14159265359

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  vec2 curveUV(vec2 uv, float amount) {
    uv = uv * 2.0 - 1.0;
    vec2 offset = abs(uv.yx) / vec2(6.0, 4.0);
    uv = uv + uv * offset * offset * amount;
    uv = uv * 0.5 + 0.5;
    return uv;
  }

  void main() {
    // Apply screen curvature
    vec2 uv = curveUV(v_texCoord, u_curvature);

    // Check if we're outside the curved screen - use transparent
    if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) {
      gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
      return;
    }

    // Sample center for alpha
    vec4 centerSample = texture2D(u_image, uv);

    // RGB phosphor offset (chromatic aberration)
    vec2 rgbOff = vec2(u_rgbOffset, 0.0);
    float r = texture2D(u_image, uv + rgbOff).r;
    float g = texture2D(u_image, uv).g;
    float b = texture2D(u_image, uv - rgbOff).b;
    vec3 color = vec3(r, g, b);

    // Scanlines
    float scanline = sin(uv.y * u_scanlineCount * PI * 2.0) * 0.5 + 0.5;
    scanline = pow(scanline, 1.5);
    color *= 1.0 - u_scanlineIntensity * (1.0 - scanline);

    // RGB phosphor pattern (subtle vertical stripes)
    float phosphor = mod(floor(uv.x * u_resolution.x), 3.0);
    vec3 phosphorMask = vec3(
      phosphor == 0.0 ? 1.0 : 0.7,
      phosphor == 1.0 ? 1.0 : 0.7,
      phosphor == 2.0 ? 1.0 : 0.7
    );
    color *= mix(vec3(1.0), phosphorMask, u_scanlineIntensity * 0.3);

    // Vignette
    vec2 vigUV = uv * (1.0 - uv.yx);
    float vig = vigUV.x * vigUV.y * 15.0;
    vig = pow(vig, u_vignetteIntensity * 0.5);
    color *= vig;

    // Flicker
    float flicker = 1.0 + (hash(vec2(u_seed, 0.0)) - 0.5) * u_flickerIntensity;
    color *= flicker;

    // Static noise
    float noise = (hash(uv * u_resolution + u_seed) - 0.5) * u_staticNoise;
    color += noise;

    // Brightness adjustment
    color *= u_brightness;

    // Preserve original alpha for transparency support
    gl_FragColor = vec4(clamp(color, 0.0, 1.0), centerSample.a);
  }
`,tn=`
  precision highp float;

  uniform sampler2D u_image;
  uniform vec3 u_shadowColor;
  uniform vec3 u_highlightColor;
  uniform float u_contrast;
  uniform float u_intensity;

  varying vec2 v_texCoord;

  void main() {
    vec4 color = texture2D(u_image, v_texCoord);

    // Calculate luminance
    float luma = dot(color.rgb, vec3(0.299, 0.587, 0.114));

    // Apply contrast adjustment
    luma = (luma - 0.5) * u_contrast + 0.5;
    luma = clamp(luma, 0.0, 1.0);

    // Map to duotone gradient
    vec3 duotone = mix(u_shadowColor, u_highlightColor, luma);

    // Blend with original based on intensity
    vec3 result = mix(color.rgb, duotone, u_intensity);

    gl_FragColor = vec4(result, color.a);
  }
`,rn=`
  precision highp float;

  uniform sampler2D u_image;
  uniform int u_radius;
  uniform float u_sharpness;
  uniform vec2 u_resolution;

  varying vec2 v_texCoord;

  void main() {
    vec2 texelSize = 1.0 / u_resolution;
    int r = u_radius;

    // We divide the kernel into 4 overlapping quadrants
    // and find the one with minimum variance
    vec3 sum[4];
    vec3 sumSq[4];
    int count[4];

    for (int i = 0; i < 4; i++) {
      sum[i] = vec3(0.0);
      sumSq[i] = vec3(0.0);
      count[i] = 0;
    }

    // Sample the four quadrants
    for (int dy = -5; dy <= 5; dy++) {
      for (int dx = -5; dx <= 5; dx++) {
        if (abs(float(dx)) > float(r) || abs(float(dy)) > float(r)) continue;

        vec2 offset = vec2(float(dx), float(dy)) * texelSize;
        vec3 sample = texture2D(u_image, v_texCoord + offset).rgb;

        // Determine which quadrant(s) this sample belongs to
        // Using overlapping regions for smoother results
        if (dx <= 0 && dy <= 0) { sum[0] += sample; sumSq[0] += sample * sample; count[0]++; }
        if (dx >= 0 && dy <= 0) { sum[1] += sample; sumSq[1] += sample * sample; count[1]++; }
        if (dx <= 0 && dy >= 0) { sum[2] += sample; sumSq[2] += sample * sample; count[2]++; }
        if (dx >= 0 && dy >= 0) { sum[3] += sample; sumSq[3] += sample * sample; count[3]++; }
      }
    }

    // Find the quadrant with minimum variance
    float minVariance = 1e10;
    vec3 result = vec3(0.0);

    for (int i = 0; i < 4; i++) {
      if (count[i] > 0) {
        vec3 mean = sum[i] / float(count[i]);
        vec3 variance = sumSq[i] / float(count[i]) - mean * mean;
        float totalVariance = variance.r + variance.g + variance.b;

        if (totalVariance < minVariance) {
          minVariance = totalVariance;
          result = mean;
        }
      }
    }

    // Blend with original based on sharpness
    vec4 original = texture2D(u_image, v_texCoord);
    result = mix(original.rgb, result, 1.0 - u_sharpness * 0.5);

    gl_FragColor = vec4(result, original.a);
  }
`,on=`
  precision highp float;

  uniform sampler2D u_image;
  uniform float u_amount;
  uniform vec2 u_center;
  uniform float u_zoom;
  uniform vec2 u_resolution;

  varying vec2 v_texCoord;

  void main() {
    // Center the coordinates
    vec2 uv = v_texCoord - u_center;

    // Correct for aspect ratio
    float aspect = u_resolution.x / u_resolution.y;
    uv.x *= aspect;

    // Calculate distance from center
    float r = length(uv);
    float r2 = r * r;

    // Apply barrel/pincushion distortion
    // Positive amount = barrel (bulge outward)
    // Negative amount = pincushion (pinch inward)
    float distortion = 1.0 + r2 * u_amount;

    // Apply distortion and zoom
    vec2 distorted = uv * distortion / u_zoom;

    // Restore aspect ratio and center
    distorted.x /= aspect;
    distorted += u_center;

    // Sample with boundary check - use transparent for out-of-bounds
    if (distorted.x < 0.0 || distorted.x > 1.0 || distorted.y < 0.0 || distorted.y > 1.0) {
      gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
    } else {
      gl_FragColor = texture2D(u_image, distorted);
    }
  }
`,nn=`
  precision highp float;

  uniform sampler2D u_image;
  uniform float u_amplitude;
  uniform float u_wavelength;
  uniform float u_speed;
  uniform vec2 u_center;
  uniform float u_damping;
  uniform float u_time;
  uniform vec2 u_resolution;

  varying vec2 v_texCoord;

  #define PI 3.14159265359

  void main() {
    vec2 uv = v_texCoord;

    // Calculate distance from center
    vec2 toCenter = uv - u_center;
    float aspect = u_resolution.x / u_resolution.y;
    toCenter.x *= aspect;
    float dist = length(toCenter);

    // Calculate ripple phase
    float phase = dist * u_wavelength - u_time * u_speed;

    // Calculate displacement with damping
    float damping = exp(-dist * u_damping * 5.0);
    float displacement = sin(phase * PI * 2.0) * u_amplitude * damping;

    // Displace perpendicular to the direction from center
    vec2 direction = normalize(toCenter + 0.0001);
    direction.x /= aspect;
    vec2 displaced = uv + direction * displacement;

    // Clamp to valid range
    displaced = clamp(displaced, 0.0, 1.0);

    gl_FragColor = texture2D(u_image, displaced);
  }
`,an=`
  precision highp float;

  uniform sampler2D u_image;
  uniform sampler2D u_displacementMap;
  uniform float u_scaleX;
  uniform float u_scaleY;
  uniform bool u_useRedGreen;
  uniform bool u_hasDisplacementMap;
  uniform vec2 u_resolution;

  varying vec2 v_texCoord;

  // Procedural noise for when no map is provided
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);

    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));

    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < 4; i++) {
      value += amplitude * noise(p);
      p *= 2.0;
      amplitude *= 0.5;
    }
    return value;
  }

  void main() {
    vec2 displacement;

    if (u_hasDisplacementMap) {
      vec4 dispSample = texture2D(u_displacementMap, v_texCoord);
      if (u_useRedGreen) {
        displacement = (dispSample.rg - 0.5) * 2.0;
      } else {
        float luma = dot(dispSample.rgb, vec3(0.299, 0.587, 0.114));
        displacement = vec2(luma - 0.5) * 2.0;
      }
    } else {
      // Procedural displacement
      vec2 noiseCoord = v_texCoord * 8.0;
      displacement = vec2(
        fbm(noiseCoord) - 0.5,
        fbm(noiseCoord + vec2(100.0)) - 0.5
      );
    }

    vec2 displaced = v_texCoord + displacement * vec2(u_scaleX, u_scaleY);
    displaced = clamp(displaced, 0.0, 1.0);

    gl_FragColor = texture2D(u_image, displaced);
  }
`,sn=`
  precision highp float;

  uniform sampler2D u_image;
  uniform vec3 u_color1;
  uniform vec3 u_color2;
  uniform float u_position;
  uniform float u_angle;
  uniform float u_size;
  uniform float u_intensity;
  uniform float u_softness;
  uniform int u_blendMode;
  uniform vec2 u_resolution;

  varying vec2 v_texCoord;

  #define PI 3.14159265359

  vec3 blendScreen(vec3 base, vec3 blend) {
    return 1.0 - (1.0 - base) * (1.0 - blend);
  }

  vec3 blendAdd(vec3 base, vec3 blend) {
    return min(base + blend, vec3(1.0));
  }

  vec3 blendMultiply(vec3 base, vec3 blend) {
    return base * blend;
  }

  vec3 blendOverlay(vec3 base, vec3 blend) {
    return mix(
      2.0 * base * blend,
      1.0 - 2.0 * (1.0 - base) * (1.0 - blend),
      step(0.5, base)
    );
  }

  vec3 blendSoftLight(vec3 base, vec3 blend) {
    return mix(
      base - (1.0 - 2.0 * blend) * base * (1.0 - base),
      base + (2.0 * blend - 1.0) * (sqrt(base) - base),
      step(0.5, blend)
    );
  }

  void main() {
    vec4 color = texture2D(u_image, v_texCoord);

    // Create directional gradient
    float angleRad = u_angle * PI / 180.0;
    vec2 dir = vec2(cos(angleRad), sin(angleRad));

    // Calculate position along the gradient direction
    vec2 uv = v_texCoord - 0.5;
    float aspect = u_resolution.x / u_resolution.y;
    uv.x *= aspect;

    float projection = dot(uv, dir);
    float offset = (projection + u_position - 0.5) / u_size;

    // Create soft gradient
    float t = 1.0 - smoothstep(0.0, u_softness, abs(offset));
    t = pow(t, 2.0 - u_softness);

    // Interpolate between colors
    float colorT = smoothstep(-0.5, 0.5, offset);
    vec3 leakColor = mix(u_color1, u_color2, colorT);

    // Apply intensity
    vec3 leak = leakColor * t * u_intensity;

    // Blend with original (mode order matches renderer _blendModeToInt)
    vec3 result;
    if (u_blendMode == 0) result = blendOverlay(color.rgb, leak);
    else if (u_blendMode == 1) result = blendSoftLight(color.rgb, leak);
    else if (u_blendMode == 2) result = blendMultiply(color.rgb, leak);
    else result = blendScreen(color.rgb, leak);

    // Mix based on leak presence
    result = mix(color.rgb, result, t);

    gl_FragColor = vec4(result, color.a);
  }
`,ln=`
  precision highp float;

  uniform sampler2D u_image;
  uniform float u_radius;
  uniform float u_intensity;
  uniform float u_threshold;
  uniform float u_softThreshold;
  uniform int u_blendMode;
  uniform vec2 u_resolution;

  varying vec2 v_texCoord;

  vec3 blendScreen(vec3 base, vec3 blend) {
    return 1.0 - (1.0 - base) * (1.0 - blend);
  }

  vec3 blendSoftLight(vec3 base, vec3 blend) {
    return mix(
      base - (1.0 - 2.0 * blend) * base * (1.0 - base),
      base + (2.0 * blend - 1.0) * (sqrt(base) - base),
      step(0.5, blend)
    );
  }

  vec3 blendOverlay(vec3 base, vec3 blend) {
    return mix(
      2.0 * base * blend,
      1.0 - 2.0 * (1.0 - base) * (1.0 - blend),
      step(0.5, base)
    );
  }

  vec3 blendMultiply(vec3 base, vec3 blend) {
    return base * blend;
  }

  // Extract bright pixels with soft knee
  vec3 extractBright(vec3 color, float threshold, float softKnee) {
    float brightness = max(max(color.r, color.g), color.b);
    float knee = threshold * softKnee;
    float soft = brightness - threshold + knee;
    soft = clamp(soft, 0.0, 2.0 * knee);
    soft = soft * soft / (4.0 * knee + 0.00001);
    float contribution = max(soft, brightness - threshold);
    contribution /= max(brightness, 0.00001);
    return color * max(contribution, 0.0);
  }

  void main() {
    vec4 originalColor = texture2D(u_image, v_texCoord);
    vec2 texelSize = 1.0 / u_resolution;

    // Extract and blur bright areas
    vec3 bloom = vec3(0.0);
    float totalWeight = 0.0;

    float r = u_radius;

    // Two-pass Gaussian approximation in a single pass
    // Use a 13x13 kernel for better performance while maintaining quality
    for (int y = -6; y <= 6; y++) {
      for (int x = -6; x <= 6; x++) {
        float fx = float(x);
        float fy = float(y);
        float dist = sqrt(fx * fx + fy * fy);

        // Skip samples outside radius
        if (dist > r) continue;

        // Gaussian weight
        float sigma = max(r * 0.4, 0.5);
        float weight = exp(-(dist * dist) / (2.0 * sigma * sigma));

        vec2 offset = vec2(fx, fy) * texelSize;
        vec3 sampleColor = texture2D(u_image, v_texCoord + offset).rgb;

        // Extract only the bright parts of each sample
        vec3 brightSample = extractBright(sampleColor, u_threshold, u_softThreshold);

        bloom += brightSample * weight;
        totalWeight += weight;
      }
    }

    if (totalWeight > 0.0) {
      bloom /= totalWeight;
    }

    // Apply intensity
    bloom *= u_intensity;

    // Blend bloom with original image (mode order matches renderer _blendModeToInt)
    vec3 result;
    if (u_blendMode == 0) {
      // Overlay
      result = blendOverlay(originalColor.rgb, bloom);
    } else if (u_blendMode == 1) {
      // Soft Light
      result = blendSoftLight(originalColor.rgb, bloom);
    } else if (u_blendMode == 2) {
      // Multiply
      result = blendMultiply(originalColor.rgb, bloom);
    } else {
      // Screen (default - bright and natural)
      result = blendScreen(originalColor.rgb, bloom);
    }

    gl_FragColor = vec4(clamp(result, 0.0, 1.0), originalColor.a);
  }
`,cn=`
  precision highp float;

  uniform sampler2D u_image;
  uniform float u_intensity;
  uniform vec2 u_center;
  uniform int u_samples;
  uniform bool u_zoom;
  uniform vec2 u_resolution;

  varying vec2 v_texCoord;

  #define PI 3.14159265359

  void main() {
    vec2 uv = v_texCoord;
    vec2 center = u_center;

    vec4 color = vec4(0.0);
    float total = 0.0;

    if (u_zoom) {
      // Zoom blur - samples along ray from center
      vec2 dir = uv - center;

      for (int i = 0; i < 64; i++) {
        if (i >= u_samples) break;

        float t = float(i) / float(u_samples - 1);
        float scale = 1.0 - u_intensity * t;

        vec2 sampleUV = center + dir * scale;

        if (sampleUV.x >= 0.0 && sampleUV.x <= 1.0 && sampleUV.y >= 0.0 && sampleUV.y <= 1.0) {
          float weight = 1.0 - t * 0.5;
          color += texture2D(u_image, sampleUV) * weight;
          total += weight;
        }
      }
    } else {
      // Spin blur - samples along circular arc
      vec2 dir = uv - center;
      float dist = length(dir);
      float baseAngle = atan(dir.y, dir.x);

      for (int i = 0; i < 64; i++) {
        if (i >= u_samples) break;

        float t = (float(i) / float(u_samples - 1) - 0.5) * 2.0;
        float angle = baseAngle + t * u_intensity * dist;

        vec2 sampleUV = center + vec2(cos(angle), sin(angle)) * dist;

        if (sampleUV.x >= 0.0 && sampleUV.x <= 1.0 && sampleUV.y >= 0.0 && sampleUV.y <= 1.0) {
          float weight = 1.0 - abs(t) * 0.3;
          color += texture2D(u_image, sampleUV) * weight;
          total += weight;
        }
      }
    }

    if (total > 0.0) {
      color /= total;
    } else {
      color = texture2D(u_image, uv);
    }

    gl_FragColor = color;
  }
`,un=`
  precision highp float;

  uniform sampler2D u_image;
  uniform float u_cellSize;
  uniform float u_irregularity;
  uniform float u_edgeThickness;
  uniform vec3 u_edgeColor;
  uniform float u_colorVariation;
  uniform vec2 u_resolution;

  varying vec2 v_texCoord;

  // Simple hash functions for Voronoi
  vec2 hash2(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return fract(sin(p) * 43758.5453);
  }

  float hash1(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  void main() {
    vec2 uv = v_texCoord;
    vec2 pixelCoord = uv * u_resolution;

    // Calculate cell coordinates
    float cellPx = u_cellSize;
    vec2 cellCoord = pixelCoord / cellPx;
    vec2 cellBase = floor(cellCoord);

    // Find closest Voronoi cell center
    float minDist = 10.0;
    float secondDist = 10.0;
    vec2 closestCell = cellBase;

    for (int y = -1; y <= 1; y++) {
      for (int x = -1; x <= 1; x++) {
        vec2 neighbor = cellBase + vec2(float(x), float(y));
        vec2 point = neighbor + mix(vec2(0.5), hash2(neighbor), u_irregularity);

        float dist = length(cellCoord - point);

        if (dist < minDist) {
          secondDist = minDist;
          minDist = dist;
          closestCell = neighbor;
        } else if (dist < secondDist) {
          secondDist = dist;
        }
      }
    }

    // Sample color from cell center
    vec2 cellCenter = (closestCell + 0.5) * cellPx / u_resolution;
    cellCenter = clamp(cellCenter, 0.0, 1.0);
    vec4 cellSample = texture2D(u_image, cellCenter);
    vec3 cellColor = cellSample.rgb;

    // Add slight color variation per cell
    float variation = (hash1(closestCell) - 0.5) * u_colorVariation;
    cellColor = clamp(cellColor + variation, 0.0, 1.0);

    // Calculate edge
    float edge = secondDist - minDist;
    float edgeMask = smoothstep(0.0, u_edgeThickness, edge);

    // Mix cell color with edge color
    vec3 result = mix(u_edgeColor, cellColor, edgeMask);

    // Preserve original alpha for transparency support
    gl_FragColor = vec4(result, cellSample.a);
  }
`,dn=`
  precision highp float;

  uniform sampler2D u_image;
  uniform float u_focusPosition;
  uniform float u_focusWidth;
  uniform float u_blurRadius;
  uniform float u_angle;
  uniform float u_gradientSmooth;
  uniform vec2 u_resolution;

  varying vec2 v_texCoord;

  #define PI 3.14159265359

  void main() {
    vec2 uv = v_texCoord;

    // Rotate coordinates for angled tilt shift
    float angleRad = u_angle * PI / 180.0;
    vec2 center = vec2(0.5);
    vec2 rotatedUV = uv - center;
    float cosA = cos(angleRad);
    float sinA = sin(angleRad);
    float rotatedY = -rotatedUV.x * sinA + rotatedUV.y * cosA;
    rotatedY += 0.5;

    // Calculate blur amount based on distance from focus band
    float distFromFocus = abs(rotatedY - u_focusPosition);
    float focusHalf = u_focusWidth * 0.5;
    float blurAmount = smoothstep(focusHalf, focusHalf + u_gradientSmooth, distFromFocus);

    // Apply Gaussian blur based on blur amount
    vec3 color = vec3(0.0);
    float total = 0.0;

    float radius = u_blurRadius * blurAmount;

    if (radius < 0.5) {
      // No blur needed
      gl_FragColor = texture2D(u_image, uv);
      return;
    }

    vec2 texelSize = 1.0 / u_resolution;

    // Optimized blur - sample in a circular pattern
    for (int y = -8; y <= 8; y++) {
      for (int x = -8; x <= 8; x++) {
        float fx = float(x);
        float fy = float(y);
        float dist = sqrt(fx * fx + fy * fy);

        if (dist > radius) continue;

        float sigma = radius * 0.4;
        float weight = exp(-(dist * dist) / (2.0 * sigma * sigma));

        vec2 offset = vec2(fx, fy) * texelSize;
        color += texture2D(u_image, uv + offset).rgb * weight;
        total += weight;
      }
    }

    if (total > 0.0) {
      color /= total;
    }

    // Preserve original alpha for transparency support
    vec4 centerSample = texture2D(u_image, uv);
    gl_FragColor = vec4(color, centerSample.a);
  }
`,fn=`
  precision highp float;

  uniform sampler2D u_image;
  uniform float u_exposure;
  uniform float u_highlights;
  uniform float u_shadows;
  uniform float u_blacks;
  uniform float u_whites;

  varying vec2 v_texCoord;

  // Attempt to recover highlights and shadows
  vec3 adjustTones(vec3 color, float highlights, float shadows, float blacks, float whites) {
    // Calculate luminance
    float luma = dot(color, vec3(0.299, 0.587, 0.114));

    // Highlights adjustment (affects bright areas)
    float highlightMask = smoothstep(0.5, 1.0, luma);
    color = mix(color, color * (1.0 + highlights), highlightMask);

    // Shadows adjustment (affects dark areas)
    float shadowMask = 1.0 - smoothstep(0.0, 0.5, luma);
    color = mix(color, color * (1.0 + shadows * 2.0), shadowMask);

    // Blacks - crush or lift the darkest values
    color = max(color + blacks * 0.1, 0.0);

    // Whites - clip or extend the brightest values
    color = min(color + whites * 0.1, 1.0 + whites * 0.1);

    return color;
  }

  void main() {
    vec4 color = texture2D(u_image, v_texCoord);

    // Apply exposure (EV stops)
    vec3 result = color.rgb * pow(2.0, u_exposure);

    // Apply tonal adjustments
    result = adjustTones(result, u_highlights, u_shadows, u_blacks, u_whites);

    gl_FragColor = vec4(clamp(result, 0.0, 1.0), color.a);
  }
`,mn=`
  precision highp float;

  uniform sampler2D u_image;
  uniform float u_vibrance;
  uniform float u_saturation;

  varying vec2 v_texCoord;

  void main() {
    vec4 color = texture2D(u_image, v_texCoord);

    // Calculate saturation info
    float luma = dot(color.rgb, vec3(0.299, 0.587, 0.114));
    float maxChannel = max(max(color.r, color.g), color.b);
    float minChannel = min(min(color.r, color.g), color.b);
    float saturation = (maxChannel - minChannel) / (maxChannel + 0.001);

    // Vibrance: boost saturation more for less-saturated pixels
    // This protects already-saturated colors (like skin tones)
    float vibranceAmount = u_vibrance * (1.0 - saturation);
    vibranceAmount = max(vibranceAmount, -saturation); // Don't oversaturate

    vec3 result = mix(vec3(luma), color.rgb, 1.0 + vibranceAmount);

    // Standard saturation on top
    result = mix(vec3(luma), result, 1.0 + u_saturation);

    gl_FragColor = vec4(clamp(result, 0.0, 1.0), color.a);
  }
`,hn=`
  precision highp float;

  uniform sampler2D u_image;
  uniform vec2 u_resolution;
  uniform float u_threshold;
  uniform float u_scale;
  uniform bool u_animated;
  uniform float u_time;
  uniform float u_animationSpeed;
  uniform bool u_invert;

  varying vec2 v_texCoord;

  // Checkerboard noise to decorrelate pattern between tiles
  float stepnoise0(vec2 p, float size) {
    vec2 pp = floor(p / size) * size;
    float r = fract(sin(dot(pp, vec2(1.0, -7.131))) * 43758.5453);
    return r;
  }

  // Stippling mask - creates the dot pattern
  float mask(vec2 p, float time) {
    const float SEED1 = 1.705;
    const float DMUL = 8.12235325;

    // Add per-tile random offset to break up regularity
    float tileNoise = stepnoise0(p, 5.5);
    p += (tileNoise - 0.5) * DMUL;

    // Animation: shift the pattern over time
    if (time > 0.0) {
      p += vec2(sin(time * 0.7), cos(time * 0.9)) * 2.0;
    }

    // Create stippling pattern
    float f = fract(p.x * SEED1 + p.y / (SEED1 + 0.15555));
    f *= 1.03; // Avoid zero-stipple in plain white

    // Tone mapping for proper dot distribution
    return (pow(f, 150.0) + 1.3 * f) / 2.3;
  }

  void main() {
    vec2 fragCoord = v_texCoord * u_resolution;
    vec4 originalColor = texture2D(u_image, v_texCoord);

    // Get luminance
    float luminance = dot(originalColor.rgb, vec3(0.2126, 0.7152, 0.0722));

    // Apply threshold adjustment
    luminance = luminance + (u_threshold - 0.5);
    luminance = clamp(luminance, 0.0, 1.0);

    // Scale controls dot density - larger scale = bigger dots / less dense
    // We floor to create pixel-sized dots that scale together
    float dotSize = max(1.0, floor(u_scale));
    vec2 scaledCoord = floor(fragCoord / dotSize);

    // Get animation time
    float time = u_animated ? u_time * u_animationSpeed : 0.0;

    // Get stippling mask value
    float maskVal = mask(scaledCoord, time);

    // Compare luminance against mask to get final bit
    float finalBit = step(maskVal, luminance);

    if (u_invert) {
      finalBit = 1.0 - finalBit;
    }

    gl_FragColor = vec4(vec3(finalBit), originalColor.a);
  }
`;function gn(r,e=16){const t=document.createElement("canvas"),a=r.length;t.width=e*a,t.height=e;const s=t.getContext("2d");s.fillStyle="#000000",s.fillRect(0,0,t.width,t.height),s.fillStyle="#ffffff",s.font=`${e*.9}px monospace`,s.textAlign="center",s.textBaseline="middle";for(let c=0;c<a;c++){const n=c*e+e/2,o=e/2;s.fillText(r[c],n,o)}return t}class pn{constructor(e){if(this.canvas=e,this.gl=e.getContext("webgl2")||e.getContext("webgl"),!this.gl)throw new Error("WebGL not supported");this.programs={},this.textures={},this.framebuffers=[],this.quadBuffer=null,this.texCoordBuffer=null,this.currentCharset=null,this._initBuffers(),this._initPrograms()}_initBuffers(){const e=this.gl;this.quadBuffer=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,this.quadBuffer),e.bufferData(e.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),e.STATIC_DRAW),this.texCoordBuffer=e.createBuffer(),e.bindBuffer(e.ARRAY_BUFFER,this.texCoordBuffer),e.bufferData(e.ARRAY_BUFFER,new Float32Array([0,0,1,0,0,1,0,1,1,0,1,1]),e.STATIC_DRAW)}_compileShader(e,t){const a=this.gl,s=a.createShader(t);if(a.shaderSource(s,e),a.compileShader(s),!a.getShaderParameter(s,a.COMPILE_STATUS)){const c=a.getShaderInfoLog(s);throw a.deleteShader(s),new Error(`Shader compile error: ${c}`)}return s}_createProgram(e,t){const a=this.gl,s=this._compileShader(e,a.VERTEX_SHADER),c=this._compileShader(t,a.FRAGMENT_SHADER),n=a.createProgram();if(a.attachShader(n,s),a.attachShader(n,c),a.linkProgram(n),!a.getProgramParameter(n,a.LINK_STATUS)){const u=a.getProgramInfoLog(n);throw a.deleteProgram(n),new Error(`Program link error: ${u}`)}a.detachShader(n,s),a.detachShader(n,c),a.deleteShader(s),a.deleteShader(c),n.attributes={position:a.getAttribLocation(n,"a_position"),texCoord:a.getAttribLocation(n,"a_texCoord")},n.uniforms={};const o=a.getProgramParameter(n,a.ACTIVE_UNIFORMS);for(let u=0;u<o;u++){const d=a.getActiveUniform(n,u);n.uniforms[d.name]=a.getUniformLocation(n,d.name)}return n}_initPrograms(){this.programs.passthrough=this._createProgram(M,Oi),this.programs.noise=this._createProgram(M,Ni),this.programs.dither=this._createProgram(M,Yi),this.programs.halftone=this._createProgram(M,Ki),this.programs.ascii=this._createProgram(M,Zi),this.programs.overlay=this._createProgram(M,Qi),this.programs.chromatic=this._createProgram(M,zi),this.programs.vignette=this._createProgram(M,Fi),this.programs.scanlines=this._createProgram(M,Gi),this.programs.pixelate=this._createProgram(M,Bi),this.programs.blur=this._createProgram(M,Hi),this.programs.distortion=this._createProgram(M,Vi),this.programs.posterize=this._createProgram(M,Xi),this.programs.edge=this._createProgram(M,Wi),this.programs.grain=this._createProgram(M,qi),this.programs.colorGrade=this._createProgram(M,$i),this.programs.glitch=this._createProgram(M,Ji),this.programs.crt=this._createProgram(M,en),this.programs.duotone=this._createProgram(M,tn),this.programs.kuwahara=this._createProgram(M,rn),this.programs.barrel=this._createProgram(M,on),this.programs.ripple=this._createProgram(M,nn),this.programs.displacement=this._createProgram(M,an),this.programs.lightLeak=this._createProgram(M,sn),this.programs.bloom=this._createProgram(M,ln),this.programs.radialBlur=this._createProgram(M,cn),this.programs.mosaic=this._createProgram(M,un),this.programs.tiltShift=this._createProgram(M,dn),this.programs.exposure=this._createProgram(M,fn),this.programs.vibrance=this._createProgram(M,mn),this.programs.dotDither=this._createProgram(M,hn)}_createTexture(e){const t=this.gl,a=t.createTexture();return t.bindTexture(t.TEXTURE_2D,a),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_S,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_WRAP_T,t.CLAMP_TO_EDGE),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MIN_FILTER,t.LINEAR),t.texParameteri(t.TEXTURE_2D,t.TEXTURE_MAG_FILTER,t.LINEAR),e&&t.texImage2D(t.TEXTURE_2D,0,t.RGBA,t.RGBA,t.UNSIGNED_BYTE,e),a}_createFramebuffer(e,t){const a=this.gl,s=a.createTexture();a.bindTexture(a.TEXTURE_2D,s),a.texImage2D(a.TEXTURE_2D,0,a.RGBA,e,t,0,a.RGBA,a.UNSIGNED_BYTE,null),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_S,a.CLAMP_TO_EDGE),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_WRAP_T,a.CLAMP_TO_EDGE),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MIN_FILTER,a.LINEAR),a.texParameteri(a.TEXTURE_2D,a.TEXTURE_MAG_FILTER,a.LINEAR);const c=a.createFramebuffer();return a.bindFramebuffer(a.FRAMEBUFFER,c),a.framebufferTexture2D(a.FRAMEBUFFER,a.COLOR_ATTACHMENT0,a.TEXTURE_2D,s,0),{framebuffer:c,texture:s,width:e,height:t}}_useProgram(e,t=1){const a=this.gl;a.useProgram(e),a.bindBuffer(a.ARRAY_BUFFER,this.quadBuffer),a.enableVertexAttribArray(e.attributes.position),a.vertexAttribPointer(e.attributes.position,2,a.FLOAT,!1,0,0),a.bindBuffer(a.ARRAY_BUFFER,this.texCoordBuffer),a.enableVertexAttribArray(e.attributes.texCoord),a.vertexAttribPointer(e.attributes.texCoord,2,a.FLOAT,!1,0,0),e.uniforms.u_flipY!==void 0&&a.uniform1f(e.uniforms.u_flipY,t)}_blendModeToInt(e){switch(e){case O.OVERLAY:return 0;case O.SOFT_LIGHT:return 1;case O.MULTIPLY:return 2;case O.SCREEN:return 3;default:return 0}}_ditherMethodToInt(e){switch(e){case ue.BAYER_2X2:return 0;case ue.BAYER_4X4:return 1;case ue.BAYER_8X8:return 2;default:return 1}}setImage(e){if(this.textures.source&&(this.gl.deleteTexture(this.textures.source),this.textures.source=null),e)this.textures.source=this._createTexture(e),this.imageWidth=e.width||e.videoWidth,this.imageHeight=e.height||e.videoHeight;else{this.imageWidth=0,this.imageHeight=0;const t=this.gl;t.bindFramebuffer(t.FRAMEBUFFER,null),t.viewport(0,0,this.canvas.width,this.canvas.height),t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT)}}updateVideoFrame(e){if(!this.textures.source||!e)return;const t=this.gl;t.bindTexture(t.TEXTURE_2D,this.textures.source),t.texImage2D(t.TEXTURE_2D,0,t.RGBA,t.RGBA,t.UNSIGNED_BYTE,e)}setOverlayTexture(e){this.textures.overlay&&this.gl.deleteTexture(this.textures.overlay),e?this.textures.overlay=this._createTexture(e):this.textures.overlay=null}_updateCharacterAtlas(e){if(this.currentCharset===e)return;this.currentCharset=e;const t=gn(e,32);this.textures.charAtlas&&this.gl.deleteTexture(this.textures.charAtlas),this.textures.charAtlas=this._createTexture(t)}render(e,t,a,s){const c=this.gl;if(!this.textures.source)return;const n=a||this.imageWidth,o=s||this.imageHeight;let u=this.imageWidth;if(this.imageWidth>1e3||this.imageHeight>1e3){const C=Math.min(1e3/this.imageWidth,1e3/this.imageHeight);u=Math.round(this.imageWidth*C)}const d=u>0?n/u:1;(this.canvas.width!==n||this.canvas.height!==o)&&(this.canvas.width=n,this.canvas.height=o),c.viewport(0,0,n,o),(this.framebuffers.length!==2||this.framebuffers[0].width!==n||this.framebuffers[0].height!==o)&&(this.framebuffers.forEach(C=>{c.deleteFramebuffer(C.framebuffer),c.deleteTexture(C.texture)}),this.framebuffers=[this._createFramebuffer(n,o),this._createFramebuffer(n,o)]);let p=this.textures.source,_=0,E=!0;const R=e.filter(C=>C.enabled);if(R.length===0){c.bindFramebuffer(c.FRAMEBUFFER,null),this._useProgram(this.programs.passthrough,-1),c.activeTexture(c.TEXTURE0),c.bindTexture(c.TEXTURE_2D,p),c.uniform1i(this.programs.passthrough.uniforms.u_image,0),c.drawArrays(c.TRIANGLES,0,6);return}for(let C=0;C<R.length;C++){const k=R[C],P=C===R.length-1;P?c.bindFramebuffer(c.FRAMEBUFFER,null):c.bindFramebuffer(c.FRAMEBUFFER,this.framebuffers[_].framebuffer);const F=E?-1:1;this._renderEffect(k,p,n,o,t,F,d),P||(p=this.framebuffers[_].texture,_=1-_,E=!1)}}_renderEffect(e,t,a,s,c,n=1,o=1){switch(e.type){case l.NOISE:this._renderNoise(e.params,t,a,s,c,n);break;case l.DITHER:this._renderDither(e.params,t,a,s,n);break;case l.HALFTONE:this._renderHalftone(e.params,t,a,s,n,o);break;case l.ASCII:this._renderAscii(e.params,t,a,s,n,o);break;case l.OVERLAY:this._renderOverlay(e.params,t,a,s,n);break;case l.CHROMATIC:this._renderChromatic(e.params,t,a,s,n);break;case l.VIGNETTE:this._renderVignette(e.params,t,a,s,n);break;case l.SCANLINES:this._renderScanlines(e.params,t,a,s,n,o);break;case l.PIXELATE:this._renderPixelate(e.params,t,a,s,n,o);break;case l.BLUR:this._renderBlur(e.params,t,a,s,n,o);break;case l.DISTORTION:this._renderDistortion(e.params,t,a,s,n);break;case l.POSTERIZE:this._renderPosterize(e.params,t,a,s,n);break;case l.EDGE:this._renderEdge(e.params,t,a,s,n);break;case l.GRAIN:this._renderGrain(e.params,t,a,s,c,n,o);break;case l.COLOR_GRADE:this._renderColorGrade(e.params,t,a,s,n);break;case l.GLITCH:this._renderGlitch(e.params,t,a,s,c,n);break;case l.CRT:this._renderCRT(e.params,t,a,s,c,n);break;case l.DUOTONE:this._renderDuotone(e.params,t,a,s,n);break;case l.KUWAHARA:this._renderKuwahara(e.params,t,a,s,n,o);break;case l.BARREL:this._renderBarrel(e.params,t,a,s,n);break;case l.RIPPLE:this._renderRipple(e.params,t,a,s,c,n);break;case l.DISPLACEMENT:this._renderDisplacement(e.params,t,a,s,n);break;case l.LIGHT_LEAK:this._renderLightLeak(e.params,t,a,s,n);break;case l.BLOOM:this._renderBloom(e.params,t,a,s,n,o);break;case l.RADIAL_BLUR:this._renderRadialBlur(e.params,t,a,s,n);break;case l.MOSAIC:this._renderMosaic(e.params,t,a,s,n,o);break;case l.TILT_SHIFT:this._renderTiltShift(e.params,t,a,s,n,o);break;case l.EXPOSURE:this._renderExposure(e.params,t,a,s,n);break;case l.VIBRANCE:this._renderVibrance(e.params,t,a,s,n);break;case l.DOT_DITHER:this._renderDotDither(e.params,t,a,s,c,n,o);break;default:this._renderPassthrough(t,n)}}_renderPassthrough(e,t=1){const a=this.gl;this._useProgram(this.programs.passthrough,t),a.activeTexture(a.TEXTURE0),a.bindTexture(a.TEXTURE_2D,e),a.uniform1i(this.programs.passthrough.uniforms.u_image,0),a.drawArrays(a.TRIANGLES,0,6)}_renderNoise(e,t,a,s,c,n=1){const o=this.gl,u=this.programs.noise;this._useProgram(u,n),o.activeTexture(o.TEXTURE0),o.bindTexture(o.TEXTURE_2D,t),o.uniform1i(u.uniforms.u_image,0),o.uniform1f(u.uniforms.u_intensity,e.intensity),o.uniform1f(u.uniforms.u_scale,e.scale),o.uniform1f(u.uniforms.u_seed,c),o.uniform1i(u.uniforms.u_monochrome,e.monochrome?1:0),o.uniform1i(u.uniforms.u_blendMode,this._blendModeToInt(e.blendMode)),o.uniform2f(u.uniforms.u_resolution,a,s),o.drawArrays(o.TRIANGLES,0,6)}_renderDither(e,t,a,s,c=1){const n=this.gl,o=this.programs.dither;this._useProgram(o,c),n.activeTexture(n.TEXTURE0),n.bindTexture(n.TEXTURE_2D,t),n.uniform1i(o.uniforms.u_image,0),n.uniform1i(o.uniforms.u_method,this._ditherMethodToInt(e.method)),n.uniform1i(o.uniforms.u_levels,e.levels),n.uniform1f(o.uniforms.u_threshold,e.threshold),n.uniform2f(o.uniforms.u_resolution,a,s),n.uniform1f(o.uniforms.u_scale,e.scale||1),n.drawArrays(n.TRIANGLES,0,6)}_renderHalftone(e,t,a,s,c=1,n=1){const o=this.gl,u=this.programs.halftone;this._useProgram(u,c),o.activeTexture(o.TEXTURE0),o.bindTexture(o.TEXTURE_2D,t);const d=this._hexToRgb(e.dotColor||"#000000"),p=this._hexToRgb(e.backgroundColor||"#ffffff"),E={circle:0,square:1,diamond:2,line:3,ellipse:4,cross:5,ring:6}[e.shape]||0,C={original:0,monochrome:1,duotone:2,cmyk:3}[e.colorMode]||0,k=(e.gridSize||8)*n;o.uniform1i(u.uniforms.u_image,0),o.uniform1f(u.uniforms.u_gridSize,k),o.uniform1f(u.uniforms.u_dotScale,e.dotScale||1),o.uniform1f(u.uniforms.u_angle,e.angle||45),o.uniform1i(u.uniforms.u_shape,E),o.uniform1f(u.uniforms.u_softness,e.softness||.5),o.uniform1f(u.uniforms.u_contrast,e.contrast||0),o.uniform1i(u.uniforms.u_invert,e.invert?1:0),o.uniform1i(u.uniforms.u_colorMode,C),o.uniform3f(u.uniforms.u_dotColor,d[0],d[1],d[2]),o.uniform3f(u.uniforms.u_backgroundColor,p[0],p[1],p[2]),o.uniform1f(u.uniforms.u_mixOriginal,e.mixOriginal||0),o.uniform2f(u.uniforms.u_resolution,a,s),o.drawArrays(o.TRIANGLES,0,6)}_renderAscii(e,t,a,s,c=1,n=1){const o=this.gl,u=this.programs.ascii,d=e.charset||Ee.STANDARD;this._updateCharacterAtlas(d),this._useProgram(u,c),o.activeTexture(o.TEXTURE0),o.bindTexture(o.TEXTURE_2D,t),o.activeTexture(o.TEXTURE1),o.bindTexture(o.TEXTURE_2D,this.textures.charAtlas);const p=e.cellSize*n,_=this._hexToRgb(e.charColor||"#ffffff"),E=this._hexToRgb(e.backgroundColor||"#000000");o.uniform1i(u.uniforms.u_image,0),o.uniform1i(u.uniforms.u_charAtlas,1),o.uniform1f(u.uniforms.u_cellSize,p),o.uniform1i(u.uniforms.u_color,e.color?1:0),o.uniform1i(u.uniforms.u_invert,e.invert?1:0),o.uniform1i(u.uniforms.u_charCount,d.length),o.uniform2f(u.uniforms.u_resolution,a,s),o.uniform1f(u.uniforms.u_brightness,e.brightness??1),o.uniform1f(u.uniforms.u_contrast,e.contrast??1),o.uniform1f(u.uniforms.u_gamma,e.gamma??1),o.uniform1f(u.uniforms.u_charBrightness,e.charBrightness??1),o.uniform3f(u.uniforms.u_charColor,_[0],_[1],_[2]),o.uniform3f(u.uniforms.u_backgroundColor,E[0],E[1],E[2]),o.uniform1f(u.uniforms.u_backgroundBlend,e.backgroundBlend??1),o.uniform1f(u.uniforms.u_edgeEnhance,e.edgeEnhance??0),o.uniform1f(u.uniforms.u_cellGap,e.cellGap??0),o.drawArrays(o.TRIANGLES,0,6)}_renderOverlay(e,t,a,s,c=1){const n=this.gl,o=this.programs.overlay;this._useProgram(o,c),n.activeTexture(n.TEXTURE0),n.bindTexture(n.TEXTURE_2D,t),n.activeTexture(n.TEXTURE1),n.bindTexture(n.TEXTURE_2D,this.textures.overlay||t),n.uniform1i(o.uniforms.u_image,0),n.uniform1i(o.uniforms.u_overlay,1),n.uniform1f(o.uniforms.u_intensity,e.intensity),n.uniform1f(o.uniforms.u_scale,e.scale),n.uniform1f(o.uniforms.u_rotation,e.rotation),n.uniform1i(o.uniforms.u_blendMode,this._blendModeToInt(e.blendMode)),n.uniform2f(o.uniforms.u_resolution,a,s),n.uniform1i(o.uniforms.u_hasOverlay,this.textures.overlay?1:0),n.drawArrays(n.TRIANGLES,0,6)}_renderChromatic(e,t,a,s,c=1){const n=this.gl,o=this.programs.chromatic;this._useProgram(o,c),n.activeTexture(n.TEXTURE0),n.bindTexture(n.TEXTURE_2D,t),n.uniform1i(o.uniforms.u_image,0),n.uniform1f(o.uniforms.u_intensity,e.intensity),n.uniform1f(o.uniforms.u_angle,e.angle),n.uniform1i(o.uniforms.u_radial,e.radial?1:0),n.uniform2f(o.uniforms.u_resolution,a,s),n.drawArrays(n.TRIANGLES,0,6)}_renderVignette(e,t,a,s,c=1){const n=this.gl,o=this.programs.vignette;this._useProgram(o,c),n.activeTexture(n.TEXTURE0),n.bindTexture(n.TEXTURE_2D,t);const u=this._hexToRgb(e.color);n.uniform1i(o.uniforms.u_image,0),n.uniform1f(o.uniforms.u_intensity,e.intensity),n.uniform1f(o.uniforms.u_size,e.size),n.uniform1f(o.uniforms.u_softness,e.softness),n.uniform3f(o.uniforms.u_color,u[0],u[1],u[2]),n.uniform2f(o.uniforms.u_resolution,a,s),n.drawArrays(n.TRIANGLES,0,6)}_renderScanlines(e,t,a,s,c=1,n=1){const o=this.gl,u=this.programs.scanlines;this._useProgram(u,c),o.activeTexture(o.TEXTURE0),o.bindTexture(o.TEXTURE_2D,t);const d=e.spacing*n;o.uniform1i(u.uniforms.u_image,0),o.uniform1f(u.uniforms.u_spacing,d),o.uniform1f(u.uniforms.u_thickness,e.thickness),o.uniform1f(u.uniforms.u_opacity,e.opacity),o.uniform1i(u.uniforms.u_horizontal,e.horizontal?1:0),o.uniform1f(u.uniforms.u_offset,e.offset),o.uniform2f(u.uniforms.u_resolution,a,s),o.drawArrays(o.TRIANGLES,0,6)}_renderPixelate(e,t,a,s,c=1,n=1){const o=this.gl,u=this.programs.pixelate;this._useProgram(u,c),o.activeTexture(o.TEXTURE0),o.bindTexture(o.TEXTURE_2D,t);const d=e.size*n;o.uniform1i(u.uniforms.u_image,0),o.uniform1f(u.uniforms.u_size,d),o.uniform1i(u.uniforms.u_maintainAspect,e.maintainAspect?1:0),o.uniform2f(u.uniforms.u_resolution,a,s),o.drawArrays(o.TRIANGLES,0,6)}_renderBlur(e,t,a,s,c=1,n=1){const o=this.gl,u=this.programs.blur;this._useProgram(u,c),o.activeTexture(o.TEXTURE0),o.bindTexture(o.TEXTURE_2D,t);const d={gaussian:0,radial:1,motion:2},p=e.radius*n;o.uniform1i(u.uniforms.u_image,0),o.uniform1f(u.uniforms.u_radius,p),o.uniform1i(u.uniforms.u_type,d[e.type]??0),o.uniform1f(u.uniforms.u_angle,e.angle),o.uniform2f(u.uniforms.u_resolution,a,s),o.drawArrays(o.TRIANGLES,0,6)}_renderDistortion(e,t,a,s,c=1){const n=this.gl,o=this.programs.distortion;this._useProgram(o,c),n.activeTexture(n.TEXTURE0),n.bindTexture(n.TEXTURE_2D,t);const u={wave:0,swirl:1,bulge:2};n.uniform1i(o.uniforms.u_image,0),n.uniform1i(o.uniforms.u_type,u[e.type]??0),n.uniform1f(o.uniforms.u_amplitude,e.amplitude),n.uniform1f(o.uniforms.u_frequency,e.frequency),n.uniform2f(o.uniforms.u_center,e.centerX,e.centerY),n.uniform2f(o.uniforms.u_resolution,a,s),n.drawArrays(n.TRIANGLES,0,6)}_renderPosterize(e,t,a,s,c=1){const n=this.gl,o=this.programs.posterize;this._useProgram(o,c),n.activeTexture(n.TEXTURE0),n.bindTexture(n.TEXTURE_2D,t),n.uniform1i(o.uniforms.u_image,0),n.uniform1i(o.uniforms.u_levels,e.levels),n.uniform1i(o.uniforms.u_preserveHue,e.preserveHue?1:0),n.drawArrays(n.TRIANGLES,0,6)}_renderEdge(e,t,a,s,c=1){const n=this.gl,o=this.programs.edge;this._useProgram(o,c),n.activeTexture(n.TEXTURE0),n.bindTexture(n.TEXTURE_2D,t),n.uniform1i(o.uniforms.u_image,0),n.uniform1f(o.uniforms.u_strength,e.strength),n.uniform1f(o.uniforms.u_threshold,e.threshold),n.uniform1i(o.uniforms.u_invert,e.invert?1:0),n.uniform1i(o.uniforms.u_colorize,e.colorize?1:0),n.uniform2f(o.uniforms.u_resolution,a,s),n.drawArrays(n.TRIANGLES,0,6)}_renderGrain(e,t,a,s,c,n=1,o=1){const u=this.gl,d=this.programs.grain;this._useProgram(d,n),u.activeTexture(u.TEXTURE0),u.bindTexture(u.TEXTURE_2D,t);const p=e.size*o;u.uniform1i(d.uniforms.u_image,0),u.uniform1f(d.uniforms.u_intensity,e.intensity),u.uniform1f(d.uniforms.u_size,p),u.uniform1f(d.uniforms.u_luminanceResponse,e.luminanceResponse),u.uniform1i(d.uniforms.u_colored,e.colored?1:0),u.uniform1f(d.uniforms.u_seed,c),u.uniform2f(d.uniforms.u_resolution,a,s),u.drawArrays(u.TRIANGLES,0,6)}_renderColorGrade(e,t,a,s,c=1){const n=this.gl,o=this.programs.colorGrade;this._useProgram(o,c),n.activeTexture(n.TEXTURE0),n.bindTexture(n.TEXTURE_2D,t);const u=this._hexToRgb(e.shadows),d=this._hexToRgb(e.highlights);n.uniform1i(o.uniforms.u_image,0),n.uniform1f(o.uniforms.u_brightness,e.brightness),n.uniform1f(o.uniforms.u_contrast,e.contrast),n.uniform1f(o.uniforms.u_saturation,e.saturation),n.uniform1f(o.uniforms.u_temperature,e.temperature),n.uniform1f(o.uniforms.u_tint,e.tint),n.uniform3f(o.uniforms.u_shadows,u[0],u[1],u[2]),n.uniform3f(o.uniforms.u_highlights,d[0],d[1],d[2]),n.uniform1f(o.uniforms.u_shadowInfluence,e.shadowInfluence),n.uniform1f(o.uniforms.u_highlightInfluence,e.highlightInfluence),n.drawArrays(n.TRIANGLES,0,6)}_renderGlitch(e,t,a,s,c,n=1){const o=this.gl,u=this.programs.glitch;this._useProgram(u,n),o.activeTexture(o.TEXTURE0),o.bindTexture(o.TEXTURE_2D,t),o.uniform1i(u.uniforms.u_image,0),o.uniform1f(u.uniforms.u_intensity,e.intensity),o.uniform1f(u.uniforms.u_sliceCount,e.sliceCount),o.uniform1f(u.uniforms.u_rgbShift,e.rgbShift),o.uniform1f(u.uniforms.u_angle,e.angle),o.uniform1f(u.uniforms.u_seed,c+(e.seed||0)),o.uniform1f(u.uniforms.u_blockSize,e.blockSize),o.uniform1i(u.uniforms.u_colorShift,e.colorShift?1:0),o.uniform2f(u.uniforms.u_resolution,a,s),o.drawArrays(o.TRIANGLES,0,6)}_renderCRT(e,t,a,s,c,n=1){const o=this.gl,u=this.programs.crt;this._useProgram(u,n),o.activeTexture(o.TEXTURE0),o.bindTexture(o.TEXTURE_2D,t),o.uniform1i(u.uniforms.u_image,0),o.uniform1f(u.uniforms.u_curvature,e.curvature),o.uniform1f(u.uniforms.u_scanlineIntensity,e.scanlineIntensity),o.uniform1f(u.uniforms.u_scanlineCount,e.scanlineCount),o.uniform1f(u.uniforms.u_vignetteIntensity,e.vignetteIntensity),o.uniform1f(u.uniforms.u_brightness,e.brightness),o.uniform1f(u.uniforms.u_rgbOffset,e.rgbOffset),o.uniform1f(u.uniforms.u_flickerIntensity,e.flickerIntensity),o.uniform1f(u.uniforms.u_staticNoise,e.staticNoise),o.uniform1f(u.uniforms.u_seed,c),o.uniform2f(u.uniforms.u_resolution,a,s),o.drawArrays(o.TRIANGLES,0,6)}_renderDuotone(e,t,a,s,c=1){const n=this.gl,o=this.programs.duotone;this._useProgram(o,c),n.activeTexture(n.TEXTURE0),n.bindTexture(n.TEXTURE_2D,t);const u=this._hexToRgb(e.shadowColor),d=this._hexToRgb(e.highlightColor);n.uniform1i(o.uniforms.u_image,0),n.uniform3f(o.uniforms.u_shadowColor,u[0],u[1],u[2]),n.uniform3f(o.uniforms.u_highlightColor,d[0],d[1],d[2]),n.uniform1f(o.uniforms.u_contrast,e.contrast),n.uniform1f(o.uniforms.u_intensity,e.intensity),n.drawArrays(n.TRIANGLES,0,6)}_renderKuwahara(e,t,a,s,c=1,n=1){const o=this.gl,u=this.programs.kuwahara;this._useProgram(u,c),o.activeTexture(o.TEXTURE0),o.bindTexture(o.TEXTURE_2D,t);const d=Math.min(Math.round(e.radius*n),5);o.uniform1i(u.uniforms.u_image,0),o.uniform1i(u.uniforms.u_radius,d),o.uniform1f(u.uniforms.u_sharpness,e.sharpness),o.uniform2f(u.uniforms.u_resolution,a,s),o.drawArrays(o.TRIANGLES,0,6)}_renderBarrel(e,t,a,s,c=1){const n=this.gl,o=this.programs.barrel;this._useProgram(o,c),n.activeTexture(n.TEXTURE0),n.bindTexture(n.TEXTURE_2D,t),n.uniform1i(o.uniforms.u_image,0),n.uniform1f(o.uniforms.u_amount,e.amount),n.uniform2f(o.uniforms.u_center,e.centerX,e.centerY),n.uniform1f(o.uniforms.u_zoom,e.zoom),n.uniform2f(o.uniforms.u_resolution,a,s),n.drawArrays(n.TRIANGLES,0,6)}_renderRipple(e,t,a,s,c,n=1){const o=this.gl,u=this.programs.ripple;this._useProgram(u,n),o.activeTexture(o.TEXTURE0),o.bindTexture(o.TEXTURE_2D,t);const d=c*.01;o.uniform1i(u.uniforms.u_image,0),o.uniform1f(u.uniforms.u_amplitude,e.amplitude),o.uniform1f(u.uniforms.u_wavelength,e.wavelength),o.uniform1f(u.uniforms.u_speed,e.speed),o.uniform2f(u.uniforms.u_center,e.centerX,e.centerY),o.uniform1f(u.uniforms.u_damping,e.damping),o.uniform1f(u.uniforms.u_time,d),o.uniform2f(u.uniforms.u_resolution,a,s),o.drawArrays(o.TRIANGLES,0,6)}_renderDisplacement(e,t,a,s,c=1){const n=this.gl,o=this.programs.displacement;this._useProgram(o,c),n.activeTexture(n.TEXTURE0),n.bindTexture(n.TEXTURE_2D,t),n.activeTexture(n.TEXTURE1),n.bindTexture(n.TEXTURE_2D,this.textures.displacementMap||t),n.uniform1i(o.uniforms.u_image,0),n.uniform1i(o.uniforms.u_displacementMap,1),n.uniform1f(o.uniforms.u_scaleX,e.scaleX),n.uniform1f(o.uniforms.u_scaleY,e.scaleY),n.uniform1i(o.uniforms.u_useRedGreen,e.useRedGreen?1:0),n.uniform1i(o.uniforms.u_hasDisplacementMap,this.textures.displacementMap?1:0),n.uniform2f(o.uniforms.u_resolution,a,s),n.drawArrays(n.TRIANGLES,0,6)}_renderLightLeak(e,t,a,s,c=1){const n=this.gl,o=this.programs.lightLeak;this._useProgram(o,c),n.activeTexture(n.TEXTURE0),n.bindTexture(n.TEXTURE_2D,t);const u=this._hexToRgb(e.color1),d=this._hexToRgb(e.color2);n.uniform1i(o.uniforms.u_image,0),n.uniform3f(o.uniforms.u_color1,u[0],u[1],u[2]),n.uniform3f(o.uniforms.u_color2,d[0],d[1],d[2]),n.uniform1f(o.uniforms.u_position,e.position),n.uniform1f(o.uniforms.u_angle,e.angle),n.uniform1f(o.uniforms.u_size,e.size),n.uniform1f(o.uniforms.u_intensity,e.intensity),n.uniform1f(o.uniforms.u_softness,e.softness),n.uniform1i(o.uniforms.u_blendMode,this._blendModeToInt(e.blendMode)),n.uniform2f(o.uniforms.u_resolution,a,s),n.drawArrays(n.TRIANGLES,0,6)}_renderBloom(e,t,a,s,c=1,n=1){const o=this.gl,u=this.programs.bloom;this._useProgram(u,c),o.activeTexture(o.TEXTURE0),o.bindTexture(o.TEXTURE_2D,t);const d=e.radius*n;o.uniform1i(u.uniforms.u_image,0),o.uniform1f(u.uniforms.u_radius,d),o.uniform1f(u.uniforms.u_intensity,e.intensity),o.uniform1f(u.uniforms.u_threshold,e.threshold),o.uniform1f(u.uniforms.u_softThreshold,e.softThreshold),o.uniform1i(u.uniforms.u_blendMode,this._blendModeToInt(e.blendMode)),o.uniform2f(u.uniforms.u_resolution,a,s),o.drawArrays(o.TRIANGLES,0,6)}_renderRadialBlur(e,t,a,s,c=1){const n=this.gl,o=this.programs.radialBlur;this._useProgram(o,c),n.activeTexture(n.TEXTURE0),n.bindTexture(n.TEXTURE_2D,t),n.uniform1i(o.uniforms.u_image,0),n.uniform1f(o.uniforms.u_intensity,e.intensity),n.uniform2f(o.uniforms.u_center,e.centerX,e.centerY),n.uniform1i(o.uniforms.u_samples,e.samples),n.uniform1i(o.uniforms.u_zoom,e.zoom?1:0),n.uniform2f(o.uniforms.u_resolution,a,s),n.drawArrays(n.TRIANGLES,0,6)}_renderMosaic(e,t,a,s,c=1,n=1){const o=this.gl,u=this.programs.mosaic;this._useProgram(u,c),o.activeTexture(o.TEXTURE0),o.bindTexture(o.TEXTURE_2D,t);const d=this._hexToRgb(e.edgeColor),p=e.cellSize*n,_=e.edgeThickness*n;o.uniform1i(u.uniforms.u_image,0),o.uniform1f(u.uniforms.u_cellSize,p),o.uniform1f(u.uniforms.u_irregularity,e.irregularity),o.uniform1f(u.uniforms.u_edgeThickness,_),o.uniform3f(u.uniforms.u_edgeColor,d[0],d[1],d[2]),o.uniform1f(u.uniforms.u_colorVariation,e.colorVariation),o.uniform2f(u.uniforms.u_resolution,a,s),o.drawArrays(o.TRIANGLES,0,6)}_renderTiltShift(e,t,a,s,c=1,n=1){const o=this.gl,u=this.programs.tiltShift;this._useProgram(u,c),o.activeTexture(o.TEXTURE0),o.bindTexture(o.TEXTURE_2D,t);const d=e.blurRadius*n;o.uniform1i(u.uniforms.u_image,0),o.uniform1f(u.uniforms.u_focusPosition,e.focusPosition),o.uniform1f(u.uniforms.u_focusWidth,e.focusWidth),o.uniform1f(u.uniforms.u_blurRadius,d),o.uniform1f(u.uniforms.u_angle,e.angle),o.uniform1f(u.uniforms.u_gradientSmooth,e.gradientSmooth),o.uniform2f(u.uniforms.u_resolution,a,s),o.drawArrays(o.TRIANGLES,0,6)}_renderExposure(e,t,a,s,c=1){const n=this.gl,o=this.programs.exposure;this._useProgram(o,c),n.activeTexture(n.TEXTURE0),n.bindTexture(n.TEXTURE_2D,t),n.uniform1i(o.uniforms.u_image,0),n.uniform1f(o.uniforms.u_exposure,e.exposure),n.uniform1f(o.uniforms.u_highlights,e.highlights),n.uniform1f(o.uniforms.u_shadows,e.shadows),n.uniform1f(o.uniforms.u_blacks,e.blacks),n.uniform1f(o.uniforms.u_whites,e.whites),n.drawArrays(n.TRIANGLES,0,6)}_renderVibrance(e,t,a,s,c=1){const n=this.gl,o=this.programs.vibrance;this._useProgram(o,c),n.activeTexture(n.TEXTURE0),n.bindTexture(n.TEXTURE_2D,t),n.uniform1i(o.uniforms.u_image,0),n.uniform1f(o.uniforms.u_vibrance,e.vibrance),n.uniform1f(o.uniforms.u_saturation,e.saturation),n.drawArrays(n.TRIANGLES,0,6)}_renderDotDither(e,t,a,s,c,n=1,o=1){const u=this.gl,d=this.programs.dotDither;this._useProgram(d,n),u.activeTexture(u.TEXTURE0),u.bindTexture(u.TEXTURE_2D,t),u.uniform1i(d.uniforms.u_image,0),u.uniform2f(d.uniforms.u_resolution,a,s),u.uniform1f(d.uniforms.u_scale,(e.scale||1)*o),u.uniform1f(d.uniforms.u_threshold,e.threshold||.5),u.uniform1i(d.uniforms.u_animated,e.animated?1:0),u.uniform1f(d.uniforms.u_time,c),u.uniform1f(d.uniforms.u_animationSpeed,e.animationSpeed||1),u.uniform1i(d.uniforms.u_invert,e.invert?1:0),u.drawArrays(u.TRIANGLES,0,6)}setDisplacementMap(e){this.textures.displacementMap&&this.gl.deleteTexture(this.textures.displacementMap),e?this.textures.displacementMap=this._createTexture(e):this.textures.displacementMap=null}_hexToRgb(e){const t=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e||"#000000");return t?[parseInt(t[1],16)/255,parseInt(t[2],16)/255,parseInt(t[3],16)/255]:[0,0,0]}destroy(){const e=this.gl;Object.values(this.programs).forEach(t=>e.deleteProgram(t)),Object.values(this.textures).forEach(t=>{t&&e.deleteTexture(t)}),this.framebuffers.forEach(t=>{e.deleteFramebuffer(t.framebuffer),e.deleteTexture(t.texture)}),this.quadBuffer&&e.deleteBuffer(this.quadBuffer),this.texCoordBuffer&&e.deleteBuffer(this.texCoordBuffer)}}class vn{constructor(e){this.canvas=e,this.ctx=e.getContext("2d"),this.imageData=null}setImage(e){this.image=e,e?(this.imageWidth=e.width,this.imageHeight=e.height):(this.imageWidth=0,this.imageHeight=0)}setOverlayTexture(e){this.overlayImage=e}render(e,t,a,s){if(!this.image)return;const c=a||this.imageWidth,n=s||this.imageHeight;this.canvas.width=c,this.canvas.height=n,this.ctx.drawImage(this.image,0,0,c,n);const o=e.filter(d=>d.enabled);if(o.length===0)return;this.imageData=this.ctx.getImageData(0,0,c,n);const u=this.imageData.data;for(const d of o)switch(d.type){case l.NOISE:this._applyNoise(u,c,n,d.params,t);break;case l.DITHER:this._applyDither(u,c,n,d.params);break;case l.HALFTONE:this._applyHalftone(u,c,n,d.params);break;case l.ASCII:this._applyAscii(c,n,d.params);return}this.ctx.putImageData(this.imageData,0,0)}_hash(e,t,a){const s=Math.sin(e*12.9898+t*78.233+a)*43758.5453;return s-Math.floor(s)}_applyNoise(e,t,a,s,c){const n=s.intensity;for(let o=0;o<e.length;o+=4){const u=o/4%t,d=Math.floor(o/4/t);let p;s.monochrome?(p=this._hash(u/s.scale,d/s.scale,c),p=(p-.5)*2*n*255,e[o]=Math.max(0,Math.min(255,e[o]+p)),e[o+1]=Math.max(0,Math.min(255,e[o+1]+p)),e[o+2]=Math.max(0,Math.min(255,e[o+2]+p))):(e[o]=Math.max(0,Math.min(255,e[o]+(this._hash(u/s.scale,d/s.scale,c)-.5)*2*n*255)),e[o+1]=Math.max(0,Math.min(255,e[o+1]+(this._hash(u/s.scale,d/s.scale,c+100)-.5)*2*n*255)),e[o+2]=Math.max(0,Math.min(255,e[o+2]+(this._hash(u/s.scale,d/s.scale,c+200)-.5)*2*n*255)))}}_getBayerValue(e,t,a){if(a===2)return[[0,2],[3,1]][t%2][e%2]/4;if(a===4)return[[0,8,2,10],[12,4,14,6],[3,11,1,9],[15,7,13,5]][t%4][e%4]/16;{const s=this._getBayerValue(Math.floor(e/2),Math.floor(t/2),4),c=this._getBayerValue(e,t,2);return s*.25+c}}_applyDither(e,t,a,s){const c=s.levels,n=s.threshold,o=s.method===ue.BAYER_2X2?2:s.method===ue.BAYER_4X4?4:8;for(let u=0;u<e.length;u+=4){const d=u/4%t,p=Math.floor(u/4/t),_=this._getBayerValue(d,p,o)-.5,E=n/c;for(let R=0;R<3;R++){const C=e[u+R]/255+_*E,k=Math.round(C*(c-1))/(c-1);e[u+R]=Math.max(0,Math.min(255,k*255))}}}_applyHalftone(e,t,a,s){const c=s.dotSize,n=s.angle*Math.PI/180,o=Math.cos(n),u=Math.sin(n),d=new Uint8ClampedArray(e.length);d.fill(255);for(let p=0;p<a;p++)for(let _=0;_<t;_++){const E=o*_-u*p,R=u*_+o*p,C=Math.floor(E/c)*c+c/2,k=Math.floor(R/c)*c+c/2,P=Math.sqrt(Math.pow(E-C,2)+Math.pow(R-k,2)),F=Math.round(o*C+u*k),Y=Math.round(-u*C+o*k),B=(Math.max(0,Math.min(a-1,Y))*t+Math.max(0,Math.min(t-1,F)))*4,$=(e[B]*.299+e[B+1]*.587+e[B+2]*.114)/255,re=c*.5*Math.sqrt($),V=(p*t+_)*4;P<re&&(s.monochrome?d[V]=d[V+1]=d[V+2]=0:(d[V]=e[B],d[V+1]=e[B+1],d[V+2]=e[B+2])),d[V+3]=255}for(let p=0;p<e.length;p++)e[p]=d[p]}_applyAscii(e,t,a){const s=a.cellSize,c=a.charset||Ee.STANDARD,n=Math.floor(e/s),o=Math.floor(t/s);this.ctx.fillStyle=a.showBackground?a.backgroundColor:"#000",this.ctx.fillRect(0,0,e,t),this.ctx.font=`${s}px monospace`,this.ctx.textAlign="center",this.ctx.textBaseline="middle";const u=document.createElement("canvas");u.width=e,u.height=t;const d=u.getContext("2d");d.drawImage(this.image,0,0,e,t);for(let p=0;p<o;p++)for(let _=0;_<n;_++){const E=_*s+s/2,R=p*s+s/2,C=d.getImageData(_*s,p*s,s,s).data;let k=0,P=0,F=0,Y=0;for(let X=0;X<C.length;X+=4)k+=C[X],P+=C[X+1],F+=C[X+2],Y++;const B=k/Y,$=P/Y,re=F/Y,V=(B*.299+$*.587+re*.114)/255;let ee=Math.round(V*(c.length-1));a.invert&&(ee=c.length-1-ee),ee=Math.max(0,Math.min(c.length-1,ee));const ne=c[ee];a.color?this.ctx.fillStyle=`rgb(${Math.round(B)}, ${Math.round($)}, ${Math.round(re)})`:this.ctx.fillStyle="#fff",this.ctx.fillText(ne,E,R)}this.imageData=this.ctx.getImageData(0,0,e,t)}destroy(){this.image=null,this.overlayImage=null,this.imageData=null}}function xn(r){try{return new pn(r)}catch(e){return console.warn("WebGL not available, falling back to CPU renderer:",e),new vn(r)}}const bn=r=>new Promise((e,t)=>{if(!r.type.match(/^image\/(png|jpeg|webp)$/)){t(new Error("Unsupported file type. Please use PNG, JPG, or WebP."));return}const a=new FileReader;a.onload=s=>{const c=new Image;c.onload=()=>e({image:c,url:s.target.result,corsError:!1}),c.onerror=()=>t(new Error("Failed to load image")),c.src=s.target.result},a.onerror=()=>t(new Error("Failed to read file")),a.readAsDataURL(r)}),_n=r=>new Promise((e,t)=>{if(!r.type.startsWith("video/")){t(new Error("Not a video file. Please upload a video."));return}const a=URL.createObjectURL(r),s=document.createElement("video");s.crossOrigin="anonymous",s.muted=!0,s.playsInline=!0,s.preload="auto",s.loop=!0,s.onloadedmetadata=()=>{s.currentTime=.001},s.onseeked=()=>{e({video:s,url:a,width:s.videoWidth,height:s.videoHeight,duration:s.duration,corsError:!1})},s.onerror=()=>{URL.revokeObjectURL(a),t(new Error("Failed to load video. Format may not be supported by your browser."))},s.src=a}),yn=r=>new Promise((e,t)=>{const a=document.createElement("video");a.crossOrigin="anonymous",a.muted=!0,a.playsInline=!0,a.preload="auto",a.loop=!0,a.onloadedmetadata=()=>{a.currentTime=.001},a.onseeked=()=>{try{const s=document.createElement("canvas");s.width=1,s.height=1;const c=s.getContext("2d");c.drawImage(a,0,0,1,1),c.getImageData(0,0,1,1),e({video:a,url:r,width:a.videoWidth,height:a.videoHeight,duration:a.duration,corsError:!1})}catch{e({video:a,url:r,width:a.videoWidth,height:a.videoHeight,duration:a.duration,corsError:!0})}},a.onerror=()=>{t(new Error("Failed to load video. Check the URL and try again."))},a.src=r}),rt=r=>new Promise((e,t)=>{const a=new Image;a.crossOrigin="anonymous",a.onload=()=>{try{const s=document.createElement("canvas");s.width=1,s.height=1;const c=s.getContext("2d");c.drawImage(a,0,0,1,1),c.getImageData(0,0,1,1),e({image:a,url:r,corsError:!1})}catch{e({image:a,url:r,corsError:!0})}},a.onerror=()=>{t(new Error("Failed to load image. Check the URL and try again."))},a.src=r}),Pt=()=>navigator.clipboard&&typeof ClipboardItem<"u"&&navigator.clipboard.write,En=async r=>{if(!Pt())throw new Error("Clipboard image copy not supported in this browser");return new Promise((e,t)=>{r.toBlob(async a=>{if(!a){t(new Error("Failed to create image blob"));return}try{const s=new ClipboardItem({"image/png":a});await navigator.clipboard.write([s]),e()}catch(s){t(new Error(`Clipboard write failed: ${s.message}`))}},"image/png")})},Cn=async r=>{const e=r.toDataURL("image/png");await navigator.clipboard.writeText(e)},Rn=(r,e={})=>{const{format:t="png",quality:a=.92,filename:s="texture-lab-export"}=e;return new Promise((c,n)=>{const o=t==="jpg"?"image/jpeg":"image/png",u=t==="jpg"?"jpg":"png";r.toBlob(d=>{if(!d){n(new Error("Failed to create image blob"));return}const p=URL.createObjectURL(d),_=document.createElement("a");_.href=p,_.download=`${s}.${u}`,document.body.appendChild(_),_.click(),document.body.removeChild(_),URL.revokeObjectURL(p),c()},o,t==="jpg"?a:void 0)})},Tn=(r,e=256)=>{const t=document.createElement("canvas");t.width=e,t.height=e;const a=t.getContext("2d"),s=a.createImageData(e,e),c=s.data,n=o=>{const u=Math.sin(o)*1e4;return u-Math.floor(u)};switch(r){case"paper":{for(let o=0;o<c.length;o+=4){const u=o/4%e,d=Math.floor(o/4/e),p=n(u*.1+d*.1),_=n(u*.05+d*.2+1e3),E=Math.round((p*.7+_*.3)*60+195);c[o]=c[o+1]=c[o+2]=E,c[o+3]=255}break}case"film-grain":{for(let o=0;o<c.length;o+=4){const u=n(o),d=Math.round(u*255);c[o]=c[o+1]=c[o+2]=d,c[o+3]=Math.round(u*100)}break}case"canvas":{for(let o=0;o<c.length;o+=4){const u=o/4%e,d=Math.floor(o/4/e),p=(Math.sin(u*.5)*.5+.5)*(Math.sin(d*.5)*.5+.5),_=n(o)*.2,E=Math.round((p+_)*60+180);c[o]=c[o+1]=c[o+2]=E,c[o+3]=255}break}case"dust":{for(let o=0;o<c.length;o+=4){const u=n(o);u>.98?(c[o]=c[o+1]=c[o+2]=0,c[o+3]=Math.round(n(o+1)*200)):u>.95?(c[o]=c[o+1]=c[o+2]=255,c[o+3]=Math.round(n(o+2)*50)):(c[o]=c[o+1]=c[o+2]=128,c[o+3]=0)}break}default:for(let o=0;o<c.length;o+=4)c[o]=c[o+1]=c[o+2]=128,c[o+3]=255}return a.putImageData(s,0,0),new Promise(o=>{const u=new Image;u.onload=()=>o(u),u.src=t.toDataURL()})};function Un({toolSelector:r}){const e=or({base:!0,lg:!1}),[t,a]=g.useState(!1),s=g.useRef(null),c=g.useRef(null),n=g.useRef(null),o=g.useRef(null),u=g.useRef(null),[d,p]=g.useState(Qo),{image:_,video:E,mediaType:R,corsError:C,effects:k,seed:P,previewQuality:F,exportFormat:Y,exportQuality:B,exportScale:$,viewMode:re,isPlaying:V,currentTime:ee,duration:ne,isExporting:X,exportProgress:fe,exportStatus:me}=d;g.useEffect(()=>{if(s.current&&!c.current)try{c.current=xn(s.current)}catch(x){console.error("Failed to create renderer:",x),H.create({title:"Renderer Error",description:"Failed to initialize graphics renderer.",type:"error",duration:5e3})}return()=>{c.current&&(c.current.destroy(),c.current=null),o.current&&(o.current.pause(),o.current.src&&o.current.src.startsWith("blob:")&&URL.revokeObjectURL(o.current.src),o.current.src="",o.current=null)}},[]);const v=g.useCallback(()=>{if(!c.current)return;if(R==="video"&&E){c.current.updateVideoFrame(E),c.current.render(k,P,E.videoWidth,E.videoHeight);return}if(!_)return;let x=_.width,f=_.height;if(F==="draft"&&(_.width>1e3||_.height>1e3)){const h=Math.min(1e3/_.width,1e3/_.height);x=Math.round(_.width*h),f=Math.round(_.height*h)}c.current.render(k,P,x,f)},[_,E,R,k,P,F]),y=g.useRef(null);g.useEffect(()=>{if(R!=="video"||!E||!V){u.current&&(cancelAnimationFrame(u.current),u.current=null);return}const x=()=>{!E.paused&&!E.ended&&(v(),p(f=>({...f,currentTime:E.currentTime})),u.current=requestAnimationFrame(x))};return u.current=requestAnimationFrame(x),()=>{u.current&&cancelAnimationFrame(u.current)}},[R,E,V,v]),g.useEffect(()=>(n.current&&clearTimeout(n.current),y.current&&cancelAnimationFrame(y.current),F==="draft"?y.current=requestAnimationFrame(()=>{v()}):n.current=setTimeout(()=>{y.current=requestAnimationFrame(()=>{v()})},150),()=>{n.current&&clearTimeout(n.current),y.current&&cancelAnimationFrame(y.current)}),[v,F]);const q=g.useRef(null);g.useEffect(()=>{const x=async()=>{if(!c.current)return;const h=k.find(L=>L.type==="overlay"&&L.enabled);if(!h){q.current!==null&&(c.current.setOverlayTexture(null),q.current=null);return}const{texture:S,customTextureUrl:D}=h.params,N=`${S}:${D||""}`;if(q.current!==N){if(S===se.CUSTOM&&D)try{const L=await rt(D);if(f)return;c.current.setOverlayTexture(L.image),q.current=N,v()}catch{console.warn("Failed to load custom overlay texture")}else if(S!==se.CUSTOM){const L=await Tn(S);if(f)return;c.current.setOverlayTexture(L),q.current=N,v()}}};let f=!1;return x(),()=>{f=!0}},[k,v]);const G=g.useCallback(async(x,f)=>{o.current&&(o.current.pause(),o.current.src&&o.current.src.startsWith("blob:")&&URL.revokeObjectURL(o.current.src),o.current.src="",o.current=null);try{let h;f==="file"?h=await bn(x):h=await rt(x),c.current&&c.current.setImage(h.image),p(S=>({...S,image:h.image,imageUrl:h.url,video:null,videoUrl:null,mediaType:"image",corsError:h.corsError,isPlaying:!1,currentTime:0,duration:0})),h.corsError&&H.create({title:"CORS Warning",description:"Image loaded but export/copy disabled. Re-upload locally to enable.",type:"warning",duration:5e3})}catch(h){H.create({title:"Failed to load image",description:h.message,type:"error",duration:3e3})}},[]),Z=g.useCallback(async(x,f)=>{o.current&&(o.current.pause(),o.current.src&&o.current.src.startsWith("blob:")&&URL.revokeObjectURL(o.current.src),o.current.src="");try{let h;f==="file"?h=await _n(x):h=await yn(x),o.current=h.video,c.current&&(c.current.setImage(h.video),c.current.updateVideoFrame(h.video),c.current.render([],0,h.video.videoWidth,h.video.videoHeight)),h.video.play(),p(S=>({...S,image:null,imageUrl:null,video:h.video,videoUrl:h.url,mediaType:"video",corsError:h.corsError,isPlaying:!0,currentTime:0,duration:h.duration})),h.corsError&&H.create({title:"CORS Warning",description:"Video loaded but export disabled. Re-upload locally to enable.",type:"warning",duration:5e3})}catch(h){H.create({title:"Failed to load video",description:h.message,type:"error",duration:3e3})}},[]),Q=g.useCallback(async(x,f)=>{var S;if(f==="file")return x.type.startsWith("video/")?Z(x,f):G(x,f);const h=(S=x.split("?")[0].split(".").pop())==null?void 0:S.toLowerCase();return["mp4","webm","ogg","mov"].includes(h)?Z(x,f):G(x,f)},[G,Z]),ge=g.useCallback(()=>{o.current&&(o.current.paused?(o.current.play(),p(x=>({...x,isPlaying:!0}))):(o.current.pause(),p(x=>({...x,isPlaying:!1}))))},[]),pe=g.useCallback(x=>{o.current&&(o.current.currentTime=x,p(f=>({...f,currentTime:x})),v())},[v]),W=g.useCallback(x=>{p(f=>({...f,effects:x}))},[]),K=g.useCallback(x=>{p(f=>({...f,seed:x}))},[]),oe=g.useCallback(x=>{p(f=>({...f,previewQuality:x}))},[]),be=g.useCallback(x=>{p(f=>({...f,exportFormat:x}))},[]),Ce=g.useCallback(x=>{p(f=>({...f,exportQuality:x}))},[]),Re=g.useCallback(x=>{p(f=>({...f,exportScale:x}))},[]),Ie=g.useCallback(x=>{p(f=>({...f,viewMode:x}))},[]),_e=g.useCallback(async()=>{if(!(!s.current||C)){if(R==="video"){H.create({title:"Cannot copy video",description:"Copy to clipboard only works for images. Use export for video.",type:"warning",duration:3e3});return}try{c.current&&_&&c.current.render(k,P,_.width,_.height),Pt()?(await En(s.current),H.create({title:"Copied to clipboard",type:"success",duration:2e3})):(await Cn(s.current),H.create({title:"Copied as data URL",description:"Image clipboard not supported in this browser.",type:"info",duration:3e3})),v()}catch(x){H.create({title:"Copy failed",description:x.message,type:"error",duration:3e3})}}},[C,R,_,k,P,v]),Te=g.useCallback(async()=>{if(!s.current||!E||C||X)return;p(z=>({...z,isExporting:!0,exportProgress:0,exportStatus:"Preparing..."}));const x=!E.paused;x&&(E.pause(),p(z=>({...z,isPlaying:!1})));const f=E.loop;E.loop=!1;const h=E,S=s.current,D=c.current;let N=null,L=null;try{const z=h.duration;h.currentTime=0,await Promise.race([new Promise(U=>{const Ue=()=>{h.removeEventListener("seeked",Ue),U()};h.addEventListener("seeked",Ue)}),new Promise(U=>setTimeout(U,200))]),h.currentTime>.1&&(h.currentTime=0,await new Promise(U=>setTimeout(U,100))),D.updateVideoFrame(h),D.render(k,P,h.videoWidth,h.videoHeight),p(U=>({...U,exportStatus:"Recording..."}));const ae=S.captureStream(60);L=new MediaRecorder(ae,{mimeType:"video/webm;codecs=vp9",videoBitsPerSecond:12e6});const We=[];L.ondataavailable=U=>{U.data.size>0&&We.push(U.data)};const Lt=new Promise(U=>{L.onstop=()=>U(We)});L.start(100),await new Promise(U=>setTimeout(U,50));const qe=()=>{D.updateVideoFrame(h),D.render(k,P,h.videoWidth,h.videoHeight);const U=Math.round(h.currentTime/z*100);p(Ue=>({...Ue,exportProgress:Math.min(U,100),exportStatus:"Exporting..."})),!h.ended&&!h.paused&&(N=requestAnimationFrame(qe))};N=requestAnimationFrame(qe),await h.play(),await new Promise(U=>{if(h.ended){U();return}h.addEventListener("ended",U,{once:!0})}),N&&(cancelAnimationFrame(N),N=null),D.updateVideoFrame(h),D.render(k,P,h.videoWidth,h.videoHeight),await new Promise(U=>setTimeout(U,200)),L.stop();const Ut=await Lt,$e=new Blob(Ut,{type:"video/webm"}),Ye=URL.createObjectURL($e),we=document.createElement("a");we.href=Ye,we.download=`texture-lab-${Date.now()}.webm`,document.body.appendChild(we),we.click(),document.body.removeChild(we),URL.revokeObjectURL(Ye),h.loop=f,h.currentTime=0,x&&(h.play(),p(U=>({...U,isPlaying:!0}))),v(),p(U=>({...U,isExporting:!1,exportProgress:0,exportStatus:""})),H.create({title:"Video exported",description:`Saved as WebM (${($e.size/1024/1024).toFixed(1)} MB)`,type:"success",duration:2e3})}catch(z){console.error("Video export error:",z),N&&cancelAnimationFrame(N),L&&L.state==="recording"&&L.stop(),h.loop=f,h.pause(),h.currentTime=0,p(ae=>({...ae,isExporting:!1,exportProgress:0,exportStatus:""})),H.create({title:"Video export failed",description:z.message,type:"error",duration:3e3})}},[E,C,X,k,P,v]),ye=g.useCallback(async()=>{if(!(!s.current||C)){if(R==="video"&&E)return Te();if(_)try{const x=Math.min(_.width*$,8192),f=Math.min(_.height*$,8192);c.current&&c.current.render(k,P,x,f),await Rn(s.current,{format:Y,quality:B,filename:`texture-lab-${Date.now()}`}),H.create({title:"Export complete",type:"success",duration:2e3}),v()}catch(x){H.create({title:"Export failed",description:x.message,type:"error",duration:3e3})}}},[_,E,R,C,$,Y,B,k,P,v,Te]),ve=g.useCallback(()=>{p(x=>({...x,effects:[],seed:Math.floor(Math.random()*1e5),previewQuality:"draft",viewMode:"preview",exportFormat:"png",exportQuality:.92,exportScale:1})),c.current&&c.current.setOverlayTexture(null)},[]),b=g.useCallback(()=>{o.current&&(o.current.pause(),o.current.src&&URL.revokeObjectURL(o.current.src),o.current.src="",o.current=null),p(x=>({...x,image:null,imageUrl:null,video:null,videoUrl:null,mediaType:null,corsError:!1,isPlaying:!1,currentTime:0,duration:0})),c.current&&c.current.setImage(null)},[]);return i.jsxs(T,{h:"100%",w:"100%",gap:{base:0,lg:4},direction:{base:"column",lg:"row"},position:"relative",overflow:"hidden",children:[i.jsx(I,{w:"280px",flexShrink:0,h:"100%",overflow:"hidden",display:{base:"none",lg:"flex"},flexDirection:"column",children:i.jsx(et,{image:_,video:E,mediaType:R,corsError:C,effects:k,seed:P,previewQuality:F,exportFormat:Y,exportQuality:B,exportScale:$,isExporting:X,exportProgress:fe,exportStatus:me,onMediaLoad:Q,onClearMedia:b,onEffectsChange:W,onSeedChange:K,onPreviewQualityChange:oe,onExportFormatChange:be,onExportQualityChange:Ce,onExportScaleChange:Re,onCopyToClipboard:_e,onExport:ye,onReset:ve,toolSelector:r})}),i.jsxs(I,{flex:1,position:"relative",borderRadius:{base:"12px",lg:"16px"},overflow:"hidden",border:"1px solid var(--border-primary)",bg:"var(--bg-body)",maxWidth:"1920px",margin:"0 auto",width:"100%",minH:{base:"400px",lg:"auto"},children:[i.jsx(Ui,{image:_,video:E,mediaType:R,canvasRef:s,viewMode:re,onViewModeChange:Ie,onMediaDrop:x=>Q(x,"file"),onMediaLoad:Q,isPlaying:V,currentTime:ee,duration:ne,onPlayPause:ge,onSeek:pe,isExporting:X}),i.jsxs(T,{as:"button",display:{base:"flex",lg:"none"},position:"absolute",bottom:20,right:4,align:"center",gap:2,bg:"var(--color-primary)",px:4,py:2.5,borderRadius:"12px",cursor:"pointer",onClick:()=>a(!0),boxShadow:"0 4px 20px rgba(168, 85, 247, 0.4)",_active:{transform:"scale(0.95)"},transition:"transform 0.1s",zIndex:10,children:[i.jsx(j,{as:ir,boxSize:4,color:"#fff"}),i.jsx(w,{fontSize:"13px",fontWeight:600,color:"#fff",children:"Controls"})]})]}),e&&i.jsxs(i.Fragment,{children:[i.jsx(I,{position:"fixed",top:0,left:0,right:0,bottom:0,bg:"rgba(0, 0, 0, 0.6)",opacity:t?1:0,visibility:t?"visible":"hidden",transition:"all 0.3s",zIndex:999,onClick:()=>a(!1)}),i.jsxs(I,{position:"fixed",bottom:0,left:0,right:0,bg:"var(--bg-card)",borderTop:"1px solid var(--border-primary)",borderTopRadius:"24px",transform:t?"translateY(0)":"translateY(100%)",transition:"transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",zIndex:1e3,maxH:"85vh",overflow:"hidden",display:"flex",flexDirection:"column",children:[i.jsx(T,{justify:"center",pt:3,pb:2,cursor:"pointer",onClick:()=>a(!1),children:i.jsx(I,{w:"40px",h:"4px",bg:"var(--border-primary)",borderRadius:"2px"})}),i.jsxs(T,{align:"center",justify:"space-between",px:4,pb:3,borderBottom:"1px solid var(--border-primary)",children:[i.jsx(w,{fontSize:"16px",fontWeight:700,color:"#fff",children:"Controls"}),i.jsx(T,{as:"button",align:"center",justify:"center",w:8,h:8,borderRadius:"8px",bg:"var(--bg-elevated)",cursor:"pointer",onClick:()=>a(!1),_hover:{bg:"var(--bg-elevated)"},children:i.jsx(j,{as:ke,boxSize:5,color:"var(--text-muted)"})})]}),i.jsx(I,{flex:1,overflowY:"auto",px:4,py:4,css:{"&::-webkit-scrollbar":{display:"none"},scrollbarWidth:"none"},children:i.jsx(et,{image:_,video:E,mediaType:R,corsError:C,effects:k,seed:P,previewQuality:F,exportFormat:Y,exportQuality:B,exportScale:$,isExporting:X,exportProgress:fe,exportStatus:me,onMediaLoad:Q,onClearMedia:b,onEffectsChange:W,onSeedChange:K,onPreviewQualityChange:oe,onExportFormatChange:be,onExportQualityChange:Ce,onExportScaleChange:Re,onCopyToClipboard:_e,onExport:ye,onReset:ve,toolSelector:r})})]})]})]})}export{Un as default};
