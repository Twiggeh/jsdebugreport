import { Workbox } from 'workbox-window';

export const loadSW = async () => {
	if (!window.navigator.serviceWorker) return;

	const wp = new Workbox('sw.js');

	wp.addEventListener('installed', event => {
		if (event.isUpdate) {
			alert('new app update, click ok to refresh');
			window.location.reload();
		}
	});

	wp.register();
};
