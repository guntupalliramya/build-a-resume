import { useResume } from '@/context/ResumeContext';
import { Award, Plus, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Certification } from '@/types/resume';

const CertificationsStep = () => {
  const { resume, updateResume } = useResume();

  const add = () => {
    updateResume({
      certifications: [...resume.certifications, { id: crypto.randomUUID(), name: '', issuer: '', date: '', link: '' }],
    });
  };

  const remove = (id: string) => {
    updateResume({ certifications: resume.certifications.filter(c => c.id !== id) });
  };

  const update = (id: string, field: keyof Certification, value: string) => {
    updateResume({ certifications: resume.certifications.map(c => c.id === id ? { ...c, [field]: value } : c) });
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Award size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground" style={{ fontFamily: 'var(--font-body)' }}>Certifications</h3>
        </div>
        <Button onClick={add} size="sm" variant="outline" className="gap-1.5"><Plus size={14} /> Add</Button>
      </div>

      {resume.certifications.length === 0 && (
        <p className="text-sm text-muted-foreground text-center py-8">No certifications added yet.</p>
      )}

      {resume.certifications.map((cert, i) => (
        <div key={cert.id} className="p-4 rounded-lg bg-secondary/50 border border-border space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-muted-foreground">Certification #{i + 1}</span>
            <button onClick={() => remove(cert.id)} className="text-destructive hover:text-destructive/80 transition-colors"><Trash2 size={16} /></button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Input placeholder="Certification Name" value={cert.name} onChange={e => update(cert.id, 'name', e.target.value)} />
            <Input placeholder="Issuing Organization" value={cert.issuer} onChange={e => update(cert.id, 'issuer', e.target.value)} />
            <Input type="month" value={cert.date} onChange={e => update(cert.id, 'date', e.target.value)} />
            <Input placeholder="Certificate Link" value={cert.link} onChange={e => update(cert.id, 'link', e.target.value)} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CertificationsStep;
