(()=>{var e={};e.id=191,e.ids=[191],e.modules={7849:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external")},2934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},5403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},4580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},4749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},5869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},9491:e=>{"use strict";e.exports=require("assert")},2361:e=>{"use strict";e.exports=require("events")},7147:e=>{"use strict";e.exports=require("fs")},3685:e=>{"use strict";e.exports=require("http")},5687:e=>{"use strict";e.exports=require("https")},2037:e=>{"use strict";e.exports=require("os")},1017:e=>{"use strict";e.exports=require("path")},2781:e=>{"use strict";e.exports=require("stream")},6224:e=>{"use strict";e.exports=require("tty")},7310:e=>{"use strict";e.exports=require("url")},3837:e=>{"use strict";e.exports=require("util")},9796:e=>{"use strict";e.exports=require("zlib")},4226:(e,a,r)=>{"use strict";r.r(a),r.d(a,{GlobalError:()=>o.a,__next_app__:()=>m,originalPathname:()=>p,pages:()=>c,routeModule:()=>g,tree:()=>l});var t=r(482),s=r(9108),i=r(2563),o=r.n(i),n=r(8300),d={};for(let e in n)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(d[e]=()=>n[e]);r.d(a,d);let l=["",{children:["migracao",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,9504)),"C:\\Users\\brandao\\Desktop\\development\\backend\\trello-asana-analysis\\src\\app\\migracao\\page.tsx"]}]},{}]},{layout:[()=>Promise.resolve().then(r.bind(r,4098)),"C:\\Users\\brandao\\Desktop\\development\\backend\\trello-asana-analysis\\src\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(r.t.bind(r,9361,23)),"next/dist/client/components/not-found-error"]}],c=["C:\\Users\\brandao\\Desktop\\development\\backend\\trello-asana-analysis\\src\\app\\migracao\\page.tsx"],p="/migracao/page",m={require:r,loadChunk:()=>Promise.resolve()},g=new t.AppPageRouteModule({definition:{kind:s.x.APP_PAGE,page:"/migracao/page",pathname:"/migracao",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:l}})},8977:(e,a,r)=>{Promise.resolve().then(r.bind(r,4949))},4949:(e,a,r)=>{"use strict";r.r(a),r.d(a,{default:()=>H});var t=r(5344),s=r(3729),i=r(9032),o=r(3139),n=r(2631),d=r(8243);async function l(){try{let e=(await d.Yo.get("/members/me/boards",{params:{fields:"id,name,desc,memberships",lists:"open",list_fields:"id,name,pos",cards:"visible",card_fields:"id,name,desc,due,labels,idMembers",members:"all",member_fields:"id,fullName,username"}})).data;return await Promise.all(e.map(async e=>{let a=(await d.Yo.get(`/boards/${e.id}/lists`,{params:{cards:"open",card_fields:"id,name,desc,due,labels,idMembers"}})).data.map(e=>({id:e.id,name:e.name,cards:e.cards.map(e=>({id:e.id,name:e.name,description:e.desc,due:e.due,labels:e.labels?.map(e=>e.name)||[],members:e.idMembers||[]}))}));return{id:e.id,title:e.name,description:e.desc,cards:a.reduce((e,a)=>e+a.cards.length,0),members:e.memberships?.length||0,status:"Ativo",lists:a}}))}catch(e){throw console.error("Erro ao buscar projetos do Trello:",e),e}}async function c(){try{let e=(await d.Ju.get("/users/me")).data.data.workspaces[0].gid,a=await d.Ju.get(`/workspaces/${e}/projects`,{params:{opt_fields:"gid,name,notes,members,status,num_tasks"}});return await Promise.all(a.data.data.map(async e=>{let a=await d.Ju.get(`/projects/${e.gid}/sections`,{params:{opt_fields:"gid,name"}}),r=await Promise.all(a.data.data.map(async e=>{let a=await d.Ju.get(`/sections/${e.gid}/tasks`,{params:{opt_fields:"gid,name,notes,due_on,tags,assignee"}});return{id:e.gid,name:e.name,cards:a.data.data.map(e=>({id:e.gid,name:e.name,description:e.notes||"",due:e.due_on,labels:e.tags?.map(e=>e.name)||[],members:e.assignee?[e.assignee.gid]:[]}))}}));return{id:e.gid,title:e.name,description:e.notes,cards:e.num_tasks||0,members:e.members?.length||0,status:e.status||"Em andamento",lists:r}}))}catch(e){throw console.error("Erro ao buscar projetos do Asana:",e),e}}async function p(e,a,r){try{if("trello"===e)for(let e of a){let a=await d.Yo.get(`/boards/${e}`,{params:{lists:"open",cards:"visible",card_fields:"id,name,desc,due,labels,idMembers,idList",members:"all"}}),t=(await d.Ju.get("/users/me")).data.data.workspaces[0].gid,s=(await d.Ju.post("/projects",{data:{name:a.data.name,notes:a.data.desc,workspace:t}})).data.data.gid;try{let e=(await d.Ju.get(`/projects/${s}/tasks`,{params:{opt_fields:"gid,name"}})).data.data.find(e=>"Untitled"===e.name||"Sem t\xedtulo"===e.name);e&&await d.Ju.delete(`/tasks/${e.gid}`)}catch(e){console.error("Erro ao tentar remover tarefa sem t\xedtulo:",e)}let i=new Map;for(let e of a.data.lists){let a=await d.Ju.post(`/projects/${s}/sections`,{data:{name:e.name}});i.set(e.id,a.data.data.gid)}let o=0,n=a.data.cards.length;for(let e of a.data.cards){let a=i.get(e.idList);try{await d.Ju.post("/tasks",{data:{name:e.name,notes:e.desc,due_on:e.due,projects:[s],memberships:[{project:s,section:a}]}}),await d.Yo.delete(`/cards/${e.id}`),o++,r?.({current:o,total:n})}catch(a){console.error(`Erro ao migrar card ${e.id}:`,a)}}try{for(let e of a.data.lists)try{await d.Yo.put(`/lists/${e.id}/closed`,{value:!0}),await d.Yo.delete(`/lists/${e.id}`)}catch(a){console.error(`Erro ao deletar lista ${e.id}:`,a)}await d.Yo.delete(`/boards/${e}`)}catch(a){console.error("Erro ao deletar board:",a),await d.Yo.put(`/boards/${e}/closed`,{value:!0})}}else if("asana"===e)for(let e of a){let a=await d.Ju.get(`/projects/${e}`,{params:{opt_fields:"name,notes"}}),t=await d.Yo.post("/boards",{name:a.data.data.name,desc:a.data.data.notes||"",defaultLists:!1}),s=await d.Ju.get(`/projects/${e}/sections`,{params:{opt_fields:"name"}}),i=new Map;for(let e of s.data.data){let a=await d.Yo.post("/lists",{name:e.name,idBoard:t.data.id});i.set(e.gid,a.data.id)}let o=await d.Ju.get(`/projects/${e}/tasks`,{params:{opt_fields:"name,notes,due_on,memberships.section"}}),n=0,l=o.data.data.length;for(let e of o.data.data)try{let a=(await d.Ju.get(`/tasks/${e.gid}`,{params:{opt_fields:"name,notes,due_on,memberships.section,tags,assignee"}})).data.data,s=a.memberships?.[0]?.section?.gid,o=i.get(s);await d.Yo.post("/cards",{name:a.name,desc:a.notes||"",due:a.due_on,idList:o,idBoard:t.data.id}),await d.Ju.delete(`/tasks/${e.gid}`),n++,r?.({current:n,total:l})}catch(a){console.error(`Erro ao migrar task ${e.gid}:`,a)}try{await d.Ju.delete(`/projects/${e}`)}catch(e){console.error("Erro ao deletar projeto do Asana:",e)}}return{success:!0,message:"Transfer\xeancia conclu\xedda com sucesso!"}}catch(e){throw console.error("Erro durante a migra\xe7\xe3o:",e),e}}async function m(e,a,r,t,s){try{let a=await d.Yo.get(`/cards/${e}`,{params:{fields:"id,name,desc,due,labels,idMembers,idList"}});return s?.({current:1,total:3}),await d.Ju.post("/tasks",{data:{name:a.data.name,notes:a.data.desc||"",due_on:a.data.due,projects:[r],memberships:[{project:r,section:t}]}}),s?.({current:2,total:3}),await d.Yo.delete(`/cards/${e}`),s?.({current:3,total:3}),{success:!0,message:"Card migrado com sucesso!"}}catch(e){throw console.error("Erro ao migrar card:",e),e}}var g=r(252),u=r(2434),f=(0,u.Z)("outline","chevron-down","IconChevronDown",[["path",{d:"M6 9l6 6l6 -6",key:"svg-0"}]]),h=(0,u.Z)("outline","layout-list","IconLayoutList",[["path",{d:"M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v2a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z",key:"svg-0"}],["path",{d:"M4 14m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v2a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z",key:"svg-1"}]]),x=r(4377),b=r(6168),v=(0,u.Z)("outline","calendar","IconCalendar",[["path",{d:"M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12z",key:"svg-0"}],["path",{d:"M16 3v4",key:"svg-1"}],["path",{d:"M8 3v4",key:"svg-2"}],["path",{d:"M4 11h16",key:"svg-3"}],["path",{d:"M11 15h1",key:"svg-4"}],["path",{d:"M12 15v3",key:"svg-5"}]]),w=(0,u.Z)("outline","tag","IconTag",[["path",{d:"M7.5 7.5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0",key:"svg-0"}],["path",{d:"M3 6v5.172a2 2 0 0 0 .586 1.414l7.71 7.71a2.41 2.41 0 0 0 3.408 0l5.592 -5.592a2.41 2.41 0 0 0 0 -3.408l-7.71 -7.71a2 2 0 0 0 -1.414 -.586h-5.172a3 3 0 0 0 -3 3z",key:"svg-1"}]]);let y=i.ZP.div`
  padding: 1.25rem;
  background: ${e=>e.selected?"rgba(255, 255, 255, 0.08)":"rgba(255, 255, 255, 0.02)"};
  border-radius: 8px;
  border: 1px solid ${e=>e.selected?"rgba(255, 255, 255, 0.2)":"rgba(255, 255, 255, 0.08)"};
  margin-bottom: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.15);
  }

  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.75rem;

    span {
      font-size: 0.95rem;
      font-weight: 500;
      color: #ffffff;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    svg {
      width: 16px;
      height: 16px;
      opacity: 0.7;
    }
  }

  .description {
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.6);
    margin-bottom: 1rem;
    line-height: 1.4;
  }

  .meta {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.75rem;
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.5);

    .meta-item {
      display: flex;
      align-items: center;
      gap: 0.375rem;

      svg {
        width: 14px;
        height: 14px;
        opacity: 0.5;
      }
    }
  }

  .lists {
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 0.75rem;
  }
`,j=({id:e,title:a,description:r,lists:s=[],members:i,selected:o,icon:n,onSelect:d,onListSelect:l,selectedListId:c,type:p})=>{let m=s.filter(e=>"Se\xe7\xe3o sem t\xedtulo"!==e.name&&"sem t\xedtulo"!==e.name.toLowerCase()&&"untitled"!==e.name.toLowerCase()),g=m.reduce((e,a)=>e+a.cards.length,0);return(0,t.jsxs)(y,{selected:o,onClick:()=>d(e),children:[(0,t.jsxs)("div",{className:"title",children:[(0,t.jsxs)("span",{children:[n,a]}),t.jsx(f,{})]}),r&&t.jsx("div",{className:"description",children:r}),(0,t.jsxs)("div",{className:"meta",children:[(0,t.jsxs)("div",{className:"meta-item",children:[t.jsx(h,{}),m.length," ","trello"===p?"Listas":"Se\xe7\xf5es"]}),(0,t.jsxs)("div",{className:"meta-item",children:[t.jsx(x.Z,{}),g," ","trello"===p?"Cards":"Tasks"]}),(0,t.jsxs)("div",{className:"meta-item",children:[t.jsx(b.Z,{}),i," ",1===i?"Membro":"Membros"]}),(0,t.jsxs)("div",{className:"meta-item",children:[t.jsx(v,{}),"Atualizado ",new Date().toLocaleDateString()]})]}),o&&m.length>0&&t.jsx("div",{className:"lists",children:m.map(e=>t.jsx($,{list:e,selected:c===e.id,onSelect:l,type:p},e.id))})]})},k=i.ZP.div`
  background: rgba(255, 255, 255, 0.03);
  border-radius: 6px;
  padding: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }

  .list-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    
    h4 {
      font-size: 0.85rem;
      font-weight: 500;
      color: #ffffff;
      margin: 0;
    }
    
    span {
      font-size: 0.75rem;
      color: rgba(255, 255, 255, 0.4);
    }
  }
  
  .cards-preview {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
`,P=i.ZP.div`
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 6px;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    transform: translateX(4px);
  }

  .card-description {
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.5);
    margin-top: 0.25rem;
  }

  .card-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 0.5rem;

    .meta-tag {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      font-size: 0.7rem;
      color: rgba(255, 255, 255, 0.6);
      background: rgba(255, 255, 255, 0.05);
      padding: 0.25rem 0.5rem;
      border-radius: 4px;

      svg {
        width: 12px;
        height: 12px;
        opacity: 0.7;
      }
    }
  }
`,$=({list:e,selected:a,onSelect:r,type:s})=>(0,t.jsxs)(k,{onClick:a=>{a.stopPropagation(),r?.(e.id)},children:[(0,t.jsxs)("div",{className:"list-header",children:[t.jsx("h4",{children:e.name}),(0,t.jsxs)("span",{children:[e.cards.length," ","trello"===s?"cards":"tasks"]})]}),(0,t.jsxs)("div",{className:"cards-preview",children:[e.cards.slice(0,3).map(e=>(0,t.jsxs)(P,{children:[e.name,e.description&&t.jsx("div",{className:"card-description",children:e.description.length>50?e.description.substring(0,50)+"...":e.description}),(e.due||e.labels&&e.labels.length>0||e.members&&e.members.length>0)&&(0,t.jsxs)("div",{className:"card-meta",children:[e.due&&(0,t.jsxs)("span",{className:"meta-tag",children:[t.jsx(v,{}),new Date(e.due).toLocaleDateString()]}),e.labels?.map((e,a)=>t.jsxs("span",{className:"meta-tag",children:[t.jsx(w,{}),e]},a)),e.members&&e.members.length>0&&(0,t.jsxs)("span",{className:"meta-tag",children:[t.jsx(b.Z,{}),e.members.length]})]})]},e.id)),e.cards.length>3&&(0,t.jsxs)("div",{className:"more-cards",children:["+",e.cards.length-3," ","trello"===s?"cards":"tasks"]})]})]});var T=r(2617),z=r(3060);let S=i.ZP.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 100;
  width: 120px;
  height: 120px;

  .progress-text {
    position: absolute;
    bottom: -30px;
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.7);
    white-space: nowrap;
    text-align: center;
  }

  .progress-ring {
    position: absolute;
    width: 100px;
    height: 100px;
    transform: rotate(-90deg);

    circle {
      fill: none;
      stroke-width: 3;
      stroke-linecap: round;
      transition: stroke-dashoffset 0.3s ease;
    }

    .progress-ring-bg {
      stroke: rgba(255, 255, 255, 0.1);
    }

    .progress-ring-fg {
      stroke: #ffffff;
      stroke-dasharray: 283;
      stroke-dashoffset: ${e=>283-283*e.$progress/100};
    }
  }
