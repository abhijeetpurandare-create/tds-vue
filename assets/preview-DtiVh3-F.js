/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ce=globalThis,Ne=Ce.ShadowRoot&&(Ce.ShadyCSS===void 0||Ce.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Re=Symbol(),Ye=new WeakMap;let Vo=class{constructor(i,t,e){if(this._$cssResult$=!0,e!==Re)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=i,this.t=t}get styleSheet(){let i=this.o;const t=this.t;if(Ne&&i===void 0){const e=t!==void 0&&t.length===1;e&&(i=Ye.get(t)),i===void 0&&((this.o=i=new CSSStyleSheet).replaceSync(this.cssText),e&&Ye.set(t,i))}return i}toString(){return this.cssText}};const Le=i=>new Vo(typeof i=="string"?i:i+"",void 0,Re),ze=(i,...t)=>{const e=i.length===1?i[0]:t.reduce((s,o,n)=>s+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(o)+i[n+1],i[0]);return new Vo(e,i,Re)},os=(i,t)=>{if(Ne)i.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const s=document.createElement("style"),o=Ce.litNonce;o!==void 0&&s.setAttribute("nonce",o),s.textContent=e.cssText,i.appendChild(s)}},Je=Ne?i=>i:i=>i instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return Le(e)})(i):i;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:ss,defineProperty:is,getOwnPropertyDescriptor:rs,getOwnPropertyNames:ns,getOwnPropertySymbols:as,getPrototypeOf:ls}=Object,Ct=globalThis,Ze=Ct.trustedTypes,cs=Ze?Ze.emptyScript:"",Oe=Ct.reactiveElementPolyfillSupport,de=(i,t)=>i,ke={toAttribute(i,t){switch(t){case Boolean:i=i?cs:null;break;case Object:case Array:i=i==null?i:JSON.stringify(i)}return i},fromAttribute(i,t){let e=i;switch(t){case Boolean:e=i!==null;break;case Number:e=i===null?null:Number(i);break;case Object:case Array:try{e=JSON.parse(i)}catch{e=null}}return e}},Ue=(i,t)=>!ss(i,t),Qe={attribute:!0,type:String,converter:ke,reflect:!1,useDefault:!1,hasChanged:Ue};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),Ct.litPropertyMetadata??(Ct.litPropertyMetadata=new WeakMap);let It=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=Qe){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),o=this.getPropertyDescriptor(t,s,e);o!==void 0&&is(this.prototype,t,o)}}static getPropertyDescriptor(t,e,s){const{get:o,set:n}=rs(this.prototype,t)??{get(){return this[e]},set(r){this[e]=r}};return{get:o,set(r){const c=o==null?void 0:o.call(this);n==null||n.call(this,r),this.requestUpdate(t,c,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Qe}static _$Ei(){if(this.hasOwnProperty(de("elementProperties")))return;const t=ls(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(de("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(de("properties"))){const e=this.properties,s=[...ns(e),...as(e)];for(const o of s)this.createProperty(o,e[o])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[s,o]of e)this.elementProperties.set(s,o)}this._$Eh=new Map;for(const[e,s]of this.elementProperties){const o=this._$Eu(e,s);o!==void 0&&this._$Eh.set(o,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const o of s)e.unshift(Je(o))}else t!==void 0&&e.push(Je(t));return e}static _$Eu(t,e){const s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(e=>e(this))}addController(t){var e;(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((e=t.hostConnected)==null||e.call(t))}removeController(t){var e;(e=this._$EO)==null||e.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return os(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(e=>{var s;return(s=e.hostConnected)==null?void 0:s.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(e=>{var s;return(s=e.hostDisconnected)==null?void 0:s.call(e)})}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){var n;const s=this.constructor.elementProperties.get(t),o=this.constructor._$Eu(t,s);if(o!==void 0&&s.reflect===!0){const r=(((n=s.converter)==null?void 0:n.toAttribute)!==void 0?s.converter:ke).toAttribute(e,s.type);this._$Em=t,r==null?this.removeAttribute(o):this.setAttribute(o,r),this._$Em=null}}_$AK(t,e){var n,r;const s=this.constructor,o=s._$Eh.get(t);if(o!==void 0&&this._$Em!==o){const c=s.getPropertyOptions(o),l=typeof c.converter=="function"?{fromAttribute:c.converter}:((n=c.converter)==null?void 0:n.fromAttribute)!==void 0?c.converter:ke;this._$Em=o;const d=l.fromAttribute(e,c.type);this[o]=d??((r=this._$Ej)==null?void 0:r.get(o))??d,this._$Em=null}}requestUpdate(t,e,s,o=!1,n){var r;if(t!==void 0){const c=this.constructor;if(o===!1&&(n=this[t]),s??(s=c.getPropertyOptions(t)),!((s.hasChanged??Ue)(n,e)||s.useDefault&&s.reflect&&n===((r=this._$Ej)==null?void 0:r.get(t))&&!this.hasAttribute(c._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:o,wrapped:n},r){s&&!(this._$Ej??(this._$Ej=new Map)).has(t)&&(this._$Ej.set(t,r??e??this[t]),n!==!0||r!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),o===!0&&this._$Em!==t&&(this._$Eq??(this._$Eq=new Set)).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var s;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[n,r]of this._$Ep)this[n]=r;this._$Ep=void 0}const o=this.constructor.elementProperties;if(o.size>0)for(const[n,r]of o){const{wrapped:c}=r,l=this[n];c!==!0||this._$AL.has(n)||l===void 0||this.C(n,void 0,r,l)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),(s=this._$EO)==null||s.forEach(o=>{var n;return(n=o.hostUpdate)==null?void 0:n.call(o)}),this.update(e)):this._$EM()}catch(o){throw t=!1,this._$EM(),o}t&&this._$AE(e)}willUpdate(t){}_$AE(t){var e;(e=this._$EO)==null||e.forEach(s=>{var o;return(o=s.hostUpdated)==null?void 0:o.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&(this._$Eq=this._$Eq.forEach(e=>this._$ET(e,this[e]))),this._$EM()}updated(t){}firstUpdated(t){}};It.elementStyles=[],It.shadowRootOptions={mode:"open"},It[de("elementProperties")]=new Map,It[de("finalized")]=new Map,Oe==null||Oe({ReactiveElement:It}),(Ct.reactiveElementVersions??(Ct.reactiveElementVersions=[])).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const pe=globalThis,to=i=>i,_e=pe.trustedTypes,eo=_e?_e.createPolicy("lit-html",{createHTML:i=>i}):void 0,Io="$lit$",$t=`lit$${Math.random().toFixed(9).slice(2)}$`,Ko="?"+$t,ds=`<${Ko}>`,jt=document,he=()=>jt.createComment(""),be=i=>i===null||typeof i!="object"&&typeof i!="function",We=Array.isArray,ps=i=>We(i)||typeof(i==null?void 0:i[Symbol.iterator])=="function",Fe=`[ 	
\f\r]`,ce=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,oo=/-->/g,so=/>/g,Ft=RegExp(`>|${Fe}(?:([^\\s"'>=/]+)(${Fe}*=${Fe}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),io=/'/g,ro=/"/g,Xo=/^(?:script|style|textarea|title)$/i,Yo=i=>(t,...e)=>({_$litType$:i,strings:t,values:e}),h=Yo(1),no=Yo(2),Kt=Symbol.for("lit-noChange"),f=Symbol.for("lit-nothing"),ao=new WeakMap,At=jt.createTreeWalker(jt,129);function Jo(i,t){if(!We(i)||!i.hasOwnProperty("raw"))throw Error("invalid template strings array");return eo!==void 0?eo.createHTML(t):t}const hs=(i,t)=>{const e=i.length-1,s=[];let o,n=t===2?"<svg>":t===3?"<math>":"",r=ce;for(let c=0;c<e;c++){const l=i[c];let d,b,p=-1,g=0;for(;g<l.length&&(r.lastIndex=g,b=r.exec(l),b!==null);)g=r.lastIndex,r===ce?b[1]==="!--"?r=oo:b[1]!==void 0?r=so:b[2]!==void 0?(Xo.test(b[2])&&(o=RegExp("</"+b[2],"g")),r=Ft):b[3]!==void 0&&(r=Ft):r===Ft?b[0]===">"?(r=o??ce,p=-1):b[1]===void 0?p=-2:(p=r.lastIndex-b[2].length,d=b[1],r=b[3]===void 0?Ft:b[3]==='"'?ro:io):r===ro||r===io?r=Ft:r===oo||r===so?r=ce:(r=Ft,o=void 0);const u=r===Ft&&i[c+1].startsWith("/>")?" ":"";n+=r===ce?l+ds:p>=0?(s.push(d),l.slice(0,p)+Io+l.slice(p)+$t+u):l+$t+(p===-2?c:u)}return[Jo(i,n+(i[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]};let je=class Zo{constructor({strings:t,_$litType$:e},s){let o;this.parts=[];let n=0,r=0;const c=t.length-1,l=this.parts,[d,b]=hs(t,e);if(this.el=Zo.createElement(d,s),At.currentNode=this.el.content,e===2||e===3){const p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}for(;(o=At.nextNode())!==null&&l.length<c;){if(o.nodeType===1){if(o.hasAttributes())for(const p of o.getAttributeNames())if(p.endsWith(Io)){const g=b[r++],u=o.getAttribute(p).split($t),x=/([.?@])?(.*)/.exec(g);l.push({type:1,index:n,name:x[2],strings:u,ctor:x[1]==="."?us:x[1]==="?"?gs:x[1]==="@"?fs:Ee}),o.removeAttribute(p)}else p.startsWith($t)&&(l.push({type:6,index:n}),o.removeAttribute(p));if(Xo.test(o.tagName)){const p=o.textContent.split($t),g=p.length-1;if(g>0){o.textContent=_e?_e.emptyScript:"";for(let u=0;u<g;u++)o.append(p[u],he()),At.nextNode(),l.push({type:2,index:++n});o.append(p[g],he())}}}else if(o.nodeType===8)if(o.data===Ko)l.push({type:2,index:n});else{let p=-1;for(;(p=o.data.indexOf($t,p+1))!==-1;)l.push({type:7,index:n}),p+=$t.length-1}n++}}static createElement(t,e){const s=jt.createElement("template");return s.innerHTML=t,s}};function Xt(i,t,e=i,s){var r,c;if(t===Kt)return t;let o=s!==void 0?(r=e._$Co)==null?void 0:r[s]:e._$Cl;const n=be(t)?void 0:t._$litDirective$;return(o==null?void 0:o.constructor)!==n&&((c=o==null?void 0:o._$AO)==null||c.call(o,!1),n===void 0?o=void 0:(o=new n(i),o._$AT(i,e,s)),s!==void 0?(e._$Co??(e._$Co=[]))[s]=o:e._$Cl=o),o!==void 0&&(t=Xt(i,o._$AS(i,t.values),o,s)),t}class bs{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,o=((t==null?void 0:t.creationScope)??jt).importNode(e,!0);At.currentNode=o;let n=At.nextNode(),r=0,c=0,l=s[0];for(;l!==void 0;){if(r===l.index){let d;l.type===2?d=new Me(n,n.nextSibling,this,t):l.type===1?d=new l.ctor(n,l.name,l.strings,this,t):l.type===6&&(d=new xs(n,this,t)),this._$AV.push(d),l=s[++c]}r!==(l==null?void 0:l.index)&&(n=At.nextNode(),r++)}return At.currentNode=jt,o}p(t){let e=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}let Me=class Qo{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this._$Cv}constructor(t,e,s,o){this.type=2,this._$AH=f,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=o,this._$Cv=(o==null?void 0:o.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Xt(this,t,e),be(t)?t===f||t==null||t===""?(this._$AH!==f&&this._$AR(),this._$AH=f):t!==this._$AH&&t!==Kt&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):ps(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==f&&be(this._$AH)?this._$AA.nextSibling.data=t:this.T(jt.createTextNode(t)),this._$AH=t}$(t){var n;const{values:e,_$litType$:s}=t,o=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=je.createElement(Jo(s.h,s.h[0]),this.options)),s);if(((n=this._$AH)==null?void 0:n._$AD)===o)this._$AH.p(e);else{const r=new bs(o,this),c=r.u(this.options);r.p(e),this.T(c),this._$AH=r}}_$AC(t){let e=ao.get(t.strings);return e===void 0&&ao.set(t.strings,e=new je(t)),e}k(t){We(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,o=0;for(const n of t)o===e.length?e.push(s=new Qo(this.O(he()),this.O(he()),this,this.options)):s=e[o],s._$AI(n),o++;o<e.length&&(this._$AR(s&&s._$AB.nextSibling,o),e.length=o)}_$AR(t=this._$AA.nextSibling,e){var s;for((s=this._$AP)==null?void 0:s.call(this,!1,!0,e);t!==this._$AB;){const o=to(t).nextSibling;to(t).remove(),t=o}}setConnected(t){var e;this._$AM===void 0&&(this._$Cv=t,(e=this._$AP)==null||e.call(this,t))}},Ee=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,o,n){this.type=1,this._$AH=f,this._$AN=void 0,this.element=t,this.name=e,this._$AM=o,this.options=n,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=f}_$AI(t,e=this,s,o){const n=this.strings;let r=!1;if(n===void 0)t=Xt(this,t,e,0),r=!be(t)||t!==this._$AH&&t!==Kt,r&&(this._$AH=t);else{const c=t;let l,d;for(t=n[0],l=0;l<n.length-1;l++)d=Xt(this,c[s+l],e,l),d===Kt&&(d=this._$AH[l]),r||(r=!be(d)||d!==this._$AH[l]),d===f?t=f:t!==f&&(t+=(d??"")+n[l+1]),this._$AH[l]=d}r&&!o&&this.j(t)}j(t){t===f?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}};class us extends Ee{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===f?void 0:t}}class gs extends Ee{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==f)}}class fs extends Ee{constructor(t,e,s,o,n){super(t,e,s,o,n),this.type=5}_$AI(t,e=this){if((t=Xt(this,t,e,0)??f)===Kt)return;const s=this._$AH,o=t===f&&s!==f||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==f&&(s===f||o);o&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e;typeof this._$AH=="function"?this._$AH.call(((e=this.options)==null?void 0:e.host)??this.element,t):this._$AH.handleEvent(t)}}class xs{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){Xt(this,t)}}const Ae=pe.litHtmlPolyfillSupport;Ae==null||Ae(je,Me),(pe.litHtmlVersions??(pe.litHtmlVersions=[])).push("3.3.2");const ys=(i,t,e)=>{const s=(e==null?void 0:e.renderBefore)??t;let o=s._$litPart$;if(o===void 0){const n=(e==null?void 0:e.renderBefore)??null;s._$litPart$=o=new Me(t.insertBefore(he(),n),n,void 0,e??{})}return o._$AI(i),o};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Pt=globalThis;let _=class extends It{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;const t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=ys(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)==null||t.setConnected(!1)}render(){return Kt}};var Go;_._$litElement$=!0,_.finalized=!0,(Go=Pt.litElementHydrateSupport)==null||Go.call(Pt,{LitElement:_});const Pe=Pt.litElementPolyfillSupport;Pe==null||Pe({LitElement:_});(Pt.litElementVersions??(Pt.litElementVersions=[])).push("4.2.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const z=i=>(t,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(i,t)}):customElements.define(i,t)};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ms={attribute:!0,type:String,converter:ke,reflect:!1,hasChanged:Ue},vs=(i=ms,t,e)=>{const{kind:s,metadata:o}=e;let n=globalThis.litPropertyMetadata.get(o);if(n===void 0&&globalThis.litPropertyMetadata.set(o,n=new Map),s==="setter"&&((i=Object.create(i)).wrapped=!0),n.set(e.name,i),s==="accessor"){const{name:r}=e;return{set(c){const l=t.get.call(this);t.set.call(this,c),this.requestUpdate(r,l,i,!0,c)},init(c){return c!==void 0&&this.C(r,void 0,i,c),c}}}if(s==="setter"){const{name:r}=e;return function(c){const l=this[r];t.call(this,c),this.requestUpdate(r,l,i,!0,c)}}throw Error("Unsupported decorator location: "+s)};function a(i){return(t,e)=>typeof e=="object"?vs(i,t,e):((s,o,n)=>{const r=o.hasOwnProperty(n);return o.constructor.createProperty(n,s),r?Object.getOwnPropertyDescriptor(o,n):void 0})(i,t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function Q(i){return a({...i,state:!0,attribute:!1})}const ts={"--delhivery-red":"#ED4136","--delhivery-blue":"#5b80f7","--success-bg-lightest":"#E6F4EA","--success-bg":"#C6E6D4","--success-bg-darkest":"#A6D8BE","--success-stroke-lighter":"#8CCBAA","--success-stroke":"#6EBF96","--success-stroke-dark":"#50B382","--success":"#34A853","--success-dark":"#2E8B47","--success-font-dark":"#1A6E3A","--success-font-light":"#B7E1C7","--error-bg-lightest":"#FCE8E6","--error-bg":"#F9D1D1","--error-bg-darkest":"#F6BABA","--error-stroke-lighter":"#F4A3A3","--error-stroke":"#F28C8C","--error-stroke-dark":"#F07575","--error":"#EA4335","--error-dark":"#D32F2F","--error-font-dark":"#B71C1C","--error-font-light":"#F5B7B1","--warning-bg-lightest":"#FFF3E0","--warning-bg":"#FFE0B2","--warning-bg-darkest":"#FFCC80","--warning-stroke-lighter":"#FFB74D","--warning-stroke":"#FFA726","--warning-stroke-dark":"#FF9800","--warning":"#FBBC05","--warning-dark":"#F57C00","--warning-font-dark":"#E65100","--warning-font-light":"#FFE0B2","--information-bg-lightest":"#E3F2FD","--information-bg-lighter":"#BBDEFB","--information-bg":"#90CAF9","--information-bg-dark":"#64B5F6","--information-bg-darkest":"#42A5F5","--information-stroke-lightest":"#E3F2FD","--information-stroke-lighter":"#BBDEFB","--information-stroke":"#90CAF9","--information-stroke-dark":"#64B5F6","--information-stroke-darkest":"#42A5F5","--information":"#2196F3","--information-dark":"#1E88E5","--information-light":"#BBDEFB","--failure-bg-lightest":"#FFEBEE","--failure-bg-lighter":"#FFCDD2","--failure-bg":"#EF9A9A","--failure-bg-dark":"#E57373","--failure-bg-darkest":"#EF5350","--failure-stroke-lightest":"#FFEBEE","--failure-stroke-lighter":"#FFCDD2","--failure-stroke":"#EF9A9A","--failure-stroke-dark":"#E57373","--failure-stroke-darkest":"#EF5350","--failure":"#F44336","--failure-dark":"#E53935","--failure-light":"#FFCDD2","--pending-bg-lightest":"#FFF3E0","--pending-bg-lighter":"#FFE0B2","--pending-bg":"#FFCC80","--pending-bg-dark":"#FFB74D","--pending-bg-darkest":"#FFA726","--pending-stroke-lightest":"#FFF3E0","--pending-stroke-lighter":"#FFE0B2","--pending-stroke":"#FFCC80","--pending-stroke-dark":"#FFB74D","--pending-stroke-darkest":"#FFA726","--pending":"#FF9800","--pending-dark":"#FB8C00","--pending-light":"#FFE0B2","--primary-shadow":"0 35px 60px -15px rgba(0,0,0,0.3)","--warning-shadow":"0 0 0 4px rgba(245, 158, 11, 0.1), 0 1px 3px 0 rgba(245, 158, 11, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)","--success-shadow":"0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)"};async function $s(i){const{source:t,activeTheme:e="light",overrides:s={}}=i;let o={};try{const n=Cs(t)||t.startsWith("/")||t.startsWith("./")?t:`/${t}`,r=await fetch(n,{method:"GET",headers:{"Content-Type":"application/json"}});if(!r.ok)throw new Error(`Failed to load theme: HTTP ${r.status}`);if(r.headers.get("Content-Type")!=="application/json"){const c=await r.text();try{const l=JSON.parse(c);o=l.record??l}catch{throw new Error(`Invalid JSON in theme file: ${t}`)}}else o=await r.json()}catch(n){throw console.error("[Tarmac Tokens] Error loading theme:",n),n}return{...o[e]?o[e]:o,...s}}function Cs(i){try{return new URL(i),!0}catch{return!1}}var ks=Object.defineProperty,_s=Object.getOwnPropertyDescriptor,te=(i,t,e,s)=>{for(var o=s>1?void 0:s?_s(t,e):t,n=i.length-1,r;n>=0;n--)(r=i[n])&&(o=(s?r(t,e,o):r(o))||o);return s&&o&&ks(t,e,o),o};const He="tarmac-theme-loaded";let kt=class extends _{constructor(){super(...arguments),this.source="",this.activeTheme="light",this.theme={},this.isLoading=!1,this.isReady=!1}connectedCallback(){super.connectedCallback(),this.source?this._loadTheme():this.isReady=!0}updated(t){t.has("source")&&this.source&&this._loadTheme()}async _loadTheme(){this.isLoading=!0,this.isReady=!1;try{this.theme=await $s({source:this.source,activeTheme:this.activeTheme}),this.dispatchEvent(new CustomEvent(He,{bubbles:!0,composed:!0,detail:{theme:this.theme}}))}catch(t){console.error("[tarmac-theme-provider] Failed to load theme:",t)}finally{this.isLoading=!1,this.isReady=!0}}getTheme(){return this.theme}render(){return h`<slot></slot>`}};kt.styles=[Le(ws()),ze`
      :host {
        display: contents;
      }
    `];te([a({type:String})],kt.prototype,"source",2);te([a({type:String,attribute:"active-theme"})],kt.prototype,"activeTheme",2);te([Q()],kt.prototype,"theme",2);te([Q()],kt.prototype,"isLoading",2);te([Q()],kt.prototype,"isReady",2);kt=te([z("tarmac-theme-provider")],kt);function ws(){return`:host {
${Object.entries(ts).map(([i,t])=>`  ${i}: ${t};`).join(`
`)}
}`}function E(i){var e;let t=i;for(;t;){if(t instanceof HTMLElement&&t.tagName==="TARMAC-THEME-PROVIDER")return((e=t.getTheme)==null?void 0:e.call(t))??{};t instanceof HTMLElement&&t.assignedSlot?t=t.assignedSlot:t.host?t=t.host:t=t.parentNode}return{}}function B(i,t){const e=s=>{const o=s.detail;o!=null&&o.theme&&t(o.theme)};return window.addEventListener(He,e),()=>{window.removeEventListener(He,e)}}function Ss(i,t,e){var s,o;return(o=(s=i.styles)==null?void 0:s[t])!=null&&o[e]?i.styles[t][e]:i.variants[e]||{}}function zs(i,t,e){let s;return t==="secondary"&&i.states.disabledSecondary?s=i.states.disabledSecondary:t==="tertiary"&&i.states.disabledTertiary?s=i.states.disabledTertiary:s=i.states.disabled||{},{backgroundColor:e.disabledBackgroundColor||s.backgroundColor,textColor:e.disabledTextColor||s.textColor,borderColor:e.disabledBorderColor||s.borderColor,cursor:s.cursor}}function Es(i){var ie,re,ne,ae,le,Ge,Ve,Ie,Ke,Xe;const{buttonConfig:t,variant:e,size:s,buttonStyle:o,buttonType:n,isRounded:r,isLoading:c,backgroundColor:l,borderColor:d,hoverColor:b,textColor:p,radius:g,border:u}=i,x=Ss(t,o,e),y=zs(t,o,x),v=t.states.ghost||{},m=o==="secondary"||e==="outline"||!!x.borderColor,C=n==="iconButton",k=(ie=t.sizes[s])==null?void 0:ie.iconButtonSize;let w;C&&k?w=((re=t.sizes[s])==null?void 0:re.iconButtonPadding)||"0":w=((ne=t.sizes[s])==null?void 0:ne.padding)||(s==="sm"?"0.375rem 0.75rem":s==="md"?"0.5rem 1rem":"0.625rem 1.25rem");const T=((ae=t.sizes[s])==null?void 0:ae.fontSize)||(s==="sm"?"0.875rem":s==="md"?"1rem":"1.125rem"),$=r?((le=t.base.radius)==null?void 0:le.rounded)||"9999px":g||((Ge=t.base.radius)==null?void 0:Ge.default)||"0.375rem",D=l||x.backgroundColor||"#3B82F6",O=p||x.textColor||"white";let S,X="solid",Y;m?(S="1px",Y=d||x.borderColor||"transparent"):(S=u||d?"1px":"0",Y=d||"transparent");const vt=b||x.hoverColor||x.backgroundColor||D,Mt=x.hoverTextColor||x.textColor||O,qt=m&&x.hoverBorderColor?x.hoverBorderColor:Y,Gt=x.pressedColor||x.hoverColor||x.backgroundColor||D,Vt=x.pressedTextColor||x.hoverTextColor||x.textColor||O,Ot=x.focusRingColor?`0 0 0 2px ${x.focusRingColor}`:((Ve=t.base.focus)==null?void 0:Ve.ring)||"0 0 0 2px rgba(0, 0, 0, 0.4)",$e=(Ie=t.states.loading)!=null&&Ie.opacity?Number(t.states.loading.opacity):.8;return`
    :host {
      display: inline-block;
    }

    .tarmac-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-family: ${((Ke=t.base.fontFamily)==null?void 0:Ke.replace("font-",""))||"sans-serif"};
      font-weight: ${Number(((Xe=t.base.fontWeight)==null?void 0:Xe.replace("font-",""))||500)};
      transition: all 0.15s ease-in-out;
      outline: none;
      cursor: pointer;
      padding: ${w};
      font-size: ${T};
      border-radius: ${$};
      background-color: ${D};
      color: ${O};
      border-width: ${S};
      border-style: ${X};
      border-color: ${Y};
      ${C&&k?`width: ${k}; height: ${k};`:""}
      ${c?`opacity: ${$e}; pointer-events: none;`:""}
    }

    .tarmac-btn:hover:not(:disabled):not(.ghost) {
      background-color: ${vt};
      color: ${Mt};
      border-color: ${qt};
    }

    .tarmac-btn:active:not(:disabled):not(.ghost) {
      background-color: ${Gt};
      color: ${Vt};
    }

    .tarmac-btn:focus {
      box-shadow: ${Ot};
      outline: none;
    }

    .tarmac-btn:disabled,
    .tarmac-btn.disabled {
      cursor: ${y.cursor||"not-allowed"};
      background-color: ${y.backgroundColor||"#E5E7EB"};
      color: ${y.textColor||"#9CA3AF"};
      border-color: ${y.borderColor||"transparent"};
    }

    .tarmac-btn.ghost {
      background-color: ${v.backgroundColor||"#dedede"};
      color: ${v.textColor||"transparent"};
      border-color: ${v.borderColor||"transparent"};
      cursor: ${v.cursor||"default"};
      pointer-events: none;
    }
  `}function lo(i,t,e,s){var r,c;const o=((r=i.sizes[t])==null?void 0:r.iconSize)||(t==="sm"?"1rem":t==="md"?"1.25rem":"1.5rem"),n=((c=i.sizes[t])==null?void 0:c.gap)||(t==="sm"?"0.375rem":t==="md"?"0.5rem":"0.625rem");return`
    .icon-${e} {
      width: ${o};
      height: ${o};
      display: inline-flex;
      align-items: center;
      justify-content: center;
      ${s&&e==="left"?`margin-right: ${n};`:""}
      ${s&&e==="right"?`margin-left: ${n};`:""}
    }

    .icon-${e} ::slotted(svg),
    .icon-${e} svg {
      width: ${o};
      height: ${o};
    }
  `}const Bs=`
  @keyframes tarmac-spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .tarmac-spinner {
    display: inline-block;
    border: 2px solid currentColor;
    border-top-color: transparent;
    border-radius: 50%;
    animation: tarmac-spin 1s linear infinite;
    margin-right: 0.5rem;
  }

  .tarmac-spinner--sm {
    width: 14px;
    height: 14px;
  }

  .tarmac-spinner--md {
    width: 16px;
    height: 16px;
  }

  .tarmac-spinner--lg {
    width: 20px;
    height: 20px;
  }
`,j={primary:{main:"#3B82F6",dark:"#1D4ED8",contrast:"#FFFFFF"},secondary:{main:"#6B7280",dark:"#374151",contrast:"#FFFFFF"}},co={base:{fontFamily:"sans-serif",fontWeight:"500",focus:{ring:"0 0 0 3px rgba(59, 130, 246, 0.5)"},radius:{default:"0.375rem",rounded:"9999px"}},variants:{primary:{backgroundColor:j.primary.main,textColor:j.primary.contrast,borderColor:j.primary.main,hoverColor:j.primary.dark,focusRingColor:j.primary.main},secondary:{backgroundColor:j.secondary.main,textColor:j.secondary.contrast,borderColor:j.secondary.main,hoverColor:j.secondary.dark,focusRingColor:j.secondary.main},outline:{backgroundColor:"transparent",textColor:j.primary.main,borderColor:j.primary.main,hoverColor:j.primary.main,hoverTextColor:j.primary.contrast,focusRingColor:j.primary.main}},sizes:{sm:{padding:"0.375rem 0.75rem",fontSize:"0.875rem",iconSize:"1rem",gap:"0.375rem"},md:{padding:"0.5rem 1rem",fontSize:"1rem",iconSize:"1.25rem",gap:"0.5rem"},lg:{padding:"0.75rem 1.5rem",fontSize:"1.125rem",iconSize:"1.5rem",gap:"0.625rem"}},states:{disabled:{backgroundColor:"#E0E0E0",textColor:"#9E9E9E",cursor:"not-allowed"},loading:{opacity:"0.7",cursor:"wait"}}};var Ts=Object.defineProperty,Ds=Object.getOwnPropertyDescriptor,P=(i,t,e,s)=>{for(var o=s>1?void 0:s?Ds(t,e):t,n=i.length-1,r;n>=0;n--)(r=i[n])&&(o=(s?r(t,e,o):r(o))||o);return s&&o&&Ts(t,e,o),o};let F=class extends _{constructor(){super(...arguments),this.variant="primary",this.size="md",this.buttonStyle="primary",this.buttonType="button",this.isLoading=!1,this.disabled=!1,this.isRounded=!1,this.isGhost=!1,this.text="",this._buttonConfig=co}connectedCallback(){super.connectedCallback(),this._resolveTheme(),this._unsubscribeTheme=B(this,()=>{this._resolveTheme(),this.requestUpdate()})}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._unsubscribeTheme)==null||t.call(this)}_resolveTheme(){var e;const t=E(this);this._buttonConfig=((e=t==null?void 0:t.components)==null?void 0:e.button)||co}createRenderRoot(){return this.attachShadow({mode:"open"})}render(){const t=this._hasSlottedContent("leading-icon");this._hasSlottedContent("trailing-icon");const e=!!this.text||this._hasSlottedContent("default"),s=this.buttonType==="iconButton",o=Es({buttonConfig:this._buttonConfig,variant:this.variant,size:this.size,buttonStyle:this.buttonStyle,buttonType:this.buttonType,isRounded:this.isRounded,isLoading:this.isLoading,backgroundColor:this.backgroundColor,borderColor:this.borderColor,hoverColor:this.hoverColor,textColor:this.textColor,radius:this.radius,border:this.border}),n=lo(this._buttonConfig,this.size,"left",e),r=lo(this._buttonConfig,this.size,"right",e),c=this.isGhost?"ghost":"",l=this.size==="lg"?"tarmac-spinner--lg":this.size==="sm"?"tarmac-spinner--sm":"tarmac-spinner--md";return h`
      <style>
        ${o}
        ${n}
        ${r}
        ${Bs}
      </style>
      <button
        class="tarmac-btn ${c}"
        ?disabled=${this.disabled||this.isLoading}
        @click=${this._handleClick}
      >
        ${this.isLoading?h`
              <span class="tarmac-spinner ${l}"></span>
              ${this.text||h`<slot></slot>`}
            `:s?h`
                <span class="icon-left">
                  <slot name="leading-icon"></slot>
                  ${t?"":h`<slot></slot>`}
                </span>
              `:h`
                <span class="icon-left"><slot name="leading-icon"></slot></span>
                ${this.text||h`<slot></slot>`}
                <span class="icon-right"><slot name="trailing-icon"></slot></span>
              `}
      </button>
    `}_handleClick(t){if(this.disabled||this.isLoading){t.preventDefault(),t.stopPropagation();return}this.dispatchEvent(new CustomEvent("tarmac-click",{bubbles:!0,composed:!0,detail:{originalEvent:t}}))}_hasSlottedContent(t){var s,o,n;if(t==="default"){const r=(s=this.shadowRoot)==null?void 0:s.querySelector("slot:not([name])");return r?r.assignedNodes({flatten:!0}).length>0:!!((o=this.textContent)!=null&&o.trim())}const e=(n=this.shadowRoot)==null?void 0:n.querySelector(`slot[name="${t}"]`);return e?e.assignedNodes({flatten:!0}).length>0:!1}};P([a({type:String})],F.prototype,"variant",2);P([a({type:String})],F.prototype,"size",2);P([a({type:String,attribute:"button-style"})],F.prototype,"buttonStyle",2);P([a({type:String,attribute:"button-type"})],F.prototype,"buttonType",2);P([a({type:Boolean,attribute:"is-loading"})],F.prototype,"isLoading",2);P([a({type:Boolean})],F.prototype,"disabled",2);P([a({type:Boolean,attribute:"is-rounded"})],F.prototype,"isRounded",2);P([a({type:Boolean,attribute:"is-ghost"})],F.prototype,"isGhost",2);P([a({type:String})],F.prototype,"text",2);P([a({type:String,attribute:"background-color"})],F.prototype,"backgroundColor",2);P([a({type:String,attribute:"border-color"})],F.prototype,"borderColor",2);P([a({type:String,attribute:"text-color"})],F.prototype,"textColor",2);P([a({type:String,attribute:"hover-color"})],F.prototype,"hoverColor",2);P([a({type:String})],F.prototype,"radius",2);P([a({type:String})],F.prototype,"border",2);F=P([z("tarmac-button")],F);function Os(i,t){var e;return((e=i.variants)==null?void 0:e[t])||{}}function Fs(i,t){var e;return((e=i.sizes)==null?void 0:e[t])||{}}function As(i){const{alertConfig:t,variant:e,size:s}=i,o=t.base||{},n=Os(t,e),r=Fs(t,s),c=o.fontFamily||"Noto Sans, sans-serif",l=o.captionFontFamily||c;return`
    :host {
      display: block;
      width: 100%;
    }

    /* ── Container ─────────────────────────────────────── */
    .alert-container {
      display: flex;
      align-items: flex-start;
      gap: 0;
      width: 100%;
      padding: ${r.padding||"12px"};
      border-radius: ${o.borderRadius||"4px"};
      box-shadow: ${o.shadow||"0px 0px 4px 0px rgba(0,0,0,0.1)"};
      background-color: ${n.backgroundColor||"#ffffff"};
      font-family: ${c};
      transition: ${o.transition||"all 0.15s ease-in-out"};
      box-sizing: border-box;
      position: relative;
    }

    /* ── Inner column ──────────────────────────────────── */
    .alert-inner {
      display: flex;
      flex-direction: column;
      gap: ${r.contentGap||"8px"};
      flex: 1 1 0%;
      align-items: flex-start;
      min-width: 0;
      min-height: 1px;
    }

    /* ── Row (icon + text + trailing) ──────────────────── */
    .alert-row {
      display: flex;
      align-items: flex-start;
      gap: ${r.iconGap||"10px"};
      width: 100%;
    }

    /* ── Text column ───────────────────────────────────── */
    .alert-text-col {
      display: flex;
      flex-direction: column;
      gap: ${r.contentGap||"8px"};
      flex: 1 1 0%;
      align-items: flex-start;
      min-width: 0;
      min-height: 1px;
    }

    /* ── Text block (title + description) ──────────────── */
    .alert-text-block {
      display: flex;
      flex-direction: column;
      gap: ${r.textGap||"4px"};
      align-items: flex-start;
      width: 100%;
    }

    /* ── Title ─────────────────────────────────────────── */
    .alert-title {
      font-family: ${c};
      font-weight: ${r.titleFontWeight?Number(r.titleFontWeight):s==="sm"?500:400};
      font-size: ${r.titleFontSize||"16px"};
      line-height: ${r.titleLineHeight||"24px"};
      color: ${n.titleColor||"#121212"};
      margin: 0;
      width: 100%;
    }

    /* ── Description ───────────────────────────────────── */
    .alert-description {
      font-family: ${s==="sm"?l:c};
      font-weight: 400;
      font-size: ${r.descriptionFontSize||"14px"};
      line-height: ${r.descriptionLineHeight||"20px"};
      color: ${n.descriptionColor||"#3b3b3b"};
      margin: 0;
      width: 100%;
    }

    /* ── Single text ───────────────────────────────────── */
    .alert-single-text {
      font-family: ${c};
      font-weight: 400;
      font-size: ${r.singleTextFontSize||r.titleFontSize||"16px"};
      line-height: ${r.singleTextLineHeight||r.titleLineHeight||"24px"};
      color: ${n.singleTextColor||n.descriptionColor||"#2b2b2b"};
      margin: 0;
      width: 100%;
    }

    /* ── Icon wrapper ──────────────────────────────────── */
    .alert-icon-wrap {
      display: flex;
      align-items: center;
      flex-shrink: 0;
      color: ${n.iconColor||"#2b2b2b"};
    }
    .alert-icon-wrap ::slotted(*),
    .alert-icon-wrap svg {
      width: ${r.iconSize||"24px"};
      height: ${r.iconSize||"24px"};
    }

    /* ── CTAs row ──────────────────────────────────────── */
    .alert-ctas {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 8px;
      width: 100%;
    }

    /* ── Close button ──────────────────────────────────── */
    .alert-close-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      padding: 4px;
      border: none;
      background: none;
      cursor: pointer;
      color: ${n.iconColor||"#2b2b2b"};
      opacity: 0.6;
      transition: opacity 0.15s;
    }
    .alert-close-btn:hover {
      opacity: 1;
    }
  `}function Ps(i,t,e,s){var c,l;const o=i.base||{},n=((c=i.variants)==null?void 0:c[t])||{},r=((l=i.sizes)==null?void 0:l[e])||{};return`
    :host { display: block; width: 100%; }

    .alert-container {
      position: relative;
      width: 100%;
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
      font-family: ${o.fontFamily||"sans-serif"};
      font-weight: ${o.fontWeight||500};
      transition: ${o.transition||"all 0.15s ease-in-out"};
      border-radius: ${o.radius||"0.5rem"};
      border: 1px solid;
      padding: ${r.padding||"1rem"};
      font-size: ${r.fontSize||"1rem"};
      background-color: ${s.backgroundColor||n.backgroundColor||"#FFFFFF"};
      color: ${s.textColor||n.textColor||"#111827"};
      border-color: ${s.borderColor||n.borderColor||"#E5E7EB"};
      box-sizing: border-box;
    }

    .alert-icon-wrap {
      flex-shrink: 0;
      width: ${r.iconSize||"1.25rem"};
      height: ${r.iconSize||"1.25rem"};
      color: ${s.iconColor||n.iconColor||"#6B7280"};
    }

    .alert-content { flex: 1 1 0%; }

    .alert-title {
      margin: 0;
      font-weight: 600;
      line-height: 1.2;
    }

    .alert-description {
      margin: 0;
      line-height: 1.5;
      color: ${n.textColor||"#111827"};
      opacity: 0.9;
    }

    .alert-close-btn {
      position: absolute;
      top: 0.75rem;
      right: 0.75rem;
      padding: 0.25rem;
      color: ${n.textColor||"#111827"};
      opacity: 0.5;
      cursor: pointer;
      transition: opacity 0.15s;
      border: none;
      background: none;
      outline: none;
    }
    .alert-close-btn:hover { opacity: 0.75; }
  `}const po={base:{fontFamily:"sans-serif",fontWeight:"500",transition:"all 0.15s ease-in-out",radius:"0.5rem",padding:"1rem"},variants:{default:{backgroundColor:"#FFFFFF",textColor:"#111827",borderColor:"#E5E7EB",iconColor:"#6B7280"},primary:{backgroundColor:"#93C5FD20",textColor:"#1D4ED8",borderColor:"#93C5FD",iconColor:"#3B82F6"},destructive:{backgroundColor:"#FCA5A520",textColor:"#B91C1C",borderColor:"#FCA5A5",iconColor:"#EF4444"},success:{backgroundColor:"#A7F3D020",textColor:"#047857",borderColor:"#A7F3D0",iconColor:"#10B981"},warning:{backgroundColor:"#FCD34D20",textColor:"#B45309",borderColor:"#FCD34D",iconColor:"#F59E0B"},info:{backgroundColor:"#93C5FD20",textColor:"#1D4ED8",borderColor:"#93C5FD",iconColor:"#3B82F6"}},sizes:{sm:{padding:"0.5rem 1rem",fontSize:"0.875rem",iconSize:"1rem"},md:{padding:"1rem",fontSize:"1rem",iconSize:"1.25rem"},lg:{padding:"1.25rem",fontSize:"1.125rem",iconSize:"1.5rem"}}};var js=Object.defineProperty,Hs=Object.getOwnPropertyDescriptor,W=(i,t,e,s)=>{for(var o=s>1?void 0:s?Hs(t,e):t,n=i.length-1,r;n>=0;n--)(r=i[n])&&(o=(s?r(t,e,o):r(o))||o);return s&&o&&js(t,e,o),o};const Ns=new Set(["white","black","coal","success","error","info","warning"]);let H=class extends _{constructor(){super(...arguments),this.variant="default",this.size="md",this.title="",this.description="",this.closable=!1,this.alertStyle="singleText",this.showCtas=!1,this.cancelText="Cancel",this.proceedText="Proceed",this._alertConfig={},this._legacyConfig=po}connectedCallback(){super.connectedCallback(),this._resolveTheme(),this._unsubscribeTheme=B(this,()=>{this._resolveTheme(),this.requestUpdate()})}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._unsubscribeTheme)==null||t.call(this)}_resolveTheme(){var e,s;const t=E(this);this._alertConfig=((e=t==null?void 0:t.components)==null?void 0:e.alerts)||{},this._legacyConfig=((s=t==null?void 0:t.components)==null?void 0:s.alert)||po}render(){return Ns.has(this.variant)?this._renderTarmac():this._renderLegacy()}_renderTarmac(){const t=this.size==="sm"?"sm":"lg",e={alertConfig:this._alertConfig,variant:this.variant,size:t},s=As(e),o=this.alertStyle==="singleText",n=this.closable;return h`
      <style>${s}</style>
      <div class="alert-container" role="alert">
        <div class="alert-inner">
          <div class="alert-row">
            <div class="alert-icon-wrap">
              <slot name="leading-icon"></slot>
            </div>
            <div class="alert-text-col">
              ${o?this.title||this.description?h`<div class="alert-single-text">${this.title||this.description}</div>`:f:h`
                    <div class="alert-text-block">
                      ${this.title?h`<div class="alert-title">${this.title}</div>`:f}
                      ${this.description?h`<div class="alert-description">${this.description}</div>`:f}
                    </div>
                  `}
              <slot></slot>
            </div>
            ${n?h`
                  <button
                    type="button"
                    class="alert-close-btn"
                    aria-label="Close alert"
                    @click=${this._handleClose}
                  >
                    <slot name="trailing-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                        fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </slot>
                  </button>
                `:h`
                  <div class="alert-icon-wrap">
                    <slot name="trailing-icon"></slot>
                  </div>
                `}
          </div>
          ${this.showCtas?h`
                <div class="alert-ctas">
                  <slot name="cta-actions">
                    <tarmac-button
                      button-style="tertiary"
                      variant="black"
                      size=${t==="sm"?"sm":"md"}
                      text=${this.cancelText}
                      @tarmac-click=${this._handleCancel}
                    ></tarmac-button>
                    <tarmac-button
                      button-style="primary"
                      variant="black"
                      size=${t==="sm"?"sm":"md"}
                      text=${this.proceedText}
                      @tarmac-click=${this._handleProceed}
                    ></tarmac-button>
                  </slot>
                </div>
              `:f}
        </div>
      </div>
    `}_renderLegacy(){const t=Ps(this._legacyConfig,this.variant,this.size,{backgroundColor:this.backgroundColor,borderColor:this.borderColor,textColor:this.textColor,iconColor:this.iconColor});return h`
      <style>${t}</style>
      <div class="alert-container" role="alert">
        <span class="alert-icon-wrap">
          <slot name="icon"></slot>
        </span>
        <div class="alert-content">
          ${this.title?h`<h5 class="alert-title">${this.title}</h5>`:f}
          ${this.description?h`<div class="alert-description">${this.description}</div>`:f}
          <slot></slot>
        </div>
        ${this.closable?h`
              <button type="button" class="alert-close-btn" aria-label="Close alert" @click=${this._handleClose}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            `:f}
      </div>
    `}_handleClose(){this.dispatchEvent(new CustomEvent("tarmac-close",{bubbles:!0,composed:!0}))}_handleCancel(){this.dispatchEvent(new CustomEvent("tarmac-cancel",{bubbles:!0,composed:!0}))}_handleProceed(){this.dispatchEvent(new CustomEvent("tarmac-proceed",{bubbles:!0,composed:!0}))}};W([a({type:String})],H.prototype,"variant",2);W([a({type:String})],H.prototype,"size",2);W([a({type:String})],H.prototype,"title",2);W([a({type:String})],H.prototype,"description",2);W([a({type:Boolean})],H.prototype,"closable",2);W([a({type:String,attribute:"alert-style"})],H.prototype,"alertStyle",2);W([a({type:Boolean,attribute:"show-ctas"})],H.prototype,"showCtas",2);W([a({type:String,attribute:"cancel-text"})],H.prototype,"cancelText",2);W([a({type:String,attribute:"proceed-text"})],H.prototype,"proceedText",2);W([a({type:String,attribute:"background-color"})],H.prototype,"backgroundColor",2);W([a({type:String,attribute:"border-color"})],H.prototype,"borderColor",2);W([a({type:String,attribute:"text-color"})],H.prototype,"textColor",2);W([a({type:String,attribute:"icon-color"})],H.prototype,"iconColor",2);H=W([z("tarmac-alert")],H);function Rs(i,t,e){var s,o;return(o=(s=i.types)==null?void 0:s[t])!=null&&o[e]?i.types[t][e]:i.variants[e]||{}}function Ls(i,t){return t==="outlined"&&i.states.disabledOutlined?i.states.disabledOutlined:i.states.disabled||{}}function Us(i){const{badgeConfig:t,variant:e,size:s,badgeType:o,isDisabled:n,isGhost:r}=i,c=t.sizes[s]||{},l=t.base.fontFamily||"sans-serif",d=Number(t.base.fontWeight||500),b=t.base.borderRadius||"4px",p=c.iconSize||"12px";let g,u,x,y,v="";if(r){const m=t.states.ghost||{};g=m.backgroundColor||"#e6e6e6",u=m.textColor||"transparent",x="0.5px",y=m.borderColor||"transparent",v="pointer-events: none;"}else if(n){const m=Ls(t,o);g=m.backgroundColor||"#e6e6e6",u=m.textColor||"#cdcbcb",x="0.5px",y=m.borderColor||"transparent",v="cursor: default;"}else{const m=Rs(t,o,e);g=m.backgroundColor||"#e6e6e6",u=m.textColor||"#2b2b2b",x=m.borderColor?"0.5px":"0",y=m.borderColor||"transparent"}return`
    :host {
      display: inline-block;
    }

    .tarmac-badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-family: ${l};
      font-weight: ${d};
      border-radius: ${b};
      padding: ${c.padding||"6px"};
      font-size: ${c.fontSize||"12px"};
      line-height: ${c.lineHeight||"16px"};
      gap: ${c.gap||"2px"};
      user-select: none;
      background-color: ${g};
      color: ${u};
      border-width: ${x};
      border-style: solid;
      border-color: ${y};
      ${v}
    }

    .badge-icon {
      width: ${p};
      height: ${p};
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .badge-icon ::slotted(svg),
    .badge-icon svg {
      width: ${p};
      height: ${p};
    }

    .status-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      flex-shrink: 0;
    }
  `}function Ws(i){var r,c,l,d,b;const{badgeConfig:t,variant:e,badgeType:s,isDisabled:o,isGhost:n}=i;return n?"transparent":o?((c=(r=t.states)==null?void 0:r.disabled)==null?void 0:c.textColor)||"#cdcbcb":(((d=(l=t.types)==null?void 0:l[s])==null?void 0:d[e])||((b=t.variants)==null?void 0:b[e])||{}).textColor||"#2b2b2b"}const ho={base:{fontFamily:"Noto Sans, sans-serif",fontWeight:"500",borderRadius:"4px"},types:{},variants:{black:{backgroundColor:"#000000",textColor:"#e6e6e6"},white:{backgroundColor:"#ffffff",textColor:"#2b2b2b",borderColor:"#e6e6e6"},coal:{backgroundColor:"#64739b",textColor:"#f2f2f2"},dlv_red:{backgroundColor:"#ed1b36",textColor:"#e6e6e6"},info:{backgroundColor:"#2396fb",textColor:"#e6e6e6"},success:{backgroundColor:"#1ba86e",textColor:"#e6e6e6"},warning:{backgroundColor:"#f5c828",textColor:"#7b6414"},error:{backgroundColor:"#dc143c",textColor:"#e6e6e6"},cardbox:{backgroundColor:"#b88b5c",textColor:"#e6e6e6"}},sizes:{sm:{padding:"2px 4px",fontSize:"10px",lineHeight:"12px",iconSize:"12px",gap:"2px"},md:{padding:"2px 6px",fontSize:"12px",lineHeight:"16px",iconSize:"12px",gap:"2px"},lg:{padding:"2px 6px",fontSize:"12px",lineHeight:"16px",iconSize:"16px",gap:"2px"}},states:{disabled:{backgroundColor:"#e6e6e6",textColor:"#cdcbcb",borderColor:"transparent"},disabledOutlined:{backgroundColor:"transparent",textColor:"#cdcbcb",borderColor:"#ededed"},ghost:{backgroundColor:"#e6e6e6",textColor:"transparent",borderColor:"transparent"}}};var Ms=Object.defineProperty,qs=Object.getOwnPropertyDescriptor,wt=(i,t,e,s)=>{for(var o=s>1?void 0:s?qs(t,e):t,n=i.length-1,r;n>=0;n--)(r=i[n])&&(o=(s?r(t,e,o):r(o))||o);return s&&o&&Ms(t,e,o),o};let at=class extends _{constructor(){super(...arguments),this.variant="black",this.size="md",this.badgeType="solid",this.text="",this.showStatus=!1,this.isDisabled=!1,this.isGhost=!1,this._badgeConfig=ho}connectedCallback(){super.connectedCallback(),this._resolveTheme(),this._unsubscribeTheme=B(this,()=>{this._resolveTheme(),this.requestUpdate()})}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._unsubscribeTheme)==null||t.call(this)}_resolveTheme(){var e;const t=E(this);this._badgeConfig=((e=t==null?void 0:t.components)==null?void 0:e.badge)||ho}render(){const t={badgeConfig:this._badgeConfig,variant:this.variant,size:this.size,badgeType:this.badgeType,isDisabled:this.isDisabled,isGhost:this.isGhost},e=Us(t),s=this.showStatus?Ws(t):"";return h`
      <style>${e}</style>
      <span class="tarmac-badge">
        ${this.showStatus?h`<span class="status-dot" style="background-color: ${s}"></span>`:f}
        <span class="badge-icon"><slot name="leading-icon"></slot></span>
        ${this.text||h`<slot></slot>`}
        <span class="badge-icon"><slot name="trailing-icon"></slot></span>
      </span>
    `}};wt([a({type:String})],at.prototype,"variant",2);wt([a({type:String})],at.prototype,"size",2);wt([a({type:String,attribute:"badge-type"})],at.prototype,"badgeType",2);wt([a({type:String})],at.prototype,"text",2);wt([a({type:Boolean,attribute:"show-status"})],at.prototype,"showStatus",2);wt([a({type:Boolean,attribute:"is-disabled"})],at.prototype,"isDisabled",2);wt([a({type:Boolean,attribute:"is-ghost"})],at.prototype,"isGhost",2);at=wt([z("tarmac-badge")],at);var Gs=Object.defineProperty,Vs=Object.getOwnPropertyDescriptor,Lt=(i,t,e,s)=>{for(var o=s>1?void 0:s?Vs(t,e):t,n=i.length-1,r;n>=0;n--)(r=i[n])&&(o=(s?r(t,e,o):r(o))||o);return s&&o&&Gs(t,e,o),o};const bo={sizes:{sm:{size:"16px",strokeWidth:3},md:{size:"24px",strokeWidth:4},lg:{size:"32px",strokeWidth:4}},variants:{default:{color:"#4B5563",trackColor:"#E5E7EB"},primary:{color:"#2563EB",trackColor:"#DBEAFE"},secondary:{color:"#4B5563",trackColor:"#E5E7EB"},success:{color:"#059669",trackColor:"#D1FAE5"},error:{color:"#DC2626",trackColor:"#FEE2E2"},warning:{color:"#D97706",trackColor:"#FEF3C7"},info:{color:"#2563EB",trackColor:"#DBEAFE"}}};let lt=class extends _{constructor(){super(...arguments),this.size="md",this.variant="default",this.tarmacSize="24px",this._spinnerConfig=bo}connectedCallback(){super.connectedCallback(),this._resolveTheme(),this._unsubscribeTheme=B(this,()=>{this._resolveTheme(),this.requestUpdate()})}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._unsubscribeTheme)==null||t.call(this)}_resolveTheme(){var e;const t=E(this);this._spinnerConfig=((e=t==null?void 0:t.components)==null?void 0:e.spinner)||bo}render(){var l,d,b,p,g;const t=this._spinnerConfig;if(this.tarmacVariant){const u=((l=t.variants)==null?void 0:l[this.tarmacVariant])||{},x=((d=t.sizes)==null?void 0:d[this.tarmacSize])||{},y=this.color||u.color||"#000000",v=this.trackColor||u.trackColor||"#d4d4d4",m=x.size||this.tarmacSize,C=x.strokeWidth||3;return h`
        <div class="spinner-wrap" role="status" style="width:${m};height:${m}">
          <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="${v}" stroke-width="${C}" opacity="0.3"/>
            <path d="M12 2C6.47715 2 2 6.47715 2 12" stroke="${y}" stroke-width="${C}" stroke-linecap="round"/>
          </svg>
          <span class="sr-only">Loading...</span>
        </div>
      `}const e=((b=t.variants)==null?void 0:b[this.variant])||((p=t.variants)==null?void 0:p.default)||{},s=((g=t.sizes)==null?void 0:g[this.size])||{},o=this.color||e.color||"#3B82F6",n=this.trackColor||e.trackColor||"#E5E7EB",r=s.strokeWidth||2,c={sm:"16px",md:"24px",lg:"32px"}[this.size]||"24px";return h`
      <div class="spinner-wrap" role="status" style="width:${c};height:${c}">
        <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" stroke="${n}" stroke-width="${r}" opacity="0.3"/>
          <path d="M12 2C6.47715 2 2 6.47715 2 12" stroke="${o}" stroke-width="${r}" stroke-linecap="round"/>
        </svg>
        <span class="sr-only">Loading...</span>
      </div>
    `}};lt.styles=ze`
    :host { display: inline-block; }

    .spinner-wrap {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0,0,0,0);
      white-space: nowrap;
      border-width: 0;
    }
  `;Lt([a({type:String})],lt.prototype,"size",2);Lt([a({type:String})],lt.prototype,"variant",2);Lt([a({type:String,attribute:"tarmac-variant"})],lt.prototype,"tarmacVariant",2);Lt([a({type:String,attribute:"tarmac-size"})],lt.prototype,"tarmacSize",2);Lt([a({type:String})],lt.prototype,"color",2);Lt([a({type:String,attribute:"track-color"})],lt.prototype,"trackColor",2);lt=Lt([z("tarmac-spinner")],lt);function Is(i,t,e){var s,o;return((o=(s=i.variants)==null?void 0:s[t])==null?void 0:o[e])||{}}function Ks(i,t){return t==="outlined"&&i.states.disabledOutlined?i.states.disabledOutlined:i.states.disabled||{}}function Xs(i){var T;const{chipConfig:t,chipType:e,chipVariant:s,size:o,isDisabled:n,isGhost:r}=i,c=t.sizes[o]||{},l=t.base.fontFamily||"sans-serif",d=Number(t.base.fontWeight||500),b=t.base.borderRadius||"8px",p=t.base.transition||"all 0.15s ease-in-out",g=c.iconSize||"12px";let u,x,y,v,m="",C="",k="",w="";if(r){const $=t.states.ghost||{};u=$.backgroundColor||"#e6e6e6",x=$.textColor||"transparent",y="0.5px",v=$.borderColor||"transparent",m="cursor: default; pointer-events: none;"}else if(n){const $=Ks(t,s);u=$.backgroundColor||"#e6e6e6",x=$.textColor||"#cdcbcb",y="0.5px",v=$.borderColor||"transparent",m="cursor: default;"}else{const $=Is(t,s,e),D=s==="outlined"||!!$.borderColor;u=$.backgroundColor||"#e6e6e6",x=$.textColor||"#2b2b2b",y=D?"0.5px":"0",v=$.borderColor||"transparent";const O=$.hoverColor||$.backgroundColor||"#d6d6d6",S=$.hoverTextColor||$.textColor||"#2b2b2b",X=D&&$.hoverBorderColor?`border-color: ${$.hoverBorderColor};`:"";C=`
      .tarmac-chip:hover {
        cursor: pointer;
        background-color: ${O};
        color: ${S};
        ${X}
      }
    `;const Y=$.pressedColor||$.hoverColor||$.backgroundColor||"#cccccc",vt=$.pressedTextColor||$.hoverTextColor||$.textColor||"#2b2b2b";k=`
      .tarmac-chip:active {
        background-color: ${Y};
        color: ${vt};
      }
    `,w=`
      .tarmac-chip:focus {
        box-shadow: ${$.focusRingColor?`0 0 0 2px ${$.focusRingColor}`:((T=t.base.focus)==null?void 0:T.ring)||"0 0 0 2px rgba(0, 0, 0, 0.4)"};
        outline: none;
      }
    `}return`
    :host { display: inline-block; }

    .tarmac-chip {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-family: ${l};
      font-weight: ${d};
      border-radius: ${b};
      transition: ${p};
      padding: ${c.padding||"8px"};
      font-size: ${c.fontSize||"12px"};
      line-height: ${c.lineHeight||"16px"};
      gap: ${c.gap||"4px"};
      user-select: none;
      cursor: pointer;
      outline: none;
      background-color: ${u};
      color: ${x};
      border-width: ${y};
      border-style: solid;
      border-color: ${v};
      ${m}
    }

    ${C}
    ${k}
    ${w}

    .chip-icon {
      width: ${g};
      height: ${g};
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .chip-icon ::slotted(svg), .chip-icon svg {
      width: ${g};
      height: ${g};
    }

    .status-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      flex-shrink: 0;
    }
  `}function Ys(i){var r,c,l,d,b;const{chipConfig:t,chipType:e,chipVariant:s,isDisabled:o,isGhost:n}=i;return n?"transparent":o?((c=(r=t==null?void 0:t.states)==null?void 0:r.disabled)==null?void 0:c.textColor)||"#cdcbcb":((b=(d=(l=t==null?void 0:t.variants)==null?void 0:l[s])==null?void 0:d[e])==null?void 0:b.textColor)||"#2b2b2b"}const uo={base:{fontFamily:"Noto Sans, sans-serif",fontWeight:"500",borderRadius:"8px",transition:"all 0.15s ease-in-out",focus:{ring:"0 0 0 2px rgba(0,0,0,0.4)"}},variants:{standard:{black:{backgroundColor:"#000000",textColor:"#e6e6e6",hoverColor:"#121212",pressedColor:"#1a1a1a",focusRingColor:"rgba(0,0,0,0.4)"},white:{backgroundColor:"#ffffff",textColor:"#2b2b2b",hoverColor:"#f2f2f2",pressedColor:"#e6e6e6",focusRingColor:"rgba(255,255,255,0.4)"},coal:{backgroundColor:"#64739b",textColor:"#e6e6e6",hoverColor:"#4e5d80",pressedColor:"#5a6a90",focusRingColor:"rgba(0,0,0,0.4)"},blue:{backgroundColor:"#2396fb",textColor:"#e6e6e6",hoverColor:"#0d7de0",pressedColor:"#1a8af0",focusRingColor:"rgba(35,150,251,0.4)"},success:{backgroundColor:"#1ba86e",textColor:"#e6e6e6",hoverColor:"#148a5a",pressedColor:"#189960",focusRingColor:"rgba(27,168,110,0.4)"},error:{backgroundColor:"#dc143c",textColor:"#e6e6e6",hoverColor:"#b8102f",pressedColor:"#c41235",focusRingColor:"rgba(220,20,60,0.4)"},warning:{backgroundColor:"#f5c828",textColor:"#52430d",hoverColor:"#ddb420",pressedColor:"#e6bc24",focusRingColor:"rgba(245,200,40,0.4)"},legacy_blue:{backgroundColor:"#5b80f7",textColor:"#e6e6e6",hoverColor:"#4a6de0",pressedColor:"#5276f0",focusRingColor:"rgba(0,0,0,0.4)"},dlv_red:{backgroundColor:"#ed1b36",textColor:"#e6e6e6",hoverColor:"#d0162e",pressedColor:"#de1832",focusRingColor:"rgba(0,0,0,0.4)"}},outlined:{black:{backgroundColor:"transparent",textColor:"#2b2b2b",borderColor:"#2b2b2b",hoverColor:"#f2f2f2",hoverBorderColor:"#1a1a1a",pressedColor:"#f2f2f2",focusRingColor:"rgba(0,0,0,0.4)"},white:{backgroundColor:"transparent",textColor:"#e6e6e6",borderColor:"#e6e6e6",hoverColor:"rgba(255,255,255,0.1)",hoverBorderColor:"#cccccc",pressedColor:"rgba(255,255,255,0.1)",focusRingColor:"rgba(255,255,255,0.4)"},coal:{backgroundColor:"transparent",textColor:"#64739b",borderColor:"#64739b",hoverColor:"#f0f2f7",hoverBorderColor:"#4e5d80",pressedColor:"#f0f2f7",focusRingColor:"rgba(0,0,0,0.4)"},blue:{backgroundColor:"transparent",textColor:"#2396fb",borderColor:"#2396fb",hoverColor:"#eef6ff",hoverBorderColor:"#0d7de0",pressedColor:"#eef6ff",focusRingColor:"rgba(35,150,251,0.4)"},success:{backgroundColor:"transparent",textColor:"#1ba86e",borderColor:"#1ba86e",hoverColor:"#edfaf4",hoverBorderColor:"#148a5a",pressedColor:"#edfaf4",focusRingColor:"rgba(27,168,110,0.4)"},error:{backgroundColor:"transparent",textColor:"#dc143c",borderColor:"#dc143c",hoverColor:"#fef0f2",hoverBorderColor:"#b8102f",pressedColor:"#fef0f2",focusRingColor:"rgba(220,20,60,0.4)"},warning:{backgroundColor:"transparent",textColor:"#7b6414",borderColor:"#f5c828",hoverColor:"#fef9e6",hoverBorderColor:"#ddb420",pressedColor:"#fef9e6",focusRingColor:"rgba(245,200,40,0.4)"},legacy_blue:{backgroundColor:"transparent",textColor:"#5b80f7",borderColor:"#5b80f7",hoverColor:"#f0f3ff",hoverBorderColor:"#4a6de0",pressedColor:"#f0f3ff",focusRingColor:"rgba(0,0,0,0.4)"},dlv_red:{backgroundColor:"transparent",textColor:"#ed1b36",borderColor:"#ed1b36",hoverColor:"#fef0f2",hoverBorderColor:"#d0162e",pressedColor:"#fef0f2",focusRingColor:"rgba(0,0,0,0.4)"}}},sizes:{sm:{padding:"4px 6px",fontSize:"10px",lineHeight:"12px",iconSize:"12px",gap:"4px"},md:{padding:"4px 8px",fontSize:"12px",lineHeight:"16px",iconSize:"16px",gap:"4px"},lg:{padding:"6px 8px",fontSize:"14px",lineHeight:"20px",iconSize:"20px",gap:"4px"}},states:{disabled:{backgroundColor:"#e6e6e6",textColor:"#cdcbcb",borderColor:"transparent"},disabledOutlined:{backgroundColor:"transparent",textColor:"#cdcbcb",borderColor:"#ededed"},ghost:{backgroundColor:"#e6e6e6",textColor:"transparent",borderColor:"transparent"}}};var Js=Object.defineProperty,Zs=Object.getOwnPropertyDescriptor,ft=(i,t,e,s)=>{for(var o=s>1?void 0:s?Zs(t,e):t,n=i.length-1,r;n>=0;n--)(r=i[n])&&(o=(s?r(t,e,o):r(o))||o);return s&&o&&Js(t,e,o),o};let et=class extends _{constructor(){super(...arguments),this.chipType="black",this.chipVariant="standard",this.size="md",this.text="",this.statusLeft=!1,this.statusRight=!1,this.isDisabled=!1,this.isGhost=!1,this._chipConfig=uo}connectedCallback(){super.connectedCallback(),this._resolveTheme(),this._unsubscribeTheme=B(this,()=>{this._resolveTheme(),this.requestUpdate()})}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._unsubscribeTheme)==null||t.call(this)}_resolveTheme(){var e,s;const t=E(this);this._chipConfig=((e=t==null?void 0:t.components)==null?void 0:e.chip)||((s=t==null?void 0:t.components)==null?void 0:s.tag)||uo}render(){const t={chipConfig:this._chipConfig,chipType:this.chipType,chipVariant:this.chipVariant,size:this.size,isDisabled:this.isDisabled,isGhost:this.isGhost},e=Xs(t),s=Ys(t);return h`
      <style>${e}</style>
      <span
        class="tarmac-chip"
        tabindex=${this.isDisabled||this.isGhost?-1:0}
        role="button"
        aria-disabled=${this.isDisabled||f}
        @click=${this._handleClick}
        @keydown=${this._handleKeydown}
      >
        ${this.statusLeft?h`<span class="status-dot" style="background-color:${s}"></span>`:f}
        <span class="chip-icon"><slot name="leading-icon"></slot></span>
        ${this.text||h`<slot></slot>`}
        <span class="chip-icon"><slot name="trailing-icon"></slot></span>
        ${this.statusRight?h`<span class="status-dot" style="background-color:${s}"></span>`:f}
      </span>
    `}_handleClick(t){this.isDisabled||this.isGhost||this.dispatchEvent(new CustomEvent("tarmac-click",{bubbles:!0,composed:!0,detail:{originalEvent:t}}))}_handleKeydown(t){(t.key==="Enter"||t.key===" ")&&(t.preventDefault(),this._handleClick(t))}};ft([a({type:String,attribute:"chip-type"})],et.prototype,"chipType",2);ft([a({type:String,attribute:"chip-variant"})],et.prototype,"chipVariant",2);ft([a({type:String})],et.prototype,"size",2);ft([a({type:String})],et.prototype,"text",2);ft([a({type:Boolean,attribute:"status-left"})],et.prototype,"statusLeft",2);ft([a({type:Boolean,attribute:"status-right"})],et.prototype,"statusRight",2);ft([a({type:Boolean,attribute:"is-disabled"})],et.prototype,"isDisabled",2);ft([a({type:Boolean,attribute:"is-ghost"})],et.prototype,"isGhost",2);et=ft([z("tarmac-chip")],et);function Qs(i,t){var e;return((e=i.variants)==null?void 0:e[t])||{}}function ti(i,t){var e;return((e=i.sizes)==null?void 0:e[t])||{}}function ei(i){var Ot,$e,ie,re,ne,ae,le;const{config:t,variant:e,checkboxStyle:s,size:o,checked:n,indeterminate:r,disabled:c,hasLabel:l}=i,d=Qs(t,e),b=ti(t,o),p=t.base||{},g=((Ot=t.states)==null?void 0:Ot.disabled)||{},u=n||r,x=s==="rounded"?(($e=p.radius)==null?void 0:$e.rounded)||"999px":((ie=p.radius)==null?void 0:ie.box)||"2px",y=b.boxSize||"20px",v=b.borderWidth||p.borderWidth||"1px",m=b.checkedBorderWidth||v,C=u?m:v,k=c?g.borderColor||"#ededed":u?d.checkedBorderColor||d.checkedBackgroundColor||"#000":d.borderColor||"#e6e6e6",w=c&&u?g.borderColor||"#ededed":u?d.checkedBackgroundColor||"#000":d.backgroundColor||"#fff",T=u?d.checkedHoverBorderColor||d.checkedBorderColor||"#000":d.hoverBorderColor||"#ccc",$=u?d.checkedHoverBackgroundColor||d.checkedBackgroundColor||"#000":d.hoverBackgroundColor||d.backgroundColor||"#fff",D=c?g.checkmarkColor||"#cdcbcb":d.checkmarkColor||"#e6e6e6",O=b.checkmarkWidth||"10px",S=b.checkmarkHeight||"8px",X=b.dashWidth||"8px",Y=b.dashHeight||"2px",vt=((re=p.label)==null?void 0:re.fontFamily)||"Noto Sans, sans-serif",Mt=c?g.labelColor||"#cdcbcb":((ne=p.label)==null?void 0:ne.color)||"#2b2b2b",qt=((ae=p.subtext)==null?void 0:ae.fontFamily)||"Noto Sans, sans-serif",Gt=c?g.subtextColor||"#cdcbcb":((le=p.subtext)==null?void 0:le.color)||"#454545",Vt=d.focusRingColor||"rgba(0,0,0,0.4)";return`
    :host { display: inline-block; }

    .cb-wrapper {
      display: inline-flex;
      align-items: ${l?"flex-start":"center"};
      gap: ${b.gap||"6px"};
      cursor: ${c?"default":"pointer"};
      user-select: none;
      ${c?"pointer-events: none;":""}
    }

    .cb-input {
      position: absolute;
      opacity: 0;
      width: 0;
      height: 0;
      pointer-events: none;
    }

    .cb-box {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      width: ${y};
      height: ${y};
      min-width: ${y};
      min-height: ${y};
      border-width: ${C};
      border-style: solid;
      border-color: ${k};
      border-radius: ${x};
      background-color: ${w};
      transition: ${p.transition||"all 0.15s ease-in-out"};
      cursor: ${c?"default":"pointer"};
      position: relative;
      flex-shrink: 0;
    }

    ${c?"":`
    .cb-wrapper:hover .cb-box {
      border-color: ${T};
      background-color: ${$};
    }
    `}

    .cb-box:focus-within {
      outline: none;
      box-shadow: ${c?"none":`0 0 0 2px ${Vt}`};
    }

    /* Checkmark (checked state) */
    .cb-checkmark {
      display: ${n?"flex":"none"};
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      color: ${D};
    }
    .cb-checkmark svg {
      width: ${O};
      height: ${S};
    }

    /* Dash (indeterminate state) */
    .cb-dash {
      display: ${r&&!n?"block":"none"};
      width: ${X};
      height: ${Y};
      background-color: ${D};
      border-radius: 1px;
    }

    /* Label */
    .cb-label-col {
      display: flex;
      flex-direction: column;
    }

    .cb-label {
      font-family: ${vt};
      font-size: ${b.labelFontSize||"14px"};
      line-height: ${b.labelLineHeight||"20px"};
      font-weight: 500;
      color: ${Mt};
    }

    .cb-subtext {
      font-family: ${qt};
      font-size: ${b.subtextFontSize||"12px"};
      line-height: ${b.subtextLineHeight||"16px"};
      font-weight: 400;
      color: ${Gt};
    }
  `}var oi=Object.defineProperty,si=Object.getOwnPropertyDescriptor,rt=(i,t,e,s)=>{for(var o=s>1?void 0:s?si(t,e):t,n=i.length-1,r;n>=0;n--)(r=i[n])&&(o=(s?r(t,e,o):r(o))||o);return s&&o&&oi(t,e,o),o};const ii=`<svg viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M1 5L4.5 8.5L11 1.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;let J=class extends _{constructor(){super(...arguments),this.tarmacVariant="standard",this.tarmacStyle="box",this.size="md",this.checked=!1,this.indeterminate=!1,this.disabled=!1,this.value="",this.name="",this.subtext="",this._checkboxConfig={}}connectedCallback(){super.connectedCallback(),this._resolveTheme(),this._unsubscribeTheme=B(this,()=>{this._resolveTheme(),this.requestUpdate()})}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._unsubscribeTheme)==null||t.call(this)}_resolveTheme(){var e;const t=E(this);this._checkboxConfig=((e=t==null?void 0:t.components)==null?void 0:e.checkbox)||{}}render(){var o;const t=!!((o=this.textContent)!=null&&o.trim())||this.querySelector("[slot]")!==null,e=!!this.subtext,s=ei({config:this._checkboxConfig,variant:this.tarmacVariant,checkboxStyle:this.tarmacStyle,size:this.size,checked:this.checked,indeterminate:this.indeterminate,disabled:this.disabled,hasLabel:t});return h`
      <style>${s}</style>
      <label class="cb-wrapper" @click=${this._handleClick}>
        <input
          class="cb-input"
          type="checkbox"
          .checked=${this.checked}
          .indeterminate=${this.indeterminate}
          ?disabled=${this.disabled}
          name=${this.name||f}
          value=${this.value||f}
          @change=${this._handleChange}
        />
        <span class="cb-box">
          <span class="cb-checkmark" .innerHTML=${ii}></span>
          <span class="cb-dash"></span>
        </span>
        ${t||e?h`
              <span class="cb-label-col">
                <span class="cb-label"><slot></slot></span>
                ${e?h`<span class="cb-subtext">${this.subtext}</span>`:f}
              </span>
            `:f}
      </label>
    `}_handleClick(t){t.target.tagName}_handleChange(t){const e=t.target;this.checked=e.checked,this.indeterminate=!1,this.dispatchEvent(new CustomEvent("tarmac-change",{bubbles:!0,composed:!0,detail:{checked:this.checked,value:this.value}}))}};rt([a({type:String,attribute:"tarmac-variant"})],J.prototype,"tarmacVariant",2);rt([a({type:String,attribute:"tarmac-style"})],J.prototype,"tarmacStyle",2);rt([a({type:String})],J.prototype,"size",2);rt([a({type:Boolean})],J.prototype,"checked",2);rt([a({type:Boolean})],J.prototype,"indeterminate",2);rt([a({type:Boolean})],J.prototype,"disabled",2);rt([a({type:String})],J.prototype,"value",2);rt([a({type:String})],J.prototype,"name",2);rt([a({type:String})],J.prototype,"subtext",2);J=rt([z("tarmac-checkbox")],J);var ri=Object.defineProperty,ni=Object.getOwnPropertyDescriptor,St=(i,t,e,s)=>{for(var o=s>1?void 0:s?ni(t,e):t,n=i.length-1,r;n>=0;n--)(r=i[n])&&(o=(s?r(t,e,o):r(o))||o);return s&&o&&ri(t,e,o),o};const go={base:{fontFamily:"sans-serif",fontWeight:"500",borderRadius:"999px"},types:{solid:{black:{backgroundColor:"#2b2b2b",textColor:"#ffffff"},white:{backgroundColor:"#ffffff",textColor:"#2b2b2b",borderColor:"#e0e0e0"},coal:{backgroundColor:"#4a4a4a",textColor:"#ffffff"},blue:{backgroundColor:"#3b82f6",textColor:"#ffffff"},success:{backgroundColor:"#10b981",textColor:"#ffffff"},error:{backgroundColor:"#ef4444",textColor:"#ffffff"},warning:{backgroundColor:"#f59e0b",textColor:"#7b6414"},legacy_blue:{backgroundColor:"#5b80f7",textColor:"#ffffff"}},subtle:{black:{backgroundColor:"#e6e6e6",textColor:"#2b2b2b"},white:{backgroundColor:"#3a3a3a",textColor:"#ffffff"},coal:{backgroundColor:"#d9d9d9",textColor:"#4a4a4a"},blue:{backgroundColor:"#dbeafe",textColor:"#1d4ed8"},success:{backgroundColor:"#d1fae5",textColor:"#047857"},error:{backgroundColor:"#fee2e2",textColor:"#b91c1c"},warning:{backgroundColor:"#fef3c7",textColor:"#7b6414"},legacy_blue:{backgroundColor:"#e0e7ff",textColor:"#3b5bdb"}},outlined:{black:{backgroundColor:"transparent",textColor:"#2b2b2b",borderColor:"#2b2b2b"},white:{backgroundColor:"transparent",textColor:"#ffffff",borderColor:"#e0e0e0"},coal:{backgroundColor:"transparent",textColor:"#4a4a4a",borderColor:"#999999"},blue:{backgroundColor:"transparent",textColor:"#1d4ed8",borderColor:"#3b82f6"},success:{backgroundColor:"transparent",textColor:"#047857",borderColor:"#10b981"},error:{backgroundColor:"transparent",textColor:"#b91c1c",borderColor:"#ef4444"},warning:{backgroundColor:"transparent",textColor:"#7b6414",borderColor:"#f59e0b"},legacy_blue:{backgroundColor:"transparent",textColor:"#3b5bdb",borderColor:"#5b80f7"}}},variants:{black:{backgroundColor:"#2b2b2b",textColor:"#ffffff"},white:{backgroundColor:"#ffffff",textColor:"#2b2b2b",borderColor:"#e0e0e0"}},sizes:{sm:{padding:"4px",fontSize:"10px",lineHeight:"12px",iconSize:"12px",gap:"2px"},md:{padding:"6px",fontSize:"10px",lineHeight:"12px",iconSize:"12px",gap:"2px"},lg:{padding:"6px",fontSize:"12px",lineHeight:"16px",iconSize:"16px",gap:"2px"}},states:{disabled:{backgroundColor:"#dedede",textColor:"#cdcbcb",borderColor:"transparent"},ghost:{backgroundColor:"#dedede",textColor:"transparent",borderColor:"transparent"}}};function ai(i,t,e){var s,o;return((o=(s=i.types)==null?void 0:s[t])==null?void 0:o[e])||i.variants[e]||{}}let ct=class extends _{constructor(){super(...arguments),this.pillVariant="black",this.pillType="solid",this.size="md",this.text="",this.showStatus=!1,this.isDisabled=!1,this.isGhost=!1,this._cfg=go}connectedCallback(){super.connectedCallback(),this._resolve(),this._unsub=B(this,()=>{this._resolve(),this.requestUpdate()})}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._unsub)==null||t.call(this)}_resolve(){var e;const t=E(this);this._cfg=((e=t==null?void 0:t.components)==null?void 0:e.pill_tarmac)||go}render(){const t=this._cfg.sizes[this.size]||{},e=t.iconSize||"12px";let s,o,n,r,c="";if(this.isGhost){const d=this._cfg.states.ghost||{};s=d.backgroundColor||"#dedede",o=d.textColor||"transparent",n="0",r="transparent",c="pointer-events:none;"}else if(this.isDisabled){const d=this._cfg.states.disabled||{};s="transparent",o=d.textColor||"#cdcbcb",n="0.5px",r=d.borderColor||"#ededed",c="cursor:default;"}else{const d=ai(this._cfg,this.pillType,this.pillVariant);s=d.backgroundColor||"#e6e6e6",o=d.textColor||"#2b2b2b",n=d.borderColor?"0.5px":"0",r=d.borderColor||"transparent"}const l=this.isGhost?"transparent":this.isDisabled?"#cdcbcb":o;return h`
      <style>
        :host { display: inline-block; }
        .pill { display:inline-flex; align-items:center; justify-content:center; font-family:${this._cfg.base.fontFamily||"sans-serif"}; font-weight:${Number(this._cfg.base.fontWeight||500)}; border-radius:${this._cfg.base.borderRadius||"999px"}; padding:${t.padding||"6px"}; font-size:${t.fontSize||"10px"}; line-height:${t.lineHeight||"12px"}; gap:${t.gap||"2px"}; user-select:none; background-color:${s}; color:${o}; border-width:${n}; border-style:solid; border-color:${r}; ${c} }
        .icon { width:${e}; height:${e}; display:inline-flex; align-items:center; justify-content:center; flex-shrink:0; }
        .icon ::slotted(svg), .icon svg { width:${e}; height:${e}; }
        .dot { width:6px; height:6px; border-radius:50%; flex-shrink:0; }
      </style>
      <span class="pill">
        ${this.showStatus?h`<span class="dot" style="background-color:${l}"></span>`:f}
        <span class="icon"><slot name="leading-icon"></slot></span>
        ${this.text||h`<slot></slot>`}
        <span class="icon"><slot name="trailing-icon"></slot></span>
      </span>
    `}};St([a({type:String,attribute:"pill-variant"})],ct.prototype,"pillVariant",2);St([a({type:String,attribute:"pill-type"})],ct.prototype,"pillType",2);St([a({type:String})],ct.prototype,"size",2);St([a({type:String})],ct.prototype,"text",2);St([a({type:Boolean,attribute:"show-status"})],ct.prototype,"showStatus",2);St([a({type:Boolean,attribute:"is-disabled"})],ct.prototype,"isDisabled",2);St([a({type:Boolean,attribute:"is-ghost"})],ct.prototype,"isGhost",2);ct=St([z("tarmac-pill")],ct);var li=Object.defineProperty,ci=Object.getOwnPropertyDescriptor,nt=(i,t,e,s)=>{for(var o=s>1?void 0:s?ci(t,e):t,n=i.length-1,r;n>=0;n--)(r=i[n])&&(o=(s?r(t,e,o):r(o))||o);return s&&o&&li(t,e,o),o};const fo={base:{transition:"all 0.15s ease-in-out",focus:{ring:"0 0 0 2px rgba(0,0,0,0.4)"}},default:{backgroundColor:"#2b2b2b",textColor:"#ffffff",borderColor:"#e6e6e6",borderWidth:"0.5",hoverBackgroundColor:"#000000",hoverBorderColor:"#cccccc",hoverBorderWidth:"1",focusRingColor:"rgba(0,0,0,0.4)"},sizes:{xl:{dimension:"48px",fontSize:"20px",lineHeight:"26px",fontWeight:"600",iconSize:"28px",statusDotSize:"12px",statusDotPadding:"2px"},lg:{dimension:"40px",fontSize:"16px",lineHeight:"24px",fontWeight:"600",iconSize:"28px",statusDotSize:"8px",statusDotPadding:"2px"},md:{dimension:"36px",fontSize:"14px",lineHeight:"20px",fontWeight:"600",iconSize:"24px",statusDotSize:"6px",statusDotPadding:"2px"},sm:{dimension:"28px",fontSize:"12px",lineHeight:"16px",fontWeight:"600",iconSize:"16px",statusDotSize:"6px",statusDotPadding:"2px"}},radius:{round:"999px",square:{xl:"8px",lg:"8px",md:"8px",sm:"4px"}},states:{disabled:{backgroundColor:"#e6e6e6",textColor:"#cdcbcb",imageOverlay:"rgba(255,255,255,0.4)"},ghost:{backgroundColor:"#dedede"}},statusDot:{active:"#1ba86e",inactive:"#a0a0a0",idle:"#f5c828",brand:"#ed1b36"}};let Z=class extends _{constructor(){super(...arguments),this.avatarType="initials",this.shape="round",this.size="md",this.src="",this.alt="avatar",this.showStatus=!1,this.statusType="active",this.isDisabled=!1,this.isGhost=!1,this._cfg=fo}connectedCallback(){super.connectedCallback(),this._resolve(),this._unsub=B(this,()=>{this._resolve(),this.requestUpdate()})}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._unsub)==null||t.call(this)}_resolve(){var e;const t=E(this);this._cfg=((e=t==null?void 0:t.components)==null?void 0:e.avatar)||fo}render(){var C,k,w,T,$,D,O,S,X,Y,vt,Mt,qt,Gt,Vt,Ot;const t=this._cfg,e=((C=t.sizes)==null?void 0:C[this.size])||{},s=t.default||{},o=e.dimension||"36px",n=this.shape==="round"?((k=t.radius)==null?void 0:k.round)||"999px":((T=(w=t.radius)==null?void 0:w.square)==null?void 0:T[this.size])||"8px",r=e.iconSize||"24px",c=e.statusDotSize||"6px",l=e.statusDotPadding||"2px",d=(($=t.statusDot)==null?void 0:$[this.statusType])||"#1ba86e",b=this.showStatus&&this.shape==="round"&&!this.isGhost;let p,g,u,x,y="",v="",m="";return this.isGhost?(p=((O=(D=t.states)==null?void 0:D.ghost)==null?void 0:O.backgroundColor)||"#dedede",g="transparent",u="0",x="transparent",y="pointer-events:none;"):this.isDisabled?(p=((X=(S=t.states)==null?void 0:S.disabled)==null?void 0:X.backgroundColor)||"#e6e6e6",g=((vt=(Y=t.states)==null?void 0:Y.disabled)==null?void 0:vt.textColor)||"#cdcbcb",u="0",x="transparent",y="cursor:default;"):(p=s.backgroundColor||"#2b2b2b",g=s.textColor||"#ffffff",u=s.borderWidth||"0.5px",x=s.borderColor||"#e6e6e6",v=`.avatar:hover { background-color:${s.hoverBackgroundColor||"#000"}; border-color:${s.hoverBorderColor||"#ccc"}; cursor:pointer; }`,m=`.avatar:focus { box-shadow:${s.focusRingColor?`0 0 0 2px ${s.focusRingColor}`:((qt=(Mt=t.base)==null?void 0:Mt.focus)==null?void 0:qt.ring)||"0 0 0 2px rgba(0,0,0,0.4)"}; outline:none; }`),h`
      <style>
        :host { display:inline-block; position:relative; }
        .avatar { display:inline-flex; align-items:center; justify-content:center; width:${o}; height:${o}; min-width:${o}; min-height:${o}; border-radius:${n}; font-family:sans-serif; font-size:${e.fontSize||"14px"}; line-height:${e.lineHeight||"20px"}; font-weight:${Number(e.fontWeight||600)}; transition:${((Gt=t.base)==null?void 0:Gt.transition)||"all 0.15s ease-in-out"}; user-select:none; position:relative; overflow:visible; box-sizing:border-box; background-color:${p}; color:${g}; border-width:${u}; border-style:solid; border-color:${x}; ${y} }
        ${v} ${m}
        .avatar img { width:100%; height:100%; object-fit:cover; border-radius:${n}; }
        .avatar .icon-wrap { width:${r}; height:${r}; display:inline-flex; align-items:center; justify-content:center; }
        .avatar .icon-wrap ::slotted(svg), .avatar .icon-wrap svg { width:${r}; height:${r}; }
        .status-dot { position:absolute; bottom:0; right:0; width:${c}; height:${c}; border-radius:50%; background-color:${d}; border:${l} solid white; box-sizing:content-box; }
        .overlay { position:absolute; inset:0; border-radius:${n}; background-color:${((Ot=(Vt=t.states)==null?void 0:Vt.disabled)==null?void 0:Ot.imageOverlay)||"rgba(255,255,255,0.4)"}; }
      </style>
      <span class="avatar" tabindex="0">
        ${this.isGhost?f:this.avatarType==="image"&&this.src?h`<img src="${this.src}" alt="${this.alt}" />${this.isDisabled?h`<span class="overlay"></span>`:f}`:this.avatarType==="icon"?h`<span class="icon-wrap"><slot name="icon"></slot></span>`:h`<slot></slot>`}
      </span>
      ${b?h`<span class="status-dot"></span>`:f}
    `}};nt([a({type:String,attribute:"avatar-type"})],Z.prototype,"avatarType",2);nt([a({type:String})],Z.prototype,"shape",2);nt([a({type:String})],Z.prototype,"size",2);nt([a({type:String})],Z.prototype,"src",2);nt([a({type:String})],Z.prototype,"alt",2);nt([a({type:Boolean,attribute:"show-status"})],Z.prototype,"showStatus",2);nt([a({type:String,attribute:"status-type"})],Z.prototype,"statusType",2);nt([a({type:Boolean,attribute:"is-disabled"})],Z.prototype,"isDisabled",2);nt([a({type:Boolean,attribute:"is-ghost"})],Z.prototype,"isGhost",2);Z=nt([z("tarmac-avatar")],Z);var di=Object.defineProperty,pi=Object.getOwnPropertyDescriptor,Ut=(i,t,e,s)=>{for(var o=s>1?void 0:s?pi(t,e):t,n=i.length-1,r;n>=0;n--)(r=i[n])&&(o=(s?r(t,e,o):r(o))||o);return s&&o&&di(t,e,o),o};const xo={base:{transition:"all 0.15s ease-in-out",radius:"999px",handleColor:"#ffffff"},styles:{filled:{black:{uncheckedBackgroundColor:"#b3b1b1",checkedBackgroundColor:"#000000"},blue:{uncheckedBackgroundColor:"#b3b1b1",checkedBackgroundColor:"#2396fb"},dlv_red:{uncheckedBackgroundColor:"#b3b1b1",checkedBackgroundColor:"#ed1b36"},green:{uncheckedBackgroundColor:"#b3b1b1",checkedBackgroundColor:"#1ba86e"}},outlined:{black:{uncheckedBorderColor:"#b3b1b1",checkedBorderColor:"#000000",uncheckedBackgroundColor:"transparent",checkedBackgroundColor:"transparent",handleUncheckedColor:"#b3b1b1",handleCheckedColor:"#000000"},blue:{uncheckedBorderColor:"#b3b1b1",checkedBorderColor:"#2396fb",uncheckedBackgroundColor:"transparent",checkedBackgroundColor:"transparent",handleUncheckedColor:"#b3b1b1",handleCheckedColor:"#2396fb"}}},sizes:{lg:{trackWidth:"40px",trackHeight:"24px",handleSize:"16px",handleOffset:"4px",borderWidth:"1px"},sm:{trackWidth:"32px",trackHeight:"20px",handleSize:"12px",handleOffset:"4px",borderWidth:"1px"}},states:{disabled:{checkedBackgroundColor:"#e6e6e6",handleColor:"#cdcbcb",borderColor:"#ededed"},ghost:{backgroundColor:"#dedede",handleColor:"#cdcbcb",borderColor:"#e6e6e6"}}};let dt=class extends _{constructor(){super(...arguments),this.tarmacColor="black",this.tarmacStyle="filled",this.tarmacSize="lg",this.checked=!1,this.disabled=!1,this.isGhost=!1,this._cfg=xo}connectedCallback(){super.connectedCallback(),this._resolve(),this._unsub=B(this,()=>{this._resolve(),this.requestUpdate()})}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._unsub)==null||t.call(this)}_resolve(){var e;const t=E(this);this._cfg=((e=t==null?void 0:t.components)==null?void 0:e.toggle_tarmac)||xo}render(){var y,v,m,C,k,w,T,$,D,O;const t=this._cfg,e=((y=t.sizes)==null?void 0:y[this.tarmacSize])||{},s=e.trackWidth||"40px",o=e.trackHeight||"24px",n=e.handleSize||"16px",r=e.handleOffset||"4px",c=((v=t.base)==null?void 0:v.radius)||"999px",l=((m=t.base)==null?void 0:m.transition)||"all 0.15s ease-in-out",d=this.tarmacStyle==="filled";let b,p,g,u;if(this.isGhost){const S=((C=t.states)==null?void 0:C.ghost)||{};b=S.backgroundColor||"#dedede",p=`1px solid ${S.borderColor||"#e6e6e6"}`,g=S.handleColor||"#cdcbcb",u="default"}else if(this.disabled){const S=((k=t.states)==null?void 0:k.disabled)||{};b=S.checkedBackgroundColor||"#e6e6e6",p=d?"none":`1px solid ${S.borderColor||"#ededed"}`,g=S.handleColor||"#cdcbcb",u="default"}else if(d){const S=((T=(w=t.styles)==null?void 0:w.filled)==null?void 0:T[this.tarmacColor])||{};b=this.checked?S.checkedBackgroundColor||"#000":S.uncheckedBackgroundColor||"#b3b1b1",p="none",g=(($=t.base)==null?void 0:$.handleColor)||"#ffffff",u="pointer"}else{const S=((O=(D=t.styles)==null?void 0:D.outlined)==null?void 0:O[this.tarmacColor])||{};b=this.checked?S.checkedBackgroundColor||"transparent":S.uncheckedBackgroundColor||"transparent",p=`${e.borderWidth||"1px"} solid ${this.checked?S.checkedBorderColor||"#000":S.uncheckedBorderColor||"#b3b1b1"}`,g=this.checked?S.handleCheckedColor||"#000":S.handleUncheckedColor||"#b3b1b1",u="pointer"}const x=this.checked?"flex-end":"flex-start";return h`
      <style>
        .track { position:relative; display:inline-flex; justify-content:${x}; align-items:center; width:${s}; height:${o}; border-radius:${c}; background-color:${b}; border:${p}; cursor:${u}; transition:${l}; padding:${r}; box-sizing:border-box; }
        .handle { width:${n}; height:${n}; border-radius:50%; background-color:${g}; transition:${l}; flex-shrink:0; }
      </style>
      <button
        class="track"
        role="switch"
        aria-checked=${this.checked}
        ?disabled=${this.disabled}
        @click=${this._toggle}
      >
        <span class="handle"></span>
      </button>
    `}_toggle(){this.disabled||this.isGhost||(this.checked=!this.checked,this.dispatchEvent(new CustomEvent("tarmac-change",{bubbles:!0,composed:!0,detail:{checked:this.checked}})))}};dt.styles=ze`:host { display: inline-block; }`;Ut([a({type:String,attribute:"tarmac-color"})],dt.prototype,"tarmacColor",2);Ut([a({type:String,attribute:"tarmac-style"})],dt.prototype,"tarmacStyle",2);Ut([a({type:String,attribute:"tarmac-size"})],dt.prototype,"tarmacSize",2);Ut([a({type:Boolean})],dt.prototype,"checked",2);Ut([a({type:Boolean})],dt.prototype,"disabled",2);Ut([a({type:Boolean,attribute:"is-ghost"})],dt.prototype,"isGhost",2);dt=Ut([z("tarmac-toggle")],dt);var hi=Object.defineProperty,bi=Object.getOwnPropertyDescriptor,xe=(i,t,e,s)=>{for(var o=s>1?void 0:s?bi(t,e):t,n=i.length-1,r;n>=0;n--)(r=i[n])&&(o=(s?r(t,e,o):r(o))||o);return s&&o&&hi(t,e,o),o};const yo={base:{color:"#cccccc",dashPattern:"6 6"},sizes:{"0.5":{strokeWeight:"0.5px"},1:{strokeWeight:"1px"},"1.5":{strokeWeight:"1.5px"}}};let Yt=class extends _{constructor(){super(...arguments),this.dividerType="line",this.size="1",this.orientation="horizontal",this._cfg=yo}connectedCallback(){super.connectedCallback(),this._resolve(),this._unsub=B(this,()=>{this._resolve(),this.requestUpdate()})}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._unsub)==null||t.call(this)}_resolve(){var e;const t=E(this);this._cfg=((e=t==null?void 0:t.components)==null?void 0:e.divider)||yo}render(){var d,b;const t=this._cfg,e=(((d=t.sizes)==null?void 0:d[this.size])||{}).strokeWeight||`${this.size}px`,s=this.color||((b=t.base)==null?void 0:b.color)||"#b3b1b1",o=this.dividerType==="dash",n=this.orientation==="vertical",r=o?n?`repeating-linear-gradient(to bottom, ${s} 0px, ${s} 6px, transparent 6px, transparent 12px)`:`repeating-linear-gradient(to right, ${s} 0px, ${s} 6px, transparent 6px, transparent 12px)`:"none",c=o?"transparent":s,l=n?`:host{display:inline-block;} hr{border:none;width:${e};height:100%;margin:0;padding:0;flex-shrink:0;background-color:${c};background-image:${r};}`:`:host{display:block;width:100%;} hr{border:none;height:${e};width:100%;margin:0;padding:0;flex-shrink:0;background-color:${c};background-image:${r};}`;return h`
      <style>${l}</style>
      <hr role="separator" aria-orientation=${this.orientation} />
    `}};xe([a({type:String,attribute:"divider-type"})],Yt.prototype,"dividerType",2);xe([a({type:String})],Yt.prototype,"size",2);xe([a({type:String})],Yt.prototype,"color",2);xe([a({type:String})],Yt.prototype,"orientation",2);Yt=xe([z("tarmac-divider")],Yt);var ui=Object.defineProperty,gi=Object.getOwnPropertyDescriptor,ye=(i,t,e,s)=>{for(var o=s>1?void 0:s?gi(t,e):t,n=i.length-1,r;n>=0;n--)(r=i[n])&&(o=(s?r(t,e,o):r(o))||o);return s&&o&&ui(t,e,o),o};const mo={base:{borderRadius:"999px"},outerBg:{default:"#f7f7f7",ghost:"#ededed",ghostNumericIcon:"#f2f2f2"},sizes:{sm:{outerSize:"20px",innerDotSolid:"8px",innerDotOutlined:"6px",fontSize:"10px",lineHeight:"12px",borderWidthDefault:"1px",borderWidthFocused:"2px"},md:{outerSize:"28px",innerDotSolid:"12px",innerDotOutlined:"8px",fontSize:"12px",lineHeight:"16px",borderWidthDefault:"1px",borderWidthFocused:"2px"},lg:{outerSize:"36px",innerDotSolid:"16px",innerDotOutlined:"12px",fontSize:"14px",lineHeight:"20px",borderWidthDefault:"1px",borderWidthFocused:"2px"}},styles:{black:{innerColor:"#000000",borderColor:"#000000",textColor:"#000000",iconColor:"#000000",innerColorDisabled:"#cdcbcb",borderColorDisabled:"#ededed",textColorDisabled:"#cdcbcb",iconColorDisabled:"#cdcbcb"},coal:{innerColor:"#64739b",borderColor:"#64739b",textColor:"#64739b",iconColor:"#64739b",innerColorDisabled:"#cdcbcb",borderColorDisabled:"#ededed",textColorDisabled:"#cdcbcb",iconColorDisabled:"#cdcbcb"},dlv_red:{innerColor:"#ed1b36",borderColor:"#ed1b36",textColor:"#ed1b36",iconColor:"#ed1b36",innerColorDisabled:"#cdcbcb",borderColorDisabled:"#ededed",textColorDisabled:"#cdcbcb",iconColorDisabled:"#cdcbcb"},blue:{innerColor:"#2396fb",borderColor:"#2396fb",textColor:"#2396fb",iconColor:"#2396fb",innerColorDisabled:"#cdcbcb",borderColorDisabled:"#ededed",textColorDisabled:"#cdcbcb",iconColorDisabled:"#cdcbcb"},green:{innerColor:"#1ba86e",borderColor:"#1ba86e",textColor:"#1ba86e",iconColor:"#1ba86e",innerColorDisabled:"#cdcbcb",borderColorDisabled:"#ededed",textColorDisabled:"#cdcbcb",iconColorDisabled:"#cdcbcb"},numeric:{borderColor:"#2b2b2b",textColor:"#2b2b2b",borderColorDisabled:"#ededed",textColorDisabled:"#cdcbcb"},icon:{borderColor:"#2b2b2b",iconColor:"#2b2b2b",borderColorDisabled:"#ededed",iconColorDisabled:"#cdcbcb"}}};let Jt=class extends _{constructor(){super(...arguments),this.stepperStyle="numeric",this.variant="solid",this.size="lg",this.stepNumber=1,this._cfg=mo}connectedCallback(){super.connectedCallback(),this._resolve(),this._unsub=B(this,()=>{this._resolve(),this.requestUpdate()})}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._unsub)==null||t.call(this)}_resolve(){var e;const t=E(this);this._cfg=((e=t==null?void 0:t.components)==null?void 0:e.stepperIcon_tarmac)||mo}render(){var w,T,$;const t=this._cfg,e=((w=t.sizes)==null?void 0:w[this.size])||{},s=((T=t.styles)==null?void 0:T[this.stepperStyle])||{},o=t.outerBg||{},n=e.outerSize||"28px",r=(($=t.base)==null?void 0:$.borderRadius)||"999px",c=!["numeric","icon"].includes(this.stepperStyle),l=this.stepperStyle==="numeric",d=this.stepperStyle==="icon",b=this.variant==="ghost",p=this.variant==="disabled",g=l||d;let u,x="",y="";b?u=g?o.ghostNumericIcon||"#f2f2f2":o.ghost||"#ededed":p?(u=g?s.outerBgDisabled||"#ffffff":o.default||"#f7f7f7",g&&(x=`border:${e.borderWidthDefault||"1px"} solid ${s.borderColorDisabled||"#ededed"};`)):(u=o.default||"#f7f7f7",(this.variant==="outlined"||this.variant==="focused")&&(x=`border:${this.variant==="focused"?e.borderWidthFocused||"2px":e.borderWidthDefault||"1px"} solid ${s.borderColor||"#2b2b2b"};`));const v=this.variant==="outlined"?e.innerDotOutlined||"8px":e.innerDotSolid||"12px",m=p?s.innerColorDisabled||"#cdcbcb":s.innerColor||"#000",C=p?s.textColorDisabled||"#cdcbcb":s.textColor||"#2b2b2b",k=p?s.iconColorDisabled||"#cdcbcb":s.iconColor||"#2b2b2b";return h`
      <style>
        :host { display:inline-block; }
        .outer { width:${n}; height:${n}; border-radius:${r}; background-color:${u}; overflow:hidden; display:flex; align-items:center; justify-content:center; position:relative; flex-shrink:0; box-sizing:border-box; ${x} ${y} }
        .dot { width:${v}; height:${v}; border-radius:50%; background-color:${m}; }
        .num { font-family:${e.fontFamily||"Noto Sans, sans-serif"}; font-size:${e.fontSize||"12px"}; line-height:${e.lineHeight||"16px"}; font-weight:600; color:${C}; }
        .icon-wrap { display:flex; align-items:center; justify-content:center; color:${k}; }
        .icon-wrap ::slotted(svg) { width:${e.iconContainerSize||"16px"}; height:${e.iconContainerSize||"16px"}; }
      </style>
      <div class="outer">
        ${b?f:c?h`<span class="dot"></span>`:l?h`<span class="num">${this.stepNumber}</span>`:h`<span class="icon-wrap"><slot name="icon"></slot></span>`}
      </div>
    `}};ye([a({type:String,attribute:"stepper-style"})],Jt.prototype,"stepperStyle",2);ye([a({type:String})],Jt.prototype,"variant",2);ye([a({type:String})],Jt.prototype,"size",2);ye([a({type:Number,attribute:"step-number"})],Jt.prototype,"stepNumber",2);Jt=ye([z("tarmac-stepper-icon")],Jt);var fi=Object.defineProperty,xi=Object.getOwnPropertyDescriptor,zt=(i,t,e,s)=>{for(var o=s>1?void 0:s?xi(t,e):t,n=i.length-1,r;n>=0;n--)(r=i[n])&&(o=(s?r(t,e,o):r(o))||o);return s&&o&&fi(t,e,o),o};const vo={base:{fontFamily:"Noto Sans, sans-serif"},variants:{blue:{color:"#2396fb"},black:{color:"#2b2b2b"},white:{color:"#ffffff"}},sizes:{xl:{fontSize:"20px",lineHeight:"28px"},lg:{fontSize:"16px",lineHeight:"24px"},md:{fontSize:"14px",lineHeight:"20px"},sm:{fontSize:"12px",lineHeight:"16px"},xs:{fontSize:"10px",lineHeight:"14px"}},states:{disabled:{color:"#cdcbcb",cursor:"default"}}};let pt=class extends _{constructor(){super(...arguments),this.linkStyle="blue",this.size="md",this.isDisabled=!1,this.text="",this.href="",this.target="",this.rel="",this._cfg=vo}connectedCallback(){super.connectedCallback(),this._resolve(),this._unsub=B(this,()=>{this._resolve(),this.requestUpdate()})}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._unsub)==null||t.call(this)}_resolve(){var e;const t=E(this);this._cfg=((e=t==null?void 0:t.components)==null?void 0:e.link_tarmac)||vo}render(){var d,b,p,g;const t=this._cfg,e=((d=t.sizes)==null?void 0:d[this.size])||{},s=e.fontSize||"14px",o=e.lineHeight||"20px",n=((b=t.base)==null?void 0:b.fontFamily)||"Noto Sans, sans-serif";let r,c,l;if(this.isDisabled){const u=((p=t.states)==null?void 0:p.disabled)||{};r=u.color||"#cdcbcb",c=u.cursor||"default",l="none"}else r=(((g=t.variants)==null?void 0:g[this.linkStyle])||{}).color||"#2396fb",c="pointer",l="auto";return h`
      <style>
        :host { display: inline; }
        .link {
          font-family: ${n};
          font-size: ${s};
          line-height: ${o};
          color: ${r};
          cursor: ${c};
          pointer-events: ${l};
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }
        .link:hover { text-decoration: underline; }
        .icon { display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .icon ::slotted(svg) { width: ${s}; height: ${s}; }
      </style>
      <a
        class="link"
        href=${this.href||"javascript:void(0)"}
        target=${this.target||""}
        rel=${this.rel||""}
        @click=${this._handleClick}
      >
        <span class="icon"><slot name="leading-icon"></slot></span>
        ${this.text||h`<slot></slot>`}
        <span class="icon"><slot name="trailing-icon"></slot></span>
      </a>
    `}_handleClick(t){if(this.isDisabled){t.preventDefault(),t.stopPropagation();return}this.dispatchEvent(new CustomEvent("tarmac-click",{bubbles:!0,composed:!0,detail:{originalEvent:t}}))}};zt([a({type:String,attribute:"link-style"})],pt.prototype,"linkStyle",2);zt([a({type:String})],pt.prototype,"size",2);zt([a({type:Boolean,attribute:"is-disabled"})],pt.prototype,"isDisabled",2);zt([a({type:String})],pt.prototype,"text",2);zt([a({type:String})],pt.prototype,"href",2);zt([a({type:String})],pt.prototype,"target",2);zt([a({type:String})],pt.prototype,"rel",2);pt=zt([z("tarmac-link")],pt);var yi=Object.defineProperty,mi=Object.getOwnPropertyDescriptor,Be=(i,t,e,s)=>{for(var o=s>1?void 0:s?mi(t,e):t,n=i.length-1,r;n>=0;n--)(r=i[n])&&(o=(s?r(t,e,o):r(o))||o);return s&&o&&yi(t,e,o),o};const $o={base:{fontFamily:"Noto Sans, sans-serif",gap:"4px"},variants:{success:{color:"#1ba86e"},failed:{color:"#dc143c"},warning:{color:"#f5c828"},information:{color:"#2396fb"},synced:{color:"#1ba86e"},scheduled:{color:"#64739b"},unknown:{color:"#b3b1b1"},pause:{color:"#f5c828"},play:{color:"#1ba86e"},downloading:{color:"#2396fb"},pending:{color:"#f5c828"}},sizes:{lg:{fontSize:"14px",lineHeight:"20px",dotSize:"8px"},md:{fontSize:"12px",lineHeight:"16px",dotSize:"6px"},sm:{fontSize:"10px",lineHeight:"14px",dotSize:"6px"},xs:{fontSize:"10px",lineHeight:"12px",dotSize:"4px"}}};let ue=class extends _{constructor(){super(...arguments),this.variant="success",this.size="md",this.label="",this._cfg=$o}connectedCallback(){super.connectedCallback(),this._resolve(),this._unsub=B(this,()=>{this._resolve(),this.requestUpdate()})}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._unsub)==null||t.call(this)}_resolve(){var e;const t=E(this);this._cfg=((e=t==null?void 0:t.components)==null?void 0:e.status_indicator_tarmac)||$o}render(){var d,b,p,g;const t=this._cfg,e=((d=t.sizes)==null?void 0:d[this.size])||{},s=(((b=t.variants)==null?void 0:b[this.variant])||{}).color||"#1ba86e",o=e.fontSize||"12px",n=e.lineHeight||"16px",r=e.dotSize||"6px",c=((p=t.base)==null?void 0:p.gap)||"4px",l=((g=t.base)==null?void 0:g.fontFamily)||"Noto Sans, sans-serif";return h`
      <style>
        :host { display: inline-flex; align-items: center; gap: ${c}; }
        .dot { width: ${r}; height: ${r}; border-radius: 50%; flex-shrink: 0; background-color: ${s}; }
        .label { font-family: ${l}; font-size: ${o}; line-height: ${n}; color: inherit; }
        .icon { display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .icon ::slotted(svg) { width: ${o}; height: ${o}; }
      </style>
      <span class="icon"><slot name="icon"></slot></span>
      <span class="dot"></span>
      ${this.label?h`<span class="label">${this.label}</span>`:f}
    `}};Be([a({type:String})],ue.prototype,"variant",2);Be([a({type:String})],ue.prototype,"size",2);Be([a({type:String})],ue.prototype,"label",2);ue=Be([z("tarmac-status-indicator")],ue);var vi=Object.defineProperty,$i=Object.getOwnPropertyDescriptor,ee=(i,t,e,s)=>{for(var o=s>1?void 0:s?$i(t,e):t,n=i.length-1,r;n>=0;n--)(r=i[n])&&(o=(s?r(t,e,o):r(o))||o);return s&&o&&vi(t,e,o),o};const es="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",Co={base:{filledColor:"#f5c828",emptyColor:"#e6e6e6",gap:"2px",starPath:es},sizes:{lg:{starSize:"20px"},md:{starSize:"16px"},sm:{starSize:"14px"}}};let Ht=class extends _{constructor(){super(...arguments),this.value=0,this.maxStars=5,this.size="md",this.readOnly=!1,this.allowHalf=!1,this._cfg=Co,this._hoverValue=-1}connectedCallback(){super.connectedCallback(),this._resolve(),this._unsub=B(this,()=>{this._resolve(),this.requestUpdate()})}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._unsub)==null||t.call(this)}_resolve(){var e;const t=E(this);this._cfg=((e=t==null?void 0:t.components)==null?void 0:e.rating_tarmac)||Co}render(){var b,p,g,u,x;const t=this._cfg,e=(((b=t.sizes)==null?void 0:b[this.size])||{}).starSize||"16px",s=((p=t.base)==null?void 0:p.filledColor)||"#f5c828",o=((g=t.base)==null?void 0:g.emptyColor)||"#e6e6e6",n=((u=t.base)==null?void 0:u.gap)||"2px",r=((x=t.base)==null?void 0:x.starPath)||es,c=this.readOnly?"default":"pointer",l=this._hoverValue>=0?this._hoverValue:this.value,d=[];for(let y=1;y<=this.maxStars;y++){const v=l>=y,m=!v&&this.allowHalf&&l>=y-.5,C=`half-clip-${y}`;d.push(h`
        <span
          class="star"
          style="width:${e};height:${e};cursor:${c};"
          @click=${()=>this._handleClick(y)}
          @mouseenter=${()=>this._handleHover(y)}
          @mouseleave=${this._handleLeave}
        >
          <svg viewBox="0 0 24 24" width=${e} height=${e} xmlns="http://www.w3.org/2000/svg">
            ${m?no`
              <defs>
                <clipPath id=${C}>
                  <rect x="0" y="0" width="12" height="24" />
                </clipPath>
              </defs>
              <path d=${r} fill=${o} />
              <path d=${r} fill=${s} clip-path="url(#${C})" />
            `:no`
              <path d=${r} fill=${v?s:o} />
            `}
          </svg>
        </span>
      `)}return h`
      <style>
        :host { display: inline-flex; align-items: center; gap: ${n}; }
        .star { display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; }
      </style>
      ${d}
    `}_handleClick(t){if(this.readOnly)return;const e=this.allowHalf&&this.value===t-.5?t:this.allowHalf?t-.5:t;this.value=e,this.dispatchEvent(new CustomEvent("tarmac-change",{bubbles:!0,composed:!0,detail:{value:this.value}}))}_handleHover(t){this.readOnly||(this._hoverValue=t,this.requestUpdate())}_handleLeave(){this.readOnly||(this._hoverValue=-1,this.requestUpdate())}};ee([a({type:Number})],Ht.prototype,"value",2);ee([a({type:Number,attribute:"max-stars"})],Ht.prototype,"maxStars",2);ee([a({type:String})],Ht.prototype,"size",2);ee([a({type:Boolean,attribute:"read-only"})],Ht.prototype,"readOnly",2);ee([a({type:Boolean,attribute:"allow-half"})],Ht.prototype,"allowHalf",2);Ht=ee([z("tarmac-rating")],Ht);var Ci=Object.defineProperty,ki=Object.getOwnPropertyDescriptor,Wt=(i,t,e,s)=>{for(var o=s>1?void 0:s?ki(t,e):t,n=i.length-1,r;n>=0;n--)(r=i[n])&&(o=(s?r(t,e,o):r(o))||o);return s&&o&&Ci(t,e,o),o};const ko={base:{trackColor:"#e6e6e6",borderRadius:"999px",transition:"width 0.3s",textFontSize:"12px",textColor:"#2b2b2b"},variants:{primary:{fillColor:"#2396fb"},success:{fillColor:"#1ba86e"},warning:{fillColor:"#f5c828"},error:{fillColor:"#dc143c"},info:{fillColor:"#2396fb"},default:{fillColor:"#2b2b2b"}},sizes:{sm:{height:"4px"},md:{height:"8px"},lg:{height:"12px"}}};let _t=class extends _{constructor(){super(...arguments),this.value=0,this.size="md",this.variant="primary",this.showPercentage=!1,this._cfg=ko}connectedCallback(){super.connectedCallback(),this._resolve(),this._unsub=B(this,()=>{this._resolve(),this.requestUpdate()})}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._unsub)==null||t.call(this)}_resolve(){var e;const t=E(this);this._cfg=((e=t==null?void 0:t.components)==null?void 0:e.progress_bar_tarmac)||ko}render(){var g,u,x,y,v,m,C;const t=this._cfg,e=((g=t.sizes)==null?void 0:g[this.size])||{},s=((u=t.variants)==null?void 0:u[this.variant])||{},o=e.height||"8px",n=s.fillColor||"#2396fb",r=this.trackColor||((x=t.base)==null?void 0:x.trackColor)||"#e6e6e6",c=((y=t.base)==null?void 0:y.borderRadius)||"999px",l=((v=t.base)==null?void 0:v.transition)||"width 0.3s",d=this.textColor||((m=t.base)==null?void 0:m.textColor)||"#2b2b2b",b=((C=t.base)==null?void 0:C.textFontSize)||"12px",p=Math.max(0,Math.min(100,this.value));return h`
      <style>
        :host { display: block; width: 100%; }
        .wrapper { display: flex; align-items: center; gap: 8px; }
        .track { flex: 1; height: ${o}; background-color: ${r}; border-radius: ${c}; overflow: hidden; }
        .fill { height: 100%; border-radius: ${c}; background-color: ${n}; transition: ${l}; }
        .percentage { font-size: ${b}; color: ${d}; flex-shrink: 0; font-family: Noto Sans, sans-serif; }
      </style>
      <div class="wrapper" role="progressbar" aria-valuenow=${p} aria-valuemin="0" aria-valuemax="100">
        <div class="track">
          <div class="fill" style="width:${p}%"></div>
        </div>
        ${this.showPercentage?h`<span class="percentage">${p}%</span>`:f}
      </div>
    `}};Wt([a({type:Number})],_t.prototype,"value",2);Wt([a({type:String})],_t.prototype,"size",2);Wt([a({type:String})],_t.prototype,"variant",2);Wt([a({type:Boolean,attribute:"show-percentage"})],_t.prototype,"showPercentage",2);Wt([a({type:String,attribute:"track-color"})],_t.prototype,"trackColor",2);Wt([a({type:String,attribute:"text-color"})],_t.prototype,"textColor",2);_t=Wt([z("tarmac-progress-bar")],_t);var _i=Object.defineProperty,wi=Object.getOwnPropertyDescriptor,xt=(i,t,e,s)=>{for(var o=s>1?void 0:s?wi(t,e):t,n=i.length-1,r;n>=0;n--)(r=i[n])&&(o=(s?r(t,e,o):r(o))||o);return s&&o&&_i(t,e,o),o};const _o={base:{trackColor:"#e6e6e6",borderRadius:"999px",transition:"all 0.1s ease"},variants:{black:{fillColor:"#000000",knobColor:"#000000"},coal:{fillColor:"#64739b",knobColor:"#64739b"},dlv_red:{fillColor:"#ed1b36",knobColor:"#ed1b36"}},sizes:{sm:{trackHeight:"4px",knobSize:"16px"},lg:{trackHeight:"8px",knobSize:"24px"}},states:{disabled:{fillColor:"#cdcbcb",knobColor:"#e6e6e6"}}};let ot=class extends _{constructor(){super(...arguments),this.variant="black",this.size="lg",this.sliderType="single",this.value=0,this.min=0,this.max=100,this.step=1,this.isDisabled=!1,this._cfg=_o,this._dragging=!1}connectedCallback(){super.connectedCallback(),this._resolve(),this._unsub=B(this,()=>{this._resolve(),this.requestUpdate()})}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._unsub)==null||t.call(this)}_resolve(){var e;const t=E(this);this._cfg=((e=t==null?void 0:t.components)==null?void 0:e.slider_tarmac)||_o}render(){var g,u,x,y,v;const t=this._cfg,e=((g=t.sizes)==null?void 0:g[this.size])||{},s=e.trackHeight||"4px",o=e.knobSize||"16px",n=((u=t.base)==null?void 0:u.trackColor)||"#e6e6e6",r=((x=t.base)==null?void 0:x.borderRadius)||"999px";let c,l,d;if(this.isDisabled){const m=((y=t.states)==null?void 0:y.disabled)||{};c=m.fillColor||"#cdcbcb",l=m.knobColor||"#e6e6e6",d="default"}else{const m=((v=t.variants)==null?void 0:v[this.variant])||{};c=m.fillColor||"#000000",l=m.knobColor||"#000000",d="pointer"}const b=(this.value-this.min)/(this.max-this.min)*100,p=Math.max(0,Math.min(100,b));return h`
      <style>
        :host { display: block; width: 100%; }
        .slider-container { position: relative; width: 100%; padding: calc(${o} / 2) 0; cursor: ${d}; }
        .track { position: relative; width: 100%; height: ${s}; background-color: ${n}; border-radius: ${r}; }
        .fill { position: absolute; top: 0; left: 0; height: 100%; border-radius: ${r}; background-color: ${c}; }
        .knob {
          position: absolute;
          top: 50%;
          width: ${o};
          height: ${o};
          border-radius: 50%;
          background-color: ${l};
          transform: translate(-50%, -50%);
          cursor: ${d};
          box-shadow: 0 1px 3px rgba(0,0,0,0.2);
        }
      </style>
      <div
        class="slider-container"
        role="slider"
        aria-valuenow=${this.value}
        aria-valuemin=${this.min}
        aria-valuemax=${this.max}
        @mousedown=${this._handleMouseDown}
        @touchstart=${this._handleTouchStart}
      >
        <div class="track">
          <div class="fill" style="width:${p}%"></div>
          <div class="knob" style="left:${p}%"></div>
        </div>
      </div>
    `}_getValueFromEvent(t){var c;const e=(c=this.shadowRoot)==null?void 0:c.querySelector(".track");if(!e)return this.value;const s=e.getBoundingClientRect(),o=Math.max(0,Math.min(1,(t-s.left)/s.width)),n=this.min+o*(this.max-this.min),r=Math.round(n/this.step)*this.step;return Math.max(this.min,Math.min(this.max,r))}_handleMouseDown(t){if(this.isDisabled)return;t.preventDefault(),this._dragging=!0,this._updateValue(t.clientX);const e=o=>{this._updateValue(o.clientX)},s=o=>{this._dragging=!1,document.removeEventListener("mousemove",e),document.removeEventListener("mouseup",s),this.dispatchEvent(new CustomEvent("tarmac-change-end",{bubbles:!0,composed:!0,detail:{value:this.value}}))};document.addEventListener("mousemove",e),document.addEventListener("mouseup",s)}_handleTouchStart(t){if(this.isDisabled)return;t.preventDefault(),this._dragging=!0,this._updateValue(t.touches[0].clientX);const e=o=>{this._updateValue(o.touches[0].clientX)},s=()=>{this._dragging=!1,document.removeEventListener("touchmove",e),document.removeEventListener("touchend",s),this.dispatchEvent(new CustomEvent("tarmac-change-end",{bubbles:!0,composed:!0,detail:{value:this.value}}))};document.addEventListener("touchmove",e),document.addEventListener("touchend",s)}_updateValue(t){const e=this._getValueFromEvent(t);e!==this.value&&(this.value=e,this.dispatchEvent(new CustomEvent("tarmac-change",{bubbles:!0,composed:!0,detail:{value:this.value}})))}};xt([a({type:String})],ot.prototype,"variant",2);xt([a({type:String})],ot.prototype,"size",2);xt([a({type:String,attribute:"slider-type"})],ot.prototype,"sliderType",2);xt([a({type:Number})],ot.prototype,"value",2);xt([a({type:Number})],ot.prototype,"min",2);xt([a({type:Number})],ot.prototype,"max",2);xt([a({type:Number})],ot.prototype,"step",2);xt([a({type:Boolean,attribute:"is-disabled"})],ot.prototype,"isDisabled",2);ot=xt([z("tarmac-slider")],ot);var Si=Object.defineProperty,zi=Object.getOwnPropertyDescriptor,Et=(i,t,e,s)=>{for(var o=s>1?void 0:s?zi(t,e):t,n=i.length-1,r;n>=0;n--)(r=i[n])&&(o=(s?r(t,e,o):r(o))||o);return s&&o&&Si(t,e,o),o};const wo={base:{fontFamily:"Noto Sans, sans-serif",gap:"4px"},variants:{black:{color:"#2b2b2b"},blue:{color:"#2396fb"},dlvRed:{color:"#ed1b36"}},sizes:{lg:{fontSize:"14px",lineHeight:"20px"},sm:{fontSize:"12px",lineHeight:"16px"}},states:{disabled:{color:"#cdcbcb"},ghost:{backgroundColor:"#dedede",textColor:"transparent"},current:{fontWeight:"600"}}};let ht=class extends _{constructor(){super(...arguments),this.label="",this.cellStyle="black",this.size="lg",this.isDisabled=!1,this.isGhost=!1,this.isCurrent=!1,this.href="",this._cfg=wo}connectedCallback(){super.connectedCallback(),this._resolve(),this._unsub=B(this,()=>{this._resolve(),this.requestUpdate()})}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._unsub)==null||t.call(this)}_resolve(){var e;const t=E(this);this._cfg=((e=t==null?void 0:t.components)==null?void 0:e.breadcrumb_cell_tarmac)||wo}render(){var u,x,y,v,m,C,k,w;const t=this._cfg,e=((u=t.sizes)==null?void 0:u[this.size])||{},s=e.fontSize||"14px",o=e.lineHeight||"20px",n=((x=t.base)==null?void 0:x.fontFamily)||"Noto Sans, sans-serif",r=((y=t.base)==null?void 0:y.gap)||"4px";let c,l,d,b,p="";if(this.isGhost){const T=((v=t.states)==null?void 0:v.ghost)||{};c=T.textColor||"transparent",b=T.backgroundColor||"#dedede",l="default",d="400",p=`background-color:${b}; border-radius:4px; padding:2px 4px;`}else this.isDisabled?(c=(((m=t.states)==null?void 0:m.disabled)||{}).color||"#cdcbcb",l="default",d="400",p="pointer-events:none;"):(c=(((C=t.variants)==null?void 0:C[this.cellStyle])||{}).color||"#2b2b2b",l="pointer",d=this.isCurrent?((w=(k=t.states)==null?void 0:k.current)==null?void 0:w.fontWeight)||"600":"400");const g=this.href&&!this.isDisabled&&!this.isGhost?"a":"span";return h`
      <style>
        :host { display: inline-flex; align-items: center; }
        .cell {
          display: inline-flex;
          align-items: center;
          gap: ${r};
          font-family: ${n};
          font-size: ${s};
          line-height: ${o};
          color: ${c};
          cursor: ${l};
          font-weight: ${d};
          text-decoration: none;
          ${p}
        }
        .cell:hover { text-decoration: ${this.isDisabled||this.isGhost?"none":"underline"}; }
        .icon { display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .icon ::slotted(svg) { width: ${s}; height: ${s}; }
      </style>
      ${g==="a"?h`<a class="cell" href=${this.href} @click=${this._handleClick}>
            <span class="icon"><slot name="leading-icon"></slot></span>
            ${this.label}
            <span class="icon"><slot name="trailing-icon"></slot></span>
            <slot name="pill"></slot>
          </a>`:h`<span class="cell" @click=${this._handleClick}>
            <span class="icon"><slot name="leading-icon"></slot></span>
            ${this.label}
            <span class="icon"><slot name="trailing-icon"></slot></span>
            <slot name="pill"></slot>
          </span>`}
    `}_handleClick(t){if(this.isDisabled||this.isGhost){t.preventDefault(),t.stopPropagation();return}this.dispatchEvent(new CustomEvent("tarmac-click",{bubbles:!0,composed:!0,detail:{originalEvent:t,label:this.label,href:this.href}}))}};Et([a({type:String})],ht.prototype,"label",2);Et([a({type:String,attribute:"cell-style"})],ht.prototype,"cellStyle",2);Et([a({type:String})],ht.prototype,"size",2);Et([a({type:Boolean,attribute:"is-disabled"})],ht.prototype,"isDisabled",2);Et([a({type:Boolean,attribute:"is-ghost"})],ht.prototype,"isGhost",2);Et([a({type:Boolean,attribute:"is-current"})],ht.prototype,"isCurrent",2);Et([a({type:String})],ht.prototype,"href",2);ht=Et([z("tarmac-breadcrumb-cell")],ht);var Ei=Object.defineProperty,Bi=Object.getOwnPropertyDescriptor,Te=(i,t,e,s)=>{for(var o=s>1?void 0:s?Bi(t,e):t,n=i.length-1,r;n>=0;n--)(r=i[n])&&(o=(s?r(t,e,o):r(o))||o);return s&&o&&Ei(t,e,o),o};const So={base:{dividerColor:"#2B2B2B",dividerStrokeWidth:"0.5",dividerWidth:"8px"}};let ge=class extends _{constructor(){super(...arguments),this.dividerStyle="slash",this.size="lg",this.showDivider=!0,this._cfg=So}connectedCallback(){super.connectedCallback(),this._resolve(),this._unsub=B(this,()=>{this._resolve(),this.requestUpdate()})}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._unsub)==null||t.call(this)}_resolve(){var e;const t=E(this);this._cfg=((e=t==null?void 0:t.components)==null?void 0:e.breadcrumbs_tarmac)||So}render(){var s,o,n;const t=this._cfg;(s=t.base)==null||s.dividerColor,(o=t.base)==null||o.dividerStrokeWidth;const e=((n=t.base)==null?void 0:n.dividerWidth)||"8px";return h`
      <style>
        :host { display: inline-flex; }
        nav { display: flex; align-items: center; gap: 0; }
        .divider { display: inline-flex; align-items: center; justify-content: center; width: ${e}; margin: 0 4px; flex-shrink: 0; }
        .divider svg { width: ${e}; height: auto; }
        ::slotted(*) { display: inline-flex; }
      </style>
      <nav aria-label="breadcrumb">
        <slot @slotchange=${this._handleSlotChange}></slot>
      </nav>
    `}_handleSlotChange(){var o,n;const t=(o=this.shadowRoot)==null?void 0:o.querySelector("slot");if(!t)return;const e=t.assignedElements({flatten:!0}),s=(n=this.shadowRoot)==null?void 0:n.querySelector("nav");if(s&&(s.querySelectorAll(".divider").forEach(r=>r.remove()),!(!this.showDivider||e.length<=1))){for(let r=0;r<e.length-1;r++){const c=document.createElement("span");c.className="divider",c.innerHTML=this._getDividerSVG(),e[r].after(c)}this.requestUpdate()}}_getDividerSVG(){var o,n;const t=this._cfg,e=((o=t.base)==null?void 0:o.dividerColor)||"#2B2B2B",s=((n=t.base)==null?void 0:n.dividerStrokeWidth)||"0.5";return this.dividerStyle==="chevron"?`<svg viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1l5 5-5 5" stroke="${e}" stroke-width="${s}" stroke-linecap="round" stroke-linejoin="round"/></svg>`:`<svg viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 1L2 11" stroke="${e}" stroke-width="${s}" stroke-linecap="round"/></svg>`}updated(){var n,r,c;const t=(n=this.shadowRoot)==null?void 0:n.querySelector("slot");if(!t)return;const e=(r=this.shadowRoot)==null?void 0:r.querySelector("nav");if(!e||(e.querySelectorAll(".divider").forEach(l=>l.remove()),!this.showDivider))return;const s=t.assignedElements({flatten:!0});if(s.length<=1)return;const o=document.createElement("span");o.style.display="contents";for(let l=s.length-1;l>0;l--){const d=document.createElement("span");d.className="divider",d.setAttribute("aria-hidden","true"),d.innerHTML=this._getDividerSVG();const b=((c=this._cfg.base)==null?void 0:c.dividerWidth)||"8px";d.style.display="inline-flex",d.style.alignItems="center",d.style.justifyContent="center",d.style.width=b,d.style.margin="0 4px",d.style.flexShrink="0",this.insertBefore(d,s[l])}}};Te([a({type:String,attribute:"divider-style"})],ge.prototype,"dividerStyle",2);Te([a({type:String})],ge.prototype,"size",2);Te([a({type:Boolean,attribute:"show-divider"})],ge.prototype,"showDivider",2);ge=Te([z("tarmac-breadcrumbs")],ge);var Ti=Object.defineProperty,Di=Object.getOwnPropertyDescriptor,tt=(i,t,e,s)=>{for(var o=s>1?void 0:s?Di(t,e):t,n=i.length-1,r;n>=0;n--)(r=i[n])&&(o=(s?r(t,e,o):r(o))||o);return s&&o&&Ti(t,e,o),o};const zo={base:{fontFamily:"Noto Sans, sans-serif",gap:"8px"},variants:{black:{color:"#2b2b2b",pressedColor:"#000000",pressedBg:"#f5f5f5"},blue:{color:"#2b2b2b",pressedColor:"#2396fb",pressedBg:"#eef7ff"},dlvRed:{color:"#2b2b2b",pressedColor:"#ed1b36",pressedBg:"#fef2f2"}},sizes:{lg:{fontSize:"14px",lineHeight:"20px",padding:"12px"},sm:{fontSize:"12px",lineHeight:"16px",padding:"8px"}},types:{regular:{borderWidth:"2px"},button:{borderRadius:"4px"}},states:{disabled:{color:"#cdcbcb"},ghost:{backgroundColor:"#dedede",textColor:"transparent"}}};let I=class extends _{constructor(){super(...arguments),this.tabType="regular",this.orientation="horizontal",this.tabStyle="black",this.size="lg",this.isPressed=!1,this.isSelected=!1,this.isDisabled=!1,this.isGhost=!1,this.tabTitle="",this.subtext="",this._cfg=zo}connectedCallback(){super.connectedCallback(),this._resolve(),this._unsub=B(this,()=>{this._resolve(),this.requestUpdate()})}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._unsub)==null||t.call(this)}_resolve(){var e;const t=E(this);this._cfg=((e=t==null?void 0:t.components)==null?void 0:e.tab_cell_tarmac)||zo}render(){var y,v,m,C,k,w,T,$,D,O;const t=this._cfg,e=((y=t.sizes)==null?void 0:y[this.size])||{},s=((v=t.variants)==null?void 0:v[this.tabStyle])||{},o=e.fontSize||"14px",n=e.lineHeight||"20px",r=e.padding||"12px",c=((m=t.base)==null?void 0:m.fontFamily)||"Noto Sans, sans-serif",l=((C=t.base)==null?void 0:C.gap)||"8px",d=this.isPressed||this.isSelected;let b,p,g,u,x="";if(this.isGhost){const S=((k=t.states)==null?void 0:k.ghost)||{};b=S.textColor||"transparent",p=S.backgroundColor||"#dedede",g="default",u="none",x="pointer-events:none;"}else if(this.isDisabled)b=(((w=t.states)==null?void 0:w.disabled)||{}).color||"#cdcbcb",p="transparent",g="default",u="none",x="pointer-events:none;";else if(d)if(b=s.pressedColor||"#000000",g="pointer",this.tabType==="regular"){p="transparent";const S=(($=(T=t.types)==null?void 0:T.regular)==null?void 0:$.borderWidth)||"2px";this.orientation==="vertical"?u=`border-left: ${S} solid ${b};`:u=`border-bottom: ${S} solid ${b};`}else p=s.pressedBg||"#f5f5f5",u=`border-radius: ${((O=(D=t.types)==null?void 0:D.button)==null?void 0:O.borderRadius)||"4px"};`;else b=s.color||"#2b2b2b",p="transparent",g="pointer",u=this.tabType==="regular"?"border-bottom: 2px solid transparent;":"";return h`
      <style>
        :host { display: inline-flex; }
        .tab-cell {
          display: inline-flex;
          align-items: center;
          gap: ${l};
          font-family: ${c};
          font-size: ${o};
          line-height: ${n};
          padding: ${r};
          color: ${b};
          background-color: ${p};
          cursor: ${g};
          border: none;
          outline: none;
          user-select: none;
          white-space: nowrap;
          ${typeof u=="string"&&u.includes(":")?u:""}
          ${x}
        }
        .tab-cell:hover { opacity: ${this.isDisabled||this.isGhost?"1":"0.8"}; }
        .icon { display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .icon ::slotted(svg) { width: ${o}; height: ${o}; }
        .content { display: flex; flex-direction: column; }
        .title { font-weight: ${d?"600":"400"}; }
        .subtext { font-size: calc(${o} - 2px); color: ${this.isDisabled?"#cdcbcb":"#64739b"}; }
        .extras { display: inline-flex; align-items: center; gap: 4px; }
      </style>
      <button
        class="tab-cell"
        role="tab"
        aria-selected=${d}
        ?disabled=${this.isDisabled}
        @click=${this._handleClick}
      >
        <span class="icon"><slot name="leading-icon"></slot></span>
        <span class="content">
          <span class="title">${this.tabTitle}</span>
          ${this.subtext?h`<span class="subtext">${this.subtext}</span>`:f}
        </span>
        <span class="extras">
          <slot name="badge"></slot>
          <slot name="pill"></slot>
          <slot name="status"></slot>
        </span>
        <span class="icon"><slot name="trailing-icon"></slot></span>
      </button>
    `}_handleClick(t){if(this.isDisabled||this.isGhost){t.preventDefault(),t.stopPropagation();return}this.dispatchEvent(new CustomEvent("tarmac-click",{bubbles:!0,composed:!0,detail:{originalEvent:t,title:this.tabTitle}}))}};tt([a({type:String,attribute:"tab-type"})],I.prototype,"tabType",2);tt([a({type:String})],I.prototype,"orientation",2);tt([a({type:String,attribute:"tab-style"})],I.prototype,"tabStyle",2);tt([a({type:String})],I.prototype,"size",2);tt([a({type:Boolean,attribute:"is-pressed"})],I.prototype,"isPressed",2);tt([a({type:Boolean,attribute:"is-selected"})],I.prototype,"isSelected",2);tt([a({type:Boolean,attribute:"is-disabled"})],I.prototype,"isDisabled",2);tt([a({type:Boolean,attribute:"is-ghost"})],I.prototype,"isGhost",2);tt([a({type:String,attribute:"title"})],I.prototype,"tabTitle",2);tt([a({type:String})],I.prototype,"subtext",2);I=tt([z("tarmac-tab-cell")],I);var Oi=Object.defineProperty,Fi=Object.getOwnPropertyDescriptor,R=(i,t,e,s)=>{for(var o=s>1?void 0:s?Fi(t,e):t,n=i.length-1,r;n>=0;n--)(r=i[n])&&(o=(s?r(t,e,o):r(o))||o);return s&&o&&Oi(t,e,o),o};const Eo={base:{fontFamily:"Noto Sans, sans-serif",radius:"4px",transition:"all 0.15s ease-in-out"},types:{regular:{borderColor:"#e0e0e0",focusBorderColor:"#2b2b2b"},success:{borderColor:"#2e7d32",focusBorderColor:"#2e7d32"},error:{borderColor:"#c62828",focusBorderColor:"#c62828"},infoBlue:{borderColor:"#1565c0",focusBorderColor:"#1565c0"}},sizes:{lg:{height:"48px",fontSize:"16px",padding:"0 12px"},md:{height:"40px",fontSize:"14px",padding:"0 12px"},sm:{height:"32px",fontSize:"14px",padding:"0 8px"}},states:{disabled:{borderColor:"#ededed",color:"#cdcbcb",backgroundColor:"#fff"},ghost:{backgroundColor:"#ededed",borderColor:"transparent"}}};let A=class extends _{constructor(){super(...arguments),this.inputStyle="tarmac-01",this.inputType="regular",this.inputSize="md",this.styleVariant="standard",this.isDisabled=!1,this.isGhost=!1,this.label="",this.isMandatory=!1,this.placeholder="",this.value="",this.helperTextTop="",this.helperTextBottom="",this.subtext="",this.statusText="",this._cfg=Eo}connectedCallback(){super.connectedCallback(),this._resolve(),this._unsub=B(this,()=>{this._resolve(),this.requestUpdate()})}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._unsub)==null||t.call(this)}_resolve(){var e;const t=E(this);this._cfg=((e=t==null?void 0:t.components)==null?void 0:e.input_tarmac)||Eo}render(){var T,$,D,O,S,X;const t=this._cfg,e=((T=t.types)==null?void 0:T[this.inputType])||(($=t.types)==null?void 0:$.regular)||{},s=((D=t.sizes)==null?void 0:D[this.inputSize])||((O=t.sizes)==null?void 0:O.md)||{},o=t.base||{},n=((S=t.states)==null?void 0:S.disabled)||{},r=((X=t.states)==null?void 0:X.ghost)||{},c=o.fontFamily||"Noto Sans, sans-serif",l=o.radius||"4px",d=o.transition||"all 0.15s ease-in-out",b=s.height||"40px",p=s.fontSize||"14px",g=s.padding||"0 12px";let u,x,y,v;this.isDisabled?(u=n.borderColor||"#ededed",x=n.backgroundColor||"#fff",y=n.color||"#cdcbcb",v="not-allowed"):this.isGhost?(u=r.borderColor||"transparent",x=r.backgroundColor||"#ededed",y="#2b2b2b",v="text"):(u=e.borderColor||"#e0e0e0",x="#fff",y="#2b2b2b",v="text");const m=e.focusBorderColor||"#2b2b2b",C=this.inputType==="error"?"#c62828":this.inputType==="success"?"#2e7d32":this.inputType==="infoBlue"?"#1565c0":"#6b6b6b",k=this.styleVariant==="addonLeft",w=this.styleVariant==="addonRight";return h`
      <style>
        :host { display: block; font-family: ${c}; }
        .input-wrapper { display: flex; flex-direction: column; gap: 4px; }
        .label-row { display: flex; align-items: center; gap: 2px; font-size: 12px; line-height: 16px; color: #6b6b6b; font-weight: 500; }
        .mandatory { color: #c62828; }
        .helper-text { font-size: 12px; line-height: 16px; color: #6b6b6b; }
        .status-text { font-size: 12px; line-height: 16px; color: ${C}; }
        .subtext { font-size: 12px; line-height: 16px; color: #8c8c8c; }
        .input-row { display: flex; align-items: center; }
        .addon { display: flex; align-items: center; justify-content: center; height: ${b}; padding: 0 12px; background: #f5f5f5; border: 1px solid ${u}; font-size: ${p}; color: #6b6b6b; white-space: nowrap; }
        .addon-left { border-right: none; border-radius: ${l} 0 0 ${l}; }
        .addon-right { border-left: none; border-radius: 0 ${l} ${l} 0; }
        .input-container { display: flex; align-items: center; flex: 1; height: ${b}; border: 1px solid ${u}; border-radius: ${k?`0 ${l} ${l} 0`:w?`${l} 0 0 ${l}`:l}; background-color: ${x}; transition: ${d}; padding: ${g}; gap: 8px; box-sizing: border-box; }
        .input-container:focus-within { border-color: ${this.isDisabled?u:m}; }
        input { flex: 1; border: none; outline: none; background: transparent; font-family: ${c}; font-size: ${p}; color: ${y}; cursor: ${v}; min-width: 0; }
        input::placeholder { color: #b3b1b1; }
        input:disabled { cursor: not-allowed; }
        .icon-slot { display: flex; align-items: center; color: #6b6b6b; }
        .icon-slot ::slotted(*) { width: 20px; height: 20px; }
      </style>
      <div class="input-wrapper">
        ${this.label?h`<div class="label-row"><span>${this.label}</span>${this.isMandatory?h`<span class="mandatory">*</span>`:f}</div>`:f}
        ${this.helperTextTop?h`<div class="helper-text">${this.helperTextTop}</div>`:f}
        <div class="input-row">
          ${k?h`<div class="addon addon-left"><slot name="addon"></slot></div>`:f}
          <div class="input-container">
            <span class="icon-slot"><slot name="leading-icon"></slot></span>
            <input
              type="text"
              .value=${this.value}
              placeholder=${this.placeholder||f}
              ?disabled=${this.isDisabled}
              @input=${this._onInput}
              @change=${this._onChange}
              @focus=${this._onFocus}
              @blur=${this._onBlur}
            />
            <span class="icon-slot"><slot name="trailing-icon"></slot></span>
          </div>
          ${w?h`<div class="addon addon-right"><slot name="addon"></slot></div>`:f}
        </div>
        ${this.statusText?h`<div class="status-text">${this.statusText}</div>`:f}
        ${this.helperTextBottom?h`<div class="helper-text">${this.helperTextBottom}</div>`:f}
        ${this.subtext?h`<div class="subtext">${this.subtext}</div>`:f}
      </div>
    `}_onInput(t){const e=t.target;this.value=e.value,this.dispatchEvent(new CustomEvent("tarmac-input",{bubbles:!0,composed:!0,detail:{value:this.value}}))}_onChange(t){const e=t.target;this.value=e.value,this.dispatchEvent(new CustomEvent("tarmac-change",{bubbles:!0,composed:!0,detail:{value:this.value}}))}_onFocus(){this.dispatchEvent(new CustomEvent("tarmac-focus",{bubbles:!0,composed:!0}))}_onBlur(){this.dispatchEvent(new CustomEvent("tarmac-blur",{bubbles:!0,composed:!0}))}};R([a({type:String,attribute:"input-style"})],A.prototype,"inputStyle",2);R([a({type:String,attribute:"input-type"})],A.prototype,"inputType",2);R([a({type:String,attribute:"input-size"})],A.prototype,"inputSize",2);R([a({type:String,attribute:"style-variant"})],A.prototype,"styleVariant",2);R([a({type:Boolean,attribute:"is-disabled"})],A.prototype,"isDisabled",2);R([a({type:Boolean,attribute:"is-ghost"})],A.prototype,"isGhost",2);R([a({type:String})],A.prototype,"label",2);R([a({type:Boolean,attribute:"is-mandatory"})],A.prototype,"isMandatory",2);R([a({type:String})],A.prototype,"placeholder",2);R([a({type:String})],A.prototype,"value",2);R([a({type:String,attribute:"helper-text-top"})],A.prototype,"helperTextTop",2);R([a({type:String,attribute:"helper-text-bottom"})],A.prototype,"helperTextBottom",2);R([a({type:String})],A.prototype,"subtext",2);R([a({type:String,attribute:"status-text"})],A.prototype,"statusText",2);A=R([z("tarmac-input")],A);var Ai=Object.defineProperty,Pi=Object.getOwnPropertyDescriptor,M=(i,t,e,s)=>{for(var o=s>1?void 0:s?Pi(t,e):t,n=i.length-1,r;n>=0;n--)(r=i[n])&&(o=(s?r(t,e,o):r(o))||o);return s&&o&&Ai(t,e,o),o};const Bo={base:{fontFamily:"Noto Sans, sans-serif",radius:"4px",transition:"all 0.15s ease-in-out"},types:{regular:{borderColor:"#e0e0e0",focusBorderColor:"#2b2b2b"},success:{borderColor:"#2e7d32",focusBorderColor:"#2e7d32"},error:{borderColor:"#c62828",focusBorderColor:"#c62828"},infoBlue:{borderColor:"#1565c0",focusBorderColor:"#1565c0"}},sizes:{sm:{minHeight:"72px",fontSize:"14px",padding:"8px"},md:{minHeight:"96px",fontSize:"14px",padding:"10px 12px"},lg:{minHeight:"120px",fontSize:"16px",padding:"12px"}},states:{disabled:{borderColor:"#ededed",color:"#cdcbcb",backgroundColor:"#fff"},ghost:{backgroundColor:"#ededed",borderColor:"transparent"}}};let N=class extends _{constructor(){super(...arguments),this.textAreaStyle="tarmac-01",this.textAreaType="regular",this.textAreaSize="md",this.isDisabled=!1,this.isGhost=!1,this.label="",this.placeholder="",this.value="",this.rows=4,this.resize="vertical",this.helperTextTop="",this.helperTextBottom="",this.statusText="",this._cfg=Bo}connectedCallback(){super.connectedCallback(),this._resolve(),this._unsub=B(this,()=>{this._resolve(),this.requestUpdate()})}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._unsub)==null||t.call(this)}_resolve(){var e;const t=E(this);this._cfg=((e=t==null?void 0:t.components)==null?void 0:e.textarea_tarmac)||Bo}render(){var k,w,T,$,D,O;const t=this._cfg,e=((k=t.types)==null?void 0:k[this.textAreaType])||((w=t.types)==null?void 0:w.regular)||{},s=((T=t.sizes)==null?void 0:T[this.textAreaSize])||(($=t.sizes)==null?void 0:$.md)||{},o=t.base||{},n=((D=t.states)==null?void 0:D.disabled)||{},r=((O=t.states)==null?void 0:O.ghost)||{},c=o.fontFamily||"Noto Sans, sans-serif",l=o.radius||"4px",d=o.transition||"all 0.15s ease-in-out",b=s.minHeight||"96px",p=s.fontSize||"14px",g=s.padding||"10px 12px";let u,x,y,v;this.isDisabled?(u=n.borderColor||"#ededed",x=n.backgroundColor||"#fff",y=n.color||"#cdcbcb",v="not-allowed"):this.isGhost?(u=r.borderColor||"transparent",x=r.backgroundColor||"#ededed",y="#2b2b2b",v="text"):(u=e.borderColor||"#e0e0e0",x="#fff",y="#2b2b2b",v="text");const m=e.focusBorderColor||"#2b2b2b",C=this.textAreaType==="error"?"#c62828":this.textAreaType==="success"?"#2e7d32":this.textAreaType==="infoBlue"?"#1565c0":"#6b6b6b";return h`
      <style>
        :host { display: block; font-family: ${c}; }
        .textarea-wrapper { display: flex; flex-direction: column; gap: 4px; }
        .label { font-size: 12px; line-height: 16px; color: #6b6b6b; font-weight: 500; }
        .helper-text { font-size: 12px; line-height: 16px; color: #6b6b6b; }
        .status-text { font-size: 12px; line-height: 16px; color: ${C}; }
        textarea {
          width: 100%; min-height: ${b}; border: 1px solid ${u}; border-radius: ${l};
          background-color: ${x}; color: ${y}; font-family: ${c}; font-size: ${p};
          padding: ${g}; box-sizing: border-box; transition: ${d}; resize: ${this.resize};
          cursor: ${v}; outline: none;
        }
        textarea::placeholder { color: #b3b1b1; }
        textarea:focus { border-color: ${this.isDisabled?u:m}; }
        textarea:disabled { cursor: not-allowed; }
      </style>
      <div class="textarea-wrapper">
        ${this.label?h`<div class="label">${this.label}</div>`:f}
        ${this.helperTextTop?h`<div class="helper-text">${this.helperTextTop}</div>`:f}
        <textarea
          .value=${this.value}
          rows=${this.rows}
          placeholder=${this.placeholder||f}
          ?disabled=${this.isDisabled}
          @input=${this._onInput}
          @change=${this._onChange}
        ></textarea>
        ${this.statusText?h`<div class="status-text">${this.statusText}</div>`:f}
        ${this.helperTextBottom?h`<div class="helper-text">${this.helperTextBottom}</div>`:f}
      </div>
    `}_onInput(t){const e=t.target;this.value=e.value,this.dispatchEvent(new CustomEvent("tarmac-input",{bubbles:!0,composed:!0,detail:{value:this.value}}))}_onChange(t){const e=t.target;this.value=e.value,this.dispatchEvent(new CustomEvent("tarmac-change",{bubbles:!0,composed:!0,detail:{value:this.value}}))}};M([a({type:String,attribute:"textarea-style"})],N.prototype,"textAreaStyle",2);M([a({type:String,attribute:"textarea-type"})],N.prototype,"textAreaType",2);M([a({type:String,attribute:"textarea-size"})],N.prototype,"textAreaSize",2);M([a({type:Boolean,attribute:"is-disabled"})],N.prototype,"isDisabled",2);M([a({type:Boolean,attribute:"is-ghost"})],N.prototype,"isGhost",2);M([a({type:String})],N.prototype,"label",2);M([a({type:String})],N.prototype,"placeholder",2);M([a({type:String})],N.prototype,"value",2);M([a({type:Number})],N.prototype,"rows",2);M([a({type:String})],N.prototype,"resize",2);M([a({type:String,attribute:"helper-text-top"})],N.prototype,"helperTextTop",2);M([a({type:String,attribute:"helper-text-bottom"})],N.prototype,"helperTextBottom",2);M([a({type:String,attribute:"status-text"})],N.prototype,"statusText",2);N=M([z("tarmac-textarea")],N);var ji=Object.defineProperty,Hi=Object.getOwnPropertyDescriptor,yt=(i,t,e,s)=>{for(var o=s>1?void 0:s?Hi(t,e):t,n=i.length-1,r;n>=0;n--)(r=i[n])&&(o=(s?r(t,e,o):r(o))||o);return s&&o&&ji(t,e,o),o};const To={base:{fontFamily:"Noto Sans, sans-serif",transition:"all 0.15s ease-in-out"},variants:{standard:{checkedColor:"#000000",borderColor:"#e6e6e6",dotColor:"#ffffff"},blue:{checkedColor:"#2396fb",borderColor:"#e6e6e6",dotColor:"#ffffff"},green:{checkedColor:"#1ba86e",borderColor:"#e6e6e6",dotColor:"#ffffff"},dlv_red:{checkedColor:"#ed1b36",borderColor:"#e6e6e6",dotColor:"#ffffff"}},sizes:{sm:{radioSize:"16px",dotSize:"6px",labelFontSize:"14px",labelLineHeight:"20px"},md:{radioSize:"20px",dotSize:"8px",labelFontSize:"14px",labelLineHeight:"20px"},lg:{radioSize:"24px",dotSize:"10px",labelFontSize:"14px",labelLineHeight:"20px"}},states:{disabled:{borderColor:"#ededed",checkedColor:"#e6e6e6",dotColor:"#cdcbcb",labelColor:"#cdcbcb"}}};let st=class extends _{constructor(){super(...arguments),this.tarmacVariant="standard",this.tarmacStyle="box",this.size="md",this.checked=!1,this.disabled=!1,this.value="",this.name="",this.subtext="",this._cfg=To}connectedCallback(){super.connectedCallback(),this._resolve(),this._unsub=B(this,()=>{this._resolve(),this.requestUpdate()})}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._unsub)==null||t.call(this)}_resolve(){var e;const t=E(this);this._cfg=((e=t==null?void 0:t.components)==null?void 0:e.radio_tarmac)||To}render(){var C,k,w,T,$,D;const t=this._cfg,e=((C=t.variants)==null?void 0:C[this.tarmacVariant])||((k=t.variants)==null?void 0:k.standard)||{},s=((w=t.sizes)==null?void 0:w[this.size])||((T=t.sizes)==null?void 0:T.md)||{},o=t.base||{},n=(($=t.states)==null?void 0:$.disabled)||{},r=o.fontFamily||"Noto Sans, sans-serif",c=o.transition||"all 0.15s ease-in-out",l=s.radioSize||"20px",d=s.dotSize||"8px",b=s.labelFontSize||"14px",p=s.labelLineHeight||"20px";let g,u,x,y;this.disabled?(g=n.borderColor||"#ededed",u=this.checked?n.checkedColor||"#e6e6e6":"#fff",x=n.dotColor||"#cdcbcb",y=n.labelColor||"#cdcbcb"):(g=this.checked?e.checkedColor||"#000":e.borderColor||"#e6e6e6",u=this.checked?e.checkedColor||"#000":"#fff",x=e.dotColor||"#ffffff",y="#2b2b2b");const v=!!((D=this.textContent)!=null&&D.trim())||this.querySelector("[slot]")!==null,m=!!this.subtext;return h`
      <style>
        :host { display: inline-block; font-family: ${r}; }
        .radio-wrapper { display: inline-flex; align-items: ${m?"flex-start":"center"}; gap: 8px; cursor: ${this.disabled?"default":"pointer"}; user-select: none; }
        .radio-input { position: absolute; opacity: 0; width: 0; height: 0; pointer-events: none; }
        .radio-circle {
          display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0;
          width: ${l}; height: ${l}; border-radius: 50%;
          border: 2px solid ${g}; background-color: ${u};
          transition: ${c}; box-sizing: border-box;
        }
        .radio-dot {
          width: ${d}; height: ${d}; border-radius: 50%;
          background-color: ${x};
          display: ${this.checked?"block":"none"};
        }
        .label-col { display: flex; flex-direction: column; }
        .label { font-size: ${b}; line-height: ${p}; font-weight: 500; color: ${y}; }
        .subtext { font-size: 12px; line-height: 16px; color: ${this.disabled?"#cdcbcb":"#8c8c8c"}; }
      </style>
      <label class="radio-wrapper" @click=${this._handleClick}>
        <input
          class="radio-input"
          type="radio"
          .checked=${this.checked}
          ?disabled=${this.disabled}
          name=${this.name||f}
          value=${this.value||f}
          @change=${this._handleChange}
        />
        <span class="radio-circle"><span class="radio-dot"></span></span>
        ${v||m?h`
          <span class="label-col">
            <span class="label"><slot></slot></span>
            ${m?h`<span class="subtext">${this.subtext}</span>`:f}
          </span>
        `:f}
      </label>
    `}_handleClick(t){t.target.tagName}_handleChange(){this.disabled||(this.checked=!0,this.dispatchEvent(new CustomEvent("tarmac-change",{bubbles:!0,composed:!0,detail:{checked:this.checked,value:this.value}})))}};yt([a({type:String,attribute:"tarmac-variant"})],st.prototype,"tarmacVariant",2);yt([a({type:String,attribute:"tarmac-style"})],st.prototype,"tarmacStyle",2);yt([a({type:String})],st.prototype,"size",2);yt([a({type:Boolean})],st.prototype,"checked",2);yt([a({type:Boolean})],st.prototype,"disabled",2);yt([a({type:String})],st.prototype,"value",2);yt([a({type:String})],st.prototype,"name",2);yt([a({type:String})],st.prototype,"subtext",2);st=yt([z("tarmac-radio")],st);var Ni=Object.defineProperty,Ri=Object.getOwnPropertyDescriptor,K=(i,t,e,s)=>{for(var o=s>1?void 0:s?Ri(t,e):t,n=i.length-1,r;n>=0;n--)(r=i[n])&&(o=(s?r(t,e,o):r(o))||o);return s&&o&&Ni(t,e,o),o};const Do={base:{fontFamily:"Noto Sans, sans-serif",radius:"4px",transition:"all 0.15s ease-in-out"},variants:{default:{borderColor:"#e0e0e0",focusBorderColor:"#2b2b2b"},success:{borderColor:"#2e7d32",focusBorderColor:"#2e7d32"},error:{borderColor:"#c62828",focusBorderColor:"#c62828"},info:{borderColor:"#1565c0",focusBorderColor:"#1565c0"}},sizes:{sm:{boxSize:"32px",fontSize:"14px"},md:{boxSize:"40px",fontSize:"16px"},lg:{boxSize:"48px",fontSize:"18px"}},states:{disabled:{borderColor:"#ededed",color:"#cdcbcb",backgroundColor:"#f5f5f5"}}};let q=class extends _{constructor(){super(...arguments),this.numDigits=6,this.otpStyle="tarmac-01",this.otpSize="md",this.otpVariant="default",this.isDisabled=!1,this.placeholder="",this.inputType="text",this.label="",this.helperText="",this.value="",this._digits=[],this._cfg=Do}connectedCallback(){super.connectedCallback(),this._digits=Array.from({length:this.numDigits},(t,e)=>this.value[e]||""),this._resolve(),this._unsub=B(this,()=>{this._resolve(),this.requestUpdate()})}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._unsub)==null||t.call(this)}_resolve(){var e;const t=E(this);this._cfg=((e=t==null?void 0:t.components)==null?void 0:e.otp_tarmac)||Do}updated(t){(t.has("numDigits")||t.has("value"))&&(this._digits=Array.from({length:this.numDigits},(e,s)=>this.value[s]||""))}render(){var m,C,k,w,T;const t=this._cfg,e=((m=t.variants)==null?void 0:m[this.otpVariant])||((C=t.variants)==null?void 0:C.default)||{},s=((k=t.sizes)==null?void 0:k[this.otpSize])||((w=t.sizes)==null?void 0:w.md)||{},o=t.base||{},n=((T=t.states)==null?void 0:T.disabled)||{},r=o.fontFamily||"Noto Sans, sans-serif",c=o.radius||"4px",l=o.transition||"all 0.15s ease-in-out",d=s.boxSize||"40px",b=s.fontSize||"16px";let p,g,u;this.isDisabled?(p=n.borderColor||"#ededed",g=n.backgroundColor||"#f5f5f5",u=n.color||"#cdcbcb"):(p=e.borderColor||"#e0e0e0",g="#fff",u="#2b2b2b");const x=e.focusBorderColor||"#2b2b2b",y=this.otpVariant==="error"?"#c62828":this.otpVariant==="success"?"#2e7d32":"#6b6b6b",v=this.inputType==="number"?"tel":this.inputType;return h`
      <style>
        :host { display: block; font-family: ${r}; }
        .otp-wrapper { display: flex; flex-direction: column; gap: 4px; }
        .label { font-size: 12px; line-height: 16px; color: #6b6b6b; font-weight: 500; }
        .helper-text { font-size: 12px; line-height: 16px; color: ${y}; }
        .otp-row { display: flex; gap: 8px; }
        .otp-box {
          width: ${d}; height: ${d}; border: 1px solid ${p}; border-radius: ${c};
          background-color: ${g}; color: ${u}; font-family: ${r}; font-size: ${b};
          text-align: center; outline: none; transition: ${l}; box-sizing: border-box;
        }
        .otp-box:focus { border-color: ${this.isDisabled?p:x}; }
        .otp-box:disabled { cursor: not-allowed; }
      </style>
      <div class="otp-wrapper">
        ${this.label?h`<div class="label">${this.label}</div>`:f}
        <div class="otp-row">
          ${this._digits.map(($,D)=>h`
            <input
              class="otp-box"
              type=${v}
              maxlength="1"
              .value=${$}
              placeholder=${this.placeholder?this.placeholder[0]||"":f}
              ?disabled=${this.isDisabled}
              @input=${O=>this._onDigitInput(O,D)}
              @keydown=${O=>this._onKeyDown(O,D)}
              @paste=${O=>this._onPaste(O,D)}
            />
          `)}
        </div>
        ${this.helperText?h`<div class="helper-text">${this.helperText}</div>`:f}
      </div>
    `}_getInputs(){var t;return Array.from(((t=this.shadowRoot)==null?void 0:t.querySelectorAll(".otp-box"))||[])}_onDigitInput(t,e){var o;const s=t.target.value.slice(-1);this._digits=[...this._digits],this._digits[e]=s,this.value=this._digits.join(""),this.dispatchEvent(new CustomEvent("tarmac-change",{bubbles:!0,composed:!0,detail:{value:this.value}})),s&&e<this.numDigits-1&&((o=this._getInputs()[e+1])==null||o.focus()),this.value.length===this.numDigits&&!this._digits.includes("")&&this.dispatchEvent(new CustomEvent("tarmac-complete",{bubbles:!0,composed:!0,detail:{value:this.value}})),this.requestUpdate()}_onKeyDown(t,e){var s;if(t.key==="Backspace"&&!this._digits[e]&&e>0){const o=this._getInputs();this._digits=[...this._digits],this._digits[e-1]="",this.value=this._digits.join(""),(s=o[e-1])==null||s.focus(),this.requestUpdate()}}_onPaste(t,e){var r,c;t.preventDefault();const s=((r=t.clipboardData)==null?void 0:r.getData("text"))||"";this._digits=[...this._digits];for(let l=0;l<s.length&&e+l<this.numDigits;l++)this._digits[e+l]=s[l];this.value=this._digits.join(""),this.dispatchEvent(new CustomEvent("tarmac-change",{bubbles:!0,composed:!0,detail:{value:this.value}})),this.value.length===this.numDigits&&!this._digits.includes("")&&this.dispatchEvent(new CustomEvent("tarmac-complete",{bubbles:!0,composed:!0,detail:{value:this.value}}));const o=this._getInputs(),n=Math.min(e+s.length,this.numDigits-1);(c=o[n])==null||c.focus(),this.requestUpdate()}};K([a({type:Number,attribute:"num-digits"})],q.prototype,"numDigits",2);K([a({type:String,attribute:"otp-style"})],q.prototype,"otpStyle",2);K([a({type:String,attribute:"otp-size"})],q.prototype,"otpSize",2);K([a({type:String,attribute:"otp-variant"})],q.prototype,"otpVariant",2);K([a({type:Boolean,attribute:"is-disabled"})],q.prototype,"isDisabled",2);K([a({type:String})],q.prototype,"placeholder",2);K([a({type:String,attribute:"input-type"})],q.prototype,"inputType",2);K([a({type:String})],q.prototype,"label",2);K([a({type:String,attribute:"helper-text"})],q.prototype,"helperText",2);K([a({type:String})],q.prototype,"value",2);K([Q()],q.prototype,"_digits",2);q=K([z("tarmac-otp-input")],q);var Li=Object.defineProperty,Ui=Object.getOwnPropertyDescriptor,Bt=(i,t,e,s)=>{for(var o=s>1?void 0:s?Ui(t,e):t,n=i.length-1,r;n>=0;n--)(r=i[n])&&(o=(s?r(t,e,o):r(o))||o);return s&&o&&Li(t,e,o),o};const Oo={base:{fontFamily:"Noto Sans, sans-serif",radius:"8px",overlayBg:"rgba(0,0,0,0.45)",shadow:"0 4px 24px rgba(0,0,0,0.15)",transition:"all 0.2s ease-in-out"},sizes:{sm:{maxWidth:"400px"},md:{maxWidth:"520px"},lg:{maxWidth:"720px"}}},Wi='<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';let bt=class extends _{constructor(){super(...arguments),this.isOpen=!1,this.size="md",this.title="",this.closable=!0,this.maskClosable=!0,this.width="",this.centered=!1,this._cfg=Oo,this._onEsc=t=>{t.key==="Escape"&&this.isOpen&&this.closable&&this._close()}}connectedCallback(){super.connectedCallback(),this._resolve(),this._unsub=B(this,()=>{this._resolve(),this.requestUpdate()}),document.addEventListener("keydown",this._onEsc)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._unsub)==null||t.call(this),document.removeEventListener("keydown",this._onEsc)}_resolve(){var e;const t=E(this);this._cfg=((e=t==null?void 0:t.components)==null?void 0:e.modal_tarmac)||Oo}render(){var d,b;if(!this.isOpen)return f;const t=this._cfg,e=t.base||{},s=((d=t.sizes)==null?void 0:d[this.size])||((b=t.sizes)==null?void 0:b.md)||{},o=e.fontFamily||"Noto Sans, sans-serif",n=e.radius||"8px",r=e.overlayBg||"rgba(0,0,0,0.45)",c=e.shadow||"0 4px 24px rgba(0,0,0,0.15)",l=this.width||s.maxWidth||"520px";return h`
      <style>
        :host { display: contents; }
        .overlay {
          position: fixed; inset: 0; z-index: 1000; display: flex;
          align-items: ${this.centered?"center":"flex-start"};
          justify-content: center; padding: ${this.centered?"0":"80px 0"};
          background: ${r}; font-family: ${o};
        }
        .container {
          background: #fff; border-radius: ${n}; box-shadow: ${c};
          width: 90%; max-width: ${l}; max-height: 80vh; display: flex; flex-direction: column;
          overflow: hidden; animation: modalIn 0.2s ease-out;
        }
        @keyframes modalIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        .header {
          display: flex; align-items: center; justify-content: space-between;
          padding: 16px 24px; border-bottom: 1px solid #e6e6e6;
        }
        .title { font-size: 16px; line-height: 24px; font-weight: 600; color: #2b2b2b; margin: 0; }
        .close-btn {
          background: none; border: none; cursor: pointer; padding: 4px; color: #6b6b6b;
          display: flex; align-items: center; justify-content: center; border-radius: 4px;
        }
        .close-btn:hover { background: #f5f5f5; }
        .body { padding: 24px; overflow-y: auto; flex: 1; }
        .footer { padding: 16px 24px; border-top: 1px solid #e6e6e6; }
      </style>
      <div class="overlay" @click=${this._onOverlayClick}>
        <div class="container" role="dialog" aria-modal="true" aria-label=${this.title||"Modal"} @click=${p=>p.stopPropagation()}>
          ${this.title||this.closable?h`
            <div class="header">
              <h2 class="title">${this.title}</h2>
              ${this.closable?h`<button class="close-btn" aria-label="Close" @click=${this._close}><span .innerHTML=${Wi}></span></button>`:f}
            </div>
          `:f}
          <div class="body"><slot></slot></div>
          <div class="footer"><slot name="footer"></slot></div>
        </div>
      </div>
    `}_onOverlayClick(){this.maskClosable&&this._close()}_close(){this.dispatchEvent(new CustomEvent("tarmac-close",{bubbles:!0,composed:!0}))}};Bt([a({type:Boolean,attribute:"is-open"})],bt.prototype,"isOpen",2);Bt([a({type:String})],bt.prototype,"size",2);Bt([a({type:String})],bt.prototype,"title",2);Bt([a({type:Boolean})],bt.prototype,"closable",2);Bt([a({type:Boolean,attribute:"mask-closable"})],bt.prototype,"maskClosable",2);Bt([a({type:String})],bt.prototype,"width",2);Bt([a({type:Boolean})],bt.prototype,"centered",2);bt=Bt([z("tarmac-modal")],bt);var Mi=Object.defineProperty,qi=Object.getOwnPropertyDescriptor,mt=(i,t,e,s)=>{for(var o=s>1?void 0:s?qi(t,e):t,n=i.length-1,r;n>=0;n--)(r=i[n])&&(o=(s?r(t,e,o):r(o))||o);return s&&o&&Mi(t,e,o),o};const Fo={base:{fontFamily:"Noto Sans, sans-serif",radius:"8px",shadow:"0 4px 16px rgba(0,0,0,0.12)"},variants:{success:{accentColor:"#1ba86e"},error:{accentColor:"#dc143c"},warning:{accentColor:"#f5c828"},info:{accentColor:"#2396fb"},default:{accentColor:"#2b2b2b"}}},Gi='<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';let it=class extends _{constructor(){super(...arguments),this.message="",this.title="",this.variant="default",this.size="md",this.duration=3e3,this.closable=!1,this.position="top-right",this._visible=!0,this._cfg=Fo}connectedCallback(){super.connectedCallback(),this._resolve(),this._unsub=B(this,()=>{this._resolve(),this.requestUpdate()}),this._startTimer()}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._unsub)==null||t.call(this),this._clearTimer()}_resolve(){var e;const t=E(this);this._cfg=((e=t==null?void 0:t.components)==null?void 0:e.toast_tarmac)||Fo}updated(t){t.has("duration")&&(this._clearTimer(),this._startTimer())}_startTimer(){this.duration>0&&(this._timer=setTimeout(()=>{this._visible=!1,this._emitClose()},this.duration))}_clearTimer(){this._timer&&(clearTimeout(this._timer),this._timer=void 0)}render(){var g,u;if(!this._visible)return f;const t=this._cfg,e=t.base||{},s=((g=t.variants)==null?void 0:g[this.variant])||((u=t.variants)==null?void 0:u.default)||{},o=e.fontFamily||"Noto Sans, sans-serif",n=e.radius||"8px",r=e.shadow||"0 4px 16px rgba(0,0,0,0.12)",c=s.accentColor||"#2b2b2b",l=this.size==="sm"?"8px 12px":this.size==="lg"?"16px 20px":"12px 16px",d=this.size==="sm"?"12px":this.size==="lg"?"16px":"14px",b=this.size==="sm"?"12px":this.size==="lg"?"14px":"13px";let p="";switch(this.position){case"top-right":p="top:16px;right:16px;";break;case"top-left":p="top:16px;left:16px;";break;case"bottom-right":p="bottom:16px;right:16px;";break;case"bottom-left":p="bottom:16px;left:16px;";break;case"top":p="top:16px;left:50%;transform:translateX(-50%);";break;case"bottom":p="bottom:16px;left:50%;transform:translateX(-50%);";break}return h`
      <style>
        :host { display: contents; }
        .toast {
          position: fixed; ${p} z-index: 1100;
          display: flex; align-items: flex-start; gap: 12px;
          background: #fff; border-left: 4px solid ${c};
          border-radius: ${n}; box-shadow: ${r};
          padding: ${l}; font-family: ${o};
          min-width: 280px; max-width: 420px;
          animation: toastIn 0.25s ease-out;
        }
        @keyframes toastIn { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
        .icon-slot { display: flex; align-items: center; color: ${c}; flex-shrink: 0; }
        .icon-slot ::slotted(*) { width: 20px; height: 20px; }
        .content { flex: 1; display: flex; flex-direction: column; gap: 2px; }
        .title { font-size: ${d}; font-weight: 600; color: #2b2b2b; line-height: 1.4; }
        .message { font-size: ${b}; color: #6b6b6b; line-height: 1.4; }
        .close-btn {
          background: none; border: none; cursor: pointer; padding: 2px; color: #6b6b6b;
          display: flex; align-items: center; flex-shrink: 0;
        }
        .close-btn:hover { color: #2b2b2b; }
      </style>
      <div class="toast" role="alert">
        <span class="icon-slot"><slot name="icon"></slot></span>
        <div class="content">
          ${this.title?h`<div class="title">${this.title}</div>`:f}
          ${this.message?h`<div class="message">${this.message}</div>`:f}
        </div>
        ${this.closable?h`<button class="close-btn" aria-label="Close" @click=${this._handleClose}><span .innerHTML=${Gi}></span></button>`:f}
      </div>
    `}_handleClose(){this._clearTimer(),this._visible=!1,this._emitClose()}_emitClose(){this.dispatchEvent(new CustomEvent("tarmac-close",{bubbles:!0,composed:!0}))}};mt([a({type:String})],it.prototype,"message",2);mt([a({type:String})],it.prototype,"title",2);mt([a({type:String})],it.prototype,"variant",2);mt([a({type:String})],it.prototype,"size",2);mt([a({type:Number})],it.prototype,"duration",2);mt([a({type:Boolean})],it.prototype,"closable",2);mt([a({type:String})],it.prototype,"position",2);mt([Q()],it.prototype,"_visible",2);it=mt([z("tarmac-toast")],it);var Vi=Object.defineProperty,Ii=Object.getOwnPropertyDescriptor,G=(i,t,e,s)=>{for(var o=s>1?void 0:s?Ii(t,e):t,n=i.length-1,r;n>=0;n--)(r=i[n])&&(o=(s?r(t,e,o):r(o))||o);return s&&o&&Vi(t,e,o),o};const Ao={base:{fontFamily:"Noto Sans, sans-serif",radius:"8px",shadow:"0 4px 16px rgba(0,0,0,0.12)"},variants:{white:{backgroundColor:"#ffffff",textColor:"#2b2b2b"},black:{backgroundColor:"#2b2b2b",textColor:"#ffffff"},coal:{backgroundColor:"#64739b",textColor:"#ffffff"},success:{backgroundColor:"#1ba86e",textColor:"#ffffff"},error:{backgroundColor:"#dc143c",textColor:"#ffffff"},info:{backgroundColor:"#2396fb",textColor:"#ffffff"},warning:{backgroundColor:"#f5c828",textColor:"#2b2b2b"}}},Ki='<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';let L=class extends _{constructor(){super(...arguments),this.message="",this.title="",this.variant="black",this.snackbarStyle="singleText",this.size="lg",this.trailingIcon=!1,this.ctAs=!1,this.denyText="",this.approveText="",this.duration=5e3,this.position="bottom",this._visible=!0,this._cfg=Ao}connectedCallback(){super.connectedCallback(),this._resolve(),this._unsub=B(this,()=>{this._resolve(),this.requestUpdate()}),this._startTimer()}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._unsub)==null||t.call(this),this._clearTimer()}_resolve(){var e;const t=E(this);this._cfg=((e=t==null?void 0:t.components)==null?void 0:e.snackbar_tarmac)||Ao}updated(t){t.has("duration")&&(this._clearTimer(),this._startTimer())}_startTimer(){this.duration>0&&(this._timer=setTimeout(()=>{this._visible=!1,this._emitClose()},this.duration))}_clearTimer(){this._timer&&(clearTimeout(this._timer),this._timer=void 0)}render(){var u,x;if(!this._visible)return f;const t=this._cfg,e=t.base||{},s=((u=t.variants)==null?void 0:u[this.variant])||((x=t.variants)==null?void 0:x.black)||{},o=e.fontFamily||"Noto Sans, sans-serif",n=e.radius||"8px",r=e.shadow||"0 4px 16px rgba(0,0,0,0.12)",c=s.backgroundColor||"#2b2b2b",l=s.textColor||"#ffffff",d=this.size==="sm"?"8px 12px":"12px 16px",b=this.size==="sm"?"12px":"14px",p=this.snackbarStyle==="dualText";let g="";switch(this.position){case"top-right":g="top:16px;right:16px;";break;case"top-left":g="top:16px;left:16px;";break;case"bottom-right":g="bottom:16px;right:16px;";break;case"bottom-left":g="bottom:16px;left:16px;";break;case"top":g="top:16px;left:50%;transform:translateX(-50%);";break;case"bottom":g="bottom:16px;left:50%;transform:translateX(-50%);";break}return h`
      <style>
        :host { display: contents; }
        .snackbar {
          position: fixed; ${g} z-index: 1100;
          display: flex; align-items: center; gap: 12px;
          background: ${c}; color: ${l};
          border-radius: ${n}; box-shadow: ${r};
          padding: ${d}; font-family: ${o};
          min-width: 280px; max-width: 560px;
          animation: snackIn 0.25s ease-out;
        }
        @keyframes snackIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        .icon-slot { display: flex; align-items: center; flex-shrink: 0; }
        .icon-slot ::slotted(*) { width: 20px; height: 20px; }
        .content { flex: 1; display: flex; flex-direction: column; gap: 2px; }
        .title { font-size: ${b}; font-weight: 600; line-height: 1.4; }
        .message { font-size: ${b}; line-height: 1.4; opacity: ${p?"0.8":"1"}; }
        .actions { display: flex; gap: 8px; align-items: center; flex-shrink: 0; }
        .action-btn {
          background: none; border: 1px solid ${l}40; color: ${l};
          border-radius: 4px; padding: 4px 12px; font-size: 12px; font-weight: 500;
          cursor: pointer; font-family: ${o};
        }
        .action-btn:hover { background: ${l}15; }
        .close-btn {
          background: none; border: none; cursor: pointer; padding: 2px; color: ${l};
          display: flex; align-items: center; flex-shrink: 0; opacity: 0.7;
        }
        .close-btn:hover { opacity: 1; }
      </style>
      <div class="snackbar" role="alert">
        <span class="icon-slot"><slot name="leading-icon"></slot></span>
        <div class="content">
          ${p&&this.title?h`<div class="title">${this.title}</div>`:f}
          ${this.message?h`<div class="message">${this.message}</div>`:f}
        </div>
        ${this.ctAs?h`
          <div class="actions">
            ${this.denyText?h`<button class="action-btn" @click=${this._handleDeny}>${this.denyText}</button>`:f}
            ${this.approveText?h`<button class="action-btn" @click=${this._handleApprove}>${this.approveText}</button>`:f}
          </div>
        `:f}
        ${this.trailingIcon?h`<button class="close-btn" aria-label="Close" @click=${this._handleClose}><span .innerHTML=${Ki}></span></button>`:f}
      </div>
    `}_handleClose(){this._clearTimer(),this._visible=!1,this._emitClose()}_handleDeny(){this.dispatchEvent(new CustomEvent("tarmac-deny",{bubbles:!0,composed:!0}))}_handleApprove(){this.dispatchEvent(new CustomEvent("tarmac-approve",{bubbles:!0,composed:!0}))}_emitClose(){this.dispatchEvent(new CustomEvent("tarmac-close",{bubbles:!0,composed:!0}))}};G([a({type:String})],L.prototype,"message",2);G([a({type:String})],L.prototype,"title",2);G([a({type:String})],L.prototype,"variant",2);G([a({type:String,attribute:"snackbar-style"})],L.prototype,"snackbarStyle",2);G([a({type:String})],L.prototype,"size",2);G([a({type:Boolean,attribute:"trailing-icon"})],L.prototype,"trailingIcon",2);G([a({type:Boolean,attribute:"ct-as"})],L.prototype,"ctAs",2);G([a({type:String,attribute:"deny-text"})],L.prototype,"denyText",2);G([a({type:String,attribute:"approve-text"})],L.prototype,"approveText",2);G([a({type:Number})],L.prototype,"duration",2);G([a({type:String})],L.prototype,"position",2);G([Q()],L.prototype,"_visible",2);L=G([z("tarmac-snackbar")],L);var Xi=Object.defineProperty,Yi=Object.getOwnPropertyDescriptor,Tt=(i,t,e,s)=>{for(var o=s>1?void 0:s?Yi(t,e):t,n=i.length-1,r;n>=0;n--)(r=i[n])&&(o=(s?r(t,e,o):r(o))||o);return s&&o&&Xi(t,e,o),o};const Po={base:{fontFamily:"Noto Sans, sans-serif",radius:"4px",shadow:"0 2px 8px rgba(0,0,0,0.15)",arrowSize:"6px"},variants:{white:{backgroundColor:"#ffffff",textColor:"#2b2b2b"},black:{backgroundColor:"#2b2b2b",textColor:"#ffffff"},coal:{backgroundColor:"#64739b",textColor:"#ffffff"}},sizes:{sm:{padding:"4px 8px",fontSize:"12px"},md:{padding:"8px 12px",fontSize:"13px"},lg:{padding:"12px 16px",fontSize:"14px"}}};let ut=class extends _{constructor(){super(...arguments),this.content="",this.placement="top",this.trigger="hover",this.variant="black",this.size="md",this.visible=!1,this._show=!1,this._cfg=Po}connectedCallback(){super.connectedCallback(),this._resolve(),this._unsub=B(this,()=>{this._resolve(),this.requestUpdate()}),this.visible&&(this._show=!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._unsub)==null||t.call(this)}_resolve(){var e;const t=E(this);this._cfg=((e=t==null?void 0:t.components)==null?void 0:e.tooltip_tarmac)||Po}updated(t){t.has("visible")&&(this._show=this.visible)}render(){var v,m,C,k;const t=this._cfg,e=t.base||{},s=((v=t.variants)==null?void 0:v[this.variant])||((m=t.variants)==null?void 0:m.black)||{},o=((C=t.sizes)==null?void 0:C[this.size])||((k=t.sizes)==null?void 0:k.md)||{},n=e.fontFamily||"Noto Sans, sans-serif",r=e.radius||"4px",c=e.shadow||"0 2px 8px rgba(0,0,0,0.15)",l=e.arrowSize||"6px",d=s.backgroundColor||"#2b2b2b",b=s.textColor||"#ffffff",p=o.padding||"8px 12px",g=o.fontSize||"13px",u=this.placement.split("-")[0];let x="",y="";switch(u){case"top":x="bottom: 100%; left: 50%; transform: translateX(-50%); margin-bottom: 8px;",y=`bottom: -${l}; left: 50%; transform: translateX(-50%); border-left: ${l} solid transparent; border-right: ${l} solid transparent; border-top: ${l} solid ${d};`;break;case"bottom":x="top: 100%; left: 50%; transform: translateX(-50%); margin-top: 8px;",y=`top: -${l}; left: 50%; transform: translateX(-50%); border-left: ${l} solid transparent; border-right: ${l} solid transparent; border-bottom: ${l} solid ${d};`;break;case"left":x="right: 100%; top: 50%; transform: translateY(-50%); margin-right: 8px;",y=`right: -${l}; top: 50%; transform: translateY(-50%); border-top: ${l} solid transparent; border-bottom: ${l} solid transparent; border-left: ${l} solid ${d};`;break;case"right":x="left: 100%; top: 50%; transform: translateY(-50%); margin-left: 8px;",y=`left: -${l}; top: 50%; transform: translateY(-50%); border-top: ${l} solid transparent; border-bottom: ${l} solid transparent; border-right: ${l} solid ${d};`;break}return h`
      <style>
        :host { display: inline-block; position: relative; }
        .trigger { display: inline-block; }
        .tooltip-container {
          position: absolute; ${x} z-index: 1000;
          background: ${d}; color: ${b};
          border-radius: ${r}; box-shadow: ${c};
          padding: ${p}; font-family: ${n}; font-size: ${g};
          line-height: 1.4; white-space: nowrap; pointer-events: none;
          opacity: ${this._show?"1":"0"};
          visibility: ${this._show?"visible":"hidden"};
          transition: opacity 0.15s ease-in-out, visibility 0.15s ease-in-out;
        }
        .arrow { position: absolute; width: 0; height: 0; ${y} }
      </style>
      <div class="trigger"
        @mouseenter=${this.trigger==="hover"?this._onShow:f}
        @mouseleave=${this.trigger==="hover"?this._onHide:f}
        @click=${this.trigger==="click"?this._onToggle:f}
        @focusin=${this.trigger==="focus"?this._onShow:f}
        @focusout=${this.trigger==="focus"?this._onHide:f}
      >
        <slot></slot>
      </div>
      ${this.content?h`
        <div class="tooltip-container" role="tooltip">
          ${this.content}
          <span class="arrow"></span>
        </div>
      `:f}
    `}_onShow(){this._show=!0,this._emitChange()}_onHide(){this._show=!1,this._emitChange()}_onToggle(){this._show=!this._show,this._emitChange()}_emitChange(){this.dispatchEvent(new CustomEvent("tarmac-visible-change",{bubbles:!0,composed:!0,detail:{visible:this._show}}))}};Tt([a({type:String})],ut.prototype,"content",2);Tt([a({type:String})],ut.prototype,"placement",2);Tt([a({type:String})],ut.prototype,"trigger",2);Tt([a({type:String})],ut.prototype,"variant",2);Tt([a({type:String})],ut.prototype,"size",2);Tt([a({type:Boolean})],ut.prototype,"visible",2);Tt([Q()],ut.prototype,"_show",2);ut=Tt([z("tarmac-tooltip")],ut);var Ji=Object.defineProperty,Zi=Object.getOwnPropertyDescriptor,Dt=(i,t,e,s)=>{for(var o=s>1?void 0:s?Zi(t,e):t,n=i.length-1,r;n>=0;n--)(r=i[n])&&(o=(s?r(t,e,o):r(o))||o);return s&&o&&Ji(t,e,o),o};const jo={base:{fontFamily:"Noto Sans, sans-serif",radius:"8px",overlayBg:"rgba(0,0,0,0.45)",shadow:"0 4px 24px rgba(0,0,0,0.15)"},sizes:{xs:{maxWidth:"320px"},sm:{maxWidth:"400px"},md:{maxWidth:"520px"},lg:{maxWidth:"640px"},xl:{maxWidth:"800px"}}},Qi='<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';let gt=class extends _{constructor(){super(...arguments),this.isOpen=!1,this.size="md",this.title="",this.subtext="",this.showFooter=!1,this.closeOnOverlay=!0,this.closeOnEsc=!0,this._cfg=jo,this._onEsc=i=>{i.key==="Escape"&&this.isOpen&&this.closeOnEsc&&this._close()}}connectedCallback(){super.connectedCallback(),this._resolve(),this._unsub=B(this,()=>{this._resolve(),this.requestUpdate()}),document.addEventListener("keydown",this._onEsc)}disconnectedCallback(){var i;super.disconnectedCallback(),(i=this._unsub)==null||i.call(this),document.removeEventListener("keydown",this._onEsc)}_resolve(){var t;const i=E(this);this._cfg=((t=i==null?void 0:i.components)==null?void 0:t.popup_tarmac)||jo}render(){var l,d;if(!this.isOpen)return f;const i=this._cfg,t=i.base||{},e=((l=i.sizes)==null?void 0:l[this.size])||((d=i.sizes)==null?void 0:d.md)||{},s=t.fontFamily||"Noto Sans, sans-serif",o=t.radius||"8px",n=t.overlayBg||"rgba(0,0,0,0.45)",r=t.shadow||"0 4px 24px rgba(0,0,0,0.15)",c=e.maxWidth||"520px";return h`
      <style>
        :host { display: contents; }
        .overlay {
          position: fixed; inset: 0; z-index: 1000; display: flex;
          align-items: center; justify-content: center;
          background: ${n}; font-family: ${s};
        }
        .container {
          background: #fff; border-radius: ${o}; box-shadow: ${r};
          width: 90%; max-width: ${c}; max-height: 80vh; display: flex; flex-direction: column;
          overflow: hidden; animation: popupIn 0.2s ease-out;
        }
        @keyframes popupIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        .header {
          display: flex; align-items: flex-start; justify-content: space-between;
          padding: 16px 24px; border-bottom: 1px solid #e6e6e6;
        }
        .header-content { display: flex; flex-direction: column; gap: 4px; flex: 1; }
        .header-row { display: flex; align-items: center; gap: 8px; }
        .title { font-size: 16px; line-height: 24px; font-weight: 600; color: #2b2b2b; margin: 0; }
        .subtext { font-size: 13px; line-height: 18px; color: #6b6b6b; }
        .close-btn {
          background: none; border: none; cursor: pointer; padding: 4px; color: #6b6b6b;
          display: flex; align-items: center; border-radius: 4px; flex-shrink: 0;
        }
        .close-btn:hover { background: #f5f5f5; }
        .icon-slot { display: flex; align-items: center; }
        .icon-slot ::slotted(*) { width: 20px; height: 20px; }
        .body { padding: 24px; overflow-y: auto; flex: 1; }
        .footer { padding: 16px 24px; border-top: 1px solid #e6e6e6; }
      </style>
      <div class="overlay" @click=${this._onOverlayClick}>
        <div class="container" role="dialog" aria-modal="true" aria-label=${this.title||"Popup"} @click=${b=>b.stopPropagation()}>
          <div class="header">
            <div class="header-content">
              <div class="header-row">
                <span class="icon-slot"><slot name="leading-icon"></slot></span>
                <h2 class="title">${this.title}</h2>
              </div>
              ${this.subtext?h`<div class="subtext">${this.subtext}</div>`:f}
            </div>
            <span class="icon-slot"><slot name="trailing-icon"></slot></span>
            <button class="close-btn" aria-label="Close" @click=${this._close}><span .innerHTML=${Qi}></span></button>
          </div>
          <div class="body"><slot></slot></div>
          ${this.showFooter?h`<div class="footer"><slot name="footer"></slot></div>`:f}
        </div>
      </div>
    `}_onOverlayClick(){this.closeOnOverlay&&this._close()}_close(){this.dispatchEvent(new CustomEvent("tarmac-close",{bubbles:!0,composed:!0}))}};Dt([a({type:Boolean,attribute:"is-open"})],gt.prototype,"isOpen",2);Dt([a({type:String})],gt.prototype,"size",2);Dt([a({type:String})],gt.prototype,"title",2);Dt([a({type:String})],gt.prototype,"subtext",2);Dt([a({type:Boolean,attribute:"show-footer"})],gt.prototype,"showFooter",2);Dt([a({type:Boolean,attribute:"close-on-overlay"})],gt.prototype,"closeOnOverlay",2);Dt([a({type:Boolean,attribute:"close-on-esc"})],gt.prototype,"closeOnEsc",2);gt=Dt([z("tarmac-popup")],gt);var tr=Object.defineProperty,er=Object.getOwnPropertyDescriptor,V=(i,t,e,s)=>{for(var o=s>1?void 0:s?er(t,e):t,n=i.length-1,r;n>=0;n--)(r=i[n])&&(o=(s?r(t,e,o):r(o))||o);return s&&o&&tr(t,e,o),o};const Ho={base:{fontFamily:"Noto Sans, sans-serif",radius:"8px",overlayBg:"rgba(0,0,0,0.45)",shadow:"0 4px 24px rgba(0,0,0,0.15)"}},or='<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';let U=class extends _{constructor(){super(...arguments),this.isOpen=!1,this.type="standard",this.size="web",this.title="",this.subtext="",this.heading="",this.description="",this.showHeader=!0,this.showFooter=!0,this.showCheckbox=!1,this.checkboxLabel="",this.checkboxChecked=!1,this._cfg=Ho,this._onEsc=i=>{i.key==="Escape"&&this.isOpen&&this._close()}}connectedCallback(){super.connectedCallback(),this._resolve(),this._unsub=B(this,()=>{this._resolve(),this.requestUpdate()}),document.addEventListener("keydown",this._onEsc)}disconnectedCallback(){var i;super.disconnectedCallback(),(i=this._unsub)==null||i.call(this),document.removeEventListener("keydown",this._onEsc)}_resolve(){var t;const i=E(this);this._cfg=((t=i==null?void 0:i.components)==null?void 0:t.dialog_box_tarmac)||Ho}render(){if(!this.isOpen)return f;const i=this._cfg.base||{},t=i.fontFamily||"Noto Sans, sans-serif",e=i.radius||"8px",s=i.overlayBg||"rgba(0,0,0,0.45)",o=i.shadow||"0 4px 24px rgba(0,0,0,0.15)",n=this.size==="mobile";return h`
      <style>
        :host { display: contents; }
        .overlay {
          position: fixed; inset: 0; z-index: 1000; display: flex;
          align-items: ${n?"flex-end":"center"}; justify-content: center;
          background: ${s}; font-family: ${t};
        }
        .container {
          background: #fff; border-radius: ${n?`${e} ${e} 0 0`:e};
          box-shadow: ${o}; display: flex; flex-direction: column; overflow: hidden;
          width: ${n?"100%":"90%"}; max-width: ${n?"100%":"480px"};
          max-height: 80vh; animation: dialogIn 0.2s ease-out;
        }
        @keyframes dialogIn { from { opacity: 0; transform: ${n?"translateY(20px)":"scale(0.95)"}; } to { opacity: 1; transform: ${n?"translateY(0)":"scale(1)"}; } }
        .header {
          display: flex; align-items: flex-start; justify-content: space-between;
          padding: 16px 24px; border-bottom: 1px solid #e6e6e6;
        }
        .header-content { display: flex; flex-direction: column; gap: 4px; }
        .title { font-size: 16px; line-height: 24px; font-weight: 600; color: #2b2b2b; margin: 0; }
        .subtext { font-size: 13px; line-height: 18px; color: #6b6b6b; }
        .close-btn {
          background: none; border: none; cursor: pointer; padding: 4px; color: #6b6b6b;
          display: flex; align-items: center; border-radius: 4px;
        }
        .close-btn:hover { background: #f5f5f5; }
        .body { padding: 24px; overflow-y: auto; flex: 1; }
        .illustration { padding: 16px 24px; display: flex; justify-content: center; }
        .snackbar-slot { padding: 0 24px; }
        .heading { font-size: 16px; font-weight: 600; color: #2b2b2b; margin: 0 0 8px; }
        .description { font-size: 14px; line-height: 20px; color: #6b6b6b; }
        .checkbox-row { display: flex; align-items: center; gap: 8px; padding: 12px 24px; }
        .checkbox-label { font-size: 14px; color: #2b2b2b; cursor: pointer; }
        .footer { padding: 16px 24px; border-top: 1px solid #e6e6e6; }
      </style>
      <div class="overlay" @click=${this._onOverlayClick}>
        <div class="container" role="dialog" aria-modal="true" aria-label=${this.title||"Dialog"} @click=${r=>r.stopPropagation()}>
          ${this.showHeader?h`
            <div class="header">
              <div class="header-content">
                ${this.title?h`<h2 class="title">${this.title}</h2>`:f}
                ${this.subtext?h`<div class="subtext">${this.subtext}</div>`:f}
              </div>
              <button class="close-btn" aria-label="Close" @click=${this._close}><span .innerHTML=${or}></span></button>
            </div>
          `:f}
          <div class="illustration"><slot name="illustration"></slot></div>
          <div class="snackbar-slot"><slot name="snackbar"></slot></div>
          <div class="body">
            ${this.heading?h`<h3 class="heading">${this.heading}</h3>`:f}
            ${this.description?h`<p class="description">${this.description}</p>`:f}
            <slot></slot>
          </div>
          ${this.showCheckbox?h`
            <label class="checkbox-row">
              <input type="checkbox" .checked=${this.checkboxChecked} @change=${this._onCheckbox} />
              <span class="checkbox-label">${this.checkboxLabel}</span>
            </label>
          `:f}
          ${this.showFooter?h`<div class="footer"><slot name="footer"></slot></div>`:f}
        </div>
      </div>
    `}_onOverlayClick(){this._close()}_close(){this.dispatchEvent(new CustomEvent("tarmac-close",{bubbles:!0,composed:!0}))}_onCheckbox(i){const t=i.target.checked;this.checkboxChecked=t,this.dispatchEvent(new CustomEvent("tarmac-checkbox-change",{bubbles:!0,composed:!0,detail:{checked:t}}))}};V([a({type:Boolean,attribute:"is-open"})],U.prototype,"isOpen",2);V([a({type:String})],U.prototype,"type",2);V([a({type:String})],U.prototype,"size",2);V([a({type:String})],U.prototype,"title",2);V([a({type:String})],U.prototype,"subtext",2);V([a({type:String})],U.prototype,"heading",2);V([a({type:String})],U.prototype,"description",2);V([a({type:Boolean,attribute:"show-header"})],U.prototype,"showHeader",2);V([a({type:Boolean,attribute:"show-footer"})],U.prototype,"showFooter",2);V([a({type:Boolean,attribute:"show-checkbox"})],U.prototype,"showCheckbox",2);V([a({type:String,attribute:"checkbox-label"})],U.prototype,"checkboxLabel",2);V([a({type:Boolean,attribute:"checkbox-checked"})],U.prototype,"checkboxChecked",2);U=V([z("tarmac-dialog-box")],U);var sr=Object.defineProperty,ir=Object.getOwnPropertyDescriptor,me=(i,t,e,s)=>{for(var o=s>1?void 0:s?ir(t,e):t,n=i.length-1,r;n>=0;n--)(r=i[n])&&(o=(s?r(t,e,o):r(o))||o);return s&&o&&sr(t,e,o),o};const No={base:{fontFamily:"Noto Sans, sans-serif",overlayBg:"rgba(0,0,0,0.45)",shadow:"-4px 0 24px rgba(0,0,0,0.15)",transition:"transform 0.3s ease-in-out"},variants:{narrow:{width:"400px"},extended:{width:"640px"}}};let Zt=class extends _{constructor(){super(...arguments),this.isOpen=!1,this.variant="narrow",this.closeOnOverlay=!0,this.closeOnEsc=!0,this._cfg=No,this._onEsc=i=>{i.key==="Escape"&&this.isOpen&&this.closeOnEsc&&this._close()}}connectedCallback(){super.connectedCallback(),this._resolve(),this._unsub=B(this,()=>{this._resolve(),this.requestUpdate()}),document.addEventListener("keydown",this._onEsc)}disconnectedCallback(){var i;super.disconnectedCallback(),(i=this._unsub)==null||i.call(this),document.removeEventListener("keydown",this._onEsc)}_resolve(){var t;const i=E(this);this._cfg=((t=i==null?void 0:i.components)==null?void 0:t.side_drawer_tarmac)||No}render(){var c,l;if(!this.isOpen)return f;const i=this._cfg,t=i.base||{},e=((c=i.variants)==null?void 0:c[this.variant])||((l=i.variants)==null?void 0:l.narrow)||{},s=t.fontFamily||"Noto Sans, sans-serif",o=t.overlayBg||"rgba(0,0,0,0.45)",n=t.shadow||"-4px 0 24px rgba(0,0,0,0.15)",r=e.width||"400px";return h`
      <style>
        :host { display: contents; }
        .overlay {
          position: fixed; inset: 0; z-index: 1000;
          background: ${o}; font-family: ${s};
          animation: overlayIn 0.2s ease-out;
        }
        @keyframes overlayIn { from { opacity: 0; } to { opacity: 1; } }
        .drawer {
          position: fixed; top: 0; right: 0; bottom: 0; z-index: 1001;
          width: ${r}; max-width: 90vw; background: #fff;
          box-shadow: ${n}; overflow-y: auto;
          animation: slideIn 0.3s ease-out;
        }
        @keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
      </style>
      <div class="overlay" @click=${this._onOverlayClick}></div>
      <div class="drawer" role="dialog" aria-modal="true">
        <slot></slot>
      </div>
    `}_onOverlayClick(){this.closeOnOverlay&&this._close()}_close(){this.dispatchEvent(new CustomEvent("tarmac-close",{bubbles:!0,composed:!0}))}};me([a({type:Boolean,attribute:"is-open"})],Zt.prototype,"isOpen",2);me([a({type:String})],Zt.prototype,"variant",2);me([a({type:Boolean,attribute:"close-on-overlay"})],Zt.prototype,"closeOnOverlay",2);me([a({type:Boolean,attribute:"close-on-esc"})],Zt.prototype,"closeOnEsc",2);Zt=me([z("tarmac-side-drawer")],Zt);var rr=Object.defineProperty,nr=Object.getOwnPropertyDescriptor,De=(i,t,e,s)=>{for(var o=s>1?void 0:s?nr(t,e):t,n=i.length-1,r;n>=0;n--)(r=i[n])&&(o=(s?r(t,e,o):r(o))||o);return s&&o&&rr(t,e,o),o};const Ro={base:{fontFamily:"Noto Sans, sans-serif",borderColor:"#e6e6e6",radius:"4px",transition:"all 0.2s ease-in-out",headerPadding:"12px",contentPadding:"12px",headerFontSize:"14px",headerLineHeight:"20px"}},ar='<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>';let fe=class extends _{constructor(){super(...arguments),this.accordion=!1,this.activeKey="",this._openKeys=new Set,this._cfg=Ro}connectedCallback(){super.connectedCallback(),this.activeKey&&(this._openKeys=new Set(this.activeKey.split(",").map(t=>t.trim()))),this._resolve(),this._unsub=B(this,()=>{this._resolve(),this.requestUpdate()})}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._unsub)==null||t.call(this)}_resolve(){var e;const t=E(this);this._cfg=((e=t==null?void 0:t.components)==null?void 0:e.collapse_tarmac)||Ro}updated(t){t.has("activeKey")&&this.activeKey&&(this._openKeys=new Set(this.activeKey.split(",").map(e=>e.trim())))}render(){const t=this._cfg.base||{},e=t.fontFamily||"Noto Sans, sans-serif",s=t.borderColor||"#e6e6e6",o=t.radius||"4px",n=t.transition||"all 0.2s ease-in-out",r=t.headerPadding||"12px",c=t.contentPadding||"12px",l=t.headerFontSize||"14px",d=t.headerLineHeight||"20px",b=Array.from(this.children).filter(p=>p.hasAttribute("data-key"));return h`
      <style>
        :host { display: block; font-family: ${e}; }
        .collapse { border: 1px solid ${s}; border-radius: ${o}; overflow: hidden; }
        .panel { border-bottom: 1px solid ${s}; }
        .panel:last-child { border-bottom: none; }
        .panel-header {
          display: flex; align-items: center; justify-content: space-between;
          padding: ${r}; cursor: pointer; user-select: none;
          font-size: ${l}; line-height: ${d};
          font-weight: 500; color: #2b2b2b; background: #fff;
        }
        .panel-header:hover { background: #fafafa; }
        .chevron { display: flex; align-items: center; transition: ${n}; color: #6b6b6b; }
        .chevron.open { transform: rotate(180deg); }
        .panel-content {
          overflow: hidden; max-height: 0; transition: max-height 0.2s ease-in-out;
        }
        .panel-content.open { max-height: 1000px; }
        .panel-content-inner { padding: ${c}; border-top: 1px solid ${s}; }
      </style>
      <div class="collapse">
        ${b.map(p=>{const g=p.getAttribute("data-key")||"",u=p.getAttribute("data-title")||g,x=this._openKeys.has(g);return h`
            <div class="panel">
              <div class="panel-header" @click=${()=>this._togglePanel(g)}>
                <span>${u}</span>
                <span class="chevron ${x?"open":""}" .innerHTML=${ar}></span>
              </div>
              <div class="panel-content ${x?"open":""}">
                <div class="panel-content-inner"></div>
              </div>
            </div>
          `})}
        <div style="display:none;"><slot></slot></div>
      </div>
    `}_togglePanel(t){const e=new Set(this._openKeys);e.has(t)?e.delete(t):(this.accordion&&e.clear(),e.add(t)),this._openKeys=e,this.dispatchEvent(new CustomEvent("tarmac-change",{bubbles:!0,composed:!0,detail:{activeKey:Array.from(e).join(",")}}))}};De([a({type:Boolean})],fe.prototype,"accordion",2);De([a({type:String,attribute:"active-key"})],fe.prototype,"activeKey",2);De([Q()],fe.prototype,"_openKeys",2);fe=De([z("tarmac-collapse")],fe);var lr=Object.defineProperty,cr=Object.getOwnPropertyDescriptor,ve=(i,t,e,s)=>{for(var o=s>1?void 0:s?cr(t,e):t,n=i.length-1,r;n>=0;n--)(r=i[n])&&(o=(s?r(t,e,o):r(o))||o);return s&&o&&lr(t,e,o),o};const Lo={base:{size:"56px",shadow:"0 4px 12px rgba(0,0,0,0.2)",transition:"all 0.2s ease-in-out"},variants:{light:{backgroundColor:"#ffffff",iconColor:"#2b2b2b"},dark:{backgroundColor:"#2b2b2b",iconColor:"#ffffff"},"info-blue":{backgroundColor:"#2396fb",iconColor:"#ffffff"}}},dr='<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>';let Qt=class extends _{constructor(){super(...arguments),this.position="bottom-right",this.variant="light",this.positionMode="fixed",this._isOpen=!1,this._cfg=Lo}connectedCallback(){super.connectedCallback(),this._resolve(),this._unsub=B(this,()=>{this._resolve(),this.requestUpdate()})}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._unsub)==null||t.call(this)}_resolve(){var e;const t=E(this);this._cfg=((e=t==null?void 0:t.components)==null?void 0:e.fab_tarmac)||Lo}render(){var p,g;const t=this._cfg,e=t.base||{},s=((p=t.variants)==null?void 0:p[this.variant])||((g=t.variants)==null?void 0:g.light)||{},o=e.size||"56px",n=e.shadow||"0 4px 12px rgba(0,0,0,0.2)",r=e.transition||"all 0.2s ease-in-out",c=s.backgroundColor||"#ffffff",l=s.iconColor||"#2b2b2b";let d="";switch(this.position){case"bottom-right":d="bottom: 24px; right: 24px;";break;case"bottom-left":d="bottom: 24px; left: 24px;";break;case"top-right":d="top: 24px; right: 24px;";break;case"top-left":d="top: 24px; left: 24px;";break}const b=this.position.startsWith("bottom");return h`
      <style>
        :host { display: contents; }
        .fab-wrapper {
          position: ${this.positionMode}; ${d} z-index: 900;
          display: flex; flex-direction: ${b?"column-reverse":"column"}; align-items: center; gap: 8px;
        }
        .fab-trigger {
          width: ${o}; height: ${o}; border-radius: 50%;
          background: ${c}; color: ${l};
          border: none; cursor: pointer; box-shadow: ${n};
          display: flex; align-items: center; justify-content: center;
          transition: ${r}; padding: 0;
        }
        .fab-trigger:hover { box-shadow: 0 6px 16px rgba(0,0,0,0.25); }
        .fab-trigger.open { transform: rotate(45deg); }
        .fab-trigger ::slotted(*) { width: 24px; height: 24px; }
        .fab-menu {
          display: ${this._isOpen?"flex":"none"};
          flex-direction: column; gap: 8px; align-items: center;
          animation: menuIn 0.2s ease-out;
        }
        @keyframes menuIn { from { opacity: 0; transform: scale(0.8); } to { opacity: 1; transform: scale(1); } }
      </style>
      <div class="fab-wrapper">
        <button class="fab-trigger ${this._isOpen?"open":""}" @click=${this._toggle} aria-label="Toggle menu">
          <slot name="trigger"><span .innerHTML=${dr}></span></slot>
        </button>
        <div class="fab-menu">
          <slot name="menu"></slot>
        </div>
      </div>
    `}_toggle(){this._isOpen=!this._isOpen,this.dispatchEvent(new CustomEvent("tarmac-toggle",{bubbles:!0,composed:!0,detail:{isOpen:this._isOpen}}))}};ve([a({type:String})],Qt.prototype,"position",2);ve([a({type:String})],Qt.prototype,"variant",2);ve([a({type:String,attribute:"position-mode"})],Qt.prototype,"positionMode",2);ve([Q()],Qt.prototype,"_isOpen",2);Qt=ve([z("tarmac-fab")],Qt);var pr=Object.defineProperty,hr=Object.getOwnPropertyDescriptor,oe=(i,t,e,s)=>{for(var o=s>1?void 0:s?hr(t,e):t,n=i.length-1,r;n>=0;n--)(r=i[n])&&(o=(s?r(t,e,o):r(o))||o);return s&&o&&pr(t,e,o),o};const Uo={base:{fontFamily:"Noto Sans, sans-serif",radius:"8px",shadow:"0 4px 16px rgba(0,0,0,0.12)",arrowSize:"8px"},variants:{white:{backgroundColor:"#ffffff",textColor:"#2b2b2b",descriptionColor:"#6b6b6b"},black:{backgroundColor:"#2b2b2b",textColor:"#ffffff",descriptionColor:"#b3b1b1"}},sizes:{sm:{width:"264px"},lg:{width:"300px"}}};let Nt=class extends _{constructor(){super(...arguments),this.variant="white",this.size="lg",this.arrowPosition="bottom-center",this.title="",this.description="",this._cfg=Uo}connectedCallback(){super.connectedCallback(),this._resolve(),this._unsub=B(this,()=>{this._resolve(),this.requestUpdate()})}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._unsub)==null||t.call(this)}_resolve(){var e;const t=E(this);this._cfg=((e=t==null?void 0:t.components)==null?void 0:e.coachmarks_tarmac)||Uo}render(){var m,C,k,w;const t=this._cfg,e=t.base||{},s=((m=t.variants)==null?void 0:m[this.variant])||((C=t.variants)==null?void 0:C.white)||{},o=((k=t.sizes)==null?void 0:k[this.size])||((w=t.sizes)==null?void 0:w.lg)||{},n=e.fontFamily||"Noto Sans, sans-serif",r=e.radius||"8px",c=e.shadow||"0 4px 16px rgba(0,0,0,0.12)",l=e.arrowSize||"8px",d=s.backgroundColor||"#ffffff",b=s.textColor||"#2b2b2b",p=s.descriptionColor||"#6b6b6b",g=o.width||"300px",[u,x]=this.arrowPosition.split("-");let y="";const v=x==="start"?"16px":x==="end"?"calc(100% - 24px)":"50%";switch(u){case"top":y=`top: -${l}; left: ${v}; transform: translateX(-50%); border-left: ${l} solid transparent; border-right: ${l} solid transparent; border-bottom: ${l} solid ${d};`;break;case"bottom":y=`bottom: -${l}; left: ${v}; transform: translateX(-50%); border-left: ${l} solid transparent; border-right: ${l} solid transparent; border-top: ${l} solid ${d};`;break;case"left":y=`left: -${l}; top: ${v}; transform: translateY(-50%); border-top: ${l} solid transparent; border-bottom: ${l} solid transparent; border-right: ${l} solid ${d};`;break;case"right":y=`right: -${l}; top: ${v}; transform: translateY(-50%); border-top: ${l} solid transparent; border-bottom: ${l} solid transparent; border-left: ${l} solid ${d};`;break}return h`
      <style>
        :host { display: inline-block; position: relative; }
        .coachmark {
          width: ${g}; background: ${d}; color: ${b};
          border-radius: ${r}; box-shadow: ${c};
          padding: 16px; font-family: ${n}; position: relative;
        }
        .arrow { position: absolute; width: 0; height: 0; ${y} }
        .image-slot { margin-bottom: 12px; }
        .image-slot ::slotted(*) { width: 100%; border-radius: 4px; }
        .title { font-size: 14px; font-weight: 600; line-height: 20px; margin: 0 0 4px; color: ${b}; }
        .description { font-size: 13px; line-height: 18px; color: ${p}; margin: 0 0 12px; }
        .badges-slot { margin-bottom: 12px; }
        .ctas-slot { display: flex; gap: 8px; }
      </style>
      <div class="coachmark">
        <span class="arrow"></span>
        <div class="image-slot"><slot name="image"></slot></div>
        ${this.title?h`<h4 class="title">${this.title}</h4>`:f}
        ${this.description?h`<p class="description">${this.description}</p>`:f}
        <div class="badges-slot"><slot name="badges"></slot></div>
        <div class="ctas-slot"><slot name="ctas"></slot></div>
      </div>
    `}};oe([a({type:String})],Nt.prototype,"variant",2);oe([a({type:String})],Nt.prototype,"size",2);oe([a({type:String,attribute:"arrow-position"})],Nt.prototype,"arrowPosition",2);oe([a({type:String})],Nt.prototype,"title",2);oe([a({type:String})],Nt.prototype,"description",2);Nt=oe([z("tarmac-coachmarks")],Nt);var br=Object.defineProperty,ur=Object.getOwnPropertyDescriptor,qe=(i,t,e,s)=>{for(var o=s>1?void 0:s?ur(t,e):t,n=i.length-1,r;n>=0;n--)(r=i[n])&&(o=(s?r(t,e,o):r(o))||o);return s&&o&&br(t,e,o),o};const Wo={base:{fontFamily:"Noto Sans, sans-serif",borderColor:"#e6e6e6"}};let we=class extends _{constructor(){super(...arguments),this.orientation="horizontal",this.size="lg",this._cfg=Wo,this._onTabClick=t=>{const e=t.target.closest("tarmac-tab-cell");if(!e)return;const s=Array.from(this.querySelectorAll("tarmac-tab-cell")).indexOf(e);s>=0&&this.dispatchEvent(new CustomEvent("tarmac-tab-change",{bubbles:!0,composed:!0,detail:{index:s}}))}}connectedCallback(){super.connectedCallback(),this._resolve(),this._unsub=B(this,()=>{this._resolve(),this.requestUpdate()}),this.addEventListener("click",this._onTabClick)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._unsub)==null||t.call(this),this.removeEventListener("click",this._onTabClick)}_resolve(){var e;const t=E(this);this._cfg=((e=t==null?void 0:t.components)==null?void 0:e.tab_group_tarmac)||Wo}render(){const t=this._cfg.base||{},e=t.fontFamily||"Noto Sans, sans-serif",s=t.borderColor||"#e6e6e6",o=this.orientation==="horizontal";return h`
      <style>
        :host { display: block; font-family: ${e}; }
        .tab-group {
          display: flex;
          flex-direction: ${o?"row":"column"};
          ${o?`border-bottom: 1px solid ${s};`:`border-right: 1px solid ${s};`}
          gap: 0;
        }
        ::slotted(*) { cursor: pointer; }
      </style>
      <div class="tab-group" role="tablist" aria-orientation=${this.orientation}>
        <slot></slot>
      </div>
    `}};qe([a({type:String})],we.prototype,"orientation",2);qe([a({type:String})],we.prototype,"size",2);we=qe([z("tarmac-tab-group")],we);var gr=Object.defineProperty,fr=Object.getOwnPropertyDescriptor,se=(i,t,e,s)=>{for(var o=s>1?void 0:s?fr(t,e):t,n=i.length-1,r;n>=0;n--)(r=i[n])&&(o=(s?r(t,e,o):r(o))||o);return s&&o&&gr(t,e,o),o};const Mo={base:{fontFamily:"Noto Sans, sans-serif",radius:"4px",borderColor:"#e0e0e0",shadow:"0 4px 16px rgba(0,0,0,0.12)"}},xr='<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>';let Rt=class extends _{constructor(){super(...arguments),this.placeholder="Select",this.size="lg",this.options="[]",this._isOpen=!1,this._selected=new Set,this._cfg=Mo,this._parsedOptions=[],this._onDocClick=i=>{this._isOpen&&(i.composedPath().includes(this)||(this._isOpen=!1))}}connectedCallback(){super.connectedCallback(),this._resolve(),this._unsub=B(this,()=>{this._resolve(),this.requestUpdate()}),this._parseOptions(),document.addEventListener("click",this._onDocClick)}disconnectedCallback(){var i;super.disconnectedCallback(),(i=this._unsub)==null||i.call(this),document.removeEventListener("click",this._onDocClick)}_resolve(){var t;const i=E(this);this._cfg=((t=i==null?void 0:i.components)==null?void 0:t.filter_dropdown_tarmac)||Mo}updated(i){i.has("options")&&this._parseOptions()}_parseOptions(){try{this._parsedOptions=JSON.parse(this.options)}catch{this._parsedOptions=[]}}render(){const i=this._cfg.base||{},t=i.fontFamily||"Noto Sans, sans-serif",e=i.radius||"4px",s=i.borderColor||"#e0e0e0",o=i.shadow||"0 4px 16px rgba(0,0,0,0.12)",n=this.size==="sm"?"6px 10px":"8px 12px",r=this.size==="sm"?"13px":"14px",c=this._selected.size;return h`
      <style>
        :host { display: inline-block; position: relative; font-family: ${t}; }
        .trigger {
          display: flex; align-items: center; gap: 8px;
          border: 1px solid ${s}; border-radius: ${e};
          padding: ${n}; cursor: pointer; background: #fff;
          font-size: ${r}; color: #2b2b2b; user-select: none;
          min-width: 120px;
        }
        .trigger:hover { border-color: #b3b1b1; }
        .trigger-text { flex: 1; }
        .badge { background: #2396fb; color: #fff; border-radius: 10px; padding: 0 6px; font-size: 11px; font-weight: 600; line-height: 18px; }
        .chevron { display: flex; align-items: center; color: #6b6b6b; transition: transform 0.15s; }
        .chevron.open { transform: rotate(180deg); }
        .dropdown {
          position: absolute; top: 100%; left: 0; right: 0; margin-top: 4px;
          background: #fff; border: 1px solid ${s}; border-radius: ${e};
          box-shadow: ${o}; z-index: 100; max-height: 280px; display: flex; flex-direction: column;
        }
        .options { overflow-y: auto; flex: 1; padding: 4px 0; }
        .option {
          display: flex; align-items: center; gap: 8px; padding: 8px 12px;
          cursor: pointer; font-size: ${r}; color: #2b2b2b;
        }
        .option:hover { background: #f5f5f5; }
        .option.disabled { opacity: 0.5; cursor: default; pointer-events: none; }
        .option input { margin: 0; cursor: pointer; }
        .footer {
          display: flex; justify-content: space-between; padding: 8px 12px;
          border-top: 1px solid ${s};
        }
        .footer-btn {
          background: none; border: none; cursor: pointer; font-size: 13px;
          font-weight: 500; font-family: ${t}; padding: 4px 8px; border-radius: 4px;
        }
        .clear-btn { color: #6b6b6b; }
        .clear-btn:hover { background: #f5f5f5; }
        .apply-btn { color: #2396fb; }
        .apply-btn:hover { background: #eff8ff; }
      </style>
      <div class="trigger" @click=${this._toggleDropdown}>
        <span class="trigger-text">${this.placeholder}</span>
        ${c>0?h`<span class="badge">${c}</span>`:f}
        <span class="chevron ${this._isOpen?"open":""}" .innerHTML=${xr}></span>
      </div>
      ${this._isOpen?h`
        <div class="dropdown">
          <div class="options">
            ${this._parsedOptions.map(l=>h`
              <label class="option ${l.disabled?"disabled":""}">
                <input type="checkbox" .checked=${this._selected.has(l.value)} ?disabled=${l.disabled} @change=${()=>this._toggleOption(l.value)} />
                <span>${l.label}</span>
              </label>
            `)}
          </div>
          <div class="footer">
            <button class="footer-btn clear-btn" @click=${this._clearAll}>Clear All</button>
            <button class="footer-btn apply-btn" @click=${this._apply}>Apply</button>
          </div>
        </div>
      `:f}
    `}_toggleDropdown(){this._isOpen=!this._isOpen}_toggleOption(i){const t=new Set(this._selected);t.has(i)?t.delete(i):t.add(i),this._selected=t,this.dispatchEvent(new CustomEvent("tarmac-change",{bubbles:!0,composed:!0,detail:{values:Array.from(t)}}))}_clearAll(){this._selected=new Set,this.dispatchEvent(new CustomEvent("tarmac-clear",{bubbles:!0,composed:!0}))}_apply(){this._isOpen=!1,this.dispatchEvent(new CustomEvent("tarmac-apply",{bubbles:!0,composed:!0,detail:{values:Array.from(this._selected)}}))}};se([a({type:String})],Rt.prototype,"placeholder",2);se([a({type:String})],Rt.prototype,"size",2);se([a({type:String})],Rt.prototype,"options",2);se([Q()],Rt.prototype,"_isOpen",2);se([Q()],Rt.prototype,"_selected",2);Rt=se([z("tarmac-filter-dropdown")],Rt);function yr(){return`:host {
${Object.entries(ts).map(([i,t])=>`  ${i}: ${t};`).join(`
`)}
}`}const mr=yr(),Se=class Se extends _{};Se.tokenStyles=Le(mr),Se.baseStyles=ze`
    :host {
      display: inline-block;
      box-sizing: border-box;
      font-family: 'Noto Sans', 'IBM Plex Sans', sans-serif;
    }

    :host *,
    :host *::before,
    :host *::after {
      box-sizing: border-box;
    }

    :host([hidden]) {
      display: none;
    }
  `;let qo=Se;const en={controls:{matchers:{color:/(background|color)$/i}},options:{storySort:{order:["Atoms","Form","Feedback","Overlay","Navigation","Layout","Action"]}}};export{en as parameters};
