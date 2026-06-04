import { motion } from 'motion/react';
import { Calendar, Award, MapPin, GraduationCap } from 'lucide-react';
import { About, Education } from '../types';

interface AboutProps {
  about: About;
  educationList: Education[];
}

export default function AboutSection({ about, educationList }: AboutProps) {
  return (
    <section id="about" className="py-24 px-4 bg-slate-50/70 backdrop-blur-md relative border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading */}
        <div className="text-center md:text-left mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[11px] font-mono tracking-[0.25em] text-cyan-600 uppercase mb-3 block animate-pulse"
          >
            [ BIOGRAPHY ]
          </motion.span>
          <motion.h3
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-display font-black tracking-tighter uppercase text-slate-900 leading-none"
          >
            About <span className="text-outline">Me</span>
          </motion.h3>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Biography Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 bg-white/70 border border-slate-200 p-6 sm:p-8 rounded-2xl backdrop-blur-md flex flex-col justify-between h-full space-y-6 shadow-sm"
          >
            <div className="space-y-4">
              <span className="text-cyan-600 block font-mono text-[10px] tracking-widest font-bold">{"// TECHNICAL BIOGRAPHY"}</span>
              <p className="text-slate-800 text-sm sm:text-base leading-relaxed font-sans">
                {about.biography || "I am a motivated Computer Science & Engineering graduate from Daffodil International University with hands-on experience in Machine Learning, AI, Full-Stack Web Development, and AI-powered content creation."}
              </p>
              <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">
                {about.summary || "I have experience building ML models, web-based prediction systems, MERN stack applications, and educational AI content. Dedicated to designing secure, low-latency architectures with deep-learning classifiers."}
              </p>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-100 text-left">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-cyan-500/10 text-cyan-600 border border-cyan-250 border-cyan-100">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-slate-400 text-[9px] block font-mono font-bold">LOCATION</span>
                  <span className="text-slate-800 text-xs sm:text-sm font-bold">{about.location || "Bangladesh"}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-600 border border-indigo-100">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-slate-400 text-[9px] block font-mono font-bold">GRADUATED</span>
                  <span className="text-slate-800 text-xs sm:text-sm font-bold">May 2026</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Education timeline cards (B.Sc. DIU highlight) */}
          <div className="lg:col-span-5 space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/70 border border-slate-200 p-6 rounded-2xl backdrop-blur-md shadow-sm"
            >
              <div className="flex items-center gap-3 mb-6">
                <GraduationCap className="w-6 h-6 text-cyan-600" />
                <h4 className="text-lg font-display font-black text-slate-900 uppercase tracking-tight">Education Background</h4>
              </div>

              {educationList && educationList.length > 0 ? (
                <div className="space-y-6">
                  {educationList.map((edu) => (
                    <div key={edu.id} className="relative pl-6 border-l-[2px] border-cyan-500/20 text-left">
                      {/* Timeline dot */}
                      <span className="absolute top-1.5 -left-[6px] w-2.5 h-2.5 rounded-full bg-cyan-500 border-2 border-white inline-block shadow-xs" />
                      <span className="text-cyan-600 text-[10px] block font-mono font-bold tracking-wider mb-1">{edu.duration || "2022 - 2026"}</span>
                      <h5 className="text-sm sm:text-base font-bold text-slate-800 tracking-tight">{edu.degree}</h5>
                      <span className="text-slate-600 text-xs block font-medium mt-0.5">{edu.school}</span>
                      
                      {edu.cgpa && (
                        <div className="mt-2 text-xs text-cyan-705 text-cyan-700 font-bold inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-200/50 shadow-2xs">
                          <Award className="w-3.5 h-3.5" />
                          CGPA: {edu.cgpa}
                        </div>
                      )}

                      {edu.coursework && edu.coursework.length > 0 && (
                        <div className="mt-3.5">
                          <span className="text-[9px] text-slate-400 block font-mono uppercase tracking-widest font-bold mb-1.5">// Relevant Modules</span>
                          <div className="flex flex-wrap gap-1.5">
                            {edu.coursework.map((course, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-0.5 rounded text-[9px] bg-slate-100 text-slate-600 border border-slate-200/60 font-mono font-bold"
                              >
                                {course}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-450 text-xs font-mono">No education details recorded.</p>
              )}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
