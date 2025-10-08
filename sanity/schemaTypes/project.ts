import { defineType, defineField } from 'sanity'

export const projectType = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'string',
      description: 'e.g., "2024"',
    }),
    defineField({
      name: 'role',
      title: 'Your Role',
      type: 'string',
      description: 'e.g., "Lead Developer", "Founder"',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'image',
      title: 'Project Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'technologies',
      title: 'Technologies',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Technology Name',
              type: 'string',
            },
            {
              name: 'icon',
              title: 'Icon',
              type: 'string',
              description: 'React Icons name (e.g., "FaReact", "FaNodeJs")',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'githubUrl',
      title: 'GitHub URL',
      type: 'url',
    }),
    defineField({
      name: 'liveUrl',
      title: 'Live Demo URL',
      type: 'url',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Project',
      type: 'boolean',
      description: 'Featured projects appear first',
      initialValue: false,
    }),
    defineField({
      name: 'isReleased',
      title: 'Is Released',
      type: 'boolean',
      description: 'Toggle to show if project is released or coming soon',
      initialValue: true,
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Lower numbers appear first',
      validation: (rule) => rule.required().min(0),
    }),
  ],
  orderings: [
    {
      title: 'Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Featured First',
      name: 'featuredFirst',
      by: [
        { field: 'featured', direction: 'desc' },
        { field: 'order', direction: 'asc' },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      featured: 'featured',
      isReleased: 'isReleased',
      order: 'order',
    },
    prepare(selection) {
      const { title, media, featured, isReleased, order } = selection
      const statusIcon = !isReleased ? ' 🚧' : ''
      const featuredIcon = featured ? ' ⭐' : ''
      return {
        title: `${order}. ${title}${featuredIcon}${statusIcon}`,
        media: media,
      }
    },
  },
})
