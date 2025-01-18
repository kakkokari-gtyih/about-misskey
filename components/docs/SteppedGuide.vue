<template>
    <div class="grid" :class="$style.root">
        <div class="markdown-body w-full lg:col-span-2 mb-6">
            <h1>{{ data.title }}</h1>
            <MDC :value="data?.body" />
            <Warning v-show="guideIndexAutoDetected" :label="null" class="py-4">
                <label for="guideSelector" class="block mb-1 text-orange-600 dark:text-yellow-300 font-bold"><ArrowLRIco class="mr-1" />{{ $t('_docs._steppedGuide.selectCourse') }}</label>
                <select id="guideSelector" class="form-select" :disabled="data.guides.length <= 1" v-model="guideIndex">
                    <option v-for="guide, i in data.guides" :value="i">{{ guide.title }}</option>
                </select>
            </Warning>
        </div>
        <template v-if="guideIndexAutoDetected">
            <Tip v-if="data.guides[guideIndex]?.description" class="mb-6 lg:col-span-2 markdown-body">
                <MDC :value="data.guides[guideIndex].description" />
            </Tip>
            <div :class="data.guides[guideIndex]?._LAYOUT_TYPE_ === 'IMAGE_PORTRAIT_FIXED' ? 'lg:mr-3' : 'lg:col-span-2'">
                <ol class="relative before:absolute before:left-[13px] before:top-3.5 before:w-0.5 before:h-[calc(100%-.875rem)] before:rounded-full before:bg-gray-300 dark:before:bg-gray-700 space-y-8">
                    <li
                        v-for="(step, i) in data.guides[guideIndex]?.steps"
                        :key="`steppedGuideSection_${guideIndex}_${i}`"
                        :id="`steppedGuideSection_${guideIndex}_${i}`"
                        class="ml-7 relative flex items-center"
                        :class="{
                            'lg:min-h-[calc(100vh-4rem)] steppedGuideSection': (data.guides[guideIndex]?._LAYOUT_TYPE_ === 'IMAGE_PORTRAIT_FIXED'),
                        }"
                    >
                        <div class="flex-grow">
                            <div class="flex items-center space-x-4 mb-4">
                                <div class="w-7 h-7 rounded-full flex-shrink-0 -ml-7 font-bold leading-7 text-center text-white bg-accent-600 ring-4 ring-white dark:ring-slate-950">{{ i + 1 }}</div>
                                <h3 class="font-bold text-lg">{{ step.title }}</h3>
                            </div>
                            <div class="ml-4">
                                <img
                                    v-if="step?.image"
                                    :src="`/img/docs/${slugs.join('/')}/${step.image}`"
                                    class="w-auto h-full rounded-lg mx-auto max-h-96 mb-4"
                                    :class="{
                                        'lg:hidden': (data.guides[guideIndex]?._LAYOUT_TYPE_ === 'IMAGE_PORTRAIT_FIXED'),
                                    }"
                                />
                                <MDC v-if="step.description" :value="step.description" class="markdown-body" />
                            </div>
                        </div>
                    </li>
                    <li class="pl-7 pt-[18px] relative items-center before:absolute before:left-[13px] before:top-[calc(50%-30px)] before:w-0.5 before:h-[calc(50%+30px)] before:bg-white dark:before:bg-slate-950 after:absolute after:left-[13px] after:top-[calc(50%-30px)] after:h-[30px] after:w-[15px] after:rounded-bl-[15px] after:border-l-[0.125rem] after:border-b-[0.125rem] after:border-gray-300 dark:after:border-gray-700">
                        <Fukidashi chara="smiling_ai" :charaName="$t('_links._aiChan.title')" class="!mb-0">{{ $t('_docs._steppedGuide.aiWellDone') }}</Fukidashi>
                    </li>
                </ol>
            </div>
            <div v-if="data.guides[guideIndex]?._LAYOUT_TYPE_ === 'IMAGE_PORTRAIT_FIXED'" class="hidden lg:block rounded-lg bg-gray-100 dark:bg-gray-800">
                <div class="sticky top-16 h-[calc(100vh-4rem)] p-3">
                    <div class="relative h-full">
                        <Transition
                            :enterActiveClass="$style.steppedGuideImage_enterActive"
                            :leaveActiveClass="$style.steppedGuideImage_leaveActive"
                            :enterFromClass="$style.steppedGuideImage_enterFrom"
                            :leaveToClass="$style.steppedGuideImage_leaveTo"
                        >
                            <img v-if="currentStep?.image" :src="`/img/docs/${slugs.join('/')}/${currentStep.image}`" :key="`steppedGuideSection_${currentStep.image}`" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-auto rounded-lg" />
                            <div v-else class="h-full flex items-center">
                                <div class="opacity-70 w-full text-center text-sm">{{ $t('_docs._steppedGuide.noImageInThisStep') }}</div>
                            </div>
                        </Transition>
                    </div>
                </div>
            </div>
        </template>
        <template v-else>
            <div class="lg:col-span-2 flex items-center justify-center h-[calc(100vh-4rem)]">
                <div>
                    <MkLoading class="mx-auto text-accent-600"></MkLoading>
                    <div class="mx-auto text-center text-sm">{{  $t('loading') }}</div>
                </div>
            </div>
        </template>
    </div>
