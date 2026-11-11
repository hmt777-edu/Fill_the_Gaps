/* Fill in the Blank · Service Worker
   Versioned cache-first shell. Bump VERSION on every release so students
   get the "Update available - Reload" toast. Paths are relative, so the
   app works under a GitHub Pages sub-path (https://user.github.io/repo/). */
'use strict';
const VERSION = 'fib-v1.0.0';
const CACHE = VERSION;

/* Required: install fails if any of these is missing. */
const CORE = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icons/icon.svg',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/maskable-192.png',
  './icons/maskable-512.png',
  './icons/apple-touch-icon.png',
  './icons/favicon-32.png'
];

/* Optional: cached when present, skipped silently when not (e.g. before
   you add the vendor files). */
const KATEX_FONTS = [
  'AMS-Regular', 'Caligraphic-Bold', 'Caligraphic-Regular', 'Fraktur-Bold', 'Fraktur-Regular',
  'Main-Bold', 'Main-BoldItalic', 'Main-Italic', 'Main-Regular', 'Math-BoldItalic', 'Math-Italic',
  'SansSerif-Bold', 'SansSerif-Italic', 'SansSerif-Regular', 'Script-Regular',
  'Size1-Regular', 'Size2-Regular', 'Size3-Regular', 'Size4-Regular', 'Typewriter-Regular'
].map(n => './vendor/katex/fonts/KaTeX_' + n + '.woff2');

const OPTIONAL = [
  './fonts/NotoSansMyanmar-Regular.woff2',
  './fonts/NotoSansMyanmar-Bold.woff2',
  './vendor/xlsx.full.min.js',
  './vendor/jszip.min.js',
  './vendor/katex/katex.min.js',
  './vendor/katex/katex.min.css',
  './samples/sample.csv',
  './tools/icon-maker.html'
].concat(KATEX_FONTS);

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    await cache.addAll(CORE.map(u => new Request(u, { cache: 'reload' })));
    await Promise.all(OPTIONAL.map(u =>
      fetch(new Request(u, { cache: 'reload' }))
        .then(r => (r.ok ? cache.put(u, r) : null))
        .catch(() => null)
    ));
  })());
  /* No skipWaiting() here: the page shows "Update available - Reload"
     and sends SKIP_WAITING when the student taps it. */
});

self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k.startsWith('fib-') && k !== CACHE).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; /* the app never calls other hosts */

  /* Page navigations: cached shell first, network as backup, shell as offline fallback. */
  if (req.mode === 'navigate') {
    event.respondWith((async () => {
      const cache = await caches.open(CACHE);
      const hit = await cache.match('./index.html') || await cache.match('./');
      if (hit) return hit;
      try { return await fetch(req); }
      catch (e) { return new Response('<h1>Offline</h1><p>Open the app once while online.</p>', { headers: { 'Content-Type': 'text/html; charset=utf-8' } }); }
    })());
    return;
  }

  /* Static files: cache-first, then network (and store the copy). */
  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const hit = await cache.match(req, { ignoreSearch: true });
    if (hit) return hit;
    try {
      const res = await fetch(req);
      if (res.ok && res.type === 'basic') cache.put(req, res.clone());
      return res;
    } catch (e) {
      return new Response('', { status: 504, statusText: 'Offline' });
    }
  })());
});
