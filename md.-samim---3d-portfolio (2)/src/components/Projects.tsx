import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Github, ExternalLink, Info, Search, X } from 'lucide-react';
import { Project } from '../types';

interface ProjectsProps {
  projects: Project[];
}

export default function ProjectsSection({ projects }: ProjectsProps) {
  const [filter, setFilter] = useState<string>('all');
  const [search, setSearch] = useState<string>('');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Derive list of all unique categories inside all projects
  const uniqueCategories = Array.from(
    new Set(projects.map(p => p.category || 'Full-Stack Development'))
  );

  const filteredProjects = projects.filter(p => {
    const projCategory = p.category || 'Full-Stack Development';
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || 
                          p.description.toLowerCase().includes(search.toLowerCase()) ||
                          p.techStack.some(t => t.toLowerCase().includes(search.toLowerCase())) ||
                          projCategory.toLowerCase().includes(search.toLowerCase());
    
    if (filter === 'all') return matchesSearch;
    return matchesSearch && projCategory === filter;
  });

  return (
    <section id="projects" className="py-24 px-4 bg-slate-50/50 backdrop-blur-md border-t border-slate-200/60 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[11px] font-mono tracking-[0.25em] text-cyan-600 uppercase mb-3 block animate-pulse"
          >
            [ SHOWCASE ]
          </motion.span>
          <motion.h3
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-display font-black tracking-tighter uppercase text-slate-900 leading-none"
          >
            My <span className="text-outline">Projects</span>
          </motion.h3>
        </div>

        {/* Filters and Search Bar Row */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-12">
          {/* Categorized Selector */}
          <div className="flex flex-wrap items-center gap-2 overflow-x-auto pb-2 w-full md:w-auto scrollbar-none justify-start">
            <span className="text-slate-400 font-mono text-[9px] uppercase tracking-wider font-bold whitespace-nowrap mr-1">[ CLASSIFICATIONS ]</span>
            <button
              onClick={() => setFilter('all')}
              className={`px-3.5 py-1.5 text-[9px] font-mono rounded-full font-bold uppercase border transition-all cursor-pointer ${
                filter === 'all'
                  ? 'bg-cyan-500/5 border-cyan-300 text-cyan-750'
                  : 'bg-white border-slate-200 text-slate-500 hover:text-slate-850 hover:bg-slate-50'
              }`}
            >
              ALL CLASSIFICATIONS
            </button>
            {uniqueCategories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setFilter(cat)}
                className={`px-3.5 py-1.5 text-[9px] font-mono rounded-full font-bold uppercase border transition-all cursor-pointer ${
                  filter === cat
                    ? 'bg-cyan-500/5 border-cyan-300 text-cyan-750'
                    : 'bg-white border-slate-200 text-slate-500 hover:text-slate-850 hover:bg-slate-50'
                }`}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Search box */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              placeholder="SEARCH STEPS, PROJECTS..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white border border-slate-250 border-slate-200 rounded-full py-2.5 pl-9 pr-4 text-xs font-mono uppercase tracking-wider text-slate-800 placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors shadow-2xs"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-3.5" />
          </div>
        </div>

        {/* Projects Grid with Framer Motion Layout animations */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((p) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.35 }}
                key={p.id}
                id={`project-card-${p.id}`}
                className="group bg-white/70 border border-slate-200 hover:border-cyan-500/30 hover:bg-white rounded-2xl overflow-hidden backdrop-blur-md relative transition-all duration-500 flex flex-col h-full shadow-xs hover:shadow-md"
              >
                {/* Product Thumbnail Banner */}
                <div className="relative h-48 sm:h-56 overflow-hidden bg-slate-100">
                  <img
                    src={p.image || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=500&auto=format&fit=crop"}
                    alt={p.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-102 transition-all duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-transparent" />
                  
                  {/* Category overlay tab */}
                  <span className="absolute bottom-3.5 left-3.5 bg-white/95 backdrop-blur-md border border-slate-200 text-cyan-600 font-mono text-[9px] font-bold tracking-wider px-2.5 py-1 rounded uppercase shadow-2xs">
                    {p.category || 'Full-Stack Development'}
                  </span>

                  {/* Featured ribbon in corner */}
                  {p.featured && (
                    <span className="absolute top-3.5 left-3.5 bg-cyan-600 text-white font-mono text-[9px] font-black px-2.5 py-1 rounded uppercase tracking-wider shadow-sm">
                      Featured
                    </span>
                  )}
                </div>

                {/* Body Content */}
                <div className="p-6 flex flex-col justify-between flex-grow text-left">
                  <div className="space-y-3">
                    <h4 className="text-base sm:text-lg font-display font-black text-slate-900 group-hover:text-cyan-650 group-hover:text-cyan-600 uppercase tracking-tight transition-colors">
                      {p.name}
                    </h4>
                    <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-sans line-clamp-3">
                      {p.description}
                    </p>

                    {/* Tech badging */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {p.techStack && p.techStack.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 text-[9px] font-mono rounded bg-slate-50 border border-slate-200 text-slate-600 font-bold"
                        >
                          {tech.toUpperCase()}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions Panel */}
                  <div className="flex items-center gap-2 mt-6 pt-4 border-t border-slate-100 justify-between">
                    <div className="flex items-center gap-1.5">
                      {p.githubLink && (
                        <a
                          href={p.githubLink}
                          target="_blank"
                          referrerPolicy="no-referrer"
                          className="p-2 text-slate-450 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                          title="View Repository Code"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                      {p.liveLink && (
                        <a
                          href={p.liveLink}
                          target="_blank"
                          referrerPolicy="no-referrer"
                          className="p-2 text-slate-450 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                          title="View Live Site Demo"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>

                    <button
                      id={`project-btn-details-${p.id}`}
                      onClick={() => setSelectedProject(p)}
                      className="flex items-center gap-1 text-cyan-600 hover:text-cyan-700 text-xs font-mono font-bold uppercase tracking-wider cursor-pointer font-black"
                    >
                      <Info className="w-3.5 h-3.5" />
                      Details
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <p className="text-slate-400 font-medium text-xs mt-12 font-mono">{"// No projects matched your search filters."}</p>
        )}

      </div>

      {/* Details Dialog Modals layout */}
      <AnimatePresence>
        {selectedProject && (
          <div
            id="project-details-overlay"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setSelectedProject(null);
              }
            }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white border border-slate-200 rounded-2xl w-full max-w-2xl overflow-hidden flex flex-col shadow-2xl relative cursor-default"
            >
              {/* Highly Prominent Contrast Red Close 'X' Button - STAYS SECURE AND CLEAR */}
              <button
                id="close-project-details"
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2.5 rounded-full bg-rose-600 hover:bg-rose-500 text-white border-2 border-white shadow-xl cursor-pointer z-[210] transition-all duration-200 hover:scale-110 active:scale-95 flex items-center justify-center animate-bounce-short"
                title="Close Project Details"
              >
                <X className="w-5 h-5 text-white stroke-[3px]" />
              </button>

              {/* Large Image */}
              <div className="h-56 sm:h-64 relative bg-slate-100">
                <img
                  src={selectedProject.image || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=700&auto=format&fit=crop"}
                  alt={selectedProject.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent" />
                
                {/* Category tag on image inside modal too */}
                <span className="absolute bottom-4 left-4 bg-cyan-600 text-white font-mono text-[9px] font-black tracking-widest px-3 py-1.5 rounded uppercase shadow-sm">
                  {selectedProject.category || 'Full-Stack Development'}
                </span>
              </div>

              {/* Text Area */}
              <div className="p-6 text-left max-h-[50vh] overflow-y-auto">
                <h4 className="text-lg sm:text-xl font-display font-black text-slate-900 uppercase tracking-tight mb-3">
                  {selectedProject.name}
                </h4>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6 font-sans">
                  {selectedProject.description}
                </p>

                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] text-slate-400 font-mono block uppercase tracking-widest font-bold mb-2">// Technologies Employed:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedProject.techStack && selectedProject.techStack.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 text-[9px] rounded bg-slate-50 border border-slate-200 text-slate-600 font-mono tracking-wider font-bold"
                        >
                          {tech.toUpperCase()}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* External links footer with dedicated CLOSE return handler */}
                <div className="flex flex-wrap border-t border-slate-100 gap-3 pt-6 mt-8">
                  {selectedProject.githubLink && (
                    <a
                      href={selectedProject.githubLink}
                      target="_blank"
                      referrerPolicy="no-referrer"
                      className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200/80 border border-slate-200 text-slate-800 font-display font-bold text-[11px] uppercase tracking-wider rounded-xl active:scale-95 transition-all text-center cursor-pointer flex-1 sm:flex-none"
                    >
                      View On GitHub
                    </a>
                  )}
                  {selectedProject.liveLink && (
                    <a
                      href={selectedProject.liveLink}
                      target="_blank"
                      referrerPolicy="no-referrer"
                      className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white font-display font-bold text-[11px] uppercase tracking-wider rounded-xl active:scale-95 transition-all text-center cursor-pointer flex-1 sm:flex-none shadow-xs"
                    >
                      Live Demo Website
                    </a>
                  )}
                  
                  {/* Bottom Text Close Action Button */}
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="px-5 py-2.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-500 hover:text-slate-800 font-display font-bold text-[11px] uppercase tracking-wider rounded-xl active:scale-95 transition-all text-center cursor-pointer flex-1 sm:flex-none sm:ml-auto"
                  >
                    Close & Return
                  </button>
                </div>

              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
