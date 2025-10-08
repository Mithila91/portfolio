import { defineType, defineField } from 'sanity'

export const aboutType = defineType({
  name: 'about',
  title: 'About Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: 'Optional subtitle below the main title',
    }),
    defineField({
      name: 'content',
      title: 'About Content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H1', value: 'h1' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
              { title: 'Code', value: 'code' },
              { title: 'Highlight', value: 'highlight' },
            ],
            annotations: [
              {
                title: 'URL',
                name: 'link',
                type: 'object',
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url',
                  },
                ],
              },
              {
                title: 'Gradient Text',
                name: 'gradient',
                type: 'object',
                fields: [
                  {
                    title: 'Text',
                    name: 'text',
                    type: 'string',
                  },
                ],
              },
            ],
          },
        },
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'showSkills',
      title: 'Show Skills Section',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'skillsTitle',
      title: 'Skills Section Title',
      type: 'string',
      initialValue: 'Skills & Expertise',
    }),
    defineField({
      name: 'skills',
      title: 'Skills',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Skill Name',
              type: 'string',
            },
            {
              name: 'level',
              title: 'Skill Level',
              type: 'string',
              options: {
                list: [
                  { title: 'Beginner', value: 'beginner' },
                  { title: 'Intermediate', value: 'intermediate' },
                  { title: 'Advanced', value: 'advanced' },
                  { title: 'Expert', value: 'expert' },
                ],
              },
            },
            {
              name: 'color',
              title: 'Badge Color',
              type: 'string',
              options: {
                list: [
                  { title: 'Default', value: 'default' },
                  { title: 'Secondary', value: 'secondary' },
                  { title: 'Destructive', value: 'destructive' },
                  { title: 'Outline', value: 'outline' },
                ],
              },
              initialValue: 'secondary',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'styling',
      title: 'Section Styling',
      type: 'object',
      fields: [
        {
          name: 'backgroundColor',
          title: 'Background Color',
          type: 'string',
          options: {
            list: [
              { title: 'Default', value: 'default' },
              { title: 'Muted', value: 'muted' },
              { title: 'Card', value: 'card' },
            ],
          },
          initialValue: 'default',
        },
        {
          name: 'textAlign',
          title: 'Text Alignment',
          type: 'string',
          options: {
            list: [
              { title: 'Left', value: 'left' },
              { title: 'Center', value: 'center' },
              { title: 'Right', value: 'right' },
            ],
          },
          initialValue: 'center',
        },
        {
          name: 'maxWidth',
          title: 'Max Width',
          type: 'string',
          options: {
            list: [
              { title: 'Small (3xl)', value: 'max-w-3xl' },
              { title: 'Medium (4xl)', value: 'max-w-4xl' },
              { title: 'Large (5xl)', value: 'max-w-5xl' },
              { title: 'Extra Large (6xl)', value: 'max-w-6xl' },
              { title: 'Full Width', value: 'max-w-full' },
            ],
          },
          initialValue: 'max-w-4xl',
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})
