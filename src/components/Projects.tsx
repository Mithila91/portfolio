import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
  SiOpenai
} from "react-icons/si";
import { IconType } from "react-icons";
import { useEffect, useState } from "react";
import { client, queries } from "@/lib/sanity";

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

// Tech icon mapping
const techIcons: { [key: string]: { icon: IconType; color: string } } = {
  "React": { icon: SiReact, color: "#61DAFB" },
  "Next.js": { icon: SiNextdotjs, color: "#000000" },
  "TypeScript": { icon: SiTypescript, color: "#3178C6" },
  "Node.js": { icon: SiNodedotjs, color: "#339933" },
  "PostgreSQL": { icon: SiPostgresql, color: "#336791" },
  "MongoDB": { icon: SiMongodb, color: "#47A248" },
  "Tailwind": { icon: SiTailwindcss, color: "#06B6D4" },
  "Docker": { icon: SiDocker, color: "#2496ED" },
  "Vue.js": { icon: SiVuedotjs, color: "#4FC08D" },
  "Supabase": { icon: SiSupabase, color: "#3ECF8E" },
  "Stripe": { icon: SiStripe, color: "#635BFF" },
  "OpenAI": { icon: SiOpenai, color: "#412991" },
};

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <section className="py-20 px-4">
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
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Personal projects</h2>
        <p className="text-muted-foreground text-center mb-12">All projects I've worked on</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => {
            const isComingSoon = !project.isReleased;
            
            return (
              <Card
                key={index}
                className={`
                  border-border transition-all duration-300 shadow-card animate-scale-in
                  ${isComingSoon 
                    ? 'bg-muted/30 border-muted opacity-70 cursor-not-allowed' 
                    : 'bg-card hover:border-primary/50 hover:scale-105 cursor-pointer'
                  }
                `}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="outline" className={isComingSoon ? 'text-muted-foreground border-muted-foreground' : ''}>
                      {project.year}
                    </Badge>
                    {isComingSoon && (
                      <Badge variant="secondary" className="text-xs bg-muted text-muted-foreground">
                        Coming Soon
                      </Badge>
                    )}
                  </div>
                  <CardDescription className={`text-xs ${isComingSoon ? 'text-muted-foreground/70' : ''}`}>
                    {project.role}
                  </CardDescription>
                  <CardTitle className={`text-xl ${isComingSoon ? 'text-muted-foreground' : ''}`}>
                    {project.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className={`text-sm mb-4 ${isComingSoon ? 'text-muted-foreground/70' : 'text-muted-foreground'}`}>
                    {project.description}
                  </p>
                  
                  {/* Tech Stack Section */}
                  <div className="mb-4">
                    <p className={`text-xs mb-2 ${isComingSoon ? 'text-muted-foreground/70' : 'text-muted-foreground'}`}>
                      TECH STACK
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {project.technologies?.map((tech, tagIndex) => {
                        const techIcon = techIcons[tech.name];
                        if (techIcon) {
                          const IconComponent = techIcon.icon;
                          return (
                            <div
                              key={tagIndex}
                              className={`
                                flex items-center justify-center w-10 h-10 rounded-lg border transition-all duration-300
                                ${isComingSoon 
                                  ? 'bg-muted/30 border-muted opacity-50' 
                                  : 'bg-background/50 border-border/50 hover:border-primary/50 hover:scale-110 group'
                                }
                              `}
                              title={tech.name}
                            >
                              <IconComponent 
                                className={`w-5 h-5 transition-all duration-300 ${!isComingSoon ? 'group-hover:scale-110' : ''}`}
                                style={{ 
                                  color: isComingSoon ? '#6b7280' : techIcon.color,
                                  opacity: isComingSoon ? 0.5 : 1
                                }}
                              />
                            </div>
                          );
                        }
                        return (
                          <Badge 
                            key={tagIndex} 
                            variant="secondary" 
                            className={`text-xs ${isComingSoon ? 'bg-muted text-muted-foreground opacity-50' : ''}`}
                          >
                            {tech.name}
                          </Badge>
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
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
