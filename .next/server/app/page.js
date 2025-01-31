(()=>{var e={};e.id=931,e.ids=[931],e.modules={7849:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external")},2934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},5403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},4580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},4749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},5869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},9491:e=>{"use strict";e.exports=require("assert")},2361:e=>{"use strict";e.exports=require("events")},7147:e=>{"use strict";e.exports=require("fs")},3685:e=>{"use strict";e.exports=require("http")},5687:e=>{"use strict";e.exports=require("https")},2037:e=>{"use strict";e.exports=require("os")},1017:e=>{"use strict";e.exports=require("path")},2781:e=>{"use strict";e.exports=require("stream")},6224:e=>{"use strict";e.exports=require("tty")},7310:e=>{"use strict";e.exports=require("url")},3837:e=>{"use strict";e.exports=require("util")},9796:e=>{"use strict";e.exports=require("zlib")},6983:(e,t,r)=>{"use strict";r.r(t),r.d(t,{GlobalError:()=>i.a,__next_app__:()=>h,originalPathname:()=>d,pages:()=>u,routeModule:()=>p,tree:()=>l});var s=r(482),o=r(9108),n=r(2563),i=r.n(n),a=r(8300),c={};for(let e in a)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(c[e]=()=>a[e]);r.d(t,c);let l=["",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,1136)),"C:\\Users\\brandao\\Desktop\\development\\backend\\trello-asana-analysis\\src\\app\\page.tsx"]}]},{layout:[()=>Promise.resolve().then(r.bind(r,4098)),"C:\\Users\\brandao\\Desktop\\development\\backend\\trello-asana-analysis\\src\\app\\layout.tsx"],"not-found":[()=>Promise.resolve().then(r.t.bind(r,9361,23)),"next/dist/client/components/not-found-error"]}],u=["C:\\Users\\brandao\\Desktop\\development\\backend\\trello-asana-analysis\\src\\app\\page.tsx"],d="/page",h={require:r,loadChunk:()=>Promise.resolve()},p=new s.AppPageRouteModule({definition:{kind:o.x.APP_PAGE,page:"/page",pathname:"/",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:l}})},2819:(e,t,r)=>{Promise.resolve().then(r.bind(r,3668))},3668:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>eT});var s=r(5344),o=r(3729),n=r(8441),i=r(1466),a=r(4902),c=r(57),l=r(7361),u=r(8651),d=class extends c.l{constructor(e,t){super(),this.#e=void 0,this.#t=void 0,this.#r=void 0,this.#s=new Set,this.options=t,this.#o=e,this.#n=null,this.#i=(0,l.O)(),this.options.experimental_prefetchInRender||this.#i.reject(Error("experimental_prefetchInRender feature flag is not enabled")),this.bindMethods(),this.setOptions(t)}#o;#e;#t;#r;#a;#c;#i;#n;#l;#u;#d;#h;#p;#g;#s;bindMethods(){this.refetch=this.refetch.bind(this)}onSubscribe(){1===this.listeners.size&&(this.#e.addObserver(this),h(this.#e,this.options)?this.#f():this.updateResult(),this.#y())}onUnsubscribe(){this.hasListeners()||this.destroy()}shouldFetchOnReconnect(){return p(this.#e,this.options,this.options.refetchOnReconnect)}shouldFetchOnWindowFocus(){return p(this.#e,this.options,this.options.refetchOnWindowFocus)}destroy(){this.listeners=new Set,this.#m(),this.#x(),this.#e.removeObserver(this)}setOptions(e,t){let r=this.options,s=this.#e;if(this.options=this.#o.defaultQueryOptions(e),void 0!==this.options.enabled&&"boolean"!=typeof this.options.enabled&&"function"!=typeof this.options.enabled&&"boolean"!=typeof(0,u.Nc)(this.options.enabled,this.#e))throw Error("Expected enabled to be a boolean or a callback that returns a boolean");this.#b(),this.#e.setOptions(this.options),r._defaulted&&!(0,u.VS)(this.options,r)&&this.#o.getQueryCache().notify({type:"observerOptionsUpdated",query:this.#e,observer:this});let o=this.hasListeners();o&&g(this.#e,s,this.options,r)&&this.#f(),this.updateResult(t),o&&(this.#e!==s||(0,u.Nc)(this.options.enabled,this.#e)!==(0,u.Nc)(r.enabled,this.#e)||(0,u.KC)(this.options.staleTime,this.#e)!==(0,u.KC)(r.staleTime,this.#e))&&this.#$();let n=this.#k();o&&(this.#e!==s||(0,u.Nc)(this.options.enabled,this.#e)!==(0,u.Nc)(r.enabled,this.#e)||n!==this.#g)&&this.#v(n)}getOptimisticResult(e){let t=this.#o.getQueryCache().build(this.#o,e),r=this.createResult(t,e);return(0,u.VS)(this.getCurrentResult(),r)||(this.#r=r,this.#c=this.options,this.#a=this.#e.state),r}getCurrentResult(){return this.#r}trackResult(e,t){let r={};return Object.keys(e).forEach(s=>{Object.defineProperty(r,s,{configurable:!1,enumerable:!0,get:()=>(this.trackProp(s),t?.(s),e[s])})}),r}trackProp(e){this.#s.add(e)}getCurrentQuery(){return this.#e}refetch({...e}={}){return this.fetch({...e})}fetchOptimistic(e){let t=this.#o.defaultQueryOptions(e),r=this.#o.getQueryCache().build(this.#o,t);return r.fetch().then(()=>this.createResult(r,t))}fetch(e){return this.#f({...e,cancelRefetch:e.cancelRefetch??!0}).then(()=>(this.updateResult(),this.#r))}#f(e){this.#b();let t=this.#e.fetch(this.options,e);return e?.throwOnError||(t=t.catch(u.ZT)),t}#$(){this.#m();let e=(0,u.KC)(this.options.staleTime,this.#e);if(u.sk||this.#r.isStale||!(0,u.PN)(e))return;let t=(0,u.Kp)(this.#r.dataUpdatedAt,e);this.#h=setTimeout(()=>{this.#r.isStale||this.updateResult()},t+1)}#k(){return("function"==typeof this.options.refetchInterval?this.options.refetchInterval(this.#e):this.options.refetchInterval)??!1}#v(e){this.#x(),this.#g=e,!u.sk&&!1!==(0,u.Nc)(this.options.enabled,this.#e)&&(0,u.PN)(this.#g)&&0!==this.#g&&(this.#p=setInterval(()=>{(this.options.refetchIntervalInBackground||n.j.isFocused())&&this.#f()},this.#g))}#y(){this.#$(),this.#v(this.#k())}#m(){this.#h&&(clearTimeout(this.#h),this.#h=void 0)}#x(){this.#p&&(clearInterval(this.#p),this.#p=void 0)}createResult(e,t){let r;let s=this.#e,o=this.options,n=this.#r,i=this.#a,c=this.#c,d=e!==s?e.state:this.#t,{state:p}=e,y={...p},m=!1;if(t._optimisticResults){let r=this.hasListeners(),n=!r&&h(e,t),i=r&&g(e,s,t,o);(n||i)&&(y={...y,...(0,a.z)(p.data,e.options)}),"isRestoring"===t._optimisticResults&&(y.fetchStatus="idle")}let{error:x,errorUpdatedAt:b,status:$}=y;if(t.select&&void 0!==y.data){if(n&&y.data===i?.data&&t.select===this.#l)r=this.#u;else try{this.#l=t.select,r=t.select(y.data),r=(0,u.oE)(n?.data,r,t),this.#u=r,this.#n=null}catch(e){this.#n=e}}else r=y.data;if(void 0!==t.placeholderData&&void 0===r&&"pending"===$){let e;if(n?.isPlaceholderData&&t.placeholderData===c?.placeholderData)e=n.data;else if(e="function"==typeof t.placeholderData?t.placeholderData(this.#d?.state.data,this.#d):t.placeholderData,t.select&&void 0!==e)try{e=t.select(e),this.#n=null}catch(e){this.#n=e}void 0!==e&&($="success",r=(0,u.oE)(n?.data,e,t),m=!0)}this.#n&&(x=this.#n,r=this.#u,b=Date.now(),$="error");let k="fetching"===y.fetchStatus,v="pending"===$,w="error"===$,R=v&&k,j=void 0!==r,C={status:$,fetchStatus:y.fetchStatus,isPending:v,isSuccess:"success"===$,isError:w,isInitialLoading:R,isLoading:R,data:r,dataUpdatedAt:y.dataUpdatedAt,error:x,errorUpdatedAt:b,failureCount:y.fetchFailureCount,failureReason:y.fetchFailureReason,errorUpdateCount:y.errorUpdateCount,isFetched:y.dataUpdateCount>0||y.errorUpdateCount>0,isFetchedAfterMount:y.dataUpdateCount>d.dataUpdateCount||y.errorUpdateCount>d.errorUpdateCount,isFetching:k,isRefetching:k&&!v,isLoadingError:w&&!j,isPaused:"paused"===y.fetchStatus,isPlaceholderData:m,isRefetchError:w&&j,isStale:f(e,t),refetch:this.refetch,promise:this.#i};if(this.options.experimental_prefetchInRender){let t=e=>{"error"===C.status?e.reject(C.error):void 0!==C.data&&e.resolve(C.data)},r=()=>{t(this.#i=C.promise=(0,l.O)())},o=this.#i;switch(o.status){case"pending":e.queryHash===s.queryHash&&t(o);break;case"fulfilled":("error"===C.status||C.data!==o.value)&&r();break;case"rejected":("error"!==C.status||C.error!==o.reason)&&r()}}return C}updateResult(e){let t=this.#r,r=this.createResult(this.#e,this.options);if(this.#a=this.#e.state,this.#c=this.options,void 0!==this.#a.data&&(this.#d=this.#e),(0,u.VS)(r,t))return;this.#r=r;let s={};e?.listeners!==!1&&(()=>{if(!t)return!0;let{notifyOnChangeProps:e}=this.options,r="function"==typeof e?e():e;if("all"===r||!r&&!this.#s.size)return!0;let s=new Set(r??this.#s);return this.options.throwOnError&&s.add("error"),Object.keys(this.#r).some(e=>this.#r[e]!==t[e]&&s.has(e))})()&&(s.listeners=!0),this.#w({...s,...e})}#b(){let e=this.#o.getQueryCache().build(this.#o,this.options);if(e===this.#e)return;let t=this.#e;this.#e=e,this.#t=e.state,this.hasListeners()&&(t?.removeObserver(this),e.addObserver(this))}onQueryUpdate(){this.updateResult(),this.hasListeners()&&this.#y()}#w(e){i.V.batch(()=>{e.listeners&&this.listeners.forEach(e=>{e(this.#r)}),this.#o.getQueryCache().notify({query:this.#e,type:"observerResultsUpdated"})})}};function h(e,t){return!1!==(0,u.Nc)(t.enabled,e)&&void 0===e.state.data&&!("error"===e.state.status&&!1===t.retryOnMount)||void 0!==e.state.data&&p(e,t,t.refetchOnMount)}function p(e,t,r){if(!1!==(0,u.Nc)(t.enabled,e)){let s="function"==typeof r?r(e):r;return"always"===s||!1!==s&&f(e,t)}return!1}function g(e,t,r,s){return(e!==t||!1===(0,u.Nc)(s.enabled,e))&&(!r.suspense||"error"!==e.state.status)&&f(e,r)}function f(e,t){return!1!==(0,u.Nc)(t.enabled,e)&&e.isStaleByTime((0,u.KC)(t.staleTime,e))}var y=r(6274),m=o.createContext(function(){let e=!1;return{clearReset:()=>{e=!1},reset:()=>{e=!0},isReset:()=>e}}()),x=()=>o.useContext(m);function b(e,t){return"function"==typeof e?e(...t):!!e}function $(){}var k=(e,t)=>{(e.suspense||e.throwOnError||e.experimental_prefetchInRender)&&!t.isReset()&&(e.retryOnMount=!1)},v=e=>{o.useEffect(()=>{e.clearReset()},[e])},w=({result:e,errorResetBoundary:t,throwOnError:r,query:s,suspense:o})=>e.isError&&!t.isReset()&&!e.isFetching&&s&&(o&&void 0===e.data||b(r,[e.error,s])),R=o.createContext(!1),j=()=>o.useContext(R);R.Provider;var C=e=>{let t=e.staleTime;e.suspense&&(e.staleTime="function"==typeof t?(...e)=>Math.max(t(...e),1e3):Math.max(t??1e3,1e3),"number"==typeof e.gcTime&&(e.gcTime=Math.max(e.gcTime,1e3)))},S=(e,t)=>e.isLoading&&e.isFetching&&!t,O=(e,t)=>e?.suspense&&t.isPending,P=(e,t,r)=>t.fetchOptimistic(e).catch(()=>{r.clearReset()});function T(e,t){return function(e,t,r){let s=(0,y.NL)(r),n=j(),a=x(),c=s.defaultQueryOptions(e);s.getDefaultOptions().queries?._experimental_beforeQuery?.(c),c._optimisticResults=n?"isRestoring":"optimistic",C(c),k(c,a),v(a);let l=!s.getQueryCache().get(c.queryHash),[d]=o.useState(()=>new t(s,c)),h=d.getOptimisticResult(c),p=!n&&!1!==e.subscribed;if(o.useSyncExternalStore(o.useCallback(e=>{let t=p?d.subscribe(i.V.batchCalls(e)):$;return d.updateResult(),t},[d,p]),()=>d.getCurrentResult(),()=>d.getCurrentResult()),o.useEffect(()=>{d.setOptions(c,{listeners:!1})},[c,d]),O(c,h))throw P(c,d,a);if(w({result:h,errorResetBoundary:a,throwOnError:c.throwOnError,query:s.getQueryCache().get(c.queryHash),suspense:c.suspense}))throw h.error;if(s.getDefaultOptions().queries?._experimental_afterQuery?.(c,h),c.experimental_prefetchInRender&&!u.sk&&S(h,n)){let e=l?P(c,d,a):s.getQueryCache().get(c.queryHash)?.promise;e?.catch($).finally(()=>{d.updateResult()})}return c.notifyOnChangeProps?h:d.trackResult(h)}(e,d,t)}var E=r(9896),q=class extends c.l{#o;#r;#R;#j;constructor(e,t){super(),this.#r=void 0,this.#o=e,this.setOptions(t),this.bindMethods(),this.#C()}bindMethods(){this.mutate=this.mutate.bind(this),this.reset=this.reset.bind(this)}setOptions(e){let t=this.options;this.options=this.#o.defaultMutationOptions(e),(0,u.VS)(this.options,t)||this.#o.getMutationCache().notify({type:"observerOptionsUpdated",mutation:this.#R,observer:this}),t?.mutationKey&&this.options.mutationKey&&(0,u.Ym)(t.mutationKey)!==(0,u.Ym)(this.options.mutationKey)?this.reset():this.#R?.state.status==="pending"&&this.#R.setOptions(this.options)}onUnsubscribe(){this.hasListeners()||this.#R?.removeObserver(this)}onMutationUpdate(e){this.#C(),this.#w(e)}getCurrentResult(){return this.#r}reset(){this.#R?.removeObserver(this),this.#R=void 0,this.#C(),this.#w()}mutate(e,t){return this.#j=t,this.#R?.removeObserver(this),this.#R=this.#o.getMutationCache().build(this.#o,this.options),this.#R.addObserver(this),this.#R.execute(e)}#C(){let e=this.#R?.state??(0,E.R)();this.#r={...e,isPending:"pending"===e.status,isSuccess:"success"===e.status,isError:"error"===e.status,isIdle:"idle"===e.status,mutate:this.mutate,reset:this.reset}}#w(e){i.V.batch(()=>{if(this.#j&&this.hasListeners()){let t=this.#r.variables,r=this.#r.context;e?.type==="success"?(this.#j.onSuccess?.(e.data,t,r),this.#j.onSettled?.(e.data,null,t,r)):e?.type==="error"&&(this.#j.onError?.(e.error,t,r),this.#j.onSettled?.(void 0,e.error,t,r))}this.listeners.forEach(e=>{e(this.#r)})})}},Q=r(977);class I{constructor(){this.baseUrl="https://api.trello.com/1",this.key=Q.O.trello.key,this.token=Q.O.trello.token}async request(e,t={}){let r=new URL(`${this.baseUrl}${e}`);r.searchParams.append("key",this.key),r.searchParams.append("token",this.token),console.log("Trello request URL:",r.toString());let s=await fetch(r.toString(),{...t,headers:{Accept:"application/json","Content-Type":"application/json",...t.headers}});if(!s.ok)throw Error((await s.json().catch(()=>({message:s.statusText}))).message||"Trello API error");return s.json()}async testConnection(){try{console.log("Testing Trello connection...");let e=await this.request("/members/me");return console.log("Trello user data:",e),{id:e.id,name:e.fullName,email:e.email}}catch(e){throw console.error("Failed to test Trello connection:",e),e}}async getBoards(){return this.request("/members/me/boards")}async syncToAsana(e){throw Error("Not implemented")}}let z=new I;class A{constructor(){this.baseUrl="https://app.asana.com/api/1.0",this.token=Q.O.asana.token}async request(e,t={}){let r=`${this.baseUrl}${e}`;console.log("Asana request URL:",r);let s=await fetch(r,{...t,headers:{Authorization:`Bearer ${this.token}`,"Content-Type":"application/json",Accept:"application/json",...t.headers}});if(!s.ok){let e=await s.json().catch(()=>({message:s.statusText}));throw Error(e?.errors?.[0]?.message||e.message||"Asana API error")}return(await s.json()).data}async testConnection(){try{console.log("Testing Asana connection...");let e=await this.request("/users/me");return console.log("Asana user data:",e),{id:e.gid,name:e.name,email:e.email}}catch(e){throw console.error("Failed to test Asana connection:",e),e}}async getWorkspaces(){return this.request("/workspaces")}async createProject(e,t,r){return this.request("/projects",{method:"POST",body:JSON.stringify({data:{workspace:e,name:t,notes:r}})})}async createSection(e,t){return this.request("/sections",{method:"POST",body:JSON.stringify({data:{project:e,name:t}})})}async createTask(e,t,r,s){return this.request("/tasks",{method:"POST",body:JSON.stringify({data:{memberships:[{section:e}],name:t,notes:r,due_on:s}})})}}let M=new A;function F(e,t,r,s){let o;return console.group("Connection Status Check"),console.log("Loading:",e),console.log("Error:",t),console.log("Data:",r),console.log("Error object:",s),e?o="checking":t?(console.error("Connection test error:",s),o="error"):r?r.success?o="connected":(console.error("Connection test failed:",r.error),o="error"):o="disconnected",console.log("Final status:",o),console.groupEnd(),o}/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let L=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),Z=(...e)=>e.filter((e,t,r)=>!!e&&""!==e.trim()&&r.indexOf(e)===t).join(" ").trim();/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var _={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.474.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let U=(0,o.forwardRef)(({color:e="currentColor",size:t=24,strokeWidth:r=2,absoluteStrokeWidth:s,className:n="",children:i,iconNode:a,...c},l)=>(0,o.createElement)("svg",{ref:l,..._,width:t,height:t,stroke:e,strokeWidth:s?24*Number(r)/Number(t):r,className:Z("lucide",n),...c},[...a.map(([e,t])=>(0,o.createElement)(e,t)),...Array.isArray(i)?i:[i]])),N=(e,t)=>{let r=(0,o.forwardRef)(({className:r,...s},n)=>(0,o.createElement)(U,{ref:n,iconNode:t,className:Z(`lucide-${L(e)}`,r),...s}));return r.displayName=`${e}`,r},D=N("LoaderCircle",[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]]),W=N("CircleCheckBig",[["path",{d:"M21.801 10A10 10 0 1 1 17 3.335",key:"yps3ct"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]]),K=N("CircleX",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m15 9-6 6",key:"1uzhvr"}],["path",{d:"m9 9 6 6",key:"z0biqf"}]]),H=N("CircleAlert",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]]),Y=N("Trello",[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2",key:"1m3agn"}],["rect",{width:"3",height:"9",x:"7",y:"7",key:"14n3xi"}],["rect",{width:"3",height:"5",x:"14",y:"7",key:"s4azjd"}]]),V=N("LayoutGrid",[["rect",{width:"7",height:"7",x:"3",y:"3",rx:"1",key:"1g98yp"}],["rect",{width:"7",height:"7",x:"14",y:"3",rx:"1",key:"6d4xhi"}],["rect",{width:"7",height:"7",x:"14",y:"14",rx:"1",key:"nxv5o0"}],["rect",{width:"7",height:"7",x:"3",y:"14",rx:"1",key:"1bb6yr"}]]),B=N("RefreshCw",[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]]);var G=r(9032);let J=G.ZP.header`
  background: ${({theme:e})=>e.colors.brand.gradient};
  border-bottom: 1px solid ${({theme:e})=>e.colors.border.default};
  backdrop-filter: blur(12px);
  position: sticky;
  top: 0;
  z-index: ${({theme:e})=>e.zIndices.sticky};
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
`,X=G.ZP.div`
  max-width: ${({theme:e})=>e.breakpoints.xl};
  margin: 0 auto;
  padding: ${({theme:e})=>e.spacing[4]} ${({theme:e})=>e.spacing[6]};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({theme:e})=>e.spacing[4]};

  @media (max-width: ${({theme:e})=>e.breakpoints.md}) {
    flex-direction: column;
    align-items: stretch;
  }
`,ee=G.ZP.h1`
  font-size: ${({theme:e})=>e.typography.fontSizes.xl};
  font-weight: ${({theme:e})=>e.typography.fontWeights.bold};
  color: ${({theme:e})=>e.colors.text.primary};
  margin: 0;
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing[2]};
  white-space: nowrap;

  svg {
    width: 24px;
    height: 24px;
  }

  span {
    display: inline-flex;
    align-items: center;
    gap: ${({theme:e})=>e.spacing[2]};
  }
`,et=G.ZP.div`
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing[4]};
  flex-wrap: wrap;

  @media (max-width: ${({theme:e})=>e.breakpoints.sm}) {
    gap: ${({theme:e})=>e.spacing[2]};
  }
