import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://xtr126.github.io',
	base: '/XtMapper-docs',
	integrations: [
		starlight({
			expressiveCode: false,
			title: 'XtMapper',
			social: {
				github: 'https://github.com/Xtr126/XtMapper',
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
			favicon: '/favicon.png',
		}),
	],
});
