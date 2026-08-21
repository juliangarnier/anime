import{a as Tt,b as gn,c as $t}from"./chunks/chunk-WQVFBASJ.js";import{b as nt,c as fn,d as M,e as H,f as hn,g as Xe,h as xt,i as pn,j as it,k as qt,n as E,o as p,q as we,r as Jt,t as mn}from"./chunks/chunk-WXAKRBIO.js";import"./chunks/chunk-N6I4AEHZ.js";import"./chunks/chunk-FX45FQRC.js";import{$ as as,A as Ye,Aa as Yn,B as Mn,Ba as Vn,C as _,Ca as Ct,D as ot,Da as je,E as Ue,Ea as Wn,F as ns,Fa as jn,G as J,Ga as Kn,H as lt,Ha as Zn,I as j,Ia as Dt,J as bn,Ja as qn,K as Pn,Ka as Ke,L as ue,La as Jn,Ma as $n,N as Ne,Na as S,O as X,Oa as ei,P as be,Q as Ve,Qa as ti,R as de,Ra as si,S as is,Sa as ni,T as Oe,Ta as ii,U as _e,W as K,X as In,Y as We,Z as ct,_ as rs,a as Et,aa as Fn,b as rt,ba as Ln,c as Re,d as re,da as Bn,e as wt,ea as os,f as vn,fa as Rn,g as An,h as es,ha as Un,i as xn,ia as Nn,j as Tn,ja as On,k as me,ka as _n,l as En,la as kn,m as ts,ma as Hn,n as te,na as N,o as wn,oa as Gn,p as Sn,pa as zn,q as yn,r as Cn,s as ss,sa as ls,t as Dn,ta as fe,u as St,ua as Qn,v as at,w as Me,wa as Xn,x as yt,xa as cs,y as L,ya as us,z as q,za as ds}from"./chunks/chunk-CPVC3KGU.js";import"./chunks/chunk-DCANE7XH.js";var ri=new j,rr=new lt,ai=new j,Mt=class extends Ne{constructor(e=document.createElement("div")){super(),this.isCSS3DObject=!0,this.element=e,this.element.style.position="absolute",this.element.style.pointerEvents="auto",this.element.style.userSelect="none",this.element.setAttribute("draggable",!1),this.addEventListener("removed",function(){this.traverse(function(s){s.element instanceof s.element.ownerDocument.defaultView.Element&&s.element.parentNode!==null&&s.element.remove()})})}copy(e,s){return super.copy(e,s),this.element=e.element.cloneNode(!0),this}};var ge=new ue,ar=new ue,bt=class{constructor(e={}){let s=this,n,i,r,a,o={camera:{style:""},objects:new WeakMap},l=e.element!==void 0?e.element:document.createElement("div");l.style.overflow="hidden",this.domElement=l;let c=document.createElement("div");c.style.transformOrigin="0 0",c.style.pointerEvents="none",l.appendChild(c);let d=document.createElement("div");d.style.transformStyle="preserve-3d",c.appendChild(d),this.getSize=function(){return{width:n,height:i}},this.render=function(m,h){let x=h.projectionMatrix.elements[5]*a;h.view&&h.view.enabled?(c.style.transform=`translate( ${-h.view.offsetX*(n/h.view.width)}px, ${-h.view.offsetY*(i/h.view.height)}px )`,c.style.transform+=`scale( ${h.view.fullWidth/h.view.width}, ${h.view.fullHeight/h.view.height} )`):c.style.transform="",m.matrixWorldAutoUpdate===!0&&m.updateMatrixWorld(),h.parent===null&&h.matrixWorldAutoUpdate===!0&&h.updateMatrixWorld();let C,y;h.isOrthographicCamera&&(C=-(h.right+h.left)/2,y=(h.top+h.bottom)/2);let B=h.view&&h.view.enabled?h.view.height/h.view.fullHeight:1,F=h.isOrthographicCamera?`scale( ${B} )scale(`+x+")translate("+u(C)+"px,"+u(y)+"px)"+f(h.matrixWorldInverse):`scale( ${B} )translateZ(`+x+"px)"+f(h.matrixWorldInverse),P=(h.isPerspectiveCamera?"perspective("+x+"px) ":"")+F+"translate("+r+"px,"+a+"px)";o.camera.style!==P&&(d.style.transform=P,o.camera.style=P),A(m,m,h,F)},this.setSize=function(m,h){n=m,i=h,r=n/2,a=i/2,l.style.width=m+"px",l.style.height=h+"px",c.style.width=m+"px",c.style.height=h+"px",d.style.width=m+"px",d.style.height=h+"px"};function u(m){return Math.abs(m)<1e-10?0:m}function f(m){let h=m.elements;return"matrix3d("+u(h[0])+","+u(-h[1])+","+u(h[2])+","+u(h[3])+","+u(h[4])+","+u(-h[5])+","+u(h[6])+","+u(h[7])+","+u(h[8])+","+u(-h[9])+","+u(h[10])+","+u(h[11])+","+u(h[12])+","+u(-h[13])+","+u(h[14])+","+u(h[15])+")"}function v(m){let h=m.elements;return"translate(-50%,-50%)"+("matrix3d("+u(h[0])+","+u(h[1])+","+u(h[2])+","+u(h[3])+","+u(-h[4])+","+u(-h[5])+","+u(-h[6])+","+u(-h[7])+","+u(h[8])+","+u(h[9])+","+u(h[10])+","+u(h[11])+","+u(h[12])+","+u(h[13])+","+u(h[14])+","+u(h[15])+")")}function g(m){m.isCSS3DObject&&(m.element.style.display="none");for(let h=0,x=m.children.length;h<x;h++)g(m.children[h])}function A(m,h,x,C){if(m.visible===!1){g(m);return}if(m.isCSS3DObject){let y=m.layers.test(x.layers)===!0,B=m.element;if(B.style.display=y===!0?"":"none",y===!0){m.onBeforeRender(s,h,x);let F;m.isCSS3DSprite?(ge.copy(x.matrixWorldInverse),ge.transpose(),m.rotation2D!==0&&ge.multiply(ar.makeRotationZ(m.rotation2D)),m.matrixWorld.decompose(ri,rr,ai),ge.setPosition(ri),ge.scale(ai),ge.elements[3]=0,ge.elements[7]=0,ge.elements[11]=0,ge.elements[15]=1,F=v(ge)):F=v(m.matrixWorld);let T=o.objects.get(m);if(T===void 0||T.style!==F){B.style.transform=F;let P={style:F};o.objects.set(m,P)}B.parentNode!==d&&d.appendChild(B),m.onAfterRender(s,h,x)}}for(let y=0,B=m.children.length;y<B;y++)A(m.children[y],h,x,C)}}};var ut=class extends Ne{constructor(e=document.createElement("div")){super(),this.isCSS2DObject=!0,this.element=e,this.element.style.position="absolute",this.element.style.userSelect="none",this.element.setAttribute("draggable",!1),this.center=new _(.5,.5),this.addEventListener("removed",function(){this.traverse(function(s){s.element instanceof s.element.ownerDocument.defaultView.Element&&s.element.parentNode!==null&&s.element.remove()})})}copy(e,s){return super.copy(e,s),this.element=e.element.cloneNode(!0),this.center=e.center,this}},Ze=new j,oi=new ue,li=new ue,ci=new j,ui=new j,Pt=class{constructor(e={}){let s=this,n,i,r,a,o={objects:new WeakMap},l=e.element!==void 0?e.element:document.createElement("div");l.style.overflow="hidden",this.domElement=l,this.getSize=function(){return{width:n,height:i}},this.render=function(g,A){g.matrixWorldAutoUpdate===!0&&g.updateMatrixWorld(),A.parent===null&&A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),oi.copy(A.matrixWorldInverse),li.multiplyMatrices(A.projectionMatrix,oi),d(g,g,A),v(g)},this.setSize=function(g,A){n=g,i=A,r=n/2,a=i/2,l.style.width=g+"px",l.style.height=A+"px"};function c(g){g.isCSS2DObject&&(g.element.style.display="none");for(let A=0,m=g.children.length;A<m;A++)c(g.children[A])}function d(g,A,m){if(g.visible===!1){c(g);return}if(g.isCSS2DObject){Ze.setFromMatrixPosition(g.matrixWorld),Ze.applyMatrix4(li);let h=Ze.z>=-1&&Ze.z<=1&&g.layers.test(m.layers)===!0,x=g.element;x.style.display=h===!0?"":"none",h===!0&&(g.onBeforeRender(s,A,m),x.style.transform="translate("+-100*g.center.x+"%,"+-100*g.center.y+"%)translate("+(Ze.x*r+r)+"px,"+(-Ze.y*a+a)+"px)",x.parentNode!==l&&l.appendChild(x),g.onAfterRender(s,A,m));let C={distanceToCameraSquared:u(m,g)};o.objects.set(g,C)}for(let h=0,x=g.children.length;h<x;h++)d(g.children[h],A,m)}function u(g,A){return ci.setFromMatrixPosition(g.matrixWorld),ui.setFromMatrixPosition(A.matrixWorld),ci.distanceToSquared(ui)}function f(g){let A=[];return g.traverseVisible(function(m){m.isCSS2DObject&&A.push(m)}),A}function v(g){let A=f(g).sort(function(h,x){if(h.renderOrder!==x.renderOrder)return x.renderOrder-h.renderOrder;let C=o.objects.get(h).distanceToCameraSquared,y=o.objects.get(x).distanceToCameraSquared;return C-y}),m=A.length;for(let h=0,x=A.length;h<x;h++)A[h].element.style.zIndex=m-h}}};var fs=class{constructor(e,s,n){this.$connector1=e,this.$connector2=s,this.$el=document.createElementNS("http://www.w3.org/2000/svg","polyline"),this.$el.setAttribute("points","0 0 32 0 64 32"),this.$el.style.stroke="var(--hex-fg-4)",this.$el.style.fill="none",this.$el.style.strokeWidth="1px",this.$el.style.strokeLinejoin="square",this.flipped=n,this.rect1=this.$connector1.getBoundingClientRect(),this.rect2=this.$connector2.getBoundingClientRect(),this.gap=4,this.x=0,this.y=0,this.targetX=0,this.targetY=0,this.renders=0}updatePoints(e,s,n,i,r,a){this.$el.setAttribute("points",`${e} ${s} ${n} ${i} ${r} ${a}`)}updateConnector1Dimensions(){this.rect1=this.$connector1.getBoundingClientRect()}updateCoords(){if(!this.renders){let r=this.$connector2.style.transform;if(r){let a=r.split(") translate(");if(a.length){let o=a[1].split(", ");o.length&&(this.targetX=parseFloat(o[0]),this.targetY=parseFloat(o[1]),!this.x&&!this.y&&(this.x=this.targetX,this.y=this.targetY))}}}this.x=p.lerp(this.x,this.targetX,.25),this.y=p.lerp(this.y,this.targetY,.25),this.renders++,this.renders>3&&(this.renders=0);let e=this.rect1.height/2+1,s=this.rect1.top,n=this.y,i=n+e-(s+e);if(this.flipped){let r=this.rect1.left-this.gap,a=s+e,o=this.x,l=n+e,c=Math.abs(i),d=r-o;c>d&&(c=Math.max(0,d));let u=o+c,f=a;this.updatePoints(r,a,u,f,o,l)}else{let r=this.gap+this.rect1.right,a=s+e,o=this.x,l=n+e,c=Math.abs(i),d=o-r;c>d&&(c=Math.max(0,d));let u=o-c,f=a;this.updatePoints(r,a,u,f,o,l)}}},It=class{constructor(e){let s=document.createElement("div");s.innerHTML=`
    <svg id="path-animation" viewBox="0 0 0 0"></svg>
    `,this.$el=s.firstElementChild,this.$path=this.$el.querySelector("polyline"),this.lines=[],this.$parent=e,this.$parent.appendChild(this.$el),this.updateDimensions()}createLine(e,s,n,i){let r=new fs(e,s,n);i&&r.$el.classList.add(i),this.$el.appendChild(r.$el),this.lines.push(r)}update(){for(let e=0,s=this.lines.length;e<s;e++)this.lines[e].updateCoords()}updateDimensions(){let e=this.$parent.offsetWidth,s=this.$parent.offsetHeight;this.$el.setAttribute("viewBox",`0 0 ${e} ${s}`),this.lines.forEach(n=>n.updateConnector1Dimensions())}};var Ft=class{constructor(e){this.debug=e,this.domViewportEl=document.getElementById("engine"),this.renderer=new ii({powerPreference:"high-performance",antialias:!1,alpha:!1,stencil:!1,depth:!1}),this.renderer.setPixelRatio(1),this.renderer.outputColorSpace=L,this.renderer.domElement.id="renderer",this.renderer.info.autoReset=!1,this.CSSRenderer=new bt,this.CSSRenderer.domElement.id="css-renderer",this.labelsRenderer=new Pt,this.labelsRenderer.domElement.id="labels-renderer",this.width=this.domViewportEl.offsetWidth,this.height=this.domViewportEl.offsetHeight,this.aspectRatio=this.width/this.height,this.lines=new It(this.labelsRenderer.domElement),this.scene=new ct,this.scene.background=new X(16777215),this.fov=40,this.camera=new We(this.fov,this.aspectRatio,1,1e3),this.$output=document.createElement("div");let s=String.raw;this.$output.innerHTML=s`
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

      <div id="drawable-demo" class="feature-demo">
        <div class="svg-tracks">
          <svg class="svg-track svg-track-bg" opacity=".4" viewBox="0 0 304 112"><g stroke="none" fill="none" fill-rule="evenodd"><path d="M189.142857,4 C227.456875,4 248.420457,4.00974888 256.864191,4.00974888 C263.817211,4.00974888 271.61219,3.69583517 274.986231,6.63061513 C276.382736,7.84531176 279.193529,11.3814152 280.479499,13.4815847 C281.719344,15.5064248 284.841964,20.3571626 275.608629,20.3571626 C265.817756,20.3571626 247.262478,19.9013915 243.955117,19.9013915 C239.27946,19.9013915 235.350655,24.7304885 228.6344,24.7304885 C224.377263,24.7304885 219.472178,21.0304113 214.535324,21.0304113 C207.18393,21.0304113 200.882842,30.4798911 194.124187,30.4798911 C186.992968,30.4798911 182.652552,23.6245972 173.457298,23.6245972 C164.83277,23.6245972 157.191045,31.5424105 157.191045,39.1815359 C157.191045,48.466779 167.088672,63.6623005 166.666679,66.9065088 C166.378668,69.1206889 155.842137,79.2568633 151.508744,77.8570506 C145.044576,75.7689355 109.126667,61.6405346 98.7556561,52.9785141 C96.4766876,51.0750861 89.3680347,39.5769094 83.4195005,38.5221785 C80.6048001,38.0231057 73.0179337,38.7426555 74.4158694,42.6956376 C76.7088819,49.1796531 86.3280337,64.1214904 87.1781062,66.9065088 C88.191957,70.2280995 86.4690152,77.0567847 82.2060607,79.2503488 C79.2489435,80.7719756 73.1324132,82.8858479 64.7015706,83.0708761 C55.1604808,83.2802705 44.4254811,80.401884 39.1722168,80.401884 C25.7762119,80.401884 24.3280517,89.1260466 22.476679,94.4501705 C21.637667,96.8629767 20.4337535,108 33.2301959,108 C37.8976087,108 45.0757044,107.252595 53.4789069,103.876424 C61.8821095,100.500252 122.090049,78.119656 128.36127,75.3523302 C141.413669,69.5926477 151.190142,68.4987755 147.018529,52.0784879 C143.007818,36.291544 143.396957,23.4057975 145.221196,19.6589263 C146.450194,17.1346449 148.420955,14.8552817 153.206723,15.7880203 C155.175319,16.1716965 155.097637,15.0525421 156.757598,11.3860986 C158.417558,7.71965506 161.842736,4.00974888 167.736963,4.00974888 C177.205308,4.00974888 184.938832,4 189.142857,4 Z" stroke="currentColor" stroke-width="6"></path></g></svg>
          <svg class="svg-track svg-track-higlight" viewBox="0 0 304 112"><g stroke="none" fill="none" fill-rule="evenodd"><path d="M189.142857,4 C227.456875,4 248.420457,4.00974888 256.864191,4.00974888 C263.817211,4.00974888 271.61219,3.69583517 274.986231,6.63061513 C276.382736,7.84531176 279.193529,11.3814152 280.479499,13.4815847 C281.719344,15.5064248 284.841964,20.3571626 275.608629,20.3571626 C265.817756,20.3571626 247.262478,19.9013915 243.955117,19.9013915 C239.27946,19.9013915 235.350655,24.7304885 228.6344,24.7304885 C224.377263,24.7304885 219.472178,21.0304113 214.535324,21.0304113 C207.18393,21.0304113 200.882842,30.4798911 194.124187,30.4798911 C186.992968,30.4798911 182.652552,23.6245972 173.457298,23.6245972 C164.83277,23.6245972 157.191045,31.5424105 157.191045,39.1815359 C157.191045,48.466779 167.088672,63.6623005 166.666679,66.9065088 C166.378668,69.1206889 155.842137,79.2568633 151.508744,77.8570506 C145.044576,75.7689355 109.126667,61.6405346 98.7556561,52.9785141 C96.4766876,51.0750861 89.3680347,39.5769094 83.4195005,38.5221785 C80.6048001,38.0231057 73.0179337,38.7426555 74.4158694,42.6956376 C76.7088819,49.1796531 86.3280337,64.1214904 87.1781062,66.9065088 C88.191957,70.2280995 86.4690152,77.0567847 82.2060607,79.2503488 C79.2489435,80.7719756 73.1324132,82.8858479 64.7015706,83.0708761 C55.1604808,83.2802705 44.4254811,80.401884 39.1722168,80.401884 C25.7762119,80.401884 24.3280517,89.1260466 22.476679,94.4501705 C21.637667,96.8629767 20.4337535,108 33.2301959,108 C37.8976087,108 45.0757044,107.252595 53.4789069,103.876424 C61.8821095,100.500252 122.090049,78.119656 128.36127,75.3523302 C141.413669,69.5926477 151.190142,68.4987755 147.018529,52.0784879 C143.007818,36.291544 143.396957,23.4057975 145.221196,19.6589263 C146.450194,17.1346449 148.420955,14.8552817 153.206723,15.7880203 C155.175319,16.1716965 155.097637,15.0525421 156.757598,11.3860986 C158.417558,7.71965506 161.842736,4.00974888 167.736963,4.00974888 C177.205308,4.00974888 184.938832,4 189.142857,4 Z" stroke="currentColor" stroke-width="2"></path></g></svg>
          <div class="svg-track">
            <div class="svg-car"></div>
          </div>
        </div>
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
    `,this.$output.classList.add("output"),this.$output.style.pointerEvents="none",this.CSSRenderer.domElement.appendChild(this.$output),this.domViewportEl.appendChild(this.renderer.domElement),this.domViewportEl.appendChild(this.CSSRenderer.domElement),this.domViewportEl.appendChild(this.labelsRenderer.domElement),this.updateDimensions(),this.debug.helpers&&this.scene.add(new ni(this.camera))}updateDimensions(){this.width=this.domViewportEl.offsetWidth&-2,this.height=this.domViewportEl.offsetHeight&-2,this.aspectRatio=this.width/this.height,this.camera.aspect=this.aspectRatio,this.camera.fov=this.fov*((this.height>=1e3?this.height:1e3)/1e3),this.camera.updateProjectionMatrix(),this.renderer.setSize(this.width,this.height),this.renderer.domElement.style.position="absolute",this.renderer.domElement.style.top="0px",this.renderer.domElement.style.left="0px",this.CSSRenderer.setSize(this.width,this.height),this.CSSRenderer.domElement.style.position="absolute",this.CSSRenderer.domElement.style.top="0px",this.CSSRenderer.domElement.style.left="0px",this.labelsRenderer.setSize(this.width,this.height),this.labelsRenderer.domElement.style.position="absolute",this.labelsRenderer.domElement.style.top="0px",this.labelsRenderer.domElement.style.left="0px",this.lines.updateDimensions(),this.debug.enabled&&this.debug.pixelsPanel.update(this.width*this.height,8e6)}};var Lt=class{constructor(e,s){this.ambientLight=new qn(16777215,2),this.directionalLight=new Dt(16777215,1),this.directionalLight.castShadow=!0;let n=16;if(this.directionalLight.shadow.mapSize.width=1024*8,this.directionalLight.shadow.mapSize.height=1024*8,this.directionalLight.shadow.camera.near=1,this.directionalLight.shadow.camera.far=1e3,this.directionalLight.shadow.bias=-3e-5,this.directionalLight.shadow.radius=1,this.directionalLight.shadow.camera.left=-n,this.directionalLight.shadow.camera.right=n,this.directionalLight.shadow.camera.top=n,this.directionalLight.shadow.camera.bottom=-n,this.stage=e,s.enabled){let i=s.gui.addFolder("Lights");i.add(this,"x").min(-300).max(300).step(1),i.add(this,"y").min(-300).max(300).step(1),i.add(this,"z").min(-300).max(300).step(1)}s.helpers&&e.scene.add(new si(this.directionalLight,10,16711680))}_setLightsPosition(e,s){this.directionalLight.position[e]=s,this.stage.renderer.shadowMap.needsUpdate=!0}get x(){return this.directionalLight.position.x}set x(e){this._setLightsPosition("x",e),this.directionalLight.lookAt(this.stage.scene.position)}get y(){return this.directionalLight.position.y}set y(e){this._setLightsPosition("y",e),this.directionalLight.lookAt(this.stage.scene.position)}get z(){return this.directionalLight.position.z}set z(e){this._setLightsPosition("z",e),this.directionalLight.lookAt(this.stage.scene.position)}};var hs=1/1e3,or=1e3,lr=class{constructor(){this.startTime=performance.now(),this.previousTime=0,this.currentTime=0,this._delta=0,this._elapsed=0,this._fixedDelta=1e3/60,this.timescale=1,this.useFixedDelta=!1,this._autoReset=!1}get autoReset(){return this._autoReset}set autoReset(t){typeof document<"u"&&document.hidden!==void 0&&(t?document.addEventListener("visibilitychange",this):document.removeEventListener("visibilitychange",this),this._autoReset=t)}get delta(){return this._delta*hs}get fixedDelta(){return this._fixedDelta*hs}set fixedDelta(t){this._fixedDelta=t*or}get elapsed(){return this._elapsed*hs}update(t){this.useFixedDelta?this._delta=this.fixedDelta:(this.previousTime=this.currentTime,this.currentTime=(t!==void 0?t:performance.now())-this.startTime,this._delta=this.currentTime-this.previousTime),this._delta*=this.timescale,this._elapsed+=this._delta}reset(){this._delta=0,this._elapsed=0,this.currentTime=performance.now()-this.startTime}getDelta(){return this.delta}getElapsed(){return this.elapsed}handleEvent(t){document.hidden||(this.currentTime=performance.now()-this.startTime)}dispose(){this.autoReset=!1}},cr=(()=>{let t=new Float32Array([-1,-1,0,3,-1,0,-1,3,0]),e=new Float32Array([0,0,2,0,0,2]),s=new Oe;return s.setAttribute("position",new de(t,3)),s.setAttribute("uv",new de(e,2)),s})(),ae=class gs{static get fullscreenGeometry(){return cr}constructor(e="Pass",s=new ct,n=new In){this.name=e,this.renderer=null,this.scene=s,this.camera=n,this.screen=null,this.rtt=!0,this.needsSwap=!0,this.needsDepthTexture=!1,this.enabled=!0}get renderToScreen(){return!this.rtt}set renderToScreen(e){if(this.rtt===e){let s=this.fullscreenMaterial;s!==null&&(s.needsUpdate=!0),this.rtt=!e}}set mainScene(e){}set mainCamera(e){}setRenderer(e){this.renderer=e}isEnabled(){return this.enabled}setEnabled(e){this.enabled=e}get fullscreenMaterial(){return this.screen!==null?this.screen.material:null}set fullscreenMaterial(e){let s=this.screen;s!==null?s.material=e:(s=new _e(gs.fullscreenGeometry,e),s.frustumCulled=!1,this.scene===null&&(this.scene=new ct),this.scene.add(s),this.screen=s)}getFullscreenMaterial(){return this.fullscreenMaterial}setFullscreenMaterial(e){this.fullscreenMaterial=e}getDepthTexture(){return null}setDepthTexture(e,s=Me){}render(e,s,n,i,r){throw new Error("Render method not implemented!")}setSize(e,s){}initialize(e,s,n){}dispose(){for(let e of Object.keys(this)){let s=this[e];(s instanceof J||s instanceof be||s instanceof Ue||s instanceof gs)&&this[e].dispose()}this.fullscreenMaterial!==null&&this.fullscreenMaterial.dispose()}},ur=class extends ae{constructor(){super("ClearMaskPass",null,null),this.needsSwap=!1}render(t,e,s,n,i){let r=t.state.buffers.stencil;r.setLocked(!1),r.setTest(!1)}},dr=`#include <common>
#include <dithering_pars_fragment>
#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;
#else
uniform lowp sampler2D inputBuffer;
#endif
uniform float opacity;varying vec2 vUv;void main(){vec4 texel=texture2D(inputBuffer,vUv);gl_FragColor=opacity*texel;
#include <colorspace_fragment>
#include <dithering_fragment>
}`,pi="varying vec2 vUv;void main(){vUv=position.xy*0.5+0.5;gl_Position=vec4(position.xy,1.0,1.0);}",mi=class extends K{constructor(){super({name:"CopyMaterial",uniforms:{inputBuffer:new S(null),opacity:new S(1)},blending:re,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:dr,vertexShader:pi})}set inputBuffer(t){this.uniforms.inputBuffer.value=t}setInputBuffer(t){this.uniforms.inputBuffer.value=t}getOpacity(t){return this.uniforms.opacity.value}setOpacity(t){this.uniforms.opacity.value=t}},fr=class extends ae{constructor(t,e=!0){super("CopyPass"),this.fullscreenMaterial=new mi,this.needsSwap=!1,this.renderTarget=t,t===void 0&&(this.renderTarget=new J(1,1,{minFilter:me,magFilter:me,stencilBuffer:!1,depthBuffer:!1}),this.renderTarget.texture.name="CopyPass.Target"),this.autoResize=e}get resize(){return this.autoResize}set resize(t){this.autoResize=t}get texture(){return this.renderTarget.texture}getTexture(){return this.renderTarget.texture}setAutoResizeEnabled(t){this.autoResize=t}render(t,e,s,n,i){this.fullscreenMaterial.inputBuffer=e.texture,t.setRenderTarget(this.renderToScreen?null:this.renderTarget),t.render(this.scene,this.camera)}setSize(t,e){this.autoResize&&this.renderTarget.setSize(t,e)}initialize(t,e,s){s!==void 0&&(this.renderTarget.texture.type=s,s!==te?this.fullscreenMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1":t!==null&&t.outputColorSpace===L&&(this.renderTarget.texture.colorSpace=L))}},di=new X,gi=class extends ae{constructor(t=!0,e=!0,s=!1){super("ClearPass",null,null),this.needsSwap=!1,this.color=t,this.depth=e,this.stencil=s,this.overrideClearColor=null,this.overrideClearAlpha=-1}setClearFlags(t,e,s){this.color=t,this.depth=e,this.stencil=s}getOverrideClearColor(){return this.overrideClearColor}setOverrideClearColor(t){this.overrideClearColor=t}getOverrideClearAlpha(){return this.overrideClearAlpha}setOverrideClearAlpha(t){this.overrideClearAlpha=t}render(t,e,s,n,i){let r=this.overrideClearColor,a=this.overrideClearAlpha,o=t.getClearAlpha(),l=r!==null,c=a>=0;l?(t.getClearColor(di),t.setClearColor(r,c?a:o)):c&&t.setClearAlpha(a),t.setRenderTarget(this.renderToScreen?null:e),t.clear(this.color,this.depth,this.stencil),l?t.setClearColor(di,o):c&&t.setClearAlpha(o)}},hr=class extends ae{constructor(t,e){super("MaskPass",t,e),this.needsSwap=!1,this.clearPass=new gi(!1,!1,!0),this.inverse=!1}set mainScene(t){this.scene=t}set mainCamera(t){this.camera=t}get inverted(){return this.inverse}set inverted(t){this.inverse=t}get clear(){return this.clearPass.enabled}set clear(t){this.clearPass.enabled=t}getClearPass(){return this.clearPass}isInverted(){return this.inverted}setInverted(t){this.inverted=t}render(t,e,s,n,i){let r=t.getContext(),a=t.state.buffers,o=this.scene,l=this.camera,c=this.clearPass,d=this.inverted?0:1,u=1-d;a.color.setMask(!1),a.depth.setMask(!1),a.color.setLocked(!0),a.depth.setLocked(!0),a.stencil.setTest(!0),a.stencil.setOp(r.REPLACE,r.REPLACE,r.REPLACE),a.stencil.setFunc(r.ALWAYS,d,4294967295),a.stencil.setClear(u),a.stencil.setLocked(!0),this.clearPass.enabled&&(this.renderToScreen?c.render(t,null):(c.render(t,e),c.render(t,s))),this.renderToScreen?(t.setRenderTarget(null),t.render(o,l)):(t.setRenderTarget(e),t.render(o,l),t.setRenderTarget(s),t.render(o,l)),a.color.setLocked(!1),a.depth.setLocked(!1),a.stencil.setLocked(!1),a.stencil.setFunc(r.EQUAL,1,4294967295),a.stencil.setOp(r.KEEP,r.KEEP,r.KEEP),a.stencil.setLocked(!0)}},vi=class{constructor(t=null,{depthBuffer:e=!0,stencilBuffer:s=!1,multisampling:n=0,frameBufferType:i}={}){this.renderer=null,this.inputBuffer=this.createBuffer(e,s,i,n),this.outputBuffer=this.inputBuffer.clone(),this.copyPass=new fr,this.depthTexture=null,this.passes=[],this.timer=new lr,this.autoRenderToScreen=!0,this.setRenderer(t)}get multisampling(){return this.inputBuffer.samples||0}set multisampling(t){let e=this.inputBuffer,s=this.multisampling;s>0&&t>0?(this.inputBuffer.samples=t,this.outputBuffer.samples=t,this.inputBuffer.dispose(),this.outputBuffer.dispose()):s!==t&&(this.inputBuffer.dispose(),this.outputBuffer.dispose(),this.inputBuffer=this.createBuffer(e.depthBuffer,e.stencilBuffer,e.texture.type,t),this.inputBuffer.depthTexture=this.depthTexture,this.outputBuffer=this.inputBuffer.clone())}getTimer(){return this.timer}getRenderer(){return this.renderer}setRenderer(t){if(this.renderer=t,t!==null){let e=t.getSize(new _),s=t.getContext().getContextAttributes().alpha,n=this.inputBuffer.texture.type;n===te&&t.outputColorSpace===L&&(this.inputBuffer.texture.colorSpace=L,this.outputBuffer.texture.colorSpace=L,this.inputBuffer.dispose(),this.outputBuffer.dispose()),t.autoClear=!1,this.setSize(e.width,e.height);for(let i of this.passes)i.initialize(t,s,n)}}replaceRenderer(t,e=!0){let s=this.renderer,n=s.domElement.parentNode;return this.setRenderer(t),e&&n!==null&&(n.removeChild(s.domElement),n.appendChild(t.domElement)),s}createDepthTexture(){let t=this.depthTexture=new Gn;return this.inputBuffer.depthTexture=t,this.inputBuffer.dispose(),this.inputBuffer.stencilBuffer?(t.format=yn,t.type=Sn):t.type=wn,t}deleteDepthTexture(){if(this.depthTexture!==null){this.depthTexture.dispose(),this.depthTexture=null,this.inputBuffer.depthTexture=null,this.inputBuffer.dispose();for(let t of this.passes)t.setDepthTexture(null)}}createBuffer(t,e,s,n){let i=this.renderer,r=i===null?new _:i.getDrawingBufferSize(new _),a={minFilter:me,magFilter:me,stencilBuffer:e,depthBuffer:t,type:s},o=new J(r.width,r.height,a);return n>0&&(o.ignoreDepthForMultisampleCopy=!1,o.samples=n),s===te&&i!==null&&i.outputColorSpace===L&&(o.texture.colorSpace=L),o.texture.name="EffectComposer.Buffer",o.texture.generateMipmaps=!1,o}setMainScene(t){for(let e of this.passes)e.mainScene=t}setMainCamera(t){for(let e of this.passes)e.mainCamera=t}addPass(t,e){let s=this.passes,n=this.renderer,i=n.getDrawingBufferSize(new _),r=n.getContext().getContextAttributes().alpha,a=this.inputBuffer.texture.type;if(t.setRenderer(n),t.setSize(i.width,i.height),t.initialize(n,r,a),this.autoRenderToScreen&&(s.length>0&&(s[s.length-1].renderToScreen=!1),t.renderToScreen&&(this.autoRenderToScreen=!1)),e!==void 0?s.splice(e,0,t):s.push(t),this.autoRenderToScreen&&(s[s.length-1].renderToScreen=!0),t.needsDepthTexture||this.depthTexture!==null)if(this.depthTexture===null){let o=this.createDepthTexture();for(t of s)t.setDepthTexture(o)}else t.setDepthTexture(this.depthTexture)}removePass(t){let e=this.passes,s=e.indexOf(t);if(s!==-1&&e.splice(s,1).length>0){if(this.depthTexture!==null){let r=(o,l)=>o||l.needsDepthTexture;e.reduce(r,!1)||(t.getDepthTexture()===this.depthTexture&&t.setDepthTexture(null),this.deleteDepthTexture())}this.autoRenderToScreen&&s===e.length&&(t.renderToScreen=!1,e.length>0&&(e[e.length-1].renderToScreen=!0))}}removeAllPasses(){let t=this.passes;this.deleteDepthTexture(),t.length>0&&(this.autoRenderToScreen&&(t[t.length-1].renderToScreen=!1),this.passes=[])}render(t){let e=this.renderer,s=this.copyPass,n=this.inputBuffer,i=this.outputBuffer,r=!1,a,o,l;t===void 0&&(this.timer.update(),t=this.timer.getDelta());for(let c of this.passes)c.enabled&&(c.render(e,n,i,t,r),c.needsSwap&&(r&&(s.renderToScreen=c.renderToScreen,a=e.getContext(),o=e.state.buffers.stencil,o.setFunc(a.NOTEQUAL,1,4294967295),s.render(e,n,i,t,r),o.setFunc(a.EQUAL,1,4294967295)),l=n,n=i,i=l),c instanceof hr?r=!0:c instanceof ur&&(r=!1))}setSize(t,e,s){let n=this.renderer,i=n.getSize(new _);(t===void 0||e===void 0)&&(t=i.width,e=i.height),(i.width!==t||i.height!==e)&&n.setSize(t,e,s);let r=n.getDrawingBufferSize(new _);this.inputBuffer.setSize(r.width,r.height),this.outputBuffer.setSize(r.width,r.height);for(let a of this.passes)a.setSize(r.width,r.height)}reset(){this.dispose(),this.autoRenderToScreen=!0}dispose(){for(let t of this.passes)t.dispose();this.passes=[],this.inputBuffer!==null&&this.inputBuffer.dispose(),this.outputBuffer!==null&&this.outputBuffer.dispose(),this.deleteDepthTexture(),this.copyPass.dispose(),this.timer.dispose(),ae.fullscreenGeometry.dispose()}},Ie={NONE:0,DEPTH:1,CONVOLUTION:2},k={FRAGMENT_HEAD:"FRAGMENT_HEAD",FRAGMENT_MAIN_UV:"FRAGMENT_MAIN_UV",FRAGMENT_MAIN_IMAGE:"FRAGMENT_MAIN_IMAGE",VERTEX_HEAD:"VERTEX_HEAD",VERTEX_MAIN_SUPPORT:"VERTEX_MAIN_SUPPORT"},pr=class{constructor(){this.shaderParts=new Map([[k.FRAGMENT_HEAD,null],[k.FRAGMENT_MAIN_UV,null],[k.FRAGMENT_MAIN_IMAGE,null],[k.VERTEX_HEAD,null],[k.VERTEX_MAIN_SUPPORT,null]]),this.defines=new Map,this.uniforms=new Map,this.blendModes=new Map,this.extensions=new Set,this.attributes=Ie.NONE,this.varyings=new Set,this.uvTransformation=!1,this.readDepth=!1,this.colorSpace=q}};var ps=!1,fi=class{constructor(t=null){this.originalMaterials=new Map,this.material=null,this.materials=null,this.materialsBackSide=null,this.materialsDoubleSide=null,this.materialsFlatShaded=null,this.materialsFlatShadedBackSide=null,this.materialsFlatShadedDoubleSide=null,this.setMaterial(t),this.meshCount=0,this.replaceMaterial=e=>{if(e.isMesh){let s;if(e.material.flatShading)switch(e.material.side){case Re:s=this.materialsFlatShadedDoubleSide;break;case rt:s=this.materialsFlatShadedBackSide;break;default:s=this.materialsFlatShaded;break}else switch(e.material.side){case Re:s=this.materialsDoubleSide;break;case rt:s=this.materialsBackSide;break;default:s=this.materials;break}this.originalMaterials.set(e,e.material),e.isSkinnedMesh?e.material=s[2]:e.isInstancedMesh?e.material=s[1]:e.material=s[0],++this.meshCount}}}cloneMaterial(t){if(!(t instanceof K))return t.clone();let e=t.uniforms,s=new Map;for(let i in e){let r=e[i].value;r.isRenderTargetTexture&&(e[i].value=null,s.set(i,r))}let n=t.clone();for(let i of s)e[i[0]].value=i[1],n.uniforms[i[0]].value=i[1];return n}setMaterial(t){if(this.disposeMaterials(),this.material=t,t!==null){let e=this.materials=[this.cloneMaterial(t),this.cloneMaterial(t),this.cloneMaterial(t)];for(let s of e)s.uniforms=Object.assign({},t.uniforms),s.side=Et;e[2].skinning=!0,this.materialsBackSide=e.map(s=>{let n=this.cloneMaterial(s);return n.uniforms=Object.assign({},t.uniforms),n.side=rt,n}),this.materialsDoubleSide=e.map(s=>{let n=this.cloneMaterial(s);return n.uniforms=Object.assign({},t.uniforms),n.side=Re,n}),this.materialsFlatShaded=e.map(s=>{let n=this.cloneMaterial(s);return n.uniforms=Object.assign({},t.uniforms),n.flatShading=!0,n}),this.materialsFlatShadedBackSide=e.map(s=>{let n=this.cloneMaterial(s);return n.uniforms=Object.assign({},t.uniforms),n.flatShading=!0,n.side=rt,n}),this.materialsFlatShadedDoubleSide=e.map(s=>{let n=this.cloneMaterial(s);return n.uniforms=Object.assign({},t.uniforms),n.flatShading=!0,n.side=Re,n})}}render(t,e,s){let n=t.shadowMap.enabled;if(t.shadowMap.enabled=!1,ps){let i=this.originalMaterials;this.meshCount=0,e.traverse(this.replaceMaterial),t.render(e,s);for(let r of i)r[0].material=r[1];this.meshCount!==i.size&&i.clear()}else{let i=e.overrideMaterial;e.overrideMaterial=this.material,t.render(e,s),e.overrideMaterial=i}t.shadowMap.enabled=n}disposeMaterials(){if(this.material!==null){let t=this.materials.concat(this.materialsBackSide).concat(this.materialsDoubleSide).concat(this.materialsFlatShaded).concat(this.materialsFlatShadedBackSide).concat(this.materialsFlatShadedDoubleSide);for(let e of t)e.dispose()}}dispose(){this.originalMaterials.clear(),this.disposeMaterials()}static get workaroundEnabled(){return ps}static set workaroundEnabled(t){ps=t}};var Pe=-1,ve=class extends Ye{constructor(t,e=Pe,s=Pe,n=1){super(),this.resizable=t,this.baseSize=new _(1,1),this.preferredSize=new _(e,s),this.target=this.preferredSize,this.s=n,this.effectiveSize=new _,this.addEventListener("change",()=>this.updateEffectiveSize()),this.updateEffectiveSize()}updateEffectiveSize(){let t=this.baseSize,e=this.preferredSize,s=this.effectiveSize,n=this.scale;e.width!==Pe?s.width=e.width:e.height!==Pe?s.width=Math.round(e.height*(t.width/Math.max(t.height,1))):s.width=Math.round(t.width*n),e.height!==Pe?s.height=e.height:e.width!==Pe?s.height=Math.round(e.width/Math.max(t.width/Math.max(t.height,1),1)):s.height=Math.round(t.height*n)}get width(){return this.effectiveSize.width}set width(t){this.preferredWidth=t}get height(){return this.effectiveSize.height}set height(t){this.preferredHeight=t}getWidth(){return this.width}getHeight(){return this.height}get scale(){return this.s}set scale(t){this.s!==t&&(this.s=t,this.preferredSize.setScalar(Pe),this.dispatchEvent({type:"change"}),this.resizable.setSize(this.baseSize.width,this.baseSize.height))}getScale(){return this.scale}setScale(t){this.scale=t}get baseWidth(){return this.baseSize.width}set baseWidth(t){this.baseSize.width!==t&&(this.baseSize.width=t,this.dispatchEvent({type:"change"}),this.resizable.setSize(this.baseSize.width,this.baseSize.height))}getBaseWidth(){return this.baseWidth}setBaseWidth(t){this.baseWidth=t}get baseHeight(){return this.baseSize.height}set baseHeight(t){this.baseSize.height!==t&&(this.baseSize.height=t,this.dispatchEvent({type:"change"}),this.resizable.setSize(this.baseSize.width,this.baseSize.height))}getBaseHeight(){return this.baseHeight}setBaseHeight(t){this.baseHeight=t}setBaseSize(t,e){(this.baseSize.width!==t||this.baseSize.height!==e)&&(this.baseSize.set(t,e),this.dispatchEvent({type:"change"}),this.resizable.setSize(this.baseSize.width,this.baseSize.height))}get preferredWidth(){return this.preferredSize.width}set preferredWidth(t){this.preferredSize.width!==t&&(this.preferredSize.width=t,this.dispatchEvent({type:"change"}),this.resizable.setSize(this.baseSize.width,this.baseSize.height))}getPreferredWidth(){return this.preferredWidth}setPreferredWidth(t){this.preferredWidth=t}get preferredHeight(){return this.preferredSize.height}set preferredHeight(t){this.preferredSize.height!==t&&(this.preferredSize.height=t,this.dispatchEvent({type:"change"}),this.resizable.setSize(this.baseSize.width,this.baseSize.height))}getPreferredHeight(){return this.preferredHeight}setPreferredHeight(t){this.preferredHeight=t}setPreferredSize(t,e){(this.preferredSize.width!==t||this.preferredSize.height!==e)&&(this.preferredSize.set(t,e),this.dispatchEvent({type:"change"}),this.resizable.setSize(this.baseSize.width,this.baseSize.height))}copy(t){this.s=t.scale,this.baseSize.set(t.baseWidth,t.baseHeight),this.preferredSize.set(t.preferredWidth,t.preferredHeight),this.dispatchEvent({type:"change"}),this.resizable.setSize(this.baseSize.width,this.baseSize.height)}static get AUTO_SIZE(){return Pe}};var I={SKIP:9,SET:30,ADD:0,ALPHA:1,AVERAGE:2,COLOR:3,COLOR_BURN:4,COLOR_DODGE:5,DARKEN:6,DIFFERENCE:7,DIVIDE:8,DST:9,EXCLUSION:10,HARD_LIGHT:11,HARD_MIX:12,HUE:13,INVERT:14,INVERT_RGB:15,LIGHTEN:16,LINEAR_BURN:17,LINEAR_DODGE:18,LINEAR_LIGHT:19,LUMINOSITY:20,MULTIPLY:21,NEGATION:22,NORMAL:23,OVERLAY:24,PIN_LIGHT:25,REFLECT:26,SATURATION:27,SCREEN:28,SOFT_LIGHT:29,SRC:30,SUBTRACT:31,VIVID_LIGHT:32},mr="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,x+y,opacity);}",gr="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,y,min(y.a,opacity));}",vr="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,(x+y)*0.5,opacity);}",Ar="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec3 xHSL=RGBToHSL(x.rgb);vec3 yHSL=RGBToHSL(y.rgb);vec3 z=HSLToRGB(vec3(yHSL.rg,xHSL.b));return vec4(mix(x.rgb,z,opacity),y.a);}",xr="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec4 z=mix(step(0.0,y)*(1.0-min(vec4(1.0),(1.0-x)/y)),vec4(1.0),step(1.0,x));return mix(x,z,opacity);}",Tr="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec4 z=step(0.0,x)*mix(min(vec4(1.0),x/max(1.0-y,1e-9)),vec4(1.0),step(1.0,y));return mix(x,z,opacity);}",Er="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,min(x,y),opacity);}",wr="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,abs(x-y),opacity);}",Sr="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,x/max(y,1e-12),opacity);}",yr="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,(x+y-2.0*x*y),opacity);}",Cr="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec4 a=min(x,1.0),b=min(y,1.0);vec4 z=mix(2.0*a*b,1.0-2.0*(1.0-a)*(1.0-b),step(0.5,y));return mix(x,z,opacity);}",Dr="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,step(1.0,x+y),opacity);}",Mr="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec3 xHSL=RGBToHSL(x.rgb);vec3 yHSL=RGBToHSL(y.rgb);vec3 z=HSLToRGB(vec3(yHSL.r,xHSL.gb));return vec4(mix(x.rgb,z,opacity),y.a);}",br="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,1.0-y,opacity);}",Pr="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,y*(1.0-x),opacity);}",Ir="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,max(x,y),opacity);}",Fr="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,clamp(y+x-1.0,0.0,1.0),opacity);}",Lr="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,min(x+y,1.0),opacity);}",Br="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,clamp(2.0*y+x-1.0,0.0,1.0),opacity);}",Rr="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec3 xHSL=RGBToHSL(x.rgb);vec3 yHSL=RGBToHSL(y.rgb);vec3 z=HSLToRGB(vec3(xHSL.rg,yHSL.b));return vec4(mix(x.rgb,z,opacity),y.a);}",Ur="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,x*y,opacity);}",Nr="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,1.0-abs(1.0-x-y),opacity);}",Or="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,y,opacity);}",_r="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec4 z=mix(2.0*y*x,1.0-2.0*(1.0-y)*(1.0-x),step(0.5,x));return mix(x,z,opacity);}",kr="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec4 y2=2.0*y;vec4 z=mix(mix(y2,x,step(0.5*x,y)),max(vec4(0.0),y2-1.0),step(x,(y2-1.0)));return mix(x,z,opacity);}",Hr="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec4 z=mix(min(x*x/max(1.0-y,1e-12),1.0),y,step(1.0,y));return mix(x,z,opacity);}",Gr="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec3 xHSL=RGBToHSL(x.rgb);vec3 yHSL=RGBToHSL(y.rgb);vec3 z=HSLToRGB(vec3(xHSL.r,yHSL.g,xHSL.b));return vec4(mix(x.rgb,z,opacity),y.a);}",zr="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,x+y-min(x*y,1.0),opacity);}",Qr="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec4 y2=2.0*y;vec4 w=step(0.5,y);vec4 z=mix(x-(1.0-y2)*x*(1.0-x),mix(x+(y2-1.0)*(sqrt(x)-x),x+(y2-1.0)*x*((16.0*x-12.0)*x+3.0),w*(1.0-step(0.25,x))),w);return mix(x,z,opacity);}",Xr="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return y;}",Yr="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){return mix(x,max(x+y-1.0,0.0),opacity);}",Vr="vec4 blend(const in vec4 x,const in vec4 y,const in float opacity){vec4 z=mix(max(1.0-min((1.0-x)/(2.0*y),1.0),0.0),min(x/(2.0*(1.0-y)),1.0),step(0.5,y));return mix(x,z,opacity);}",Wr=new Map([[I.ADD,mr],[I.ALPHA,gr],[I.AVERAGE,vr],[I.COLOR,Ar],[I.COLOR_BURN,xr],[I.COLOR_DODGE,Tr],[I.DARKEN,Er],[I.DIFFERENCE,wr],[I.DIVIDE,Sr],[I.DST,null],[I.EXCLUSION,yr],[I.HARD_LIGHT,Cr],[I.HARD_MIX,Dr],[I.HUE,Mr],[I.INVERT,br],[I.INVERT_RGB,Pr],[I.LIGHTEN,Ir],[I.LINEAR_BURN,Fr],[I.LINEAR_DODGE,Lr],[I.LINEAR_LIGHT,Br],[I.LUMINOSITY,Rr],[I.MULTIPLY,Ur],[I.NEGATION,Nr],[I.NORMAL,Or],[I.OVERLAY,_r],[I.PIN_LIGHT,kr],[I.REFLECT,Hr],[I.SATURATION,Gr],[I.SCREEN,zr],[I.SOFT_LIGHT,Qr],[I.SRC,Xr],[I.SUBTRACT,Yr],[I.VIVID_LIGHT,Vr]]),jr=class extends Ye{constructor(t,e=1){super(),this._blendFunction=t,this.opacity=new S(e)}getOpacity(){return this.opacity.value}setOpacity(t){this.opacity.value=t}get blendFunction(){return this._blendFunction}set blendFunction(t){this._blendFunction=t,this.dispatchEvent({type:"change"})}getBlendFunction(){return this.blendFunction}setBlendFunction(t){this.blendFunction=t}getShaderCode(){return Wr.get(this.blendFunction)}},qe={VERY_SMALL:0,SMALL:1,MEDIUM:2,LARGE:3,VERY_LARGE:4,HUGE:5},Kr=`#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;
#else
uniform lowp sampler2D inputBuffer;
#endif
varying vec2 vUv0;varying vec2 vUv1;varying vec2 vUv2;varying vec2 vUv3;void main(){vec4 sum=texture2D(inputBuffer,vUv0);sum+=texture2D(inputBuffer,vUv1);sum+=texture2D(inputBuffer,vUv2);sum+=texture2D(inputBuffer,vUv3);gl_FragColor=sum*0.25;
#include <colorspace_fragment>
}`,Zr="uniform vec4 texelSize;uniform float kernel;uniform float scale;varying vec2 vUv0;varying vec2 vUv1;varying vec2 vUv2;varying vec2 vUv3;void main(){vec2 uv=position.xy*0.5+0.5;vec2 dUv=(texelSize.xy*vec2(kernel)+texelSize.zw)*scale;vUv0=vec2(uv.x-dUv.x,uv.y+dUv.y);vUv1=vec2(uv.x+dUv.x,uv.y+dUv.y);vUv2=vec2(uv.x+dUv.x,uv.y-dUv.y);vUv3=vec2(uv.x-dUv.x,uv.y-dUv.y);gl_Position=vec4(position.xy,1.0,1.0);}",qr=[new Float32Array([0,0]),new Float32Array([0,1,1]),new Float32Array([0,1,1,2]),new Float32Array([0,1,2,2,3]),new Float32Array([0,1,2,3,4,4,5]),new Float32Array([0,1,2,3,4,5,7,8,9,10])],Jr=class extends K{constructor(t=new ns){super({name:"KawaseBlurMaterial",uniforms:{inputBuffer:new S(null),texelSize:new S(new ns),scale:new S(1),kernel:new S(0)},blending:re,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:Kr,vertexShader:Zr}),this.setTexelSize(t.x,t.y),this.kernelSize=qe.MEDIUM}set inputBuffer(t){this.uniforms.inputBuffer.value=t}setInputBuffer(t){this.inputBuffer=t}get kernelSequence(){return qr[this.kernelSize]}get scale(){return this.uniforms.scale.value}set scale(t){this.uniforms.scale.value=t}getScale(){return this.uniforms.scale.value}setScale(t){this.uniforms.scale.value=t}getKernel(){return null}get kernel(){return this.uniforms.kernel.value}set kernel(t){this.uniforms.kernel.value=t}setKernel(t){this.kernel=t}setTexelSize(t,e){this.uniforms.texelSize.value.set(t,e,t*.5,e*.5)}setSize(t,e){let s=1/t,n=1/e;this.uniforms.texelSize.value.set(s,n,s*.5,n*.5)}},$r=class extends ae{constructor({kernelSize:t=qe.MEDIUM,resolutionScale:e=.5,width:s=ve.AUTO_SIZE,height:n=ve.AUTO_SIZE,resolutionX:i=s,resolutionY:r=n}={}){super("KawaseBlurPass"),this.renderTargetA=new J(1,1,{depthBuffer:!1}),this.renderTargetA.texture.name="Blur.Target.A",this.renderTargetB=this.renderTargetA.clone(),this.renderTargetB.texture.name="Blur.Target.B";let a=this.resolution=new ve(this,i,r,e);a.addEventListener("change",o=>this.setSize(a.baseWidth,a.baseHeight)),this._blurMaterial=new Jr,this._blurMaterial.kernelSize=t,this.copyMaterial=new mi}getResolution(){return this.resolution}get blurMaterial(){return this._blurMaterial}set blurMaterial(t){this._blurMaterial=t}get dithering(){return this.copyMaterial.dithering}set dithering(t){this.copyMaterial.dithering=t}get kernelSize(){return this.blurMaterial.kernelSize}set kernelSize(t){this.blurMaterial.kernelSize=t}get width(){return this.resolution.width}set width(t){this.resolution.preferredWidth=t}get height(){return this.resolution.height}set height(t){this.resolution.preferredHeight=t}get scale(){return this.blurMaterial.scale}set scale(t){this.blurMaterial.scale=t}getScale(){return this.blurMaterial.scale}setScale(t){this.blurMaterial.scale=t}getKernelSize(){return this.kernelSize}setKernelSize(t){this.kernelSize=t}getResolutionScale(){return this.resolution.scale}setResolutionScale(t){this.resolution.scale=t}render(t,e,s,n,i){let r=this.scene,a=this.camera,o=this.renderTargetA,l=this.renderTargetB,c=this.blurMaterial,d=c.kernelSequence,u=e;this.fullscreenMaterial=c;for(let f=0,v=d.length;f<v;++f){let g=(f&1)===0?o:l;c.kernel=d[f],c.inputBuffer=u.texture,t.setRenderTarget(g),t.render(r,a),u=g}this.fullscreenMaterial=this.copyMaterial,this.copyMaterial.inputBuffer=u.texture,t.setRenderTarget(this.renderToScreen?null:s),t.render(r,a)}setSize(t,e){let s=this.resolution;s.setBaseSize(t,e);let n=s.width,i=s.height;this.renderTargetA.setSize(n,i),this.renderTargetB.setSize(n,i),this.blurMaterial.setSize(t,e)}initialize(t,e,s){s!==void 0&&(this.renderTargetA.texture.type=s,this.renderTargetB.texture.type=s,s!==te?(this.blurMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1",this.copyMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1"):t!==null&&t.outputColorSpace===L&&(this.renderTargetA.texture.colorSpace=L,this.renderTargetB.texture.colorSpace=L))}static get AUTO_SIZE(){return ve.AUTO_SIZE}},ea=`#include <common>
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
}`,ta=class extends K{constructor(t=!1,e=null){super({name:"LuminanceMaterial",defines:{THREE_REVISION:"172".replace(/\D+/g,"")},uniforms:{inputBuffer:new S(null),threshold:new S(0),smoothing:new S(1),range:new S(null)},blending:re,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:ea,vertexShader:pi}),this.colorOutput=t,this.luminanceRange=e}set inputBuffer(t){this.uniforms.inputBuffer.value=t}setInputBuffer(t){this.uniforms.inputBuffer.value=t}get threshold(){return this.uniforms.threshold.value}set threshold(t){this.smoothing>0||t>0?this.defines.THRESHOLD="1":delete this.defines.THRESHOLD,this.uniforms.threshold.value=t}getThreshold(){return this.threshold}setThreshold(t){this.threshold=t}get smoothing(){return this.uniforms.smoothing.value}set smoothing(t){this.threshold>0||t>0?this.defines.THRESHOLD="1":delete this.defines.THRESHOLD,this.uniforms.smoothing.value=t}getSmoothingFactor(){return this.smoothing}setSmoothingFactor(t){this.smoothing=t}get useThreshold(){return this.threshold>0||this.smoothing>0}set useThreshold(t){}get colorOutput(){return this.defines.COLOR!==void 0}set colorOutput(t){t?this.defines.COLOR="1":delete this.defines.COLOR,this.needsUpdate=!0}isColorOutputEnabled(t){return this.colorOutput}setColorOutputEnabled(t){this.colorOutput=t}get useRange(){return this.luminanceRange!==null}set useRange(t){this.luminanceRange=null}get luminanceRange(){return this.uniforms.range.value}set luminanceRange(t){t!==null?this.defines.RANGE="1":delete this.defines.RANGE,this.uniforms.range.value=t,this.needsUpdate=!0}getLuminanceRange(){return this.luminanceRange}setLuminanceRange(t){this.luminanceRange=t}},sa=class extends ae{constructor({renderTarget:t,luminanceRange:e,colorOutput:s,resolutionScale:n=1,width:i=ve.AUTO_SIZE,height:r=ve.AUTO_SIZE,resolutionX:a=i,resolutionY:o=r}={}){super("LuminancePass"),this.fullscreenMaterial=new ta(s,e),this.needsSwap=!1,this.renderTarget=t,this.renderTarget===void 0&&(this.renderTarget=new J(1,1,{depthBuffer:!1}),this.renderTarget.texture.name="LuminancePass.Target");let l=this.resolution=new ve(this,a,o,n);l.addEventListener("change",c=>this.setSize(l.baseWidth,l.baseHeight))}get texture(){return this.renderTarget.texture}getTexture(){return this.renderTarget.texture}getResolution(){return this.resolution}render(t,e,s,n,i){let r=this.fullscreenMaterial;r.inputBuffer=e.texture,t.setRenderTarget(this.renderToScreen?null:this.renderTarget),t.render(this.scene,this.camera)}setSize(t,e){let s=this.resolution;s.setBaseSize(t,e),this.renderTarget.setSize(s.width,s.height)}initialize(t,e,s){s!==void 0&&s!==te&&(this.renderTarget.texture.type=s,this.fullscreenMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1")}},na=`#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;
#else
uniform lowp sampler2D inputBuffer;
#endif
#define WEIGHT_INNER 0.125
#define WEIGHT_OUTER 0.0555555
varying vec2 vUv;varying vec2 vUv00;varying vec2 vUv01;varying vec2 vUv02;varying vec2 vUv03;varying vec2 vUv04;varying vec2 vUv05;varying vec2 vUv06;varying vec2 vUv07;varying vec2 vUv08;varying vec2 vUv09;varying vec2 vUv10;varying vec2 vUv11;float clampToBorder(const in vec2 uv){return float(uv.s>=0.0&&uv.s<=1.0&&uv.t>=0.0&&uv.t<=1.0);}void main(){vec4 c=vec4(0.0);vec4 w=WEIGHT_INNER*vec4(clampToBorder(vUv00),clampToBorder(vUv01),clampToBorder(vUv02),clampToBorder(vUv03));c+=w.x*texture2D(inputBuffer,vUv00);c+=w.y*texture2D(inputBuffer,vUv01);c+=w.z*texture2D(inputBuffer,vUv02);c+=w.w*texture2D(inputBuffer,vUv03);w=WEIGHT_OUTER*vec4(clampToBorder(vUv04),clampToBorder(vUv05),clampToBorder(vUv06),clampToBorder(vUv07));c+=w.x*texture2D(inputBuffer,vUv04);c+=w.y*texture2D(inputBuffer,vUv05);c+=w.z*texture2D(inputBuffer,vUv06);c+=w.w*texture2D(inputBuffer,vUv07);w=WEIGHT_OUTER*vec4(clampToBorder(vUv08),clampToBorder(vUv09),clampToBorder(vUv10),clampToBorder(vUv11));c+=w.x*texture2D(inputBuffer,vUv08);c+=w.y*texture2D(inputBuffer,vUv09);c+=w.z*texture2D(inputBuffer,vUv10);c+=w.w*texture2D(inputBuffer,vUv11);c+=WEIGHT_OUTER*texture2D(inputBuffer,vUv);gl_FragColor=c;
#include <colorspace_fragment>
}`,ia="uniform vec2 texelSize;varying vec2 vUv;varying vec2 vUv00;varying vec2 vUv01;varying vec2 vUv02;varying vec2 vUv03;varying vec2 vUv04;varying vec2 vUv05;varying vec2 vUv06;varying vec2 vUv07;varying vec2 vUv08;varying vec2 vUv09;varying vec2 vUv10;varying vec2 vUv11;void main(){vUv=position.xy*0.5+0.5;vUv00=vUv+texelSize*vec2(-1.0,1.0);vUv01=vUv+texelSize*vec2(1.0,1.0);vUv02=vUv+texelSize*vec2(-1.0,-1.0);vUv03=vUv+texelSize*vec2(1.0,-1.0);vUv04=vUv+texelSize*vec2(-2.0,2.0);vUv05=vUv+texelSize*vec2(0.0,2.0);vUv06=vUv+texelSize*vec2(2.0,2.0);vUv07=vUv+texelSize*vec2(-2.0,0.0);vUv08=vUv+texelSize*vec2(2.0,0.0);vUv09=vUv+texelSize*vec2(-2.0,-2.0);vUv10=vUv+texelSize*vec2(0.0,-2.0);vUv11=vUv+texelSize*vec2(2.0,-2.0);gl_Position=vec4(position.xy,1.0,1.0);}",ra=class extends K{constructor(){super({name:"DownsamplingMaterial",uniforms:{inputBuffer:new S(null),texelSize:new S(new _)},blending:re,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:na,vertexShader:ia})}set inputBuffer(t){this.uniforms.inputBuffer.value=t}setSize(t,e){this.uniforms.texelSize.value.set(1/t,1/e)}},aa=`#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D inputBuffer;uniform mediump sampler2D supportBuffer;
#else
uniform lowp sampler2D inputBuffer;uniform lowp sampler2D supportBuffer;
#endif
uniform float radius;varying vec2 vUv;varying vec2 vUv0;varying vec2 vUv1;varying vec2 vUv2;varying vec2 vUv3;varying vec2 vUv4;varying vec2 vUv5;varying vec2 vUv6;varying vec2 vUv7;void main(){vec4 c=vec4(0.0);c+=texture2D(inputBuffer,vUv0)*0.0625;c+=texture2D(inputBuffer,vUv1)*0.125;c+=texture2D(inputBuffer,vUv2)*0.0625;c+=texture2D(inputBuffer,vUv3)*0.125;c+=texture2D(inputBuffer,vUv)*0.25;c+=texture2D(inputBuffer,vUv4)*0.125;c+=texture2D(inputBuffer,vUv5)*0.0625;c+=texture2D(inputBuffer,vUv6)*0.125;c+=texture2D(inputBuffer,vUv7)*0.0625;vec4 baseColor=texture2D(supportBuffer,vUv);gl_FragColor=mix(baseColor,c,radius);
#include <colorspace_fragment>
}`,oa="uniform vec2 texelSize;varying vec2 vUv;varying vec2 vUv0;varying vec2 vUv1;varying vec2 vUv2;varying vec2 vUv3;varying vec2 vUv4;varying vec2 vUv5;varying vec2 vUv6;varying vec2 vUv7;void main(){vUv=position.xy*0.5+0.5;vUv0=vUv+texelSize*vec2(-1.0,1.0);vUv1=vUv+texelSize*vec2(0.0,1.0);vUv2=vUv+texelSize*vec2(1.0,1.0);vUv3=vUv+texelSize*vec2(-1.0,0.0);vUv4=vUv+texelSize*vec2(1.0,0.0);vUv5=vUv+texelSize*vec2(-1.0,-1.0);vUv6=vUv+texelSize*vec2(0.0,-1.0);vUv7=vUv+texelSize*vec2(1.0,-1.0);gl_Position=vec4(position.xy,1.0,1.0);}",la=class extends K{constructor(){super({name:"UpsamplingMaterial",uniforms:{inputBuffer:new S(null),supportBuffer:new S(null),texelSize:new S(new _),radius:new S(.85)},blending:re,toneMapped:!1,depthWrite:!1,depthTest:!1,fragmentShader:aa,vertexShader:oa})}set inputBuffer(t){this.uniforms.inputBuffer.value=t}set supportBuffer(t){this.uniforms.supportBuffer.value=t}get radius(){return this.uniforms.radius.value}set radius(t){this.uniforms.radius.value=t}setSize(t,e){this.uniforms.texelSize.value.set(1/t,1/e)}},ca=class extends ae{constructor(){super("MipmapBlurPass"),this.needsSwap=!1,this.renderTarget=new J(1,1,{depthBuffer:!1}),this.renderTarget.texture.name="Upsampling.Mipmap0",this.downsamplingMipmaps=[],this.upsamplingMipmaps=[],this.downsamplingMaterial=new ra,this.upsamplingMaterial=new la,this.resolution=new _}get texture(){return this.renderTarget.texture}get levels(){return this.downsamplingMipmaps.length}set levels(t){if(this.levels!==t){let e=this.renderTarget;this.dispose(),this.downsamplingMipmaps=[],this.upsamplingMipmaps=[];for(let s=0;s<t;++s){let n=e.clone();n.texture.name="Downsampling.Mipmap"+s,this.downsamplingMipmaps.push(n)}this.upsamplingMipmaps.push(e);for(let s=1,n=t-1;s<n;++s){let i=e.clone();i.texture.name="Upsampling.Mipmap"+s,this.upsamplingMipmaps.push(i)}this.setSize(this.resolution.x,this.resolution.y)}}get radius(){return this.upsamplingMaterial.radius}set radius(t){this.upsamplingMaterial.radius=t}render(t,e,s,n,i){let{scene:r,camera:a}=this,{downsamplingMaterial:o,upsamplingMaterial:l}=this,{downsamplingMipmaps:c,upsamplingMipmaps:d}=this,u=e;this.fullscreenMaterial=o;for(let f=0,v=c.length;f<v;++f){let g=c[f];o.setSize(u.width,u.height),o.inputBuffer=u.texture,t.setRenderTarget(g),t.render(r,a),u=g}this.fullscreenMaterial=l;for(let f=d.length-1;f>=0;--f){let v=d[f];l.setSize(u.width,u.height),l.inputBuffer=u.texture,l.supportBuffer=c[f].texture,t.setRenderTarget(v),t.render(r,a),u=v}}setSize(t,e){let s=this.resolution;s.set(t,e);let n=s.width,i=s.height;for(let r=0,a=this.downsamplingMipmaps.length;r<a;++r)n=Math.round(n*.5),i=Math.round(i*.5),this.downsamplingMipmaps[r].setSize(n,i),r<this.upsamplingMipmaps.length&&this.upsamplingMipmaps[r].setSize(n,i)}initialize(t,e,s){if(s!==void 0){let n=this.downsamplingMipmaps.concat(this.upsamplingMipmaps);for(let i of n)i.texture.type=s;if(s!==te)this.downsamplingMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1",this.upsamplingMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1";else if(t!==null&&t.outputColorSpace===L)for(let i of n)i.texture.colorSpace=L}}dispose(){super.dispose();for(let t of this.downsamplingMipmaps.concat(this.upsamplingMipmaps))t.dispose()}},Ai=class extends Ye{constructor(t,e,{attributes:s=Ie.NONE,blendFunction:n=I.NORMAL,defines:i=new Map,uniforms:r=new Map,extensions:a=null,vertexShader:o=null}={}){super(),this.name=t,this.renderer=null,this.attributes=s,this.fragmentShader=e,this.vertexShader=o,this.defines=i,this.uniforms=r,this.extensions=a,this.blendMode=new jr(n),this.blendMode.addEventListener("change",l=>this.setChanged()),this._inputColorSpace=q,this._outputColorSpace=yt}get inputColorSpace(){return this._inputColorSpace}set inputColorSpace(t){this._inputColorSpace=t,this.setChanged()}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t,this.setChanged()}set mainScene(t){}set mainCamera(t){}getName(){return this.name}setRenderer(t){this.renderer=t}getDefines(){return this.defines}getUniforms(){return this.uniforms}getExtensions(){return this.extensions}getBlendMode(){return this.blendMode}getAttributes(){return this.attributes}setAttributes(t){this.attributes=t,this.setChanged()}getFragmentShader(){return this.fragmentShader}setFragmentShader(t){this.fragmentShader=t,this.setChanged()}getVertexShader(){return this.vertexShader}setVertexShader(t){this.vertexShader=t,this.setChanged()}setChanged(){this.dispatchEvent({type:"change"})}setDepthTexture(t,e=Me){}update(t,e,s){}setSize(t,e){}initialize(t,e,s){}dispose(){for(let t of Object.keys(this)){let e=this[t];(e instanceof J||e instanceof be||e instanceof Ue||e instanceof ae)&&this[t].dispose()}}},ua=`#ifdef FRAMEBUFFER_PRECISION_HIGH
uniform mediump sampler2D map;
#else
uniform lowp sampler2D map;
#endif
uniform float intensity;void mainImage(const in vec4 inputColor,const in vec2 uv,out vec4 outputColor){vec4 texel=texture2D(map,uv);outputColor=vec4(texel.rgb*intensity,texel.a);}`,xi=class extends Ai{constructor({blendFunction:t=I.SCREEN,luminanceThreshold:e=.9,luminanceSmoothing:s=.025,mipmapBlur:n=!1,intensity:i=1,radius:r=.85,levels:a=8,kernelSize:o=qe.LARGE,resolutionScale:l=.5,width:c=ve.AUTO_SIZE,height:d=ve.AUTO_SIZE,resolutionX:u=c,resolutionY:f=d}={}){super("BloomEffect",ua,{blendFunction:t,uniforms:new Map([["map",new S(null)],["intensity",new S(i)]])}),this.renderTarget=new J(1,1,{depthBuffer:!1}),this.renderTarget.texture.name="Bloom.Target",this.blurPass=new $r({kernelSize:o}),this.luminancePass=new sa({colorOutput:!0}),this.luminanceMaterial.threshold=e,this.luminanceMaterial.smoothing=s,this.mipmapBlurPass=new ca,this.mipmapBlurPass.enabled=n,this.mipmapBlurPass.radius=r,this.mipmapBlurPass.levels=a,this.uniforms.get("map").value=n?this.mipmapBlurPass.texture:this.renderTarget.texture;let v=this.resolution=new ve(this,u,f,l);v.addEventListener("change",g=>this.setSize(v.baseWidth,v.baseHeight))}get texture(){return this.mipmapBlurPass.enabled?this.mipmapBlurPass.texture:this.renderTarget.texture}getTexture(){return this.texture}getResolution(){return this.resolution}getBlurPass(){return this.blurPass}getLuminancePass(){return this.luminancePass}get luminanceMaterial(){return this.luminancePass.fullscreenMaterial}getLuminanceMaterial(){return this.luminancePass.fullscreenMaterial}get width(){return this.resolution.width}set width(t){this.resolution.preferredWidth=t}get height(){return this.resolution.height}set height(t){this.resolution.preferredHeight=t}get dithering(){return this.blurPass.dithering}set dithering(t){this.blurPass.dithering=t}get kernelSize(){return this.blurPass.kernelSize}set kernelSize(t){this.blurPass.kernelSize=t}get distinction(){return console.warn(this.name,"distinction was removed"),1}set distinction(t){console.warn(this.name,"distinction was removed")}get intensity(){return this.uniforms.get("intensity").value}set intensity(t){this.uniforms.get("intensity").value=t}getIntensity(){return this.intensity}setIntensity(t){this.intensity=t}getResolutionScale(){return this.resolution.scale}setResolutionScale(t){this.resolution.scale=t}update(t,e,s){let n=this.renderTarget,i=this.luminancePass;i.enabled?(i.render(t,e),this.mipmapBlurPass.enabled?this.mipmapBlurPass.render(t,i.renderTarget):this.blurPass.render(t,i.renderTarget,n)):this.mipmapBlurPass.enabled?this.mipmapBlurPass.render(t,e):this.blurPass.render(t,e,n)}setSize(t,e){let s=this.resolution;s.setBaseSize(t,e),this.renderTarget.setSize(s.width,s.height),this.blurPass.resolution.copy(s),this.luminancePass.setSize(t,e),this.mipmapBlurPass.setSize(t,e)}initialize(t,e,s){this.blurPass.initialize(t,e,s),this.luminancePass.initialize(t,e,s),this.mipmapBlurPass.initialize(t,e,s),s!==void 0&&(this.renderTarget.texture.type=s,t!==null&&t.outputColorSpace===L&&(this.renderTarget.texture.colorSpace=L))}};var da=`#ifdef RADIAL_MODULATION
uniform float modulationOffset;
#endif
varying float vActive;varying vec2 vUvR;varying vec2 vUvB;void mainImage(const in vec4 inputColor,const in vec2 uv,out vec4 outputColor){vec2 ra=inputColor.ra;vec2 ba=inputColor.ba;
#ifdef RADIAL_MODULATION
const vec2 center=vec2(0.5);float d=distance(uv,center)*2.0;d=max(d-modulationOffset,0.0);if(vActive>0.0&&d>0.0){ra=texture2D(inputBuffer,mix(uv,vUvR,d)).ra;ba=texture2D(inputBuffer,mix(uv,vUvB,d)).ba;}
#else
if(vActive>0.0){ra=texture2D(inputBuffer,vUvR).ra;ba=texture2D(inputBuffer,vUvB).ba;}
#endif
outputColor=vec4(ra.x,inputColor.g,ba.x,max(max(ra.y,ba.y),inputColor.a));}`,fa="uniform vec2 offset;varying float vActive;varying vec2 vUvR;varying vec2 vUvB;void mainSupport(const in vec2 uv){vec2 shift=offset*vec2(1.0,aspect);vActive=(shift.x!=0.0||shift.y!=0.0)?1.0:0.0;vUvR=uv+shift;vUvB=uv-shift;}",Ti=class extends Ai{constructor({offset:t=new _(.001,5e-4),radialModulation:e=!1,modulationOffset:s=.15}={}){super("ChromaticAberrationEffect",da,{vertexShader:fa,attributes:Ie.CONVOLUTION,uniforms:new Map([["offset",new S(t)],["modulationOffset",new S(s)]])}),this.radialModulation=e}get offset(){return this.uniforms.get("offset").value}set offset(t){this.uniforms.get("offset").value=t}get radialModulation(){return this.defines.has("RADIAL_MODULATION")}set radialModulation(t){t?this.defines.set("RADIAL_MODULATION","1"):this.defines.delete("RADIAL_MODULATION"),this.setChanged()}get modulationOffset(){return this.uniforms.get("modulationOffset").value}set modulationOffset(t){this.uniforms.get("modulationOffset").value=t}getOffset(){return this.offset}setOffset(t){this.offset=t}};var vs=class extends ae{constructor(t,e="inputBuffer"){super("ShaderPass"),this.fullscreenMaterial=t,this.input=e}setInput(t){this.input=t}render(t,e,s,n,i){let r=this.fullscreenMaterial.uniforms;e!==null&&r!==void 0&&r[this.input]!==void 0&&(r[this.input].value=e.texture),t.setRenderTarget(this.renderToScreen?null:s),t.render(this.scene,this.camera)}initialize(t,e,s){s!==void 0&&s!==te&&(this.fullscreenMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1")}};var Ei=class extends ae{constructor(t,e,s=null){super("RenderPass",t,e),this.needsSwap=!1,this.clearPass=new gi,this.overrideMaterialManager=s===null?null:new fi(s),this.ignoreBackground=!1,this.skipShadowMapUpdate=!1,this.selection=null}set mainScene(t){this.scene=t}set mainCamera(t){this.camera=t}get renderToScreen(){return super.renderToScreen}set renderToScreen(t){super.renderToScreen=t,this.clearPass.renderToScreen=t}get overrideMaterial(){let t=this.overrideMaterialManager;return t!==null?t.material:null}set overrideMaterial(t){let e=this.overrideMaterialManager;t!==null?e!==null?e.setMaterial(t):this.overrideMaterialManager=new fi(t):e!==null&&(e.dispose(),this.overrideMaterialManager=null)}getOverrideMaterial(){return this.overrideMaterial}setOverrideMaterial(t){this.overrideMaterial=t}get clear(){return this.clearPass.enabled}set clear(t){this.clearPass.enabled=t}getSelection(){return this.selection}setSelection(t){this.selection=t}isBackgroundDisabled(){return this.ignoreBackground}setBackgroundDisabled(t){this.ignoreBackground=t}isShadowMapDisabled(){return this.skipShadowMapUpdate}setShadowMapDisabled(t){this.skipShadowMapUpdate=t}getClearPass(){return this.clearPass}render(t,e,s,n,i){let r=this.scene,a=this.camera,o=this.selection,l=a.layers.mask,c=r.background,d=t.shadowMap.autoUpdate,u=this.renderToScreen?null:e;o!==null&&a.layers.set(o.getLayer()),this.skipShadowMapUpdate&&(t.shadowMap.autoUpdate=!1),(this.ignoreBackground||this.clearPass.overrideClearColor!==null)&&(r.background=null),this.clearPass.enabled&&this.clearPass.render(t,e),t.setRenderTarget(u),this.overrideMaterialManager!==null?this.overrideMaterialManager.render(t,r,a):t.render(r,a),a.layers.mask=l,r.background=c,t.shadowMap.autoUpdate=d}};var Uo=Math.PI*.5;var ha=`#include <common>
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
}`,pa="uniform vec2 resolution;uniform vec2 texelSize;uniform float cameraNear;uniform float cameraFar;uniform float aspect;uniform float time;varying vec2 vUv;VERTEX_HEAD void main(){vUv=position.xy*0.5+0.5;VERTEX_MAIN_SUPPORT gl_Position=vec4(position.xy,1.0,1.0);}",ma=class extends K{constructor(t,e,s,n,i=!1){super({name:"EffectMaterial",defines:{THREE_REVISION:"172".replace(/\D+/g,""),DEPTH_PACKING:"0",ENCODE_OUTPUT:"1"},uniforms:{inputBuffer:new S(null),depthBuffer:new S(null),resolution:new S(new _),texelSize:new S(new _),cameraNear:new S(.3),cameraFar:new S(1e3),aspect:new S(1),time:new S(0)},blending:re,toneMapped:!1,depthWrite:!1,depthTest:!1,dithering:i}),t&&this.setShaderParts(t),e&&this.setDefines(e),s&&this.setUniforms(s),this.copyCameraSettings(n)}set inputBuffer(t){this.uniforms.inputBuffer.value=t}setInputBuffer(t){this.uniforms.inputBuffer.value=t}get depthBuffer(){return this.uniforms.depthBuffer.value}set depthBuffer(t){this.uniforms.depthBuffer.value=t}get depthPacking(){return Number(this.defines.DEPTH_PACKING)}set depthPacking(t){this.defines.DEPTH_PACKING=t.toFixed(0),this.needsUpdate=!0}setDepthBuffer(t,e=Me){this.depthBuffer=t,this.depthPacking=e}setShaderData(t){this.setShaderParts(t.shaderParts),this.setDefines(t.defines),this.setUniforms(t.uniforms),this.setExtensions(t.extensions)}setShaderParts(t){return this.fragmentShader=ha.replace(k.FRAGMENT_HEAD,t.get(k.FRAGMENT_HEAD)||"").replace(k.FRAGMENT_MAIN_UV,t.get(k.FRAGMENT_MAIN_UV)||"").replace(k.FRAGMENT_MAIN_IMAGE,t.get(k.FRAGMENT_MAIN_IMAGE)||""),this.vertexShader=pa.replace(k.VERTEX_HEAD,t.get(k.VERTEX_HEAD)||"").replace(k.VERTEX_MAIN_SUPPORT,t.get(k.VERTEX_MAIN_SUPPORT)||""),this.needsUpdate=!0,this}setDefines(t){for(let e of t.entries())this.defines[e[0]]=e[1];return this.needsUpdate=!0,this}setUniforms(t){for(let e of t.entries())this.uniforms[e[0]]=e[1];return this}setExtensions(t){this.extensions={};for(let e of t)this.extensions[e]=!0;return this}get encodeOutput(){return this.defines.ENCODE_OUTPUT!==void 0}set encodeOutput(t){this.encodeOutput!==t&&(t?this.defines.ENCODE_OUTPUT="1":delete this.defines.ENCODE_OUTPUT,this.needsUpdate=!0)}isOutputEncodingEnabled(t){return this.encodeOutput}setOutputEncodingEnabled(t){this.encodeOutput=t}get time(){return this.uniforms.time.value}set time(t){this.uniforms.time.value=t}setDeltaTime(t){this.uniforms.time.value+=t}adoptCameraSettings(t){this.copyCameraSettings(t)}copyCameraSettings(t){t&&(this.uniforms.cameraNear.value=t.near,this.uniforms.cameraFar.value=t.far,t instanceof We?this.defines.PERSPECTIVE_CAMERA="1":delete this.defines.PERSPECTIVE_CAMERA,this.needsUpdate=!0)}setSize(t,e){let s=this.uniforms;s.resolution.value.set(t,e),s.texelSize.value.set(1/t,1/e),s.aspect.value=t/e}static get Section(){return k}};var Oo=Number("172".replace(/\D+/g,"")),ke=255/256,_o=new Float32Array([ke/256**3,ke/256**2,ke/256,ke]),ko=new Float32Array([ke,ke/256,ke/256**2,1/256**3]);function hi(t,e,s){for(let n of e){let i="$1"+t+n.charAt(0).toUpperCase()+n.slice(1),r=new RegExp("([^\\.])(\\b"+n+"\\b)","g");for(let a of s.entries())a[1]!==null&&s.set(a[0],a[1].replace(r,i))}}function ga(t,e,s){let n=e.getFragmentShader(),i=e.getVertexShader(),r=n!==void 0&&/mainImage/.test(n),a=n!==void 0&&/mainUv/.test(n);if(s.attributes|=e.getAttributes(),n===void 0)throw new Error(`Missing fragment shader (${e.name})`);if(a&&(s.attributes&Ie.CONVOLUTION)!==0)throw new Error(`Effects that transform UVs are incompatible with convolution effects (${e.name})`);if(!r&&!a)throw new Error(`Could not find mainImage or mainUv function (${e.name})`);{let o=/\w+\s+(\w+)\([\w\s,]*\)\s*{/g,l=s.shaderParts,c=l.get(k.FRAGMENT_HEAD)||"",d=l.get(k.FRAGMENT_MAIN_UV)||"",u=l.get(k.FRAGMENT_MAIN_IMAGE)||"",f=l.get(k.VERTEX_HEAD)||"",v=l.get(k.VERTEX_MAIN_SUPPORT)||"",g=new Set,A=new Set;if(a&&(d+=`	${t}MainUv(UV);
`,s.uvTransformation=!0),i!==null&&/mainSupport/.test(i)){let x=/mainSupport *\([\w\s]*?uv\s*?\)/.test(i);v+=`	${t}MainSupport(`,v+=x?`vUv);
`:`);
`;for(let C of i.matchAll(/(?:varying\s+\w+\s+([\S\s]*?);)/g))for(let y of C[1].split(/\s*,\s*/))s.varyings.add(y),g.add(y),A.add(y);for(let C of i.matchAll(o))A.add(C[1])}for(let x of n.matchAll(o))A.add(x[1]);for(let x of e.defines.keys())A.add(x.replace(/\([\w\s,]*\)/g,""));for(let x of e.uniforms.keys())A.add(x);A.delete("while"),A.delete("for"),A.delete("if"),e.uniforms.forEach((x,C)=>s.uniforms.set(t+C.charAt(0).toUpperCase()+C.slice(1),x)),e.defines.forEach((x,C)=>s.defines.set(t+C.charAt(0).toUpperCase()+C.slice(1),x));let m=new Map([["fragment",n],["vertex",i]]);hi(t,A,s.defines),hi(t,A,m),n=m.get("fragment"),i=m.get("vertex");let h=e.blendMode;if(s.blendModes.set(h.blendFunction,h),r){e.inputColorSpace!==null&&e.inputColorSpace!==s.colorSpace&&(u+=e.inputColorSpace===L?`color0 = sRGBTransferOETF(color0);
	`:`color0 = sRGBToLinear(color0);
	`),e.outputColorSpace!==yt?s.colorSpace=e.outputColorSpace:e.inputColorSpace!==null&&(s.colorSpace=e.inputColorSpace);let x=/MainImage *\([\w\s,]*?depth[\w\s,]*?\)/;u+=`${t}MainImage(color0, UV, `,(s.attributes&Ie.DEPTH)!==0&&x.test(n)&&(u+="depth, ",s.readDepth=!0),u+=`color1);
	`;let C=t+"BlendOpacity";s.uniforms.set(C,h.opacity),u+=`color0 = blend${h.blendFunction}(color0, color1, ${C});

	`,c+=`uniform float ${C};

