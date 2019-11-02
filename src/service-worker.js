/* eslint-disable no-undef */
if (workbox) {
  // apply precaching. In the built version, the precacheManifest will
  // be imported using importScripts (as is workbox itself) and we can 
  // precache this. This is all we need for precaching
  workbox.core.setCacheNameDetails({ prefix: 'd4' })
  //Change this value every time before you build
  const LATEST_VERSION = 'v2.4'
  self.addEventListener('activate', (event) => {
    console.log(`%c ${LATEST_VERSION} `, 'background: #ddd; color: #0000ff')
    if (caches) {
      caches.keys().then((arr) => {
        arr.forEach((key) => {
          if (key.indexOf('d4-precache') < -1) {
            caches.delete(key).then(() => console.log(`%c Cleared ${key}`, 'background: #333; color: #ff0000'))
          } else {
            caches.open(key).then((cache) => {
              cache.match('version').then((res) => {
                if (!res) {
                  cache.put('version', new Response(LATEST_VERSION, { status: 200, statusText: LATEST_VERSION }))
                } else if (res.statusText !== LATEST_VERSION) {
                  caches.delete(key).then(() => console.log(`%c Cleared Cache ${LATEST_VERSION}`, 'background: #333; color: #ff0000'))
                } else console.log(`%c Great you have the latest version ${LATEST_VERSION}`, 'background: #333; color: #00ff00')
              })
            })
          }
        })
      })
    }
  })
  self.skipWaiting()
  self.clients.claim()

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