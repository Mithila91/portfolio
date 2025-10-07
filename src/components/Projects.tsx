import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    year: "2025",
    role: "Founder and Developer",
    title: "AI SaaS Platform",
    description: "A modern SaaS platform leveraging AI to automate business workflows.",
    tags: ["React", "TypeScript", "OpenAI", "Supabase"],
  },
  {
    year: "2024",
    role: "Lead Developer",
    title: "E-Commerce Dashboard",
    description: "Analytics dashboard for e-commerce businesses with real-time data visualization.",
    tags: ["Next.js", "PostgreSQL", "Stripe", "Tailwind"],
  },
  {
    year: "2024",
    role: "Creator",
    title: "Developer Tools Suite",
    description: "Collection of developer productivity tools and utilities.",
    tags: ["Vue.js", "Node.js", "MongoDB", "Docker"],
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
                  <ExternalLink className="h-4 w-4 text-muted-foreground hover:text-primary transition-colors" />
                </div>
                <CardDescription className="text-xs">{project.role}</CardDescription>
                <CardTitle className="text-xl">{project.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
