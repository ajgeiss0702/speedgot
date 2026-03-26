import adapter from '@sveltejs/adapter-cloudflare';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),

	kit: {
		adapter: adapter({
			routes: {
				include: [
					"/proxy/image",
					"/resources/*",
					"/test",
					"/users/*",
					"/"
				],
				exclude: [
					"<all>",
					"/*/clear.png",
					"/resources/*/data/*"
				]
			}
		})
	}
};

export default config;
