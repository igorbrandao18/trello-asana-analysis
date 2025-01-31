exports.id=498,exports.ids=[498],exports.modules={6256:(e,a,r)=>{Promise.resolve().then(r.t.bind(r,2583,23)),Promise.resolve().then(r.t.bind(r,6840,23)),Promise.resolve().then(r.t.bind(r,8771,23)),Promise.resolve().then(r.t.bind(r,3225,23)),Promise.resolve().then(r.t.bind(r,9295,23)),Promise.resolve().then(r.t.bind(r,3982,23))},2491:(e,a,r)=>{Promise.resolve().then(r.bind(r,1257)),Promise.resolve().then(r.bind(r,7216))},1257:(e,a,r)=>{"use strict";r.r(a),r.d(a,{ClientLayout:()=>H});var t=r(5344),s=r(3729),o=r(9032);let i={colors:{brand:{primary:"#070f46",secondary:"#0c1b8c",tertiary:"#1224b9",light:"#2b3a80",lighter:"#4a5699",gradient:"linear-gradient(135deg, #070f46 0%, #0c1b8c 100%)"},status:{error:"#dc2626",warning:"#d97706",success:"#059669"},background:{primary:"#070f46",secondary:"#0c1b8c",default:"#ffffff",alt:"#f9fafb",hover:"#f3f4f6",disabled:"#f3f4f6",dark:"#111827",error:"#fef2f2",warning:"#fffbeb",success:"#f0fdf4",card:"rgba(255, 255, 255, 0.05)",glass:"rgba(255, 255, 255, 0.1)"},text:{primary:"#ffffff",secondary:"#94a3b8",disabled:"#64748b",inverse:"#070f46"},border:{default:"rgba(255, 255, 255, 0.1)",hover:"rgba(255, 255, 255, 0.2)",focus:"#2563eb",primary:"rgba(255, 255, 255, 0.1)",error:"#fecaca",warning:"#fde68a",success:"#86efac"}},typography:{fontSizes:{xs:"0.75rem",sm:"0.875rem",base:"1rem",lg:"1.125rem",xl:"1.25rem","2xl":"1.5rem","3xl":"1.875rem","4xl":"2.25rem","5xl":"3rem"},fontWeights:{normal:400,medium:500,semibold:600,bold:700,extrabold:800},lineHeights:{none:1,tight:1.25,snug:1.375,normal:1.5,relaxed:1.625,loose:2}},spacing:{px:"1px",0:"0",.5:"2px",1:"4px",1.5:"6px",2:"8px",2.5:"10px",3:"12px",3.5:"14px",4:"16px",5:"20px",6:"24px",7:"28px",8:"32px",9:"36px",10:"40px",11:"44px",12:"48px",14:"56px",16:"64px",20:"80px",24:"96px",28:"112px",32:"128px",36:"144px",40:"160px",44:"176px",48:"192px",52:"208px",56:"224px",60:"240px",64:"256px",72:"288px",80:"320px",96:"384px",xs:"4px",sm:"8px",md:"16px",lg:"24px",xl:"32px","2xl":"40px","3xl":"48px"},breakpoints:{xs:"320px",sm:"640px",md:"768px",lg:"1024px",xl:"1280px","2xl":"1536px"},shadows:{xs:"0 1px 2px 0 rgb(0 0 0 / 0.05)",sm:"0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",md:"0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",lg:"0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",xl:"0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)"},transitions:{none:"none",normal:"150ms cubic-bezier(0.4, 0, 0.2, 1)",slow:"300ms cubic-bezier(0.4, 0, 0.2, 1)",all:"all 150ms cubic-bezier(0.4, 0, 0.2, 1)",colors:"background-color 150ms cubic-bezier(0.4, 0, 0.2, 1), border-color 150ms cubic-bezier(0.4, 0, 0.2, 1), color 150ms cubic-bezier(0.4, 0, 0.2, 1)",transform:"transform 150ms cubic-bezier(0.4, 0, 0.2, 1)"},zIndices:{hide:-1,auto:"auto",base:0,docked:10,dropdown:1e3,sticky:1100,banner:1200,overlay:1300,modal:1400,popover:1500,toast:1600,tooltip:1700},borderRadius:{none:"0",sm:"0.125rem",base:"0.25rem",md:"0.375rem",lg:"0.5rem",xl:"0.75rem","2xl":"1rem","3xl":"1.5rem",full:"9999px"}};var n=r(8428);function d({children:e}){let[a]=(0,s.useState)(()=>new o.qH);return(0,n.useServerInsertedHTML)(()=>{let e=a.getStyleElement();return a.instance.clearTag(),t.jsx(t.Fragment,{children:e})}),t.jsx(o.LC,{sheet:a.instance,children:e})}let c=o.vJ`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root {
    /* Brand Colors */
    --brand-primary: #6366F1;
    --brand-secondary: #EC4899;
    
    /* Background Colors */
    --bg-base: #0F172A;
    --bg-surface: #1E293B;
    --bg-surface-hover: #334155;
    --bg-accent: rgba(99, 102, 241, 0.1);
    
    /* Text Colors */
    --text-primary: #F8FAFC;
    --text-secondary: #94A3B8;
    --text-accent: #6366F1;
    
    /* Status Colors */
    --status-success: #10B981;
    --status-warning: #F59E0B;
    --status-error: #EF4444;
    
    /* Border Colors */
    --border-subtle: rgba(148, 163, 184, 0.1);
    --border-accent: rgba(99, 102, 241, 0.5);
    
    /* Shadows */
    --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
    --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    
    /* Animation */
    --transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
    --transition-normal: 250ms cubic-bezier(0.4, 0, 0.2, 1);
    
    /* Layout */
    --header-height: 64px;
    --sidebar-width: 280px;
    --content-max-width: 1200px;
    
    /* Spacing */
    --space-1: 0.25rem;
    --space-2: 0.5rem;
    --space-3: 0.75rem;
    --space-4: 1rem;
    --space-5: 1.25rem;
    --space-6: 1.5rem;
    --space-8: 2rem;
    --space-10: 2.5rem;
    --space-12: 3rem;
    
    /* Border Radius */
    --radius-sm: 0.375rem;
    --radius-md: 0.5rem;
    --radius-lg: 0.75rem;
    --radius-full: 9999px;
  }

  html {
    font-size: 16px;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background-color: var(--bg-base);
    color: var(--text-primary);
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  #__next {
    min-height: 100vh;
    display: flex;
  }

  button, input, select, textarea {
    font: inherit;
    color: inherit;
  }

  button {
    cursor: pointer;
    border: none;
    background: none;
    padding: 0;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  img, svg {
    display: block;
    max-width: 100%;
  }

  /* Custom Scrollbar */
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  ::-webkit-scrollbar-track {
    background: var(--bg-surface);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--bg-surface-hover);
    border-radius: var(--radius-full);
  }

  ::-webkit-scrollbar-thumb:hover {
    background: var(--text-secondary);
  }

  /* Utilities */
  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  .gradient-text {
    background: linear-gradient(135deg, var(--brand-primary), var(--brand-secondary));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;var l=r(3060),p=r(3770),m=r(3139),u=r(2631),g=r(7526),x=r(894),b=r(6679),f=r(411),h=r(8243);let v=[{name:"Sabor Oriental Sushi",category:"Japon\xeas",rating:4.8,menu:[{name:"Combo 30 Pe\xe7as",price:89.9,description:"10 hossomakis, 10 uramakis e 10 niguiris variados"},{name:"Hot Roll Especial",price:32.9,description:"8 pe\xe7as de hot roll com salm\xe3o grelhado e cream cheese"},{name:"Temaki Salm\xe3o",price:28.9,description:"Temaki de salm\xe3o fresco com cream cheese e cebolinha"}]},{name:"La Pasta Aut\xeantica",category:"Italiano",rating:4.7,menu:[{name:"Fettuccine ao Funghi",price:58.9,description:"Massa fresca com mix de cogumelos e creme de leite fresco"},{name:"Lasanha Bolonhesa",price:49.9,description:"Lasanha artesanal com molho bolonhesa e bechamel"},{name:"Ravioli de Mozzarella",price:54.9,description:"Massa recheada com mozzarella ao sugo"}]},{name:"Burger House Premium",category:"Hamb\xfarguer",rating:4.6,menu:[{name:"Classic Cheese",price:32.9,description:"Blend 180g, cheddar, alface, tomate e molho especial"},{name:"BBQ Bacon",price:38.9,description:"Blend 180g, bacon crocante, cebola caramelizada e molho BBQ"},{name:"Veggie Supreme",price:34.9,description:"Hamb\xfarguer de gr\xe3o de bico, abacate e maionese vegana"}]}],y=["Comida excelente! Entrega r\xe1pida e embalagem muito bem feita.","Pedido chegou no tempo previsto e a temperatura estava perfeita.","\xd3timo custo-benef\xedcio. Com certeza pedirei novamente!","A apresenta\xe7\xe3o do prato superou minhas expectativas.","Por\xe7\xf5es generosas e sabor incr\xedvel."],w={cleanup:async function(){try{for(let e of(await h.Yo.get("/members/me/boards")).data)await h.Yo.delete(`/boards/${e.id}`);let e=(await h.Ju.get("/users/me")).data.data.workspaces[0].gid;for(let a of(await h.Ju.get(`/workspaces/${e}/projects`)).data.data)await h.Ju.delete(`/projects/${a.gid}`);console.log("✅ Todos os dados foram limpos com sucesso!")}catch(e){console.error("Erro ao limpar dados:",e)}},async populate(){try{let e=await h.Yo.post("/boards",{name:"Sistema de Delivery",desc:"Gest\xe3o completa do sistema de delivery com pedidos, restaurantes e avalia\xe7\xf5es",defaultLists:!1}),a=await Promise.all([h.Yo.post(`/boards/${e.data.id}/lists`,{name:"\uD83D\uDCCB Novos Pedidos"}),h.Yo.post(`/boards/${e.data.id}/lists`,{name:"\uD83D\uDC68‍\uD83C\uDF73 Em Prepara\xe7\xe3o"}),h.Yo.post(`/boards/${e.data.id}/lists`,{name:"\uD83D\uDEF5 Em Entrega"}),h.Yo.post(`/boards/${e.data.id}/lists`,{name:"✅ Entregues"}),h.Yo.post(`/boards/${e.data.id}/lists`,{name:"⭐ Avalia\xe7\xf5es"})]),r=await Promise.all([h.Yo.post(`/boards/${e.data.id}/labels`,{name:"Urgente",color:"red"}),h.Yo.post(`/boards/${e.data.id}/labels`,{name:"VIP",color:"purple"}),h.Yo.post(`/boards/${e.data.id}/labels`,{name:"Novo Cliente",color:"green"}),h.Yo.post(`/boards/${e.data.id}/labels`,{name:"Pedido Grande",color:"yellow"})]);for(let e of v){for(let t=0;t<3;t++){let t=e.menu[Math.floor(Math.random()*e.menu.length)],s=Math.floor(3*Math.random()),o=Math.random()>.7,i=Math.random()>.8;await h.Yo.post("/cards",{idList:a[s].data.id,name:`Pedido #${Math.floor(9e3*Math.random())+1e3} - ${e.name}`,desc:`🍽️ Item: ${t.name}
💰 Valor: R$ ${t.price.toFixed(2)}
📝 Observa\xe7\xf5es: ${t.description}
⭐ Avalia\xe7\xe3o do Restaurante: ${e.rating}
🏷️ Categoria: ${e.category}`,idLabels:[...o?[r[1].data.id]:[],...i?[r[0].data.id]:[]]})}let t=y[Math.floor(Math.random()*y.length)];await h.Yo.post("/cards",{idList:a[4].data.id,name:`Avalia\xe7\xe3o - ${e.name}`,desc:`⭐ ${e.rating}/5.0

"${t}"

📅 ${new Date().toLocaleDateString()}`,idLabels:e.rating>=4.7?[r[1].data.id]:[]})}let t=(await h.Ju.get("/users/me")).data.data.workspaces[0].gid,s=await h.Ju.post("/projects",{data:{name:"Gest\xe3o de Delivery",workspace:t,notes:"Sistema completo de gest\xe3o de delivery com pedidos, restaurantes e avalia\xe7\xf5es"}}),o=await Promise.all([h.Ju.post("/sections",{data:{project:s.data.data.gid,name:"\uD83C\uDFEA Restaurantes Parceiros"}}),h.Ju.post("/sections",{data:{project:s.data.data.gid,name:"\uD83D\uDCCA M\xe9tricas e Desempenho"}}),h.Ju.post("/sections",{data:{project:s.data.data.gid,name:"\uD83D\uDCC8 Metas Mensais"}})]);for(let e of v)await h.Ju.post("/tasks",{data:{workspace:t,projects:[s.data.data.gid],name:e.name,notes:`🏷️ Categoria: ${e.category}
⭐ Avalia\xe7\xe3o: ${e.rating}/5.0

📋 Card\xe1pio:
`+e.menu.map(e=>`• ${e.name} - R$ ${e.price.toFixed(2)}
  ${e.description}`).join("\n\n"),memberships:[{project:s.data.data.gid,section:o[0].data.data.gid}]}});for(let e of[{name:"Taxa de Entrega no Prazo",target:"95%",current:"93.5%"},{name:"Satisfa\xe7\xe3o do Cliente",target:"4.8/5.0",current:"4.6/5.0"},{name:"Tempo M\xe9dio de Entrega",target:"35 min",current:"38 min"}])await h.Ju.post("/tasks",{data:{workspace:t,projects:[s.data.data.gid],name:e.name,notes:`🎯 Meta: ${e.target}
📊 Atual: ${e.current}

Atualizado em: ${new Date().toLocaleDateString()}`,memberships:[{project:s.data.data.gid,section:o[1].data.data.gid}]}});for(let e of[{name:"Aumentar Base de Restaurantes",target:"+15 novos parceiros"},{name:"Reduzir Tempo de Entrega",target:"-5 minutos em m\xe9dia"},{name:"Melhorar Rating M\xe9dio",target:"Atingir 4.8/5.0"}])await h.Ju.post("/tasks",{data:{workspace:t,projects:[s.data.data.gid],name:e.name,notes:`🎯 Meta: ${e.target}
📅 Prazo: ${new Date(Date.now()+2592e6).toLocaleDateString()}`,memberships:[{project:s.data.data.gid,section:o[2].data.data.gid}]}});return!0}catch(e){throw console.error("Erro ao popular dados:",e),e}}};var k=r(252),j=r(1970);let P=o.ZP.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.2s ease;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`,C=o.ZP.div`
  background: var(--bg-surface);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  width: 400px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  animation: slideIn 0.3s ease;

  @keyframes slideIn {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`,Z=o.ZP.div`
  display: flex;
  align-items: center;
  gap: var(--space-4);
  margin-bottom: var(--space-4);

  .icon {
    color: var(--status-warning);
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }

  h3 {
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--text-primary);
  }
`,$=o.ZP.p`
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin-bottom: var(--space-6);
  line-height: 1.5;
`,D=o.ZP.div`
  display: flex;
  justify-content: flex-end;
  gap: var(--space-3);
`,S=o.ZP.button`
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-md);
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease;

  ${e=>"danger"===e.variant?`
    background: var(--status-error);
    color: white;
    &:hover {
      background: var(--status-error-dark);
    }
  `:`
    background: var(--bg-surface-hover);
    color: var(--text-secondary);
    &:hover {
      background: var(--bg-surface-hover);
      color: var(--text-primary);
    }
  `}
`;function z({isOpen:e,title:a,message:r,onConfirm:s,onCancel:o}){return e?t.jsx(P,{onClick:o,children:(0,t.jsxs)(C,{onClick:e=>e.stopPropagation(),children:[(0,t.jsxs)(Z,{children:[t.jsx(j.Z,{size:24,className:"icon"}),t.jsx("h3",{children:a})]}),t.jsx($,{children:r}),(0,t.jsxs)(D,{children:[t.jsx(S,{onClick:o,children:"Cancelar"}),t.jsx(S,{variant:"danger",onClick:s,children:"Confirmar"})]})]})}):null}let T=o.ZP.div`
  display: flex;
  min-height: 100vh;
  background: var(--bg-base);
`,E=o.ZP.aside`
  width: var(--sidebar-width);
  background: var(--bg-surface);
  border-right: 1px solid var(--border-subtle);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
`,M=o.ZP.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: var(--space-4) 0;
`,A=o.ZP.div`
  flex-shrink: 0;
`,L=o.ZP.div`
  flex: 1;
  overflow-y: auto;
  margin: var(--space-2) 0;

  /* Esconde a scrollbar mas mantém a funcionalidade */
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`,Y=o.ZP.div`
  padding: 0 var(--space-4) var(--space-2);
`,B=o.ZP.div`
  padding: 0 var(--space-4);
  margin-bottom: var(--space-4);
  font-size: 1.25rem;
  font-weight: 700;
  
  span {
    background: linear-gradient(135deg, var(--brand-primary), var(--brand-secondary));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`,I=o.ZP.div`
  margin: 0 var(--space-4) var(--space-4);
  padding: var(--space-4);
  background: var(--bg-surface-hover);
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  gap: var(--space-4);
  justify-content: center;
`,F=o.ZP.div`
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-3);
  background: var(--bg-surface);
  border-radius: var(--radius-md);
  position: relative;

  svg {
    width: 24px;
    height: 24px;
    color: ${e=>e.isConnected?"var(--text-accent)":"var(--text-secondary)"};
    opacity: ${e=>e.isConnected?1:.5};
    transition: all 0.3s ease;
  }

  .status {
    width: 8px;
    height: 8px;
    border-radius: var(--radius-full);
    background: ${e=>e.isConnected?"var(--status-success)":"var(--status-error)"};
    transition: all 0.3s ease;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      top: -3px;
      left: -3px;
      right: -3px;
      bottom: -3px;
      border-radius: var(--radius-full);
      background: ${e=>e.isConnected?"var(--status-success)":"var(--status-error)"};
      opacity: 0.2;
      animation: ${e=>e.isConnected?"pulse 2s infinite":"none"};
    }
  }

  @keyframes pulse {
    0% { transform: scale(1); opacity: 0.2; }
    50% { transform: scale(2.5); opacity: 0; }
    100% { transform: scale(1); opacity: 0.2; }
  }
`,R=o.ZP.a`
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-2) var(--space-4);
  color: var(--text-subtle);
  text-decoration: none;
  transition: all 0.2s;

  svg {
    width: 20px;
    height: 20px;
  }

  &:hover {
    background: var(--bg-surface-hover);
    color: var(--text-default);
  }

  &.active {
    color: var(--text-default);
    background: var(--bg-surface-hover);
  }
