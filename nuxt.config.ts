// https://nuxt.com/docs/api/configuration/nuxt-config
import yaml from '@rollup/plugin-yaml';
import svgLoader from 'vite-svg-loader';
import { readFileSync, watch as fsWatch } from 'fs';
import { genApiTranslationFiles } from './scripts/gen-api-translations';
import { getOldHubRedirects } from './scripts/get-old-hub-redirects';
import { genLocalesJson } from './scripts/gen-locales';
import { getStaticEndpoints } from './scripts/get-static-endpoints';
import { locales } from './assets/data/locales';
import type { NuxtConfig } from 'nuxt/schema';
import { fetchCrowdinMembers } from './scripts/fetch-crowdin';
import { genSpaLoadingTemplate } from './scripts/gen-spa-loading-template';

// 公開時のドメイン（末尾スラッシュなし）
const baseUrl =
	process.env.NODE_ENV == 'development'
		? 'http://localhost:3000'
		: 'https://misskey-hub.net';

// リポジトリURL（末尾スラッシュなし）
const repositoryUrl = 'https://github.com/misskey-dev/misskey-hub-next';

// サーバーリストAPIのベースURL
const serverListApiBaseUrl = process.env.SERVER_LIST_API_BASE_URL ?? 'https://instanceapp.misskey.page';

// 言語定義は /assets/data/locales.ts に移動しました

function getRouteRules(): NuxtConfig['routeRules'] | undefined {
	if (process.env.NODE_ENV === 'development' || process.prerender) return undefined;

	// 言語ごとに割り当てる必要のないRouteRules
	const staticRules: NuxtConfig['routeRules'] = {
		'/ja/blog/**': { isr: true },
		'/ns/': { prerender: true },
	};

	// それぞれの言語について割り当てる必要のあるRouteRules
	const localeBasedRules: NuxtConfig['routeRules'] = {
		// リリースページはどうせアクセス集中するので先に作っておく
		'/docs/releases/': { prerender: true },
		'/docs/**': { isr: true },
	};

	// 静的ページをすべて追加
	getStaticEndpoints().forEach((route) => {
		if (!route.includes('ns')) {
			localeBasedRules[route] = { prerender: true };
			staticRules[route] = { prerender: true };
		}
	});

	// 言語ごとにすべて割り当てていく
	const _localeBasedRules: NuxtConfig['routeRules'] = {};
	const localeCodes = locales.map((v) => v.code);
	Object.keys(localeBasedRules).forEach((route) => {
		localeCodes.forEach((code) => {
			_localeBasedRules[`/${code}${route}`] = localeBasedRules[route];
		});
	})

	return {
		...staticRules,
		..._localeBasedRules,
		...((process.env.VERCEL !== '1') ? getOldHubRedirects('nitro') : {}),
	};
}

const packageJson = JSON.parse(readFileSync('./package.json', 'utf-8'));

export default defineNuxtConfig({
	compatibilityDate: '2024-09-07',
	runtimeConfig: {
		public: {
			baseUrl,
			serverListApiBaseUrl,
			repositoryUrl,
			locales,
			misskeyJsVersion: packageJson.devDependencies['misskey-js'] as string,
		},
		CROWDIN_INTG_API: process.env.CROWDIN_INTG_API,
	},
	css: [
		"github-markdown-css/github-markdown.css",
		"@/assets/css/nprogress.css",
		"@/assets/css/tailwind.css",
		"@/assets/css/mfm.scss",
		"@/assets/css/bootstrap-forms.scss",
	],
	modules: [
		'@nuxt/content',
		'@nuxtjs/i18n',
		'@nuxtjs/color-mode',
	],
	app: {
		head: {
			link: [
				{ rel: 'stylesheet', href: '/fonts/fonts.css' },
				{ rel: 'apple-touch-icon', href: '/img/icons/apple-touch-icon.png' },
				{ rel: 'shortcut icon', type: 'image/vnd.microsoft.icon', href: '/favicon.ico' },
				{ rel: 'icon', type: 'image/vnd.microsoft.icon', href: '/favicon.ico' },
				{ rel: 'me', href: 'https://misskey.io/@misskey_hub_deploy' },
				{ rel: 'me', href: 'https://mastodon.social/@misskey' },
			],
			meta: [
				{ name: 'twitter:card', content: 'summary_large_image' },
			]
		},
	},
	content: {
		build: {
			markdown: {
				remarkPlugins: {
					'misskey-hub-markdown-fixer': {},
				},
				highlight: {
					theme: {
						// Default theme (same as single string)
						default: 'catppuccin-latte',
						// Theme used if `html.dark`
						dark: 'one-dark-pro',
					},
					langs: [
						'json', 'js', 'ts', 'html', 'css', 'vue', 'shell', 'mdc', 'md', 'yaml', 'jsx',
						'ini', 'sql', 'yml', 'nginx', 'bash',
					],
				},	
			},
		},
	},
	i18n: {
		baseUrl,
		vueI18n: './i18n.config.ts',
		locales,
		lazy: true,
		langDir: 'locales_dist',
		defaultLocale: 'ja',
		// ▼ Defaultルートは、nitroプラグインでオーバーライドする
		// 　 リンクはuseGLocalePath（ラッパー）を使う
		strategy: 'prefix_and_default',
		trailingSlash: true,
	},
	colorMode: {
		classSuffix: '',
	},
	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {},
		},
	},
	devtools: { enabled: false },
	alias: {
		'bi': 'bootstrap-icons/icons',
	},
	vite: {
		plugins: [
			yaml(),
			svgLoader({
				defaultImport: 'component',
				svgoConfig: {
					plugins: [
						{
							name: 'preset-default',
							params: {
								overrides: {
									removeViewBox: false,
								}
							}
						}
					]
				}
			}),
		],
	},
	vue: {
		compilerOptions: {
			isCustomElement: (tag) => tag.startsWith('model-viewer'),
		},
	},
	nitro: {
		// リダイレクトが多すぎてCloudflare Pagesのネイティブリダイレクトが使えないので静的モードに強制
		preset: (process.env.CF_PAGES ? 'static' : undefined),
		vercel: {
			config: {
				routes: [
					...getOldHubRedirects('vercel'),
				],
			}
		},
		plugins: [
			'@/server/plugins/appendComment.ts',
			'@/server/plugins/i18nRedirector.ts',
		],
		prerender: {
			failOnError: false,
		}
	},
	typescript: {
		tsConfig: {
			compilerOptions: {
				baseUrl: './',
			},
		},
	},
	hooks: {
		'build:before': async () => {
			genApiTranslationFiles();

			await Promise.all([
				genLocalesJson().then(() => {
					if (process.env.NODE_ENV === 'development') {
						fsWatch('./locales/', (ev, filename) => {
							if (filename && filename.endsWith('.yml')) {
								genLocalesJson();
							}
						});
					}
				}),
				genSpaLoadingTemplate(),
				fetchCrowdinMembers(),
			]);
		},
	},
	features: {
		inlineStyles: false,
	},
	experimental: {
		componentIslands: true,
	},
	routeRules: getRouteRules(),
});
