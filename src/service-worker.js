/* eslint-disable no-undef */
if (workbox) {
  // apply precaching. In the built version, the precacheManifest will
  // be imported using importScripts (as is workbox itself) and we can 
  // precache this. This is all we need for precaching
  workbox.precaching.precacheAndRoute(self.__precacheManifest)

  workbox.routing.registerNavigationRoute('/index.html')

  workbox.routing.registerRoute(
    new RegExp('https://api.updkalay.com'),
    workbox.strategies.networkFirst({
      cacheName: 'api',
    }),
  )

  workbox.routing.registerRoute(
    new RegExp('https://fonts.(?:googleapis|gstatic).com/(.*)'),
    workbox.strategies.cacheFirst({
      cacheName: 'googleapis',
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 30,
        }),
      ],
    }),
  )

  workbox.routing.registerRoute(
    new RegExp('https://cdn.jsdelivr.net/(.*)'),
    workbox.strategies.cacheFirst({
      cacheName: 'jsdelivr',
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 30,
        }),
      ],
    }),
  )
}