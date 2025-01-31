(()=>{var e={};e.id=834,e.ids=[834],e.modules={7849:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external")},2934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},5403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},4580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},4749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},5869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},9491:e=>{"use strict";e.exports=require("assert")},2361:e=>{"use strict";e.exports=require("events")},7147:e=>{"use strict";e.exports=require("fs")},3685:e=>{"use strict";e.exports=require("http")},5687:e=>{"use strict";e.exports=require("https")},2037:e=>{"use strict";e.exports=require("os")},1017:e=>{"use strict";e.exports=require("path")},2781:e=>{"use strict";e.exports=require("stream")},6224:e=>{"use strict";e.exports=require("tty")},7310:e=>{"use strict";e.exports=require("url")},3837:e=>{"use strict";e.exports=require("util")},9796:e=>{"use strict";e.exports=require("zlib")},2155:(e,s,a)=>{"use strict";a.r(s),a.d(s,{GlobalError:()=>i.a,__next_app__:()=>p,originalPathname:()=>c,pages:()=>l,routeModule:()=>m,tree:()=>n});var t=a(482),r=a(9108),o=a(2563),i=a.n(o),d=a(8300),f={};for(let e in d)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(f[e]=()=>d[e]);a.d(s,f);let n=["",{children:["endpoints",{children:["trello",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(a.bind(a,6579)),"C:\\Users\\brandao\\Desktop\\development\\backend\\trello-asana-analysis\\src\\app\\endpoints\\trello\\page.tsx"]}]},{}]},{}]},{layout:[()=>Promise.resolve().then(a.bind(a,4098)),"C:\\Users\\brandao\\Desktop\\development\\backend\\trello-asana-analysis\\src\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(a.t.bind(a,9361,23)),"next/dist/client/components/not-found-error"]}],l=["C:\\Users\\brandao\\Desktop\\development\\backend\\trello-asana-analysis\\src\\app\\endpoints\\trello\\page.tsx"],c="/endpoints/trello/page",p={require:a,loadChunk:()=>Promise.resolve()},m=new t.AppPageRouteModule({definition:{kind:r.x.APP_PAGE,page:"/endpoints/trello/page",pathname:"/endpoints/trello",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:n}})},6314:(e,s,a)=>{Promise.resolve().then(a.bind(a,4124))},4124:(e,s,a)=>{"use strict";a.r(s),a.d(s,{default:()=>k});var t=a(5344),r=a(9032),o=a(3139),i=a(3507),d=a(2977),f=a(8465),n=a(8091),l=a(3729);let c=r.ZP.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: var(--sidebar-width);
  display: grid;
  grid-template-columns: 300px 1fr;
  background: #1e2a3b;
  overflow: hidden;
`,p=r.ZP.div`
  background: rgba(0, 0, 0, 0.2);
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  padding: 2rem 0;
  overflow-y: auto;
`,m=r.ZP.div`
  padding: 2rem;
  overflow-y: auto;
`,u=r.ZP.div`
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
    color: #0079bf;
  }