`,er=G.ZP.div`
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing[3]};
  padding: ${({theme:e})=>`${e.spacing[2]} ${e.spacing[3]}`};
  border-radius: ${({theme:e})=>e.borderRadius.full};
  font-size: ${({theme:e})=>e.typography.fontSizes.sm};
  background: ${({theme:e})=>e.colors.background.glass};
  border: 1px solid ${({theme:e})=>e.colors.border.default};
  color: ${({theme:e})=>e.colors.text.primary};
  min-width: 240px;
  transition: all ${({theme:e})=>e.transitions.normal};

  &:hover {
    background: ${({theme:e})=>e.colors.background.hover};
    transform: translateY(-1px);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }

  svg {
    width: 18px;
    height: 18px;
    flex-shrink: 0;
    ${({status:e,theme:t})=>{switch(e){case"checking":return`
            animation: spin 1s linear infinite;
            color: ${t.colors.status.warning};
          `;case"connected":return`color: ${t.colors.status.success};`;case"error":return`color: ${t.colors.status.error};`;default:return`color: ${t.colors.text.secondary};`}}}
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`,es=G.ZP.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing[1]};
  min-width: 0;
  flex: 1;
`,eo=G.ZP.span`
  font-weight: ${({theme:e})=>e.typography.fontWeights.medium};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing[1]};
`,en=G.ZP.span`
  font-size: ${({theme:e})=>e.typography.fontSizes.xs};
  color: ${({theme:e})=>e.colors.text.secondary};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`,ei=G.ZP.button`
  background: none;
  border: none;
  padding: ${({theme:e})=>e.spacing[1]};
  color: ${({theme:e})=>e.colors.text.secondary};
  cursor: pointer;
  border-radius: ${({theme:e})=>e.borderRadius.full};
  transition: all ${({theme:e})=>e.transitions.normal};
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: ${({theme:e})=>e.colors.text.primary};
    background: ${({theme:e})=>e.colors.background.hover};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${({theme:e})=>e.colors.border.focus};
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;function ea({trelloStatus:e,asanaStatus:t,trelloUser:r,asanaUser:o,onRetryTrello:n,onRetryAsana:i}){let a=e=>{switch(e){case"checking":return s.jsx(D,{});case"connected":return s.jsx(W,{});case"error":return s.jsx(K,{});default:return s.jsx(H,{})}},c=(e,t)=>{switch(t){case"checking":return`${e} Conectando...`;case"connected":return`${e} Conectado`;case"error":return`${e} Erro`;default:return`${e} Desconectado`}};return s.jsx(J,{children:(0,s.jsxs)(X,{children:[(0,s.jsxs)(ee,{children:[(0,s.jsxs)("span",{children:[s.jsx(Y,{}),"Trello"]}),"→",(0,s.jsxs)("span",{children:[s.jsx(V,{}),"Asana"]})]}),(0,s.jsxs)(et,{children:[(0,s.jsxs)(er,{status:e,children:[a(e),(0,s.jsxs)(es,{children:[(0,s.jsxs)(eo,{children:[c("Trello",e),n&&("error"===e||"disconnected"===e)&&s.jsx(ei,{onClick:n,title:"Tentar novamente",children:s.jsx(B,{})})]}),r&&(0,s.jsxs)(en,{children:[r.name,r.email&&` (${r.email})`]})]})]}),(0,s.jsxs)(er,{status:t,children:[a(t),(0,s.jsxs)(es,{children:[(0,s.jsxs)(eo,{children:[c("Asana",t),i&&("error"===t||"disconnected"===t)&&s.jsx(ei,{onClick:i,title:"Tentar novamente",children:s.jsx(B,{})})]}),o&&(0,s.jsxs)(en,{children:[o.name,o.email&&` (${o.email})`]})]})]})]})]})})}let ec=G.F4`
  from { opacity: 0; }
  to { opacity: 1; }
`,el=G.F4`
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`,eu=G.F4`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`,ed=G.ZP.div`
  min-height: calc(100vh - 64px);
  display: flex;
  flex-direction: column;
  background: ${({theme:e})=>`linear-gradient(135deg, ${e.colors.brand.primary} 0%, ${e.colors.brand.secondary} 100%)`};
  animation: ${ec} ${({theme:e})=>e.transitions.normal};
  overflow: hidden;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
    pointer-events: none;
  }
