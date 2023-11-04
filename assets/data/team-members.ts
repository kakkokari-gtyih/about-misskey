export type MiHubMember = {
    /** Github User ID */
    id: number;
    /** Github user name */
    username: string;
    /** 表示用の名前 */
    name?: string;
    /** 役割 */
    occupation?: string;
    /** 貢献回数 */
    contributions?: number;
    /** ついかふぃーるど（今のところつかってない） */
    fields?: ({
        type: 'twitter';
        id: string;
    } | {
        type: 'fediverse';
        acct: string;
    } | {
        type: 'website';
        href: string;
    })[];
};

/** 現行のコアチームメンバー */
export const coreTeamMember: MiHubMember[] = [
    {
        id: 4439005,
        username: 'syuilo',
        name: 'しゅいろ',
    },
    {
        id: 7973572,
        username: 'tamaina',
        name: 'tamaina (aqz)',
    },
    {
        id: 20679825,
        username: 'acid-chicken',
        name: 'Acid Chicken (硫酸鶏)',
    },
    {
        id: 40626578,
        username: 'tai-cha',
        name: 'taichan',
    },
    {
        id: 67428053,
        username: 'kakkokari-gtyih',
        name: 'かっこかり',
    }
];

/** 過去のコアチームメンバー */
export const coreTeamEmeriti: MiHubMember[] = [
    // TODO
];
