(()=>{var Sv=Object.create;var Xc=Object.defineProperty;var bv=Object.getOwnPropertyDescriptor;var Ev=Object.getOwnPropertyNames;var Tv=Object.getPrototypeOf,Mv=Object.prototype.hasOwnProperty;var wv=i=>Xc(i,"__esModule",{value:!0});var Hd=(i,e)=>()=>(e||i((e={exports:{}}).exports,e),e.exports);var Cv=(i,e,t)=>{if(e&&typeof e=="object"||typeof e=="function")for(let n of Ev(e))!Mv.call(i,n)&&n!=="default"&&Xc(i,n,{get:()=>e[n],enumerable:!(t=bv(e,n))||t.enumerable});return i},Gd=i=>Cv(wv(Xc(i!=null?Sv(Tv(i)):{},"default",i&&i.__esModule&&"default"in i?{get:()=>i.default,enumerable:!0}:{value:i,enumerable:!0})),i);var gg=Hd((Zh,Kh)=>{(function(i,e){typeof Zh=="object"&&typeof Kh!="undefined"?Kh.exports=e():typeof define=="function"&&define.amd?define(e):i.Stats=e()})(Zh,function(){var i=function(){function e(h){return s.appendChild(h.dom),h}function t(h){for(var d=0;d<s.children.length;d++)s.children[d].style.display=d===h?"block":"none";n=h}var n=0,s=document.createElement("div");s.style.cssText="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000",s.addEventListener("click",function(h){h.preventDefault(),t(++n%s.children.length)},!1);var r=(performance||Date).now(),a=r,o=0,l=e(new i.Panel("FPS","#0ff","#002")),c=e(new i.Panel("MS","#0f0","#020"));if(self.performance&&self.performance.memory)var u=e(new i.Panel("MB","#f08","#201"));return t(0),{REVISION:16,dom:s,addPanel:e,showPanel:t,begin:function(){r=(performance||Date).now()},end:function(){o++;var h=(performance||Date).now();if(c.update(h-r,200),h>a+1e3&&(l.update(1e3*o/(h-a),100),a=h,o=0,u)){var d=performance.memory;u.update(d.usedJSHeapSize/1048576,d.jsHeapSizeLimit/1048576)}return h},update:function(){r=this.end()},domElement:s,setMode:t}};return i.Panel=function(e,t,n){var s=1/0,r=0,a=Math.round,o=a(window.devicePixelRatio||1),l=80*o,c=48*o,u=3*o,h=2*o,d=3*o,p=15*o,g=74*o,v=30*o,m=document.createElement("canvas");m.width=l,m.height=c,m.style.cssText="width:80px;height:48px";var f=m.getContext("2d");return f.font="bold "+9*o+"px Helvetica,Arial,sans-serif",f.textBaseline="top",f.fillStyle=n,f.fillRect(0,0,l,c),f.fillStyle=t,f.fillText(e,u,h),f.fillRect(d,p,g,v),f.fillStyle=n,f.globalAlpha=.9,f.fillRect(d,p,g,v),{dom:m,update:function(x,_){s=Math.min(s,x),r=Math.max(r,x),f.fillStyle=n,f.globalAlpha=1,f.fillRect(0,0,l,p),f.fillStyle=t,f.fillText(a(x)+" "+e+" ("+a(s)+"-"+a(r)+")",u,h),f.drawImage(m,d+o,p,g-o,v,d,p,g-o,v),f.fillRect(d+g-o,p,o,v),f.fillStyle=n,f.globalAlpha=.9,f.fillRect(d+g-o,p,o,a((1-x/_)*v))}}},i})});var U0=Hd((KR,F0)=>{function f0(i){return i instanceof Map?i.clear=i.delete=i.set=function(){throw new Error("map is read-only")}:i instanceof Set&&(i.add=i.clear=i.delete=function(){throw new Error("set is read-only")}),Object.freeze(i),Object.getOwnPropertyNames(i).forEach(e=>{let t=i[e],n=typeof t;(n==="object"||n==="function")&&!Object.isFrozen(t)&&f0(t)}),i}var Ed=class{constructor(e){e.data===void 0&&(e.data={}),this.data=e.data,this.isMatchIgnored=!1}ignoreMatch(){this.isMatchIgnored=!0}};function p0(i){return i.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}function zs(i,...e){let t=Object.create(null);for(let n in i)t[n]=i[n];return e.forEach(function(n){for(let s in n)t[s]=n[s]}),t}var RE="</span>",m0=i=>!!i.scope,DE=(i,{prefix:e})=>{if(i.startsWith("language:"))return i.replace("language:","language-");if(i.includes(".")){let t=i.split(".");return[`${e}${t.shift()}`,...t.map((n,s)=>`${n}${"_".repeat(s+1)}`)].join(" ")}return`${e}${i}`},g0=class{constructor(e,t){this.buffer="",this.classPrefix=t.classPrefix,e.walk(this)}addText(e){this.buffer+=p0(e)}openNode(e){if(!m0(e))return;let t=DE(e.scope,{prefix:this.classPrefix});this.span(t)}closeNode(e){!m0(e)||(this.buffer+=RE)}value(){return this.buffer}span(e){this.buffer+=`<span class="${e}">`}},v0=(i={})=>{let e={children:[]};return Object.assign(e,i),e},Uc=class{constructor(){this.rootNode=v0(),this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(e){this.top.children.push(e)}openNode(e){let t=v0({scope:e});this.add(t),this.stack.push(t)}closeNode(){if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}walk(e){return this.constructor._walk(e,this.rootNode)}static _walk(e,t){return typeof t=="string"?e.addText(t):t.children&&(e.openNode(t),t.children.forEach(n=>this._walk(e,n)),e.closeNode(t)),e}static _collapse(e){typeof e!="string"&&(!e.children||(e.children.every(t=>typeof t=="string")?e.children=[e.children.join("")]:e.children.forEach(t=>{Uc._collapse(t)})))}},x0=class extends Uc{constructor(e){super();this.options=e}addText(e){e!==""&&this.add(e)}startScope(e){this.openNode(e)}endScope(){this.closeNode()}__addSublanguage(e,t){let n=e.root;t&&(n.scope=`language:${t}`),this.add(n)}toHTML(){return new g0(this,this.options).value()}finalize(){return this.closeAllNodes(),!0}};function vo(i){return i?typeof i=="string"?i:i.source:null}function y0(i){return wr("(?=",i,")")}function PE(i){return wr("(?:",i,")*")}function IE(i){return wr("(?:",i,")?")}function wr(...i){return i.map(t=>vo(t)).join("")}function LE(i){let e=i[i.length-1];return typeof e=="object"&&e.constructor===Object?(i.splice(i.length-1,1),e):{}}function Td(...i){let e=LE(i);return"("+(e.capture?"":"?:")+i.map(n=>vo(n)).join("|")+")"}function A0(i){return new RegExp(i.toString()+"|").exec("").length-1}function FE(i,e){let t=i&&i.exec(e);return t&&t.index===0}var UE=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;function Md(i,{joinWith:e}){let t=0;return i.map(n=>{t+=1;let s=t,r=vo(n),a="";for(;r.length>0;){let o=UE.exec(r);if(!o){a+=r;break}a+=r.substring(0,o.index),r=r.substring(o.index+o[0].length),o[0][0]==="\\"&&o[1]?a+="\\"+String(Number(o[1])+s):(a+=o[0],o[0]==="("&&t++)}return a}).map(n=>`(${n})`).join(e)}var NE=/\b\B/,_0="[a-zA-Z]\\w*",wd="[a-zA-Z_]\\w*",S0="\\b\\d+(\\.\\d+)?",b0="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",E0="\\b(0b[01]+)",BE="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",OE=(i={})=>{let e=/^#![ ]*\//;return i.binary&&(i.begin=wr(e,/.*\b/,i.binary,/\b.*/)),zs({scope:"meta",begin:e,end:/$/,relevance:0,"on:begin":(t,n)=>{t.index!==0&&n.ignoreMatch()}},i)},xo={begin:"\\\\[\\s\\S]",relevance:0},kE={scope:"string",begin:"'",end:"'",illegal:"\\n",contains:[xo]},zE={scope:"string",begin:'"',end:'"',illegal:"\\n",contains:[xo]},HE={begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},Nc=function(i,e,t={}){let n=zs({scope:"comment",begin:i,end:e,contains:[]},t);n.contains.push({scope:"doctag",begin:"[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",end:/(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,excludeBegin:!0,relevance:0});let s=Td("I","a","is","so","us","to","at","if","in","it","on",/[A-Za-z]+['](d|ve|re|ll|t|s|n)/,/[A-Za-z]+[-][a-z]+/,/[A-Za-z][a-z]{2,}/);return n.contains.push({begin:wr(/[ ]+/,"(",s,/[.]?[:]?([.][ ]|[ ])/,"){3}")}),n},GE=Nc("//","$"),VE=Nc("/\\*","\\*/"),WE=Nc("#","$"),XE={scope:"number",begin:S0,relevance:0},YE={scope:"number",begin:b0,relevance:0},QE={scope:"number",begin:E0,relevance:0},qE={scope:"regexp",begin:/\/(?=[^/\n]*\/)/,end:/\/[gimuy]*/,contains:[xo,{begin:/\[/,end:/\]/,relevance:0,contains:[xo]}]},jE={scope:"title",begin:_0,relevance:0},ZE={scope:"title",begin:wd,relevance:0},KE={begin:"\\.\\s*"+wd,relevance:0},JE=function(i){return Object.assign(i,{"on:begin":(e,t)=>{t.data._beginMatch=e[1]},"on:end":(e,t)=>{t.data._beginMatch!==e[1]&&t.ignoreMatch()}})},Bc=Object.freeze({__proto__:null,APOS_STRING_MODE:kE,BACKSLASH_ESCAPE:xo,BINARY_NUMBER_MODE:QE,BINARY_NUMBER_RE:E0,COMMENT:Nc,C_BLOCK_COMMENT_MODE:VE,C_LINE_COMMENT_MODE:GE,C_NUMBER_MODE:YE,C_NUMBER_RE:b0,END_SAME_AS_BEGIN:JE,HASH_COMMENT_MODE:WE,IDENT_RE:_0,MATCH_NOTHING_RE:NE,METHOD_GUARD:KE,NUMBER_MODE:XE,NUMBER_RE:S0,PHRASAL_WORDS_MODE:HE,QUOTE_STRING_MODE:zE,REGEXP_MODE:qE,RE_STARTERS_RE:BE,SHEBANG:OE,TITLE_MODE:jE,UNDERSCORE_IDENT_RE:wd,UNDERSCORE_TITLE_MODE:ZE});function $E(i,e){i.input[i.index-1]==="."&&e.ignoreMatch()}function eT(i,e){i.className!==void 0&&(i.scope=i.className,delete i.className)}function tT(i,e){!e||!i.beginKeywords||(i.begin="\\b("+i.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",i.__beforeBegin=$E,i.keywords=i.keywords||i.beginKeywords,delete i.beginKeywords,i.relevance===void 0&&(i.relevance=0))}function nT(i,e){!Array.isArray(i.illegal)||(i.illegal=Td(...i.illegal))}function iT(i,e){if(!!i.match){if(i.begin||i.end)throw new Error("begin & end are not supported with match");i.begin=i.match,delete i.match}}function sT(i,e){i.relevance===void 0&&(i.relevance=1)}var rT=(i,e)=>{if(!i.beforeMatch)return;if(i.starts)throw new Error("beforeMatch cannot be used with starts");let t=Object.assign({},i);Object.keys(i).forEach(n=>{delete i[n]}),i.keywords=t.keywords,i.begin=wr(t.beforeMatch,y0(t.begin)),i.starts={relevance:0,contains:[Object.assign(t,{endsParent:!0})]},i.relevance=0,delete t.beforeMatch},aT=["of","and","for","in","not","or","if","then","parent","list","value"],oT="keyword";function T0(i,e,t=oT){let n=Object.create(null);return typeof i=="string"?s(t,i.split(" ")):Array.isArray(i)?s(t,i):Object.keys(i).forEach(function(r){Object.assign(n,T0(i[r],e,r))}),n;function s(r,a){e&&(a=a.map(o=>o.toLowerCase())),a.forEach(function(o){let l=o.split("|");n[l[0]]=[r,lT(l[0],l[1])]})}}function lT(i,e){return e?Number(e):cT(i)?0:1}function cT(i){return aT.includes(i.toLowerCase())}var M0={},Cr=i=>{console.error(i)},w0=(i,...e)=>{console.log(`WARN: ${i}`,...e)},Ea=(i,e)=>{M0[`${i}/${e}`]||(console.log(`Deprecated as of ${i}. ${e}`),M0[`${i}/${e}`]=!0)},Oc=new Error;function C0(i,e,{key:t}){let n=0,s=i[t],r={},a={};for(let o=1;o<=e.length;o++)a[o+n]=s[o],r[o+n]=!0,n+=A0(e[o-1]);i[t]=a,i[t]._emit=r,i[t]._multi=!0}function uT(i){if(!!Array.isArray(i.begin)){if(i.skip||i.excludeBegin||i.returnBegin)throw Cr("skip, excludeBegin, returnBegin not compatible with beginScope: {}"),Oc;if(typeof i.beginScope!="object"||i.beginScope===null)throw Cr("beginScope must be object"),Oc;C0(i,i.begin,{key:"beginScope"}),i.begin=Md(i.begin,{joinWith:""})}}function hT(i){if(!!Array.isArray(i.end)){if(i.skip||i.excludeEnd||i.returnEnd)throw Cr("skip, excludeEnd, returnEnd not compatible with endScope: {}"),Oc;if(typeof i.endScope!="object"||i.endScope===null)throw Cr("endScope must be object"),Oc;C0(i,i.end,{key:"endScope"}),i.end=Md(i.end,{joinWith:""})}}function dT(i){i.scope&&typeof i.scope=="object"&&i.scope!==null&&(i.beginScope=i.scope,delete i.scope)}function fT(i){dT(i),typeof i.beginScope=="string"&&(i.beginScope={_wrap:i.beginScope}),typeof i.endScope=="string"&&(i.endScope={_wrap:i.endScope}),uT(i),hT(i)}function pT(i){function e(a,o){return new RegExp(vo(a),"m"+(i.case_insensitive?"i":"")+(i.unicodeRegex?"u":"")+(o?"g":""))}class t{constructor(){this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}addRule(o,l){l.position=this.position++,this.matchIndexes[this.matchAt]=l,this.regexes.push([l,o]),this.matchAt+=A0(o)+1}compile(){this.regexes.length===0&&(this.exec=()=>null);let o=this.regexes.map(l=>l[1]);this.matcherRe=e(Md(o,{joinWith:"|"}),!0),this.lastIndex=0}exec(o){this.matcherRe.lastIndex=this.lastIndex;let l=this.matcherRe.exec(o);if(!l)return null;let c=l.findIndex((h,d)=>d>0&&h!==void 0),u=this.matchIndexes[c];return l.splice(0,c),Object.assign(l,u)}}class n{constructor(){this.rules=[],this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(o){if(this.multiRegexes[o])return this.multiRegexes[o];let l=new t;return this.rules.slice(o).forEach(([c,u])=>l.addRule(c,u)),l.compile(),this.multiRegexes[o]=l,l}resumingScanAtSamePosition(){return this.regexIndex!==0}considerAll(){this.regexIndex=0}addRule(o,l){this.rules.push([o,l]),l.type==="begin"&&this.count++}exec(o){let l=this.getMatcher(this.regexIndex);l.lastIndex=this.lastIndex;let c=l.exec(o);if(this.resumingScanAtSamePosition()&&!(c&&c.index===this.lastIndex)){let u=this.getMatcher(0);u.lastIndex=this.lastIndex+1,c=u.exec(o)}return c&&(this.regexIndex+=c.position+1,this.regexIndex===this.count&&this.considerAll()),c}}function s(a){let o=new n;return a.contains.forEach(l=>o.addRule(l.begin,{rule:l,type:"begin"})),a.terminatorEnd&&o.addRule(a.terminatorEnd,{type:"end"}),a.illegal&&o.addRule(a.illegal,{type:"illegal"}),o}function r(a,o){let l=a;if(a.isCompiled)return l;[eT,iT,fT,rT].forEach(u=>u(a,o)),i.compilerExtensions.forEach(u=>u(a,o)),a.__beforeBegin=null,[tT,nT,sT].forEach(u=>u(a,o)),a.isCompiled=!0;let c=null;return typeof a.keywords=="object"&&a.keywords.$pattern&&(a.keywords=Object.assign({},a.keywords),c=a.keywords.$pattern,delete a.keywords.$pattern),c=c||/\w+/,a.keywords&&(a.keywords=T0(a.keywords,i.case_insensitive)),l.keywordPatternRe=e(c,!0),o&&(a.begin||(a.begin=/\B|\b/),l.beginRe=e(l.begin),!a.end&&!a.endsWithParent&&(a.end=/\B|\b/),a.end&&(l.endRe=e(l.end)),l.terminatorEnd=vo(l.end)||"",a.endsWithParent&&o.terminatorEnd&&(l.terminatorEnd+=(a.end?"|":"")+o.terminatorEnd)),a.illegal&&(l.illegalRe=e(a.illegal)),a.contains||(a.contains=[]),a.contains=[].concat(...a.contains.map(function(u){return mT(u==="self"?a:u)})),a.contains.forEach(function(u){r(u,l)}),a.starts&&r(a.starts,o),l.matcher=s(l),l}if(i.compilerExtensions||(i.compilerExtensions=[]),i.contains&&i.contains.includes("self"))throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");return i.classNameAliases=zs(i.classNameAliases||{}),r(i)}function R0(i){return i?i.endsWithParent||R0(i.starts):!1}function mT(i){return i.variants&&!i.cachedVariants&&(i.cachedVariants=i.variants.map(function(e){return zs(i,{variants:null},e)})),i.cachedVariants?i.cachedVariants:R0(i)?zs(i,{starts:i.starts?zs(i.starts):null}):Object.isFrozen(i)?zs(i):i}var gT="11.9.0",D0=class extends Error{constructor(e,t){super(e);this.name="HTMLInjectionError",this.html=t}},Cd=p0,P0=zs,I0=Symbol("nomatch"),vT=7,L0=function(i){let e=Object.create(null),t=Object.create(null),n=[],s=!0,r="Could not find the language '{}', did you forget to load/include a language module?",a={disableAutodetect:!0,name:"Plain text",contains:[]},o={ignoreUnescapedHTML:!1,throwUnescapedHTML:!1,noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",cssSelector:"pre code",languages:null,__emitter:x0};function l(I){return o.noHighlightRe.test(I)}function c(I){let P=I.className+" ";P+=I.parentNode?I.parentNode.className:"";let F=o.languageDetectRe.exec(P);if(F){let J=b(F[1]);return J||(w0(r.replace("{}",F[1])),w0("Falling back to no-highlight mode for this block.",I)),J?F[1]:"no-highlight"}return P.split(/\s+/).find(J=>l(J)||b(J))}function u(I,P,F){let J="",oe="";typeof P=="object"?(J=I,F=P.ignoreIllegals,oe=P.language):(Ea("10.7.0","highlight(lang, code, ...args) has been deprecated."),Ea("10.7.0",`Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277`),oe=I,J=P),F===void 0&&(F=!0);let _e={code:J,language:oe};G("before:highlight",_e);let ce=_e.result?_e.result:h(_e.language,_e.code,F);return ce.code=_e.code,G("after:highlight",ce),ce}function h(I,P,F,J){let oe=Object.create(null);function _e(j,K){return j.keywords[K]}function ce(){if(!pe.keywords){w.addText(A);return}let j=0;pe.keywordPatternRe.lastIndex=0;let K=pe.keywordPatternRe.exec(A),ae="";for(;K;){ae+=A.substring(j,K.index);let Ee=Be.case_insensitive?K[0].toLowerCase():K[0],re=_e(pe,Ee);if(re){let[me,Ue]=re;if(w.addText(ae),ae="",oe[Ee]=(oe[Ee]||0)+1,oe[Ee]<=vT&&(Y+=Ue),me.startsWith("_"))ae+=K[0];else{let Qe=Be.classNameAliases[me]||me;ie(K[0],Qe)}}else ae+=K[0];j=pe.keywordPatternRe.lastIndex,K=pe.keywordPatternRe.exec(A)}ae+=A.substring(j),w.addText(ae)}function X(){if(A==="")return;let j=null;if(typeof pe.subLanguage=="string"){if(!e[pe.subLanguage]){w.addText(A);return}j=h(pe.subLanguage,A,!0,ve[pe.subLanguage]),ve[pe.subLanguage]=j._top}else j=p(A,pe.subLanguage.length?pe.subLanguage:null);pe.relevance>0&&(Y+=j.relevance),w.__addSublanguage(j._emitter,j.language)}function Z(){pe.subLanguage!=null?X():ce(),A=""}function ie(j,K){j!==""&&(w.startScope(K),w.addText(j),w.endScope())}function he(j,K){let ae=1,Ee=K.length-1;for(;ae<=Ee;){if(!j._emit[ae]){ae++;continue}let re=Be.classNameAliases[j[ae]]||j[ae],me=K[ae];re?ie(me,re):(A=me,ce(),A=""),ae++}}function Le(j,K){return j.scope&&typeof j.scope=="string"&&w.openNode(Be.classNameAliases[j.scope]||j.scope),j.beginScope&&(j.beginScope._wrap?(ie(A,Be.classNameAliases[j.beginScope._wrap]||j.beginScope._wrap),A=""):j.beginScope._multi&&(he(j.beginScope,K),A="")),pe=Object.create(j,{parent:{value:pe}}),pe}function Ce(j,K,ae){let Ee=FE(j.endRe,ae);if(Ee){if(j["on:end"]){let re=new Ed(j);j["on:end"](K,re),re.isMatchIgnored&&(Ee=!1)}if(Ee){for(;j.endsParent&&j.parent;)j=j.parent;return j}}if(j.endsWithParent)return Ce(j.parent,K,ae)}function He(j){return pe.matcher.regexIndex===0?(A+=j[0],1):(te=!0,0)}function Je(j){let K=j[0],ae=j.rule,Ee=new Ed(ae),re=[ae.__beforeBegin,ae["on:begin"]];for(let me of re)if(!!me&&(me(j,Ee),Ee.isMatchIgnored))return He(K);return ae.skip?A+=K:(ae.excludeBegin&&(A+=K),Z(),!ae.returnBegin&&!ae.excludeBegin&&(A=K)),Le(ae,j),ae.returnBegin?0:K.length}function We(j){let K=j[0],ae=P.substring(j.index),Ee=Ce(pe,j,ae);if(!Ee)return I0;let re=pe;pe.endScope&&pe.endScope._wrap?(Z(),ie(K,pe.endScope._wrap)):pe.endScope&&pe.endScope._multi?(Z(),he(pe.endScope,j)):re.skip?A+=K:(re.returnEnd||re.excludeEnd||(A+=K),Z(),re.excludeEnd&&(A=K));do pe.scope&&w.closeNode(),!pe.skip&&!pe.subLanguage&&(Y+=pe.relevance),pe=pe.parent;while(pe!==Ee.parent);return Ee.starts&&Le(Ee.starts,j),re.returnEnd?0:K.length}function Ke(){let j=[];for(let K=pe;K!==Be;K=K.parent)K.scope&&j.unshift(K.scope);j.forEach(K=>w.openNode(K))}let L={};function Dt(j,K){let ae=K&&K[0];if(A+=j,ae==null)return Z(),0;if(L.type==="begin"&&K.type==="end"&&L.index===K.index&&ae===""){if(A+=P.slice(K.index,K.index+1),!s){let Ee=new Error(`0 width match regex (${I})`);throw Ee.languageName=I,Ee.badRule=L.rule,Ee}return 1}if(L=K,K.type==="begin")return Je(K);if(K.type==="illegal"&&!F){let Ee=new Error('Illegal lexeme "'+ae+'" for mode "'+(pe.scope||"<unnamed>")+'"');throw Ee.mode=pe,Ee}else if(K.type==="end"){let Ee=We(K);if(Ee!==I0)return Ee}if(K.type==="illegal"&&ae==="")return 1;if(se>1e5&&se>K.index*3)throw new Error("potential infinite loop, way more iterations than matches");return A+=ae,ae.length}let Be=b(I);if(!Be)throw Cr(r.replace("{}",I)),new Error('Unknown language: "'+I+'"');let qe=pT(Be),Fe="",pe=J||qe,ve={},w=new o.__emitter(o);Ke();let A="",Y=0,$=0,se=0,te=!1;try{if(Be.__emitTokens)Be.__emitTokens(P,w);else{for(pe.matcher.considerAll();;){se++,te?te=!1:pe.matcher.considerAll(),pe.matcher.lastIndex=$;let j=pe.matcher.exec(P);if(!j)break;let K=P.substring($,j.index),ae=Dt(K,j);$=j.index+ae}Dt(P.substring($))}return w.finalize(),Fe=w.toHTML(),{language:I,value:Fe,relevance:Y,illegal:!1,_emitter:w,_top:pe}}catch(j){if(j.message&&j.message.includes("Illegal"))return{language:I,value:Cd(P),illegal:!0,relevance:0,_illegalBy:{message:j.message,index:$,context:P.slice($-100,$+100),mode:j.mode,resultSoFar:Fe},_emitter:w};if(s)return{language:I,value:Cd(P),illegal:!1,relevance:0,errorRaised:j,_emitter:w,_top:pe};throw j}}function d(I){let P={value:Cd(I),illegal:!1,relevance:0,_top:a,_emitter:new o.__emitter(o)};return P._emitter.addText(I),P}function p(I,P){P=P||o.languages||Object.keys(e);let F=d(I),J=P.filter(b).filter(D).map(Z=>h(Z,I,!1));J.unshift(F);let oe=J.sort((Z,ie)=>{if(Z.relevance!==ie.relevance)return ie.relevance-Z.relevance;if(Z.language&&ie.language){if(b(Z.language).supersetOf===ie.language)return 1;if(b(ie.language).supersetOf===Z.language)return-1}return 0}),[_e,ce]=oe,X=_e;return X.secondBest=ce,X}function g(I,P,F){let J=P&&t[P]||F;I.classList.add("hljs"),I.classList.add(`language-${J}`)}function v(I){let P=null,F=c(I);if(l(F))return;if(G("before:highlightElement",{el:I,language:F}),I.dataset.highlighted){console.log("Element previously highlighted. To highlight again, first unset `dataset.highlighted`.",I);return}if(I.children.length>0&&(o.ignoreUnescapedHTML||(console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."),console.warn("https://github.com/highlightjs/highlight.js/wiki/security"),console.warn("The element with unescaped HTML:"),console.warn(I)),o.throwUnescapedHTML))throw new D0("One of your code blocks includes unescaped HTML.",I.innerHTML);P=I;let J=P.textContent,oe=F?u(J,{language:F,ignoreIllegals:!0}):p(J);I.innerHTML=oe.value,I.dataset.highlighted="yes",g(I,F,oe.language),I.result={language:oe.language,re:oe.relevance,relevance:oe.relevance},oe.secondBest&&(I.secondBest={language:oe.secondBest.language,relevance:oe.secondBest.relevance}),G("after:highlightElement",{el:I,result:oe,text:J})}function m(I){o=P0(o,I)}let f=()=>{y(),Ea("10.6.0","initHighlighting() deprecated.  Use highlightAll() now.")};function x(){y(),Ea("10.6.0","initHighlightingOnLoad() deprecated.  Use highlightAll() now.")}let _=!1;function y(){if(document.readyState==="loading"){_=!0;return}document.querySelectorAll(o.cssSelector).forEach(v)}function T(){_&&y()}typeof window!="undefined"&&window.addEventListener&&window.addEventListener("DOMContentLoaded",T,!1);function M(I,P){let F=null;try{F=P(i)}catch(J){if(Cr("Language definition for '{}' could not be registered.".replace("{}",I)),s)Cr(J);else throw J;F=a}F.name||(F.name=I),e[I]=F,F.rawDefinition=P.bind(null,i),F.aliases&&S(F.aliases,{languageName:I})}function R(I){delete e[I];for(let P of Object.keys(t))t[P]===I&&delete t[P]}function C(){return Object.keys(e)}function b(I){return I=(I||"").toLowerCase(),e[I]||e[t[I]]}function S(I,{languageName:P}){typeof I=="string"&&(I=[I]),I.forEach(F=>{t[F.toLowerCase()]=P})}function D(I){let P=b(I);return P&&!P.disableAutodetect}function U(I){I["before:highlightBlock"]&&!I["before:highlightElement"]&&(I["before:highlightElement"]=P=>{I["before:highlightBlock"](Object.assign({block:P.el},P))}),I["after:highlightBlock"]&&!I["after:highlightElement"]&&(I["after:highlightElement"]=P=>{I["after:highlightBlock"](Object.assign({block:P.el},P))})}function O(I){U(I),n.push(I)}function B(I){let P=n.indexOf(I);P!==-1&&n.splice(P,1)}function G(I,P){let F=I;n.forEach(function(J){J[F]&&J[F](P)})}function N(I){return Ea("10.7.0","highlightBlock will be removed entirely in v12.0"),Ea("10.7.0","Please use highlightElement now."),v(I)}Object.assign(i,{highlight:u,highlightAuto:p,highlightAll:y,highlightElement:v,highlightBlock:N,configure:m,initHighlighting:f,initHighlightingOnLoad:x,registerLanguage:M,unregisterLanguage:R,listLanguages:C,getLanguage:b,registerAliases:S,autoDetection:D,inherit:P0,addPlugin:O,removePlugin:B}),i.debugMode=function(){s=!1},i.safeMode=function(){s=!0},i.versionString=gT,i.regex={concat:wr,lookahead:y0,either:Td,optional:IE,anyNumberOfTimes:PE};for(let I in Bc)typeof Bc[I]=="object"&&f0(Bc[I]);return Object.assign(i,Bc),i},Ta=L0({});Ta.newInstance=()=>L0({});F0.exports=Ta;Ta.HighlightJS=Ta;Ta.default=Ta});var wi="172";var Vd=0,Yc=1,Wd=2;var Qc=1,Xd=2,Ci=3,Bn=0,sn=1,pn=2,Jt=0,Ys=1,qc=2,jc=3,Zc=4,Yd=5,vs=100,Qd=101,qd=102,jd=103,Zd=104,Kd=200,Jd=201,$d=202,ef=203,yo=204,Ao=205,tf=206,nf=207,sf=208,rf=209,af=210,of=211,lf=212,cf=213,uf=214,_o=0,So=1,bo=2,Qs=3,Eo=4,To=5,Mo=6,wo=7,Kc=0,hf=1,df=2,Hi=0,ff=1,pf=2,mf=3,gf=4,vf=5,xf=6,yf=7,Jc="attached",Af="detached",$c=300,qs=301,js=302,Co=303,Ro=304,Ca=306,xs=1e3,Ri=1001,Pr=1002,mn=1003,Do=1004;var Zs=1005;var $t=1006,Ir=1007;var pi=1008;var kt=1009,eu=1010,tu=1011,Lr=1012,Po=1013,Di=1014,On=1015,Fr=1016,Io=1017,Lo=1018,Gi=1020,nu=35902,iu=1021,su=1022,kn=1023,ru=1024,au=1025,Ks=1026,Vi=1027,Fo=1028,Uo=1029,ou=1030,No=1031;var Bo=1033,Ra=33776,Da=33777,Pa=33778,Ia=33779,Oo=35840,ko=35841,zo=35842,Ho=35843,Go=36196,Vo=37492,Wo=37496,Xo=37808,Yo=37809,Qo=37810,qo=37811,jo=37812,Zo=37813,Ko=37814,Jo=37815,$o=37816,el=37817,tl=37818,nl=37819,il=37820,sl=37821,La=36492,rl=36494,al=36495,lu=36283,ol=36284,ll=36285,cl=36286;var Js=2300,$s=2301,ul=2302,cu=2400,uu=2401,hu=2402,_f=2500;var du=0,Fa=1,Ur=2,mi=3200,fu=3201;var hl=0,Sf=1,zn="",nt="srgb",Wt="srgb-linear",Ua="linear",Ft="srgb";var er=7680;var pu=519,bf=512,Ef=513,Tf=514,mu=515,Mf=516,wf=517,Cf=518,Rf=519,dl=35044;var gu="300 es",gi=2e3,Na=2001,Dn=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;let n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;let s=this._listeners[e];if(s!==void 0){let r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;let n=this._listeners[e.type];if(n!==void 0){e.target=this;let s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}},xn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Df=1234567,Ba=Math.PI/180,tr=180/Math.PI;function vi(){let i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(xn[i&255]+xn[i>>8&255]+xn[i>>16&255]+xn[i>>24&255]+"-"+xn[e&255]+xn[e>>8&255]+"-"+xn[e>>16&15|64]+xn[e>>24&255]+"-"+xn[t&63|128]+xn[t>>8&255]+"-"+xn[t>>16&255]+xn[t>>24&255]+xn[n&255]+xn[n>>8&255]+xn[n>>16&255]+xn[n>>24&255]).toLowerCase()}function mt(i,e,t){return Math.max(e,Math.min(t,i))}function vu(i,e){return(i%e+e)%e}function Rv(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function Dv(i,e,t){return i!==e?(t-i)/(e-i):0}function Oa(i,e,t){return(1-t)*i+t*e}function Pv(i,e,t,n){return Oa(i,e,1-Math.exp(-t*n))}function Iv(i,e=1){return e-Math.abs(vu(i,e*2)-e)}function Lv(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function Fv(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function Uv(i,e){return i+Math.floor(Math.random()*(e-i+1))}function Nv(i,e){return i+Math.random()*(e-i)}function Bv(i){return i*(.5-Math.random())}function Ov(i){i!==void 0&&(Df=i);let e=Df+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function kv(i){return i*Ba}function zv(i){return i*tr}function Hv(i){return(i&i-1)==0&&i!==0}function Gv(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Vv(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Wv(i,e,t,n,s){let r=Math.cos,a=Math.sin,o=r(t/2),l=a(t/2),c=r((e+n)/2),u=a((e+n)/2),h=r((e-n)/2),d=a((e-n)/2),p=r((n-e)/2),g=a((n-e)/2);switch(s){case"XYX":i.set(o*u,l*h,l*d,o*c);break;case"YZY":i.set(l*d,o*u,l*h,o*c);break;case"ZXZ":i.set(l*h,l*d,o*u,o*c);break;case"XZX":i.set(o*u,l*g,l*p,o*c);break;case"YXY":i.set(l*p,o*u,l*g,o*c);break;case"ZYZ":i.set(l*g,l*p,o*u,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function xi(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Ut(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}var xu={DEG2RAD:Ba,RAD2DEG:tr,generateUUID:vi,clamp:mt,euclideanModulo:vu,mapLinear:Rv,inverseLerp:Dv,lerp:Oa,damp:Pv,pingpong:Iv,smoothstep:Lv,smootherstep:Fv,randInt:Uv,randFloat:Nv,randFloatSpread:Bv,seededRandom:Ov,degToRad:kv,radToDeg:zv,isPowerOfTwo:Hv,ceilPowerOfTwo:Gv,floorPowerOfTwo:Vv,setQuaternionFromProperEuler:Wv,normalize:Ut,denormalize:xi},Re=class{constructor(e=0,t=0){Re.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=mt(this.x,e.x,t.x),this.y=mt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=mt(this.x,e,t),this.y=mt(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(mt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(mt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},ot=class{constructor(e,t,n,s,r,a,o,l,c){ot.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c)}set(e,t,n,s,r,a,o,l,c){let u=this.elements;return u[0]=e,u[1]=s,u[2]=o,u[3]=t,u[4]=r,u[5]=l,u[6]=n,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],u=n[4],h=n[7],d=n[2],p=n[5],g=n[8],v=s[0],m=s[3],f=s[6],x=s[1],_=s[4],y=s[7],T=s[2],M=s[5],R=s[8];return r[0]=a*v+o*x+l*T,r[3]=a*m+o*_+l*M,r[6]=a*f+o*y+l*R,r[1]=c*v+u*x+h*T,r[4]=c*m+u*_+h*M,r[7]=c*f+u*y+h*R,r[2]=d*v+p*x+g*T,r[5]=d*m+p*_+g*M,r[8]=d*f+p*y+g*R,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8];return t*a*u-t*o*c-n*r*u+n*o*l+s*r*c-s*a*l}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],h=u*a-o*c,d=o*l-u*r,p=c*r-a*l,g=t*h+n*d+s*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let v=1/g;return e[0]=h*v,e[1]=(s*c-u*n)*v,e[2]=(o*n-s*a)*v,e[3]=d*v,e[4]=(u*t-s*l)*v,e[5]=(s*r-o*t)*v,e[6]=p*v,e[7]=(n*l-c*t)*v,e[8]=(a*t-n*r)*v,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,o){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-s*c,s*l,-s*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(yu.makeScale(e,t)),this}rotate(e){return this.premultiply(yu.makeRotation(-e)),this}translate(e,t){return this.premultiply(yu.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},yu=new ot;function Au(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Nr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Pf(){let i=Nr("canvas");return i.style.display="block",i}var If={};function nr(i){i in If||(If[i]=!0,console.warn(i))}function Lf(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}function Ff(i){let e=i.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function Uf(i){let e=i.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}var Nf=new ot().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Bf=new ot().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Xv(){let i={enabled:!0,workingColorSpace:Wt,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===Ft&&(s.r=Wi(s.r),s.g=Wi(s.g),s.b=Wi(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Ft&&(s.r=Br(s.r),s.g=Br(s.g),s.b=Br(s.b))),s},fromWorkingColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},toWorkingColorSpace:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===zn?Ua:this.spaces[s].transfer},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Wt]:{primaries:e,whitePoint:n,transfer:Ua,toXYZ:Nf,fromXYZ:Bf,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:nt},outputColorSpaceConfig:{drawingBufferColorSpace:nt}},[nt]:{primaries:e,whitePoint:n,transfer:Ft,toXYZ:Nf,fromXYZ:Bf,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:nt}}}),i}var pt=Xv();function Wi(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Br(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var Or,_u=class{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement=="undefined")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Or===void 0&&(Or=Nr("canvas")),Or.width=e.width,Or.height=e.height;let n=Or.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=Or}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement!="undefined"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&e instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&e instanceof ImageBitmap){let t=Nr("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Wi(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Wi(t[n]/255)*255):t[n]=Wi(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},Yv=0,fl=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Yv++}),this.uuid=vi(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Su(s[a].image)):r.push(Su(s[a]))}else r=Su(s);n.url=r}return t||(e.images[this.uuid]=n),n}};function Su(i){return typeof HTMLImageElement!="undefined"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&i instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&i instanceof ImageBitmap?_u.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var Qv=0,zt=class extends Dn{constructor(e=zt.DEFAULT_IMAGE,t=zt.DEFAULT_MAPPING,n=Ri,s=Ri,r=$t,a=pi,o=kn,l=kt,c=zt.DEFAULT_ANISOTROPY,u=zn){super();this.isTexture=!0,Object.defineProperty(this,"id",{value:Qv++}),this.uuid=vi(),this.name="",this.source=new fl(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Re(0,0),this.repeat=new Re(1,1),this.center=new Re(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ot,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==$c)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case xs:e.x=e.x-Math.floor(e.x);break;case Ri:e.x=e.x<0?0:1;break;case Pr:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case xs:e.y=e.y-Math.floor(e.y);break;case Ri:e.y=e.y<0?0:1;break;case Pr:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};zt.DEFAULT_IMAGE=null;zt.DEFAULT_MAPPING=$c;zt.DEFAULT_ANISOTROPY=1;var yt=class{constructor(e=0,t=0,n=0,s=1){yt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r,a=.01,o=.1,l=e.elements,c=l[0],u=l[4],h=l[8],d=l[1],p=l[5],g=l[9],v=l[2],m=l[6],f=l[10];if(Math.abs(u-d)<a&&Math.abs(h-v)<a&&Math.abs(g-m)<a){if(Math.abs(u+d)<o&&Math.abs(h+v)<o&&Math.abs(g+m)<o&&Math.abs(c+p+f-3)<o)return this.set(1,0,0,0),this;t=Math.PI;let _=(c+1)/2,y=(p+1)/2,T=(f+1)/2,M=(u+d)/4,R=(h+v)/4,C=(g+m)/4;return _>y&&_>T?_<a?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(_),s=M/n,r=R/n):y>T?y<a?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(y),n=M/s,r=C/s):T<a?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(T),n=R/r,s=C/r),this.set(n,s,r,t),this}let x=Math.sqrt((m-g)*(m-g)+(h-v)*(h-v)+(d-u)*(d-u));return Math.abs(x)<.001&&(x=1),this.x=(m-g)/x,this.y=(h-v)/x,this.z=(d-u)/x,this.w=Math.acos((c+p+f-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=mt(this.x,e.x,t.x),this.y=mt(this.y,e.y,t.y),this.z=mt(this.z,e.z,t.z),this.w=mt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=mt(this.x,e,t),this.y=mt(this.y,e,t),this.z=mt(this.z,e,t),this.w=mt(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(mt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},bu=class extends Dn{constructor(e=1,t=1,n={}){super();this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new yt(0,0,e,t),this.scissorTest=!1,this.viewport=new yt(0,0,e,t);let s={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:$t,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);let r=new zt(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];let a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,s=e.textures.length;n<s;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0,this.textures[n].renderTarget=this;let t=Object.assign({},e.texture.image);return this.texture.source=new fl(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},Ht=class extends bu{constructor(e=1,t=1,n={}){super(e,t,n);this.isWebGLRenderTarget=!0}},pl=class extends zt{constructor(e=null,t=1,n=1,s=1){super(null);this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=mn,this.minFilter=mn,this.wrapR=Ri,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var Eu=class extends zt{constructor(e=null,t=1,n=1,s=1){super(null);this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=mn,this.minFilter=mn,this.wrapR=Ri,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Hn=class{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let l=n[s+0],c=n[s+1],u=n[s+2],h=n[s+3],d=r[a+0],p=r[a+1],g=r[a+2],v=r[a+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h;return}if(o===1){e[t+0]=d,e[t+1]=p,e[t+2]=g,e[t+3]=v;return}if(h!==v||l!==d||c!==p||u!==g){let m=1-o,f=l*d+c*p+u*g+h*v,x=f>=0?1:-1,_=1-f*f;if(_>Number.EPSILON){let T=Math.sqrt(_),M=Math.atan2(T,f*x);m=Math.sin(m*M)/T,o=Math.sin(o*M)/T}let y=o*x;if(l=l*m+d*y,c=c*m+p*y,u=u*m+g*y,h=h*m+v*y,m===1-o){let T=1/Math.sqrt(l*l+c*c+u*u+h*h);l*=T,c*=T,u*=T,h*=T}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,n,s,r,a){let o=n[s],l=n[s+1],c=n[s+2],u=n[s+3],h=r[a],d=r[a+1],p=r[a+2],g=r[a+3];return e[t]=o*g+u*h+l*p-c*d,e[t+1]=l*g+u*d+c*h-o*p,e[t+2]=c*g+u*p+o*d-l*h,e[t+3]=u*g-o*h-l*d-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),u=o(s/2),h=o(r/2),d=l(n/2),p=l(s/2),g=l(r/2);switch(a){case"XYZ":this._x=d*u*h+c*p*g,this._y=c*p*h-d*u*g,this._z=c*u*g+d*p*h,this._w=c*u*h-d*p*g;break;case"YXZ":this._x=d*u*h+c*p*g,this._y=c*p*h-d*u*g,this._z=c*u*g-d*p*h,this._w=c*u*h+d*p*g;break;case"ZXY":this._x=d*u*h-c*p*g,this._y=c*p*h+d*u*g,this._z=c*u*g+d*p*h,this._w=c*u*h-d*p*g;break;case"ZYX":this._x=d*u*h-c*p*g,this._y=c*p*h+d*u*g,this._z=c*u*g-d*p*h,this._w=c*u*h+d*p*g;break;case"YZX":this._x=d*u*h+c*p*g,this._y=c*p*h+d*u*g,this._z=c*u*g-d*p*h,this._w=c*u*h-d*p*g;break;case"XZY":this._x=d*u*h-c*p*g,this._y=c*p*h-d*u*g,this._z=c*u*g+d*p*h,this._w=c*u*h+d*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],u=t[6],h=t[10],d=n+o+h;if(d>0){let p=.5/Math.sqrt(d+1);this._w=.25/p,this._x=(u-l)*p,this._y=(r-c)*p,this._z=(a-s)*p}else if(n>o&&n>h){let p=2*Math.sqrt(1+n-o-h);this._w=(u-l)/p,this._x=.25*p,this._y=(s+a)/p,this._z=(r+c)/p}else if(o>h){let p=2*Math.sqrt(1+o-n-h);this._w=(r-c)/p,this._x=(s+a)/p,this._y=.25*p,this._z=(l+u)/p}else{let p=2*Math.sqrt(1+h-n-o);this._w=(a-s)/p,this._x=(r+c)/p,this._y=(l+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(mt(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,u=t._w;return this._x=n*u+a*o+s*c-r*l,this._y=s*u+a*l+r*o-n*c,this._z=r*u+a*c+n*l-s*o,this._w=a*u-n*o-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,s=this._y,r=this._z,a=this._w,o=a*e._w+n*e._x+s*e._y+r*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=s,this._z=r,this;let l=1-o*o;if(l<=Number.EPSILON){let p=1-t;return this._w=p*a+t*this._w,this._x=p*n+t*this._x,this._y=p*s+t*this._y,this._z=p*r+t*this._z,this.normalize(),this}let c=Math.sqrt(l),u=Math.atan2(c,o),h=Math.sin((1-t)*u)/c,d=Math.sin(t*u)/c;return this._w=a*h+this._w*d,this._x=n*h+this._x*d,this._y=s*h+this._y*d,this._z=r*h+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},k=class{constructor(e=0,t=0,n=0){k.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Of.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Of.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*s-o*n),u=2*(o*t-r*s),h=2*(r*n-a*t);return this.x=t+l*c+a*h-o*u,this.y=n+l*u+o*c-r*h,this.z=s+l*h+r*u-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=mt(this.x,e.x,t.x),this.y=mt(this.y,e.y,t.y),this.z=mt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=mt(this.x,e,t),this.y=mt(this.y,e,t),this.z=mt(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(mt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Tu.copy(this).projectOnVector(e),this.sub(Tu)}reflect(e){return this.sub(Tu.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(mt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Tu=new k,Of=new Hn,ei=class{constructor(e=new k(1/0,1/0,1/0),t=new k(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(yi.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(yi.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=yi.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,yi):yi.fromBufferAttribute(r,a),yi.applyMatrix4(e.matrixWorld),this.expandByPoint(yi);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ml.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),ml.copy(n.boundingBox)),ml.applyMatrix4(e.matrixWorld),this.union(ml)}let s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,yi),yi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ka),gl.subVectors(this.max,ka),kr.subVectors(e.a,ka),zr.subVectors(e.b,ka),Hr.subVectors(e.c,ka),ys.subVectors(zr,kr),As.subVectors(Hr,zr),ir.subVectors(kr,Hr);let t=[0,-ys.z,ys.y,0,-As.z,As.y,0,-ir.z,ir.y,ys.z,0,-ys.x,As.z,0,-As.x,ir.z,0,-ir.x,-ys.y,ys.x,0,-As.y,As.x,0,-ir.y,ir.x,0];return!Mu(t,kr,zr,Hr,gl)||(t=[1,0,0,0,1,0,0,0,1],!Mu(t,kr,zr,Hr,gl))?!1:(vl.crossVectors(ys,As),t=[vl.x,vl.y,vl.z],Mu(t,kr,zr,Hr,gl))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,yi).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(yi).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Xi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Xi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Xi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Xi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Xi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Xi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Xi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Xi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Xi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}},Xi=[new k,new k,new k,new k,new k,new k,new k,new k],yi=new k,ml=new ei,kr=new k,zr=new k,Hr=new k,ys=new k,As=new k,ir=new k,ka=new k,gl=new k,vl=new k,sr=new k;function Mu(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){sr.fromArray(i,r);let o=s.x*Math.abs(sr.x)+s.y*Math.abs(sr.y)+s.z*Math.abs(sr.z),l=e.dot(sr),c=t.dot(sr),u=n.dot(sr);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}var qv=new ei,za=new k,wu=new k,Gn=class{constructor(e=new k,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):qv.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;za.subVectors(e,this.center);let t=za.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(za,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(wu.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(za.copy(e.center).add(wu)),this.expandByPoint(za.copy(e.center).sub(wu))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}},Yi=new k,Cu=new k,xl=new k,_s=new k,Ru=new k,yl=new k,Du=new k,rr=class{constructor(e=new k,t=new k(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Yi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Yi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Yi.copy(this.origin).addScaledVector(this.direction,t),Yi.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){Cu.copy(e).add(t).multiplyScalar(.5),xl.copy(t).sub(e).normalize(),_s.copy(this.origin).sub(Cu);let r=e.distanceTo(t)*.5,a=-this.direction.dot(xl),o=_s.dot(this.direction),l=-_s.dot(xl),c=_s.lengthSq(),u=Math.abs(1-a*a),h,d,p,g;if(u>0)if(h=a*l-o,d=a*o-l,g=r*u,h>=0)if(d>=-g)if(d<=g){let v=1/u;h*=v,d*=v,p=h*(h+a*d+2*o)+d*(a*h+d+2*l)+c}else d=r,h=Math.max(0,-(a*d+o)),p=-h*h+d*(d+2*l)+c;else d=-r,h=Math.max(0,-(a*d+o)),p=-h*h+d*(d+2*l)+c;else d<=-g?(h=Math.max(0,-(-a*r+o)),d=h>0?-r:Math.min(Math.max(-r,-l),r),p=-h*h+d*(d+2*l)+c):d<=g?(h=0,d=Math.min(Math.max(-r,-l),r),p=d*(d+2*l)+c):(h=Math.max(0,-(a*r+o)),d=h>0?r:Math.min(Math.max(-r,-l),r),p=-h*h+d*(d+2*l)+c);else d=a>0?-r:r,h=Math.max(0,-(a*d+o)),p=-h*h+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,h),s&&s.copy(Cu).addScaledVector(xl,d),p}intersectSphere(e,t){Yi.subVectors(e.center,this.origin);let n=Yi.dot(this.direction),s=Yi.dot(Yi)-n*n,r=e.radius*e.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,o,l,c=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,s=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,s=(e.min.x-d.x)*c),u>=0?(r=(e.min.y-d.y)*u,a=(e.max.y-d.y)*u):(r=(e.max.y-d.y)*u,a=(e.min.y-d.y)*u),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),h>=0?(o=(e.min.z-d.z)*h,l=(e.max.z-d.z)*h):(o=(e.max.z-d.z)*h,l=(e.min.z-d.z)*h),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,Yi)!==null}intersectTriangle(e,t,n,s,r){Ru.subVectors(t,e),yl.subVectors(n,e),Du.crossVectors(Ru,yl);let a=this.direction.dot(Du),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;_s.subVectors(this.origin,e);let l=o*this.direction.dot(yl.crossVectors(_s,yl));if(l<0)return null;let c=o*this.direction.dot(Ru.cross(_s));if(c<0||l+c>a)return null;let u=-o*_s.dot(Du);return u<0?null:this.at(u/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Ze=class{constructor(e,t,n,s,r,a,o,l,c,u,h,d,p,g,v,m){Ze.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c,u,h,d,p,g,v,m)}set(e,t,n,s,r,a,o,l,c,u,h,d,p,g,v,m){let f=this.elements;return f[0]=e,f[4]=t,f[8]=n,f[12]=s,f[1]=r,f[5]=a,f[9]=o,f[13]=l,f[2]=c,f[6]=u,f[10]=h,f[14]=d,f[3]=p,f[7]=g,f[11]=v,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ze().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,n=e.elements,s=1/Gr.setFromMatrixColumn(e,0).length(),r=1/Gr.setFromMatrixColumn(e,1).length(),a=1/Gr.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),c=Math.sin(s),u=Math.cos(r),h=Math.sin(r);if(e.order==="XYZ"){let d=a*u,p=a*h,g=o*u,v=o*h;t[0]=l*u,t[4]=-l*h,t[8]=c,t[1]=p+g*c,t[5]=d-v*c,t[9]=-o*l,t[2]=v-d*c,t[6]=g+p*c,t[10]=a*l}else if(e.order==="YXZ"){let d=l*u,p=l*h,g=c*u,v=c*h;t[0]=d+v*o,t[4]=g*o-p,t[8]=a*c,t[1]=a*h,t[5]=a*u,t[9]=-o,t[2]=p*o-g,t[6]=v+d*o,t[10]=a*l}else if(e.order==="ZXY"){let d=l*u,p=l*h,g=c*u,v=c*h;t[0]=d-v*o,t[4]=-a*h,t[8]=g+p*o,t[1]=p+g*o,t[5]=a*u,t[9]=v-d*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){let d=a*u,p=a*h,g=o*u,v=o*h;t[0]=l*u,t[4]=g*c-p,t[8]=d*c+v,t[1]=l*h,t[5]=v*c+d,t[9]=p*c-g,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){let d=a*l,p=a*c,g=o*l,v=o*c;t[0]=l*u,t[4]=v-d*h,t[8]=g*h+p,t[1]=h,t[5]=a*u,t[9]=-o*u,t[2]=-c*u,t[6]=p*h+g,t[10]=d-v*h}else if(e.order==="XZY"){let d=a*l,p=a*c,g=o*l,v=o*c;t[0]=l*u,t[4]=-h,t[8]=c*u,t[1]=d*h+v,t[5]=a*u,t[9]=p*h-g,t[2]=g*h-p,t[6]=o*u,t[10]=v*h+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(jv,e,Zv)}lookAt(e,t,n){let s=this.elements;return Vn.subVectors(e,t),Vn.lengthSq()===0&&(Vn.z=1),Vn.normalize(),Ss.crossVectors(n,Vn),Ss.lengthSq()===0&&(Math.abs(n.z)===1?Vn.x+=1e-4:Vn.z+=1e-4,Vn.normalize(),Ss.crossVectors(n,Vn)),Ss.normalize(),Al.crossVectors(Vn,Ss),s[0]=Ss.x,s[4]=Al.x,s[8]=Vn.x,s[1]=Ss.y,s[5]=Al.y,s[9]=Vn.y,s[2]=Ss.z,s[6]=Al.z,s[10]=Vn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],u=n[1],h=n[5],d=n[9],p=n[13],g=n[2],v=n[6],m=n[10],f=n[14],x=n[3],_=n[7],y=n[11],T=n[15],M=s[0],R=s[4],C=s[8],b=s[12],S=s[1],D=s[5],U=s[9],O=s[13],B=s[2],G=s[6],N=s[10],I=s[14],P=s[3],F=s[7],J=s[11],oe=s[15];return r[0]=a*M+o*S+l*B+c*P,r[4]=a*R+o*D+l*G+c*F,r[8]=a*C+o*U+l*N+c*J,r[12]=a*b+o*O+l*I+c*oe,r[1]=u*M+h*S+d*B+p*P,r[5]=u*R+h*D+d*G+p*F,r[9]=u*C+h*U+d*N+p*J,r[13]=u*b+h*O+d*I+p*oe,r[2]=g*M+v*S+m*B+f*P,r[6]=g*R+v*D+m*G+f*F,r[10]=g*C+v*U+m*N+f*J,r[14]=g*b+v*O+m*I+f*oe,r[3]=x*M+_*S+y*B+T*P,r[7]=x*R+_*D+y*G+T*F,r[11]=x*C+_*U+y*N+T*J,r[15]=x*b+_*O+y*I+T*oe,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],u=e[2],h=e[6],d=e[10],p=e[14],g=e[3],v=e[7],m=e[11],f=e[15];return g*(+r*l*h-s*c*h-r*o*d+n*c*d+s*o*p-n*l*p)+v*(+t*l*p-t*c*d+r*a*d-s*a*p+s*c*u-r*l*u)+m*(+t*c*h-t*o*p-r*a*h+n*a*p+r*o*u-n*c*u)+f*(-s*o*u-t*l*h+t*o*d+s*a*h-n*a*d+n*l*u)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],h=e[9],d=e[10],p=e[11],g=e[12],v=e[13],m=e[14],f=e[15],x=h*m*c-v*d*c+v*l*p-o*m*p-h*l*f+o*d*f,_=g*d*c-u*m*c-g*l*p+a*m*p+u*l*f-a*d*f,y=u*v*c-g*h*c+g*o*p-a*v*p-u*o*f+a*h*f,T=g*h*l-u*v*l-g*o*d+a*v*d+u*o*m-a*h*m,M=t*x+n*_+s*y+r*T;if(M===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let R=1/M;return e[0]=x*R,e[1]=(v*d*r-h*m*r-v*s*p+n*m*p+h*s*f-n*d*f)*R,e[2]=(o*m*r-v*l*r+v*s*c-n*m*c-o*s*f+n*l*f)*R,e[3]=(h*l*r-o*d*r-h*s*c+n*d*c+o*s*p-n*l*p)*R,e[4]=_*R,e[5]=(u*m*r-g*d*r+g*s*p-t*m*p-u*s*f+t*d*f)*R,e[6]=(g*l*r-a*m*r-g*s*c+t*m*c+a*s*f-t*l*f)*R,e[7]=(a*d*r-u*l*r+u*s*c-t*d*c-a*s*p+t*l*p)*R,e[8]=y*R,e[9]=(g*h*r-u*v*r-g*n*p+t*v*p+u*n*f-t*h*f)*R,e[10]=(a*v*r-g*o*r+g*n*c-t*v*c-a*n*f+t*o*f)*R,e[11]=(u*o*r-a*h*r-u*n*c+t*h*c+a*n*p-t*o*p)*R,e[12]=T*R,e[13]=(u*v*s-g*h*s+g*n*d-t*v*d-u*n*m+t*h*m)*R,e[14]=(g*o*s-a*v*s-g*n*l+t*v*l+a*n*m-t*o*m)*R,e[15]=(a*h*s-u*o*s+u*n*l-t*h*l-a*n*d+t*o*d)*R,this}scale(e){let t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,o=e.y,l=e.z,c=r*a,u=r*o;return this.set(c*a+n,c*o-s*l,c*l+s*o,0,c*o+s*l,u*o+n,u*l-s*a,0,c*l-s*o,u*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){let s=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,u=a+a,h=o+o,d=r*c,p=r*u,g=r*h,v=a*u,m=a*h,f=o*h,x=l*c,_=l*u,y=l*h,T=n.x,M=n.y,R=n.z;return s[0]=(1-(v+f))*T,s[1]=(p+y)*T,s[2]=(g-_)*T,s[3]=0,s[4]=(p-y)*M,s[5]=(1-(d+f))*M,s[6]=(m+x)*M,s[7]=0,s[8]=(g+_)*R,s[9]=(m-x)*R,s[10]=(1-(d+v))*R,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){let s=this.elements,r=Gr.set(s[0],s[1],s[2]).length(),a=Gr.set(s[4],s[5],s[6]).length(),o=Gr.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],Ai.copy(this);let c=1/r,u=1/a,h=1/o;return Ai.elements[0]*=c,Ai.elements[1]*=c,Ai.elements[2]*=c,Ai.elements[4]*=u,Ai.elements[5]*=u,Ai.elements[6]*=u,Ai.elements[8]*=h,Ai.elements[9]*=h,Ai.elements[10]*=h,t.setFromRotationMatrix(Ai),n.x=r,n.y=a,n.z=o,this}makePerspective(e,t,n,s,r,a,o=gi){let l=this.elements,c=2*r/(t-e),u=2*r/(n-s),h=(t+e)/(t-e),d=(n+s)/(n-s),p,g;if(o===gi)p=-(a+r)/(a-r),g=-2*a*r/(a-r);else if(o===Na)p=-a/(a-r),g=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=h,l[12]=0,l[1]=0,l[5]=u,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,s,r,a,o=gi){let l=this.elements,c=1/(t-e),u=1/(n-s),h=1/(a-r),d=(t+e)*c,p=(n+s)*u,g,v;if(o===gi)g=(a+r)*h,v=-2*h;else if(o===Na)g=r*h,v=-1*h;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*u,l[9]=0,l[13]=-p,l[2]=0,l[6]=0,l[10]=v,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},Gr=new k,Ai=new Ze,jv=new k(0,0,0),Zv=new k(1,1,1),Ss=new k,Al=new k,Vn=new k,kf=new Ze,zf=new Hn,ti=class{constructor(e=0,t=0,n=0,s=ti.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let s=e.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],u=s[9],h=s[2],d=s[6],p=s[10];switch(t){case"XYZ":this._y=Math.asin(mt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-mt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin(mt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-h,p),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-mt(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(d,p),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(mt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-mt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-u,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return kf.makeRotationFromQuaternion(e),this.setFromRotationMatrix(kf,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return zf.setFromEuler(this),this.setFromQuaternion(zf,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};ti.DEFAULT_ORDER="XYZ";var Ha=class{constructor(){this.mask=1|0}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=4294967295|0}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!=0}isEnabled(e){return(this.mask&(1<<e|0))!=0}},Kv=0,Hf=new k,Vr=new Hn,Qi=new Ze,_l=new k,Ga=new k,Jv=new k,$v=new Hn,Gf=new k(1,0,0),Vf=new k(0,1,0),Wf=new k(0,0,1),Xf={type:"added"},ex={type:"removed"},Wr={type:"childadded",child:null},Pu={type:"childremoved",child:null},Rt=class extends Dn{constructor(){super();this.isObject3D=!0,Object.defineProperty(this,"id",{value:Kv++}),this.uuid=vi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Rt.DEFAULT_UP.clone();let e=new k,t=new ti,n=new Hn,s=new k(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Ze},normalMatrix:{value:new ot}}),this.matrix=new Ze,this.matrixWorld=new Ze,this.matrixAutoUpdate=Rt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Rt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ha,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Vr.setFromAxisAngle(e,t),this.quaternion.multiply(Vr),this}rotateOnWorldAxis(e,t){return Vr.setFromAxisAngle(e,t),this.quaternion.premultiply(Vr),this}rotateX(e){return this.rotateOnAxis(Gf,e)}rotateY(e){return this.rotateOnAxis(Vf,e)}rotateZ(e){return this.rotateOnAxis(Wf,e)}translateOnAxis(e,t){return Hf.copy(e).applyQuaternion(this.quaternion),this.position.add(Hf.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Gf,e)}translateY(e){return this.translateOnAxis(Vf,e)}translateZ(e){return this.translateOnAxis(Wf,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Qi.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?_l.copy(e):_l.set(e,t,n);let s=this.parent;this.updateWorldMatrix(!0,!1),Ga.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Qi.lookAt(Ga,_l,this.up):Qi.lookAt(_l,Ga,this.up),this.quaternion.setFromRotationMatrix(Qi),s&&(Qi.extractRotation(s.matrixWorld),Vr.setFromRotationMatrix(Qi),this.quaternion.premultiply(Vr.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Xf),Wr.child=e,this.dispatchEvent(Wr),Wr.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(ex),Pu.child=e,this.dispatchEvent(Pu),Pu.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Qi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Qi.multiply(e.parent.matrixWorld)),e.applyMatrix4(Qi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Xf),Wr.child=e,this.dispatchEvent(Wr),Wr.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){let a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ga,e,Jv),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ga,$v,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){let h=l[c];r(e.shapes,h)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];s.animations.push(r(e.animations,l))}}if(t){let o=a(e.geometries),l=a(e.materials),c=a(e.textures),u=a(e.images),h=a(e.shapes),d=a(e.skeletons),p=a(e.animations),g=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),d.length>0&&(n.skeletons=d),p.length>0&&(n.animations=p),g.length>0&&(n.nodes=g)}return n.object=s,n;function a(o){let l=[];for(let c in o){let u=o[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let s=e.children[n];this.add(s.clone())}return this}};Rt.DEFAULT_UP=new k(0,1,0);Rt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Rt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var _i=new k,qi=new k,Iu=new k,ji=new k,Xr=new k,Yr=new k,Yf=new k,Lu=new k,Fu=new k,Uu=new k,Nu=new yt,Bu=new yt,Ou=new yt,Wn=class{constructor(e=new k,t=new k,n=new k){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),_i.subVectors(e,t),s.cross(_i);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){_i.subVectors(s,t),qi.subVectors(n,t),Iu.subVectors(e,t);let a=_i.dot(_i),o=_i.dot(qi),l=_i.dot(Iu),c=qi.dot(qi),u=qi.dot(Iu),h=a*c-o*o;if(h===0)return r.set(0,0,0),null;let d=1/h,p=(c*l-o*u)*d,g=(a*u-o*l)*d;return r.set(1-p-g,g,p)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,ji)===null?!1:ji.x>=0&&ji.y>=0&&ji.x+ji.y<=1}static getInterpolation(e,t,n,s,r,a,o,l){return this.getBarycoord(e,t,n,s,ji)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,ji.x),l.addScaledVector(a,ji.y),l.addScaledVector(o,ji.z),l)}static getInterpolatedAttribute(e,t,n,s,r,a){return Nu.setScalar(0),Bu.setScalar(0),Ou.setScalar(0),Nu.fromBufferAttribute(e,t),Bu.fromBufferAttribute(e,n),Ou.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(Nu,r.x),a.addScaledVector(Bu,r.y),a.addScaledVector(Ou,r.z),a}static isFrontFacing(e,t,n,s){return _i.subVectors(n,t),qi.subVectors(e,t),_i.cross(qi).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return _i.subVectors(this.c,this.b),qi.subVectors(this.a,this.b),_i.cross(qi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Wn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Wn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return Wn.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return Wn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Wn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,s=this.b,r=this.c,a,o;Xr.subVectors(s,n),Yr.subVectors(r,n),Lu.subVectors(e,n);let l=Xr.dot(Lu),c=Yr.dot(Lu);if(l<=0&&c<=0)return t.copy(n);Fu.subVectors(e,s);let u=Xr.dot(Fu),h=Yr.dot(Fu);if(u>=0&&h<=u)return t.copy(s);let d=l*h-u*c;if(d<=0&&l>=0&&u<=0)return a=l/(l-u),t.copy(n).addScaledVector(Xr,a);Uu.subVectors(e,r);let p=Xr.dot(Uu),g=Yr.dot(Uu);if(g>=0&&p<=g)return t.copy(r);let v=p*c-l*g;if(v<=0&&c>=0&&g<=0)return o=c/(c-g),t.copy(n).addScaledVector(Yr,o);let m=u*g-p*h;if(m<=0&&h-u>=0&&p-g>=0)return Yf.subVectors(r,s),o=(h-u)/(h-u+(p-g)),t.copy(s).addScaledVector(Yf,o);let f=1/(m+v+d);return a=v*f,o=d*f,t.copy(n).addScaledVector(Xr,a).addScaledVector(Yr,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Qf={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},bs={h:0,s:0,l:0},Sl={h:0,s:0,l:0};function ku(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}var ye=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=nt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,pt.toWorkingColorSpace(this,t),this}setRGB(e,t,n,s=pt.workingColorSpace){return this.r=e,this.g=t,this.b=n,pt.toWorkingColorSpace(this,s),this}setHSL(e,t,n,s=pt.workingColorSpace){if(e=vu(e,1),t=mt(t,0,1),n=mt(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=ku(a,r,e+1/3),this.g=ku(a,r,e),this.b=ku(a,r,e-1/3)}return pt.toWorkingColorSpace(this,s),this}setStyle(e,t=nt){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=nt){let n=Qf[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Wi(e.r),this.g=Wi(e.g),this.b=Wi(e.b),this}copyLinearToSRGB(e){return this.r=Br(e.r),this.g=Br(e.g),this.b=Br(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=nt){return pt.fromWorkingColorSpace(yn.copy(this),e),Math.round(mt(yn.r*255,0,255))*65536+Math.round(mt(yn.g*255,0,255))*256+Math.round(mt(yn.b*255,0,255))}getHexString(e=nt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=pt.workingColorSpace){pt.fromWorkingColorSpace(yn.copy(this),t);let n=yn.r,s=yn.g,r=yn.b,a=Math.max(n,s,r),o=Math.min(n,s,r),l,c,u=(o+a)/2;if(o===a)l=0,c=0;else{let h=a-o;switch(c=u<=.5?h/(a+o):h/(2-a-o),a){case n:l=(s-r)/h+(s<r?6:0);break;case s:l=(r-n)/h+2;break;case r:l=(n-s)/h+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=pt.workingColorSpace){return pt.fromWorkingColorSpace(yn.copy(this),t),e.r=yn.r,e.g=yn.g,e.b=yn.b,e}getStyle(e=nt){pt.fromWorkingColorSpace(yn.copy(this),e);let t=yn.r,n=yn.g,s=yn.b;return e!==nt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(bs),this.setHSL(bs.h+e,bs.s+t,bs.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(bs),e.getHSL(Sl);let n=Oa(bs.h,Sl.h,t),s=Oa(bs.s,Sl.s,t),r=Oa(bs.l,Sl.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},yn=new ye;ye.NAMES=Qf;var tx=0,un=class extends Dn{constructor(){super();this.isMaterial=!0,Object.defineProperty(this,"id",{value:tx++}),this.uuid=vi(),this.name="",this.type="Material",this.blending=Ys,this.side=Bn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=yo,this.blendDst=Ao,this.blendEquation=vs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ye(0,0,0),this.blendAlpha=0,this.depthFunc=Qs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=pu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=er,this.stencilZFail=er,this.stencilZPass=er,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ys&&(n.blending=this.blending),this.side!==Bn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==yo&&(n.blendSrc=this.blendSrc),this.blendDst!==Ao&&(n.blendDst=this.blendDst),this.blendEquation!==vs&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Qs&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==pu&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==er&&(n.stencilFail=this.stencilFail),this.stencilZFail!==er&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==er&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let a=[];for(let o in r){let l=r[o];delete l.metadata,a.push(l)}return a}if(t){let r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}},ni=class extends un{constructor(e){super();this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ye(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ti,this.combine=Kc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}};var rn=new k,bl=new Re,Gt=class{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=dl,this.updateRanges=[],this.gpuType=On,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)bl.fromBufferAttribute(this,t),bl.applyMatrix3(e),this.setXY(t,bl.x,bl.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)rn.fromBufferAttribute(this,t),rn.applyMatrix3(e),this.setXYZ(t,rn.x,rn.y,rn.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)rn.fromBufferAttribute(this,t),rn.applyMatrix4(e),this.setXYZ(t,rn.x,rn.y,rn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)rn.fromBufferAttribute(this,t),rn.applyNormalMatrix(e),this.setXYZ(t,rn.x,rn.y,rn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)rn.fromBufferAttribute(this,t),rn.transformDirection(e),this.setXYZ(t,rn.x,rn.y,rn.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=xi(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Ut(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=xi(t,this.array)),t}setX(e,t){return this.normalized&&(t=Ut(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=xi(t,this.array)),t}setY(e,t){return this.normalized&&(t=Ut(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=xi(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Ut(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=xi(t,this.array)),t}setW(e,t){return this.normalized&&(t=Ut(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Ut(t,this.array),n=Ut(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=Ut(t,this.array),n=Ut(n,this.array),s=Ut(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=Ut(t,this.array),n=Ut(n,this.array),s=Ut(s,this.array),r=Ut(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==dl&&(e.usage=this.usage),e}};var El=class extends Gt{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var Tl=class extends Gt{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var Xt=class extends Gt{constructor(e,t,n){super(new Float32Array(e),t,n)}},nx=0,ii=new Ze,zu=new Rt,Qr=new k,Xn=new ei,Va=new ei,hn=new k,Yt=class extends Dn{constructor(){super();this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:nx++}),this.uuid=vi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Au(e)?Tl:El)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new ot().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return ii.makeRotationFromQuaternion(e),this.applyMatrix4(ii),this}rotateX(e){return ii.makeRotationX(e),this.applyMatrix4(ii),this}rotateY(e){return ii.makeRotationY(e),this.applyMatrix4(ii),this}rotateZ(e){return ii.makeRotationZ(e),this.applyMatrix4(ii),this}translate(e,t,n){return ii.makeTranslation(e,t,n),this.applyMatrix4(ii),this}scale(e,t,n){return ii.makeScale(e,t,n),this.applyMatrix4(ii),this}lookAt(e){return zu.lookAt(e),zu.updateMatrix(),this.applyMatrix4(zu.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Qr).negate(),this.translate(Qr.x,Qr.y,Qr.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let s=0,r=e.length;s<r;s++){let a=e[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Xt(n,3))}else{let n=Math.min(e.length,t.count);for(let s=0;s<n;s++){let r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ei);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new k(-1/0,-1/0,-1/0),new k(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){let r=t[n];Xn.setFromBufferAttribute(r),this.morphTargetsRelative?(hn.addVectors(this.boundingBox.min,Xn.min),this.boundingBox.expandByPoint(hn),hn.addVectors(this.boundingBox.max,Xn.max),this.boundingBox.expandByPoint(hn)):(this.boundingBox.expandByPoint(Xn.min),this.boundingBox.expandByPoint(Xn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Gn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new k,1/0);return}if(e){let n=this.boundingSphere.center;if(Xn.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){let o=t[r];Va.setFromBufferAttribute(o),this.morphTargetsRelative?(hn.addVectors(Xn.min,Va.min),Xn.expandByPoint(hn),hn.addVectors(Xn.max,Va.max),Xn.expandByPoint(hn)):(Xn.expandByPoint(Va.min),Xn.expandByPoint(Va.max))}Xn.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)hn.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(hn));if(t)for(let r=0,a=t.length;r<a;r++){let o=t[r],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)hn.fromBufferAttribute(o,c),l&&(Qr.fromBufferAttribute(e,c),hn.add(Qr)),s=Math.max(s,n.distanceToSquared(hn))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Gt(new Float32Array(4*n.count),4));let a=this.getAttribute("tangent"),o=[],l=[];for(let C=0;C<n.count;C++)o[C]=new k,l[C]=new k;let c=new k,u=new k,h=new k,d=new Re,p=new Re,g=new Re,v=new k,m=new k;function f(C,b,S){c.fromBufferAttribute(n,C),u.fromBufferAttribute(n,b),h.fromBufferAttribute(n,S),d.fromBufferAttribute(r,C),p.fromBufferAttribute(r,b),g.fromBufferAttribute(r,S),u.sub(c),h.sub(c),p.sub(d),g.sub(d);let D=1/(p.x*g.y-g.x*p.y);!isFinite(D)||(v.copy(u).multiplyScalar(g.y).addScaledVector(h,-p.y).multiplyScalar(D),m.copy(h).multiplyScalar(p.x).addScaledVector(u,-g.x).multiplyScalar(D),o[C].add(v),o[b].add(v),o[S].add(v),l[C].add(m),l[b].add(m),l[S].add(m))}let x=this.groups;x.length===0&&(x=[{start:0,count:e.count}]);for(let C=0,b=x.length;C<b;++C){let S=x[C],D=S.start,U=S.count;for(let O=D,B=D+U;O<B;O+=3)f(e.getX(O+0),e.getX(O+1),e.getX(O+2))}let _=new k,y=new k,T=new k,M=new k;function R(C){T.fromBufferAttribute(s,C),M.copy(T);let b=o[C];_.copy(b),_.sub(T.multiplyScalar(T.dot(b))).normalize(),y.crossVectors(M,b);let D=y.dot(l[C])<0?-1:1;a.setXYZW(C,_.x,_.y,_.z,D)}for(let C=0,b=x.length;C<b;++C){let S=x[C],D=S.start,U=S.count;for(let O=D,B=D+U;O<B;O+=3)R(e.getX(O+0)),R(e.getX(O+1)),R(e.getX(O+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Gt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,p=n.count;d<p;d++)n.setXYZ(d,0,0,0);let s=new k,r=new k,a=new k,o=new k,l=new k,c=new k,u=new k,h=new k;if(e)for(let d=0,p=e.count;d<p;d+=3){let g=e.getX(d+0),v=e.getX(d+1),m=e.getX(d+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,v),a.fromBufferAttribute(t,m),u.subVectors(a,r),h.subVectors(s,r),u.cross(h),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,v),c.fromBufferAttribute(n,m),o.add(u),l.add(u),c.add(u),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(v,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let d=0,p=t.count;d<p;d+=3)s.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),u.subVectors(a,r),h.subVectors(s,r),u.cross(h),n.setXYZ(d+0,u.x,u.y,u.z),n.setXYZ(d+1,u.x,u.y,u.z),n.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)hn.fromBufferAttribute(e,t),hn.normalize(),e.setXYZ(t,hn.x,hn.y,hn.z)}toNonIndexed(){function e(o,l){let c=o.array,u=o.itemSize,h=o.normalized,d=new c.constructor(l.length*u),p=0,g=0;for(let v=0,m=l.length;v<m;v++){o.isInterleavedBufferAttribute?p=l[v]*o.data.stride+o.offset:p=l[v]*u;for(let f=0;f<u;f++)d[g++]=c[p++]}return new Gt(d,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new Yt,n=this.index.array,s=this.attributes;for(let o in s){let l=s[o],c=e(l,n);t.setAttribute(o,c)}let r=this.morphAttributes;for(let o in r){let l=[],c=r[o];for(let u=0,h=c.length;u<h;u++){let d=c[u],p=e(d,n);l.push(p)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let l in n){let c=n[l];e.data.attributes[l]=c.toJSON(e.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],u=[];for(let h=0,d=c.length;h<d;h++){let p=c[h];u.push(p.toJSON(e.data))}u.length>0&&(s[l]=u,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone(t));let s=e.attributes;for(let c in s){let u=s[c];this.setAttribute(c,u.clone(t))}let r=e.morphAttributes;for(let c in r){let u=[],h=r[c];for(let d=0,p=h.length;d<p;d++)u.push(h[d].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let c=0,u=a.length;c<u;c++){let h=a[c];this.addGroup(h.start,h.count,h.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},qf=new Ze,ar=new rr,Ml=new Gn,jf=new k,wl=new k,Cl=new k,Rl=new k,Hu=new k,Dl=new k,Zf=new k,Pl=new k,Qt=class extends Rt{constructor(e=new Yt,t=new ni){super();this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);let o=this.morphTargetInfluences;if(r&&o){Dl.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let u=o[l],h=r[l];u!==0&&(Hu.fromBufferAttribute(h,e),a?Dl.addScaledVector(Hu,u):Dl.addScaledVector(Hu.sub(t),u))}t.add(Dl)}return t}raycast(e,t){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Ml.copy(n.boundingSphere),Ml.applyMatrix4(r),ar.copy(e.ray).recast(e.near),!(Ml.containsPoint(ar.origin)===!1&&(ar.intersectSphere(Ml,jf)===null||ar.origin.distanceToSquared(jf)>(e.far-e.near)**2))&&(qf.copy(r).invert(),ar.copy(e.ray).applyMatrix4(qf),!(n.boundingBox!==null&&ar.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,ar)))}_computeIntersections(e,t,n){let s,r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,u=r.attributes.uv1,h=r.attributes.normal,d=r.groups,p=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,v=d.length;g<v;g++){let m=d[g],f=a[m.materialIndex],x=Math.max(m.start,p.start),_=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let y=x,T=_;y<T;y+=3){let M=o.getX(y),R=o.getX(y+1),C=o.getX(y+2);s=Il(this,f,e,n,c,u,h,M,R,C),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{let g=Math.max(0,p.start),v=Math.min(o.count,p.start+p.count);for(let m=g,f=v;m<f;m+=3){let x=o.getX(m),_=o.getX(m+1),y=o.getX(m+2);s=Il(this,a,e,n,c,u,h,x,_,y),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,v=d.length;g<v;g++){let m=d[g],f=a[m.materialIndex],x=Math.max(m.start,p.start),_=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let y=x,T=_;y<T;y+=3){let M=y,R=y+1,C=y+2;s=Il(this,f,e,n,c,u,h,M,R,C),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{let g=Math.max(0,p.start),v=Math.min(l.count,p.start+p.count);for(let m=g,f=v;m<f;m+=3){let x=m,_=m+1,y=m+2;s=Il(this,a,e,n,c,u,h,x,_,y),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}};function ix(i,e,t,n,s,r,a,o){let l;if(e.side===sn?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,e.side===Bn,o),l===null)return null;Pl.copy(o),Pl.applyMatrix4(i.matrixWorld);let c=t.ray.origin.distanceTo(Pl);return c<t.near||c>t.far?null:{distance:c,point:Pl.clone(),object:i}}function Il(i,e,t,n,s,r,a,o,l,c){i.getVertexPosition(o,wl),i.getVertexPosition(l,Cl),i.getVertexPosition(c,Rl);let u=ix(i,e,t,n,wl,Cl,Rl,Zf);if(u){let h=new k;Wn.getBarycoord(Zf,wl,Cl,Rl,h),s&&(u.uv=Wn.getInterpolatedAttribute(s,o,l,c,h,new Re)),r&&(u.uv1=Wn.getInterpolatedAttribute(r,o,l,c,h,new Re)),a&&(u.normal=Wn.getInterpolatedAttribute(a,o,l,c,h,new k),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));let d={a:o,b:l,c,normal:new k,materialIndex:0};Wn.getNormal(wl,Cl,Rl,d.normal),u.face=d,u.barycoord=h}return u}var Zi=class extends Yt{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super();this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let l=[],c=[],u=[],h=[],d=0,p=0;g("z","y","x",-1,-1,n,t,e,a,r,0),g("z","y","x",1,-1,n,t,-e,a,r,1),g("x","z","y",1,1,e,n,t,s,a,2),g("x","z","y",1,-1,e,n,-t,s,a,3),g("x","y","z",1,-1,e,t,n,s,r,4),g("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new Xt(c,3)),this.setAttribute("normal",new Xt(u,3)),this.setAttribute("uv",new Xt(h,2));function g(v,m,f,x,_,y,T,M,R,C,b){let S=y/R,D=T/C,U=y/2,O=T/2,B=M/2,G=R+1,N=C+1,I=0,P=0,F=new k;for(let J=0;J<N;J++){let oe=J*D-O;for(let _e=0;_e<G;_e++){let ce=_e*S-U;F[v]=ce*x,F[m]=oe*_,F[f]=B,c.push(F.x,F.y,F.z),F[v]=0,F[m]=0,F[f]=M>0?1:-1,u.push(F.x,F.y,F.z),h.push(_e/R),h.push(1-J/C),I+=1}}for(let J=0;J<C;J++)for(let oe=0;oe<R;oe++){let _e=d+oe+G*J,ce=d+oe+G*(J+1),X=d+(oe+1)+G*(J+1),Z=d+(oe+1)+G*J;l.push(_e,ce,Z),l.push(ce,X,Z),P+=6}o.addGroup(p,P,b),p+=P,d+=I}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Zi(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function or(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function An(i){let e={};for(let t=0;t<i.length;t++){let n=or(i[t]);for(let s in n)e[s]=n[s]}return e}function sx(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Gu(i){let e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:pt.workingColorSpace}var Kf={clone:or,merge:An},rx=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,ax=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Nt=class extends un{constructor(e){super();this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=rx,this.fragmentShader=ax,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=or(e.uniforms),this.uniformsGroups=sx(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},lr=class extends Rt{constructor(){super();this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ze,this.projectionMatrix=new Ze,this.projectionMatrixInverse=new Ze,this.coordinateSystem=gi}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},Es=new k,Jf=new Re,$f=new Re,qt=class extends lr{constructor(e=50,t=1,n=.1,s=2e3){super();this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=tr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Ba*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return tr*2*Math.atan(Math.tan(Ba*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Es.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Es.x,Es.y).multiplyScalar(-e/Es.z),Es.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Es.x,Es.y).multiplyScalar(-e/Es.z)}getViewSize(e,t){return this.getViewBounds(e,Jf,$f),t.subVectors($f,Jf)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Ba*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,t-=a.offsetY*n/c,s*=a.width/l,n*=a.height/c}let o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},qr=-90,jr=1,Vu=class extends Rt{constructor(e,t,n){super();this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new qt(qr,jr,e,t);s.layers=this.layers,this.add(s);let r=new qt(qr,jr,e,t);r.layers=this.layers,this.add(r);let a=new qt(qr,jr,e,t);a.layers=this.layers,this.add(a);let o=new qt(qr,jr,e,t);o.layers=this.layers,this.add(o);let l=new qt(qr,jr,e,t);l.layers=this.layers,this.add(l);let c=new qt(qr,jr,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,o,l]=t;for(let c of t)this.remove(c);if(e===gi)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Na)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,l,c,u]=this.children,h=e.getRenderTarget(),d=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;let v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,r),e.setRenderTarget(n,1,s),e.render(t,a),e.setRenderTarget(n,2,s),e.render(t,o),e.setRenderTarget(n,3,s),e.render(t,l),e.setRenderTarget(n,4,s),e.render(t,c),n.texture.generateMipmaps=v,e.setRenderTarget(n,5,s),e.render(t,u),e.setRenderTarget(h,d,p),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},Ll=class extends zt{constructor(e,t,n,s,r,a,o,l,c,u){e=e!==void 0?e:[],t=t!==void 0?t:qs;super(e,t,n,s,r,a,o,l,c,u);this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Wu=class extends Ht{constructor(e=1,t={}){super(e,e,t);this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new Ll(s,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:$t}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new Zi(5,5,5),r=new Nt({name:"CubemapFromEquirect",uniforms:or(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:sn,blending:Jt});r.uniforms.tEquirect.value=t;let a=new Qt(s,r),o=t.minFilter;return t.minFilter===pi&&(t.minFilter=$t),new Vu(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,n,s){let r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}};var Ki=class extends Rt{constructor(){super();this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ti,this.environmentIntensity=1,this.environmentRotation=new ti,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},Wa=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=dl,this.updateRanges=[],this.version=0,this.uuid=vi()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=vi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=vi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},Tn=new k,cr=class{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Tn.fromBufferAttribute(this,t),Tn.applyMatrix4(e),this.setXYZ(t,Tn.x,Tn.y,Tn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Tn.fromBufferAttribute(this,t),Tn.applyNormalMatrix(e),this.setXYZ(t,Tn.x,Tn.y,Tn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Tn.fromBufferAttribute(this,t),Tn.transformDirection(e),this.setXYZ(t,Tn.x,Tn.y,Tn.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=xi(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Ut(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=Ut(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Ut(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Ut(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Ut(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=xi(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=xi(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=xi(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=xi(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Ut(t,this.array),n=Ut(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=Ut(t,this.array),n=Ut(n,this.array),s=Ut(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=Ut(t,this.array),n=Ut(n,this.array),s=Ut(s,this.array),r=Ut(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new Gt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new cr(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}};var ep=new k,tp=new yt,np=new yt,ox=new k,ip=new Ze,Fl=new k,Xu=new Gn,sp=new Ze,Yu=new rr,Ul=class extends Qt{constructor(e,t){super(e,t);this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Jc,this.bindMatrix=new Ze,this.bindMatrixInverse=new Ze,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new ei),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Fl),this.boundingBox.expandByPoint(Fl)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Gn),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Fl),this.boundingSphere.expandByPoint(Fl)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let n=this.material,s=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Xu.copy(this.boundingSphere),Xu.applyMatrix4(s),e.ray.intersectsSphere(Xu)!==!1&&(sp.copy(s).invert(),Yu.copy(e.ray).applyMatrix4(sp),!(this.boundingBox!==null&&Yu.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Yu)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new yt,t=this.geometry.attributes.skinWeight;for(let n=0,s=t.count;n<s;n++){e.fromBufferAttribute(t,n);let r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Jc?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Af?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,s=this.geometry;tp.fromBufferAttribute(s.attributes.skinIndex,e),np.fromBufferAttribute(s.attributes.skinWeight,e),ep.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let r=0;r<4;r++){let a=np.getComponent(r);if(a!==0){let o=tp.getComponent(r);ip.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(ox.copy(ep).applyMatrix4(ip),a)}}return t.applyMatrix4(this.bindMatrixInverse)}},Xa=class extends Rt{constructor(){super();this.isBone=!0,this.type="Bone"}},Nl=class extends zt{constructor(e=null,t=1,n=1,s,r,a,o,l,c=mn,u=mn,h,d){super(null,a,o,l,c,u,s,r,h,d);this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},rp=new Ze,lx=new Ze,Zr=class{constructor(e=[],t=[]){this.uuid=vi(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,s=this.bones.length;n<s;n++)this.boneInverses.push(new Ze)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let n=new Ze;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,s=this.boneTexture;for(let r=0,a=e.length;r<a;r++){let o=e[r]?e[r].matrixWorld:lx;rp.multiplyMatrices(o,t[r]),rp.toArray(n,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new Zr(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new Nl(t,e,e,kn,On);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let s=this.bones[t];if(s.name===e)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,s=e.bones.length;n<s;n++){let r=e.bones[n],a=t[r];a===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),a=new Xa),this.bones.push(a),this.boneInverses.push(new Ze().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let s=0,r=t.length;s<r;s++){let a=t[s];e.bones.push(a.uuid);let o=n[s];e.boneInverses.push(o.toArray())}return e}},ur=class extends Gt{constructor(e,t,n,s=1){super(e,t,n);this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},Kr=new Ze,ap=new Ze,Bl=[],op=new ei,cx=new Ze,Ya=new Qt,Qa=new Gn,Ol=class extends Qt{constructor(e,t,n){super(e,t);this.isInstancedMesh=!0,this.instanceMatrix=new ur(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,cx)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new ei),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Kr),op.copy(e.boundingBox).applyMatrix4(Kr),this.boundingBox.union(op)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Gn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Kr),Qa.copy(e.boundingSphere).applyMatrix4(Kr),this.boundingSphere.union(Qa)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=e*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(e,t){let n=this.matrixWorld,s=this.count;if(Ya.geometry=this.geometry,Ya.material=this.material,Ya.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Qa.copy(this.boundingSphere),Qa.applyMatrix4(n),e.ray.intersectsSphere(Qa)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Kr),ap.multiplyMatrices(n,Kr),Ya.matrixWorld=ap,Ya.raycast(e,Bl);for(let a=0,o=Bl.length;a<o;a++){let l=Bl[a];l.instanceId=r,l.object=this,t.push(l)}Bl.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new ur(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){let n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Nl(new Float32Array(s*this.count),s,this.count,Fo,On));let r=this.morphTexture.source.data.data,a=0;for(let c=0;c<n.length;c++)a+=n[c];let o=this.geometry.morphTargetsRelative?1:1-a,l=s*e;r[l]=o,r.set(n,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}},Qu=new k,ux=new k,hx=new ot,Ji=class{constructor(e=new k(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let s=Qu.subVectors(n,t).cross(ux.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta(Qu),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||hx.getNormalMatrix(e),s=this.coplanarPoint(Qu).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},hr=new Gn,kl=new k,qa=class{constructor(e=new Ji,t=new Ji,n=new Ji,s=new Ji,r=new Ji,a=new Ji){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=gi){let n=this.planes,s=e.elements,r=s[0],a=s[1],o=s[2],l=s[3],c=s[4],u=s[5],h=s[6],d=s[7],p=s[8],g=s[9],v=s[10],m=s[11],f=s[12],x=s[13],_=s[14],y=s[15];if(n[0].setComponents(l-r,d-c,m-p,y-f).normalize(),n[1].setComponents(l+r,d+c,m+p,y+f).normalize(),n[2].setComponents(l+a,d+u,m+g,y+x).normalize(),n[3].setComponents(l-a,d-u,m-g,y-x).normalize(),n[4].setComponents(l-o,d-h,m-v,y-_).normalize(),t===gi)n[5].setComponents(l+o,d+h,m+v,y+_).normalize();else if(t===Na)n[5].setComponents(o,h,v,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),hr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),hr.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(hr)}intersectsSprite(e){return hr.center.set(0,0,0),hr.radius=.7071067811865476,hr.applyMatrix4(e.matrixWorld),this.intersectsSphere(hr)}intersectsSphere(e){let t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let s=t[n];if(kl.x=s.normal.x>0?e.max.x:e.min.x,kl.y=s.normal.y>0?e.max.y:e.min.y,kl.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(kl)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var Ts=class extends un{constructor(e){super();this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ye(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},zl=new k,Hl=new k,lp=new Ze,ja=new rr,Gl=new Gn,qu=new k,cp=new k,Ms=class extends Rt{constructor(e=new Yt,t=new Ts){super();this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)zl.fromBufferAttribute(t,s-1),Hl.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=zl.distanceTo(Hl);e.setAttribute("lineDistance",new Xt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Gl.copy(n.boundingSphere),Gl.applyMatrix4(s),Gl.radius+=r,e.ray.intersectsSphere(Gl)===!1)return;lp.copy(s).invert(),ja.copy(e.ray).applyMatrix4(lp);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,u=n.index,d=n.attributes.position;if(u!==null){let p=Math.max(0,a.start),g=Math.min(u.count,a.start+a.count);for(let v=p,m=g-1;v<m;v+=c){let f=u.getX(v),x=u.getX(v+1),_=Vl(this,e,ja,l,f,x);_&&t.push(_)}if(this.isLineLoop){let v=u.getX(g-1),m=u.getX(p),f=Vl(this,e,ja,l,v,m);f&&t.push(f)}}else{let p=Math.max(0,a.start),g=Math.min(d.count,a.start+a.count);for(let v=p,m=g-1;v<m;v+=c){let f=Vl(this,e,ja,l,v,v+1);f&&t.push(f)}if(this.isLineLoop){let v=Vl(this,e,ja,l,g-1,p);v&&t.push(v)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function Vl(i,e,t,n,s,r){let a=i.geometry.attributes.position;if(zl.fromBufferAttribute(a,s),Hl.fromBufferAttribute(a,r),t.distanceSqToSegment(zl,Hl,qu,cp)>n)return;qu.applyMatrix4(i.matrixWorld);let l=e.ray.origin.distanceTo(qu);if(!(l<e.near||l>e.far))return{distance:l,point:cp.clone().applyMatrix4(i.matrixWorld),index:s,face:null,faceIndex:null,barycoord:null,object:i}}var up=new k,hp=new k,Jr=class extends Ms{constructor(e,t){super(e,t);this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)up.fromBufferAttribute(t,s),hp.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+up.distanceTo(hp);e.setAttribute("lineDistance",new Xt(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},Wl=class extends Ms{constructor(e,t){super(e,t);this.isLineLoop=!0,this.type="LineLoop"}},Za=class extends un{constructor(e){super();this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new ye(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},dp=new Ze,ju=new rr,Xl=new Gn,Yl=new k,Ql=class extends Rt{constructor(e=new Yt,t=new Za){super();this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Xl.copy(n.boundingSphere),Xl.applyMatrix4(s),Xl.radius+=r,e.ray.intersectsSphere(Xl)===!1)return;dp.copy(s).invert(),ju.copy(e.ray).applyMatrix4(dp);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,h=n.attributes.position;if(c!==null){let d=Math.max(0,a.start),p=Math.min(c.count,a.start+a.count);for(let g=d,v=p;g<v;g++){let m=c.getX(g);Yl.fromBufferAttribute(h,m),fp(Yl,m,l,s,e,t,this)}}else{let d=Math.max(0,a.start),p=Math.min(h.count,a.start+a.count);for(let g=d,v=p;g<v;g++)Yl.fromBufferAttribute(h,g),fp(Yl,g,l,s,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function fp(i,e,t,n,s,r,a){let o=ju.distanceSqToPoint(i);if(o<t){let l=new k;ju.closestPointToPoint(i,l),l.applyMatrix4(n);let c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}var ft=class extends Rt{constructor(){super();this.isGroup=!0,this.type="Group"}};var $r=class extends zt{constructor(e,t,n,s,r,a,o,l,c,u=Ks){if(u!==Ks&&u!==Vi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===Ks&&(n=Di),n===void 0&&u===Vi&&(n=Gi);super(null,s,r,a,o,l,u,n,c);this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:mn,this.minFilter=l!==void 0?l:mn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}};var ea=class extends Yt{constructor(e=1,t=1,n=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super();this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};let c=this;s=Math.floor(s),r=Math.floor(r);let u=[],h=[],d=[],p=[],g=0,v=[],m=n/2,f=0;x(),a===!1&&(e>0&&_(!0),t>0&&_(!1)),this.setIndex(u),this.setAttribute("position",new Xt(h,3)),this.setAttribute("normal",new Xt(d,3)),this.setAttribute("uv",new Xt(p,2));function x(){let y=new k,T=new k,M=0,R=(t-e)/n;for(let C=0;C<=r;C++){let b=[],S=C/r,D=S*(t-e)+e;for(let U=0;U<=s;U++){let O=U/s,B=O*l+o,G=Math.sin(B),N=Math.cos(B);T.x=D*G,T.y=-S*n+m,T.z=D*N,h.push(T.x,T.y,T.z),y.set(G,R,N).normalize(),d.push(y.x,y.y,y.z),p.push(O,1-S),b.push(g++)}v.push(b)}for(let C=0;C<s;C++)for(let b=0;b<r;b++){let S=v[b][C],D=v[b+1][C],U=v[b+1][C+1],O=v[b][C+1];(e>0||b!==0)&&(u.push(S,D,O),M+=3),(t>0||b!==r-1)&&(u.push(D,U,O),M+=3)}c.addGroup(f,M,0),f+=M}function _(y){let T=g,M=new Re,R=new k,C=0,b=y===!0?e:t,S=y===!0?1:-1;for(let U=1;U<=s;U++)h.push(0,m*S,0),d.push(0,S,0),p.push(.5,.5),g++;let D=g;for(let U=0;U<=s;U++){let B=U/s*l+o,G=Math.cos(B),N=Math.sin(B);R.x=b*N,R.y=m*S,R.z=b*G,h.push(R.x,R.y,R.z),d.push(0,S,0),M.x=G*.5+.5,M.y=N*.5*S+.5,p.push(M.x,M.y),g++}for(let U=0;U<s;U++){let O=T+U,B=D+U;y===!0?u.push(B,B+1,O):u.push(B+1,B,O),C+=3}c.addGroup(f,C,y===!0?1:2),f+=C}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ea(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}};var ta=class extends Yt{constructor(e=1,t=1,n=1,s=1){super();this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};let r=e/2,a=t/2,o=Math.floor(n),l=Math.floor(s),c=o+1,u=l+1,h=e/o,d=t/l,p=[],g=[],v=[],m=[];for(let f=0;f<u;f++){let x=f*d-a;for(let _=0;_<c;_++){let y=_*h-r;g.push(y,-x,0),v.push(0,0,1),m.push(_/o),m.push(1-f/l)}}for(let f=0;f<l;f++)for(let x=0;x<o;x++){let _=x+c*f,y=x+c*(f+1),T=x+1+c*(f+1),M=x+1+c*f;p.push(_,y,M),p.push(y,T,M)}this.setIndex(p),this.setAttribute("position",new Xt(g,3)),this.setAttribute("normal",new Xt(v,3)),this.setAttribute("uv",new Xt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ta(e.width,e.height,e.widthSegments,e.heightSegments)}};var na=class extends un{constructor(e){super();this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new ye(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ye(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=hl,this.normalScale=new Re(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ti,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Yn=class extends na{constructor(e){super();this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Re(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return mt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new ye(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new ye(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new ye(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}};var ql=class extends un{constructor(e){super();this.isMeshToonMaterial=!0,this.defines={TOON:""},this.type="MeshToonMaterial",this.color=new ye(16777215),this.map=null,this.gradientMap=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ye(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=hl,this.normalScale=new Re(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.gradientMap=e.gradientMap,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.alphaMap=e.alphaMap,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}};var Zu=class extends un{constructor(e){super();this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=mi,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Ku=class extends un{constructor(e){super();this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function jl(i,e,t){return!i||!t&&i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function dx(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function fx(i){function e(s,r){return i[s]-i[r]}let t=i.length,n=new Array(t);for(let s=0;s!==t;++s)n[s]=s;return n.sort(e),n}function pp(i,e,t){let n=i.length,s=new i.constructor(n);for(let r=0,a=0;a!==n;++r){let o=t[r]*e;for(let l=0;l!==e;++l)s[a++]=i[o+l]}return s}function mp(i,e,t,n){let s=1,r=i[0];for(;r!==void 0&&r[n]===void 0;)r=i[s++];if(r===void 0)return;let a=r[n];if(a!==void 0)if(Array.isArray(a))do a=r[n],a!==void 0&&(e.push(r.time),t.push.apply(t,a)),r=i[s++];while(r!==void 0);else if(a.toArray!==void 0)do a=r[n],a!==void 0&&(e.push(r.time),a.toArray(t,t.length)),r=i[s++];while(r!==void 0);else do a=r[n],a!==void 0&&(e.push(r.time),t.push(a)),r=i[s++];while(r!==void 0)}var ws=class{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,s=t[n],r=t[n-1];n:{e:{let a;t:{i:if(!(e<s)){for(let o=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=s,s=t[++n],e<s)break e}a=t.length;break t}if(!(e>=r)){let o=t[1];e<o&&(n=2,r=o);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(s=r,r=t[--n-1],e>=r)break e}a=n,n=0;break t}break n}for(;n<a;){let o=n+a>>>1;e<t[o]?a=o:n=o+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let a=0;a!==s;++a)t[a]=n[r+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Ju=class extends ws{constructor(e,t,n,s){super(e,t,n,s);this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:cu,endingEnd:cu}}intervalChanged_(e,t,n){let s=this.parameterPositions,r=e-2,a=e+1,o=s[r],l=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case uu:r=e,o=2*t-n;break;case hu:r=s.length-2,o=t+s[r]-s[r+1];break;default:r=e,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case uu:a=e,l=2*n-t;break;case hu:a=1,l=n+s[1]-s[0];break;default:a=e-1,l=t}let c=(n-t)*.5,u=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-n),this._offsetPrev=r*u,this._offsetNext=a*u}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,u=this._offsetPrev,h=this._offsetNext,d=this._weightPrev,p=this._weightNext,g=(n-t)/(s-t),v=g*g,m=v*g,f=-d*m+2*d*v-d*g,x=(1+d)*m+(-1.5-2*d)*v+(-.5+d)*g+1,_=(-1-p)*m+(1.5+p)*v+.5*g,y=p*m-p*v;for(let T=0;T!==o;++T)r[T]=f*a[u+T]+x*a[c+T]+_*a[l+T]+y*a[h+T];return r}},$u=class extends ws{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,u=(n-t)/(s-t),h=1-u;for(let d=0;d!==o;++d)r[d]=a[c+d]*h+a[l+d]*u;return r}},eh=class extends ws{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}},si=class{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=jl(t,this.TimeBufferType),this.values=jl(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:jl(e.times,Array),values:jl(e.values,Array)};let s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new eh(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new $u(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Ju(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Js:t=this.InterpolantFactoryMethodDiscrete;break;case $s:t=this.InterpolantFactoryMethodLinear;break;case ul:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Js;case this.InterpolantFactoryMethodLinear:return $s;case this.InterpolantFactoryMethodSmooth:return ul}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e}return this}trim(e,t){let n=this.times,s=n.length,r=0,a=s-1;for(;r!==s&&n[r]<e;)++r;for(;a!==-1&&n[a]>t;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!=0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,s=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){let l=n[o];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(s!==void 0&&dx(s))for(let o=0,l=s.length;o!==l;++o){let c=s[o];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===ul,r=e.length-1,a=1;for(let o=1;o<r;++o){let l=!1,c=e[o],u=e[o+1];if(c!==u&&(o!==1||c!==e[0]))if(s)l=!0;else{let h=o*n,d=h-n,p=h+n;for(let g=0;g!==n;++g){let v=t[h+g];if(v!==t[d+g]||v!==t[p+g]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];let h=o*n,d=a*n;for(let p=0;p!==n;++p)t[d+p]=t[h+p]}++a}}if(r>0){e[a]=e[r];for(let o=r*n,l=a*n,c=0;c!==n;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,s}};si.prototype.TimeBufferType=Float32Array;si.prototype.ValueBufferType=Float32Array;si.prototype.DefaultInterpolation=$s;var Cs=class extends si{constructor(e,t,n){super(e,t,n)}};Cs.prototype.ValueTypeName="bool";Cs.prototype.ValueBufferType=Array;Cs.prototype.DefaultInterpolation=Js;Cs.prototype.InterpolantFactoryMethodLinear=void 0;Cs.prototype.InterpolantFactoryMethodSmooth=void 0;var Zl=class extends si{};Zl.prototype.ValueTypeName="color";var $i=class extends si{};$i.prototype.ValueTypeName="number";var th=class extends ws{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-t)/(s-t),c=e*o;for(let u=c+o;c!==u;c+=4)Hn.slerpFlat(r,0,a,c-o,a,c,l);return r}},es=class extends si{InterpolantFactoryMethodLinear(e){return new th(this.times,this.values,this.getValueSize(),e)}};es.prototype.ValueTypeName="quaternion";es.prototype.InterpolantFactoryMethodSmooth=void 0;var Rs=class extends si{constructor(e,t,n){super(e,t,n)}};Rs.prototype.ValueTypeName="string";Rs.prototype.ValueBufferType=Array;Rs.prototype.DefaultInterpolation=Js;Rs.prototype.InterpolantFactoryMethodLinear=void 0;Rs.prototype.InterpolantFactoryMethodSmooth=void 0;var ts=class extends si{};ts.prototype.ValueTypeName="vector";var Kl=class{constructor(e="",t=-1,n=[],s=_f){this.name=e,this.tracks=n,this.duration=t,this.blendMode=s,this.uuid=vi(),this.duration<0&&this.resetDuration()}static parse(e){let t=[],n=e.tracks,s=1/(e.fps||1);for(let a=0,o=n.length;a!==o;++a)t.push(mx(n[a]).scale(s));let r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r}static toJSON(e){let t=[],n=e.tracks,s={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let r=0,a=n.length;r!==a;++r)t.push(si.toJSON(n[r]));return s}static CreateFromMorphTargetSequence(e,t,n,s){let r=t.length,a=[];for(let o=0;o<r;o++){let l=[],c=[];l.push((o+r-1)%r,o,(o+1)%r),c.push(0,1,0);let u=fx(l);l=pp(l,1,u),c=pp(c,1,u),!s&&l[0]===0&&(l.push(r),c.push(c[0])),a.push(new $i(".morphTargetInfluences["+t[o].name+"]",l,c).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){let s=e;n=s.geometry&&s.geometry.animations||s.animations}for(let s=0;s<n.length;s++)if(n[s].name===t)return n[s];return null}static CreateClipsFromMorphTargetSequences(e,t,n){let s={},r=/^([\w-]*?)([\d]+)$/;for(let o=0,l=e.length;o<l;o++){let c=e[o],u=c.name.match(r);if(u&&u.length>1){let h=u[1],d=s[h];d||(s[h]=d=[]),d.push(c)}}let a=[];for(let o in s)a.push(this.CreateFromMorphTargetSequence(o,s[o],t,n));return a}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;let n=function(h,d,p,g,v){if(p.length!==0){let m=[],f=[];mp(p,m,f,g),m.length!==0&&v.push(new h(d,m,f))}},s=[],r=e.name||"default",a=e.fps||30,o=e.blendMode,l=e.length||-1,c=e.hierarchy||[];for(let h=0;h<c.length;h++){let d=c[h].keys;if(!(!d||d.length===0))if(d[0].morphTargets){let p={},g;for(g=0;g<d.length;g++)if(d[g].morphTargets)for(let v=0;v<d[g].morphTargets.length;v++)p[d[g].morphTargets[v]]=-1;for(let v in p){let m=[],f=[];for(let x=0;x!==d[g].morphTargets.length;++x){let _=d[g];m.push(_.time),f.push(_.morphTarget===v?1:0)}s.push(new $i(".morphTargetInfluence["+v+"]",m,f))}l=p.length*a}else{let p=".bones["+t[h].name+"]";n(ts,p+".position",d,"pos",s),n(es,p+".quaternion",d,"rot",s),n(ts,p+".scale",d,"scl",s)}}return s.length===0?null:new this(r,l,s,o)}resetDuration(){let e=this.tracks,t=0;for(let n=0,s=e.length;n!==s;++n){let r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}};function px(i){switch(i.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return $i;case"vector":case"vector2":case"vector3":case"vector4":return ts;case"color":return Zl;case"quaternion":return es;case"bool":case"boolean":return Cs;case"string":return Rs}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+i)}function mx(i){if(i.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=px(i.type);if(i.times===void 0){let t=[],n=[];mp(i.keys,t,n,"value"),i.times=t,i.values=n}return e.parse!==void 0?e.parse(i):new e(i.name,i.times,i.values,i.interpolation)}var ns={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(this.files[i]=e)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}},Ka=class{constructor(e,t,n){let s=this,r=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(u){o++,r===!1&&s.onStart!==void 0&&s.onStart(u,a,o),r=!0},this.itemEnd=function(u){a++,s.onProgress!==void 0&&s.onProgress(u,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(u){s.onError!==void 0&&s.onError(u)},this.resolveURL=function(u){return l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,h){return c.push(u,h),this},this.removeHandler=function(u){let h=c.indexOf(u);return h!==-1&&c.splice(h,2),this},this.getHandler=function(u){for(let h=0,d=c.length;h<d;h+=2){let p=c[h],g=c[h+1];if(p.global&&(p.lastIndex=0),p.test(u))return g}return null}}},gp=new Ka,Si=class{constructor(e){this.manager=e!==void 0?e:gp,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}};Si.DEFAULT_MATERIAL_NAME="__DEFAULT";var is={},vp=class extends Error{constructor(e,t){super(e);this.response=t}},Ds=class extends Si{constructor(e){super(e)}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=ns.get(e);if(r!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0),r;if(is[e]!==void 0){is[e].push({onLoad:t,onProgress:n,onError:s});return}is[e]=[],is[e].push({onLoad:t,onProgress:n,onError:s});let a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),o=this.mimeType,l=this.responseType;fetch(a).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream=="undefined"||c.body===void 0||c.body.getReader===void 0)return c;let u=is[e],h=c.body.getReader(),d=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),p=d?parseInt(d):0,g=p!==0,v=0,m=new ReadableStream({start(f){x();function x(){h.read().then(({done:_,value:y})=>{if(_)f.close();else{v+=y.byteLength;let T=new ProgressEvent("progress",{lengthComputable:g,loaded:v,total:p});for(let M=0,R=u.length;M<R;M++){let C=u[M];C.onProgress&&C.onProgress(T)}f.enqueue(y),x()}},_=>{f.error(_)})}}});return new Response(m)}else throw new vp(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(u=>new DOMParser().parseFromString(u,o));case"json":return c.json();default:if(o===void 0)return c.text();{let h=/charset="?([^;"\s]*)"?/i.exec(o),d=h&&h[1]?h[1].toLowerCase():void 0,p=new TextDecoder(d);return c.arrayBuffer().then(g=>p.decode(g))}}}).then(c=>{ns.add(e,c);let u=is[e];delete is[e];for(let h=0,d=u.length;h<d;h++){let p=u[h];p.onLoad&&p.onLoad(c)}}).catch(c=>{let u=is[e];if(u===void 0)throw this.manager.itemError(e),c;delete is[e];for(let h=0,d=u.length;h<d;h++){let p=u[h];p.onError&&p.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}};var nh=class extends Si{constructor(e){super(e)}load(e,t,n,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,a=ns.get(e);if(a!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0),a;let o=Nr("img");function l(){u(),ns.add(e,this),t&&t(this),r.manager.itemEnd(e)}function c(h){u(),s&&s(h),r.manager.itemError(e),r.manager.itemEnd(e)}function u(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),r.manager.itemStart(e),o.src=e,o}};var Jl=class extends Si{constructor(e){super(e)}load(e,t,n,s){let r=new zt,a=new nh(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){r.image=o,r.needsUpdate=!0,t!==void 0&&t(r)},n,s),r}},ia=class extends Rt{constructor(e,t=1){super();this.isLight=!0,this.type="Light",this.color=new ye(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}};var ih=new Ze,xp=new k,yp=new k,$l=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Re(512,512),this.map=null,this.mapPass=null,this.matrix=new Ze,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new qa,this._frameExtents=new Re(1,1),this._viewportCount=1,this._viewports=[new yt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;xp.setFromMatrixPosition(e.matrixWorld),t.position.copy(xp),yp.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(yp),t.updateMatrixWorld(),ih.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ih),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(ih)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Ap=class extends $l{constructor(){super(new qt(50,1,.5,500));this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){let t=this.camera,n=tr*2*e.angle*this.focus,s=this.mapSize.width/this.mapSize.height,r=e.distance||t.far;(n!==t.fov||s!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=s,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}},ec=class extends ia{constructor(e,t,n=0,s=Math.PI/3,r=0,a=2){super(e,t);this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Rt.DEFAULT_UP),this.updateMatrix(),this.target=new Rt,this.distance=n,this.angle=s,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new Ap}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}},_p=new Ze,Ja=new k,sh=new k,Sp=class extends $l{constructor(){super(new qt(90,1,.5,500));this.isPointLightShadow=!0,this._frameExtents=new Re(4,2),this._viewportCount=6,this._viewports=[new yt(2,1,1,1),new yt(0,1,1,1),new yt(3,1,1,1),new yt(1,1,1,1),new yt(3,0,1,1),new yt(1,0,1,1)],this._cubeDirections=[new k(1,0,0),new k(-1,0,0),new k(0,0,1),new k(0,0,-1),new k(0,1,0),new k(0,-1,0)],this._cubeUps=[new k(0,1,0),new k(0,1,0),new k(0,1,0),new k(0,1,0),new k(0,0,1),new k(0,0,-1)]}updateMatrices(e,t=0){let n=this.camera,s=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),Ja.setFromMatrixPosition(e.matrixWorld),n.position.copy(Ja),sh.copy(n.position),sh.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(sh),n.updateMatrixWorld(),s.makeTranslation(-Ja.x,-Ja.y,-Ja.z),_p.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(_p)}},tc=class extends ia{constructor(e,t,n=0,s=2){super(e,t);this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new Sp}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}},sa=class extends lr{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super();this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-e,a=n+e,o=s+t,l=s-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},bp=class extends $l{constructor(){super(new sa(-5,5,5,-5,.5,500));this.isDirectionalLightShadow=!0}},ra=class extends ia{constructor(e,t){super(e,t);this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Rt.DEFAULT_UP),this.updateMatrix(),this.target=new Rt,this.shadow=new bp}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}},nc=class extends ia{constructor(e,t){super(e,t);this.isAmbientLight=!0,this.type="AmbientLight"}};var Ps=class{static decodeText(e){if(console.warn("THREE.LoaderUtils: decodeText() has been deprecated with r165 and will be removed with r175. Use TextDecoder instead."),typeof TextDecoder!="undefined")return new TextDecoder().decode(e);let t="";for(let n=0,s=e.length;n<s;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){let t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}};var ic=class extends Si{constructor(e){super(e);this.isImageBitmapLoader=!0,typeof createImageBitmap=="undefined"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch=="undefined"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,a=ns.get(e);if(a!==void 0){if(r.manager.itemStart(e),a.then){a.then(c=>{t&&t(c),r.manager.itemEnd(e)}).catch(c=>{s&&s(c)});return}return setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0),a}let o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader;let l=fetch(e,o).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(c){return ns.add(e,c),t&&t(c),r.manager.itemEnd(e),c}).catch(function(c){s&&s(c),ns.remove(e),r.manager.itemError(e),r.manager.itemEnd(e)});ns.add(e,l),r.manager.itemStart(e)}};var rh=class extends qt{constructor(e=[]){super();this.isArrayCamera=!0,this.cameras=e}};var ah="\\[\\]\\.:\\/",gx=new RegExp("["+ah+"]","g"),oh="[^"+ah+"]",vx="[^"+ah.replace("\\.","")+"]",xx=/((?:WC+[\/:])*)/.source.replace("WC",oh),yx=/(WCOD+)?/.source.replace("WCOD",vx),Ax=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",oh),_x=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",oh),Sx=new RegExp("^"+xx+yx+Ax+_x+"$"),bx=["material","materials","bones","map"],Ep=class{constructor(e,t,n){let s=n||wt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},wt=class{constructor(e,t,n){this.path=t,this.parsedPath=n||wt.parseTrackName(t),this.node=wt.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new wt.Composite(e,t,n):new wt(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(gx,"")}static parseTrackName(e){let t=Sx.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);bx.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===t||o.uuid===t)return o;let l=n(o.children);if(l)return l}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,s=t.propertyName,r=t.propertyIndex;if(e||(e=wt.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===c){c=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}let a=e[s];if(a===void 0){let c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};wt.Composite=Ep;wt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};wt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};wt.prototype.GetterByBindingType=[wt.prototype._getValue_direct,wt.prototype._getValue_array,wt.prototype._getValue_arrayElement,wt.prototype._getValue_toArray];wt.prototype.SetterByBindingTypeAndVersioning=[[wt.prototype._setValue_direct,wt.prototype._setValue_direct_setNeedsUpdate,wt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[wt.prototype._setValue_array,wt.prototype._setValue_array_setNeedsUpdate,wt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[wt.prototype._setValue_arrayElement,wt.prototype._setValue_arrayElement_setNeedsUpdate,wt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[wt.prototype._setValue_fromArray,wt.prototype._setValue_fromArray_setNeedsUpdate,wt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var rM=new Float32Array(1);var Oe=class{constructor(e){this.value=e}clone(){return new Oe(this.value.clone===void 0?this.value:this.value.clone())}};var Tp=new Ze,sc=class{constructor(e,t,n=0,s=1/0){this.ray=new rr(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new Ha,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Tp.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Tp),this}intersectObject(e,t=!0,n=[]){return lh(e,this,n,t),n.sort(Mp),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)lh(e[s],this,n,t);return n.sort(Mp),n}};function Mp(i,e){return i.distance-e.distance}function lh(i,e,t,n){let s=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(s=!1),s===!0&&n===!0){let r=i.children;for(let a=0,o=r.length;a<o;a++)lh(r[a],e,t,!0)}}var rc=class extends Jr{constructor(e=10,t=10,n=4473924,s=8947848){n=new ye(n),s=new ye(s);let r=t/2,a=e/t,o=e/2,l=[],c=[];for(let d=0,p=0,g=-o;d<=t;d++,g+=a){l.push(-o,0,g,o,0,g),l.push(g,0,-o,g,0,o);let v=d===r?n:s;v.toArray(c,p),p+=3,v.toArray(c,p),p+=3,v.toArray(c,p),p+=3,v.toArray(c,p),p+=3}let u=new Yt;u.setAttribute("position",new Xt(l,3)),u.setAttribute("color",new Xt(c,3));let h=new Ts({vertexColors:!0,toneMapped:!1});super(u,h);this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}};var wp=new k,ac=new k,Cp=new k,oc=class extends Rt{constructor(e,t,n){super();this.light=e,this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1,this.color=n,this.type="DirectionalLightHelper",t===void 0&&(t=1);let s=new Yt;s.setAttribute("position",new Xt([-t,t,0,t,t,0,t,-t,0,-t,-t,0,-t,t,0],3));let r=new Ts({fog:!1,toneMapped:!1});this.lightPlane=new Ms(s,r),this.add(this.lightPlane),s=new Yt,s.setAttribute("position",new Xt([0,0,0,0,0,1],3)),this.targetLine=new Ms(s,r),this.add(this.targetLine),this.update()}dispose(){this.lightPlane.geometry.dispose(),this.lightPlane.material.dispose(),this.targetLine.geometry.dispose(),this.targetLine.material.dispose()}update(){this.light.updateWorldMatrix(!0,!1),this.light.target.updateWorldMatrix(!0,!1),wp.setFromMatrixPosition(this.light.matrixWorld),ac.setFromMatrixPosition(this.light.target.matrixWorld),Cp.subVectors(ac,wp),this.lightPlane.lookAt(ac),this.color!==void 0?(this.lightPlane.material.color.set(this.color),this.targetLine.material.color.set(this.color)):(this.lightPlane.material.color.copy(this.light.color),this.targetLine.material.color.copy(this.light.color)),this.targetLine.lookAt(ac),this.targetLine.scale.z=Cp.length()}},lc=new k,Zt=new lr,cc=class extends Jr{constructor(e){let t=new Yt,n=new Ts({color:16777215,vertexColors:!0,toneMapped:!1}),s=[],r=[],a={};o("n1","n2"),o("n2","n4"),o("n4","n3"),o("n3","n1"),o("f1","f2"),o("f2","f4"),o("f4","f3"),o("f3","f1"),o("n1","f1"),o("n2","f2"),o("n3","f3"),o("n4","f4"),o("p","n1"),o("p","n2"),o("p","n3"),o("p","n4"),o("u1","u2"),o("u2","u3"),o("u3","u1"),o("c","t"),o("p","c"),o("cn1","cn2"),o("cn3","cn4"),o("cf1","cf2"),o("cf3","cf4");function o(g,v){l(g),l(v)}function l(g){s.push(0,0,0),r.push(0,0,0),a[g]===void 0&&(a[g]=[]),a[g].push(s.length/3-1)}t.setAttribute("position",new Xt(s,3)),t.setAttribute("color",new Xt(r,3));super(t,n);this.type="CameraHelper",this.camera=e,this.camera.updateProjectionMatrix&&this.camera.updateProjectionMatrix(),this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1,this.pointMap=a,this.update();let c=new ye(16755200),u=new ye(16711680),h=new ye(43775),d=new ye(16777215),p=new ye(3355443);this.setColors(c,u,h,d,p)}setColors(e,t,n,s,r){let o=this.geometry.getAttribute("color");o.setXYZ(0,e.r,e.g,e.b),o.setXYZ(1,e.r,e.g,e.b),o.setXYZ(2,e.r,e.g,e.b),o.setXYZ(3,e.r,e.g,e.b),o.setXYZ(4,e.r,e.g,e.b),o.setXYZ(5,e.r,e.g,e.b),o.setXYZ(6,e.r,e.g,e.b),o.setXYZ(7,e.r,e.g,e.b),o.setXYZ(8,e.r,e.g,e.b),o.setXYZ(9,e.r,e.g,e.b),o.setXYZ(10,e.r,e.g,e.b),o.setXYZ(11,e.r,e.g,e.b),o.setXYZ(12,e.r,e.g,e.b),o.setXYZ(13,e.r,e.g,e.b),o.setXYZ(14,e.r,e.g,e.b),o.setXYZ(15,e.r,e.g,e.b),o.setXYZ(16,e.r,e.g,e.b),o.setXYZ(17,e.r,e.g,e.b),o.setXYZ(18,e.r,e.g,e.b),o.setXYZ(19,e.r,e.g,e.b),o.setXYZ(20,e.r,e.g,e.b),o.setXYZ(21,e.r,e.g,e.b),o.setXYZ(22,e.r,e.g,e.b),o.setXYZ(23,e.r,e.g,e.b),o.setXYZ(24,t.r,t.g,t.b),o.setXYZ(25,t.r,t.g,t.b),o.setXYZ(26,t.r,t.g,t.b),o.setXYZ(27,t.r,t.g,t.b),o.setXYZ(28,t.r,t.g,t.b),o.setXYZ(29,t.r,t.g,t.b),o.setXYZ(30,t.r,t.g,t.b),o.setXYZ(31,t.r,t.g,t.b),o.setXYZ(32,n.r,n.g,n.b),o.setXYZ(33,n.r,n.g,n.b),o.setXYZ(34,n.r,n.g,n.b),o.setXYZ(35,n.r,n.g,n.b),o.setXYZ(36,n.r,n.g,n.b),o.setXYZ(37,n.r,n.g,n.b),o.setXYZ(38,s.r,s.g,s.b),o.setXYZ(39,s.r,s.g,s.b),o.setXYZ(40,r.r,r.g,r.b),o.setXYZ(41,r.r,r.g,r.b),o.setXYZ(42,r.r,r.g,r.b),o.setXYZ(43,r.r,r.g,r.b),o.setXYZ(44,r.r,r.g,r.b),o.setXYZ(45,r.r,r.g,r.b),o.setXYZ(46,r.r,r.g,r.b),o.setXYZ(47,r.r,r.g,r.b),o.setXYZ(48,r.r,r.g,r.b),o.setXYZ(49,r.r,r.g,r.b),o.needsUpdate=!0}update(){let e=this.geometry,t=this.pointMap,n=1,s=1;Zt.projectionMatrixInverse.copy(this.camera.projectionMatrixInverse);let r=this.camera.coordinateSystem===gi?-1:0;en("c",t,e,Zt,0,0,r),en("t",t,e,Zt,0,0,1),en("n1",t,e,Zt,-n,-s,r),en("n2",t,e,Zt,n,-s,r),en("n3",t,e,Zt,-n,s,r),en("n4",t,e,Zt,n,s,r),en("f1",t,e,Zt,-n,-s,1),en("f2",t,e,Zt,n,-s,1),en("f3",t,e,Zt,-n,s,1),en("f4",t,e,Zt,n,s,1),en("u1",t,e,Zt,n*.7,s*1.1,r),en("u2",t,e,Zt,-n*.7,s*1.1,r),en("u3",t,e,Zt,0,s*2,r),en("cf1",t,e,Zt,-n,0,1),en("cf2",t,e,Zt,n,0,1),en("cf3",t,e,Zt,0,-s,1),en("cf4",t,e,Zt,0,s,1),en("cn1",t,e,Zt,-n,0,r),en("cn2",t,e,Zt,n,0,r),en("cn3",t,e,Zt,0,-s,r),en("cn4",t,e,Zt,0,s,r),e.getAttribute("position").needsUpdate=!0}dispose(){this.geometry.dispose(),this.material.dispose()}};function en(i,e,t,n,s,r,a){lc.set(s,r,a).unproject(n);let o=e[i];if(o!==void 0){let l=t.getAttribute("position");for(let c=0,u=o.length;c<u;c++)l.setXYZ(o[c],lc.x,lc.y,lc.z)}}function ch(i,e,t,n){let s=Ex(n);switch(t){case iu:return i*e;case ru:return i*e;case au:return i*e*2;case Fo:return i*e/s.components*s.byteLength;case Uo:return i*e/s.components*s.byteLength;case ou:return i*e*2/s.components*s.byteLength;case No:return i*e*2/s.components*s.byteLength;case su:return i*e*3/s.components*s.byteLength;case kn:return i*e*4/s.components*s.byteLength;case Bo:return i*e*4/s.components*s.byteLength;case Ra:case Da:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Pa:case Ia:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case ko:case Ho:return Math.max(i,16)*Math.max(e,8)/4;case Oo:case zo:return Math.max(i,8)*Math.max(e,8)/2;case Go:case Vo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Wo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Xo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Yo:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case Qo:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case qo:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case jo:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case Zo:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Ko:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Jo:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case $o:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case el:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case tl:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case nl:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case il:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case sl:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case La:case rl:case al:return Math.ceil(i/4)*Math.ceil(e/4)*16;case lu:case ol:return Math.ceil(i/4)*Math.ceil(e/4)*8;case ll:case cl:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Ex(i){switch(i){case kt:case eu:return{byteLength:1,components:1};case Lr:case tu:case Fr:return{byteLength:2,components:1};case Io:case Lo:return{byteLength:2,components:4};case Di:case Po:case On:return{byteLength:4,components:1};case nu:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:wi}}));typeof window!="undefined"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=wi);function Rp(){let i=null,e=!1,t=null,n=null;function s(r,a){t(r,a),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function Tx(i){let e=new WeakMap;function t(o,l){let c=o.array,u=o.usage,h=c.byteLength,d=i.createBuffer();i.bindBuffer(l,d),i.bufferData(l,c,u),o.onUploadCallback();let p;if(c instanceof Float32Array)p=i.FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?p=i.HALF_FLOAT:p=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=i.SHORT;else if(c instanceof Uint32Array)p=i.UNSIGNED_INT;else if(c instanceof Int32Array)p=i.INT;else if(c instanceof Int8Array)p=i.BYTE;else if(c instanceof Uint8Array)p=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:h}}function n(o,l,c){let u=l.array,h=l.updateRanges;if(i.bindBuffer(c,o),h.length===0)i.bufferSubData(c,0,u);else{h.sort((p,g)=>p.start-g.start);let d=0;for(let p=1;p<h.length;p++){let g=h[d],v=h[p];v.start<=g.start+g.count+1?g.count=Math.max(g.count,v.start+v.count-g.start):(++d,h[d]=v)}h.length=d+1;for(let p=0,g=h.length;p<g;p++){let v=h[p];i.bufferSubData(c,v.start*u.BYTES_PER_ELEMENT,u,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=e.get(o);l&&(i.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var Mx=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,wx=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Cx=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Rx=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Dx=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Px=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Ix=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Lx=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Fx=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Ux=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Nx=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Bx=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Ox=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,kx=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,zx=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Hx=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Gx=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Vx=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Wx=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Xx=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Yx=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Qx=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,qx=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,jx=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Zx=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Kx=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Jx=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,$x=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,ey=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,ty=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,ny="gl_FragColor = linearToOutputTexel( gl_FragColor );",iy=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,sy=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,ry=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,ay=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,oy=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,ly=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,cy=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,uy=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,hy=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,dy=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,fy=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,py=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,my=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,gy=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,vy=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,xy=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,yy=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Ay=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,_y=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Sy=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,by=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Ey=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Ty=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,My=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,wy=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Cy=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Ry=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Dy=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Py=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Iy=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Ly=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Fy=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Uy=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Ny=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,By=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Oy=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,ky=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,zy=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Hy=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Gy=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Vy=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Wy=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Xy=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Yy=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Qy=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,qy=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,jy=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Zy=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Ky=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Jy=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,$y=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,eA=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,tA=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,nA=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,iA=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,sA=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,rA=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,aA=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,oA=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,lA=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,cA=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,uA=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,hA=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,dA=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,fA=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,pA=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,mA=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,gA=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,vA=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,xA=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,yA=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,AA=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,_A=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,SA=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,bA=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,EA=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,TA=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,MA=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,wA=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,CA=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,RA=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,DA=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,PA=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,IA=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,LA=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,FA=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,UA=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,NA=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,BA=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,OA=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,kA=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,zA=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,HA=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,GA=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,VA=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,WA=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,XA=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,YA=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,QA=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,qA=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,jA=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,ZA=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,KA=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,JA=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,$A=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,e_=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,t_=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,n_=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,i_=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,s_=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,ht={alphahash_fragment:Mx,alphahash_pars_fragment:wx,alphamap_fragment:Cx,alphamap_pars_fragment:Rx,alphatest_fragment:Dx,alphatest_pars_fragment:Px,aomap_fragment:Ix,aomap_pars_fragment:Lx,batching_pars_vertex:Fx,batching_vertex:Ux,begin_vertex:Nx,beginnormal_vertex:Bx,bsdfs:Ox,iridescence_fragment:kx,bumpmap_pars_fragment:zx,clipping_planes_fragment:Hx,clipping_planes_pars_fragment:Gx,clipping_planes_pars_vertex:Vx,clipping_planes_vertex:Wx,color_fragment:Xx,color_pars_fragment:Yx,color_pars_vertex:Qx,color_vertex:qx,common:jx,cube_uv_reflection_fragment:Zx,defaultnormal_vertex:Kx,displacementmap_pars_vertex:Jx,displacementmap_vertex:$x,emissivemap_fragment:ey,emissivemap_pars_fragment:ty,colorspace_fragment:ny,colorspace_pars_fragment:iy,envmap_fragment:sy,envmap_common_pars_fragment:ry,envmap_pars_fragment:ay,envmap_pars_vertex:oy,envmap_physical_pars_fragment:xy,envmap_vertex:ly,fog_vertex:cy,fog_pars_vertex:uy,fog_fragment:hy,fog_pars_fragment:dy,gradientmap_pars_fragment:fy,lightmap_pars_fragment:py,lights_lambert_fragment:my,lights_lambert_pars_fragment:gy,lights_pars_begin:vy,lights_toon_fragment:yy,lights_toon_pars_fragment:Ay,lights_phong_fragment:_y,lights_phong_pars_fragment:Sy,lights_physical_fragment:by,lights_physical_pars_fragment:Ey,lights_fragment_begin:Ty,lights_fragment_maps:My,lights_fragment_end:wy,logdepthbuf_fragment:Cy,logdepthbuf_pars_fragment:Ry,logdepthbuf_pars_vertex:Dy,logdepthbuf_vertex:Py,map_fragment:Iy,map_pars_fragment:Ly,map_particle_fragment:Fy,map_particle_pars_fragment:Uy,metalnessmap_fragment:Ny,metalnessmap_pars_fragment:By,morphinstance_vertex:Oy,morphcolor_vertex:ky,morphnormal_vertex:zy,morphtarget_pars_vertex:Hy,morphtarget_vertex:Gy,normal_fragment_begin:Vy,normal_fragment_maps:Wy,normal_pars_fragment:Xy,normal_pars_vertex:Yy,normal_vertex:Qy,normalmap_pars_fragment:qy,clearcoat_normal_fragment_begin:jy,clearcoat_normal_fragment_maps:Zy,clearcoat_pars_fragment:Ky,iridescence_pars_fragment:Jy,opaque_fragment:$y,packing:eA,premultiplied_alpha_fragment:tA,project_vertex:nA,dithering_fragment:iA,dithering_pars_fragment:sA,roughnessmap_fragment:rA,roughnessmap_pars_fragment:aA,shadowmap_pars_fragment:oA,shadowmap_pars_vertex:lA,shadowmap_vertex:cA,shadowmask_pars_fragment:uA,skinbase_vertex:hA,skinning_pars_vertex:dA,skinning_vertex:fA,skinnormal_vertex:pA,specularmap_fragment:mA,specularmap_pars_fragment:gA,tonemapping_fragment:vA,tonemapping_pars_fragment:xA,transmission_fragment:yA,transmission_pars_fragment:AA,uv_pars_fragment:_A,uv_pars_vertex:SA,uv_vertex:bA,worldpos_vertex:EA,background_vert:TA,background_frag:MA,backgroundCube_vert:wA,backgroundCube_frag:CA,cube_vert:RA,cube_frag:DA,depth_vert:PA,depth_frag:IA,distanceRGBA_vert:LA,distanceRGBA_frag:FA,equirect_vert:UA,equirect_frag:NA,linedashed_vert:BA,linedashed_frag:OA,meshbasic_vert:kA,meshbasic_frag:zA,meshlambert_vert:HA,meshlambert_frag:GA,meshmatcap_vert:VA,meshmatcap_frag:WA,meshnormal_vert:XA,meshnormal_frag:YA,meshphong_vert:QA,meshphong_frag:qA,meshphysical_vert:jA,meshphysical_frag:ZA,meshtoon_vert:KA,meshtoon_frag:JA,points_vert:$A,points_frag:e_,shadow_vert:t_,shadow_frag:n_,sprite_vert:i_,sprite_frag:s_},Ae={common:{diffuse:{value:new ye(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ot},alphaMap:{value:null},alphaMapTransform:{value:new ot},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ot}},envmap:{envMap:{value:null},envMapRotation:{value:new ot},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ot}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ot}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ot},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ot},normalScale:{value:new Re(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ot},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ot}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ot}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ot}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ye(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ye(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ot},alphaTest:{value:0},uvTransform:{value:new ot}},sprite:{diffuse:{value:new ye(16777215)},opacity:{value:1},center:{value:new Re(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ot},alphaMap:{value:null},alphaMapTransform:{value:new ot},alphaTest:{value:0}}},Pi={basic:{uniforms:An([Ae.common,Ae.specularmap,Ae.envmap,Ae.aomap,Ae.lightmap,Ae.fog]),vertexShader:ht.meshbasic_vert,fragmentShader:ht.meshbasic_frag},lambert:{uniforms:An([Ae.common,Ae.specularmap,Ae.envmap,Ae.aomap,Ae.lightmap,Ae.emissivemap,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.fog,Ae.lights,{emissive:{value:new ye(0)}}]),vertexShader:ht.meshlambert_vert,fragmentShader:ht.meshlambert_frag},phong:{uniforms:An([Ae.common,Ae.specularmap,Ae.envmap,Ae.aomap,Ae.lightmap,Ae.emissivemap,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.fog,Ae.lights,{emissive:{value:new ye(0)},specular:{value:new ye(1118481)},shininess:{value:30}}]),vertexShader:ht.meshphong_vert,fragmentShader:ht.meshphong_frag},standard:{uniforms:An([Ae.common,Ae.envmap,Ae.aomap,Ae.lightmap,Ae.emissivemap,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.roughnessmap,Ae.metalnessmap,Ae.fog,Ae.lights,{emissive:{value:new ye(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ht.meshphysical_vert,fragmentShader:ht.meshphysical_frag},toon:{uniforms:An([Ae.common,Ae.aomap,Ae.lightmap,Ae.emissivemap,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.gradientmap,Ae.fog,Ae.lights,{emissive:{value:new ye(0)}}]),vertexShader:ht.meshtoon_vert,fragmentShader:ht.meshtoon_frag},matcap:{uniforms:An([Ae.common,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,Ae.fog,{matcap:{value:null}}]),vertexShader:ht.meshmatcap_vert,fragmentShader:ht.meshmatcap_frag},points:{uniforms:An([Ae.points,Ae.fog]),vertexShader:ht.points_vert,fragmentShader:ht.points_frag},dashed:{uniforms:An([Ae.common,Ae.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ht.linedashed_vert,fragmentShader:ht.linedashed_frag},depth:{uniforms:An([Ae.common,Ae.displacementmap]),vertexShader:ht.depth_vert,fragmentShader:ht.depth_frag},normal:{uniforms:An([Ae.common,Ae.bumpmap,Ae.normalmap,Ae.displacementmap,{opacity:{value:1}}]),vertexShader:ht.meshnormal_vert,fragmentShader:ht.meshnormal_frag},sprite:{uniforms:An([Ae.sprite,Ae.fog]),vertexShader:ht.sprite_vert,fragmentShader:ht.sprite_frag},background:{uniforms:{uvTransform:{value:new ot},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ht.background_vert,fragmentShader:ht.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ot}},vertexShader:ht.backgroundCube_vert,fragmentShader:ht.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ht.cube_vert,fragmentShader:ht.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ht.equirect_vert,fragmentShader:ht.equirect_frag},distanceRGBA:{uniforms:An([Ae.common,Ae.displacementmap,{referencePosition:{value:new k},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ht.distanceRGBA_vert,fragmentShader:ht.distanceRGBA_frag},shadow:{uniforms:An([Ae.lights,Ae.fog,{color:{value:new ye(0)},opacity:{value:1}}]),vertexShader:ht.shadow_vert,fragmentShader:ht.shadow_frag}};Pi.physical={uniforms:An([Pi.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ot},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ot},clearcoatNormalScale:{value:new Re(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ot},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ot},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ot},sheen:{value:0},sheenColor:{value:new ye(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ot},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ot},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ot},transmissionSamplerSize:{value:new Re},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ot},attenuationDistance:{value:0},attenuationColor:{value:new ye(0)},specularColor:{value:new ye(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ot},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ot},anisotropyVector:{value:new Re},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ot}}]),vertexShader:ht.meshphysical_vert,fragmentShader:ht.meshphysical_frag};var uc={r:0,b:0,g:0},dr=new ti,r_=new Ze;function a_(i,e,t,n,s,r,a){let o=new ye(0),l=r===!0?0:1,c,u,h=null,d=0,p=null;function g(_){let y=_.isScene===!0?_.background:null;return y&&y.isTexture&&(y=(_.backgroundBlurriness>0?t:e).get(y)),y}function v(_){let y=!1,T=g(_);T===null?f(o,l):T&&T.isColor&&(f(T,1),y=!0);let M=i.xr.getEnvironmentBlendMode();M==="additive"?n.buffers.color.setClear(0,0,0,1,a):M==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||y)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(_,y){let T=g(y);T&&(T.isCubeTexture||T.mapping===Ca)?(u===void 0&&(u=new Qt(new Zi(1,1,1),new Nt({name:"BackgroundCubeMaterial",uniforms:or(Pi.backgroundCube.uniforms),vertexShader:Pi.backgroundCube.vertexShader,fragmentShader:Pi.backgroundCube.fragmentShader,side:sn,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(M,R,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(u)),dr.copy(y.backgroundRotation),dr.x*=-1,dr.y*=-1,dr.z*=-1,T.isCubeTexture&&T.isRenderTargetTexture===!1&&(dr.y*=-1,dr.z*=-1),u.material.uniforms.envMap.value=T,u.material.uniforms.flipEnvMap.value=T.isCubeTexture&&T.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(r_.makeRotationFromEuler(dr)),u.material.toneMapped=pt.getTransfer(T.colorSpace)!==Ft,(h!==T||d!==T.version||p!==i.toneMapping)&&(u.material.needsUpdate=!0,h=T,d=T.version,p=i.toneMapping),u.layers.enableAll(),_.unshift(u,u.geometry,u.material,0,0,null)):T&&T.isTexture&&(c===void 0&&(c=new Qt(new ta(2,2),new Nt({name:"BackgroundMaterial",uniforms:or(Pi.background.uniforms),vertexShader:Pi.background.vertexShader,fragmentShader:Pi.background.fragmentShader,side:Bn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=T,c.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,c.material.toneMapped=pt.getTransfer(T.colorSpace)!==Ft,T.matrixAutoUpdate===!0&&T.updateMatrix(),c.material.uniforms.uvTransform.value.copy(T.matrix),(h!==T||d!==T.version||p!==i.toneMapping)&&(c.material.needsUpdate=!0,h=T,d=T.version,p=i.toneMapping),c.layers.enableAll(),_.unshift(c,c.geometry,c.material,0,0,null))}function f(_,y){_.getRGB(uc,Gu(i)),n.buffers.color.setClear(uc.r,uc.g,uc.b,y,a)}function x(){u!==void 0&&(u.geometry.dispose(),u.material.dispose()),c!==void 0&&(c.geometry.dispose(),c.material.dispose())}return{getClearColor:function(){return o},setClearColor:function(_,y=1){o.set(_),l=y,f(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(_){l=_,f(o,l)},render:v,addToRenderList:m,dispose:x}}function o_(i,e){let t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=d(null),r=s,a=!1;function o(S,D,U,O,B){let G=!1,N=h(O,U,D);r!==N&&(r=N,c(r.object)),G=p(S,O,U,B),G&&g(S,O,U,B),B!==null&&e.update(B,i.ELEMENT_ARRAY_BUFFER),(G||a)&&(a=!1,y(S,D,U,O),B!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(B).buffer))}function l(){return i.createVertexArray()}function c(S){return i.bindVertexArray(S)}function u(S){return i.deleteVertexArray(S)}function h(S,D,U){let O=U.wireframe===!0,B=n[S.id];B===void 0&&(B={},n[S.id]=B);let G=B[D.id];G===void 0&&(G={},B[D.id]=G);let N=G[O];return N===void 0&&(N=d(l()),G[O]=N),N}function d(S){let D=[],U=[],O=[];for(let B=0;B<t;B++)D[B]=0,U[B]=0,O[B]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:D,enabledAttributes:U,attributeDivisors:O,object:S,attributes:{},index:null}}function p(S,D,U,O){let B=r.attributes,G=D.attributes,N=0,I=U.getAttributes();for(let P in I)if(I[P].location>=0){let J=B[P],oe=G[P];if(oe===void 0&&(P==="instanceMatrix"&&S.instanceMatrix&&(oe=S.instanceMatrix),P==="instanceColor"&&S.instanceColor&&(oe=S.instanceColor)),J===void 0||J.attribute!==oe||oe&&J.data!==oe.data)return!0;N++}return r.attributesNum!==N||r.index!==O}function g(S,D,U,O){let B={},G=D.attributes,N=0,I=U.getAttributes();for(let P in I)if(I[P].location>=0){let J=G[P];J===void 0&&(P==="instanceMatrix"&&S.instanceMatrix&&(J=S.instanceMatrix),P==="instanceColor"&&S.instanceColor&&(J=S.instanceColor));let oe={};oe.attribute=J,J&&J.data&&(oe.data=J.data),B[P]=oe,N++}r.attributes=B,r.attributesNum=N,r.index=O}function v(){let S=r.newAttributes;for(let D=0,U=S.length;D<U;D++)S[D]=0}function m(S){f(S,0)}function f(S,D){let U=r.newAttributes,O=r.enabledAttributes,B=r.attributeDivisors;U[S]=1,O[S]===0&&(i.enableVertexAttribArray(S),O[S]=1),B[S]!==D&&(i.vertexAttribDivisor(S,D),B[S]=D)}function x(){let S=r.newAttributes,D=r.enabledAttributes;for(let U=0,O=D.length;U<O;U++)D[U]!==S[U]&&(i.disableVertexAttribArray(U),D[U]=0)}function _(S,D,U,O,B,G,N){N===!0?i.vertexAttribIPointer(S,D,U,B,G):i.vertexAttribPointer(S,D,U,O,B,G)}function y(S,D,U,O){v();let B=O.attributes,G=U.getAttributes(),N=D.defaultAttributeValues;for(let I in G){let P=G[I];if(P.location>=0){let F=B[I];if(F===void 0&&(I==="instanceMatrix"&&S.instanceMatrix&&(F=S.instanceMatrix),I==="instanceColor"&&S.instanceColor&&(F=S.instanceColor)),F!==void 0){let J=F.normalized,oe=F.itemSize,_e=e.get(F);if(_e===void 0)continue;let ce=_e.buffer,X=_e.type,Z=_e.bytesPerElement,ie=X===i.INT||X===i.UNSIGNED_INT||F.gpuType===Po;if(F.isInterleavedBufferAttribute){let he=F.data,Le=he.stride,Ce=F.offset;if(he.isInstancedInterleavedBuffer){for(let He=0;He<P.locationSize;He++)f(P.location+He,he.meshPerAttribute);S.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=he.meshPerAttribute*he.count)}else for(let He=0;He<P.locationSize;He++)m(P.location+He);i.bindBuffer(i.ARRAY_BUFFER,ce);for(let He=0;He<P.locationSize;He++)_(P.location+He,oe/P.locationSize,X,J,Le*Z,(Ce+oe/P.locationSize*He)*Z,ie)}else{if(F.isInstancedBufferAttribute){for(let he=0;he<P.locationSize;he++)f(P.location+he,F.meshPerAttribute);S.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=F.meshPerAttribute*F.count)}else for(let he=0;he<P.locationSize;he++)m(P.location+he);i.bindBuffer(i.ARRAY_BUFFER,ce);for(let he=0;he<P.locationSize;he++)_(P.location+he,oe/P.locationSize,X,J,oe*Z,oe/P.locationSize*he*Z,ie)}}else if(N!==void 0){let J=N[I];if(J!==void 0)switch(J.length){case 2:i.vertexAttrib2fv(P.location,J);break;case 3:i.vertexAttrib3fv(P.location,J);break;case 4:i.vertexAttrib4fv(P.location,J);break;default:i.vertexAttrib1fv(P.location,J)}}}}x()}function T(){C();for(let S in n){let D=n[S];for(let U in D){let O=D[U];for(let B in O)u(O[B].object),delete O[B];delete D[U]}delete n[S]}}function M(S){if(n[S.id]===void 0)return;let D=n[S.id];for(let U in D){let O=D[U];for(let B in O)u(O[B].object),delete O[B];delete D[U]}delete n[S.id]}function R(S){for(let D in n){let U=n[D];if(U[S.id]===void 0)continue;let O=U[S.id];for(let B in O)u(O[B].object),delete O[B];delete U[S.id]}}function C(){b(),a=!0,r!==s&&(r=s,c(r.object))}function b(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:C,resetDefaultState:b,dispose:T,releaseStatesOfGeometry:M,releaseStatesOfProgram:R,initAttributes:v,enableAttribute:m,disableUnusedAttributes:x}}function l_(i,e,t){let n;function s(c){n=c}function r(c,u){i.drawArrays(n,c,u),t.update(u,n,1)}function a(c,u,h){h!==0&&(i.drawArraysInstanced(n,c,u,h),t.update(u,n,h))}function o(c,u,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,u,0,h);let p=0;for(let g=0;g<h;g++)p+=u[g];t.update(p,n,1)}function l(c,u,h,d){if(h===0)return;let p=e.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<c.length;g++)a(c[g],u[g],d[g]);else{p.multiDrawArraysInstancedWEBGL(n,c,0,u,0,d,0,h);let g=0;for(let v=0;v<h;v++)g+=u[v]*d[v];t.update(g,n,1)}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function c_(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){let R=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(R){return!(R!==kn&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(R){let C=R===Fr&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(R!==kt&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==On&&!C)}function l(R){if(R==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp",u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);let h=t.logarithmicDepthBuffer===!0,d=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),p=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),f=i.getParameter(i.MAX_VERTEX_ATTRIBS),x=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),_=i.getParameter(i.MAX_VARYING_VECTORS),y=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),T=g>0,M=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:h,reverseDepthBuffer:d,maxTextures:p,maxVertexTextures:g,maxTextureSize:v,maxCubemapSize:m,maxAttributes:f,maxVertexUniforms:x,maxVaryings:_,maxFragmentUniforms:y,vertexTextures:T,maxSamples:M}}function u_(i){let e=this,t=null,n=0,s=!1,r=!1,a=new Ji,o=new ot,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,d){let p=h.length!==0||d||n!==0||s;return s=d,n=h.length,p},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(h,d){t=u(h,d,0)},this.setState=function(h,d,p){let g=h.clippingPlanes,v=h.clipIntersection,m=h.clipShadows,f=i.get(h);if(!s||g===null||g.length===0||r&&!m)r?u(null):c();else{let x=r?0:n,_=x*4,y=f.clippingState||null;l.value=y,y=u(g,d,_,p);for(let T=0;T!==_;++T)y[T]=t[T];f.clippingState=y,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=x}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(h,d,p,g){let v=h!==null?h.length:0,m=null;if(v!==0){if(m=l.value,g!==!0||m===null){let f=p+v*4,x=d.matrixWorldInverse;o.getNormalMatrix(x),(m===null||m.length<f)&&(m=new Float32Array(f));for(let _=0,y=p;_!==v;++_,y+=4)a.copy(h[_]).applyMatrix4(x,o),a.normal.toArray(m,y),m[y+3]=a.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,m}}function h_(i){let e=new WeakMap;function t(a,o){return o===Co?a.mapping=qs:o===Ro&&(a.mapping=js),a}function n(a){if(a&&a.isTexture){let o=a.mapping;if(o===Co||o===Ro)if(e.has(a)){let l=e.get(a).texture;return t(l,a.mapping)}else{let l=a.image;if(l&&l.height>0){let c=new Wu(l.height);return c.fromEquirectangularTexture(i,a),e.set(a,c),a.addEventListener("dispose",s),t(c.texture,a.mapping)}else return null}}return a}function s(a){let o=a.target;o.removeEventListener("dispose",s);let l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}var aa=4,Dp=[.125,.215,.35,.446,.526,.582],fr=20,uh=new sa,Pp=new ye,hh=null,dh=0,fh=0,ph=!1,pr=(1+Math.sqrt(5))/2,oa=1/pr,Ip=[new k(-pr,oa,0),new k(pr,oa,0),new k(-oa,0,pr),new k(oa,0,pr),new k(0,pr,-oa),new k(0,pr,oa),new k(-1,1,-1),new k(1,1,-1),new k(-1,1,1),new k(1,1,1)],mh=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,s=100){hh=this._renderer.getRenderTarget(),dh=this._renderer.getActiveCubeFace(),fh=this._renderer.getActiveMipmapLevel(),ph=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);let r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,n,s,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Up(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Fp(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(hh,dh,fh),this._renderer.xr.enabled=ph,e.scissorTest=!1,hc(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===qs||e.mapping===js?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),hh=this._renderer.getRenderTarget(),dh=this._renderer.getActiveCubeFace(),fh=this._renderer.getActiveMipmapLevel(),ph=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,16*7),t=4*this._cubeSize,n={magFilter:$t,minFilter:$t,generateMipmaps:!1,type:Fr,format:kn,colorSpace:Wt,depthBuffer:!1},s=Lp(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Lp(e,t,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=d_(r)),this._blurMaterial=f_(r,e,t)}return s}_compileMaterial(e){let t=new Qt(this._lodPlanes[0],e);this._renderer.compile(t,uh)}_sceneToCubeUV(e,t,n,s){let r=90,a=1,o=new qt(r,a,t,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],u=this._renderer,h=u.autoClear,d=u.toneMapping;u.getClearColor(Pp),u.toneMapping=Hi,u.autoClear=!1;let p=new ni({name:"PMREM.Background",side:sn,depthWrite:!1,depthTest:!1}),g=new Qt(new Zi,p),v=!1,m=e.background;m?m.isColor&&(p.color.copy(m),e.background=null,v=!0):(p.color.copy(Pp),v=!0);for(let f=0;f<6;f++){let x=f%3;x===0?(o.up.set(0,l[f],0),o.lookAt(c[f],0,0)):x===1?(o.up.set(0,0,l[f]),o.lookAt(0,c[f],0)):(o.up.set(0,l[f],0),o.lookAt(0,0,c[f]));let _=this._cubeSize;hc(s,x*_,f>2?_:0,_,_),u.setRenderTarget(s),v&&u.render(g,o),u.render(e,o)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=d,u.autoClear=h,e.background=m}_textureToCubeUV(e,t){let n=this._renderer,s=e.mapping===qs||e.mapping===js;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Up()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Fp());let r=s?this._cubemapMaterial:this._equirectMaterial,a=new Qt(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=e;let l=this._cubeSize;hc(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,uh)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let s=this._lodPlanes.length;for(let r=1;r<s;r++){let a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=Ip[(s-r-1)%Ip.length];this._blur(e,r-1,r,a,o)}t.autoClear=n}_blur(e,t,n,s,r){let a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,s,"latitudinal",r),this._halfBlur(a,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,a,o){let l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let u=3,h=new Qt(this._lodPlanes[s],c),d=c.uniforms,p=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*fr-1),v=r/g,m=isFinite(r)?1+Math.floor(u*v):fr;m>fr&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${fr}`);let f=[],x=0;for(let R=0;R<fr;++R){let C=R/v,b=Math.exp(-C*C/2);f.push(b),R===0?x+=b:R<m&&(x+=2*b)}for(let R=0;R<f.length;R++)f[R]=f[R]/x;d.envMap.value=e.texture,d.samples.value=m,d.weights.value=f,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);let{_lodMax:_}=this;d.dTheta.value=g,d.mipInt.value=_-n;let y=this._sizeLods[s],T=3*y*(s>_-aa?s-_+aa:0),M=4*(this._cubeSize-y);hc(t,T,M,3*y,2*y),l.setRenderTarget(t),l.render(h,uh)}};function d_(i){let e=[],t=[],n=[],s=i,r=i-aa+1+Dp.length;for(let a=0;a<r;a++){let o=Math.pow(2,s);t.push(o);let l=1/o;a>i-aa?l=Dp[a-i+aa-1]:a===0&&(l=0),n.push(l);let c=1/(o-2),u=-c,h=1+c,d=[u,u,h,u,h,h,u,u,h,h,u,h],p=6,g=6,v=3,m=2,f=1,x=new Float32Array(v*g*p),_=new Float32Array(m*g*p),y=new Float32Array(f*g*p);for(let M=0;M<p;M++){let R=M%3*2/3-1,C=M>2?0:-1,b=[R,C,0,R+2/3,C,0,R+2/3,C+1,0,R,C,0,R+2/3,C+1,0,R,C+1,0];x.set(b,v*g*M),_.set(d,m*g*M);let S=[M,M,M,M,M,M];y.set(S,f*g*M)}let T=new Yt;T.setAttribute("position",new Gt(x,v)),T.setAttribute("uv",new Gt(_,m)),T.setAttribute("faceIndex",new Gt(y,f)),e.push(T),s>aa&&s--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Lp(i,e,t){let n=new Ht(i,e,t);return n.texture.mapping=Ca,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function hc(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function f_(i,e,t){let n=new Float32Array(fr),s=new k(0,1,0);return new Nt({name:"SphericalGaussianBlur",defines:{n:fr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:gh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Jt,depthTest:!1,depthWrite:!1})}function Fp(){return new Nt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:gh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Jt,depthTest:!1,depthWrite:!1})}function Up(){return new Nt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:gh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Jt,depthTest:!1,depthWrite:!1})}function gh(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function p_(i){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){let l=o.mapping,c=l===Co||l===Ro,u=l===qs||l===js;if(c||u){let h=e.get(o),d=h!==void 0?h.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==d)return t===null&&(t=new mh(i)),h=c?t.fromEquirectangular(o,h):t.fromCubemap(o,h),h.texture.pmremVersion=o.pmremVersion,e.set(o,h),h.texture;if(h!==void 0)return h.texture;{let p=o.image;return c&&p&&p.height>0||u&&p&&s(p)?(t===null&&(t=new mh(i)),h=c?t.fromEquirectangular(o):t.fromCubemap(o),h.texture.pmremVersion=o.pmremVersion,e.set(o,h),o.addEventListener("dispose",r),h.texture):null}}}return o}function s(o){let l=0,c=6;for(let u=0;u<c;u++)o[u]!==void 0&&l++;return l===c}function r(o){let l=o.target;l.removeEventListener("dispose",r);let c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function m_(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let s=t(n);return s===null&&nr("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function g_(i,e,t,n){let s={},r=new WeakMap;function a(h){let d=h.target;d.index!==null&&e.remove(d.index);for(let g in d.attributes)e.remove(d.attributes[g]);d.removeEventListener("dispose",a),delete s[d.id];let p=r.get(d);p&&(e.remove(p),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(h,d){return s[d.id]===!0||(d.addEventListener("dispose",a),s[d.id]=!0,t.memory.geometries++),d}function l(h){let d=h.attributes;for(let p in d)e.update(d[p],i.ARRAY_BUFFER)}function c(h){let d=[],p=h.index,g=h.attributes.position,v=0;if(p!==null){let x=p.array;v=p.version;for(let _=0,y=x.length;_<y;_+=3){let T=x[_+0],M=x[_+1],R=x[_+2];d.push(T,M,M,R,R,T)}}else if(g!==void 0){let x=g.array;v=g.version;for(let _=0,y=x.length/3-1;_<y;_+=3){let T=_+0,M=_+1,R=_+2;d.push(T,M,M,R,R,T)}}else return;let m=new(Au(d)?Tl:El)(d,1);m.version=v;let f=r.get(h);f&&e.remove(f),r.set(h,m)}function u(h){let d=r.get(h);if(d){let p=h.index;p!==null&&d.version<p.version&&c(h)}else c(h);return r.get(h)}return{get:o,update:l,getWireframeAttribute:u}}function v_(i,e,t){let n;function s(d){n=d}let r,a;function o(d){r=d.type,a=d.bytesPerElement}function l(d,p){i.drawElements(n,p,r,d*a),t.update(p,n,1)}function c(d,p,g){g!==0&&(i.drawElementsInstanced(n,p,r,d*a,g),t.update(p,n,g))}function u(d,p,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,p,0,r,d,0,g);let m=0;for(let f=0;f<g;f++)m+=p[f];t.update(m,n,1)}function h(d,p,g,v){if(g===0)return;let m=e.get("WEBGL_multi_draw");if(m===null)for(let f=0;f<d.length;f++)c(d[f]/a,p[f],v[f]);else{m.multiDrawElementsInstancedWEBGL(n,p,0,r,d,0,v,0,g);let f=0;for(let x=0;x<g;x++)f+=p[x]*v[x];t.update(f,n,1)}}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=h}function x_(i){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function y_(i,e,t){let n=new WeakMap,s=new yt;function r(a,o,l){let c=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,h=u!==void 0?u.length:0,d=n.get(o);if(d===void 0||d.count!==h){let b=function(){R.dispose(),n.delete(o),o.removeEventListener("dispose",b)};d!==void 0&&d.texture.dispose();let p=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,v=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],f=o.morphAttributes.normal||[],x=o.morphAttributes.color||[],_=0;p===!0&&(_=1),g===!0&&(_=2),v===!0&&(_=3);let y=o.attributes.position.count*_,T=1;y>e.maxTextureSize&&(T=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);let M=new Float32Array(y*T*4*h),R=new pl(M,y,T,h);R.type=On,R.needsUpdate=!0;let C=_*4;for(let S=0;S<h;S++){let D=m[S],U=f[S],O=x[S],B=y*T*4*S;for(let G=0;G<D.count;G++){let N=G*C;p===!0&&(s.fromBufferAttribute(D,G),M[B+N+0]=s.x,M[B+N+1]=s.y,M[B+N+2]=s.z,M[B+N+3]=0),g===!0&&(s.fromBufferAttribute(U,G),M[B+N+4]=s.x,M[B+N+5]=s.y,M[B+N+6]=s.z,M[B+N+7]=0),v===!0&&(s.fromBufferAttribute(O,G),M[B+N+8]=s.x,M[B+N+9]=s.y,M[B+N+10]=s.z,M[B+N+11]=O.itemSize===4?s.w:1)}}d={count:h,texture:R,size:new Re(y,T)},n.set(o,d),o.addEventListener("dispose",b)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let p=0;for(let v=0;v<c.length;v++)p+=c[v];let g=o.morphTargetsRelative?1:1-p;l.getUniforms().setValue(i,"morphTargetBaseInfluence",g),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:r}}function A_(i,e,t,n){let s=new WeakMap;function r(l){let c=n.render.frame,u=l.geometry,h=e.get(l,u);if(s.get(h)!==c&&(e.update(h),s.set(h,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),s.get(l)!==c&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){let d=l.skeleton;s.get(d)!==c&&(d.update(),s.set(d,c))}return h}function a(){s=new WeakMap}function o(l){let c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:a}}var Np=new zt,Bp=new $r(1,1),Op=new pl,kp=new Eu,zp=new Ll,Hp=[],Gp=[],Vp=new Float32Array(16),Wp=new Float32Array(9),Xp=new Float32Array(4);function la(i,e,t){let n=i[0];if(n<=0||n>0)return i;let s=e*t,r=Hp[s];if(r===void 0&&(r=new Float32Array(s),Hp[s]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(r,o)}return r}function an(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function on(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function dc(i,e){let t=Gp[e];t===void 0&&(t=new Int32Array(e),Gp[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function __(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function S_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(an(t,e))return;i.uniform2fv(this.addr,e),on(t,e)}}function b_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(an(t,e))return;i.uniform3fv(this.addr,e),on(t,e)}}function E_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(an(t,e))return;i.uniform4fv(this.addr,e),on(t,e)}}function T_(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(an(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),on(t,e)}else{if(an(t,n))return;Xp.set(n),i.uniformMatrix2fv(this.addr,!1,Xp),on(t,n)}}function M_(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(an(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),on(t,e)}else{if(an(t,n))return;Wp.set(n),i.uniformMatrix3fv(this.addr,!1,Wp),on(t,n)}}function w_(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(an(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),on(t,e)}else{if(an(t,n))return;Vp.set(n),i.uniformMatrix4fv(this.addr,!1,Vp),on(t,n)}}function C_(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function R_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(an(t,e))return;i.uniform2iv(this.addr,e),on(t,e)}}function D_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(an(t,e))return;i.uniform3iv(this.addr,e),on(t,e)}}function P_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(an(t,e))return;i.uniform4iv(this.addr,e),on(t,e)}}function I_(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function L_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(an(t,e))return;i.uniform2uiv(this.addr,e),on(t,e)}}function F_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(an(t,e))return;i.uniform3uiv(this.addr,e),on(t,e)}}function U_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(an(t,e))return;i.uniform4uiv(this.addr,e),on(t,e)}}function N_(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Bp.compareFunction=mu,r=Bp):r=Np,t.setTexture2D(e||r,s)}function B_(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||kp,s)}function O_(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||zp,s)}function k_(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||Op,s)}function z_(i){switch(i){case 5126:return __;case 35664:return S_;case 35665:return b_;case 35666:return E_;case 35674:return T_;case 35675:return M_;case 35676:return w_;case 5124:case 35670:return C_;case 35667:case 35671:return R_;case 35668:case 35672:return D_;case 35669:case 35673:return P_;case 5125:return I_;case 36294:return L_;case 36295:return F_;case 36296:return U_;case 35678:case 36198:case 36298:case 36306:case 35682:return N_;case 35679:case 36299:case 36307:return B_;case 35680:case 36300:case 36308:case 36293:return O_;case 36289:case 36303:case 36311:case 36292:return k_}}function H_(i,e){i.uniform1fv(this.addr,e)}function G_(i,e){let t=la(e,this.size,2);i.uniform2fv(this.addr,t)}function V_(i,e){let t=la(e,this.size,3);i.uniform3fv(this.addr,t)}function W_(i,e){let t=la(e,this.size,4);i.uniform4fv(this.addr,t)}function X_(i,e){let t=la(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function Y_(i,e){let t=la(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Q_(i,e){let t=la(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function q_(i,e){i.uniform1iv(this.addr,e)}function j_(i,e){i.uniform2iv(this.addr,e)}function Z_(i,e){i.uniform3iv(this.addr,e)}function K_(i,e){i.uniform4iv(this.addr,e)}function J_(i,e){i.uniform1uiv(this.addr,e)}function $_(i,e){i.uniform2uiv(this.addr,e)}function e1(i,e){i.uniform3uiv(this.addr,e)}function t1(i,e){i.uniform4uiv(this.addr,e)}function n1(i,e,t){let n=this.cache,s=e.length,r=dc(t,s);an(n,r)||(i.uniform1iv(this.addr,r),on(n,r));for(let a=0;a!==s;++a)t.setTexture2D(e[a]||Np,r[a])}function i1(i,e,t){let n=this.cache,s=e.length,r=dc(t,s);an(n,r)||(i.uniform1iv(this.addr,r),on(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||kp,r[a])}function s1(i,e,t){let n=this.cache,s=e.length,r=dc(t,s);an(n,r)||(i.uniform1iv(this.addr,r),on(n,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||zp,r[a])}function r1(i,e,t){let n=this.cache,s=e.length,r=dc(t,s);an(n,r)||(i.uniform1iv(this.addr,r),on(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||Op,r[a])}function a1(i){switch(i){case 5126:return H_;case 35664:return G_;case 35665:return V_;case 35666:return W_;case 35674:return X_;case 35675:return Y_;case 35676:return Q_;case 5124:case 35670:return q_;case 35667:case 35671:return j_;case 35668:case 35672:return Z_;case 35669:case 35673:return K_;case 5125:return J_;case 36294:return $_;case 36295:return e1;case 36296:return t1;case 35678:case 36198:case 36298:case 36306:case 35682:return n1;case 35679:case 36299:case 36307:return i1;case 35680:case 36300:case 36308:case 36293:return s1;case 36289:case 36303:case 36311:case 36292:return r1}}var Yp=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=z_(t.type)}},Qp=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=a1(t.type)}},qp=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(e,t[o.id],n)}}},vh=/(\w+)(\])?(\[|\.)?/g;function jp(i,e){i.seq.push(e),i.map[e.id]=e}function o1(i,e,t){let n=i.name,s=n.length;for(vh.lastIndex=0;;){let r=vh.exec(n),a=vh.lastIndex,o=r[1],l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){jp(t,c===void 0?new Yp(o,i,e):new Qp(o,i,e));break}else{let h=t.map[o];h===void 0&&(h=new qp(o),jp(t,h)),t=h}}}var $a=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){let r=e.getActiveUniform(t,s),a=e.getUniformLocation(t,r.name);o1(r,a,this)}}setValue(e,t,n,s){let r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){let s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){let o=t[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,s)}}static seqWithValue(e,t){let n=[];for(let s=0,r=e.length;s!==r;++s){let a=e[s];a.id in t&&n.push(a)}return n}};function Zp(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var l1=37297,c1=0;function u1(i,e){let t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){let o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}var Kp=new ot;function h1(i){pt._getMatrix(Kp,pt.workingColorSpace,i);let e=`mat3( ${Kp.elements.map(t=>t.toFixed(4))} )`;switch(pt.getTransfer(i)){case Ua:return[e,"LinearTransferOETF"];case Ft:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Jp(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),s=i.getShaderInfoLog(e).trim();if(n&&s==="")return"";let r=/ERROR: 0:(\d+)/.exec(s);if(r){let a=parseInt(r[1]);return t.toUpperCase()+`

`+s+`

`+u1(i.getShaderSource(e),a)}else return s}function d1(i,e){let t=h1(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function f1(i,e){let t;switch(e){case ff:t="Linear";break;case pf:t="Reinhard";break;case mf:t="Cineon";break;case gf:t="ACESFilmic";break;case xf:t="AgX";break;case yf:t="Neutral";break;case vf:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var fc=new k;function p1(){pt.getLuminanceCoefficients(fc);let i=fc.x.toFixed(4),e=fc.y.toFixed(4),t=fc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function m1(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(eo).join(`
`)}function g1(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function v1(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(e,s),a=r.name,o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function eo(i){return i!==""}function $p(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function em(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var x1=/^[ \t]*#include +<([\w\d./]+)>/gm;function xh(i){return i.replace(x1,A1)}var y1=new Map;function A1(i,e){let t=ht[e];if(t===void 0){let n=y1.get(e);if(n!==void 0)t=ht[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return xh(t)}var _1=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function tm(i){return i.replace(_1,S1)}function S1(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function nm(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function b1(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===Qc?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===Xd?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Ci&&(e="SHADOWMAP_TYPE_VSM"),e}function E1(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case qs:case js:e="ENVMAP_TYPE_CUBE";break;case Ca:e="ENVMAP_TYPE_CUBE_UV";break}return e}function T1(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case js:e="ENVMAP_MODE_REFRACTION";break}return e}function M1(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case Kc:e="ENVMAP_BLENDING_MULTIPLY";break;case hf:e="ENVMAP_BLENDING_MIX";break;case df:e="ENVMAP_BLENDING_ADD";break}return e}function w1(i){let e=i.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function C1(i,e,t,n){let s=i.getContext(),r=t.defines,a=t.vertexShader,o=t.fragmentShader,l=b1(t),c=E1(t),u=T1(t),h=M1(t),d=w1(t),p=m1(t),g=g1(r),v=s.createProgram(),m,f,x=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(eo).join(`
`),m.length>0&&(m+=`
`),f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(eo).join(`
`),f.length>0&&(f+=`
`)):(m=[nm(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(eo).join(`
`),f=[nm(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Hi?"#define TONE_MAPPING":"",t.toneMapping!==Hi?ht.tonemapping_pars_fragment:"",t.toneMapping!==Hi?f1("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",ht.colorspace_pars_fragment,d1("linearToOutputTexel",t.outputColorSpace),p1(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(eo).join(`
`)),a=xh(a),a=$p(a,t),a=em(a,t),o=xh(o),o=$p(o,t),o=em(o,t),a=tm(a),o=tm(o),t.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,f=["#define varying in",t.glslVersion===gu?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===gu?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);let _=x+m+a,y=x+f+o,T=Zp(s,s.VERTEX_SHADER,_),M=Zp(s,s.FRAGMENT_SHADER,y);s.attachShader(v,T),s.attachShader(v,M),t.index0AttributeName!==void 0?s.bindAttribLocation(v,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function R(D){if(i.debug.checkShaderErrors){let U=s.getProgramInfoLog(v).trim(),O=s.getShaderInfoLog(T).trim(),B=s.getShaderInfoLog(M).trim(),G=!0,N=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(G=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,v,T,M);else{let I=Jp(s,T,"vertex"),P=Jp(s,M,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+D.name+`
Material Type: `+D.type+`

Program Info Log: `+U+`
`+I+`
`+P)}else U!==""?console.warn("THREE.WebGLProgram: Program Info Log:",U):(O===""||B==="")&&(N=!1);N&&(D.diagnostics={runnable:G,programLog:U,vertexShader:{log:O,prefix:m},fragmentShader:{log:B,prefix:f}})}s.deleteShader(T),s.deleteShader(M),C=new $a(s,v),b=v1(s,v)}let C;this.getUniforms=function(){return C===void 0&&R(this),C};let b;this.getAttributes=function(){return b===void 0&&R(this),b};let S=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return S===!1&&(S=s.getProgramParameter(v,l1)),S},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=c1++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=T,this.fragmentShader=M,this}var R1=0,im=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new sm(e),t.set(e,n)),n}},sm=class{constructor(e){this.id=R1++,this.code=e,this.usedTimes=0}};function D1(i,e,t,n,s,r,a){let o=new Ha,l=new im,c=new Set,u=[],h=s.logarithmicDepthBuffer,d=s.vertexTextures,p=s.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(b){return c.add(b),b===0?"uv":`uv${b}`}function m(b,S,D,U,O){let B=U.fog,G=O.geometry,N=b.isMeshStandardMaterial?U.environment:null,I=(b.isMeshStandardMaterial?t:e).get(b.envMap||N),P=!!I&&I.mapping===Ca?I.image.height:null,F=g[b.type];b.precision!==null&&(p=s.getMaxPrecision(b.precision),p!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",p,"instead."));let J=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,oe=J!==void 0?J.length:0,_e=0;G.morphAttributes.position!==void 0&&(_e=1),G.morphAttributes.normal!==void 0&&(_e=2),G.morphAttributes.color!==void 0&&(_e=3);let ce,X,Z,ie;if(F){let bt=Pi[F];ce=bt.vertexShader,X=bt.fragmentShader}else ce=b.vertexShader,X=b.fragmentShader,l.update(b),Z=l.getVertexShaderID(b),ie=l.getFragmentShaderID(b);let he=i.getRenderTarget(),Le=i.state.buffers.depth.getReversed(),Ce=O.isInstancedMesh===!0,He=O.isBatchedMesh===!0,Je=!!b.map,We=!!b.matcap,Ke=!!I,L=!!b.aoMap,Dt=!!b.lightMap,Be=!!b.bumpMap,qe=!!b.normalMap,Fe=!!b.displacementMap,pe=!!b.emissiveMap,ve=!!b.metalnessMap,w=!!b.roughnessMap,A=b.anisotropy>0,Y=b.clearcoat>0,$=b.dispersion>0,se=b.iridescence>0,te=b.sheen>0,j=b.transmission>0,K=A&&!!b.anisotropyMap,ae=Y&&!!b.clearcoatMap,Ee=Y&&!!b.clearcoatNormalMap,re=Y&&!!b.clearcoatRoughnessMap,me=se&&!!b.iridescenceMap,Ue=se&&!!b.iridescenceThicknessMap,Qe=te&&!!b.sheenColorMap,Me=te&&!!b.sheenRoughnessMap,Ne=!!b.specularMap,Ge=!!b.specularColorMap,Pt=!!b.specularIntensityMap,z=j&&!!b.transmissionMap,le=j&&!!b.thicknessMap,ee=!!b.gradientMap,ue=!!b.alphaMap,Te=b.alphaTest>0,Se=!!b.alphaHash,$e=!!b.extensions,Bt=Hi;b.toneMapped&&(he===null||he.isXRRenderTarget===!0)&&(Bt=i.toneMapping);let cn={shaderID:F,shaderType:b.type,shaderName:b.name,vertexShader:ce,fragmentShader:X,defines:b.defines,customVertexShaderID:Z,customFragmentShaderID:ie,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:p,batching:He,batchingColor:He&&O._colorsTexture!==null,instancing:Ce,instancingColor:Ce&&O.instanceColor!==null,instancingMorph:Ce&&O.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:he===null?i.outputColorSpace:he.isXRRenderTarget===!0?he.texture.colorSpace:Wt,alphaToCoverage:!!b.alphaToCoverage,map:Je,matcap:We,envMap:Ke,envMapMode:Ke&&I.mapping,envMapCubeUVHeight:P,aoMap:L,lightMap:Dt,bumpMap:Be,normalMap:qe,displacementMap:d&&Fe,emissiveMap:pe,normalMapObjectSpace:qe&&b.normalMapType===Sf,normalMapTangentSpace:qe&&b.normalMapType===hl,metalnessMap:ve,roughnessMap:w,anisotropy:A,anisotropyMap:K,clearcoat:Y,clearcoatMap:ae,clearcoatNormalMap:Ee,clearcoatRoughnessMap:re,dispersion:$,iridescence:se,iridescenceMap:me,iridescenceThicknessMap:Ue,sheen:te,sheenColorMap:Qe,sheenRoughnessMap:Me,specularMap:Ne,specularColorMap:Ge,specularIntensityMap:Pt,transmission:j,transmissionMap:z,thicknessMap:le,gradientMap:ee,opaque:b.transparent===!1&&b.blending===Ys&&b.alphaToCoverage===!1,alphaMap:ue,alphaTest:Te,alphaHash:Se,combine:b.combine,mapUv:Je&&v(b.map.channel),aoMapUv:L&&v(b.aoMap.channel),lightMapUv:Dt&&v(b.lightMap.channel),bumpMapUv:Be&&v(b.bumpMap.channel),normalMapUv:qe&&v(b.normalMap.channel),displacementMapUv:Fe&&v(b.displacementMap.channel),emissiveMapUv:pe&&v(b.emissiveMap.channel),metalnessMapUv:ve&&v(b.metalnessMap.channel),roughnessMapUv:w&&v(b.roughnessMap.channel),anisotropyMapUv:K&&v(b.anisotropyMap.channel),clearcoatMapUv:ae&&v(b.clearcoatMap.channel),clearcoatNormalMapUv:Ee&&v(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:re&&v(b.clearcoatRoughnessMap.channel),iridescenceMapUv:me&&v(b.iridescenceMap.channel),iridescenceThicknessMapUv:Ue&&v(b.iridescenceThicknessMap.channel),sheenColorMapUv:Qe&&v(b.sheenColorMap.channel),sheenRoughnessMapUv:Me&&v(b.sheenRoughnessMap.channel),specularMapUv:Ne&&v(b.specularMap.channel),specularColorMapUv:Ge&&v(b.specularColorMap.channel),specularIntensityMapUv:Pt&&v(b.specularIntensityMap.channel),transmissionMapUv:z&&v(b.transmissionMap.channel),thicknessMapUv:le&&v(b.thicknessMap.channel),alphaMapUv:ue&&v(b.alphaMap.channel),vertexTangents:!!G.attributes.tangent&&(qe||A),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,pointsUvs:O.isPoints===!0&&!!G.attributes.uv&&(Je||ue),fog:!!B,useFog:b.fog===!0,fogExp2:!!B&&B.isFogExp2,flatShading:b.flatShading===!0,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:h,reverseDepthBuffer:Le,skinning:O.isSkinnedMesh===!0,morphTargets:G.morphAttributes.position!==void 0,morphNormals:G.morphAttributes.normal!==void 0,morphColors:G.morphAttributes.color!==void 0,morphTargetsCount:oe,morphTextureStride:_e,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:b.dithering,shadowMapEnabled:i.shadowMap.enabled&&D.length>0,shadowMapType:i.shadowMap.type,toneMapping:Bt,decodeVideoTexture:Je&&b.map.isVideoTexture===!0&&pt.getTransfer(b.map.colorSpace)===Ft,decodeVideoTextureEmissive:pe&&b.emissiveMap.isVideoTexture===!0&&pt.getTransfer(b.emissiveMap.colorSpace)===Ft,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===pn,flipSided:b.side===sn,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:$e&&b.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:($e&&b.extensions.multiDraw===!0||He)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return cn.vertexUv1s=c.has(1),cn.vertexUv2s=c.has(2),cn.vertexUv3s=c.has(3),c.clear(),cn}function f(b){let S=[];if(b.shaderID?S.push(b.shaderID):(S.push(b.customVertexShaderID),S.push(b.customFragmentShaderID)),b.defines!==void 0)for(let D in b.defines)S.push(D),S.push(b.defines[D]);return b.isRawShaderMaterial===!1&&(x(S,b),_(S,b),S.push(i.outputColorSpace)),S.push(b.customProgramCacheKey),S.join()}function x(b,S){b.push(S.precision),b.push(S.outputColorSpace),b.push(S.envMapMode),b.push(S.envMapCubeUVHeight),b.push(S.mapUv),b.push(S.alphaMapUv),b.push(S.lightMapUv),b.push(S.aoMapUv),b.push(S.bumpMapUv),b.push(S.normalMapUv),b.push(S.displacementMapUv),b.push(S.emissiveMapUv),b.push(S.metalnessMapUv),b.push(S.roughnessMapUv),b.push(S.anisotropyMapUv),b.push(S.clearcoatMapUv),b.push(S.clearcoatNormalMapUv),b.push(S.clearcoatRoughnessMapUv),b.push(S.iridescenceMapUv),b.push(S.iridescenceThicknessMapUv),b.push(S.sheenColorMapUv),b.push(S.sheenRoughnessMapUv),b.push(S.specularMapUv),b.push(S.specularColorMapUv),b.push(S.specularIntensityMapUv),b.push(S.transmissionMapUv),b.push(S.thicknessMapUv),b.push(S.combine),b.push(S.fogExp2),b.push(S.sizeAttenuation),b.push(S.morphTargetsCount),b.push(S.morphAttributeCount),b.push(S.numDirLights),b.push(S.numPointLights),b.push(S.numSpotLights),b.push(S.numSpotLightMaps),b.push(S.numHemiLights),b.push(S.numRectAreaLights),b.push(S.numDirLightShadows),b.push(S.numPointLightShadows),b.push(S.numSpotLightShadows),b.push(S.numSpotLightShadowsWithMaps),b.push(S.numLightProbes),b.push(S.shadowMapType),b.push(S.toneMapping),b.push(S.numClippingPlanes),b.push(S.numClipIntersection),b.push(S.depthPacking)}function _(b,S){o.disableAll(),S.supportsVertexTextures&&o.enable(0),S.instancing&&o.enable(1),S.instancingColor&&o.enable(2),S.instancingMorph&&o.enable(3),S.matcap&&o.enable(4),S.envMap&&o.enable(5),S.normalMapObjectSpace&&o.enable(6),S.normalMapTangentSpace&&o.enable(7),S.clearcoat&&o.enable(8),S.iridescence&&o.enable(9),S.alphaTest&&o.enable(10),S.vertexColors&&o.enable(11),S.vertexAlphas&&o.enable(12),S.vertexUv1s&&o.enable(13),S.vertexUv2s&&o.enable(14),S.vertexUv3s&&o.enable(15),S.vertexTangents&&o.enable(16),S.anisotropy&&o.enable(17),S.alphaHash&&o.enable(18),S.batching&&o.enable(19),S.dispersion&&o.enable(20),S.batchingColor&&o.enable(21),b.push(o.mask),o.disableAll(),S.fog&&o.enable(0),S.useFog&&o.enable(1),S.flatShading&&o.enable(2),S.logarithmicDepthBuffer&&o.enable(3),S.reverseDepthBuffer&&o.enable(4),S.skinning&&o.enable(5),S.morphTargets&&o.enable(6),S.morphNormals&&o.enable(7),S.morphColors&&o.enable(8),S.premultipliedAlpha&&o.enable(9),S.shadowMapEnabled&&o.enable(10),S.doubleSided&&o.enable(11),S.flipSided&&o.enable(12),S.useDepthPacking&&o.enable(13),S.dithering&&o.enable(14),S.transmission&&o.enable(15),S.sheen&&o.enable(16),S.opaque&&o.enable(17),S.pointsUvs&&o.enable(18),S.decodeVideoTexture&&o.enable(19),S.decodeVideoTextureEmissive&&o.enable(20),S.alphaToCoverage&&o.enable(21),b.push(o.mask)}function y(b){let S=g[b.type],D;if(S){let U=Pi[S];D=Kf.clone(U.uniforms)}else D=b.uniforms;return D}function T(b,S){let D;for(let U=0,O=u.length;U<O;U++){let B=u[U];if(B.cacheKey===S){D=B,++D.usedTimes;break}}return D===void 0&&(D=new C1(i,S,b,r),u.push(D)),D}function M(b){if(--b.usedTimes==0){let S=u.indexOf(b);u[S]=u[u.length-1],u.pop(),b.destroy()}}function R(b){l.remove(b)}function C(){l.dispose()}return{getParameters:m,getProgramCacheKey:f,getUniforms:y,acquireProgram:T,releaseProgram:M,releaseShaderCache:R,programs:u,dispose:C}}function P1(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,l){i.get(a)[o]=l}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function I1(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function rm(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function am(){let i=[],e=0,t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(h,d,p,g,v,m){let f=i[e];return f===void 0?(f={id:h.id,object:h,geometry:d,material:p,groupOrder:g,renderOrder:h.renderOrder,z:v,group:m},i[e]=f):(f.id=h.id,f.object=h,f.geometry=d,f.material=p,f.groupOrder=g,f.renderOrder=h.renderOrder,f.z=v,f.group=m),e++,f}function o(h,d,p,g,v,m){let f=a(h,d,p,g,v,m);p.transmission>0?n.push(f):p.transparent===!0?s.push(f):t.push(f)}function l(h,d,p,g,v,m){let f=a(h,d,p,g,v,m);p.transmission>0?n.unshift(f):p.transparent===!0?s.unshift(f):t.unshift(f)}function c(h,d){t.length>1&&t.sort(h||I1),n.length>1&&n.sort(d||rm),s.length>1&&s.sort(d||rm)}function u(){for(let h=e,d=i.length;h<d;h++){let p=i[h];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:o,unshift:l,finish:u,sort:c}}function L1(){let i=new WeakMap;function e(n,s){let r=i.get(n),a;return r===void 0?(a=new am,i.set(n,[a])):s>=r.length?(a=new am,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function F1(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new k,color:new ye};break;case"SpotLight":t={position:new k,direction:new k,color:new ye,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new k,color:new ye,distance:0,decay:0};break;case"HemisphereLight":t={direction:new k,skyColor:new ye,groundColor:new ye};break;case"RectAreaLight":t={color:new ye,position:new k,halfWidth:new k,halfHeight:new k};break}return i[e.id]=t,t}}}function U1(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Re};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Re};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Re,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}var N1=0;function B1(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function O1(i){let e=new F1,t=U1(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new k);let s=new k,r=new Ze,a=new Ze;function o(c){let u=0,h=0,d=0;for(let b=0;b<9;b++)n.probe[b].set(0,0,0);let p=0,g=0,v=0,m=0,f=0,x=0,_=0,y=0,T=0,M=0,R=0;c.sort(B1);for(let b=0,S=c.length;b<S;b++){let D=c[b],U=D.color,O=D.intensity,B=D.distance,G=D.shadow&&D.shadow.map?D.shadow.map.texture:null;if(D.isAmbientLight)u+=U.r*O,h+=U.g*O,d+=U.b*O;else if(D.isLightProbe){for(let N=0;N<9;N++)n.probe[N].addScaledVector(D.sh.coefficients[N],O);R++}else if(D.isDirectionalLight){let N=e.get(D);if(N.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){let I=D.shadow,P=t.get(D);P.shadowIntensity=I.intensity,P.shadowBias=I.bias,P.shadowNormalBias=I.normalBias,P.shadowRadius=I.radius,P.shadowMapSize=I.mapSize,n.directionalShadow[p]=P,n.directionalShadowMap[p]=G,n.directionalShadowMatrix[p]=D.shadow.matrix,x++}n.directional[p]=N,p++}else if(D.isSpotLight){let N=e.get(D);N.position.setFromMatrixPosition(D.matrixWorld),N.color.copy(U).multiplyScalar(O),N.distance=B,N.coneCos=Math.cos(D.angle),N.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),N.decay=D.decay,n.spot[v]=N;let I=D.shadow;if(D.map&&(n.spotLightMap[T]=D.map,T++,I.updateMatrices(D),D.castShadow&&M++),n.spotLightMatrix[v]=I.matrix,D.castShadow){let P=t.get(D);P.shadowIntensity=I.intensity,P.shadowBias=I.bias,P.shadowNormalBias=I.normalBias,P.shadowRadius=I.radius,P.shadowMapSize=I.mapSize,n.spotShadow[v]=P,n.spotShadowMap[v]=G,y++}v++}else if(D.isRectAreaLight){let N=e.get(D);N.color.copy(U).multiplyScalar(O),N.halfWidth.set(D.width*.5,0,0),N.halfHeight.set(0,D.height*.5,0),n.rectArea[m]=N,m++}else if(D.isPointLight){let N=e.get(D);if(N.color.copy(D.color).multiplyScalar(D.intensity),N.distance=D.distance,N.decay=D.decay,D.castShadow){let I=D.shadow,P=t.get(D);P.shadowIntensity=I.intensity,P.shadowBias=I.bias,P.shadowNormalBias=I.normalBias,P.shadowRadius=I.radius,P.shadowMapSize=I.mapSize,P.shadowCameraNear=I.camera.near,P.shadowCameraFar=I.camera.far,n.pointShadow[g]=P,n.pointShadowMap[g]=G,n.pointShadowMatrix[g]=D.shadow.matrix,_++}n.point[g]=N,g++}else if(D.isHemisphereLight){let N=e.get(D);N.skyColor.copy(D.color).multiplyScalar(O),N.groundColor.copy(D.groundColor).multiplyScalar(O),n.hemi[f]=N,f++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Ae.LTC_FLOAT_1,n.rectAreaLTC2=Ae.LTC_FLOAT_2):(n.rectAreaLTC1=Ae.LTC_HALF_1,n.rectAreaLTC2=Ae.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=h,n.ambient[2]=d;let C=n.hash;(C.directionalLength!==p||C.pointLength!==g||C.spotLength!==v||C.rectAreaLength!==m||C.hemiLength!==f||C.numDirectionalShadows!==x||C.numPointShadows!==_||C.numSpotShadows!==y||C.numSpotMaps!==T||C.numLightProbes!==R)&&(n.directional.length=p,n.spot.length=v,n.rectArea.length=m,n.point.length=g,n.hemi.length=f,n.directionalShadow.length=x,n.directionalShadowMap.length=x,n.pointShadow.length=_,n.pointShadowMap.length=_,n.spotShadow.length=y,n.spotShadowMap.length=y,n.directionalShadowMatrix.length=x,n.pointShadowMatrix.length=_,n.spotLightMatrix.length=y+T-M,n.spotLightMap.length=T,n.numSpotLightShadowsWithMaps=M,n.numLightProbes=R,C.directionalLength=p,C.pointLength=g,C.spotLength=v,C.rectAreaLength=m,C.hemiLength=f,C.numDirectionalShadows=x,C.numPointShadows=_,C.numSpotShadows=y,C.numSpotMaps=T,C.numLightProbes=R,n.version=N1++)}function l(c,u){let h=0,d=0,p=0,g=0,v=0,m=u.matrixWorldInverse;for(let f=0,x=c.length;f<x;f++){let _=c[f];if(_.isDirectionalLight){let y=n.directional[h];y.direction.setFromMatrixPosition(_.matrixWorld),s.setFromMatrixPosition(_.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(m),h++}else if(_.isSpotLight){let y=n.spot[p];y.position.setFromMatrixPosition(_.matrixWorld),y.position.applyMatrix4(m),y.direction.setFromMatrixPosition(_.matrixWorld),s.setFromMatrixPosition(_.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(m),p++}else if(_.isRectAreaLight){let y=n.rectArea[g];y.position.setFromMatrixPosition(_.matrixWorld),y.position.applyMatrix4(m),a.identity(),r.copy(_.matrixWorld),r.premultiply(m),a.extractRotation(r),y.halfWidth.set(_.width*.5,0,0),y.halfHeight.set(0,_.height*.5,0),y.halfWidth.applyMatrix4(a),y.halfHeight.applyMatrix4(a),g++}else if(_.isPointLight){let y=n.point[d];y.position.setFromMatrixPosition(_.matrixWorld),y.position.applyMatrix4(m),d++}else if(_.isHemisphereLight){let y=n.hemi[v];y.direction.setFromMatrixPosition(_.matrixWorld),y.direction.transformDirection(m),v++}}}return{setup:o,setupView:l,state:n}}function om(i){let e=new O1(i),t=[],n=[];function s(u){c.camera=u,t.length=0,n.length=0}function r(u){t.push(u)}function a(u){n.push(u)}function o(){e.setup(t)}function l(u){e.setupView(t,u)}let c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:o,setupLightsView:l,pushLight:r,pushShadow:a}}function k1(i){let e=new WeakMap;function t(s,r=0){let a=e.get(s),o;return a===void 0?(o=new om(i),e.set(s,[o])):r>=a.length?(o=new om(i),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}var z1=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,H1=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function G1(i,e,t){let n=new qa,s=new Re,r=new Re,a=new yt,o=new Zu({depthPacking:fu}),l=new Ku,c={},u=t.maxTextureSize,h={[Bn]:sn,[sn]:Bn,[pn]:pn},d=new Nt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Re},radius:{value:4}},vertexShader:z1,fragmentShader:H1}),p=d.clone();p.defines.HORIZONTAL_PASS=1;let g=new Yt;g.setAttribute("position",new Gt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let v=new Qt(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Qc;let f=this.type;this.render=function(M,R,C){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||M.length===0)return;let b=i.getRenderTarget(),S=i.getActiveCubeFace(),D=i.getActiveMipmapLevel(),U=i.state;U.setBlending(Jt),U.buffers.color.setClear(1,1,1,1),U.buffers.depth.setTest(!0),U.setScissorTest(!1);let O=f!==Ci&&this.type===Ci,B=f===Ci&&this.type!==Ci;for(let G=0,N=M.length;G<N;G++){let I=M[G],P=I.shadow;if(P===void 0){console.warn("THREE.WebGLShadowMap:",I,"has no shadow.");continue}if(P.autoUpdate===!1&&P.needsUpdate===!1)continue;s.copy(P.mapSize);let F=P.getFrameExtents();if(s.multiply(F),r.copy(P.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/F.x),s.x=r.x*F.x,P.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/F.y),s.y=r.y*F.y,P.mapSize.y=r.y)),P.map===null||O===!0||B===!0){let oe=this.type!==Ci?{minFilter:mn,magFilter:mn}:{};P.map!==null&&P.map.dispose(),P.map=new Ht(s.x,s.y,oe),P.map.texture.name=I.name+".shadowMap",P.camera.updateProjectionMatrix()}i.setRenderTarget(P.map),i.clear();let J=P.getViewportCount();for(let oe=0;oe<J;oe++){let _e=P.getViewport(oe);a.set(r.x*_e.x,r.y*_e.y,r.x*_e.z,r.y*_e.w),U.viewport(a),P.updateMatrices(I,oe),n=P.getFrustum(),y(R,C,P.camera,I,this.type)}P.isPointLightShadow!==!0&&this.type===Ci&&x(P,C),P.needsUpdate=!1}f=this.type,m.needsUpdate=!1,i.setRenderTarget(b,S,D)};function x(M,R){let C=e.update(v);d.defines.VSM_SAMPLES!==M.blurSamples&&(d.defines.VSM_SAMPLES=M.blurSamples,p.defines.VSM_SAMPLES=M.blurSamples,d.needsUpdate=!0,p.needsUpdate=!0),M.mapPass===null&&(M.mapPass=new Ht(s.x,s.y)),d.uniforms.shadow_pass.value=M.map.texture,d.uniforms.resolution.value=M.mapSize,d.uniforms.radius.value=M.radius,i.setRenderTarget(M.mapPass),i.clear(),i.renderBufferDirect(R,null,C,d,v,null),p.uniforms.shadow_pass.value=M.mapPass.texture,p.uniforms.resolution.value=M.mapSize,p.uniforms.radius.value=M.radius,i.setRenderTarget(M.map),i.clear(),i.renderBufferDirect(R,null,C,p,v,null)}function _(M,R,C,b){let S=null,D=C.isPointLight===!0?M.customDistanceMaterial:M.customDepthMaterial;if(D!==void 0)S=D;else if(S=C.isPointLight===!0?l:o,i.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0){let U=S.uuid,O=R.uuid,B=c[U];B===void 0&&(B={},c[U]=B);let G=B[O];G===void 0&&(G=S.clone(),B[O]=G,R.addEventListener("dispose",T)),S=G}if(S.visible=R.visible,S.wireframe=R.wireframe,b===Ci?S.side=R.shadowSide!==null?R.shadowSide:R.side:S.side=R.shadowSide!==null?R.shadowSide:h[R.side],S.alphaMap=R.alphaMap,S.alphaTest=R.alphaTest,S.map=R.map,S.clipShadows=R.clipShadows,S.clippingPlanes=R.clippingPlanes,S.clipIntersection=R.clipIntersection,S.displacementMap=R.displacementMap,S.displacementScale=R.displacementScale,S.displacementBias=R.displacementBias,S.wireframeLinewidth=R.wireframeLinewidth,S.linewidth=R.linewidth,C.isPointLight===!0&&S.isMeshDistanceMaterial===!0){let U=i.properties.get(S);U.light=C}return S}function y(M,R,C,b,S){if(M.visible===!1)return;if(M.layers.test(R.layers)&&(M.isMesh||M.isLine||M.isPoints)&&(M.castShadow||M.receiveShadow&&S===Ci)&&(!M.frustumCulled||n.intersectsObject(M))){M.modelViewMatrix.multiplyMatrices(C.matrixWorldInverse,M.matrixWorld);let O=e.update(M),B=M.material;if(Array.isArray(B)){let G=O.groups;for(let N=0,I=G.length;N<I;N++){let P=G[N],F=B[P.materialIndex];if(F&&F.visible){let J=_(M,F,b,S);M.onBeforeShadow(i,M,R,C,O,J,P),i.renderBufferDirect(C,null,O,J,M,P),M.onAfterShadow(i,M,R,C,O,J,P)}}}else if(B.visible){let G=_(M,B,b,S);M.onBeforeShadow(i,M,R,C,O,G,null),i.renderBufferDirect(C,null,O,G,M,null),M.onAfterShadow(i,M,R,C,O,G,null)}}let U=M.children;for(let O=0,B=U.length;O<B;O++)y(U[O],R,C,b,S)}function T(M){M.target.removeEventListener("dispose",T);for(let C in c){let b=c[C],S=M.target.uuid;S in b&&(b[S].dispose(),delete b[S])}}}var V1={[_o]:So,[bo]:Mo,[Eo]:wo,[Qs]:To,[So]:_o,[Mo]:bo,[wo]:Eo,[To]:Qs};function W1(i,e){function t(){let z=!1,le=new yt,ee=null,ue=new yt(0,0,0,0);return{setMask:function(Te){ee!==Te&&!z&&(i.colorMask(Te,Te,Te,Te),ee=Te)},setLocked:function(Te){z=Te},setClear:function(Te,Se,$e,Bt,cn){cn===!0&&(Te*=Bt,Se*=Bt,$e*=Bt),le.set(Te,Se,$e,Bt),ue.equals(le)===!1&&(i.clearColor(Te,Se,$e,Bt),ue.copy(le))},reset:function(){z=!1,ee=null,ue.set(-1,0,0,0)}}}function n(){let z=!1,le=!1,ee=null,ue=null,Te=null;return{setReversed:function(Se){if(le!==Se){let $e=e.get("EXT_clip_control");le?$e.clipControlEXT($e.LOWER_LEFT_EXT,$e.ZERO_TO_ONE_EXT):$e.clipControlEXT($e.LOWER_LEFT_EXT,$e.NEGATIVE_ONE_TO_ONE_EXT);let Bt=Te;Te=null,this.setClear(Bt)}le=Se},getReversed:function(){return le},setTest:function(Se){Se?he(i.DEPTH_TEST):Le(i.DEPTH_TEST)},setMask:function(Se){ee!==Se&&!z&&(i.depthMask(Se),ee=Se)},setFunc:function(Se){if(le&&(Se=V1[Se]),ue!==Se){switch(Se){case _o:i.depthFunc(i.NEVER);break;case So:i.depthFunc(i.ALWAYS);break;case bo:i.depthFunc(i.LESS);break;case Qs:i.depthFunc(i.LEQUAL);break;case Eo:i.depthFunc(i.EQUAL);break;case To:i.depthFunc(i.GEQUAL);break;case Mo:i.depthFunc(i.GREATER);break;case wo:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}ue=Se}},setLocked:function(Se){z=Se},setClear:function(Se){Te!==Se&&(le&&(Se=1-Se),i.clearDepth(Se),Te=Se)},reset:function(){z=!1,ee=null,ue=null,Te=null,le=!1}}}function s(){let z=!1,le=null,ee=null,ue=null,Te=null,Se=null,$e=null,Bt=null,cn=null;return{setTest:function(bt){z||(bt?he(i.STENCIL_TEST):Le(i.STENCIL_TEST))},setMask:function(bt){le!==bt&&!z&&(i.stencilMask(bt),le=bt)},setFunc:function(bt,Sn,bn){(ee!==bt||ue!==Sn||Te!==bn)&&(i.stencilFunc(bt,Sn,bn),ee=bt,ue=Sn,Te=bn)},setOp:function(bt,Sn,bn){(Se!==bt||$e!==Sn||Bt!==bn)&&(i.stencilOp(bt,Sn,bn),Se=bt,$e=Sn,Bt=bn)},setLocked:function(bt){z=bt},setClear:function(bt){cn!==bt&&(i.clearStencil(bt),cn=bt)},reset:function(){z=!1,le=null,ee=null,ue=null,Te=null,Se=null,$e=null,Bt=null,cn=null}}}let r=new t,a=new n,o=new s,l=new WeakMap,c=new WeakMap,u={},h={},d=new WeakMap,p=[],g=null,v=!1,m=null,f=null,x=null,_=null,y=null,T=null,M=null,R=new ye(0,0,0),C=0,b=!1,S=null,D=null,U=null,O=null,B=null,G=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),N=!1,I=0,P=i.getParameter(i.VERSION);P.indexOf("WebGL")!==-1?(I=parseFloat(/^WebGL (\d)/.exec(P)[1]),N=I>=1):P.indexOf("OpenGL ES")!==-1&&(I=parseFloat(/^OpenGL ES (\d)/.exec(P)[1]),N=I>=2);let F=null,J={},oe=i.getParameter(i.SCISSOR_BOX),_e=i.getParameter(i.VIEWPORT),ce=new yt().fromArray(oe),X=new yt().fromArray(_e);function Z(z,le,ee,ue){let Te=new Uint8Array(4),Se=i.createTexture();i.bindTexture(z,Se),i.texParameteri(z,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(z,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let $e=0;$e<ee;$e++)z===i.TEXTURE_3D||z===i.TEXTURE_2D_ARRAY?i.texImage3D(le,0,i.RGBA,1,1,ue,0,i.RGBA,i.UNSIGNED_BYTE,Te):i.texImage2D(le+$e,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Te);return Se}let ie={};ie[i.TEXTURE_2D]=Z(i.TEXTURE_2D,i.TEXTURE_2D,1),ie[i.TEXTURE_CUBE_MAP]=Z(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),ie[i.TEXTURE_2D_ARRAY]=Z(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),ie[i.TEXTURE_3D]=Z(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),he(i.DEPTH_TEST),a.setFunc(Qs),Be(!1),qe(Yc),he(i.CULL_FACE),L(Jt);function he(z){u[z]!==!0&&(i.enable(z),u[z]=!0)}function Le(z){u[z]!==!1&&(i.disable(z),u[z]=!1)}function Ce(z,le){return h[z]!==le?(i.bindFramebuffer(z,le),h[z]=le,z===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=le),z===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=le),!0):!1}function He(z,le){let ee=p,ue=!1;if(z){ee=d.get(le),ee===void 0&&(ee=[],d.set(le,ee));let Te=z.textures;if(ee.length!==Te.length||ee[0]!==i.COLOR_ATTACHMENT0){for(let Se=0,$e=Te.length;Se<$e;Se++)ee[Se]=i.COLOR_ATTACHMENT0+Se;ee.length=Te.length,ue=!0}}else ee[0]!==i.BACK&&(ee[0]=i.BACK,ue=!0);ue&&i.drawBuffers(ee)}function Je(z){return g!==z?(i.useProgram(z),g=z,!0):!1}let We={[vs]:i.FUNC_ADD,[Qd]:i.FUNC_SUBTRACT,[qd]:i.FUNC_REVERSE_SUBTRACT};We[jd]=i.MIN,We[Zd]=i.MAX;let Ke={[Kd]:i.ZERO,[Jd]:i.ONE,[$d]:i.SRC_COLOR,[yo]:i.SRC_ALPHA,[af]:i.SRC_ALPHA_SATURATE,[sf]:i.DST_COLOR,[tf]:i.DST_ALPHA,[ef]:i.ONE_MINUS_SRC_COLOR,[Ao]:i.ONE_MINUS_SRC_ALPHA,[rf]:i.ONE_MINUS_DST_COLOR,[nf]:i.ONE_MINUS_DST_ALPHA,[of]:i.CONSTANT_COLOR,[lf]:i.ONE_MINUS_CONSTANT_COLOR,[cf]:i.CONSTANT_ALPHA,[uf]:i.ONE_MINUS_CONSTANT_ALPHA};function L(z,le,ee,ue,Te,Se,$e,Bt,cn,bt){if(z===Jt){v===!0&&(Le(i.BLEND),v=!1);return}if(v===!1&&(he(i.BLEND),v=!0),z!==Yd){if(z!==m||bt!==b){if((f!==vs||y!==vs)&&(i.blendEquation(i.FUNC_ADD),f=vs,y=vs),bt)switch(z){case Ys:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case qc:i.blendFunc(i.ONE,i.ONE);break;case jc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Zc:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",z);break}else switch(z){case Ys:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case qc:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case jc:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Zc:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",z);break}x=null,_=null,T=null,M=null,R.set(0,0,0),C=0,m=z,b=bt}return}Te=Te||le,Se=Se||ee,$e=$e||ue,(le!==f||Te!==y)&&(i.blendEquationSeparate(We[le],We[Te]),f=le,y=Te),(ee!==x||ue!==_||Se!==T||$e!==M)&&(i.blendFuncSeparate(Ke[ee],Ke[ue],Ke[Se],Ke[$e]),x=ee,_=ue,T=Se,M=$e),(Bt.equals(R)===!1||cn!==C)&&(i.blendColor(Bt.r,Bt.g,Bt.b,cn),R.copy(Bt),C=cn),m=z,b=!1}function Dt(z,le){z.side===pn?Le(i.CULL_FACE):he(i.CULL_FACE);let ee=z.side===sn;le&&(ee=!ee),Be(ee),z.blending===Ys&&z.transparent===!1?L(Jt):L(z.blending,z.blendEquation,z.blendSrc,z.blendDst,z.blendEquationAlpha,z.blendSrcAlpha,z.blendDstAlpha,z.blendColor,z.blendAlpha,z.premultipliedAlpha),a.setFunc(z.depthFunc),a.setTest(z.depthTest),a.setMask(z.depthWrite),r.setMask(z.colorWrite);let ue=z.stencilWrite;o.setTest(ue),ue&&(o.setMask(z.stencilWriteMask),o.setFunc(z.stencilFunc,z.stencilRef,z.stencilFuncMask),o.setOp(z.stencilFail,z.stencilZFail,z.stencilZPass)),pe(z.polygonOffset,z.polygonOffsetFactor,z.polygonOffsetUnits),z.alphaToCoverage===!0?he(i.SAMPLE_ALPHA_TO_COVERAGE):Le(i.SAMPLE_ALPHA_TO_COVERAGE)}function Be(z){S!==z&&(z?i.frontFace(i.CW):i.frontFace(i.CCW),S=z)}function qe(z){z!==Vd?(he(i.CULL_FACE),z!==D&&(z===Yc?i.cullFace(i.BACK):z===Wd?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Le(i.CULL_FACE),D=z}function Fe(z){z!==U&&(N&&i.lineWidth(z),U=z)}function pe(z,le,ee){z?(he(i.POLYGON_OFFSET_FILL),(O!==le||B!==ee)&&(i.polygonOffset(le,ee),O=le,B=ee)):Le(i.POLYGON_OFFSET_FILL)}function ve(z){z?he(i.SCISSOR_TEST):Le(i.SCISSOR_TEST)}function w(z){z===void 0&&(z=i.TEXTURE0+G-1),F!==z&&(i.activeTexture(z),F=z)}function A(z,le,ee){ee===void 0&&(F===null?ee=i.TEXTURE0+G-1:ee=F);let ue=J[ee];ue===void 0&&(ue={type:void 0,texture:void 0},J[ee]=ue),(ue.type!==z||ue.texture!==le)&&(F!==ee&&(i.activeTexture(ee),F=ee),i.bindTexture(z,le||ie[z]),ue.type=z,ue.texture=le)}function Y(){let z=J[F];z!==void 0&&z.type!==void 0&&(i.bindTexture(z.type,null),z.type=void 0,z.texture=void 0)}function $(){try{i.compressedTexImage2D.apply(i,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function se(){try{i.compressedTexImage3D.apply(i,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function te(){try{i.texSubImage2D.apply(i,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function j(){try{i.texSubImage3D.apply(i,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function K(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function ae(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function Ee(){try{i.texStorage2D.apply(i,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function re(){try{i.texStorage3D.apply(i,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function me(){try{i.texImage2D.apply(i,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function Ue(){try{i.texImage3D.apply(i,arguments)}catch(z){console.error("THREE.WebGLState:",z)}}function Qe(z){ce.equals(z)===!1&&(i.scissor(z.x,z.y,z.z,z.w),ce.copy(z))}function Me(z){X.equals(z)===!1&&(i.viewport(z.x,z.y,z.z,z.w),X.copy(z))}function Ne(z,le){let ee=c.get(le);ee===void 0&&(ee=new WeakMap,c.set(le,ee));let ue=ee.get(z);ue===void 0&&(ue=i.getUniformBlockIndex(le,z.name),ee.set(z,ue))}function Ge(z,le){let ue=c.get(le).get(z);l.get(le)!==ue&&(i.uniformBlockBinding(le,ue,z.__bindingPointIndex),l.set(le,ue))}function Pt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),u={},F=null,J={},h={},d=new WeakMap,p=[],g=null,v=!1,m=null,f=null,x=null,_=null,y=null,T=null,M=null,R=new ye(0,0,0),C=0,b=!1,S=null,D=null,U=null,O=null,B=null,ce.set(0,0,i.canvas.width,i.canvas.height),X.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:he,disable:Le,bindFramebuffer:Ce,drawBuffers:He,useProgram:Je,setBlending:L,setMaterial:Dt,setFlipSided:Be,setCullFace:qe,setLineWidth:Fe,setPolygonOffset:pe,setScissorTest:ve,activeTexture:w,bindTexture:A,unbindTexture:Y,compressedTexImage2D:$,compressedTexImage3D:se,texImage2D:me,texImage3D:Ue,updateUBOMapping:Ne,uniformBlockBinding:Ge,texStorage2D:Ee,texStorage3D:re,texSubImage2D:te,texSubImage3D:j,compressedTexSubImage2D:K,compressedTexSubImage3D:ae,scissor:Qe,viewport:Me,reset:Pt}}function X1(i,e,t,n,s,r,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator=="undefined"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Re,u=new WeakMap,h,d=new WeakMap,p=!1;try{p=typeof OffscreenCanvas!="undefined"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(w,A){return p?new OffscreenCanvas(w,A):Nr("canvas")}function v(w,A,Y){let $=1,se=ve(w);if((se.width>Y||se.height>Y)&&($=Y/Math.max(se.width,se.height)),$<1)if(typeof HTMLImageElement!="undefined"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&w instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&w instanceof ImageBitmap||typeof VideoFrame!="undefined"&&w instanceof VideoFrame){let te=Math.floor($*se.width),j=Math.floor($*se.height);h===void 0&&(h=g(te,j));let K=A?g(te,j):h;return K.width=te,K.height=j,K.getContext("2d").drawImage(w,0,0,te,j),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+se.width+"x"+se.height+") to ("+te+"x"+j+")."),K}else return"data"in w&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+se.width+"x"+se.height+")."),w;return w}function m(w){return w.generateMipmaps}function f(w){i.generateMipmap(w)}function x(w){return w.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:w.isWebGL3DRenderTarget?i.TEXTURE_3D:w.isWebGLArrayRenderTarget||w.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function _(w,A,Y,$,se=!1){if(w!==null){if(i[w]!==void 0)return i[w];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+"'")}let te=A;if(A===i.RED&&(Y===i.FLOAT&&(te=i.R32F),Y===i.HALF_FLOAT&&(te=i.R16F),Y===i.UNSIGNED_BYTE&&(te=i.R8)),A===i.RED_INTEGER&&(Y===i.UNSIGNED_BYTE&&(te=i.R8UI),Y===i.UNSIGNED_SHORT&&(te=i.R16UI),Y===i.UNSIGNED_INT&&(te=i.R32UI),Y===i.BYTE&&(te=i.R8I),Y===i.SHORT&&(te=i.R16I),Y===i.INT&&(te=i.R32I)),A===i.RG&&(Y===i.FLOAT&&(te=i.RG32F),Y===i.HALF_FLOAT&&(te=i.RG16F),Y===i.UNSIGNED_BYTE&&(te=i.RG8)),A===i.RG_INTEGER&&(Y===i.UNSIGNED_BYTE&&(te=i.RG8UI),Y===i.UNSIGNED_SHORT&&(te=i.RG16UI),Y===i.UNSIGNED_INT&&(te=i.RG32UI),Y===i.BYTE&&(te=i.RG8I),Y===i.SHORT&&(te=i.RG16I),Y===i.INT&&(te=i.RG32I)),A===i.RGB_INTEGER&&(Y===i.UNSIGNED_BYTE&&(te=i.RGB8UI),Y===i.UNSIGNED_SHORT&&(te=i.RGB16UI),Y===i.UNSIGNED_INT&&(te=i.RGB32UI),Y===i.BYTE&&(te=i.RGB8I),Y===i.SHORT&&(te=i.RGB16I),Y===i.INT&&(te=i.RGB32I)),A===i.RGBA_INTEGER&&(Y===i.UNSIGNED_BYTE&&(te=i.RGBA8UI),Y===i.UNSIGNED_SHORT&&(te=i.RGBA16UI),Y===i.UNSIGNED_INT&&(te=i.RGBA32UI),Y===i.BYTE&&(te=i.RGBA8I),Y===i.SHORT&&(te=i.RGBA16I),Y===i.INT&&(te=i.RGBA32I)),A===i.RGB&&Y===i.UNSIGNED_INT_5_9_9_9_REV&&(te=i.RGB9_E5),A===i.RGBA){let j=se?Ua:pt.getTransfer($);Y===i.FLOAT&&(te=i.RGBA32F),Y===i.HALF_FLOAT&&(te=i.RGBA16F),Y===i.UNSIGNED_BYTE&&(te=j===Ft?i.SRGB8_ALPHA8:i.RGBA8),Y===i.UNSIGNED_SHORT_4_4_4_4&&(te=i.RGBA4),Y===i.UNSIGNED_SHORT_5_5_5_1&&(te=i.RGB5_A1)}return(te===i.R16F||te===i.R32F||te===i.RG16F||te===i.RG32F||te===i.RGBA16F||te===i.RGBA32F)&&e.get("EXT_color_buffer_float"),te}function y(w,A){let Y;return w?A===null||A===Di||A===Gi?Y=i.DEPTH24_STENCIL8:A===On?Y=i.DEPTH32F_STENCIL8:A===Lr&&(Y=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):A===null||A===Di||A===Gi?Y=i.DEPTH_COMPONENT24:A===On?Y=i.DEPTH_COMPONENT32F:A===Lr&&(Y=i.DEPTH_COMPONENT16),Y}function T(w,A){return m(w)===!0||w.isFramebufferTexture&&w.minFilter!==mn&&w.minFilter!==$t?Math.log2(Math.max(A.width,A.height))+1:w.mipmaps!==void 0&&w.mipmaps.length>0?w.mipmaps.length:w.isCompressedTexture&&Array.isArray(w.image)?A.mipmaps.length:1}function M(w){let A=w.target;A.removeEventListener("dispose",M),C(A),A.isVideoTexture&&u.delete(A)}function R(w){let A=w.target;A.removeEventListener("dispose",R),S(A)}function C(w){let A=n.get(w);if(A.__webglInit===void 0)return;let Y=w.source,$=d.get(Y);if($){let se=$[A.__cacheKey];se.usedTimes--,se.usedTimes===0&&b(w),Object.keys($).length===0&&d.delete(Y)}n.remove(w)}function b(w){let A=n.get(w);i.deleteTexture(A.__webglTexture);let Y=w.source,$=d.get(Y);delete $[A.__cacheKey],a.memory.textures--}function S(w){let A=n.get(w);if(w.depthTexture&&(w.depthTexture.dispose(),n.remove(w.depthTexture)),w.isWebGLCubeRenderTarget)for(let $=0;$<6;$++){if(Array.isArray(A.__webglFramebuffer[$]))for(let se=0;se<A.__webglFramebuffer[$].length;se++)i.deleteFramebuffer(A.__webglFramebuffer[$][se]);else i.deleteFramebuffer(A.__webglFramebuffer[$]);A.__webglDepthbuffer&&i.deleteRenderbuffer(A.__webglDepthbuffer[$])}else{if(Array.isArray(A.__webglFramebuffer))for(let $=0;$<A.__webglFramebuffer.length;$++)i.deleteFramebuffer(A.__webglFramebuffer[$]);else i.deleteFramebuffer(A.__webglFramebuffer);if(A.__webglDepthbuffer&&i.deleteRenderbuffer(A.__webglDepthbuffer),A.__webglMultisampledFramebuffer&&i.deleteFramebuffer(A.__webglMultisampledFramebuffer),A.__webglColorRenderbuffer)for(let $=0;$<A.__webglColorRenderbuffer.length;$++)A.__webglColorRenderbuffer[$]&&i.deleteRenderbuffer(A.__webglColorRenderbuffer[$]);A.__webglDepthRenderbuffer&&i.deleteRenderbuffer(A.__webglDepthRenderbuffer)}let Y=w.textures;for(let $=0,se=Y.length;$<se;$++){let te=n.get(Y[$]);te.__webglTexture&&(i.deleteTexture(te.__webglTexture),a.memory.textures--),n.remove(Y[$])}n.remove(w)}let D=0;function U(){D=0}function O(){let w=D;return w>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+w+" texture units while this GPU supports only "+s.maxTextures),D+=1,w}function B(w){let A=[];return A.push(w.wrapS),A.push(w.wrapT),A.push(w.wrapR||0),A.push(w.magFilter),A.push(w.minFilter),A.push(w.anisotropy),A.push(w.internalFormat),A.push(w.format),A.push(w.type),A.push(w.generateMipmaps),A.push(w.premultiplyAlpha),A.push(w.flipY),A.push(w.unpackAlignment),A.push(w.colorSpace),A.join()}function G(w,A){let Y=n.get(w);if(w.isVideoTexture&&Fe(w),w.isRenderTargetTexture===!1&&w.version>0&&Y.__version!==w.version){let $=w.image;if($===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if($.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{X(Y,w,A);return}}t.bindTexture(i.TEXTURE_2D,Y.__webglTexture,i.TEXTURE0+A)}function N(w,A){let Y=n.get(w);if(w.version>0&&Y.__version!==w.version){X(Y,w,A);return}t.bindTexture(i.TEXTURE_2D_ARRAY,Y.__webglTexture,i.TEXTURE0+A)}function I(w,A){let Y=n.get(w);if(w.version>0&&Y.__version!==w.version){X(Y,w,A);return}t.bindTexture(i.TEXTURE_3D,Y.__webglTexture,i.TEXTURE0+A)}function P(w,A){let Y=n.get(w);if(w.version>0&&Y.__version!==w.version){Z(Y,w,A);return}t.bindTexture(i.TEXTURE_CUBE_MAP,Y.__webglTexture,i.TEXTURE0+A)}let F={[xs]:i.REPEAT,[Ri]:i.CLAMP_TO_EDGE,[Pr]:i.MIRRORED_REPEAT},J={[mn]:i.NEAREST,[Do]:i.NEAREST_MIPMAP_NEAREST,[Zs]:i.NEAREST_MIPMAP_LINEAR,[$t]:i.LINEAR,[Ir]:i.LINEAR_MIPMAP_NEAREST,[pi]:i.LINEAR_MIPMAP_LINEAR},oe={[bf]:i.NEVER,[Rf]:i.ALWAYS,[Ef]:i.LESS,[mu]:i.LEQUAL,[Tf]:i.EQUAL,[Cf]:i.GEQUAL,[Mf]:i.GREATER,[wf]:i.NOTEQUAL};function _e(w,A){if(A.type===On&&e.has("OES_texture_float_linear")===!1&&(A.magFilter===$t||A.magFilter===Ir||A.magFilter===Zs||A.magFilter===pi||A.minFilter===$t||A.minFilter===Ir||A.minFilter===Zs||A.minFilter===pi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(w,i.TEXTURE_WRAP_S,F[A.wrapS]),i.texParameteri(w,i.TEXTURE_WRAP_T,F[A.wrapT]),(w===i.TEXTURE_3D||w===i.TEXTURE_2D_ARRAY)&&i.texParameteri(w,i.TEXTURE_WRAP_R,F[A.wrapR]),i.texParameteri(w,i.TEXTURE_MAG_FILTER,J[A.magFilter]),i.texParameteri(w,i.TEXTURE_MIN_FILTER,J[A.minFilter]),A.compareFunction&&(i.texParameteri(w,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(w,i.TEXTURE_COMPARE_FUNC,oe[A.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(A.magFilter===mn||A.minFilter!==Zs&&A.minFilter!==pi||A.type===On&&e.has("OES_texture_float_linear")===!1)return;if(A.anisotropy>1||n.get(A).__currentAnisotropy){let Y=e.get("EXT_texture_filter_anisotropic");i.texParameterf(w,Y.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(A.anisotropy,s.getMaxAnisotropy())),n.get(A).__currentAnisotropy=A.anisotropy}}}function ce(w,A){let Y=!1;w.__webglInit===void 0&&(w.__webglInit=!0,A.addEventListener("dispose",M));let $=A.source,se=d.get($);se===void 0&&(se={},d.set($,se));let te=B(A);if(te!==w.__cacheKey){se[te]===void 0&&(se[te]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,Y=!0),se[te].usedTimes++;let j=se[w.__cacheKey];j!==void 0&&(se[w.__cacheKey].usedTimes--,j.usedTimes===0&&b(A)),w.__cacheKey=te,w.__webglTexture=se[te].texture}return Y}function X(w,A,Y){let $=i.TEXTURE_2D;(A.isDataArrayTexture||A.isCompressedArrayTexture)&&($=i.TEXTURE_2D_ARRAY),A.isData3DTexture&&($=i.TEXTURE_3D);let se=ce(w,A),te=A.source;t.bindTexture($,w.__webglTexture,i.TEXTURE0+Y);let j=n.get(te);if(te.version!==j.__version||se===!0){t.activeTexture(i.TEXTURE0+Y);let K=pt.getPrimaries(pt.workingColorSpace),ae=A.colorSpace===zn?null:pt.getPrimaries(A.colorSpace),Ee=A.colorSpace===zn||K===ae?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,A.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,A.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ee);let re=v(A.image,!1,s.maxTextureSize);re=pe(A,re);let me=r.convert(A.format,A.colorSpace),Ue=r.convert(A.type),Qe=_(A.internalFormat,me,Ue,A.colorSpace,A.isVideoTexture);_e($,A);let Me,Ne=A.mipmaps,Ge=A.isVideoTexture!==!0,Pt=j.__version===void 0||se===!0,z=te.dataReady,le=T(A,re);if(A.isDepthTexture)Qe=y(A.format===Vi,A.type),Pt&&(Ge?t.texStorage2D(i.TEXTURE_2D,1,Qe,re.width,re.height):t.texImage2D(i.TEXTURE_2D,0,Qe,re.width,re.height,0,me,Ue,null));else if(A.isDataTexture)if(Ne.length>0){Ge&&Pt&&t.texStorage2D(i.TEXTURE_2D,le,Qe,Ne[0].width,Ne[0].height);for(let ee=0,ue=Ne.length;ee<ue;ee++)Me=Ne[ee],Ge?z&&t.texSubImage2D(i.TEXTURE_2D,ee,0,0,Me.width,Me.height,me,Ue,Me.data):t.texImage2D(i.TEXTURE_2D,ee,Qe,Me.width,Me.height,0,me,Ue,Me.data);A.generateMipmaps=!1}else Ge?(Pt&&t.texStorage2D(i.TEXTURE_2D,le,Qe,re.width,re.height),z&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,re.width,re.height,me,Ue,re.data)):t.texImage2D(i.TEXTURE_2D,0,Qe,re.width,re.height,0,me,Ue,re.data);else if(A.isCompressedTexture)if(A.isCompressedArrayTexture){Ge&&Pt&&t.texStorage3D(i.TEXTURE_2D_ARRAY,le,Qe,Ne[0].width,Ne[0].height,re.depth);for(let ee=0,ue=Ne.length;ee<ue;ee++)if(Me=Ne[ee],A.format!==kn)if(me!==null)if(Ge){if(z)if(A.layerUpdates.size>0){let Te=ch(Me.width,Me.height,A.format,A.type);for(let Se of A.layerUpdates){let $e=Me.data.subarray(Se*Te/Me.data.BYTES_PER_ELEMENT,(Se+1)*Te/Me.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ee,0,0,Se,Me.width,Me.height,1,me,$e)}A.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ee,0,0,0,Me.width,Me.height,re.depth,me,Me.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ee,Qe,Me.width,Me.height,re.depth,0,Me.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ge?z&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,ee,0,0,0,Me.width,Me.height,re.depth,me,Ue,Me.data):t.texImage3D(i.TEXTURE_2D_ARRAY,ee,Qe,Me.width,Me.height,re.depth,0,me,Ue,Me.data)}else{Ge&&Pt&&t.texStorage2D(i.TEXTURE_2D,le,Qe,Ne[0].width,Ne[0].height);for(let ee=0,ue=Ne.length;ee<ue;ee++)Me=Ne[ee],A.format!==kn?me!==null?Ge?z&&t.compressedTexSubImage2D(i.TEXTURE_2D,ee,0,0,Me.width,Me.height,me,Me.data):t.compressedTexImage2D(i.TEXTURE_2D,ee,Qe,Me.width,Me.height,0,Me.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ge?z&&t.texSubImage2D(i.TEXTURE_2D,ee,0,0,Me.width,Me.height,me,Ue,Me.data):t.texImage2D(i.TEXTURE_2D,ee,Qe,Me.width,Me.height,0,me,Ue,Me.data)}else if(A.isDataArrayTexture)if(Ge){if(Pt&&t.texStorage3D(i.TEXTURE_2D_ARRAY,le,Qe,re.width,re.height,re.depth),z)if(A.layerUpdates.size>0){let ee=ch(re.width,re.height,A.format,A.type);for(let ue of A.layerUpdates){let Te=re.data.subarray(ue*ee/re.data.BYTES_PER_ELEMENT,(ue+1)*ee/re.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,ue,re.width,re.height,1,me,Ue,Te)}A.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,re.width,re.height,re.depth,me,Ue,re.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Qe,re.width,re.height,re.depth,0,me,Ue,re.data);else if(A.isData3DTexture)Ge?(Pt&&t.texStorage3D(i.TEXTURE_3D,le,Qe,re.width,re.height,re.depth),z&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,re.width,re.height,re.depth,me,Ue,re.data)):t.texImage3D(i.TEXTURE_3D,0,Qe,re.width,re.height,re.depth,0,me,Ue,re.data);else if(A.isFramebufferTexture){if(Pt)if(Ge)t.texStorage2D(i.TEXTURE_2D,le,Qe,re.width,re.height);else{let ee=re.width,ue=re.height;for(let Te=0;Te<le;Te++)t.texImage2D(i.TEXTURE_2D,Te,Qe,ee,ue,0,me,Ue,null),ee>>=1,ue>>=1}}else if(Ne.length>0){if(Ge&&Pt){let ee=ve(Ne[0]);t.texStorage2D(i.TEXTURE_2D,le,Qe,ee.width,ee.height)}for(let ee=0,ue=Ne.length;ee<ue;ee++)Me=Ne[ee],Ge?z&&t.texSubImage2D(i.TEXTURE_2D,ee,0,0,me,Ue,Me):t.texImage2D(i.TEXTURE_2D,ee,Qe,me,Ue,Me);A.generateMipmaps=!1}else if(Ge){if(Pt){let ee=ve(re);t.texStorage2D(i.TEXTURE_2D,le,Qe,ee.width,ee.height)}z&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,me,Ue,re)}else t.texImage2D(i.TEXTURE_2D,0,Qe,me,Ue,re);m(A)&&f($),j.__version=te.version,A.onUpdate&&A.onUpdate(A)}w.__version=A.version}function Z(w,A,Y){if(A.image.length!==6)return;let $=ce(w,A),se=A.source;t.bindTexture(i.TEXTURE_CUBE_MAP,w.__webglTexture,i.TEXTURE0+Y);let te=n.get(se);if(se.version!==te.__version||$===!0){t.activeTexture(i.TEXTURE0+Y);let j=pt.getPrimaries(pt.workingColorSpace),K=A.colorSpace===zn?null:pt.getPrimaries(A.colorSpace),ae=A.colorSpace===zn||j===K?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,A.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,A.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ae);let Ee=A.isCompressedTexture||A.image[0].isCompressedTexture,re=A.image[0]&&A.image[0].isDataTexture,me=[];for(let ue=0;ue<6;ue++)!Ee&&!re?me[ue]=v(A.image[ue],!0,s.maxCubemapSize):me[ue]=re?A.image[ue].image:A.image[ue],me[ue]=pe(A,me[ue]);let Ue=me[0],Qe=r.convert(A.format,A.colorSpace),Me=r.convert(A.type),Ne=_(A.internalFormat,Qe,Me,A.colorSpace),Ge=A.isVideoTexture!==!0,Pt=te.__version===void 0||$===!0,z=se.dataReady,le=T(A,Ue);_e(i.TEXTURE_CUBE_MAP,A);let ee;if(Ee){Ge&&Pt&&t.texStorage2D(i.TEXTURE_CUBE_MAP,le,Ne,Ue.width,Ue.height);for(let ue=0;ue<6;ue++){ee=me[ue].mipmaps;for(let Te=0;Te<ee.length;Te++){let Se=ee[Te];A.format!==kn?Qe!==null?Ge?z&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ue,Te,0,0,Se.width,Se.height,Qe,Se.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ue,Te,Ne,Se.width,Se.height,0,Se.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ge?z&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ue,Te,0,0,Se.width,Se.height,Qe,Me,Se.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ue,Te,Ne,Se.width,Se.height,0,Qe,Me,Se.data)}}}else{if(ee=A.mipmaps,Ge&&Pt){ee.length>0&&le++;let ue=ve(me[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,le,Ne,ue.width,ue.height)}for(let ue=0;ue<6;ue++)if(re){Ge?z&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ue,0,0,0,me[ue].width,me[ue].height,Qe,Me,me[ue].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ue,0,Ne,me[ue].width,me[ue].height,0,Qe,Me,me[ue].data);for(let Te=0;Te<ee.length;Te++){let $e=ee[Te].image[ue].image;Ge?z&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ue,Te+1,0,0,$e.width,$e.height,Qe,Me,$e.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ue,Te+1,Ne,$e.width,$e.height,0,Qe,Me,$e.data)}}else{Ge?z&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ue,0,0,0,Qe,Me,me[ue]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ue,0,Ne,Qe,Me,me[ue]);for(let Te=0;Te<ee.length;Te++){let Se=ee[Te];Ge?z&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ue,Te+1,0,0,Qe,Me,Se.image[ue]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ue,Te+1,Ne,Qe,Me,Se.image[ue])}}}m(A)&&f(i.TEXTURE_CUBE_MAP),te.__version=se.version,A.onUpdate&&A.onUpdate(A)}w.__version=A.version}function ie(w,A,Y,$,se,te){let j=r.convert(Y.format,Y.colorSpace),K=r.convert(Y.type),ae=_(Y.internalFormat,j,K,Y.colorSpace),Ee=n.get(A),re=n.get(Y);if(re.__renderTarget=A,!Ee.__hasExternalTextures){let me=Math.max(1,A.width>>te),Ue=Math.max(1,A.height>>te);se===i.TEXTURE_3D||se===i.TEXTURE_2D_ARRAY?t.texImage3D(se,te,ae,me,Ue,A.depth,0,j,K,null):t.texImage2D(se,te,ae,me,Ue,0,j,K,null)}t.bindFramebuffer(i.FRAMEBUFFER,w),qe(A)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,$,se,re.__webglTexture,0,Be(A)):(se===i.TEXTURE_2D||se>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&se<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,$,se,re.__webglTexture,te),t.bindFramebuffer(i.FRAMEBUFFER,null)}function he(w,A,Y){if(i.bindRenderbuffer(i.RENDERBUFFER,w),A.depthBuffer){let $=A.depthTexture,se=$&&$.isDepthTexture?$.type:null,te=y(A.stencilBuffer,se),j=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,K=Be(A);qe(A)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,K,te,A.width,A.height):Y?i.renderbufferStorageMultisample(i.RENDERBUFFER,K,te,A.width,A.height):i.renderbufferStorage(i.RENDERBUFFER,te,A.width,A.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,j,i.RENDERBUFFER,w)}else{let $=A.textures;for(let se=0;se<$.length;se++){let te=$[se],j=r.convert(te.format,te.colorSpace),K=r.convert(te.type),ae=_(te.internalFormat,j,K,te.colorSpace),Ee=Be(A);Y&&qe(A)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Ee,ae,A.width,A.height):qe(A)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Ee,ae,A.width,A.height):i.renderbufferStorage(i.RENDERBUFFER,ae,A.width,A.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Le(w,A){if(A&&A.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,w),!(A.depthTexture&&A.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let $=n.get(A.depthTexture);$.__renderTarget=A,(!$.__webglTexture||A.depthTexture.image.width!==A.width||A.depthTexture.image.height!==A.height)&&(A.depthTexture.image.width=A.width,A.depthTexture.image.height=A.height,A.depthTexture.needsUpdate=!0),G(A.depthTexture,0);let se=$.__webglTexture,te=Be(A);if(A.depthTexture.format===Ks)qe(A)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,se,0,te):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,se,0);else if(A.depthTexture.format===Vi)qe(A)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,se,0,te):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,se,0);else throw new Error("Unknown depthTexture format")}function Ce(w){let A=n.get(w),Y=w.isWebGLCubeRenderTarget===!0;if(A.__boundDepthTexture!==w.depthTexture){let $=w.depthTexture;if(A.__depthDisposeCallback&&A.__depthDisposeCallback(),$){let se=()=>{delete A.__boundDepthTexture,delete A.__depthDisposeCallback,$.removeEventListener("dispose",se)};$.addEventListener("dispose",se),A.__depthDisposeCallback=se}A.__boundDepthTexture=$}if(w.depthTexture&&!A.__autoAllocateDepthBuffer){if(Y)throw new Error("target.depthTexture not supported in Cube render targets");Le(A.__webglFramebuffer,w)}else if(Y){A.__webglDepthbuffer=[];for(let $=0;$<6;$++)if(t.bindFramebuffer(i.FRAMEBUFFER,A.__webglFramebuffer[$]),A.__webglDepthbuffer[$]===void 0)A.__webglDepthbuffer[$]=i.createRenderbuffer(),he(A.__webglDepthbuffer[$],w,!1);else{let se=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,te=A.__webglDepthbuffer[$];i.bindRenderbuffer(i.RENDERBUFFER,te),i.framebufferRenderbuffer(i.FRAMEBUFFER,se,i.RENDERBUFFER,te)}}else if(t.bindFramebuffer(i.FRAMEBUFFER,A.__webglFramebuffer),A.__webglDepthbuffer===void 0)A.__webglDepthbuffer=i.createRenderbuffer(),he(A.__webglDepthbuffer,w,!1);else{let $=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,se=A.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,se),i.framebufferRenderbuffer(i.FRAMEBUFFER,$,i.RENDERBUFFER,se)}t.bindFramebuffer(i.FRAMEBUFFER,null)}function He(w,A,Y){let $=n.get(w);A!==void 0&&ie($.__webglFramebuffer,w,w.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),Y!==void 0&&Ce(w)}function Je(w){let A=w.texture,Y=n.get(w),$=n.get(A);w.addEventListener("dispose",R);let se=w.textures,te=w.isWebGLCubeRenderTarget===!0,j=se.length>1;if(j||($.__webglTexture===void 0&&($.__webglTexture=i.createTexture()),$.__version=A.version,a.memory.textures++),te){Y.__webglFramebuffer=[];for(let K=0;K<6;K++)if(A.mipmaps&&A.mipmaps.length>0){Y.__webglFramebuffer[K]=[];for(let ae=0;ae<A.mipmaps.length;ae++)Y.__webglFramebuffer[K][ae]=i.createFramebuffer()}else Y.__webglFramebuffer[K]=i.createFramebuffer()}else{if(A.mipmaps&&A.mipmaps.length>0){Y.__webglFramebuffer=[];for(let K=0;K<A.mipmaps.length;K++)Y.__webglFramebuffer[K]=i.createFramebuffer()}else Y.__webglFramebuffer=i.createFramebuffer();if(j)for(let K=0,ae=se.length;K<ae;K++){let Ee=n.get(se[K]);Ee.__webglTexture===void 0&&(Ee.__webglTexture=i.createTexture(),a.memory.textures++)}if(w.samples>0&&qe(w)===!1){Y.__webglMultisampledFramebuffer=i.createFramebuffer(),Y.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,Y.__webglMultisampledFramebuffer);for(let K=0;K<se.length;K++){let ae=se[K];Y.__webglColorRenderbuffer[K]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,Y.__webglColorRenderbuffer[K]);let Ee=r.convert(ae.format,ae.colorSpace),re=r.convert(ae.type),me=_(ae.internalFormat,Ee,re,ae.colorSpace,w.isXRRenderTarget===!0),Ue=Be(w);i.renderbufferStorageMultisample(i.RENDERBUFFER,Ue,me,w.width,w.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+K,i.RENDERBUFFER,Y.__webglColorRenderbuffer[K])}i.bindRenderbuffer(i.RENDERBUFFER,null),w.depthBuffer&&(Y.__webglDepthRenderbuffer=i.createRenderbuffer(),he(Y.__webglDepthRenderbuffer,w,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(te){t.bindTexture(i.TEXTURE_CUBE_MAP,$.__webglTexture),_e(i.TEXTURE_CUBE_MAP,A);for(let K=0;K<6;K++)if(A.mipmaps&&A.mipmaps.length>0)for(let ae=0;ae<A.mipmaps.length;ae++)ie(Y.__webglFramebuffer[K][ae],w,A,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+K,ae);else ie(Y.__webglFramebuffer[K],w,A,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0);m(A)&&f(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(j){for(let K=0,ae=se.length;K<ae;K++){let Ee=se[K],re=n.get(Ee);t.bindTexture(i.TEXTURE_2D,re.__webglTexture),_e(i.TEXTURE_2D,Ee),ie(Y.__webglFramebuffer,w,Ee,i.COLOR_ATTACHMENT0+K,i.TEXTURE_2D,0),m(Ee)&&f(i.TEXTURE_2D)}t.unbindTexture()}else{let K=i.TEXTURE_2D;if((w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(K=w.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(K,$.__webglTexture),_e(K,A),A.mipmaps&&A.mipmaps.length>0)for(let ae=0;ae<A.mipmaps.length;ae++)ie(Y.__webglFramebuffer[ae],w,A,i.COLOR_ATTACHMENT0,K,ae);else ie(Y.__webglFramebuffer,w,A,i.COLOR_ATTACHMENT0,K,0);m(A)&&f(K),t.unbindTexture()}w.depthBuffer&&Ce(w)}function We(w){let A=w.textures;for(let Y=0,$=A.length;Y<$;Y++){let se=A[Y];if(m(se)){let te=x(w),j=n.get(se).__webglTexture;t.bindTexture(te,j),f(te),t.unbindTexture()}}}let Ke=[],L=[];function Dt(w){if(w.samples>0){if(qe(w)===!1){let A=w.textures,Y=w.width,$=w.height,se=i.COLOR_BUFFER_BIT,te=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,j=n.get(w),K=A.length>1;if(K)for(let ae=0;ae<A.length;ae++)t.bindFramebuffer(i.FRAMEBUFFER,j.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ae,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,j.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ae,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,j.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,j.__webglFramebuffer);for(let ae=0;ae<A.length;ae++){if(w.resolveDepthBuffer&&(w.depthBuffer&&(se|=i.DEPTH_BUFFER_BIT),w.stencilBuffer&&w.resolveStencilBuffer&&(se|=i.STENCIL_BUFFER_BIT)),K){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,j.__webglColorRenderbuffer[ae]);let Ee=n.get(A[ae]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Ee,0)}i.blitFramebuffer(0,0,Y,$,0,0,Y,$,se,i.NEAREST),l===!0&&(Ke.length=0,L.length=0,Ke.push(i.COLOR_ATTACHMENT0+ae),w.depthBuffer&&w.resolveDepthBuffer===!1&&(Ke.push(te),L.push(te),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,L)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Ke))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),K)for(let ae=0;ae<A.length;ae++){t.bindFramebuffer(i.FRAMEBUFFER,j.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ae,i.RENDERBUFFER,j.__webglColorRenderbuffer[ae]);let Ee=n.get(A[ae]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,j.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ae,i.TEXTURE_2D,Ee,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,j.__webglMultisampledFramebuffer)}else if(w.depthBuffer&&w.resolveDepthBuffer===!1&&l){let A=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[A])}}}function Be(w){return Math.min(s.maxSamples,w.samples)}function qe(w){let A=n.get(w);return w.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&A.__useRenderToTexture!==!1}function Fe(w){let A=a.render.frame;u.get(w)!==A&&(u.set(w,A),w.update())}function pe(w,A){let Y=w.colorSpace,$=w.format,se=w.type;return w.isCompressedTexture===!0||w.isVideoTexture===!0||Y!==Wt&&Y!==zn&&(pt.getTransfer(Y)===Ft?($!==kn||se!==kt)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",Y)),A}function ve(w){return typeof HTMLImageElement!="undefined"&&w instanceof HTMLImageElement?(c.width=w.naturalWidth||w.width,c.height=w.naturalHeight||w.height):typeof VideoFrame!="undefined"&&w instanceof VideoFrame?(c.width=w.displayWidth,c.height=w.displayHeight):(c.width=w.width,c.height=w.height),c}this.allocateTextureUnit=O,this.resetTextureUnits=U,this.setTexture2D=G,this.setTexture2DArray=N,this.setTexture3D=I,this.setTextureCube=P,this.rebindTextures=He,this.setupRenderTarget=Je,this.updateRenderTargetMipmap=We,this.updateMultisampleRenderTarget=Dt,this.setupDepthRenderbuffer=Ce,this.setupFrameBufferTexture=ie,this.useMultisampledRTT=qe}function Y1(i,e){function t(n,s=zn){let r,a=pt.getTransfer(s);if(n===kt)return i.UNSIGNED_BYTE;if(n===Io)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Lo)return i.UNSIGNED_SHORT_5_5_5_1;if(n===nu)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===eu)return i.BYTE;if(n===tu)return i.SHORT;if(n===Lr)return i.UNSIGNED_SHORT;if(n===Po)return i.INT;if(n===Di)return i.UNSIGNED_INT;if(n===On)return i.FLOAT;if(n===Fr)return i.HALF_FLOAT;if(n===iu)return i.ALPHA;if(n===su)return i.RGB;if(n===kn)return i.RGBA;if(n===ru)return i.LUMINANCE;if(n===au)return i.LUMINANCE_ALPHA;if(n===Ks)return i.DEPTH_COMPONENT;if(n===Vi)return i.DEPTH_STENCIL;if(n===Fo)return i.RED;if(n===Uo)return i.RED_INTEGER;if(n===ou)return i.RG;if(n===No)return i.RG_INTEGER;if(n===Bo)return i.RGBA_INTEGER;if(n===Ra||n===Da||n===Pa||n===Ia)if(a===Ft)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Ra)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Da)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Pa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Ia)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Ra)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Da)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Pa)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Ia)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Oo||n===ko||n===zo||n===Ho)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Oo)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===ko)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===zo)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Ho)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Go||n===Vo||n===Wo)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Go||n===Vo)return a===Ft?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Wo)return a===Ft?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Xo||n===Yo||n===Qo||n===qo||n===jo||n===Zo||n===Ko||n===Jo||n===$o||n===el||n===tl||n===nl||n===il||n===sl)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Xo)return a===Ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Yo)return a===Ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Qo)return a===Ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===qo)return a===Ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===jo)return a===Ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Zo)return a===Ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Ko)return a===Ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Jo)return a===Ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===$o)return a===Ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===el)return a===Ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===tl)return a===Ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===nl)return a===Ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===il)return a===Ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===sl)return a===Ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===La||n===rl||n===al)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===La)return a===Ft?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===rl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===al)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===lu||n===ol||n===ll||n===cl)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===La)return r.COMPRESSED_RED_RGTC1_EXT;if(n===ol)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===ll)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===cl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Gi?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}var Q1={type:"move"},pc=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ft,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ft,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new k,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new k),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ft,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new k,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new k),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(let v of e.hand.values()){let m=t.getJointPose(v,n),f=this._getHandJoint(c,v);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}let u=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],d=u.position.distanceTo(h.position),p=.02,g=.005;c.inputState.pinching&&d>p+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=p-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Q1)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new ft;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},q1=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,j1=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,lm=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){let s=new zt,r=e.properties.get(s);r.__webglTexture=t.texture,(t.depthNear!==n.depthNear||t.depthFar!==n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=s}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new Nt({vertexShader:q1,fragmentShader:j1,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Qt(new ta(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},cm=class extends Dn{constructor(e,t){super();let n=this,s=null,r=1,a=null,o="local-floor",l=1,c=null,u=null,h=null,d=null,p=null,g=null,v=new lm,m=t.getContextAttributes(),f=null,x=null,_=[],y=[],T=new Re,M=null,R=new qt;R.viewport=new yt;let C=new qt;C.viewport=new yt;let b=[R,C],S=new rh,D=null,U=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(X){let Z=_[X];return Z===void 0&&(Z=new pc,_[X]=Z),Z.getTargetRaySpace()},this.getControllerGrip=function(X){let Z=_[X];return Z===void 0&&(Z=new pc,_[X]=Z),Z.getGripSpace()},this.getHand=function(X){let Z=_[X];return Z===void 0&&(Z=new pc,_[X]=Z),Z.getHandSpace()};function O(X){let Z=y.indexOf(X.inputSource);if(Z===-1)return;let ie=_[Z];ie!==void 0&&(ie.update(X.inputSource,X.frame,c||a),ie.dispatchEvent({type:X.type,data:X.inputSource}))}function B(){s.removeEventListener("select",O),s.removeEventListener("selectstart",O),s.removeEventListener("selectend",O),s.removeEventListener("squeeze",O),s.removeEventListener("squeezestart",O),s.removeEventListener("squeezeend",O),s.removeEventListener("end",B),s.removeEventListener("inputsourceschange",G);for(let X=0;X<_.length;X++){let Z=y[X];Z!==null&&(y[X]=null,_[X].disconnect(Z))}D=null,U=null,v.reset(),e.setRenderTarget(f),p=null,d=null,h=null,s=null,x=null,ce.stop(),n.isPresenting=!1,e.setPixelRatio(M),e.setSize(T.width,T.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(X){r=X,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(X){o=X,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(X){c=X},this.getBaseLayer=function(){return d!==null?d:p},this.getBinding=function(){return h},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(X){if(s=X,s!==null){if(f=e.getRenderTarget(),s.addEventListener("select",O),s.addEventListener("selectstart",O),s.addEventListener("selectend",O),s.addEventListener("squeeze",O),s.addEventListener("squeezestart",O),s.addEventListener("squeezeend",O),s.addEventListener("end",B),s.addEventListener("inputsourceschange",G),m.xrCompatible!==!0&&await t.makeXRCompatible(),M=e.getPixelRatio(),e.getSize(T),s.enabledFeatures!==void 0&&s.enabledFeatures.includes("layers")){let ie=null,he=null,Le=null;m.depth&&(Le=m.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ie=m.stencil?Vi:Ks,he=m.stencil?Gi:Di);let Ce={colorFormat:t.RGBA8,depthFormat:Le,scaleFactor:r};h=new XRWebGLBinding(s,t),d=h.createProjectionLayer(Ce),s.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),x=new Ht(d.textureWidth,d.textureHeight,{format:kn,type:kt,depthTexture:new $r(d.textureWidth,d.textureHeight,he,void 0,void 0,void 0,void 0,void 0,void 0,ie),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}else{let ie={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,t,ie),s.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),x=new Ht(p.framebufferWidth,p.framebufferHeight,{format:kn,type:kt,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil})}x.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),ce.setContext(s),ce.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function G(X){for(let Z=0;Z<X.removed.length;Z++){let ie=X.removed[Z],he=y.indexOf(ie);he>=0&&(y[he]=null,_[he].disconnect(ie))}for(let Z=0;Z<X.added.length;Z++){let ie=X.added[Z],he=y.indexOf(ie);if(he===-1){for(let Ce=0;Ce<_.length;Ce++)if(Ce>=y.length){y.push(ie),he=Ce;break}else if(y[Ce]===null){y[Ce]=ie,he=Ce;break}if(he===-1)break}let Le=_[he];Le&&Le.connect(ie)}}let N=new k,I=new k;function P(X,Z,ie){N.setFromMatrixPosition(Z.matrixWorld),I.setFromMatrixPosition(ie.matrixWorld);let he=N.distanceTo(I),Le=Z.projectionMatrix.elements,Ce=ie.projectionMatrix.elements,He=Le[14]/(Le[10]-1),Je=Le[14]/(Le[10]+1),We=(Le[9]+1)/Le[5],Ke=(Le[9]-1)/Le[5],L=(Le[8]-1)/Le[0],Dt=(Ce[8]+1)/Ce[0],Be=He*L,qe=He*Dt,Fe=he/(-L+Dt),pe=Fe*-L;if(Z.matrixWorld.decompose(X.position,X.quaternion,X.scale),X.translateX(pe),X.translateZ(Fe),X.matrixWorld.compose(X.position,X.quaternion,X.scale),X.matrixWorldInverse.copy(X.matrixWorld).invert(),Le[10]===-1)X.projectionMatrix.copy(Z.projectionMatrix),X.projectionMatrixInverse.copy(Z.projectionMatrixInverse);else{let ve=He+Fe,w=Je+Fe,A=Be-pe,Y=qe+(he-pe),$=We*Je/w*ve,se=Ke*Je/w*ve;X.projectionMatrix.makePerspective(A,Y,$,se,ve,w),X.projectionMatrixInverse.copy(X.projectionMatrix).invert()}}function F(X,Z){Z===null?X.matrixWorld.copy(X.matrix):X.matrixWorld.multiplyMatrices(Z.matrixWorld,X.matrix),X.matrixWorldInverse.copy(X.matrixWorld).invert()}this.updateCamera=function(X){if(s===null)return;let Z=X.near,ie=X.far;v.texture!==null&&(v.depthNear>0&&(Z=v.depthNear),v.depthFar>0&&(ie=v.depthFar)),S.near=C.near=R.near=Z,S.far=C.far=R.far=ie,(D!==S.near||U!==S.far)&&(s.updateRenderState({depthNear:S.near,depthFar:S.far}),D=S.near,U=S.far),R.layers.mask=X.layers.mask|2,C.layers.mask=X.layers.mask|4,S.layers.mask=R.layers.mask|C.layers.mask;let he=X.parent,Le=S.cameras;F(S,he);for(let Ce=0;Ce<Le.length;Ce++)F(Le[Ce],he);Le.length===2?P(S,R,C):S.projectionMatrix.copy(R.projectionMatrix),J(X,S,he)};function J(X,Z,ie){ie===null?X.matrix.copy(Z.matrixWorld):(X.matrix.copy(ie.matrixWorld),X.matrix.invert(),X.matrix.multiply(Z.matrixWorld)),X.matrix.decompose(X.position,X.quaternion,X.scale),X.updateMatrixWorld(!0),X.projectionMatrix.copy(Z.projectionMatrix),X.projectionMatrixInverse.copy(Z.projectionMatrixInverse),X.isPerspectiveCamera&&(X.fov=tr*2*Math.atan(1/X.projectionMatrix.elements[5]),X.zoom=1)}this.getCamera=function(){return S},this.getFoveation=function(){if(!(d===null&&p===null))return l},this.setFoveation=function(X){l=X,d!==null&&(d.fixedFoveation=X),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=X)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(S)};let oe=null;function _e(X,Z){if(u=Z.getViewerPose(c||a),g=Z,u!==null){let ie=u.views;p!==null&&(e.setRenderTargetFramebuffer(x,p.framebuffer),e.setRenderTarget(x));let he=!1;ie.length!==S.cameras.length&&(S.cameras.length=0,he=!0);for(let Ce=0;Ce<ie.length;Ce++){let He=ie[Ce],Je=null;if(p!==null)Je=p.getViewport(He);else{let Ke=h.getViewSubImage(d,He);Je=Ke.viewport,Ce===0&&(e.setRenderTargetTextures(x,Ke.colorTexture,d.ignoreDepthValues?void 0:Ke.depthStencilTexture),e.setRenderTarget(x))}let We=b[Ce];We===void 0&&(We=new qt,We.layers.enable(Ce),We.viewport=new yt,b[Ce]=We),We.matrix.fromArray(He.transform.matrix),We.matrix.decompose(We.position,We.quaternion,We.scale),We.projectionMatrix.fromArray(He.projectionMatrix),We.projectionMatrixInverse.copy(We.projectionMatrix).invert(),We.viewport.set(Je.x,Je.y,Je.width,Je.height),Ce===0&&(S.matrix.copy(We.matrix),S.matrix.decompose(S.position,S.quaternion,S.scale)),he===!0&&S.cameras.push(We)}let Le=s.enabledFeatures;if(Le&&Le.includes("depth-sensing")){let Ce=h.getDepthInformation(ie[0]);Ce&&Ce.isValid&&Ce.texture&&v.init(e,Ce,s.renderState)}}for(let ie=0;ie<_.length;ie++){let he=y[ie],Le=_[ie];he!==null&&Le!==void 0&&Le.update(he,Z,c||a)}oe&&oe(X,Z),Z.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Z}),g=null}let ce=new Rp;ce.setAnimationLoop(_e),this.setAnimationLoop=function(X){oe=X},this.dispose=function(){}}},mr=new ti,Z1=new Ze;function K1(i,e){function t(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function n(m,f){f.color.getRGB(m.fogColor.value,Gu(i)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function s(m,f,x,_,y){f.isMeshBasicMaterial||f.isMeshLambertMaterial?r(m,f):f.isMeshToonMaterial?(r(m,f),h(m,f)):f.isMeshPhongMaterial?(r(m,f),u(m,f)):f.isMeshStandardMaterial?(r(m,f),d(m,f),f.isMeshPhysicalMaterial&&p(m,f,y)):f.isMeshMatcapMaterial?(r(m,f),g(m,f)):f.isMeshDepthMaterial?r(m,f):f.isMeshDistanceMaterial?(r(m,f),v(m,f)):f.isMeshNormalMaterial?r(m,f):f.isLineBasicMaterial?(a(m,f),f.isLineDashedMaterial&&o(m,f)):f.isPointsMaterial?l(m,f,x,_):f.isSpriteMaterial?c(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,t(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===sn&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,t(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===sn&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,t(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,t(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,t(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);let x=e.get(f),_=x.envMap,y=x.envMapRotation;_&&(m.envMap.value=_,mr.copy(y),mr.x*=-1,mr.y*=-1,mr.z*=-1,_.isCubeTexture&&_.isRenderTargetTexture===!1&&(mr.y*=-1,mr.z*=-1),m.envMapRotation.value.setFromMatrix4(Z1.makeRotationFromEuler(mr)),m.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap&&(m.lightMap.value=f.lightMap,m.lightMapIntensity.value=f.lightMapIntensity,t(f.lightMap,m.lightMapTransform)),f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,t(f.aoMap,m.aoMapTransform))}function a(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform))}function o(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function l(m,f,x,_){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*x,m.scale.value=_*.5,f.map&&(m.map.value=f.map,t(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function c(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function u(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function h(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function d(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,t(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,t(f.roughnessMap,m.roughnessMapTransform)),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,x){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,t(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,t(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,t(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,t(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,t(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===sn&&m.clearcoatNormalScale.value.negate())),f.dispersion>0&&(m.dispersion.value=f.dispersion),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,t(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,t(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=x.texture,m.transmissionSamplerSize.value.set(x.width,x.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,t(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,t(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,t(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,t(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,t(f.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,f){f.matcap&&(m.matcap.value=f.matcap)}function v(m,f){let x=e.get(f).light;m.referencePosition.value.setFromMatrixPosition(x.matrixWorld),m.nearDistance.value=x.shadow.camera.near,m.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function J1(i,e,t,n){let s={},r={},a=[],o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(x,_){let y=_.program;n.uniformBlockBinding(x,y)}function c(x,_){let y=s[x.id];y===void 0&&(g(x),y=u(x),s[x.id]=y,x.addEventListener("dispose",m));let T=_.program;n.updateUBOMapping(x,T);let M=e.render.frame;r[x.id]!==M&&(d(x),r[x.id]=M)}function u(x){let _=h();x.__bindingPointIndex=_;let y=i.createBuffer(),T=x.__size,M=x.usage;return i.bindBuffer(i.UNIFORM_BUFFER,y),i.bufferData(i.UNIFORM_BUFFER,T,M),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,_,y),y}function h(){for(let x=0;x<o;x++)if(a.indexOf(x)===-1)return a.push(x),x;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(x){let _=s[x.id],y=x.uniforms,T=x.__cache;i.bindBuffer(i.UNIFORM_BUFFER,_);for(let M=0,R=y.length;M<R;M++){let C=Array.isArray(y[M])?y[M]:[y[M]];for(let b=0,S=C.length;b<S;b++){let D=C[b];if(p(D,M,b,T)===!0){let U=D.__offset,O=Array.isArray(D.value)?D.value:[D.value],B=0;for(let G=0;G<O.length;G++){let N=O[G],I=v(N);typeof N=="number"||typeof N=="boolean"?(D.__data[0]=N,i.bufferSubData(i.UNIFORM_BUFFER,U+B,D.__data)):N.isMatrix3?(D.__data[0]=N.elements[0],D.__data[1]=N.elements[1],D.__data[2]=N.elements[2],D.__data[3]=0,D.__data[4]=N.elements[3],D.__data[5]=N.elements[4],D.__data[6]=N.elements[5],D.__data[7]=0,D.__data[8]=N.elements[6],D.__data[9]=N.elements[7],D.__data[10]=N.elements[8],D.__data[11]=0):(N.toArray(D.__data,B),B+=I.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,U,D.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function p(x,_,y,T){let M=x.value,R=_+"_"+y;if(T[R]===void 0)return typeof M=="number"||typeof M=="boolean"?T[R]=M:T[R]=M.clone(),!0;{let C=T[R];if(typeof M=="number"||typeof M=="boolean"){if(C!==M)return T[R]=M,!0}else if(C.equals(M)===!1)return C.copy(M),!0}return!1}function g(x){let _=x.uniforms,y=0,T=16;for(let R=0,C=_.length;R<C;R++){let b=Array.isArray(_[R])?_[R]:[_[R]];for(let S=0,D=b.length;S<D;S++){let U=b[S],O=Array.isArray(U.value)?U.value:[U.value];for(let B=0,G=O.length;B<G;B++){let N=O[B],I=v(N),P=y%T,F=P%I.boundary,J=P+F;y+=F,J!==0&&T-J<I.storage&&(y+=T-J),U.__data=new Float32Array(I.storage/Float32Array.BYTES_PER_ELEMENT),U.__offset=y,y+=I.storage}}}let M=y%T;return M>0&&(y+=T-M),x.__size=y,x.__cache={},this}function v(x){let _={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(_.boundary=4,_.storage=4):x.isVector2?(_.boundary=8,_.storage=8):x.isVector3||x.isColor?(_.boundary=16,_.storage=12):x.isVector4?(_.boundary=16,_.storage=16):x.isMatrix3?(_.boundary=48,_.storage=48):x.isMatrix4?(_.boundary=64,_.storage=64):x.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",x),_}function m(x){let _=x.target;_.removeEventListener("dispose",m);let y=a.indexOf(_.__bindingPointIndex);a.splice(y,1),i.deleteBuffer(s[_.id]),delete s[_.id],delete r[_.id]}function f(){for(let x in s)i.deleteBuffer(s[x]);a=[],s={},r={}}return{bind:l,update:c,dispose:f}}var to=class{constructor(e={}){let{canvas:t=Pf(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reverseDepthBuffer:d=!1}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext!="undefined"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=a;let g=new Uint32Array(4),v=new Int32Array(4),m=null,f=null,x=[],_=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=nt,this.toneMapping=Hi,this.toneMappingExposure=1;let y=this,T=!1,M=0,R=0,C=null,b=-1,S=null,D=new yt,U=new yt,O=null,B=new ye(0),G=0,N=t.width,I=t.height,P=1,F=null,J=null,oe=new yt(0,0,N,I),_e=new yt(0,0,N,I),ce=!1,X=new qa,Z=!1,ie=!1;this.transmissionResolutionScale=1;let he=new Ze,Le=new Ze,Ce=new k,He=new yt,Je={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},We=!1;function Ke(){return C===null?P:1}let L=n;function Dt(E,H){return t.getContext(E,H)}try{let E={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${wi}`),t.addEventListener("webglcontextlost",ue,!1),t.addEventListener("webglcontextrestored",Te,!1),t.addEventListener("webglcontextcreationerror",Se,!1),L===null){let H="webgl2";if(L=Dt(H,E),L===null)throw Dt(H)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(E){throw console.error("THREE.WebGLRenderer: "+E.message),E}let Be,qe,Fe,pe,ve,w,A,Y,$,se,te,j,K,ae,Ee,re,me,Ue,Qe,Me,Ne,Ge,Pt,z;function le(){Be=new m_(L),Be.init(),Ge=new Y1(L,Be),qe=new c_(L,Be,e,Ge),Fe=new W1(L,Be),qe.reverseDepthBuffer&&d&&Fe.buffers.depth.setReversed(!0),pe=new x_(L),ve=new P1,w=new X1(L,Be,Fe,ve,qe,Ge,pe),A=new h_(y),Y=new p_(y),$=new Tx(L),Pt=new o_(L,$),se=new g_(L,$,pe,Pt),te=new A_(L,se,$,pe),Qe=new y_(L,qe,w),re=new u_(ve),j=new D1(y,A,Y,Be,qe,Pt,re),K=new K1(y,ve),ae=new L1,Ee=new k1(Be),Ue=new a_(y,A,Y,Fe,te,p,l),me=new G1(y,te,qe),z=new J1(L,pe,qe,Fe),Me=new l_(L,Be,pe),Ne=new v_(L,Be,pe),pe.programs=j.programs,y.capabilities=qe,y.extensions=Be,y.properties=ve,y.renderLists=ae,y.shadowMap=me,y.state=Fe,y.info=pe}le();let ee=new cm(y,L);this.xr=ee,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){let E=Be.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){let E=Be.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return P},this.setPixelRatio=function(E){E!==void 0&&(P=E,this.setSize(N,I,!1))},this.getSize=function(E){return E.set(N,I)},this.setSize=function(E,H,Q=!0){if(ee.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}N=E,I=H,t.width=Math.floor(E*P),t.height=Math.floor(H*P),Q===!0&&(t.style.width=E+"px",t.style.height=H+"px"),this.setViewport(0,0,E,H)},this.getDrawingBufferSize=function(E){return E.set(N*P,I*P).floor()},this.setDrawingBufferSize=function(E,H,Q){N=E,I=H,P=Q,t.width=Math.floor(E*Q),t.height=Math.floor(H*Q),this.setViewport(0,0,E,H)},this.getCurrentViewport=function(E){return E.copy(D)},this.getViewport=function(E){return E.copy(oe)},this.setViewport=function(E,H,Q,q){E.isVector4?oe.set(E.x,E.y,E.z,E.w):oe.set(E,H,Q,q),Fe.viewport(D.copy(oe).multiplyScalar(P).round())},this.getScissor=function(E){return E.copy(_e)},this.setScissor=function(E,H,Q,q){E.isVector4?_e.set(E.x,E.y,E.z,E.w):_e.set(E,H,Q,q),Fe.scissor(U.copy(_e).multiplyScalar(P).round())},this.getScissorTest=function(){return ce},this.setScissorTest=function(E){Fe.setScissorTest(ce=E)},this.setOpaqueSort=function(E){F=E},this.setTransparentSort=function(E){J=E},this.getClearColor=function(E){return E.copy(Ue.getClearColor())},this.setClearColor=function(){Ue.setClearColor.apply(Ue,arguments)},this.getClearAlpha=function(){return Ue.getClearAlpha()},this.setClearAlpha=function(){Ue.setClearAlpha.apply(Ue,arguments)},this.clear=function(E=!0,H=!0,Q=!0){let q=0;if(E){let W=!1;if(C!==null){let de=C.texture.format;W=de===Bo||de===No||de===Uo}if(W){let de=C.texture.type,xe=de===kt||de===Di||de===Lr||de===Gi||de===Io||de===Lo,we=Ue.getClearColor(),be=Ue.getClearAlpha(),tt=we.r,it=we.g,Ye=we.b;xe?(g[0]=tt,g[1]=it,g[2]=Ye,g[3]=be,L.clearBufferuiv(L.COLOR,0,g)):(v[0]=tt,v[1]=it,v[2]=Ye,v[3]=be,L.clearBufferiv(L.COLOR,0,v))}else q|=L.COLOR_BUFFER_BIT}H&&(q|=L.DEPTH_BUFFER_BIT),Q&&(q|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),L.clear(q)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ue,!1),t.removeEventListener("webglcontextrestored",Te,!1),t.removeEventListener("webglcontextcreationerror",Se,!1),Ue.dispose(),ae.dispose(),Ee.dispose(),ve.dispose(),A.dispose(),Y.dispose(),te.dispose(),Pt.dispose(),z.dispose(),j.dispose(),ee.dispose(),ee.removeEventListener("sessionstart",Cn),ee.removeEventListener("sessionend",gs),Mi.stop()};function ue(E){E.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),T=!0}function Te(){console.log("THREE.WebGLRenderer: Context Restored."),T=!1;let E=pe.autoReset,H=me.enabled,Q=me.autoUpdate,q=me.needsUpdate,W=me.type;le(),pe.autoReset=E,me.enabled=H,me.autoUpdate=Q,me.needsUpdate=q,me.type=W}function Se(E){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function $e(E){let H=E.target;H.removeEventListener("dispose",$e),Bt(H)}function Bt(E){cn(E),ve.remove(E)}function cn(E){let H=ve.get(E).programs;H!==void 0&&(H.forEach(function(Q){j.releaseProgram(Q)}),E.isShaderMaterial&&j.releaseShaderCache(E))}this.renderBufferDirect=function(E,H,Q,q,W,de){H===null&&(H=Je);let xe=W.isMesh&&W.matrixWorld.determinant()<0,we=Et(E,H,Q,q,W);Fe.setMaterial(q,xe);let be=Q.index,tt=1;if(q.wireframe===!0){if(be=se.getWireframeAttribute(Q),be===void 0)return;tt=2}let it=Q.drawRange,Ye=Q.attributes.position,xt=it.start*tt,_t=(it.start+it.count)*tt;de!==null&&(xt=Math.max(xt,de.start*tt),_t=Math.min(_t,(de.start+de.count)*tt)),be!==null?(xt=Math.max(xt,0),_t=Math.min(_t,be.count)):Ye!=null&&(xt=Math.max(xt,0),_t=Math.min(_t,Ye.count));let ke=_t-xt;if(ke<0||ke===1/0)return;Pt.setup(W,q,we,Q,be);let ut,dt=Me;if(be!==null&&(ut=$.get(be),dt=Ne,dt.setIndex(ut)),W.isMesh)q.wireframe===!0?(Fe.setLineWidth(q.wireframeLinewidth*Ke()),dt.setMode(L.LINES)):dt.setMode(L.TRIANGLES);else if(W.isLine){let je=q.linewidth;je===void 0&&(je=1),Fe.setLineWidth(je*Ke()),W.isLineSegments?dt.setMode(L.LINES):W.isLineLoop?dt.setMode(L.LINE_LOOP):dt.setMode(L.LINE_STRIP)}else W.isPoints?dt.setMode(L.POINTS):W.isSprite&&dt.setMode(L.TRIANGLES);if(W.isBatchedMesh)if(W._multiDrawInstances!==null)dt.renderMultiDrawInstances(W._multiDrawStarts,W._multiDrawCounts,W._multiDrawCount,W._multiDrawInstances);else if(Be.get("WEBGL_multi_draw"))dt.renderMultiDraw(W._multiDrawStarts,W._multiDrawCounts,W._multiDrawCount);else{let je=W._multiDrawStarts,fn=W._multiDrawCounts,It=W._multiDrawCount,fi=be?$.get(be).bytesPerElement:1,Dr=ve.get(q).currentProgram.getUniforms();for(let Nn=0;Nn<It;Nn++)Dr.setValue(L,"_gl_DrawID",Nn),dt.render(je[Nn]/fi,fn[Nn])}else if(W.isInstancedMesh)dt.renderInstances(xt,ke,W.count);else if(Q.isInstancedBufferGeometry){let je=Q._maxInstanceCount!==void 0?Q._maxInstanceCount:1/0,fn=Math.min(Q.instanceCount,je);dt.renderInstances(xt,ke,fn)}else dt.render(xt,ke)};function bt(E,H,Q){E.transparent===!0&&E.side===pn&&E.forceSinglePass===!1?(E.side=sn,E.needsUpdate=!0,ne(E,H,Q),E.side=Bn,E.needsUpdate=!0,ne(E,H,Q),E.side=pn):ne(E,H,Q)}this.compile=function(E,H,Q=null){Q===null&&(Q=E),f=Ee.get(Q),f.init(H),_.push(f),Q.traverseVisible(function(W){W.isLight&&W.layers.test(H.layers)&&(f.pushLight(W),W.castShadow&&f.pushShadow(W))}),E!==Q&&E.traverseVisible(function(W){W.isLight&&W.layers.test(H.layers)&&(f.pushLight(W),W.castShadow&&f.pushShadow(W))}),f.setupLights();let q=new Set;return E.traverse(function(W){if(!(W.isMesh||W.isPoints||W.isLine||W.isSprite))return;let de=W.material;if(de)if(Array.isArray(de))for(let xe=0;xe<de.length;xe++){let we=de[xe];bt(we,Q,W),q.add(we)}else bt(de,Q,W),q.add(de)}),_.pop(),f=null,q},this.compileAsync=function(E,H,Q=null){let q=this.compile(E,H,Q);return new Promise(W=>{function de(){if(q.forEach(function(xe){ve.get(xe).currentProgram.isReady()&&q.delete(xe)}),q.size===0){W(E);return}setTimeout(de,10)}Be.get("KHR_parallel_shader_compile")!==null?de():setTimeout(de,10)})};let Sn=null;function bn(E){Sn&&Sn(E)}function Cn(){Mi.stop()}function gs(){Mi.start()}let Mi=new Rp;Mi.setAnimationLoop(bn),typeof self!="undefined"&&Mi.setContext(self),this.setAnimationLoop=function(E){Sn=E,ee.setAnimationLoop(E),E===null?Mi.stop():Mi.start()},ee.addEventListener("sessionstart",Cn),ee.addEventListener("sessionend",gs),this.render=function(E,H){if(H!==void 0&&H.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(T===!0)return;if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),H.parent===null&&H.matrixWorldAutoUpdate===!0&&H.updateMatrixWorld(),ee.enabled===!0&&ee.isPresenting===!0&&(ee.cameraAutoUpdate===!0&&ee.updateCamera(H),H=ee.getCamera()),E.isScene===!0&&E.onBeforeRender(y,E,H,C),f=Ee.get(E,_.length),f.init(H),_.push(f),Le.multiplyMatrices(H.projectionMatrix,H.matrixWorldInverse),X.setFromProjectionMatrix(Le),ie=this.localClippingEnabled,Z=re.init(this.clippingPlanes,ie),m=ae.get(E,x.length),m.init(),x.push(m),ee.enabled===!0&&ee.isPresenting===!0){let de=y.xr.getDepthSensingMesh();de!==null&&Gs(de,H,-1/0,y.sortObjects)}Gs(E,H,0,y.sortObjects),m.finish(),y.sortObjects===!0&&m.sort(F,J),We=ee.enabled===!1||ee.isPresenting===!1||ee.hasDepthSensing()===!1,We&&Ue.addToRenderList(m,E),this.info.render.frame++,Z===!0&&re.beginShadows();let Q=f.state.shadowsArray;me.render(Q,E,H),Z===!0&&re.endShadows(),this.info.autoReset===!0&&this.info.reset();let q=m.opaque,W=m.transmissive;if(f.setupLights(),H.isArrayCamera){let de=H.cameras;if(W.length>0)for(let xe=0,we=de.length;xe<we;xe++){let be=de[xe];Ma(q,W,E,be)}We&&Ue.render(E);for(let xe=0,we=de.length;xe<we;xe++){let be=de[xe];Vs(m,E,be,be.viewport)}}else W.length>0&&Ma(q,W,E,H),We&&Ue.render(E),Vs(m,E,H);C!==null&&R===0&&(w.updateMultisampleRenderTarget(C),w.updateRenderTargetMipmap(C)),E.isScene===!0&&E.onAfterRender(y,E,H),Pt.resetDefaultState(),b=-1,S=null,_.pop(),_.length>0?(f=_[_.length-1],Z===!0&&re.setGlobalState(y.clippingPlanes,f.state.camera)):f=null,x.pop(),x.length>0?m=x[x.length-1]:m=null};function Gs(E,H,Q,q){if(E.visible===!1)return;if(E.layers.test(H.layers)){if(E.isGroup)Q=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(H);else if(E.isLight)f.pushLight(E),E.castShadow&&f.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||X.intersectsSprite(E)){q&&He.setFromMatrixPosition(E.matrixWorld).applyMatrix4(Le);let xe=te.update(E),we=E.material;we.visible&&m.push(E,xe,we,Q,He.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||X.intersectsObject(E))){let xe=te.update(E),we=E.material;if(q&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),He.copy(E.boundingSphere.center)):(xe.boundingSphere===null&&xe.computeBoundingSphere(),He.copy(xe.boundingSphere.center)),He.applyMatrix4(E.matrixWorld).applyMatrix4(Le)),Array.isArray(we)){let be=xe.groups;for(let tt=0,it=be.length;tt<it;tt++){let Ye=be[tt],xt=we[Ye.materialIndex];xt&&xt.visible&&m.push(E,xe,xt,Q,He.z,Ye)}}else we.visible&&m.push(E,xe,we,Q,He.z,null)}}let de=E.children;for(let xe=0,we=de.length;xe<we;xe++)Gs(de[xe],H,Q,q)}function Vs(E,H,Q,q){let W=E.opaque,de=E.transmissive,xe=E.transparent;f.setupLightsView(Q),Z===!0&&re.setGlobalState(y.clippingPlanes,Q),q&&Fe.viewport(D.copy(q)),W.length>0&&Ws(W,H,Q),de.length>0&&Ws(de,H,Q),xe.length>0&&Ws(xe,H,Q),Fe.buffers.depth.setTest(!0),Fe.buffers.depth.setMask(!0),Fe.buffers.color.setMask(!0),Fe.setPolygonOffset(!1)}function Ma(E,H,Q,q){if((Q.isScene===!0?Q.overrideMaterial:null)!==null)return;f.state.transmissionRenderTarget[q.id]===void 0&&(f.state.transmissionRenderTarget[q.id]=new Ht(1,1,{generateMipmaps:!0,type:Be.has("EXT_color_buffer_half_float")||Be.has("EXT_color_buffer_float")?Fr:kt,minFilter:pi,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:pt.workingColorSpace}));let de=f.state.transmissionRenderTarget[q.id],xe=q.viewport||D;de.setSize(xe.z*y.transmissionResolutionScale,xe.w*y.transmissionResolutionScale);let we=y.getRenderTarget();y.setRenderTarget(de),y.getClearColor(B),G=y.getClearAlpha(),G<1&&y.setClearColor(16777215,.5),y.clear(),We&&Ue.render(Q);let be=y.toneMapping;y.toneMapping=Hi;let tt=q.viewport;if(q.viewport!==void 0&&(q.viewport=void 0),f.setupLightsView(q),Z===!0&&re.setGlobalState(y.clippingPlanes,q),Ws(E,Q,q),w.updateMultisampleRenderTarget(de),w.updateRenderTargetMipmap(de),Be.has("WEBGL_multisampled_render_to_texture")===!1){let it=!1;for(let Ye=0,xt=H.length;Ye<xt;Ye++){let _t=H[Ye],ke=_t.object,ut=_t.geometry,dt=_t.material,je=_t.group;if(dt.side===pn&&ke.layers.test(q.layers)){let fn=dt.side;dt.side=sn,dt.needsUpdate=!0,Vc(ke,Q,q,ut,dt,je),dt.side=fn,dt.needsUpdate=!0,it=!0}}it===!0&&(w.updateMultisampleRenderTarget(de),w.updateRenderTargetMipmap(de))}y.setRenderTarget(we),y.setClearColor(B,G),tt!==void 0&&(q.viewport=tt),y.toneMapping=be}function Ws(E,H,Q){let q=H.isScene===!0?H.overrideMaterial:null;for(let W=0,de=E.length;W<de;W++){let xe=E[W],we=xe.object,be=xe.geometry,tt=q===null?xe.material:q,it=xe.group;we.layers.test(Q.layers)&&Vc(we,H,Q,be,tt,it)}}function Vc(E,H,Q,q,W,de){E.onBeforeRender(y,H,Q,q,W,de),E.modelViewMatrix.multiplyMatrices(Q.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),W.onBeforeRender(y,H,Q,q,E,de),W.transparent===!0&&W.side===pn&&W.forceSinglePass===!1?(W.side=sn,W.needsUpdate=!0,y.renderBufferDirect(Q,H,q,W,E,de),W.side=Bn,W.needsUpdate=!0,y.renderBufferDirect(Q,H,q,W,E,de),W.side=pn):y.renderBufferDirect(Q,H,q,W,E,de),E.onAfterRender(y,H,Q,q,W,de)}function ne(E,H,Q){H.isScene!==!0&&(H=Je);let q=ve.get(E),W=f.state.lights,de=f.state.shadowsArray,xe=W.state.version,we=j.getParameters(E,W.state,de,H,Q),be=j.getProgramCacheKey(we),tt=q.programs;q.environment=E.isMeshStandardMaterial?H.environment:null,q.fog=H.fog,q.envMap=(E.isMeshStandardMaterial?Y:A).get(E.envMap||q.environment),q.envMapRotation=q.environment!==null&&E.envMap===null?H.environmentRotation:E.envMapRotation,tt===void 0&&(E.addEventListener("dispose",$e),tt=new Map,q.programs=tt);let it=tt.get(be);if(it!==void 0){if(q.currentProgram===it&&q.lightsStateVersion===xe)return at(E,we),it}else we.uniforms=j.getUniforms(E),E.onBeforeCompile(we,y),it=j.acquireProgram(we,be),tt.set(be,it),q.uniforms=we.uniforms;let Ye=q.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(Ye.clippingPlanes=re.uniform),at(E,we),q.needsLights=vn(E),q.lightsStateVersion=xe,q.needsLights&&(Ye.ambientLightColor.value=W.state.ambient,Ye.lightProbe.value=W.state.probe,Ye.directionalLights.value=W.state.directional,Ye.directionalLightShadows.value=W.state.directionalShadow,Ye.spotLights.value=W.state.spot,Ye.spotLightShadows.value=W.state.spotShadow,Ye.rectAreaLights.value=W.state.rectArea,Ye.ltc_1.value=W.state.rectAreaLTC1,Ye.ltc_2.value=W.state.rectAreaLTC2,Ye.pointLights.value=W.state.point,Ye.pointLightShadows.value=W.state.pointShadow,Ye.hemisphereLights.value=W.state.hemi,Ye.directionalShadowMap.value=W.state.directionalShadowMap,Ye.directionalShadowMatrix.value=W.state.directionalShadowMatrix,Ye.spotShadowMap.value=W.state.spotShadowMap,Ye.spotLightMatrix.value=W.state.spotLightMatrix,Ye.spotLightMap.value=W.state.spotLightMap,Ye.pointShadowMap.value=W.state.pointShadowMap,Ye.pointShadowMatrix.value=W.state.pointShadowMatrix),q.currentProgram=it,q.uniformsList=null,it}function fe(E){if(E.uniformsList===null){let H=E.currentProgram.getUniforms();E.uniformsList=$a.seqWithValue(H.seq,E.uniforms)}return E.uniformsList}function at(E,H){let Q=ve.get(E);Q.outputColorSpace=H.outputColorSpace,Q.batching=H.batching,Q.batchingColor=H.batchingColor,Q.instancing=H.instancing,Q.instancingColor=H.instancingColor,Q.instancingMorph=H.instancingMorph,Q.skinning=H.skinning,Q.morphTargets=H.morphTargets,Q.morphNormals=H.morphNormals,Q.morphColors=H.morphColors,Q.morphTargetsCount=H.morphTargetsCount,Q.numClippingPlanes=H.numClippingPlanes,Q.numIntersection=H.numClipIntersection,Q.vertexAlphas=H.vertexAlphas,Q.vertexTangents=H.vertexTangents,Q.toneMapping=H.toneMapping}function Et(E,H,Q,q,W){H.isScene!==!0&&(H=Je),w.resetTextureUnits();let de=H.fog,xe=q.isMeshStandardMaterial?H.environment:null,we=C===null?y.outputColorSpace:C.isXRRenderTarget===!0?C.texture.colorSpace:Wt,be=(q.isMeshStandardMaterial?Y:A).get(q.envMap||xe),tt=q.vertexColors===!0&&!!Q.attributes.color&&Q.attributes.color.itemSize===4,it=!!Q.attributes.tangent&&(!!q.normalMap||q.anisotropy>0),Ye=!!Q.morphAttributes.position,xt=!!Q.morphAttributes.normal,_t=!!Q.morphAttributes.color,ke=Hi;q.toneMapped&&(C===null||C.isXRRenderTarget===!0)&&(ke=y.toneMapping);let ut=Q.morphAttributes.position||Q.morphAttributes.normal||Q.morphAttributes.color,dt=ut!==void 0?ut.length:0,je=ve.get(q),fn=f.state.lights;if(Z===!0&&(ie===!0||E!==S)){let En=E===S&&q.id===b;re.setState(q,E,En)}let It=!1;q.version===je.__version?(je.needsLights&&je.lightsStateVersion!==fn.state.version||je.outputColorSpace!==we||W.isBatchedMesh&&je.batching===!1||!W.isBatchedMesh&&je.batching===!0||W.isBatchedMesh&&je.batchingColor===!0&&W.colorTexture===null||W.isBatchedMesh&&je.batchingColor===!1&&W.colorTexture!==null||W.isInstancedMesh&&je.instancing===!1||!W.isInstancedMesh&&je.instancing===!0||W.isSkinnedMesh&&je.skinning===!1||!W.isSkinnedMesh&&je.skinning===!0||W.isInstancedMesh&&je.instancingColor===!0&&W.instanceColor===null||W.isInstancedMesh&&je.instancingColor===!1&&W.instanceColor!==null||W.isInstancedMesh&&je.instancingMorph===!0&&W.morphTexture===null||W.isInstancedMesh&&je.instancingMorph===!1&&W.morphTexture!==null||je.envMap!==be||q.fog===!0&&je.fog!==de||je.numClippingPlanes!==void 0&&(je.numClippingPlanes!==re.numPlanes||je.numIntersection!==re.numIntersection)||je.vertexAlphas!==tt||je.vertexTangents!==it||je.morphTargets!==Ye||je.morphNormals!==xt||je.morphColors!==_t||je.toneMapping!==ke||je.morphTargetsCount!==dt)&&(It=!0):(It=!0,je.__version=q.version);let fi=je.currentProgram;It===!0&&(fi=ne(q,H,W));let Dr=!1,Nn=!1,wa=!1,Vt=fi.getUniforms(),Jn=je.uniforms;if(Fe.useProgram(fi.program)&&(Dr=!0,Nn=!0,wa=!0),q.id!==b&&(b=q.id,Nn=!0),Dr||S!==E){Fe.buffers.depth.getReversed()?(he.copy(E.projectionMatrix),Ff(he),Uf(he),Vt.setValue(L,"projectionMatrix",he)):Vt.setValue(L,"projectionMatrix",E.projectionMatrix),Vt.setValue(L,"viewMatrix",E.matrixWorldInverse);let Rn=Vt.map.cameraPosition;Rn!==void 0&&Rn.setValue(L,Ce.setFromMatrixPosition(E.matrixWorld)),qe.logarithmicDepthBuffer&&Vt.setValue(L,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(q.isMeshPhongMaterial||q.isMeshToonMaterial||q.isMeshLambertMaterial||q.isMeshBasicMaterial||q.isMeshStandardMaterial||q.isShaderMaterial)&&Vt.setValue(L,"isOrthographic",E.isOrthographicCamera===!0),S!==E&&(S=E,Nn=!0,wa=!0)}if(W.isSkinnedMesh){Vt.setOptional(L,W,"bindMatrix"),Vt.setOptional(L,W,"bindMatrixInverse");let En=W.skeleton;En&&(En.boneTexture===null&&En.computeBoneTexture(),Vt.setValue(L,"boneTexture",En.boneTexture,w))}W.isBatchedMesh&&(Vt.setOptional(L,W,"batchingTexture"),Vt.setValue(L,"batchingTexture",W._matricesTexture,w),Vt.setOptional(L,W,"batchingIdTexture"),Vt.setValue(L,"batchingIdTexture",W._indirectTexture,w),Vt.setOptional(L,W,"batchingColorTexture"),W._colorsTexture!==null&&Vt.setValue(L,"batchingColorTexture",W._colorsTexture,w));let $n=Q.morphAttributes;if(($n.position!==void 0||$n.normal!==void 0||$n.color!==void 0)&&Qe.update(W,Q,fi),(Nn||je.receiveShadow!==W.receiveShadow)&&(je.receiveShadow=W.receiveShadow,Vt.setValue(L,"receiveShadow",W.receiveShadow)),q.isMeshGouraudMaterial&&q.envMap!==null&&(Jn.envMap.value=be,Jn.flipEnvMap.value=be.isCubeTexture&&be.isRenderTargetTexture===!1?-1:1),q.isMeshStandardMaterial&&q.envMap===null&&H.environment!==null&&(Jn.envMapIntensity.value=H.environmentIntensity),Nn&&(Vt.setValue(L,"toneMappingExposure",y.toneMappingExposure),je.needsLights&&Ot(Jn,wa),de&&q.fog===!0&&K.refreshFogUniforms(Jn,de),K.refreshMaterialUniforms(Jn,q,P,I,f.state.transmissionRenderTarget[E.id]),$a.upload(L,fe(je),Jn,w)),q.isShaderMaterial&&q.uniformsNeedUpdate===!0&&($a.upload(L,fe(je),Jn,w),q.uniformsNeedUpdate=!1),q.isSpriteMaterial&&Vt.setValue(L,"center",W.center),Vt.setValue(L,"modelViewMatrix",W.modelViewMatrix),Vt.setValue(L,"normalMatrix",W.normalMatrix),Vt.setValue(L,"modelMatrix",W.matrixWorld),q.isShaderMaterial||q.isRawShaderMaterial){let En=q.uniformsGroups;for(let Rn=0,Wc=En.length;Rn<Wc;Rn++){let Xs=En[Rn];z.update(Xs,fi),z.bind(Xs,fi)}}return fi}function Ot(E,H){E.ambientLightColor.needsUpdate=H,E.lightProbe.needsUpdate=H,E.directionalLights.needsUpdate=H,E.directionalLightShadows.needsUpdate=H,E.pointLights.needsUpdate=H,E.pointLightShadows.needsUpdate=H,E.spotLights.needsUpdate=H,E.spotLightShadows.needsUpdate=H,E.rectAreaLights.needsUpdate=H,E.hemisphereLights.needsUpdate=H}function vn(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return M},this.getActiveMipmapLevel=function(){return R},this.getRenderTarget=function(){return C},this.setRenderTargetTextures=function(E,H,Q){ve.get(E.texture).__webglTexture=H,ve.get(E.depthTexture).__webglTexture=Q;let q=ve.get(E);q.__hasExternalTextures=!0,q.__autoAllocateDepthBuffer=Q===void 0,q.__autoAllocateDepthBuffer||Be.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),q.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(E,H){let Q=ve.get(E);Q.__webglFramebuffer=H,Q.__useDefaultFramebuffer=H===void 0};let Un=L.createFramebuffer();this.setRenderTarget=function(E,H=0,Q=0){C=E,M=H,R=Q;let q=!0,W=null,de=!1,xe=!1;if(E){let be=ve.get(E);if(be.__useDefaultFramebuffer!==void 0)Fe.bindFramebuffer(L.FRAMEBUFFER,null),q=!1;else if(be.__webglFramebuffer===void 0)w.setupRenderTarget(E);else if(be.__hasExternalTextures)w.rebindTextures(E,ve.get(E.texture).__webglTexture,ve.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){let Ye=E.depthTexture;if(be.__boundDepthTexture!==Ye){if(Ye!==null&&ve.has(Ye)&&(E.width!==Ye.image.width||E.height!==Ye.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");w.setupDepthRenderbuffer(E)}}let tt=E.texture;(tt.isData3DTexture||tt.isDataArrayTexture||tt.isCompressedArrayTexture)&&(xe=!0);let it=ve.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(it[H])?W=it[H][Q]:W=it[H],de=!0):E.samples>0&&w.useMultisampledRTT(E)===!1?W=ve.get(E).__webglMultisampledFramebuffer:Array.isArray(it)?W=it[Q]:W=it,D.copy(E.viewport),U.copy(E.scissor),O=E.scissorTest}else D.copy(oe).multiplyScalar(P).floor(),U.copy(_e).multiplyScalar(P).floor(),O=ce;if(Q!==0&&(W=Un),Fe.bindFramebuffer(L.FRAMEBUFFER,W)&&q&&Fe.drawBuffers(E,W),Fe.viewport(D),Fe.scissor(U),Fe.setScissorTest(O),de){let be=ve.get(E.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+H,be.__webglTexture,Q)}else if(xe){let be=ve.get(E.texture),tt=H;L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,be.__webglTexture,Q,tt)}else if(E!==null&&Q!==0){let be=ve.get(E.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,be.__webglTexture,Q)}b=-1},this.readRenderTargetPixels=function(E,H,Q,q,W,de,xe){if(!(E&&E.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let we=ve.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&xe!==void 0&&(we=we[xe]),we){Fe.bindFramebuffer(L.FRAMEBUFFER,we);try{let be=E.texture,tt=be.format,it=be.type;if(!qe.textureFormatReadable(tt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!qe.textureTypeReadable(it)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}H>=0&&H<=E.width-q&&Q>=0&&Q<=E.height-W&&L.readPixels(H,Q,q,W,Ge.convert(tt),Ge.convert(it),de)}finally{let be=C!==null?ve.get(C).__webglFramebuffer:null;Fe.bindFramebuffer(L.FRAMEBUFFER,be)}}},this.readRenderTargetPixelsAsync=async function(E,H,Q,q,W,de,xe){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let we=ve.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&xe!==void 0&&(we=we[xe]),we){let be=E.texture,tt=be.format,it=be.type;if(!qe.textureFormatReadable(tt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!qe.textureTypeReadable(it))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(H>=0&&H<=E.width-q&&Q>=0&&Q<=E.height-W){Fe.bindFramebuffer(L.FRAMEBUFFER,we);let Ye=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,Ye),L.bufferData(L.PIXEL_PACK_BUFFER,de.byteLength,L.STREAM_READ),L.readPixels(H,Q,q,W,Ge.convert(tt),Ge.convert(it),0);let xt=C!==null?ve.get(C).__webglFramebuffer:null;Fe.bindFramebuffer(L.FRAMEBUFFER,xt);let _t=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);return L.flush(),await Lf(L,_t,4),L.bindBuffer(L.PIXEL_PACK_BUFFER,Ye),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,de),L.deleteBuffer(Ye),L.deleteSync(_t),de}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(E,H=null,Q=0){E.isTexture!==!0&&(nr("WebGLRenderer: copyFramebufferToTexture function signature has changed."),H=arguments[0]||null,E=arguments[1]);let q=Math.pow(2,-Q),W=Math.floor(E.image.width*q),de=Math.floor(E.image.height*q),xe=H!==null?H.x:0,we=H!==null?H.y:0;w.setTexture2D(E,0),L.copyTexSubImage2D(L.TEXTURE_2D,Q,0,0,xe,we,W,de),Fe.unbindTexture()};let di=L.createFramebuffer(),nn=L.createFramebuffer();this.copyTextureToTexture=function(E,H,Q=null,q=null,W=0,de=null){E.isTexture!==!0&&(nr("WebGLRenderer: copyTextureToTexture function signature has changed."),q=arguments[0]||null,E=arguments[1],H=arguments[2],de=arguments[3]||0,Q=null),de===null&&(W!==0?(nr("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),de=W,W=0):de=0);let xe,we,be,tt,it,Ye,xt,_t,ke,ut=E.isCompressedTexture?E.mipmaps[de]:E.image;if(Q!==null)xe=Q.max.x-Q.min.x,we=Q.max.y-Q.min.y,be=Q.isBox3?Q.max.z-Q.min.z:1,tt=Q.min.x,it=Q.min.y,Ye=Q.isBox3?Q.min.z:0;else{let $n=Math.pow(2,-W);xe=Math.floor(ut.width*$n),we=Math.floor(ut.height*$n),E.isDataArrayTexture?be=ut.depth:E.isData3DTexture?be=Math.floor(ut.depth*$n):be=1,tt=0,it=0,Ye=0}q!==null?(xt=q.x,_t=q.y,ke=q.z):(xt=0,_t=0,ke=0);let dt=Ge.convert(H.format),je=Ge.convert(H.type),fn;H.isData3DTexture?(w.setTexture3D(H,0),fn=L.TEXTURE_3D):H.isDataArrayTexture||H.isCompressedArrayTexture?(w.setTexture2DArray(H,0),fn=L.TEXTURE_2D_ARRAY):(w.setTexture2D(H,0),fn=L.TEXTURE_2D),L.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,H.flipY),L.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,H.premultiplyAlpha),L.pixelStorei(L.UNPACK_ALIGNMENT,H.unpackAlignment);let It=L.getParameter(L.UNPACK_ROW_LENGTH),fi=L.getParameter(L.UNPACK_IMAGE_HEIGHT),Dr=L.getParameter(L.UNPACK_SKIP_PIXELS),Nn=L.getParameter(L.UNPACK_SKIP_ROWS),wa=L.getParameter(L.UNPACK_SKIP_IMAGES);L.pixelStorei(L.UNPACK_ROW_LENGTH,ut.width),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,ut.height),L.pixelStorei(L.UNPACK_SKIP_PIXELS,tt),L.pixelStorei(L.UNPACK_SKIP_ROWS,it),L.pixelStorei(L.UNPACK_SKIP_IMAGES,Ye);let Vt=E.isDataArrayTexture||E.isData3DTexture,Jn=H.isDataArrayTexture||H.isData3DTexture;if(E.isDepthTexture){let $n=ve.get(E),En=ve.get(H),Rn=ve.get($n.__renderTarget),Wc=ve.get(En.__renderTarget);Fe.bindFramebuffer(L.READ_FRAMEBUFFER,Rn.__webglFramebuffer),Fe.bindFramebuffer(L.DRAW_FRAMEBUFFER,Wc.__webglFramebuffer);for(let Xs=0;Xs<be;Xs++)Vt&&(L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,ve.get(E).__webglTexture,W,Ye+Xs),L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,ve.get(H).__webglTexture,de,ke+Xs)),L.blitFramebuffer(tt,it,xe,we,xt,_t,xe,we,L.DEPTH_BUFFER_BIT,L.NEAREST);Fe.bindFramebuffer(L.READ_FRAMEBUFFER,null),Fe.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else if(W!==0||E.isRenderTargetTexture||ve.has(E)){let $n=ve.get(E),En=ve.get(H);Fe.bindFramebuffer(L.READ_FRAMEBUFFER,di),Fe.bindFramebuffer(L.DRAW_FRAMEBUFFER,nn);for(let Rn=0;Rn<be;Rn++)Vt?L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,$n.__webglTexture,W,Ye+Rn):L.framebufferTexture2D(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,$n.__webglTexture,W),Jn?L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,En.__webglTexture,de,ke+Rn):L.framebufferTexture2D(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,En.__webglTexture,de),W!==0?L.blitFramebuffer(tt,it,xe,we,xt,_t,xe,we,L.COLOR_BUFFER_BIT,L.NEAREST):Jn?L.copyTexSubImage3D(fn,de,xt,_t,ke+Rn,tt,it,xe,we):L.copyTexSubImage2D(fn,de,xt,_t,tt,it,xe,we);Fe.bindFramebuffer(L.READ_FRAMEBUFFER,null),Fe.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else Jn?E.isDataTexture||E.isData3DTexture?L.texSubImage3D(fn,de,xt,_t,ke,xe,we,be,dt,je,ut.data):H.isCompressedArrayTexture?L.compressedTexSubImage3D(fn,de,xt,_t,ke,xe,we,be,dt,ut.data):L.texSubImage3D(fn,de,xt,_t,ke,xe,we,be,dt,je,ut):E.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,de,xt,_t,xe,we,dt,je,ut.data):E.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,de,xt,_t,ut.width,ut.height,dt,ut.data):L.texSubImage2D(L.TEXTURE_2D,de,xt,_t,xe,we,dt,je,ut);L.pixelStorei(L.UNPACK_ROW_LENGTH,It),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,fi),L.pixelStorei(L.UNPACK_SKIP_PIXELS,Dr),L.pixelStorei(L.UNPACK_SKIP_ROWS,Nn),L.pixelStorei(L.UNPACK_SKIP_IMAGES,wa),de===0&&H.generateMipmaps&&L.generateMipmap(fn),Fe.unbindTexture()},this.copyTextureToTexture3D=function(E,H,Q=null,q=null,W=0){return E.isTexture!==!0&&(nr("WebGLRenderer: copyTextureToTexture3D function signature has changed."),Q=arguments[0]||null,q=arguments[1]||null,E=arguments[2],H=arguments[3],W=arguments[4]||0),nr('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(E,H,Q,q,W)},this.initRenderTarget=function(E){ve.get(E).__webglFramebuffer===void 0&&w.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?w.setTextureCube(E,0):E.isData3DTexture?w.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?w.setTexture2DArray(E,0):w.setTexture2D(E,0),Fe.unbindTexture()},this.resetState=function(){M=0,R=0,C=null,Fe.reset(),Pt.reset()},typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return gi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorspace=pt._getDrawingBufferColorSpace(e),t.unpackColorSpace=pt._getUnpackColorSpace()}};var yh=class extends HTMLElement{constructor(){super()}static get observedAttributes(){return["path"]}connectedCallback(){this.loadSponsors()}attributeChangedCallback(e,t,n){t!==n&&this.loadSponsors()}get path(){return this.getAttribute("path")||"github-sponsors"}async loadSponsors(){try{let e=await fetch(window.paths[this.path]);if(!e.ok)throw new Error(`HTTP error! status: ${e.status}`);let t=await e.text();this.innerHTML=t}catch(e){console.error("Error loading sponsors:",e),this.innerHTML=""}}};var Ii=typeof window!="undefined",Mn=Ii?window:null,st=Ii?document:null,jt={OBJECT:0,ATTRIBUTE:1,CSS:2,TRANSFORM:3,CSS_VAR:4},St={NUMBER:0,UNIT:1,COLOR:2,COMPLEX:3},Qn={NONE:0,AUTO:1,FORCE:2},dn={replace:0,none:1,blend:2},um=Symbol(),mc=Symbol(),Ah=Symbol(),no=Symbol(),hm=Symbol(),dm=Symbol(),Tt=1e-11,ca=1e12,Kt=1e3,_h=120,ss="",ua=new Map;ua.set("x","translateX");ua.set("y","translateY");ua.set("z","translateZ");var io=["translateX","translateY","translateZ","rotate","rotateX","rotateY","rotateZ","scale","scaleX","scaleY","scaleZ","skew","skewX","skewY","perspective","matrix","matrix3d"],Sh=io.reduce((i,e)=>({...i,[e]:e+"("}),{}),lt=()=>{},$1=/(^#([\da-f]{3}){1,2}$)|(^#([\da-f]{4}){1,2}$)/i,eS=/rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/i,tS=/rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(-?\d+|-?\d*.\d+)\s*\)/i,nS=/hsl\(\s*(-?\d+|-?\d*.\d+)\s*,\s*(-?\d+|-?\d*.\d+)%\s*,\s*(-?\d+|-?\d*.\d+)%\s*\)/i,iS=/hsla\(\s*(-?\d+|-?\d*.\d+)\s*,\s*(-?\d+|-?\d*.\d+)%\s*,\s*(-?\d+|-?\d*.\d+)%\s*,\s*(-?\d+|-?\d*.\d+)\s*\)/i,fm=/[-+]?\d*\.?\d+(?:e[-+]?\d)?/gi,pm=/^([-+]?\d*\.?\d+(?:e[-+]?\d+)?)([a-z]+|%)$/i,sS=/([a-z])([A-Z])/g,rS=/(\w+)(\([^)]+\)+)/g,mm=/(\*=|\+=|-=)/,gm={id:null,keyframes:null,playbackEase:null,playbackRate:1,frameRate:_h,loop:0,reversed:!1,alternate:!1,autoplay:!0,duration:Kt,delay:0,loopDelay:0,ease:"out(2)",composition:dn.replace,modifier:i=>i,onBegin:lt,onBeforeUpdate:lt,onUpdate:lt,onLoop:lt,onPause:lt,onComplete:lt,onRender:lt},ze={defaults:gm,root:st,scope:null,precision:4,timeScale:1,tickThreshold:200},vm={version:"4.0.0",engine:null};Ii&&(Mn.AnimeJS||(Mn.AnimeJS=[]),Mn.AnimeJS.push(vm));var xm=i=>i.replace(sS,"$1-$2").toLowerCase(),ln=(i,e)=>i.indexOf(e)===0,gr=Date.now,Pn=Array.isArray,gn=i=>i&&i.constructor===Object,Li=i=>typeof i=="number"&&!isNaN(i),ri=i=>typeof i=="string",ai=i=>typeof i=="function",De=i=>typeof i=="undefined",gc=i=>De(i)||i===null,bh=i=>Ii&&i instanceof SVGElement,ym=i=>$1.test(i),Am=i=>ln(i,"rgb"),_m=i=>ln(i,"hsl"),aS=i=>ym(i)||Am(i)||_m(i),ha=i=>!ze.defaults.hasOwnProperty(i),vr=i=>ri(i)?parseFloat(i):i,da=Math.pow,fa=Math.sqrt,Eh=Math.sin,Th=Math.cos,Fi=Math.abs,Sm=Math.exp,oS=Math.ceil,so=Math.floor,lS=Math.asin,bm=Math.max,vc=Math.atan2,pa=Math.PI,Mh=Math.round,Xe=(i,e,t)=>i<e?e:i>t?t:i,Em={},Pe=(i,e)=>{if(e<0)return i;if(!e)return Mh(i);let t=Em[e];return t||(t=Em[e]=10**e),Mh(i*t)/t},xr=(i,e)=>Pn(e)?e.reduce((t,n)=>Fi(n-i)<Fi(t-i)?n:t):e?Mh(i/e)*e:i,rs=(i,e,t)=>i+(e-i)*t,ro=i=>i===1/0?ca:i===-1/0?-1e12:i,yr=i=>i<Tt?Tt:i,wn=i=>Pn(i)?[...i]:i,ao=(i,e)=>{let t={...i};for(let n in e){let s=i[n];t[n]=De(s)?e[n]:s}return t},Lt=(i,e,t,n="_prev",s="_next")=>{let r=i._head,a=s;for(t&&(r=i._tail,a=n);r;){let o=r[a];e(r),r=o}},as=(i,e,t="_prev",n="_next")=>{let s=e[t],r=e[n];s?s[n]=r:i._head=r,r?r[t]=s:i._tail=s,e[t]=null,e[n]=null},os=(i,e,t,n="_prev",s="_next")=>{let r=i._tail;for(;r&&t&&t(r,e);)r=r[n];let a=r?r[s]:i._head;r?r[s]=e:i._head=e,a?a[n]=e:i._tail=e,e[n]=r,e[s]=a},wh=class{constructor(e=0){this.deltaTime=0,this._currentTime=e,this._elapsedTime=e,this._startTime=e,this._lastTime=e,this._scheduledTime=0,this._frameDuration=Pe(Kt/_h,0),this._fps=_h,this._speed=1,this._hasChildren=!1,this._head=null,this._tail=null}get fps(){return this._fps}set fps(e){let t=this._frameDuration,n=+e,s=n<Tt?Tt:n,r=Pe(Kt/s,0);this._fps=s,this._frameDuration=r,this._scheduledTime+=r-t}get speed(){return this._speed}set speed(e){let t=+e;this._speed=t<Tt?Tt:t}requestTick(e){let t=this._scheduledTime,n=this._elapsedTime;if(this._elapsedTime+=e-n,n<t)return Qn.NONE;let s=this._frameDuration,r=n-t;return this._scheduledTime+=r<s?s:r,Qn.AUTO}computeDeltaTime(e){let t=e-this._lastTime;return this.deltaTime=t,this._lastTime=e,t}},xc=(i,e,t,n,s)=>{let r=i.parent,a=i.duration,o=i.completed,l=i.iterationDuration,c=i.iterationCount,u=i._currentIteration,h=i._loopDelay,d=i._reversed,p=i._alternate,g=i._hasChildren,v=i._delay,m=i._currentTime,f=v+l,x=e-v,_=Xe(m,-v,a),y=Xe(x,-v,a),T=x-m,M=y>0,R=y>=a,C=a<=Tt,b=s===Qn.FORCE,S=0,D=x,U=0;if(c>1){let I=~~(y/(l+(R?0:h)));i._currentIteration=Xe(I,0,c),R&&i._currentIteration--,S=i._currentIteration%2,D=y%(l+h)||0}let O=d^(p&&S),B=i._ease,G=R?O?0:a:O?l-D:D;B&&(G=l*B(G/l)||0);let N=(r?r.backwards:x<m)?!O:!!O;if(i._currentTime=x,i._iterationTime=G,i.backwards=N,M&&!i.began?(i.began=!0,!t&&!(r&&(N||!r.began))&&i.onBegin(i)):x<=0&&(i.began=!1),!t&&!g&&M&&i._currentIteration!==u&&i.onLoop(i),b||s===Qn.AUTO&&(e>=v&&e<=f||e<=v&&_>v||e>=f&&_!==a)||G>=f&&_!==a||G<=v&&_>0||e<=_&&_===a&&o||R&&!o&&C){if(M&&(i.computeDeltaTime(_),t||i.onBeforeUpdate(i)),!g){let I=b||(N?T*-1:T)>=ze.tickThreshold,P=i._offset+(r?r._offset:0)+v+G,F=i._head,J,oe,_e,ce,X=0;for(;F;){let Z=F._composition,ie=F._currentTime,he=F._changeDuration,Le=F._absoluteStartTime+F._changeDuration,Ce=F._nextRep,He=F._prevRep,Je=Z!==dn.none;if((I||(ie!==he||P<=Le+(Ce?Ce._delay:0))&&(ie!==0||P>=F._absoluteStartTime))&&(!Je||!F._isOverridden&&(!F._isOverlapped||P<=Le)&&(!Ce||Ce._isOverridden||P<=Ce._absoluteStartTime)&&(!He||He._isOverridden||P>=He._absoluteStartTime+He._changeDuration+F._delay))){let We=F._currentTime=Xe(G-F._startTime,0,he),Ke=F._ease(We/F._updateDuration),L=F._modifier,Dt=F._valueType,Be=F._tweenType,qe=Be===jt.OBJECT,Fe=Dt===St.NUMBER,pe=Fe&&qe||Ke===0||Ke===1?-1:ze.precision,ve,w;if(Fe)ve=w=L(Pe(rs(F._fromNumber,F._toNumber,Ke),pe));else if(Dt===St.UNIT)w=L(Pe(rs(F._fromNumber,F._toNumber,Ke),pe)),ve=`${w}${F._unit}`;else if(Dt===St.COLOR){let A=F._fromNumbers,Y=F._toNumbers,$=Pe(Xe(L(rs(A[0],Y[0],Ke)),0,255),0),se=Pe(Xe(L(rs(A[1],Y[1],Ke)),0,255),0),te=Pe(Xe(L(rs(A[2],Y[2],Ke)),0,255),0),j=Xe(L(Pe(rs(A[3],Y[3],Ke),pe)),0,1);if(ve=`rgba(${$},${se},${te},${j})`,Je){let K=F._numbers;K[0]=$,K[1]=se,K[2]=te,K[3]=j}}else if(Dt===St.COMPLEX){ve=F._strings[0];for(let A=0,Y=F._toNumbers.length;A<Y;A++){let $=L(Pe(rs(F._fromNumbers[A],F._toNumbers[A],Ke),pe)),se=F._strings[A+1];ve+=`${se?$+se:$}`,Je&&(F._numbers[A]=$)}}if(Je&&(F._number=w),!n&&Z!==dn.blend){let A=F.property;J=F.target,qe?J[A]=ve:Be===jt.ATTRIBUTE?J.setAttribute(A,ve):(oe=J.style,Be===jt.TRANSFORM?(J!==_e&&(_e=J,ce=J[no]),ce[A]=ve,X=1):Be===jt.CSS?oe[A]=ve:Be===jt.CSS_VAR&&oe.setProperty(A,ve)),M&&(U=1)}else F._value=ve}if(X&&F._renderTransforms){let We=ss;for(let Ke in ce)We+=`${Sh[Ke]}${ce[Ke]}) `;oe.transform=We,X=0}F=F._next}!t&&U&&i.onRender(i)}!t&&M&&i.onUpdate(i)}return r&&C?!t&&(r.began&&!N&&x>=a&&!o||N&&x<=Tt&&o)&&(i.onComplete(i),i.completed=!N):M&&R?c===1/0?i._startTime+=i.duration:i._currentIteration>=c-1&&(i.paused=!0,!o&&!g&&(i.completed=!0,!t&&!(r&&(N||!r.began))&&(i.onComplete(i),i._resolve(i)))):i.completed=!1,U},Ar=(i,e,t,n,s)=>{let r=i._currentIteration;if(xc(i,e,t,n,s),i._hasChildren){let a=i,o=a.backwards,l=n?e:a._iterationTime,c=gr(),u=0,h=!0;if(!n&&a._currentIteration!==r){let d=a.iterationDuration;Lt(a,p=>{if(!o)!p.completed&&!p.backwards&&p._currentTime<p.iterationDuration&&xc(p,d,t,1,Qn.FORCE),p.began=!1,p.completed=!1;else{let g=p.duration,v=p._offset+p._delay,m=v+g;!t&&g<=Tt&&(!v||m===d)&&p.onComplete(p)}}),t||a.onLoop(a)}Lt(a,d=>{let p=Pe((l-d._offset)*d._speed,12),g=d._fps<a._fps?d.requestTick(c):s;u+=xc(d,p,t,n,g),!d.completed&&h&&(h=!1)},o),!t&&u&&a.onRender(a),h&&a._currentTime>=a.duration&&(a.paused=!0,a.completed||(a.completed=!0,t||(a.onComplete(a),a._resolve(a))))}},ma={animation:null,update:lt},cS=i=>{let e=ma.animation;return e||(e={duration:Tt,computeDeltaTime:lt,_offset:0,_delay:0,_head:null,_tail:null},ma.animation=e,ma.update=()=>{i.forEach(t=>{for(let n in t){let s=t[n],r=s._head;if(r){let a=r._valueType,o=a===St.COMPLEX||a===St.COLOR?wn(r._fromNumbers):null,l=r._fromNumber,c=s._tail;for(;c&&c!==r;){if(o)for(let u=0,h=c._numbers.length;u<h;u++)o[u]+=c._numbers[u];else l+=c._number;c=c._prevAdd}r._toNumber=l,r._toNumbers=o}}}),xc(e,1,1,0,Qn.FORCE)}),e},Tm=Ii?requestAnimationFrame:setImmediate,uS=Ii?cancelAnimationFrame:clearImmediate,Mm=class extends wh{constructor(e){super(e);this.useDefaultMainLoop=!0,this.pauseOnDocumentHidden=!0,this.defaults=gm,this.paused=!!(Ii&&st.hidden),this.reqId=null}update(){let e=this._currentTime=gr();if(this.requestTick(e)){this.computeDeltaTime(e);let t=this._speed,n=this._fps,s=this._head;for(;s;){let r=s._next;s.paused?(as(this,s),this._hasChildren=!!this._tail,s._running=!1,s.completed&&!s._cancelled&&s.cancel()):Ar(s,(e-s._startTime)*s._speed*t,0,0,s._fps<n?s.requestTick(e):Qn.AUTO),s=r}ma.update()}}wake(){return this.useDefaultMainLoop&&!this.reqId&&!this.paused&&(this.reqId=Tm(wm)),this}pause(){return this.paused=!0,hS()}resume(){if(!!this.paused)return this.paused=!1,Lt(this,e=>e.resetTime()),this.wake()}get speed(){return this._speed*(ze.timeScale===1?1:Kt)}set speed(e){this._speed=e*ze.timeScale,Lt(this,t=>t.speed=t._speed)}get timeUnit(){return ze.timeScale===1?"ms":"s"}set timeUnit(e){let t=.001,n=e==="s",s=n?t:1;if(ze.timeScale!==s){ze.timeScale=s,ze.tickThreshold=200*s;let r=n?t:Kt;this.defaults.duration*=r,this._speed*=r}}get precision(){return ze.precision}set precision(e){ze.precision=e}},tn=(()=>{let i=new Mm(gr());return Ii&&(vm.engine=i,st.addEventListener("visibilitychange",()=>{!i.pauseOnDocumentHidden||(st.hidden?i.pause():i.resume())})),i})(),wm=()=>{tn._head?(tn.reqId=Tm(wm),tn.update()):tn.reqId=0},hS=()=>(uS(tn.reqId),tn.reqId=0,tn),dS=(i,e,t)=>{let n=i.style.transform,s;if(n){let r=i[no],a;for(;a=rS.exec(n);){let o=a[1],l=a[2].slice(1,-1);r[o]=l,o===e&&(s=l,t&&(t[e]=l))}}return n&&!De(s)?s:ln(e,"scale")?"1":ln(e,"rotate")||ln(e,"skew")?"0deg":"0px"};function Cm(i){let e=ri(i)?ze.root.querySelectorAll(i):i;if(e instanceof NodeList||e instanceof HTMLCollection)return e}function oi(i){if(gc(i))return[];if(Pn(i)){let t=i.flat(1/0),n=[];for(let s=0,r=t.length;s<r;s++){let a=t[s];if(!gc(a)){let o=Cm(a);if(o)for(let l=0,c=o.length;l<c;l++){let u=o[l];if(!gc(u)){let h=!1;for(let d=0,p=n.length;d<p;d++)if(n[d]===u){h=!0;break}h||n.push(u)}}else{let l=!1;for(let c=0,u=n.length;c<u;c++)if(n[c]===a){l=!0;break}l||n.push(a)}}}return n}if(!Ii)return[i];let e=Cm(i);return e?Array.from(e):[i]}function yc(i){let e=oi(i),t=e.length;if(t)for(let n=0;n<t;n++){let s=e[n];if(!s[um]){s[um]=!0;let r=bh(s);(s.nodeType||r)&&(s[mc]=!0,s[Ah]=r,s[no]={})}}return e}var Rm=i=>{let t=oi(i)[0];if(!(!t||!bh(t)))return t},fS=(i,e=.33)=>t=>{let n=Rm(i);if(!n)return;let s=t.tagName==="path",r=s?" ":",",a=t[hm];a&&t.setAttribute(s?"d":"points",a);let o="",l="";if(!e)o=t.getAttribute(s?"d":"points"),l=n.getAttribute(s?"d":"points");else{let c=t.getTotalLength(),u=n.getTotalLength(),h=Math.max(Math.ceil(c*e),Math.ceil(u*e));for(let d=0;d<h;d++){let p=d/(h-1),g=t.getPointAtLength(c*p),v=n.getPointAtLength(u*p),m=s?d===0?"M":"L":"";o+=m+Pe(g.x,3)+r+g.y+" ",l+=m+Pe(v.x,3)+r+v.y+" "}}return t[hm]=l,[o,l]};function pS(i,e,t){let n=getComputedStyle(i).strokeLinecap,s=Kt,r=n,a=new Proxy(i,{get(o,l){let c=o[l];return l===dm?o:l==="setAttribute"?(...u)=>{if(u[0]==="draw"){let d=u[1].split(" "),p=+d[0],g=+d[1],v=p*-1e3,m=g*s+v,f=s+(p===0&&g===1||p===1&&g===0?0:10)-m;if(n!=="butt"){let x=p===g?"butt":n;r!==x&&(o.setAttribute("stroke-linecap",`${x}`),r=x)}o.setAttribute("stroke-dashoffset",`${v}`),o.setAttribute("stroke-dasharray",`${m} ${f}`)}return Reflect.apply(c,o,u)}:ai(c)?(...u)=>Reflect.apply(c,o,u):c}});return i.getAttribute("pathLength")!==`${s}`&&(i.setAttribute("pathLength",`${s}`),a.setAttribute("draw",`${e} ${t}`)),a}var mS=(i,e=0,t=0)=>{let n=oi(i);return n.forEach((s,r)=>n[r]=pS(s,e,t)),n},Ch=(i,e,t=0)=>i.getPointAtLength(e+t>=1?e+t:0),Rh=(i,e)=>t=>{let n=+i.getTotalLength(),s=t[Ah],r=i.getCTM();return{from:0,to:n,modifier:a=>{if(e==="a"){let o=Ch(i,a,-1),l=Ch(i,a,1);return vc(l.y-o.y,l.x-o.x)*180/pa}else{let o=Ch(i,a,0);return e==="x"?s||!r?o.x:o.x*r.a+o.y*r.c+r.e:s||!r?o.y:o.x*r.b+o.y*r.d+r.f}}}},gS=i=>{let e=Rm(i);if(!!e)return{translateX:Rh(e,"x"),translateY:Rh(e,"y"),rotate:Rh(e,"a")}},vS=["opacity","rotate","overflow","color"],xS=(i,e)=>{if(vS.includes(e))return!1;if(i.getAttribute(e)||e in i){if(e==="scale"){let t=i.parentNode;return t&&t.tagName==="filter"}return!0}},qn={morphTo:fS,createMotionPath:gS,createDrawable:mS},yS=i=>{let e=eS.exec(i)||tS.exec(i),t=De(e[4])?1:+e[4];return[+e[1],+e[2],+e[3],t]},AS=i=>{let e=i.length,t=e===4||e===5;return[+("0x"+i[1]+i[t?1:2]),+("0x"+i[t?2:3]+i[t?2:4]),+("0x"+i[t?3:5]+i[t?3:6]),e===5||e===9?+(+("0x"+i[t?4:7]+i[t?4:8])/255).toFixed(3):1]},Dh=(i,e,t)=>(t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*(2/3-t)*6:i),_S=i=>{let e=nS.exec(i)||iS.exec(i),t=+e[1]/360,n=+e[2]/100,s=+e[3]/100,r=De(e[4])?1:+e[4],a,o,l;if(n===0)a=o=l=s;else{let c=s<.5?s*(1+n):s+n-s*n,u=2*s-c;a=Pe(Dh(u,c,t+1/3)*255,0),o=Pe(Dh(u,c,t)*255,0),l=Pe(Dh(u,c,t-1/3)*255,0)}return[a,o,l,r]},SS=i=>Am(i)?yS(i):ym(i)?AS(i):_m(i)?_S(i):[0,0,0,1],Ve=(i,e)=>De(i)?e:i,jn=(i,e,t,n,s)=>{if(ai(i)){let r=()=>{let a=i(e,t,n);return isNaN(+a)?a||0:+a};return s&&(s.func=r),r()}else return i},Ph=(i,e)=>i[mc]?i[Ah]&&xS(i,e)?jt.ATTRIBUTE:io.includes(e)||ua.get(e)?jt.TRANSFORM:ln(e,"--")?jt.CSS_VAR:e in i.style?jt.CSS:e in i?jt.OBJECT:jt.ATTRIBUTE:jt.OBJECT,Dm=(i,e,t)=>{let n=i.style[e];n&&t&&(t[e]=n);let s=n||getComputedStyle(i[dm]||i).getPropertyValue(e);return s==="auto"?"0":s},ga=(i,e,t,n)=>{let s=De(t)?Ph(i,e):t;return s===jt.OBJECT?i[e]||0:s===jt.ATTRIBUTE?i.getAttribute(e):s===jt.TRANSFORM?dS(i,e,n):s===jt.CSS_VAR?Dm(i,e,n).trimStart():Dm(i,e,n)},va=(i,e,t)=>t==="-"?i-e:t==="+"?i+e:i*e,Ih=()=>({t:St.NUMBER,n:0,u:null,o:null,d:null,s:null}),li=(i,e)=>{if(e.t=St.NUMBER,e.n=0,e.u=null,e.o=null,e.d=null,e.s=null,!i)return e;let t=+i;if(isNaN(t)){let n=i;n[1]==="="&&(e.o=n[0],n=n.slice(2));let s=n.includes(" ")?!1:pm.exec(n);if(s)return e.t=St.UNIT,e.n=+s[1],e.u=s[2],e;if(e.o)return e.n=+n,e;if(aS(n))return e.t=St.COLOR,e.d=SS(n),e;{let r=n.match(fm);return e.t=St.COMPLEX,e.d=r?r.map(Number):[],e.s=n.split(fm)||[],e}}else return e.n=t,e},Pm=(i,e)=>(e.t=i._valueType,e.n=i._toNumber,e.u=i._unit,e.o=null,e.d=wn(i._toNumbers),e.s=wn(i._strings),e),In=Ih(),Ac={_rep:new WeakMap,_add:new Map},Lh=(i,e,t="_rep")=>{let n=Ac[t],s=n.get(i);return s||(s={},n.set(i,s)),s[e]?s[e]:s[e]={_head:null,_tail:null}},bS=(i,e)=>i._isOverridden||i._absoluteStartTime>e._absoluteStartTime,_c=i=>{i._isOverlapped=1,i._isOverridden=1,i._changeDuration=Tt,i._currentTime=Tt},Im=(i,e)=>{let t=i._composition;if(t===dn.replace){let n=i._absoluteStartTime;os(e,i,bS,"_prevRep","_nextRep");let s=i._prevRep;if(s){let r=s.parent,a=s._absoluteStartTime+s._changeDuration;if(i.parent.id!==r.id&&r.iterationCount>1&&a+(r.duration-r.iterationDuration)>n){_c(s);let c=s._prevRep;for(;c&&c.parent.id===r.id;)_c(c),c=c._prevRep}let o=n-i._delay;if(a>o){let c=s._startTime,u=a-(c+s._updateDuration);s._changeDuration=o-u-c,s._currentTime=s._changeDuration,s._isOverlapped=1,s._changeDuration<Tt&&_c(s)}let l=!0;if(Lt(r,c=>{c._isOverlapped||(l=!1)}),l){let c=r.parent;if(c){let u=!0;Lt(c,h=>{h!==r&&Lt(h,d=>{d._isOverlapped||(u=!1)})}),u&&c.cancel()}else r.cancel()}}}else if(t===dn.blend){let n=Lh(i.target,i.property,"_add"),s=cS(Ac._add),r=n._head;r||(r={...i},r._composition=dn.replace,r._updateDuration=Tt,r._startTime=0,r._numbers=wn(i._fromNumbers),r._number=0,r._next=null,r._prev=null,os(n,r),os(s,r));let a=i._toNumber;if(i._fromNumber=r._fromNumber-a,i._toNumber=0,i._numbers=wn(i._fromNumbers),i._number=0,r._fromNumber=a,i._toNumbers){let o=wn(i._toNumbers);o&&o.forEach((l,c)=>{i._fromNumbers[c]=r._fromNumbers[c]-l,i._toNumbers[c]=0}),r._fromNumbers=o}os(n,i,null,"_prevAdd","_nextAdd")}return i},Lm=i=>{let e=i._composition;if(e!==dn.none){let t=i.target,n=i.property,a=Ac._rep.get(t)[n];if(as(a,i,"_prevRep","_nextRep"),e===dn.blend){let o=Ac._add,l=o.get(t);if(!l)return;let c=l[n],u=ma.animation;as(c,i,"_prevAdd","_nextAdd");let h=c._head;if(h&&h===c._tail){as(c,h,"_prevAdd","_nextAdd"),as(u,h);let d=!0;for(let p in l)if(l[p]._head){d=!1;break}d&&o.delete(t)}}}return i},Fm=i=>(i.paused=!0,i.began=!1,i.completed=!1,i),Fh=i=>(i._cancelled&&(i._hasChildren?Lt(i,Fh):Lt(i,e=>{e._composition!==dn.none&&Im(e,Lh(e.target,e.property))}),i._cancelled=0),i),ES=0,Ln=class extends wh{constructor(e={},t=null,n=0){super(0);let{id:s,delay:r,duration:a,reversed:o,alternate:l,loop:c,loopDelay:u,autoplay:h,frameRate:d,playbackRate:p,onComplete:g,onLoop:v,onPause:m,onBegin:f,onBeforeUpdate:x,onUpdate:_}=e;ze.scope&&ze.scope.revertibles.push(this);let y=t?0:tn._elapsedTime,T=t?t.defaults:ze.defaults,M=ai(r)||De(r)?T.delay:+r,R=ai(a)||De(a)?1/0:+a,C=Ve(c,T.loop),b=Ve(u,T.loopDelay),S=C===!0||C===1/0||C<0?1/0:C+1,D=0;if(t)D=n;else{let U=gr();tn.paused&&(tn.requestTick(U),U=tn._elapsedTime),D=U-tn._startTime}this.id=De(s)?++ES:s,this.parent=t,this.duration=ro((R+b)*S-b)||Tt,this.backwards=!1,this.paused=!0,this.began=!1,this.completed=!1,this.onBegin=f||T.onBegin,this.onBeforeUpdate=x||T.onBeforeUpdate,this.onUpdate=_||T.onUpdate,this.onLoop=v||T.onLoop,this.onPause=m||T.onPause,this.onComplete=g||T.onComplete,this.iterationDuration=R,this.iterationCount=S,this._autoplay=t?!1:Ve(h,T.autoplay),this._offset=D,this._delay=M,this._loopDelay=b,this._iterationTime=0,this._currentIteration=0,this._resolve=lt,this._running=!1,this._reversed=+Ve(o,T.reversed),this._reverse=this._reversed,this._cancelled=0,this._alternate=Ve(l,T.alternate),this._prev=null,this._next=null,this._elapsedTime=y,this._startTime=y,this._lastTime=y,this._fps=Ve(d,T.frameRate),this._speed=Ve(p,T.playbackRate)}get cancelled(){return!!this._cancelled}set cancelled(e){e?this.cancel():this.reset(1).play()}get currentTime(){return Xe(Pe(this._currentTime,ze.precision),-this._delay,this.duration)}set currentTime(e){let t=this.paused;this.pause().seek(+e),t||this.resume()}get iterationCurrentTime(){return Pe(this._iterationTime,ze.precision)}set iterationCurrentTime(e){this.currentTime=this.iterationDuration*this._currentIteration+e}get progress(){return Xe(Pe(this._currentTime/this.duration,5),0,1)}set progress(e){this.currentTime=this.duration*e}get iterationProgress(){return Xe(Pe(this._iterationTime/this.iterationDuration,5),0,1)}set iterationProgress(e){let t=this.iterationDuration;this.currentTime=t*this._currentIteration+t*e}get currentIteration(){return this._currentIteration}set currentIteration(e){this.currentTime=this.iterationDuration*Xe(+e,0,this.iterationCount-1)}get reversed(){return!!this._reversed}set reversed(e){e?this.reverse():this.play()}get speed(){return super.speed}set speed(e){super.speed=e,this.resetTime()}reset(e=0){return Fh(this),this._reversed&&!this._reverse&&(this.reversed=!1),this._iterationTime=this.iterationDuration,Ar(this,0,1,e,Qn.FORCE),Fm(this),this._hasChildren&&Lt(this,Fm),this}init(e=0){this.fps=this._fps,this.speed=this._speed,!e&&this._hasChildren&&Ar(this,this.duration,1,e,Qn.FORCE),this.reset(e);let t=this._autoplay;return t===!0?this.resume():t&&!De(t.linked)&&t.link(this),this}resetTime(){let e=1/(this._speed*tn._speed);return this._startTime=gr()-(this._currentTime+this._delay)*e,this}pause(){return this.paused?this:(this.paused=!0,this.onPause(this),this)}resume(){return this.paused?(this.paused=!1,this.duration<=Tt&&!this._hasChildren?Ar(this,Tt,0,0,Qn.FORCE):(this._running||(os(tn,this),tn._hasChildren=!0,this._running=!0),this.resetTime(),this._startTime-=12,tn.wake()),this):this}restart(){return this.reset(0).resume()}seek(e,t=0,n=0){Fh(this),this.completed=!1;let s=this.paused;return this.paused=!0,Ar(this,e+this._delay,~~t,~~n,Qn.AUTO),s?this:this.resume()}alternate(){let e=this._reversed,t=this.iterationCount,n=this.iterationDuration,s=t===1/0?so(ca/n):t;return this._reversed=+(this._alternate&&!(s%2)?e:!e),t===1/0?this.iterationProgress=this._reversed?1-this.iterationProgress:this.iterationProgress:this.seek(n*s-this._currentTime),this.resetTime(),this}play(){return this._reversed&&this.alternate(),this.resume()}reverse(){return this._reversed||this.alternate(),this.resume()}cancel(){return this._hasChildren?Lt(this,e=>e.cancel(),!0):Lt(this,Lm),this._cancelled=1,this.pause()}stretch(e){let t=this.duration;if(t===yr(e))return this;let n=e/t,s=e<=Tt;return this.duration=s?Tt:yr(ro(Pe(t*n,12))),this.iterationDuration=s?Tt:yr(ro(Pe(this.iterationDuration*n,12))),this._offset*=n,this._delay*=n,this._loopDelay*=n,this}revert(){Ar(this,0,1,0,Qn.AUTO);let e=this._autoplay;return e&&e.linked&&e.linked===this&&e.revert(),this.cancel()}complete(){return this.seek(this.duration).cancel()}then(e=lt){let t=this.then,n=()=>{this.then=null,e(this),this.then=t,this._resolve=lt};return new Promise(s=>(this._resolve=()=>s(n()),this.completed&&this._resolve(),this))}},Zn=i=>new Ln(i,null,0).init(),ls=i=>i,Um=(i,e,t)=>(((1-3*t+3*e)*i+(3*t-6*e))*i+3*e)*i,TS=(i,e,t)=>{let n=0,s=1,r,a,o=0;do a=n+(s-n)/2,r=Um(a,e,t)-i,r>0?s=a:n=a;while(Fi(r)>1e-7&&++o<100);return a},MS=(i=.5,e=0,t=.5,n=1)=>i===e&&t===n?ls:s=>s===0||s===1?s:Um(TS(s,i,t),e,n),wS=(i=10,e)=>{let t=e?oS:so;return n=>t(Xe(n,0,1)*i)*(1/i)},Nm=(...i)=>{let e=i.length;if(!e)return ls;let t=e-1,n=i[0],s=i[t],r=[0],a=[vr(n)];for(let o=1;o<t;o++){let l=i[o],c=ri(l)?l.trim().split(" "):[l],u=c[0],h=c[1];r.push(De(h)?o/t:vr(h)/100),a.push(vr(u))}return a.push(vr(s)),r.push(1),function(l){for(let c=1,u=r.length;c<u;c++){let h=r[c];if(l<=h){let d=r[c-1],p=a[c-1];return p+(a[c]-p)*(l-d)/(h-d)}}return a[a.length-1]}},CS=(i=10,e=1)=>{let t=[0],n=i-1;for(let s=1;s<n;s++){let r=t[s-1],a=s/n,o=(s+1)/n,l=a+(o-a)*Math.random(),c=a*(1-e)+l*e;t.push(Xe(c,r,1))}return t.push(1),Nm(...t)},RS=pa/2,Bm=pa*2,xa=(i=1.68)=>e=>da(e,+i),Om={[ss]:xa,Quad:xa(2),Cubic:xa(3),Quart:xa(4),Quint:xa(5),Sine:i=>1-Th(i*RS),Circ:i=>1-fa(1-i*i),Expo:i=>i?da(2,10*i-10):0,Bounce:i=>{let e,t=4;for(;i<((e=da(2,--t))-1)/11;);return 1/da(4,3-t)-7.5625*da((e*3-2)/22-i,2)},Back:(i=1.70158)=>e=>(+i+1)*e*e*e-+i*e*e,Elastic:(i=1,e=.3)=>{let t=Xe(+i,1,10),n=Xe(+e,Tt,2),s=n/Bm*lS(1/t),r=Bm/n;return a=>a===0||a===1?a:-t*da(2,-10*(1-a))*Eh((1-a-s)*r)}},oo={in:i=>e=>i(e),out:i=>e=>1-i(1-e),inOut:i=>e=>e<.5?i(e*2)/2:1-i(e*-2+2)/2,outIn:i=>e=>e<.5?(1-i(1-e*2))/2:(i(e*2-1)+1)/2},km=(i,e,t)=>{if(t[i])return t[i];if(i.indexOf("(")<=-1){let s=oo[i]||i.includes("Back")||i.includes("Elastic")?e[i]():e[i];return s?t[i]=s:ls}else{let n=i.slice(0,-1).split("("),s=e[n[0]];return s?t[i]=s(...n[1].split(",")):ls}},ci=(()=>{let i={linear:Nm,irregular:CS,steps:wS,cubicBezier:MS};for(let e in oo)for(let t in Om){let n=Om[t],s=oo[e];i[e+t]=t===ss||t==="Back"||t==="Elastic"?(r,a)=>s(n(r,a)):s(n)}return i})(),DS={linear:ls},_r=i=>ai(i)?i:ri(i)?km(i,ci,DS):ls,zm={},Uh=(i,e,t)=>{if(t===jt.TRANSFORM){let n=ua.get(i);return n||i}else if(t===jt.CSS||t===jt.ATTRIBUTE&&bh(e)&&i in e.style){let n=zm[i];if(n)return n;{let s=i&&xm(i);return zm[i]=s,s}}else return i},Nh={deg:1,rad:180/pa,turn:360},Hm={},Bh=(i,e,t,n=!1)=>{let s=e.u,r=e.n;if(e.t===St.UNIT&&s===t)return e;let a=r+s+t,o=Hm[a];if(!De(o)&&!n)e.n=o;else{let l;if(s in Nh)l=r*Nh[s]/Nh[t];else{let c=100,u=i.cloneNode(),h=i.parentNode,d=h&&h!==st?h:st.body;d.appendChild(u);let p=u.style;p.width=c+s;let g=u.offsetWidth||c;p.width=c+t;let v=u.offsetWidth||c,m=g/v;d.removeChild(u),l=m*r}e.n=l,Hm[a]=l}return e.t,St.UNIT,e.u=t,e},Sc=i=>{if(i._hasChildren)Lt(i,Sc,!0);else{let e=i;e.pause(),Lt(e,t=>{let n=t.property,s=t.target;if(s[mc]){let r=s.style,a=e._inlineStyles[n];if(t._tweenType===jt.TRANSFORM){let o=s[no];if(De(a)||a===ss?delete o[n]:o[n]=a,t._renderTransforms)if(!Object.keys(o).length)r.removeProperty("transform");else{let l=ss;for(let c in o)l+=Sh[c]+o[c]+") ";r.transform=l}}else De(a)||a===ss?r.removeProperty(n):r[n]=a;e._tail===t&&e.targets.forEach(o=>{o.getAttribute&&o.getAttribute("style")===ss&&o.removeAttribute("style")})}})}return i},ct=Ih(),gt=Ih(),bc={func:null},Ec=[null],ya=[null,null],Tc={to:null},PS=0,Is,Ui,IS=(i,e)=>{let t={};if(Pn(i)){let n=[].concat(...i.map(s=>Object.keys(s))).filter(ha);for(let s=0,r=n.length;s<r;s++){let a=n[s],o=i.map(l=>{let c={};for(let u in l){let h=l[u];ha(u)?u===a&&(c.to=h):c[u]=h}return c});t[a]=o}}else{let n=Ve(e.duration,ze.defaults.duration);Object.keys(i).map(r=>({o:parseFloat(r)/100,p:i[r]})).sort((r,a)=>r.o-a.o).forEach(r=>{let a=r.o,o=r.p;for(let l in o)if(ha(l)){let c=t[l];c||(c=t[l]=[]);let u=a*n,h=c.length,d=c[h-1],p={to:o[l]},g=0;for(let v=0;v<h;v++)g+=c[v].duration;h===1&&(p.from=d.to),o.ease&&(p.ease=o.ease),p.duration=u-(h?g:0),c.push(p)}return r});for(let r in t){let a=t[r],o;for(let l=0,c=a.length;l<c;l++){let u=a[l],h=u.ease;u.ease=o||void 0,o=h}a[0].duration||a.shift()}}return t},Ls=class extends Ln{constructor(e,t,n,s,r=!1,a=0,o=0){super(t,n,s);let l=yc(e),c=l.length,u=t.keyframes,h=u?ao(IS(u,t),t):t,{delay:d,duration:p,ease:g,playbackEase:v,modifier:m,composition:f,onRender:x}=h,_=n?n.defaults:ze.defaults,y=Ve(v,_.playbackEase),T=y?_r(y):null,M=!De(g)&&!De(g.ease),R=M?g.ease:Ve(g,T?"linear":_.ease),C=M?g.duration:Ve(p,_.duration),b=Ve(d,_.delay),S=m||_.modifier,D=De(f)&&c>=Kt?dn.none:De(f)?_.composition:f,U={},O=this._offset+(n?n._offset:0),B=NaN,G=NaN,N=0,I=0;for(let P=0;P<c;P++){let F=l[P],J=a||P,oe=o||c,_e=NaN,ce=NaN;for(let X in h)if(ha(X)){let Z=Ph(F,X),ie=Uh(X,F,Z),he=h[X],Le=Pn(he);if(r&&!Le&&(ya[0]=he,ya[1]=he,he=ya),Le){let L=he.length,Dt=!gn(he[0]);L===2&&Dt?(Tc.to=he,Ec[0]=Tc,Is=Ec):L>2&&Dt?(Is=[],he.forEach((Be,qe)=>{qe?qe===1?(ya[1]=Be,Is.push(ya)):Is.push(Be):ya[0]=Be})):Is=he}else Ec[0]=he,Is=Ec;let Ce=null,He=null,Je=NaN,We=0,Ke=0;for(let L=Is.length;Ke<L;Ke++){let Dt=Is[Ke];gn(Dt)?Ui=Dt:(Tc.to=Dt,Ui=Tc),bc.func=null;let Be=jn(Ui.to,F,J,oe,bc),qe;gn(Be)&&!De(Be.to)?(Ui=Be,qe=Be.to):qe=Be;let Fe=jn(Ui.from,F,J,oe),pe=Ui.ease,ve=!De(pe)&&!De(pe.ease),w=ve?pe.ease:pe||R,A=ve?pe.duration:jn(Ve(Ui.duration,L>1?jn(C,F,J,oe)/L:C),F,J,oe),Y=jn(Ve(Ui.delay,Ke?0:b),F,J,oe),$=jn(Ve(Ui.composition,D),F,J,oe),se=Li($)?$:dn[$],te=Ui.modifier||S,j=!De(Fe),K=!De(qe),ae=Pn(qe),Ee=ae||j&&K,re=He?We+Y:Y,me=O+re;!I&&(j||ae)&&(I=1);let Ue=He;if(se!==dn.none){Ce||(Ce=Lh(F,ie));let Ne=Ce._head;for(;Ne&&!Ne._isOverridden&&Ne._absoluteStartTime<=me;)if(Ue=Ne,Ne=Ne._nextRep,Ne&&Ne._absoluteStartTime>=me)for(;Ne;)_c(Ne),Ne=Ne._nextRep}if(Ee?(li(ae?jn(qe[0],F,J,oe):Fe,ct),li(ae?jn(qe[1],F,J,oe,bc):qe,gt),ct.t===St.NUMBER&&(Ue?Ue._valueType===St.UNIT&&(ct.t=St.UNIT,ct.u=Ue._unit):(li(ga(F,ie,Z,U),In),In.t===St.UNIT&&(ct.t=St.UNIT,ct.u=In.u)))):(K?li(qe,gt):He?Pm(He,gt):li(n&&Ue&&Ue.parent.parent===n?Ue._value:ga(F,ie,Z,U),gt),j?li(Fe,ct):He?Pm(He,ct):li(n&&Ue&&Ue.parent.parent===n?Ue._value:ga(F,ie,Z,U),ct)),ct.o&&(ct.n=va(Ue?Ue._toNumber:li(ga(F,ie,Z,U),In).n,ct.n,ct.o)),gt.o&&(gt.n=va(ct.n,gt.n,gt.o)),ct.t!==gt.t){if(ct.t===St.COMPLEX||gt.t===St.COMPLEX){let Ne=ct.t===St.COMPLEX?ct:gt,Ge=ct.t===St.COMPLEX?gt:ct;Ge.t=St.COMPLEX,Ge.s=wn(Ne.s),Ge.d=Ne.d.map(()=>Ge.n)}else if(ct.t===St.UNIT||gt.t===St.UNIT){let Ne=ct.t===St.UNIT?ct:gt,Ge=ct.t===St.UNIT?gt:ct;Ge.t=St.UNIT,Ge.u=Ne.u}else if(ct.t===St.COLOR||gt.t===St.COLOR){let Ne=ct.t===St.COLOR?ct:gt,Ge=ct.t===St.COLOR?gt:ct;Ge.t=St.COLOR,Ge.s=Ne.s,Ge.d=[0,0,0,1]}}if(ct.u!==gt.u){let Ne=gt.u?ct:gt;Ne=Bh(F,Ne,gt.u?gt.u:ct.u,!1)}if(gt.d&&ct.d&&gt.d.length!==ct.d.length){let Ne=ct.d.length>gt.d.length?ct:gt,Ge=Ne===ct?gt:ct;Ge.d=Ne.d.map((Pt,z)=>De(Ge.d[z])?0:Ge.d[z]),Ge.s=wn(Ne.s)}let Qe=Pe(+A||Tt,12),Me={parent:this,id:PS++,property:ie,target:F,_value:null,_func:bc.func,_ease:_r(w),_fromNumbers:wn(ct.d),_toNumbers:wn(gt.d),_strings:wn(gt.s),_fromNumber:ct.n,_toNumber:gt.n,_numbers:wn(ct.d),_number:ct.n,_unit:gt.u,_modifier:te,_currentTime:0,_startTime:re,_delay:+Y,_updateDuration:Qe,_changeDuration:Qe,_absoluteStartTime:me,_tweenType:Z,_valueType:gt.t,_composition:se,_isOverlapped:0,_isOverridden:0,_renderTransforms:0,_prevRep:null,_nextRep:null,_prevAdd:null,_nextAdd:null,_prev:null,_next:null};se!==dn.none&&Im(Me,Ce),isNaN(Je)&&(Je=Me._startTime),We=Pe(re+Qe,12),He=Me,N++,os(this,Me)}(isNaN(G)||Je<G)&&(G=Je),(isNaN(B)||We>B)&&(B=We),Z===jt.TRANSFORM&&(_e=N-Ke,ce=N)}if(!isNaN(_e)){let X=0;Lt(this,Z=>{X>=_e&&X<ce&&(Z._renderTransforms=1,Z._composition===dn.blend&&Lt(ma.animation,ie=>{ie.id===Z.id&&(ie._renderTransforms=1)})),X++})}}c||console.warn("No target found. Make sure the element you're trying to animate is accessible before creating your animation."),G?(Lt(this,P=>{P._startTime-P._delay||(P._delay-=G),P._startTime-=G}),B-=G):G=0,B||(B=Tt,this.iterationCount=0),this.targets=l,this.duration=B===Tt?Tt:ro((B+this._loopDelay)*this.iterationCount-this._loopDelay)||Tt,this.onRender=x||_.onRender,this._ease=T,this._delay=G,this.iterationDuration=B,this._inlineStyles=U,!this._autoplay&&I&&this.onRender(this)}stretch(e){let t=this.duration;if(t===yr(e))return this;let n=e/t;return Lt(this,s=>{s._updateDuration=yr(Pe(s._updateDuration*n,12)),s._changeDuration=yr(Pe(s._changeDuration*n,12)),s._currentTime*=n,s._startTime*=n,s._absoluteStartTime*=n}),super.stretch(e)}refresh(){return Lt(this,e=>{let t=ga(e.target,e.property,e._tweenType);li(t,In),e._fromNumbers=wn(In.d),e._fromNumber=In.n,e._func&&(li(e._func(),gt),e._toNumbers=wn(gt.d),e._strings=wn(gt.s),e._toNumber=gt.n)}),this}revert(){return super.revert(),Sc(this)}then(e){return super.then(e)}},Ie=(i,e)=>new Ls(i,e,null,0,!1).init(),Mc=(i,e=100)=>{let t=[];for(let n=0;n<=e;n++)t.push(i(n/e));return`linear(${t.join(", ")})`},Oh={in:"ease-in",out:"ease-out",inOut:"ease-in-out"},LS=(()=>{let i={};for(let e in oo)i[e]=t=>oo[e](xa(t));return i})(),kh=i=>{let e=Oh[i];if(e)return e;if(e="linear",ri(i))if(ln(i,"linear")||ln(i,"cubic-")||ln(i,"steps")||ln(i,"ease"))e=i;else if(ln(i,"cubicB"))e=xm(i);else{let t=km(i,LS,Oh);ai(t)&&(e=t===ls?"linear":Mc(t))}else if(ai(i)){let t=Mc(i);t&&(e=t)}else i.ease&&(e=Mc(i.ease));return Oh[i]=e},Gm=["x","y","z"],FS=["perspective","width","height","margin","padding","top","right","bottom","left","borderWidth","fontSize","borderRadius",...Gm],US=[...Gm,...io.filter(i=>["X","Y","Z"].some(e=>i.endsWith(e)))],Vm=Ii&&(De(CSS)||!Object.hasOwnProperty.call(CSS,"registerProperty")),NS=()=>{io.forEach(i=>{let e=ln(i,"skew"),t=ln(i,"scale"),n=ln(i,"rotate"),s=ln(i,"translate"),r=n||e,a=r?"<angle>":t?"<number>":s?"<length-percentage>":"*";CSS.registerProperty({name:"--"+i,syntax:a,inherits:!1,initialValue:s?"0px":r?"0deg":t?"1":"0"})}),Vm=!0},zh={_head:null,_tail:null},Hh=(i,e,t)=>{let n=zh._head;for(;n;){let s=n._next,r=n.$el===i,a=!e||n.property===e,o=!t||n.parent===t;if(r&&a&&o){let l=n.animation;try{l.commitStyles()}catch{}l.cancel(),as(zh,n);let c=n.parent;c&&(c._completed++,c.animations.length===c._completed&&(c.completed=!0,c.muteCallbacks||(c.paused=!0,c.onComplete(c),c._resolve(c))))}n=s}},Wm=(i,e,t,n,s)=>{let r=e.animate(n,s),a=s.delay+ +s.duration*s.iterations;r.playbackRate=i._speed,i.paused&&r.pause(),i.duration<a&&(i.duration=a,i.controlAnimation=r),i.animations.push(r),Hh(e,t),os(zh,{parent:i,animation:r,$el:e,property:t,_next:null,_prev:null});let o=()=>{Hh(e,t,i)};return r.onremove=o,r.onfinish=o,r},lo=(i,e,t,n,s)=>{let r=jn(e,t,n,s);return Li(r)?FS.includes(i)||ln(i,"translate")?`${r}px`:ln(i,"rotate")||ln(i,"skew")?`${r}deg`:`${r}`:r},Xm=(i,e,t,n,s,r)=>{let a="0",o=De(n)?getComputedStyle(i)[e]:lo(e,n,i,s,r);return De(t)?a=Pn(n)?n.map(l=>lo(e,l,i,s,r)):o:a=[lo(e,t,i,s,r),o],a},Ym=class{constructor(e,t){ze.scope&&ze.scope.revertibles.push(this),Vm||NS();let n=yc(e),s=n.length;s||console.warn("No target found. Make sure the element you're trying to animate is accessible before creating your animation.");let r=Ve(t.ease,kh(ze.defaults.ease)),a=r.ease&&r,o=Ve(t.autoplay,ze.defaults.autoplay),l=o&&o.link?o:!1,c=t.alternate&&t.alternate===!0,u=t.reversed&&t.reversed===!0,h=Ve(t.loop,ze.defaults.loop),d=h===!0||h===1/0?1/0:Li(h)?h+1:1,p=c?u?"alternate-reverse":"alternate":u?"reverse":"normal",g="forwards",v=kh(r),m=ze.timeScale===1?1:Kt;this.targets=n,this.animations=[],this.controlAnimation=null,this.onComplete=t.onComplete||lt,this.duration=0,this.muteCallbacks=!1,this.completed=!1,this.paused=!o||l!==!1,this.reversed=u,this.autoplay=o,this._speed=Ve(t.playbackRate,ze.defaults.playbackRate),this._resolve=lt,this._completed=0,this._inlineStyles=n.map(f=>f.getAttribute("style")),n.forEach((f,x)=>{let _=f[no],y=US.some(C=>t.hasOwnProperty(C)),T=(a?a.duration:jn(Ve(t.duration,ze.defaults.duration),f,x,s))*m,M=jn(Ve(t.delay,ze.defaults.delay),f,x,s)*m,R=Ve(t.composition,"replace");for(let C in t){if(!ha(C))continue;let b={},S={iterations:d,direction:p,fill:g,easing:v,duration:T,delay:M,composite:R},D=t[C],U=y?io.includes(C)?C:ua.get(C):!1,O;if(gn(D)){let B=D,G=Ve(B.ease,r),N=G.ease&&G,I=B.to,P=B.from;if(S.duration=(N?N.duration:jn(Ve(B.duration,T),f,x,s))*m,S.delay=jn(Ve(B.delay,M),f,x,s)*m,S.composite=Ve(B.composition,R),S.easing=kh(G),O=Xm(f,C,P,I,x,s),U?(b[`--${U}`]=O,_[U]=O):b[C]=Xm(f,C,P,I,x,s),Wm(this,f,C,b,S),!De(P))if(!U)f.style[C]=b[C][0];else{let F=`--${U}`;f.style.setProperty(F,b[F][0])}}else O=Pn(D)?D.map(B=>lo(C,B,f,x,s)):lo(C,D,f,x,s),U?(b[`--${U}`]=O,_[U]=O):b[C]=O,Wm(this,f,C,b,S)}if(y){let C=ss;for(let b in _)C+=`${Sh[b]}var(--${b})) `;f.style.transform=C}}),l&&this.autoplay.link(this)}forEach(e){let t=ri(e)?n=>n[e]():e;return this.animations.forEach(t),this}get speed(){return this._speed}set speed(e){this._speed=+e,this.forEach(t=>t.playbackRate=e)}get currentTime(){let e=this.controlAnimation,t=ze.timeScale;return this.completed?this.duration:e?+e.currentTime*(t===1?1:t):0}set currentTime(e){let t=e*(ze.timeScale===1?1:Kt);this.forEach(n=>n.currentTime=t)}get progress(){return this.currentTime/this.duration}set progress(e){this.forEach(t=>t.currentTime=e*this.duration||0)}resume(){return this.paused?(this.paused=!1,this.forEach("play")):this}pause(){return this.paused?this:(this.paused=!0,this.forEach("pause"))}alternate(){return this.reversed=!this.reversed,this.forEach("reverse"),this.paused&&this.forEach("pause"),this}play(){return this.reversed&&this.alternate(),this.resume()}reverse(){return this.reversed||this.alternate(),this.resume()}seek(e,t=!1){return t&&(this.muteCallbacks=!0),e<this.duration&&(this.completed=!1),this.currentTime=e,this.muteCallbacks=!1,this.paused&&this.pause(),this}restart(){return this.completed=!1,this.seek(0,!0).resume()}commitStyles(){return this.forEach("commitStyles")}complete(){return this.seek(this.duration)}cancel(){return this.forEach("cancel"),this.pause()}revert(){return this.cancel(),this.targets.forEach((e,t)=>e.setAttribute("style",this._inlineStyles[t])),this}then(e=lt){let t=this.then,n=()=>{this.then=null,e(this),this.then=t,this._resolve=lt};return new Promise(s=>(this._resolve=()=>s(n()),this.completed&&this._resolve(),this))}},Qm={animate:(i,e)=>new Ym(i,e),convertEase:Mc},qm=(i=lt)=>new Ln({duration:1*ze.timeScale,onComplete:i},null,0).resume();function Fs(i,e,t){let n=yc(i);if(!n.length)return;let[s]=n,r=Ph(s,e),a=Uh(e,s,r),o=ga(s,a);if(De(t))return o;if(li(o,In),In.t===St.NUMBER||In.t===St.UNIT){if(t===!1)return In.n;{let l=Bh(s,In,t,!1);return`${Pe(l.n,ze.precision)}${l.u}`}}}var cs=(i,e)=>{if(!De(e))return e.duration=Tt,e.composition=Ve(e.composition,dn.none),new Ls(i,e,null,0,!0).resume()},jm=(i,e,t)=>{let n=!1;return Lt(e,s=>{let r=s.target;if(i.includes(r)){let a=s.property,o=s._tweenType,l=Uh(t,r,o);(!l||l&&l===a)&&(s.parent._tail===s&&s._tweenType===jt.TRANSFORM&&s._prev&&s._prev._tweenType===jt.TRANSFORM&&(s._prev._renderTransforms=1),as(e,s),Lm(s),n=!0)}},!0),n},us=(i,e,t)=>{let n=oi(i),s=e||tn,r=e&&e.controlAnimation&&e;for(let o=0,l=n.length;o<l;o++){let c=n[o];Hh(c,t,r)}let a;if(s._hasChildren){let o=0;Lt(s,l=>{if(!l._hasChildren)if(a=jm(n,l,t),a&&!l._head)l.cancel(),as(s,l);else{let u=l._offset+l._delay+l.duration;u>o&&(o=u)}l._head?us(i,l,t):l._hasChildren=!1},!0),De(s.iterationDuration)||(s.iterationDuration=o)}else a=jm(n,s,t);return a&&!s._head&&(s._hasChildren=!1,s.cancel&&s.cancel()),n},Gh=(i,e,t)=>{let n=10**(t||0);return so((Math.random()*(e-i+1/n)+i)*n)/n},BS=i=>i[Gh(0,i.length-1)],OS=i=>{let e=i.length,t,n;for(;e;)n=Gh(0,--e),t=i[e],i[e]=i[n],i[n]=t;return i},kS=(i,e)=>(+i).toFixed(e),zS=(i,e,t)=>`${i}`.padStart(e,t),HS=(i,e,t)=>`${i}`.padEnd(e,t),GS=(i,e,t)=>((i-e)%(t-e)+(t-e))%(t-e)+e,co=(i,e,t,n,s)=>n+(i-e)/(t-e)*(s-n),VS=i=>i*pa/180,WS=i=>i*180/pa,Zm=(i,e,t,n)=>{let s=Kt/ze.defaults.frameRate;if(n!==!1){let a=n||tn._hasChildren&&tn;a&&a.deltaTime&&(s=a.deltaTime)}let r=1-Math.exp(-t*s*.1);return t?t===1?e:(1-r)*i+r*e:i},XS=(i,e=0)=>(...t)=>e?n=>i(...t,n):n=>i(n,...t),Km=i=>(...e)=>{let t=i(...e);return new Proxy(lt,{apply:(n,s,[r])=>t(r),get:(n,s)=>Km((...r)=>{let a=V[s](...r);return o=>a(t(o))})})},bi=(i,e=0)=>(...t)=>(t.length<i.length?Km(XS(i,e)):i)(...t),V={$:yc,get:Fs,set:cs,remove:us,cleanInlineStyles:Sc,random:Gh,randomPick:BS,shuffle:OS,lerp:Zm,sync:qm,clamp:bi(Xe),round:bi(Pe),snap:bi(xr),wrap:bi(GS),interpolate:bi(rs,1),mapRange:bi(co),roundPad:bi(kS),padStart:bi(zS),padEnd:bi(HS),degToRad:bi(VS),radToDeg:bi(WS)},YS=(i,e)=>{if(ln(e,"<")){let t=e[1]==="<",n=i._tail,s=n?n._offset+n._delay:0;return t?s:s+n.duration}},wc=(i,e)=>{let t=i.iterationDuration;if(t===Tt&&(t=0),De(e))return t;if(Li(+e))return+e;let n=e,s=i?i.labels:null,r=!gc(s),a=YS(i,n),o=!De(a),l=mm.exec(n);if(l){let c=l[0],u=n.split(c),h=r&&u[0]?s[u[0]]:t,d=o?a:r?h:t,p=+u[1];return va(d,p,c[0])}else return o?a:r?De(s[n])?t:s[n]:t};function QS(i){return ro((i.iterationDuration+i._loopDelay)*i.iterationCount-i._loopDelay)||Tt}function Vh(i,e,t,n,s,r){let o=Li(i.duration)&&i.duration<=Tt?t-Tt:t;Ar(e,o,1,1,Qn.AUTO);let l=n?new Ls(n,i,e,o,!1,s,r):new Ln(i,e,o);return l.init(1),os(e,l),Lt(e,c=>{let h=c._offset+c._delay+c.duration;h>e.iterationDuration&&(e.iterationDuration=h)}),e.duration=QS(e),e}var Jm=class extends Ln{constructor(e={}){super(e,null,0);this.duration=0,this.labels={};let t=e.defaults,n=ze.defaults;this.defaults=t?ao(t,n):n,this.onRender=e.onRender||n.onRender;let s=Ve(e.playbackEase,n.playbackEase);this._ease=s?_r(s):null,this.iterationDuration=0}add(e,t,n){let s=gn(t),r=gn(e);if(s||r){if(this._hasChildren=!0,s){let a=t;if(ai(n)){let o=n,l=oi(e),c=this.duration,u=this.iterationDuration,h=a.id,d=0,p=l.length;l.forEach(g=>{let v={...a};this.duration=c,this.iterationDuration=u,De(h)||(v.id=h+"-"+d),Vh(v,this,o(g,d,p,this),g,d,p),d++})}else Vh(a,this,wc(this,n),e)}else Vh(e,this,wc(this,t));return this.init(1)}}sync(e,t){if(De(e)||e&&De(e.pause))return this;e.pause();let n=+(e.effect?e.effect.getTiming().duration:e.duration);return this.add(e,{currentTime:[0,n],duration:n,ease:"linear"},t)}set(e,t,n){return De(t)?this:(t.duration=Tt,t.composition=dn.replace,this.add(e,t,n))}call(e,t){return De(e)||e&&!ai(e)?this:this.add({duration:0,onComplete:()=>e(this)},t)}label(e,t){return De(e)||e&&!ri(e)?this:(this.labels[e]=wc(this,t),this)}remove(e,t){return us(e,this,t),this}stretch(e){let t=this.duration;if(t===yr(e))return this;let n=e/t,s=this.labels;Lt(this,r=>{r.stretch(r.duration*n)});for(let r in s)s[r]*=n;return super.stretch(e)}refresh(){return Lt(this,e=>{e.refresh&&e.refresh()}),this}revert(){return super.revert(),Lt(this,e=>e.revert,!0),Sc(this)}then(e){return super.then(e)}},et=i=>new Jm(i).init(),Wh=class{constructor(e,t){ze.scope&&ze.scope.revertibles.push(this);let n={},s={};if(this.targets=[],this.animations={},!(De(e)||De(t))){for(let r in t){let a=t[r];ha(r)?s[r]=a:n[r]=a}for(let r in s){let a=s[r],o=gn(a),l={},c="+=0";if(o){let d=a.unit;ri(d)&&(c+=d)}else l.duration=a;l[r]=o?ao({to:c},a):c;let u=ao(n,l);u.composition=dn.replace,u.autoplay=!1;let h=this.animations[r]=new Ls(e,u,null,0,!1).init();this.targets.length||this.targets.push(...h.targets),this[r]=(d,p,g)=>{let v=h._head;if(De(d)&&v){let m=v._numbers;return m&&m.length?m:v._modifier(v._number)}else return Lt(h,m=>{if(Pn(d))for(let f=0,x=d.length;f<x;f++)De(m._numbers[f])||(m._fromNumbers[f]=m._modifier(m._numbers[f]),m._toNumbers[f]=d[f]);else m._fromNumber=m._modifier(m._number),m._toNumber=d;De(g)||(m._ease=_r(g)),m._currentTime=0}),De(p)||h.stretch(p),h.reset(1).resume(),this}}}}revert(){for(let e in this.animations)this[e]=lt,this.animations[e].revert();return this.animations={},this.targets.length=0,this}},uo=(i,e)=>new Wh(i,e),$m=class{constructor(e={}){this.timeStep=.02,this.restThreshold=5e-4,this.restDuration=200,this.maxDuration=6e4,this.maxRestSteps=this.restDuration/this.timeStep/Kt,this.maxIterations=this.maxDuration/this.timeStep/Kt,this.m=Xe(Ve(e.mass,1),0,Kt),this.s=Xe(Ve(e.stiffness,100),1,Kt),this.d=Xe(Ve(e.damping,10),.1,Kt),this.v=Xe(Ve(e.velocity,0),-1e3,Kt),this.w0=0,this.zeta=0,this.wd=0,this.b=0,this.solverDuration=0,this.duration=0,this.compute(),this.ease=t=>t===0||t===1?t:this.solve(t*this.solverDuration)}solve(e){let{zeta:t,w0:n,wd:s,b:r}=this,a=e;return t<1?a=Sm(-a*t*n)*(1*Th(s*a)+r*Eh(s*a)):a=(1+r*a)*Sm(-a*n),1-a}compute(){let{maxRestSteps:e,maxIterations:t,restThreshold:n,timeStep:s,m:r,d:a,s:o,v:l}=this,c=this.w0=Xe(fa(o/r),Tt,Kt),u=this.zeta=a/(2*fa(o*r)),h=this.wd=u<1?c*fa(1-u*u):0;this.b=u<1?(u*c+-l)/h:-l+c;let d=0,p=0,g=0;for(;p<e&&g<t;)Fi(1-this.solve(d))<n?p++:p=0,this.solverDuration=d,d+=s,g++;this.duration=Pe(this.solverDuration*Kt,0)*ze.timeScale}get mass(){return this.m}set mass(e){this.m=Xe(Ve(e,1),0,Kt),this.compute()}get stiffness(){return this.s}set stiffness(e){this.s=Xe(Ve(e,100),1,Kt),this.compute()}get damping(){return this.d}set damping(e){this.d=Xe(Ve(e,10),.1,Kt),this.compute()}get velocity(){return this.v}set velocity(e){this.v=Xe(Ve(e,0),-1e3,Kt),this.compute()}},Ei=i=>new $m(i),Us=i=>{i.cancelable&&i.preventDefault()},eg=class{constructor(e){this.el=e,this.zIndex=0,this.parentElement=null,this.classList={add:lt,remove:lt}}get x(){return this.el.x||0}set x(e){this.el.x=e}get y(){return this.el.y||0}set y(e){this.el.y=e}get width(){return this.el.width||0}set width(e){this.el.width=e}get height(){return this.el.height||0}set height(e){this.el.height=e}getBoundingClientRect(){return{top:this.y,right:this.x,bottom:this.y+this.height,left:this.x+this.width}}},tg=class{constructor(e){this.$el=e,this.inlineTransforms=[],this.point=new DOMPoint,this.inversedMatrix=this.getMatrix().inverse()}normalizePoint(e,t){return this.point.x=e,this.point.y=t,this.point.matrixTransform(this.inversedMatrix)}traverseUp(e){let t=this.$el.parentElement,n=0;for(;t&&t!==st;)e(t,n),t=t.parentElement,n++}getMatrix(){let e=new DOMMatrix;return this.traverseUp(t=>{let n=getComputedStyle(t).transform;if(n){let s=new DOMMatrix(n);e.preMultiplySelf(s)}}),e}remove(){this.traverseUp((e,t)=>{this.inlineTransforms[t]=e.style.transform,e.style.transform="none"})}revert(){this.traverseUp((e,t)=>{let n=this.inlineTransforms[t];n===""?e.style.removeProperty("transform"):e.style.transform=n})}},Fn=(i,e)=>i&&ai(i)?i(e):i,Cc=0,ng=class{constructor(e,t={}){if(!e)return;ze.scope&&ze.scope.revertibles.push(this);let n=t.x,s=t.y,r=t.trigger,a=t.modifier,o=t.releaseEase,l=o&&_r(o),c=!De(o)&&!De(o.ease),u=gn(n)&&!De(n.mapTo)?n.mapTo:"translateX",h=gn(s)&&!De(s.mapTo)?s.mapTo:"translateY",d=Fn(t.container,this);this.containerArray=Pn(d)?d:null,this.$container=d&&!this.containerArray?oi(d)[0]:st.body,this.useWin=this.$container===st.body,this.$scrollContainer=this.useWin?Mn:this.$container,this.$target=gn(e)?new eg(e):oi(e)[0],this.$trigger=oi(r||e)[0],this.fixed=Fs(this.$target,"position")==="fixed",this.isFinePointer=!0,this.containerPadding=[0,0,0,0],this.containerFriction=0,this.releaseContainerFriction=0,this.snapX=0,this.snapY=0,this.scrollSpeed=0,this.scrollThreshold=0,this.dragSpeed=0,this.maxVelocity=0,this.minVelocity=0,this.velocityMultiplier=0,this.cursor=!1,this.releaseXSpring=c?o:Ei({mass:Ve(t.releaseMass,1),stiffness:Ve(t.releaseStiffness,80),damping:Ve(t.releaseDamping,20)}),this.releaseYSpring=c?o:Ei({mass:Ve(t.releaseMass,1),stiffness:Ve(t.releaseStiffness,80),damping:Ve(t.releaseDamping,20)}),this.releaseEase=l||ci.outQuint,this.hasReleaseSpring=c,this.onGrab=t.onGrab||lt,this.onDrag=t.onDrag||lt,this.onRelease=t.onRelease||lt,this.onUpdate=t.onUpdate||lt,this.onSettle=t.onSettle||lt,this.onSnap=t.onSnap||lt,this.onResize=t.onResize||lt,this.onAfterResize=t.onAfterResize||lt,this.disabled=[0,0];let p={};if(a&&(p.modifier=a),De(n)||n===!0)p[u]=0;else if(gn(n)){let g=n,v={};g.modifier&&(v.modifier=g.modifier),g.composition&&(v.composition=g.composition),p[u]=v}else n===!1&&(p[u]=0,this.disabled[0]=1);if(De(s)||s===!0)p[h]=0;else if(gn(s)){let g=s,v={};g.modifier&&(v.modifier=g.modifier),g.composition&&(v.composition=g.composition),p[h]=v}else s===!1&&(p[h]=0,this.disabled[1]=1);this.animate=new Wh(this.$target,p),this.xProp=u,this.yProp=h,this.destX=0,this.destY=0,this.deltaX=0,this.deltaY=0,this.scroll={x:0,y:0},this.coords=[this.x,this.y,0,0],this.snapped=[0,0],this.pointer=[0,0,0,0,0,0,0,0],this.scrollView=[0,0],this.dragArea=[0,0,0,0],this.containerBounds=[-1e12,ca,ca,-1e12],this.scrollBounds=[0,0,0,0],this.targetBounds=[0,0,0,0],this.window=[0,0],this.velocityStack=[0,0,0],this.velocityStackIndex=0,this.velocityTime=gr(),this.velocity=0,this.angle=0,this.cursorStyles=null,this.triggerStyles=null,this.bodyStyles=null,this.targetStyles=null,this.touchActionStyles=null,this.transforms=new tg(this.$target),this.overshootCoords={x:0,y:0},this.overshootXTicker=new Ln({autoplay:!1},null,0).init(),this.overshootYTicker=new Ln({autoplay:!1},null,0).init(),this.updateTicker=new Ln({autoplay:!1},null,0).init(),this.overshootXTicker.onUpdate=()=>{this.disabled[0]||(this.updated=!0,this.manual=!0,this.animate[this.xProp](this.overshootCoords.x,0))},this.overshootXTicker.onComplete=()=>{this.disabled[0]||(this.manual=!1,this.animate[this.xProp](this.overshootCoords.x,0))},this.overshootYTicker.onUpdate=()=>{this.disabled[1]||(this.updated=!0,this.manual=!0,this.animate[this.yProp](this.overshootCoords.y,0))},this.overshootYTicker.onComplete=()=>{this.disabled[1]||(this.manual=!1,this.animate[this.yProp](this.overshootCoords.y,0))},this.updateTicker.onUpdate=()=>this.update(),this.contained=!De(d),this.manual=!1,this.grabbed=!1,this.dragged=!1,this.updated=!1,this.released=!1,this.canScroll=!1,this.enabled=!1,this.initialized=!1,this.activeProp=this.disabled[0]?h:u,this.animate.animations[this.activeProp].onRender=()=>{let g=this.updated,m=!(this.grabbed&&g)&&this.released,f=this.x,x=this.y,_=f-this.coords[2],y=x-this.coords[3];this.deltaX=_,this.deltaY=y,this.coords[2]=f,this.coords[3]=x,g&&this.onUpdate(this),m?(this.computeVelocity(_,y),this.angle=vc(y,_)):this.updated=!1},this.animate.animations[this.activeProp].onComplete=()=>{!this.grabbed&&this.released&&(this.released=!1),this.manual||(this.deltaX=0,this.deltaY=0,this.velocity=0,this.velocityStack[0]=0,this.velocityStack[1]=0,this.velocityStack[2]=0,this.velocityStackIndex=0,this.onSettle(this))},this.resizeTicker=new Ln({autoplay:!1,duration:150*ze.timeScale,onComplete:()=>{this.onResize(this),this.refresh(),this.onAfterResize(this)}}).init(),this.parameters=t,this.resizeObserver=new ResizeObserver(()=>{this.initialized?this.resizeTicker.restart():this.initialized=!0}),this.enable(),this.refresh(),this.resizeObserver.observe(this.$container),gn(e)||this.resizeObserver.observe(this.$target)}computeVelocity(e,t){let n=this.velocityTime,s=gr(),r=s-n;if(r<17)return this.velocity;this.velocityTime=s;let a=this.velocityStack,o=this.velocityMultiplier,l=this.minVelocity,c=this.maxVelocity,u=this.velocityStackIndex;a[u]=Pe(Xe(fa(e*e+t*t)/r*o,l,c),5);let h=bm(a[0],a[1],a[2]);return this.velocity=h,this.velocityStackIndex=(u+1)%3,h}setX(e,t=!1){if(this.disabled[0])return;let n=Pe(e,5);return this.overshootXTicker.pause(),this.manual=!0,this.updated=!t,this.destX=n,this.snapped[0]=xr(n,this.snapX),this.animate[this.xProp](n,0),this.manual=!1,this}setY(e,t=!1){if(this.disabled[1])return;let n=Pe(e,5);return this.overshootYTicker.pause(),this.manual=!0,this.updated=!t,this.destY=n,this.snapped[1]=xr(n,this.snapY),this.animate[this.yProp](n,0),this.manual=!1,this}get x(){return Pe(this.animate[this.xProp](),ze.precision)}set x(e){this.setX(e,!1)}get y(){return Pe(this.animate[this.yProp](),ze.precision)}set y(e){this.setY(e,!1)}get progressX(){return co(this.x,this.containerBounds[3],this.containerBounds[1],0,1)}set progressX(e){this.setX(co(e,0,1,this.containerBounds[3],this.containerBounds[1]),!1)}get progressY(){return co(this.y,this.containerBounds[0],this.containerBounds[2],0,1)}set progressY(e){this.setY(co(e,0,1,this.containerBounds[0],this.containerBounds[2]),!1)}updateScrollCoords(){let e=Pe(this.useWin?Mn.scrollX:this.$container.scrollLeft,0),t=Pe(this.useWin?Mn.scrollY:this.$container.scrollTop,0),[n,s,r,a]=this.containerPadding,o=this.scrollThreshold;this.scroll.x=e,this.scroll.y=t,this.scrollBounds[0]=t-this.targetBounds[0]+n-o,this.scrollBounds[1]=e-this.targetBounds[1]-s+o,this.scrollBounds[2]=t-this.targetBounds[2]-r+o,this.scrollBounds[3]=e-this.targetBounds[3]+a-o}updateBoundingValues(){let e=this.$container,t=this.x,n=this.y,s=this.coords[2],r=this.coords[3];this.coords[2]=0,this.coords[3]=0,this.setX(0,!0),this.setY(0,!0),this.transforms.remove();let a=this.window[0]=Mn.innerWidth,o=this.window[1]=Mn.innerHeight,l=this.useWin,c=e.scrollWidth,u=e.scrollHeight,h=this.fixed,d=e.getBoundingClientRect(),[p,g,v,m]=this.containerPadding;this.dragArea[0]=l?0:d.left,this.dragArea[1]=l?0:d.top,this.scrollView[0]=l?Xe(c,a,c):c,this.scrollView[1]=l?Xe(u,o,u):u,this.updateScrollCoords();let{width:f,height:x,left:_,top:y,right:T,bottom:M}=e.getBoundingClientRect();this.dragArea[2]=Pe(l?Xe(f,a,a):f,0),this.dragArea[3]=Pe(l?Xe(x,o,o):x,0);let R=Fs(e,"overflow"),C=R==="visible",b=R==="hidden";if(this.canScroll=h?!1:this.contained&&(e===st.body&&C||!b&&!C)&&(c>this.dragArea[2]+m-g||u>this.dragArea[3]+p-v)&&(!this.containerArray||this.containerArray&&!Pn(this.containerArray)),this.contained){let S=this.scroll.x,D=this.scroll.y,U=this.canScroll,O=this.$target.getBoundingClientRect(),B=U?l?0:e.scrollLeft:0,G=U?l?0:e.scrollTop:0,N=U?this.scrollView[0]-B-f:0,I=U?this.scrollView[1]-G-x:0;this.targetBounds[0]=Pe(O.top+D-(l?0:y),0),this.targetBounds[1]=Pe(O.right+S-(l?a:T),0),this.targetBounds[2]=Pe(O.bottom+D-(l?o:M),0),this.targetBounds[3]=Pe(O.left+S-(l?0:_),0),this.containerArray?(this.containerBounds[0]=this.containerArray[0]+p,this.containerBounds[1]=this.containerArray[1]-g,this.containerBounds[2]=this.containerArray[2]-v,this.containerBounds[3]=this.containerArray[3]+m):(this.containerBounds[0]=-Pe(O.top-(h?Xe(y,0,o):y)+G-p,0),this.containerBounds[1]=-Pe(O.right-(h?Xe(T,0,a):T)-N+g,0),this.containerBounds[2]=-Pe(O.bottom-(h?Xe(M,0,o):M)-I+v,0),this.containerBounds[3]=-Pe(O.left-(h?Xe(_,0,a):_)+B-m,0))}this.transforms.revert(),this.coords[2]=s,this.coords[3]=r,this.setX(t,!0),this.setY(n,!0)}isOutOfBounds(e,t,n){if(!this.contained)return 0;let[s,r,a,o]=e,[l,c]=this.disabled,u=!l&&t<o||!l&&t>r,h=!c&&n<s||!c&&n>a;return u&&!h?1:!u&&h?2:u&&h?3:0}refresh(){let e=this.parameters,t=e.x,n=e.y,s=Fn(e.container,this),r=Fn(e.containerPadding,this)||0,a=Pn(r)?r:[r,r,r,r],o=this.x,l=this.y,c=Fn(e.cursor,this),u={onHover:"grab",onGrab:"grabbing"};if(c){let{onHover:v,onGrab:m}=c;v&&(u.onHover=v),m&&(u.onGrab=m)}this.containerArray=Pn(s)?s:null,this.$container=s&&!this.containerArray?oi(s)[0]:st.body,this.useWin=this.$container===st.body,this.$scrollContainer=this.useWin?Mn:this.$container,this.isFinePointer=matchMedia("(pointer:fine)").matches,this.containerPadding=Ve(a,[0,0,0,0]),this.containerFriction=Xe(Ve(Fn(e.containerFriction,this),.8),0,1),this.releaseContainerFriction=Xe(Ve(Fn(e.releaseContainerFriction,this),this.containerFriction),0,1),this.snapX=Fn(gn(t)&&!De(t.snap)?t.snap:e.snap,this),this.snapY=Fn(gn(n)&&!De(n.snap)?n.snap:e.snap,this),this.scrollSpeed=Ve(Fn(e.scrollSpeed,this),1.5),this.scrollThreshold=Ve(Fn(e.scrollThreshold,this),20),this.dragSpeed=Ve(Fn(e.dragSpeed,this),1),this.minVelocity=Ve(Fn(e.minVelocity,this),0),this.maxVelocity=Ve(Fn(e.maxVelocity,this),50),this.velocityMultiplier=Ve(Fn(e.velocityMultiplier,this),1),this.cursor=c===!1?!1:u,this.updateBoundingValues();let[h,d,p,g]=this.containerBounds;this.setX(Xe(o,g,d),!0),this.setY(Xe(l,h,p),!0)}update(){if(this.updateScrollCoords(),this.canScroll){let[x,_,y,T]=this.containerPadding,[M,R]=this.scrollView,C=this.dragArea[2],b=this.dragArea[3],S=this.scroll.x,D=this.scroll.y,U=this.$container.scrollWidth,O=this.$container.scrollHeight,B=this.useWin?Xe(U,this.window[0],U):U,G=this.useWin?Xe(O,this.window[1],O):O,N=M-B,I=R-G;this.dragged&&N>0&&(this.coords[0]-=N,this.scrollView[0]=B),this.dragged&&I>0&&(this.coords[1]-=I,this.scrollView[1]=G);let P=this.scrollSpeed*10,F=this.scrollThreshold,[J,oe]=this.coords,[_e,ce,X,Z]=this.scrollBounds,ie=Pe(Xe((oe-_e+x)/F,-1,0)*P,0),he=Pe(Xe((J-ce-_)/F,0,1)*P,0),Le=Pe(Xe((oe-X-y)/F,0,1)*P,0),Ce=Pe(Xe((J-Z+T)/F,-1,0)*P,0);if(ie||Le||Ce||he){let[He,Je]=this.disabled,We=S,Ke=D;He||(We=Pe(Xe(S+(Ce||he),0,M-C),0),this.coords[0]-=S-We),Je||(Ke=Pe(Xe(D+(ie||Le),0,R-b),0),this.coords[1]-=D-Ke),this.useWin?this.$scrollContainer.scrollBy(-(S-We),-(D-Ke)):this.$scrollContainer.scrollTo(We,Ke)}}let[e,t,n,s]=this.containerBounds,[r,a,o,l,c,u]=this.pointer;this.coords[0]+=(r-c)*this.dragSpeed,this.coords[1]+=(a-u)*this.dragSpeed,this.pointer[4]=r,this.pointer[5]=a;let[h,d]=this.coords,[p,g]=this.snapped,v=(1-this.containerFriction)*this.dragSpeed;this.setX(h>t?t+(h-t)*v:h<s?s+(h-s)*v:h,!1),this.setY(d>n?n+(d-n)*v:d<e?e+(d-e)*v:d,!1),this.computeVelocity(r-c,a-u),this.angle=vc(a-l,r-o);let[m,f]=this.snapped;(m!==p&&this.snapX||f!==g&&this.snapY)&&this.onSnap(this)}stop(){this.updateTicker.pause(),this.overshootXTicker.pause(),this.overshootYTicker.pause();for(let e in this.animate.animations)this.animate.animations[e].pause();return us(this,null,"x"),us(this,null,"y"),us(this,null,"progressX"),us(this,null,"progressY"),us(this.scroll),us(this.overshootCoords),this}scrollInView(e,t=0,n=ci.inOutQuad){this.updateScrollCoords();let s=this.destX,r=this.destY,a=this.scroll,o=this.scrollBounds,l=this.canScroll;if(!this.containerArray&&this.isOutOfBounds(o,s,r)){let[c,u,h,d]=o,p=Pe(Xe(r-c,-1e12,0),0),g=Pe(Xe(s-u,0,ca),0),v=Pe(Xe(r-h,0,ca),0),m=Pe(Xe(s-d,-1e12,0),0);new Ls(a,{x:Pe(a.x+(m?m-t:g?g+t:0),0),y:Pe(a.y+(p?p-t:v?v+t:0),0),duration:De(e)?350*ze.timeScale:e,ease:n,onUpdate:()=>{this.canScroll=!1,this.$scrollContainer.scrollTo(a.x,a.y)}}).init().then(()=>{this.canScroll=l})}return this}handleHover(){this.isFinePointer&&this.cursor&&!this.cursorStyles&&(this.cursorStyles=cs(this.$trigger,{cursor:this.cursor.onHover}))}animateInView(e,t=0,n=ci.inOutQuad){this.stop(),this.updateBoundingValues();let s=this.x,r=this.y,[a,o,l,c]=this.containerPadding,u=this.scroll.y-this.targetBounds[0]+a+t,h=this.scroll.x-this.targetBounds[1]-o-t,d=this.scroll.y-this.targetBounds[2]-l-t,p=this.scroll.x-this.targetBounds[3]+c+t,g=this.isOutOfBounds([u,h,d,p],s,r);if(g){let[v,m]=this.disabled,f=Xe(xr(s,this.snapX),p,h),x=Xe(xr(r,this.snapY),u,d),_=De(e)?350*ze.timeScale:e;!v&&(g===1||g===3)&&this.animate[this.xProp](f,_,n),!m&&(g===2||g===3)&&this.animate[this.yProp](x,_,n)}return this}handleDown(e){let t=e.target;if(this.grabbed||t.type==="range")return;e.stopPropagation(),this.grabbed=!0,this.released=!1,this.stop(),this.updateBoundingValues();let n=e.changedTouches,s=n?n[0].clientX:e.clientX,r=n?n[0].clientY:e.clientY,{x:a,y:o}=this.transforms.normalizePoint(s,r),[l,c,u,h]=this.containerBounds,d=(1-this.containerFriction)*this.dragSpeed,p=this.x,g=this.y;this.coords[0]=this.coords[2]=d?p>c?c+(p-c)/d:p<h?h+(p-h)/d:p:p,this.coords[1]=this.coords[3]=d?g>u?u+(g-u)/d:g<l?l+(g-l)/d:g:g,this.pointer[0]=a,this.pointer[1]=o,this.pointer[2]=a,this.pointer[3]=o,this.pointer[4]=a,this.pointer[5]=o,this.pointer[6]=a,this.pointer[7]=o,this.deltaX=0,this.deltaY=0,this.velocity=0,this.velocityStack[0]=0,this.velocityStack[1]=0,this.velocityStack[2]=0,this.velocityStackIndex=0,this.angle=0,this.targetStyles&&(this.targetStyles.revert(),this.targetStyles=null);let v=Fs(this.$target,"zIndex",!1);Cc=(v>Cc?v:Cc)+1,this.targetStyles=cs(this.$target,{zIndex:Cc}),this.triggerStyles&&(this.triggerStyles.revert(),this.triggerStyles=null),this.cursorStyles&&(this.cursorStyles.revert(),this.cursorStyles=null),this.isFinePointer&&this.cursor&&(this.bodyStyles=cs(st.body,{cursor:this.cursor.onGrab})),this.scrollInView(100,0,ci.out(3)),this.onGrab(this),st.addEventListener("touchmove",this),st.addEventListener("touchend",this),st.addEventListener("touchcancel",this),st.addEventListener("mousemove",this),st.addEventListener("mouseup",this),st.addEventListener("selectstart",this)}handleMove(e){if(!this.grabbed)return;let t=e.changedTouches,n=t?t[0].clientX:e.clientX,s=t?t[0].clientY:e.clientY,{x:r,y:a}=this.transforms.normalizePoint(n,s),o=r-this.pointer[6],l=a-this.pointer[7],c=e.target,u=!1,h=!1,d=!1;for(;t&&c&&c!==this.$trigger;){let p=Fs(c,"overflow-y");if(p!=="hidden"&&p!=="visible"){let{scrollTop:g,scrollHeight:v,clientHeight:m}=c;if(v>m){d=!0,u=g<=3,h=g>=v-m-3;break}}c=c.parentNode}d&&(!u&&!h||u&&l<0||h&&l>0)?(this.pointer[0]=r,this.pointer[1]=a,this.pointer[2]=r,this.pointer[3]=a,this.pointer[4]=r,this.pointer[5]=a,this.pointer[6]=r,this.pointer[7]=a):(Us(e),this.triggerStyles||(this.triggerStyles=cs(this.$trigger,{pointerEvents:"none"})),this.$trigger.addEventListener("touchstart",Us,{passive:!1}),this.$trigger.addEventListener("touchmove",Us,{passive:!1}),this.$trigger.addEventListener("touchend",Us),(!this.disabled[0]&&Fi(o)>3||!this.disabled[1]&&Fi(l)>3)&&(this.updateTicker.resume(),this.pointer[2]=this.pointer[0],this.pointer[3]=this.pointer[1],this.pointer[0]=r,this.pointer[1]=a,this.dragged=!0,this.released=!1,this.onDrag(this)))}handleUp(){if(!this.grabbed)return;this.updateTicker.pause(),this.triggerStyles&&(this.triggerStyles.revert(),this.triggerStyles=null),this.bodyStyles&&(this.bodyStyles.revert(),this.bodyStyles=null);let[e,t]=this.disabled,[n,s,r,a,o,l]=this.pointer,[c,u,h,d]=this.containerBounds,[p,g]=this.snapped,v=this.releaseXSpring,m=this.releaseYSpring,f=this.releaseEase,x=this.hasReleaseSpring,_=this.overshootCoords,y=this.x,T=this.y,M=this.computeVelocity(n-o,s-l),R=this.angle=vc(s-a,n-r),C=M*150,b=(1-this.releaseContainerFriction)*this.dragSpeed,S=y+Th(R)*C,D=T+Eh(R)*C,U=S>u?u+(S-u)*b:S<d?d+(S-d)*b:S,O=D>h?h+(D-h)*b:D<c?c+(D-c)*b:D,B=this.destX=Xe(Pe(xr(U,this.snapX),5),d,u),G=this.destY=Xe(Pe(xr(O,this.snapY),5),c,h),N=this.isOutOfBounds(this.containerBounds,S,D),I=0,P=0,F=f,J=f,oe=0;if(_.x=y,_.y=T,!e){let ce=B===u?y>u?-1:1:y<d?-1:1,X=Pe(y-B,0);v.velocity=t&&x?X?C*ce/Fi(X):0:M;let{ease:Z,duration:ie,restDuration:he}=v;I=y===B?0:x?ie:ie-he*ze.timeScale,x&&(F=Z),I>oe&&(oe=I)}if(!t){let ce=G===h?T>h?-1:1:T<c?-1:1,X=Pe(T-G,0);m.velocity=e&&x?X?C*ce/Fi(X):0:M;let{ease:Z,duration:ie,restDuration:he}=m;P=T===G?0:x?ie:ie-he*ze.timeScale,x&&(J=Z),P>oe&&(oe=P)}if(!x&&N&&b&&(I||P)){let ce=dn.blend;new Ls(_,{x:{to:U,duration:I*.65},y:{to:O,duration:P*.65},ease:f,composition:ce}).init(),new Ls(_,{x:{to:B,duration:I},y:{to:G,duration:P},ease:f,composition:ce}).init(),this.overshootXTicker.stretch(I).restart(),this.overshootYTicker.stretch(P).restart()}else e||this.animate[this.xProp](B,I,F),t||this.animate[this.yProp](G,P,J);this.scrollInView(oe,this.scrollThreshold,f);let _e=!1;B!==p&&(this.snapped[0]=B,this.snapX&&(_e=!0)),G!==g&&this.snapY&&(this.snapped[1]=G,this.snapY&&(_e=!0)),_e&&this.onSnap(this),this.grabbed=!1,this.dragged=!1,this.updated=!0,this.released=!0,this.onRelease(this),this.$trigger.removeEventListener("touchstart",Us),this.$trigger.removeEventListener("touchmove",Us),this.$trigger.removeEventListener("touchend",Us),st.removeEventListener("touchmove",this),st.removeEventListener("touchend",this),st.removeEventListener("touchcancel",this),st.removeEventListener("mousemove",this),st.removeEventListener("mouseup",this),st.removeEventListener("selectstart",this)}reset(){return this.stop(),this.resizeTicker.pause(),this.grabbed=!1,this.dragged=!1,this.updated=!1,this.released=!1,this.canScroll=!1,this.setX(0,!0),this.setY(0,!0),this.coords[0]=0,this.coords[1]=0,this.pointer[0]=0,this.pointer[1]=0,this.pointer[2]=0,this.pointer[3]=0,this.pointer[4]=0,this.pointer[5]=0,this.pointer[6]=0,this.pointer[7]=0,this.velocity=0,this.velocityStack[0]=0,this.velocityStack[1]=0,this.velocityStack[2]=0,this.velocityStackIndex=0,this.angle=0,this}enable(){return this.enabled||(this.enabled=!0,this.$target.classList.remove("is-disabled"),this.touchActionStyles=cs(this.$trigger,{touchAction:this.disabled[0]?"pan-x":this.disabled[1]?"pan-y":"none"}),this.$trigger.addEventListener("touchstart",this,{passive:!0}),this.$trigger.addEventListener("mousedown",this,{passive:!0}),this.$trigger.addEventListener("mouseenter",this)),this}disable(){return this.enabled=!1,this.grabbed=!1,this.dragged=!1,this.updated=!1,this.released=!1,this.canScroll=!1,this.touchActionStyles.revert(),this.cursorStyles&&(this.cursorStyles.revert(),this.cursorStyles=null),this.triggerStyles&&(this.triggerStyles.revert(),this.triggerStyles=null),this.bodyStyles&&(this.bodyStyles.revert(),this.bodyStyles=null),this.targetStyles&&(this.targetStyles.revert(),this.targetStyles=null),this.stop(),this.$target.classList.add("is-disabled"),this.$trigger.removeEventListener("touchstart",this),this.$trigger.removeEventListener("mousedown",this),this.$trigger.removeEventListener("mouseenter",this),st.removeEventListener("touchmove",this),st.removeEventListener("touchend",this),st.removeEventListener("touchcancel",this),st.removeEventListener("mousemove",this),st.removeEventListener("mouseup",this),st.removeEventListener("selectstart",this),this}revert(){return this.reset(),this.disable(),this.$target.classList.remove("is-disabled"),this.updateTicker.revert(),this.overshootXTicker.revert(),this.overshootYTicker.revert(),this.resizeTicker.revert(),this}handleEvent(e){switch(e.type){case"mousedown":this.handleDown(e);break;case"touchstart":this.handleDown(e);break;case"mousemove":this.handleMove(e);break;case"touchmove":this.handleMove(e);break;case"mouseup":this.handleUp();break;case"touchend":this.handleUp();break;case"touchcancel":this.handleUp();break;case"mouseenter":this.handleHover();break;case"selectstart":Us(e);break}}},hs=(i,e)=>new ng(i,e),ig=class{constructor(e={}){ze.scope&&ze.scope.revertibles.push(this);let t=e.root,n=st;t&&(n=t.current||t.nativeElement||oi(t)[0]||st);let s=e.defaults,r=ze.defaults,a=e.mediaQueries;if(this.defaults=s?ao(s,r):r,this.root=n,this.constructors=[],this.revertConstructors=[],this.revertibles=[],this.methods={},this.matches={},this.mediaQueryLists={},this.data={},a)for(let o in a){let l=Mn.matchMedia(a[o]);this.mediaQueryLists[o]=l,l.addEventListener("change",this)}}execute(e){let t=ze.scope,n=ze.root,s=ze.defaults;ze.scope=this,ze.root=this.root,ze.defaults=this.defaults;let r=this.mediaQueryLists;for(let o in r)this.matches[o]=r[o].matches;let a=e(this);return ze.scope=t,ze.root=n,ze.defaults=s,a}refresh(){return this.execute(()=>{let e=this.revertibles.length,t=this.revertConstructors.length;for(;e--;)this.revertibles[e].revert();for(;t--;)this.revertConstructors[t](this);this.revertibles.length=0,this.revertConstructors.length=0,this.constructors.forEach(n=>{let s=n(this);s&&this.revertConstructors.push(s)})}),this}add(e,t){if(ai(e)){let n=e;this.constructors.push(n),this.execute(()=>{let s=n(this);s&&this.revertConstructors.push(s)})}else this.methods[e]=(...n)=>this.execute(()=>t(...n));return this}handleEvent(e){switch(e.type){case"change":this.refresh();break}}revert(){let e=this.revertibles,t=this.revertConstructors,n=this.mediaQueryLists,s=e.length,r=t.length;for(;s--;)e[s].revert();for(;r--;)t[r](this);for(let a in n)n[a].removeEventListener("change",this);e.length=0,t.length=0,this.constructors.length=0,this.matches={},this.methods={},this.mediaQueryLists={},this.data={}}},Ns=i=>new ig(i),qS=()=>{let i=document.createElement("div");st.body.appendChild(i),i.style.height="100lvh";let e=i.offsetHeight;return st.body.removeChild(i),e},Rc=(i,e)=>i&&ai(i)?i(e):i,Xh=new Map,sg=class{constructor(e){this.element=e,this.useWin=this.element===st.body,this.winWidth=0,this.winHeight=0,this.width=0,this.height=0,this.left=0,this.top=0,this.zIndex=0,this.scrollX=0,this.scrollY=0,this.prevScrollX=0,this.prevScrollY=0,this.scrollWidth=0,this.scrollHeight=0,this.velocity=0,this.backwardX=!1,this.backwardY=!1,this.scrollTicker=new Ln({autoplay:!1,onBegin:()=>this.dataTimer.resume(),onUpdate:()=>{let t=this.backwardX||this.backwardY;Lt(this,n=>n.handleScroll(),t)},onComplete:()=>this.dataTimer.pause()}).init(),this.dataTimer=new Ln({autoplay:!1,frameRate:30,onUpdate:t=>{let n=t.deltaTime,s=this.prevScrollX,r=this.prevScrollY,a=this.scrollX,o=this.scrollY,l=s-a,c=r-o;this.prevScrollX=a,this.prevScrollY=o,l&&(this.backwardX=s>a),c&&(this.backwardY=r>o),this.velocity=Pe(n>0?Math.sqrt(l*l+c*c)/n:0,5)}}).init(),this.resizeTicker=new Ln({autoplay:!1,duration:250*ze.timeScale,onComplete:()=>{this.updateWindowBounds(),this.refreshScrollObservers(),this.handleScroll()}}).init(),this.wakeTicker=new Ln({autoplay:!1,duration:500*ze.timeScale,onBegin:()=>{this.scrollTicker.resume()},onComplete:()=>{this.scrollTicker.pause()}}).init(),this._head=null,this._tail=null,this.updateScrollCoords(),this.updateWindowBounds(),this.updateBounds(),this.refreshScrollObservers(),this.handleScroll(),this.resizeObserver=new ResizeObserver(()=>this.resizeTicker.restart()),this.resizeObserver.observe(this.element),(this.useWin?Mn:this.element).addEventListener("scroll",this,!1)}updateScrollCoords(){let e=this.useWin,t=this.element;this.scrollX=Pe(e?Mn.scrollX:t.scrollLeft,0),this.scrollY=Pe(e?Mn.scrollY:t.scrollTop,0)}updateWindowBounds(){this.winWidth=Mn.innerWidth,this.winHeight=qS()}updateBounds(){let e=getComputedStyle(this.element),t=this.element;this.scrollWidth=t.scrollWidth+parseFloat(e.marginLeft)+parseFloat(e.marginRight),this.scrollHeight=t.scrollHeight+parseFloat(e.marginTop)+parseFloat(e.marginBottom),this.updateWindowBounds();let n,s;if(this.useWin)n=this.winWidth,s=this.winHeight;else{let r=t.getBoundingClientRect();n=r.width,s=r.height,this.top=r.top,this.left=r.left}this.width=n,this.height=s}refreshScrollObservers(){Lt(this,e=>{e._debug&&e.removeDebug()}),this.updateBounds(),Lt(this,e=>{e.refresh(),e._debug&&e.debug()})}refresh(){this.updateWindowBounds(),this.updateBounds(),this.refreshScrollObservers(),this.handleScroll()}handleScroll(){this.updateScrollCoords(),this.wakeTicker.restart()}handleEvent(e){switch(e.type){case"scroll":this.handleScroll();break}}revert(){this.scrollTicker.cancel(),this.dataTimer.cancel(),this.resizeTicker.cancel(),this.wakeTicker.cancel(),this.resizeObserver.unobserve(this.element),(this.useWin?Mn:this.element).removeEventListener("scroll",this),Xh.delete(this.element)}},jS=i=>{let e=i&&oi(i)[0]||st.body,t=Xh.get(e);return t||(t=new sg(e),Xh.set(e,t)),t},ho=(i,e,t,n,s)=>{let r=e==="min",a=e==="max",o=e==="top"||e==="left"||e==="start"||r?0:e==="bottom"||e==="right"||e==="end"||a?"100%":e==="center"?"50%":e,{n:l,u:c}=li(o,In),u=l;return c==="%"?u=l/100*t:c&&(u=Bh(i,In,"px",!0).n),a&&n<0&&(u+=n),r&&s>0&&(u+=s),u},Dc=(i,e,t,n,s)=>{let r;if(ri(e)){let a=mm.exec(e);if(a){let o=a[0],l=o[0],c=e.split(o),u=c[0]==="min",h=c[0]==="max",d=ho(i,c[0],t,n,s),p=ho(i,c[1],t,n,s);if(u){let g=va(ho(i,"min",t),p,l);r=g<d?d:g}else if(h){let g=va(ho(i,"max",t),p,l);r=g>d?d:g}else r=va(d,p,l)}else r=ho(i,e,t,n,s)}else r=e;return Pe(r,0)},rg=i=>{let e,t=i.targets;for(let n=0,s=t.length;n<s;n++){let r=t[n];if(r[mc]){e=r;break}}return e},ZS=0,ag=["#FF4B4B","#FF971B","#FFC730","#F9F640","#7AFF5A","#18FF74","#17E09B","#3CFFEC","#05DBE9","#33B3F1","#638CF9","#C563FE","#FF4FCF","#F93F8A"],og=class{constructor(e={}){ze.scope&&ze.scope.revertibles.push(this);let t=Ve(e.sync,"play pause"),n=t?_r(t):null,s=t&&(t==="linear"||t===ls),r=t&&!(n===ls&&!s),a=t&&(Li(t)||t===!0||s),o=t&&ri(t)&&!r&&!a,l=o?t.split(" ").map(u=>()=>{let h=this.linked;return h&&h[u]?h[u]():null}):null,c=o&&l.length>2;this.index=ZS++,this.id=De(e.id)?this.index:e.id,this.container=jS(e.container),this.target=null,this.linked=null,this.repeat=null,this.horizontal=null,this.enter=null,this.leave=null,this.sync=r||a||!!l,this.syncEase=r?n:null,this.syncSmooth=a?t===!0||s?1:t:null,this.onSyncEnter=l&&!c&&l[0]?l[0]:lt,this.onSyncLeave=l&&!c&&l[1]?l[1]:lt,this.onSyncEnterForward=l&&c&&l[0]?l[0]:lt,this.onSyncLeaveForward=l&&c&&l[1]?l[1]:lt,this.onSyncEnterBackward=l&&c&&l[2]?l[2]:lt,this.onSyncLeaveBackward=l&&c&&l[3]?l[3]:lt,this.onEnter=e.onEnter||lt,this.onLeave=e.onLeave||lt,this.onEnterForward=e.onEnterForward||lt,this.onLeaveForward=e.onLeaveForward||lt,this.onEnterBackward=e.onEnterBackward||lt,this.onLeaveBackward=e.onLeaveBackward||lt,this.onUpdate=e.onUpdate||lt,this.onSyncComplete=e.onSyncComplete||lt,this.reverted=!1,this.completed=!1,this.began=!1,this.isInView=!1,this.forceEnter=!1,this.hasEntered=!1,this.offsets=[],this.offset=0,this.offsetStart=0,this.offsetEnd=0,this.distance=0,this.prevProgress=0,this.thresholds=["start","end","end","start"],this.coords=[0,0,0,0],this.debugStyles=null,this.$debug=null,this._params=e,this._debug=Ve(e.debug,!1),this._next=null,this._prev=null,os(this.container,this),qm(()=>{if(!this.reverted){if(!this.target){let u=oi(e.target)[0];this.target=u||st.body,this.refresh()}this._debug&&this.debug()}})}link(e){if(e&&(e.pause(),this.linked=e,!this._params.target)){let t;De(e.targets)?Lt(e,n=>{n.targets&&!t&&(t=rg(n))}):t=rg(e),this.target=t||st.body,this.refresh()}return this}get velocity(){return this.container.velocity}get backward(){return this.horizontal?this.container.backwardX:this.container.backwardY}get scroll(){return this.horizontal?this.container.scrollX:this.container.scrollY}get progress(){let e=(this.scroll-this.offsetStart)/this.distance;return e===1/0||isNaN(e)?0:Pe(Xe(e,0,1),6)}refresh(){this.reverted=!1;let e=this._params;return this.repeat=Ve(Rc(e.repeat,this),!0),this.horizontal=Ve(Rc(e.axis,this),"y")==="x",this.enter=Ve(Rc(e.enter,this),"end start"),this.leave=Ve(Rc(e.leave,this),"start end"),this.updateBounds(),this.handleScroll(),this}removeDebug(){return this.$debug&&(this.$debug.parentNode.removeChild(this.$debug),this.$debug=null),this.debugStyles&&(this.debugStyles.revert(),this.$debug=null),this}debug(){this.removeDebug();let e=this.container,t=this.horizontal,n=e.element.querySelector(":scope > .animejs-onscroll-debug"),s=st.createElement("div"),r=st.createElement("div"),a=st.createElement("div"),o=ag[this.index%ag.length],l=e.useWin,c=l?e.winWidth:e.width,u=l?e.winHeight:e.height,h=e.scrollWidth,d=e.scrollHeight,p=this.container.width>360?320:260,g=t?0:10,v=t?10:0,m=t?24:p/2,f=t?m:15,x=t?60:m,_=t?x:f,y=t?"repeat-x":"repeat-y",T=S=>t?"0px "+S+"px":S+"px 2px",M=S=>`linear-gradient(${t?90:0}deg, ${S} 2px, transparent 1px)`,R=(S,D,U,O,B)=>`position:${S};left:${D}px;top:${U}px;width:${O}px;height:${B}px;`;s.style.cssText=`${R("absolute",g,v,t?h:p,t?p:d)}
      pointer-events: none;
      z-index: ${this.container.zIndex++};
      display: flex;
      flex-direction: ${t?"column":"row"};
      filter: drop-shadow(0px 1px 0px rgba(0,0,0,.75));
    `,r.style.cssText=`${R("sticky",0,0,t?c:m,t?m:u)}`,n||(r.style.cssText+=`background:
        ${M("#FFFF")}${T(m-10)} / 100px 100px ${y},
        ${M("#FFF8")}${T(m-10)} / 10px 10px ${y};
      `),a.style.cssText=`${R("relative",0,0,t?h:m,t?m:d)}`,n||(a.style.cssText+=`background:
        ${M("#FFFF")}${T(0)} / ${t?"100px 10px":"10px 100px"} ${y},
        ${M("#FFF8")}${T(0)} / ${t?"10px 0px":"0px 10px"} ${y};
      `);let C=[" enter: "," leave: "];this.coords.forEach((S,D)=>{let U=D>1,O=(U?0:this.offset)+S,B=D%2,G=O<_,N=O>(U?t?c:u:t?h:d)-_,I=(U?B&&!G:!B&&!G)||N,P=st.createElement("div"),F=st.createElement("div"),J=t?I?"right":"left":I?"bottom":"top",oe=I?(t?x:f)+(U?t?-1:N?0:-2:t?-1:-2):t?1:0;F.innerHTML=`${this.id}${C[B]}${this.thresholds[D]}`,P.style.cssText=`${R("absolute",0,0,x,f)}
        display: flex;
        flex-direction: ${t?"column":"row"};
        justify-content: flex-${U?"start":"end"};
        align-items: flex-${I?"end":"start"};
        border-${J}: 2px solid ${o};
      `,F.style.cssText=`
        overflow: hidden;
        max-width: ${p/2-10}px;
        height: ${f};
        margin-${t?I?"right":"left":I?"bottom":"top"}: -2px;
        padding: 1px;
        font-family: ui-monospace, monospace;
        font-size: 10px;
        letter-spacing: -.025em;
        line-height: 9px;
        font-weight: 600;
        text-align: ${t&&I||!t&&!U?"right":"left"};
        white-space: pre;
        text-overflow: ellipsis;
        color: ${B?o:"rgba(0,0,0,.75)"};
        background-color: ${B?"rgba(0,0,0,.65)":o};
        border: 2px solid ${B?o:"transparent"};
        border-${t?I?"top-left":"top-right":I?"top-left":"bottom-left"}-radius: 5px;
        border-${t?I?"bottom-left":"bottom-right":I?"top-right":"bottom-right"}-radius: 5px;
      `,P.appendChild(F);let _e=O-oe+(t?1:0);P.style[t?"left":"top"]=`${_e}px`,(U?r:a).appendChild(P)}),s.appendChild(r),s.appendChild(a),e.element.appendChild(s),n||s.classList.add("animejs-onscroll-debug"),this.$debug=s,Fs(e.element,"position")==="static"&&(this.debugStyles=cs(e.element,{position:"relative "}))}updateBounds(){this._debug&&this.removeDebug();let e,t=this.target,n=this.container,s=this.horizontal,r=this.linked,a,o=t,l=0,c=0,u=o;r&&(a=r.currentTime,r.seek(0,!0));let h=Fs(n.element,"position")==="static"?cs(n.element,{position:"relative "}):!1;for(;o&&o!==n.element&&o!==st.body;){let N=Fs(o,"position")==="sticky"?cs(o,{position:"static"}):!1;o===u&&(l+=o.offsetLeft||0,c+=o.offsetTop||0,u=o.offsetParent),o=o.parentElement,N&&(e||(e=[]),e.push(N))}h&&h.revert();let d=s?l:c,p=s?t.offsetWidth:t.offsetHeight,g=s?n.width:n.height,m=(s?n.scrollWidth:n.scrollHeight)-g,f=this.enter,x=this.leave,_="start",y="end",T="end",M="start";if(ri(f)){let N=f.split(" ");T=N[0],_=N.length>1?N[1]:_}else if(gn(f)){let N=f;De(N.container)||(T=N.container),De(N.target)||(_=N.target)}else Li(f)&&(T=f);if(ri(x)){let N=x.split(" ");M=N[0],y=N.length>1?N[1]:y}else if(gn(x)){let N=x;De(N.container)||(M=N.container),De(N.target)||(y=N.target)}else Li(x)&&(M=x);let R=Dc(t,_,p),C=Dc(t,y,p),b=R+d-g,S=C+d-m,D=Dc(t,T,g,b,S),U=Dc(t,M,g,b,S),O=R+d-D,B=C+d-U,G=B-O;this.offsets[0]=l,this.offsets[1]=c,this.offset=d,this.offsetStart=O,this.offsetEnd=B,this.distance=G<=0?0:G,this.thresholds=[_,y,T,M],this.coords=[R,C,D,U],e&&e.forEach(N=>N.revert()),r&&r.seek(a,!0),this._debug&&this.debug()}handleScroll(){let e=this.linked,t=this.sync,n=this.syncEase,s=this.syncSmooth,r=e&&(n||s),a=this.horizontal,o=this.container,l=this.scroll,c=l<=this.offsetStart,u=l>=this.offsetEnd,h=!c&&!u,d=l===this.offsetStart||l===this.offsetEnd,p=!this.hasEntered&&d,g=this._debug&&this.$debug,v=!1,m=!1,f=this.progress;if(c&&this.began&&(this.began=!1),f>0&&!this.began&&(this.began=!0),r){let x=e.progress;if(s&&Li(s)){if(s<1){let _=1e-4,y=x<f&&f===1?_:x>f&&!f?-1e-4:0;f=Pe(Zm(x,f,rs(.01,.2,s),!1)+y,6)}}else n&&(f=n(f));v=f!==this.prevProgress,m=x===1,v&&!m&&s&&x&&o.wakeTicker.restart()}if(g){let x=a?o.scrollY:o.scrollX;g.style[a?"top":"left"]=x+10+"px"}(h&&!this.isInView||p&&!this.forceEnter&&!this.hasEntered)&&(h&&(this.isInView=!0),!this.forceEnter||!this.hasEntered?(g&&h&&(g.style.zIndex=`${this.container.zIndex++}`),this.onSyncEnter(this),this.onEnter(this),this.backward?(this.onSyncEnterBackward(this),this.onEnterBackward(this)):(this.onSyncEnterForward(this),this.onEnterForward(this)),this.hasEntered=!0,p&&(this.forceEnter=!0)):h&&(this.forceEnter=!1)),(h||!h&&this.isInView)&&(v=!0),v&&(r&&e.seek(e.duration*f),this.onUpdate(this)),!h&&this.isInView&&(this.isInView=!1,this.onSyncLeave(this),this.onLeave(this),this.backward?(this.onSyncLeaveBackward(this),this.onLeaveBackward(this)):(this.onSyncLeaveForward(this),this.onLeaveForward(this)),t&&!s&&(m=!0)),f>=1&&this.began&&!this.completed&&(t&&m||!t)&&(t&&this.onSyncComplete(this),this.completed=!0,(!this.repeat&&!e||!this.repeat&&e&&e.completed)&&this.revert()),f<1&&this.completed&&(this.completed=!1),this.prevProgress=f}revert(){if(this.reverted)return;let e=this.container;return as(e,this),e._head||e.revert(),this._debug&&this.removeDebug(),this.reverted=!0,this}},Sr=(i={})=>new og(i),ge=(i,e={})=>{let t=[],n=0,s=e.from,r=e.reversed,a=e.ease,o=!De(a),c=o&&!De(a.ease)?a.ease:o?_r(a):null,u=e.grid,h=e.axis,d=De(s)||s===0||s==="first",p=s==="center",g=s==="last",v=Pn(i),m=vr(v?i[0]:i),f=v?vr(i[1]):0,x=pm.exec((v?i[1]:i)+ss),_=e.start||0+(v?m:0),y=d?0:Li(s)?s:0;return(T,M,R,C)=>{if(p&&(y=(R-1)/2),g&&(y=R-1),!t.length){for(let U=0;U<R;U++){if(!u)t.push(Fi(y-U));else{let O=p?(u[0]-1)/2:y%u[0],B=p?(u[1]-1)/2:so(y/u[0]),G=U%u[0],N=so(U/u[0]),I=O-G,P=B-N,F=fa(I*I+P*P);h==="x"&&(F=-I),h==="y"&&(F=-P),t.push(F)}n=bm(...t)}c&&(t=t.map(U=>c(U/n)*n)),r&&(t=t.map(U=>h?U<0?U*-1:-U:Fi(n-U)))}let b=v?(f-m)/n:m,D=(C?wc(C,De(e.start)?C.iterationDuration:_):_)+(b*Pe(t[M],2)||0);return e.modifier&&(D=e.modifier(D)),x&&(D=`${D}${x[2]}`),D}};var Yh=class extends HTMLElement{constructor(){super();this.heartsAnimation=null,this.x=0,this.y=0,this.spread=16,this.$svg=null}connectedCallback(){let e=document.createElement("div");e.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon"><g id="sponsor" fill="none" fill-rule="evenodd"><path fill="currentColor" fill-rule="nonzero" d="M12 18.445a.778.778 0 0 1-.34-.078C11.39 18.235 5 15.077 5 9.889a3.889 3.889 0 0 1 6.638-2.75L12 7.5l.362-.361A3.889 3.889 0 0 1 19 9.889c0 5.17-6.387 8.344-6.66 8.478a.778.778 0 0 1-.34.078z"></path></g></svg>',this.$svg=e.querySelector("svg"),this.addEventListener("mouseenter",this),this.addEventListener("mousemove",this),this.addEventListener("mouseleave",this)}disconnectedCallback(){this.removeEventListener("mouseenter",this),this.removeEventListener("mousemove",this),this.removeEventListener("mouseleave",this),V.remove(this.$svg)}mousemove(e){let{width:t,height:n,left:s,top:r}=this.getBoundingClientRect();this.x=V.clamp(e.clientX-s,this.spread,t-this.spread),this.y=V.clamp(e.clientY-r,0,n)}mouseenter(e){this.mousemove(e),Ie(this.$svg,{scale:[1,1.25,1],loop:!0,duration:900}),this.heartsAnimation=Zn({duration:100,loop:!0,onLoop:()=>{let t=this.$svg.cloneNode(!0);t.style.cssText="position: absolute; top: -12px; left: -12px; mix-blend-mode: plus-lighter;",t.classList.add("particle"),this.appendChild(t);let n=V.randomPick(["-=","+="]),s=n==="-="?"+=":"-=";Ie(t,{translateX:[this.x+V.random(-this.spread,this.spread),n+(5+V.random(-2,2,2)),s+(6+V.random(-2,2,2)),n+(4+V.random(-2,2,2))],translateY:[{from:this.y+V.random(-5,5),to:"-="+V.random(30,50)}],scale:[{from:0,to:.85},{to:0}],duration:1200,onComplete:()=>t.remove()})}})}mouseleave(){Ie(this.$svg,{scale:1,duration:500}),this.heartsAnimation&&this.heartsAnimation.revert()}handleEvent(e){let t=e.type;this[t]&&this[t](e)}};var lg=new k,KS=new Hn,cg=new k,Qh=class extends Rt{constructor(e=document.createElement("div")){super();this.isCSS3DObject=!0,this.element=e,this.element.style.position="absolute",this.element.style.pointerEvents="auto",this.element.style.userSelect="none",this.element.setAttribute("draggable",!1),this.addEventListener("removed",function(){this.traverse(function(t){t.element instanceof t.element.ownerDocument.defaultView.Element&&t.element.parentNode!==null&&t.element.remove()})})}copy(e,t){return super.copy(e,t),this.element=e.element.cloneNode(!0),this}};var Ni=new Ze,JS=new Ze,qh=class{constructor(e={}){let t=this,n,s,r,a,o={camera:{style:""},objects:new WeakMap},l=e.element!==void 0?e.element:document.createElement("div");l.style.overflow="hidden",this.domElement=l;let c=document.createElement("div");c.style.transformOrigin="0 0",c.style.pointerEvents="none",l.appendChild(c);let u=document.createElement("div");u.style.transformStyle="preserve-3d",c.appendChild(u),this.getSize=function(){return{width:n,height:s}},this.render=function(m,f){let x=f.projectionMatrix.elements[5]*a;f.view&&f.view.enabled?(c.style.transform=`translate( ${-f.view.offsetX*(n/f.view.width)}px, ${-f.view.offsetY*(s/f.view.height)}px )`,c.style.transform+=`scale( ${f.view.fullWidth/f.view.width}, ${f.view.fullHeight/f.view.height} )`):c.style.transform="",m.matrixWorldAutoUpdate===!0&&m.updateMatrixWorld(),f.parent===null&&f.matrixWorldAutoUpdate===!0&&f.updateMatrixWorld();let _,y;f.isOrthographicCamera&&(_=-(f.right+f.left)/2,y=(f.top+f.bottom)/2);let T=f.view&&f.view.enabled?f.view.height/f.view.fullHeight:1,M=f.isOrthographicCamera?`scale( ${T} )scale(`+x+")translate("+h(_)+"px,"+h(y)+"px)"+d(f.matrixWorldInverse):`scale( ${T} )translateZ(`+x+"px)"+d(f.matrixWorldInverse),C=(f.isPerspectiveCamera?"perspective("+x+"px) ":"")+M+"translate("+r+"px,"+a+"px)";o.camera.style!==C&&(u.style.transform=C,o.camera.style=C),v(m,m,f,M)},this.setSize=function(m,f){n=m,s=f,r=n/2,a=s/2,l.style.width=m+"px",l.style.height=f+"px",c.style.width=m+"px",c.style.height=f+"px",u.style.width=m+"px",u.style.height=f+"px"};function h(m){return Math.abs(m)<1e-10?0:m}function d(m){let f=m.elements;return"matrix3d("+h(f[0])+","+h(-f[1])+","+h(f[2])+","+h(f[3])+","+h(f[4])+","+h(-f[5])+","+h(f[6])+","+h(f[7])+","+h(f[8])+","+h(-f[9])+","+h(f[10])+","+h(f[11])+","+h(f[12])+","+h(-f[13])+","+h(f[14])+","+h(f[15])+")"}function p(m){let f=m.elements,x="matrix3d("+h(f[0])+","+h(f[1])+","+h(f[2])+","+h(f[3])+","+h(-f[4])+","+h(-f[5])+","+h(-f[6])+","+h(-f[7])+","+h(f[8])+","+h(f[9])+","+h(f[10])+","+h(f[11])+","+h(f[12])+","+h(f[13])+","+h(f[14])+","+h(f[15])+")";return"translate(-50%,-50%)"+x}function g(m){m.isCSS3DObject&&(m.element.style.display="none");for(let f=0,x=m.children.length;f<x;f++)g(m.children[f])}function v(m,f,x,_){if(m.visible===!1){g(m);return}if(m.isCSS3DObject){let y=m.layers.test(x.layers)===!0,T=m.element;if(T.style.display=y===!0?"":"none",y===!0){m.onBeforeRender(t,f,x);let M;m.isCSS3DSprite?(Ni.copy(x.matrixWorldInverse),Ni.transpose(),m.rotation2D!==0&&Ni.multiply(JS.makeRotationZ(m.rotation2D)),m.matrixWorld.decompose(lg,KS,cg),Ni.setPosition(lg),Ni.scale(cg),Ni.elements[3]=0,Ni.elements[7]=0,Ni.elements[11]=0,Ni.elements[15]=1,M=p(Ni)):M=p(m.matrixWorld);let R=o.objects.get(m);if(R===void 0||R.style!==M){T.style.transform=M;let C={style:M};o.objects.set(m,C)}T.parentNode!==u&&u.appendChild(T),m.onAfterRender(t,f,x)}}for(let y=0,T=m.children.length;y<T;y++)v(m.children[y],f,x,_)}}};var fo={minM:"(min-width: 900px)",isM:"(min-width: 900px) and (max-width: 1199px)",minL:"(min-width: 1200px)"},Pc=Ns({mediaQueries:fo});Pc.add(i=>{let e=document.querySelector("#site-header"),t=document.querySelector("#site-menu"),n=document.querySelector("#toggle-site-menu");if(i.add("preventDefault",o=>{e.contains(o.target)||(o.preventDefault(),console.log(o.target),i.methods.closeSiteMenu())}),i.add("preventScroll",()=>{document.documentElement.style.overflow="hidden",document.body.style.position="fixed",document.body.style.top=`-${window.scrollY}px`,document.addEventListener("touchstart",i.methods.preventDefault,{passive:!1})}),i.add("allowScroll",()=>{let o=document.body.style.top;document.removeEventListener("touchstart",i.methods.preventDefault),document.documentElement.style.overflow="",document.body.style.position="",document.body.style.top="",window.scrollTo(0,parseInt(o||"0")*-1)}),!i.matches.minL){let[o,l]=n.querySelectorAll("rect"),{offsetWidth:c,offsetHeight:u}=t;V.set(t,{width:c*2,willChange:"transform"});let h=et({defaults:{duration:250},autoplay:!1}).add(o,{rotate:["45deg","0deg"],y:[12,8]},0).add(l,{rotate:["-45deg","0deg"],y:[12,14]},0).add(e,{"--overlay-opacity":[1,0]},0);i.data.draggable=hs(t,{container:[0,c*2,u,c],x:{snap:c},y:!1,velocityMultiplier:4,minVelocity:2,onUpdate:d=>{h.progress=d.progressX;let p=d.progressX===0,g=d.progressX===1;t.classList.toggle("is-active",p),p&&i.methods.preventScroll(),g&&i.methods.allowScroll()}}),i.data.draggable.progressX=1}i.add("openSiteMenu",()=>{i.matches.minL||t.classList.contains("is-active")||Ie(i.data.draggable,{progressX:0,ease:"outElastic(.75, 1.25)",duration:500})}),i.add("closeSiteMenu",()=>{i.matches.minL||!t.classList.contains("is-active")||Ie(i.data.draggable,{progressX:1,ease:"inOut(2.5)",duration:250})}),i.add("toggleSiteMenu",()=>{if(i.matches.minL||!t)return;t.classList.contains("is-active")?i.methods.closeSiteMenu():i.methods.openSiteMenu()});let s;function r(){let o=this.querySelector("svg:not(.particle)");Ie(o,{scale:[1,1.25,1],loop:!0,duration:900}),s=Zn({duration:100,loop:!0,onLoop:()=>{let l=o.cloneNode(!0);l.style.cssText="position: absolute; top: 0; left: 0px;   mix-blend-mode: plus-lighter;",l.classList.add("particle"),this.appendChild(l),Ie(l,{translateX:[ci.inOutCirc(V.random(0,1,2))*(this.offsetWidth-10),"-="+(5+V.random(-2,2,2)),"+="+(5+V.random(-2,2,2)),"-="+(5+V.random(-2,2,2))],translateY:[{from:V.random(.75,1.25,2)+"em",to:"-=2.5"}],scale:[{from:0,to:.85},{to:0}],duration:1200,onComplete:()=>l.remove()})}})}function a(){let o=this.querySelector("svg:not(.particle)");Ie(o,{scale:1,duration:500}),s&&s.revert()}return()=>{!t||(t.classList.remove("is-active"),i.methods.allowScroll())}});var Ti=class{constructor(e,t,n,s,r="div"){this.parent=e,this.object=t,this.property=n,this._disabled=!1,this._hidden=!1,this.initialValue=this.getValue(),this.domElement=document.createElement(r),this.domElement.classList.add("controller"),this.domElement.classList.add(s),this.$name=document.createElement("div"),this.$name.classList.add("name"),Ti.nextNameID=Ti.nextNameID||0,this.$name.id=`lil-gui-name-${++Ti.nextNameID}`,this.$widget=document.createElement("div"),this.$widget.classList.add("widget"),this.$disable=this.$widget,this.domElement.appendChild(this.$name),this.domElement.appendChild(this.$widget),this.domElement.addEventListener("keydown",a=>a.stopPropagation()),this.domElement.addEventListener("keyup",a=>a.stopPropagation()),this.parent.children.push(this),this.parent.controllers.push(this),this.parent.$children.appendChild(this.domElement),this._listenCallback=this._listenCallback.bind(this),this.name(n)}name(e){return this._name=e,this.$name.textContent=e,this}onChange(e){return this._onChange=e,this}_callOnChange(){this.parent._callOnChange(this),this._onChange!==void 0&&this._onChange.call(this,this.getValue()),this._changed=!0}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(){this._changed&&(this.parent._callOnFinishChange(this),this._onFinishChange!==void 0&&this._onFinishChange.call(this,this.getValue())),this._changed=!1}reset(){return this.setValue(this.initialValue),this._callOnFinishChange(),this}enable(e=!0){return this.disable(!e)}disable(e=!0){return e===this._disabled?this:(this._disabled=e,this.domElement.classList.toggle("disabled",e),this.$disable.toggleAttribute("disabled",e),this)}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}options(e){let t=this.parent.add(this.object,this.property,e);return t.name(this._name),this.destroy(),t}min(e){return this}max(e){return this}step(e){return this}decimals(e){return this}listen(e=!0){return this._listening=e,this._listenCallbackID!==void 0&&(cancelAnimationFrame(this._listenCallbackID),this._listenCallbackID=void 0),this._listening&&this._listenCallback(),this}_listenCallback(){this._listenCallbackID=requestAnimationFrame(this._listenCallback);let e=this.save();e!==this._listenPrevValue&&this.updateDisplay(),this._listenPrevValue=e}getValue(){return this.object[this.property]}setValue(e){return this.getValue()!==e&&(this.object[this.property]=e,this._callOnChange(),this.updateDisplay()),this}updateDisplay(){return this}load(e){return this.setValue(e),this._callOnFinishChange(),this}save(){return this.getValue()}destroy(){this.listen(!1),this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.controllers.splice(this.parent.controllers.indexOf(this),1),this.parent.$children.removeChild(this.domElement)}},ug=class extends Ti{constructor(e,t,n){super(e,t,n,"boolean","label");this.$input=document.createElement("input"),this.$input.setAttribute("type","checkbox"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$input.addEventListener("change",()=>{this.setValue(this.$input.checked),this._callOnFinishChange()}),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.checked=this.getValue(),this}};function jh(i){let e,t;return(e=i.match(/(#|0x)?([a-f0-9]{6})/i))?t=e[2]:(e=i.match(/rgb\(\s*(\d*)\s*,\s*(\d*)\s*,\s*(\d*)\s*\)/))?t=parseInt(e[1]).toString(16).padStart(2,0)+parseInt(e[2]).toString(16).padStart(2,0)+parseInt(e[3]).toString(16).padStart(2,0):(e=i.match(/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i))&&(t=e[1]+e[1]+e[2]+e[2]+e[3]+e[3]),t?"#"+t:!1}var $S={isPrimitive:!0,match:i=>typeof i=="string",fromHexString:jh,toHexString:jh},po={isPrimitive:!0,match:i=>typeof i=="number",fromHexString:i=>parseInt(i.substring(1),16),toHexString:i=>"#"+i.toString(16).padStart(6,0)},eb={isPrimitive:!1,match:i=>Array.isArray(i),fromHexString(i,e,t=1){let n=po.fromHexString(i);e[0]=(n>>16&255)/255*t,e[1]=(n>>8&255)/255*t,e[2]=(n&255)/255*t},toHexString([i,e,t],n=1){n=255/n;let s=i*n<<16^e*n<<8^t*n<<0;return po.toHexString(s)}},tb={isPrimitive:!1,match:i=>Object(i)===i,fromHexString(i,e,t=1){let n=po.fromHexString(i);e.r=(n>>16&255)/255*t,e.g=(n>>8&255)/255*t,e.b=(n&255)/255*t},toHexString({r:i,g:e,b:t},n=1){n=255/n;let s=i*n<<16^e*n<<8^t*n<<0;return po.toHexString(s)}},nb=[$S,po,eb,tb];function ib(i){return nb.find(e=>e.match(i))}var hg=class extends Ti{constructor(e,t,n,s){super(e,t,n,"color");this.$input=document.createElement("input"),this.$input.setAttribute("type","color"),this.$input.setAttribute("tabindex",-1),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$text=document.createElement("input"),this.$text.setAttribute("type","text"),this.$text.setAttribute("spellcheck","false"),this.$text.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this.$display.appendChild(this.$input),this.$widget.appendChild(this.$display),this.$widget.appendChild(this.$text),this._format=ib(this.initialValue),this._rgbScale=s,this._initialValueHexString=this.save(),this._textFocused=!1,this.$input.addEventListener("input",()=>{this._setValueFromHexString(this.$input.value)}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$text.addEventListener("input",()=>{let r=jh(this.$text.value);r&&this._setValueFromHexString(r)}),this.$text.addEventListener("focus",()=>{this._textFocused=!0,this.$text.select()}),this.$text.addEventListener("blur",()=>{this._textFocused=!1,this.updateDisplay(),this._callOnFinishChange()}),this.$disable=this.$text,this.updateDisplay()}reset(){return this._setValueFromHexString(this._initialValueHexString),this}_setValueFromHexString(e){if(this._format.isPrimitive){let t=this._format.fromHexString(e);this.setValue(t)}else this._format.fromHexString(e,this.getValue(),this._rgbScale),this._callOnChange(),this.updateDisplay()}save(){return this._format.toHexString(this.getValue(),this._rgbScale)}load(e){return this._setValueFromHexString(e),this._callOnFinishChange(),this}updateDisplay(){return this.$input.value=this._format.toHexString(this.getValue(),this._rgbScale),this._textFocused||(this.$text.value=this.$input.value.substring(1)),this.$display.style.backgroundColor=this.$input.value,this}},Ic=class extends Ti{constructor(e,t,n){super(e,t,n,"function");this.$button=document.createElement("button"),this.$button.appendChild(this.$name),this.$widget.appendChild(this.$button),this.$button.addEventListener("click",s=>{s.preventDefault(),this.getValue().call(this.object),this._callOnChange()}),this.$button.addEventListener("touchstart",()=>{},{passive:!0}),this.$disable=this.$button}},dg=class extends Ti{constructor(e,t,n,s,r,a){super(e,t,n,"number");this._initInput(),this.min(s),this.max(r);let o=a!==void 0;this.step(o?a:this._getImplicitStep(),o),this.updateDisplay()}decimals(e){return this._decimals=e,this.updateDisplay(),this}min(e){return this._min=e,this._onUpdateMinMax(),this}max(e){return this._max=e,this._onUpdateMinMax(),this}step(e,t=!0){return this._step=e,this._stepExplicit=t,this}updateDisplay(){let e=this.getValue();if(this._hasSlider){let t=(e-this._min)/(this._max-this._min);t=Math.max(0,Math.min(t,1)),this.$fill.style.width=t*100+"%"}return this._inputFocused||(this.$input.value=this._decimals===void 0?e:e.toFixed(this._decimals)),this}_initInput(){this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("aria-labelledby",this.$name.id),window.matchMedia("(pointer: coarse)").matches&&(this.$input.setAttribute("type","number"),this.$input.setAttribute("step","any")),this.$widget.appendChild(this.$input),this.$disable=this.$input;let t=()=>{let x=parseFloat(this.$input.value);isNaN(x)||(this._stepExplicit&&(x=this._snap(x)),this.setValue(this._clamp(x)))},n=x=>{let _=parseFloat(this.$input.value);isNaN(_)||(this._snapClampSetValue(_+x),this.$input.value=this.getValue())},s=x=>{x.key==="Enter"&&this.$input.blur(),x.code==="ArrowUp"&&(x.preventDefault(),n(this._step*this._arrowKeyMultiplier(x))),x.code==="ArrowDown"&&(x.preventDefault(),n(this._step*this._arrowKeyMultiplier(x)*-1))},r=x=>{this._inputFocused&&(x.preventDefault(),n(this._step*this._normalizeMouseWheel(x)))},a=!1,o,l,c,u,h,d=5,p=x=>{o=x.clientX,l=c=x.clientY,a=!0,u=this.getValue(),h=0,window.addEventListener("mousemove",g),window.addEventListener("mouseup",v)},g=x=>{if(a){let _=x.clientX-o,y=x.clientY-l;Math.abs(y)>d?(x.preventDefault(),this.$input.blur(),a=!1,this._setDraggingStyle(!0,"vertical")):Math.abs(_)>d&&v()}a||(h-=(x.clientY-c)*this._step*this._arrowKeyMultiplier(x),u+h>this._max?h=this._max-u:u+h<this._min&&(h=this._min-u),this._snapClampSetValue(u+h)),c=x.clientY},v=()=>{this._setDraggingStyle(!1,"vertical"),this._callOnFinishChange(),window.removeEventListener("mousemove",g),window.removeEventListener("mouseup",v)},m=()=>{this._inputFocused=!0},f=()=>{this._inputFocused=!1,this.updateDisplay(),this._callOnFinishChange()};this.$input.addEventListener("input",t),this.$input.addEventListener("keydown",s),this.$input.addEventListener("wheel",r,{passive:!1}),this.$input.addEventListener("mousedown",p),this.$input.addEventListener("focus",m),this.$input.addEventListener("blur",f)}_initSlider(){this._hasSlider=!0,this.$slider=document.createElement("div"),this.$slider.classList.add("slider"),this.$fill=document.createElement("div"),this.$fill.classList.add("fill"),this.$slider.appendChild(this.$fill),this.$widget.insertBefore(this.$slider,this.$input),this.domElement.classList.add("hasSlider");let e=(f,x,_,y,T)=>(f-x)/(_-x)*(T-y)+y,t=f=>{let x=this.$slider.getBoundingClientRect(),_=e(f,x.left,x.right,this._min,this._max);this._snapClampSetValue(_)},n=f=>{this._setDraggingStyle(!0),t(f.clientX),window.addEventListener("mousemove",s),window.addEventListener("mouseup",r)},s=f=>{t(f.clientX)},r=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("mousemove",s),window.removeEventListener("mouseup",r)},a=!1,o,l,c=f=>{f.preventDefault(),this._setDraggingStyle(!0),t(f.touches[0].clientX),a=!1},u=f=>{f.touches.length>1||(this._hasScrollBar?(o=f.touches[0].clientX,l=f.touches[0].clientY,a=!0):c(f),window.addEventListener("touchmove",h,{passive:!1}),window.addEventListener("touchend",d))},h=f=>{if(a){let x=f.touches[0].clientX-o,_=f.touches[0].clientY-l;Math.abs(x)>Math.abs(_)?c(f):(window.removeEventListener("touchmove",h),window.removeEventListener("touchend",d))}else f.preventDefault(),t(f.touches[0].clientX)},d=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("touchmove",h),window.removeEventListener("touchend",d)},p=this._callOnFinishChange.bind(this),g=400,v,m=f=>{if(Math.abs(f.deltaX)<Math.abs(f.deltaY)&&this._hasScrollBar)return;f.preventDefault();let _=this._normalizeMouseWheel(f)*this._step;this._snapClampSetValue(this.getValue()+_),this.$input.value=this.getValue(),clearTimeout(v),v=setTimeout(p,g)};this.$slider.addEventListener("mousedown",n),this.$slider.addEventListener("touchstart",u,{passive:!1}),this.$slider.addEventListener("wheel",m,{passive:!1})}_setDraggingStyle(e,t="horizontal"){this.$slider&&this.$slider.classList.toggle("active",e),document.body.classList.toggle("lil-gui-dragging",e),document.body.classList.toggle(`lil-gui-${t}`,e)}_getImplicitStep(){return this._hasMin&&this._hasMax?(this._max-this._min)/1e3:.1}_onUpdateMinMax(){!this._hasSlider&&this._hasMin&&this._hasMax&&(this._stepExplicit||this.step(this._getImplicitStep(),!1),this._initSlider(),this.updateDisplay())}_normalizeMouseWheel(e){let{deltaX:t,deltaY:n}=e;return Math.floor(e.deltaY)!==e.deltaY&&e.wheelDelta&&(t=0,n=-e.wheelDelta/120,n*=this._stepExplicit?1:10),t+-n}_arrowKeyMultiplier(e){let t=this._stepExplicit?1:10;return e.shiftKey?t*=10:e.altKey&&(t/=10),t}_snap(e){let t=0;return this._hasMin?t=this._min:this._hasMax&&(t=this._max),e-=t,e=Math.round(e/this._step)*this._step,e+=t,e=parseFloat(e.toPrecision(15)),e}_clamp(e){return e<this._min&&(e=this._min),e>this._max&&(e=this._max),e}_snapClampSetValue(e){this.setValue(this._clamp(this._snap(e)))}get _hasScrollBar(){let e=this.parent.root.$children;return e.scrollHeight>e.clientHeight}get _hasMin(){return this._min!==void 0}get _hasMax(){return this._max!==void 0}},fg=class extends Ti{constructor(e,t,n,s){super(e,t,n,"option");this.$select=document.createElement("select"),this.$select.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this.$select.addEventListener("change",()=>{this.setValue(this._values[this.$select.selectedIndex]),this._callOnFinishChange()}),this.$select.addEventListener("focus",()=>{this.$display.classList.add("focus")}),this.$select.addEventListener("blur",()=>{this.$display.classList.remove("focus")}),this.$widget.appendChild(this.$select),this.$widget.appendChild(this.$display),this.$disable=this.$select,this.options(s)}options(e){return this._values=Array.isArray(e)?e:Object.values(e),this._names=Array.isArray(e)?e:Object.keys(e),this.$select.replaceChildren(),this._names.forEach(t=>{let n=document.createElement("option");n.textContent=t,this.$select.appendChild(n)}),this.updateDisplay(),this}updateDisplay(){let e=this.getValue(),t=this._values.indexOf(e);return this.$select.selectedIndex=t,this.$display.textContent=t===-1?e:this._names[t],this}},pg=class extends Ti{constructor(e,t,n){super(e,t,n,"string");this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("spellcheck","false"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$input.addEventListener("input",()=>{this.setValue(this.$input.value)}),this.$input.addEventListener("keydown",s=>{s.code==="Enter"&&this.$input.blur()}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$widget.appendChild(this.$input),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.value=this.getValue(),this}},sb=`.lil-gui {
  font-family: var(--font-family);
  font-size: var(--font-size);
  line-height: 1;
  font-weight: normal;
  font-style: normal;
  text-align: left;
  color: var(--text-color);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  --background-color: #1f1f1f;
  --text-color: #ebebeb;
  --title-background-color: #111111;
  --title-text-color: #ebebeb;
  --widget-color: #424242;
  --hover-color: #4f4f4f;
  --focus-color: #595959;
  --number-color: #2cc9ff;
  --string-color: #a2db3c;
  --font-size: 11px;
  --input-font-size: 11px;
  --font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
  --font-family-mono: Menlo, Monaco, Consolas, "Droid Sans Mono", monospace;
  --padding: 4px;
  --spacing: 4px;
  --widget-height: 20px;
  --title-height: calc(var(--widget-height) + var(--spacing) * 1.25);
  --name-width: 45%;
  --slider-knob-width: 2px;
  --slider-input-width: 27%;
  --color-input-width: 27%;
  --slider-input-min-width: 45px;
  --color-input-min-width: 45px;
  --folder-indent: 7px;
  --widget-padding: 0 0 0 3px;
  --widget-border-radius: 2px;
  --checkbox-size: calc(0.75 * var(--widget-height));
  --scrollbar-width: 5px;
}
.lil-gui, .lil-gui * {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.lil-gui.root {
  width: var(--width, 245px);
  display: flex;
  flex-direction: column;
  background: var(--background-color);
}
.lil-gui.root > .title {
  background: var(--title-background-color);
  color: var(--title-text-color);
}
.lil-gui.root > .children {
  overflow-x: hidden;
  overflow-y: auto;
}
.lil-gui.root > .children::-webkit-scrollbar {
  width: var(--scrollbar-width);
  height: var(--scrollbar-width);
  background: var(--background-color);
}
.lil-gui.root > .children::-webkit-scrollbar-thumb {
  border-radius: var(--scrollbar-width);
  background: var(--focus-color);
}
@media (pointer: coarse) {
  .lil-gui.allow-touch-styles, .lil-gui.allow-touch-styles .lil-gui {
    --widget-height: 28px;
    --padding: 6px;
    --spacing: 6px;
    --font-size: 13px;
    --input-font-size: 16px;
    --folder-indent: 10px;
    --scrollbar-width: 7px;
    --slider-input-min-width: 50px;
    --color-input-min-width: 65px;
  }
}
.lil-gui.force-touch-styles, .lil-gui.force-touch-styles .lil-gui {
  --widget-height: 28px;
  --padding: 6px;
  --spacing: 6px;
  --font-size: 13px;
  --input-font-size: 16px;
  --folder-indent: 10px;
  --scrollbar-width: 7px;
  --slider-input-min-width: 50px;
  --color-input-min-width: 65px;
}
.lil-gui.autoPlace {
  max-height: 100%;
  position: fixed;
  top: 0;
  right: 15px;
  z-index: 1001;
}

.lil-gui .controller {
  display: flex;
  align-items: center;
  padding: 0 var(--padding);
  margin: var(--spacing) 0;
}
.lil-gui .controller.disabled {
  opacity: 0.5;
}
.lil-gui .controller.disabled, .lil-gui .controller.disabled * {
  pointer-events: none !important;
}
.lil-gui .controller > .name {
  min-width: var(--name-width);
  flex-shrink: 0;
  white-space: pre;
  padding-right: var(--spacing);
  line-height: var(--widget-height);
}
.lil-gui .controller .widget {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  min-height: var(--widget-height);
}
.lil-gui .controller.string input {
  color: var(--string-color);
}
.lil-gui .controller.boolean {
  cursor: pointer;
}
.lil-gui .controller.color .display {
  width: 100%;
  height: var(--widget-height);
  border-radius: var(--widget-border-radius);
  position: relative;
}
@media (hover: hover) {
  .lil-gui .controller.color .display:hover:before {
    content: " ";
    display: block;
    position: absolute;
    border-radius: var(--widget-border-radius);
    border: 1px solid #fff9;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
}
.lil-gui .controller.color input[type=color] {
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}
.lil-gui .controller.color input[type=text] {
  margin-left: var(--spacing);
  font-family: var(--font-family-mono);
  min-width: var(--color-input-min-width);
  width: var(--color-input-width);
  flex-shrink: 0;
}
.lil-gui .controller.option select {
  opacity: 0;
  position: absolute;
  width: 100%;
  max-width: 100%;
}
.lil-gui .controller.option .display {
  position: relative;
  pointer-events: none;
  border-radius: var(--widget-border-radius);
  height: var(--widget-height);
  line-height: var(--widget-height);
  max-width: 100%;
  overflow: hidden;
  word-break: break-all;
  padding-left: 0.55em;
  padding-right: 1.75em;
  background: var(--widget-color);
}
@media (hover: hover) {
  .lil-gui .controller.option .display.focus {
    background: var(--focus-color);
  }
}
.lil-gui .controller.option .display.active {
  background: var(--focus-color);
}
.lil-gui .controller.option .display:after {
  font-family: "lil-gui";
  content: "\u2195";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  padding-right: 0.375em;
}
.lil-gui .controller.option .widget,
.lil-gui .controller.option select {
  cursor: pointer;
}
@media (hover: hover) {
  .lil-gui .controller.option .widget:hover .display {
    background: var(--hover-color);
  }
}
.lil-gui .controller.number input {
  color: var(--number-color);
}
.lil-gui .controller.number.hasSlider input {
  margin-left: var(--spacing);
  width: var(--slider-input-width);
  min-width: var(--slider-input-min-width);
  flex-shrink: 0;
}
.lil-gui .controller.number .slider {
  width: 100%;
  height: var(--widget-height);
  background: var(--widget-color);
  border-radius: var(--widget-border-radius);
  padding-right: var(--slider-knob-width);
  overflow: hidden;
  cursor: ew-resize;
  touch-action: pan-y;
}
@media (hover: hover) {
  .lil-gui .controller.number .slider:hover {
    background: var(--hover-color);
  }
}
.lil-gui .controller.number .slider.active {
  background: var(--focus-color);
}
.lil-gui .controller.number .slider.active .fill {
  opacity: 0.95;
}
.lil-gui .controller.number .fill {
  height: 100%;
  border-right: var(--slider-knob-width) solid var(--number-color);
  box-sizing: content-box;
}

.lil-gui-dragging .lil-gui {
  --hover-color: var(--widget-color);
}
.lil-gui-dragging * {
  cursor: ew-resize !important;
}

.lil-gui-dragging.lil-gui-vertical * {
  cursor: ns-resize !important;
}

.lil-gui .title {
  height: var(--title-height);
  font-weight: 600;
  padding: 0 var(--padding);
  width: 100%;
  text-align: left;
  background: none;
  text-decoration-skip: objects;
}
.lil-gui .title:before {
  font-family: "lil-gui";
  content: "\u25BE";
  padding-right: 2px;
  display: inline-block;
}
.lil-gui .title:active {
  background: var(--title-background-color);
  opacity: 0.75;
}
@media (hover: hover) {
  body:not(.lil-gui-dragging) .lil-gui .title:hover {
    background: var(--title-background-color);
    opacity: 0.85;
  }
  .lil-gui .title:focus {
    text-decoration: underline var(--focus-color);
  }
}
.lil-gui.root > .title:focus {
  text-decoration: none !important;
}
.lil-gui.closed > .title:before {
  content: "\u25B8";
}
.lil-gui.closed > .children {
  transform: translateY(-7px);
  opacity: 0;
}
.lil-gui.closed:not(.transition) > .children {
  display: none;
}
.lil-gui.transition > .children {
  transition-duration: 300ms;
  transition-property: height, opacity, transform;
  transition-timing-function: cubic-bezier(0.2, 0.6, 0.35, 1);
  overflow: hidden;
  pointer-events: none;
}
.lil-gui .children:empty:before {
  content: "Empty";
  padding: 0 var(--padding);
  margin: var(--spacing) 0;
  display: block;
  height: var(--widget-height);
  font-style: italic;
  line-height: var(--widget-height);
  opacity: 0.5;
}
.lil-gui.root > .children > .lil-gui > .title {
  border: 0 solid var(--widget-color);
  border-width: 1px 0;
  transition: border-color 300ms;
}
.lil-gui.root > .children > .lil-gui.closed > .title {
  border-bottom-color: transparent;
}
.lil-gui + .controller {
  border-top: 1px solid var(--widget-color);
  margin-top: 0;
  padding-top: var(--spacing);
}
.lil-gui .lil-gui .lil-gui > .title {
  border: none;
}
.lil-gui .lil-gui .lil-gui > .children {
  border: none;
  margin-left: var(--folder-indent);
  border-left: 2px solid var(--widget-color);
}
.lil-gui .lil-gui .controller {
  border: none;
}

.lil-gui label, .lil-gui input, .lil-gui button {
  -webkit-tap-highlight-color: transparent;
}
.lil-gui input {
  border: 0;
  outline: none;
  font-family: var(--font-family);
  font-size: var(--input-font-size);
  border-radius: var(--widget-border-radius);
  height: var(--widget-height);
  background: var(--widget-color);
  color: var(--text-color);
  width: 100%;
}
@media (hover: hover) {
  .lil-gui input:hover {
    background: var(--hover-color);
  }
  .lil-gui input:active {
    background: var(--focus-color);
  }
}
.lil-gui input:disabled {
  opacity: 1;
}
.lil-gui input[type=text],
.lil-gui input[type=number] {
  padding: var(--widget-padding);
  -moz-appearance: textfield;
}
.lil-gui input[type=text]:focus,
.lil-gui input[type=number]:focus {
  background: var(--focus-color);
}
.lil-gui input[type=checkbox] {
  appearance: none;
  width: var(--checkbox-size);
  height: var(--checkbox-size);
  border-radius: var(--widget-border-radius);
  text-align: center;
  cursor: pointer;
}
.lil-gui input[type=checkbox]:checked:before {
  font-family: "lil-gui";
  content: "\u2713";
  font-size: var(--checkbox-size);
  line-height: var(--checkbox-size);
}
@media (hover: hover) {
  .lil-gui input[type=checkbox]:focus {
    box-shadow: inset 0 0 0 1px var(--focus-color);
  }
}
.lil-gui button {
  outline: none;
  cursor: pointer;
  font-family: var(--font-family);
  font-size: var(--font-size);
  color: var(--text-color);
  width: 100%;
  border: none;
}
.lil-gui .controller button {
  height: var(--widget-height);
  text-transform: none;
  background: var(--widget-color);
  border-radius: var(--widget-border-radius);
}
@media (hover: hover) {
  .lil-gui .controller button:hover {
    background: var(--hover-color);
  }
  .lil-gui .controller button:focus {
    box-shadow: inset 0 0 0 1px var(--focus-color);
  }
}
.lil-gui .controller button:active {
  background: var(--focus-color);
}

@font-face {
  font-family: "lil-gui";
  src: url("data:application/font-woff;charset=utf-8;base64,d09GRgABAAAAAAUsAAsAAAAACJwAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABHU1VCAAABCAAAAH4AAADAImwmYE9TLzIAAAGIAAAAPwAAAGBKqH5SY21hcAAAAcgAAAD0AAACrukyyJBnbHlmAAACvAAAAF8AAACEIZpWH2hlYWQAAAMcAAAAJwAAADZfcj2zaGhlYQAAA0QAAAAYAAAAJAC5AHhobXR4AAADXAAAABAAAABMAZAAAGxvY2EAAANsAAAAFAAAACgCEgIybWF4cAAAA4AAAAAeAAAAIAEfABJuYW1lAAADoAAAASIAAAIK9SUU/XBvc3QAAATEAAAAZgAAAJCTcMc2eJxVjbEOgjAURU+hFRBK1dGRL+ALnAiToyMLEzFpnPz/eAshwSa97517c/MwwJmeB9kwPl+0cf5+uGPZXsqPu4nvZabcSZldZ6kfyWnomFY/eScKqZNWupKJO6kXN3K9uCVoL7iInPr1X5baXs3tjuMqCtzEuagm/AAlzQgPAAB4nGNgYRBlnMDAysDAYM/gBiT5oLQBAwuDJAMDEwMrMwNWEJDmmsJwgCFeXZghBcjlZMgFCzOiKOIFAB71Bb8AeJy1kjFuwkAQRZ+DwRAwBtNQRUGKQ8OdKCAWUhAgKLhIuAsVSpWz5Bbkj3dEgYiUIszqWdpZe+Z7/wB1oCYmIoboiwiLT2WjKl/jscrHfGg/pKdMkyklC5Zs2LEfHYpjcRoPzme9MWWmk3dWbK9ObkWkikOetJ554fWyoEsmdSlt+uR0pCJR34b6t/TVg1SY3sYvdf8vuiKrpyaDXDISiegp17p7579Gp3p++y7HPAiY9pmTibljrr85qSidtlg4+l25GLCaS8e6rRxNBmsnERunKbaOObRz7N72ju5vdAjYpBXHgJylOAVsMseDAPEP8LYoUHicY2BiAAEfhiAGJgZWBgZ7RnFRdnVJELCQlBSRlATJMoLV2DK4glSYs6ubq5vbKrJLSbGrgEmovDuDJVhe3VzcXFwNLCOILB/C4IuQ1xTn5FPilBTj5FPmBAB4WwoqAHicY2BkYGAA4sk1sR/j+W2+MnAzpDBgAyEMQUCSg4EJxAEAwUgFHgB4nGNgZGBgSGFggJMhDIwMqEAYAByHATJ4nGNgAIIUNEwmAABl3AGReJxjYAACIQYlBiMGJ3wQAEcQBEV4nGNgZGBgEGZgY2BiAAEQyQWEDAz/wXwGAAsPATIAAHicXdBNSsNAHAXwl35iA0UQXYnMShfS9GPZA7T7LgIu03SSpkwzYTIt1BN4Ak/gKTyAeCxfw39jZkjymzcvAwmAW/wgwHUEGDb36+jQQ3GXGot79L24jxCP4gHzF/EIr4jEIe7wxhOC3g2TMYy4Q7+Lu/SHuEd/ivt4wJd4wPxbPEKMX3GI5+DJFGaSn4qNzk8mcbKSR6xdXdhSzaOZJGtdapd4vVPbi6rP+cL7TGXOHtXKll4bY1Xl7EGnPtp7Xy2n00zyKLVHfkHBa4IcJ2oD3cgggWvt/V/FbDrUlEUJhTn/0azVWbNTNr0Ens8de1tceK9xZmfB1CPjOmPH4kitmvOubcNpmVTN3oFJyjzCvnmrwhJTzqzVj9jiSX911FjeAAB4nG3HMRKCMBBA0f0giiKi4DU8k0V2GWbIZDOh4PoWWvq6J5V8If9NVNQcaDhyouXMhY4rPTcG7jwYmXhKq8Wz+p762aNaeYXom2n3m2dLTVgsrCgFJ7OTmIkYbwIbC6vIB7WmFfAAAA==") format("woff");
}`;function rb(i){let e=document.createElement("style");e.innerHTML=i;let t=document.querySelector("head link[rel=stylesheet], head style");t?document.head.insertBefore(e,t):document.head.appendChild(e)}var mg=!1,mo=class{constructor({parent:e,autoPlace:t=e===void 0,container:n,width:s,title:r="Controls",closeFolders:a=!1,injectStyles:o=!0,touchStyles:l=!0}={}){if(this.parent=e,this.root=e?e.root:this,this.children=[],this.controllers=[],this.folders=[],this._closed=!1,this._hidden=!1,this.domElement=document.createElement("div"),this.domElement.classList.add("lil-gui"),this.$title=document.createElement("button"),this.$title.classList.add("title"),this.$title.setAttribute("aria-expanded",!0),this.$title.addEventListener("click",()=>this.openAnimated(this._closed)),this.$title.addEventListener("touchstart",()=>{},{passive:!0}),this.$children=document.createElement("div"),this.$children.classList.add("children"),this.domElement.appendChild(this.$title),this.domElement.appendChild(this.$children),this.title(r),this.parent){this.parent.children.push(this),this.parent.folders.push(this),this.parent.$children.appendChild(this.domElement);return}this.domElement.classList.add("root"),l&&this.domElement.classList.add("allow-touch-styles"),!mg&&o&&(rb(sb),mg=!0),n?n.appendChild(this.domElement):t&&(this.domElement.classList.add("autoPlace"),document.body.appendChild(this.domElement)),s&&this.domElement.style.setProperty("--width",s+"px"),this._closeFolders=a}add(e,t,n,s,r){if(Object(n)===n)return new fg(this,e,t,n);let a=e[t];switch(typeof a){case"number":return new dg(this,e,t,n,s,r);case"boolean":return new ug(this,e,t);case"string":return new pg(this,e,t);case"function":return new Ic(this,e,t)}console.error(`gui.add failed
	property:`,t,`
	object:`,e,`
	value:`,a)}addColor(e,t,n=1){return new hg(this,e,t,n)}addFolder(e){let t=new mo({parent:this,title:e});return this.root._closeFolders&&t.close(),t}load(e,t=!0){return e.controllers&&this.controllers.forEach(n=>{n instanceof Ic||n._name in e.controllers&&n.load(e.controllers[n._name])}),t&&e.folders&&this.folders.forEach(n=>{n._title in e.folders&&n.load(e.folders[n._title])}),this}save(e=!0){let t={controllers:{},folders:{}};return this.controllers.forEach(n=>{if(!(n instanceof Ic)){if(n._name in t.controllers)throw new Error(`Cannot save GUI with duplicate property "${n._name}"`);t.controllers[n._name]=n.save()}}),e&&this.folders.forEach(n=>{if(n._title in t.folders)throw new Error(`Cannot save GUI with duplicate folder "${n._title}"`);t.folders[n._title]=n.save()}),t}open(e=!0){return this._setClosed(!e),this.$title.setAttribute("aria-expanded",!this._closed),this.domElement.classList.toggle("closed",this._closed),this}close(){return this.open(!1)}_setClosed(e){this._closed!==e&&(this._closed=e,this._callOnOpenClose(this))}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}openAnimated(e=!0){return this._setClosed(!e),this.$title.setAttribute("aria-expanded",!this._closed),requestAnimationFrame(()=>{let t=this.$children.clientHeight;this.$children.style.height=t+"px",this.domElement.classList.add("transition");let n=r=>{r.target===this.$children&&(this.$children.style.height="",this.domElement.classList.remove("transition"),this.$children.removeEventListener("transitionend",n))};this.$children.addEventListener("transitionend",n);let s=e?this.$children.scrollHeight:0;this.domElement.classList.toggle("closed",!e),requestAnimationFrame(()=>{this.$children.style.height=s+"px"})}),this}title(e){return this._title=e,this.$title.textContent=e,this}reset(e=!0){return(e?this.controllersRecursive():this.controllers).forEach(n=>n.reset()),this}onChange(e){return this._onChange=e,this}_callOnChange(e){this.parent&&this.parent._callOnChange(e),this._onChange!==void 0&&this._onChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(e){this.parent&&this.parent._callOnFinishChange(e),this._onFinishChange!==void 0&&this._onFinishChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}onOpenClose(e){return this._onOpenClose=e,this}_callOnOpenClose(e){this.parent&&this.parent._callOnOpenClose(e),this._onOpenClose!==void 0&&this._onOpenClose.call(this,e)}destroy(){this.parent&&(this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.folders.splice(this.parent.folders.indexOf(this),1)),this.domElement.parentElement&&this.domElement.parentElement.removeChild(this.domElement),Array.from(this.children).forEach(e=>e.destroy())}controllersRecursive(){let e=Array.from(this.controllers);return this.folders.forEach(t=>{e=e.concat(t.controllersRecursive())}),e}foldersRecursive(){let e=Array.from(this.folders);return this.folders.forEach(t=>{e=e.concat(t.foldersRecursive())}),e}};var br=Gd(gg()),Jh=class{constructor(){this.enabled=!1,this.helpers=!1,this.gui=new mo({autoPlace:!1}),this.gui.domElement.id="gui",this.stats=new br.default,this.stats.showPanel(0),this.perfFolder=this.gui.addFolder("Monitoring"),this.pixelsPanel=this.stats.addPanel(new br.default.Panel("pixels","#5A87FF","#111116")),this.trianglesPanel=this.stats.addPanel(new br.default.Panel("triangles","#61C3FF","#111116")),this.callsPanel=this.stats.addPanel(new br.default.Panel("calls","#FF7C72","#111116")),this.objects3DPanel=this.stats.addPanel(new br.default.Panel("3D objects","#A6FF8F","#111116")),this.entitiesPanel=this.stats.addPanel(new br.default.Panel("entities","#C26EFF","#111116"))}enable(e){this.enabled||(this.enabled=!0,this.helpers=!!e,this.stats.dom.style.cssText="pointer-events: none; display: flex; flex-wrap: wrap; position: relative;",this.stats.dom.querySelectorAll("canvas").forEach(t=>t.style.display="inline-block"),this.perfLiEl=document.createElement("div"),this.perfLiEl.appendChild(this.stats.dom),this.perfFolder.$children.appendChild(this.perfLiEl),this.gui.domElement.style.cssText="--width: 320px; position: fixed; z-index: 1000; top: 0px; right: 0px",document.body.appendChild(this.gui.domElement),this.helpers&&document.body.classList.add("debug"))}disable(){!this.enabled||(this.enabled=!1,this.perfFolder.$children.removeChild(this.perfLiEl),document.body.removeChild(this.gui.domElement),this.helpers&&document.body.classList.add("debug"))}};var Lc=class extends Rt{constructor(e=document.createElement("div")){super();this.isCSS2DObject=!0,this.element=e,this.element.style.position="absolute",this.element.style.userSelect="none",this.element.setAttribute("draggable",!1),this.center=new Re(.5,.5),this.addEventListener("removed",function(){this.traverse(function(t){t.element instanceof t.element.ownerDocument.defaultView.Element&&t.element.parentNode!==null&&t.element.remove()})})}copy(e,t){return super.copy(e,t),this.element=e.element.cloneNode(!0),this.center=e.center,this}},Aa=new k,vg=new Ze,xg=new Ze,yg=new k,Ag=new k,$h=class{constructor(e={}){let t=this,n,s,r,a,o={objects:new WeakMap},l=e.element!==void 0?e.element:document.createElement("div");l.style.overflow="hidden",this.domElement=l,this.getSize=function(){return{width:n,height:s}},this.render=function(g,v){g.matrixWorldAutoUpdate===!0&&g.updateMatrixWorld(),v.parent===null&&v.matrixWorldAutoUpdate===!0&&v.updateMatrixWorld(),vg.copy(v.matrixWorldInverse),xg.multiplyMatrices(v.projectionMatrix,vg),u(g,g,v),p(g)},this.setSize=function(g,v){n=g,s=v,r=n/2,a=s/2,l.style.width=g+"px",l.style.height=v+"px"};function c(g){g.isCSS2DObject&&(g.element.style.display="none");for(let v=0,m=g.children.length;v<m;v++)c(g.children[v])}function u(g,v,m){if(g.visible===!1){c(g);return}if(g.isCSS2DObject){Aa.setFromMatrixPosition(g.matrixWorld),Aa.applyMatrix4(xg);let f=Aa.z>=-1&&Aa.z<=1&&g.layers.test(m.layers)===!0,x=g.element;x.style.display=f===!0?"":"none",f===!0&&(g.onBeforeRender(t,v,m),x.style.transform="translate("+-100*g.center.x+"%,"+-100*g.center.y+"%)translate("+(Aa.x*r+r)+"px,"+(-Aa.y*a+a)+"px)",x.parentNode!==l&&l.appendChild(x),g.onAfterRender(t,v,m));let _={distanceToCameraSquared:h(m,g)};o.objects.set(g,_)}for(let f=0,x=g.children.length;f<x;f++)u(g.children[f],v,m)}function h(g,v){return yg.setFromMatrixPosition(g.matrixWorld),Ag.setFromMatrixPosition(v.matrixWorld),yg.distanceToSquared(Ag)}function d(g){let v=[];return g.traverseVisible(function(m){m.isCSS2DObject&&v.push(m)}),v}function p(g){let v=d(g).sort(function(f,x){if(f.renderOrder!==x.renderOrder)return x.renderOrder-f.renderOrder;let _=o.objects.get(f).distanceToCameraSquared,y=o.objects.get(x).distanceToCameraSquared;return _-y}),m=v.length;for(let f=0,x=v.length;f<x;f++)v[f].element.style.zIndex=m-f}}};var _g=class{constructor(e,t,n){this.$connector1=e,this.$connector2=t,this.$el=document.createElementNS("http://www.w3.org/2000/svg","polyline"),this.$el.setAttribute("points","0 0 32 0 64 32"),this.$el.style.stroke="var(--hex-fg-4)",this.$el.style.fill="none",this.$el.style.strokeWidth="1px",this.$el.style.strokeLinejoin="square",this.flipped=n,this.rect1=this.$connector1.getBoundingClientRect(),this.rect2=this.$connector2.getBoundingClientRect(),this.gap=4,this.x=0,this.y=0,this.targetX=0,this.targetY=0,this.renders=0}updatePoints(e,t,n,s,r,a){this.$el.setAttribute("points",`${e} ${t} ${n} ${s} ${r} ${a}`)}updateConnector1Dimensions(){this.rect1=this.$connector1.getBoundingClientRect()}updateCoords(){if(!this.renders){let r=this.$connector2.style.transform;if(r){let a=r.split(") translate(");if(a.length){let o=a[1].split(", ");o.length&&(this.targetX=parseFloat(o[0]),this.targetY=parseFloat(o[1]),!this.x&&!this.y&&(this.x=this.targetX,this.y=this.targetY))}}}this.x=V.lerp(this.x,this.targetX,.25),this.y=V.lerp(this.y,this.targetY,.25),this.renders++,this.renders>3&&(this.renders=0);let e=this.rect1.height/2+1,t=this.rect1.top,n=this.y,s=n+e-(t+e);if(this.flipped){let r=this.rect1.left-this.gap,a=t+e,o=this.x,l=n+e,c=Math.abs(s),u=r-o;c>u&&(c=Math.max(0,u));let h=o+c,d=a;this.updatePoints(r,a,h,d,o,l)}else{let r=this.gap+this.rect1.right,a=t+e,o=this.x,l=n+e,c=Math.abs(s),u=o-r;c>u&&(c=Math.max(0,u));let h=o-c,d=a;this.updatePoints(r,a,h,d,o,l)}}},ed=class{constructor(e){let t=document.createElement("div");t.innerHTML=`
    <svg id="path-animation" viewBox="0 0 0 0"></svg>
    `,this.$el=t.firstElementChild,this.$path=this.$el.querySelector("polyline"),this.lines=[],this.$parent=e,this.$parent.appendChild(this.$el),this.updateDimensions()}createLine(e,t,n,s){let r=new _g(e,t,n);s&&r.$el.classList.add(s),this.$el.appendChild(r.$el),this.lines.push(r)}update(){for(let e=0,t=this.lines.length;e<t;e++)this.lines[e].updateCoords()}updateDimensions(){let e=this.$parent.offsetWidth,t=this.$parent.offsetHeight;this.$el.setAttribute("viewBox",`0 0 ${e} ${t}`),this.lines.forEach(n=>n.updateConnector1Dimensions())}};var td=class{constructor(e){this.debug=e,this.domViewportEl=document.getElementById("engine"),this.renderer=new to({powerPreference:"high-performance",antialias:!1,alpha:!1,stencil:!1,depth:!1}),this.renderer.setPixelRatio(1),this.renderer.outputColorSpace=nt,this.renderer.domElement.id="renderer",this.renderer.info.autoReset=!1,this.CSSRenderer=new qh,this.CSSRenderer.domElement.id="css-renderer",this.labelsRenderer=new $h,this.labelsRenderer.domElement.id="labels-renderer",this.width=this.domViewportEl.offsetWidth,this.height=this.domViewportEl.offsetHeight,this.aspectRatio=this.width/this.height,this.lines=new ed(this.labelsRenderer.domElement),this.scene=new Ki,this.scene.background=new ye(16777215),this.fov=40,this.camera=new qt(this.fov,this.aspectRatio,1,1e3),this.$output=document.createElement("div");let t=String.raw;this.$output.innerHTML=t`
      <svg class="output-progress-bg" viewBox="0 0 614 614">
        <g fill="none" fill-rule="evenodd" stroke="currentColor" stroke-width="5">
          <path d="M310.500816,16.5151574 C388.463924,17.3029412 459.084769,48.7495124 510.882318,99.3738384"></path>
          <path d="M515.130663,103.611934 C565.939831,155.348014 597.563252,225.989466 598.479596,304.014416"></path>
          <path d="M598.488972,310.001429 C597.830864,388.162526 566.358163,458.974586 515.625661,510.882819"></path>
          <path d="M511.387565,515.131164 C459.543848,566.04604 388.716012,597.695256 310.497994,598.484871"></path>
          <path d="M304.498499,598.484829 C226.280452,597.694123 155.454223,566.04513 103.611433,515.131164" ></path>
          <path d="M99.3733373,510.882819 C48.6401567,458.973892 17.1672932,388.160634 16.51,309.998296"></path>
          <path d="M16.5201414,303.999 C17.4402555,225.979392 49.06279,155.344325 99.8683349,103.611934"></path>
          <path d="M104.11668,99.3738384 C155.911216,48.7524579 226.526856,17.3066006 304.484574,16.5150897"></path>
        </g>
      </svg>
      <svg class="output-progress" viewBox="0 0 614 614">
        <g fill="none" fill-rule="evenodd" stroke="currentColor" stroke-width="5">
          <path d="M310.500816,16.5151574 C388.463924,17.3029412 459.084769,48.7495124 510.882318,99.3738384"></path>
          <path d="M515.130663,103.611934 C565.939831,155.348014 597.563252,225.989466 598.479596,304.014416"></path>
          <path d="M598.488972,310.001429 C597.830864,388.162526 566.358163,458.974586 515.625661,510.882819"></path>
          <path d="M511.387565,515.131164 C459.543848,566.04604 388.716012,597.695256 310.497994,598.484871"></path>
          <path d="M304.498499,598.484829 C226.280452,597.694123 155.454223,566.04513 103.611433,515.131164" ></path>
          <path d="M99.3733373,510.882819 C48.6401567,458.973892 17.1672932,388.160634 16.51,309.998296"></path>
          <path d="M16.5201414,303.999 C17.4402555,225.979392 49.06279,155.344325 99.8683349,103.611934"></path>
          <path d="M104.11668,99.3738384 C155.911216,48.7524579 226.526856,17.3066006 304.484574,16.5150897"></path>
        </g>
      </svg>

      <div id="intuitive-demo" class="feature-demo">
        <div class="shape square fill"></div>
      </div>

      <div id="additive-demo" class="feature-demo">
        <div class="shape circle"></div>
        <div class="shape square"></div>
        <div class="shape circle fill"></div>
        <div class="shape square fill"></div>
        <div class="shape circle"></div>
        <div class="shape square"></div>
        <div class="shape circle fill"></div>
        <div class="shape square fill"></div>
        <div class="shape circle"></div>
        <div class="shape square"></div>
        <div class="shape circle fill"></div>
        <div class="shape square fill"></div>
      </div>

      <div id="drawable-demo" class="feature-demo">
        <div class="svg-tracks">
          <svg class="svg-track svg-track-bg" opacity=".4" viewBox="0 0 304 112"><g stroke="none" fill="none" fill-rule="evenodd"><path d="M189.142857,4 C227.456875,4 248.420457,4.00974888 256.864191,4.00974888 C263.817211,4.00974888 271.61219,3.69583517 274.986231,6.63061513 C276.382736,7.84531176 279.193529,11.3814152 280.479499,13.4815847 C281.719344,15.5064248 284.841964,20.3571626 275.608629,20.3571626 C265.817756,20.3571626 247.262478,19.9013915 243.955117,19.9013915 C239.27946,19.9013915 235.350655,24.7304885 228.6344,24.7304885 C224.377263,24.7304885 219.472178,21.0304113 214.535324,21.0304113 C207.18393,21.0304113 200.882842,30.4798911 194.124187,30.4798911 C186.992968,30.4798911 182.652552,23.6245972 173.457298,23.6245972 C164.83277,23.6245972 157.191045,31.5424105 157.191045,39.1815359 C157.191045,48.466779 167.088672,63.6623005 166.666679,66.9065088 C166.378668,69.1206889 155.842137,79.2568633 151.508744,77.8570506 C145.044576,75.7689355 109.126667,61.6405346 98.7556561,52.9785141 C96.4766876,51.0750861 89.3680347,39.5769094 83.4195005,38.5221785 C80.6048001,38.0231057 73.0179337,38.7426555 74.4158694,42.6956376 C76.7088819,49.1796531 86.3280337,64.1214904 87.1781062,66.9065088 C88.191957,70.2280995 86.4690152,77.0567847 82.2060607,79.2503488 C79.2489435,80.7719756 73.1324132,82.8858479 64.7015706,83.0708761 C55.1604808,83.2802705 44.4254811,80.401884 39.1722168,80.401884 C25.7762119,80.401884 24.3280517,89.1260466 22.476679,94.4501705 C21.637667,96.8629767 20.4337535,108 33.2301959,108 C37.8976087,108 45.0757044,107.252595 53.4789069,103.876424 C61.8821095,100.500252 122.090049,78.119656 128.36127,75.3523302 C141.413669,69.5926477 151.190142,68.4987755 147.018529,52.0784879 C143.007818,36.291544 143.396957,23.4057975 145.221196,19.6589263 C146.450194,17.1346449 148.420955,14.8552817 153.206723,15.7880203 C155.175319,16.1716965 155.097637,15.0525421 156.757598,11.3860986 C158.417558,7.71965506 161.842736,4.00974888 167.736963,4.00974888 C177.205308,4.00974888 184.938832,4 189.142857,4 Z" stroke="currentColor" stroke-width="6"></path></g></svg>
          <svg class="svg-track svg-track-higlight" viewBox="0 0 304 112"><g stroke="none" fill="none" fill-rule="evenodd"><path d="M189.142857,4 C227.456875,4 248.420457,4.00974888 256.864191,4.00974888 C263.817211,4.00974888 271.61219,3.69583517 274.986231,6.63061513 C276.382736,7.84531176 279.193529,11.3814152 280.479499,13.4815847 C281.719344,15.5064248 284.841964,20.3571626 275.608629,20.3571626 C265.817756,20.3571626 247.262478,19.9013915 243.955117,19.9013915 C239.27946,19.9013915 235.350655,24.7304885 228.6344,24.7304885 C224.377263,24.7304885 219.472178,21.0304113 214.535324,21.0304113 C207.18393,21.0304113 200.882842,30.4798911 194.124187,30.4798911 C186.992968,30.4798911 182.652552,23.6245972 173.457298,23.6245972 C164.83277,23.6245972 157.191045,31.5424105 157.191045,39.1815359 C157.191045,48.466779 167.088672,63.6623005 166.666679,66.9065088 C166.378668,69.1206889 155.842137,79.2568633 151.508744,77.8570506 C145.044576,75.7689355 109.126667,61.6405346 98.7556561,52.9785141 C96.4766876,51.0750861 89.3680347,39.5769094 83.4195005,38.5221785 C80.6048001,38.0231057 73.0179337,38.7426555 74.4158694,42.6956376 C76.7088819,49.1796531 86.3280337,64.1214904 87.1781062,66.9065088 C88.191957,70.2280995 86.4690152,77.0567847 82.2060607,79.2503488 C79.2489435,80.7719756 73.1324132,82.8858479 64.7015706,83.0708761 C55.1604808,83.2802705 44.4254811,80.401884 39.1722168,80.401884 C25.7762119,80.401884 24.3280517,89.1260466 22.476679,94.4501705 C21.637667,96.8629767 20.4337535,108 33.2301959,108 C37.8976087,108 45.0757044,107.252595 53.4789069,103.876424 C61.8821095,100.500252 122.090049,78.119656 128.36127,75.3523302 C141.413669,69.5926477 151.190142,68.4987755 147.018529,52.0784879 C143.007818,36.291544 143.396957,23.4057975 145.221196,19.6589263 C146.450194,17.1346449 148.420955,14.8552817 153.206723,15.7880203 C155.175319,16.1716965 155.097637,15.0525421 156.757598,11.3860986 C158.417558,7.71965506 161.842736,4.00974888 167.736963,4.00974888 C177.205308,4.00974888 184.938832,4 189.142857,4 Z" stroke="currentColor" stroke-width="2"></path></g></svg>
          <div class="svg-track">
            <div class="svg-car"></div>
          </div>
        </div>
      </div>

      <div id="scrollable-demo" class="feature-demo">
        <svg id="sphere-animation" viewBox="0 0 402 402">
          <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <path d="M342.057269,342.05826 C317.650269,366.46626 290.938269,379.32826 282.395269,370.78526 C273.853269,362.24226 286.714269,335.53026 311.121269,311.12226 C335.529269,286.71526 362.241269,273.85326 370.784269,282.39626 C379.326269,290.93926 366.465269,317.65126 342.057269,342.05826 L342.057269,342.05826 Z" fill-rule="nonzero" stroke-dasharray="280.7113952636719"></path>
            <path d="M341.173269,341.17426 C305.294269,377.05426 265.919269,395.85126 253.227269,383.15926 C240.535269,370.46726 259.332269,331.09226 295.212269,295.21226 C331.091269,259.33326 370.466269,240.53626 383.158269,253.22826 C395.850269,265.92026 377.053269,305.29526 341.174269,341.17426 L341.173269,341.17426 Z" fill-rule="nonzero" stroke-dasharray="413.3923645019531"></path>
            <path d="M337.638269,337.63926 C292.728269,382.54926 243.262269,405.89726 227.153269,389.78826 C211.043269,373.67826 234.391269,324.21326 279.302269,279.30326 C324.212269,234.39326 373.678269,211.04426 389.787269,227.15326 C405.897269,243.26326 382.548269,292.72926 337.638269,337.63926 Z" fill-rule="nonzero" stroke-dasharray="518.689697265625"></path>
            <path d="M331.451269,331.45226 C278.241269,384.66126 219.872269,412.55926 201.078269,393.76526 C182.284269,374.97226 210.183269,316.60226 263.392269,263.39326 C316.601269,210.18326 374.971269,182.28526 393.765269,201.07926 C412.559269,219.87326 384.660269,278.24326 331.451269,331.45226 L331.451269,331.45226 Z" fill-rule="nonzero" stroke-dasharray="612.8993530273438"></path>
            <path d="M323.496269,323.49726 C263.696269,383.29626 198.204269,414.75726 177.213269,393.76526 C156.223269,372.77526 187.683269,307.28226 247.482269,247.48326 C307.281269,187.68326 372.774269,156.22326 393.765269,177.21426 C414.755269,198.20426 383.295269,263.69826 323.495269,323.49726 L323.496269,323.49726 Z" fill-rule="nonzero" stroke-dasharray="688.08056640625"></path>
            <path d="M315.099269,315.10026 C249.930269,380.26926 178.402269,414.40026 155.337269,391.33526 C132.272269,368.26926 166.403269,296.74226 231.572269,231.57326 C296.741269,166.40426 368.269269,132.27326 391.334269,155.33826 C414.399269,178.40326 380.268269,249.93126 315.099269,315.10026 Z" fill-rule="nonzero" stroke-dasharray="750.9237060546875"></path>
            <path d="M305.376269,305.37726 C235.570269,375.18326 158.996269,411.78826 134.345269,387.13726 C109.693269,362.48526 146.298269,285.91126 216.104269,216.10526 C285.910269,146.29926 362.484269,109.69426 387.135269,134.34526 C411.787269,158.99826 375.182269,235.57126 305.376269,305.37726 Z" fill-rule="nonzero" stroke-dasharray="804.0537109375"></path>
            <path d="M293.443269,293.44526 C220.221269,366.66826 139.888269,405.05426 114.015269,379.18126 C88.143269,353.30926 126.529269,272.97626 199.752269,199.75326 C272.975269,126.53026 353.308269,88.1442597 379.181269,114.01626 C405.053269,139.88926 366.667269,220.22126 293.444269,293.44526 L293.443269,293.44526 Z" fill-rule="nonzero" stroke-dasharray="843.49072265625"></path>
            <path d="M280.628269,280.62826 C204.719269,356.53726 121.518269,396.40626 94.791269,369.68026 C68.065269,342.95326 107.934269,259.75126 183.842269,183.84326 C259.750269,107.93526 342.952269,68.0652597 369.679269,94.7922597 C396.405269,121.51826 356.536269,204.72026 280.628269,280.62826 L280.628269,280.62826 Z" fill-rule="nonzero" stroke-dasharray="873.8916015625"></path>
            <path d="M265.160269,265.16026 C187.543269,342.77726 102.857269,383.93326 76.008269,357.08426 C49.160269,330.23626 90.316269,245.55026 167.932269,167.93426 C245.549269,90.3162597 330.235269,49.1602597 357.083269,76.0082597 C383.932269,102.85726 342.776269,187.54326 265.160269,265.15926 L265.160269,265.16026 Z" fill-rule="nonzero" stroke-dasharray="890.8994140625"></path>
            <path d="M249.692269,248.80926 C171.587269,326.91326 86.505269,368.46526 59.657269,341.61626 C32.808269,314.76826 74.360269,229.68626 152.464269,151.58126 C230.569269,73.4772597 315.651269,31.9252597 342.499269,58.7742597 C369.348269,85.6222597 327.796269,170.70426 249.692269,248.80926 L249.692269,248.80926 Z" fill-rule="nonzero" stroke-dasharray="895.5676879882812"></path>
            <path d="M233.340269,233.34026 C155.723269,310.95826 71.037269,352.11426 44.189269,325.26626 C17.340269,298.41626 58.496269,213.73026 136.113269,136.11326 C213.729269,58.4972597 298.415269,17.3412597 325.263269,44.1902597 C352.113269,71.0382597 310.956269,155.72426 233.340269,233.34026 Z" fill-rule="nonzero" stroke-dasharray="890.8988037109375"></path>
            <path d="M217.430269,217.43026 C141.522269,293.34026 58.320269,333.20926 31.593269,306.48326 C4.86726902,279.75626 44.736269,196.55526 120.645269,120.64626 C196.553269,44.7382597 279.755269,4.86925972 306.481269,31.5962597 C333.208269,58.3222597 293.338269,141.52426 217.430269,217.43226 L217.430269,217.43026 Z" fill-rule="nonzero" stroke-dasharray="873.893798828125"></path>
            <path d="M201.520269,201.52026 C128.297269,274.74526 47.963269,313.13026 22.092269,287.25926 C-3.78073098,261.38626 34.605269,181.05326 107.828269,107.83026 C181.053269,34.6062597 261.384269,-3.77974028 287.257269,22.0922597 C313.129269,47.9652597 274.743269,128.29826 201.520269,201.52126 L201.520269,201.52026 Z" fill-rule="nonzero" stroke-dasharray="843.4929809570312"></path>
            <path d="M185.610269,185.61026 C115.804269,255.41726 39.230269,292.02226 14.579269,267.37026 C-10.072731,242.71826 26.532269,166.14526 96.338269,96.3392597 C166.144269,26.5322597 242.718269,-10.0717403 267.369269,14.5792597 C292.021269,39.2312597 255.416269,115.80526 185.610269,185.61126 L185.610269,185.61026 Z" fill-rule="nonzero" stroke-dasharray="804.0543212890625"></path>
            <path d="M169.700269,169.70126 C104.531269,234.87026 33.004269,269.00126 9.93826902,245.93626 C-13.126731,222.87126 21.004269,151.34326 86.173269,86.1742597 C151.342269,21.0052597 222.870269,-13.1257403 245.935269,9.93925972 C269.000269,33.0042597 234.869269,104.53226 169.700269,169.70126 Z" fill-rule="nonzero" stroke-dasharray="750.9235229492188"></path>
            <path d="M153.790269,153.79126 C93.991269,213.59126 28.498269,245.05126 7.50826902,224.06026 C-13.482731,203.07026 17.978269,137.57626 77.776269,77.7772597 C137.576269,17.9782597 203.068269,-13.4827403 224.059269,7.50825972 C245.049269,28.4992597 213.589269,93.9922597 153.790269,153.79126 L153.790269,153.79126 Z" fill-rule="nonzero" stroke-dasharray="688.0787353515625"></path>
            <path d="M137.880269,137.88126 C84.671269,191.09126 26.302269,218.98926 7.50826902,200.19526 C-11.285731,181.40126 16.612269,123.03126 69.821269,69.8222597 C123.031269,16.6132597 181.401269,-11.2857403 200.194269,7.50825972 C218.988269,26.3022597 191.089269,84.6722597 137.880269,137.88126 Z" fill-rule="nonzero" stroke-dasharray="612.899169921875"></path>
            <path d="M121.970269,121.97126 C77.060269,166.88126 27.594269,190.23026 11.485269,174.12126 C-4.62473098,158.01126 18.724269,108.54526 63.635269,63.6352597 C108.545269,18.7252597 158.010269,-4.62274028 174.120269,11.4852597 C190.229269,27.5952597 166.880269,77.0612597 121.970269,121.97126 Z" fill-rule="nonzero" stroke-dasharray="518.690673828125"></path>
            <path d="M106.061269,106.06126 C70.181269,141.94126 30.806269,160.73826 18.114269,148.04626 C5.42226902,135.35426 24.219269,95.9792597 60.099269,60.0992597 C95.978269,24.2202597 135.353269,5.42325972 148.045269,18.1152597 C160.737269,30.8072597 141.940269,70.1822597 106.061269,106.06126 Z" fill-rule="nonzero" stroke-dasharray="413.3919372558594"></path>
            <path d="M90.151269,90.1522597 C65.743269,114.55926 39.031269,127.42026 30.488269,118.87826 C21.946269,110.33526 34.807269,83.6232597 59.215269,59.2162597 C83.622269,34.8082597 110.335269,21.9462597 118.877269,30.4892597 C127.420269,39.0322597 114.558269,65.7442597 90.151269,90.1522597 Z" fill-rule="nonzero" stroke-dasharray="280.7110900878906"></path>
          </g>
        </svg>
      </div>

      <div id="staggering-demo" class="feature-demo">
      </div>

      <div class="feature-demo"></div>

      <div id="precise-demo" class="feature-demo">
        <svg class="clock-grid" width="400px" height="400px" viewBox="0 0 400 400">
          <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g class="circle-grid-drawable" opacity="1" transform="translate(18.9387, 18.9387)" stroke="currentColor" stroke-linecap="butt" stroke-linejoin="square" stroke-width="5">
              <path d="M287.120579,74.9885455 C259.976449,47.8478276 222.479216,31.0612724 181.061272,31.0612724" id="0.0_0.125"></path>
              <path d="M362.123934,149.987156 C334.979804,122.846438 297.482571,106.059883 256.064627,106.059883" id="0.0_0.125" transform="translate(309.0943, 128.0235) rotate(45) translate(-309.0943, -128.0235)"></path>
              <path d="M362.127289,256.054562 C334.983159,228.913845 297.485926,212.127289 256.067982,212.127289" id="0.0_0.125" transform="translate(309.0976, 234.0909) rotate(90) translate(-309.0976, -234.0909)"></path>
              <path d="M287.128679,331.057917 C259.984549,303.917199 222.487315,287.130644 181.069372,287.130644" id="0.0_0.125" transform="translate(234.099, 309.0943) rotate(135) translate(-234.099, -309.0943)"></path>
              <path d="M181.061272,331.061272 C153.917142,303.920554 116.419909,287.133999 75.0019654,287.133999" id="0.0_0.125" transform="translate(128.0316, 309.0976) rotate(180) translate(-128.0316, -309.0976)"></path>
              <path d="M106.057917,256.062662 C78.9137868,228.921944 41.4165536,212.135389 -0.00138957053,212.135389" id="0.0_0.125" transform="translate(53.0283, 234.099) rotate(225) translate(-53.0283, -234.099)"></path>
              <path d="M106.054562,149.995255 C78.9104318,122.854538 41.4131986,106.067982 -0.00474459127,106.067982" id="0.0_0.125" transform="translate(53.0249, 128.0316) rotate(270) translate(-53.0249, -128.0316)"></path>
              <path d="M181.053173,74.9919005 C153.909042,47.8511826 116.411809,31.0646274 74.9938656,31.0646274" id="0.0_0.125" transform="translate(128.0235, 53.0283) rotate(315) translate(-128.0235, -53.0283)"></path>
            </g>
          </g>
        </svg>
        <div class="timeline-playhead"></div>
      </div>
      <div id="responsive-demo" class="feature-demo">
        <div class="responsive-viewport">
          <div class="shape"><div class="circle"></div></div>
          <div class="shape"><div class="circle"></div></div>
          <div class="shape"><div class="circle"></div></div>
          <div class="shape"><div class="circle"></div></div>
          <div class="shape"><div class="circle"></div></div>
        </div>
      </div>
    `,this.$output.classList.add("output"),this.$output.style.pointerEvents="none",this.CSSRenderer.domElement.appendChild(this.$output),this.domViewportEl.appendChild(this.renderer.domElement),this.domViewportEl.appendChild(this.CSSRenderer.domElement),this.domViewportEl.appendChild(this.labelsRenderer.domElement),this.updateDimensions(),this.debug.helpers&&this.scene.add(new cc(this.camera))}updateDimensions(){this.width=this.domViewportEl.offsetWidth&~1,this.height=this.domViewportEl.offsetHeight&~1,this.aspectRatio=this.width/this.height,this.camera.aspect=this.aspectRatio,this.camera.fov=this.fov*((this.height>=1e3?this.height:1e3)/1e3),this.camera.updateProjectionMatrix(),this.renderer.setSize(this.width,this.height),this.renderer.domElement.style.position="absolute",this.renderer.domElement.style.top="0px",this.renderer.domElement.style.left="0px",this.CSSRenderer.setSize(this.width,this.height),this.CSSRenderer.domElement.style.position="absolute",this.CSSRenderer.domElement.style.top="0px",this.CSSRenderer.domElement.style.left="0px",this.labelsRenderer.setSize(this.width,this.height),this.labelsRenderer.domElement.style.position="absolute",this.labelsRenderer.domElement.style.top="0px",this.labelsRenderer.domElement.style.left="0px",this.lines.updateDimensions(),this.debug.enabled&&this.debug.pixelsPanel.update(this.width*this.height,8e6)}};var nd=class{constructor(e,t){this.ambientLight=new nc(16777215,2),this.directionalLight=new ra(16777215,1),this.directionalLight.castShadow=!0;let n=16;if(this.directionalLight.shadow.mapSize.width=1024*8,this.directionalLight.shadow.mapSize.height=1024*8,this.directionalLight.shadow.camera.near=1,this.directionalLight.shadow.camera.far=1e3,this.directionalLight.shadow.bias=-3e-5,this.directionalLight.shadow.radius=1,this.directionalLight.shadow.camera.left=-n,this.directionalLight.shadow.camera.right=n,this.directionalLight.shadow.camera.top=n,this.directionalLight.shadow.camera.bottom=-n,this.stage=e,t.enabled){let s=t.gui.addFolder("Lights");s.add(this,"x").min(-300).max(300).step(1),s.add(this,"y").min(-300).max(300).step(1),s.add(this,"z").min(-300).max(300).step(1)}t.helpers&&e.scene.add(new oc(this.directionalLight,10,16711680))}_setLightsPosition(e,t){this.directionalLight.position[e]=t,this.stage.renderer.shadowMap.needsUpdate=!0}get x(){return this.directionalLight.position.x}set x(e){this._setLightsPosition("x",e),this.directionalLight.lookAt(this.stage.scene.position)}get y(){return this.directionalLight.position.y}set y(e){this._setLightsPosition("y",e),this.directionalLight.lookAt(this.stage.scene.position)}get z(){return this.directionalLight.position.z}set z(e){this._setLightsPosition("z",e),this.directionalLight.lookAt(this.stage.scene.position)}};var id=1/1e3,ab=1e3,ob=class{constructor(){this.startTime=performance.now(),this.previousTime=0,this.currentTime=0,this._delta=0,this._elapsed=0,this._fixedDelta=1e3/60,this.timescale=1,this.useFixedDelta=!1,this._autoReset=!1}get autoReset(){return this._autoReset}set autoReset(i){typeof document!="undefined"&&document.hidden!==void 0&&(i?document.addEventListener("visibilitychange",this):document.removeEventListener("visibilitychange",this),this._autoReset=i)}get delta(){return this._delta*id}get fixedDelta(){return this._fixedDelta*id}set fixedDelta(i){this._fixedDelta=i*ab}get elapsed(){return this._elapsed*id}update(i){this.useFixedDelta?this._delta=this.fixedDelta:(this.previousTime=this.currentTime,this.currentTime=(i!==void 0?i:performance.now())-this.startTime,this._delta=this.currentTime-this.previousTime),this._delta*=this.timescale,this._elapsed+=this._delta}reset(){this._delta=0,this._elapsed=0,this.currentTime=performance.now()-this.startTime}getDelta(){return this.delta}getElapsed(){return this.elapsed}handleEvent(i){document.hidden||(this.currentTime=performance.now()-this.startTime)}dispose(){this.autoReset=!1}},lb=(()=>{let i=new Float32Array([-1,-1,0,3,-1,0,-1,3,0]),e=new Float32Array([0,0,2,0,0,2]),t=new Yt;return t.setAttribute("position",new Gt(i,3)),t.setAttribute("uv",new Gt(e,2)),t})(),ui=class sd{static get fullscreenGeometry(){return lb}constructor(e="Pass",t=new Ki,n=new lr){this.name=e,this.renderer=null,this.scene=t,this.camera=n,this.screen=null,this.rtt=!0,this.needsSwap=!0,this.needsDepthTexture=!1,this.enabled=!0}get renderToScreen(){return!this.rtt}set renderToScreen(e){if(this.rtt===e){let t=this.fullscreenMaterial;t!==null&&(t.needsUpdate=!0),this.rtt=!e}}set mainScene(e){}set mainCamera(e){}setRenderer(e){this.renderer=e}isEnabled(){return this.enabled}setEnabled(e){this.enabled=e}get fullscreenMaterial(){return this.screen!==null?this.screen.material:null}set fullscreenMaterial(e){let t=this.screen;t!==null?t.material=e:(t=new Qt(sd.fullscreenGeometry,e),t.frustumCulled=!1,this.scene===null&&(this.scene=new Ki),this.scene.add(t),this.screen=t)}getFullscreenMaterial(){return this.fullscreenMaterial}setFullscreenMaterial(e){this.fullscreenMaterial=e}getDepthTexture(){return null}setDepthTexture(e,t=mi){}render(e,t,n,s,r){throw new Error("Render method not implemented!")}setSize(e,t){}initialize(e,t,n){}dispose(){for(let e of Object.keys(this)){let t=this[e];(t instanceof Ht||t instanceof un||t instanceof zt||t instanceof sd)&&this[e].dispose()}this.fullscreenMaterial!==null&&this.fullscreenMaterial.dispose()}},cb=class extends ui{constructor(){super("ClearMaskPass",null,null);this.needsSwap=!1}render(i,e,t,n,s){let r=i.state.buffers.stencil;r.setLocked(!1),r.setTest(!1)}},ub=`#include <common>
#include <dithering_pars_fragment>
#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;
#else
uniform lowp sampler2D inputBuffer;
#endif
uniform float opacity;varying vec2 vUv;void main(){vec4 texel=texture2D(inputBuffer,vUv);gl_FragColor=opacity*texel;
#include <colorspace_fragment>
#include <dithering_fragment>
}`,Sg="varying vec2 vUv;void main(){vUv=position.xy*0.5+0.5;gl_Position=vec4(position.xy,1.0,1.0);}",bg=class extends Nt{constructor(){super({name:"CopyMaterial",uniforms:{inputBuffer:new Oe(null),opacity:new Oe(1)},blending:Jt,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:ub,vertexShader:Sg})}set inputBuffer(i){this.uniforms.inputBuffer.value=i}setInputBuffer(i){this.uniforms.inputBuffer.value=i}getOpacity(i){return this.uniforms.opacity.value}setOpacity(i){this.uniforms.opacity.value=i}},hb=class extends ui{constructor(i,e=!0){super("CopyPass");this.fullscreenMaterial=new bg,this.needsSwap=!1,this.renderTarget=i,i===void 0&&(this.renderTarget=new Ht(1,1,{minFilter:$t,magFilter:$t,stencilBuffer:!1,depthBuffer:!1}),this.renderTarget.texture.name="CopyPass.Target"),this.autoResize=e}get resize(){return this.autoResize}set resize(i){this.autoResize=i}get texture(){return this.renderTarget.texture}getTexture(){return this.renderTarget.texture}setAutoResizeEnabled(i){this.autoResize=i}render(i,e,t,n,s){this.fullscreenMaterial.inputBuffer=e.texture,i.setRenderTarget(this.renderToScreen?null:this.renderTarget),i.render(this.scene,this.camera)}setSize(i,e){this.autoResize&&this.renderTarget.setSize(i,e)}initialize(i,e,t){t!==void 0&&(this.renderTarget.texture.type=t,t!==kt?this.fullscreenMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1":i!==null&&i.outputColorSpace===nt&&(this.renderTarget.texture.colorSpace=nt))}},Eg=new ye,Tg=class extends ui{constructor(i=!0,e=!0,t=!1){super("ClearPass",null,null);this.needsSwap=!1,this.color=i,this.depth=e,this.stencil=t,this.overrideClearColor=null,this.overrideClearAlpha=-1}setClearFlags(i,e,t){this.color=i,this.depth=e,this.stencil=t}getOverrideClearColor(){return this.overrideClearColor}setOverrideClearColor(i){this.overrideClearColor=i}getOverrideClearAlpha(){return this.overrideClearAlpha}setOverrideClearAlpha(i){this.overrideClearAlpha=i}render(i,e,t,n,s){let r=this.overrideClearColor,a=this.overrideClearAlpha,o=i.getClearAlpha(),l=r!==null,c=a>=0;l?(i.getClearColor(Eg),i.setClearColor(r,c?a:o)):c&&i.setClearAlpha(a),i.setRenderTarget(this.renderToScreen?null:e),i.clear(this.color,this.depth,this.stencil),l?i.setClearColor(Eg,o):c&&i.setClearAlpha(o)}},db=class extends ui{constructor(i,e){super("MaskPass",i,e);this.needsSwap=!1,this.clearPass=new Tg(!1,!1,!0),this.inverse=!1}set mainScene(i){this.scene=i}set mainCamera(i){this.camera=i}get inverted(){return this.inverse}set inverted(i){this.inverse=i}get clear(){return this.clearPass.enabled}set clear(i){this.clearPass.enabled=i}getClearPass(){return this.clearPass}isInverted(){return this.inverted}setInverted(i){this.inverted=i}render(i,e,t,n,s){let r=i.getContext(),a=i.state.buffers,o=this.scene,l=this.camera,c=this.clearPass,u=this.inverted?0:1,h=1-u;a.color.setMask(!1),a.depth.setMask(!1),a.color.setLocked(!0),a.depth.setLocked(!0),a.stencil.setTest(!0),a.stencil.setOp(r.REPLACE,r.REPLACE,r.REPLACE),a.stencil.setFunc(r.ALWAYS,u,4294967295),a.stencil.setClear(h),a.stencil.setLocked(!0),this.clearPass.enabled&&(this.renderToScreen?c.render(i,null):(c.render(i,e),c.render(i,t))),this.renderToScreen?(i.setRenderTarget(null),i.render(o,l)):(i.setRenderTarget(e),i.render(o,l),i.setRenderTarget(t),i.render(o,l)),a.color.setLocked(!1),a.depth.setLocked(!1),a.stencil.setLocked(!1),a.stencil.setFunc(r.EQUAL,1,4294967295),a.stencil.setOp(r.KEEP,r.KEEP,r.KEEP),a.stencil.setLocked(!0)}},Mg=class{constructor(i=null,{depthBuffer:e=!0,stencilBuffer:t=!1,multisampling:n=0,frameBufferType:s}={}){this.renderer=null,this.inputBuffer=this.createBuffer(e,t,s,n),this.outputBuffer=this.inputBuffer.clone(),this.copyPass=new hb,this.depthTexture=null,this.passes=[],this.timer=new ob,this.autoRenderToScreen=!0,this.setRenderer(i)}get multisampling(){return this.inputBuffer.samples||0}set multisampling(i){let e=this.inputBuffer,t=this.multisampling;t>0&&i>0?(this.inputBuffer.samples=i,this.outputBuffer.samples=i,this.inputBuffer.dispose(),this.outputBuffer.dispose()):t!==i&&(this.inputBuffer.dispose(),this.outputBuffer.dispose(),this.inputBuffer=this.createBuffer(e.depthBuffer,e.stencilBuffer,e.texture.type,i),this.inputBuffer.depthTexture=this.depthTexture,this.outputBuffer=this.inputBuffer.clone())}getTimer(){return this.timer}getRenderer(){return this.renderer}setRenderer(i){if(this.renderer=i,i!==null){let e=i.getSize(new Re),t=i.getContext().getContextAttributes().alpha,n=this.inputBuffer.texture.type;n===kt&&i.outputColorSpace===nt&&(this.inputBuffer.texture.colorSpace=nt,this.outputBuffer.texture.colorSpace=nt,this.inputBuffer.dispose(),this.outputBuffer.dispose()),i.autoClear=!1,this.setSize(e.width,e.height);for(let s of this.passes)s.initialize(i,t,n)}}replaceRenderer(i,e=!0){let t=this.renderer,n=t.domElement.parentNode;return this.setRenderer(i),e&&n!==null&&(n.removeChild(t.domElement),n.appendChild(i.domElement)),t}createDepthTexture(){let i=this.depthTexture=new $r;return this.inputBuffer.depthTexture=i,this.inputBuffer.dispose(),this.inputBuffer.stencilBuffer?(i.format=Vi,i.type=Gi):i.type=Di,i}deleteDepthTexture(){if(this.depthTexture!==null){this.depthTexture.dispose(),this.depthTexture=null,this.inputBuffer.depthTexture=null,this.inputBuffer.dispose();for(let i of this.passes)i.setDepthTexture(null)}}createBuffer(i,e,t,n){let s=this.renderer,r=s===null?new Re:s.getDrawingBufferSize(new Re),a={minFilter:$t,magFilter:$t,stencilBuffer:e,depthBuffer:i,type:t},o=new Ht(r.width,r.height,a);return n>0&&(o.ignoreDepthForMultisampleCopy=!1,o.samples=n),t===kt&&s!==null&&s.outputColorSpace===nt&&(o.texture.colorSpace=nt),o.texture.name="EffectComposer.Buffer",o.texture.generateMipmaps=!1,o}setMainScene(i){for(let e of this.passes)e.mainScene=i}setMainCamera(i){for(let e of this.passes)e.mainCamera=i}addPass(i,e){let t=this.passes,n=this.renderer,s=n.getDrawingBufferSize(new Re),r=n.getContext().getContextAttributes().alpha,a=this.inputBuffer.texture.type;if(i.setRenderer(n),i.setSize(s.width,s.height),i.initialize(n,r,a),this.autoRenderToScreen&&(t.length>0&&(t[t.length-1].renderToScreen=!1),i.renderToScreen&&(this.autoRenderToScreen=!1)),e!==void 0?t.splice(e,0,i):t.push(i),this.autoRenderToScreen&&(t[t.length-1].renderToScreen=!0),i.needsDepthTexture||this.depthTexture!==null)if(this.depthTexture===null){let o=this.createDepthTexture();for(i of t)i.setDepthTexture(o)}else i.setDepthTexture(this.depthTexture)}removePass(i){let e=this.passes,t=e.indexOf(i);if(t!==-1&&e.splice(t,1).length>0){if(this.depthTexture!==null){let r=(o,l)=>o||l.needsDepthTexture;e.reduce(r,!1)||(i.getDepthTexture()===this.depthTexture&&i.setDepthTexture(null),this.deleteDepthTexture())}this.autoRenderToScreen&&t===e.length&&(i.renderToScreen=!1,e.length>0&&(e[e.length-1].renderToScreen=!0))}}removeAllPasses(){let i=this.passes;this.deleteDepthTexture(),i.length>0&&(this.autoRenderToScreen&&(i[i.length-1].renderToScreen=!1),this.passes=[])}render(i){let e=this.renderer,t=this.copyPass,n=this.inputBuffer,s=this.outputBuffer,r=!1,a,o,l;i===void 0&&(this.timer.update(),i=this.timer.getDelta());for(let c of this.passes)c.enabled&&(c.render(e,n,s,i,r),c.needsSwap&&(r&&(t.renderToScreen=c.renderToScreen,a=e.getContext(),o=e.state.buffers.stencil,o.setFunc(a.NOTEQUAL,1,4294967295),t.render(e,n,s,i,r),o.setFunc(a.EQUAL,1,4294967295)),l=n,n=s,s=l),c instanceof db?r=!0:c instanceof cb&&(r=!1))}setSize(i,e,t){let n=this.renderer,s=n.getSize(new Re);(i===void 0||e===void 0)&&(i=s.width,e=s.height),(s.width!==i||s.height!==e)&&n.setSize(i,e,t);let r=n.getDrawingBufferSize(new Re);this.inputBuffer.setSize(r.width,r.height),this.outputBuffer.setSize(r.width,r.height);for(let a of this.passes)a.setSize(r.width,r.height)}reset(){this.dispose(),this.autoRenderToScreen=!0}dispose(){for(let i of this.passes)i.dispose();this.passes=[],this.inputBuffer!==null&&this.inputBuffer.dispose(),this.outputBuffer!==null&&this.outputBuffer.dispose(),this.deleteDepthTexture(),this.copyPass.dispose(),this.timer.dispose(),ui.fullscreenGeometry.dispose()}},Bs={NONE:0,DEPTH:1,CONVOLUTION:2},Ct={FRAGMENT_HEAD:"FRAGMENT_HEAD",FRAGMENT_MAIN_UV:"FRAGMENT_MAIN_UV",FRAGMENT_MAIN_IMAGE:"FRAGMENT_MAIN_IMAGE",VERTEX_HEAD:"VERTEX_HEAD",VERTEX_MAIN_SUPPORT:"VERTEX_MAIN_SUPPORT"},fb=class{constructor(){this.shaderParts=new Map([[Ct.FRAGMENT_HEAD,null],[Ct.FRAGMENT_MAIN_UV,null],[Ct.FRAGMENT_MAIN_IMAGE,null],[Ct.VERTEX_HEAD,null],[Ct.VERTEX_MAIN_SUPPORT,null]]),this.defines=new Map,this.uniforms=new Map,this.blendModes=new Map,this.extensions=new Set,this.attributes=Bs.NONE,this.varyings=new Set,this.uvTransformation=!1,this.readDepth=!1,this.colorSpace=Wt}};var rd=!1,wg=class{constructor(i=null){this.originalMaterials=new Map,this.material=null,this.materials=null,this.materialsBackSide=null,this.materialsDoubleSide=null,this.materialsFlatShaded=null,this.materialsFlatShadedBackSide=null,this.materialsFlatShadedDoubleSide=null,this.setMaterial(i),this.meshCount=0,this.replaceMaterial=e=>{if(e.isMesh){let t;if(e.material.flatShading)switch(e.material.side){case pn:t=this.materialsFlatShadedDoubleSide;break;case sn:t=this.materialsFlatShadedBackSide;break;default:t=this.materialsFlatShaded;break}else switch(e.material.side){case pn:t=this.materialsDoubleSide;break;case sn:t=this.materialsBackSide;break;default:t=this.materials;break}this.originalMaterials.set(e,e.material),e.isSkinnedMesh?e.material=t[2]:e.isInstancedMesh?e.material=t[1]:e.material=t[0],++this.meshCount}}}cloneMaterial(i){if(!(i instanceof Nt))return i.clone();let e=i.uniforms,t=new Map;for(let s in e){let r=e[s].value;r.isRenderTargetTexture&&(e[s].value=null,t.set(s,r))}let n=i.clone();for(let s of t)e[s[0]].value=s[1],n.uniforms[s[0]].value=s[1];return n}setMaterial(i){if(this.disposeMaterials(),this.material=i,i!==null){let e=this.materials=[this.cloneMaterial(i),this.cloneMaterial(i),this.cloneMaterial(i)];for(let t of e)t.uniforms=Object.assign({},i.uniforms),t.side=Bn;e[2].skinning=!0,this.materialsBackSide=e.map(t=>{let n=this.cloneMaterial(t);return n.uniforms=Object.assign({},i.uniforms),n.side=sn,n}),this.materialsDoubleSide=e.map(t=>{let n=this.cloneMaterial(t);return n.uniforms=Object.assign({},i.uniforms),n.side=pn,n}),this.materialsFlatShaded=e.map(t=>{let n=this.cloneMaterial(t);return n.uniforms=Object.assign({},i.uniforms),n.flatShading=!0,n}),this.materialsFlatShadedBackSide=e.map(t=>{let n=this.cloneMaterial(t);return n.uniforms=Object.assign({},i.uniforms),n.flatShading=!0,n.side=sn,n}),this.materialsFlatShadedDoubleSide=e.map(t=>{let n=this.cloneMaterial(t);return n.uniforms=Object.assign({},i.uniforms),n.flatShading=!0,n.side=pn,n})}}render(i,e,t){let n=i.shadowMap.enabled;if(i.shadowMap.enabled=!1,rd){let s=this.originalMaterials;this.meshCount=0,e.traverse(this.replaceMaterial),i.render(e,t);for(let r of s)r[0].material=r[1];this.meshCount!==s.size&&s.clear()}else{let s=e.overrideMaterial;e.overrideMaterial=this.material,i.render(e,t),e.overrideMaterial=s}i.shadowMap.enabled=n}disposeMaterials(){if(this.material!==null){let i=this.materials.concat(this.materialsBackSide).concat(this.materialsDoubleSide).concat(this.materialsFlatShaded).concat(this.materialsFlatShadedBackSide).concat(this.materialsFlatShadedDoubleSide);for(let e of i)e.dispose()}}dispose(){this.originalMaterials.clear(),this.disposeMaterials()}static get workaroundEnabled(){return rd}static set workaroundEnabled(i){rd=i}};var Os=-1,Bi=class extends Dn{constructor(i,e=Os,t=Os,n=1){super();this.resizable=i,this.baseSize=new Re(1,1),this.preferredSize=new Re(e,t),this.target=this.preferredSize,this.s=n,this.effectiveSize=new Re,this.addEventListener("change",()=>this.updateEffectiveSize()),this.updateEffectiveSize()}updateEffectiveSize(){let i=this.baseSize,e=this.preferredSize,t=this.effectiveSize,n=this.scale;e.width!==Os?t.width=e.width:e.height!==Os?t.width=Math.round(e.height*(i.width/Math.max(i.height,1))):t.width=Math.round(i.width*n),e.height!==Os?t.height=e.height:e.width!==Os?t.height=Math.round(e.width/Math.max(i.width/Math.max(i.height,1),1)):t.height=Math.round(i.height*n)}get width(){return this.effectiveSize.width}set width(i){this.preferredWidth=i}get height(){return this.effectiveSize.height}set height(i){this.preferredHeight=i}getWidth(){return this.width}getHeight(){return this.height}get scale(){return this.s}set scale(i){this.s!==i&&(this.s=i,this.preferredSize.setScalar(Os),this.dispatchEvent({type:"change"}),this.resizable.setSize(this.baseSize.width,this.baseSize.height))}getScale(){return this.scale}setScale(i){this.scale=i}get baseWidth(){return this.baseSize.width}set baseWidth(i){this.baseSize.width!==i&&(this.baseSize.width=i,this.dispatchEvent({type:"change"}),this.resizable.setSize(this.baseSize.width,this.baseSize.height))}getBaseWidth(){return this.baseWidth}setBaseWidth(i){this.baseWidth=i}get baseHeight(){return this.baseSize.height}set baseHeight(i){this.baseSize.height!==i&&(this.baseSize.height=i,this.dispatchEvent({type:"change"}),this.resizable.setSize(this.baseSize.width,this.baseSize.height))}getBaseHeight(){return this.baseHeight}setBaseHeight(i){this.baseHeight=i}setBaseSize(i,e){(this.baseSize.width!==i||this.baseSize.height!==e)&&(this.baseSize.set(i,e),this.dispatchEvent({type:"change"}),this.resizable.setSize(this.baseSize.width,this.baseSize.height))}get preferredWidth(){return this.preferredSize.width}set preferredWidth(i){this.preferredSize.width!==i&&(this.preferredSize.width=i,this.dispatchEvent({type:"change"}),this.resizable.setSize(this.baseSize.width,this.baseSize.height))}getPreferredWidth(){return this.preferredWidth}setPreferredWidth(i){this.preferredWidth=i}get preferredHeight(){return this.preferredSize.height}set preferredHeight(i){this.preferredSize.height!==i&&(this.preferredSize.height=i,this.dispatchEvent({type:"change"}),this.resizable.setSize(this.baseSize.width,this.baseSize.height))}getPreferredHeight(){return this.preferredHeight}setPreferredHeight(i){this.preferredHeight=i}setPreferredSize(i,e){(this.preferredSize.width!==i||this.preferredSize.height!==e)&&(this.preferredSize.set(i,e),this.dispatchEvent({type:"change"}),this.resizable.setSize(this.baseSize.width,this.baseSize.height))}copy(i){this.s=i.scale,this.baseSize.set(i.baseWidth,i.baseHeight),this.preferredSize.set(i.preferredWidth,i.preferredHeight),this.dispatchEvent({type:"change"}),this.resizable.setSize(this.baseSize.width,this.baseSize.height)}static get AUTO_SIZE(){return Os}};var At={SKIP:9,SET:30,ADD:0,ALPHA:1,AVERAGE:2,COLOR:3,COLOR_BURN:4,COLOR_DODGE:5,DARKEN:6,DIFFERENCE:7,DIVIDE:8,DST:9,EXCLUSION:10,HARD_LIGHT:11,HARD_MIX:12,HUE:13,INVERT:14,INVERT_RGB:15,LIGHTEN:16,LINEAR_BURN:17,LINEAR_DODGE:18,LINEAR_LIGHT:19,LUMINOSITY:20,MULTIPLY:21,NEGATION:22,NORMAL:23,OVERLAY:24,PIN_LIGHT:25,REFLECT:26,SATURATION:27,SCREEN:28,SOFT_LIGHT:29,SRC:30,SUBTRACT:31,VIVID_LIGHT:32},pb="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,x+y,opacity);}",mb="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,y,min(y.a,opacity));}",gb="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,(x+y)*0.5,opacity);}",vb="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec3 xHSL=RGBToHSL(x.rgb);vec3 yHSL=RGBToHSL(y.rgb);vec3 z=HSLToRGB(vec3(yHSL.rg,xHSL.b));return vec4(mix(x.rgb,z,opacity),y.a);}",xb="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec4 z=mix(step(0.0,y)*(1.0-min(vec4(1.0),(1.0-x)/y)),vec4(1.0),step(1.0,x));return mix(x,z,opacity);}",yb="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec4 z=step(0.0,x)*mix(min(vec4(1.0),x/max(1.0-y,1e-9)),vec4(1.0),step(1.0,y));return mix(x,z,opacity);}",Ab="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,min(x,y),opacity);}",_b="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,abs(x-y),opacity);}",Sb="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,x/max(y,1e-12),opacity);}",bb="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,(x+y-2.0*x*y),opacity);}",Eb="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec4 a=min(x,1.0),b=min(y,1.0);vec4 z=mix(2.0*a*b,1.0-2.0*(1.0-a)*(1.0-b),step(0.5,y));return mix(x,z,opacity);}",Tb="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,step(1.0,x+y),opacity);}",Mb="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec3 xHSL=RGBToHSL(x.rgb);vec3 yHSL=RGBToHSL(y.rgb);vec3 z=HSLToRGB(vec3(yHSL.r,xHSL.gb));return vec4(mix(x.rgb,z,opacity),y.a);}",wb="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,1.0-y,opacity);}",Cb="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,y*(1.0-x),opacity);}",Rb="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,max(x,y),opacity);}",Db="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,clamp(y+x-1.0,0.0,1.0),opacity);}",Pb="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,min(x+y,1.0),opacity);}",Ib="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,clamp(2.0*y+x-1.0,0.0,1.0),opacity);}",Lb="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec3 xHSL=RGBToHSL(x.rgb);vec3 yHSL=RGBToHSL(y.rgb);vec3 z=HSLToRGB(vec3(xHSL.rg,yHSL.b));return vec4(mix(x.rgb,z,opacity),y.a);}",Fb="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,x*y,opacity);}",Ub="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,1.0-abs(1.0-x-y),opacity);}",Nb="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,y,opacity);}",Bb="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec4 z=mix(2.0*y*x,1.0-2.0*(1.0-y)*(1.0-x),step(0.5,x));return mix(x,z,opacity);}",Ob="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec4 y2=2.0*y;vec4 z=mix(mix(y2,x,step(0.5*x,y)),max(vec4(0.0),y2-1.0),step(x,(y2-1.0)));return mix(x,z,opacity);}",kb="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec4 z=mix(min(x*x/max(1.0-y,1e-12),1.0),y,step(1.0,y));return mix(x,z,opacity);}",zb="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec3 xHSL=RGBToHSL(x.rgb);vec3 yHSL=RGBToHSL(y.rgb);vec3 z=HSLToRGB(vec3(xHSL.r,yHSL.g,xHSL.b));return vec4(mix(x.rgb,z,opacity),y.a);}",Hb="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,x+y-min(x*y,1.0),opacity);}",Gb="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec4 y2=2.0*y;vec4 w=step(0.5,y);vec4 z=mix(x-(1.0-y2)*x*(1.0-x),mix(x+(y2-1.0)*(sqrt(x)-x),x+(y2-1.0)*x*((16.0*x-12.0)*x+3.0),w*(1.0-step(0.25,x))),w);return mix(x,z,opacity);}",Vb="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return y;}",Wb="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,max(x+y-1.0,0.0),opacity);}",Xb="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec4 z=mix(max(1.0-min((1.0-x)/(2.0*y),1.0),0.0),min(x/(2.0*(1.0-y)),1.0),step(0.5,y));return mix(x,z,opacity);}",Yb=new Map([[At.ADD,pb],[At.ALPHA,mb],[At.AVERAGE,gb],[At.COLOR,vb],[At.COLOR_BURN,xb],[At.COLOR_DODGE,yb],[At.DARKEN,Ab],[At.DIFFERENCE,_b],[At.DIVIDE,Sb],[At.DST,null],[At.EXCLUSION,bb],[At.HARD_LIGHT,Eb],[At.HARD_MIX,Tb],[At.HUE,Mb],[At.INVERT,wb],[At.INVERT_RGB,Cb],[At.LIGHTEN,Rb],[At.LINEAR_BURN,Db],[At.LINEAR_DODGE,Pb],[At.LINEAR_LIGHT,Ib],[At.LUMINOSITY,Lb],[At.MULTIPLY,Fb],[At.NEGATION,Ub],[At.NORMAL,Nb],[At.OVERLAY,Bb],[At.PIN_LIGHT,Ob],[At.REFLECT,kb],[At.SATURATION,zb],[At.SCREEN,Hb],[At.SOFT_LIGHT,Gb],[At.SRC,Vb],[At.SUBTRACT,Wb],[At.VIVID_LIGHT,Xb]]),Qb=class extends Dn{constructor(i,e=1){super();this._blendFunction=i,this.opacity=new Oe(e)}getOpacity(){return this.opacity.value}setOpacity(i){this.opacity.value=i}get blendFunction(){return this._blendFunction}set blendFunction(i){this._blendFunction=i,this.dispatchEvent({type:"change"})}getBlendFunction(){return this.blendFunction}setBlendFunction(i){this.blendFunction=i}getShaderCode(){return Yb.get(this.blendFunction)}},_a={VERY_SMALL:0,SMALL:1,MEDIUM:2,LARGE:3,VERY_LARGE:4,HUGE:5},qb=`#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;
#else
uniform lowp sampler2D inputBuffer;
#endif
varying vec2 vUv0;varying vec2 vUv1;varying vec2 vUv2;varying vec2 vUv3;void main(){vec4 sum=texture2D(inputBuffer,vUv0);sum+=texture2D(inputBuffer,vUv1);sum+=texture2D(inputBuffer,vUv2);sum+=texture2D(inputBuffer,vUv3);gl_FragColor=sum*0.25;
#include <colorspace_fragment>
}`,jb="uniform vec4 texelSize;uniform float kernel;uniform float scale;varying vec2 vUv0;varying vec2 vUv1;varying vec2 vUv2;varying vec2 vUv3;void main(){vec2 uv=position.xy*0.5+0.5;vec2 dUv=(texelSize.xy*vec2(kernel)+texelSize.zw)*scale;vUv0=vec2(uv.x-dUv.x,uv.y+dUv.y);vUv1=vec2(uv.x+dUv.x,uv.y+dUv.y);vUv2=vec2(uv.x+dUv.x,uv.y-dUv.y);vUv3=vec2(uv.x-dUv.x,uv.y-dUv.y);gl_Position=vec4(position.xy,1.0,1.0);}",Zb=[new Float32Array([0,0]),new Float32Array([0,1,1]),new Float32Array([0,1,1,2]),new Float32Array([0,1,2,2,3]),new Float32Array([0,1,2,3,4,4,5]),new Float32Array([0,1,2,3,4,5,7,8,9,10])],Kb=class extends Nt{constructor(i=new yt){super({name:"KawaseBlurMaterial",uniforms:{inputBuffer:new Oe(null),texelSize:new Oe(new yt),scale:new Oe(1),kernel:new Oe(0)},blending:Jt,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:qb,vertexShader:jb});this.setTexelSize(i.x,i.y),this.kernelSize=_a.MEDIUM}set inputBuffer(i){this.uniforms.inputBuffer.value=i}setInputBuffer(i){this.inputBuffer=i}get kernelSequence(){return Zb[this.kernelSize]}get scale(){return this.uniforms.scale.value}set scale(i){this.uniforms.scale.value=i}getScale(){return this.uniforms.scale.value}setScale(i){this.uniforms.scale.value=i}getKernel(){return null}get kernel(){return this.uniforms.kernel.value}set kernel(i){this.uniforms.kernel.value=i}setKernel(i){this.kernel=i}setTexelSize(i,e){this.uniforms.texelSize.value.set(i,e,i*.5,e*.5)}setSize(i,e){let t=1/i,n=1/e;this.uniforms.texelSize.value.set(t,n,t*.5,n*.5)}},Jb=class extends ui{constructor({kernelSize:i=_a.MEDIUM,resolutionScale:e=.5,width:t=Bi.AUTO_SIZE,height:n=Bi.AUTO_SIZE,resolutionX:s=t,resolutionY:r=n}={}){super("KawaseBlurPass");this.renderTargetA=new Ht(1,1,{depthBuffer:!1}),this.renderTargetA.texture.name="Blur.Target.A",this.renderTargetB=this.renderTargetA.clone(),this.renderTargetB.texture.name="Blur.Target.B";let a=this.resolution=new Bi(this,s,r,e);a.addEventListener("change",o=>this.setSize(a.baseWidth,a.baseHeight)),this._blurMaterial=new Kb,this._blurMaterial.kernelSize=i,this.copyMaterial=new bg}getResolution(){return this.resolution}get blurMaterial(){return this._blurMaterial}set blurMaterial(i){this._blurMaterial=i}get dithering(){return this.copyMaterial.dithering}set dithering(i){this.copyMaterial.dithering=i}get kernelSize(){return this.blurMaterial.kernelSize}set kernelSize(i){this.blurMaterial.kernelSize=i}get width(){return this.resolution.width}set width(i){this.resolution.preferredWidth=i}get height(){return this.resolution.height}set height(i){this.resolution.preferredHeight=i}get scale(){return this.blurMaterial.scale}set scale(i){this.blurMaterial.scale=i}getScale(){return this.blurMaterial.scale}setScale(i){this.blurMaterial.scale=i}getKernelSize(){return this.kernelSize}setKernelSize(i){this.kernelSize=i}getResolutionScale(){return this.resolution.scale}setResolutionScale(i){this.resolution.scale=i}render(i,e,t,n,s){let r=this.scene,a=this.camera,o=this.renderTargetA,l=this.renderTargetB,c=this.blurMaterial,u=c.kernelSequence,h=e;this.fullscreenMaterial=c;for(let d=0,p=u.length;d<p;++d){let g=(d&1)==0?o:l;c.kernel=u[d],c.inputBuffer=h.texture,i.setRenderTarget(g),i.render(r,a),h=g}this.fullscreenMaterial=this.copyMaterial,this.copyMaterial.inputBuffer=h.texture,i.setRenderTarget(this.renderToScreen?null:t),i.render(r,a)}setSize(i,e){let t=this.resolution;t.setBaseSize(i,e);let n=t.width,s=t.height;this.renderTargetA.setSize(n,s),this.renderTargetB.setSize(n,s),this.blurMaterial.setSize(i,e)}initialize(i,e,t){t!==void 0&&(this.renderTargetA.texture.type=t,this.renderTargetB.texture.type=t,t!==kt?(this.blurMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1",this.copyMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1"):i!==null&&i.outputColorSpace===nt&&(this.renderTargetA.texture.colorSpace=nt,this.renderTargetB.texture.colorSpace=nt))}static get AUTO_SIZE(){return Bi.AUTO_SIZE}},$b=`#include <common>
#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;
#else
uniform lowp sampler2D inputBuffer;
#endif
#ifdef RANGE
uniform vec2 range;
#elif defined(THRESHOLD)
uniform float threshold;uniform float smoothing;
#endif
varying vec2 vUv;void main(){vec4 texel=texture2D(inputBuffer,vUv);float l=luminance(texel.rgb);
#ifdef RANGE
float low=step(range.x,l);float high=step(l,range.y);l*=low*high;
#elif defined(THRESHOLD)
l=smoothstep(threshold,threshold+smoothing,l)*l;
#endif
#ifdef COLOR
gl_FragColor=vec4(texel.rgb*clamp(l,0.0,1.0),l);
#else
gl_FragColor=vec4(l);
#endif
}`,eE=class extends Nt{constructor(i=!1,e=null){super({name:"LuminanceMaterial",defines:{THREE_REVISION:wi.replace(/\D+/g,"")},uniforms:{inputBuffer:new Oe(null),threshold:new Oe(0),smoothing:new Oe(1),range:new Oe(null)},blending:Jt,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:$b,vertexShader:Sg});this.colorOutput=i,this.luminanceRange=e}set inputBuffer(i){this.uniforms.inputBuffer.value=i}setInputBuffer(i){this.uniforms.inputBuffer.value=i}get threshold(){return this.uniforms.threshold.value}set threshold(i){this.smoothing>0||i>0?this.defines.THRESHOLD="1":delete this.defines.THRESHOLD,this.uniforms.threshold.value=i}getThreshold(){return this.threshold}setThreshold(i){this.threshold=i}get smoothing(){return this.uniforms.smoothing.value}set smoothing(i){this.threshold>0||i>0?this.defines.THRESHOLD="1":delete this.defines.THRESHOLD,this.uniforms.smoothing.value=i}getSmoothingFactor(){return this.smoothing}setSmoothingFactor(i){this.smoothing=i}get useThreshold(){return this.threshold>0||this.smoothing>0}set useThreshold(i){}get colorOutput(){return this.defines.COLOR!==void 0}set colorOutput(i){i?this.defines.COLOR="1":delete this.defines.COLOR,this.needsUpdate=!0}isColorOutputEnabled(i){return this.colorOutput}setColorOutputEnabled(i){this.colorOutput=i}get useRange(){return this.luminanceRange!==null}set useRange(i){this.luminanceRange=null}get luminanceRange(){return this.uniforms.range.value}set luminanceRange(i){i!==null?this.defines.RANGE="1":delete this.defines.RANGE,this.uniforms.range.value=i,this.needsUpdate=!0}getLuminanceRange(){return this.luminanceRange}setLuminanceRange(i){this.luminanceRange=i}},tE=class extends ui{constructor({renderTarget:i,luminanceRange:e,colorOutput:t,resolutionScale:n=1,width:s=Bi.AUTO_SIZE,height:r=Bi.AUTO_SIZE,resolutionX:a=s,resolutionY:o=r}={}){super("LuminancePass");this.fullscreenMaterial=new eE(t,e),this.needsSwap=!1,this.renderTarget=i,this.renderTarget===void 0&&(this.renderTarget=new Ht(1,1,{depthBuffer:!1}),this.renderTarget.texture.name="LuminancePass.Target");let l=this.resolution=new Bi(this,a,o,n);l.addEventListener("change",c=>this.setSize(l.baseWidth,l.baseHeight))}get texture(){return this.renderTarget.texture}getTexture(){return this.renderTarget.texture}getResolution(){return this.resolution}render(i,e,t,n,s){let r=this.fullscreenMaterial;r.inputBuffer=e.texture,i.setRenderTarget(this.renderToScreen?null:this.renderTarget),i.render(this.scene,this.camera)}setSize(i,e){let t=this.resolution;t.setBaseSize(i,e),this.renderTarget.setSize(t.width,t.height)}initialize(i,e,t){t!==void 0&&t!==kt&&(this.renderTarget.texture.type=t,this.fullscreenMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1")}},nE=`#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;
#else
uniform lowp sampler2D inputBuffer;
#endif
#define WEIGHT_INNER 0.125
#define WEIGHT_OUTER 0.0555555
varying vec2 vUv;varying vec2 vUv00;varying vec2 vUv01;varying vec2 vUv02;varying vec2 vUv03;varying vec2 vUv04;varying vec2 vUv05;varying vec2 vUv06;varying vec2 vUv07;varying vec2 vUv08;varying vec2 vUv09;varying vec2 vUv10;varying vec2 vUv11;float clampToBorder(const in vec2 uv){return float(uv.s>=0.0&&uv.s<=1.0&&uv.t>=0.0&&uv.t<=1.0);}void main(){vec4 c=vec4(0.0);vec4 w=WEIGHT_INNER*vec4(clampToBorder(vUv00),clampToBorder(vUv01),clampToBorder(vUv02),clampToBorder(vUv03));c+=w.x*texture2D(inputBuffer,vUv00);c+=w.y*texture2D(inputBuffer,vUv01);c+=w.z*texture2D(inputBuffer,vUv02);c+=w.w*texture2D(inputBuffer,vUv03);w=WEIGHT_OUTER*vec4(clampToBorder(vUv04),clampToBorder(vUv05),clampToBorder(vUv06),clampToBorder(vUv07));c+=w.x*texture2D(inputBuffer,vUv04);c+=w.y*texture2D(inputBuffer,vUv05);c+=w.z*texture2D(inputBuffer,vUv06);c+=w.w*texture2D(inputBuffer,vUv07);w=WEIGHT_OUTER*vec4(clampToBorder(vUv08),clampToBorder(vUv09),clampToBorder(vUv10),clampToBorder(vUv11));c+=w.x*texture2D(inputBuffer,vUv08);c+=w.y*texture2D(inputBuffer,vUv09);c+=w.z*texture2D(inputBuffer,vUv10);c+=w.w*texture2D(inputBuffer,vUv11);c+=WEIGHT_OUTER*texture2D(inputBuffer,vUv);gl_FragColor=c;
#include <colorspace_fragment>
}`,iE="uniform vec2 texelSize;varying vec2 vUv;varying vec2 vUv00;varying vec2 vUv01;varying vec2 vUv02;varying vec2 vUv03;varying vec2 vUv04;varying vec2 vUv05;varying vec2 vUv06;varying vec2 vUv07;varying vec2 vUv08;varying vec2 vUv09;varying vec2 vUv10;varying vec2 vUv11;void main(){vUv=position.xy*0.5+0.5;vUv00=vUv+texelSize*vec2(-1.0,1.0);vUv01=vUv+texelSize*vec2(1.0,1.0);vUv02=vUv+texelSize*vec2(-1.0,-1.0);vUv03=vUv+texelSize*vec2(1.0,-1.0);vUv04=vUv+texelSize*vec2(-2.0,2.0);vUv05=vUv+texelSize*vec2(0.0,2.0);vUv06=vUv+texelSize*vec2(2.0,2.0);vUv07=vUv+texelSize*vec2(-2.0,0.0);vUv08=vUv+texelSize*vec2(2.0,0.0);vUv09=vUv+texelSize*vec2(-2.0,-2.0);vUv10=vUv+texelSize*vec2(0.0,-2.0);vUv11=vUv+texelSize*vec2(2.0,-2.0);gl_Position=vec4(position.xy,1.0,1.0);}",sE=class extends Nt{constructor(){super({name:"DownsamplingMaterial",uniforms:{inputBuffer:new Oe(null),texelSize:new Oe(new Re)},blending:Jt,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:nE,vertexShader:iE})}set inputBuffer(i){this.uniforms.inputBuffer.value=i}setSize(i,e){this.uniforms.texelSize.value.set(1/i,1/e)}},rE=`#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;uniform mediump sampler2D supportBuffer;
#else
uniform lowp sampler2D inputBuffer;uniform lowp sampler2D supportBuffer;
#endif
uniform float radius;varying vec2 vUv;varying vec2 vUv0;varying vec2 vUv1;varying vec2 vUv2;varying vec2 vUv3;varying vec2 vUv4;varying vec2 vUv5;varying vec2 vUv6;varying vec2 vUv7;void main(){vec4 c=vec4(0.0);c+=texture2D(inputBuffer,vUv0)*0.0625;c+=texture2D(inputBuffer,vUv1)*0.125;c+=texture2D(inputBuffer,vUv2)*0.0625;c+=texture2D(inputBuffer,vUv3)*0.125;c+=texture2D(inputBuffer,vUv)*0.25;c+=texture2D(inputBuffer,vUv4)*0.125;c+=texture2D(inputBuffer,vUv5)*0.0625;c+=texture2D(inputBuffer,vUv6)*0.125;c+=texture2D(inputBuffer,vUv7)*0.0625;vec4 baseColor=texture2D(supportBuffer,vUv);gl_FragColor=mix(baseColor,c,radius);
#include <colorspace_fragment>
}`,aE="uniform vec2 texelSize;varying vec2 vUv;varying vec2 vUv0;varying vec2 vUv1;varying vec2 vUv2;varying vec2 vUv3;varying vec2 vUv4;varying vec2 vUv5;varying vec2 vUv6;varying vec2 vUv7;void main(){vUv=position.xy*0.5+0.5;vUv0=vUv+texelSize*vec2(-1.0,1.0);vUv1=vUv+texelSize*vec2(0.0,1.0);vUv2=vUv+texelSize*vec2(1.0,1.0);vUv3=vUv+texelSize*vec2(-1.0,0.0);vUv4=vUv+texelSize*vec2(1.0,0.0);vUv5=vUv+texelSize*vec2(-1.0,-1.0);vUv6=vUv+texelSize*vec2(0.0,-1.0);vUv7=vUv+texelSize*vec2(1.0,-1.0);gl_Position=vec4(position.xy,1.0,1.0);}",oE=class extends Nt{constructor(){super({name:"UpsamplingMaterial",uniforms:{inputBuffer:new Oe(null),supportBuffer:new Oe(null),texelSize:new Oe(new Re),radius:new Oe(.85)},blending:Jt,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:rE,vertexShader:aE})}set inputBuffer(i){this.uniforms.inputBuffer.value=i}set supportBuffer(i){this.uniforms.supportBuffer.value=i}get radius(){return this.uniforms.radius.value}set radius(i){this.uniforms.radius.value=i}setSize(i,e){this.uniforms.texelSize.value.set(1/i,1/e)}},lE=class extends ui{constructor(){super("MipmapBlurPass");this.needsSwap=!1,this.renderTarget=new Ht(1,1,{depthBuffer:!1}),this.renderTarget.texture.name="Upsampling.Mipmap0",this.downsamplingMipmaps=[],this.upsamplingMipmaps=[],this.downsamplingMaterial=new sE,this.upsamplingMaterial=new oE,this.resolution=new Re}get texture(){return this.renderTarget.texture}get levels(){return this.downsamplingMipmaps.length}set levels(i){if(this.levels!==i){let e=this.renderTarget;this.dispose(),this.downsamplingMipmaps=[],this.upsamplingMipmaps=[];for(let t=0;t<i;++t){let n=e.clone();n.texture.name="Downsampling.Mipmap"+t,this.downsamplingMipmaps.push(n)}this.upsamplingMipmaps.push(e);for(let t=1,n=i-1;t<n;++t){let s=e.clone();s.texture.name="Upsampling.Mipmap"+t,this.upsamplingMipmaps.push(s)}this.setSize(this.resolution.x,this.resolution.y)}}get radius(){return this.upsamplingMaterial.radius}set radius(i){this.upsamplingMaterial.radius=i}render(i,e,t,n,s){let{scene:r,camera:a}=this,{downsamplingMaterial:o,upsamplingMaterial:l}=this,{downsamplingMipmaps:c,upsamplingMipmaps:u}=this,h=e;this.fullscreenMaterial=o;for(let d=0,p=c.length;d<p;++d){let g=c[d];o.setSize(h.width,h.height),o.inputBuffer=h.texture,i.setRenderTarget(g),i.render(r,a),h=g}this.fullscreenMaterial=l;for(let d=u.length-1;d>=0;--d){let p=u[d];l.setSize(h.width,h.height),l.inputBuffer=h.texture,l.supportBuffer=c[d].texture,i.setRenderTarget(p),i.render(r,a),h=p}}setSize(i,e){let t=this.resolution;t.set(i,e);let n=t.width,s=t.height;for(let r=0,a=this.downsamplingMipmaps.length;r<a;++r)n=Math.round(n*.5),s=Math.round(s*.5),this.downsamplingMipmaps[r].setSize(n,s),r<this.upsamplingMipmaps.length&&this.upsamplingMipmaps[r].setSize(n,s)}initialize(i,e,t){if(t!==void 0){let n=this.downsamplingMipmaps.concat(this.upsamplingMipmaps);for(let s of n)s.texture.type=t;if(t!==kt)this.downsamplingMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1",this.upsamplingMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1";else if(i!==null&&i.outputColorSpace===nt)for(let s of n)s.texture.colorSpace=nt}}dispose(){super.dispose();for(let i of this.downsamplingMipmaps.concat(this.upsamplingMipmaps))i.dispose()}},Cg=class extends Dn{constructor(i,e,{attributes:t=Bs.NONE,blendFunction:n=At.NORMAL,defines:s=new Map,uniforms:r=new Map,extensions:a=null,vertexShader:o=null}={}){super();this.name=i,this.renderer=null,this.attributes=t,this.fragmentShader=e,this.vertexShader=o,this.defines=s,this.uniforms=r,this.extensions=a,this.blendMode=new Qb(n),this.blendMode.addEventListener("change",l=>this.setChanged()),this._inputColorSpace=Wt,this._outputColorSpace=zn}get inputColorSpace(){return this._inputColorSpace}set inputColorSpace(i){this._inputColorSpace=i,this.setChanged()}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(i){this._outputColorSpace=i,this.setChanged()}set mainScene(i){}set mainCamera(i){}getName(){return this.name}setRenderer(i){this.renderer=i}getDefines(){return this.defines}getUniforms(){return this.uniforms}getExtensions(){return this.extensions}getBlendMode(){return this.blendMode}getAttributes(){return this.attributes}setAttributes(i){this.attributes=i,this.setChanged()}getFragmentShader(){return this.fragmentShader}setFragmentShader(i){this.fragmentShader=i,this.setChanged()}getVertexShader(){return this.vertexShader}setVertexShader(i){this.vertexShader=i,this.setChanged()}setChanged(){this.dispatchEvent({type:"change"})}setDepthTexture(i,e=mi){}update(i,e,t){}setSize(i,e){}initialize(i,e,t){}dispose(){for(let i of Object.keys(this)){let e=this[i];(e instanceof Ht||e instanceof un||e instanceof zt||e instanceof ui)&&this[i].dispose()}}},cE=`#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D map;
#else
uniform lowp sampler2D map;
#endif
uniform float intensity;void mainImage(const in vec4 inputColor,const in vec2 uv,out vec4 outputColor){vec4 texel=texture2D(map,uv);outputColor=vec4(texel.rgb*intensity,texel.a);}`,Rg=class extends Cg{constructor({blendFunction:i=At.SCREEN,luminanceThreshold:e=.9,luminanceSmoothing:t=.025,mipmapBlur:n=!1,intensity:s=1,radius:r=.85,levels:a=8,kernelSize:o=_a.LARGE,resolutionScale:l=.5,width:c=Bi.AUTO_SIZE,height:u=Bi.AUTO_SIZE,resolutionX:h=c,resolutionY:d=u}={}){super("BloomEffect",cE,{blendFunction:i,uniforms:new Map([["map",new Oe(null)],["intensity",new Oe(s)]])});this.renderTarget=new Ht(1,1,{depthBuffer:!1}),this.renderTarget.texture.name="Bloom.Target",this.blurPass=new Jb({kernelSize:o}),this.luminancePass=new tE({colorOutput:!0}),this.luminanceMaterial.threshold=e,this.luminanceMaterial.smoothing=t,this.mipmapBlurPass=new lE,this.mipmapBlurPass.enabled=n,this.mipmapBlurPass.radius=r,this.mipmapBlurPass.levels=a,this.uniforms.get("map").value=n?this.mipmapBlurPass.texture:this.renderTarget.texture;let p=this.resolution=new Bi(this,h,d,l);p.addEventListener("change",g=>this.setSize(p.baseWidth,p.baseHeight))}get texture(){return this.mipmapBlurPass.enabled?this.mipmapBlurPass.texture:this.renderTarget.texture}getTexture(){return this.texture}getResolution(){return this.resolution}getBlurPass(){return this.blurPass}getLuminancePass(){return this.luminancePass}get luminanceMaterial(){return this.luminancePass.fullscreenMaterial}getLuminanceMaterial(){return this.luminancePass.fullscreenMaterial}get width(){return this.resolution.width}set width(i){this.resolution.preferredWidth=i}get height(){return this.resolution.height}set height(i){this.resolution.preferredHeight=i}get dithering(){return this.blurPass.dithering}set dithering(i){this.blurPass.dithering=i}get kernelSize(){return this.blurPass.kernelSize}set kernelSize(i){this.blurPass.kernelSize=i}get distinction(){return console.warn(this.name,"distinction was removed"),1}set distinction(i){console.warn(this.name,"distinction was removed")}get intensity(){return this.uniforms.get("intensity").value}set intensity(i){this.uniforms.get("intensity").value=i}getIntensity(){return this.intensity}setIntensity(i){this.intensity=i}getResolutionScale(){return this.resolution.scale}setResolutionScale(i){this.resolution.scale=i}update(i,e,t){let n=this.renderTarget,s=this.luminancePass;s.enabled?(s.render(i,e),this.mipmapBlurPass.enabled?this.mipmapBlurPass.render(i,s.renderTarget):this.blurPass.render(i,s.renderTarget,n)):this.mipmapBlurPass.enabled?this.mipmapBlurPass.render(i,e):this.blurPass.render(i,e,n)}setSize(i,e){let t=this.resolution;t.setBaseSize(i,e),this.renderTarget.setSize(t.width,t.height),this.blurPass.resolution.copy(t),this.luminancePass.setSize(i,e),this.mipmapBlurPass.setSize(i,e)}initialize(i,e,t){this.blurPass.initialize(i,e,t),this.luminancePass.initialize(i,e,t),this.mipmapBlurPass.initialize(i,e,t),t!==void 0&&(this.renderTarget.texture.type=t,i!==null&&i.outputColorSpace===nt&&(this.renderTarget.texture.colorSpace=nt))}};var uE=`#ifdef RADIAL_MODULATION
uniform float modulationOffset;
#endif
varying float vActive;varying vec2 vUvR;varying vec2 vUvB;void mainImage(const in vec4 inputColor,const in vec2 uv,out vec4 outputColor){vec2 ra=inputColor.ra;vec2 ba=inputColor.ba;
#ifdef RADIAL_MODULATION
const vec2 center=vec2(0.5);float d=distance(uv,center)*2.0;d=max(d-modulationOffset,0.0);if(vActive>0.0&&d>0.0){ra=texture2D(inputBuffer,mix(uv,vUvR,d)).ra;ba=texture2D(inputBuffer,mix(uv,vUvB,d)).ba;}
#else
if(vActive>0.0){ra=texture2D(inputBuffer,vUvR).ra;ba=texture2D(inputBuffer,vUvB).ba;}
#endif
outputColor=vec4(ra.x,inputColor.g,ba.x,max(max(ra.y,ba.y),inputColor.a));}`,hE="uniform vec2 offset;varying float vActive;varying vec2 vUvR;varying vec2 vUvB;void mainSupport(const in vec2 uv){vec2 shift=offset*vec2(1.0,aspect);vActive=(shift.x!=0.0||shift.y!=0.0)?1.0:0.0;vUvR=uv+shift;vUvB=uv-shift;}",Dg=class extends Cg{constructor({offset:i=new Re(.001,5e-4),radialModulation:e=!1,modulationOffset:t=.15}={}){super("ChromaticAberrationEffect",uE,{vertexShader:hE,attributes:Bs.CONVOLUTION,uniforms:new Map([["offset",new Oe(i)],["modulationOffset",new Oe(t)]])});this.radialModulation=e}get offset(){return this.uniforms.get("offset").value}set offset(i){this.uniforms.get("offset").value=i}get radialModulation(){return this.defines.has("RADIAL_MODULATION")}set radialModulation(i){i?this.defines.set("RADIAL_MODULATION","1"):this.defines.delete("RADIAL_MODULATION"),this.setChanged()}get modulationOffset(){return this.uniforms.get("modulationOffset").value}set modulationOffset(i){this.uniforms.get("modulationOffset").value=i}getOffset(){return this.offset}setOffset(i){this.offset=i}};var ad=class extends ui{constructor(i,e="inputBuffer"){super("ShaderPass");this.fullscreenMaterial=i,this.input=e}setInput(i){this.input=i}render(i,e,t,n,s){let r=this.fullscreenMaterial.uniforms;e!==null&&r!==void 0&&r[this.input]!==void 0&&(r[this.input].value=e.texture),i.setRenderTarget(this.renderToScreen?null:t),i.render(this.scene,this.camera)}initialize(i,e,t){t!==void 0&&t!==kt&&(this.fullscreenMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1")}};var Pg=class extends ui{constructor(i,e,t=null){super("RenderPass",i,e);this.needsSwap=!1,this.clearPass=new Tg,this.overrideMaterialManager=t===null?null:new wg(t),this.ignoreBackground=!1,this.skipShadowMapUpdate=!1,this.selection=null}set mainScene(i){this.scene=i}set mainCamera(i){this.camera=i}get renderToScreen(){return super.renderToScreen}set renderToScreen(i){super.renderToScreen=i,this.clearPass.renderToScreen=i}get overrideMaterial(){let i=this.overrideMaterialManager;return i!==null?i.material:null}set overrideMaterial(i){let e=this.overrideMaterialManager;i!==null?e!==null?e.setMaterial(i):this.overrideMaterialManager=new wg(i):e!==null&&(e.dispose(),this.overrideMaterialManager=null)}getOverrideMaterial(){return this.overrideMaterial}setOverrideMaterial(i){this.overrideMaterial=i}get clear(){return this.clearPass.enabled}set clear(i){this.clearPass.enabled=i}getSelection(){return this.selection}setSelection(i){this.selection=i}isBackgroundDisabled(){return this.ignoreBackground}setBackgroundDisabled(i){this.ignoreBackground=i}isShadowMapDisabled(){return this.skipShadowMapUpdate}setShadowMapDisabled(i){this.skipShadowMapUpdate=i}getClearPass(){return this.clearPass}render(i,e,t,n,s){let r=this.scene,a=this.camera,o=this.selection,l=a.layers.mask,c=r.background,u=i.shadowMap.autoUpdate,h=this.renderToScreen?null:e;o!==null&&a.layers.set(o.getLayer()),this.skipShadowMapUpdate&&(i.shadowMap.autoUpdate=!1),(this.ignoreBackground||this.clearPass.overrideClearColor!==null)&&(r.background=null),this.clearPass.enabled&&this.clearPass.render(i,e),i.setRenderTarget(h),this.overrideMaterialManager!==null?this.overrideMaterialManager.render(i,r,a):i.render(r,a),a.layers.mask=l,r.background=c,i.shadowMap.autoUpdate=u}};var BC=Math.PI*.5;var dE=`#include <common>
#include <packing>
#include <dithering_pars_fragment>
#define packFloatToRGBA(v) packDepthToRGBA(v)
#define unpackRGBAToFloat(v) unpackRGBAToDepth(v)
#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;
#else
uniform lowp sampler2D inputBuffer;
#endif
#if DEPTH_PACKING == 3201
uniform lowp sampler2D depthBuffer;
#elif defined(GL_FRAGMENT_PRECISION_HIGH)
uniform highp sampler2D depthBuffer;
#else
uniform mediump sampler2D depthBuffer;
#endif
uniform vec2 resolution;uniform vec2 texelSize;uniform float cameraNear;uniform float cameraFar;uniform float aspect;uniform float time;varying vec2 vUv;vec4 sRGBToLinear(const in vec4 value){return vec4(mix(pow(value.rgb*0.9478672986+vec3(0.0521327014),vec3(2.4)),value.rgb*0.0773993808,vec3(lessThanEqual(value.rgb,vec3(0.04045)))),value.a);}float readDepth(const in vec2 uv){
#if DEPTH_PACKING == 3201
return unpackRGBAToDepth(texture2D(depthBuffer,uv));
#else
return texture2D(depthBuffer,uv).r;
#endif
}float getViewZ(const in float depth){
#ifdef PERSPECTIVE_CAMERA
return perspectiveDepthToViewZ(depth,cameraNear,cameraFar);
#else
return orthographicDepthToViewZ(depth,cameraNear,cameraFar);
#endif
}vec3 RGBToHCV(const in vec3 RGB){vec4 P=mix(vec4(RGB.bg,-1.0,2.0/3.0),vec4(RGB.gb,0.0,-1.0/3.0),step(RGB.b,RGB.g));vec4 Q=mix(vec4(P.xyw,RGB.r),vec4(RGB.r,P.yzx),step(P.x,RGB.r));float C=Q.x-min(Q.w,Q.y);float H=abs((Q.w-Q.y)/(6.0*C+EPSILON)+Q.z);return vec3(H,C,Q.x);}vec3 RGBToHSL(const in vec3 RGB){vec3 HCV=RGBToHCV(RGB);float L=HCV.z-HCV.y*0.5;float S=HCV.y/(1.0-abs(L*2.0-1.0)+EPSILON);return vec3(HCV.x,S,L);}vec3 HueToRGB(const in float H){float R=abs(H*6.0-3.0)-1.0;float G=2.0-abs(H*6.0-2.0);float B=2.0-abs(H*6.0-4.0);return clamp(vec3(R,G,B),0.0,1.0);}vec3 HSLToRGB(const in vec3 HSL){vec3 RGB=HueToRGB(HSL.x);float C=(1.0-abs(2.0*HSL.z-1.0))*HSL.y;return(RGB-0.5)*C+HSL.z;}FRAGMENT_HEAD void main(){FRAGMENT_MAIN_UV vec4 color0=texture2D(inputBuffer,UV);vec4 color1=vec4(0.0);FRAGMENT_MAIN_IMAGE color0.a=clamp(color0.a,0.0,1.0);gl_FragColor=color0;
#ifdef ENCODE_OUTPUT
#include <colorspace_fragment>
#endif
#include <dithering_fragment>
}`,fE="uniform vec2 resolution;uniform vec2 texelSize;uniform float cameraNear;uniform float cameraFar;uniform float aspect;uniform float time;varying vec2 vUv;VERTEX_HEAD void main(){vUv=position.xy*0.5+0.5;VERTEX_MAIN_SUPPORT gl_Position=vec4(position.xy,1.0,1.0);}",pE=class extends Nt{constructor(i,e,t,n,s=!1){super({name:"EffectMaterial",defines:{THREE_REVISION:wi.replace(/\D+/g,""),DEPTH_PACKING:"0",ENCODE_OUTPUT:"1"},uniforms:{inputBuffer:new Oe(null),depthBuffer:new Oe(null),resolution:new Oe(new Re),texelSize:new Oe(new Re),cameraNear:new Oe(.3),cameraFar:new Oe(1e3),aspect:new Oe(1),time:new Oe(0)},blending:Jt,toneMapped:!1,depthWrite:!1,depthTest:!1,dithering:s});i&&this.setShaderParts(i),e&&this.setDefines(e),t&&this.setUniforms(t),this.copyCameraSettings(n)}set inputBuffer(i){this.uniforms.inputBuffer.value=i}setInputBuffer(i){this.uniforms.inputBuffer.value=i}get depthBuffer(){return this.uniforms.depthBuffer.value}set depthBuffer(i){this.uniforms.depthBuffer.value=i}get depthPacking(){return Number(this.defines.DEPTH_PACKING)}set depthPacking(i){this.defines.DEPTH_PACKING=i.toFixed(0),this.needsUpdate=!0}setDepthBuffer(i,e=mi){this.depthBuffer=i,this.depthPacking=e}setShaderData(i){this.setShaderParts(i.shaderParts),this.setDefines(i.defines),this.setUniforms(i.uniforms),this.setExtensions(i.extensions)}setShaderParts(i){return this.fragmentShader=dE.replace(Ct.FRAGMENT_HEAD,i.get(Ct.FRAGMENT_HEAD)||"").replace(Ct.FRAGMENT_MAIN_UV,i.get(Ct.FRAGMENT_MAIN_UV)||"").replace(Ct.FRAGMENT_MAIN_IMAGE,i.get(Ct.FRAGMENT_MAIN_IMAGE)||""),this.vertexShader=fE.replace(Ct.VERTEX_HEAD,i.get(Ct.VERTEX_HEAD)||"").replace(Ct.VERTEX_MAIN_SUPPORT,i.get(Ct.VERTEX_MAIN_SUPPORT)||""),this.needsUpdate=!0,this}setDefines(i){for(let e of i.entries())this.defines[e[0]]=e[1];return this.needsUpdate=!0,this}setUniforms(i){for(let e of i.entries())this.uniforms[e[0]]=e[1];return this}setExtensions(i){this.extensions={};for(let e of i)this.extensions[e]=!0;return this}get encodeOutput(){return this.defines.ENCODE_OUTPUT!==void 0}set encodeOutput(i){this.encodeOutput!==i&&(i?this.defines.ENCODE_OUTPUT="1":delete this.defines.ENCODE_OUTPUT,this.needsUpdate=!0)}isOutputEncodingEnabled(i){return this.encodeOutput}setOutputEncodingEnabled(i){this.encodeOutput=i}get time(){return this.uniforms.time.value}set time(i){this.uniforms.time.value=i}setDeltaTime(i){this.uniforms.time.value+=i}adoptCameraSettings(i){this.copyCameraSettings(i)}copyCameraSettings(i){i&&(this.uniforms.cameraNear.value=i.near,this.uniforms.cameraFar.value=i.far,i instanceof qt?this.defines.PERSPECTIVE_CAMERA="1":delete this.defines.PERSPECTIVE_CAMERA,this.needsUpdate=!0)}setSize(i,e){let t=this.uniforms;t.resolution.value.set(i,e),t.texelSize.value.set(1/i,1/e),t.aspect.value=i/e}static get Section(){return Ct}};var zC=Number(wi.replace(/\D+/g,"")),Er=255/256,HC=new Float32Array([Er/256**3,Er/256**2,Er/256,Er]),GC=new Float32Array([Er,Er/256,Er/256**2,1/256**3]);function Ig(i,e,t){for(let n of e){let s="$1"+i+n.charAt(0).toUpperCase()+n.slice(1),r=new RegExp("([^\\.])(\\b"+n+"\\b)","g");for(let a of t.entries())a[1]!==null&&t.set(a[0],a[1].replace(r,s))}}function mE(i,e,t){let n=e.getFragmentShader(),s=e.getVertexShader(),r=n!==void 0&&/mainImage/.test(n),a=n!==void 0&&/mainUv/.test(n);if(t.attributes|=e.getAttributes(),n===void 0)throw new Error(`Missing fragment shader (${e.name})`);if(a&&(t.attributes&Bs.CONVOLUTION)!=0)throw new Error(`Effects that transform UVs are incompatible with convolution effects (${e.name})`);if(!r&&!a)throw new Error(`Could not find mainImage or mainUv function (${e.name})`);{let o=/\w+\s+(\w+)\([\w\s,]*\)\s*{/g,l=t.shaderParts,c=l.get(Ct.FRAGMENT_HEAD)||"",u=l.get(Ct.FRAGMENT_MAIN_UV)||"",h=l.get(Ct.FRAGMENT_MAIN_IMAGE)||"",d=l.get(Ct.VERTEX_HEAD)||"",p=l.get(Ct.VERTEX_MAIN_SUPPORT)||"",g=new Set,v=new Set;if(a&&(u+=`	${i}MainUv(UV);
`,t.uvTransformation=!0),s!==null&&/mainSupport/.test(s)){let x=/mainSupport *\([\w\s]*?uv\s*?\)/.test(s);p+=`	${i}MainSupport(`,p+=x?`vUv);
`:`);
`;for(let _ of s.matchAll(/(?:varying\s+\w+\s+([\S\s]*?);)/g))for(let y of _[1].split(/\s*,\s*/))t.varyings.add(y),g.add(y),v.add(y);for(let _ of s.matchAll(o))v.add(_[1])}for(let x of n.matchAll(o))v.add(x[1]);for(let x of e.defines.keys())v.add(x.replace(/\([\w\s,]*\)/g,""));for(let x of e.uniforms.keys())v.add(x);v.delete("while"),v.delete("for"),v.delete("if"),e.uniforms.forEach((x,_)=>t.uniforms.set(i+_.charAt(0).toUpperCase()+_.slice(1),x)),e.defines.forEach((x,_)=>t.defines.set(i+_.charAt(0).toUpperCase()+_.slice(1),x));let m=new Map([["fragment",n],["vertex",s]]);Ig(i,v,t.defines),Ig(i,v,m),n=m.get("fragment"),s=m.get("vertex");let f=e.blendMode;if(t.blendModes.set(f.blendFunction,f),r){e.inputColorSpace!==null&&e.inputColorSpace!==t.colorSpace&&(h+=e.inputColorSpace===nt?`color0 = sRGBTransferOETF(color0);
	`:`color0 = sRGBToLinear(color0);
	`),e.outputColorSpace!==zn?t.colorSpace=e.outputColorSpace:e.inputColorSpace!==null&&(t.colorSpace=e.inputColorSpace);let x=/MainImage *\([\w\s,]*?depth[\w\s,]*?\)/;h+=`${i}MainImage(color0, UV, `,(t.attributes&Bs.DEPTH)!=0&&x.test(n)&&(h+="depth, ",t.readDepth=!0),h+=`color1);
	`;let _=i+"BlendOpacity";t.uniforms.set(_,f.opacity),h+=`color0 = blend${f.blendFunction}(color0, color1, ${_});

	`,c+=`uniform float ${_};

`}if(c+=n+`
`,s!==null&&(d+=s+`
`),l.set(Ct.FRAGMENT_HEAD,c),l.set(Ct.FRAGMENT_MAIN_UV,u),l.set(Ct.FRAGMENT_MAIN_IMAGE,h),l.set(Ct.VERTEX_HEAD,d),l.set(Ct.VERTEX_MAIN_SUPPORT,p),e.extensions!==null)for(let x of e.extensions)t.extensions.add(x)}}var Lg=class extends ui{constructor(i,...e){super("EffectPass");this.fullscreenMaterial=new pE(null,null,null,i),this.listener=t=>this.handleEvent(t),this.effects=[],this.setEffects(e),this.skipRendering=!1,this.minTime=1,this.maxTime=Number.POSITIVE_INFINITY,this.timeScale=1}set mainScene(i){for(let e of this.effects)e.mainScene=i}set mainCamera(i){this.fullscreenMaterial.copyCameraSettings(i);for(let e of this.effects)e.mainCamera=i}get encodeOutput(){return this.fullscreenMaterial.encodeOutput}set encodeOutput(i){this.fullscreenMaterial.encodeOutput=i}get dithering(){return this.fullscreenMaterial.dithering}set dithering(i){let e=this.fullscreenMaterial;e.dithering=i,e.needsUpdate=!0}setEffects(i){for(let e of this.effects)e.removeEventListener("change",this.listener);this.effects=i.sort((e,t)=>t.attributes-e.attributes);for(let e of this.effects)e.addEventListener("change",this.listener)}updateMaterial(){let i=new fb,e=0;for(let a of this.effects)if(a.blendMode.blendFunction===At.DST)i.attributes|=a.getAttributes()&Bs.DEPTH;else{if((i.attributes&a.getAttributes()&Bs.CONVOLUTION)!=0)throw new Error(`Convolution effects cannot be merged (${a.name})`);mE("e"+e++,a,i)}let t=i.shaderParts.get(Ct.FRAGMENT_HEAD),n=i.shaderParts.get(Ct.FRAGMENT_MAIN_IMAGE),s=i.shaderParts.get(Ct.FRAGMENT_MAIN_UV),r=/\bblend\b/g;for(let a of i.blendModes.values())t+=a.getShaderCode().replace(r,`blend${a.blendFunction}`)+`
`;(i.attributes&Bs.DEPTH)!=0?(i.readDepth&&(n=`float depth = readDepth(UV);

	`+n),this.needsDepthTexture=this.getDepthTexture()===null):this.needsDepthTexture=!1,i.colorSpace===nt&&(n+=`color0 = sRGBToLinear(color0);
	`),i.uvTransformation?(s=`vec2 transformedUv = vUv;
`+s,i.defines.set("UV","transformedUv")):i.defines.set("UV","vUv"),i.shaderParts.set(Ct.FRAGMENT_HEAD,t),i.shaderParts.set(Ct.FRAGMENT_MAIN_IMAGE,n),i.shaderParts.set(Ct.FRAGMENT_MAIN_UV,s);for(let[a,o]of i.shaderParts)o!==null&&i.shaderParts.set(a,o.trim().replace(/^#/,`
#`));this.skipRendering=e===0,this.needsSwap=!this.skipRendering,this.fullscreenMaterial.setShaderData(i)}recompile(){this.updateMaterial()}getDepthTexture(){return this.fullscreenMaterial.depthBuffer}setDepthTexture(i,e=mi){this.fullscreenMaterial.depthBuffer=i,this.fullscreenMaterial.depthPacking=e;for(let t of this.effects)t.setDepthTexture(i,e)}render(i,e,t,n,s){for(let r of this.effects)r.update(i,e,n);if(!this.skipRendering||this.renderToScreen){let r=this.fullscreenMaterial;r.inputBuffer=e.texture,r.time+=n*this.timeScale,i.setRenderTarget(this.renderToScreen?null:t),i.render(this.scene,this.camera)}}setSize(i,e){this.fullscreenMaterial.setSize(i,e);for(let t of this.effects)t.setSize(i,e)}initialize(i,e,t){this.renderer=i;for(let n of this.effects)n.initialize(i,e,t);this.updateMaterial(),t!==void 0&&t!==kt&&(this.fullscreenMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1")}dispose(){super.dispose();for(let i of this.effects)i.removeEventListener("change",this.listener),i.dispose()}handleEvent(i){switch(i.type){case"change":this.recompile();break}}};var WC=[new Float32Array(3),new Float32Array(3)],XC=[new Float32Array(3),new Float32Array(3),new Float32Array(3),new Float32Array(3)],YC=[[new Float32Array([0,0,0]),new Float32Array([1,0,0]),new Float32Array([1,1,0]),new Float32Array([1,1,1])],[new Float32Array([0,0,0]),new Float32Array([1,0,0]),new Float32Array([1,0,1]),new Float32Array([1,1,1])],[new Float32Array([0,0,0]),new Float32Array([0,0,1]),new Float32Array([1,0,1]),new Float32Array([1,1,1])],[new Float32Array([0,0,0]),new Float32Array([0,1,0]),new Float32Array([1,1,0]),new Float32Array([1,1,1])],[new Float32Array([0,0,0]),new Float32Array([0,1,0]),new Float32Array([0,1,1]),new Float32Array([1,1,1])],[new Float32Array([0,0,0]),new Float32Array([0,0,1]),new Float32Array([0,1,1]),new Float32Array([1,1,1])]];var QC=[new Float32Array(2),new Float32Array(2)];var qC=new Float32Array([0,-.25,.25,-.125,.125,-.375,.375]),jC=[new Float32Array([0,0]),new Float32Array([.25,-.25]),new Float32Array([-.25,.25]),new Float32Array([.125,-.125]),new Float32Array([-.125,.125])],ZC=[new Uint8Array([0,0]),new Uint8Array([3,0]),new Uint8Array([0,3]),new Uint8Array([3,3]),new Uint8Array([1,0]),new Uint8Array([4,0]),new Uint8Array([1,3]),new Uint8Array([4,3]),new Uint8Array([0,1]),new Uint8Array([3,1]),new Uint8Array([0,4]),new Uint8Array([3,4]),new Uint8Array([1,1]),new Uint8Array([4,1]),new Uint8Array([1,4]),new Uint8Array([4,4])],KC=[new Uint8Array([0,0]),new Uint8Array([1,0]),new Uint8Array([0,2]),new Uint8Array([1,2]),new Uint8Array([2,0]),new Uint8Array([3,0]),new Uint8Array([2,2]),new Uint8Array([3,2]),new Uint8Array([0,1]),new Uint8Array([1,1]),new Uint8Array([0,3]),new Uint8Array([1,3]),new Uint8Array([2,1]),new Uint8Array([3,1]),new Uint8Array([2,3]),new Uint8Array([3,3])];var JC=new Map([[_n(0,0,0,0),new Float32Array([0,0,0,0])],[_n(0,0,0,1),new Float32Array([0,0,0,1])],[_n(0,0,1,0),new Float32Array([0,0,1,0])],[_n(0,0,1,1),new Float32Array([0,0,1,1])],[_n(0,1,0,0),new Float32Array([0,1,0,0])],[_n(0,1,0,1),new Float32Array([0,1,0,1])],[_n(0,1,1,0),new Float32Array([0,1,1,0])],[_n(0,1,1,1),new Float32Array([0,1,1,1])],[_n(1,0,0,0),new Float32Array([1,0,0,0])],[_n(1,0,0,1),new Float32Array([1,0,0,1])],[_n(1,0,1,0),new Float32Array([1,0,1,0])],[_n(1,0,1,1),new Float32Array([1,0,1,1])],[_n(1,1,0,0),new Float32Array([1,1,0,0])],[_n(1,1,0,1),new Float32Array([1,1,0,1])],[_n(1,1,1,0),new Float32Array([1,1,1,0])],[_n(1,1,1,1),new Float32Array([1,1,1,1])]]);function od(i,e,t){return i+(e-i)*t}function _n(i,e,t,n){let s=od(i,e,1-.25),r=od(t,n,1-.25);return od(s,r,1-.125)}var ld=class{constructor(e,t,n){if(this.stage=e,this.debug=n,this.composer=new Mg(e.renderer,{alpha:!1}),this.chromaEffect=new Dg,this.bloomEffect=new Rg({resolutionScale:.5}),this.params={bloomIntensity:.87,bloomLuminanceThreshold:0,bloomLuminanceSmoothing:0,bloomKernelSize:_a.LARGE,chromaOffsetX:3e-4,chromaOffsetY:0},this.renderScenePass=new Pg(e.scene,e.camera),this.outlinePass=new ad(t.outlineShaderMaterial,"tDiffuse"),this.fxaaPass=new ad(t.fxaaShaderMaterial,"tDiffuse"),this.effectPass=new Lg(e.camera),this.composer.addPass(this.renderScenePass),this.composer.addPass(this.outlinePass),this.composer.addPass(this.effectPass),this.updateDimensions(),this.updateEffects(),this.debug.enabled){let s=this.debug.gui.addFolder("Post processing");s.add(this.params,"bloomIntensity").min(0).max(10).step(.01).name("Bloom intensity").onChange(this.updateEffects.bind(this)),s.add(this.params,"bloomLuminanceThreshold").min(0).max(10).step(.01).name("Bloom threshold").onChange(this.updateEffects.bind(this)),s.add(this.params,"bloomLuminanceSmoothing").min(0).max(10).step(.01).name("Bloom smoothing").onChange(this.updateEffects.bind(this)),s.add(this.params,"bloomKernelSize",_a).name("Bloom KernelSize").onChange(this.updateEffects.bind(this)),s.add(this.params,"chromaOffsetX").min(0).max(.001).step(1e-5).name("Chroma x").onChange(this.updateEffects.bind(this)),s.add(this.params,"chromaOffsetY").min(0).max(.001).step(1e-5).name("Chroma y").onChange(this.updateEffects.bind(this))}}updateEffects(){this.bloomEffect.intensity=this.params.bloomIntensity,this.bloomEffect.luminanceMaterial.uniforms.threshold.value=this.params.bloomLuminanceThreshold,this.bloomEffect.luminanceMaterial.uniforms.smoothing.value=this.params.bloomLuminanceSmoothing,this.bloomEffect.kernelSize=this.params.bloomKernelSize,this.chromaEffect.uniforms.get("offset").value.x=this.params.chromaOffsetX,this.chromaEffect.uniforms.get("offset").value.y=this.params.chromaOffsetY}render(){this.composer.render()}updateDimensions(){let e=window.devicePixelRatio>2?3:2;this.composer.setSize(this.stage.width*e,this.stage.height*e,!1)}};var cd={vertex:`
    precision highp float;
    varying vec2 vUv;

    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,fragment:`
    precision highp float;
    #include <packing>
    varying vec2 vUv;

    uniform sampler2D tDiffuse;
    uniform float outlineThickness;
    uniform float outlineBlend;
    uniform float contourBlend;
    uniform float backgroundMix;
    uniform float threshold;
    uniform float sourceMix;
    uniform float effectMix;

    uniform vec2 resolution;

    uniform vec3 ambiantColor;
    uniform vec3 backgroundColor;
    uniform vec3 outlineColor;
    uniform vec3 rimColor;
    uniform float rimIntensity;
    uniform vec3 shadowColor;
    uniform float shadowIntensity;
    uniform vec3 worldColor1;

    void main() {

      vec4 texDiffuse = texture2D(tDiffuse, vUv);

      vec3 inColor = texDiffuse.rgb;
      vec3 lineColor = outlineColor;
      vec3 paintColor = worldColor1;
      vec3 toneColor = (vec3(texDiffuse.a) * ambiantColor) + (ambiantColor * .25);

      float shadowTones = texDiffuse.a;
      float x = 1. / resolution.x;
      float y = 1. / resolution.y;

      vec3 vColSamples[4];

      vColSamples[0] = texture2D(tDiffuse, vUv - vec2(x, y) * outlineThickness).rgb;
      vColSamples[1] = texture2D(tDiffuse, vUv + vec2(x, y) * outlineThickness).rgb;
      vColSamples[2] = texture2D(tDiffuse, vUv + vec2(x * outlineThickness, -y * outlineThickness)).rgb;
      vColSamples[3] = texture2D(tDiffuse, vUv + vec2(-x * outlineThickness, y * outlineThickness)).rgb;

      vec3 inColorDiff0 = vColSamples[1] - vColSamples[0];
      vec3 inColorDiff1 = vColSamples[3] - vColSamples[2];

      float edge = sqrt(dot(inColorDiff0, inColorDiff0) + dot(inColorDiff1, inColorDiff1));
      float outline = (edge > threshold ? 1. : 0.);

      vec3 outColor;
      float alpha = 1.0;

      // Shadows & Rim effects
      if (inColor == vec3(1., 1., 1.)) {
        outColor = ((1. - outline) * backgroundColor) + (outline * mix(outlineColor, backgroundColor, contourBlend));
      } else {
        if (shadowTones >= .95) {
          paintColor = mix(paintColor, rimColor, rimIntensity);
        } else if (shadowTones <= .3) {
          paintColor = mix(paintColor, shadowColor, shadowIntensity);
        }
        lineColor = mix(lineColor, paintColor, outlineBlend);
        outColor = ((1. - outline) * mix(toneColor, paintColor, effectMix)) + (outline * lineColor);
      }

      gl_FragColor = vec4(clamp(mix(inColor, outColor, sourceMix), 0.0, 1.0), alpha);

    }
  `};var ud={uniforms:{tDiffuse:{value:null},resolution:{value:new Re(1/1024,1/512)}},vertexShader:`

    varying vec2 vUv;

    void main() {

      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

    }`,fragmentShader:`

    precision highp float;

    uniform sampler2D tDiffuse;

    uniform vec2 resolution;

    varying vec2 vUv;

    #define FXAA_PC 1
    #define FXAA_GLSL_100 1
    #define FXAA_QUALITY_PRESET 12

    #define FXAA_GREEN_AS_LUMA 1

    /*--------------------------------------------------------------------------*/
    #ifndef FXAA_PC_CONSOLE
        //
        // The console algorithm for PC is included
        // for developers targeting really low spec machines.
        // Likely better to just run FXAA_PC, and use a really low preset.
        //
        #define FXAA_PC_CONSOLE 0
    #endif
    /*--------------------------------------------------------------------------*/
    #ifndef FXAA_GLSL_120
        #define FXAA_GLSL_120 0
    #endif
    /*--------------------------------------------------------------------------*/
    #ifndef FXAA_GLSL_130
        #define FXAA_GLSL_130 0
    #endif
    /*--------------------------------------------------------------------------*/
    #ifndef FXAA_HLSL_3
        #define FXAA_HLSL_3 0
    #endif
    /*--------------------------------------------------------------------------*/
    #ifndef FXAA_HLSL_4
        #define FXAA_HLSL_4 0
    #endif
    /*--------------------------------------------------------------------------*/
    #ifndef FXAA_HLSL_5
        #define FXAA_HLSL_5 0
    #endif
    /*==========================================================================*/
    #ifndef FXAA_GREEN_AS_LUMA
        //
        // For those using non-linear color,
        // and either not able to get luma in alpha, or not wanting to,
        // this enables FXAA to run using green as a proxy for luma.
        // So with this enabled, no need to pack luma in alpha.
        //
        // This will turn off AA on anything which lacks some amount of green.
        // Pure red and blue or combination of only R and B, will get no AA.
        //
        // Might want to lower the settings for both,
        //    fxaaConsoleEdgeThresholdMin
        //    fxaaQualityEdgeThresholdMin
        // In order to insure AA does not get turned off on colors
        // which contain a minor amount of green.
        //
        // 1 = On.
        // 0 = Off.
        //
        #define FXAA_GREEN_AS_LUMA 0
    #endif
    /*--------------------------------------------------------------------------*/
    #ifndef FXAA_EARLY_EXIT
        //
        // Controls algorithm's early exit path.
        // On PS3 turning this ON adds 2 cycles to the shader.
        // On 360 turning this OFF adds 10ths of a millisecond to the shader.
        // Turning this off on console will result in a more blurry image.
        // So this defaults to on.
        //
        // 1 = On.
        // 0 = Off.
        //
        #define FXAA_EARLY_EXIT 1
    #endif
    /*--------------------------------------------------------------------------*/
    #ifndef FXAA_DISCARD
        //
        // Only valid for PC OpenGL currently.
        // Probably will not work when FXAA_GREEN_AS_LUMA = 1.
        //
        // 1 = Use discard on pixels which don't need AA.
        //     For APIs which enable concurrent TEX+ROP from same surface.
        // 0 = Return unchanged color on pixels which don't need AA.
        //
        #define FXAA_DISCARD 0
    #endif
    /*--------------------------------------------------------------------------*/
    #ifndef FXAA_FAST_PIXEL_OFFSET
        //
        // Used for GLSL 120 only.
        //
        // 1 = GL API supports fast pixel offsets
        // 0 = do not use fast pixel offsets
        //
        #ifdef GL_EXT_gpu_shader4
            #define FXAA_FAST_PIXEL_OFFSET 1
        #endif
        #ifdef GL_NV_gpu_shader5
            #define FXAA_FAST_PIXEL_OFFSET 1
        #endif
        #ifdef GL_ARB_gpu_shader5
            #define FXAA_FAST_PIXEL_OFFSET 1
        #endif
        #ifndef FXAA_FAST_PIXEL_OFFSET
            #define FXAA_FAST_PIXEL_OFFSET 0
        #endif
    #endif
    /*--------------------------------------------------------------------------*/
    #ifndef FXAA_GATHER4_ALPHA
        //
        // 1 = API supports gather4 on alpha channel.
        // 0 = API does not support gather4 on alpha channel.
        //
        #if (FXAA_HLSL_5 == 1)
            #define FXAA_GATHER4_ALPHA 1
        #endif
        #ifdef GL_ARB_gpu_shader5
            #define FXAA_GATHER4_ALPHA 1
        #endif
        #ifdef GL_NV_gpu_shader5
            #define FXAA_GATHER4_ALPHA 1
        #endif
        #ifndef FXAA_GATHER4_ALPHA
            #define FXAA_GATHER4_ALPHA 0
        #endif
    #endif


    /*============================================================================
                            FXAA QUALITY - TUNING KNOBS
    ------------------------------------------------------------------------------
    NOTE the other tuning knobs are now in the shader function inputs!
    ============================================================================*/
    #ifndef FXAA_QUALITY_PRESET
        //
        // Choose the quality preset.
        // This needs to be compiled into the shader as it effects code.
        // Best option to include multiple presets is to
        // in each shader define the preset, then include this file.
        //
        // OPTIONS
        // -----------------------------------------------------------------------
        // 10 to 15 - default medium dither (10=fastest, 15=highest quality)
        // 20 to 29 - less dither, more expensive (20=fastest, 29=highest quality)
        // 39      - no dither, very expensive
        //
        // NOTES
        // -----------------------------------------------------------------------
        // 12 = slightly faster then FXAA 3.9 and higher edge quality (default)
        // 13 = about same speed as FXAA 3.9 and better than 12
        // 23 = closest to FXAA 3.9 visually and performance wise
        //  _ = the lowest digit is directly related to performance
        // _  = the highest digit is directly related to style
        //
        #define FXAA_QUALITY_PRESET 12
    #endif


    /*============================================================================

                               FXAA QUALITY - PRESETS

    ============================================================================*/

    /*============================================================================
                         FXAA QUALITY - MEDIUM DITHER PRESETS
    ============================================================================*/
    #if (FXAA_QUALITY_PRESET == 10)
        #define FXAA_QUALITY_PS 3
        #define FXAA_QUALITY_P0 1.5
        #define FXAA_QUALITY_P1 3.0
        #define FXAA_QUALITY_P2 12.0
    #endif
    /*--------------------------------------------------------------------------*/
    #if (FXAA_QUALITY_PRESET == 11)
        #define FXAA_QUALITY_PS 4
        #define FXAA_QUALITY_P0 1.0
        #define FXAA_QUALITY_P1 1.5
        #define FXAA_QUALITY_P2 3.0
        #define FXAA_QUALITY_P3 12.0
    #endif
    /*--------------------------------------------------------------------------*/
    #if (FXAA_QUALITY_PRESET == 12)
        #define FXAA_QUALITY_PS 5
        #define FXAA_QUALITY_P0 1.0
        #define FXAA_QUALITY_P1 1.5
        #define FXAA_QUALITY_P2 2.0
        #define FXAA_QUALITY_P3 4.0
        #define FXAA_QUALITY_P4 12.0
    #endif
    /*--------------------------------------------------------------------------*/
    #if (FXAA_QUALITY_PRESET == 13)
        #define FXAA_QUALITY_PS 6
        #define FXAA_QUALITY_P0 1.0
        #define FXAA_QUALITY_P1 1.5
        #define FXAA_QUALITY_P2 2.0
        #define FXAA_QUALITY_P3 2.0
        #define FXAA_QUALITY_P4 4.0
        #define FXAA_QUALITY_P5 12.0
    #endif
    /*--------------------------------------------------------------------------*/
    #if (FXAA_QUALITY_PRESET == 14)
        #define FXAA_QUALITY_PS 7
        #define FXAA_QUALITY_P0 1.0
        #define FXAA_QUALITY_P1 1.5
        #define FXAA_QUALITY_P2 2.0
        #define FXAA_QUALITY_P3 2.0
        #define FXAA_QUALITY_P4 2.0
        #define FXAA_QUALITY_P5 4.0
        #define FXAA_QUALITY_P6 12.0
    #endif
    /*--------------------------------------------------------------------------*/
    #if (FXAA_QUALITY_PRESET == 15)
        #define FXAA_QUALITY_PS 8
        #define FXAA_QUALITY_P0 1.0
        #define FXAA_QUALITY_P1 1.5
        #define FXAA_QUALITY_P2 2.0
        #define FXAA_QUALITY_P3 2.0
        #define FXAA_QUALITY_P4 2.0
        #define FXAA_QUALITY_P5 2.0
        #define FXAA_QUALITY_P6 4.0
        #define FXAA_QUALITY_P7 12.0
    #endif

    /*============================================================================
                         FXAA QUALITY - LOW DITHER PRESETS
    ============================================================================*/
    #if (FXAA_QUALITY_PRESET == 20)
        #define FXAA_QUALITY_PS 3
        #define FXAA_QUALITY_P0 1.5
        #define FXAA_QUALITY_P1 2.0
        #define FXAA_QUALITY_P2 8.0
    #endif
    /*--------------------------------------------------------------------------*/
    #if (FXAA_QUALITY_PRESET == 21)
        #define FXAA_QUALITY_PS 4
        #define FXAA_QUALITY_P0 1.0
        #define FXAA_QUALITY_P1 1.5
        #define FXAA_QUALITY_P2 2.0
        #define FXAA_QUALITY_P3 8.0
    #endif
    /*--------------------------------------------------------------------------*/
    #if (FXAA_QUALITY_PRESET == 22)
        #define FXAA_QUALITY_PS 5
        #define FXAA_QUALITY_P0 1.0
        #define FXAA_QUALITY_P1 1.5
        #define FXAA_QUALITY_P2 2.0
        #define FXAA_QUALITY_P3 2.0
        #define FXAA_QUALITY_P4 8.0
    #endif
    /*--------------------------------------------------------------------------*/
    #if (FXAA_QUALITY_PRESET == 23)
        #define FXAA_QUALITY_PS 6
        #define FXAA_QUALITY_P0 1.0
        #define FXAA_QUALITY_P1 1.5
        #define FXAA_QUALITY_P2 2.0
        #define FXAA_QUALITY_P3 2.0
        #define FXAA_QUALITY_P4 2.0
        #define FXAA_QUALITY_P5 8.0
    #endif
    /*--------------------------------------------------------------------------*/
    #if (FXAA_QUALITY_PRESET == 24)
        #define FXAA_QUALITY_PS 7
        #define FXAA_QUALITY_P0 1.0
        #define FXAA_QUALITY_P1 1.5
        #define FXAA_QUALITY_P2 2.0
        #define FXAA_QUALITY_P3 2.0
        #define FXAA_QUALITY_P4 2.0
        #define FXAA_QUALITY_P5 3.0
        #define FXAA_QUALITY_P6 8.0
    #endif
    /*--------------------------------------------------------------------------*/
    #if (FXAA_QUALITY_PRESET == 25)
        #define FXAA_QUALITY_PS 8
        #define FXAA_QUALITY_P0 1.0
        #define FXAA_QUALITY_P1 1.5
        #define FXAA_QUALITY_P2 2.0
        #define FXAA_QUALITY_P3 2.0
        #define FXAA_QUALITY_P4 2.0
        #define FXAA_QUALITY_P5 2.0
        #define FXAA_QUALITY_P6 4.0
        #define FXAA_QUALITY_P7 8.0
    #endif
    /*--------------------------------------------------------------------------*/
    #if (FXAA_QUALITY_PRESET == 26)
        #define FXAA_QUALITY_PS 9
        #define FXAA_QUALITY_P0 1.0
        #define FXAA_QUALITY_P1 1.5
        #define FXAA_QUALITY_P2 2.0
        #define FXAA_QUALITY_P3 2.0
        #define FXAA_QUALITY_P4 2.0
        #define FXAA_QUALITY_P5 2.0
        #define FXAA_QUALITY_P6 2.0
        #define FXAA_QUALITY_P7 4.0
        #define FXAA_QUALITY_P8 8.0
    #endif
    /*--------------------------------------------------------------------------*/
    #if (FXAA_QUALITY_PRESET == 27)
        #define FXAA_QUALITY_PS 10
        #define FXAA_QUALITY_P0 1.0
        #define FXAA_QUALITY_P1 1.5
        #define FXAA_QUALITY_P2 2.0
        #define FXAA_QUALITY_P3 2.0
        #define FXAA_QUALITY_P4 2.0
        #define FXAA_QUALITY_P5 2.0
        #define FXAA_QUALITY_P6 2.0
        #define FXAA_QUALITY_P7 2.0
        #define FXAA_QUALITY_P8 4.0
        #define FXAA_QUALITY_P9 8.0
    #endif
    /*--------------------------------------------------------------------------*/
    #if (FXAA_QUALITY_PRESET == 28)
        #define FXAA_QUALITY_PS 11
        #define FXAA_QUALITY_P0 1.0
        #define FXAA_QUALITY_P1 1.5
        #define FXAA_QUALITY_P2 2.0
        #define FXAA_QUALITY_P3 2.0
        #define FXAA_QUALITY_P4 2.0
        #define FXAA_QUALITY_P5 2.0
        #define FXAA_QUALITY_P6 2.0
        #define FXAA_QUALITY_P7 2.0
        #define FXAA_QUALITY_P8 2.0
        #define FXAA_QUALITY_P9 4.0
        #define FXAA_QUALITY_P10 8.0
    #endif
    /*--------------------------------------------------------------------------*/
    #if (FXAA_QUALITY_PRESET == 29)
        #define FXAA_QUALITY_PS 12
        #define FXAA_QUALITY_P0 1.0
        #define FXAA_QUALITY_P1 1.5
        #define FXAA_QUALITY_P2 2.0
        #define FXAA_QUALITY_P3 2.0
        #define FXAA_QUALITY_P4 2.0
        #define FXAA_QUALITY_P5 2.0
        #define FXAA_QUALITY_P6 2.0
        #define FXAA_QUALITY_P7 2.0
        #define FXAA_QUALITY_P8 2.0
        #define FXAA_QUALITY_P9 2.0
        #define FXAA_QUALITY_P10 4.0
        #define FXAA_QUALITY_P11 8.0
    #endif

    /*============================================================================
                         FXAA QUALITY - EXTREME QUALITY
    ============================================================================*/
    #if (FXAA_QUALITY_PRESET == 39)
        #define FXAA_QUALITY_PS 12
        #define FXAA_QUALITY_P0 1.0
        #define FXAA_QUALITY_P1 1.0
        #define FXAA_QUALITY_P2 1.0
        #define FXAA_QUALITY_P3 1.0
        #define FXAA_QUALITY_P4 1.0
        #define FXAA_QUALITY_P5 1.5
        #define FXAA_QUALITY_P6 2.0
        #define FXAA_QUALITY_P7 2.0
        #define FXAA_QUALITY_P8 2.0
        #define FXAA_QUALITY_P9 2.0
        #define FXAA_QUALITY_P10 4.0
        #define FXAA_QUALITY_P11 8.0
    #endif



    /*============================================================================

                                    API PORTING

    ============================================================================*/
    #if (FXAA_GLSL_100 == 1) || (FXAA_GLSL_120 == 1) || (FXAA_GLSL_130 == 1)
        #define FxaaBool bool
        #define FxaaDiscard discard
        #define FxaaFloat float
        #define FxaaFloat2 vec2
        #define FxaaFloat3 vec3
        #define FxaaFloat4 vec4
        #define FxaaHalf float
        #define FxaaHalf2 vec2
        #define FxaaHalf3 vec3
        #define FxaaHalf4 vec4
        #define FxaaInt2 ivec2
        #define FxaaSat(x) clamp(x, 0.0, 1.0)
        #define FxaaTex sampler2D
    #else
        #define FxaaBool bool
        #define FxaaDiscard clip(-1)
        #define FxaaFloat float
        #define FxaaFloat2 float2
        #define FxaaFloat3 float3
        #define FxaaFloat4 float4
        #define FxaaHalf half
        #define FxaaHalf2 half2
        #define FxaaHalf3 half3
        #define FxaaHalf4 half4
        #define FxaaSat(x) saturate(x)
    #endif
    /*--------------------------------------------------------------------------*/
    #if (FXAA_GLSL_100 == 1)
      #define FxaaTexTop(t, p) texture2D(t, p, 0.0)
      #define FxaaTexOff(t, p, o, r) texture2D(t, p + (o * r), 0.0)
    #endif
    /*--------------------------------------------------------------------------*/
    #if (FXAA_GLSL_120 == 1)
        // Requires,
        //  #version 120
        // And at least,
        //  #extension GL_EXT_gpu_shader4 : enable
        //  (or set FXAA_FAST_PIXEL_OFFSET 1 to work like DX9)
        #define FxaaTexTop(t, p) texture2DLod(t, p, 0.0)
        #if (FXAA_FAST_PIXEL_OFFSET == 1)
            #define FxaaTexOff(t, p, o, r) texture2DLodOffset(t, p, 0.0, o)
        #else
            #define FxaaTexOff(t, p, o, r) texture2DLod(t, p + (o * r), 0.0)
        #endif
        #if (FXAA_GATHER4_ALPHA == 1)
            // use #extension GL_ARB_gpu_shader5 : enable
            #define FxaaTexAlpha4(t, p) textureGather(t, p, 3)
            #define FxaaTexOffAlpha4(t, p, o) textureGatherOffset(t, p, o, 3)
            #define FxaaTexGreen4(t, p) textureGather(t, p, 1)
            #define FxaaTexOffGreen4(t, p, o) textureGatherOffset(t, p, o, 1)
        #endif
    #endif
    /*--------------------------------------------------------------------------*/
    #if (FXAA_GLSL_130 == 1)
        // Requires "#version 130" or better
        #define FxaaTexTop(t, p) textureLod(t, p, 0.0)
        #define FxaaTexOff(t, p, o, r) textureLodOffset(t, p, 0.0, o)
        #if (FXAA_GATHER4_ALPHA == 1)
            // use #extension GL_ARB_gpu_shader5 : enable
            #define FxaaTexAlpha4(t, p) textureGather(t, p, 3)
            #define FxaaTexOffAlpha4(t, p, o) textureGatherOffset(t, p, o, 3)
            #define FxaaTexGreen4(t, p) textureGather(t, p, 1)
            #define FxaaTexOffGreen4(t, p, o) textureGatherOffset(t, p, o, 1)
        #endif
    #endif
    /*--------------------------------------------------------------------------*/
    #if (FXAA_HLSL_3 == 1)
        #define FxaaInt2 float2
        #define FxaaTex sampler2D
        #define FxaaTexTop(t, p) tex2Dlod(t, float4(p, 0.0, 0.0))
        #define FxaaTexOff(t, p, o, r) tex2Dlod(t, float4(p + (o * r), 0, 0))
    #endif
    /*--------------------------------------------------------------------------*/
    #if (FXAA_HLSL_4 == 1)
        #define FxaaInt2 int2
        struct FxaaTex { SamplerState smpl; Texture2D tex; };
        #define FxaaTexTop(t, p) t.tex.SampleLevel(t.smpl, p, 0.0)
        #define FxaaTexOff(t, p, o, r) t.tex.SampleLevel(t.smpl, p, 0.0, o)
    #endif
    /*--------------------------------------------------------------------------*/
    #if (FXAA_HLSL_5 == 1)
        #define FxaaInt2 int2
        struct FxaaTex { SamplerState smpl; Texture2D tex; };
        #define FxaaTexTop(t, p) t.tex.SampleLevel(t.smpl, p, 0.0)
        #define FxaaTexOff(t, p, o, r) t.tex.SampleLevel(t.smpl, p, 0.0, o)
        #define FxaaTexAlpha4(t, p) t.tex.GatherAlpha(t.smpl, p)
        #define FxaaTexOffAlpha4(t, p, o) t.tex.GatherAlpha(t.smpl, p, o)
        #define FxaaTexGreen4(t, p) t.tex.GatherGreen(t.smpl, p)
        #define FxaaTexOffGreen4(t, p, o) t.tex.GatherGreen(t.smpl, p, o)
    #endif


    /*============================================================================
                       GREEN AS LUMA OPTION SUPPORT FUNCTION
    ============================================================================*/
    #if (FXAA_GREEN_AS_LUMA == 0)
        FxaaFloat FxaaLuma(FxaaFloat4 rgba) { return rgba.w; }
    #else
        FxaaFloat FxaaLuma(FxaaFloat4 rgba) { return rgba.y; }
    #endif




    /*============================================================================

                                 FXAA3 QUALITY - PC

    ============================================================================*/
    #if (FXAA_PC == 1)
    /*--------------------------------------------------------------------------*/
    FxaaFloat4 FxaaPixelShader(
        //
        // Use noperspective interpolation here (turn off perspective interpolation).
        // {xy} = center of pixel
        FxaaFloat2 pos,
        //
        // Used only for FXAA Console, and not used on the 360 version.
        // Use noperspective interpolation here (turn off perspective interpolation).
        // {xy_} = upper left of pixel
        // {_zw} = lower right of pixel
        FxaaFloat4 fxaaConsolePosPos,
        //
        // Input color texture.
        // {rgb_} = color in linear or perceptual color space
        // if (FXAA_GREEN_AS_LUMA == 0)
        //     {__a} = luma in perceptual color space (not linear)
        FxaaTex tex,
        //
        // Only used on the optimized 360 version of FXAA Console.
        // For everything but 360, just use the same input here as for "tex".
        // For 360, same texture, just alias with a 2nd sampler.
        // This sampler needs to have an exponent bias of -1.
        FxaaTex fxaaConsole360TexExpBiasNegOne,
        //
        // Only used on the optimized 360 version of FXAA Console.
        // For everything but 360, just use the same input here as for "tex".
        // For 360, same texture, just alias with a 3nd sampler.
        // This sampler needs to have an exponent bias of -2.
        FxaaTex fxaaConsole360TexExpBiasNegTwo,
        //
        // Only used on FXAA Quality.
        // This must be from a constant/uniform.
        // {x_} = 1.0/screenWidthInPixels
        // {_y} = 1.0/screenHeightInPixels
        FxaaFloat2 fxaaQualityRcpFrame,
        //
        // Only used on FXAA Console.
        // This must be from a constant/uniform.
        // This effects sub-pixel AA quality and inversely sharpness.
        //   Where N ranges between,
        //     N = 0.50 (default)
        //     N = 0.33 (sharper)
        // {x__} = -N/screenWidthInPixels
        // {_y_} = -N/screenHeightInPixels
        // {_z_} =  N/screenWidthInPixels
        // {__w} =  N/screenHeightInPixels
        FxaaFloat4 fxaaConsoleRcpFrameOpt,
        //
        // Only used on FXAA Console.
        // Not used on 360, but used on PS3 and PC.
        // This must be from a constant/uniform.
        // {x__} = -2.0/screenWidthInPixels
        // {_y_} = -2.0/screenHeightInPixels
        // {_z_} =  2.0/screenWidthInPixels
        // {__w} =  2.0/screenHeightInPixels
        FxaaFloat4 fxaaConsoleRcpFrameOpt2,
        //
        // Only used on FXAA Console.
        // Only used on 360 in place of fxaaConsoleRcpFrameOpt2.
        // This must be from a constant/uniform.
        // {x__} =  8.0/screenWidthInPixels
        // {_y_} =  8.0/screenHeightInPixels
        // {_z_} = -4.0/screenWidthInPixels
        // {__w} = -4.0/screenHeightInPixels
        FxaaFloat4 fxaaConsole360RcpFrameOpt2,
        //
        // Only used on FXAA Quality.
        // This used to be the FXAA_QUALITY_SUBPIX define.
        // It is here now to allow easier tuning.
        // Choose the amount of sub-pixel aliasing removal.
        // This can effect sharpness.
        //   1.00 - upper limit (softer)
        //   0.75 - default amount of filtering
        //   0.50 - lower limit (sharper, less sub-pixel aliasing removal)
        //   0.25 - almost off
        //   0.00 - completely off
        FxaaFloat fxaaQualitySubpix,
        //
        // Only used on FXAA Quality.
        // This used to be the FXAA_QUALITY_EDGE_THRESHOLD define.
        // It is here now to allow easier tuning.
        // The minimum amount of local contrast required to apply algorithm.
        //   0.333 - too little (faster)
        //   0.250 - low quality
        //   0.166 - default
        //   0.125 - high quality
        //   0.063 - overkill (slower)
        FxaaFloat fxaaQualityEdgeThreshold,
        //
        // Only used on FXAA Quality.
        // This used to be the FXAA_QUALITY_EDGE_THRESHOLD_MIN define.
        // It is here now to allow easier tuning.
        // Trims the algorithm from processing darks.
        //   0.0833 - upper limit (default, the start of visible unfiltered edges)
        //   0.0625 - high quality (faster)
        //   0.0312 - visible limit (slower)
        // Special notes when using FXAA_GREEN_AS_LUMA,
        //   Likely want to set this to zero.
        //   As colors that are mostly not-green
        //   will appear very dark in the green channel!
        //   Tune by looking at mostly non-green content,
        //   then start at zero and increase until aliasing is a problem.
        FxaaFloat fxaaQualityEdgeThresholdMin,
        //
        // Only used on FXAA Console.
        // This used to be the FXAA_CONSOLE_EDGE_SHARPNESS define.
        // It is here now to allow easier tuning.
        // This does not effect PS3, as this needs to be compiled in.
        //   Use FXAA_CONSOLE_PS3_EDGE_SHARPNESS for PS3.
        //   Due to the PS3 being ALU bound,
        //   there are only three safe values here: 2 and 4 and 8.
        //   These options use the shaders ability to a free *|/ by 2|4|8.
        // For all other platforms can be a non-power of two.
        //   8.0 is sharper (default!!!)
        //   4.0 is softer
        //   2.0 is really soft (good only for vector graphics inputs)
        FxaaFloat fxaaConsoleEdgeSharpness,
        //
        // Only used on FXAA Console.
        // This used to be the FXAA_CONSOLE_EDGE_THRESHOLD define.
        // It is here now to allow easier tuning.
        // This does not effect PS3, as this needs to be compiled in.
        //   Use FXAA_CONSOLE_PS3_EDGE_THRESHOLD for PS3.
        //   Due to the PS3 being ALU bound,
        //   there are only two safe values here: 1/4 and 1/8.
        //   These options use the shaders ability to a free *|/ by 2|4|8.
        // The console setting has a different mapping than the quality setting.
        // Other platforms can use other values.
        //   0.125 leaves less aliasing, but is softer (default!!!)
        //   0.25 leaves more aliasing, and is sharper
        FxaaFloat fxaaConsoleEdgeThreshold,
        //
        // Only used on FXAA Console.
        // This used to be the FXAA_CONSOLE_EDGE_THRESHOLD_MIN define.
        // It is here now to allow easier tuning.
        // Trims the algorithm from processing darks.
        // The console setting has a different mapping than the quality setting.
        // This only applies when FXAA_EARLY_EXIT is 1.
        // This does not apply to PS3,
        // PS3 was simplified to avoid more shader instructions.
        //   0.06 - faster but more aliasing in darks
        //   0.05 - default
        //   0.04 - slower and less aliasing in darks
        // Special notes when using FXAA_GREEN_AS_LUMA,
        //   Likely want to set this to zero.
        //   As colors that are mostly not-green
        //   will appear very dark in the green channel!
        //   Tune by looking at mostly non-green content,
        //   then start at zero and increase until aliasing is a problem.
        FxaaFloat fxaaConsoleEdgeThresholdMin,
        //
        // Extra constants for 360 FXAA Console only.
        // Use zeros or anything else for other platforms.
        // These must be in physical constant registers and NOT immediates.
        // Immediates will result in compiler un-optimizing.
        // {xyzw} = float4(1.0, -1.0, 0.25, -0.25)
        FxaaFloat4 fxaaConsole360ConstDir
    ) {
    /*--------------------------------------------------------------------------*/
        FxaaFloat2 posM;
        posM.x = pos.x;
        posM.y = pos.y;
        #if (FXAA_GATHER4_ALPHA == 1)
            #if (FXAA_DISCARD == 0)
                FxaaFloat4 rgbyM = FxaaTexTop(tex, posM);
                #if (FXAA_GREEN_AS_LUMA == 0)
                    #define lumaM rgbyM.w
                #else
                    #define lumaM rgbyM.y
                #endif
            #endif
            #if (FXAA_GREEN_AS_LUMA == 0)
                FxaaFloat4 luma4A = FxaaTexAlpha4(tex, posM);
                FxaaFloat4 luma4B = FxaaTexOffAlpha4(tex, posM, FxaaInt2(-1, -1));
            #else
                FxaaFloat4 luma4A = FxaaTexGreen4(tex, posM);
                FxaaFloat4 luma4B = FxaaTexOffGreen4(tex, posM, FxaaInt2(-1, -1));
            #endif
            #if (FXAA_DISCARD == 1)
                #define lumaM luma4A.w
            #endif
            #define lumaE luma4A.z
            #define lumaS luma4A.x
            #define lumaSE luma4A.y
            #define lumaNW luma4B.w
            #define lumaN luma4B.z
            #define lumaW luma4B.x
        #else
            FxaaFloat4 rgbyM = FxaaTexTop(tex, posM);
            #if (FXAA_GREEN_AS_LUMA == 0)
                #define lumaM rgbyM.w
            #else
                #define lumaM rgbyM.y
            #endif
            #if (FXAA_GLSL_100 == 1)
              FxaaFloat lumaS = FxaaLuma(FxaaTexOff(tex, posM, FxaaFloat2( 0.0, 1.0), fxaaQualityRcpFrame.xy));
              FxaaFloat lumaE = FxaaLuma(FxaaTexOff(tex, posM, FxaaFloat2( 1.0, 0.0), fxaaQualityRcpFrame.xy));
              FxaaFloat lumaN = FxaaLuma(FxaaTexOff(tex, posM, FxaaFloat2( 0.0,-1.0), fxaaQualityRcpFrame.xy));
              FxaaFloat lumaW = FxaaLuma(FxaaTexOff(tex, posM, FxaaFloat2(-1.0, 0.0), fxaaQualityRcpFrame.xy));
            #else
              FxaaFloat lumaS = FxaaLuma(FxaaTexOff(tex, posM, FxaaInt2( 0, 1), fxaaQualityRcpFrame.xy));
              FxaaFloat lumaE = FxaaLuma(FxaaTexOff(tex, posM, FxaaInt2( 1, 0), fxaaQualityRcpFrame.xy));
              FxaaFloat lumaN = FxaaLuma(FxaaTexOff(tex, posM, FxaaInt2( 0,-1), fxaaQualityRcpFrame.xy));
              FxaaFloat lumaW = FxaaLuma(FxaaTexOff(tex, posM, FxaaInt2(-1, 0), fxaaQualityRcpFrame.xy));
            #endif
        #endif
    /*--------------------------------------------------------------------------*/
        FxaaFloat maxSM = max(lumaS, lumaM);
        FxaaFloat minSM = min(lumaS, lumaM);
        FxaaFloat maxESM = max(lumaE, maxSM);
        FxaaFloat minESM = min(lumaE, minSM);
        FxaaFloat maxWN = max(lumaN, lumaW);
        FxaaFloat minWN = min(lumaN, lumaW);
        FxaaFloat rangeMax = max(maxWN, maxESM);
        FxaaFloat rangeMin = min(minWN, minESM);
        FxaaFloat rangeMaxScaled = rangeMax * fxaaQualityEdgeThreshold;
        FxaaFloat range = rangeMax - rangeMin;
        FxaaFloat rangeMaxClamped = max(fxaaQualityEdgeThresholdMin, rangeMaxScaled);
        FxaaBool earlyExit = range < rangeMaxClamped;
    /*--------------------------------------------------------------------------*/
        if(earlyExit)
            #if (FXAA_DISCARD == 1)
                FxaaDiscard;
            #else
                return rgbyM;
            #endif
    /*--------------------------------------------------------------------------*/
        #if (FXAA_GATHER4_ALPHA == 0)
            #if (FXAA_GLSL_100 == 1)
              FxaaFloat lumaNW = FxaaLuma(FxaaTexOff(tex, posM, FxaaFloat2(-1.0,-1.0), fxaaQualityRcpFrame.xy));
              FxaaFloat lumaSE = FxaaLuma(FxaaTexOff(tex, posM, FxaaFloat2( 1.0, 1.0), fxaaQualityRcpFrame.xy));
              FxaaFloat lumaNE = FxaaLuma(FxaaTexOff(tex, posM, FxaaFloat2( 1.0,-1.0), fxaaQualityRcpFrame.xy));
              FxaaFloat lumaSW = FxaaLuma(FxaaTexOff(tex, posM, FxaaFloat2(-1.0, 1.0), fxaaQualityRcpFrame.xy));
            #else
              FxaaFloat lumaNW = FxaaLuma(FxaaTexOff(tex, posM, FxaaInt2(-1,-1), fxaaQualityRcpFrame.xy));
              FxaaFloat lumaSE = FxaaLuma(FxaaTexOff(tex, posM, FxaaInt2( 1, 1), fxaaQualityRcpFrame.xy));
              FxaaFloat lumaNE = FxaaLuma(FxaaTexOff(tex, posM, FxaaInt2( 1,-1), fxaaQualityRcpFrame.xy));
              FxaaFloat lumaSW = FxaaLuma(FxaaTexOff(tex, posM, FxaaInt2(-1, 1), fxaaQualityRcpFrame.xy));
            #endif
        #else
            FxaaFloat lumaNE = FxaaLuma(FxaaTexOff(tex, posM, FxaaInt2(1, -1), fxaaQualityRcpFrame.xy));
            FxaaFloat lumaSW = FxaaLuma(FxaaTexOff(tex, posM, FxaaInt2(-1, 1), fxaaQualityRcpFrame.xy));
        #endif
    /*--------------------------------------------------------------------------*/
        FxaaFloat lumaNS = lumaN + lumaS;
        FxaaFloat lumaWE = lumaW + lumaE;
        FxaaFloat subpixRcpRange = 1.0/range;
        FxaaFloat subpixNSWE = lumaNS + lumaWE;
        FxaaFloat edgeHorz1 = (-2.0 * lumaM) + lumaNS;
        FxaaFloat edgeVert1 = (-2.0 * lumaM) + lumaWE;
    /*--------------------------------------------------------------------------*/
        FxaaFloat lumaNESE = lumaNE + lumaSE;
        FxaaFloat lumaNWNE = lumaNW + lumaNE;
        FxaaFloat edgeHorz2 = (-2.0 * lumaE) + lumaNESE;
        FxaaFloat edgeVert2 = (-2.0 * lumaN) + lumaNWNE;
    /*--------------------------------------------------------------------------*/
        FxaaFloat lumaNWSW = lumaNW + lumaSW;
        FxaaFloat lumaSWSE = lumaSW + lumaSE;
        FxaaFloat edgeHorz4 = (abs(edgeHorz1) * 2.0) + abs(edgeHorz2);
        FxaaFloat edgeVert4 = (abs(edgeVert1) * 2.0) + abs(edgeVert2);
        FxaaFloat edgeHorz3 = (-2.0 * lumaW) + lumaNWSW;
        FxaaFloat edgeVert3 = (-2.0 * lumaS) + lumaSWSE;
        FxaaFloat edgeHorz = abs(edgeHorz3) + edgeHorz4;
        FxaaFloat edgeVert = abs(edgeVert3) + edgeVert4;
    /*--------------------------------------------------------------------------*/
        FxaaFloat subpixNWSWNESE = lumaNWSW + lumaNESE;
        FxaaFloat lengthSign = fxaaQualityRcpFrame.x;
        FxaaBool horzSpan = edgeHorz >= edgeVert;
        FxaaFloat subpixA = subpixNSWE * 2.0 + subpixNWSWNESE;
    /*--------------------------------------------------------------------------*/
        if(!horzSpan) lumaN = lumaW;
        if(!horzSpan) lumaS = lumaE;
        if(horzSpan) lengthSign = fxaaQualityRcpFrame.y;
        FxaaFloat subpixB = (subpixA * (1.0/12.0)) - lumaM;
    /*--------------------------------------------------------------------------*/
        FxaaFloat gradientN = lumaN - lumaM;
        FxaaFloat gradientS = lumaS - lumaM;
        FxaaFloat lumaNN = lumaN + lumaM;
        FxaaFloat lumaSS = lumaS + lumaM;
        FxaaBool pairN = abs(gradientN) >= abs(gradientS);
        FxaaFloat gradient = max(abs(gradientN), abs(gradientS));
        if(pairN) lengthSign = -lengthSign;
        FxaaFloat subpixC = FxaaSat(abs(subpixB) * subpixRcpRange);
    /*--------------------------------------------------------------------------*/
        FxaaFloat2 posB;
        posB.x = posM.x;
        posB.y = posM.y;
        FxaaFloat2 offNP;
        offNP.x = (!horzSpan) ? 0.0 : fxaaQualityRcpFrame.x;
        offNP.y = ( horzSpan) ? 0.0 : fxaaQualityRcpFrame.y;
        if(!horzSpan) posB.x += lengthSign * 0.5;
        if( horzSpan) posB.y += lengthSign * 0.5;
    /*--------------------------------------------------------------------------*/
        FxaaFloat2 posN;
        posN.x = posB.x - offNP.x * FXAA_QUALITY_P0;
        posN.y = posB.y - offNP.y * FXAA_QUALITY_P0;
        FxaaFloat2 posP;
        posP.x = posB.x + offNP.x * FXAA_QUALITY_P0;
        posP.y = posB.y + offNP.y * FXAA_QUALITY_P0;
        FxaaFloat subpixD = ((-2.0)*subpixC) + 3.0;
        FxaaFloat lumaEndN = FxaaLuma(FxaaTexTop(tex, posN));
        FxaaFloat subpixE = subpixC * subpixC;
        FxaaFloat lumaEndP = FxaaLuma(FxaaTexTop(tex, posP));
    /*--------------------------------------------------------------------------*/
        if(!pairN) lumaNN = lumaSS;
        FxaaFloat gradientScaled = gradient * 1.0/4.0;
        FxaaFloat lumaMM = lumaM - lumaNN * 0.5;
        FxaaFloat subpixF = subpixD * subpixE;
        FxaaBool lumaMLTZero = lumaMM < 0.0;
    /*--------------------------------------------------------------------------*/
        lumaEndN -= lumaNN * 0.5;
        lumaEndP -= lumaNN * 0.5;
        FxaaBool doneN = abs(lumaEndN) >= gradientScaled;
        FxaaBool doneP = abs(lumaEndP) >= gradientScaled;
        if(!doneN) posN.x -= offNP.x * FXAA_QUALITY_P1;
        if(!doneN) posN.y -= offNP.y * FXAA_QUALITY_P1;
        FxaaBool doneNP = (!doneN) || (!doneP);
        if(!doneP) posP.x += offNP.x * FXAA_QUALITY_P1;
        if(!doneP) posP.y += offNP.y * FXAA_QUALITY_P1;
    /*--------------------------------------------------------------------------*/
        if(doneNP) {
            if(!doneN) lumaEndN = FxaaLuma(FxaaTexTop(tex, posN.xy));
            if(!doneP) lumaEndP = FxaaLuma(FxaaTexTop(tex, posP.xy));
            if(!doneN) lumaEndN = lumaEndN - lumaNN * 0.5;
            if(!doneP) lumaEndP = lumaEndP - lumaNN * 0.5;
            doneN = abs(lumaEndN) >= gradientScaled;
            doneP = abs(lumaEndP) >= gradientScaled;
            if(!doneN) posN.x -= offNP.x * FXAA_QUALITY_P2;
            if(!doneN) posN.y -= offNP.y * FXAA_QUALITY_P2;
            doneNP = (!doneN) || (!doneP);
            if(!doneP) posP.x += offNP.x * FXAA_QUALITY_P2;
            if(!doneP) posP.y += offNP.y * FXAA_QUALITY_P2;
    /*--------------------------------------------------------------------------*/
            #if (FXAA_QUALITY_PS > 3)
            if(doneNP) {
                if(!doneN) lumaEndN = FxaaLuma(FxaaTexTop(tex, posN.xy));
                if(!doneP) lumaEndP = FxaaLuma(FxaaTexTop(tex, posP.xy));
                if(!doneN) lumaEndN = lumaEndN - lumaNN * 0.5;
                if(!doneP) lumaEndP = lumaEndP - lumaNN * 0.5;
                doneN = abs(lumaEndN) >= gradientScaled;
                doneP = abs(lumaEndP) >= gradientScaled;
                if(!doneN) posN.x -= offNP.x * FXAA_QUALITY_P3;
                if(!doneN) posN.y -= offNP.y * FXAA_QUALITY_P3;
                doneNP = (!doneN) || (!doneP);
                if(!doneP) posP.x += offNP.x * FXAA_QUALITY_P3;
                if(!doneP) posP.y += offNP.y * FXAA_QUALITY_P3;
    /*--------------------------------------------------------------------------*/
                #if (FXAA_QUALITY_PS > 4)
                if(doneNP) {
                    if(!doneN) lumaEndN = FxaaLuma(FxaaTexTop(tex, posN.xy));
                    if(!doneP) lumaEndP = FxaaLuma(FxaaTexTop(tex, posP.xy));
                    if(!doneN) lumaEndN = lumaEndN - lumaNN * 0.5;
                    if(!doneP) lumaEndP = lumaEndP - lumaNN * 0.5;
                    doneN = abs(lumaEndN) >= gradientScaled;
                    doneP = abs(lumaEndP) >= gradientScaled;
                    if(!doneN) posN.x -= offNP.x * FXAA_QUALITY_P4;
                    if(!doneN) posN.y -= offNP.y * FXAA_QUALITY_P4;
                    doneNP = (!doneN) || (!doneP);
                    if(!doneP) posP.x += offNP.x * FXAA_QUALITY_P4;
                    if(!doneP) posP.y += offNP.y * FXAA_QUALITY_P4;
    /*--------------------------------------------------------------------------*/
                    #if (FXAA_QUALITY_PS > 5)
                    if(doneNP) {
                        if(!doneN) lumaEndN = FxaaLuma(FxaaTexTop(tex, posN.xy));
                        if(!doneP) lumaEndP = FxaaLuma(FxaaTexTop(tex, posP.xy));
                        if(!doneN) lumaEndN = lumaEndN - lumaNN * 0.5;
                        if(!doneP) lumaEndP = lumaEndP - lumaNN * 0.5;
                        doneN = abs(lumaEndN) >= gradientScaled;
                        doneP = abs(lumaEndP) >= gradientScaled;
                        if(!doneN) posN.x -= offNP.x * FXAA_QUALITY_P5;
                        if(!doneN) posN.y -= offNP.y * FXAA_QUALITY_P5;
                        doneNP = (!doneN) || (!doneP);
                        if(!doneP) posP.x += offNP.x * FXAA_QUALITY_P5;
                        if(!doneP) posP.y += offNP.y * FXAA_QUALITY_P5;
    /*--------------------------------------------------------------------------*/
                        #if (FXAA_QUALITY_PS > 6)
                        if(doneNP) {
                            if(!doneN) lumaEndN = FxaaLuma(FxaaTexTop(tex, posN.xy));
                            if(!doneP) lumaEndP = FxaaLuma(FxaaTexTop(tex, posP.xy));
                            if(!doneN) lumaEndN = lumaEndN - lumaNN * 0.5;
                            if(!doneP) lumaEndP = lumaEndP - lumaNN * 0.5;
                            doneN = abs(lumaEndN) >= gradientScaled;
                            doneP = abs(lumaEndP) >= gradientScaled;
                            if(!doneN) posN.x -= offNP.x * FXAA_QUALITY_P6;
                            if(!doneN) posN.y -= offNP.y * FXAA_QUALITY_P6;
                            doneNP = (!doneN) || (!doneP);
                            if(!doneP) posP.x += offNP.x * FXAA_QUALITY_P6;
                            if(!doneP) posP.y += offNP.y * FXAA_QUALITY_P6;
    /*--------------------------------------------------------------------------*/
                            #if (FXAA_QUALITY_PS > 7)
                            if(doneNP) {
                                if(!doneN) lumaEndN = FxaaLuma(FxaaTexTop(tex, posN.xy));
                                if(!doneP) lumaEndP = FxaaLuma(FxaaTexTop(tex, posP.xy));
                                if(!doneN) lumaEndN = lumaEndN - lumaNN * 0.5;
                                if(!doneP) lumaEndP = lumaEndP - lumaNN * 0.5;
                                doneN = abs(lumaEndN) >= gradientScaled;
                                doneP = abs(lumaEndP) >= gradientScaled;
                                if(!doneN) posN.x -= offNP.x * FXAA_QUALITY_P7;
                                if(!doneN) posN.y -= offNP.y * FXAA_QUALITY_P7;
                                doneNP = (!doneN) || (!doneP);
                                if(!doneP) posP.x += offNP.x * FXAA_QUALITY_P7;
                                if(!doneP) posP.y += offNP.y * FXAA_QUALITY_P7;
    /*--------------------------------------------------------------------------*/
        #if (FXAA_QUALITY_PS > 8)
        if(doneNP) {
            if(!doneN) lumaEndN = FxaaLuma(FxaaTexTop(tex, posN.xy));
            if(!doneP) lumaEndP = FxaaLuma(FxaaTexTop(tex, posP.xy));
            if(!doneN) lumaEndN = lumaEndN - lumaNN * 0.5;
            if(!doneP) lumaEndP = lumaEndP - lumaNN * 0.5;
            doneN = abs(lumaEndN) >= gradientScaled;
            doneP = abs(lumaEndP) >= gradientScaled;
            if(!doneN) posN.x -= offNP.x * FXAA_QUALITY_P8;
            if(!doneN) posN.y -= offNP.y * FXAA_QUALITY_P8;
            doneNP = (!doneN) || (!doneP);
            if(!doneP) posP.x += offNP.x * FXAA_QUALITY_P8;
            if(!doneP) posP.y += offNP.y * FXAA_QUALITY_P8;
    /*--------------------------------------------------------------------------*/
            #if (FXAA_QUALITY_PS > 9)
            if(doneNP) {
                if(!doneN) lumaEndN = FxaaLuma(FxaaTexTop(tex, posN.xy));
                if(!doneP) lumaEndP = FxaaLuma(FxaaTexTop(tex, posP.xy));
                if(!doneN) lumaEndN = lumaEndN - lumaNN * 0.5;
                if(!doneP) lumaEndP = lumaEndP - lumaNN * 0.5;
                doneN = abs(lumaEndN) >= gradientScaled;
                doneP = abs(lumaEndP) >= gradientScaled;
                if(!doneN) posN.x -= offNP.x * FXAA_QUALITY_P9;
                if(!doneN) posN.y -= offNP.y * FXAA_QUALITY_P9;
                doneNP = (!doneN) || (!doneP);
                if(!doneP) posP.x += offNP.x * FXAA_QUALITY_P9;
                if(!doneP) posP.y += offNP.y * FXAA_QUALITY_P9;
    /*--------------------------------------------------------------------------*/
                #if (FXAA_QUALITY_PS > 10)
                if(doneNP) {
                    if(!doneN) lumaEndN = FxaaLuma(FxaaTexTop(tex, posN.xy));
                    if(!doneP) lumaEndP = FxaaLuma(FxaaTexTop(tex, posP.xy));
                    if(!doneN) lumaEndN = lumaEndN - lumaNN * 0.5;
                    if(!doneP) lumaEndP = lumaEndP - lumaNN * 0.5;
                    doneN = abs(lumaEndN) >= gradientScaled;
                    doneP = abs(lumaEndP) >= gradientScaled;
                    if(!doneN) posN.x -= offNP.x * FXAA_QUALITY_P10;
                    if(!doneN) posN.y -= offNP.y * FXAA_QUALITY_P10;
                    doneNP = (!doneN) || (!doneP);
                    if(!doneP) posP.x += offNP.x * FXAA_QUALITY_P10;
                    if(!doneP) posP.y += offNP.y * FXAA_QUALITY_P10;
    /*--------------------------------------------------------------------------*/
                    #if (FXAA_QUALITY_PS > 11)
                    if(doneNP) {
                        if(!doneN) lumaEndN = FxaaLuma(FxaaTexTop(tex, posN.xy));
                        if(!doneP) lumaEndP = FxaaLuma(FxaaTexTop(tex, posP.xy));
                        if(!doneN) lumaEndN = lumaEndN - lumaNN * 0.5;
                        if(!doneP) lumaEndP = lumaEndP - lumaNN * 0.5;
                        doneN = abs(lumaEndN) >= gradientScaled;
                        doneP = abs(lumaEndP) >= gradientScaled;
                        if(!doneN) posN.x -= offNP.x * FXAA_QUALITY_P11;
                        if(!doneN) posN.y -= offNP.y * FXAA_QUALITY_P11;
                        doneNP = (!doneN) || (!doneP);
                        if(!doneP) posP.x += offNP.x * FXAA_QUALITY_P11;
                        if(!doneP) posP.y += offNP.y * FXAA_QUALITY_P11;
    /*--------------------------------------------------------------------------*/
                        #if (FXAA_QUALITY_PS > 12)
                        if(doneNP) {
                            if(!doneN) lumaEndN = FxaaLuma(FxaaTexTop(tex, posN.xy));
                            if(!doneP) lumaEndP = FxaaLuma(FxaaTexTop(tex, posP.xy));
                            if(!doneN) lumaEndN = lumaEndN - lumaNN * 0.5;
                            if(!doneP) lumaEndP = lumaEndP - lumaNN * 0.5;
                            doneN = abs(lumaEndN) >= gradientScaled;
                            doneP = abs(lumaEndP) >= gradientScaled;
                            if(!doneN) posN.x -= offNP.x * FXAA_QUALITY_P12;
                            if(!doneN) posN.y -= offNP.y * FXAA_QUALITY_P12;
                            doneNP = (!doneN) || (!doneP);
                            if(!doneP) posP.x += offNP.x * FXAA_QUALITY_P12;
                            if(!doneP) posP.y += offNP.y * FXAA_QUALITY_P12;
    /*--------------------------------------------------------------------------*/
                        }
                        #endif
    /*--------------------------------------------------------------------------*/
                    }
                    #endif
    /*--------------------------------------------------------------------------*/
                }
                #endif
    /*--------------------------------------------------------------------------*/
            }
            #endif
    /*--------------------------------------------------------------------------*/
        }
        #endif
    /*--------------------------------------------------------------------------*/
                            }
                            #endif
    /*--------------------------------------------------------------------------*/
                        }
                        #endif
    /*--------------------------------------------------------------------------*/
                    }
                    #endif
    /*--------------------------------------------------------------------------*/
                }
                #endif
    /*--------------------------------------------------------------------------*/
            }
            #endif
    /*--------------------------------------------------------------------------*/
        }
    /*--------------------------------------------------------------------------*/
        FxaaFloat dstN = posM.x - posN.x;
        FxaaFloat dstP = posP.x - posM.x;
        if(!horzSpan) dstN = posM.y - posN.y;
        if(!horzSpan) dstP = posP.y - posM.y;
    /*--------------------------------------------------------------------------*/
        FxaaBool goodSpanN = (lumaEndN < 0.0) != lumaMLTZero;
        FxaaFloat spanLength = (dstP + dstN);
        FxaaBool goodSpanP = (lumaEndP < 0.0) != lumaMLTZero;
        FxaaFloat spanLengthRcp = 1.0/spanLength;
    /*--------------------------------------------------------------------------*/
        FxaaBool directionN = dstN < dstP;
        FxaaFloat dst = min(dstN, dstP);
        FxaaBool goodSpan = directionN ? goodSpanN : goodSpanP;
        FxaaFloat subpixG = subpixF * subpixF;
        FxaaFloat pixelOffset = (dst * (-spanLengthRcp)) + 0.5;
        FxaaFloat subpixH = subpixG * fxaaQualitySubpix;
    /*--------------------------------------------------------------------------*/
        FxaaFloat pixelOffsetGood = goodSpan ? pixelOffset : 0.0;
        FxaaFloat pixelOffsetSubpix = max(pixelOffsetGood, subpixH);
        if(!horzSpan) posM.x += pixelOffsetSubpix * lengthSign;
        if( horzSpan) posM.y += pixelOffsetSubpix * lengthSign;
        #if (FXAA_DISCARD == 1)
            return FxaaTexTop(tex, posM);
        #else
            return FxaaFloat4(FxaaTexTop(tex, posM).xyz, lumaM);
        #endif
    }
    /*==========================================================================*/
    #endif

    void main() {
      gl_FragColor = FxaaPixelShader(
        vUv,
        vec4(0.0),
        tDiffuse,
        tDiffuse,
        tDiffuse,
        resolution,
        vec4(0.0),
        vec4(0.0),
        vec4(0.0),
        0.75,
        0.166,
        0.0833,
        0.0,
        0.0,
        0.0,
        vec4(0.0)
      );

      // TODO avoid querying texture twice for same texel
      gl_FragColor.a = texture2D(tDiffuse, vUv).a;
    }`};var hd=class{constructor(e,t){if(this.stage=e,this.debug=t,this.dummyColor=new ye,this.colors={backgroundColor:V.get(document.documentElement,"--backgroundColor"),outlineColor:V.get(document.documentElement,"--outlineColor"),outlineColorLight:V.get(document.documentElement,"--outlineColorLight"),rimColor:V.get(document.documentElement,"--rimColor"),shadowColor:V.get(document.documentElement,"--shadowColor"),worldColor1:V.get(document.documentElement,"--worldColor1"),worldColorLight1:V.get(document.documentElement,"--worldColorLight1")},this.outlineMaterialParams={verticesNormalMix:.08,rimThreshold:1,rimAmount:.25},this.outlinePassParams={resolutionScale:4,verticesNormalMix:.18,threshold:.035,outlineThickness:1,outlineBlend:.4,contourBlend:.65,sourceMix:1,effectMix:1,backgroundMix:1,rimIntensity:1,shadowIntensity:1},this.outlineMaterial=new ql({vertexColors:!0}),this.outlineMaterial.onBeforeCompile=n=>{n.uniforms.verticesNormalMix={value:this.outlineMaterialParams.verticesNormalMix},n.uniforms.rimThreshold={value:this.outlineMaterialParams.rimThreshold},n.uniforms.rimAmount={value:this.outlineMaterialParams.rimAmount},n.vertexShader=n.vertexShader.replace("void main() {",`
        varying vec3 vFixedNormal;
        varying vec3 vViewDir;

        void main() {
          vFixedNormal = normalize(normal);
          vViewDir = normalize(-(modelViewMatrix * vec4(position, 1.0)).xyz);
        `),n.fragmentShader=`
        precision highp float;
        uniform float verticesNormalMix;
        uniform float rimThreshold;
        uniform float rimAmount;
        varying vec3 vFixedNormal;
        varying vec3 vViewDir;
        vec3 black = vec3(0., 0., 0.);
        vec3 white = vec3(1., 1., 1.);
        vec3 red = vec3(1., 0., 0.);
        vec3 green = vec3(0., 1., 0.);
        vec3 blue = vec3(0., 0., 1.);
        vec3 pink = vec3(1., 0., 1.);
        vec3 yellow = vec3(1., 1., 0.);
        vec3 cyan = vec3(0., 1., 1.);
        vec3 ui1 = vec3(1., 0.5, 0.);
      `+n.fragmentShader,n.fragmentShader=n.fragmentShader.replace("#include <color_fragment>",""),n.fragmentShader=n.fragmentShader.replace("#include <opaque_fragment>",`#include <opaque_fragment>
        vec3 n = vFixedNormal;
        vec3 normalColor = vec3(.5 * (1. + n.x), .5 * (1. + n.y), .5 * (1. + n.z));

        float NdotL  = dot(normalize(normal), normalize(directionalLights[0].direction));
        float rimDot = 1. - dot(vViewDir, normal);
        float rimPower = clamp(rimDot * pow(NdotL, rimThreshold), 0., 1.);
        float rimColor = outgoingLight.r >= .95 ? rimPower - (1. - rimAmount) : .0;
        float lightColor = outgoingLight.r < .95 ? .0 : 1.;
        float shadowsColor = lightColor + clamp(rimColor, -0.05, 0.);

        float mixNormal = verticesNormalMix;

        if (vColor.rgb == black
         || vColor.rgb == red
         || vColor.rgb == green
         || vColor.rgb == blue
         || vColor.rgb == pink
         || vColor.rgb == yellow
         || vColor.rgb == cyan
         || vColor.rgb == ui1
        ) {
          mixNormal = 0.;
        }

        // World colors
        if (vColor.r == 0.0) { normalColor.r = 0.0; }
        if (vColor.g == 0.0) { normalColor.g = 0.0; }
        if (vColor.b == 0.0) { normalColor.b = 0.0; }
        if (vColor.r == 1.0) { normalColor.r = 1.0; }
        if (vColor.g == 1.0) { normalColor.g = 1.0; }
        if (vColor.b == 1.0) { normalColor.b = 1.0; }

        float depth = (gl_FragCoord.w) * 10.;

        mixNormal = clamp(mixNormal * depth, 0., verticesNormalMix);

        vec3 diffuse = mix(vColor.rgb, normalColor, mixNormal);
        gl_FragColor = vec4(diffuse, shadowsColor);
        `),this.outlineMaterial.userData.shader=n},this.outlinePassColors={backgroundColor:this.colors.backgroundColor,outlineColor:this.colors.outlineColor,rimColor:this.colors.rimColor,shadowColor:this.colors.shadowColor,worldColor1:this.colors.worldColor1},this.outlineShaderMaterial=new Nt({vertexShader:cd.vertex,fragmentShader:cd.fragment,transparent:!0,uniforms:{tDiffuse:new Oe(null),resolutionScale:new Oe(this.outlinePassParams.resolutionScale),resolution:new Oe(new Re(e.width*this.outlinePassParams.resolutionScale,e.height*this.outlinePassParams.resolutionScale)),threshold:new Oe(this.outlinePassParams.threshold),outlineThickness:new Oe(this.outlinePassParams.outlineThickness),outlineBlend:new Oe(this.outlinePassParams.outlineBlend),contourBlend:new Oe(this.outlinePassParams.contourBlend),sourceMix:new Oe(this.outlinePassParams.sourceMix),effectMix:new Oe(this.outlinePassParams.effectMix),backgroundMix:new Oe(this.outlinePassParams.backgroundMix),backgroundColor:new Oe(new ye(this.outlinePassColors.backgroundColor)),outlineColor:new Oe(new ye(this.outlinePassColors.outlineColor)),rimColor:new Oe(new ye(this.outlinePassColors.rimColor)),rimIntensity:new Oe(this.outlinePassParams.rimIntensity),shadowColor:new Oe(new ye(this.outlinePassColors.shadowColor)),shadowIntensity:new Oe(this.outlinePassParams.shadowIntensity),worldColor1:new Oe(new ye(this.outlinePassColors.worldColor1))}}),this.updateDimensions(),this.debug.enabled){let r=function(o){s.uniforms[this._name].value=o},n=this.debug.gui.addFolder("Outlines");n.add(this.outlinePassParams,"resolutionScale",.25,16,.25).onChange(o=>{this.outlineShaderMaterial.uniforms.resolution.value.set(e.width*o,e.height*o)}),n.add(this.outlineMaterialParams,"verticesNormalMix",0,1,.01).onChange(o=>{this.outlineMaterial.userData.shader.uniforms.verticesNormalMix.value=o}),n.add(this.outlineMaterialParams,"rimThreshold",0,1,.01).onChange(o=>{this.outlineMaterial.userData.shader.uniforms.rimThreshold.value=o}),n.add(this.outlineMaterialParams,"rimAmount",0,1,.01).onChange(o=>{this.outlineMaterial.userData.shader.uniforms.rimAmount.value=o});let s=this.outlineShaderMaterial;n.add(this.outlineShaderMaterial.uniforms.threshold,"value",.001,.1,.001).name("threshold").onChange(r),n.add(this.outlineShaderMaterial.uniforms.outlineThickness,"value",.01,16,.01).name("outlineThickness").onChange(r),n.add(this.outlineShaderMaterial.uniforms.outlineBlend,"value",.01,1,.01).name("outlineBlend").onChange(r),n.add(this.outlineShaderMaterial.uniforms.contourBlend,"value",.01,1,.01).name("contourBlend").onChange(r),n.add(this.outlineShaderMaterial.uniforms.sourceMix,"value",0,1,.01).name("sourceMix").onChange(r),n.add(this.outlineShaderMaterial.uniforms.effectMix,"value",0,1,.01).name("effectMix").onChange(r),n.add(this.outlineShaderMaterial.uniforms.backgroundMix,"value",0,1,.01).name("backgroundMix").onChange(r),n.add(this.outlineShaderMaterial.uniforms.rimIntensity,"value",0,1,.01).name("rimIntensity").onChange(r),n.add(this.outlineShaderMaterial.uniforms.shadowIntensity,"value",0,1,.01).name("shadowIntensity").onChange(r);let a=this.debug.gui.addFolder("Colors");for(let o in this.outlinePassColors)a.addColor(this.outlinePassColors,o,this.outlinePassColors[o]).onChange(l=>{this.outlineShaderMaterial.uniforms[o].value=new ye(l),o==="backgroundColor"&&(document.body.style.backgroundColor=l,document.documentElement.style.backgroundColor=l)})}this.fxaaShaderMaterial=new Nt({vertexShader:ud.vertexShader,fragmentShader:ud.fragmentShader,uniforms:{tDiffuse:new Oe(null),resolutionScale:new Oe(1),resolution:new Oe(new Re(1/e.width,1/e.height))}})}get outlineColor(){return this.outlineShaderMaterial.uniforms.outlineColor.value.getStyle()}set outlineColor(e){this.outlineShaderMaterial.uniforms.outlineColor.value.setStyle(e)}get rimColor(){return this.outlineShaderMaterial.uniforms.rimColor.value.getStyle()}set rimColor(e){this.outlineShaderMaterial.uniforms.rimColor.value.setStyle(e)}get shadowColor(){return this.outlineShaderMaterial.uniforms.shadowColor.value.getStyle()}set shadowColor(e){this.outlineShaderMaterial.uniforms.shadowColor.value.setStyle(e)}get worldColor1(){return this.outlineShaderMaterial.uniforms.worldColor1.value.getStyle()}set worldColor1(e){this.outlineShaderMaterial.uniforms.worldColor1.value.setStyle(e)}get backgroundColor(){return this.outlineShaderMaterial.uniforms.backgroundColor.value.getStyle()}set backgroundColor(e){this.outlineShaderMaterial.uniforms.backgroundColor.value.setStyle(e),document.body.style.backgroundColor=e,document.documentElement.style.backgroundColor=e}updateDimensions(){this.outlineShaderMaterial.uniforms.resolution.value.set(this.stage.width*this.outlinePassParams.resolutionScale,this.stage.height*this.outlinePassParams.resolutionScale)}};function dd(i,e){if(e===du)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),i;if(e===Ur||e===Fa){let t=i.getIndex();if(t===null){let a=[],o=i.getAttribute("position");if(o!==void 0){for(let l=0;l<o.count;l++)a.push(l);i.setIndex(a),t=i.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),i}let n=t.count-2,s=[];if(e===Ur)for(let a=1;a<=n;a++)s.push(t.getX(0)),s.push(t.getX(a)),s.push(t.getX(a+1));else for(let a=0;a<n;a++)a%2==0?(s.push(t.getX(a)),s.push(t.getX(a+1)),s.push(t.getX(a+2))):(s.push(t.getX(a+2)),s.push(t.getX(a+1)),s.push(t.getX(a)));s.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");let r=i.clone();return r.setIndex(s),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),i}var fd=class extends Si{constructor(e){super(e);this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new Bg(t)}),this.register(function(t){return new Og(t)}),this.register(function(t){return new Qg(t)}),this.register(function(t){return new qg(t)}),this.register(function(t){return new jg(t)}),this.register(function(t){return new zg(t)}),this.register(function(t){return new Hg(t)}),this.register(function(t){return new Gg(t)}),this.register(function(t){return new Vg(t)}),this.register(function(t){return new Ng(t)}),this.register(function(t){return new Wg(t)}),this.register(function(t){return new kg(t)}),this.register(function(t){return new Yg(t)}),this.register(function(t){return new Xg(t)}),this.register(function(t){return new Fg(t)}),this.register(function(t){return new Zg(t)}),this.register(function(t){return new Kg(t)})}load(e,t,n,s){let r=this,a;if(this.resourcePath!=="")a=this.resourcePath;else if(this.path!==""){let c=Ps.extractUrlBase(e);a=Ps.resolveURL(c,this.path)}else a=Ps.extractUrlBase(e);this.manager.itemStart(e);let o=function(c){s?s(c):console.error(c),r.manager.itemError(e),r.manager.itemEnd(e)},l=new Ds(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{r.parse(c,a,function(u){t(u),r.manager.itemEnd(e)},o)}catch(u){o(u)}},n,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,s){let r,a={},o={},l=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===Jg){try{a[vt.KHR_BINARY_GLTF]=new e0(e)}catch(h){s&&s(h);return}r=JSON.parse(a[vt.KHR_BINARY_GLTF].content)}else r=JSON.parse(l.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){s&&s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let c=new o0(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let u=0;u<this.pluginCallbacks.length;u++){let h=this.pluginCallbacks[u](c);h.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[h.name]=h,a[h.name]=!0}if(r.extensionsUsed)for(let u=0;u<r.extensionsUsed.length;++u){let h=r.extensionsUsed[u],d=r.extensionsRequired||[];switch(h){case vt.KHR_MATERIALS_UNLIT:a[h]=new Ug;break;case vt.KHR_DRACO_MESH_COMPRESSION:a[h]=new t0(r,this.dracoLoader);break;case vt.KHR_TEXTURE_TRANSFORM:a[h]=new n0;break;case vt.KHR_MESH_QUANTIZATION:a[h]=new i0;break;default:d.indexOf(h)>=0&&o[h]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+h+'".')}}c.setExtensions(a),c.setPlugins(o),c.parse(n,s)}parseAsync(e,t){let n=this;return new Promise(function(s,r){n.parse(e,t,s,r)})}};function gE(){let i={};return{get:function(e){return i[e]},add:function(e,t){i[e]=t},remove:function(e){delete i[e]},removeAll:function(){i={}}}}var vt={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"},Fg=class{constructor(e){this.parser=e,this.name=vt.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let n=0,s=t.length;n<s;n++){let r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){let t=this.parser,n="light:"+e,s=t.cache.get(n);if(s)return s;let r=t.json,l=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e],c,u=new ye(16777215);l.color!==void 0&&u.setRGB(l.color[0],l.color[1],l.color[2],Wt);let h=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new ra(u),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new tc(u),c.distance=h;break;case"spot":c=new ec(u),c.distance=h,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),c.decay=2,ds(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),s=Promise.resolve(c),t.cache.add(n,s),s}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){let t=this,n=this.parser,r=n.json.nodes[e],o=(r.extensions&&r.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(l){return n._getNodeRef(t.cache,o,l)})}},Ug=class{constructor(){this.name=vt.KHR_MATERIALS_UNLIT}getMaterialType(){return ni}extendParams(e,t,n){let s=[];e.color=new ye(1,1,1),e.opacity=1;let r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){let a=r.baseColorFactor;e.color.setRGB(a[0],a[1],a[2],Wt),e.opacity=a[3]}r.baseColorTexture!==void 0&&s.push(n.assignTexture(e,"map",r.baseColorTexture,nt))}return Promise.all(s)}},Ng=class{constructor(e){this.parser=e,this.name=vt.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=s.extensions[this.name].emissiveStrength;return r!==void 0&&(t.emissiveIntensity=r),Promise.resolve()}},Bg=class{constructor(e){this.parser=e,this.name=vt.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Yn}extendMaterialParams(e,t){let n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],a=s.extensions[this.name];if(a.clearcoatFactor!==void 0&&(t.clearcoat=a.clearcoatFactor),a.clearcoatTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatMap",a.clearcoatTexture)),a.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=a.clearcoatRoughnessFactor),a.clearcoatRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatRoughnessMap",a.clearcoatRoughnessTexture)),a.clearcoatNormalTexture!==void 0&&(r.push(n.assignTexture(t,"clearcoatNormalMap",a.clearcoatNormalTexture)),a.clearcoatNormalTexture.scale!==void 0)){let o=a.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new Re(o,o)}return Promise.all(r)}},Og=class{constructor(e){this.parser=e,this.name=vt.KHR_MATERIALS_DISPERSION}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Yn}extendMaterialParams(e,t){let s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=s.extensions[this.name];return t.dispersion=r.dispersion!==void 0?r.dispersion:0,Promise.resolve()}},kg=class{constructor(e){this.parser=e,this.name=vt.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Yn}extendMaterialParams(e,t){let n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],a=s.extensions[this.name];return a.iridescenceFactor!==void 0&&(t.iridescence=a.iridescenceFactor),a.iridescenceTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceMap",a.iridescenceTexture)),a.iridescenceIor!==void 0&&(t.iridescenceIOR=a.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),a.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=a.iridescenceThicknessMinimum),a.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=a.iridescenceThicknessMaximum),a.iridescenceThicknessTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceThicknessMap",a.iridescenceThicknessTexture)),Promise.all(r)}},zg=class{constructor(e){this.parser=e,this.name=vt.KHR_MATERIALS_SHEEN}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Yn}extendMaterialParams(e,t){let n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[];t.sheenColor=new ye(0,0,0),t.sheenRoughness=0,t.sheen=1;let a=s.extensions[this.name];if(a.sheenColorFactor!==void 0){let o=a.sheenColorFactor;t.sheenColor.setRGB(o[0],o[1],o[2],Wt)}return a.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=a.sheenRoughnessFactor),a.sheenColorTexture!==void 0&&r.push(n.assignTexture(t,"sheenColorMap",a.sheenColorTexture,nt)),a.sheenRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"sheenRoughnessMap",a.sheenRoughnessTexture)),Promise.all(r)}},Hg=class{constructor(e){this.parser=e,this.name=vt.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Yn}extendMaterialParams(e,t){let n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],a=s.extensions[this.name];return a.transmissionFactor!==void 0&&(t.transmission=a.transmissionFactor),a.transmissionTexture!==void 0&&r.push(n.assignTexture(t,"transmissionMap",a.transmissionTexture)),Promise.all(r)}},Gg=class{constructor(e){this.parser=e,this.name=vt.KHR_MATERIALS_VOLUME}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Yn}extendMaterialParams(e,t){let n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],a=s.extensions[this.name];t.thickness=a.thicknessFactor!==void 0?a.thicknessFactor:0,a.thicknessTexture!==void 0&&r.push(n.assignTexture(t,"thicknessMap",a.thicknessTexture)),t.attenuationDistance=a.attenuationDistance||1/0;let o=a.attenuationColor||[1,1,1];return t.attenuationColor=new ye().setRGB(o[0],o[1],o[2],Wt),Promise.all(r)}},Vg=class{constructor(e){this.parser=e,this.name=vt.KHR_MATERIALS_IOR}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Yn}extendMaterialParams(e,t){let s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=s.extensions[this.name];return t.ior=r.ior!==void 0?r.ior:1.5,Promise.resolve()}},Wg=class{constructor(e){this.parser=e,this.name=vt.KHR_MATERIALS_SPECULAR}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Yn}extendMaterialParams(e,t){let n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],a=s.extensions[this.name];t.specularIntensity=a.specularFactor!==void 0?a.specularFactor:1,a.specularTexture!==void 0&&r.push(n.assignTexture(t,"specularIntensityMap",a.specularTexture));let o=a.specularColorFactor||[1,1,1];return t.specularColor=new ye().setRGB(o[0],o[1],o[2],Wt),a.specularColorTexture!==void 0&&r.push(n.assignTexture(t,"specularColorMap",a.specularColorTexture,nt)),Promise.all(r)}},Xg=class{constructor(e){this.parser=e,this.name=vt.EXT_MATERIALS_BUMP}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Yn}extendMaterialParams(e,t){let n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],a=s.extensions[this.name];return t.bumpScale=a.bumpFactor!==void 0?a.bumpFactor:1,a.bumpTexture!==void 0&&r.push(n.assignTexture(t,"bumpMap",a.bumpTexture)),Promise.all(r)}},Yg=class{constructor(e){this.parser=e,this.name=vt.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Yn}extendMaterialParams(e,t){let n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],a=s.extensions[this.name];return a.anisotropyStrength!==void 0&&(t.anisotropy=a.anisotropyStrength),a.anisotropyRotation!==void 0&&(t.anisotropyRotation=a.anisotropyRotation),a.anisotropyTexture!==void 0&&r.push(n.assignTexture(t,"anisotropyMap",a.anisotropyTexture)),Promise.all(r)}},Qg=class{constructor(e){this.parser=e,this.name=vt.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,n=t.json,s=n.textures[e];if(!s.extensions||!s.extensions[this.name])return null;let r=s.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,a)}},qg=class{constructor(e){this.parser=e,this.name=vt.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){let t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;let a=r.extensions[t],o=s.images[a.source],l=n.textureLoader;if(o.uri){let c=n.options.manager.getHandler(o.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return n.loadTextureImage(e,a.source,l);if(s.extensionsRequired&&s.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){let t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}},jg=class{constructor(e){this.parser=e,this.name=vt.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){let t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;let a=r.extensions[t],o=s.images[a.source],l=n.textureLoader;if(o.uri){let c=n.options.manager.getHandler(o.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return n.loadTextureImage(e,a.source,l);if(s.extensionsRequired&&s.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){let t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}},Zg=class{constructor(e){this.name=vt.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){let t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){let s=n.extensions[this.name],r=this.parser.getDependency("buffer",s.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(o){let l=s.byteOffset||0,c=s.byteLength||0,u=s.count,h=s.byteStride,d=new Uint8Array(o,l,c);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(u,h,d,s.mode,s.filter).then(function(p){return p.buffer}):a.ready.then(function(){let p=new ArrayBuffer(u*h);return a.decodeGltfBuffer(new Uint8Array(p),u,h,d,s.mode,s.filter),p})})}else return null}},Kg=class{constructor(e){this.name=vt.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;let s=t.meshes[n.mesh];for(let c of s.primitives)if(c.mode!==hi.TRIANGLES&&c.mode!==hi.TRIANGLE_STRIP&&c.mode!==hi.TRIANGLE_FAN&&c.mode!==void 0)return null;let a=n.extensions[this.name].attributes,o=[],l={};for(let c in a)o.push(this.parser.getDependency("accessor",a[c]).then(u=>(l[c]=u,l[c])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(c=>{let u=c.pop(),h=u.isGroup?u.children:[u],d=c[0].count,p=[];for(let g of h){let v=new Ze,m=new k,f=new Hn,x=new k(1,1,1),_=new Ol(g.geometry,g.material,d);for(let y=0;y<d;y++)l.TRANSLATION&&m.fromBufferAttribute(l.TRANSLATION,y),l.ROTATION&&f.fromBufferAttribute(l.ROTATION,y),l.SCALE&&x.fromBufferAttribute(l.SCALE,y),_.setMatrixAt(y,v.compose(m,f,x));for(let y in l)if(y==="_COLOR_0"){let T=l[y];_.instanceColor=new ur(T.array,T.itemSize,T.normalized)}else y!=="TRANSLATION"&&y!=="ROTATION"&&y!=="SCALE"&&g.geometry.setAttribute(y,l[y]);Rt.prototype.copy.call(_,g),this.parser.assignFinalMaterial(_),p.push(_)}return u.isGroup?(u.clear(),u.add(...p),u):p[0]}))}},Jg="glTF",go=12,$g={JSON:1313821514,BIN:5130562},e0=class{constructor(e){this.name=vt.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,go),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Jg)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");let s=this.header.length-go,r=new DataView(e,go),a=0;for(;a<s;){let o=r.getUint32(a,!0);a+=4;let l=r.getUint32(a,!0);if(a+=4,l===$g.JSON){let c=new Uint8Array(e,go+a,o);this.content=n.decode(c)}else if(l===$g.BIN){let c=go+a;this.body=e.slice(c,c+o)}a+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}},t0=class{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=vt.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let n=this.json,s=this.dracoLoader,r=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},l={},c={};for(let u in a){let h=gd[u]||u.toLowerCase();o[h]=a[u]}for(let u in e.attributes){let h=gd[u]||u.toLowerCase();if(a[u]!==void 0){let d=n.accessors[e.attributes[u]],p=Sa[d.componentType];c[h]=p.name,l[h]=d.normalized===!0}}return t.getDependency("bufferView",r).then(function(u){return new Promise(function(h,d){s.decodeDracoFile(u,function(p){for(let g in p.attributes){let v=p.attributes[g],m=l[g];m!==void 0&&(v.normalized=m)}h(p)},o,c,Wt,d)})})}},n0=class{constructor(){this.name=vt.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}},i0=class{constructor(){this.name=vt.KHR_MESH_QUANTIZATION}},pd=class extends ws{constructor(e,t,n,s){super(e,t,n,s)}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s*3+s;for(let a=0;a!==s;a++)t[a]=n[r+a];return t}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=o*2,c=o*3,u=s-t,h=(n-t)/u,d=h*h,p=d*h,g=e*c,v=g-c,m=-2*p+3*d,f=p-d,x=1-m,_=f-d+h;for(let y=0;y!==o;y++){let T=a[v+y+o],M=a[v+y+l]*u,R=a[g+y+o],C=a[g+y]*u;r[y]=x*T+_*M+m*R+f*C}return r}},vE=new Hn,s0=class extends pd{interpolate_(e,t,n,s){let r=super.interpolate_(e,t,n,s);return vE.fromArray(r).normalize().toArray(r),r}},hi={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},Sa={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},r0={9728:mn,9729:$t,9984:Do,9985:Ir,9986:Zs,9987:pi},a0={33071:Ri,33648:Pr,10497:xs},md={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},gd={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},ks={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},xE={CUBICSPLINE:void 0,LINEAR:$s,STEP:Js},vd={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function yE(i){return i.DefaultMaterial===void 0&&(i.DefaultMaterial=new na({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Bn})),i.DefaultMaterial}function Tr(i,e,t){for(let n in t.extensions)i[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function ds(i,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(i.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function AE(i,e,t){let n=!1,s=!1,r=!1;for(let c=0,u=e.length;c<u;c++){let h=e[c];if(h.POSITION!==void 0&&(n=!0),h.NORMAL!==void 0&&(s=!0),h.COLOR_0!==void 0&&(r=!0),n&&s&&r)break}if(!n&&!s&&!r)return Promise.resolve(i);let a=[],o=[],l=[];for(let c=0,u=e.length;c<u;c++){let h=e[c];if(n){let d=h.POSITION!==void 0?t.getDependency("accessor",h.POSITION):i.attributes.position;a.push(d)}if(s){let d=h.NORMAL!==void 0?t.getDependency("accessor",h.NORMAL):i.attributes.normal;o.push(d)}if(r){let d=h.COLOR_0!==void 0?t.getDependency("accessor",h.COLOR_0):i.attributes.color;l.push(d)}}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(l)]).then(function(c){let u=c[0],h=c[1],d=c[2];return n&&(i.morphAttributes.position=u),s&&(i.morphAttributes.normal=h),r&&(i.morphAttributes.color=d),i.morphTargetsRelative=!0,i})}function _E(i,e){if(i.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)i.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){let t=e.extras.targetNames;if(i.morphTargetInfluences.length===t.length){i.morphTargetDictionary={};for(let n=0,s=t.length;n<s;n++)i.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function SE(i){let e,t=i.extensions&&i.extensions[vt.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+xd(t.attributes):e=i.indices+":"+xd(i.attributes)+":"+i.mode,i.targets!==void 0)for(let n=0,s=i.targets.length;n<s;n++)e+=":"+xd(i.targets[n]);return e}function xd(i){let e="",t=Object.keys(i).sort();for(let n=0,s=t.length;n<s;n++)e+=t[n]+":"+i[t[n]]+";";return e}function yd(i){switch(i){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function bE(i){return i.search(/\.jpe?g($|\?)/i)>0||i.search(/^data\:image\/jpeg/)===0?"image/jpeg":i.search(/\.webp($|\?)/i)>0||i.search(/^data\:image\/webp/)===0?"image/webp":i.search(/\.ktx2($|\?)/i)>0||i.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}var EE=new Ze,o0=class{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new gE,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,s=-1,r=!1,a=-1;if(typeof navigator!="undefined"){let o=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(o)===!0;let l=o.match(/Version\/(\d+)/);s=n&&l?parseInt(l[1],10):-1,r=o.indexOf("Firefox")>-1,a=r?o.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap=="undefined"||n&&s<17||r&&a<98?this.textureLoader=new Jl(this.options.manager):this.textureLoader=new ic(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Ds(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let n=this,s=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(a){let o={scene:a[0][s.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:s.asset,parser:n,userData:{}};return Tr(r,o,s),ds(o,s),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(o)})).then(function(){for(let l of o.scenes)l.updateMatrixWorld();e(o)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let s=0,r=t.length;s<r;s++){let a=t[s].joints;for(let o=0,l=a.length;o<l;o++)e[a[o]].isBone=!0}for(let s=0,r=e.length;s<r;s++){let a=e[s];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(n[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;let s=n.clone(),r=(a,o)=>{let l=this.associations.get(a);l!=null&&this.associations.set(o,l);for(let[c,u]of a.children.entries())r(u,o.children[c])};return r(n,s),s.name+="_instance_"+e.uses[t]++,s}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){let s=e(t[n]);if(s)return s}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let n=[];for(let s=0;s<t.length;s++){let r=e(t[s]);r&&n.push(r)}return n}getDependency(e,t){let n=e+":"+t,s=this.cache.get(n);if(!s){switch(e){case"scene":s=this.loadScene(t);break;case"node":s=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":s=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":s=this.loadAccessor(t);break;case"bufferView":s=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":s=this.loadBuffer(t);break;case"material":s=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":s=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":s=this.loadSkin(t);break;case"animation":s=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":s=this.loadCamera(t);break;default:if(s=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!s)throw new Error("Unknown type: "+e);break}this.cache.add(n,s)}return s}getDependencies(e){let t=this.cache.get(e);if(!t){let n=this,s=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(s.map(function(r,a){return n.getDependency(e,a)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[vt.KHR_BINARY_GLTF].body);let s=this.options;return new Promise(function(r,a){n.load(Ps.resolveURL(t.uri,s.path),r,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){let s=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+s)})}loadAccessor(e){let t=this,n=this.json,s=this.json.accessors[e];if(s.bufferView===void 0&&s.sparse===void 0){let a=md[s.type],o=Sa[s.componentType],l=s.normalized===!0,c=new o(s.count*a);return Promise.resolve(new Gt(c,a,l))}let r=[];return s.bufferView!==void 0?r.push(this.getDependency("bufferView",s.bufferView)):r.push(null),s.sparse!==void 0&&(r.push(this.getDependency("bufferView",s.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",s.sparse.values.bufferView))),Promise.all(r).then(function(a){let o=a[0],l=md[s.type],c=Sa[s.componentType],u=c.BYTES_PER_ELEMENT,h=u*l,d=s.byteOffset||0,p=s.bufferView!==void 0?n.bufferViews[s.bufferView].byteStride:void 0,g=s.normalized===!0,v,m;if(p&&p!==h){let f=Math.floor(d/p),x="InterleavedBuffer:"+s.bufferView+":"+s.componentType+":"+f+":"+s.count,_=t.cache.get(x);_||(v=new c(o,f*p,s.count*p/u),_=new Wa(v,p/u),t.cache.add(x,_)),m=new cr(_,l,d%p/u,g)}else o===null?v=new c(s.count*l):v=new c(o,d,s.count*l),m=new Gt(v,l,g);if(s.sparse!==void 0){let f=md.SCALAR,x=Sa[s.sparse.indices.componentType],_=s.sparse.indices.byteOffset||0,y=s.sparse.values.byteOffset||0,T=new x(a[1],_,s.sparse.count*f),M=new c(a[2],y,s.sparse.count*l);o!==null&&(m=new Gt(m.array.slice(),m.itemSize,m.normalized)),m.normalized=!1;for(let R=0,C=T.length;R<C;R++){let b=T[R];if(m.setX(b,M[R*l]),l>=2&&m.setY(b,M[R*l+1]),l>=3&&m.setZ(b,M[R*l+2]),l>=4&&m.setW(b,M[R*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}m.normalized=g}return m})}loadTexture(e){let t=this.json,n=this.options,r=t.textures[e].source,a=t.images[r],o=this.textureLoader;if(a.uri){let l=n.manager.getHandler(a.uri);l!==null&&(o=l)}return this.loadTextureImage(e,r,o)}loadTextureImage(e,t,n){let s=this,r=this.json,a=r.textures[e],o=r.images[t],l=(o.uri||o.bufferView)+":"+a.sampler;if(this.textureCache[l])return this.textureCache[l];let c=this.loadImageSource(t,n).then(function(u){u.flipY=!1,u.name=a.name||o.name||"",u.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(u.name=o.uri);let d=(r.samplers||{})[a.sampler]||{};return u.magFilter=r0[d.magFilter]||$t,u.minFilter=r0[d.minFilter]||pi,u.wrapS=a0[d.wrapS]||xs,u.wrapT=a0[d.wrapT]||xs,u.generateMipmaps=!u.isCompressedTexture&&u.minFilter!==mn&&u.minFilter!==$t,s.associations.set(u,{textures:e}),u}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){let n=this,s=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(h=>h.clone());let a=s.images[e],o=self.URL||self.webkitURL,l=a.uri||"",c=!1;if(a.bufferView!==void 0)l=n.getDependency("bufferView",a.bufferView).then(function(h){c=!0;let d=new Blob([h],{type:a.mimeType});return l=o.createObjectURL(d),l});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");let u=Promise.resolve(l).then(function(h){return new Promise(function(d,p){let g=d;t.isImageBitmapLoader===!0&&(g=function(v){let m=new zt(v);m.needsUpdate=!0,d(m)}),t.load(Ps.resolveURL(h,r.path),g,void 0,p)})}).then(function(h){return c===!0&&o.revokeObjectURL(l),ds(h,a),h.userData.mimeType=a.mimeType||bE(a.uri),h}).catch(function(h){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),h});return this.sourceCache[e]=u,u}assignTexture(e,t,n,s){let r=this;return this.getDependency("texture",n.index).then(function(a){if(!a)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(a=a.clone(),a.channel=n.texCoord),r.extensions[vt.KHR_TEXTURE_TRANSFORM]){let o=n.extensions!==void 0?n.extensions[vt.KHR_TEXTURE_TRANSFORM]:void 0;if(o){let l=r.associations.get(a);a=r.extensions[vt.KHR_TEXTURE_TRANSFORM].extendTexture(a,o),r.associations.set(a,l)}}return s!==void 0&&(a.colorSpace=s),e[t]=a,a})}assignFinalMaterial(e){let t=e.geometry,n=e.material,s=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){let o="PointsMaterial:"+n.uuid,l=this.cache.get(o);l||(l=new Za,un.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,l.sizeAttenuation=!1,this.cache.add(o,l)),n=l}else if(e.isLine){let o="LineBasicMaterial:"+n.uuid,l=this.cache.get(o);l||(l=new Ts,un.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,this.cache.add(o,l)),n=l}if(s||r||a){let o="ClonedMaterial:"+n.uuid+":";s&&(o+="derivative-tangents:"),r&&(o+="vertex-colors:"),a&&(o+="flat-shading:");let l=this.cache.get(o);l||(l=n.clone(),r&&(l.vertexColors=!0),a&&(l.flatShading=!0),s&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(o,l),this.associations.set(l,this.associations.get(n))),n=l}e.material=n}getMaterialType(){return na}loadMaterial(e){let t=this,n=this.json,s=this.extensions,r=n.materials[e],a,o={},l=r.extensions||{},c=[];if(l[vt.KHR_MATERIALS_UNLIT]){let h=s[vt.KHR_MATERIALS_UNLIT];a=h.getMaterialType(),c.push(h.extendParams(o,r,t))}else{let h=r.pbrMetallicRoughness||{};if(o.color=new ye(1,1,1),o.opacity=1,Array.isArray(h.baseColorFactor)){let d=h.baseColorFactor;o.color.setRGB(d[0],d[1],d[2],Wt),o.opacity=d[3]}h.baseColorTexture!==void 0&&c.push(t.assignTexture(o,"map",h.baseColorTexture,nt)),o.metalness=h.metallicFactor!==void 0?h.metallicFactor:1,o.roughness=h.roughnessFactor!==void 0?h.roughnessFactor:1,h.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(o,"metalnessMap",h.metallicRoughnessTexture)),c.push(t.assignTexture(o,"roughnessMap",h.metallicRoughnessTexture))),a=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,o)})))}r.doubleSided===!0&&(o.side=pn);let u=r.alphaMode||vd.OPAQUE;if(u===vd.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,u===vd.MASK&&(o.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&a!==ni&&(c.push(t.assignTexture(o,"normalMap",r.normalTexture)),o.normalScale=new Re(1,1),r.normalTexture.scale!==void 0)){let h=r.normalTexture.scale;o.normalScale.set(h,h)}if(r.occlusionTexture!==void 0&&a!==ni&&(c.push(t.assignTexture(o,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&a!==ni){let h=r.emissiveFactor;o.emissive=new ye().setRGB(h[0],h[1],h[2],Wt)}return r.emissiveTexture!==void 0&&a!==ni&&c.push(t.assignTexture(o,"emissiveMap",r.emissiveTexture,nt)),Promise.all(c).then(function(){let h=new a(o);return r.name&&(h.name=r.name),ds(h,r),t.associations.set(h,{materials:e}),r.extensions&&Tr(s,h,r),h})}createUniqueName(e){let t=wt.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,n=this.extensions,s=this.primitiveCache;function r(o){return n[vt.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(l){return l0(l,o,t)})}let a=[];for(let o=0,l=e.length;o<l;o++){let c=e[o],u=SE(c),h=s[u];if(h)a.push(h.promise);else{let d;c.extensions&&c.extensions[vt.KHR_DRACO_MESH_COMPRESSION]?d=r(c):d=l0(new Yt,c,t),s[u]={primitive:c,promise:d},a.push(d)}}return Promise.all(a)}loadMesh(e){let t=this,n=this.json,s=this.extensions,r=n.meshes[e],a=r.primitives,o=[];for(let l=0,c=a.length;l<c;l++){let u=a[l].material===void 0?yE(this.cache):this.getDependency("material",a[l].material);o.push(u)}return o.push(t.loadGeometries(a)),Promise.all(o).then(function(l){let c=l.slice(0,l.length-1),u=l[l.length-1],h=[];for(let p=0,g=u.length;p<g;p++){let v=u[p],m=a[p],f,x=c[p];if(m.mode===hi.TRIANGLES||m.mode===hi.TRIANGLE_STRIP||m.mode===hi.TRIANGLE_FAN||m.mode===void 0)f=r.isSkinnedMesh===!0?new Ul(v,x):new Qt(v,x),f.isSkinnedMesh===!0&&f.normalizeSkinWeights(),m.mode===hi.TRIANGLE_STRIP?f.geometry=dd(f.geometry,Fa):m.mode===hi.TRIANGLE_FAN&&(f.geometry=dd(f.geometry,Ur));else if(m.mode===hi.LINES)f=new Jr(v,x);else if(m.mode===hi.LINE_STRIP)f=new Ms(v,x);else if(m.mode===hi.LINE_LOOP)f=new Wl(v,x);else if(m.mode===hi.POINTS)f=new Ql(v,x);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(f.geometry.morphAttributes).length>0&&_E(f,r),f.name=t.createUniqueName(r.name||"mesh_"+e),ds(f,r),m.extensions&&Tr(s,f,m),t.assignFinalMaterial(f),h.push(f)}for(let p=0,g=h.length;p<g;p++)t.associations.set(h[p],{meshes:e,primitives:p});if(h.length===1)return r.extensions&&Tr(s,h[0],r),h[0];let d=new ft;r.extensions&&Tr(s,d,r),t.associations.set(d,{meshes:e});for(let p=0,g=h.length;p<g;p++)d.add(h[p]);return d})}loadCamera(e){let t,n=this.json.cameras[e],s=n[n.type];if(!s){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new qt(xu.radToDeg(s.yfov),s.aspectRatio||1,s.znear||1,s.zfar||2e6):n.type==="orthographic"&&(t=new sa(-s.xmag,s.xmag,s.ymag,-s.ymag,s.znear,s.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),ds(t,n),Promise.resolve(t)}loadSkin(e){let t=this.json.skins[e],n=[];for(let s=0,r=t.joints.length;s<r;s++)n.push(this._loadNodeShallow(t.joints[s]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(s){let r=s.pop(),a=s,o=[],l=[];for(let c=0,u=a.length;c<u;c++){let h=a[c];if(h){o.push(h);let d=new Ze;r!==null&&d.fromArray(r.array,c*16),l.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new Zr(o,l)})}loadAnimation(e){let t=this.json,n=this,s=t.animations[e],r=s.name?s.name:"animation_"+e,a=[],o=[],l=[],c=[],u=[];for(let h=0,d=s.channels.length;h<d;h++){let p=s.channels[h],g=s.samplers[p.sampler],v=p.target,m=v.node,f=s.parameters!==void 0?s.parameters[g.input]:g.input,x=s.parameters!==void 0?s.parameters[g.output]:g.output;v.node!==void 0&&(a.push(this.getDependency("node",m)),o.push(this.getDependency("accessor",f)),l.push(this.getDependency("accessor",x)),c.push(g),u.push(v))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(l),Promise.all(c),Promise.all(u)]).then(function(h){let d=h[0],p=h[1],g=h[2],v=h[3],m=h[4],f=[];for(let x=0,_=d.length;x<_;x++){let y=d[x],T=p[x],M=g[x],R=v[x],C=m[x];if(y===void 0)continue;y.updateMatrix&&y.updateMatrix();let b=n._createAnimationTracks(y,T,M,R,C);if(b)for(let S=0;S<b.length;S++)f.push(b[S])}return new Kl(r,void 0,f)})}createNodeMesh(e){let t=this.json,n=this,s=t.nodes[e];return s.mesh===void 0?null:n.getDependency("mesh",s.mesh).then(function(r){let a=n._getNodeRef(n.meshCache,s.mesh,r);return s.weights!==void 0&&a.traverse(function(o){if(!!o.isMesh)for(let l=0,c=s.weights.length;l<c;l++)o.morphTargetInfluences[l]=s.weights[l]}),a})}loadNode(e){let t=this.json,n=this,s=t.nodes[e],r=n._loadNodeShallow(e),a=[],o=s.children||[];for(let c=0,u=o.length;c<u;c++)a.push(n.getDependency("node",o[c]));let l=s.skin===void 0?Promise.resolve(null):n.getDependency("skin",s.skin);return Promise.all([r,Promise.all(a),l]).then(function(c){let u=c[0],h=c[1],d=c[2];d!==null&&u.traverse(function(p){!p.isSkinnedMesh||p.bind(d,EE)});for(let p=0,g=h.length;p<g;p++)u.add(h[p]);return u})}_loadNodeShallow(e){let t=this.json,n=this.extensions,s=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let r=t.nodes[e],a=r.name?s.createUniqueName(r.name):"",o=[],l=s._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&o.push(l),r.camera!==void 0&&o.push(s.getDependency("camera",r.camera).then(function(c){return s._getNodeRef(s.cameraCache,r.camera,c)})),s._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){o.push(c)}),this.nodeCache[e]=Promise.all(o).then(function(c){let u;if(r.isBone===!0?u=new Xa:c.length>1?u=new ft:c.length===1?u=c[0]:u=new Rt,u!==c[0])for(let h=0,d=c.length;h<d;h++)u.add(c[h]);if(r.name&&(u.userData.name=r.name,u.name=a),ds(u,r),r.extensions&&Tr(n,u,r),r.matrix!==void 0){let h=new Ze;h.fromArray(r.matrix),u.applyMatrix4(h)}else r.translation!==void 0&&u.position.fromArray(r.translation),r.rotation!==void 0&&u.quaternion.fromArray(r.rotation),r.scale!==void 0&&u.scale.fromArray(r.scale);return s.associations.has(u)||s.associations.set(u,{}),s.associations.get(u).nodes=e,u}),this.nodeCache[e]}loadScene(e){let t=this.extensions,n=this.json.scenes[e],s=this,r=new ft;n.name&&(r.name=s.createUniqueName(n.name)),ds(r,n),n.extensions&&Tr(t,r,n);let a=n.nodes||[],o=[];for(let l=0,c=a.length;l<c;l++)o.push(s.getDependency("node",a[l]));return Promise.all(o).then(function(l){for(let u=0,h=l.length;u<h;u++)r.add(l[u]);let c=u=>{let h=new Map;for(let[d,p]of s.associations)(d instanceof un||d instanceof zt)&&h.set(d,p);return u.traverse(d=>{let p=s.associations.get(d);p!=null&&h.set(d,p)}),h};return s.associations=c(r),r})}_createAnimationTracks(e,t,n,s,r){let a=[],o=e.name?e.name:e.uuid,l=[];ks[r.path]===ks.weights?e.traverse(function(d){d.morphTargetInfluences&&l.push(d.name?d.name:d.uuid)}):l.push(o);let c;switch(ks[r.path]){case ks.weights:c=$i;break;case ks.rotation:c=es;break;case ks.position:case ks.scale:c=ts;break;default:switch(n.itemSize){case 1:c=$i;break;case 2:case 3:default:c=ts;break}break}let u=s.interpolation!==void 0?xE[s.interpolation]:$s,h=this._getArrayFromAccessor(n);for(let d=0,p=l.length;d<p;d++){let g=new c(l[d]+"."+ks[r.path],t.array,h,u);s.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(g),a.push(g)}return a}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let n=yd(t.constructor),s=new Float32Array(t.length);for(let r=0,a=t.length;r<a;r++)s[r]=t[r]*n;t=s}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){let s=this instanceof es?s0:pd;return new s(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}};function TE(i,e,t){let n=e.attributes,s=new ei;if(n.POSITION!==void 0){let o=t.json.accessors[n.POSITION],l=o.min,c=o.max;if(l!==void 0&&c!==void 0){if(s.set(new k(l[0],l[1],l[2]),new k(c[0],c[1],c[2])),o.normalized){let u=yd(Sa[o.componentType]);s.min.multiplyScalar(u),s.max.multiplyScalar(u)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let r=e.targets;if(r!==void 0){let o=new k,l=new k;for(let c=0,u=r.length;c<u;c++){let h=r[c];if(h.POSITION!==void 0){let d=t.json.accessors[h.POSITION],p=d.min,g=d.max;if(p!==void 0&&g!==void 0){if(l.setX(Math.max(Math.abs(p[0]),Math.abs(g[0]))),l.setY(Math.max(Math.abs(p[1]),Math.abs(g[1]))),l.setZ(Math.max(Math.abs(p[2]),Math.abs(g[2]))),d.normalized){let v=yd(Sa[d.componentType]);l.multiplyScalar(v)}o.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}s.expandByVector(o)}i.boundingBox=s;let a=new Gn;s.getCenter(a.center),a.radius=s.min.distanceTo(s.max)/2,i.boundingSphere=a}function l0(i,e,t){let n=e.attributes,s=[];function r(a,o){return t.getDependency("accessor",a).then(function(l){i.setAttribute(o,l)})}for(let a in n){let o=gd[a]||a.toLowerCase();o in i.attributes||s.push(r(n[a],o))}if(e.indices!==void 0&&!i.index){let a=t.getDependency("accessor",e.indices).then(function(o){i.setIndex(o)});s.push(a)}return pt.workingColorSpace!==Wt&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${pt.workingColorSpace}" not supported.`),ds(i,e),TE(i,e,t),Promise.all(s).then(function(){return e.targets!==void 0?AE(i,e.targets,t):i})}var Ad=new WeakMap,_d=class extends Si{constructor(e){super(e);this.decoderPath="",this.decoderConfig={},this.decoderBinary=null,this.decoderPending=null,this.workerLimit=4,this.workerPool=[],this.workerNextTaskID=1,this.workerSourceURL="",this.defaultAttributeIDs={position:"POSITION",normal:"NORMAL",color:"COLOR",uv:"TEX_COORD"},this.defaultAttributeTypes={position:"Float32Array",normal:"Float32Array",color:"Float32Array",uv:"Float32Array"}}setDecoderPath(e){return this.decoderPath=e,this}setDecoderConfig(e){return this.decoderConfig=e,this}setWorkerLimit(e){return this.workerLimit=e,this}load(e,t,n,s){let r=new Ds(this.manager);r.setPath(this.path),r.setResponseType("arraybuffer"),r.setRequestHeader(this.requestHeader),r.setWithCredentials(this.withCredentials),r.load(e,a=>{this.parse(a,t,s)},n,s)}parse(e,t,n=()=>{}){this.decodeDracoFile(e,t,null,null,nt,n).catch(n)}decodeDracoFile(e,t,n,s,r=Wt,a=()=>{}){let o={attributeIDs:n||this.defaultAttributeIDs,attributeTypes:s||this.defaultAttributeTypes,useUniqueIDs:!!n,vertexColorSpace:r};return this.decodeGeometry(e,o).then(t).catch(a)}decodeGeometry(e,t){let n=JSON.stringify(t);if(Ad.has(e)){let l=Ad.get(e);if(l.key===n)return l.promise;if(e.byteLength===0)throw new Error("THREE.DRACOLoader: Unable to re-decode a buffer with different settings. Buffer has already been transferred.")}let s,r=this.workerNextTaskID++,a=e.byteLength,o=this._getWorker(r,a).then(l=>(s=l,new Promise((c,u)=>{s._callbacks[r]={resolve:c,reject:u},s.postMessage({type:"decode",id:r,taskConfig:t,buffer:e},[e])}))).then(l=>this._createGeometry(l.geometry));return o.catch(()=>!0).then(()=>{s&&r&&this._releaseTask(s,r)}),Ad.set(e,{key:n,promise:o}),o}_createGeometry(e){let t=new Yt;e.index&&t.setIndex(new Gt(e.index.array,1));for(let n=0;n<e.attributes.length;n++){let s=e.attributes[n],r=s.name,a=s.array,o=s.itemSize,l=new Gt(a,o);r==="color"&&(this._assignVertexColorSpace(l,s.vertexColorSpace),l.normalized=!(a instanceof Float32Array)),t.setAttribute(r,l)}return t}_assignVertexColorSpace(e,t){if(t!==nt)return;let n=new ye;for(let s=0,r=e.count;s<r;s++)n.fromBufferAttribute(e,s),pt.toWorkingColorSpace(n,nt),e.setXYZ(s,n.r,n.g,n.b)}_loadLibrary(e,t){let n=new Ds(this.manager);return n.setPath(this.decoderPath),n.setResponseType(t),n.setWithCredentials(this.withCredentials),new Promise((s,r)=>{n.load(e,s,void 0,r)})}preload(){return this._initDecoder(),this}_initDecoder(){if(this.decoderPending)return this.decoderPending;let e=typeof WebAssembly!="object"||this.decoderConfig.type==="js",t=[];return e?t.push(this._loadLibrary("draco_decoder.js","text")):(t.push(this._loadLibrary("draco_wasm_wrapper.js","text")),t.push(this._loadLibrary("draco_decoder.wasm","arraybuffer"))),this.decoderPending=Promise.all(t).then(n=>{let s=n[0];e||(this.decoderConfig.wasmBinary=n[1]);let r=ME.toString(),a=["/* draco decoder */",s,"","/* worker */",r.substring(r.indexOf("{")+1,r.lastIndexOf("}"))].join(`
`);this.workerSourceURL=URL.createObjectURL(new Blob([a]))}),this.decoderPending}_getWorker(e,t){return this._initDecoder().then(()=>{if(this.workerPool.length<this.workerLimit){let s=new Worker(this.workerSourceURL);s._callbacks={},s._taskCosts={},s._taskLoad=0,s.postMessage({type:"init",decoderConfig:this.decoderConfig}),s.onmessage=function(r){let a=r.data;switch(a.type){case"decode":s._callbacks[a.id].resolve(a);break;case"error":s._callbacks[a.id].reject(a);break;default:console.error('THREE.DRACOLoader: Unexpected message, "'+a.type+'"')}},this.workerPool.push(s)}else this.workerPool.sort(function(s,r){return s._taskLoad>r._taskLoad?-1:1});let n=this.workerPool[this.workerPool.length-1];return n._taskCosts[e]=t,n._taskLoad+=t,n})}_releaseTask(e,t){e._taskLoad-=e._taskCosts[t],delete e._callbacks[t],delete e._taskCosts[t]}debug(){console.log("Task load: ",this.workerPool.map(e=>e._taskLoad))}dispose(){for(let e=0;e<this.workerPool.length;++e)this.workerPool[e].terminate();return this.workerPool.length=0,this.workerSourceURL!==""&&URL.revokeObjectURL(this.workerSourceURL),this}};function ME(){let i,e;onmessage=function(a){let o=a.data;switch(o.type){case"init":i=o.decoderConfig,e=new Promise(function(u){i.onModuleLoaded=function(h){u({draco:h})},DracoDecoderModule(i)});break;case"decode":let l=o.buffer,c=o.taskConfig;e.then(u=>{let h=u.draco,d=new h.Decoder;try{let p=t(h,d,new Int8Array(l),c),g=p.attributes.map(v=>v.array.buffer);p.index&&g.push(p.index.array.buffer),self.postMessage({type:"decode",id:o.id,geometry:p},g)}catch(p){console.error(p),self.postMessage({type:"error",id:o.id,error:p.message})}finally{h.destroy(d)}});break}};function t(a,o,l,c){let u=c.attributeIDs,h=c.attributeTypes,d,p,g=o.GetEncodedGeometryType(l);if(g===a.TRIANGULAR_MESH)d=new a.Mesh,p=o.DecodeArrayToMesh(l,l.byteLength,d);else if(g===a.POINT_CLOUD)d=new a.PointCloud,p=o.DecodeArrayToPointCloud(l,l.byteLength,d);else throw new Error("THREE.DRACOLoader: Unexpected geometry type.");if(!p.ok()||d.ptr===0)throw new Error("THREE.DRACOLoader: Decoding failed: "+p.error_msg());let v={index:null,attributes:[]};for(let m in u){let f=self[h[m]],x,_;if(c.useUniqueIDs)_=u[m],x=o.GetAttributeByUniqueId(d,_);else{if(_=o.GetAttributeId(d,a[u[m]]),_===-1)continue;x=o.GetAttribute(d,_)}let y=s(a,o,d,m,f,x);m==="color"&&(y.vertexColorSpace=c.vertexColorSpace),v.attributes.push(y)}return g===a.TRIANGULAR_MESH&&(v.index=n(a,o,d)),a.destroy(d),v}function n(a,o,l){let u=l.num_faces()*3,h=u*4,d=a._malloc(h);o.GetTrianglesUInt32Array(l,h,d);let p=new Uint32Array(a.HEAPF32.buffer,d,u).slice();return a._free(d),{array:p,itemSize:1}}function s(a,o,l,c,u,h){let d=h.num_components(),g=l.num_points()*d,v=g*u.BYTES_PER_ELEMENT,m=r(a,u),f=a._malloc(v);o.GetAttributeDataArrayForAllPoints(l,h,m,v,f);let x=new u(a.HEAPF32.buffer,f,g).slice();return a._free(f),{name:c,array:x,itemSize:d}}function r(a,o){switch(o){case Float32Array:return a.DT_FLOAT32;case Int8Array:return a.DT_INT8;case Int16Array:return a.DT_INT16;case Int32Array:return a.DT_INT32;case Uint8Array:return a.DT_UINT8;case Uint16Array:return a.DT_UINT16;case Uint32Array:return a.DT_UINT32}}}var wE=new Ka,c0=new fd(wE),u0=new _d;u0.setDecoderPath("./assets/draco/");c0.setDRACOLoader(u0);function CE(i){return new Promise((e,t)=>{c0.load(i,n=>{let s=n.scene.children[0];s?e(s.geometry):t(new Error(`GLTF model ${i} doesn't contain a valid scene`))},void 0,t)})}async function h0(i){let e=Object.entries(i).map(([n,s])=>CE(s).then(r=>[n,r])),t=await Promise.all(e);return Object.fromEntries(t)}var d0=class{constructor(e){this.object3D=e,this._scale=1,this._opacity=1}handleVisibility(){let e=!(!this.opacity||!this._scale||!this.scaleX||!this.scaleY||!this.scaleZ);return this.object3D.visible=e,e}get x(){return this.object3D.position.x}set x(e){this.object3D.position.x=e}get y(){return this.object3D.position.y}set y(e){this.object3D.position.y=e}get z(){return this.object3D.position.z}set z(e){this.object3D.position.z=e}get rotateX(){return V.radToDeg(this.object3D.rotation.x)}set rotateX(e){this.object3D.rotation.x=V.degToRad(e)}get rotateY(){return V.radToDeg(this.object3D.rotation.y)}set rotateY(e){this.object3D.rotation.y=V.degToRad(e)}get rotateZ(){return V.radToDeg(this.object3D.rotation.z)}set rotateZ(e){this.object3D.rotation.z=V.degToRad(e)}get scale(){return this._scale}set scale(e){this._scale=e,this.object3D.scale.setScalar(e),this.handleVisibility()}get scaleX(){return this.object3D.scale.x}set scaleX(e){this.object3D.scale.x=e,this.handleVisibility()}get scaleY(){return this.object3D.scale.y}set scaleY(e){this.object3D.scale.y=e,this.handleVisibility()}get scaleZ(){return this.object3D.scale.z}set scaleZ(e){this.object3D.scale.z=e,this.handleVisibility()}get opacity(){return this._opacity}set opacity(e){this._opacity=e;let t=this.object3D.material;if(t)if(Array.isArray(t))for(let n=0,s=t.length;n<s;n++)t[n].opacity=e;else t.opacity=e;this.handleVisibility()}},Mt=i=>new d0(i);var Sd=class{constructor(e,t,n){this.geometries=null,this.materials=e,this.scope=t,this.stage=n,this.raycaster=new sc,this.root=Mt(new ft),this.rootWorldPostion=new k,this.easesObjects=[],this.caseFrontVentObjects=[],this.caseBackVentObjects=[],this.case01Objects=[],this.case02FrontObjects=[],this.case02BackObjects=[],this.labels=[],this.modulesObjects={animate:Mt(new ft),draggable:Mt(new ft),scroll:Mt(new ft),engine:Mt(new ft),scope:Mt(new ft),timer:Mt(new ft),stagger:Mt(new ft),spring:Mt(new ft),svg:Mt(new ft),timeline:Mt(new ft),renderer:Mt(new ft),waapi:Mt(new ft),case01:Mt(new ft),case02:Mt(new ft),case02Back:Mt(new ft)},this.modulesObjects.waapi.z=2.6,this.modulesObjects.waapi.scale=.8,this.createLabel("waapi",this.modulesObjects.waapi,-1,0,0,"theme-color-11"),this.modulesObjects.timeline.z=2.05,this.createLabel("timeline",this.modulesObjects.timeline,-1,0,0,"theme-color-3"),this.modulesObjects.stagger.z=1.52,this.createLabel("stagger",this.modulesObjects.stagger,-1,0,0,"theme-color-8"),this.modulesObjects.svg.z=1.16,this.createLabel("svg",this.modulesObjects.svg,-1,0,0,"theme-color-9"),this.modulesObjects.spring.z=.99,this.createLabel("spring",this.modulesObjects.spring,-1,0,0,"theme-color-10"),this.modulesObjects.animate.z=0,this.createLabel("animation",this.modulesObjects.animate,-1,0,0,"theme-color-2"),this.modulesObjects.timer.z=.6,this.createLabel("timer",this.modulesObjects.timer,1,0,0,"theme-color-1"),this.createLabel("easings",this.modulesObjects.animate,1,0,0,"theme-color-0"),this.modulesObjects.draggable.z=-.62,this.createLabel("draggable",this.modulesObjects.draggable,1,0,0,"theme-color-5"),this.modulesObjects.scroll.z=-1.05,this.createLabel("scroll",this.modulesObjects.scroll,1,0,0,"theme-color-6"),this.modulesObjects.engine.z=-1.85,this.modulesObjects.scope.z=-1.81,this.createLabel("scope",this.modulesObjects.scope,1,0,0,"theme-color-7"),this.modulesObjects.renderer.z=2.7,this.modulesObjects.renderer.scale=.98,this.modulesObjects.case01.z=1.8,this.modulesObjects.case02.z=.35,this.modulesObjects.case02Back.z=-1.78;for(let s in this.modulesObjects)this.root.object3D.add(this.modulesObjects[s].object3D);for(let s=0,r=13;s<r;s++){let a=Mt(new ft);a.dataset={index:0},this.easesObjects.push(a)}for(let s=0,r=15;s<r;s++){let a=Mt(new ft),o=Mt(new ft);this.caseFrontVentObjects.push(a),this.caseBackVentObjects.push(o),this.modulesObjects.case02.object3D.add(a.object3D),this.modulesObjects.case02Back.object3D.add(o.object3D)}for(let s=0,r=4;s<r;s++){let a=Mt(new ft),o=Mt(new ft),l=Mt(new ft);this.case01Objects.push(a),this.case02FrontObjects.push(o),this.case02BackObjects.push(l),this.modulesObjects.case01.object3D.add(a.object3D),this.modulesObjects.case02.object3D.add(o.object3D),this.modulesObjects.case02Back.object3D.add(l.object3D)}this.createMeshes()}createLabel(e,t,n=0,s=0,r=0,a){let o=document.createElement("li"),l=document.createElement("div"),c=document.createElement("div"),u=document.querySelector(".toolbox-labels-left"),h=document.querySelector(".toolbox-labels-right"),d=n>0;(d?u:h).appendChild(o),c.classList.add("module-label-text"),l.classList.add("module-label-point"),o.innerHTML=e,c.innerHTML=e,c.classList.add("module-"+e),a&&(o.classList.add(a),c.classList.add(a));let g=Mt(new Lc(l)),v=Mt(new Lc(c));return V.set(g,{x:n,y:s,z:r}),V.set(v,{x:0,y:1.25,z:r}),this.labels.push(g),t.object3D.add(g.object3D),t.object3D.add(v.object3D),this.stage.labelsRenderer.domElement.appendChild(l),this.stage.labelsRenderer.domElement.appendChild(c),this.stage.lines.createLine(o,l,!d,a),g}createMesh(e,t,n){let s=new Qt(this.geometries[t],this.materials.outlineMaterial),r=Mt(s);return n&&V.set(r,n),e.object3D.add(s),r}async loadGeometries(){this.geometries=await h0({animate01:"assets/models/module-animate-01.glb",easing01:"assets/models/module-easing-01.glb",draggable01:"assets/models/module-draggable-01.glb",draggable02:"assets/models/module-draggable-02.glb",scroll01:"assets/models/module-scroll-01.glb",engine01:"assets/models/module-engine-01.glb",scope01:"assets/models/module-scope-01.glb",timer01:"assets/models/module-timer-01.glb",timer02:"assets/models/module-timer-02.glb",timer03:"assets/models/module-timer-03.glb",timer04:"assets/models/module-timer-04.glb",timer05:"assets/models/module-timer-05.glb",stagger01:"assets/models/module-stagger-01.glb",stagger02:"assets/models/module-stagger-02.glb",spring01:"assets/models/module-spring-01.glb",svg01:"assets/models/module-svg-01.glb",timeline01:"assets/models/module-timeline-01.glb",timeline02:"assets/models/module-timeline-02.glb",renderer01:"assets/models/module-renderer-01.glb",waapi01:"assets/models/module-waapi-01.glb",shield01:"assets/models/module-shield-01.glb",shield02:"assets/models/module-shield-02.glb"})}async createMeshes(){await this.loadGeometries(),this.createMesh(this.modulesObjects.animate,"animate01");let e=Mt(new ft);this.modulesObjects.animate.object3D.add(e.object3D);let t=[],n=[];for(let ce=0,X=this.easesObjects.length;ce<X;ce++){let Z=Mt(new ft),ie=this.easesObjects[ce];t.push(Z),e.object3D.add(Z.object3D),Z.object3D.add(ie.object3D),n.push(this.createMesh(ie,"easing01"))}V.set(t,{x:ge(.044),rotateZ:ge([20,-20])}),V.set(n,{y:ge([-.07,-.11],{from:"center",ease:"in(2)"})}),et().add(n,{y:[{to:"+=.03",ease:"inQuad",duration:500},{to:"-=.03",ease:"outQuad",duration:1e3}],loop:!0,ease:"inOutQuad"},ge(200)),e.z=0,e.x=.75,e.y=.65,e.rotateZ=-63;let s=[];this.createMesh(this.modulesObjects.draggable,"draggable01");for(let ce=0,X=5;ce<X;ce++){let Z=Mt(new ft);s.push(Z),this.modulesObjects.draggable.object3D.add(Z.object3D),this.createMesh(Z,"draggable02",{y:.92})}et({defaults:{loop:!0}}).add(s,{rotateZ:[ge([-90,0]),ge([-450,-360])],duration:3e3,ease:"inOut(4)"},ge(160)).init();let r=this.createMesh(this.modulesObjects.scroll,"scroll01");Ie(r,{rotateZ:-360,ease:"linear",duration:32e3,loop:!0});let a=this.createMesh(this.modulesObjects.scope,"scope01",{scale:.98});Ie(a,{rotateZ:-360,ease:"linear",duration:64e3,loop:!0});let o=this.createMesh(this.modulesObjects.engine,"engine01");Ie(o,{rotateZ:-360,ease:"linear",duration:64e3,loop:!0});let l=this.createMesh(this.modulesObjects.timer,"timer01",{z:.075}),c=this.createMesh(this.modulesObjects.timer,"timer02",{z:-.08}),u=this.createMesh(this.modulesObjects.timer,"timer03",{z:.16,x:-.225,y:.5}),h=this.createMesh(this.modulesObjects.timer,"timer04",{z:.16,x:.5,y:.4}),d=this.createMesh(this.modulesObjects.timer,"timer05",{z:.26,scale:.95});et({defaults:{loop:!0}}).add(l,{rotateZ:function(){let ce=[];for(let X=0;X<36;X++)ce.push({to:-(360/36)*X,duration:1e3});return ce}(),ease:"outElastic(.2, 1)"},0).add(c,{rotateZ:function(){let ce=[];for(let X=0;X<24;X++)ce.push({to:-(360/24)*X,duration:1e3});return ce}(),ease:"linear"},0).add(u,{rotateZ:360,ease:"linear",duration:7e3},0).add(h,{rotateZ:-360,ease:"linear",duration:6e3},0);let p=this.createMesh(this.modulesObjects.spring,"spring01");Ie(p,{rotateZ:[0,-90,,-180,-270,-360],ease:Ei({stiffness:10,damping:3}),loop:!0});let g=this.modulesObjects.stagger,v=[];for(let ce=0;ce<4;ce++)v.push(this.createMesh(g,"stagger02",{z:-.1*ce+.06}));et().add(v,{z:[{to:"+=.08",ease:"inOut(2)",duration:1e3},{to:"-=.08",ease:"inOut(2)",duration:800}],loop:!0},ge(200,{from:"last"})),this.createMesh(g,"stagger01",0);let m=69,f=new ea(.9,.9,.1,m,1,!1).toNonIndexed(),x=f.getAttribute("position"),_=[],y=[];for(let ce=0;ce<m;ce++){let X=ce%2;y[ce]=new ye().setHSL(V.random(X?.25:.55,X?.45:.75,2),1,.5)}let T=new ye().setHSL(.1,1,.5),M=new ye().setHSL(.9,1,.5);for(let ce=0;ce<x.count;ce+=3){let X=f.attributes.normal.getY(ce),Z;if(Math.abs(X)>.9)Z=X>0?T:M;else{let ie=x.array[ce*3],he=x.array[ce*3+2],Le=Math.atan2(he,ie),Ce=Math.floor((Le+Math.PI)/(Math.PI*2)*m);Z=y[Ce]||y[0]}for(let ie=0;ie<3;ie++)_.push(Z.r,Z.g,Z.b)}f.setAttribute("color",new Xt(_,3));let R=Mt(new Qt(f,this.materials.outlineMaterial));this.modulesObjects.svg.object3D.add(R.object3D),this.createMesh(this.modulesObjects.svg,"svg01",0),R.rotateX=90,Ie(R,{rotateY:-360,loop:!0,duration:1e4,ease:"linear"});let C={progress:0,segments:2,odd:.5,even:.1,positions:f.attributes.position.array.slice(),radius:{x:[],z:[]},newRadius:{x:[],z:[]}};function b(){let ce={x:[],z:[]};for(let X=0;X<C.positions.length;X+=3){let Z=C.positions[X],ie=C.positions[X+2],Le=(Math.atan2(ie,Z)+Math.PI)/(Math.PI*2),Ce=C.segments,He=V.interpolate(C.even,C.odd,(Math.sin(Le*Math.PI*Ce)+1)/2),Je=Math.sqrt(Z*Z+ie*ie);if(Je>0){let We=Je-He;ce.x[X]=Z/Je*We,ce.z[X]=ie/Je*We}else ce.x[X]=Z,ce.z[X]=ie}return ce}function S(){let ce=C.p,X=C.radius,Z=C.newRadius;for(let ie=0;ie<C.positions.length;ie+=3)f.attributes.position.array[ie]=V.interpolate(X.x[ie],Z.x[ie],ce),f.attributes.position.array[ie+2]=V.interpolate(X.z[ie],Z.z[ie],ce);f.attributes.position.needsUpdate=!0}et({loop:!0,onUpdate:()=>S()}).call(()=>{C.radius=b(),C.segments=V.random(4,32,0),C.odd=V.random(0,.5,2),C.even=V.random(0,.2,2),C.newRadius=b()}).add(C,{p:[0,1],duration:750,ease:"inOutQuad"});let D=this.modulesObjects.timeline,U=[],O=Math.PI*2/8,B=.68;for(let ce=0;ce<8;ce++){let X=O*ce,Z=Math.cos(X)*B,ie=Math.sin(X)*B;U.push(this.createMesh(D,"timeline02",{x:Z,y:ie,z:-.35,rotateZ:-90+ce*45}))}et().add(U,{z:[{to:"+=.15",ease:"inOut(2)",duration:1e3},{to:"-=.15",ease:"inOut(2)",duration:800}],loop:!0},ge(200,{from:"last"})),this.createMesh(D,"timeline01"),this.createMesh(this.modulesObjects.renderer,"renderer01",{z:.025}),this.createMesh(this.modulesObjects.waapi,"waapi01",{z:0,y:0,x:0});let G=.541,N=.925,I=1,P=0;this.createMesh(this.case01Objects[0],"shield01",{scale:N,scaleZ:I,x:-G,y:G,z:P,rotateZ:0}),this.createMesh(this.case01Objects[2],"shield01",{scale:N,scaleZ:I,x:G,y:-G,z:P,rotateZ:-180}),this.createMesh(this.case01Objects[3],"shield01",{scale:N,scaleZ:I,x:-G,y:-G,z:P,rotateZ:-270});let F=.585,J=.715,oe=[];this.createMesh(this.case02FrontObjects[0],"shield02",{x:-F,y:F,z:J,rotateZ:0}),this.createMesh(this.case02FrontObjects[1],"shield02",{x:F,y:-F,z:J,rotateZ:-180}),this.createMesh(this.case02FrontObjects[2],"shield02",{x:-F,y:-F,z:J,rotateZ:-270});for(let ce=0;ce<this.caseFrontVentObjects.length;ce++)oe.push(this.createMesh(this.caseFrontVentObjects[ce],"shield02",{x:F,y:F,z:J,rotateZ:-90,scaleZ:.025}));V.set(oe,{z:ge([0,1.37],{start:.03})});let _e=[];this.createMesh(this.case02BackObjects[0],"shield02",{x:-F,y:F,z:J,rotateZ:0}),this.createMesh(this.case02BackObjects[1],"shield02",{x:F,y:-F,z:J,rotateZ:-180}),this.createMesh(this.case02BackObjects[2],"shield02",{x:-F,y:-F,z:J,rotateZ:-270});for(let ce=0;ce<this.caseBackVentObjects.length;ce++)_e.push(this.createMesh(this.caseBackVentObjects[ce],"shield02",{x:F,y:F,z:J,rotateZ:-90,scaleZ:.025}));V.set(_e,{z:ge([0,1.37],{start:.03})})}};var Mr=class{constructor(e){this.$canvas=document.createElement("canvas"),this.$parent=e,this.$parent.appendChild(this.$canvas),this.scale=2;let t=this.$parent.offsetWidth,n=this.$parent.offsetHeight;this.$canvas.style.width=`${t}px`,this.$canvas.style.height=`${n}px`,this.$canvas.width=t*this.scale,this.$canvas.height=n*this.scale,this.width=t,this.height=n,this.ctx=this.$canvas.getContext("2d"),this.ctx.scale(this.scale,this.scale),this.shapes=[],this.circles=[],this.lines=[],this.shapesLength=0}updateDimensions(){let e=this.$parent.offsetWidth,t=this.$parent.offsetHeight;this.$canvas.style.width=`${e}px`,this.$canvas.style.height=`${t}px`,this.$canvas.width=e*this.scale,this.$canvas.height=t*this.scale,this.width=e,this.height=t,this.ctx.scale(this.scale,this.scale)}addCircle(e,t,n={}){let s={isCircle:!0,radius:e,color:t,x:n.x||0,y:n.y||0,scale:n.scale!==void 0?n.scale:1,scaleX:n.scaleX!==void 0?n.scaleX:1,scaleY:n.scaleY!==void 0?n.scaleY:1,opacity:n.opacity!==void 0?n.opacity:1};return this.shapes.push(s),this.circles.push(s),this.shapesLength++,s}addLine(e,t,n,s,r,a,o={}){let l={isLine:!0,x1:e,y1:t,x2:n,y2:s,color:a,x:o.x||0,y:o.y||0,lineWidth:r||1,scale:o.scale!==void 0?o.scale:1,scaleX:o.scaleX!==void 0?o.scaleX:1,scaleY:o.scaleY!==void 0?o.scaleY:1,opacity:o.opacity!==void 0?o.opacity:1};return this.shapes.push(l),this.lines.push(l),this.shapesLength++,l}render(){let e=this.ctx;e.clearRect(0,0,this.width,this.height);for(let t=0;t<this.shapesLength;t++){let n=this.shapes[t];if(e.save(),e.globalAlpha=V.clamp(n.opacity,0,1),n.isCircle)e.translate(n.x,n.y),e.scale(n.scale*n.scaleX,n.scale*n.scaleY),e.beginPath(),e.arc(0,0,n.radius,0,Math.PI*2),e.fillStyle=n.color,e.fill();else if(n.isLine){e.translate(n.x,n.y);let s=(n.x1+n.x2)/2,r=(n.y1+n.y2)/2;e.translate(s,r),e.scale(n.scale*n.scaleX,n.scale*n.scaleY),e.translate(-s,-r),e.beginPath(),e.moveTo(n.x1,n.y1),e.lineTo(n.x2,n.y2),e.strokeStyle=n.color,e.lineWidth=n.lineWidth,e.stroke()}e.restore()}}};function Fc(i,e="word",t=null){if(!i)return;let n=i.innerHTML,s=document.createElement("div");s.innerHTML=n;let r=[],a=document.createTreeWalker(s,NodeFilter.SHOW_TEXT,null),o;for(;o=a.nextNode();)r.push(o);r.forEach(l=>{let c=l.parentNode,u=l.nodeValue;if(!u.trim())return;let h=document.createDocumentFragment();u.split(/(\s+)/).forEach(p=>{if(!!p)if(p.trim()==="")h.appendChild(document.createTextNode(p));else{let g=document.createElement("span");g.className=e,g.style.display="inline-block",t?Array.from(p).forEach(v=>{let m=document.createElement("span");m.className=t,m.style.display="inline-block",m.textContent=v,g.appendChild(m)}):g.textContent=p,h.appendChild(g)}}),c.replaceChild(h,l)}),i.innerHTML=s.innerHTML}function bd(i,e=!1){let[t]=V.$(i);return Fc(t,"word",e?"char":null),et({autoplay:!1}).add(t.querySelectorAll(e?".char":".word"),{x:[".35em",0],opacity:[0,1],duration:1e3,delay:ge(25,{ease:"outIn(2)"}),ease:"outQuint"}).init()}var ba=class{constructor(e){this.$el=document.createElement("button"),this.$el.setAttribute("title","Copy"),this.$el.classList.add("copy-button"),this.$el.classList.add("ui-input"),this.$el.innerHTML=`<svg class="icon" width="24" height="24" viewBox="0 0 24 24">
  <g fill="none" fill-rule="evenodd">
    <path fill="currentColor" fill-rule="nonzero" d="M17,5.25 C17.9664983,5.25 18.75,6.03350169 18.75,7 L18.75,13 C18.75,13.9664983 17.9664983,14.75 17,14.75 L14.75,14.75 L14.75,17 C14.75,17.9664983 13.9664983,18.75 13,18.75 L7,18.75 C6.03350169,18.75 5.25,17.9664983 5.25,17 L5.25,11 C5.25,10.0335017 6.03350169,9.25 7,9.25 L9.25,9.25 L9.25,7 C9.25,6.03350169 10.0335017,5.25 11,5.25 L17,5.25 Z M9.25,10.75 L7,10.75 C6.86192881,10.75 6.75,10.8619288 6.75,11 L6.75,17 C6.75,17.1380712 6.86192881,17.25 7,17.25 L13,17.25 C13.1380712,17.25 13.25,17.1380712 13.25,17 L13.25,14.75 L11,14.75 C10.0335017,14.75 9.25,13.9664983 9.25,13 L9.25,10.75 Z M17,6.75 L11,6.75 C10.8619288,6.75 10.75,6.86192881 10.75,7 L10.75,13 C10.75,13.1380712 10.8619288,13.25 11,13.25 L17,13.25 C17.1380712,13.25 17.25,13.1380712 17.25,13 L17.25,7 C17.25,6.86192881 17.1380712,6.75 17,6.75 Z"/>
    <polyline stroke="var(--hex-green-1)" stroke-width="1.75" points="5 12 10 17 19 8"/>
  </g>
</svg>`,this.$copyIcon=this.$el.querySelector("path"),this.OKLine=qn.createDrawable(this.$el.querySelector("polyline")),this.data=e,this.$el.addEventListener("click",this,!1)}handleClick(){navigator.clipboard.writeText(this.data),et({onPause:()=>this.$el.blur()}).add(this.$copyIcon,{scale:0,duration:350,ease:"out(3)"}).add(this.OKLine,{draw:["0 0","0 1"],duration:350,ease:"out(4)",onComplete:()=>this.$el.blur()},"<-=200").add(this.OKLine,{draw:"1 1",duration:400,ease:"inOut(4)"},"+=400").add(this.$copyIcon,{scale:1,duration:350,ease:"out(3)"},"<<+=250")}handleEvent(e){e.type==="click"&&this.handleClick()}};var N0=Gd(U0());var Oi=N0.default;var B0="[A-Za-z$_][0-9A-Za-z$_]*",xT=["as","in","of","if","for","while","finally","var","new","function","do","return","void","else","break","catch","instanceof","with","throw","case","default","try","switch","continue","typeof","delete","let","yield","const","class","debugger","async","await","static","import","from","export","extends"],yT=["true","false","null","undefined","NaN","Infinity"],O0=["Object","Function","Boolean","Symbol","Math","Date","Number","BigInt","String","RegExp","Array","Float32Array","Float64Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Int32Array","Uint16Array","Uint32Array","BigInt64Array","BigUint64Array","Set","Map","WeakSet","WeakMap","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","Promise","Generator","GeneratorFunction","AsyncFunction","Reflect","Proxy","Intl","WebAssembly"],k0=["Error","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError"],z0=["setInterval","setTimeout","clearInterval","clearTimeout","require","exports","eval","isFinite","isNaN","parseFloat","parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","unescape"],AT=["arguments","this","super","console","window","document","localStorage","sessionStorage","module","global"],_T=[].concat(z0,O0,k0);function kc(i){let e=i.regex,t=(P,{after:F})=>{let J="</"+P[0].slice(1);return P.input.indexOf(J,F)!==-1},n=B0,s={begin:"<>",end:"</>"},r=/<[A-Za-z0-9\\._:-]+\s*\/>/,a={begin:/<[A-Za-z0-9\\._:-]+/,end:/\/[A-Za-z0-9\\._:-]+>|\/>/,isTrulyOpeningTag:(P,F)=>{let J=P[0].length+P.index,oe=P.input[J];if(oe==="<"||oe===","){F.ignoreMatch();return}oe===">"&&(t(P,{after:J})||F.ignoreMatch());let _e,ce=P.input.substring(J);if(_e=ce.match(/^\s*=/)){F.ignoreMatch();return}if((_e=ce.match(/^\s+extends\s+/))&&_e.index===0){F.ignoreMatch();return}}},o={$pattern:B0,keyword:xT,literal:yT,built_in:_T,"variable.language":AT},l="[0-9](_?[0-9])*",c=`\\.(${l})`,u="0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*",h={className:"number",variants:[{begin:`(\\b(${u})((${c})|\\.)?|(${c}))[eE][+-]?(${l})\\b`},{begin:`\\b(${u})\\b((${c})\\b|\\.)?|(${c})\\b`},{begin:"\\b(0|[1-9](_?[0-9])*)n\\b"},{begin:"\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"},{begin:"\\b0[bB][0-1](_?[0-1])*n?\\b"},{begin:"\\b0[oO][0-7](_?[0-7])*n?\\b"},{begin:"\\b0[0-7]+n?\\b"}],relevance:0},d={className:"subst",begin:"\\$\\{",end:"\\}",keywords:o,contains:[]},p={begin:"html`",end:"",starts:{end:"`",returnEnd:!1,contains:[i.BACKSLASH_ESCAPE,d],subLanguage:"xml"}},g={begin:"css`",end:"",starts:{end:"`",returnEnd:!1,contains:[i.BACKSLASH_ESCAPE,d],subLanguage:"css"}},v={begin:"gql`",end:"",starts:{end:"`",returnEnd:!1,contains:[i.BACKSLASH_ESCAPE,d],subLanguage:"graphql"}},m={className:"string",begin:"`",end:"`",contains:[i.BACKSLASH_ESCAPE,d]},f=i.COMMENT(/\/\*\*(?!\/)/,"\\*/",{relevance:0,contains:[{begin:"(?=@[A-Za-z]+)",relevance:0,contains:[{className:"doctag",begin:"@[A-Za-z]+"},{className:"type",begin:"\\{",end:"\\}",excludeEnd:!0,excludeBegin:!0,relevance:0},{className:"variable",begin:n+"(?=\\s*(-)|$)",endsParent:!0,relevance:0},{begin:/(?=[^\n])\s/,relevance:0}]}]}),x={className:"comment",variants:[f,i.C_BLOCK_COMMENT_MODE,i.C_LINE_COMMENT_MODE]},_=[i.APOS_STRING_MODE,i.QUOTE_STRING_MODE,p,g,v,m,{match:/\$\d+/},h];d.contains=_.concat({begin:/\{/,end:/\}/,keywords:o,contains:["self"].concat(_)});let y=[].concat(x,d.contains),T=y.concat([{begin:/\(/,end:/\)/,keywords:o,contains:["self"].concat(y)}]),M={className:"params",begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:o,contains:T},R={variants:[{match:[/class/,/\s+/,n,/\s+/,/extends/,/\s+/,e.concat(n,"(",e.concat(/\./,n),")*")],scope:{1:"keyword",3:"title.class",5:"keyword",7:"title.class.inherited"}},{match:[/class/,/\s+/,n],scope:{1:"keyword",3:"title.class"}}]},C={relevance:0,match:e.either(/\bJSON/,/\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,/\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,/\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),className:"title.class",keywords:{_:[...O0,...k0]}},b={label:"use_strict",className:"meta",relevance:10,begin:/^\s*['"]use (strict|asm)['"]/},S={variants:[{match:[/function/,/\s+/,n,/(?=\s*\()/]},{match:[/function/,/\s*(?=\()/]}],className:{1:"keyword",3:"title.function"},label:"func.def",contains:[M],illegal:/%/},D={relevance:0,match:/\b[A-Z][A-Z_0-9]+\b/,className:"variable.constant"};function U(P){return e.concat("(?!",P.join("|"),")")}let O={match:e.concat(/\b/,U([...z0,"super","import"]),n,e.lookahead(/\(/)),className:"title.function",relevance:0},B={begin:e.concat(/\./,e.lookahead(e.concat(n,/(?![0-9A-Za-z$_(])/))),end:n,excludeBegin:!0,keywords:"prototype",className:"property",relevance:0},G={match:[/get|set/,/\s+/,n,/(?=\()/],className:{1:"keyword",3:"title.function"},contains:[{begin:/\(\)/},M]},N="(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|"+i.UNDERSCORE_IDENT_RE+")\\s*=>",I={match:[/const|var|let/,/\s+/,n,/\s*/,/=\s*/,/(async\s*)?/,e.lookahead(N)],keywords:"async",className:{1:"keyword",3:"title.function"},contains:[M]};return{name:"JavaScript",aliases:["js","jsx","mjs","cjs"],keywords:o,exports:{PARAMS_CONTAINS:T,CLASS_REFERENCE:C},illegal:/#(?![$_A-z])/,contains:[i.SHEBANG({label:"shebang",binary:"node",relevance:5}),b,i.APOS_STRING_MODE,i.QUOTE_STRING_MODE,p,g,v,m,x,{match:/\$\d+/},h,C,{className:"attr",begin:n+e.lookahead(":"),relevance:0},I,{begin:"("+i.RE_STARTERS_RE+"|\\b(case|return|throw)\\b)\\s*",keywords:"return throw case",relevance:0,contains:[x,i.REGEXP_MODE,{className:"function",begin:N,returnBegin:!0,end:"\\s*=>",contains:[{className:"params",variants:[{begin:i.UNDERSCORE_IDENT_RE,relevance:0},{className:null,begin:/\(\s*\)/,skip:!0},{begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:o,contains:T}]}]},{begin:/,/,relevance:0},{match:/\s+/,relevance:0},{variants:[{begin:s.begin,end:s.end},{match:r},{begin:a.begin,"on:begin":a.isTrulyOpeningTag,end:a.end}],subLanguage:"xml",contains:[{begin:a.begin,end:a.end,skip:!0,contains:["self"]}]}]},S,{beginKeywords:"while if switch catch for"},{begin:"\\b(?!function)"+i.UNDERSCORE_IDENT_RE+"\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",returnBegin:!0,label:"func.def",contains:[M,i.inherit(i.TITLE_MODE,{begin:n,className:"title.function"})]},{match:/\.\.\./,relevance:0},B,{match:"\\$"+n,relevance:0},{match:[/\bconstructor(?=\s*\()/],className:{1:"title.function"},contains:[M]},O,D,R,G,{match:/\$[(.]/}]}}var fs=class{constructor(){this.syncable=null}onEnter(){}onLeave(){}};function H0(i){let e={},t=Ei(),n="out(3)",s=e.intuitive=new fs,r=V.$("#intuitive-demo .square");V.set(r,{rotate:0,scale:.001});let a=Ie(r,{rotate:90,loop:!0,duration:750,ease:"inOutExpo",autoplay:!1});s.onEnter=()=>{Ie(r,{scale:1,ease:t}),a.restart()},s.onLeave=()=>{Ie(r,{scale:0,duration:250,ease:n}),a.pause()};let o=e.composition=new fs,l=V.$("#additive-demo .shape"),c=["inOutQuad","inOutSine","inOutExpo",Ei()];V.set(l,{x:0,y:0,rotate:0,scale:0});let u=[],h=0,d=(I,P,F)=>{let J=V.random(500,2e3),oe={duration:J,ease:V.randomPick(c),composition:"none"};oe[P]=F,u[h++]=Ie(I,oe),u[h++]=Zn({duration:J*.8,onComplete:()=>d(I,P,F)}),h>640&&(h=0)};o.onEnter=()=>{l.forEach((I,P)=>{d(I,"x",()=>V.random(-90,90)),d(I,"y",()=>V.random(-90,90)),d(I,"rotate",()=>V.random(-90,90)),d(I,"scale",()=>V.random(.05,.4,4))})},o.onLeave=()=>{Ie(l,{scale:0,duration:250,ease:n}),u.forEach(I=>I.cancel()),u.length=0,h=0};let p=e.svgUtils=new fs,g=V.$("#drawable-demo .svg-track"),v=qn.createDrawable("#drawable-demo .svg-track-higlight path"),m=qn.createDrawable("#drawable-demo .svg-track-bg path");V.set(g,{rotateX:90,rotateZ:0,z:0,scale:0});let f=et({autoplay:!1}).add("#drawable-demo .svg-car",{ease:"linear",duration:1e4,loop:!0,...qn.createMotionPath("#drawable-demo .svg-track-bg path")},0).add(v,{draw:"0 1",ease:"linear",duration:1e4,loop:!0},0).add(g,{rotateZ:360,ease:"linear",duration:2e4,loop:!0},0);p.onEnter=()=>{Ie(m,{draw:["0 0","0 1"],duration:1e3,ease:"inOutExpo"}),Ie(g,{rotateX:{to:45,duration:1e3},scale:[.8,1],z:(I,P)=>P?10:5,ease:"out(3)",duration:350}),f.restart()},p.onLeave=()=>{Ie(g,{rotateX:90,z:0,scale:.8,ease:"inOut(3)",duration:250}),f.pause()};let x=e.clockwork=new fs,_=et({autoplay:!1}).set(".clock .tick:last-child",{opacity:0},0).add(".clock .tick:not(:last-child)",{y:(I,P)=>P%12?"-=6":"-=12",opacity:{to:1,duration:0,ease:"linear",delay:45},scaleX:2,ease:"inOutQuad",duration:50,loop:1,alternate:!0,composition:"none"},ge(10)).set(".clock .tick:first-child",{opacity:0},"<-=90").set(".clock .tick:last-child",{opacity:.5},"<<").add(qn.createDrawable(".clock-grid .circle-grid-drawable path"),{draw:["1 1","0 1"],strokeWidth:["20","5"],opacity:[1,.15],ease:"linear",duration:I=>+I.getAttribute("id").split("_")[1]*1920,delay:ge(240)},50).add(".timeline-playhead",{rotate:360,ease:"linear",duration:1920},50).init();x.syncable=_,x.onEnter=()=>{Ie(".tick",{scaleY:(I,P)=>P%12?1.5:2.25,duration:350})},x.onLeave=()=>{Ie(".tick",{scaleY:1,duration:250})};let y=e.staggering=new fs,T=[13,13],M=200;V.set(i.circles,{opacity:ge([0,1],{grid:T,from:"center",reversed:!0,modifier:I=>V.round(I+.25,0)?1:0})});let R=et({autoplay:!1,onUpdate:()=>i.render()}).add(i.circles,{scale:[1,ge([15,1],{grid:T,from:"center"}),{to:1,duration:500}],opacity:[{to:["-=.8","+=.8"]},{to:"-=.8",delay:900}],x:[{to:ge([M,M+110],{grid:T,from:"center",axis:"x"}),duration:500},{to:ge([M,M+100],{grid:T,from:"center",axis:"x"}),duration:1e3}],y:[{to:ge([M,M+110],{grid:T,from:"center",axis:"y"}),duration:500},{to:ge([M,M+100],{grid:T,from:"center",axis:"y"}),duration:1e3}],duration:750,loop:!0,ease:"inOutQuad"},ge(200,{grid:T,from:"center",ease:"in",start:50})).init();y.onEnter=()=>{R.restart()},y.onLeave=()=>{R.pause()};let C=e.draggable=new fs,b=V.$("#draggable-demo .draggable"),S=Ei({stiffness:120,damping:6}),D=hs(b,{container:[0,0,0,0],containerFriction:.5,releaseContainerFriction:0,releaseEase:S});D.progressX=.5,D.progressY=.5,D.onGrab=()=>{Ie(b[0],{scale:.8,duration:350,ease:"out(3)"})},D.onRelease=()=>{Ie(b[0],{scale:1,duration:350,ease:"out(3)"})},b[0].addEventListener("pointerenter",()=>{D.grabbed||Ie(b[0],{scale:1.15,duration:350,ease:"out(3)"})}),b[0].addEventListener("pointerleave",()=>{D.grabbed||Ie(b[0],{scale:1,duration:350,ease:"out(3)"})}),C.onEnter=()=>{D.progressX=.5,D.progressY=.5,Ie(b,{scale:[0,1],ease:t})},C.onLeave=()=>{Ie(b,{scale:0,ease:n,duration:350})};let U=e.scroll=new fs,O=et({autoplay:!1}).add("#scrollable-demo path",{x:[-4,4,{to:-4,duration:1500}],y:[-4,4,{to:-4,duration:1500}],strokeWidth:[2,4,{to:2,duration:1500}],loop:!0,duration:2500,loopDelay:0,ease:"inOut(2)"},ge(200,{reversed:!0})).init().seek(1e4);U.syncable=et({autoplay:!1}).add(qn.createDrawable("#scrollable-demo path"),{draw:[{to:ge([0,1],{modifier:I=>`${I} ${I+1.01}`})},{to:ge([0,1],{modifier:I=>`${I+1.01} ${I+1.01}`})}],ease:"inOut(3)",delay:ge(40,{reversed:!0})}),U.onEnter=()=>{O.play()},U.onLeave=()=>{O.pause()};let B=e.responsive=new fs,G={x:0,y:1},N=et({id:"responsive-loop",autoplay:!1}).add(".responsive-viewport .circle",{y:{to:[-50,50],modifier:I=>I*G.y},x:{to:[-50,50],modifier:I=>I*G.x},alternate:!0,loop:!0,duration:750,ease:"inOutQuad"},ge(100,{start:0})).seek(1e3);return B.syncable=et({id:"responsive",autoplay:!1}).add(".responsive-viewport",{width:["80%","50%"],height:["50%","80%"],ease:"inOutExpo"}).add(G,{x:1,y:0,ease:"inOut(6)"},"<<").add(".responsive-viewport .shape",{x:[ge([-110,110]),0],y:[0,ge([-110,110])],ease:"inOut(6)"},"<<").init(),B.onEnter=()=>{Ie(".responsive-viewport .circle",{scale:[0,1],ease:t,delay:ge(40)}),N.play()},B.onLeave=()=>{Ie(".responsive-viewport .circle",{scale:0,ease:n,duration:350}),N.pause()},e}function G0(){let[i]=V.$(".page"),[e]=V.$("#engine"),t=V.$(".learn-more"),n=new Jh,s=Ns({mediaQueries:fo}),r=new td(n),a=new hd(r,n),o=new Sd(a,s,r),l=o.root,c=Mt(new ft),u=Mt(new ft),h=new ld(r,a,n),d=new Qh(r.$output),[p]=V.$(".npm-install code"),g=V.$(".learn-more .icon"),v=new ba(p.innerHTML);p.appendChild(v.$el),i.classList.add("is-ready");let m=V.$(".sub-nav code");for(let ne=0;ne<m.length;ne++){let fe=m[ne],at=new ba(fe.innerHTML);if(fe.parentElement.appendChild(at.$el),Oi.highlightElement(fe),Oi.registerLanguage("javascript",kc),fe.classList.contains("language-undefined")){let Et=Oi.highlight(fe.innerHTML,{language:"javascript"});fe.innerHTML=Et.value,fe.classList.remove("language-undefined"),fe.classList.add("language-javascript")}}function f(){Ie(document.documentElement,{scrollTop:window.innerHeight*3,ease:"inOut(2)",duration:2500})}t.forEach(ne=>{ne.addEventListener("click",f)}),Ie(g,{translateY:"+=.95em",ease:"linear",opacity:{to:[(ne,fe)=>fe?1:0,(ne,fe)=>fe?0:1],ease:"inOut(2)"},loop:!0});let x=[13,13],_=84,y=new Mr(r.$output);y.$canvas.classList.add("heart-canvas"),y.$canvas.classList.add("grid-canvas");let T=new Mr(r.$output);T.$canvas.classList.add("dotted-grid-canvas"),T.$canvas.classList.add("grid-canvas");let M=new Mr(V.$("#staggering-demo")[0]),R=V.get('[data-demo="staggering"]',"--hex-current-1");M.$canvas.classList.add("staggering-canvas"),M.$canvas.classList.add("grid-canvas");let C=T.width*.5,b=T.height*.5,S=C/(x[0]-1),D=b/(x[1]-1),U=(T.width-C)/2,O=(T.height-b)/2,B=V.get(document.body,"--hex-red-1");for(let ne=0;ne<x[0];ne++)for(let fe=0;fe<x[1];fe++)T.addCircle(1,B,{x:U+fe*S,y:O+ne*D}),y.addCircle(1,B,{x:U+fe*S,y:O+ne*D}),M.addCircle(1,R,{x:U+fe*S,y:O+ne*D});let G=new Mr(r.$output);G.$canvas.classList.add("easings-lines-canvas"),G.$canvas.classList.add("grid-canvas");let N=new Mr(r.$output);N.$canvas.classList.add("easings-dots-canvas"),N.$canvas.classList.add("grid-canvas");let I=ge([.75,.1],{from:"center",ease:"in(1)"}),P=ge([1,.75],{from:"center",ease:"in(1)"}),F=73,J=37,oe=30,_e=82,ce=80,X=78;for(let ne=0;ne<F;ne++)G.addLine(oe,0,G.width-oe,0,2,B,{scaleX:0});V.set(G.lines,{opacity:I,y:ge([_e,G.height-_e])});for(let ne=0;ne<J;ne++)N.addCircle(3,B,{y:N.height/2});V.set(N.circles,{opacity:P,x:ge([ce,N.width-ce])}),[0,0,.1,.1,.1,0,0,0,.1,.1,.1,0,0,0,.1,.5,.6,.5,.2,.1,.2,.5,.6,.5,.1,0,.1,.6,.8,.9,.9,.7,.5,.7,.9,.9,.8,.6,.1,.5,.9,1,1,1,.9,.8,.9,1,1,1,.9,.5,.8,.9,1,1,1,1,1,1,1,1,1,.9,.8,.8,1,1,1,1,1,1,1,1,1,1,1,.8,.6,.9,1,1,1,1,1,1,1,1,1,.9,.6,.4,.8,1,1,1,1,1,1,1,1,1,.8,.4,.2,.6,.9,1,1,1,1,1,1,1,.9,.6,.2,.1,.3,.6,.8,1,1,1,1,1,.8,.6,.3,.1,0,.1,.3,.5,.8,1,1,1,.8,.5,.3,.1,0,0,0,0,.2,.4,.7,.9,.7,.4,.2,0,0,0,0,0,0,0,.1,.2,.4,.2,.1,0,0,0,0].forEach((ne,fe)=>{y.circles[fe].scale=ne>.1?ne*12:0}),V.set(y.circles,{opacity:ge([.8,.1],{grid:x,from:_})});let ie=et({autoplay:!1,onUpdate:()=>{y.render()}}).add(y.circles,{scale:[{from:0},{to:0,duration:800}],duration:500,loop:!0,loopDelay:100,ease:"inOutQuad"},ge(150,{grid:x,from:_,ease:"in(4)"})).init(),he=document.createElement("div");he.classList.add("clock"),r.$output.appendChild(he);for(let ne=0;ne<193;ne++){let fe=document.createElement("div");fe.className="tick",fe.dataset.index="0",V.set(fe,{rotate:360/192*ne,y:-178}),he.appendChild(fe)}let Le=V.$(".home-section-container"),Ce=V.$(".output-progress path"),He=V.$(".output-progress-bg path"),Je=qn.createDrawable(Ce),We=V.$(".feature-section-demo"),Ke=V.$(".feature-demo"),L=qn.createDrawable("#path-animation polyline"),Dt=[".toolbox-labels-right li",".toolbox-labels-left li"],Be=V.$(".modules-sizes-chart .chart-bar");V.$(".module-label-text").forEach(ne=>{let[fe]=V.$(".modules-sizes-chart .chart-bar."+ne.classList[1]);if(fe){let at=fe.dataset.size;ne.innerHTML='<div><span class="label-dot"></span><span class="size">'+at+"</span> KB</div>"}});let Fe=V.$([".chart-bar.module-scope",".chart-bar.module-animation",".chart-bar.module-timer",".chart-bar.module-stagger"]),[pe]=V.$(".modules-bundle-size span"),ve=0,w=0;Be.forEach(ne=>ve+=+ne.dataset.size),pe.innerHTML=V.roundPad(ve,2),Be.forEach(ne=>{let fe=+ne.dataset.size,at=fe/ve;ne.style.width=at*100+"%",Fe.forEach(Et=>{ne===Et&&(w+=fe)})});let A=[],Y=[],$=[],se=[],te=[],j=[];for(let ne in ci){let fe;ne==="steps"?fe=ci.steps(V.random(3,7,0)):fe=ne,ne!=="irregular"&&ne!=="cubicBezier"&&ne!=="linear"&&(ne.startsWith("inOut")?se.push(fe):ne.startsWith("outIn")?te.push(fe):ne.startsWith("in")?Y.push(fe):ne.startsWith("out")?$.push(fe):j.push(fe))}A.push($[2]),A.push(se[4]);let K=Math.max(V.shuffle(Y).length,V.shuffle($).length,V.shuffle(se).length,V.shuffle(te).length,V.shuffle(j).length);for(let ne=0;ne<K;ne++)ne<Y.length&&A.push(Y[ne]),ne<$.length&&A.push($[ne]),ne<se.length&&A.push(se[ne]),ne<te.length&&A.push(te[ne]),ne<j.length&&A.push(j[ne]);let ae=(ne,fe,at,Et)=>(Ot,vn,Un)=>ge(ne,{ease:fe,from:at,reversed:Et})(Ot,vn,Un),Ee=et({id:"heading-animation",loop:!0,autoplay:!1,onUpdate:()=>{G.render(),N.render()},defaults:{duration:500}});for(let ne=0;ne<A.length;ne++){let fe=A[ne];Ee.add(G.lines,{scaleX:ae([.01,.75],fe,"center",!0),delay:ge(10,{from:"center"}),ease:fe}).add(o.easesObjects,{y:ae([0,.08],fe,"center",!0),delay:ge(20,{from:"center"}),ease:fe},"<<").add(N.circles,{y:ae([N.height*.5-X,N.height*.5+X],fe,"last",!1),delay:ge(20,{from:"center"}),ease:fe},"<<")}Ee.add(G.lines,{scaleX:0,delay:ge(10,{from:"center"})}).add(o.easesObjects,{y:0,delay:ge(20,{from:"center"})},"<<").add(N.circles,{y:N.height*.5,delay:ge(20,{from:"center"})},"<<"),d.scale.setScalar(.5),l.scale=10,c.object3D.scale.setScalar(.1),c.object3D.add(d),u.object3D.add(l.object3D),u.object3D.add(c.object3D),r.scene.add(u.object3D),n.enabled,r.camera.lookAt(r.scene.position);let re=new nd(r,n);u.object3D.add(re.ambientLight),u.object3D.add(re.directionalLight),s.add(({matches:ne})=>{ne.minM?(re.x=-200,re.y=135,re.z=-80):(re.x=-200,re.y=135,re.z=-110)}),n.helpers&&u.object3D.add(new rc(100,10));let me=n.enabled?n.stats.begin:()=>{},Ue=n.enabled?()=>{n.callsPanel.update(r.renderer.info.render.calls,1e3),n.trianglesPanel.update(r.renderer.info.render.triangles,15e5),r.renderer.info.reset(),n.stats.end()}:()=>{};function Qe(){n.enabled&&me(),h.render(),r.CSSRenderer.render(r.scene,r.camera),n.enabled&&Ue()}function Me(){r.updateDimensions(),a.updateDimensions(),h.updateDimensions(),Ne.paused&&Ne.seek(Ne.currentTime)}let Ne=Zn({frameRate:60,autoplay:!1,onUpdate:Qe}),Ge=Zn({duration:250,autoplay:!1,onComplete:Me}),Pt=!1;new ResizeObserver(ne=>{ne.length&&(Pt&&Ge.restart(),Pt=!0)}).observe(e),Ne.play();let le={};for(let ne in a.colors)le[ne]=new ye(a.colors[ne]);let ee=V.$("#features-gallery .feature-section");ee.forEach((ne,fe)=>{let at=ne.classList[ne.classList.length-1];Ce[fe].classList.add(at),He[fe].classList.add(at),Ke[fe].classList.add(at),We[fe].classList.add(at)});let ue=V.$("#features-gallery .home-section-text"),Te=V.$("#features-gallery .home-section-text-heading"),Se=H0(M),$e=et({defaults:{composition:"none"},autoplay:!1}),Bt=ne=>{Ie(".tick",{color:ne,duration:250,ease:"out(3)",composition:"none"}),Ie(T.circles,{color:ne,duration:250,ease:"out(3)",delay:ge(15,{from:"center",grid:x}),onUpdate:()=>T.render(),composition:"none"})};s.add("toggleText",(ne,fe)=>{s.matches.minM||Ie(ue[ne],{opacity:fe?.001:1,duration:250,ease:"inOut(3)"})}),ee.forEach((ne,fe)=>{let at=Ke[fe],Et=We[fe],Ot=Se[ne.dataset.demo],vn=Te[fe],Un=vn.querySelector("p"),di=vn.querySelector("h2"),nn=ne.querySelector("ul"),E=fe===ee.length-1;V.set(nn,{opacity:.001}),V.set([Un,di],{opacity:.5}),$e.call(H=>{let Q=H.backwards;at&&(Ot&&(Q?Ot.onLeave():Ot.onEnter()),Ie([at,Et],{opacity:Q?.001:1,duration:250,ease:"inOut(3)"}),Ie([Un,di],{opacity:Q?.5:1,duration:250,ease:"out(3)"}),s.matches.minM?Q?Ie(nn,{opacity:.001,duration:250,delay:.001,ease:"out(3)"}):(Ie(nn,{opacity:1,"--scaleX":{to:[0,1],duration:300,ease:"inOut(2.4)"},duration:350,ease:"inOut(3)"}),Ie(nn.querySelectorAll("li"),{opacity:[.001,1],duration:250,delay:ge(100,{start:350}),ease:"inOut(3)"}),Ie(nn.querySelectorAll("li .icon"),{translateX:["-.25rem",0],duration:250,delay:ge(100,{start:350}),ease:"inOut(3)",onComplete:V.cleanInlineStyles})):s.methods.toggleText(fe,Q)),ne.classList.toggle("is-in-view",!Q);let q=V.get(ne,"--hex-current-1");Bt(q)}).add(Je[fe],{draw:"0 1",ease:"linear"},fe?"<":0).add([Je[fe],He[fe]],{strokeWidth:[5,10],ease:"outQuart",duration:50},"<<"),fe&&$e.add([Je[fe-1],He[fe-1]],{strokeWidth:[10,5],ease:"outQuart",duration:50},"<<"),Ot&&Ot.syncable&&$e.add(Ot.syncable,{progress:1,ease:"linear"},"<<"),E&&$e.add([Je[Je.length-1],He[Je.length-1]],{strokeWidth:[10,5],ease:"outQuart",duration:50}),$e.call(H=>{let Q=H.backwards;at&&(Ot&&(Q?Ot.onEnter():Ot.onLeave()),Ie([at,Et],{opacity:Q?1:.001,duration:250,ease:"inOut(3)"}),Ie([Un,di],{opacity:Q?1:.5,duration:250,ease:"out(3)"}),s.matches.minM?Ie([nn],{opacity:Q?1:.001,duration:250,delay:Q?.001:150,ease:"out(3)"}):s.methods.toggleText(fe,!Q)),ne.classList.toggle("is-in-view",Q);let q=E&&!Q?V.get(ne,"--hex-red-1"):V.get(ne,"--hex-current-1");Bt(q)},"-=1")}),$e.init();let cn=V.$("[data-label]"),bt=bd("#intro h2",!0),Sn=bd("#intro p"),bn=V.$("[data-chapter]"),[Cn]=V.$(".scroll-bar"),gs=uo(".scroll-cursor-ghost",{x:150,scale:250,opacity:150}),Mi=["HTML","WebGL","CSS","Canvas 2D","SVG","anything"],Gs=0,Vs=null,Ma=()=>{let[ne]=V.$(".animate-anything");Fc(ne,"word","char");let fe=ne.querySelectorAll(".char");Vs=et({delay:1e3,onComplete:()=>{let[at]=V.$(".animate-anything");at.innerHTML=Mi[Gs++],Gs>Mi.length-1&&(Gs=0),Fc(at,"word","char"),Vs=et({onComplete:()=>{Ma()}}).add(at.querySelectorAll(".char"),{opacity:[0,1],scaleX:[0,1],x:[10,0],duration:150,delay:ge(25,{from:"first",ease:"in(3)",start:100})},0).add(".animate-anything-dot",{x:[-at.offsetWidth,0],scaleX:[8,1],transformOrigin:["0% 0%","0% 0%"],color:Et=>V.get(Et,"--hex-fg-2"),duration:fe.length*25+75,ease:"out(3)"},0).add({duration:750}).init()}}).add(fe,{opacity:0,scaleX:0,duration:100,delay:ge(25,{from:"last",ease:"in(3)"})},0).add(".animate-anything-dot",{x:-ne.offsetWidth,transformOrigin:["100% 0%","100% 0%"],scaleX:[4,1],duration:fe.length*25+100,color:at=>V.get(at,"--hex-red-1"),delay:50,ease:"out(3)"},0)};Sn.onComplete=Ma,bt.add("#intro .home-section-text h2 .red-dot",{x:[".25em","0em"],opacity:[0,1],color:{from:"#FFF"},duration:300,ease:"inOut(3)"},550).add("#intro .home-section-text h2 .red-dot",{color:ne=>V.get(ne,"--hex-fg-1"),duration:1500},"<+=500").init();let Ws=ne=>{let fe=Cn.getBoundingClientRect(),at=ne.clientX-fe.left;return V.snap(1/65).round(4).clamp(0,1)(at/fe.width)};s.add("showCard",ne=>{ne.querySelector("code")&&!s.matches.minM||Ie(ne,{y:0,opacity:1,ease:"inOut(3)",duration:350})}),s.add("hideCard",ne=>{ne.querySelector("code")&&!s.matches.minM||Ie(ne,{y:"120%",opacity:0,ease:"inOut(3)",duration:250})}),bn.forEach((ne,fe)=>{let at=document.createElement("a");at.setAttribute("href","#"+ne.getAttribute("id"));let Et=document.querySelector(`[data-card="${ne.dataset.chapter}"]`);if(at.classList.add("scroll-button"),at.dataset.index=fe+"",Cn.appendChild(at),Et){let Ot=Et.getAttribute("data-enter-offset")||"",vn=Et.getAttribute("data-leave-offset")||"";V.set(Et,{y:"120%",opacity:0}),Sr({target:ne,enter:"top top"+Ot,leave:"top bottom"+vn,onEnter:()=>{s.methods.showCard(Et)},onLeave:()=>{s.methods.hideCard(Et)}})}});let Vc=V.$(".scroll-button");s.add(({matches:ne,data:fe})=>{let at=25;r.camera.position.z=ne.minM?120:180,u.z=ne.minM?52:90,u.rotateX=0,u.rotateY=0,c.z=at,l.z=-5,V.set([".clock",G.$canvas,N.$canvas],{z:ge(15)}),V.set([y.$canvas,N.circles,T.circles],{scale:.001}),V.set([".output-progress-bg",".clock"],{opacity:1}),V.set([o.caseBackVentObjects,o.caseFrontVentObjects],{rotateZ:0,opacity:1}),V.set(["#intro .home-section-text","#site-header",".heading-links .ui-group",".heading-sponsors"],{opacity:.001}),Ee.pause().seek(0),bt.pause().seek(0),Sn.pause().seek(0),y.render(),N.render(),G.render(),T.render(),Vs&&Vs.cancel();let Et=et({autoplay:!1,defaults:{ease:"inOut(3)"}}).label("INTRO").label("INTRO_ON",1400);V.set([a.outlineShaderMaterial.uniforms.outlineColor.value,a.outlineShaderMaterial.uniforms.rimColor.value,a.outlineShaderMaterial.uniforms.shadowColor.value,a.outlineShaderMaterial.uniforms.worldColor1.value,a.outlineShaderMaterial.uniforms.backgroundColor.value],{r:0,g:0,b:0}),Et.add(a.outlineShaderMaterial.uniforms.outlineColor.value,{r:le.outlineColor.r,g:le.outlineColor.g,b:le.outlineColor.b},"INTRO+=1000").add(a.outlineShaderMaterial.uniforms.rimColor.value,{r:le.rimColor.r,g:le.rimColor.g,b:le.rimColor.b,duration:2500},"INTRO+=500").add(a.outlineShaderMaterial.uniforms.shadowColor.value,{r:le.shadowColor.r,g:le.shadowColor.g,b:le.shadowColor.b,duration:3e3},"INTRO").add(a.outlineShaderMaterial.uniforms.worldColor1.value,{r:le.worldColor1.r,g:le.worldColor1.g,b:le.worldColor1.b,duration:3e3},"INTRO").add(a.outlineShaderMaterial.uniforms.backgroundColor.value,{r:le.backgroundColor.r,g:le.backgroundColor.g,b:le.backgroundColor.b,duration:3e3},"INTRO").add(document.body,{backgroundColor:a.colors.backgroundColor,duration:3e3},"INTRO"),n.enabled||Et.add(re,{x:{from:100},duration:3e3},"INTRO"),Et.add(".tick",{opacity:[{from:0,to:1,duration:10},{to:(ke,ut,dt)=>ut!==dt-1?.4:0,duration:1e3}],ease:"out(3)",delay:ge([0,500],{ease:"outIn(2)"})},"INTRO").add(".output-progress-bg path",{opacity:[0,1,0,1,0,1],duration:200,ease:"steps(5)",delay:ge([0,400],{modifier:ke=>V.clamp(V.random(-250,250)+ke,0,800)})},"<-=1000").add(T.circles,{opacity:{from:0,to:ge([.5,0],{grid:x,from:_,ease:"out(2)"})},scale:[{from:0,to:4},{to:1}],duration:400,ease:"out(3)",delay:ge(100,{from:"center",grid:x}),onUpdate:()=>{T.render()}},"<-=500"),Et.add(N.circles,{scale:1,composition:"none",ease:"inOutQuad",duration:200,delay:ge(14,{from:"center",ease:"outIn(1)"}),onUpdate:()=>{N.render()}},"<<+=500").call(()=>Ee.play(),"<").call(()=>bt.play(),"INTRO_ON").call(()=>Sn.play(),"INTRO_ON+=500").add("#intro .home-section-text",{opacity:1,duration:100},"INTRO_ON").add(["#site-header",".heading-links .ui-group",".heading-sponsors"],{opacity:1,duration:350},"INTRO_ON+=500").add(u,{z:ne.minM?58:92,duration:1500},"INTRO_ON-=500").label("INTRO_END").label("HEADING").label("HEADING_CASE","HEADING+=250").add(u,{z:{to:ne.minM?15:-50,ease:"out(3)"},rotateX:{to:90,ease:"out(3)"},rotateY:{to:-135,ease:"inOut(2)"}},"HEADING").add(".heading-links",{y:200,opacity:{to:0,duration:150,delay:150},ease:"linear",duration:250},"HEADING").add([N.$canvas,G.$canvas],{scale:.001,duration:150},"HEADING+=250").add([".output-progress-bg",".clock"],{opacity:[1,.001],duration:50},"<<").call(({backwards:ke})=>Ee[ke?"play":"pause"](),"<").add(o.case01Objects,{rotateZ:[180,0],duration:300,ease:"inOut(3)"},"HEADING+=100").add(o.modulesObjects.renderer,{rotateZ:-360,duration:300},"HEADING+=100").add(o.case02BackObjects[0],{x:-8,y:8,scale:0,duration:300},"HEADING_CASE+=100").add(o.case02BackObjects[1],{x:8,y:-8,scale:0,duration:300},"HEADING_CASE+=100").add(o.case02BackObjects[2],{x:-8,y:-8,scale:{to:0,duration:50},duration:300},"HEADING_CASE+=100").add(o.case02FrontObjects[0],{x:-8,y:8,scale:0,duration:300},"HEADING_CASE+=0").add(o.case02FrontObjects[1],{x:8,y:-8,scale:0,duration:300},"HEADING_CASE+=0").add(o.case02FrontObjects[2],{x:-8,y:-8,scale:{to:0,duration:50},duration:300},"HEADING_CASE+=0").add(o.case01Objects[0],{x:-8,y:8,scale:0,duration:300},"HEADING_CASE+=50").add(o.case01Objects[2],{x:8,y:-8,scale:0,duration:300},"HEADING_CASE+=50").add(o.case01Objects[3],{x:-8,y:-8,scale:{to:0,duration:50},duration:300},"HEADING_CASE+=50").add(o.modulesObjects.renderer,{z:3.25,duration:300},"HEADING_CASE").add(o.modulesObjects.waapi,{z:2.75,duration:300},"HEADING_CASE+=50").add(c,{z:at+5,duration:300},"HEADING_CASE").add(o.modulesObjects.scope,{z:-2.4,duration:300},"HEADING_CASE+=50").add([o.caseBackVentObjects,o.caseFrontVentObjects],{rotateZ:-200,duration:300,opacity:{to:0,duration:0,delay:ge(2,{from:"last",start:175})},delay:ge(2,{from:"last"})},"HEADING_CASE+=50").add(Dt,{opacity:[0,1],duration:250,ease:"out(3)",delay:ge(10,{from:"last"})},"HEADING+=700").add(L,{draw:["0 0","0 1"],duration:250,ease:"out(3)",delay:ge(10,{from:"last"})},"<<+=50").call(({backwards:ke})=>{ke||r.lines.updateDimensions()},"<<").label("HEADING_END").label("TOOLBOX").add(u,{z:{to:ne.minM?55:92,ease:"inOut(3)"},rotateX:{to:0,ease:"inOut(2)"},rotateY:{to:-360,ease:"inOut(2)"}},"TOOLBOX").add(L,{draw:["0 1","0 0"],duration:250,ease:"out(3)",delay:ge(10)},"TOOLBOX+=200").add(Dt,{opacity:[1,0],duration:250,ease:"inOut(3)",delay:ge(10)},"<<+=50").call(({backwards:ke})=>{ke&&r.lines.updateDimensions()},"<<").add([".output-progress-bg"],{opacity:.2,duration:50},"<+=400").add([".clock","#features-gallery"],{opacity:1,duration:50},"<<").label("TOOLBOX_END").label("FEATURES").label("FEATURES_END").label("MODULES").label("MODULES_TRANSFORM","MODULES+=590").label("MODULES_SHRINK","MODULES+=1250").label("MODULES_CASE","MODULES+=1900").label("MODULES_ROTATION","MODULES+=1750").add([".output-progress-bg",".output-progress",".clock",T.$canvas],{opacity:.001,duration:500},"MODULES+=100").add(u,{z:ne.minM?20:-15,duration:1e3},"MODULES").add(u,{rotateX:45,duration:1e3},"MODULES").add(u,{rotateY:-720,duration:1625},"MODULES_ROTATION").add(u,{z:57,rotateX:0,duration:1625},"MODULES_ROTATION").add(l,{z:2,duration:1e3},"MODULES_ROTATION").add([o.modulesObjects.waapi,o.modulesObjects.timeline,o.modulesObjects.svg,o.modulesObjects.spring,o.modulesObjects.draggable,o.modulesObjects.scroll],{x:(ke,ut)=>ut%2?-2.5:2.5,y:(ke,ut)=>(ut%2,0),duration:750},ge(25,{start:"MODULES_TRANSFORM",reversed:!1})).add(".module-label-text div",{opacity:[0,1],scale:[0,1],ease:"inOut(2)",duration:200,delay:ge(10)},"MODULES_TRANSFORM+=450").add([o.modulesObjects.waapi,o.modulesObjects.timeline,o.modulesObjects.svg,o.modulesObjects.spring,o.modulesObjects.draggable,o.modulesObjects.scroll],{rotateY:(ke,ut)=>ut%2?-90:90,scale:0,duration:1e3},ge(25,{start:"MODULES_SHRINK",reversed:!1})).add([".chart-bar.module-waapi",".chart-bar.module-timeline",".chart-bar.module-svg",".chart-bar.module-spring",".chart-bar.module-draggable",".chart-bar.module-scroll"],{width:"0%",ease:"linear",duration:1e3},ge(25,{start:"MODULES_SHRINK",reversed:!1})).add([".module-label-text.module-waapi .size",".module-label-text.module-timeline .size",".module-label-text.module-svg .size",".module-label-text.module-spring .size",".module-label-text.module-draggable .size",".module-label-text.module-scroll .size"],{innerHTML:"0",ease:"linear",modifier:V.roundPad(2),duration:1e3},ge(25,{start:"MODULES_SHRINK",reversed:!1})).add([".module-label-text.module-waapi div",".module-label-text.module-timeline div",".module-label-text.module-svg div",".module-label-text.module-spring div",".module-label-text.module-draggable div",".module-label-text.module-scroll div",".module-label-text div"],{scale:0,ease:"inOut(2)",duration:200,delay:ge(40)},"<-=400").add(pe,{innerHTML:w,ease:"linear",modifier:V.roundPad(2),duration:1e3},"MODULES_SHRINK").add(o.modulesObjects.waapi,{z:2.5,duration:500,ease:"inOut(3)"},"MODULES_TRANSFORM").add(o.modulesObjects.renderer,{z:1.5,duration:2e3,ease:"inOut(3)"},"MODULES_TRANSFORM+=400").add(c,{z:at-5.5,duration:2e3,ease:"inOut(3)"},"MODULES_TRANSFORM+=400").add(o.modulesObjects.stagger,{z:1.12,duration:1500,ease:"inOut(3)"},"MODULES_TRANSFORM+=500").add(o.modulesObjects.engine,{z:-1.2,duration:1500,ease:"inOut(3)"},"MODULES_TRANSFORM+=700").add(o.modulesObjects.scope,{z:-1.12,duration:1500,ease:"inOut(3)"},"MODULES_TRANSFORM+=750").add(o.case02BackObjects[0],{x:0,y:0,z:.7,scale:{to:1,duration:100},scaleZ:{to:.5125,duration:100},ease:"out(3)"},"MODULES_CASE+=200").add(o.case02BackObjects[1],{x:0,y:0,z:.7,scale:{to:1,duration:100},scaleZ:{to:.5125,duration:100},ease:"out(3)"},"MODULES_CASE+=200").add(o.case02BackObjects[2],{x:0,y:0,z:.7,scale:{to:1,duration:100},scaleZ:{to:.5125,duration:100},ease:"out(3)"},"MODULES_CASE+=200").add(o.case02FrontObjects[0],{x:0,y:0,z:0,scale:{to:1,duration:100},scaleZ:{to:.5125,duration:100},ease:"out(3)"},"MODULES_CASE+=100").add(o.case02FrontObjects[1],{x:0,y:0,z:0,scale:{to:1,duration:100},scaleZ:{to:.5125,duration:100},ease:"out(3)"},"MODULES_CASE+=100").add(o.case02FrontObjects[2],{x:0,y:0,z:0,scale:{to:1,duration:100},scaleZ:{to:.5125,duration:100},ease:"out(3)"},"MODULES_CASE+=100").add(o.case01Objects[0],{x:0,y:0,z:-.6,scale:{to:1,duration:100},scaleZ:{to:.5125,duration:100},ease:"out(3)"},"MODULES_CASE+=0").add(o.case01Objects[2],{x:0,y:0,z:-.6,scale:{to:1,duration:100},scaleZ:{to:.5125,duration:100},ease:"out(3)"},"MODULES_CASE+=0").add(o.case01Objects[3],{x:0,y:0,z:-.6,scale:{to:1,duration:100},scaleZ:{to:.5125,duration:100},ease:"out(3)"},"MODULES_CASE+=0").add([o.caseBackVentObjects[7],o.caseBackVentObjects[8],o.caseBackVentObjects[9],o.caseBackVentObjects[10],o.caseBackVentObjects[11],o.caseBackVentObjects[12],o.caseBackVentObjects[13],o.caseBackVentObjects[14],o.caseFrontVentObjects[0],o.caseFrontVentObjects[1],o.caseFrontVentObjects[2],o.caseFrontVentObjects[3],o.caseFrontVentObjects[4],o.caseFrontVentObjects[5],o.caseFrontVentObjects[6],o.caseFrontVentObjects[7]],{rotateZ:0,scale:1,ease:"out(3)",opacity:{to:1,duration:0,delay:ge(10,{from:"last",start:150})},delay:ge(10,{from:"last"})},"MODULES_CASE").add(u,{z:ne.minM?64:100,duration:2e3},"MODULES_CASE").call(({backwards:ke})=>{ke?ie.pause():ie.restart()},"-=500").add([".output-progress-bg",".output-progress",".clock"],{opacity:1,duration:500},"<<").add([y.$canvas],{scale:1,duration:500},"<<").label("MODULES_END").label("SPONSORS").label("SPONSORS_END").label("GET_STARTED").add(u,{rotateX:100,z:{to:60,ease:"out(3)"},duration:4e3,ease:"in(2)"},"GET_STARTED").add(u,{y:ne.minM?38:100,ease:"in(2)",duration:4e3},"GET_STARTED+=350").add(c,{z:at-5,duration:1e3},"GET_STARTED").label("GET_STARTED_END").init();let Ot={currentTime:0,progress:0},vn=et({autoplay:!1,defaults:{ease:"linear"}}),Un=Ie(Ot,{currentTime:[Et.labels.INTRO,Et.labels.INTRO_END],composition:"none",ease:"linear",duration:4e3,onUpdate:()=>{Et.seek(Ot.currentTime)}}),di=et({autoplay:!1,defaults:{ease:"linear"}}),nn=ke=>{vn.progress=ke,document.scrollingElement.scrollTop=(document.body.scrollHeight-window.innerHeight)*Ot.progress},E=ke=>{let ut=ke.target;ut&&!ut.classList.contains("scroll-cursor")&&nn(Ws(ke))},H=()=>{gs.opacity(0),gs.scale(0)},Q=()=>{gs.opacity(1),gs.scale(1)},q=!0,W=()=>{!q||(V.set(".sub-nav",{pointerEvents:"auto"}),q=!1,et().add(".home-progress-card",{opacity:1,y:["100%",0],duration:250}).add(".home-progress-card .scroll-button",{opacity:[0,.5],duration:250,delay:ge(20)}).add(".home-progress-card .scroll-cursor:not(.scroll-cursor-ghost)",{opacity:[0,1],scale:[0,1.2,1],duration:250,delay:ge(50)},"<<+=250").init())},de=()=>{q||(V.set(".sub-nav",{pointerEvents:"none"}),q=!0,et().add(".home-progress-card",{opacity:0,y:"100%",duration:250}).init())};V.set(".scroll-cursor",{x:0,scale:1});let xe=()=>{Ie(".scroll-cursor",{scale:1.25,duration:250})},we=()=>{Ie(".scroll-cursor",{scale:1,duration:150})},be=hs(".scroll-cursor",{y:!1,container:".scroll-bar",containerFriction:1,containerPadding:[0,-1,0,-1],onGrab:()=>{xe(),H()},onRelease:ke=>{we(),ke.progressX<.02||ke.progressX>.98?de():W()},onUpdate:ke=>{ke.grabbed&&nn(ke.progressX)}}),tt=ke=>{let ut=ke.target;ut&&!ut.classList.contains("scroll-cursor")&&!be.grabbed?(gs.x(Ws(ke)*Cn.offsetWidth-2),Q()):H()};be.progressX=0;let it=et({defaults:{ease:"linear"},onBegin:()=>{Un.completed||Un.pause()},autoplay:Sr({target:document.body,sync:.9,enter:"max",leave:"min",onUpdate:({progress:ke})=>{Et.seek(Ot.currentTime),be.grabbed||(di.progress=ke,ke<.02||ke>.98?de():W())}})}),Ye=bn.reduce((ke,ut)=>ke+ut.offsetHeight,0),xt=0,_t=0;return bn.forEach((ke,ut)=>{di.add(be,{progressX:1/bn.length*(ut+1),duration:+ke.offsetHeight}),_t+=ke.offsetHeight,xt+=ke.offsetHeight;let dt=xt/Ye;vn.add(Ot,{progress:dt,duration:1e4/bn.length}),nn(Ot.progress)}),_t=0,cn.forEach((ke,ut)=>{let dt=ke.getAttribute("data-label");it.add(Ot,{composition:"none",currentTime:[Et.labels[dt],Et.labels[dt+"_END"]],duration:ke.offsetHeight},_t),_t+=ke.offsetHeight}),Cn.addEventListener("click",E),Cn.addEventListener("mousemove",tt),Cn.addEventListener("mouseenter",Q),Cn.addEventListener("mouseleave",H),be.$target.addEventListener("mouseenter",xe),be.$target.addEventListener("mouseleave",we),()=>{Cn.removeEventListener("click",E),Cn.removeEventListener("mousemove",tt),Cn.removeEventListener("mouseenter",Q),Cn.removeEventListener("mouseleave",H),be.$target.removeEventListener("mouseenter",xe),be.$target.removeEventListener("mouseleave",we)}}),Sr({target:"#features-gallery",container:document.body,sync:.9,enter:()=>"top top-=1",leave:()=>"bottom bottom+=100lvh"}).link($e),Le.forEach((ne,fe)=>{let at=ne.classList.contains("home-section-light"),Et=ne.getAttribute("data-enter-offset")||"",Ot=ne.getAttribute("data-leave-offset")||"",vn=ne.querySelector(".fixed-section"),Un=250,di="inOutQuad";Sr({target:ne,container:document.body,enter:"top top"+Et,leave:"bottom bottom"+Ot,onUpdate:()=>{at&&(r.labelsRenderer.render(r.scene,r.camera),r.lines.update())},onEnter:()=>{let nn=vn||null;nn&&(V.set(nn,{pointerEvents:"auto"}),Ie(nn,{opacity:1,duration:350,ease:"linear"})),at&&(document.body.classList.add("is-light"),et({defaults:{duration:Un,ease:di}}).add(document.body,{backgroundColor:a.colors.worldColorLight1},0).add([a.outlineShaderMaterial.uniforms.outlineBlend,a.outlineShaderMaterial.uniforms.contourBlend],{value:.35},0).add([a.outlineShaderMaterial.uniforms.rimColor.value,a.outlineShaderMaterial.uniforms.worldColor1.value,a.outlineShaderMaterial.uniforms.shadowColor.value,a.outlineShaderMaterial.uniforms.backgroundColor.value],{r:le.worldColorLight1.r,g:le.worldColorLight1.g,b:le.worldColorLight1.b},0).add([a.outlineShaderMaterial.uniforms.outlineColor.value],{r:le.outlineColorLight.r,g:le.outlineColorLight.g,b:le.outlineColorLight.b},0))},onLeave:()=>{let nn=vn||null;nn&&(V.set(nn,{pointerEvents:"none"}),Ie(nn,{opacity:.001,duration:350,ease:"linear"})),at&&(document.body.classList.remove("is-light"),et({defaults:{duration:Un,ease:di}}).add(document.body,{backgroundColor:a.colors.backgroundColor},0).add([a.outlineShaderMaterial.uniforms.outlineBlend],{value:.4},0).add([a.outlineShaderMaterial.uniforms.contourBlend],{value:.65},0).add(a.outlineShaderMaterial.uniforms.rimColor.value,{r:le.rimColor.r,g:le.rimColor.g,b:le.rimColor.b},0).add(a.outlineShaderMaterial.uniforms.shadowColor.value,{r:le.shadowColor.r,g:le.shadowColor.g,b:le.shadowColor.b},0).add(a.outlineShaderMaterial.uniforms.worldColor1.value,{r:le.worldColor1.r,g:le.worldColor1.g,b:le.worldColor1.b},0).add(a.outlineShaderMaterial.uniforms.backgroundColor.value,{r:le.backgroundColor.r,g:le.backgroundColor.g,b:le.backgroundColor.b},0).add(a.outlineShaderMaterial.uniforms.outlineColor.value,{r:le.outlineColor.r,g:le.outlineColor.g,b:le.outlineColor.b},0))}})})}function V0(i){if(!i||i.classList.contains("is-responvie"))return;let e=i.getElementsByTagName("th");for(let s=0;s<e.length;s++)e[s].setAttribute("scope","col");let n=i.getElementsByTagName("tbody")[0].getElementsByTagName("tr");for(let s=0;s<n.length;s++){let r=n[s].getElementsByTagName("td");for(let a=0;a<r.length;a++)r[a].setAttribute("data-label",e[a].innerText),a===0&&r[a].setAttribute("scope","row")}i.classList.add("responsive-table")}var Rd=(i,e,t,n="_prev",s="_next")=>{let r=i._head,a=s;for(t&&(r=i._tail,a=n);r;){let o=r[a];e(r),r=o}};function W0(i,e){let t=i.root.parentNode.parentNode,[n]=t.querySelectorAll(".docs-demo-html"),[s,r]=t.querySelectorAll(".viewer"),a=e._delay+e.iterationDuration+e._loopDelay,o=a-e._delay,l=e._loopDelay?e._loopDelay/2:0,c=n.offsetWidth-6,u=e._hasChildren;if(!t.classList.contains("has-viewer")){t.classList.add("has-viewer");let d="";if(u){let p=e.labels,g=0;d+='<div class="medium tl-viewer row">',Rd(e,v=>{let m=V.round(v._offset,1),f=v.targets,x="",_="";if(p)for(let M in p){let R=p[M];if(m===R){_=` data-label="${M}"`;break}}if(f&&f.length){let M=f[0],C=(M.targets?M.targets[0]:M).classList;if(C){let[b]=C;x+=`<span class="label-${b}">`,x+="</span>"}}let y=v.duration,T=v._offset;if(y<1){let M=v._next;M?y=M._offset-v._offset:y=0}g+=y,d+=`
          <div class="tl-child${_?" label":""}" style="
            left: ${T/o*100}%;
            width: ${y/o*100}%
          "${_}>${x}</div>
        `}),d+="</div>"}else Rd(e,p=>{let g=p.property,v=p._delay,m=`<div class="medium tween-viewer row ${g}">`;e._delay&&(m+=`<span class="label anim-delay" style="width:${e._delay/a*100}%">delay</span>`),l&&(m+=`<span class="label anim-loop-delay-1" style="width:${l/a*100}%">loopDelay</span>`),v&&(m+=`<span class="label tween-delay" style="width:${v/a*100}%"></span>`),m+=`<span class="label tween-duration" style="width:${p._updateDuration/a*100}%">${g}</span>`,l&&(m+=`<span class="label anim-loop-delay-2" style="width:${l/a*100}%">loopDelay</span>`),m+="</div>",d+=m});r.innerHTML=d,s.innerHTML=d}let h;return Rd(e,d=>{if(u){let p=s.querySelector(".tl-viewer");V.set(p,{"--x":"-2px"});let g=0,v=1e3/o;h=et({playbackRate:v,delay:e._delay*v,loop:e.iterationCount-1,alternate:e._alternate,defaults:{ease:"linear"}}).add(p.querySelectorAll(".tl-child"),{opacity:[{from:.5,to:1,duration:m=>m.offsetLeft/m.parentNode.offsetWidth*1e3},{to:.5,duration:m=>parseFloat(m.style.width)*10}],ease:"steps(1)"},g).add(p,{"--x":m=>[0,m.offsetWidth-1-2+"px"]},g)}else{h=et({defaults:{ease:"linear"}});let p=d._delay,g=s.querySelector("."+d.property),v=0;V.set(d,{"--x":`-${v}px`,width:"100%"});let m=e._delay/a,f=l/a,x=p/a,_=d._updateDuration/a,y=1-(m+x+_+f*2);m&&(h.add(g,{"--x":"+="+V.round(m*c,1)+"px",duration:m*a,composition:"none"},0),h.add(g.querySelector(".anim-delay"),{opacity:[{to:1,duration:0},{to:.5,duration:1,delay:m*a}]},0));let T=et({defaults:{ease:"linear"},autoplay:!1}).label("tweenStart",0).label("tweenFirstLoopDelayEnd",f*a).label("tweenDelayEnd",(f+x)*a).label("tweenDurationEnd",(f+x+_)*a).add(g,{"--x":{from:V.round(m*c,1)-v+"px",to:"+="+V.round(f*c,1)},duration:f*a,composition:"none"},"tweenStart");l&&T.add(g.querySelector(".anim-loop-delay-1"),{opacity:[{to:1,duration:0},{to:.5,duration:1,delay:f*a}]},"tweenStart"),T.add(g,{"--x":{from:V.round((m+f)*c,1)-v+"px",to:"+="+x*c},duration:x*a},"tweenFirstLoopDelayEnd"),x&&T.add(g.querySelector(".tween-delay"),{opacity:[{to:1,duration:0},{to:.5,duration:1,delay:x*a}]},"tweenFirstLoopDelayEnd"),T.add(g,{"--x":{to:"+="+V.round(_*c,1)},duration:_*a},"tweenDelayEnd").add(g.querySelector(".tween-duration"),{opacity:[{to:1,duration:0},{to:.5,duration:1,delay:_*a}]},"tweenDelayEnd").add(g,{"--x":{to:"+="+f*c},duration:f*a},"tweenDurationEnd"),l&&T.add(g.querySelector(".anim-loop-delay-2"),{opacity:[{to:1,duration:0},{to:.5,duration:1,delay:f*a}]},"tweenDurationEnd"),y&&T.add({duration:y*a}),h.add(T,{progress:[0,1],loop:e.iterationCount-1,alternate:e._alternate,duration:(x+_+y+f*2)*a,ease:"linear"},m*a),l&&h.seek(f*a)}}),h}function ps(i){return Array.isArray?Array.isArray(i):Q0(i)==="[object Array]"}var ST=1/0;function bT(i){if(typeof i=="string")return i;let e=i+"";return e=="0"&&1/i==-ST?"-0":e}function ET(i){return i==null?"":bT(i)}function ki(i){return typeof i=="string"}function X0(i){return typeof i=="number"}function TT(i){return i===!0||i===!1||MT(i)&&Q0(i)=="[object Boolean]"}function Y0(i){return typeof i=="object"}function MT(i){return Y0(i)&&i!==null}function Kn(i){return i!=null}function Dd(i){return!i.trim().length}function Q0(i){return i==null?i===void 0?"[object Undefined]":"[object Null]":Object.prototype.toString.call(i)}var wT="Incorrect 'index' type",CT=i=>`Invalid value for key ${i}`,RT=i=>`Pattern length exceeds max of ${i}.`,DT=i=>`Missing ${i} property in key`,PT=i=>`Property 'weight' in key '${i}' must be a positive integer`,q0=Object.prototype.hasOwnProperty,j0=class{constructor(e){this._keys=[],this._keyMap={};let t=0;e.forEach(n=>{let s=Z0(n);t+=s.weight,this._keys.push(s),this._keyMap[s.id]=s,t+=s.weight}),this._keys.forEach(n=>{n.weight/=t})}get(e){return this._keyMap[e]}keys(){return this._keys}toJSON(){return JSON.stringify(this._keys)}};function Z0(i){let e=null,t=null,n=null,s=1,r=null;if(ki(i)||ps(i))n=i,e=K0(i),t=Pd(i);else{if(!q0.call(i,"name"))throw new Error(DT("name"));let a=i.name;if(n=a,q0.call(i,"weight")&&(s=i.weight,s<=0))throw new Error(PT(a));e=K0(a),t=Pd(a),r=i.getFn}return{path:e,id:t,weight:s,src:n,getFn:r}}function K0(i){return ps(i)?i:i.split(".")}function Pd(i){return ps(i)?i.join("."):i}function IT(i,e){let t=[],n=!1,s=(r,a,o)=>{if(!!Kn(r))if(!a[o])t.push(r);else{let l=a[o],c=r[l];if(!Kn(c))return;if(o===a.length-1&&(ki(c)||X0(c)||TT(c)))t.push(ET(c));else if(ps(c)){n=!0;for(let u=0,h=c.length;u<h;u+=1)s(c[u],a,o+1)}else a.length&&s(c,a,o+1)}};return s(i,ki(e)?e.split("."):e,0),n?t:t[0]}var LT={includeMatches:!1,findAllMatches:!1,minMatchCharLength:1},FT={isCaseSensitive:!1,includeScore:!1,keys:[],shouldSort:!0,sortFn:(i,e)=>i.score===e.score?i.idx<e.idx?-1:1:i.score<e.score?-1:1},UT={location:0,threshold:.6,distance:100},NT={useExtendedSearch:!1,getFn:IT,ignoreLocation:!1,ignoreFieldNorm:!1,fieldNormWeight:1},rt={...FT,...LT,...UT,...NT},BT=/[^ ]+/g;function OT(i=1,e=3){let t=new Map,n=Math.pow(10,e);return{get(s){let r=s.match(BT).length;if(t.has(r))return t.get(r);let a=1/Math.pow(r,.5*i),o=parseFloat(Math.round(a*n)/n);return t.set(r,o),o},clear(){t.clear()}}}var zc=class{constructor({getFn:e=rt.getFn,fieldNormWeight:t=rt.fieldNormWeight}={}){this.norm=OT(t,3),this.getFn=e,this.isCreated=!1,this.setIndexRecords()}setSources(e=[]){this.docs=e}setIndexRecords(e=[]){this.records=e}setKeys(e=[]){this.keys=e,this._keysMap={},e.forEach((t,n)=>{this._keysMap[t.id]=n})}create(){this.isCreated||!this.docs.length||(this.isCreated=!0,ki(this.docs[0])?this.docs.forEach((e,t)=>{this._addString(e,t)}):this.docs.forEach((e,t)=>{this._addObject(e,t)}),this.norm.clear())}add(e){let t=this.size();ki(e)?this._addString(e,t):this._addObject(e,t)}removeAt(e){this.records.splice(e,1);for(let t=e,n=this.size();t<n;t+=1)this.records[t].i-=1}getValueForItemAtKeyId(e,t){return e[this._keysMap[t]]}size(){return this.records.length}_addString(e,t){if(!Kn(e)||Dd(e))return;let n={v:e,i:t,n:this.norm.get(e)};this.records.push(n)}_addObject(e,t){let n={i:t,$:{}};this.keys.forEach((s,r)=>{let a=s.getFn?s.getFn(e):this.getFn(e,s.path);if(!!Kn(a)){if(ps(a)){let o=[],l=[{nestedArrIndex:-1,value:a}];for(;l.length;){let{nestedArrIndex:c,value:u}=l.pop();if(!!Kn(u))if(ki(u)&&!Dd(u)){let h={v:u,i:c,n:this.norm.get(u)};o.push(h)}else ps(u)&&u.forEach((h,d)=>{l.push({nestedArrIndex:d,value:h})})}n.$[r]=o}else if(ki(a)&&!Dd(a)){let o={v:a,n:this.norm.get(a)};n.$[r]=o}}}),this.records.push(n)}toJSON(){return{keys:this.keys,records:this.records}}};function J0(i,e,{getFn:t=rt.getFn,fieldNormWeight:n=rt.fieldNormWeight}={}){let s=new zc({getFn:t,fieldNormWeight:n});return s.setKeys(i.map(Z0)),s.setSources(e),s.create(),s}function kT(i,{getFn:e=rt.getFn,fieldNormWeight:t=rt.fieldNormWeight}={}){let{keys:n,records:s}=i,r=new zc({getFn:e,fieldNormWeight:t});return r.setKeys(n),r.setIndexRecords(s),r}function Hc(i,{errors:e=0,currentLocation:t=0,expectedLocation:n=0,distance:s=rt.distance,ignoreLocation:r=rt.ignoreLocation}={}){let a=e/i.length;if(r)return a;let o=Math.abs(n-t);return s?a+o/s:o?1:a}function zT(i=[],e=rt.minMatchCharLength){let t=[],n=-1,s=-1,r=0;for(let a=i.length;r<a;r+=1){let o=i[r];o&&n===-1?n=r:!o&&n!==-1&&(s=r-1,s-n+1>=e&&t.push([n,s]),n=-1)}return i[r-1]&&r-n>=e&&t.push([n,r-1]),t}var Rr=32;function HT(i,e,t,{location:n=rt.location,distance:s=rt.distance,threshold:r=rt.threshold,findAllMatches:a=rt.findAllMatches,minMatchCharLength:o=rt.minMatchCharLength,includeMatches:l=rt.includeMatches,ignoreLocation:c=rt.ignoreLocation}={}){if(e.length>Rr)throw new Error(RT(Rr));let u=e.length,h=i.length,d=Math.max(0,Math.min(n,h)),p=r,g=d,v=o>1||l,m=v?Array(h):[],f;for(;(f=i.indexOf(e,g))>-1;){let R=Hc(e,{currentLocation:f,expectedLocation:d,distance:s,ignoreLocation:c});if(p=Math.min(R,p),g=f+u,v){let C=0;for(;C<u;)m[f+C]=1,C+=1}}g=-1;let x=[],_=1,y=u+h,T=1<<u-1;for(let R=0;R<u;R+=1){let C=0,b=y;for(;C<b;)Hc(e,{errors:R,currentLocation:d+b,expectedLocation:d,distance:s,ignoreLocation:c})<=p?C=b:y=b,b=Math.floor((y-C)/2+C);y=b;let S=Math.max(1,d-b+1),D=a?h:Math.min(d+b,h)+u,U=Array(D+2);U[D+1]=(1<<R)-1;for(let B=D;B>=S;B-=1){let G=B-1,N=t[i.charAt(G)];if(v&&(m[G]=+!!N),U[B]=(U[B+1]<<1|1)&N,R&&(U[B]|=(x[B+1]|x[B])<<1|1|x[B+1]),U[B]&T&&(_=Hc(e,{errors:R,currentLocation:G,expectedLocation:d,distance:s,ignoreLocation:c}),_<=p)){if(p=_,g=G,g<=d)break;S=Math.max(1,2*d-g)}}if(Hc(e,{errors:R+1,currentLocation:d,expectedLocation:d,distance:s,ignoreLocation:c})>p)break;x=U}let M={isMatch:g>=0,score:Math.max(.001,_)};if(v){let R=zT(m,o);R.length?l&&(M.indices=R):M.isMatch=!1}return M}function GT(i){let e={};for(let t=0,n=i.length;t<n;t+=1){let s=i.charAt(t);e[s]=(e[s]||0)|1<<n-t-1}return e}var Id=class{constructor(e,{location:t=rt.location,threshold:n=rt.threshold,distance:s=rt.distance,includeMatches:r=rt.includeMatches,findAllMatches:a=rt.findAllMatches,minMatchCharLength:o=rt.minMatchCharLength,isCaseSensitive:l=rt.isCaseSensitive,ignoreLocation:c=rt.ignoreLocation}={}){if(this.options={location:t,threshold:n,distance:s,includeMatches:r,findAllMatches:a,minMatchCharLength:o,isCaseSensitive:l,ignoreLocation:c},this.pattern=l?e:e.toLowerCase(),this.chunks=[],!this.pattern.length)return;let u=(d,p)=>{this.chunks.push({pattern:d,alphabet:GT(d),startIndex:p})},h=this.pattern.length;if(h>Rr){let d=0,p=h%Rr,g=h-p;for(;d<g;)u(this.pattern.substr(d,Rr),d),d+=Rr;if(p){let v=h-Rr;u(this.pattern.substr(v),v)}}else u(this.pattern,0)}searchIn(e){let{isCaseSensitive:t,includeMatches:n}=this.options;if(t||(e=e.toLowerCase()),this.pattern===e){let g={isMatch:!0,score:0};return n&&(g.indices=[[0,e.length-1]]),g}let{location:s,distance:r,threshold:a,findAllMatches:o,minMatchCharLength:l,ignoreLocation:c}=this.options,u=[],h=0,d=!1;this.chunks.forEach(({pattern:g,alphabet:v,startIndex:m})=>{let{isMatch:f,score:x,indices:_}=HT(e,g,v,{location:s+m,distance:r,threshold:a,findAllMatches:o,minMatchCharLength:l,includeMatches:n,ignoreLocation:c});f&&(d=!0),h+=x,f&&_&&(u=[...u,..._])});let p={isMatch:d,score:d?h/this.chunks.length:1};return d&&n&&(p.indices=u),p}},ms=class{constructor(e){this.pattern=e}static isMultiMatch(e){return $0(e,this.multiRegex)}static isSingleMatch(e){return $0(e,this.singleRegex)}search(){}};function $0(i,e){let t=i.match(e);return t?t[1]:null}var ev=class extends ms{constructor(e){super(e)}static get type(){return"exact"}static get multiRegex(){return/^="(.*)"$/}static get singleRegex(){return/^=(.*)$/}search(e){let t=e===this.pattern;return{isMatch:t,score:t?0:1,indices:[0,this.pattern.length-1]}}},tv=class extends ms{constructor(e){super(e)}static get type(){return"inverse-exact"}static get multiRegex(){return/^!"(.*)"$/}static get singleRegex(){return/^!(.*)$/}search(e){let n=e.indexOf(this.pattern)===-1;return{isMatch:n,score:n?0:1,indices:[0,e.length-1]}}},nv=class extends ms{constructor(e){super(e)}static get type(){return"prefix-exact"}static get multiRegex(){return/^\^"(.*)"$/}static get singleRegex(){return/^\^(.*)$/}search(e){let t=e.startsWith(this.pattern);return{isMatch:t,score:t?0:1,indices:[0,this.pattern.length-1]}}},iv=class extends ms{constructor(e){super(e)}static get type(){return"inverse-prefix-exact"}static get multiRegex(){return/^!\^"(.*)"$/}static get singleRegex(){return/^!\^(.*)$/}search(e){let t=!e.startsWith(this.pattern);return{isMatch:t,score:t?0:1,indices:[0,e.length-1]}}},sv=class extends ms{constructor(e){super(e)}static get type(){return"suffix-exact"}static get multiRegex(){return/^"(.*)"\$$/}static get singleRegex(){return/^(.*)\$$/}search(e){let t=e.endsWith(this.pattern);return{isMatch:t,score:t?0:1,indices:[e.length-this.pattern.length,e.length-1]}}},rv=class extends ms{constructor(e){super(e)}static get type(){return"inverse-suffix-exact"}static get multiRegex(){return/^!"(.*)"\$$/}static get singleRegex(){return/^!(.*)\$$/}search(e){let t=!e.endsWith(this.pattern);return{isMatch:t,score:t?0:1,indices:[0,e.length-1]}}},Ld=class extends ms{constructor(e,{location:t=rt.location,threshold:n=rt.threshold,distance:s=rt.distance,includeMatches:r=rt.includeMatches,findAllMatches:a=rt.findAllMatches,minMatchCharLength:o=rt.minMatchCharLength,isCaseSensitive:l=rt.isCaseSensitive,ignoreLocation:c=rt.ignoreLocation}={}){super(e);this._bitapSearch=new Id(e,{location:t,threshold:n,distance:s,includeMatches:r,findAllMatches:a,minMatchCharLength:o,isCaseSensitive:l,ignoreLocation:c})}static get type(){return"fuzzy"}static get multiRegex(){return/^"(.*)"$/}static get singleRegex(){return/^(.*)$/}search(e){return this._bitapSearch.searchIn(e)}},Fd=class extends ms{constructor(e){super(e)}static get type(){return"include"}static get multiRegex(){return/^'"(.*)"$/}static get singleRegex(){return/^'(.*)$/}search(e){let t=0,n,s=[],r=this.pattern.length;for(;(n=e.indexOf(this.pattern,t))>-1;)t=n+r,s.push([n,t-1]);let a=!!s.length;return{isMatch:a,score:a?0:1,indices:s}}},Ud=[ev,Fd,nv,iv,rv,sv,tv,Ld],av=Ud.length,VT=/ +(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/,WT="|";function XT(i,e={}){return i.split(WT).map(t=>{let n=t.trim().split(VT).filter(r=>r&&!!r.trim()),s=[];for(let r=0,a=n.length;r<a;r+=1){let o=n[r],l=!1,c=-1;for(;!l&&++c<av;){let u=Ud[c],h=u.isMultiMatch(o);h&&(s.push(new u(h,e)),l=!0)}if(!l)for(c=-1;++c<av;){let u=Ud[c],h=u.isSingleMatch(o);if(h){s.push(new u(h,e));break}}}return s})}var YT=new Set([Ld.type,Fd.type]),ov=class{constructor(e,{isCaseSensitive:t=rt.isCaseSensitive,includeMatches:n=rt.includeMatches,minMatchCharLength:s=rt.minMatchCharLength,ignoreLocation:r=rt.ignoreLocation,findAllMatches:a=rt.findAllMatches,location:o=rt.location,threshold:l=rt.threshold,distance:c=rt.distance}={}){this.query=null,this.options={isCaseSensitive:t,includeMatches:n,minMatchCharLength:s,findAllMatches:a,ignoreLocation:r,location:o,threshold:l,distance:c},this.pattern=t?e:e.toLowerCase(),this.query=XT(this.pattern,this.options)}static condition(e,t){return t.useExtendedSearch}searchIn(e){let t=this.query;if(!t)return{isMatch:!1,score:1};let{includeMatches:n,isCaseSensitive:s}=this.options;e=s?e:e.toLowerCase();let r=0,a=[],o=0;for(let l=0,c=t.length;l<c;l+=1){let u=t[l];a.length=0,r=0;for(let h=0,d=u.length;h<d;h+=1){let p=u[h],{isMatch:g,indices:v,score:m}=p.search(e);if(g){if(r+=1,o+=m,n){let f=p.constructor.type;YT.has(f)?a=[...a,...v]:a.push(v)}}else{o=0,r=0,a.length=0;break}}if(r){let h={isMatch:!0,score:o/r};return n&&(h.indices=a),h}}return{isMatch:!1,score:1}}},Nd=[];function QT(...i){Nd.push(...i)}function Bd(i,e){for(let t=0,n=Nd.length;t<n;t+=1){let s=Nd[t];if(s.condition(i,e))return new s(i,e)}return new Id(i,e)}var Gc={AND:"$and",OR:"$or"},Od={PATH:"$path",PATTERN:"$val"},kd=i=>!!(i[Gc.AND]||i[Gc.OR]),qT=i=>!!i[Od.PATH],jT=i=>!ps(i)&&Y0(i)&&!kd(i),lv=i=>({[Gc.AND]:Object.keys(i).map(e=>({[e]:i[e]}))});function cv(i,e,{auto:t=!0}={}){let n=s=>{let r=Object.keys(s),a=qT(s);if(!a&&r.length>1&&!kd(s))return n(lv(s));if(jT(s)){let l=a?s[Od.PATH]:r[0],c=a?s[Od.PATTERN]:s[l];if(!ki(c))throw new Error(CT(l));let u={keyId:Pd(l),pattern:c};return t&&(u.searcher=Bd(c,e)),u}let o={children:[],operator:r[0]};return r.forEach(l=>{let c=s[l];ps(c)&&c.forEach(u=>{o.children.push(n(u))})}),o};return kd(i)||(i=lv(i)),n(i)}function ZT(i,{ignoreFieldNorm:e=rt.ignoreFieldNorm}){i.forEach(t=>{let n=1;t.matches.forEach(({key:s,norm:r,score:a})=>{let o=s?s.weight:null;n*=Math.pow(a===0&&o?Number.EPSILON:a,(o||1)*(e?1:r))}),t.score=n})}function KT(i,e){let t=i.matches;e.matches=[],!!Kn(t)&&t.forEach(n=>{if(!Kn(n.indices)||!n.indices.length)return;let{indices:s,value:r}=n,a={indices:s,value:r};n.key&&(a.key=n.key.src),n.idx>-1&&(a.refIndex=n.idx),e.matches.push(a)})}function JT(i,e){e.score=i.score}function $T(i,e,{includeMatches:t=rt.includeMatches,includeScore:n=rt.includeScore}={}){let s=[];return t&&s.push(KT),n&&s.push(JT),i.map(r=>{let{idx:a}=r,o={item:e[a],refIndex:a};return s.length&&s.forEach(l=>{l(r,o)}),o})}var Hs=class{constructor(e,t={},n){this.options={...rt,...t},this.options.useExtendedSearch,this._keyStore=new j0(this.options.keys),this.setCollection(e,n)}setCollection(e,t){if(this._docs=e,t&&!(t instanceof zc))throw new Error(wT);this._myIndex=t||J0(this.options.keys,this._docs,{getFn:this.options.getFn,fieldNormWeight:this.options.fieldNormWeight})}add(e){!Kn(e)||(this._docs.push(e),this._myIndex.add(e))}remove(e=()=>!1){let t=[];for(let n=0,s=this._docs.length;n<s;n+=1){let r=this._docs[n];e(r,n)&&(this.removeAt(n),n-=1,s-=1,t.push(r))}return t}removeAt(e){this._docs.splice(e,1),this._myIndex.removeAt(e)}getIndex(){return this._myIndex}search(e,{limit:t=-1}={}){let{includeMatches:n,includeScore:s,shouldSort:r,sortFn:a,ignoreFieldNorm:o}=this.options,l=ki(e)?ki(this._docs[0])?this._searchStringList(e):this._searchObjectList(e):this._searchLogical(e);return ZT(l,{ignoreFieldNorm:o}),r&&l.sort(a),X0(t)&&t>-1&&(l=l.slice(0,t)),$T(l,this._docs,{includeMatches:n,includeScore:s})}_searchStringList(e){let t=Bd(e,this.options),{records:n}=this._myIndex,s=[];return n.forEach(({v:r,i:a,n:o})=>{if(!Kn(r))return;let{isMatch:l,score:c,indices:u}=t.searchIn(r);l&&s.push({item:r,idx:a,matches:[{score:c,value:r,norm:o,indices:u}]})}),s}_searchLogical(e){let t=cv(e,this.options),n=(o,l,c)=>{if(!o.children){let{keyId:h,searcher:d}=o,p=this._findMatches({key:this._keyStore.get(h),value:this._myIndex.getValueForItemAtKeyId(l,h),searcher:d});return p&&p.length?[{idx:c,item:l,matches:p}]:[]}let u=[];for(let h=0,d=o.children.length;h<d;h+=1){let p=o.children[h],g=n(p,l,c);if(g.length)u.push(...g);else if(o.operator===Gc.AND)return[]}return u},s=this._myIndex.records,r={},a=[];return s.forEach(({$:o,i:l})=>{if(Kn(o)){let c=n(t,o,l);c.length&&(r[l]||(r[l]={idx:l,item:o,matches:[]},a.push(r[l])),c.forEach(({matches:u})=>{r[l].matches.push(...u)}))}}),a}_searchObjectList(e){let t=Bd(e,this.options),{keys:n,records:s}=this._myIndex,r=[];return s.forEach(({$:a,i:o})=>{if(!Kn(a))return;let l=[];n.forEach((c,u)=>{l.push(...this._findMatches({key:c,value:a[u],searcher:t}))}),l.length&&r.push({idx:o,item:a,matches:l})}),r}_findMatches({key:e,value:t,searcher:n}){if(!Kn(t))return[];let s=[];if(ps(t))t.forEach(({v:r,i:a,n:o})=>{if(!Kn(r))return;let{isMatch:l,score:c,indices:u}=n.searchIn(r);l&&s.push({score:c,key:e,value:r,idx:a,norm:o,indices:u})});else{let{v:r,n:a}=t,{isMatch:o,score:l,indices:c}=n.searchIn(r);o&&s.push({score:l,key:e,value:r,norm:a,indices:c})}return s}};Hs.version="6.6.2";Hs.createIndex=J0;Hs.parseIndex=kT;Hs.config=rt;Hs.parseQuery=cv;QT(ov);function uv(i){let e=i.regex,t=e.concat(/[\p{L}_]/u,e.optional(/[\p{L}0-9_.-]*:/u),/[\p{L}0-9_.-]*/u),n=/[\p{L}0-9._:-]+/u,s={className:"symbol",begin:/&[a-z]+;|&#[0-9]+;|&#x[a-f0-9]+;/},r={begin:/\s/,contains:[{className:"keyword",begin:/#?[a-z_][a-z1-9_-]+/,illegal:/\n/}]},a=i.inherit(r,{begin:/\(/,end:/\)/}),o=i.inherit(i.APOS_STRING_MODE,{className:"string"}),l=i.inherit(i.QUOTE_STRING_MODE,{className:"string"}),c={endsWithParent:!0,illegal:/</,relevance:0,contains:[{className:"attr",begin:n,relevance:0},{begin:/=\s*/,relevance:0,contains:[{className:"string",endsParent:!0,variants:[{begin:/"/,end:/"/,contains:[s]},{begin:/'/,end:/'/,contains:[s]},{begin:/[^\s"'=<>`]+/}]}]}]};return{name:"HTML, XML",aliases:["html","xhtml","rss","atom","xjb","xsd","xsl","plist","wsf","svg"],case_insensitive:!0,unicodeRegex:!0,contains:[{className:"meta",begin:/<![a-z]/,end:/>/,relevance:10,contains:[r,l,o,a,{begin:/\[/,end:/\]/,contains:[{className:"meta",begin:/<![a-z]/,end:/>/,contains:[r,a,l,o]}]}]},i.COMMENT(/<!--/,/-->/,{relevance:10}),{begin:/<!\[CDATA\[/,end:/\]\]>/,relevance:10},s,{className:"meta",end:/\?>/,variants:[{begin:/<\?xml/,relevance:10,contains:[l]},{begin:/<\?[a-z][a-z0-9]+/}]},{className:"tag",begin:/<style(?=\s|>)/,end:/>/,keywords:{name:"style"},contains:[c],starts:{end:/<\/style>/,returnEnd:!0,subLanguage:["css","xml"]}},{className:"tag",begin:/<script(?=\s|>)/,end:/>/,keywords:{name:"script"},contains:[c],starts:{end:/<\/script>/,returnEnd:!0,subLanguage:["javascript","handlebars","xml"]}},{className:"tag",begin:/<>|<\/>/},{className:"tag",begin:e.concat(/</,e.lookahead(e.concat(t,e.either(/\/>/,/>/,/\s/)))),end:/\/?>/,contains:[{className:"name",begin:t,relevance:0,starts:c}]},{className:"tag",begin:e.concat(/<\//,e.lookahead(e.concat(t,/>/))),contains:[{className:"name",begin:t,relevance:0},{begin:/>/,relevance:0,endsParent:!0}]}]}}function hv(i){let e=i.regex,t={},n={begin:/\$\{/,end:/\}/,contains:["self",{begin:/:-/,contains:[t]}]};Object.assign(t,{className:"variable",variants:[{begin:e.concat(/\$[\w\d#@][\w\d_]*/,"(?![\\w\\d])(?![$])")},n]});let s={className:"subst",begin:/\$\(/,end:/\)/,contains:[i.BACKSLASH_ESCAPE]},r={begin:/<<-?\s*(?=\w+)/,starts:{contains:[i.END_SAME_AS_BEGIN({begin:/(\w+)/,end:/(\w+)/,className:"string"})]}},a={className:"string",begin:/"/,end:/"/,contains:[i.BACKSLASH_ESCAPE,t,s]};s.contains.push(a);let o={match:/\\"/},l={className:"string",begin:/'/,end:/'/},c={match:/\\'/},u={begin:/\$?\(\(/,end:/\)\)/,contains:[{begin:/\d+#[0-9a-f]+/,className:"number"},i.NUMBER_MODE,t]},h=["fish","bash","zsh","sh","csh","ksh","tcsh","dash","scsh"],d=i.SHEBANG({binary:`(${h.join("|")})`,relevance:10}),p={className:"function",begin:/\w[\w\d_]*\s*\(\s*\)\s*\{/,returnBegin:!0,contains:[i.inherit(i.TITLE_MODE,{begin:/\w[\w\d_]*/})],relevance:0},g=["if","then","else","elif","fi","for","while","until","in","do","done","case","esac","function","select"],v=["true","false"],m={match:/(\/[a-z._-]+)+/},f=["break","cd","continue","eval","exec","exit","export","getopts","hash","pwd","readonly","return","shift","test","times","trap","umask","unset"],x=["alias","bind","builtin","caller","command","declare","echo","enable","help","let","local","logout","mapfile","printf","read","readarray","source","type","typeset","ulimit","unalias"],_=["autoload","bg","bindkey","bye","cap","chdir","clone","comparguments","compcall","compctl","compdescribe","compfiles","compgroups","compquote","comptags","comptry","compvalues","dirs","disable","disown","echotc","echoti","emulate","fc","fg","float","functions","getcap","getln","history","integer","jobs","kill","limit","log","noglob","popd","print","pushd","pushln","rehash","sched","setcap","setopt","stat","suspend","ttyctl","unfunction","unhash","unlimit","unsetopt","vared","wait","whence","where","which","zcompile","zformat","zftp","zle","zmodload","zparseopts","zprof","zpty","zregexparse","zsocket","zstyle","ztcp"],y=["chcon","chgrp","chown","chmod","cp","dd","df","dir","dircolors","ln","ls","mkdir","mkfifo","mknod","mktemp","mv","realpath","rm","rmdir","shred","sync","touch","truncate","vdir","b2sum","base32","base64","cat","cksum","comm","csplit","cut","expand","fmt","fold","head","join","md5sum","nl","numfmt","od","paste","ptx","pr","sha1sum","sha224sum","sha256sum","sha384sum","sha512sum","shuf","sort","split","sum","tac","tail","tr","tsort","unexpand","uniq","wc","arch","basename","chroot","date","dirname","du","echo","env","expr","factor","groups","hostid","id","link","logname","nice","nohup","nproc","pathchk","pinky","printenv","printf","pwd","readlink","runcon","seq","sleep","stat","stdbuf","stty","tee","test","timeout","tty","uname","unlink","uptime","users","who","whoami","yes"];return{name:"Bash",aliases:["sh"],keywords:{$pattern:/\b[a-z][a-z0-9._-]+\b/,keyword:g,literal:v,built_in:[...f,...x,"set","shopt",..._,...y]},contains:[d,i.SHEBANG(),p,u,i.HASH_COMMENT_MODE,r,m,a,o,l,c,t]}}var zi=Ns({mediaQueries:fo});function dv(){let i=this.value;console.log(this),i&&(window.location.href=i)}function eM(i,e){let t=i,n=0;for(;t&&t!==e;)n+=t.offsetTop,t=t.offsetParent;return n}function fv(i,e={}){let t=e.root||document.documentElement,n=e.duration!==void 0?e.duration:400,s=e.ease||"outQuart",r=e.onComplete,a=e.y||0,o=eM(i,t)-a;Ie(t,{scrollTop:o,duration:n,ease:s,onComplete:r})}var pv=class{constructor(e){this.$el=e,this.$modal=e.parentElement,this.$container=this.$modal.parentElement,this.$searchInput=e.querySelector("#docs-search-input"),this.$searchResults=e.querySelector("#docs-search-results"),this.$closeButton=e.querySelector("#docs-close-search"),this.searchList=[],this.fuse=null,this.isOpen=!1,this.timeout=null,this.trackingTimeout=null}createSearchItems(e,t=null,n=null){if(!e)return;let s=e.querySelectorAll(":scope > li");for(let r=0,a=s.length;r<a;r++){let o=s[r],l=o.querySelector("ul"),c=o.querySelector("a"),u=c.getAttribute("title"),h=c.getAttribute("href"),d=o.classList[2],p=n?n+' <span class="docs-breadcrumb-arrow">\uE0B1</span> '+t:t||u;this.searchList.push({href:h,title:u,path:p,themeColor:d}),this.createSearchItems(l,u,t)}}populateResults(e){let t=document.createElement("a");t.href=e.href,t.title=e.title,t.classList.add("docs-search-result"),t.classList.add("theme-color"),t.classList.add(e.themeColor),t.innerHTML=`
    <h2 class="text-s">${e.title}</h2>
    <p class="text-xs">${e.path}</p>
    `,this.$searchResults.appendChild(t)}highlightResult(e,t){this.timeout||!e||(this.timeout=setTimeout(()=>{this.$searchResults.querySelectorAll(".docs-search-result").forEach(s=>s.classList.remove("is-active")),e.classList.add("is-active"),t||e.scrollIntoView({block:"nearest",inline:"nearest"}),this.timeout=null}))}handleInput(){let e=this.$searchInput.value,t=this.$el.offsetHeight;if(this.$el.style.height="auto",e!==""){let s=this.fuse.search(e,{limit:40});this.$searchResults.innerHTML="",s.forEach(r=>this.populateResults(r.item)),this.highlightResult(this.$searchResults.firstElementChild),this.$closeButton.removeAttribute("disabled"),this.trackingTimeout&&clearTimeout(this.trackingTimeout),this.trackingTimeout=setTimeout(()=>{typeof gtag=="function"&&gtag("event","search",{search_term:e,results_count:this.$searchResults.childElementCount})},2e3)}else this.$searchResults.innerHTML="",this.$closeButton.setAttribute("disabled","true");let n=this.$el.offsetHeight;this.$el.style.height=t+"px",Ie(this.$el,{height:n,ease:"outExpo",duration:350,onComplete:()=>{this.$el.style.height=""}})}open(){this.isOpen=!0,this.$searchInput.value="",this.$searchResults.innerHTML="",this.$closeButton.setAttribute("disabled","true"),V.set([this.$container,this.$el],{pointerEvents:"auto"}),et({defaults:{duration:300}}).add(this.$container,{"--overlay-opacity":1},0).add(this.$el,{y:[20,0],ease:Ei({stiffness:200,damping:30}),duration:400},0).add(this.$modal,{opacity:[0,1]},0).init(),this.$searchInput.focus()}close(){this.isOpen=!1,V.set([this.$container,this.$el],{pointerEvents:"none"}),et({defaults:{duration:250}}).add(this.$container,{"--overlay-opacity":0},0).add(this.$modal,{opacity:0},0).init()}init(){document.querySelector("#toggle-search").removeAttribute("disabled"),V.set(this.$el,{pointerEvents:"none"}),this.createSearchItems(document.querySelector("#docs-sidebar nav > ul")),this.fuse=new Hs(this.searchList,{ignoreLocation:!0,keys:["title",{name:"path",weight:.5}]}),this.$searchInput.addEventListener("input",this),this.$searchInput.addEventListener("keydown",this),window.addEventListener("mousemove",this)}revert(){this.$searchInput.removeEventListener("input",this),this.$searchInput.removeEventListener("keydown",this),window.removeEventListener("mousemove",this)}handleEvent(e){let t=e.type,n=e.target;if(this.isOpen){if(t==="input"&&this.handleInput(),t==="mousemove"){let s=n.closest(".docs-search-result:not(.is-active)");s&&this.highlightResult(s,!0)}if(t==="keydown"){e.key==="Escape"&&this.close();let s=this.$el.querySelector(".docs-search-result.is-active");if(s)if(e.key==="ArrowUp"){let r=s.previousElementSibling;r&&this.highlightResult(r)}else if(e.key==="ArrowDown"){let r=s.nextElementSibling;r&&this.highlightResult(r)}else e.key==="Enter"&&s.click()}}}},mv=class{constructor(e){this.$el=e,this.ulsMap=new Map,this.$nav=e.querySelector(".sidebar-nav"),this.$navItems=e.querySelectorAll(".docs-nav-item"),this.$uls=e.querySelectorAll("ul.docs-nav-item")}revert(){this.$el=null,this.ulsMap.clear(),this.$navItems=null,this.$uls=null}select(e){let t=this.$el.querySelector(`.docs-link[data-id="${e}"]`)||document.querySelector(`.docs-link[data-id="${e}"]`);if(!t)return console.warn(`No matching element with data-id "${e}" in sidebar`);let n=t.parentElement,s=this.$nav.scrollTop,r=document.querySelector("#toggle-sidebar span");r.innerHTML=t.getAttribute("title"),this.$uls.forEach(h=>this.ulsMap.set(h,{a:h.offsetHeight,b:0})),V.set(this.$uls[0],{position:"fixed",y:-s}),this.$navItems.forEach(h=>{h.style.removeProperty("height"),h.classList.remove("is-active")});let a=n;for(;a;){let h=a.classList;if(h.contains("docs-nav-item")&&h.add("is-active"),h.contains("docs-links-chapter"))break;a=a.parentElement}this.ulsMap.forEach((h,d)=>h.b=d.offsetHeight);let o=this.$nav.scrollTop,l=350,c=et({defaults:{ease:"inOutQuad"}}),u=!!s;return this.ulsMap.forEach((h,d)=>{let p=h.a===h.b;!u&&!p&&(u=!0),c.add(d,{composition:"blend",height:[h.a,h.b],ease:"inOutExpo",duration:u?l:0,onComplete:V.cleanInlineStyles},0)}),u?(c.add(this.$uls[0],{y:-o,duration:l,modifier:V.round(0)},0),c.add(this.$nav,{scrollTop:s,duration:l,modifier:V.round(0)},0),c.set(this.$uls[0],{position:"relative",y:0}),c.init().then()):V.set(this.$uls[0],{position:"relative",y:0}).then()}},gv=class{constructor(e){this.$el=e,this.$demos=V.$("#docs-demos")[0],this.highlightCode(),zi.add(t=>(t.matches.minL&&(this.pathAnimation=new xv),()=>{this.pathAnimation&&this.pathAnimation.revert()})),this.interactionTimer=Zn({duration:150,onUpdate:()=>{this.pathAnimation&&this.pathAnimation.updateConnectors()}}),document.addEventListener("click",this,!1),document.addEventListener("scroll",this,!1),this.$demos.addEventListener("scroll",this,!1)}handleCodeTabClick(e){let t=e.dataset.language,n=this.$el.querySelector(".code-preview-content"),s=this.$el.querySelectorAll(".code-preview-button"),r=this.$el.querySelectorAll(".code-editor pre");s.forEach(a=>a.classList.remove("is-active")),r.forEach(a=>a.classList.remove("is-active")),n.querySelectorAll(`[data-language="${t}"]`).forEach(a=>{a.classList.add("is-active")})}revert(){document.removeEventListener("click",this),document.removeEventListener("scroll",this,!1),this.$demos.removeEventListener("scroll",this,!1),this.pathAnimation&&this.pathAnimation.revert(),this.interactionTimer.revert()}highlightCode(){this.$el.classList.add("is-highlighted");let e=this.$el.querySelectorAll("code");for(let s=0;s<e.length;s++){let r=e[s];if(Oi.highlightElement(r),r.classList.contains("language-undefined")){let a=Oi.highlight(r.innerHTML,{language:"javascript"});r.innerHTML=a.value,r.classList.remove("language-undefined"),r.classList.add("language-javascript")}}let t=this.$el.getElementsByTagName("pre");for(let s=0;s<t.length;s++){let r=t[s];if(!r.innerHTML.includes("\u2502")&&!r.innerHTML.includes("\u2500")){let a=r.getElementsByTagName("code")[0].innerText,o=new ba(a);r.appendChild(o.$el)}}let n=this.$el.querySelectorAll("table");for(let s=0;s<n.length;s++)V0(n[s])}async select(e){let n=document.querySelector(`.docs-link[data-id="${e}"]`).href;try{let s=window.scrollY,a=await(await fetch(n)).text(),c=new DOMParser().parseFromString(a,"text/html");document.title=c.title;let u=c.body.querySelector("#docs-info");u&&(this.$el.innerHTML=u.innerHTML);let h=parseFloat(V.get(document.body,"--site-header-height","px")),d=!zi.matches.minM&&s>=h?-h:0;fv(document.body,{y:d,duration:0}),this.highlightCode(),this.currentUrl=n;let p=["#docs-info"];return this.pathAnimation&&this.pathAnimation.updateConnectors()&&p.push("#path-animation"),Ie(p,{opacity:1,duration:75,ease:"out"}),{id:e,url:n}}catch(s){console.warn(`Something went wrong while trying to load the URL ${n}.`,s)}}handleEvent(e){let t=e.type,n=e.target;if(t==="click"){let s=n.closest(".code-preview-button");s&&this.handleCodeTabClick(s)}t==="scroll"&&this.interactionTimer.restart()}},vv=class{constructor(e){this.$demosContainer=e,this.interactionTimer=Zn({duration:150,onComplete:()=>e.classList.remove("is-scrolling")}),this.$demosContainer.addEventListener("scroll",()=>{e.classList.add("is-scrolling"),this.interactionTimer.restart()}),this.demosCode=window.demos,this.$header=V.$("#site-header-content")[0],this.demosElements=V.$(".docs-demo"),this.map=new Map,zi.add(t=>{if(t.matches.minL){let n=e.querySelector(".docs-demo.is-active");n&&this.scrollTo(n.dataset.id,!0,0)}else{let n=t.matches.minM?16:12;t.data.draggable=hs(e,{container:()=>[-(window.innerHeight-e.offsetHeight),window.innerWidth-e.offsetWidth,0,0],containerPadding:[n,n,n,n]}),t.data.draggable.progressX=t.matches.minM?0:1,t.data.draggable.progressY=1,V.set(e,{transformOrigin:t.matches.minM?"0% 100%":"100% 100%"})}return t.add("minimiseDemos",n=>{let s=e.querySelector(".docs-demo.is-active");if(t.matches.minL||e.classList.contains("is-small")){s&&this.play(s.dataset.id);return}let r=t.matches.minM?.6:.3,a=t.data.draggable;V.set(e,{cursor:"zoom-in"}),e.classList.add("is-small"),a&&(Ie(t.data.draggable,{progressX:t.matches.minM?0:1,progressY:1,ease:"outElastic(.9, 1.25)",duration:n?0:750}),Ie(e,{scale:r,ease:"outElastic(1, 1)",duration:n?0:650,onComplete:()=>{let o=e.querySelector(".docs-demo.is-active");o&&this.scrollTo(o.dataset.id,!0,0)}}))}),t.add("maximiseDemos",()=>{t.matches.minL||!e.classList.contains("is-small")||(V.set(e,{cursor:"grab"}),Ie(e,{scale:1,ease:"outElastic(1, 1.5)",duration:450,onComplete:()=>{let n=e.querySelector(".docs-demo.is-active");if(n&&n.querySelector(".animejs-onscroll-debug")){let r=n.dataset.id;this.cleanup(r),this.play(r)}}}),e.classList.remove("is-small"))}),t.methods.minimiseDemos(!0),()=>{e.classList.remove("is-small")}}),document.addEventListener("click",this,!1)}async fetch(){let e='<article class="docs-demo docs-demo-placeholder"><header class="docs-demo-header"><h2 class="text-ui"></h2></header><div class="docs-demo-content"><div class="docs-demo-html docs-demo-template"></div></div></article>';this.$demosContainer.classList.add("is-loading");let t="";for(let l=0;l<8;l++)t+=e;let n=document.createElement("div");n.classList.add("demos-placeholder"),n.innerHTML=t,this.$demosContainer.appendChild(n);let s=V.get(document.body,"--hex-bg-2"),r=V.get(document.body,"--hex-bg-3"),a=[s,r,s],o=et().add(".docs-demo-placeholder",{backgroundColor:a,duration:800,loop:!0},ge(75));return await fetch(window.paths.demos).then(l=>l.text()).then(l=>{let c=document.createElement("div");c.innerHTML=l;let u=c.querySelectorAll("script");u.forEach(d=>d.remove());let h=c.querySelectorAll("article");return Ie(".docs-demo-placeholder",{opacity:0,duration:250,delay:ge(40,{start:100}),onComplete:()=>{o.revert(),n.style.zIndex="0",this.$demosContainer.classList.remove("is-loading")}}),h.forEach(d=>this.$demosContainer.appendChild(d)),u.forEach(d=>{let p=document.createElement("script");p.textContent=d.textContent,document.body.appendChild(p)}),this.demosElements=V.$(".docs-demo:not(.docs-demo-placeholder"),this.map=new Map(this.demosElements.map((d,p)=>{let g=d.dataset.id,v=d.querySelector(".docs-demo-live"),m=v.querySelector(".viewer"),f=Ns({root:v});return new IntersectionObserver(_=>{_.forEach(y=>{let T=y.target;y.isIntersecting?(T.classList.remove("is-hidden"),m&&!d.classList.contains("has-viewer")&&(this.play(g,!0),this.cleanup(g))):T.classList.add("is-hidden")})},{threshold:0}).observe(d),[g,{$el:d,$content:d.querySelector(".docs-demo-content"),$template:d.querySelector(".docs-demo-template"),$live:v,code:this.demosCode[g],scope:f}]})),this})}revert(){this.$demosContainer=null,this.demosCode=null,this.$header=null,this.demosElements.length=0,this.unselect(),this.map.clear(),document.removeEventListener("click",this)}cleanup(e){let t=this.map.get(e),n=t.$live,s=n.querySelector("iframe");t.scope.revert(),t.$live.classList.contains("avoid-cleanup")||(t.$live.innerHTML=t.$template.innerHTML),s&&(n.style.width="100%",s.parentNode&&s.parentNode.removeChild(s))}play(e,t,n){let s=this.map.get(e);if(t||s.$el.classList.contains("is-active")){n||this.cleanup(e);let r=s.$live;if(r.querySelector(".iframe-content")){let a=s.$el,o=document.createElement("iframe"),l=r.innerHTML;r.innerHTML="",r.appendChild(o),setTimeout(()=>{let c=a.querySelector(".docs-demo-js"),u=o.contentWindow.document,h=u.createElement("script");u.documentElement.style.background="transparent",u.body.style.background="transparent",u.head.innerHTML=document.head.innerHTML,u.body.innerHTML=l,u.body.classList.add("docs-demo-html","docs-demo-live","theme-color",a.classList[2]),h.type="module",h.innerHTML=c.value,u.body.appendChild(h)},0)}else s.scope.add(a=>s.code(a,Ie,et,Zn,uo,hs,Ns,Sr,tn,ci,Ei,ge,V,qn,Qm,W0))}}unselectDemo(e){let t=this.map.get(e);this.cleanup(e),t.$el.classList.remove("is-active")}unselect(){V.$(".docs-demo.is-active").forEach(t=>this.unselectDemo(t.dataset.id))}scrollTo(e,t=!1,n=350,s){let r=this.map.get(e);if(!r)return s?s():!1;let a=r.$el;a.classList.add("is-active");let o=!n,l=!a.classList.contains("is-hidden"),c=zi.matches.minL?this.$header.offsetHeight-this.$demosContainer.offsetTop:0,u=a,h=c,d=n;if(o)d=0;else if(l){let p=a.previousElementSibling,g=a.nextElementSibling,v=this.$demosContainer.offsetHeight,m=a.offsetHeight,f=v>m*2,_=a.getBoundingClientRect().top<c;if(!t)if(!f||_)d=n*.75;else if(p&&p.classList.contains("is-hidden"))u=p,d=n*.5;else if(g&&g.classList.contains("is-hidden"))u=g,h=c+v-m,d=n*.75;else return s?s():!1}fv(u,{root:this.$demosContainer,y:h,duration:d,onComplete:()=>s?s():!1})}async select(e,t,n){return this.unselect(),V.remove("#docs-info"),Ie(["#docs-info","#path-animation"],{opacity:0,duration:75,ease:"in"}),new Promise(s=>{this.scrollTo(e,t,n,s)})}handleEvent(e){let t=e.type,n=e.target;if(t==="click"){let s=n.closest(".demo-reload-button");s&&this.play(s.dataset.id)}}},xv=class{constructor(){let e=document.createElement("div");e.innerHTML=`
    <svg id="path-animation" style="pointer-events: none; position: fixed; z-index: 105; left: 0; top: 0; width: 100%; height: 100%;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 0 0">
      <polyline fill="none" fill-rule="evenodd" stroke-width="1" stroke-linejoin="round" stroke="" points="0 0 32 0 32 100 64 100"/>
    </svg>
    `,this.$svg=e.firstElementChild,this.$path=this.$svg.querySelector("polyline"),this.path=uo(this.$path,{opacity:100}),this.resize(),document.body.append(this.$svg),window.addEventListener("resize",this,!1)}revert(){this.path.revert(),window.removeEventListener("resize",this,!1),document.body.contains(this.$svg)&&document.body.removeChild(this.$svg)}updateConnectors(){let e=document.querySelector(".docs-demo.is-active"),t=document.querySelector(".code-preview"),n=e&&e.classList.contains("is-hidden");if(n?this.path.opacity(0):this.path.opacity(1),e&&t){let s=e.getBoundingClientRect(),r=t.getBoundingClientRect(),a=72,o=104,l=s.top;l<a&&l>-a?l=a:l<=-a?(l<=-a-61&&this.path.opacity(0),l+=a*2):n||this.path.opacity(1);let c=r.top,u=r.bottom;return c<a&&(c=a,u<o?this.path.opacity(0):this.path.opacity(1)),this.$path.setAttribute("stroke",`${V.get(t,"--hex-current-3")}`),this.updatePath(s.right-.5,l+26+.5,r.left-.5,c+26+.5),!0}else return!1}updatePath(e,t,n,s){this.$path.setAttribute("points",`${e} ${t} ${e+24} ${t} ${n-40} ${s} ${n} ${s}`)}resize(){let e=window.innerWidth,t=window.innerHeight;this.$svg.setAttribute("viewBox",`0 0 ${e} ${t}`),this.updateConnectors()}handleEvent(e){let{type:t}=e;t==="resize"&&this.resize()}},yv=class{constructor(){let e=V.$(".docs-nav-item.is-active > a"),n=(e[e.length-1]||document.querySelector('.docs-link[data-id="docs"]')).dataset.id;this.$versionSelector=V.$("#docs-versions select")[0],this.$versionSelectorOptions=V.$("#docs-versions option"),this.$versionSelectorOptions[0].textContent=window.AnimeJS[0].version,this.sidebar=new mv(document.querySelector("#docs-sidebar")),this.infos=new gv(document.querySelector("#docs-info")),this.demos=new vv(document.querySelector("#docs-demos")),this.search=new pv(document.querySelector("#docs-search")),this.demos.fetch().then(r=>{r.select(n,!1,0),r.play(n),Ie(["#docs-info","#path-animation"],{opacity:1,duration:75,ease:"inOut"}),this.updateNav(),this.search.init()}),zi.add(r=>{let a=document.querySelector("#toggle-sidebar"),o=document.querySelector("#docs-sidebar");return r.add("openSidebar",()=>{o.classList.contains("is-active")||(V.get(o,"x")==="0px"&&V.set(o,{x:"-16rem"}),et({defaults:{duration:300,ease:"inOut(3)"}}).add(o,{x:"0rem",ease:"out(3)"},0).add("#docs",{"--overlay-opacity":1},0).add(a.querySelector("polyline"),{points:"13.25 9.25 10.75 12 13.25 14.75"},0),o.classList.add("is-active"),zi.methods.minimiseDemos())}),r.add("closeSidebar",()=>{!o.classList.contains("is-active")||(et({defaults:{duration:300,ease:"inOut(3)"}}).add(o,{x:"-16rem"},0).add("#docs",{"--overlay-opacity":0},0).add(a.querySelector("polyline"),{points:"9.5 7.75 9.5 12 9.5 16.25"},0),o.classList.remove("is-active"))}),r.add("toggleSidebar",()=>{r.matches.minM||(o.classList.contains("is-active")?r.methods.closeSidebar():r.methods.openSidebar())}),a.addEventListener("click",r.methods.toggleSidebar),()=>{a.removeEventListener("click",r.methods.toggleSidebar),o.classList.remove("is-active")}});let s=window.location.href;history.replaceState({id:n,url:s},"",s),this.$versionSelector.addEventListener("change",dv,!1),document.addEventListener("click",this,!1),document.addEventListener("pointerdown",this,!1),document.addEventListener("keydown",this,!1),window.addEventListener("popstate",this,!1)}revert(){this.sidebar.revert(),this.infos.revert(),this.demos.revert(),this.$versionSelector.removeEventListener("change",dv,!1),document.removeEventListener("click",this,!1),document.removeEventListener("pointerdown",this,!1),document.removeEventListener("keydown",this,!1),window.removeEventListener("popstate",this,!1)}getNextEl(){let e=this.demos.$demosContainer.querySelector(".docs-demo.is-active");if(e){let t=e.nextElementSibling;if(t&&t.classList.contains("docs-demo"))return t}}getPrevEl(){let e=this.demos.$demosContainer.querySelector(".docs-demo.is-active");if(e){let t=e.previousElementSibling;if(t&&t.classList.contains("docs-demo"))return t}}updateNav(){let e=document.querySelector("#next-demo"),t=document.querySelector("#prev-demo"),n=this.getNextEl(),s=this.getPrevEl();n?e.removeAttribute("disabled"):e.setAttribute("disabled","true"),s?t.removeAttribute("disabled"):t.setAttribute("disabled","true")}async select(e,t){return this.sidebar.select(e),this.demos.select(e,t),this.updateNav(),this.infos.select(e).then(n=>(this.demos.play(e),n))}handleClick(e){let t=e.dataset.id;if(!t&&e.href){let n=document.querySelector(`.docs-link[href="${e.getAttribute("href")}"]`);n&&(t=n.dataset.id)}this.select(t,!!e.href).then(n=>{n&&(history.pushState(n,"",n.url),gtag("event","page_view",{page_title:document.title,page_location:window.location.href,page_path:window.location.pathname}))})}handleEvent(e){let t=e.type,n=e.target,s=e.metaKey;if(t==="click"){let r=n.closest("#toggle-sidebar"),a=document.getElementById("site-menu"),o=document.getElementById("docs-sidebar");if(a.classList.contains("is-active"))return;if(o.classList.contains("is-active")&&!o.contains(n)&&!r)return zi.methods.closeSidebar(),e.preventDefault();let l=n.closest(".docs-demo:not(.is-active)");l&&this.handleClick(l);let c=n.closest(".docs-link");c&&(s||(e.preventDefault(),c.href!==location.href&&this.handleClick(c)));let u=n.closest("#docs-info a");if(u){let x=new URL(u.href).origin!==location.origin;!s&&!x&&(e.preventDefault(),this.handleClick(u))}n.closest("#toggle-search")&&this.search.open();let d=n.closest("#docs-search a");if(d&&(s||(e.preventDefault(),this.handleClick(d),this.search.close())),(n.closest("#docs-close-search")||n.id==="docs-search-container")&&this.search.close(),n.closest("#docs-demos.is-small")&&zi.methods.maximiseDemos(),n.closest(".minimise-demo-button")&&zi.methods.minimiseDemos(),n.closest("#next-demo")){let x=this.getNextEl();x&&this.handleClick(x)}if(n.closest("#prev-demo")){let x=this.getPrevEl();x&&this.handleClick(x)}}if(t==="pointerdown"&&n.closest("#docs-demos.is-small")&&zi.methods.maximiseDemos(),t==="popstate"){let r=e.state;r&&this.select(r.id)}t==="keydown"&&s&&e.key==="k"&&(this.search.isOpen?this.search.close():this.search.open())}};function Av(){Oi.registerLanguage("javascript",kc),Oi.registerLanguage("xml",uv),Oi.registerLanguage("bash",hv),new yv}function tM(i){i.preventDefault();let e=i.ctrlKey;i.key==="g"&&e&&document.body.classList.toggle("show-grid")}function nM(i){let e=i.target,t=e.closest("#toggle-site-menu");t&&Pc.methods.toggleSiteMenu(t),!document.getElementById("site-menu").contains(e)&&!t&&Pc.methods.closeSiteMenu()}function _v(){document.addEventListener("keyup",tM,!1),document.addEventListener("click",nM,!1)}var zd=class extends HTMLElement{constructor(){super()}static get observedAttributes(){return["path","goal"]}connectedCallback(){this.innerHTML=`
      <div class="box-heading">
        <h3>Funding goal</h3>
        <div class="funding-level-status"><span class="percents">0%</span></div>
      </div>
      <div class="chart">
        <div style="width: 0%" class="chart-bar theme-color-0"></div>
      </div>
      <div class="sponsors-list">Loading sponsors...</div>
      <p>
        Help the project via <sponsor-button><a href="https://github.com/sponsors/juliangarnier" target="_blank">GitHub Sponsors</a></sponsor-button>.
      </p>
    `,this.$percents=this.querySelector(".percents"),this.$chartBar=this.querySelector(".chart-bar"),this.$sponsorsList=this.querySelector(".sponsors-list"),this.loadSponsors()}get path(){return this.getAttribute("path")||"github-sponsors"}get goal(){return this.getAttribute("goal")||"500"}async loadSponsors(){try{let e=await fetch(window.paths[this.path]);if(!e.ok)throw new Error(`HTTP error! status: ${e.status}`);let t=await e.text(),n=document.createElement("div");n.innerHTML=t;let s=n.querySelectorAll(".sponsor"),r=s.length,a=+this.goal,o=r>50?50:r,l=r/a*100+"%";this.$percents.innerHTML=l,this.$chartBar.style.width=l,this.$sponsorsList.innerHTML="";for(let c=0;c<o;c++)this.$sponsorsList.appendChild(s[c]);et().add(this.$chartBar,{width:{from:"0%"}}).add(this.$percents,{innerHTML:{from:"0%"},modifier:V.round(0)},0).add(this.$sponsorsList.querySelectorAll(".sponsor"),{scale:[{from:0,to:1.2,duration:250},{to:1}],delay:ge(5)},0).init()}catch(e){this.innerHTML=`Error loading sponsors: ${e.message}`}}};customElements.get("sponsors-list")||customElements.define("sponsors-list",yh);customElements.get("sponsor-button")||customElements.define("sponsor-button",Yh);customElements.get("funding-level")||customElements.define("funding-level",zd);function iM(){let i=document.body.dataset.template;i.includes("home")&&G0(),i.includes("docs")&&(window.THREE={Scene:Ki,PerspectiveCamera:qt,WebGLRenderer:to,BoxGeometry:Zi,MeshBasicMaterial:ni,Mesh:Qt},Av())}_v();document.addEventListener("DOMContentLoaded",iM);})();
/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */
/**
 * anime.js - ESM
 * @version v4.0.0
 * @author Julian Garnier
 * @license MIT
 * @copyright (c) 2025 Julian Garnier
 * @see https://animejs.com
 */
/**
 * lil-gui
 * https://lil-gui.georgealways.com
 * @version 0.20.0
 * @author George Michael Brower
 * @license MIT
 */
/**
 * postprocessing v6.36.6 build Tue Dec 31 2024
 * https://github.com/pmndrs/postprocessing
 * Copyright 2015-2024 Raoul van Rüschen
 * @license Zlib
 */
