(()=>{var e={};e.id=113,e.ids=[113],e.modules={7849:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external")},2934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},5403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},4580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},4749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},5869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},9491:e=>{"use strict";e.exports=require("assert")},2361:e=>{"use strict";e.exports=require("events")},7147:e=>{"use strict";e.exports=require("fs")},3685:e=>{"use strict";e.exports=require("http")},5687:e=>{"use strict";e.exports=require("https")},2037:e=>{"use strict";e.exports=require("os")},1017:e=>{"use strict";e.exports=require("path")},2781:e=>{"use strict";e.exports=require("stream")},6224:e=>{"use strict";e.exports=require("tty")},7310:e=>{"use strict";e.exports=require("url")},3837:e=>{"use strict";e.exports=require("util")},9796:e=>{"use strict";e.exports=require("zlib")},4698:(e,r,s)=>{"use strict";s.r(r),s.d(r,{GlobalError:()=>n.a,__next_app__:()=>u,originalPathname:()=>c,pages:()=>p,routeModule:()=>m,tree:()=>d});var t=s(482),a=s(9108),o=s(2563),n=s.n(o),i=s(8300),l={};for(let e in i)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>i[e]);s.d(r,l);let d=["",{children:["mapeamento",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(s.bind(s,9175)),"C:\\Users\\brandao\\Desktop\\development\\backend\\trello-asana-analysis\\src\\app\\mapeamento\\page.tsx"]}]},{}]},{layout:[()=>Promise.resolve().then(s.bind(s,4098)),"C:\\Users\\brandao\\Desktop\\development\\backend\\trello-asana-analysis\\src\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(s.t.bind(s,9361,23)),"next/dist/client/components/not-found-error"]}],p=["C:\\Users\\brandao\\Desktop\\development\\backend\\trello-asana-analysis\\src\\app\\mapeamento\\page.tsx"],c="/mapeamento/page",u={require:s,loadChunk:()=>Promise.resolve()},m=new t.AppPageRouteModule({definition:{kind:a.x.APP_PAGE,page:"/mapeamento/page",pathname:"/mapeamento",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:d}})},1301:(e,r,s)=>{Promise.resolve().then(s.bind(s,2234))},2234:(e,r,s)=>{"use strict";s.r(r),s.d(r,{default:()=>m});var t=s(5344),a=s(9032),o=s(3139),n=s(2631),i=s(8767);let l=a.ZP.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: var(--sidebar-width);
  background: #1e2a3b;
  display: flex;
  flex-direction: column;
  overflow: auto;
  padding: 2rem;
`,d=a.ZP.h1`
  color: #fff;
  font-size: 1.5rem;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
`,p=a.ZP.div`
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
`,c=a.ZP.div`
  display: grid;
  grid-template-columns: 1fr 80px 1fr 1fr;
  gap: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  div {
    color: #fff;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    svg {
      width: 20px;
      height: 20px;
      opacity: 0.8;
    }
  }
`,u=a.ZP.div`
  display: grid;
  grid-template-columns: 1fr 80px 1fr 1fr;
  gap: 1rem;
  padding: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.02);
  }

  .arrow {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--primary);
  }

  .rules {
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.9rem;
    font-style: italic;
  }
`;function m(){return(0,t.jsxs)(l,{children:[t.jsx(d,{children:"Mapeamento De-Para: Trello → Asana"}),(0,t.jsxs)(p,{children:[(0,t.jsxs)(c,{children:[(0,t.jsxs)("div",{children:[t.jsx(o.Z,{}),"Campo Trello (Origem)"]}),t.jsx("div",{}),(0,t.jsxs)("div",{children:[t.jsx(n.Z,{}),"Campo Asana (Destino)"]}),t.jsx("div",{children:"Regras de Convers\xe3o"})]}),[{trello:"Board",asana:"Project",rules:"Convers\xe3o direta"},{trello:"List",asana:"Section",rules:"Convers\xe3o direta"},{trello:"Card",asana:"Task",rules:"Convers\xe3o direta"},{trello:"Card Name",asana:"Task Name",rules:"Convers\xe3o direta"},{trello:"Card Description",asana:"Task Description",rules:"Preservar formata\xe7\xe3o markdown"},{trello:"Due Date",asana:"Due Date",rules:"Converter timezone se necess\xe1rio"},{trello:"Labels",asana:"Tags",rules:"Criar tags correspondentes no Asana"},{trello:"Members",asana:"Assignees",rules:"Mapear usu\xe1rios correspondentes"},{trello:"Checklists",asana:"Subtasks",rules:"Converter cada item do checklist em subtask"},{trello:"Attachments",asana:"Attachments",rules:"Fazer upload dos arquivos para o Asana"},{trello:"Comments",asana:"Comments",rules:"Preservar autor e data original"},{trello:"Card Position",asana:"Task Order",rules:"Manter ordem relativa dos cards"}].map((e,r)=>(0,t.jsxs)(u,{children:[t.jsx("div",{children:e.trello}),t.jsx("div",{className:"arrow",children:t.jsx(i.Z,{})}),t.jsx("div",{children:e.asana}),t.jsx("div",{className:"rules",children:e.rules})]},r))]})]})}},9175:(e,r,s)=>{"use strict";s.r(r),s.d(r,{$$typeof:()=>o,__esModule:()=>a,default:()=>n});let t=(0,s(6843).createProxy)(String.raw`C:\Users\brandao\Desktop\development\backend\trello-asana-analysis\src\app\mapeamento\page.tsx`),{__esModule:a,$$typeof:o}=t,n=t.default},8767:(e,r,s)=>{"use strict";s.d(r,{Z:()=>t});/**
 * @license @tabler/icons-react v3.29.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */var t=(0,s(2434).Z)("outline","arrow-right","IconArrowRight",[["path",{d:"M5 12l14 0",key:"svg-0"}],["path",{d:"M13 18l6 -6",key:"svg-1"}],["path",{d:"M13 6l6 6",key:"svg-2"}]])}};var r=require("../../webpack-runtime.js");r.C(e);var s=e=>r(r.s=e),t=r.X(0,[249,498],()=>s(4698));module.exports=t})();