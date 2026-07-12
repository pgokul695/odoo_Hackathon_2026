import{r as l,Q as B,W as H,U as Z,bZ as $,dq as Q,c$ as A,a4 as W,d2 as V,bQ as _,cZ as I,Z as N,cR as k,Y as J,$ as K,j as ee}from"./index-TQprzHkU.js";const te=`
uniform float time;
varying vec2 vUv;
varying vec3 vPosition;

void main() {
  vUv = uv;
  vPosition = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`,ne=`
uniform sampler2D uDataTexture;
uniform sampler2D uTexture;
uniform vec4 resolution;
varying vec2 vUv;

void main() {
  vec2 uv = vUv;
  vec4 offset = texture2D(uDataTexture, vUv);
  gl_FragColor = texture2D(uTexture, uv - 0.02 * offset.rg);
}`,oe=({grid:b=15,mouse:y=.1,strength:w=.15,relaxation:g=.9,imageSrc:D,className:q=""})=>{const x=l.useRef(null),Y=l.useRef(null),z=l.useRef(null),C=l.useRef(null),X=l.useRef(null),G=l.useRef(1),R=l.useRef(null),M=l.useRef(null);return l.useEffect(()=>{if(!x.current)return;const s=x.current,p=new B;Y.current=p;const n=new H({antialias:!0,alpha:!0,powerPreference:"high-performance"});n.setPixelRatio(Math.min(window.devicePixelRatio,2)),n.setClearColor(0,0),z.current=n,s.innerHTML="",s.appendChild(n.domElement);const i=new Z(0,0,0,0,-1e3,1e3);i.position.z=2,C.current=i;const v={time:{value:0},resolution:{value:new $},uTexture:{value:null},uDataTexture:{value:null}};new Q().load(D,e=>{e.minFilter=A,e.magFilter=A,e.wrapS=W,e.wrapT=W,G.current=e.image.width/e.image.height,v.uTexture.value=e,f()});const t=b,T=new Float32Array(4*t*t);for(let e=0;e<t*t;e++)T[e*4]=Math.random()*255-125,T[e*4+1]=Math.random()*255-125;const d=new V(T,t,t,_,I);d.needsUpdate=!0,v.uDataTexture.value=d;const L=new N({side:k,uniforms:v,vertexShader:te,fragmentShader:ne,transparent:!0}),E=new J(1,1,t-1,t-1),h=new K(E,L);X.current=h,p.add(h);const f=()=>{if(!s||!n||!i)return;const e=s.getBoundingClientRect(),o=e.width,u=e.height;if(o===0||u===0)return;const c=o/u;n.setSize(o,u),h&&h.scale.set(c,1,1);const r=1,m=r*c;i.left=-m/2,i.right=m/2,i.top=r/2,i.bottom=-r/2,i.updateProjectionMatrix(),v.resolution.value.set(o,u,1,1)};if(window.ResizeObserver){const e=new ResizeObserver(()=>{f()});e.observe(s),M.current=e}else window.addEventListener("resize",f);const a={x:0,y:0,prevX:0,prevY:0,vX:0,vY:0},F=e=>{const o=s.getBoundingClientRect(),u=(e.clientX-o.left)/o.width,c=1-(e.clientY-o.top)/o.height;a.vX=u-a.prevX,a.vY=c-a.prevY,Object.assign(a,{x:u,y:c,prevX:u,prevY:c})},U=()=>{d&&(d.needsUpdate=!0),Object.assign(a,{x:0,y:0,prevX:0,prevY:0,vX:0,vY:0})};s.addEventListener("mousemove",F),s.addEventListener("mouseleave",U),f();const j=()=>{if(R.current=requestAnimationFrame(j),!n||!p||!i)return;v.time.value+=.05;const e=d.image.data;for(let r=0;r<t*t;r++)e[r*4]*=g,e[r*4+1]*=g;const o=t*a.x,u=t*a.y,c=t*y;for(let r=0;r<t;r++)for(let m=0;m<t;m++){const P=Math.pow(o-r,2)+Math.pow(u-m,2);if(P<c*c){const S=4*(r+t*m),O=Math.min(c/Math.sqrt(P),10);e[S]+=w*100*a.vX*O,e[S+1]-=w*100*a.vY*O}}d.needsUpdate=!0,n.render(p,i)};return j(),()=>{R.current&&cancelAnimationFrame(R.current),M.current?M.current.disconnect():window.removeEventListener("resize",f),s.removeEventListener("mousemove",F),s.removeEventListener("mouseleave",U),n&&(n.dispose(),n.forceContextLoss(),s.contains(n.domElement)&&s.removeChild(n.domElement)),E&&E.dispose(),L&&L.dispose(),d&&d.dispose(),v.uTexture.value&&v.uTexture.value.dispose(),Y.current=null,z.current=null,C.current=null,X.current=null}},[b,y,w,g,D]),ee.jsx("div",{ref:x,className:`distortion-container ${q}`,style:{width:"100%",height:"100%",minWidth:"0",minHeight:"0"}})};export{oe as default};
