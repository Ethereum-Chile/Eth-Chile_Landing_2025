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
				output: {
					manualChunks: {
						// Separate vendor chunks for better caching
						vendor: ['react', 'react-dom'],
						animations: ['framer-motion', 'gsap'],
						ui: ['@radix-ui/react-slot', 'class-variance-authority', 'clsx'],
					},
				},
			},
			// Enable minification and tree shaking
			minify: 'terser',
			target: 'esnext',
		},
		worker: {
			format: 'es',
		},
		// Performance optimizations
		esbuild: {
			target: 'esnext',
		},
		// Optimize CSS
		css: {
			devSourcemap: false,
		},
	},
	// Build optimizations
	build: {
		assets: '_assets',
	},
});
