---
description: 本指南介紹如何使用 Docker 安裝設置 Misskey。
---

# 使用 Docker Compose 建置 Misskey

本指南介紹如何使用 Docker Compose 安裝設置 Misskey。

:::danger

一旦開始使用，請勿使用伺服器的域名以及主機名稱重新建立資料庫！

:::

:::tip{label='前提条件'}

- 必須安裝 Docker 和 Docker Compose。

:::

## 取得 Misskey 原始碼

```sh
git clone -b master https://github.com/misskey-dev/misskey.git
cd misskey
git checkout master
```

## 設定

使用以下命令複製各種設定檔的範例。

```sh
cp .config/docker_example.yml .config/default.yml
cp .config/docker_example.env .config/docker.env
cp ./compose_example.yml ./compose.yml
```

按照檔案中的說明編輯 `default.yml` 和 `docker.env`。\
如有必要，也請編輯 `compose.yml`。（例如，如果您想更改連接埠）

## 建構和初始化

使用以下命令建構 Misskey 並初始化資料庫。
這需要一些時間。

```shell
sudo docker compose build
sudo docker compose run --rm web pnpm run init
```

## 啟動

辛苦了。可以使用以下指令啟動 Misskey。

```sh
sudo docker compose up -d
```

GLHF✨

## 如何更新Miskey

:::warning

在進行更新時，請務必確認[變更日誌](https://github.com/misskey-dev/misskey/blob/master/CHANGELOG.md)，預先了解變更和可能需要的作業（通常不需要）。

:::

```sh
git stash
git checkout master
git pull
git submodule update --init
git stash pop
sudo docker compose build
sudo docker compose stop && sudo docker compose up -d
```

根據更新內容和資料庫大小，可能需要一些時間。

## 如何執行 cli 命令

```sh
sudo docker compose run --rm web node packages/backend/built/tools/foo bar
```
