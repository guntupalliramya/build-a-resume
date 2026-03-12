export interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  profilePhoto: string | null;
  summary: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
  current: boolean;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string;
  link: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  link: string;
}

export type TemplateType = 'modern' | 'minimal' | 'professional' | 'creative';

export interface ResumeData {
  personalInfo: PersonalInfo;
  education: Education[];
  skills: string[];
  experience: Experience[];
  projects: Project[];
  certifications: Certification[];
  template: TemplateType;
}
