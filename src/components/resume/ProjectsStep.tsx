import { useResume } from '@/context/ResumeContext';
import { FolderOpen, Plus, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Project } from '@/types/resume';

const ProjectsStep = () => {
  const { resume, updateResume } = useResume();

  const add = () => {
    updateResume({
      projects: [...resume.projects, { id: crypto.randomUUID(), name: '', description: '', technologies: '', link: '' }],
    });
  };

  const remove = (id: string) => {
    updateResume({ projects: resume.projects.filter(p => p.id !== id) });
  };

  const update = (id: string, field: keyof Project, value: string) => {
    updateResume({ projects: resume.projects.map(p => p.id === id ? { ...p, [field]: value } : p) });
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FolderOpen size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground" style={{ fontFamily: 'var(--font-body)' }}>Projects</h3>
        </div>
        <Button onClick={add} size="sm" variant="outline" className="gap-1.5"><Plus size={14} /> Add</Button>
      </div>

      {resume.projects.length === 0 && (
        <p className="text-sm text-muted-foreground text-center py-8">No projects added yet.</p>
      )}

      {resume.projects.map((proj, i) => (
        <div key={proj.id} className="p-4 rounded-lg bg-secondary/50 border border-border space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Project #{i + 1}</span>
            <button onClick={() => remove(proj.id)} className="text-destructive hover:text-destructive/80 transition-colors"><Trash2 size={16} /></button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Input placeholder="Project Name" value={proj.name} onChange={e => update(proj.id, 'name', e.target.value)} />
            <Input placeholder="Technologies Used" value={proj.technologies} onChange={e => update(proj.id, 'technologies', e.target.value)} />
            <Input placeholder="Project Link" value={proj.link} onChange={e => update(proj.id, 'link', e.target.value)} className="md:col-span-2" />
          </div>
          <Textarea placeholder="Project description..." value={proj.description} onChange={e => update(proj.id, 'description', e.target.value)} rows={2} />
        </div>
      ))}
    </div>
  );
};

export default ProjectsStep;
