/*
 * SPDX-FileCopyrightText: syuilo and other misskey contributors
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { VNode, h } from 'vue';
import * as mfm from 'mfm-js';
import MkGoogle from '@/components/mk/Google.vue';
import MkSparkle from '@/components/mk/Sparkle.vue';
import MkCustomEmoji from '@/components/mk/CustomEmoji.vue';
import MkMention from '@/components/mk/Mention.vue';
import NuxtLink from '@/components/g/NuxtLink.vue';
import ProseAVue from '@/components/content/ProseA.vue';

const QUOTE_STYLE = `
display: block;
margin: 8px;
padding: 6px 0 6px 12px;
color: currentColor;
border-left: solid 3px currentColor;
opacity: 0.7;
`.split('\n').join(' ');

export default function(props: {
	text: string;
	plain?: boolean;
	nowrap?: boolean;
	isNote?: boolean;
	emojiUrls?: string[];
	rootScale?: number;
	baseHost?: string;
}) {
	const isNote = props.isNote !== undefined ? props.isNote : true;

	if (props.text == null || props.text === '') return;

	const ast = (props.plain ? mfm.parseSimple : mfm.parse)(props.text);

	const validTime = (t: string | null | undefined) => {
		if (t == null) return null;
		return t.match(/^[0-9.]+s$/) ? t : null;
	};

	const useAnim = true;

	/**
	 * Gen Vue Elements from MFM AST
	 * @param ast MFM AST
	 * @param scale How times large the text is
	 */
	const genEl = (ast: mfm.MfmNode[], scale: number) => ast.map((token): VNode | string | (VNode | string)[] => {
		switch (token.type) {
			case 'text': {
				const text = token.props.text.replace(/(\r\n|\n|\r)/g, '\n');

				if (!props.plain) {
					const res: (VNode | string)[] = [];
					for (const t of text.split('\n')) {
						res.push(h('br'));
						res.push(t);
					}
					res.shift();
					return res;
				} else {
					return [text.replace(/\n/g, ' ')];
				}
			}

			case 'bold': {
				return [h('b', genEl(token.children, scale))];
			}

			case 'strike': {
				return [h('del', genEl(token.children, scale))];
			}

			case 'italic': {
				return h('i', {
					style: 'font-style: oblique;',
				}, genEl(token.children, scale));
			}

			case 'fn': {
				// TODO: CSSを文字列で組み立てていくと token.props.args.~~~ 経由でCSSインジェクションできるのでよしなにやる
				let style;
				switch (token.props.name) {
					case 'tada': {
						const speed = validTime(token.props.args.speed) ?? '1s';
						style = 'font-size: 150%;' + (useAnim ? `animation: tada ${speed} linear infinite both;` : '');
						break;
					}
					case 'jelly': {
						const speed = validTime(token.props.args.speed) ?? '1s';
						style = (useAnim ? `animation: mfm-rubberBand ${speed} linear infinite both;` : '');
						break;
					}
					case 'twitch': {
						const speed = validTime(token.props.args.speed) ?? '0.5s';
						style = useAnim ? `animation: mfm-twitch ${speed} ease infinite;` : '';
						break;
					}
					case 'shake': {
						const speed = validTime(token.props.args.speed) ?? '0.5s';
						style = useAnim ? `animation: mfm-shake ${speed} ease infinite;` : '';
						break;
					}
					case 'spin': {
						const direction =
							token.props.args.left ? 'reverse' :
								token.props.args.alternate ? 'alternate' :
									'normal';
						const anime =
							token.props.args.x ? 'mfm-spinX' :
								token.props.args.y ? 'mfm-spinY' :
									'mfm-spin';
						const speed = validTime(token.props.args.speed) ?? '1.5s';
						style = useAnim ? `animation: ${anime} ${speed} linear infinite; animation-direction: ${direction};` : '';
						break;
					}
					case 'jump': {
						const speed = validTime(token.props.args.speed) ?? '0.75s';
						style = useAnim ? `animation: mfm-jump ${speed} linear infinite;` : '';
						break;
					}
					case 'bounce': {
						const speed = validTime(token.props.args.speed) ?? '0.75s';
						style = useAnim ? `animation: mfm-bounce ${speed} linear infinite; transform-origin: center bottom;` : '';
						break;
					}
					case 'flip': {
						const transform =
							(token.props.args.h && token.props.args.v) ? 'scale(-1, -1)' :
								token.props.args.v ? 'scaleY(-1)' :
									'scaleX(-1)';
						style = `transform: ${transform};`;
						break;
					}
					case 'x2': {
						return h('span', {
							class: 'mfm-x2',
						}, genEl(token.children, scale * 2));
					}
					case 'x3': {
						return h('span', {
							class: 'mfm-x3',
						}, genEl(token.children, scale * 3));
					}
					case 'x4': {
						return h('span', {
							class: 'mfm-x4',
						}, genEl(token.children, scale * 4));
					}
					case 'font': {
						const family =
							token.props.args.serif ? 'serif' :
								token.props.args.monospace ? 'monospace' :
									token.props.args.cursive ? 'cursive' :
										token.props.args.fantasy ? 'fantasy' :
											token.props.args.emoji ? 'emoji' :
												token.props.args.math ? 'math' :
													null;
						if (family) style = `font-family: ${family};`;
						break;
					}
					case 'blur': {
						return h('span', {
							class: '_mfm_blur_',
						}, genEl(token.children, scale));
					}
					case 'rainbow': {
						const speed = validTime(token.props.args.speed) ?? '1s';
						style = useAnim ? `animation: mfm-rainbow ${speed} linear infinite;` : '';
						break;
					}
					case 'sparkle': {
						if (!useAnim) {
							return genEl(token.children, scale);
						}
						return h(MkSparkle, {}, genEl(token.children, scale));
					}
					case 'rotate': {
						const degrees = parseFloat(token.props.args.deg ?? '90');
						style = `transform: rotate(${degrees}deg); transform-origin: center center;`;
						break;
					}
					case 'position': {
						const x = parseFloat(token.props.args.x ?? '0');
						const y = parseFloat(token.props.args.y ?? '0');
						style = `transform: translateX(${x}em) translateY(${y}em);`;
						break;
					}
					case 'scale': {
						const x = Math.min(parseFloat(token.props.args.x ?? '1'), 5);
						const y = Math.min(parseFloat(token.props.args.y ?? '1'), 5);
						style = `transform: scale(${x}, ${y});`;
						scale = scale * Math.max(x, y);
						break;
					}
					case 'fg': {
						let color = token.props.args.color;
						if (!/^[0-9a-f]{3,6}$/i.test(color)) color = 'f00';
						style = `color: #${color};`;
						break;
					}
					case 'bg': {
						let color = token.props.args.color;
						if (!/^[0-9a-f]{3,6}$/i.test(color)) color = 'f00';
						style = `background-color: #${color};`;
						break;
					}
				}
				if (style == null) {
					return h('span', {}, ['$[', token.props.name, ' ', ...genEl(token.children, scale), ']']);
				} else {
					return h('span', {
						style: 'display: inline-block; ' + style,
					}, genEl(token.children, scale));
				}
			}

			case 'small': {
				return [h('small', {
					style: 'opacity: 0.7;',
				}, genEl(token.children, scale))];
			}

			case 'center': {
				return [h('div', {
					style: 'text-align:center;',
				}, genEl(token.children, scale))];
			}

			case 'url': {
				return [h(ProseAVue, {
					key: Math.random(),
					href: token.props.url,
					target: '_blank',
					rel: 'nofollow noopener',
				}, token.props.url)];
			}

			case 'link': {
				return [h(NuxtLink, {
					key: Math.random(),
					to: token.props.url,
					target: '_blank',
					rel: 'nofollow noopener',
				}, genEl(token.children, scale))];
			}

			case 'mention': {
				//@ts-ignore
				return [h(MkMention, {
					key: Math.random(),
					host: (token.props.host) ?? props.baseHost,
					localHost: props.baseHost,
					username: token.props.username,
				})];
			}

			case 'hashtag': {
				return [h(NuxtLink, {
					key: Math.random(),
					to: `https://${props.baseHost ?? 'misskey.io'}/tags/${encodeURIComponent(token.props.hashtag)}`,
					style: 'color:rgb(255, 145, 86);',
				}, `#${token.props.hashtag}`)];
			}

			case 'quote': {
				if (!props.nowrap) {
					return [h('div', {
						style: QUOTE_STYLE,
					}, genEl(token.children, scale))];
				} else {
					return [h('span', {
						style: QUOTE_STYLE,
					}, genEl(token.children, scale))];
				}
			}

			case 'emojiCode': {
				// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
				return [h(MkCustomEmoji, {
					key: Math.random(),
					name: token.props.name,
					normal: props.plain,
					host: props.baseHost,
					useOriginalSize: scale >= 2.5,
				})];
			}

			case 'unicodeEmoji': {
				return [h('img', {
					style: 'display:inline;height:1.25em;vertical-align:-.25em;',
					src: `https://cdn.jsdelivr.net/gh/jdecked/twemoji@latest/assets/svg/${token.props.emoji.codePointAt(0)?.toString(16)}.svg`,
				})];
			}

			case 'mathInline': {
				return [h('code', token.props.formula)];
			}

			case 'mathBlock': {
				return [h('code', token.props.formula)];
			}

			case 'inlineCode': {
				return [h('code', token.props.code)];
			}

			case 'blockCode': {
				return [h('pre', {
					class: 'p-4 bg-gray-200/50 rounded',
				}, h('code', token.props.code))];
			}

			case 'search': {
				return [h(MkGoogle, {
					key: Math.random(),
					q: token.props.query,
				})];
			}

			case 'plain': {
				return [h('span', genEl(token.children, scale))];
			}

			default: {
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				console.error('unrecognized ast type:', (token as any).type);

				return [];
			}
		}
	}).flat(Infinity) as (VNode | string)[];

	return h('span', {
		// https://codeday.me/jp/qa/20190424/690106.html
		style: props.nowrap ? 'white-space: pre; word-wrap: normal; overflow: hidden; text-overflow: ellipsis;' : 'white-space: pre-wrap;',
	}, genEl(ast, props.rootScale ?? 1));
}