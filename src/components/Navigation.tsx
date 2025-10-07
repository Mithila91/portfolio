import { Button } from "@/components/ui/button";

const Navigation = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full gradient-hero" />
          <span className="font-bold text-lg">portfolio.dev</span>
        </div>
        
        <Button 
          variant="outline" 
          className="hover:border-primary hover:text-primary transition-colors"
        >
          Contact me
        </Button>
      </div>
    </nav>
  );
};

export default Navigation;
