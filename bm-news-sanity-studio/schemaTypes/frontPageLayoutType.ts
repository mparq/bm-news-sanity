import { defineArrayMember, defineField, defineType } from 'sanity'

export const frontPageLayoutType = defineType({
  name: 'frontPageLayout',
  title: 'Front Page Layout',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'regions',
      type: 'array',
      of: [
        defineArrayMember({ type: 'string' })
      ],
      options: {
        list: [
          { title: 'EU', value: 'Europe' },
          { title: 'US', value: 'USA' }
        ],
      }
    }),
    defineField({
      name: 'topStory',
      title: 'Top story',
      type: 'reference',
      to: [{ type: 'newsStory' }]
    }),
    defineField({
      name: 'sideStoriesPrimary',
      title: 'Primary side stories (choose 2)',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'newsStory' }] }]
    }),
    defineField({
      name: 'sideStoriesSecondary',
      title: 'Secondary side stories (choose 3)',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'newsStory' }] }]
    }),
  ],
})

