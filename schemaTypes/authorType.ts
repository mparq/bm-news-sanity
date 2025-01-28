import { defineField, defineType } from 'sanity'

export const authorType = defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  fieldsets: [
    { name: 'social', title: 'Social Media Handles' }
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Full name',
      type: 'string',
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'name' },
      validation: (rule) => rule.required()
    }),
    defineField({
      name: 'profilePhoto',
      type: 'image',
      options: {
        hotspot: true
      }
    }),
    defineField({
      name: 'twitter',
      title: 'Twitter',
      type: 'string',
      fieldset: 'social'
    }),
    defineField({
      name: 'instagram',
      title: 'Instagram',
      type: 'string',
      fieldset: 'social'
    }),
    defineField({
      name: 'facebook',
      title: 'Facebook',
      type: 'string',
      fieldset: 'social'
    }),
  ],
})

