---
description: MFMは、Misskeyの様々な場所で使用できる専用のマークアップ言語です。
---

# MFM

MFMは、Markup language For Misskeyの略で、Misskeyの様々な場所で使用できる専用のマークアップ言語です。一部の構文はMarkdownやHTMLと互換性があります。

:::tip

実際にMFMをお試しいただける[MFMお試しコーナー](/tools/mfm-playground/)ができました！

:::

## MFMが使用可能な場所の例

- ノート本文
- CW注釈
- ユーザーの名前
- ユーザーの自己紹介

## 構文

### メンション

アットマーク + ユーザー名で、特定のユーザーを示すことができます。
:::tip

メンションについての詳細は[こちら](./mention.md)を参照してください。

:::

```
@ai
```

<MfmPreview text="@ai"></MfmPreview>

```
@repo@p1.a9z.dev
```

<MfmPreview text="@repo@p1.a9z.dev"></MfmPreview>

### ハッシュタグ

ナンバーサイン + タグで、ハッシュタグを示すことができます。
:::tip

ハッシュタグについての詳細は[こちら](./hashtag.md)を参照してください。

:::

```
#misskey
```

<MfmPreview text="#misskey"></MfmPreview>

### URL

URLを示すことができます。

```
https://example.com
```

<MfmPreview text="https://example.com"></MfmPreview>

### リンク

文章の特定の範囲を、URLに紐づけることができます。

```
[example link](https://example.com)
```

:::tip

リンクテキストの前に`?`をつけると、リンクプレビューを非表示にすることができます。

```
?[example link](https://example.com)
```

:::

<MfmPreview text="[example link](https://example.com)"></MfmPreview>

### カスタム絵文字

コロンでカスタム絵文字名を囲むと、カスタム絵文字を表示させることができます。

:::tip

カスタム絵文字についての詳細は[こちら](./custom-emoji.md)を参照してください。

:::

```
:misskey:
```

<MfmPreview text=":misskey:"></MfmPreview>

### 太字

文字を太く表示して強調することができます。

```
**太字**
```

<MfmPreview text="**太字**"></MfmPreview>

### 目立たなくする

内容を小さく・薄く表示させることができます。

```
<small>MisskeyでFediverseの世界が広がります</small>
```

<MfmPreview text="<small>MisskeyでFediverseの世界が広がります</small>"></MfmPreview>

### 引用

内容が引用であることを示すことができます。

```
> MisskeyでFediverseの世界が広がります
```

<MfmPreview text="> MisskeyでFediverseの世界が広がります"></MfmPreview>

### 中央寄せ

内容を中央寄せで表示させることができます。

```
<center>MisskeyでFediverseの世界が広がります</center>
```

<MfmPreview text="<center>MisskeyでFediverseの世界が広がります</center>"></MfmPreview>

### よみがな（ルビ）

内容によみがなを付けることができます。

```
$[ruby Misskey ミスキー] 
```

<MfmPreview text="$[ruby Misskey ミスキー]"></MfmPreview>

### コード(インライン)

プログラムなどのコードをインラインでシンタックスハイライトします。

```
`<: "Hello, world!"`
```

### コード(ブロック)

複数行のプログラムなどのコードをブロックでシンタックスハイライトします。

プログラミング言語をIDで指定すると、その言語でシンタックスハイライトが適用されます。指定できる言語は次のとおりです：

