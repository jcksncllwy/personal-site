(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))r(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function s(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(n){if(n.ep)return;n.ep=!0;const i=s(n);fetch(n.href,i)}})();const St="modulepreload",Pt=function(t){return"/particulator/"+t},it={},At=function(e,s,r){let n=Promise.resolve();if(s&&s.length>0){let d=function(m){return Promise.all(m.map(o=>Promise.resolve(o).then(u=>({status:"fulfilled",value:u}),u=>({status:"rejected",reason:u}))))};document.getElementsByTagName("link");const a=document.querySelector("meta[property=csp-nonce]"),l=a?.nonce||a?.getAttribute("nonce");n=d(s.map(m=>{if(m=Pt(m),m in it)return;it[m]=!0;const o=m.endsWith(".css"),u=o?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${m}"]${u}`))return;const h=document.createElement("link");if(h.rel=o?"stylesheet":St,o||(h.as="script"),h.crossOrigin="",h.href=m,l&&h.setAttribute("nonce",l),document.head.appendChild(h),o)return new Promise((A,R)=>{h.addEventListener("load",A),h.addEventListener("error",()=>R(new Error(`Unable to preload CSS for ${m}`)))})}))}function i(a){const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=a,window.dispatchEvent(l),!l.defaultPrevented)throw a}return n.then(a=>{for(const l of a||[])l.status==="rejected"&&i(l.reason);return e().catch(i)})},Rt={count:3e4,seed:1,invert:!1,gamma:1,contrast:1,threshold:.02,edges:0,alpha:"mask",sizeMin:.4,sizeMax:1.2,sizeBy:"density",opacityBy:"density",opacityMin:.35,colors:!1,maxResolution:1024};function Ot(t,e,s,r){const n={...Rt,...Lt(e)},i=Math.max(0,Math.floor(n.count)),a=It(t,Math.max(1,Math.floor(n.maxResolution))),{width:l,height:d}=a,m=Ct(a,n);let o=0,u=l,h=d,A=-1,R=-1;for(let y=0,c=0;y<d;y++)for(let p=0;p<l;p++,c++){const g=m[c];g>0&&(g>o&&(o=g),p<u&&(u=p),p>A&&(A=p),y<h&&(h=y),y>R&&(R=y))}const b=s/l,S=r/d,U=new Float32Array(i*4),O=n.colors?new Uint8Array(i*3):void 0;if(i===0||o<=0)return ct(s,r,0,U,O);const T=Math.max(0,u-.5),I=Math.max(0,h-.5),N=Math.min(l,A+1.5),$=Math.min(d,R+1.5),k=Math.max(N-T,$-I),f=T-(k-(N-T))/2,w=I-(k-($-I))/2;let X=0;for(let y=h;y<=R;y++)for(let c=u;c<=A;c++)X+=m[y*l+c];const V=X/o/(k*k),Z=i/Math.max(V,1e-9),oe=i*512+1e6,ee=n.seed>>>0,te=ot(ee,1374496523),P=ot(ee,739982445),z=Xe(ee^2246822507),J=Math.min(Math.ceil(Z*4)+4096,oe),W=new Float32Array(i),B=new Float32Array(i);let E=0;for(let y=1;y<=J&&E<i;y++){const c=f+at(te+y*zt)*k,p=w+at(P+y*Bt)*k;if(c<0||p<0||c>=l||p>=d)continue;const g=He(m,l,d,c,p);g<=0||Xe((y^z)>>>0)*23283064365386963e-26*o>=g||(W[E]=c,B[E]=p,E++)}E>1&&Et(W,B,E,m,l,d,Math.sqrt(X/E));const de=(b+S)/2,F=n.sizeMax-n.sizeMin,v=1-n.opacityMin,Y=1/o,H=a.data;for(let y=0;y<E;y++){const c=W[y],p=B[y],g=Math.min(1,He(m,l,d,c,p)*Y),L=y*4;if(U[L]=c*b,U[L+1]=p*S,U[L+2]=(n.sizeBy==="density"?n.sizeMin+F*g:n.sizeMax)*de,U[L+3]=n.opacityBy==="density"?n.opacityMin+v*g:1,O){const C=((p|0)*l+(c|0))*4,Q=y*3;O[Q]=H[C],O[Q+1]=H[C+1],O[Q+2]=H[C+2]}}return ct(s,r,E,U,O)}const Ft=3,qe=1.5,Tt=.25;function Et(t,e,s,r,n,i,a){const l=new Float32Array(s);let d=1/0;for(let $=0;$<s;$++){const k=He(r,n,i,t[$],e[$]);l[$]=k>0?a/Math.sqrt(k):a*8,l[$]<d&&(d=l[$])}const m=Math.max(d*qe/2,Math.max(n,i)/1024),o=1/m,u=Math.max(1,Math.ceil(n/m)),h=Math.max(1,Math.ceil(i/m)),A=new Int32Array(u*h+1),R=new Int32Array(s),b=new Int32Array(s),S=new Float32Array(s),U=new Float32Array(s),O=new Float32Array(s),T=new Float32Array(s),I=new Float32Array(s),N=qe*qe;for(let $=0;$<Ft;$++){A.fill(0);for(let k=0;k<s;k++){const f=(e[k]*o|0)*u+(t[k]*o|0);R[k]=f,A[f+1]++}for(let k=0;k<u*h;k++)A[k+1]+=A[k];for(let k=0;k<s;k++){const f=A[R[k]]++;b[f]=k,S[f]=t[k],U[f]=e[k],O[f]=l[k]}for(let k=u*h;k>0;k--)A[k]=A[k-1];A[0]=0;for(let k=0;k<s;k++){const f=S[k],w=U[k],X=O[k],V=X*qe,Z=V*V;let oe=0,ee=0;const te=Math.max(0,(w-V)*o|0),P=Math.min(h-1,(w+V)*o|0),z=Math.max(0,(f-V)*o|0),J=Math.min(u-1,(f+V)*o|0);for(let F=te;F<=P;F++){const v=A[F*u+J+1];for(let Y=A[F*u+z];Y<v;Y++){const H=f-S[Y],y=w-U[Y],c=H*H+y*y;if(c>=Z||Y===k)continue;const p=X<O[Y]?X:O[Y];if(c>=p*p*N)continue;if(c<1e-12){oe+=k<Y?.5:-.5;continue}const g=Math.sqrt(c),L=1-g/(p*qe),C=L*L/g;oe+=H*C,ee+=y*C}}const W=Math.sqrt(oe*oe+ee*ee),B=Tt*X,E=W>1?B/W:B,de=b[k];T[de]=oe*E,I[de]=ee*E}for(let k=0;k<s;k++){let f=t[k]+T[k],w=e[k]+I[k];f<0?f=0:f>=n&&(f=n-.001),w<0?w=0:w>=i&&(w=i-.001),He(r,n,i,f,w)>0&&(t[k]=f,e[k]=w)}}}const Qe=1.324717957244746,zt=1/Qe,Bt=1/(Qe*Qe);function at(t){return t-Math.floor(t)}function Xe(t){return t=t>>>0,t^=t>>>16,t=Math.imul(t,2146121005),t^=t>>>15,t=Math.imul(t,2221713035),t^=t>>>16,t>>>0}function ot(t,e){return Xe(Xe(t)^e)/4294967296}function ct(t,e,s,r,n){const i=s*4===r.length,a={width:t,height:e,count:s,data:i?r:r.slice(0,s*4)};return n&&(a.colors=i?n:n.slice(0,s*3)),a}function Lt(t){const e={};for(const[s,r]of Object.entries(t))r!==void 0&&(e[s]=r);return e}function He(t,e,s,r,n){let i=r-.5,a=n-.5;i<0?i=0:i>e-1&&(i=e-1),a<0?a=0:a>s-1&&(a=s-1);const l=i|0,d=a|0,m=l+1<e?l+1:l,o=d+1<s?d+1:d,u=i-l,h=a-d,A=d*e,R=o*e,b=t[A+l]+(t[A+m]-t[A+l])*u,S=t[R+l]+(t[R+m]-t[R+l])*u;return b+(S-b)*h}function It(t,e){const{width:s,height:r,data:n}=t,i=Math.max(s,r)/e;if(i<=1)return t;const a=Math.max(1,Math.round(s/i)),l=Math.max(1,Math.round(r/i)),d=new Uint8ClampedArray(a*l*4),m=new Int32Array(a),o=new Int32Array(a);for(let h=0;h<a;h++)m[h]=Math.floor(h*s/a),o[h]=Math.max(m[h]+1,Math.floor((h+1)*s/a));const u=new Float64Array(a*4);for(let h=0;h<l;h++){const A=Math.floor(h*r/l),R=Math.max(A+1,Math.floor((h+1)*r/l));u.fill(0);for(let S=A;S<R;S++){const U=S*s*4;for(let O=0;O<a;O++){let T=0,I=0,N=0,$=0;for(let f=m[O],w=U+f*4;f<o[O];f++,w+=4)T+=n[w],I+=n[w+1],N+=n[w+2],$+=n[w+3];const k=O*4;u[k]+=T,u[k+1]+=I,u[k+2]+=N,u[k+3]+=$}}const b=R-A;for(let S=0;S<a;S++){const U=1/(b*(o[S]-m[S])),O=S*4,T=(h*a+S)*4;d[T]=u[O]*U+.5,d[T+1]=u[O+1]*U+.5,d[T+2]=u[O+2]*U+.5,d[T+3]=u[O+3]*U+.5}}return{width:a,height:l,data:d}}function Ct(t,e){const{width:s,height:r,data:n}=t,i=s*r,a=new Float32Array(i);for(let R=0,b=0;R<i;R++,b+=4)a[R]=(.2126*n[b]+.7152*n[b+1]+.0722*n[b+2])/255;let l=null;const d=lt(e.edges);d>0&&(l=Dt(a,s,r));const m=new Float32Array(i),{contrast:o,gamma:u,threshold:h}=e,A=e.alpha==="mask";for(let R=0;R<i;R++){let b=e.invert?a[R]:1-a[R];o!==1&&(b=lt((b-.5)*o+.5)),u!==1&&b>0&&(b=Math.pow(b,u)),l&&(b=b*(1-d)+l[R]*d),A&&(b*=n[R*4+3]/255),m[R]=b<h||b<=0?0:b}return m}function Dt(t,e,s){const r=new Float32Array(e*s);let n=0;for(let i=0;i<s;i++){const a=i>0?i-1:0,l=i<s-1?i+1:i;for(let d=0;d<e;d++){const m=d>0?d-1:0,o=d<e-1?d+1:d,u=t[a*e+m],h=t[a*e+d],A=t[a*e+o],R=t[i*e+m],b=t[i*e+o],S=t[l*e+m],U=t[l*e+d],O=t[l*e+o],T=A+2*b+O-u-2*R-S,I=S+2*U+O-u-2*h-A,N=Math.sqrt(T*T+I*I);r[i*e+d]=N,N>n&&(n=N)}}if(n>0)for(let i=0;i<r.length;i++)r[i]/=n;return r}function lt(t){return t<0?0:t>1?1:t}function Ut(t){const e=new DataView(t);if(t.byteLength<8)throw new Error("decodeNgaiV1: buffer shorter than header");const s=e.getUint16(0,!0),r=e.getUint16(2,!0),n=e.getUint32(4,!0);if(t.byteLength<8+n*6)throw new Error(`decodeNgaiV1: expected ${8+n*6} bytes, got ${t.byteLength}`);const i=new Float32Array(n*4);for(let a=0,l=8,d=0;a<n;a++,l+=6,d+=4)i[d]=e.getUint16(l,!0)/65535*s,i[d+1]=e.getUint16(l+2,!0)/65535*r,i[d+2]=e.getUint8(l+4)/255*2,i[d+3]=e.getUint8(l+5)/255;return{width:s,height:r,count:n,data:i}}async function qt(t,e=1024){const s=typeof t=="string"?await Gt(t):t,r=await Nt(s);try{const n=r.width,i=r.height;if(!n||!i)throw new Error("dotter: image has no intrinsic size");const a=Math.min(1,e/Math.max(n,i)),l=Math.max(1,Math.round(n*a)),d=Math.max(1,Math.round(i*a)),m=_t(l,d);m.imageSmoothingEnabled=!0,m.imageSmoothingQuality="high",m.clearRect(0,0,l,d),m.drawImage(r.image,0,0,l,d);const{data:o}=m.getImageData(0,0,l,d);return{pixels:{width:l,height:d,data:o},sourceWidth:n,sourceHeight:i}}finally{r.close()}}async function Wt(t,e={}){const s=await qt(t,e.maxResolution??1024);return Ot(s.pixels,e,s.sourceWidth,s.sourceHeight)}async function Gt(t){const e=await fetch(t);if(!e.ok)throw new Error(`dotter: fetch ${t} failed (${e.status})`);return e.blob()}async function Nt(t){try{const e=await createImageBitmap(t,{premultiplyAlpha:"none"});return{image:e,width:e.width,height:e.height,close:()=>e.close()}}catch(e){if(typeof Image>"u"||typeof URL.createObjectURL!="function")throw e;const s=URL.createObjectURL(t);try{const r=new Image;r.decoding="async",r.src=s,await r.decode();const n=r.naturalWidth||r.width,i=r.naturalHeight||r.height;return{image:r,width:n,height:i,close:()=>URL.revokeObjectURL(s)}}catch(r){throw URL.revokeObjectURL(s),r}}}function _t(t,e){const r=(typeof OffscreenCanvas<"u"?new OffscreenCanvas(t,e):Object.assign(document.createElement("canvas"),{width:t,height:e})).getContext("2d",{willReadFrequently:!0});if(!r)throw new Error("dotter: 2D canvas context unavailable");return r}async function jt(t,e={}){const s=Yt();if(s)try{return await s.run(typeof t=="string"?$t(t):t,e)}catch{}return Wt(t,e)}function $t(t){const e=globalThis,s=e.document?.baseURI??e.location?.href;try{return s?new URL(t,s).href:t}catch{return t}}let ze;function Yt(){if(ze!==void 0)return ze;if(ze=null,typeof Worker>"u")return null;let t;try{t=new Worker(new URL("/particulator/assets/worker-Ld_UPjcu.js",import.meta.url),{type:"module"})}catch{return null}const e=new Map;let s=1;const r=n=>{ze=null,t.terminate();for(const i of e.values())i.reject(new Error(n));e.clear()};return t.addEventListener("message",n=>{const i=e.get(n.data.id);i&&(e.delete(n.data.id),n.data.cloud?i.resolve(n.data.cloud):i.reject(new Error(n.data.error??"dotter worker: unknown error")))}),t.addEventListener("error",n=>{n.preventDefault(),r(`dotter worker failed: ${n.message||"load error"}`)}),t.addEventListener("messageerror",()=>r("dotter worker: message error")),ze={run(n,i){return new Promise((a,l)=>{const d=s++;e.set(d,{resolve:a,reject:l});const m={id:d,url:n,opts:i};t.postMessage(m)})}},ze}const yt={version:1,particles:{count:3e4},timeline:{driver:{type:"api"}},motion:{preset:"steer",entrance:"drop",steer:{attract:.2,arriveK:.05,settleRadius:40,damping:1,homing:.07,accel:.15,maxSpeed:14,speedVar:.3,stagger:1,sensorDist:28,sensorAngle:.19,turnGain:.8,maxTurn:.3,alignMin:0,restFollow:.75,restNoise:.25},walls:{enabled:!1,margin:0,stiffness:.08,range:10,strength:.6,cruise:!0,bounce:.3},crowd:{enabled:!1,strength:4,distance:15,cellPx:6,blur:!0}},field:{size:256,texelPx:4,features:5,octaves:3,lacunarity:2,gain:.5,ridged:!0,sharpness:3,seed:7,drift:.15,live:!1,liveSpeed:.004},look:{ink:"#1a1a1a",theme:"none",size:1,streak:1,streakTaper:.7,streakFade:.3,restStreak:0},interaction:{mouse:{mode:"repel",radius:70,strength:.15}},stage:{zIndex:0}},je=t=>typeof t=="object"&&t!==null&&!Array.isArray(t);function Ve(t,e){if(!je(t)||!je(e))return e===void 0?t:e;const s={...t};for(const[r,n]of Object.entries(e)){if(n===void 0)continue;const i=t[r];s[r]=je(i)&&je(n)&&!("type"in n&&i.type!==n.type)?Ve(i,n):n}return s}function Sn(t){const e=(i,a)=>{if(JSON.stringify(i)!==JSON.stringify(a)){if(i&&a&&typeof i=="object"&&typeof a=="object"&&!Array.isArray(i)&&!Array.isArray(a)){const l=i.type,d=a.type;if(l!==void 0&&l!==d)return i;const m={};for(const o of Object.keys(i)){const u=e(i[o],a[o]);u!==void 0&&(m[o]=u)}return Object.keys(m).length?m:void 0}return i}},{version:s,scenes:r,...n}=t;return{version:s,scenes:r,...e(n,yt)??{}}}function Xt(t){return Ve(yt,t)}function ft(t){let e=t.trim().replace(/^#/,"");e.length===3&&(e=e.split("").map(r=>r+r).join(""));const s=parseInt(e.slice(0,6),16);return Number.isNaN(s)?{r:0,g:0,b:0}:{r:s>>16&255,g:s>>8&255,b:s&255}}const We=(t,e,s)=>Math.max(e,Math.min(s,t));function dt(t,e){const s=Math.max(0,e-1),r=We(t,0,s),n=Math.min(Math.floor(r),s);return{from:n,to:Math.min(n+1,s),t:r-n}}function ut(t){switch(t.type){case"api":{let e={from:0,to:0,t:0},s=0,r=null;return{state:(n,i)=>{if(s!==null)return dt(s,i);if(r){const l=r.dur<=0?1:We((n-r.start)/r.dur,0,1);e={...e,t:l},l>=1&&(r=null,e={from:e.to,to:e.to,t:0})}const a=Math.max(0,i-1);return{from:Math.min(e.from,a),to:Math.min(e.to,a),t:e.t}},setProgress:n=>{r=null,s=n},goTo:(n,i,a)=>{const l=s!==null?Math.round(s):e.t>=.5?e.to:e.from;s=null,e={from:l,to:n,t:0},r={start:a,dur:i}}}}case"time":{const e=performance.now();return{state:(s,r)=>{if(r<2)return{from:0,to:0,t:0};const n=(t.hold+t.transition)*1e3,i=t.hold/(t.hold+t.transition),a=Math.max(0,s-e)/n,l=Math.floor(a),d=a-l,m=d<i?0:(d-i)/(1-i),o=t.loop??"loop";if(o==="once")return l>=r-1?{from:r-1,to:r-1,t:0}:{from:l,to:l+1,t:m};if(o==="pingpong"){const u=2*(r-1),h=l%u,A=h<r-1?h:u-h,R=h<r-1?h+1:u-h-1;return{from:A,to:R,t:m}}return{from:l%r,to:(l+1)%r,t:m}}}}case"scroll":{const e=a=>{const l=Array.from(document.querySelectorAll(t.sections)).slice(0,a);if(l.length<2)return 0;const d=l.map(u=>u.getBoundingClientRect());let m=t.axis??"auto";m==="auto"&&(m=Math.abs(d[1].left-d[0].left)>Math.abs(d[1].top-d[0].top)?"x":"y");const o=d.map(u=>m==="x"?u.left:u.top);if(o[0]>=0)return 0;for(let u=0;u<o.length-1;u++)if(o[u]<=0&&o[u+1]>0)return u-o[u]/(o[u+1]-o[u]);return l.length-1};if(t.mode!=="snap")return{state:(a,l)=>dt(e(l),l)};const s=We(t.threshold??.5,0,1),r=Math.max(0,t.duration??1.5)*1e3;let n=null,i=0;return{state:(a,l)=>{const d=e(l),m=We(d-Math.floor(d)>=s?Math.ceil(d):Math.floor(d),0,Math.max(0,l-1));if(n||(n={from:m,to:m,t:0}),m!==n.to&&(n={from:n.t>=.5?n.to:n.from,to:m,t:0},i=a),n.from!==n.to){const o=r<=0?1:We((a-i)/r,0,1);n=o>=1?{from:n.to,to:n.to,t:0}:{...n,t:o}}return n}}}}}const we=new Float32Array([1,1,0,-1,1,0,1,-1,0,-1,-1,0,1,0,1,-1,0,1,1,0,-1,-1,0,-1,0,1,1,0,-1,1,0,1,-1,0,-1,-1]);function Ht(t=1){const{perm:e,permMod12:s}=xt(t),r=1/3,n=1/6;return function(a,l,d){const m=(a+l+d)*r,o=Math.floor(a+m),u=Math.floor(l+m),h=Math.floor(d+m),A=(o+u+h)*n,R=a-(o-A),b=l-(u-A),S=d-(h-A);let U,O,T,I,N,$;R>=b?b>=S?(U=1,O=0,T=0,I=1,N=1,$=0):R>=S?(U=1,O=0,T=0,I=1,N=0,$=1):(U=0,O=0,T=1,I=1,N=0,$=1):b<S?(U=0,O=0,T=1,I=0,N=1,$=1):R<S?(U=0,O=1,T=0,I=0,N=1,$=1):(U=0,O=1,T=0,I=1,N=1,$=0);const k=R-U+n,f=b-O+n,w=S-T+n,X=R-I+2*n,V=b-N+2*n,Z=S-$+2*n,oe=R-1+3*n,ee=b-1+3*n,te=S-1+3*n,P=o&255,z=u&255,J=h&255;let W=0,B,E;return B=.6-R*R-b*b-S*S,B>0&&(E=s[P+e[z+e[J]]]*3,B*=B,W+=B*B*(we[E]*R+we[E+1]*b+we[E+2]*S)),B=.6-k*k-f*f-w*w,B>0&&(E=s[P+U+e[z+O+e[J+T]]]*3,B*=B,W+=B*B*(we[E]*k+we[E+1]*f+we[E+2]*w)),B=.6-X*X-V*V-Z*Z,B>0&&(E=s[P+I+e[z+N+e[J+$]]]*3,B*=B,W+=B*B*(we[E]*X+we[E+1]*V+we[E+2]*Z)),B=.6-oe*oe-ee*ee-te*te,B>0&&(E=s[P+1+e[z+1+e[J+1]]]*3,B*=B,W+=B*B*(we[E]*oe+we[E+1]*ee+we[E+2]*te)),32*W}}function xt(t=1){let e=t>>>0;const s=()=>{e=e+1831565813>>>0;let a=e;return a=Math.imul(a^a>>>15,a|1),a^=a+Math.imul(a^a>>>7,a|61),((a^a>>>14)>>>0)/4294967296},r=new Uint8Array(256);for(let a=0;a<256;a++)r[a]=a;for(let a=255;a>0;a--){const l=Math.floor(s()*(a+1));[r[a],r[l]]=[r[l],r[a]]}const n=new Uint8Array(512),i=new Uint8Array(512);for(let a=0;a<512;a++)n[a]=r[a&255],i[a]=n[a]%12;return{perm:n,permMod12:i}}const pt=new Map;function Vt(t=256,e=1,{features:s=5,octaves:r=3,lacunarity:n=2,gain:i=.5,ridged:a=!0,sharpness:l=3}={},d=0,m=new Float32Array(t*t)){let o=pt.get(e);o||(o=Ht(e),pt.set(e,o));const u=o,h=(b,S)=>{let U=0,O=1,T=s/t,I=0;for(let N=0;N<r;N++)U+=u(b*T,S*T,N*17.3+d)*O,I+=O,O*=i,T*=n;return U/I};let A=1/0,R=-1/0;for(let b=0;b<t;b++)for(let S=0;S<t;S++){const U=S/t,O=b/t,T=h(S,b)*(1-U)*(1-O)+h(S-t,b)*U*(1-O)+h(S,b-t)*(1-U)*O+h(S-t,b-t)*U*O,I=a?1-Math.abs(T):T;m[b*t+S]=I,I<A&&(A=I),I>R&&(R=I)}for(let b=0;b<m.length;b++)m[b]=Math.pow((m[b]-A)/(R-A),l);return{data:m,min:A,max:R}}function Ze(t,e=0,s){const r=t.size|0,n=Vt(r,t.seed|0,t,e,s&&s.length===r*r?s:new Float32Array(r*r));return{N:r,data:n.data,min:n.min,max:n.max}}function Kt(t,e,s,r,n,i,a){let l=i/s+r,d=a/s+n;l-=Math.floor(l/e)*e,d-=Math.floor(d/e)*e;const m=Math.min(l|0,e-1),o=Math.min(d|0,e-1),u=l-m,h=d-o,A=(m+1)%e,R=(o+1)%e,b=o*e,S=R*e,U=t[b+m],O=t[b+A],T=t[S+m],I=t[S+A],N=U+(O-U)*u;return N+(T+(I-T)*u-N)*h}const Se=18,M={cx:0,cy:1,lx:2,ly:3,vx:4,vy:5,size:6,opacity:7,speed:8,jitter:9,driftOffX:10,driftOffY:11,driftSpdX:12,driftSpdY:13,driftRadius:14,stagger:15,landed:16,heading:17};function Jt(t){const{width:e,height:s,count:r}=t,n=e/s,i=t.data,a=new Float32Array(r*4);for(let l=0;l<r;l++){const d=l*4;a[d]=(i[d]/e-.5)*n,a[d+1]=i[d+1]/s-.5,a[d+2]=i[d+2]/s,a[d+3]=i[d+3]}return{aspect:n,count:r,data:a}}function Fe(t){let e=t>>>0;return e=Math.imul(e^e>>>16,73244475),e=Math.imul(e^e>>>16,73244475),((e^e>>>16)>>>0)/4294967296}function Ge(t,e,s,r,n,i){if(e.dots===0||t>=e.dots&&!e.repeat){const h=(t*8+(e.index&7))*4;i[0]=Fe(h)*r*1.4-.2*r,i[1]=Fe(h+1)*n*1.4-.2*n,i[2]=.2+.6*Fe(h+2),i[3]=0;return}const a=t%e.dots,l=(e.offset+a)*4,d=s[l]*e.scale,m=s[l+1]*e.scale;let o=e.cx+d*e.cos-m*e.sin,u=e.cy+d*e.sin+m*e.cos;t>=e.dots&&(o+=(Fe(t*2+1540483477)-.5)*3,u+=(Fe(t*2+1+1540483477)-.5)*3),i[0]=o,i[1]=u,i[2]=s[l+2]*e.scale,i[3]=s[l+3]*e.ink}function wt(t,e,s){const r=new Float32Array(t*Se);for(let n=0;n<t;n++){const i=n*Se,a=Math.random(),l=Math.random()*e,d=-50-Math.random()*s*1.5;r[i+M.cx]=l,r[i+M.cy]=d,r[i+M.lx]=l,r[i+M.ly]=d,r[i+M.size]=.2+.6*Math.random(),r[i+M.speed]=.08+.07*a,r[i+M.jitter]=Math.random()*2-1,r[i+M.driftOffX]=Math.random()*Math.PI*2,r[i+M.driftOffY]=Math.random()*Math.PI*2,r[i+M.driftSpdX]=.3+.7*Math.random(),r[i+M.driftSpdY]=.3+.7*Math.random(),r[i+M.driftRadius]=.2+.4*Math.random(),r[i+M.stagger]=.4*Math.random()}return r}function Qt(t,e,s,r,n){const i=wt(t,r,n),a=new Float32Array(4);for(let l=0;l<t;l++){const d=l*Se;Ge(l,e,s,r,n,a),i[d+M.cx]=i[d+M.lx]=a[0],i[d+M.cy]=i[d+M.ly]=a[1],i[d+M.size]=a[2],i[d+M.opacity]=a[3],i[d+M.landed]=1,i[d+M.heading]=e.index}return i}function Zt(t,e){return t&&e.set(t.subarray(0,Math.min(t.length,e.length))),e}const Oe=16,en=32;function tn(t,e){const s=t.getContext("2d");let r=new Float32Array(e*Se),n=new Float32Array(0),i=new Float32Array(0),a=1,l=null,d=null,m=0;const o=new Float32Array(4),u=new Float32Array(4);let h=new Float32Array(1),A=new Float32Array(1),R=new Float32Array(1),b=1,S=1;const U=f=>{l=f;const w=Ze(f);i=w.data,a=w.N,d=null},O=f=>{const w=f.steerParams;if(m=0,f.liveNoise&&l){const F=performance.now();i=Ze(f.field,f.texZ,i).data,d=null,m=performance.now()-F}const X=(F,v)=>Kt(i,a,f.field.texelPx,f.texOffX,f.texOffY,F,v),V=f.mouse,Z=f.mouseRadius,oe=f.mouseStrength*f.mouseSign,ee=Math.cos(w.sensorAngle),te=Math.sin(w.sensorAngle),P=w.sensorDist,z=f.walls,J=f.crowd,W=J.cellPx;if(J.enabled){const F=Math.ceil(f.vw/W)+1,v=Math.ceil(f.vh/W)+1;F!==b||v!==S?(b=F,S=v,h=new Float32Array(F*v),A=new Float32Array(F*v)):A.fill(0)}const B=(F,v)=>h[Math.min(S-1,Math.max(0,v))*b+Math.min(b-1,Math.max(0,F))],E=(F,v)=>{const Y=F/W,H=v/W,y=Math.floor(Y),c=Math.floor(H),p=Y-y,g=H-c,L=B(y,c)+(B(y+1,c)-B(y,c))*p,C=B(y,c+1)+(B(y+1,c+1)-B(y,c+1))*p;return L+(C-L)*g},de=(F,v,Y)=>{const H=F/W,y=v/W,c=Math.floor(H),p=Math.floor(y),g=H-c,L=y-p;for(let C=0;C<4;C++){const Q=C&1,q=C>>1,K=c+Q,j=p+q;K<0||j<0||K>=b||j>=S||(A[j*b+K]+=Y*(Q?g:1-g)*(q?L:1-L))}};for(let F=0;F<f.count;F++){const v=F*Se,Y=Math.sin(f.time*r[v+M.driftSpdX]+r[v+M.driftOffX])*r[v+M.driftRadius]*f.drift,H=Math.cos(f.time*r[v+M.driftSpdY]+r[v+M.driftOffY])*r[v+M.driftRadius]*f.drift;let y=r[v+M.cx],c=r[v+M.cy],p=r[v+M.vx],g=r[v+M.vy];r[v+M.lx]=y,r[v+M.ly]=c;const L=r[v+M.landed]>.5,C=q=>{if(z.enabled){if(q){const K=me=>{const ye=Math.max(0,1-me/Math.max(z.range,1));return z.strength*ye*ye};p+=K(y)-K(f.vw-y),g+=K(c)-K(f.vh-c);const j=z.margin,le=f.vw-z.margin,ue=f.vh-z.margin,ne=z.stiffness;y<j?p+=(j-y)*ne:y>le&&(p-=(y-le)*ne),c<j?g+=(j-c)*ne:c>ue&&(g-=(c-ue)*ne)}y<0&&(y=0,p=Math.abs(p)*z.bounce),y>f.vw&&(y=f.vw,p=-Math.abs(p)*z.bounce),c<0&&(c=0,g=Math.abs(g)*z.bounce),c>f.vh&&(c=f.vh,g=-Math.abs(g)*z.bounce)}},Q=()=>{if(!V||oe===0)return;const q=y-V.x,K=c-V.y,j=Math.sqrt(q*q+K*K);if(j<Z&&j>0){const le=(1-j/Z)*oe;p+=q/j*le,g+=K/j*le}};if(f.steer&&L){Ge(F,f.A,n,f.vw,f.vh,o);let q=Math.min(1,Math.max(0,o[1]/f.vh));f.B.index>=f.A.index&&(q=1-q);const K=.1+.4*w.stagger*(q*.85+r[v+M.stagger]/.4*.15),j=f.t>=K;Ge(F,j?f.B:f.A,n,f.vw,f.vh,o);const le=j?f.B.index:f.A.index;if(le!==r[v+M.heading]&&(r[v+M.heading]=le,r[v+M.landed]=2),r[v+M.landed]<1.5){const D=j?f.shiftB:f.shiftA,G=w.restFollow;y+=D.x*G,c+=D.y*G,r[v+M.lx]+=D.x*G,r[v+M.ly]+=D.y*G}const ue=o[0]+Y,ne=o[1]+H,me=Math.hypot(ue-y,ne-c)||1e-6,ye=z.enabled&&o[3]>0&&(ue<0||ne<0||ue>f.vw||ne>f.vh);ye&&(r[v+M.landed]=2);let xe=ue,ve=ne;if(ye){const D=Math.min(z.margin+.5*z.range,.5*Math.min(f.vw,f.vh));xe=Math.min(f.vw-D,Math.max(D,ue)),ve=Math.min(f.vh-D,Math.max(D,ne))}const Pe=xe-y,Ee=ve-c,Me=Math.hypot(Pe,Ee)||1e-6;let Re=0,x=0;if(z.enabled){const D=z.margin,G=f.vw-z.margin,ce=f.vh-z.margin;Re=y<D?D-y:y>G?G-y:0,x=c<D?D-c:c>ce?ce-c:0}const _=Re!==0||x!==0,ae=r[v+M.landed]>1.5,ie=Pe/Me,re=Ee/Me,pe=w.maxSpeed*(1+w.speedVar*r[v+M.jitter]),ge=ye&&z.cruise?pe:Math.min(pe,Me*w.arriveK),be=ye?1:!ae||me<=w.settleRadius?0:w.settleRadius>0?Math.min(1,(me-w.settleRadius)/w.settleRadius):1;let fe=p+(ie*ge-p)*w.attract,he=g+(re*ge-g)*w.attract;if(be>0){const D=Math.sqrt(p*p+g*g),G=D>.05?p/D:ie,ce=D>.05?g/D:re,ke=G*ie+ce*re,Le=G*re-ce*ie;let Ae=Math.max(-w.homing,Math.min(w.homing,Math.atan2(Le,ke)));const Ie=Math.min(1,Math.max(0,(ke-w.alignMin)/(1-w.alignMin)));if(Ie>0){const Ne=X(y+(G*ee-ce*te)*P,c+(G*te+ce*ee)*P),_e=X(y+(G*ee+ce*te)*P,c+(-G*te+ce*ee)*P);Ae+=Math.max(-w.maxTurn,Math.min(w.maxTurn,(Ne-_e)*w.turnGain))*Ie}const Ce=Math.cos(Ae),De=Math.sin(Ae);let Ue=G*Ce-ce*De,Ke=G*De+ce*Ce;if(_){const Ne=Math.hypot(Re,x),_e=Re/Ne,st=x/Ne,Je=Ue*_e+Ke*st;Je<0&&(Ue-=2*Je*_e,Ke-=2*Je*st)}const kt=ge*(.25+.75*Math.max(0,ke)),rt=D+(kt-D)*w.accel;fe+=(Ue*rt-fe)*be,he+=(Ke*rt-he)*be}else if(!ae&&w.restNoise>0){const D=Math.sqrt(fe*fe+he*he);if(D>.05){const G=fe/D,ce=he/D,ke=w.restNoise,Le=X(y+(G*ee-ce*te)*P,c+(G*te+ce*ee)*P),Ae=X(y+(G*ee+ce*te)*P,c+(-G*te+ce*ee)*P),Ie=Math.max(-w.maxTurn*ke,Math.min(w.maxTurn*ke,(Le-Ae)*w.turnGain*ke)),Ce=Math.cos(Ie),De=Math.sin(Ie),Ue=fe*Ce-he*De;he=fe*De+he*Ce,fe=Ue}}let se=0;if(J.enabled&&o[3]>0){const D=Math.min(1,Math.max(0,(me-J.distance)/J.distance));if(se=D*D*(3-2*D),se>0){const G=y+(Fe(F*2+77)-.5)*W,ce=c+(Fe(F*2+78)-.5)*W,ke=(E(G+W,ce)-E(G-W,ce))*.5,Le=(E(G,ce+W)-E(G,ce-W))*.5,Ae=J.strength*.05*se;fe-=ke*Ae,he-=Le*Ae}}p=fe,g=he,Q(),p*=w.damping,g*=w.damping,y+=p,c+=g,C(ae),se>0&&de(y,c,se),ae&&Math.hypot(o[0]+Y-y,o[1]+H-c)<Math.max(w.settleRadius,4)&&(r[v+M.landed]=1),r[v+M.size]+=(o[2]-r[v+M.size])*.1,r[v+M.opacity]+=(o[3]-r[v+M.opacity])*.1}else{Ge(F,f.A,n,f.vw,f.vh,o),Ge(F,f.B,n,f.vw,f.vh,u);const q=f.eased,K=o[0]+(u[0]-o[0])*q,j=o[1]+(u[1]-o[1])*q,le=o[2]+(u[2]-o[2])*q,ue=o[3]+(u[3]-o[3])*q;Q(),p*=.9,g*=.9;const ne=f.t>.005?.12:r[v+M.speed];y+=(K+Y-y)*ne+p,c+=(j+H-c)*ne+g,L&&C(!1),r[v+M.size]+=(le-r[v+M.size])*ne,r[v+M.opacity]+=(ue-r[v+M.opacity])*ne,!L&&Math.abs(K+Y-y)<2&&Math.abs(j+H-c)<2&&(r[v+M.landed]=1,r[v+M.heading]=f.eased>=.5?f.B.index:f.A.index,p=0,g=0)}r[v+M.cx]=y,r[v+M.cy]=c,r[v+M.vx]=p,r[v+M.vy]=g}if(J.enabled)if(!J.blur)h.set(A);else{const F=b,v=S,Y=A,H=h;R.length!==F*v&&(R=new Float32Array(F*v));const y=R;for(let c=0;c<v;c++){const p=c*F;for(let g=0;g<F;g++){const L=g>1?g-2:0,C=g>0?g-1:0,Q=g<F-1?g+1:F-1,q=g<F-2?g+2:F-1;y[p+g]=Y[p+L]+4*Y[p+C]+6*Y[p+g]+4*Y[p+Q]+Y[p+q]}}for(let c=0;c<v;c++){const p=(c>1?c-2:0)*F,g=(c>0?c-1:0)*F,L=c*F,C=(c<v-1?c+1:v-1)*F,Q=(c<v-2?c+2:v-1)*F;for(let q=0;q<F;q++)H[L+q]=(y[p+q]+4*y[g+q]+6*y[L+q]+4*y[C+q]+y[Q+q])/256}}};let T=new Int32Array(Oe+1),I=new Int32Array(e),N=new Int8Array(e);const $=f=>{if(!d){const w=document.createElement("canvas");w.width=w.height=a;const X=w.getContext("2d"),V=X.createImageData(a,a);for(let Z=0;Z<i.length;Z++)V.data[Z*4]=200,V.data[Z*4+1]=90,V.data[Z*4+2]=40,V.data[Z*4+3]=i[Z]*127;X.putImageData(V,0,0),d=s.createPattern(w,"repeat")}s.save(),s.scale(f.texelPx,f.texelPx),s.translate(-f.texOffX,-f.texOffY),s.fillStyle=d,s.fillRect(f.texOffX,f.texOffY,f.vw/f.texelPx,f.vh/f.texelPx),s.restore()};return{kind:"canvas2d",device:"CPU (main thread) + Canvas 2D",setClouds:(f,w)=>{n=w},setField:U,setState:f=>{r=f,I.length!==e&&(I=new Int32Array(e),N=new Int8Array(e))},step:O,render:f=>{s.setTransform(f.dpr,0,0,f.dpr,0,0),s.clearRect(0,0,f.vw,f.vh),f.showField&&$(f);const w=f.alpha,X=f.count,V=P=>{const z=r[P+M.landed];return z>.5&&z<1.5?f.streak*f.restStreak:f.streak};T.fill(0);for(let P=0;P<X;P++){const z=P*Se;let J=r[z+M.opacity];if(f.streakFade>0&&f.streak>0){const B=Math.max(.3,r[z+M.size]*f.size),E=r[z+M.cx]-r[z+M.lx],de=r[z+M.cy]-r[z+M.ly],F=Math.sqrt(E*E+de*de)*V(z);F>2*B&&(J*=1-f.streakFade*(1-2*B/(2*B+F)))}const W=J<.005?-1:Math.min(Oe-1,J*Oe|0);N[P]=W,W>=0&&T[W+1]++}for(let P=1;P<=Oe;P++)T[P]+=T[P-1];const Z=T.slice(0,Oe);for(let P=0;P<X;P++){const z=N[P];z>=0&&(I[Z[z]++]=P)}const{r:oe,g:ee,b:te}=f.ink;for(let P=0;P<Oe;P++){const z=T[P],J=T[P+1];if(z!==J){s.fillStyle=`rgba(${oe},${ee},${te},${(P+.5)/Oe})`,s.beginPath();for(let W=z;W<J;W++){W>z&&(W-z)%en===0&&(s.fill(),s.beginPath());const B=I[W]*Se,E=Math.max(.3,r[B+M.size]*f.size),de=r[B+M.lx],F=r[B+M.ly],v=r[B+M.cx]-de,Y=r[B+M.cy]-F,H=de+v*w,y=F+Y*w,c=V(B),p=v*c,g=Y*c,L=p*p+g*g;if(L>4*E*E){const C=Math.sqrt(L),Q=-g/C,q=p/C,K=E,j=E*(1-f.streakTaper),le=H-p,ue=y-g;s.moveTo(H-Q*K,y-q*K),s.lineTo(H+Q*K,y+q*K),s.lineTo(le+Q*j,ue+q*j),s.lineTo(le-Q*j,ue-q*j),s.closePath()}else if(E<1.25){const C=E*1.7725;s.rect(H-C/2,y-C/2,C,C)}else s.moveTo(H+E,y),s.arc(H,y,E,0,2*Math.PI)}s.fill()}}},resize:(f,w,X)=>{t.width=Math.max(1,Math.round(f*X)),t.height=Math.max(1,Math.round(w*X)),t.style.width=`${f}px`,t.style.height=`${w}px`},exportState:async()=>r.slice(),timings:()=>({gpuSimMs:null,gpuDrawMs:null,noiseMs:m}),destroy:()=>{T=new Int32Array(0)}}}const et=["Cx","Cy","Scale","Cos","Sin","Offset","Dots","Ink","Repeat","Index"],nn=["vw","vh","count","time","t","eased","drift","steer","mouseX","mouseY","mouseSign","mouseRadius","mouseStrength","texOffX","texOffY","texN","texelPx","attract","arriveK","settleRadius","damping","homing","accel","maxSpeed","speedVar","stagger","sensorDist","sensorAngle","turnGain","maxTurn","alignMin","zTime","features","octaves","lacunarity","gain","ridged","sharpness","normMin","normMax",...et.map(t=>`a${t}`),...et.map(t=>`b${t}`),"aShiftX","aShiftY","bShiftX","bShiftY","restFollow","restNoise","walls","wallMargin","wallBounce","crowd","crowdDist","cellPx","gridW","gridH","wallK","wallRange","blur","wallStrength","wallCruise","pad2"],rn=["vw","vh","dpr","alpha","inkR","inkG","inkB","size","streak","streakTaper","streakFade","texOffX","texOffY","texN","texelPx","restStreak"];function ht(t){const e=new Float32Array(t.length),s=Object.fromEntries(t.map((r,n)=>[r,n]));return{data:e,set:(r,n)=>{e[s[r]]=n},wgsl:t.map(r=>`${r}: f32`).join(", ")}}const vt=`
// 72 bytes; layout matches STRIDE / P in particles.ts.
struct Particle {
  pos: vec2f, prev: vec2f, vel: vec2f,
  size: f32, opacity: f32, speed: f32, jitter: f32,
  driftOff: vec2f, driftSpd: vec2f,
  driftRadius: f32, stagger: f32, landed: f32, heading: f32,
}
`,bt=`
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
${bt}

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
`}function cn(t){return`
struct R { ${t} }
${vt}
@group(0) @binding(0) var<uniform> r: R;
@group(0) @binding(1) var<storage, read> ps: array<Particle>;
@group(0) @binding(3) var<storage, read> field: array<f32>;
${bt}

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
`}function tt(){return typeof navigator<"u"&&"gpu"in navigator&&!!navigator.gpu}const $e=4;async function ln(t,e){if(!tt())throw new Error("WebGPU is not available in this browser");const s=await navigator.gpu.requestAdapter({powerPreference:"high-performance"});if(!s)throw new Error("No WebGPU adapter");const r=s.features.has("timestamp-query"),n=await s.requestDevice({requiredFeatures:r?["timestamp-query"]:[],requiredLimits:{maxStorageBufferBindingSize:s.limits.maxStorageBufferBindingSize,maxBufferSize:s.limits.maxBufferSize}});let i=!1;n.lost.then(x=>{i=!0,x.reason!=="destroyed"&&console.warn("[particulator] WebGPU device lost:",x.message)});const a=t.getContext("webgpu"),l=navigator.gpu.getPreferredCanvasFormat();a.configure({device:n,format:l,alphaMode:"premultiplied"});const d=s.info,m=`WebGPU · ${[d?.vendor,d?.architecture].filter(Boolean).join(" ")||d?.description||"GPU"}`,o=ht(nn),u=ht(rn),h=GPUBufferUsage,A=n.createBuffer({size:o.data.byteLength,usage:h.UNIFORM|h.COPY_DST}),R=n.createBuffer({size:u.data.byteLength,usage:h.UNIFORM|h.COPY_DST}),b=e*Se*4,S=n.createBuffer({size:Math.max(16,b),usage:h.STORAGE|h.COPY_DST|h.COPY_SRC}),U=n.createBuffer({size:1024*4,usage:h.STORAGE|h.COPY_DST});let O=n.createBuffer({size:16,usage:h.STORAGE|h.COPY_DST}),T=n.createBuffer({size:4,usage:h.STORAGE|h.COPY_DST}),I=1,N=0,$=1,k=new Float32Array(1),f=!1;const w=GPUShaderStage.COMPUTE,X=GPUShaderStage.VERTEX,V=GPUShaderStage.FRAGMENT,Z=x=>n.createBindGroupLayout({entries:x}),oe=Z([{binding:0,visibility:w,buffer:{type:"uniform"}},{binding:1,visibility:w,buffer:{type:"storage"}},{binding:2,visibility:w,buffer:{type:"read-only-storage"}},{binding:3,visibility:w,buffer:{type:"read-only-storage"}},{binding:4,visibility:w,buffer:{type:"read-only-storage"}},{binding:5,visibility:w,buffer:{type:"storage"}}]),ee=Z([{binding:0,visibility:w,buffer:{type:"uniform"}},{binding:1,visibility:w,buffer:{type:"read-only-storage"}},{binding:2,visibility:w,buffer:{type:"storage"}}]),te=Z([{binding:0,visibility:w,buffer:{type:"uniform"}},{binding:1,visibility:w,buffer:{type:"storage"}},{binding:2,visibility:w,buffer:{type:"read-only-storage"}}]),P=Z([{binding:0,visibility:X|V,buffer:{type:"uniform"}},{binding:1,visibility:X,buffer:{type:"read-only-storage"}},{binding:3,visibility:V,buffer:{type:"read-only-storage"}}]),z=(x,_,ae)=>n.createComputePipeline({layout:n.createPipelineLayout({bindGroupLayouts:[_]}),compute:{module:n.createShaderModule({code:x,label:ae}),entryPoint:"main"}}),J=z(an(o.wgsl),oe,"particulator sim"),W=z(on(o.wgsl),te,"particulator noise"),B=z(sn(o.wgsl),ee,"particulator crowd blur"),E=n.createShaderModule({code:cn(u.wgsl),label:"particulator render"}),de=4,F={color:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"},alpha:{srcFactor:"one",dstFactor:"one-minus-src-alpha",operation:"add"}},v=n.createPipelineLayout({bindGroupLayouts:[P]}),Y=n.createRenderPipeline({layout:v,vertex:{module:E,entryPoint:"vs"},fragment:{module:E,entryPoint:"fs",targets:[{format:l,blend:F}]},primitive:{topology:"triangle-strip"},multisample:{count:de}}),H=n.createRenderPipeline({layout:v,vertex:{module:E,entryPoint:"vsField"},fragment:{module:E,entryPoint:"fsField",targets:[{format:l,blend:F}]},primitive:{topology:"triangle-list"},multisample:{count:de}});let y=[0,1].map(()=>n.createBuffer({size:16,usage:h.STORAGE|h.COPY_DST})),c=1,p=1,g,L,C,Q;const q=()=>{const x=(_,ae)=>n.createBindGroup({layout:_,entries:ae.map(([ie,re])=>({binding:ie,resource:{buffer:re}}))});g=x(oe,[[0,A],[1,S],[2,O],[3,T],[4,y[1]],[5,y[0]]]),L=x(ee,[[0,A],[1,y[0]],[2,y[1]]]),C=x(te,[[0,A],[1,T],[2,U]]),Q=x(P,[[0,R],[1,S],[3,T]])};q();const K=$e*2+2,j=r?n.createQuerySet({type:"timestamp",count:K}):null,le=r?n.createBuffer({size:K*8,usage:h.QUERY_RESOLVE|h.COPY_SRC}):null,ue=r?[0,1,2].map(()=>n.createBuffer({size:K*8,usage:h.MAP_READ|h.COPY_DST})):[],ne=new Set;let me=0,ye=null,xe=null,ve=null;const Pe=()=>((!ve||ve.width!==t.width||ve.height!==t.height)&&(ve?.destroy(),ve=n.createTexture({size:[t.width,t.height],format:l,sampleCount:de,usage:GPUTextureUsage.RENDER_ATTACHMENT})),ve.createView());return{kind:"webgpu",device:m,setClouds:(x,_)=>{O.destroy(),O=n.createBuffer({size:Math.max(16,_.byteLength),usage:h.STORAGE|h.COPY_DST}),_.byteLength&&n.queue.writeBuffer(O,0,_),q()},setField:x=>{const _=Ze(x);k=_.data,N=_.min,$=_.max,(_.N!==I||T.size!==_.N*_.N*4)&&(T.destroy(),T=n.createBuffer({size:_.N*_.N*4,usage:h.STORAGE|h.COPY_DST}),I=_.N,q());const{perm:ae,permMod12:ie}=xt(x.seed|0),re=new Uint32Array(1024);re.set(ae,0),re.set(ie,512),n.queue.writeBuffer(U,0,re),n.queue.writeBuffer(T,0,k)},setState:x=>n.queue.writeBuffer(S,0,x.subarray(0,e*Se)),step:x=>{if(i)return;const _=x.liveNoise;!_&&f&&n.queue.writeBuffer(T,0,k),f=_;const ae=x.steerParams,ie=x.field;o.set("vw",x.vw),o.set("vh",x.vh),o.set("count",x.count),o.set("time",x.time),o.set("t",x.t),o.set("eased",x.eased),o.set("drift",x.drift),o.set("steer",x.steer?1:0),o.set("mouseX",x.mouse?.x??0),o.set("mouseY",x.mouse?.y??0),o.set("mouseSign",x.mouse?x.mouseSign:0),o.set("mouseRadius",x.mouseRadius),o.set("mouseStrength",x.mouseStrength),o.set("aShiftX",x.shiftA.x),o.set("aShiftY",x.shiftA.y),o.set("bShiftX",x.shiftB.x),o.set("bShiftY",x.shiftB.y),o.set("texOffX",x.texOffX%I),o.set("texOffY",x.texOffY%I),o.set("texN",I),o.set("texelPx",ie.texelPx);for(const D of["attract","arriveK","settleRadius","damping","homing","accel","maxSpeed","speedVar","stagger","sensorDist","sensorAngle","turnGain","maxTurn","alignMin","restFollow","restNoise"])o.set(D,ae[D]);o.set("zTime",x.texZ),o.set("features",ie.features),o.set("octaves",ie.octaves),o.set("lacunarity",ie.lacunarity),o.set("gain",ie.gain),o.set("ridged",ie.ridged?1:0),o.set("sharpness",ie.sharpness),o.set("normMin",N),o.set("normMax",$);for(const[D,G]of[["a",x.A],["b",x.B]])o.set(`${D}Cx`,G.cx),o.set(`${D}Cy`,G.cy),o.set(`${D}Scale`,G.scale),o.set(`${D}Cos`,G.cos),o.set(`${D}Sin`,G.sin),o.set(`${D}Offset`,G.offset),o.set(`${D}Dots`,G.dots),o.set(`${D}Ink`,G.ink),o.set(`${D}Repeat`,G.repeat?1:0),o.set(`${D}Index`,G.index);const re=x.crowd,pe=x.walls,ge=Math.ceil(x.vw/re.cellPx)+1,be=Math.ceil(x.vh/re.cellPx)+1;re.enabled&&(ge!==c||be!==p)&&(c=ge,p=be,y.forEach(D=>D.destroy()),y=[0,1].map(()=>n.createBuffer({size:c*p*4,usage:h.STORAGE|h.COPY_DST})),q()),o.set("walls",pe.enabled?1:0),o.set("wallMargin",pe.margin),o.set("wallBounce",pe.bounce),o.set("wallK",pe.stiffness),o.set("wallRange",pe.range),o.set("wallStrength",pe.strength),o.set("wallCruise",pe.cruise?1:0),o.set("blur",re.blur?1:0),o.set("crowd",re.enabled?re.strength:0),o.set("crowdDist",re.distance),o.set("cellPx",re.cellPx),o.set("gridW",c),o.set("gridH",p),n.queue.writeBuffer(A,0,o.data);const fe=n.createCommandEncoder(),he=me<$e&&j?{timestampWrites:{querySet:j,beginningOfPassWriteIndex:me*2,endOfPassWriteIndex:me*2+1}}:{};re.enabled&&fe.clearBuffer(y[0]);const se=fe.beginComputePass(he);_&&(se.setPipeline(W),se.setBindGroup(0,C),se.dispatchWorkgroups(Math.ceil(I/8),Math.ceil(I/8))),se.setPipeline(J),se.setBindGroup(0,g),se.dispatchWorkgroups(Math.ceil(x.count/256)),re.enabled&&(se.setPipeline(B),se.setBindGroup(0,L),se.dispatchWorkgroups(Math.ceil(c/8),Math.ceil(p/8))),se.end(),n.queue.submit([fe.finish()]),me++},render:x=>{if(i)return;u.set("vw",x.vw),u.set("vh",x.vh),u.set("dpr",x.dpr),u.set("alpha",x.alpha),u.set("inkR",x.ink.r/255),u.set("inkG",x.ink.g/255),u.set("inkB",x.ink.b/255),u.set("size",x.size),u.set("streak",x.streak),u.set("streakTaper",x.streakTaper),u.set("streakFade",x.streakFade),u.set("restStreak",x.restStreak),u.set("texOffX",x.texOffX%I),u.set("texOffY",x.texOffY%I),u.set("texN",I),u.set("texelPx",x.texelPx),n.queue.writeBuffer(R,0,u.data);const _=n.createCommandEncoder(),ae=$e*2,ie=_.beginRenderPass({colorAttachments:[{view:Pe(),resolveTarget:a.getCurrentTexture().createView(),clearValue:{r:0,g:0,b:0,a:0},loadOp:"clear",storeOp:"discard"}],...j?{timestampWrites:{querySet:j,beginningOfPassWriteIndex:ae,endOfPassWriteIndex:ae+1}}:{}});ie.setBindGroup(0,Q),x.showField&&(ie.setPipeline(H),ie.draw(3)),ie.setPipeline(Y),ie.draw(4,x.count),ie.end();const re=Math.min(me,$e);me=0;let pe;if(j&&le&&(_.resolveQuerySet(j,0,K,le,0),pe=ue.find(ge=>!ne.has(ge)),pe&&_.copyBufferToBuffer(le,0,pe,0,K*8)),n.queue.submit([_.finish()]),pe){const ge=pe;ne.add(ge),ge.mapAsync(GPUMapMode.READ).then(()=>{const be=new BigUint64Array(ge.getMappedRange().slice(0));ge.unmap(),ne.delete(ge);let fe=0;for(let se=0;se<re;se++)fe+=Number(be[se*2+1]-be[se*2]);const he=Number(be[ae+1]-be[ae]);if(fe>=0&&he>=0&&fe<1e9&&he<1e9){const se=(D,G)=>D===null?G:D+(G-D)*.08;re>0&&(ye=se(ye,fe/1e6)),xe=se(xe,he/1e6)}},()=>ne.delete(ge))}},resize:(x,_,ae)=>{t.width=Math.max(1,Math.round(x*ae)),t.height=Math.max(1,Math.round(_*ae)),t.style.width=`${x}px`,t.style.height=`${_}px`},exportState:async()=>{const x=n.createBuffer({size:b,usage:h.MAP_READ|h.COPY_DST}),_=n.createCommandEncoder();_.copyBufferToBuffer(S,0,x,0,b),n.queue.submit([_.finish()]),await x.mapAsync(GPUMapMode.READ);const ae=new Float32Array(x.getMappedRange().slice(0));return x.unmap(),x.destroy(),ae},timings:()=>({gpuSimMs:ye,gpuDrawMs:xe,noiseMs:0}),destroy:()=>{a.unconfigure(),n.destroy()}}}function fn(t,e){if(t.mode!=="viewport"||!t.breakpoints?.length)return-1;let s=-1;return t.breakpoints.forEach((r,n)=>{e<=r.maxWidth&&(s<0||r.maxWidth<t.breakpoints[s].maxWidth)&&(s=n)}),s}function dn(t,e,{vw:s,vh:r}){if(t.mode==="viewport"){let{x:l,y:d,height:m}=t,o=t.rotation??0;const u=fn(t,s);if(u>=0){const h=t.breakpoints[u];l=h.x??l,d=h.y??d,m=h.height??m,o=h.rotation??o}return{cx:l*s,cy:d*r,height:m*r,rot:o*Math.PI/180}}const n=typeof document<"u"?document.querySelector(t.selector):null;if(!n)return null;const i=n.getBoundingClientRect(),a=t.fit==="cover"?Math.max(i.height,i.width/e):Math.min(i.height,i.width/e);return{cx:i.left+(t.x??.5)*i.width,cy:i.top+(t.y??.5)*i.height,height:a*(t.scale??1),rot:(t.rotation??0)*Math.PI/180}}function un(t,e,s,r,n,i){const a=dn(e.placement,s.aspect,n),l=e.overflow==="repeat",d=a??(i?{cx:i.cx,cy:i.cy,height:i.scale,rot:Math.atan2(i.sin,i.cos)}:{cx:n.vw/2,cy:-n.vh,height:n.vh*.3,rot:0});return{index:t,cx:d.cx,cy:d.cy,scale:d.height,cos:Math.cos(d.rot),sin:Math.sin(d.rot),offset:s.offset,dots:s.count,ink:l&&r>s.count&&s.count>0?s.count/r:1,repeat:l,drift:e.drift??1}}const Ye=1e3/60,mt=4,Be=new Map;function pn(t,e){const s=JSON.stringify([e,t.source]);let r=Be.get(s);return r||(r=hn(t,e),Be.set(s,r),r.then(n=>{n||Be.delete(s)}),Be.size>64&&Be.delete(Be.keys().next().value)),r}async function hn(t,e){const s=new URL(t.source.src,e).href;try{if(t.source.type==="dots"){const r=await fetch(s);if(!r.ok)throw new Error(`${r.status} ${s}`);return Ut(await r.arrayBuffer())}return await jt(s,t.source.dotter)}catch(r){return console.warn(`[particulator] scene "${t.id}" failed to load:`,r),null}}function mn(t){let e=Xt(t.effect);const s=t.baseUrl??(typeof document<"u"?document.baseURI:"http://localhost/"),r=t.container??document.body;let n=i();function i(){const c=document.createElement("canvas");return c.setAttribute("aria-hidden","true"),c.dataset.particulator="",c.style.cssText=`position:fixed;inset:0;pointer-events:none;z-index:${e.stage.zIndex}`,t.className&&(c.className=t.className),c}r.appendChild(n);let a=null,l=[],d=[],m=new Float32Array(0),o=ut(e.timeline.driver),u=[],h=[],A=!1,R=0,b=!1,S=0,U={from:0,to:0,t:0},O=null,T=0,I=0,N=0,$=0,k=0,f=0,w=null;const X=c=>{w={x:c.clientX,y:c.clientY}},V=()=>{w=null},Z=()=>a?.resize(window.innerWidth,window.innerHeight,window.devicePixelRatio||1);window.addEventListener("mousemove",X),document.addEventListener("mouseleave",V),window.addEventListener("resize",Z);const oe=typeof matchMedia<"u"?matchMedia("(prefers-color-scheme: dark)"):null,ee=()=>{const c=e.look.ink;if(typeof c=="string")return ft(c);const p=e.look.theme,g=p.startsWith("class:")?document.documentElement.classList.contains(p.slice(6)):p==="media"?!!oe?.matches:!1;return ft(g?c.dark:c.light)},te=(c,p)=>c===0?p:c+(p-c)*.08,P={frameMs:0,steps:0,step:0,render:0,noise:0};async function z(){l=(await Promise.all(e.scenes.map(g=>pn(g,s)))).map(g=>g?Jt(g):{aspect:1,count:0,data:new Float32Array(0)}),d=[];let p=0;for(const g of l)d.push(p),p+=g.count;m=new Float32Array(p*4),l.forEach((g,L)=>m.set(g.data,d[L]*4)),u=[]}const J=()=>({vw:window.innerWidth,vh:window.innerHeight});function W(){const c=J(),p=e.particles.count;u=e.scenes.map((g,L)=>un(L,g,{aspect:l[L]?.aspect??1,count:l[L]?.count??0,offset:d[L]??0},p,c,u[L]))}function B(){const{vw:c,vh:p}=J(),g=e.particles.count;return e.motion.entrance==="none"&&u[0]?Qt(g,u[0],m,c,p):wt(g,c,p)}async function E(c,p){const g=e.particles.count,L=i();let C;try{C=c==="webgpu"?await ln(L,g):tn(L,g)}catch(q){if(c==="webgpu")return console.warn("[particulator] WebGPU unavailable, falling back to Canvas 2D:",q),E("canvas2d",p);throw q}if(A){C.destroy();return}C.resize(window.innerWidth,window.innerHeight,window.devicePixelRatio||1),C.setClouds(l,m),C.setField(e.field),W(),C.setState(Zt(p,B()));const Q=a;a=C,n.replaceWith(L),n=L,Q?.destroy()}function de(c){if(c!=="auto")return c;if(tt())return"webgpu";const p=t.canvas2dMaxCount??3e4;return e.particles.count>p&&(e=Ve(e,{particles:{count:p}})),"canvas2d"}function F(c){if(R=requestAnimationFrame(F),!a||A)return;const p=f?Math.min(c-f,250):Ye;P.frameMs=te(P.frameMs,p),f=c,k+=p;const g=e.scenes.length,L=o.state(c,g),C=O!==null&&O<g?{from:O,to:O,t:0}:L;U=C,W();const Q=u[C.from],q=u[C.to];if(!Q||!q)return;const{vw:K,vh:j}=J(),le=C.t*C.t*(3-2*C.t),ue=Q.drift+(q.drift-Q.drift)*C.t,ne=e.interaction.mouse,me=x=>{const _=h[x.index];return _?{x:x.cx-_.x,y:x.cy-_.y}:{x:0,y:0}},ye={x:0,y:0};let xe=0;const ve=performance.now();let Pe=0;for(;k>=Ye&&xe<mt;)T+=.016,I+=e.field.drift,N+=e.field.drift*.37,e.field.live&&($+=e.field.liveSpeed),a.step({vw:K,vh:j,count:e.particles.count,time:T,A:Q,B:q,t:C.t,eased:le,drift:ue,shiftA:xe===0?me(Q):ye,shiftB:xe===0?me(q):ye,steer:e.motion.preset==="steer",mouse:w,mouseSign:ne.mode==="repel"?1:ne.mode==="attract"?-1:0,mouseRadius:ne.radius,mouseStrength:ne.strength,texOffX:I,texOffY:N,texZ:$,liveNoise:e.field.live,steerParams:e.motion.steer,field:e.field,walls:e.motion.walls,crowd:e.motion.crowd}),Pe+=a.timings().noiseMs,k-=Ye,xe===0&&(h=u.map(x=>({x:x.cx,y:x.cy}))),xe++;xe===mt&&(k=0);const Ee=performance.now(),Me=e.look;a.render({vw:K,vh:j,dpr:window.devicePixelRatio||1,count:e.particles.count,alpha:Math.min(1,k/Ye),ink:ee(),size:Me.size,streak:Me.streak,streakTaper:Me.streakTaper,streakFade:Me.streakFade,restStreak:e.motion.preset==="steer"?Me.restStreak:1,showField:b,texOffX:I,texOffY:N,texelPx:e.field.texelPx});const Re=performance.now();P.steps=te(P.steps,xe),P.step=te(P.step,Ee-ve-Pe),P.noise=te(P.noise,Pe),P.render=te(P.render,Re-Ee)}const v=(async()=>{await z(),W(),await E(de(t.engine??"auto"),null),o.setProgress?.(S),R=requestAnimationFrame(F)})(),Y=c=>typeof c=="number"?c:e.scenes.findIndex(p=>p.id===c),H=(c,p)=>JSON.stringify(c)===JSON.stringify(p);return{get canvas(){return n},get effect(){return e},ready:v,get progress(){return S},set progress(c){S=c,o.setProgress?.(c)},goTo:(c,p)=>{const g=Y(c);if(!(g<0)){if(!o.goTo){console.warn("[particulator] goTo() needs the api timeline driver");return}o.goTo(g,p?.duration??2e3,performance.now())}},update:async c=>{await v;const p=e;e=Ve(e,c),H(p.timeline,e.timeline)||(o=ut(e.timeline.driver),o.setProgress?.(S)),n&&p.stage.zIndex!==e.stage.zIndex&&(n.style.zIndex=String(e.stage.zIndex)),["size","features","octaves","lacunarity","gain","ridged","sharpness","seed"].some(L=>p.field[L]!==e.field[L])&&a?.setField(e.field),H(p.scenes.map(L=>L.source),e.scenes.map(L=>L.source))||(await z(),a?.setClouds(l,m)),p.particles.count!==e.particles.count&&a&&await E(a.kind,await a.exportState())},setEngine:async c=>{await v,!(!a||a.kind===c)&&await E(c,await a.exportState())},get showField(){return b},set showField(c){b=c},stats:()=>{const c=a?.timings();return{engine:a?.kind??"canvas2d",device:a?.device??"starting…",count:e.particles.count,fps:P.frameMs>0?1e3/P.frameMs:0,frameMs:P.frameMs,stepsPerFrame:P.steps,cpuStepMs:P.step,cpuRenderMs:P.render,cpuNoiseMs:P.noise,gpuSimMs:c?.gpuSimMs??null,gpuDrawMs:c?.gpuDrawMs??null}},scenes:()=>e.scenes.map((c,p)=>{const g=u[p],L=l[p]?.aspect??1,C=g?.scale??0;return{id:c.id,index:p,cx:g?.cx??0,cy:g?.cy??0,width:C*L,height:C,rotation:g?Math.atan2(g.sin,g.cos):0,aspect:L,dots:l[p]?.count??0,element:c.placement.mode==="element"?document.querySelector(c.placement.selector):null}}),transition:()=>U,get preview(){return O},set preview(c){O=c},destroy:()=>{A=!0,cancelAnimationFrame(R),a?.destroy(),a=null,n.remove(),window.removeEventListener("mousemove",X),document.removeEventListener("mouseleave",V),window.removeEventListener("resize",Z)}}}const gn=1,yn=[{id:"sphere",source:{type:"image",src:"img/sphere.png",dotter:{count:3e4,seed:3}},placement:{mode:"element",selector:'[data-particulator="sphere"]',fit:"contain",x:.4994,y:.4969,scale:1}},{id:"glyph",source:{type:"image",src:"img/glyph.png",dotter:{count:3e4,seed:3}},placement:{mode:"element",selector:'[data-particulator="glyph"]',fit:"contain"}},{id:"star",source:{type:"image",src:"img/star.png",dotter:{count:3e4,seed:3}},placement:{mode:"element",selector:'[data-particulator="star"]',fit:"contain"}}],xn={driver:{type:"scroll",sections:"section",mode:"snap"}},wn={steer:{attract:.205,stagger:.55}},vn={ink:{light:"#1a1a1a",dark:"#f5f1e8"},theme:"class:dark"},bn={zIndex:1},Mn={version:gn,scenes:yn,timeline:xn,motion:wn,look:vn,stage:bn},kn=Mn,nt=new URLSearchParams(location.search),Te=mn({effect:kn,baseUrl:new URL("/particulator/",location.origin).href,engine:nt.get("engine")??"auto"});window.stage=Te;const Mt=nt.get("studio")!=="0";Mt&&At(async()=>{const{mountStudio:t,fileSystemAccess:e,download:s}=await import("./index-fdoZiUx3.js");return{mountStudio:t,fileSystemAccess:e,download:s}},[]).then(({mountStudio:t,fileSystemAccess:e,download:s})=>t(Te,{hidden:nt.get("studio")==="hidden",storage:"showSaveFilePicker"in window?e():s()})).then(t=>{window.studio=t});const gt=document.getElementById("hud");if(Mt)gt.remove();else{const t=s=>s===null?"n/a":`${s.toFixed(2)}ms`,e=()=>{const s=Te.stats();gt.innerHTML=`${s.device} · ${s.count.toLocaleString()} · ${s.fps.toFixed(0)} fps · cpu ${t(s.cpuStepMs+s.cpuRenderMs)} · gpu ${t(s.gpuSimMs!==null&&s.gpuDrawMs!==null?s.gpuSimMs+s.gpuDrawMs:null)} `+(tt()?`<button id="swap">switch to ${s.engine==="webgpu"?"Canvas 2D":"WebGPU"}</button>`:""),document.getElementById("swap")?.addEventListener("click",()=>{Te.setEngine(s.engine==="webgpu"?"canvas2d":"webgpu")})};Te.ready.then(()=>{e(),setInterval(e,500)})}addEventListener("keydown",t=>{t.target instanceof HTMLInputElement||(t.key==="f"&&(Te.showField=!Te.showField),t.key==="d"&&document.body.classList.toggle("debug"),t.key==="t"&&document.documentElement.classList.toggle("dark"))});export{Rt as D,fn as a,Xt as r,Sn as s};
