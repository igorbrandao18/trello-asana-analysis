(()=>{var e={};e.id=585,e.ids=[585],e.modules={7849:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external")},2934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},5403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},4580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},4749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},5869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},9491:e=>{"use strict";e.exports=require("assert")},2361:e=>{"use strict";e.exports=require("events")},7147:e=>{"use strict";e.exports=require("fs")},3685:e=>{"use strict";e.exports=require("http")},5687:e=>{"use strict";e.exports=require("https")},2037:e=>{"use strict";e.exports=require("os")},1017:e=>{"use strict";e.exports=require("path")},2781:e=>{"use strict";e.exports=require("stream")},6224:e=>{"use strict";e.exports=require("tty")},7310:e=>{"use strict";e.exports=require("url")},3837:e=>{"use strict";e.exports=require("util")},9796:e=>{"use strict";e.exports=require("zlib")},7248:(e,a,s)=>{"use strict";s.r(a),s.d(a,{GlobalError:()=>i.a,__next_app__:()=>m,originalPathname:()=>l,pages:()=>c,routeModule:()=>u,tree:()=>d});var r=s(482),t=s(9108),o=s(2563),i=s.n(o),n=s(8300),p={};for(let e in n)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(p[e]=()=>n[e]);s.d(a,p);let d=["",{children:["endpoints",{children:["asana",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(s.bind(s,4553)),"C:\\Users\\brandao\\Desktop\\development\\backend\\trello-asana-analysis\\src\\app\\endpoints\\asana\\page.tsx"]}]},{}]},{}]},{layout:[()=>Promise.resolve().then(s.bind(s,4098)),"C:\\Users\\brandao\\Desktop\\development\\backend\\trello-asana-analysis\\src\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(s.t.bind(s,9361,23)),"next/dist/client/components/not-found-error"]}],c=["C:\\Users\\brandao\\Desktop\\development\\backend\\trello-asana-analysis\\src\\app\\endpoints\\asana\\page.tsx"],l="/endpoints/asana/page",m={require:s,loadChunk:()=>Promise.resolve()},u=new r.AppPageRouteModule({definition:{kind:t.x.APP_PAGE,page:"/endpoints/asana/page",pathname:"/endpoints/asana",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:d}})},5167:(e,a,s)=>{Promise.resolve().then(s.bind(s,5068))},5068:(e,a,s)=>{"use strict";s.r(a),s.d(a,{default:()=>k});var r=s(5344),t=s(9032),o=s(2631),i=s(3507),n=s(2977),p=s(8465),d=s(8091),c=s(3729);let l=t.ZP.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: var(--sidebar-width);
  display: grid;
  grid-template-columns: 300px 1fr;
  background: #1e2a3b;
  overflow: hidden;
`,m=t.ZP.div`
  background: rgba(0, 0, 0, 0.2);
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  padding: 2rem 0;
  overflow-y: auto;
`,u=t.ZP.div`
  padding: 2rem;
  overflow-y: auto;
`,g=t.ZP.div`
  padding: 0 2rem;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  color: #fff;
  font-size: 1.25rem;
  font-weight: 600;

  svg {
    width: 24px;
    height: 24px;
    color: #f06a6a;
  }
`,h=t.ZP.div`
  padding: 0 2rem;
  margin-bottom: 2rem;

  .base-url {
    font-family: monospace;
    background: rgba(255, 255, 255, 0.05);
    padding: 0.75rem;
    border-radius: 6px;
    color: #fff;
    font-size: 0.875rem;
  }

  .auth-info {
    margin-top: 1rem;
    padding: 0.75rem;
    background: rgba(240, 106, 106, 0.1);
    border: 1px solid rgba(240, 106, 106, 0.2);
    border-radius: 6px;
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.9);

    h4 {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin: 0 0 0.5rem;
      font-size: 0.875rem;
      color: #fff;

      svg {
        width: 16px;
        height: 16px;
      }
    }

    p {
      margin: 0;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: rgba(255, 255, 255, 0.7);
      
      svg {
        width: 14px;
        height: 14px;
      }
    }
  }
