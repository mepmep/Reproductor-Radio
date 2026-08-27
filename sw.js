/**
 * MyRadio PWA - Service Worker
 * Versión 1.0.0
 * Caché inteligente de App Shell con bypass estricto para Live Audio Stream y API de Metadata.
 */

const CACHE_NAME = 'myradio-pwa-v1.0.0';

const APP_SHELL_ASSETS = [
  './',
  './index.html',
  './app.js',
  './manifest.json',
  './logo.png',
  './myradio-net-ar-logo.webp',
  './icons/icon-192.svg',
  './icons/icon-512.svg',
  './icons/icon-maskable.svg',
  './favicon.svg'
];

// Instalación del Service Worker: precachear el App Shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(APP_SHELL_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activación: limpiar cachés obsoletas y tomar control inmediato
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((name) => {
            if (name !== CACHE_NAME) {
              return caches.delete(name);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Intercepción de peticiones de red
self.addEventListener('fetch', (event) => {
  const requestUrl = new URL(event.request.url);

  // 1. NO cachear peticiones que no sean GET
  if (event.request.method !== 'GET') {
    return;
  }

  // 2. BYPASS ESTRICTO: Audio streaming y APIs de metadata nunca deben pasar por la caché
  const isAudioStream = 
    requestUrl.pathname.includes('/stream') || 
    requestUrl.port === '8084' ||
    requestUrl.pathname.endsWith('.mp3') ||
    requestUrl.pathname.endsWith('.aac') ||
    requestUrl.hostname.includes('streaminghd.net.ar');

  const isMetadataApi = 
    requestUrl.pathname.includes('/api/') || 
    requestUrl.pathname.includes('nowplaying') ||
    requestUrl.pathname.includes('status-json');

  if (isAudioStream || isMetadataApi) {
    // Pasar directo a la red sin intervenir
    return;
  }

  // 3. Estrategia Stale-While-Revalidate para recursos estáticos
  event.respondWith(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.match(event.request).then((cachedResponse) => {
        const fetchPromise = fetch(event.request)
          .then((networkResponse) => {
            // Guardar en caché solo si la respuesta es válida y del mismo origen o CDN confiable
            if (networkResponse && networkResponse.status === 200) {
              cache.put(event.request, networkResponse.clone());
            }
            return networkResponse;
          })
          .catch(() => {
            // Si la red falla y no hay respuesta en caché, retornar la página principal
            if (event.request.headers.get('accept')?.includes('text/html')) {
              return caches.match('./index.html');
            }
          });

        return cachedResponse || fetchPromise;
      });
    })
  );
});