`;G.ZP.nav`
  background: ${({theme:e})=>e.colors.background.default};
  box-shadow: ${({theme:e})=>e.shadows.sm};
`,G.ZP.div`
  max-width: ${({theme:e})=>e.breakpoints.xl};
  margin: 0 auto;
  padding: 0 ${({theme:e})=>e.spacing[4]};
  height: ${({theme:e})=>e.spacing[12]};
  display: flex;
  align-items: center;

  @media (min-width: ${({theme:e})=>e.breakpoints.sm}) {
    padding: 0 ${({theme:e})=>e.spacing[6]};
  }

  @media (min-width: ${({theme:e})=>e.breakpoints.lg}) {
    padding: 0 ${({theme:e})=>e.spacing[8]};
  }
`,G.ZP.div`
  position: relative;
  padding: ${({theme:e})=>e.spacing[16]} 0;
  animation: ${el} ${({theme:e})=>e.transitions.normal};
  flex-shrink: 0;
`,G.ZP.div`
  max-width: ${({theme:e})=>e.breakpoints.xl};
  margin: 0 auto;
  padding: 0 ${({theme:e})=>e.spacing[4]};
  text-align: center;
  position: relative;
  z-index: ${({theme:e})=>e.zIndices.base};
`,G.ZP.h1`
  font-size: ${({theme:e})=>e.typography.fontSizes["4xl"]};
  font-weight: ${({theme:e})=>e.typography.fontWeights.bold};
  color: ${({theme:e})=>e.colors.text.primary};
  line-height: ${({theme:e})=>e.typography.lineHeights.tight};
  margin-bottom: ${({theme:e})=>e.spacing[4]};

  @media (min-width: ${({theme:e})=>e.breakpoints.md}) {
    font-size: ${({theme:e})=>e.typography.fontSizes["5xl"]};
  }
