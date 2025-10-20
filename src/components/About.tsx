'use client';

import { Badge } from "@/components/ui/badge";
import { client, queries } from "@/lib/sanity";
import { useEffect, useState } from "react";
import { PortableText, PortableTextComponents } from '@portabletext/react';
import { motion } from "framer-motion";
import { 
  SiReact, 
  SiNextdotjs, 
  SiTypescript, 
  SiNodedotjs, 
  SiPostgresql, 
  SiMongodb, 
  SiTailwindcss, 
  SiDocker,
  SiVuedotjs,
  SiSupabase,
  SiStripe,
  SiOpenai,
  SiAmazonwebservices,
  SiNestjs,
  SiStorybook,
  SiShopify,
  SiSanity,
  SiFramer,
  SiJavascript,
  SiPython,
  SiGit,
  SiFigma,
  SiVercel,
  SiNetlify
} from "react-icons/si";
import { IconType } from "react-icons";

// Technologies data for animated section
const technologies = [
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", icon: SiNextdotjs, color: "#000000" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
  { name: "Python", icon: SiPython, color: "#3776AB" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#336791" },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
  { name: "Supabase", icon: SiSupabase, color: "#3ECF8E" },
  { name: "TailwindCSS", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Framer Motion", icon: SiFramer, color: "#0055FF" },
  { name: "Docker", icon: SiDocker, color: "#2496ED" },
  { name: "AWS", icon: SiAmazonwebservices, color: "#FF9900" },
  { name: "Vercel", icon: SiVercel, color: "#000000" },
  { name: "Sanity", icon: SiSanity, color: "#F03E2F" },
  { name: "Git", icon: SiGit, color: "#F05032" },
  { name: "Figma", icon: SiFigma, color: "#F24E1E" },
  { name: "Stripe", icon: SiStripe, color: "#635BFF" },
];

// Map icon names from Sanity to actual icon components
const getIconComponent = (iconName: string): { icon: IconType; color: string } | null => {
  const iconMap: { [key: string]: { icon: IconType; color: string } } = {
    "SiReact": { icon: SiReact, color: "#61DAFB" },
    "SiNextdotjs": { icon: SiNextdotjs, color: "#000000" },
    "SiTypescript": { icon: SiTypescript, color: "#3178C6" },
    "SiJavascript": { icon: SiJavascript, color: "#F7DF1E" },
    "SiNodedotjs": { icon: SiNodedotjs, color: "#339933" },
    "SiPython": { icon: SiPython, color: "#3776AB" },
    "SiPostgresql": { icon: SiPostgresql, color: "#336791" },
    "SiMongodb": { icon: SiMongodb, color: "#47A248" },
    "SiSupabase": { icon: SiSupabase, color: "#3ECF8E" },
    "SiTailwindcss": { icon: SiTailwindcss, color: "#06B6D4" },
    "SiFramer": { icon: SiFramer, color: "#0055FF" },
    "SiDocker": { icon: SiDocker, color: "#2496ED" },
    "SiAmazonwebservices": { icon: SiAmazonwebservices, color: "#FF9900" },
    "SiVercel": { icon: SiVercel, color: "#000000" },
    "SiSanity": { icon: SiSanity, color: "#F03E2F" },
    "SiGit": { icon: SiGit, color: "#F05032" },
    "SiFigma": { icon: SiFigma, color: "#F24E1E" },
    "SiStripe": { icon: SiStripe, color: "#635BFF" },
    "SiVuedotjs": { icon: SiVuedotjs, color: "#4FC08D" },
    "SiOpenai": { icon: SiOpenai, color: "#412991" },
    "SiNestjs": { icon: SiNestjs, color: "#E0234E" },
    "SiStorybook": { icon: SiStorybook, color: "#FF4785" },
    "SiShopify": { icon: SiShopify, color: "#7AB55C" },
    "SiNetlify": { icon: SiNetlify, color: "#00C7B7" },
  };
  
  return iconMap[iconName] || null;
};

interface TechSkill {
  _id: string;
  name: string;
  icon: string;
  category?: string;
  proficiency?: string;
  order: number;
}

interface AboutData {
  title: string;
  subtitle?: string;
  content: Array<{
    _type: string;
    style?: string;
    children?: Array<{
      text: string;
      marks?: string[];
      _type: string;
    }>;
    markDefs?: Array<{
      _key: string;
      _type: string;
      href?: string;
      text?: string;
    }>;
  }>;
  showSkills?: boolean;
  skillsTitle?: string;
  skills?: Array<{
    name: string;
    level: string;
    color?: string;
  }>;
  styling?: {
    backgroundColor?: string;
    textAlign?: string;
    maxWidth?: string;
  };
}

const About = () => {
  const [aboutData, setAboutData] = useState<AboutData | null>(null);
  const [techSkills, setTechSkills] = useState<TechSkill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [aboutData, techSkillsData] = await Promise.all([
          client.fetch(queries.about),
          client.fetch(queries.techSkills)
        ]);
        
        setAboutData(aboutData);
        setTechSkills(techSkillsData || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Custom components for rich text rendering - Art N' Soul aesthetic
  const portableTextComponents: PortableTextComponents = {
    marks: {
      strong: ({ children }) => <strong className="font-medium text-foreground">{children}</strong>,
      em: ({ children }) => <em className="italic font-light">{children}</em>,
      code: ({ children }) => <code className="bg-muted/50 px-2 py-1 rounded-md text-sm font-mono border border-border/20">{children}</code>,
      highlight: ({ children }) => <span className="text-gradient font-medium">{children}</span>,
      link: ({ children, value }) => (
        <a 
          href={value?.href} 
          className="text-primary hover:text-primary/80 underline decoration-primary/30 hover:decoration-primary/60 transition-all duration-300"
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      ),
      gradient: ({ children }) => <span className="text-gradient font-medium">{children}</span>,
    },
    block: {
      normal: ({ children }) => <p className="mb-6 font-light leading-relaxed text-muted-foreground">{children}</p>,
      h1: ({ children }) => <h1 className="text-3xl md:text-4xl font-light mb-8 text-foreground">{children}</h1>,
      h2: ({ children }) => <h2 className="text-2xl md:text-3xl font-light mb-6 text-foreground">{children}</h2>,
      h3: ({ children }) => <h3 className="text-xl md:text-2xl font-light mb-4 text-foreground">{children}</h3>,
      blockquote: ({ children }) => (
        <blockquote className="border-l-2 border-primary/30 pl-6 italic my-8 text-muted-foreground font-light bg-muted/20 py-4 rounded-r-lg">
          {children}
        </blockquote>
      ),
    },
    list: {
      bullet: ({ children }) => <ul className="list-none mb-6 space-y-3">{children}</ul>,
      number: ({ children }) => <ol className="list-decimal list-inside mb-6 space-y-3 font-light">{children}</ol>,
    },
    listItem: {
      bullet: ({ children }) => (
        <li className="flex items-start gap-3">
          <div className="w-1.5 h-1.5 bg-primary/60 rounded-full mt-2.5 flex-shrink-0"></div>
          <span className="font-light text-muted-foreground">{children}</span>
        </li>
      ),
      number: ({ children }) => <li className="font-light text-muted-foreground">{children}</li>,
    },
  };

  if (loading) {
    return (
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-48 mx-auto mb-8"></div>
            <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-2/3 mx-auto mb-12"></div>
          </div>
        </div>
      </section>
    );
  }

  // Dynamic styling based on Sanity data
  const styling = aboutData?.styling || {};
  const maxWidth = styling.maxWidth || 'max-w-4xl';
  const textAlign = styling.textAlign || 'center';
  const backgroundColor = styling.backgroundColor || 'default';
  
  const backgroundClass = {
    default: '',
    muted: 'bg-muted',
    card: 'bg-card border rounded-lg p-8',
  }[backgroundColor] || '';

  const textAlignClass = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }[textAlign] || 'text-center';

  return (
    <motion.section 
      className={`py-24 px-4 ${backgroundClass}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      <div className={`${maxWidth} mx-auto`}>
        {/* Header with elegant line accent */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-primary/30"></div>
            <h2 className="text-3xl md:text-4xl font-light tracking-wide">
              {aboutData?.title || "About"}
            </h2>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-primary/30"></div>
          </div>
          
          {aboutData?.subtitle && (
            <p className="text-lg font-light text-muted-foreground max-w-2xl mx-auto">
              {aboutData.subtitle}
            </p>
          )}
        </motion.div>
        
        {/* Main Content - Art N' Soul inspired layout */}
        <div className="max-w-5xl mx-auto">
          {/* Content Section */}
          <motion.div 
            className="grid lg:grid-cols-3 gap-12 mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {/* Left - Stats */}
            <div className="lg:col-span-1 space-y-8">
              <div className="text-center lg:text-left">
                <div className="space-y-6">
                  <div>
                    <div className="text-4xl font-light text-primary mb-2">5+</div>
                    <div className="text-sm font-light text-muted-foreground tracking-wide">Years Experience</div>
                  </div>
                  <div>
                    <div className="text-4xl font-light text-primary mb-2">50+</div>
                    <div className="text-sm font-light text-muted-foreground tracking-wide">Projects Built</div>
                  </div>
                </div>
              </div>
              
              {/* Expertise Areas */}
              <div className="space-y-4">
                <h3 className="text-lg font-light">Expertise</h3>
                <div className="space-y-3">
                  {[
                    'Full-Stack Development',
                    'Modern Web Applications', 
                    'Performance Optimization',
                    'User Experience Design'
                  ].map((item, index) => (
                    <motion.div 
                      key={index}
                      className="flex items-center gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                    >
                      <div className="w-1.5 h-1.5 bg-primary/60 rounded-full"></div>
                      <span className="text-sm font-light text-muted-foreground">{item}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Center & Right - About Text */}
            <div className="lg:col-span-2">
              <motion.div 
                className="prose prose-gray max-w-none"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {aboutData?.content ? (
                  <div className="text-base font-light leading-relaxed space-y-4">
                    <PortableText 
                      value={aboutData.content} 
                      components={{
                        ...portableTextComponents,
                        block: {
                          normal: ({ children }) => <p className="mb-6 font-light leading-relaxed text-muted-foreground">{children}</p>,
                          h2: ({ children }) => <h2 className="text-xl font-light mb-4 text-foreground">{children}</h2>,
                          h3: ({ children }) => <h3 className="text-lg font-light mb-3 text-foreground">{children}</h3>,
                        },
                        marks: {
                          strong: ({ children }) => <strong className="font-medium text-foreground">{children}</strong>,
                          em: ({ children }) => <em className="italic">{children}</em>,
                          highlight: ({ children }) => <span className="text-gradient font-medium">{children}</span>,
                          gradient: ({ children }) => <span className="text-gradient font-medium">{children}</span>,
                        }
                      }}
                    />
                  </div>
                ) : (
                  <div className="space-y-6 text-base font-light leading-relaxed text-muted-foreground">
                    <p>
                      I'm a <span className="text-gradient font-medium">full-stack developer</span> passionate about 
                      creating <span className="text-gradient font-medium">beautiful, performant</span> web applications 
                      that make a difference.
                    </p>
                    <p>
                      With a focus on modern technologies and best practices, I deliver 
                      exceptional user experiences that solve real problems and create lasting value.
                    </p>
                    <p>
                      I believe in writing clean, maintainable code and staying current with 
                      the latest developments in web technology.
                    </p>
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>
        </div>
        
        {/* Technologies I work with - Animated rolling section */}
        {techSkills.length > 0 && (
          <motion.div 
            className="mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-6 mb-6">
              <div className="w-20 h-px bg-gradient-to-r from-transparent to-border"></div>
              <h3 className="text-lg font-light text-muted-foreground tracking-wide">
                Technologies I work with
              </h3>
              <div className="w-20 h-px bg-gradient-to-l from-transparent to-border"></div>
            </div>
          </div>
          
          {/* Infinite scrolling tech stack */}
          <div className="relative overflow-hidden">
            <div className="flex animate-scroll">
              {/* First set of technologies */}
              {techSkills.map((tech, index) => {
                const iconData = getIconComponent(tech.icon);
                if (!iconData) return null;
                
                return (
                  <motion.div
                    key={`first-${tech._id}`}
                    className="flex-shrink-0 mx-4"
                    whileHover={{ scale: 1.05, y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full text-sm font-light border border-border/20 bg-card/40 backdrop-blur-sm hover:border-border/40 hover:bg-card/60 transition-all duration-300">
                      <iconData.icon 
                        className="w-5 h-5"
                        style={{ color: iconData.color }}
                      />
                      <span className="text-muted-foreground hover:text-foreground transition-colors duration-300">
                        {tech.name}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
              
              {/* Duplicate set for seamless loop */}
              {techSkills.map((tech, index) => {
                const iconData = getIconComponent(tech.icon);
                if (!iconData) return null;
                
                return (
                  <motion.div
                    key={`second-${tech._id}`}
                    className="flex-shrink-0 mx-4"
                    whileHover={{ scale: 1.05, y: -2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full text-sm font-light border border-border/20 bg-card/40 backdrop-blur-sm hover:border-border/40 hover:bg-card/60 transition-all duration-300">
                      <iconData.icon 
                        className="w-5 h-5"
                        style={{ color: iconData.color }}
                      />
                      <span className="text-muted-foreground hover:text-foreground transition-colors duration-300">
                        {tech.name}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
          </motion.div>
        )}
        
        {/* Skills Section - Art N' Soul inspired */}
        {aboutData?.showSkills && aboutData?.skills && aboutData.skills.length > 0 && (
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="flex items-center justify-center gap-6 mb-8">
              <div className="w-20 h-px bg-gradient-to-r from-transparent to-border"></div>
              <h3 className="text-lg font-light text-muted-foreground tracking-wide">
                {aboutData.skillsTitle || "Skills & Technologies"}
              </h3>
              <div className="w-20 h-px bg-gradient-to-l from-transparent to-border"></div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
              {aboutData.skills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.7 + index * 0.03 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="group"
                >
                  <div className="px-4 py-2 bg-card/40 backdrop-blur-sm border border-border/20 rounded-full text-xs font-light text-muted-foreground hover:text-foreground hover:border-border/40 transition-all duration-300">
                    {skill.name}
                    {skill.level && skill.level !== 'intermediate' && (
                      <span className="ml-1.5 opacity-50 text-xs">• {skill.level}</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
};

export default About;
