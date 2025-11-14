import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { client, queries } from "@/lib/sanity";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

// Dynamically import Hero3D to avoid SSR issues
const Hero3D = dynamic(() => import('./RobustHero3D'), { 
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 rounded-2xl">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
        <p className="text-sm text-muted-foreground">Loading 3D Scene...</p>
      </div>
    </div>
  )
});

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
      <motion.section 
        className="min-h-screen flex items-center justify-center px-4 py-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-5xl mx-auto text-center">
          <motion.div 
            className="h-16 bg-card/50 rounded-lg animate-pulse mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          />
          <motion.div 
            className="h-24 bg-card/50 rounded-lg animate-pulse mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
          <motion.div 
            className="h-6 bg-card/50 rounded-lg animate-pulse mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          />
          <motion.div 
            className="h-12 bg-card/50 rounded-lg animate-pulse w-48 mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          />
        </div>
      </motion.section>
    );
  }

  return (
    <motion.section 
      className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Left Content */}
          <motion.div 
            className="text-center lg:text-left z-10"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {heroData?.subtitle && (
              <motion.h2 
                className="text-2xl md:text-3xl font-light mb-4 text-muted-foreground"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                {heroData.subtitle}
              </motion.h2>
            )}
            
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gradient leading-tight mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                duration: 0.8, 
                delay: 0.6,
                type: "spring",
                stiffness: 100
              }}
            >
              {heroData?.title || "Full-Stack Developer"}
            </motion.h1>
            
            <motion.div 
              className="text-lg md:text-xl text-muted-foreground max-w-xl mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              {heroData?.description ? (
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
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Button 
                  size="lg" 
                  className="gradient-hero text-white hover:opacity-90 transition-opacity shadow-glow"
                  onClick={() => heroData?.contactEmail && window.open(`mailto:${heroData.contactEmail}`, '_blank')}
                >
                  Let's Build Together
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
          
          {/* Right 3D Scene */}
          <motion.div 
            className="h-[400px] md:h-[500px] lg:h-[600px] relative order-first lg:order-last"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 rounded-2xl"></div>
            <div className="relative h-full w-full rounded-2xl overflow-hidden">
              <Hero3D />
            </div>
          </motion.div>
          
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
      </div>
    </motion.section>
  );
};

export default Hero;
