import { useResume } from '@/context/ResumeContext';
import { Briefcase, Plus, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Experience } from '@/types/resume';

const ExperienceStep = () => {
  const { resume, updateResume } = useResume();

  const add = () => {
    updateResume({
      experience: [...resume.experience, { id: crypto.randomUUID(), company: '', position: '', startDate: '', endDate: '', description: '', current: false }],
    });
  };

  const remove = (id: string) => {
    updateResume({ experience: resume.experience.filter(e => e.id !== id) });
  };

  const update = (id: string, field: keyof Experience, value: string | boolean) => {
    updateResume({ experience: resume.experience.map(e => e.id === id ? { ...e, [field]: value } : e) });
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Briefcase size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground" style={{ fontFamily: 'var(--font-body)' }}>Work Experience</h3>
        </div>
        <Button onClick={add} size="sm" variant="outline" className="gap-1.5"><Plus size={14} /> Add</Button>
      </div>

      {resume.experience.length === 0 && (
        <p className="text-sm text-muted-foreground text-center py-8">No experience added yet.</p>
      )}

      {resume.experience.map((exp, i) => (
        <div key={exp.id} className="p-4 rounded-lg bg-secondary/50 border border-border space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Experience #{i + 1}</span>
            <button onClick={() => remove(exp.id)} className="text-destructive hover:text-destructive/80 transition-colors"><Trash2 size={16} /></button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Input placeholder="Company" value={exp.company} onChange={e => update(exp.id, 'company', e.target.value)} />
            <Input placeholder="Position" value={exp.position} onChange={e => update(exp.id, 'position', e.target.value)} />
            <Input type="month" value={exp.startDate} onChange={e => update(exp.id, 'startDate', e.target.value)} />
            <Input type="month" value={exp.endDate} onChange={e => update(exp.id, 'endDate', e.target.value)} disabled={exp.current} />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox checked={exp.current} onCheckedChange={v => update(exp.id, 'current', !!v)} id={`current-${exp.id}`} />
            <label htmlFor={`current-${exp.id}`} className="text-sm text-muted-foreground">Currently working here</label>
          </div>
          <Textarea placeholder="Job description..." value={exp.description} onChange={e => update(exp.id, 'description', e.target.value)} rows={3} />
        </div>
      ))}
    </div>
  );
};

export default ExperienceStep;
