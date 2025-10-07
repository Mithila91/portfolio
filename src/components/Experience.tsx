import { Card } from "@/components/ui/card";

const experiences = [
  {
    role: "Senior Frontend Engineer",
    company: "Tech Innovations Inc",
    gradient: "gradient-card-1",
    icon: "🚀",
  },
  {
    role: "Full-Stack Developer",
    company: "Digital Solutions Co",
    gradient: "gradient-card-2",
    icon: "⚡",
  },
  {
    role: "Software Engineer",
    company: "Creative Labs",
    gradient: "gradient-card-3",
    icon: "💡",
  },
  {
    role: "Junior Developer",
    company: "StartUp Studio",
    gradient: "gradient-card-4",
    icon: "🎯",
  },
];

const Experience = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {experiences.map((exp, index) => (
            <Card
              key={index}
              className={`${exp.gradient} border-0 p-8 hover:scale-105 transition-all duration-300 shadow-card cursor-pointer animate-scale-in`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-6xl mb-6">{exp.icon}</div>
              <p className="text-sm text-white/80 mb-2 font-medium">{exp.role}</p>
              <h3 className="text-2xl font-bold text-white">{exp.company}</h3>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
