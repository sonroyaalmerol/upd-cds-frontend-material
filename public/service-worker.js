/* eslint-disable no-undef */
if (workbox) {
    console.log(`Workbox is loaded`)
    workbox.setConfig({
        debug: false,
    })
    
    workbox.precaching.precacheAndRoute([])
    
    workbox.routing.registerRoute(
        /\.(?:png|gif|jpg|jpeg|svg|js|css)$/,
        workbox.strategies.staleWhileRevalidate({
            cacheName: 'static',
            plugins: [
                new workbox.expiration.Plugin({
                    maxEntries: 60,
                    maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
                }),
            ],
        }),
    )
    
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
} 
else {
    console.log(`Workbox didn't load`)
}