`,J=(0,o.ZP)(R)`
  svg {
    opacity: 0.8;
  }
`,O=o.ZP.nav`
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
`;o.ZP.div`
  display: flex;
  align-items: center;
  gap: var(--space-4);
`,o.ZP.button`
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
`,o.ZP.div`
  width: 40px;
  height: 40px;
  border-radius: var(--radius-full);
  background: var(--brand-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-primary);
`;let U=o.ZP.div`
  height: 1px;
  background: var(--border-subtle);
  margin: var(--space-2) var(--space-4);
  opacity: 0.5;
`,N=o.ZP.button`
  display: flex;
  align-items: center;
  gap: var(--space-2);
  width: 100%;
  padding: var(--space-2) var(--space-3);
  color: var(--text-secondary);
  transition: all var(--transition-fast);
  font-size: 0.75rem;
  border-radius: var(--radius-md);
  margin-bottom: var(--space-1);

  &:last-child {
    margin-bottom: 0;
  }

  &:hover:not(:disabled) {
    background: var(--bg-surface-hover);
    color: var(--text-primary);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  svg {
    width: 14px;
    height: 14px;
  }

  &.danger {
    color: var(--status-error);
    
    &:hover:not(:disabled) {
      background: var(--status-error-hover);
    }
  }
`;function H({children:e}){(0,n.useRouter)();let[a,r]=(0,s.useState)(!1),[p,v]=(0,s.useState)(0),[y,j]=(0,s.useState)(""),[P,C]=(0,s.useState)("processing"),[Z,$]=(0,s.useState)(!1),[D,S]=(0,s.useState)(!1),[R,H]=(0,s.useState)(!1),q=async()=>{try{await h.Yo.get("/members/me",{timeout:5e3}),S(!0)}catch(e){S(!1)}try{await h.Ju.get("/users/me",{timeout:5e3}),H(!0)}catch(e){H(!1)}};(0,s.useEffect)(()=>{q();let e=setInterval(q,3e4);return()=>clearInterval(e)},[]);let G=async()=>{$(!0)},_=async()=>{$(!1),r(!0),v(0),C("processing");try{j("Removendo boards do Trello...");let e=await h.Yo.get("/members/me/boards"),a=e.data.length;for(let r=0;r<a;r++)await h.Yo.delete(`/boards/${e.data[r].id}`),v(Math.round((r+1)/(a+5)*50)),await new Promise(e=>setTimeout(e,300));j("Removendo projetos do Asana...");let r=(await h.Ju.get("/users/me")).data.data.workspaces[0].gid,t=await h.Ju.get(`/workspaces/${r}/projects`),s=t.data.data.length;for(let e=0;e<s;e++)await h.Ju.delete(`/projects/${t.data.data[e].gid}`),v(50+Math.round((e+1)/(s+5)*50)),await new Promise(e=>setTimeout(e,300));j("Limpando sess\xe3o de migra\xe7\xe3o..."),localStorage.removeItem("migrationSession"),localStorage.removeItem("selectedBoards"),localStorage.removeItem("selectedProjects"),sessionStorage.clear(),v(100),j("Todos os dados foram removidos com sucesso!"),C("success"),await new Promise(e=>setTimeout(e,1500)),window.location.href="/migracao"}catch(e){console.error("Erro ao limpar dados:",e),j("Erro ao limpar dados. Tente novamente."),C("error"),await new Promise(e=>setTimeout(e,2e3))}finally{r(!1),v(0),j(""),C("processing")}},V=async()=>{r(!0),v(0),C("processing");try{j("Configurando board do Sistema de Delivery..."),v(5),await new Promise(e=>setTimeout(e,800)),j("Criando listas de acompanhamento de pedidos..."),v(15),await new Promise(e=>setTimeout(e,800)),j("Configurando etiquetas e categorias..."),v(25),await new Promise(e=>setTimeout(e,800)),j("Cadastrando restaurante Sabor Oriental Sushi..."),v(35),await new Promise(e=>setTimeout(e,800)),j("Cadastrando restaurante La Pasta Aut\xeantica..."),v(45),await new Promise(e=>setTimeout(e,800)),j("Cadastrando restaurante Burger House Premium..."),v(55),await new Promise(e=>setTimeout(e,800)),j("Configurando projeto de Gest\xe3o de Delivery..."),v(65),await new Promise(e=>setTimeout(e,800)),j("Criando se\xe7\xf5es de acompanhamento..."),v(75),await new Promise(e=>setTimeout(e,800)),j("Registrando m\xe9tricas e metas..."),v(85),await new Promise(e=>setTimeout(e,800)),await w.populate(),j("Finalizando configura\xe7\xf5es e validando dados..."),v(95),await new Promise(e=>setTimeout(e,800)),v(100),j("Sistema de Delivery configurado com sucesso! \uD83C\uDF89"),C("success"),await new Promise(e=>setTimeout(e,2e3)),window.location.href="/migracao"}catch(e){console.error("Erro ao criar dados:",e),j("Erro ao configurar o sistema. Por favor, tente novamente."),C("error"),await new Promise(e=>setTimeout(e,2e3))}finally{r(!1),v(0),j(""),C("processing")}};return t.jsx(d,{children:(0,t.jsxs)(o.f6,{theme:i,children:[t.jsx(c,{}),(0,t.jsxs)(T,{children:[t.jsx(E,{children:(0,t.jsxs)(M,{children:[(0,t.jsxs)(A,{children:[t.jsx(B,{children:t.jsx("span",{children:"SysMiddle"})}),(0,t.jsxs)(I,{children:[(0,t.jsxs)(F,{isConnected:D,children:[t.jsx(m.Z,{}),t.jsx("div",{className:"status"})]}),(0,t.jsxs)(F,{isConnected:R,children:[t.jsx(u.Z,{}),t.jsx("div",{className:"status"})]})]})]}),t.jsx(L,{children:(0,t.jsxs)(O,{children:[(0,t.jsxs)(J,{href:"/endpoints/trello",icon:m.Z,children:[t.jsx(m.Z,{}),"Endpoints Trello"]}),(0,t.jsxs)(J,{href:"/endpoints/asana",icon:u.Z,children:[t.jsx(u.Z,{}),"Endpoints Asana"]}),(0,t.jsxs)(J,{href:"/mapeamento",icon:g.Z,children:[t.jsx(g.Z,{}),"De-Para"]}),(0,t.jsxs)(J,{href:"/fluxo",icon:x.Z,children:[t.jsx(x.Z,{}),"Fluxo de Integra\xe7\xe3o"]}),(0,t.jsxs)(J,{href:"/migracao",icon:l.Z,children:[t.jsx(l.Z,{}),"Migra\xe7\xe3o"]})]})}),(0,t.jsxs)(Y,{children:[t.jsx(U,{}),(0,t.jsxs)("div",{style:{padding:"0 var(--space-4)"},children:[(0,t.jsxs)(N,{onClick:V,disabled:a,children:[t.jsx(b.Z,{}),"Criar Dados de Exemplo"]}),(0,t.jsxs)(N,{onClick:G,disabled:a,className:"danger",children:[t.jsx(f.Z,{}),"Limpar Todos os Dados"]})]})]})]})}),e,t.jsx(k.C,{isOpen:a,currentTask:y,progress:p,status:P}),t.jsx(z,{isOpen:Z,title:"Limpar Todos os Dados",message:"Tem certeza que deseja limpar todos os dados? Esta a\xe7\xe3o n\xe3o pode ser desfeita.",onConfirm:_,onCancel:()=>$(!1)})]})]})})}l.Z,p.Z},252:(e,a,r)=>{"use strict";r.d(a,{C:()=>x});var t=r(5344),s=r(9032),o=r(2617),i=r(4424),n=r(5919);let d=s.ZP.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.2s ease;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`,c=s.ZP.div`
  background: var(--bg-surface);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
  width: 400px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  animation: slideIn 0.3s ease;

  @keyframes slideIn {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`,l=s.ZP.div`
  display: flex;
  align-items: center;
  gap: var(--space-4);
  margin-bottom: var(--space-6);

  .icon {
    animation: ${e=>"processing"===e.status?"spin 1s linear infinite":"bounce 0.5s ease"};
    color: ${e=>{switch(e.status){case"success":return"var(--status-success)";case"error":return"var(--status-error)";default:return"var(--brand-primary)"}}};
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  @keyframes bounce {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.2); }
  }

  h3 {
    font-size: 1.125rem;
    font-weight: 600;
    color: var(--text-primary);
  }
`,p=s.ZP.div`
  font-size: 0.875rem;
  color: var(--text-secondary);
  margin-bottom: var(--space-4);
  min-height: 1.5em;
  opacity: 1;
  transform: translateY(0);
  transition: all 0.3s ease;

  &.fade-enter {
    opacity: 0;
    transform: translateY(10px);
  }

  &.fade-exit {
    opacity: 0;
    transform: translateY(-10px);
  }
`,m=s.ZP.div`
  height: 4px;
  background: var(--bg-surface-hover);
  border-radius: var(--radius-full);
  overflow: hidden;
  margin-bottom: var(--space-2);
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.2),
      transparent
    );
    animation: shimmer 1.5s infinite;
  }

  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
`,u=s.ZP.div`
  height: 100%;
  width: ${e=>e.value}%;
  background: var(--brand-primary);
  transition: width 0.3s ease;
`,g=s.ZP.div`
  font-size: 0.875rem;
  color: var(--text-secondary);
  text-align: right;
  font-variant-numeric: tabular-nums;
  transition: all 0.3s ease;
`;function x({isOpen:e,currentTask:a,progress:r,status:s="processing"}){return e?t.jsx(d,{children:(0,t.jsxs)(c,{children:[(0,t.jsxs)(l,{status:s,children:["processing"===s&&t.jsx(o.Z,{size:24,className:"icon"}),"success"===s&&t.jsx(i.Z,{size:24,className:"icon"}),"error"===s&&t.jsx(n.Z,{size:24,className:"icon"}),(0,t.jsxs)("h3",{children:["processing"===s&&"Processando","success"===s&&"Conclu\xeddo","error"===s&&"Erro"]})]}),t.jsx(p,{children:a}),t.jsx(m,{children:t.jsx(u,{value:r})}),(0,t.jsxs)(g,{children:[r,"%"]})]})}):null}},7216:(e,a,r)=>{"use strict";r.r(a),r.d(a,{Providers:()=>d});var t=r(5344),s=r(8503),o=r(6274),i=r(1257);let n=new s.S({defaultOptions:{queries:{refetchOnWindowFocus:!1,retry:1,staleTime:3e5}}});function d({children:e}){return t.jsx(o.aH,{client:n,children:t.jsx(i.ClientLayout,{children:e})})}},977:(e,a,r)=>{"use strict";r.d(a,{O:()=>t});let t={trello:{key:"4267f89076c3cb6a0f2fcff634da78db",token:"ATTAff9c5af13e210fe3c8c2094b9e92849e64a793589c128a272f80c6ad27f74e71053A7D1F",apiUrl:"https://api.trello.com/1"},asana:{token:"2/1209276646303170/1209276648243936:2bcc06e3e5027219f44c97801f598312",apiUrl:"https://app.asana.com/api/1.0"}}},8243:(e,a,r)=>{"use strict";r.d(a,{Ju:()=>i,Yo:()=>o});var t=r(7665),s=r(977);let o=t.Z.create({baseURL:s.O.trello.apiUrl,params:{key:s.O.trello.key,token:s.O.trello.token}}),i=t.Z.create({baseURL:s.O.asana.apiUrl,headers:{Authorization:`Bearer ${s.O.asana.token}`}})},4098:(e,a,r)=>{"use strict";r.r(a),r.d(a,{default:()=>b,metadata:()=>x});var t=r(5036),s=r(839),o=r.n(s),i=r(6843);let n=(0,i.createProxy)(String.raw`C:\Users\brandao\Desktop\development\backend\trello-asana-analysis\src\components\Providers.tsx`),{__esModule:d,$$typeof:c}=n;n.default;let l=(0,i.createProxy)(String.raw`C:\Users\brandao\Desktop\development\backend\trello-asana-analysis\src\components\Providers.tsx#Providers`),p=(0,i.createProxy)(String.raw`C:\Users\brandao\Desktop\development\backend\trello-asana-analysis\src\components\ClientLayout.tsx`),{__esModule:m,$$typeof:u}=p;p.default;let g=(0,i.createProxy)(String.raw`C:\Users\brandao\Desktop\development\backend\trello-asana-analysis\src\components\ClientLayout.tsx#ClientLayout`),x={title:"Trello & Asana Integration",description:"Integra\xe7\xe3o entre Trello e Asana para migra\xe7\xe3o de dados"};function b({children:e}){return t.jsx("html",{lang:"pt-BR",className:o().className,children:t.jsx("body",{children:t.jsx(l,{children:t.jsx(g,{children:e})})})})}}};