`}if(c+=n+`
`,i!==null&&(f+=i+`
`),l.set(k.FRAGMENT_HEAD,c),l.set(k.FRAGMENT_MAIN_UV,d),l.set(k.FRAGMENT_MAIN_IMAGE,u),l.set(k.VERTEX_HEAD,f),l.set(k.VERTEX_MAIN_SUPPORT,v),e.extensions!==null)for(let x of e.extensions)s.extensions.add(x)}}var wi=class extends ae{constructor(t,...e){super("EffectPass"),this.fullscreenMaterial=new ma(null,null,null,t),this.listener=s=>this.handleEvent(s),this.effects=[],this.setEffects(e),this.skipRendering=!1,this.minTime=1,this.maxTime=Number.POSITIVE_INFINITY,this.timeScale=1}set mainScene(t){for(let e of this.effects)e.mainScene=t}set mainCamera(t){this.fullscreenMaterial.copyCameraSettings(t);for(let e of this.effects)e.mainCamera=t}get encodeOutput(){return this.fullscreenMaterial.encodeOutput}set encodeOutput(t){this.fullscreenMaterial.encodeOutput=t}get dithering(){return this.fullscreenMaterial.dithering}set dithering(t){let e=this.fullscreenMaterial;e.dithering=t,e.needsUpdate=!0}setEffects(t){for(let e of this.effects)e.removeEventListener("change",this.listener);this.effects=t.sort((e,s)=>s.attributes-e.attributes);for(let e of this.effects)e.addEventListener("change",this.listener)}updateMaterial(){let t=new pr,e=0;for(let a of this.effects)if(a.blendMode.blendFunction===I.DST)t.attributes|=a.getAttributes()&Ie.DEPTH;else{if((t.attributes&a.getAttributes()&Ie.CONVOLUTION)!==0)throw new Error(`Convolution effects cannot be merged (${a.name})`);ga("e"+e++,a,t)}let s=t.shaderParts.get(k.FRAGMENT_HEAD),n=t.shaderParts.get(k.FRAGMENT_MAIN_IMAGE),i=t.shaderParts.get(k.FRAGMENT_MAIN_UV),r=/\bblend\b/g;for(let a of t.blendModes.values())s+=a.getShaderCode().replace(r,`blend${a.blendFunction}`)+`
`;(t.attributes&Ie.DEPTH)!==0?(t.readDepth&&(n=`float depth = readDepth(UV);

	`+n),this.needsDepthTexture=this.getDepthTexture()===null):this.needsDepthTexture=!1,t.colorSpace===L&&(n+=`color0 = sRGBToLinear(color0);
	`),t.uvTransformation?(i=`vec2 transformedUv = vUv;
