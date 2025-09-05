/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				'custom-black': '#0a0a0a',
				'custom-blue': '#00BFFF',
				'custom-dark': '#000000',
				'custom-dark-center': '#0a0a0a',
				'custom-dark-border': '#000000',
			},
			fontFamily: {
				'raleway': ['Raleway Variable', 'sans-serif'],
				'open-sans': ['Open Sans Variable', 'sans-serif'],
			},
			backgroundImage: {
				'dark-gradient': 'radial-gradient(ellipse at center, #0a0a0a 0%, #000000 100%)',
			}
		},
	},
	plugins: [],
};
