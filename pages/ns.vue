<template>
    <div class="relative container mx-auto max-w-screen-xl p-6 lg:py-0 grid docs-main">
        <div class="lg:hidden sticky top-16 -mx-6 -mt-6 w-[calc(100%+3rem)] bg-slate-50 dark:bg-slate-900 z-[9890] border-b dark:border-slate-700 text-sm flex items-start">
            <details v-if="data?.body && (data.body.toc?.links ?? []).length > 0" class="flex-grow" :open="openState">
                <summary class="p-4 cursor-pointer">
                    {{ $t('_docs._toc.title') }}
                </summary>
                <div class="px-4 pt-4 max-h-[65vh] overflow-y-auto">
                    <DocsTocLinks :links="data?.body.toc?.links" @child-click="openState = false" />
                </div>
            </details>
        </div>
        <div class="pt-6 lg:p-6 w-full overflow-x-hidden">
            <template v-if="data?.body">
                <ContentRenderer v-if="data.body.children.length > 0" :value="data" class="markdown-body w-full mb-6">
                </ContentRenderer>
            </template>
        </div>
        <div class="hidden lg:block text-sm">
            <div class="sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto py-6 pl-6">
                <h3 class="font-bold mb-6">{{ $t('_docs._toc.title') }}</h3>
                <DocsTocLinks v-if="data?.body && data.body.toc" :links="data?.body.toc.links" class="break-words" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const openState = ref<boolean>(false);

definePageMeta({
    layout: 'slim',
});

defineI18nRoute(false);

const route = useRoute();

const { data } = await useGAsyncData('global-ns', () => queryCollection('ns').first());

if (!data.value) {
    throw createError({ statusCode: 404, statusMessage: 'page not found', fatal: true });
}

route.meta.title = data.value?.title;
route.meta.description = data.value?.description;
</script>

<style scoped>
.docs-main {
    grid-template-columns: 1fr;
}

@screen lg {
    .docs-main {
        grid-template-columns: 1fr 14rem;
    }
}
</style>