importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-sw.js');

console.log('this is my custom service worker');

workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

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