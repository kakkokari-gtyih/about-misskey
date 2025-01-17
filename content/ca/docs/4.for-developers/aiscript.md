# AiScript

AiScriptは、Misskeyの以下の箇所で使用できるスクリプト言語です。

- [プラグイン](./plugin/create-plugin/)
- [ウィジェット](/docs/for-users/features/widgets/)
  - ボタン
  - AiScriptコンソール
  - AiScript App
- [Misskey Play](./plugin/create-play/)
- スクラッチパッド

:::tip

AiScriptの実装はMisskeyとは別リポジトリで、[オープンソースで公開されています](https://github.com/aiscript-dev/aiscript)。

:::

## 使い方

AiScript標準の構文や組み込み関数などが使用できます。

:::tip

ドキュメントは[こちら](https://aiscript-dev.github.io/)\
Misskey本体のバージョンにより、使用できるAiScriptのバージョンが異なる場合があります。バージョンの確認には`<: Core:v`をScratchpadなどで実行してください。

:::

これらに加え、Misskey専用の組み込み定数・関数が３グループに分けて提供されています。

### Misskey AiScript API

接頭辞: `Mk:`\
Misskey内の全てのAiScript環境で使用できる定関数群です。
詳しくは[AiScript Misskey拡張API リファレンス](./plugin/plugin-api-reference/)の`Mk:`とついた部分を参照して下さい。

### プラグインAPI

接頭辞: `Plugin:`\
[プラグイン](./plugin/)でのみ使用できる定関数群です。
詳しくは[AiScript Misskey拡張API リファレンス](./plugin/plugin-api-reference/)の`Plugin:`とついた部分を参照して下さい。

### UI API

接頭辞: `Ui:`\
[ウィジェット](/docs/for-users/features/widgets/)（AiScript App）、[Misskey Play](./plugin/create-play/)、Scratchpadで使用できます。
詳しくは[AiScript Misskey拡張API リファレンス](./plugin/plugin-api-reference/)の`Ui:`とついた部分を参照して下さい。

### 標準入出力

AiScript標準で定義されている`readline`関数と`print`関数（および`<:`構文）の内部実装は、Misskey側で独自に提供されています。

#### readline(message)

`message`: `str`\
返り値: `str`\
Misskey内の全てのAiScript環境で使用できます。\
文字列の入力を求めるポップアップを表示します。

#### print(message)

`message`: `any`\
返り値: `null`\
[ウィジェット](/docs/for-users/features/widgets/)（AiScriptコンソール）、Scratchpadで使用できます。\
コンソールに文字列を出力します。\
`<:`構文も同様の働きをします。
