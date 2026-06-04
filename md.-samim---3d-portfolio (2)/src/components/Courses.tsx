import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Library } from 'lucide-react';
import { Course } from '../types';

interface CoursesProps {
  courses: Course[];
}

export default function CoursesSection({ courses }: CoursesProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const uniqueCategories = Array.from(new Set(courses.map(c => c.category)));

  const filteredCourses = activeCategory === 'all'
    ? courses
    : courses.filter(c => c.category === activeCategory);

  return (
    <section id="courses" className="py-24 px-4 bg-cyan-50/15 backdrop-blur-md border-t border-slate-200/60 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[11px] font-mono tracking-[0.25em] text-cyan-600 uppercase mb-3 block animate-pulse"
          >
            [ EDUCATIONAL WORK ]
          </motion.span>
          <motion.h3
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-display font-black tracking-tighter uppercase text-slate-900 leading-none"
          >
            Authored <span className="text-outline">Courses</span>
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-505 text-slate-500 text-xs sm:text-sm mt-5 max-w-xl mx-auto font-sans"
          >
            Highly professional curriculum modules, prompt design bootcamps, and AI agent frameworks built to fast-track modern engineering.
          </motion.p>
        </div>

        {/* Categories filters */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-14">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-4 py-1.5 text-[9px] font-mono font-bold tracking-widest uppercase rounded-full border transition-all cursor-pointer ${
              activeCategory === 'all'
                ? 'bg-cyan-500/5 border-cyan-300 text-cyan-750 font-bold shadow-2xs'
                : 'bg-white border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50'
            }`}
          >
            ALL CLASSIFICATIONS
          </button>
          {uniqueCategories.map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 text-[9px] font-mono font-bold tracking-widest uppercase rounded-full border transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-cyan-500/5 border-cyan-300 text-cyan-750 font-bold shadow-2xs'
                  : 'bg-white border-slate-205 border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50'
              }`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Cards Grid with layout shifts */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left"
        >
          <AnimatePresence mode="popLayout">
            {filteredCourses.map((course) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                key={course.id}
                id={`course-card-${course.id}`}
                className="group bg-white/70 border border-slate-200 hover:border-cyan-500/35 hover:bg-white rounded-2xl overflow-hidden backdrop-blur-md relative transition-all duration-300 flex flex-col justify-between shadow-xs hover:shadow-md"
              >
                <div>
                  {/* Thumbnail Cover image */}
                  <div className="h-44 overflow-hidden relative bg-slate-100">
                    <img
                      src={course.thumbnail || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=400&auto=format&fit=crop"}
                      alt={course.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover grayscale opacity-80 group-hover:scale-102 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                    
                    {/* Category Overlay tag */}
                    <span className="absolute bottom-3.5 left-3.5 bg-white/90 backdrop-blur-md border border-slate-200 text-cyan-600 font-mono text-[9px] font-bold tracking-wider px-2.5 py-1 rounded uppercase shadow-2xs">
                      {course.category.toUpperCase()}
                    </span>
                  </div>

                  {/* Body textual Content */}
                  <div className="p-5 space-y-2">
                    <h4 className="text-sm sm:text-base font-display font-black uppercase tracking-tight text-slate-900 group-hover:text-cyan-600 transition-colors line-clamp-2 leading-tight">
                      {course.title}
                    </h4>
                    <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-sans line-clamp-3">
                      {course.description}
                    </p>
                  </div>
                </div>

                {/* Footer panel with course action redirection link */}
                <div className="px-5 pb-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-slate-450 font-mono text-[9px] uppercase font-bold tracking-wider">
                    <Library className="w-3.5 h-3.5 text-cyan-600" />
                    Syllabus Authored
                  </div>
                  {course.courseLink && (
                    <a
                      href={course.courseLink}
                      target="_blank"
                      referrerPolicy="no-referrer"
                      className="flex items-center gap-1 text-cyan-600 hover:text-cyan-705 text-[10px] font-mono font-bold uppercase tracking-wider cursor-pointer"
                    >
                      Class Link
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredCourses.length === 0 && (
          <p className="text-slate-400 font-bold text-xs mt-12 font-mono uppercase tracking-widest">[ NO AUTHORED CURRICULUMS REGISTERED ]</p>
        )}

      </div>
    </section>
  );
}
