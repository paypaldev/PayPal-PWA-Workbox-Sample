importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-sw.js');

console.log('this is my custom service worker');

workbox.precaching.precacheAndRoute([
  {"revision":"be15852954fc8d396ca68eae1161d67c","url":"assets/icons/icon.png"},
  {"revision":"261185da3f50e528b5c10a44e0fe8fce","url":"css/app.css"},
  {"revision":"4650e632a8a1fdf8911ebb479c1f5f98","url":"index.html"},
  {"revision":"bd9f91d03e6ed445224067290e96d069","url":"js/app.js"},
  {"revision":"8a1218ba47aad75c09e10a9e086c504b","url":"manifest.json"},
  {"revision":"b6041e96e78b5058b66b6acfbaf3d2ea","url":"workbox-6da860f9.js"}
]);

// An example runtime caching route for requests that aren't handled by the
// precache, in this case same-origin .jpeg requests like those from in public/
workbox.routing.registerRoute(
    // Add in any other file extensions or routing criteria as needed.
    ({ url }) => url.origin === self.location.origin && url.pathname.endsWith('.jpeg'), // Customize this strategy as needed, e.g., by changing to CacheFirst.
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: 'images',
      plugins: [
        // Ensure that once this runtime cache reaches a maximum size the
        // least-recently used images are removed.
        new workbox.expiration.ExpirationPlugin({ maxEntries: 50 }),
      ],
    })
  );