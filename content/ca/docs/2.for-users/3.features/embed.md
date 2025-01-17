# ウェブサイトへの埋め込み

Misskeyサーバー上のノートやタイムラインをお持ちのウェブサイトに埋め込むことができます。
また、埋め込み先のウェブサイトの見た目に合わせて柔軟にカスタマイズすることもできます。

ここでは、埋め込めるコンテンツと埋め込み方法について説明します。

:::warning

この機能は、Misskey v2024.9.0以降で利用可能になる機能です。

:::

:::tip

MFMやカスタム絵文字などにも対応していますが、埋め込み先ページでの表示方法によってはレイアウトが崩れる可能性があります。

:::

## ジェネレーターを使用して埋め込みコードを生成する

以下で紹介する埋め込みコードおよびそのカスタマイズは、すべてMisskey Webに内蔵されている埋め込みコードジェネレーターを使用して簡単に行うことができます。
基本的にはそちらを利用することをおすすめします。

![埋め込みコードジェネレーター](/img/docs/for-users/features/embed/generator.png)

## 単一のノートの埋め込み

::MiWebEmbed{src="https://0key.dev/embed/notes/9tht7ungi81f0005"}
::

埋め込み元サーバー上の、単一のノートを埋め込むことができます（リモートサーバーのノートを他のサーバーを利用して埋め込むことはできません）。コードは以下のようになります：

```html
<iframe
    src="https://<HOST>/embed/notes/<NOTE_ID>"
    data-misskey-embed-id="v1_<RANDOM>"
    loading="lazy"
    referrerpolicy="strict-origin-when-cross-origin"
    style="border: none; width: 100%; max-width: 500px; height: 300px; color-scheme: light dark;"
></iframe>
<script defer src="https://<HOST>/embed.js"></script>
```

それぞれ、以下のように置き換えられます：

- `<HOST>`: Misskeyサーバーのホスト名
- `<NOTE_ID>`: 埋め込むノートのID
- `<RANDOM>`: ランダムな文字列（embed.jsを使用する場合は必須。埋め込みコードが同じページに複数ある場合は被らないようにしてください）

## ユーザーのノート一覧の埋め込み

::MiWebEmbed{src="https://0key.dev/embed/user-timeline/9tht7g9ki81f0002?maxHeight=500"}
::

ユーザーの公開ノート（パブリック・ホーム）の一覧を埋め込むことができます。コードは以下のようになります：

```html
<iframe
    src="https://<HOST>/embed/user-timeline/<USER_ID>"
    data-misskey-embed-id="v1_<RANDOM>"
    loading="lazy"
    referrerpolicy="strict-origin-when-cross-origin"
    style="border: none; width: 100%; max-width: 500px; height: 300px; color-scheme: light dark;"
></iframe>
<script defer src="https://<HOST>/embed.js"></script>
```

それぞれ、以下のように置き換えられます：

- `<HOST>`: Misskeyサーバーのホスト名
- `<USER_ID>`: 埋め込むユーザーのID（`@`から始まるユーザー名ではありません）
- `<RANDOM>`: ランダムな文字列（embed.jsを使用する場合は必須。埋め込みコードが同じページに複数ある場合は被らないようにしてください）

## クリップのノート一覧の埋め込み

::MiWebEmbed{src="https://0key.dev/embed/clips/9y5mpno6871g00gv?maxHeight=500"}
::

公開範囲がパブリックなクリップのノート一覧を埋め込むことができます。コードは以下のようになります：

```html
<iframe
    src="https://<HOST>/embed/clips/<CLIP_ID>"
    data-misskey-embed-id="v1_<RANDOM>"
    loading="lazy"
    referrerpolicy="strict-origin-when-cross-origin"
    style="border: none; width: 100%; max-width: 500px; height: 300px; color-scheme: light dark;"
></iframe>
<script defer src="https://<HOST>/embed.js"></script>
```

それぞれ、以下のように置き換えられます：

- `<HOST>`: Misskeyサーバーのホスト名
- `<CLIP_ID>`: 埋め込むクリップのID
- `<RANDOM>`: ランダムな文字列（embed.jsを使用する場合は必須。埋め込みコードが同じページに複数ある場合は被らないようにしてください）

