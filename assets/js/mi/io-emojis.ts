import { getIOEmoji } from './io-meta';
import * as Misskey from 'misskey-js';
export const customEmojisMap = new Map<string, Misskey.entities.CustomEmoji>();

const emojis = await getIOEmoji();

for (const emoji of emojis.emojis) {
    customEmojisMap.set(emoji.name, emoji);
}