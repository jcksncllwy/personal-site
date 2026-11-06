(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function s(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(n){if(n.ep)return;n.ep=!0;const i=s(n);fetch(n.href,i)}})();const St="modulepreload",Pt=function(t,e){return new URL(t,e).href},it={},At=function(e,s,r){let n=Promise.resolve();if(s&&s.length>0){let w=function(a){return Promise.all(a.map(u=>Promise.resolve(u).then(h=>({status:"fulfilled",value:h}),h=>({status:"rejected",reason:h}))))};const o=document.getElementsByTagName("link"),c=document.querySelector("meta[property=csp-nonce]"),d=c?.nonce||c?.getAttribute("nonce");n=w(s.map(a=>{if(a=Pt(a,r),a in it)return;it[a]=!0;const u=a.endsWith(".css"),h=u?'[rel="stylesheet"]':"";if(r)for(let P=o.length-1;P>=0;P--){const v=o[P];if(v.href===a&&(!u||v.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${a}"]${h}`))return;const S=document.createElement("link");if(S.rel=u?"stylesheet":St,u||(S.as="script"),S.crossOrigin="",S.href=a,d&&S.setAttribute("nonce",d),document.head.appendChild(S),u)return new Promise((P,v)=>{S.addEventListener("load",P),S.addEventListener("error",()=>v(new Error(`Unable to preload CSS for ${a}`)))})}))}function i(o){const c=new Event("vite:preloadError",{cancelable:!0});if(c.payload=o,window.dispatchEvent(c),!c.defaultPrevented)throw o}return n.then(o=>{for(const c of o||[])c.status==="rejected"&&i(c.reason);return e().catch(i)})},Rt={count:3e4,seed:1,invert:!1,gamma:1,contrast:1,threshold:.02,edges:0,alpha:"mask",sizeMin:.4,sizeMax:1.2,sizeBy:"density",opacityBy:"density",opacityMin:.35,colors:!1,maxResolution:1024};function Ot(t,e,s,r){const n={...Rt,...Lt(e)},i=Math.max(0,Math.floor(n.count)),o=It(t,Math.max(1,Math.floor(n.maxResolution))),{width:c,height:d}=o,w=Ct(o,n);let a=0,u=c,h=d,S=-1,P=-1;for(let g=0,l=0;g<d;g++)for(let p=0;p<c;p++,l++){const m=w[l];m>0&&(m>a&&(a=m),p<u&&(u=p),p>S&&(S=p),g<h&&(h=g),g>P&&(P=g))}const v=s/c,A=r/d,U=new Float32Array(i*4),O=n.colors?new Uint8Array(i*3):void 0;if(i===0||a<=0)return lt(s,r,0,U,O);const T=Math.max(0,u-.5),I=Math.max(0,h-.5),N=Math.min(c,S+1.5),j=Math.min(d,P+1.5),k=Math.max(N-T,j-I),f=T-(k-(N-T))/2,x=I-(k-(j-I))/2;let X=0;for(let g=h;g<=P;g++)for(let l=u;l<=S;l++)X+=w[g*c+l];const V=X/a/(k*k),Z=i/Math.max(V,1e-9),oe=i*512+1e6,ee=n.seed>>>0,te=ot(ee,1374496523),R=ot(ee,739982445),z=Xe(ee^2246822507),J=Math.min(Math.ceil(Z*4)+4096,oe),W=new Float32Array(i),B=new Float32Array(i);let E=0;for(let g=1;g<=J&&E<i;g++){const l=f+at(te+g*zt)*k,p=x+at(R+g*Bt)*k;if(l<0||p<0||l>=c||p>=d)continue;const m=He(w,c,d,l,p);m<=0||Xe((g^z)>>>0)*23283064365386963e-26*a>=m||(W[E]=l,B[E]=p,E++)}E>1&&Et(W,B,E,w,c,d,Math.sqrt(X/E));const de=(v+A)/2,F=n.sizeMax-n.sizeMin,M=1-n.opacityMin,Y=1/a,H=o.data;for(let g=0;g<E;g++){const l=W[g],p=B[g],m=Math.min(1,He(w,c,d,l,p)*Y),L=g*4;if(U[L]=l*v,U[L+1]=p*A,U[L+2]=(n.sizeBy==="density"?n.sizeMin+F*m:n.sizeMax)*de,U[L+3]=n.opacityBy==="density"?n.opacityMin+M*m:1,O){const C=((p|0)*c+(l|0))*4,Q=g*3;O[Q]=H[C],O[Q+1]=H[C+1],O[Q+2]=H[C+2]}}return lt(s,r,E,U,O)}const Ft=3,qe=1.5,Tt=.25;function Et(t,e,s,r,n,i,o){const c=new Float32Array(s);let d=1/0;for(let j=0;j<s;j++){const k=He(r,n,i,t[j],e[j]);c[j]=k>0?o/Math.sqrt(k):o*8,c[j]<d&&(d=c[j])}const w=Math.max(d*qe/2,Math.max(n,i)/1024),a=1/w,u=Math.max(1,Math.ceil(n/w)),h=Math.max(1,Math.ceil(i/w)),S=new Int32Array(u*h+1),P=new Int32Array(s),v=new Int32Array(s),A=new Float32Array(s),U=new Float32Array(s),O=new Float32Array(s),T=new Float32Array(s),I=new Float32Array(s),N=qe*qe;for(let j=0;j<Ft;j++){S.fill(0);for(let k=0;k<s;k++){const f=(e[k]*a|0)*u+(t[k]*a|0);P[k]=f,S[f+1]++}for(let k=0;k<u*h;k++)S[k+1]+=S[k];for(let k=0;k<s;k++){const f=S[P[k]]++;v[f]=k,A[f]=t[k],U[f]=e[k],O[f]=c[k]}for(let k=u*h;k>0;k--)S[k]=S[k-1];S[0]=0;for(let k=0;k<s;k++){const f=A[k],x=U[k],X=O[k],V=X*qe,Z=V*V;let oe=0,ee=0;const te=Math.max(0,(x-V)*a|0),R=Math.min(h-1,(x+V)*a|0),z=Math.max(0,(f-V)*a|0),J=Math.min(u-1,(f+V)*a|0);for(let F=te;F<=R;F++){const M=S[F*u+J+1];for(let Y=S[F*u+z];Y<M;Y++){const H=f-A[Y],g=x-U[Y],l=H*H+g*g;if(l>=Z||Y===k)continue;const p=X<O[Y]?X:O[Y];if(l>=p*p*N)continue;if(l<1e-12){oe+=k<Y?.5:-.5;continue}const m=Math.sqrt(l),L=1-m/(p*qe),C=L*L/m;oe+=H*C,ee+=g*C}}const W=Math.sqrt(oe*oe+ee*ee),B=Tt*X,E=W>1?B/W:B,de=v[k];T[de]=oe*E,I[de]=ee*E}for(let k=0;k<s;k++){let f=t[k]+T[k],x=e[k]+I[k];f<0?f=0:f>=n&&(f=n-.001),x<0?x=0:x>=i&&(x=i-.001),He(r,n,i,f,x)>0&&(t[k]=f,e[k]=x)}}}const Qe=1.324717957244746,zt=1/Qe,Bt=1/(Qe*Qe);function at(t){return t-Math.floor(t)}function Xe(t){return t=t>>>0,t^=t>>>16,t=Math.imul(t,2146121005),t^=t>>>15,t=Math.imul(t,2221713035),t^=t>>>16,t>>>0}function ot(t,e){return Xe(Xe(t)^e)/4294967296}function lt(t,e,s,r,n){const i=s*4===r.length,o={width:t,height:e,count:s,data:i?r:r.slice(0,s*4)};return n&&(o.colors=i?n:n.slice(0,s*3)),o}function Lt(t){const e={};for(const[s,r]of Object.entries(t))r!==void 0&&(e[s]=r);return e}function He(t,e,s,r,n){let i=r-.5,o=n-.5;i<0?i=0:i>e-1&&(i=e-1),o<0?o=0:o>s-1&&(o=s-1);const c=i|0,d=o|0,w=c+1<e?c+1:c,a=d+1<s?d+1:d,u=i-c,h=o-d,S=d*e,P=a*e,v=t[S+c]+(t[S+w]-t[S+c])*u,A=t[P+c]+(t[P+w]-t[P+c])*u;return v+(A-v)*h}function It(t,e){const{width:s,height:r,data:n}=t,i=Math.max(s,r)/e;if(i<=1)return t;const o=Math.max(1,Math.round(s/i)),c=Math.max(1,Math.round(r/i)),d=new Uint8ClampedArray(o*c*4),w=new Int32Array(o),a=new Int32Array(o);for(let h=0;h<o;h++)w[h]=Math.floor(h*s/o),a[h]=Math.max(w[h]+1,Math.floor((h+1)*s/o));const u=new Float64Array(o*4);for(let h=0;h<c;h++){const S=Math.floor(h*r/c),P=Math.max(S+1,Math.floor((h+1)*r/c));u.fill(0);for(let A=S;A<P;A++){const U=A*s*4;for(let O=0;O<o;O++){let T=0,I=0,N=0,j=0;for(let f=w[O],x=U+f*4;f<a[O];f++,x+=4)T+=n[x],I+=n[x+1],N+=n[x+2],j+=n[x+3];const k=O*4;u[k]+=T,u[k+1]+=I,u[k+2]+=N,u[k+3]+=j}}const v=P-S;for(let A=0;A<o;A++){const U=1/(v*(a[A]-w[A])),O=A*4,T=(h*o+A)*4;d[T]=u[O]*U+.5,d[T+1]=u[O+1]*U+.5,d[T+2]=u[O+2]*U+.5,d[T+3]=u[O+3]*U+.5}}return{width:o,height:c,data:d}}function Ct(t,e){const{width:s,height:r,data:n}=t,i=s*r,o=new Float32Array(i);for(let P=0,v=0;P<i;P++,v+=4)o[P]=(.2126*n[v]+.7152*n[v+1]+.0722*n[v+2])/255;let c=null;const d=ct(e.edges);d>0&&(c=Dt(o,s,r));const w=new Float32Array(i),{contrast:a,gamma:u,threshold:h}=e,S=e.alpha==="mask";for(let P=0;P<i;P++){let v=e.invert?o[P]:1-o[P];a!==1&&(v=ct((v-.5)*a+.5)),u!==1&&v>0&&(v=Math.pow(v,u)),c&&(v=v*(1-d)+c[P]*d),S&&(v*=n[P*4+3]/255),w[P]=v<h||v<=0?0:v}return w}function Dt(t,e,s){const r=new Float32Array(e*s);let n=0;for(let i=0;i<s;i++){const o=i>0?i-1:0,c=i<s-1?i+1:i;for(let d=0;d<e;d++){const w=d>0?d-1:0,a=d<e-1?d+1:d,u=t[o*e+w],h=t[o*e+d],S=t[o*e+a],P=t[i*e+w],v=t[i*e+a],A=t[c*e+w],U=t[c*e+d],O=t[c*e+a],T=S+2*v+O-u-2*P-A,I=A+2*U+O-u-2*h-S,N=Math.sqrt(T*T+I*I);r[i*e+d]=N,N>n&&(n=N)}}if(n>0)for(let i=0;i<r.length;i++)r[i]/=n;return r}function ct(t){return t<0?0:t>1?1:t}function Ut(t){const e=new DataView(t);if(t.byteLength<8)throw new Error("decodeNgaiV1: buffer shorter than header");const s=e.getUint16(0,!0),r=e.getUint16(2,!0),n=e.getUint32(4,!0);if(t.byteLength<8+n*6)throw new Error(`decodeNgaiV1: expected ${8+n*6} bytes, got ${t.byteLength}`);const i=new Float32Array(n*4);for(let o=0,c=8,d=0;o<n;o++,c+=6,d+=4)i[d]=e.getUint16(c,!0)/65535*s,i[d+1]=e.getUint16(c+2,!0)/65535*r,i[d+2]=e.getUint8(c+4)/255*2,i[d+3]=e.getUint8(c+5)/255;return{width:s,height:r,count:n,data:i}}async function qt(t,e=1024){const s=typeof t=="string"?await Gt(t):t,r=await Nt(s);try{const n=r.width,i=r.height;if(!n||!i)throw new Error("dotter: image has no intrinsic size");const o=Math.min(1,e/Math.max(n,i)),c=Math.max(1,Math.round(n*o)),d=Math.max(1,Math.round(i*o)),w=_t(c,d);w.imageSmoothingEnabled=!0,w.imageSmoothingQuality="high",w.clearRect(0,0,c,d),w.drawImage(r.image,0,0,c,d);const{data:a}=w.getImageData(0,0,c,d);return{pixels:{width:c,height:d,data:a},sourceWidth:n,sourceHeight:i}}finally{r.close()}}async function Wt(t,e={}){const s=await qt(t,e.maxResolution??1024);return Ot(s.pixels,e,s.sourceWidth,s.sourceHeight)}async function Gt(t){const e=await fetch(t);if(!e.ok)throw new Error(`dotter: fetch ${t} failed (${e.status})`);return e.blob()}async function Nt(t){try{const e=await createImageBitmap(t,{premultiplyAlpha:"none"});return{image:e,width:e.width,height:e.height,close:()=>e.close()}}catch(e){if(typeof Image>"u"||typeof URL.createObjectURL!="function")throw e;const s=URL.createObjectURL(t);try{const r=new Image;r.decoding="async",r.src=s,await r.decode();const n=r.naturalWidth||r.width,i=r.naturalHeight||r.height;return{image:r,width:n,height:i,close:()=>URL.revokeObjectURL(s)}}catch(r){throw URL.revokeObjectURL(s),r}}}function _t(t,e){const r=(typeof OffscreenCanvas<"u"?new OffscreenCanvas(t,e):Object.assign(document.createElement("canvas"),{width:t,height:e})).getContext("2d",{willReadFrequently:!0});if(!r)throw new Error("dotter: 2D canvas context unavailable");return r}async function $t(t,e={}){const s=Yt();if(s)try{return await s.run(typeof t=="string"?jt(t):t,e)}catch{}return Wt(t,e)}function jt(t){const e=globalThis,s=e.document?.baseURI??e.location?.href;try{return s?new URL(t,s).href:t}catch{return t}}let ze;function Yt(){if(ze!==void 0)return ze;if(ze=null,typeof Worker>"u")return null;let t;try{t=new Worker(new URL(""+new URL("worker-Ld_UPjcu.js",import.meta.url).href,import.meta.url),{type:"module"})}catch{return null}const e=new Map;let s=1;const r=n=>{ze=null,t.terminate();for(const i of e.values())i.reject(new Error(n));e.clear()};return t.addEventListener("message",n=>{const i=e.get(n.data.id);i&&(e.delete(n.data.id),n.data.cloud?i.resolve(n.data.cloud):i.reject(new Error(n.data.error??"dotter worker: unknown error")))}),t.addEventListener("error",n=>{n.preventDefault(),r(`dotter worker failed: ${n.message||"load error"}`)}),t.addEventListener("messageerror",()=>r("dotter worker: message error")),ze={run(n,i){return new Promise((o,c)=>{const d=s++;e.set(d,{resolve:o,reject:c});const w={id:d,url:n,opts:i};t.postMessage(w)})}},ze}const yt={version:1,particles:{count:3e4},timeline:{driver:{type:"api"}},motion:{preset:"steer",entrance:"drop",steer:{attract:.2,arriveK:.05,settleRadius:40,damping:1,homing:.07,accel:.15,maxSpeed:14,speedVar:.3,stagger:1,sensorDist:28,sensorAngle:.19,turnGain:.8,maxTurn:.3,alignMin:0,restFollow:.75,restNoise:.25},walls:{enabled:!1,margin:0,stiffness:.08,range:10,strength:.6,cruise:!0,bounce:.3},crowd:{enabled:!1,strength:4,distance:15,cellPx:6,blur:!0}},field:{size:256,texelPx:4,features:5,octaves:3,lacunarity:2,gain:.5,ridged:!0,sharpness:3,seed:7,drift:.15,live:!1,liveSpeed:.004},look:{ink:"#1a1a1a",theme:"none",size:1,streak:1,streakTaper:.7,streakFade:.3,restStreak:0},interaction:{mouse:{mode:"repel",radius:70,strength:.15}},stage:{zIndex:0}},$e=t=>typeof t=="object"&&t!==null&&!Array.isArray(t);function Ve(t,e){if(!$e(t)||!$e(e))return e===void 0?t:e;const s={...t};for(const[r,n]of Object.entries(e)){if(n===void 0)continue;const i=t[r];s[r]=$e(i)&&$e(n)&&!("type"in n&&i.type!==n.type)?Ve(i,n):n}return s}function Sn(t){const e=(i,o)=>{if(JSON.stringify(i)!==JSON.stringify(o)){if(i&&o&&typeof i=="object"&&typeof o=="object"&&!Array.isArray(i)&&!Array.isArray(o)){const c=i.type,d=o.type;if(c!==void 0&&c!==d)return i;const w={};for(const a of Object.keys(i)){const u=e(i[a],o[a]);u!==void 0&&(w[a]=u)}return Object.keys(w).length?w:void 0}return i}},{version:s,scenes:r,...n}=t;return{version:s,scenes:r,...e(n,yt)??{}}}function Xt(t){return Ve(yt,t)}function ft(t){let e=t.trim().replace(/^#/,"");e.length===3&&(e=e.split("").map(r=>r+r).join(""));const s=parseInt(e.slice(0,6),16);return Number.isNaN(s)?{r:0,g:0,b:0}:{r:s>>16&255,g:s>>8&255,b:s&255}}const We=(t,e,s)=>Math.max(e,Math.min(s,t));function dt(t,e){const s=Math.max(0,e-1),r=We(t,0,s),n=Math.min(Math.floor(r),s);return{from:n,to:Math.min(n+1,s),t:r-n}}function ut(t){switch(t.type){case"api":{let e={from:0,to:0,t:0},s=0,r=null;return{state:(n,i)=>{if(s!==null)return dt(s,i);if(r){const c=r.dur<=0?1:We((n-r.start)/r.dur,0,1);e={...e,t:c},c>=1&&(r=null,e={from:e.to,to:e.to,t:0})}const o=Math.max(0,i-1);return{from:Math.min(e.from,o),to:Math.min(e.to,o),t:e.t}},setProgress:n=>{r=null,s=n},goTo:(n,i,o)=>{const c=s!==null?Math.round(s):e.t>=.5?e.to:e.from;s=null,e={from:c,to:n,t:0},r={start:o,dur:i}}}}case"time":{const e=performance.now();return{state:(s,r)=>{if(r<2)return{from:0,to:0,t:0};const n=(t.hold+t.transition)*1e3,i=t.hold/(t.hold+t.transition),o=Math.max(0,s-e)/n,c=Math.floor(o),d=o-c,w=d<i?0:(d-i)/(1-i),a=t.loop??"loop";if(a==="once")return c>=r-1?{from:r-1,to:r-1,t:0}:{from:c,to:c+1,t:w};if(a==="pingpong"){const u=2*(r-1),h=c%u,S=h<r-1?h:u-h,P=h<r-1?h+1:u-h-1;return{from:S,to:P,t:w}}return{from:c%r,to:(c+1)%r,t:w}}}}case"scroll":{const e=o=>{const c=Array.from(document.querySelectorAll(t.sections)).slice(0,o);if(c.length<2)return 0;const d=c.map(u=>u.getBoundingClientRect());let w=t.axis??"auto";w==="auto"&&(w=Math.abs(d[1].left-d[0].left)>Math.abs(d[1].top-d[0].top)?"x":"y");const a=d.map(u=>w==="x"?u.left:u.top);if(a[0]>=0)return 0;for(let u=0;u<a.length-1;u++)if(a[u]<=0&&a[u+1]>0)return u-a[u]/(a[u+1]-a[u]);return c.length-1};if(t.mode!=="snap")return{state:(o,c)=>dt(e(c),c)};const s=We(t.threshold??.5,0,1),r=Math.max(0,t.duration??1.5)*1e3;let n=null,i=0;return{state:(o,c)=>{const d=e(c),w=We(d-Math.floor(d)>=s?Math.ceil(d):Math.floor(d),0,Math.max(0,c-1));if(n||(n={from:w,to:w,t:0}),w!==n.to&&(n={from:n.t>=.5?n.to:n.from,to:w,t:0},i=o),n.from!==n.to){const a=r<=0?1:We((o-i)/r,0,1);n=a>=1?{from:n.to,to:n.to,t:0}:{...n,t:a}}return n}}}}}const we=new Float32Array([1,1,0,-1,1,0,1,-1,0,-1,-1,0,1,0,1,-1,0,1,1,0,-1,-1,0,-1,0,1,1,0,-1,1,0,1,-1,0,-1,-1]);function Ht(t=1){const{perm:e,permMod12:s}=xt(t),r=1/3,n=1/6;return function(o,c,d){const w=(o+c+d)*r,a=Math.floor(o+w),u=Math.floor(c+w),h=Math.floor(d+w),S=(a+u+h)*n,P=o-(a-S),v=c-(u-S),A=d-(h-S);let U,O,T,I,N,j;P>=v?v>=A?(U=1,O=0,T=0,I=1,N=1,j=0):P>=A?(U=1,O=0,T=0,I=1,N=0,j=1):(U=0,O=0,T=1,I=1,N=0,j=1):v<A?(U=0,O=0,T=1,I=0,N=1,j=1):P<A?(U=0,O=1,T=0,I=0,N=1,j=1):(U=0,O=1,T=0,I=1,N=1,j=0);const k=P-U+n,f=v-O+n,x=A-T+n,X=P-I+2*n,V=v-N+2*n,Z=A-j+2*n,oe=P-1+3*n,ee=v-1+3*n,te=A-1+3*n,R=a&255,z=u&255,J=h&255;let W=0,B,E;return B=.6-P*P-v*v-A*A,B>0&&(E=s[R+e[z+e[J]]]*3,B*=B,W+=B*B*(we[E]*P+we[E+1]*v+we[E+2]*A)),B=.6-k*k-f*f-x*x,B>0&&(E=s[R+U+e[z+O+e[J+T]]]*3,B*=B,W+=B*B*(we[E]*k+we[E+1]*f+we[E+2]*x)),B=.6-X*X-V*V-Z*Z,B>0&&(E=s[R+I+e[z+N+e[J+j]]]*3,B*=B,W+=B*B*(we[E]*X+we[E+1]*V+we[E+2]*Z)),B=.6-oe*oe-ee*ee-te*te,B>0&&(E=s[R+1+e[z+1+e[J+1]]]*3,B*=B,W+=B*B*(we[E]*oe+we[E+1]*ee+we[E+2]*te)),32*W}}function xt(t=1){let e=t>>>0;const s=()=>{e=e+1831565813>>>0;let o=e;return o=Math.imul(o^o>>>15,o|1),o^=o+Math.imul(o^o>>>7,o|61),((o^o>>>14)>>>0)/4294967296},r=new Uint8Array(256);for(let o=0;o<256;o++)r[o]=o;for(let o=255;o>0;o--){const c=Math.floor(s()*(o+1));[r[o],r[c]]=[r[c],r[o]]}const n=new Uint8Array(512),i=new Uint8Array(512);for(let o=0;o<512;o++)n[o]=r[o&255],i[o]=n[o]%12;return{perm:n,permMod12:i}}const pt=new Map;function Vt(t=256,e=1,{features:s=5,octaves:r=3,lacunarity:n=2,gain:i=.5,ridged:o=!0,sharpness:c=3}={},d=0,w=new Float32Array(t*t)){let a=pt.get(e);a||(a=Ht(e),pt.set(e,a));const u=a,h=(v,A)=>{let U=0,O=1,T=s/t,I=0;for(let N=0;N<r;N++)U+=u(v*T,A*T,N*17.3+d)*O,I+=O,O*=i,T*=n;return U/I};let S=1/0,P=-1/0;for(let v=0;v<t;v++)for(let A=0;A<t;A++){const U=A/t,O=v/t,T=h(A,v)*(1-U)*(1-O)+h(A-t,v)*U*(1-O)+h(A,v-t)*(1-U)*O+h(A-t,v-t)*U*O,I=o?1-Math.abs(T):T;w[v*t+A]=I,I<S&&(S=I),I>P&&(P=I)}for(let v=0;v<w.length;v++)w[v]=Math.pow((w[v]-S)/(P-S),c);return{data:w,min:S,max:P}}function Ze(t,e=0,s){const r=t.size|0,n=Vt(r,t.seed|0,t,e,s&&s.length===r*r?s:new Float32Array(r*r));return{N:r,data:n.data,min:n.min,max:n.max}}function Kt(t,e,s,r,n,i,o){let c=i/s+r,d=o/s+n;c-=Math.floor(c/e)*e,d-=Math.floor(d/e)*e;const w=Math.min(c|0,e-1),a=Math.min(d|0,e-1),u=c-w,h=d-a,S=(w+1)%e,P=(a+1)%e,v=a*e,A=P*e,U=t[v+w],O=t[v+S],T=t[A+w],I=t[A+S],N=U+(O-U)*u;return N+(T+(I-T)*u-N)*h}const Se=18,b={cx:0,cy:1,lx:2,ly:3,vx:4,vy:5,size:6,opacity:7,speed:8,jitter:9,driftOffX:10,driftOffY:11,driftSpdX:12,driftSpdY:13,driftRadius:14,stagger:15,landed:16,heading:17};function Jt(t){const{width:e,height:s,count:r}=t,n=e/s,i=t.data,o=new Float32Array(r*4);for(let c=0;c<r;c++){const d=c*4;o[d]=(i[d]/e-.5)*n,o[d+1]=i[d+1]/s-.5,o[d+2]=i[d+2]/s,o[d+3]=i[d+3]}return{aspect:n,count:r,data:o}}function Fe(t){let e=t>>>0;return e=Math.imul(e^e>>>16,73244475),e=Math.imul(e^e>>>16,73244475),((e^e>>>16)>>>0)/4294967296}function Ge(t,e,s,r,n,i){if(e.dots===0||t>=e.dots&&!e.repeat){const h=(t*8+(e.index&7))*4;i[0]=Fe(h)*r*1.4-.2*r,i[1]=Fe(h+1)*n*1.4-.2*n,i[2]=.2+.6*Fe(h+2),i[3]=0;return}const o=t%e.dots,c=(e.offset+o)*4,d=s[c]*e.scale,w=s[c+1]*e.scale;let a=e.cx+d*e.cos-w*e.sin,u=e.cy+d*e.sin+w*e.cos;t>=e.dots&&(a+=(Fe(t*2+1540483477)-.5)*3,u+=(Fe(t*2+1+1540483477)-.5)*3),i[0]=a,i[1]=u,i[2]=s[c+2]*e.scale,i[3]=s[c+3]*e.ink}function wt(t,e,s){const r=new Float32Array(t*Se);for(let n=0;n<t;n++){const i=n*Se,o=Math.random(),c=Math.random()*e,d=-50-Math.random()*s*1.5;r[i+b.cx]=c,r[i+b.cy]=d,r[i+b.lx]=c,r[i+b.ly]=d,r[i+b.size]=.2+.6*Math.random(),r[i+b.speed]=.08+.07*o,r[i+b.jitter]=Math.random()*2-1,r[i+b.driftOffX]=Math.random()*Math.PI*2,r[i+b.driftOffY]=Math.random()*Math.PI*2,r[i+b.driftSpdX]=.3+.7*Math.random(),r[i+b.driftSpdY]=.3+.7*Math.random(),r[i+b.driftRadius]=.2+.4*Math.random(),r[i+b.stagger]=.4*Math.random()}return r}function Qt(t,e,s,r,n){const i=wt(t,r,n),o=new Float32Array(4);for(let c=0;c<t;c++){const d=c*Se;Ge(c,e,s,r,n,o),i[d+b.cx]=i[d+b.lx]=o[0],i[d+b.cy]=i[d+b.ly]=o[1],i[d+b.size]=o[2],i[d+b.opacity]=o[3],i[d+b.landed]=1,i[d+b.heading]=e.index}return i}function Zt(t,e){return t&&e.set(t.subarray(0,Math.min(t.length,e.length))),e}const Oe=16,en=32;function tn(t,e){const s=t.getContext("2d");let r=new Float32Array(e*Se),n=new Float32Array(0),i=new Float32Array(0),o=1,c=null,d=null,w=0;const a=new Float32Array(4),u=new Float32Array(4);let h=new Float32Array(1),S=new Float32Array(1),P=new Float32Array(1),v=1,A=1;const U=f=>{c=f;const x=Ze(f);i=x.data,o=x.N,d=null},O=f=>{const x=f.steerParams;if(w=0,f.liveNoise&&c){const F=performance.now();i=Ze(f.field,f.texZ,i).data,d=null,w=performance.now()-F}const X=(F,M)=>Kt(i,o,f.field.texelPx,f.texOffX,f.texOffY,F,M),V=f.mouse,Z=f.mouseRadius,oe=f.mouseStrength*f.mouseSign,ee=Math.cos(x.sensorAngle),te=Math.sin(x.sensorAngle),R=x.sensorDist,z=f.walls,J=f.crowd,W=J.cellPx;if(J.enabled){const F=Math.ceil(f.vw/W)+1,M=Math.ceil(f.vh/W)+1;F!==v||M!==A?(v=F,A=M,h=new Float32Array(F*M),S=new Float32Array(F*M)):S.fill(0)}const B=(F,M)=>h[Math.min(A-1,Math.max(0,M))*v+Math.min(v-1,Math.max(0,F))],E=(F,M)=>{const Y=F/W,H=M/W,g=Math.floor(Y),l=Math.floor(H),p=Y-g,m=H-l,L=B(g,l)+(B(g+1,l)-B(g,l))*p,C=B(g,l+1)+(B(g+1,l+1)-B(g,l+1))*p;return L+(C-L)*m},de=(F,M,Y)=>{const H=F/W,g=M/W,l=Math.floor(H),p=Math.floor(g),m=H-l,L=g-p;for(let C=0;C<4;C++){const Q=C&1,q=C>>1,K=l+Q,$=p+q;K<0||$<0||K>=v||$>=A||(S[$*v+K]+=Y*(Q?m:1-m)*(q?L:1-L))}};for(let F=0;F<f.count;F++){const M=F*Se,Y=Math.sin(f.time*r[M+b.driftSpdX]+r[M+b.driftOffX])*r[M+b.driftRadius]*f.drift,H=Math.cos(f.time*r[M+b.driftSpdY]+r[M+b.driftOffY])*r[M+b.driftRadius]*f.drift;let g=r[M+b.cx],l=r[M+b.cy],p=r[M+b.vx],m=r[M+b.vy];r[M+b.lx]=g,r[M+b.ly]=l;const L=r[M+b.landed]>.5,C=q=>{if(z.enabled){if(q){const K=me=>{const ye=Math.max(0,1-me/Math.max(z.range,1));return z.strength*ye*ye};p+=K(g)-K(f.vw-g),m+=K(l)-K(f.vh-l);const $=z.margin,ce=f.vw-z.margin,ue=f.vh-z.margin,ne=z.stiffness;g<$?p+=($-g)*ne:g>ce&&(p-=(g-ce)*ne),l<$?m+=($-l)*ne:l>ue&&(m-=(l-ue)*ne)}g<0&&(g=0,p=Math.abs(p)*z.bounce),g>f.vw&&(g=f.vw,p=-Math.abs(p)*z.bounce),l<0&&(l=0,m=Math.abs(m)*z.bounce),l>f.vh&&(l=f.vh,m=-Math.abs(m)*z.bounce)}},Q=()=>{if(!V||oe===0)return;const q=g-V.x,K=l-V.y,$=Math.sqrt(q*q+K*K);if($<Z&&$>0){const ce=(1-$/Z)*oe;p+=q/$*ce,m+=K/$*ce}};if(f.steer&&L){Ge(F,f.A,n,f.vw,f.vh,a);let q=Math.min(1,Math.max(0,a[1]/f.vh));f.B.index>=f.A.index&&(q=1-q);const K=.1+.4*x.stagger*(q*.85+r[M+b.stagger]/.4*.15),$=f.t>=K;Ge(F,$?f.B:f.A,n,f.vw,f.vh,a);const ce=$?f.B.index:f.A.index;if(ce!==r[M+b.heading]&&(r[M+b.heading]=ce,r[M+b.landed]=2),r[M+b.landed]<1.5){const D=$?f.shiftB:f.shiftA,G=x.restFollow;g+=D.x*G,l+=D.y*G,r[M+b.lx]+=D.x*G,r[M+b.ly]+=D.y*G}const ue=a[0]+Y,ne=a[1]+H,me=Math.hypot(ue-g,ne-l)||1e-6,ye=z.enabled&&a[3]>0&&(ue<0||ne<0||ue>f.vw||ne>f.vh);ye&&(r[M+b.landed]=2);let xe=ue,ve=ne;if(ye){const D=Math.min(z.margin+.5*z.range,.5*Math.min(f.vw,f.vh));xe=Math.min(f.vw-D,Math.max(D,ue)),ve=Math.min(f.vh-D,Math.max(D,ne))}const Pe=xe-g,Ee=ve-l,be=Math.hypot(Pe,Ee)||1e-6;let Re=0,y=0;if(z.enabled){const D=z.margin,G=f.vw-z.margin,le=f.vh-z.margin;Re=g<D?D-g:g>G?G-g:0,y=l<D?D-l:l>le?le-l:0}const _=Re!==0||y!==0,ae=r[M+b.landed]>1.5,ie=Pe/be,re=Ee/be,pe=x.maxSpeed*(1+x.speedVar*r[M+b.jitter]),ge=ye&&z.cruise?pe:Math.min(pe,be*x.arriveK),Me=ye?1:!ae||me<=x.settleRadius?0:x.settleRadius>0?Math.min(1,(me-x.settleRadius)/x.settleRadius):1;let fe=p+(ie*ge-p)*x.attract,he=m+(re*ge-m)*x.attract;if(Me>0){const D=Math.sqrt(p*p+m*m),G=D>.05?p/D:ie,le=D>.05?m/D:re,ke=G*ie+le*re,Le=G*re-le*ie;let Ae=Math.max(-x.homing,Math.min(x.homing,Math.atan2(Le,ke)));const Ie=Math.min(1,Math.max(0,(ke-x.alignMin)/(1-x.alignMin)));if(Ie>0){const Ne=X(g+(G*ee-le*te)*R,l+(G*te+le*ee)*R),_e=X(g+(G*ee+le*te)*R,l+(-G*te+le*ee)*R);Ae+=Math.max(-x.maxTurn,Math.min(x.maxTurn,(Ne-_e)*x.turnGain))*Ie}const Ce=Math.cos(Ae),De=Math.sin(Ae);let Ue=G*Ce-le*De,Ke=G*De+le*Ce;if(_){const Ne=Math.hypot(Re,y),_e=Re/Ne,st=y/Ne,Je=Ue*_e+Ke*st;Je<0&&(Ue-=2*Je*_e,Ke-=2*Je*st)}const kt=ge*(.25+.75*Math.max(0,ke)),rt=D+(kt-D)*x.accel;fe+=(Ue*rt-fe)*Me,he+=(Ke*rt-he)*Me}else if(!ae&&x.restNoise>0){const D=Math.sqrt(fe*fe+he*he);if(D>.05){const G=fe/D,le=he/D,ke=x.restNoise,Le=X(g+(G*ee-le*te)*R,l+(G*te+le*ee)*R),Ae=X(g+(G*ee+le*te)*R,l+(-G*te+le*ee)*R),Ie=Math.max(-x.maxTurn*ke,Math.min(x.maxTurn*ke,(Le-Ae)*x.turnGain*ke)),Ce=Math.cos(Ie),De=Math.sin(Ie),Ue=fe*Ce-he*De;he=fe*De+he*Ce,fe=Ue}}let se=0;if(J.enabled&&a[3]>0){const D=Math.min(1,Math.max(0,(me-J.distance)/J.distance));if(se=D*D*(3-2*D),se>0){const G=g+(Fe(F*2+77)-.5)*W,le=l+(Fe(F*2+78)-.5)*W,ke=(E(G+W,le)-E(G-W,le))*.5,Le=(E(G,le+W)-E(G,le-W))*.5,Ae=J.strength*.05*se;fe-=ke*Ae,he-=Le*Ae}}p=fe,m=he,Q(),p*=x.damping,m*=x.damping,g+=p,l+=m,C(ae),se>0&&de(g,l,se),ae&&Math.hypot(a[0]+Y-g,a[1]+H-l)<Math.max(x.settleRadius,4)&&(r[M+b.landed]=1),r[M+b.size]+=(a[2]-r[M+b.size])*.1,r[M+b.opacity]+=(a[3]-r[M+b.opacity])*.1}else{Ge(F,f.A,n,f.vw,f.vh,a),Ge(F,f.B,n,f.vw,f.vh,u);const q=f.eased,K=a[0]+(u[0]-a[0])*q,$=a[1]+(u[1]-a[1])*q,ce=a[2]+(u[2]-a[2])*q,ue=a[3]+(u[3]-a[3])*q;Q(),p*=.9,m*=.9;const ne=f.t>.005?.12:r[M+b.speed];g+=(K+Y-g)*ne+p,l+=($+H-l)*ne+m,L&&C(!1),r[M+b.size]+=(ce-r[M+b.size])*ne,r[M+b.opacity]+=(ue-r[M+b.opacity])*ne,!L&&Math.abs(K+Y-g)<2&&Math.abs($+H-l)<2&&(r[M+b.landed]=1,r[M+b.heading]=f.eased>=.5?f.B.index:f.A.index,p=0,m=0)}r[M+b.cx]=g,r[M+b.cy]=l,r[M+b.vx]=p,r[M+b.vy]=m}if(J.enabled)if(!J.blur)h.set(S);else{const F=v,M=A,Y=S,H=h;P.length!==F*M&&(P=new Float32Array(F*M));const g=P;for(let l=0;l<M;l++){const p=l*F;for(let m=0;m<F;m++){const L=m>1?m-2:0,C=m>0?m-1:0,Q=m<F-1?m+1:F-1,q=m<F-2?m+2:F-1;g[p+m]=Y[p+L]+4*Y[p+C]+6*Y[p+m]+4*Y[p+Q]+Y[p+q]}}for(let l=0;l<M;l++){const p=(l>1?l-2:0)*F,m=(l>0?l-1:0)*F,L=l*F,C=(l<M-1?l+1:M-1)*F,Q=(l<M-2?l+2:M-1)*F;for(let q=0;q<F;q++)H[L+q]=(g[p+q]+4*g[m+q]+6*g[L+q]+4*g[C+q]+g[Q+q])/256}}};let T=new Int32Array(Oe+1),I=new Int32Array(e),N=new Int8Array(e);const j=f=>{if(!d){const x=document.createElement("canvas");x.width=x.height=o;const X=x.getContext("2d"),V=X.createImageData(o,o);for(let Z=0;Z<i.length;Z++)V.data[Z*4]=200,V.data[Z*4+1]=90,V.data[Z*4+2]=40,V.data[Z*4+3]=i[Z]*127;X.putImageData(V,0,0),d=s.createPattern(x,"repeat")}s.save(),s.scale(f.texelPx,f.texelPx),s.translate(-f.texOffX,-f.texOffY),s.fillStyle=d,s.fillRect(f.texOffX,f.texOffY,f.vw/f.texelPx,f.vh/f.texelPx),s.restore()};return{kind:"canvas2d",device:"CPU (main thread) + Canvas 2D",setClouds:(f,x)=>{n=x},setField:U,setState:f=>{r=f,I.length!==e&&(I=new Int32Array(e),N=new Int8Array(e))},step:O,render:f=>{s.setTransform(f.dpr,0,0,f.dpr,0,0),s.clearRect(0,0,f.vw,f.vh),f.showField&&j(f);const x=f.alpha,X=f.count,V=R=>{const z=r[R+b.landed];return z>.5&&z<1.5?f.streak*f.restStreak:f.streak};T.fill(0);for(let R=0;R<X;R++){const z=R*Se;let J=r[z+b.opacity];if(f.streakFade>0&&f.streak>0){const B=Math.max(.3,r[z+b.size]*f.size),E=r[z+b.cx]-r[z+b.lx],de=r[z+b.cy]-r[z+b.ly],F=Math.sqrt(E*E+de*de)*V(z);F>2*B&&(J*=1-f.streakFade*(1-2*B/(2*B+F)))}const W=J<.005?-1:Math.min(Oe-1,J*Oe|0);N[R]=W,W>=0&&T[W+1]++}for(let R=1;R<=Oe;R++)T[R]+=T[R-1];const Z=T.slice(0,Oe);for(let R=0;R<X;R++){const z=N[R];z>=0&&(I[Z[z]++]=R)}const{r:oe,g:ee,b:te}=f.ink;for(let R=0;R<Oe;R++){const z=T[R],J=T[R+1];if(z!==J){s.fillStyle=`rgba(${oe},${ee},${te},${(R+.5)/Oe})`,s.beginPath();for(let W=z;W<J;W++){W>z&&(W-z)%en===0&&(s.fill(),s.beginPath());const B=I[W]*Se,E=Math.max(.3,r[B+b.size]*f.size),de=r[B+b.lx],F=r[B+b.ly],M=r[B+b.cx]-de,Y=r[B+b.cy]-F,H=de+M*x,g=F+Y*x,l=V(B),p=M*l,m=Y*l,L=p*p+m*m;if(L>4*E*E){const C=Math.sqrt(L),Q=-m/C,q=p/C,K=E,$=E*(1-f.streakTaper),ce=H-p,ue=g-m;s.moveTo(H-Q*K,g-q*K),s.lineTo(H+Q*K,g+q*K),s.lineTo(ce+Q*$,ue+q*$),s.lineTo(ce-Q*$,ue-q*$),s.closePath()}else if(E<1.25){const C=E*1.7725;s.rect(H-C/2,g-C/2,C,C)}else s.moveTo(H+E,g),s.arc(H,g,E,0,2*Math.PI)}s.fill()}}},resize:(f,x,X)=>{t.width=Math.max(1,Math.round(f*X)),t.height=Math.max(1,Math.round(x*X)),t.style.width=`${f}px`,t.style.height=`${x}px`},exportState:async()=>r.slice(),timings:()=>({gpuSimMs:null,gpuDrawMs:null,noiseMs:w}),destroy:()=>{T=new Int32Array(0)}}}const et=["Cx","Cy","Scale","Cos","Sin","Offset","Dots","Ink","Repeat","Index"],nn=["vw","vh","count","time","t","eased","drift","steer","mouseX","mouseY","mouseSign","mouseRadius","mouseStrength","texOffX","texOffY","texN","texelPx","attract","arriveK","settleRadius","damping","homing","accel","maxSpeed","speedVar","stagger","sensorDist","sensorAngle","turnGain","maxTurn","alignMin","zTime","features","octaves","lacunarity","gain","ridged","sharpness","normMin","normMax",...et.map(t=>`a${t}`),...et.map(t=>`b${t}`),"aShiftX","aShiftY","bShiftX","bShiftY","restFollow","restNoise","walls","wallMargin","wallBounce","crowd","crowdDist","cellPx","gridW","gridH","wallK","wallRange","blur","wallStrength","wallCruise","pad2"],rn=["vw","vh","dpr","alpha","inkR","inkG","inkB","size","streak","streakTaper","streakFade","texOffX","texOffY","texN","texelPx","restStreak"];function ht(t){const e=new Float32Array(t.length),s=Object.fromEntries(t.map((r,n)=>[r,n]));return{data:e,set:(r,n)=>{e[s[r]]=n},wgsl:t.map(r=>`${r}: f32`).join(", ")}}const vt=`
// 72 bytes; layout matches STRIDE / P in particles.ts.
struct Particle {
  pos: vec2f, prev: vec2f, vel: vec2f,
  size: f32, opacity: f32, speed: f32, jitter: f32,
  driftOff: vec2f, driftSpd: vec2f,
  driftRadius: f32, stagger: f32, landed: f32, heading: f32,
}
`,Mt=`
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
`;function sn(t){return`
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
`}function an(t){const e=s=>`SceneX(${et.map(r=>`u.${s}${r}`).join(", ")})`;return`
struct U { ${t} }
struct SceneX { cx: f32, cy: f32, scale: f32, cs: f32, sn: f32, offset: f32, dots: f32, ink: f32, repeat: f32, index: f32 }
${vt}
@group(0) @binding(0) var<uniform> u: U;
@group(0) @binding(1) var<storage, read_write> ps: array<Particle>;
@group(0) @binding(2) var<storage, read> dots: array<vec4f>; // local x, y, size, opacity
@group(0) @binding(3) var<storage, read> field: array<f32>;
// Crowd density (fixed point, 1/256 particle): read the blurred grid from last step, splat into the raw one.
@group(0) @binding(4) var<storage, read> densIn: array<u32>;
@group(0) @binding(5) var<storage, read_write> densOut: array<atomic<u32>>;
${Mt}

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

fn repel(p: ptr<function, Particle>) {
  if (u.mouseSign == 0.0) { return; }
  let m = (*p).pos - vec2f(u.mouseX, u.mouseY);
  let dist = length(m);
  if (dist < u.mouseRadius && dist > 0.0) {
    (*p).vel += m / dist * ((1.0 - dist / u.mouseRadius) * u.mouseStrength * u.mouseSign);
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
    let switchAt = 0.1 + 0.4 * u.stagger * (fy * 0.85 + (p.stagger / 0.4) * 0.15);
    var T: vec4f;
    var hi: f32;
    var shift: vec2f;
    if (u.t >= switchAt) { T = targetOf(i, ${e("b")}); hi = u.bIndex; shift = vec2f(u.bShiftX, u.bShiftY); }
    else { T = targetOf(i, ${e("a")}); hi = u.aIndex; shift = vec2f(u.aShiftX, u.aShiftY); }
    // A new target scene starts a flight; resting particles ride along with their scene.
    if (hi != p.heading) { p.heading = hi; p.landed = 2.0; }
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
      crowdW = smoothstep(u.crowdDist, u.crowdDist * 2.0, dist);
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
`}function on(t){return`
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
`}function ln(t){return`
struct R { ${t} }
${vt}
@group(0) @binding(0) var<uniform> r: R;
@group(0) @binding(1) var<storage, read> ps: array<Particle>;
@group(0) @binding(3) var<storage, read> field: array<f32>;
${Mt}

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
`}function tt(){return typeof navigator<"u"&&"gpu"in navigator&&!!navigator.gpu}const je=4;async function cn(t,e){if(!tt())throw new Error("WebGPU is not available in this browser");const s=await navigator.gpu.requestAdapter({powerPreference:"high-performance"});if(!s)throw new Error("No WebGPU adapter");const r=s.features.has("timestamp-query"),n=await s.requestDevice({requiredFeatures:r?["timestamp-query"]:[],requiredLimits:{maxStorageBufferBindingSize:s.limits.maxStorageBufferBindingSize,maxBufferSize:s.limits.maxBufferSize}});let i=!1;n.lost.then(y=>{i=!0,y.reason!=="destroyed"&&console.warn("[particulator] WebGPU device lost:",y.message)});const o=t.getContext("webgpu"),c=navigator.gpu.getPreferredCanvasFormat();o.configure({device:n,format:c,alphaMode:"premultiplied"});const d=s.info,w=`WebGPU · ${[d?.vendor,d?.architecture].filter(Boolean).join(" ")||d?.description||"GPU"}`,a=ht(nn),u=ht(rn),h=GPUBufferUsage,S=n.createBuffer({size:a.data.byteLength,usage:h.UNIFORM|h.COPY_DST}),P=n.createBuffer({size:u.data.byteLength,usage:h.UNIFORM|h.COPY_DST}),v=e*Se*4,A=n.createBuffer({size:Math.max(16,v),usage:h.STORAGE|h.COPY_DST|h.COPY_SRC}),U=n.createBuffer({size:1024*4,usage:h.STORAGE|h.COPY_DST});let O=n.createBuffer({size:16,usage:h.STORAGE|h.COPY_DST}),T=n.createBuffer({size:4,usage:h.STORAGE|h.COPY_DST}),I=1,N=0,j=1,k=new Float32Array(1),f=!1;const x=GPUShaderStage.COMPUTE,X=GPUShaderStage.VERTEX,V=GPUShaderStage.FRAGMENT,Z=y=>n.createBindGroupLayout({entries:y}),oe=Z([{binding:0,visibility:x,buffer:{type:"uniform"}},{binding:1,visibility:x,buffer:{type:"storage"}},{binding:2,visibility:x,buffer:{type:"read-only-storage"}},{binding:3,visibility:x,buffer:{type:"read-only-storage"}},{binding:4,visibility:x,buffer:{type:"read-only-storage"}},{binding:5,visibility:x,buffer:{type:"storage"}}]),ee=Z([{binding:0,visibility:x,buffer:{type:"uniform"}},{binding:1,visibility:x,buffer:{type:"read-only-storage"}},{binding:2,visibility:x,buffer:{type:"storage"}}]),te=Z([{binding:0,visibility:x,buffer:{type:"uniform"}},{binding:1,visibility:x,buffer:{type:"storage"}},{binding:2,visibility:x,buffer:{type:"read-only-storage"}}]),R=Z([{binding:0,visibility:X|V,buffer:{type:"uniform"}},{binding:1,visibility:X,buffer:{type:"read-only-storage"}},{binding:3,visibility:V,buffer:{type:"read-only-storage"}}]),z=(y,_,ae)=>n.createComputePipeline({layout:n.createPipelineLayout({bindGroupLayouts:[_]}),compute:{module:n.createShaderModule({code:y,label:ae}),entryPoint:"main"}}),J=z(an(a.wgsl),oe,"particulator sim"),W=z(on(a.wgsl),te,"particulator noise"),B=z(sn(a.wgsl),ee,"particulator crowd blur"),E=n.createShaderModule({code:ln(u.wgsl),label:"particulator render"}),de=4,F={color:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"}},M=n.createPipelineLayout({bindGroupLayouts:[R]}),Y=n.createRenderPipeline({layout:M,vertex:{module:E,entryPoint:"vs"},fragment:{module:E,entryPoint:"fs",targets:[{format:c,blend:F}]},primitive:{topology:"triangle-strip"},multisample:{count:de}}),H=n.createRenderPipeline({layout:M,vertex:{module:E,entryPoint:"vsField"},fragment:{module:E,entryPoint:"fsField",targets:[{format:c,blend:F}]},primitive:{topology:"triangle-list"},multisample:{count:de}});let g=[0,1].map(()=>n.createBuffer({size:16,usage:h.STORAGE|h.COPY_DST})),l=1,p=1,m,L,C,Q;const q=()=>{const y=(_,ae)=>n.createBindGroup({layout:_,entries:ae.map(([ie,re])=>({binding:ie,resource:{buffer:re}}))});m=y(oe,[[0,S],[1,A],[2,O],[3,T],[4,g[1]],[5,g[0]]]),L=y(ee,[[0,S],[1,g[0]],[2,g[1]]]),C=y(te,[[0,S],[1,T],[2,U]]),Q=y(R,[[0,P],[1,A],[3,T]])};q();const K=je*2+2,$=r?n.createQuerySet({type:"timestamp",count:K}):null,ce=r?n.createBuffer({size:K*8,usage:h.QUERY_RESOLVE|h.COPY_SRC}):null,ue=r?[0,1,2].map(()=>n.createBuffer({size:K*8,usage:h.MAP_READ|h.COPY_DST})):[],ne=new Set;let me=0,ye=null,xe=null,ve=null;const Pe=()=>((!ve||ve.width!==t.width||ve.height!==t.height)&&(ve?.destroy(),ve=n.createTexture({size:[t.width,t.height],format:c,sampleCount:de,usage:GPUTextureUsage.RENDER_ATTACHMENT})),ve.createView());return{kind:"webgpu",device:w,setClouds:(y,_)=>{O.destroy(),O=n.createBuffer({size:Math.max(16,_.byteLength),usage:h.STORAGE|h.COPY_DST}),_.byteLength&&n.queue.writeBuffer(O,0,_),q()},setField:y=>{const _=Ze(y);k=_.data,N=_.min,j=_.max,(_.N!==I||T.size!==_.N*_.N*4)&&(T.destroy(),T=n.createBuffer({size:_.N*_.N*4,usage:h.STORAGE|h.COPY_DST}),I=_.N,q());const{perm:ae,permMod12:ie}=xt(y.seed|0),re=new Uint32Array(1024);re.set(ae,0),re.set(ie,512),n.queue.writeBuffer(U,0,re),n.queue.writeBuffer(T,0,k)},setState:y=>n.queue.writeBuffer(A,0,y.subarray(0,e*Se)),step:y=>{if(i)return;const _=y.liveNoise;!_&&f&&n.queue.writeBuffer(T,0,k),f=_;const ae=y.steerParams,ie=y.field;a.set("vw",y.vw),a.set("vh",y.vh),a.set("count",y.count),a.set("time",y.time),a.set("t",y.t),a.set("eased",y.eased),a.set("drift",y.drift),a.set("steer",y.steer?1:0),a.set("mouseX",y.mouse?.x??0),a.set("mouseY",y.mouse?.y??0),a.set("mouseSign",y.mouse?y.mouseSign:0),a.set("mouseRadius",y.mouseRadius),a.set("mouseStrength",y.mouseStrength),a.set("aShiftX",y.shiftA.x),a.set("aShiftY",y.shiftA.y),a.set("bShiftX",y.shiftB.x),a.set("bShiftY",y.shiftB.y),a.set("texOffX",y.texOffX%I),a.set("texOffY",y.texOffY%I),a.set("texN",I),a.set("texelPx",ie.texelPx);for(const D of["attract","arriveK","settleRadius","damping","homing","accel","maxSpeed","speedVar","stagger","sensorDist","sensorAngle","turnGain","maxTurn","alignMin","restFollow","restNoise"])a.set(D,ae[D]);a.set("zTime",y.texZ),a.set("features",ie.features),a.set("octaves",ie.octaves),a.set("lacunarity",ie.lacunarity),a.set("gain",ie.gain),a.set("ridged",ie.ridged?1:0),a.set("sharpness",ie.sharpness),a.set("normMin",N),a.set("normMax",j);for(const[D,G]of[["a",y.A],["b",y.B]])a.set(`${D}Cx`,G.cx),a.set(`${D}Cy`,G.cy),a.set(`${D}Scale`,G.scale),a.set(`${D}Cos`,G.cos),a.set(`${D}Sin`,G.sin),a.set(`${D}Offset`,G.offset),a.set(`${D}Dots`,G.dots),a.set(`${D}Ink`,G.ink),a.set(`${D}Repeat`,G.repeat?1:0),a.set(`${D}Index`,G.index);const re=y.crowd,pe=y.walls,ge=Math.ceil(y.vw/re.cellPx)+1,Me=Math.ceil(y.vh/re.cellPx)+1;re.enabled&&(ge!==l||Me!==p)&&(l=ge,p=Me,g.forEach(D=>D.destroy()),g=[0,1].map(()=>n.createBuffer({size:l*p*4,usage:h.STORAGE|h.COPY_DST})),q()),a.set("walls",pe.enabled?1:0),a.set("wallMargin",pe.margin),a.set("wallBounce",pe.bounce),a.set("wallK",pe.stiffness),a.set("wallRange",pe.range),a.set("wallStrength",pe.strength),a.set("wallCruise",pe.cruise?1:0),a.set("blur",re.blur?1:0),a.set("crowd",re.enabled?re.strength:0),a.set("crowdDist",re.distance),a.set("cellPx",re.cellPx),a.set("gridW",l),a.set("gridH",p),n.queue.writeBuffer(S,0,a.data);const fe=n.createCommandEncoder(),he=me<je&&$?{timestampWrites:{querySet:$,beginningOfPassWriteIndex:me*2,endOfPassWriteIndex:me*2+1}}:{};re.enabled&&fe.clearBuffer(g[0]);const se=fe.beginComputePass(he);_&&(se.setPipeline(W),se.setBindGroup(0,C),se.dispatchWorkgroups(Math.ceil(I/8),Math.ceil(I/8))),se.setPipeline(J),se.setBindGroup(0,m),se.dispatchWorkgroups(Math.ceil(y.count/256)),re.enabled&&(se.setPipeline(B),se.setBindGroup(0,L),se.dispatchWorkgroups(Math.ceil(l/8),Math.ceil(p/8))),se.end(),n.queue.submit([fe.finish()]),me++},render:y=>{if(i)return;u.set("vw",y.vw),u.set("vh",y.vh),u.set("dpr",y.dpr),u.set("alpha",y.alpha),u.set("inkR",y.ink.r/255),u.set("inkG",y.ink.g/255),u.set("inkB",y.ink.b/255),u.set("size",y.size),u.set("streak",y.streak),u.set("streakTaper",y.streakTaper),u.set("streakFade",y.streakFade),u.set("restStreak",y.restStreak),u.set("texOffX",y.texOffX%I),u.set("texOffY",y.texOffY%I),u.set("texN",I),u.set("texelPx",y.texelPx),n.queue.writeBuffer(P,0,u.data);const _=n.createCommandEncoder(),ae=je*2,ie=_.beginRenderPass({colorAttachments:[{view:Pe(),resolveTarget:o.getCurrentTexture().createView(),clearValue:{r:0,g:0,b:0,a:0},loadOp:"clear",storeOp:"discard"}],...$?{timestampWrites:{querySet:$,beginningOfPassWriteIndex:ae,endOfPassWriteIndex:ae+1}}:{}});ie.setBindGroup(0,Q),y.showField&&(ie.setPipeline(H),ie.draw(3)),ie.setPipeline(Y),ie.draw(4,y.count),ie.end();const re=Math.min(me,je);me=0;let pe;if($&&ce&&(_.resolveQuerySet($,0,K,ce,0),pe=ue.find(ge=>!ne.has(ge)),pe&&_.copyBufferToBuffer(ce,0,pe,0,K*8)),n.queue.submit([_.finish()]),pe){const ge=pe;ne.add(ge),ge.mapAsync(GPUMapMode.READ).then(()=>{const Me=new BigUint64Array(ge.getMappedRange().slice(0));ge.unmap(),ne.delete(ge);let fe=0;for(let se=0;se<re;se++)fe+=Number(Me[se*2+1]-Me[se*2]);const he=Number(Me[ae+1]-Me[ae]);if(fe>=0&&he>=0&&fe<1e9&&he<1e9){const se=(D,G)=>D===null?G:D+(G-D)*.08;re>0&&(ye=se(ye,fe/1e6)),xe=se(xe,he/1e6)}},()=>ne.delete(ge))}},resize:(y,_,ae)=>{t.width=Math.max(1,Math.round(y*ae)),t.height=Math.max(1,Math.round(_*ae)),t.style.width=`${y}px`,t.style.height=`${_}px`},exportState:async()=>{const y=n.createBuffer({size:v,usage:h.MAP_READ|h.COPY_DST}),_=n.createCommandEncoder();_.copyBufferToBuffer(A,0,y,0,v),n.queue.submit([_.finish()]),await y.mapAsync(GPUMapMode.READ);const ae=new Float32Array(y.getMappedRange().slice(0));return y.unmap(),y.destroy(),ae},timings:()=>({gpuSimMs:ye,gpuDrawMs:xe,noiseMs:0}),destroy:()=>{o.unconfigure(),n.destroy()}}}function fn(t,e){if(t.mode!=="viewport"||!t.breakpoints?.length)return-1;let s=-1;return t.breakpoints.forEach((r,n)=>{e<=r.maxWidth&&(s<0||r.maxWidth<t.breakpoints[s].maxWidth)&&(s=n)}),s}function dn(t,e,{vw:s,vh:r}){if(t.mode==="viewport"){let{x:c,y:d,height:w}=t,a=t.rotation??0;const u=fn(t,s);if(u>=0){const h=t.breakpoints[u];c=h.x??c,d=h.y??d,w=h.height??w,a=h.rotation??a}return{cx:c*s,cy:d*r,height:w*r,rot:a*Math.PI/180}}const n=typeof document<"u"?document.querySelector(t.selector):null;if(!n)return null;const i=n.getBoundingClientRect(),o=t.fit==="cover"?Math.max(i.height,i.width/e):Math.min(i.height,i.width/e);return{cx:i.left+(t.x??.5)*i.width,cy:i.top+(t.y??.5)*i.height,height:o*(t.scale??1),rot:(t.rotation??0)*Math.PI/180}}function un(t,e,s,r,n,i){const o=dn(e.placement,s.aspect,n),c=e.overflow==="repeat",d=o??(i?{cx:i.cx,cy:i.cy,height:i.scale,rot:Math.atan2(i.sin,i.cos)}:{cx:n.vw/2,cy:-n.vh,height:n.vh*.3,rot:0});return{index:t,cx:d.cx,cy:d.cy,scale:d.height,cos:Math.cos(d.rot),sin:Math.sin(d.rot),offset:s.offset,dots:s.count,ink:c&&r>s.count&&s.count>0?s.count/r:1,repeat:c,drift:e.drift??1}}const Ye=1e3/60,mt=4,Be=new Map;function pn(t,e){const s=JSON.stringify([e,t.source]);let r=Be.get(s);return r||(r=hn(t,e),Be.set(s,r),r.then(n=>{n||Be.delete(s)}),Be.size>64&&Be.delete(Be.keys().next().value)),r}async function hn(t,e){const s=new URL(t.source.src,e).href;try{if(t.source.type==="dots"){const r=await fetch(s);if(!r.ok)throw new Error(`${r.status} ${s}`);return Ut(await r.arrayBuffer())}return await $t(s,t.source.dotter)}catch(r){return console.warn(`[particulator] scene "${t.id}" failed to load:`,r),null}}function mn(t){let e=Xt(t.effect);const s=t.baseUrl??(typeof document<"u"?document.baseURI:"http://localhost/"),r=t.container??document.body;let n=i();function i(){const l=document.createElement("canvas");return l.setAttribute("aria-hidden","true"),l.dataset.particulator="",l.style.cssText=`position:fixed;inset:0;pointer-events:none;z-index:${e.stage.zIndex}`,t.className&&(l.className=t.className),l}r.appendChild(n);let o=null,c=[],d=[],w=new Float32Array(0),a=ut(e.timeline.driver),u=[],h=[],S=!1,P=0,v=!1,A=0,U={from:0,to:0,t:0},O=null,T=0,I=0,N=0,j=0,k=0,f=0,x=null;const X=l=>{x={x:l.clientX,y:l.clientY}},V=()=>{x=null},Z=()=>o?.resize(window.innerWidth,window.innerHeight,window.devicePixelRatio||1);window.addEventListener("mousemove",X),document.addEventListener("mouseleave",V),window.addEventListener("resize",Z);const oe=typeof matchMedia<"u"?matchMedia("(prefers-color-scheme: dark)"):null,ee=()=>{const l=e.look.ink;if(typeof l=="string")return ft(l);const p=e.look.theme,m=p.startsWith("class:")?document.documentElement.classList.contains(p.slice(6)):p==="media"?!!oe?.matches:!1;return ft(m?l.dark:l.light)},te=(l,p)=>l===0?p:l+(p-l)*.08,R={frameMs:0,steps:0,step:0,render:0,noise:0};async function z(){c=(await Promise.all(e.scenes.map(m=>pn(m,s)))).map(m=>m?Jt(m):{aspect:1,count:0,data:new Float32Array(0)}),d=[];let p=0;for(const m of c)d.push(p),p+=m.count;w=new Float32Array(p*4),c.forEach((m,L)=>w.set(m.data,d[L]*4)),u=[]}const J=()=>({vw:window.innerWidth,vh:window.innerHeight});function W(){const l=J(),p=e.particles.count;u=e.scenes.map((m,L)=>un(L,m,{aspect:c[L]?.aspect??1,count:c[L]?.count??0,offset:d[L]??0},p,l,u[L]))}function B(){const{vw:l,vh:p}=J(),m=e.particles.count;return e.motion.entrance==="none"&&u[0]?Qt(m,u[0],w,l,p):wt(m,l,p)}async function E(l,p){const m=e.particles.count,L=i();let C;try{C=l==="webgpu"?await cn(L,m):tn(L,m)}catch(q){if(l==="webgpu")return console.warn("[particulator] WebGPU unavailable, falling back to Canvas 2D:",q),E("canvas2d",p);throw q}if(S){C.destroy();return}C.resize(window.innerWidth,window.innerHeight,window.devicePixelRatio||1),C.setClouds(c,w),C.setField(e.field),W(),C.setState(Zt(p,B()));const Q=o;o=C,n.replaceWith(L),n=L,Q?.destroy()}function de(l){if(l!=="auto")return l;if(tt())return"webgpu";const p=t.canvas2dMaxCount??3e4;return e.particles.count>p&&(e=Ve(e,{particles:{count:p}})),"canvas2d"}function F(l){if(P=requestAnimationFrame(F),!o||S)return;const p=f?Math.min(l-f,250):Ye;R.frameMs=te(R.frameMs,p),f=l,k+=p;const m=e.scenes.length,L=a.state(l,m),C=O!==null&&O<m?{from:O,to:O,t:0}:L;U=C,W();const Q=u[C.from],q=u[C.to];if(!Q||!q)return;const{vw:K,vh:$}=J(),ce=C.t*C.t*(3-2*C.t),ue=Q.drift+(q.drift-Q.drift)*C.t,ne=e.interaction.mouse,me=y=>{const _=h[y.index];return _?{x:y.cx-_.x,y:y.cy-_.y}:{x:0,y:0}},ye={x:0,y:0};let xe=0;const ve=performance.now();let Pe=0;for(;k>=Ye&&xe<mt;)T+=.016,I+=e.field.drift,N+=e.field.drift*.37,e.field.live&&(j+=e.field.liveSpeed),o.step({vw:K,vh:$,count:e.particles.count,time:T,A:Q,B:q,t:C.t,eased:ce,drift:ue,shiftA:xe===0?me(Q):ye,shiftB:xe===0?me(q):ye,steer:e.motion.preset==="steer",mouse:x,mouseSign:ne.mode==="repel"?1:ne.mode==="attract"?-1:0,mouseRadius:ne.radius,mouseStrength:ne.strength,texOffX:I,texOffY:N,texZ:j,liveNoise:e.field.live,steerParams:e.motion.steer,field:e.field,walls:e.motion.walls,crowd:e.motion.crowd}),Pe+=o.timings().noiseMs,k-=Ye,xe===0&&(h=u.map(y=>({x:y.cx,y:y.cy}))),xe++;xe===mt&&(k=0);const Ee=performance.now(),be=e.look;o.render({vw:K,vh:$,dpr:window.devicePixelRatio||1,count:e.particles.count,alpha:Math.min(1,k/Ye),ink:ee(),size:be.size,streak:be.streak,streakTaper:be.streakTaper,streakFade:be.streakFade,restStreak:e.motion.preset==="steer"?be.restStreak:1,showField:v,texOffX:I,texOffY:N,texelPx:e.field.texelPx});const Re=performance.now();R.steps=te(R.steps,xe),R.step=te(R.step,Ee-ve-Pe),R.noise=te(R.noise,Pe),R.render=te(R.render,Re-Ee)}const M=(async()=>{await z(),W(),await E(de(t.engine??"auto"),null),a.setProgress?.(A),P=requestAnimationFrame(F)})(),Y=l=>typeof l=="number"?l:e.scenes.findIndex(p=>p.id===l),H=(l,p)=>JSON.stringify(l)===JSON.stringify(p);return{get canvas(){return n},get effect(){return e},ready:M,get progress(){return A},set progress(l){A=l,a.setProgress?.(l)},goTo:(l,p)=>{const m=Y(l);if(!(m<0)){if(!a.goTo){console.warn("[particulator] goTo() needs the api timeline driver");return}a.goTo(m,p?.duration??2e3,performance.now())}},update:async l=>{await M;const p=e;e=Ve(e,l),H(p.timeline,e.timeline)||(a=ut(e.timeline.driver),a.setProgress?.(A)),n&&p.stage.zIndex!==e.stage.zIndex&&(n.style.zIndex=String(e.stage.zIndex)),["size","features","octaves","lacunarity","gain","ridged","sharpness","seed"].some(L=>p.field[L]!==e.field[L])&&o?.setField(e.field),H(p.scenes.map(L=>L.source),e.scenes.map(L=>L.source))||(await z(),o?.setClouds(c,w)),p.particles.count!==e.particles.count&&o&&await E(o.kind,await o.exportState())},setEngine:async l=>{await M,!(!o||o.kind===l)&&await E(l,await o.exportState())},get showField(){return v},set showField(l){v=l},stats:()=>{const l=o?.timings();return{engine:o?.kind??"canvas2d",device:o?.device??"starting…",count:e.particles.count,fps:R.frameMs>0?1e3/R.frameMs:0,frameMs:R.frameMs,stepsPerFrame:R.steps,cpuStepMs:R.step,cpuRenderMs:R.render,cpuNoiseMs:R.noise,gpuSimMs:l?.gpuSimMs??null,gpuDrawMs:l?.gpuDrawMs??null}},scenes:()=>e.scenes.map((l,p)=>{const m=u[p],L=c[p]?.aspect??1,C=m?.scale??0;return{id:l.id,index:p,cx:m?.cx??0,cy:m?.cy??0,width:C*L,height:C,rotation:m?Math.atan2(m.sin,m.cos):0,aspect:L,dots:c[p]?.count??0,element:l.placement.mode==="element"?document.querySelector(l.placement.selector):null}}),transition:()=>U,get preview(){return O},set preview(l){O=l},destroy:()=>{S=!0,cancelAnimationFrame(P),o?.destroy(),o=null,n.remove(),window.removeEventListener("mousemove",X),document.removeEventListener("mouseleave",V),window.removeEventListener("resize",Z)}}}const gn=1,yn=[{id:"sphere",source:{type:"image",src:"img/sphere.png",dotter:{count:3e4,seed:3}},placement:{mode:"element",selector:'[data-particulator="sphere"]',fit:"contain",x:.4994,y:.4969,scale:1}},{id:"glyph",source:{type:"image",src:"img/glyph.png",dotter:{count:3e4,seed:3}},placement:{mode:"element",selector:'[data-particulator="glyph"]',fit:"contain"}},{id:"star",source:{type:"image",src:"img/star.png",dotter:{count:3e4,seed:3}},placement:{mode:"element",selector:'[data-particulator="star"]',fit:"contain"}}],xn={driver:{type:"scroll",sections:"section",mode:"snap"}},wn={steer:{attract:.205,stagger:.55}},vn={ink:{light:"#1a1a1a",dark:"#f5f1e8"},theme:"class:dark"},Mn={zIndex:1},bn={version:gn,scenes:yn,timeline:xn,motion:wn,look:vn,stage:Mn},kn=bn,nt=new URLSearchParams(location.search),Te=mn({effect:kn,engine:nt.get("engine")??"auto"});window.stage=Te;const bt=nt.get("studio")!=="0";bt&&At(async()=>{const{mountStudio:t,fileSystemAccess:e,download:s}=await import("./index-BIeobEQ6.js");return{mountStudio:t,fileSystemAccess:e,download:s}},[],import.meta.url).then(({mountStudio:t,fileSystemAccess:e,download:s})=>t(Te,{hidden:nt.get("studio")==="hidden",storage:"showSaveFilePicker"in window?e():s()})).then(t=>{window.studio=t});const gt=document.getElementById("hud");if(bt)gt.remove();else{const t=s=>s===null?"n/a":`${s.toFixed(2)}ms`,e=()=>{const s=Te.stats();gt.innerHTML=`${s.device} · ${s.count.toLocaleString()} · ${s.fps.toFixed(0)} fps · cpu ${t(s.cpuStepMs+s.cpuRenderMs)} · gpu ${t(s.gpuSimMs!==null&&s.gpuDrawMs!==null?s.gpuSimMs+s.gpuDrawMs:null)} `+(tt()?`<button id="swap">switch to ${s.engine==="webgpu"?"Canvas 2D":"WebGPU"}</button>`:""),document.getElementById("swap")?.addEventListener("click",()=>{Te.setEngine(s.engine==="webgpu"?"canvas2d":"webgpu")})};Te.ready.then(()=>{e(),setInterval(e,500)})}addEventListener("keydown",t=>{t.target instanceof HTMLInputElement||(t.key==="f"&&(Te.showField=!Te.showField),t.key==="d"&&document.body.classList.toggle("debug"),t.key==="t"&&document.documentElement.classList.toggle("dark"))});export{Rt as D,fn as a,Xt as r,Sn as s};