- [Shikiが対応している言語（200以上）](https://shiki.style/languages)
- AiScript: `aiscript`, `ais`, `is` のいずれかを指定すると使用できます。

````
```ais
for (let i, 100) {
	<: if ((i % 15) == 0) "FizzBuzz"
		elif ((i % 3) == 0) "Fizz"
		elif ((i % 5) == 0) "Buzz"
		else i
}
```
````

### 反転

内容を上下または左右に反転させます。

```
$[flip MisskeyでFediverseの世界が広がります]
$[flip.v MisskeyでFediverseの世界が広がります]
$[flip.h,v MisskeyでFediverseの世界が広がります]
```

<MfmPreview text="$[flip MisskeyでFediverseの世界が広がります]
$[flip.v MisskeyでFediverseの世界が広がります]
$[flip.h,v MisskeyでFediverseの世界が広がります]"></MfmPreview>

### フォント

内容のフォントを指定することができます。

```
$[font.serif MisskeyでFediverseの世界が広がります]
$[font.monospace MisskeyでFediverseの世界が広がります]
$[font.cursive MisskeyでFediverseの世界が広がります]
$[font.fantasy MisskeyでFediverseの世界が広がります]
```

<MfmPreview text="$[font.serif MisskeyでFediverseの世界が広がります]
$[font.monospace MisskeyでFediverseの世界が広がります]
$[font.cursive MisskeyでFediverseの世界が広がります]
$[font.fantasy MisskeyでFediverseの世界が広がります]"></MfmPreview>

### ぼかし

内容をぼかすことができます。ポインターを上に乗せるとはっきり見えるようになります。

```
$[blur MisskeyでFediverseの世界が広がります]
```

<MfmPreview text="$[blur MisskeyでFediverseの世界が広がります]"></MfmPreview>

### 検索

検索ボックスを表示できます。

```
misskey 検索
```

<MfmPreview text="misskey 検索"></MfmPreview>

### 文字色・背景色

文字色と背景色を変更することができます。

3,4,6桁のカラーコードで色を表現します。

```
$[fg.color=f00 赤字]
$[bg.color=ff0 黄背景]
```

<MfmPreview text="$[fg.color=f00 赤字]
$[bg.color=ff0 黄背景]"></MfmPreview>

### 枠線

内容を枠線で囲むことができます。様々なスタイルを指定することができます。

```
$[border.style=solid,width=4 Default]

$[border.style=hidden No border]

$[border.style=dotted,width=2 Dotted]
$[border.style=dashed,width=2 Dashed]
$[border.style=double,width=4 Double]

$[border.style=groove,width=4 Embossed A]
$[border.style=ridge,width=4 Embossed B]

$[border.style=inset,width=4 Inset A]
$[border.style=outset,width=4 Inset B]

$[border.color=d00 Border color]
$[border.width=5 Border width]

$[border.radius=6,width=2 Border radius]

$[border.radius=5,width=2,color=888 $[position.x=1.5 ＣＳＳ]
$[position.x=1.5 完全に理解した]]

$[border.radius=5,width=2,color=888,noclip $[position.x=1.5 ＣＳＳ]
$[position.x=1.5 完全に理解した]]
```

<MfmPreview text="$[border.style=solid,width=4 Default]\
$[border.style=hidden No border]\
$[border.style=dotted,width=2 Dotted]\
$[border.style=dashed,width=2 Dashed]\
$[border.style=double,width=4 Double]\
$[border.style=groove,width=4 Embossed A]\
$[border.style=ridge,width=4 Embossed B]\
$[border.style=inset,width=4 Inset A]\
$[border.style=outset,width=4 Inset B]\
$[border.color=d00 Border color]\
$[border.width=5 Border width]\
$[border.radius=6,width=2 Border radius]\
$[border.radius=5,width=2,color=888 $[position.x=1.5 ＣＳＳ]
$[position.x=1.5 完全に理解した]]\
$[border.radius=5,width=2,color=888,noclip $[position.x=1.5 ＣＳＳ]
$[position.x=1.5 完全に理解した]]"></MfmPreview>

### 角度変更

指定した角度で回転させます。

```
$[rotate.deg=30 misskey]
```

<MfmPreview text="$[rotate.deg=30 misskey]"></MfmPreview>

### 位置変更

位置をずらすことができます。

```
😏$[position.x=0.8,y=0.5 🍮]😀
```

<MfmPreview text="😏$[position.x=0.8,y=0.5 🍮]😀"></MfmPreview>

### 拡大

文字を引き延ばして表示します。

```
$[scale.x=4,y=2 🍮]
```

