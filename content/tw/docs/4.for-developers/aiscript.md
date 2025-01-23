# AiScript

AiScript 是一種可用於 Misskey 以下部分的腳本語言。

- [外掛](./plugin/create-plugin/)
- [小工具](/docs/for-users/features/widgets/)
  - 按鈕
  - AiScript控制台
  - AiScript App
- [Misskey Play](./plugin/create-play/)
- Scratchpad

:::tip

AiScript 的實現與 Misskey 是分開的儲存庫，並已[以開源方式公開](https://github.com/aiscript-dev/aiscript)。

:::

## 使用方法

可使用 AiScript 標準語法和內建函數。

:::tip

說明文件在[這裡](https://aiscript-dev.github.io/)。視 Misskey 本身的版本而定，可用的 AiScript版本可能有所不同。可使用 AiScript 標準語法和內建函數。若要檢查版本，請使用 Scratchpad 或類似的軟體執行 `<: Core:v`。

:::

除此之外，還提供三組 Misskey 特有的內建常數和函式。

### Misskey AiScript API

字首: `Mk:`\
一套常數函數，可在 Misskey 內的所有 AiScript 環境中使用。如需更多資訊，請參閱[AiScript Misskey 擴展 Api 參考文件](./plugin/plugin-api-reference/)中標記為 `Mk:`的部分。

### 外掛 Api

字首: `Plugin:`\
[外掛](./plugin/)中限定使用的內建函數群。
如需詳細資訊，請參閱 [外掛 Api 參考文件](./plugin/plugin-api-reference/) 與 `Plugin:`。

### 使用者界面 API

接頭辞: `Ui:`\
[ウィジェット](/docs/for-users/features/widgets/)（AiScript App）、Misskey Play、Scratchpadで使用できます。
ドキュメントは未整備（TODO）ですが、インターネット上に有志の方が執筆された解説記事があります。

### 標準輸入輸出

AiScript 標準中定義的 `readline` 和 `print` 函式 (以及 `<:` 語法) 的內部實作，在 Misskey 端獨立提供。

#### readline(message)

`message`: `str`\
回傳值: `str`\
可在 Misskey 內的所有 AiScript 環境中使用。\
\
彈出提示輸入字串。

#### print(message)

`message`: `any`\
回傳值: `null`\
可在[小工具](/docs/for-users/features/widgets/)（AiScriptコンソール）、Scratchpad 使用。\
\
輸出字串到瀏覽器網頁開發者工具的主控台。\
\
跟`<:`語法的運作方式類似。