`+i,t.defines.set("UV","transformedUv")):t.defines.set("UV","vUv"),t.shaderParts.set(k.FRAGMENT_HEAD,s),t.shaderParts.set(k.FRAGMENT_MAIN_IMAGE,n),t.shaderParts.set(k.FRAGMENT_MAIN_UV,i);for(let[a,o]of t.shaderParts)o!==null&&t.shaderParts.set(a,o.trim().replace(/^#/,`
#`));this.skipRendering=e===0,this.needsSwap=!this.skipRendering,this.fullscreenMaterial.setShaderData(t)}recompile(){this.updateMaterial()}getDepthTexture(){return this.fullscreenMaterial.depthBuffer}setDepthTexture(t,e=Me){this.fullscreenMaterial.depthBuffer=t,this.fullscreenMaterial.depthPacking=e;for(let s of this.effects)s.setDepthTexture(t,e)}render(t,e,s,n,i){for(let r of this.effects)r.update(t,e,n);if(!this.skipRendering||this.renderToScreen){let r=this.fullscreenMaterial;r.inputBuffer=e.texture,r.time+=n*this.timeScale,t.setRenderTarget(this.renderToScreen?null:s),t.render(this.scene,this.camera)}}setSize(t,e){this.fullscreenMaterial.setSize(t,e);for(let s of this.effects)s.setSize(t,e)}initialize(t,e,s){this.renderer=t;for(let n of this.effects)n.initialize(t,e,s);this.updateMaterial(),s!==void 0&&s!==te&&(this.fullscreenMaterial.defines.FRAMEBUFFER_PRECISION_HIGH="1")}dispose(){super.dispose();for(let t of this.effects)t.removeEventListener("change",this.listener),t.dispose()}handleEvent(t){t.type==="change"&&this.recompile()}};var Go=[new Float32Array(3),new Float32Array(3)],zo=[new Float32Array(3),new Float32Array(3),new Float32Array(3),new Float32Array(3)],Qo=[[new Float32Array([0,0,0]),new Float32Array([1,0,0]),new Float32Array([1,1,0]),new Float32Array([1,1,1])],[new Float32Array([0,0,0]),new Float32Array([1,0,0]),new Float32Array([1,0,1]),new Float32Array([1,1,1])],[new Float32Array([0,0,0]),new Float32Array([0,0,1]),new Float32Array([1,0,1]),new Float32Array([1,1,1])],[new Float32Array([0,0,0]),new Float32Array([0,1,0]),new Float32Array([1,1,0]),new Float32Array([1,1,1])],[new Float32Array([0,0,0]),new Float32Array([0,1,0]),new Float32Array([0,1,1]),new Float32Array([1,1,1])],[new Float32Array([0,0,0]),new Float32Array([0,0,1]),new Float32Array([0,1,1]),new Float32Array([1,1,1])]];var Xo=[new Float32Array(2),new Float32Array(2)];var Yo=new Float32Array([0,-.25,.25,-.125,.125,-.375,.375]),Vo=[new Float32Array([0,0]),new Float32Array([.25,-.25]),new Float32Array([-.25,.25]),new Float32Array([.125,-.125]),new Float32Array([-.125,.125])],Wo=[new Uint8Array([0,0]),new Uint8Array([3,0]),new Uint8Array([0,3]),new Uint8Array([3,3]),new Uint8Array([1,0]),new Uint8Array([4,0]),new Uint8Array([1,3]),new Uint8Array([4,3]),new Uint8Array([0,1]),new Uint8Array([3,1]),new Uint8Array([0,4]),new Uint8Array([3,4]),new Uint8Array([1,1]),new Uint8Array([4,1]),new Uint8Array([1,4]),new Uint8Array([4,4])],jo=[new Uint8Array([0,0]),new Uint8Array([1,0]),new Uint8Array([0,2]),new Uint8Array([1,2]),new Uint8Array([2,0]),new Uint8Array([3,0]),new Uint8Array([2,2]),new Uint8Array([3,2]),new Uint8Array([0,1]),new Uint8Array([1,1]),new Uint8Array([0,3]),new Uint8Array([1,3]),new Uint8Array([2,1]),new Uint8Array([3,1]),new Uint8Array([2,3]),new Uint8Array([3,3])];var Ko=new Map([[$(0,0,0,0),new Float32Array([0,0,0,0])],[$(0,0,0,1),new Float32Array([0,0,0,1])],[$(0,0,1,0),new Float32Array([0,0,1,0])],[$(0,0,1,1),new Float32Array([0,0,1,1])],[$(0,1,0,0),new Float32Array([0,1,0,0])],[$(0,1,0,1),new Float32Array([0,1,0,1])],[$(0,1,1,0),new Float32Array([0,1,1,0])],[$(0,1,1,1),new Float32Array([0,1,1,1])],[$(1,0,0,0),new Float32Array([1,0,0,0])],[$(1,0,0,1),new Float32Array([1,0,0,1])],[$(1,0,1,0),new Float32Array([1,0,1,0])],[$(1,0,1,1),new Float32Array([1,0,1,1])],[$(1,1,0,0),new Float32Array([1,1,0,0])],[$(1,1,0,1),new Float32Array([1,1,0,1])],[$(1,1,1,0),new Float32Array([1,1,1,0])],[$(1,1,1,1),new Float32Array([1,1,1,1])]]);function ms(t,e,s){return t+(e-t)*s}function $(t,e,s,n){let i=ms(t,e,.75),r=ms(s,n,1-.25);return ms(i,r,1-.125)}var Rt=class{constructor(e,s,n){if(this.stage=e,this.debug=n,this.composer=new vi(e.renderer,{alpha:!1}),this.chromaEffect=new Ti,this.bloomEffect=new xi({resolutionScale:.5}),this.params={bloomIntensity:.87,bloomLuminanceThreshold:0,bloomLuminanceSmoothing:0,bloomKernelSize:qe.LARGE,chromaOffsetX:3e-4,chromaOffsetY:0},this.renderScenePass=new Ei(e.scene,e.camera),this.outlinePass=new vs(s.outlineShaderMaterial,"tDiffuse"),this.fxaaPass=new vs(s.fxaaShaderMaterial,"tDiffuse"),this.effectPass=new wi(e.camera),this.composer.addPass(this.renderScenePass),this.composer.addPass(this.outlinePass),this.composer.addPass(this.effectPass),this.updateDimensions(),this.updateEffects(),this.debug.enabled){let i=this.debug.gui.addFolder("Post processing");i.add(this.params,"bloomIntensity").min(0).max(10).step(.01).name("Bloom intensity").onChange(this.updateEffects.bind(this)),i.add(this.params,"bloomLuminanceThreshold").min(0).max(10).step(.01).name("Bloom threshold").onChange(this.updateEffects.bind(this)),i.add(this.params,"bloomLuminanceSmoothing").min(0).max(10).step(.01).name("Bloom smoothing").onChange(this.updateEffects.bind(this)),i.add(this.params,"bloomKernelSize",qe).name("Bloom KernelSize").onChange(this.updateEffects.bind(this)),i.add(this.params,"chromaOffsetX").min(0).max(.001).step(1e-5).name("Chroma x").onChange(this.updateEffects.bind(this)),i.add(this.params,"chromaOffsetY").min(0).max(.001).step(1e-5).name("Chroma y").onChange(this.updateEffects.bind(this))}}updateEffects(){this.bloomEffect.intensity=this.params.bloomIntensity,this.bloomEffect.luminanceMaterial.uniforms.threshold.value=this.params.bloomLuminanceThreshold,this.bloomEffect.luminanceMaterial.uniforms.smoothing.value=this.params.bloomLuminanceSmoothing,this.bloomEffect.kernelSize=this.params.bloomKernelSize,this.chromaEffect.uniforms.get("offset").value.x=this.params.chromaOffsetX,this.chromaEffect.uniforms.get("offset").value.y=this.params.chromaOffsetY}render(){this.composer.render()}updateDimensions(){let e=window.devicePixelRatio>2?3:2;this.composer.setSize(this.stage.width*e,this.stage.height*e,!1)}};var As={vertex:`
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
  `};var xs={uniforms:{tDiffuse:{value:null},resolution:{value:new _(1/1024,1/512)}},vertexShader:`

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
    }`};var Ut=class{constructor(e,s){if(this.stage=e,this.debug=s,this.dummyColor=new X,this.colors={backgroundColor:p.get(document.documentElement,"--backgroundColor"),outlineColor:p.get(document.documentElement,"--outlineColor"),outlineColorLight:p.get(document.documentElement,"--outlineColorLight"),rimColor:p.get(document.documentElement,"--rimColor"),shadowColor:p.get(document.documentElement,"--shadowColor"),worldColor1:p.get(document.documentElement,"--worldColor1"),worldColorLight1:p.get(document.documentElement,"--worldColorLight1")},this.outlineMaterialParams={verticesNormalMix:.08,rimThreshold:1,rimAmount:.25},this.outlinePassParams={resolutionScale:4,verticesNormalMix:.18,threshold:.035,outlineThickness:1,outlineBlend:.4,contourBlend:.65,sourceMix:1,effectMix:1,backgroundMix:1,rimIntensity:1,shadowIntensity:1},this.outlineMaterial=new Qn({vertexColors:!0}),this.outlineMaterial.onBeforeCompile=n=>{n.uniforms.verticesNormalMix={value:this.outlineMaterialParams.verticesNormalMix},n.uniforms.rimThreshold={value:this.outlineMaterialParams.rimThreshold},n.uniforms.rimAmount={value:this.outlineMaterialParams.rimAmount},n.vertexShader=n.vertexShader.replace("void main() {",`
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
        `),this.outlineMaterial.userData.shader=n},this.outlinePassColors={backgroundColor:this.colors.backgroundColor,outlineColor:this.colors.outlineColor,rimColor:this.colors.rimColor,shadowColor:this.colors.shadowColor,worldColor1:this.colors.worldColor1},this.outlineShaderMaterial=new K({vertexShader:As.vertex,fragmentShader:As.fragment,transparent:!0,uniforms:{tDiffuse:new S(null),resolutionScale:new S(this.outlinePassParams.resolutionScale),resolution:new S(new _(e.width*this.outlinePassParams.resolutionScale,e.height*this.outlinePassParams.resolutionScale)),threshold:new S(this.outlinePassParams.threshold),outlineThickness:new S(this.outlinePassParams.outlineThickness),outlineBlend:new S(this.outlinePassParams.outlineBlend),contourBlend:new S(this.outlinePassParams.contourBlend),sourceMix:new S(this.outlinePassParams.sourceMix),effectMix:new S(this.outlinePassParams.effectMix),backgroundMix:new S(this.outlinePassParams.backgroundMix),backgroundColor:new S(new X(this.outlinePassColors.backgroundColor)),outlineColor:new S(new X(this.outlinePassColors.outlineColor)),rimColor:new S(new X(this.outlinePassColors.rimColor)),rimIntensity:new S(this.outlinePassParams.rimIntensity),shadowColor:new S(new X(this.outlinePassColors.shadowColor)),shadowIntensity:new S(this.outlinePassParams.shadowIntensity),worldColor1:new S(new X(this.outlinePassColors.worldColor1))}}),this.updateDimensions(),this.debug.enabled){let r=function(o){i.uniforms[this._name].value=o},n=this.debug.gui.addFolder("Outlines");n.add(this.outlinePassParams,"resolutionScale",.25,16,.25).onChange(o=>{this.outlineShaderMaterial.uniforms.resolution.value.set(e.width*o,e.height*o)}),n.add(this.outlineMaterialParams,"verticesNormalMix",0,1,.01).onChange(o=>{this.outlineMaterial.userData.shader.uniforms.verticesNormalMix.value=o}),n.add(this.outlineMaterialParams,"rimThreshold",0,1,.01).onChange(o=>{this.outlineMaterial.userData.shader.uniforms.rimThreshold.value=o}),n.add(this.outlineMaterialParams,"rimAmount",0,1,.01).onChange(o=>{this.outlineMaterial.userData.shader.uniforms.rimAmount.value=o});let i=this.outlineShaderMaterial;n.add(this.outlineShaderMaterial.uniforms.threshold,"value",.001,.1,.001).name("threshold").onChange(r),n.add(this.outlineShaderMaterial.uniforms.outlineThickness,"value",.01,16,.01).name("outlineThickness").onChange(r),n.add(this.outlineShaderMaterial.uniforms.outlineBlend,"value",.01,1,.01).name("outlineBlend").onChange(r),n.add(this.outlineShaderMaterial.uniforms.contourBlend,"value",.01,1,.01).name("contourBlend").onChange(r),n.add(this.outlineShaderMaterial.uniforms.sourceMix,"value",0,1,.01).name("sourceMix").onChange(r),n.add(this.outlineShaderMaterial.uniforms.effectMix,"value",0,1,.01).name("effectMix").onChange(r),n.add(this.outlineShaderMaterial.uniforms.backgroundMix,"value",0,1,.01).name("backgroundMix").onChange(r),n.add(this.outlineShaderMaterial.uniforms.rimIntensity,"value",0,1,.01).name("rimIntensity").onChange(r),n.add(this.outlineShaderMaterial.uniforms.shadowIntensity,"value",0,1,.01).name("shadowIntensity").onChange(r);let a=this.debug.gui.addFolder("Colors");for(let o in this.outlinePassColors)a.addColor(this.outlinePassColors,o,this.outlinePassColors[o]).onChange(l=>{this.outlineShaderMaterial.uniforms[o].value=new X(l),o==="backgroundColor"&&(document.body.style.backgroundColor=l,document.documentElement.style.backgroundColor=l)})}this.fxaaShaderMaterial=new K({vertexShader:xs.vertexShader,fragmentShader:xs.fragmentShader,uniforms:{tDiffuse:new S(null),resolutionScale:new S(1),resolution:new S(new _(1/e.width,1/e.height))}})}updateDimensions(){this.outlineShaderMaterial.uniforms.resolution.value.set(this.stage.width*this.outlinePassParams.resolutionScale,this.stage.height*this.outlinePassParams.resolutionScale)}};function Ts(t,e){if(e===Dn)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),t;if(e===at||e===St){let s=t.getIndex();if(s===null){let a=[],o=t.getAttribute("position");if(o!==void 0){for(let l=0;l<o.count;l++)a.push(l);t.setIndex(a),s=t.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),t}let n=s.count-2,i=[];if(e===at)for(let a=1;a<=n;a++)i.push(s.getX(0)),i.push(s.getX(a)),i.push(s.getX(a+1));else for(let a=0;a<n;a++)a%2===0?(i.push(s.getX(a)),i.push(s.getX(a+1)),i.push(s.getX(a+2))):(i.push(s.getX(a+2)),i.push(s.getX(a+1)),i.push(s.getX(a)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");let r=t.clone();return r.setIndex(i),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),t}var Nt=class extends Ct{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(s){return new Ms(s)}),this.register(function(s){return new bs(s)}),this.register(function(s){return new Os(s)}),this.register(function(s){return new _s(s)}),this.register(function(s){return new ks(s)}),this.register(function(s){return new Is(s)}),this.register(function(s){return new Fs(s)}),this.register(function(s){return new Ls(s)}),this.register(function(s){return new Bs(s)}),this.register(function(s){return new Ds(s)}),this.register(function(s){return new Rs(s)}),this.register(function(s){return new Ps(s)}),this.register(function(s){return new Ns(s)}),this.register(function(s){return new Us(s)}),this.register(function(s){return new ys(s)}),this.register(function(s){return new Hs(s)}),this.register(function(s){return new Gs(s)})}load(e,s,n,i){let r=this,a;if(this.resourcePath!=="")a=this.resourcePath;else if(this.path!==""){let c=Ke.extractUrlBase(e);a=Ke.resolveURL(c,this.path)}else a=Ke.extractUrlBase(e);this.manager.itemStart(e);let o=function(c){i?i(c):console.error(c),r.manager.itemError(e),r.manager.itemEnd(e)},l=new je(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{r.parse(c,a,function(d){s(d),r.manager.itemEnd(e)},o)}catch(d){o(d)}},n,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,s,n,i){let r,a={},o={},l=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===Mi){try{a[b.KHR_BINARY_GLTF]=new zs(e)}catch(u){i&&i(u);return}r=JSON.parse(a[b.KHR_BINARY_GLTF].content)}else r=JSON.parse(l.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let c=new Ks(r,{path:s||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let d=0;d<this.pluginCallbacks.length;d++){let u=this.pluginCallbacks[d](c);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[u.name]=u,a[u.name]=!0}if(r.extensionsUsed)for(let d=0;d<r.extensionsUsed.length;++d){let u=r.extensionsUsed[d],f=r.extensionsRequired||[];switch(u){case b.KHR_MATERIALS_UNLIT:a[u]=new Cs;break;case b.KHR_DRACO_MESH_COMPRESSION:a[u]=new Qs(r,this.dracoLoader);break;case b.KHR_TEXTURE_TRANSFORM:a[u]=new Xs;break;case b.KHR_MESH_QUANTIZATION:a[u]=new Ys;break;default:f.indexOf(u)>=0&&o[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}c.setExtensions(a),c.setPlugins(o),c.parse(n,i)}parseAsync(e,s){let n=this;return new Promise(function(i,r){n.parse(e,s,i,r)})}};function va(){let t={};return{get:function(e){return t[e]},add:function(e,s){t[e]=s},remove:function(e){delete t[e]},removeAll:function(){t={}}}}var b={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"},ys=class{constructor(e){this.parser=e,this.name=b.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,s=this.parser.json.nodes||[];for(let n=0,i=s.length;n<i;n++){let r=s[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){let s=this.parser,n="light:"+e,i=s.cache.get(n);if(i)return i;let r=s.json,l=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e],c,d=new X(16777215);l.color!==void 0&&d.setRGB(l.color[0],l.color[1],l.color[2],q);let u=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new Dt(d),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new Kn(d),c.distance=u;break;case"spot":c=new jn(d),c.distance=u,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),c.decay=2,Se(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=s.createUniqueName(l.name||"light_"+e),i=Promise.resolve(c),s.cache.add(n,i),i}getDependency(e,s){if(e==="light")return this._loadLight(s)}createNodeAttachment(e){let s=this,n=this.parser,r=n.json.nodes[e],o=(r.extensions&&r.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(l){return n._getNodeRef(s.cache,o,l)})}},Cs=class{constructor(){this.name=b.KHR_MATERIALS_UNLIT}getMaterialType(){return Ve}extendParams(e,s,n){let i=[];e.color=new X(1,1,1),e.opacity=1;let r=s.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){let a=r.baseColorFactor;e.color.setRGB(a[0],a[1],a[2],q),e.opacity=a[3]}r.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",r.baseColorTexture,L))}return Promise.all(i)}},Ds=class{constructor(e){this.parser=e,this.name=b.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,s){let i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=i.extensions[this.name].emissiveStrength;return r!==void 0&&(s.emissiveIntensity=r),Promise.resolve()}},Ms=class{constructor(e){this.parser=e,this.name=b.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:fe}extendMaterialParams(e,s){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],a=i.extensions[this.name];if(a.clearcoatFactor!==void 0&&(s.clearcoat=a.clearcoatFactor),a.clearcoatTexture!==void 0&&r.push(n.assignTexture(s,"clearcoatMap",a.clearcoatTexture)),a.clearcoatRoughnessFactor!==void 0&&(s.clearcoatRoughness=a.clearcoatRoughnessFactor),a.clearcoatRoughnessTexture!==void 0&&r.push(n.assignTexture(s,"clearcoatRoughnessMap",a.clearcoatRoughnessTexture)),a.clearcoatNormalTexture!==void 0&&(r.push(n.assignTexture(s,"clearcoatNormalMap",a.clearcoatNormalTexture)),a.clearcoatNormalTexture.scale!==void 0)){let o=a.clearcoatNormalTexture.scale;s.clearcoatNormalScale=new _(o,o)}return Promise.all(r)}},bs=class{constructor(e){this.parser=e,this.name=b.KHR_MATERIALS_DISPERSION}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:fe}extendMaterialParams(e,s){let i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=i.extensions[this.name];return s.dispersion=r.dispersion!==void 0?r.dispersion:0,Promise.resolve()}},Ps=class{constructor(e){this.parser=e,this.name=b.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:fe}extendMaterialParams(e,s){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],a=i.extensions[this.name];return a.iridescenceFactor!==void 0&&(s.iridescence=a.iridescenceFactor),a.iridescenceTexture!==void 0&&r.push(n.assignTexture(s,"iridescenceMap",a.iridescenceTexture)),a.iridescenceIor!==void 0&&(s.iridescenceIOR=a.iridescenceIor),s.iridescenceThicknessRange===void 0&&(s.iridescenceThicknessRange=[100,400]),a.iridescenceThicknessMinimum!==void 0&&(s.iridescenceThicknessRange[0]=a.iridescenceThicknessMinimum),a.iridescenceThicknessMaximum!==void 0&&(s.iridescenceThicknessRange[1]=a.iridescenceThicknessMaximum),a.iridescenceThicknessTexture!==void 0&&r.push(n.assignTexture(s,"iridescenceThicknessMap",a.iridescenceThicknessTexture)),Promise.all(r)}},Is=class{constructor(e){this.parser=e,this.name=b.KHR_MATERIALS_SHEEN}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:fe}extendMaterialParams(e,s){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[];s.sheenColor=new X(0,0,0),s.sheenRoughness=0,s.sheen=1;let a=i.extensions[this.name];if(a.sheenColorFactor!==void 0){let o=a.sheenColorFactor;s.sheenColor.setRGB(o[0],o[1],o[2],q)}return a.sheenRoughnessFactor!==void 0&&(s.sheenRoughness=a.sheenRoughnessFactor),a.sheenColorTexture!==void 0&&r.push(n.assignTexture(s,"sheenColorMap",a.sheenColorTexture,L)),a.sheenRoughnessTexture!==void 0&&r.push(n.assignTexture(s,"sheenRoughnessMap",a.sheenRoughnessTexture)),Promise.all(r)}},Fs=class{constructor(e){this.parser=e,this.name=b.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:fe}extendMaterialParams(e,s){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],a=i.extensions[this.name];return a.transmissionFactor!==void 0&&(s.transmission=a.transmissionFactor),a.transmissionTexture!==void 0&&r.push(n.assignTexture(s,"transmissionMap",a.transmissionTexture)),Promise.all(r)}},Ls=class{constructor(e){this.parser=e,this.name=b.KHR_MATERIALS_VOLUME}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:fe}extendMaterialParams(e,s){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],a=i.extensions[this.name];s.thickness=a.thicknessFactor!==void 0?a.thicknessFactor:0,a.thicknessTexture!==void 0&&r.push(n.assignTexture(s,"thicknessMap",a.thicknessTexture)),s.attenuationDistance=a.attenuationDistance||1/0;let o=a.attenuationColor||[1,1,1];return s.attenuationColor=new X().setRGB(o[0],o[1],o[2],q),Promise.all(r)}},Bs=class{constructor(e){this.parser=e,this.name=b.KHR_MATERIALS_IOR}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:fe}extendMaterialParams(e,s){let i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=i.extensions[this.name];return s.ior=r.ior!==void 0?r.ior:1.5,Promise.resolve()}},Rs=class{constructor(e){this.parser=e,this.name=b.KHR_MATERIALS_SPECULAR}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:fe}extendMaterialParams(e,s){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],a=i.extensions[this.name];s.specularIntensity=a.specularFactor!==void 0?a.specularFactor:1,a.specularTexture!==void 0&&r.push(n.assignTexture(s,"specularIntensityMap",a.specularTexture));let o=a.specularColorFactor||[1,1,1];return s.specularColor=new X().setRGB(o[0],o[1],o[2],q),a.specularColorTexture!==void 0&&r.push(n.assignTexture(s,"specularColorMap",a.specularColorTexture,L)),Promise.all(r)}},Us=class{constructor(e){this.parser=e,this.name=b.EXT_MATERIALS_BUMP}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:fe}extendMaterialParams(e,s){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],a=i.extensions[this.name];return s.bumpScale=a.bumpFactor!==void 0?a.bumpFactor:1,a.bumpTexture!==void 0&&r.push(n.assignTexture(s,"bumpMap",a.bumpTexture)),Promise.all(r)}},Ns=class{constructor(e){this.parser=e,this.name=b.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:fe}extendMaterialParams(e,s){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let r=[],a=i.extensions[this.name];return a.anisotropyStrength!==void 0&&(s.anisotropy=a.anisotropyStrength),a.anisotropyRotation!==void 0&&(s.anisotropyRotation=a.anisotropyRotation),a.anisotropyTexture!==void 0&&r.push(n.assignTexture(s,"anisotropyMap",a.anisotropyTexture)),Promise.all(r)}},Os=class{constructor(e){this.parser=e,this.name=b.KHR_TEXTURE_BASISU}loadTexture(e){let s=this.parser,n=s.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;let r=i.extensions[this.name],a=s.options.ktx2Loader;if(!a){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return s.loadTextureImage(e,r.source,a)}},_s=class{constructor(e){this.parser=e,this.name=b.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){let s=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[s])return null;let a=r.extensions[s],o=i.images[a.source],l=n.textureLoader;if(o.uri){let c=n.options.manager.getHandler(o.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return n.loadTextureImage(e,a.source,l);if(i.extensionsRequired&&i.extensionsRequired.indexOf(s)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){let s=new Image;s.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",s.onload=s.onerror=function(){e(s.height===1)}})),this.isSupported}},ks=class{constructor(e){this.parser=e,this.name=b.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){let s=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[s])return null;let a=r.extensions[s],o=i.images[a.source],l=n.textureLoader;if(o.uri){let c=n.options.manager.getHandler(o.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return n.loadTextureImage(e,a.source,l);if(i.extensionsRequired&&i.extensionsRequired.indexOf(s)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){let s=new Image;s.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",s.onload=s.onerror=function(){e(s.height===1)}})),this.isSupported}},Hs=class{constructor(e){this.name=b.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){let s=this.parser.json,n=s.bufferViews[e];if(n.extensions&&n.extensions[this.name]){let i=n.extensions[this.name],r=this.parser.getDependency("buffer",i.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(s.extensionsRequired&&s.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(o){let l=i.byteOffset||0,c=i.byteLength||0,d=i.count,u=i.byteStride,f=new Uint8Array(o,l,c);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(d,u,f,i.mode,i.filter).then(function(v){return v.buffer}):a.ready.then(function(){let v=new ArrayBuffer(d*u);return a.decodeGltfBuffer(new Uint8Array(v),d,u,f,i.mode,i.filter),v})})}else return null}},Gs=class{constructor(e){this.name=b.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let s=this.parser.json,n=s.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;let i=s.meshes[n.mesh];for(let c of i.primitives)if(c.mode!==oe.TRIANGLES&&c.mode!==oe.TRIANGLE_STRIP&&c.mode!==oe.TRIANGLE_FAN&&c.mode!==void 0)return null;let a=n.extensions[this.name].attributes,o=[],l={};for(let c in a)o.push(this.parser.getDependency("accessor",a[c]).then(d=>(l[c]=d,l[c])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(c=>{let d=c.pop(),u=d.isGroup?d.children:[d],f=c[0].count,v=[];for(let g of u){let A=new ue,m=new j,h=new lt,x=new j(1,1,1),C=new Rn(g.geometry,g.material,f);for(let y=0;y<f;y++)l.TRANSLATION&&m.fromBufferAttribute(l.TRANSLATION,y),l.ROTATION&&h.fromBufferAttribute(l.ROTATION,y),l.SCALE&&x.fromBufferAttribute(l.SCALE,y),C.setMatrixAt(y,A.compose(m,h,x));for(let y in l)if(y==="_COLOR_0"){let B=l[y];C.instanceColor=new os(B.array,B.itemSize,B.normalized)}else y!=="TRANSLATION"&&y!=="ROTATION"&&y!=="SCALE"&&g.geometry.setAttribute(y,l[y]);Ne.prototype.copy.call(C,g),this.parser.assignFinalMaterial(C),v.push(C)}return d.isGroup?(d.clear(),d.add(...v),d):v[0]}))}},Mi="glTF",dt=12,Si={JSON:1313821514,BIN:5130562},zs=class{constructor(e){this.name=b.KHR_BINARY_GLTF,this.content=null,this.body=null;let s=new DataView(e,0,dt),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:s.getUint32(4,!0),length:s.getUint32(8,!0)},this.header.magic!==Mi)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");let i=this.header.length-dt,r=new DataView(e,dt),a=0;for(;a<i;){let o=r.getUint32(a,!0);a+=4;let l=r.getUint32(a,!0);if(a+=4,l===Si.JSON){let c=new Uint8Array(e,dt+a,o);this.content=n.decode(c)}else if(l===Si.BIN){let c=dt+a;this.body=e.slice(c,c+o)}a+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}},Qs=class{constructor(e,s){if(!s)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=b.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=s,this.dracoLoader.preload()}decodePrimitive(e,s){let n=this.json,i=this.dracoLoader,r=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},l={},c={};for(let d in a){let u=Ws[d]||d.toLowerCase();o[u]=a[d]}for(let d in e.attributes){let u=Ws[d]||d.toLowerCase();if(a[d]!==void 0){let f=n.accessors[e.attributes[d]],v=Je[f.componentType];c[u]=v.name,l[u]=f.normalized===!0}}return s.getDependency("bufferView",r).then(function(d){return new Promise(function(u,f){i.decodeDracoFile(d,function(v){for(let g in v.attributes){let A=v.attributes[g],m=l[g];m!==void 0&&(A.normalized=m)}u(v)},o,c,q,f)})})}},Xs=class{constructor(){this.name=b.KHR_TEXTURE_TRANSFORM}extendTexture(e,s){return(s.texCoord===void 0||s.texCoord===e.channel)&&s.offset===void 0&&s.rotation===void 0&&s.scale===void 0||(e=e.clone(),s.texCoord!==void 0&&(e.channel=s.texCoord),s.offset!==void 0&&e.offset.fromArray(s.offset),s.rotation!==void 0&&(e.rotation=s.rotation),s.scale!==void 0&&e.repeat.fromArray(s.scale),e.needsUpdate=!0),e}},Ys=class{constructor(){this.name=b.KHR_MESH_QUANTIZATION}},Ot=class extends Xn{constructor(e,s,n,i){super(e,s,n,i)}copySampleValue_(e){let s=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i*3+i;for(let a=0;a!==i;a++)s[a]=n[r+a];return s}interpolate_(e,s,n,i){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=o*2,c=o*3,d=i-s,u=(n-s)/d,f=u*u,v=f*u,g=e*c,A=g-c,m=-2*v+3*f,h=v-f,x=1-m,C=h-f+u;for(let y=0;y!==o;y++){let B=a[A+y+o],F=a[A+y+l]*d,T=a[g+y+o],P=a[g+y]*d;r[y]=x*B+C*F+m*T+h*P}return r}},Aa=new lt,Vs=class extends Ot{interpolate_(e,s,n,i){let r=super.interpolate_(e,s,n,i);return Aa.fromArray(r).normalize().toArray(r),r}},oe={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},Je={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},yi={9728:es,9729:me,9984:xn,9985:En,9986:Tn,9987:ts},Ci={33071:vn,33648:An,10497:wt},Es={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Ws={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},Fe={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},xa={CUBICSPLINE:void 0,LINEAR:ss,STEP:Cn},ws={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function Ta(t){return t.DefaultMaterial===void 0&&(t.DefaultMaterial=new ls({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Et})),t.DefaultMaterial}function He(t,e,s){for(let n in s.extensions)t[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=s.extensions[n])}function Se(t,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(t.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function Ea(t,e,s){let n=!1,i=!1,r=!1;for(let c=0,d=e.length;c<d;c++){let u=e[c];if(u.POSITION!==void 0&&(n=!0),u.NORMAL!==void 0&&(i=!0),u.COLOR_0!==void 0&&(r=!0),n&&i&&r)break}if(!n&&!i&&!r)return Promise.resolve(t);let a=[],o=[],l=[];for(let c=0,d=e.length;c<d;c++){let u=e[c];if(n){let f=u.POSITION!==void 0?s.getDependency("accessor",u.POSITION):t.attributes.position;a.push(f)}if(i){let f=u.NORMAL!==void 0?s.getDependency("accessor",u.NORMAL):t.attributes.normal;o.push(f)}if(r){let f=u.COLOR_0!==void 0?s.getDependency("accessor",u.COLOR_0):t.attributes.color;l.push(f)}}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(l)]).then(function(c){let d=c[0],u=c[1],f=c[2];return n&&(t.morphAttributes.position=d),i&&(t.morphAttributes.normal=u),r&&(t.morphAttributes.color=f),t.morphTargetsRelative=!0,t})}function wa(t,e){if(t.updateMorphTargets(),e.weights!==void 0)for(let s=0,n=e.weights.length;s<n;s++)t.morphTargetInfluences[s]=e.weights[s];if(e.extras&&Array.isArray(e.extras.targetNames)){let s=e.extras.targetNames;if(t.morphTargetInfluences.length===s.length){t.morphTargetDictionary={};for(let n=0,i=s.length;n<i;n++)t.morphTargetDictionary[s[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function Sa(t){let e,s=t.extensions&&t.extensions[b.KHR_DRACO_MESH_COMPRESSION];if(s?e="draco:"+s.bufferView+":"+s.indices+":"+Ss(s.attributes):e=t.indices+":"+Ss(t.attributes)+":"+t.mode,t.targets!==void 0)for(let n=0,i=t.targets.length;n<i;n++)e+=":"+Ss(t.targets[n]);return e}function Ss(t){let e="",s=Object.keys(t).sort();for(let n=0,i=s.length;n<i;n++)e+=s[n]+":"+t[s[n]]+";";return e}function js(t){switch(t){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function ya(t){return t.search(/\.jpe?g($|\?)/i)>0||t.search(/^data\:image\/jpeg/)===0?"image/jpeg":t.search(/\.webp($|\?)/i)>0||t.search(/^data\:image\/webp/)===0?"image/webp":t.search(/\.ktx2($|\?)/i)>0||t.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}var Ca=new ue,Ks=class{constructor(e={},s={}){this.json=e,this.extensions={},this.plugins={},this.options=s,this.cache=new va,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=-1,r=!1,a=-1;if(typeof navigator<"u"){let o=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(o)===!0;let l=o.match(/Version\/(\d+)/);i=n&&l?parseInt(l[1],10):-1,r=o.indexOf("Firefox")>-1,a=r?o.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&i<17||r&&a<98?this.textureLoader=new Wn(this.options.manager):this.textureLoader=new Jn(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new je(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,s){let n=this,i=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(a){let o={scene:a[0][i.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:i.asset,parser:n,userData:{}};return He(r,o,i),Se(o,i),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(o)})).then(function(){for(let l of o.scenes)l.updateMatrixWorld();e(o)})}).catch(s)}_markDefs(){let e=this.json.nodes||[],s=this.json.skins||[],n=this.json.meshes||[];for(let i=0,r=s.length;i<r;i++){let a=s[i].joints;for(let o=0,l=a.length;o<l;o++)e[a[o]].isBone=!0}for(let i=0,r=e.length;i<r;i++){let a=e[i];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(n[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(e,s){s!==void 0&&(e.refs[s]===void 0&&(e.refs[s]=e.uses[s]=0),e.refs[s]++)}_getNodeRef(e,s,n){if(e.refs[s]<=1)return n;let i=n.clone(),r=(a,o)=>{let l=this.associations.get(a);l!=null&&this.associations.set(o,l);for(let[c,d]of a.children.entries())r(d,o.children[c])};return r(n,i),i.name+="_instance_"+e.uses[s]++,i}_invokeOne(e){let s=Object.values(this.plugins);s.push(this);for(let n=0;n<s.length;n++){let i=e(s[n]);if(i)return i}return null}_invokeAll(e){let s=Object.values(this.plugins);s.unshift(this);let n=[];for(let i=0;i<s.length;i++){let r=e(s[i]);r&&n.push(r)}return n}getDependency(e,s){let n=e+":"+s,i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(s);break;case"node":i=this._invokeOne(function(r){return r.loadNode&&r.loadNode(s)});break;case"mesh":i=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(s)});break;case"accessor":i=this.loadAccessor(s);break;case"bufferView":i=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(s)});break;case"buffer":i=this.loadBuffer(s);break;case"material":i=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(s)});break;case"texture":i=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(s)});break;case"skin":i=this.loadSkin(s);break;case"animation":i=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(s)});break;case"camera":i=this.loadCamera(s);break;default:if(i=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,s)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let s=this.cache.get(e);if(!s){let n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];s=Promise.all(i.map(function(r,a){return n.getDependency(e,a)})),this.cache.add(e,s)}return s}loadBuffer(e){let s=this.json.buffers[e],n=this.fileLoader;if(s.type&&s.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+s.type+" buffer type is not supported.");if(s.uri===void 0&&e===0)return Promise.resolve(this.extensions[b.KHR_BINARY_GLTF].body);let i=this.options;return new Promise(function(r,a){n.load(Ke.resolveURL(s.uri,i.path),r,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+s.uri+'".'))})})}loadBufferView(e){let s=this.json.bufferViews[e];return this.getDependency("buffer",s.buffer).then(function(n){let i=s.byteLength||0,r=s.byteOffset||0;return n.slice(r,r+i)})}loadAccessor(e){let s=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){let a=Es[i.type],o=Je[i.componentType],l=i.normalized===!0,c=new o(i.count*a);return Promise.resolve(new de(c,a,l))}let r=[];return i.bufferView!==void 0?r.push(this.getDependency("bufferView",i.bufferView)):r.push(null),i.sparse!==void 0&&(r.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(r).then(function(a){let o=a[0],l=Es[i.type],c=Je[i.componentType],d=c.BYTES_PER_ELEMENT,u=d*l,f=i.byteOffset||0,v=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,g=i.normalized===!0,A,m;if(v&&v!==u){let h=Math.floor(f/v),x="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+h+":"+i.count,C=s.cache.get(x);C||(A=new c(o,h*v,i.count*v/d),C=new rs(A,v/d),s.cache.add(x,C)),m=new as(C,l,f%v/d,g)}else o===null?A=new c(i.count*l):A=new c(o,f,i.count*l),m=new de(A,l,g);if(i.sparse!==void 0){let h=Es.SCALAR,x=Je[i.sparse.indices.componentType],C=i.sparse.indices.byteOffset||0,y=i.sparse.values.byteOffset||0,B=new x(a[1],C,i.sparse.count*h),F=new c(a[2],y,i.sparse.count*l);o!==null&&(m=new de(m.array.slice(),m.itemSize,m.normalized)),m.normalized=!1;for(let T=0,P=B.length;T<P;T++){let G=B[T];if(m.setX(G,F[T*l]),l>=2&&m.setY(G,F[T*l+1]),l>=3&&m.setZ(G,F[T*l+2]),l>=4&&m.setW(G,F[T*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}m.normalized=g}return m})}loadTexture(e){let s=this.json,n=this.options,r=s.textures[e].source,a=s.images[r],o=this.textureLoader;if(a.uri){let l=n.manager.getHandler(a.uri);l!==null&&(o=l)}return this.loadTextureImage(e,r,o)}loadTextureImage(e,s,n){let i=this,r=this.json,a=r.textures[e],o=r.images[s],l=(o.uri||o.bufferView)+":"+a.sampler;if(this.textureCache[l])return this.textureCache[l];let c=this.loadImageSource(s,n).then(function(d){d.flipY=!1,d.name=a.name||o.name||"",d.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(d.name=o.uri);let f=(r.samplers||{})[a.sampler]||{};return d.magFilter=yi[f.magFilter]||me,d.minFilter=yi[f.minFilter]||ts,d.wrapS=Ci[f.wrapS]||wt,d.wrapT=Ci[f.wrapT]||wt,d.generateMipmaps=!d.isCompressedTexture&&d.minFilter!==es&&d.minFilter!==me,i.associations.set(d,{textures:e}),d}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,s){let n=this,i=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(u=>u.clone());let a=i.images[e],o=self.URL||self.webkitURL,l=a.uri||"",c=!1;if(a.bufferView!==void 0)l=n.getDependency("bufferView",a.bufferView).then(function(u){c=!0;let f=new Blob([u],{type:a.mimeType});return l=o.createObjectURL(f),l});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");let d=Promise.resolve(l).then(function(u){return new Promise(function(f,v){let g=f;s.isImageBitmapLoader===!0&&(g=function(A){let m=new Ue(A);m.needsUpdate=!0,f(m)}),s.load(Ke.resolveURL(u,r.path),g,void 0,v)})}).then(function(u){return c===!0&&o.revokeObjectURL(l),Se(u,a),u.userData.mimeType=a.mimeType||ya(a.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),u});return this.sourceCache[e]=d,d}assignTexture(e,s,n,i){let r=this;return this.getDependency("texture",n.index).then(function(a){if(!a)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(a=a.clone(),a.channel=n.texCoord),r.extensions[b.KHR_TEXTURE_TRANSFORM]){let o=n.extensions!==void 0?n.extensions[b.KHR_TEXTURE_TRANSFORM]:void 0;if(o){let l=r.associations.get(a);a=r.extensions[b.KHR_TEXTURE_TRANSFORM].extendTexture(a,o),r.associations.set(a,l)}}return i!==void 0&&(a.colorSpace=i),e[s]=a,a})}assignFinalMaterial(e){let s=e.geometry,n=e.material,i=s.attributes.tangent===void 0,r=s.attributes.color!==void 0,a=s.attributes.normal===void 0;if(e.isPoints){let o="PointsMaterial:"+n.uuid,l=this.cache.get(o);l||(l=new kn,be.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,l.sizeAttenuation=!1,this.cache.add(o,l)),n=l}else if(e.isLine){let o="LineBasicMaterial:"+n.uuid,l=this.cache.get(o);l||(l=new Un,be.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,this.cache.add(o,l)),n=l}if(i||r||a){let o="ClonedMaterial:"+n.uuid+":";i&&(o+="derivative-tangents:"),r&&(o+="vertex-colors:"),a&&(o+="flat-shading:");let l=this.cache.get(o);l||(l=n.clone(),r&&(l.vertexColors=!0),a&&(l.flatShading=!0),i&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(o,l),this.associations.set(l,this.associations.get(n))),n=l}e.material=n}getMaterialType(){return ls}loadMaterial(e){let s=this,n=this.json,i=this.extensions,r=n.materials[e],a,o={},l=r.extensions||{},c=[];if(l[b.KHR_MATERIALS_UNLIT]){let u=i[b.KHR_MATERIALS_UNLIT];a=u.getMaterialType(),c.push(u.extendParams(o,r,s))}else{let u=r.pbrMetallicRoughness||{};if(o.color=new X(1,1,1),o.opacity=1,Array.isArray(u.baseColorFactor)){let f=u.baseColorFactor;o.color.setRGB(f[0],f[1],f[2],q),o.opacity=f[3]}u.baseColorTexture!==void 0&&c.push(s.assignTexture(o,"map",u.baseColorTexture,L)),o.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,o.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(c.push(s.assignTexture(o,"metalnessMap",u.metallicRoughnessTexture)),c.push(s.assignTexture(o,"roughnessMap",u.metallicRoughnessTexture))),a=this._invokeOne(function(f){return f.getMaterialType&&f.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(f){return f.extendMaterialParams&&f.extendMaterialParams(e,o)})))}r.doubleSided===!0&&(o.side=Re);let d=r.alphaMode||ws.OPAQUE;if(d===ws.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,d===ws.MASK&&(o.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&a!==Ve&&(c.push(s.assignTexture(o,"normalMap",r.normalTexture)),o.normalScale=new _(1,1),r.normalTexture.scale!==void 0)){let u=r.normalTexture.scale;o.normalScale.set(u,u)}if(r.occlusionTexture!==void 0&&a!==Ve&&(c.push(s.assignTexture(o,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&a!==Ve){let u=r.emissiveFactor;o.emissive=new X().setRGB(u[0],u[1],u[2],q)}return r.emissiveTexture!==void 0&&a!==Ve&&c.push(s.assignTexture(o,"emissiveMap",r.emissiveTexture,L)),Promise.all(c).then(function(){let u=new a(o);return r.name&&(u.name=r.name),Se(u,r),s.associations.set(u,{materials:e}),r.extensions&&He(i,u,r),u})}createUniqueName(e){let s=$n.sanitizeNodeName(e||"");return s in this.nodeNamesUsed?s+"_"+ ++this.nodeNamesUsed[s]:(this.nodeNamesUsed[s]=0,s)}loadGeometries(e){let s=this,n=this.extensions,i=this.primitiveCache;function r(o){return n[b.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,s).then(function(l){return Di(l,o,s)})}let a=[];for(let o=0,l=e.length;o<l;o++){let c=e[o],d=Sa(c),u=i[d];if(u)a.push(u.promise);else{let f;c.extensions&&c.extensions[b.KHR_DRACO_MESH_COMPRESSION]?f=r(c):f=Di(new Oe,c,s),i[d]={primitive:c,promise:f},a.push(f)}}return Promise.all(a)}loadMesh(e){let s=this,n=this.json,i=this.extensions,r=n.meshes[e],a=r.primitives,o=[];for(let l=0,c=a.length;l<c;l++){let d=a[l].material===void 0?Ta(this.cache):this.getDependency("material",a[l].material);o.push(d)}return o.push(s.loadGeometries(a)),Promise.all(o).then(function(l){let c=l.slice(0,l.length-1),d=l[l.length-1],u=[];for(let v=0,g=d.length;v<g;v++){let A=d[v],m=a[v],h,x=c[v];if(m.mode===oe.TRIANGLES||m.mode===oe.TRIANGLE_STRIP||m.mode===oe.TRIANGLE_FAN||m.mode===void 0)h=r.isSkinnedMesh===!0?new Fn(A,x):new _e(A,x),h.isSkinnedMesh===!0&&h.normalizeSkinWeights(),m.mode===oe.TRIANGLE_STRIP?h.geometry=Ts(h.geometry,St):m.mode===oe.TRIANGLE_FAN&&(h.geometry=Ts(h.geometry,at));else if(m.mode===oe.LINES)h=new On(A,x);else if(m.mode===oe.LINE_STRIP)h=new Nn(A,x);else if(m.mode===oe.LINE_LOOP)h=new _n(A,x);else if(m.mode===oe.POINTS)h=new Hn(A,x);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(h.geometry.morphAttributes).length>0&&wa(h,r),h.name=s.createUniqueName(r.name||"mesh_"+e),Se(h,r),m.extensions&&He(i,h,m),s.assignFinalMaterial(h),u.push(h)}for(let v=0,g=u.length;v<g;v++)s.associations.set(u[v],{meshes:e,primitives:v});if(u.length===1)return r.extensions&&He(i,u[0],r),u[0];let f=new N;r.extensions&&He(i,f,r),s.associations.set(f,{meshes:e});for(let v=0,g=u.length;v<g;v++)f.add(u[v]);return f})}loadCamera(e){let s,n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?s=new We(Mn.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(s=new Zn(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(s.name=this.createUniqueName(n.name)),Se(s,n),Promise.resolve(s)}loadSkin(e){let s=this.json.skins[e],n=[];for(let i=0,r=s.joints.length;i<r;i++)n.push(this._loadNodeShallow(s.joints[i]));return s.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",s.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){let r=i.pop(),a=i,o=[],l=[];for(let c=0,d=a.length;c<d;c++){let u=a[c];if(u){o.push(u);let f=new ue;r!==null&&f.fromArray(r.array,c*16),l.push(f)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',s.joints[c])}return new Bn(o,l)})}loadAnimation(e){let s=this.json,n=this,i=s.animations[e],r=i.name?i.name:"animation_"+e,a=[],o=[],l=[],c=[],d=[];for(let u=0,f=i.channels.length;u<f;u++){let v=i.channels[u],g=i.samplers[v.sampler],A=v.target,m=A.node,h=i.parameters!==void 0?i.parameters[g.input]:g.input,x=i.parameters!==void 0?i.parameters[g.output]:g.output;A.node!==void 0&&(a.push(this.getDependency("node",m)),o.push(this.getDependency("accessor",h)),l.push(this.getDependency("accessor",x)),c.push(g),d.push(A))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(l),Promise.all(c),Promise.all(d)]).then(function(u){let f=u[0],v=u[1],g=u[2],A=u[3],m=u[4],h=[];for(let x=0,C=f.length;x<C;x++){let y=f[x],B=v[x],F=g[x],T=A[x],P=m[x];if(y===void 0)continue;y.updateMatrix&&y.updateMatrix();let G=n._createAnimationTracks(y,B,F,T,P);if(G)for(let De=0;De<G.length;De++)h.push(G[De])}return new Yn(r,void 0,h)})}createNodeMesh(e){let s=this.json,n=this,i=s.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(r){let a=n._getNodeRef(n.meshCache,i.mesh,r);return i.weights!==void 0&&a.traverse(function(o){if(o.isMesh)for(let l=0,c=i.weights.length;l<c;l++)o.morphTargetInfluences[l]=i.weights[l]}),a})}loadNode(e){let s=this.json,n=this,i=s.nodes[e],r=n._loadNodeShallow(e),a=[],o=i.children||[];for(let c=0,d=o.length;c<d;c++)a.push(n.getDependency("node",o[c]));let l=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([r,Promise.all(a),l]).then(function(c){let d=c[0],u=c[1],f=c[2];f!==null&&d.traverse(function(v){v.isSkinnedMesh&&v.bind(f,Ca)});for(let v=0,g=u.length;v<g;v++)d.add(u[v]);return d})}_loadNodeShallow(e){let s=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let r=s.nodes[e],a=r.name?i.createUniqueName(r.name):"",o=[],l=i._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&o.push(l),r.camera!==void 0&&o.push(i.getDependency("camera",r.camera).then(function(c){return i._getNodeRef(i.cameraCache,r.camera,c)})),i._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){o.push(c)}),this.nodeCache[e]=Promise.all(o).then(function(c){let d;if(r.isBone===!0?d=new Ln:c.length>1?d=new N:c.length===1?d=c[0]:d=new Ne,d!==c[0])for(let u=0,f=c.length;u<f;u++)d.add(c[u]);if(r.name&&(d.userData.name=r.name,d.name=a),Se(d,r),r.extensions&&He(n,d,r),r.matrix!==void 0){let u=new ue;u.fromArray(r.matrix),d.applyMatrix4(u)}else r.translation!==void 0&&d.position.fromArray(r.translation),r.rotation!==void 0&&d.quaternion.fromArray(r.rotation),r.scale!==void 0&&d.scale.fromArray(r.scale);return i.associations.has(d)||i.associations.set(d,{}),i.associations.get(d).nodes=e,d}),this.nodeCache[e]}loadScene(e){let s=this.extensions,n=this.json.scenes[e],i=this,r=new N;n.name&&(r.name=i.createUniqueName(n.name)),Se(r,n),n.extensions&&He(s,r,n);let a=n.nodes||[],o=[];for(let l=0,c=a.length;l<c;l++)o.push(i.getDependency("node",a[l]));return Promise.all(o).then(function(l){for(let d=0,u=l.length;d<u;d++)r.add(l[d]);let c=d=>{let u=new Map;for(let[f,v]of i.associations)(f instanceof be||f instanceof Ue)&&u.set(f,v);return d.traverse(f=>{let v=i.associations.get(f);v!=null&&u.set(f,v)}),u};return i.associations=c(r),r})}_createAnimationTracks(e,s,n,i,r){let a=[],o=e.name?e.name:e.uuid,l=[];Fe[r.path]===Fe.weights?e.traverse(function(f){f.morphTargetInfluences&&l.push(f.name?f.name:f.uuid)}):l.push(o);let c;switch(Fe[r.path]){case Fe.weights:c=cs;break;case Fe.rotation:c=us;break;case Fe.position:case Fe.scale:c=ds;break;default:n.itemSize===1?c=cs:c=ds;break}let d=i.interpolation!==void 0?xa[i.interpolation]:ss,u=this._getArrayFromAccessor(n);for(let f=0,v=l.length;f<v;f++){let g=new c(l[f]+"."+Fe[r.path],s.array,u,d);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(g),a.push(g)}return a}_getArrayFromAccessor(e){let s=e.array;if(e.normalized){let n=js(s.constructor),i=new Float32Array(s.length);for(let r=0,a=s.length;r<a;r++)i[r]=s[r]*n;s=i}return s}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){let i=this instanceof us?Vs:Ot;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}};function Da(t,e,s){let n=e.attributes,i=new bn;if(n.POSITION!==void 0){let o=s.json.accessors[n.POSITION],l=o.min,c=o.max;if(l!==void 0&&c!==void 0){if(i.set(new j(l[0],l[1],l[2]),new j(c[0],c[1],c[2])),o.normalized){let d=js(Je[o.componentType]);i.min.multiplyScalar(d),i.max.multiplyScalar(d)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let r=e.targets;if(r!==void 0){let o=new j,l=new j;for(let c=0,d=r.length;c<d;c++){let u=r[c];if(u.POSITION!==void 0){let f=s.json.accessors[u.POSITION],v=f.min,g=f.max;if(v!==void 0&&g!==void 0){if(l.setX(Math.max(Math.abs(v[0]),Math.abs(g[0]))),l.setY(Math.max(Math.abs(v[1]),Math.abs(g[1]))),l.setZ(Math.max(Math.abs(v[2]),Math.abs(g[2]))),f.normalized){let A=js(Je[f.componentType]);l.multiplyScalar(A)}o.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(o)}t.boundingBox=i;let a=new Pn;i.getCenter(a.center),a.radius=i.min.distanceTo(i.max)/2,t.boundingSphere=a}function Di(t,e,s){let n=e.attributes,i=[];function r(a,o){return s.getDependency("accessor",a).then(function(l){t.setAttribute(o,l)})}for(let a in n){let o=Ws[a]||a.toLowerCase();o in t.attributes||i.push(r(n[a],o))}if(e.indices!==void 0&&!t.index){let a=s.getDependency("accessor",e.indices).then(function(o){t.setIndex(o)});i.push(a)}return ot.workingColorSpace!==q&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${ot.workingColorSpace}" not supported.`),Se(t,e),Da(t,e,s),Promise.all(i).then(function(){return e.targets!==void 0?Ea(t,e.targets,s):t})}var Zs=new WeakMap,_t=class extends Ct{constructor(e){super(e),this.decoderPath="",this.decoderConfig={},this.decoderBinary=null,this.decoderPending=null,this.workerLimit=4,this.workerPool=[],this.workerNextTaskID=1,this.workerSourceURL="",this.defaultAttributeIDs={position:"POSITION",normal:"NORMAL",color:"COLOR",uv:"TEX_COORD"},this.defaultAttributeTypes={position:"Float32Array",normal:"Float32Array",color:"Float32Array",uv:"Float32Array"}}setDecoderPath(e){return this.decoderPath=e,this}setDecoderConfig(e){return this.decoderConfig=e,this}setWorkerLimit(e){return this.workerLimit=e,this}load(e,s,n,i){let r=new je(this.manager);r.setPath(this.path),r.setResponseType("arraybuffer"),r.setRequestHeader(this.requestHeader),r.setWithCredentials(this.withCredentials),r.load(e,a=>{this.parse(a,s,i)},n,i)}parse(e,s,n=()=>{}){this.decodeDracoFile(e,s,null,null,L,n).catch(n)}decodeDracoFile(e,s,n,i,r=q,a=()=>{}){let o={attributeIDs:n||this.defaultAttributeIDs,attributeTypes:i||this.defaultAttributeTypes,useUniqueIDs:!!n,vertexColorSpace:r};return this.decodeGeometry(e,o).then(s).catch(a)}decodeGeometry(e,s){let n=JSON.stringify(s);if(Zs.has(e)){let l=Zs.get(e);if(l.key===n)return l.promise;if(e.byteLength===0)throw new Error("THREE.DRACOLoader: Unable to re-decode a buffer with different settings. Buffer has already been transferred.")}let i,r=this.workerNextTaskID++,a=e.byteLength,o=this._getWorker(r,a).then(l=>(i=l,new Promise((c,d)=>{i._callbacks[r]={resolve:c,reject:d},i.postMessage({type:"decode",id:r,taskConfig:s,buffer:e},[e])}))).then(l=>this._createGeometry(l.geometry));return o.catch(()=>!0).then(()=>{i&&r&&this._releaseTask(i,r)}),Zs.set(e,{key:n,promise:o}),o}_createGeometry(e){let s=new Oe;e.index&&s.setIndex(new de(e.index.array,1));for(let n=0;n<e.attributes.length;n++){let i=e.attributes[n],r=i.name,a=i.array,o=i.itemSize,l=new de(a,o);r==="color"&&(this._assignVertexColorSpace(l,i.vertexColorSpace),l.normalized=!(a instanceof Float32Array)),s.setAttribute(r,l)}return s}_assignVertexColorSpace(e,s){if(s!==L)return;let n=new X;for(let i=0,r=e.count;i<r;i++)n.fromBufferAttribute(e,i),ot.toWorkingColorSpace(n,L),e.setXYZ(i,n.r,n.g,n.b)}_loadLibrary(e,s){let n=new je(this.manager);return n.setPath(this.decoderPath),n.setResponseType(s),n.setWithCredentials(this.withCredentials),new Promise((i,r)=>{n.load(e,i,void 0,r)})}preload(){return this._initDecoder(),this}_initDecoder(){if(this.decoderPending)return this.decoderPending;let e=typeof WebAssembly!="object"||this.decoderConfig.type==="js",s=[];return e?s.push(this._loadLibrary("draco_decoder.js","text")):(s.push(this._loadLibrary("draco_wasm_wrapper.js","text")),s.push(this._loadLibrary("draco_decoder.wasm","arraybuffer"))),this.decoderPending=Promise.all(s).then(n=>{let i=n[0];e||(this.decoderConfig.wasmBinary=n[1]);let r=Ma.toString(),a=["/* draco decoder */",i,"","/* worker */",r.substring(r.indexOf("{")+1,r.lastIndexOf("}"))].join(`
`);this.workerSourceURL=URL.createObjectURL(new Blob([a]))}),this.decoderPending}_getWorker(e,s){return this._initDecoder().then(()=>{if(this.workerPool.length<this.workerLimit){let i=new Worker(this.workerSourceURL);i._callbacks={},i._taskCosts={},i._taskLoad=0,i.postMessage({type:"init",decoderConfig:this.decoderConfig}),i.onmessage=function(r){let a=r.data;switch(a.type){case"decode":i._callbacks[a.id].resolve(a);break;case"error":i._callbacks[a.id].reject(a);break;default:console.error('THREE.DRACOLoader: Unexpected message, "'+a.type+'"')}},this.workerPool.push(i)}else this.workerPool.sort(function(i,r){return i._taskLoad>r._taskLoad?-1:1});let n=this.workerPool[this.workerPool.length-1];return n._taskCosts[e]=s,n._taskLoad+=s,n})}_releaseTask(e,s){e._taskLoad-=e._taskCosts[s],delete e._callbacks[s],delete e._taskCosts[s]}debug(){console.log("Task load: ",this.workerPool.map(e=>e._taskLoad))}dispose(){for(let e=0;e<this.workerPool.length;++e)this.workerPool[e].terminate();return this.workerPool.length=0,this.workerSourceURL!==""&&URL.revokeObjectURL(this.workerSourceURL),this}};function Ma(){let t,e;onmessage=function(a){let o=a.data;switch(o.type){case"init":t=o.decoderConfig,e=new Promise(function(d){t.onModuleLoaded=function(u){d({draco:u})},DracoDecoderModule(t)});break;case"decode":let l=o.buffer,c=o.taskConfig;e.then(d=>{let u=d.draco,f=new u.Decoder;try{let v=s(u,f,new Int8Array(l),c),g=v.attributes.map(A=>A.array.buffer);v.index&&g.push(v.index.array.buffer),self.postMessage({type:"decode",id:o.id,geometry:v},g)}catch(v){console.error(v),self.postMessage({type:"error",id:o.id,error:v.message})}finally{u.destroy(f)}});break}};function s(a,o,l,c){let d=c.attributeIDs,u=c.attributeTypes,f,v,g=o.GetEncodedGeometryType(l);if(g===a.TRIANGULAR_MESH)f=new a.Mesh,v=o.DecodeArrayToMesh(l,l.byteLength,f);else if(g===a.POINT_CLOUD)f=new a.PointCloud,v=o.DecodeArrayToPointCloud(l,l.byteLength,f);else throw new Error("THREE.DRACOLoader: Unexpected geometry type.");if(!v.ok()||f.ptr===0)throw new Error("THREE.DRACOLoader: Decoding failed: "+v.error_msg());let A={index:null,attributes:[]};for(let m in d){let h=self[u[m]],x,C;if(c.useUniqueIDs)C=d[m],x=o.GetAttributeByUniqueId(f,C);else{if(C=o.GetAttributeId(f,a[d[m]]),C===-1)continue;x=o.GetAttribute(f,C)}let y=i(a,o,f,m,h,x);m==="color"&&(y.vertexColorSpace=c.vertexColorSpace),A.attributes.push(y)}return g===a.TRIANGULAR_MESH&&(A.index=n(a,o,f)),a.destroy(f),A}function n(a,o,l){let d=l.num_faces()*3,u=d*4,f=a._malloc(u);o.GetTrianglesUInt32Array(l,u,f);let v=new Uint32Array(a.HEAPF32.buffer,f,d).slice();return a._free(f),{array:v,itemSize:1}}function i(a,o,l,c,d,u){let f=u.num_components(),g=l.num_points()*f,A=g*d.BYTES_PER_ELEMENT,m=r(a,d),h=a._malloc(A);o.GetAttributeDataArrayForAllPoints(l,u,m,A,h);let x=new d(a.HEAPF32.buffer,h,g).slice();return a._free(h),{name:c,array:x,itemSize:f}}function r(a,o){switch(o){case Float32Array:return a.DT_FLOAT32;case Int8Array:return a.DT_INT8;case Int16Array:return a.DT_INT16;case Int32Array:return a.DT_INT32;case Uint8Array:return a.DT_UINT8;case Uint16Array:return a.DT_UINT16;case Uint32Array:return a.DT_UINT32}}}var ba=new Vn,bi=new Nt(ba),Pi=new _t;Pi.setDecoderPath("./assets/draco/");bi.setDRACOLoader(Pi);function Pa(t){return new Promise((e,s)=>{bi.load(t,n=>{let i=n.scene.children[0];i?e(i.geometry):s(new Error(`GLTF model ${t} doesn't contain a valid scene`))},void 0,s)})}async function Ii(t){let e=Object.entries(t).map(([n,i])=>Pa(i).then(r=>[n,r])),s=await Promise.all(e);return Object.fromEntries(s)}var kt=class{constructor(e,s,n){this.geometries=null,this.materials=e,this.scope=s,this.stage=n,this.raycaster=new ei,this.root=new N,this.rootWorldPostion=new j,this.easesObjects=[],this.caseFrontVentObjects=[],this.caseBackVentObjects=[],this.case01Objects=[],this.case02FrontObjects=[],this.case02BackObjects=[],this.labels=[],this.modulesObjects={animate:new N,draggable:new N,scroll:new N,engine:new N,scope:new N,timer:new N,stagger:new N,spring:new N,svg:new N,timeline:new N,renderer:new N,waapi:new N,case01:new N,case02:new N,case02Back:new N},p.set(this.modulesObjects.waapi,{z:2.6,scale:.8}),this.createLabel("waapi",this.modulesObjects.waapi,-1,0,0,"color-waapi"),p.set(this.modulesObjects.timeline,{z:2.05}),this.createLabel("timeline",this.modulesObjects.timeline,-1,0,0,"color-timeline"),p.set(this.modulesObjects.stagger,{z:1.52}),this.createLabel("stagger",this.modulesObjects.stagger,-1,0,0,"color-utils"),p.set(this.modulesObjects.svg,{z:1.16}),this.createLabel("svg",this.modulesObjects.svg,-1,0,0,"color-svg"),p.set(this.modulesObjects.spring,{z:.99}),this.createLabel("spring",this.modulesObjects.spring,-1,0,0,"color-easings"),p.set(this.modulesObjects.animate,{z:0}),this.createLabel("animation",this.modulesObjects.animate,-1,0,0,"color-animation"),p.set(this.modulesObjects.timer,{z:.6}),this.createLabel("timer",this.modulesObjects.timer,1,0,0,"color-timer"),this.createLabel("easings",this.modulesObjects.animate,1,0,0,"color-easings"),p.set(this.modulesObjects.draggable,{z:-.62}),this.createLabel("draggable",this.modulesObjects.draggable,1,0,0,"color-draggable"),p.set(this.modulesObjects.scroll,{z:-1.05}),this.createLabel("scroll",this.modulesObjects.scroll,1,0,0,"color-events"),p.set(this.modulesObjects.engine,{z:-1.85}),p.set(this.modulesObjects.scope,{z:-1.81}),this.createLabel("scope",this.modulesObjects.scope,1,0,0,"color-scope"),p.set(this.modulesObjects.renderer,{z:2.7,scale:.98}),p.set(this.modulesObjects.case01,{z:1.8}),p.set(this.modulesObjects.case02,{z:.35}),p.set(this.modulesObjects.case02Back,{z:-1.78});for(let i in this.modulesObjects)this.root.add(this.modulesObjects[i]);for(let i=0,r=13;i<r;i++){let a=new N;a.dataset={index:0},this.easesObjects.push(a)}for(let i=0,r=15;i<r;i++){let a=new N,o=new N;this.caseFrontVentObjects.push(a),this.caseBackVentObjects.push(o),this.modulesObjects.case02.add(a),this.modulesObjects.case02Back.add(o)}for(let i=0,r=4;i<r;i++){let a=new N,o=new N,l=new N;this.case01Objects.push(a),this.case02FrontObjects.push(o),this.case02BackObjects.push(l),this.modulesObjects.case01.add(a),this.modulesObjects.case02.add(o),this.modulesObjects.case02Back.add(l)}this.createMeshes()}createLabel(e,s,n=0,i=0,r=0,a){let o=document.createElement("li"),l=document.createElement("div"),c=document.createElement("div"),d=document.querySelector(".toolbox-labels-left"),u=document.querySelector(".toolbox-labels-right"),f=n>0;(f?d:u).appendChild(o),c.classList.add("module-label-text"),l.classList.add("module-label-point"),o.innerHTML=e,c.innerHTML=e,c.classList.add("module-"+e),a&&(o.classList.add(a),c.classList.add(a));let g=new ut(l),A=new ut(c);return p.set(g,{x:n,y:i,z:r}),p.set(A,{x:0,y:1.25,z:r}),this.labels.push(g),s.add(g),s.add(A),this.stage.labelsRenderer.domElement.appendChild(l),this.stage.labelsRenderer.domElement.appendChild(c),this.stage.lines.createLine(o,l,!f,a),g}createMesh(e,s,n){let i=new _e(this.geometries[s],this.materials.outlineMaterial);return n&&p.set(i,n),e.add(i),i}async loadGeometries(){this.geometries=await Ii({animate01:"assets/models/module-animate-01.glb",easing01:"assets/models/module-easing-01.glb",draggable01:"assets/models/module-draggable-01.glb",draggable02:"assets/models/module-draggable-02.glb",scroll01:"assets/models/module-scroll-01.glb",engine01:"assets/models/module-engine-01.glb",scope01:"assets/models/module-scope-01.glb",timer01:"assets/models/module-timer-01.glb",timer02:"assets/models/module-timer-02.glb",timer03:"assets/models/module-timer-03.glb",timer04:"assets/models/module-timer-04.glb",timer05:"assets/models/module-timer-05.glb",stagger01:"assets/models/module-stagger-01.glb",stagger02:"assets/models/module-stagger-02.glb",spring01:"assets/models/module-spring-01.glb",svg01:"assets/models/module-svg-01.glb",timeline01:"assets/models/module-timeline-01.glb",timeline02:"assets/models/module-timeline-02.glb",renderer01:"assets/models/module-renderer-01.glb",waapi01:"assets/models/module-waapi-01.glb",shield01:"assets/models/module-shield-01.glb",shield02:"assets/models/module-shield-02.glb"})}async createMeshes(){await this.loadGeometries(),this.createMesh(this.modulesObjects.animate,"animate01");let e=new N;this.modulesObjects.animate.add(e);let s=[],n=[];for(let D=0,O=this.easesObjects.length;D<O;D++){let Y=new N,V=this.easesObjects[D];s.push(Y),e.add(Y),Y.add(V),n.push(this.createMesh(V,"easing01"))}p.set(s,{x:E(.044),rotateZ:E([20,-20])}),p.set(n,{y:E([-.07,-.11],{from:"center",ease:"in(2)"})}),H({id:"easing-meshes-bob"}).add(n,{y:[{to:"+=.03",ease:"inQuad",duration:500},{to:"-=.03",ease:"outQuad",duration:1e3}],loop:!0,ease:"inOutQuad"},E(200)),p.set(e,{x:.75,y:.65,z:0,rotateZ:-63});let i=[];this.createMesh(this.modulesObjects.draggable,"draggable01");for(let D=0,O=5;D<O;D++){let Y=new N;i.push(Y),this.modulesObjects.draggable.add(Y),this.createMesh(Y,"draggable02",{y:.92})}H({id:"draggable-meshes-rotate",defaults:{loop:!0}}).add(i,{rotateZ:[E([-90,0]),E([-450,-360])],duration:3e3,ease:"inOut(4)"},E(160)).init();let r=this.createMesh(this.modulesObjects.scroll,"scroll01");M(r,{id:"scroll-mesh-rotate",rotateZ:-360,ease:"linear",duration:32e3,loop:!0});let a=this.createMesh(this.modulesObjects.scope,"scope01",{scale:.98});M(a,{id:"scope-mesh-rotate",rotateZ:-360,ease:"linear",duration:64e3,loop:!0});let o=this.createMesh(this.modulesObjects.engine,"engine01");M(o,{id:"engine-mesh-rotate",rotateZ:-360,ease:"linear",duration:64e3,loop:!0});let l=this.createMesh(this.modulesObjects.timer,"timer01",{z:.075}),c=this.createMesh(this.modulesObjects.timer,"timer02",{z:-.08}),d=this.createMesh(this.modulesObjects.timer,"timer03",{z:.16,x:-.225,y:.5}),u=this.createMesh(this.modulesObjects.timer,"timer04",{z:.16,x:.5,y:.4});this.createMesh(this.modulesObjects.timer,"timer05",{z:.26,scale:.95}),H({id:"timer-meshes",defaults:{loop:!0}}).add(l,{rotateZ:(function(){let D=[];for(let O=0;O<36;O++)D.push({to:-(360/36)*O,duration:1e3});return D})(),ease:"outElastic(.2, 1)"},0).add(c,{rotateZ:(function(){let D=[];for(let O=0;O<24;O++)D.push({to:-(360/24)*O,duration:1e3});return D})(),ease:"linear"},0).add(d,{rotateZ:360,ease:"linear",duration:7e3},0).add(u,{rotateZ:-360,ease:"linear",duration:6e3},0);let f=this.createMesh(this.modulesObjects.spring,"spring01");M(f,{id:"spring-mesh-rotate",rotateZ:[0,-90,,-180,-270,-360],ease:Xe({stiffness:10,damping:3}),loop:!0});let v=this.modulesObjects.stagger,g=[];for(let D=0;D<4;D++)g.push(this.createMesh(v,"stagger02",{z:-.1*D+.06}));H({id:"stagger-meshes-bob"}).add(g,{z:[{to:"+=.08",ease:"inOut(2)",duration:1e3},{to:"-=.08",ease:"inOut(2)",duration:800}],loop:!0},E(200,{from:"last"})),this.createMesh(v,"stagger01",0);let A=69,m=new zn(.9,.9,.1,A,1,!1).toNonIndexed(),h=m.getAttribute("position"),x=[],C=[];for(let D=0;D<A;D++){let O=D%2;C[D]=new X().setHSL(p.random(O?.25:.55,O?.45:.75,2),1,.5)}let y=new X().setHSL(.1,1,.5),B=new X().setHSL(.9,1,.5);for(let D=0;D<h.count;D+=3){let O=m.attributes.normal.getY(D),Y;if(Math.abs(O)>.9)Y=O>0?y:B;else{let V=h.array[D*3],un=h.array[D*3+2],Kt=Math.atan2(un,V),Zt=Math.floor((Kt+Math.PI)/(Math.PI*2)*A);Y=C[Zt]||C[0]}for(let V=0;V<3;V++)x.push(Y.r,Y.g,Y.b)}m.setAttribute("color",new is(x,3));let F=new _e(m,this.materials.outlineMaterial);this.modulesObjects.svg.add(F),this.createMesh(this.modulesObjects.svg,"svg01",0),p.set(F,{rotateX:90}),M(F,{id:"svg-cylinder-rotate",rotateY:-360,loop:!0,duration:1e4,ease:"linear"});let T={progress:0,segments:2,odd:.5,even:.1,positions:m.attributes.position.array.slice(),radius:{x:[],z:[]},newRadius:{x:[],z:[]}};function P(){let D={x:[],z:[]};for(let O=0;O<T.positions.length;O+=3){let Y=T.positions[O],V=T.positions[O+2],Kt=(Math.atan2(V,Y)+Math.PI)/(Math.PI*2),Zt=T.segments,ir=p.lerp(T.even,T.odd,(Math.sin(Kt*Math.PI*Zt)+1)/2),At=Math.sqrt(Y*Y+V*V);if(At>0){let dn=At-ir;D.x[O]=Y/At*dn,D.z[O]=V/At*dn}else D.x[O]=Y,D.z[O]=V}return D}function G(){let D=T.p,O=T.radius,Y=T.newRadius;for(let V=0;V<T.positions.length;V+=3)m.attributes.position.array[V]=p.lerp(O.x[V],Y.x[V],D),m.attributes.position.array[V+2]=p.lerp(O.z[V],Y.z[V],D);m.attributes.position.needsUpdate=!0}H({id:"svg-cylinder-morph",loop:!0,onUpdate:()=>G()}).call(()=>{T.radius=P(),T.segments=p.random(4,32,0),T.odd=p.random(0,.5,2),T.even=p.random(0,.2,2),T.newRadius=P()}).add(T,{p:[0,1],duration:750,ease:"inOutQuad"});let De=this.modulesObjects.timeline,ce=[],et=Math.PI*2/8,tt=.68;for(let D=0;D<8;D++){let O=et*D,Y=Math.cos(O)*tt,V=Math.sin(O)*tt;ce.push(this.createMesh(De,"timeline02",{x:Y,y:V,z:-.35,rotateZ:-90+D*45}))}H({id:"timeline-meshes-bob"}).add(ce,{z:[{to:"+=.15",ease:"inOut(2)",duration:1e3},{to:"-=.15",ease:"inOut(2)",duration:800}],loop:!0},E(200,{from:"last"})),this.createMesh(De,"timeline01"),this.createMesh(this.modulesObjects.renderer,"renderer01",{z:.025}),this.createMesh(this.modulesObjects.waapi,"waapi01",{z:0,y:0,x:0});let pe=.541,Be=.925,Qe=1,R=0;this.createMesh(this.case01Objects[0],"shield01",{scale:Be,scaleZ:Qe,x:-pe,y:pe,z:R,rotateZ:0}),this.createMesh(this.case01Objects[2],"shield01",{scale:Be,scaleZ:Qe,x:pe,y:-pe,z:R,rotateZ:-180}),this.createMesh(this.case01Objects[3],"shield01",{scale:Be,scaleZ:Qe,x:-pe,y:-pe,z:R,rotateZ:-270});let U=.585,ee=.715,Ee=[];this.createMesh(this.case02FrontObjects[0],"shield02",{x:-U,y:U,z:ee,rotateZ:0}),this.createMesh(this.case02FrontObjects[1],"shield02",{x:U,y:-U,z:ee,rotateZ:-180}),this.createMesh(this.case02FrontObjects[2],"shield02",{x:-U,y:-U,z:ee,rotateZ:-270});for(let D=0;D<this.caseFrontVentObjects.length;D++)Ee.push(this.createMesh(this.caseFrontVentObjects[D],"shield02",{x:U,y:U,z:ee,rotateZ:-90,scaleZ:.025}));p.set(Ee,{z:E([0,1.37],{start:.03})});let st=[];this.createMesh(this.case02BackObjects[0],"shield02",{x:-U,y:U,z:ee,rotateZ:0}),this.createMesh(this.case02BackObjects[1],"shield02",{x:U,y:-U,z:ee,rotateZ:-180}),this.createMesh(this.case02BackObjects[2],"shield02",{x:-U,y:-U,z:ee,rotateZ:-270});for(let D=0;D<this.caseBackVentObjects.length;D++)st.push(this.createMesh(this.caseBackVentObjects[D],"shield02",{x:U,y:U,z:ee,rotateZ:-90,scaleZ:.025}));p.set(st,{z:E([0,1.37],{start:.03})})}};var Le=class{constructor(e){this.$canvas=document.createElement("canvas"),this.$parent=e,this.$parent.appendChild(this.$canvas),this.scale=2;let s=this.$parent.offsetWidth,n=this.$parent.offsetHeight;this.$canvas.style.width=`${s}px`,this.$canvas.style.height=`${n}px`,this.$canvas.width=s*this.scale,this.$canvas.height=n*this.scale,this.width=s,this.height=n,this.ctx=this.$canvas.getContext("2d"),this.ctx.scale(this.scale,this.scale),this.shapes=[],this.circles=[],this.lines=[],this.shapesLength=0}updateDimensions(){let e=this.$parent.offsetWidth,s=this.$parent.offsetHeight;this.$canvas.style.width=`${e}px`,this.$canvas.style.height=`${s}px`,this.$canvas.width=e*this.scale,this.$canvas.height=s*this.scale,this.width=e,this.height=s,this.ctx.scale(this.scale,this.scale)}addCircle(e,s,n={}){let i={isCircle:!0,radius:e,color:s,x:n.x||0,y:n.y||0,scale:n.scale!==void 0?n.scale:1,scaleX:n.scaleX!==void 0?n.scaleX:1,scaleY:n.scaleY!==void 0?n.scaleY:1,opacity:n.opacity!==void 0?n.opacity:1};return this.shapes.push(i),this.circles.push(i),this.shapesLength++,i}addLine(e,s,n,i,r,a,o={}){let l={isLine:!0,x1:e,y1:s,x2:n,y2:i,color:a,x:o.x||0,y:o.y||0,lineWidth:r||1,scale:o.scale!==void 0?o.scale:1,scaleX:o.scaleX!==void 0?o.scaleX:1,scaleY:o.scaleY!==void 0?o.scaleY:1,opacity:o.opacity!==void 0?o.opacity:1};return this.shapes.push(l),this.lines.push(l),this.shapesLength++,l}render(){let e=this.ctx;e.clearRect(0,0,this.width,this.height);for(let s=0;s<this.shapesLength;s++){let n=this.shapes[s];if(e.save(),e.globalAlpha=p.clamp(n.opacity,0,1),n.isCircle)e.translate(n.x,n.y),e.scale(n.scale*n.scaleX,n.scale*n.scaleY),e.beginPath(),e.arc(0,0,n.radius,0,Math.PI*2),e.fillStyle=n.color,e.fill();else if(n.isLine){e.translate(n.x,n.y);let i=(n.x1+n.x2)/2,r=(n.y1+n.y2)/2;e.translate(i,r),e.scale(n.scale*n.scaleX,n.scale*n.scaleY),e.translate(-i,-r),e.beginPath(),e.moveTo(n.x1,n.y1),e.lineTo(n.x2,n.y2),e.strokeStyle=n.color,e.lineWidth=n.lineWidth,e.stroke()}e.restore()}}};var Ae=class{constructor(){this.syncable=null}onEnter(){}onLeave(){}};function Fi(t){let e={},s=Xe(),n="out(3)",i=e.intuitive=new Ae,r=p.$("#intuitive-demo .square");p.set(r,{rotate:0,scale:.001});let a=M(r,{id:"intuitive-rotate",rotate:90,loop:!0,duration:750,ease:"inOutExpo",autoplay:!1});i.onEnter=()=>{M(r,{id:"intuitive-enter",scale:1,ease:s}),a.restart()},i.onLeave=()=>{M(r,{id:"intuitive-leave",scale:0,duration:250,ease:n}),a.pause()};let o=e.composition=new Ae,l=p.$("#additive-demo .shape"),c=["inOutQuad","inOutSine","inOutExpo",Xe()];p.set(l,{x:0,y:0,rotate:0,scale:0});let d=[],u=0,f=(R,U,ee,Ee)=>{let st=p.random(500,2e3),D={id:`composition-${U}-${Ee}`,duration:st,ease:p.randomPick(c),composition:"none"};D[U]=ee,d[u++]=M(R,D),d[u++]=nt({duration:st*.8,onComplete:()=>f(R,U,ee,Ee)}),u>640&&(u=0)};o.onEnter=()=>{l.forEach((R,U)=>{f(R,"x",()=>p.random(-90,90),U),f(R,"y",()=>p.random(-90,90),U),f(R,"rotate",()=>p.random(-90,90),U),f(R,"scale",()=>p.random(.05,.4,4),U)})},o.onLeave=()=>{M(l,{id:"composition-leave",scale:0,duration:250,ease:n}),d.forEach(R=>R.cancel()),d.length=0,u=0};let v=e.svgUtils=new Ae,g=p.$("#drawable-demo .svg-track"),A=we.createDrawable("#drawable-demo .svg-track-higlight path"),m=we.createDrawable("#drawable-demo .svg-track-bg path");p.set(g,{rotateX:90,rotateZ:0,z:0,scale:0});let h=H({id:"svg-utils",autoplay:!1}).add("#drawable-demo .svg-car",{ease:"linear",duration:1e4,loop:!0,...we.createMotionPath("#drawable-demo .svg-track-bg path")},0).add(A,{draw:"0 1",ease:"linear",duration:1e4,loop:!0},0).add(g,{rotateZ:360,ease:"linear",duration:2e4,loop:!0},0);v.onEnter=()=>{M(m,{id:"svg-bg-draw",draw:["0 0","0 1"],duration:1e3,ease:"inOutExpo"}),M(g,{id:"svg-track-enter",rotateX:{to:45,duration:1e3},scale:[.8,1],z:(R,U)=>U?10:5,ease:"out(3)",duration:350}),h.restart()},v.onLeave=()=>{M(g,{id:"svg-track-leave",rotateX:90,z:0,scale:.8,ease:"inOut(3)",duration:250}),h.pause()};let x=e.clockwork=new Ae,C=H({id:"clockwork",autoplay:!1}).set(".clock .tick:last-child",{opacity:0},0).add(".clock .tick:not(:last-child)",{x:(R,U)=>{let ee=U%12?6:12,Ee=p.get(R,"rotate",!1)*Math.PI/180;return"+="+ee*Math.sin(Ee)},y:(R,U)=>{let ee=U%12?6:12,Ee=p.get(R,"rotate",!1)*Math.PI/180;return"-="+ee*Math.cos(Ee)},opacity:{to:1,duration:0,ease:"linear",delay:45},scaleX:2,ease:"inOutQuad",duration:50,loop:1,alternate:!0,composition:"none"},E(10)).set(".clock .tick:first-child",{opacity:0},"<-=90").set(".clock .tick:last-child",{opacity:.5},"<<").add(we.createDrawable(".clock-grid .circle-grid-drawable path"),{draw:["1 1","0 1"],strokeWidth:["20","5"],opacity:[1,.15],ease:"linear",duration:R=>+R.getAttribute("id").split("_")[1]*1920,delay:E(240)},50).add(".timeline-playhead",{rotate:360,ease:"linear",duration:1920},50).init();x.syncable=C,x.onEnter=()=>{M(".tick",{id:"clockwork-enter",scaleY:(R,U)=>U%12?1.5:2.25,duration:350})},x.onLeave=()=>{M(".tick",{id:"clockwork-leave",scaleY:1,duration:250})};let y=e.staggering=new Ae,B=[13,13],F=200;p.set(t.circles,{opacity:E([0,1],{grid:B,from:"center",reversed:!0,modifier:R=>p.round(R+.25,0)?1:0})});let T=H({id:"staggering",autoplay:!1,onUpdate:()=>t.render()}).add(t.circles,{scale:[1,E([15,1],{grid:B,from:"center"}),{to:1,duration:500}],opacity:[{to:["-=.8","+=.8"]},{to:"-=.8",delay:900}],x:[{to:E([F,F+110],{grid:B,from:"center",axis:"x"}),duration:500},{to:E([F,F+100],{grid:B,from:"center",axis:"x"}),duration:1e3}],y:[{to:E([F,F+110],{grid:B,from:"center",axis:"y"}),duration:500},{to:E([F,F+100],{grid:B,from:"center",axis:"y"}),duration:1e3}],duration:750,loop:!0,ease:"inOutQuad"},E(200,{grid:B,from:"center",ease:"in",start:50})).init();y.onEnter=()=>{T.restart()},y.onLeave=()=>{T.pause()};let P=e.draggable=new Ae,G=p.$("#draggable-demo .draggable"),De=Xe({stiffness:120,damping:6}),ce=xt(G,{container:[0,0,0,0],containerFriction:.5,releaseContainerFriction:0,releaseEase:De});ce.progressX=.5,ce.progressY=.5,ce.onGrab=()=>{M(G[0],{id:"draggable-grab",scale:.8,duration:350,ease:"out(3)"})},ce.onRelease=()=>{M(G[0],{id:"draggable-release",scale:1,duration:350,ease:"out(3)"})},G[0].addEventListener("pointerenter",()=>{ce.grabbed||M(G[0],{id:"draggable-hover-in",scale:1.15,duration:350,ease:"out(3)"})}),G[0].addEventListener("pointerleave",()=>{ce.grabbed||M(G[0],{id:"draggable-hover-out",scale:1,duration:350,ease:"out(3)"})}),P.onEnter=()=>{ce.progressX=.5,ce.progressY=.5,M(G,{id:"draggable-enter",scale:[0,1],ease:s})},P.onLeave=()=>{M(G,{id:"draggable-leave",scale:0,ease:n,duration:350})};let et=e.scroll=new Ae,tt=H({id:"sphere-loop",autoplay:!1}).add("#scrollable-demo path",{x:[-4,4,{to:-4,duration:1500}],y:[-4,4,{to:-4,duration:1500}],strokeWidth:[2,4,{to:2,duration:1500}],loop:!0,duration:2500,loopDelay:0,ease:"inOut(2)"},E(200,{reversed:!0})).init().seek(1e4);et.syncable=H({id:"scroll-drawable",autoplay:!1}).add(we.createDrawable("#scrollable-demo path"),{draw:[{to:E([0,1],{modifier:R=>`${R} ${R+1.01}`})},{to:E([0,1],{modifier:R=>`${R+1.01} ${R+1.01}`})}],ease:"inOut(3)",delay:E(40,{reversed:!0})}),et.onEnter=()=>{tt.play()},et.onLeave=()=>{tt.pause()};let pe=e.responsive=new Ae,Be={x:0,y:1},Qe=H({id:"responsive-loop",autoplay:!1}).add(".responsive-viewport .circle",{y:{to:[-50,50],modifier:R=>R*Be.y},x:{to:[-50,50],modifier:R=>R*Be.x},alternate:!0,loop:!0,duration:750,ease:"inOutQuad"},E(100,{start:0})).seek(1e3);return pe.syncable=H({id:"responsive",autoplay:!1}).add(".responsive-viewport",{width:["80%","50%"],height:["50%","80%"],ease:"inOutExpo"}).add(Be,{x:1,y:0,ease:"inOut(6)"},"<<").add(".responsive-viewport .shape",{x:[E([-110,110]),0],y:[0,E([-110,110])],ease:"inOut(6)"},"<<").init(),pe.onEnter=()=>{M(".responsive-viewport .circle",{id:"responsive-enter",scale:[0,1],ease:s,delay:E(40)}),Qe.play()},pe.onLeave=()=>{M(".responsive-viewport .circle",{id:"responsive-leave",scale:0,ease:n,duration:350}),Qe.pause()},e}async function Ia(){if(!new URLSearchParams(location.search).has("debug"))return{enabled:!1,helpers:!1};let{Debug:t}=await import("./chunks/debug-CBQ742GO.js"),e=new t;return e.enable(!0),e}var[Fa]=p.$(".page"),[La]=p.$("#engine"),Ba=p.$(".learn-more"),ie=await Ia(),se=pn({mediaQueries:mn}),Q=new Ft(ie),z=new Ut(Q,ie),w=new kt(z,se,Q),zt=w.root,ze=new N,Z=new N,Yi=new Rt(Q,z,ie),Vi=new Mt(Q.$output),[Wi]=p.$(".npm-install code"),Ra=p.$(".learn-more .icon"),Ua=new $t(Wi.innerHTML);Wi.appendChild(Ua.$el);Fa.classList.add("is-ready");var Li=p.$(".sub-nav code");for(let t=0;t<Li.length;t++){let e=Li[t],s=new $t(e.innerHTML);if(e.parentElement.appendChild(s.$el),Tt.highlightElement(e),Tt.registerLanguage("javascript",gn),e.classList.contains("language-undefined")){let n=Tt.highlight(e.innerHTML,{language:"javascript"});e.innerHTML=n.value,e.classList.remove("language-undefined"),e.classList.add("language-javascript")}}function Na(){M(document.documentElement,{id:"scroll-page",scrollTop:window.innerHeight*3,ease:"inOut(2)",duration:2500})}Ba.forEach(t=>{t.addEventListener("click",Na)});M(Ra,{id:"learn-more-icons",translateY:{to:"+=1.15em"},ease:"linear",opacity:{to:[(t,e)=>e?1:0,(t,e)=>e?0:1]},loop:!0});var Ce=[13,13],on=84,Te=new Le(Q.$output);Te.$canvas.classList.add("heart-canvas");Te.$canvas.classList.add("grid-canvas");var ne=new Le(Q.$output);ne.$canvas.classList.add("dotted-grid-canvas");ne.$canvas.classList.add("grid-canvas");var jt=new Le(p.$("#staggering-demo")[0]),Oa=p.get('[data-demo="staggering"]',"--hex-current-1");jt.$canvas.classList.add("staggering-canvas");jt.$canvas.classList.add("grid-canvas");var ji=ne.width*.5,Ki=ne.height*.5,qs=ji/(Ce[0]-1),Js=Ki/(Ce[1]-1),$s=(ne.width-ji)/2,en=(ne.height-Ki)/2,Qt=p.get(document.body,"--hex-red-1");for(let t=0;t<Ce[0];t++)for(let e=0;e<Ce[1];e++)ne.addCircle(1,Qt,{x:$s+e*qs,y:en+t*Js}),Te.addCircle(1,Qt,{x:$s+e*qs,y:en+t*Js}),jt.addCircle(1,Oa,{x:$s+e*qs,y:en+t*Js});var le=new Le(Q.$output);le.$canvas.classList.add("easings-lines-canvas");le.$canvas.classList.add("grid-canvas");var W=new Le(Q.$output);W.$canvas.classList.add("easings-dots-canvas");W.$canvas.classList.add("grid-canvas");var _a=E([.75,.1],{from:"center",ease:"in(1)"}),ka=E([1,.75],{from:"center",ease:"in(1)"}),Ha=73,Ga=37,Bi=30,Ri=82,Ui=80,Ni=78;for(let t=0;t<Ha;t++)le.addLine(Bi,0,le.width-Bi,0,2,Qt,{scaleX:0});p.set(le.lines,{id:"easings lines opacity",opacity:_a,y:E([Ri,le.height-Ri])});for(let t=0;t<Ga;t++)W.addCircle(3,Qt,{y:W.height/2});p.set(W.circles,{id:"dots circles opacity",opacity:ka,x:E([Ui,W.width-Ui])});var za=[0,0,.1,.1,.1,0,0,0,.1,.1,.1,0,0,0,.1,.5,.6,.5,.2,.1,.2,.5,.6,.5,.1,0,.1,.6,.8,.9,.9,.7,.5,.7,.9,.9,.8,.6,.1,.5,.9,1,1,1,.9,.8,.9,1,1,1,.9,.5,.8,.9,1,1,1,1,1,1,1,1,1,.9,.8,.8,1,1,1,1,1,1,1,1,1,1,1,.8,.6,.9,1,1,1,1,1,1,1,1,1,.9,.6,.4,.8,1,1,1,1,1,1,1,1,1,.8,.4,.2,.6,.9,1,1,1,1,1,1,1,.9,.6,.2,.1,.3,.6,.8,1,1,1,1,1,.8,.6,.3,.1,0,.1,.3,.5,.8,1,1,1,.8,.5,.3,.1,0,0,0,0,.2,.4,.7,.9,.7,.4,.2,0,0,0,0,0,0,0,.1,.2,.4,.2,.1,0,0,0,0];za.forEach((t,e)=>{Te.circles[e].scale=t>.1?t*12:0});p.set(Te.circles,{id:"heart circles opacity",opacity:E([.8,.1],{grid:Ce,from:on})});var Oi=H({id:"heart",autoplay:!1,onUpdate:()=>{Te.render()}}).add(Te.circles,{id:"heart circles scale",scale:[{from:0},{to:0,duration:800}],duration:500,loop:!0,loopDelay:100,ease:"inOutQuad"},E(150,{grid:Ce,from:on,ease:"in(4)"})).init(),ln=document.createElement("div");ln.classList.add("clock");Q.$output.appendChild(ln);for(let t=0;t<193;t++){let e=document.createElement("div");e.className="tick",e.dataset.index="0";let s=360/192*t,n=s*Math.PI/180;p.set(e,{id:"tick x",x:178*Math.sin(n),y:-178*Math.cos(n),rotate:s}),ln.appendChild(e)}var Qa=p.$(".section-container"),Zi=p.$(".output-progress path"),Ht=p.$(".output-progress-bg path"),$e=we.createDrawable(Zi),qi=p.$(".feature-section-demo"),Ji=p.$(".feature-demo"),_i=we.createDrawable("#path-animation polyline"),ki=[".toolbox-labels-right li",".toolbox-labels-left li"],$i=p.$(".modules-sizes-chart .chart-bar"),Xa=p.$(".module-label-text");Xa.forEach(t=>{let[e]=p.$(".modules-sizes-chart .chart-bar."+t.classList[1]);if(e){let s=e.dataset.size;t.innerHTML='<div><span class="label-dot"></span><span class="size">'+s+"</span> KB</div>"}});var Ya=p.$([".chart-bar.module-scope",".chart-bar.module-animation",".chart-bar.module-timer",".chart-bar.module-stagger"]),[er]=p.$(".modules-bundle-size span"),cn=0,tr=0;$i.forEach(t=>cn+=+t.dataset.size);er.innerHTML=p.roundPad(cn,2);$i.forEach(t=>{let e=+t.dataset.size,s=e/cn;t.style.width=s*100+"%",Ya.forEach(n=>{t===n&&(tr+=e)})});var xe=[],Xt=[],gt=[],vt=[],Yt=[],Vt=[];for(let t in fn){let e;e=t,t!=="irregular"&&t!=="cubicBezier"&&t!=="linear"&&(t.startsWith("inOut")?vt.push(e):t.startsWith("outIn")?Yt.push(e):t.startsWith("in")?Xt.push(e):t.startsWith("out")?gt.push(e):Vt.push(e))}xe.push(gt[2]);xe.push(vt[4]);xe.push(qt(p.random(3,7,0)));var Va=Math.max(p.shuffle(Xt).length,p.shuffle(gt).length,p.shuffle(vt).length,p.shuffle(Yt).length,p.shuffle(Vt).length);for(let t=0;t<Va;t++)t<Xt.length&&xe.push(Xt[t]),t<gt.length&&xe.push(gt[t]),t<vt.length&&xe.push(vt[t]),t<Yt.length&&xe.push(Yt[t]),t<Vt.length&&xe.push(Vt[t]);var tn=(t,e,s,n)=>(i,r,a)=>E(t,{ease:e,from:s,reversed:n})(i,r,a),mt=H({id:"heading-animation",loop:!0,autoplay:!1,onUpdate:()=>{le.render(),W.render()},defaults:{duration:500}});for(let t=0;t<xe.length;t++){let e=xe[t];mt.add(le.lines,{id:"easings lines scale x",scaleX:tn([.01,.75],e,"center",!0),delay:E(10,{from:"center"}),ease:e}).add(w.easesObjects,{id:"engine eases y",y:tn([0,.08],e,"center",!0),delay:E(20,{from:"center"}),ease:e},"<<").add(W.circles,{id:"dots circles y",y:tn([W.height*.5-Ni,W.height*.5+Ni],e,"last",!1),delay:E(20,{from:"center"}),ease:e},"<<")}mt.add(le.lines,{id:"easings lines scale x 2",scaleX:0,delay:E(10,{from:"center"})}).add(w.easesObjects,{id:"engine eases y 2",y:0,delay:E(20,{from:"center"})},"<<").add(W.circles,{id:"dots circles y 2",y:W.height*.5,delay:E(20,{from:"center"})},"<<");Vi.scale.setScalar(.5);p.set(zt,{id:"engine scale",scale:10});p.set(ze,{id:"css scale",scale:.1});ze.add(Vi);Z.add(zt);Z.add(ze);Q.scene.add(Z);ie.enabled;Q.camera.lookAt(Q.scene.position);var ye=new Lt(Q,ie);Z.add(ye.ambientLight);Z.add(ye.directionalLight);se.add(({matches:t})=>{t.minM?(ye.x=-200,ye.y=135,ye.z=-80):(ye.x=-200,ye.y=135,ye.z=-110)});ie.helpers&&Z.add(new ti(100,10));function Wa(){Q.renderer.info.reset(),ie.enabled&&ie.stats.begin(),Yi.render(),Q.CSSRenderer.render(Q.scene,Q.camera),ie.enabled&&(ie.callsPanel.update(Q.renderer.info.render.calls,1e3),ie.trianglesPanel.update(Q.renderer.info.render.triangles,15e5),ie.stats.end())}var Gt=nt({id:"render-loop",frameRate:60,autoplay:!1,onUpdate:Wa});function ja(){Q.updateDimensions(),z.updateDimensions(),Yi.updateDimensions(),Gt.paused&&Gt.seek(Gt.currentTime)}var Ka=nt({id:"resize-timer",duration:250,autoplay:!1,onComplete:ja}),Hi=!1,Za=new ResizeObserver(()=>{Hi&&Ka.restart(),Hi=!0});Za.observe(La);Gt.play();var nn=p.$("#features-gallery .feature-section");nn.forEach((t,e)=>{let s=t.classList[t.classList.length-1];Zi[e].classList.add(s),Ht[e].classList.add(s),Ji[e].classList.add(s),qi[e].classList.add(s)});var qa=p.$("#features-gallery .section-text"),Ja=p.$("#features-gallery .section-text-heading"),$a=Fi(jt),Ge=H({id:"features",defaults:{composition:"none"},autoplay:!1}),Gi=t=>{M(".tick",{id:"tick-color",color:t,duration:250,ease:"out(3)",composition:"none"}),M(ne.circles,{id:"dotted-grid-color",color:t,duration:250,ease:"out(3)",delay:E(15,{from:"center",grid:Ce}),onUpdate:()=>ne.render(),composition:"none"})};se.add("toggleText",(t,e)=>{se.matches.minM||M(qa[t],{id:"toggle-text-"+t,opacity:e?.001:1,duration:250,ease:"inOut(3)"})});nn.forEach((t,e)=>{let s=Ji[e],n=qi[e],i=$a[t.dataset.demo],r=Ja[e],a=r.querySelector("p"),o=r.querySelector("h2"),l=t.querySelector("ul"),c=e===nn.length-1;p.set(l,{id:"text ul opacity",opacity:.001}),p.set([a,o],{id:"text p opacity",opacity:.5}),Ge.call(d=>{let u=d.backwards;s&&(i&&(u?i.onLeave():i.onEnter()),M([s,n],{id:"feature-enter-demo-"+e,opacity:u?.001:1,duration:250,ease:"inOut(3)"}),M([a,o],{id:"feature-enter-text-"+e,opacity:u?.5:1,duration:250,ease:"out(3)"}),se.matches.minM?u?M(l,{id:"feature-hide-ul-"+e,opacity:.001,duration:250,delay:.001,ease:"out(3)"}):(M(l,{id:"feature-show-ul-"+e,opacity:1,"--scaleX":{to:[0,1],duration:300,ease:"inOut(2.4)"},duration:350,ease:"inOut(3)"}),M(l.querySelectorAll("li"),{id:"feature-show-li-"+e,opacity:[.001,1],duration:250,delay:E(100,{start:350}),ease:"inOut(3)"}),M(l.querySelectorAll("li .icon"),{id:"feature-show-icon-"+e,translateX:["-.25rem",0],duration:250,delay:E(100,{start:350}),ease:"inOut(3)",onComplete:p.cleanInlineStyles})):se.methods.toggleText(e,u)),t.classList.toggle("is-in-view",!u);let f=p.get(t,"--hex-current-1");Gi(f)}).add($e[e],{id:"progress bars draw",draw:"0 1",ease:"linear"},e?"<":0).add([$e[e],Ht[e]],{id:"progress bars stroke width",strokeWidth:[5,10],ease:"outQuart",duration:50},"<<"),e&&Ge.add([$e[e-1],Ht[e-1]],{id:"progress bars stroke width 2",strokeWidth:[10,5],ease:"outQuart",duration:50},"<<"),i&&i.syncable&&Ge.add(i.syncable,{id:"demo syncable progress",progress:1,ease:"linear"},"<<"),c&&Ge.add([$e[$e.length-1],Ht[$e.length-1]],{id:"progress bars stroke width 3",strokeWidth:[10,5],ease:"outQuart",duration:50}),Ge.call(d=>{let u=d.backwards;s&&(i&&(u?i.onEnter():i.onLeave()),M([s,n],{id:"feature-leave-demo-"+e,opacity:u?1:.001,duration:250,ease:"inOut(3)"}),M([a,o],{id:"feature-leave-text-"+e,opacity:u?1:.5,duration:250,ease:"out(3)"}),se.matches.minM?M([l],{id:"feature-leave-ul-"+e,opacity:u?1:.001,duration:250,delay:u?.001:150,ease:"out(3)"}):se.methods.toggleText(e,!u)),t.classList.toggle("is-in-view",u);let f=c&&!u?p.get(t,"--hex-red-1"):p.get(t,"--hex-current-1");Gi(f)},"-=1")});Ge.init();function sr(t,e=!1){let s=Jt(t,{words:{class:"word"},chars:e&&{class:"char"}});return H({id:"text-appear-"+t,autoplay:!1}).add(e?s.chars:s.words,{x:[".35em",0],opacity:[0,1],duration:1e3,delay:E(25,{ease:"outIn(2)"}),ease:"outQuint"}).init()}var eo=p.$("[data-label]"),rn=sr("#intro h2",!0),an=sr("#intro p"),ht=p.$("[data-chapter]"),[he]=p.$(".scroll-bar"),ft=hn(".scroll-cursor-ghost",{x:150,scale:250,opacity:150}),zi=["HTML","WebGL","CSS","Canvas 2D","SVG","anything"],sn=0,Wt=null,pt=null;function Qi(t,e){return pt&&pt.revert(),e!==void 0&&(t.innerHTML=e),pt=Jt(t,{words:{class:"word"},chars:{class:"char"}}),pt}var nr=()=>{let[t]=p.$(".animate-anything"),e=Qi(t).chars;Wt=H({id:"scramble-out",delay:1e3,onComplete:()=>{let[s]=p.$(".animate-anything");Qi(s,zi[sn++]),sn>zi.length-1&&(sn=0),Wt=H({id:"scramble-in",onComplete:()=>{nr()}}).add(pt.chars,{id:"anything char opacity",opacity:[0,1],scaleX:[0,1],x:[10,0],duration:150,delay:E(25,{from:"first",ease:"in(3)",start:100})},0).add(".animate-anything-dot",{id:"anything dot x",x:[-s.offsetWidth,0],scaleX:[8,1],transformOrigin:["0% 0%","0% 0%"],color:n=>p.get(n,"--hex-fg-2"),duration:e.length*25+75,ease:"out(3)"},0).add({id:"gap",duration:750}).init()}}).add(e,{id:"chars opacity",opacity:0,scaleX:0,duration:100,delay:E(25,{from:"last",ease:"in(3)"})},0).add(".animate-anything-dot",{id:"anything dot x 2",x:-t.offsetWidth,transformOrigin:["100% 0%","100% 0%"],scaleX:[4,1],duration:e.length*25+100,color:s=>p.get(s,"--hex-red-1"),delay:50,ease:"out(3)"},0)};an.onComplete=nr;rn.add("#intro .section-text h2 .red-dot",{id:"red dot x",x:[".25em","0em"],opacity:[0,1],color:{from:"#FFF"},duration:300,ease:"inOut(3)"},550).add("#intro .section-text h2 .red-dot",{id:"red dot color",color:t=>p.get(t,"--hex-fg-1"),duration:1500},"<+=500").init();var Xi=t=>{let e=he.getBoundingClientRect(),s=t.clientX-e.left;return p.snap(1/65).round(4).clamp(0,1)(s/e.width)};se.add("showCard",(t,e)=>{t.querySelector("code")&&!se.matches.minM||M(t,{id:"show-card-"+e,y:0,opacity:1,ease:"inOut(3)",duration:350})});se.add("hideCard",(t,e)=>{t.querySelector("code")&&!se.matches.minM||M(t,{id:"hide-card-"+e,y:"120%",opacity:0,ease:"inOut(3)",duration:250})});ht.forEach((t,e)=>{let s=document.createElement("a");s.setAttribute("href","#"+t.getAttribute("id"));let n=document.querySelector(`[data-card="${t.dataset.chapter}"]`);if(s.classList.add("scroll-button"),s.dataset.index=e+"",he.appendChild(s),n){let i=n.getAttribute("data-enter-offset")||"",r=n.getAttribute("data-leave-offset")||"";p.set(n,{id:"card y",y:"120%",opacity:0}),it({target:t,enter:"top top"+i,leave:"top bottom"+r,onEnter:()=>{se.methods.showCard(n,e)},onLeave:()=>{se.methods.hideCard(n,e)}})}});var Tc=p.$(".scroll-button");se.add(({matches:t,data:e})=>{Q.camera.position.z=t.minM?120:180,p.set(Z,{id:"scene z",z:t.minM?52:90,rotateX:0,rotateY:0}),p.set(ze,{id:"css z",z:25}),p.set(zt,{id:"engine z",z:-5}),p.set([".clock",le.$canvas,W.$canvas],{id:"clock z",z:E(15)}),p.set([Te.$canvas,W.circles,ne.circles],{id:"heart scale",scale:.001}),p.set([".output-progress-bg",".clock"],{id:"progress bg opacity",opacity:1}),p.set([w.caseBackVentObjects,w.caseFrontVentObjects],{id:"back vent rotate z",rotateZ:0,opacity:1}),p.set(["#intro .section-text","#site-header",".heading-links .ui-group",".heading-sponsors"],{id:"intro text opacity",opacity:.001}),mt.pause().seek(0),rn.pause().seek(0),an.pause().seek(0),Te.render(),W.render(),le.render(),ne.render(),Wt&&Wt.cancel();let n=H({id:"main-timeline",autoplay:!1,defaults:{ease:"inOut(3)"}}).label("INTRO").label("INTRO_ON",1400);p.set(z.outlineShaderMaterial,{id:"shader material outline color",outlineColor:"#000",rimColor:"#000",shadowColor:"#000",worldColor1:"#000",backgroundColor:"#000"}),n.add(z.outlineShaderMaterial,{id:"shader material outline color 2",outlineColor:z.colors.outlineColor},"INTRO+=1000").add(z.outlineShaderMaterial,{id:"shader material rim color",rimColor:z.colors.rimColor,duration:2500},"INTRO+=500").add(z.outlineShaderMaterial,{id:"shader material shadow color",shadowColor:z.colors.shadowColor,worldColor1:z.colors.worldColor1,backgroundColor:z.colors.backgroundColor,duration:3e3},"INTRO").add(document.body,{id:"body background color",backgroundColor:z.colors.backgroundColor,duration:3e3},"INTRO"),ie.enabled||n.add(ye,{id:"lights x",x:{from:100},duration:3e3},"INTRO"),n.add(".tick",{id:"tick opacity",opacity:[{from:0,to:1,duration:10},{to:(T,P,G)=>P!==G-1?.4:0,duration:1e3}],ease:"out(3)",delay:E([0,500],{ease:"outIn(2)"})},"INTRO").add(".output-progress-bg path",{id:"bg path opacity",opacity:[0,1,0,1,0,1],duration:200,ease:qt(5),delay:E([0,400],{modifier:T=>p.clamp(p.random(-250,250)+T,0,800)})},"<-=1000").add(ne.circles,{id:"grid circles opacity",opacity:{from:0,to:E([.5,0],{grid:Ce,from:on,ease:"out(2)"})},scale:[{from:0,to:4},{to:1}],duration:400,ease:"out(3)",delay:E(100,{from:"center",grid:Ce}),onUpdate:()=>{ne.render()}},"<-=500"),n.add(W.circles,{id:"dots circles scale",scale:1,composition:"none",ease:"inOutQuad",duration:200,delay:E(14,{from:"center",ease:"outIn(1)"}),onUpdate:()=>{W.render()}},"<<+=500").call(()=>mt.play(),"<").call(()=>rn.play(),"INTRO_ON").call(()=>an.play(),"INTRO_ON+=500").add("#intro .section-text",{id:"intro text opacity 2",opacity:1,duration:100},"INTRO_ON").add(["#site-header",".heading-links .ui-group",".heading-sponsors"],{id:"site header opacity",opacity:1,duration:350},"INTRO_ON+=500").add(Z,{id:"scene z 2",z:t.minM?58:92,duration:1500},"INTRO_ON-=500").label("INTRO_END").label("HEADING").label("HEADING_CASE","HEADING+=250").add(Z,{id:"scene z 3",z:{to:t.minM?15:-50,ease:"out(3)"},rotateX:{to:90,ease:"out(3)"},rotateY:{to:-135,ease:"inOut(2)"}},"HEADING").add(".heading-links",{id:"heading links y",y:200,opacity:{to:0,duration:150,delay:150},ease:"linear",duration:250},"HEADING").add([W.$canvas,le.$canvas],{id:"easings dots scale",scale:.001,duration:150},"HEADING+=250").add([".output-progress-bg",".clock"],{id:"progress bg opacity 2",opacity:[1,.001],duration:50},"<<").call(({backwards:T})=>mt[T?"play":"pause"](),"<").add(w.case01Objects,{id:"engine case01 rotate z",rotateZ:[180,0],duration:300,ease:"inOut(3)"},"HEADING+=100").add(w.modulesObjects.renderer,{id:"modules renderer rotate z",rotateZ:-360,duration:300},"HEADING+=100").add(w.case02BackObjects[0],{id:"case02 back x",x:-8,y:8,scale:0,duration:300},"HEADING_CASE+=100").add(w.case02BackObjects[1],{id:"case02 back x 2",x:8,y:-8,scale:0,duration:300},"HEADING_CASE+=100").add(w.case02BackObjects[2],{id:"case02 back x 3",x:-8,y:-8,scale:{to:0,duration:50},duration:300},"HEADING_CASE+=100").add(w.case02FrontObjects[0],{id:"case02 front x",x:-8,y:8,scale:0,duration:300},"HEADING_CASE+=0").add(w.case02FrontObjects[1],{id:"case02 front x 2",x:8,y:-8,scale:0,duration:300},"HEADING_CASE+=0").add(w.case02FrontObjects[2],{id:"case02 front x 3",x:-8,y:-8,scale:{to:0,duration:50},duration:300},"HEADING_CASE+=0").add(w.case01Objects[0],{id:"engine case01 x",x:-8,y:8,scale:0,duration:300},"HEADING_CASE+=50").add(w.case01Objects[2],{id:"engine case01 x 2",x:8,y:-8,scale:0,duration:300},"HEADING_CASE+=50").add(w.case01Objects[3],{id:"engine case01 x 3",x:-8,y:-8,scale:{to:0,duration:50},duration:300},"HEADING_CASE+=50").add(w.modulesObjects.renderer,{id:"modules renderer z",z:3.25,duration:300},"HEADING_CASE").add(w.modulesObjects.waapi,{id:"modules waapi z",z:2.75,duration:300},"HEADING_CASE+=50").add(ze,{id:"css z 2",z:30,duration:300},"HEADING_CASE").add(w.modulesObjects.scope,{id:"modules scope z",z:-2.4,duration:300},"HEADING_CASE+=50").add([w.caseBackVentObjects,w.caseFrontVentObjects],{id:"back vent rotate z 2",rotateZ:-200,duration:300,opacity:{to:0,duration:0,delay:E(2,{from:"last",start:175})},delay:E(2,{from:"last"})},"HEADING_CASE+=50").add(ki,{id:"boxlabels selector opacity",opacity:[0,1],duration:250,ease:"out(3)",delay:E(10,{from:"last"})},"HEADING+=700").add(_i,{id:"label lines draw",draw:["0 0","0 1"],duration:250,ease:"out(3)",delay:E(10,{from:"last"})},"<<+=50").call(({backwards:T})=>{T||Q.lines.updateDimensions()},"<<").label("HEADING_END").label("TOOLBOX").add(Z,{id:"scene z 4",z:{to:t.minM?55:92,ease:"inOut(3)"},rotateX:{to:0,ease:"inOut(2)"},rotateY:{to:-360,ease:"inOut(2)"}},"TOOLBOX").add(_i,{id:"label lines draw 2",draw:["0 1","0 0"],duration:250,ease:"out(3)",delay:E(10)},"TOOLBOX+=200").add(ki,{id:"boxlabels selector opacity 2",opacity:[1,0],duration:250,ease:"inOut(3)",delay:E(10)},"<<+=50").call(({backwards:T})=>{T&&Q.lines.updateDimensions()},"<<").add([".output-progress-bg"],{id:"progress bg opacity 3",opacity:.2,duration:50},"<+=400").add([".clock","#features-gallery"],{id:"clock opacity",opacity:1,duration:50},"<<").label("TOOLBOX_END").label("FEATURES").label("FEATURES_END").label("MODULES").label("MODULES_TRANSFORM","MODULES+=590").label("MODULES_SHRINK","MODULES+=1250").label("MODULES_CASE","MODULES+=1900").label("MODULES_ROTATION","MODULES+=1750").add([".output-progress-bg",".output-progress",".clock",ne.$canvas],{id:"progress bg opacity 4",opacity:.001,duration:500},"MODULES+=100").add(Z,{id:"scene z 5",z:t.minM?20:-15,duration:1e3},"MODULES").add(Z,{id:"scene rotate x",rotateX:45,duration:1e3},"MODULES").add(Z,{id:"scene rotate y",rotateY:-720,duration:1625},"MODULES_ROTATION").add(Z,{id:"scene z 6",z:57,rotateX:0,duration:1625},"MODULES_ROTATION").add(zt,{id:"engine z 2",z:2,duration:1e3},"MODULES_ROTATION").add([w.modulesObjects.waapi,w.modulesObjects.timeline,w.modulesObjects.svg,w.modulesObjects.spring,w.modulesObjects.draggable,w.modulesObjects.scroll],{id:"modules waapi x",x:(T,P)=>P%2?-2.5:2.5,y:(T,P)=>(P%2,0),duration:750},E(25,{start:"MODULES_TRANSFORM",reversed:!1})).add(".module-label-text div",{id:"label text opacity",opacity:[0,1],scale:[0,1],ease:"inOut(2)",duration:200,delay:E(10)},"MODULES_TRANSFORM+=450").add([w.modulesObjects.waapi,w.modulesObjects.timeline,w.modulesObjects.svg,w.modulesObjects.spring,w.modulesObjects.draggable,w.modulesObjects.scroll],{id:"modules waapi rotate y",rotateY:(T,P)=>P%2?-90:90,scale:0,duration:1e3},E(25,{start:"MODULES_SHRINK",reversed:!1})).add([".chart-bar.module-waapi",".chart-bar.module-timeline",".chart-bar.module-svg",".chart-bar.module-spring",".chart-bar.module-draggable",".chart-bar.module-scroll"],{id:"module waapi width",width:"0%",ease:"linear",duration:1e3},E(25,{start:"MODULES_SHRINK",reversed:!1})).add([".module-label-text.module-waapi .size",".module-label-text.module-timeline .size",".module-label-text.module-svg .size",".module-label-text.module-spring .size",".module-label-text.module-draggable .size",".module-label-text.module-scroll .size"],{id:"waapi size inner html",innerHTML:"0",ease:"linear",modifier:p.roundPad(2),duration:1e3},E(25,{start:"MODULES_SHRINK",reversed:!1})).add([".module-label-text.module-waapi div",".module-label-text.module-timeline div",".module-label-text.module-svg div",".module-label-text.module-spring div",".module-label-text.module-draggable div",".module-label-text.module-scroll div",".module-label-text div"],{id:"text waapi scale",scale:0,ease:"inOut(2)",duration:200,delay:E(40)},"<-=400").add(er,{id:"bundle size inner html",innerHTML:tr,ease:"linear",modifier:p.roundPad(2),duration:1e3},"MODULES_SHRINK").add(w.modulesObjects.waapi,{id:"modules waapi z 2",z:2.5,duration:500,ease:"inOut(3)"},"MODULES_TRANSFORM").add(w.modulesObjects.renderer,{id:"modules renderer z 2",z:1.5,duration:2e3,ease:"inOut(3)"},"MODULES_TRANSFORM+=400").add(ze,{id:"css z 3",z:25-5.5,duration:2e3,ease:"inOut(3)"},"MODULES_TRANSFORM+=400").add(w.modulesObjects.stagger,{id:"modules stagger z",z:1.12,duration:1500,ease:"inOut(3)"},"MODULES_TRANSFORM+=500").add(w.modulesObjects.engine,{id:"engine modules z",z:-1.2,duration:1500,ease:"inOut(3)"},"MODULES_TRANSFORM+=700").add(w.modulesObjects.scope,{id:"modules scope z 2",z:-1.12,duration:1500,ease:"inOut(3)"},"MODULES_TRANSFORM+=750").add(w.case02BackObjects[0],{id:"case02 back x 4",x:0,y:0,z:.7,scale:{to:1,duration:100},scaleZ:{to:.5125,duration:100},ease:"out(3)"},"MODULES_CASE+=200").add(w.case02BackObjects[1],{id:"case02 back x 5",x:0,y:0,z:.7,scale:{to:1,duration:100},scaleZ:{to:.5125,duration:100},ease:"out(3)"},"MODULES_CASE+=200").add(w.case02BackObjects[2],{id:"case02 back x 6",x:0,y:0,z:.7,scale:{to:1,duration:100},scaleZ:{to:.5125,duration:100},ease:"out(3)"},"MODULES_CASE+=200").add(w.case02FrontObjects[0],{id:"case02 front x 4",x:0,y:0,z:0,scale:{to:1,duration:100},scaleZ:{to:.5125,duration:100},ease:"out(3)"},"MODULES_CASE+=100").add(w.case02FrontObjects[1],{id:"case02 front x 5",x:0,y:0,z:0,scale:{to:1,duration:100},scaleZ:{to:.5125,duration:100},ease:"out(3)"},"MODULES_CASE+=100").add(w.case02FrontObjects[2],{id:"case02 front x 6",x:0,y:0,z:0,scale:{to:1,duration:100},scaleZ:{to:.5125,duration:100},ease:"out(3)"},"MODULES_CASE+=100").add(w.case01Objects[0],{id:"engine case01 x 4",x:0,y:0,z:-.6,scale:{to:1,duration:100},scaleZ:{to:.5125,duration:100},ease:"out(3)"},"MODULES_CASE+=0").add(w.case01Objects[2],{id:"engine case01 x 5",x:0,y:0,z:-.6,scale:{to:1,duration:100},scaleZ:{to:.5125,duration:100},ease:"out(3)"},"MODULES_CASE+=0").add(w.case01Objects[3],{id:"engine case01 x 6",x:0,y:0,z:-.6,scale:{to:1,duration:100},scaleZ:{to:.5125,duration:100},ease:"out(3)"},"MODULES_CASE+=0").add([w.caseBackVentObjects[7],w.caseBackVentObjects[8],w.caseBackVentObjects[9],w.caseBackVentObjects[10],w.caseBackVentObjects[11],w.caseBackVentObjects[12],w.caseBackVentObjects[13],w.caseBackVentObjects[14],w.caseFrontVentObjects[0],w.caseFrontVentObjects[1],w.caseFrontVentObjects[2],w.caseFrontVentObjects[3],w.caseFrontVentObjects[4],w.caseFrontVentObjects[5],w.caseFrontVentObjects[6],w.caseFrontVentObjects[7]],{id:"back vent rotate z 3",rotateZ:0,scale:1,ease:"out(3)",opacity:{to:1,duration:0,delay:E(10,{from:"last",start:150})},delay:E(10,{from:"last"})},"MODULES_CASE").add(Z,{id:"scene z 7",z:t.minM?64:100,duration:2e3},"MODULES_CASE").call(({backwards:T})=>{T?Oi.pause():Oi.restart()},"-=500").add([".output-progress-bg",".output-progress",".clock"],{id:"progress bg opacity 5",opacity:1,duration:500},"<<").add([Te.$canvas],{id:"heart scale 2",scale:1,duration:500},"<<").label("MODULES_END").label("SPONSORS").label("SPONSORS_END").label("GET_STARTED").add(Z,{id:"scene rotate x 2",rotateX:100,z:{to:60,ease:"out(3)"},duration:4e3,ease:"in(2)"},"GET_STARTED").add(Z,{id:"scene y",y:t.minM?58:200,ease:"in(2)",duration:4e3},"GET_STARTED+=350").add(ze,{id:"css z 4",z:20,duration:1e3},"GET_STARTED").label("GET_STARTED_END").init();let i={currentTime:0,progress:0},r=H({id:"progress-converter",autoplay:!1,defaults:{ease:"linear"}}),a=M(i,{id:"intro-animation",currentTime:[n.labels.INTRO,n.labels.INTRO_END],composition:"none",ease:"linear",duration:4e3,onUpdate:()=>{n.seek(i.currentTime)}}),o=H({id:"cursor-timeline",autoplay:!1,defaults:{ease:"linear"}}),l=T=>{r.progress=T,document.scrollingElement.scrollTop=(document.body.scrollHeight-window.innerHeight)*i.progress},c=T=>{let P=T.target;P&&!P.classList.contains("scroll-cursor")&&l(Xi(T))},d=()=>{ft.opacity(0),ft.scale(0)},u=()=>{ft.opacity(1),ft.scale(1)},f=!0,v=()=>{f&&(p.set(".sub-nav",{id:"sub nav pointer events",pointerEvents:"auto"}),f=!1,H({id:"show-sub-nav"}).add(".home-progress-card",{id:"progress card opacity",opacity:1,y:["100%",0],duration:250}).add(".home-progress-card .scroll-button",{id:"scroll button opacity",opacity:[0,.5],duration:250,delay:E(20)}).add(".home-progress-card .scroll-cursor:not(.scroll-cursor-ghost)",{id:"not ghost opacity",opacity:[0,1],scale:[0,1.2,1],duration:250,delay:E(50)},"<<+=250").init())},g=()=>{f||(p.set(".sub-nav",{id:"sub nav pointer events 2",pointerEvents:"none"}),f=!0,H({id:"hide-sub-nav"}).add(".home-progress-card",{id:"progress card opacity 2",opacity:0,y:"100%",duration:250}).init())};p.set(".scroll-cursor",{id:"scroll cursor x",x:0,scale:1});let A=()=>{M(".scroll-cursor",{id:"grab-cursor",scale:1.25,duration:250})},m=()=>{M(".scroll-cursor",{id:"release-cursor",scale:1,duration:150})},h=xt(".scroll-cursor",{y:!1,container:".scroll-bar",containerFriction:1,containerPadding:[0,-1,0,-1],onGrab:()=>{A(),d()},onRelease:T=>{m(),T.progressX<.02||T.progressX>.98?g():v()},onUpdate:T=>{T.grabbed&&l(T.progressX)}}),x=T=>{let P=T.target;P&&!P.classList.contains("scroll-cursor")&&!h.grabbed?(ft.x(Xi(T)*he.offsetWidth-2),u()):d()};h.progressX=0;let C=H({id:"tl-scroller",defaults:{ease:"linear"},onBegin:()=>{a.completed||a.pause()},autoplay:it({target:document.body,sync:.9,enter:"max",leave:"min",onUpdate:({progress:T})=>{n.seek(i.currentTime),h.grabbed||(o.progress=T,T<.02||T>.98?g():v())}})}),y=ht.reduce((T,P)=>T+P.offsetHeight,0),B=0,F=0;return ht.forEach((T,P)=>{o.add(h,{id:"cursor draggable progress x",progressX:1/ht.length*(P+1),duration:+T.offsetHeight}),F+=T.offsetHeight,B+=T.offsetHeight;let G=B/y;r.add(i,{id:"tlproxy progress",progress:G,duration:1e4/ht.length}),l(i.progress)}),F=0,eo.forEach((T,P)=>{let G=T.getAttribute("data-label");C.add(i,{id:"tlproxy current time",composition:"none",currentTime:[n.labels[G],n.labels[G+"_END"]],duration:T.offsetHeight},F),F+=T.offsetHeight}),he.addEventListener("click",c),he.addEventListener("mousemove",x),he.addEventListener("mouseenter",u),he.addEventListener("mouseleave",d),h.$target.addEventListener("mouseenter",A),h.$target.addEventListener("mouseleave",m),()=>{he.removeEventListener("click",c),he.removeEventListener("mousemove",x),he.removeEventListener("mouseenter",u),he.removeEventListener("mouseleave",d),h.$target.removeEventListener("mouseenter",A),h.$target.removeEventListener("mouseleave",m)}});it({target:"#features-gallery",container:document.body,sync:.9,enter:()=>"top top-=1",leave:()=>"bottom bottom+=100lvh"}).link(Ge);Qa.forEach((t,e)=>{let s=t.classList.contains("section-light"),n=t.getAttribute("data-enter-offset")||"",i=t.getAttribute("data-leave-offset")||"",r=t.querySelector(".fixed-section"),a=250,o="inOutQuad";it({target:t,container:document.body,enter:"top top"+n,leave:"bottom bottom"+i,onUpdate:()=>{s&&(Q.labelsRenderer.render(Q.scene,Q.camera),Q.lines.update())},onEnter:()=>{let l=r||null;l&&(p.set(l,{id:"to hide pointer events",pointerEvents:"auto"}),M(l,{id:"show-fixed-section",opacity:1,duration:350,ease:"linear"})),s&&(document.body.classList.add("is-light"),H({id:"to-light-theme",defaults:{duration:a,ease:o}}).add(document.body,{id:"body background color 2",backgroundColor:z.colors.worldColorLight1},0).add(z.outlineShaderMaterial,{id:"shader material outline blend",outlineBlend:.35,contourBlend:.35,rimColor:z.colors.worldColorLight1,worldColor1:z.colors.worldColorLight1,shadowColor:z.colors.worldColorLight1,backgroundColor:z.colors.worldColorLight1,outlineColor:z.colors.outlineColorLight},0))},onLeave:()=>{let l=r||null;l&&(p.set(l,{id:"to hide pointer events 2",pointerEvents:"none"}),M(l,{id:"hide-fixed-section",opacity:.001,duration:350,ease:"linear"})),s&&(document.body.classList.remove("is-light"),H({id:"to-dark-theme",defaults:{duration:a,ease:o}}).add(document.body,{id:"body background color 3",backgroundColor:z.colors.backgroundColor},0).add(z.outlineShaderMaterial,{id:"shader material outline blend 2",outlineBlend:.4,contourBlend:.65,rimColor:z.colors.rimColor,shadowColor:z.colors.shadowColor,worldColor1:z.colors.worldColor1,backgroundColor:z.colors.backgroundColor,outlineColor:z.colors.outlineColor},0))}})});
/*! Bundled license information:

postprocessing/build/index.js:
  (**
   * postprocessing v6.36.6 build Tue Dec 31 2024
   * https://github.com/pmndrs/postprocessing
   * Copyright 2015-2024 Raoul van Rüschen
   * @license Zlib
   *)
*/
