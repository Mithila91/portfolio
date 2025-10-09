import { useEffect, useState } from "react";
import { client, queries } from "@/lib/sanity";
import { motion } from "framer-motion";

type ExperienceItem = {
  _id: string;
  role: string;
  company: string;
  period?: string;
  description?: string;
  order: number;
};

const Experience = () => {
  const [experiences, setExperiences] = useState<ExperienceItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const data = await client.fetch(queries.experiences);
        setExperiences(data || []);
      } catch (error) {
        console.error('Error fetching experiences:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, []);

  if (loading) {
    return (
      <motion.section 
        className=""
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="sr-only">Experience</h2>
          <div className="space-y-32 md:space-y-24">
            {[1, 2, 3, 4].map((i) => (
              <motion.div 
                key={i} 
                className="h-32 bg-card/50 rounded-xl animate-pulse"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              />
            ))}
          </div>
        </div>
      </motion.section>
    );
  }

  return (
    <motion.section 
      className=""
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="sr-only">Experience</h2>

        {/* Timeline container */}
        <div className="relative">
          {/* Center line (only on md+) */}
          <motion.span
            className="hidden md:block absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-border"
            aria-hidden
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            style={{ transformOrigin: "top" }}
          />

          {/* Experience items */}
          <div className="space-y-32 md:space-y-24">
            {experiences.map((exp, index) => {
              const isLeft = index % 2 === 0;
              return (
                <motion.div
                  key={index}
                  className="relative"
                  initial={{ opacity: 0, y: 50, x: isLeft ? -50 : 50 }}
                  whileInView={{ opacity: 1, y: 0, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ 
                    duration: 0.8,
                    delay: index * 0.2,
                    ease: "easeOut"
                  }}
                >
                  {/* Dot on the center line */}
                  <motion.span
                    className={
                      "hidden md:block absolute top-2 h-4 w-4 rounded-full bg-primary ring-4 ring-background shadow-glow left-1/2 -translate-x-1/2 z-10"
                    }
                    aria-hidden
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.5,
                      delay: index * 0.2 + 0.3,
                      type: "spring",
                      stiffness: 200
                    }}
                  />

                  {/* Mobile line & dot on the left */}
                  {/* Line above dot (except for first item) */}
                  {index > 0 && (
                    <motion.span 
                      className="md:hidden absolute left-0 top-0 w-px h-6 bg-border z-0" 
                      aria-hidden 
                      initial={{ scaleY: 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      style={{ transformOrigin: "top" }}
                    />
                  )}
                  
                  {/* Line below dot */}
                  <motion.span 
                    className={`md:hidden absolute left-0 w-px bg-border z-0 ${
                      index === experiences.length - 1 
                        ? "mt-6 top-0 h-8" 
                        : "mt-6 top-0 h-16"
                    }`} 
                    aria-hidden 
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.1 + 0.2 }}
                    style={{ transformOrigin: "top" }}
                  />
                  
                  <motion.span 
                    className="md:hidden absolute -left-[9px] top-2 h-4 w-4 rounded-full bg-primary ring-4 ring-background shadow-glow z-10" 
                    aria-hidden 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.5,
                      delay: index * 0.2 + 0.3,
                      type: "spring",
                      stiffness: 200
                    }}
                  />

                  {/* Entry card with offset from the center line for readability */}
                  <motion.div
                    className={
                      "rounded-xl border border-border/50 bg-background/40 p-6 shadow-card backdrop-blur pl-10 ml-8 md:pl-6 text-left " +
                      (isLeft 
                        ? "md:w-[calc(50%-2rem)] md:mr-auto md:ml-0 md:pr-8" 
                        : "md:w-[calc(50%-2rem)] md:ml-auto md:pl-8"
                      )
                    }
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: "0 20px 40px -10px rgba(99, 179, 237, 0.3)",
                      borderColor: "rgba(99, 179, 237, 0.5)"
                    }}
                    transition={{ duration: 0.3 }}
                    >
                    <motion.h3 
                      className="text-xl font-semibold leading-tight"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.2 + 0.5 }}
                    >
                      {exp.role}
                      <span className="text-muted-foreground"> · {exp.company}</span>
                    </motion.h3>
                    {exp.period && (
                      <motion.time 
                        className="block text-sm text-muted-foreground mt-1"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.2 + 0.6 }}
                      >
                        {exp.period}
                      </motion.time>
                    )}
                    {exp.description && (
                      <motion.p 
                        className="mt-3 text-sm leading-relaxed text-foreground/80 max-w-none break-words"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.2 + 0.7 }}
                      >
                        {exp.description}
                      </motion.p>
                    )}
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Experience;
