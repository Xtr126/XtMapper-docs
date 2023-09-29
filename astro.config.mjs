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
					autogenerate: { directory: 'reference' },
				},
				{
					label: 'Wayland client',
					autogenerate: { directory: 'wlclient' },
				},
			],
			favicon: '/favicon.png',
		}),
	],
});
