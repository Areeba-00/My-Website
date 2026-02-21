import { lazy, Suspense } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import Footer from '@/components/Footer';
import TechBackground from '@/components/TechBackground';

// Lazy load below-the-fold sections
const AboutSection = lazy(() => import('@/components/AboutSection'));
const SkillsSection = lazy(() => import('@/components/SkillsSection'));
const ProjectsSection = lazy(() => import('@/components/ProjectsSection'));
const ContactSection = lazy(() => import('@/components/ContactSection'));

const Index = () => {
  return (
    <div className="opacity-100 transition-opacity duration-500">
      <TechBackground />
      <Navbar />
      <main>
        <HeroSection />
        <Suspense fallback={<div className="min-h-[50vh]" />}>
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <ContactSection />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
