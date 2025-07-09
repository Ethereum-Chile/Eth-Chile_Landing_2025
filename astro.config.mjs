import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
	integrations: [tailwind(), react()],
	site: 'https://ethereumchile.org',
	vite: {
		define: {
			global: 'globalThis',
		},
		resolve: {
			alias: {
				buffer: 'buffer',
			},
		},
		optimizeDeps: {
			include: ['buffer'],
		},
		ssr: {
			noExternal: ['@privy-io/react-auth'],
		},
		build: {
			rollupOptions: {
				external: [],
			},
		},
		worker: {
			format: 'es',
		},
	},
});
