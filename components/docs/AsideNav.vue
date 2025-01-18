<template>
    <ul class="toc-links text-sm" :class="[
        `depth-${depth}`,
        depth === 1 ? 'mb-4' : 'mb-2',
    ]">
        <li
            v-for="link in realLinks ?? []"
            :key="link.title"
            :class="[
                depth === 2 && 'border-l-2 flex flex-col',
                path.includes(link.path) ? 'border-accent-500' : 'border-gray-300 dark:border-gray-600',
            ]"
        >
            <GNuxtLink
                :to="link.path"
                @click.passive="isAsideNavOpen = false"
                :class="[
                    'block hover:text-accent-600',
                    depth === 1 && 'text-base',
                    depth === 2 ? 'px-2 py-1' : 'py-1',
                    isSamePath(path, link.path) && 'text-accent-600 font-bold',
                ]"
            >
                <div class="flex">
                    <button
                        v-if="link.children && link.children.filter((v) => !isSamePath(v.path, link.path)).length > 0"
                        class="block px-1 mr-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                        @click.prevent.stop="() => {
                            console.log('State:', path.includes(link.path));
                            manualOpen[link.path] = !(manualOpen[link.path] ?? path.includes(link.path));
                        }"
                    >
                        <ArrowIco 
                            :class="[
                                'transition-transform',
                                ((path.includes(link.path) && (manualOpen[link.path] !== false)) || manualOpen[link.path]) && 'rotate-90'
                            ]"
                        />
                    </button>
                    <div>{{ link.title }}</div>
                </div>
            </GNuxtLink>
            <AsideNav
                v-if="link.children && link.children.filter((v) => !isSamePath(v.path, link.path)).length > 0"
                v-show="(path.includes(link.path) && (manualOpen[link.path] !== false)) || manualOpen[link.path]"
                :links="[link]"
                :depth="depth + 1"
            />
        </li>
    </ul>
</template>

<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content';
import { findDeepObject } from '@/assets/js/misc';
import { isSamePath } from 'ufo';
import ArrowIco from "bi/chevron-right.svg";

const isAsideNavOpen = useState<boolean>('miHub_docs_asideNav_openState', () => false);

const manualOpen = useState<Record<string, boolean>>('miHub-docs-aside-manual-collapse', () => ({}));

onUnmounted(() => {
    manualOpen.value = {};
});

const props = withDefaults(defineProps<{
    links: ContentNavigationItem[];
    depth?: number;
}>(), {
    depth: 1,
});

const { locale } = useI18n();
const route = useRoute();
const path = ref(route.path);

watch(() => route.path, (to) => {
    path.value = to;
}, {
    immediate: true,
});

const realLinks = findDeepObject(props.links[0], (v) => {
    if (props.depth === 1) {
        return isSamePath(`/${locale.value === 'ja-ks' ? 'ja' : locale.value}/docs/`, v.path);
    } else {
        return v.path.includes(props.links[0].path);
    }
})?.children?.filter((cv: ContentNavigationItem) => !isSamePath(cv.path, props.links[0].path));

const emit = defineEmits(['move', 'child-click']);

</script>

<style scoped>
.toc-links:not(.depth-1) {
    @apply ml-6;
}
</style>