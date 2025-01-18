<template>
    <div
        class="grid"
        :class="{
            [$style.docsLayoutWithAsideToc]: shouldShowToc,
        }"
    >
        <div class="lg:hidden sticky top-16 -mx-6 -mt-6 w-[calc(100%+3rem)] bg-slate-50 dark:bg-slate-900 z-[9890] border-b dark:border-slate-700 text-sm flex items-start">
            <details v-if="shouldShowToc && data?.body && (data.body.toc?.links ?? []).length > 0" class="peer order-2 flex-grow dark:border-slate-800 border-l" :open="openState">
                <summary class="px-3 py-4 cursor-pointer">
                    {{ $t('_docs._toc.title') }}
                </summary>
                <div class="px-3 pt-4 max-h-[65vh] overflow-y-auto">
                    <DocsTocLinks :links="data?.body.toc?.links" :max-depth="data?.maxTocDepth ?? undefined" @child-click="openState = false" />
                </div>
            </details>
            <button
                @click="isAsideNavOpen = !isAsideNavOpen"
                class="p-4 order-1 dark:border-slate-800 peer-open:border-b flex-shrink-0"
                :class="(!shouldShowToc || !data?.body || (data.body.toc?.links ?? []).length <= 0) && 'border-r'"
            >
                <AsideNavIco class="block w-5 h-5" />
            </button>
        </div>
        <div class="pt-6 p-0 sm:p-12 lg:p-6 w-full min-w-0">
            <!-- 外国語ページ用 -->
            <Tip v-if="locale !== 'ja'" class="mb-6" :label="$t('_i18n._missing.title')">
                <I18nT scope="global" keypath="_i18n._missing.description" tag="p">
                    <template #link>
                        <GNuxtLink class="font-bold hover:underline underline-offset-2" to="https://crowdin.com/project/misskey-hub" target="_blank">{{ $t('_i18n._missing.linkLabel') }}</GNuxtLink>
                    </template>
                </I18nT>
            </Tip>
            <Tip v-if="locale === 'th'" class="mb-6">
                <p>เนื่องจากปัญหาทางเทคนิค การแปลภาษาไทยอาจแสดงไม่ถูกต้องในขณะนี้ Misskey-dev กำลังทำงานเกี่ยวกับปัญหานี้ สำหรับรายละเอียด โปรดตรวจสอบ <a href="https://github.com/misskey-dev/misskey-hub-next/issues/221" target="_blank" rel="noopener" class="font-bold hover:underline underline-offset-2">ที่นี่</a></p>
            </Tip>

            <!-- ステップバイステップガイド -->
            <DocsSteppedGuide
                v-if="data?._TYPE_ === 'STEPPED_GUIDE'"
                :data="data"
            ></DocsSteppedGuide>

            <!-- 通常のドキュメント -->
            <template v-else-if="data?.body">
                <ContentRenderer v-if="data.body.children.length > 0" :value="data" class="markdown-body w-full mb-6" />
                <div class="mt-8 mb-4 flex flex-wrap justify-end gap-3">
                    <div v-if="data._file"><GNuxtLink class="hover:underline underline-offset-4" target="_blank" :to="`${runtimeConfig.public.repositoryUrl}/tree/master/content/${data._file.replace(/^\/?[a-z-]+\//, 'ja/')}`">{{ $t('_docs._contribute.editThis') }}<ExtIco class="ml-1" /></GNuxtLink></div>
                    <div><GNuxtLink class="hover:underline underline-offset-4" target="_blank" to="https://crowdin.com/project/misskey-hub">{{ $t('_docs._contribute.translateThis') }}<ExtIco class="ml-1" /></GNuxtLink></div>
                </div>
                <DocsPrevNext :ignore-dir-based-nav="data?.ignoreDirBasedNav ?? false" />
            </template>

            <!-- ディレクトリのインデックスページ -->
            <template v-else>
                <div class="markdown-body">
                    <h1>{{ data?.title ?? data?._dir?.title }}</h1>
                    <MkIndex :is-dir="data?._file?.endsWith('index.md') || (!data?._file)" />
                </div>
            </template>
        </div>
        <div v-if="shouldShowToc" class="hidden lg:block text-sm">
            <div class="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto py-6 pl-6">
                <h3 class="font-bold mb-6">{{ $t('_docs._toc.title') }}</h3>
                <DocsTocLinks v-if="data?.body" :links="data?.body.toc?.links" :max-depth="data?.maxTocDepth ?? undefined" class="break-words" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import AsideNavIco from 'bi/text-indent-left.svg';
import ExtIco from 'bi/box-arrow-up-right.svg';
import { localesContentIdentifiers } from '@/assets/data/locales';

const isAsideNavOpen = useState<boolean>('miHub_docs_asideNav_openState', () => false);

const { locale } = useI18n();
const openState = ref<boolean>(false);
const runtimeConfig = useRuntimeConfig();

definePageMeta({
    layout: 'docs',
});

useHead(() => locale.value === 'ja-ks' ? ({
    meta: [
        { name: 'robots', content: 'noindex' },
    ],
}) : ({}));

const route = useRoute();
const slugs = (route.params.slug as string[]).filter((v) => v !== '');

const { data } = await useGAsyncData(`docs-${locale.value}-${slugs.join('-')}`, () => queryCollection(`docs__${locale.value === 'ja-ks' ? 'ja' : localesContentIdentifiers[locale.value]}`).path(slugs.join('/')).first());

if (!data.value) {
    throw createError({ statusCode: 404, statusMessage: 'page not found', fatal: true });
}

const shouldShowToc = computed(() => data.value?._TYPE_ !== 'STEPPED_GUIDE');

if (data.value._file && /index\.[a-z]+$/.test(data.value._file)) {
    route.meta.__isDocsIndexPage = true;
}

route.meta.title = data.value?.title;
if (data.value.description) {
    route.meta.description = data.value.description;
}
</script>

<style module>
.docsLayoutWithAsideToc {
    grid-template-columns: 1fr;
}

@screen lg {
    .docsLayoutWithAsideToc {
        grid-template-columns: 1fr 14rem;
    }
}
</style>