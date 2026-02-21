import { createClient } from "@supabase/supabase-js";

// Supabase credentials
const supabaseUrl = "https://elcowyxrpjffxgsixdga.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVsY293eXhycGpmZnhnc2l4ZGdhIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MTM0NzIyNCwiZXhwIjoyMDg2OTIzMjI0fQ.QhzoRFKunxl9Y3f3uTnhvAx1odysoM7Em3Ku6vUkVRY";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types matching your actual Supabase tables
export interface AboutMe {
  id: number;
  name: string;
  description: string;
  studies: string | null;
  work_experience: string | null;
  other_details: string | null;
  cv_link: string | null;
}

export interface Skill {
  id: number;
  skill_name: string;
  skill_level: string | null;
  skill_description: string | null;
  skill_icon_url: string | null;
}

export interface Project {
  id: number;
  project_name: string;
  project_description: string;
  project_image_url: string | null;
  project_link: string | null;
  technologies_used: string | null;
  project_date: string | null;
}

export interface ContactForm {
  id?: number;
  name: string;
  email: string;
  message: string;
  submitted_at?: string;
}

// Fallback data for when Supabase is not connected
export const fallbackAboutMe: AboutMe = {
  id: 1,
  name: "Inshal Amir",
  description:
    "Passionate AI enthusiast with expertise in machine learning, deep learning, and full-stack development. I specialize in building intelligent systems that solve real-world problems.",
  studies:
    "Bachelor of Science in Computer Science - Specialization in Artificial Intelligence",
  work_experience:
    "Senior AI Engineer at Tech Innovation Labs (2022-Present)\nFull Stack Developer at Digital Solutions Inc (2020-2021)",
  other_details: "Available Worldwide",
  cv_link: null,
};

export const fallbackSkills: Skill[] = [
  {
    id: 1,
    skill_name: "Machine Learning",
    skill_level: "95",
    skill_description: "TensorFlow, PyTorch, Scikit-learn",
    skill_icon_url: null,
  },
  {
    id: 2,
    skill_name: "Deep Learning",
    skill_level: "90",
    skill_description: "Neural Networks, CNNs, RNNs, Transformers",
    skill_icon_url: null,
  },
  {
    id: 3,
    skill_name: "Natural Language Processing",
    skill_level: "88",
    skill_description: "BERT, GPT, Sentiment Analysis",
    skill_icon_url: null,
  },
  {
    id: 4,
    skill_name: "React",
    skill_level: "92",
    skill_description: "React.js, Next.js, Redux",
    skill_icon_url: null,
  },
  {
    id: 5,
    skill_name: "Python",
    skill_level: "95",
    skill_description: "FastAPI, Django, Data Science",
    skill_icon_url: null,
  },
  {
    id: 6,
    skill_name: "Node.js",
    skill_level: "85",
    skill_description: "Express, REST APIs, GraphQL",
    skill_icon_url: null,
  },
  {
    id: 7,
    skill_name: "Cloud Services",
    skill_level: "80",
    skill_description: "AWS, GCP, Azure, Docker",
    skill_icon_url: null,
  },
  {
    id: 8,
    skill_name: "Computer Vision",
    skill_level: "85",
    skill_description: "OpenCV, Image Processing, Object Detection",
    skill_icon_url: null,
  },
];

export const fallbackProjects: Project[] = [
  {
    id: 1,
    project_name: "AI Chat Assistant",
    project_description:
      "An intelligent conversational AI powered by GPT that can understand context and provide helpful responses.",
    technologies_used: "Python, OpenAI, FastAPI, React",
    project_image_url: null,
    project_link: "#",
    project_date: null,
  },
  {
    id: 2,
    project_name: "Smart Image Analyzer",
    project_description:
      "Computer vision application that analyzes images to detect objects, faces, and extract text.",
    technologies_used: "TensorFlow, OpenCV, Python, Flask",
    project_image_url: null,
    project_link: "#",
    project_date: null,
  },
  {
    id: 3,
    project_name: "Predictive Analytics Dashboard",
    project_description:
      "Real-time analytics platform with ML-powered predictions for business intelligence.",
    technologies_used: "React, D3.js, Python, PostgreSQL",
    project_image_url: null,
    project_link: "#",
    project_date: null,
  },
];
