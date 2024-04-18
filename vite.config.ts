import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		sveltekit()
		// {
		// 	name: 'shiggy-getter',
		// 	configureServer() {
		// 		getShiggies();
		// 	},
		// 	configurePreviewServer() {
		// 		getShiggies();
		// 	}
		// }
	]
});
