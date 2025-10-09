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
import { useEffect, useState } from "react";
import { client, queries } from "@/lib/sanity";
import { IconType } from "react-icons";
import { motion } from "framer-motion";

// Tech skill type from Sanity
interface TechSkill {
  _id: string;
  name: string;
  icon: string;
  category?: string;
  proficiency?: string;
  order: number;
}

// Icon mapping for dynamic icons
const iconMapping: { [key: string]: IconType } = {
  "SiReact": SiReact,
  "SiNextdotjs": SiNextdotjs,
  "SiTypescript": SiTypescript,
  "SiJavascript": SiJavascript,
  "SiNodedotjs": SiNodedotjs,
  "SiPython": SiPython,
  "SiPostgresql": SiPostgresql,
  "SiMongodb": SiMongodb,
  "SiTailwindcss": SiTailwindcss,
  "SiGit": SiGit,
  "SiDocker": SiDocker,
  "SiAmazon": SiAmazon,
  "SiVuedotjs": SiVuedotjs,
  "SiSupabase": SiSupabase,
  "SiStripe": SiStripe,
  "SiOpenai": SiOpenai,
};

const TechSkills = () => {
  const [techSkills, setTechSkills] = useState<TechSkill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTechSkills = async () => {
      try {
        const data = await client.fetch(queries.techSkills);
        setTechSkills(data || []);
      } catch (error) {
        console.error('Error fetching tech skills:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTechSkills();
  }, []);

  if (loading) {
    return (
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Technologies I Work With</h2>
          <div className="flex justify-center">
            <div className="animate-pulse bg-card/50 h-16 w-full max-w-4xl rounded-lg"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <motion.section 
      className="py-20 px-4 bg-muted/30"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold mb-4 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Tech Stack
        </motion.h2>
        <motion.p 
          className="text-muted-foreground text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Technologies I work with
        </motion.p>
        
        {/* Rolling/Sliding animation container */}
        <motion.div 
          className="relative overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.div 
            className="flex animate-scroll space-x-8"
            initial={{ x: -100 }}
            whileInView={{ x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            {/* First set of skills */}
            {techSkills.map((tech, index) => {
              const IconComponent = iconMapping[tech.icon];
              return (
                <div
                  key={index}
                  className="flex flex-col items-center min-w-[120px] p-4 rounded-lg bg-background/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-110 group"
                >
                  {IconComponent ? (
                    <IconComponent 
                      className="w-12 h-12 mb-3 transition-all duration-300 group-hover:scale-110 text-primary" 
                    />
                  ) : (
                    <div className="w-12 h-12 mb-3 bg-primary/20 rounded-lg flex items-center justify-center">
                      <span className="text-xs font-bold text-primary">{tech.name.charAt(0)}</span>
                    </div>
                  )}
                  <span className="text-sm font-medium text-center">{tech.name}</span>
                </div>
              );
            })}
            {/* Duplicate for seamless loop */}
            {techSkills.map((tech, index) => {
              const IconComponent = iconMapping[tech.icon];
              return (
                <div
                  key={`duplicate-${index}`}
                  className="flex flex-col items-center min-w-[120px] p-4 rounded-lg bg-background/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-110 group"
                >
                  {IconComponent ? (
                    <IconComponent 
                      className="w-12 h-12 mb-3 transition-all duration-300 group-hover:scale-110 text-primary" 
                    />
                  ) : (
                    <div className="w-12 h-12 mb-3 bg-primary/20 rounded-lg flex items-center justify-center">
                      <span className="text-xs font-bold text-primary">{tech.name.charAt(0)}</span>
                    </div>
                  )}
                  <span className="text-sm font-medium text-center">{tech.name}</span>
                </div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default TechSkills;
