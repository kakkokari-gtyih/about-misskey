import { localesConst } from './assets/data/locales';
import { defineCollection, defineContentConfig, z } from '@nuxt/content';
import type { z as Zod } from 'zod';

const markdownSharedSchema = z.object({
    _TYPE_: z.any().optional(),
    maxTocDepth: z.number().optional(),
    ignoreDirBasedNav: z.boolean().optional(),
});

const steppedGuideSchema = z.object({
    _TYPE_: z.literal('STEPPED_GUIDE'),
    guides: z.array(z.object({
        _AUTOSELECT_TYPE_: z.union([
            z.literal('OS_ANDROID'),
            z.literal('OS_IOS'),
            z.literal('OS_MAC'),
            z.literal('OS_WINDOWS'),
            z.literal('HARD_SMARTPHONE'),
            z.literal('HARD_PC'),
        ]).optional(),
        _LAYOUT_TYPE_: z.literal('IMAGE_PORTRAIT_FIXED').optional(),
        title: z.string(),
        description: z.any(),
        steps: z.array(z.object({
            title: z.string(),
            description: z.any(),
            image: z.string().optional(),
        })),
    })),
});

export type SteppedGuide = Zod.infer<typeof steppedGuideSchema>;

export default defineContentConfig({
    collections: {
        blog: defineCollection({
            source: 'blog/*.md',
            type: 'page',

            schema: markdownSharedSchema.extend({
                navTitle: z.string().optional(),
                date: z.string().optional(),
                thumbnail: z.string().optional(),
            }),
        }),
        ns: defineCollection({
            source: 'ns.md',
            type: 'page',
            schema: markdownSharedSchema,
        }),
        ...Object.fromEntries(localesConst.map((locale) => [
            `docs__${locale.contentIdentifier}`,
            defineCollection({
                source: `${locale.code}/docs/**/*.{md,yml}`,
                type: 'page',
                // @ts-ignore
                schema: z.union([markdownSharedSchema, steppedGuideSchema]),
            }),
        ])),
        ...Object.fromEntries(localesConst.map((locale) => [
            `contactFaq__${locale.contentIdentifier}`,
            defineCollection({
                source: `${locale.code}/contact-faq/**/*.md`,
                type: 'page',
                schema: markdownSharedSchema.extend({
                    question: z.string(),
                }),
            }),
        ])),
    },
});
