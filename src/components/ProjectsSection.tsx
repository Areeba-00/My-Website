import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ExternalLink, Folder } from 'lucide-react';
import { useData } from '@/hooks/useSupabaseData';

const ProjectsSection = () => {
  const { projects } = useData();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  // Track images that failed to load so we can show placeholder instead of blank
  const [brokenImages, setBrokenImages] = useState<Record<number, boolean>>({});

  const getTechnologies = (techString: string | null): string[] => {
    if (!techString) return [];
    return techString.split(',').map(t => t.trim()).filter(t => t);
  };

  // Convert Google Drive share links to a direct image URL that <img> can display
  const normalizeImageUrl = (url: string | null): string | null => {
    if (!url) return null;

    // https://drive.google.com/file/d/<ID>/view?...
    const fileMatch = url.match(/drive\.google\.com\/file\/d\/([^/]+)/);
    if (fileMatch?.[1]) return `https://lh3.googleusercontent.com/d/${fileMatch[1]}`;

    // https://drive.google.com/open?id=<ID>
    const openMatch = url.match(/drive\.google\.com\/open\?id=([^&]+)/);
    if (openMatch?.[1]) return `https://lh3.googleusercontent.com/d/${openMatch[1]}`;

    // https://drive.google.com/uc?id=<ID>...
    const ucMatch = url.match(/drive\.google\.com\/uc\?id=([^&]+)/);
    if (ucMatch?.[1]) return `https://lh3.googleusercontent.com/d/${ucMatch[1]}`;

    // If user already stored googleusercontent format, keep it
    const gUserMatch = url.match(/lh3\.googleusercontent\.com\/d\/([^/?]+)/);
    if (gUserMatch?.[1]) return `https://lh3.googleusercontent.com/d/${gUserMatch[1]}`;

    // Otherwise assume it's already a direct image URL from somewhere else
    return url;
  };

  return (
    <section id="projects" className="relative py-20 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-noise opacity-[0.03]" />
      <motion.div
        className="absolute top-1/3 left-0 w-96 h-96 rounded-full bg-primary/5 blur-3xl"
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <div className="container mx-auto px-4" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-sm font-mono text-primary mb-4 backdrop-blur-md">
            // ARCHIVES
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold mb-4">
            <span className="text-foreground/80">SELECTED</span>{' '}
            <span className="gradient-text">WORKS</span>
          </h2>

        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[400px]">
          {projects.map((project, index) => {
            const technologies = getTechnologies(project.technologies_used);
            const imgSrc = normalizeImageUrl(project.project_image_url);
            const showImage = !!imgSrc && !brokenImages[project.id];
            
            // Bento Grid Logic: First project spans 2 cols, others alternate
            const isLarge = index === 0 || index === 3;
            const colSpan = isLarge ? "md:col-span-2" : "md:col-span-1";

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onHoverStart={() => setHoveredProject(project.id)}
                onHoverEnd={() => setHoveredProject(null)}
                className={`group relative ${colSpan}`}
              >
                <motion.div
                  className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
                />
                
                <div className="relative h-full neo-card overflow-hidden flex flex-col group-hover:shadow-neo-convex transition-shadow duration-500">
                  {/* HUD Elements */}
                  <div className="absolute top-4 left-4 z-20 flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-400" />
                    <div className="w-2 h-2 rounded-full bg-yellow-400" />
                    <div className="w-2 h-2 rounded-full bg-green-400" />
                  </div>
                  <div className="absolute top-4 right-4 z-20 font-mono text-[10px] text-primary/70 tracking-widest">
                    ID: {String(project.id).padStart(3, '0')}
                  </div>

                  {/* Project Image Area */}
                  <div className="relative h-1/2 overflow-hidden bg-secondary">
                    {showImage ? (
                      <motion.img
                        src={imgSrc as string}
                        alt={project.project_name}
                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                        animate={{ scale: hoveredProject === project.id ? 1.05 : 1 }}
                        transition={{ duration: 0.7 }}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        onError={() => {
                          setBrokenImages(prev => ({ ...prev, [project.id]: true }));
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Folder className="w-16 h-16 text-primary/20" />
                      </div>
                    )}
                    
                    {/* Scanline Overlay - Lighter */}
                    <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(255,255,255,0.2)_50%)] bg-[length:100%_4px] pointer-events-none opacity-30" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
                  </div>

                  {/* Content Area */}
                  <div className="relative flex-grow p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors font-heading tracking-tight">
                          {project.project_name}
                        </h3>
                        {project.project_link && (
                          <motion.a
                            href={project.project_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-full neo-flat hover:text-primary transition-all"
                            whileHover={{ rotate: 45 }}
                          >
                            <ExternalLink className="w-4 h-4" />
                          </motion.a>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-3 font-sans leading-relaxed">
                        {project.project_description}
                      </p>
                    </div>

                    {/* Tech Stack - HUD Style */}
                    <div className="mt-4 pt-4 border-t border-border">
                      <div className="flex flex-wrap gap-2">
                        {technologies.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 text-[10px] uppercase tracking-wider rounded neo-pressed text-primary font-bold font-mono"
                          >
                            {tech}
                          </span>
                        ))}
                         {technologies.length > 4 && (
                          <span className="px-2 py-1 text-[10px] rounded neo-pressed text-muted-foreground font-mono">
                            +{technologies.length - 4}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
