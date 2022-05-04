import { clientsClaim } from 'workbox-core';
import { precacheAndRoute } from 'workbox-precaching';

clientsClaim();
self.skipWaiting();

precacheAndRoute(self.__WB_MANIFEST);

self.addEventListener('install', event => {
	console.log('Install', event);
});
