import { defineField } from "sanity";

export const contentImageType = defineField({
  name: 'contentImage',
  type: 'image',
  fields: [
    defineField({
      name: 'alt',
      type: 'string',
      title: 'Alternative text',
      description: 'Alternative text is required for accessibility. Describe the contents of the image for screen readers.',
      hidden: ({ parent }) => !parent?.asset,
      validation: rule => rule.required()
    }),
    defineField({
      name: 'caption',
      type: 'string',
      title: 'Caption',
      description: 'Caption for the image will be displayed below image on the website.',
      hidden: ({ parent }) => !parent?.asset,
    }),
  ],
  options: {
    hotspot: true
  }
})

