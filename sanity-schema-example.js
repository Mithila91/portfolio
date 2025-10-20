// Add this schema to your Sanity Studio
// This should go in your schemas folder (usually schemas/techSkill.js)

export default {
  name: 'techSkill',
  title: 'Tech Skill',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Technology Name',
      type: 'string',
      description: 'Name of the technology (e.g., React, TypeScript, etc.)',
      validation: Rule => Rule.required()
    },
    {
      name: 'icon',
      title: 'Icon Name',
      type: 'string',
      description: 'Simple Icons component name (e.g., SiReact, SiTypescript, SiNextdotjs)',
      validation: Rule => Rule.required(),
      options: {
        list: [
          {title: 'React', value: 'SiReact'},
          {title: 'Next.js', value: 'SiNextdotjs'},
          {title: 'TypeScript', value: 'SiTypescript'},
          {title: 'JavaScript', value: 'SiJavascript'},
          {title: 'Node.js', value: 'SiNodedotjs'},
          {title: 'Python', value: 'SiPython'},
          {title: 'PostgreSQL', value: 'SiPostgresql'},
          {title: 'MongoDB', value: 'SiMongodb'},
          {title: 'Supabase', value: 'SiSupabase'},
          {title: 'TailwindCSS', value: 'SiTailwindcss'},
          {title: 'Framer Motion', value: 'SiFramer'},
          {title: 'Docker', value: 'SiDocker'},
          {title: 'AWS', value: 'SiAmazonwebservices'},
          {title: 'Vercel', value: 'SiVercel'},
          {title: 'Sanity', value: 'SiSanity'},
          {title: 'Git', value: 'SiGit'},
          {title: 'Figma', value: 'SiFigma'},
          {title: 'Stripe', value: 'SiStripe'},
          {title: 'Vue.js', value: 'SiVuedotjs'},
          {title: 'OpenAI', value: 'SiOpenai'},
          {title: 'NestJS', value: 'SiNestjs'},
          {title: 'Storybook', value: 'SiStorybook'},
          {title: 'Shopify', value: 'SiShopify'},
          {title: 'Netlify', value: 'SiNetlify'},
        ]
      }
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'Technology category (optional)',
      options: {
        list: [
          {title: 'Frontend', value: 'frontend'},
          {title: 'Backend', value: 'backend'},
          {title: 'Database', value: 'database'},
          {title: 'DevOps', value: 'devops'},
          {title: 'Design', value: 'design'},
          {title: 'Language', value: 'language'},
          {title: 'Framework', value: 'framework'},
          {title: 'Tool', value: 'tool'},
        ]
      }
    },
    {
      name: 'proficiency',
      title: 'Proficiency Level',
      type: 'string',
      description: 'Your skill level with this technology (optional)',
      options: {
        list: [
          {title: 'Beginner', value: 'beginner'},
          {title: 'Intermediate', value: 'intermediate'},
          {title: 'Advanced', value: 'advanced'},
          {title: 'Expert', value: 'expert'},
        ]
      }
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which this technology appears in the animation',
      validation: Rule => Rule.required().integer().min(0)
    }
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
      order: 'order'
    },
    prepare(selection) {
      const {title, subtitle, order} = selection
      return {
        title: title,
        subtitle: `${subtitle || 'No category'} • Order: ${order}`
      }
    }
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}]
    },
    {
      title: 'Name',
      name: 'nameAsc', 
      by: [{field: 'name', direction: 'asc'}]
    }
  ]
}