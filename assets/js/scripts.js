(()=>{var Xv=Object.create;var Kc=Object.defineProperty;var Yv=Object.getOwnPropertyDescriptor;var Qv=Object.getOwnPropertyNames;var qv=Object.getPrototypeOf,jv=Object.prototype.hasOwnProperty;var Zv=i=>Kc(i,"__esModule",{value:!0});var rf=(i,e)=>()=>(e||i((e={exports:{}}).exports,e),e.exports);var Kv=(i,e,t)=>{if(e&&typeof e=="object"||typeof e=="function")for(let n of Qv(e))!jv.call(i,n)&&n!=="default"&&Kc(i,n,{get:()=>e[n],enumerable:!(t=Yv(e,n))||t.enumerable});return i},af=i=>Kv(Zv(Kc(i!=null?Xv(qv(i)):{},"default",i&&i.__esModule&&"default"in i?{get:()=>i.default,enumerable:!0}:{value:i,enumerable:!0})),i);var Bg=rf((dd,fd)=>{(function(i,e){typeof dd=="object"&&typeof fd!="undefined"?fd.exports=e():typeof define=="function"&&define.amd?define(e):i.Stats=e()})(dd,function(){var i=function(){function e(u){return s.appendChild(u.dom),u}function t(u){for(var d=0;d<s.children.length;d++)s.children[d].style.display=d===u?"block":"none";n=u}var n=0,s=document.createElement("div");s.style.cssText="position:fixed;top:0;left:0;cursor:pointer;opacity:0.9;z-index:10000",s.addEventListener("click",function(u){u.preventDefault(),t(++n%s.children.length)},!1);var r=(performance||Date).now(),a=r,o=0,l=e(new i.Panel("FPS","#0ff","#002")),c=e(new i.Panel("MS","#0f0","#020"));if(self.performance&&self.performance.memory)var h=e(new i.Panel("MB","#f08","#201"));return t(0),{REVISION:16,dom:s,addPanel:e,showPanel:t,begin:function(){r=(performance||Date).now()},end:function(){o++;var u=(performance||Date).now();if(c.update(u-r,200),u>a+1e3&&(l.update(1e3*o/(u-a),100),a=u,o=0,h)){var d=performance.memory;h.update(d.usedJSHeapSize/1048576,d.jsHeapSizeLimit/1048576)}return u},update:function(){r=this.end()},domElement:s,setMode:t}};return i.Panel=function(e,t,n){var s=1/0,r=0,a=Math.round,o=a(window.devicePixelRatio||1),l=80*o,c=48*o,h=3*o,u=2*o,d=3*o,p=15*o,g=74*o,v=30*o,m=document.createElement("canvas");m.width=l,m.height=c,m.style.cssText="width:80px;height:48px";var f=m.getContext("2d");return f.font="bold "+9*o+"px Helvetica,Arial,sans-serif",f.textBaseline="top",f.fillStyle=n,f.fillRect(0,0,l,c),f.fillStyle=t,f.fillText(e,h,u),f.fillRect(d,p,g,v),f.fillStyle=n,f.globalAlpha=.9,f.fillRect(d,p,g,v),{dom:m,update:function(x,A){s=Math.min(s,x),r=Math.max(r,x),f.fillStyle=n,f.globalAlpha=1,f.fillRect(0,0,l,p),f.fillStyle=t,f.fillText(a(x)+" "+e+" ("+a(s)+"-"+a(r)+")",h,u),f.drawImage(m,d+o,p,g-o,v,d,p,g-o,v),f.fillRect(d+g-o,p,o,v),f.fillStyle=n,f.globalAlpha=.9,f.fillRect(d+g-o,p,o,a((1-x/A)*v))}}},i})});var nv=rf((ID,tv)=>{function F0(i){return i instanceof Map?i.clear=i.delete=i.set=function(){throw new Error("map is read-only")}:i instanceof Set&&(i.add=i.clear=i.delete=function(){throw new Error("set is read-only")}),Object.freeze(i),Object.getOwnPropertyNames(i).forEach(e=>{let t=i[e],n=typeof t;(n==="object"||n==="function")&&!Object.isFrozen(t)&&F0(t)}),i}var zd=class{constructor(e){e.data===void 0&&(e.data={}),this.data=e.data,this.isMatchIgnored=!1}ignoreMatch(){this.isMatchIgnored=!0}};function U0(i){return i.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}function Hs(i,...e){let t=Object.create(null);for(let n in i)t[n]=i[n];return e.forEach(function(n){for(let s in n)t[s]=n[s]}),t}var sT="</span>",N0=i=>!!i.scope,rT=(i,{prefix:e})=>{if(i.startsWith("language:"))return i.replace("language:","language-");if(i.includes(".")){let t=i.split(".");return[`${e}${t.shift()}`,...t.map((n,s)=>`${n}${"_".repeat(s+1)}`)].join(" ")}return`${e}${i}`},B0=class{constructor(e,t){this.buffer="",this.classPrefix=t.classPrefix,e.walk(this)}addText(e){this.buffer+=U0(e)}openNode(e){if(!N0(e))return;let t=rT(e.scope,{prefix:this.classPrefix});this.span(t)}closeNode(e){!N0(e)||(this.buffer+=sT)}value(){return this.buffer}span(e){this.buffer+=`<span class="${e}">`}},O0=(i={})=>{let e={children:[]};return Object.assign(e,i),e},Hc=class{constructor(){this.rootNode=O0(),this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(e){this.top.children.push(e)}openNode(e){let t=O0({scope:e});this.add(t),this.stack.push(t)}closeNode(){if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}walk(e){return this.constructor._walk(e,this.rootNode)}static _walk(e,t){return typeof t=="string"?e.addText(t):t.children&&(e.openNode(t),t.children.forEach(n=>this._walk(e,n)),e.closeNode(t)),e}static _collapse(e){typeof e!="string"&&(!e.children||(e.children.every(t=>typeof t=="string")?e.children=[e.children.join("")]:e.children.forEach(t=>{Hc._collapse(t)})))}},k0=class extends Hc{constructor(e){super();this.options=e}addText(e){e!==""&&this.add(e)}startScope(e){this.openNode(e)}endScope(){this.closeNode()}__addSublanguage(e,t){let n=e.root;t&&(n.scope=`language:${t}`),this.add(n)}toHTML(){return new B0(this,this.options).value()}finalize(){return this.closeAllNodes(),!0}};function So(i){return i?typeof i=="string"?i:i.source:null}function z0(i){return Dr("(?=",i,")")}function aT(i){return Dr("(?:",i,")*")}function oT(i){return Dr("(?:",i,")?")}function Dr(...i){return i.map(t=>So(t)).join("")}function lT(i){let e=i[i.length-1];return typeof e=="object"&&e.constructor===Object?(i.splice(i.length-1,1),e):{}}function Hd(...i){let e=lT(i);return"("+(e.capture?"":"?:")+i.map(n=>So(n)).join("|")+")"}function H0(i){return new RegExp(i.toString()+"|").exec("").length-1}function cT(i,e){let t=i&&i.exec(e);return t&&t.index===0}var hT=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./;function Gd(i,{joinWith:e}){let t=0;return i.map(n=>{t+=1;let s=t,r=So(n),a="";for(;r.length>0;){let o=hT.exec(r);if(!o){a+=r;break}a+=r.substring(0,o.index),r=r.substring(o.index+o[0].length),o[0][0]==="\\"&&o[1]?a+="\\"+String(Number(o[1])+s):(a+=o[0],o[0]==="("&&t++)}return a}).map(n=>`(${n})`).join(e)}var uT=/\b\B/,G0="[a-zA-Z]\\w*",Vd="[a-zA-Z_]\\w*",V0="\\b\\d+(\\.\\d+)?",W0="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",X0="\\b(0b[01]+)",dT="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",fT=(i={})=>{let e=/^#![ ]*\//;return i.binary&&(i.begin=Dr(e,/.*\b/,i.binary,/\b.*/)),Hs({scope:"meta",begin:e,end:/$/,relevance:0,"on:begin":(t,n)=>{t.index!==0&&n.ignoreMatch()}},i)},bo={begin:"\\\\[\\s\\S]",relevance:0},pT={scope:"string",begin:"'",end:"'",illegal:"\\n",contains:[bo]},mT={scope:"string",begin:'"',end:'"',illegal:"\\n",contains:[bo]},gT={begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},Gc=function(i,e,t={}){let n=Hs({scope:"comment",begin:i,end:e,contains:[]},t);n.contains.push({scope:"doctag",begin:"[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",end:/(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,excludeBegin:!0,relevance:0});let s=Hd("I","a","is","so","us","to","at","if","in","it","on",/[A-Za-z]+['](d|ve|re|ll|t|s|n)/,/[A-Za-z]+[-][a-z]+/,/[A-Za-z][a-z]{2,}/);return n.contains.push({begin:Dr(/[ ]+/,"(",s,/[.]?[:]?([.][ ]|[ ])/,"){3}")}),n},vT=Gc("//","$"),xT=Gc("/\\*","\\*/"),yT=Gc("#","$"),AT={scope:"number",begin:V0,relevance:0},_T={scope:"number",begin:W0,relevance:0},ST={scope:"number",begin:X0,relevance:0},bT={scope:"regexp",begin:/\/(?=[^/\n]*\/)/,end:/\/[gimuy]*/,contains:[bo,{begin:/\[/,end:/\]/,relevance:0,contains:[bo]}]},ET={scope:"title",begin:G0,relevance:0},TT={scope:"title",begin:Vd,relevance:0},MT={begin:"\\.\\s*"+Vd,relevance:0},wT=function(i){return Object.assign(i,{"on:begin":(e,t)=>{t.data._beginMatch=e[1]},"on:end":(e,t)=>{t.data._beginMatch!==e[1]&&t.ignoreMatch()}})},Vc=Object.freeze({__proto__:null,APOS_STRING_MODE:pT,BACKSLASH_ESCAPE:bo,BINARY_NUMBER_MODE:ST,BINARY_NUMBER_RE:X0,COMMENT:Gc,C_BLOCK_COMMENT_MODE:xT,C_LINE_COMMENT_MODE:vT,C_NUMBER_MODE:_T,C_NUMBER_RE:W0,END_SAME_AS_BEGIN:wT,HASH_COMMENT_MODE:yT,IDENT_RE:G0,MATCH_NOTHING_RE:uT,METHOD_GUARD:MT,NUMBER_MODE:AT,NUMBER_RE:V0,PHRASAL_WORDS_MODE:gT,QUOTE_STRING_MODE:mT,REGEXP_MODE:bT,RE_STARTERS_RE:dT,SHEBANG:fT,TITLE_MODE:ET,UNDERSCORE_IDENT_RE:Vd,UNDERSCORE_TITLE_MODE:TT});function CT(i,e){i.input[i.index-1]==="."&&e.ignoreMatch()}function RT(i,e){i.className!==void 0&&(i.scope=i.className,delete i.className)}function DT(i,e){!e||!i.beginKeywords||(i.begin="\\b("+i.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",i.__beforeBegin=CT,i.keywords=i.keywords||i.beginKeywords,delete i.beginKeywords,i.relevance===void 0&&(i.relevance=0))}function PT(i,e){!Array.isArray(i.illegal)||(i.illegal=Hd(...i.illegal))}function IT(i,e){if(!!i.match){if(i.begin||i.end)throw new Error("begin & end are not supported with match");i.begin=i.match,delete i.match}}function LT(i,e){i.relevance===void 0&&(i.relevance=1)}var FT=(i,e)=>{if(!i.beforeMatch)return;if(i.starts)throw new Error("beforeMatch cannot be used with starts");let t=Object.assign({},i);Object.keys(i).forEach(n=>{delete i[n]}),i.keywords=t.keywords,i.begin=Dr(t.beforeMatch,z0(t.begin)),i.starts={relevance:0,contains:[Object.assign(t,{endsParent:!0})]},i.relevance=0,delete t.beforeMatch},UT=["of","and","for","in","not","or","if","then","parent","list","value"],NT="keyword";function Y0(i,e,t=NT){let n=Object.create(null);return typeof i=="string"?s(t,i.split(" ")):Array.isArray(i)?s(t,i):Object.keys(i).forEach(function(r){Object.assign(n,Y0(i[r],e,r))}),n;function s(r,a){e&&(a=a.map(o=>o.toLowerCase())),a.forEach(function(o){let l=o.split("|");n[l[0]]=[r,BT(l[0],l[1])]})}}function BT(i,e){return e?Number(e):OT(i)?0:1}function OT(i){return UT.includes(i.toLowerCase())}var Q0={},Pr=i=>{console.error(i)},q0=(i,...e)=>{console.log(`WARN: ${i}`,...e)},Ta=(i,e)=>{Q0[`${i}/${e}`]||(console.log(`Deprecated as of ${i}. ${e}`),Q0[`${i}/${e}`]=!0)},Wc=new Error;function j0(i,e,{key:t}){let n=0,s=i[t],r={},a={};for(let o=1;o<=e.length;o++)a[o+n]=s[o],r[o+n]=!0,n+=H0(e[o-1]);i[t]=a,i[t]._emit=r,i[t]._multi=!0}function kT(i){if(!!Array.isArray(i.begin)){if(i.skip||i.excludeBegin||i.returnBegin)throw Pr("skip, excludeBegin, returnBegin not compatible with beginScope: {}"),Wc;if(typeof i.beginScope!="object"||i.beginScope===null)throw Pr("beginScope must be object"),Wc;j0(i,i.begin,{key:"beginScope"}),i.begin=Gd(i.begin,{joinWith:""})}}function zT(i){if(!!Array.isArray(i.end)){if(i.skip||i.excludeEnd||i.returnEnd)throw Pr("skip, excludeEnd, returnEnd not compatible with endScope: {}"),Wc;if(typeof i.endScope!="object"||i.endScope===null)throw Pr("endScope must be object"),Wc;j0(i,i.end,{key:"endScope"}),i.end=Gd(i.end,{joinWith:""})}}function HT(i){i.scope&&typeof i.scope=="object"&&i.scope!==null&&(i.beginScope=i.scope,delete i.scope)}function GT(i){HT(i),typeof i.beginScope=="string"&&(i.beginScope={_wrap:i.beginScope}),typeof i.endScope=="string"&&(i.endScope={_wrap:i.endScope}),kT(i),zT(i)}function VT(i){function e(a,o){return new RegExp(So(a),"m"+(i.case_insensitive?"i":"")+(i.unicodeRegex?"u":"")+(o?"g":""))}class t{constructor(){this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}addRule(o,l){l.position=this.position++,this.matchIndexes[this.matchAt]=l,this.regexes.push([l,o]),this.matchAt+=H0(o)+1}compile(){this.regexes.length===0&&(this.exec=()=>null);let o=this.regexes.map(l=>l[1]);this.matcherRe=e(Gd(o,{joinWith:"|"}),!0),this.lastIndex=0}exec(o){this.matcherRe.lastIndex=this.lastIndex;let l=this.matcherRe.exec(o);if(!l)return null;let c=l.findIndex((u,d)=>d>0&&u!==void 0),h=this.matchIndexes[c];return l.splice(0,c),Object.assign(l,h)}}class n{constructor(){this.rules=[],this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(o){if(this.multiRegexes[o])return this.multiRegexes[o];let l=new t;return this.rules.slice(o).forEach(([c,h])=>l.addRule(c,h)),l.compile(),this.multiRegexes[o]=l,l}resumingScanAtSamePosition(){return this.regexIndex!==0}considerAll(){this.regexIndex=0}addRule(o,l){this.rules.push([o,l]),l.type==="begin"&&this.count++}exec(o){let l=this.getMatcher(this.regexIndex);l.lastIndex=this.lastIndex;let c=l.exec(o);if(this.resumingScanAtSamePosition()&&!(c&&c.index===this.lastIndex)){let h=this.getMatcher(0);h.lastIndex=this.lastIndex+1,c=h.exec(o)}return c&&(this.regexIndex+=c.position+1,this.regexIndex===this.count&&this.considerAll()),c}}function s(a){let o=new n;return a.contains.forEach(l=>o.addRule(l.begin,{rule:l,type:"begin"})),a.terminatorEnd&&o.addRule(a.terminatorEnd,{type:"end"}),a.illegal&&o.addRule(a.illegal,{type:"illegal"}),o}function r(a,o){let l=a;if(a.isCompiled)return l;[RT,IT,GT,FT].forEach(h=>h(a,o)),i.compilerExtensions.forEach(h=>h(a,o)),a.__beforeBegin=null,[DT,PT,LT].forEach(h=>h(a,o)),a.isCompiled=!0;let c=null;return typeof a.keywords=="object"&&a.keywords.$pattern&&(a.keywords=Object.assign({},a.keywords),c=a.keywords.$pattern,delete a.keywords.$pattern),c=c||/\w+/,a.keywords&&(a.keywords=Y0(a.keywords,i.case_insensitive)),l.keywordPatternRe=e(c,!0),o&&(a.begin||(a.begin=/\B|\b/),l.beginRe=e(l.begin),!a.end&&!a.endsWithParent&&(a.end=/\B|\b/),a.end&&(l.endRe=e(l.end)),l.terminatorEnd=So(l.end)||"",a.endsWithParent&&o.terminatorEnd&&(l.terminatorEnd+=(a.end?"|":"")+o.terminatorEnd)),a.illegal&&(l.illegalRe=e(a.illegal)),a.contains||(a.contains=[]),a.contains=[].concat(...a.contains.map(function(h){return WT(h==="self"?a:h)})),a.contains.forEach(function(h){r(h,l)}),a.starts&&r(a.starts,o),l.matcher=s(l),l}if(i.compilerExtensions||(i.compilerExtensions=[]),i.contains&&i.contains.includes("self"))throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");return i.classNameAliases=Hs(i.classNameAliases||{}),r(i)}function Z0(i){return i?i.endsWithParent||Z0(i.starts):!1}function WT(i){return i.variants&&!i.cachedVariants&&(i.cachedVariants=i.variants.map(function(e){return Hs(i,{variants:null},e)})),i.cachedVariants?i.cachedVariants:Z0(i)?Hs(i,{starts:i.starts?Hs(i.starts):null}):Object.isFrozen(i)?Hs(i):i}var XT="11.9.0",K0=class extends Error{constructor(e,t){super(e);this.name="HTMLInjectionError",this.html=t}},Wd=U0,J0=Hs,$0=Symbol("nomatch"),YT=7,ev=function(i){let e=Object.create(null),t=Object.create(null),n=[],s=!0,r="Could not find the language '{}', did you forget to load/include a language module?",a={disableAutodetect:!0,name:"Plain text",contains:[]},o={ignoreUnescapedHTML:!1,throwUnescapedHTML:!1,noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",cssSelector:"pre code",languages:null,__emitter:k0};function l(I){return o.noHighlightRe.test(I)}function c(I){let P=I.className+" ";P+=I.parentNode?I.parentNode.className:"";let L=o.languageDetectRe.exec(P);if(L){let J=b(L[1]);return J||(q0(r.replace("{}",L[1])),q0("Falling back to no-highlight mode for this block.",I)),J?L[1]:"no-highlight"}return P.split(/\s+/).find(J=>l(J)||b(J))}function h(I,P,L){let J="",ae="";typeof P=="object"?(J=I,L=P.ignoreIllegals,ae=P.language):(Ta("10.7.0","highlight(lang, code, ...args) has been deprecated."),Ta("10.7.0",`Please use highlight(code, options) instead.
https://github.com/highlightjs/highlight.js/issues/2277`),ae=I,J=P),L===void 0&&(L=!0);let ve={code:J,language:ae};W("before:highlight",ve);let le=ve.result?ve.result:u(ve.language,ve.code,L);return le.code=ve.code,W("after:highlight",le),le}function u(I,P,L,J){let ae=Object.create(null);function ve(Z,K){return Z.keywords[K]}function le(){if(!pe.keywords){w.addText(_);return}let Z=0;pe.keywordPatternRe.lastIndex=0;let K=pe.keywordPatternRe.exec(_),oe="";for(;K;){oe+=_.substring(Z,K.index);let Te=Be.case_insensitive?K[0].toLowerCase():K[0],re=ve(pe,Te);if(re){let[ge,Fe]=re;if(w.addText(oe),oe="",ae[Te]=(ae[Te]||0)+1,ae[Te]<=YT&&(Y+=Fe),ge.startsWith("_"))oe+=K[0];else{let Qe=Be.classNameAliases[ge]||ge;ie(K[0],Qe)}}else oe+=K[0];Z=pe.keywordPatternRe.lastIndex,K=pe.keywordPatternRe.exec(_)}oe+=_.substring(Z),w.addText(oe)}function V(){if(_==="")return;let Z=null;if(typeof pe.subLanguage=="string"){if(!e[pe.subLanguage]){w.addText(_);return}Z=u(pe.subLanguage,_,!0,xe[pe.subLanguage]),xe[pe.subLanguage]=Z._top}else Z=p(_,pe.subLanguage.length?pe.subLanguage:null);pe.relevance>0&&(Y+=Z.relevance),w.__addSublanguage(Z._emitter,Z.language)}function j(){pe.subLanguage!=null?V():le(),_=""}function ie(Z,K){Z!==""&&(w.startScope(K),w.addText(Z),w.endScope())}function ue(Z,K){let oe=1,Te=K.length-1;for(;oe<=Te;){if(!Z._emit[oe]){oe++;continue}let re=Be.classNameAliases[Z[oe]]||Z[oe],ge=K[oe];re?ie(ge,re):(_=ge,le(),_=""),oe++}}function Ie(Z,K){return Z.scope&&typeof Z.scope=="string"&&w.openNode(Be.classNameAliases[Z.scope]||Z.scope),Z.beginScope&&(Z.beginScope._wrap?(ie(_,Be.classNameAliases[Z.beginScope._wrap]||Z.beginScope._wrap),_=""):Z.beginScope._multi&&(ue(Z.beginScope,K),_="")),pe=Object.create(Z,{parent:{value:pe}}),pe}function De(Z,K,oe){let Te=cT(Z.endRe,oe);if(Te){if(Z["on:end"]){let re=new zd(Z);Z["on:end"](K,re),re.isMatchIgnored&&(Te=!1)}if(Te){for(;Z.endsParent&&Z.parent;)Z=Z.parent;return Z}}if(Z.endsWithParent)return De(Z.parent,K,oe)}function He(Z){return pe.matcher.regexIndex===0?(_+=Z[0],1):(te=!0,0)}function $e(Z){let K=Z[0],oe=Z.rule,Te=new zd(oe),re=[oe.__beforeBegin,oe["on:begin"]];for(let ge of re)if(!!ge&&(ge(Z,Te),Te.isMatchIgnored))return He(K);return oe.skip?_+=K:(oe.excludeBegin&&(_+=K),j(),!oe.returnBegin&&!oe.excludeBegin&&(_=K)),Ie(oe,Z),oe.returnBegin?0:K.length}function We(Z){let K=Z[0],oe=P.substring(Z.index),Te=De(pe,Z,oe);if(!Te)return $0;let re=pe;pe.endScope&&pe.endScope._wrap?(j(),ie(K,pe.endScope._wrap)):pe.endScope&&pe.endScope._multi?(j(),ue(pe.endScope,Z)):re.skip?_+=K:(re.returnEnd||re.excludeEnd||(_+=K),j(),re.excludeEnd&&(_=K));do pe.scope&&w.closeNode(),!pe.skip&&!pe.subLanguage&&(Y+=pe.relevance),pe=pe.parent;while(pe!==Te.parent);return Te.starts&&Ie(Te.starts,Z),re.returnEnd?0:K.length}function Je(){let Z=[];for(let K=pe;K!==Be;K=K.parent)K.scope&&Z.unshift(K.scope);Z.forEach(K=>w.openNode(K))}let F={};function Dt(Z,K){let oe=K&&K[0];if(_+=Z,oe==null)return j(),0;if(F.type==="begin"&&K.type==="end"&&F.index===K.index&&oe===""){if(_+=P.slice(K.index,K.index+1),!s){let Te=new Error(`0 width match regex (${I})`);throw Te.languageName=I,Te.badRule=F.rule,Te}return 1}if(F=K,K.type==="begin")return $e(K);if(K.type==="illegal"&&!L){let Te=new Error('Illegal lexeme "'+oe+'" for mode "'+(pe.scope||"<unnamed>")+'"');throw Te.mode=pe,Te}else if(K.type==="end"){let Te=We(K);if(Te!==$0)return Te}if(K.type==="illegal"&&oe==="")return 1;if(se>1e5&&se>K.index*3)throw new Error("potential infinite loop, way more iterations than matches");return _+=oe,oe.length}let Be=b(I);if(!Be)throw Pr(r.replace("{}",I)),new Error('Unknown language: "'+I+'"');let qe=VT(Be),Le="",pe=J||qe,xe={},w=new o.__emitter(o);Je();let _="",Y=0,$=0,se=0,te=!1;try{if(Be.__emitTokens)Be.__emitTokens(P,w);else{for(pe.matcher.considerAll();;){se++,te?te=!1:pe.matcher.considerAll(),pe.matcher.lastIndex=$;let Z=pe.matcher.exec(P);if(!Z)break;let K=P.substring($,Z.index),oe=Dt(K,Z);$=Z.index+oe}Dt(P.substring($))}return w.finalize(),Le=w.toHTML(),{language:I,value:Le,relevance:Y,illegal:!1,_emitter:w,_top:pe}}catch(Z){if(Z.message&&Z.message.includes("Illegal"))return{language:I,value:Wd(P),illegal:!0,relevance:0,_illegalBy:{message:Z.message,index:$,context:P.slice($-100,$+100),mode:Z.mode,resultSoFar:Le},_emitter:w};if(s)return{language:I,value:Wd(P),illegal:!1,relevance:0,errorRaised:Z,_emitter:w,_top:pe};throw Z}}function d(I){let P={value:Wd(I),illegal:!1,relevance:0,_top:a,_emitter:new o.__emitter(o)};return P._emitter.addText(I),P}function p(I,P){P=P||o.languages||Object.keys(e);let L=d(I),J=P.filter(b).filter(D).map(j=>u(j,I,!1));J.unshift(L);let ae=J.sort((j,ie)=>{if(j.relevance!==ie.relevance)return ie.relevance-j.relevance;if(j.language&&ie.language){if(b(j.language).supersetOf===ie.language)return 1;if(b(ie.language).supersetOf===j.language)return-1}return 0}),[ve,le]=ae,V=ve;return V.secondBest=le,V}function g(I,P,L){let J=P&&t[P]||L;I.classList.add("hljs"),I.classList.add(`language-${J}`)}function v(I){let P=null,L=c(I);if(l(L))return;if(W("before:highlightElement",{el:I,language:L}),I.dataset.highlighted){console.log("Element previously highlighted. To highlight again, first unset `dataset.highlighted`.",I);return}if(I.children.length>0&&(o.ignoreUnescapedHTML||(console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."),console.warn("https://github.com/highlightjs/highlight.js/wiki/security"),console.warn("The element with unescaped HTML:"),console.warn(I)),o.throwUnescapedHTML))throw new K0("One of your code blocks includes unescaped HTML.",I.innerHTML);P=I;let J=P.textContent,ae=L?h(J,{language:L,ignoreIllegals:!0}):p(J);I.innerHTML=ae.value,I.dataset.highlighted="yes",g(I,L,ae.language),I.result={language:ae.language,re:ae.relevance,relevance:ae.relevance},ae.secondBest&&(I.secondBest={language:ae.secondBest.language,relevance:ae.secondBest.relevance}),W("after:highlightElement",{el:I,result:ae,text:J})}function m(I){o=J0(o,I)}let f=()=>{y(),Ta("10.6.0","initHighlighting() deprecated.  Use highlightAll() now.")};function x(){y(),Ta("10.6.0","initHighlightingOnLoad() deprecated.  Use highlightAll() now.")}let A=!1;function y(){if(document.readyState==="loading"){A=!0;return}document.querySelectorAll(o.cssSelector).forEach(v)}function T(){A&&y()}typeof window!="undefined"&&window.addEventListener&&window.addEventListener("DOMContentLoaded",T,!1);function M(I,P){let L=null;try{L=P(i)}catch(J){if(Pr("Language definition for '{}' could not be registered.".replace("{}",I)),s)Pr(J);else throw J;L=a}L.name||(L.name=I),e[I]=L,L.rawDefinition=P.bind(null,i),L.aliases&&S(L.aliases,{languageName:I})}function C(I){delete e[I];for(let P of Object.keys(t))t[P]===I&&delete t[P]}function R(){return Object.keys(e)}function b(I){return I=(I||"").toLowerCase(),e[I]||e[t[I]]}function S(I,{languageName:P}){typeof I=="string"&&(I=[I]),I.forEach(L=>{t[L.toLowerCase()]=P})}function D(I){let P=b(I);return P&&!P.disableAutodetect}function N(I){I["before:highlightBlock"]&&!I["before:highlightElement"]&&(I["before:highlightElement"]=P=>{I["before:highlightBlock"](Object.assign({block:P.el},P))}),I["after:highlightBlock"]&&!I["after:highlightElement"]&&(I["after:highlightElement"]=P=>{I["after:highlightBlock"](Object.assign({block:P.el},P))})}function U(I){N(I),n.push(I)}function B(I){let P=n.indexOf(I);P!==-1&&n.splice(P,1)}function W(I,P){let L=I;n.forEach(function(J){J[L]&&J[L](P)})}function G(I){return Ta("10.7.0","highlightBlock will be removed entirely in v12.0"),Ta("10.7.0","Please use highlightElement now."),v(I)}Object.assign(i,{highlight:h,highlightAuto:p,highlightAll:y,highlightElement:v,highlightBlock:G,configure:m,initHighlighting:f,initHighlightingOnLoad:x,registerLanguage:M,unregisterLanguage:C,listLanguages:R,getLanguage:b,registerAliases:S,autoDetection:D,inherit:J0,addPlugin:U,removePlugin:B}),i.debugMode=function(){s=!1},i.safeMode=function(){s=!0},i.versionString=XT,i.regex={concat:Dr,lookahead:z0,either:Hd,optional:oT,anyNumberOfTimes:aT};for(let I in Vc)typeof Vc[I]=="object"&&F0(Vc[I]);return Object.assign(i,Vc),i},Ma=ev({});Ma.newInstance=()=>ev({});tv.exports=Ma;Ma.HighlightJS=Ma;Ma.default=Ma});var Pi="172";var of=0,Jc=1,lf=2;var $c=1,cf=2,Ii=3,Hn=0,an=1,vn=2,$t=0,Qs=1,eh=2,th=3,nh=4,hf=5,vs=100,uf=101,df=102,ff=103,pf=104,mf=200,gf=201,vf=202,xf=203,Eo=204,To=205,yf=206,Af=207,_f=208,Sf=209,bf=210,Ef=211,Tf=212,Mf=213,wf=214,Mo=0,wo=1,Co=2,qs=3,Ro=4,Do=5,Po=6,Io=7,ih=0,Cf=1,Rf=2,Gi=0,Df=1,Pf=2,If=3,Lf=4,Ff=5,Uf=6,Nf=7,sh="attached",Bf="detached",rh=300,js=301,Zs=302,Lo=303,Fo=304,Ra=306,xs=1e3,Li=1001,Fr=1002,xn=1003,Uo=1004;var Ks=1005;var en=1006,Ur=1007;var gi=1008;var kt=1009,ah=1010,oh=1011,Nr=1012,No=1013,Fi=1014,Gn=1015,Br=1016,Bo=1017,Oo=1018,Vi=1020,lh=35902,ch=1021,hh=1022,Vn=1023,uh=1024,dh=1025,Js=1026,Wi=1027,ko=1028,zo=1029,fh=1030,Ho=1031;var Go=1033,Da=33776,Pa=33777,Ia=33778,La=33779,Vo=35840,Wo=35841,Xo=35842,Yo=35843,Qo=36196,qo=37492,jo=37496,Zo=37808,Ko=37809,Jo=37810,$o=37811,el=37812,tl=37813,nl=37814,il=37815,sl=37816,rl=37817,al=37818,ol=37819,ll=37820,cl=37821,Fa=36492,hl=36494,ul=36495,ph=36283,dl=36284,fl=36285,pl=36286;var $s=2300,er=2301,ml=2302,mh=2400,gh=2401,vh=2402,Of=2500;var xh=0,Ua=1,Or=2,vi=3200,yh=3201;var gl=0,kf=1,Wn="",nt="srgb",Wt="srgb-linear",Na="linear",Ft="srgb";var tr=7680;var Ah=519,zf=512,Hf=513,Gf=514,_h=515,Vf=516,Wf=517,Xf=518,Yf=519,vl=35044;var Sh="300 es",xi=2e3,Ba=2001,Fn=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;let n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;let s=this._listeners[e];if(s!==void 0){let r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;let n=this._listeners[e.type];if(n!==void 0){e.target=this;let s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}},An=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Qf=1234567,Oa=Math.PI/180,nr=180/Math.PI;function yi(){let i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(An[i&255]+An[i>>8&255]+An[i>>16&255]+An[i>>24&255]+"-"+An[e&255]+An[e>>8&255]+"-"+An[e>>16&15|64]+An[e>>24&255]+"-"+An[t&63|128]+An[t>>8&255]+"-"+An[t>>16&255]+An[t>>24&255]+An[n&255]+An[n>>8&255]+An[n>>16&255]+An[n>>24&255]).toLowerCase()}function gt(i,e,t){return Math.max(e,Math.min(t,i))}function bh(i,e){return(i%e+e)%e}function Jv(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function $v(i,e,t){return i!==e?(t-i)/(e-i):0}function ka(i,e,t){return(1-t)*i+t*e}function ex(i,e,t,n){return ka(i,e,1-Math.exp(-t*n))}function tx(i,e=1){return e-Math.abs(bh(i,e*2)-e)}function nx(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function ix(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function sx(i,e){return i+Math.floor(Math.random()*(e-i+1))}function rx(i,e){return i+Math.random()*(e-i)}function ax(i){return i*(.5-Math.random())}function ox(i){i!==void 0&&(Qf=i);let e=Qf+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function lx(i){return i*Oa}function cx(i){return i*nr}function hx(i){return(i&i-1)==0&&i!==0}function ux(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function dx(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function fx(i,e,t,n,s){let r=Math.cos,a=Math.sin,o=r(t/2),l=a(t/2),c=r((e+n)/2),h=a((e+n)/2),u=r((e-n)/2),d=a((e-n)/2),p=r((n-e)/2),g=a((n-e)/2);switch(s){case"XYX":i.set(o*h,l*u,l*d,o*c);break;case"YZY":i.set(l*d,o*h,l*u,o*c);break;case"ZXZ":i.set(l*u,l*d,o*h,o*c);break;case"XZX":i.set(o*h,l*g,l*p,o*c);break;case"YXY":i.set(l*p,o*h,l*g,o*c);break;case"ZYZ":i.set(l*g,l*p,o*h,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Ai(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Ut(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}var Eh={DEG2RAD:Oa,RAD2DEG:nr,generateUUID:yi,clamp:gt,euclideanModulo:bh,mapLinear:Jv,inverseLerp:$v,lerp:ka,damp:ex,pingpong:tx,smoothstep:nx,smootherstep:ix,randInt:sx,randFloat:rx,randFloatSpread:ax,seededRandom:ox,degToRad:lx,radToDeg:cx,isPowerOfTwo:hx,ceilPowerOfTwo:ux,floorPowerOfTwo:dx,setQuaternionFromProperEuler:fx,normalize:Ut,denormalize:Ai},Pe=class{constructor(e=0,t=0){Pe.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=gt(this.x,e.x,t.x),this.y=gt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=gt(this.x,e,t),this.y=gt(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(gt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(gt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},ot=class{constructor(e,t,n,s,r,a,o,l,c){ot.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c)}set(e,t,n,s,r,a,o,l,c){let h=this.elements;return h[0]=e,h[1]=s,h[2]=o,h[3]=t,h[4]=r,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],u=n[7],d=n[2],p=n[5],g=n[8],v=s[0],m=s[3],f=s[6],x=s[1],A=s[4],y=s[7],T=s[2],M=s[5],C=s[8];return r[0]=a*v+o*x+l*T,r[3]=a*m+o*A+l*M,r[6]=a*f+o*y+l*C,r[1]=c*v+h*x+u*T,r[4]=c*m+h*A+u*M,r[7]=c*f+h*y+u*C,r[2]=d*v+p*x+g*T,r[5]=d*m+p*A+g*M,r[8]=d*f+p*y+g*C,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8];return t*a*h-t*o*c-n*r*h+n*o*l+s*r*c-s*a*l}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],u=h*a-o*c,d=o*l-h*r,p=c*r-a*l,g=t*u+n*d+s*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let v=1/g;return e[0]=u*v,e[1]=(s*c-h*n)*v,e[2]=(o*n-s*a)*v,e[3]=d*v,e[4]=(h*t-s*l)*v,e[5]=(s*r-o*t)*v,e[6]=p*v,e[7]=(n*l-c*t)*v,e[8]=(a*t-n*r)*v,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,o){let l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-s*c,s*l,-s*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Th.makeScale(e,t)),this}rotate(e){return this.premultiply(Th.makeRotation(-e)),this}translate(e,t){return this.premultiply(Th.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Th=new ot;function Mh(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function kr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function qf(){let i=kr("canvas");return i.style.display="block",i}var jf={};function ir(i){i in jf||(jf[i]=!0,console.warn(i))}function Zf(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}function Kf(i){let e=i.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function Jf(i){let e=i.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}var $f=new ot().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),ep=new ot().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function px(){let i={enabled:!0,workingColorSpace:Wt,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===Ft&&(s.r=Xi(s.r),s.g=Xi(s.g),s.b=Xi(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Ft&&(s.r=zr(s.r),s.g=zr(s.g),s.b=zr(s.b))),s},fromWorkingColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},toWorkingColorSpace:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Wn?Na:this.spaces[s].transfer},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[Wt]:{primaries:e,whitePoint:n,transfer:Na,toXYZ:$f,fromXYZ:ep,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:nt},outputColorSpaceConfig:{drawingBufferColorSpace:nt}},[nt]:{primaries:e,whitePoint:n,transfer:Ft,toXYZ:$f,fromXYZ:ep,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:nt}}}),i}var mt=px();function Xi(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function zr(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}var Hr,wh=class{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement=="undefined")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Hr===void 0&&(Hr=kr("canvas")),Hr.width=e.width,Hr.height=e.height;let n=Hr.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=Hr}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement!="undefined"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&e instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&e instanceof ImageBitmap){let t=kr("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Xi(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Xi(t[n]/255)*255):t[n]=Xi(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},mx=0,xl=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:mx++}),this.uuid=yi(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Ch(s[a].image)):r.push(Ch(s[a]))}else r=Ch(s);n.url=r}return t||(e.images[this.uuid]=n),n}};function Ch(i){return typeof HTMLImageElement!="undefined"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&i instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&i instanceof ImageBitmap?wh.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var gx=0,zt=class extends Fn{constructor(e=zt.DEFAULT_IMAGE,t=zt.DEFAULT_MAPPING,n=Li,s=Li,r=en,a=gi,o=Vn,l=kt,c=zt.DEFAULT_ANISOTROPY,h=Wn){super();this.isTexture=!0,Object.defineProperty(this,"id",{value:gx++}),this.uuid=yi(),this.name="",this.source=new xl(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Pe(0,0),this.repeat=new Pe(1,1),this.center=new Pe(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ot,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==rh)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case xs:e.x=e.x-Math.floor(e.x);break;case Li:e.x=e.x<0?0:1;break;case Fr:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case xs:e.y=e.y-Math.floor(e.y);break;case Li:e.y=e.y<0?0:1;break;case Fr:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};zt.DEFAULT_IMAGE=null;zt.DEFAULT_MAPPING=rh;zt.DEFAULT_ANISOTROPY=1;var yt=class{constructor(e=0,t=0,n=0,s=1){yt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r,a=.01,o=.1,l=e.elements,c=l[0],h=l[4],u=l[8],d=l[1],p=l[5],g=l[9],v=l[2],m=l[6],f=l[10];if(Math.abs(h-d)<a&&Math.abs(u-v)<a&&Math.abs(g-m)<a){if(Math.abs(h+d)<o&&Math.abs(u+v)<o&&Math.abs(g+m)<o&&Math.abs(c+p+f-3)<o)return this.set(1,0,0,0),this;t=Math.PI;let A=(c+1)/2,y=(p+1)/2,T=(f+1)/2,M=(h+d)/4,C=(u+v)/4,R=(g+m)/4;return A>y&&A>T?A<a?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(A),s=M/n,r=C/n):y>T?y<a?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(y),n=M/s,r=R/s):T<a?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(T),n=C/r,s=R/r),this.set(n,s,r,t),this}let x=Math.sqrt((m-g)*(m-g)+(u-v)*(u-v)+(d-h)*(d-h));return Math.abs(x)<.001&&(x=1),this.x=(m-g)/x,this.y=(u-v)/x,this.z=(d-h)/x,this.w=Math.acos((c+p+f-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=gt(this.x,e.x,t.x),this.y=gt(this.y,e.y,t.y),this.z=gt(this.z,e.z,t.z),this.w=gt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=gt(this.x,e,t),this.y=gt(this.y,e,t),this.z=gt(this.z,e,t),this.w=gt(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(gt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Rh=class extends Fn{constructor(e=1,t=1,n={}){super();this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new yt(0,0,e,t),this.scissorTest=!1,this.viewport=new yt(0,0,e,t);let s={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:en,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);let r=new zt(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];let a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,s=e.textures.length;n<s;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0,this.textures[n].renderTarget=this;let t=Object.assign({},e.texture.image);return this.texture.source=new xl(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},Ht=class extends Rh{constructor(e=1,t=1,n={}){super(e,t,n);this.isWebGLRenderTarget=!0}},yl=class extends zt{constructor(e=null,t=1,n=1,s=1){super(null);this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=xn,this.minFilter=xn,this.wrapR=Li,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var Dh=class extends zt{constructor(e=null,t=1,n=1,s=1){super(null);this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=xn,this.minFilter=xn,this.wrapR=Li,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Xn=class{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let l=n[s+0],c=n[s+1],h=n[s+2],u=n[s+3],d=r[a+0],p=r[a+1],g=r[a+2],v=r[a+3];if(o===0){e[t+0]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u;return}if(o===1){e[t+0]=d,e[t+1]=p,e[t+2]=g,e[t+3]=v;return}if(u!==v||l!==d||c!==p||h!==g){let m=1-o,f=l*d+c*p+h*g+u*v,x=f>=0?1:-1,A=1-f*f;if(A>Number.EPSILON){let T=Math.sqrt(A),M=Math.atan2(T,f*x);m=Math.sin(m*M)/T,o=Math.sin(o*M)/T}let y=o*x;if(l=l*m+d*y,c=c*m+p*y,h=h*m+g*y,u=u*m+v*y,m===1-o){let T=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=T,c*=T,h*=T,u*=T}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,s,r,a){let o=n[s],l=n[s+1],c=n[s+2],h=n[s+3],u=r[a],d=r[a+1],p=r[a+2],g=r[a+3];return e[t]=o*g+h*u+l*p-c*d,e[t+1]=l*g+h*d+c*u-o*p,e[t+2]=c*g+h*p+o*d-l*u,e[t+3]=h*g-o*u-l*d-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(s/2),u=o(r/2),d=l(n/2),p=l(s/2),g=l(r/2);switch(a){case"XYZ":this._x=d*h*u+c*p*g,this._y=c*p*u-d*h*g,this._z=c*h*g+d*p*u,this._w=c*h*u-d*p*g;break;case"YXZ":this._x=d*h*u+c*p*g,this._y=c*p*u-d*h*g,this._z=c*h*g-d*p*u,this._w=c*h*u+d*p*g;break;case"ZXY":this._x=d*h*u-c*p*g,this._y=c*p*u+d*h*g,this._z=c*h*g+d*p*u,this._w=c*h*u-d*p*g;break;case"ZYX":this._x=d*h*u-c*p*g,this._y=c*p*u+d*h*g,this._z=c*h*g-d*p*u,this._w=c*h*u+d*p*g;break;case"YZX":this._x=d*h*u+c*p*g,this._y=c*p*u+d*h*g,this._z=c*h*g-d*p*u,this._w=c*h*u-d*p*g;break;case"XZY":this._x=d*h*u-c*p*g,this._y=c*p*u-d*h*g,this._z=c*h*g+d*p*u,this._w=c*h*u+d*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],h=t[6],u=t[10],d=n+o+u;if(d>0){let p=.5/Math.sqrt(d+1);this._w=.25/p,this._x=(h-l)*p,this._y=(r-c)*p,this._z=(a-s)*p}else if(n>o&&n>u){let p=2*Math.sqrt(1+n-o-u);this._w=(h-l)/p,this._x=.25*p,this._y=(s+a)/p,this._z=(r+c)/p}else if(o>u){let p=2*Math.sqrt(1+o-n-u);this._w=(r-c)/p,this._x=(s+a)/p,this._y=.25*p,this._z=(l+h)/p}else{let p=2*Math.sqrt(1+u-n-o);this._w=(a-s)/p,this._x=(r+c)/p,this._y=(l+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(gt(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+a*o+s*c-r*l,this._y=s*h+a*l+r*o-n*c,this._z=r*h+a*c+n*l-s*o,this._w=a*h-n*o-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,s=this._y,r=this._z,a=this._w,o=a*e._w+n*e._x+s*e._y+r*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=s,this._z=r,this;let l=1-o*o;if(l<=Number.EPSILON){let p=1-t;return this._w=p*a+t*this._w,this._x=p*n+t*this._x,this._y=p*s+t*this._y,this._z=p*r+t*this._z,this.normalize(),this}let c=Math.sqrt(l),h=Math.atan2(c,o),u=Math.sin((1-t)*h)/c,d=Math.sin(t*h)/c;return this._w=a*u+this._w*d,this._x=n*u+this._x*d,this._y=s*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},O=class{constructor(e=0,t=0,n=0){O.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(tp.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(tp.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*s-o*n),h=2*(o*t-r*s),u=2*(r*n-a*t);return this.x=t+l*c+a*u-o*h,this.y=n+l*h+o*c-r*u,this.z=s+l*u+r*h-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=gt(this.x,e.x,t.x),this.y=gt(this.y,e.y,t.y),this.z=gt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=gt(this.x,e,t),this.y=gt(this.y,e,t),this.z=gt(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(gt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Ph.copy(this).projectOnVector(e),this.sub(Ph)}reflect(e){return this.sub(Ph.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(gt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Ph=new O,tp=new Xn,si=class{constructor(e=new O(1/0,1/0,1/0),t=new O(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(_i.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(_i.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=_i.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,_i):_i.fromBufferAttribute(r,a),_i.applyMatrix4(e.matrixWorld),this.expandByPoint(_i);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Al.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Al.copy(n.boundingBox)),Al.applyMatrix4(e.matrixWorld),this.union(Al)}let s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,_i),_i.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(za),_l.subVectors(this.max,za),Gr.subVectors(e.a,za),Vr.subVectors(e.b,za),Wr.subVectors(e.c,za),ys.subVectors(Vr,Gr),As.subVectors(Wr,Vr),sr.subVectors(Gr,Wr);let t=[0,-ys.z,ys.y,0,-As.z,As.y,0,-sr.z,sr.y,ys.z,0,-ys.x,As.z,0,-As.x,sr.z,0,-sr.x,-ys.y,ys.x,0,-As.y,As.x,0,-sr.y,sr.x,0];return!Ih(t,Gr,Vr,Wr,_l)||(t=[1,0,0,0,1,0,0,0,1],!Ih(t,Gr,Vr,Wr,_l))?!1:(Sl.crossVectors(ys,As),t=[Sl.x,Sl.y,Sl.z],Ih(t,Gr,Vr,Wr,_l))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,_i).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(_i).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Yi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Yi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Yi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Yi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Yi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Yi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Yi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Yi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Yi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}},Yi=[new O,new O,new O,new O,new O,new O,new O,new O],_i=new O,Al=new si,Gr=new O,Vr=new O,Wr=new O,ys=new O,As=new O,sr=new O,za=new O,_l=new O,Sl=new O,rr=new O;function Ih(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){rr.fromArray(i,r);let o=s.x*Math.abs(rr.x)+s.y*Math.abs(rr.y)+s.z*Math.abs(rr.z),l=e.dot(rr),c=t.dot(rr),h=n.dot(rr);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}var vx=new si,Ha=new O,Lh=new O,Yn=class{constructor(e=new O,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):vx.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ha.subVectors(e,this.center);let t=Ha.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(Ha,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Lh.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ha.copy(e.center).add(Lh)),this.expandByPoint(Ha.copy(e.center).sub(Lh))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}},Qi=new O,Fh=new O,bl=new O,_s=new O,Uh=new O,El=new O,Nh=new O,ar=class{constructor(e=new O,t=new O(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Qi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Qi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Qi.copy(this.origin).addScaledVector(this.direction,t),Qi.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){Fh.copy(e).add(t).multiplyScalar(.5),bl.copy(t).sub(e).normalize(),_s.copy(this.origin).sub(Fh);let r=e.distanceTo(t)*.5,a=-this.direction.dot(bl),o=_s.dot(this.direction),l=-_s.dot(bl),c=_s.lengthSq(),h=Math.abs(1-a*a),u,d,p,g;if(h>0)if(u=a*l-o,d=a*o-l,g=r*h,u>=0)if(d>=-g)if(d<=g){let v=1/h;u*=v,d*=v,p=u*(u+a*d+2*o)+d*(a*u+d+2*l)+c}else d=r,u=Math.max(0,-(a*d+o)),p=-u*u+d*(d+2*l)+c;else d=-r,u=Math.max(0,-(a*d+o)),p=-u*u+d*(d+2*l)+c;else d<=-g?(u=Math.max(0,-(-a*r+o)),d=u>0?-r:Math.min(Math.max(-r,-l),r),p=-u*u+d*(d+2*l)+c):d<=g?(u=0,d=Math.min(Math.max(-r,-l),r),p=d*(d+2*l)+c):(u=Math.max(0,-(a*r+o)),d=u>0?r:Math.min(Math.max(-r,-l),r),p=-u*u+d*(d+2*l)+c);else d=a>0?-r:r,u=Math.max(0,-(a*d+o)),p=-u*u+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(Fh).addScaledVector(bl,d),p}intersectSphere(e,t){Qi.subVectors(e.center,this.origin);let n=Qi.dot(this.direction),s=Qi.dot(Qi)-n*n,r=e.radius*e.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,o,l,c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,s=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,s=(e.min.x-d.x)*c),h>=0?(r=(e.min.y-d.y)*h,a=(e.max.y-d.y)*h):(r=(e.max.y-d.y)*h,a=(e.min.y-d.y)*h),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),u>=0?(o=(e.min.z-d.z)*u,l=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,l=(e.min.z-d.z)*u),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,Qi)!==null}intersectTriangle(e,t,n,s,r){Uh.subVectors(t,e),El.subVectors(n,e),Nh.crossVectors(Uh,El);let a=this.direction.dot(Nh),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;_s.subVectors(this.origin,e);let l=o*this.direction.dot(El.crossVectors(_s,El));if(l<0)return null;let c=o*this.direction.dot(Uh.cross(_s));if(c<0||l+c>a)return null;let h=-o*_s.dot(Nh);return h<0?null:this.at(h/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Ze=class{constructor(e,t,n,s,r,a,o,l,c,h,u,d,p,g,v,m){Ze.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c,h,u,d,p,g,v,m)}set(e,t,n,s,r,a,o,l,c,h,u,d,p,g,v,m){let f=this.elements;return f[0]=e,f[4]=t,f[8]=n,f[12]=s,f[1]=r,f[5]=a,f[9]=o,f[13]=l,f[2]=c,f[6]=h,f[10]=u,f[14]=d,f[3]=p,f[7]=g,f[11]=v,f[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ze().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,n=e.elements,s=1/Xr.setFromMatrixColumn(e,0).length(),r=1/Xr.setFromMatrixColumn(e,1).length(),a=1/Xr.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){let d=a*h,p=a*u,g=o*h,v=o*u;t[0]=l*h,t[4]=-l*u,t[8]=c,t[1]=p+g*c,t[5]=d-v*c,t[9]=-o*l,t[2]=v-d*c,t[6]=g+p*c,t[10]=a*l}else if(e.order==="YXZ"){let d=l*h,p=l*u,g=c*h,v=c*u;t[0]=d+v*o,t[4]=g*o-p,t[8]=a*c,t[1]=a*u,t[5]=a*h,t[9]=-o,t[2]=p*o-g,t[6]=v+d*o,t[10]=a*l}else if(e.order==="ZXY"){let d=l*h,p=l*u,g=c*h,v=c*u;t[0]=d-v*o,t[4]=-a*u,t[8]=g+p*o,t[1]=p+g*o,t[5]=a*h,t[9]=v-d*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){let d=a*h,p=a*u,g=o*h,v=o*u;t[0]=l*h,t[4]=g*c-p,t[8]=d*c+v,t[1]=l*u,t[5]=v*c+d,t[9]=p*c-g,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){let d=a*l,p=a*c,g=o*l,v=o*c;t[0]=l*h,t[4]=v-d*u,t[8]=g*u+p,t[1]=u,t[5]=a*h,t[9]=-o*h,t[2]=-c*h,t[6]=p*u+g,t[10]=d-v*u}else if(e.order==="XZY"){let d=a*l,p=a*c,g=o*l,v=o*c;t[0]=l*h,t[4]=-u,t[8]=c*h,t[1]=d*u+v,t[5]=a*h,t[9]=p*u-g,t[2]=g*u-p,t[6]=o*h,t[10]=v*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(xx,e,yx)}lookAt(e,t,n){let s=this.elements;return Qn.subVectors(e,t),Qn.lengthSq()===0&&(Qn.z=1),Qn.normalize(),Ss.crossVectors(n,Qn),Ss.lengthSq()===0&&(Math.abs(n.z)===1?Qn.x+=1e-4:Qn.z+=1e-4,Qn.normalize(),Ss.crossVectors(n,Qn)),Ss.normalize(),Tl.crossVectors(Qn,Ss),s[0]=Ss.x,s[4]=Tl.x,s[8]=Qn.x,s[1]=Ss.y,s[5]=Tl.y,s[9]=Qn.y,s[2]=Ss.z,s[6]=Tl.z,s[10]=Qn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],u=n[5],d=n[9],p=n[13],g=n[2],v=n[6],m=n[10],f=n[14],x=n[3],A=n[7],y=n[11],T=n[15],M=s[0],C=s[4],R=s[8],b=s[12],S=s[1],D=s[5],N=s[9],U=s[13],B=s[2],W=s[6],G=s[10],I=s[14],P=s[3],L=s[7],J=s[11],ae=s[15];return r[0]=a*M+o*S+l*B+c*P,r[4]=a*C+o*D+l*W+c*L,r[8]=a*R+o*N+l*G+c*J,r[12]=a*b+o*U+l*I+c*ae,r[1]=h*M+u*S+d*B+p*P,r[5]=h*C+u*D+d*W+p*L,r[9]=h*R+u*N+d*G+p*J,r[13]=h*b+u*U+d*I+p*ae,r[2]=g*M+v*S+m*B+f*P,r[6]=g*C+v*D+m*W+f*L,r[10]=g*R+v*N+m*G+f*J,r[14]=g*b+v*U+m*I+f*ae,r[3]=x*M+A*S+y*B+T*P,r[7]=x*C+A*D+y*W+T*L,r[11]=x*R+A*N+y*G+T*J,r[15]=x*b+A*U+y*I+T*ae,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],h=e[2],u=e[6],d=e[10],p=e[14],g=e[3],v=e[7],m=e[11],f=e[15];return g*(+r*l*u-s*c*u-r*o*d+n*c*d+s*o*p-n*l*p)+v*(+t*l*p-t*c*d+r*a*d-s*a*p+s*c*h-r*l*h)+m*(+t*c*u-t*o*p-r*a*u+n*a*p+r*o*h-n*c*h)+f*(-s*o*h-t*l*u+t*o*d+s*a*u-n*a*d+n*l*h)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],u=e[9],d=e[10],p=e[11],g=e[12],v=e[13],m=e[14],f=e[15],x=u*m*c-v*d*c+v*l*p-o*m*p-u*l*f+o*d*f,A=g*d*c-h*m*c-g*l*p+a*m*p+h*l*f-a*d*f,y=h*v*c-g*u*c+g*o*p-a*v*p-h*o*f+a*u*f,T=g*u*l-h*v*l-g*o*d+a*v*d+h*o*m-a*u*m,M=t*x+n*A+s*y+r*T;if(M===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let C=1/M;return e[0]=x*C,e[1]=(v*d*r-u*m*r-v*s*p+n*m*p+u*s*f-n*d*f)*C,e[2]=(o*m*r-v*l*r+v*s*c-n*m*c-o*s*f+n*l*f)*C,e[3]=(u*l*r-o*d*r-u*s*c+n*d*c+o*s*p-n*l*p)*C,e[4]=A*C,e[5]=(h*m*r-g*d*r+g*s*p-t*m*p-h*s*f+t*d*f)*C,e[6]=(g*l*r-a*m*r-g*s*c+t*m*c+a*s*f-t*l*f)*C,e[7]=(a*d*r-h*l*r+h*s*c-t*d*c-a*s*p+t*l*p)*C,e[8]=y*C,e[9]=(g*u*r-h*v*r-g*n*p+t*v*p+h*n*f-t*u*f)*C,e[10]=(a*v*r-g*o*r+g*n*c-t*v*c-a*n*f+t*o*f)*C,e[11]=(h*o*r-a*u*r-h*n*c+t*u*c+a*n*p-t*o*p)*C,e[12]=T*C,e[13]=(h*v*s-g*u*s+g*n*d-t*v*d-h*n*m+t*u*m)*C,e[14]=(g*o*s-a*v*s-g*n*l+t*v*l+a*n*m-t*o*m)*C,e[15]=(a*u*s-h*o*s+h*n*l-t*u*l-a*n*d+t*o*d)*C,this}scale(e){let t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,o=e.y,l=e.z,c=r*a,h=r*o;return this.set(c*a+n,c*o-s*l,c*l+s*o,0,c*o+s*l,h*o+n,h*l-s*a,0,c*l-s*o,h*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){let s=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,h=a+a,u=o+o,d=r*c,p=r*h,g=r*u,v=a*h,m=a*u,f=o*u,x=l*c,A=l*h,y=l*u,T=n.x,M=n.y,C=n.z;return s[0]=(1-(v+f))*T,s[1]=(p+y)*T,s[2]=(g-A)*T,s[3]=0,s[4]=(p-y)*M,s[5]=(1-(d+f))*M,s[6]=(m+x)*M,s[7]=0,s[8]=(g+A)*C,s[9]=(m-x)*C,s[10]=(1-(d+v))*C,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){let s=this.elements,r=Xr.set(s[0],s[1],s[2]).length(),a=Xr.set(s[4],s[5],s[6]).length(),o=Xr.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],Si.copy(this);let c=1/r,h=1/a,u=1/o;return Si.elements[0]*=c,Si.elements[1]*=c,Si.elements[2]*=c,Si.elements[4]*=h,Si.elements[5]*=h,Si.elements[6]*=h,Si.elements[8]*=u,Si.elements[9]*=u,Si.elements[10]*=u,t.setFromRotationMatrix(Si),n.x=r,n.y=a,n.z=o,this}makePerspective(e,t,n,s,r,a,o=xi){let l=this.elements,c=2*r/(t-e),h=2*r/(n-s),u=(t+e)/(t-e),d=(n+s)/(n-s),p,g;if(o===xi)p=-(a+r)/(a-r),g=-2*a*r/(a-r);else if(o===Ba)p=-a/(a-r),g=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,s,r,a,o=xi){let l=this.elements,c=1/(t-e),h=1/(n-s),u=1/(a-r),d=(t+e)*c,p=(n+s)*h,g,v;if(o===xi)g=(a+r)*u,v=-2*u;else if(o===Ba)g=r*u,v=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-p,l[2]=0,l[6]=0,l[10]=v,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},Xr=new O,Si=new Ze,xx=new O(0,0,0),yx=new O(1,1,1),Ss=new O,Tl=new O,Qn=new O,np=new Ze,ip=new Xn,ri=class{constructor(e=0,t=0,n=0,s=ri.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let s=e.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],h=s[9],u=s[2],d=s[6],p=s[10];switch(t){case"XYZ":this._y=Math.asin(gt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-gt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(gt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,p),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-gt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,p),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(gt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-gt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return np.makeRotationFromQuaternion(e),this.setFromRotationMatrix(np,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return ip.setFromEuler(this),this.setFromQuaternion(ip,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};ri.DEFAULT_ORDER="XYZ";var Ga=class{constructor(){this.mask=1|0}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=4294967295|0}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!=0}isEnabled(e){return(this.mask&(1<<e|0))!=0}},Ax=0,sp=new O,Yr=new Xn,qi=new Ze,Ml=new O,Va=new O,_x=new O,Sx=new Xn,rp=new O(1,0,0),ap=new O(0,1,0),op=new O(0,0,1),lp={type:"added"},bx={type:"removed"},Qr={type:"childadded",child:null},Bh={type:"childremoved",child:null},Rt=class extends Fn{constructor(){super();this.isObject3D=!0,Object.defineProperty(this,"id",{value:Ax++}),this.uuid=yi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Rt.DEFAULT_UP.clone();let e=new O,t=new ri,n=new Xn,s=new O(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Ze},normalMatrix:{value:new ot}}),this.matrix=new Ze,this.matrixWorld=new Ze,this.matrixAutoUpdate=Rt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Rt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ga,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Yr.setFromAxisAngle(e,t),this.quaternion.multiply(Yr),this}rotateOnWorldAxis(e,t){return Yr.setFromAxisAngle(e,t),this.quaternion.premultiply(Yr),this}rotateX(e){return this.rotateOnAxis(rp,e)}rotateY(e){return this.rotateOnAxis(ap,e)}rotateZ(e){return this.rotateOnAxis(op,e)}translateOnAxis(e,t){return sp.copy(e).applyQuaternion(this.quaternion),this.position.add(sp.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(rp,e)}translateY(e){return this.translateOnAxis(ap,e)}translateZ(e){return this.translateOnAxis(op,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(qi.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Ml.copy(e):Ml.set(e,t,n);let s=this.parent;this.updateWorldMatrix(!0,!1),Va.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?qi.lookAt(Va,Ml,this.up):qi.lookAt(Ml,Va,this.up),this.quaternion.setFromRotationMatrix(qi),s&&(qi.extractRotation(s.matrixWorld),Yr.setFromRotationMatrix(qi),this.quaternion.premultiply(Yr.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(lp),Qr.child=e,this.dispatchEvent(Qr),Qr.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(bx),Bh.child=e,this.dispatchEvent(Bh),Bh.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),qi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),qi.multiply(e.parent.matrixWorld)),e.applyMatrix4(qi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(lp),Qr.child=e,this.dispatchEvent(Qr),Qr.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){let a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Va,e,_x),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Va,Sx,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let u=l[c];r(e.shapes,u)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];s.animations.push(r(e.animations,l))}}if(t){let o=a(e.geometries),l=a(e.materials),c=a(e.textures),h=a(e.images),u=a(e.shapes),d=a(e.skeletons),p=a(e.animations),g=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),p.length>0&&(n.animations=p),g.length>0&&(n.nodes=g)}return n.object=s,n;function a(o){let l=[];for(let c in o){let h=o[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let s=e.children[n];this.add(s.clone())}return this}};Rt.DEFAULT_UP=new O(0,1,0);Rt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Rt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var bi=new O,ji=new O,Oh=new O,Zi=new O,qr=new O,jr=new O,cp=new O,kh=new O,zh=new O,Hh=new O,Gh=new yt,Vh=new yt,Wh=new yt,qn=class{constructor(e=new O,t=new O,n=new O){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),bi.subVectors(e,t),s.cross(bi);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){bi.subVectors(s,t),ji.subVectors(n,t),Oh.subVectors(e,t);let a=bi.dot(bi),o=bi.dot(ji),l=bi.dot(Oh),c=ji.dot(ji),h=ji.dot(Oh),u=a*c-o*o;if(u===0)return r.set(0,0,0),null;let d=1/u,p=(c*l-o*h)*d,g=(a*h-o*l)*d;return r.set(1-p-g,g,p)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,Zi)===null?!1:Zi.x>=0&&Zi.y>=0&&Zi.x+Zi.y<=1}static getInterpolation(e,t,n,s,r,a,o,l){return this.getBarycoord(e,t,n,s,Zi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Zi.x),l.addScaledVector(a,Zi.y),l.addScaledVector(o,Zi.z),l)}static getInterpolatedAttribute(e,t,n,s,r,a){return Gh.setScalar(0),Vh.setScalar(0),Wh.setScalar(0),Gh.fromBufferAttribute(e,t),Vh.fromBufferAttribute(e,n),Wh.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(Gh,r.x),a.addScaledVector(Vh,r.y),a.addScaledVector(Wh,r.z),a}static isFrontFacing(e,t,n,s){return bi.subVectors(n,t),ji.subVectors(e,t),bi.cross(ji).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return bi.subVectors(this.c,this.b),ji.subVectors(this.a,this.b),bi.cross(ji).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return qn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return qn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return qn.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return qn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return qn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,s=this.b,r=this.c,a,o;qr.subVectors(s,n),jr.subVectors(r,n),kh.subVectors(e,n);let l=qr.dot(kh),c=jr.dot(kh);if(l<=0&&c<=0)return t.copy(n);zh.subVectors(e,s);let h=qr.dot(zh),u=jr.dot(zh);if(h>=0&&u<=h)return t.copy(s);let d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return a=l/(l-h),t.copy(n).addScaledVector(qr,a);Hh.subVectors(e,r);let p=qr.dot(Hh),g=jr.dot(Hh);if(g>=0&&p<=g)return t.copy(r);let v=p*c-l*g;if(v<=0&&c>=0&&g<=0)return o=c/(c-g),t.copy(n).addScaledVector(jr,o);let m=h*g-p*u;if(m<=0&&u-h>=0&&p-g>=0)return cp.subVectors(r,s),o=(u-h)/(u-h+(p-g)),t.copy(s).addScaledVector(cp,o);let f=1/(m+v+d);return a=v*f,o=d*f,t.copy(n).addScaledVector(qr,a).addScaledVector(jr,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},hp={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},bs={h:0,s:0,l:0},wl={h:0,s:0,l:0};function Xh(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}var Ae=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=nt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,mt.toWorkingColorSpace(this,t),this}setRGB(e,t,n,s=mt.workingColorSpace){return this.r=e,this.g=t,this.b=n,mt.toWorkingColorSpace(this,s),this}setHSL(e,t,n,s=mt.workingColorSpace){if(e=bh(e,1),t=gt(t,0,1),n=gt(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=Xh(a,r,e+1/3),this.g=Xh(a,r,e),this.b=Xh(a,r,e-1/3)}return mt.toWorkingColorSpace(this,s),this}setStyle(e,t=nt){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=nt){let n=hp[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Xi(e.r),this.g=Xi(e.g),this.b=Xi(e.b),this}copyLinearToSRGB(e){return this.r=zr(e.r),this.g=zr(e.g),this.b=zr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=nt){return mt.fromWorkingColorSpace(_n.copy(this),e),Math.round(gt(_n.r*255,0,255))*65536+Math.round(gt(_n.g*255,0,255))*256+Math.round(gt(_n.b*255,0,255))}getHexString(e=nt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=mt.workingColorSpace){mt.fromWorkingColorSpace(_n.copy(this),t);let n=_n.r,s=_n.g,r=_n.b,a=Math.max(n,s,r),o=Math.min(n,s,r),l,c,h=(o+a)/2;if(o===a)l=0,c=0;else{let u=a-o;switch(c=h<=.5?u/(a+o):u/(2-a-o),a){case n:l=(s-r)/u+(s<r?6:0);break;case s:l=(r-n)/u+2;break;case r:l=(n-s)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=mt.workingColorSpace){return mt.fromWorkingColorSpace(_n.copy(this),t),e.r=_n.r,e.g=_n.g,e.b=_n.b,e}getStyle(e=nt){mt.fromWorkingColorSpace(_n.copy(this),e);let t=_n.r,n=_n.g,s=_n.b;return e!==nt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(bs),this.setHSL(bs.h+e,bs.s+t,bs.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(bs),e.getHSL(wl);let n=ka(bs.h,wl.h,t),s=ka(bs.s,wl.s,t),r=ka(bs.l,wl.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},_n=new Ae;Ae.NAMES=hp;var Ex=0,fn=class extends Fn{constructor(){super();this.isMaterial=!0,Object.defineProperty(this,"id",{value:Ex++}),this.uuid=yi(),this.name="",this.type="Material",this.blending=Qs,this.side=Hn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Eo,this.blendDst=To,this.blendEquation=vs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ae(0,0,0),this.blendAlpha=0,this.depthFunc=qs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ah,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=tr,this.stencilZFail=tr,this.stencilZPass=tr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Qs&&(n.blending=this.blending),this.side!==Hn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Eo&&(n.blendSrc=this.blendSrc),this.blendDst!==To&&(n.blendDst=this.blendDst),this.blendEquation!==vs&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==qs&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Ah&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==tr&&(n.stencilFail=this.stencilFail),this.stencilZFail!==tr&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==tr&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){let a=[];for(let o in r){let l=r[o];delete l.metadata,a.push(l)}return a}if(t){let r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}},ai=class extends fn{constructor(e){super();this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ae(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ri,this.combine=ih,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}};var on=new O,Cl=new Pe,Gt=class{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=vl,this.updateRanges=[],this.gpuType=Gn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Cl.fromBufferAttribute(this,t),Cl.applyMatrix3(e),this.setXY(t,Cl.x,Cl.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)on.fromBufferAttribute(this,t),on.applyMatrix3(e),this.setXYZ(t,on.x,on.y,on.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)on.fromBufferAttribute(this,t),on.applyMatrix4(e),this.setXYZ(t,on.x,on.y,on.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)on.fromBufferAttribute(this,t),on.applyNormalMatrix(e),this.setXYZ(t,on.x,on.y,on.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)on.fromBufferAttribute(this,t),on.transformDirection(e),this.setXYZ(t,on.x,on.y,on.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Ai(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Ut(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Ai(t,this.array)),t}setX(e,t){return this.normalized&&(t=Ut(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Ai(t,this.array)),t}setY(e,t){return this.normalized&&(t=Ut(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Ai(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Ut(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Ai(t,this.array)),t}setW(e,t){return this.normalized&&(t=Ut(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Ut(t,this.array),n=Ut(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=Ut(t,this.array),n=Ut(n,this.array),s=Ut(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=Ut(t,this.array),n=Ut(n,this.array),s=Ut(s,this.array),r=Ut(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==vl&&(e.usage=this.usage),e}};var Rl=class extends Gt{constructor(e,t,n){super(new Uint16Array(e),t,n)}};var Dl=class extends Gt{constructor(e,t,n){super(new Uint32Array(e),t,n)}};var Xt=class extends Gt{constructor(e,t,n){super(new Float32Array(e),t,n)}},Tx=0,oi=new Ze,Yh=new Rt,Zr=new O,jn=new si,Wa=new si,pn=new O,Yt=class extends Fn{constructor(){super();this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Tx++}),this.uuid=yi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Mh(e)?Dl:Rl)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let r=new ot().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return oi.makeRotationFromQuaternion(e),this.applyMatrix4(oi),this}rotateX(e){return oi.makeRotationX(e),this.applyMatrix4(oi),this}rotateY(e){return oi.makeRotationY(e),this.applyMatrix4(oi),this}rotateZ(e){return oi.makeRotationZ(e),this.applyMatrix4(oi),this}translate(e,t,n){return oi.makeTranslation(e,t,n),this.applyMatrix4(oi),this}scale(e,t,n){return oi.makeScale(e,t,n),this.applyMatrix4(oi),this}lookAt(e){return Yh.lookAt(e),Yh.updateMatrix(),this.applyMatrix4(Yh.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Zr).negate(),this.translate(Zr.x,Zr.y,Zr.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let s=0,r=e.length;s<r;s++){let a=e[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Xt(n,3))}else{let n=Math.min(e.length,t.count);for(let s=0;s<n;s++){let r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new si);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new O(-1/0,-1/0,-1/0),new O(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){let r=t[n];jn.setFromBufferAttribute(r),this.morphTargetsRelative?(pn.addVectors(this.boundingBox.min,jn.min),this.boundingBox.expandByPoint(pn),pn.addVectors(this.boundingBox.max,jn.max),this.boundingBox.expandByPoint(pn)):(this.boundingBox.expandByPoint(jn.min),this.boundingBox.expandByPoint(jn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Yn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new O,1/0);return}if(e){let n=this.boundingSphere.center;if(jn.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){let o=t[r];Wa.setFromBufferAttribute(o),this.morphTargetsRelative?(pn.addVectors(jn.min,Wa.min),jn.expandByPoint(pn),pn.addVectors(jn.max,Wa.max),jn.expandByPoint(pn)):(jn.expandByPoint(Wa.min),jn.expandByPoint(Wa.max))}jn.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)pn.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(pn));if(t)for(let r=0,a=t.length;r<a;r++){let o=t[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)pn.fromBufferAttribute(o,c),l&&(Zr.fromBufferAttribute(e,c),pn.add(Zr)),s=Math.max(s,n.distanceToSquared(pn))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let n=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Gt(new Float32Array(4*n.count),4));let a=this.getAttribute("tangent"),o=[],l=[];for(let R=0;R<n.count;R++)o[R]=new O,l[R]=new O;let c=new O,h=new O,u=new O,d=new Pe,p=new Pe,g=new Pe,v=new O,m=new O;function f(R,b,S){c.fromBufferAttribute(n,R),h.fromBufferAttribute(n,b),u.fromBufferAttribute(n,S),d.fromBufferAttribute(r,R),p.fromBufferAttribute(r,b),g.fromBufferAttribute(r,S),h.sub(c),u.sub(c),p.sub(d),g.sub(d);let D=1/(p.x*g.y-g.x*p.y);!isFinite(D)||(v.copy(h).multiplyScalar(g.y).addScaledVector(u,-p.y).multiplyScalar(D),m.copy(u).multiplyScalar(p.x).addScaledVector(h,-g.x).multiplyScalar(D),o[R].add(v),o[b].add(v),o[S].add(v),l[R].add(m),l[b].add(m),l[S].add(m))}let x=this.groups;x.length===0&&(x=[{start:0,count:e.count}]);for(let R=0,b=x.length;R<b;++R){let S=x[R],D=S.start,N=S.count;for(let U=D,B=D+N;U<B;U+=3)f(e.getX(U+0),e.getX(U+1),e.getX(U+2))}let A=new O,y=new O,T=new O,M=new O;function C(R){T.fromBufferAttribute(s,R),M.copy(T);let b=o[R];A.copy(b),A.sub(T.multiplyScalar(T.dot(b))).normalize(),y.crossVectors(M,b);let D=y.dot(l[R])<0?-1:1;a.setXYZW(R,A.x,A.y,A.z,D)}for(let R=0,b=x.length;R<b;++R){let S=x[R],D=S.start,N=S.count;for(let U=D,B=D+N;U<B;U+=3)C(e.getX(U+0)),C(e.getX(U+1)),C(e.getX(U+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Gt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,p=n.count;d<p;d++)n.setXYZ(d,0,0,0);let s=new O,r=new O,a=new O,o=new O,l=new O,c=new O,h=new O,u=new O;if(e)for(let d=0,p=e.count;d<p;d+=3){let g=e.getX(d+0),v=e.getX(d+1),m=e.getX(d+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,v),a.fromBufferAttribute(t,m),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,v),c.fromBufferAttribute(n,m),o.add(h),l.add(h),c.add(h),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(v,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let d=0,p=t.count;d<p;d+=3)s.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)pn.fromBufferAttribute(e,t),pn.normalize(),e.setXYZ(t,pn.x,pn.y,pn.z)}toNonIndexed(){function e(o,l){let c=o.array,h=o.itemSize,u=o.normalized,d=new c.constructor(l.length*h),p=0,g=0;for(let v=0,m=l.length;v<m;v++){o.isInterleavedBufferAttribute?p=l[v]*o.data.stride+o.offset:p=l[v]*h;for(let f=0;f<h;f++)d[g++]=c[p++]}return new Gt(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new Yt,n=this.index.array,s=this.attributes;for(let o in s){let l=s[o],c=e(l,n);t.setAttribute(o,c)}let r=this.morphAttributes;for(let o in r){let l=[],c=r[o];for(let h=0,u=c.length;h<u;h++){let d=c[h],p=e(d,n);l.push(p)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let l in n){let c=n[l];e.data.attributes[l]=c.toJSON(e.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){let p=c[u];h.push(p.toJSON(e.data))}h.length>0&&(s[l]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone(t));let s=e.attributes;for(let c in s){let h=s[c];this.setAttribute(c,h.clone(t))}let r=e.morphAttributes;for(let c in r){let h=[],u=r[c];for(let d=0,p=u.length;d<p;d++)h.push(u[d].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let c=0,h=a.length;c<h;c++){let u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},up=new Ze,or=new ar,Pl=new Yn,dp=new O,Il=new O,Ll=new O,Fl=new O,Qh=new O,Ul=new O,fp=new O,Nl=new O,Qt=class extends Rt{constructor(e=new Yt,t=new ai){super();this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){let n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);let o=this.morphTargetInfluences;if(r&&o){Ul.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let h=o[l],u=r[l];h!==0&&(Qh.fromBufferAttribute(u,e),a?Ul.addScaledVector(Qh,h):Ul.addScaledVector(Qh.sub(t),h))}t.add(Ul)}return t}raycast(e,t){let n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Pl.copy(n.boundingSphere),Pl.applyMatrix4(r),or.copy(e.ray).recast(e.near),!(Pl.containsPoint(or.origin)===!1&&(or.intersectSphere(Pl,dp)===null||or.origin.distanceToSquared(dp)>(e.far-e.near)**2))&&(up.copy(r).invert(),or.copy(e.ray).applyMatrix4(up),!(n.boundingBox!==null&&or.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,or)))}_computeIntersections(e,t,n){let s,r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,p=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,v=d.length;g<v;g++){let m=d[g],f=a[m.materialIndex],x=Math.max(m.start,p.start),A=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let y=x,T=A;y<T;y+=3){let M=o.getX(y),C=o.getX(y+1),R=o.getX(y+2);s=Bl(this,f,e,n,c,h,u,M,C,R),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{let g=Math.max(0,p.start),v=Math.min(o.count,p.start+p.count);for(let m=g,f=v;m<f;m+=3){let x=o.getX(m),A=o.getX(m+1),y=o.getX(m+2);s=Bl(this,a,e,n,c,h,u,x,A,y),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,v=d.length;g<v;g++){let m=d[g],f=a[m.materialIndex],x=Math.max(m.start,p.start),A=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));for(let y=x,T=A;y<T;y+=3){let M=y,C=y+1,R=y+2;s=Bl(this,f,e,n,c,h,u,M,C,R),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{let g=Math.max(0,p.start),v=Math.min(l.count,p.start+p.count);for(let m=g,f=v;m<f;m+=3){let x=m,A=m+1,y=m+2;s=Bl(this,a,e,n,c,h,u,x,A,y),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}};function Mx(i,e,t,n,s,r,a,o){let l;if(e.side===an?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,e.side===Hn,o),l===null)return null;Nl.copy(o),Nl.applyMatrix4(i.matrixWorld);let c=t.ray.origin.distanceTo(Nl);return c<t.near||c>t.far?null:{distance:c,point:Nl.clone(),object:i}}function Bl(i,e,t,n,s,r,a,o,l,c){i.getVertexPosition(o,Il),i.getVertexPosition(l,Ll),i.getVertexPosition(c,Fl);let h=Mx(i,e,t,n,Il,Ll,Fl,fp);if(h){let u=new O;qn.getBarycoord(fp,Il,Ll,Fl,u),s&&(h.uv=qn.getInterpolatedAttribute(s,o,l,c,u,new Pe)),r&&(h.uv1=qn.getInterpolatedAttribute(r,o,l,c,u,new Pe)),a&&(h.normal=qn.getInterpolatedAttribute(a,o,l,c,u,new O),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let d={a:o,b:l,c,normal:new O,materialIndex:0};qn.getNormal(Il,Ll,Fl,d.normal),h.face=d,h.barycoord=u}return h}var Ki=class extends Yt{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super();this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let l=[],c=[],h=[],u=[],d=0,p=0;g("z","y","x",-1,-1,n,t,e,a,r,0),g("z","y","x",1,-1,n,t,-e,a,r,1),g("x","z","y",1,1,e,n,t,s,a,2),g("x","z","y",1,-1,e,n,-t,s,a,3),g("x","y","z",1,-1,e,t,n,s,r,4),g("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new Xt(c,3)),this.setAttribute("normal",new Xt(h,3)),this.setAttribute("uv",new Xt(u,2));function g(v,m,f,x,A,y,T,M,C,R,b){let S=y/C,D=T/R,N=y/2,U=T/2,B=M/2,W=C+1,G=R+1,I=0,P=0,L=new O;for(let J=0;J<G;J++){let ae=J*D-U;for(let ve=0;ve<W;ve++){let le=ve*S-N;L[v]=le*x,L[m]=ae*A,L[f]=B,c.push(L.x,L.y,L.z),L[v]=0,L[m]=0,L[f]=M>0?1:-1,h.push(L.x,L.y,L.z),u.push(ve/C),u.push(1-J/R),I+=1}}for(let J=0;J<R;J++)for(let ae=0;ae<C;ae++){let ve=d+ae+W*J,le=d+ae+W*(J+1),V=d+(ae+1)+W*(J+1),j=d+(ae+1)+W*J;l.push(ve,le,j),l.push(le,V,j),P+=6}o.addGroup(p,P,b),p+=P,d+=I}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ki(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function lr(i){let e={};for(let t in i){e[t]={};for(let n in i[t]){let s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function Sn(i){let e={};for(let t=0;t<i.length;t++){let n=lr(i[t]);for(let s in n)e[s]=n[s]}return e}function wx(i){let e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function qh(i){let e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:mt.workingColorSpace}var pp={clone:lr,merge:Sn},Cx=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Rx=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Nt=class extends fn{constructor(e){super();this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Cx,this.fragmentShader=Rx,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=lr(e.uniforms),this.uniformsGroups=wx(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},cr=class extends Rt{constructor(){super();this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ze,this.projectionMatrix=new Ze,this.projectionMatrixInverse=new Ze,this.coordinateSystem=xi}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},Es=new O,mp=new Pe,gp=new Pe,qt=class extends cr{constructor(e=50,t=1,n=.1,s=2e3){super();this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=nr*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Oa*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return nr*2*Math.atan(Math.tan(Oa*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Es.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Es.x,Es.y).multiplyScalar(-e/Es.z),Es.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Es.x,Es.y).multiplyScalar(-e/Es.z)}getViewSize(e,t){return this.getViewBounds(e,mp,gp),t.subVectors(gp,mp)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Oa*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,t-=a.offsetY*n/c,s*=a.width/l,n*=a.height/c}let o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Kr=-90,Jr=1,jh=class extends Rt{constructor(e,t,n){super();this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new qt(Kr,Jr,e,t);s.layers=this.layers,this.add(s);let r=new qt(Kr,Jr,e,t);r.layers=this.layers,this.add(r);let a=new qt(Kr,Jr,e,t);a.layers=this.layers,this.add(a);let o=new qt(Kr,Jr,e,t);o.layers=this.layers,this.add(o);let l=new qt(Kr,Jr,e,t);l.layers=this.layers,this.add(l);let c=new qt(Kr,Jr,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,o,l]=t;for(let c of t)this.remove(c);if(e===xi)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Ba)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,l,c,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;let v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,r),e.setRenderTarget(n,1,s),e.render(t,a),e.setRenderTarget(n,2,s),e.render(t,o),e.setRenderTarget(n,3,s),e.render(t,l),e.setRenderTarget(n,4,s),e.render(t,c),n.texture.generateMipmaps=v,e.setRenderTarget(n,5,s),e.render(t,h),e.setRenderTarget(u,d,p),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}},Ol=class extends zt{constructor(e,t,n,s,r,a,o,l,c,h){e=e!==void 0?e:[],t=t!==void 0?t:js;super(e,t,n,s,r,a,o,l,c,h);this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Zh=class extends Ht{constructor(e=1,t={}){super(e,e,t);this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new Ol(s,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:en}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Ki(5,5,5),r=new Nt({name:"CubemapFromEquirect",uniforms:lr(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:an,blending:$t});r.uniforms.tEquirect.value=t;let a=new Qt(s,r),o=t.minFilter;return t.minFilter===gi&&(t.minFilter=en),new jh(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,n,s){let r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}};var Ji=class extends Rt{constructor(){super();this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ri,this.environmentIntensity=1,this.environmentRotation=new ri,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},Xa=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=vl,this.updateRanges=[],this.version=0,this.uuid=yi()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=yi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=yi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},wn=new O,hr=class{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)wn.fromBufferAttribute(this,t),wn.applyMatrix4(e),this.setXYZ(t,wn.x,wn.y,wn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)wn.fromBufferAttribute(this,t),wn.applyNormalMatrix(e),this.setXYZ(t,wn.x,wn.y,wn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)wn.fromBufferAttribute(this,t),wn.transformDirection(e),this.setXYZ(t,wn.x,wn.y,wn.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Ai(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Ut(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=Ut(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Ut(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Ut(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Ut(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Ai(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Ai(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Ai(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Ai(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Ut(t,this.array),n=Ut(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=Ut(t,this.array),n=Ut(n,this.array),s=Ut(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=Ut(t,this.array),n=Ut(n,this.array),s=Ut(s,this.array),r=Ut(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new Gt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new hr(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}};var vp=new O,xp=new yt,yp=new yt,Dx=new O,Ap=new Ze,kl=new O,Kh=new Yn,_p=new Ze,Jh=new ar,zl=class extends Qt{constructor(e,t){super(e,t);this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=sh,this.bindMatrix=new Ze,this.bindMatrixInverse=new Ze,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new si),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,kl),this.boundingBox.expandByPoint(kl)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Yn),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,kl),this.boundingSphere.expandByPoint(kl)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let n=this.material,s=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Kh.copy(this.boundingSphere),Kh.applyMatrix4(s),e.ray.intersectsSphere(Kh)!==!1&&(_p.copy(s).invert(),Jh.copy(e.ray).applyMatrix4(_p),!(this.boundingBox!==null&&Jh.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Jh)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new yt,t=this.geometry.attributes.skinWeight;for(let n=0,s=t.count;n<s;n++){e.fromBufferAttribute(t,n);let r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===sh?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Bf?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,s=this.geometry;xp.fromBufferAttribute(s.attributes.skinIndex,e),yp.fromBufferAttribute(s.attributes.skinWeight,e),vp.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let r=0;r<4;r++){let a=yp.getComponent(r);if(a!==0){let o=xp.getComponent(r);Ap.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(Dx.copy(vp).applyMatrix4(Ap),a)}}return t.applyMatrix4(this.bindMatrixInverse)}},Ya=class extends Rt{constructor(){super();this.isBone=!0,this.type="Bone"}},Hl=class extends zt{constructor(e=null,t=1,n=1,s,r,a,o,l,c=xn,h=xn,u,d){super(null,a,o,l,c,h,s,r,u,d);this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Sp=new Ze,Px=new Ze,$r=class{constructor(e=[],t=[]){this.uuid=yi(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,s=this.bones.length;n<s;n++)this.boneInverses.push(new Ze)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let n=new Ze;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,s=this.boneTexture;for(let r=0,a=e.length;r<a;r++){let o=e[r]?e[r].matrixWorld:Px;Sp.multiplyMatrices(o,t[r]),Sp.toArray(n,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new $r(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new Hl(t,e,e,Vn,Gn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let s=this.bones[t];if(s.name===e)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,s=e.bones.length;n<s;n++){let r=e.bones[n],a=t[r];a===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),a=new Ya),this.bones.push(a),this.boneInverses.push(new Ze().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let s=0,r=t.length;s<r;s++){let a=t[s];e.bones.push(a.uuid);let o=n[s];e.boneInverses.push(o.toArray())}return e}},ur=class extends Gt{constructor(e,t,n,s=1){super(e,t,n);this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},ea=new Ze,bp=new Ze,Gl=[],Ep=new si,Ix=new Ze,Qa=new Qt,qa=new Yn,Vl=class extends Qt{constructor(e,t,n){super(e,t);this.isInstancedMesh=!0,this.instanceMatrix=new ur(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,Ix)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new si),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ea),Ep.copy(e.boundingBox).applyMatrix4(ea),this.boundingBox.union(Ep)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Yn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ea),qa.copy(e.boundingSphere).applyMatrix4(ea),this.boundingSphere.union(qa)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=e*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(e,t){let n=this.matrixWorld,s=this.count;if(Qa.geometry=this.geometry,Qa.material=this.material,Qa.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),qa.copy(this.boundingSphere),qa.applyMatrix4(n),e.ray.intersectsSphere(qa)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,ea),bp.multiplyMatrices(n,ea),Qa.matrixWorld=bp,Qa.raycast(e,Gl);for(let a=0,o=Gl.length;a<o;a++){let l=Gl[a];l.instanceId=r,l.object=this,t.push(l)}Gl.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new ur(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){let n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Hl(new Float32Array(s*this.count),s,this.count,ko,Gn));let r=this.morphTexture.source.data.data,a=0;for(let c=0;c<n.length;c++)a+=n[c];let o=this.geometry.morphTargetsRelative?1:1-a,l=s*e;r[l]=o,r.set(n,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}},$h=new O,Lx=new O,Fx=new ot,$i=class{constructor(e=new O(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let s=$h.subVectors(n,t).cross(Lx.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta($h),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Fx.getNormalMatrix(e),s=this.coplanarPoint($h).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},dr=new Yn,Wl=new O,ja=class{constructor(e=new $i,t=new $i,n=new $i,s=new $i,r=new $i,a=new $i){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=xi){let n=this.planes,s=e.elements,r=s[0],a=s[1],o=s[2],l=s[3],c=s[4],h=s[5],u=s[6],d=s[7],p=s[8],g=s[9],v=s[10],m=s[11],f=s[12],x=s[13],A=s[14],y=s[15];if(n[0].setComponents(l-r,d-c,m-p,y-f).normalize(),n[1].setComponents(l+r,d+c,m+p,y+f).normalize(),n[2].setComponents(l+a,d+h,m+g,y+x).normalize(),n[3].setComponents(l-a,d-h,m-g,y-x).normalize(),n[4].setComponents(l-o,d-u,m-v,y-A).normalize(),t===xi)n[5].setComponents(l+o,d+u,m+v,y+A).normalize();else if(t===Ba)n[5].setComponents(o,u,v,A).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),dr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),dr.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(dr)}intersectsSprite(e){return dr.center.set(0,0,0),dr.radius=.7071067811865476,dr.applyMatrix4(e.matrixWorld),this.intersectsSphere(dr)}intersectsSphere(e){let t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let s=t[n];if(Wl.x=s.normal.x>0?e.max.x:e.min.x,Wl.y=s.normal.y>0?e.max.y:e.min.y,Wl.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Wl)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var Ts=class extends fn{constructor(e){super();this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ae(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},Xl=new O,Yl=new O,Tp=new Ze,Za=new ar,Ql=new Yn,eu=new O,Mp=new O,Ms=class extends Rt{constructor(e=new Yt,t=new Ts){super();this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)Xl.fromBufferAttribute(t,s-1),Yl.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=Xl.distanceTo(Yl);e.setAttribute("lineDistance",new Xt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Ql.copy(n.boundingSphere),Ql.applyMatrix4(s),Ql.radius+=r,e.ray.intersectsSphere(Ql)===!1)return;Tp.copy(s).invert(),Za.copy(e.ray).applyMatrix4(Tp);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){let p=Math.max(0,a.start),g=Math.min(h.count,a.start+a.count);for(let v=p,m=g-1;v<m;v+=c){let f=h.getX(v),x=h.getX(v+1),A=ql(this,e,Za,l,f,x);A&&t.push(A)}if(this.isLineLoop){let v=h.getX(g-1),m=h.getX(p),f=ql(this,e,Za,l,v,m);f&&t.push(f)}}else{let p=Math.max(0,a.start),g=Math.min(d.count,a.start+a.count);for(let v=p,m=g-1;v<m;v+=c){let f=ql(this,e,Za,l,v,v+1);f&&t.push(f)}if(this.isLineLoop){let v=ql(this,e,Za,l,g-1,p);v&&t.push(v)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function ql(i,e,t,n,s,r){let a=i.geometry.attributes.position;if(Xl.fromBufferAttribute(a,s),Yl.fromBufferAttribute(a,r),t.distanceSqToSegment(Xl,Yl,eu,Mp)>n)return;eu.applyMatrix4(i.matrixWorld);let l=e.ray.origin.distanceTo(eu);if(!(l<e.near||l>e.far))return{distance:l,point:Mp.clone().applyMatrix4(i.matrixWorld),index:s,face:null,faceIndex:null,barycoord:null,object:i}}var wp=new O,Cp=new O,ta=class extends Ms{constructor(e,t){super(e,t);this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)wp.fromBufferAttribute(t,s),Cp.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+wp.distanceTo(Cp);e.setAttribute("lineDistance",new Xt(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},jl=class extends Ms{constructor(e,t){super(e,t);this.isLineLoop=!0,this.type="LineLoop"}},Ka=class extends fn{constructor(e){super();this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ae(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Rp=new Ze,tu=new ar,Zl=new Yn,Kl=new O,Jl=class extends Rt{constructor(e=new Yt,t=new Ka){super();this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Zl.copy(n.boundingSphere),Zl.applyMatrix4(s),Zl.radius+=r,e.ray.intersectsSphere(Zl)===!1)return;Rp.copy(s).invert(),tu.copy(e.ray).applyMatrix4(Rp);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,u=n.attributes.position;if(c!==null){let d=Math.max(0,a.start),p=Math.min(c.count,a.start+a.count);for(let g=d,v=p;g<v;g++){let m=c.getX(g);Kl.fromBufferAttribute(u,m),Dp(Kl,m,l,s,e,t,this)}}else{let d=Math.max(0,a.start),p=Math.min(u.count,a.start+a.count);for(let g=d,v=p;g<v;g++)Kl.fromBufferAttribute(u,g),Dp(Kl,g,l,s,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){let s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function Dp(i,e,t,n,s,r,a){let o=tu.distanceSqToPoint(i);if(o<t){let l=new O;tu.closestPointToPoint(i,l),l.applyMatrix4(n);let c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}var pt=class extends Rt{constructor(){super();this.isGroup=!0,this.type="Group"}};var na=class extends zt{constructor(e,t,n,s,r,a,o,l,c,h=Js){if(h!==Js&&h!==Wi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===Js&&(n=Fi),n===void 0&&h===Wi&&(n=Vi);super(null,s,r,a,o,l,h,n,c);this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:xn,this.minFilter=l!==void 0?l:xn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}};var ia=class extends Yt{constructor(e=1,t=1,n=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super();this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};let c=this;s=Math.floor(s),r=Math.floor(r);let h=[],u=[],d=[],p=[],g=0,v=[],m=n/2,f=0;x(),a===!1&&(e>0&&A(!0),t>0&&A(!1)),this.setIndex(h),this.setAttribute("position",new Xt(u,3)),this.setAttribute("normal",new Xt(d,3)),this.setAttribute("uv",new Xt(p,2));function x(){let y=new O,T=new O,M=0,C=(t-e)/n;for(let R=0;R<=r;R++){let b=[],S=R/r,D=S*(t-e)+e;for(let N=0;N<=s;N++){let U=N/s,B=U*l+o,W=Math.sin(B),G=Math.cos(B);T.x=D*W,T.y=-S*n+m,T.z=D*G,u.push(T.x,T.y,T.z),y.set(W,C,G).normalize(),d.push(y.x,y.y,y.z),p.push(U,1-S),b.push(g++)}v.push(b)}for(let R=0;R<s;R++)for(let b=0;b<r;b++){let S=v[b][R],D=v[b+1][R],N=v[b+1][R+1],U=v[b][R+1];(e>0||b!==0)&&(h.push(S,D,U),M+=3),(t>0||b!==r-1)&&(h.push(D,N,U),M+=3)}c.addGroup(f,M,0),f+=M}function A(y){let T=g,M=new Pe,C=new O,R=0,b=y===!0?e:t,S=y===!0?1:-1;for(let N=1;N<=s;N++)u.push(0,m*S,0),d.push(0,S,0),p.push(.5,.5),g++;let D=g;for(let N=0;N<=s;N++){let B=N/s*l+o,W=Math.cos(B),G=Math.sin(B);C.x=b*G,C.y=m*S,C.z=b*W,u.push(C.x,C.y,C.z),d.push(0,S,0),M.x=W*.5+.5,M.y=G*.5*S+.5,p.push(M.x,M.y),g++}for(let N=0;N<s;N++){let U=T+N,B=D+N;y===!0?h.push(B,B+1,U):h.push(B+1,B,U),R+=3}c.addGroup(f,R,y===!0?1:2),f+=R}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ia(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}};var sa=class extends Yt{constructor(e=1,t=1,n=1,s=1){super();this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};let r=e/2,a=t/2,o=Math.floor(n),l=Math.floor(s),c=o+1,h=l+1,u=e/o,d=t/l,p=[],g=[],v=[],m=[];for(let f=0;f<h;f++){let x=f*d-a;for(let A=0;A<c;A++){let y=A*u-r;g.push(y,-x,0),v.push(0,0,1),m.push(A/o),m.push(1-f/l)}}for(let f=0;f<l;f++)for(let x=0;x<o;x++){let A=x+c*f,y=x+c*(f+1),T=x+1+c*(f+1),M=x+1+c*f;p.push(A,y,M),p.push(y,T,M)}this.setIndex(p),this.setAttribute("position",new Xt(g,3)),this.setAttribute("normal",new Xt(v,3)),this.setAttribute("uv",new Xt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new sa(e.width,e.height,e.widthSegments,e.heightSegments)}};var ra=class extends fn{constructor(e){super();this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ae(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ae(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=gl,this.normalScale=new Pe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ri,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Zn=class extends ra{constructor(e){super();this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Pe(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return gt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Ae(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Ae(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Ae(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}};var $l=class extends fn{constructor(e){super();this.isMeshToonMaterial=!0,this.defines={TOON:""},this.type="MeshToonMaterial",this.color=new Ae(16777215),this.map=null,this.gradientMap=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ae(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=gl,this.normalScale=new Pe(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.gradientMap=e.gradientMap,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.alphaMap=e.alphaMap,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}};var nu=class extends fn{constructor(e){super();this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=vi,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},iu=class extends fn{constructor(e){super();this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function ec(i,e,t){return!i||!t&&i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function Ux(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function Nx(i){function e(s,r){return i[s]-i[r]}let t=i.length,n=new Array(t);for(let s=0;s!==t;++s)n[s]=s;return n.sort(e),n}function Pp(i,e,t){let n=i.length,s=new i.constructor(n);for(let r=0,a=0;a!==n;++r){let o=t[r]*e;for(let l=0;l!==e;++l)s[a++]=i[o+l]}return s}function Ip(i,e,t,n){let s=1,r=i[0];for(;r!==void 0&&r[n]===void 0;)r=i[s++];if(r===void 0)return;let a=r[n];if(a!==void 0)if(Array.isArray(a))do a=r[n],a!==void 0&&(e.push(r.time),t.push.apply(t,a)),r=i[s++];while(r!==void 0);else if(a.toArray!==void 0)do a=r[n],a!==void 0&&(e.push(r.time),a.toArray(t,t.length)),r=i[s++];while(r!==void 0);else do a=r[n],a!==void 0&&(e.push(r.time),t.push(a)),r=i[s++];while(r!==void 0)}var ws=class{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,s=t[n],r=t[n-1];n:{e:{let a;t:{i:if(!(e<s)){for(let o=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=s,s=t[++n],e<s)break e}a=t.length;break t}if(!(e>=r)){let o=t[1];e<o&&(n=2,r=o);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(s=r,r=t[--n-1],e>=r)break e}a=n,n=0;break t}break n}for(;n<a;){let o=n+a>>>1;e<t[o]?a=o:n=o+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let a=0;a!==s;++a)t[a]=n[r+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},su=class extends ws{constructor(e,t,n,s){super(e,t,n,s);this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:mh,endingEnd:mh}}intervalChanged_(e,t,n){let s=this.parameterPositions,r=e-2,a=e+1,o=s[r],l=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case gh:r=e,o=2*t-n;break;case vh:r=s.length-2,o=t+s[r]-s[r+1];break;default:r=e,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case gh:a=e,l=2*n-t;break;case vh:a=1,l=n+s[1]-s[0];break;default:a=e-1,l=t}let c=(n-t)*.5,h=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-n),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,p=this._weightNext,g=(n-t)/(s-t),v=g*g,m=v*g,f=-d*m+2*d*v-d*g,x=(1+d)*m+(-1.5-2*d)*v+(-.5+d)*g+1,A=(-1-p)*m+(1.5+p)*v+.5*g,y=p*m-p*v;for(let T=0;T!==o;++T)r[T]=f*a[h+T]+x*a[c+T]+A*a[l+T]+y*a[u+T];return r}},ru=class extends ws{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=(n-t)/(s-t),u=1-h;for(let d=0;d!==o;++d)r[d]=a[c+d]*u+a[l+d]*h;return r}},au=class extends ws{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}},li=class{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=ec(t,this.TimeBufferType),this.values=ec(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:ec(e.times,Array),values:ec(e.values,Array)};let s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new au(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new ru(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new su(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case $s:t=this.InterpolantFactoryMethodDiscrete;break;case er:t=this.InterpolantFactoryMethodLinear;break;case ml:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return $s;case this.InterpolantFactoryMethodLinear:return er;case this.InterpolantFactoryMethodSmooth:return ml}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e}return this}trim(e,t){let n=this.times,s=n.length,r=0,a=s-1;for(;r!==s&&n[r]<e;)++r;for(;a!==-1&&n[a]>t;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!=0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,s=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){let l=n[o];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(s!==void 0&&Ux(s))for(let o=0,l=s.length;o!==l;++o){let c=s[o];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===ml,r=e.length-1,a=1;for(let o=1;o<r;++o){let l=!1,c=e[o],h=e[o+1];if(c!==h&&(o!==1||c!==e[0]))if(s)l=!0;else{let u=o*n,d=u-n,p=u+n;for(let g=0;g!==n;++g){let v=t[u+g];if(v!==t[d+g]||v!==t[p+g]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];let u=o*n,d=a*n;for(let p=0;p!==n;++p)t[d+p]=t[u+p]}++a}}if(r>0){e[a]=e[r];for(let o=r*n,l=a*n,c=0;c!==n;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,s}};li.prototype.TimeBufferType=Float32Array;li.prototype.ValueBufferType=Float32Array;li.prototype.DefaultInterpolation=er;var Cs=class extends li{constructor(e,t,n){super(e,t,n)}};Cs.prototype.ValueTypeName="bool";Cs.prototype.ValueBufferType=Array;Cs.prototype.DefaultInterpolation=$s;Cs.prototype.InterpolantFactoryMethodLinear=void 0;Cs.prototype.InterpolantFactoryMethodSmooth=void 0;var tc=class extends li{};tc.prototype.ValueTypeName="color";var es=class extends li{};es.prototype.ValueTypeName="number";var ou=class extends ws{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-t)/(s-t),c=e*o;for(let h=c+o;c!==h;c+=4)Xn.slerpFlat(r,0,a,c-o,a,c,l);return r}},ts=class extends li{InterpolantFactoryMethodLinear(e){return new ou(this.times,this.values,this.getValueSize(),e)}};ts.prototype.ValueTypeName="quaternion";ts.prototype.InterpolantFactoryMethodSmooth=void 0;var Rs=class extends li{constructor(e,t,n){super(e,t,n)}};Rs.prototype.ValueTypeName="string";Rs.prototype.ValueBufferType=Array;Rs.prototype.DefaultInterpolation=$s;Rs.prototype.InterpolantFactoryMethodLinear=void 0;Rs.prototype.InterpolantFactoryMethodSmooth=void 0;var ns=class extends li{};ns.prototype.ValueTypeName="vector";var nc=class{constructor(e="",t=-1,n=[],s=Of){this.name=e,this.tracks=n,this.duration=t,this.blendMode=s,this.uuid=yi(),this.duration<0&&this.resetDuration()}static parse(e){let t=[],n=e.tracks,s=1/(e.fps||1);for(let a=0,o=n.length;a!==o;++a)t.push(Ox(n[a]).scale(s));let r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r}static toJSON(e){let t=[],n=e.tracks,s={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let r=0,a=n.length;r!==a;++r)t.push(li.toJSON(n[r]));return s}static CreateFromMorphTargetSequence(e,t,n,s){let r=t.length,a=[];for(let o=0;o<r;o++){let l=[],c=[];l.push((o+r-1)%r,o,(o+1)%r),c.push(0,1,0);let h=Nx(l);l=Pp(l,1,h),c=Pp(c,1,h),!s&&l[0]===0&&(l.push(r),c.push(c[0])),a.push(new es(".morphTargetInfluences["+t[o].name+"]",l,c).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){let s=e;n=s.geometry&&s.geometry.animations||s.animations}for(let s=0;s<n.length;s++)if(n[s].name===t)return n[s];return null}static CreateClipsFromMorphTargetSequences(e,t,n){let s={},r=/^([\w-]*?)([\d]+)$/;for(let o=0,l=e.length;o<l;o++){let c=e[o],h=c.name.match(r);if(h&&h.length>1){let u=h[1],d=s[u];d||(s[u]=d=[]),d.push(c)}}let a=[];for(let o in s)a.push(this.CreateFromMorphTargetSequence(o,s[o],t,n));return a}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;let n=function(u,d,p,g,v){if(p.length!==0){let m=[],f=[];Ip(p,m,f,g),m.length!==0&&v.push(new u(d,m,f))}},s=[],r=e.name||"default",a=e.fps||30,o=e.blendMode,l=e.length||-1,c=e.hierarchy||[];for(let u=0;u<c.length;u++){let d=c[u].keys;if(!(!d||d.length===0))if(d[0].morphTargets){let p={},g;for(g=0;g<d.length;g++)if(d[g].morphTargets)for(let v=0;v<d[g].morphTargets.length;v++)p[d[g].morphTargets[v]]=-1;for(let v in p){let m=[],f=[];for(let x=0;x!==d[g].morphTargets.length;++x){let A=d[g];m.push(A.time),f.push(A.morphTarget===v?1:0)}s.push(new es(".morphTargetInfluence["+v+"]",m,f))}l=p.length*a}else{let p=".bones["+t[u].name+"]";n(ns,p+".position",d,"pos",s),n(ts,p+".quaternion",d,"rot",s),n(ns,p+".scale",d,"scl",s)}}return s.length===0?null:new this(r,l,s,o)}resetDuration(){let e=this.tracks,t=0;for(let n=0,s=e.length;n!==s;++n){let r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}};function Bx(i){switch(i.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return es;case"vector":case"vector2":case"vector3":case"vector4":return ns;case"color":return tc;case"quaternion":return ts;case"bool":case"boolean":return Cs;case"string":return Rs}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+i)}function Ox(i){if(i.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=Bx(i.type);if(i.times===void 0){let t=[],n=[];Ip(i.keys,t,n,"value"),i.times=t,i.values=n}return e.parse!==void 0?e.parse(i):new e(i.name,i.times,i.values,i.interpolation)}var is={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(this.files[i]=e)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}},Ja=class{constructor(e,t,n){let s=this,r=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(h){o++,r===!1&&s.onStart!==void 0&&s.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,s.onProgress!==void 0&&s.onProgress(h,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){let u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=c.length;u<d;u+=2){let p=c[u],g=c[u+1];if(p.global&&(p.lastIndex=0),p.test(h))return g}return null}}},Lp=new Ja,Ei=class{constructor(e){this.manager=e!==void 0?e:Lp,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}};Ei.DEFAULT_MATERIAL_NAME="__DEFAULT";var ss={},Fp=class extends Error{constructor(e,t){super(e);this.response=t}},Ds=class extends Ei{constructor(e){super(e)}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=is.get(e);if(r!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0),r;if(ss[e]!==void 0){ss[e].push({onLoad:t,onProgress:n,onError:s});return}ss[e]=[],ss[e].push({onLoad:t,onProgress:n,onError:s});let a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),o=this.mimeType,l=this.responseType;fetch(a).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream=="undefined"||c.body===void 0||c.body.getReader===void 0)return c;let h=ss[e],u=c.body.getReader(),d=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),p=d?parseInt(d):0,g=p!==0,v=0,m=new ReadableStream({start(f){x();function x(){u.read().then(({done:A,value:y})=>{if(A)f.close();else{v+=y.byteLength;let T=new ProgressEvent("progress",{lengthComputable:g,loaded:v,total:p});for(let M=0,C=h.length;M<C;M++){let R=h[M];R.onProgress&&R.onProgress(T)}f.enqueue(y),x()}},A=>{f.error(A)})}}});return new Response(m)}else throw new Fp(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(h=>new DOMParser().parseFromString(h,o));case"json":return c.json();default:if(o===void 0)return c.text();{let u=/charset="?([^;"\s]*)"?/i.exec(o),d=u&&u[1]?u[1].toLowerCase():void 0,p=new TextDecoder(d);return c.arrayBuffer().then(g=>p.decode(g))}}}).then(c=>{is.add(e,c);let h=ss[e];delete ss[e];for(let u=0,d=h.length;u<d;u++){let p=h[u];p.onLoad&&p.onLoad(c)}}).catch(c=>{let h=ss[e];if(h===void 0)throw this.manager.itemError(e),c;delete ss[e];for(let u=0,d=h.length;u<d;u++){let p=h[u];p.onError&&p.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}};var lu=class extends Ei{constructor(e){super(e)}load(e,t,n,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,a=is.get(e);if(a!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0),a;let o=kr("img");function l(){h(),is.add(e,this),t&&t(this),r.manager.itemEnd(e)}function c(u){h(),s&&s(u),r.manager.itemError(e),r.manager.itemEnd(e)}function h(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),r.manager.itemStart(e),o.src=e,o}};var ic=class extends Ei{constructor(e){super(e)}load(e,t,n,s){let r=new zt,a=new lu(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){r.image=o,r.needsUpdate=!0,t!==void 0&&t(r)},n,s),r}},aa=class extends Rt{constructor(e,t=1){super();this.isLight=!0,this.type="Light",this.color=new Ae(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}};var cu=new Ze,Up=new O,Np=new O,sc=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Pe(512,512),this.map=null,this.mapPass=null,this.matrix=new Ze,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ja,this._frameExtents=new Pe(1,1),this._viewportCount=1,this._viewports=[new yt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;Up.setFromMatrixPosition(e.matrixWorld),t.position.copy(Up),Np.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Np),t.updateMatrixWorld(),cu.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(cu),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(cu)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Bp=class extends sc{constructor(){super(new qt(50,1,.5,500));this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){let t=this.camera,n=nr*2*e.angle*this.focus,s=this.mapSize.width/this.mapSize.height,r=e.distance||t.far;(n!==t.fov||s!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=s,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}},rc=class extends aa{constructor(e,t,n=0,s=Math.PI/3,r=0,a=2){super(e,t);this.isSpotLight=!0,this.type="SpotLight",this.position.copy(Rt.DEFAULT_UP),this.updateMatrix(),this.target=new Rt,this.distance=n,this.angle=s,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new Bp}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}},Op=new Ze,$a=new O,hu=new O,kp=class extends sc{constructor(){super(new qt(90,1,.5,500));this.isPointLightShadow=!0,this._frameExtents=new Pe(4,2),this._viewportCount=6,this._viewports=[new yt(2,1,1,1),new yt(0,1,1,1),new yt(3,1,1,1),new yt(1,1,1,1),new yt(3,0,1,1),new yt(1,0,1,1)],this._cubeDirections=[new O(1,0,0),new O(-1,0,0),new O(0,0,1),new O(0,0,-1),new O(0,1,0),new O(0,-1,0)],this._cubeUps=[new O(0,1,0),new O(0,1,0),new O(0,1,0),new O(0,1,0),new O(0,0,1),new O(0,0,-1)]}updateMatrices(e,t=0){let n=this.camera,s=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),$a.setFromMatrixPosition(e.matrixWorld),n.position.copy($a),hu.copy(n.position),hu.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(hu),n.updateMatrixWorld(),s.makeTranslation(-$a.x,-$a.y,-$a.z),Op.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Op)}},ac=class extends aa{constructor(e,t,n=0,s=2){super(e,t);this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new kp}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}},oa=class extends cr{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super();this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=n-e,a=n+e,o=s+t,l=s-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},zp=class extends sc{constructor(){super(new oa(-5,5,5,-5,.5,500));this.isDirectionalLightShadow=!0}},la=class extends aa{constructor(e,t){super(e,t);this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Rt.DEFAULT_UP),this.updateMatrix(),this.target=new Rt,this.shadow=new zp}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}},oc=class extends aa{constructor(e,t){super(e,t);this.isAmbientLight=!0,this.type="AmbientLight"}};var Ps=class{static decodeText(e){if(console.warn("THREE.LoaderUtils: decodeText() has been deprecated with r165 and will be removed with r175. Use TextDecoder instead."),typeof TextDecoder!="undefined")return new TextDecoder().decode(e);let t="";for(let n=0,s=e.length;n<s;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){let t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}};var lc=class extends Ei{constructor(e){super(e);this.isImageBitmapLoader=!0,typeof createImageBitmap=="undefined"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch=="undefined"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let r=this,a=is.get(e);if(a!==void 0){if(r.manager.itemStart(e),a.then){a.then(c=>{t&&t(c),r.manager.itemEnd(e)}).catch(c=>{s&&s(c)});return}return setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0),a}let o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader;let l=fetch(e,o).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(c){return is.add(e,c),t&&t(c),r.manager.itemEnd(e),c}).catch(function(c){s&&s(c),is.remove(e),r.manager.itemError(e),r.manager.itemEnd(e)});is.add(e,l),r.manager.itemStart(e)}};var uu=class extends qt{constructor(e=[]){super();this.isArrayCamera=!0,this.cameras=e}};var du="\\[\\]\\.:\\/",kx=new RegExp("["+du+"]","g"),fu="[^"+du+"]",zx="[^"+du.replace("\\.","")+"]",Hx=/((?:WC+[\/:])*)/.source.replace("WC",fu),Gx=/(WCOD+)?/.source.replace("WCOD",zx),Vx=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",fu),Wx=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",fu),Xx=new RegExp("^"+Hx+Gx+Vx+Wx+"$"),Yx=["material","materials","bones","map"],Hp=class{constructor(e,t,n){let s=n||wt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},wt=class{constructor(e,t,n){this.path=t,this.parsedPath=n||wt.parseTrackName(t),this.node=wt.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new wt.Composite(e,t,n):new wt(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(kx,"")}static parseTrackName(e){let t=Xx.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=n.nodeName.substring(s+1);Yx.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===t||o.uuid===t)return o;let l=n(o.children);if(l)return l}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,s=t.propertyName,r=t.propertyIndex;if(e||(e=wt.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}let a=e[s];if(a===void 0){let c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};wt.Composite=Hp;wt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};wt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};wt.prototype.GetterByBindingType=[wt.prototype._getValue_direct,wt.prototype._getValue_array,wt.prototype._getValue_arrayElement,wt.prototype._getValue_toArray];wt.prototype.SetterByBindingTypeAndVersioning=[[wt.prototype._setValue_direct,wt.prototype._setValue_direct_setNeedsUpdate,wt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[wt.prototype._setValue_array,wt.prototype._setValue_array_setNeedsUpdate,wt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[wt.prototype._setValue_arrayElement,wt.prototype._setValue_arrayElement_setNeedsUpdate,wt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[wt.prototype._setValue_fromArray,wt.prototype._setValue_fromArray_setNeedsUpdate,wt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var zM=new Float32Array(1);var Oe=class{constructor(e){this.value=e}clone(){return new Oe(this.value.clone===void 0?this.value:this.value.clone())}};var Gp=new Ze,cc=class{constructor(e,t,n=0,s=1/0){this.ray=new ar(e,t),this.near=n,this.far=s,this.camera=null,this.layers=new Ga,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Gp.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Gp),this}intersectObject(e,t=!0,n=[]){return pu(e,this,n,t),n.sort(Vp),n}intersectObjects(e,t=!0,n=[]){for(let s=0,r=e.length;s<r;s++)pu(e[s],this,n,t);return n.sort(Vp),n}};function Vp(i,e){return i.distance-e.distance}function pu(i,e,t,n){let s=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(s=!1),s===!0&&n===!0){let r=i.children;for(let a=0,o=r.length;a<o;a++)pu(r[a],e,t,!0)}}var hc=class extends ta{constructor(e=10,t=10,n=4473924,s=8947848){n=new Ae(n),s=new Ae(s);let r=t/2,a=e/t,o=e/2,l=[],c=[];for(let d=0,p=0,g=-o;d<=t;d++,g+=a){l.push(-o,0,g,o,0,g),l.push(g,0,-o,g,0,o);let v=d===r?n:s;v.toArray(c,p),p+=3,v.toArray(c,p),p+=3,v.toArray(c,p),p+=3,v.toArray(c,p),p+=3}let h=new Yt;h.setAttribute("position",new Xt(l,3)),h.setAttribute("color",new Xt(c,3));let u=new Ts({vertexColors:!0,toneMapped:!1});super(h,u);this.type="GridHelper"}dispose(){this.geometry.dispose(),this.material.dispose()}};var Wp=new O,uc=new O,Xp=new O,dc=class extends Rt{constructor(e,t,n){super();this.light=e,this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1,this.color=n,this.type="DirectionalLightHelper",t===void 0&&(t=1);let s=new Yt;s.setAttribute("position",new Xt([-t,t,0,t,t,0,t,-t,0,-t,-t,0,-t,t,0],3));let r=new Ts({fog:!1,toneMapped:!1});this.lightPlane=new Ms(s,r),this.add(this.lightPlane),s=new Yt,s.setAttribute("position",new Xt([0,0,0,0,0,1],3)),this.targetLine=new Ms(s,r),this.add(this.targetLine),this.update()}dispose(){this.lightPlane.geometry.dispose(),this.lightPlane.material.dispose(),this.targetLine.geometry.dispose(),this.targetLine.material.dispose()}update(){this.light.updateWorldMatrix(!0,!1),this.light.target.updateWorldMatrix(!0,!1),Wp.setFromMatrixPosition(this.light.matrixWorld),uc.setFromMatrixPosition(this.light.target.matrixWorld),Xp.subVectors(uc,Wp),this.lightPlane.lookAt(uc),this.color!==void 0?(this.lightPlane.material.color.set(this.color),this.targetLine.material.color.set(this.color)):(this.lightPlane.material.color.copy(this.light.color),this.targetLine.material.color.copy(this.light.color)),this.targetLine.lookAt(uc),this.targetLine.scale.z=Xp.length()}},fc=new O,Kt=new cr,pc=class extends ta{constructor(e){let t=new Yt,n=new Ts({color:16777215,vertexColors:!0,toneMapped:!1}),s=[],r=[],a={};o("n1","n2"),o("n2","n4"),o("n4","n3"),o("n3","n1"),o("f1","f2"),o("f2","f4"),o("f4","f3"),o("f3","f1"),o("n1","f1"),o("n2","f2"),o("n3","f3"),o("n4","f4"),o("p","n1"),o("p","n2"),o("p","n3"),o("p","n4"),o("u1","u2"),o("u2","u3"),o("u3","u1"),o("c","t"),o("p","c"),o("cn1","cn2"),o("cn3","cn4"),o("cf1","cf2"),o("cf3","cf4");function o(g,v){l(g),l(v)}function l(g){s.push(0,0,0),r.push(0,0,0),a[g]===void 0&&(a[g]=[]),a[g].push(s.length/3-1)}t.setAttribute("position",new Xt(s,3)),t.setAttribute("color",new Xt(r,3));super(t,n);this.type="CameraHelper",this.camera=e,this.camera.updateProjectionMatrix&&this.camera.updateProjectionMatrix(),this.matrix=e.matrixWorld,this.matrixAutoUpdate=!1,this.pointMap=a,this.update();let c=new Ae(16755200),h=new Ae(16711680),u=new Ae(43775),d=new Ae(16777215),p=new Ae(3355443);this.setColors(c,h,u,d,p)}setColors(e,t,n,s,r){let o=this.geometry.getAttribute("color");o.setXYZ(0,e.r,e.g,e.b),o.setXYZ(1,e.r,e.g,e.b),o.setXYZ(2,e.r,e.g,e.b),o.setXYZ(3,e.r,e.g,e.b),o.setXYZ(4,e.r,e.g,e.b),o.setXYZ(5,e.r,e.g,e.b),o.setXYZ(6,e.r,e.g,e.b),o.setXYZ(7,e.r,e.g,e.b),o.setXYZ(8,e.r,e.g,e.b),o.setXYZ(9,e.r,e.g,e.b),o.setXYZ(10,e.r,e.g,e.b),o.setXYZ(11,e.r,e.g,e.b),o.setXYZ(12,e.r,e.g,e.b),o.setXYZ(13,e.r,e.g,e.b),o.setXYZ(14,e.r,e.g,e.b),o.setXYZ(15,e.r,e.g,e.b),o.setXYZ(16,e.r,e.g,e.b),o.setXYZ(17,e.r,e.g,e.b),o.setXYZ(18,e.r,e.g,e.b),o.setXYZ(19,e.r,e.g,e.b),o.setXYZ(20,e.r,e.g,e.b),o.setXYZ(21,e.r,e.g,e.b),o.setXYZ(22,e.r,e.g,e.b),o.setXYZ(23,e.r,e.g,e.b),o.setXYZ(24,t.r,t.g,t.b),o.setXYZ(25,t.r,t.g,t.b),o.setXYZ(26,t.r,t.g,t.b),o.setXYZ(27,t.r,t.g,t.b),o.setXYZ(28,t.r,t.g,t.b),o.setXYZ(29,t.r,t.g,t.b),o.setXYZ(30,t.r,t.g,t.b),o.setXYZ(31,t.r,t.g,t.b),o.setXYZ(32,n.r,n.g,n.b),o.setXYZ(33,n.r,n.g,n.b),o.setXYZ(34,n.r,n.g,n.b),o.setXYZ(35,n.r,n.g,n.b),o.setXYZ(36,n.r,n.g,n.b),o.setXYZ(37,n.r,n.g,n.b),o.setXYZ(38,s.r,s.g,s.b),o.setXYZ(39,s.r,s.g,s.b),o.setXYZ(40,r.r,r.g,r.b),o.setXYZ(41,r.r,r.g,r.b),o.setXYZ(42,r.r,r.g,r.b),o.setXYZ(43,r.r,r.g,r.b),o.setXYZ(44,r.r,r.g,r.b),o.setXYZ(45,r.r,r.g,r.b),o.setXYZ(46,r.r,r.g,r.b),o.setXYZ(47,r.r,r.g,r.b),o.setXYZ(48,r.r,r.g,r.b),o.setXYZ(49,r.r,r.g,r.b),o.needsUpdate=!0}update(){let e=this.geometry,t=this.pointMap,n=1,s=1;Kt.projectionMatrixInverse.copy(this.camera.projectionMatrixInverse);let r=this.camera.coordinateSystem===xi?-1:0;tn("c",t,e,Kt,0,0,r),tn("t",t,e,Kt,0,0,1),tn("n1",t,e,Kt,-n,-s,r),tn("n2",t,e,Kt,n,-s,r),tn("n3",t,e,Kt,-n,s,r),tn("n4",t,e,Kt,n,s,r),tn("f1",t,e,Kt,-n,-s,1),tn("f2",t,e,Kt,n,-s,1),tn("f3",t,e,Kt,-n,s,1),tn("f4",t,e,Kt,n,s,1),tn("u1",t,e,Kt,n*.7,s*1.1,r),tn("u2",t,e,Kt,-n*.7,s*1.1,r),tn("u3",t,e,Kt,0,s*2,r),tn("cf1",t,e,Kt,-n,0,1),tn("cf2",t,e,Kt,n,0,1),tn("cf3",t,e,Kt,0,-s,1),tn("cf4",t,e,Kt,0,s,1),tn("cn1",t,e,Kt,-n,0,r),tn("cn2",t,e,Kt,n,0,r),tn("cn3",t,e,Kt,0,-s,r),tn("cn4",t,e,Kt,0,s,r),e.getAttribute("position").needsUpdate=!0}dispose(){this.geometry.dispose(),this.material.dispose()}};function tn(i,e,t,n,s,r,a){fc.set(s,r,a).unproject(n);let o=e[i];if(o!==void 0){let l=t.getAttribute("position");for(let c=0,h=o.length;c<h;c++)l.setXYZ(o[c],fc.x,fc.y,fc.z)}}function mu(i,e,t,n){let s=Qx(n);switch(t){case ch:return i*e;case uh:return i*e;case dh:return i*e*2;case ko:return i*e/s.components*s.byteLength;case zo:return i*e/s.components*s.byteLength;case fh:return i*e*2/s.components*s.byteLength;case Ho:return i*e*2/s.components*s.byteLength;case hh:return i*e*3/s.components*s.byteLength;case Vn:return i*e*4/s.components*s.byteLength;case Go:return i*e*4/s.components*s.byteLength;case Da:case Pa:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Ia:case La:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Wo:case Yo:return Math.max(i,16)*Math.max(e,8)/4;case Vo:case Xo:return Math.max(i,8)*Math.max(e,8)/2;case Qo:case qo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case jo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Zo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Ko:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case Jo:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case $o:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case el:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case tl:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case nl:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case il:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case sl:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case rl:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case al:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case ol:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case ll:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case cl:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Fa:case hl:case ul:return Math.ceil(i/4)*Math.ceil(e/4)*16;case ph:case dl:return Math.ceil(i/4)*Math.ceil(e/4)*8;case fl:case pl:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Qx(i){switch(i){case kt:case ah:return{byteLength:1,components:1};case Nr:case oh:case Br:return{byteLength:2,components:1};case Bo:case Oo:return{byteLength:2,components:4};case Fi:case No:case Gn:return{byteLength:4,components:1};case lh:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Pi}}));typeof window!="undefined"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Pi);function Yp(){let i=null,e=!1,t=null,n=null;function s(r,a){t(r,a),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function qx(i){let e=new WeakMap;function t(o,l){let c=o.array,h=o.usage,u=c.byteLength,d=i.createBuffer();i.bindBuffer(l,d),i.bufferData(l,c,h),o.onUploadCallback();let p;if(c instanceof Float32Array)p=i.FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?p=i.HALF_FLOAT:p=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=i.SHORT;else if(c instanceof Uint32Array)p=i.UNSIGNED_INT;else if(c instanceof Int32Array)p=i.INT;else if(c instanceof Int8Array)p=i.BYTE;else if(c instanceof Uint8Array)p=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:u}}function n(o,l,c){let h=l.array,u=l.updateRanges;if(i.bindBuffer(c,o),u.length===0)i.bufferSubData(c,0,h);else{u.sort((p,g)=>p.start-g.start);let d=0;for(let p=1;p<u.length;p++){let g=u[d],v=u[p];v.start<=g.start+g.count+1?g.count=Math.max(g.count,v.start+v.count-g.start):(++d,u[d]=v)}u.length=d+1;for(let p=0,g=u.length;p<g;p++){let v=u[p];i.bufferSubData(c,v.start*h.BYTES_PER_ELEMENT,h,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=e.get(o);l&&(i.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var jx=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Zx=`#ifdef USE_ALPHAHASH
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
#endif`,Kx=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Jx=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,$x=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,ey=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,ty=`#ifdef USE_AOMAP
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
#endif`,ny=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,iy=`#ifdef USE_BATCHING
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
#endif`,sy=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,ry=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,ay=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,oy=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,ly=`#ifdef USE_IRIDESCENCE
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
#endif`,cy=`#ifdef USE_BUMPMAP
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
#endif`,hy=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,uy=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,dy=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,fy=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,py=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,my=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,gy=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,vy=`#if defined( USE_COLOR_ALPHA )
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
#endif`,xy=`#define PI 3.141592653589793
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
} // validated`,yy=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Ay=`vec3 transformedNormal = objectNormal;
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
#endif`,_y=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Sy=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,by=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Ey=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Ty="gl_FragColor = linearToOutputTexel( gl_FragColor );",My=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,wy=`#ifdef USE_ENVMAP
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
#endif`,Cy=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Ry=`#ifdef USE_ENVMAP
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
#endif`,Dy=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Py=`#ifdef USE_ENVMAP
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
#endif`,Iy=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Ly=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Fy=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Uy=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Ny=`#ifdef USE_GRADIENTMAP
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
}`,By=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Oy=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,ky=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,zy=`uniform bool receiveShadow;
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
#endif`,Hy=`#ifdef USE_ENVMAP
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
#endif`,Gy=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Vy=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Wy=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Xy=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Yy=`PhysicalMaterial material;
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
#endif`,Qy=`struct PhysicalMaterial {
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
}`,qy=`
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
#endif`,jy=`#if defined( RE_IndirectDiffuse )
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
#endif`,Zy=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Ky=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Jy=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,$y=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,eA=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,tA=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,nA=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,iA=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,sA=`#if defined( USE_POINTS_UV )
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
#endif`,rA=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,aA=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,oA=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,lA=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,cA=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,hA=`#ifdef USE_MORPHTARGETS
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
#endif`,uA=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,dA=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,fA=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,pA=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,mA=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,gA=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,vA=`#ifdef USE_NORMALMAP
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
#endif`,xA=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,yA=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,AA=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,_A=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,SA=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,bA=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,EA=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,TA=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,MA=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,wA=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,CA=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,RA=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,DA=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,PA=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,IA=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,LA=`float getShadowMask() {
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
}`,FA=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,UA=`#ifdef USE_SKINNING
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
#endif`,NA=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,BA=`#ifdef USE_SKINNING
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
#endif`,OA=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,kA=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,zA=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,HA=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,GA=`#ifdef USE_TRANSMISSION
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
#endif`,VA=`#ifdef USE_TRANSMISSION
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
#endif`,WA=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,XA=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,YA=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,QA=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,qA=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,jA=`uniform sampler2D t2D;
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
}`,ZA=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,KA=`#ifdef ENVMAP_TYPE_CUBE
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
}`,JA=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,$A=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,e_=`#include <common>
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
}`,t_=`#if DEPTH_PACKING == 3200
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
}`,n_=`#define DISTANCE
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
}`,i_=`#define DISTANCE
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
}`,s_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,r_=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,a_=`uniform float scale;
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
}`,o_=`uniform vec3 diffuse;
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
}`,l_=`#include <common>
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
}`,c_=`uniform vec3 diffuse;
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
}`,h_=`#define LAMBERT
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
}`,u_=`#define LAMBERT
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
}`,d_=`#define MATCAP
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
}`,f_=`#define MATCAP
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
}`,p_=`#define NORMAL
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
}`,m_=`#define NORMAL
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
}`,g_=`#define PHONG
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
}`,v_=`#define PHONG
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
}`,x_=`#define STANDARD
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
}`,y_=`#define STANDARD
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
}`,A_=`#define TOON
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
}`,__=`#define TOON
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
}`,S_=`uniform float size;
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
}`,b_=`uniform vec3 diffuse;
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
}`,E_=`#include <common>
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
}`,T_=`uniform vec3 color;
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
}`,M_=`uniform float rotation;
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
}`,w_=`uniform vec3 diffuse;
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
}`,ut={alphahash_fragment:jx,alphahash_pars_fragment:Zx,alphamap_fragment:Kx,alphamap_pars_fragment:Jx,alphatest_fragment:$x,alphatest_pars_fragment:ey,aomap_fragment:ty,aomap_pars_fragment:ny,batching_pars_vertex:iy,batching_vertex:sy,begin_vertex:ry,beginnormal_vertex:ay,bsdfs:oy,iridescence_fragment:ly,bumpmap_pars_fragment:cy,clipping_planes_fragment:hy,clipping_planes_pars_fragment:uy,clipping_planes_pars_vertex:dy,clipping_planes_vertex:fy,color_fragment:py,color_pars_fragment:my,color_pars_vertex:gy,color_vertex:vy,common:xy,cube_uv_reflection_fragment:yy,defaultnormal_vertex:Ay,displacementmap_pars_vertex:_y,displacementmap_vertex:Sy,emissivemap_fragment:by,emissivemap_pars_fragment:Ey,colorspace_fragment:Ty,colorspace_pars_fragment:My,envmap_fragment:wy,envmap_common_pars_fragment:Cy,envmap_pars_fragment:Ry,envmap_pars_vertex:Dy,envmap_physical_pars_fragment:Hy,envmap_vertex:Py,fog_vertex:Iy,fog_pars_vertex:Ly,fog_fragment:Fy,fog_pars_fragment:Uy,gradientmap_pars_fragment:Ny,lightmap_pars_fragment:By,lights_lambert_fragment:Oy,lights_lambert_pars_fragment:ky,lights_pars_begin:zy,lights_toon_fragment:Gy,lights_toon_pars_fragment:Vy,lights_phong_fragment:Wy,lights_phong_pars_fragment:Xy,lights_physical_fragment:Yy,lights_physical_pars_fragment:Qy,lights_fragment_begin:qy,lights_fragment_maps:jy,lights_fragment_end:Zy,logdepthbuf_fragment:Ky,logdepthbuf_pars_fragment:Jy,logdepthbuf_pars_vertex:$y,logdepthbuf_vertex:eA,map_fragment:tA,map_pars_fragment:nA,map_particle_fragment:iA,map_particle_pars_fragment:sA,metalnessmap_fragment:rA,metalnessmap_pars_fragment:aA,morphinstance_vertex:oA,morphcolor_vertex:lA,morphnormal_vertex:cA,morphtarget_pars_vertex:hA,morphtarget_vertex:uA,normal_fragment_begin:dA,normal_fragment_maps:fA,normal_pars_fragment:pA,normal_pars_vertex:mA,normal_vertex:gA,normalmap_pars_fragment:vA,clearcoat_normal_fragment_begin:xA,clearcoat_normal_fragment_maps:yA,clearcoat_pars_fragment:AA,iridescence_pars_fragment:_A,opaque_fragment:SA,packing:bA,premultiplied_alpha_fragment:EA,project_vertex:TA,dithering_fragment:MA,dithering_pars_fragment:wA,roughnessmap_fragment:CA,roughnessmap_pars_fragment:RA,shadowmap_pars_fragment:DA,shadowmap_pars_vertex:PA,shadowmap_vertex:IA,shadowmask_pars_fragment:LA,skinbase_vertex:FA,skinning_pars_vertex:UA,skinning_vertex:NA,skinnormal_vertex:BA,specularmap_fragment:OA,specularmap_pars_fragment:kA,tonemapping_fragment:zA,tonemapping_pars_fragment:HA,transmission_fragment:GA,transmission_pars_fragment:VA,uv_pars_fragment:WA,uv_pars_vertex:XA,uv_vertex:YA,worldpos_vertex:QA,background_vert:qA,background_frag:jA,backgroundCube_vert:ZA,backgroundCube_frag:KA,cube_vert:JA,cube_frag:$A,depth_vert:e_,depth_frag:t_,distanceRGBA_vert:n_,distanceRGBA_frag:i_,equirect_vert:s_,equirect_frag:r_,linedashed_vert:a_,linedashed_frag:o_,meshbasic_vert:l_,meshbasic_frag:c_,meshlambert_vert:h_,meshlambert_frag:u_,meshmatcap_vert:d_,meshmatcap_frag:f_,meshnormal_vert:p_,meshnormal_frag:m_,meshphong_vert:g_,meshphong_frag:v_,meshphysical_vert:x_,meshphysical_frag:y_,meshtoon_vert:A_,meshtoon_frag:__,points_vert:S_,points_frag:b_,shadow_vert:E_,shadow_frag:T_,sprite_vert:M_,sprite_frag:w_},_e={common:{diffuse:{value:new Ae(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ot},alphaMap:{value:null},alphaMapTransform:{value:new ot},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ot}},envmap:{envMap:{value:null},envMapRotation:{value:new ot},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ot}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ot}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ot},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ot},normalScale:{value:new Pe(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ot},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ot}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ot}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ot}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ae(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ae(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ot},alphaTest:{value:0},uvTransform:{value:new ot}},sprite:{diffuse:{value:new Ae(16777215)},opacity:{value:1},center:{value:new Pe(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ot},alphaMap:{value:null},alphaMapTransform:{value:new ot},alphaTest:{value:0}}},Ui={basic:{uniforms:Sn([_e.common,_e.specularmap,_e.envmap,_e.aomap,_e.lightmap,_e.fog]),vertexShader:ut.meshbasic_vert,fragmentShader:ut.meshbasic_frag},lambert:{uniforms:Sn([_e.common,_e.specularmap,_e.envmap,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.fog,_e.lights,{emissive:{value:new Ae(0)}}]),vertexShader:ut.meshlambert_vert,fragmentShader:ut.meshlambert_frag},phong:{uniforms:Sn([_e.common,_e.specularmap,_e.envmap,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.fog,_e.lights,{emissive:{value:new Ae(0)},specular:{value:new Ae(1118481)},shininess:{value:30}}]),vertexShader:ut.meshphong_vert,fragmentShader:ut.meshphong_frag},standard:{uniforms:Sn([_e.common,_e.envmap,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.roughnessmap,_e.metalnessmap,_e.fog,_e.lights,{emissive:{value:new Ae(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ut.meshphysical_vert,fragmentShader:ut.meshphysical_frag},toon:{uniforms:Sn([_e.common,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.gradientmap,_e.fog,_e.lights,{emissive:{value:new Ae(0)}}]),vertexShader:ut.meshtoon_vert,fragmentShader:ut.meshtoon_frag},matcap:{uniforms:Sn([_e.common,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.fog,{matcap:{value:null}}]),vertexShader:ut.meshmatcap_vert,fragmentShader:ut.meshmatcap_frag},points:{uniforms:Sn([_e.points,_e.fog]),vertexShader:ut.points_vert,fragmentShader:ut.points_frag},dashed:{uniforms:Sn([_e.common,_e.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ut.linedashed_vert,fragmentShader:ut.linedashed_frag},depth:{uniforms:Sn([_e.common,_e.displacementmap]),vertexShader:ut.depth_vert,fragmentShader:ut.depth_frag},normal:{uniforms:Sn([_e.common,_e.bumpmap,_e.normalmap,_e.displacementmap,{opacity:{value:1}}]),vertexShader:ut.meshnormal_vert,fragmentShader:ut.meshnormal_frag},sprite:{uniforms:Sn([_e.sprite,_e.fog]),vertexShader:ut.sprite_vert,fragmentShader:ut.sprite_frag},background:{uniforms:{uvTransform:{value:new ot},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ut.background_vert,fragmentShader:ut.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ot}},vertexShader:ut.backgroundCube_vert,fragmentShader:ut.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ut.cube_vert,fragmentShader:ut.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ut.equirect_vert,fragmentShader:ut.equirect_frag},distanceRGBA:{uniforms:Sn([_e.common,_e.displacementmap,{referencePosition:{value:new O},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ut.distanceRGBA_vert,fragmentShader:ut.distanceRGBA_frag},shadow:{uniforms:Sn([_e.lights,_e.fog,{color:{value:new Ae(0)},opacity:{value:1}}]),vertexShader:ut.shadow_vert,fragmentShader:ut.shadow_frag}};Ui.physical={uniforms:Sn([Ui.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ot},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ot},clearcoatNormalScale:{value:new Pe(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ot},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ot},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ot},sheen:{value:0},sheenColor:{value:new Ae(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ot},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ot},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ot},transmissionSamplerSize:{value:new Pe},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ot},attenuationDistance:{value:0},attenuationColor:{value:new Ae(0)},specularColor:{value:new Ae(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ot},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ot},anisotropyVector:{value:new Pe},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ot}}]),vertexShader:ut.meshphysical_vert,fragmentShader:ut.meshphysical_frag};var mc={r:0,b:0,g:0},fr=new ri,C_=new Ze;function R_(i,e,t,n,s,r,a){let o=new Ae(0),l=r===!0?0:1,c,h,u=null,d=0,p=null;function g(A){let y=A.isScene===!0?A.background:null;return y&&y.isTexture&&(y=(A.backgroundBlurriness>0?t:e).get(y)),y}function v(A){let y=!1,T=g(A);T===null?f(o,l):T&&T.isColor&&(f(T,1),y=!0);let M=i.xr.getEnvironmentBlendMode();M==="additive"?n.buffers.color.setClear(0,0,0,1,a):M==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||y)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(A,y){let T=g(y);T&&(T.isCubeTexture||T.mapping===Ra)?(h===void 0&&(h=new Qt(new Ki(1,1,1),new Nt({name:"BackgroundCubeMaterial",uniforms:lr(Ui.backgroundCube.uniforms),vertexShader:Ui.backgroundCube.vertexShader,fragmentShader:Ui.backgroundCube.fragmentShader,side:an,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(M,C,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),fr.copy(y.backgroundRotation),fr.x*=-1,fr.y*=-1,fr.z*=-1,T.isCubeTexture&&T.isRenderTargetTexture===!1&&(fr.y*=-1,fr.z*=-1),h.material.uniforms.envMap.value=T,h.material.uniforms.flipEnvMap.value=T.isCubeTexture&&T.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=y.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(C_.makeRotationFromEuler(fr)),h.material.toneMapped=mt.getTransfer(T.colorSpace)!==Ft,(u!==T||d!==T.version||p!==i.toneMapping)&&(h.material.needsUpdate=!0,u=T,d=T.version,p=i.toneMapping),h.layers.enableAll(),A.unshift(h,h.geometry,h.material,0,0,null)):T&&T.isTexture&&(c===void 0&&(c=new Qt(new sa(2,2),new Nt({name:"BackgroundMaterial",uniforms:lr(Ui.background.uniforms),vertexShader:Ui.background.vertexShader,fragmentShader:Ui.background.fragmentShader,side:Hn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=T,c.material.uniforms.backgroundIntensity.value=y.backgroundIntensity,c.material.toneMapped=mt.getTransfer(T.colorSpace)!==Ft,T.matrixAutoUpdate===!0&&T.updateMatrix(),c.material.uniforms.uvTransform.value.copy(T.matrix),(u!==T||d!==T.version||p!==i.toneMapping)&&(c.material.needsUpdate=!0,u=T,d=T.version,p=i.toneMapping),c.layers.enableAll(),A.unshift(c,c.geometry,c.material,0,0,null))}function f(A,y){A.getRGB(mc,qh(i)),n.buffers.color.setClear(mc.r,mc.g,mc.b,y,a)}function x(){h!==void 0&&(h.geometry.dispose(),h.material.dispose()),c!==void 0&&(c.geometry.dispose(),c.material.dispose())}return{getClearColor:function(){return o},setClearColor:function(A,y=1){o.set(A),l=y,f(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(A){l=A,f(o,l)},render:v,addToRenderList:m,dispose:x}}function D_(i,e){let t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=d(null),r=s,a=!1;function o(S,D,N,U,B){let W=!1,G=u(U,N,D);r!==G&&(r=G,c(r.object)),W=p(S,U,N,B),W&&g(S,U,N,B),B!==null&&e.update(B,i.ELEMENT_ARRAY_BUFFER),(W||a)&&(a=!1,y(S,D,N,U),B!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(B).buffer))}function l(){return i.createVertexArray()}function c(S){return i.bindVertexArray(S)}function h(S){return i.deleteVertexArray(S)}function u(S,D,N){let U=N.wireframe===!0,B=n[S.id];B===void 0&&(B={},n[S.id]=B);let W=B[D.id];W===void 0&&(W={},B[D.id]=W);let G=W[U];return G===void 0&&(G=d(l()),W[U]=G),G}function d(S){let D=[],N=[],U=[];for(let B=0;B<t;B++)D[B]=0,N[B]=0,U[B]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:D,enabledAttributes:N,attributeDivisors:U,object:S,attributes:{},index:null}}function p(S,D,N,U){let B=r.attributes,W=D.attributes,G=0,I=N.getAttributes();for(let P in I)if(I[P].location>=0){let J=B[P],ae=W[P];if(ae===void 0&&(P==="instanceMatrix"&&S.instanceMatrix&&(ae=S.instanceMatrix),P==="instanceColor"&&S.instanceColor&&(ae=S.instanceColor)),J===void 0||J.attribute!==ae||ae&&J.data!==ae.data)return!0;G++}return r.attributesNum!==G||r.index!==U}function g(S,D,N,U){let B={},W=D.attributes,G=0,I=N.getAttributes();for(let P in I)if(I[P].location>=0){let J=W[P];J===void 0&&(P==="instanceMatrix"&&S.instanceMatrix&&(J=S.instanceMatrix),P==="instanceColor"&&S.instanceColor&&(J=S.instanceColor));let ae={};ae.attribute=J,J&&J.data&&(ae.data=J.data),B[P]=ae,G++}r.attributes=B,r.attributesNum=G,r.index=U}function v(){let S=r.newAttributes;for(let D=0,N=S.length;D<N;D++)S[D]=0}function m(S){f(S,0)}function f(S,D){let N=r.newAttributes,U=r.enabledAttributes,B=r.attributeDivisors;N[S]=1,U[S]===0&&(i.enableVertexAttribArray(S),U[S]=1),B[S]!==D&&(i.vertexAttribDivisor(S,D),B[S]=D)}function x(){let S=r.newAttributes,D=r.enabledAttributes;for(let N=0,U=D.length;N<U;N++)D[N]!==S[N]&&(i.disableVertexAttribArray(N),D[N]=0)}function A(S,D,N,U,B,W,G){G===!0?i.vertexAttribIPointer(S,D,N,B,W):i.vertexAttribPointer(S,D,N,U,B,W)}function y(S,D,N,U){v();let B=U.attributes,W=N.getAttributes(),G=D.defaultAttributeValues;for(let I in W){let P=W[I];if(P.location>=0){let L=B[I];if(L===void 0&&(I==="instanceMatrix"&&S.instanceMatrix&&(L=S.instanceMatrix),I==="instanceColor"&&S.instanceColor&&(L=S.instanceColor)),L!==void 0){let J=L.normalized,ae=L.itemSize,ve=e.get(L);if(ve===void 0)continue;let le=ve.buffer,V=ve.type,j=ve.bytesPerElement,ie=V===i.INT||V===i.UNSIGNED_INT||L.gpuType===No;if(L.isInterleavedBufferAttribute){let ue=L.data,Ie=ue.stride,De=L.offset;if(ue.isInstancedInterleavedBuffer){for(let He=0;He<P.locationSize;He++)f(P.location+He,ue.meshPerAttribute);S.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=ue.meshPerAttribute*ue.count)}else for(let He=0;He<P.locationSize;He++)m(P.location+He);i.bindBuffer(i.ARRAY_BUFFER,le);for(let He=0;He<P.locationSize;He++)A(P.location+He,ae/P.locationSize,V,J,Ie*j,(De+ae/P.locationSize*He)*j,ie)}else{if(L.isInstancedBufferAttribute){for(let ue=0;ue<P.locationSize;ue++)f(P.location+ue,L.meshPerAttribute);S.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=L.meshPerAttribute*L.count)}else for(let ue=0;ue<P.locationSize;ue++)m(P.location+ue);i.bindBuffer(i.ARRAY_BUFFER,le);for(let ue=0;ue<P.locationSize;ue++)A(P.location+ue,ae/P.locationSize,V,J,ae*j,ae/P.locationSize*ue*j,ie)}}else if(G!==void 0){let J=G[I];if(J!==void 0)switch(J.length){case 2:i.vertexAttrib2fv(P.location,J);break;case 3:i.vertexAttrib3fv(P.location,J);break;case 4:i.vertexAttrib4fv(P.location,J);break;default:i.vertexAttrib1fv(P.location,J)}}}}x()}function T(){R();for(let S in n){let D=n[S];for(let N in D){let U=D[N];for(let B in U)h(U[B].object),delete U[B];delete D[N]}delete n[S]}}function M(S){if(n[S.id]===void 0)return;let D=n[S.id];for(let N in D){let U=D[N];for(let B in U)h(U[B].object),delete U[B];delete D[N]}delete n[S.id]}function C(S){for(let D in n){let N=n[D];if(N[S.id]===void 0)continue;let U=N[S.id];for(let B in U)h(U[B].object),delete U[B];delete N[S.id]}}function R(){b(),a=!0,r!==s&&(r=s,c(r.object))}function b(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:R,resetDefaultState:b,dispose:T,releaseStatesOfGeometry:M,releaseStatesOfProgram:C,initAttributes:v,enableAttribute:m,disableUnusedAttributes:x}}function P_(i,e,t){let n;function s(c){n=c}function r(c,h){i.drawArrays(n,c,h),t.update(h,n,1)}function a(c,h,u){u!==0&&(i.drawArraysInstanced(n,c,h,u),t.update(h,n,u))}function o(c,h,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,u);let p=0;for(let g=0;g<u;g++)p+=h[g];t.update(p,n,1)}function l(c,h,u,d){if(u===0)return;let p=e.get("WEBGL_multi_draw");if(p===null)for(let g=0;g<c.length;g++)a(c[g],h[g],d[g]);else{p.multiDrawArraysInstancedWEBGL(n,c,0,h,0,d,0,u);let g=0;for(let v=0;v<u;v++)g+=h[v]*d[v];t.update(g,n,1)}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function I_(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){let C=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(C.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(C){return!(C!==Vn&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(C){let R=C===Br&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(C!==kt&&n.convert(C)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&C!==Gn&&!R)}function l(C){if(C==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";C="mediump"}return C==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp",h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let u=t.logarithmicDepthBuffer===!0,d=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),p=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),f=i.getParameter(i.MAX_VERTEX_ATTRIBS),x=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),A=i.getParameter(i.MAX_VARYING_VECTORS),y=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),T=g>0,M=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:u,reverseDepthBuffer:d,maxTextures:p,maxVertexTextures:g,maxTextureSize:v,maxCubemapSize:m,maxAttributes:f,maxVertexUniforms:x,maxVaryings:A,maxFragmentUniforms:y,vertexTextures:T,maxSamples:M}}function L_(i){let e=this,t=null,n=0,s=!1,r=!1,a=new $i,o=new ot,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){let p=u.length!==0||d||n!==0||s;return s=d,n=u.length,p},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){t=h(u,d,0)},this.setState=function(u,d,p){let g=u.clippingPlanes,v=u.clipIntersection,m=u.clipShadows,f=i.get(u);if(!s||g===null||g.length===0||r&&!m)r?h(null):c();else{let x=r?0:n,A=x*4,y=f.clippingState||null;l.value=y,y=h(g,d,A,p);for(let T=0;T!==A;++T)y[T]=t[T];f.clippingState=y,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=x}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,d,p,g){let v=u!==null?u.length:0,m=null;if(v!==0){if(m=l.value,g!==!0||m===null){let f=p+v*4,x=d.matrixWorldInverse;o.getNormalMatrix(x),(m===null||m.length<f)&&(m=new Float32Array(f));for(let A=0,y=p;A!==v;++A,y+=4)a.copy(u[A]).applyMatrix4(x,o),a.normal.toArray(m,y),m[y+3]=a.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,m}}function F_(i){let e=new WeakMap;function t(a,o){return o===Lo?a.mapping=js:o===Fo&&(a.mapping=Zs),a}function n(a){if(a&&a.isTexture){let o=a.mapping;if(o===Lo||o===Fo)if(e.has(a)){let l=e.get(a).texture;return t(l,a.mapping)}else{let l=a.image;if(l&&l.height>0){let c=new Zh(l.height);return c.fromEquirectangularTexture(i,a),e.set(a,c),a.addEventListener("dispose",s),t(c.texture,a.mapping)}else return null}}return a}function s(a){let o=a.target;o.removeEventListener("dispose",s);let l=e.get(o);l!==void 0&&(e.delete(o),l.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}var ca=4,Qp=[.125,.215,.35,.446,.526,.582],pr=20,gu=new oa,qp=new Ae,vu=null,xu=0,yu=0,Au=!1,mr=(1+Math.sqrt(5))/2,ha=1/mr,jp=[new O(-mr,ha,0),new O(mr,ha,0),new O(-ha,0,mr),new O(ha,0,mr),new O(0,mr,-ha),new O(0,mr,ha),new O(-1,1,-1),new O(1,1,-1),new O(-1,1,1),new O(1,1,1)],_u=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,s=100){vu=this._renderer.getRenderTarget(),xu=this._renderer.getActiveCubeFace(),yu=this._renderer.getActiveMipmapLevel(),Au=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);let r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,n,s,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Jp(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Kp(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(vu,xu,yu),this._renderer.xr.enabled=Au,e.scissorTest=!1,gc(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===js||e.mapping===Zs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),vu=this._renderer.getRenderTarget(),xu=this._renderer.getActiveCubeFace(),yu=this._renderer.getActiveMipmapLevel(),Au=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,16*7),t=4*this._cubeSize,n={magFilter:en,minFilter:en,generateMipmaps:!1,type:Br,format:Vn,colorSpace:Wt,depthBuffer:!1},s=Zp(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Zp(e,t,n);let{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=U_(r)),this._blurMaterial=N_(r,e,t)}return s}_compileMaterial(e){let t=new Qt(this._lodPlanes[0],e);this._renderer.compile(t,gu)}_sceneToCubeUV(e,t,n,s){let r=90,a=1,o=new qt(r,a,t,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(qp),h.toneMapping=Gi,h.autoClear=!1;let p=new ai({name:"PMREM.Background",side:an,depthWrite:!1,depthTest:!1}),g=new Qt(new Ki,p),v=!1,m=e.background;m?m.isColor&&(p.color.copy(m),e.background=null,v=!0):(p.color.copy(qp),v=!0);for(let f=0;f<6;f++){let x=f%3;x===0?(o.up.set(0,l[f],0),o.lookAt(c[f],0,0)):x===1?(o.up.set(0,0,l[f]),o.lookAt(0,c[f],0)):(o.up.set(0,l[f],0),o.lookAt(0,0,c[f]));let A=this._cubeSize;gc(s,x*A,f>2?A:0,A,A),h.setRenderTarget(s),v&&h.render(g,o),h.render(e,o)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=d,h.autoClear=u,e.background=m}_textureToCubeUV(e,t){let n=this._renderer,s=e.mapping===js||e.mapping===Zs;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Jp()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Kp());let r=s?this._cubemapMaterial:this._equirectMaterial,a=new Qt(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=e;let l=this._cubeSize;gc(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(a,gu)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let s=this._lodPlanes.length;for(let r=1;r<s;r++){let a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=jp[(s-r-1)%jp.length];this._blur(e,r-1,r,a,o)}t.autoClear=n}_blur(e,t,n,s,r){let a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,s,"latitudinal",r),this._halfBlur(a,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,a,o){let l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,u=new Qt(this._lodPlanes[s],c),d=c.uniforms,p=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*pr-1),v=r/g,m=isFinite(r)?1+Math.floor(h*v):pr;m>pr&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${pr}`);let f=[],x=0;for(let C=0;C<pr;++C){let R=C/v,b=Math.exp(-R*R/2);f.push(b),C===0?x+=b:C<m&&(x+=2*b)}for(let C=0;C<f.length;C++)f[C]=f[C]/x;d.envMap.value=e.texture,d.samples.value=m,d.weights.value=f,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);let{_lodMax:A}=this;d.dTheta.value=g,d.mipInt.value=A-n;let y=this._sizeLods[s],T=3*y*(s>A-ca?s-A+ca:0),M=4*(this._cubeSize-y);gc(t,T,M,3*y,2*y),l.setRenderTarget(t),l.render(u,gu)}};function U_(i){let e=[],t=[],n=[],s=i,r=i-ca+1+Qp.length;for(let a=0;a<r;a++){let o=Math.pow(2,s);t.push(o);let l=1/o;a>i-ca?l=Qp[a-i+ca-1]:a===0&&(l=0),n.push(l);let c=1/(o-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],p=6,g=6,v=3,m=2,f=1,x=new Float32Array(v*g*p),A=new Float32Array(m*g*p),y=new Float32Array(f*g*p);for(let M=0;M<p;M++){let C=M%3*2/3-1,R=M>2?0:-1,b=[C,R,0,C+2/3,R,0,C+2/3,R+1,0,C,R,0,C+2/3,R+1,0,C,R+1,0];x.set(b,v*g*M),A.set(d,m*g*M);let S=[M,M,M,M,M,M];y.set(S,f*g*M)}let T=new Yt;T.setAttribute("position",new Gt(x,v)),T.setAttribute("uv",new Gt(A,m)),T.setAttribute("faceIndex",new Gt(y,f)),e.push(T),s>ca&&s--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Zp(i,e,t){let n=new Ht(i,e,t);return n.texture.mapping=Ra,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function gc(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function N_(i,e,t){let n=new Float32Array(pr),s=new O(0,1,0);return new Nt({name:"SphericalGaussianBlur",defines:{n:pr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Su(),fragmentShader:`

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
		`,blending:$t,depthTest:!1,depthWrite:!1})}function Kp(){return new Nt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Su(),fragmentShader:`

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
		`,blending:$t,depthTest:!1,depthWrite:!1})}function Jp(){return new Nt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Su(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:$t,depthTest:!1,depthWrite:!1})}function Su(){return`

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
	`}function B_(i){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){let l=o.mapping,c=l===Lo||l===Fo,h=l===js||l===Zs;if(c||h){let u=e.get(o),d=u!==void 0?u.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==d)return t===null&&(t=new _u(i)),u=c?t.fromEquirectangular(o,u):t.fromCubemap(o,u),u.texture.pmremVersion=o.pmremVersion,e.set(o,u),u.texture;if(u!==void 0)return u.texture;{let p=o.image;return c&&p&&p.height>0||h&&p&&s(p)?(t===null&&(t=new _u(i)),u=c?t.fromEquirectangular(o):t.fromCubemap(o),u.texture.pmremVersion=o.pmremVersion,e.set(o,u),o.addEventListener("dispose",r),u.texture):null}}}return o}function s(o){let l=0,c=6;for(let h=0;h<c;h++)o[h]!==void 0&&l++;return l===c}function r(o){let l=o.target;l.removeEventListener("dispose",r);let c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function O_(i){let e={};function t(n){if(e[n]!==void 0)return e[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let s=t(n);return s===null&&ir("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function k_(i,e,t,n){let s={},r=new WeakMap;function a(u){let d=u.target;d.index!==null&&e.remove(d.index);for(let g in d.attributes)e.remove(d.attributes[g]);d.removeEventListener("dispose",a),delete s[d.id];let p=r.get(d);p&&(e.remove(p),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(u,d){return s[d.id]===!0||(d.addEventListener("dispose",a),s[d.id]=!0,t.memory.geometries++),d}function l(u){let d=u.attributes;for(let p in d)e.update(d[p],i.ARRAY_BUFFER)}function c(u){let d=[],p=u.index,g=u.attributes.position,v=0;if(p!==null){let x=p.array;v=p.version;for(let A=0,y=x.length;A<y;A+=3){let T=x[A+0],M=x[A+1],C=x[A+2];d.push(T,M,M,C,C,T)}}else if(g!==void 0){let x=g.array;v=g.version;for(let A=0,y=x.length/3-1;A<y;A+=3){let T=A+0,M=A+1,C=A+2;d.push(T,M,M,C,C,T)}}else return;let m=new(Mh(d)?Dl:Rl)(d,1);m.version=v;let f=r.get(u);f&&e.remove(f),r.set(u,m)}function h(u){let d=r.get(u);if(d){let p=u.index;p!==null&&d.version<p.version&&c(u)}else c(u);return r.get(u)}return{get:o,update:l,getWireframeAttribute:h}}function z_(i,e,t){let n;function s(d){n=d}let r,a;function o(d){r=d.type,a=d.bytesPerElement}function l(d,p){i.drawElements(n,p,r,d*a),t.update(p,n,1)}function c(d,p,g){g!==0&&(i.drawElementsInstanced(n,p,r,d*a,g),t.update(p,n,g))}function h(d,p,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,p,0,r,d,0,g);let m=0;for(let f=0;f<g;f++)m+=p[f];t.update(m,n,1)}function u(d,p,g,v){if(g===0)return;let m=e.get("WEBGL_multi_draw");if(m===null)for(let f=0;f<d.length;f++)c(d[f]/a,p[f],v[f]);else{m.multiDrawElementsInstancedWEBGL(n,p,0,r,d,0,v,0,g);let f=0;for(let x=0;x<g;x++)f+=p[x]*v[x];t.update(f,n,1)}}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function H_(i){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function G_(i,e,t){let n=new WeakMap,s=new yt;function r(a,o,l){let c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=h!==void 0?h.length:0,d=n.get(o);if(d===void 0||d.count!==u){let b=function(){C.dispose(),n.delete(o),o.removeEventListener("dispose",b)};d!==void 0&&d.texture.dispose();let p=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,v=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],f=o.morphAttributes.normal||[],x=o.morphAttributes.color||[],A=0;p===!0&&(A=1),g===!0&&(A=2),v===!0&&(A=3);let y=o.attributes.position.count*A,T=1;y>e.maxTextureSize&&(T=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);let M=new Float32Array(y*T*4*u),C=new yl(M,y,T,u);C.type=Gn,C.needsUpdate=!0;let R=A*4;for(let S=0;S<u;S++){let D=m[S],N=f[S],U=x[S],B=y*T*4*S;for(let W=0;W<D.count;W++){let G=W*R;p===!0&&(s.fromBufferAttribute(D,W),M[B+G+0]=s.x,M[B+G+1]=s.y,M[B+G+2]=s.z,M[B+G+3]=0),g===!0&&(s.fromBufferAttribute(N,W),M[B+G+4]=s.x,M[B+G+5]=s.y,M[B+G+6]=s.z,M[B+G+7]=0),v===!0&&(s.fromBufferAttribute(U,W),M[B+G+8]=s.x,M[B+G+9]=s.y,M[B+G+10]=s.z,M[B+G+11]=U.itemSize===4?s.w:1)}}d={count:u,texture:C,size:new Pe(y,T)},n.set(o,d),o.addEventListener("dispose",b)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let p=0;for(let v=0;v<c.length;v++)p+=c[v];let g=o.morphTargetsRelative?1:1-p;l.getUniforms().setValue(i,"morphTargetBaseInfluence",g),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:r}}function V_(i,e,t,n){let s=new WeakMap;function r(l){let c=n.render.frame,h=l.geometry,u=e.get(l,h);if(s.get(u)!==c&&(e.update(u),s.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),s.get(l)!==c&&(t.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){let d=l.skeleton;s.get(d)!==c&&(d.update(),s.set(d,c))}return u}function a(){s=new WeakMap}function o(l){let c=l.target;c.removeEventListener("dispose",o),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:a}}var $p=new zt,em=new na(1,1),tm=new yl,nm=new Dh,im=new Ol,sm=[],rm=[],am=new Float32Array(16),om=new Float32Array(9),lm=new Float32Array(4);function ua(i,e,t){let n=i[0];if(n<=0||n>0)return i;let s=e*t,r=sm[s];if(r===void 0&&(r=new Float32Array(s),sm[s]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(r,o)}return r}function cn(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function hn(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function vc(i,e){let t=rm[e];t===void 0&&(t=new Int32Array(e),rm[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function W_(i,e){let t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function X_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(cn(t,e))return;i.uniform2fv(this.addr,e),hn(t,e)}}function Y_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(cn(t,e))return;i.uniform3fv(this.addr,e),hn(t,e)}}function Q_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(cn(t,e))return;i.uniform4fv(this.addr,e),hn(t,e)}}function q_(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(cn(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),hn(t,e)}else{if(cn(t,n))return;lm.set(n),i.uniformMatrix2fv(this.addr,!1,lm),hn(t,n)}}function j_(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(cn(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),hn(t,e)}else{if(cn(t,n))return;om.set(n),i.uniformMatrix3fv(this.addr,!1,om),hn(t,n)}}function Z_(i,e){let t=this.cache,n=e.elements;if(n===void 0){if(cn(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),hn(t,e)}else{if(cn(t,n))return;am.set(n),i.uniformMatrix4fv(this.addr,!1,am),hn(t,n)}}function K_(i,e){let t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function J_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(cn(t,e))return;i.uniform2iv(this.addr,e),hn(t,e)}}function $_(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(cn(t,e))return;i.uniform3iv(this.addr,e),hn(t,e)}}function e1(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(cn(t,e))return;i.uniform4iv(this.addr,e),hn(t,e)}}function t1(i,e){let t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function n1(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(cn(t,e))return;i.uniform2uiv(this.addr,e),hn(t,e)}}function i1(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(cn(t,e))return;i.uniform3uiv(this.addr,e),hn(t,e)}}function s1(i,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(cn(t,e))return;i.uniform4uiv(this.addr,e),hn(t,e)}}function r1(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(em.compareFunction=_h,r=em):r=$p,t.setTexture2D(e||r,s)}function a1(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||nm,s)}function o1(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||im,s)}function l1(i,e,t){let n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||tm,s)}function c1(i){switch(i){case 5126:return W_;case 35664:return X_;case 35665:return Y_;case 35666:return Q_;case 35674:return q_;case 35675:return j_;case 35676:return Z_;case 5124:case 35670:return K_;case 35667:case 35671:return J_;case 35668:case 35672:return $_;case 35669:case 35673:return e1;case 5125:return t1;case 36294:return n1;case 36295:return i1;case 36296:return s1;case 35678:case 36198:case 36298:case 36306:case 35682:return r1;case 35679:case 36299:case 36307:return a1;case 35680:case 36300:case 36308:case 36293:return o1;case 36289:case 36303:case 36311:case 36292:return l1}}function h1(i,e){i.uniform1fv(this.addr,e)}function u1(i,e){let t=ua(e,this.size,2);i.uniform2fv(this.addr,t)}function d1(i,e){let t=ua(e,this.size,3);i.uniform3fv(this.addr,t)}function f1(i,e){let t=ua(e,this.size,4);i.uniform4fv(this.addr,t)}function p1(i,e){let t=ua(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function m1(i,e){let t=ua(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function g1(i,e){let t=ua(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function v1(i,e){i.uniform1iv(this.addr,e)}function x1(i,e){i.uniform2iv(this.addr,e)}function y1(i,e){i.uniform3iv(this.addr,e)}function A1(i,e){i.uniform4iv(this.addr,e)}function _1(i,e){i.uniform1uiv(this.addr,e)}function S1(i,e){i.uniform2uiv(this.addr,e)}function b1(i,e){i.uniform3uiv(this.addr,e)}function E1(i,e){i.uniform4uiv(this.addr,e)}function T1(i,e,t){let n=this.cache,s=e.length,r=vc(t,s);cn(n,r)||(i.uniform1iv(this.addr,r),hn(n,r));for(let a=0;a!==s;++a)t.setTexture2D(e[a]||$p,r[a])}function M1(i,e,t){let n=this.cache,s=e.length,r=vc(t,s);cn(n,r)||(i.uniform1iv(this.addr,r),hn(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||nm,r[a])}function w1(i,e,t){let n=this.cache,s=e.length,r=vc(t,s);cn(n,r)||(i.uniform1iv(this.addr,r),hn(n,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||im,r[a])}function C1(i,e,t){let n=this.cache,s=e.length,r=vc(t,s);cn(n,r)||(i.uniform1iv(this.addr,r),hn(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||tm,r[a])}function R1(i){switch(i){case 5126:return h1;case 35664:return u1;case 35665:return d1;case 35666:return f1;case 35674:return p1;case 35675:return m1;case 35676:return g1;case 5124:case 35670:return v1;case 35667:case 35671:return x1;case 35668:case 35672:return y1;case 35669:case 35673:return A1;case 5125:return _1;case 36294:return S1;case 36295:return b1;case 36296:return E1;case 35678:case 36198:case 36298:case 36306:case 35682:return T1;case 35679:case 36299:case 36307:return M1;case 35680:case 36300:case 36308:case 36293:return w1;case 36289:case 36303:case 36311:case 36292:return C1}}var cm=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=c1(t.type)}},hm=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=R1(t.type)}},um=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(e,t[o.id],n)}}},bu=/(\w+)(\])?(\[|\.)?/g;function dm(i,e){i.seq.push(e),i.map[e.id]=e}function D1(i,e,t){let n=i.name,s=n.length;for(bu.lastIndex=0;;){let r=bu.exec(n),a=bu.lastIndex,o=r[1],l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){dm(t,c===void 0?new cm(o,i,e):new hm(o,i,e));break}else{let u=t.map[o];u===void 0&&(u=new um(o),dm(t,u)),t=u}}}var eo=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){let r=e.getActiveUniform(t,s),a=e.getUniformLocation(t,r.name);D1(r,a,this)}}setValue(e,t,n,s){let r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){let s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){let o=t[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,s)}}static seqWithValue(e,t){let n=[];for(let s=0,r=e.length;s!==r;++s){let a=e[s];a.id in t&&n.push(a)}return n}};function fm(i,e,t){let n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}var P1=37297,I1=0;function L1(i,e){let t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){let o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}var pm=new ot;function F1(i){mt._getMatrix(pm,mt.workingColorSpace,i);let e=`mat3( ${pm.elements.map(t=>t.toFixed(4))} )`;switch(mt.getTransfer(i)){case Na:return[e,"LinearTransferOETF"];case Ft:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function mm(i,e,t){let n=i.getShaderParameter(e,i.COMPILE_STATUS),s=i.getShaderInfoLog(e).trim();if(n&&s==="")return"";let r=/ERROR: 0:(\d+)/.exec(s);if(r){let a=parseInt(r[1]);return t.toUpperCase()+`

`+s+`

`+L1(i.getShaderSource(e),a)}else return s}function U1(i,e){let t=F1(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function N1(i,e){let t;switch(e){case Df:t="Linear";break;case Pf:t="Reinhard";break;case If:t="Cineon";break;case Lf:t="ACESFilmic";break;case Uf:t="AgX";break;case Nf:t="Neutral";break;case Ff:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var xc=new O;function B1(){mt.getLuminanceCoefficients(xc);let i=xc.x.toFixed(4),e=xc.y.toFixed(4),t=xc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function O1(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(to).join(`
`)}function k1(i){let e=[];for(let t in i){let n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function z1(i,e){let t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){let r=i.getActiveAttrib(e,s),a=r.name,o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function to(i){return i!==""}function gm(i,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function vm(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var H1=/^[ \t]*#include +<([\w\d./]+)>/gm;function Eu(i){return i.replace(H1,V1)}var G1=new Map;function V1(i,e){let t=ut[e];if(t===void 0){let n=G1.get(e);if(n!==void 0)t=ut[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return Eu(t)}var W1=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function xm(i){return i.replace(W1,X1)}function X1(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function ym(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}function Y1(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===$c?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===cf?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Ii&&(e="SHADOWMAP_TYPE_VSM"),e}function Q1(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case js:case Zs:e="ENVMAP_TYPE_CUBE";break;case Ra:e="ENVMAP_TYPE_CUBE_UV";break}return e}function q1(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Zs:e="ENVMAP_MODE_REFRACTION";break}return e}function j1(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case ih:e="ENVMAP_BLENDING_MULTIPLY";break;case Cf:e="ENVMAP_BLENDING_MIX";break;case Rf:e="ENVMAP_BLENDING_ADD";break}return e}function Z1(i){let e=i.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function K1(i,e,t,n){let s=i.getContext(),r=t.defines,a=t.vertexShader,o=t.fragmentShader,l=Y1(t),c=Q1(t),h=q1(t),u=j1(t),d=Z1(t),p=O1(t),g=k1(r),v=s.createProgram(),m,f,x=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(to).join(`
`),m.length>0&&(m+=`
`),f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(to).join(`
`),f.length>0&&(f+=`
`)):(m=[ym(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(to).join(`
`),f=[ym(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Gi?"#define TONE_MAPPING":"",t.toneMapping!==Gi?ut.tonemapping_pars_fragment:"",t.toneMapping!==Gi?N1("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",ut.colorspace_pars_fragment,U1("linearToOutputTexel",t.outputColorSpace),B1(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(to).join(`
`)),a=Eu(a),a=gm(a,t),a=vm(a,t),o=Eu(o),o=gm(o,t),o=vm(o,t),a=xm(a),o=xm(o),t.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,f=["#define varying in",t.glslVersion===Sh?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Sh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);let A=x+m+a,y=x+f+o,T=fm(s,s.VERTEX_SHADER,A),M=fm(s,s.FRAGMENT_SHADER,y);s.attachShader(v,T),s.attachShader(v,M),t.index0AttributeName!==void 0?s.bindAttribLocation(v,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function C(D){if(i.debug.checkShaderErrors){let N=s.getProgramInfoLog(v).trim(),U=s.getShaderInfoLog(T).trim(),B=s.getShaderInfoLog(M).trim(),W=!0,G=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(W=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,v,T,M);else{let I=mm(s,T,"vertex"),P=mm(s,M,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+D.name+`
Material Type: `+D.type+`

Program Info Log: `+N+`
`+I+`
`+P)}else N!==""?console.warn("THREE.WebGLProgram: Program Info Log:",N):(U===""||B==="")&&(G=!1);G&&(D.diagnostics={runnable:W,programLog:N,vertexShader:{log:U,prefix:m},fragmentShader:{log:B,prefix:f}})}s.deleteShader(T),s.deleteShader(M),R=new eo(s,v),b=z1(s,v)}let R;this.getUniforms=function(){return R===void 0&&C(this),R};let b;this.getAttributes=function(){return b===void 0&&C(this),b};let S=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return S===!1&&(S=s.getProgramParameter(v,P1)),S},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=I1++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=T,this.fragmentShader=M,this}var J1=0,Am=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new _m(e),t.set(e,n)),n}},_m=class{constructor(e){this.id=J1++,this.code=e,this.usedTimes=0}};function $1(i,e,t,n,s,r,a){let o=new Ga,l=new Am,c=new Set,h=[],u=s.logarithmicDepthBuffer,d=s.vertexTextures,p=s.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(b){return c.add(b),b===0?"uv":`uv${b}`}function m(b,S,D,N,U){let B=N.fog,W=U.geometry,G=b.isMeshStandardMaterial?N.environment:null,I=(b.isMeshStandardMaterial?t:e).get(b.envMap||G),P=!!I&&I.mapping===Ra?I.image.height:null,L=g[b.type];b.precision!==null&&(p=s.getMaxPrecision(b.precision),p!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",p,"instead."));let J=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,ae=J!==void 0?J.length:0,ve=0;W.morphAttributes.position!==void 0&&(ve=1),W.morphAttributes.normal!==void 0&&(ve=2),W.morphAttributes.color!==void 0&&(ve=3);let le,V,j,ie;if(L){let bt=Ui[L];le=bt.vertexShader,V=bt.fragmentShader}else le=b.vertexShader,V=b.fragmentShader,l.update(b),j=l.getVertexShaderID(b),ie=l.getFragmentShaderID(b);let ue=i.getRenderTarget(),Ie=i.state.buffers.depth.getReversed(),De=U.isInstancedMesh===!0,He=U.isBatchedMesh===!0,$e=!!b.map,We=!!b.matcap,Je=!!I,F=!!b.aoMap,Dt=!!b.lightMap,Be=!!b.bumpMap,qe=!!b.normalMap,Le=!!b.displacementMap,pe=!!b.emissiveMap,xe=!!b.metalnessMap,w=!!b.roughnessMap,_=b.anisotropy>0,Y=b.clearcoat>0,$=b.dispersion>0,se=b.iridescence>0,te=b.sheen>0,Z=b.transmission>0,K=_&&!!b.anisotropyMap,oe=Y&&!!b.clearcoatMap,Te=Y&&!!b.clearcoatNormalMap,re=Y&&!!b.clearcoatRoughnessMap,ge=se&&!!b.iridescenceMap,Fe=se&&!!b.iridescenceThicknessMap,Qe=te&&!!b.sheenColorMap,we=te&&!!b.sheenRoughnessMap,Ue=!!b.specularMap,Ge=!!b.specularColorMap,Pt=!!b.specularIntensityMap,k=Z&&!!b.transmissionMap,ce=Z&&!!b.thicknessMap,ee=!!b.gradientMap,he=!!b.alphaMap,Me=b.alphaTest>0,be=!!b.alphaHash,et=!!b.extensions,Bt=Gi;b.toneMapped&&(ue===null||ue.isXRRenderTarget===!0)&&(Bt=i.toneMapping);let dn={shaderID:L,shaderType:b.type,shaderName:b.name,vertexShader:le,fragmentShader:V,defines:b.defines,customVertexShaderID:j,customFragmentShaderID:ie,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:p,batching:He,batchingColor:He&&U._colorsTexture!==null,instancing:De,instancingColor:De&&U.instanceColor!==null,instancingMorph:De&&U.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:ue===null?i.outputColorSpace:ue.isXRRenderTarget===!0?ue.texture.colorSpace:Wt,alphaToCoverage:!!b.alphaToCoverage,map:$e,matcap:We,envMap:Je,envMapMode:Je&&I.mapping,envMapCubeUVHeight:P,aoMap:F,lightMap:Dt,bumpMap:Be,normalMap:qe,displacementMap:d&&Le,emissiveMap:pe,normalMapObjectSpace:qe&&b.normalMapType===kf,normalMapTangentSpace:qe&&b.normalMapType===gl,metalnessMap:xe,roughnessMap:w,anisotropy:_,anisotropyMap:K,clearcoat:Y,clearcoatMap:oe,clearcoatNormalMap:Te,clearcoatRoughnessMap:re,dispersion:$,iridescence:se,iridescenceMap:ge,iridescenceThicknessMap:Fe,sheen:te,sheenColorMap:Qe,sheenRoughnessMap:we,specularMap:Ue,specularColorMap:Ge,specularIntensityMap:Pt,transmission:Z,transmissionMap:k,thicknessMap:ce,gradientMap:ee,opaque:b.transparent===!1&&b.blending===Qs&&b.alphaToCoverage===!1,alphaMap:he,alphaTest:Me,alphaHash:be,combine:b.combine,mapUv:$e&&v(b.map.channel),aoMapUv:F&&v(b.aoMap.channel),lightMapUv:Dt&&v(b.lightMap.channel),bumpMapUv:Be&&v(b.bumpMap.channel),normalMapUv:qe&&v(b.normalMap.channel),displacementMapUv:Le&&v(b.displacementMap.channel),emissiveMapUv:pe&&v(b.emissiveMap.channel),metalnessMapUv:xe&&v(b.metalnessMap.channel),roughnessMapUv:w&&v(b.roughnessMap.channel),anisotropyMapUv:K&&v(b.anisotropyMap.channel),clearcoatMapUv:oe&&v(b.clearcoatMap.channel),clearcoatNormalMapUv:Te&&v(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:re&&v(b.clearcoatRoughnessMap.channel),iridescenceMapUv:ge&&v(b.iridescenceMap.channel),iridescenceThicknessMapUv:Fe&&v(b.iridescenceThicknessMap.channel),sheenColorMapUv:Qe&&v(b.sheenColorMap.channel),sheenRoughnessMapUv:we&&v(b.sheenRoughnessMap.channel),specularMapUv:Ue&&v(b.specularMap.channel),specularColorMapUv:Ge&&v(b.specularColorMap.channel),specularIntensityMapUv:Pt&&v(b.specularIntensityMap.channel),transmissionMapUv:k&&v(b.transmissionMap.channel),thicknessMapUv:ce&&v(b.thicknessMap.channel),alphaMapUv:he&&v(b.alphaMap.channel),vertexTangents:!!W.attributes.tangent&&(qe||_),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,pointsUvs:U.isPoints===!0&&!!W.attributes.uv&&($e||he),fog:!!B,useFog:b.fog===!0,fogExp2:!!B&&B.isFogExp2,flatShading:b.flatShading===!0,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:Ie,skinning:U.isSkinnedMesh===!0,morphTargets:W.morphAttributes.position!==void 0,morphNormals:W.morphAttributes.normal!==void 0,morphColors:W.morphAttributes.color!==void 0,morphTargetsCount:ae,morphTextureStride:ve,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:b.dithering,shadowMapEnabled:i.shadowMap.enabled&&D.length>0,shadowMapType:i.shadowMap.type,toneMapping:Bt,decodeVideoTexture:$e&&b.map.isVideoTexture===!0&&mt.getTransfer(b.map.colorSpace)===Ft,decodeVideoTextureEmissive:pe&&b.emissiveMap.isVideoTexture===!0&&mt.getTransfer(b.emissiveMap.colorSpace)===Ft,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===vn,flipSided:b.side===an,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:et&&b.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(et&&b.extensions.multiDraw===!0||He)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return dn.vertexUv1s=c.has(1),dn.vertexUv2s=c.has(2),dn.vertexUv3s=c.has(3),c.clear(),dn}function f(b){let S=[];if(b.shaderID?S.push(b.shaderID):(S.push(b.customVertexShaderID),S.push(b.customFragmentShaderID)),b.defines!==void 0)for(let D in b.defines)S.push(D),S.push(b.defines[D]);return b.isRawShaderMaterial===!1&&(x(S,b),A(S,b),S.push(i.outputColorSpace)),S.push(b.customProgramCacheKey),S.join()}function x(b,S){b.push(S.precision),b.push(S.outputColorSpace),b.push(S.envMapMode),b.push(S.envMapCubeUVHeight),b.push(S.mapUv),b.push(S.alphaMapUv),b.push(S.lightMapUv),b.push(S.aoMapUv),b.push(S.bumpMapUv),b.push(S.normalMapUv),b.push(S.displacementMapUv),b.push(S.emissiveMapUv),b.push(S.metalnessMapUv),b.push(S.roughnessMapUv),b.push(S.anisotropyMapUv),b.push(S.clearcoatMapUv),b.push(S.clearcoatNormalMapUv),b.push(S.clearcoatRoughnessMapUv),b.push(S.iridescenceMapUv),b.push(S.iridescenceThicknessMapUv),b.push(S.sheenColorMapUv),b.push(S.sheenRoughnessMapUv),b.push(S.specularMapUv),b.push(S.specularColorMapUv),b.push(S.specularIntensityMapUv),b.push(S.transmissionMapUv),b.push(S.thicknessMapUv),b.push(S.combine),b.push(S.fogExp2),b.push(S.sizeAttenuation),b.push(S.morphTargetsCount),b.push(S.morphAttributeCount),b.push(S.numDirLights),b.push(S.numPointLights),b.push(S.numSpotLights),b.push(S.numSpotLightMaps),b.push(S.numHemiLights),b.push(S.numRectAreaLights),b.push(S.numDirLightShadows),b.push(S.numPointLightShadows),b.push(S.numSpotLightShadows),b.push(S.numSpotLightShadowsWithMaps),b.push(S.numLightProbes),b.push(S.shadowMapType),b.push(S.toneMapping),b.push(S.numClippingPlanes),b.push(S.numClipIntersection),b.push(S.depthPacking)}function A(b,S){o.disableAll(),S.supportsVertexTextures&&o.enable(0),S.instancing&&o.enable(1),S.instancingColor&&o.enable(2),S.instancingMorph&&o.enable(3),S.matcap&&o.enable(4),S.envMap&&o.enable(5),S.normalMapObjectSpace&&o.enable(6),S.normalMapTangentSpace&&o.enable(7),S.clearcoat&&o.enable(8),S.iridescence&&o.enable(9),S.alphaTest&&o.enable(10),S.vertexColors&&o.enable(11),S.vertexAlphas&&o.enable(12),S.vertexUv1s&&o.enable(13),S.vertexUv2s&&o.enable(14),S.vertexUv3s&&o.enable(15),S.vertexTangents&&o.enable(16),S.anisotropy&&o.enable(17),S.alphaHash&&o.enable(18),S.batching&&o.enable(19),S.dispersion&&o.enable(20),S.batchingColor&&o.enable(21),b.push(o.mask),o.disableAll(),S.fog&&o.enable(0),S.useFog&&o.enable(1),S.flatShading&&o.enable(2),S.logarithmicDepthBuffer&&o.enable(3),S.reverseDepthBuffer&&o.enable(4),S.skinning&&o.enable(5),S.morphTargets&&o.enable(6),S.morphNormals&&o.enable(7),S.morphColors&&o.enable(8),S.premultipliedAlpha&&o.enable(9),S.shadowMapEnabled&&o.enable(10),S.doubleSided&&o.enable(11),S.flipSided&&o.enable(12),S.useDepthPacking&&o.enable(13),S.dithering&&o.enable(14),S.transmission&&o.enable(15),S.sheen&&o.enable(16),S.opaque&&o.enable(17),S.pointsUvs&&o.enable(18),S.decodeVideoTexture&&o.enable(19),S.decodeVideoTextureEmissive&&o.enable(20),S.alphaToCoverage&&o.enable(21),b.push(o.mask)}function y(b){let S=g[b.type],D;if(S){let N=Ui[S];D=pp.clone(N.uniforms)}else D=b.uniforms;return D}function T(b,S){let D;for(let N=0,U=h.length;N<U;N++){let B=h[N];if(B.cacheKey===S){D=B,++D.usedTimes;break}}return D===void 0&&(D=new K1(i,S,b,r),h.push(D)),D}function M(b){if(--b.usedTimes==0){let S=h.indexOf(b);h[S]=h[h.length-1],h.pop(),b.destroy()}}function C(b){l.remove(b)}function R(){l.dispose()}return{getParameters:m,getProgramCacheKey:f,getUniforms:y,acquireProgram:T,releaseProgram:M,releaseShaderCache:C,programs:h,dispose:R}}function eS(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,l){i.get(a)[o]=l}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function tS(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function Sm(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function bm(){let i=[],e=0,t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(u,d,p,g,v,m){let f=i[e];return f===void 0?(f={id:u.id,object:u,geometry:d,material:p,groupOrder:g,renderOrder:u.renderOrder,z:v,group:m},i[e]=f):(f.id=u.id,f.object=u,f.geometry=d,f.material=p,f.groupOrder=g,f.renderOrder=u.renderOrder,f.z=v,f.group=m),e++,f}function o(u,d,p,g,v,m){let f=a(u,d,p,g,v,m);p.transmission>0?n.push(f):p.transparent===!0?s.push(f):t.push(f)}function l(u,d,p,g,v,m){let f=a(u,d,p,g,v,m);p.transmission>0?n.unshift(f):p.transparent===!0?s.unshift(f):t.unshift(f)}function c(u,d){t.length>1&&t.sort(u||tS),n.length>1&&n.sort(d||Sm),s.length>1&&s.sort(d||Sm)}function h(){for(let u=e,d=i.length;u<d;u++){let p=i[u];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:o,unshift:l,finish:h,sort:c}}function nS(){let i=new WeakMap;function e(n,s){let r=i.get(n),a;return r===void 0?(a=new bm,i.set(n,[a])):s>=r.length?(a=new bm,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function iS(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new O,color:new Ae};break;case"SpotLight":t={position:new O,direction:new O,color:new Ae,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new O,color:new Ae,distance:0,decay:0};break;case"HemisphereLight":t={direction:new O,skyColor:new Ae,groundColor:new Ae};break;case"RectAreaLight":t={color:new Ae,position:new O,halfWidth:new O,halfHeight:new O};break}return i[e.id]=t,t}}}function sS(){let i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Pe};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Pe};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Pe,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}var rS=0;function aS(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function oS(i){let e=new iS,t=sS(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new O);let s=new O,r=new Ze,a=new Ze;function o(c){let h=0,u=0,d=0;for(let b=0;b<9;b++)n.probe[b].set(0,0,0);let p=0,g=0,v=0,m=0,f=0,x=0,A=0,y=0,T=0,M=0,C=0;c.sort(aS);for(let b=0,S=c.length;b<S;b++){let D=c[b],N=D.color,U=D.intensity,B=D.distance,W=D.shadow&&D.shadow.map?D.shadow.map.texture:null;if(D.isAmbientLight)h+=N.r*U,u+=N.g*U,d+=N.b*U;else if(D.isLightProbe){for(let G=0;G<9;G++)n.probe[G].addScaledVector(D.sh.coefficients[G],U);C++}else if(D.isDirectionalLight){let G=e.get(D);if(G.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){let I=D.shadow,P=t.get(D);P.shadowIntensity=I.intensity,P.shadowBias=I.bias,P.shadowNormalBias=I.normalBias,P.shadowRadius=I.radius,P.shadowMapSize=I.mapSize,n.directionalShadow[p]=P,n.directionalShadowMap[p]=W,n.directionalShadowMatrix[p]=D.shadow.matrix,x++}n.directional[p]=G,p++}else if(D.isSpotLight){let G=e.get(D);G.position.setFromMatrixPosition(D.matrixWorld),G.color.copy(N).multiplyScalar(U),G.distance=B,G.coneCos=Math.cos(D.angle),G.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),G.decay=D.decay,n.spot[v]=G;let I=D.shadow;if(D.map&&(n.spotLightMap[T]=D.map,T++,I.updateMatrices(D),D.castShadow&&M++),n.spotLightMatrix[v]=I.matrix,D.castShadow){let P=t.get(D);P.shadowIntensity=I.intensity,P.shadowBias=I.bias,P.shadowNormalBias=I.normalBias,P.shadowRadius=I.radius,P.shadowMapSize=I.mapSize,n.spotShadow[v]=P,n.spotShadowMap[v]=W,y++}v++}else if(D.isRectAreaLight){let G=e.get(D);G.color.copy(N).multiplyScalar(U),G.halfWidth.set(D.width*.5,0,0),G.halfHeight.set(0,D.height*.5,0),n.rectArea[m]=G,m++}else if(D.isPointLight){let G=e.get(D);if(G.color.copy(D.color).multiplyScalar(D.intensity),G.distance=D.distance,G.decay=D.decay,D.castShadow){let I=D.shadow,P=t.get(D);P.shadowIntensity=I.intensity,P.shadowBias=I.bias,P.shadowNormalBias=I.normalBias,P.shadowRadius=I.radius,P.shadowMapSize=I.mapSize,P.shadowCameraNear=I.camera.near,P.shadowCameraFar=I.camera.far,n.pointShadow[g]=P,n.pointShadowMap[g]=W,n.pointShadowMatrix[g]=D.shadow.matrix,A++}n.point[g]=G,g++}else if(D.isHemisphereLight){let G=e.get(D);G.skyColor.copy(D.color).multiplyScalar(U),G.groundColor.copy(D.groundColor).multiplyScalar(U),n.hemi[f]=G,f++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=_e.LTC_FLOAT_1,n.rectAreaLTC2=_e.LTC_FLOAT_2):(n.rectAreaLTC1=_e.LTC_HALF_1,n.rectAreaLTC2=_e.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;let R=n.hash;(R.directionalLength!==p||R.pointLength!==g||R.spotLength!==v||R.rectAreaLength!==m||R.hemiLength!==f||R.numDirectionalShadows!==x||R.numPointShadows!==A||R.numSpotShadows!==y||R.numSpotMaps!==T||R.numLightProbes!==C)&&(n.directional.length=p,n.spot.length=v,n.rectArea.length=m,n.point.length=g,n.hemi.length=f,n.directionalShadow.length=x,n.directionalShadowMap.length=x,n.pointShadow.length=A,n.pointShadowMap.length=A,n.spotShadow.length=y,n.spotShadowMap.length=y,n.directionalShadowMatrix.length=x,n.pointShadowMatrix.length=A,n.spotLightMatrix.length=y+T-M,n.spotLightMap.length=T,n.numSpotLightShadowsWithMaps=M,n.numLightProbes=C,R.directionalLength=p,R.pointLength=g,R.spotLength=v,R.rectAreaLength=m,R.hemiLength=f,R.numDirectionalShadows=x,R.numPointShadows=A,R.numSpotShadows=y,R.numSpotMaps=T,R.numLightProbes=C,n.version=rS++)}function l(c,h){let u=0,d=0,p=0,g=0,v=0,m=h.matrixWorldInverse;for(let f=0,x=c.length;f<x;f++){let A=c[f];if(A.isDirectionalLight){let y=n.directional[u];y.direction.setFromMatrixPosition(A.matrixWorld),s.setFromMatrixPosition(A.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(m),u++}else if(A.isSpotLight){let y=n.spot[p];y.position.setFromMatrixPosition(A.matrixWorld),y.position.applyMatrix4(m),y.direction.setFromMatrixPosition(A.matrixWorld),s.setFromMatrixPosition(A.target.matrixWorld),y.direction.sub(s),y.direction.transformDirection(m),p++}else if(A.isRectAreaLight){let y=n.rectArea[g];y.position.setFromMatrixPosition(A.matrixWorld),y.position.applyMatrix4(m),a.identity(),r.copy(A.matrixWorld),r.premultiply(m),a.extractRotation(r),y.halfWidth.set(A.width*.5,0,0),y.halfHeight.set(0,A.height*.5,0),y.halfWidth.applyMatrix4(a),y.halfHeight.applyMatrix4(a),g++}else if(A.isPointLight){let y=n.point[d];y.position.setFromMatrixPosition(A.matrixWorld),y.position.applyMatrix4(m),d++}else if(A.isHemisphereLight){let y=n.hemi[v];y.direction.setFromMatrixPosition(A.matrixWorld),y.direction.transformDirection(m),v++}}}return{setup:o,setupView:l,state:n}}function Em(i){let e=new oS(i),t=[],n=[];function s(h){c.camera=h,t.length=0,n.length=0}function r(h){t.push(h)}function a(h){n.push(h)}function o(){e.setup(t)}function l(h){e.setupView(t,h)}let c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:o,setupLightsView:l,pushLight:r,pushShadow:a}}function lS(i){let e=new WeakMap;function t(s,r=0){let a=e.get(s),o;return a===void 0?(o=new Em(i),e.set(s,[o])):r>=a.length?(o=new Em(i),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}var cS=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,hS=`uniform sampler2D shadow_pass;
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
}`;function uS(i,e,t){let n=new ja,s=new Pe,r=new Pe,a=new yt,o=new nu({depthPacking:yh}),l=new iu,c={},h=t.maxTextureSize,u={[Hn]:an,[an]:Hn,[vn]:vn},d=new Nt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Pe},radius:{value:4}},vertexShader:cS,fragmentShader:hS}),p=d.clone();p.defines.HORIZONTAL_PASS=1;let g=new Yt;g.setAttribute("position",new Gt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let v=new Qt(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=$c;let f=this.type;this.render=function(M,C,R){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||M.length===0)return;let b=i.getRenderTarget(),S=i.getActiveCubeFace(),D=i.getActiveMipmapLevel(),N=i.state;N.setBlending($t),N.buffers.color.setClear(1,1,1,1),N.buffers.depth.setTest(!0),N.setScissorTest(!1);let U=f!==Ii&&this.type===Ii,B=f===Ii&&this.type!==Ii;for(let W=0,G=M.length;W<G;W++){let I=M[W],P=I.shadow;if(P===void 0){console.warn("THREE.WebGLShadowMap:",I,"has no shadow.");continue}if(P.autoUpdate===!1&&P.needsUpdate===!1)continue;s.copy(P.mapSize);let L=P.getFrameExtents();if(s.multiply(L),r.copy(P.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/L.x),s.x=r.x*L.x,P.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/L.y),s.y=r.y*L.y,P.mapSize.y=r.y)),P.map===null||U===!0||B===!0){let ae=this.type!==Ii?{minFilter:xn,magFilter:xn}:{};P.map!==null&&P.map.dispose(),P.map=new Ht(s.x,s.y,ae),P.map.texture.name=I.name+".shadowMap",P.camera.updateProjectionMatrix()}i.setRenderTarget(P.map),i.clear();let J=P.getViewportCount();for(let ae=0;ae<J;ae++){let ve=P.getViewport(ae);a.set(r.x*ve.x,r.y*ve.y,r.x*ve.z,r.y*ve.w),N.viewport(a),P.updateMatrices(I,ae),n=P.getFrustum(),y(C,R,P.camera,I,this.type)}P.isPointLightShadow!==!0&&this.type===Ii&&x(P,R),P.needsUpdate=!1}f=this.type,m.needsUpdate=!1,i.setRenderTarget(b,S,D)};function x(M,C){let R=e.update(v);d.defines.VSM_SAMPLES!==M.blurSamples&&(d.defines.VSM_SAMPLES=M.blurSamples,p.defines.VSM_SAMPLES=M.blurSamples,d.needsUpdate=!0,p.needsUpdate=!0),M.mapPass===null&&(M.mapPass=new Ht(s.x,s.y)),d.uniforms.shadow_pass.value=M.map.texture,d.uniforms.resolution.value=M.mapSize,d.uniforms.radius.value=M.radius,i.setRenderTarget(M.mapPass),i.clear(),i.renderBufferDirect(C,null,R,d,v,null),p.uniforms.shadow_pass.value=M.mapPass.texture,p.uniforms.resolution.value=M.mapSize,p.uniforms.radius.value=M.radius,i.setRenderTarget(M.map),i.clear(),i.renderBufferDirect(C,null,R,p,v,null)}function A(M,C,R,b){let S=null,D=R.isPointLight===!0?M.customDistanceMaterial:M.customDepthMaterial;if(D!==void 0)S=D;else if(S=R.isPointLight===!0?l:o,i.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0){let N=S.uuid,U=C.uuid,B=c[N];B===void 0&&(B={},c[N]=B);let W=B[U];W===void 0&&(W=S.clone(),B[U]=W,C.addEventListener("dispose",T)),S=W}if(S.visible=C.visible,S.wireframe=C.wireframe,b===Ii?S.side=C.shadowSide!==null?C.shadowSide:C.side:S.side=C.shadowSide!==null?C.shadowSide:u[C.side],S.alphaMap=C.alphaMap,S.alphaTest=C.alphaTest,S.map=C.map,S.clipShadows=C.clipShadows,S.clippingPlanes=C.clippingPlanes,S.clipIntersection=C.clipIntersection,S.displacementMap=C.displacementMap,S.displacementScale=C.displacementScale,S.displacementBias=C.displacementBias,S.wireframeLinewidth=C.wireframeLinewidth,S.linewidth=C.linewidth,R.isPointLight===!0&&S.isMeshDistanceMaterial===!0){let N=i.properties.get(S);N.light=R}return S}function y(M,C,R,b,S){if(M.visible===!1)return;if(M.layers.test(C.layers)&&(M.isMesh||M.isLine||M.isPoints)&&(M.castShadow||M.receiveShadow&&S===Ii)&&(!M.frustumCulled||n.intersectsObject(M))){M.modelViewMatrix.multiplyMatrices(R.matrixWorldInverse,M.matrixWorld);let U=e.update(M),B=M.material;if(Array.isArray(B)){let W=U.groups;for(let G=0,I=W.length;G<I;G++){let P=W[G],L=B[P.materialIndex];if(L&&L.visible){let J=A(M,L,b,S);M.onBeforeShadow(i,M,C,R,U,J,P),i.renderBufferDirect(R,null,U,J,M,P),M.onAfterShadow(i,M,C,R,U,J,P)}}}else if(B.visible){let W=A(M,B,b,S);M.onBeforeShadow(i,M,C,R,U,W,null),i.renderBufferDirect(R,null,U,W,M,null),M.onAfterShadow(i,M,C,R,U,W,null)}}let N=M.children;for(let U=0,B=N.length;U<B;U++)y(N[U],C,R,b,S)}function T(M){M.target.removeEventListener("dispose",T);for(let R in c){let b=c[R],S=M.target.uuid;S in b&&(b[S].dispose(),delete b[S])}}}var dS={[Mo]:wo,[Co]:Po,[Ro]:Io,[qs]:Do,[wo]:Mo,[Po]:Co,[Io]:Ro,[Do]:qs};function fS(i,e){function t(){let k=!1,ce=new yt,ee=null,he=new yt(0,0,0,0);return{setMask:function(Me){ee!==Me&&!k&&(i.colorMask(Me,Me,Me,Me),ee=Me)},setLocked:function(Me){k=Me},setClear:function(Me,be,et,Bt,dn){dn===!0&&(Me*=Bt,be*=Bt,et*=Bt),ce.set(Me,be,et,Bt),he.equals(ce)===!1&&(i.clearColor(Me,be,et,Bt),he.copy(ce))},reset:function(){k=!1,ee=null,he.set(-1,0,0,0)}}}function n(){let k=!1,ce=!1,ee=null,he=null,Me=null;return{setReversed:function(be){if(ce!==be){let et=e.get("EXT_clip_control");ce?et.clipControlEXT(et.LOWER_LEFT_EXT,et.ZERO_TO_ONE_EXT):et.clipControlEXT(et.LOWER_LEFT_EXT,et.NEGATIVE_ONE_TO_ONE_EXT);let Bt=Me;Me=null,this.setClear(Bt)}ce=be},getReversed:function(){return ce},setTest:function(be){be?ue(i.DEPTH_TEST):Ie(i.DEPTH_TEST)},setMask:function(be){ee!==be&&!k&&(i.depthMask(be),ee=be)},setFunc:function(be){if(ce&&(be=dS[be]),he!==be){switch(be){case Mo:i.depthFunc(i.NEVER);break;case wo:i.depthFunc(i.ALWAYS);break;case Co:i.depthFunc(i.LESS);break;case qs:i.depthFunc(i.LEQUAL);break;case Ro:i.depthFunc(i.EQUAL);break;case Do:i.depthFunc(i.GEQUAL);break;case Po:i.depthFunc(i.GREATER);break;case Io:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}he=be}},setLocked:function(be){k=be},setClear:function(be){Me!==be&&(ce&&(be=1-be),i.clearDepth(be),Me=be)},reset:function(){k=!1,ee=null,he=null,Me=null,ce=!1}}}function s(){let k=!1,ce=null,ee=null,he=null,Me=null,be=null,et=null,Bt=null,dn=null;return{setTest:function(bt){k||(bt?ue(i.STENCIL_TEST):Ie(i.STENCIL_TEST))},setMask:function(bt){ce!==bt&&!k&&(i.stencilMask(bt),ce=bt)},setFunc:function(bt,En,Tn){(ee!==bt||he!==En||Me!==Tn)&&(i.stencilFunc(bt,En,Tn),ee=bt,he=En,Me=Tn)},setOp:function(bt,En,Tn){(be!==bt||et!==En||Bt!==Tn)&&(i.stencilOp(bt,En,Tn),be=bt,et=En,Bt=Tn)},setLocked:function(bt){k=bt},setClear:function(bt){dn!==bt&&(i.clearStencil(bt),dn=bt)},reset:function(){k=!1,ce=null,ee=null,he=null,Me=null,be=null,et=null,Bt=null,dn=null}}}let r=new t,a=new n,o=new s,l=new WeakMap,c=new WeakMap,h={},u={},d=new WeakMap,p=[],g=null,v=!1,m=null,f=null,x=null,A=null,y=null,T=null,M=null,C=new Ae(0,0,0),R=0,b=!1,S=null,D=null,N=null,U=null,B=null,W=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS),G=!1,I=0,P=i.getParameter(i.VERSION);P.indexOf("WebGL")!==-1?(I=parseFloat(/^WebGL (\d)/.exec(P)[1]),G=I>=1):P.indexOf("OpenGL ES")!==-1&&(I=parseFloat(/^OpenGL ES (\d)/.exec(P)[1]),G=I>=2);let L=null,J={},ae=i.getParameter(i.SCISSOR_BOX),ve=i.getParameter(i.VIEWPORT),le=new yt().fromArray(ae),V=new yt().fromArray(ve);function j(k,ce,ee,he){let Me=new Uint8Array(4),be=i.createTexture();i.bindTexture(k,be),i.texParameteri(k,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(k,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let et=0;et<ee;et++)k===i.TEXTURE_3D||k===i.TEXTURE_2D_ARRAY?i.texImage3D(ce,0,i.RGBA,1,1,he,0,i.RGBA,i.UNSIGNED_BYTE,Me):i.texImage2D(ce+et,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,Me);return be}let ie={};ie[i.TEXTURE_2D]=j(i.TEXTURE_2D,i.TEXTURE_2D,1),ie[i.TEXTURE_CUBE_MAP]=j(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),ie[i.TEXTURE_2D_ARRAY]=j(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),ie[i.TEXTURE_3D]=j(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),ue(i.DEPTH_TEST),a.setFunc(qs),Be(!1),qe(Jc),ue(i.CULL_FACE),F($t);function ue(k){h[k]!==!0&&(i.enable(k),h[k]=!0)}function Ie(k){h[k]!==!1&&(i.disable(k),h[k]=!1)}function De(k,ce){return u[k]!==ce?(i.bindFramebuffer(k,ce),u[k]=ce,k===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=ce),k===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=ce),!0):!1}function He(k,ce){let ee=p,he=!1;if(k){ee=d.get(ce),ee===void 0&&(ee=[],d.set(ce,ee));let Me=k.textures;if(ee.length!==Me.length||ee[0]!==i.COLOR_ATTACHMENT0){for(let be=0,et=Me.length;be<et;be++)ee[be]=i.COLOR_ATTACHMENT0+be;ee.length=Me.length,he=!0}}else ee[0]!==i.BACK&&(ee[0]=i.BACK,he=!0);he&&i.drawBuffers(ee)}function $e(k){return g!==k?(i.useProgram(k),g=k,!0):!1}let We={[vs]:i.FUNC_ADD,[uf]:i.FUNC_SUBTRACT,[df]:i.FUNC_REVERSE_SUBTRACT};We[ff]=i.MIN,We[pf]=i.MAX;let Je={[mf]:i.ZERO,[gf]:i.ONE,[vf]:i.SRC_COLOR,[Eo]:i.SRC_ALPHA,[bf]:i.SRC_ALPHA_SATURATE,[_f]:i.DST_COLOR,[yf]:i.DST_ALPHA,[xf]:i.ONE_MINUS_SRC_COLOR,[To]:i.ONE_MINUS_SRC_ALPHA,[Sf]:i.ONE_MINUS_DST_COLOR,[Af]:i.ONE_MINUS_DST_ALPHA,[Ef]:i.CONSTANT_COLOR,[Tf]:i.ONE_MINUS_CONSTANT_COLOR,[Mf]:i.CONSTANT_ALPHA,[wf]:i.ONE_MINUS_CONSTANT_ALPHA};function F(k,ce,ee,he,Me,be,et,Bt,dn,bt){if(k===$t){v===!0&&(Ie(i.BLEND),v=!1);return}if(v===!1&&(ue(i.BLEND),v=!0),k!==hf){if(k!==m||bt!==b){if((f!==vs||y!==vs)&&(i.blendEquation(i.FUNC_ADD),f=vs,y=vs),bt)switch(k){case Qs:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case eh:i.blendFunc(i.ONE,i.ONE);break;case th:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case nh:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",k);break}else switch(k){case Qs:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case eh:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case th:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case nh:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",k);break}x=null,A=null,T=null,M=null,C.set(0,0,0),R=0,m=k,b=bt}return}Me=Me||ce,be=be||ee,et=et||he,(ce!==f||Me!==y)&&(i.blendEquationSeparate(We[ce],We[Me]),f=ce,y=Me),(ee!==x||he!==A||be!==T||et!==M)&&(i.blendFuncSeparate(Je[ee],Je[he],Je[be],Je[et]),x=ee,A=he,T=be,M=et),(Bt.equals(C)===!1||dn!==R)&&(i.blendColor(Bt.r,Bt.g,Bt.b,dn),C.copy(Bt),R=dn),m=k,b=!1}function Dt(k,ce){k.side===vn?Ie(i.CULL_FACE):ue(i.CULL_FACE);let ee=k.side===an;ce&&(ee=!ee),Be(ee),k.blending===Qs&&k.transparent===!1?F($t):F(k.blending,k.blendEquation,k.blendSrc,k.blendDst,k.blendEquationAlpha,k.blendSrcAlpha,k.blendDstAlpha,k.blendColor,k.blendAlpha,k.premultipliedAlpha),a.setFunc(k.depthFunc),a.setTest(k.depthTest),a.setMask(k.depthWrite),r.setMask(k.colorWrite);let he=k.stencilWrite;o.setTest(he),he&&(o.setMask(k.stencilWriteMask),o.setFunc(k.stencilFunc,k.stencilRef,k.stencilFuncMask),o.setOp(k.stencilFail,k.stencilZFail,k.stencilZPass)),pe(k.polygonOffset,k.polygonOffsetFactor,k.polygonOffsetUnits),k.alphaToCoverage===!0?ue(i.SAMPLE_ALPHA_TO_COVERAGE):Ie(i.SAMPLE_ALPHA_TO_COVERAGE)}function Be(k){S!==k&&(k?i.frontFace(i.CW):i.frontFace(i.CCW),S=k)}function qe(k){k!==of?(ue(i.CULL_FACE),k!==D&&(k===Jc?i.cullFace(i.BACK):k===lf?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Ie(i.CULL_FACE),D=k}function Le(k){k!==N&&(G&&i.lineWidth(k),N=k)}function pe(k,ce,ee){k?(ue(i.POLYGON_OFFSET_FILL),(U!==ce||B!==ee)&&(i.polygonOffset(ce,ee),U=ce,B=ee)):Ie(i.POLYGON_OFFSET_FILL)}function xe(k){k?ue(i.SCISSOR_TEST):Ie(i.SCISSOR_TEST)}function w(k){k===void 0&&(k=i.TEXTURE0+W-1),L!==k&&(i.activeTexture(k),L=k)}function _(k,ce,ee){ee===void 0&&(L===null?ee=i.TEXTURE0+W-1:ee=L);let he=J[ee];he===void 0&&(he={type:void 0,texture:void 0},J[ee]=he),(he.type!==k||he.texture!==ce)&&(L!==ee&&(i.activeTexture(ee),L=ee),i.bindTexture(k,ce||ie[k]),he.type=k,he.texture=ce)}function Y(){let k=J[L];k!==void 0&&k.type!==void 0&&(i.bindTexture(k.type,null),k.type=void 0,k.texture=void 0)}function $(){try{i.compressedTexImage2D.apply(i,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function se(){try{i.compressedTexImage3D.apply(i,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function te(){try{i.texSubImage2D.apply(i,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Z(){try{i.texSubImage3D.apply(i,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function K(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function oe(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Te(){try{i.texStorage2D.apply(i,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function re(){try{i.texStorage3D.apply(i,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function ge(){try{i.texImage2D.apply(i,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Fe(){try{i.texImage3D.apply(i,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Qe(k){le.equals(k)===!1&&(i.scissor(k.x,k.y,k.z,k.w),le.copy(k))}function we(k){V.equals(k)===!1&&(i.viewport(k.x,k.y,k.z,k.w),V.copy(k))}function Ue(k,ce){let ee=c.get(ce);ee===void 0&&(ee=new WeakMap,c.set(ce,ee));let he=ee.get(k);he===void 0&&(he=i.getUniformBlockIndex(ce,k.name),ee.set(k,he))}function Ge(k,ce){let he=c.get(ce).get(k);l.get(ce)!==he&&(i.uniformBlockBinding(ce,he,k.__bindingPointIndex),l.set(ce,he))}function Pt(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),h={},L=null,J={},u={},d=new WeakMap,p=[],g=null,v=!1,m=null,f=null,x=null,A=null,y=null,T=null,M=null,C=new Ae(0,0,0),R=0,b=!1,S=null,D=null,N=null,U=null,B=null,le.set(0,0,i.canvas.width,i.canvas.height),V.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:ue,disable:Ie,bindFramebuffer:De,drawBuffers:He,useProgram:$e,setBlending:F,setMaterial:Dt,setFlipSided:Be,setCullFace:qe,setLineWidth:Le,setPolygonOffset:pe,setScissorTest:xe,activeTexture:w,bindTexture:_,unbindTexture:Y,compressedTexImage2D:$,compressedTexImage3D:se,texImage2D:ge,texImage3D:Fe,updateUBOMapping:Ue,uniformBlockBinding:Ge,texStorage2D:Te,texStorage3D:re,texSubImage2D:te,texSubImage3D:Z,compressedTexSubImage2D:K,compressedTexSubImage3D:oe,scissor:Qe,viewport:we,reset:Pt}}function pS(i,e,t,n,s,r,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator=="undefined"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Pe,h=new WeakMap,u,d=new WeakMap,p=!1;try{p=typeof OffscreenCanvas!="undefined"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(w,_){return p?new OffscreenCanvas(w,_):kr("canvas")}function v(w,_,Y){let $=1,se=xe(w);if((se.width>Y||se.height>Y)&&($=Y/Math.max(se.width,se.height)),$<1)if(typeof HTMLImageElement!="undefined"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement!="undefined"&&w instanceof HTMLCanvasElement||typeof ImageBitmap!="undefined"&&w instanceof ImageBitmap||typeof VideoFrame!="undefined"&&w instanceof VideoFrame){let te=Math.floor($*se.width),Z=Math.floor($*se.height);u===void 0&&(u=g(te,Z));let K=_?g(te,Z):u;return K.width=te,K.height=Z,K.getContext("2d").drawImage(w,0,0,te,Z),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+se.width+"x"+se.height+") to ("+te+"x"+Z+")."),K}else return"data"in w&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+se.width+"x"+se.height+")."),w;return w}function m(w){return w.generateMipmaps}function f(w){i.generateMipmap(w)}function x(w){return w.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:w.isWebGL3DRenderTarget?i.TEXTURE_3D:w.isWebGLArrayRenderTarget||w.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function A(w,_,Y,$,se=!1){if(w!==null){if(i[w]!==void 0)return i[w];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+"'")}let te=_;if(_===i.RED&&(Y===i.FLOAT&&(te=i.R32F),Y===i.HALF_FLOAT&&(te=i.R16F),Y===i.UNSIGNED_BYTE&&(te=i.R8)),_===i.RED_INTEGER&&(Y===i.UNSIGNED_BYTE&&(te=i.R8UI),Y===i.UNSIGNED_SHORT&&(te=i.R16UI),Y===i.UNSIGNED_INT&&(te=i.R32UI),Y===i.BYTE&&(te=i.R8I),Y===i.SHORT&&(te=i.R16I),Y===i.INT&&(te=i.R32I)),_===i.RG&&(Y===i.FLOAT&&(te=i.RG32F),Y===i.HALF_FLOAT&&(te=i.RG16F),Y===i.UNSIGNED_BYTE&&(te=i.RG8)),_===i.RG_INTEGER&&(Y===i.UNSIGNED_BYTE&&(te=i.RG8UI),Y===i.UNSIGNED_SHORT&&(te=i.RG16UI),Y===i.UNSIGNED_INT&&(te=i.RG32UI),Y===i.BYTE&&(te=i.RG8I),Y===i.SHORT&&(te=i.RG16I),Y===i.INT&&(te=i.RG32I)),_===i.RGB_INTEGER&&(Y===i.UNSIGNED_BYTE&&(te=i.RGB8UI),Y===i.UNSIGNED_SHORT&&(te=i.RGB16UI),Y===i.UNSIGNED_INT&&(te=i.RGB32UI),Y===i.BYTE&&(te=i.RGB8I),Y===i.SHORT&&(te=i.RGB16I),Y===i.INT&&(te=i.RGB32I)),_===i.RGBA_INTEGER&&(Y===i.UNSIGNED_BYTE&&(te=i.RGBA8UI),Y===i.UNSIGNED_SHORT&&(te=i.RGBA16UI),Y===i.UNSIGNED_INT&&(te=i.RGBA32UI),Y===i.BYTE&&(te=i.RGBA8I),Y===i.SHORT&&(te=i.RGBA16I),Y===i.INT&&(te=i.RGBA32I)),_===i.RGB&&Y===i.UNSIGNED_INT_5_9_9_9_REV&&(te=i.RGB9_E5),_===i.RGBA){let Z=se?Na:mt.getTransfer($);Y===i.FLOAT&&(te=i.RGBA32F),Y===i.HALF_FLOAT&&(te=i.RGBA16F),Y===i.UNSIGNED_BYTE&&(te=Z===Ft?i.SRGB8_ALPHA8:i.RGBA8),Y===i.UNSIGNED_SHORT_4_4_4_4&&(te=i.RGBA4),Y===i.UNSIGNED_SHORT_5_5_5_1&&(te=i.RGB5_A1)}return(te===i.R16F||te===i.R32F||te===i.RG16F||te===i.RG32F||te===i.RGBA16F||te===i.RGBA32F)&&e.get("EXT_color_buffer_float"),te}function y(w,_){let Y;return w?_===null||_===Fi||_===Vi?Y=i.DEPTH24_STENCIL8:_===Gn?Y=i.DEPTH32F_STENCIL8:_===Nr&&(Y=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===Fi||_===Vi?Y=i.DEPTH_COMPONENT24:_===Gn?Y=i.DEPTH_COMPONENT32F:_===Nr&&(Y=i.DEPTH_COMPONENT16),Y}function T(w,_){return m(w)===!0||w.isFramebufferTexture&&w.minFilter!==xn&&w.minFilter!==en?Math.log2(Math.max(_.width,_.height))+1:w.mipmaps!==void 0&&w.mipmaps.length>0?w.mipmaps.length:w.isCompressedTexture&&Array.isArray(w.image)?_.mipmaps.length:1}function M(w){let _=w.target;_.removeEventListener("dispose",M),R(_),_.isVideoTexture&&h.delete(_)}function C(w){let _=w.target;_.removeEventListener("dispose",C),S(_)}function R(w){let _=n.get(w);if(_.__webglInit===void 0)return;let Y=w.source,$=d.get(Y);if($){let se=$[_.__cacheKey];se.usedTimes--,se.usedTimes===0&&b(w),Object.keys($).length===0&&d.delete(Y)}n.remove(w)}function b(w){let _=n.get(w);i.deleteTexture(_.__webglTexture);let Y=w.source,$=d.get(Y);delete $[_.__cacheKey],a.memory.textures--}function S(w){let _=n.get(w);if(w.depthTexture&&(w.depthTexture.dispose(),n.remove(w.depthTexture)),w.isWebGLCubeRenderTarget)for(let $=0;$<6;$++){if(Array.isArray(_.__webglFramebuffer[$]))for(let se=0;se<_.__webglFramebuffer[$].length;se++)i.deleteFramebuffer(_.__webglFramebuffer[$][se]);else i.deleteFramebuffer(_.__webglFramebuffer[$]);_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer[$])}else{if(Array.isArray(_.__webglFramebuffer))for(let $=0;$<_.__webglFramebuffer.length;$++)i.deleteFramebuffer(_.__webglFramebuffer[$]);else i.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&i.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&i.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let $=0;$<_.__webglColorRenderbuffer.length;$++)_.__webglColorRenderbuffer[$]&&i.deleteRenderbuffer(_.__webglColorRenderbuffer[$]);_.__webglDepthRenderbuffer&&i.deleteRenderbuffer(_.__webglDepthRenderbuffer)}let Y=w.textures;for(let $=0,se=Y.length;$<se;$++){let te=n.get(Y[$]);te.__webglTexture&&(i.deleteTexture(te.__webglTexture),a.memory.textures--),n.remove(Y[$])}n.remove(w)}let D=0;function N(){D=0}function U(){let w=D;return w>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+w+" texture units while this GPU supports only "+s.maxTextures),D+=1,w}function B(w){let _=[];return _.push(w.wrapS),_.push(w.wrapT),_.push(w.wrapR||0),_.push(w.magFilter),_.push(w.minFilter),_.push(w.anisotropy),_.push(w.internalFormat),_.push(w.format),_.push(w.type),_.push(w.generateMipmaps),_.push(w.premultiplyAlpha),_.push(w.flipY),_.push(w.unpackAlignment),_.push(w.colorSpace),_.join()}function W(w,_){let Y=n.get(w);if(w.isVideoTexture&&Le(w),w.isRenderTargetTexture===!1&&w.version>0&&Y.__version!==w.version){let $=w.image;if($===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if($.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{V(Y,w,_);return}}t.bindTexture(i.TEXTURE_2D,Y.__webglTexture,i.TEXTURE0+_)}function G(w,_){let Y=n.get(w);if(w.version>0&&Y.__version!==w.version){V(Y,w,_);return}t.bindTexture(i.TEXTURE_2D_ARRAY,Y.__webglTexture,i.TEXTURE0+_)}function I(w,_){let Y=n.get(w);if(w.version>0&&Y.__version!==w.version){V(Y,w,_);return}t.bindTexture(i.TEXTURE_3D,Y.__webglTexture,i.TEXTURE0+_)}function P(w,_){let Y=n.get(w);if(w.version>0&&Y.__version!==w.version){j(Y,w,_);return}t.bindTexture(i.TEXTURE_CUBE_MAP,Y.__webglTexture,i.TEXTURE0+_)}let L={[xs]:i.REPEAT,[Li]:i.CLAMP_TO_EDGE,[Fr]:i.MIRRORED_REPEAT},J={[xn]:i.NEAREST,[Uo]:i.NEAREST_MIPMAP_NEAREST,[Ks]:i.NEAREST_MIPMAP_LINEAR,[en]:i.LINEAR,[Ur]:i.LINEAR_MIPMAP_NEAREST,[gi]:i.LINEAR_MIPMAP_LINEAR},ae={[zf]:i.NEVER,[Yf]:i.ALWAYS,[Hf]:i.LESS,[_h]:i.LEQUAL,[Gf]:i.EQUAL,[Xf]:i.GEQUAL,[Vf]:i.GREATER,[Wf]:i.NOTEQUAL};function ve(w,_){if(_.type===Gn&&e.has("OES_texture_float_linear")===!1&&(_.magFilter===en||_.magFilter===Ur||_.magFilter===Ks||_.magFilter===gi||_.minFilter===en||_.minFilter===Ur||_.minFilter===Ks||_.minFilter===gi)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(w,i.TEXTURE_WRAP_S,L[_.wrapS]),i.texParameteri(w,i.TEXTURE_WRAP_T,L[_.wrapT]),(w===i.TEXTURE_3D||w===i.TEXTURE_2D_ARRAY)&&i.texParameteri(w,i.TEXTURE_WRAP_R,L[_.wrapR]),i.texParameteri(w,i.TEXTURE_MAG_FILTER,J[_.magFilter]),i.texParameteri(w,i.TEXTURE_MIN_FILTER,J[_.minFilter]),_.compareFunction&&(i.texParameteri(w,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(w,i.TEXTURE_COMPARE_FUNC,ae[_.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===xn||_.minFilter!==Ks&&_.minFilter!==gi||_.type===Gn&&e.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||n.get(_).__currentAnisotropy){let Y=e.get("EXT_texture_filter_anisotropic");i.texParameterf(w,Y.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,s.getMaxAnisotropy())),n.get(_).__currentAnisotropy=_.anisotropy}}}function le(w,_){let Y=!1;w.__webglInit===void 0&&(w.__webglInit=!0,_.addEventListener("dispose",M));let $=_.source,se=d.get($);se===void 0&&(se={},d.set($,se));let te=B(_);if(te!==w.__cacheKey){se[te]===void 0&&(se[te]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,Y=!0),se[te].usedTimes++;let Z=se[w.__cacheKey];Z!==void 0&&(se[w.__cacheKey].usedTimes--,Z.usedTimes===0&&b(_)),w.__cacheKey=te,w.__webglTexture=se[te].texture}return Y}function V(w,_,Y){let $=i.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&($=i.TEXTURE_2D_ARRAY),_.isData3DTexture&&($=i.TEXTURE_3D);let se=le(w,_),te=_.source;t.bindTexture($,w.__webglTexture,i.TEXTURE0+Y);let Z=n.get(te);if(te.version!==Z.__version||se===!0){t.activeTexture(i.TEXTURE0+Y);let K=mt.getPrimaries(mt.workingColorSpace),oe=_.colorSpace===Wn?null:mt.getPrimaries(_.colorSpace),Te=_.colorSpace===Wn||K===oe?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Te);let re=v(_.image,!1,s.maxTextureSize);re=pe(_,re);let ge=r.convert(_.format,_.colorSpace),Fe=r.convert(_.type),Qe=A(_.internalFormat,ge,Fe,_.colorSpace,_.isVideoTexture);ve($,_);let we,Ue=_.mipmaps,Ge=_.isVideoTexture!==!0,Pt=Z.__version===void 0||se===!0,k=te.dataReady,ce=T(_,re);if(_.isDepthTexture)Qe=y(_.format===Wi,_.type),Pt&&(Ge?t.texStorage2D(i.TEXTURE_2D,1,Qe,re.width,re.height):t.texImage2D(i.TEXTURE_2D,0,Qe,re.width,re.height,0,ge,Fe,null));else if(_.isDataTexture)if(Ue.length>0){Ge&&Pt&&t.texStorage2D(i.TEXTURE_2D,ce,Qe,Ue[0].width,Ue[0].height);for(let ee=0,he=Ue.length;ee<he;ee++)we=Ue[ee],Ge?k&&t.texSubImage2D(i.TEXTURE_2D,ee,0,0,we.width,we.height,ge,Fe,we.data):t.texImage2D(i.TEXTURE_2D,ee,Qe,we.width,we.height,0,ge,Fe,we.data);_.generateMipmaps=!1}else Ge?(Pt&&t.texStorage2D(i.TEXTURE_2D,ce,Qe,re.width,re.height),k&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,re.width,re.height,ge,Fe,re.data)):t.texImage2D(i.TEXTURE_2D,0,Qe,re.width,re.height,0,ge,Fe,re.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){Ge&&Pt&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ce,Qe,Ue[0].width,Ue[0].height,re.depth);for(let ee=0,he=Ue.length;ee<he;ee++)if(we=Ue[ee],_.format!==Vn)if(ge!==null)if(Ge){if(k)if(_.layerUpdates.size>0){let Me=mu(we.width,we.height,_.format,_.type);for(let be of _.layerUpdates){let et=we.data.subarray(be*Me/we.data.BYTES_PER_ELEMENT,(be+1)*Me/we.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ee,0,0,be,we.width,we.height,1,ge,et)}_.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ee,0,0,0,we.width,we.height,re.depth,ge,we.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ee,Qe,we.width,we.height,re.depth,0,we.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ge?k&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,ee,0,0,0,we.width,we.height,re.depth,ge,Fe,we.data):t.texImage3D(i.TEXTURE_2D_ARRAY,ee,Qe,we.width,we.height,re.depth,0,ge,Fe,we.data)}else{Ge&&Pt&&t.texStorage2D(i.TEXTURE_2D,ce,Qe,Ue[0].width,Ue[0].height);for(let ee=0,he=Ue.length;ee<he;ee++)we=Ue[ee],_.format!==Vn?ge!==null?Ge?k&&t.compressedTexSubImage2D(i.TEXTURE_2D,ee,0,0,we.width,we.height,ge,we.data):t.compressedTexImage2D(i.TEXTURE_2D,ee,Qe,we.width,we.height,0,we.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ge?k&&t.texSubImage2D(i.TEXTURE_2D,ee,0,0,we.width,we.height,ge,Fe,we.data):t.texImage2D(i.TEXTURE_2D,ee,Qe,we.width,we.height,0,ge,Fe,we.data)}else if(_.isDataArrayTexture)if(Ge){if(Pt&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ce,Qe,re.width,re.height,re.depth),k)if(_.layerUpdates.size>0){let ee=mu(re.width,re.height,_.format,_.type);for(let he of _.layerUpdates){let Me=re.data.subarray(he*ee/re.data.BYTES_PER_ELEMENT,(he+1)*ee/re.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,he,re.width,re.height,1,ge,Fe,Me)}_.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,re.width,re.height,re.depth,ge,Fe,re.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Qe,re.width,re.height,re.depth,0,ge,Fe,re.data);else if(_.isData3DTexture)Ge?(Pt&&t.texStorage3D(i.TEXTURE_3D,ce,Qe,re.width,re.height,re.depth),k&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,re.width,re.height,re.depth,ge,Fe,re.data)):t.texImage3D(i.TEXTURE_3D,0,Qe,re.width,re.height,re.depth,0,ge,Fe,re.data);else if(_.isFramebufferTexture){if(Pt)if(Ge)t.texStorage2D(i.TEXTURE_2D,ce,Qe,re.width,re.height);else{let ee=re.width,he=re.height;for(let Me=0;Me<ce;Me++)t.texImage2D(i.TEXTURE_2D,Me,Qe,ee,he,0,ge,Fe,null),ee>>=1,he>>=1}}else if(Ue.length>0){if(Ge&&Pt){let ee=xe(Ue[0]);t.texStorage2D(i.TEXTURE_2D,ce,Qe,ee.width,ee.height)}for(let ee=0,he=Ue.length;ee<he;ee++)we=Ue[ee],Ge?k&&t.texSubImage2D(i.TEXTURE_2D,ee,0,0,ge,Fe,we):t.texImage2D(i.TEXTURE_2D,ee,Qe,ge,Fe,we);_.generateMipmaps=!1}else if(Ge){if(Pt){let ee=xe(re);t.texStorage2D(i.TEXTURE_2D,ce,Qe,ee.width,ee.height)}k&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,ge,Fe,re)}else t.texImage2D(i.TEXTURE_2D,0,Qe,ge,Fe,re);m(_)&&f($),Z.__version=te.version,_.onUpdate&&_.onUpdate(_)}w.__version=_.version}function j(w,_,Y){if(_.image.length!==6)return;let $=le(w,_),se=_.source;t.bindTexture(i.TEXTURE_CUBE_MAP,w.__webglTexture,i.TEXTURE0+Y);let te=n.get(se);if(se.version!==te.__version||$===!0){t.activeTexture(i.TEXTURE0+Y);let Z=mt.getPrimaries(mt.workingColorSpace),K=_.colorSpace===Wn?null:mt.getPrimaries(_.colorSpace),oe=_.colorSpace===Wn||Z===K?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,_.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,_.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,oe);let Te=_.isCompressedTexture||_.image[0].isCompressedTexture,re=_.image[0]&&_.image[0].isDataTexture,ge=[];for(let he=0;he<6;he++)!Te&&!re?ge[he]=v(_.image[he],!0,s.maxCubemapSize):ge[he]=re?_.image[he].image:_.image[he],ge[he]=pe(_,ge[he]);let Fe=ge[0],Qe=r.convert(_.format,_.colorSpace),we=r.convert(_.type),Ue=A(_.internalFormat,Qe,we,_.colorSpace),Ge=_.isVideoTexture!==!0,Pt=te.__version===void 0||$===!0,k=se.dataReady,ce=T(_,Fe);ve(i.TEXTURE_CUBE_MAP,_);let ee;if(Te){Ge&&Pt&&t.texStorage2D(i.TEXTURE_CUBE_MAP,ce,Ue,Fe.width,Fe.height);for(let he=0;he<6;he++){ee=ge[he].mipmaps;for(let Me=0;Me<ee.length;Me++){let be=ee[Me];_.format!==Vn?Qe!==null?Ge?k&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+he,Me,0,0,be.width,be.height,Qe,be.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+he,Me,Ue,be.width,be.height,0,be.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ge?k&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+he,Me,0,0,be.width,be.height,Qe,we,be.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+he,Me,Ue,be.width,be.height,0,Qe,we,be.data)}}}else{if(ee=_.mipmaps,Ge&&Pt){ee.length>0&&ce++;let he=xe(ge[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,ce,Ue,he.width,he.height)}for(let he=0;he<6;he++)if(re){Ge?k&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+he,0,0,0,ge[he].width,ge[he].height,Qe,we,ge[he].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+he,0,Ue,ge[he].width,ge[he].height,0,Qe,we,ge[he].data);for(let Me=0;Me<ee.length;Me++){let et=ee[Me].image[he].image;Ge?k&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+he,Me+1,0,0,et.width,et.height,Qe,we,et.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+he,Me+1,Ue,et.width,et.height,0,Qe,we,et.data)}}else{Ge?k&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+he,0,0,0,Qe,we,ge[he]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+he,0,Ue,Qe,we,ge[he]);for(let Me=0;Me<ee.length;Me++){let be=ee[Me];Ge?k&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+he,Me+1,0,0,Qe,we,be.image[he]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+he,Me+1,Ue,Qe,we,be.image[he])}}}m(_)&&f(i.TEXTURE_CUBE_MAP),te.__version=se.version,_.onUpdate&&_.onUpdate(_)}w.__version=_.version}function ie(w,_,Y,$,se,te){let Z=r.convert(Y.format,Y.colorSpace),K=r.convert(Y.type),oe=A(Y.internalFormat,Z,K,Y.colorSpace),Te=n.get(_),re=n.get(Y);if(re.__renderTarget=_,!Te.__hasExternalTextures){let ge=Math.max(1,_.width>>te),Fe=Math.max(1,_.height>>te);se===i.TEXTURE_3D||se===i.TEXTURE_2D_ARRAY?t.texImage3D(se,te,oe,ge,Fe,_.depth,0,Z,K,null):t.texImage2D(se,te,oe,ge,Fe,0,Z,K,null)}t.bindFramebuffer(i.FRAMEBUFFER,w),qe(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,$,se,re.__webglTexture,0,Be(_)):(se===i.TEXTURE_2D||se>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&se<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,$,se,re.__webglTexture,te),t.bindFramebuffer(i.FRAMEBUFFER,null)}function ue(w,_,Y){if(i.bindRenderbuffer(i.RENDERBUFFER,w),_.depthBuffer){let $=_.depthTexture,se=$&&$.isDepthTexture?$.type:null,te=y(_.stencilBuffer,se),Z=_.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,K=Be(_);qe(_)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,K,te,_.width,_.height):Y?i.renderbufferStorageMultisample(i.RENDERBUFFER,K,te,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,te,_.width,_.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Z,i.RENDERBUFFER,w)}else{let $=_.textures;for(let se=0;se<$.length;se++){let te=$[se],Z=r.convert(te.format,te.colorSpace),K=r.convert(te.type),oe=A(te.internalFormat,Z,K,te.colorSpace),Te=Be(_);Y&&qe(_)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Te,oe,_.width,_.height):qe(_)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Te,oe,_.width,_.height):i.renderbufferStorage(i.RENDERBUFFER,oe,_.width,_.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Ie(w,_){if(_&&_.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,w),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let $=n.get(_.depthTexture);$.__renderTarget=_,(!$.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),W(_.depthTexture,0);let se=$.__webglTexture,te=Be(_);if(_.depthTexture.format===Js)qe(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,se,0,te):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,se,0);else if(_.depthTexture.format===Wi)qe(_)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,se,0,te):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,se,0);else throw new Error("Unknown depthTexture format")}function De(w){let _=n.get(w),Y=w.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==w.depthTexture){let $=w.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),$){let se=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,$.removeEventListener("dispose",se)};$.addEventListener("dispose",se),_.__depthDisposeCallback=se}_.__boundDepthTexture=$}if(w.depthTexture&&!_.__autoAllocateDepthBuffer){if(Y)throw new Error("target.depthTexture not supported in Cube render targets");Ie(_.__webglFramebuffer,w)}else if(Y){_.__webglDepthbuffer=[];for(let $=0;$<6;$++)if(t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer[$]),_.__webglDepthbuffer[$]===void 0)_.__webglDepthbuffer[$]=i.createRenderbuffer(),ue(_.__webglDepthbuffer[$],w,!1);else{let se=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,te=_.__webglDepthbuffer[$];i.bindRenderbuffer(i.RENDERBUFFER,te),i.framebufferRenderbuffer(i.FRAMEBUFFER,se,i.RENDERBUFFER,te)}}else if(t.bindFramebuffer(i.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=i.createRenderbuffer(),ue(_.__webglDepthbuffer,w,!1);else{let $=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,se=_.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,se),i.framebufferRenderbuffer(i.FRAMEBUFFER,$,i.RENDERBUFFER,se)}t.bindFramebuffer(i.FRAMEBUFFER,null)}function He(w,_,Y){let $=n.get(w);_!==void 0&&ie($.__webglFramebuffer,w,w.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),Y!==void 0&&De(w)}function $e(w){let _=w.texture,Y=n.get(w),$=n.get(_);w.addEventListener("dispose",C);let se=w.textures,te=w.isWebGLCubeRenderTarget===!0,Z=se.length>1;if(Z||($.__webglTexture===void 0&&($.__webglTexture=i.createTexture()),$.__version=_.version,a.memory.textures++),te){Y.__webglFramebuffer=[];for(let K=0;K<6;K++)if(_.mipmaps&&_.mipmaps.length>0){Y.__webglFramebuffer[K]=[];for(let oe=0;oe<_.mipmaps.length;oe++)Y.__webglFramebuffer[K][oe]=i.createFramebuffer()}else Y.__webglFramebuffer[K]=i.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){Y.__webglFramebuffer=[];for(let K=0;K<_.mipmaps.length;K++)Y.__webglFramebuffer[K]=i.createFramebuffer()}else Y.__webglFramebuffer=i.createFramebuffer();if(Z)for(let K=0,oe=se.length;K<oe;K++){let Te=n.get(se[K]);Te.__webglTexture===void 0&&(Te.__webglTexture=i.createTexture(),a.memory.textures++)}if(w.samples>0&&qe(w)===!1){Y.__webglMultisampledFramebuffer=i.createFramebuffer(),Y.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,Y.__webglMultisampledFramebuffer);for(let K=0;K<se.length;K++){let oe=se[K];Y.__webglColorRenderbuffer[K]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,Y.__webglColorRenderbuffer[K]);let Te=r.convert(oe.format,oe.colorSpace),re=r.convert(oe.type),ge=A(oe.internalFormat,Te,re,oe.colorSpace,w.isXRRenderTarget===!0),Fe=Be(w);i.renderbufferStorageMultisample(i.RENDERBUFFER,Fe,ge,w.width,w.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+K,i.RENDERBUFFER,Y.__webglColorRenderbuffer[K])}i.bindRenderbuffer(i.RENDERBUFFER,null),w.depthBuffer&&(Y.__webglDepthRenderbuffer=i.createRenderbuffer(),ue(Y.__webglDepthRenderbuffer,w,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(te){t.bindTexture(i.TEXTURE_CUBE_MAP,$.__webglTexture),ve(i.TEXTURE_CUBE_MAP,_);for(let K=0;K<6;K++)if(_.mipmaps&&_.mipmaps.length>0)for(let oe=0;oe<_.mipmaps.length;oe++)ie(Y.__webglFramebuffer[K][oe],w,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+K,oe);else ie(Y.__webglFramebuffer[K],w,_,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+K,0);m(_)&&f(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Z){for(let K=0,oe=se.length;K<oe;K++){let Te=se[K],re=n.get(Te);t.bindTexture(i.TEXTURE_2D,re.__webglTexture),ve(i.TEXTURE_2D,Te),ie(Y.__webglFramebuffer,w,Te,i.COLOR_ATTACHMENT0+K,i.TEXTURE_2D,0),m(Te)&&f(i.TEXTURE_2D)}t.unbindTexture()}else{let K=i.TEXTURE_2D;if((w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(K=w.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(K,$.__webglTexture),ve(K,_),_.mipmaps&&_.mipmaps.length>0)for(let oe=0;oe<_.mipmaps.length;oe++)ie(Y.__webglFramebuffer[oe],w,_,i.COLOR_ATTACHMENT0,K,oe);else ie(Y.__webglFramebuffer,w,_,i.COLOR_ATTACHMENT0,K,0);m(_)&&f(K),t.unbindTexture()}w.depthBuffer&&De(w)}function We(w){let _=w.textures;for(let Y=0,$=_.length;Y<$;Y++){let se=_[Y];if(m(se)){let te=x(w),Z=n.get(se).__webglTexture;t.bindTexture(te,Z),f(te),t.unbindTexture()}}}let Je=[],F=[];function Dt(w){if(w.samples>0){if(qe(w)===!1){let _=w.textures,Y=w.width,$=w.height,se=i.COLOR_BUFFER_BIT,te=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Z=n.get(w),K=_.length>1;if(K)for(let oe=0;oe<_.length;oe++)t.bindFramebuffer(i.FRAMEBUFFER,Z.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+oe,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,Z.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+oe,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,Z.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Z.__webglFramebuffer);for(let oe=0;oe<_.length;oe++){if(w.resolveDepthBuffer&&(w.depthBuffer&&(se|=i.DEPTH_BUFFER_BIT),w.stencilBuffer&&w.resolveStencilBuffer&&(se|=i.STENCIL_BUFFER_BIT)),K){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Z.__webglColorRenderbuffer[oe]);let Te=n.get(_[oe]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Te,0)}i.blitFramebuffer(0,0,Y,$,0,0,Y,$,se,i.NEAREST),l===!0&&(Je.length=0,F.length=0,Je.push(i.COLOR_ATTACHMENT0+oe),w.depthBuffer&&w.resolveDepthBuffer===!1&&(Je.push(te),F.push(te),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,F)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Je))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),K)for(let oe=0;oe<_.length;oe++){t.bindFramebuffer(i.FRAMEBUFFER,Z.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+oe,i.RENDERBUFFER,Z.__webglColorRenderbuffer[oe]);let Te=n.get(_[oe]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,Z.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+oe,i.TEXTURE_2D,Te,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Z.__webglMultisampledFramebuffer)}else if(w.depthBuffer&&w.resolveDepthBuffer===!1&&l){let _=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[_])}}}function Be(w){return Math.min(s.maxSamples,w.samples)}function qe(w){let _=n.get(w);return w.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function Le(w){let _=a.render.frame;h.get(w)!==_&&(h.set(w,_),w.update())}function pe(w,_){let Y=w.colorSpace,$=w.format,se=w.type;return w.isCompressedTexture===!0||w.isVideoTexture===!0||Y!==Wt&&Y!==Wn&&(mt.getTransfer(Y)===Ft?($!==Vn||se!==kt)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",Y)),_}function xe(w){return typeof HTMLImageElement!="undefined"&&w instanceof HTMLImageElement?(c.width=w.naturalWidth||w.width,c.height=w.naturalHeight||w.height):typeof VideoFrame!="undefined"&&w instanceof VideoFrame?(c.width=w.displayWidth,c.height=w.displayHeight):(c.width=w.width,c.height=w.height),c}this.allocateTextureUnit=U,this.resetTextureUnits=N,this.setTexture2D=W,this.setTexture2DArray=G,this.setTexture3D=I,this.setTextureCube=P,this.rebindTextures=He,this.setupRenderTarget=$e,this.updateRenderTargetMipmap=We,this.updateMultisampleRenderTarget=Dt,this.setupDepthRenderbuffer=De,this.setupFrameBufferTexture=ie,this.useMultisampledRTT=qe}function mS(i,e){function t(n,s=Wn){let r,a=mt.getTransfer(s);if(n===kt)return i.UNSIGNED_BYTE;if(n===Bo)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Oo)return i.UNSIGNED_SHORT_5_5_5_1;if(n===lh)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===ah)return i.BYTE;if(n===oh)return i.SHORT;if(n===Nr)return i.UNSIGNED_SHORT;if(n===No)return i.INT;if(n===Fi)return i.UNSIGNED_INT;if(n===Gn)return i.FLOAT;if(n===Br)return i.HALF_FLOAT;if(n===ch)return i.ALPHA;if(n===hh)return i.RGB;if(n===Vn)return i.RGBA;if(n===uh)return i.LUMINANCE;if(n===dh)return i.LUMINANCE_ALPHA;if(n===Js)return i.DEPTH_COMPONENT;if(n===Wi)return i.DEPTH_STENCIL;if(n===ko)return i.RED;if(n===zo)return i.RED_INTEGER;if(n===fh)return i.RG;if(n===Ho)return i.RG_INTEGER;if(n===Go)return i.RGBA_INTEGER;if(n===Da||n===Pa||n===Ia||n===La)if(a===Ft)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Da)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Pa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Ia)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===La)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Da)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Pa)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Ia)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===La)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Vo||n===Wo||n===Xo||n===Yo)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Vo)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Wo)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Xo)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Yo)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Qo||n===qo||n===jo)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Qo||n===qo)return a===Ft?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===jo)return a===Ft?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Zo||n===Ko||n===Jo||n===$o||n===el||n===tl||n===nl||n===il||n===sl||n===rl||n===al||n===ol||n===ll||n===cl)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Zo)return a===Ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Ko)return a===Ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Jo)return a===Ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===$o)return a===Ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===el)return a===Ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===tl)return a===Ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===nl)return a===Ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===il)return a===Ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===sl)return a===Ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===rl)return a===Ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===al)return a===Ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===ol)return a===Ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===ll)return a===Ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===cl)return a===Ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Fa||n===hl||n===ul)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Fa)return a===Ft?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===hl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===ul)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===ph||n===dl||n===fl||n===pl)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===Fa)return r.COMPRESSED_RED_RGTC1_EXT;if(n===dl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===fl)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===pl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Vi?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}var gS={type:"move"},yc=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new pt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new pt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new O,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new O),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new pt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new O,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new O),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(let v of e.hand.values()){let m=t.getJointPose(v,n),f=this._getHandJoint(c,v);m!==null&&(f.matrix.fromArray(m.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=m.radius),f.visible=m!==null}let h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),p=.02,g=.005;c.inputState.pinching&&d>p+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=p-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(gS)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new pt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},vS=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,xS=`
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

}`,Tm=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){let s=new zt,r=e.properties.get(s);r.__webglTexture=t.texture,(t.depthNear!==n.depthNear||t.depthFar!==n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=s}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new Nt({vertexShader:vS,fragmentShader:xS,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Qt(new sa(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Mm=class extends Fn{constructor(e,t){super();let n=this,s=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,u=null,d=null,p=null,g=null,v=new Tm,m=t.getContextAttributes(),f=null,x=null,A=[],y=[],T=new Pe,M=null,C=new qt;C.viewport=new yt;let R=new qt;R.viewport=new yt;let b=[C,R],S=new uu,D=null,N=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(V){let j=A[V];return j===void 0&&(j=new yc,A[V]=j),j.getTargetRaySpace()},this.getControllerGrip=function(V){let j=A[V];return j===void 0&&(j=new yc,A[V]=j),j.getGripSpace()},this.getHand=function(V){let j=A[V];return j===void 0&&(j=new yc,A[V]=j),j.getHandSpace()};function U(V){let j=y.indexOf(V.inputSource);if(j===-1)return;let ie=A[j];ie!==void 0&&(ie.update(V.inputSource,V.frame,c||a),ie.dispatchEvent({type:V.type,data:V.inputSource}))}function B(){s.removeEventListener("select",U),s.removeEventListener("selectstart",U),s.removeEventListener("selectend",U),s.removeEventListener("squeeze",U),s.removeEventListener("squeezestart",U),s.removeEventListener("squeezeend",U),s.removeEventListener("end",B),s.removeEventListener("inputsourceschange",W);for(let V=0;V<A.length;V++){let j=y[V];j!==null&&(y[V]=null,A[V].disconnect(j))}D=null,N=null,v.reset(),e.setRenderTarget(f),p=null,d=null,u=null,s=null,x=null,le.stop(),n.isPresenting=!1,e.setPixelRatio(M),e.setSize(T.width,T.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(V){r=V,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(V){o=V,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(V){c=V},this.getBaseLayer=function(){return d!==null?d:p},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(V){if(s=V,s!==null){if(f=e.getRenderTarget(),s.addEventListener("select",U),s.addEventListener("selectstart",U),s.addEventListener("selectend",U),s.addEventListener("squeeze",U),s.addEventListener("squeezestart",U),s.addEventListener("squeezeend",U),s.addEventListener("end",B),s.addEventListener("inputsourceschange",W),m.xrCompatible!==!0&&await t.makeXRCompatible(),M=e.getPixelRatio(),e.getSize(T),s.enabledFeatures!==void 0&&s.enabledFeatures.includes("layers")){let ie=null,ue=null,Ie=null;m.depth&&(Ie=m.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ie=m.stencil?Wi:Js,ue=m.stencil?Vi:Fi);let De={colorFormat:t.RGBA8,depthFormat:Ie,scaleFactor:r};u=new XRWebGLBinding(s,t),d=u.createProjectionLayer(De),s.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),x=new Ht(d.textureWidth,d.textureHeight,{format:Vn,type:kt,depthTexture:new na(d.textureWidth,d.textureHeight,ue,void 0,void 0,void 0,void 0,void 0,void 0,ie),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}else{let ie={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(s,t,ie),s.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),x=new Ht(p.framebufferWidth,p.framebufferHeight,{format:Vn,type:kt,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil})}x.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),le.setContext(s),le.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function W(V){for(let j=0;j<V.removed.length;j++){let ie=V.removed[j],ue=y.indexOf(ie);ue>=0&&(y[ue]=null,A[ue].disconnect(ie))}for(let j=0;j<V.added.length;j++){let ie=V.added[j],ue=y.indexOf(ie);if(ue===-1){for(let De=0;De<A.length;De++)if(De>=y.length){y.push(ie),ue=De;break}else if(y[De]===null){y[De]=ie,ue=De;break}if(ue===-1)break}let Ie=A[ue];Ie&&Ie.connect(ie)}}let G=new O,I=new O;function P(V,j,ie){G.setFromMatrixPosition(j.matrixWorld),I.setFromMatrixPosition(ie.matrixWorld);let ue=G.distanceTo(I),Ie=j.projectionMatrix.elements,De=ie.projectionMatrix.elements,He=Ie[14]/(Ie[10]-1),$e=Ie[14]/(Ie[10]+1),We=(Ie[9]+1)/Ie[5],Je=(Ie[9]-1)/Ie[5],F=(Ie[8]-1)/Ie[0],Dt=(De[8]+1)/De[0],Be=He*F,qe=He*Dt,Le=ue/(-F+Dt),pe=Le*-F;if(j.matrixWorld.decompose(V.position,V.quaternion,V.scale),V.translateX(pe),V.translateZ(Le),V.matrixWorld.compose(V.position,V.quaternion,V.scale),V.matrixWorldInverse.copy(V.matrixWorld).invert(),Ie[10]===-1)V.projectionMatrix.copy(j.projectionMatrix),V.projectionMatrixInverse.copy(j.projectionMatrixInverse);else{let xe=He+Le,w=$e+Le,_=Be-pe,Y=qe+(ue-pe),$=We*$e/w*xe,se=Je*$e/w*xe;V.projectionMatrix.makePerspective(_,Y,$,se,xe,w),V.projectionMatrixInverse.copy(V.projectionMatrix).invert()}}function L(V,j){j===null?V.matrixWorld.copy(V.matrix):V.matrixWorld.multiplyMatrices(j.matrixWorld,V.matrix),V.matrixWorldInverse.copy(V.matrixWorld).invert()}this.updateCamera=function(V){if(s===null)return;let j=V.near,ie=V.far;v.texture!==null&&(v.depthNear>0&&(j=v.depthNear),v.depthFar>0&&(ie=v.depthFar)),S.near=R.near=C.near=j,S.far=R.far=C.far=ie,(D!==S.near||N!==S.far)&&(s.updateRenderState({depthNear:S.near,depthFar:S.far}),D=S.near,N=S.far),C.layers.mask=V.layers.mask|2,R.layers.mask=V.layers.mask|4,S.layers.mask=C.layers.mask|R.layers.mask;let ue=V.parent,Ie=S.cameras;L(S,ue);for(let De=0;De<Ie.length;De++)L(Ie[De],ue);Ie.length===2?P(S,C,R):S.projectionMatrix.copy(C.projectionMatrix),J(V,S,ue)};function J(V,j,ie){ie===null?V.matrix.copy(j.matrixWorld):(V.matrix.copy(ie.matrixWorld),V.matrix.invert(),V.matrix.multiply(j.matrixWorld)),V.matrix.decompose(V.position,V.quaternion,V.scale),V.updateMatrixWorld(!0),V.projectionMatrix.copy(j.projectionMatrix),V.projectionMatrixInverse.copy(j.projectionMatrixInverse),V.isPerspectiveCamera&&(V.fov=nr*2*Math.atan(1/V.projectionMatrix.elements[5]),V.zoom=1)}this.getCamera=function(){return S},this.getFoveation=function(){if(!(d===null&&p===null))return l},this.setFoveation=function(V){l=V,d!==null&&(d.fixedFoveation=V),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=V)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(S)};let ae=null;function ve(V,j){if(h=j.getViewerPose(c||a),g=j,h!==null){let ie=h.views;p!==null&&(e.setRenderTargetFramebuffer(x,p.framebuffer),e.setRenderTarget(x));let ue=!1;ie.length!==S.cameras.length&&(S.cameras.length=0,ue=!0);for(let De=0;De<ie.length;De++){let He=ie[De],$e=null;if(p!==null)$e=p.getViewport(He);else{let Je=u.getViewSubImage(d,He);$e=Je.viewport,De===0&&(e.setRenderTargetTextures(x,Je.colorTexture,d.ignoreDepthValues?void 0:Je.depthStencilTexture),e.setRenderTarget(x))}let We=b[De];We===void 0&&(We=new qt,We.layers.enable(De),We.viewport=new yt,b[De]=We),We.matrix.fromArray(He.transform.matrix),We.matrix.decompose(We.position,We.quaternion,We.scale),We.projectionMatrix.fromArray(He.projectionMatrix),We.projectionMatrixInverse.copy(We.projectionMatrix).invert(),We.viewport.set($e.x,$e.y,$e.width,$e.height),De===0&&(S.matrix.copy(We.matrix),S.matrix.decompose(S.position,S.quaternion,S.scale)),ue===!0&&S.cameras.push(We)}let Ie=s.enabledFeatures;if(Ie&&Ie.includes("depth-sensing")){let De=u.getDepthInformation(ie[0]);De&&De.isValid&&De.texture&&v.init(e,De,s.renderState)}}for(let ie=0;ie<A.length;ie++){let ue=y[ie],Ie=A[ie];ue!==null&&Ie!==void 0&&Ie.update(ue,j,c||a)}ae&&ae(V,j),j.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:j}),g=null}let le=new Yp;le.setAnimationLoop(ve),this.setAnimationLoop=function(V){ae=V},this.dispose=function(){}}},gr=new ri,yS=new Ze;function AS(i,e){function t(m,f){m.matrixAutoUpdate===!0&&m.updateMatrix(),f.value.copy(m.matrix)}function n(m,f){f.color.getRGB(m.fogColor.value,qh(i)),f.isFog?(m.fogNear.value=f.near,m.fogFar.value=f.far):f.isFogExp2&&(m.fogDensity.value=f.density)}function s(m,f,x,A,y){f.isMeshBasicMaterial||f.isMeshLambertMaterial?r(m,f):f.isMeshToonMaterial?(r(m,f),u(m,f)):f.isMeshPhongMaterial?(r(m,f),h(m,f)):f.isMeshStandardMaterial?(r(m,f),d(m,f),f.isMeshPhysicalMaterial&&p(m,f,y)):f.isMeshMatcapMaterial?(r(m,f),g(m,f)):f.isMeshDepthMaterial?r(m,f):f.isMeshDistanceMaterial?(r(m,f),v(m,f)):f.isMeshNormalMaterial?r(m,f):f.isLineBasicMaterial?(a(m,f),f.isLineDashedMaterial&&o(m,f)):f.isPointsMaterial?l(m,f,x,A):f.isSpriteMaterial?c(m,f):f.isShadowMaterial?(m.color.value.copy(f.color),m.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function r(m,f){m.opacity.value=f.opacity,f.color&&m.diffuse.value.copy(f.color),f.emissive&&m.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.bumpMap&&(m.bumpMap.value=f.bumpMap,t(f.bumpMap,m.bumpMapTransform),m.bumpScale.value=f.bumpScale,f.side===an&&(m.bumpScale.value*=-1)),f.normalMap&&(m.normalMap.value=f.normalMap,t(f.normalMap,m.normalMapTransform),m.normalScale.value.copy(f.normalScale),f.side===an&&m.normalScale.value.negate()),f.displacementMap&&(m.displacementMap.value=f.displacementMap,t(f.displacementMap,m.displacementMapTransform),m.displacementScale.value=f.displacementScale,m.displacementBias.value=f.displacementBias),f.emissiveMap&&(m.emissiveMap.value=f.emissiveMap,t(f.emissiveMap,m.emissiveMapTransform)),f.specularMap&&(m.specularMap.value=f.specularMap,t(f.specularMap,m.specularMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest);let x=e.get(f),A=x.envMap,y=x.envMapRotation;A&&(m.envMap.value=A,gr.copy(y),gr.x*=-1,gr.y*=-1,gr.z*=-1,A.isCubeTexture&&A.isRenderTargetTexture===!1&&(gr.y*=-1,gr.z*=-1),m.envMapRotation.value.setFromMatrix4(yS.makeRotationFromEuler(gr)),m.flipEnvMap.value=A.isCubeTexture&&A.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=f.reflectivity,m.ior.value=f.ior,m.refractionRatio.value=f.refractionRatio),f.lightMap&&(m.lightMap.value=f.lightMap,m.lightMapIntensity.value=f.lightMapIntensity,t(f.lightMap,m.lightMapTransform)),f.aoMap&&(m.aoMap.value=f.aoMap,m.aoMapIntensity.value=f.aoMapIntensity,t(f.aoMap,m.aoMapTransform))}function a(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform))}function o(m,f){m.dashSize.value=f.dashSize,m.totalSize.value=f.dashSize+f.gapSize,m.scale.value=f.scale}function l(m,f,x,A){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.size.value=f.size*x,m.scale.value=A*.5,f.map&&(m.map.value=f.map,t(f.map,m.uvTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function c(m,f){m.diffuse.value.copy(f.color),m.opacity.value=f.opacity,m.rotation.value=f.rotation,f.map&&(m.map.value=f.map,t(f.map,m.mapTransform)),f.alphaMap&&(m.alphaMap.value=f.alphaMap,t(f.alphaMap,m.alphaMapTransform)),f.alphaTest>0&&(m.alphaTest.value=f.alphaTest)}function h(m,f){m.specular.value.copy(f.specular),m.shininess.value=Math.max(f.shininess,1e-4)}function u(m,f){f.gradientMap&&(m.gradientMap.value=f.gradientMap)}function d(m,f){m.metalness.value=f.metalness,f.metalnessMap&&(m.metalnessMap.value=f.metalnessMap,t(f.metalnessMap,m.metalnessMapTransform)),m.roughness.value=f.roughness,f.roughnessMap&&(m.roughnessMap.value=f.roughnessMap,t(f.roughnessMap,m.roughnessMapTransform)),f.envMap&&(m.envMapIntensity.value=f.envMapIntensity)}function p(m,f,x){m.ior.value=f.ior,f.sheen>0&&(m.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),m.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(m.sheenColorMap.value=f.sheenColorMap,t(f.sheenColorMap,m.sheenColorMapTransform)),f.sheenRoughnessMap&&(m.sheenRoughnessMap.value=f.sheenRoughnessMap,t(f.sheenRoughnessMap,m.sheenRoughnessMapTransform))),f.clearcoat>0&&(m.clearcoat.value=f.clearcoat,m.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(m.clearcoatMap.value=f.clearcoatMap,t(f.clearcoatMap,m.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,t(f.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(m.clearcoatNormalMap.value=f.clearcoatNormalMap,t(f.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===an&&m.clearcoatNormalScale.value.negate())),f.dispersion>0&&(m.dispersion.value=f.dispersion),f.iridescence>0&&(m.iridescence.value=f.iridescence,m.iridescenceIOR.value=f.iridescenceIOR,m.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(m.iridescenceMap.value=f.iridescenceMap,t(f.iridescenceMap,m.iridescenceMapTransform)),f.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=f.iridescenceThicknessMap,t(f.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),f.transmission>0&&(m.transmission.value=f.transmission,m.transmissionSamplerMap.value=x.texture,m.transmissionSamplerSize.value.set(x.width,x.height),f.transmissionMap&&(m.transmissionMap.value=f.transmissionMap,t(f.transmissionMap,m.transmissionMapTransform)),m.thickness.value=f.thickness,f.thicknessMap&&(m.thicknessMap.value=f.thicknessMap,t(f.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=f.attenuationDistance,m.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(m.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(m.anisotropyMap.value=f.anisotropyMap,t(f.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=f.specularIntensity,m.specularColor.value.copy(f.specularColor),f.specularColorMap&&(m.specularColorMap.value=f.specularColorMap,t(f.specularColorMap,m.specularColorMapTransform)),f.specularIntensityMap&&(m.specularIntensityMap.value=f.specularIntensityMap,t(f.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,f){f.matcap&&(m.matcap.value=f.matcap)}function v(m,f){let x=e.get(f).light;m.referencePosition.value.setFromMatrixPosition(x.matrixWorld),m.nearDistance.value=x.shadow.camera.near,m.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function _S(i,e,t,n){let s={},r={},a=[],o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(x,A){let y=A.program;n.uniformBlockBinding(x,y)}function c(x,A){let y=s[x.id];y===void 0&&(g(x),y=h(x),s[x.id]=y,x.addEventListener("dispose",m));let T=A.program;n.updateUBOMapping(x,T);let M=e.render.frame;r[x.id]!==M&&(d(x),r[x.id]=M)}function h(x){let A=u();x.__bindingPointIndex=A;let y=i.createBuffer(),T=x.__size,M=x.usage;return i.bindBuffer(i.UNIFORM_BUFFER,y),i.bufferData(i.UNIFORM_BUFFER,T,M),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,A,y),y}function u(){for(let x=0;x<o;x++)if(a.indexOf(x)===-1)return a.push(x),x;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(x){let A=s[x.id],y=x.uniforms,T=x.__cache;i.bindBuffer(i.UNIFORM_BUFFER,A);for(let M=0,C=y.length;M<C;M++){let R=Array.isArray(y[M])?y[M]:[y[M]];for(let b=0,S=R.length;b<S;b++){let D=R[b];if(p(D,M,b,T)===!0){let N=D.__offset,U=Array.isArray(D.value)?D.value:[D.value],B=0;for(let W=0;W<U.length;W++){let G=U[W],I=v(G);typeof G=="number"||typeof G=="boolean"?(D.__data[0]=G,i.bufferSubData(i.UNIFORM_BUFFER,N+B,D.__data)):G.isMatrix3?(D.__data[0]=G.elements[0],D.__data[1]=G.elements[1],D.__data[2]=G.elements[2],D.__data[3]=0,D.__data[4]=G.elements[3],D.__data[5]=G.elements[4],D.__data[6]=G.elements[5],D.__data[7]=0,D.__data[8]=G.elements[6],D.__data[9]=G.elements[7],D.__data[10]=G.elements[8],D.__data[11]=0):(G.toArray(D.__data,B),B+=I.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,N,D.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function p(x,A,y,T){let M=x.value,C=A+"_"+y;if(T[C]===void 0)return typeof M=="number"||typeof M=="boolean"?T[C]=M:T[C]=M.clone(),!0;{let R=T[C];if(typeof M=="number"||typeof M=="boolean"){if(R!==M)return T[C]=M,!0}else if(R.equals(M)===!1)return R.copy(M),!0}return!1}function g(x){let A=x.uniforms,y=0,T=16;for(let C=0,R=A.length;C<R;C++){let b=Array.isArray(A[C])?A[C]:[A[C]];for(let S=0,D=b.length;S<D;S++){let N=b[S],U=Array.isArray(N.value)?N.value:[N.value];for(let B=0,W=U.length;B<W;B++){let G=U[B],I=v(G),P=y%T,L=P%I.boundary,J=P+L;y+=L,J!==0&&T-J<I.storage&&(y+=T-J),N.__data=new Float32Array(I.storage/Float32Array.BYTES_PER_ELEMENT),N.__offset=y,y+=I.storage}}}let M=y%T;return M>0&&(y+=T-M),x.__size=y,x.__cache={},this}function v(x){let A={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(A.boundary=4,A.storage=4):x.isVector2?(A.boundary=8,A.storage=8):x.isVector3||x.isColor?(A.boundary=16,A.storage=12):x.isVector4?(A.boundary=16,A.storage=16):x.isMatrix3?(A.boundary=48,A.storage=48):x.isMatrix4?(A.boundary=64,A.storage=64):x.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",x),A}function m(x){let A=x.target;A.removeEventListener("dispose",m);let y=a.indexOf(A.__bindingPointIndex);a.splice(y,1),i.deleteBuffer(s[A.id]),delete s[A.id],delete r[A.id]}function f(){for(let x in s)i.deleteBuffer(s[x]);a=[],s={},r={}}return{bind:l,update:c,dispose:f}}var no=class{constructor(e={}){let{canvas:t=qf(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:d=!1}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext!="undefined"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=a;let g=new Uint32Array(4),v=new Int32Array(4),m=null,f=null,x=[],A=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=nt,this.toneMapping=Gi,this.toneMappingExposure=1;let y=this,T=!1,M=0,C=0,R=null,b=-1,S=null,D=new yt,N=new yt,U=null,B=new Ae(0),W=0,G=t.width,I=t.height,P=1,L=null,J=null,ae=new yt(0,0,G,I),ve=new yt(0,0,G,I),le=!1,V=new ja,j=!1,ie=!1;this.transmissionResolutionScale=1;let ue=new Ze,Ie=new Ze,De=new O,He=new yt,$e={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},We=!1;function Je(){return R===null?P:1}let F=n;function Dt(E,z){return t.getContext(E,z)}try{let E={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Pi}`),t.addEventListener("webglcontextlost",he,!1),t.addEventListener("webglcontextrestored",Me,!1),t.addEventListener("webglcontextcreationerror",be,!1),F===null){let z="webgl2";if(F=Dt(z,E),F===null)throw Dt(z)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(E){throw console.error("THREE.WebGLRenderer: "+E.message),E}let Be,qe,Le,pe,xe,w,_,Y,$,se,te,Z,K,oe,Te,re,ge,Fe,Qe,we,Ue,Ge,Pt,k;function ce(){Be=new O_(F),Be.init(),Ge=new mS(F,Be),qe=new I_(F,Be,e,Ge),Le=new fS(F,Be),qe.reverseDepthBuffer&&d&&Le.buffers.depth.setReversed(!0),pe=new H_(F),xe=new eS,w=new pS(F,Be,Le,xe,qe,Ge,pe),_=new F_(y),Y=new B_(y),$=new qx(F),Pt=new D_(F,$),se=new k_(F,$,pe,Pt),te=new V_(F,se,$,pe),Qe=new G_(F,qe,w),re=new L_(xe),Z=new $1(y,_,Y,Be,qe,Pt,re),K=new AS(y,xe),oe=new nS,Te=new lS(Be),Fe=new R_(y,_,Y,Le,te,p,l),ge=new uS(y,te,qe),k=new _S(F,pe,qe,Le),we=new P_(F,Be,pe),Ue=new z_(F,Be,pe),pe.programs=Z.programs,y.capabilities=qe,y.extensions=Be,y.properties=xe,y.renderLists=oe,y.shadowMap=ge,y.state=Le,y.info=pe}ce();let ee=new Mm(y,F);this.xr=ee,this.getContext=function(){return F},this.getContextAttributes=function(){return F.getContextAttributes()},this.forceContextLoss=function(){let E=Be.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){let E=Be.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return P},this.setPixelRatio=function(E){E!==void 0&&(P=E,this.setSize(G,I,!1))},this.getSize=function(E){return E.set(G,I)},this.setSize=function(E,z,Q=!0){if(ee.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}G=E,I=z,t.width=Math.floor(E*P),t.height=Math.floor(z*P),Q===!0&&(t.style.width=E+"px",t.style.height=z+"px"),this.setViewport(0,0,E,z)},this.getDrawingBufferSize=function(E){return E.set(G*P,I*P).floor()},this.setDrawingBufferSize=function(E,z,Q){G=E,I=z,P=Q,t.width=Math.floor(E*Q),t.height=Math.floor(z*Q),this.setViewport(0,0,E,z)},this.getCurrentViewport=function(E){return E.copy(D)},this.getViewport=function(E){return E.copy(ae)},this.setViewport=function(E,z,Q,q){E.isVector4?ae.set(E.x,E.y,E.z,E.w):ae.set(E,z,Q,q),Le.viewport(D.copy(ae).multiplyScalar(P).round())},this.getScissor=function(E){return E.copy(ve)},this.setScissor=function(E,z,Q,q){E.isVector4?ve.set(E.x,E.y,E.z,E.w):ve.set(E,z,Q,q),Le.scissor(N.copy(ve).multiplyScalar(P).round())},this.getScissorTest=function(){return le},this.setScissorTest=function(E){Le.setScissorTest(le=E)},this.setOpaqueSort=function(E){L=E},this.setTransparentSort=function(E){J=E},this.getClearColor=function(E){return E.copy(Fe.getClearColor())},this.setClearColor=function(){Fe.setClearColor.apply(Fe,arguments)},this.getClearAlpha=function(){return Fe.getClearAlpha()},this.setClearAlpha=function(){Fe.setClearAlpha.apply(Fe,arguments)},this.clear=function(E=!0,z=!0,Q=!0){let q=0;if(E){let X=!1;if(R!==null){let de=R.texture.format;X=de===Go||de===Ho||de===zo}if(X){let de=R.texture.type,ye=de===kt||de===Fi||de===Nr||de===Vi||de===Bo||de===Oo,Ce=Fe.getClearColor(),Ee=Fe.getClearAlpha(),tt=Ce.r,it=Ce.g,Ye=Ce.b;ye?(g[0]=tt,g[1]=it,g[2]=Ye,g[3]=Ee,F.clearBufferuiv(F.COLOR,0,g)):(v[0]=tt,v[1]=it,v[2]=Ye,v[3]=Ee,F.clearBufferiv(F.COLOR,0,v))}else q|=F.COLOR_BUFFER_BIT}z&&(q|=F.DEPTH_BUFFER_BIT),Q&&(q|=F.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),F.clear(q)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",he,!1),t.removeEventListener("webglcontextrestored",Me,!1),t.removeEventListener("webglcontextcreationerror",be,!1),Fe.dispose(),oe.dispose(),Te.dispose(),xe.dispose(),_.dispose(),Y.dispose(),te.dispose(),Pt.dispose(),k.dispose(),Z.dispose(),ee.dispose(),ee.removeEventListener("sessionstart",In),ee.removeEventListener("sessionend",gs),Di.stop()};function he(E){E.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),T=!0}function Me(){console.log("THREE.WebGLRenderer: Context Restored."),T=!1;let E=pe.autoReset,z=ge.enabled,Q=ge.autoUpdate,q=ge.needsUpdate,X=ge.type;ce(),pe.autoReset=E,ge.enabled=z,ge.autoUpdate=Q,ge.needsUpdate=q,ge.type=X}function be(E){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function et(E){let z=E.target;z.removeEventListener("dispose",et),Bt(z)}function Bt(E){dn(E),xe.remove(E)}function dn(E){let z=xe.get(E).programs;z!==void 0&&(z.forEach(function(Q){Z.releaseProgram(Q)}),E.isShaderMaterial&&Z.releaseShaderCache(E))}this.renderBufferDirect=function(E,z,Q,q,X,de){z===null&&(z=$e);let ye=X.isMesh&&X.matrixWorld.determinant()<0,Ce=Et(E,z,Q,q,X);Le.setMaterial(q,ye);let Ee=Q.index,tt=1;if(q.wireframe===!0){if(Ee=se.getWireframeAttribute(Q),Ee===void 0)return;tt=2}let it=Q.drawRange,Ye=Q.attributes.position,xt=it.start*tt,_t=(it.start+it.count)*tt;de!==null&&(xt=Math.max(xt,de.start*tt),_t=Math.min(_t,(de.start+de.count)*tt)),Ee!==null?(xt=Math.max(xt,0),_t=Math.min(_t,Ee.count)):Ye!=null&&(xt=Math.max(xt,0),_t=Math.min(_t,Ye.count));let ke=_t-xt;if(ke<0||ke===1/0)return;Pt.setup(X,q,Ce,Q,Ee);let ht,ft=we;if(Ee!==null&&(ht=$.get(Ee),ft=Ue,ft.setIndex(ht)),X.isMesh)q.wireframe===!0?(Le.setLineWidth(q.wireframeLinewidth*Je()),ft.setMode(F.LINES)):ft.setMode(F.TRIANGLES);else if(X.isLine){let je=q.linewidth;je===void 0&&(je=1),Le.setLineWidth(je*Je()),X.isLineSegments?ft.setMode(F.LINES):X.isLineLoop?ft.setMode(F.LINE_LOOP):ft.setMode(F.LINE_STRIP)}else X.isPoints?ft.setMode(F.POINTS):X.isSprite&&ft.setMode(F.TRIANGLES);if(X.isBatchedMesh)if(X._multiDrawInstances!==null)ft.renderMultiDrawInstances(X._multiDrawStarts,X._multiDrawCounts,X._multiDrawCount,X._multiDrawInstances);else if(Be.get("WEBGL_multi_draw"))ft.renderMultiDraw(X._multiDrawStarts,X._multiDrawCounts,X._multiDrawCount);else{let je=X._multiDrawStarts,gn=X._multiDrawCounts,It=X._multiDrawCount,mi=Ee?$.get(Ee).bytesPerElement:1,Lr=xe.get(q).currentProgram.getUniforms();for(let zn=0;zn<It;zn++)Lr.setValue(F,"_gl_DrawID",zn),ft.render(je[zn]/mi,gn[zn])}else if(X.isInstancedMesh)ft.renderInstances(xt,ke,X.count);else if(Q.isInstancedBufferGeometry){let je=Q._maxInstanceCount!==void 0?Q._maxInstanceCount:1/0,gn=Math.min(Q.instanceCount,je);ft.renderInstances(xt,ke,gn)}else ft.render(xt,ke)};function bt(E,z,Q){E.transparent===!0&&E.side===vn&&E.forceSinglePass===!1?(E.side=an,E.needsUpdate=!0,ne(E,z,Q),E.side=Hn,E.needsUpdate=!0,ne(E,z,Q),E.side=vn):ne(E,z,Q)}this.compile=function(E,z,Q=null){Q===null&&(Q=E),f=Te.get(Q),f.init(z),A.push(f),Q.traverseVisible(function(X){X.isLight&&X.layers.test(z.layers)&&(f.pushLight(X),X.castShadow&&f.pushShadow(X))}),E!==Q&&E.traverseVisible(function(X){X.isLight&&X.layers.test(z.layers)&&(f.pushLight(X),X.castShadow&&f.pushShadow(X))}),f.setupLights();let q=new Set;return E.traverse(function(X){if(!(X.isMesh||X.isPoints||X.isLine||X.isSprite))return;let de=X.material;if(de)if(Array.isArray(de))for(let ye=0;ye<de.length;ye++){let Ce=de[ye];bt(Ce,Q,X),q.add(Ce)}else bt(de,Q,X),q.add(de)}),A.pop(),f=null,q},this.compileAsync=function(E,z,Q=null){let q=this.compile(E,z,Q);return new Promise(X=>{function de(){if(q.forEach(function(ye){xe.get(ye).currentProgram.isReady()&&q.delete(ye)}),q.size===0){X(E);return}setTimeout(de,10)}Be.get("KHR_parallel_shader_compile")!==null?de():setTimeout(de,10)})};let En=null;function Tn(E){En&&En(E)}function In(){Di.stop()}function gs(){Di.start()}let Di=new Yp;Di.setAnimationLoop(Tn),typeof self!="undefined"&&Di.setContext(self),this.setAnimationLoop=function(E){En=E,ee.setAnimationLoop(E),E===null?Di.stop():Di.start()},ee.addEventListener("sessionstart",In),ee.addEventListener("sessionend",gs),this.render=function(E,z){if(z!==void 0&&z.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(T===!0)return;if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),z.parent===null&&z.matrixWorldAutoUpdate===!0&&z.updateMatrixWorld(),ee.enabled===!0&&ee.isPresenting===!0&&(ee.cameraAutoUpdate===!0&&ee.updateCamera(z),z=ee.getCamera()),E.isScene===!0&&E.onBeforeRender(y,E,z,R),f=Te.get(E,A.length),f.init(z),A.push(f),Ie.multiplyMatrices(z.projectionMatrix,z.matrixWorldInverse),V.setFromProjectionMatrix(Ie),ie=this.localClippingEnabled,j=re.init(this.clippingPlanes,ie),m=oe.get(E,x.length),m.init(),x.push(m),ee.enabled===!0&&ee.isPresenting===!0){let de=y.xr.getDepthSensingMesh();de!==null&&Vs(de,z,-1/0,y.sortObjects)}Vs(E,z,0,y.sortObjects),m.finish(),y.sortObjects===!0&&m.sort(L,J),We=ee.enabled===!1||ee.isPresenting===!1||ee.hasDepthSensing()===!1,We&&Fe.addToRenderList(m,E),this.info.render.frame++,j===!0&&re.beginShadows();let Q=f.state.shadowsArray;ge.render(Q,E,z),j===!0&&re.endShadows(),this.info.autoReset===!0&&this.info.reset();let q=m.opaque,X=m.transmissive;if(f.setupLights(),z.isArrayCamera){let de=z.cameras;if(X.length>0)for(let ye=0,Ce=de.length;ye<Ce;ye++){let Ee=de[ye];wa(q,X,E,Ee)}We&&Fe.render(E);for(let ye=0,Ce=de.length;ye<Ce;ye++){let Ee=de[ye];Ws(m,E,Ee,Ee.viewport)}}else X.length>0&&wa(q,X,E,z),We&&Fe.render(E),Ws(m,E,z);R!==null&&C===0&&(w.updateMultisampleRenderTarget(R),w.updateRenderTargetMipmap(R)),E.isScene===!0&&E.onAfterRender(y,E,z),Pt.resetDefaultState(),b=-1,S=null,A.pop(),A.length>0?(f=A[A.length-1],j===!0&&re.setGlobalState(y.clippingPlanes,f.state.camera)):f=null,x.pop(),x.length>0?m=x[x.length-1]:m=null};function Vs(E,z,Q,q){if(E.visible===!1)return;if(E.layers.test(z.layers)){if(E.isGroup)Q=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(z);else if(E.isLight)f.pushLight(E),E.castShadow&&f.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||V.intersectsSprite(E)){q&&He.setFromMatrixPosition(E.matrixWorld).applyMatrix4(Ie);let ye=te.update(E),Ce=E.material;Ce.visible&&m.push(E,ye,Ce,Q,He.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||V.intersectsObject(E))){let ye=te.update(E),Ce=E.material;if(q&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),He.copy(E.boundingSphere.center)):(ye.boundingSphere===null&&ye.computeBoundingSphere(),He.copy(ye.boundingSphere.center)),He.applyMatrix4(E.matrixWorld).applyMatrix4(Ie)),Array.isArray(Ce)){let Ee=ye.groups;for(let tt=0,it=Ee.length;tt<it;tt++){let Ye=Ee[tt],xt=Ce[Ye.materialIndex];xt&&xt.visible&&m.push(E,ye,xt,Q,He.z,Ye)}}else Ce.visible&&m.push(E,ye,Ce,Q,He.z,null)}}let de=E.children;for(let ye=0,Ce=de.length;ye<Ce;ye++)Vs(de[ye],z,Q,q)}function Ws(E,z,Q,q){let X=E.opaque,de=E.transmissive,ye=E.transparent;f.setupLightsView(Q),j===!0&&re.setGlobalState(y.clippingPlanes,Q),q&&Le.viewport(D.copy(q)),X.length>0&&Xs(X,z,Q),de.length>0&&Xs(de,z,Q),ye.length>0&&Xs(ye,z,Q),Le.buffers.depth.setTest(!0),Le.buffers.depth.setMask(!0),Le.buffers.color.setMask(!0),Le.setPolygonOffset(!1)}function wa(E,z,Q,q){if((Q.isScene===!0?Q.overrideMaterial:null)!==null)return;f.state.transmissionRenderTarget[q.id]===void 0&&(f.state.transmissionRenderTarget[q.id]=new Ht(1,1,{generateMipmaps:!0,type:Be.has("EXT_color_buffer_half_float")||Be.has("EXT_color_buffer_float")?Br:kt,minFilter:gi,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:mt.workingColorSpace}));let de=f.state.transmissionRenderTarget[q.id],ye=q.viewport||D;de.setSize(ye.z*y.transmissionResolutionScale,ye.w*y.transmissionResolutionScale);let Ce=y.getRenderTarget();y.setRenderTarget(de),y.getClearColor(B),W=y.getClearAlpha(),W<1&&y.setClearColor(16777215,.5),y.clear(),We&&Fe.render(Q);let Ee=y.toneMapping;y.toneMapping=Gi;let tt=q.viewport;if(q.viewport!==void 0&&(q.viewport=void 0),f.setupLightsView(q),j===!0&&re.setGlobalState(y.clippingPlanes,q),Xs(E,Q,q),w.updateMultisampleRenderTarget(de),w.updateRenderTargetMipmap(de),Be.has("WEBGL_multisampled_render_to_texture")===!1){let it=!1;for(let Ye=0,xt=z.length;Ye<xt;Ye++){let _t=z[Ye],ke=_t.object,ht=_t.geometry,ft=_t.material,je=_t.group;if(ft.side===vn&&ke.layers.test(q.layers)){let gn=ft.side;ft.side=an,ft.needsUpdate=!0,jc(ke,Q,q,ht,ft,je),ft.side=gn,ft.needsUpdate=!0,it=!0}}it===!0&&(w.updateMultisampleRenderTarget(de),w.updateRenderTargetMipmap(de))}y.setRenderTarget(Ce),y.setClearColor(B,W),tt!==void 0&&(q.viewport=tt),y.toneMapping=Ee}function Xs(E,z,Q){let q=z.isScene===!0?z.overrideMaterial:null;for(let X=0,de=E.length;X<de;X++){let ye=E[X],Ce=ye.object,Ee=ye.geometry,tt=q===null?ye.material:q,it=ye.group;Ce.layers.test(Q.layers)&&jc(Ce,z,Q,Ee,tt,it)}}function jc(E,z,Q,q,X,de){E.onBeforeRender(y,z,Q,q,X,de),E.modelViewMatrix.multiplyMatrices(Q.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),X.onBeforeRender(y,z,Q,q,E,de),X.transparent===!0&&X.side===vn&&X.forceSinglePass===!1?(X.side=an,X.needsUpdate=!0,y.renderBufferDirect(Q,z,q,X,E,de),X.side=Hn,X.needsUpdate=!0,y.renderBufferDirect(Q,z,q,X,E,de),X.side=vn):y.renderBufferDirect(Q,z,q,X,E,de),E.onAfterRender(y,z,Q,q,X,de)}function ne(E,z,Q){z.isScene!==!0&&(z=$e);let q=xe.get(E),X=f.state.lights,de=f.state.shadowsArray,ye=X.state.version,Ce=Z.getParameters(E,X.state,de,z,Q),Ee=Z.getProgramCacheKey(Ce),tt=q.programs;q.environment=E.isMeshStandardMaterial?z.environment:null,q.fog=z.fog,q.envMap=(E.isMeshStandardMaterial?Y:_).get(E.envMap||q.environment),q.envMapRotation=q.environment!==null&&E.envMap===null?z.environmentRotation:E.envMapRotation,tt===void 0&&(E.addEventListener("dispose",et),tt=new Map,q.programs=tt);let it=tt.get(Ee);if(it!==void 0){if(q.currentProgram===it&&q.lightsStateVersion===ye)return at(E,Ce),it}else Ce.uniforms=Z.getUniforms(E),E.onBeforeCompile(Ce,y),it=Z.acquireProgram(Ce,Ee),tt.set(Ee,it),q.uniforms=Ce.uniforms;let Ye=q.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(Ye.clippingPlanes=re.uniform),at(E,Ce),q.needsLights=yn(E),q.lightsStateVersion=ye,q.needsLights&&(Ye.ambientLightColor.value=X.state.ambient,Ye.lightProbe.value=X.state.probe,Ye.directionalLights.value=X.state.directional,Ye.directionalLightShadows.value=X.state.directionalShadow,Ye.spotLights.value=X.state.spot,Ye.spotLightShadows.value=X.state.spotShadow,Ye.rectAreaLights.value=X.state.rectArea,Ye.ltc_1.value=X.state.rectAreaLTC1,Ye.ltc_2.value=X.state.rectAreaLTC2,Ye.pointLights.value=X.state.point,Ye.pointLightShadows.value=X.state.pointShadow,Ye.hemisphereLights.value=X.state.hemi,Ye.directionalShadowMap.value=X.state.directionalShadowMap,Ye.directionalShadowMatrix.value=X.state.directionalShadowMatrix,Ye.spotShadowMap.value=X.state.spotShadowMap,Ye.spotLightMatrix.value=X.state.spotLightMatrix,Ye.spotLightMap.value=X.state.spotLightMap,Ye.pointShadowMap.value=X.state.pointShadowMap,Ye.pointShadowMatrix.value=X.state.pointShadowMatrix),q.currentProgram=it,q.uniformsList=null,it}function fe(E){if(E.uniformsList===null){let z=E.currentProgram.getUniforms();E.uniformsList=eo.seqWithValue(z.seq,E.uniforms)}return E.uniformsList}function at(E,z){let Q=xe.get(E);Q.outputColorSpace=z.outputColorSpace,Q.batching=z.batching,Q.batchingColor=z.batchingColor,Q.instancing=z.instancing,Q.instancingColor=z.instancingColor,Q.instancingMorph=z.instancingMorph,Q.skinning=z.skinning,Q.morphTargets=z.morphTargets,Q.morphNormals=z.morphNormals,Q.morphColors=z.morphColors,Q.morphTargetsCount=z.morphTargetsCount,Q.numClippingPlanes=z.numClippingPlanes,Q.numIntersection=z.numClipIntersection,Q.vertexAlphas=z.vertexAlphas,Q.vertexTangents=z.vertexTangents,Q.toneMapping=z.toneMapping}function Et(E,z,Q,q,X){z.isScene!==!0&&(z=$e),w.resetTextureUnits();let de=z.fog,ye=q.isMeshStandardMaterial?z.environment:null,Ce=R===null?y.outputColorSpace:R.isXRRenderTarget===!0?R.texture.colorSpace:Wt,Ee=(q.isMeshStandardMaterial?Y:_).get(q.envMap||ye),tt=q.vertexColors===!0&&!!Q.attributes.color&&Q.attributes.color.itemSize===4,it=!!Q.attributes.tangent&&(!!q.normalMap||q.anisotropy>0),Ye=!!Q.morphAttributes.position,xt=!!Q.morphAttributes.normal,_t=!!Q.morphAttributes.color,ke=Gi;q.toneMapped&&(R===null||R.isXRRenderTarget===!0)&&(ke=y.toneMapping);let ht=Q.morphAttributes.position||Q.morphAttributes.normal||Q.morphAttributes.color,ft=ht!==void 0?ht.length:0,je=xe.get(q),gn=f.state.lights;if(j===!0&&(ie===!0||E!==S)){let Mn=E===S&&q.id===b;re.setState(q,E,Mn)}let It=!1;q.version===je.__version?(je.needsLights&&je.lightsStateVersion!==gn.state.version||je.outputColorSpace!==Ce||X.isBatchedMesh&&je.batching===!1||!X.isBatchedMesh&&je.batching===!0||X.isBatchedMesh&&je.batchingColor===!0&&X.colorTexture===null||X.isBatchedMesh&&je.batchingColor===!1&&X.colorTexture!==null||X.isInstancedMesh&&je.instancing===!1||!X.isInstancedMesh&&je.instancing===!0||X.isSkinnedMesh&&je.skinning===!1||!X.isSkinnedMesh&&je.skinning===!0||X.isInstancedMesh&&je.instancingColor===!0&&X.instanceColor===null||X.isInstancedMesh&&je.instancingColor===!1&&X.instanceColor!==null||X.isInstancedMesh&&je.instancingMorph===!0&&X.morphTexture===null||X.isInstancedMesh&&je.instancingMorph===!1&&X.morphTexture!==null||je.envMap!==Ee||q.fog===!0&&je.fog!==de||je.numClippingPlanes!==void 0&&(je.numClippingPlanes!==re.numPlanes||je.numIntersection!==re.numIntersection)||je.vertexAlphas!==tt||je.vertexTangents!==it||je.morphTargets!==Ye||je.morphNormals!==xt||je.morphColors!==_t||je.toneMapping!==ke||je.morphTargetsCount!==ft)&&(It=!0):(It=!0,je.__version=q.version);let mi=je.currentProgram;It===!0&&(mi=ne(q,z,X));let Lr=!1,zn=!1,Ca=!1,Vt=mi.getUniforms(),ni=je.uniforms;if(Le.useProgram(mi.program)&&(Lr=!0,zn=!0,Ca=!0),q.id!==b&&(b=q.id,zn=!0),Lr||S!==E){Le.buffers.depth.getReversed()?(ue.copy(E.projectionMatrix),Kf(ue),Jf(ue),Vt.setValue(F,"projectionMatrix",ue)):Vt.setValue(F,"projectionMatrix",E.projectionMatrix),Vt.setValue(F,"viewMatrix",E.matrixWorldInverse);let Ln=Vt.map.cameraPosition;Ln!==void 0&&Ln.setValue(F,De.setFromMatrixPosition(E.matrixWorld)),qe.logarithmicDepthBuffer&&Vt.setValue(F,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(q.isMeshPhongMaterial||q.isMeshToonMaterial||q.isMeshLambertMaterial||q.isMeshBasicMaterial||q.isMeshStandardMaterial||q.isShaderMaterial)&&Vt.setValue(F,"isOrthographic",E.isOrthographicCamera===!0),S!==E&&(S=E,zn=!0,Ca=!0)}if(X.isSkinnedMesh){Vt.setOptional(F,X,"bindMatrix"),Vt.setOptional(F,X,"bindMatrixInverse");let Mn=X.skeleton;Mn&&(Mn.boneTexture===null&&Mn.computeBoneTexture(),Vt.setValue(F,"boneTexture",Mn.boneTexture,w))}X.isBatchedMesh&&(Vt.setOptional(F,X,"batchingTexture"),Vt.setValue(F,"batchingTexture",X._matricesTexture,w),Vt.setOptional(F,X,"batchingIdTexture"),Vt.setValue(F,"batchingIdTexture",X._indirectTexture,w),Vt.setOptional(F,X,"batchingColorTexture"),X._colorsTexture!==null&&Vt.setValue(F,"batchingColorTexture",X._colorsTexture,w));let ii=Q.morphAttributes;if((ii.position!==void 0||ii.normal!==void 0||ii.color!==void 0)&&Qe.update(X,Q,mi),(zn||je.receiveShadow!==X.receiveShadow)&&(je.receiveShadow=X.receiveShadow,Vt.setValue(F,"receiveShadow",X.receiveShadow)),q.isMeshGouraudMaterial&&q.envMap!==null&&(ni.envMap.value=Ee,ni.flipEnvMap.value=Ee.isCubeTexture&&Ee.isRenderTargetTexture===!1?-1:1),q.isMeshStandardMaterial&&q.envMap===null&&z.environment!==null&&(ni.envMapIntensity.value=z.environmentIntensity),zn&&(Vt.setValue(F,"toneMappingExposure",y.toneMappingExposure),je.needsLights&&Ot(ni,Ca),de&&q.fog===!0&&K.refreshFogUniforms(ni,de),K.refreshMaterialUniforms(ni,q,P,I,f.state.transmissionRenderTarget[E.id]),eo.upload(F,fe(je),ni,w)),q.isShaderMaterial&&q.uniformsNeedUpdate===!0&&(eo.upload(F,fe(je),ni,w),q.uniformsNeedUpdate=!1),q.isSpriteMaterial&&Vt.setValue(F,"center",X.center),Vt.setValue(F,"modelViewMatrix",X.modelViewMatrix),Vt.setValue(F,"normalMatrix",X.normalMatrix),Vt.setValue(F,"modelMatrix",X.matrixWorld),q.isShaderMaterial||q.isRawShaderMaterial){let Mn=q.uniformsGroups;for(let Ln=0,Zc=Mn.length;Ln<Zc;Ln++){let Ys=Mn[Ln];k.update(Ys,mi),k.bind(Ys,mi)}}return mi}function Ot(E,z){E.ambientLightColor.needsUpdate=z,E.lightProbe.needsUpdate=z,E.directionalLights.needsUpdate=z,E.directionalLightShadows.needsUpdate=z,E.pointLights.needsUpdate=z,E.pointLightShadows.needsUpdate=z,E.spotLights.needsUpdate=z,E.spotLightShadows.needsUpdate=z,E.rectAreaLights.needsUpdate=z,E.hemisphereLights.needsUpdate=z}function yn(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return M},this.getActiveMipmapLevel=function(){return C},this.getRenderTarget=function(){return R},this.setRenderTargetTextures=function(E,z,Q){xe.get(E.texture).__webglTexture=z,xe.get(E.depthTexture).__webglTexture=Q;let q=xe.get(E);q.__hasExternalTextures=!0,q.__autoAllocateDepthBuffer=Q===void 0,q.__autoAllocateDepthBuffer||Be.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),q.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(E,z){let Q=xe.get(E);Q.__webglFramebuffer=z,Q.__useDefaultFramebuffer=z===void 0};let kn=F.createFramebuffer();this.setRenderTarget=function(E,z=0,Q=0){R=E,M=z,C=Q;let q=!0,X=null,de=!1,ye=!1;if(E){let Ee=xe.get(E);if(Ee.__useDefaultFramebuffer!==void 0)Le.bindFramebuffer(F.FRAMEBUFFER,null),q=!1;else if(Ee.__webglFramebuffer===void 0)w.setupRenderTarget(E);else if(Ee.__hasExternalTextures)w.rebindTextures(E,xe.get(E.texture).__webglTexture,xe.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){let Ye=E.depthTexture;if(Ee.__boundDepthTexture!==Ye){if(Ye!==null&&xe.has(Ye)&&(E.width!==Ye.image.width||E.height!==Ye.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");w.setupDepthRenderbuffer(E)}}let tt=E.texture;(tt.isData3DTexture||tt.isDataArrayTexture||tt.isCompressedArrayTexture)&&(ye=!0);let it=xe.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(it[z])?X=it[z][Q]:X=it[z],de=!0):E.samples>0&&w.useMultisampledRTT(E)===!1?X=xe.get(E).__webglMultisampledFramebuffer:Array.isArray(it)?X=it[Q]:X=it,D.copy(E.viewport),N.copy(E.scissor),U=E.scissorTest}else D.copy(ae).multiplyScalar(P).floor(),N.copy(ve).multiplyScalar(P).floor(),U=le;if(Q!==0&&(X=kn),Le.bindFramebuffer(F.FRAMEBUFFER,X)&&q&&Le.drawBuffers(E,X),Le.viewport(D),Le.scissor(N),Le.setScissorTest(U),de){let Ee=xe.get(E.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_CUBE_MAP_POSITIVE_X+z,Ee.__webglTexture,Q)}else if(ye){let Ee=xe.get(E.texture),tt=z;F.framebufferTextureLayer(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,Ee.__webglTexture,Q,tt)}else if(E!==null&&Q!==0){let Ee=xe.get(E.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,Ee.__webglTexture,Q)}b=-1},this.readRenderTargetPixels=function(E,z,Q,q,X,de,ye){if(!(E&&E.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ce=xe.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&ye!==void 0&&(Ce=Ce[ye]),Ce){Le.bindFramebuffer(F.FRAMEBUFFER,Ce);try{let Ee=E.texture,tt=Ee.format,it=Ee.type;if(!qe.textureFormatReadable(tt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!qe.textureTypeReadable(it)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}z>=0&&z<=E.width-q&&Q>=0&&Q<=E.height-X&&F.readPixels(z,Q,q,X,Ge.convert(tt),Ge.convert(it),de)}finally{let Ee=R!==null?xe.get(R).__webglFramebuffer:null;Le.bindFramebuffer(F.FRAMEBUFFER,Ee)}}},this.readRenderTargetPixelsAsync=async function(E,z,Q,q,X,de,ye){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ce=xe.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&ye!==void 0&&(Ce=Ce[ye]),Ce){let Ee=E.texture,tt=Ee.format,it=Ee.type;if(!qe.textureFormatReadable(tt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!qe.textureTypeReadable(it))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(z>=0&&z<=E.width-q&&Q>=0&&Q<=E.height-X){Le.bindFramebuffer(F.FRAMEBUFFER,Ce);let Ye=F.createBuffer();F.bindBuffer(F.PIXEL_PACK_BUFFER,Ye),F.bufferData(F.PIXEL_PACK_BUFFER,de.byteLength,F.STREAM_READ),F.readPixels(z,Q,q,X,Ge.convert(tt),Ge.convert(it),0);let xt=R!==null?xe.get(R).__webglFramebuffer:null;Le.bindFramebuffer(F.FRAMEBUFFER,xt);let _t=F.fenceSync(F.SYNC_GPU_COMMANDS_COMPLETE,0);return F.flush(),await Zf(F,_t,4),F.bindBuffer(F.PIXEL_PACK_BUFFER,Ye),F.getBufferSubData(F.PIXEL_PACK_BUFFER,0,de),F.deleteBuffer(Ye),F.deleteSync(_t),de}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(E,z=null,Q=0){E.isTexture!==!0&&(ir("WebGLRenderer: copyFramebufferToTexture function signature has changed."),z=arguments[0]||null,E=arguments[1]);let q=Math.pow(2,-Q),X=Math.floor(E.image.width*q),de=Math.floor(E.image.height*q),ye=z!==null?z.x:0,Ce=z!==null?z.y:0;w.setTexture2D(E,0),F.copyTexSubImage2D(F.TEXTURE_2D,Q,0,0,ye,Ce,X,de),Le.unbindTexture()};let pi=F.createFramebuffer(),rn=F.createFramebuffer();this.copyTextureToTexture=function(E,z,Q=null,q=null,X=0,de=null){E.isTexture!==!0&&(ir("WebGLRenderer: copyTextureToTexture function signature has changed."),q=arguments[0]||null,E=arguments[1],z=arguments[2],de=arguments[3]||0,Q=null),de===null&&(X!==0?(ir("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),de=X,X=0):de=0);let ye,Ce,Ee,tt,it,Ye,xt,_t,ke,ht=E.isCompressedTexture?E.mipmaps[de]:E.image;if(Q!==null)ye=Q.max.x-Q.min.x,Ce=Q.max.y-Q.min.y,Ee=Q.isBox3?Q.max.z-Q.min.z:1,tt=Q.min.x,it=Q.min.y,Ye=Q.isBox3?Q.min.z:0;else{let ii=Math.pow(2,-X);ye=Math.floor(ht.width*ii),Ce=Math.floor(ht.height*ii),E.isDataArrayTexture?Ee=ht.depth:E.isData3DTexture?Ee=Math.floor(ht.depth*ii):Ee=1,tt=0,it=0,Ye=0}q!==null?(xt=q.x,_t=q.y,ke=q.z):(xt=0,_t=0,ke=0);let ft=Ge.convert(z.format),je=Ge.convert(z.type),gn;z.isData3DTexture?(w.setTexture3D(z,0),gn=F.TEXTURE_3D):z.isDataArrayTexture||z.isCompressedArrayTexture?(w.setTexture2DArray(z,0),gn=F.TEXTURE_2D_ARRAY):(w.setTexture2D(z,0),gn=F.TEXTURE_2D),F.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,z.flipY),F.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,z.premultiplyAlpha),F.pixelStorei(F.UNPACK_ALIGNMENT,z.unpackAlignment);let It=F.getParameter(F.UNPACK_ROW_LENGTH),mi=F.getParameter(F.UNPACK_IMAGE_HEIGHT),Lr=F.getParameter(F.UNPACK_SKIP_PIXELS),zn=F.getParameter(F.UNPACK_SKIP_ROWS),Ca=F.getParameter(F.UNPACK_SKIP_IMAGES);F.pixelStorei(F.UNPACK_ROW_LENGTH,ht.width),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,ht.height),F.pixelStorei(F.UNPACK_SKIP_PIXELS,tt),F.pixelStorei(F.UNPACK_SKIP_ROWS,it),F.pixelStorei(F.UNPACK_SKIP_IMAGES,Ye);let Vt=E.isDataArrayTexture||E.isData3DTexture,ni=z.isDataArrayTexture||z.isData3DTexture;if(E.isDepthTexture){let ii=xe.get(E),Mn=xe.get(z),Ln=xe.get(ii.__renderTarget),Zc=xe.get(Mn.__renderTarget);Le.bindFramebuffer(F.READ_FRAMEBUFFER,Ln.__webglFramebuffer),Le.bindFramebuffer(F.DRAW_FRAMEBUFFER,Zc.__webglFramebuffer);for(let Ys=0;Ys<Ee;Ys++)Vt&&(F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,xe.get(E).__webglTexture,X,Ye+Ys),F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,xe.get(z).__webglTexture,de,ke+Ys)),F.blitFramebuffer(tt,it,ye,Ce,xt,_t,ye,Ce,F.DEPTH_BUFFER_BIT,F.NEAREST);Le.bindFramebuffer(F.READ_FRAMEBUFFER,null),Le.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else if(X!==0||E.isRenderTargetTexture||xe.has(E)){let ii=xe.get(E),Mn=xe.get(z);Le.bindFramebuffer(F.READ_FRAMEBUFFER,pi),Le.bindFramebuffer(F.DRAW_FRAMEBUFFER,rn);for(let Ln=0;Ln<Ee;Ln++)Vt?F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,ii.__webglTexture,X,Ye+Ln):F.framebufferTexture2D(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,ii.__webglTexture,X),ni?F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,Mn.__webglTexture,de,ke+Ln):F.framebufferTexture2D(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,Mn.__webglTexture,de),X!==0?F.blitFramebuffer(tt,it,ye,Ce,xt,_t,ye,Ce,F.COLOR_BUFFER_BIT,F.NEAREST):ni?F.copyTexSubImage3D(gn,de,xt,_t,ke+Ln,tt,it,ye,Ce):F.copyTexSubImage2D(gn,de,xt,_t,tt,it,ye,Ce);Le.bindFramebuffer(F.READ_FRAMEBUFFER,null),Le.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else ni?E.isDataTexture||E.isData3DTexture?F.texSubImage3D(gn,de,xt,_t,ke,ye,Ce,Ee,ft,je,ht.data):z.isCompressedArrayTexture?F.compressedTexSubImage3D(gn,de,xt,_t,ke,ye,Ce,Ee,ft,ht.data):F.texSubImage3D(gn,de,xt,_t,ke,ye,Ce,Ee,ft,je,ht):E.isDataTexture?F.texSubImage2D(F.TEXTURE_2D,de,xt,_t,ye,Ce,ft,je,ht.data):E.isCompressedTexture?F.compressedTexSubImage2D(F.TEXTURE_2D,de,xt,_t,ht.width,ht.height,ft,ht.data):F.texSubImage2D(F.TEXTURE_2D,de,xt,_t,ye,Ce,ft,je,ht);F.pixelStorei(F.UNPACK_ROW_LENGTH,It),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,mi),F.pixelStorei(F.UNPACK_SKIP_PIXELS,Lr),F.pixelStorei(F.UNPACK_SKIP_ROWS,zn),F.pixelStorei(F.UNPACK_SKIP_IMAGES,Ca),de===0&&z.generateMipmaps&&F.generateMipmap(gn),Le.unbindTexture()},this.copyTextureToTexture3D=function(E,z,Q=null,q=null,X=0){return E.isTexture!==!0&&(ir("WebGLRenderer: copyTextureToTexture3D function signature has changed."),Q=arguments[0]||null,q=arguments[1]||null,E=arguments[2],z=arguments[3],X=arguments[4]||0),ir('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(E,z,Q,q,X)},this.initRenderTarget=function(E){xe.get(E).__webglFramebuffer===void 0&&w.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?w.setTextureCube(E,0):E.isData3DTexture?w.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?w.setTexture2DArray(E,0):w.setTexture2D(E,0),Le.unbindTexture()},this.resetState=function(){M=0,C=0,R=null,Le.reset(),Pt.reset()},typeof __THREE_DEVTOOLS__!="undefined"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return xi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorspace=mt._getDrawingBufferColorSpace(e),t.unpackColorSpace=mt._getUnpackColorSpace()}};var Tu=class extends HTMLElement{constructor(){super()}static get observedAttributes(){return["path"]}connectedCallback(){this.loadSponsors()}attributeChangedCallback(e,t,n){t!==n&&this.loadSponsors()}get path(){return this.getAttribute("path")||"github-sponsors"}async loadSponsors(){try{let e=await fetch(window.paths[this.path]);if(!e.ok)throw new Error(`HTTP error! status: ${e.status}`);let t=await e.text();this.innerHTML=t}catch(e){console.error("Error loading sponsors:",e),this.innerHTML=""}}};var Ti=typeof window!="undefined",Cn=Ti?window:null,Ve=Ti?document:null,jt={OBJECT:0,ATTRIBUTE:1,CSS:2,TRANSFORM:3,CSS_VAR:4},St={NUMBER:0,UNIT:1,COLOR:2,COMPLEX:3},Kn={NONE:0,AUTO:1,FORCE:2},mn={replace:0,none:1,blend:2},wm=Symbol(),Ac=Symbol(),Mu=Symbol(),io=Symbol(),Cm=Symbol(),Rm=Symbol(),Tt=1e-11,da=1e12,Jt=1e3,wu=120,rs="",Cu=(()=>{let i=new Map;return i.set("x","translateX"),i.set("y","translateY"),i.set("z","translateZ"),i})(),so=["translateX","translateY","translateZ","rotate","rotateX","rotateY","rotateZ","scale","scaleX","scaleY","scaleZ","skew","skewX","skewY","perspective","matrix","matrix3d"],Ru=so.reduce((i,e)=>({...i,[e]:e+"("}),{}),rt=()=>{},SS=/(^#([\da-f]{3}){1,2}$)|(^#([\da-f]{4}){1,2}$)/i,bS=/rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/i,ES=/rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(-?\d+|-?\d*.\d+)\s*\)/i,TS=/hsl\(\s*(-?\d+|-?\d*.\d+)\s*,\s*(-?\d+|-?\d*.\d+)%\s*,\s*(-?\d+|-?\d*.\d+)%\s*\)/i,MS=/hsla\(\s*(-?\d+|-?\d*.\d+)\s*,\s*(-?\d+|-?\d*.\d+)%\s*,\s*(-?\d+|-?\d*.\d+)%\s*,\s*(-?\d+|-?\d*.\d+)\s*\)/i,Dm=/[-+]?\d*\.?\d+(?:e[-+]?\d)?/gi,Pm=/^([-+]?\d*\.?\d+(?:e[-+]?\d+)?)([a-z]+|%)$/i,wS=/([a-z])([A-Z])/g,CS=/(\w+)(\([^)]+\)+)/g,Im=/(\*=|\+=|-=)/,Lm={id:null,keyframes:null,playbackEase:null,playbackRate:1,frameRate:wu,loop:0,reversed:!1,alternate:!1,autoplay:!0,duration:Jt,delay:0,loopDelay:0,ease:"out(2)",composition:mn.replace,modifier:i=>i,onBegin:rt,onBeforeUpdate:rt,onUpdate:rt,onLoop:rt,onPause:rt,onComplete:rt,onRender:rt},nn={current:null,root:Ve},lt={defaults:Lm,precision:4,timeScale:1,tickThreshold:200},Fm={version:"4.1.2",engine:null};Ti&&(Cn.AnimeJS||(Cn.AnimeJS=[]),Cn.AnimeJS.push(Fm));var Um=i=>i.replace(wS,"$1-$2").toLowerCase(),un=(i,e)=>i.indexOf(e)===0,vr=Date.now,Rn=Array.isArray,ln=i=>i&&i.constructor===Object,Jn=i=>typeof i=="number"&&!isNaN(i),Un=i=>typeof i=="string",Zt=i=>typeof i=="function",Se=i=>typeof i=="undefined",ro=i=>Se(i)||i===null,Du=i=>Ti&&i instanceof SVGElement,Nm=i=>SS.test(i),Bm=i=>un(i,"rgb"),Om=i=>un(i,"hsl"),RS=i=>Nm(i)||Bm(i)||Om(i),fa=i=>!lt.defaults.hasOwnProperty(i),xr=i=>Un(i)?parseFloat(i):i,pa=Math.pow,Is=Math.sqrt,Pu=Math.sin,Iu=Math.cos,Ni=Math.abs,km=Math.exp,DS=Math.ceil,ao=Math.floor,PS=Math.asin,zm=Math.max,_c=Math.atan2,ma=Math.PI,Lu=Math.round,Xe=(i,e,t)=>i<e?e:i>t?t:i,Hm={},Ne=(i,e)=>{if(e<0)return i;if(!e)return Lu(i);let t=Hm[e];return t||(t=Hm[e]=10**e),Lu(i*t)/t},yr=(i,e)=>Rn(e)?e.reduce((t,n)=>Ni(n-i)<Ni(t-i)?n:t):e?Lu(i/e)*e:i,as=(i,e,t)=>i+(e-i)*t,Fu=(i,e,t)=>{let n=10**(t||0);return ao((Math.random()*(e-i+1/n)+i)*n)/n},Gm=i=>{let e=i.length,t,n;for(;e;)n=Fu(0,--e),t=i[e],i[e]=i[n],i[n]=t;return i},Sc=i=>i===1/0?da:i===-1/0?-1e12:i,ga=i=>i<=Tt?Tt:Sc(Ne(i,11)),Dn=i=>Rn(i)?[...i]:i,oo=(i,e)=>{let t={...i};for(let n in e){let s=i[n];t[n]=Se(s)?e[n]:s}return t},Lt=(i,e,t,n="_prev",s="_next")=>{let r=i._head,a=s;for(t&&(r=i._tail,a=n);r;){let o=r[a];e(r),r=o}},os=(i,e,t="_prev",n="_next")=>{let s=e[t],r=e[n];s?s[n]=r:i._head=r,r?r[t]=s:i._tail=s,e[t]=null,e[n]=null},ls=(i,e,t,n="_prev",s="_next")=>{let r=i._tail;for(;r&&t&&t(r,e);)r=r[n];let a=r?r[s]:i._head;r?r[s]=e:i._head=e,a?a[n]=e:i._tail=e,e[n]=r,e[s]=a},Uu=i=>{let e;return(...t)=>{let n,s,r,a;e&&(n=e.currentIteration,s=e.iterationProgress,r=e.reversed,a=e._alternate,e.revert());let o=i(...t);return o&&!Zt(o)&&o.revert&&(e=o),Se(s)||(e.currentIteration=n,e.iterationProgress=(a&&n%2?!r:r)?1-s:s),o||rt}},Nu=class{constructor(e=0){this.deltaTime=0,this._currentTime=e,this._elapsedTime=e,this._startTime=e,this._lastTime=e,this._scheduledTime=0,this._frameDuration=Ne(Jt/wu,0),this._fps=wu,this._speed=1,this._hasChildren=!1,this._head=null,this._tail=null}get fps(){return this._fps}set fps(e){let t=this._frameDuration,n=+e,s=n<Tt?Tt:n,r=Ne(Jt/s,0);this._fps=s,this._frameDuration=r,this._scheduledTime+=r-t}get speed(){return this._speed}set speed(e){let t=+e;this._speed=t<Tt?Tt:t}requestTick(e){let t=this._scheduledTime,n=this._elapsedTime;if(this._elapsedTime+=e-n,n<t)return Kn.NONE;let s=this._frameDuration,r=n-t;return this._scheduledTime+=r<s?s:r,Kn.AUTO}computeDeltaTime(e){let t=e-this._lastTime;return this.deltaTime=t,this._lastTime=e,t}},bc=(i,e,t,n,s)=>{let r=i.parent,a=i.duration,o=i.completed,l=i.iterationDuration,c=i.iterationCount,h=i._currentIteration,u=i._loopDelay,d=i._reversed,p=i._alternate,g=i._hasChildren,v=i._delay,m=i._currentTime,f=v+l,x=e-v,A=Xe(m,-v,a),y=Xe(x,-v,a),T=x-m,M=y>0,C=y>=a,R=a<=Tt,b=s===Kn.FORCE,S=0,D=x,N=0;if(c>1){let I=~~(y/(l+(C?0:u)));i._currentIteration=Xe(I,0,c),C&&i._currentIteration--,S=i._currentIteration%2,D=y%(l+u)||0}let U=d^(p&&S),B=i._ease,W=C?U?0:a:U?l-D:D;B&&(W=l*B(W/l)||0);let G=(r?r.backwards:x<m)?!U:!!U;if(i._currentTime=x,i._iterationTime=W,i.backwards=G,M&&!i.began?(i.began=!0,!t&&!(r&&(G||!r.began))&&i.onBegin(i)):x<=0&&(i.began=!1),!t&&!g&&M&&i._currentIteration!==h&&i.onLoop(i),b||s===Kn.AUTO&&(e>=v&&e<=f||e<=v&&A>v||e>=f&&A!==a)||W>=f&&A!==a||W<=v&&A>0||e<=A&&A===a&&o||C&&!o&&R){if(M&&(i.computeDeltaTime(A),t||i.onBeforeUpdate(i)),!g){let I=b||(G?T*-1:T)>=lt.tickThreshold,P=i._offset+(r?r._offset:0)+v+W,L=i._head,J,ae,ve,le,V=0;for(;L;){let j=L._composition,ie=L._currentTime,ue=L._changeDuration,Ie=L._absoluteStartTime+L._changeDuration,De=L._nextRep,He=L._prevRep,$e=j!==mn.none;if((I||(ie!==ue||P<=Ie+(De?De._delay:0))&&(ie!==0||P>=L._absoluteStartTime))&&(!$e||!L._isOverridden&&(!L._isOverlapped||P<=Ie)&&(!De||De._isOverridden||P<=De._absoluteStartTime)&&(!He||He._isOverridden||P>=He._absoluteStartTime+He._changeDuration+L._delay))){let We=L._currentTime=Xe(W-L._startTime,0,ue),Je=L._ease(We/L._updateDuration),F=L._modifier,Dt=L._valueType,Be=L._tweenType,qe=Be===jt.OBJECT,Le=Dt===St.NUMBER,pe=Le&&qe||Je===0||Je===1?-1:lt.precision,xe,w;if(Le)xe=w=F(Ne(as(L._fromNumber,L._toNumber,Je),pe));else if(Dt===St.UNIT)w=F(Ne(as(L._fromNumber,L._toNumber,Je),pe)),xe=`${w}${L._unit}`;else if(Dt===St.COLOR){let _=L._fromNumbers,Y=L._toNumbers,$=Ne(Xe(F(as(_[0],Y[0],Je)),0,255),0),se=Ne(Xe(F(as(_[1],Y[1],Je)),0,255),0),te=Ne(Xe(F(as(_[2],Y[2],Je)),0,255),0),Z=Xe(F(Ne(as(_[3],Y[3],Je),pe)),0,1);if(xe=`rgba(${$},${se},${te},${Z})`,$e){let K=L._numbers;K[0]=$,K[1]=se,K[2]=te,K[3]=Z}}else if(Dt===St.COMPLEX){xe=L._strings[0];for(let _=0,Y=L._toNumbers.length;_<Y;_++){let $=F(Ne(as(L._fromNumbers[_],L._toNumbers[_],Je),pe)),se=L._strings[_+1];xe+=`${se?$+se:$}`,$e&&(L._numbers[_]=$)}}if($e&&(L._number=w),!n&&j!==mn.blend){let _=L.property;J=L.target,qe?J[_]=xe:Be===jt.ATTRIBUTE?J.setAttribute(_,xe):(ae=J.style,Be===jt.TRANSFORM?(J!==ve&&(ve=J,le=J[io]),le[_]=xe,V=1):Be===jt.CSS?ae[_]=xe:Be===jt.CSS_VAR&&ae.setProperty(_,xe)),M&&(N=1)}else L._value=xe}if(V&&L._renderTransforms){let We=rs;for(let Je in le)We+=`${Ru[Je]}${le[Je]}) `;ae.transform=We,V=0}L=L._next}!t&&N&&i.onRender(i)}!t&&M&&i.onUpdate(i)}return r&&R?!t&&(r.began&&!G&&x>=a&&!o||G&&x<=Tt&&o)&&(i.onComplete(i),i.completed=!G):M&&C?c===1/0?i._startTime+=i.duration:i._currentIteration>=c-1&&(i.paused=!0,!o&&!g&&(i.completed=!0,!t&&!(r&&(G||!r.began))&&(i.onComplete(i),i._resolve(i)))):i.completed=!1,N},Ar=(i,e,t,n,s)=>{let r=i._currentIteration;if(bc(i,e,t,n,s),i._hasChildren){let a=i,o=a.backwards,l=n?e:a._iterationTime,c=vr(),h=0,u=!0;if(!n&&a._currentIteration!==r){let d=a.iterationDuration;Lt(a,p=>{if(!o)!p.completed&&!p.backwards&&p._currentTime<p.iterationDuration&&bc(p,d,t,1,Kn.FORCE),p.began=!1,p.completed=!1;else{let g=p.duration,v=p._offset+p._delay,m=v+g;!t&&g<=Tt&&(!v||m===d)&&p.onComplete(p)}}),t||a.onLoop(a)}Lt(a,d=>{let p=Ne((l-d._offset)*d._speed,12),g=d._fps<a._fps?d.requestTick(c):s;h+=bc(d,p,t,n,g),!d.completed&&u&&(u=!1)},o),!t&&h&&a.onRender(a),(u||o)&&a._currentTime>=a.duration&&(a.paused=!0,a.completed||(a.completed=!0,t||(a.onComplete(a),a._resolve(a))))}},va={animation:null,update:rt},IS=i=>{let e=va.animation;return e||(e={duration:Tt,computeDeltaTime:rt,_offset:0,_delay:0,_head:null,_tail:null},va.animation=e,va.update=()=>{i.forEach(t=>{for(let n in t){let s=t[n],r=s._head;if(r){let a=r._valueType,o=a===St.COMPLEX||a===St.COLOR?Dn(r._fromNumbers):null,l=r._fromNumber,c=s._tail;for(;c&&c!==r;){if(o)for(let h=0,u=c._numbers.length;h<u;h++)o[h]+=c._numbers[h];else l+=c._number;c=c._prevAdd}r._toNumber=l,r._toNumbers=o}}}),bc(e,1,1,0,Kn.FORCE)}),e},Vm=(()=>Ti?requestAnimationFrame:setImmediate)(),LS=(()=>Ti?cancelAnimationFrame:clearImmediate)(),Wm=class extends Nu{constructor(e){super(e);this.useDefaultMainLoop=!0,this.pauseOnDocumentHidden=!0,this.defaults=Lm,this.paused=!!(Ti&&Ve.hidden),this.reqId=null}update(){let e=this._currentTime=vr();if(this.requestTick(e)){this.computeDeltaTime(e);let t=this._speed,n=this._fps,s=this._head;for(;s;){let r=s._next;s.paused?(os(this,s),this._hasChildren=!!this._tail,s._running=!1,s.completed&&!s._cancelled&&s.cancel()):Ar(s,(e-s._startTime)*s._speed*t,0,0,s._fps<n?s.requestTick(e):Kn.AUTO),s=r}va.update()}}wake(){return this.useDefaultMainLoop&&!this.reqId&&!this.paused&&(this.reqId=Vm(Xm)),this}pause(){return this.paused=!0,FS()}resume(){if(!!this.paused)return this.paused=!1,Lt(this,e=>e.resetTime()),this.wake()}get speed(){return this._speed*(lt.timeScale===1?1:Jt)}set speed(e){this._speed=e*lt.timeScale,Lt(this,t=>t.speed=t._speed)}get timeUnit(){return lt.timeScale===1?"ms":"s"}set timeUnit(e){let t=.001,n=e==="s",s=n?t:1;if(lt.timeScale!==s){lt.timeScale=s,lt.tickThreshold=200*s;let r=n?t:Jt;this.defaults.duration*=r,this._speed*=r}}get precision(){return lt.precision}set precision(e){lt.precision=e}},sn=(()=>{let i=new Wm(vr());return Ti&&(Fm.engine=i,Ve.addEventListener("visibilitychange",()=>{!i.pauseOnDocumentHidden||(Ve.hidden?i.pause():i.resume())})),i})(),Xm=()=>{sn._head?(sn.reqId=Vm(Xm),sn.update()):sn.reqId=0},FS=()=>(LS(sn.reqId),sn.reqId=0,sn),US=(i,e,t)=>{let n=i.style.transform,s;if(n){let r=i[io],a;for(;a=CS.exec(n);){let o=a[1],l=a[2].slice(1,-1);r[o]=l,o===e&&(s=l,t&&(t[e]=l))}}return n&&!Se(s)?s:un(e,"scale")?"1":un(e,"rotate")||un(e,"skew")?"0deg":"0px"};function Bu(i){let e=Un(i)?nn.root.querySelectorAll(i):i;if(e instanceof NodeList||e instanceof HTMLCollection)return e}function ci(i){if(ro(i))return[];if(Rn(i)){let t=i.flat(1/0),n=[];for(let s=0,r=t.length;s<r;s++){let a=t[s];if(!ro(a)){let o=Bu(a);if(o)for(let l=0,c=o.length;l<c;l++){let h=o[l];if(!ro(h)){let u=!1;for(let d=0,p=n.length;d<p;d++)if(n[d]===h){u=!0;break}u||n.push(h)}}else{let l=!1;for(let c=0,h=n.length;c<h;c++)if(n[c]===a){l=!0;break}l||n.push(a)}}}return n}if(!Ti)return[i];let e=Bu(i);return e?Array.from(e):[i]}function lo(i){let e=ci(i),t=e.length;if(t)for(let n=0;n<t;n++){let s=e[n];if(!s[wm]){s[wm]=!0;let r=Du(s);(s.nodeType||r)&&(s[Ac]=!0,s[Mu]=r,s[io]={})}}return e}var Ym=i=>{let t=ci(i)[0];if(!(!t||!Du(t)))return t},NS=(i,e=.33)=>t=>{let n=Ym(i);if(!n)return;let s=t.tagName==="path",r=s?" ":",",a=t[Cm];a&&t.setAttribute(s?"d":"points",a);let o="",l="";if(!e)o=t.getAttribute(s?"d":"points"),l=n.getAttribute(s?"d":"points");else{let c=t.getTotalLength(),h=n.getTotalLength(),u=Math.max(Math.ceil(c*e),Math.ceil(h*e));for(let d=0;d<u;d++){let p=d/(u-1),g=t.getPointAtLength(c*p),v=n.getPointAtLength(h*p),m=s?d===0?"M":"L":"";o+=m+Ne(g.x,3)+r+g.y+" ",l+=m+Ne(v.x,3)+r+v.y+" "}}return t[Cm]=l,[o,l]},BS=i=>{let e=1;if(i&&i.getCTM){let t=i.getCTM();if(t){let n=Is(t.a*t.a+t.b*t.b),s=Is(t.c*t.c+t.d*t.d);e=(n+s)/2}}return e},OS=(i,e,t)=>{let n=Jt,s=getComputedStyle(i),r=s.strokeLinecap,a=s.vectorEffect==="non-scaling-stroke"?i:null,o=r,l=new Proxy(i,{get(c,h){let u=c[h];return h===Rm?c:h==="setAttribute"?(...d)=>{if(d[0]==="draw"){let g=d[1].split(" "),v=+g[0],m=+g[1],f=BS(a),x=v*-1e3*f,A=m*n*f+x,y=n*f+(v===0&&m===1||v===1&&m===0?0:10*f)-A;if(r!=="butt"){let T=v===m?"butt":r;o!==T&&(c.style.strokeLinecap=`${T}`,o=T)}c.setAttribute("stroke-dashoffset",`${x}`),c.setAttribute("stroke-dasharray",`${A} ${y}`)}return Reflect.apply(u,c,d)}:Zt(u)?(...d)=>Reflect.apply(u,c,d):u}});return i.getAttribute("pathLength")!==`${n}`&&(i.setAttribute("pathLength",`${n}`),l.setAttribute("draw",`${e} ${t}`)),l},kS=(i,e=0,t=0)=>ci(i).map(s=>OS(s,e,t)),Ou=(i,e,t=0)=>i.getPointAtLength(e+t>=1?e+t:0),ku=(i,e)=>t=>{let n=+i.getTotalLength(),s=t[Mu],r=i.getCTM();return{from:0,to:n,modifier:a=>{if(e==="a"){let o=Ou(i,a,-1),l=Ou(i,a,1);return _c(l.y-o.y,l.x-o.x)*180/ma}else{let o=Ou(i,a,0);return e==="x"?s||!r?o.x:o.x*r.a+o.y*r.c+r.e:s||!r?o.y:o.x*r.b+o.y*r.d+r.f}}}},zS=i=>{let e=Ym(i);if(!!e)return{translateX:ku(e,"x"),translateY:ku(e,"y"),rotate:ku(e,"a")}},HS=["opacity","rotate","overflow","color"],GS=(i,e)=>{if(HS.includes(e))return!1;if(i.getAttribute(e)||e in i){if(e==="scale"){let t=i.parentNode;return t&&t.tagName==="filter"}return!0}},$n={morphTo:NS,createMotionPath:zS,createDrawable:kS},VS=i=>{let e=bS.exec(i)||ES.exec(i),t=Se(e[4])?1:+e[4];return[+e[1],+e[2],+e[3],t]},WS=i=>{let e=i.length,t=e===4||e===5;return[+("0x"+i[1]+i[t?1:2]),+("0x"+i[t?2:3]+i[t?2:4]),+("0x"+i[t?3:5]+i[t?3:6]),e===5||e===9?+(+("0x"+i[t?4:7]+i[t?4:8])/255).toFixed(3):1]},zu=(i,e,t)=>(t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*(2/3-t)*6:i),XS=i=>{let e=TS.exec(i)||MS.exec(i),t=+e[1]/360,n=+e[2]/100,s=+e[3]/100,r=Se(e[4])?1:+e[4],a,o,l;if(n===0)a=o=l=s;else{let c=s<.5?s*(1+n):s+n-s*n,h=2*s-c;a=Ne(zu(h,c,t+1/3)*255,0),o=Ne(zu(h,c,t)*255,0),l=Ne(zu(h,c,t-1/3)*255,0)}return[a,o,l,r]},YS=i=>Bm(i)?VS(i):Nm(i)?WS(i):Om(i)?XS(i):[0,0,0,1],ze=(i,e)=>Se(i)?e:i,ei=(i,e,t,n,s)=>{if(Zt(i)){let r=()=>{let a=i(e,t,n);return isNaN(+a)?a||0:+a};return s&&(s.func=r),r()}else return i},Hu=(i,e)=>i[Ac]?i[Mu]&&GS(i,e)?jt.ATTRIBUTE:so.includes(e)||Cu.get(e)?jt.TRANSFORM:un(e,"--")?jt.CSS_VAR:e in i.style?jt.CSS:e in i?jt.OBJECT:jt.ATTRIBUTE:jt.OBJECT,Qm=(i,e,t)=>{let n=i.style[e];n&&t&&(t[e]=n);let s=n||getComputedStyle(i[Rm]||i).getPropertyValue(e);return s==="auto"?"0":s},_r=(i,e,t,n)=>{let s=Se(t)?Hu(i,e):t;return s===jt.OBJECT?i[e]||0:s===jt.ATTRIBUTE?i.getAttribute(e):s===jt.TRANSFORM?US(i,e,n):s===jt.CSS_VAR?Qm(i,e,n).trimStart():Qm(i,e,n)},Sr=(i,e,t)=>t==="-"?i-e:t==="+"?i+e:i*e,Gu=()=>({t:St.NUMBER,n:0,u:null,o:null,d:null,s:null}),hi=(i,e)=>{if(e.t=St.NUMBER,e.n=0,e.u=null,e.o=null,e.d=null,e.s=null,!i)return e;let t=+i;if(isNaN(t)){let n=i;n[1]==="="&&(e.o=n[0],n=n.slice(2));let s=n.includes(" ")?!1:Pm.exec(n);if(s)return e.t=St.UNIT,e.n=+s[1],e.u=s[2],e;if(e.o)return e.n=+n,e;if(RS(n))return e.t=St.COLOR,e.d=YS(n),e;{let r=n.match(Dm);return e.t=St.COMPLEX,e.d=r?r.map(Number):[],e.s=n.split(Dm)||[],e}}else return e.n=t,e},qm=(i,e)=>(e.t=i._valueType,e.n=i._toNumber,e.u=i._unit,e.o=null,e.d=Dn(i._toNumbers),e.s=Dn(i._strings),e),Pn=Gu(),Ec={_rep:new WeakMap,_add:new Map},Vu=(i,e,t="_rep")=>{let n=Ec[t],s=n.get(i);return s||(s={},n.set(i,s)),s[e]?s[e]:s[e]={_head:null,_tail:null}},QS=(i,e)=>i._isOverridden||i._absoluteStartTime>e._absoluteStartTime,Tc=i=>{i._isOverlapped=1,i._isOverridden=1,i._changeDuration=Tt,i._currentTime=Tt},jm=(i,e)=>{let t=i._composition;if(t===mn.replace){let n=i._absoluteStartTime;ls(e,i,QS,"_prevRep","_nextRep");let s=i._prevRep;if(s){let r=s.parent,a=s._absoluteStartTime+s._changeDuration;if(i.parent.id!==r.id&&r.iterationCount>1&&a+(r.duration-r.iterationDuration)>n){Tc(s);let c=s._prevRep;for(;c&&c.parent.id===r.id;)Tc(c),c=c._prevRep}let o=n-i._delay;if(a>o){let c=s._startTime,h=a-(c+s._updateDuration);s._changeDuration=o-h-c,s._currentTime=s._changeDuration,s._isOverlapped=1,s._changeDuration<Tt&&Tc(s)}let l=!0;if(Lt(r,c=>{c._isOverlapped||(l=!1)}),l){let c=r.parent;if(c){let h=!0;Lt(c,u=>{u!==r&&Lt(u,d=>{d._isOverlapped||(h=!1)})}),h&&c.cancel()}else r.cancel()}}}else if(t===mn.blend){let n=Vu(i.target,i.property,"_add"),s=IS(Ec._add),r=n._head;r||(r={...i},r._composition=mn.replace,r._updateDuration=Tt,r._startTime=0,r._numbers=Dn(i._fromNumbers),r._number=0,r._next=null,r._prev=null,ls(n,r),ls(s,r));let a=i._toNumber;if(i._fromNumber=r._fromNumber-a,i._toNumber=0,i._numbers=Dn(i._fromNumbers),i._number=0,r._fromNumber=a,i._toNumbers){let o=Dn(i._toNumbers);o&&o.forEach((l,c)=>{i._fromNumbers[c]=r._fromNumbers[c]-l,i._toNumbers[c]=0}),r._fromNumbers=o}ls(n,i,null,"_prevAdd","_nextAdd")}return i},Zm=i=>{let e=i._composition;if(e!==mn.none){let t=i.target,n=i.property,a=Ec._rep.get(t)[n];if(os(a,i,"_prevRep","_nextRep"),e===mn.blend){let o=Ec._add,l=o.get(t);if(!l)return;let c=l[n],h=va.animation;os(c,i,"_prevAdd","_nextAdd");let u=c._head;if(u&&u===c._tail){os(c,u,"_prevAdd","_nextAdd"),os(h,u);let d=!0;for(let p in l)if(l[p]._head){d=!1;break}d&&o.delete(t)}}}return i},Km=i=>(i.paused=!0,i.began=!1,i.completed=!1,i),Wu=i=>(i._cancelled&&(i._hasChildren?Lt(i,Wu):Lt(i,e=>{e._composition!==mn.none&&jm(e,Vu(e.target,e.property))}),i._cancelled=0),i),qS=0,Nn=class extends Nu{constructor(e={},t=null,n=0){super(0);let{id:s,delay:r,duration:a,reversed:o,alternate:l,loop:c,loopDelay:h,autoplay:u,frameRate:d,playbackRate:p,onComplete:g,onLoop:v,onPause:m,onBegin:f,onBeforeUpdate:x,onUpdate:A}=e;nn.current&&nn.current.register(this);let y=t?0:sn._elapsedTime,T=t?t.defaults:lt.defaults,M=Zt(r)||Se(r)?T.delay:+r,C=Zt(a)||Se(a)?1/0:+a,R=ze(c,T.loop),b=ze(h,T.loopDelay),S=R===!0||R===1/0||R<0?1/0:R+1,D=0;if(t)D=n;else{let N=vr();sn.paused&&(sn.requestTick(N),N=sn._elapsedTime),D=N-sn._startTime}this.id=Se(s)?++qS:s,this.parent=t,this.duration=Sc((C+b)*S-b)||Tt,this.backwards=!1,this.paused=!0,this.began=!1,this.completed=!1,this.onBegin=f||T.onBegin,this.onBeforeUpdate=x||T.onBeforeUpdate,this.onUpdate=A||T.onUpdate,this.onLoop=v||T.onLoop,this.onPause=m||T.onPause,this.onComplete=g||T.onComplete,this.iterationDuration=C,this.iterationCount=S,this._autoplay=t?!1:ze(u,T.autoplay),this._offset=D,this._delay=M,this._loopDelay=b,this._iterationTime=0,this._currentIteration=0,this._resolve=rt,this._running=!1,this._reversed=+ze(o,T.reversed),this._reverse=this._reversed,this._cancelled=0,this._alternate=ze(l,T.alternate),this._prev=null,this._next=null,this._elapsedTime=y,this._startTime=y,this._lastTime=y,this._fps=ze(d,T.frameRate),this._speed=ze(p,T.playbackRate)}get cancelled(){return!!this._cancelled}set cancelled(e){e?this.cancel():this.reset(1).play()}get currentTime(){return Xe(Ne(this._currentTime,lt.precision),-this._delay,this.duration)}set currentTime(e){let t=this.paused;this.pause().seek(+e),t||this.resume()}get iterationCurrentTime(){return Ne(this._iterationTime,lt.precision)}set iterationCurrentTime(e){this.currentTime=this.iterationDuration*this._currentIteration+e}get progress(){return Xe(Ne(this._currentTime/this.duration,10),0,1)}set progress(e){this.currentTime=this.duration*e}get iterationProgress(){return Xe(Ne(this._iterationTime/this.iterationDuration,10),0,1)}set iterationProgress(e){let t=this.iterationDuration;this.currentTime=t*this._currentIteration+t*e}get currentIteration(){return this._currentIteration}set currentIteration(e){this.currentTime=this.iterationDuration*Xe(+e,0,this.iterationCount-1)}get reversed(){return!!this._reversed}set reversed(e){e?this.reverse():this.play()}get speed(){return super.speed}set speed(e){super.speed=e,this.resetTime()}reset(e=0){return Wu(this),this._reversed&&!this._reverse&&(this.reversed=!1),this._iterationTime=this.iterationDuration,Ar(this,0,1,e,Kn.FORCE),Km(this),this._hasChildren&&Lt(this,Km),this}init(e=0){this.fps=this._fps,this.speed=this._speed,!e&&this._hasChildren&&Ar(this,this.duration,1,e,Kn.FORCE),this.reset(e);let t=this._autoplay;return t===!0?this.resume():t&&!Se(t.linked)&&t.link(this),this}resetTime(){let e=1/(this._speed*sn._speed);return this._startTime=vr()-(this._currentTime+this._delay)*e,this}pause(){return this.paused?this:(this.paused=!0,this.onPause(this),this)}resume(){return this.paused?(this.paused=!1,this.duration<=Tt&&!this._hasChildren?Ar(this,Tt,0,0,Kn.FORCE):(this._running||(ls(sn,this),sn._hasChildren=!0,this._running=!0),this.resetTime(),this._startTime-=12,sn.wake()),this):this}restart(){return this.reset(0).resume()}seek(e,t=0,n=0){Wu(this),this.completed=!1;let s=this.paused;return this.paused=!0,Ar(this,e+this._delay,~~t,~~n,Kn.AUTO),s?this:this.resume()}alternate(){let e=this._reversed,t=this.iterationCount,n=this.iterationDuration,s=t===1/0?ao(da/n):t;return this._reversed=+(this._alternate&&!(s%2)?e:!e),t===1/0?this.iterationProgress=this._reversed?1-this.iterationProgress:this.iterationProgress:this.seek(n*s-this._currentTime),this.resetTime(),this}play(){return this._reversed&&this.alternate(),this.resume()}reverse(){return this._reversed||this.alternate(),this.resume()}cancel(){return this._hasChildren?Lt(this,e=>e.cancel(),!0):Lt(this,Zm),this._cancelled=1,this.pause()}stretch(e){let t=this.duration,n=ga(e);if(t===n)return this;let s=e/t,r=e<=Tt;return this.duration=r?Tt:n,this.iterationDuration=r?Tt:ga(this.iterationDuration*s),this._offset*=s,this._delay*=s,this._loopDelay*=s,this}revert(){Ar(this,0,1,0,Kn.AUTO);let e=this._autoplay;return e&&e.linked&&e.linked===this&&e.revert(),this.cancel()}complete(){return this.seek(this.duration).cancel()}then(e=rt){let t=this.then,n=()=>{this.then=null,e(this),this.then=t,this._resolve=rt};return new Promise(s=>(this._resolve=()=>s(n()),this.completed&&this._resolve(),this))}},Bn=i=>new Nn(i,null,0).init(),cs=i=>i,Jm=(i,e,t)=>(((1-3*t+3*e)*i+(3*t-6*e))*i+3*e)*i,jS=(i,e,t)=>{let n=0,s=1,r,a,o=0;do a=n+(s-n)/2,r=Jm(a,e,t)-i,r>0?s=a:n=a;while(Ni(r)>1e-7&&++o<100);return a},ZS=(i=.5,e=0,t=.5,n=1)=>i===e&&t===n?cs:s=>s===0||s===1?s:Jm(jS(s,i,t),e,n),KS=(i=10,e)=>{let t=e?DS:ao;return n=>t(Xe(n,0,1)*i)*(1/i)},$m=(...i)=>{let e=i.length;if(!e)return cs;let t=e-1,n=i[0],s=i[t],r=[0],a=[xr(n)];for(let o=1;o<t;o++){let l=i[o],c=Un(l)?l.trim().split(" "):[l],h=c[0],u=c[1];r.push(Se(u)?o/t:xr(u)/100),a.push(xr(h))}return a.push(xr(s)),r.push(1),function(l){for(let c=1,h=r.length;c<h;c++){let u=r[c];if(l<=u){let d=r[c-1],p=a[c-1];return p+(a[c]-p)*(l-d)/(u-d)}}return a[a.length-1]}},JS=(i=10,e=1)=>{let t=[0],n=i-1;for(let s=1;s<n;s++){let r=t[s-1],a=s/n,o=(s+1)/n,l=a+(o-a)*Math.random(),c=a*(1-e)+l*e;t.push(Xe(c,r,1))}return t.push(1),$m(...t)},$S=ma/2,eg=ma*2,xa=(i=1.68)=>e=>pa(e,+i),tg={[rs]:xa,Quad:xa(2),Cubic:xa(3),Quart:xa(4),Quint:xa(5),Sine:i=>1-Iu(i*$S),Circ:i=>1-Is(1-i*i),Expo:i=>i?pa(2,10*i-10):0,Bounce:i=>{let e,t=4;for(;i<((e=pa(2,--t))-1)/11;);return 1/pa(4,3-t)-7.5625*pa((e*3-2)/22-i,2)},Back:(i=1.70158)=>e=>(+i+1)*e*e*e-+i*e*e,Elastic:(i=1,e=.3)=>{let t=Xe(+i,1,10),n=Xe(+e,Tt,2),s=n/eg*PS(1/t),r=eg/n;return a=>a===0||a===1?a:-t*pa(2,-10*(1-a))*Pu((1-a-s)*r)}},co={in:i=>e=>i(e),out:i=>e=>1-i(1-e),inOut:i=>e=>e<.5?i(e*2)/2:1-i(e*-2+2)/2,outIn:i=>e=>e<.5?(1-i(1-e*2))/2:(i(e*2-1)+1)/2},ng=(i,e,t)=>{if(t[i])return t[i];if(i.indexOf("(")<=-1){let s=co[i]||i.includes("Back")||i.includes("Elastic")?e[i]():e[i];return s?t[i]=s:cs}else{let n=i.slice(0,-1).split("("),s=e[n[0]];return s?t[i]=s(...n[1].split(",")):cs}},ui=(()=>{let i={linear:$m,irregular:JS,steps:KS,cubicBezier:ZS};for(let e in co)for(let t in tg){let n=tg[t],s=co[e];i[e+t]=t===rs||t==="Back"||t==="Elastic"?(r,a)=>s(n(r,a)):s(n)}return i})(),eb={linear:cs},br=i=>Zt(i)?i:Un(i)?ng(i,ui,eb):cs,ig={},Xu=(i,e,t)=>{if(t===jt.TRANSFORM){let n=Cu.get(i);return n||i}else if(t===jt.CSS||t===jt.ATTRIBUTE&&Du(e)&&i in e.style){let n=ig[i];if(n)return n;{let s=i&&Um(i);return ig[i]=s,s}}else return i},Yu={deg:1,rad:180/ma,turn:360},sg={},Qu=(i,e,t,n=!1)=>{let s=e.u,r=e.n;if(e.t===St.UNIT&&s===t)return e;let a=r+s+t,o=sg[a];if(!Se(o)&&!n)e.n=o;else{let l;if(s in Yu)l=r*Yu[s]/Yu[t];else{let c=100,h=i.cloneNode(),u=i.parentNode,d=u&&u!==Ve?u:Ve.body;d.appendChild(h);let p=h.style;p.width=c+s;let g=h.offsetWidth||c;p.width=c+t;let v=h.offsetWidth||c,m=g/v;d.removeChild(h),l=m*r}e.n=l,sg[a]=l}return e.t,St.UNIT,e.u=t,e},Mc=i=>{if(i._hasChildren)Lt(i,Mc,!0);else{let e=i;e.pause(),Lt(e,t=>{let n=t.property,s=t.target;if(s[Ac]){let r=s.style,a=e._inlineStyles[n];if(t._tweenType===jt.TRANSFORM){let o=s[io];if(Se(a)||a===rs?delete o[n]:o[n]=a,t._renderTransforms)if(!Object.keys(o).length)r.removeProperty("transform");else{let l=rs;for(let c in o)l+=Ru[c]+o[c]+") ";r.transform=l}}else Se(a)||a===rs?r.removeProperty(n):r[n]=a;e._tail===t&&e.targets.forEach(o=>{o.getAttribute&&o.getAttribute("style")===rs&&o.removeAttribute("style")})}})}return i},ct=Gu(),dt=Gu(),wc={func:null},Cc=[null],ya=[null,null],Rc={to:null},tb=0,Ls,Bi,nb=(i,e)=>{let t={};if(Rn(i)){let n=[].concat(...i.map(s=>Object.keys(s))).filter(fa);for(let s=0,r=n.length;s<r;s++){let a=n[s],o=i.map(l=>{let c={};for(let h in l){let u=l[h];fa(h)?h===a&&(c.to=u):c[h]=u}return c});t[a]=o}}else{let n=ze(e.duration,lt.defaults.duration);Object.keys(i).map(r=>({o:parseFloat(r)/100,p:i[r]})).sort((r,a)=>r.o-a.o).forEach(r=>{let a=r.o,o=r.p;for(let l in o)if(fa(l)){let c=t[l];c||(c=t[l]=[]);let h=a*n,u=c.length,d=c[u-1],p={to:o[l]},g=0;for(let v=0;v<u;v++)g+=c[v].duration;u===1&&(p.from=d.to),o.ease&&(p.ease=o.ease),p.duration=h-(u?g:0),c.push(p)}return r});for(let r in t){let a=t[r],o;for(let l=0,c=a.length;l<c;l++){let h=a[l],u=h.ease;h.ease=o||void 0,o=u}a[0].duration||a.shift()}}return t},Fs=class extends Nn{constructor(e,t,n,s,r=!1,a=0,o=0){super(t,n,s);let l=lo(e),c=l.length,h=t.keyframes,u=h?oo(nb(h,t),t):t,{delay:d,duration:p,ease:g,playbackEase:v,modifier:m,composition:f,onRender:x}=u,A=n?n.defaults:lt.defaults,y=ze(v,A.playbackEase),T=y?br(y):null,M=!Se(g)&&!Se(g.ease),C=M?g.ease:ze(g,T?"linear":A.ease),R=M?g.duration:ze(p,A.duration),b=ze(d,A.delay),S=m||A.modifier,D=Se(f)&&c>=Jt?mn.none:Se(f)?A.composition:f,N={},U=this._offset+(n?n._offset:0),B=NaN,W=NaN,G=0,I=0;for(let P=0;P<c;P++){let L=l[P],J=a||P,ae=o||c,ve=NaN,le=NaN;for(let V in u)if(fa(V)){let j=Hu(L,V),ie=Xu(V,L,j),ue=u[V],Ie=Rn(ue);if(r&&!Ie&&(ya[0]=ue,ya[1]=ue,ue=ya),Ie){let F=ue.length,Dt=!ln(ue[0]);F===2&&Dt?(Rc.to=ue,Cc[0]=Rc,Ls=Cc):F>2&&Dt?(Ls=[],ue.forEach((Be,qe)=>{qe?qe===1?(ya[1]=Be,Ls.push(ya)):Ls.push(Be):ya[0]=Be})):Ls=ue}else Cc[0]=ue,Ls=Cc;let De=null,He=null,$e=NaN,We=0,Je=0;for(let F=Ls.length;Je<F;Je++){let Dt=Ls[Je];ln(Dt)?Bi=Dt:(Rc.to=Dt,Bi=Rc),wc.func=null;let Be=ei(Bi.to,L,J,ae,wc),qe;ln(Be)&&!Se(Be.to)?(Bi=Be,qe=Be.to):qe=Be;let Le=ei(Bi.from,L,J,ae),pe=Bi.ease,xe=!Se(pe)&&!Se(pe.ease),w=xe?pe.ease:pe||C,_=xe?pe.duration:ei(ze(Bi.duration,F>1?ei(R,L,J,ae)/F:R),L,J,ae),Y=ei(ze(Bi.delay,Je?0:b),L,J,ae),$=ei(ze(Bi.composition,D),L,J,ae),se=Jn($)?$:mn[$],te=Bi.modifier||S,Z=!Se(Le),K=!Se(qe),oe=Rn(qe),Te=oe||Z&&K,re=He?We+Y:Y,ge=U+re;!I&&(Z||oe)&&(I=1);let Fe=He;if(se!==mn.none){De||(De=Vu(L,ie));let Ue=De._head;for(;Ue&&!Ue._isOverridden&&Ue._absoluteStartTime<=ge;)if(Fe=Ue,Ue=Ue._nextRep,Ue&&Ue._absoluteStartTime>=ge)for(;Ue;)Tc(Ue),Ue=Ue._nextRep}if(Te?(hi(oe?ei(qe[0],L,J,ae):Le,ct),hi(oe?ei(qe[1],L,J,ae,wc):qe,dt),ct.t===St.NUMBER&&(Fe?Fe._valueType===St.UNIT&&(ct.t=St.UNIT,ct.u=Fe._unit):(hi(_r(L,ie,j,N),Pn),Pn.t===St.UNIT&&(ct.t=St.UNIT,ct.u=Pn.u)))):(K?hi(qe,dt):He?qm(He,dt):hi(n&&Fe&&Fe.parent.parent===n?Fe._value:_r(L,ie,j,N),dt),Z?hi(Le,ct):He?qm(He,ct):hi(n&&Fe&&Fe.parent.parent===n?Fe._value:_r(L,ie,j,N),ct)),ct.o&&(ct.n=Sr(Fe?Fe._toNumber:hi(_r(L,ie,j,N),Pn).n,ct.n,ct.o)),dt.o&&(dt.n=Sr(ct.n,dt.n,dt.o)),ct.t!==dt.t){if(ct.t===St.COMPLEX||dt.t===St.COMPLEX){let Ue=ct.t===St.COMPLEX?ct:dt,Ge=ct.t===St.COMPLEX?dt:ct;Ge.t=St.COMPLEX,Ge.s=Dn(Ue.s),Ge.d=Ue.d.map(()=>Ge.n)}else if(ct.t===St.UNIT||dt.t===St.UNIT){let Ue=ct.t===St.UNIT?ct:dt,Ge=ct.t===St.UNIT?dt:ct;Ge.t=St.UNIT,Ge.u=Ue.u}else if(ct.t===St.COLOR||dt.t===St.COLOR){let Ue=ct.t===St.COLOR?ct:dt,Ge=ct.t===St.COLOR?dt:ct;Ge.t=St.COLOR,Ge.s=Ue.s,Ge.d=[0,0,0,1]}}if(ct.u!==dt.u){let Ue=dt.u?ct:dt;Ue=Qu(L,Ue,dt.u?dt.u:ct.u,!1)}if(dt.d&&ct.d&&dt.d.length!==ct.d.length){let Ue=ct.d.length>dt.d.length?ct:dt,Ge=Ue===ct?dt:ct;Ge.d=Ue.d.map((Pt,k)=>Se(Ge.d[k])?0:Ge.d[k]),Ge.s=Dn(Ue.s)}let Qe=Ne(+_||Tt,12),we={parent:this,id:tb++,property:ie,target:L,_value:null,_func:wc.func,_ease:br(w),_fromNumbers:Dn(ct.d),_toNumbers:Dn(dt.d),_strings:Dn(dt.s),_fromNumber:ct.n,_toNumber:dt.n,_numbers:Dn(ct.d),_number:ct.n,_unit:dt.u,_modifier:te,_currentTime:0,_startTime:re,_delay:+Y,_updateDuration:Qe,_changeDuration:Qe,_absoluteStartTime:ge,_tweenType:j,_valueType:dt.t,_composition:se,_isOverlapped:0,_isOverridden:0,_renderTransforms:0,_prevRep:null,_nextRep:null,_prevAdd:null,_nextAdd:null,_prev:null,_next:null};se!==mn.none&&jm(we,De),isNaN($e)&&($e=we._startTime),We=Ne(re+Qe,12),He=we,G++,ls(this,we)}(isNaN(W)||$e<W)&&(W=$e),(isNaN(B)||We>B)&&(B=We),j===jt.TRANSFORM&&(ve=G-Je,le=G)}if(!isNaN(ve)){let V=0;Lt(this,j=>{V>=ve&&V<le&&(j._renderTransforms=1,j._composition===mn.blend&&Lt(va.animation,ie=>{ie.id===j.id&&(ie._renderTransforms=1)})),V++})}}c||console.warn("No target found. Make sure the element you're trying to animate is accessible before creating your animation."),W?(Lt(this,P=>{P._startTime-P._delay||(P._delay-=W),P._startTime-=W}),B-=W):W=0,B||(B=Tt,this.iterationCount=0),this.targets=l,this.duration=B===Tt?Tt:Sc((B+this._loopDelay)*this.iterationCount-this._loopDelay)||Tt,this.onRender=x||A.onRender,this._ease=T,this._delay=W,this.iterationDuration=B,this._inlineStyles=N,!this._autoplay&&I&&this.onRender(this)}stretch(e){let t=this.duration;if(t===ga(e))return this;let n=e/t;return Lt(this,s=>{s._updateDuration=ga(s._updateDuration*n),s._changeDuration=ga(s._changeDuration*n),s._currentTime*=n,s._startTime*=n,s._absoluteStartTime*=n}),super.stretch(e)}refresh(){return Lt(this,e=>{let t=e._func;if(t){let n=_r(e.target,e.property,e._tweenType);hi(n,Pn),hi(t(),dt),e._fromNumbers=Dn(Pn.d),e._fromNumber=Pn.n,e._toNumbers=Dn(dt.d),e._strings=Dn(dt.s),e._toNumber=dt.o?Sr(Pn.n,dt.n,dt.o):dt.n}}),this}revert(){return super.revert(),Mc(this)}then(e){return super.then(e)}},Re=(i,e)=>new Fs(i,e,null,0,!1).init(),Dc=(i,e=100)=>{let t=[];for(let n=0;n<=e;n++)t.push(i(n/e));return`linear(${t.join(", ")})`},qu={in:"ease-in",out:"ease-out",inOut:"ease-in-out"},ib=(()=>{let i={};for(let e in co)i[e]=t=>co[e](xa(t));return i})(),ju=i=>{let e=qu[i];if(e)return e;if(e="linear",Un(i)){if(un(i,"linear")||un(i,"cubic-")||un(i,"steps")||un(i,"ease"))e=i;else if(un(i,"cubicB"))e=Um(i);else{let t=ng(i,ib,qu);Zt(t)&&(e=t===cs?"linear":Dc(t))}qu[i]=e}else if(Zt(i)){let t=Dc(i);t&&(e=t)}else i.ease&&(e=Dc(i.ease));return e},rg=["x","y","z"],sb=["perspective","width","height","margin","padding","top","right","bottom","left","borderWidth","fontSize","borderRadius",...rg],rb=(()=>[...rg,...so.filter(i=>["X","Y","Z"].some(e=>i.endsWith(e)))])(),Zu=null,Ku={_head:null,_tail:null},Ju=(i,e,t)=>{let n=Ku._head;for(;n;){let s=n._next,r=n.$el===i,a=!e||n.property===e,o=!t||n.parent===t;if(r&&a&&o){let l=n.animation;try{l.commitStyles()}catch{}l.cancel(),os(Ku,n);let c=n.parent;c&&(c._completed++,c.animations.length===c._completed&&(c.completed=!0,c.muteCallbacks||(c.paused=!0,c.onComplete(c),c._resolve(c))))}n=s}},ag=(i,e,t,n,s)=>{let r=e.animate(n,s),a=s.delay+ +s.duration*s.iterations;r.playbackRate=i._speed,i.paused&&r.pause(),i.duration<a&&(i.duration=a,i.controlAnimation=r),i.animations.push(r),Ju(e,t),ls(Ku,{parent:i,animation:r,$el:e,property:t,_next:null,_prev:null});let o=()=>{Ju(e,t,i)};return r.onremove=o,r.onfinish=o,r},ho=(i,e,t,n,s)=>{let r=ei(e,t,n,s);return Jn(r)?sb.includes(i)||un(i,"translate")?`${r}px`:un(i,"rotate")||un(i,"skew")?`${r}deg`:`${r}`:r},og=(i,e,t,n,s,r)=>{let a="0",o=Se(n)?getComputedStyle(i)[e]:ho(e,n,i,s,r);return Se(t)?a=Rn(n)?n.map(l=>ho(e,l,i,s,r)):o:a=[ho(e,t,i,s,r),o],a},lg=class{constructor(e,t){nn.current&&nn.current.register(this),ro(Zu)&&(Ti&&(Se(CSS)||!Object.hasOwnProperty.call(CSS,"registerProperty"))?Zu=!1:(so.forEach(f=>{let x=un(f,"skew"),A=un(f,"scale"),y=un(f,"rotate"),T=un(f,"translate"),M=y||x,C=M?"<angle>":A?"<number>":T?"<length-percentage>":"*";try{CSS.registerProperty({name:"--"+f,syntax:C,inherits:!1,initialValue:T?"0px":M?"0deg":A?"1":"0"})}catch{}}),Zu=!0));let n=lo(e),s=n.length;s||console.warn("No target found. Make sure the element you're trying to animate is accessible before creating your animation.");let r=ze(t.ease,ju(lt.defaults.ease)),a=r.ease&&r,o=ze(t.autoplay,lt.defaults.autoplay),l=o&&o.link?o:!1,c=t.alternate&&t.alternate===!0,h=t.reversed&&t.reversed===!0,u=ze(t.loop,lt.defaults.loop),d=u===!0||u===1/0?1/0:Jn(u)?u+1:1,p=c?h?"alternate-reverse":"alternate":h?"reverse":"normal",g="forwards",v=ju(r),m=lt.timeScale===1?1:Jt;this.targets=n,this.animations=[],this.controlAnimation=null,this.onComplete=t.onComplete||rt,this.duration=0,this.muteCallbacks=!1,this.completed=!1,this.paused=!o||l!==!1,this.reversed=h,this.autoplay=o,this._speed=ze(t.playbackRate,lt.defaults.playbackRate),this._resolve=rt,this._completed=0,this._inlineStyles=n.map(f=>f.getAttribute("style")),n.forEach((f,x)=>{let A=f[io],y=rb.some(R=>t.hasOwnProperty(R)),T=(a?a.duration:ei(ze(t.duration,lt.defaults.duration),f,x,s))*m,M=ei(ze(t.delay,lt.defaults.delay),f,x,s)*m,C=ze(t.composition,"replace");for(let R in t){if(!fa(R))continue;let b={},S={iterations:d,direction:p,fill:g,easing:v,duration:T,delay:M,composite:C},D=t[R],N=y?so.includes(R)?R:Cu.get(R):!1,U;if(ln(D)){let B=D,W=ze(B.ease,r),G=W.ease&&W,I=B.to,P=B.from;if(S.duration=(G?G.duration:ei(ze(B.duration,T),f,x,s))*m,S.delay=ei(ze(B.delay,M),f,x,s)*m,S.composite=ze(B.composition,C),S.easing=ju(W),U=og(f,R,P,I,x,s),N?(b[`--${N}`]=U,A[N]=U):b[R]=og(f,R,P,I,x,s),ag(this,f,R,b,S),!Se(P))if(!N)f.style[R]=b[R][0];else{let L=`--${N}`;f.style.setProperty(L,b[L][0])}}else U=Rn(D)?D.map(B=>ho(R,B,f,x,s)):ho(R,D,f,x,s),N?(b[`--${N}`]=U,A[N]=U):b[R]=U,ag(this,f,R,b,S)}if(y){let R=rs;for(let b in A)R+=`${Ru[b]}var(--${b})) `;f.style.transform=R}}),l&&this.autoplay.link(this)}forEach(e){let t=Un(e)?n=>n[e]():e;return this.animations.forEach(t),this}get speed(){return this._speed}set speed(e){this._speed=+e,this.forEach(t=>t.playbackRate=e)}get currentTime(){let e=this.controlAnimation,t=lt.timeScale;return this.completed?this.duration:e?+e.currentTime*(t===1?1:t):0}set currentTime(e){let t=e*(lt.timeScale===1?1:Jt);this.forEach(n=>{t>=this.duration&&n.play(),n.currentTime=t})}get progress(){return this.currentTime/this.duration}set progress(e){this.forEach(t=>t.currentTime=e*this.duration||0)}resume(){return this.paused?(this.paused=!1,this.forEach("play")):this}pause(){return this.paused?this:(this.paused=!0,this.forEach("pause"))}alternate(){return this.reversed=!this.reversed,this.forEach("reverse"),this.paused&&this.forEach("pause"),this}play(){return this.reversed&&this.alternate(),this.resume()}reverse(){return this.reversed||this.alternate(),this.resume()}seek(e,t=!1){return t&&(this.muteCallbacks=!0),e<this.duration&&(this.completed=!1),this.currentTime=e,this.muteCallbacks=!1,this.paused&&this.pause(),this}restart(){return this.completed=!1,this.seek(0,!0).resume()}commitStyles(){return this.forEach("commitStyles")}complete(){return this.seek(this.duration)}cancel(){return this.forEach("cancel"),this.pause()}revert(){return this.cancel(),this.targets.forEach((e,t)=>e.setAttribute("style",this._inlineStyles[t])),this}then(e=rt){let t=this.then,n=()=>{this.then=null,e(this),this.then=t,this._resolve=rt};return new Promise(s=>(this._resolve=()=>s(n()),this.completed&&this._resolve(),this))}},cg={animate:(i,e)=>new lg(i,e),convertEase:Dc},hg=(i=rt)=>new Nn({duration:1*lt.timeScale,onComplete:i},null,0).resume();function Er(i,e,t){let n=lo(i);if(!n.length)return;let[s]=n,r=Hu(s,e),a=Xu(e,s,r),o=_r(s,a);if(Se(t))return o;if(hi(o,Pn),Pn.t===St.NUMBER||Pn.t===St.UNIT){if(t===!1)return Pn.n;{let l=Qu(s,Pn,t,!1);return`${Ne(l.n,lt.precision)}${l.u}`}}}var Us=(i,e)=>{if(!Se(e))return e.duration=Tt,e.composition=ze(e.composition,mn.none),new Fs(i,e,null,0,!0).resume()},ug=(i,e,t)=>{let n=!1;return Lt(e,s=>{let r=s.target;if(i.includes(r)){let a=s.property,o=s._tweenType,l=Xu(t,r,o);(!l||l&&l===a)&&(s.parent._tail===s&&s._tweenType===jt.TRANSFORM&&s._prev&&s._prev._tweenType===jt.TRANSFORM&&(s._prev._renderTransforms=1),os(e,s),Zm(s),n=!0)}},!0),n},hs=(i,e,t)=>{let n=ci(i),s=e||sn,r=e&&e.controlAnimation&&e;for(let o=0,l=n.length;o<l;o++){let c=n[o];Ju(c,t,r)}let a;if(s._hasChildren){let o=0;Lt(s,l=>{if(!l._hasChildren)if(a=ug(n,l,t),a&&!l._head)l.cancel(),os(s,l);else{let h=l._offset+l._delay+l.duration;h>o&&(o=h)}l._head?hs(i,l,t):l._hasChildren=!1},!0),Se(s.iterationDuration)||(s.iterationDuration=o)}else a=ug(n,s,t);return a&&!s._head&&(s._hasChildren=!1,s.cancel&&s.cancel()),n},ab=Uu,ob=i=>i[Fu(0,i.length-1)],lb=(i,e)=>(+i).toFixed(e),cb=(i,e,t)=>`${i}`.padStart(e,t),hb=(i,e,t)=>`${i}`.padEnd(e,t),ub=(i,e,t)=>((i-e)%(t-e)+(t-e))%(t-e)+e,uo=(i,e,t,n,s)=>n+(i-e)/(t-e)*(s-n),db=i=>i*ma/180,fb=i=>i*180/ma,dg=(i,e,t,n)=>{let s=Jt/lt.defaults.frameRate;if(n!==!1){let a=n||sn._hasChildren&&sn;a&&a.deltaTime&&(s=a.deltaTime)}let r=1-Math.exp(-t*s*.1);return t?t===1?e:(1-r)*i+r*e:i},pb=(i,e=0)=>(...t)=>e?n=>i(...t,n):n=>i(n,...t),fg=i=>(...e)=>{let t=i(...e);return new Proxy(rt,{apply:(n,s,[r])=>t(r),get:(n,s)=>fg((...r)=>{let a=H[s](...r);return o=>a(t(o))})})},Mi=(i,e=0)=>(...t)=>(t.length<i.length?fg(pb(i,e)):i)(...t),H={$:lo,get:Er,set:Us,remove:hs,cleanInlineStyles:Mc,random:Fu,randomPick:ob,shuffle:Gm,lerp:dg,sync:hg,keepTime:ab,clamp:Mi(Xe),round:Mi(Ne),snap:Mi(yr),wrap:Mi(ub),interpolate:Mi(as,1),mapRange:Mi(uo),roundPad:Mi(lb),padStart:Mi(cb),padEnd:Mi(hb),degToRad:Mi(db),radToDeg:Mi(fb)},mb=(i,e)=>{if(un(e,"<")){let t=e[1]==="<",n=i._tail,s=n?n._offset+n._delay:0;return t?s:s+n.duration}},Pc=(i,e)=>{let t=i.iterationDuration;if(t===Tt&&(t=0),Se(e))return t;if(Jn(+e))return+e;let n=e,s=i?i.labels:null,r=!ro(s),a=mb(i,n),o=!Se(a),l=Im.exec(n);if(l){let c=l[0],h=n.split(c),u=r&&h[0]?s[h[0]]:t,d=o?a:r?u:t,p=+h[1];return Sr(d,p,c[0])}else return o?a:r?Se(s[n])?t:s[n]:t};function gb(i){return Sc((i.iterationDuration+i._loopDelay)*i.iterationCount-i._loopDelay)||Tt}function $u(i,e,t,n,s,r){let o=Jn(i.duration)&&i.duration<=Tt?t-Tt:t;Ar(e,o,1,1,Kn.AUTO);let l=n?new Fs(n,i,e,o,!1,s,r):new Nn(i,e,o);return l.init(1),ls(e,l),Lt(e,c=>{let u=c._offset+c._delay+c.duration;u>e.iterationDuration&&(e.iterationDuration=u)}),e.duration=gb(e),e}var pg=class extends Nn{constructor(e={}){super(e,null,0);this.duration=0,this.labels={};let t=e.defaults,n=lt.defaults;this.defaults=t?oo(t,n):n,this.onRender=e.onRender||n.onRender;let s=ze(e.playbackEase,n.playbackEase);this._ease=s?br(s):null,this.iterationDuration=0}add(e,t,n){let s=ln(t),r=ln(e);if(s||r){if(this._hasChildren=!0,s){let a=t;if(Zt(n)){let o=n,l=ci(e),c=this.duration,h=this.iterationDuration,u=a.id,d=0,p=l.length;l.forEach(g=>{let v={...a};this.duration=c,this.iterationDuration=h,Se(u)||(v.id=u+"-"+d),$u(v,this,o(g,d,p,this),g,d,p),d++})}else $u(a,this,Pc(this,n),e)}else $u(e,this,Pc(this,t));return this.init(1)}}sync(e,t){if(Se(e)||e&&Se(e.pause))return this;e.pause();let n=+(e.effect?e.effect.getTiming().duration:e.duration);return this.add(e,{currentTime:[0,n],duration:n,ease:"linear"},t)}set(e,t,n){return Se(t)?this:(t.duration=Tt,t.composition=mn.replace,this.add(e,t,n))}call(e,t){return Se(e)||e&&!Zt(e)?this:this.add({duration:0,onComplete:()=>e(this)},t)}label(e,t){return Se(e)||e&&!Un(e)?this:(this.labels[e]=Pc(this,t),this)}remove(e,t){return hs(e,this,t),this}stretch(e){let t=this.duration;if(t===ga(e))return this;let n=e/t,s=this.labels;Lt(this,r=>r.stretch(r.duration*n));for(let r in s)s[r]*=n;return super.stretch(e)}refresh(){return Lt(this,e=>{e.refresh&&e.refresh()}),this}revert(){return super.revert(),Lt(this,e=>e.revert,!0),Mc(this)}then(e){return super.then(e)}},Ke=i=>new pg(i).init(),ed=class{constructor(e,t){nn.current&&nn.current.register(this);let n={},s={};if(this.targets=[],this.animations={},!(Se(e)||Se(t))){for(let r in t){let a=t[r];fa(r)?s[r]=a:n[r]=a}for(let r in s){let a=s[r],o=ln(a),l={},c="+=0";if(o){let d=a.unit;Un(d)&&(c+=d)}else l.duration=a;l[r]=o?oo({to:c},a):c;let h=oo(n,l);h.composition=mn.replace,h.autoplay=!1;let u=this.animations[r]=new Fs(e,h,null,0,!1).init();this.targets.length||this.targets.push(...u.targets),this[r]=(d,p,g)=>{let v=u._head;if(Se(d)&&v){let m=v._numbers;return m&&m.length?m:v._modifier(v._number)}else return Lt(u,m=>{if(Rn(d))for(let f=0,x=d.length;f<x;f++)Se(m._numbers[f])||(m._fromNumbers[f]=m._modifier(m._numbers[f]),m._toNumbers[f]=d[f]);else m._fromNumber=m._modifier(m._number),m._toNumber=d;Se(g)||(m._ease=br(g)),m._currentTime=0}),Se(p)||u.stretch(p),u.reset(1).resume(),this}}}}revert(){for(let e in this.animations)this[e]=rt,this.animations[e].revert();return this.animations={},this.targets.length=0,this}},fo=(i,e)=>new ed(i,e),mg=class{constructor(e={}){this.timeStep=.02,this.restThreshold=5e-4,this.restDuration=200,this.maxDuration=6e4,this.maxRestSteps=this.restDuration/this.timeStep/Jt,this.maxIterations=this.maxDuration/this.timeStep/Jt,this.m=Xe(ze(e.mass,1),0,Jt),this.s=Xe(ze(e.stiffness,100),1,Jt),this.d=Xe(ze(e.damping,10),.1,Jt),this.v=Xe(ze(e.velocity,0),-1e3,Jt),this.w0=0,this.zeta=0,this.wd=0,this.b=0,this.solverDuration=0,this.duration=0,this.compute(),this.ease=t=>t===0||t===1?t:this.solve(t*this.solverDuration)}solve(e){let{zeta:t,w0:n,wd:s,b:r}=this,a=e;return t<1?a=km(-a*t*n)*(1*Iu(s*a)+r*Pu(s*a)):a=(1+r*a)*km(-a*n),1-a}compute(){let{maxRestSteps:e,maxIterations:t,restThreshold:n,timeStep:s,m:r,d:a,s:o,v:l}=this,c=this.w0=Xe(Is(o/r),Tt,Jt),h=this.zeta=a/(2*Is(o*r)),u=this.wd=h<1?c*Is(1-h*h):0;this.b=h<1?(h*c+-l)/u:-l+c;let d=0,p=0,g=0;for(;p<e&&g<t;)Ni(1-this.solve(d))<n?p++:p=0,this.solverDuration=d,d+=s,g++;this.duration=Ne(this.solverDuration*Jt,0)*lt.timeScale}get mass(){return this.m}set mass(e){this.m=Xe(ze(e,1),0,Jt),this.compute()}get stiffness(){return this.s}set stiffness(e){this.s=Xe(ze(e,100),1,Jt),this.compute()}get damping(){return this.d}set damping(e){this.d=Xe(ze(e,10),.1,Jt),this.compute()}get velocity(){return this.v}set velocity(e){this.v=Xe(ze(e,0),-1e3,Jt),this.compute()}},wi=i=>new mg(i),Ns=i=>{i.cancelable&&i.preventDefault()},gg=class{constructor(e){this.el=e,this.zIndex=0,this.parentElement=null,this.classList={add:rt,remove:rt}}get x(){return this.el.x||0}set x(e){this.el.x=e}get y(){return this.el.y||0}set y(e){this.el.y=e}get width(){return this.el.width||0}set width(e){this.el.width=e}get height(){return this.el.height||0}set height(e){this.el.height=e}getBoundingClientRect(){return{top:this.y,right:this.x,bottom:this.y+this.height,left:this.x+this.width}}},vg=class{constructor(e){this.$el=e,this.inlineTransforms=[],this.point=new DOMPoint,this.inversedMatrix=this.getMatrix().inverse()}normalizePoint(e,t){return this.point.x=e,this.point.y=t,this.point.matrixTransform(this.inversedMatrix)}traverseUp(e){let t=this.$el.parentElement,n=0;for(;t&&t!==Ve;)e(t,n),t=t.parentElement,n++}getMatrix(){let e=new DOMMatrix;return this.traverseUp(t=>{let n=getComputedStyle(t).transform;if(n){let s=new DOMMatrix(n);e.preMultiplySelf(s)}}),e}remove(){this.traverseUp((e,t)=>{this.inlineTransforms[t]=e.style.transform,e.style.transform="none"})}revert(){this.traverseUp((e,t)=>{let n=this.inlineTransforms[t];n===""?e.style.removeProperty("transform"):e.style.transform=n})}},On=(i,e)=>i&&Zt(i)?i(e):i,Ic=0,xg=class{constructor(e,t={}){if(!e)return;nn.current&&nn.current.register(this);let n=t.x,s=t.y,r=t.trigger,a=t.modifier,o=t.releaseEase,l=o&&br(o),c=!Se(o)&&!Se(o.ease),h=ln(n)&&!Se(n.mapTo)?n.mapTo:"translateX",u=ln(s)&&!Se(s.mapTo)?s.mapTo:"translateY",d=On(t.container,this);this.containerArray=Rn(d)?d:null,this.$container=d&&!this.containerArray?ci(d)[0]:Ve.body,this.useWin=this.$container===Ve.body,this.$scrollContainer=this.useWin?Cn:this.$container,this.$target=ln(e)?new gg(e):ci(e)[0],this.$trigger=ci(r||e)[0],this.fixed=Er(this.$target,"position")==="fixed",this.isFinePointer=!0,this.containerPadding=[0,0,0,0],this.containerFriction=0,this.releaseContainerFriction=0,this.snapX=0,this.snapY=0,this.scrollSpeed=0,this.scrollThreshold=0,this.dragSpeed=0,this.maxVelocity=0,this.minVelocity=0,this.velocityMultiplier=0,this.cursor=!1,this.releaseXSpring=c?o:wi({mass:ze(t.releaseMass,1),stiffness:ze(t.releaseStiffness,80),damping:ze(t.releaseDamping,20)}),this.releaseYSpring=c?o:wi({mass:ze(t.releaseMass,1),stiffness:ze(t.releaseStiffness,80),damping:ze(t.releaseDamping,20)}),this.releaseEase=l||ui.outQuint,this.hasReleaseSpring=c,this.onGrab=t.onGrab||rt,this.onDrag=t.onDrag||rt,this.onRelease=t.onRelease||rt,this.onUpdate=t.onUpdate||rt,this.onSettle=t.onSettle||rt,this.onSnap=t.onSnap||rt,this.onResize=t.onResize||rt,this.onAfterResize=t.onAfterResize||rt,this.disabled=[0,0];let p={};if(a&&(p.modifier=a),Se(n)||n===!0)p[h]=0;else if(ln(n)){let g=n,v={};g.modifier&&(v.modifier=g.modifier),g.composition&&(v.composition=g.composition),p[h]=v}else n===!1&&(p[h]=0,this.disabled[0]=1);if(Se(s)||s===!0)p[u]=0;else if(ln(s)){let g=s,v={};g.modifier&&(v.modifier=g.modifier),g.composition&&(v.composition=g.composition),p[u]=v}else s===!1&&(p[u]=0,this.disabled[1]=1);this.animate=new ed(this.$target,p),this.xProp=h,this.yProp=u,this.destX=0,this.destY=0,this.deltaX=0,this.deltaY=0,this.scroll={x:0,y:0},this.coords=[this.x,this.y,0,0],this.snapped=[0,0],this.pointer=[0,0,0,0,0,0,0,0],this.scrollView=[0,0],this.dragArea=[0,0,0,0],this.containerBounds=[-1e12,da,da,-1e12],this.scrollBounds=[0,0,0,0],this.targetBounds=[0,0,0,0],this.window=[0,0],this.velocityStack=[0,0,0],this.velocityStackIndex=0,this.velocityTime=vr(),this.velocity=0,this.angle=0,this.cursorStyles=null,this.triggerStyles=null,this.bodyStyles=null,this.targetStyles=null,this.touchActionStyles=null,this.transforms=new vg(this.$target),this.overshootCoords={x:0,y:0},this.overshootXTicker=new Nn({autoplay:!1},null,0).init(),this.overshootYTicker=new Nn({autoplay:!1},null,0).init(),this.updateTicker=new Nn({autoplay:!1},null,0).init(),this.overshootXTicker.onUpdate=()=>{this.disabled[0]||(this.updated=!0,this.manual=!0,this.animate[this.xProp](this.overshootCoords.x,0))},this.overshootXTicker.onComplete=()=>{this.disabled[0]||(this.manual=!1,this.animate[this.xProp](this.overshootCoords.x,0))},this.overshootYTicker.onUpdate=()=>{this.disabled[1]||(this.updated=!0,this.manual=!0,this.animate[this.yProp](this.overshootCoords.y,0))},this.overshootYTicker.onComplete=()=>{this.disabled[1]||(this.manual=!1,this.animate[this.yProp](this.overshootCoords.y,0))},this.updateTicker.onUpdate=()=>this.update(),this.contained=!Se(d),this.manual=!1,this.grabbed=!1,this.dragged=!1,this.updated=!1,this.released=!1,this.canScroll=!1,this.enabled=!1,this.initialized=!1,this.activeProp=this.disabled[1]?h:u,this.animate.animations[this.activeProp].onRender=()=>{let g=this.updated,m=!(this.grabbed&&g)&&this.released,f=this.x,x=this.y,A=f-this.coords[2],y=x-this.coords[3];this.deltaX=A,this.deltaY=y,this.coords[2]=f,this.coords[3]=x,g&&(A||y)&&this.onUpdate(this),m?(this.computeVelocity(A,y),this.angle=_c(y,A)):this.updated=!1},this.animate.animations[this.activeProp].onComplete=()=>{!this.grabbed&&this.released&&(this.released=!1),this.manual||(this.deltaX=0,this.deltaY=0,this.velocity=0,this.velocityStack[0]=0,this.velocityStack[1]=0,this.velocityStack[2]=0,this.velocityStackIndex=0,this.onSettle(this))},this.resizeTicker=new Nn({autoplay:!1,duration:150*lt.timeScale,onComplete:()=>{this.onResize(this),this.refresh(),this.onAfterResize(this)}}).init(),this.parameters=t,this.resizeObserver=new ResizeObserver(()=>{this.initialized?this.resizeTicker.restart():this.initialized=!0}),this.enable(),this.refresh(),this.resizeObserver.observe(this.$container),ln(e)||this.resizeObserver.observe(this.$target)}computeVelocity(e,t){let n=this.velocityTime,s=vr(),r=s-n;if(r<17)return this.velocity;this.velocityTime=s;let a=this.velocityStack,o=this.velocityMultiplier,l=this.minVelocity,c=this.maxVelocity,h=this.velocityStackIndex;a[h]=Ne(Xe(Is(e*e+t*t)/r*o,l,c),5);let u=zm(a[0],a[1],a[2]);return this.velocity=u,this.velocityStackIndex=(h+1)%3,u}setX(e,t=!1){if(this.disabled[0])return;let n=Ne(e,5);return this.overshootXTicker.pause(),this.manual=!0,this.updated=!t,this.destX=n,this.snapped[0]=yr(n,this.snapX),this.animate[this.xProp](n,0),this.manual=!1,this}setY(e,t=!1){if(this.disabled[1])return;let n=Ne(e,5);return this.overshootYTicker.pause(),this.manual=!0,this.updated=!t,this.destY=n,this.snapped[1]=yr(n,this.snapY),this.animate[this.yProp](n,0),this.manual=!1,this}get x(){return Ne(this.animate[this.xProp](),lt.precision)}set x(e){this.setX(e,!1)}get y(){return Ne(this.animate[this.yProp](),lt.precision)}set y(e){this.setY(e,!1)}get progressX(){return uo(this.x,this.containerBounds[3],this.containerBounds[1],0,1)}set progressX(e){this.setX(uo(e,0,1,this.containerBounds[3],this.containerBounds[1]),!1)}get progressY(){return uo(this.y,this.containerBounds[0],this.containerBounds[2],0,1)}set progressY(e){this.setY(uo(e,0,1,this.containerBounds[0],this.containerBounds[2]),!1)}updateScrollCoords(){let e=Ne(this.useWin?Cn.scrollX:this.$container.scrollLeft,0),t=Ne(this.useWin?Cn.scrollY:this.$container.scrollTop,0),[n,s,r,a]=this.containerPadding,o=this.scrollThreshold;this.scroll.x=e,this.scroll.y=t,this.scrollBounds[0]=t-this.targetBounds[0]+n-o,this.scrollBounds[1]=e-this.targetBounds[1]-s+o,this.scrollBounds[2]=t-this.targetBounds[2]-r+o,this.scrollBounds[3]=e-this.targetBounds[3]+a-o}updateBoundingValues(){let e=this.$container,t=this.x,n=this.y,s=this.coords[2],r=this.coords[3];this.coords[2]=0,this.coords[3]=0,this.setX(0,!0),this.setY(0,!0),this.transforms.remove();let a=this.window[0]=Cn.innerWidth,o=this.window[1]=Cn.innerHeight,l=this.useWin,c=e.scrollWidth,h=e.scrollHeight,u=this.fixed,d=e.getBoundingClientRect(),[p,g,v,m]=this.containerPadding;this.dragArea[0]=l?0:d.left,this.dragArea[1]=l?0:d.top,this.scrollView[0]=l?Xe(c,a,c):c,this.scrollView[1]=l?Xe(h,o,h):h,this.updateScrollCoords();let{width:f,height:x,left:A,top:y,right:T,bottom:M}=e.getBoundingClientRect();this.dragArea[2]=Ne(l?Xe(f,a,a):f,0),this.dragArea[3]=Ne(l?Xe(x,o,o):x,0);let C=Er(e,"overflow"),R=C==="visible",b=C==="hidden";if(this.canScroll=u?!1:this.contained&&(e===Ve.body&&R||!b&&!R)&&(c>this.dragArea[2]+m-g||h>this.dragArea[3]+p-v)&&(!this.containerArray||this.containerArray&&!Rn(this.containerArray)),this.contained){let S=this.scroll.x,D=this.scroll.y,N=this.canScroll,U=this.$target.getBoundingClientRect(),B=N?l?0:e.scrollLeft:0,W=N?l?0:e.scrollTop:0,G=N?this.scrollView[0]-B-f:0,I=N?this.scrollView[1]-W-x:0;this.targetBounds[0]=Ne(U.top+D-(l?0:y),0),this.targetBounds[1]=Ne(U.right+S-(l?a:T),0),this.targetBounds[2]=Ne(U.bottom+D-(l?o:M),0),this.targetBounds[3]=Ne(U.left+S-(l?0:A),0),this.containerArray?(this.containerBounds[0]=this.containerArray[0]+p,this.containerBounds[1]=this.containerArray[1]-g,this.containerBounds[2]=this.containerArray[2]-v,this.containerBounds[3]=this.containerArray[3]+m):(this.containerBounds[0]=-Ne(U.top-(u?Xe(y,0,o):y)+W-p,0),this.containerBounds[1]=-Ne(U.right-(u?Xe(T,0,a):T)-G+g,0),this.containerBounds[2]=-Ne(U.bottom-(u?Xe(M,0,o):M)-I+v,0),this.containerBounds[3]=-Ne(U.left-(u?Xe(A,0,a):A)+B-m,0))}this.transforms.revert(),this.coords[2]=s,this.coords[3]=r,this.setX(t,!0),this.setY(n,!0)}isOutOfBounds(e,t,n){if(!this.contained)return 0;let[s,r,a,o]=e,[l,c]=this.disabled,h=!l&&t<o||!l&&t>r,u=!c&&n<s||!c&&n>a;return h&&!u?1:!h&&u?2:h&&u?3:0}refresh(){let e=this.parameters,t=e.x,n=e.y,s=On(e.container,this),r=On(e.containerPadding,this)||0,a=Rn(r)?r:[r,r,r,r],o=this.x,l=this.y,c=On(e.cursor,this),h={onHover:"grab",onGrab:"grabbing"};if(c){let{onHover:v,onGrab:m}=c;v&&(h.onHover=v),m&&(h.onGrab=m)}this.containerArray=Rn(s)?s:null,this.$container=s&&!this.containerArray?ci(s)[0]:Ve.body,this.useWin=this.$container===Ve.body,this.$scrollContainer=this.useWin?Cn:this.$container,this.isFinePointer=matchMedia("(pointer:fine)").matches,this.containerPadding=ze(a,[0,0,0,0]),this.containerFriction=Xe(ze(On(e.containerFriction,this),.8),0,1),this.releaseContainerFriction=Xe(ze(On(e.releaseContainerFriction,this),this.containerFriction),0,1),this.snapX=On(ln(t)&&!Se(t.snap)?t.snap:e.snap,this),this.snapY=On(ln(n)&&!Se(n.snap)?n.snap:e.snap,this),this.scrollSpeed=ze(On(e.scrollSpeed,this),1.5),this.scrollThreshold=ze(On(e.scrollThreshold,this),20),this.dragSpeed=ze(On(e.dragSpeed,this),1),this.minVelocity=ze(On(e.minVelocity,this),0),this.maxVelocity=ze(On(e.maxVelocity,this),50),this.velocityMultiplier=ze(On(e.velocityMultiplier,this),1),this.cursor=c===!1?!1:h,this.updateBoundingValues();let[u,d,p,g]=this.containerBounds;this.setX(Xe(o,g,d),!0),this.setY(Xe(l,u,p),!0)}update(){if(this.updateScrollCoords(),this.canScroll){let[x,A,y,T]=this.containerPadding,[M,C]=this.scrollView,R=this.dragArea[2],b=this.dragArea[3],S=this.scroll.x,D=this.scroll.y,N=this.$container.scrollWidth,U=this.$container.scrollHeight,B=this.useWin?Xe(N,this.window[0],N):N,W=this.useWin?Xe(U,this.window[1],U):U,G=M-B,I=C-W;this.dragged&&G>0&&(this.coords[0]-=G,this.scrollView[0]=B),this.dragged&&I>0&&(this.coords[1]-=I,this.scrollView[1]=W);let P=this.scrollSpeed*10,L=this.scrollThreshold,[J,ae]=this.coords,[ve,le,V,j]=this.scrollBounds,ie=Ne(Xe((ae-ve+x)/L,-1,0)*P,0),ue=Ne(Xe((J-le-A)/L,0,1)*P,0),Ie=Ne(Xe((ae-V-y)/L,0,1)*P,0),De=Ne(Xe((J-j+T)/L,-1,0)*P,0);if(ie||Ie||De||ue){let[He,$e]=this.disabled,We=S,Je=D;He||(We=Ne(Xe(S+(De||ue),0,M-R),0),this.coords[0]-=S-We),$e||(Je=Ne(Xe(D+(ie||Ie),0,C-b),0),this.coords[1]-=D-Je),this.useWin?this.$scrollContainer.scrollBy(-(S-We),-(D-Je)):this.$scrollContainer.scrollTo(We,Je)}}let[e,t,n,s]=this.containerBounds,[r,a,o,l,c,h]=this.pointer;this.coords[0]+=(r-c)*this.dragSpeed,this.coords[1]+=(a-h)*this.dragSpeed,this.pointer[4]=r,this.pointer[5]=a;let[u,d]=this.coords,[p,g]=this.snapped,v=(1-this.containerFriction)*this.dragSpeed;this.setX(u>t?t+(u-t)*v:u<s?s+(u-s)*v:u,!1),this.setY(d>n?n+(d-n)*v:d<e?e+(d-e)*v:d,!1),this.computeVelocity(r-c,a-h),this.angle=_c(a-l,r-o);let[m,f]=this.snapped;(m!==p&&this.snapX||f!==g&&this.snapY)&&this.onSnap(this)}stop(){this.updateTicker.pause(),this.overshootXTicker.pause(),this.overshootYTicker.pause();for(let e in this.animate.animations)this.animate.animations[e].pause();return hs(this,null,"x"),hs(this,null,"y"),hs(this,null,"progressX"),hs(this,null,"progressY"),hs(this.scroll),hs(this.overshootCoords),this}scrollInView(e,t=0,n=ui.inOutQuad){this.updateScrollCoords();let s=this.destX,r=this.destY,a=this.scroll,o=this.scrollBounds,l=this.canScroll;if(!this.containerArray&&this.isOutOfBounds(o,s,r)){let[c,h,u,d]=o,p=Ne(Xe(r-c,-1e12,0),0),g=Ne(Xe(s-h,0,da),0),v=Ne(Xe(r-u,0,da),0),m=Ne(Xe(s-d,-1e12,0),0);new Fs(a,{x:Ne(a.x+(m?m-t:g?g+t:0),0),y:Ne(a.y+(p?p-t:v?v+t:0),0),duration:Se(e)?350*lt.timeScale:e,ease:n,onUpdate:()=>{this.canScroll=!1,this.$scrollContainer.scrollTo(a.x,a.y)}}).init().then(()=>{this.canScroll=l})}return this}handleHover(){this.isFinePointer&&this.cursor&&!this.cursorStyles&&(this.cursorStyles=Us(this.$trigger,{cursor:this.cursor.onHover}))}animateInView(e,t=0,n=ui.inOutQuad){this.stop(),this.updateBoundingValues();let s=this.x,r=this.y,[a,o,l,c]=this.containerPadding,h=this.scroll.y-this.targetBounds[0]+a+t,u=this.scroll.x-this.targetBounds[1]-o-t,d=this.scroll.y-this.targetBounds[2]-l-t,p=this.scroll.x-this.targetBounds[3]+c+t,g=this.isOutOfBounds([h,u,d,p],s,r);if(g){let[v,m]=this.disabled,f=Xe(yr(s,this.snapX),p,u),x=Xe(yr(r,this.snapY),h,d),A=Se(e)?350*lt.timeScale:e;!v&&(g===1||g===3)&&this.animate[this.xProp](f,A,n),!m&&(g===2||g===3)&&this.animate[this.yProp](x,A,n)}return this}handleDown(e){let t=e.target;if(this.grabbed||t.type==="range")return;e.stopPropagation(),this.grabbed=!0,this.released=!1,this.stop(),this.updateBoundingValues();let n=e.changedTouches,s=n?n[0].clientX:e.clientX,r=n?n[0].clientY:e.clientY,{x:a,y:o}=this.transforms.normalizePoint(s,r),[l,c,h,u]=this.containerBounds,d=(1-this.containerFriction)*this.dragSpeed,p=this.x,g=this.y;this.coords[0]=this.coords[2]=d?p>c?c+(p-c)/d:p<u?u+(p-u)/d:p:p,this.coords[1]=this.coords[3]=d?g>h?h+(g-h)/d:g<l?l+(g-l)/d:g:g,this.pointer[0]=a,this.pointer[1]=o,this.pointer[2]=a,this.pointer[3]=o,this.pointer[4]=a,this.pointer[5]=o,this.pointer[6]=a,this.pointer[7]=o,this.deltaX=0,this.deltaY=0,this.velocity=0,this.velocityStack[0]=0,this.velocityStack[1]=0,this.velocityStack[2]=0,this.velocityStackIndex=0,this.angle=0,this.targetStyles&&(this.targetStyles.revert(),this.targetStyles=null);let v=Er(this.$target,"zIndex",!1);Ic=(v>Ic?v:Ic)+1,this.targetStyles=Us(this.$target,{zIndex:Ic}),this.triggerStyles&&(this.triggerStyles.revert(),this.triggerStyles=null),this.cursorStyles&&(this.cursorStyles.revert(),this.cursorStyles=null),this.isFinePointer&&this.cursor&&(this.bodyStyles=Us(Ve.body,{cursor:this.cursor.onGrab})),this.scrollInView(100,0,ui.out(3)),this.onGrab(this),Ve.addEventListener("touchmove",this),Ve.addEventListener("touchend",this),Ve.addEventListener("touchcancel",this),Ve.addEventListener("mousemove",this),Ve.addEventListener("mouseup",this),Ve.addEventListener("selectstart",this)}handleMove(e){if(!this.grabbed)return;let t=e.changedTouches,n=t?t[0].clientX:e.clientX,s=t?t[0].clientY:e.clientY,{x:r,y:a}=this.transforms.normalizePoint(n,s),o=r-this.pointer[6],l=a-this.pointer[7],c=e.target,h=!1,u=!1,d=!1;for(;t&&c&&c!==this.$trigger;){let p=Er(c,"overflow-y");if(p!=="hidden"&&p!=="visible"){let{scrollTop:g,scrollHeight:v,clientHeight:m}=c;if(v>m){d=!0,h=g<=3,u=g>=v-m-3;break}}c=c.parentNode}d&&(!h&&!u||h&&l<0||u&&l>0)?(this.pointer[0]=r,this.pointer[1]=a,this.pointer[2]=r,this.pointer[3]=a,this.pointer[4]=r,this.pointer[5]=a,this.pointer[6]=r,this.pointer[7]=a):(Ns(e),this.triggerStyles||(this.triggerStyles=Us(this.$trigger,{pointerEvents:"none"})),this.$trigger.addEventListener("touchstart",Ns,{passive:!1}),this.$trigger.addEventListener("touchmove",Ns,{passive:!1}),this.$trigger.addEventListener("touchend",Ns),(!this.disabled[0]&&Ni(o)>3||!this.disabled[1]&&Ni(l)>3)&&(this.updateTicker.resume(),this.pointer[2]=this.pointer[0],this.pointer[3]=this.pointer[1],this.pointer[0]=r,this.pointer[1]=a,this.dragged=!0,this.released=!1,this.onDrag(this)))}handleUp(){if(!this.grabbed)return;this.updateTicker.pause(),this.triggerStyles&&(this.triggerStyles.revert(),this.triggerStyles=null),this.bodyStyles&&(this.bodyStyles.revert(),this.bodyStyles=null);let[e,t]=this.disabled,[n,s,r,a,o,l]=this.pointer,[c,h,u,d]=this.containerBounds,[p,g]=this.snapped,v=this.releaseXSpring,m=this.releaseYSpring,f=this.releaseEase,x=this.hasReleaseSpring,A=this.overshootCoords,y=this.x,T=this.y,M=this.computeVelocity(n-o,s-l),C=this.angle=_c(s-a,n-r),R=M*150,b=(1-this.releaseContainerFriction)*this.dragSpeed,S=y+Iu(C)*R,D=T+Pu(C)*R,N=S>h?h+(S-h)*b:S<d?d+(S-d)*b:S,U=D>u?u+(D-u)*b:D<c?c+(D-c)*b:D,B=this.destX=Xe(Ne(yr(N,this.snapX),5),d,h),W=this.destY=Xe(Ne(yr(U,this.snapY),5),c,u),G=this.isOutOfBounds(this.containerBounds,S,D),I=0,P=0,L=f,J=f,ae=0;if(A.x=y,A.y=T,!e){let le=B===h?y>h?-1:1:y<d?-1:1,V=Ne(y-B,0);v.velocity=t&&x?V?R*le/Ni(V):0:M;let{ease:j,duration:ie,restDuration:ue}=v;I=y===B?0:x?ie:ie-ue*lt.timeScale,x&&(L=j),I>ae&&(ae=I)}if(!t){let le=W===u?T>u?-1:1:T<c?-1:1,V=Ne(T-W,0);m.velocity=e&&x?V?R*le/Ni(V):0:M;let{ease:j,duration:ie,restDuration:ue}=m;P=T===W?0:x?ie:ie-ue*lt.timeScale,x&&(J=j),P>ae&&(ae=P)}if(!x&&G&&b&&(I||P)){let le=mn.blend;new Fs(A,{x:{to:N,duration:I*.65},y:{to:U,duration:P*.65},ease:f,composition:le}).init(),new Fs(A,{x:{to:B,duration:I},y:{to:W,duration:P},ease:f,composition:le}).init(),this.overshootXTicker.stretch(I).restart(),this.overshootYTicker.stretch(P).restart()}else e||this.animate[this.xProp](B,I,L),t||this.animate[this.yProp](W,P,J);this.scrollInView(ae,this.scrollThreshold,f);let ve=!1;B!==p&&(this.snapped[0]=B,this.snapX&&(ve=!0)),W!==g&&this.snapY&&(this.snapped[1]=W,this.snapY&&(ve=!0)),ve&&this.onSnap(this),this.grabbed=!1,this.dragged=!1,this.updated=!0,this.released=!0,this.onRelease(this),this.$trigger.removeEventListener("touchstart",Ns),this.$trigger.removeEventListener("touchmove",Ns),this.$trigger.removeEventListener("touchend",Ns),Ve.removeEventListener("touchmove",this),Ve.removeEventListener("touchend",this),Ve.removeEventListener("touchcancel",this),Ve.removeEventListener("mousemove",this),Ve.removeEventListener("mouseup",this),Ve.removeEventListener("selectstart",this)}reset(){return this.stop(),this.resizeTicker.pause(),this.grabbed=!1,this.dragged=!1,this.updated=!1,this.released=!1,this.canScroll=!1,this.setX(0,!0),this.setY(0,!0),this.coords[0]=0,this.coords[1]=0,this.pointer[0]=0,this.pointer[1]=0,this.pointer[2]=0,this.pointer[3]=0,this.pointer[4]=0,this.pointer[5]=0,this.pointer[6]=0,this.pointer[7]=0,this.velocity=0,this.velocityStack[0]=0,this.velocityStack[1]=0,this.velocityStack[2]=0,this.velocityStackIndex=0,this.angle=0,this}enable(){return this.enabled||(this.enabled=!0,this.$target.classList.remove("is-disabled"),this.touchActionStyles=Us(this.$trigger,{touchAction:this.disabled[0]?"pan-x":this.disabled[1]?"pan-y":"none"}),this.$trigger.addEventListener("touchstart",this,{passive:!0}),this.$trigger.addEventListener("mousedown",this,{passive:!0}),this.$trigger.addEventListener("mouseenter",this)),this}disable(){return this.enabled=!1,this.grabbed=!1,this.dragged=!1,this.updated=!1,this.released=!1,this.canScroll=!1,this.touchActionStyles.revert(),this.cursorStyles&&(this.cursorStyles.revert(),this.cursorStyles=null),this.triggerStyles&&(this.triggerStyles.revert(),this.triggerStyles=null),this.bodyStyles&&(this.bodyStyles.revert(),this.bodyStyles=null),this.targetStyles&&(this.targetStyles.revert(),this.targetStyles=null),this.$target.classList.add("is-disabled"),this.$trigger.removeEventListener("touchstart",this),this.$trigger.removeEventListener("mousedown",this),this.$trigger.removeEventListener("mouseenter",this),Ve.removeEventListener("touchmove",this),Ve.removeEventListener("touchend",this),Ve.removeEventListener("touchcancel",this),Ve.removeEventListener("mousemove",this),Ve.removeEventListener("mouseup",this),Ve.removeEventListener("selectstart",this),this}revert(){return this.reset(),this.disable(),this.$target.classList.remove("is-disabled"),this.updateTicker.revert(),this.overshootXTicker.revert(),this.overshootYTicker.revert(),this.resizeTicker.revert(),this.animate.revert(),this.resizeObserver.disconnect(),this}handleEvent(e){switch(e.type){case"mousedown":this.handleDown(e);break;case"touchstart":this.handleDown(e);break;case"mousemove":this.handleMove(e);break;case"touchmove":this.handleMove(e);break;case"mouseup":this.handleUp();break;case"touchend":this.handleUp();break;case"touchcancel":this.handleUp();break;case"mouseenter":this.handleHover();break;case"selectstart":Ns(e);break}}},us=(i,e)=>new xg(i,e),yg=class{constructor(e={}){nn.current&&nn.current.register(this);let t=e.root,n=Ve;t&&(n=t.current||t.nativeElement||ci(t)[0]||Ve);let s=e.defaults,r=lt.defaults,a=e.mediaQueries;if(this.defaults=s?oo(s,r):r,this.root=n,this.constructors=[],this.revertConstructors=[],this.revertibles=[],this.constructorsOnce=[],this.revertConstructorsOnce=[],this.revertiblesOnce=[],this.once=!1,this.onceIndex=0,this.methods={},this.matches={},this.mediaQueryLists={},this.data={},a)for(let o in a){let l=Cn.matchMedia(a[o]);this.mediaQueryLists[o]=l,l.addEventListener("change",this)}}register(e){(this.once?this.revertiblesOnce:this.revertibles).push(e)}execute(e){let t=nn.current,n=nn.root,s=lt.defaults;nn.current=this,nn.root=this.root,lt.defaults=this.defaults;let r=this.mediaQueryLists;for(let o in r)this.matches[o]=r[o].matches;let a=e(this);return nn.current=t,nn.root=n,lt.defaults=s,a}refresh(){return this.onceIndex=0,this.execute(()=>{let e=this.revertibles.length,t=this.revertConstructors.length;for(;e--;)this.revertibles[e].revert();for(;t--;)this.revertConstructors[t](this);this.revertibles.length=0,this.revertConstructors.length=0,this.constructors.forEach(n=>{let s=n(this);Zt(s)&&this.revertConstructors.push(s)})}),this}add(e,t){if(this.once=!1,Zt(e)){let n=e;this.constructors.push(n),this.execute(()=>{let s=n(this);Zt(s)&&this.revertConstructors.push(s)})}else this.methods[e]=(...n)=>this.execute(()=>t(...n));return this}addOnce(e){if(this.once=!0,Zt(e)){let t=this.onceIndex++;if(this.constructorsOnce[t])return this;let s=e;this.constructorsOnce[t]=s,this.execute(()=>{let r=s(this);Zt(r)&&this.revertConstructorsOnce.push(r)})}return this}keepTime(e){this.once=!0;let t=this.onceIndex++,n=this.constructorsOnce[t];if(Zt(n))return n(this);let s=Uu(e);this.constructorsOnce[t]=s;let r;return this.execute(()=>{r=s(this)}),r}handleEvent(e){switch(e.type){case"change":this.refresh();break}}revert(){let e=this.revertibles,t=this.revertConstructors,n=this.revertiblesOnce,s=this.revertConstructorsOnce,r=this.mediaQueryLists,a=e.length,o=t.length,l=n.length,c=s.length;for(;a--;)e[a].revert();for(;o--;)t[o](this);for(;l--;)n[l].revert();for(;c--;)s[c](this);for(let h in r)r[h].removeEventListener("change",this);e.length=0,t.length=0,this.constructors.length=0,n.length=0,s.length=0,this.constructorsOnce.length=0,this.onceIndex=0,this.matches={},this.methods={},this.mediaQueryLists={},this.data={}}},Bs=i=>new yg(i),vb=()=>{let i=Ve.createElement("div");Ve.body.appendChild(i),i.style.height="100lvh";let e=i.offsetHeight;return Ve.body.removeChild(i),e},Lc=(i,e)=>i&&Zt(i)?i(e):i,td=new Map,Ag=class{constructor(e){this.element=e,this.useWin=this.element===Ve.body,this.winWidth=0,this.winHeight=0,this.width=0,this.height=0,this.left=0,this.top=0,this.zIndex=0,this.scrollX=0,this.scrollY=0,this.prevScrollX=0,this.prevScrollY=0,this.scrollWidth=0,this.scrollHeight=0,this.velocity=0,this.backwardX=!1,this.backwardY=!1,this.scrollTicker=new Nn({autoplay:!1,onBegin:()=>this.dataTimer.resume(),onUpdate:()=>{let t=this.backwardX||this.backwardY;Lt(this,n=>n.handleScroll(),t)},onComplete:()=>this.dataTimer.pause()}).init(),this.dataTimer=new Nn({autoplay:!1,frameRate:30,onUpdate:t=>{let n=t.deltaTime,s=this.prevScrollX,r=this.prevScrollY,a=this.scrollX,o=this.scrollY,l=s-a,c=r-o;this.prevScrollX=a,this.prevScrollY=o,l&&(this.backwardX=s>a),c&&(this.backwardY=r>o),this.velocity=Ne(n>0?Math.sqrt(l*l+c*c)/n:0,5)}}).init(),this.resizeTicker=new Nn({autoplay:!1,duration:250*lt.timeScale,onComplete:()=>{this.updateWindowBounds(),this.refreshScrollObservers(),this.handleScroll()}}).init(),this.wakeTicker=new Nn({autoplay:!1,duration:500*lt.timeScale,onBegin:()=>{this.scrollTicker.resume()},onComplete:()=>{this.scrollTicker.pause()}}).init(),this._head=null,this._tail=null,this.updateScrollCoords(),this.updateWindowBounds(),this.updateBounds(),this.refreshScrollObservers(),this.handleScroll(),this.resizeObserver=new ResizeObserver(()=>this.resizeTicker.restart()),this.resizeObserver.observe(this.element),(this.useWin?Cn:this.element).addEventListener("scroll",this,!1)}updateScrollCoords(){let e=this.useWin,t=this.element;this.scrollX=Ne(e?Cn.scrollX:t.scrollLeft,0),this.scrollY=Ne(e?Cn.scrollY:t.scrollTop,0)}updateWindowBounds(){this.winWidth=Cn.innerWidth,this.winHeight=vb()}updateBounds(){let e=getComputedStyle(this.element),t=this.element;this.scrollWidth=t.scrollWidth+parseFloat(e.marginLeft)+parseFloat(e.marginRight),this.scrollHeight=t.scrollHeight+parseFloat(e.marginTop)+parseFloat(e.marginBottom),this.updateWindowBounds();let n,s;if(this.useWin)n=this.winWidth,s=this.winHeight;else{let r=t.getBoundingClientRect();n=r.width,s=r.height,this.top=r.top,this.left=r.left}this.width=n,this.height=s}refreshScrollObservers(){Lt(this,e=>{e._debug&&e.removeDebug()}),this.updateBounds(),Lt(this,e=>{e.refresh(),e._debug&&e.debug()})}refresh(){this.updateWindowBounds(),this.updateBounds(),this.refreshScrollObservers(),this.handleScroll()}handleScroll(){this.updateScrollCoords(),this.wakeTicker.restart()}handleEvent(e){switch(e.type){case"scroll":this.handleScroll();break}}revert(){this.scrollTicker.cancel(),this.dataTimer.cancel(),this.resizeTicker.cancel(),this.wakeTicker.cancel(),this.resizeObserver.disconnect(),(this.useWin?Cn:this.element).removeEventListener("scroll",this),td.delete(this.element)}},xb=i=>{let e=i&&ci(i)[0]||Ve.body,t=td.get(e);return t||(t=new Ag(e),td.set(e,t)),t},po=(i,e,t,n,s)=>{let r=e==="min",a=e==="max",o=e==="top"||e==="left"||e==="start"||r?0:e==="bottom"||e==="right"||e==="end"||a?"100%":e==="center"?"50%":e,{n:l,u:c}=hi(o,Pn),h=l;return c==="%"?h=l/100*t:c&&(h=Qu(i,Pn,"px",!0).n),a&&n<0&&(h+=n),r&&s>0&&(h+=s),h},Fc=(i,e,t,n,s)=>{let r;if(Un(e)){let a=Im.exec(e);if(a){let o=a[0],l=o[0],c=e.split(o),h=c[0]==="min",u=c[0]==="max",d=po(i,c[0],t,n,s),p=po(i,c[1],t,n,s);if(h){let g=Sr(po(i,"min",t),p,l);r=g<d?d:g}else if(u){let g=Sr(po(i,"max",t),p,l);r=g>d?d:g}else r=Sr(d,p,l)}else r=po(i,e,t,n,s)}else r=e;return Ne(r,0)},_g=i=>{let e,t=i.targets;for(let n=0,s=t.length;n<s;n++){let r=t[n];if(r[Ac]){e=r;break}}return e},yb=0,Sg=["#FF4B4B","#FF971B","#FFC730","#F9F640","#7AFF5A","#18FF74","#17E09B","#3CFFEC","#05DBE9","#33B3F1","#638CF9","#C563FE","#FF4FCF","#F93F8A"],bg=class{constructor(e={}){nn.current&&nn.current.register(this);let t=ze(e.sync,"play pause"),n=t?br(t):null,s=t&&(t==="linear"||t===cs),r=t&&!(n===cs&&!s),a=t&&(Jn(t)||t===!0||s),o=t&&Un(t)&&!r&&!a,l=o?t.split(" ").map(h=>()=>{let u=this.linked;return u&&u[h]?u[h]():null}):null,c=o&&l.length>2;this.index=yb++,this.id=Se(e.id)?this.index:e.id,this.container=xb(e.container),this.target=null,this.linked=null,this.repeat=null,this.horizontal=null,this.enter=null,this.leave=null,this.sync=r||a||!!l,this.syncEase=r?n:null,this.syncSmooth=a?t===!0||s?1:t:null,this.onSyncEnter=l&&!c&&l[0]?l[0]:rt,this.onSyncLeave=l&&!c&&l[1]?l[1]:rt,this.onSyncEnterForward=l&&c&&l[0]?l[0]:rt,this.onSyncLeaveForward=l&&c&&l[1]?l[1]:rt,this.onSyncEnterBackward=l&&c&&l[2]?l[2]:rt,this.onSyncLeaveBackward=l&&c&&l[3]?l[3]:rt,this.onEnter=e.onEnter||rt,this.onLeave=e.onLeave||rt,this.onEnterForward=e.onEnterForward||rt,this.onLeaveForward=e.onLeaveForward||rt,this.onEnterBackward=e.onEnterBackward||rt,this.onLeaveBackward=e.onLeaveBackward||rt,this.onUpdate=e.onUpdate||rt,this.onSyncComplete=e.onSyncComplete||rt,this.reverted=!1,this.completed=!1,this.began=!1,this.isInView=!1,this.forceEnter=!1,this.hasEntered=!1,this.offset=0,this.offsetStart=0,this.offsetEnd=0,this.distance=0,this.prevProgress=0,this.thresholds=["start","end","end","start"],this.coords=[0,0,0,0],this.debugStyles=null,this.$debug=null,this._params=e,this._debug=ze(e.debug,!1),this._next=null,this._prev=null,ls(this.container,this),hg(()=>{if(!this.reverted){if(!this.target){let h=ci(e.target)[0];this.target=h||Ve.body,this.refresh()}this._debug&&this.debug()}})}link(e){if(e&&(e.pause(),this.linked=e,!this._params.target)){let t;Se(e.targets)?Lt(e,n=>{n.targets&&!t&&(t=_g(n))}):t=_g(e),this.target=t||Ve.body,this.refresh()}return this}get velocity(){return this.container.velocity}get backward(){return this.horizontal?this.container.backwardX:this.container.backwardY}get scroll(){return this.horizontal?this.container.scrollX:this.container.scrollY}get progress(){let e=(this.scroll-this.offsetStart)/this.distance;return e===1/0||isNaN(e)?0:Ne(Xe(e,0,1),6)}refresh(){this.reverted=!1;let e=this._params;return this.repeat=ze(Lc(e.repeat,this),!0),this.horizontal=ze(Lc(e.axis,this),"y")==="x",this.enter=ze(Lc(e.enter,this),"end start"),this.leave=ze(Lc(e.leave,this),"start end"),this.updateBounds(),this.handleScroll(),this}removeDebug(){return this.$debug&&(this.$debug.parentNode.removeChild(this.$debug),this.$debug=null),this.debugStyles&&(this.debugStyles.revert(),this.$debug=null),this}debug(){this.removeDebug();let e=this.container,t=this.horizontal,n=e.element.querySelector(":scope > .animejs-onscroll-debug"),s=Ve.createElement("div"),r=Ve.createElement("div"),a=Ve.createElement("div"),o=Sg[this.index%Sg.length],l=e.useWin,c=l?e.winWidth:e.width,h=l?e.winHeight:e.height,u=e.scrollWidth,d=e.scrollHeight,p=this.container.width>360?320:260,g=t?0:10,v=t?10:0,m=t?24:p/2,f=t?m:15,x=t?60:m,A=t?x:f,y=t?"repeat-x":"repeat-y",T=S=>t?"0px "+S+"px":S+"px 2px",M=S=>`linear-gradient(${t?90:0}deg, ${S} 2px, transparent 1px)`,C=(S,D,N,U,B)=>`position:${S};left:${D}px;top:${N}px;width:${U}px;height:${B}px;`;s.style.cssText=`${C("absolute",g,v,t?u:p,t?p:d)}
      pointer-events: none;
      z-index: ${this.container.zIndex++};
      display: flex;
      flex-direction: ${t?"column":"row"};
      filter: drop-shadow(0px 1px 0px rgba(0,0,0,.75));
    `,r.style.cssText=`${C("sticky",0,0,t?c:m,t?m:h)}`,n||(r.style.cssText+=`background:
        ${M("#FFFF")}${T(m-10)} / 100px 100px ${y},
        ${M("#FFF8")}${T(m-10)} / 10px 10px ${y};
      `),a.style.cssText=`${C("relative",0,0,t?u:m,t?m:d)}`,n||(a.style.cssText+=`background:
        ${M("#FFFF")}${T(0)} / ${t?"100px 10px":"10px 100px"} ${y},
        ${M("#FFF8")}${T(0)} / ${t?"10px 0px":"0px 10px"} ${y};
      `);let R=[" enter: "," leave: "];this.coords.forEach((S,D)=>{let N=D>1,U=(N?0:this.offset)+S,B=D%2,W=U<A,G=U>(N?t?c:h:t?u:d)-A,I=(N?B&&!W:!B&&!W)||G,P=Ve.createElement("div"),L=Ve.createElement("div"),J=t?I?"right":"left":I?"bottom":"top",ae=I?(t?x:f)+(N?t?-1:G?0:-2:t?-1:-2):t?1:0;L.innerHTML=`${this.id}${R[B]}${this.thresholds[D]}`,P.style.cssText=`${C("absolute",0,0,x,f)}
        display: flex;
        flex-direction: ${t?"column":"row"};
        justify-content: flex-${N?"start":"end"};
        align-items: flex-${I?"end":"start"};
        border-${J}: 2px solid ${o};
      `,L.style.cssText=`
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
        text-align: ${t&&I||!t&&!N?"right":"left"};
        white-space: pre;
        text-overflow: ellipsis;
        color: ${B?o:"rgba(0,0,0,.75)"};
        background-color: ${B?"rgba(0,0,0,.65)":o};
        border: 2px solid ${B?o:"transparent"};
        border-${t?I?"top-left":"top-right":I?"top-left":"bottom-left"}-radius: 5px;
        border-${t?I?"bottom-left":"bottom-right":I?"top-right":"bottom-right"}-radius: 5px;
      `,P.appendChild(L);let ve=U-ae+(t?1:0);P.style[t?"left":"top"]=`${ve}px`,(N?r:a).appendChild(P)}),s.appendChild(r),s.appendChild(a),e.element.appendChild(s),n||s.classList.add("animejs-onscroll-debug"),this.$debug=s,Er(e.element,"position")==="static"&&(this.debugStyles=Us(e.element,{position:"relative "}))}updateBounds(){this._debug&&this.removeDebug();let e,t=this.target,n=this.container,s=this.horizontal,r=this.linked,a,o=t;for(r&&(a=r.currentTime,r.seek(0,!0)),o.parentElement;o&&o!==n.element&&o!==Ve.body;){let U=Er(o,"position")==="sticky"?Us(o,{position:"static"}):!1;o=o.parentElement,U&&(e||(e=[]),e.push(U))}let l=t.getBoundingClientRect(),c=s?l.left+n.scrollX-n.left:l.top+n.scrollY-n.top,h=s?l.width:l.height,u=s?n.width:n.height,p=(s?n.scrollWidth:n.scrollHeight)-u,g=this.enter,v=this.leave,m="start",f="end",x="end",A="start";if(Un(g)){let U=g.split(" ");x=U[0],m=U.length>1?U[1]:m}else if(ln(g)){let U=g;Se(U.container)||(x=U.container),Se(U.target)||(m=U.target)}else Jn(g)&&(x=g);if(Un(v)){let U=v.split(" ");A=U[0],f=U.length>1?U[1]:f}else if(ln(v)){let U=v;Se(U.container)||(A=U.container),Se(U.target)||(f=U.target)}else Jn(v)&&(A=v);let y=Fc(t,m,h),T=Fc(t,f,h),M=y+c-u,C=T+c-p,R=Fc(t,x,u,M,C),b=Fc(t,A,u,M,C),S=y+c-R,D=T+c-b,N=D-S;this.offset=c,this.offsetStart=S,this.offsetEnd=D,this.distance=N<=0?0:N,this.thresholds=[m,f,x,A],this.coords=[y,T,R,b],e&&e.forEach(U=>U.revert()),r&&r.seek(a,!0),this._debug&&this.debug()}handleScroll(){let e=this.linked,t=this.sync,n=this.syncEase,s=this.syncSmooth,r=e&&(n||s),a=this.horizontal,o=this.container,l=this.scroll,c=l<=this.offsetStart,h=l>=this.offsetEnd,u=!c&&!h,d=l===this.offsetStart||l===this.offsetEnd,p=!this.hasEntered&&d,g=this._debug&&this.$debug,v=!1,m=!1,f=this.progress;if(c&&this.began&&(this.began=!1),f>0&&!this.began&&(this.began=!0),r){let x=e.progress;if(s&&Jn(s)){if(s<1){let A=1e-4,y=x<f&&f===1?A:x>f&&!f?-1e-4:0;f=Ne(dg(x,f,as(.01,.2,s),!1)+y,6)}}else n&&(f=n(f));v=f!==this.prevProgress,m=x===1,v&&!m&&s&&x&&o.wakeTicker.restart()}if(g){let x=a?o.scrollY:o.scrollX;g.style[a?"top":"left"]=x+10+"px"}(u&&!this.isInView||p&&!this.forceEnter&&!this.hasEntered)&&(u&&(this.isInView=!0),!this.forceEnter||!this.hasEntered?(g&&u&&(g.style.zIndex=`${this.container.zIndex++}`),this.onSyncEnter(this),this.onEnter(this),this.backward?(this.onSyncEnterBackward(this),this.onEnterBackward(this)):(this.onSyncEnterForward(this),this.onEnterForward(this)),this.hasEntered=!0,p&&(this.forceEnter=!0)):u&&(this.forceEnter=!1)),(u||!u&&this.isInView)&&(v=!0),v&&(r&&e.seek(e.duration*f),this.onUpdate(this)),!u&&this.isInView&&(this.isInView=!1,this.onSyncLeave(this),this.onLeave(this),this.backward?(this.onSyncLeaveBackward(this),this.onLeaveBackward(this)):(this.onSyncLeaveForward(this),this.onLeaveForward(this)),t&&!s&&(m=!0)),f>=1&&this.began&&!this.completed&&(t&&m||!t)&&(t&&this.onSyncComplete(this),this.completed=!0,(!this.repeat&&!e||!this.repeat&&e&&e.completed)&&this.revert()),f<1&&this.completed&&(this.completed=!1),this.prevProgress=f}revert(){if(this.reverted)return;let e=this.container;return os(e,this),e._head||e.revert(),this._debug&&this.removeDebug(),this.reverted=!0,this}},Tr=(i={})=>new bg(i),Uc=!Se(Intl)&&Intl.Segmenter,Ab=/\{value\}/g,_b=/\{i\}/g,Sb=/(\s+)/,bb=/^\s+$/,nd="line",mo="word",go="char",vo="data-line",id=null,sd=null,Nc=null,Eg=i=>i.isWordLike||i.segment===" "||Jn(+i.segment),rd=i=>i.setAttribute("aria-hidden","true"),Bc=(i,e)=>[...i.querySelectorAll(`[data-${e}]:not([data-${e}] [data-${e}])`)],Eb={line:"#00D672",word:"#FF4B4B",char:"#5A87FF"},Tg=i=>{if(!i.childElementCount&&!i.textContent.trim()){let e=i.parentElement;i.remove(),e&&Tg(e)}},Mg=(i,e,t)=>{let n=i.getAttribute(vo);(n!==null&&+n!==e||i.tagName==="BR")&&t.add(i);let s=i.childElementCount;for(;s--;)Mg(i.children[s],e,t);return t},ad=(i,e={})=>{let t="",n=Un(e.class)?` class="${e.class}"`:"",s=ze(e.clone,!1),r=ze(e.wrap,!1),a=r?r===!0?"clip":r:s?"clip":!1;if(r&&(t+=`<span${a?` style="overflow:${a};"`:""}>`),t+=`<span${n}${s?' style="position:relative;"':""} data-${i}="{i}">`,s){let o=s==="left"?"-100%":s==="right"?"100%":"0",l=s==="top"?"-100%":s==="bottom"?"100%":"0";t+="<span>{value}</span>",t+=`<span inert style="position:absolute;top:${l};left:${o};white-space:nowrap;">{value}</span>`}else t+="{value}";return t+="</span>",r&&(t+="</span>"),t},od=(i,e,t,n,s,r,a,o,l)=>{let c=s===nd,h=s===go,u=`_${s}_`,d=Zt(i)?i(t):i,p=c?"block":"inline-block";Nc.innerHTML=d.replace(Ab,`<i class="${u}"></i>`).replace(_b,`${h?l:c?a:o}`);let g=Nc.content,v=g.firstElementChild,m=g.querySelector(`[data-${s}]`)||v,f=g.querySelectorAll(`i.${u}`),x=f.length;if(x){v.style.display=p,m.style.display=p,m.setAttribute(vo,`${a}`),c||(m.setAttribute("data-word",`${o}`),h&&m.setAttribute("data-char",`${l}`));let A=x;for(;A--;){let y=f[A],T=y.parentElement;T.style.display=p,c?T.innerHTML=t.innerHTML:T.replaceChild(t.cloneNode(!0),y)}e.push(m),n.appendChild(g)}else console.warn('The expression "{value}" is missing from the provided template.');return r&&(v.style.outline=`1px dotted ${Eb[s]}`),v},wg=class{constructor(e,t={}){id||(id=Uc?new Uc([],{granularity:mo}):{segment:g=>{let v=[],m=g.split(Sb);for(let f=0,x=m.length;f<x;f++){let A=m[f];v.push({segment:A,isWordLike:!bb.test(A)})}return v}}),sd||(sd=Uc?new Uc([],{granularity:"grapheme"}):{segment:g=>[...g].map(v=>({segment:v}))}),!Nc&&Ti&&(Nc=Ve.createElement("template")),nn.current&&nn.current.register(this);let{words:n,chars:s,lines:r,accessible:a,includeSpaces:o,debug:l}=t,c=(e=Rn(e)?e[0]:e)&&e.nodeType?e:(Bu(e)||[])[0],h=r===!0?{}:r,u=n===!0||Se(n)?{}:n,d=s===!0?{}:s;this.debug=ze(l,!1),this.includeSpaces=ze(o,!1),this.accessible=ze(a,!0),this.linesOnly=h&&!u&&!d,this.lineTemplate=ln(h)?ad(nd,h):h,this.wordTemplate=ln(u)||this.linesOnly?ad(mo,u):u,this.charTemplate=ln(d)?ad(go,d):d,this.$target=c,this.html=c&&c.innerHTML,this.lines=[],this.words=[],this.chars=[],this.effects=[],this.effectsCleanups=[],this.cache=null,this.ready=!1,this.width=0,this.resizeTimeout=null;let p=()=>this.html&&(h||u||d)&&this.split();this.resizeObserver=new ResizeObserver(()=>{clearTimeout(this.resizeTimeout),this.resizeTimeout=setTimeout(()=>{let g=c.offsetWidth;g!==this.width&&(this.width=g,p())},150)}),this.lineTemplate&&!this.ready?Ve.fonts.ready.then(p):p(),c?this.resizeObserver.observe(c):console.warn("No Text Splitter target found.")}addEffect(e){if(!Zt(e))return console.warn("Effect must return a function.");let t=Uu(e);return this.effects.push(t),this.ready&&(this.effectsCleanups[this.effects.length-1]=t(this)),this}revert(){return clearTimeout(this.resizeTimeout),this.lines.length=this.words.length=this.chars.length=0,this.resizeObserver.disconnect(),this.effectsCleanups.forEach(e=>Zt(e)?e(this):e.revert&&e.revert()),this.$target.innerHTML=this.html,this}splitNode(e){let t=this.wordTemplate,n=this.charTemplate,s=this.includeSpaces,r=this.debug,a=e.nodeType;if(a===3){let o=e.nodeValue;if(o.trim()){let l=[],c=this.words,h=this.chars,u=id.segment(o),d=Ve.createDocumentFragment(),p=null;for(let g of u){let v=g.segment,m=Eg(g);if(!p||m&&p&&Eg(p))l.push(v);else{let f=l.length-1;!l[f].includes(" ")&&!v.includes(" ")?l[f]+=v:l.push(v)}p=g}for(let g=0,v=l.length;g<v;g++){let m=l[g];if(m.trim()){let f=l[g+1],x=s&&f&&!f.trim(),A=m,y=n?sd.segment(A):null,T=n?Ve.createDocumentFragment():Ve.createTextNode(x?m+"\xA0":m);if(n){let M=[...y];for(let C=0,R=M.length;C<R;C++){let b=M[C],D=C===R-1&&x?b.segment+"\xA0":b.segment,N=Ve.createTextNode(D);od(n,h,N,T,go,r,-1,c.length,h.length)}}t?od(t,c,T,d,mo,r,-1,c.length,h.length):n?d.appendChild(T):d.appendChild(Ve.createTextNode(m)),x&&g++}else{if(g&&s)continue;d.appendChild(Ve.createTextNode(m))}}e.parentNode.replaceChild(d,e)}}else if(a===1){let o=[...e.childNodes];for(let l=0,c=o.length;l<c;l++)this.splitNode(o[l])}}split(e=!1){let t=this.$target,n=!!this.cache&&!e,s=this.lineTemplate,r=this.wordTemplate,a=this.charTemplate,o=Ve.fonts.status!=="loading",l=s&&o;this.ready=!s||o,(l||e)&&this.effectsCleanups.forEach(d=>Zt(d)&&d(this)),n||(e&&(t.innerHTML=this.html,this.words.length=this.chars.length=0),this.splitNode(t),this.cache=t.innerHTML),l&&(n&&(t.innerHTML=this.cache),this.lines.length=0,r&&(this.words=Bc(t,mo))),a&&(l||r)&&(this.chars=Bc(t,go));let c=this.words.length?this.words:this.chars,h,u=0;for(let d=0,p=c.length;d<p;d++){let g=c[d],{top:v,height:m}=g.getBoundingClientRect();h&&v-h>m*.5&&u++,g.setAttribute(vo,`${u}`);let f=g.querySelectorAll(`[${vo}]`),x=f.length;for(;x--;)f[x].setAttribute(vo,`${u}`);h=v}if(l){let d=Ve.createDocumentFragment(),p=new Set,g=[];for(let v=0;v<u+1;v++){let m=t.cloneNode(!0);Mg(m,v,new Set).forEach(f=>{let x=f.parentElement;x&&p.add(x),f.remove()}),g.push(m)}p.forEach(Tg);for(let v=0,m=g.length;v<m;v++)od(s,this.lines,g[v],d,nd,this.debug,v);t.innerHTML="",t.appendChild(d),r&&(this.words=Bc(t,mo)),a&&(this.chars=Bc(t,go))}if(this.linesOnly){let d=this.words,p=d.length;for(;p--;){let g=d[p];g.replaceWith(g.textContent)}d.length=0}if(this.accessible&&(l||!n)){let d=Ve.createElement("span");d.style.cssText="position:absolute;overflow:hidden;clip:rect(0 0 0 0);clip-path:inset(50%);width:1px;height:1px;white-space:nowrap;",d.innerHTML=this.html,t.insertBefore(d,t.firstChild),this.lines.forEach(rd),this.words.forEach(rd),this.chars.forEach(rd)}return this.width=t.offsetWidth,(l||e)&&this.effects.forEach((d,p)=>this.effectsCleanups[p]=d(this)),this}refresh(){this.split(!0)}},Tb=(i,e)=>new wg(i,e),Cg={split:Tb},me=(i,e={})=>{let t=[],n=0,s=e.from,r=e.reversed,a=e.ease,o=!Se(a),c=o&&!Se(a.ease)?a.ease:o?br(a):null,h=e.grid,u=e.axis,d=e.total,p=Se(s)||s===0||s==="first",g=s==="center",v=s==="last",m=s==="random",f=Rn(i),x=e.use,A=xr(f?i[0]:i),y=f?xr(i[1]):0,T=Pm.exec((f?i[1]:i)+rs),M=e.start||0+(f?A:0),C=p?0:Jn(s)?s:0;return(R,b,S,D)=>{let[N]=lo(R),U=Se(d)?S:d,B=Se(x)?!1:Zt(x)?x(N,b,U):_r(N,x),W=Jn(B)||Un(B)&&Jn(+B)?+B:b;if(g&&(C=(U-1)/2),v&&(C=U-1),!t.length){for(let L=0;L<U;L++){if(!h)t.push(Ni(C-L));else{let J=g?(h[0]-1)/2:C%h[0],ae=g?(h[1]-1)/2:ao(C/h[0]),ve=L%h[0],le=ao(L/h[0]),V=J-ve,j=ae-le,ie=Is(V*V+j*j);u==="x"&&(ie=-V),u==="y"&&(ie=-j),t.push(ie)}n=zm(...t)}c&&(t=t.map(L=>c(L/n)*n)),r&&(t=t.map(L=>u?L<0?L*-1:-L:Ni(n-L))),m&&(t=Gm(t))}let G=f?(y-A)/n:A,P=(D?Pc(D,Se(e.start)?D.iterationDuration:M):M)+(G*Ne(t[W],2)||0);return e.modifier&&(P=e.modifier(P)),T&&(P=`${P}${T[2]}`),P}};var ld=class extends HTMLElement{constructor(){super();this.heartsAnimation=null,this.pointerX=0,this.pointerY=0,this.spread=16,this.$svg=null,this.randomTimer,this.heartsAnimation=Bn({autoplay:!1,duration:100,loop:!0,onLoop:()=>{let e=this.$svg.cloneNode(!0);e.style.cssText="position: absolute; top: -12px; left: -12px; mix-blend-mode: plus-lighter;",e.classList.add("particle"),this.appendChild(e);let t=H.randomPick(["-=","+="]),n=t==="-="?"+=":"-=";Re(e,{translateX:[this.pointerX+H.random(-this.spread,this.spread),t+(5+H.random(-2,2,2)),n+(6+H.random(-2,2,2)),t+(4+H.random(-2,2,2))],translateY:[{from:this.pointerY+H.random(-5,5),to:"-="+H.random(30,50)}],scale:[{from:0,to:.85},{to:0}],duration:1200,onComplete:()=>e.remove()})}})}connectedCallback(){let e=document.createElement("div");e.innerHTML='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="icon"><g id="sponsor" fill="none" fill-rule="evenodd"><path fill="currentColor" fill-rule="nonzero" d="M12 18.445a.778.778 0 0 1-.34-.078C11.39 18.235 5 15.077 5 9.889a3.889 3.889 0 0 1 6.638-2.75L12 7.5l.362-.361A3.889 3.889 0 0 1 19 9.889c0 5.17-6.387 8.344-6.66 8.478a.778.778 0 0 1-.34.078z"></path></g></svg>',this.$svg=e.querySelector("svg"),this.addEventListener("mouseenter",this),this.addEventListener("mousemove",this),this.addEventListener("mouseleave",this)}randomAnimation(){this.randomTimer=Bn({duration:H.random(1e3,4e3),onComplete:()=>{let{width:e}=this.getBoundingClientRect();Re(this,{pointerX:[H.random(0,40),H.random(e-40,e)],pointerY:[H.random(20,40),H.random(20,40)],ease:"linear",onComplete:()=>{this.heartsAnimation.pause()}}),this.heartsAnimation.play(),this.randomAnimation()}})}disconnectedCallback(){this.removeEventListener("mouseenter",this),this.removeEventListener("mousemove",this),this.removeEventListener("mouseleave",this),H.remove(this.$svg),this.heartsAnimation.revert()}mousemove(e){let{width:t,height:n,left:s,top:r}=this.getBoundingClientRect();this.pointerX=H.clamp(e.clientX-s,this.spread,t-this.spread),this.pointerY=H.clamp(e.clientY-r,0,n)}mouseenter(e){this.mousemove(e),Re(this.$svg,{scale:[1,1.25,1],loop:!0,duration:900}),this.heartsAnimation.play()}mouseleave(){Re(this.$svg,{scale:1,duration:500}),this.heartsAnimation.pause()}handleEvent(e){let t=e.type;this[t]&&this[t](e)}};var Rg=new O,Mb=new Xn,Dg=new O,cd=class extends Rt{constructor(e=document.createElement("div")){super();this.isCSS3DObject=!0,this.element=e,this.element.style.position="absolute",this.element.style.pointerEvents="auto",this.element.style.userSelect="none",this.element.setAttribute("draggable",!1),this.addEventListener("removed",function(){this.traverse(function(t){t.element instanceof t.element.ownerDocument.defaultView.Element&&t.element.parentNode!==null&&t.element.remove()})})}copy(e,t){return super.copy(e,t),this.element=e.element.cloneNode(!0),this}};var Oi=new Ze,wb=new Ze,hd=class{constructor(e={}){let t=this,n,s,r,a,o={camera:{style:""},objects:new WeakMap},l=e.element!==void 0?e.element:document.createElement("div");l.style.overflow="hidden",this.domElement=l;let c=document.createElement("div");c.style.transformOrigin="0 0",c.style.pointerEvents="none",l.appendChild(c);let h=document.createElement("div");h.style.transformStyle="preserve-3d",c.appendChild(h),this.getSize=function(){return{width:n,height:s}},this.render=function(m,f){let x=f.projectionMatrix.elements[5]*a;f.view&&f.view.enabled?(c.style.transform=`translate( ${-f.view.offsetX*(n/f.view.width)}px, ${-f.view.offsetY*(s/f.view.height)}px )`,c.style.transform+=`scale( ${f.view.fullWidth/f.view.width}, ${f.view.fullHeight/f.view.height} )`):c.style.transform="",m.matrixWorldAutoUpdate===!0&&m.updateMatrixWorld(),f.parent===null&&f.matrixWorldAutoUpdate===!0&&f.updateMatrixWorld();let A,y;f.isOrthographicCamera&&(A=-(f.right+f.left)/2,y=(f.top+f.bottom)/2);let T=f.view&&f.view.enabled?f.view.height/f.view.fullHeight:1,M=f.isOrthographicCamera?`scale( ${T} )scale(`+x+")translate("+u(A)+"px,"+u(y)+"px)"+d(f.matrixWorldInverse):`scale( ${T} )translateZ(`+x+"px)"+d(f.matrixWorldInverse),R=(f.isPerspectiveCamera?"perspective("+x+"px) ":"")+M+"translate("+r+"px,"+a+"px)";o.camera.style!==R&&(h.style.transform=R,o.camera.style=R),v(m,m,f,M)},this.setSize=function(m,f){n=m,s=f,r=n/2,a=s/2,l.style.width=m+"px",l.style.height=f+"px",c.style.width=m+"px",c.style.height=f+"px",h.style.width=m+"px",h.style.height=f+"px"};function u(m){return Math.abs(m)<1e-10?0:m}function d(m){let f=m.elements;return"matrix3d("+u(f[0])+","+u(-f[1])+","+u(f[2])+","+u(f[3])+","+u(f[4])+","+u(-f[5])+","+u(f[6])+","+u(f[7])+","+u(f[8])+","+u(-f[9])+","+u(f[10])+","+u(f[11])+","+u(f[12])+","+u(-f[13])+","+u(f[14])+","+u(f[15])+")"}function p(m){let f=m.elements,x="matrix3d("+u(f[0])+","+u(f[1])+","+u(f[2])+","+u(f[3])+","+u(-f[4])+","+u(-f[5])+","+u(-f[6])+","+u(-f[7])+","+u(f[8])+","+u(f[9])+","+u(f[10])+","+u(f[11])+","+u(f[12])+","+u(f[13])+","+u(f[14])+","+u(f[15])+")";return"translate(-50%,-50%)"+x}function g(m){m.isCSS3DObject&&(m.element.style.display="none");for(let f=0,x=m.children.length;f<x;f++)g(m.children[f])}function v(m,f,x,A){if(m.visible===!1){g(m);return}if(m.isCSS3DObject){let y=m.layers.test(x.layers)===!0,T=m.element;if(T.style.display=y===!0?"":"none",y===!0){m.onBeforeRender(t,f,x);let M;m.isCSS3DSprite?(Oi.copy(x.matrixWorldInverse),Oi.transpose(),m.rotation2D!==0&&Oi.multiply(wb.makeRotationZ(m.rotation2D)),m.matrixWorld.decompose(Rg,Mb,Dg),Oi.setPosition(Rg),Oi.scale(Dg),Oi.elements[3]=0,Oi.elements[7]=0,Oi.elements[11]=0,Oi.elements[15]=1,M=p(Oi)):M=p(m.matrixWorld);let C=o.objects.get(m);if(C===void 0||C.style!==M){T.style.transform=M;let R={style:M};o.objects.set(m,R)}T.parentNode!==h&&h.appendChild(T),m.onAfterRender(t,f,x)}}for(let y=0,T=m.children.length;y<T;y++)v(m.children[y],f,x,A)}}};var xo={minM:"(min-width: 900px)",isM:"(min-width: 900px) and (max-width: 1199px)",minL:"(min-width: 1200px)"},Oc=Bs({mediaQueries:xo});Oc.add(i=>{let e=document.querySelector("#site-header"),t=document.querySelector("#site-menu"),n=document.querySelector("#toggle-site-menu");if(i.add("preventDefault",o=>{e.contains(o.target)||(o.preventDefault(),i.methods.closeSiteMenu())}),i.add("preventScroll",()=>{document.documentElement.style.overflow="hidden",document.body.style.position="fixed",document.body.style.top=`-${window.scrollY}px`,document.addEventListener("touchstart",i.methods.preventDefault,{passive:!1})}),i.add("allowScroll",()=>{let o=document.body.style.top;document.removeEventListener("touchstart",i.methods.preventDefault),document.documentElement.style.overflow="",document.body.style.position="",document.body.style.top="",window.scrollTo(0,parseInt(o||"0")*-1)}),!i.matches.minL){let[o,l]=n.querySelectorAll("rect"),{offsetWidth:c,offsetHeight:h}=t;H.set(t,{width:c*2,willChange:"transform"});let u=Ke({defaults:{duration:250},autoplay:!1}).add(o,{rotate:["45deg","0deg"],y:[12,8]},0).add(l,{rotate:["-45deg","0deg"],y:[12,14]},0).add(e,{"--overlay-opacity":[1,0]},0);i.data.draggable=us(t,{container:[0,c*2,h,c],x:{snap:c},y:!1,velocityMultiplier:4,minVelocity:2,onUpdate:d=>{u.progress=d.progressX;let p=d.progressX===0,g=d.progressX===1;t.classList.toggle("is-active",p),p&&i.methods.preventScroll(),g&&i.methods.allowScroll()}}),i.data.draggable.progressX=1}i.add("openSiteMenu",()=>{i.matches.minL||t.classList.contains("is-active")||Re(i.data.draggable,{progressX:0,ease:"outElastic(.75, 1.25)",duration:500})}),i.add("closeSiteMenu",()=>{i.matches.minL||!t.classList.contains("is-active")||Re(i.data.draggable,{progressX:1,ease:"inOut(2.5)",duration:250})}),i.add("toggleSiteMenu",()=>{if(i.matches.minL||!t)return;t.classList.contains("is-active")?i.methods.closeSiteMenu():i.methods.openSiteMenu()});let s;function r(){let o=this.querySelector("svg:not(.particle)");Re(o,{scale:[1,1.25,1],loop:!0,duration:900}),s=Bn({duration:100,loop:!0,onLoop:()=>{let l=o.cloneNode(!0);l.style.cssText="position: absolute; top: 0; left: 0px;   mix-blend-mode: plus-lighter;",l.classList.add("particle"),this.appendChild(l),Re(l,{translateX:[ui.inOutCirc(H.random(0,1,2))*(this.offsetWidth-10),"-="+(5+H.random(-2,2,2)),"+="+(5+H.random(-2,2,2)),"-="+(5+H.random(-2,2,2))],translateY:[{from:H.random(.75,1.25,2)+"em",to:"-=2.5"}],scale:[{from:0,to:.85},{to:0}],duration:1200,onComplete:()=>l.remove()})}})}function a(){let o=this.querySelector("svg:not(.particle)");Re(o,{scale:1,duration:500}),s&&s.revert()}return()=>{!t||(t.classList.remove("is-active"),i.methods.allowScroll())}});var Ci=class{constructor(e,t,n,s,r="div"){this.parent=e,this.object=t,this.property=n,this._disabled=!1,this._hidden=!1,this.initialValue=this.getValue(),this.domElement=document.createElement(r),this.domElement.classList.add("controller"),this.domElement.classList.add(s),this.$name=document.createElement("div"),this.$name.classList.add("name"),Ci.nextNameID=Ci.nextNameID||0,this.$name.id=`lil-gui-name-${++Ci.nextNameID}`,this.$widget=document.createElement("div"),this.$widget.classList.add("widget"),this.$disable=this.$widget,this.domElement.appendChild(this.$name),this.domElement.appendChild(this.$widget),this.domElement.addEventListener("keydown",a=>a.stopPropagation()),this.domElement.addEventListener("keyup",a=>a.stopPropagation()),this.parent.children.push(this),this.parent.controllers.push(this),this.parent.$children.appendChild(this.domElement),this._listenCallback=this._listenCallback.bind(this),this.name(n)}name(e){return this._name=e,this.$name.textContent=e,this}onChange(e){return this._onChange=e,this}_callOnChange(){this.parent._callOnChange(this),this._onChange!==void 0&&this._onChange.call(this,this.getValue()),this._changed=!0}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(){this._changed&&(this.parent._callOnFinishChange(this),this._onFinishChange!==void 0&&this._onFinishChange.call(this,this.getValue())),this._changed=!1}reset(){return this.setValue(this.initialValue),this._callOnFinishChange(),this}enable(e=!0){return this.disable(!e)}disable(e=!0){return e===this._disabled?this:(this._disabled=e,this.domElement.classList.toggle("disabled",e),this.$disable.toggleAttribute("disabled",e),this)}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}options(e){let t=this.parent.add(this.object,this.property,e);return t.name(this._name),this.destroy(),t}min(e){return this}max(e){return this}step(e){return this}decimals(e){return this}listen(e=!0){return this._listening=e,this._listenCallbackID!==void 0&&(cancelAnimationFrame(this._listenCallbackID),this._listenCallbackID=void 0),this._listening&&this._listenCallback(),this}_listenCallback(){this._listenCallbackID=requestAnimationFrame(this._listenCallback);let e=this.save();e!==this._listenPrevValue&&this.updateDisplay(),this._listenPrevValue=e}getValue(){return this.object[this.property]}setValue(e){return this.getValue()!==e&&(this.object[this.property]=e,this._callOnChange(),this.updateDisplay()),this}updateDisplay(){return this}load(e){return this.setValue(e),this._callOnFinishChange(),this}save(){return this.getValue()}destroy(){this.listen(!1),this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.controllers.splice(this.parent.controllers.indexOf(this),1),this.parent.$children.removeChild(this.domElement)}},Pg=class extends Ci{constructor(e,t,n){super(e,t,n,"boolean","label");this.$input=document.createElement("input"),this.$input.setAttribute("type","checkbox"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$widget.appendChild(this.$input),this.$input.addEventListener("change",()=>{this.setValue(this.$input.checked),this._callOnFinishChange()}),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.checked=this.getValue(),this}};function ud(i){let e,t;return(e=i.match(/(#|0x)?([a-f0-9]{6})/i))?t=e[2]:(e=i.match(/rgb\(\s*(\d*)\s*,\s*(\d*)\s*,\s*(\d*)\s*\)/))?t=parseInt(e[1]).toString(16).padStart(2,0)+parseInt(e[2]).toString(16).padStart(2,0)+parseInt(e[3]).toString(16).padStart(2,0):(e=i.match(/^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i))&&(t=e[1]+e[1]+e[2]+e[2]+e[3]+e[3]),t?"#"+t:!1}var Cb={isPrimitive:!0,match:i=>typeof i=="string",fromHexString:ud,toHexString:ud},yo={isPrimitive:!0,match:i=>typeof i=="number",fromHexString:i=>parseInt(i.substring(1),16),toHexString:i=>"#"+i.toString(16).padStart(6,0)},Rb={isPrimitive:!1,match:i=>Array.isArray(i),fromHexString(i,e,t=1){let n=yo.fromHexString(i);e[0]=(n>>16&255)/255*t,e[1]=(n>>8&255)/255*t,e[2]=(n&255)/255*t},toHexString([i,e,t],n=1){n=255/n;let s=i*n<<16^e*n<<8^t*n<<0;return yo.toHexString(s)}},Db={isPrimitive:!1,match:i=>Object(i)===i,fromHexString(i,e,t=1){let n=yo.fromHexString(i);e.r=(n>>16&255)/255*t,e.g=(n>>8&255)/255*t,e.b=(n&255)/255*t},toHexString({r:i,g:e,b:t},n=1){n=255/n;let s=i*n<<16^e*n<<8^t*n<<0;return yo.toHexString(s)}},Pb=[Cb,yo,Rb,Db];function Ib(i){return Pb.find(e=>e.match(i))}var Ig=class extends Ci{constructor(e,t,n,s){super(e,t,n,"color");this.$input=document.createElement("input"),this.$input.setAttribute("type","color"),this.$input.setAttribute("tabindex",-1),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$text=document.createElement("input"),this.$text.setAttribute("type","text"),this.$text.setAttribute("spellcheck","false"),this.$text.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this.$display.appendChild(this.$input),this.$widget.appendChild(this.$display),this.$widget.appendChild(this.$text),this._format=Ib(this.initialValue),this._rgbScale=s,this._initialValueHexString=this.save(),this._textFocused=!1,this.$input.addEventListener("input",()=>{this._setValueFromHexString(this.$input.value)}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$text.addEventListener("input",()=>{let r=ud(this.$text.value);r&&this._setValueFromHexString(r)}),this.$text.addEventListener("focus",()=>{this._textFocused=!0,this.$text.select()}),this.$text.addEventListener("blur",()=>{this._textFocused=!1,this.updateDisplay(),this._callOnFinishChange()}),this.$disable=this.$text,this.updateDisplay()}reset(){return this._setValueFromHexString(this._initialValueHexString),this}_setValueFromHexString(e){if(this._format.isPrimitive){let t=this._format.fromHexString(e);this.setValue(t)}else this._format.fromHexString(e,this.getValue(),this._rgbScale),this._callOnChange(),this.updateDisplay()}save(){return this._format.toHexString(this.getValue(),this._rgbScale)}load(e){return this._setValueFromHexString(e),this._callOnFinishChange(),this}updateDisplay(){return this.$input.value=this._format.toHexString(this.getValue(),this._rgbScale),this._textFocused||(this.$text.value=this.$input.value.substring(1)),this.$display.style.backgroundColor=this.$input.value,this}},kc=class extends Ci{constructor(e,t,n){super(e,t,n,"function");this.$button=document.createElement("button"),this.$button.appendChild(this.$name),this.$widget.appendChild(this.$button),this.$button.addEventListener("click",s=>{s.preventDefault(),this.getValue().call(this.object),this._callOnChange()}),this.$button.addEventListener("touchstart",()=>{},{passive:!0}),this.$disable=this.$button}},Lg=class extends Ci{constructor(e,t,n,s,r,a){super(e,t,n,"number");this._initInput(),this.min(s),this.max(r);let o=a!==void 0;this.step(o?a:this._getImplicitStep(),o),this.updateDisplay()}decimals(e){return this._decimals=e,this.updateDisplay(),this}min(e){return this._min=e,this._onUpdateMinMax(),this}max(e){return this._max=e,this._onUpdateMinMax(),this}step(e,t=!0){return this._step=e,this._stepExplicit=t,this}updateDisplay(){let e=this.getValue();if(this._hasSlider){let t=(e-this._min)/(this._max-this._min);t=Math.max(0,Math.min(t,1)),this.$fill.style.width=t*100+"%"}return this._inputFocused||(this.$input.value=this._decimals===void 0?e:e.toFixed(this._decimals)),this}_initInput(){this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("aria-labelledby",this.$name.id),window.matchMedia("(pointer: coarse)").matches&&(this.$input.setAttribute("type","number"),this.$input.setAttribute("step","any")),this.$widget.appendChild(this.$input),this.$disable=this.$input;let t=()=>{let x=parseFloat(this.$input.value);isNaN(x)||(this._stepExplicit&&(x=this._snap(x)),this.setValue(this._clamp(x)))},n=x=>{let A=parseFloat(this.$input.value);isNaN(A)||(this._snapClampSetValue(A+x),this.$input.value=this.getValue())},s=x=>{x.key==="Enter"&&this.$input.blur(),x.code==="ArrowUp"&&(x.preventDefault(),n(this._step*this._arrowKeyMultiplier(x))),x.code==="ArrowDown"&&(x.preventDefault(),n(this._step*this._arrowKeyMultiplier(x)*-1))},r=x=>{this._inputFocused&&(x.preventDefault(),n(this._step*this._normalizeMouseWheel(x)))},a=!1,o,l,c,h,u,d=5,p=x=>{o=x.clientX,l=c=x.clientY,a=!0,h=this.getValue(),u=0,window.addEventListener("mousemove",g),window.addEventListener("mouseup",v)},g=x=>{if(a){let A=x.clientX-o,y=x.clientY-l;Math.abs(y)>d?(x.preventDefault(),this.$input.blur(),a=!1,this._setDraggingStyle(!0,"vertical")):Math.abs(A)>d&&v()}a||(u-=(x.clientY-c)*this._step*this._arrowKeyMultiplier(x),h+u>this._max?u=this._max-h:h+u<this._min&&(u=this._min-h),this._snapClampSetValue(h+u)),c=x.clientY},v=()=>{this._setDraggingStyle(!1,"vertical"),this._callOnFinishChange(),window.removeEventListener("mousemove",g),window.removeEventListener("mouseup",v)},m=()=>{this._inputFocused=!0},f=()=>{this._inputFocused=!1,this.updateDisplay(),this._callOnFinishChange()};this.$input.addEventListener("input",t),this.$input.addEventListener("keydown",s),this.$input.addEventListener("wheel",r,{passive:!1}),this.$input.addEventListener("mousedown",p),this.$input.addEventListener("focus",m),this.$input.addEventListener("blur",f)}_initSlider(){this._hasSlider=!0,this.$slider=document.createElement("div"),this.$slider.classList.add("slider"),this.$fill=document.createElement("div"),this.$fill.classList.add("fill"),this.$slider.appendChild(this.$fill),this.$widget.insertBefore(this.$slider,this.$input),this.domElement.classList.add("hasSlider");let e=(f,x,A,y,T)=>(f-x)/(A-x)*(T-y)+y,t=f=>{let x=this.$slider.getBoundingClientRect(),A=e(f,x.left,x.right,this._min,this._max);this._snapClampSetValue(A)},n=f=>{this._setDraggingStyle(!0),t(f.clientX),window.addEventListener("mousemove",s),window.addEventListener("mouseup",r)},s=f=>{t(f.clientX)},r=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("mousemove",s),window.removeEventListener("mouseup",r)},a=!1,o,l,c=f=>{f.preventDefault(),this._setDraggingStyle(!0),t(f.touches[0].clientX),a=!1},h=f=>{f.touches.length>1||(this._hasScrollBar?(o=f.touches[0].clientX,l=f.touches[0].clientY,a=!0):c(f),window.addEventListener("touchmove",u,{passive:!1}),window.addEventListener("touchend",d))},u=f=>{if(a){let x=f.touches[0].clientX-o,A=f.touches[0].clientY-l;Math.abs(x)>Math.abs(A)?c(f):(window.removeEventListener("touchmove",u),window.removeEventListener("touchend",d))}else f.preventDefault(),t(f.touches[0].clientX)},d=()=>{this._callOnFinishChange(),this._setDraggingStyle(!1),window.removeEventListener("touchmove",u),window.removeEventListener("touchend",d)},p=this._callOnFinishChange.bind(this),g=400,v,m=f=>{if(Math.abs(f.deltaX)<Math.abs(f.deltaY)&&this._hasScrollBar)return;f.preventDefault();let A=this._normalizeMouseWheel(f)*this._step;this._snapClampSetValue(this.getValue()+A),this.$input.value=this.getValue(),clearTimeout(v),v=setTimeout(p,g)};this.$slider.addEventListener("mousedown",n),this.$slider.addEventListener("touchstart",h,{passive:!1}),this.$slider.addEventListener("wheel",m,{passive:!1})}_setDraggingStyle(e,t="horizontal"){this.$slider&&this.$slider.classList.toggle("active",e),document.body.classList.toggle("lil-gui-dragging",e),document.body.classList.toggle(`lil-gui-${t}`,e)}_getImplicitStep(){return this._hasMin&&this._hasMax?(this._max-this._min)/1e3:.1}_onUpdateMinMax(){!this._hasSlider&&this._hasMin&&this._hasMax&&(this._stepExplicit||this.step(this._getImplicitStep(),!1),this._initSlider(),this.updateDisplay())}_normalizeMouseWheel(e){let{deltaX:t,deltaY:n}=e;return Math.floor(e.deltaY)!==e.deltaY&&e.wheelDelta&&(t=0,n=-e.wheelDelta/120,n*=this._stepExplicit?1:10),t+-n}_arrowKeyMultiplier(e){let t=this._stepExplicit?1:10;return e.shiftKey?t*=10:e.altKey&&(t/=10),t}_snap(e){let t=0;return this._hasMin?t=this._min:this._hasMax&&(t=this._max),e-=t,e=Math.round(e/this._step)*this._step,e+=t,e=parseFloat(e.toPrecision(15)),e}_clamp(e){return e<this._min&&(e=this._min),e>this._max&&(e=this._max),e}_snapClampSetValue(e){this.setValue(this._clamp(this._snap(e)))}get _hasScrollBar(){let e=this.parent.root.$children;return e.scrollHeight>e.clientHeight}get _hasMin(){return this._min!==void 0}get _hasMax(){return this._max!==void 0}},Fg=class extends Ci{constructor(e,t,n,s){super(e,t,n,"option");this.$select=document.createElement("select"),this.$select.setAttribute("aria-labelledby",this.$name.id),this.$display=document.createElement("div"),this.$display.classList.add("display"),this.$select.addEventListener("change",()=>{this.setValue(this._values[this.$select.selectedIndex]),this._callOnFinishChange()}),this.$select.addEventListener("focus",()=>{this.$display.classList.add("focus")}),this.$select.addEventListener("blur",()=>{this.$display.classList.remove("focus")}),this.$widget.appendChild(this.$select),this.$widget.appendChild(this.$display),this.$disable=this.$select,this.options(s)}options(e){return this._values=Array.isArray(e)?e:Object.values(e),this._names=Array.isArray(e)?e:Object.keys(e),this.$select.replaceChildren(),this._names.forEach(t=>{let n=document.createElement("option");n.textContent=t,this.$select.appendChild(n)}),this.updateDisplay(),this}updateDisplay(){let e=this.getValue(),t=this._values.indexOf(e);return this.$select.selectedIndex=t,this.$display.textContent=t===-1?e:this._names[t],this}},Ug=class extends Ci{constructor(e,t,n){super(e,t,n,"string");this.$input=document.createElement("input"),this.$input.setAttribute("type","text"),this.$input.setAttribute("spellcheck","false"),this.$input.setAttribute("aria-labelledby",this.$name.id),this.$input.addEventListener("input",()=>{this.setValue(this.$input.value)}),this.$input.addEventListener("keydown",s=>{s.code==="Enter"&&this.$input.blur()}),this.$input.addEventListener("blur",()=>{this._callOnFinishChange()}),this.$widget.appendChild(this.$input),this.$disable=this.$input,this.updateDisplay()}updateDisplay(){return this.$input.value=this.getValue(),this}},Lb=`.lil-gui {
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
}`;function Fb(i){let e=document.createElement("style");e.innerHTML=i;let t=document.querySelector("head link[rel=stylesheet], head style");t?document.head.insertBefore(e,t):document.head.appendChild(e)}var Ng=!1,Ao=class{constructor({parent:e,autoPlace:t=e===void 0,container:n,width:s,title:r="Controls",closeFolders:a=!1,injectStyles:o=!0,touchStyles:l=!0}={}){if(this.parent=e,this.root=e?e.root:this,this.children=[],this.controllers=[],this.folders=[],this._closed=!1,this._hidden=!1,this.domElement=document.createElement("div"),this.domElement.classList.add("lil-gui"),this.$title=document.createElement("button"),this.$title.classList.add("title"),this.$title.setAttribute("aria-expanded",!0),this.$title.addEventListener("click",()=>this.openAnimated(this._closed)),this.$title.addEventListener("touchstart",()=>{},{passive:!0}),this.$children=document.createElement("div"),this.$children.classList.add("children"),this.domElement.appendChild(this.$title),this.domElement.appendChild(this.$children),this.title(r),this.parent){this.parent.children.push(this),this.parent.folders.push(this),this.parent.$children.appendChild(this.domElement);return}this.domElement.classList.add("root"),l&&this.domElement.classList.add("allow-touch-styles"),!Ng&&o&&(Fb(Lb),Ng=!0),n?n.appendChild(this.domElement):t&&(this.domElement.classList.add("autoPlace"),document.body.appendChild(this.domElement)),s&&this.domElement.style.setProperty("--width",s+"px"),this._closeFolders=a}add(e,t,n,s,r){if(Object(n)===n)return new Fg(this,e,t,n);let a=e[t];switch(typeof a){case"number":return new Lg(this,e,t,n,s,r);case"boolean":return new Pg(this,e,t);case"string":return new Ug(this,e,t);case"function":return new kc(this,e,t)}console.error(`gui.add failed
	property:`,t,`
	object:`,e,`
	value:`,a)}addColor(e,t,n=1){return new Ig(this,e,t,n)}addFolder(e){let t=new Ao({parent:this,title:e});return this.root._closeFolders&&t.close(),t}load(e,t=!0){return e.controllers&&this.controllers.forEach(n=>{n instanceof kc||n._name in e.controllers&&n.load(e.controllers[n._name])}),t&&e.folders&&this.folders.forEach(n=>{n._title in e.folders&&n.load(e.folders[n._title])}),this}save(e=!0){let t={controllers:{},folders:{}};return this.controllers.forEach(n=>{if(!(n instanceof kc)){if(n._name in t.controllers)throw new Error(`Cannot save GUI with duplicate property "${n._name}"`);t.controllers[n._name]=n.save()}}),e&&this.folders.forEach(n=>{if(n._title in t.folders)throw new Error(`Cannot save GUI with duplicate folder "${n._title}"`);t.folders[n._title]=n.save()}),t}open(e=!0){return this._setClosed(!e),this.$title.setAttribute("aria-expanded",!this._closed),this.domElement.classList.toggle("closed",this._closed),this}close(){return this.open(!1)}_setClosed(e){this._closed!==e&&(this._closed=e,this._callOnOpenClose(this))}show(e=!0){return this._hidden=!e,this.domElement.style.display=this._hidden?"none":"",this}hide(){return this.show(!1)}openAnimated(e=!0){return this._setClosed(!e),this.$title.setAttribute("aria-expanded",!this._closed),requestAnimationFrame(()=>{let t=this.$children.clientHeight;this.$children.style.height=t+"px",this.domElement.classList.add("transition");let n=r=>{r.target===this.$children&&(this.$children.style.height="",this.domElement.classList.remove("transition"),this.$children.removeEventListener("transitionend",n))};this.$children.addEventListener("transitionend",n);let s=e?this.$children.scrollHeight:0;this.domElement.classList.toggle("closed",!e),requestAnimationFrame(()=>{this.$children.style.height=s+"px"})}),this}title(e){return this._title=e,this.$title.textContent=e,this}reset(e=!0){return(e?this.controllersRecursive():this.controllers).forEach(n=>n.reset()),this}onChange(e){return this._onChange=e,this}_callOnChange(e){this.parent&&this.parent._callOnChange(e),this._onChange!==void 0&&this._onChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}onFinishChange(e){return this._onFinishChange=e,this}_callOnFinishChange(e){this.parent&&this.parent._callOnFinishChange(e),this._onFinishChange!==void 0&&this._onFinishChange.call(this,{object:e.object,property:e.property,value:e.getValue(),controller:e})}onOpenClose(e){return this._onOpenClose=e,this}_callOnOpenClose(e){this.parent&&this.parent._callOnOpenClose(e),this._onOpenClose!==void 0&&this._onOpenClose.call(this,e)}destroy(){this.parent&&(this.parent.children.splice(this.parent.children.indexOf(this),1),this.parent.folders.splice(this.parent.folders.indexOf(this),1)),this.domElement.parentElement&&this.domElement.parentElement.removeChild(this.domElement),Array.from(this.children).forEach(e=>e.destroy())}controllersRecursive(){let e=Array.from(this.controllers);return this.folders.forEach(t=>{e=e.concat(t.controllersRecursive())}),e}foldersRecursive(){let e=Array.from(this.folders);return this.folders.forEach(t=>{e=e.concat(t.foldersRecursive())}),e}};var Mr=af(Bg()),pd=class{constructor(){this.enabled=!1,this.helpers=!1,this.gui=new Ao({autoPlace:!1}),this.gui.domElement.id="gui",this.stats=new Mr.default,this.stats.showPanel(0),this.perfFolder=this.gui.addFolder("Monitoring"),this.pixelsPanel=this.stats.addPanel(new Mr.default.Panel("pixels","#5A87FF","#111116")),this.trianglesPanel=this.stats.addPanel(new Mr.default.Panel("triangles","#61C3FF","#111116")),this.callsPanel=this.stats.addPanel(new Mr.default.Panel("calls","#FF7C72","#111116")),this.objects3DPanel=this.stats.addPanel(new Mr.default.Panel("3D objects","#A6FF8F","#111116")),this.entitiesPanel=this.stats.addPanel(new Mr.default.Panel("entities","#C26EFF","#111116"))}enable(e){this.enabled||(this.enabled=!0,this.helpers=!!e,this.stats.dom.style.cssText="pointer-events: none; display: flex; flex-wrap: wrap; position: relative;",this.stats.dom.querySelectorAll("canvas").forEach(t=>t.style.display="inline-block"),this.perfLiEl=document.createElement("div"),this.perfLiEl.appendChild(this.stats.dom),this.perfFolder.$children.appendChild(this.perfLiEl),this.gui.domElement.style.cssText="--width: 320px; position: fixed; z-index: 1000; top: 0px; right: 0px",document.body.appendChild(this.gui.domElement),this.helpers&&document.body.classList.add("debug"))}disable(){!this.enabled||(this.enabled=!1,this.perfFolder.$children.removeChild(this.perfLiEl),document.body.removeChild(this.gui.domElement),this.helpers&&document.body.classList.add("debug"))}};var zc=class extends Rt{constructor(e=document.createElement("div")){super();this.isCSS2DObject=!0,this.element=e,this.element.style.position="absolute",this.element.style.userSelect="none",this.element.setAttribute("draggable",!1),this.center=new Pe(.5,.5),this.addEventListener("removed",function(){this.traverse(function(t){t.element instanceof t.element.ownerDocument.defaultView.Element&&t.element.parentNode!==null&&t.element.remove()})})}copy(e,t){return super.copy(e,t),this.element=e.element.cloneNode(!0),this.center=e.center,this}},Aa=new O,Og=new Ze,kg=new Ze,zg=new O,Hg=new O,md=class{constructor(e={}){let t=this,n,s,r,a,o={objects:new WeakMap},l=e.element!==void 0?e.element:document.createElement("div");l.style.overflow="hidden",this.domElement=l,this.getSize=function(){return{width:n,height:s}},this.render=function(g,v){g.matrixWorldAutoUpdate===!0&&g.updateMatrixWorld(),v.parent===null&&v.matrixWorldAutoUpdate===!0&&v.updateMatrixWorld(),Og.copy(v.matrixWorldInverse),kg.multiplyMatrices(v.projectionMatrix,Og),h(g,g,v),p(g)},this.setSize=function(g,v){n=g,s=v,r=n/2,a=s/2,l.style.width=g+"px",l.style.height=v+"px"};function c(g){g.isCSS2DObject&&(g.element.style.display="none");for(let v=0,m=g.children.length;v<m;v++)c(g.children[v])}function h(g,v,m){if(g.visible===!1){c(g);return}if(g.isCSS2DObject){Aa.setFromMatrixPosition(g.matrixWorld),Aa.applyMatrix4(kg);let f=Aa.z>=-1&&Aa.z<=1&&g.layers.test(m.layers)===!0,x=g.element;x.style.display=f===!0?"":"none",f===!0&&(g.onBeforeRender(t,v,m),x.style.transform="translate("+-100*g.center.x+"%,"+-100*g.center.y+"%)translate("+(Aa.x*r+r)+"px,"+(-Aa.y*a+a)+"px)",x.parentNode!==l&&l.appendChild(x),g.onAfterRender(t,v,m));let A={distanceToCameraSquared:u(m,g)};o.objects.set(g,A)}for(let f=0,x=g.children.length;f<x;f++)h(g.children[f],v,m)}function u(g,v){return zg.setFromMatrixPosition(g.matrixWorld),Hg.setFromMatrixPosition(v.matrixWorld),zg.distanceToSquared(Hg)}function d(g){let v=[];return g.traverseVisible(function(m){m.isCSS2DObject&&v.push(m)}),v}function p(g){let v=d(g).sort(function(f,x){if(f.renderOrder!==x.renderOrder)return x.renderOrder-f.renderOrder;let A=o.objects.get(f).distanceToCameraSquared,y=o.objects.get(x).distanceToCameraSquared;return A-y}),m=v.length;for(let f=0,x=v.length;f<x;f++)v[f].element.style.zIndex=m-f}}};var Gg=class{constructor(e,t,n){this.$connector1=e,this.$connector2=t,this.$el=document.createElementNS("http://www.w3.org/2000/svg","polyline"),this.$el.setAttribute("points","0 0 32 0 64 32"),this.$el.style.stroke="var(--hex-fg-4)",this.$el.style.fill="none",this.$el.style.strokeWidth="1px",this.$el.style.strokeLinejoin="square",this.flipped=n,this.rect1=this.$connector1.getBoundingClientRect(),this.rect2=this.$connector2.getBoundingClientRect(),this.gap=4,this.x=0,this.y=0,this.targetX=0,this.targetY=0,this.renders=0}updatePoints(e,t,n,s,r,a){this.$el.setAttribute("points",`${e} ${t} ${n} ${s} ${r} ${a}`)}updateConnector1Dimensions(){this.rect1=this.$connector1.getBoundingClientRect()}updateCoords(){if(!this.renders){let r=this.$connector2.style.transform;if(r){let a=r.split(") translate(");if(a.length){let o=a[1].split(", ");o.length&&(this.targetX=parseFloat(o[0]),this.targetY=parseFloat(o[1]),!this.x&&!this.y&&(this.x=this.targetX,this.y=this.targetY))}}}this.x=H.lerp(this.x,this.targetX,.25),this.y=H.lerp(this.y,this.targetY,.25),this.renders++,this.renders>3&&(this.renders=0);let e=this.rect1.height/2+1,t=this.rect1.top,n=this.y,s=n+e-(t+e);if(this.flipped){let r=this.rect1.left-this.gap,a=t+e,o=this.x,l=n+e,c=Math.abs(s),h=r-o;c>h&&(c=Math.max(0,h));let u=o+c,d=a;this.updatePoints(r,a,u,d,o,l)}else{let r=this.gap+this.rect1.right,a=t+e,o=this.x,l=n+e,c=Math.abs(s),h=o-r;c>h&&(c=Math.max(0,h));let u=o-c,d=a;this.updatePoints(r,a,u,d,o,l)}}},gd=class{constructor(e){let t=document.createElement("div");t.innerHTML=`
    <svg id="path-animation" viewBox="0 0 0 0"></svg>
    `,this.$el=t.firstElementChild,this.$path=this.$el.querySelector("polyline"),this.lines=[],this.$parent=e,this.$parent.appendChild(this.$el),this.updateDimensions()}createLine(e,t,n,s){let r=new Gg(e,t,n);s&&r.$el.classList.add(s),this.$el.appendChild(r.$el),this.lines.push(r)}update(){for(let e=0,t=this.lines.length;e<t;e++)this.lines[e].updateCoords()}updateDimensions(){let e=this.$parent.offsetWidth,t=this.$parent.offsetHeight;this.$el.setAttribute("viewBox",`0 0 ${e} ${t}`),this.lines.forEach(n=>n.updateConnector1Dimensions())}};var vd=class{constructor(e){this.debug=e,this.domViewportEl=document.getElementById("engine"),this.renderer=new no({powerPreference:"high-performance",antialias:!1,alpha:!1,stencil:!1,depth:!1}),this.renderer.setPixelRatio(1),this.renderer.outputColorSpace=nt,this.renderer.domElement.id="renderer",this.renderer.info.autoReset=!1,this.CSSRenderer=new hd,this.CSSRenderer.domElement.id="css-renderer",this.labelsRenderer=new md,this.labelsRenderer.domElement.id="labels-renderer",this.width=this.domViewportEl.offsetWidth,this.height=this.domViewportEl.offsetHeight,this.aspectRatio=this.width/this.height,this.lines=new gd(this.labelsRenderer.domElement),this.scene=new Ji,this.scene.background=new Ae(16777215),this.fov=40,this.camera=new qt(this.fov,this.aspectRatio,1,1e3),this.$output=document.createElement("div");let t=String.raw;this.$output.innerHTML=t`
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
    `,this.$output.classList.add("output"),this.$output.style.pointerEvents="none",this.CSSRenderer.domElement.appendChild(this.$output),this.domViewportEl.appendChild(this.renderer.domElement),this.domViewportEl.appendChild(this.CSSRenderer.domElement),this.domViewportEl.appendChild(this.labelsRenderer.domElement),this.updateDimensions(),this.debug.helpers&&this.scene.add(new pc(this.camera))}updateDimensions(){this.width=this.domViewportEl.offsetWidth&~1,this.height=this.domViewportEl.offsetHeight&~1,this.aspectRatio=this.width/this.height,this.camera.aspect=this.aspectRatio,this.camera.fov=this.fov*((this.height>=1e3?this.height:1e3)/1e3),this.camera.updateProjectionMatrix(),this.renderer.setSize(this.width,this.height),this.renderer.domElement.style.position="absolute",this.renderer.domElement.style.top="0px",this.renderer.domElement.style.left="0px",this.CSSRenderer.setSize(this.width,this.height),this.CSSRenderer.domElement.style.position="absolute",this.CSSRenderer.domElement.style.top="0px",this.CSSRenderer.domElement.style.left="0px",this.labelsRenderer.setSize(this.width,this.height),this.labelsRenderer.domElement.style.position="absolute",this.labelsRenderer.domElement.style.top="0px",this.labelsRenderer.domElement.style.left="0px",this.lines.updateDimensions(),this.debug.enabled&&this.debug.pixelsPanel.update(this.width*this.height,8e6)}};var xd=class{constructor(e,t){this.ambientLight=new oc(16777215,2),this.directionalLight=new la(16777215,1),this.directionalLight.castShadow=!0;let n=16;if(this.directionalLight.shadow.mapSize.width=1024*8,this.directionalLight.shadow.mapSize.height=1024*8,this.directionalLight.shadow.camera.near=1,this.directionalLight.shadow.camera.far=1e3,this.directionalLight.shadow.bias=-3e-5,this.directionalLight.shadow.radius=1,this.directionalLight.shadow.camera.left=-n,this.directionalLight.shadow.camera.right=n,this.directionalLight.shadow.camera.top=n,this.directionalLight.shadow.camera.bottom=-n,this.stage=e,t.enabled){let s=t.gui.addFolder("Lights");s.add(this,"x").min(-300).max(300).step(1),s.add(this,"y").min(-300).max(300).step(1),s.add(this,"z").min(-300).max(300).step(1)}t.helpers&&e.scene.add(new dc(this.directionalLight,10,16711680))}_setLightsPosition(e,t){this.directionalLight.position[e]=t,this.stage.renderer.shadowMap.needsUpdate=!0}get x(){return this.directionalLight.position.x}set x(e){this._setLightsPosition("x",e),this.directionalLight.lookAt(this.stage.scene.position)}get y(){return this.directionalLight.position.y}set y(e){this._setLightsPosition("y",e),this.directionalLight.lookAt(this.stage.scene.position)}get z(){return this.directionalLight.position.z}set z(e){this._setLightsPosition("z",e),this.directionalLight.lookAt(this.stage.scene.position)}};var yd=1/1e3,Ub=1e3,Nb=class{constructor(){this.startTime=performance.now(),this.previousTime=0,this.currentTime=0,this._delta=0,this._elapsed=0,this._fixedDelta=1e3/60,this.timescale=1,this.useFixedDelta=!1,this._autoReset=!1}get autoReset(){return this._autoReset}set autoReset(i){typeof document!="undefined"&&document.hidden!==void 0&&(i?document.addEventListener("visibilitychange",this):document.removeEventListener("visibilitychange",this),this._autoReset=i)}get delta(){return this._delta*yd}get fixedDelta(){return this._fixedDelta*yd}set fixedDelta(i){this._fixedDelta=i*Ub}get elapsed(){return this._elapsed*yd}update(i){this.useFixedDelta?this._delta=this.fixedDelta:(this.previousTime=this.currentTime,this.currentTime=(i!==void 0?i:performance.now())-this.startTime,this._delta=this.currentTime-this.previousTime),this._delta*=this.timescale,this._elapsed+=this._delta}reset(){this._delta=0,this._elapsed=0,this.currentTime=performance.now()-this.startTime}getDelta(){return this.delta}getElapsed(){return this.elapsed}handleEvent(i){document.hidden||(this.currentTime=performance.now()-this.startTime)}dispose(){this.autoReset=!1}},Bb=(()=>{let i=new Float32Array([-1,-1,0,3,-1,0,-1,3,0]),e=new Float32Array([0,0,2,0,0,2]),t=new Yt;return t.setAttribute("position",new Gt(i,3)),t.setAttribute("uv",new Gt(e,2)),t})(),di=class Ad{static get fullscreenGeometry(){return Bb}constructor(e="Pass",t=new Ji,n=new cr){this.name=e,this.renderer=null,this.scene=t,this.camera=n,this.screen=null,this.rtt=!0,this.needsSwap=!0,this.needsDepthTexture=!1,this.enabled=!0}get renderToScreen(){return!this.rtt}set renderToScreen(e){if(this.rtt===e){let t=this.fullscreenMaterial;t!==null&&(t.needsUpdate=!0),this.rtt=!e}}set mainScene(e){}set mainCamera(e){}setRenderer(e){this.renderer=e}isEnabled(){return this.enabled}setEnabled(e){this.enabled=e}get fullscreenMaterial(){return this.screen!==null?this.screen.material:null}set fullscreenMaterial(e){let t=this.screen;t!==null?t.material=e:(t=new Qt(Ad.fullscreenGeometry,e),t.frustumCulled=!1,this.scene===null&&(this.scene=new Ji),this.scene.add(t),this.screen=t)}getFullscreenMaterial(){return this.fullscreenMaterial}setFullscreenMaterial(e){this.fullscreenMaterial=e}getDepthTexture(){return null}setDepthTexture(e,t=vi){}render(e,t,n,s,r){throw new Error("Render method not implemented!")}setSize(e,t){}initialize(e,t,n){}dispose(){for(let e of Object.keys(this)){let t=this[e];(t instanceof Ht||t instanceof fn||t instanceof zt||t instanceof Ad)&&this[e].dispose()}this.fullscreenMaterial!==null&&this.fullscreenMaterial.dispose()}},Ob=class extends di{constructor(){super("ClearMaskPass",null,null);this.needsSwap=!1}render(i,e,t,n,s){let r=i.state.buffers.stencil;r.setLocked(!1),r.setTest(!1)}},kb=`#include <common>
#include <dithering_pars_fragment>
#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;
#else
uniform lowp sampler2D inputBuffer;
#endif
uniform float opacity;varying vec2 vUv;void main(){vec4 texel=texture2D(inputBuffer,vUv);gl_FragColor=opacity*texel;
#include <colorspace_fragment>
#include <dithering_fragment>
}`,Vg="varying vec2 vUv;void main(){vUv=position.xy*0.5+0.5;gl_Position=vec4(position.xy,1.0,1.0);}",Wg=class extends Nt{constructor(){super({name:"CopyMaterial",uniforms:{inputBuffer:new Oe(null),opacity:new Oe(1)},blending:$t,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:kb,vertexShader:Vg})}set inputBuffer(i){this.uniforms.inputBuffer.value=i}setInputBuffer(i){this.uniforms.inputBuffer.value=i}getOpacity(i){return this.uniforms.opacity.value}setOpacity(i){this.uniforms.opacity.value=i}},zb=class extends di{constructor(i,e=!0){super("CopyPass");this.fullscreenMaterial=new Wg,this.needsSwap=!1,this.renderTarget=i,i===void 0&&(this.renderTarget=new Ht(1,1,{minFilter:en,magFilter:en,stencilBuffer:!1,depthBuffer:!1}),this.renderTarget.texture.name="CopyPass.Target"),this.autoResize=e}get resize(){return this.autoResize}set resize(i){this.autoResize=i}get texture(){return this.renderTarget.texture}getTexture(){return this.renderTarget.texture}setAutoResizeEnabled(i){this.autoResize=i}render(i,e,t,n,s){this.fullscreenMaterial.inputBuffer=e.texture,i.setRenderTarget(this.renderToScreen?null:this.renderTarget),i.render(this.scene,this.camera)}setSize(i,e){this.autoResize&&this.renderTarget.setSize(i,e)}initialize(i,e,t){t!==void 0&&(this.renderTarget.texture.type=t,t!==kt?this.fullscreenMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1":i!==null&&i.outputColorSpace===nt&&(this.renderTarget.texture.colorSpace=nt))}},Xg=new Ae,Yg=class extends di{constructor(i=!0,e=!0,t=!1){super("ClearPass",null,null);this.needsSwap=!1,this.color=i,this.depth=e,this.stencil=t,this.overrideClearColor=null,this.overrideClearAlpha=-1}setClearFlags(i,e,t){this.color=i,this.depth=e,this.stencil=t}getOverrideClearColor(){return this.overrideClearColor}setOverrideClearColor(i){this.overrideClearColor=i}getOverrideClearAlpha(){return this.overrideClearAlpha}setOverrideClearAlpha(i){this.overrideClearAlpha=i}render(i,e,t,n,s){let r=this.overrideClearColor,a=this.overrideClearAlpha,o=i.getClearAlpha(),l=r!==null,c=a>=0;l?(i.getClearColor(Xg),i.setClearColor(r,c?a:o)):c&&i.setClearAlpha(a),i.setRenderTarget(this.renderToScreen?null:e),i.clear(this.color,this.depth,this.stencil),l?i.setClearColor(Xg,o):c&&i.setClearAlpha(o)}},Hb=class extends di{constructor(i,e){super("MaskPass",i,e);this.needsSwap=!1,this.clearPass=new Yg(!1,!1,!0),this.inverse=!1}set mainScene(i){this.scene=i}set mainCamera(i){this.camera=i}get inverted(){return this.inverse}set inverted(i){this.inverse=i}get clear(){return this.clearPass.enabled}set clear(i){this.clearPass.enabled=i}getClearPass(){return this.clearPass}isInverted(){return this.inverted}setInverted(i){this.inverted=i}render(i,e,t,n,s){let r=i.getContext(),a=i.state.buffers,o=this.scene,l=this.camera,c=this.clearPass,h=this.inverted?0:1,u=1-h;a.color.setMask(!1),a.depth.setMask(!1),a.color.setLocked(!0),a.depth.setLocked(!0),a.stencil.setTest(!0),a.stencil.setOp(r.REPLACE,r.REPLACE,r.REPLACE),a.stencil.setFunc(r.ALWAYS,h,4294967295),a.stencil.setClear(u),a.stencil.setLocked(!0),this.clearPass.enabled&&(this.renderToScreen?c.render(i,null):(c.render(i,e),c.render(i,t))),this.renderToScreen?(i.setRenderTarget(null),i.render(o,l)):(i.setRenderTarget(e),i.render(o,l),i.setRenderTarget(t),i.render(o,l)),a.color.setLocked(!1),a.depth.setLocked(!1),a.stencil.setLocked(!1),a.stencil.setFunc(r.EQUAL,1,4294967295),a.stencil.setOp(r.KEEP,r.KEEP,r.KEEP),a.stencil.setLocked(!0)}},Qg=class{constructor(i=null,{depthBuffer:e=!0,stencilBuffer:t=!1,multisampling:n=0,frameBufferType:s}={}){this.renderer=null,this.inputBuffer=this.createBuffer(e,t,s,n),this.outputBuffer=this.inputBuffer.clone(),this.copyPass=new zb,this.depthTexture=null,this.passes=[],this.timer=new Nb,this.autoRenderToScreen=!0,this.setRenderer(i)}get multisampling(){return this.inputBuffer.samples||0}set multisampling(i){let e=this.inputBuffer,t=this.multisampling;t>0&&i>0?(this.inputBuffer.samples=i,this.outputBuffer.samples=i,this.inputBuffer.dispose(),this.outputBuffer.dispose()):t!==i&&(this.inputBuffer.dispose(),this.outputBuffer.dispose(),this.inputBuffer=this.createBuffer(e.depthBuffer,e.stencilBuffer,e.texture.type,i),this.inputBuffer.depthTexture=this.depthTexture,this.outputBuffer=this.inputBuffer.clone())}getTimer(){return this.timer}getRenderer(){return this.renderer}setRenderer(i){if(this.renderer=i,i!==null){let e=i.getSize(new Pe),t=i.getContext().getContextAttributes().alpha,n=this.inputBuffer.texture.type;n===kt&&i.outputColorSpace===nt&&(this.inputBuffer.texture.colorSpace=nt,this.outputBuffer.texture.colorSpace=nt,this.inputBuffer.dispose(),this.outputBuffer.dispose()),i.autoClear=!1,this.setSize(e.width,e.height);for(let s of this.passes)s.initialize(i,t,n)}}replaceRenderer(i,e=!0){let t=this.renderer,n=t.domElement.parentNode;return this.setRenderer(i),e&&n!==null&&(n.removeChild(t.domElement),n.appendChild(i.domElement)),t}createDepthTexture(){let i=this.depthTexture=new na;return this.inputBuffer.depthTexture=i,this.inputBuffer.dispose(),this.inputBuffer.stencilBuffer?(i.format=Wi,i.type=Vi):i.type=Fi,i}deleteDepthTexture(){if(this.depthTexture!==null){this.depthTexture.dispose(),this.depthTexture=null,this.inputBuffer.depthTexture=null,this.inputBuffer.dispose();for(let i of this.passes)i.setDepthTexture(null)}}createBuffer(i,e,t,n){let s=this.renderer,r=s===null?new Pe:s.getDrawingBufferSize(new Pe),a={minFilter:en,magFilter:en,stencilBuffer:e,depthBuffer:i,type:t},o=new Ht(r.width,r.height,a);return n>0&&(o.ignoreDepthForMultisampleCopy=!1,o.samples=n),t===kt&&s!==null&&s.outputColorSpace===nt&&(o.texture.colorSpace=nt),o.texture.name="EffectComposer.Buffer",o.texture.generateMipmaps=!1,o}setMainScene(i){for(let e of this.passes)e.mainScene=i}setMainCamera(i){for(let e of this.passes)e.mainCamera=i}addPass(i,e){let t=this.passes,n=this.renderer,s=n.getDrawingBufferSize(new Pe),r=n.getContext().getContextAttributes().alpha,a=this.inputBuffer.texture.type;if(i.setRenderer(n),i.setSize(s.width,s.height),i.initialize(n,r,a),this.autoRenderToScreen&&(t.length>0&&(t[t.length-1].renderToScreen=!1),i.renderToScreen&&(this.autoRenderToScreen=!1)),e!==void 0?t.splice(e,0,i):t.push(i),this.autoRenderToScreen&&(t[t.length-1].renderToScreen=!0),i.needsDepthTexture||this.depthTexture!==null)if(this.depthTexture===null){let o=this.createDepthTexture();for(i of t)i.setDepthTexture(o)}else i.setDepthTexture(this.depthTexture)}removePass(i){let e=this.passes,t=e.indexOf(i);if(t!==-1&&e.splice(t,1).length>0){if(this.depthTexture!==null){let r=(o,l)=>o||l.needsDepthTexture;e.reduce(r,!1)||(i.getDepthTexture()===this.depthTexture&&i.setDepthTexture(null),this.deleteDepthTexture())}this.autoRenderToScreen&&t===e.length&&(i.renderToScreen=!1,e.length>0&&(e[e.length-1].renderToScreen=!0))}}removeAllPasses(){let i=this.passes;this.deleteDepthTexture(),i.length>0&&(this.autoRenderToScreen&&(i[i.length-1].renderToScreen=!1),this.passes=[])}render(i){let e=this.renderer,t=this.copyPass,n=this.inputBuffer,s=this.outputBuffer,r=!1,a,o,l;i===void 0&&(this.timer.update(),i=this.timer.getDelta());for(let c of this.passes)c.enabled&&(c.render(e,n,s,i,r),c.needsSwap&&(r&&(t.renderToScreen=c.renderToScreen,a=e.getContext(),o=e.state.buffers.stencil,o.setFunc(a.NOTEQUAL,1,4294967295),t.render(e,n,s,i,r),o.setFunc(a.EQUAL,1,4294967295)),l=n,n=s,s=l),c instanceof Hb?r=!0:c instanceof Ob&&(r=!1))}setSize(i,e,t){let n=this.renderer,s=n.getSize(new Pe);(i===void 0||e===void 0)&&(i=s.width,e=s.height),(s.width!==i||s.height!==e)&&n.setSize(i,e,t);let r=n.getDrawingBufferSize(new Pe);this.inputBuffer.setSize(r.width,r.height),this.outputBuffer.setSize(r.width,r.height);for(let a of this.passes)a.setSize(r.width,r.height)}reset(){this.dispose(),this.autoRenderToScreen=!0}dispose(){for(let i of this.passes)i.dispose();this.passes=[],this.inputBuffer!==null&&this.inputBuffer.dispose(),this.outputBuffer!==null&&this.outputBuffer.dispose(),this.deleteDepthTexture(),this.copyPass.dispose(),this.timer.dispose(),di.fullscreenGeometry.dispose()}},Os={NONE:0,DEPTH:1,CONVOLUTION:2},Ct={FRAGMENT_HEAD:"FRAGMENT_HEAD",FRAGMENT_MAIN_UV:"FRAGMENT_MAIN_UV",FRAGMENT_MAIN_IMAGE:"FRAGMENT_MAIN_IMAGE",VERTEX_HEAD:"VERTEX_HEAD",VERTEX_MAIN_SUPPORT:"VERTEX_MAIN_SUPPORT"},Gb=class{constructor(){this.shaderParts=new Map([[Ct.FRAGMENT_HEAD,null],[Ct.FRAGMENT_MAIN_UV,null],[Ct.FRAGMENT_MAIN_IMAGE,null],[Ct.VERTEX_HEAD,null],[Ct.VERTEX_MAIN_SUPPORT,null]]),this.defines=new Map,this.uniforms=new Map,this.blendModes=new Map,this.extensions=new Set,this.attributes=Os.NONE,this.varyings=new Set,this.uvTransformation=!1,this.readDepth=!1,this.colorSpace=Wt}};var _d=!1,qg=class{constructor(i=null){this.originalMaterials=new Map,this.material=null,this.materials=null,this.materialsBackSide=null,this.materialsDoubleSide=null,this.materialsFlatShaded=null,this.materialsFlatShadedBackSide=null,this.materialsFlatShadedDoubleSide=null,this.setMaterial(i),this.meshCount=0,this.replaceMaterial=e=>{if(e.isMesh){let t;if(e.material.flatShading)switch(e.material.side){case vn:t=this.materialsFlatShadedDoubleSide;break;case an:t=this.materialsFlatShadedBackSide;break;default:t=this.materialsFlatShaded;break}else switch(e.material.side){case vn:t=this.materialsDoubleSide;break;case an:t=this.materialsBackSide;break;default:t=this.materials;break}this.originalMaterials.set(e,e.material),e.isSkinnedMesh?e.material=t[2]:e.isInstancedMesh?e.material=t[1]:e.material=t[0],++this.meshCount}}}cloneMaterial(i){if(!(i instanceof Nt))return i.clone();let e=i.uniforms,t=new Map;for(let s in e){let r=e[s].value;r.isRenderTargetTexture&&(e[s].value=null,t.set(s,r))}let n=i.clone();for(let s of t)e[s[0]].value=s[1],n.uniforms[s[0]].value=s[1];return n}setMaterial(i){if(this.disposeMaterials(),this.material=i,i!==null){let e=this.materials=[this.cloneMaterial(i),this.cloneMaterial(i),this.cloneMaterial(i)];for(let t of e)t.uniforms=Object.assign({},i.uniforms),t.side=Hn;e[2].skinning=!0,this.materialsBackSide=e.map(t=>{let n=this.cloneMaterial(t);return n.uniforms=Object.assign({},i.uniforms),n.side=an,n}),this.materialsDoubleSide=e.map(t=>{let n=this.cloneMaterial(t);return n.uniforms=Object.assign({},i.uniforms),n.side=vn,n}),this.materialsFlatShaded=e.map(t=>{let n=this.cloneMaterial(t);return n.uniforms=Object.assign({},i.uniforms),n.flatShading=!0,n}),this.materialsFlatShadedBackSide=e.map(t=>{let n=this.cloneMaterial(t);return n.uniforms=Object.assign({},i.uniforms),n.flatShading=!0,n.side=an,n}),this.materialsFlatShadedDoubleSide=e.map(t=>{let n=this.cloneMaterial(t);return n.uniforms=Object.assign({},i.uniforms),n.flatShading=!0,n.side=vn,n})}}render(i,e,t){let n=i.shadowMap.enabled;if(i.shadowMap.enabled=!1,_d){let s=this.originalMaterials;this.meshCount=0,e.traverse(this.replaceMaterial),i.render(e,t);for(let r of s)r[0].material=r[1];this.meshCount!==s.size&&s.clear()}else{let s=e.overrideMaterial;e.overrideMaterial=this.material,i.render(e,t),e.overrideMaterial=s}i.shadowMap.enabled=n}disposeMaterials(){if(this.material!==null){let i=this.materials.concat(this.materialsBackSide).concat(this.materialsDoubleSide).concat(this.materialsFlatShaded).concat(this.materialsFlatShadedBackSide).concat(this.materialsFlatShadedDoubleSide);for(let e of i)e.dispose()}}dispose(){this.originalMaterials.clear(),this.disposeMaterials()}static get workaroundEnabled(){return _d}static set workaroundEnabled(i){_d=i}};var ks=-1,ki=class extends Fn{constructor(i,e=ks,t=ks,n=1){super();this.resizable=i,this.baseSize=new Pe(1,1),this.preferredSize=new Pe(e,t),this.target=this.preferredSize,this.s=n,this.effectiveSize=new Pe,this.addEventListener("change",()=>this.updateEffectiveSize()),this.updateEffectiveSize()}updateEffectiveSize(){let i=this.baseSize,e=this.preferredSize,t=this.effectiveSize,n=this.scale;e.width!==ks?t.width=e.width:e.height!==ks?t.width=Math.round(e.height*(i.width/Math.max(i.height,1))):t.width=Math.round(i.width*n),e.height!==ks?t.height=e.height:e.width!==ks?t.height=Math.round(e.width/Math.max(i.width/Math.max(i.height,1),1)):t.height=Math.round(i.height*n)}get width(){return this.effectiveSize.width}set width(i){this.preferredWidth=i}get height(){return this.effectiveSize.height}set height(i){this.preferredHeight=i}getWidth(){return this.width}getHeight(){return this.height}get scale(){return this.s}set scale(i){this.s!==i&&(this.s=i,this.preferredSize.setScalar(ks),this.dispatchEvent({type:"change"}),this.resizable.setSize(this.baseSize.width,this.baseSize.height))}getScale(){return this.scale}setScale(i){this.scale=i}get baseWidth(){return this.baseSize.width}set baseWidth(i){this.baseSize.width!==i&&(this.baseSize.width=i,this.dispatchEvent({type:"change"}),this.resizable.setSize(this.baseSize.width,this.baseSize.height))}getBaseWidth(){return this.baseWidth}setBaseWidth(i){this.baseWidth=i}get baseHeight(){return this.baseSize.height}set baseHeight(i){this.baseSize.height!==i&&(this.baseSize.height=i,this.dispatchEvent({type:"change"}),this.resizable.setSize(this.baseSize.width,this.baseSize.height))}getBaseHeight(){return this.baseHeight}setBaseHeight(i){this.baseHeight=i}setBaseSize(i,e){(this.baseSize.width!==i||this.baseSize.height!==e)&&(this.baseSize.set(i,e),this.dispatchEvent({type:"change"}),this.resizable.setSize(this.baseSize.width,this.baseSize.height))}get preferredWidth(){return this.preferredSize.width}set preferredWidth(i){this.preferredSize.width!==i&&(this.preferredSize.width=i,this.dispatchEvent({type:"change"}),this.resizable.setSize(this.baseSize.width,this.baseSize.height))}getPreferredWidth(){return this.preferredWidth}setPreferredWidth(i){this.preferredWidth=i}get preferredHeight(){return this.preferredSize.height}set preferredHeight(i){this.preferredSize.height!==i&&(this.preferredSize.height=i,this.dispatchEvent({type:"change"}),this.resizable.setSize(this.baseSize.width,this.baseSize.height))}getPreferredHeight(){return this.preferredHeight}setPreferredHeight(i){this.preferredHeight=i}setPreferredSize(i,e){(this.preferredSize.width!==i||this.preferredSize.height!==e)&&(this.preferredSize.set(i,e),this.dispatchEvent({type:"change"}),this.resizable.setSize(this.baseSize.width,this.baseSize.height))}copy(i){this.s=i.scale,this.baseSize.set(i.baseWidth,i.baseHeight),this.preferredSize.set(i.preferredWidth,i.preferredHeight),this.dispatchEvent({type:"change"}),this.resizable.setSize(this.baseSize.width,this.baseSize.height)}static get AUTO_SIZE(){return ks}};var At={SKIP:9,SET:30,ADD:0,ALPHA:1,AVERAGE:2,COLOR:3,COLOR_BURN:4,COLOR_DODGE:5,DARKEN:6,DIFFERENCE:7,DIVIDE:8,DST:9,EXCLUSION:10,HARD_LIGHT:11,HARD_MIX:12,HUE:13,INVERT:14,INVERT_RGB:15,LIGHTEN:16,LINEAR_BURN:17,LINEAR_DODGE:18,LINEAR_LIGHT:19,LUMINOSITY:20,MULTIPLY:21,NEGATION:22,NORMAL:23,OVERLAY:24,PIN_LIGHT:25,REFLECT:26,SATURATION:27,SCREEN:28,SOFT_LIGHT:29,SRC:30,SUBTRACT:31,VIVID_LIGHT:32},Vb="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,x+y,opacity);}",Wb="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,y,min(y.a,opacity));}",Xb="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,(x+y)*0.5,opacity);}",Yb="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec3 xHSL=RGBToHSL(x.rgb);vec3 yHSL=RGBToHSL(y.rgb);vec3 z=HSLToRGB(vec3(yHSL.rg,xHSL.b));return vec4(mix(x.rgb,z,opacity),y.a);}",Qb="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec4 z=mix(step(0.0,y)*(1.0-min(vec4(1.0),(1.0-x)/y)),vec4(1.0),step(1.0,x));return mix(x,z,opacity);}",qb="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec4 z=step(0.0,x)*mix(min(vec4(1.0),x/max(1.0-y,1e-9)),vec4(1.0),step(1.0,y));return mix(x,z,opacity);}",jb="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,min(x,y),opacity);}",Zb="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,abs(x-y),opacity);}",Kb="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,x/max(y,1e-12),opacity);}",Jb="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,(x+y-2.0*x*y),opacity);}",$b="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec4 a=min(x,1.0),b=min(y,1.0);vec4 z=mix(2.0*a*b,1.0-2.0*(1.0-a)*(1.0-b),step(0.5,y));return mix(x,z,opacity);}",eE="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,step(1.0,x+y),opacity);}",tE="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec3 xHSL=RGBToHSL(x.rgb);vec3 yHSL=RGBToHSL(y.rgb);vec3 z=HSLToRGB(vec3(yHSL.r,xHSL.gb));return vec4(mix(x.rgb,z,opacity),y.a);}",nE="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,1.0-y,opacity);}",iE="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,y*(1.0-x),opacity);}",sE="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,max(x,y),opacity);}",rE="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,clamp(y+x-1.0,0.0,1.0),opacity);}",aE="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,min(x+y,1.0),opacity);}",oE="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,clamp(2.0*y+x-1.0,0.0,1.0),opacity);}",lE="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec3 xHSL=RGBToHSL(x.rgb);vec3 yHSL=RGBToHSL(y.rgb);vec3 z=HSLToRGB(vec3(xHSL.rg,yHSL.b));return vec4(mix(x.rgb,z,opacity),y.a);}",cE="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,x*y,opacity);}",hE="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,1.0-abs(1.0-x-y),opacity);}",uE="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,y,opacity);}",dE="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec4 z=mix(2.0*y*x,1.0-2.0*(1.0-y)*(1.0-x),step(0.5,x));return mix(x,z,opacity);}",fE="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec4 y2=2.0*y;vec4 z=mix(mix(y2,x,step(0.5*x,y)),max(vec4(0.0),y2-1.0),step(x,(y2-1.0)));return mix(x,z,opacity);}",pE="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec4 z=mix(min(x*x/max(1.0-y,1e-12),1.0),y,step(1.0,y));return mix(x,z,opacity);}",mE="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec3 xHSL=RGBToHSL(x.rgb);vec3 yHSL=RGBToHSL(y.rgb);vec3 z=HSLToRGB(vec3(xHSL.r,yHSL.g,xHSL.b));return vec4(mix(x.rgb,z,opacity),y.a);}",gE="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,x+y-min(x*y,1.0),opacity);}",vE="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec4 y2=2.0*y;vec4 w=step(0.5,y);vec4 z=mix(x-(1.0-y2)*x*(1.0-x),mix(x+(y2-1.0)*(sqrt(x)-x),x+(y2-1.0)*x*((16.0*x-12.0)*x+3.0),w*(1.0-step(0.25,x))),w);return mix(x,z,opacity);}",xE="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return y;}",yE="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,max(x+y-1.0,0.0),opacity);}",AE="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec4 z=mix(max(1.0-min((1.0-x)/(2.0*y),1.0),0.0),min(x/(2.0*(1.0-y)),1.0),step(0.5,y));return mix(x,z,opacity);}",_E=new Map([[At.ADD,Vb],[At.ALPHA,Wb],[At.AVERAGE,Xb],[At.COLOR,Yb],[At.COLOR_BURN,Qb],[At.COLOR_DODGE,qb],[At.DARKEN,jb],[At.DIFFERENCE,Zb],[At.DIVIDE,Kb],[At.DST,null],[At.EXCLUSION,Jb],[At.HARD_LIGHT,$b],[At.HARD_MIX,eE],[At.HUE,tE],[At.INVERT,nE],[At.INVERT_RGB,iE],[At.LIGHTEN,sE],[At.LINEAR_BURN,rE],[At.LINEAR_DODGE,aE],[At.LINEAR_LIGHT,oE],[At.LUMINOSITY,lE],[At.MULTIPLY,cE],[At.NEGATION,hE],[At.NORMAL,uE],[At.OVERLAY,dE],[At.PIN_LIGHT,fE],[At.REFLECT,pE],[At.SATURATION,mE],[At.SCREEN,gE],[At.SOFT_LIGHT,vE],[At.SRC,xE],[At.SUBTRACT,yE],[At.VIVID_LIGHT,AE]]),SE=class extends Fn{constructor(i,e=1){super();this._blendFunction=i,this.opacity=new Oe(e)}getOpacity(){return this.opacity.value}setOpacity(i){this.opacity.value=i}get blendFunction(){return this._blendFunction}set blendFunction(i){this._blendFunction=i,this.dispatchEvent({type:"change"})}getBlendFunction(){return this.blendFunction}setBlendFunction(i){this.blendFunction=i}getShaderCode(){return _E.get(this.blendFunction)}},_a={VERY_SMALL:0,SMALL:1,MEDIUM:2,LARGE:3,VERY_LARGE:4,HUGE:5},bE=`#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;
#else
uniform lowp sampler2D inputBuffer;
#endif
varying vec2 vUv0;varying vec2 vUv1;varying vec2 vUv2;varying vec2 vUv3;void main(){vec4 sum=texture2D(inputBuffer,vUv0);sum+=texture2D(inputBuffer,vUv1);sum+=texture2D(inputBuffer,vUv2);sum+=texture2D(inputBuffer,vUv3);gl_FragColor=sum*0.25;
#include <colorspace_fragment>
}`,EE="uniform vec4 texelSize;uniform float kernel;uniform float scale;varying vec2 vUv0;varying vec2 vUv1;varying vec2 vUv2;varying vec2 vUv3;void main(){vec2 uv=position.xy*0.5+0.5;vec2 dUv=(texelSize.xy*vec2(kernel)+texelSize.zw)*scale;vUv0=vec2(uv.x-dUv.x,uv.y+dUv.y);vUv1=vec2(uv.x+dUv.x,uv.y+dUv.y);vUv2=vec2(uv.x+dUv.x,uv.y-dUv.y);vUv3=vec2(uv.x-dUv.x,uv.y-dUv.y);gl_Position=vec4(position.xy,1.0,1.0);}",TE=[new Float32Array([0,0]),new Float32Array([0,1,1]),new Float32Array([0,1,1,2]),new Float32Array([0,1,2,2,3]),new Float32Array([0,1,2,3,4,4,5]),new Float32Array([0,1,2,3,4,5,7,8,9,10])],ME=class extends Nt{constructor(i=new yt){super({name:"KawaseBlurMaterial",uniforms:{inputBuffer:new Oe(null),texelSize:new Oe(new yt),scale:new Oe(1),kernel:new Oe(0)},blending:$t,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:bE,vertexShader:EE});this.setTexelSize(i.x,i.y),this.kernelSize=_a.MEDIUM}set inputBuffer(i){this.uniforms.inputBuffer.value=i}setInputBuffer(i){this.inputBuffer=i}get kernelSequence(){return TE[this.kernelSize]}get scale(){return this.uniforms.scale.value}set scale(i){this.uniforms.scale.value=i}getScale(){return this.uniforms.scale.value}setScale(i){this.uniforms.scale.value=i}getKernel(){return null}get kernel(){return this.uniforms.kernel.value}set kernel(i){this.uniforms.kernel.value=i}setKernel(i){this.kernel=i}setTexelSize(i,e){this.uniforms.texelSize.value.set(i,e,i*.5,e*.5)}setSize(i,e){let t=1/i,n=1/e;this.uniforms.texelSize.value.set(t,n,t*.5,n*.5)}},wE=class extends di{constructor({kernelSize:i=_a.MEDIUM,resolutionScale:e=.5,width:t=ki.AUTO_SIZE,height:n=ki.AUTO_SIZE,resolutionX:s=t,resolutionY:r=n}={}){super("KawaseBlurPass");this.renderTargetA=new Ht(1,1,{depthBuffer:!1}),this.renderTargetA.texture.name="Blur.Target.A",this.renderTargetB=this.renderTargetA.clone(),this.renderTargetB.texture.name="Blur.Target.B";let a=this.resolution=new ki(this,s,r,e);a.addEventListener("change",o=>this.setSize(a.baseWidth,a.baseHeight)),this._blurMaterial=new ME,this._blurMaterial.kernelSize=i,this.copyMaterial=new Wg}getResolution(){return this.resolution}get blurMaterial(){return this._blurMaterial}set blurMaterial(i){this._blurMaterial=i}get dithering(){return this.copyMaterial.dithering}set dithering(i){this.copyMaterial.dithering=i}get kernelSize(){return this.blurMaterial.kernelSize}set kernelSize(i){this.blurMaterial.kernelSize=i}get width(){return this.resolution.width}set width(i){this.resolution.preferredWidth=i}get height(){return this.resolution.height}set height(i){this.resolution.preferredHeight=i}get scale(){return this.blurMaterial.scale}set scale(i){this.blurMaterial.scale=i}getScale(){return this.blurMaterial.scale}setScale(i){this.blurMaterial.scale=i}getKernelSize(){return this.kernelSize}setKernelSize(i){this.kernelSize=i}getResolutionScale(){return this.resolution.scale}setResolutionScale(i){this.resolution.scale=i}render(i,e,t,n,s){let r=this.scene,a=this.camera,o=this.renderTargetA,l=this.renderTargetB,c=this.blurMaterial,h=c.kernelSequence,u=e;this.fullscreenMaterial=c;for(let d=0,p=h.length;d<p;++d){let g=(d&1)==0?o:l;c.kernel=h[d],c.inputBuffer=u.texture,i.setRenderTarget(g),i.render(r,a),u=g}this.fullscreenMaterial=this.copyMaterial,this.copyMaterial.inputBuffer=u.texture,i.setRenderTarget(this.renderToScreen?null:t),i.render(r,a)}setSize(i,e){let t=this.resolution;t.setBaseSize(i,e);let n=t.width,s=t.height;this.renderTargetA.setSize(n,s),this.renderTargetB.setSize(n,s),this.blurMaterial.setSize(i,e)}initialize(i,e,t){t!==void 0&&(this.renderTargetA.texture.type=t,this.renderTargetB.texture.type=t,t!==kt?(this.blurMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1",this.copyMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1"):i!==null&&i.outputColorSpace===nt&&(this.renderTargetA.texture.colorSpace=nt,this.renderTargetB.texture.colorSpace=nt))}static get AUTO_SIZE(){return ki.AUTO_SIZE}},CE=`#include <common>
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
}`,RE=class extends Nt{constructor(i=!1,e=null){super({name:"LuminanceMaterial",defines:{THREE_REVISION:Pi.replace(/\D+/g,"")},uniforms:{inputBuffer:new Oe(null),threshold:new Oe(0),smoothing:new Oe(1),range:new Oe(null)},blending:$t,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:CE,vertexShader:Vg});this.colorOutput=i,this.luminanceRange=e}set inputBuffer(i){this.uniforms.inputBuffer.value=i}setInputBuffer(i){this.uniforms.inputBuffer.value=i}get threshold(){return this.uniforms.threshold.value}set threshold(i){this.smoothing>0||i>0?this.defines.THRESHOLD="1":delete this.defines.THRESHOLD,this.uniforms.threshold.value=i}getThreshold(){return this.threshold}setThreshold(i){this.threshold=i}get smoothing(){return this.uniforms.smoothing.value}set smoothing(i){this.threshold>0||i>0?this.defines.THRESHOLD="1":delete this.defines.THRESHOLD,this.uniforms.smoothing.value=i}getSmoothingFactor(){return this.smoothing}setSmoothingFactor(i){this.smoothing=i}get useThreshold(){return this.threshold>0||this.smoothing>0}set useThreshold(i){}get colorOutput(){return this.defines.COLOR!==void 0}set colorOutput(i){i?this.defines.COLOR="1":delete this.defines.COLOR,this.needsUpdate=!0}isColorOutputEnabled(i){return this.colorOutput}setColorOutputEnabled(i){this.colorOutput=i}get useRange(){return this.luminanceRange!==null}set useRange(i){this.luminanceRange=null}get luminanceRange(){return this.uniforms.range.value}set luminanceRange(i){i!==null?this.defines.RANGE="1":delete this.defines.RANGE,this.uniforms.range.value=i,this.needsUpdate=!0}getLuminanceRange(){return this.luminanceRange}setLuminanceRange(i){this.luminanceRange=i}},DE=class extends di{constructor({renderTarget:i,luminanceRange:e,colorOutput:t,resolutionScale:n=1,width:s=ki.AUTO_SIZE,height:r=ki.AUTO_SIZE,resolutionX:a=s,resolutionY:o=r}={}){super("LuminancePass");this.fullscreenMaterial=new RE(t,e),this.needsSwap=!1,this.renderTarget=i,this.renderTarget===void 0&&(this.renderTarget=new Ht(1,1,{depthBuffer:!1}),this.renderTarget.texture.name="LuminancePass.Target");let l=this.resolution=new ki(this,a,o,n);l.addEventListener("change",c=>this.setSize(l.baseWidth,l.baseHeight))}get texture(){return this.renderTarget.texture}getTexture(){return this.renderTarget.texture}getResolution(){return this.resolution}render(i,e,t,n,s){let r=this.fullscreenMaterial;r.inputBuffer=e.texture,i.setRenderTarget(this.renderToScreen?null:this.renderTarget),i.render(this.scene,this.camera)}setSize(i,e){let t=this.resolution;t.setBaseSize(i,e),this.renderTarget.setSize(t.width,t.height)}initialize(i,e,t){t!==void 0&&t!==kt&&(this.renderTarget.texture.type=t,this.fullscreenMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1")}},PE=`#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;
#else
uniform lowp sampler2D inputBuffer;
#endif
#define WEIGHT_INNER 0.125
#define WEIGHT_OUTER 0.0555555
varying vec2 vUv;varying vec2 vUv00;varying vec2 vUv01;varying vec2 vUv02;varying vec2 vUv03;varying vec2 vUv04;varying vec2 vUv05;varying vec2 vUv06;varying vec2 vUv07;varying vec2 vUv08;varying vec2 vUv09;varying vec2 vUv10;varying vec2 vUv11;float clampToBorder(const in vec2 uv){return float(uv.s>=0.0&&uv.s<=1.0&&uv.t>=0.0&&uv.t<=1.0);}void main(){vec4 c=vec4(0.0);vec4 w=WEIGHT_INNER*vec4(clampToBorder(vUv00),clampToBorder(vUv01),clampToBorder(vUv02),clampToBorder(vUv03));c+=w.x*texture2D(inputBuffer,vUv00);c+=w.y*texture2D(inputBuffer,vUv01);c+=w.z*texture2D(inputBuffer,vUv02);c+=w.w*texture2D(inputBuffer,vUv03);w=WEIGHT_OUTER*vec4(clampToBorder(vUv04),clampToBorder(vUv05),clampToBorder(vUv06),clampToBorder(vUv07));c+=w.x*texture2D(inputBuffer,vUv04);c+=w.y*texture2D(inputBuffer,vUv05);c+=w.z*texture2D(inputBuffer,vUv06);c+=w.w*texture2D(inputBuffer,vUv07);w=WEIGHT_OUTER*vec4(clampToBorder(vUv08),clampToBorder(vUv09),clampToBorder(vUv10),clampToBorder(vUv11));c+=w.x*texture2D(inputBuffer,vUv08);c+=w.y*texture2D(inputBuffer,vUv09);c+=w.z*texture2D(inputBuffer,vUv10);c+=w.w*texture2D(inputBuffer,vUv11);c+=WEIGHT_OUTER*texture2D(inputBuffer,vUv);gl_FragColor=c;
#include <colorspace_fragment>
}`,IE="uniform vec2 texelSize;varying vec2 vUv;varying vec2 vUv00;varying vec2 vUv01;varying vec2 vUv02;varying vec2 vUv03;varying vec2 vUv04;varying vec2 vUv05;varying vec2 vUv06;varying vec2 vUv07;varying vec2 vUv08;varying vec2 vUv09;varying vec2 vUv10;varying vec2 vUv11;void main(){vUv=position.xy*0.5+0.5;vUv00=vUv+texelSize*vec2(-1.0,1.0);vUv01=vUv+texelSize*vec2(1.0,1.0);vUv02=vUv+texelSize*vec2(-1.0,-1.0);vUv03=vUv+texelSize*vec2(1.0,-1.0);vUv04=vUv+texelSize*vec2(-2.0,2.0);vUv05=vUv+texelSize*vec2(0.0,2.0);vUv06=vUv+texelSize*vec2(2.0,2.0);vUv07=vUv+texelSize*vec2(-2.0,0.0);vUv08=vUv+texelSize*vec2(2.0,0.0);vUv09=vUv+texelSize*vec2(-2.0,-2.0);vUv10=vUv+texelSize*vec2(0.0,-2.0);vUv11=vUv+texelSize*vec2(2.0,-2.0);gl_Position=vec4(position.xy,1.0,1.0);}",LE=class extends Nt{constructor(){super({name:"DownsamplingMaterial",uniforms:{inputBuffer:new Oe(null),texelSize:new Oe(new Pe)},blending:$t,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:PE,vertexShader:IE})}set inputBuffer(i){this.uniforms.inputBuffer.value=i}setSize(i,e){this.uniforms.texelSize.value.set(1/i,1/e)}},FE=`#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;uniform mediump sampler2D supportBuffer;
#else
uniform lowp sampler2D inputBuffer;uniform lowp sampler2D supportBuffer;
#endif
uniform float radius;varying vec2 vUv;varying vec2 vUv0;varying vec2 vUv1;varying vec2 vUv2;varying vec2 vUv3;varying vec2 vUv4;varying vec2 vUv5;varying vec2 vUv6;varying vec2 vUv7;void main(){vec4 c=vec4(0.0);c+=texture2D(inputBuffer,vUv0)*0.0625;c+=texture2D(inputBuffer,vUv1)*0.125;c+=texture2D(inputBuffer,vUv2)*0.0625;c+=texture2D(inputBuffer,vUv3)*0.125;c+=texture2D(inputBuffer,vUv)*0.25;c+=texture2D(inputBuffer,vUv4)*0.125;c+=texture2D(inputBuffer,vUv5)*0.0625;c+=texture2D(inputBuffer,vUv6)*0.125;c+=texture2D(inputBuffer,vUv7)*0.0625;vec4 baseColor=texture2D(supportBuffer,vUv);gl_FragColor=mix(baseColor,c,radius);
#include <colorspace_fragment>
}`,UE="uniform vec2 texelSize;varying vec2 vUv;varying vec2 vUv0;varying vec2 vUv1;varying vec2 vUv2;varying vec2 vUv3;varying vec2 vUv4;varying vec2 vUv5;varying vec2 vUv6;varying vec2 vUv7;void main(){vUv=position.xy*0.5+0.5;vUv0=vUv+texelSize*vec2(-1.0,1.0);vUv1=vUv+texelSize*vec2(0.0,1.0);vUv2=vUv+texelSize*vec2(1.0,1.0);vUv3=vUv+texelSize*vec2(-1.0,0.0);vUv4=vUv+texelSize*vec2(1.0,0.0);vUv5=vUv+texelSize*vec2(-1.0,-1.0);vUv6=vUv+texelSize*vec2(0.0,-1.0);vUv7=vUv+texelSize*vec2(1.0,-1.0);gl_Position=vec4(position.xy,1.0,1.0);}",NE=class extends Nt{constructor(){super({name:"UpsamplingMaterial",uniforms:{inputBuffer:new Oe(null),supportBuffer:new Oe(null),texelSize:new Oe(new Pe),radius:new Oe(.85)},blending:$t,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:FE,vertexShader:UE})}set inputBuffer(i){this.uniforms.inputBuffer.value=i}set supportBuffer(i){this.uniforms.supportBuffer.value=i}get radius(){return this.uniforms.radius.value}set radius(i){this.uniforms.radius.value=i}setSize(i,e){this.uniforms.texelSize.value.set(1/i,1/e)}},BE=class extends di{constructor(){super("MipmapBlurPass");this.needsSwap=!1,this.renderTarget=new Ht(1,1,{depthBuffer:!1}),this.renderTarget.texture.name="Upsampling.Mipmap0",this.downsamplingMipmaps=[],this.upsamplingMipmaps=[],this.downsamplingMaterial=new LE,this.upsamplingMaterial=new NE,this.resolution=new Pe}get texture(){return this.renderTarget.texture}get levels(){return this.downsamplingMipmaps.length}set levels(i){if(this.levels!==i){let e=this.renderTarget;this.dispose(),this.downsamplingMipmaps=[],this.upsamplingMipmaps=[];for(let t=0;t<i;++t){let n=e.clone();n.texture.name="Downsampling.Mipmap"+t,this.downsamplingMipmaps.push(n)}this.upsamplingMipmaps.push(e);for(let t=1,n=i-1;t<n;++t){let s=e.clone();s.texture.name="Upsampling.Mipmap"+t,this.upsamplingMipmaps.push(s)}this.setSize(this.resolution.x,this.resolution.y)}}get radius(){return this.upsamplingMaterial.radius}set radius(i){this.upsamplingMaterial.radius=i}render(i,e,t,n,s){let{scene:r,camera:a}=this,{downsamplingMaterial:o,upsamplingMaterial:l}=this,{downsamplingMipmaps:c,upsamplingMipmaps:h}=this,u=e;this.fullscreenMaterial=o;for(let d=0,p=c.length;d<p;++d){let g=c[d];o.setSize(u.width,u.height),o.inputBuffer=u.texture,i.setRenderTarget(g),i.render(r,a),u=g}this.fullscreenMaterial=l;for(let d=h.length-1;d>=0;--d){let p=h[d];l.setSize(u.width,u.height),l.inputBuffer=u.texture,l.supportBuffer=c[d].texture,i.setRenderTarget(p),i.render(r,a),u=p}}setSize(i,e){let t=this.resolution;t.set(i,e);let n=t.width,s=t.height;for(let r=0,a=this.downsamplingMipmaps.length;r<a;++r)n=Math.round(n*.5),s=Math.round(s*.5),this.downsamplingMipmaps[r].setSize(n,s),r<this.upsamplingMipmaps.length&&this.upsamplingMipmaps[r].setSize(n,s)}initialize(i,e,t){if(t!==void 0){let n=this.downsamplingMipmaps.concat(this.upsamplingMipmaps);for(let s of n)s.texture.type=t;if(t!==kt)this.downsamplingMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1",this.upsamplingMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1";else if(i!==null&&i.outputColorSpace===nt)for(let s of n)s.texture.colorSpace=nt}}dispose(){super.dispose();for(let i of this.downsamplingMipmaps.concat(this.upsamplingMipmaps))i.dispose()}},jg=class extends Fn{constructor(i,e,{attributes:t=Os.NONE,blendFunction:n=At.NORMAL,defines:s=new Map,uniforms:r=new Map,extensions:a=null,vertexShader:o=null}={}){super();this.name=i,this.renderer=null,this.attributes=t,this.fragmentShader=e,this.vertexShader=o,this.defines=s,this.uniforms=r,this.extensions=a,this.blendMode=new SE(n),this.blendMode.addEventListener("change",l=>this.setChanged()),this._inputColorSpace=Wt,this._outputColorSpace=Wn}get inputColorSpace(){return this._inputColorSpace}set inputColorSpace(i){this._inputColorSpace=i,this.setChanged()}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(i){this._outputColorSpace=i,this.setChanged()}set mainScene(i){}set mainCamera(i){}getName(){return this.name}setRenderer(i){this.renderer=i}getDefines(){return this.defines}getUniforms(){return this.uniforms}getExtensions(){return this.extensions}getBlendMode(){return this.blendMode}getAttributes(){return this.attributes}setAttributes(i){this.attributes=i,this.setChanged()}getFragmentShader(){return this.fragmentShader}setFragmentShader(i){this.fragmentShader=i,this.setChanged()}getVertexShader(){return this.vertexShader}setVertexShader(i){this.vertexShader=i,this.setChanged()}setChanged(){this.dispatchEvent({type:"change"})}setDepthTexture(i,e=vi){}update(i,e,t){}setSize(i,e){}initialize(i,e,t){}dispose(){for(let i of Object.keys(this)){let e=this[i];(e instanceof Ht||e instanceof fn||e instanceof zt||e instanceof di)&&this[i].dispose()}}},OE=`#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D map;
#else
uniform lowp sampler2D map;
#endif
uniform float intensity;void mainImage(const in vec4 inputColor,const in vec2 uv,out vec4 outputColor){vec4 texel=texture2D(map,uv);outputColor=vec4(texel.rgb*intensity,texel.a);}`,Zg=class extends jg{constructor({blendFunction:i=At.SCREEN,luminanceThreshold:e=.9,luminanceSmoothing:t=.025,mipmapBlur:n=!1,intensity:s=1,radius:r=.85,levels:a=8,kernelSize:o=_a.LARGE,resolutionScale:l=.5,width:c=ki.AUTO_SIZE,height:h=ki.AUTO_SIZE,resolutionX:u=c,resolutionY:d=h}={}){super("BloomEffect",OE,{blendFunction:i,uniforms:new Map([["map",new Oe(null)],["intensity",new Oe(s)]])});this.renderTarget=new Ht(1,1,{depthBuffer:!1}),this.renderTarget.texture.name="Bloom.Target",this.blurPass=new wE({kernelSize:o}),this.luminancePass=new DE({colorOutput:!0}),this.luminanceMaterial.threshold=e,this.luminanceMaterial.smoothing=t,this.mipmapBlurPass=new BE,this.mipmapBlurPass.enabled=n,this.mipmapBlurPass.radius=r,this.mipmapBlurPass.levels=a,this.uniforms.get("map").value=n?this.mipmapBlurPass.texture:this.renderTarget.texture;let p=this.resolution=new ki(this,u,d,l);p.addEventListener("change",g=>this.setSize(p.baseWidth,p.baseHeight))}get texture(){return this.mipmapBlurPass.enabled?this.mipmapBlurPass.texture:this.renderTarget.texture}getTexture(){return this.texture}getResolution(){return this.resolution}getBlurPass(){return this.blurPass}getLuminancePass(){return this.luminancePass}get luminanceMaterial(){return this.luminancePass.fullscreenMaterial}getLuminanceMaterial(){return this.luminancePass.fullscreenMaterial}get width(){return this.resolution.width}set width(i){this.resolution.preferredWidth=i}get height(){return this.resolution.height}set height(i){this.resolution.preferredHeight=i}get dithering(){return this.blurPass.dithering}set dithering(i){this.blurPass.dithering=i}get kernelSize(){return this.blurPass.kernelSize}set kernelSize(i){this.blurPass.kernelSize=i}get distinction(){return console.warn(this.name,"distinction was removed"),1}set distinction(i){console.warn(this.name,"distinction was removed")}get intensity(){return this.uniforms.get("intensity").value}set intensity(i){this.uniforms.get("intensity").value=i}getIntensity(){return this.intensity}setIntensity(i){this.intensity=i}getResolutionScale(){return this.resolution.scale}setResolutionScale(i){this.resolution.scale=i}update(i,e,t){let n=this.renderTarget,s=this.luminancePass;s.enabled?(s.render(i,e),this.mipmapBlurPass.enabled?this.mipmapBlurPass.render(i,s.renderTarget):this.blurPass.render(i,s.renderTarget,n)):this.mipmapBlurPass.enabled?this.mipmapBlurPass.render(i,e):this.blurPass.render(i,e,n)}setSize(i,e){let t=this.resolution;t.setBaseSize(i,e),this.renderTarget.setSize(t.width,t.height),this.blurPass.resolution.copy(t),this.luminancePass.setSize(i,e),this.mipmapBlurPass.setSize(i,e)}initialize(i,e,t){this.blurPass.initialize(i,e,t),this.luminancePass.initialize(i,e,t),this.mipmapBlurPass.initialize(i,e,t),t!==void 0&&(this.renderTarget.texture.type=t,i!==null&&i.outputColorSpace===nt&&(this.renderTarget.texture.colorSpace=nt))}};var kE=`#ifdef RADIAL_MODULATION
uniform float modulationOffset;
#endif
varying float vActive;varying vec2 vUvR;varying vec2 vUvB;void mainImage(const in vec4 inputColor,const in vec2 uv,out vec4 outputColor){vec2 ra=inputColor.ra;vec2 ba=inputColor.ba;
#ifdef RADIAL_MODULATION
const vec2 center=vec2(0.5);float d=distance(uv,center)*2.0;d=max(d-modulationOffset,0.0);if(vActive>0.0&&d>0.0){ra=texture2D(inputBuffer,mix(uv,vUvR,d)).ra;ba=texture2D(inputBuffer,mix(uv,vUvB,d)).ba;}
#else
if(vActive>0.0){ra=texture2D(inputBuffer,vUvR).ra;ba=texture2D(inputBuffer,vUvB).ba;}
#endif
outputColor=vec4(ra.x,inputColor.g,ba.x,max(max(ra.y,ba.y),inputColor.a));}`,zE="uniform vec2 offset;varying float vActive;varying vec2 vUvR;varying vec2 vUvB;void mainSupport(const in vec2 uv){vec2 shift=offset*vec2(1.0,aspect);vActive=(shift.x!=0.0||shift.y!=0.0)?1.0:0.0;vUvR=uv+shift;vUvB=uv-shift;}",Kg=class extends jg{constructor({offset:i=new Pe(.001,5e-4),radialModulation:e=!1,modulationOffset:t=.15}={}){super("ChromaticAberrationEffect",kE,{vertexShader:zE,attributes:Os.CONVOLUTION,uniforms:new Map([["offset",new Oe(i)],["modulationOffset",new Oe(t)]])});this.radialModulation=e}get offset(){return this.uniforms.get("offset").value}set offset(i){this.uniforms.get("offset").value=i}get radialModulation(){return this.defines.has("RADIAL_MODULATION")}set radialModulation(i){i?this.defines.set("RADIAL_MODULATION","1"):this.defines.delete("RADIAL_MODULATION"),this.setChanged()}get modulationOffset(){return this.uniforms.get("modulationOffset").value}set modulationOffset(i){this.uniforms.get("modulationOffset").value=i}getOffset(){return this.offset}setOffset(i){this.offset=i}};var Sd=class extends di{constructor(i,e="inputBuffer"){super("ShaderPass");this.fullscreenMaterial=i,this.input=e}setInput(i){this.input=i}render(i,e,t,n,s){let r=this.fullscreenMaterial.uniforms;e!==null&&r!==void 0&&r[this.input]!==void 0&&(r[this.input].value=e.texture),i.setRenderTarget(this.renderToScreen?null:t),i.render(this.scene,this.camera)}initialize(i,e,t){t!==void 0&&t!==kt&&(this.fullscreenMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1")}};var Jg=class extends di{constructor(i,e,t=null){super("RenderPass",i,e);this.needsSwap=!1,this.clearPass=new Yg,this.overrideMaterialManager=t===null?null:new qg(t),this.ignoreBackground=!1,this.skipShadowMapUpdate=!1,this.selection=null}set mainScene(i){this.scene=i}set mainCamera(i){this.camera=i}get renderToScreen(){return super.renderToScreen}set renderToScreen(i){super.renderToScreen=i,this.clearPass.renderToScreen=i}get overrideMaterial(){let i=this.overrideMaterialManager;return i!==null?i.material:null}set overrideMaterial(i){let e=this.overrideMaterialManager;i!==null?e!==null?e.setMaterial(i):this.overrideMaterialManager=new qg(i):e!==null&&(e.dispose(),this.overrideMaterialManager=null)}getOverrideMaterial(){return this.overrideMaterial}setOverrideMaterial(i){this.overrideMaterial=i}get clear(){return this.clearPass.enabled}set clear(i){this.clearPass.enabled=i}getSelection(){return this.selection}setSelection(i){this.selection=i}isBackgroundDisabled(){return this.ignoreBackground}setBackgroundDisabled(i){this.ignoreBackground=i}isShadowMapDisabled(){return this.skipShadowMapUpdate}setShadowMapDisabled(i){this.skipShadowMapUpdate=i}getClearPass(){return this.clearPass}render(i,e,t,n,s){let r=this.scene,a=this.camera,o=this.selection,l=a.layers.mask,c=r.background,h=i.shadowMap.autoUpdate,u=this.renderToScreen?null:e;o!==null&&a.layers.set(o.getLayer()),this.skipShadowMapUpdate&&(i.shadowMap.autoUpdate=!1),(this.ignoreBackground||this.clearPass.overrideClearColor!==null)&&(r.background=null),this.clearPass.enabled&&this.clearPass.render(i,e),i.setRenderTarget(u),this.overrideMaterialManager!==null?this.overrideMaterialManager.render(i,r,a):i.render(r,a),a.layers.mask=l,r.background=c,i.shadowMap.autoUpdate=h}};var xR=Math.PI*.5;var HE=`#include <common>
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
}`,GE="uniform vec2 resolution;uniform vec2 texelSize;uniform float cameraNear;uniform float cameraFar;uniform float aspect;uniform float time;varying vec2 vUv;VERTEX_HEAD void main(){vUv=position.xy*0.5+0.5;VERTEX_MAIN_SUPPORT gl_Position=vec4(position.xy,1.0,1.0);}",VE=class extends Nt{constructor(i,e,t,n,s=!1){super({name:"EffectMaterial",defines:{THREE_REVISION:Pi.replace(/\D+/g,""),DEPTH_PACKING:"0",ENCODE_OUTPUT:"1"},uniforms:{inputBuffer:new Oe(null),depthBuffer:new Oe(null),resolution:new Oe(new Pe),texelSize:new Oe(new Pe),cameraNear:new Oe(.3),cameraFar:new Oe(1e3),aspect:new Oe(1),time:new Oe(0)},blending:$t,toneMapped:!1,depthWrite:!1,depthTest:!1,dithering:s});i&&this.setShaderParts(i),e&&this.setDefines(e),t&&this.setUniforms(t),this.copyCameraSettings(n)}set inputBuffer(i){this.uniforms.inputBuffer.value=i}setInputBuffer(i){this.uniforms.inputBuffer.value=i}get depthBuffer(){return this.uniforms.depthBuffer.value}set depthBuffer(i){this.uniforms.depthBuffer.value=i}get depthPacking(){return Number(this.defines.DEPTH_PACKING)}set depthPacking(i){this.defines.DEPTH_PACKING=i.toFixed(0),this.needsUpdate=!0}setDepthBuffer(i,e=vi){this.depthBuffer=i,this.depthPacking=e}setShaderData(i){this.setShaderParts(i.shaderParts),this.setDefines(i.defines),this.setUniforms(i.uniforms),this.setExtensions(i.extensions)}setShaderParts(i){return this.fragmentShader=HE.replace(Ct.FRAGMENT_HEAD,i.get(Ct.FRAGMENT_HEAD)||"").replace(Ct.FRAGMENT_MAIN_UV,i.get(Ct.FRAGMENT_MAIN_UV)||"").replace(Ct.FRAGMENT_MAIN_IMAGE,i.get(Ct.FRAGMENT_MAIN_IMAGE)||""),this.vertexShader=GE.replace(Ct.VERTEX_HEAD,i.get(Ct.VERTEX_HEAD)||"").replace(Ct.VERTEX_MAIN_SUPPORT,i.get(Ct.VERTEX_MAIN_SUPPORT)||""),this.needsUpdate=!0,this}setDefines(i){for(let e of i.entries())this.defines[e[0]]=e[1];return this.needsUpdate=!0,this}setUniforms(i){for(let e of i.entries())this.uniforms[e[0]]=e[1];return this}setExtensions(i){this.extensions={};for(let e of i)this.extensions[e]=!0;return this}get encodeOutput(){return this.defines.ENCODE_OUTPUT!==void 0}set encodeOutput(i){this.encodeOutput!==i&&(i?this.defines.ENCODE_OUTPUT="1":delete this.defines.ENCODE_OUTPUT,this.needsUpdate=!0)}isOutputEncodingEnabled(i){return this.encodeOutput}setOutputEncodingEnabled(i){this.encodeOutput=i}get time(){return this.uniforms.time.value}set time(i){this.uniforms.time.value=i}setDeltaTime(i){this.uniforms.time.value+=i}adoptCameraSettings(i){this.copyCameraSettings(i)}copyCameraSettings(i){i&&(this.uniforms.cameraNear.value=i.near,this.uniforms.cameraFar.value=i.far,i instanceof qt?this.defines.PERSPECTIVE_CAMERA="1":delete this.defines.PERSPECTIVE_CAMERA,this.needsUpdate=!0)}setSize(i,e){let t=this.uniforms;t.resolution.value.set(i,e),t.texelSize.value.set(1/i,1/e),t.aspect.value=i/e}static get Section(){return Ct}};var _R=Number(Pi.replace(/\D+/g,"")),wr=255/256,SR=new Float32Array([wr/256**3,wr/256**2,wr/256,wr]),bR=new Float32Array([wr,wr/256,wr/256**2,1/256**3]);function $g(i,e,t){for(let n of e){let s="$1"+i+n.charAt(0).toUpperCase()+n.slice(1),r=new RegExp("([^\\.])(\\b"+n+"\\b)","g");for(let a of t.entries())a[1]!==null&&t.set(a[0],a[1].replace(r,s))}}function WE(i,e,t){let n=e.getFragmentShader(),s=e.getVertexShader(),r=n!==void 0&&/mainImage/.test(n),a=n!==void 0&&/mainUv/.test(n);if(t.attributes|=e.getAttributes(),n===void 0)throw new Error(`Missing fragment shader (${e.name})`);if(a&&(t.attributes&Os.CONVOLUTION)!=0)throw new Error(`Effects that transform UVs are incompatible with convolution effects (${e.name})`);if(!r&&!a)throw new Error(`Could not find mainImage or mainUv function (${e.name})`);{let o=/\w+\s+(\w+)\([\w\s,]*\)\s*{/g,l=t.shaderParts,c=l.get(Ct.FRAGMENT_HEAD)||"",h=l.get(Ct.FRAGMENT_MAIN_UV)||"",u=l.get(Ct.FRAGMENT_MAIN_IMAGE)||"",d=l.get(Ct.VERTEX_HEAD)||"",p=l.get(Ct.VERTEX_MAIN_SUPPORT)||"",g=new Set,v=new Set;if(a&&(h+=`	${i}MainUv(UV);
`,t.uvTransformation=!0),s!==null&&/mainSupport/.test(s)){let x=/mainSupport *\([\w\s]*?uv\s*?\)/.test(s);p+=`	${i}MainSupport(`,p+=x?`vUv);
`:`);
`;for(let A of s.matchAll(/(?:varying\s+\w+\s+([\S\s]*?);)/g))for(let y of A[1].split(/\s*,\s*/))t.varyings.add(y),g.add(y),v.add(y);for(let A of s.matchAll(o))v.add(A[1])}for(let x of n.matchAll(o))v.add(x[1]);for(let x of e.defines.keys())v.add(x.replace(/\([\w\s,]*\)/g,""));for(let x of e.uniforms.keys())v.add(x);v.delete("while"),v.delete("for"),v.delete("if"),e.uniforms.forEach((x,A)=>t.uniforms.set(i+A.charAt(0).toUpperCase()+A.slice(1),x)),e.defines.forEach((x,A)=>t.defines.set(i+A.charAt(0).toUpperCase()+A.slice(1),x));let m=new Map([["fragment",n],["vertex",s]]);$g(i,v,t.defines),$g(i,v,m),n=m.get("fragment"),s=m.get("vertex");let f=e.blendMode;if(t.blendModes.set(f.blendFunction,f),r){e.inputColorSpace!==null&&e.inputColorSpace!==t.colorSpace&&(u+=e.inputColorSpace===nt?`color0 = sRGBTransferOETF(color0);
	`:`color0 = sRGBToLinear(color0);
	`),e.outputColorSpace!==Wn?t.colorSpace=e.outputColorSpace:e.inputColorSpace!==null&&(t.colorSpace=e.inputColorSpace);let x=/MainImage *\([\w\s,]*?depth[\w\s,]*?\)/;u+=`${i}MainImage(color0, UV, `,(t.attributes&Os.DEPTH)!=0&&x.test(n)&&(u+="depth, ",t.readDepth=!0),u+=`color1);
	`;let A=i+"BlendOpacity";t.uniforms.set(A,f.opacity),u+=`color0 = blend${f.blendFunction}(color0, color1, ${A});

	`,c+=`uniform float ${A};

`}if(c+=n+`
`,s!==null&&(d+=s+`
`),l.set(Ct.FRAGMENT_HEAD,c),l.set(Ct.FRAGMENT_MAIN_UV,h),l.set(Ct.FRAGMENT_MAIN_IMAGE,u),l.set(Ct.VERTEX_HEAD,d),l.set(Ct.VERTEX_MAIN_SUPPORT,p),e.extensions!==null)for(let x of e.extensions)t.extensions.add(x)}}var e0=class extends di{constructor(i,...e){super("EffectPass");this.fullscreenMaterial=new VE(null,null,null,i),this.listener=t=>this.handleEvent(t),this.effects=[],this.setEffects(e),this.skipRendering=!1,this.minTime=1,this.maxTime=Number.POSITIVE_INFINITY,this.timeScale=1}set mainScene(i){for(let e of this.effects)e.mainScene=i}set mainCamera(i){this.fullscreenMaterial.copyCameraSettings(i);for(let e of this.effects)e.mainCamera=i}get encodeOutput(){return this.fullscreenMaterial.encodeOutput}set encodeOutput(i){this.fullscreenMaterial.encodeOutput=i}get dithering(){return this.fullscreenMaterial.dithering}set dithering(i){let e=this.fullscreenMaterial;e.dithering=i,e.needsUpdate=!0}setEffects(i){for(let e of this.effects)e.removeEventListener("change",this.listener);this.effects=i.sort((e,t)=>t.attributes-e.attributes);for(let e of this.effects)e.addEventListener("change",this.listener)}updateMaterial(){let i=new Gb,e=0;for(let a of this.effects)if(a.blendMode.blendFunction===At.DST)i.attributes|=a.getAttributes()&Os.DEPTH;else{if((i.attributes&a.getAttributes()&Os.CONVOLUTION)!=0)throw new Error(`Convolution effects cannot be merged (${a.name})`);WE("e"+e++,a,i)}let t=i.shaderParts.get(Ct.FRAGMENT_HEAD),n=i.shaderParts.get(Ct.FRAGMENT_MAIN_IMAGE),s=i.shaderParts.get(Ct.FRAGMENT_MAIN_UV),r=/\bblend\b/g;for(let a of i.blendModes.values())t+=a.getShaderCode().replace(r,`blend${a.blendFunction}`)+`
`;(i.attributes&Os.DEPTH)!=0?(i.readDepth&&(n=`float depth = readDepth(UV);

	`+n),this.needsDepthTexture=this.getDepthTexture()===null):this.needsDepthTexture=!1,i.colorSpace===nt&&(n+=`color0 = sRGBToLinear(color0);
	`),i.uvTransformation?(s=`vec2 transformedUv = vUv;
`+s,i.defines.set("UV","transformedUv")):i.defines.set("UV","vUv"),i.shaderParts.set(Ct.FRAGMENT_HEAD,t),i.shaderParts.set(Ct.FRAGMENT_MAIN_IMAGE,n),i.shaderParts.set(Ct.FRAGMENT_MAIN_UV,s);for(let[a,o]of i.shaderParts)o!==null&&i.shaderParts.set(a,o.trim().replace(/^#/,`
#`));this.skipRendering=e===0,this.needsSwap=!this.skipRendering,this.fullscreenMaterial.setShaderData(i)}recompile(){this.updateMaterial()}getDepthTexture(){return this.fullscreenMaterial.depthBuffer}setDepthTexture(i,e=vi){this.fullscreenMaterial.depthBuffer=i,this.fullscreenMaterial.depthPacking=e;for(let t of this.effects)t.setDepthTexture(i,e)}render(i,e,t,n,s){for(let r of this.effects)r.update(i,e,n);if(!this.skipRendering||this.renderToScreen){let r=this.fullscreenMaterial;r.inputBuffer=e.texture,r.time+=n*this.timeScale,i.setRenderTarget(this.renderToScreen?null:t),i.render(this.scene,this.camera)}}setSize(i,e){this.fullscreenMaterial.setSize(i,e);for(let t of this.effects)t.setSize(i,e)}initialize(i,e,t){this.renderer=i;for(let n of this.effects)n.initialize(i,e,t);this.updateMaterial(),t!==void 0&&t!==kt&&(this.fullscreenMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1")}dispose(){super.dispose();for(let i of this.effects)i.removeEventListener("change",this.listener),i.dispose()}handleEvent(i){switch(i.type){case"change":this.recompile();break}}};var TR=[new Float32Array(3),new Float32Array(3)],MR=[new Float32Array(3),new Float32Array(3),new Float32Array(3),new Float32Array(3)],wR=[[new Float32Array([0,0,0]),new Float32Array([1,0,0]),new Float32Array([1,1,0]),new Float32Array([1,1,1])],[new Float32Array([0,0,0]),new Float32Array([1,0,0]),new Float32Array([1,0,1]),new Float32Array([1,1,1])],[new Float32Array([0,0,0]),new Float32Array([0,0,1]),new Float32Array([1,0,1]),new Float32Array([1,1,1])],[new Float32Array([0,0,0]),new Float32Array([0,1,0]),new Float32Array([1,1,0]),new Float32Array([1,1,1])],[new Float32Array([0,0,0]),new Float32Array([0,1,0]),new Float32Array([0,1,1]),new Float32Array([1,1,1])],[new Float32Array([0,0,0]),new Float32Array([0,0,1]),new Float32Array([0,1,1]),new Float32Array([1,1,1])]];var CR=[new Float32Array(2),new Float32Array(2)];var RR=new Float32Array([0,-.25,.25,-.125,.125,-.375,.375]),DR=[new Float32Array([0,0]),new Float32Array([.25,-.25]),new Float32Array([-.25,.25]),new Float32Array([.125,-.125]),new Float32Array([-.125,.125])],PR=[new Uint8Array([0,0]),new Uint8Array([3,0]),new Uint8Array([0,3]),new Uint8Array([3,3]),new Uint8Array([1,0]),new Uint8Array([4,0]),new Uint8Array([1,3]),new Uint8Array([4,3]),new Uint8Array([0,1]),new Uint8Array([3,1]),new Uint8Array([0,4]),new Uint8Array([3,4]),new Uint8Array([1,1]),new Uint8Array([4,1]),new Uint8Array([1,4]),new Uint8Array([4,4])],IR=[new Uint8Array([0,0]),new Uint8Array([1,0]),new Uint8Array([0,2]),new Uint8Array([1,2]),new Uint8Array([2,0]),new Uint8Array([3,0]),new Uint8Array([2,2]),new Uint8Array([3,2]),new Uint8Array([0,1]),new Uint8Array([1,1]),new Uint8Array([0,3]),new Uint8Array([1,3]),new Uint8Array([2,1]),new Uint8Array([3,1]),new Uint8Array([2,3]),new Uint8Array([3,3])];var LR=new Map([[bn(0,0,0,0),new Float32Array([0,0,0,0])],[bn(0,0,0,1),new Float32Array([0,0,0,1])],[bn(0,0,1,0),new Float32Array([0,0,1,0])],[bn(0,0,1,1),new Float32Array([0,0,1,1])],[bn(0,1,0,0),new Float32Array([0,1,0,0])],[bn(0,1,0,1),new Float32Array([0,1,0,1])],[bn(0,1,1,0),new Float32Array([0,1,1,0])],[bn(0,1,1,1),new Float32Array([0,1,1,1])],[bn(1,0,0,0),new Float32Array([1,0,0,0])],[bn(1,0,0,1),new Float32Array([1,0,0,1])],[bn(1,0,1,0),new Float32Array([1,0,1,0])],[bn(1,0,1,1),new Float32Array([1,0,1,1])],[bn(1,1,0,0),new Float32Array([1,1,0,0])],[bn(1,1,0,1),new Float32Array([1,1,0,1])],[bn(1,1,1,0),new Float32Array([1,1,1,0])],[bn(1,1,1,1),new Float32Array([1,1,1,1])]]);function bd(i,e,t){return i+(e-i)*t}function bn(i,e,t,n){let s=bd(i,e,1-.25),r=bd(t,n,1-.25);return bd(s,r,1-.125)}var Ed=class{constructor(e,t,n){if(this.stage=e,this.debug=n,this.composer=new Qg(e.renderer,{alpha:!1}),this.chromaEffect=new Kg,this.bloomEffect=new Zg({resolutionScale:.5}),this.params={bloomIntensity:.87,bloomLuminanceThreshold:0,bloomLuminanceSmoothing:0,bloomKernelSize:_a.LARGE,chromaOffsetX:3e-4,chromaOffsetY:0},this.renderScenePass=new Jg(e.scene,e.camera),this.outlinePass=new Sd(t.outlineShaderMaterial,"tDiffuse"),this.fxaaPass=new Sd(t.fxaaShaderMaterial,"tDiffuse"),this.effectPass=new e0(e.camera),this.composer.addPass(this.renderScenePass),this.composer.addPass(this.outlinePass),this.composer.addPass(this.effectPass),this.updateDimensions(),this.updateEffects(),this.debug.enabled){let s=this.debug.gui.addFolder("Post processing");s.add(this.params,"bloomIntensity").min(0).max(10).step(.01).name("Bloom intensity").onChange(this.updateEffects.bind(this)),s.add(this.params,"bloomLuminanceThreshold").min(0).max(10).step(.01).name("Bloom threshold").onChange(this.updateEffects.bind(this)),s.add(this.params,"bloomLuminanceSmoothing").min(0).max(10).step(.01).name("Bloom smoothing").onChange(this.updateEffects.bind(this)),s.add(this.params,"bloomKernelSize",_a).name("Bloom KernelSize").onChange(this.updateEffects.bind(this)),s.add(this.params,"chromaOffsetX").min(0).max(.001).step(1e-5).name("Chroma x").onChange(this.updateEffects.bind(this)),s.add(this.params,"chromaOffsetY").min(0).max(.001).step(1e-5).name("Chroma y").onChange(this.updateEffects.bind(this))}}updateEffects(){this.bloomEffect.intensity=this.params.bloomIntensity,this.bloomEffect.luminanceMaterial.uniforms.threshold.value=this.params.bloomLuminanceThreshold,this.bloomEffect.luminanceMaterial.uniforms.smoothing.value=this.params.bloomLuminanceSmoothing,this.bloomEffect.kernelSize=this.params.bloomKernelSize,this.chromaEffect.uniforms.get("offset").value.x=this.params.chromaOffsetX,this.chromaEffect.uniforms.get("offset").value.y=this.params.chromaOffsetY}render(){this.composer.render()}updateDimensions(){let e=window.devicePixelRatio>2?3:2;this.composer.setSize(this.stage.width*e,this.stage.height*e,!1)}};var Td={vertex:`
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
  `};var Md={uniforms:{tDiffuse:{value:null},resolution:{value:new Pe(1/1024,1/512)}},vertexShader:`

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
    }`};var wd=class{constructor(e,t){if(this.stage=e,this.debug=t,this.dummyColor=new Ae,this.colors={backgroundColor:H.get(document.documentElement,"--backgroundColor"),outlineColor:H.get(document.documentElement,"--outlineColor"),outlineColorLight:H.get(document.documentElement,"--outlineColorLight"),rimColor:H.get(document.documentElement,"--rimColor"),shadowColor:H.get(document.documentElement,"--shadowColor"),worldColor1:H.get(document.documentElement,"--worldColor1"),worldColorLight1:H.get(document.documentElement,"--worldColorLight1")},this.outlineMaterialParams={verticesNormalMix:.08,rimThreshold:1,rimAmount:.25},this.outlinePassParams={resolutionScale:4,verticesNormalMix:.18,threshold:.035,outlineThickness:1,outlineBlend:.4,contourBlend:.65,sourceMix:1,effectMix:1,backgroundMix:1,rimIntensity:1,shadowIntensity:1},this.outlineMaterial=new $l({vertexColors:!0}),this.outlineMaterial.onBeforeCompile=n=>{n.uniforms.verticesNormalMix={value:this.outlineMaterialParams.verticesNormalMix},n.uniforms.rimThreshold={value:this.outlineMaterialParams.rimThreshold},n.uniforms.rimAmount={value:this.outlineMaterialParams.rimAmount},n.vertexShader=n.vertexShader.replace("void main() {",`
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
        `),this.outlineMaterial.userData.shader=n},this.outlinePassColors={backgroundColor:this.colors.backgroundColor,outlineColor:this.colors.outlineColor,rimColor:this.colors.rimColor,shadowColor:this.colors.shadowColor,worldColor1:this.colors.worldColor1},this.outlineShaderMaterial=new Nt({vertexShader:Td.vertex,fragmentShader:Td.fragment,transparent:!0,uniforms:{tDiffuse:new Oe(null),resolutionScale:new Oe(this.outlinePassParams.resolutionScale),resolution:new Oe(new Pe(e.width*this.outlinePassParams.resolutionScale,e.height*this.outlinePassParams.resolutionScale)),threshold:new Oe(this.outlinePassParams.threshold),outlineThickness:new Oe(this.outlinePassParams.outlineThickness),outlineBlend:new Oe(this.outlinePassParams.outlineBlend),contourBlend:new Oe(this.outlinePassParams.contourBlend),sourceMix:new Oe(this.outlinePassParams.sourceMix),effectMix:new Oe(this.outlinePassParams.effectMix),backgroundMix:new Oe(this.outlinePassParams.backgroundMix),backgroundColor:new Oe(new Ae(this.outlinePassColors.backgroundColor)),outlineColor:new Oe(new Ae(this.outlinePassColors.outlineColor)),rimColor:new Oe(new Ae(this.outlinePassColors.rimColor)),rimIntensity:new Oe(this.outlinePassParams.rimIntensity),shadowColor:new Oe(new Ae(this.outlinePassColors.shadowColor)),shadowIntensity:new Oe(this.outlinePassParams.shadowIntensity),worldColor1:new Oe(new Ae(this.outlinePassColors.worldColor1))}}),this.updateDimensions(),this.debug.enabled){let r=function(o){s.uniforms[this._name].value=o},n=this.debug.gui.addFolder("Outlines");n.add(this.outlinePassParams,"resolutionScale",.25,16,.25).onChange(o=>{this.outlineShaderMaterial.uniforms.resolution.value.set(e.width*o,e.height*o)}),n.add(this.outlineMaterialParams,"verticesNormalMix",0,1,.01).onChange(o=>{this.outlineMaterial.userData.shader.uniforms.verticesNormalMix.value=o}),n.add(this.outlineMaterialParams,"rimThreshold",0,1,.01).onChange(o=>{this.outlineMaterial.userData.shader.uniforms.rimThreshold.value=o}),n.add(this.outlineMaterialParams,"rimAmount",0,1,.01).onChange(o=>{this.outlineMaterial.userData.shader.uniforms.rimAmount.value=o});let s=this.outlineShaderMaterial;n.add(this.outlineShaderMaterial.uniforms.threshold,"value",.001,.1,.001).name("threshold").onChange(r),n.add(this.outlineShaderMaterial.uniforms.outlineThickness,"value",.01,16,.01).name("outlineThickness").onChange(r),n.add(this.outlineShaderMaterial.uniforms.outlineBlend,"value",.01,1,.01).name("outlineBlend").onChange(r),n.add(this.outlineShaderMaterial.uniforms.contourBlend,"value",.01,1,.01).name("contourBlend").onChange(r),n.add(this.outlineShaderMaterial.uniforms.sourceMix,"value",0,1,.01).name("sourceMix").onChange(r),n.add(this.outlineShaderMaterial.uniforms.effectMix,"value",0,1,.01).name("effectMix").onChange(r),n.add(this.outlineShaderMaterial.uniforms.backgroundMix,"value",0,1,.01).name("backgroundMix").onChange(r),n.add(this.outlineShaderMaterial.uniforms.rimIntensity,"value",0,1,.01).name("rimIntensity").onChange(r),n.add(this.outlineShaderMaterial.uniforms.shadowIntensity,"value",0,1,.01).name("shadowIntensity").onChange(r);let a=this.debug.gui.addFolder("Colors");for(let o in this.outlinePassColors)a.addColor(this.outlinePassColors,o,this.outlinePassColors[o]).onChange(l=>{this.outlineShaderMaterial.uniforms[o].value=new Ae(l),o==="backgroundColor"&&(document.body.style.backgroundColor=l,document.documentElement.style.backgroundColor=l)})}this.fxaaShaderMaterial=new Nt({vertexShader:Md.vertexShader,fragmentShader:Md.fragmentShader,uniforms:{tDiffuse:new Oe(null),resolutionScale:new Oe(1),resolution:new Oe(new Pe(1/e.width,1/e.height))}})}get outlineColor(){return this.outlineShaderMaterial.uniforms.outlineColor.value.getStyle()}set outlineColor(e){this.outlineShaderMaterial.uniforms.outlineColor.value.setStyle(e)}get rimColor(){return this.outlineShaderMaterial.uniforms.rimColor.value.getStyle()}set rimColor(e){this.outlineShaderMaterial.uniforms.rimColor.value.setStyle(e)}get shadowColor(){return this.outlineShaderMaterial.uniforms.shadowColor.value.getStyle()}set shadowColor(e){this.outlineShaderMaterial.uniforms.shadowColor.value.setStyle(e)}get worldColor1(){return this.outlineShaderMaterial.uniforms.worldColor1.value.getStyle()}set worldColor1(e){this.outlineShaderMaterial.uniforms.worldColor1.value.setStyle(e)}get backgroundColor(){return this.outlineShaderMaterial.uniforms.backgroundColor.value.getStyle()}set backgroundColor(e){this.outlineShaderMaterial.uniforms.backgroundColor.value.setStyle(e),document.body.style.backgroundColor=e,document.documentElement.style.backgroundColor=e}updateDimensions(){this.outlineShaderMaterial.uniforms.resolution.value.set(this.stage.width*this.outlinePassParams.resolutionScale,this.stage.height*this.outlinePassParams.resolutionScale)}};function Cd(i,e){if(e===xh)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),i;if(e===Or||e===Ua){let t=i.getIndex();if(t===null){let a=[],o=i.getAttribute("position");if(o!==void 0){for(let l=0;l<o.count;l++)a.push(l);i.setIndex(a),t=i.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),i}let n=t.count-2,s=[];if(e===Or)for(let a=1;a<=n;a++)s.push(t.getX(0)),s.push(t.getX(a)),s.push(t.getX(a+1));else for(let a=0;a<n;a++)a%2==0?(s.push(t.getX(a)),s.push(t.getX(a+1)),s.push(t.getX(a+2))):(s.push(t.getX(a+2)),s.push(t.getX(a+1)),s.push(t.getX(a)));s.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");let r=i.clone();return r.setIndex(s),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),i}var Rd=class extends Ei{constructor(e){super(e);this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new s0(t)}),this.register(function(t){return new r0(t)}),this.register(function(t){return new p0(t)}),this.register(function(t){return new m0(t)}),this.register(function(t){return new g0(t)}),this.register(function(t){return new o0(t)}),this.register(function(t){return new l0(t)}),this.register(function(t){return new c0(t)}),this.register(function(t){return new h0(t)}),this.register(function(t){return new i0(t)}),this.register(function(t){return new u0(t)}),this.register(function(t){return new a0(t)}),this.register(function(t){return new f0(t)}),this.register(function(t){return new d0(t)}),this.register(function(t){return new t0(t)}),this.register(function(t){return new v0(t)}),this.register(function(t){return new x0(t)})}load(e,t,n,s){let r=this,a;if(this.resourcePath!=="")a=this.resourcePath;else if(this.path!==""){let c=Ps.extractUrlBase(e);a=Ps.resolveURL(c,this.path)}else a=Ps.extractUrlBase(e);this.manager.itemStart(e);let o=function(c){s?s(c):console.error(c),r.manager.itemError(e),r.manager.itemEnd(e)},l=new Ds(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{r.parse(c,a,function(h){t(h),r.manager.itemEnd(e)},o)}catch(h){o(h)}},n,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,s){let r,a={},o={},l=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===y0){try{a[vt.KHR_BINARY_GLTF]=new _0(e)}catch(u){s&&s(u);return}r=JSON.parse(a[vt.KHR_BINARY_GLTF].content)}else r=JSON.parse(l.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){s&&s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let c=new C0(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){let u=this.pluginCallbacks[h](c);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[u.name]=u,a[u.name]=!0}if(r.extensionsUsed)for(let h=0;h<r.extensionsUsed.length;++h){let u=r.extensionsUsed[h],d=r.extensionsRequired||[];switch(u){case vt.KHR_MATERIALS_UNLIT:a[u]=new n0;break;case vt.KHR_DRACO_MESH_COMPRESSION:a[u]=new S0(r,this.dracoLoader);break;case vt.KHR_TEXTURE_TRANSFORM:a[u]=new b0;break;case vt.KHR_MESH_QUANTIZATION:a[u]=new E0;break;default:d.indexOf(u)>=0&&o[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}c.setExtensions(a),c.setPlugins(o),c.parse(n,s)}parseAsync(e,t){let n=this;return new Promise(function(s,r){n.parse(e,t,s,r)})}};function XE(){let i={};return{get:function(e){return i[e]},add:function(e,t){i[e]=t},remove:function(e){delete i[e]},removeAll:function(){i={}}}}var vt={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"},t0=class{constructor(e){this.parser=e,this.name=vt.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let n=0,s=t.length;n<s;n++){let r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){let t=this.parser,n="light:"+e,s=t.cache.get(n);if(s)return s;let r=t.json,l=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e],c,h=new Ae(16777215);l.color!==void 0&&h.setRGB(l.color[0],l.color[1],l.color[2],Wt);let u=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new la(h),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new ac(h),c.distance=u;break;case"spot":c=new rc(h),c.distance=u,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),c.decay=2,ds(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),s=Promise.resolve(c),t.cache.add(n,s),s}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){let t=this,n=this.parser,r=n.json.nodes[e],o=(r.extensions&&r.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(l){return n._getNodeRef(t.cache,o,l)})}},n0=class{constructor(){this.name=vt.KHR_MATERIALS_UNLIT}getMaterialType(){return ai}extendParams(e,t,n){let s=[];e.color=new Ae(1,1,1),e.opacity=1;let r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){let a=r.baseColorFactor;e.color.setRGB(a[0],a[1],a[2],Wt),e.opacity=a[3]}r.baseColorTexture!==void 0&&s.push(n.assignTexture(e,"map",r.baseColorTexture,nt))}return Promise.all(s)}},i0=class{constructor(e){this.parser=e,this.name=vt.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=s.extensions[this.name].emissiveStrength;return r!==void 0&&(t.emissiveIntensity=r),Promise.resolve()}},s0=class{constructor(e){this.parser=e,this.name=vt.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Zn}extendMaterialParams(e,t){let n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],a=s.extensions[this.name];if(a.clearcoatFactor!==void 0&&(t.clearcoat=a.clearcoatFactor),a.clearcoatTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatMap",a.clearcoatTexture)),a.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=a.clearcoatRoughnessFactor),a.clearcoatRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatRoughnessMap",a.clearcoatRoughnessTexture)),a.clearcoatNormalTexture!==void 0&&(r.push(n.assignTexture(t,"clearcoatNormalMap",a.clearcoatNormalTexture)),a.clearcoatNormalTexture.scale!==void 0)){let o=a.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new Pe(o,o)}return Promise.all(r)}},r0=class{constructor(e){this.parser=e,this.name=vt.KHR_MATERIALS_DISPERSION}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Zn}extendMaterialParams(e,t){let s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=s.extensions[this.name];return t.dispersion=r.dispersion!==void 0?r.dispersion:0,Promise.resolve()}},a0=class{constructor(e){this.parser=e,this.name=vt.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Zn}extendMaterialParams(e,t){let n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],a=s.extensions[this.name];return a.iridescenceFactor!==void 0&&(t.iridescence=a.iridescenceFactor),a.iridescenceTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceMap",a.iridescenceTexture)),a.iridescenceIor!==void 0&&(t.iridescenceIOR=a.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),a.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=a.iridescenceThicknessMinimum),a.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=a.iridescenceThicknessMaximum),a.iridescenceThicknessTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceThicknessMap",a.iridescenceThicknessTexture)),Promise.all(r)}},o0=class{constructor(e){this.parser=e,this.name=vt.KHR_MATERIALS_SHEEN}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Zn}extendMaterialParams(e,t){let n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[];t.sheenColor=new Ae(0,0,0),t.sheenRoughness=0,t.sheen=1;let a=s.extensions[this.name];if(a.sheenColorFactor!==void 0){let o=a.sheenColorFactor;t.sheenColor.setRGB(o[0],o[1],o[2],Wt)}return a.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=a.sheenRoughnessFactor),a.sheenColorTexture!==void 0&&r.push(n.assignTexture(t,"sheenColorMap",a.sheenColorTexture,nt)),a.sheenRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"sheenRoughnessMap",a.sheenRoughnessTexture)),Promise.all(r)}},l0=class{constructor(e){this.parser=e,this.name=vt.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Zn}extendMaterialParams(e,t){let n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],a=s.extensions[this.name];return a.transmissionFactor!==void 0&&(t.transmission=a.transmissionFactor),a.transmissionTexture!==void 0&&r.push(n.assignTexture(t,"transmissionMap",a.transmissionTexture)),Promise.all(r)}},c0=class{constructor(e){this.parser=e,this.name=vt.KHR_MATERIALS_VOLUME}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Zn}extendMaterialParams(e,t){let n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],a=s.extensions[this.name];t.thickness=a.thicknessFactor!==void 0?a.thicknessFactor:0,a.thicknessTexture!==void 0&&r.push(n.assignTexture(t,"thicknessMap",a.thicknessTexture)),t.attenuationDistance=a.attenuationDistance||1/0;let o=a.attenuationColor||[1,1,1];return t.attenuationColor=new Ae().setRGB(o[0],o[1],o[2],Wt),Promise.all(r)}},h0=class{constructor(e){this.parser=e,this.name=vt.KHR_MATERIALS_IOR}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Zn}extendMaterialParams(e,t){let s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=s.extensions[this.name];return t.ior=r.ior!==void 0?r.ior:1.5,Promise.resolve()}},u0=class{constructor(e){this.parser=e,this.name=vt.KHR_MATERIALS_SPECULAR}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Zn}extendMaterialParams(e,t){let n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],a=s.extensions[this.name];t.specularIntensity=a.specularFactor!==void 0?a.specularFactor:1,a.specularTexture!==void 0&&r.push(n.assignTexture(t,"specularIntensityMap",a.specularTexture));let o=a.specularColorFactor||[1,1,1];return t.specularColor=new Ae().setRGB(o[0],o[1],o[2],Wt),a.specularColorTexture!==void 0&&r.push(n.assignTexture(t,"specularColorMap",a.specularColorTexture,nt)),Promise.all(r)}},d0=class{constructor(e){this.parser=e,this.name=vt.EXT_MATERIALS_BUMP}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Zn}extendMaterialParams(e,t){let n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],a=s.extensions[this.name];return t.bumpScale=a.bumpFactor!==void 0?a.bumpFactor:1,a.bumpTexture!==void 0&&r.push(n.assignTexture(t,"bumpMap",a.bumpTexture)),Promise.all(r)}},f0=class{constructor(e){this.parser=e,this.name=vt.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Zn}extendMaterialParams(e,t){let n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();let r=[],a=s.extensions[this.name];return a.anisotropyStrength!==void 0&&(t.anisotropy=a.anisotropyStrength),a.anisotropyRotation!==void 0&&(t.anisotropyRotation=a.anisotropyRotation),a.anisotropyTexture!==void 0&&r.push(n.assignTexture(t,"anisotropyMap",a.anisotropyTexture)),Promise.all(r)}},p0=class{constructor(e){this.parser=e,this.name=vt.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,n=t.json,s=n.textures[e];if(!s.extensions||!s.extensions[this.name])return null;let r=s.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,a)}},m0=class{constructor(e){this.parser=e,this.name=vt.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){let t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;let a=r.extensions[t],o=s.images[a.source],l=n.textureLoader;if(o.uri){let c=n.options.manager.getHandler(o.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return n.loadTextureImage(e,a.source,l);if(s.extensionsRequired&&s.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){let t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}},g0=class{constructor(e){this.parser=e,this.name=vt.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){let t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;let a=r.extensions[t],o=s.images[a.source],l=n.textureLoader;if(o.uri){let c=n.options.manager.getHandler(o.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return n.loadTextureImage(e,a.source,l);if(s.extensionsRequired&&s.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){let t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}},v0=class{constructor(e){this.name=vt.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){let t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){let s=n.extensions[this.name],r=this.parser.getDependency("buffer",s.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(o){let l=s.byteOffset||0,c=s.byteLength||0,h=s.count,u=s.byteStride,d=new Uint8Array(o,l,c);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(h,u,d,s.mode,s.filter).then(function(p){return p.buffer}):a.ready.then(function(){let p=new ArrayBuffer(h*u);return a.decodeGltfBuffer(new Uint8Array(p),h,u,d,s.mode,s.filter),p})})}else return null}},x0=class{constructor(e){this.name=vt.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;let s=t.meshes[n.mesh];for(let c of s.primitives)if(c.mode!==fi.TRIANGLES&&c.mode!==fi.TRIANGLE_STRIP&&c.mode!==fi.TRIANGLE_FAN&&c.mode!==void 0)return null;let a=n.extensions[this.name].attributes,o=[],l={};for(let c in a)o.push(this.parser.getDependency("accessor",a[c]).then(h=>(l[c]=h,l[c])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(c=>{let h=c.pop(),u=h.isGroup?h.children:[h],d=c[0].count,p=[];for(let g of u){let v=new Ze,m=new O,f=new Xn,x=new O(1,1,1),A=new Vl(g.geometry,g.material,d);for(let y=0;y<d;y++)l.TRANSLATION&&m.fromBufferAttribute(l.TRANSLATION,y),l.ROTATION&&f.fromBufferAttribute(l.ROTATION,y),l.SCALE&&x.fromBufferAttribute(l.SCALE,y),A.setMatrixAt(y,v.compose(m,f,x));for(let y in l)if(y==="_COLOR_0"){let T=l[y];A.instanceColor=new ur(T.array,T.itemSize,T.normalized)}else y!=="TRANSLATION"&&y!=="ROTATION"&&y!=="SCALE"&&g.geometry.setAttribute(y,l[y]);Rt.prototype.copy.call(A,g),this.parser.assignFinalMaterial(A),p.push(A)}return h.isGroup?(h.clear(),h.add(...p),h):p[0]}))}},y0="glTF",_o=12,A0={JSON:1313821514,BIN:5130562},_0=class{constructor(e){this.name=vt.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,_o),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==y0)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");let s=this.header.length-_o,r=new DataView(e,_o),a=0;for(;a<s;){let o=r.getUint32(a,!0);a+=4;let l=r.getUint32(a,!0);if(a+=4,l===A0.JSON){let c=new Uint8Array(e,_o+a,o);this.content=n.decode(c)}else if(l===A0.BIN){let c=_o+a;this.body=e.slice(c,c+o)}a+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}},S0=class{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=vt.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let n=this.json,s=this.dracoLoader,r=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},l={},c={};for(let h in a){let u=Id[h]||h.toLowerCase();o[u]=a[h]}for(let h in e.attributes){let u=Id[h]||h.toLowerCase();if(a[h]!==void 0){let d=n.accessors[e.attributes[h]],p=Sa[d.componentType];c[u]=p.name,l[u]=d.normalized===!0}}return t.getDependency("bufferView",r).then(function(h){return new Promise(function(u,d){s.decodeDracoFile(h,function(p){for(let g in p.attributes){let v=p.attributes[g],m=l[g];m!==void 0&&(v.normalized=m)}u(p)},o,c,Wt,d)})})}},b0=class{constructor(){this.name=vt.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}},E0=class{constructor(){this.name=vt.KHR_MESH_QUANTIZATION}},Dd=class extends ws{constructor(e,t,n,s){super(e,t,n,s)}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s*3+s;for(let a=0;a!==s;a++)t[a]=n[r+a];return t}interpolate_(e,t,n,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=o*2,c=o*3,h=s-t,u=(n-t)/h,d=u*u,p=d*u,g=e*c,v=g-c,m=-2*p+3*d,f=p-d,x=1-m,A=f-d+u;for(let y=0;y!==o;y++){let T=a[v+y+o],M=a[v+y+l]*h,C=a[g+y+o],R=a[g+y]*h;r[y]=x*T+A*M+m*C+f*R}return r}},YE=new Xn,T0=class extends Dd{interpolate_(e,t,n,s){let r=super.interpolate_(e,t,n,s);return YE.fromArray(r).normalize().toArray(r),r}},fi={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},Sa={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},M0={9728:xn,9729:en,9984:Uo,9985:Ur,9986:Ks,9987:gi},w0={33071:Li,33648:Fr,10497:xs},Pd={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Id={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},zs={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},QE={CUBICSPLINE:void 0,LINEAR:er,STEP:$s},Ld={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function qE(i){return i.DefaultMaterial===void 0&&(i.DefaultMaterial=new ra({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Hn})),i.DefaultMaterial}function Cr(i,e,t){for(let n in t.extensions)i[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function ds(i,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(i.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function jE(i,e,t){let n=!1,s=!1,r=!1;for(let c=0,h=e.length;c<h;c++){let u=e[c];if(u.POSITION!==void 0&&(n=!0),u.NORMAL!==void 0&&(s=!0),u.COLOR_0!==void 0&&(r=!0),n&&s&&r)break}if(!n&&!s&&!r)return Promise.resolve(i);let a=[],o=[],l=[];for(let c=0,h=e.length;c<h;c++){let u=e[c];if(n){let d=u.POSITION!==void 0?t.getDependency("accessor",u.POSITION):i.attributes.position;a.push(d)}if(s){let d=u.NORMAL!==void 0?t.getDependency("accessor",u.NORMAL):i.attributes.normal;o.push(d)}if(r){let d=u.COLOR_0!==void 0?t.getDependency("accessor",u.COLOR_0):i.attributes.color;l.push(d)}}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(l)]).then(function(c){let h=c[0],u=c[1],d=c[2];return n&&(i.morphAttributes.position=h),s&&(i.morphAttributes.normal=u),r&&(i.morphAttributes.color=d),i.morphTargetsRelative=!0,i})}function ZE(i,e){if(i.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)i.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){let t=e.extras.targetNames;if(i.morphTargetInfluences.length===t.length){i.morphTargetDictionary={};for(let n=0,s=t.length;n<s;n++)i.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function KE(i){let e,t=i.extensions&&i.extensions[vt.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+Fd(t.attributes):e=i.indices+":"+Fd(i.attributes)+":"+i.mode,i.targets!==void 0)for(let n=0,s=i.targets.length;n<s;n++)e+=":"+Fd(i.targets[n]);return e}function Fd(i){let e="",t=Object.keys(i).sort();for(let n=0,s=t.length;n<s;n++)e+=t[n]+":"+i[t[n]]+";";return e}function Ud(i){switch(i){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function JE(i){return i.search(/\.jpe?g($|\?)/i)>0||i.search(/^data\:image\/jpeg/)===0?"image/jpeg":i.search(/\.webp($|\?)/i)>0||i.search(/^data\:image\/webp/)===0?"image/webp":i.search(/\.ktx2($|\?)/i)>0||i.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}var $E=new Ze,C0=class{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new XE,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,s=-1,r=!1,a=-1;if(typeof navigator!="undefined"){let o=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(o)===!0;let l=o.match(/Version\/(\d+)/);s=n&&l?parseInt(l[1],10):-1,r=o.indexOf("Firefox")>-1,a=r?o.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap=="undefined"||n&&s<17||r&&a<98?this.textureLoader=new ic(this.options.manager):this.textureLoader=new lc(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Ds(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let n=this,s=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(a){let o={scene:a[0][s.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:s.asset,parser:n,userData:{}};return Cr(r,o,s),ds(o,s),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(o)})).then(function(){for(let l of o.scenes)l.updateMatrixWorld();e(o)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let s=0,r=t.length;s<r;s++){let a=t[s].joints;for(let o=0,l=a.length;o<l;o++)e[a[o]].isBone=!0}for(let s=0,r=e.length;s<r;s++){let a=e[s];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(n[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;let s=n.clone(),r=(a,o)=>{let l=this.associations.get(a);l!=null&&this.associations.set(o,l);for(let[c,h]of a.children.entries())r(h,o.children[c])};return r(n,s),s.name+="_instance_"+e.uses[t]++,s}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){let s=e(t[n]);if(s)return s}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let n=[];for(let s=0;s<t.length;s++){let r=e(t[s]);r&&n.push(r)}return n}getDependency(e,t){let n=e+":"+t,s=this.cache.get(n);if(!s){switch(e){case"scene":s=this.loadScene(t);break;case"node":s=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":s=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":s=this.loadAccessor(t);break;case"bufferView":s=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":s=this.loadBuffer(t);break;case"material":s=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":s=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":s=this.loadSkin(t);break;case"animation":s=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":s=this.loadCamera(t);break;default:if(s=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!s)throw new Error("Unknown type: "+e);break}this.cache.add(n,s)}return s}getDependencies(e){let t=this.cache.get(e);if(!t){let n=this,s=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(s.map(function(r,a){return n.getDependency(e,a)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[vt.KHR_BINARY_GLTF].body);let s=this.options;return new Promise(function(r,a){n.load(Ps.resolveURL(t.uri,s.path),r,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){let s=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+s)})}loadAccessor(e){let t=this,n=this.json,s=this.json.accessors[e];if(s.bufferView===void 0&&s.sparse===void 0){let a=Pd[s.type],o=Sa[s.componentType],l=s.normalized===!0,c=new o(s.count*a);return Promise.resolve(new Gt(c,a,l))}let r=[];return s.bufferView!==void 0?r.push(this.getDependency("bufferView",s.bufferView)):r.push(null),s.sparse!==void 0&&(r.push(this.getDependency("bufferView",s.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",s.sparse.values.bufferView))),Promise.all(r).then(function(a){let o=a[0],l=Pd[s.type],c=Sa[s.componentType],h=c.BYTES_PER_ELEMENT,u=h*l,d=s.byteOffset||0,p=s.bufferView!==void 0?n.bufferViews[s.bufferView].byteStride:void 0,g=s.normalized===!0,v,m;if(p&&p!==u){let f=Math.floor(d/p),x="InterleavedBuffer:"+s.bufferView+":"+s.componentType+":"+f+":"+s.count,A=t.cache.get(x);A||(v=new c(o,f*p,s.count*p/h),A=new Xa(v,p/h),t.cache.add(x,A)),m=new hr(A,l,d%p/h,g)}else o===null?v=new c(s.count*l):v=new c(o,d,s.count*l),m=new Gt(v,l,g);if(s.sparse!==void 0){let f=Pd.SCALAR,x=Sa[s.sparse.indices.componentType],A=s.sparse.indices.byteOffset||0,y=s.sparse.values.byteOffset||0,T=new x(a[1],A,s.sparse.count*f),M=new c(a[2],y,s.sparse.count*l);o!==null&&(m=new Gt(m.array.slice(),m.itemSize,m.normalized)),m.normalized=!1;for(let C=0,R=T.length;C<R;C++){let b=T[C];if(m.setX(b,M[C*l]),l>=2&&m.setY(b,M[C*l+1]),l>=3&&m.setZ(b,M[C*l+2]),l>=4&&m.setW(b,M[C*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}m.normalized=g}return m})}loadTexture(e){let t=this.json,n=this.options,r=t.textures[e].source,a=t.images[r],o=this.textureLoader;if(a.uri){let l=n.manager.getHandler(a.uri);l!==null&&(o=l)}return this.loadTextureImage(e,r,o)}loadTextureImage(e,t,n){let s=this,r=this.json,a=r.textures[e],o=r.images[t],l=(o.uri||o.bufferView)+":"+a.sampler;if(this.textureCache[l])return this.textureCache[l];let c=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=a.name||o.name||"",h.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(h.name=o.uri);let d=(r.samplers||{})[a.sampler]||{};return h.magFilter=M0[d.magFilter]||en,h.minFilter=M0[d.minFilter]||gi,h.wrapS=w0[d.wrapS]||xs,h.wrapT=w0[d.wrapT]||xs,h.generateMipmaps=!h.isCompressedTexture&&h.minFilter!==xn&&h.minFilter!==en,s.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){let n=this,s=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(u=>u.clone());let a=s.images[e],o=self.URL||self.webkitURL,l=a.uri||"",c=!1;if(a.bufferView!==void 0)l=n.getDependency("bufferView",a.bufferView).then(function(u){c=!0;let d=new Blob([u],{type:a.mimeType});return l=o.createObjectURL(d),l});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");let h=Promise.resolve(l).then(function(u){return new Promise(function(d,p){let g=d;t.isImageBitmapLoader===!0&&(g=function(v){let m=new zt(v);m.needsUpdate=!0,d(m)}),t.load(Ps.resolveURL(u,r.path),g,void 0,p)})}).then(function(u){return c===!0&&o.revokeObjectURL(l),ds(u,a),u.userData.mimeType=a.mimeType||JE(a.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),u});return this.sourceCache[e]=h,h}assignTexture(e,t,n,s){let r=this;return this.getDependency("texture",n.index).then(function(a){if(!a)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(a=a.clone(),a.channel=n.texCoord),r.extensions[vt.KHR_TEXTURE_TRANSFORM]){let o=n.extensions!==void 0?n.extensions[vt.KHR_TEXTURE_TRANSFORM]:void 0;if(o){let l=r.associations.get(a);a=r.extensions[vt.KHR_TEXTURE_TRANSFORM].extendTexture(a,o),r.associations.set(a,l)}}return s!==void 0&&(a.colorSpace=s),e[t]=a,a})}assignFinalMaterial(e){let t=e.geometry,n=e.material,s=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){let o="PointsMaterial:"+n.uuid,l=this.cache.get(o);l||(l=new Ka,fn.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,l.sizeAttenuation=!1,this.cache.add(o,l)),n=l}else if(e.isLine){let o="LineBasicMaterial:"+n.uuid,l=this.cache.get(o);l||(l=new Ts,fn.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,this.cache.add(o,l)),n=l}if(s||r||a){let o="ClonedMaterial:"+n.uuid+":";s&&(o+="derivative-tangents:"),r&&(o+="vertex-colors:"),a&&(o+="flat-shading:");let l=this.cache.get(o);l||(l=n.clone(),r&&(l.vertexColors=!0),a&&(l.flatShading=!0),s&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(o,l),this.associations.set(l,this.associations.get(n))),n=l}e.material=n}getMaterialType(){return ra}loadMaterial(e){let t=this,n=this.json,s=this.extensions,r=n.materials[e],a,o={},l=r.extensions||{},c=[];if(l[vt.KHR_MATERIALS_UNLIT]){let u=s[vt.KHR_MATERIALS_UNLIT];a=u.getMaterialType(),c.push(u.extendParams(o,r,t))}else{let u=r.pbrMetallicRoughness||{};if(o.color=new Ae(1,1,1),o.opacity=1,Array.isArray(u.baseColorFactor)){let d=u.baseColorFactor;o.color.setRGB(d[0],d[1],d[2],Wt),o.opacity=d[3]}u.baseColorTexture!==void 0&&c.push(t.assignTexture(o,"map",u.baseColorTexture,nt)),o.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,o.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(o,"metalnessMap",u.metallicRoughnessTexture)),c.push(t.assignTexture(o,"roughnessMap",u.metallicRoughnessTexture))),a=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,o)})))}r.doubleSided===!0&&(o.side=vn);let h=r.alphaMode||Ld.OPAQUE;if(h===Ld.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,h===Ld.MASK&&(o.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&a!==ai&&(c.push(t.assignTexture(o,"normalMap",r.normalTexture)),o.normalScale=new Pe(1,1),r.normalTexture.scale!==void 0)){let u=r.normalTexture.scale;o.normalScale.set(u,u)}if(r.occlusionTexture!==void 0&&a!==ai&&(c.push(t.assignTexture(o,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&a!==ai){let u=r.emissiveFactor;o.emissive=new Ae().setRGB(u[0],u[1],u[2],Wt)}return r.emissiveTexture!==void 0&&a!==ai&&c.push(t.assignTexture(o,"emissiveMap",r.emissiveTexture,nt)),Promise.all(c).then(function(){let u=new a(o);return r.name&&(u.name=r.name),ds(u,r),t.associations.set(u,{materials:e}),r.extensions&&Cr(s,u,r),u})}createUniqueName(e){let t=wt.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,n=this.extensions,s=this.primitiveCache;function r(o){return n[vt.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(l){return R0(l,o,t)})}let a=[];for(let o=0,l=e.length;o<l;o++){let c=e[o],h=KE(c),u=s[h];if(u)a.push(u.promise);else{let d;c.extensions&&c.extensions[vt.KHR_DRACO_MESH_COMPRESSION]?d=r(c):d=R0(new Yt,c,t),s[h]={primitive:c,promise:d},a.push(d)}}return Promise.all(a)}loadMesh(e){let t=this,n=this.json,s=this.extensions,r=n.meshes[e],a=r.primitives,o=[];for(let l=0,c=a.length;l<c;l++){let h=a[l].material===void 0?qE(this.cache):this.getDependency("material",a[l].material);o.push(h)}return o.push(t.loadGeometries(a)),Promise.all(o).then(function(l){let c=l.slice(0,l.length-1),h=l[l.length-1],u=[];for(let p=0,g=h.length;p<g;p++){let v=h[p],m=a[p],f,x=c[p];if(m.mode===fi.TRIANGLES||m.mode===fi.TRIANGLE_STRIP||m.mode===fi.TRIANGLE_FAN||m.mode===void 0)f=r.isSkinnedMesh===!0?new zl(v,x):new Qt(v,x),f.isSkinnedMesh===!0&&f.normalizeSkinWeights(),m.mode===fi.TRIANGLE_STRIP?f.geometry=Cd(f.geometry,Ua):m.mode===fi.TRIANGLE_FAN&&(f.geometry=Cd(f.geometry,Or));else if(m.mode===fi.LINES)f=new ta(v,x);else if(m.mode===fi.LINE_STRIP)f=new Ms(v,x);else if(m.mode===fi.LINE_LOOP)f=new jl(v,x);else if(m.mode===fi.POINTS)f=new Jl(v,x);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(f.geometry.morphAttributes).length>0&&ZE(f,r),f.name=t.createUniqueName(r.name||"mesh_"+e),ds(f,r),m.extensions&&Cr(s,f,m),t.assignFinalMaterial(f),u.push(f)}for(let p=0,g=u.length;p<g;p++)t.associations.set(u[p],{meshes:e,primitives:p});if(u.length===1)return r.extensions&&Cr(s,u[0],r),u[0];let d=new pt;r.extensions&&Cr(s,d,r),t.associations.set(d,{meshes:e});for(let p=0,g=u.length;p<g;p++)d.add(u[p]);return d})}loadCamera(e){let t,n=this.json.cameras[e],s=n[n.type];if(!s){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new qt(Eh.radToDeg(s.yfov),s.aspectRatio||1,s.znear||1,s.zfar||2e6):n.type==="orthographic"&&(t=new oa(-s.xmag,s.xmag,s.ymag,-s.ymag,s.znear,s.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),ds(t,n),Promise.resolve(t)}loadSkin(e){let t=this.json.skins[e],n=[];for(let s=0,r=t.joints.length;s<r;s++)n.push(this._loadNodeShallow(t.joints[s]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(s){let r=s.pop(),a=s,o=[],l=[];for(let c=0,h=a.length;c<h;c++){let u=a[c];if(u){o.push(u);let d=new Ze;r!==null&&d.fromArray(r.array,c*16),l.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new $r(o,l)})}loadAnimation(e){let t=this.json,n=this,s=t.animations[e],r=s.name?s.name:"animation_"+e,a=[],o=[],l=[],c=[],h=[];for(let u=0,d=s.channels.length;u<d;u++){let p=s.channels[u],g=s.samplers[p.sampler],v=p.target,m=v.node,f=s.parameters!==void 0?s.parameters[g.input]:g.input,x=s.parameters!==void 0?s.parameters[g.output]:g.output;v.node!==void 0&&(a.push(this.getDependency("node",m)),o.push(this.getDependency("accessor",f)),l.push(this.getDependency("accessor",x)),c.push(g),h.push(v))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(l),Promise.all(c),Promise.all(h)]).then(function(u){let d=u[0],p=u[1],g=u[2],v=u[3],m=u[4],f=[];for(let x=0,A=d.length;x<A;x++){let y=d[x],T=p[x],M=g[x],C=v[x],R=m[x];if(y===void 0)continue;y.updateMatrix&&y.updateMatrix();let b=n._createAnimationTracks(y,T,M,C,R);if(b)for(let S=0;S<b.length;S++)f.push(b[S])}return new nc(r,void 0,f)})}createNodeMesh(e){let t=this.json,n=this,s=t.nodes[e];return s.mesh===void 0?null:n.getDependency("mesh",s.mesh).then(function(r){let a=n._getNodeRef(n.meshCache,s.mesh,r);return s.weights!==void 0&&a.traverse(function(o){if(!!o.isMesh)for(let l=0,c=s.weights.length;l<c;l++)o.morphTargetInfluences[l]=s.weights[l]}),a})}loadNode(e){let t=this.json,n=this,s=t.nodes[e],r=n._loadNodeShallow(e),a=[],o=s.children||[];for(let c=0,h=o.length;c<h;c++)a.push(n.getDependency("node",o[c]));let l=s.skin===void 0?Promise.resolve(null):n.getDependency("skin",s.skin);return Promise.all([r,Promise.all(a),l]).then(function(c){let h=c[0],u=c[1],d=c[2];d!==null&&h.traverse(function(p){!p.isSkinnedMesh||p.bind(d,$E)});for(let p=0,g=u.length;p<g;p++)h.add(u[p]);return h})}_loadNodeShallow(e){let t=this.json,n=this.extensions,s=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let r=t.nodes[e],a=r.name?s.createUniqueName(r.name):"",o=[],l=s._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&o.push(l),r.camera!==void 0&&o.push(s.getDependency("camera",r.camera).then(function(c){return s._getNodeRef(s.cameraCache,r.camera,c)})),s._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){o.push(c)}),this.nodeCache[e]=Promise.all(o).then(function(c){let h;if(r.isBone===!0?h=new Ya:c.length>1?h=new pt:c.length===1?h=c[0]:h=new Rt,h!==c[0])for(let u=0,d=c.length;u<d;u++)h.add(c[u]);if(r.name&&(h.userData.name=r.name,h.name=a),ds(h,r),r.extensions&&Cr(n,h,r),r.matrix!==void 0){let u=new Ze;u.fromArray(r.matrix),h.applyMatrix4(u)}else r.translation!==void 0&&h.position.fromArray(r.translation),r.rotation!==void 0&&h.quaternion.fromArray(r.rotation),r.scale!==void 0&&h.scale.fromArray(r.scale);return s.associations.has(h)||s.associations.set(h,{}),s.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){let t=this.extensions,n=this.json.scenes[e],s=this,r=new pt;n.name&&(r.name=s.createUniqueName(n.name)),ds(r,n),n.extensions&&Cr(t,r,n);let a=n.nodes||[],o=[];for(let l=0,c=a.length;l<c;l++)o.push(s.getDependency("node",a[l]));return Promise.all(o).then(function(l){for(let h=0,u=l.length;h<u;h++)r.add(l[h]);let c=h=>{let u=new Map;for(let[d,p]of s.associations)(d instanceof fn||d instanceof zt)&&u.set(d,p);return h.traverse(d=>{let p=s.associations.get(d);p!=null&&u.set(d,p)}),u};return s.associations=c(r),r})}_createAnimationTracks(e,t,n,s,r){let a=[],o=e.name?e.name:e.uuid,l=[];zs[r.path]===zs.weights?e.traverse(function(d){d.morphTargetInfluences&&l.push(d.name?d.name:d.uuid)}):l.push(o);let c;switch(zs[r.path]){case zs.weights:c=es;break;case zs.rotation:c=ts;break;case zs.position:case zs.scale:c=ns;break;default:switch(n.itemSize){case 1:c=es;break;case 2:case 3:default:c=ns;break}break}let h=s.interpolation!==void 0?QE[s.interpolation]:er,u=this._getArrayFromAccessor(n);for(let d=0,p=l.length;d<p;d++){let g=new c(l[d]+"."+zs[r.path],t.array,u,h);s.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(g),a.push(g)}return a}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let n=Ud(t.constructor),s=new Float32Array(t.length);for(let r=0,a=t.length;r<a;r++)s[r]=t[r]*n;t=s}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){let s=this instanceof ts?T0:Dd;return new s(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}};function eT(i,e,t){let n=e.attributes,s=new si;if(n.POSITION!==void 0){let o=t.json.accessors[n.POSITION],l=o.min,c=o.max;if(l!==void 0&&c!==void 0){if(s.set(new O(l[0],l[1],l[2]),new O(c[0],c[1],c[2])),o.normalized){let h=Ud(Sa[o.componentType]);s.min.multiplyScalar(h),s.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let r=e.targets;if(r!==void 0){let o=new O,l=new O;for(let c=0,h=r.length;c<h;c++){let u=r[c];if(u.POSITION!==void 0){let d=t.json.accessors[u.POSITION],p=d.min,g=d.max;if(p!==void 0&&g!==void 0){if(l.setX(Math.max(Math.abs(p[0]),Math.abs(g[0]))),l.setY(Math.max(Math.abs(p[1]),Math.abs(g[1]))),l.setZ(Math.max(Math.abs(p[2]),Math.abs(g[2]))),d.normalized){let v=Ud(Sa[d.componentType]);l.multiplyScalar(v)}o.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}s.expandByVector(o)}i.boundingBox=s;let a=new Yn;s.getCenter(a.center),a.radius=s.min.distanceTo(s.max)/2,i.boundingSphere=a}function R0(i,e,t){let n=e.attributes,s=[];function r(a,o){return t.getDependency("accessor",a).then(function(l){i.setAttribute(o,l)})}for(let a in n){let o=Id[a]||a.toLowerCase();o in i.attributes||s.push(r(n[a],o))}if(e.indices!==void 0&&!i.index){let a=t.getDependency("accessor",e.indices).then(function(o){i.setIndex(o)});s.push(a)}return mt.workingColorSpace!==Wt&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${mt.workingColorSpace}" not supported.`),ds(i,e),eT(i,e,t),Promise.all(s).then(function(){return e.targets!==void 0?jE(i,e.targets,t):i})}var Nd=new WeakMap,Bd=class extends Ei{constructor(e){super(e);this.decoderPath="",this.decoderConfig={},this.decoderBinary=null,this.decoderPending=null,this.workerLimit=4,this.workerPool=[],this.workerNextTaskID=1,this.workerSourceURL="",this.defaultAttributeIDs={position:"POSITION",normal:"NORMAL",color:"COLOR",uv:"TEX_COORD"},this.defaultAttributeTypes={position:"Float32Array",normal:"Float32Array",color:"Float32Array",uv:"Float32Array"}}setDecoderPath(e){return this.decoderPath=e,this}setDecoderConfig(e){return this.decoderConfig=e,this}setWorkerLimit(e){return this.workerLimit=e,this}load(e,t,n,s){let r=new Ds(this.manager);r.setPath(this.path),r.setResponseType("arraybuffer"),r.setRequestHeader(this.requestHeader),r.setWithCredentials(this.withCredentials),r.load(e,a=>{this.parse(a,t,s)},n,s)}parse(e,t,n=()=>{}){this.decodeDracoFile(e,t,null,null,nt,n).catch(n)}decodeDracoFile(e,t,n,s,r=Wt,a=()=>{}){let o={attributeIDs:n||this.defaultAttributeIDs,attributeTypes:s||this.defaultAttributeTypes,useUniqueIDs:!!n,vertexColorSpace:r};return this.decodeGeometry(e,o).then(t).catch(a)}decodeGeometry(e,t){let n=JSON.stringify(t);if(Nd.has(e)){let l=Nd.get(e);if(l.key===n)return l.promise;if(e.byteLength===0)throw new Error("THREE.DRACOLoader: Unable to re-decode a buffer with different settings. Buffer has already been transferred.")}let s,r=this.workerNextTaskID++,a=e.byteLength,o=this._getWorker(r,a).then(l=>(s=l,new Promise((c,h)=>{s._callbacks[r]={resolve:c,reject:h},s.postMessage({type:"decode",id:r,taskConfig:t,buffer:e},[e])}))).then(l=>this._createGeometry(l.geometry));return o.catch(()=>!0).then(()=>{s&&r&&this._releaseTask(s,r)}),Nd.set(e,{key:n,promise:o}),o}_createGeometry(e){let t=new Yt;e.index&&t.setIndex(new Gt(e.index.array,1));for(let n=0;n<e.attributes.length;n++){let s=e.attributes[n],r=s.name,a=s.array,o=s.itemSize,l=new Gt(a,o);r==="color"&&(this._assignVertexColorSpace(l,s.vertexColorSpace),l.normalized=!(a instanceof Float32Array)),t.setAttribute(r,l)}return t}_assignVertexColorSpace(e,t){if(t!==nt)return;let n=new Ae;for(let s=0,r=e.count;s<r;s++)n.fromBufferAttribute(e,s),mt.toWorkingColorSpace(n,nt),e.setXYZ(s,n.r,n.g,n.b)}_loadLibrary(e,t){let n=new Ds(this.manager);return n.setPath(this.decoderPath),n.setResponseType(t),n.setWithCredentials(this.withCredentials),new Promise((s,r)=>{n.load(e,s,void 0,r)})}preload(){return this._initDecoder(),this}_initDecoder(){if(this.decoderPending)return this.decoderPending;let e=typeof WebAssembly!="object"||this.decoderConfig.type==="js",t=[];return e?t.push(this._loadLibrary("draco_decoder.js","text")):(t.push(this._loadLibrary("draco_wasm_wrapper.js","text")),t.push(this._loadLibrary("draco_decoder.wasm","arraybuffer"))),this.decoderPending=Promise.all(t).then(n=>{let s=n[0];e||(this.decoderConfig.wasmBinary=n[1]);let r=tT.toString(),a=["/* draco decoder */",s,"","/* worker */",r.substring(r.indexOf("{")+1,r.lastIndexOf("}"))].join(`
`);this.workerSourceURL=URL.createObjectURL(new Blob([a]))}),this.decoderPending}_getWorker(e,t){return this._initDecoder().then(()=>{if(this.workerPool.length<this.workerLimit){let s=new Worker(this.workerSourceURL);s._callbacks={},s._taskCosts={},s._taskLoad=0,s.postMessage({type:"init",decoderConfig:this.decoderConfig}),s.onmessage=function(r){let a=r.data;switch(a.type){case"decode":s._callbacks[a.id].resolve(a);break;case"error":s._callbacks[a.id].reject(a);break;default:console.error('THREE.DRACOLoader: Unexpected message, "'+a.type+'"')}},this.workerPool.push(s)}else this.workerPool.sort(function(s,r){return s._taskLoad>r._taskLoad?-1:1});let n=this.workerPool[this.workerPool.length-1];return n._taskCosts[e]=t,n._taskLoad+=t,n})}_releaseTask(e,t){e._taskLoad-=e._taskCosts[t],delete e._callbacks[t],delete e._taskCosts[t]}debug(){console.log("Task load: ",this.workerPool.map(e=>e._taskLoad))}dispose(){for(let e=0;e<this.workerPool.length;++e)this.workerPool[e].terminate();return this.workerPool.length=0,this.workerSourceURL!==""&&URL.revokeObjectURL(this.workerSourceURL),this}};function tT(){let i,e;onmessage=function(a){let o=a.data;switch(o.type){case"init":i=o.decoderConfig,e=new Promise(function(h){i.onModuleLoaded=function(u){h({draco:u})},DracoDecoderModule(i)});break;case"decode":let l=o.buffer,c=o.taskConfig;e.then(h=>{let u=h.draco,d=new u.Decoder;try{let p=t(u,d,new Int8Array(l),c),g=p.attributes.map(v=>v.array.buffer);p.index&&g.push(p.index.array.buffer),self.postMessage({type:"decode",id:o.id,geometry:p},g)}catch(p){console.error(p),self.postMessage({type:"error",id:o.id,error:p.message})}finally{u.destroy(d)}});break}};function t(a,o,l,c){let h=c.attributeIDs,u=c.attributeTypes,d,p,g=o.GetEncodedGeometryType(l);if(g===a.TRIANGULAR_MESH)d=new a.Mesh,p=o.DecodeArrayToMesh(l,l.byteLength,d);else if(g===a.POINT_CLOUD)d=new a.PointCloud,p=o.DecodeArrayToPointCloud(l,l.byteLength,d);else throw new Error("THREE.DRACOLoader: Unexpected geometry type.");if(!p.ok()||d.ptr===0)throw new Error("THREE.DRACOLoader: Decoding failed: "+p.error_msg());let v={index:null,attributes:[]};for(let m in h){let f=self[u[m]],x,A;if(c.useUniqueIDs)A=h[m],x=o.GetAttributeByUniqueId(d,A);else{if(A=o.GetAttributeId(d,a[h[m]]),A===-1)continue;x=o.GetAttribute(d,A)}let y=s(a,o,d,m,f,x);m==="color"&&(y.vertexColorSpace=c.vertexColorSpace),v.attributes.push(y)}return g===a.TRIANGULAR_MESH&&(v.index=n(a,o,d)),a.destroy(d),v}function n(a,o,l){let h=l.num_faces()*3,u=h*4,d=a._malloc(u);o.GetTrianglesUInt32Array(l,u,d);let p=new Uint32Array(a.HEAPF32.buffer,d,h).slice();return a._free(d),{array:p,itemSize:1}}function s(a,o,l,c,h,u){let d=u.num_components(),g=l.num_points()*d,v=g*h.BYTES_PER_ELEMENT,m=r(a,h),f=a._malloc(v);o.GetAttributeDataArrayForAllPoints(l,u,m,v,f);let x=new h(a.HEAPF32.buffer,f,g).slice();return a._free(f),{name:c,array:x,itemSize:d}}function r(a,o){switch(o){case Float32Array:return a.DT_FLOAT32;case Int8Array:return a.DT_INT8;case Int16Array:return a.DT_INT16;case Int32Array:return a.DT_INT32;case Uint8Array:return a.DT_UINT8;case Uint16Array:return a.DT_UINT16;case Uint32Array:return a.DT_UINT32}}}var nT=new Ja,D0=new Rd(nT),P0=new Bd;P0.setDecoderPath("./assets/draco/");D0.setDRACOLoader(P0);function iT(i){return new Promise((e,t)=>{D0.load(i,n=>{let s=n.scene.children[0];s?e(s.geometry):t(new Error(`GLTF model ${i} doesn't contain a valid scene`))},void 0,t)})}async function I0(i){let e=Object.entries(i).map(([n,s])=>iT(s).then(r=>[n,r])),t=await Promise.all(e);return Object.fromEntries(t)}var L0=class{constructor(e){this.object3D=e,this._scale=1,this._opacity=1}handleVisibility(){let e=!(!this.opacity||!this._scale||!this.scaleX||!this.scaleY||!this.scaleZ);return this.object3D.visible=e,e}get x(){return this.object3D.position.x}set x(e){this.object3D.position.x=e}get y(){return this.object3D.position.y}set y(e){this.object3D.position.y=e}get z(){return this.object3D.position.z}set z(e){this.object3D.position.z=e}get rotateX(){return H.radToDeg(this.object3D.rotation.x)}set rotateX(e){this.object3D.rotation.x=H.degToRad(e)}get rotateY(){return H.radToDeg(this.object3D.rotation.y)}set rotateY(e){this.object3D.rotation.y=H.degToRad(e)}get rotateZ(){return H.radToDeg(this.object3D.rotation.z)}set rotateZ(e){this.object3D.rotation.z=H.degToRad(e)}get scale(){return this._scale}set scale(e){this._scale=e,this.object3D.scale.setScalar(e),this.handleVisibility()}get scaleX(){return this.object3D.scale.x}set scaleX(e){this.object3D.scale.x=e,this.handleVisibility()}get scaleY(){return this.object3D.scale.y}set scaleY(e){this.object3D.scale.y=e,this.handleVisibility()}get scaleZ(){return this.object3D.scale.z}set scaleZ(e){this.object3D.scale.z=e,this.handleVisibility()}get opacity(){return this._opacity}set opacity(e){this._opacity=e;let t=this.object3D.material;if(t)if(Array.isArray(t))for(let n=0,s=t.length;n<s;n++)t[n].opacity=e;else t.opacity=e;this.handleVisibility()}},Mt=i=>new L0(i);var Od=class{constructor(e,t,n){this.geometries=null,this.materials=e,this.scope=t,this.stage=n,this.raycaster=new cc,this.root=Mt(new pt),this.rootWorldPostion=new O,this.easesObjects=[],this.caseFrontVentObjects=[],this.caseBackVentObjects=[],this.case01Objects=[],this.case02FrontObjects=[],this.case02BackObjects=[],this.labels=[],this.modulesObjects={animate:Mt(new pt),draggable:Mt(new pt),scroll:Mt(new pt),engine:Mt(new pt),scope:Mt(new pt),timer:Mt(new pt),stagger:Mt(new pt),spring:Mt(new pt),svg:Mt(new pt),timeline:Mt(new pt),renderer:Mt(new pt),waapi:Mt(new pt),case01:Mt(new pt),case02:Mt(new pt),case02Back:Mt(new pt)},this.modulesObjects.waapi.z=2.6,this.modulesObjects.waapi.scale=.8,this.createLabel("waapi",this.modulesObjects.waapi,-1,0,0,"theme-color-11"),this.modulesObjects.timeline.z=2.05,this.createLabel("timeline",this.modulesObjects.timeline,-1,0,0,"theme-color-3"),this.modulesObjects.stagger.z=1.52,this.createLabel("stagger",this.modulesObjects.stagger,-1,0,0,"theme-color-8"),this.modulesObjects.svg.z=1.16,this.createLabel("svg",this.modulesObjects.svg,-1,0,0,"theme-color-9"),this.modulesObjects.spring.z=.99,this.createLabel("spring",this.modulesObjects.spring,-1,0,0,"theme-color-10"),this.modulesObjects.animate.z=0,this.createLabel("animation",this.modulesObjects.animate,-1,0,0,"theme-color-2"),this.modulesObjects.timer.z=.6,this.createLabel("timer",this.modulesObjects.timer,1,0,0,"theme-color-1"),this.createLabel("easings",this.modulesObjects.animate,1,0,0,"theme-color-0"),this.modulesObjects.draggable.z=-.62,this.createLabel("draggable",this.modulesObjects.draggable,1,0,0,"theme-color-5"),this.modulesObjects.scroll.z=-1.05,this.createLabel("scroll",this.modulesObjects.scroll,1,0,0,"theme-color-6"),this.modulesObjects.engine.z=-1.85,this.modulesObjects.scope.z=-1.81,this.createLabel("scope",this.modulesObjects.scope,1,0,0,"theme-color-7"),this.modulesObjects.renderer.z=2.7,this.modulesObjects.renderer.scale=.98,this.modulesObjects.case01.z=1.8,this.modulesObjects.case02.z=.35,this.modulesObjects.case02Back.z=-1.78;for(let s in this.modulesObjects)this.root.object3D.add(this.modulesObjects[s].object3D);for(let s=0,r=13;s<r;s++){let a=Mt(new pt);a.dataset={index:0},this.easesObjects.push(a)}for(let s=0,r=15;s<r;s++){let a=Mt(new pt),o=Mt(new pt);this.caseFrontVentObjects.push(a),this.caseBackVentObjects.push(o),this.modulesObjects.case02.object3D.add(a.object3D),this.modulesObjects.case02Back.object3D.add(o.object3D)}for(let s=0,r=4;s<r;s++){let a=Mt(new pt),o=Mt(new pt),l=Mt(new pt);this.case01Objects.push(a),this.case02FrontObjects.push(o),this.case02BackObjects.push(l),this.modulesObjects.case01.object3D.add(a.object3D),this.modulesObjects.case02.object3D.add(o.object3D),this.modulesObjects.case02Back.object3D.add(l.object3D)}this.createMeshes()}createLabel(e,t,n=0,s=0,r=0,a){let o=document.createElement("li"),l=document.createElement("div"),c=document.createElement("div"),h=document.querySelector(".toolbox-labels-left"),u=document.querySelector(".toolbox-labels-right"),d=n>0;(d?h:u).appendChild(o),c.classList.add("module-label-text"),l.classList.add("module-label-point"),o.innerHTML=e,c.innerHTML=e,c.classList.add("module-"+e),a&&(o.classList.add(a),c.classList.add(a));let g=Mt(new zc(l)),v=Mt(new zc(c));return H.set(g,{x:n,y:s,z:r}),H.set(v,{x:0,y:1.25,z:r}),this.labels.push(g),t.object3D.add(g.object3D),t.object3D.add(v.object3D),this.stage.labelsRenderer.domElement.appendChild(l),this.stage.labelsRenderer.domElement.appendChild(c),this.stage.lines.createLine(o,l,!d,a),g}createMesh(e,t,n){let s=new Qt(this.geometries[t],this.materials.outlineMaterial),r=Mt(s);return n&&H.set(r,n),e.object3D.add(s),r}async loadGeometries(){this.geometries=await I0({animate01:"assets/models/module-animate-01.glb",easing01:"assets/models/module-easing-01.glb",draggable01:"assets/models/module-draggable-01.glb",draggable02:"assets/models/module-draggable-02.glb",scroll01:"assets/models/module-scroll-01.glb",engine01:"assets/models/module-engine-01.glb",scope01:"assets/models/module-scope-01.glb",timer01:"assets/models/module-timer-01.glb",timer02:"assets/models/module-timer-02.glb",timer03:"assets/models/module-timer-03.glb",timer04:"assets/models/module-timer-04.glb",timer05:"assets/models/module-timer-05.glb",stagger01:"assets/models/module-stagger-01.glb",stagger02:"assets/models/module-stagger-02.glb",spring01:"assets/models/module-spring-01.glb",svg01:"assets/models/module-svg-01.glb",timeline01:"assets/models/module-timeline-01.glb",timeline02:"assets/models/module-timeline-02.glb",renderer01:"assets/models/module-renderer-01.glb",waapi01:"assets/models/module-waapi-01.glb",shield01:"assets/models/module-shield-01.glb",shield02:"assets/models/module-shield-02.glb"})}async createMeshes(){await this.loadGeometries(),this.createMesh(this.modulesObjects.animate,"animate01");let e=Mt(new pt);this.modulesObjects.animate.object3D.add(e.object3D);let t=[],n=[];for(let le=0,V=this.easesObjects.length;le<V;le++){let j=Mt(new pt),ie=this.easesObjects[le];t.push(j),e.object3D.add(j.object3D),j.object3D.add(ie.object3D),n.push(this.createMesh(ie,"easing01"))}H.set(t,{x:me(.044),rotateZ:me([20,-20])}),H.set(n,{y:me([-.07,-.11],{from:"center",ease:"in(2)"})}),Ke().add(n,{y:[{to:"+=.03",ease:"inQuad",duration:500},{to:"-=.03",ease:"outQuad",duration:1e3}],loop:!0,ease:"inOutQuad"},me(200)),e.z=0,e.x=.75,e.y=.65,e.rotateZ=-63;let s=[];this.createMesh(this.modulesObjects.draggable,"draggable01");for(let le=0,V=5;le<V;le++){let j=Mt(new pt);s.push(j),this.modulesObjects.draggable.object3D.add(j.object3D),this.createMesh(j,"draggable02",{y:.92})}Ke({defaults:{loop:!0}}).add(s,{rotateZ:[me([-90,0]),me([-450,-360])],duration:3e3,ease:"inOut(4)"},me(160)).init();let r=this.createMesh(this.modulesObjects.scroll,"scroll01");Re(r,{rotateZ:-360,ease:"linear",duration:32e3,loop:!0});let a=this.createMesh(this.modulesObjects.scope,"scope01",{scale:.98});Re(a,{rotateZ:-360,ease:"linear",duration:64e3,loop:!0});let o=this.createMesh(this.modulesObjects.engine,"engine01");Re(o,{rotateZ:-360,ease:"linear",duration:64e3,loop:!0});let l=this.createMesh(this.modulesObjects.timer,"timer01",{z:.075}),c=this.createMesh(this.modulesObjects.timer,"timer02",{z:-.08}),h=this.createMesh(this.modulesObjects.timer,"timer03",{z:.16,x:-.225,y:.5}),u=this.createMesh(this.modulesObjects.timer,"timer04",{z:.16,x:.5,y:.4}),d=this.createMesh(this.modulesObjects.timer,"timer05",{z:.26,scale:.95});Ke({defaults:{loop:!0}}).add(l,{rotateZ:function(){let le=[];for(let V=0;V<36;V++)le.push({to:-(360/36)*V,duration:1e3});return le}(),ease:"outElastic(.2, 1)"},0).add(c,{rotateZ:function(){let le=[];for(let V=0;V<24;V++)le.push({to:-(360/24)*V,duration:1e3});return le}(),ease:"linear"},0).add(h,{rotateZ:360,ease:"linear",duration:7e3},0).add(u,{rotateZ:-360,ease:"linear",duration:6e3},0);let p=this.createMesh(this.modulesObjects.spring,"spring01");Re(p,{rotateZ:[0,-90,,-180,-270,-360],ease:wi({stiffness:10,damping:3}),loop:!0});let g=this.modulesObjects.stagger,v=[];for(let le=0;le<4;le++)v.push(this.createMesh(g,"stagger02",{z:-.1*le+.06}));Ke().add(v,{z:[{to:"+=.08",ease:"inOut(2)",duration:1e3},{to:"-=.08",ease:"inOut(2)",duration:800}],loop:!0},me(200,{from:"last"})),this.createMesh(g,"stagger01",0);let m=69,f=new ia(.9,.9,.1,m,1,!1).toNonIndexed(),x=f.getAttribute("position"),A=[],y=[];for(let le=0;le<m;le++){let V=le%2;y[le]=new Ae().setHSL(H.random(V?.25:.55,V?.45:.75,2),1,.5)}let T=new Ae().setHSL(.1,1,.5),M=new Ae().setHSL(.9,1,.5);for(let le=0;le<x.count;le+=3){let V=f.attributes.normal.getY(le),j;if(Math.abs(V)>.9)j=V>0?T:M;else{let ie=x.array[le*3],ue=x.array[le*3+2],Ie=Math.atan2(ue,ie),De=Math.floor((Ie+Math.PI)/(Math.PI*2)*m);j=y[De]||y[0]}for(let ie=0;ie<3;ie++)A.push(j.r,j.g,j.b)}f.setAttribute("color",new Xt(A,3));let C=Mt(new Qt(f,this.materials.outlineMaterial));this.modulesObjects.svg.object3D.add(C.object3D),this.createMesh(this.modulesObjects.svg,"svg01",0),C.rotateX=90,Re(C,{rotateY:-360,loop:!0,duration:1e4,ease:"linear"});let R={progress:0,segments:2,odd:.5,even:.1,positions:f.attributes.position.array.slice(),radius:{x:[],z:[]},newRadius:{x:[],z:[]}};function b(){let le={x:[],z:[]};for(let V=0;V<R.positions.length;V+=3){let j=R.positions[V],ie=R.positions[V+2],Ie=(Math.atan2(ie,j)+Math.PI)/(Math.PI*2),De=R.segments,He=H.interpolate(R.even,R.odd,(Math.sin(Ie*Math.PI*De)+1)/2),$e=Math.sqrt(j*j+ie*ie);if($e>0){let We=$e-He;le.x[V]=j/$e*We,le.z[V]=ie/$e*We}else le.x[V]=j,le.z[V]=ie}return le}function S(){let le=R.p,V=R.radius,j=R.newRadius;for(let ie=0;ie<R.positions.length;ie+=3)f.attributes.position.array[ie]=H.interpolate(V.x[ie],j.x[ie],le),f.attributes.position.array[ie+2]=H.interpolate(V.z[ie],j.z[ie],le);f.attributes.position.needsUpdate=!0}Ke({loop:!0,onUpdate:()=>S()}).call(()=>{R.radius=b(),R.segments=H.random(4,32,0),R.odd=H.random(0,.5,2),R.even=H.random(0,.2,2),R.newRadius=b()}).add(R,{p:[0,1],duration:750,ease:"inOutQuad"});let D=this.modulesObjects.timeline,N=[],U=Math.PI*2/8,B=.68;for(let le=0;le<8;le++){let V=U*le,j=Math.cos(V)*B,ie=Math.sin(V)*B;N.push(this.createMesh(D,"timeline02",{x:j,y:ie,z:-.35,rotateZ:-90+le*45}))}Ke().add(N,{z:[{to:"+=.15",ease:"inOut(2)",duration:1e3},{to:"-=.15",ease:"inOut(2)",duration:800}],loop:!0},me(200,{from:"last"})),this.createMesh(D,"timeline01"),this.createMesh(this.modulesObjects.renderer,"renderer01",{z:.025}),this.createMesh(this.modulesObjects.waapi,"waapi01",{z:0,y:0,x:0});let W=.541,G=.925,I=1,P=0;this.createMesh(this.case01Objects[0],"shield01",{scale:G,scaleZ:I,x:-W,y:W,z:P,rotateZ:0}),this.createMesh(this.case01Objects[2],"shield01",{scale:G,scaleZ:I,x:W,y:-W,z:P,rotateZ:-180}),this.createMesh(this.case01Objects[3],"shield01",{scale:G,scaleZ:I,x:-W,y:-W,z:P,rotateZ:-270});let L=.585,J=.715,ae=[];this.createMesh(this.case02FrontObjects[0],"shield02",{x:-L,y:L,z:J,rotateZ:0}),this.createMesh(this.case02FrontObjects[1],"shield02",{x:L,y:-L,z:J,rotateZ:-180}),this.createMesh(this.case02FrontObjects[2],"shield02",{x:-L,y:-L,z:J,rotateZ:-270});for(let le=0;le<this.caseFrontVentObjects.length;le++)ae.push(this.createMesh(this.caseFrontVentObjects[le],"shield02",{x:L,y:L,z:J,rotateZ:-90,scaleZ:.025}));H.set(ae,{z:me([0,1.37],{start:.03})});let ve=[];this.createMesh(this.case02BackObjects[0],"shield02",{x:-L,y:L,z:J,rotateZ:0}),this.createMesh(this.case02BackObjects[1],"shield02",{x:L,y:-L,z:J,rotateZ:-180}),this.createMesh(this.case02BackObjects[2],"shield02",{x:-L,y:-L,z:J,rotateZ:-270});for(let le=0;le<this.caseBackVentObjects.length;le++)ve.push(this.createMesh(this.caseBackVentObjects[le],"shield02",{x:L,y:L,z:J,rotateZ:-90,scaleZ:.025}));H.set(ve,{z:me([0,1.37],{start:.03})})}};var Rr=class{constructor(e){this.$canvas=document.createElement("canvas"),this.$parent=e,this.$parent.appendChild(this.$canvas),this.scale=2;let t=this.$parent.offsetWidth,n=this.$parent.offsetHeight;this.$canvas.style.width=`${t}px`,this.$canvas.style.height=`${n}px`,this.$canvas.width=t*this.scale,this.$canvas.height=n*this.scale,this.width=t,this.height=n,this.ctx=this.$canvas.getContext("2d"),this.ctx.scale(this.scale,this.scale),this.shapes=[],this.circles=[],this.lines=[],this.shapesLength=0}updateDimensions(){let e=this.$parent.offsetWidth,t=this.$parent.offsetHeight;this.$canvas.style.width=`${e}px`,this.$canvas.style.height=`${t}px`,this.$canvas.width=e*this.scale,this.$canvas.height=t*this.scale,this.width=e,this.height=t,this.ctx.scale(this.scale,this.scale)}addCircle(e,t,n={}){let s={isCircle:!0,radius:e,color:t,x:n.x||0,y:n.y||0,scale:n.scale!==void 0?n.scale:1,scaleX:n.scaleX!==void 0?n.scaleX:1,scaleY:n.scaleY!==void 0?n.scaleY:1,opacity:n.opacity!==void 0?n.opacity:1};return this.shapes.push(s),this.circles.push(s),this.shapesLength++,s}addLine(e,t,n,s,r,a,o={}){let l={isLine:!0,x1:e,y1:t,x2:n,y2:s,color:a,x:o.x||0,y:o.y||0,lineWidth:r||1,scale:o.scale!==void 0?o.scale:1,scaleX:o.scaleX!==void 0?o.scaleX:1,scaleY:o.scaleY!==void 0?o.scaleY:1,opacity:o.opacity!==void 0?o.opacity:1};return this.shapes.push(l),this.lines.push(l),this.shapesLength++,l}render(){let e=this.ctx;e.clearRect(0,0,this.width,this.height);for(let t=0;t<this.shapesLength;t++){let n=this.shapes[t];if(e.save(),e.globalAlpha=H.clamp(n.opacity,0,1),n.isCircle)e.translate(n.x,n.y),e.scale(n.scale*n.scaleX,n.scale*n.scaleY),e.beginPath(),e.arc(0,0,n.radius,0,Math.PI*2),e.fillStyle=n.color,e.fill();else if(n.isLine){e.translate(n.x,n.y);let s=(n.x1+n.x2)/2,r=(n.y1+n.y2)/2;e.translate(s,r),e.scale(n.scale*n.scaleX,n.scale*n.scaleY),e.translate(-s,-r),e.beginPath(),e.moveTo(n.x1,n.y1),e.lineTo(n.x2,n.y2),e.strokeStyle=n.color,e.lineWidth=n.lineWidth,e.stroke()}e.restore()}}};function ba(i,e="word",t=null){if(!i)return;let n=i.innerHTML,s=document.createElement("div");s.innerHTML=n;let r=[],a=document.createTreeWalker(s,NodeFilter.SHOW_TEXT,null),o;for(;o=a.nextNode();)r.push(o);r.forEach(l=>{let c=l.parentNode,h=l.nodeValue;if(!h.trim())return;let u=document.createDocumentFragment();h.split(/(\s+)/).forEach(p=>{if(!!p)if(p.trim()==="")u.appendChild(document.createTextNode(p));else{let g=document.createElement("span");g.className=e,g.style.display="inline-block",t?Array.from(p).forEach(v=>{let m=document.createElement("span");m.className=t,m.style.display="inline-block",m.textContent=v,g.appendChild(m)}):g.textContent=p,u.appendChild(g)}}),c.replaceChild(u,l)}),i.innerHTML=s.innerHTML}function kd(i,e=!1){let[t]=H.$(i);return ba(t,"word",e?"char":null),Ke({autoplay:!1}).add(t.querySelectorAll(e?".char":".word"),{x:[".35em",0],opacity:[0,1],duration:1e3,delay:me(25,{ease:"outIn(2)"}),ease:"outQuint"}).init()}var Ea=class{constructor(e){this.$el=document.createElement("button"),this.$el.setAttribute("title","Copy"),this.$el.classList.add("copy-button"),this.$el.classList.add("ui-input"),this.$el.innerHTML=`<svg class="icon" width="24" height="24" viewBox="0 0 24 24">
  <g fill="none" fill-rule="evenodd">
    <path fill="currentColor" fill-rule="nonzero" d="M17,5.25 C17.9664983,5.25 18.75,6.03350169 18.75,7 L18.75,13 C18.75,13.9664983 17.9664983,14.75 17,14.75 L14.75,14.75 L14.75,17 C14.75,17.9664983 13.9664983,18.75 13,18.75 L7,18.75 C6.03350169,18.75 5.25,17.9664983 5.25,17 L5.25,11 C5.25,10.0335017 6.03350169,9.25 7,9.25 L9.25,9.25 L9.25,7 C9.25,6.03350169 10.0335017,5.25 11,5.25 L17,5.25 Z M9.25,10.75 L7,10.75 C6.86192881,10.75 6.75,10.8619288 6.75,11 L6.75,17 C6.75,17.1380712 6.86192881,17.25 7,17.25 L13,17.25 C13.1380712,17.25 13.25,17.1380712 13.25,17 L13.25,14.75 L11,14.75 C10.0335017,14.75 9.25,13.9664983 9.25,13 L9.25,10.75 Z M17,6.75 L11,6.75 C10.8619288,6.75 10.75,6.86192881 10.75,7 L10.75,13 C10.75,13.1380712 10.8619288,13.25 11,13.25 L17,13.25 C17.1380712,13.25 17.25,13.1380712 17.25,13 L17.25,7 C17.25,6.86192881 17.1380712,6.75 17,6.75 Z"/>
    <polyline stroke="var(--hex-green-1)" stroke-width="1.75" points="5 12 10 17 19 8"/>
  </g>
</svg>`,this.$copyIcon=this.$el.querySelector("path"),this.OKLine=$n.createDrawable(this.$el.querySelector("polyline")),this.data=e,this.$el.addEventListener("click",this,!1)}handleClick(){navigator.clipboard.writeText(this.data),Ke({onPause:()=>this.$el.blur()}).add(this.$copyIcon,{scale:0,duration:350,ease:"out(3)"}).add(this.OKLine,{draw:["0 0","0 1"],duration:350,ease:"out(4)",onComplete:()=>this.$el.blur()},"<-=200").add(this.OKLine,{draw:"1 1",duration:400,ease:"inOut(4)"},"+=400").add(this.$copyIcon,{scale:1,duration:350,ease:"out(3)"},"<<+=250")}handleEvent(e){e.type==="click"&&this.handleClick()}};var iv=af(nv());var Ri=iv.default;var sv="[A-Za-z$_][0-9A-Za-z$_]*",QT=["as","in","of","if","for","while","finally","var","new","function","do","return","void","else","break","catch","instanceof","with","throw","case","default","try","switch","continue","typeof","delete","let","yield","const","class","debugger","async","await","static","import","from","export","extends"],qT=["true","false","null","undefined","NaN","Infinity"],rv=["Object","Function","Boolean","Symbol","Math","Date","Number","BigInt","String","RegExp","Array","Float32Array","Float64Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Int32Array","Uint16Array","Uint32Array","BigInt64Array","BigUint64Array","Set","Map","WeakSet","WeakMap","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","Promise","Generator","GeneratorFunction","AsyncFunction","Reflect","Proxy","Intl","WebAssembly"],av=["Error","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError"],ov=["setInterval","setTimeout","clearInterval","clearTimeout","require","exports","eval","isFinite","isNaN","parseFloat","parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","unescape"],jT=["arguments","this","super","console","window","document","localStorage","sessionStorage","module","global"],ZT=[].concat(ov,rv,av);function Xc(i){let e=i.regex,t=(P,{after:L})=>{let J="</"+P[0].slice(1);return P.input.indexOf(J,L)!==-1},n=sv,s={begin:"<>",end:"</>"},r=/<[A-Za-z0-9\\._:-]+\s*\/>/,a={begin:/<[A-Za-z0-9\\._:-]+/,end:/\/[A-Za-z0-9\\._:-]+>|\/>/,isTrulyOpeningTag:(P,L)=>{let J=P[0].length+P.index,ae=P.input[J];if(ae==="<"||ae===","){L.ignoreMatch();return}ae===">"&&(t(P,{after:J})||L.ignoreMatch());let ve,le=P.input.substring(J);if(ve=le.match(/^\s*=/)){L.ignoreMatch();return}if((ve=le.match(/^\s+extends\s+/))&&ve.index===0){L.ignoreMatch();return}}},o={$pattern:sv,keyword:QT,literal:qT,built_in:ZT,"variable.language":jT},l="[0-9](_?[0-9])*",c=`\\.(${l})`,h="0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*",u={className:"number",variants:[{begin:`(\\b(${h})((${c})|\\.)?|(${c}))[eE][+-]?(${l})\\b`},{begin:`\\b(${h})\\b((${c})\\b|\\.)?|(${c})\\b`},{begin:"\\b(0|[1-9](_?[0-9])*)n\\b"},{begin:"\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"},{begin:"\\b0[bB][0-1](_?[0-1])*n?\\b"},{begin:"\\b0[oO][0-7](_?[0-7])*n?\\b"},{begin:"\\b0[0-7]+n?\\b"}],relevance:0},d={className:"subst",begin:"\\$\\{",end:"\\}",keywords:o,contains:[]},p={begin:"html`",end:"",starts:{end:"`",returnEnd:!1,contains:[i.BACKSLASH_ESCAPE,d],subLanguage:"xml"}},g={begin:"css`",end:"",starts:{end:"`",returnEnd:!1,contains:[i.BACKSLASH_ESCAPE,d],subLanguage:"css"}},v={begin:"gql`",end:"",starts:{end:"`",returnEnd:!1,contains:[i.BACKSLASH_ESCAPE,d],subLanguage:"graphql"}},m={className:"string",begin:"`",end:"`",contains:[i.BACKSLASH_ESCAPE,d]},f=i.COMMENT(/\/\*\*(?!\/)/,"\\*/",{relevance:0,contains:[{begin:"(?=@[A-Za-z]+)",relevance:0,contains:[{className:"doctag",begin:"@[A-Za-z]+"},{className:"type",begin:"\\{",end:"\\}",excludeEnd:!0,excludeBegin:!0,relevance:0},{className:"variable",begin:n+"(?=\\s*(-)|$)",endsParent:!0,relevance:0},{begin:/(?=[^\n])\s/,relevance:0}]}]}),x={className:"comment",variants:[f,i.C_BLOCK_COMMENT_MODE,i.C_LINE_COMMENT_MODE]},A=[i.APOS_STRING_MODE,i.QUOTE_STRING_MODE,p,g,v,m,{match:/\$\d+/},u];d.contains=A.concat({begin:/\{/,end:/\}/,keywords:o,contains:["self"].concat(A)});let y=[].concat(x,d.contains),T=y.concat([{begin:/\(/,end:/\)/,keywords:o,contains:["self"].concat(y)}]),M={className:"params",begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:o,contains:T},C={variants:[{match:[/class/,/\s+/,n,/\s+/,/extends/,/\s+/,e.concat(n,"(",e.concat(/\./,n),")*")],scope:{1:"keyword",3:"title.class",5:"keyword",7:"title.class.inherited"}},{match:[/class/,/\s+/,n],scope:{1:"keyword",3:"title.class"}}]},R={relevance:0,match:e.either(/\bJSON/,/\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,/\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,/\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),className:"title.class",keywords:{_:[...rv,...av]}},b={label:"use_strict",className:"meta",relevance:10,begin:/^\s*['"]use (strict|asm)['"]/},S={variants:[{match:[/function/,/\s+/,n,/(?=\s*\()/]},{match:[/function/,/\s*(?=\()/]}],className:{1:"keyword",3:"title.function"},label:"func.def",contains:[M],illegal:/%/},D={relevance:0,match:/\b[A-Z][A-Z_0-9]+\b/,className:"variable.constant"};function N(P){return e.concat("(?!",P.join("|"),")")}let U={match:e.concat(/\b/,N([...ov,"super","import"]),n,e.lookahead(/\(/)),className:"title.function",relevance:0},B={begin:e.concat(/\./,e.lookahead(e.concat(n,/(?![0-9A-Za-z$_(])/))),end:n,excludeBegin:!0,keywords:"prototype",className:"property",relevance:0},W={match:[/get|set/,/\s+/,n,/(?=\()/],className:{1:"keyword",3:"title.function"},contains:[{begin:/\(\)/},M]},G="(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|"+i.UNDERSCORE_IDENT_RE+")\\s*=>",I={match:[/const|var|let/,/\s+/,n,/\s*/,/=\s*/,/(async\s*)?/,e.lookahead(G)],keywords:"async",className:{1:"keyword",3:"title.function"},contains:[M]};return{name:"JavaScript",aliases:["js","jsx","mjs","cjs"],keywords:o,exports:{PARAMS_CONTAINS:T,CLASS_REFERENCE:R},illegal:/#(?![$_A-z])/,contains:[i.SHEBANG({label:"shebang",binary:"node",relevance:5}),b,i.APOS_STRING_MODE,i.QUOTE_STRING_MODE,p,g,v,m,x,{match:/\$\d+/},u,R,{className:"attr",begin:n+e.lookahead(":"),relevance:0},I,{begin:"("+i.RE_STARTERS_RE+"|\\b(case|return|throw)\\b)\\s*",keywords:"return throw case",relevance:0,contains:[x,i.REGEXP_MODE,{className:"function",begin:G,returnBegin:!0,end:"\\s*=>",contains:[{className:"params",variants:[{begin:i.UNDERSCORE_IDENT_RE,relevance:0},{className:null,begin:/\(\s*\)/,skip:!0},{begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:o,contains:T}]}]},{begin:/,/,relevance:0},{match:/\s+/,relevance:0},{variants:[{begin:s.begin,end:s.end},{match:r},{begin:a.begin,"on:begin":a.isTrulyOpeningTag,end:a.end}],subLanguage:"xml",contains:[{begin:a.begin,end:a.end,skip:!0,contains:["self"]}]}]},S,{beginKeywords:"while if switch catch for"},{begin:"\\b(?!function)"+i.UNDERSCORE_IDENT_RE+"\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",returnBegin:!0,label:"func.def",contains:[M,i.inherit(i.TITLE_MODE,{begin:n,className:"title.function"})]},{match:/\.\.\./,relevance:0},B,{match:"\\$"+n,relevance:0},{match:[/\bconstructor(?=\s*\()/],className:{1:"title.function"},contains:[M]},U,D,C,W,{match:/\$[(.]/}]}}var fs=class{constructor(){this.syncable=null}onEnter(){}onLeave(){}};function lv(i){let e={},t=wi(),n="out(3)",s=e.intuitive=new fs,r=H.$("#intuitive-demo .square");H.set(r,{rotate:0,scale:.001});let a=Re(r,{rotate:90,loop:!0,duration:750,ease:"inOutExpo",autoplay:!1});s.onEnter=()=>{Re(r,{scale:1,ease:t}),a.restart()},s.onLeave=()=>{Re(r,{scale:0,duration:250,ease:n}),a.pause()};let o=e.composition=new fs,l=H.$("#additive-demo .shape"),c=["inOutQuad","inOutSine","inOutExpo",wi()];H.set(l,{x:0,y:0,rotate:0,scale:0});let h=[],u=0,d=(I,P,L)=>{let J=H.random(500,2e3),ae={duration:J,ease:H.randomPick(c),composition:"none"};ae[P]=L,h[u++]=Re(I,ae),h[u++]=Bn({duration:J*.8,onComplete:()=>d(I,P,L)}),u>640&&(u=0)};o.onEnter=()=>{l.forEach((I,P)=>{d(I,"x",()=>H.random(-90,90)),d(I,"y",()=>H.random(-90,90)),d(I,"rotate",()=>H.random(-90,90)),d(I,"scale",()=>H.random(.05,.4,4))})},o.onLeave=()=>{Re(l,{scale:0,duration:250,ease:n}),h.forEach(I=>I.cancel()),h.length=0,u=0};let p=e.svgUtils=new fs,g=H.$("#drawable-demo .svg-track"),v=$n.createDrawable("#drawable-demo .svg-track-higlight path"),m=$n.createDrawable("#drawable-demo .svg-track-bg path");H.set(g,{rotateX:90,rotateZ:0,z:0,scale:0});let f=Ke({autoplay:!1}).add("#drawable-demo .svg-car",{ease:"linear",duration:1e4,loop:!0,...$n.createMotionPath("#drawable-demo .svg-track-bg path")},0).add(v,{draw:"0 1",ease:"linear",duration:1e4,loop:!0},0).add(g,{rotateZ:360,ease:"linear",duration:2e4,loop:!0},0);p.onEnter=()=>{Re(m,{draw:["0 0","0 1"],duration:1e3,ease:"inOutExpo"}),Re(g,{rotateX:{to:45,duration:1e3},scale:[.8,1],z:(I,P)=>P?10:5,ease:"out(3)",duration:350}),f.restart()},p.onLeave=()=>{Re(g,{rotateX:90,z:0,scale:.8,ease:"inOut(3)",duration:250}),f.pause()};let x=e.clockwork=new fs,A=Ke({autoplay:!1}).set(".clock .tick:last-child",{opacity:0},0).add(".clock .tick:not(:last-child)",{y:(I,P)=>P%12?"-=6":"-=12",opacity:{to:1,duration:0,ease:"linear",delay:45},scaleX:2,ease:"inOutQuad",duration:50,loop:1,alternate:!0,composition:"none"},me(10)).set(".clock .tick:first-child",{opacity:0},"<-=90").set(".clock .tick:last-child",{opacity:.5},"<<").add($n.createDrawable(".clock-grid .circle-grid-drawable path"),{draw:["1 1","0 1"],strokeWidth:["20","5"],opacity:[1,.15],ease:"linear",duration:I=>+I.getAttribute("id").split("_")[1]*1920,delay:me(240)},50).add(".timeline-playhead",{rotate:360,ease:"linear",duration:1920},50).init();x.syncable=A,x.onEnter=()=>{Re(".tick",{scaleY:(I,P)=>P%12?1.5:2.25,duration:350})},x.onLeave=()=>{Re(".tick",{scaleY:1,duration:250})};let y=e.staggering=new fs,T=[13,13],M=200;H.set(i.circles,{opacity:me([0,1],{grid:T,from:"center",reversed:!0,modifier:I=>H.round(I+.25,0)?1:0})});let C=Ke({autoplay:!1,onUpdate:()=>i.render()}).add(i.circles,{scale:[1,me([15,1],{grid:T,from:"center"}),{to:1,duration:500}],opacity:[{to:["-=.8","+=.8"]},{to:"-=.8",delay:900}],x:[{to:me([M,M+110],{grid:T,from:"center",axis:"x"}),duration:500},{to:me([M,M+100],{grid:T,from:"center",axis:"x"}),duration:1e3}],y:[{to:me([M,M+110],{grid:T,from:"center",axis:"y"}),duration:500},{to:me([M,M+100],{grid:T,from:"center",axis:"y"}),duration:1e3}],duration:750,loop:!0,ease:"inOutQuad"},me(200,{grid:T,from:"center",ease:"in",start:50})).init();y.onEnter=()=>{C.restart()},y.onLeave=()=>{C.pause()};let R=e.draggable=new fs,b=H.$("#draggable-demo .draggable"),S=wi({stiffness:120,damping:6}),D=us(b,{container:[0,0,0,0],containerFriction:.5,releaseContainerFriction:0,releaseEase:S});D.progressX=.5,D.progressY=.5,D.onGrab=()=>{Re(b[0],{scale:.8,duration:350,ease:"out(3)"})},D.onRelease=()=>{Re(b[0],{scale:1,duration:350,ease:"out(3)"})},b[0].addEventListener("pointerenter",()=>{D.grabbed||Re(b[0],{scale:1.15,duration:350,ease:"out(3)"})}),b[0].addEventListener("pointerleave",()=>{D.grabbed||Re(b[0],{scale:1,duration:350,ease:"out(3)"})}),R.onEnter=()=>{D.progressX=.5,D.progressY=.5,Re(b,{scale:[0,1],ease:t})},R.onLeave=()=>{Re(b,{scale:0,ease:n,duration:350})};let N=e.scroll=new fs,U=Ke({autoplay:!1}).add("#scrollable-demo path",{x:[-4,4,{to:-4,duration:1500}],y:[-4,4,{to:-4,duration:1500}],strokeWidth:[2,4,{to:2,duration:1500}],loop:!0,duration:2500,loopDelay:0,ease:"inOut(2)"},me(200,{reversed:!0})).init().seek(1e4);N.syncable=Ke({autoplay:!1}).add($n.createDrawable("#scrollable-demo path"),{draw:[{to:me([0,1],{modifier:I=>`${I} ${I+1.01}`})},{to:me([0,1],{modifier:I=>`${I+1.01} ${I+1.01}`})}],ease:"inOut(3)",delay:me(40,{reversed:!0})}),N.onEnter=()=>{U.play()},N.onLeave=()=>{U.pause()};let B=e.responsive=new fs,W={x:0,y:1},G=Ke({id:"responsive-loop",autoplay:!1}).add(".responsive-viewport .circle",{y:{to:[-50,50],modifier:I=>I*W.y},x:{to:[-50,50],modifier:I=>I*W.x},alternate:!0,loop:!0,duration:750,ease:"inOutQuad"},me(100,{start:0})).seek(1e3);return B.syncable=Ke({id:"responsive",autoplay:!1}).add(".responsive-viewport",{width:["80%","50%"],height:["50%","80%"],ease:"inOutExpo"}).add(W,{x:1,y:0,ease:"inOut(6)"},"<<").add(".responsive-viewport .shape",{x:[me([-110,110]),0],y:[0,me([-110,110])],ease:"inOut(6)"},"<<").init(),B.onEnter=()=>{Re(".responsive-viewport .circle",{scale:[0,1],ease:t,delay:me(40)}),G.play()},B.onLeave=()=>{Re(".responsive-viewport .circle",{scale:0,ease:n,duration:350}),G.pause()},e}function cv(){let[i]=H.$(".page"),[e]=H.$("#engine"),t=H.$(".learn-more"),n=new pd,s=Bs({mediaQueries:xo}),r=new vd(n),a=new wd(r,n),o=new Od(a,s,r),l=o.root,c=Mt(new pt),h=Mt(new pt),u=new Ed(r,a,n),d=new cd(r.$output),[p]=H.$(".npm-install code"),g=H.$(".learn-more .icon"),v=new Ea(p.innerHTML);p.appendChild(v.$el),i.classList.add("is-ready");let m=H.$(".sub-nav code");for(let ne=0;ne<m.length;ne++){let fe=m[ne],at=new Ea(fe.innerHTML);if(fe.parentElement.appendChild(at.$el),Ri.highlightElement(fe),Ri.registerLanguage("javascript",Xc),fe.classList.contains("language-undefined")){let Et=Ri.highlight(fe.innerHTML,{language:"javascript"});fe.innerHTML=Et.value,fe.classList.remove("language-undefined"),fe.classList.add("language-javascript")}}function f(){Re(document.documentElement,{scrollTop:window.innerHeight*3,ease:"inOut(2)",duration:2500})}t.forEach(ne=>{ne.addEventListener("click",f)}),Re(g,{translateY:"+=.95em",ease:"linear",opacity:{to:[(ne,fe)=>fe?1:0,(ne,fe)=>fe?0:1],ease:"inOut(2)"},loop:!0});let x=[13,13],A=84,y=new Rr(r.$output);y.$canvas.classList.add("heart-canvas"),y.$canvas.classList.add("grid-canvas");let T=new Rr(r.$output);T.$canvas.classList.add("dotted-grid-canvas"),T.$canvas.classList.add("grid-canvas");let M=new Rr(H.$("#staggering-demo")[0]),C=H.get('[data-demo="staggering"]',"--hex-current-1");M.$canvas.classList.add("staggering-canvas"),M.$canvas.classList.add("grid-canvas");let R=T.width*.5,b=T.height*.5,S=R/(x[0]-1),D=b/(x[1]-1),N=(T.width-R)/2,U=(T.height-b)/2,B=H.get(document.body,"--hex-red-1");for(let ne=0;ne<x[0];ne++)for(let fe=0;fe<x[1];fe++)T.addCircle(1,B,{x:N+fe*S,y:U+ne*D}),y.addCircle(1,B,{x:N+fe*S,y:U+ne*D}),M.addCircle(1,C,{x:N+fe*S,y:U+ne*D});let W=new Rr(r.$output);W.$canvas.classList.add("easings-lines-canvas"),W.$canvas.classList.add("grid-canvas");let G=new Rr(r.$output);G.$canvas.classList.add("easings-dots-canvas"),G.$canvas.classList.add("grid-canvas");let I=me([.75,.1],{from:"center",ease:"in(1)"}),P=me([1,.75],{from:"center",ease:"in(1)"}),L=73,J=37,ae=30,ve=82,le=80,V=78;for(let ne=0;ne<L;ne++)W.addLine(ae,0,W.width-ae,0,2,B,{scaleX:0});H.set(W.lines,{opacity:I,y:me([ve,W.height-ve])});for(let ne=0;ne<J;ne++)G.addCircle(3,B,{y:G.height/2});H.set(G.circles,{opacity:P,x:me([le,G.width-le])}),[0,0,.1,.1,.1,0,0,0,.1,.1,.1,0,0,0,.1,.5,.6,.5,.2,.1,.2,.5,.6,.5,.1,0,.1,.6,.8,.9,.9,.7,.5,.7,.9,.9,.8,.6,.1,.5,.9,1,1,1,.9,.8,.9,1,1,1,.9,.5,.8,.9,1,1,1,1,1,1,1,1,1,.9,.8,.8,1,1,1,1,1,1,1,1,1,1,1,.8,.6,.9,1,1,1,1,1,1,1,1,1,.9,.6,.4,.8,1,1,1,1,1,1,1,1,1,.8,.4,.2,.6,.9,1,1,1,1,1,1,1,.9,.6,.2,.1,.3,.6,.8,1,1,1,1,1,.8,.6,.3,.1,0,.1,.3,.5,.8,1,1,1,.8,.5,.3,.1,0,0,0,0,.2,.4,.7,.9,.7,.4,.2,0,0,0,0,0,0,0,.1,.2,.4,.2,.1,0,0,0,0].forEach((ne,fe)=>{y.circles[fe].scale=ne>.1?ne*12:0}),H.set(y.circles,{opacity:me([.8,.1],{grid:x,from:A})});let ie=Ke({autoplay:!1,onUpdate:()=>{y.render()}}).add(y.circles,{scale:[{from:0},{to:0,duration:800}],duration:500,loop:!0,loopDelay:100,ease:"inOutQuad"},me(150,{grid:x,from:A,ease:"in(4)"})).init(),ue=document.createElement("div");ue.classList.add("clock"),r.$output.appendChild(ue);for(let ne=0;ne<193;ne++){let fe=document.createElement("div");fe.className="tick",fe.dataset.index="0",H.set(fe,{rotate:360/192*ne,y:-178}),ue.appendChild(fe)}let Ie=H.$(".home-section-container"),De=H.$(".output-progress path"),He=H.$(".output-progress-bg path"),$e=$n.createDrawable(De),We=H.$(".feature-section-demo"),Je=H.$(".feature-demo"),F=$n.createDrawable("#path-animation polyline"),Dt=[".toolbox-labels-right li",".toolbox-labels-left li"],Be=H.$(".modules-sizes-chart .chart-bar");H.$(".module-label-text").forEach(ne=>{let[fe]=H.$(".modules-sizes-chart .chart-bar."+ne.classList[1]);if(fe){let at=fe.dataset.size;ne.innerHTML='<div><span class="label-dot"></span><span class="size">'+at+"</span> KB</div>"}});let Le=H.$([".chart-bar.module-scope",".chart-bar.module-animation",".chart-bar.module-timer",".chart-bar.module-stagger"]),[pe]=H.$(".modules-bundle-size span"),xe=0,w=0;Be.forEach(ne=>xe+=+ne.dataset.size),pe.innerHTML=H.roundPad(xe,2),Be.forEach(ne=>{let fe=+ne.dataset.size,at=fe/xe;ne.style.width=at*100+"%",Le.forEach(Et=>{ne===Et&&(w+=fe)})});let _=[],Y=[],$=[],se=[],te=[],Z=[];for(let ne in ui){let fe;ne==="steps"?fe=ui.steps(H.random(3,7,0)):fe=ne,ne!=="irregular"&&ne!=="cubicBezier"&&ne!=="linear"&&(ne.startsWith("inOut")?se.push(fe):ne.startsWith("outIn")?te.push(fe):ne.startsWith("in")?Y.push(fe):ne.startsWith("out")?$.push(fe):Z.push(fe))}_.push($[2]),_.push(se[4]);let K=Math.max(H.shuffle(Y).length,H.shuffle($).length,H.shuffle(se).length,H.shuffle(te).length,H.shuffle(Z).length);for(let ne=0;ne<K;ne++)ne<Y.length&&_.push(Y[ne]),ne<$.length&&_.push($[ne]),ne<se.length&&_.push(se[ne]),ne<te.length&&_.push(te[ne]),ne<Z.length&&_.push(Z[ne]);let oe=(ne,fe,at,Et)=>(Ot,yn,kn)=>me(ne,{ease:fe,from:at,reversed:Et})(Ot,yn,kn),Te=Ke({id:"heading-animation",loop:!0,autoplay:!1,onUpdate:()=>{W.render(),G.render()},defaults:{duration:500}});for(let ne=0;ne<_.length;ne++){let fe=_[ne];Te.add(W.lines,{scaleX:oe([.01,.75],fe,"center",!0),delay:me(10,{from:"center"}),ease:fe}).add(o.easesObjects,{y:oe([0,.08],fe,"center",!0),delay:me(20,{from:"center"}),ease:fe},"<<").add(G.circles,{y:oe([G.height*.5-V,G.height*.5+V],fe,"last",!1),delay:me(20,{from:"center"}),ease:fe},"<<")}Te.add(W.lines,{scaleX:0,delay:me(10,{from:"center"})}).add(o.easesObjects,{y:0,delay:me(20,{from:"center"})},"<<").add(G.circles,{y:G.height*.5,delay:me(20,{from:"center"})},"<<"),d.scale.setScalar(.5),l.scale=10,c.object3D.scale.setScalar(.1),c.object3D.add(d),h.object3D.add(l.object3D),h.object3D.add(c.object3D),r.scene.add(h.object3D),n.enabled,r.camera.lookAt(r.scene.position);let re=new xd(r,n);h.object3D.add(re.ambientLight),h.object3D.add(re.directionalLight),s.add(({matches:ne})=>{ne.minM?(re.x=-200,re.y=135,re.z=-80):(re.x=-200,re.y=135,re.z=-110)}),n.helpers&&h.object3D.add(new hc(100,10));let ge=n.enabled?n.stats.begin:()=>{},Fe=n.enabled?()=>{n.callsPanel.update(r.renderer.info.render.calls,1e3),n.trianglesPanel.update(r.renderer.info.render.triangles,15e5),r.renderer.info.reset(),n.stats.end()}:()=>{};function Qe(){n.enabled&&ge(),u.render(),r.CSSRenderer.render(r.scene,r.camera),n.enabled&&Fe()}function we(){r.updateDimensions(),a.updateDimensions(),u.updateDimensions(),Ue.paused&&Ue.seek(Ue.currentTime)}let Ue=Bn({frameRate:60,autoplay:!1,onUpdate:Qe}),Ge=Bn({duration:250,autoplay:!1,onComplete:we}),Pt=!1;new ResizeObserver(ne=>{ne.length&&(Pt&&Ge.restart(),Pt=!0)}).observe(e),Ue.play();let ce={};for(let ne in a.colors)ce[ne]=new Ae(a.colors[ne]);let ee=H.$("#features-gallery .feature-section");ee.forEach((ne,fe)=>{let at=ne.classList[ne.classList.length-1];De[fe].classList.add(at),He[fe].classList.add(at),Je[fe].classList.add(at),We[fe].classList.add(at)});let he=H.$("#features-gallery .home-section-text"),Me=H.$("#features-gallery .home-section-text-heading"),be=lv(M),et=Ke({defaults:{composition:"none"},autoplay:!1}),Bt=ne=>{Re(".tick",{color:ne,duration:250,ease:"out(3)",composition:"none"}),Re(T.circles,{color:ne,duration:250,ease:"out(3)",delay:me(15,{from:"center",grid:x}),onUpdate:()=>T.render(),composition:"none"})};s.add("toggleText",(ne,fe)=>{s.matches.minM||Re(he[ne],{opacity:fe?.001:1,duration:250,ease:"inOut(3)"})}),ee.forEach((ne,fe)=>{let at=Je[fe],Et=We[fe],Ot=be[ne.dataset.demo],yn=Me[fe],kn=yn.querySelector("p"),pi=yn.querySelector("h2"),rn=ne.querySelector("ul"),E=fe===ee.length-1;H.set(rn,{opacity:.001}),H.set([kn,pi],{opacity:.5}),et.call(z=>{let Q=z.backwards;at&&(Ot&&(Q?Ot.onLeave():Ot.onEnter()),Re([at,Et],{opacity:Q?.001:1,duration:250,ease:"inOut(3)"}),Re([kn,pi],{opacity:Q?.5:1,duration:250,ease:"out(3)"}),s.matches.minM?Q?Re(rn,{opacity:.001,duration:250,delay:.001,ease:"out(3)"}):(Re(rn,{opacity:1,"--scaleX":{to:[0,1],duration:300,ease:"inOut(2.4)"},duration:350,ease:"inOut(3)"}),Re(rn.querySelectorAll("li"),{opacity:[.001,1],duration:250,delay:me(100,{start:350}),ease:"inOut(3)"}),Re(rn.querySelectorAll("li .icon"),{translateX:["-.25rem",0],duration:250,delay:me(100,{start:350}),ease:"inOut(3)",onComplete:H.cleanInlineStyles})):s.methods.toggleText(fe,Q)),ne.classList.toggle("is-in-view",!Q);let q=H.get(ne,"--hex-current-1");Bt(q)}).add($e[fe],{draw:"0 1",ease:"linear"},fe?"<":0).add([$e[fe],He[fe]],{strokeWidth:[5,10],ease:"outQuart",duration:50},"<<"),fe&&et.add([$e[fe-1],He[fe-1]],{strokeWidth:[10,5],ease:"outQuart",duration:50},"<<"),Ot&&Ot.syncable&&et.add(Ot.syncable,{progress:1,ease:"linear"},"<<"),E&&et.add([$e[$e.length-1],He[$e.length-1]],{strokeWidth:[10,5],ease:"outQuart",duration:50}),et.call(z=>{let Q=z.backwards;at&&(Ot&&(Q?Ot.onEnter():Ot.onLeave()),Re([at,Et],{opacity:Q?1:.001,duration:250,ease:"inOut(3)"}),Re([kn,pi],{opacity:Q?1:.5,duration:250,ease:"out(3)"}),s.matches.minM?Re([rn],{opacity:Q?1:.001,duration:250,delay:Q?.001:150,ease:"out(3)"}):s.methods.toggleText(fe,!Q)),ne.classList.toggle("is-in-view",Q);let q=E&&!Q?H.get(ne,"--hex-red-1"):H.get(ne,"--hex-current-1");Bt(q)},"-=1")}),et.init();let dn=H.$("[data-label]"),bt=kd("#intro h2",!0),En=kd("#intro p"),Tn=H.$("[data-chapter]"),[In]=H.$(".scroll-bar"),gs=fo(".scroll-cursor-ghost",{x:150,scale:250,opacity:150}),Di=["HTML","WebGL","CSS","Canvas 2D","SVG","anything"],Vs=0,Ws=null,wa=()=>{let[ne]=H.$(".animate-anything");ba(ne,"word","char");let fe=ne.querySelectorAll(".char");Ws=Ke({delay:1e3,onComplete:()=>{let[at]=H.$(".animate-anything");at.innerHTML=Di[Vs++],Vs>Di.length-1&&(Vs=0),ba(at,"word","char"),Ws=Ke({onComplete:()=>{wa()}}).add(at.querySelectorAll(".char"),{opacity:[0,1],scaleX:[0,1],x:[10,0],duration:150,delay:me(25,{from:"first",ease:"in(3)",start:100})},0).add(".animate-anything-dot",{x:[-at.offsetWidth,0],scaleX:[8,1],transformOrigin:["0% 0%","0% 0%"],color:Et=>H.get(Et,"--hex-fg-2"),duration:fe.length*25+75,ease:"out(3)"},0).add({duration:750}).init()}}).add(fe,{opacity:0,scaleX:0,duration:100,delay:me(25,{from:"last",ease:"in(3)"})},0).add(".animate-anything-dot",{x:-ne.offsetWidth,transformOrigin:["100% 0%","100% 0%"],scaleX:[4,1],duration:fe.length*25+100,color:at=>H.get(at,"--hex-red-1"),delay:50,ease:"out(3)"},0)};En.onComplete=wa,bt.add("#intro .home-section-text h2 .red-dot",{x:[".25em","0em"],opacity:[0,1],color:{from:"#FFF"},duration:300,ease:"inOut(3)"},550).add("#intro .home-section-text h2 .red-dot",{color:ne=>H.get(ne,"--hex-fg-1"),duration:1500},"<+=500").init();let Xs=ne=>{let fe=In.getBoundingClientRect(),at=ne.clientX-fe.left;return H.snap(1/65).round(4).clamp(0,1)(at/fe.width)};s.add("showCard",ne=>{ne.querySelector("code")&&!s.matches.minM||Re(ne,{y:0,opacity:1,ease:"inOut(3)",duration:350})}),s.add("hideCard",ne=>{ne.querySelector("code")&&!s.matches.minM||Re(ne,{y:"120%",opacity:0,ease:"inOut(3)",duration:250})}),Tn.forEach((ne,fe)=>{let at=document.createElement("a");at.setAttribute("href","#"+ne.getAttribute("id"));let Et=document.querySelector(`[data-card="${ne.dataset.chapter}"]`);if(at.classList.add("scroll-button"),at.dataset.index=fe+"",In.appendChild(at),Et){let Ot=Et.getAttribute("data-enter-offset")||"",yn=Et.getAttribute("data-leave-offset")||"";H.set(Et,{y:"120%",opacity:0}),Tr({target:ne,enter:"top top"+Ot,leave:"top bottom"+yn,onEnter:()=>{s.methods.showCard(Et)},onLeave:()=>{s.methods.hideCard(Et)}})}});let jc=H.$(".scroll-button");s.add(({matches:ne,data:fe})=>{let at=25;r.camera.position.z=ne.minM?120:180,h.z=ne.minM?52:90,h.rotateX=0,h.rotateY=0,c.z=at,l.z=-5,H.set([".clock",W.$canvas,G.$canvas],{z:me(15)}),H.set([y.$canvas,G.circles,T.circles],{scale:.001}),H.set([".output-progress-bg",".clock"],{opacity:1}),H.set([o.caseBackVentObjects,o.caseFrontVentObjects],{rotateZ:0,opacity:1}),H.set(["#intro .home-section-text","#site-header",".heading-links .ui-group",".heading-sponsors"],{opacity:.001}),Te.pause().seek(0),bt.pause().seek(0),En.pause().seek(0),y.render(),G.render(),W.render(),T.render(),Ws&&Ws.cancel();let Et=Ke({autoplay:!1,defaults:{ease:"inOut(3)"}}).label("INTRO").label("INTRO_ON",1400);H.set([a.outlineShaderMaterial.uniforms.outlineColor.value,a.outlineShaderMaterial.uniforms.rimColor.value,a.outlineShaderMaterial.uniforms.shadowColor.value,a.outlineShaderMaterial.uniforms.worldColor1.value,a.outlineShaderMaterial.uniforms.backgroundColor.value],{r:0,g:0,b:0}),Et.add(a.outlineShaderMaterial.uniforms.outlineColor.value,{r:ce.outlineColor.r,g:ce.outlineColor.g,b:ce.outlineColor.b},"INTRO+=1000").add(a.outlineShaderMaterial.uniforms.rimColor.value,{r:ce.rimColor.r,g:ce.rimColor.g,b:ce.rimColor.b,duration:2500},"INTRO+=500").add(a.outlineShaderMaterial.uniforms.shadowColor.value,{r:ce.shadowColor.r,g:ce.shadowColor.g,b:ce.shadowColor.b,duration:3e3},"INTRO").add(a.outlineShaderMaterial.uniforms.worldColor1.value,{r:ce.worldColor1.r,g:ce.worldColor1.g,b:ce.worldColor1.b,duration:3e3},"INTRO").add(a.outlineShaderMaterial.uniforms.backgroundColor.value,{r:ce.backgroundColor.r,g:ce.backgroundColor.g,b:ce.backgroundColor.b,duration:3e3},"INTRO").add(document.body,{backgroundColor:a.colors.backgroundColor,duration:3e3},"INTRO"),n.enabled||Et.add(re,{x:{from:100},duration:3e3},"INTRO"),Et.add(".tick",{opacity:[{from:0,to:1,duration:10},{to:(ke,ht,ft)=>ht!==ft-1?.4:0,duration:1e3}],ease:"out(3)",delay:me([0,500],{ease:"outIn(2)"})},"INTRO").add(".output-progress-bg path",{opacity:[0,1,0,1,0,1],duration:200,ease:"steps(5)",delay:me([0,400],{modifier:ke=>H.clamp(H.random(-250,250)+ke,0,800)})},"<-=1000").add(T.circles,{opacity:{from:0,to:me([.5,0],{grid:x,from:A,ease:"out(2)"})},scale:[{from:0,to:4},{to:1}],duration:400,ease:"out(3)",delay:me(100,{from:"center",grid:x}),onUpdate:()=>{T.render()}},"<-=500"),Et.add(G.circles,{scale:1,composition:"none",ease:"inOutQuad",duration:200,delay:me(14,{from:"center",ease:"outIn(1)"}),onUpdate:()=>{G.render()}},"<<+=500").call(()=>Te.play(),"<").call(()=>bt.play(),"INTRO_ON").call(()=>En.play(),"INTRO_ON+=500").add("#intro .home-section-text",{opacity:1,duration:100},"INTRO_ON").add(["#site-header",".heading-links .ui-group",".heading-sponsors"],{opacity:1,duration:350},"INTRO_ON+=500").add(h,{z:ne.minM?58:92,duration:1500},"INTRO_ON-=500").label("INTRO_END").label("HEADING").label("HEADING_CASE","HEADING+=250").add(h,{z:{to:ne.minM?15:-50,ease:"out(3)"},rotateX:{to:90,ease:"out(3)"},rotateY:{to:-135,ease:"inOut(2)"}},"HEADING").add(".heading-links",{y:200,opacity:{to:0,duration:150,delay:150},ease:"linear",duration:250},"HEADING").add([G.$canvas,W.$canvas],{scale:.001,duration:150},"HEADING+=250").add([".output-progress-bg",".clock"],{opacity:[1,.001],duration:50},"<<").call(({backwards:ke})=>Te[ke?"play":"pause"](),"<").add(o.case01Objects,{rotateZ:[180,0],duration:300,ease:"inOut(3)"},"HEADING+=100").add(o.modulesObjects.renderer,{rotateZ:-360,duration:300},"HEADING+=100").add(o.case02BackObjects[0],{x:-8,y:8,scale:0,duration:300},"HEADING_CASE+=100").add(o.case02BackObjects[1],{x:8,y:-8,scale:0,duration:300},"HEADING_CASE+=100").add(o.case02BackObjects[2],{x:-8,y:-8,scale:{to:0,duration:50},duration:300},"HEADING_CASE+=100").add(o.case02FrontObjects[0],{x:-8,y:8,scale:0,duration:300},"HEADING_CASE+=0").add(o.case02FrontObjects[1],{x:8,y:-8,scale:0,duration:300},"HEADING_CASE+=0").add(o.case02FrontObjects[2],{x:-8,y:-8,scale:{to:0,duration:50},duration:300},"HEADING_CASE+=0").add(o.case01Objects[0],{x:-8,y:8,scale:0,duration:300},"HEADING_CASE+=50").add(o.case01Objects[2],{x:8,y:-8,scale:0,duration:300},"HEADING_CASE+=50").add(o.case01Objects[3],{x:-8,y:-8,scale:{to:0,duration:50},duration:300},"HEADING_CASE+=50").add(o.modulesObjects.renderer,{z:3.25,duration:300},"HEADING_CASE").add(o.modulesObjects.waapi,{z:2.75,duration:300},"HEADING_CASE+=50").add(c,{z:at+5,duration:300},"HEADING_CASE").add(o.modulesObjects.scope,{z:-2.4,duration:300},"HEADING_CASE+=50").add([o.caseBackVentObjects,o.caseFrontVentObjects],{rotateZ:-200,duration:300,opacity:{to:0,duration:0,delay:me(2,{from:"last",start:175})},delay:me(2,{from:"last"})},"HEADING_CASE+=50").add(Dt,{opacity:[0,1],duration:250,ease:"out(3)",delay:me(10,{from:"last"})},"HEADING+=700").add(F,{draw:["0 0","0 1"],duration:250,ease:"out(3)",delay:me(10,{from:"last"})},"<<+=50").call(({backwards:ke})=>{ke||r.lines.updateDimensions()},"<<").label("HEADING_END").label("TOOLBOX").add(h,{z:{to:ne.minM?55:92,ease:"inOut(3)"},rotateX:{to:0,ease:"inOut(2)"},rotateY:{to:-360,ease:"inOut(2)"}},"TOOLBOX").add(F,{draw:["0 1","0 0"],duration:250,ease:"out(3)",delay:me(10)},"TOOLBOX+=200").add(Dt,{opacity:[1,0],duration:250,ease:"inOut(3)",delay:me(10)},"<<+=50").call(({backwards:ke})=>{ke&&r.lines.updateDimensions()},"<<").add([".output-progress-bg"],{opacity:.2,duration:50},"<+=400").add([".clock","#features-gallery"],{opacity:1,duration:50},"<<").label("TOOLBOX_END").label("FEATURES").label("FEATURES_END").label("MODULES").label("MODULES_TRANSFORM","MODULES+=590").label("MODULES_SHRINK","MODULES+=1250").label("MODULES_CASE","MODULES+=1900").label("MODULES_ROTATION","MODULES+=1750").add([".output-progress-bg",".output-progress",".clock",T.$canvas],{opacity:.001,duration:500},"MODULES+=100").add(h,{z:ne.minM?20:-15,duration:1e3},"MODULES").add(h,{rotateX:45,duration:1e3},"MODULES").add(h,{rotateY:-720,duration:1625},"MODULES_ROTATION").add(h,{z:57,rotateX:0,duration:1625},"MODULES_ROTATION").add(l,{z:2,duration:1e3},"MODULES_ROTATION").add([o.modulesObjects.waapi,o.modulesObjects.timeline,o.modulesObjects.svg,o.modulesObjects.spring,o.modulesObjects.draggable,o.modulesObjects.scroll],{x:(ke,ht)=>ht%2?-2.5:2.5,y:(ke,ht)=>(ht%2,0),duration:750},me(25,{start:"MODULES_TRANSFORM",reversed:!1})).add(".module-label-text div",{opacity:[0,1],scale:[0,1],ease:"inOut(2)",duration:200,delay:me(10)},"MODULES_TRANSFORM+=450").add([o.modulesObjects.waapi,o.modulesObjects.timeline,o.modulesObjects.svg,o.modulesObjects.spring,o.modulesObjects.draggable,o.modulesObjects.scroll],{rotateY:(ke,ht)=>ht%2?-90:90,scale:0,duration:1e3},me(25,{start:"MODULES_SHRINK",reversed:!1})).add([".chart-bar.module-waapi",".chart-bar.module-timeline",".chart-bar.module-svg",".chart-bar.module-spring",".chart-bar.module-draggable",".chart-bar.module-scroll"],{width:"0%",ease:"linear",duration:1e3},me(25,{start:"MODULES_SHRINK",reversed:!1})).add([".module-label-text.module-waapi .size",".module-label-text.module-timeline .size",".module-label-text.module-svg .size",".module-label-text.module-spring .size",".module-label-text.module-draggable .size",".module-label-text.module-scroll .size"],{innerHTML:"0",ease:"linear",modifier:H.roundPad(2),duration:1e3},me(25,{start:"MODULES_SHRINK",reversed:!1})).add([".module-label-text.module-waapi div",".module-label-text.module-timeline div",".module-label-text.module-svg div",".module-label-text.module-spring div",".module-label-text.module-draggable div",".module-label-text.module-scroll div",".module-label-text div"],{scale:0,ease:"inOut(2)",duration:200,delay:me(40)},"<-=400").add(pe,{innerHTML:w,ease:"linear",modifier:H.roundPad(2),duration:1e3},"MODULES_SHRINK").add(o.modulesObjects.waapi,{z:2.5,duration:500,ease:"inOut(3)"},"MODULES_TRANSFORM").add(o.modulesObjects.renderer,{z:1.5,duration:2e3,ease:"inOut(3)"},"MODULES_TRANSFORM+=400").add(c,{z:at-5.5,duration:2e3,ease:"inOut(3)"},"MODULES_TRANSFORM+=400").add(o.modulesObjects.stagger,{z:1.12,duration:1500,ease:"inOut(3)"},"MODULES_TRANSFORM+=500").add(o.modulesObjects.engine,{z:-1.2,duration:1500,ease:"inOut(3)"},"MODULES_TRANSFORM+=700").add(o.modulesObjects.scope,{z:-1.12,duration:1500,ease:"inOut(3)"},"MODULES_TRANSFORM+=750").add(o.case02BackObjects[0],{x:0,y:0,z:.7,scale:{to:1,duration:100},scaleZ:{to:.5125,duration:100},ease:"out(3)"},"MODULES_CASE+=200").add(o.case02BackObjects[1],{x:0,y:0,z:.7,scale:{to:1,duration:100},scaleZ:{to:.5125,duration:100},ease:"out(3)"},"MODULES_CASE+=200").add(o.case02BackObjects[2],{x:0,y:0,z:.7,scale:{to:1,duration:100},scaleZ:{to:.5125,duration:100},ease:"out(3)"},"MODULES_CASE+=200").add(o.case02FrontObjects[0],{x:0,y:0,z:0,scale:{to:1,duration:100},scaleZ:{to:.5125,duration:100},ease:"out(3)"},"MODULES_CASE+=100").add(o.case02FrontObjects[1],{x:0,y:0,z:0,scale:{to:1,duration:100},scaleZ:{to:.5125,duration:100},ease:"out(3)"},"MODULES_CASE+=100").add(o.case02FrontObjects[2],{x:0,y:0,z:0,scale:{to:1,duration:100},scaleZ:{to:.5125,duration:100},ease:"out(3)"},"MODULES_CASE+=100").add(o.case01Objects[0],{x:0,y:0,z:-.6,scale:{to:1,duration:100},scaleZ:{to:.5125,duration:100},ease:"out(3)"},"MODULES_CASE+=0").add(o.case01Objects[2],{x:0,y:0,z:-.6,scale:{to:1,duration:100},scaleZ:{to:.5125,duration:100},ease:"out(3)"},"MODULES_CASE+=0").add(o.case01Objects[3],{x:0,y:0,z:-.6,scale:{to:1,duration:100},scaleZ:{to:.5125,duration:100},ease:"out(3)"},"MODULES_CASE+=0").add([o.caseBackVentObjects[7],o.caseBackVentObjects[8],o.caseBackVentObjects[9],o.caseBackVentObjects[10],o.caseBackVentObjects[11],o.caseBackVentObjects[12],o.caseBackVentObjects[13],o.caseBackVentObjects[14],o.caseFrontVentObjects[0],o.caseFrontVentObjects[1],o.caseFrontVentObjects[2],o.caseFrontVentObjects[3],o.caseFrontVentObjects[4],o.caseFrontVentObjects[5],o.caseFrontVentObjects[6],o.caseFrontVentObjects[7]],{rotateZ:0,scale:1,ease:"out(3)",opacity:{to:1,duration:0,delay:me(10,{from:"last",start:150})},delay:me(10,{from:"last"})},"MODULES_CASE").add(h,{z:ne.minM?64:100,duration:2e3},"MODULES_CASE").call(({backwards:ke})=>{ke?ie.pause():ie.restart()},"-=500").add([".output-progress-bg",".output-progress",".clock"],{opacity:1,duration:500},"<<").add([y.$canvas],{scale:1,duration:500},"<<").label("MODULES_END").label("SPONSORS").label("SPONSORS_END").label("GET_STARTED").add(h,{rotateX:100,z:{to:60,ease:"out(3)"},duration:4e3,ease:"in(2)"},"GET_STARTED").add(h,{y:ne.minM?38:100,ease:"in(2)",duration:4e3},"GET_STARTED+=350").add(c,{z:at-5,duration:1e3},"GET_STARTED").label("GET_STARTED_END").init();let Ot={currentTime:0,progress:0},yn=Ke({autoplay:!1,defaults:{ease:"linear"}}),kn=Re(Ot,{currentTime:[Et.labels.INTRO,Et.labels.INTRO_END],composition:"none",ease:"linear",duration:4e3,onUpdate:()=>{Et.seek(Ot.currentTime)}}),pi=Ke({autoplay:!1,defaults:{ease:"linear"}}),rn=ke=>{yn.progress=ke,document.scrollingElement.scrollTop=(document.body.scrollHeight-window.innerHeight)*Ot.progress},E=ke=>{let ht=ke.target;ht&&!ht.classList.contains("scroll-cursor")&&rn(Xs(ke))},z=()=>{gs.opacity(0),gs.scale(0)},Q=()=>{gs.opacity(1),gs.scale(1)},q=!0,X=()=>{!q||(H.set(".sub-nav",{pointerEvents:"auto"}),q=!1,Ke().add(".home-progress-card",{opacity:1,y:["100%",0],duration:250}).add(".home-progress-card .scroll-button",{opacity:[0,.5],duration:250,delay:me(20)}).add(".home-progress-card .scroll-cursor:not(.scroll-cursor-ghost)",{opacity:[0,1],scale:[0,1.2,1],duration:250,delay:me(50)},"<<+=250").init())},de=()=>{q||(H.set(".sub-nav",{pointerEvents:"none"}),q=!0,Ke().add(".home-progress-card",{opacity:0,y:"100%",duration:250}).init())};H.set(".scroll-cursor",{x:0,scale:1});let ye=()=>{Re(".scroll-cursor",{scale:1.25,duration:250})},Ce=()=>{Re(".scroll-cursor",{scale:1,duration:150})},Ee=us(".scroll-cursor",{y:!1,container:".scroll-bar",containerFriction:1,containerPadding:[0,-1,0,-1],onGrab:()=>{ye(),z()},onRelease:ke=>{Ce(),ke.progressX<.02||ke.progressX>.98?de():X()},onUpdate:ke=>{ke.grabbed&&rn(ke.progressX)}}),tt=ke=>{let ht=ke.target;ht&&!ht.classList.contains("scroll-cursor")&&!Ee.grabbed?(gs.x(Xs(ke)*In.offsetWidth-2),Q()):z()};Ee.progressX=0;let it=Ke({defaults:{ease:"linear"},onBegin:()=>{kn.completed||kn.pause()},autoplay:Tr({target:document.body,sync:.9,enter:"max",leave:"min",onUpdate:({progress:ke})=>{Et.seek(Ot.currentTime),Ee.grabbed||(pi.progress=ke,ke<.02||ke>.98?de():X())}})}),Ye=Tn.reduce((ke,ht)=>ke+ht.offsetHeight,0),xt=0,_t=0;return Tn.forEach((ke,ht)=>{pi.add(Ee,{progressX:1/Tn.length*(ht+1),duration:+ke.offsetHeight}),_t+=ke.offsetHeight,xt+=ke.offsetHeight;let ft=xt/Ye;yn.add(Ot,{progress:ft,duration:1e4/Tn.length}),rn(Ot.progress)}),_t=0,dn.forEach((ke,ht)=>{let ft=ke.getAttribute("data-label");it.add(Ot,{composition:"none",currentTime:[Et.labels[ft],Et.labels[ft+"_END"]],duration:ke.offsetHeight},_t),_t+=ke.offsetHeight}),In.addEventListener("click",E),In.addEventListener("mousemove",tt),In.addEventListener("mouseenter",Q),In.addEventListener("mouseleave",z),Ee.$target.addEventListener("mouseenter",ye),Ee.$target.addEventListener("mouseleave",Ce),()=>{In.removeEventListener("click",E),In.removeEventListener("mousemove",tt),In.removeEventListener("mouseenter",Q),In.removeEventListener("mouseleave",z),Ee.$target.removeEventListener("mouseenter",ye),Ee.$target.removeEventListener("mouseleave",Ce)}}),Tr({target:"#features-gallery",container:document.body,sync:.9,enter:()=>"top top-=1",leave:()=>"bottom bottom+=100lvh"}).link(et),Ie.forEach((ne,fe)=>{let at=ne.classList.contains("home-section-light"),Et=ne.getAttribute("data-enter-offset")||"",Ot=ne.getAttribute("data-leave-offset")||"",yn=ne.querySelector(".fixed-section"),kn=250,pi="inOutQuad";Tr({target:ne,container:document.body,enter:"top top"+Et,leave:"bottom bottom"+Ot,onUpdate:()=>{at&&(r.labelsRenderer.render(r.scene,r.camera),r.lines.update())},onEnter:()=>{let rn=yn||null;rn&&(H.set(rn,{pointerEvents:"auto"}),Re(rn,{opacity:1,duration:350,ease:"linear"})),at&&(document.body.classList.add("is-light"),Ke({defaults:{duration:kn,ease:pi}}).add(document.body,{backgroundColor:a.colors.worldColorLight1},0).add([a.outlineShaderMaterial.uniforms.outlineBlend,a.outlineShaderMaterial.uniforms.contourBlend],{value:.35},0).add([a.outlineShaderMaterial.uniforms.rimColor.value,a.outlineShaderMaterial.uniforms.worldColor1.value,a.outlineShaderMaterial.uniforms.shadowColor.value,a.outlineShaderMaterial.uniforms.backgroundColor.value],{r:ce.worldColorLight1.r,g:ce.worldColorLight1.g,b:ce.worldColorLight1.b},0).add([a.outlineShaderMaterial.uniforms.outlineColor.value],{r:ce.outlineColorLight.r,g:ce.outlineColorLight.g,b:ce.outlineColorLight.b},0))},onLeave:()=>{let rn=yn||null;rn&&(H.set(rn,{pointerEvents:"none"}),Re(rn,{opacity:.001,duration:350,ease:"linear"})),at&&(document.body.classList.remove("is-light"),Ke({defaults:{duration:kn,ease:pi}}).add(document.body,{backgroundColor:a.colors.backgroundColor},0).add([a.outlineShaderMaterial.uniforms.outlineBlend],{value:.4},0).add([a.outlineShaderMaterial.uniforms.contourBlend],{value:.65},0).add(a.outlineShaderMaterial.uniforms.rimColor.value,{r:ce.rimColor.r,g:ce.rimColor.g,b:ce.rimColor.b},0).add(a.outlineShaderMaterial.uniforms.shadowColor.value,{r:ce.shadowColor.r,g:ce.shadowColor.g,b:ce.shadowColor.b},0).add(a.outlineShaderMaterial.uniforms.worldColor1.value,{r:ce.worldColor1.r,g:ce.worldColor1.g,b:ce.worldColor1.b},0).add(a.outlineShaderMaterial.uniforms.backgroundColor.value,{r:ce.backgroundColor.r,g:ce.backgroundColor.g,b:ce.backgroundColor.b},0).add(a.outlineShaderMaterial.uniforms.outlineColor.value,{r:ce.outlineColor.r,g:ce.outlineColor.g,b:ce.outlineColor.b},0))}})})}function hv(){let[i]=H.$("#learn"),[e]=H.$(".learn-header-text h2"),[t]=H.$(".learn-header-text .word-websites");ba(e,"word","char");let n=Ke({defaults:{ease:"out(3)",duration:800}}).add(e.querySelectorAll(".word"),{y:[10,0],opacity:{to:[0,1]},duration:1500,delay:me(75,{ease:"outIn(2)"}),ease:"outQuint"}).add([".learn-header-text p",".learn-email-signup",".video-wrapper"],{y:[5,0],opacity:[0,1]},"-=1350").init();i.classList.add("is-ready")}function uv(i){if(!i||i.classList.contains("is-responvie"))return;let e=i.getElementsByTagName("th");for(let s=0;s<e.length;s++)e[s].setAttribute("scope","col");let n=i.getElementsByTagName("tbody")[0].getElementsByTagName("tr");for(let s=0;s<n.length;s++){let r=n[s].getElementsByTagName("td");for(let a=0;a<r.length;a++)r[a].setAttribute("data-label",e[a].innerText),a===0&&r[a].setAttribute("scope","row")}i.classList.add("responsive-table")}var Xd=(i,e,t,n="_prev",s="_next")=>{let r=i._head,a=s;for(t&&(r=i._tail,a=n);r;){let o=r[a];e(r),r=o}};function dv(i,e){let t=i.root.parentNode.parentNode,[n]=t.querySelectorAll(".docs-demo-html"),[s,r]=t.querySelectorAll(".viewer"),a=e._delay+e.iterationDuration+e._loopDelay,o=a-e._delay,l=e._loopDelay?e._loopDelay/2:0,c=n.offsetWidth-6,h=e._hasChildren;if(!t.classList.contains("has-viewer")){t.classList.add("has-viewer");let d="";if(h){let p=e.labels,g=0;d+='<div class="medium tl-viewer row">',Xd(e,v=>{let m=H.round(v._offset,1),f=v.targets,x="",A="";if(p)for(let M in p){let C=p[M];if(m===C){A=` data-label="${M}"`;break}}if(f&&f.length){let M=f[0],R=(M.targets?M.targets[0]:M).classList;if(R){let[b]=R;x+=`<span class="label-${b}">`,x+="</span>"}}let y=v.duration,T=v._offset;if(y<1){let M=v._next;M?y=M._offset-v._offset:y=0}g+=y,d+=`
          <div class="tl-child${A?" label":""}" style="
            left: ${T/o*100}%;
            width: ${y/o*100}%
          "${A}>${x}</div>
        `}),d+="</div>"}else Xd(e,p=>{let g=p.property,v=p._delay,m=`<div class="medium tween-viewer row ${g}">`;e._delay&&(m+=`<span class="label anim-delay" style="width:${e._delay/a*100}%">delay</span>`),l&&(m+=`<span class="label anim-loop-delay-1" style="width:${l/a*100}%">loopDelay</span>`),v&&(m+=`<span class="label tween-delay" style="width:${v/a*100}%"></span>`),m+=`<span class="label tween-duration" style="width:${p._updateDuration/a*100}%">${g}</span>`,l&&(m+=`<span class="label anim-loop-delay-2" style="width:${l/a*100}%">loopDelay</span>`),m+="</div>",d+=m});r.innerHTML=d,s.innerHTML=d}let u;return Xd(e,d=>{if(h){let p=s.querySelector(".tl-viewer");H.set(p,{"--x":"-2px"});let g=0,v=1e3/o;u=Ke({playbackRate:v,delay:e._delay*v,loop:e.iterationCount-1,alternate:e._alternate,defaults:{ease:"linear"}}).add(p.querySelectorAll(".tl-child"),{opacity:[{from:.5,to:1,duration:m=>m.offsetLeft/m.parentNode.offsetWidth*1e3},{to:.5,duration:m=>parseFloat(m.style.width)*10}],ease:"steps(1)"},g).add(p,{"--x":m=>[0,m.offsetWidth-1-2+"px"]},g)}else{u=Ke({defaults:{ease:"linear"}});let p=d._delay,g=s.querySelector("."+d.property),v=0;H.set(d,{"--x":`-${v}px`,width:"100%"});let m=e._delay/a,f=l/a,x=p/a,A=d._updateDuration/a,y=1-(m+x+A+f*2);m&&(u.add(g,{"--x":"+="+H.round(m*c,1)+"px",duration:m*a,composition:"none"},0),u.add(g.querySelector(".anim-delay"),{opacity:[{to:1,duration:0},{to:.5,duration:1,delay:m*a}]},0));let T=Ke({defaults:{ease:"linear"},autoplay:!1}).label("tweenStart",0).label("tweenFirstLoopDelayEnd",f*a).label("tweenDelayEnd",(f+x)*a).label("tweenDurationEnd",(f+x+A)*a).add(g,{"--x":{from:H.round(m*c,1)-v+"px",to:"+="+H.round(f*c,1)},duration:f*a,composition:"none"},"tweenStart");l&&T.add(g.querySelector(".anim-loop-delay-1"),{opacity:[{to:1,duration:0},{to:.5,duration:1,delay:f*a}]},"tweenStart"),T.add(g,{"--x":{from:H.round((m+f)*c,1)-v+"px",to:"+="+x*c},duration:x*a},"tweenFirstLoopDelayEnd"),x&&T.add(g.querySelector(".tween-delay"),{opacity:[{to:1,duration:0},{to:.5,duration:1,delay:x*a}]},"tweenFirstLoopDelayEnd"),T.add(g,{"--x":{to:"+="+H.round(A*c,1)},duration:A*a},"tweenDelayEnd").add(g.querySelector(".tween-duration"),{opacity:[{to:1,duration:0},{to:.5,duration:1,delay:A*a}]},"tweenDelayEnd").add(g,{"--x":{to:"+="+f*c},duration:f*a},"tweenDurationEnd"),l&&T.add(g.querySelector(".anim-loop-delay-2"),{opacity:[{to:1,duration:0},{to:.5,duration:1,delay:f*a}]},"tweenDurationEnd"),y&&T.add({duration:y*a}),u.add(T,{progress:[0,1],loop:e.iterationCount-1,alternate:e._alternate,duration:(x+A+y+f*2)*a,ease:"linear"},m*a),l&&u.seek(f*a)}}),u}function ps(i){return Array.isArray?Array.isArray(i):mv(i)==="[object Array]"}var KT=1/0;function JT(i){if(typeof i=="string")return i;let e=i+"";return e=="0"&&1/i==-KT?"-0":e}function $T(i){return i==null?"":JT(i)}function zi(i){return typeof i=="string"}function fv(i){return typeof i=="number"}function eM(i){return i===!0||i===!1||tM(i)&&mv(i)=="[object Boolean]"}function pv(i){return typeof i=="object"}function tM(i){return pv(i)&&i!==null}function ti(i){return i!=null}function Yd(i){return!i.trim().length}function mv(i){return i==null?i===void 0?"[object Undefined]":"[object Null]":Object.prototype.toString.call(i)}var nM="Incorrect 'index' type",iM=i=>`Invalid value for key ${i}`,sM=i=>`Pattern length exceeds max of ${i}.`,rM=i=>`Missing ${i} property in key`,aM=i=>`Property 'weight' in key '${i}' must be a positive integer`,gv=Object.prototype.hasOwnProperty,vv=class{constructor(e){this._keys=[],this._keyMap={};let t=0;e.forEach(n=>{let s=xv(n);t+=s.weight,this._keys.push(s),this._keyMap[s.id]=s,t+=s.weight}),this._keys.forEach(n=>{n.weight/=t})}get(e){return this._keyMap[e]}keys(){return this._keys}toJSON(){return JSON.stringify(this._keys)}};function xv(i){let e=null,t=null,n=null,s=1,r=null;if(zi(i)||ps(i))n=i,e=yv(i),t=Qd(i);else{if(!gv.call(i,"name"))throw new Error(rM("name"));let a=i.name;if(n=a,gv.call(i,"weight")&&(s=i.weight,s<=0))throw new Error(aM(a));e=yv(a),t=Qd(a),r=i.getFn}return{path:e,id:t,weight:s,src:n,getFn:r}}function yv(i){return ps(i)?i:i.split(".")}function Qd(i){return ps(i)?i.join("."):i}function oM(i,e){let t=[],n=!1,s=(r,a,o)=>{if(!!ti(r))if(!a[o])t.push(r);else{let l=a[o],c=r[l];if(!ti(c))return;if(o===a.length-1&&(zi(c)||fv(c)||eM(c)))t.push($T(c));else if(ps(c)){n=!0;for(let h=0,u=c.length;h<u;h+=1)s(c[h],a,o+1)}else a.length&&s(c,a,o+1)}};return s(i,zi(e)?e.split("."):e,0),n?t:t[0]}var lM={includeMatches:!1,findAllMatches:!1,minMatchCharLength:1},cM={isCaseSensitive:!1,includeScore:!1,keys:[],shouldSort:!0,sortFn:(i,e)=>i.score===e.score?i.idx<e.idx?-1:1:i.score<e.score?-1:1},hM={location:0,threshold:.6,distance:100},uM={useExtendedSearch:!1,getFn:oM,ignoreLocation:!1,ignoreFieldNorm:!1,fieldNormWeight:1},st={...cM,...lM,...hM,...uM},dM=/[^ ]+/g;function fM(i=1,e=3){let t=new Map,n=Math.pow(10,e);return{get(s){let r=s.match(dM).length;if(t.has(r))return t.get(r);let a=1/Math.pow(r,.5*i),o=parseFloat(Math.round(a*n)/n);return t.set(r,o),o},clear(){t.clear()}}}var Yc=class{constructor({getFn:e=st.getFn,fieldNormWeight:t=st.fieldNormWeight}={}){this.norm=fM(t,3),this.getFn=e,this.isCreated=!1,this.setIndexRecords()}setSources(e=[]){this.docs=e}setIndexRecords(e=[]){this.records=e}setKeys(e=[]){this.keys=e,this._keysMap={},e.forEach((t,n)=>{this._keysMap[t.id]=n})}create(){this.isCreated||!this.docs.length||(this.isCreated=!0,zi(this.docs[0])?this.docs.forEach((e,t)=>{this._addString(e,t)}):this.docs.forEach((e,t)=>{this._addObject(e,t)}),this.norm.clear())}add(e){let t=this.size();zi(e)?this._addString(e,t):this._addObject(e,t)}removeAt(e){this.records.splice(e,1);for(let t=e,n=this.size();t<n;t+=1)this.records[t].i-=1}getValueForItemAtKeyId(e,t){return e[this._keysMap[t]]}size(){return this.records.length}_addString(e,t){if(!ti(e)||Yd(e))return;let n={v:e,i:t,n:this.norm.get(e)};this.records.push(n)}_addObject(e,t){let n={i:t,$:{}};this.keys.forEach((s,r)=>{let a=s.getFn?s.getFn(e):this.getFn(e,s.path);if(!!ti(a)){if(ps(a)){let o=[],l=[{nestedArrIndex:-1,value:a}];for(;l.length;){let{nestedArrIndex:c,value:h}=l.pop();if(!!ti(h))if(zi(h)&&!Yd(h)){let u={v:h,i:c,n:this.norm.get(h)};o.push(u)}else ps(h)&&h.forEach((u,d)=>{l.push({nestedArrIndex:d,value:u})})}n.$[r]=o}else if(zi(a)&&!Yd(a)){let o={v:a,n:this.norm.get(a)};n.$[r]=o}}}),this.records.push(n)}toJSON(){return{keys:this.keys,records:this.records}}};function Av(i,e,{getFn:t=st.getFn,fieldNormWeight:n=st.fieldNormWeight}={}){let s=new Yc({getFn:t,fieldNormWeight:n});return s.setKeys(i.map(xv)),s.setSources(e),s.create(),s}function pM(i,{getFn:e=st.getFn,fieldNormWeight:t=st.fieldNormWeight}={}){let{keys:n,records:s}=i,r=new Yc({getFn:e,fieldNormWeight:t});return r.setKeys(n),r.setIndexRecords(s),r}function Qc(i,{errors:e=0,currentLocation:t=0,expectedLocation:n=0,distance:s=st.distance,ignoreLocation:r=st.ignoreLocation}={}){let a=e/i.length;if(r)return a;let o=Math.abs(n-t);return s?a+o/s:o?1:a}function mM(i=[],e=st.minMatchCharLength){let t=[],n=-1,s=-1,r=0;for(let a=i.length;r<a;r+=1){let o=i[r];o&&n===-1?n=r:!o&&n!==-1&&(s=r-1,s-n+1>=e&&t.push([n,s]),n=-1)}return i[r-1]&&r-n>=e&&t.push([n,r-1]),t}var Ir=32;function gM(i,e,t,{location:n=st.location,distance:s=st.distance,threshold:r=st.threshold,findAllMatches:a=st.findAllMatches,minMatchCharLength:o=st.minMatchCharLength,includeMatches:l=st.includeMatches,ignoreLocation:c=st.ignoreLocation}={}){if(e.length>Ir)throw new Error(sM(Ir));let h=e.length,u=i.length,d=Math.max(0,Math.min(n,u)),p=r,g=d,v=o>1||l,m=v?Array(u):[],f;for(;(f=i.indexOf(e,g))>-1;){let C=Qc(e,{currentLocation:f,expectedLocation:d,distance:s,ignoreLocation:c});if(p=Math.min(C,p),g=f+h,v){let R=0;for(;R<h;)m[f+R]=1,R+=1}}g=-1;let x=[],A=1,y=h+u,T=1<<h-1;for(let C=0;C<h;C+=1){let R=0,b=y;for(;R<b;)Qc(e,{errors:C,currentLocation:d+b,expectedLocation:d,distance:s,ignoreLocation:c})<=p?R=b:y=b,b=Math.floor((y-R)/2+R);y=b;let S=Math.max(1,d-b+1),D=a?u:Math.min(d+b,u)+h,N=Array(D+2);N[D+1]=(1<<C)-1;for(let B=D;B>=S;B-=1){let W=B-1,G=t[i.charAt(W)];if(v&&(m[W]=+!!G),N[B]=(N[B+1]<<1|1)&G,C&&(N[B]|=(x[B+1]|x[B])<<1|1|x[B+1]),N[B]&T&&(A=Qc(e,{errors:C,currentLocation:W,expectedLocation:d,distance:s,ignoreLocation:c}),A<=p)){if(p=A,g=W,g<=d)break;S=Math.max(1,2*d-g)}}if(Qc(e,{errors:C+1,currentLocation:d,expectedLocation:d,distance:s,ignoreLocation:c})>p)break;x=N}let M={isMatch:g>=0,score:Math.max(.001,A)};if(v){let C=mM(m,o);C.length?l&&(M.indices=C):M.isMatch=!1}return M}function vM(i){let e={};for(let t=0,n=i.length;t<n;t+=1){let s=i.charAt(t);e[s]=(e[s]||0)|1<<n-t-1}return e}var qd=class{constructor(e,{location:t=st.location,threshold:n=st.threshold,distance:s=st.distance,includeMatches:r=st.includeMatches,findAllMatches:a=st.findAllMatches,minMatchCharLength:o=st.minMatchCharLength,isCaseSensitive:l=st.isCaseSensitive,ignoreLocation:c=st.ignoreLocation}={}){if(this.options={location:t,threshold:n,distance:s,includeMatches:r,findAllMatches:a,minMatchCharLength:o,isCaseSensitive:l,ignoreLocation:c},this.pattern=l?e:e.toLowerCase(),this.chunks=[],!this.pattern.length)return;let h=(d,p)=>{this.chunks.push({pattern:d,alphabet:vM(d),startIndex:p})},u=this.pattern.length;if(u>Ir){let d=0,p=u%Ir,g=u-p;for(;d<g;)h(this.pattern.substr(d,Ir),d),d+=Ir;if(p){let v=u-Ir;h(this.pattern.substr(v),v)}}else h(this.pattern,0)}searchIn(e){let{isCaseSensitive:t,includeMatches:n}=this.options;if(t||(e=e.toLowerCase()),this.pattern===e){let g={isMatch:!0,score:0};return n&&(g.indices=[[0,e.length-1]]),g}let{location:s,distance:r,threshold:a,findAllMatches:o,minMatchCharLength:l,ignoreLocation:c}=this.options,h=[],u=0,d=!1;this.chunks.forEach(({pattern:g,alphabet:v,startIndex:m})=>{let{isMatch:f,score:x,indices:A}=gM(e,g,v,{location:s+m,distance:r,threshold:a,findAllMatches:o,minMatchCharLength:l,includeMatches:n,ignoreLocation:c});f&&(d=!0),u+=x,f&&A&&(h=[...h,...A])});let p={isMatch:d,score:d?u/this.chunks.length:1};return d&&n&&(p.indices=h),p}},ms=class{constructor(e){this.pattern=e}static isMultiMatch(e){return _v(e,this.multiRegex)}static isSingleMatch(e){return _v(e,this.singleRegex)}search(){}};function _v(i,e){let t=i.match(e);return t?t[1]:null}var Sv=class extends ms{constructor(e){super(e)}static get type(){return"exact"}static get multiRegex(){return/^="(.*)"$/}static get singleRegex(){return/^=(.*)$/}search(e){let t=e===this.pattern;return{isMatch:t,score:t?0:1,indices:[0,this.pattern.length-1]}}},bv=class extends ms{constructor(e){super(e)}static get type(){return"inverse-exact"}static get multiRegex(){return/^!"(.*)"$/}static get singleRegex(){return/^!(.*)$/}search(e){let n=e.indexOf(this.pattern)===-1;return{isMatch:n,score:n?0:1,indices:[0,e.length-1]}}},Ev=class extends ms{constructor(e){super(e)}static get type(){return"prefix-exact"}static get multiRegex(){return/^\^"(.*)"$/}static get singleRegex(){return/^\^(.*)$/}search(e){let t=e.startsWith(this.pattern);return{isMatch:t,score:t?0:1,indices:[0,this.pattern.length-1]}}},Tv=class extends ms{constructor(e){super(e)}static get type(){return"inverse-prefix-exact"}static get multiRegex(){return/^!\^"(.*)"$/}static get singleRegex(){return/^!\^(.*)$/}search(e){let t=!e.startsWith(this.pattern);return{isMatch:t,score:t?0:1,indices:[0,e.length-1]}}},Mv=class extends ms{constructor(e){super(e)}static get type(){return"suffix-exact"}static get multiRegex(){return/^"(.*)"\$$/}static get singleRegex(){return/^(.*)\$$/}search(e){let t=e.endsWith(this.pattern);return{isMatch:t,score:t?0:1,indices:[e.length-this.pattern.length,e.length-1]}}},wv=class extends ms{constructor(e){super(e)}static get type(){return"inverse-suffix-exact"}static get multiRegex(){return/^!"(.*)"\$$/}static get singleRegex(){return/^!(.*)\$$/}search(e){let t=!e.endsWith(this.pattern);return{isMatch:t,score:t?0:1,indices:[0,e.length-1]}}},jd=class extends ms{constructor(e,{location:t=st.location,threshold:n=st.threshold,distance:s=st.distance,includeMatches:r=st.includeMatches,findAllMatches:a=st.findAllMatches,minMatchCharLength:o=st.minMatchCharLength,isCaseSensitive:l=st.isCaseSensitive,ignoreLocation:c=st.ignoreLocation}={}){super(e);this._bitapSearch=new qd(e,{location:t,threshold:n,distance:s,includeMatches:r,findAllMatches:a,minMatchCharLength:o,isCaseSensitive:l,ignoreLocation:c})}static get type(){return"fuzzy"}static get multiRegex(){return/^"(.*)"$/}static get singleRegex(){return/^(.*)$/}search(e){return this._bitapSearch.searchIn(e)}},Zd=class extends ms{constructor(e){super(e)}static get type(){return"include"}static get multiRegex(){return/^'"(.*)"$/}static get singleRegex(){return/^'(.*)$/}search(e){let t=0,n,s=[],r=this.pattern.length;for(;(n=e.indexOf(this.pattern,t))>-1;)t=n+r,s.push([n,t-1]);let a=!!s.length;return{isMatch:a,score:a?0:1,indices:s}}},Kd=[Sv,Zd,Ev,Tv,wv,Mv,bv,jd],Cv=Kd.length,xM=/ +(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/,yM="|";function AM(i,e={}){return i.split(yM).map(t=>{let n=t.trim().split(xM).filter(r=>r&&!!r.trim()),s=[];for(let r=0,a=n.length;r<a;r+=1){let o=n[r],l=!1,c=-1;for(;!l&&++c<Cv;){let h=Kd[c],u=h.isMultiMatch(o);u&&(s.push(new h(u,e)),l=!0)}if(!l)for(c=-1;++c<Cv;){let h=Kd[c],u=h.isSingleMatch(o);if(u){s.push(new h(u,e));break}}}return s})}var _M=new Set([jd.type,Zd.type]),Rv=class{constructor(e,{isCaseSensitive:t=st.isCaseSensitive,includeMatches:n=st.includeMatches,minMatchCharLength:s=st.minMatchCharLength,ignoreLocation:r=st.ignoreLocation,findAllMatches:a=st.findAllMatches,location:o=st.location,threshold:l=st.threshold,distance:c=st.distance}={}){this.query=null,this.options={isCaseSensitive:t,includeMatches:n,minMatchCharLength:s,findAllMatches:a,ignoreLocation:r,location:o,threshold:l,distance:c},this.pattern=t?e:e.toLowerCase(),this.query=AM(this.pattern,this.options)}static condition(e,t){return t.useExtendedSearch}searchIn(e){let t=this.query;if(!t)return{isMatch:!1,score:1};let{includeMatches:n,isCaseSensitive:s}=this.options;e=s?e:e.toLowerCase();let r=0,a=[],o=0;for(let l=0,c=t.length;l<c;l+=1){let h=t[l];a.length=0,r=0;for(let u=0,d=h.length;u<d;u+=1){let p=h[u],{isMatch:g,indices:v,score:m}=p.search(e);if(g){if(r+=1,o+=m,n){let f=p.constructor.type;_M.has(f)?a=[...a,...v]:a.push(v)}}else{o=0,r=0,a.length=0;break}}if(r){let u={isMatch:!0,score:o/r};return n&&(u.indices=a),u}}return{isMatch:!1,score:1}}},Jd=[];function SM(...i){Jd.push(...i)}function $d(i,e){for(let t=0,n=Jd.length;t<n;t+=1){let s=Jd[t];if(s.condition(i,e))return new s(i,e)}return new qd(i,e)}var qc={AND:"$and",OR:"$or"},ef={PATH:"$path",PATTERN:"$val"},tf=i=>!!(i[qc.AND]||i[qc.OR]),bM=i=>!!i[ef.PATH],EM=i=>!ps(i)&&pv(i)&&!tf(i),Dv=i=>({[qc.AND]:Object.keys(i).map(e=>({[e]:i[e]}))});function Pv(i,e,{auto:t=!0}={}){let n=s=>{let r=Object.keys(s),a=bM(s);if(!a&&r.length>1&&!tf(s))return n(Dv(s));if(EM(s)){let l=a?s[ef.PATH]:r[0],c=a?s[ef.PATTERN]:s[l];if(!zi(c))throw new Error(iM(l));let h={keyId:Qd(l),pattern:c};return t&&(h.searcher=$d(c,e)),h}let o={children:[],operator:r[0]};return r.forEach(l=>{let c=s[l];ps(c)&&c.forEach(h=>{o.children.push(n(h))})}),o};return tf(i)||(i=Dv(i)),n(i)}function TM(i,{ignoreFieldNorm:e=st.ignoreFieldNorm}){i.forEach(t=>{let n=1;t.matches.forEach(({key:s,norm:r,score:a})=>{let o=s?s.weight:null;n*=Math.pow(a===0&&o?Number.EPSILON:a,(o||1)*(e?1:r))}),t.score=n})}function MM(i,e){let t=i.matches;e.matches=[],!!ti(t)&&t.forEach(n=>{if(!ti(n.indices)||!n.indices.length)return;let{indices:s,value:r}=n,a={indices:s,value:r};n.key&&(a.key=n.key.src),n.idx>-1&&(a.refIndex=n.idx),e.matches.push(a)})}function wM(i,e){e.score=i.score}function CM(i,e,{includeMatches:t=st.includeMatches,includeScore:n=st.includeScore}={}){let s=[];return t&&s.push(MM),n&&s.push(wM),i.map(r=>{let{idx:a}=r,o={item:e[a],refIndex:a};return s.length&&s.forEach(l=>{l(r,o)}),o})}var Gs=class{constructor(e,t={},n){this.options={...st,...t},this.options.useExtendedSearch,this._keyStore=new vv(this.options.keys),this.setCollection(e,n)}setCollection(e,t){if(this._docs=e,t&&!(t instanceof Yc))throw new Error(nM);this._myIndex=t||Av(this.options.keys,this._docs,{getFn:this.options.getFn,fieldNormWeight:this.options.fieldNormWeight})}add(e){!ti(e)||(this._docs.push(e),this._myIndex.add(e))}remove(e=()=>!1){let t=[];for(let n=0,s=this._docs.length;n<s;n+=1){let r=this._docs[n];e(r,n)&&(this.removeAt(n),n-=1,s-=1,t.push(r))}return t}removeAt(e){this._docs.splice(e,1),this._myIndex.removeAt(e)}getIndex(){return this._myIndex}search(e,{limit:t=-1}={}){let{includeMatches:n,includeScore:s,shouldSort:r,sortFn:a,ignoreFieldNorm:o}=this.options,l=zi(e)?zi(this._docs[0])?this._searchStringList(e):this._searchObjectList(e):this._searchLogical(e);return TM(l,{ignoreFieldNorm:o}),r&&l.sort(a),fv(t)&&t>-1&&(l=l.slice(0,t)),CM(l,this._docs,{includeMatches:n,includeScore:s})}_searchStringList(e){let t=$d(e,this.options),{records:n}=this._myIndex,s=[];return n.forEach(({v:r,i:a,n:o})=>{if(!ti(r))return;let{isMatch:l,score:c,indices:h}=t.searchIn(r);l&&s.push({item:r,idx:a,matches:[{score:c,value:r,norm:o,indices:h}]})}),s}_searchLogical(e){let t=Pv(e,this.options),n=(o,l,c)=>{if(!o.children){let{keyId:u,searcher:d}=o,p=this._findMatches({key:this._keyStore.get(u),value:this._myIndex.getValueForItemAtKeyId(l,u),searcher:d});return p&&p.length?[{idx:c,item:l,matches:p}]:[]}let h=[];for(let u=0,d=o.children.length;u<d;u+=1){let p=o.children[u],g=n(p,l,c);if(g.length)h.push(...g);else if(o.operator===qc.AND)return[]}return h},s=this._myIndex.records,r={},a=[];return s.forEach(({$:o,i:l})=>{if(ti(o)){let c=n(t,o,l);c.length&&(r[l]||(r[l]={idx:l,item:o,matches:[]},a.push(r[l])),c.forEach(({matches:h})=>{r[l].matches.push(...h)}))}}),a}_searchObjectList(e){let t=$d(e,this.options),{keys:n,records:s}=this._myIndex,r=[];return s.forEach(({$:a,i:o})=>{if(!ti(a))return;let l=[];n.forEach((c,h)=>{l.push(...this._findMatches({key:c,value:a[h],searcher:t}))}),l.length&&r.push({idx:o,item:a,matches:l})}),r}_findMatches({key:e,value:t,searcher:n}){if(!ti(t))return[];let s=[];if(ps(t))t.forEach(({v:r,i:a,n:o})=>{if(!ti(r))return;let{isMatch:l,score:c,indices:h}=n.searchIn(r);l&&s.push({score:c,key:e,value:r,idx:a,norm:o,indices:h})});else{let{v:r,n:a}=t,{isMatch:o,score:l,indices:c}=n.searchIn(r);o&&s.push({score:l,key:e,value:r,norm:a,indices:c})}return s}};Gs.version="6.6.2";Gs.createIndex=Av;Gs.parseIndex=pM;Gs.config=st;Gs.parseQuery=Pv;SM(Rv);function Iv(i){let e=i.regex,t=e.concat(/[\p{L}_]/u,e.optional(/[\p{L}0-9_.-]*:/u),/[\p{L}0-9_.-]*/u),n=/[\p{L}0-9._:-]+/u,s={className:"symbol",begin:/&[a-z]+;|&#[0-9]+;|&#x[a-f0-9]+;/},r={begin:/\s/,contains:[{className:"keyword",begin:/#?[a-z_][a-z1-9_-]+/,illegal:/\n/}]},a=i.inherit(r,{begin:/\(/,end:/\)/}),o=i.inherit(i.APOS_STRING_MODE,{className:"string"}),l=i.inherit(i.QUOTE_STRING_MODE,{className:"string"}),c={endsWithParent:!0,illegal:/</,relevance:0,contains:[{className:"attr",begin:n,relevance:0},{begin:/=\s*/,relevance:0,contains:[{className:"string",endsParent:!0,variants:[{begin:/"/,end:/"/,contains:[s]},{begin:/'/,end:/'/,contains:[s]},{begin:/[^\s"'=<>`]+/}]}]}]};return{name:"HTML, XML",aliases:["html","xhtml","rss","atom","xjb","xsd","xsl","plist","wsf","svg"],case_insensitive:!0,unicodeRegex:!0,contains:[{className:"meta",begin:/<![a-z]/,end:/>/,relevance:10,contains:[r,l,o,a,{begin:/\[/,end:/\]/,contains:[{className:"meta",begin:/<![a-z]/,end:/>/,contains:[r,a,l,o]}]}]},i.COMMENT(/<!--/,/-->/,{relevance:10}),{begin:/<!\[CDATA\[/,end:/\]\]>/,relevance:10},s,{className:"meta",end:/\?>/,variants:[{begin:/<\?xml/,relevance:10,contains:[l]},{begin:/<\?[a-z][a-z0-9]+/}]},{className:"tag",begin:/<style(?=\s|>)/,end:/>/,keywords:{name:"style"},contains:[c],starts:{end:/<\/style>/,returnEnd:!0,subLanguage:["css","xml"]}},{className:"tag",begin:/<script(?=\s|>)/,end:/>/,keywords:{name:"script"},contains:[c],starts:{end:/<\/script>/,returnEnd:!0,subLanguage:["javascript","handlebars","xml"]}},{className:"tag",begin:/<>|<\/>/},{className:"tag",begin:e.concat(/</,e.lookahead(e.concat(t,e.either(/\/>/,/>/,/\s/)))),end:/\/?>/,contains:[{className:"name",begin:t,relevance:0,starts:c}]},{className:"tag",begin:e.concat(/<\//,e.lookahead(e.concat(t,/>/))),contains:[{className:"name",begin:t,relevance:0},{begin:/>/,relevance:0,endsParent:!0}]}]}}var RM=i=>({IMPORTANT:{scope:"meta",begin:"!important"},BLOCK_COMMENT:i.C_BLOCK_COMMENT_MODE,HEXCOLOR:{scope:"number",begin:/#(([0-9a-fA-F]{3,4})|(([0-9a-fA-F]{2}){3,4}))\b/},FUNCTION_DISPATCH:{className:"built_in",begin:/[\w-]+(?=\()/},ATTRIBUTE_SELECTOR_MODE:{scope:"selector-attr",begin:/\[/,end:/\]/,illegal:"$",contains:[i.APOS_STRING_MODE,i.QUOTE_STRING_MODE]},CSS_NUMBER_MODE:{scope:"number",begin:i.NUMBER_RE+"(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",relevance:0},CSS_VARIABLE:{className:"attr",begin:/--[A-Za-z_][A-Za-z0-9_-]*/}}),DM=["a","abbr","address","article","aside","audio","b","blockquote","body","button","canvas","caption","cite","code","dd","del","details","dfn","div","dl","dt","em","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","header","hgroup","html","i","iframe","img","input","ins","kbd","label","legend","li","main","mark","menu","nav","object","ol","p","q","quote","samp","section","span","strong","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","tr","ul","var","video"],PM=["any-hover","any-pointer","aspect-ratio","color","color-gamut","color-index","device-aspect-ratio","device-height","device-width","display-mode","forced-colors","grid","height","hover","inverted-colors","monochrome","orientation","overflow-block","overflow-inline","pointer","prefers-color-scheme","prefers-contrast","prefers-reduced-motion","prefers-reduced-transparency","resolution","scan","scripting","update","width","min-width","max-width","min-height","max-height"],IM=["active","any-link","blank","checked","current","default","defined","dir","disabled","drop","empty","enabled","first","first-child","first-of-type","fullscreen","future","focus","focus-visible","focus-within","has","host","host-context","hover","indeterminate","in-range","invalid","is","lang","last-child","last-of-type","left","link","local-link","not","nth-child","nth-col","nth-last-child","nth-last-col","nth-last-of-type","nth-of-type","only-child","only-of-type","optional","out-of-range","past","placeholder-shown","read-only","read-write","required","right","root","scope","target","target-within","user-invalid","valid","visited","where"],LM=["after","backdrop","before","cue","cue-region","first-letter","first-line","grammar-error","marker","part","placeholder","selection","slotted","spelling-error"],FM=["align-content","align-items","align-self","all","animation","animation-delay","animation-direction","animation-duration","animation-fill-mode","animation-iteration-count","animation-name","animation-play-state","animation-timing-function","backface-visibility","background","background-attachment","background-blend-mode","background-clip","background-color","background-image","background-origin","background-position","background-repeat","background-size","block-size","border","border-block","border-block-color","border-block-end","border-block-end-color","border-block-end-style","border-block-end-width","border-block-start","border-block-start-color","border-block-start-style","border-block-start-width","border-block-style","border-block-width","border-bottom","border-bottom-color","border-bottom-left-radius","border-bottom-right-radius","border-bottom-style","border-bottom-width","border-collapse","border-color","border-image","border-image-outset","border-image-repeat","border-image-slice","border-image-source","border-image-width","border-inline","border-inline-color","border-inline-end","border-inline-end-color","border-inline-end-style","border-inline-end-width","border-inline-start","border-inline-start-color","border-inline-start-style","border-inline-start-width","border-inline-style","border-inline-width","border-left","border-left-color","border-left-style","border-left-width","border-radius","border-right","border-right-color","border-right-style","border-right-width","border-spacing","border-style","border-top","border-top-color","border-top-left-radius","border-top-right-radius","border-top-style","border-top-width","border-width","bottom","box-decoration-break","box-shadow","box-sizing","break-after","break-before","break-inside","caption-side","caret-color","clear","clip","clip-path","clip-rule","color","column-count","column-fill","column-gap","column-rule","column-rule-color","column-rule-style","column-rule-width","column-span","column-width","columns","contain","content","content-visibility","counter-increment","counter-reset","cue","cue-after","cue-before","cursor","direction","display","empty-cells","filter","flex","flex-basis","flex-direction","flex-flow","flex-grow","flex-shrink","flex-wrap","float","flow","font","font-display","font-family","font-feature-settings","font-kerning","font-language-override","font-size","font-size-adjust","font-smoothing","font-stretch","font-style","font-synthesis","font-variant","font-variant-caps","font-variant-east-asian","font-variant-ligatures","font-variant-numeric","font-variant-position","font-variation-settings","font-weight","gap","glyph-orientation-vertical","grid","grid-area","grid-auto-columns","grid-auto-flow","grid-auto-rows","grid-column","grid-column-end","grid-column-start","grid-gap","grid-row","grid-row-end","grid-row-start","grid-template","grid-template-areas","grid-template-columns","grid-template-rows","hanging-punctuation","height","hyphens","icon","image-orientation","image-rendering","image-resolution","ime-mode","inline-size","isolation","justify-content","left","letter-spacing","line-break","line-height","list-style","list-style-image","list-style-position","list-style-type","margin","margin-block","margin-block-end","margin-block-start","margin-bottom","margin-inline","margin-inline-end","margin-inline-start","margin-left","margin-right","margin-top","marks","mask","mask-border","mask-border-mode","mask-border-outset","mask-border-repeat","mask-border-slice","mask-border-source","mask-border-width","mask-clip","mask-composite","mask-image","mask-mode","mask-origin","mask-position","mask-repeat","mask-size","mask-type","max-block-size","max-height","max-inline-size","max-width","min-block-size","min-height","min-inline-size","min-width","mix-blend-mode","nav-down","nav-index","nav-left","nav-right","nav-up","none","normal","object-fit","object-position","opacity","order","orphans","outline","outline-color","outline-offset","outline-style","outline-width","overflow","overflow-wrap","overflow-x","overflow-y","padding","padding-block","padding-block-end","padding-block-start","padding-bottom","padding-inline","padding-inline-end","padding-inline-start","padding-left","padding-right","padding-top","page-break-after","page-break-before","page-break-inside","pause","pause-after","pause-before","perspective","perspective-origin","pointer-events","position","quotes","resize","rest","rest-after","rest-before","right","row-gap","scroll-margin","scroll-margin-block","scroll-margin-block-end","scroll-margin-block-start","scroll-margin-bottom","scroll-margin-inline","scroll-margin-inline-end","scroll-margin-inline-start","scroll-margin-left","scroll-margin-right","scroll-margin-top","scroll-padding","scroll-padding-block","scroll-padding-block-end","scroll-padding-block-start","scroll-padding-bottom","scroll-padding-inline","scroll-padding-inline-end","scroll-padding-inline-start","scroll-padding-left","scroll-padding-right","scroll-padding-top","scroll-snap-align","scroll-snap-stop","scroll-snap-type","scrollbar-color","scrollbar-gutter","scrollbar-width","shape-image-threshold","shape-margin","shape-outside","speak","speak-as","src","tab-size","table-layout","text-align","text-align-all","text-align-last","text-combine-upright","text-decoration","text-decoration-color","text-decoration-line","text-decoration-style","text-emphasis","text-emphasis-color","text-emphasis-position","text-emphasis-style","text-indent","text-justify","text-orientation","text-overflow","text-rendering","text-shadow","text-transform","text-underline-position","top","transform","transform-box","transform-origin","transform-style","transition","transition-delay","transition-duration","transition-property","transition-timing-function","unicode-bidi","vertical-align","visibility","voice-balance","voice-duration","voice-family","voice-pitch","voice-range","voice-rate","voice-stress","voice-volume","white-space","widows","width","will-change","word-break","word-spacing","word-wrap","writing-mode","z-index"].reverse();function Lv(i){let e=i.regex,t=RM(i),n={begin:/-(webkit|moz|ms|o)-(?=[a-z])/},s="and or not only",r=/@-?\w[\w]*(-\w+)*/,a="[a-zA-Z-][a-zA-Z0-9_-]*",o=[i.APOS_STRING_MODE,i.QUOTE_STRING_MODE];return{name:"CSS",case_insensitive:!0,illegal:/[=|'\$]/,keywords:{keyframePosition:"from to"},classNameAliases:{keyframePosition:"selector-tag"},contains:[t.BLOCK_COMMENT,n,t.CSS_NUMBER_MODE,{className:"selector-id",begin:/#[A-Za-z0-9_-]+/,relevance:0},{className:"selector-class",begin:"\\."+a,relevance:0},t.ATTRIBUTE_SELECTOR_MODE,{className:"selector-pseudo",variants:[{begin:":("+IM.join("|")+")"},{begin:":(:)?("+LM.join("|")+")"}]},t.CSS_VARIABLE,{className:"attribute",begin:"\\b("+FM.join("|")+")\\b"},{begin:/:/,end:/[;}{]/,contains:[t.BLOCK_COMMENT,t.HEXCOLOR,t.IMPORTANT,t.CSS_NUMBER_MODE,...o,{begin:/(url|data-uri)\(/,end:/\)/,relevance:0,keywords:{built_in:"url data-uri"},contains:[...o,{className:"string",begin:/[^)]/,endsWithParent:!0,excludeEnd:!0}]},t.FUNCTION_DISPATCH]},{begin:e.lookahead(/@/),end:"[{;]",relevance:0,illegal:/:/,contains:[{className:"keyword",begin:r},{begin:/\s/,endsWithParent:!0,excludeEnd:!0,relevance:0,keywords:{$pattern:/[a-z-]+/,keyword:s,attribute:PM.join(" ")},contains:[{begin:/[a-z-]+(?=:)/,className:"attribute"},...o,t.CSS_NUMBER_MODE]}]},{className:"selector-tag",begin:"\\b("+DM.join("|")+")\\b"}]}}function Fv(i){let e=i.regex,t={},n={begin:/\$\{/,end:/\}/,contains:["self",{begin:/:-/,contains:[t]}]};Object.assign(t,{className:"variable",variants:[{begin:e.concat(/\$[\w\d#@][\w\d_]*/,"(?![\\w\\d])(?![$])")},n]});let s={className:"subst",begin:/\$\(/,end:/\)/,contains:[i.BACKSLASH_ESCAPE]},r={begin:/<<-?\s*(?=\w+)/,starts:{contains:[i.END_SAME_AS_BEGIN({begin:/(\w+)/,end:/(\w+)/,className:"string"})]}},a={className:"string",begin:/"/,end:/"/,contains:[i.BACKSLASH_ESCAPE,t,s]};s.contains.push(a);let o={match:/\\"/},l={className:"string",begin:/'/,end:/'/},c={match:/\\'/},h={begin:/\$?\(\(/,end:/\)\)/,contains:[{begin:/\d+#[0-9a-f]+/,className:"number"},i.NUMBER_MODE,t]},u=["fish","bash","zsh","sh","csh","ksh","tcsh","dash","scsh"],d=i.SHEBANG({binary:`(${u.join("|")})`,relevance:10}),p={className:"function",begin:/\w[\w\d_]*\s*\(\s*\)\s*\{/,returnBegin:!0,contains:[i.inherit(i.TITLE_MODE,{begin:/\w[\w\d_]*/})],relevance:0},g=["if","then","else","elif","fi","for","while","until","in","do","done","case","esac","function","select"],v=["true","false"],m={match:/(\/[a-z._-]+)+/},f=["break","cd","continue","eval","exec","exit","export","getopts","hash","pwd","readonly","return","shift","test","times","trap","umask","unset"],x=["alias","bind","builtin","caller","command","declare","echo","enable","help","let","local","logout","mapfile","printf","read","readarray","source","type","typeset","ulimit","unalias"],A=["autoload","bg","bindkey","bye","cap","chdir","clone","comparguments","compcall","compctl","compdescribe","compfiles","compgroups","compquote","comptags","comptry","compvalues","dirs","disable","disown","echotc","echoti","emulate","fc","fg","float","functions","getcap","getln","history","integer","jobs","kill","limit","log","noglob","popd","print","pushd","pushln","rehash","sched","setcap","setopt","stat","suspend","ttyctl","unfunction","unhash","unlimit","unsetopt","vared","wait","whence","where","which","zcompile","zformat","zftp","zle","zmodload","zparseopts","zprof","zpty","zregexparse","zsocket","zstyle","ztcp"],y=["chcon","chgrp","chown","chmod","cp","dd","df","dir","dircolors","ln","ls","mkdir","mkfifo","mknod","mktemp","mv","realpath","rm","rmdir","shred","sync","touch","truncate","vdir","b2sum","base32","base64","cat","cksum","comm","csplit","cut","expand","fmt","fold","head","join","md5sum","nl","numfmt","od","paste","ptx","pr","sha1sum","sha224sum","sha256sum","sha384sum","sha512sum","shuf","sort","split","sum","tac","tail","tr","tsort","unexpand","uniq","wc","arch","basename","chroot","date","dirname","du","echo","env","expr","factor","groups","hostid","id","link","logname","nice","nohup","nproc","pathchk","pinky","printenv","printf","pwd","readlink","runcon","seq","sleep","stat","stdbuf","stty","tee","test","timeout","tty","uname","unlink","uptime","users","who","whoami","yes"];return{name:"Bash",aliases:["sh"],keywords:{$pattern:/\b[a-z][a-z0-9._-]+\b/,keyword:g,literal:v,built_in:[...f,...x,"set","shopt",...A,...y]},contains:[d,i.SHEBANG(),p,h,i.HASH_COMMENT_MODE,r,m,a,o,l,c,t]}}var Hi=Bs({mediaQueries:xo});function Uv(){let i=this.value;console.log(this),i&&(window.location.href=i)}function UM(i,e){let t=i,n=0;for(;t&&t!==e;)n+=t.offsetTop,t=t.offsetParent;return n}function Nv(i,e={}){let t=e.root||document.documentElement,n=e.duration!==void 0?e.duration:400,s=e.ease||"outQuart",r=e.onComplete,a=e.y||0,o=UM(i,t)-a;Re(t,{scrollTop:o,duration:n,ease:s,onComplete:r})}var Bv=class{constructor(e){this.$el=e,this.$modal=e.parentElement,this.$container=this.$modal.parentElement,this.$searchInput=e.querySelector("#docs-search-input"),this.$searchResults=e.querySelector("#docs-search-results"),this.$closeButton=e.querySelector("#docs-close-search"),this.searchList=[],this.fuse=null,this.isOpen=!1,this.timeout=null,this.trackingTimeout=null}createSearchItems(e,t=null,n=null){if(!e)return;let s=e.querySelectorAll(":scope > li");for(let r=0,a=s.length;r<a;r++){let o=s[r],l=o.querySelector("ul"),c=o.querySelector("a"),h=c.getAttribute("title"),u=c.getAttribute("href"),d=o.classList[2],p=n?n+' <span class="docs-breadcrumb-arrow">\uE0B1</span> '+t:t||h;this.searchList.push({href:u,title:h,path:p,themeColor:d}),this.createSearchItems(l,h,t)}}populateResults(e){let t=document.createElement("a");t.href=e.href,t.title=e.title,t.classList.add("docs-search-result"),t.classList.add("theme-color"),t.classList.add(e.themeColor),t.innerHTML=`
    <h2 class="text-s">${e.title}</h2>
    <p class="text-xs">${e.path}</p>
    `,this.$searchResults.appendChild(t)}highlightResult(e,t){this.timeout||!e||(this.timeout=setTimeout(()=>{this.$searchResults.querySelectorAll(".docs-search-result").forEach(s=>s.classList.remove("is-active")),e.classList.add("is-active"),t||e.scrollIntoView({block:"nearest",inline:"nearest"}),this.timeout=null}))}handleInput(){let e=this.$searchInput.value,t=this.$el.offsetHeight;if(this.$el.style.height="auto",e!==""){let s=this.fuse.search(e,{limit:40});this.$searchResults.innerHTML="",s.forEach(r=>this.populateResults(r.item)),this.highlightResult(this.$searchResults.firstElementChild),this.$closeButton.removeAttribute("disabled"),this.trackingTimeout&&clearTimeout(this.trackingTimeout),this.trackingTimeout=setTimeout(()=>{typeof gtag=="function"&&gtag("event","search",{search_term:e,results_count:this.$searchResults.childElementCount})},2e3)}else this.$searchResults.innerHTML="",this.$closeButton.setAttribute("disabled","true");let n=this.$el.offsetHeight;this.$el.style.height=t+"px",Re(this.$el,{height:n,ease:"outExpo",duration:350,onComplete:()=>{this.$el.style.height=""}})}open(){this.isOpen=!0,this.$searchInput.value="",this.$searchResults.innerHTML="",this.$closeButton.setAttribute("disabled","true"),H.set([this.$container,this.$el],{pointerEvents:"auto"}),Ke({defaults:{duration:300}}).add(this.$container,{"--overlay-opacity":1},0).add(this.$el,{y:[20,0],ease:wi({stiffness:200,damping:30}),duration:400},0).add(this.$modal,{opacity:[0,1]},0).init(),this.$searchInput.focus()}close(){this.isOpen=!1,H.set([this.$container,this.$el],{pointerEvents:"none"}),Ke({defaults:{duration:250}}).add(this.$container,{"--overlay-opacity":0},0).add(this.$modal,{opacity:0},0).init()}init(){document.querySelector("#toggle-search").removeAttribute("disabled"),H.set(this.$el,{pointerEvents:"none"}),this.createSearchItems(document.querySelector("#docs-sidebar nav > ul")),this.fuse=new Gs(this.searchList,{ignoreLocation:!0,keys:["title",{name:"path",weight:.5}]}),this.$searchInput.addEventListener("input",this),this.$searchInput.addEventListener("keydown",this),window.addEventListener("mousemove",this)}revert(){this.$searchInput.removeEventListener("input",this),this.$searchInput.removeEventListener("keydown",this),window.removeEventListener("mousemove",this)}handleEvent(e){let t=e.type,n=e.target;if(this.isOpen){if(t==="input"&&this.handleInput(),t==="mousemove"){let s=n.closest(".docs-search-result:not(.is-active)");s&&this.highlightResult(s,!0)}if(t==="keydown"){e.key==="Escape"&&this.close();let s=this.$el.querySelector(".docs-search-result.is-active");if(s)if(e.key==="ArrowUp"){let r=s.previousElementSibling;r&&this.highlightResult(r)}else if(e.key==="ArrowDown"){let r=s.nextElementSibling;r&&this.highlightResult(r)}else e.key==="Enter"&&s.click()}}}},Ov=class{constructor(e){this.$el=e,this.ulsMap=new Map,this.$nav=e.querySelector(".sidebar-nav"),this.$navItems=e.querySelectorAll(".docs-nav-item"),this.$uls=e.querySelectorAll("ul.docs-nav-item")}revert(){this.$el=null,this.ulsMap.clear(),this.$navItems=null,this.$uls=null}select(e){let t=this.$el.querySelector(`.docs-link[data-id="${e}"]`)||document.querySelector(`.docs-link[data-id="${e}"]`);if(!t)return console.warn(`No matching element with data-id "${e}" in sidebar`);let n=t.parentElement,s=this.$nav.scrollTop,r=document.querySelector("#toggle-sidebar span");r.innerHTML=t.getAttribute("title"),this.$uls.forEach(u=>this.ulsMap.set(u,{a:u.offsetHeight,b:0})),H.set(this.$uls[0],{position:"fixed",y:-s}),this.$navItems.forEach(u=>{u.style.removeProperty("height"),u.classList.remove("is-active")});let a=n;for(;a;){let u=a.classList;if(u.contains("docs-nav-item")&&u.add("is-active"),u.contains("docs-links-chapter"))break;a=a.parentElement}this.ulsMap.forEach((u,d)=>u.b=d.offsetHeight);let o=this.$nav.scrollTop,l=350,c=Ke({defaults:{ease:"inOutQuad"}}),h=!!s;return this.ulsMap.forEach((u,d)=>{let p=u.a===u.b;!h&&!p&&(h=!0),c.add(d,{composition:"blend",height:[u.a,u.b],ease:"inOutExpo",duration:h?l:0,onComplete:H.cleanInlineStyles},0)}),h?(c.add(this.$uls[0],{y:-o,duration:l,modifier:H.round(0)},0),c.add(this.$nav,{scrollTop:s,duration:l,modifier:H.round(0)},0),c.set(this.$uls[0],{position:"relative",y:0}),c.init().then()):H.set(this.$uls[0],{position:"relative",y:0}).then()}},kv=class{constructor(e){this.$el=e,this.$demos=H.$("#docs-demos")[0],this.highlightCode(),Hi.add(t=>(t.matches.minL&&(this.pathAnimation=new Hv),()=>{this.pathAnimation&&this.pathAnimation.revert()})),this.interactionTimer=Bn({duration:150,onUpdate:()=>{this.pathAnimation&&this.pathAnimation.updateConnectors()}}),document.addEventListener("click",this,!1),document.addEventListener("scroll",this,!1),this.$demos.addEventListener("scroll",this,!1)}handleCodeTabClick(e){let t=e.dataset.language,n=this.$el.querySelector(".code-preview-content"),s=this.$el.querySelectorAll(".code-preview-button"),r=this.$el.querySelectorAll(".code-editor pre");s.forEach(a=>a.classList.remove("is-active")),r.forEach(a=>a.classList.remove("is-active")),n.querySelectorAll(`[data-language="${t}"]`).forEach(a=>{a.classList.add("is-active")})}revert(){document.removeEventListener("click",this),document.removeEventListener("scroll",this,!1),this.$demos.removeEventListener("scroll",this,!1),this.pathAnimation&&this.pathAnimation.revert(),this.interactionTimer.revert()}highlightCode(){this.$el.classList.add("is-highlighted");let e=this.$el.querySelectorAll("code");for(let s=0;s<e.length;s++){let r=e[s];if(Ri.highlightElement(r),r.classList.contains("language-undefined")){let a=Ri.highlight(r.innerHTML,{language:"javascript"});r.innerHTML=a.value,r.classList.remove("language-undefined"),r.classList.add("language-javascript")}}let t=this.$el.getElementsByTagName("pre");for(let s=0;s<t.length;s++){let r=t[s];if(!r.innerHTML.includes("\u2502")&&!r.innerHTML.includes("\u2500")){let a=r.getElementsByTagName("code")[0].innerText,o=new Ea(a);r.appendChild(o.$el)}}let n=this.$el.querySelectorAll("table");for(let s=0;s<n.length;s++)uv(n[s])}async select(e){let n=document.querySelector(`.docs-link[data-id="${e}"]`).href;try{let s=window.scrollY,a=await(await fetch(n)).text(),c=new DOMParser().parseFromString(a,"text/html");document.title=c.title;let h=c.body.querySelector("#docs-info");h&&(this.$el.innerHTML=h.innerHTML);let u=parseFloat(H.get(document.body,"--site-header-height","px")),d=!Hi.matches.minM&&s>=u?-u:0;Nv(document.body,{y:d,duration:0}),this.highlightCode(),this.currentUrl=n;let p=["#docs-info"];return this.pathAnimation&&this.pathAnimation.updateConnectors()&&p.push("#path-animation"),Re(p,{opacity:1,duration:75,ease:"out"}),{id:e,url:n}}catch(s){console.warn(`Something went wrong while trying to load the URL ${n}.`,s)}}handleEvent(e){let t=e.type,n=e.target;if(t==="click"){let s=n.closest(".code-preview-button");s&&this.handleCodeTabClick(s)}t==="scroll"&&this.interactionTimer.restart()}},zv=class{constructor(e){this.$demosContainer=e,this.interactionTimer=Bn({duration:150,onComplete:()=>e.classList.remove("is-scrolling")}),this.$demosContainer.addEventListener("scroll",()=>{e.classList.add("is-scrolling"),this.interactionTimer.restart()}),this.demosCode=window.demos,this.$header=H.$("#site-header-content")[0],this.demosElements=H.$(".docs-demo"),this.map=new Map,Hi.add(t=>{if(t.matches.minL){let n=e.querySelector(".docs-demo.is-active");n&&this.scrollTo(n.dataset.id,!0,0)}else{let n=t.matches.minM?16:12;t.data.draggable=us(e,{container:()=>[-(window.innerHeight-e.offsetHeight),window.innerWidth-e.offsetWidth,0,0],containerPadding:[n,n,n,n]}),t.data.draggable.progressX=t.matches.minM?0:1,t.data.draggable.progressY=1,H.set(e,{transformOrigin:t.matches.minM?"0% 100%":"100% 100%"})}return t.add("minimiseDemos",n=>{let s=e.querySelector(".docs-demo.is-active");if(t.matches.minL||e.classList.contains("is-small")){s&&this.play(s.dataset.id);return}let r=t.matches.minM?.6:.3,a=t.data.draggable;H.set(e,{cursor:"zoom-in"}),e.classList.add("is-small"),a&&(Re(t.data.draggable,{progressX:t.matches.minM?0:1,progressY:1,ease:"outElastic(.9, 1.25)",duration:n?0:750}),Re(e,{scale:r,ease:"outElastic(1, 1)",duration:n?0:650,onComplete:()=>{let o=e.querySelector(".docs-demo.is-active");o&&this.scrollTo(o.dataset.id,!0,0)}}))}),t.add("maximiseDemos",()=>{t.matches.minL||!e.classList.contains("is-small")||(H.set(e,{cursor:"grab"}),Re(e,{scale:1,ease:"outElastic(1, 1.5)",duration:450,onComplete:()=>{let n=e.querySelector(".docs-demo.is-active"),s=n&&n.querySelector(".animejs-onscroll-debug"),r=n&&n.querySelector(".draggable");if(s||r){let a=n.dataset.id;this.cleanup(a),this.play(a)}}}),e.classList.remove("is-small"))}),t.methods.minimiseDemos(!0),()=>{e.classList.remove("is-small"),t.data.draggable&&t.data.draggable.revert()}}),document.addEventListener("click",this,!1)}async fetch(){let e='<article class="docs-demo docs-demo-placeholder"><header class="docs-demo-header"><h2 class="text-ui"></h2></header><div class="docs-demo-content"><div class="docs-demo-html docs-demo-template"></div></div></article>';this.$demosContainer.classList.add("is-loading");let t="";for(let l=0;l<8;l++)t+=e;let n=document.createElement("div");n.classList.add("demos-placeholder"),n.innerHTML=t,this.$demosContainer.appendChild(n);let s=H.get(document.body,"--hex-bg-2"),r=H.get(document.body,"--hex-bg-3"),a=[s,r,s],o=Ke().add(".docs-demo-placeholder",{backgroundColor:a,duration:800,loop:!0},me(75));return await fetch(window.paths.demos).then(l=>l.text()).then(l=>{let c=document.createElement("div");c.innerHTML=l;let h=c.querySelectorAll("script");h.forEach(d=>d.remove());let u=c.querySelectorAll("article");return Re(".docs-demo-placeholder",{opacity:0,duration:250,delay:me(40,{start:100}),onComplete:()=>{o.revert(),n.style.zIndex="0",this.$demosContainer.classList.remove("is-loading")}}),u.forEach(d=>this.$demosContainer.appendChild(d)),h.forEach(d=>{let p=document.createElement("script");p.textContent=d.textContent,document.body.appendChild(p)}),this.demosElements=H.$(".docs-demo:not(.docs-demo-placeholder"),this.map=new Map(this.demosElements.map((d,p)=>{let g=d.dataset.id,v=d.querySelector(".docs-demo-live"),m=v.querySelector(".viewer"),f=Bs({root:v});return new IntersectionObserver(A=>{A.forEach(y=>{let T=y.target;y.isIntersecting?(T.classList.remove("is-hidden"),m&&!d.classList.contains("has-viewer")&&(this.play(g,!0),this.cleanup(g))):T.classList.add("is-hidden")})},{threshold:0}).observe(d),[g,{$el:d,$content:d.querySelector(".docs-demo-content"),$template:d.querySelector(".docs-demo-template"),$live:v,code:this.demosCode[g],scope:f}]})),this})}revert(){this.$demosContainer=null,this.demosCode=null,this.$header=null,this.demosElements.length=0,this.unselect(),this.map.clear(),document.removeEventListener("click",this)}cleanup(e){let t=this.map.get(e),n=t.$live,s=n.querySelector("iframe");t.scope.revert(),t.$live.classList.contains("avoid-cleanup")||(t.$live.innerHTML=t.$template.innerHTML),s&&(n.style.width="100%",s.parentNode&&s.parentNode.removeChild(s))}play(e,t,n){let s=this.map.get(e);if(t||s.$el.classList.contains("is-active")){n||this.cleanup(e);let r=s.$live;if(r.querySelector(".iframe-content")){let a=s.$el,o=document.createElement("iframe"),l=r.innerHTML;r.innerHTML="",r.appendChild(o),r.style.opacity=.001,setTimeout(()=>{try{let c=a.querySelector(".docs-demo-js"),h=o.contentWindow.document;h.open(),h.write("<!DOCTYPE html><html><head></head><body></body></html>"),h.close(),h.documentElement.style.background="var(--hex-current-3)",h.body.style.background="var(--hex-current-3)",document.querySelectorAll('link[rel="stylesheet"], style').forEach(p=>{try{let g=p.cloneNode(!0);h.head.appendChild(g)}catch(g){console.warn("Error copying style:",g)}});let d=h.createElement("meta");d.setAttribute("name","viewport"),d.setAttribute("content","width=device-width, initial-scale=1.0"),h.head.appendChild(d),h.body.innerHTML=l,h.body.classList.add("docs-demo-html","docs-demo-live","theme-color"),a.classList[2]&&h.body.classList.add(a.classList[2]),setTimeout(()=>{try{let p=h.createElement("script");p.type="module",p.textContent=c.value,h.body.appendChild(p)}catch(p){console.error("Error adding script to iframe:",p)}r.style.opacity=1},50)}catch(c){console.error("Error setting up iframe:",c),r.style.opacity=1}},66)}else s.scope.add(a=>s.code(a,Re,Ke,Bn,fo,us,Bs,Tr,sn,ui,wi,me,H,$n,cg,Cg,dv))}}unselectDemo(e){let t=this.map.get(e);this.cleanup(e),t.$el.classList.remove("is-active")}unselect(){H.$(".docs-demo.is-active").forEach(t=>this.unselectDemo(t.dataset.id))}scrollTo(e,t=!1,n=350,s){let r=this.map.get(e);if(!r)return s?s():!1;let a=r.$el;a.classList.add("is-active");let o=!n,l=!a.classList.contains("is-hidden"),c=Hi.matches.minL?this.$header.offsetHeight-this.$demosContainer.offsetTop:0,h=a,u=c,d=n;if(o)d=0;else if(l){let p=a.previousElementSibling,g=a.nextElementSibling,v=this.$demosContainer.offsetHeight,m=a.offsetHeight,f=v>m*2,A=a.getBoundingClientRect().top<c;if(!t)if(!f||A)d=n*.75;else if(p&&p.classList.contains("is-hidden"))h=p,d=n*.5;else if(g&&g.classList.contains("is-hidden"))h=g,u=c+v-m,d=n*.75;else return s?s():!1}Nv(h,{root:this.$demosContainer,y:u,duration:d,onComplete:()=>s?s():!1})}async select(e,t,n){return this.unselect(),H.remove("#docs-info"),Re(["#docs-info","#path-animation"],{opacity:0,duration:75,ease:"in"}),new Promise(s=>{this.scrollTo(e,t,n,s)})}handleEvent(e){let t=e.type,n=e.target;if(t==="click"){let s=n.closest(".demo-reload-button");s&&this.play(s.dataset.id)}}},Hv=class{constructor(){let e=document.createElement("div");e.innerHTML=`
    <svg id="path-animation" style="pointer-events: none; position: fixed; z-index: 105; left: 0; top: 0; width: 100%; height: 100%;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 0 0">
      <polyline fill="none" fill-rule="evenodd" stroke-width="1" stroke-linejoin="round" stroke="" points="0 0 32 0 32 100 64 100"/>
    </svg>
    `,this.$svg=e.firstElementChild,this.$path=this.$svg.querySelector("polyline"),this.path=fo(this.$path,{opacity:100}),this.resize(),document.body.append(this.$svg),window.addEventListener("resize",this,!1)}revert(){this.path.revert(),window.removeEventListener("resize",this,!1),document.body.contains(this.$svg)&&document.body.removeChild(this.$svg)}updateConnectors(){let e=document.querySelector(".docs-demo.is-active"),t=document.querySelector(".code-preview"),n=e&&e.classList.contains("is-hidden");if(n?this.path.opacity(0):this.path.opacity(1),e&&t){let s=e.getBoundingClientRect(),r=t.getBoundingClientRect(),a=72,o=104,l=s.top;l<a&&l>-a?l=a:l<=-a?(l<=-a-61&&this.path.opacity(0),l+=a*2):n||this.path.opacity(1);let c=r.top,h=r.bottom;return c<a&&(c=a,h<o?this.path.opacity(0):this.path.opacity(1)),this.$path.setAttribute("stroke",`${H.get(t,"--hex-current-3")}`),this.updatePath(s.right-.5,l+26+.5,r.left-.5,c+26+.5),!0}else return!1}updatePath(e,t,n,s){this.$path.setAttribute("points",`${e} ${t} ${e+24} ${t} ${n-40} ${s} ${n} ${s}`)}resize(){let e=window.innerWidth,t=window.innerHeight;this.$svg.setAttribute("viewBox",`0 0 ${e} ${t}`),this.updateConnectors()}handleEvent(e){let{type:t}=e;t==="resize"&&this.resize()}},Gv=class{constructor(){let e=H.$(".docs-nav-item.is-active > a"),n=(e[e.length-1]||document.querySelector('.docs-link[data-id="docs"]')).dataset.id;this.$versionSelector=H.$("#docs-versions select")[0],this.$versionSelectorOptions=H.$("#docs-versions option"),this.$versionSelectorOptions[0].textContent=window.AnimeJS[0].version,this.sidebar=new Ov(document.querySelector("#docs-sidebar")),this.infos=new kv(document.querySelector("#docs-info")),this.demos=new zv(document.querySelector("#docs-demos")),this.search=new Bv(document.querySelector("#docs-search")),this.demos.fetch().then(r=>{r.select(n,!1,0),r.play(n),Re(["#docs-info","#path-animation"],{opacity:1,duration:75,ease:"inOut"}),this.updateNav(),this.search.init()}),Hi.add(r=>{let a=document.querySelector("#toggle-sidebar"),o=document.querySelector("#docs-sidebar");return r.add("openSidebar",()=>{o.classList.contains("is-active")||(H.get(o,"x")==="0px"&&H.set(o,{x:"-16rem"}),Ke({defaults:{duration:300,ease:"inOut(3)"}}).add(o,{x:"0rem",ease:"out(3)"},0).add("#docs",{"--overlay-opacity":1},0).add(a.querySelector("polyline"),{points:"13.25 9.25 10.75 12 13.25 14.75"},0),o.classList.add("is-active"),Hi.methods.minimiseDemos())}),r.add("closeSidebar",()=>{!o.classList.contains("is-active")||(Ke({defaults:{duration:300,ease:"inOut(3)"}}).add(o,{x:"-16rem"},0).add("#docs",{"--overlay-opacity":0},0).add(a.querySelector("polyline"),{points:"9.5 7.75 9.5 12 9.5 16.25"},0),o.classList.remove("is-active"))}),r.add("toggleSidebar",()=>{r.matches.minM||(o.classList.contains("is-active")?r.methods.closeSidebar():r.methods.openSidebar())}),a.addEventListener("click",r.methods.toggleSidebar),()=>{a.removeEventListener("click",r.methods.toggleSidebar),o.classList.remove("is-active")}});let s=window.location.href;history.replaceState({id:n,url:s},"",s),this.$versionSelector.addEventListener("change",Uv,!1),document.addEventListener("click",this,!1),document.addEventListener("pointerdown",this,!1),document.addEventListener("keydown",this,!1),window.addEventListener("popstate",this,!1)}revert(){this.sidebar.revert(),this.infos.revert(),this.demos.revert(),this.$versionSelector.removeEventListener("change",Uv,!1),document.removeEventListener("click",this,!1),document.removeEventListener("pointerdown",this,!1),document.removeEventListener("keydown",this,!1),window.removeEventListener("popstate",this,!1)}getNextEl(){let e=this.demos.$demosContainer.querySelector(".docs-demo.is-active");if(e){let t=e.nextElementSibling;if(t&&t.classList.contains("docs-demo"))return t}}getPrevEl(){let e=this.demos.$demosContainer.querySelector(".docs-demo.is-active");if(e){let t=e.previousElementSibling;if(t&&t.classList.contains("docs-demo"))return t}}updateNav(){let e=document.querySelector("#next-demo"),t=document.querySelector("#prev-demo"),n=this.getNextEl(),s=this.getPrevEl();n?e.removeAttribute("disabled"):e.setAttribute("disabled","true"),s?t.removeAttribute("disabled"):t.setAttribute("disabled","true")}async select(e,t){return this.sidebar.select(e),this.demos.select(e,t),this.updateNav(),this.infos.select(e).then(n=>(this.demos.play(e),n))}handleClick(e){let t=e.dataset.id;if(!t&&e.href){let n=document.querySelector(`.docs-link[href="${e.getAttribute("href")}"]`);n&&(t=n.dataset.id)}this.select(t,!!e.href).then(n=>{n&&(history.pushState(n,"",n.url),gtag("event","page_view",{page_title:document.title,page_location:window.location.href,page_path:window.location.pathname}))})}handleEvent(e){let t=e.type,n=e.target,s=e.metaKey;if(t==="click"){let r=n.closest("#toggle-sidebar"),a=document.getElementById("site-menu"),o=document.getElementById("docs-sidebar");if(a.classList.contains("is-active"))return;if(o.classList.contains("is-active")&&!o.contains(n)&&!r)return Hi.methods.closeSidebar(),e.preventDefault();let l=n.closest(".docs-demo:not(.is-active)");l&&this.handleClick(l);let c=n.closest(".docs-link");c&&(s||(e.preventDefault(),c.href!==location.href&&this.handleClick(c)));let h=n.closest("#docs-info a");if(h){let x=new URL(h.href).origin!==location.origin;!s&&!x&&(e.preventDefault(),this.handleClick(h))}n.closest("#toggle-search")&&this.search.open();let d=n.closest("#docs-search a");if(d&&(s||(e.preventDefault(),this.handleClick(d),this.search.close())),(n.closest("#docs-close-search")||n.id==="docs-search-container")&&this.search.close(),n.closest("#docs-demos.is-small")&&Hi.methods.maximiseDemos(),n.closest(".minimise-demo-button")&&Hi.methods.minimiseDemos(),n.closest("#next-demo")){let x=this.getNextEl();x&&this.handleClick(x)}if(n.closest("#prev-demo")){let x=this.getPrevEl();x&&this.handleClick(x)}}if(t==="pointerdown"&&n.closest("#docs-demos.is-small")&&Hi.methods.maximiseDemos(),t==="popstate"){let r=e.state;r&&this.select(r.id)}t==="keydown"&&s&&e.key==="k"&&(this.search.isOpen?this.search.close():this.search.open())}};function Vv(){Ri.registerLanguage("javascript",Xc),Ri.registerLanguage("xml",Iv),Ri.registerLanguage("css",Lv),Ri.registerLanguage("bash",Fv),new Gv}function NM(i){i.preventDefault();let e=i.ctrlKey;i.key==="g"&&e&&document.body.classList.toggle("show-grid")}function BM(i){let e=i.target,t=e.closest("#toggle-site-menu");t&&Oc.methods.toggleSiteMenu(t),!document.getElementById("site-menu").contains(e)&&!t&&Oc.methods.closeSiteMenu()}function Wv(){document.addEventListener("keyup",NM,!1),document.addEventListener("click",BM,!1)}var nf=class extends HTMLElement{constructor(){super()}static get observedAttributes(){return["path","goal"]}connectedCallback(){this.innerHTML=`
      <div class="box-heading">
        <h3>Funding goal</h3>
        <div class="funding-level-status"><span class="percents">0%</span></div>
      </div>
      <div class="chart">
        <div style="width: 0%" class="chart-bar theme-color-0"></div>
      </div>
      <div class="sponsors-list">Loading sponsors...</div>
      <p>
        Help the project survive, <sponsor-button><a href="https://github.com/sponsors/juliangarnier" target="_blank">become a sponsor</a></sponsor-button>.
      </p>
    `,this.$percents=this.querySelector(".percents"),this.$chartBar=this.querySelector(".chart-bar"),this.$sponsorsList=this.querySelector(".sponsors-list"),this.loadSponsors()}get path(){return this.getAttribute("path")||"github-sponsors"}get goal(){return this.getAttribute("goal")||"500"}async loadSponsors(){try{let e=await fetch(window.paths[this.path]);if(!e.ok)throw new Error(`HTTP error! status: ${e.status}`);let t=await e.text(),n=document.createElement("div");n.innerHTML=t;let s=n.querySelectorAll(".sponsor"),r=s.length,a=+this.goal,o=r>50?50:r,l=r/a*100+"%";this.$percents.innerHTML=l,this.$chartBar.style.width=l,this.$sponsorsList.innerHTML="";for(let c=0;c<o;c++)this.$sponsorsList.appendChild(s[c]);Ke().add(this.$chartBar,{width:{from:"0%"}}).add(this.$percents,{innerHTML:{from:"0%"},modifier:H.round(0)},0).add(this.$sponsorsList.querySelectorAll(".sponsor"),{opacity:{to:[0,1],duration:1500,ease:"linear"},scale:[{from:.9,to:1.2,duration:250},{to:1}],delay:me(1)},0).init()}catch(e){this.innerHTML=`Error loading sponsors: ${e.message}`}}};var sf=class extends HTMLElement{constructor(){super()}connectedCallback(){this.url=this.getAttribute("url")||"",this.setupFormListener()}setupFormListener(){let e=this.querySelector("form"),t=this.querySelector(".email-signup-fields"),n=this.querySelector(".email-signup-success"),s=this.querySelector(".email-signup-error");e&&e.addEventListener("submit",r=>{r.preventDefault(),e.classList.add("is-pending");let a=this.querySelector('input[type="email"]'),o=a?a.value:"",l=new FormData;l.append("email",o),fetch(this.url,{method:"POST",body:l}).then(c=>{if(c.ok)n.classList.add("is-active"),e.classList.remove("is-pending"),t.classList.remove("is-active");else throw new Error("Network response was not ok")}).catch(c=>{s.classList.add("is-active"),e.classList.remove("is-pending"),t.classList.remove("is-active"),setTimeout(()=>{s.classList.remove("is-active"),e.classList.remove("is-pending"),t.classList.add("is-active")},2e4)})})}};customElements.get("sponsors-list")||customElements.define("sponsors-list",Tu);customElements.get("sponsor-button")||customElements.define("sponsor-button",ld);customElements.get("funding-level")||customElements.define("funding-level",nf);customElements.get("email-signup")||customElements.define("email-signup",sf);function OM(){let i=document.body.dataset.template;i.includes("home")&&cv(),i.includes("learn")&&hv(),i.includes("docs")&&(window.THREE={Scene:Ji,PerspectiveCamera:qt,WebGLRenderer:no,BoxGeometry:Ki,MeshBasicMaterial:ai,Mesh:Qt},Vv())}Wv();document.addEventListener("DOMContentLoaded",OM);})();
/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */
/**
 * anime.js - ESM
 * @version v4.1.2
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
