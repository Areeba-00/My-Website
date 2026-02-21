import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { 
  supabase, 
  AboutMe,
  Skill, 
  Project,
  ContactForm,
  fallbackAboutMe,
  fallbackSkills,
  fallbackProjects
} from '@/lib/supabase';

interface DataContextType {
  aboutMe: AboutMe;
  skills: Skill[];
  projects: Project[];
  loading: boolean;
}

const DataContext = createContext<DataContextType>({
  aboutMe: fallbackAboutMe,
  skills: fallbackSkills,
  projects: fallbackProjects,
  loading: true,
});

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<DataContextType>({
    aboutMe: fallbackAboutMe,
    skills: fallbackSkills,
    projects: fallbackProjects,
    loading: true,
  });

  useEffect(() => {
    async function fetchAllData() {
      try {
        const [aboutMeResult, skillsResult, projectsResult] = await Promise.all([
          supabase.from('about_me').select('*').maybeSingle(),
          supabase.from('skills').select('*').order('id', { ascending: true }),
          supabase.from('projects').select('*').order('project_date', { ascending: false }),
        ]);

        if (aboutMeResult.error) console.error('Error fetching about_me:', aboutMeResult.error);
        if (skillsResult.error) console.error('Error fetching skills:', skillsResult.error);
        if (projectsResult.error) console.error('Error fetching projects:', projectsResult.error);

        setData({
          aboutMe: aboutMeResult.data || fallbackAboutMe,
          skills: (skillsResult.data && skillsResult.data.length > 0) ? skillsResult.data : fallbackSkills,
          projects: (projectsResult.data && projectsResult.data.length > 0) ? projectsResult.data : fallbackProjects,
          loading: false,
        });
      } catch (error) {
        console.error('Unexpected error fetching data:', error);
        setData(prev => ({ ...prev, loading: false }));
      }
    }

    fetchAllData();
  }, []);

  return (
    <DataContext.Provider value={data}>
      {children}
    </DataContext.Provider>
  );
};

export async function submitContactForm(formData: Omit<ContactForm, 'id' | 'submitted_at'>) {
  try {
    const { error } = await supabase
      .from('contact_form')
      .insert([formData]);

    if (error) throw error;
    
    return { success: true };
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return { success: false, error: 'Failed to submit form' };
  }
}
