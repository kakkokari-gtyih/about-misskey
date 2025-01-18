<template>
    <div>
        <GHero>
            <template #title>{{ $t('_contact.title') }}</template>
            <template #description>
                {{ $t('_contact.description') }}
            </template>
            <template #icon>
                <div class="hidden lg:block relative px-6 py-8">
                    <GDots class="absolute top-0 left-0 w-32 h-32 text-accent-600" />
                    <GDots class="absolute bottom-0 right-0 w-32 h-32 text-accent-600" />
                    <div class="relative lg:w-64">
                        <img class="drop-shadow-xl" src="/img/emojis/envelope_3d.png" />
                    </div>
                </div>
            </template>
        </GHero>
        <div class="pb-12 lg:mt-12 pt-6 bg-white dark:bg-slate-950">
            <div class="container mx-auto max-w-screen-lg px-6 space-y-6 lg:space-y-8">
                <div class="bg-gray-100 dark:bg-gray-800 border-4 border-accent-600 p-4 lg:p-6 rounded-xl space-y-3">
                    <h2 class="font-bold text-lg lg:text-xl text-center">{{ $t('_contact.faqTitle') }}</h2>
                    <p class="text-center whitespace-pre-wrap">{{ $t('_contact.faqDescription') }}</p>
                    <div class="space-y-3">
                        <details v-for="faq in faqs" class="bg-gray-200 dark:bg-gray-700 rounded-xl overflow-clip group">
                            <summary class="font-bold p-4 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600 group-open:border-b border-dashed border-gray-400 dark:border-gray-950">{{ faq.question }}</summary>
                            <div class="p-2">
                                <div class="rounded-lg bg-white dark:bg-slate-950">
                                    <ContentRenderer class="p-4 rounded-b-lg markdown-body" :value="faq">
                                        <template #empty>
                                            <div class="p-4 text-center">{{ $t('empty') }}</div>
                                        </template>
                                    </ContentRenderer>
                                </div>
                            </div>
                        </details>
                    </div>
                </div>
                <div class="text-center pt-3">
                    <div class="text-sm">{{ $t('_contact.ifNothingIsFound') }}</div>
                    <CaretDownFillIco class="w-12 h-12 mx-auto" />
                </div>
                <div class="bg-gray-100 dark:bg-gray-800 p-4 lg:p-6 rounded-xl space-y-3">
                    <h2 class="font-bold text-lg lg:text-xl text-center">{{ $t('_contact.form') }}</h2>
                    <p class="text-center whitespace-pre-wrap">{{ $t('_contact.formGoogleAccountRequired') }}</p>
                    <div class="text-center">
                        <GNuxtLink to="https://docs.google.com/forms/d/e/1FAIpQLSf9hV92NTcfzZnJg_mrB11MINpBFdTf8dzGKAmzX8dvwXwZfw/viewform" target="_blank" class="btn btn-primary">
                            {{ $t('_contact.formLink') }}<ExtIco class="ml-1" />
                        </GNuxtLink>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import ExtIco from 'bi/box-arrow-up-right.svg';
import CaretDownFillIco from 'bi/caret-down-fill.svg';
import { localesContentIdentifiers } from '@/assets/data/locales';

const { t, locale } = useI18n();
const route = useRoute();
const { data: faqs } = await useGAsyncData(`contactFaqs-${locale.value}`, () => queryCollection(`contactFaq__${locale.value === 'ja-ks' ? 'ja' : localesContentIdentifiers[locale.value]}`).all());

route.meta.title = t('_contact.title');
route.meta.description = t('_contact.description');
</script>

<style scoped></style>
