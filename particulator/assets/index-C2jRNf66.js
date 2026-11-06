(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function r(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(n){if(n.ep)return;n.ep=!0;const o=r(n);fetch(n.href,o)}})();const Bt="modulepreload",Ct=function(t){return"/particulator/"+t},gt={},Dt=function(e,r,s){let n=Promise.resolve();if(r&&r.length>0){let f=function(h){return Promise.all(h.map(a=>Promise.resolve(a).then(u=>({status:"fulfilled",value:u}),u=>({status:"rejected",reason:u}))))};document.getElementsByTagName("link");const l=document.querySelector("meta[property=csp-nonce]"),c=l?.nonce||l?.getAttribute("nonce");n=f(r.map(h=>{if(h=Ct(h),h in gt)return;gt[h]=!0;const a=h.endsWith(".css"),u=a?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${h}"]${u}`))return;const m=document.createElement("link");if(m.rel=a?"stylesheet":Bt,a||(m.as="script"),m.crossOrigin="",m.href=h,c&&m.setAttribute("nonce",c),document.head.appendChild(m),a)return new Promise((A,P)=>{m.addEventListener("load",A),m.addEventListener("error",()=>P(new Error(`Unable to preload CSS for ${h}`)))})}))}function o(l){const c=new Event("vite:preloadError",{cancelable:!0});if(c.payload=l,window.dispatchEvent(c),!c.defaultPrevented)throw l}return n.then(l=>{for(const c of l||[])c.status==="rejected"&&o(c.reason);return e().catch(o)})},It={count:3e4,seed:1,invert:!1,gamma:1,contrast:1,threshold:.02,edges:0,alpha:"mask",sizeMin:.4,sizeMax:1.2,sizeBy:"density",opacityBy:"density",opacityMin:.35,colors:!1,maxResolution:1024};function Ut(t,e,r,s){const n={...It,...Gt(e)},o=Math.max(0,Math.floor(n.count)),l=$t(t,Math.max(1,Math.floor(n.maxResolution))),{width:c,height:f}=l,h=Yt(l,n);let a=0,u=c,m=f,A=-1,P=-1;for(let R=0,I=0;R<f;R++)for(let K=0;K<c;K++,I++){const le=h[I];le>0&&(le>a&&(a=le),K<u&&(u=K),K>A&&(A=K),R<m&&(m=R),R>P&&(P=R))}const M=r/c,S=s/f,B=new Float32Array(o*4),O=n.colors?new Uint8Array(o*3):void 0;if(o===0||a<=0)return wt(r,s,0,B,O);const D=Math.max(0,u-.5),E=Math.max(0,m-.5),j=Math.min(c,A+1.5),V=Math.min(f,P+1.5),v=Math.max(j-D,V-E),X=D-(v-(j-D))/2,i=E-(v-(V-E))/2;let k=0;for(let R=m;R<=P;R++)for(let I=u;I<=A;I++)k+=h[R*c+I];const H=k/a/(v*v),N=o/Math.max(H,1e-9),ee=o*512+1e6,pe=n.seed>>>0,ie=xt(pe,1374496523),he=xt(pe,739982445),q=nt(pe^2246822507),J=Math.min(Math.ceil(N*4)+4096,ee),Z=new Float32Array(o),T=new Float32Array(o);let C=0;for(let R=1;R<=J&&C<o;R++){const I=X+yt(ie+R*_t)*v,K=i+yt(he+R*jt)*v;if(I<0||K<0||I>=c||K>=f)continue;const le=st(h,c,f,I,K);le<=0||nt((R^q)>>>0)*23283064365386963e-26*a>=le||(Z[C]=I,T[C]=K,C++)}C>1&&Wt(Z,T,C,h,c,f,Math.sqrt(k/C));const te=(M+S)/2,fe=n.sizeMax-n.sizeMin,ae=1-n.opacityMin,z=1/a,ge=l.data;for(let R=0;R<C;R++){const I=Z[R],K=T[R],le=Math.min(1,st(h,c,f,I,K)*z),F=R*4;if(B[F]=I*M,B[F+1]=K*S,B[F+2]=(n.sizeBy==="density"?n.sizeMin+fe*le:n.sizeMax)*te,B[F+3]=n.opacityBy==="density"?n.opacityMin+ae*le:1,O){const y=((K|0)*c+(I|0))*4,G=R*3;O[G]=ge[y],O[G+1]=ge[y+1],O[G+2]=ge[y+2]}}return wt(r,s,C,B,O)}const qt=3,Xe=1.5,Nt=.25;function Wt(t,e,r,s,n,o,l){const c=new Float32Array(r);let f=1/0;for(let V=0;V<r;V++){const v=st(s,n,o,t[V],e[V]);c[V]=v>0?l/Math.sqrt(v):l*8,c[V]<f&&(f=c[V])}const h=Math.max(f*Xe/2,Math.max(n,o)/1024),a=1/h,u=Math.max(1,Math.ceil(n/h)),m=Math.max(1,Math.ceil(o/h)),A=new Int32Array(u*m+1),P=new Int32Array(r),M=new Int32Array(r),S=new Float32Array(r),B=new Float32Array(r),O=new Float32Array(r),D=new Float32Array(r),E=new Float32Array(r),j=Xe*Xe;for(let V=0;V<qt;V++){A.fill(0);for(let v=0;v<r;v++){const X=(e[v]*a|0)*u+(t[v]*a|0);P[v]=X,A[X+1]++}for(let v=0;v<u*m;v++)A[v+1]+=A[v];for(let v=0;v<r;v++){const X=A[P[v]]++;M[X]=v,S[X]=t[v],B[X]=e[v],O[X]=c[v]}for(let v=u*m;v>0;v--)A[v]=A[v-1];A[0]=0;for(let v=0;v<r;v++){const X=S[v],i=B[v],k=O[v],H=k*Xe,N=H*H;let ee=0,pe=0;const ie=Math.max(0,(i-H)*a|0),he=Math.min(m-1,(i+H)*a|0),q=Math.max(0,(X-H)*a|0),J=Math.min(u-1,(X+H)*a|0);for(let fe=ie;fe<=he;fe++){const ae=A[fe*u+J+1];for(let z=A[fe*u+q];z<ae;z++){const ge=X-S[z],R=i-B[z],I=ge*ge+R*R;if(I>=N||z===v)continue;const K=k<O[z]?k:O[z];if(I>=K*K*j)continue;if(I<1e-12){ee+=v<z?.5:-.5;continue}const le=Math.sqrt(I),F=1-le/(K*Xe),y=F*F/le;ee+=ge*y,pe+=R*y}}const Z=Math.sqrt(ee*ee+pe*pe),T=Nt*k,C=Z>1?T/Z:T,te=M[v];D[te]=ee*C,E[te]=pe*C}for(let v=0;v<r;v++){let X=t[v]+D[v],i=e[v]+E[v];X<0?X=0:X>=n&&(X=n-.001),i<0?i=0:i>=o&&(i=o-.001),st(s,n,o,X,i)>0&&(t[v]=X,e[v]=i)}}}const ct=1.324717957244746,_t=1/ct,jt=1/(ct*ct);function yt(t){return t-Math.floor(t)}function nt(t){return t=t>>>0,t^=t>>>16,t=Math.imul(t,2146121005),t^=t>>>15,t=Math.imul(t,2221713035),t^=t>>>16,t>>>0}function xt(t,e){return nt(nt(t)^e)/4294967296}function wt(t,e,r,s,n){const o=r*4===s.length,l={width:t,height:e,count:r,data:o?s:s.slice(0,r*4)};return n&&(l.colors=o?n:n.slice(0,r*3)),l}function Gt(t){const e={};for(const[r,s]of Object.entries(t))s!==void 0&&(e[r]=s);return e}function st(t,e,r,s,n){let o=s-.5,l=n-.5;o<0?o=0:o>e-1&&(o=e-1),l<0?l=0:l>r-1&&(l=r-1);const c=o|0,f=l|0,h=c+1<e?c+1:c,a=f+1<r?f+1:f,u=o-c,m=l-f,A=f*e,P=a*e,M=t[A+c]+(t[A+h]-t[A+c])*u,S=t[P+c]+(t[P+h]-t[P+c])*u;return M+(S-M)*m}function $t(t,e){const{width:r,height:s,data:n}=t,o=Math.max(r,s)/e;if(o<=1)return t;const l=Math.max(1,Math.round(r/o)),c=Math.max(1,Math.round(s/o)),f=new Uint8ClampedArray(l*c*4),h=new Int32Array(l),a=new Int32Array(l);for(let m=0;m<l;m++)h[m]=Math.floor(m*r/l),a[m]=Math.max(h[m]+1,Math.floor((m+1)*r/l));const u=new Float64Array(l*4);for(let m=0;m<c;m++){const A=Math.floor(m*s/c),P=Math.max(A+1,Math.floor((m+1)*s/c));u.fill(0);for(let S=A;S<P;S++){const B=S*r*4;for(let O=0;O<l;O++){let D=0,E=0,j=0,V=0;for(let X=h[O],i=B+X*4;X<a[O];X++,i+=4)D+=n[i],E+=n[i+1],j+=n[i+2],V+=n[i+3];const v=O*4;u[v]+=D,u[v+1]+=E,u[v+2]+=j,u[v+3]+=V}}const M=P-A;for(let S=0;S<l;S++){const B=1/(M*(a[S]-h[S])),O=S*4,D=(m*l+S)*4;f[D]=u[O]*B+.5,f[D+1]=u[O+1]*B+.5,f[D+2]=u[O+2]*B+.5,f[D+3]=u[O+3]*B+.5}}return{width:l,height:c,data:f}}function Yt(t,e){const{width:r,height:s,data:n}=t,o=r*s,l=new Float32Array(o);for(let P=0,M=0;P<o;P++,M+=4)l[P]=(.2126*n[M]+.7152*n[M+1]+.0722*n[M+2])/255;let c=null;const f=vt(e.edges);f>0&&(c=Xt(l,r,s));const h=new Float32Array(o),{contrast:a,gamma:u,threshold:m}=e,A=e.alpha==="mask";for(let P=0;P<o;P++){let M=e.invert?l[P]:1-l[P];a!==1&&(M=vt((M-.5)*a+.5)),u!==1&&M>0&&(M=Math.pow(M,u)),c&&(M=M*(1-f)+c[P]*f),A&&(M*=n[P*4+3]/255),h[P]=M<m||M<=0?0:M}return h}function Xt(t,e,r){const s=new Float32Array(e*r);let n=0;for(let o=0;o<r;o++){const l=o>0?o-1:0,c=o<r-1?o+1:o;for(let f=0;f<e;f++){const h=f>0?f-1:0,a=f<e-1?f+1:f,u=t[l*e+h],m=t[l*e+f],A=t[l*e+a],P=t[o*e+h],M=t[o*e+a],S=t[c*e+h],B=t[c*e+f],O=t[c*e+a],D=A+2*M+O-u-2*P-S,E=S+2*B+O-u-2*m-A,j=Math.sqrt(D*D+E*E);s[o*e+f]=j,j>n&&(n=j)}}if(n>0)for(let o=0;o<s.length;o++)s[o]/=n;return s}function vt(t){return t<0?0:t>1?1:t}function Vt(t){const e=new DataView(t);if(t.byteLength<8)throw new Error("decodeNgaiV1: buffer shorter than header");const r=e.getUint16(0,!0),s=e.getUint16(2,!0),n=e.getUint32(4,!0);if(t.byteLength<8+n*6)throw new Error(`decodeNgaiV1: expected ${8+n*6} bytes, got ${t.byteLength}`);const o=new Float32Array(n*4);for(let l=0,c=8,f=0;l<n;l++,c+=6,f+=4)o[f]=e.getUint16(c,!0)/65535*r,o[f+1]=e.getUint16(c+2,!0)/65535*s,o[f+2]=e.getUint8(c+4)/255*2,o[f+3]=e.getUint8(c+5)/255;return{width:r,height:s,count:n,data:o}}async function Ht(t,e=1024){const r=typeof t=="string"?await Jt(t):t,s=await Qt(r);try{const n=s.width,o=s.height;if(!n||!o)throw new Error("dotter: image has no intrinsic size");const l=Math.min(1,e/Math.max(n,o)),c=Math.max(1,Math.round(n*l)),f=Math.max(1,Math.round(o*l)),h=Zt(c,f);h.imageSmoothingEnabled=!0,h.imageSmoothingQuality="high",h.clearRect(0,0,c,f),h.drawImage(s.image,0,0,c,f);const{data:a}=h.getImageData(0,0,c,f);return{pixels:{width:c,height:f,data:a},sourceWidth:n,sourceHeight:o}}finally{s.close()}}async function Kt(t,e={}){const r=await Ht(t,e.maxResolution??1024);return Ut(r.pixels,e,r.sourceWidth,r.sourceHeight)}async function Jt(t){const e=await fetch(t);if(!e.ok)throw new Error(`dotter: fetch ${t} failed (${e.status})`);return e.blob()}async function Qt(t){try{const e=await createImageBitmap(t,{premultiplyAlpha:"none"});return{image:e,width:e.width,height:e.height,close:()=>e.close()}}catch(e){if(typeof Image>"u"||typeof URL.createObjectURL!="function")throw e;const r=URL.createObjectURL(t);try{const s=new Image;s.decoding="async",s.src=r,await s.decode();const n=s.naturalWidth||s.width,o=s.naturalHeight||s.height;return{image:s,width:n,height:o,close:()=>URL.revokeObjectURL(r)}}catch(s){throw URL.revokeObjectURL(r),s}}}function Zt(t,e){const s=(typeof OffscreenCanvas<"u"?new OffscreenCanvas(t,e):Object.assign(document.createElement("canvas"),{width:t,height:e})).getContext("2d",{willReadFrequently:!0});if(!s)throw new Error("dotter: 2D canvas context unavailable");return s}async function en(t,e={}){const r=nn();if(r)try{return await r.run(typeof t=="string"?tn(t):t,e)}catch{}return Kt(t,e)}function tn(t){const e=globalThis,r=e.document?.baseURI??e.location?.href;try{return r?new URL(t,r).href:t}catch{return t}}let Ne;function nn(){if(Ne!==void 0)return Ne;if(Ne=null,typeof Worker>"u")return null;let t;try{t=new Worker(new URL("/particulator/assets/worker-Ld_UPjcu.js",import.meta.url),{type:"module"})}catch{return null}const e=new Map;let r=1;const s=n=>{Ne=null,t.terminate();for(const o of e.values())o.reject(new Error(n));e.clear()};return t.addEventListener("message",n=>{const o=e.get(n.data.id);o&&(e.delete(n.data.id),n.data.cloud?o.resolve(n.data.cloud):o.reject(new Error(n.data.error??"dotter worker: unknown error")))}),t.addEventListener("error",n=>{n.preventDefault(),s(`dotter worker failed: ${n.message||"load error"}`)}),t.addEventListener("messageerror",()=>s("dotter worker: message error")),Ne={run(n,o){return new Promise((l,c)=>{const f=r++;e.set(f,{resolve:l,reject:c});const h={id:f,url:n,opts:o};t.postMessage(h)})}},Ne}const Rt={version:1,particles:{count:3e4},timeline:{driver:{type:"api"}},motion:{preset:"steer",entrance:"drop",steer:{attract:.2,arriveK:.05,settleRadius:40,damping:1,homing:.07,accel:.15,maxSpeed:14,speedVar:.3,stagger:1,sensorDist:28,sensorAngle:.19,turnGain:.8,maxTurn:.3,alignMin:0,restFollow:.75,restNoise:.25},walls:{enabled:!1,margin:0,stiffness:.08,range:10,strength:.6,cruise:!0,bounce:.3},crowd:{flight:!1,strength:4,cellPx:6,blur:!0}},field:{size:256,texelPx:4,features:5,octaves:3,lacunarity:2,gain:.5,ridged:!0,sharpness:3,seed:7,drift:.15,live:!1,liveSpeed:.004},look:{ink:"#1a1a1a",theme:"none",size:1,streak:1,streakTaper:.7,streakFade:.3,restStreak:0},interaction:{mouse:{mode:"repel",radius:70,strength:.15,falloff:2,drag:.08,press:{radius:1.6,strength:3,drag:2,swirl:!0,noise:.6,crowd:!1}}},stage:{zIndex:0}},Ze=t=>typeof t=="object"&&t!==null&&!Array.isArray(t);function rt(t,e){if(!Ze(t)||!Ze(e))return e===void 0?t:e;const r={...t};for(const[s,n]of Object.entries(e)){if(n===void 0)continue;const o=t[s];r[s]=Ze(o)&&Ze(n)&&!("type"in n&&o.type!==n.type)?rt(o,n):n}return r}function Cn(t){const e=(o,l)=>{if(JSON.stringify(o)!==JSON.stringify(l)){if(o&&l&&typeof o=="object"&&typeof l=="object"&&!Array.isArray(o)&&!Array.isArray(l)){const c=o.type,f=l.type;if(c!==void 0&&c!==f)return o;const h={};for(const a of Object.keys(o)){const u=e(o[a],l[a]);u!==void 0&&(h[a]=u)}return Object.keys(h).length?h:void 0}return o}},{version:r,scenes:s,...n}=t;return{version:r,scenes:s,...e(n,Rt)??{}}}function sn(t){return rt(Rt,t)}function Mt(t){let e=t.trim().replace(/^#/,"");e.length===3&&(e=e.split("").map(s=>s+s).join(""));const r=parseInt(e.slice(0,6),16);return Number.isNaN(r)?{r:0,g:0,b:0}:{r:r>>16&255,g:r>>8&255,b:r&255}}const He=(t,e,r)=>Math.max(e,Math.min(r,t));function bt(t,e){const r=Math.max(0,e-1),s=He(t,0,r),n=Math.min(Math.floor(s),r);return{from:n,to:Math.min(n+1,r),t:s-n}}function kt(t){switch(t.type){case"api":{let e={from:0,to:0,t:0},r=0,s=null;return{state:(n,o)=>{if(r!==null)return bt(r,o);if(s){const c=s.dur<=0?1:He((n-s.start)/s.dur,0,1);e={...e,t:c},c>=1&&(s=null,e={from:e.to,to:e.to,t:0})}const l=Math.max(0,o-1);return{from:Math.min(e.from,l),to:Math.min(e.to,l),t:e.t,lead:0}},setProgress:n=>{s=null,r=n},goTo:(n,o,l)=>{const c=r!==null?Math.round(r):e.t>=.5?e.to:e.from;r=null,e={from:c,to:n,t:0},s={start:l,dur:o}}}}case"time":{const e=performance.now();return{state:(r,s)=>{if(s<2)return{from:0,to:0,t:0};const n=(t.hold+t.transition)*1e3,o=t.hold/(t.hold+t.transition),l=Math.max(0,r-e)/n,c=Math.floor(l),f=l-c,h=f<o?0:(f-o)/(1-o),a=t.loop??"loop";if(a==="once")return c>=s-1?{from:s-1,to:s-1,t:0}:{from:c,to:c+1,t:h};if(a==="pingpong"){const u=2*(s-1),m=c%u,A=m<s-1?m:u-m,P=m<s-1?m+1:u-m-1;return{from:A,to:P,t:h}}return{from:c%s,to:(c+1)%s,t:h}}}}case"scroll":{const e=l=>{const c=Array.from(document.querySelectorAll(t.sections)).slice(0,l);if(c.length<2)return 0;const f=c.map(u=>u.getBoundingClientRect());let h=t.axis??"auto";h==="auto"&&(h=Math.abs(f[1].left-f[0].left)>Math.abs(f[1].top-f[0].top)?"x":"y");const a=f.map(u=>h==="x"?u.left:u.top);if(a[0]>=0)return 0;for(let u=0;u<a.length-1;u++)if(a[u]<=0&&a[u+1]>0)return u-a[u]/(a[u+1]-a[u]);return c.length-1};if(t.mode!=="snap")return{state:(l,c)=>bt(e(c),c)};const r=He(t.threshold??.5,0,1),s=Math.max(0,t.duration??1.5)*1e3;let n=null,o=0;return{state:(l,c)=>{const f=e(c),h=He(f-Math.floor(f)>=r?Math.ceil(f):Math.floor(f),0,Math.max(0,c-1));if(n||(n={from:h,to:h,t:0}),h!==n.to&&(n=n.from===n.to?{from:n.to,to:h,t:0}:{from:h,to:h,t:0},o=l),n.from!==n.to){const a=s<=0?1:He((l-o)/s,0,1);n=a>=1?{from:n.to,to:n.to,t:0}:{...n,t:a}}return{...n,lead:0}}}}}}const Ee=new Float32Array([1,1,0,-1,1,0,1,-1,0,-1,-1,0,1,0,1,-1,0,1,1,0,-1,-1,0,-1,0,1,1,0,-1,1,0,1,-1,0,-1,-1]);function rn(t=1){const{perm:e,permMod12:r}=Ft(t),s=1/3,n=1/6;return function(l,c,f){const h=(l+c+f)*s,a=Math.floor(l+h),u=Math.floor(c+h),m=Math.floor(f+h),A=(a+u+m)*n,P=l-(a-A),M=c-(u-A),S=f-(m-A);let B,O,D,E,j,V;P>=M?M>=S?(B=1,O=0,D=0,E=1,j=1,V=0):P>=S?(B=1,O=0,D=0,E=1,j=0,V=1):(B=0,O=0,D=1,E=1,j=0,V=1):M<S?(B=0,O=0,D=1,E=0,j=1,V=1):P<S?(B=0,O=1,D=0,E=0,j=1,V=1):(B=0,O=1,D=0,E=1,j=1,V=0);const v=P-B+n,X=M-O+n,i=S-D+n,k=P-E+2*n,H=M-j+2*n,N=S-V+2*n,ee=P-1+3*n,pe=M-1+3*n,ie=S-1+3*n,he=a&255,q=u&255,J=m&255;let Z=0,T,C;return T=.6-P*P-M*M-S*S,T>0&&(C=r[he+e[q+e[J]]]*3,T*=T,Z+=T*T*(Ee[C]*P+Ee[C+1]*M+Ee[C+2]*S)),T=.6-v*v-X*X-i*i,T>0&&(C=r[he+B+e[q+O+e[J+D]]]*3,T*=T,Z+=T*T*(Ee[C]*v+Ee[C+1]*X+Ee[C+2]*i)),T=.6-k*k-H*H-N*N,T>0&&(C=r[he+E+e[q+j+e[J+V]]]*3,T*=T,Z+=T*T*(Ee[C]*k+Ee[C+1]*H+Ee[C+2]*N)),T=.6-ee*ee-pe*pe-ie*ie,T>0&&(C=r[he+1+e[q+1+e[J+1]]]*3,T*=T,Z+=T*T*(Ee[C]*ee+Ee[C+1]*pe+Ee[C+2]*ie)),32*Z}}function Ft(t=1){let e=t>>>0;const r=()=>{e=e+1831565813>>>0;let l=e;return l=Math.imul(l^l>>>15,l|1),l^=l+Math.imul(l^l>>>7,l|61),((l^l>>>14)>>>0)/4294967296},s=new Uint8Array(256);for(let l=0;l<256;l++)s[l]=l;for(let l=255;l>0;l--){const c=Math.floor(r()*(l+1));[s[l],s[c]]=[s[c],s[l]]}const n=new Uint8Array(512),o=new Uint8Array(512);for(let l=0;l<512;l++)n[l]=s[l&255],o[l]=n[l]%12;return{perm:n,permMod12:o}}const St=new Map;function on(t=256,e=1,{features:r=5,octaves:s=3,lacunarity:n=2,gain:o=.5,ridged:l=!0,sharpness:c=3}={},f=0,h=new Float32Array(t*t)){let a=St.get(e);a||(a=rn(e),St.set(e,a));const u=a,m=(M,S)=>{let B=0,O=1,D=r/t,E=0;for(let j=0;j<s;j++)B+=u(M*D,S*D,j*17.3+f)*O,E+=O,O*=o,D*=n;return B/E};let A=1/0,P=-1/0;for(let M=0;M<t;M++)for(let S=0;S<t;S++){const B=S/t,O=M/t,D=m(S,M)*(1-B)*(1-O)+m(S-t,M)*B*(1-O)+m(S,M-t)*(1-B)*O+m(S-t,M-t)*B*O,E=l?1-Math.abs(D):D;h[M*t+S]=E,E<A&&(A=E),E>P&&(P=E)}for(let M=0;M<h.length;M++)h[M]=Math.pow((h[M]-A)/(P-A),c);return{data:h,min:A,max:P}}function ft(t,e=0,r){const s=t.size|0,n=on(s,t.seed|0,t,e,r&&r.length===s*s?r:new Float32Array(s*s));return{N:s,data:n.data,min:n.min,max:n.max}}function an(t,e,r,s,n,o,l){let c=o/r+s,f=l/r+n;c-=Math.floor(c/e)*e,f-=Math.floor(f/e)*e;const h=Math.min(c|0,e-1),a=Math.min(f|0,e-1),u=c-h,m=f-a,A=(h+1)%e,P=(a+1)%e,M=a*e,S=P*e,B=t[M+h],O=t[M+A],D=t[S+h],E=t[S+A],j=B+(O-B)*u;return j+(D+(E-D)*u-j)*m}const Le=18,w={cx:0,cy:1,lx:2,ly:3,vx:4,vy:5,size:6,opacity:7,speed:8,jitter:9,driftOffX:10,driftOffY:11,driftSpdX:12,driftSpdY:13,driftRadius:14,stagger:15,landed:16,heading:17};function ln(t){const{width:e,height:r,count:s}=t,n=e/r,o=t.data,l=new Float32Array(s*4);for(let c=0;c<s;c++){const f=c*4;l[f]=(o[f]/e-.5)*n,l[f+1]=o[f+1]/r-.5,l[f+2]=o[f+2]/r,l[f+3]=o[f+3]}return{aspect:n,count:s,data:l}}function De(t){let e=t>>>0;return e=Math.imul(e^e>>>16,73244475),e=Math.imul(e^e>>>16,73244475),((e^e>>>16)>>>0)/4294967296}function Ke(t,e,r,s,n,o){if(e.dots===0||t>=e.dots&&!e.repeat){const m=(t*8+(e.index&7))*4;o[0]=De(m)*s*1.4-.2*s,o[1]=De(m+1)*n*1.4-.2*n,o[2]=.2+.6*De(m+2),o[3]=0;return}const l=t%e.dots,c=(e.offset+l)*4,f=r[c]*e.scale,h=r[c+1]*e.scale;let a=e.cx+f*e.cos-h*e.sin,u=e.cy+f*e.sin+h*e.cos;t>=e.dots&&(a+=(De(t*2+1540483477)-.5)*3,u+=(De(t*2+1+1540483477)-.5)*3),o[0]=a,o[1]=u,o[2]=r[c+2]*e.scale,o[3]=r[c+3]*e.ink}function Ot(t,e,r){const s=new Float32Array(t*Le);for(let n=0;n<t;n++){const o=n*Le,l=Math.random(),c=Math.random()*e,f=-50-Math.random()*r*1.5;s[o+w.cx]=c,s[o+w.cy]=f,s[o+w.lx]=c,s[o+w.ly]=f,s[o+w.size]=.2+.6*Math.random(),s[o+w.speed]=.08+.07*l,s[o+w.jitter]=Math.random()*2-1,s[o+w.driftOffX]=Math.random()*Math.PI*2,s[o+w.driftOffY]=Math.random()*Math.PI*2,s[o+w.driftSpdX]=.3+.7*Math.random(),s[o+w.driftSpdY]=.3+.7*Math.random(),s[o+w.driftRadius]=.2+.4*Math.random(),s[o+w.stagger]=.4*Math.random()}return s}function cn(t,e,r,s,n){const o=Ot(t,s,n),l=new Float32Array(4);for(let c=0;c<t;c++){const f=c*Le;Ke(c,e,r,s,n,l),o[f+w.cx]=o[f+w.lx]=l[0],o[f+w.cy]=o[f+w.ly]=l[1],o[f+w.size]=l[2],o[f+w.opacity]=l[3],o[f+w.landed]=1,o[f+w.heading]=e.index}return o}function fn(t,e){return t&&e.set(t.subarray(0,Math.min(t.length,e.length))),e}const Ce=16,dn=32,et=40;function un(t,e){const r=t.getContext("2d");let s=new Float32Array(e*Le),n=new Float32Array(0),o=new Float32Array(0),l=1,c=null,f=null,h=0;const a=new Float32Array(4),u=new Float32Array(4);let m=!1,A=new Float32Array(1),P=new Float32Array(1),M=new Float32Array(1),S=1,B=1;const O=i=>{c=i;const k=ft(i);o=k.data,l=k.N,f=null},D=i=>{const k=i.steerParams;if(h=0,i.liveNoise&&c){const F=performance.now();o=ft(i.field,i.texZ,o).data,f=null,h=performance.now()-F}const H=(F,y)=>an(o,l,i.field.texelPx,i.texOffX,i.texOffY,F,y),N=i.mouse,ee=i.mouseRadius,pe=i.mouseStrength*i.mouseSign,ie=i.mousePrev??N,he=N&&ie?N.x-ie.x:0,q=N&&ie?N.y-ie.y:0,J=Math.max(he*he+q*q,1e-6),Z=Math.hypot(i.mouseVel.x,i.mouseVel.y),T=[0,0],C=(F,y)=>{if(!ie){T[0]=T[1]=1e9;return}const G=Math.min(1,Math.max(0,((F-ie.x)*he+(y-ie.y)*q)/J));T[0]=F-(ie.x+he*G),T[1]=y-(ie.y+q*G)},te=Math.cos(k.sensorAngle),fe=Math.sin(k.sensorAngle),ae=k.sensorDist,z=i.walls,ge=i.crowd,R=ge.cellPx;if(ge.grid){const F=Math.ceil(i.vw/R)+1,y=Math.ceil(i.vh/R)+1;F!==S||y!==B?(S=F,B=y,A=new Float32Array(F*y),P=new Float32Array(F*y)):(P.fill(0),m||A.fill(0))}m=ge.grid;const I=(F,y)=>A[Math.min(B-1,Math.max(0,y))*S+Math.min(S-1,Math.max(0,F))],K=(F,y)=>{const G=F/R,we=y/R,b=Math.floor(G),x=Math.floor(we),d=G-b,g=we-x,L=I(b,x)+(I(b+1,x)-I(b,x))*d,U=I(b,x+1)+(I(b+1,x+1)-I(b,x+1))*d;return L+(U-L)*g},le=(F,y,G)=>{const we=F/R,b=y/R,x=Math.floor(we),d=Math.floor(b),g=we-x,L=b-d;for(let U=0;U<4;U++){const $=U&1,_=U>>1,re=x+$,ne=d+_;re<0||ne<0||re>=S||ne>=B||(P[ne*S+re]+=G*($?g:1-g)*(_?L:1-L))}};for(let F=0;F<i.count;F++){const y=F*Le,G=Math.sin(i.time*s[y+w.driftSpdX]+s[y+w.driftOffX])*s[y+w.driftRadius]*i.drift,we=Math.cos(i.time*s[y+w.driftSpdY]+s[y+w.driftOffY])*s[y+w.driftRadius]*i.drift;let b=s[y+w.cx],x=s[y+w.cy],d=s[y+w.vx],g=s[y+w.vy];s[y+w.lx]=b,s[y+w.ly]=x;const L=s[y+w.landed]>.5,U=_=>{if(z.enabled){if(_){const re=be=>{const p=Math.max(0,1-be/Math.max(z.range,1));return z.strength*p*p};d+=re(b)-re(i.vw-b),g+=re(x)-re(i.vh-x);const ne=z.margin,Re=i.vw-z.margin,Me=i.vh-z.margin,me=z.stiffness;b<ne?d+=(ne-b)*me:b>Re&&(d-=(b-Re)*me),x<ne?g+=(ne-x)*me:x>Me&&(g-=(x-Me)*me)}b<0&&(b=0,d=Math.abs(d)*z.bounce),b>i.vw&&(b=i.vw,d=-Math.abs(d)*z.bounce),x<0&&(x=0,g=Math.abs(g)*z.bounce),x>i.vh&&(x=i.vh,g=-Math.abs(g)*z.bounce)}},$=()=>{if(!N||pe===0)return;C(b,x);const _=T[0],re=T[1],ne=Math.sqrt(_*_+re*re);if(ne<ee){const Re=ne/ee,Me=Math.pow(1-Re*Re,i.mouseFalloff);if(ne>0&&(d+=_/ne*Me*pe,g+=re/ne*Me*pe),i.mouseDrag>0&&Z>.01){const me=i.mouseVel.x/Z,be=i.mouseVel.y/Z,p=d*me+g*be;if(p<Z){const W=(Z-p)*i.mouseDrag*Me;d+=me*W,g+=be*W}}if(i.mouseNoise>0){const me=H(b,x)*12.566+i.time*2;d+=Math.cos(me)*Me*i.mouseNoise,g+=Math.sin(me)*Me*i.mouseNoise}}};if(i.steer&&L){Ke(F,i.A,n,i.vw,i.vh,a);let _=Math.min(1,Math.max(0,a[1]/i.vh));i.B.index>=i.A.index&&(_=1-_);const re=i.lead+.4*k.stagger*(_*.85+s[y+w.stagger]/.4*.15),ne=i.t>=re;Ke(F,ne?i.B:i.A,n,i.vw,i.vh,a);const Re=ne?i.B.index:i.A.index;if(Re!==s[y+w.heading]){s[y+w.heading]=Re,s[y+w.landed]=2;const Y=Math.min(i.vw+et,Math.max(-et,b)),oe=Math.min(i.vh+et,Math.max(-et,x));(Y!==b||oe!==x)&&(b=Y,x=oe,s[y+w.lx]=b,s[y+w.ly]=x)}if(s[y+w.landed]<1.5){const Y=ne?i.shiftB:i.shiftA,oe=k.restFollow;b+=Y.x*oe,x+=Y.y*oe,s[y+w.lx]+=Y.x*oe,s[y+w.ly]+=Y.y*oe}const Me=a[0]+G,me=a[1]+we,be=Math.hypot(Me-b,me-x)||1e-6,p=z.enabled&&a[3]>0&&(Me<0||me<0||Me>i.vw||me>i.vh);p&&(s[y+w.landed]=2);let W=Me,se=me;if(p){const Y=Math.min(z.margin+.5*z.range,.5*Math.min(i.vw,i.vh));W=Math.min(i.vw-Y,Math.max(Y,Me)),se=Math.min(i.vh-Y,Math.max(Y,me))}const ye=W-b,ce=se-x,ve=Math.hypot(ye,ce)||1e-6;let xe=0,ke=0;if(z.enabled){const Y=z.margin,oe=i.vw-z.margin,Se=i.vh-z.margin;xe=b<Y?Y-b:b>oe?oe-b:0,ke=x<Y?Y-x:x>Se?Se-x:0}const Fe=xe!==0||ke!==0,Pe=s[y+w.landed]>1.5,ue=ye/ve,Q=ce/ve,de=k.maxSpeed*(1+k.speedVar*s[y+w.jitter]),Te=p&&z.cruise?de:Math.min(de,ve*k.arriveK),Ue=p?1:!Pe||be<=k.settleRadius?0:k.settleRadius>0?Math.min(1,(be-k.settleRadius)/k.settleRadius):1;let Ae=d+(ue*Te-d)*k.attract,Oe=g+(Q*Te-g)*k.attract;if(Ue>0){const Y=Math.sqrt(d*d+g*g),oe=Y>.05?d/Y:ue,Se=Y>.05?g/Y:Q,ze=oe*ue+Se*Q,qe=oe*Q-Se*ue;let _e=Math.max(-k.homing,Math.min(k.homing,Math.atan2(qe,ze)));const je=Math.min(1,Math.max(0,(ze-k.alignMin)/(1-k.alignMin)));if(je>0){const Je=H(b+(oe*te-Se*fe)*ae,x+(oe*fe+Se*te)*ae),Qe=H(b+(oe*te+Se*fe)*ae,x+(-oe*fe+Se*te)*ae);_e+=Math.max(-k.maxTurn,Math.min(k.maxTurn,(Je-Qe)*k.turnGain))*je}const Ge=Math.cos(_e),$e=Math.sin(_e);let Ye=oe*Ge-Se*$e,ot=oe*$e+Se*Ge;if(Fe){const Je=Math.hypot(xe,ke),Qe=xe/Je,ht=ke/Je,it=Ye*Qe+ot*ht;it<0&&(Ye-=2*it*Qe,ot-=2*it*ht)}const Lt=Te*(.25+.75*Math.max(0,ze)),mt=Y+(Lt-Y)*k.accel;Ae+=(Ye*mt-Ae)*Ue,Oe+=(ot*mt-Oe)*Ue}else if(!Pe&&k.restNoise>0){const Y=Math.sqrt(Ae*Ae+Oe*Oe);if(Y>.05){const oe=Ae/Y,Se=Oe/Y,ze=k.restNoise,qe=H(b+(oe*te-Se*fe)*ae,x+(oe*fe+Se*te)*ae),_e=H(b+(oe*te+Se*fe)*ae,x+(-oe*fe+Se*te)*ae),je=Math.max(-k.maxTurn*ze,Math.min(k.maxTurn*ze,(qe-_e)*k.turnGain*ze)),Ge=Math.cos(je),$e=Math.sin(je),Ye=Ae*Ge-Oe*$e;Oe=Ae*$e+Oe*Ge,Ae=Ye}}let Be=0;if(ge.grid&&a[3]>0){if(i.crowdFlight&&Pe&&(Be=1),N&&i.mouseCrowd>0){C(b,x);const Y=Math.hypot(T[0],T[1])/ee;Y<1&&(Be=Math.max(Be,Math.pow(1-Y*Y,i.mouseFalloff)*i.mouseCrowd))}if(Be>0){const Y=b+(De(F*2+77)-.5)*R,oe=x+(De(F*2+78)-.5)*R,Se=(K(Y+R,oe)-K(Y-R,oe))*.5,ze=(K(Y,oe+R)-K(Y,oe-R))*.5,qe=ge.strength*.05*Be;Ae-=Se*qe,Oe-=ze*qe}}d=Ae,g=Oe,$(),d*=k.damping,g*=k.damping,b+=d,x+=g,U(Pe),Be>0&&le(b,x,Be),Pe&&Math.hypot(a[0]+G-b,a[1]+we-x)<Math.max(k.settleRadius,4)&&(s[y+w.landed]=1),s[y+w.size]+=(a[2]-s[y+w.size])*.1,s[y+w.opacity]+=(a[3]-s[y+w.opacity])*.1}else{Ke(F,i.A,n,i.vw,i.vh,a),Ke(F,i.B,n,i.vw,i.vh,u);const _=i.eased,re=a[0]+(u[0]-a[0])*_,ne=a[1]+(u[1]-a[1])*_,Re=a[2]+(u[2]-a[2])*_,Me=a[3]+(u[3]-a[3])*_;$(),d*=.9,g*=.9;const me=i.t>.005?.12:s[y+w.speed];b+=(re+G-b)*me+d,x+=(ne+we-x)*me+g,L&&U(!1),s[y+w.size]+=(Re-s[y+w.size])*me,s[y+w.opacity]+=(Me-s[y+w.opacity])*me,!L&&Math.abs(re+G-b)<2&&Math.abs(ne+we-x)<2&&(s[y+w.landed]=1,s[y+w.heading]=i.eased>=.5?i.B.index:i.A.index,d=0,g=0)}s[y+w.cx]=b,s[y+w.cy]=x,s[y+w.vx]=d,s[y+w.vy]=g}if(ge.grid)if(!ge.blur)A.set(P);else{const F=S,y=B,G=P,we=A;M.length!==F*y&&(M=new Float32Array(F*y));const b=M;for(let x=0;x<y;x++){const d=x*F;for(let g=0;g<F;g++){const L=g>1?g-2:0,U=g>0?g-1:0,$=g<F-1?g+1:F-1,_=g<F-2?g+2:F-1;b[d+g]=G[d+L]+4*G[d+U]+6*G[d+g]+4*G[d+$]+G[d+_]}}for(let x=0;x<y;x++){const d=(x>1?x-2:0)*F,g=(x>0?x-1:0)*F,L=x*F,U=(x<y-1?x+1:y-1)*F,$=(x<y-2?x+2:y-1)*F;for(let _=0;_<F;_++)we[L+_]=(b[d+_]+4*b[g+_]+6*b[L+_]+4*b[U+_]+b[$+_])/256}}};let E=new Int32Array(Ce+1),j=new Int32Array(e),V=new Int8Array(e);const v=i=>{if(!f){const k=document.createElement("canvas");k.width=k.height=l;const H=k.getContext("2d"),N=H.createImageData(l,l);for(let ee=0;ee<o.length;ee++)N.data[ee*4]=200,N.data[ee*4+1]=90,N.data[ee*4+2]=40,N.data[ee*4+3]=o[ee]*127;H.putImageData(N,0,0),f=r.createPattern(k,"repeat")}r.save(),r.scale(i.texelPx,i.texelPx),r.translate(-i.texOffX,-i.texOffY),r.fillStyle=f,r.fillRect(i.texOffX,i.texOffY,i.vw/i.texelPx,i.vh/i.texelPx),r.restore()};return{kind:"canvas2d",device:"CPU (main thread) + Canvas 2D",setClouds:(i,k)=>{n=k},setField:O,setState:i=>{s=i,j.length!==e&&(j=new Int32Array(e),V=new Int8Array(e))},step:D,render:i=>{r.setTransform(i.dpr,0,0,i.dpr,0,0),r.clearRect(0,0,i.vw,i.vh),i.showField&&v(i);const k=i.alpha,H=i.count,N=q=>{const J=s[q+w.landed];return J>.5&&J<1.5?i.streak*i.restStreak:i.streak};E.fill(0);for(let q=0;q<H;q++){const J=q*Le;let Z=s[J+w.opacity];if(i.streakFade>0&&i.streak>0){const C=Math.max(.3,s[J+w.size]*i.size),te=s[J+w.cx]-s[J+w.lx],fe=s[J+w.cy]-s[J+w.ly],ae=Math.sqrt(te*te+fe*fe)*N(J);ae>2*C&&(Z*=1-i.streakFade*(1-2*C/(2*C+ae)))}const T=Z<.005?-1:Math.min(Ce-1,Z*Ce|0);V[q]=T,T>=0&&E[T+1]++}for(let q=1;q<=Ce;q++)E[q]+=E[q-1];const ee=E.slice(0,Ce);for(let q=0;q<H;q++){const J=V[q];J>=0&&(j[ee[J]++]=q)}const{r:pe,g:ie,b:he}=i.ink;for(let q=0;q<Ce;q++){const J=E[q],Z=E[q+1];if(J!==Z){r.fillStyle=`rgba(${pe},${ie},${he},${(q+.5)/Ce})`,r.beginPath();for(let T=J;T<Z;T++){T>J&&(T-J)%dn===0&&(r.fill(),r.beginPath());const C=j[T]*Le,te=Math.max(.3,s[C+w.size]*i.size),fe=s[C+w.lx],ae=s[C+w.ly],z=s[C+w.cx]-fe,ge=s[C+w.cy]-ae,R=fe+z*k,I=ae+ge*k,K=N(C),le=z*K,F=ge*K,y=le*le+F*F;if(y>4*te*te){const G=Math.sqrt(y),we=-F/G,b=le/G,x=te,d=te*(1-i.streakTaper),g=R-le,L=I-F;r.moveTo(R-we*x,I-b*x),r.lineTo(R+we*x,I+b*x),r.lineTo(g+we*d,L+b*d),r.lineTo(g-we*d,L-b*d),r.closePath()}else if(te<1.25){const G=te*1.7725;r.rect(R-G/2,I-G/2,G,G)}else r.moveTo(R+te,I),r.arc(R,I,te,0,2*Math.PI)}r.fill()}}},resize:(i,k,H)=>{t.width=Math.max(1,Math.round(i*H)),t.height=Math.max(1,Math.round(k*H)),t.style.width=`${i}px`,t.style.height=`${k}px`},exportState:async()=>s.slice(),timings:()=>({gpuSimMs:null,gpuDrawMs:null,noiseMs:h}),destroy:()=>{E=new Int32Array(0)}}}const dt=["Cx","Cy","Scale","Cos","Sin","Offset","Dots","Ink","Repeat","Index"],pn=["vw","vh","count","time","t","eased","drift","steer","mouseX","mouseY","mouseSign","mouseRadius","mouseStrength","texOffX","texOffY","texN","texelPx","attract","arriveK","settleRadius","damping","homing","accel","maxSpeed","speedVar","stagger","sensorDist","sensorAngle","turnGain","maxTurn","alignMin","zTime","features","octaves","lacunarity","gain","ridged","sharpness","normMin","normMax",...dt.map(t=>`a${t}`),...dt.map(t=>`b${t}`),"aShiftX","aShiftY","bShiftX","bShiftY","restFollow","restNoise","walls","wallMargin","wallBounce","crowd","mousePrevX","cellPx","gridW","gridH","wallK","wallRange","blur","wallStrength","wallCruise","mouseNoise","mouseFalloff","mouseCrowd","crowdFlight","lead","mousePrevY","mouseVelX","mouseVelY","mouseDrag","pad7","pad8","pad9","pad10"],mn=["vw","vh","dpr","alpha","inkR","inkG","inkB","size","streak","streakTaper","streakFade","texOffX","texOffY","texN","texelPx","restStreak"];function Pt(t){const e=new Float32Array(t.length),r=Object.fromEntries(t.map((s,n)=>[s,n]));return{data:e,set:(s,n)=>{e[r[s]]=n},wgsl:t.map(s=>`${s}: f32`).join(", ")}}const Et=`
// 72 bytes; layout matches STRIDE / P in particles.ts.
struct Particle {
  pos: vec2f, prev: vec2f, vel: vec2f,
  size: f32, opacity: f32, speed: f32, jitter: f32,
  driftOff: vec2f, driftSpd: vec2f,
  driftRadius: f32, stagger: f32, landed: f32, heading: f32,
}
`,Tt=`
fn sampleField(px: f32, py: f32, n: f32, texelPx: f32, offX: f32, offY: f32) -> f32 {
  let N = u32(n);
  var x = px / texelPx + offX;
  var y = py / texelPx + offY;
  x -= floor(x / n) * n;
  y -= floor(y / n) * n;
  let x0 = min(u32(x), N - 1u);
  let y0 = min(u32(y), N - 1u);
  let fx = x - f32(x0);
  let fy = y - f32(y0);
  let x1 = (x0 + 1u) % N;
  let y1 = (y0 + 1u) % N;
  let a = field[y0 * N + x0];
  let b = field[y0 * N + x1];
  let c = field[y1 * N + x0];
  let d = field[y1 * N + x1];
  return mix(mix(a, b, fx), mix(c, d, fx), fy);
}
`;function hn(t){return`
struct U { ${t} }
@group(0) @binding(0) var<uniform> u: U;
@group(0) @binding(1) var<storage, read> raw: array<u32>;
@group(0) @binding(2) var<storage, read_write> blurred: array<u32>;

@compute @workgroup_size(8, 8)
fn main(@builtin(global_invocation_id) gid: vec3u) {
  let W = i32(u.gridW);
  let H = i32(u.gridH);
  let x = i32(gid.x);
  let y = i32(gid.y);
  if (x >= W || y >= H) { return; }
  if (u.blur < 0.5) { blurred[y * W + x] = raw[y * W + x]; return; }
  var k = array<f32, 5>(1.0, 4.0, 6.0, 4.0, 1.0);
  var sum = 0.0;
  for (var dy = -2; dy <= 2; dy++) {
    for (var dx = -2; dx <= 2; dx++) {
      let cx = clamp(x + dx, 0, W - 1);
      let cy = clamp(y + dy, 0, H - 1);
      sum += k[dx + 2] * k[dy + 2] * f32(raw[cy * W + cx]);
    }
  }
  blurred[y * W + x] = u32(sum / 256.0);
}
`}function gn(t){const e=r=>`SceneX(${dt.map(s=>`u.${r}${s}`).join(", ")})`;return`
struct U { ${t} }
struct SceneX { cx: f32, cy: f32, scale: f32, cs: f32, sn: f32, offset: f32, dots: f32, ink: f32, repeat: f32, index: f32 }
${Et}
@group(0) @binding(0) var<uniform> u: U;
@group(0) @binding(1) var<storage, read_write> ps: array<Particle>;
@group(0) @binding(2) var<storage, read> dots: array<vec4f>; // local x, y, size, opacity
@group(0) @binding(3) var<storage, read> field: array<f32>;
// Crowd density (fixed point, 1/256 particle): read the blurred grid from last step, splat into the raw one.
@group(0) @binding(4) var<storage, read> densIn: array<u32>;
@group(0) @binding(5) var<storage, read_write> densOut: array<atomic<u32>>;
${Tt}

fn dens(x: i32, y: i32) -> f32 {
  let cx = clamp(x, 0, i32(u.gridW) - 1);
  let cy = clamp(y, 0, i32(u.gridH) - 1);
  return f32(densIn[u32(cy) * u32(u.gridW) + u32(cx)]) / 256.0;
}
fn densAt(q: vec2f) -> f32 {
  let g = q / u.cellPx;
  let i = vec2i(floor(g));
  let f = g - floor(g);
  return mix(mix(dens(i.x, i.y), dens(i.x + 1, i.y), f.x), mix(dens(i.x, i.y + 1), dens(i.x + 1, i.y + 1), f.x), f.y);
}
fn splat(q: vec2f, w: f32) {
  let g = q / u.cellPx;
  let i = vec2i(floor(g));
  let f = g - floor(g);
  let W = i32(u.gridW);
  let H = i32(u.gridH);
  for (var k = 0; k < 4; k++) {
    let o = vec2i(k & 1, k >> 1);
    let c = i + o;
    if (c.x < 0 || c.y < 0 || c.x >= W || c.y >= H) { continue; }
    let wx = select(1.0 - f.x, f.x, o.x == 1);
    let wy = select(1.0 - f.y, f.y, o.y == 1);
    atomicAdd(&densOut[u32(c.y * W + c.x)], u32(w * wx * wy * 256.0));
  }
}
// How far past the soft-wall margin q is, as an inward-pointing vector (0 inside, or with walls off).
fn wallIn(q: vec2f) -> vec2f {
  if (u.walls < 0.5) { return vec2f(0.0); }
  let lo = vec2f(u.wallMargin);
  let hi = vec2f(u.vw, u.vh) - u.wallMargin;
  return max(lo - q, vec2f(0.0)) - max(q - hi, vec2f(0.0));
}
// Smooth push away from the edges for flying particles: 0 at wallRange px, wallStrength at the edge.
fn edgePush(d: f32) -> f32 {
  let k = max(0.0, 1.0 - d / max(u.wallRange, 1.0));
  return u.wallStrength * k * k;
}
fn walls(p: ptr<function, Particle>, flying: bool) {
  if (u.walls < 0.5) { return; }
  // Flying particles only: a smooth push away from the edges, plus a spring past the margin.
  // (Resting particles sit on reachable rest spots, so walls never deform an image.)
  if (flying) {
    let q = (*p).pos;
    (*p).vel += vec2f(edgePush(q.x) - edgePush(u.vw - q.x), edgePush(q.y) - edgePush(u.vh - q.y));
    (*p).vel += wallIn(q) * u.wallK;
  }
  // Hard stop at the viewport edge itself.
  let e = vec2f(u.vw, u.vh);
  if ((*p).pos.x < 0.0) { (*p).pos.x = 0.0; (*p).vel.x = abs((*p).vel.x) * u.wallBounce; }
  if ((*p).pos.x > e.x) { (*p).pos.x = e.x; (*p).vel.x = -abs((*p).vel.x) * u.wallBounce; }
  if ((*p).pos.y < 0.0) { (*p).pos.y = 0.0; (*p).vel.y = abs((*p).vel.y) * u.wallBounce; }
  if ((*p).pos.y > e.y) { (*p).pos.y = e.y; (*p).vel.y = -abs((*p).vel.y) * u.wallBounce; }
}

fn hash01(x: u32) -> f32 {
  var n = x;
  n = (n ^ (n >> 16u)) * 0x45d9f3bu;
  n = (n ^ (n >> 16u)) * 0x45d9f3bu;
  return f32(n ^ (n >> 16u)) / 4294967296.0;
}

// Mirrors targetOf() in particles.ts.
fn targetOf(i: u32, S: SceneX) -> vec4f {
  let n = u32(S.dots);
  if (n == 0u || (i >= n && S.repeat < 0.5)) {
    let key = (i * 8u + (u32(S.index) & 7u)) * 4u;
    return vec4f(
      hash01(key) * u.vw * 1.4 - 0.2 * u.vw,
      hash01(key + 1u) * u.vh * 1.4 - 0.2 * u.vh,
      0.2 + 0.6 * hash01(key + 2u),
      0.0,
    );
  }
  let d = dots[u32(S.offset) + i % n];
  let l = d.xy * S.scale;
  var p = vec2f(S.cx + l.x * S.cs - l.y * S.sn, S.cy + l.x * S.sn + l.y * S.cs);
  if (i >= n) {
    p += (vec2f(hash01(i * 2u + 0x5bd1e995u), hash01(i * 2u + 1u + 0x5bd1e995u)) - 0.5) * 3.0;
  }
  return vec4f(p, d.z * S.scale, d.w * S.ink);
}

fn sample(p: vec2f) -> f32 { return sampleField(p.x, p.y, u.texN, u.texelPx, u.texOffX, u.texOffY); }

// Offset from the nearest point on the cursor's path this step (the segment it swept), so a fast
// stroke reaches everything it crossed, not just where it was sampled.
fn fromCursor(q: vec2f) -> vec2f {
  let a = vec2f(u.mousePrevX, u.mousePrevY);
  let ab = vec2f(u.mouseX, u.mouseY) - a;
  let h = clamp(dot(q - a, ab) / max(dot(ab, ab), 1e-6), 0.0, 1.0);
  return q - (a + ab * h);
}

fn repel(p: ptr<function, Particle>) {
  if (u.mouseSign == 0.0) { return; }
  let m = fromCursor((*p).pos);
  let dist = length(m);
  if (dist < u.mouseRadius) {
    let x = dist / u.mouseRadius;
    let f = pow(1.0 - x * x, u.mouseFalloff); // smooth bell, zero slope at the edge
    if (dist > 0.0) { (*p).vel += m / dist * (f * u.mouseStrength * u.mouseSign); }
    // Drag: top up speed along the stroke toward the cursor's own speed (never past it).
    let mv = vec2f(u.mouseVelX, u.mouseVelY);
    let ms = length(mv);
    if (u.mouseDrag > 0.0 && ms > 0.01) {
      let dir = mv / ms;
      let along = dot((*p).vel, dir);
      if (along < ms) { (*p).vel += dir * ((ms - along) * u.mouseDrag * f); }
    }
    // Pressed: churn in the noise field (a direction from the field, turning over time).
    if (u.mouseNoise > 0.0) {
      let a = sample((*p).pos) * 12.566 + u.time * 2.0;
      (*p).vel += vec2f(cos(a), sin(a)) * (f * u.mouseNoise);
    }
  }
}

@compute @workgroup_size(256)
fn main(@builtin(global_invocation_id) gid: vec3u) {
  let i = gid.x;
  if (i >= u32(u.count)) { return; }
  var p = ps[i];
  let d = vec2f(
    sin(u.time * p.driftSpd.x + p.driftOff.x),
    cos(u.time * p.driftSpd.y + p.driftOff.y),
  ) * p.driftRadius * u.drift;
  p.prev = p.pos;

  if (u.steer > 0.5 && p.landed > 0.5) {
    // ---- steer: physarum-style flight + damped landing
    // Departure order: a sweep by where the particle rests in the scene it's leaving.
    // Forward (scrolling down) the lowest leave first; going back, the highest.
    var fy = clamp(targetOf(i, ${e("a")}).y / u.vh, 0.0, 1.0);
    if (u.bIndex >= u.aIndex) { fy = 1.0 - fy; }
    let switchAt = u.lead + 0.4 * u.stagger * (fy * 0.85 + (p.stagger / 0.4) * 0.15);
    var T: vec4f;
    var hi: f32;
    var shift: vec2f;
    if (u.t >= switchAt) { T = targetOf(i, ${e("b")}); hi = u.bIndex; shift = vec2f(u.bShiftX, u.bShiftY); }
    else { T = targetOf(i, ${e("a")}); hi = u.aIndex; shift = vec2f(u.aShiftX, u.aShiftY); }
    // A new target scene starts a flight; resting particles ride along with their scene.
    if (hi != p.heading) {
      p.heading = hi; p.landed = 2.0;
      // Taking off from off-screen (the old scene scrolled away): start just outside the nearest
      // edge instead, so the particle streams in now rather than after an unseen trip back.
      let q = clamp(p.pos, vec2f(-40.0), vec2f(u.vw + 40.0, u.vh + 40.0));
      if (any(q != p.pos)) { p.pos = q; p.prev = q; }
    }
    // Shift prev too: riding along with the page isn't motion, so it draws no streak.
    if (p.landed < 1.5) { p.pos += shift * u.restFollow; p.prev += shift * u.restFollow; }
    let goal = T.xy + d;
    let dist = max(length(goal - p.pos), 1e-6); // to the real rest spot: landing, crowd
    // Rest spot at or past the screen edge: unreachable. Fly (or take flight again) and aim at the
    // nearest point well inside the walls, without slowing to land, so they swarm there until it's back in view.
    let unreachable = u.walls > 0.5 && T.w > 0.0 && (goal.x < 0.0 || goal.y < 0.0 || goal.x > u.vw || goal.y > u.vh);
    if (unreachable) { p.landed = 2.0; }
    let flying = p.landed > 1.5;
    var aim = goal;
    if (unreachable) {
      let inset = min(u.wallMargin + 0.5 * u.wallRange, 0.5 * min(u.vw, u.vh));
      aim = clamp(goal, vec2f(inset), vec2f(u.vw, u.vh) - inset);
    }
    let aimDist = max(length(aim - p.pos), 1e-6);
    let dir = (aim - p.pos) / aimDist;
    let wn = wallIn(p.pos);
    let topSpeed = u.maxSpeed * (1.0 + u.speedVar * p.jitter);
    let desired = select(min(topSpeed, aimDist * u.arriveK), topSpeed, unreachable && u.wallCruise > 0.5);
    var far = 0.0;
    if (unreachable) { far = 1.0; }
    else if (flying && dist > u.settleRadius) {
      far = select(1.0, min(1.0, (dist - u.settleRadius) / u.settleRadius), u.settleRadius > 0.0);
    }
    var v = p.vel + (dir * desired - p.vel) * u.attract;
    if (far > 0.0) {
      let sp = length(p.vel);
      var h = dir;
      if (sp > 0.05) { h = p.vel / sp; }
      let al = dot(h, dir);
      let crs = h.x * dir.y - h.y * dir.x;
      var turn = clamp(atan2(crs, al), -u.homing, u.homing);
      let gate = clamp((al - u.alignMin) / (1.0 - u.alignMin), 0.0, 1.0);
      if (gate > 0.0) {
        let ca = cos(u.sensorAngle);
        let sa = sin(u.sensorAngle);
        let L = sample(p.pos + vec2f(h.x * ca - h.y * sa, h.x * sa + h.y * ca) * u.sensorDist);
        let R = sample(p.pos + vec2f(h.x * ca + h.y * sa, -h.x * sa + h.y * ca) * u.sensorDist);
        turn += clamp((L - R) * u.turnGain, -u.maxTurn, u.maxTurn) * gate;
      }
      let c = cos(turn);
      let s = sin(turn);
      var nh = vec2f(h.x * c - h.y * s, h.x * s + h.y * c);
      // Heading into a wall: bounce the heading, so homing curves it back around instead of skimming along the wall.
      if (dot(wn, wn) > 0.0) {
        let n = normalize(wn);
        let into = dot(nh, n);
        if (into < 0.0) { nh -= 2.0 * into * n; }
      }
      let flightSpeed = desired * (0.25 + 0.75 * max(0.0, al));
      let nsp = sp + (flightSpeed - sp) * u.accel;
      v += (nh * nsp - v) * far;
    } else if (!flying && u.restNoise > 0.0) {
      // Resting: a softened sensor turn scatters the spring motion so dots don't all move in parallel.
      let sp = length(v);
      if (sp > 0.05) {
        let h = v / sp;
        let ca = cos(u.sensorAngle);
        let sa = sin(u.sensorAngle);
        let L = sample(p.pos + vec2f(h.x * ca - h.y * sa, h.x * sa + h.y * ca) * u.sensorDist);
        let R = sample(p.pos + vec2f(h.x * ca + h.y * sa, -h.x * sa + h.y * ca) * u.sensorDist);
        let k = u.restNoise;
        let turn = clamp((L - R) * u.turnGain * k, -u.maxTurn * k, u.maxTurn * k);
        let c = cos(turn);
        let s = sin(turn);
        v = vec2f(v.x * c - v.y * s, v.x * s + v.y * c);
      }
    }
    // Crowd: displaced particles (with somewhere visible to be) push each other apart.
    var crowdW = 0.0;
    if (u.crowd > 0.0 && T.w > 0.0) {
      if (u.crowdFlight > 0.0 && flying) { crowdW = 1.0; }
      // Pressed with press.crowd: everything under the cursor crowds too, weighted by the cursor's bell.
      if (u.mouseCrowd > 0.0) {
        let x = length(fromCursor(p.pos)) / u.mouseRadius;
        if (x < 1.0) { crowdW = max(crowdW, pow(1.0 - x * x, u.mouseFalloff) * u.mouseCrowd); }
      }
      if (crowdW > 0.0) {
        let e = u.cellPx;
        // Per-particle sampling offset (fixed, within a cell) so the crowd doesn't settle into grid rows.
        let q = p.pos + (vec2f(hash01(i * 2u + 77u), hash01(i * 2u + 78u)) - 0.5) * e;
        let grad = vec2f(densAt(q + vec2f(e, 0.0)) - densAt(q - vec2f(e, 0.0)), densAt(q + vec2f(0.0, e)) - densAt(q - vec2f(0.0, e))) * 0.5;
        v -= grad * (u.crowd * 0.05 * crowdW);
      }
    }
    p.vel = v;
    repel(&p);
    p.vel *= u.damping;
    p.pos += p.vel;
    walls(&p, flying);
    if (crowdW > 0.0) { splat(p.pos, crowdW); }
    // Land inside settleRadius, and well inside the refly distance so landing doesn't immediately re-fly.
    if (flying && length(T.xy + d - p.pos) < max(u.settleRadius, 4.0)) { p.landed = 1.0; }
    p.size += (T.z - p.size) * 0.1;
    p.opacity += (T.w - p.opacity) * 0.1;
  } else {
    // ---- ease: glide toward a lerped target (also the entrance drop)
    let T = mix(targetOf(i, ${e("a")}), targetOf(i, ${e("b")}), u.eased);
    repel(&p);
    p.vel *= 0.9;
    let k = select(p.speed, 0.12, u.t > 0.005);
    p.pos += (T.xy + d - p.pos) * k + p.vel;
    if (p.landed > 0.5) { walls(&p, false); }
    p.size += (T.z - p.size) * k;
    p.opacity += (T.w - p.opacity) * k;
    if (p.landed < 0.5 && all(abs(T.xy + d - p.pos) < vec2f(2.0))) {
      p.landed = 1.0;
      p.heading = select(u.aIndex, u.bIndex, u.eased >= 0.5);
      p.vel = vec2f(0.0);
    }
  }
  ps[i] = p;
}
`}function yn(t){return`
struct U { ${t} }
@group(0) @binding(0) var<uniform> u: U;
@group(0) @binding(1) var<storage, read_write> fieldOut: array<f32>;
@group(0) @binding(2) var<storage, read> perm: array<u32>; // [0..512) perm, [512..1024) perm % 12

var<private> GRAD3: array<vec3f, 12> = array<vec3f, 12>(
  vec3f(1, 1, 0), vec3f(-1, 1, 0), vec3f(1, -1, 0), vec3f(-1, -1, 0),
  vec3f(1, 0, 1), vec3f(-1, 0, 1), vec3f(1, 0, -1), vec3f(-1, 0, -1),
  vec3f(0, 1, 1), vec3f(0, -1, 1), vec3f(0, 1, -1), vec3f(0, -1, -1),
);

fn P(i: i32) -> i32 { return i32(perm[u32(i)]); }
fn PM(i: i32) -> i32 { return i32(perm[512u + u32(i)]); }

fn corner(p: vec3f, gi: i32) -> f32 {
  var t = 0.6 - dot(p, p);
  if (t <= 0.0) { return 0.0; }
  t *= t;
  return t * t * dot(GRAD3[gi], p);
}

fn noise3(x: f32, y: f32, z: f32) -> f32 {
  let F3 = 1.0 / 3.0;
  let G3 = 1.0 / 6.0;
  let s = (x + y + z) * F3;
  let i = floor(x + s);
  let j = floor(y + s);
  let k = floor(z + s);
  let t = (i + j + k) * G3;
  let p0 = vec3f(x - (i - t), y - (j - t), z - (k - t));
  var o1: vec3i;
  var o2: vec3i;
  if (p0.x >= p0.y) {
    if (p0.y >= p0.z) { o1 = vec3i(1, 0, 0); o2 = vec3i(1, 1, 0); }
    else if (p0.x >= p0.z) { o1 = vec3i(1, 0, 0); o2 = vec3i(1, 0, 1); }
    else { o1 = vec3i(0, 0, 1); o2 = vec3i(1, 0, 1); }
  } else {
    if (p0.y < p0.z) { o1 = vec3i(0, 0, 1); o2 = vec3i(0, 1, 1); }
    else if (p0.x < p0.z) { o1 = vec3i(0, 1, 0); o2 = vec3i(0, 1, 1); }
    else { o1 = vec3i(0, 1, 0); o2 = vec3i(1, 1, 0); }
  }
  let p1 = p0 - vec3f(o1) + G3;
  let p2 = p0 - vec3f(o2) + 2.0 * G3;
  let p3 = p0 - 1.0 + 3.0 * G3;
  let ii = i32(i) & 255;
  let jj = i32(j) & 255;
  let kk = i32(k) & 255;
  var n = corner(p0, PM(ii + P(jj + P(kk))));
  n += corner(p1, PM(ii + o1.x + P(jj + o1.y + P(kk + o1.z))));
  n += corner(p2, PM(ii + o2.x + P(jj + o2.y + P(kk + o2.z))));
  n += corner(p3, PM(ii + 1 + P(jj + 1 + P(kk + 1))));
  return 32.0 * n;
}

fn fbm(x: f32, y: f32) -> f32 {
  var v = 0.0;
  var amp = 1.0;
  var f = u.features / u.texN;
  var norm = 0.0;
  let octaves = i32(u.octaves);
  for (var o = 0; o < octaves; o++) {
    v += noise3(x * f, y * f, f32(o) * 17.3 + u.zTime) * amp;
    norm += amp;
    amp *= u.gain;
    f *= u.lacunarity;
  }
  return v / norm;
}

@compute @workgroup_size(8, 8)
fn main(@builtin(global_invocation_id) gid: vec3u) {
  let N = u32(u.texN);
  if (gid.x >= N || gid.y >= N) { return; }
  let n = u.texN;
  let x = f32(gid.x);
  let y = f32(gid.y);
  let wx = x / n;
  let wy = y / n;
  let v = fbm(x, y) * (1.0 - wx) * (1.0 - wy) + fbm(x - n, y) * wx * (1.0 - wy)
        + fbm(x, y - n) * (1.0 - wx) * wy + fbm(x - n, y - n) * wx * wy;
  let r = select(v, 1.0 - abs(v), u.ridged > 0.5);
  // Normalized with the static texture's range (per-frame min/max would need a reduction pass).
  let t = clamp((r - u.normMin) / max(u.normMax - u.normMin, 1e-6), 0.0, 1.0);
  fieldOut[gid.y * N + gid.x] = pow(t, u.sharpness);
}
`}function xn(t){return`
struct R { ${t} }
${Et}
@group(0) @binding(0) var<uniform> r: R;
@group(0) @binding(1) var<storage, read> ps: array<Particle>;
@group(0) @binding(3) var<storage, read> field: array<f32>;
${Tt}

struct VOut {
  @builtin(position) pos: vec4f,
  @location(0) local: vec2f, // device-px offset from a round dot's center
  @location(1) @interpolate(flat) radius: f32, // device px; 0 = no circle mask
  @location(2) @interpolate(flat) alpha: f32,
}

fn toClip(p: vec2f) -> vec4f {
  return vec4f(p.x / r.vw * 2.0 - 1.0, 1.0 - p.y / r.vh * 2.0, 0.0, 1.0);
}

@vertex
fn vs(@builtin(vertex_index) vi: u32, @builtin(instance_index) ii: u32) -> VOut {
  var out: VOut;
  out.pos = vec4f(2.0, 2.0, 0.0, 1.0); // off-screen unless set below
  out.local = vec2f(0.0);
  out.radius = 0.0;
  out.alpha = 0.0;
  let p = ps[ii];
  // Triangle-strip corners (0,0) (1,0) (0,1) (1,1): x = side, y = head/tail.
  let corner = vec2f(f32(vi & 1u), f32(vi >> 1u));
  let side = corner.x * 2.0 - 1.0;
  var o = p.opacity;
  let rad = max(0.3, p.size * r.size);
  let motion = p.pos - p.prev;
  let headPos = p.prev + motion * r.alpha; // interpolated between sim steps
  let resting = p.landed > 0.5 && p.landed < 1.5;
  let m = motion * r.streak * select(1.0, r.restStreak, resting);
  let len = length(m);
  if (r.streakFade > 0.0 && r.streak > 0.0 && len > 2.0 * rad) {
    o *= 1.0 - r.streakFade * (1.0 - (2.0 * rad) / (2.0 * rad + len));
  }
  if (o < 0.005) { return out; }
  let px = 1.0 / r.dpr; // one device pixel, in CSS px

  if (len > 2.0 * rad) {
    // Streak: tapered quad from the head back along one step of motion.
    let dir = m / len;
    let nrm = vec2f(-dir.y, dir.x);
    var hw = rad;
    var tw = rad * (1.0 - r.streakTaper);
    if (2.0 * hw < px) { // thinner than a device pixel: widen, fade by lost coverage
      let k = 2.0 * hw / px;
      o *= k;
      hw = px * 0.5;
      tw /= k;
    }
    let head = corner.y < 0.5;
    let base = select(headPos - m, headPos, head);
    let w = select(tw, hw, head);
    out.pos = toClip(base + nrm * w * side);
  } else {
    var half: f32;
    if (rad < 1.25) {
      half = rad * 1.7725 * 0.5; // equal-area square, like the Canvas 2D engine
      if (2.0 * half < px) {
        let k = 2.0 * half / px;
        o *= k * k;
        half = px * 0.5;
      }
    } else {
      half = rad + px; // a pixel of padding for the antialiased edge
      out.radius = rad * r.dpr;
    }
    let off = vec2f(side, corner.y * 2.0 - 1.0) * half;
    out.local = off * r.dpr;
    out.pos = toClip(headPos + off);
  }
  out.alpha = o;
  return out;
}

@fragment
fn fs(f: VOut) -> @location(0) vec4f {
  var a = f.alpha;
  if (f.radius > 0.0) { a *= clamp(f.radius - length(f.local) + 0.5, 0.0, 1.0); }
  return vec4f(vec3f(r.inkR, r.inkG, r.inkB) * a, a); // premultiplied
}

@vertex
fn vsField(@builtin(vertex_index) vi: u32) -> @builtin(position) vec4f {
  let p = vec2f(f32((vi << 1u) & 2u), f32(vi & 2u));
  return vec4f(p * 2.0 - 1.0, 0.0, 1.0);
}

@fragment
fn fsField(@builtin(position) fc: vec4f) -> @location(0) vec4f {
  let css = fc.xy / r.dpr;
  let a = sampleField(css.x, css.y, r.texN, r.texelPx, r.texOffX, r.texOffY) * 127.0 / 255.0;
  return vec4f(vec3f(200.0, 90.0, 40.0) / 255.0 * a, a);
}
`}function ut(){return typeof navigator<"u"&&"gpu"in navigator&&!!navigator.gpu}const tt=4;async function wn(t,e){if(!ut())throw new Error("WebGPU is not available in this browser");const r=await navigator.gpu.requestAdapter({powerPreference:"high-performance"});if(!r)throw new Error("No WebGPU adapter");const s=r.features.has("timestamp-query"),n=await r.requestDevice({requiredFeatures:s?["timestamp-query"]:[],requiredLimits:{maxStorageBufferBindingSize:r.limits.maxStorageBufferBindingSize,maxBufferSize:r.limits.maxBufferSize}});let o=!1;n.lost.then(p=>{o=!0,p.reason!=="destroyed"&&console.warn("[particulator] WebGPU device lost:",p.message)});const l=t.getContext("webgpu"),c=navigator.gpu.getPreferredCanvasFormat();l.configure({device:n,format:c,alphaMode:"premultiplied"});const f=r.info,h=`WebGPU · ${[f?.vendor,f?.architecture].filter(Boolean).join(" ")||f?.description||"GPU"}`,a=Pt(pn),u=Pt(mn),m=GPUBufferUsage,A=n.createBuffer({size:a.data.byteLength,usage:m.UNIFORM|m.COPY_DST}),P=n.createBuffer({size:u.data.byteLength,usage:m.UNIFORM|m.COPY_DST}),M=e*Le*4,S=n.createBuffer({size:Math.max(16,M),usage:m.STORAGE|m.COPY_DST|m.COPY_SRC}),B=n.createBuffer({size:1024*4,usage:m.STORAGE|m.COPY_DST});let O=n.createBuffer({size:16,usage:m.STORAGE|m.COPY_DST}),D=n.createBuffer({size:4,usage:m.STORAGE|m.COPY_DST}),E=1,j=0,V=1,v=new Float32Array(1),X=!1;const i=GPUShaderStage.COMPUTE,k=GPUShaderStage.VERTEX,H=GPUShaderStage.FRAGMENT,N=p=>n.createBindGroupLayout({entries:p}),ee=N([{binding:0,visibility:i,buffer:{type:"uniform"}},{binding:1,visibility:i,buffer:{type:"storage"}},{binding:2,visibility:i,buffer:{type:"read-only-storage"}},{binding:3,visibility:i,buffer:{type:"read-only-storage"}},{binding:4,visibility:i,buffer:{type:"read-only-storage"}},{binding:5,visibility:i,buffer:{type:"storage"}}]),pe=N([{binding:0,visibility:i,buffer:{type:"uniform"}},{binding:1,visibility:i,buffer:{type:"read-only-storage"}},{binding:2,visibility:i,buffer:{type:"storage"}}]),ie=N([{binding:0,visibility:i,buffer:{type:"uniform"}},{binding:1,visibility:i,buffer:{type:"storage"}},{binding:2,visibility:i,buffer:{type:"read-only-storage"}}]),he=N([{binding:0,visibility:k|H,buffer:{type:"uniform"}},{binding:1,visibility:k,buffer:{type:"read-only-storage"}},{binding:3,visibility:H,buffer:{type:"read-only-storage"}}]),q=(p,W,se)=>n.createComputePipeline({layout:n.createPipelineLayout({bindGroupLayouts:[W]}),compute:{module:n.createShaderModule({code:p,label:se}),entryPoint:"main"}}),J=q(gn(a.wgsl),ee,"particulator sim"),Z=q(yn(a.wgsl),ie,"particulator noise"),T=q(hn(a.wgsl),pe,"particulator crowd blur"),C=n.createShaderModule({code:xn(u.wgsl),label:"particulator render"}),te=4,fe={color:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"}},ae=n.createPipelineLayout({bindGroupLayouts:[he]}),z=n.createRenderPipeline({layout:ae,vertex:{module:C,entryPoint:"vs"},fragment:{module:C,entryPoint:"fs",targets:[{format:c,blend:fe}]},primitive:{topology:"triangle-strip"},multisample:{count:te}}),ge=n.createRenderPipeline({layout:ae,vertex:{module:C,entryPoint:"vsField"},fragment:{module:C,entryPoint:"fsField",targets:[{format:c,blend:fe}]},primitive:{topology:"triangle-list"},multisample:{count:te}});let R=[0,1].map(()=>n.createBuffer({size:16,usage:m.STORAGE|m.COPY_DST})),I=1,K=1,le=!1,F,y,G,we;const b=()=>{const p=(W,se)=>n.createBindGroup({layout:W,entries:se.map(([ye,ce])=>({binding:ye,resource:{buffer:ce}}))});F=p(ee,[[0,A],[1,S],[2,O],[3,D],[4,R[1]],[5,R[0]]]),y=p(pe,[[0,A],[1,R[0]],[2,R[1]]]),G=p(ie,[[0,A],[1,D],[2,B]]),we=p(he,[[0,P],[1,S],[3,D]])};b();const x=tt*2+2,d=s?n.createQuerySet({type:"timestamp",count:x}):null,g=s?n.createBuffer({size:x*8,usage:m.QUERY_RESOLVE|m.COPY_SRC}):null,L=s?[0,1,2].map(()=>n.createBuffer({size:x*8,usage:m.MAP_READ|m.COPY_DST})):[],U=new Set;let $=0,_=null,re=null,ne=null;const Re=()=>((!ne||ne.width!==t.width||ne.height!==t.height)&&(ne?.destroy(),ne=n.createTexture({size:[t.width,t.height],format:c,sampleCount:te,usage:GPUTextureUsage.RENDER_ATTACHMENT})),ne.createView());return{kind:"webgpu",device:h,setClouds:(p,W)=>{O.destroy(),O=n.createBuffer({size:Math.max(16,W.byteLength),usage:m.STORAGE|m.COPY_DST}),W.byteLength&&n.queue.writeBuffer(O,0,W),b()},setField:p=>{const W=ft(p);v=W.data,j=W.min,V=W.max,(W.N!==E||D.size!==W.N*W.N*4)&&(D.destroy(),D=n.createBuffer({size:W.N*W.N*4,usage:m.STORAGE|m.COPY_DST}),E=W.N,b());const{perm:se,permMod12:ye}=Ft(p.seed|0),ce=new Uint32Array(1024);ce.set(se,0),ce.set(ye,512),n.queue.writeBuffer(B,0,ce),n.queue.writeBuffer(D,0,v)},setState:p=>n.queue.writeBuffer(S,0,p.subarray(0,e*Le)),step:p=>{if(o)return;const W=p.liveNoise;!W&&X&&n.queue.writeBuffer(D,0,v),X=W;const se=p.steerParams,ye=p.field;a.set("vw",p.vw),a.set("vh",p.vh),a.set("count",p.count),a.set("time",p.time),a.set("t",p.t),a.set("eased",p.eased),a.set("drift",p.drift),a.set("steer",p.steer?1:0),a.set("mouseX",p.mouse?.x??0),a.set("mouseY",p.mouse?.y??0),a.set("mousePrevX",(p.mousePrev??p.mouse)?.x??0),a.set("mousePrevY",(p.mousePrev??p.mouse)?.y??0),a.set("mouseVelX",p.mouseVel.x),a.set("mouseVelY",p.mouseVel.y),a.set("mouseDrag",p.mouseDrag),a.set("mouseSign",p.mouse?p.mouseSign:0),a.set("mouseRadius",p.mouseRadius),a.set("mouseStrength",p.mouseStrength),a.set("mouseNoise",p.mouseNoise),a.set("mouseFalloff",p.mouseFalloff),a.set("mouseCrowd",p.mouse?p.mouseCrowd:0),a.set("crowdFlight",p.crowdFlight?1:0),a.set("lead",p.lead),a.set("aShiftX",p.shiftA.x),a.set("aShiftY",p.shiftA.y),a.set("bShiftX",p.shiftB.x),a.set("bShiftY",p.shiftB.y),a.set("texOffX",p.texOffX%E),a.set("texOffY",p.texOffY%E),a.set("texN",E),a.set("texelPx",ye.texelPx);for(const Q of["attract","arriveK","settleRadius","damping","homing","accel","maxSpeed","speedVar","stagger","sensorDist","sensorAngle","turnGain","maxTurn","alignMin","restFollow","restNoise"])a.set(Q,se[Q]);a.set("zTime",p.texZ),a.set("features",ye.features),a.set("octaves",ye.octaves),a.set("lacunarity",ye.lacunarity),a.set("gain",ye.gain),a.set("ridged",ye.ridged?1:0),a.set("sharpness",ye.sharpness),a.set("normMin",j),a.set("normMax",V);for(const[Q,de]of[["a",p.A],["b",p.B]])a.set(`${Q}Cx`,de.cx),a.set(`${Q}Cy`,de.cy),a.set(`${Q}Scale`,de.scale),a.set(`${Q}Cos`,de.cos),a.set(`${Q}Sin`,de.sin),a.set(`${Q}Offset`,de.offset),a.set(`${Q}Dots`,de.dots),a.set(`${Q}Ink`,de.ink),a.set(`${Q}Repeat`,de.repeat?1:0),a.set(`${Q}Index`,de.index);const ce=p.crowd,ve=p.walls,xe=Math.ceil(p.vw/ce.cellPx)+1,ke=Math.ceil(p.vh/ce.cellPx)+1;ce.grid&&(xe!==I||ke!==K)&&(I=xe,K=ke,R.forEach(Q=>Q.destroy()),R=[0,1].map(()=>n.createBuffer({size:I*K*4,usage:m.STORAGE|m.COPY_DST})),b()),a.set("walls",ve.enabled?1:0),a.set("wallMargin",ve.margin),a.set("wallBounce",ve.bounce),a.set("wallK",ve.stiffness),a.set("wallRange",ve.range),a.set("wallStrength",ve.strength),a.set("wallCruise",ve.cruise?1:0),a.set("blur",ce.blur?1:0),a.set("crowd",ce.grid?ce.strength:0),a.set("cellPx",ce.cellPx),a.set("gridW",I),a.set("gridH",K),n.queue.writeBuffer(A,0,a.data);const Fe=n.createCommandEncoder(),Pe=$<tt&&d?{timestampWrites:{querySet:d,beginningOfPassWriteIndex:$*2,endOfPassWriteIndex:$*2+1}}:{};ce.grid&&Fe.clearBuffer(R[0]),ce.grid&&!le&&Fe.clearBuffer(R[1]),le=ce.grid;const ue=Fe.beginComputePass(Pe);W&&(ue.setPipeline(Z),ue.setBindGroup(0,G),ue.dispatchWorkgroups(Math.ceil(E/8),Math.ceil(E/8))),ue.setPipeline(J),ue.setBindGroup(0,F),ue.dispatchWorkgroups(Math.ceil(p.count/256)),ce.grid&&(ue.setPipeline(T),ue.setBindGroup(0,y),ue.dispatchWorkgroups(Math.ceil(I/8),Math.ceil(K/8))),ue.end(),n.queue.submit([Fe.finish()]),$++},render:p=>{if(o)return;u.set("vw",p.vw),u.set("vh",p.vh),u.set("dpr",p.dpr),u.set("alpha",p.alpha),u.set("inkR",p.ink.r/255),u.set("inkG",p.ink.g/255),u.set("inkB",p.ink.b/255),u.set("size",p.size),u.set("streak",p.streak),u.set("streakTaper",p.streakTaper),u.set("streakFade",p.streakFade),u.set("restStreak",p.restStreak),u.set("texOffX",p.texOffX%E),u.set("texOffY",p.texOffY%E),u.set("texN",E),u.set("texelPx",p.texelPx),n.queue.writeBuffer(P,0,u.data);const W=n.createCommandEncoder(),se=tt*2,ye=W.beginRenderPass({colorAttachments:[{view:Re(),resolveTarget:l.getCurrentTexture().createView(),clearValue:{r:0,g:0,b:0,a:0},loadOp:"clear",storeOp:"discard"}],...d?{timestampWrites:{querySet:d,beginningOfPassWriteIndex:se,endOfPassWriteIndex:se+1}}:{}});ye.setBindGroup(0,we),p.showField&&(ye.setPipeline(ge),ye.draw(3)),ye.setPipeline(z),ye.draw(4,p.count),ye.end();const ce=Math.min($,tt);$=0;let ve;if(d&&g&&(W.resolveQuerySet(d,0,x,g,0),ve=L.find(xe=>!U.has(xe)),ve&&W.copyBufferToBuffer(g,0,ve,0,x*8)),n.queue.submit([W.finish()]),ve){const xe=ve;U.add(xe),xe.mapAsync(GPUMapMode.READ).then(()=>{const ke=new BigUint64Array(xe.getMappedRange().slice(0));xe.unmap(),U.delete(xe);let Fe=0;for(let ue=0;ue<ce;ue++)Fe+=Number(ke[ue*2+1]-ke[ue*2]);const Pe=Number(ke[se+1]-ke[se]);if(Fe>=0&&Pe>=0&&Fe<1e9&&Pe<1e9){const ue=(Q,de)=>Q===null?de:Q+(de-Q)*.08;ce>0&&(_=ue(_,Fe/1e6)),re=ue(re,Pe/1e6)}},()=>U.delete(xe))}},resize:(p,W,se)=>{t.width=Math.max(1,Math.round(p*se)),t.height=Math.max(1,Math.round(W*se)),t.style.width=`${p}px`,t.style.height=`${W}px`},exportState:async()=>{const p=n.createBuffer({size:M,usage:m.MAP_READ|m.COPY_DST}),W=n.createCommandEncoder();W.copyBufferToBuffer(S,0,p,0,M),n.queue.submit([W.finish()]),await p.mapAsync(GPUMapMode.READ);const se=new Float32Array(p.getMappedRange().slice(0));return p.unmap(),p.destroy(),se},timings:()=>({gpuSimMs:_,gpuDrawMs:re,noiseMs:0}),destroy:()=>{l.unconfigure(),n.destroy()}}}function vn(t,e){if(t.mode!=="viewport"||!t.breakpoints?.length)return-1;let r=-1;return t.breakpoints.forEach((s,n)=>{e<=s.maxWidth&&(r<0||s.maxWidth<t.breakpoints[r].maxWidth)&&(r=n)}),r}function Mn(t,e,{vw:r,vh:s}){if(t.mode==="viewport"){let{x:c,y:f,height:h}=t,a=t.rotation??0;const u=vn(t,r);if(u>=0){const m=t.breakpoints[u];c=m.x??c,f=m.y??f,h=m.height??h,a=m.rotation??a}return{cx:c*r,cy:f*s,height:h*s,rot:a*Math.PI/180}}const n=typeof document<"u"?document.querySelector(t.selector):null;if(!n)return null;const o=n.getBoundingClientRect(),l=t.fit==="cover"?Math.max(o.height,o.width/e):Math.min(o.height,o.width/e);return{cx:o.left+(t.x??.5)*o.width,cy:o.top+(t.y??.5)*o.height,height:l*(t.scale??1),rot:(t.rotation??0)*Math.PI/180}}function bn(t,e,r,s,n,o){const l=Mn(e.placement,r.aspect,n),c=e.overflow==="repeat",f=l??(o?{cx:o.cx,cy:o.cy,height:o.scale,rot:Math.atan2(o.sin,o.cos)}:{cx:n.vw/2,cy:-n.vh,height:n.vh*.3,rot:0});return{index:t,cx:f.cx,cy:f.cy,scale:f.height,cos:Math.cos(f.rot),sin:Math.sin(f.rot),offset:r.offset,dots:r.count,ink:c&&s>r.count&&r.count>0?r.count/s:1,repeat:c,drift:e.drift??1}}const Ve=1e3/60,at=4,lt=40,We=new Map;function kn(t,e){const r=JSON.stringify([e,t.source]);let s=We.get(r);return s||(s=Sn(t,e),We.set(r,s),s.then(n=>{n||We.delete(r)}),We.size>64&&We.delete(We.keys().next().value)),s}async function Sn(t,e){const r=new URL(t.source.src,e).href;try{if(t.source.type==="dots"){const s=await fetch(r);if(!s.ok)throw new Error(`${s.status} ${r}`);return Vt(await s.arrayBuffer())}return await en(r,t.source.dotter)}catch(s){return console.warn(`[particulator] scene "${t.id}" failed to load:`,s),null}}function Pn(t){let e=sn(t.effect);const r=t.baseUrl??(typeof document<"u"?document.baseURI:"http://localhost/"),s=t.container??document.body;let n=o();function o(){const d=document.createElement("canvas");return d.setAttribute("aria-hidden","true"),d.dataset.particulator="",d.style.cssText=`position:fixed;inset:0;pointer-events:none;z-index:${e.stage.zIndex}`,t.className&&(d.className=t.className),d}s.appendChild(n);let l=null,c=[],f=[],h=new Float32Array(0),a=kt(e.timeline.driver),u=[],m=[],A=!1,P=0,M=!1,S=0,B={from:0,to:0,t:0},O=null,D=0,E=0,j=0,V=0,v=0,X=0,i=null,k=null,H=!1,N={x:0,y:0};const ee=d=>{i||(H=!0),i={x:d.clientX,y:d.clientY}},pe=()=>{i=null};let ie=!1,he=0;const q=d=>d.composedPath().some(g=>g instanceof Element&&g.hasAttribute("data-particulator-ignore")),J=d=>{q(d)||(ie=!0,(d.pointerType!=="mouse"||!i)&&(H=!0),i={x:d.clientX,y:d.clientY})},Z=d=>{ie=!1,d.pointerType!=="mouse"&&(i=null)},T=d=>{d.pointerType!=="mouse"&&ie&&(i={x:d.clientX,y:d.clientY})},C=()=>l?.resize(window.innerWidth,window.innerHeight,window.devicePixelRatio||1);window.addEventListener("mousemove",ee),window.addEventListener("pointerdown",J),window.addEventListener("pointerup",Z),window.addEventListener("pointercancel",Z),window.addEventListener("pointermove",T),document.addEventListener("mouseleave",pe),window.addEventListener("resize",C);const te=typeof matchMedia<"u"?matchMedia("(prefers-color-scheme: dark)"):null,fe=()=>{const d=e.look.ink;if(typeof d=="string")return Mt(d);const g=e.look.theme,L=g.startsWith("class:")?document.documentElement.classList.contains(g.slice(6)):g==="media"?!!te?.matches:!1;return Mt(L?d.dark:d.light)},ae=(d,g)=>d===0?g:d+(g-d)*.08,z={frameMs:0,steps:0,step:0,render:0,noise:0};async function ge(){c=(await Promise.all(e.scenes.map(L=>kn(L,r)))).map(L=>L?ln(L):{aspect:1,count:0,data:new Float32Array(0)}),f=[];let g=0;for(const L of c)f.push(g),g+=L.count;h=new Float32Array(g*4),c.forEach((L,U)=>h.set(L.data,f[U]*4)),u=[]}const R=()=>({vw:window.innerWidth,vh:window.innerHeight});function I(){const d=R(),g=e.particles.count;u=e.scenes.map((L,U)=>bn(U,L,{aspect:c[U]?.aspect??1,count:c[U]?.count??0,offset:f[U]??0},g,d,u[U]))}function K(){const{vw:d,vh:g}=R(),L=e.particles.count;return e.motion.entrance==="none"&&u[0]?cn(L,u[0],h,d,g):Ot(L,d,g)}async function le(d,g){const L=e.particles.count,U=o();let $;try{$=d==="webgpu"?await wn(U,L):un(U,L)}catch(re){if(d==="webgpu")return console.warn("[particulator] WebGPU unavailable, falling back to Canvas 2D:",re),le("canvas2d",g);throw re}if(A){$.destroy();return}$.resize(window.innerWidth,window.innerHeight,window.devicePixelRatio||1),$.setClouds(c,h),$.setField(e.field),I(),$.setState(fn(g,K()));const _=l;l=$,n.replaceWith(U),n=U,_?.destroy()}function F(d){if(d!=="auto")return d;if(ut())return"webgpu";const g=t.canvas2dMaxCount??3e4;return e.particles.count>g&&(e=rt(e,{particles:{count:g}})),"canvas2d"}function y(d){if(P=requestAnimationFrame(y),!l||A)return;const g=X?Math.min(d-X,250):Ve;z.frameMs=ae(z.frameMs,g),X=d,v+=g;const L=e.scenes.length,U=a.state(d,L),$=O!==null&&O<L?{from:O,to:O,t:0}:U;B=$,I();const _=u[$.from],re=u[$.to];if(!_||!re)return;const{vw:ne,vh:Re}=R(),Me=$.t*$.t*(3-2*$.t),me=_.drift+(re.drift-_.drift)*$.t,be=e.interaction.mouse,p=Q=>{const de=m[Q.index];return de?{x:Q.cx-de.x,y:Q.cy-de.y}:{x:0,y:0}},W={x:0,y:0};let se=0;const ye=performance.now();let ce=0;const ve=Math.min(at,Math.floor(v/Ve)),xe=i&&k&&!H?k:i;ve>0&&(H=!1);let ke=xe;for(;v>=Ve&&se<at;){let Q=null;if(i&&xe&&ke){const Ae=(se+1)/ve;Q={x:xe.x+(i.x-xe.x)*Ae,y:xe.y+(i.y-xe.y)*Ae},N.x+=(Q.x-ke.x-N.x)*.5,N.y+=(Q.y-ke.y-N.y)*.5;const Oe=Math.hypot(N.x,N.y);Oe>lt&&(N.x*=lt/Oe,N.y*=lt/Oe)}else N.x*=.5,N.y*=.5;D+=.016,he+=((ie?1:0)-he)*.08;const de=he<.001||!i||be.mode==="off"?0:he,Te=be.press??{radius:1,strength:1,drag:1,swirl:!1,noise:0,crowd:!1},Ue=Te.crowd?de:0;E+=e.field.drift,j+=e.field.drift*.37,e.field.live&&(V+=e.field.liveSpeed),l.step({vw:ne,vh:Re,count:e.particles.count,time:D,A:_,B:re,t:$.t,eased:Me,drift:me,lead:$.lead??.1,shiftA:se===0?p(_):W,shiftB:se===0?p(re):W,steer:e.motion.preset==="steer",mouse:Q,mousePrev:ke,mouseVel:{...N},mouseDrag:be.mode==="off"?0:(be.drag??0)*(1+((Te.drag??1)-1)*de),mouseSign:be.mode==="repel"?1:be.mode==="attract"?-1:0,mouseRadius:be.radius*(1+(Te.radius-1)*de),mouseStrength:be.strength*(1+(Te.strength-1)*de),mouseNoise:Te.swirl?Te.noise*de:0,mouseFalloff:be.falloff??2,mouseCrowd:Ue,crowdFlight:e.motion.crowd.flight,texOffX:E,texOffY:j,texZ:V,liveNoise:e.field.live,steerParams:e.motion.steer,field:e.field,walls:e.motion.walls,crowd:{...e.motion.crowd,grid:e.motion.crowd.flight||Ue>0}}),ke=Q,ce+=l.timings().noiseMs,v-=Ve,se===0&&(m=u.map(Ae=>({x:Ae.cx,y:Ae.cy}))),se++}se>0&&(k=i),se===at&&(v=0);const Fe=performance.now(),Pe=e.look;l.render({vw:ne,vh:Re,dpr:window.devicePixelRatio||1,count:e.particles.count,alpha:Math.min(1,v/Ve),ink:fe(),size:Pe.size,streak:Pe.streak,streakTaper:Pe.streakTaper,streakFade:Pe.streakFade,restStreak:e.motion.preset==="steer"?Pe.restStreak:1,showField:M,texOffX:E,texOffY:j,texelPx:e.field.texelPx});const ue=performance.now();z.steps=ae(z.steps,se),z.step=ae(z.step,Fe-ye-ce),z.noise=ae(z.noise,ce),z.render=ae(z.render,ue-Fe)}const G=(async()=>{await ge(),I(),await le(F(t.engine??"auto"),null),a.setProgress?.(S),P=requestAnimationFrame(y)})(),we=d=>typeof d=="number"?d:e.scenes.findIndex(g=>g.id===d),b=(d,g)=>JSON.stringify(d)===JSON.stringify(g);return{get canvas(){return n},get effect(){return e},ready:G,get progress(){return S},set progress(d){S=d,a.setProgress?.(d)},goTo:(d,g)=>{const L=we(d);if(!(L<0)){if(!a.goTo){console.warn("[particulator] goTo() needs the api timeline driver");return}a.goTo(L,g?.duration??2e3,performance.now())}},update:async d=>{await G;const g=e;e=rt(e,d),b(g.timeline,e.timeline)||(a=kt(e.timeline.driver),a.setProgress?.(S)),n&&g.stage.zIndex!==e.stage.zIndex&&(n.style.zIndex=String(e.stage.zIndex)),["size","features","octaves","lacunarity","gain","ridged","sharpness","seed"].some(U=>g.field[U]!==e.field[U])&&l?.setField(e.field),b(g.scenes.map(U=>U.source),e.scenes.map(U=>U.source))||(await ge(),l?.setClouds(c,h)),g.particles.count!==e.particles.count&&l&&await le(l.kind,await l.exportState())},setEngine:async d=>{await G,!(!l||l.kind===d)&&await le(d,await l.exportState())},get showField(){return M},set showField(d){M=d},stats:()=>{const d=l?.timings();return{engine:l?.kind??"canvas2d",device:l?.device??"starting…",count:e.particles.count,fps:z.frameMs>0?1e3/z.frameMs:0,frameMs:z.frameMs,stepsPerFrame:z.steps,cpuStepMs:z.step,cpuRenderMs:z.render,cpuNoiseMs:z.noise,gpuSimMs:d?.gpuSimMs??null,gpuDrawMs:d?.gpuDrawMs??null}},scenes:()=>e.scenes.map((d,g)=>{const L=u[g],U=c[g]?.aspect??1,$=L?.scale??0;return{id:d.id,index:g,cx:L?.cx??0,cy:L?.cy??0,width:$*U,height:$,rotation:L?Math.atan2(L.sin,L.cos):0,aspect:U,dots:c[g]?.count??0,element:d.placement.mode==="element"?document.querySelector(d.placement.selector):null}}),transition:()=>B,get preview(){return O},set preview(d){O=d},destroy:()=>{A=!0,cancelAnimationFrame(P),l?.destroy(),l=null,n.remove(),window.removeEventListener("mousemove",ee),window.removeEventListener("pointerdown",J),window.removeEventListener("pointerup",Z),window.removeEventListener("pointercancel",Z),window.removeEventListener("pointermove",T),document.removeEventListener("mouseleave",pe),window.removeEventListener("resize",C)}}}const An=1,Rn=[{id:"sphere",source:{type:"image",src:"img/sphere.png",dotter:{count:3e4,seed:3}},placement:{mode:"element",selector:'[data-particulator="sphere"]',fit:"contain",x:.4994,y:.4969,scale:1}},{id:"glyph",source:{type:"image",src:"img/glyph.png",dotter:{count:3e4,seed:3}},placement:{mode:"element",selector:'[data-particulator="glyph"]',fit:"contain"}},{id:"star",source:{type:"image",src:"img/star.png",dotter:{count:3e4,seed:3}},placement:{mode:"element",selector:'[data-particulator="star"]',fit:"contain"}}],Fn={driver:{type:"scroll",sections:"section",mode:"snap"}},On={steer:{attract:.205,stagger:.55},crowd:{flight:!0}},En={ink:{light:"#1a1a1a",dark:"#f5f1e8"},theme:"class:dark"},Tn={mouse:{drag:.05,press:{crowd:!0}}},zn={zIndex:1},Ln={version:An,scenes:Rn,timeline:Fn,motion:On,look:En,interaction:Tn,stage:zn},Bn=Ln,pt=new URLSearchParams(location.search),Ie=Pn({effect:Bn,baseUrl:new URL("/particulator/",location.origin).href,engine:pt.get("engine")??"auto"});window.stage=Ie;const zt=pt.get("studio")!=="0";zt&&Dt(async()=>{const{mountStudio:t,fileSystemAccess:e,download:r}=await import("./index-SYwoK6JG.js");return{mountStudio:t,fileSystemAccess:e,download:r}},[]).then(({mountStudio:t,fileSystemAccess:e,download:r})=>t(Ie,{hidden:pt.get("studio")==="hidden",storage:"showSaveFilePicker"in window?e():r()})).then(t=>{window.studio=t});const At=document.getElementById("hud");if(zt)At.remove();else{const t=r=>r===null?"n/a":`${r.toFixed(2)}ms`,e=()=>{const r=Ie.stats();At.innerHTML=`${r.device} · ${r.count.toLocaleString()} · ${r.fps.toFixed(0)} fps · cpu ${t(r.cpuStepMs+r.cpuRenderMs)} · gpu ${t(r.gpuSimMs!==null&&r.gpuDrawMs!==null?r.gpuSimMs+r.gpuDrawMs:null)} `+(ut()?`<button id="swap">switch to ${r.engine==="webgpu"?"Canvas 2D":"WebGPU"}</button>`:""),document.getElementById("swap")?.addEventListener("click",()=>{Ie.setEngine(r.engine==="webgpu"?"canvas2d":"webgpu")})};Ie.ready.then(()=>{e(),setInterval(e,500)})}addEventListener("keydown",t=>{t.target instanceof HTMLInputElement||(t.key==="f"&&(Ie.showField=!Ie.showField),t.key==="d"&&document.body.classList.toggle("debug"),t.key==="t"&&document.documentElement.classList.toggle("dark"))});export{It as D,vn as a,sn as r,Cn as s};
