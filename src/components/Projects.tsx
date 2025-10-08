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

const projects = [
  {
    year: "2025",
    role: "Founder and Developer",
    title: "DeepSite",
    description: "The new AI Vibe Coding Platform, develop and deploy your AI applications in minutes.",
    tags: ["TypeScript", "React", "Node.js"],
    link: "https://deepsite.ai"
  },
  {
    year: "2023",
    role: "Founder and Developer", 
    title: "DiscoTools.xyz",
    description: "A comprehensive set of tools for Discord servers and communities.",
    tags: ["TypeScript", "React", "Node.js"],
    link: "https://discotools.xyz"
  },
];

const Projects = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Personal projects</h2>
        <p className="text-muted-foreground text-center mb-12">All projects I've worked on</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="bg-card border-border hover:border-primary/50 transition-all duration-300 hover:scale-105 cursor-pointer animate-scale-in shadow-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="outline">{project.year}</Badge>
                </div>
                <CardDescription className="text-xs">{project.role}</CardDescription>
                <CardTitle className="text-xl">{project.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
                
                {/* Tech Stack Section */}
                <div className="mb-4">
                  <p className="text-xs text-muted-foreground mb-2">TECH STACK</p>
                  <div className="flex gap-3">
                    {project.tags.map((tag, tagIndex) => {
                      const techIcon = techIcons[tag];
                      if (techIcon) {
                        const IconComponent = techIcon.icon;
                        return (
                          <div
                            key={tagIndex}
                            className="flex items-center justify-center w-10 h-10 rounded-lg bg-background/50 border border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-110 group"
                            title={tag}
                          >
                            <IconComponent 
                              className="w-5 h-5 transition-all duration-300 group-hover:scale-110" 
                              style={{ color: techIcon.color }}
                            />
                          </div>
                        );
                      }
                      return (
                        <Badge key={tagIndex} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      );
                    })}
                  </div>
                </div>
                
                {/* Visit Project Button */}
                <button 
                  onClick={() => window.open(project.link, '_blank')}
                  className="w-full mt-2 py-2 px-4 bg-primary/10 hover:bg-primary/20 border border-primary/30 hover:border-primary/50 rounded-lg text-primary text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 group"
                >
                  Visit Project
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
