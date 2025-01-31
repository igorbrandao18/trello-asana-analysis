(()=>{var e={};e.id=211,e.ids=[211],e.modules={7849:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external")},2934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},5403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},4580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},4749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},5869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},9491:e=>{"use strict";e.exports=require("assert")},2361:e=>{"use strict";e.exports=require("events")},7147:e=>{"use strict";e.exports=require("fs")},3685:e=>{"use strict";e.exports=require("http")},5687:e=>{"use strict";e.exports=require("https")},2037:e=>{"use strict";e.exports=require("os")},1017:e=>{"use strict";e.exports=require("path")},2781:e=>{"use strict";e.exports=require("stream")},6224:e=>{"use strict";e.exports=require("tty")},7310:e=>{"use strict";e.exports=require("url")},3837:e=>{"use strict";e.exports=require("util")},9796:e=>{"use strict";e.exports=require("zlib")},6225:(e,r,t)=>{"use strict";t.r(r),t.d(r,{GlobalError:()=>n.a,__next_app__:()=>u,originalPathname:()=>p,pages:()=>c,routeModule:()=>x,tree:()=>l});var a=t(482),s=t(9108),i=t(2563),n=t.n(i),o=t(8300),d={};for(let e in o)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(d[e]=()=>o[e]);t.d(r,d);let l=["",{children:["trello",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(t.bind(t,9286)),"C:\\Users\\brandao\\Desktop\\development\\backend\\trello-asana-analysis\\src\\app\\trello\\page.tsx"]}]},{}]},{layout:[()=>Promise.resolve().then(t.bind(t,4098)),"C:\\Users\\brandao\\Desktop\\development\\backend\\trello-asana-analysis\\src\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(t.t.bind(t,9361,23)),"next/dist/client/components/not-found-error"]}],c=["C:\\Users\\brandao\\Desktop\\development\\backend\\trello-asana-analysis\\src\\app\\trello\\page.tsx"],p="/trello/page",u={require:t,loadChunk:()=>Promise.resolve()},x=new a.AppPageRouteModule({definition:{kind:s.x.APP_PAGE,page:"/trello/page",pathname:"/trello",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:l}})},887:(e,r,t)=>{Promise.resolve().then(t.bind(t,8368))},8368:(e,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>f});var a=t(5344),s=t(6327),i=t(9032),n=t(1970),o=t(2617),d=t(3139),l=t(3729),c=t(8243);let p=i.ZP.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
`,u=i.ZP.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--space-4);
`,x=i.ZP.div`
  background: var(--bg-surface);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-subtle);
  padding: var(--space-4);
`,v=i.ZP.div`
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-bottom: var(--space-4);
  padding-bottom: var(--space-4);
  border-bottom: 1px solid var(--border-subtle);

  .icon {
    width: 40px;
    height: 40px;
    border-radius: var(--radius-md);
    background: var(--bg-accent);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--brand-primary);
  }

  h2 {
    font-size: 1.125rem;
    font-weight: 500;
  }
`,h=i.ZP.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
`,g=i.ZP.div`
  background: var(--bg-surface-hover);
  border-radius: var(--radius-md);
  padding: var(--space-3);
  border: 1px solid var(--border-subtle);

  h3 {
    font-size: 1rem;
    font-weight: 500;
    margin-bottom: var(--space-2);
  }

  p {
    font-size: 0.875rem;
    color: var(--text-secondary);
  }
