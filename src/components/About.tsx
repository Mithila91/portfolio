import { Badge } from "@/components/ui/badge";

const skills = [
  { name: "JavaScript", status: "Nailing" },
  { name: "TypeScript", status: "Using" },
  { name: "React.js", status: "Crushing" },
  { name: "Next.js", status: "Loving" },
  { name: "Tailwind CSS", status: "Mastering" },
  { name: "Node.js", status: "Slaying" },
  { name: "PostgreSQL", status: "Managing" },
  { name: "GraphQL", status: "Implementing" },
];

const About = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">About me</h2>
        
        <p className="text-xl md:text-2xl text-center mb-12 leading-relaxed">
          I'm a <span className="text-gradient font-semibold">full-stack developer</span> with a strong 
          focus on developing <span className="text-gradient font-semibold">bug-free</span>, 
          smooth user experiences.
        </p>
        
        <div className="mb-12">
          <h3 className="text-lg text-muted-foreground text-center mb-6">
            Here is a little bit about languages and technologies, that I am currently using.
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="flex flex-col items-center p-4 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:scale-105 animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <Badge variant="secondary" className="mb-2 text-xs">
                  {skill.status}
                </Badge>
                <span className="font-semibold text-foreground">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
