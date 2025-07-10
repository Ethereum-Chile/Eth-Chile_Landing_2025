import{j as e}from"./jsx-runtime.BjG_zV1W.js";import{r as a}from"./index.DPQbMd_r.js";import{C as x,a as r,b as y,c as b,G as f,d as s}from"./ContainerScroll.0CBDC83k.js";import"./proxy.s-jORzaS.js";import"./use-scroll.D_Hg85Nr.js";import"./use-transform.yJXVTdOs.js";const w=["/imgs/gallery/gallery_image_01.webp","/imgs/gallery/gallery_image_02.webp","/imgs/gallery/gallery_image_03.webp","/imgs/gallery/gallery_image_04.webp"],p=["/imgs/gallery/gallery_image_05.webp","/imgs/gallery/gallery_image_06.webp","/imgs/gallery/gallery_image_07.webp","/imgs/gallery/gallery_image_08.webp"],j=["/imgs/gallery/gallery_image_09.webp","/imgs/gallery/gallery_image_10.webp","/imgs/gallery/gallery_image_11.webp","/imgs/gallery/gallery_image_12.webp"],A=()=>{const[c,m]=a.useState(!1),[g,h]=a.useState(!1),[_,d]=a.useState(0),u=a.useRef(null);return a.useEffect(()=>{const l=()=>{const t=window.scrollY;d(t);const o=document.querySelector('[data-section="why-ethereum"]');if(o){const i=o.getBoundingClientRect(),n=i.top<window.innerHeight&&i.bottom>0;m(n),h(n)}};return window.addEventListener("scroll",l),()=>window.removeEventListener("scroll",l)},[]),e.jsxs("div",{className:"relative bg-custom-black min-h-screen",style:{scrollBehavior:"smooth"},children:[e.jsx("style",{dangerouslySetInnerHTML:{__html:`
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
        `}}),e.jsxs(x,{className:"relative z-[9999] place-self-center px-6 pt-32 text-center",children:[e.jsx(r,{children:e.jsxs("h1",{className:"font-raleway text-5xl font-extralight md:text-7xl lg:text-8xl text-white mb-4",children:["ETH Chile"," ",e.jsx("span",{className:"font-raleway font-extralight text-blue-400",children:"2025"})]})}),e.jsx(r,{children:e.jsx("h2",{className:"font-raleway text-2xl font-light md:text-3xl lg:text-4xl text-white mb-6",children:"Fintech meets Ethereum"})}),e.jsx(r,{className:"my-8",children:e.jsxs("p",{className:"leading-relaxed tracking-wide text-gray-300 text-lg md:text-xl max-w-4xl mx-auto",children:["Experience the future of blockchain technology",e.jsx("br",{})," in the heart of Latin America's fintech revolution."]})}),e.jsxs(r,{className:"space-x-4",children:[e.jsx("button",{className:"gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors text-lg",children:"Get ticket"}),e.jsx("button",{className:"text-blue-400 hover:text-blue-300 font-semibold transition-colors text-lg border border-blue-400 hover:border-blue-300 px-8 py-4 rounded-lg",children:"Volunteer"})]})]}),e.jsx("div",{className:"pointer-events-none absolute z-10 h-[70vh] w-full",style:{background:"linear-gradient(to right, #1e40af, #7c3aed, #3b82f6)",filter:"blur(84px)",mixBlendMode:"screen"}}),e.jsx(y,{className:"relative h-[400vh]",children:e.jsx(b,{className:"h-svh",children:e.jsxs(f,{ref:u,className:`transition-transform duration-1000 ${c?"auto-scroll":""} ${g?"why-eth-visible":""}`,children:[e.jsx(s,{yRange:["-10%","2%"],className:"-mt-2 gallery-col",children:w.map((l,t)=>e.jsx("img",{className:"aspect-video block h-auto max-h-full w-full rounded-md object-cover shadow-lg border border-white/10",src:l,alt:"ETHChile gallery item"},t))}),e.jsx(s,{className:"mt-[-50%] gallery-col",yRange:["15%","5%"],children:p.map((l,t)=>e.jsx("img",{className:"aspect-video block h-auto max-h-full w-full rounded-md object-cover shadow-lg border border-white/10",src:l,alt:"ETHChile gallery item"},t))}),e.jsx(s,{yRange:["-10%","2%"],className:"-mt-2 gallery-col",children:j.map((l,t)=>e.jsx("img",{className:"aspect-video block h-auto max-h-full w-full rounded-md object-cover shadow-lg border border-white/10",src:l,alt:"ETHChile gallery item"},t))})]})})})]})};export{A as default};
