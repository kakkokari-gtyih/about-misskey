import fs from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

export function getStaticEndpoints(): string[] {
    const __dirname = dirname(fileURLToPath(import.meta.url))
    const dir = resolve(`${__dirname}/../pages`);
    const files = getFiles(dir);
    const filtered = files
        .filter((file) => !file.includes('slug')) // exclude dynamic content
        .map((file) => file.split('pages')[1])
        .map((file) => file.replaceAll('\\', '/'))
        .map((file) => {
            return (file.endsWith('index.vue') ? file.replace(/\/index.vue$/, '') : file.split('.vue')[0]) + '/';
        });
    return filtered;
}

/**
 * recursively get all files from /pages folder
 */
function getFiles(dir: string): string[] {
    const dirents = fs.readdirSync(dir, { withFileTypes: true });
    const files = dirents.map((dirent) => {
        const res = resolve(dir, dirent.name);
        return dirent.isDirectory() ? getFiles(res) : res;
    })
    return files.flat();
}
