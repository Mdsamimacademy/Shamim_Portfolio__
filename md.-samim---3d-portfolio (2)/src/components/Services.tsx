import { motion } from 'motion/react';
import { 
  Code, 
  Brain, 
  BarChart3, 
  FileText, 
  BookOpen, 
  LineChart, 
  Sparkles, 
  FileCode, 
  Tv, 
  Layout, 
  ArrowRight 
} from 'lucide-react';
import { Service } from '../types';

interface ServicesProps {
  services: Service[];
}

export default function ServicesSection({ services }: ServicesProps) {
  // Safe resolver from database icon strings to Lucide elements
  const resolveIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code': return <Code className="w-5 h-5 text-cyan-600" />;
      case 'Brain': return <Brain className="w-5 h-5 text-cyan-600" />;
      case 'BarChart':
      case 'BarChart3': return <BarChart3 className="w-5 h-5 text-cyan-600" />;
      case 'FileText': return <FileText className="w-5 h-5 text-cyan-600" />;
      case 'BookOpen': return <BookOpen className="w-5 h-5 text-cyan-600" />;
      case 'LineChart': return <LineChart className="w-5 h-5 text-cyan-600" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-cyan-600" />;
      case 'FileCode': return <FileCode className="w-5 h-5 text-cyan-600" />;
      case 'Tv': return <Tv className="w-5 h-5 text-cyan-600" />;
      case 'Layout': return <Layout className="w-5 h-5 text-cyan-600" />;
      default: return <Code className="w-5 h-5 text-cyan-600" />;
    }
  };

  const triggerInquiry = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="py-24 px-4 bg-slate-50/40 border-t border-slate-200/60 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading */}
        <div className="text-center md:text-left mb-16">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[11px] font-mono tracking-[0.25em] text-cyan-600 uppercase mb-3 block animate-pulse"
          >
            [ OFFERINGS ]
          </motion.span>
          <motion.h3
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-display font-black tracking-tighter uppercase text-slate-900 leading-none"
          >
            Professional <span className="text-outline">Services</span>
          </motion.h3>
        </div>

        {/* Dynamic Services grid */}
        {services && services.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
            {services.map((srv, idx) => (
              <motion.div
                key={srv.id}
                id={`service-card-${srv.id}`}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="group p-6 bg-white/70 border border-slate-200 hover:border-cyan-500/35 hover:bg-white rounded-2xl backdrop-blur-md relative flex flex-col justify-between h-full transition-all duration-300 shadow-xs hover:shadow-md"
              >
                <div className="space-y-4">
                  {/* Icon + Title block */}
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                      {resolveIcon(srv.icon)}
                    </div>
                    <h4 className="text-sm sm:text-base font-display font-black uppercase tracking-tight text-slate-900 group-hover:text-cyan-600 transition-colors">
                      {srv.title}
                    </h4>
                  </div>

                  {/* Summary */}
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-sans">
                    {srv.description}
                  </p>
                </div>

                {/* Footer panel with pricing detail and inquiry trigger */}
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-100">
                  <span className="text-cyan-600 text-sm font-bold font-mono uppercase tracking-tight">
                    {srv.pricing || "Request Quote"}
                  </span>

                  <button
                    id={`service-btn-inquire-${srv.id}`}
                    onClick={triggerInquiry}
                    className="flex items-center gap-1 hover:gap-2 text-[10.5px] font-mono text-slate-500 hover:text-cyan-600 uppercase tracking-widest font-bold transition-all cursor-pointer"
                  >
                    Inquire
                    <ArrowRight className="w-3.5 h-3.5 text-cyan-500" />
                  </button>
                </div>

              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-slate-450 text-xs font-mono">No service offerings specified.</p>
        )}

      </div>
    </section>
  );
}