`,h=r.ZP.div`
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
    background: rgba(0, 100, 255, 0.1);
    border: 1px solid rgba(0, 100, 255, 0.2);
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
`,g=r.ZP.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`,x=r.ZP.button`
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
  border-left: 2px solid ${e=>e.active?"#0079bf":"transparent"};
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
    background: #0079bf;
    color: #fff;
  }

  .path {
    font-family: monospace;
    font-size: 0.875rem;
  }
`,b=r.ZP.div`
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
      background: #0079bf;
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
`,v=r.ZP.div`
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
`,y=r.ZP.div`
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
`,j=r.ZP.div`
  background: rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  padding: 1.5rem;
  font-family: 'Consolas', monospace;
  font-size: 14px;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
  overflow-x: auto;

  &.example {
    background: rgba(0, 100, 255, 0.1);
    border: 1px solid rgba(0, 100, 255, 0.2);
  }

  .string { color: #7ee787; }
  .number { color: #79c0ff; }
  .boolean { color: #ff7b72; }
  .null { color: #ff7b72; }
  .key { 
    color: #d2a8ff; 
    font-weight: 500;
  }
`;function k(){let[e,s]=(0,l.useState)(0),a=[{method:"GET",path:"/1/members/me/boards",description:"Obt\xe9m todos os quadros do usu\xe1rio",details:"Retorna uma lista de todos os quadros aos quais o usu\xe1rio tem acesso. Inclui quadros pessoais e de organiza\xe7\xf5es.",auth:!0,params:[{name:"filter",type:"string",description:"all | open | closed | organization | public | starred"},{name:"fields",type:"string",description:"Campos a serem retornados (id, name, desc, etc)"}],example:"GET /1/members/me/boards?fields=id,name,desc&filter=open",response:`[
  {
    "id": "60d1f5f5f5f5f5f5f5f5f5f5",
    "name": "Projeto Website",
    "desc": "Desenvolvimento do novo website corporativo",
    "closed": false,
    "idOrganization": "60d1f5f5f5f5f5f5f5f5f5f5",
    "url": "https://trello.com/b/abc123/projeto-website",
    "shortUrl": "https://trello.com/b/abc123",
    "dateLastActivity": "2023-01-01T12:00:00.000Z",
    "idMemberCreator": "60d1f5f5f5f5f5f5f5f5f5f5",
    "subscribed": false,
    "starred": true,
    "memberships": [
      {
        "id": "60d1f5f5f5f5f5f5f5f5f5f5",
        "idMember": "60d1f5f5f5f5f5f5f5f5f5f5",
        "memberType": "admin",
        "unconfirmed": false,
        "deactivated": false
      }
    ],
    "prefs": {
      "permissionLevel": "private",
      "hideVotes": false,
      "voting": "disabled",
      "comments": "members",
      "background": "blue",
      "cardCovers": true
    }
  }
]`},{method:"GET",path:"/1/boards/{id}/lists",description:"Obt\xe9m todas as listas de um quadro",details:"Retorna todas as listas de um quadro espec\xedfico, incluindo listas arquivadas se solicitado.",auth:!0,params:[{name:"id",type:"string",description:"ID do quadro"},{name:"cards",type:"string",description:"none | open | closed | all"},{name:"filter",type:"string",description:"all | open | closed"}],example:"GET /1/boards/60d1f5f5/lists?cards=open&filter=open",response:`[
  {
    "id": "60d1f5f5f5f5f5f5f5f5f5f5",
    "name": "Em Desenvolvimento",
    "closed": false,
    "idBoard": "60d1f5f5f5f5f5f5f5f5f5f5",
    "pos": 65535.0,
    "subscribed": false,
    "softLimit": null,
    "status": "active",
    "createdAt": "2023-01-01T12:00:00.000Z",
    "updatedAt": "2023-01-01T12:00:00.000Z",
    "cards": [
      {
        "id": "60d1f5f5f5f5f5f5f5f5f5f5",
        "name": "Implementar Login Social",
        "pos": 65535.0
      }
    ]
  },
  {
    "id": "60d1f5f5f5f5f5f5f5f5f5f6",
    "name": "Em Teste",
    "closed": false,
    "idBoard": "60d1f5f5f5f5f5f5f5f5f5f5",
    "pos": 131070.0,
    "subscribed": false,
    "softLimit": null,
    "status": "active",
    "createdAt": "2023-01-01T12:00:00.000Z",
    "updatedAt": "2023-01-01T12:00:00.000Z",
    "cards": []
  }
]`},{method:"GET",path:"/1/lists/{id}/cards",description:"Obt\xe9m todos os cards de uma lista",details:"Retorna todos os cards de uma lista espec\xedfica, com op\xe7\xf5es para filtrar por status e incluir campos adicionais.",auth:!0,params:[{name:"id",type:"string",description:"ID da lista"},{name:"fields",type:"string",description:"Campos a serem inclu\xeddos na resposta"},{name:"attachments",type:"boolean",description:"Incluir anexos"}],example:"GET /1/lists/60d1f5f5/cards?fields=name,desc,due&attachments=true",response:`[
  {
    "id": "60d1f5f5f5f5f5f5f5f5f5f5",
    "name": "Implementar Login Social",
    "desc": "Adicionar op\xe7\xf5es de login com Google e GitHub",
    "closed": false,
    "idList": "60d1f5f5f5f5f5f5f5f5f5f5",
    "idBoard": "60d1f5f5f5f5f5f5f5f5f5f5",
    "pos": 65535.0,
    "due": "2023-01-01T12:00:00.000Z",
    "dueComplete": false,
    "dateLastActivity": "2023-01-01T12:00:00.000Z",
    "labels": [
      {
        "id": "60d1f5f5f5f5f5f5f5f5f5f5",
        "idBoard": "60d1f5f5f5f5f5f5f5f5f5f5",
        "name": "Prioridade Alta",
        "color": "red"
      }
    ],
    "members": [
      {
        "id": "60d1f5f5f5f5f5f5f5f5f5f5",
        "fullName": "Jo\xe3o Silva",
        "username": "joaosilva",
        "avatarUrl": "https://trello.com/avatars/user.jpg"
      }
    ],
    "attachments": [
      {
        "id": "60d1f5f5f5f5f5f5f5f5f5f5",
        "name": "especificacao.pdf",
        "url": "https://trello.com/attachments/60d1f5f5/download/especificacao.pdf",
        "bytes": 1024000,
        "date": "2023-01-01T12:00:00.000Z",
        "mimeType": "application/pdf"
      }
    ]
  }
]`},{method:"GET",path:"/1/cards/{id}",description:"Obt\xe9m detalhes de um card espec\xedfico",details:"Retorna informa\xe7\xf5es detalhadas de um card, incluindo anexos, checklists, coment\xe1rios e atividades.",auth:!0,params:[{name:"id",type:"string",description:"ID do card"},{name:"attachments",type:"boolean",description:"Incluir anexos"},{name:"checklists",type:"string",description:"all | none"}],example:"GET /1/cards/60d1f5f5?attachments=true&checklists=all",response:`{
  "id": "60d1f5f5f5f5f5f5f5f5f5f5",
  "name": "Implementar Login Social",
  "desc": "Adicionar op\xe7\xf5es de login com Google e GitHub",
  "closed": false,
  "idList": "60d1f5f5f5f5f5f5f5f5f5f5",
  "idBoard": "60d1f5f5f5f5f5f5f5f5f5f5",
  "pos": 65535.0,
  "due": "2023-01-01T12:00:00.000Z",
  "dueComplete": false,
  "dateLastActivity": "2023-01-01T12:00:00.000Z",
  "labels": [
    {
      "id": "60d1f5f5f5f5f5f5f5f5f5f5",
      "idBoard": "60d1f5f5f5f5f5f5f5f5f5f5",
      "name": "Prioridade Alta",
      "color": "red"
    }
  ],
  "members": [
    {
      "id": "60d1f5f5f5f5f5f5f5f5f5f5",
      "fullName": "Jo\xe3o Silva",
      "username": "joaosilva",
      "avatarUrl": "https://trello.com/avatars/user.jpg"
    }
  ],
  "attachments": [
    {
      "id": "60d1f5f5f5f5f5f5f5f5f5f5",
      "name": "especificacao.pdf",
      "url": "https://trello.com/attachments/60d1f5f5/download/especificacao.pdf",
      "bytes": 1024000,
      "date": "2023-01-01T12:00:00.000Z",
      "mimeType": "application/pdf"
    }
  ],
  "checklists": [
    {
      "id": "60d1f5f5f5f5f5f5f5f5f5f5",
      "name": "Requisitos",
      "checkItems": [
        {
          "id": "60d1f5f5f5f5f5f5f5f5f5f5",
          "name": "Configurar OAuth Google",
          "state": "complete",
          "due": "2023-01-01T12:00:00.000Z"
        },
        {
          "id": "60d1f5f5f5f5f5f5f5f5f5f5",
          "name": "Implementar callback GitHub",
          "state": "incomplete",
          "due": "2023-01-02T12:00:00.000Z"
        }
      ]
    }
  ],
  "comments": [
    {
      "id": "60d1f5f5f5f5f5f5f5f5f5f5",
      "text": "API keys configuradas no ambiente de desenvolvimento",
      "creator": {
        "id": "60d1f5f5f5f5f5f5f5f5f5f5",
        "fullName": "Jo\xe3o Silva",
        "username": "joaosilva"
      },
      "date": "2023-01-01T12:00:00.000Z"
    }
  ],
  "customFields": [
    {
      "id": "60d1f5f5f5f5f5f5f5f5f5f5",
      "value": {
        "text": "Alta"
      },
      "idCustomField": "60d1f5f5f5f5f5f5f5f5f5f5",
      "idModel": "60d1f5f5f5f5f5f5f5f5f5f5",
      "modelType": "card"
    }
  ],
  "subscribed": true,
  "url": "https://trello.com/c/abc123/implementar-login-social",
  "shortUrl": "https://trello.com/c/abc123"
}`}],r=a[e];return(0,t.jsxs)(c,{children:[(0,t.jsxs)(p,{children:[(0,t.jsxs)(u,{children:[t.jsx(o.Z,{}),"Endpoints do Trello"]}),(0,t.jsxs)(h,{children:[t.jsx("div",{className:"base-url",children:"https://api.trello.com"}),(0,t.jsxs)("div",{className:"auth-info",children:[(0,t.jsxs)("h4",{children:[t.jsx(i.Z,{}),"Autentica\xe7\xe3o"]}),(0,t.jsxs)("p",{children:[t.jsx(d.Z,{}),"API Key + Token necess\xe1rios"]})]})]}),t.jsx(g,{children:a.map((a,r)=>(0,t.jsxs)(x,{active:r===e,onClick:()=>s(r),children:[t.jsx("span",{className:"method",children:a.method}),t.jsx("span",{className:"path",children:a.path})]},r))})]}),t.jsx(m,{children:(0,t.jsxs)(b,{children:[(0,t.jsxs)("h2",{children:[t.jsx("span",{className:"method",children:r.method}),t.jsx("span",{className:"path",children:r.path})]}),t.jsx("p",{className:"description",children:r.details}),(0,t.jsxs)(v,{children:[(0,t.jsxs)("h3",{children:[t.jsx(f.Z,{}),"Par\xe2metros"]}),(0,t.jsxs)(y,{children:[(0,t.jsxs)("div",{className:"header",children:[t.jsx("div",{children:"Nome"}),t.jsx("div",{children:"Tipo"}),t.jsx("div",{children:"Descri\xe7\xe3o"})]}),r.params.map((e,s)=>(0,t.jsxs)("div",{className:"param",children:[t.jsx("div",{className:"name",children:e.name}),t.jsx("div",{className:"type",children:e.type}),t.jsx("div",{className:"desc",children:e.description})]},s))]})]}),(0,t.jsxs)(v,{children:[(0,t.jsxs)("h3",{children:[t.jsx(n.Z,{}),"Exemplo de Requisi\xe7\xe3o"]}),t.jsx(j,{className:"example",children:r.example})]}),(0,t.jsxs)(v,{children:[(0,t.jsxs)("h3",{children:[t.jsx(f.Z,{}),"Resposta"]}),t.jsx(j,{dangerouslySetInnerHTML:{__html:r.response.replace(/(".*?":|{|}|\[|\]|null|true|false|\d+(\.\d+)?)/g,e=>e.endsWith(":")?'<span class="key">'+e+"</span>":e.startsWith('"')?'<span class="string">'+e+"</span>":"null"===e?'<span class="null">'+e+"</span>":"true"===e||"false"===e?'<span class="boolean">'+e+"</span>":isNaN(Number(e))?e:'<span class="number">'+e+"</span>")}})]})]})})]})}},6579:(e,s,a)=>{"use strict";a.r(s),a.d(s,{$$typeof:()=>o,__esModule:()=>r,default:()=>i});let t=(0,a(6843).createProxy)(String.raw`C:\Users\brandao\Desktop\development\backend\trello-asana-analysis\src\app\endpoints\trello\page.tsx`),{__esModule:r,$$typeof:o}=t,i=t.default},8465:(e,s,a)=>{"use strict";a.d(s,{Z:()=>t});/**
 * @license @tabler/icons-react v3.29.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */var t=(0,a(2434).Z)("outline","brackets","IconBrackets",[["path",{d:"M8 4h-3v16h3",key:"svg-0"}],["path",{d:"M16 4h3v16h-3",key:"svg-1"}]])},8091:(e,s,a)=>{"use strict";a.d(s,{Z:()=>t});/**
 * @license @tabler/icons-react v3.29.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */var t=(0,a(2434).Z)("outline","code","IconCode",[["path",{d:"M7 8l-4 4l4 4",key:"svg-0"}],["path",{d:"M17 8l4 4l-4 4",key:"svg-1"}],["path",{d:"M14 4l-4 16",key:"svg-2"}]])},3507:(e,s,a)=>{"use strict";a.d(s,{Z:()=>t});/**
 * @license @tabler/icons-react v3.29.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */var t=(0,a(2434).Z)("outline","key","IconKey",[["path",{d:"M16.555 3.843l3.602 3.602a2.877 2.877 0 0 1 0 4.069l-2.643 2.643a2.877 2.877 0 0 1 -4.069 0l-.301 -.301l-6.558 6.558a2 2 0 0 1 -1.239 .578l-.175 .008h-1.172a1 1 0 0 1 -.993 -.883l-.007 -.117v-1.172a2 2 0 0 1 .467 -1.284l.119 -.13l.414 -.414h2v-2h2v-2l2.144 -2.144l-.301 -.301a2.877 2.877 0 0 1 0 -4.069l2.643 -2.643a2.877 2.877 0 0 1 4.069 0z",key:"svg-0"}],["path",{d:"M15 9h.01",key:"svg-1"}]])},2977:(e,s,a)=>{"use strict";a.d(s,{Z:()=>t});/**
 * @license @tabler/icons-react v3.29.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */var t=(0,a(2434).Z)("outline","lock","IconLock",[["path",{d:"M5 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-6z",key:"svg-0"}],["path",{d:"M11 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0",key:"svg-1"}],["path",{d:"M8 11v-4a4 4 0 1 1 8 0v4",key:"svg-2"}]])}};var s=require("../../../webpack-runtime.js");s.C(e);var a=e=>s(s.s=e),t=s.X(0,[249,498],()=>a(2155));module.exports=t})();