`,C=i.ZP.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  
  .progress-ring {
    position: absolute;
    width: 100px;
    height: 100px;
    transform: rotate(-90deg);
    pointer-events: none;
    z-index: 5;
  }
  
  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: rgba(30, 42, 59, 0.1);
    border: 1px solid rgba(30, 42, 59, ${e=>e.active?"0.3":"0.1"});
    animation: pulse 2s ease-in-out infinite;
    pointer-events: none;
    z-index: 1;
  }

  &::after {
    content: '';
    position: absolute;
    width: 120%;
    height: 120%;
    border-radius: 50%;
    border: 1px solid rgba(30, 42, 59, ${e=>e.active?"0.2":"0.05"});
    animation: pulse 2s ease-in-out infinite 0.3s;
    pointer-events: none;
    z-index: 1;
  }
`,_=i.ZP.button`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: none;
  background: ${e=>e.active?"#1e2a3b":"rgba(30, 42, 59, 0.5)"};
  color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  cursor: ${e=>e.active?"pointer":"not-allowed"};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 10;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }

  &:hover:not(:disabled) {
    transform: scale(1.05);
    background: ${e=>e.active?"#1e2a3b":"rgba(30, 42, 59, 0.6)"};
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  }

  svg {
    width: 24px;
    height: 24px;
    transition: transform 0.3s ease;
  }

  span {
    font-size: 0.75rem;
    font-weight: 500;
  }
`,Z=i.ZP.div`
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.5);
    opacity: ${e=>e.active?1:0};
    transition: opacity 0.3s ease;
  }

  &::before {
    top: 20%;
    left: 10%;
    animation: float 3s ease-in-out infinite;
  }

  &::after {
    bottom: 20%;
    right: 10%;
    animation: float 3s ease-in-out infinite 1.5s;
  }

  @keyframes float {
    0% { transform: translateY(0) scale(1); }
    50% { transform: translateY(-5px) scale(1.2); }
    100% { transform: translateY(0) scale(1); }
  }
`,M=({isActive:e,isMigrating:a,progress:r,currentTask:s,onTransfer:i})=>(0,t.jsxs)(S,{$progress:r,children:[(0,t.jsxs)(C,{active:e,children:[t.jsx(Z,{active:e}),a&&(0,t.jsxs)("svg",{className:"progress-ring",viewBox:"0 0 100 100",children:[t.jsx("circle",{className:"progress-ring-bg",cx:"50",cy:"50",r:"45"}),t.jsx("circle",{className:"progress-ring-fg",cx:"50",cy:"50",r:"45",strokeDasharray:"283",strokeDashoffset:283-283*r/100})]}),t.jsx(_,{active:e,disabled:!e||a,onClick:i,children:a?(0,t.jsxs)(t.Fragment,{children:[t.jsx(T.Z,{className:"spin"}),t.jsx("span",{children:"Transferindo"})]}):(0,t.jsxs)(t.Fragment,{children:[t.jsx(z.Z,{}),t.jsx("span",{children:"Transferir"})]})})]}),a&&(0,t.jsxs)("div",{className:"progress-text",children:[Math.round(r),"%",t.jsx("br",{}),s]})]}),N=i.ZP.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`,q=i.ZP.div`
  background: var(--bg-surface);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  width: 90%;
  max-width: 600px;
  position: relative;
  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.2);
  transform: scale(0.95);
  opacity: 0;
  animation: modalEnter 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;

  @keyframes modalEnter {
    to {
      transform: scale(1);
      opacity: 1;
    }
  }

  h3 {
    margin: 0 0 var(--space-4);
    font-size: 1.4rem;
    color: var(--text-primary);
    display: flex;
    align-items: center;
    gap: var(--space-2);

    &::before {
      content: '';
      width: 4px;
      height: 24px;
      background: var(--primary);
      border-radius: var(--radius-sm);
    }
  }

  .description {
    margin-bottom: var(--space-4);
    color: var(--text-secondary);
    font-size: 0.95rem;
    
    strong {
      color: var(--text-primary);
      font-size: 1.1rem;
      display: block;
      margin-bottom: var(--space-2);
    }
  }
