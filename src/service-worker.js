import { precacheAndRoute } from 'workbox-precaching';

self.addEventListener('install', (event) => {
  const urlsToCache = [
    '/',
    '/index.html',
    '/static/css/main.chunk.css',
  ];

  event.waitUntil(
    caches.open('your-cache-name').then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

precacheAndRoute(self.__WB_MANIFEST);