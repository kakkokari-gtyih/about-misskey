# Nginxの設定

[nginx](https://nginx.org/)をリバースプロキシとして活用し、Misskeyサーバーを直接インターネットに公開せず運用することをお勧めします。
これにより、以下のようなメリットが得られます。

- セキュリティ強化：リバースプロキシを通じてアクセスを制御することで、Misskeyサーバーに直接攻撃が及ぶリスクを軽減します。
- 柔軟な設定：nginxは柔軟な設定オプションを提供しており、リバースプロキシとしての機能だけでなく、キャッシュ[^1]やセキュリティポリシーの設定も行えます。

これらの利点を活かして、Misskeyサーバーをより安全かつ効率的に運用することが可能です。
また、CloudflareなどのCDNと併せて設定することで、さらなる効果を見込めます。

[^1]: nginxの機能である[proxy_cache_lock](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_cache_lock)と[proxy_cache_use_stale](http://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_cache_use_stale)を活用することで、キャッシュ未作成の状態で大量アクセスがあってもMisskeyサーバーの負荷増大を抑える効果が期待できます。

## 設定方法の一例

以下はサーバーマシン（VPSなど）に直接nginxをインストールし、認証局として[Let's Encrypt](https://letsencrypt.org/)を採用したケースでの設定例です。

1. `/etc/nginx/conf.d/misskey.conf`もしくは`/etc/nginx/sites-available/misskey.conf`を作成し、下の設定例をコピーします。\
   （ファイル名はmisskeyでなくても構いません。）
2. 次のように編集します。
   1. example.tldを自分が用意したドメインに置き換えます。\
      `ssl_certificate`と`ssl_certificate_key`はLet's Encryptで取得した証明書のパスになるようにします。
   2. CloudflareなどのCDNを使う場合は、「If it's behind another reverse proxy or CDN, remove the following.」から4行を削除します。
3. `/etc/nginx/sites-available/misskey.conf`を作成した場合は、`/etc/nginx/sites-enabled/misskey.conf`としてシンボリックリンクを作成します。\
   `sudo ln -s /etc/nginx/sites-available/misskey.conf /etc/nginx/sites-enabled/misskey.conf`
4. `sudo nginx -t` で設定ファイルが正常に読み込まれるか確認します。
5. `sudo systemctl restart nginx` でnginxを再起動します。

## 設定例

```nginx
# For WebSocket
map $http_upgrade $connection_upgrade {
    default upgrade;
    ''      close;
}

proxy_cache_path /tmp/nginx_cache levels=1:2 keys_zone=cache1:16m max_size=1g inactive=720m use_temp_path=off;

server {
    listen 80;
    listen [::]:80;
    server_name example.tld;

    # For SSL domain validation
    root /var/www/html;
    location /.well-known/acme-challenge/ { allow all; }
    location /.well-known/pki-validation/ { allow all; }
    location / { return 301 https://$server_name$request_uri; }
}

server {
    listen 443 ssl;
    listen [::]:443 ssl;
    http2 on;
    server_name example.tld;

    ssl_session_timeout 1d;
    ssl_session_cache shared:ssl_session_cache:10m;
    ssl_session_tickets off;

    # To use Let's Encrypt certificate
    ssl_certificate     /etc/letsencrypt/live/example.tld/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/example.tld/privkey.pem;

    # To use Debian/Ubuntu's self-signed certificate (For testing or before issuing a certificate)
    #ssl_certificate     /etc/ssl/certs/ssl-cert-snakeoil.pem;
    #ssl_certificate_key /etc/ssl/private/ssl-cert-snakeoil.key;

    # SSL protocol settings
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384;
    ssl_prefer_server_ciphers off;
    ssl_stapling on;
    ssl_stapling_verify on;

    # Change to your upload limit
    client_max_body_size 80m;

    # Proxy to Node
    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_http_version 1.1;
        proxy_redirect off;

        # If it's behind another reverse proxy or CDN, remove the following.
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto https;

        # For WebSocket
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection $connection_upgrade;

        # Cache settings
        proxy_cache cache1;
        proxy_cache_lock on;
        proxy_cache_use_stale updating;
        proxy_force_ranges on;
        add_header X-Cache $upstream_cache_status;
    }
}
```
