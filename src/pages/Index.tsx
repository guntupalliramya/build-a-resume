import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, Sparkles, Layout, Download, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const features = [
  { icon: FileText, title: 'Multi-Step Builder', desc: 'Fill in your details step by step with an intuitive guided form.' },
  { icon: Sparkles, title: 'Smart Suggestions', desc: 'AI-powered skill and job description recommendations as you type.' },
  { icon: Layout, title: 'Template Selection', desc: 'Choose from 4 professional templates that update in real-time.' },
  { icon: Download, title: 'Download PDF', desc: 'Export your polished resume as a professional PDF document.' },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-[0.03]" />
        <div className="max-w-5xl mx-auto px-4 py-24 md:py-36 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Sparkles size={14} /> AI-Powered Resume Builder
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-foreground leading-tight tracking-tight">
              Build Your Perfect
              <span className="block gradient-hero bg-clip-text text-transparent">Resume in Minutes</span>
            </h1>
            <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Create a stunning, professional resume with our intuitive builder. Smart suggestions, live preview, and beautiful templates—all in one place.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/builder">
                <Button size="lg" className="text-base px-8 py-6 gradient-hero text-primary-foreground border-0 shadow-glow gap-2">
                  Create Resume <ArrowRight size={18} />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-4 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
              className="bg-card rounded-xl p-5 shadow-card border border-border hover:shadow-elevated transition-shadow"
            >
              <div className="w-10 h-10 rounded-lg gradient-hero flex items-center justify-center mb-3">
                <f.icon size={20} className="text-primary-foreground" />
              </div>
              <h3 className="font-semibold text-foreground mb-1" style={{ fontFamily: 'var(--font-body)' }}>{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;
