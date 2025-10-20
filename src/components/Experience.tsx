import { useEffect, useState } from "react";
import { client, queries } from "@/lib/sanity";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, Calendar } from "lucide-react";

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
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const toggleExpanded = (id: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

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
      className="py-20 px-4"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="sr-only">Experience</h2>

        {/* Timeline container */}
        <div className="relative">
          {/* Subtle center line (desktop) */}
          <motion.div
            className="hidden md:block absolute left-1/2 top-0 w-px bg-border/20"
            style={{ 
              height: '100%',
              transform: 'translateX(-50%)'
            }}
            aria-hidden
          >
            <motion.div
              className="w-full bg-gradient-to-b from-primary/60 via-primary/40 to-primary/20"
              initial={{ height: 0 }}
              whileInView={{ height: '100%' }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 3,
                ease: "easeInOut",
                delay: 0.5
              }}
            />
          </motion.div>

          {/* Subtle mobile timeline line */}
          <motion.div
            className="md:hidden absolute w-px bg-border/20"
            style={{ 
              height: '100%',
              left: '24px',
              top: '0',
              transform: 'translateX(-50%)'
            }}
            aria-hidden
          >
            <motion.div
              className="w-full bg-gradient-to-b from-primary/60 via-primary/40 to-primary/20"
              initial={{ height: 0 }}
              whileInView={{ height: '100%' }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 3,
                ease: "easeInOut",
                delay: 0.5
              }}
            />
          </motion.div>

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
                  {/* Minimal desktop dot - perfectly centered on timeline */}
                  <motion.div
                    className="hidden md:block absolute h-3 w-3 rounded-full bg-primary/90 ring-8 ring-background/80 backdrop-blur-sm z-20"
                    style={{ 
                      left: '50%',
                      top: '32px',
                      marginLeft: '-6px' // Half of width (12px/2) to center perfectly
                    }}
                    aria-hidden
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.8,
                      delay: index * 0.3 + 1.2,
                      type: "spring",
                      stiffness: 150,
                      damping: 15
                    }}
                  />

                  {/* Minimal mobile dot - perfectly centered on timeline */}
                  <motion.div 
                    className="md:hidden absolute h-3 w-3 rounded-full bg-primary/90 ring-6 ring-background/80 backdrop-blur-sm z-20"
                    style={{ 
                      left: '24px',
                      top: '32px',
                      marginLeft: '-6px' // Half of width (12px/2) to center perfectly
                    }}
                    aria-hidden 
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.8,
                      delay: index * 0.3 + 1.2,
                      type: "spring",
                      stiffness: 150,
                      damping: 15
                    }}
                  />

                  {/* Clean, minimal card design inspired by Art N' Soul */}
                  <motion.div
                    className={
                      "bg-card/80 backdrop-blur-sm border border-border/20 rounded-2xl p-8 text-left " +
                      "ml-16 mr-4 hover:bg-card/90 hover:border-border/40 transition-colors duration-300 " +
                      (isLeft 
                        ? "md:w-[calc(50%-3rem)] md:mr-auto md:ml-0 md:pr-10" 
                        : "md:w-[calc(50%-3rem)] md:ml-auto md:pl-10 md:mr-0"
                      )
                    }
                    whileHover={{ 
                      y: -4,
                      transition: { duration: 0.2, ease: "easeOut" }
                    }}
                    transition={{ duration: 0.3 }}
                    >
                    {/* Elegant header with clean typography */}
                    <div className="mb-6">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-2">
                        <div className="flex-1">
                          <motion.h3 
                            className="text-2xl font-light tracking-tight mb-1"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.2 + 0.5 }}
                          >
                            {exp.role}
                          </motion.h3>
                          <motion.p 
                            className="text-primary/80 font-medium text-lg"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.2 + 0.6 }}
                          >
                            {exp.company}
                          </motion.p>
                        </div>
                        {exp.period && (
                          <motion.div 
                            className="text-sm text-muted-foreground font-mono tracking-wider self-start sm:self-auto"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.2 + 0.7 }}
                          >
                            {exp.period}
                          </motion.div>
                        )}
                      </div>
                      <motion.div
                        className="w-12 h-px bg-primary/30"
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: index * 0.2 + 0.8 }}
                        style={{ transformOrigin: 'left' }}
                      />
                    </div>
                    
                    {/* Clean description with elegant typography */}
                    {exp.description && (
                      <motion.div 
                        className="space-y-4"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.2 + 0.9 }}
                      >
                        {/* Description text with smooth expand/collapse */}
                        <div className="overflow-hidden">
                          <AnimatePresence mode="wait">
                            {expandedItems.has(exp._id) ? (
                              <motion.p
                                key="expanded"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="text-base text-foreground/70 leading-relaxed font-light"
                              >
                                {exp.description}
                              </motion.p>
                            ) : (
                              <motion.p
                                key="collapsed"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="text-base text-foreground/70 leading-relaxed font-light"
                              >
                                {exp.description.length > 160 
                                  ? exp.description.substring(0, 160) + "..."
                                  : exp.description
                                }
                              </motion.p>
                            )}
                          </AnimatePresence>
                        </div>
                        
                        {/* Elegant toggle button */}
                        {exp.description.length > 160 && (
                          <motion.button 
                            className="text-sm text-primary/80 hover:text-primary font-light tracking-wide transition-colors group"
                            onClick={() => toggleExpanded(exp._id)}
                            whileHover={{ x: 2 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <span className="border-b border-primary/30 group-hover:border-primary/60 transition-colors">
                              {expandedItems.has(exp._id) ? "Show less" : "Read more"}
                            </span>
                          </motion.button>
                        )}
                      </motion.div>
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
