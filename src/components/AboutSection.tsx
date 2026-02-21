import { memo, useMemo, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Download, MapPin, GraduationCap, Briefcase, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useData } from '@/hooks/useSupabaseData';

const AboutSection = memo(() => {
  const { aboutMe, loading } = useData();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  // 1. Safe parsing of work experience
  const workExperienceLines = useMemo(() => 
    aboutMe?.work_experience 
      ? aboutMe.work_experience.split('\n').filter(line => line.trim())
      : [],
    [aboutMe?.work_experience]
  );

  // 2. Optimized Google Drive Link Generator
  const getDownloadUrl = useCallback((url) => {
    if (!url) return null;
    
    try {
      // Extract ID from: https://drive.google.com/file/d/THE_ID/view?usp=sharing
      const idMatch = url.match(/\/file\/d\/([^/]+)/);
      const fileId = idMatch ? idMatch[1] : null;

      if (url.includes('drive.google.com') && fileId) {
        // Generates a direct download link
        return `https://drive.google.com/uc?export=download&id=${fileId}`;
      }
      return url;
    } catch (e) {
      return url;
    }
  }, []);

  const downloadUrl = useMemo(() => getDownloadUrl(aboutMe?.cv_link), [aboutMe?.cv_link, getDownloadUrl]);
  const hasValidCvLink = Boolean(downloadUrl);

  return (
    <section id="about" className="relative py-20 sm:py-32 overflow-hidden">
      {/* Background elements - Clean */}
      
      {/* FIX 1: Added 'relative z-10' to ensure content is ON TOP of the background */}
      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-6 py-2 rounded-full neo-concave text-sm font-mono text-primary mb-4">
            About Me
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            Get to know <span className="gradient-text">who I am</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Bio */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="neo-flat rounded-2xl p-6 sm:p-8">
              <motion.h3
                className="text-2xl sm:text-3xl font-bold gradient-text mb-4"
                whileHover={{ scale: 1.02 }}
              >
                {aboutMe?.name || 'Loading...'}
              </motion.h3>
              
              <p className="text-muted-foreground leading-relaxed mb-6">
                {aboutMe?.description}
              </p>

              <div className="space-y-4 mb-8">
                {aboutMe?.studies && (
                  <div className="flex items-center gap-3 text-sm">
                    <div className="p-2 rounded-lg neo-pressed text-primary">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                    <span className="text-muted-foreground">{aboutMe.studies}</span>
                  </div>
                )}
                
                {aboutMe?.other_details && (
                  <div className="flex items-center gap-3 text-sm">
                    <div className="p-2 rounded-lg neo-pressed text-primary">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <span className="text-muted-foreground">{aboutMe.other_details}</span>
                  </div>
                )}
              </div>

              {/* FIX 2: Replaced onClick with a real <a> tag using asChild */}
              {hasValidCvLink && (
                <Button
                  asChild
                  variant="neoprimary"
                  className="w-full sm:w-auto text-primary-foreground hover:opacity-90 cursor-pointer relative z-20"
                >
                  <a href={downloadUrl} target="_blank" rel="noopener noreferrer">
                    <Download className="w-4 h-4 mr-2" />
                    Download CV
                  </a>
                </Button>
              )}
            </div>
          </motion.div>

          {/* Right Column - Work Experience (unchanged logic) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg neo-pressed">
                <Briefcase className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Work Experience</h3>
            </div>

            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-accent to-transparent" />
              <div className="space-y-6">
                {workExperienceLines.map((exp, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                      className="relative pl-10"
                    >
                      <motion.div
                        className={`absolute left-0 w-8 h-8 rounded-full flex items-center justify-center ${
                          index === 0 ? 'neo-flat' : 'bg-secondary'
                        }`}
                      >
                        <div className={`w-2 h-2 rounded-full ${
                          index === 0 ? 'bg-primary shadow-neo-flat' : 'bg-primary/50'
                        }`} />
                      </motion.div>

                      <div className="neo-convex rounded-xl p-5 hover:scale-[1.02] transition-transform duration-300">
                        <div className="flex items-center gap-2 mb-2">
                          <FileText className="w-4 h-4 text-primary" />
                          <p className="text-foreground font-medium">{exp}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))
                }
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

AboutSection.displayName = 'AboutSection';

export default AboutSection;