`,G.ZP.p`
  font-size: ${({theme:e})=>e.typography.fontSizes.lg};
  color: ${({theme:e})=>e.colors.text.secondary};
  max-width: 36rem;
  margin: 0 auto;
  line-height: ${({theme:e})=>e.typography.lineHeights.relaxed};
`;let eh=G.ZP.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: ${({theme:e})=>e.spacing[8]};
  width: 100%;
  max-width: ${({theme:e})=>e.breakpoints.xl};
  margin: 0 auto;
  position: relative;
  z-index: ${({theme:e})=>e.zIndices.base};
  
  @media (max-width: ${({theme:e})=>e.breakpoints.lg}) {
    padding: ${({theme:e})=>e.spacing[4]};
  }
`,ep=G.ZP.div`
  background: ${({theme:e})=>e.colors.background.glass};
  border: 1px solid ${({theme:e})=>e.colors.border.default};
  border-radius: ${({theme:e})=>e.borderRadius.xl};
  padding: ${({theme:e})=>e.spacing[6]};
  animation: ${el} ${({theme:e})=>e.transitions.normal};
  width: 100%;
  max-width: 640px;
  backdrop-filter: blur(8px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: transform ${({theme:e})=>e.transitions.normal}, box-shadow ${({theme:e})=>e.transitions.normal};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
`,eg=G.ZP.h2`
  font-size: ${({theme:e})=>e.typography.fontSizes.xl};
  font-weight: ${({theme:e})=>e.typography.fontWeights.semibold};
  color: ${({theme:e})=>e.colors.text.primary};
  margin-bottom: ${({theme:e})=>e.spacing[6]};
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing[2]};

  svg {
    width: 24px;
    height: 24px;
    color: ${({theme:e})=>e.colors.brand.tertiary};
  }
`,ef=G.ZP.div`
  display: grid;
  gap: ${({theme:e})=>e.spacing[6]};
  margin-bottom: ${({theme:e})=>e.spacing[6]};
  
  @media (min-width: ${({theme:e})=>e.breakpoints.sm}) {
    grid-template-columns: repeat(2, 1fr);
    gap: ${({theme:e})=>e.spacing[4]};
  }
`,ey=G.ZP.div`
  display: flex;
  flex-direction: column;
  gap: ${({theme:e})=>e.spacing[2]};
`,em=G.ZP.label`
  font-size: ${({theme:e})=>e.typography.fontSizes.sm};
  font-weight: ${({theme:e})=>e.typography.fontWeights.medium};
  color: ${({theme:e})=>e.colors.text.primary};
  display: flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing[2]};

  svg {
    width: 16px;
    height: 16px;
    color: ${({theme:e})=>e.colors.text.secondary};
  }
`,ex=G.ZP.select`
  width: 100%;
  padding: ${({theme:e})=>`${e.spacing[2]} ${e.spacing[3]}`};
  font-size: ${({theme:e})=>e.typography.fontSizes.sm};
  line-height: ${({theme:e})=>e.typography.lineHeights.normal};
  color: ${({theme:e})=>e.colors.text.primary};
  background-color: ${({theme:e})=>e.colors.background.glass};
  border: 1px solid ${({theme:e})=>e.colors.border.default};
  border-radius: ${({theme:e})=>e.borderRadius.md};
  cursor: pointer;
  transition: all ${({theme:e})=>e.transitions.normal};
  backdrop-filter: blur(8px);
  
  &:focus {
    outline: none;
    border-color: ${({theme:e})=>e.colors.border.focus};
    box-shadow: 0 0 0 2px ${({theme:e})=>`${e.colors.brand.primary}33`};
  }

  &:hover:not(:disabled) {
    border-color: ${({theme:e})=>e.colors.border.hover};
    background-color: ${({theme:e})=>e.colors.background.hover};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background-color: ${({theme:e})=>e.colors.background.disabled};
  }

  option {
    background-color: ${({theme:e})=>e.colors.background.primary};
    color: ${({theme:e})=>e.colors.text.primary};
  }
`,eb=G.ZP.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: ${({theme:e})=>`${e.spacing[3]} ${e.spacing[4]}`};
  font-size: ${({theme:e})=>e.typography.fontSizes.sm};
  font-weight: ${({theme:e})=>e.typography.fontWeights.medium};
  color: ${({theme:e})=>e.colors.text.primary};
  background: ${({theme:e,$loading:t})=>t?e.colors.background.glass:`linear-gradient(135deg, ${e.colors.brand.secondary} 0%, ${e.colors.brand.tertiary} 100%)`};
  border: 1px solid ${({theme:e})=>e.colors.border.default};
  border-radius: ${({theme:e})=>e.borderRadius.md};
  cursor: ${({$loading:e})=>e?"not-allowed":"pointer"};
  transition: all ${({theme:e})=>e.transitions.normal};
  opacity: ${({$loading:e})=>e?.7:1};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(255, 255, 255, 0.2) 50%,
      transparent 100%
    );
    transition: left 0.5s ease-in-out;
  }

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

    &::before {
      left: 100%;
    }
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${({theme:e})=>`${e.colors.brand.primary}33`};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background: ${({theme:e})=>e.colors.background.glass};
  }

  svg {
    width: 16px;
    height: 16px;
    margin-right: ${({theme:e})=>e.spacing[2]};
    animation: ${({$loading:e})=>e?`${eu} 1s ease-in-out infinite`:"none"};
  }
