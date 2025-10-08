'use client';

import { Badge } from "@/components/ui/badge";
import { client, queries } from "@/lib/sanity";
import { useEffect, useState } from "react";
import { PortableText, PortableTextComponents } from '@portabletext/react';

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
    <section className={`py-20 px-4 ${backgroundClass}`}>
      <div className={`${maxWidth} mx-auto ${textAlignClass}`}>
        <h2 className="text-3xl md:text-4xl font-bold mb-8">
          {aboutData?.title || "About me"}
        </h2>
        
        {aboutData?.subtitle && (
          <p className="text-lg text-muted-foreground mb-8">
            {aboutData.subtitle}
          </p>
        )}
        
        <div className="text-xl md:text-2xl mb-12 leading-relaxed">
          {aboutData?.content ? (
            <PortableText 
              value={aboutData.content} 
              components={portableTextComponents}
            />
          ) : (
            <p>
              I'm a <span className="text-gradient font-semibold">full-stack developer</span> with a strong 
              focus on developing <span className="text-gradient font-semibold">bug-free</span>, 
              smooth user experiences.
            </p>
          )}
        </div>
        
        {aboutData?.showSkills && aboutData?.skills && aboutData.skills.length > 0 && (
          <div className="mb-12">
            <h3 className="text-lg text-muted-foreground mb-6">
              {aboutData.skillsTitle || "Skills & Expertise"}
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {aboutData.skills.map((skill, index) => (
                <Badge 
                  key={index}
                  variant={(skill.color as "default" | "secondary" | "destructive" | "outline") || "secondary"} 
                  className="text-sm"
                >
                  {skill.name} - {skill.level}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default About;
