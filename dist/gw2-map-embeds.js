(()=>{"use strict";var e,t,r={},n={};function o(e){var t=n[e];if(void 0!==t)return t.exports;var a=n[e]={exports:{}};return r[e].call(a.exports,a,a.exports,o),a.exports}o.m=r,o.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return o.d(t,{a:t}),t},o.d=(e,t)=>{for(var r in t)o.o(t,r)&&!o.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},o.f={},o.e=e=>Promise.all(Object.keys(o.f).reduce(((t,r)=>(o.f[r](e,t),t)),[])),o.u=e=>"js/"+e+"."+{369:"ea9da7416d7fc46d",854:"b89bf0662b1486e6"}[e]+".js",o.miniCssF=e=>"css/"+e+".eda20b5bf0bcce98.css",o.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),e={},t="gw2-map-embeds:",o.l=(r,n,a,i)=>{if(e[r])e[r].push(n);else{var l,d;if(void 0!==a)for(var s=document.getElementsByTagName("script"),u=0;u<s.length;u++){var c=s[u];if(c.getAttribute("src")==r||c.getAttribute("data-webpack")==t+a){l=c;break}}l||(d=!0,(l=document.createElement("script")).charset="utf-8",l.timeout=120,o.nc&&l.setAttribute("nonce",o.nc),l.setAttribute("data-webpack",t+a),l.src=r),e[r]=[n];var p=(t,n)=>{l.onerror=l.onload=null,clearTimeout(f);var o=e[r];if(delete e[r],l.parentNode&&l.parentNode.removeChild(l),o&&o.forEach((e=>e(n))),t)return t(n)},f=setTimeout(p.bind(null,void 0,{type:"timeout",target:l}),12e4);l.onerror=p.bind(null,l.onerror),l.onload=p.bind(null,l.onload),d&&document.head.appendChild(l)}},o.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},(()=>{var e;o.g.importScripts&&(e=o.g.location+"");var t=o.g.document;if(!e&&t&&(t.currentScript&&(e=t.currentScript.src),!e)){var r=t.getElementsByTagName("script");r.length&&(e=r[r.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),o.p=e})(),(()=>{if("undefined"!=typeof document){var e={179:0};o.f.miniCss=(t,r)=>{e[t]?r.push(e[t]):0!==e[t]&&{369:1}[t]&&r.push(e[t]=(e=>new Promise(((t,r)=>{var n=o.miniCssF(e),a=o.p+n;if(((e,t)=>{for(var r=document.getElementsByTagName("link"),n=0;n<r.length;n++){var o=(i=r[n]).getAttribute("data-href")||i.getAttribute("href");if("stylesheet"===i.rel&&(o===e||o===t))return i}var a=document.getElementsByTagName("style");for(n=0;n<a.length;n++){var i;if((o=(i=a[n]).getAttribute("data-href"))===e||o===t)return i}})(n,a))return t();((e,t,r,n,o)=>{var a=document.createElement("link");a.rel="stylesheet",a.type="text/css",a.onerror=a.onload=r=>{if(a.onerror=a.onload=null,"load"===r.type)n();else{var i=r&&("load"===r.type?"missing":r.type),l=r&&r.target&&r.target.href||t,d=new Error("Loading CSS chunk "+e+" failed.\n("+l+")");d.code="CSS_CHUNK_LOAD_FAILED",d.type=i,d.request=l,a.parentNode.removeChild(a),o(d)}},a.href=t,document.head.appendChild(a)})(e,a,0,t,r)})))(t).then((()=>{e[t]=0}),(r=>{throw delete e[t],r})))}}})(),(()=>{var e={179:0};o.f.j=(t,r)=>{var n=o.o(e,t)?e[t]:void 0;if(0!==n)if(n)r.push(n[2]);else{var a=new Promise(((r,o)=>n=e[t]=[r,o]));r.push(n[2]=a);var i=o.p+o.u(t),l=new Error;o.l(i,(r=>{if(o.o(e,t)&&(0!==(n=e[t])&&(e[t]=void 0),n)){var a=r&&("load"===r.type?"missing":r.type),i=r&&r.target&&r.target.src;l.message="Loading chunk "+t+" failed.\n("+a+": "+i+")",l.name="ChunkLoadError",l.type=a,l.request=i,n[1](l)}}),"chunk-"+t,t)}};var t=(t,r)=>{var n,a,[i,l,d]=r,s=0;if(i.some((t=>0!==e[t]))){for(n in l)o.o(l,n)&&(o.m[n]=l[n]);d&&d(o)}for(t&&t(r);s<i.length;s++)a=i[s],o.o(e,a)&&e[a]&&e[a][0](),e[a]=0},r=self.webpackChunkgw2_map_embeds=self.webpackChunkgw2_map_embeds||[];r.forEach(t.bind(null,0)),r.push=t.bind(null,r.push.bind(r))})();var a=function(){null==document.querySelector("script#gw2maps")&&Promise.all([o.e(854),o.e(369)]).then(o.bind(o,539)).then((function(e){return new(0,e.default)}))};"loading"===document.readyState?document.addEventListener("DOMContentLoaded",(function(){a()})):setTimeout(a,1)})();