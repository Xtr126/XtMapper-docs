import { defineConfig, passthroughImageService } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://xtr126.github.io',
	base: '/XtMapper-docs',
	image: {
   		service: passthroughImageService(),
 	},
	integrations: [
		starlight({
			title: 'XtMapper',
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/Xtr126/XtMapper' },
			],
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
					items: [
						{ autogenerate: { directory: 'guides' } }
					]
				},
				{
					label: 'Features',
					items: [
						{ autogenerate: { directory: 'features' } }
					]
				},
				{
					label: 'Settings',
					items: [
						{ autogenerate: { directory: 'settings' } }
					]
				},
				{
					label: 'Waydroid',
					items: [
						{ autogenerate: { directory: 'waydroid' } }
					]
				},
				// {
				// 	label: 'Bliss OS',
				// 	autogenerate: { directory: 'blissos' },
				// },
			],
			editLink: {
				baseUrl: 'https://github.com/Xtr126/XtMapper-docs/edit/main/', 
			},
			favicon: '/favicon.png',
		}),
	],
});
