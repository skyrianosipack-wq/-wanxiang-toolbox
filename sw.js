const CACHE='wanxiang-v4';
const ASSETS=['./','./index.html','./manifest.webmanifest','./icon.svg','./v4-1.txt','./v4-2.txt','./v4-3.txt','./v4-4.txt','./v4-5.txt','./v4-6.txt','./v4-7.txt','./v4-8.txt'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(fetch(e.request).then(resp=>{const cp=resp.clone();caches.open(CACHE).then(c=>c.put(e.request,cp));return resp}).catch(()=>caches.match(e.request).then(r=>r||caches.match('./index.html'))))});