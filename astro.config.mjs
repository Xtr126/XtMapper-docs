import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://xtr126.github.io',
	base: '/XtMapper-docs',
	integrations: [
		starlight({
			title: 'XtMapper',
			social: {
				github: 'https://github.com/Xtr126/XtMapper',
				telegram: 'https://t.me/xtmapper',
			},
			logo: {
				src: '/public/favicon.png',
			},
			customCss: [
			// Relative path to your custom CSS file
			'./src/styles/custom.css'
			],
			sidebar: [
				{
					label: 'Quick Start',
					autogenerate: { directory: 'guides' },
				},
				{
					label: 'Features',
					autogenerate: { directory: 'features' },
				},
				{
					label: 'Settings',
					autogenerate: { directory: 'settings' },
				},
				{
					label: 'Bliss OS',
					autogenerate: { directory: 'blissos' },
				},
			],
			editLink: {
				baseUrl: 'https://github.com/Xtr126/XtMapper-docs/edit/main/', 
			},
			favicon: '/favicon.png',
		}),
	],
});