<MfmPreview text="$[scale.x=4,y=2 🍮]"></MfmPreview>

```
$[x2 x2]
$[x3 x3]
$[x4 x4]
```

<MfmPreview text="$[x2 x2]
$[x3 x3]
$[x4 x4]"></MfmPreview>

### アニメーション(びよんびよん)

```
$[jelly 🍮] $[jelly.speed=5s 🍮]
```

<MfmPreview text="$[x2 $[jelly 🍮] $[jelly.speed=5s 🍮]]"></MfmPreview>

### アニメーション(じゃーん)

```
$[tada 🍮] $[tada.speed=5s 🍮]
```

<MfmPreview text="$[x2 $[tada 🍮] $[tada.speed=5s 🍮]]"></MfmPreview>

### アニメーション(ジャンプ)

```
$[jump 🍮] $[jump.speed=5s 🍮]
```

<MfmPreview text="$[x2 $[jump 🍮] $[jump.speed=5s 🍮]]"></MfmPreview>

### アニメーション(バウンド)

```
$[bounce 🍮] $[bounce.speed=5s 🍮]
```

<MfmPreview text="$[x2 $[bounce 🍮] $[bounce.speed=5s 🍮]]"></MfmPreview>

### アニメーション(回転)

```
$[spin 🍮] $[spin.left 🍮] $[spin.alternate 🍮]
$[spin.x 🍮] $[spin.x,left 🍮] $[spin.x,alternate 🍮]
$[spin.y 🍮] $[spin.y,left 🍮] $[spin.y,alternate 🍮]

$[spin.speed=5s 🍮]
```

<MfmPreview text="$[x2 $[spin 🍮] $[spin.left 🍮] $[spin.alternate 🍮]
$[spin.x 🍮] $[spin.x,left 🍮] $[spin.x,alternate 🍮]
$[spin.y 🍮] $[spin.y,left 🍮] $[spin.y,alternate 🍮]
$[spin.speed=5s 🍮]]"></MfmPreview>

### アニメーション(ぶるぶる)

```
$[shake 🍮] $[shake.speed=5s 🍮]
```

<MfmPreview text="$[x2 $[shake 🍮] $[shake.speed=5s 🍮]]"></MfmPreview>

### アニメーション(ブレ)

```
$[twitch 🍮] $[twitch.speed=5s 🍮]
```

<MfmPreview text="$[x2 $[twitch 🍮] $[twitch.speed=5s 🍮]]"></MfmPreview>

### レインボー

```
$[rainbow 🍮] $[rainbow.speed=5s 🍮]
$[rainbow 色なし文字]
$[rainbow $[fg.color=f0f 色付き文字]]
```

<MfmPreview text="$[rainbow 🍮] $[rainbow.speed=5s 🍮]
$[rainbow 色なし文字]
$[rainbow $[fg.color=f0f 色付き文字]]"></MfmPreview>

### キラキラ

```
$[sparkle 🍮]
```

<MfmPreview text="$[x2 $[sparkle 🍮]]"></MfmPreview>

### プレーン

内側の構文を全て無効にします。

```
<plain>**bold** @mention #hashtag `code` $[x2 🍮]</plain>
```

<MfmPreview text="<plain>**bold** @mention #hashtag `code` $[x2 🍮]</plain>"></MfmPreview>

## 開発者向け情報

MFMのパーサーや描画の実装はライブラリとして公開されており、簡単にクライアントにMFMを組み込むことが可能です。

- [misskey-dev/mfm.js](https://github.com/misskey-dev/mfm.js) - JavaScriptパーサー実装
- [mfm-renderer](https://www.npmjs.com/package/mfm-renderer) - Vue.js用コンポーネント
- [mfm.kt](https://github.com/samunohito/mfm.kt) - Kotlinパーサー実装
- [mfm_parser](https://pub.dev/packages/mfm_parser) - Dartパーサー実装
- [mfm](https://pub.dev/packages/mfm) - Flutter用描画ウィジェット
