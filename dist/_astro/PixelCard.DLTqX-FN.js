import{j as S}from"./jsx-runtime.BjG_zV1W.js";import{r as s}from"./index.DPQbMd_r.js";import{c as O}from"./utils.Bzm_o1ou.js";class ${width;height;ctx;x;y;color;speed;size;sizeStep;minSize;maxSizeInteger;maxSize;delay;counter;counterStep;isIdle;isReverse;isShimmer;constructor(r,l,m,p,i,t,h){this.width=r.width,this.height=r.height,this.ctx=l,this.x=m,this.y=p,this.color=i,this.speed=this.getRandomValue(.1,.9)*t,this.size=0,this.sizeStep=Math.random()*.8,this.minSize=1.5,this.maxSizeInteger=6,this.maxSize=this.getRandomValue(this.minSize,this.maxSizeInteger),this.delay=h,this.counter=0,this.counterStep=Math.random()*4+(this.width+this.height)*.01,this.isIdle=!1,this.isReverse=!1,this.isShimmer=!1}getRandomValue(r,l){return Math.random()*(l-r)+r}draw(){const r=this.maxSizeInteger*.5-this.size*.5;this.ctx.fillStyle=this.color,this.ctx.fillRect(this.x+r,this.y+r,this.size,this.size)}appear(){if(this.isIdle=!1,this.counter<=this.delay){this.counter+=this.counterStep;return}this.size>=this.maxSize&&(this.isShimmer=!0),this.isShimmer?this.shimmer():this.size+=this.sizeStep,this.draw()}disappear(){if(this.isShimmer=!1,this.counter=0,this.size<=0){this.isIdle=!0;return}else this.size-=.1;this.draw()}shimmer(){this.size>=this.maxSize?this.isReverse=!0:this.size<=this.minSize&&(this.isReverse=!1),this.isReverse?this.size-=this.speed:this.size+=this.speed}}function G(f,r){const i=f;return i<=0||r?0:i>=100?100*.001:i*.001}const k={default:{gap:12,speed:35,noFocus:!1},blue:{gap:10,speed:25,noFocus:!1},yellow:{gap:3,speed:20,noFocus:!1},pink:{gap:6,speed:80,noFocus:!0}},K=({variant:f="default",gap:r,speed:l,className:m="",children:p})=>{const i=s.useRef(null),t=s.useRef(null),h=s.useRef([]),n=s.useRef(null),F=s.useRef(typeof performance<"u"?performance.now():0),A=s.useRef(typeof window<"u"?window.matchMedia("(prefers-reduced-motion: reduce)").matches:!1).current,[L,x]=s.useState(!1),y=k[f]||k.default,R=r??y.gap,I=l??y.speed,w=y.noFocus,M=()=>{if(!i.current||!t.current)return;const e=i.current.getBoundingClientRect(),o=Math.floor(e.width),c=Math.floor(e.height),d=t.current.getContext("2d");if(!d){console.error("Canvas context not available.");return}t.current.width=o,t.current.height=c,t.current.style.width=`${o}px`,t.current.style.height=`${c}px`;const v=getComputedStyle(i.current).getPropertyValue("--pixel-active-color").trim(),u=[];for(let a=0;a<o;a+=R)for(let z=0;z<c;z+=R){const j=a-o/2,P=z-c/2,V=Math.sqrt(j*j+P*P),B=A?0:V;u.push(new $(t.current,d,a,z,v,G(I,A),B))}h.current=u},C=e=>{if(typeof requestAnimationFrame>"u")return;n.current=requestAnimationFrame(()=>C(e));const o=typeof performance<"u"?performance.now():0,c=o-F.current,d=1e3/60;if(c<d)return;F.current=o-c%d;const b=t.current?.getContext("2d");if(!b||!t.current)return;b.clearRect(0,0,t.current.width,t.current.height);let v=!0;for(let u=0;u<h.current.length;u++){const a=h.current[u];a[e](),a.isIdle||(v=!1)}v&&(typeof cancelAnimationFrame<"u"&&n.current&&cancelAnimationFrame(n.current),n.current=null)},g=e=>{typeof cancelAnimationFrame<"u"&&n.current&&cancelAnimationFrame(n.current),typeof requestAnimationFrame<"u"&&(n.current=requestAnimationFrame(()=>C(e)))},q=()=>{x(!0),g("appear")},E=()=>{x(!1),g("disappear")},N=e=>{e.currentTarget.contains(e.relatedTarget)||(x(!0),g("appear"))},T=e=>{e.currentTarget.contains(e.relatedTarget)||(x(!1),g("disappear"))};return s.useEffect(()=>{M();const e=new ResizeObserver(()=>{M()});return i.current&&e.observe(i.current),()=>{e.disconnect(),typeof cancelAnimationFrame<"u"&&n.current&&(cancelAnimationFrame(n.current),n.current=null)}},[R,I]),S.jsxs("div",{ref:i,className:O("pixel-card-container","relative overflow-hidden rounded-2xl isolate select-none","transition-colors duration-200 ease-[cubic-bezier(0.5,1,0.89,1)]",m),onMouseEnter:q,onMouseLeave:E,onFocus:w?void 0:N,onBlur:w?void 0:T,tabIndex:w?-1:0,children:[S.jsx("style",{children:`
              .pixel-card-container {
                --card-bg: transparent;
                --card-border: transparent;
                --pixel-active-color: hsl(0 0% 100%);
                --content-text-color: hsl(0 0% 75%);
              }
              
              .pixel-card-container {
                background-color: var(--card-bg);
                border: var(--card-border);
              }

              html.dark .pixel-card-container {
                --card-bg: transparent;
                --card-border: transparent;
                --pixel-active-color: hsl(0 0% 100%);
                --content-text-color: hsl(0 0% 75%);
              }

              html:not(.dark) .pixel-card-container {
                --card-bg: transparent;
                --card-border: transparent;
                --pixel-active-color: hsl(0 0% 100%);
                --content-text-color: hsl(0 0% 25%);
              }
            `}),S.jsx("div",{className:"absolute inset-0 z-10 flex flex-col justify-center items-center text-center p-4 text-[var(--content-text-color)]",children:p}),S.jsx("canvas",{className:"w-full h-full block absolute inset-0 z-20 pointer-events-none",ref:t})]})};export{K as PixelCard};
