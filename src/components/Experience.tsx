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
          {/* Center line (only on md+) with progressive animation */}
          <motion.div
            className="hidden md:block absolute left-1/2 top-0 w-0.5 bg-border/30"
            style={{ 
              height: '100%',
              transform: 'translateX(-50%)'
            }}
            aria-hidden
          >
            <motion.div
              className="w-full bg-primary/80"
              initial={{ height: 0 }}
              whileInView={{ height: '100%' }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 2,
                ease: "easeInOut"
              }}
            />
          </motion.div>

          {/* Mobile timeline line */}
          <motion.div
            className="md:hidden absolute w-0.5 bg-border/30"
            style={{ 
              height: '100%',
              left: '24px',
              top: '0',
              transform: 'translateX(-50%)'
            }}
            aria-hidden
          >
            <motion.div
              className="w-full bg-primary/80"
              initial={{ height: 0 }}
              whileInView={{ height: '100%' }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 2,
                ease: "easeInOut"
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
                  {/* Desktop dot on the center line - perfectly centered */}
                  <motion.div
                    className="hidden md:block absolute h-4 w-4 rounded-full bg-primary ring-4 ring-background shadow-glow z-20"
                    style={{ 
                      left: '50%',
                      top: '24px',
                      transform: 'translateX(-50%)'
                    }}
                    aria-hidden
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.6,
                      delay: index * 0.2 + 0.8,
                      type: "spring",
                      stiffness: 200
                    }}
                  />

                  {/* Mobile dot on the left timeline */}
                  <motion.div 
                    className="md:hidden absolute h-4 w-4 rounded-full bg-primary ring-4 ring-background shadow-glow z-20"
                    style={{ 
                      left: '24px',
                      top: '24px',
                      transform: 'translateX(-50%)'
                    }}
                    aria-hidden 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.6,
                      delay: index * 0.2 + 0.8,
                      type: "spring",
                      stiffness: 200
                    }}
                  />

                  {/* Entry card with better mobile positioning */}
                  <motion.div
                    className={
                      "rounded-xl border border-border/50 bg-background/40 p-6 shadow-card backdrop-blur text-left " +
                      "ml-16 mr-4 " + // Mobile: proper spacing from timeline and screen edge
                      (isLeft 
                        ? "md:w-[calc(50%-3rem)] md:mr-auto md:ml-0 md:pr-8" 
                        : "md:w-[calc(50%-3rem)] md:ml-auto md:pl-8 md:mr-0"
                      )
                    }
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: "0 20px 40px -10px rgba(99, 179, 237, 0.3)",
                      borderColor: "rgba(99, 179, 237, 0.5)"
                    }}
                    transition={{ duration: 0.3 }}
                    >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="bg-primary/10 p-2 rounded-lg mt-1">
                          <Building2 className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <motion.h3 
                            className="text-lg font-semibold leading-tight"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.2 + 0.5 }}
                          >
                            {exp.role}
                          </motion.h3>
                          <motion.p 
                            className="text-primary font-medium"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.2 + 0.6 }}
                          >
                            {exp.company}
                          </motion.p>
                        </div>
                      </div>
                      {exp.period && (
                        <motion.div 
                          className="bg-muted px-3 py-1 rounded-full text-xs text-muted-foreground flex items-center gap-1 self-start sm:self-auto"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.6, delay: index * 0.2 + 0.7 }}
                        >
                          <Calendar className="h-3 w-3" />
                          {exp.period}
                        </motion.div>
                      )}
                    </div>
                    
                    {/* Key highlights with expandable description */}
                    {exp.description && (
                      <motion.div 
                        className="space-y-2"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: index * 0.2 + 0.8 }}
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
                                className="text-sm text-foreground/80 leading-relaxed"
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
                                className="text-sm text-foreground/80 leading-relaxed"
                              >
                                {exp.description.length > 120 
                                  ? exp.description.substring(0, 120) + "..."
                                  : exp.description
                                }
                              </motion.p>
                            )}
                          </AnimatePresence>
                        </div>
                        
                        {/* Toggle button for longer descriptions */}
                        {exp.description.length > 120 && (
                          <motion.button 
                            className="text-xs text-primary hover:underline font-medium transition-colors"
                            onClick={() => toggleExpanded(exp._id)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            {expandedItems.has(exp._id) ? "Show less ↑" : "View details →"}
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
