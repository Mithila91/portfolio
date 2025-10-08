import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { client, queries } from "@/lib/sanity";

// Hero type from Sanity
interface HeroData {
  title: string;
  subtitle?: string;
  description: Array<{
    _type: string;
    children?: Array<{
      text: string;
    }>;
  }>; // Rich text from Sanity
  profileImage?: {
    asset: {
      url: string;
    };
  };
  resumeUrl?: string;
  contactEmail?: string;
}

const Hero = () => {
  const [heroData, setHeroData] = useState<HeroData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const data = await client.fetch(queries.hero);
        setHeroData(data);
      } catch (error) {
        console.error('Error fetching hero data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroData();
  }, []);

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-5xl mx-auto text-center">
          <div className="h-16 bg-card/50 rounded-lg animate-pulse mb-8"></div>
          <div className="h-24 bg-card/50 rounded-lg animate-pulse mb-8"></div>
          <div className="h-6 bg-card/50 rounded-lg animate-pulse mb-8"></div>
          <div className="h-12 bg-card/50 rounded-lg animate-pulse w-48 mx-auto"></div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-5xl mx-auto text-center animate-fade-in">
        <div className="mb-8">
          {heroData?.subtitle && (
            <h2 className="text-4xl md:text-5xl font-light mb-4 text-foreground">
              {heroData.subtitle}
            </h2>
          )}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-gradient leading-tight">
            {heroData?.title || "Full-Stack Developer"}
          </h1>
        </div>
        
        <div className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          {heroData?.description ? (
            // Render rich text content - for now just get the plain text
            <p>
              {heroData.description
                .filter((block) => block._type === 'block')
                .map((block) => 
                  block.children?.map((child) => child.text).join('')
                ).join(' ') || 
                "Hi 👋. My name is Mithila, and I am a full-stack developer passionate about creating beautiful, performant web applications."
              }
            </p>
          ) : (
            <p>
              Hi 👋. My name is Mithila, and I am a full-stack developer passionate about creating 
              beautiful, performant web applications.
            </p>
          )}
        </div>
        
        <Button 
          size="lg" 
          className="gradient-hero text-white hover:opacity-90 transition-opacity shadow-glow"
          onClick={() => heroData?.contactEmail && window.open(`mailto:${heroData.contactEmail}`, '_blank')}
        >
          Let's Build Together
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </section>
  );
};

export default Hero;
