import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cpu, Layout, Terminal, Database, Brain, Wrench, Sparkles } from 'lucide-react';
import { Skill, SkillCategory } from '../types';

interface SkillsProps {
  skills: Skill[];
  categories: SkillCategory[];
}

export default function SkillsSection({ skills, categories }: SkillsProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Map category IDs to associated visual icons for UI enrichment
  const getCategoryIcon = (catId: string) => {
    switch (catId) {
      case 'lang': return <Terminal className="w-4.5 h-4.5" />;
      case 'front': return <Layout className="w-4.5 h-4.5" />;
      case 'back': return <Cpu className="w-4.5 h-4.5" />;
      case 'db': return <Database className="w-4.5 h-4.5" />;
      case 'ml': return <Brain className="w-4.5 h-4.5" />;
      case 'tools': return <Wrench className="w-4.5 h-4.5" />;
      case 'ai': return <Sparkles className="w-4.5 h-4.5" />;
      default: return <Cpu className="w-4.5 h-4.5" />;
    }
  };

  return (
    <section id="skills" className="py-24 px-4 bg-white/60 backdrop-blur-md border-t border-slate-200/60 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[11px] font-mono tracking-[0.25em] text-cyan-600 uppercase mb-3 block animate-pulse"
          >
            [ CAPABILITIES ]
          </motion.span>
          <motion.h3
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-display font-black tracking-tighter uppercase text-slate-900 leading-none"
          >
            Technical <span className="text-outline">Skillset</span>
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 text-xs sm:text-sm mt-5 max-w-xl mx-auto font-sans"
          >
            Expertise built over academic modules, full-stack programming, machine learning model building, and prompt engineering.
          </motion.p>
        </div>

        {/* Tab Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-14">
          <button
            id="skill-cat-all"
            onClick={() => setActiveCategory('all')}
            className={`flex items-center gap-1.5 px-5 py-2.5 text-[10px] uppercase font-mono tracking-widest rounded-full border transition-all cursor-pointer font-bold ${
              activeCategory === 'all'
                ? 'bg-cyan-50 border-cyan-300 text-cyan-700 font-bold shadow-xs'
                : 'bg-white border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50'
            }`}
          >
            All Areas
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              id={`skill-cat-${cat.id}`}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-1.5 px-5 py-2.5 text-[10px] uppercase font-mono tracking-widest rounded-full border transition-all cursor-pointer font-bold ${
                activeCategory === cat.id
                  ? 'bg-cyan-50 border-cyan-300 text-cyan-700 font-bold shadow-xs'
                  : 'bg-white border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-50'
              }`}
            >
              {getCategoryIcon(cat.id)}
              {cat.name}
            </button>
          ))}
        </div>

        {/* Organized Categorized Skills Columns */}
        <div className="space-y-10">
          <AnimatePresence mode="popLayout">
            {categories
              .filter(cat => activeCategory === 'all' || activeCategory === cat.id)
              .map((cat) => {
                const catSkills = skills.filter((sk) => sk.category === cat.id);
                if (catSkills.length === 0) return null;
                return (
                  <motion.div
                    key={cat.id}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    viewport={{ once: true }}
                    className="bg-white/70 border border-slate-200/80 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-sm text-left"
                  >
                    {/* Category Header */}
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-105 border-slate-100">
                      <div className="p-2.5 bg-cyan-500/10 rounded-xl text-cyan-600">
                        {getCategoryIcon(cat.id)}
                      </div>
                      <div>
                        <h4 className="text-base font-display font-black text-slate-900 uppercase tracking-wider">
                          {cat.name}
                        </h4>
                        <span className="text-slate-500 text-[10px] uppercase font-mono font-bold">
                          {catSkills.length} {catSkills.length === 1 ? 'skill' : 'skills'} loaded
                        </span>
                      </div>
                    </div>

                    {/* Subskills Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                      {catSkills.map((sk) => (
                        <div
                          key={sk.id}
                          id={`skill-card-${sk.id}`}
                          className="p-4 bg-white/50 border border-slate-200/80 hover:border-cyan-500/40 hover:bg-white hover:shadow-xs rounded-xl flex items-center justify-between group transition-all duration-300 relative"
                        >
                          <span className="text-slate-700 text-xs sm:text-sm font-semibold tracking-tight group-hover:text-cyan-600 transition-colors">
                            {sk.name}
                          </span>
                          <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
          </AnimatePresence>
        </div>

        {skills.length === 0 && (
          <p className="text-slate-400 font-medium text-xs mt-12 font-mono">{"// No skills registered in this category."}</p>
        )}

      </div>
    </section>
  );
}
