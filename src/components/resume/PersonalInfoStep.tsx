import { useResume } from '@/context/ResumeContext';
import { User, Mail, Phone, MapPin, Camera } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useCallback } from 'react';

const PersonalInfoStep = () => {
  const { resume, updateResume } = useResume();
  const { personalInfo } = resume;

  const update = (field: string, value: string) => {
    updateResume({ personalInfo: { ...personalInfo, [field]: value } });
  };

  const handlePhoto = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => update('profilePhoto', reader.result as string);
      reader.readAsDataURL(file);
    }
  }, [personalInfo]);

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2 mb-1">
        <User size={20} className="text-primary" />
        <h3 className="text-lg font-semibold text-foreground" style={{ fontFamily: 'var(--font-body)' }}>Personal Information</h3>
      </div>

      <div className="flex items-center gap-4">
        <label className="relative w-20 h-20 rounded-full bg-secondary flex items-center justify-center cursor-pointer overflow-hidden border-2 border-dashed border-primary/30 hover:border-primary/60 transition-colors group">
          {personalInfo.profilePhoto ? (
            <img src={personalInfo.profilePhoto} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <Camera size={24} className="text-muted-foreground group-hover:text-primary transition-colors" />
          )}
          <input type="file" accept="image/*" className="hidden" onChange={handlePhoto} />
        </label>
        <p className="text-sm text-muted-foreground">Click to upload photo</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground flex items-center gap-1.5"><User size={14} /> Full Name</label>
          <Input value={personalInfo.name} onChange={e => update('name', e.target.value)} placeholder="John Doe" />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground flex items-center gap-1.5"><Mail size={14} /> Email</label>
          <Input type="email" value={personalInfo.email} onChange={e => update('email', e.target.value)} placeholder="john@example.com" />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground flex items-center gap-1.5"><Phone size={14} /> Phone</label>
          <Input value={personalInfo.phone} onChange={e => update('phone', e.target.value)} placeholder="+1 234 567 890" />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-foreground flex items-center gap-1.5"><MapPin size={14} /> Address</label>
          <Input value={personalInfo.address} onChange={e => update('address', e.target.value)} placeholder="New York, USA" />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-foreground">Professional Summary</label>
        <Textarea value={personalInfo.summary} onChange={e => update('summary', e.target.value)} placeholder="Brief professional summary..." rows={3} />
      </div>
    </div>
  );
};

export default PersonalInfoStep;
