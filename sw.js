// Service Worker — Mis Finanzas VE
// Compatible con GitHub Pages (subcarpeta)

const CACHE_NAME = 'finanzas-ve-v3';

// Obtiene la base path automáticamente (funciona en / y en /mis-finanzas-ve/)
const BASE_PATH = self.location.pathname.replace('/sw.js', '');

const FILES_TO_CACHE = [
  BASE_PATH + '/',
  BASE_PATH + '/index.html',
  BASE_PATH + '/manifest.json',
  BASE_PATH + '/icon.png',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(FILES_TO_CACHE))
      .catch(e => console.log('Cache parcial:', e))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(cached => cached || fetch(event.request))
      .catch(() => caches.match(BASE_PATH + '/index.html'))
  );
});
