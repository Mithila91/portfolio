import { Badge } from "@/components/ui/badge";


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
        
        </div>
      </div>
    </section>
  );
};

export default About;