`;G.ZP.span`
  padding: ${({theme:e})=>`${e.spacing[1]} ${e.spacing[2]}`};
  border-radius: ${({theme:e})=>e.borderRadius.full};
  font-size: ${({theme:e})=>e.typography.fontSizes.sm};
  font-weight: ${({theme:e})=>e.typography.fontWeights.medium};
  display: inline-flex;
  align-items: center;
  gap: ${({theme:e})=>e.spacing[1]};
  
  ${({status:e,theme:t})=>{switch(e){case"checking":return`
          background: ${t.colors.background.warning};
          color: ${t.colors.status.warning};
          border: 1px solid ${t.colors.border.warning};
        `;case"connected":return`
          background: ${t.colors.background.success};
          color: ${t.colors.status.success};
          border: 1px solid ${t.colors.border.success};
        `;case"error":return`
          background: ${t.colors.background.error};
          color: ${t.colors.status.error};
          border: 1px solid ${t.colors.border.error};
        `}}}
`,G.ZP.div`
  background: ${({theme:e})=>e.colors.background.error};
  border: 1px solid ${({theme:e})=>e.colors.border.error};
  border-radius: ${({theme:e})=>e.borderRadius.md};
  padding: ${({theme:e})=>e.spacing[4]};
  margin-top: ${({theme:e})=>e.spacing[6]};
  display: flex;
  align-items: flex-start;
  gap: ${({theme:e})=>e.spacing[3]};
  
  svg {
    flex-shrink: 0;
    color: ${({theme:e})=>e.colors.status.error};
  }
