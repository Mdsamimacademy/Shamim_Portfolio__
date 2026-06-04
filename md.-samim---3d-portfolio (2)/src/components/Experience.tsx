import { motion } from 'motion/react';
import { Calendar, ChevronRight } from 'lucide-react';
import { Experience } from '../types';

interface ExperienceProps {
  experiences: Experience[];
}

export default function ExperienceSection({ experiences }: ExperienceProps) {
  return (
    <section id="experience" className="py-24 px-4 bg-white/80 backdrop-blur-md border-t border-slate-200/60 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading */}
        <div className="text-center md:text-left mb-16">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[11px] font-mono tracking-[0.25em] text-cyan-655 text-cyan-600 uppercase mb-3 block animate-pulse"
          >
            [ Career PATH ]
          </motion.span>
          <motion.h3
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-display font-black tracking-tighter uppercase text-slate-900 leading-none"
          >
            Professional <span className="text-outline">Experience</span>
          </motion.h3>
        </div>

        {/* Timeline Structure */}
        {experiences && experiences.length > 0 ? (
          <div className="relative max-w-4xl mx-auto pl-6 sm:pl-8 border-l border-slate-200 text-left">
            
            {/* The vertical timeline spine line */}
            <div className="absolute left-0 top-2 bottom-2 w-[1.5px] bg-gradient-to-b from-cyan-500 via-indigo-500 to-cyan-500/10" />

            {experiences.map((exp, idx) => (
              <motion.div
                key={exp.id}
                id={`experience-timeline-node-${exp.id}`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="relative pb-12 last:pb-0"
              >
                {/* Nodes Dot */}
                <span className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-white border-2 border-cyan-500 flex items-center justify-center shadow-md shadow-cyan-100">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                </span>

                {/* Body Details Card */}
                <div className="bg-white/70 border border-slate-200 hover:border-cyan-500/35 hover:bg-white p-6 sm:p-8 rounded-2xl backdrop-blur-md transition-all shadow-xs hover:shadow-md">
                  
                  {/* Top line with branding/dates */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 pb-4 border-b border-slate-100">
                    <div>
                      <h4 className="text-lg sm:text-xl font-display font-black text-slate-900 tracking-tight uppercase">
                        {exp.role}
                      </h4>
                      <span className="text-cyan-600 font-mono font-bold text-xs block mt-1 uppercase tracking-wide">
                        {exp.company}
                      </span>
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 text-slate-500 text-xs font-mono font-bold uppercase rounded-lg w-fit border border-slate-200">
                      <Calendar className="w-3.5 h-3.5 text-cyan-500" />
                      {exp.duration}
                    </div>
                  </div>

                  {/* Descriptions bullet list */}
                  <ul className="space-y-3">
                    {exp.bulletPoints && exp.bulletPoints.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex gap-2.5 items-start text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                        <ChevronRight className="w-4 h-4 text-cyan-500 flex-shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                </div>
              </motion.div>
            ))}

          </div>
        ) : (
          <p className="text-slate-400 text-xs font-mono">No career timelines recorded.</p>
        )}

      </div>
    </section>
  );
}
