import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Brain, Code, Server, Cloud, Sparkles } from 'lucide-react';
import { useData } from '@/hooks/useSupabaseData';

const SkillsSection = () => {
  const { skills } = useData();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);



  return (
    <section id="skills" className="relative py-20 sm:py-32 overflow-hidden">
      {/* Background - Clean */}
      <motion.div
        className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full bg-accent/5 blur-3xl"
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 12, repeat: Infinity }}
      />

      <div className="container mx-auto px-4" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-6 py-2 rounded-full neo-concave text-sm font-mono text-primary mb-4">
            Skills & Expertise
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            Technologies I <span className="gradient-text">master</span>
          </h2>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              onHoverStart={() => setHoveredSkill(skill.id)}
              onHoverEnd={() => setHoveredSkill(null)}
              className="relative group"
            >
              <div 
                className="neo-flat p-6 rounded-2xl h-full transition-all duration-300 hover:shadow-neo-convex hover:-translate-y-1"
              >
                {/* Icon & Header */}
                <div className="mb-4">
                  <div className="w-12 h-12 rounded-xl neo-pressed flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform duration-300">
                    {skill.skill_icon_url ? (
                      <img 
                        src={skill.skill_icon_url} 
                        alt={skill.skill_name} 
                        className="w-8 h-8 rounded-lg object-contain"
                      />
                    ) : (
                      <span className="text-lg font-bold">
                        {skill.skill_name.slice(0, 2).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {skill.skill_name}
                  </h3>
                </div>

                {/* Description/Tech Stack */}
                {skill.skill_description && (
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {skill.skill_description}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
