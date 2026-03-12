import { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

const SKILL_MAP: Record<string, string[]> = {
  developer: ['JavaScript', 'React', 'Git', 'TypeScript', 'Node.js'],
  designer: ['Figma', 'Adobe XD', 'Sketch', 'UI/UX', 'Prototyping'],
  manager: ['Agile', 'Scrum', 'Leadership', 'Budgeting', 'Stakeholder Management'],
  data: ['Python', 'SQL', 'Tableau', 'Machine Learning', 'Pandas'],
  marketing: ['SEO', 'Google Analytics', 'Content Strategy', 'Social Media', 'Email Marketing'],
  frontend: ['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind CSS', 'TypeScript'],
  backend: ['Node.js', 'Python', 'PostgreSQL', 'REST APIs', 'Docker'],
  devops: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform'],
  mobile: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase'],
};

interface Props {
  input: string;
  onSelect: (suggestion: string) => void;
  existingSkills?: string[];
}

const SmartSuggestions = ({ input, onSelect, existingSkills = [] }: Props) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    if (!input || input.length < 2) { setSuggestions([]); return; }
    const lower = input.toLowerCase();
    const matched = Object.entries(SKILL_MAP)
      .filter(([key]) => lower.includes(key))
      .flatMap(([, skills]) => skills)
      .filter(s => !existingSkills.includes(s));
    setSuggestions([...new Set(matched)].slice(0, 6));
  }, [input, existingSkills]);

  if (suggestions.length === 0) return null;

  return (
    <div className="mt-2 p-3 rounded-lg bg-primary/5 border border-primary/10">
      <div className="flex items-center gap-1.5 text-xs font-medium text-primary mb-2">
        <Sparkles size={14} />
        <span>Suggested skills</span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {suggestions.map(s => (
          <button
            key={s}
            onClick={() => onSelect(s)}
            className="px-2.5 py-1 text-xs rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
          >
            + {s}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SmartSuggestions;
