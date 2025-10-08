import { 
  SiReact, 
  SiNextdotjs, 
  SiTypescript, 
  SiJavascript, 
  SiNodedotjs, 
  SiPython, 
  SiPostgresql, 
  SiMongodb, 
  SiTailwindcss, 
  SiGit, 
  SiDocker, 
  SiAmazon,
  SiVuedotjs,
  SiSupabase,
  SiStripe,
  SiOpenai
} from "react-icons/si";

const techSkills = [
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", icon: SiNextdotjs, color: "#000000" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
  { name: "Python", icon: SiPython, color: "#3776AB" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "#336791" },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Git", icon: SiGit, color: "#F05032" },
  { name: "Docker", icon: SiDocker, color: "#2496ED" },
  { name: "AWS", icon: SiAmazon, color: "#FF9900" },
  { name: "Vue.js", icon: SiVuedotjs, color: "#4FC08D" },
  { name: "Supabase", icon: SiSupabase, color: "#3ECF8E" },
  { name: "Stripe", icon: SiStripe, color: "#635BFF" },
  { name: "OpenAI", icon: SiOpenai, color: "#412991" },
];

const TechSkills = () => {
  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Tech Stack</h2>
        <p className="text-muted-foreground text-center mb-12">Technologies I work with</p>
        
        {/* Rolling/Sliding animation container */}
        <div className="relative overflow-hidden">
          <div className="flex animate-scroll space-x-8">
            {/* First set of skills */}
            {techSkills.map((tech, index) => (
              <div
                key={index}
                className="flex flex-col items-center min-w-[120px] p-4 rounded-lg bg-background/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-110 group"
              >
                <tech.icon 
                  className="w-12 h-12 mb-3 transition-all duration-300 group-hover:scale-110" 
                  style={{ color: tech.color }}
                />
                <span className="text-sm font-medium text-center">{tech.name}</span>
              </div>
            ))}
            {/* Duplicate for seamless loop */}
            {techSkills.map((tech, index) => (
              <div
                key={`duplicate-${index}`}
                className="flex flex-col items-center min-w-[120px] p-4 rounded-lg bg-background/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-110 group"
              >
                <tech.icon 
                  className="w-12 h-12 mb-3 transition-all duration-300 group-hover:scale-110" 
                  style={{ color: tech.color }}
                />
                <span className="text-sm font-medium text-center">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechSkills;