`;let e$=G.F4`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`,ek=G.ZP.div`
  margin-top: ${({theme:e})=>e.spacing[6]};
  padding: ${({theme:e})=>e.spacing[4]};
  border-radius: ${({theme:e})=>e.borderRadius.md};
  display: flex;
  align-items: flex-start;
  gap: ${({theme:e})=>e.spacing[3]};
  animation: ${e$} ${({theme:e})=>e.transitions.normal};
`,ev=(0,G.ZP)(ek)`
  background: ${({theme:e})=>e.colors.background.error};
  border: 1px solid ${({theme:e})=>e.colors.border.error};
  color: ${({theme:e})=>e.colors.status.error};
`,ew=(0,G.ZP)(ek)`
  background: ${({theme:e})=>e.colors.background.success};
  border: 1px solid ${({theme:e})=>e.colors.border.success};
  color: ${({theme:e})=>e.colors.status.success};
`,eR=(0,G.ZP)(ek)`
  background: ${({theme:e})=>e.colors.background.warning};
  border: 1px solid ${({theme:e})=>e.colors.border.warning};
  color: ${({theme:e})=>e.colors.status.warning};
`,ej=G.ZP.div`
  flex-shrink: 0;

  svg {
    width: 20px;
    height: 20px;
  }
`,eC=G.ZP.div`
  font-size: ${({theme:e})=>e.typography.fontSizes.sm};
  line-height: ${({theme:e})=>e.typography.lineHeights.normal};
  flex: 1;
