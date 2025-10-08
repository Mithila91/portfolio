import { useEffect, useState } from "react";
import { client, queries } from "@/lib/sanity";

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
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="sr-only">Experience</h2>
          <div className="space-y-32 md:space-y-24">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 bg-card/50 rounded-xl animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="sr-only">Experience</h2>

        {/* Timeline container */}
        <div className="relative">
          {/* Center line (only on md+) */}
          <span
            className="hidden md:block absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-border"
            aria-hidden
          />

          {/* Experience items */}
          <div className="space-y-32 md:space-y-24">
            {experiences.map((exp, index) => {
              const isLeft = index % 2 === 0;
              return (
                <div
                  key={index}
                  className="relative"
                >
                  {/* Dot on the center line */}
                  <span
                    className={
                      "hidden md:block absolute top-2 h-4 w-4 rounded-full bg-primary ring-4 ring-background shadow-glow left-1/2 -translate-x-1/2 z-10"
                    }
                    aria-hidden
                  />

                  {/* Mobile line & dot on the left */}
                  {/* Line above dot (except for first item) */}
                  {index > 0 && (
                    <span 
                      className="md:hidden absolute left-0 top-0 w-px h-6 bg-border z-0" 
                      aria-hidden 
                    />
                  )}
                  
                  {/* Line below dot */}
                  <span 
                    className={`md:hidden absolute left-0 w-px bg-border z-0 ${
                      index === experiences.length - 1 
                        ? "mt-6 top-0 h-8" 
                        : "mt-6 top-0 h-16"
                    }`} 
                    aria-hidden 
                  />
                  
                  <span className="md:hidden absolute -left-[9px] top-2 h-4 w-4 rounded-full bg-primary ring-4 ring-background shadow-glow z-10" aria-hidden />

                  {/* Entry card with offset from the center line for readability */}
                  <div
                    className={
                      "rounded-xl border border-border/50 bg-background/40 p-6 shadow-card backdrop-blur pl-10 ml-8 md:pl-6 " +
                      (isLeft 
                        ? "md:w-[calc(50%-2rem)] md:mr-auto md:ml-0 md:text-right md:pr-6" 
                        : "md:w-[calc(50%-2rem)] md:ml-auto md:pl-6"
                      )
                    }
                    >
                    <h3 className="text-xl font-semibold">
                      {exp.role}
                      <span className="text-muted-foreground"> · {exp.company}</span>
                    </h3>
                    {exp.period && (
                      <time className="block text-sm text-muted-foreground mt-1">{exp.period}</time>
                    )}
                    {exp.description && (
                      <p className="mt-3 text-sm leading-6 text-foreground/80">{exp.description}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
