// Removed Card imports - using custom div structure for Art N' Soul aesthetic
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
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
  SiFramer
} from "react-icons/si";
import { IconType } from "react-icons";
import { useEffect, useState, useRef } from "react";
import { client, queries } from "@/lib/sanity";
import { motion } from "framer-motion";

// Project type from Sanity
interface Project {
  _id: string;
  title: string;
  year?: string;
  role?: string;
  description: string;
  image?: string;
  technologies: Array<{
    name: string;
    icon: string;
  }>;
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  isReleased: boolean;
  order: number;
}

// Tech icon mapping - Add new technologies here
const techIcons: { [key: string]: { icon: IconType; color: string } } = {
  "React": { icon: SiReact, color: "#61DAFB" },
  "React.js": { icon: SiReact, color: "#61DAFB" },
  "Next.js": { icon: SiNextdotjs, color: "#000000" },
  "TypeScript": { icon: SiTypescript, color: "#3178C6" },
  "Node.js": { icon: SiNodedotjs, color: "#339933" },
  "PostgreSQL": { icon: SiPostgresql, color: "#336791" },
  "MongoDB": { icon: SiMongodb, color: "#47A248" },
  "Tailwind": { icon: SiTailwindcss, color: "#06B6D4" },
  "Tailwind.css": { icon: SiTailwindcss, color: "#06B6D4" },
  "TailwindCSS": { icon: SiTailwindcss, color: "#06B6D4" },
  "Docker": { icon: SiDocker, color: "#2496ED" },
  "Vue.js": { icon: SiVuedotjs, color: "#4FC08D" },
  "Supabase": { icon: SiSupabase, color: "#3ECF8E" },
  "Stripe": { icon: SiStripe, color: "#635BFF" },
  "OpenAI": { icon: SiOpenai, color: "#412991" },
  "AWS": { icon: SiAmazonwebservices, color: "#FF9900" },
  "Nest.js": { icon: SiNestjs, color: "#E0234E" },
  "NestJS": { icon: SiNestjs, color: "#E0234E" },
  "Storybook": { icon: SiStorybook, color: "#FF4785" },
  "Storyblok": { icon: SiStorybook, color: "#FF4785" },
  "Shopify": { icon: SiShopify, color: "#7AB55C" },
  "Sanity": { icon: SiSanity, color: "#F03E2F" },
  "Sanity.io": { icon: SiSanity, color: "#F03E2F" },
  "Framer Motion": { icon: SiFramer, color: "#0055FF" },
  "Framer": { icon: SiFramer, color: "#0055FF" },
};

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await client.fetch(queries.projects);
        setProjects(data || []);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Calculate number of slides (3 projects per slide on desktop)
  const projectsPerSlide = 3;
  const totalSlides = Math.ceil(projects.length / projectsPerSlide);

  const scrollToSlide = (slideIndex: number) => {
    if (!scrollContainerRef.current) return;
    
    const container = scrollContainerRef.current;
    const slideWidth = container.scrollWidth / totalSlides;
    
    container.scrollTo({
      left: slideIndex * slideWidth,
      behavior: 'smooth'
    });
    setCurrentSlide(slideIndex);
  };

  // Handle scroll event to update current slide
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    
    const container = scrollContainerRef.current;
    const slideWidth = container.scrollWidth / totalSlides;
    const scrollLeft = container.scrollLeft;
    const newSlide = Math.round(scrollLeft / slideWidth);
    
    if (newSlide !== currentSlide) {
      setCurrentSlide(newSlide);
    }
  };

  if (loading) {
    return (
      <section className="">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Personal projects</h2>
          <p className="text-muted-foreground text-center mb-12">All projects I've worked on</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 bg-card/50 rounded-xl animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <motion.section 
      className="py-20 px-4"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Elegant header section */}
        <div className="text-center mb-20">
          <motion.h2 
            className="text-4xl md:text-5xl font-light tracking-tight mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Selected Work
          </motion.h2>
          <motion.div
            className="w-16 h-px bg-primary/40 mx-auto mb-6"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6 }}
          />
          <motion.p 
            className="text-muted-foreground/80 text-lg font-light max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            A collection of projects that showcase my passion for creating 
            meaningful digital experiences
          </motion.p>
        </div>
        
        {/* Desktop: Horizontal scroll carousel showing 3.5 projects */}
        <div className="hidden lg:block">
          <div className="max-w-[1400px] mx-auto overflow-hidden">
            <div 
              ref={scrollContainerRef}
              className="flex gap-8 overflow-x-auto pb-8 hide-scrollbar"
              style={{ 
                scrollSnapType: 'x mandatory',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}
              onScroll={handleScroll}
            >
            {projects.map((project, index) => {
            const isComingSoon = !project.isReleased;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ 
                  duration: 0.8,
                  delay: index * 0.1,
                  ease: "easeOut"
                }}
                whileHover={!isComingSoon ? { y: -8 } : {}}
                className="group"
                style={{ scrollSnapAlign: 'start' }}
              >
                <div
                  className={`
                    w-96 border border-border/20 rounded-3xl p-8 backdrop-blur-sm flex-shrink-0 flex flex-col
                    transition-all duration-500 min-h-[600px]
                    ${isComingSoon 
                      ? 'bg-card/40 opacity-60' 
                      : 'bg-card/60 hover:bg-card/80 hover:border-border/40'
                    }
                  `}
                >
                  {/* Header Section */}
                  <div className="mb-6">
                    <div className="flex justify-between items-start mb-3">
                      <Badge variant="outline" className={isComingSoon ? 'text-muted-foreground border-muted-foreground' : ''}>
                        {project.year}
                      </Badge>
                      {isComingSoon && (
                        <Badge variant="secondary" className="text-xs bg-muted text-muted-foreground">
                          Coming Soon
                        </Badge>
                      )}
                    </div>
                    <p className={`text-xs font-light mb-2 ${isComingSoon ? 'text-muted-foreground/70' : 'text-muted-foreground'}`}>
                      {project.role}
                    </p>
                    <h3 className={`text-xl font-light ${isComingSoon ? 'text-muted-foreground' : ''}`}>
                      {project.title}
                    </h3>
                  </div>

                  {/* Content Section - flexible to fill space */}
                  <div className="flex-1 flex flex-col">
                    <p className={`text-sm mb-4 ${isComingSoon ? 'text-muted-foreground/70' : 'text-muted-foreground'}`}>
                      {project.description}
                    </p>
                    
                    {/* Tech Stack Section */}
                    <div className="mb-6 flex-1">
                      <p className={`text-xs font-light mb-3 tracking-wide ${isComingSoon ? 'text-muted-foreground/70' : 'text-muted-foreground'}`}>
                        TECH STACK
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies?.map((tech, tagIndex) => {
                          const techIcon = techIcons[tech.name];
                          return (
                            <div
                              key={tagIndex}
                              className={`
                                inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-light
                                border transition-all duration-300
                                ${isComingSoon 
                                  ? 'bg-muted/20 border-muted/30 text-muted-foreground/60' 
                                  : 'bg-background/60 border-border/30 text-muted-foreground hover:border-border/50 hover:bg-background/80'
                                }
                              `}
                              title={tech.name}
                            >
                              {techIcon && (
                                <techIcon.icon 
                                  className="w-3 h-3"
                                  style={{ 
                                    color: isComingSoon ? '#9ca3af' : techIcon.color,
                                    opacity: isComingSoon ? 0.6 : 0.8
                                  }}
                                />
                              )}
                              <span>{tech.name}</span>
                            </div>
                          );
                        }) || []}
                      </div>
                    </div>
                    
                    {/* Visit Project Button or Coming Soon Message - Always at bottom */}
                    <div className="mt-auto">
                      {isComingSoon ? (
                        <div className="w-full py-2 px-4 bg-muted/30 border border-muted rounded-lg text-muted-foreground text-sm font-medium text-center cursor-not-allowed">
                          Coming Soon 🚧
                        </div>
                      ) : (
                        <button 
                          onClick={() => window.open(project.liveUrl || project.githubUrl, '_blank')}
                          className="w-full py-2 px-4 bg-primary/10 hover:bg-primary/20 border border-primary/30 hover:border-primary/50 rounded-lg text-primary text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 group"
                          disabled={!project.liveUrl && !project.githubUrl}
                        >
                          {project.liveUrl ? 'Visit Project' : 'View Code'}
                          <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
            </motion.div>
            );
          })}
          </div>
          
          {/* Carousel dots for desktop */}
          {totalSlides > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentSlide === index
                      ? 'bg-primary scale-125'
                      : 'bg-border/40 hover:bg-border/60'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
          </div>
        </div>

        {/* Mobile: Regular grid layout */}
        <div className="lg:hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => {
              const isComingSoon = !project.isReleased;
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ 
                    duration: 0.8,
                    delay: index * 0.2,
                    ease: "easeOut"
                  }}
                  whileHover={!isComingSoon ? { y: -8 } : {}}
                  className="group"
                >
                  <div
                    className={`
                      border border-border/20 rounded-3xl p-6 backdrop-blur-sm h-full
                      transition-all duration-500
                      ${isComingSoon 
                        ? 'bg-card/40 opacity-60' 
                        : 'bg-card/60 hover:bg-card/80 hover:border-border/40'
                      }
                    `}
                  >
                    {/* Header Section */}
                    <div className="mb-6">
                      <div className="flex justify-between items-start mb-3">
                        <Badge variant="outline" className={isComingSoon ? 'text-muted-foreground border-muted-foreground' : ''}>
                          {project.year}
                        </Badge>
                        {isComingSoon && (
                          <Badge variant="secondary" className="text-xs bg-muted text-muted-foreground">
                            Coming Soon
                          </Badge>
                        )}
                      </div>
                      <p className={`text-xs font-light mb-2 ${isComingSoon ? 'text-muted-foreground/70' : 'text-muted-foreground'}`}>
                        {project.role}
                      </p>
                      <h3 className={`text-xl font-light ${isComingSoon ? 'text-muted-foreground' : ''}`}>
                        {project.title}
                      </h3>
                    </div>

                    {/* Content Section */}
                    <div>
                      <p className={`text-sm mb-4 ${isComingSoon ? 'text-muted-foreground/70' : 'text-muted-foreground'}`}>
                        {project.description}
                      </p>
                      
                      {/* Tech Stack Section */}
                      <div className="mb-6">
                        <p className={`text-xs font-light mb-3 tracking-wide ${isComingSoon ? 'text-muted-foreground/70' : 'text-muted-foreground'}`}>
                          TECH STACK
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies?.map((tech, tagIndex) => {
                            const techIcon = techIcons[tech.name];
                            return (
                              <div
                                key={tagIndex}
                                className={`
                                  inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-light
                                  border transition-all duration-300
                                  ${isComingSoon 
                                    ? 'bg-muted/20 border-muted/30 text-muted-foreground/60' 
                                    : 'bg-background/60 border-border/30 text-muted-foreground hover:border-border/50 hover:bg-background/80'
                                  }
                                `}
                                title={tech.name}
                              >
                                {techIcon && (
                                  <techIcon.icon 
                                    className="w-3 h-3"
                                    style={{ 
                                      color: isComingSoon ? '#9ca3af' : techIcon.color,
                                      opacity: isComingSoon ? 0.6 : 0.8
                                    }}
                                  />
                                )}
                                <span>{tech.name}</span>
                              </div>
                            );
                          }) || []}
                        </div>
                      </div>
                      
                      {/* Visit Project Button or Coming Soon Message */}
                      {isComingSoon ? (
                        <div className="w-full mt-2 py-2 px-4 bg-muted/30 border border-muted rounded-lg text-muted-foreground text-sm font-medium text-center cursor-not-allowed">
                          Coming Soon 🚧
                        </div>
                      ) : (
                        <button 
                          onClick={() => window.open(project.liveUrl || project.githubUrl, '_blank')}
                          className="w-full mt-2 py-2 px-4 bg-primary/10 hover:bg-primary/20 border border-primary/30 hover:border-primary/50 rounded-lg text-primary text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 group"
                          disabled={!project.liveUrl && !project.githubUrl}
                        >
                          {project.liveUrl ? 'Visit Project' : 'View Code'}
                          <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Projects;
