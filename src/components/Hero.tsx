import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-5xl mx-auto text-center animate-fade-in">
        <div className="mb-8">
          <h2 className="text-4xl md:text-5xl font-light mb-4 text-foreground">
            An Amazing
          </h2>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-gradient leading-tight">
            Full-Stack Developer
          </h1>
        </div>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Hi 👋. My name is Mithila, and I am a full-stack developer passionate about creating 
          beautiful, performant web applications.
        </p>
        
        <Button 
          size="lg" 
          className="gradient-hero text-white hover:opacity-90 transition-opacity shadow-glow"
        >
          Let's Build Together
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </section>
  );
};

export default Hero;
