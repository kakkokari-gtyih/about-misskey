<template>
    <div>
        <GHero>
            <template #title>{{ $t('_blog.title') }}</template>
            <template #description>
                {{ $t('_blog.description') }}
            </template>
            <template #icon>
                <div class="hidden lg:block relative px-6 py-8">
                    <GDots class="absolute top-0 left-0 w-32 h-32 text-accent-600" />
                    <GDots class="absolute bottom-0 right-0 w-32 h-32 text-accent-600" />
                    <div class="relative lg:w-64">
                        <img class="drop-shadow-xl" src="/img/emojis/open_mailbox_with_raised_flag_3d.png" />
                    </div>
                </div>
            </template>
        </GHero>
        <div class="pb-12 lg:mt-12 pt-6 bg-white dark:bg-slate-950">
            <div class="container mx-auto max-w-screen-lg px-6 space-y-4 lg:space-y-2">
                <GNuxtLink
                    class="block p-4 rounded-lg border border-slate-200 dark:border-accent-900 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
                    v-for="item in data"
                    :key="item.path"
                    :to="localePath(item.path ?? '', 'ja')"
                >
                    <h3 class="text-lg font-bold mb-2">{{ item.navTitle || item.title }}</h3>
                    <p class="text-sm">{{ item.date ? $d(new Date(item.date)) : '' }}</p>
                </GNuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const { locale, t } = useI18n();
const route = useRoute();

const localeState = useState('miHub_blog_originalLocale', () => locale.value);
localeState.value = locale.value;

const { data } = await useGAsyncData('blog', () => queryCollection('blog').select('path', 'navTitle', 'title', 'date').order('date', 'DESC').all());
const localePath = useGLocalePath();

route.meta.title = t('_blog.title');
route.meta.description = t('_blog.description');
</script>
