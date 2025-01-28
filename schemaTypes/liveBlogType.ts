import { defineArrayMember, defineField, defineType } from 'sanity'

export const liveBlogType = defineType({
  name: 'liveBlog',
  title: 'Live Blog',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'name' }
    }),
    defineField({
      name: 'title',
      title: 'Title e.g. "Guruji in Brazil"',
      type: 'string',
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }]
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image'
    }),
    defineField({
      name: 'startDateTime',
      title: 'Live start time',
      type: 'datetime'
    }),
    defineField({
      name: 'endDateTime',
      title: 'Live end time',
      type: 'datetime'
    }),
  ]
});
export const postType = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'title' },
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
      name: 'publishedAt',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      type: 'image',
    }),
    defineField({
      name: 'body',
      type: 'array',
      of: [
        defineArrayMember({ type: 'block' })
      ],
    }),
  ],
})

