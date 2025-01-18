<template>
	<div v-if="data != null" class="flex flex-col lg:flex-row justify-between items-center">
		<div class="order-2 mt-4 lg:mt-0 lg:order-1 w-full lg:w-2/5">
			<GNuxtLink v-if="data[0] && data[0].path != null" :to="data[0].path" class="rounded-lg transition-colors p-4 border dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-800 text-start flex justify-start items-center">
				<div class="mr-3"><LeftIco /></div>
				<div>
					<div class="mb-1 text-sm">{{ $t('_docs._prevNext.prev') }}</div>
					<div class="font-bold text-lg">{{ data[0].title }}</div>
				</div>
			</GNuxtLink>
		</div>
		<div class="order-1 lg:order-2 w-full lg:w-2/5">
			<GNuxtLink v-if="data[1] && data[1].path != null" :to="data[1].path" class="rounded-lg transition-colors p-4 border dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-800 text-end flex justify-end items-center">
				<div>
					<div class="mb-1 text-sm">{{ $t('_docs._prevNext.next') }}</div>
					<div class="font-bold text-lg">{{ data[1].title }}</div>
				</div>
				<div class="ml-3"><RightIco /></div>
			</GNuxtLink>
		</div>
	</div>
</template>

<script setup lang="ts">
import LeftIco from 'bi/arrow-left.svg';
import RightIco from 'bi/arrow-right.svg';
import { localesContentIdentifiers } from '@/assets/data/locales';

const { locale } = useI18n();
const route = useRoute();
const slugs = (route.params.slug as string[]).filter((v) => v !== '');

const props = withDefaults(defineProps<{
	ignoreDirBasedNav?: boolean;
	isDir?: boolean;
}>(), {
	ignoreDirBasedNav: false,
	isDir: false
});

const { data } = await useAsyncData(`docs_${locale.value}_${slugs.join('/')}_surroundings`, () => queryCollectionItemSurroundings(`docs__${localesContentIdentifiers[locale.value === 'ja-ks' ? 'ja' : locale.value]}`, slugs.join('/')));
</script>

<style scoped>

</style>