<template>
	<div v-if="data" :class="['grid grid-cols-1 md:grid-cols-2 gap-4', wide && 'lg:grid-cols-3']">
		<GNuxtLink
			class="block p-4 rounded-lg border border-slate-200 dark:border-slate-700 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 hover:!no-underline"
			v-for="item in findDeepObject(data[0], (v) => realBasePath.replace(/\/$/, '') === v?.path.replace(/\/$/, ''))?.children ?? []"
			:key="item.path"
			:to="item.path"
		>
			<h3 class="font-bold !text-lg !mt-0 !mb-2">
				{{ item.navTitle ?? item.title }}<ArrowRightIco class="ml-1.5" />
			</h3>
			<p class="text-sm text-slate-500 dark:text-slate-400 !mb-0 line-clamp-2">
				{{ item.description ?? "" }}
			</p>
		</GNuxtLink>
	</div>
</template>

<script setup lang="ts">
import ArrowRightIco from "bi/arrow-right.svg";
import { findDeepObject } from "assets/js/misc";
import { localesContentIdentifiers } from "~/assets/data/locales";

const route = useRoute();
const { locale } = useI18n();

const props = withDefaults(defineProps<{
    basePath?: string;
    wide?: boolean;
}>(), {
    wide: false,
});

const realBasePath = computed<string>(() => {
    if (props.basePath) {
        return props.basePath;
    }
    return route.path.replace(/^.*\/docs/, '');
});

const { data } = await useAsyncData(`indexNav_${locale.value}`, () => queryCollectionNavigation(`docs__${localesContentIdentifiers[locale.value === 'ja-ks' ? 'ja' : locale.value]}`).where('path', 'LIKE', `^${realBasePath.value}`));
</script>
