// Установка сервисного работника
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('my-cache').then(cache => {
      return cache.addAll([
	    '/',
        '/photjpg.jpg',
		'/index.html',
        '/style.css',
        '/chan55.jpg',
        '/chan75.jpg'
      ]);
    })
  );
});

// Активация сервисного работника
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(cacheName => {
          // Удаляем старые кэши, оставляя только текущий кэш 'my-cache'
          return cacheName !== 'my-cache';
        }).map(cacheName => {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

// Запрос на сети и обновление кеша
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(() =>
      caches.match(event.request)
    )
  );
});
