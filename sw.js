const CACHE_NAME = 'glom-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/index.css',
  '/style.css',
  '/pages/about.html',
  '/pages/booking.html',
  '/pages/contact.html',
  '/pages/gallary.html',
  '/pages/pricing.html',
  '/pages/service.html',
  '/pages/signup.html',
  '/css/about.css',
  '/css/booking.css',
  '/css/contact.css',
  '/css/gallary.css',
  '/css/pricing.css',
  '/css/service.css',
  '/css/shared.css',
  '/css/signup.css'
];

// Install: cache all core assets
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

// Activate: clean up old caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch: serve from cache, fall back to network
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
