// CyberWarTools UA - Service Worker
// Enables offline functionality and background synchronization
// Last Updated: 2024

const CACHE_VERSION = 'squad303-v1';
const CACHE_URLS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/assets/css/style.css',
  '/assets/js/app.js',
  '/assets/js/squad303-core.js',
  '/assets/img/icon-192.png',
  '/assets/img/icon-512.png'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('[ServiceWorker] Installing...');
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then((cache) => {
        console.log('[ServiceWorker] Caching files');
        return cache.addAll(CACHE_URLS);
      })
      .catch((err) => console.error('[ServiceWorker] Cache failed:', err))
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[ServiceWorker] Activating...');
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_VERSION) {
              console.log('[ServiceWorker] Removing old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
  );
  self.clients.claim();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Network-first for API requests
  if (url.pathname.includes('/api/')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          if (response.ok) {
            const responseClone = response.clone();
            caches.open(CACHE_VERSION)
              .then((cache) => cache.put(request, responseClone));
          }
          return response;
        })
        .catch(() => caches.match(request))
    );
    return;
  }

  // Cache-first for static assets
  event.respondWith(
    caches.match(request)
      .then((response) => response || fetch(request))
      .catch(() => {
        if (request.destination === 'image') {
          return new Response('<svg/>', { headers: { 'Content-Type': 'image/svg+xml' } });
        }
        return new Response('Offline - Page not available', { status: 503 });
      })
  );
});

// Background Sync
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-data') {
    event.waitUntil(
      clients.matchAll().then((clients) => {
        clients.forEach((client) => {
          client.postMessage({ type: 'sync-complete' });
        });
      })
    );
  }
});

// Push notifications support
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {};
  const options = {
    body: data.body || 'New notification from CyberWarTools UA',
    icon: '/assets/img/icon-192.png',
    badge: '/assets/img/icon-192.png',
    tag: data.tag || 'default'
  };

  event.waitUntil(
    self.registration.showNotification(
      data.title || 'CyberWarTools UA',
      options
    )
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window' })
      .then((clientList) => {
        for (let i = 0; i < clientList.length; i++) {
          if (clientList[i].url === '/' && 'focus' in clientList[i]) {
            return clientList[i].focus();
          }
        }
        if (clients.openWindow) {
          return clients.openWindow('/');
        }
      })
  );
});

console.log('[ServiceWorker] Loaded successfully');
