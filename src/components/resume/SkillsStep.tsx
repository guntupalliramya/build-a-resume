import { useState } from 'react';
import { useResume } from '@/context/ResumeContext';
import { Wrench, Plus, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import SmartSuggestions from './SmartSuggestions';

const SkillsStep = () => {
  const { resume, updateResume } = useResume();
  const [input, setInput] = useState('');

  const addSkill = (skill: string) => {
    const trimmed = skill.trim();
    if (trimmed && !resume.skills.includes(trimmed)) {
      updateResume({ skills: [...resume.skills, trimmed] });
    }
    setInput('');
  };

  const removeSkill = (skill: string) => {
    updateResume({ skills: resume.skills.filter(s => s !== skill) });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') { e.preventDefault(); addSkill(input); }
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2">
        <Wrench size={20} className="text-primary" />
        <h3 className="text-lg font-semibold text-foreground" style={{ fontFamily: 'var(--font-body)' }}>Skills</h3>
      </div>

      <div className="flex gap-2">
        <Input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a skill and press Enter (e.g. developer, frontend)"
          className="flex-1"
        />
        <Button onClick={() => addSkill(input)} size="sm" className="gap-1.5">
          <Plus size={14} /> Add
        </Button>
      </div>

      <SmartSuggestions input={input} onSelect={addSkill} existingSkills={resume.skills} />

      <div className="flex flex-wrap gap-2 min-h-[48px]">
        {resume.skills.map(skill => (
          <span key={skill} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
            {skill}
            <button onClick={() => removeSkill(skill)} className="hover:text-destructive transition-colors"><X size={14} /></button>
          </span>
        ))}
        {resume.skills.length === 0 && (
          <p className="text-sm text-muted-foreground">No skills added yet. Try typing "developer" or "designer" for suggestions.</p>
        )}
      </div>
    </div>
  );
};

export default SkillsStep;
