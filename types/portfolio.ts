export interface Experience {
  id: string;
  company: string;
  role: string;
  location?: string;
  startDate: string;
  endDate?: string;
  description?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field?: string;
  startDate: string;
  endDate?: string;
  description?: string;
}

export interface Skill {
  id: string;
  name: string;
  category?: string;
}

export interface Project {
  id: string;
  title: string;
  description?: string;
  url?: string;
  image?: string;
  tags?: string[];
}

export interface SocialLinks {
  github?: string;
  linkedin?: string;
  twitter?: string;
  website?: string;
  email?: string;
}
  
export interface Portfolio {
  id: string;
  portfolioType: string;
  name: string;
  profession: string;
  profileImage?: string;
  resumeUrl?: string;
  socialLinks: SocialLinks;
  experiences: Experience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
}