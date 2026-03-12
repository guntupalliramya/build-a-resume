import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Download, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useResume } from '@/context/ResumeContext';
import ProgressBar from '@/components/resume/ProgressBar';
import TemplateSelector from '@/components/resume/TemplateSelector';
import ResumePreview from '@/components/resume/ResumePreview';
import PersonalInfoStep from '@/components/resume/PersonalInfoStep';
import EducationStep from '@/components/resume/EducationStep';
import SkillsStep from '@/components/resume/SkillsStep';
import ExperienceStep from '@/components/resume/ExperienceStep';
import ProjectsStep from '@/components/resume/ProjectsStep';
import CertificationsStep from '@/components/resume/CertificationsStep';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'sonner';

const STEPS = [PersonalInfoStep, EducationStep, SkillsStep, ExperienceStep, ProjectsStep, CertificationsStep];

const ResumeBuilder = () => {
  const { currentStep, setCurrentStep } = useResume();
  const [showPreview, setShowPreview] = useState(false);
  const StepComponent = STEPS[currentStep];

  const next = () => { if (currentStep < STEPS.length - 1) setCurrentStep(currentStep + 1); };
  const prev = () => { if (currentStep > 0) setCurrentStep(currentStep - 1); };

  const handleDownload = () => {
    toast.success('PDF download will be available soon! This is a UI demo.');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Bar */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft size={16} /> Back
          </Link>
          <h1 className="text-lg font-bold text-foreground" style={{ fontFamily: 'var(--font-display)' }}>Resume Builder</h1>
          <div className="flex gap-2">
            <Button onClick={() => setShowPreview(!showPreview)} variant="outline" size="sm" className="md:hidden">
              {showPreview ? 'Edit' : 'Preview'}
            </Button>
            <Button onClick={handleDownload} size="sm" className="gap-1.5 gradient-hero text-primary-foreground border-0">
              <Download size={14} /> PDF
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="mb-6">
          <ProgressBar />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Form Panel */}
          <div className={`lg:col-span-3 ${showPreview ? 'hidden md:block' : ''}`}>
            <div className="bg-card rounded-xl shadow-card border border-border p-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                >
                  <StepComponent />
                </motion.div>
              </AnimatePresence>

              <div className="flex justify-between mt-6 pt-4 border-t border-border">
                <Button onClick={prev} variant="outline" disabled={currentStep === 0} className="gap-1.5">
                  <ChevronLeft size={16} /> Previous
                </Button>
                <Button onClick={next} disabled={currentStep === STEPS.length - 1} className="gap-1.5 gradient-hero text-primary-foreground border-0">
                  Next <ChevronRight size={16} />
                </Button>
              </div>
            </div>
          </div>

          {/* Preview + Template Panel */}
          <div className={`lg:col-span-2 space-y-4 ${!showPreview ? 'hidden md:block' : ''}`}>
            <TemplateSelector />
            <div className="sticky top-24">
              <h4 className="text-sm font-semibold text-foreground mb-2">Live Preview</h4>
              <ResumePreview />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
