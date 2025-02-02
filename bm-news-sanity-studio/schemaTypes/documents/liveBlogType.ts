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
      type: 'image',
      fields: [
        defineField({
          name: 'caption',
          title: 'Caption',
          type: 'string'
        }),
        defineField({
          name: 'attribution',
          title: 'Attribution',
          type: 'string'
        })
      ],
      options: {
        hotspot: true
      }
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

