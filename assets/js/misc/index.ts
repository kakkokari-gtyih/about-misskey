import type { ContentNavigationItem } from '@nuxt/content';
import type { LocaleObject } from '@nuxtjs/i18n';
import { parseURL } from 'ufo';

/**
 * オブジェクトのパス文字列からオブジェクトの内部を参照
 * @param o オブジェクト
 * @param s パス
 * @returns パスの先にあるもの
 */
export function resolveObjPath(o: Record<string, any>, s: string): any {
    s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
    s = s.replace(/^\./, '');           // strip a leading dot
    var a = s.split('.');
    for (var i = 0, n = a.length; i < n; ++i) {
        var k = a[i];
        if (k in o) {
            o = o[k];
        } else {
            return;
        }
    }
    return o;
}

/**
 * URLがドメイン内部かどうかを判別
 * @param link 判別したいURL
 * @param base ローカルの基準となるドメイン
 */
export function isLocalPath(link: string, base?: string): boolean {
    let baseUrl;

    if (base) {
        baseUrl = base;
    } else {
        const runtimeConfig = useRuntimeConfig();
        baseUrl = runtimeConfig.public.baseUrl;
    }

    const rootDomain = parseURL(base);
    const url = parseURL(link);

    return (!url.host || rootDomain.host === url.host);
}

export function sanitizeInternalPath(path: string): string {
    const runtimeConfig = useRuntimeConfig();
    return path
        .replace(/^(\/((?!ja)[a-z]{2}))?\/blog\/(.+)/g, '/ja/blog/$3')
        .replace(new RegExp(`^(\/(${(runtimeConfig.public.locales as LocaleObject[]).map((l) => l.code).join('|')})\/?){2,}(.*)$`, 'g'), '$1$2');
}

/**
 * ナビゲーションObjectを合致する条件まで深掘り
 * @param obj ナビゲーションObject
 * @param condition 深掘りを停止する条件
 * @returns 深掘りしたナビゲーションObject
 */
export const findDeepObject = (obj: ContentNavigationItem, condition: (v: ContentNavigationItem) => boolean): ContentNavigationItem | null => {
	if (condition(obj)) {
		return obj;
	}

	if (obj?.children && obj.children.length > 0) {
		for (let i = 0; i < obj.children.length; i++) {
			const result = findDeepObject(obj.children[i], condition);
			if (result) {
				return result;
			}
		}
	}

	return null;
};

/**
 * Clipboardに値をコピー(TODO: 文字列以外も対応)
 */
export function copyText(val: string) {
    if (!import.meta.client) return;

	// 空div 生成
	const tmp = document.createElement('div');
	// 選択用のタグ生成
	const pre = document.createElement('pre');

	// 親要素のCSSで user-select: none だとコピーできないので書き換える
	pre.style.webkitUserSelect = 'auto';
	pre.style.userSelect = 'auto';

	tmp.appendChild(pre).textContent = val;

	// 要素を画面外へ
	const s = tmp.style;
	s.position = 'fixed';
	s.right = '200%';

	// body に追加
	document.body.appendChild(tmp);
	// 要素を選択
	document.getSelection()?.selectAllChildren(tmp);

	// クリップボードにコピー
	const result = document.execCommand('copy');

	// 要素削除
	document.body.removeChild(tmp);

	return result;
}

/**
 * Converts half-width Katakana characters to full-width Katakana characters.
 * @param str - The string to convert.
 * @returns The converted string with full-width Katakana characters.
 */
export function kanaHalfToFull(str: string): string {
    const kanaMap: Record<string, string> = {
        'ｶﾞ': 'ガ', 'ｷﾞ': 'ギ', 'ｸﾞ': 'グ', 'ｹﾞ': 'ゲ', 'ｺﾞ': 'ゴ',
        'ｻﾞ': 'ザ', 'ｼﾞ': 'ジ', 'ｽﾞ': 'ズ', 'ｾﾞ': 'ゼ', 'ｿﾞ': 'ゾ',
        'ﾀﾞ': 'ダ', 'ﾁﾞ': 'ヂ', 'ﾂﾞ': 'ヅ', 'ﾃﾞ': 'デ', 'ﾄﾞ': 'ド',
        'ﾊﾞ': 'バ', 'ﾋﾞ': 'ビ', 'ﾌﾞ': 'ブ', 'ﾍﾞ': 'ベ', 'ﾎﾞ': 'ボ',
        'ﾊﾟ': 'パ', 'ﾋﾟ': 'ピ', 'ﾌﾟ': 'プ', 'ﾍﾟ': 'ペ', 'ﾎﾟ': 'ポ',
        'ｳﾞ': 'ヴ', 'ﾜﾞ': 'ヷ', 'ｦﾞ': 'ヺ',
        'ｱ': 'ア', 'ｲ': 'イ', 'ｳ': 'ウ', 'ｴ': 'エ', 'ｵ': 'オ',
        'ｶ': 'カ', 'ｷ': 'キ', 'ｸ': 'ク', 'ｹ': 'ケ', 'ｺ': 'コ',
        'ｻ': 'サ', 'ｼ': 'シ', 'ｽ': 'ス', 'ｾ': 'セ', 'ｿ': 'ソ',
        'ﾀ': 'タ', 'ﾁ': 'チ', 'ﾂ': 'ツ', 'ﾃ': 'テ', 'ﾄ': 'ト',
        'ﾅ': 'ナ', 'ﾆ': 'ニ', 'ﾇ': 'ヌ', 'ﾈ': 'ネ', 'ﾉ': 'ノ',
        'ﾊ': 'ハ', 'ﾋ': 'ヒ', 'ﾌ': 'フ', 'ﾍ': 'ヘ', 'ﾎ': 'ホ',
        'ﾏ': 'マ', 'ﾐ': 'ミ', 'ﾑ': 'ム', 'ﾒ': 'メ', 'ﾓ': 'モ',
        'ﾔ': 'ヤ', 'ﾕ': 'ユ', 'ﾖ': 'ヨ',
        'ﾗ': 'ラ', 'ﾘ': 'リ', 'ﾙ': 'ル', 'ﾚ': 'レ', 'ﾛ': 'ロ',
        'ﾜ': 'ワ', 'ｦ': 'ヲ', 'ﾝ': 'ン',
        'ｧ': 'ァ', 'ｨ': 'ィ', 'ｩ': 'ゥ', 'ｪ': 'ェ', 'ｫ': 'ォ',
        'ｯ': 'ッ', 'ｬ': 'ャ', 'ｭ': 'ュ', 'ｮ': 'ョ',
        '｡': '。', '､': '、', 'ｰ': 'ー', '｢': '「', '｣': '」', '･': '・'
    };

    var reg = new RegExp('(' + Object.keys(kanaMap).join('|') + ')', 'g');
    return str.replace(reg, (m) => kanaMap[m]).replace(/ﾞ/g, '゛').replace(/ﾟ/g, '゜');
};
