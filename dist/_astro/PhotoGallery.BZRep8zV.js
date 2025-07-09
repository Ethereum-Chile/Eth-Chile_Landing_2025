import{j as t}from"./jsx-runtime.BjG_zV1W.js";import{r as a}from"./index.DPQbMd_r.js";import{C as d,a as s,b as w,c as p,G as b,d as c}from"./ContainerScroll.uYlPY_EV.js";import"./proxy.BMIYqgw8.js";const g=["https://images.unsplash.com/photo-1529218402470-5dec8fea0761?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGFkfGVufDB8fDB8fHww","https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHRva3lvfGVufDB8MHwwfHx8Mg%3D%3D","https://images.unsplash.com/photo-1604928141064-207cea6f571f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dG9reW98ZW58MHwwfDB8fHwy","https://images.unsplash.com/photo-1573455494060-c5595004fb6c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8dG9reW98ZW58MHwwfDB8fHwy"],M=["https://images.unsplash.com/photo-1542052125323-e69ad37a47c2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fHRva3lvfGVufDB8MHwwfHx8Mg%3D%3D","https://images.unsplash.com/photo-1564284369929-026ba231f89b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D","https://images.unsplash.com/photo-1532236204992-f5e85c024202?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fHRva3lvfGVufDB8MHwwfHx8Mg%3D%3D","https://images.unsplash.com/photo-1493515322954-4fa727e97985?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHRva3lvfGVufDB8MHwwfHx8Mg%3D%3D"],y=["https://images.unsplash.com/photo-1528361237150-8a9a7df33035?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D","https://images.unsplash.com/photo-1493515322954-4fa727e97985?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D","https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHRva3lvfGVufDB8MHwwfHx8Mg%3D%3D","https://images.unsplash.com/photo-1608875004752-2fdb6a39ba4c?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"],A=()=>{const[n,h]=a.useState(!1),[x,m]=a.useState(!1),[D,u]=a.useState(0),o=a.useRef(null);return a.useEffect(()=>{const e=()=>{const l=window.scrollY;u(l);const r=document.querySelector('[data-section="why-ethereum"]');if(r){const i=r.getBoundingClientRect(),f=i.top<window.innerHeight&&i.bottom>0;h(f),m(f)}};return window.addEventListener("scroll",e),()=>window.removeEventListener("scroll",e)},[]),a.useEffect(()=>{let e;if(n&&o.current){const l=()=>{if(o.current){const r=o.current.style.transform,i=r.includes("translateY")?parseFloat(r.match(/translateY\(([^)]+)px\)/)?.[1]||"0"):0;o.current.style.transform=`translateY(${i-1}px)`}e=requestAnimationFrame(l)};e=requestAnimationFrame(l)}return()=>{e&&cancelAnimationFrame(e)}},[n]),t.jsxs("div",{className:"relative bg-custom-black min-h-screen",style:{scrollBehavior:"smooth"},children:[t.jsx("style",{dangerouslySetInnerHTML:{__html:`
          .auto-scroll .gallery-col:nth-child(1) {
            animation: autoScrollUp 20s linear infinite;
          }
          
          .auto-scroll .gallery-col:nth-child(2) {
            animation: autoScrollDown 20s linear infinite;
          }
          
          .auto-scroll .gallery-col:nth-child(3) {
            animation: autoScrollUp 20s linear infinite;
          }
          
          .auto-scroll.why-eth-visible .gallery-col:nth-child(1) {
            animation: autoScrollDown 20s linear infinite;
          }
          
          .auto-scroll.why-eth-visible .gallery-col:nth-child(2) {
            animation: autoScrollUp 20s linear infinite;
          }
          
          .auto-scroll.why-eth-visible .gallery-col:nth-child(3) {
            animation: autoScrollDown 20s linear infinite;
          }
          
          @keyframes autoScrollUp {
            0% {
              transform: translateY(0);
            }
            100% {
              transform: translateY(-100%);
            }
          }
          
          @keyframes autoScrollDown {
            0% {
              transform: translateY(0);
            }
            100% {
              transform: translateY(100%);
            }
          }
        `}}),t.jsxs(d,{className:"relative z-[9999] place-self-center px-6 pt-32 text-center",children:[t.jsx(s,{children:t.jsxs("h1",{className:"font-raleway text-5xl font-extralight md:text-7xl lg:text-8xl text-white mb-4",children:["ETH Chile"," ",t.jsx("span",{className:"font-raleway font-extralight text-blue-400",children:"2025"})]})}),t.jsx(s,{children:t.jsx("h2",{className:"font-raleway text-2xl font-light md:text-3xl lg:text-4xl text-white mb-6",children:"Fintech meets Ethereum"})}),t.jsx(s,{className:"my-8",children:t.jsxs("p",{className:"leading-relaxed tracking-wide text-gray-300 text-lg md:text-xl max-w-4xl mx-auto",children:["Experience the future of blockchain technology",t.jsx("br",{})," in the heart of Latin America's fintech revolution."]})}),t.jsxs(s,{className:"space-x-4",children:[t.jsx("button",{className:"gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors text-lg",children:"Get ticket"}),t.jsx("button",{className:"text-blue-400 hover:text-blue-300 font-semibold transition-colors text-lg border border-blue-400 hover:border-blue-300 px-8 py-4 rounded-lg",children:"Volunteer"})]})]}),t.jsx("div",{className:"pointer-events-none absolute z-10 h-[70vh] w-full",style:{background:"linear-gradient(to right, #1e40af, #7c3aed, #3b82f6)",filter:"blur(84px)",mixBlendMode:"screen"}}),t.jsx(w,{className:"relative h-[400vh]",children:t.jsx(p,{className:"h-svh",children:t.jsxs(b,{ref:o,className:`transition-transform duration-1000 ${n?"auto-scroll":""} ${x?"why-eth-visible":""}`,children:[t.jsx(c,{yRange:["-10%","2%"],className:"-mt-2 gallery-col",children:g.map((e,l)=>t.jsx("img",{className:"aspect-video block h-auto max-h-full w-full rounded-md object-cover shadow-lg border border-white/10",src:e,alt:"ETHChile gallery item"},l))}),t.jsx(c,{className:"mt-[-50%] gallery-col",yRange:["15%","5%"],children:M.map((e,l)=>t.jsx("img",{className:"aspect-video block h-auto max-h-full w-full rounded-md object-cover shadow-lg border border-white/10",src:e,alt:"ETHChile gallery item"},l))}),t.jsx(c,{yRange:["-10%","2%"],className:"-mt-2 gallery-col",children:y.map((e,l)=>t.jsx("img",{className:"aspect-video block h-auto max-h-full w-full rounded-md object-cover shadow-lg border border-white/10",src:e,alt:"ETHChile gallery item"},l))})]})})})]})};export{A as default};
