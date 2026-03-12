import { useResume } from '@/context/ResumeContext';
import { Mail, Phone, MapPin } from 'lucide-react';

const ResumePreview = () => {
  const { resume } = useResume();
  const { personalInfo, education, skills, experience, projects, certifications, template } = resume;

  const templateStyles: Record<string, { header: string; accent: string; body: string; section: string; name: string }> = {
    modern: {
      header: 'bg-[hsl(220,70%,45%)] text-white p-6',
      accent: 'text-[hsl(220,70%,45%)]',
      body: 'bg-white',
      section: 'border-b border-[hsl(220,15%,90%)] pb-3 mb-3',
      name: 'text-2xl font-bold',
    },
    minimal: {
      header: 'border-b-2 border-[hsl(0,0%,15%)] p-6',
      accent: 'text-[hsl(0,0%,15%)]',
      body: 'bg-white',
      section: 'pb-3 mb-3',
      name: 'text-2xl font-light tracking-wide',
    },
    professional: {
      header: 'bg-[hsl(210,50%,30%)] text-white p-6',
      accent: 'text-[hsl(210,50%,30%)]',
      body: 'bg-[hsl(210,15%,98%)]',
      section: 'border-l-4 border-[hsl(210,50%,30%)] pl-3 mb-3',
      name: 'text-2xl font-bold',
    },
    creative: {
      header: 'bg-gradient-to-r from-[hsl(340,75%,50%)] to-[hsl(38,92%,50%)] text-white p-6',
      accent: 'text-[hsl(340,75%,50%)]',
      body: 'bg-white',
      section: 'border-b-2 border-[hsl(38,92%,50%)] pb-3 mb-3',
      name: 'text-2xl font-extrabold',
    },
  };

  const s = templateStyles[template];

  const SectionTitle = ({ children }: { children: string }) => (
    <h3 className={`text-sm font-bold uppercase tracking-wider ${s.accent} mb-2`}>{children}</h3>
  );

  const isEmpty = !personalInfo.name && education.length === 0 && skills.length === 0 && experience.length === 0;

  return (
    <div className={`w-full ${s.body} shadow-elevated rounded-lg overflow-hidden text-[11px] leading-relaxed`} style={{ fontFamily: 'var(--font-body)', minHeight: 500 }}>
      {/* Header */}
      <div className={s.header}>
        <div className="flex items-center gap-4">
          {personalInfo.profilePhoto && (
            <img src={personalInfo.profilePhoto} alt="" className="w-14 h-14 rounded-full object-cover border-2 border-white/30" />
          )}
          <div>
            <h2 className={s.name}>{personalInfo.name || 'Your Name'}</h2>
            <div className="flex flex-wrap gap-3 mt-1 opacity-90 text-[10px]">
              {personalInfo.email && <span className="flex items-center gap-1"><Mail size={10} />{personalInfo.email}</span>}
              {personalInfo.phone && <span className="flex items-center gap-1"><Phone size={10} />{personalInfo.phone}</span>}
              {personalInfo.address && <span className="flex items-center gap-1"><MapPin size={10} />{personalInfo.address}</span>}
            </div>
          </div>
        </div>
        {personalInfo.summary && <p className="mt-3 text-[10px] opacity-85 leading-relaxed">{personalInfo.summary}</p>}
      </div>

      <div className="p-5 space-y-4">
        {isEmpty && (
          <p className="text-center text-muted-foreground py-8 text-xs">Start filling the form to see your resume here</p>
        )}

        {experience.length > 0 && (
          <div className={s.section}>
            <SectionTitle>Experience</SectionTitle>
            {experience.map(exp => (
              <div key={exp.id} className="mb-2">
                <div className="flex justify-between">
                  <span className="font-semibold">{exp.position}</span>
                  <span className="text-[9px] text-muted-foreground">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                <p className="text-muted-foreground">{exp.company}</p>
                {exp.description && <p className="mt-0.5">{exp.description}</p>}
              </div>
            ))}
          </div>
        )}

        {education.length > 0 && (
          <div className={s.section}>
            <SectionTitle>Education</SectionTitle>
            {education.map(edu => (
              <div key={edu.id} className="mb-2">
                <div className="flex justify-between">
                  <span className="font-semibold">{edu.degree} {edu.field && `in ${edu.field}`}</span>
                  <span className="text-[9px] text-muted-foreground">{edu.startDate} – {edu.endDate}</span>
                </div>
                <p className="text-muted-foreground">{edu.institution} {edu.gpa && `• GPA: ${edu.gpa}`}</p>
              </div>
            ))}
          </div>
        )}

        {skills.length > 0 && (
          <div className={s.section}>
            <SectionTitle>Skills</SectionTitle>
            <div className="flex flex-wrap gap-1.5">
              {skills.map(skill => (
                <span key={skill} className={`px-2 py-0.5 rounded text-[10px] font-medium ${template === 'creative' ? 'bg-[hsl(340,75%,95%)] text-[hsl(340,75%,40%)]' : 'bg-secondary text-secondary-foreground'}`}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {projects.length > 0 && (
          <div className={s.section}>
            <SectionTitle>Projects</SectionTitle>
            {projects.map(proj => (
              <div key={proj.id} className="mb-2">
                <span className="font-semibold">{proj.name}</span>
                {proj.technologies && <span className="text-muted-foreground"> • {proj.technologies}</span>}
                {proj.description && <p className="mt-0.5">{proj.description}</p>}
              </div>
            ))}
          </div>
        )}

        {certifications.length > 0 && (
          <div className={s.section}>
            <SectionTitle>Certifications</SectionTitle>
            {certifications.map(cert => (
              <div key={cert.id} className="mb-1.5">
                <span className="font-semibold">{cert.name}</span>
                <span className="text-muted-foreground"> – {cert.issuer} {cert.date && `(${cert.date})`}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumePreview;