`,E=i.ZP.div`
  padding: var(--space-3);
  margin: var(--space-2) 0;
  border-radius: var(--radius-lg);
  background: ${e=>e.selected?"var(--primary-soft)":"var(--bg-surface)"};
  border: 2px solid ${e=>e.selected?"var(--primary)":"transparent"};
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  box-shadow: ${e=>e.selected?"0 8px 16px rgba(var(--primary-rgb), 0.15)":"0 2px 4px rgba(0, 0, 0, 0.05)"};

  &:hover {
    border-color: var(--primary);
    transform: translateY(-2px) scale(1.01);
    box-shadow: 0 12px 24px rgba(var(--primary-rgb), 0.2);
  }

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background: ${e=>e.selected?"var(--primary)":"transparent"};
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  h5 {
    margin: 0;
    font-size: ${e=>e.selected?"1.1rem":"1rem"};
    color: ${e=>e.selected?"var(--primary)":"var(--text-primary)"};
    font-weight: ${e=>e.selected?"600":"400"};
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    padding-right: var(--space-8);
  }
`,A=i.ZP.div`
  padding: var(--space-2) var(--space-3);
  margin: var(--space-1) 0;
  margin-left: var(--space-4);
  border-radius: var(--radius-lg);
  background: ${e=>e.selected?"var(--primary-soft)":"var(--bg-surface)"};
  border: 2px solid ${e=>e.selected?"var(--primary)":"transparent"};
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  display: flex;
  align-items: center;
  gap: var(--space-2);
  box-shadow: ${e=>e.selected?"0 4px 12px rgba(var(--primary-rgb), 0.15)":"0 1px 3px rgba(0, 0, 0, 0.05)"};

  &:hover {
    border-color: var(--primary);
    transform: translateX(8px);
    box-shadow: 0 6px 16px rgba(var(--primary-rgb), 0.2);
  }

  &::before {
    content: '';
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: ${e=>e.selected?"var(--primary)":"var(--border-color)"};
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    transform: scale(${e=>e.selected?"1":"0.8"});
    box-shadow: ${e=>e.selected?"0 0 0 4px rgba(var(--primary-rgb), 0.2)":"none"};
  }

  &::after {
    content: '';
    position: absolute;
    left: -24px;
    top: 50%;
    width: 16px;
    height: 2px;
    background: ${e=>e.selected?"var(--primary)":"var(--border-color)"};
    transform: scaleX(${e=>e.selected?"1":"0"});
    transform-origin: left;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  color: ${e=>e.selected?"var(--primary)":"var(--text-primary)"};
  font-weight: ${e=>e.selected?"600":"400"};
  font-size: ${e=>e.selected?"0.95rem":"0.9rem"};
`,I=i.ZP.div`
  display: flex;
  gap: var(--space-2);
  justify-content: flex-end;
  margin-top: var(--space-6);

  button {
    padding: var(--space-2) var(--space-4);
    border-radius: var(--radius-lg);
    font-size: 0.95rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

    &.cancel {
      background: transparent;
      color: var(--text-secondary);
      border: 2px solid var(--border-color);

      &:hover {
        background: var(--bg-surface-hover);
        color: var(--text-primary);
        border-color: var(--text-primary);
      }
    }

    &.confirm {
      background: var(--primary);
      color: white;
      border: none;
      padding: var(--space-2) var(--space-6);
      position: relative;
      overflow: hidden;

      &::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.1);
        transform: translate(-50%, -50%) scale(0);
        border-radius: 50%;
        transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      }

      &:hover:not(:disabled) {
        background: var(--primary-dark);
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(var(--primary-rgb), 0.3);

        &::before {
          transform: translate(-50%, -50%) scale(2.5);
        }
      }

      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }
    }
  }
