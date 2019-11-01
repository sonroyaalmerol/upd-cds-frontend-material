/* eslint-disable no-undef */
if (workbox) {
  // apply precaching. In the built version, the precacheManifest will
  // be imported using importScripts (as is workbox itself) and we can 
  // precache this. This is all we need for precaching
  workbox.precaching.precacheAndRoute(self.__precacheManifest)

  workbox.routing.registerNavigationRoute('/index.html')

  // This code listens for the user's confirmation to update the app.
  console.log('sw:listening for message events')
  self.addEventListener('message', (e) => {
    console.log('sw:message received', e)
    if (!e.data) {
      return
    }

    switch (e.data) {
      case 'skipWaiting':
        console.log('skipWaiting')
        self.skipWaiting()
        break
      default:
        // NOOP
        break
    }
  })

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