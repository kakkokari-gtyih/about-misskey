<template>
    <div
        class="rounded-lg border border-slate-200 dark:border-slate-700 relative overflow-hidden"
        :class="$style.ctaRoot"
    >
        <img
            src="/img/docs/sponsor/cta_docs.png"
            class="hidden sm:block absolute -bottom-4 -right-4 rounded-lg rotate-[8deg] w-[35%] h-auto shadow-xl"
        />
        <div class="relative p-4 lg:p-6 sm:mr-[35%]">
            <div class="text-lg lg:text-xl font-bold">スポンサーのご案内資料を配布中</div>
            <div class="my-2 lg:my-4">スポンサー契約に関する詳細なご案内資料（24ページ）をご請求いただけます。以下のフォームより資料請求の旨をお伝えください。</div>
            <GNuxtLink class="py-1.5 px-3 border-2 border-accent-600 rounded-full !text-accent-600 font-bold transition-colors hover:!no-underline hover:!text-white hover:bg-accent-600" :to="localePath('/contact/')">お問い合わせフォーム</GNuxtLink>
        </div>
        <div class="sm:hidden flex">
            <img
                src="/img/docs/sponsor/cta_docs.png"
                class="ml-auto -mr-4 translate-y-2 rounded-lg rotate-[8deg] w-[35%] h-auto shadow-lg"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
const localePath = useGLocalePath();
</script>

<style module>
.ctaRoot {
    container: cta/inline-size;
    background-image: radial-gradient(circle 35cqw at bottom 0% right 50px, rgb(134 179 0 / 0.3), rgb(134 179 0 / 0) 70%);
}
</style>
