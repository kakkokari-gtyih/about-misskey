import type { LocaleObject } from '@nuxtjs/i18n';

export type LocaleDef = LocaleObject & { contentIdentifier: string };

export const localesConst = [
	{ files: [ 'ja-JP.json' ], code: 'ja', contentIdentifier: 'ja', language: 'ja-JP', name: '日本語' },
	{ files: [ 'en-US.json' ], code: 'en', contentIdentifier: 'en', language: 'en-US', name: 'English' },
	{ files: [ 'id-ID.json' ], code: 'id', contentIdentifier: 'id', language: 'id-ID', name: 'Bahasa Indonesia' },
	{ files: [ 'ko-KR.json' ], code: 'ko', contentIdentifier: 'ko', language: 'ko-KR', name: '한국어' },
	{ files: [ 'it-IT.json' ], code: 'it', contentIdentifier: 'it', language: 'it-IT', name: 'Italiano' },
	{ files: [ 'pl-PL.json' ], code: 'pl', contentIdentifier: 'pl', language: 'pl-PL', name: 'Polski' },
	{ files: [ 'fr-FR.json' ], code: 'fr', contentIdentifier: 'fr', language: 'fr-FR', name: 'Français' },
	{ files: [ 'th-TH.json' ], code: 'th', contentIdentifier: 'th', language: 'th-TH', name: 'ภาษาไทย' },
	{ files: [ 'es-ES.json' ], code: 'es', contentIdentifier: 'es', language: 'es-ES', name: 'Español' },
	{ files: [ 'de-DE.json' ], code: 'de', contentIdentifier: 'de', language: 'de-DE', name: 'Deutsch' },
	{ files: [ 'zh-CN.json' ], code: 'cn', contentIdentifier: 'cn', language: 'zh-CN', name: '简体中文' },
	{ files: [ 'zh-TW.json' ], code: 'tw', contentIdentifier: 'tw', language: 'zh-TW', name: '繁体中文' },
	{ files: [ 'ja-KS.json' ], code: 'ja-ks', contentIdentifier: 'ja_ks', language: 'ja-KS', name: '🐙' },
] as const satisfies LocaleDef[];

export const localesContentIdentifiers = {
	ja: 'ja',
	en: 'en',
	id: 'id',
	ko: 'ko',
	it: 'it',
	pl: 'pl',
	fr: 'fr',
	th: 'th',
	es: 'es',
  de: 'de',
	cn: 'cn',
	tw: 'tw',
} as const satisfies Record<Exclude<LocaleCodes, 'ja-ks'>, string>;

export type LocaleCodes = typeof localesConst[number]['code'];

export const localePathRegex = new RegExp(`^/(${localesConst.map((v) => v.code).join('|')})/`);

export const locales = localesConst as unknown as LocaleDef[];