`,L=({card:e,asanaProjects:a,selectedProjectId:r,selectedSectionId:s,onProjectSelect:i,onSectionSelect:o,onClose:n,onConfirm:d})=>e?t.jsx(N,{onClick:n,children:(0,t.jsxs)(q,{onClick:e=>e.stopPropagation(),children:[t.jsx("h3",{children:"Transferir Card"}),(0,t.jsxs)("div",{className:"description",children:[t.jsx("strong",{children:e.name}),t.jsx("p",{children:e.description})]}),(0,t.jsxs)("div",{className:"select-project",children:[t.jsx("h4",{children:"Selecione o destino no Asana:"}),t.jsx("div",{className:"projects-list",children:a.map(e=>(0,t.jsxs)("div",{children:[t.jsx(E,{selected:r===e.id,onClick:()=>{i(e.id),o("")},children:t.jsx("h5",{children:e.title})}),r===e.id&&e.lists&&(0,t.jsxs)("div",{className:"sections-wrapper",children:[t.jsx("div",{className:"sections-header",children:"Selecione a se\xe7\xe3o:"}),e.lists.map(e=>t.jsx(A,{selected:s===e.id,onClick:a=>{a.stopPropagation(),o(e.id)},children:e.name},e.id))]})]},e.id))})]}),(0,t.jsxs)(I,{children:[t.jsx("button",{className:"cancel",onClick:n,children:"Cancelar"}),t.jsx("button",{className:"confirm",onClick:d,disabled:!r||!s,children:r?s?"Transferir":"Selecione uma se\xe7\xe3o":"Selecione um projeto"})]})]})}):null,Y=i.ZP.div`
  flex: 1;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  overflow: hidden;
