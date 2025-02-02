import { defineArrayMember, defineField, defineType } from 'sanity'
import { blockContentType } from '../customFields/blockContent'
import { contentImageType } from '../customFields/contentImage'


export const newsStoryType = defineType({
  name: 'newsStory',
  title: 'News Story',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string'
    }),
    defineField({
      name: 'authors',
      title: 'Authors',
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
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      description: 'The excerpt to show on the front page or list views',
      type: 'array',
      of: [
        defineArrayMember({ type: 'block' })
      ]
    }),
    defineField({
      name: 'location',
      type: 'string',
      title: 'Location',
      description: 'The location the article was authored from (if relevant)',
    }),
    defineField({
      name: 'regionAvailability',
      title: 'Region Availability',
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
      type: contentImageType.name
    }),
    defineField({
      name: 'content',
      type: blockContentType.name,
    }),
  ],
})
