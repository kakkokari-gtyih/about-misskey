# 嵌入网站

可以将 Misskey 服务器上的帖子或者是时间线嵌入到网页内。
另外，还可以依据所嵌入的网页灵活地自定义外观。

在此将说明嵌入内容及如何嵌入。

:::warning

此功能仅在 Misskey v2024.9.0 以后的版本中可用。

:::

:::tip

虽然支持显示 MFM 或者自定义表情符号等，但根据目标页面的表示方法，有可能会发生布局崩坏。

:::

## 使用生成器生成嵌入代码

下面列出的所有嵌入代码和自定义都可以使用 Misskey Web 的内置嵌入代码生成器轻松完成。
基本上，建议使用这种方法。

![嵌入代码生成器](/img/docs/for-users/features/embed/generator.png)

## 嵌入单个帖子

::MiWebEmbed{src="https://0key.dev/embed/notes/9tht7ungi81f0005"}
::

可在源服务器上嵌入单个的（远程服务器上的的不能使用其他服务器嵌入）。代码如下：

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

需要替换的部分如下：

- `<HOST>`: Misskey 服务器的主机名
- `<NOTE_ID>`: 要嵌入的帖子的 ID
- `<RANDOM>`: 随机字符串（如果使用 embed.js ，则为必填项。如果同一页面中有多个嵌入代码，请确保它们不重复）

## 嵌入用户的帖子列表

::MiWebEmbed{src="https://0key.dev/embed/user-timeline/9tht7g9ki81f0002?maxHeight=500"}
::

可以嵌入用户公开的帖子列表（公开/主页）。代码如下：

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

需要替换的部分如下：

- `<HOST>`: Misskey 服务器的主机名
- `<USER_ID>`: 要嵌入的用户的 ID（不是以 @ 开头的用户名）
- `<RANDOM>`: 随机字符串（如果使用 embed.js ，则为必填项。如果同一页面中有多个嵌入代码，请确保它们不重复）

## 嵌入收藏的帖子列表

::MiWebEmbed{src="https://0key.dev/embed/clips/9y5mpno6871g00gv?maxHeight=500"}
::

可以嵌入公开收藏的帖子列表。代码如下：

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

需要替换的部分如下：

- `<HOST>`: Misskey 服务器的主机名
- `<CLIP_ID>`: 要嵌入的收藏夹的 ID
- `<RANDOM>`: 随机字符串（如果使用 embed.js ，则为必填项。如果同一页面中有多个嵌入代码，请确保它们不重复）

## 嵌入带有特定标签的帖子列表

::MiWebEmbed{src="https://0key.dev/embed/tags/misskey?maxHeight=500"}
::

可以嵌入带有特定标签的帖子列表。代码如下：

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

需要替换的部分如下：

- `<HOST>`: Misskey 服务器的主机名
- `<TAG>`: 标签名称（不包含`#`）
- `<RANDOM>`: 随机字符串（如果使用 embed.js ，则为必填项。如果同一页面中有多个嵌入代码，请确保它们不重复）

## 自定义参数

通过在 URL 参数中指定特定值，可以自定义嵌入内容的外观。

<table>
	<tbody><tr>
		<th>参数名</th>
		<th>可设定的值</th>
		<th>说明</th>
	</tr>
    <tr>
		<td><code>maxHeight</code></td>
		<td>0以上的值</td>
		<td>
            指定嵌入内容的最大高度（px）如果内容超出指定高度，则会在内部启用滚动功能。<br>
            指定为<code>0</code>时，嵌入元素的高度会根据内部内容的高度自动调整<b>（不推荐）</b>                        。<br>
            如果未指定，默认值为<code>700</code>。<br>
            此功能不适用于单个帖子嵌入。        
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
		<td>强制将颜色模式设置为亮色或暗色。<br>如果未指定，则会与设备的暗色模式同步。</td>
	</tr>
	<tr>
		<td><code>border</code></td>
		<td>
            <ul>
                <li><code>true</code></li>
                <li><code>false</code></li>
            </ul>
        </td>
		<td>是否为外框添加边框。未指定时默认为<code>true</code></td>
	</tr>
	<tr>
		<td><code>rounded</code></td>
		<td>
            <ul>
                <li><code>true</code></li>
                <li><code>false</code></li>
            </ul>
        </td>
		<td>是否将角设置为圆角。未指定时默认为<code>true</code></td>
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
            是否显示顶部的标题栏。未指定时默认为<code>true</code><br>
            在嵌入单个帖子时，此功能无效。    
        </td>
	</tr>
</tbody></table>

:::g-details{summary="maxHeight=0 的使用方式"}

通常不推荐将`maxHeight`设置为`0`，但在某些特殊用途下（例如，希望将滚动容器放在嵌入网站的外部，而不是 iframe 内部）可能会有用。示例如下：

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
