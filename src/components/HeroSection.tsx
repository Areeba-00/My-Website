import { memo, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useData } from "@/hooks/useSupabaseData";

const HeroSection = memo(() => {
  const { aboutMe } = useData();

  const scrollToSection = useCallback((sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // Extract title from description (first sentence) or use a default
  const title = useMemo(
    () =>
      aboutMe.description?.split(".")[0] ||
      "AI Engineer & Full Stack Developer",
    [aboutMe.description],
  );

  // Memoize particles to prevent recreation
  const particles = useMemo(
    () =>
      [...Array(20)].map((_, i) => ({
        id: i,
        style: {
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        },
        className:
          i % 3 === 0 ? "w-2 h-2 bg-primary/30" : "w-1 h-1 bg-accent/40",
        duration: 5 + Math.random() * 3,
        delay: Math.random() * 2,
      })),
    [],
  );

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Floating particles - optimized */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className={`absolute rounded-full ${particle.className}`}
            style={particle.style}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.7, 0.2],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        {/* Radial Glow Layout Container - Removed for cleaner look in light mode */}
        <div className="relative max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 20,
              delay: 0.1,
            }}
            className="mb-8"
          >
            <span className="inline-block px-6 py-2 rounded-full neo-concave text-sm font-mono text-primary tracking-widest uppercase">
              System Online
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 20,
              delay: 0.3,
            }}
            className="text-5xl sm:text-6xl md:text-8xl font-bold font-heading mb-6 tracking-tight text-foreground/80"
          >
            Hi, I'm <span className="gradient-text">Areeba Akhtar</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 20,
              delay: 0.5,
            }}
            className="text-lg sm:text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto font-sans leading-relaxed"
          >
            AI Engineer | Reinforcement Learning | AI Automation
          </motion.p>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 20,
              delay: 0.7,
            }}
            className="flex items-center justify-center gap-6 mb-12"
          >
            <motion.a
              href="https://github.com/Inshal-Amir"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-full neo-flat text-muted-foreground hover:text-primary transition-all duration-300"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github className="w-6 h-6" />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/inshal-amir/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-full neo-flat text-muted-foreground hover:text-[#0077b5] transition-all duration-300"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Linkedin className="w-6 h-6" />
            </motion.a>
            <motion.a
              href="mailto:inshalamir00@gmail.com"
              className="p-4 rounded-full neo-flat text-muted-foreground hover:text-[#ea4335] transition-all duration-300"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail className="w-6 h-6" />
            </motion.a>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 20,
              delay: 0.9,
            }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Button
              onClick={() => scrollToSection("projects")}
              variant="neoprimary"
              size="lg"
              className="px-8 h-12 text-base"
            >
              Explore My Work
            </Button>
            <Button
              variant="default" // Uses neo-btn style
              size="lg"
              className="px-8 h-12 text-base text-muted-foreground hover:text-primary"
              onClick={() => scrollToSection("contact")}
            >
              Get In Touch
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => scrollToSection("about")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="w-8 h-8" />
      </motion.button>
    </section>
  );
});

HeroSection.displayName = "HeroSection";

export default HeroSection;
