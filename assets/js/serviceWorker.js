importScripts('./lib/sw-toolbox/sw-toolbox.js');
importScripts('./lib/sw-offline-google-analytics.js');

goog.offlineGoogleAnalytics.initialize();

const precacheFiles = [
    '/assets/images/reyjand.png'
];
toolbox.precache(precacheFiles);

console.log("sw.js here");

self.addEventListener('install', (event) => event.waitUntil(self.skipWaiting()));
self.addEventListener('activate', (event) => event.waitUntil(self.clients.claim()));
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            if ( response ) {
                return response;
            } else {
                return fetch(event.request);
            }
        })
    );
});