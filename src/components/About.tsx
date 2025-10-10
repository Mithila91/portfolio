'use client';

import { Badge } from "@/components/ui/badge";
import { client, queries } from "@/lib/sanity";
import { useEffect, useState } from "react";
import { PortableText, PortableTextComponents } from '@portabletext/react';
import { motion } from "framer-motion";

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const data = await client.fetch(queries.about);
        setAboutData(data);
      } catch (error) {
        console.error('Error fetching about data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  // Custom components for rich text rendering
  const portableTextComponents: PortableTextComponents = {
    marks: {
      strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
      em: ({ children }) => <em className="italic">{children}</em>,
      code: ({ children }) => <code className="bg-muted px-1 py-0.5 rounded text-sm font-mono">{children}</code>,
      highlight: ({ children }) => <span className="text-gradient font-semibold">{children}</span>,
      link: ({ children, value }) => (
        <a 
          href={value?.href} 
          className="text-primary hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      ),
      gradient: ({ children }) => <span className="text-gradient font-semibold">{children}</span>,
    },
    block: {
      normal: ({ children }) => <p className="mb-4 leading-relaxed">{children}</p>,
      h1: ({ children }) => <h1 className="text-3xl md:text-4xl font-bold mb-6">{children}</h1>,
      h2: ({ children }) => <h2 className="text-2xl md:text-3xl font-bold mb-4">{children}</h2>,
      h3: ({ children }) => <h3 className="text-xl md:text-2xl font-bold mb-3">{children}</h3>,
      blockquote: ({ children }) => (
        <blockquote className="border-l-4 border-primary pl-4 italic my-6 text-muted-foreground">
          {children}
        </blockquote>
      ),
    },
    list: {
      bullet: ({ children }) => <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>,
      number: ({ children }) => <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>,
    },
    listItem: {
      bullet: ({ children }) => <li>{children}</li>,
      number: ({ children }) => <li>{children}</li>,
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
      className={`py-20 px-4 ${backgroundClass}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      <div className={`${maxWidth} mx-auto ${textAlignClass}`}>
        <motion.h2 
          className="text-3xl md:text-4xl font-bold mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {aboutData?.title || "About me"}
        </motion.h2>
        
        {aboutData?.subtitle && (
          <motion.p 
            className="text-lg text-muted-foreground mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {aboutData.subtitle}
          </motion.p>
        )}
        
        <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
          {/* Left side - Key info cards */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {/* Quick stats/highlights */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-card border rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-primary">5+</div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </div>
              <div className="bg-card border rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-primary">50+</div>
                <div className="text-sm text-muted-foreground">Projects Built</div>
              </div>
            </div>
            
            {/* Key focus areas */}
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">What I Do</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm">Full-Stack Development</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm">Modern Web Applications</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm">Performance Optimization</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm">User Experience Design</span>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Right side - Concise about text */}
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {aboutData?.content ? (
              <div className="text-base leading-relaxed">
                <PortableText 
                  value={aboutData.content} 
                  components={{
                    ...portableTextComponents,
                    block: {
                      normal: ({ children }) => <p className="mb-3 leading-relaxed">{children}</p>,
                    }
                  }}
                />
              </div>
            ) : (
              <div className="space-y-3 text-base leading-relaxed">
                <p>
                  I'm a <span className="text-gradient font-semibold">full-stack developer</span> passionate about 
                  creating <span className="text-gradient font-semibold">beautiful, performant</span> web applications.
                </p>
                <p>
                  I focus on modern technologies and best practices to deliver 
                  exceptional user experiences that solve real problems.
                </p>
              </div>
            )}
          </motion.div>
        </div>
        
        {aboutData?.showSkills && aboutData?.skills && aboutData.skills.length > 0 && (
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="w-8 h-px bg-border"></div>
              <h3 className="text-base font-medium text-muted-foreground">
                {aboutData.skillsTitle || "Skills & Expertise"}
              </h3>
              <div className="w-8 h-px bg-border"></div>
            </div>
            <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto">
              {aboutData.skills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.7 + index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Badge 
                    variant={(skill.color as "default" | "secondary" | "destructive" | "outline") || "secondary"} 
                    className="text-xs px-3 py-1"
                  >
                    {skill.name}
                    {skill.level && skill.level !== 'intermediate' && (
                      <span className="ml-1 opacity-60">• {skill.level}</span>
                    )}
                  </Badge>
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
