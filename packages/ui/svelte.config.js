import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'
import { preprocessMeltUI, sequence } from '@melt-ui/pp'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: sequence([vitePreprocess(), preprocessMeltUI()]),
}

export default config
