/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
	content: [
		'./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
		'./node_modules/flowbite/**/*.js',
	],
	theme: {
		extend: {
			fontFamily: {
				sans: ['Open Sans Variable', ...defaultTheme.fontFamily.sans],
				raleway: ['Raleway Variable'],
			},
			colors: {
				'custom-black': '#333333',
				'custom-blue': '#0500CF',
			},
		},
	},
	plugins: [require('flowbite/plugin')],
};
