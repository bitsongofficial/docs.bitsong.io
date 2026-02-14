import { defineContentConfig, defineCollection, z } from '@nuxt/content'

const docsSchema = z.object({
  links: z.array(z.object({
    label: z.string(),
    icon: z.string(),
    to: z.string(),
    target: z.string().optional(),
  })).optional(),
})

export default defineContentConfig({
  collections: {
    docs_en: defineCollection({
      type: 'page',
      source: {
        include: 'en/**/*',
        prefix: '/en',
      },
      schema: docsSchema,
    }),
    docs_fr: defineCollection({
      type: 'page',
      source: {
        include: 'fr/**/*',
        prefix: '/fr',
      },
      schema: docsSchema,
    }),
  },
})
