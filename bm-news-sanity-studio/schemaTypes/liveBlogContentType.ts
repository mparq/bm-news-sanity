import { defineArrayMember, defineField, defineType } from 'sanity'
import { blockContentType } from './customFields/blockContent'

export const liveBlogContentType = defineType({
  name: 'liveBlogContent',
  title: 'Live Blog Content',
  type: 'document',
  fields: [
    defineField({
      name: 'parent',
      title: 'Live Blog',
      type: 'reference',
      to: [{ type: 'liveBlog' }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string'
    }),
    defineField({
      name: 'authors',
      title: 'Authors',
      type: 'array',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'author' }] })],
    }),
    defineField({
      // TODO: default to current time
      name: 'postDateTime',
      title: 'Post Time',
      type: 'datetime'
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: blockContentType.name,
    }),
  ],
})

