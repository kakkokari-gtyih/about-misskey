import type * as Misskey from 'misskey-js';

/** 各インスタンスの情報 */
export type InstanceItem = {
    /** Hostname (e.g. `misskey.io`) */
    url: string;
    /** Name (e.g. `すしすきー`) */
    name: string;
    /** Language the API author aqz set manually (e.g. `["ja"]`, `["zh"]`) */
    langs: string[],
    /** `meta.description` or the the API author aqz set manually */
    description: string | null;
    /** `true` only */
    isAlive: true,
    /** The server Value calculated from the version, etc. */
    value: number,
    /** Banner existance */
    banner: boolean;
    /** Background Image existance */
    background: boolean;
    /** Icon Image existance */
    icon: boolean;
    /** nodeinfo */
    nodeinfo: Record<string, any> | null,
    /** result of api/meta */
    meta: Misskey.entities.InstanceMetadata | null,

    stats?: Record<string, any>,   //  deprecated (result of api/stats)
};

/** JSON Object Returned from `joinmisskey/api`. */
export type InstanceInfo = {
    /** The date instances.json was published at. */
    date: string;
    /** Statistics */
    stats: {
        /** Total notes */
        notesCount: number;
        /** Total Users */
        usersCount: number;
        /** Total MAUs */
        mau: number;
        /** Servers counter */
        instancesCount: number;
    },
    /** Instance List */
    instancesInfos: InstanceItem[];

}

export type InstancesStatsObj = { 
    notesCount?: number;
    usersCount?: number;
    instancesCount?: number;
};