</template>

<script setup lang="ts">
import type { SteppedGuide } from '../../content.config';
import ArrowLRIco from 'bi/arrow-left-right.svg';

const props = defineProps<{
    data: SteppedGuide;
}>();

const route = useRoute();
const slugs = (route.params.slug as string[]).filter((v) => v !== '');

const { mainHeading, updateHeadings } = useScrollspy({
    rootMargin: '-64px 0px 0px 0px',
    threshold: 0.5,
});

const guideIndex = ref<number>(0);
const guideIndexAutoDetected = ref<boolean>(false);

const currentStep = computed(() => {
    if (!mainHeading.value) return null;

    const [currentGuideIndex, currentStepIndex] = mainHeading.value.split('_').slice(1).map((v) => parseInt(v, 10));
    return props.data.guides[currentGuideIndex].steps[currentStepIndex];
});

if (import.meta.client && props.data.guides.some((g) => g._AUTOSELECT_TYPE_)) {
    const ua = navigator.userAgent.toLowerCase();
    if (ua.includes('iphone') || ua.includes('ipad')) {
        guideIndex.value = Math.max(0, props.data.guides.findIndex((g) => g._AUTOSELECT_TYPE_ === 'OS_IOS' || g._AUTOSELECT_TYPE_ === 'HARD_SMARTPHONE'));
    } else if (ua.includes('android')) {
        guideIndex.value = Math.max(0, props.data.guides.findIndex((g) => g._AUTOSELECT_TYPE_ === 'OS_ANDROID' || g._AUTOSELECT_TYPE_ === 'HARD_SMARTPHONE'));
    } else if (ua.includes('windows')) {
        guideIndex.value = Math.max(0, props.data.guides.findIndex((g) => g._AUTOSELECT_TYPE_ === 'OS_WINDOWS' || g._AUTOSELECT_TYPE_ === 'HARD_PC'));
    } else if (ua.includes('macintosh')) {
        guideIndex.value = Math.max(0, props.data.guides.findIndex((g) => g._AUTOSELECT_TYPE_ === 'OS_MAC' || g._AUTOSELECT_TYPE_ === 'HARD_PC'));
    }
}

onMounted(() => {
    if (!import.meta.client) return;

    guideIndexAutoDetected.value = true;

    nextTick(() => {
        watch(guideIndex, () => {
            nextTick(() => {
                updateHeadings([
                    ...document.querySelectorAll('.steppedGuideSection'),
                ]);
            });
        }, { immediate: true });
    })
});

</script>

<style module>
.steppedGuideImage_enterActive,
.steppedGuideImage_leaveActive {
    transition: opacity 300ms;
}

.steppedGuideImage_enterFrom,
.steppedGuideImage_leaveTo {
    opacity: 0;
}

.root {
    grid-template-columns: 1fr;
}

@screen lg {
    .root {
        grid-template-columns: 1fr 20rem;
    }
}
</style>
