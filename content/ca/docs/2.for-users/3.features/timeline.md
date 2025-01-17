# タイムライン

タイムラインは、[ノート](/docs/for-users/features/note/)が時系列で表示される機能です。
タイムラインには以下で示す種類があり、種類によって表示されるノートも異なります。
なお、タイムラインの種類によってはサーバーにより無効になっている場合があります。

## ホーム

自分のフォローしているユーザーの投稿が流れます。HTLと略されます。

## ローカル

全てのローカルユーザーの「ホーム」指定されていない投稿が流れます。LTLと略されます。

## ソーシャル

自分のフォローしているユーザーの投稿と、全てのローカルユーザーの「ホーム」指定されていない投稿が流れます。STLと略されます。

## グローバル

全てのローカルユーザーの「ホーム」指定されていない投稿と、サーバーに届いた全てのリモートユーザーの「ホーム」指定されていない投稿が流れます。GTLと略されます。

## 比較

<table>
    <thead>
        <tr>
            <th scope="col" rowspan="2">ソース</th>
            <th scope="col" rowspan="2">公開範囲</th>
            <th scope="col" colspan="4">タイムライン</th>
        </tr>
        <tr>
            <th scope="col">ホーム</th>
            <th scope="col">ローカル</th>
            <th scope="col">ソーシャル</th>
            <th scope="col">グローバル</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th scope="row" rowspan="3">ローカル（フォロー）</th>
            <th scope="row">公開</th>
            <td>✔</td>
            <td>✔</td>
            <td>✔</td>
            <td>✔</td>
        </tr>
        <tr>
            <th scope="row">ホーム</th>
            <td>✔</td>
            <td></td>
            <td>✔</td>
            <td></td>
        </tr>
        <tr>
            <th scope="row">フォロワー</th>
            <td>✔</td>
            <td></td>
            <td>✔</td>
            <td></td>
        </tr>
        <tr>
            <th scope="row" rowspan="3">リモート（フォロー）</th>
            <th scope="row">公開</th>
            <td>✔</td>
            <td></td>
            <td>✔</td>
            <td>✔</td>
        </tr>
        <tr>
            <th scope="row">ホーム</th>
            <td>✔</td>
            <td></td>
            <td>✔</td>
            <td></td>
        </tr>
        <tr>
            <th scope="row">フォロワー</th>
            <td>✔</td>
            <td></td>
            <td>✔</td>
            <td></td>
        </tr>
        <tr>
            <th scope="row" rowspan="3">ローカル（未フォロー）</th>
            <th scope="row">公開</th>
            <td></td>
            <td>✔</td>
            <td>✔</td>
            <td>✔</td>
        </tr>
        <tr>
            <th scope="row">ホーム</th>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <th scope="row">フォロワー</th>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <th scope="row">リモート（未フォロー）</th>
            <th scope="row">公開</th>
            <td></td>
            <td></td>
            <td></td>
            <td>✔</td>
        </tr>
    </tbody>
</table>