## ハッシュタグのノート一覧の埋め込み

::MiWebEmbed{src="https://0key.dev/embed/tags/misskey?maxHeight=500"}
::

特定のハッシュタグが付いたノートの一覧を埋め込むことができます。コードは以下のようになります：

```html
<iframe
    src="https://<HOST>/embed/tags/<TAG>"
    data-misskey-embed-id="v1_<RANDOM>"
    loading="lazy"
    referrerpolicy="strict-origin-when-cross-origin"
    style="border: none; width: 100%; max-width: 500px; height: 300px; color-scheme: light dark;"
></iframe>
<script defer src="https://<HOST>/embed.js"></script>
```

それぞれ、以下のように置き換えられます：

- `<HOST>`: Misskeyサーバーのホスト名
- `<TAG>`: ハッシュタグ名（`#`を含まない）
- `<RANDOM>`: ランダムな文字列（embed.jsを使用する場合は必須。埋め込みコードが同じページに複数ある場合は被らないようにしてください）

## カスタマイズ用のパラメータ

URLパラメータに特定の値を指定することで、埋め込みの見た目をカスタマイズすることができます。

<table>
	<tbody><tr>
		<th>パラメータ名</th>
		<th>指定できる値</th>
		<th>説明</th>
	</tr>
    <tr>
		<td><code>maxHeight</code></td>
		<td>0以上の数値</td>
		<td>
            埋め込みの最大高さ（px）を指定します。それ以上縦に伸びる場合は内部でスクロールできるようになります。<br>
            <code>0</code> を指定すると、埋め込み要素の高さは内部の高さに合わせて自動で伸びていきます<b>（非推奨）</b>。<br>
            未指定の場合は <code>700</code> です。<br>
            単一のノートの埋め込みでは機能しません。        
</td>
	</tr>
	<tr>
		<td><code>colorMode</code></td>
		<td>
            <ul>
                <li><code>light</code></li>
                <li><code>dark</code></li>
            </ul>
        </td>
		<td>カラーモードをライトまたはダークに強制。<br>無指定でデバイスのダークモードと同期します。</td>
	</tr>
	<tr>
		<td><code>border</code></td>
		<td>
            <ul>
                <li><code>true</code></li>
                <li><code>false</code></li>
            </ul>
        </td>
		<td>外枠に枠線をつけるかどうか。無指定で <code>true</code></td>
	</tr>
	<tr>
		<td><code>rounded</code></td>
		<td>
            <ul>
                <li><code>true</code></li>
                <li><code>false</code></li>
            </ul>
        </td>
		<td>角丸にするかどうか。無指定で <code>true</code></td>
	</tr>
	<tr>
		<td><code>showHeader</code></td>
		<td>
            <ul>
                <li><code>true</code></li>
                <li><code>false</code></li>
            </ul>
        </td>
		<td>
            上部のヘッダーを表示するかどうか。無指定で <code>true</code><br>
            単一のノートの埋め込みでは機能しません。    
        </td>
	</tr>
</tbody></table>

:::g-details{summary="maxHeight=0 の使い道"}

`maxHeight` を `0` にするのは基本的におすすめしていませんが、スクロールコンテナをiframe内部ではなく埋め込むサイト側で用意しておきたい場合など、特殊な用途では有用です。以下に例を示します：

```html
<div class="misskey-embed">
    <div class="custom-header">
        Misskeyやってます！
    </div>
    <div class="iframe-container">
        <iframe
            src="https://<HOST>/embed/user-timeline/<USER_ID>?maxHeight=0&showHeader=false&border=false&rounded=false"
            data-misskey-embed-id="v1_<RANDOM>"
            loading="lazy"
            referrerpolicy="strict-origin-when-cross-origin"
            style="border: none; width: 100%; max-width: 500px; height: 300px; color-scheme: light dark;"
        ></iframe>
    </div>
</div>

<style>
    .misskey-embed {
        border: 1px solid #ccc;
        border-radius: 5px;
        overflow: hidden;
    }

    .custom-header {
        background-color: #f0f0f0;
        padding: 10px;
    }

    .iframe-container {
        max-height: 500px;
        overflow-y: auto;
    }
</style>
```

:::
