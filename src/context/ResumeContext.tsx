import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ResumeData, TemplateType } from '@/types/resume';

const defaultResume: ResumeData = {
  personalInfo: { name: '', email: '', phone: '', address: '', profilePhoto: null, summary: '' },
  education: [],
  skills: [],
  experience: [],
  projects: [],
  certifications: [],
  template: 'modern',
};

interface ResumeContextType {
  resume: ResumeData;
  updateResume: (data: Partial<ResumeData>) => void;
  setTemplate: (t: TemplateType) => void;
  currentStep: number;
  setCurrentStep: (s: number) => void;
  completionPercentage: number;
}

const ResumeContext = createContext<ResumeContextType | null>(null);

export const useResume = () => {
  const ctx = useContext(ResumeContext);
  if (!ctx) throw new Error('useResume must be used within ResumeProvider');
  return ctx;
};

export const ResumeProvider = ({ children }: { children: ReactNode }) => {
  const [resume, setResume] = useState<ResumeData>(defaultResume);
  const [currentStep, setCurrentStep] = useState(0);

  const updateResume = (data: Partial<ResumeData>) => {
    setResume(prev => ({ ...prev, ...data }));
  };

  const setTemplate = (t: TemplateType) => {
    setResume(prev => ({ ...prev, template: t }));
  };

  const completionPercentage = (() => {
    let filled = 0;
    let total = 6;
    if (resume.personalInfo.name && resume.personalInfo.email) filled++;
    if (resume.education.length > 0) filled++;
    if (resume.skills.length > 0) filled++;
    if (resume.experience.length > 0) filled++;
    if (resume.projects.length > 0) filled++;
    if (resume.certifications.length > 0) filled++;
    return Math.round((filled / total) * 100);
  })();

  return (
    <ResumeContext.Provider value={{ resume, updateResume, setTemplate, currentStep, setCurrentStep, completionPercentage }}>
      {children}
    </ResumeContext.Provider>
  );
};
