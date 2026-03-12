import { useResume } from '@/context/ResumeContext';
import { motion } from 'framer-motion';

const STEPS = ['Personal', 'Education', 'Skills', 'Experience', 'Projects', 'Certifications'];

const ProgressBar = () => {
  const { currentStep, completionPercentage } = useResume();

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-foreground">Step {currentStep + 1} of {STEPS.length}</span>
        <span className="text-muted-foreground">{completionPercentage}% complete</span>
      </div>
      <div className="h-2 rounded-full bg-secondary overflow-hidden">
        <motion.div
          className="h-full rounded-full gradient-hero"
          initial={{ width: 0 }}
          animate={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>
      <div className="hidden md:flex justify-between">
        {STEPS.map((step, i) => (
          <span
            key={step}
            className={`text-xs font-medium transition-colors ${
              i <= currentStep ? 'text-primary' : 'text-muted-foreground'
            }`}
          >
            {step}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