`,J=i.ZP.div`
  padding: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  gap: 1rem;

  h2 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #ffffff;
    margin: 0;
    display: flex;
    align-items: center;
    gap: 0.75rem;

    svg {
      width: 24px;
      height: 24px;
      opacity: 0.9;
    }
  }
`,D=i.ZP.div`
  padding: 1rem 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  input {
    width: 100%;
    padding: 0.75rem 1rem;
    border-radius: 8px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(255, 255, 255, 0.05);
    color: #ffffff;
    font-size: 0.875rem;

    &::placeholder {
      color: rgba(255, 255, 255, 0.5);
    }

    &:focus {
      outline: none;
      border-color: rgba(255, 255, 255, 0.2);
      background: rgba(255, 255, 255, 0.08);
    }
  }
`,F=i.ZP.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem 1.25rem;
`,V=i.ZP.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  color: rgba(255, 255, 255, 0.7);
  gap: 1rem;
  height: 100%;

  svg {
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`,U=i.ZP.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  color: rgba(255, 255, 255, 0.7);
  height: 100%;
  text-align: center;
`,B=i.ZP.div`
  padding: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`,G=i.ZP.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.875rem;
`,X=({type:e,title:a,projects:r,loading:s,searchValue:i,selectedProjectId:o,selectedListId:n,onSearchChange:d,onProjectSelect:l,onListSelect:c,icon:p})=>{let m=r.filter(e=>e.title.toLowerCase().includes(i.toLowerCase())||e.description?.toLowerCase().includes(i.toLowerCase())),g=r.find(e=>e.id===o);return(0,t.jsxs)(Y,{children:[t.jsx(J,{children:(0,t.jsxs)("h2",{children:[p,a]})}),t.jsx(D,{children:t.jsx("input",{type:"text",placeholder:`Buscar ${"trello"===e?"quadros":"projetos"}...`,value:i,onChange:e=>d(e.target.value)})}),t.jsx(F,{children:s?(0,t.jsxs)(V,{children:[t.jsx(T.Z,{size:24}),(0,t.jsxs)("span",{children:["Carregando ","trello"===e?"quadros":"projetos","..."]})]}):m.length>0?m.map(a=>t.jsx(j,{id:a.id,title:a.title,description:a.description,lists:a.lists,members:a.members,selected:o===a.id,icon:p,onSelect:l,onListSelect:c,selectedListId:n,type:e},a.id)):t.jsx(U,{children:i?`Nenhum ${"trello"===e?"quadro":"projeto"} encontrado`:`Nenhum ${"trello"===e?"quadro":"projeto"} dispon\xedvel`})}),t.jsx(B,{children:t.jsx(G,{children:g&&(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("span",{children:["1 ","trello"===e?"quadro":"projeto"," selecionado"]}),"trello"===e&&(0,t.jsxs)(t.Fragment,{children:[t.jsx("span",{className:"separator",children:"•"}),(0,t.jsxs)("span",{children:[g.cards," cards para transferir"]})]})]})})})]})},O=i.ZP.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: var(--sidebar-width);
  background: #1e2a3b;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`,R=i.ZP.div`
  display: flex;
  flex: 1;
  padding: 2rem;
  gap: 2rem;
  overflow: hidden;
`;function H(){let[e,a]=(0,s.useState)([]),[r,i]=(0,s.useState)([]),[d,u]=(0,s.useState)(),[f,h]=(0,s.useState)(),[x,b]=(0,s.useState)(),[v,w]=(0,s.useState)(!1),[y,j]=(0,s.useState)(!1),[k,P]=(0,s.useState)(!1),[$,T]=(0,s.useState)(""),[z,S]=(0,s.useState)(0),[C,_]=(0,s.useState)("processing"),[Z,N]=(0,s.useState)(""),[q,E]=(0,s.useState)(""),[A,I]=(0,s.useState)(new Set),[Y,J]=(0,s.useState)(null),D=async()=>{w(!0);try{let e=await l();a(e)}catch(e){console.error("Erro ao carregar projetos do Trello:",e)}finally{w(!1)}},F=async()=>{j(!0);try{let e=await c();i(e)}catch(e){console.error("Erro ao carregar projetos do Asana:",e)}finally{j(!1)}};(0,s.useEffect)(()=>{D(),F()},[]);let V=async()=>{if(d||f){P(!0),S(0),_("processing");try{if(d){let a=e.find(e=>e.id===d);a&&(T("Iniciando processo de transfer\xeancia do Trello para o Asana..."),await new Promise(e=>setTimeout(e,800)),S(5),T("Verificando conex\xe3o com as APIs..."),await new Promise(e=>setTimeout(e,600)),S(10),T("Analisando estrutura do board..."),await new Promise(e=>setTimeout(e,700)),S(15),T(`Preparando transfer\xeancia de ${a.lists?.length||0} listas e ${a.cards} cards...`),await new Promise(e=>setTimeout(e,800)),S(20),T("Criando estrutura no Asana..."),await new Promise(e=>setTimeout(e,600)),S(25),T("Configurando se\xe7\xf5es e propriedades..."),await new Promise(e=>setTimeout(e,700)),S(30),T("Iniciando transfer\xeancia de conte\xfado..."),await new Promise(e=>setTimeout(e,500)),S(35),await p("trello",[d],e=>{let r=Math.round(e.current/e.total*40);S(35+r),e.current===e.total?T("Todos os cards foram transferidos com sucesso!"):T(`Transferindo card ${e.current} de ${e.total}...
${a?.lists?.find(a=>a.cards.find(a=>a.id===String(e.current)))?.name||""}`)}))}else if(f){let e=r.find(e=>e.id===f);e&&(T("Iniciando processo de transfer\xeancia do Asana para o Trello..."),await new Promise(e=>setTimeout(e,800)),S(5),T("Verificando conex\xe3o com as APIs..."),await new Promise(e=>setTimeout(e,600)),S(10),T("Analisando estrutura do projeto..."),await new Promise(e=>setTimeout(e,700)),S(15),T(`Preparando transfer\xeancia de ${e.lists?.length||0} se\xe7\xf5es e ${e.cards} tasks...`),await new Promise(e=>setTimeout(e,800)),S(20),T("Criando estrutura no Trello..."),await new Promise(e=>setTimeout(e,600)),S(25),T("Configurando listas e propriedades..."),await new Promise(e=>setTimeout(e,700)),S(30),T("Iniciando transfer\xeancia de conte\xfado..."),await new Promise(e=>setTimeout(e,500)),S(35),await p("asana",[f],a=>{let r=Math.round(a.current/a.total*40);S(35+r),a.current===a.total?T("Todas as tasks foram transferidas com sucesso!"):T(`Transferindo task ${a.current} de ${a.total}...
${e?.lists?.find(e=>e.cards.find(e=>e.id===String(a.current)))?.name||""}`)}))}T("Verificando integridade dos dados..."),await new Promise(e=>setTimeout(e,800)),S(80),T("Removendo dados originais..."),await new Promise(e=>setTimeout(e,1e3)),S(85),T("Atualizando refer\xeancias..."),await new Promise(e=>setTimeout(e,700)),S(90),T("Sincronizando altera\xe7\xf5es..."),await Promise.all([D(),F()]),S(95),T("Finalizando processo..."),await new Promise(e=>setTimeout(e,600)),S(100),T("Transfer\xeancia conclu\xedda com sucesso! \uD83C\uDF89\nTodos os dados foram migrados e verificados."),_("success"),await new Promise(e=>setTimeout(e,2e3)),u(void 0),h(void 0),await Promise.all([D(),F()])}catch(e){console.error("Erro durante a migra\xe7\xe3o:",e),T("❌ Erro durante a transfer\xeancia.\nVerifique as conex\xf5es e tente novamente."),_("error"),await new Promise(e=>setTimeout(e,2e3))}finally{P(!1),S(0),T(""),_("processing")}}},U=async(e,a)=>{if(!f){T("Erro: Selecione um projeto do Asana para migrar o card."),_("error"),await new Promise(e=>setTimeout(e,2e3)),T(""),_("processing");return}if(!x){T("Erro: Selecione uma se\xe7\xe3o do Asana para migrar o card."),_("error"),await new Promise(e=>setTimeout(e,2e3)),T(""),_("processing");return}if(!A.has(e)){I(a=>new Set(a).add(e)),P(!0),S(0),_("processing");try{T("Iniciando migra\xe7\xe3o do card..."),await m(e,a,f,x,e=>{S(e.current/e.total*100),T("Migrando card para o Asana...")}),S(100),T("Card migrado com sucesso!"),_("success"),await Promise.all([D(),F()]),await new Promise(e=>setTimeout(e,2e3))}catch(r){console.error("Erro detalhado ao migrar card:",{cardId:e,boardId:a,projectId:f,sectionId:x,error:r.message,stack:r.stack}),T("Erro: "+(r.message||"Falha ao migrar o card")+". Verifique o console para mais detalhes."),_("error"),await new Promise(e=>setTimeout(e,3e3))}finally{I(a=>{let r=new Set(a);return r.delete(e),r}),P(!1),S(0),T(""),_("processing")}}},B=async()=>{Y&&f&&x&&(await U(Y.id,Y.boardId),J(null))};return(0,t.jsxs)(O,{children:[(0,t.jsxs)(R,{children:[t.jsx(X,{type:"trello",title:"Trello",projects:e,loading:v,searchValue:Z,selectedProjectId:d,onSearchChange:N,onProjectSelect:u,icon:t.jsx(o.Z,{})}),t.jsx(M,{isActive:!!d||!!f,isMigrating:k,progress:z,currentTask:$,onTransfer:V}),t.jsx(X,{type:"asana",title:"Asana",projects:r,loading:y,searchValue:q,selectedProjectId:f,selectedListId:x,onSearchChange:E,onProjectSelect:h,onListSelect:b,icon:t.jsx(n.Z,{})})]}),t.jsx(g.C,{isOpen:k,currentTask:$,progress:z,status:C}),t.jsx(L,{card:Y,asanaProjects:r,selectedProjectId:f,selectedSectionId:x,onProjectSelect:h,onSectionSelect:b,onClose:()=>J(null),onConfirm:B})]})}},9504:(e,a,r)=>{"use strict";r.r(a),r.d(a,{$$typeof:()=>i,__esModule:()=>s,default:()=>o});let t=(0,r(6843).createProxy)(String.raw`C:\Users\brandao\Desktop\development\backend\trello-asana-analysis\src\app\migracao\page.tsx`),{__esModule:s,$$typeof:i}=t,o=t.default},4377:(e,a,r)=>{"use strict";r.d(a,{Z:()=>t});/**
 * @license @tabler/icons-react v3.29.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */var t=(0,r(2434).Z)("outline","cards","IconCards",[["path",{d:"M3.604 7.197l7.138 -3.109a.96 .96 0 0 1 1.27 .527l4.924 11.902a1 1 0 0 1 -.514 1.304l-7.137 3.109a.96 .96 0 0 1 -1.271 -.527l-4.924 -11.903a1 1 0 0 1 .514 -1.304z",key:"svg-0"}],["path",{d:"M15 4h1a1 1 0 0 1 1 1v3.5",key:"svg-1"}],["path",{d:"M20 6c.264 .112 .52 .217 .768 .315a1 1 0 0 1 .53 1.311l-2.298 5.374",key:"svg-2"}]])},6168:(e,a,r)=>{"use strict";r.d(a,{Z:()=>t});/**
 * @license @tabler/icons-react v3.29.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */var t=(0,r(2434).Z)("outline","users","IconUsers",[["path",{d:"M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0",key:"svg-0"}],["path",{d:"M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2",key:"svg-1"}],["path",{d:"M16 3.13a4 4 0 0 1 0 7.75",key:"svg-2"}],["path",{d:"M21 21v-2a4 4 0 0 0 -3 -3.85",key:"svg-3"}]])}};var a=require("../../webpack-runtime.js");a.C(e);var r=e=>a(a.s=e),t=a.X(0,[249,498],()=>r(4226));module.exports=t})();