// API用ファイル自動生成
import { locales } from "@/nuxt.config";
import * as misskey from "misskey-js";
import yaml from "js-yaml";
import fs from "fs";
import path from "path";
import { parse } from "@babel/parser";

// オブジェクト obj1 にないキーだけを、元オブジェクトにマージする関数
function mergeObjects(obj1: Record<string, any>, obj2: Record<string, any>): Record<string, any> {
    for (var key in obj2) {
        if (!obj1.hasOwnProperty(key)) {
            obj1[key] = obj2[key];
        } else if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
            mergeObjects(obj1[key], obj2[key]);
        }
    }
    return obj1;
}

const createFile = (filename: string, data: string): void => {
    const filePath = filename;

    fs.writeFile(filePath, data, { encoding: 'utf-8' }, (err) => {
        // ディレクトリ作成できなかったとき
        if (err && err.code === "ENOENT") {
            // ディレクトリ部分だけ切り取り
            const dir = filePath.substring(0, Math.max(filePath.lastIndexOf("/"), filePath.lastIndexOf("\\")));

            // 親ディレクトリ作成
            fs.mkdir(dir, { recursive: true }, (err) => {
                if (err) throw err;
                createFile(filename, data);
            });
            return;
        }
    });
};

/** API関連のファイルを自動生成 */
export async function genApiFiles() {

    const out: Record<string, any> = {
        _api: {
            // 権限
            _permissions: {},

            // 各エンドポイント
            _endpoints: {},

            // レスポンスコードの説明
            _responseCodes: {},

            // エラーの説明
            _errors: {},
        }
    };

    // 権限
    misskey.permissions.forEach((permission) => {
        out._api._permissions[permission] = 'Untranslated / 未翻訳';
    });

    // エンドポイント
    const ep = await fetch('https://misskey.noellabo.jp/api.json');
    const epj = await ep.json();
    Object.keys(epj.paths).forEach((path) => {
        const sanitizedPathName = path.replace(/^\//, '');

        Object.keys(epj.paths[path]).forEach((method) => {
            out._api._endpoints[sanitizedPathName] = {};

            // 各エンドポイントのページ要素に合わせる
            out._api._endpoints[sanitizedPathName][method] = {
                description: 'Untranslated / 未翻訳',
            };

            Object.keys(epj.paths[path][method].responses).forEach((responseCode) => {
                const responseBody = epj.paths[path][method].responses[responseCode].content ? epj.paths[path][method].responses[responseCode].content["application/json"] : null;

                if (!out._api._responseCodes[responseCode]) {
                    out._api._responseCodes[responseCode] = epj.paths[path][method].responses[responseCode].description;
                }

                if (!responseBody) {
                    return;
                }

                if (responseBody.schema['$ref'] === "#/components/schemas/Error") {
                    const key = Object.keys(responseBody.examples)[0];
                    if (!out._api._errors[responseBody.examples[key].value.error.id]) {
                        out._api._errors[responseBody.examples[key].value.error.id] = responseBody.examples[key].value.error.message;
                    }
                }
            });

        });
    });

    // 翻訳を追記
    const tlSourceFilePath = path.resolve(__dirname, '../locales/ja-JP.yml');
    const tlSourceFile = fs.readFileSync(tlSourceFilePath, 'utf-8');
    const tlSourceObj = yaml.load(tlSourceFile) as object;
    const newTlSource = mergeObjects(tlSourceObj, out);
    fs.writeFileSync(tlSourceFilePath, yaml.dump(newTlSource, { indent: 2, forceQuotes: true, quotingType: '"', }));
    console.log("翻訳の書き込み完了");

    // Contentのjsonを更新
    const targetEPPath = path.resolve(__dirname, '../content/api-docs/endpoints');
    Object.keys(epj.paths).forEach((eppath) => {
        const sanitizedPathName = eppath.replace(/^\//, '');

        const targetObj: Record<string, any> = {
            data: epj.paths[eppath],
        };
        targetObj.title = sanitizedPathName;

        createFile(path.join(targetEPPath, `${eppath}.json`), JSON.stringify(targetObj));
    });
    console.log("エンドポイント定義上書き完了");
}
