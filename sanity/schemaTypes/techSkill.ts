import { defineType, defineField } from 'sanity'

// Individual tech skill object type
const techSkillObject = defineType({
  name: 'techSkillItem',
  title: 'Tech Skill Item',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      title: 'Technology Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'React Icons name (e.g., "SiReact", "SiNodedotjs", "SiTypescript")',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'color',
      title: 'Brand Color',
      type: 'string',
      description: 'Hex color for the icon (e.g., "#61DAFB" for React)',
    }),
    defineField({
      name: 'proficiency',
      title: 'Proficiency Level',
      type: 'string',
      options: {
        list: [
          { title: 'Beginner', value: 'beginner' },
          { title: 'Intermediate', value: 'intermediate' },
          { title: 'Advanced', value: 'advanced' },
          { title: 'Expert', value: 'expert' },
        ],
      },
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'proficiency',
    },
  },
})

export const techSkillType = defineType({
  name: 'techSkill',
  title: 'Tech Skills',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Tech Stack',
    }),
    defineField({
      name: 'subtitle',
      title: 'Section Subtitle', 
      type: 'string',
      initialValue: 'Technologies I work with',
    }),
    defineField({
      name: 'categories',
      title: 'Skill Categories',
      type: 'array',
      of: [
        defineField({
          name: 'category',
          title: 'Category',
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Category Name',
              type: 'string',
              options: {
                list: [
                  { title: 'Frontend', value: 'frontend' },
                  { title: 'Backend', value: 'backend' },
                  { title: 'Database', value: 'database' },
                  { title: 'Tools & Platforms', value: 'tools' },
                  { title: 'Mobile', value: 'mobile' },
                  { title: 'Design', value: 'design' },
                ],
              },
            }),
            defineField({
              name: 'skills',
              title: 'Technologies',
              type: 'array',
              of: [{ type: 'techSkillItem' }],
            }),
            defineField({
              name: 'order',
              title: 'Display Order',
              type: 'number',
              validation: (rule) => rule.required().min(0),
            }),
          ],
          preview: {
            select: {
              title: 'name',
              skillCount: 'skills.length',
              order: 'order',
            },
            prepare(selection) {
              const { title, skillCount, order } = selection
              return {
                title: `${order}. ${title}`,
                subtitle: `${skillCount || 0} technologies`,
              }
            },
          },
        })
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      categoryCount: 'categories.length',
    },
    prepare(selection) {
      const { title, categoryCount } = selection
      return {
        title: title || 'Tech Skills',
        subtitle: `${categoryCount || 0} categories`,
      }
    },
  },
})

// Export both types
export { techSkillObject }
