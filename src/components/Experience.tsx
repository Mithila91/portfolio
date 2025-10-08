type ExperienceItem = {
  role: string;
  company: string;
  period?: string;
  description?: string;
};

const experiences: ExperienceItem[] = [
  {
    role: "Senior Frontend Engineer",
    company: "Tech Innovations Inc",
    period: "2023 — Present",
    description:
      "Leading design systems and performance work. Built accessible component libraries and optimized bundle size.",
  },
  {
    role: "Full-Stack Developer",
    company: "Digital Solutions Co",
    period: "2021 — 2023",
    description:
      "Delivered end‑to‑end features across React, Node, and Postgres. Introduced CI and testing practices.",
  },
  {
    role: "Software Engineer",
    company: "Creative Labs",
    period: "2019 — 2021",
    description:
      "Shipped data‑heavy dashboards, real‑time updates, and internal tooling with strong DX focus.",
  },
  {
    role: "Junior Developer",
    company: "StartUp Studio",
    period: "2017 — 2019",
    description:
      "Contributed to core product UI, learned best practices, and supported rapid prototyping.",
  },
];

const Experience = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="sr-only">Experience</h2>

        {/* Timeline container */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-y-16">
          {/* Center line (only on md+) */}
          <span
            className="hidden md:block absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-border"
            aria-hidden
          />

          {experiences.map((exp, index) => {
            const isLeft = index % 2 === 0;
            return (
              <div
                key={index}
                className={
                  "relative md:col-span-1 " +
                  (isLeft ? "md:col-start-1" : "md:col-start-2")
                }
              >
                {/* Dot on the center line */}
                <span
                  className={
                    "hidden md:block absolute top-2 h-4 w-4 rounded-full bg-primary ring-4 ring-background shadow-glow " +
                    (isLeft ? "right-[-9px]" : "left-[-9px]")
                  }
                  aria-hidden
                />

                {/* Mobile line & dot on the left */}
                <span className="md:hidden absolute left-0 top-0 h-full w-px bg-border" aria-hidden />
                <span className="md:hidden absolute -left-[9px] top-2 h-4 w-4 rounded-full bg-primary ring-4 ring-background shadow-glow" aria-hidden />

                {/* Entry card with offset from the center line for readability */}
                <div
                  className={
                    "rounded-xl border border-border/50 bg-background/40 p-6 shadow-card backdrop-blur " +
                    (isLeft ? "md:mr-16 md:text-right" : "md:ml-16")
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
    </section>
  );
};

export default Experience;
