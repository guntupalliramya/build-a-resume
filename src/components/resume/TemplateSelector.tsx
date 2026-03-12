import { useResume } from '@/context/ResumeContext';
import { TemplateType } from '@/types/resume';
import { Palette } from 'lucide-react';

const templates: { id: TemplateType; name: string; desc: string; colors: string[] }[] = [
  { id: 'modern', name: 'Modern', desc: 'Clean lines, bold header', colors: ['hsl(220,70%,45%)', 'hsl(220,20%,97%)'] },
  { id: 'minimal', name: 'Minimal', desc: 'Simple, elegant whitespace', colors: ['hsl(0,0%,15%)', 'hsl(0,0%,100%)'] },
  { id: 'professional', name: 'Professional', desc: 'Classic corporate style', colors: ['hsl(210,50%,30%)', 'hsl(210,15%,95%)'] },
  { id: 'creative', name: 'Creative', desc: 'Bold colors, unique layout', colors: ['hsl(340,75%,50%)', 'hsl(38,92%,50%)'] },
];

const TemplateSelector = () => {
  const { resume, setTemplate } = useResume();

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Palette size={18} className="text-primary" />
        <h4 className="text-sm font-semibold text-foreground">Template</h4>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {templates.map(t => (
          <button
            key={t.id}
            onClick={() => setTemplate(t.id)}
            className={`p-3 rounded-lg border-2 text-left transition-all ${
              resume.template === t.id
                ? 'border-primary bg-primary/5 shadow-glow'
                : 'border-border hover:border-primary/30'
            }`}
          >
            <div className="flex gap-1.5 mb-1.5">
              {t.colors.map((c, i) => (
                <div key={i} className="w-4 h-4 rounded-full border border-border" style={{ background: c }} />
              ))}
            </div>
            <p className="text-xs font-semibold text-foreground">{t.name}</p>
            <p className="text-[10px] text-muted-foreground">{t.desc}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;
