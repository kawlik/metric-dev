if(!self.define){let e,i={};const r=(r,n)=>(r=new URL(r+".js",n).href,i[r]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=r,e.onload=i,document.head.appendChild(e)}else e=r,importScripts(r),i()})).then((()=>{let e=i[r];if(!e)throw new Error(`Module ${r} didn’t register its module`);return e})));self.define=(n,s)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(i[c])return;let o={};const a=e=>r(e,c),d={module:{uri:c},exports:o,require:a};i[c]=Promise.all(n.map((e=>d[e]||a(e)))).then((e=>(s(...e),o)))}}define(["./workbox-3ea082d2"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"android-chrome-192x192.png",revision:"ac17b6d7c9de4eafda4c0b78518c02a2"},{url:"android-chrome-512x512.png",revision:"f332dd6b868b062f37239ab0bee5788b"},{url:"apple-touch-icon.png",revision:"2e57ea94de6a0760568f297f11275295"},{url:"assets/cheque.70400e7f.gif",revision:null},{url:"assets/desert.ad16b03d.gif",revision:null},{url:"assets/index.1d829dce.css",revision:null},{url:"assets/index.a6e5abee.js",revision:null},{url:"assets/logo.ccb9c5c2.png",revision:null},{url:"assets/love.96fc6e78.gif",revision:null},{url:"assets/purse.5ef55aa0.gif",revision:null},{url:"favicon-16x16.png",revision:"6ab378c4da3a2cd77a2d12650373b117"},{url:"favicon-32x32.png",revision:"4077b907c465faf1f57df0e3ac393351"},{url:"favicon.ico",revision:"424621a16ee623223898cf92cf77f212"},{url:"index.html",revision:"c8eff673f348962c0d4e8c5fa62e1ade"},{url:"manifest.webmanifest",revision:"ce99217d01f63c2e641a97925b97cc15"},{url:"registerSW.js",revision:"07da6bdd4dcbbc63c885593ee5b6ba34"},{url:"robots.txt",revision:"cd9cd94aaa699e0a16e692b6bb16f672"},{url:"android-chrome-192x192.png",revision:"ac17b6d7c9de4eafda4c0b78518c02a2"},{url:"android-chrome-512x512.png",revision:"f332dd6b868b062f37239ab0bee5788b"},{url:"manifest.webmanifest",revision:"ce99217d01f63c2e641a97925b97cc15"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
