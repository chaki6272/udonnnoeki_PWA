const CACHE_NAME = 'udon-no-eki-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/menu.html',
  '/access.html',
'/include-common.js',
'/scrollin/fadein.js',
'/slide/slideshow.css',
'/style.unified.css',
'/mv/gm_css.css',
'/scrollin/fadein.css',
'/mv/udonnoeki_GoogleEarth2.mp4'
];

// インストール時にキャッシュ
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('キャッシュに追加:', urlsToCache);
        return cache.addAll(urlsToCache);
      })
  );
});

// リクエスト時にキャッシュから返す
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

// 古いキャッシュの削除
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => {
        if (!cacheWhitelist.includes(key)) {
          return caches.delete(key);
        }
      }))
    )
  );
});
