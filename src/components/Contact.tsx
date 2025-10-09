import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";

const Contact = () => {
  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Let's Connect</h2>
        <p className="text-lg text-muted-foreground mb-8">
          I'm always open to new opportunities and interesting projects. 
          Feel free to reach out!
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Button variant="outline" size="lg" className="gap-2">
            <Mail className="h-5 w-5" />
            Email
          </Button>
          <Button variant="outline" size="lg" className="gap-2">
            <Github className="h-5 w-5" />
            GitHub
          </Button>
          <Button variant="outline" size="lg" className="gap-2">
            <Linkedin className="h-5 w-5" />
            LinkedIn
          </Button>
        
        </div>
        
        <p className="text-sm text-muted-foreground">
          © 2025 Developer Portfolio. Built with Next.js, Tailwind CSS & Sanity.io.
        </p>
      </div>
    </section>
  );
};

export default Contact;
