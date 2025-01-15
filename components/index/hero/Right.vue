<template>
    <div class="absolute top-0 w-full hidden lg:block">
		<GDots class="dots dots1" :space="30"/>
		<GDots class="dots dots2" :space="30"/>
        <div class="screenshot desktop">
            <Transition
                :name="isUwuTransitionEnabled ? 'uwu' : undefined"
                mode="out-in"
                class="will-change-transform"
            >
                <img :src="screenshots.desktop" :key="`desktop:${screenshotIsUwu ? 'uwu' : 'notUwu'}`" class="w-full h-auto" alt="screenshot of Misskey in a PC browser">
            </Transition>
        </div>
        <div class="screenshot mobile">
            <Transition
                :name="isUwuTransitionEnabled ? 'uwu' : undefined"
                mode="out-in"
                class="will-change-transform"
            >
                <img :src="screenshots.mobile" :key="`mobile:${screenshotIsUwu ? 'uwu' : 'notUwu'}`" class="h-full w-auto" alt="screenshot of Misskey in a mobile browser">
            </Transition>
        </div>
		<img src="/img/hero/ai.png" class="ai" alt="Ai-chan, Misskey's mascott">
    </div>
</template>

<script lang="ts" setup>
import { uwu } from '@/assets/js/misc/uwu';

const mounted = ref(false);

const colorMode = useColorMode();
const { locale, fallbackLocale } = useI18n();
const screenshots = computed(() => {
    if (!mounted.value) {
        return {
            desktop: '/img/hero/misskey-light.png',
            mobile: '/img/hero/misskey-mobile-light.png',
        };
    }

    if (screenshotIsUwu.value) {
        if (colorMode.value === 'dark') {
            return {
                desktop: '/img/uwu/misskey-uwu-dark.png',
                mobile: '/img/uwu/misskey-uwu-mobile-dark.png',
            };
        } else {
            return {
                desktop: '/img/uwu/misskey-uwu-light.png',
                mobile: '/img/uwu/misskey-uwu-mobile-light.png',
            };
        }
    }
    if (colorMode.value === 'dark') {
        return {
            desktop: '/img/hero/'+locale.value+'/misskey-dark.png',
            mobile: '/img/hero/'+locale.value+'/misskey-mobile-dark.png',
        };
    } else {
        return {
            desktop: '/img/hero/'+locale.value+'/misskey-light.png',
            mobile: '/img/hero/'+locale.value+'/misskey-mobile-light.png',
        };
    }
});

const isUwu = useState<boolean>('miHub_uwu');
const isUwuTransitionEnabled = ref(false);
const screenshotIsUwu = ref(false);
const hasTransitionDone = useState('miHub_hero_transition_done', () => false);

onMounted(() => {
    if (import.meta.client) {
        mounted.value = true;

        if (isUwu.value === null) {
            isUwu.value = uwu();
        }
        if (isUwu.value) {
            if (!hasTransitionDone.value) {
                // Transitionを有効化
                isUwuTransitionEnabled.value = true;

                nextTick(() => {
                    window.setTimeout(() => {
                        // 本当に画像を変更
                        screenshotIsUwu.value = true;
                        hasTransitionDone.value = true;
                    }, 2000);
                });
            } else {
                // Transitionを動かさずに画像を変更
                screenshotIsUwu.value = true;
            }
        }
    }
});

</script>

<style scoped>
.dots {
    @apply absolute text-accent-600 pointer-events-none select-none w-[300px] h-[300px];
}

.dots1 {
    right: 900px;
    top: 200px;
	animation-name: parallax;
	animation-timing-function: linear;
	animation-timeline: scroll(root y);
	--coefficient-parallax: 3;
}

.dots2 {
    right: 120px;
    top: 500px;
	animation-name: parallax;
	animation-timing-function: linear;
	animation-timeline: scroll(root y);
	--coefficient-parallax: 4.5;
}

.screenshot {
    @apply absolute select-none pointer-events-none;
}

img.screenshot,
.screenshot img {
    @apply rounded-lg drop-shadow-lg;
}

.screenshot.mobile {
    right: 650px;
    top: 400px;
    height: 400px;
	animation-name: parallax;
	animation-timing-function: linear;
	animation-timeline: scroll(root y);
	--coefficient-parallax: 3.5;
}

.screenshot.desktop {
    width: 750px;
    top: 128px;
    right: 300px;
	animation-name: parallax;
	animation-timing-function: linear;
	animation-timeline: scroll(root y);
	--coefficient-parallax: 3.25;
}

.ai {
    @apply absolute select-none pointer-events-none;
    right: 130px;
    top: 128px;
    height: 900px;
	animation-name: parallax;
	animation-timing-function: linear;
	animation-timeline: scroll(root y);
	--coefficient-parallax: 4;
}

@media (max-width: 1800px) {
    .dots1 {
        right:800px
    }

    .screenshot.desktop {
        width: 700px
    }
}

@media (max-width: 1700px) {
    .dots1 {
        right:700px
    }

    .screenshot.desktop {
        width: 600px
    }

    .screenshot.mobile {
        height: 350px;
        right: 500px
    }
}

@media (max-width: 1600px) {
    .dots1 {
        right:600px
    }

    .screenshot.desktop {
        width: 500px
    }

    .screenshot.mobile {
        height: 300px
    }
}

@media (max-width: 1500px) {
    .dots1 {
        right:600px
    }

    .screenshot.desktop {
        right: 250px
    }

    .screenshot.mobile {
        right: 450px
    }
}

@keyframes parallax {
	from { transform: translateY(0); }
	to { transform: translateY(calc(var(--coefficient-parallax) * 66vh)); }
}
</style>
