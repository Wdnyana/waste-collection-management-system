import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

export default {
	content: ['./src/**/*.{html,js,svelte,ts}', './src/lib/components/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			typography: () => ({
				DEFAULT: {
					css: {
						code: {
							position: 'relative',
						},
					},
				},
			}),

			colors: {
				magnum: {
					'50': '#fff9ed',
					'100': '#fef2d6',
					'200': '#fce0ac',
					'300': '#f9c978',
					'400': '#f7b155',
					'500': '#f38d1c',
					'600': '#e47312',
					'700': '#bd5711',
					'800': '#964516',
					'900': '#793a15',
					'950': '#411c09',
				},
			},

			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},

			fontSize: {
				'fluid-xs': 'clamp(0.75rem, 0.5vw + 0.5rem, 1rem)',
				'fluid-sm': 'clamp(0.875rem, 1vw + 0.5rem, 1.125rem)',
				'fluid-base': 'clamp(1rem, 1.5vw + 0.5rem, 1.25rem)',
				'fluid-lg': 'clamp(1.25rem, 2vw + 0.5rem, 1.5rem)',
				'fluid-xl': 'clamp(1.5rem, 2.5vw + 0.5rem, 2rem)',

				h1: ['clamp(1.75rem, 4vw, 3rem)', { lineHeight: '1.1', fontWeight: '700' }],
				h2: ['clamp(1.35rem, 3vw, 2.25rem)', { lineHeight: '1.2', fontWeight: '600' }],
				h3: ['clamp(1.15rem, 2.5vw, 1.65rem)', { lineHeight: '1.3', fontWeight: '600' }],
				h4: ['clamp(1rem, 1.8vw, 1.35rem)', { lineHeight: '1.4', fontWeight: '500' }],
			},

			fontFamily: {
				'poppins-base': ['Poppins', 'sans-serif'],
			},

			spacing: {
				'fluid-xs': 'clamp(0.5rem, 1vw, 1rem)',
				'fluid-sm': 'clamp(1rem, 2vw, 1.5rem)',
				'fluid-md': 'clamp(1.5rem, 3vw, 2rem)',
				'fluid-lg': 'clamp(2rem, 4vw, 3rem)',
				'fluid-xl': 'clamp(3rem, 5vw, 4rem)',
			},

			// Responsive container max-widths with fluid approach
			maxWidth: {
				'fluid-container': 'clamp(100%, 90vw, 1440px)',
			},

			// Enhanced gap utilities
			gap: {
				'fluid-sm': 'clamp(0.5rem, 2vw, 1rem)',
				'fluid-md': 'clamp(1rem, 3vw, 1.5rem)',
				'fluid-lg': 'clamp(1.5rem, 4vw, 2rem)',
			},
		},

		screens: {
			xs: '375px',
			sm: '640px',
			md: '768px',
			lg: '1024px',
			xl: '1280px',
			'2xl': '1536px',
		},
	},

	plugins: [
		typography,
		function ({ addUtilities }) {
			const responsiveContainer = {
				'.responsive-container': {
					width: '100%',
					marginLeft: 'auto',
					marginRight: 'auto',
					paddingLeft: 'max(1rem, 4vw)',
					paddingRight: 'max(1rem, 4vw)',
					maxWidth: 'clamp(100%, 90vw, 1440px)',
					height: '100%',
				},
			}
			addUtilities(responsiveContainer)
		},
		function ({ addVariant, matchUtilities, theme }) {
			addVariant('hocus', ['&:hover', '&:focus'])
			matchUtilities(
				{
					square: (value) => ({
						width: value,
						height: value,
					}),
				},
				{ values: theme('spacing') },
			)
		},
	],
} satisfies Config