`,eS=G.F4`
  to { transform: rotate(360deg); }
`,eO=(0,G.ZP)(D)`
  animation: ${eS} 1s linear infinite;
`;function eP({isLoading:e,error:t,success:r}){return e?(0,s.jsxs)(eR,{children:[s.jsx(ej,{children:s.jsx(eO,{})}),s.jsx(eC,{children:"Sincronizando dados entre Trello e Asana..."})]}):t?(0,s.jsxs)(ev,{children:[s.jsx(ej,{children:s.jsx(K,{})}),s.jsx(eC,{children:t})]}):r?(0,s.jsxs)(ew,{children:[s.jsx(ej,{children:s.jsx(W,{})}),s.jsx(eC,{children:"Integra\xe7\xe3o conclu\xedda com sucesso!"})]}):null}function eT(){let[e,t]=(0,o.useState)(),[r,n]=(0,o.useState)(!1),[a,c]=(0,o.useState)(!1);(0,o.useEffect)(()=>{c(!0)},[]);let{trelloStatus:l,asanaStatus:u,trelloData:d,asanaData:h,isLoading:p,retryTrello:g,retryAsana:f}=function(){let e=T({queryKey:["trello-test"],queryFn:async()=>{console.group("Trello Connection Test");try{let e=await z.testConnection();return console.log("Trello test result:",e),console.groupEnd(),{success:!0,userData:e}}catch(e){return console.error("Trello connection test failed:",e),console.groupEnd(),{success:!1,error:{code:"TRELLO_CONNECTION_ERROR",message:e instanceof Error?e.message:"Unknown error"}}}},retry:!1,refetchInterval:3e4,refetchOnWindowFocus:!0,refetchOnReconnect:!0}),t=T({queryKey:["asana-test"],queryFn:async()=>{console.group("Asana Connection Test");try{let e=await M.testConnection();return console.log("Asana test result:",e),console.groupEnd(),{success:!0,userData:e}}catch(e){return console.error("Asana connection test failed:",e),console.groupEnd(),{success:!1,error:{code:"ASANA_CONNECTION_ERROR",message:e instanceof Error?e.message:"Unknown error"}}}},retry:!1,refetchInterval:3e4,refetchOnWindowFocus:!0,refetchOnReconnect:!0}),r=F(e.isLoading,e.isError,e.data,e.error),s=F(t.isLoading,t.isError,t.data,t.error);return console.group("Connection Status Summary"),console.log("Trello Status:",r),console.log("Asana Status:",s),console.groupEnd(),{trelloStatus:r,asanaStatus:s,trelloData:e.data,asanaData:t.data,isLoading:e.isLoading||t.isLoading,error:e.error||t.error,retryTrello:e.refetch,retryAsana:t.refetch}}(),{selectedBoard:m,setSelectedBoard:x,selectedWorkspace:k,setSelectedWorkspace:v,trelloBoards:w,asanaWorkspaces:R,isLoadingTrello:j,isLoadingAsana:C,isSyncing:S,sync:O}=function({onSuccess:e,onError:t}={}){let[r,s]=(0,o.useState)(""),[n,a]=(0,o.useState)(""),{data:c,isLoading:l}=T({queryKey:["trello-boards"],queryFn:async()=>{console.log("Fetching Trello boards...");let e=await z.getBoards();return console.log("Trello boards:",e),e},enabled:!0}),{data:u,isLoading:d}=T({queryKey:["asana-workspaces"],queryFn:async()=>{console.log("Fetching Asana workspaces...");let e=await M.getWorkspaces();return console.log("Asana workspaces:",e),e},enabled:!0}),{mutate:h,isPending:p}=function(e,t){let r=(0,y.NL)(void 0),[s]=o.useState(()=>new q(r,e));o.useEffect(()=>{s.setOptions(e)},[s,e]);let n=o.useSyncExternalStore(o.useCallback(e=>s.subscribe(i.V.batchCalls(e)),[s]),()=>s.getCurrentResult(),()=>s.getCurrentResult()),a=o.useCallback((e,t)=>{s.mutate(e,t).catch($)},[s]);if(n.error&&b(s.options.throwOnError,[n.error]))throw n.error;return{...n,mutate:a,mutateAsync:n.mutate}}({mutationFn:async()=>{if(!r||!n)throw Error("Selecione um quadro e um workspace");await z.syncToAsana({boardId:r,workspaceId:n})},onSuccess:e,onError:t});return{selectedBoard:r,setSelectedBoard:s,selectedWorkspace:n,setSelectedWorkspace:a,trelloBoards:c,asanaWorkspaces:u,isLoadingTrello:l,isLoadingAsana:d,isSyncing:p,sync:h}}({onSuccess:()=>{n(!0),t(void 0)},onError:e=>{t(e.message),n(!1)}});if(!a||p)return null;let P=S||e||r;return(0,s.jsxs)(s.Fragment,{children:[s.jsx(ea,{trelloStatus:l,asanaStatus:u,trelloUser:d?.success?d.userData:void 0,asanaUser:h?.success?h.userData:void 0,onRetryTrello:()=>g(),onRetryAsana:()=>f()}),s.jsx(ed,{children:s.jsx(eh,{children:(0,s.jsxs)(ep,{children:[(0,s.jsxs)(eg,{children:[s.jsx(Y,{}),"Configura\xe7\xe3o da Integra\xe7\xe3o"]}),(0,s.jsxs)(ef,{children:[(0,s.jsxs)(ey,{children:[(0,s.jsxs)(em,{children:[s.jsx(Y,{}),"Quadro do Trello"]}),(0,s.jsxs)(ex,{value:m,onChange:e=>{x(e.target.value)},disabled:"connected"!==l||j,children:[s.jsx("option",{value:"",children:"Selecione um quadro"}),w?.map(e=>s.jsx("option",{value:e.id,children:e.name},e.id))]})]}),(0,s.jsxs)(ey,{children:[(0,s.jsxs)(em,{children:[s.jsx(V,{}),"Workspace do Asana"]}),(0,s.jsxs)(ex,{value:k,onChange:e=>{v(e.target.value)},disabled:"connected"!==u||C,children:[s.jsx("option",{value:"",children:"Selecione um workspace"}),R?.map(e=>s.jsx("option",{value:e.gid,children:e.name},e.gid))]})]})]}),s.jsx(eb,{onClick:()=>O(),disabled:!m||!k||S||"connected"!==l||"connected"!==u,$loading:S,children:S?"Sincronizando...":"Iniciar Integra\xe7\xe3o"}),P&&s.jsx(eP,{isLoading:S,error:e,success:r})]})})})]})}},1136:(e,t,r)=>{"use strict";r.r(t),r.d(t,{$$typeof:()=>n,__esModule:()=>o,default:()=>i});let s=(0,r(6843).createProxy)(String.raw`C:\Users\brandao\Desktop\development\backend\trello-asana-analysis\src\app\page.tsx`),{__esModule:o,$$typeof:n}=s,i=s.default}};var t=require("../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),s=t.X(0,[249,498],()=>r(6983));module.exports=s})();