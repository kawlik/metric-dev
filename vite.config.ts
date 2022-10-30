import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

// external plugins
import react from '@vitejs/plugin-react';

// vite config
export default defineConfig({
	base: '/material/',
	plugins: [
		react(),
		VitePWA({
			registerType: 'autoUpdate',
			workbox: {
				globPatterns: ['**/*.*'],
			},
			manifest: {
				name: 'Metric',
				short_name: 'Metric',
				description: 'Metric — Progressive Web Application to manage your expenses!',
				background_color: '#42b883',
				theme_color: '#42b883',
				orientation: 'portrait',
				display: 'standalone',
				icons: [
					{
						purpouse: 'maskable',
						src: 'android-chrome-192x192.png',
						sizes: '192x192',
						type: 'image/png',
					},
					{
						purpouse: 'maskable',
						src: 'android-chrome-512x512.png',
						sizes: '512x512',
						type: 'image/png',
					},
				],
			},
		}),
	],
});
