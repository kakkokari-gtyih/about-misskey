# プラグインの作成

Misskey Webクライアントのプラグイン機能を使うと、クライアントを拡張し、様々な機能を追加できます。
このドキュメントではプラグインの作成方法について説明します。

## プラグインの例

以下に完全なプラグインの例を示します。このプラグインは、[`Plugin:register_post_form_action`](/docs/for-developers/plugin/plugin-api-reference/#pluginregister_post_form_actiontitle-fn)を使用して、投稿フォームに「フグパンチボタン」を追加するものです。

このプラグインをインストールすると、投稿フォーム上のプラグインメニューに「フグパンチ」の項目が追加されます。クリックすると、投稿フォーム上のテキストに `ﾌｸﾞﾊﾟﾝﾁ!!!!🐡( '-' 🐡 )` が追加されます。

```ais
/// @ 0.12.4
### {
  name: "フグパンチボタン"
  version: "0.0.1"
  author: "Misskey Project"
}

Plugin:register_post_form_action('フグパンチ', @(note, rewrite) {
  let fugu = "ﾌｸﾞﾊﾟﾝﾁ!!!!🐡( '-' 🐡 )"

  if (note.text.trim() == '') {
    // ノートの中身がない場合はフグパンチに置き換え
    rewrite('text', fugu)
  } else {
    // ノートの中身がある場合は冒頭にフグパンチを追加して改行
    rewrite('text', `{fugu}{Str:lf}{note.text}`)
  }
})
```

## AiScript

プラグインはAiScriptを使って記述されるスクリプトです。

## メタデータ

プラグインは、AiScriptのメタデータ埋め込み機能を使って、デフォルトとしてプラグインのメタデータを定義する必要があります。メタデータの例は以下の通りです。

```AiScript
/// @ 0.12.4
### {
  name: "プラグイン名"
  version: "4.2.1"
  author: "作者名"
  description: "説明文"
}
```

メタデータは次のプロパティを含むオブジェクトです。

### name

プラグイン名

### author

プラグイン作者

### version

プラグインバージョン。数値を指定してください。

### description

プラグインの説明

### permissions

プラグインが要求する権限。MisskeyAPIにリクエストする際に用いられます。

APIのリクエスト方法については、[AiScript Misskey拡張API リファレンス](/docs/for-developers/plugin/plugin-api-reference/)をご覧ください。

:::tip

permissionの一覧は[こちら](/docs/for-developers/api/permission/)をご覧ください。

:::

### config

プラグインの設定情報を表すオブジェクト。
キーに設定名、値に以下のプロパティを含めます。

#### type

設定値の種類を表す文字列。以下から選択します。
string number boolean

#### label

ユーザーに表示する設定名

#### description

設定の説明

#### default

設定のデフォルト値

## API

Misskey Webはプラグインに対してAPIを公開していて、それらを利用することでクライアントの機能を拡張できます。
どのようなAPIがあるかは[AiScript Misskey拡張API リファレンス](./plugin-api-reference/)を参照してください。

## プラグインを配布する

v2023.11.0以降では、あなたのウェブサイトからワンクリックでプラグインを直接インストールできるようになっています。

プラグインのインストール機能を提供する場合は、あなたのサイト上にAPIを実装する必要があります。詳しくは[こちら](../publish-on-your-website.md)をご覧ください。
