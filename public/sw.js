// Service worker

self.addEventListener('install', function(event) {
  console.log('SW Installed.');
  // waitUtil: 等待cache完成再进idle mode.
  event.waitUntil(
    caches.open('static')
      .then(cache => {
        // cache: key-value pair. (key: request, value: response)
        // cache.add('/');
        // cache.add('/index.html');
        // cache.add('/src/js/app.js');
        cache.addAll([
          '/',
          '/index.html',
          '/src/js/app.js',
          '/src/css/app.css',
          '/src/images/pwa.jpg',
          // 'https://fonts.googleapis.com/css?family=Raleway:400,700', // can also cache cdn.
        ]);
      })
  );
});

self.addEventListener('activate', function() {
  console.log('SW Activated.');
});

// intercept, work like network proxy
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(res => {
        if (res) {
          return res;
        }
        // 没有cache, fetch
        return fetch(event.request);
      })
  );
});