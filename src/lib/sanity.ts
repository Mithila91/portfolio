import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
})

// GROQ queries for fetching data
export const queries = {
  hero: `*[_type == "hero"][0]`,
  
  experiences: `*[_type == "experience"] | order(order asc) {
    _id,
    role,
    company,
    period,
    description,
    order
  }`,
  
  projects: `*[_type == "project"] | order(featured desc, order asc) {
    _id,
    title,
    year,
    role,
    description,
    "image": image.asset->url,
    technologies,
    githubUrl,
    liveUrl,
    featured,
    isReleased,
    order
  }`,
  
  about: `*[_type == "about"][0]`,
  
  techSkills: `*[_type == "techSkill"][0] {
    _id,
    title,
    subtitle,
    categories[] | order(order asc) {
      name,
      order,
      skills[] {
        name,
        icon,
        color,
        proficiency
      }
    }
  }`,
}
