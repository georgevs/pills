const serviceWorker = self as ServiceWorkerGlobalScope & typeof globalThis;

const cacheName = `pills-v1`;
const resourcesToPrecache = [
  '/',
  'app.js',
  'favicon.ico',
  'index.css',
  'index.html',
  'https://cdnjs.cloudflare.com/ajax/libs/react/17.0.2/umd/react.production.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/react-dom/17.0.2/umd/react-dom.production.min.js',
];

self.addEventListener('install', (event: ExtendableEvent) => {
  event.waitUntil(
    self.caches.open(cacheName)
      .then(cache => cache.addAll(resourcesToPrecache))
      .then(_ => serviceWorker.skipWaiting())
  );
});

self.addEventListener('activate', (event: ExtendableEvent) => {
  event.waitUntil(
    self.caches.keys().then(
      keys => Promise.all(
        keys.filter(key => key !== cacheName).map(key => self.caches.delete(key))
      )
    )
    .then(_ => serviceWorker.clients.claim())
  );
});

self.addEventListener('fetch', (event: FetchEvent) => {
  const url = new URL(event.request.url);
  if (url.pathname.startsWith('/api/')) {
    // console.log('sw/fetch', 'url:', url.pathname);
    event.respondWith(
      fetch(event.request)
    );
  } else {
    event.respondWith(
      self.caches.match(event.request)
        .then(cacheResponse => cacheResponse || fetch(event.request))
    );
  }
});