`,x=t.ZP.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`,f=t.ZP.button`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 2rem;
  background: ${e=>e.active?"rgba(255, 255, 255, 0.05)":"transparent"};
  border: none;
  width: 100%;
  text-align: left;
  cursor: pointer;
  color: ${e=>e.active?"#fff":"rgba(255, 255, 255, 0.6)"};
  border-left: 2px solid ${e=>e.active?"#f06a6a":"transparent"};
  transition: all 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    color: #fff;
  }

  .method {
    font-size: 0.75rem;
    font-weight: 600;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    background: #f06a6a;
    color: #fff;
  }

  .path {
    font-family: monospace;
    font-size: 0.875rem;
  }
`,b=t.ZP.div`
  h2 {
    color: #fff;
    font-size: 1.5rem;
    margin: 0 0 1rem;
    display: flex;
    align-items: center;
    gap: 1rem;

    .method {
      font-size: 0.875rem;
      padding: 0.25rem 0.75rem;
      border-radius: 4px;
      background: #f06a6a;
    }

    .path {
      font-family: monospace;
      opacity: 0.9;
    }
  }

  .description {
    color: rgba(255, 255, 255, 0.8);
    line-height: 1.6;
    margin-bottom: 2rem;
  }
`,v=t.ZP.div`
  margin-bottom: 2rem;

  h3 {
    color: #fff;
    font-size: 1rem;
    margin: 0 0 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    svg {
      width: 18px;
      height: 18px;
      opacity: 0.9;
    }
  }
`,y=t.ZP.div`
  background: rgba(255, 255, 255, 0.03);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;

  .header {
    display: grid;
    grid-template-columns: 150px 100px 1fr;
    gap: 1rem;
    padding: 0.75rem 1rem;
    background: rgba(255, 255, 255, 0.05);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    color: #fff;
    font-size: 0.875rem;
    font-weight: 500;
  }

  .param {
    display: grid;
    grid-template-columns: 150px 100px 1fr;
    gap: 1rem;
    padding: 0.75rem 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    font-size: 0.875rem;

    &:last-child {
      border-bottom: none;
    }

    .name {
      color: #60a5fa;
      font-family: monospace;
    }

    .type {
      color: #34d399;
    }

    .desc {
      color: rgba(255, 255, 255, 0.7);
    }
  }
`,j=t.ZP.div`
  background: rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  padding: 1.5rem;
  font-family: 'Consolas', monospace;
  font-size: 14px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
  overflow-x: auto;

  &.example {
    background: rgba(240, 106, 106, 0.1);
    border: 1px solid rgba(240, 106, 106, 0.2);
  }

  .string { color: #7ee787; }
  .number { color: #79c0ff; }
  .boolean { color: #ff7b72; }
  .null { color: #ff7b72; }
  .key { 
    color: #d2a8ff; 
    font-weight: 500;
  }
`;function k(){let[e,a]=(0,c.useState)(0),s=[{method:"GET",path:"/api/1.0/workspaces",description:"Obt\xe9m todos os workspaces",details:"Retorna uma lista de todos os workspaces aos quais o usu\xe1rio tem acesso.",auth:!0,params:[{name:"limit",type:"number",description:"N\xfamero m\xe1ximo de resultados a retornar"},{name:"offset",type:"string",description:"Token de pagina\xe7\xe3o para a pr\xf3xima p\xe1gina"}],example:"GET /api/1.0/workspaces?limit=50",response:`{
  "data": [
    {
      "gid": "12345",
      "name": "Minha Empresa",
      "resource_type": "workspace",
      "email_domains": ["minhaempresa.com"],
      "is_organization": true,
      "created_at": "2023-01-01T12:00:00.000Z",
      "permalink_url": "https://app.asana.com/0/12345",
      "is_free_for_guests": false
    }
  ]
}`},{method:"GET",path:"/api/1.0/projects",description:"Obt\xe9m todos os projetos",details:"Retorna uma lista de projetos em um workspace espec\xedfico.",auth:!0,params:[{name:"workspace",type:"string",description:"GID do workspace"},{name:"archived",type:"boolean",description:"Incluir projetos arquivados"},{name:"opt_fields",type:"string",description:"Lista de campos a incluir na resposta"}],example:"GET /api/1.0/projects?workspace=12345&archived=false",response:`{
  "data": [
    {
      "gid": "67890",
      "name": "Website Redesign",
      "resource_type": "project",
      "archived": false,
      "color": "light-green",
      "created_at": "2023-01-01T12:00:00.000Z",
      "current_status": {
        "text": "Em andamento",
        "color": "blue",
        "type": "on_track"
      },
      "due_date": "2023-12-31",
      "members": [
        {
          "gid": "12345",
          "name": "Jo\xe3o Silva",
          "email": "joao@empresa.com"
        }
      ],
      "owner": {
        "gid": "12345",
        "name": "Jo\xe3o Silva",
        "email": "joao@empresa.com"
      },
      "permalink_url": "https://app.asana.com/0/67890",
      "public": false,
      "workspace": {
        "gid": "12345",
        "name": "Minha Empresa",
        "resource_type": "workspace"
      }
    }
  ]
}`},{method:"POST",path:"/api/1.0/projects",description:"Cria um novo projeto",details:"Cria um novo projeto em um workspace espec\xedfico.",auth:!0,params:[{name:"name",type:"string",description:"Nome do projeto"},{name:"workspace",type:"string",description:"GID do workspace"},{name:"team",type:"string",description:"GID do time (opcional)"},{name:"due_date",type:"string",description:"Data de vencimento (YYYY-MM-DD)"}],example:`POST /api/1.0/projects
{
  "data": {
    "name": "Novo Projeto",
    "workspace": "12345",
    "due_date": "2023-12-31"
  }
}`,response:`{
  "data": {
    "gid": "67890",
    "name": "Novo Projeto",
    "resource_type": "project",
    "archived": false,
    "color": "light-green",
    "created_at": "2023-01-01T12:00:00.000Z",
    "due_date": "2023-12-31",
    "permalink_url": "https://app.asana.com/0/67890",
    "public": false,
    "workspace": {
      "gid": "12345",
      "name": "Minha Empresa",
      "resource_type": "workspace"
    }
  }
}`},{method:"POST",path:"/api/1.0/sections",description:"Cria uma nova se\xe7\xe3o",details:"Cria uma nova se\xe7\xe3o em um projeto espec\xedfico.",auth:!0,params:[{name:"name",type:"string",description:"Nome da se\xe7\xe3o"},{name:"project",type:"string",description:"GID do projeto"},{name:"insert_before",type:"string",description:"GID da se\xe7\xe3o antes da qual inserir (opcional)"},{name:"insert_after",type:"string",description:"GID da se\xe7\xe3o ap\xf3s a qual inserir (opcional)"}],example:`POST /api/1.0/sections
{
  "data": {
    "name": "Nova Se\xe7\xe3o",
    "project": "67890"
  }
}`,response:`{
  "data": {
    "gid": "13579",
    "name": "Nova Se\xe7\xe3o",
    "resource_type": "section",
    "created_at": "2023-01-01T12:00:00.000Z",
    "project": {
      "gid": "67890",
      "name": "Website Redesign",
      "resource_type": "project"
    }
  }
}`},{method:"POST",path:"/api/1.0/tasks",description:"Cria uma nova task",details:"Cria uma nova task em um projeto ou se\xe7\xe3o espec\xedfica.",auth:!0,params:[{name:"name",type:"string",description:"Nome da task"},{name:"projects",type:"array",description:"Lista de GIDs dos projetos"},{name:"section",type:"string",description:"GID da se\xe7\xe3o"},{name:"notes",type:"string",description:"Descri\xe7\xe3o da task"},{name:"due_on",type:"string",description:"Data de vencimento (YYYY-MM-DD)"},{name:"assignee",type:"string",description:"GID do usu\xe1rio respons\xe1vel"}],example:`POST /api/1.0/tasks
{
  "data": {
    "name": "Implementar Login Social",
    "projects": ["67890"],
    "section": "13579",
    "notes": "Adicionar op\xe7\xf5es de login com Google e GitHub",
    "due_on": "2023-12-31",
    "assignee": "12345"
  }
}`,response:`{
  "data": {
    "gid": "24680",
    "name": "Implementar Login Social",
    "resource_type": "task",
    "created_at": "2023-01-01T12:00:00.000Z",
    "completed": false,
    "due_on": "2023-12-31",
    "notes": "Adicionar op\xe7\xf5es de login com Google e GitHub",
    "assignee": {
      "gid": "12345",
      "name": "Jo\xe3o Silva",
      "email": "joao@empresa.com"
    },
    "projects": [
      {
        "gid": "67890",
        "name": "Website Redesign",
        "resource_type": "project"
      }
    ],
    "permalink_url": "https://app.asana.com/0/67890/24680",
    "tags": [],
    "workspace": {
      "gid": "12345",
      "name": "Minha Empresa",
      "resource_type": "workspace"
    }
  }
}`}],t=s[e];return(0,r.jsxs)(l,{children:[(0,r.jsxs)(m,{children:[(0,r.jsxs)(g,{children:[r.jsx(o.Z,{}),"Endpoints do Asana"]}),(0,r.jsxs)(h,{children:[r.jsx("div",{className:"base-url",children:"https://app.asana.com"}),(0,r.jsxs)("div",{className:"auth-info",children:[(0,r.jsxs)("h4",{children:[r.jsx(i.Z,{}),"Autentica\xe7\xe3o"]}),(0,r.jsxs)("p",{children:[r.jsx(n.Z,{}),"Personal Access Token necess\xe1rio"]})]})]}),r.jsx(x,{children:s.map((s,t)=>(0,r.jsxs)(f,{active:t===e,onClick:()=>a(t),children:[r.jsx("span",{className:"method",children:s.method}),r.jsx("span",{className:"path",children:s.path})]},t))})]}),r.jsx(u,{children:(0,r.jsxs)(b,{children:[(0,r.jsxs)("h2",{children:[r.jsx("span",{className:"method",children:t.method}),r.jsx("span",{className:"path",children:t.path})]}),r.jsx("p",{className:"description",children:t.details}),(0,r.jsxs)(v,{children:[(0,r.jsxs)("h3",{children:[r.jsx(p.Z,{}),"Par\xe2metros"]}),(0,r.jsxs)(y,{children:[(0,r.jsxs)("div",{className:"header",children:[r.jsx("div",{children:"Nome"}),r.jsx("div",{children:"Tipo"}),r.jsx("div",{children:"Descri\xe7\xe3o"})]}),t.params.map((e,a)=>(0,r.jsxs)("div",{className:"param",children:[r.jsx("div",{className:"name",children:e.name}),r.jsx("div",{className:"type",children:e.type}),r.jsx("div",{className:"desc",children:e.description})]},a))]})]}),(0,r.jsxs)(v,{children:[(0,r.jsxs)("h3",{children:[r.jsx(d.Z,{}),"Exemplo de Requisi\xe7\xe3o"]}),r.jsx(j,{className:"example",children:t.example})]}),(0,r.jsxs)(v,{children:[(0,r.jsxs)("h3",{children:[r.jsx(p.Z,{}),"Resposta"]}),r.jsx(j,{dangerouslySetInnerHTML:{__html:t.response.replace(/(".*?":|{|}|\[|\]|null|true|false|\d+(\.\d+)?)/g,e=>e.endsWith(":")?'<span class="key">'+e+"</span>":e.startsWith('"')?'<span class="string">'+e+"</span>":"null"===e?'<span class="null">'+e+"</span>":"true"===e||"false"===e?'<span class="boolean">'+e+"</span>":isNaN(Number(e))?e:'<span class="number">'+e+"</span>")}})]})]})})]})}},4553:(e,a,s)=>{"use strict";s.r(a),s.d(a,{$$typeof:()=>o,__esModule:()=>t,default:()=>i});let r=(0,s(6843).createProxy)(String.raw`C:\Users\brandao\Desktop\development\backend\trello-asana-analysis\src\app\endpoints\asana\page.tsx`),{__esModule:t,$$typeof:o}=r,i=r.default},8465:(e,a,s)=>{"use strict";s.d(a,{Z:()=>r});/**
 * @license @tabler/icons-react v3.29.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */var r=(0,s(2434).Z)("outline","brackets","IconBrackets",[["path",{d:"M8 4h-3v16h3",key:"svg-0"}],["path",{d:"M16 4h3v16h-3",key:"svg-1"}]])},8091:(e,a,s)=>{"use strict";s.d(a,{Z:()=>r});/**
 * @license @tabler/icons-react v3.29.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */var r=(0,s(2434).Z)("outline","code","IconCode",[["path",{d:"M7 8l-4 4l4 4",key:"svg-0"}],["path",{d:"M17 8l4 4l-4 4",key:"svg-1"}],["path",{d:"M14 4l-4 16",key:"svg-2"}]])},3507:(e,a,s)=>{"use strict";s.d(a,{Z:()=>r});/**
 * @license @tabler/icons-react v3.29.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */var r=(0,s(2434).Z)("outline","key","IconKey",[["path",{d:"M16.555 3.843l3.602 3.602a2.877 2.877 0 0 1 0 4.069l-2.643 2.643a2.877 2.877 0 0 1 -4.069 0l-.301 -.301l-6.558 6.558a2 2 0 0 1 -1.239 .578l-.175 .008h-1.172a1 1 0 0 1 -.993 -.883l-.007 -.117v-1.172a2 2 0 0 1 .467 -1.284l.119 -.13l.414 -.414h2v-2h2v-2l2.144 -2.144l-.301 -.301a2.877 2.877 0 0 1 0 -4.069l2.643 -2.643a2.877 2.877 0 0 1 4.069 0z",key:"svg-0"}],["path",{d:"M15 9h.01",key:"svg-1"}]])},2977:(e,a,s)=>{"use strict";s.d(a,{Z:()=>r});/**
 * @license @tabler/icons-react v3.29.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */var r=(0,s(2434).Z)("outline","lock","IconLock",[["path",{d:"M5 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-6z",key:"svg-0"}],["path",{d:"M11 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0",key:"svg-1"}],["path",{d:"M8 11v-4a4 4 0 1 1 8 0v4",key:"svg-2"}]])}};var a=require("../../../webpack-runtime.js");a.C(e);var s=e=>a(a.s=e),r=a.X(0,[249,498],()=>s(7248));module.exports=r})();