`,m=i.ZP.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-8);

  svg {
    width: 32px;
    height: 32px;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`,b=i.ZP.div`
  padding: var(--space-4);
  background: var(--bg-surface);
  border: 1px solid var(--status-error);
  border-radius: var(--radius-md);
  color: var(--status-error);
  display: flex;
  align-items: center;
  gap: var(--space-2);

  svg {
    width: 20px;
    height: 20px;
  }
`;function f(){let[e,r]=(0,l.useState)([]),[t,i]=(0,l.useState)(!0),[f,y]=(0,l.useState)(null);return((0,l.useEffect)(()=>{(async function(){try{i(!0),y(null);let e=await c.Yo.get("/members/me/boards",{params:{fields:"id,name,lists"}}),t=await Promise.all(e.data.map(async e=>{let r=await c.Yo.get(`/boards/${e.id}/cards`,{params:{fields:"id,name,desc"}});return{...e,cards:r.data}}));r(t)}catch(e){y("Erro ao carregar dados do Trello. Por favor, tente novamente."),console.error("Erro ao carregar dados do Trello:",e)}finally{i(!1)}})()},[]),f)?a.jsx(s.F,{title:"Trello",children:(0,a.jsxs)(b,{children:[a.jsx(n.Z,{}),f]})}):t?a.jsx(s.F,{title:"Trello",children:a.jsx(m,{children:a.jsx(o.Z,{})})}):a.jsx(s.F,{title:"Trello",children:a.jsx(p,{children:a.jsx(u,{children:e.map(e=>(0,a.jsxs)(x,{children:[(0,a.jsxs)(v,{children:[a.jsx("div",{className:"icon",children:a.jsx(d.Z,{})}),a.jsx("h2",{children:e.name})]}),a.jsx(h,{children:e.cards?.map(e=>a.jsxs(g,{children:[a.jsx("h3",{children:e.name}),e.desc&&a.jsx("p",{children:e.desc})]},e.id))})]},e.id))})})})}},6327:(e,r,t)=>{"use strict";t.d(r,{F:()=>h});var a=t(5344),s=t(9032),i=t(2434),n=(0,i.Z)("outline","bell","IconBell",[["path",{d:"M10 5a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6",key:"svg-0"}],["path",{d:"M9 17v1a3 3 0 0 0 6 0v-1",key:"svg-1"}]]),o=(0,i.Z)("outline","user","IconUser",[["path",{d:"M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0",key:"svg-0"}],["path",{d:"M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2",key:"svg-1"}]]);let d=s.ZP.div`
  flex: 1;
  margin-left: var(--sidebar-width);
  min-height: 100vh;
  background: var(--bg-base);
  width: calc(100vw - var(--sidebar-width));
`,l=s.ZP.header`
  height: var(--header-height);
  background: var(--bg-surface);
  border-bottom: 1px solid var(--border-subtle);
  padding: 0 var(--space-6);
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 10;
`,c=s.ZP.h1`
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-primary);
`,p=s.ZP.div`
  display: flex;
  align-items: center;
  gap: var(--space-4);
`,u=s.ZP.button`
  width: 40px;
  height: 40px;
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary);
  transition: all var(--transition-fast);

  &:hover {
    background: var(--bg-surface-hover);
    color: var(--text-primary);
  }

  svg {
    width: 20px;
    height: 20px;
  }
`,x=s.ZP.div`
  width: 40px;
  height: 40px;
  border-radius: var(--radius-full);
  background: var(--brand-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-primary);
`,v=s.ZP.main`
  width: 100%;
  height: calc(100vh - var(--header-height));
  overflow-y: auto;
  padding: var(--space-6);
`;function h({title:e,children:r}){return(0,a.jsxs)(d,{children:[(0,a.jsxs)(l,{children:[a.jsx(c,{children:e}),(0,a.jsxs)(p,{children:[a.jsx(u,{children:a.jsx(n,{})}),a.jsx(x,{children:a.jsx(o,{})})]})]}),a.jsx(v,{children:r})]})}},9286:(e,r,t)=>{"use strict";t.r(r),t.d(r,{$$typeof:()=>i,__esModule:()=>s,default:()=>n});let a=(0,t(6843).createProxy)(String.raw`C:\Users\brandao\Desktop\development\backend\trello-asana-analysis\src\app\trello\page.tsx`),{__esModule:s,$$typeof:i}=a,n=a.default}};var r=require("../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),a=r.X(0,[249,498],()=>t(6225));module.exports=a})();