<template>
    <div>
        <div class="mx-auto container max-w-screen-md relative px-6 py-5">
            <GNuxtLink :to="localePath('/blog/', originalLocale)" class="absolute top-2.5 left-6 p-2.5 opacity-40 hover:opacity-100 hover:-translate-x-2.5 group transition-[opacity,transform] flex items-center">
                <LeftIco class="mr-2 stroke-1 stroke-current" />
                <div class="font-bold opacity-0 group-hover:opacity-100 transition-opacity">{{ $t('_blog.back') }}</div>
            </GNuxtLink>
            <p class="text-center mb-4">{{ $t('_blog.title') }}</p>
            <h1 class="text-center font-bold text-2xl lg:text-3xl mb-4">{{ data?.title }}</h1>
            <p class="text-center">{{ data?.date ? $d(new Date(data.date)) : '' }}</p>
        </div>
        <div class="bg-white dark:bg-slate-950 pb-12 lg:mt-12 pt-6 px-6">
            <div class="mx-auto container max-w-screen-md markdown-body">
                <ContentRenderer v-if="data" :value="data" />
            </div>
            <div class="text-center mt-6 lg:mt-12">
                <GSocialShare
                    :url="`${runtimeConfig.public.baseUrl}/ja/blog/${route.params.slug}/`"
                ></GSocialShare>
                <GNuxtLink :to="localePath('/blog/', originalLocale)" class="text-xl font-bold hover:opacity-70">
                    <LeftIco class="mr-2" />{{ $t('_blog.back') }}
                </GNuxtLink>
            </div>
        </div>
   </div>
</template>

<script setup lang="ts">
import LeftIco from 'bi/arrow-left.svg';
import { joinURL, parseURL, cleanDoubleSlashes } from 'ufo';
import { isLocalPath } from '@/assets/js/misc';
import { localePathRegex } from '@/assets/data/locales';
import type { LocaleCodes } from '@/assets/data/locales';

// 日本語でしか提供されない
defineI18nRoute({
    locales: ['ja'],
});

const route = useRoute();

// ▼他言語からやってきたときに正しいパスに戻す▼
const originalLocale = useState<LocaleCodes>('miHub_blog_originalLocale', () => 'ja');
const localePath = useGLocalePath();
let isTransformed = false;

onBeforeRouteLeave((to) => {
    if (isTransformed || !isLocalPath(to.fullPath ?? to)) {
        return;
    }

    if (isTransformed) return to;

    isTransformed = true;
    const nonLocalePath = (to.fullPath ?? to).replace(localePathRegex, '/');
    return cleanDoubleSlashes(localePath(nonLocalePath, originalLocale.value));
});
// ▲他言語からやってきたときに正しいパスに戻す▲

const runtimeConfig = useRuntimeConfig();
const slugString = Array.isArray(route.params.slug) ? route.params.slug.join('/') : route.params.slug;
console.log(slugString);
const { data } = await useGAsyncData(`blog-${slugString}`, () => queryCollection('blog').path('/blog/' + slugString).first());

if (!data.value) {
    throw createError({ statusCode: 404, statusMessage: 'page not found', fatal: true });
}

const thumbnail = !data.value.thumbnail ? undefined : (parseURL(data.value.thumbnail).host == null) ? joinURL(runtimeConfig.public.baseUrl, data.value.thumbnail) : data.value.thumbnail;

route.meta.thumbnail = thumbnail;
route.meta.title = data.value?.title;
route.meta.description = data.value?.description;

const pd = data.value.date ? new Date(data.value.date).toISOString() : undefined;

route.meta.graph = [
    {
        "@type": "BlogPosting",
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `${runtimeConfig.public.baseUrl}/#WebPage`,
        },
        headline: data.value.title,
        image: thumbnail,
        author: {
            "@type": "Organization",
            "@id":  `${runtimeConfig.public.baseUrl}/#Organization`,
        },
        datePublished: pd,
    },
];
</script>

<style scoped>

</style>