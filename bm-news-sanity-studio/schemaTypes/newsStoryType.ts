import { defineArrayMember, defineField, defineType } from 'sanity'


export const newsStoryType = defineType({
  name: 'newsStory',
  title: 'News Story',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'authors',
      type: 'array',
      of: [
        defineArrayMember({ type: 'reference', to: [{ type: 'author' }] })
      ],
      validation: (rule) => rule.min(1)
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'excerpt',
      type: 'array',
      of: [
        defineArrayMember({ type: 'block' })
      ]
    }),
    defineField({
      name: 'regionAvailability',
      type: 'array',
      of: [
        defineArrayMember({ type: 'string' })
      ],
      options: {
        list: [
          { title: 'Europe', value: 'EU' },
          { title: 'USA', value: 'US' }
        ],
      }
    }),
    defineField({
      name: 'featuredImage',
      type: 'image',
    }),
    defineField({
      name: 'content',
      type: 'array',
      of: [
        defineArrayMember({ type: 'block' }),
        defineArrayMember({ type: 'image' })
      ],
    }),
  ],
})
