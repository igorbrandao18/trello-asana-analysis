(()=>{var e={};e.id=449,e.ids=[449],e.modules={7849:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external")},2934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},5403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},4580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},4749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},5869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},9491:e=>{"use strict";e.exports=require("assert")},2361:e=>{"use strict";e.exports=require("events")},7147:e=>{"use strict";e.exports=require("fs")},3685:e=>{"use strict";e.exports=require("http")},5687:e=>{"use strict";e.exports=require("https")},2037:e=>{"use strict";e.exports=require("os")},1017:e=>{"use strict";e.exports=require("path")},2781:e=>{"use strict";e.exports=require("stream")},6224:e=>{"use strict";e.exports=require("tty")},7310:e=>{"use strict";e.exports=require("url")},3837:e=>{"use strict";e.exports=require("util")},9796:e=>{"use strict";e.exports=require("zlib")},4299:(e,r,a)=>{"use strict";a.r(r),a.d(r,{GlobalError:()=>n.a,__next_app__:()=>u,originalPathname:()=>p,pages:()=>c,routeModule:()=>x,tree:()=>l});var t=a(482),s=a(9108),i=a(2563),n=a.n(i),o=a(8300),d={};for(let e in o)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(d[e]=()=>o[e]);a.d(r,d);let l=["",{children:["asana",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(a.bind(a,7669)),"C:\\Users\\brandao\\Desktop\\development\\backend\\trello-asana-analysis\\src\\app\\asana\\page.tsx"]}]},{}]},{layout:[()=>Promise.resolve().then(a.bind(a,4098)),"C:\\Users\\brandao\\Desktop\\development\\backend\\trello-asana-analysis\\src\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(a.t.bind(a,9361,23)),"next/dist/client/components/not-found-error"]}],c=["C:\\Users\\brandao\\Desktop\\development\\backend\\trello-asana-analysis\\src\\app\\asana\\page.tsx"],p="/asana/page",u={require:a,loadChunk:()=>Promise.resolve()},x=new t.AppPageRouteModule({definition:{kind:s.x.APP_PAGE,page:"/asana/page",pathname:"/asana",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:l}})},7129:(e,r,a)=>{Promise.resolve().then(a.bind(a,5940))},5940:(e,r,a)=>{"use strict";a.r(r),a.d(r,{default:()=>f});var t=a(5344),s=a(6327),i=a(9032),n=a(1970),o=a(2617),d=(0,a(2434).Z)("outline","layout-kanban","IconLayoutKanban",[["path",{d:"M4 4l6 0",key:"svg-0"}],["path",{d:"M14 4l6 0",key:"svg-1"}],["path",{d:"M4 8m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z",key:"svg-2"}],["path",{d:"M14 8m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v2a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z",key:"svg-3"}]]),l=a(3729),c=a(8243);let p=i.ZP.div`
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
    color: var(--brand-secondary);
  }

  h2 {
    font-size: 1.125rem;
    font-weight: 500;
  }
`,g=i.ZP.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
`,h=i.ZP.div`
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
`;function f(){let[e,r]=(0,l.useState)([]),[a,i]=(0,l.useState)(!0),[f,y]=(0,l.useState)(null);return((0,l.useEffect)(()=>{(async function(){try{i(!0),y(null);let e=(await c.Ju.get("/users/me")).data.data.workspaces[0].gid,a=await c.Ju.get(`/workspaces/${e}/projects`),t=await Promise.all(a.data.data.map(async e=>{let r=await c.Ju.get(`/projects/${e.gid}/tasks`);return{...e,tasks:r.data.data}}));r(t)}catch(e){y("Erro ao carregar dados do Asana. Por favor, tente novamente."),console.error("Erro ao carregar dados do Asana:",e)}finally{i(!1)}})()},[]),f)?t.jsx(s.F,{title:"Asana",children:(0,t.jsxs)(b,{children:[t.jsx(n.Z,{}),f]})}):a?t.jsx(s.F,{title:"Asana",children:t.jsx(m,{children:t.jsx(o.Z,{})})}):t.jsx(s.F,{title:"Asana",children:t.jsx(p,{children:t.jsx(u,{children:e.map(e=>(0,t.jsxs)(x,{children:[(0,t.jsxs)(v,{children:[t.jsx("div",{className:"icon",children:t.jsx(d,{})}),t.jsx("h2",{children:e.name})]}),t.jsx(g,{children:e.tasks?.map(e=>t.jsxs(h,{children:[t.jsx("h3",{children:e.name}),e.notes&&t.jsx("p",{children:e.notes})]},e.gid))})]},e.gid))})})})}},6327:(e,r,a)=>{"use strict";a.d(r,{F:()=>g});var t=a(5344),s=a(9032),i=a(2434),n=(0,i.Z)("outline","bell","IconBell",[["path",{d:"M10 5a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6",key:"svg-0"}],["path",{d:"M9 17v1a3 3 0 0 0 6 0v-1",key:"svg-1"}]]),o=(0,i.Z)("outline","user","IconUser",[["path",{d:"M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0",key:"svg-0"}],["path",{d:"M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2",key:"svg-1"}]]);let d=s.ZP.div`
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
`;function g({title:e,children:r}){return(0,t.jsxs)(d,{children:[(0,t.jsxs)(l,{children:[t.jsx(c,{children:e}),(0,t.jsxs)(p,{children:[t.jsx(u,{children:t.jsx(n,{})}),t.jsx(x,{children:t.jsx(o,{})})]})]}),t.jsx(v,{children:r})]})}},7669:(e,r,a)=>{"use strict";a.r(r),a.d(r,{$$typeof:()=>i,__esModule:()=>s,default:()=>n});let t=(0,a(6843).createProxy)(String.raw`C:\Users\brandao\Desktop\development\backend\trello-asana-analysis\src\app\asana\page.tsx`),{__esModule:s,$$typeof:i}=t,n=t.default}};var r=require("../../webpack-runtime.js");r.C(e);var a=e=>r(r.s=e),t=r.X(0,[249,498],()=>a(4299));module.exports=t})();