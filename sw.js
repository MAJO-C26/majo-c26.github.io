// Service Worker para Mis Finanzas VE
// Permite instalación como PWA y funcionamiento offline básico

const CACHE_NAME = 'finanzas-ve-v2';
const FILES_TO_CACHE = ['/', '/index.html', '/manifest.json', '/icon.png'];

// Al instalar: guarda los archivos principales en caché
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(FILES_TO_CACHE))
  );
  self.skipWaiting();
});

// Al activar: limpia cachés viejas de versiones anteriores
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Al hacer fetch: devuelve desde caché si está disponible, si no va a la red
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request))
  );
});
