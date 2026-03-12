import { useResume } from '@/context/ResumeContext';
import { GraduationCap, Plus, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Education } from '@/types/resume';

const EducationStep = () => {
  const { resume, updateResume } = useResume();

  const add = () => {
    updateResume({
      education: [...resume.education, { id: crypto.randomUUID(), institution: '', degree: '', field: '', startDate: '', endDate: '', gpa: '' }],
    });
  };

  const remove = (id: string) => {
    updateResume({ education: resume.education.filter(e => e.id !== id) });
  };

  const update = (id: string, field: keyof Education, value: string) => {
    updateResume({ education: resume.education.map(e => e.id === id ? { ...e, [field]: value } : e) });
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <GraduationCap size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground" style={{ fontFamily: 'var(--font-body)' }}>Education</h3>
        </div>
        <Button onClick={add} size="sm" variant="outline" className="gap-1.5">
          <Plus size={14} /> Add
        </Button>
      </div>

      {resume.education.length === 0 && (
        <p className="text-sm text-muted-foreground text-center py-8">No education added yet. Click "Add" to get started.</p>
      )}

      {resume.education.map((edu, i) => (
        <div key={edu.id} className="p-4 rounded-lg bg-secondary/50 border border-border space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Education #{i + 1}</span>
            <button onClick={() => remove(edu.id)} className="text-destructive hover:text-destructive/80 transition-colors"><Trash2 size={16} /></button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Input placeholder="Institution" value={edu.institution} onChange={e => update(edu.id, 'institution', e.target.value)} />
            <Input placeholder="Degree" value={edu.degree} onChange={e => update(edu.id, 'degree', e.target.value)} />
            <Input placeholder="Field of Study" value={edu.field} onChange={e => update(edu.id, 'field', e.target.value)} />
            <Input placeholder="GPA" value={edu.gpa} onChange={e => update(edu.id, 'gpa', e.target.value)} />
            <Input type="month" placeholder="Start Date" value={edu.startDate} onChange={e => update(edu.id, 'startDate', e.target.value)} />
            <Input type="month" placeholder="End Date" value={edu.endDate} onChange={e => update(edu.id, 'endDate', e.target.value)} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default EducationStep;
