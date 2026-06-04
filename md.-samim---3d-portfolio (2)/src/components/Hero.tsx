import { motion } from 'motion/react';
import { Github, Linkedin, Mail, Phone, BrainCircuit, Terminal } from 'lucide-react';
import { Profile, Research, Experience } from '../types';

interface HeroProps {
  profile: Profile;
  onDownloadCv: () => void;
  latestResearch?: Research | null;
  latestExperience?: Experience | null;
}

export default function Hero({ profile, onDownloadCv, latestResearch, latestExperience }: HeroProps) {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-32 pb-24 px-4 overflow-hidden bg-transparent"
    >
      <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        
        {/* Left Column Text Content */}
        <div className="lg:col-span-6 flex flex-col justify-center space-y-8 text-left">
          
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-700 text-xs font-mono font-bold tracking-wider w-fit"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-550 bg-cyan-600 animate-pulse" />
            [ PORTFOLIO_V2.0_INIT ]
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4"
          >
            {profile.name ? (
              <h1 id="hero-title" className="text-6xl sm:text-7xl lg:text-8xl font-display font-black leading-[0.85] tracking-tighter text-slate-900">
                {profile.name.split(' ')[0]?.toUpperCase() || "SAMIM"} <br/>
                <span className="text-outline uppercase opacity-40">
                  {profile.name.split(' ').slice(1).join(' ')?.toUpperCase() || "SHAMIM"}
                </span>
              </h1>
            ) : (
              <h1 id="hero-title" className="text-6xl sm:text-7xl lg:text-8xl font-display font-black leading-[0.85] tracking-tighter text-slate-900">
                SAMIM <br/>
                <span className="text-outline uppercase opacity-40">SHAMIM</span>
              </h1>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-5"
          >
            <h2 className="text-lg sm:text-xl font-display font-bold text-slate-800 leading-relaxed max-w-xl border-l-[3px] border-cyan-500 pl-4 uppercase tracking-wide">
              {profile.title || "Computer Science Graduate & Machine Learning Developer"}
            </h2>
            
            <p className="text-sm sm:text-base text-slate-500 leading-relaxed max-w-lg font-sans">
              {profile.intro || "Specializing in Machine Learning, AI content automation, and high-performance Full-Stack development."}
            </p>

            <div className="flex flex-wrap gap-2 pt-1">
              <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/25 text-cyan-700 text-[10px] font-mono tracking-widest rounded-sm font-semibold uppercase">ML RESEARCH</span>
              <span className="px-3 py-1 bg-indigo-500/10 border border-indigo-500/25 text-indigo-700 text-[10px] font-mono tracking-widest rounded-sm font-semibold uppercase">MERN STACK</span>
              <span className="px-3 py-1 bg-purple-500/10 border border-purple-500/25 text-purple-750 text-purple-700 text-[10px] font-mono tracking-widest rounded-sm font-semibold uppercase">AI AGENTS</span>
            </div>
          </motion.div>

          {/* Social Icons Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center gap-3.5 text-slate-400"
          >
            {profile.github && (
              <a
                href={profile.github}
                target="_blank"
                referrerPolicy="no-referrer"
                className="p-3 rounded-full bg-white border border-slate-200 text-slate-455 text-slate-500 hover:border-cyan-500 hover:text-cyan-600 hover:bg-cyan-50 hover:shadow-xs active:scale-95 transition-all cursor-pointer"
                title="GitHub"
              >
                <Github className="w-4.5 h-4.5" />
              </a>
            )}
            {profile.linkedin && (
              <a
                href={profile.linkedin}
                target="_blank"
                referrerPolicy="no-referrer"
                className="p-3 rounded-full bg-white border border-slate-200 text-slate-500 hover:border-cyan-500 hover:text-cyan-600 hover:bg-cyan-50 hover:shadow-xs active:scale-95 transition-all cursor-pointer"
                title="LinkedIn"
              >
                <Linkedin className="w-4.5 h-4.5" />
              </a>
            )}
            {profile.email && (
              <a
                href={`mailto:${profile.email}`}
                className="p-3 rounded-full bg-white border border-slate-200 text-slate-500 hover:border-cyan-500 hover:text-cyan-600 hover:bg-cyan-50 hover:shadow-xs active:scale-95 transition-all cursor-pointer"
                title="Mail"
              >
                <Mail className="w-4.5 h-4.5" />
              </a>
            )}
            {profile.phone && (
              <a
                href={`tel:${profile.phone}`}
                className="p-3 rounded-full bg-white border border-slate-200 text-slate-500 hover:border-cyan-500 hover:text-cyan-600 hover:bg-cyan-50 hover:shadow-xs active:scale-95 transition-all cursor-pointer"
                title="Phone"
              >
                <Phone className="w-4.5 h-4.5" />
              </a>
            )}
          </motion.div>

          {/* Action Anchors */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap gap-4 pt-4"
          >
            <button
              id="hero-btn-view-projects"
              onClick={() => scrollToSection('projects')}
              className="px-8 py-4 bg-slate-900 border border-slate-900 text-white font-display font-black text-xs tracking-widest uppercase hover:scale-105 hover:bg-slate-850 active:scale-95 transition-all cursor-pointer duration-300 rounded-xl shadow-lg shadow-slate-950/10"
            >
              EXPLORE PROJECTS
            </button>
            <button
              id="hero-btn-contact-me"
              onClick={() => scrollToSection('contact')}
              className="px-8 py-4 bg-white border border-slate-200 text-slate-700 font-display font-bold text-xs tracking-widest uppercase hover:bg-slate-50 hover:border-cyan-500 hover:text-cyan-600 active:scale-95 transition-all cursor-pointer duration-300 rounded-xl shadow-xs"
            >
              GET IN TOUCH
            </button>
          </motion.div>
        </div>

        {/* Right Column: Interactive 3D Mockup simulation of dashboard widgets */}
        <div className="lg:col-span-6 h-[550px] relative mt-12 lg:mt-0 select-none hidden sm:block">
          
          {/* Decorative Circles in BG */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[480px] h-[480px] border border-slate-200/60 rounded-full z-0 pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] border border-slate-200/50 rounded-full border-dashed z-0 opacity-40 pointer-events-none" />

          {/* Widget 0: Elegant Profile & Cover Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -20, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotate: -1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="absolute top-[-35px] left-[-25px] w-[350px] bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden z-25 hover:rotate-0 hover:scale-103 transition-all duration-300 text-left"
          >
            {/* Banner Photo */}
            <div className="h-28 w-full bg-slate-100 relative overflow-hidden">
              <img 
                src={profile.bannerPhoto || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop"} 
                alt="Profile Banner"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover animate-fade-in"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop";
                }}
              />
            </div>
            
            {/* Profile Photo */}
            <div className="px-6 pb-5 relative">
              <div className="absolute top-[-32px] left-6 w-16 h-16 rounded-full border-2 border-white p-0.5 bg-white shadow-md overflow-hidden">
                <img 
                  src={profile.profilePhoto || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=500"} 
                  alt="Avatar"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-full animate-fade-in"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=500";
                  }}
                />
              </div>
              
              <div className="pt-10">
                <h4 className="text-sm font-display font-black text-slate-900 uppercase tracking-tight">{profile.name}</h4>
                <p className="text-[10px] font-mono text-cyan-600 uppercase font-bold mt-0.5">{profile.title}</p>
                <div className="flex gap-1.5 mt-3">
                  <span className="text-[9px] font-mono font-bold bg-slate-50 border border-slate-100 py-0.5 px-2 rounded-md text-slate-500 uppercase">ACTIVE CMS STATUS</span>
                  <span className="text-[9px] font-mono font-bold bg-emerald-50 border border-emerald-100 py-0.5 px-2 rounded-md text-emerald-600 uppercase">● ONLINE</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Widget 1: Research Paper Card */}
          <motion.div
            initial={{ opacity: 0, x: 40, rotate: 6 }}
            animate={{ opacity: 1, x: 0, rotate: 3 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="absolute top-2 right-4 w-[360px] bg-white border border-slate-200 p-6 rounded-2xl shadow-xl hover:rotate-0 hover:scale-105 transition-all duration-300 z-30 cursor-default group text-left"
          >
            <div className="flex justify-between items-start mb-3">
              <span className="text-[10px] font-mono text-cyan-600 font-bold tracking-widest flex items-center gap-1">
                <BrainCircuit className="w-3 h-3 text-cyan-600" />
                SYS_THESIS_RESEARCH_01
              </span>
              <div className="w-2 h-2 rounded-full bg-cyan-500 animate-ping" />
            </div>
            
            <h3 className="text-md font-display font-black mb-2 text-slate-900 line-clamp-1 group-hover:text-cyan-600 transition-colors uppercase leading-snug">
              {latestResearch?.title || "Social Media Influence Prediction"}
            </h3>
            
            <p className="text-[11px] text-slate-500 font-sans leading-relaxed mb-4 line-clamp-3">
              {latestResearch?.description || "Machine learning analysis of youth opinion changes in Bangladesh using Random Forest & XGBoost. Accuracy: 84.4%."}
            </p>
            
            <div className="flex items-center gap-2">
              <div className="h-1 flex-1 bg-cyan-100 rounded-full overflow-hidden">
                <div className="h-full w-[84%] bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full" />
              </div>
              <span className="text-[10px] font-mono text-cyan-600 font-bold">84.4% ACC</span>
            </div>
          </motion.div>

          {/* Widget 2: Tech Grid */}
          <motion.div
            initial={{ opacity: 0, x: -30, rotate: -4 }}
            animate={{ opacity: 1, x: 0, rotate: -2 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="absolute top-44 left-4 w-[325px] bg-white/95 border border-slate-200 p-6 rounded-2xl shadow-xl hover:rotate-0 hover:scale-105 transition-all duration-300 z-20 cursor-default text-left"
          >
            <h4 className="text-[10px] uppercase font-mono tracking-widest text-slate-500 mb-4 flex items-center gap-1.5 font-bold">
              <Terminal className="w-3.5 h-3.5 text-indigo-500" />
              [ CORE_CAPABILITIES ]
            </h4>
            <div className="grid grid-cols-4 gap-2.5">
              {["PY", "JS", "TS", "C++", "RT", "NX", "ND", "MG"].map((tech, i) => (
                <div
                  key={i}
                  className="h-11 w-11 bg-slate-50 rounded-lg flex items-center justify-center border border-slate-200 text-xs font-bold font-mono text-slate-700 hover:bg-cyan-50 hover:border-cyan-400 hover:text-cyan-600 transition-all duration-200"
                >
                  {tech}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Widget 3: Live Experience Snip */}
          <motion.div
            initial={{ opacity: 0, y: 40, rotate: 2 }}
            animate={{ opacity: 1, y: 0, rotate: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="absolute bottom-6 right-8 w-[300px] bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 p-6 rounded-2xl shadow-2xl hover:rotate-0 hover:scale-105 transition-all duration-300 z-40 cursor-default text-left"
          >
            <div className="flex items-center gap-3.5 mb-3.5">
              <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center font-display font-black text-white text-md shadow-inner">
                {latestExperience?.company ? latestExperience.company[0].toUpperCase() : "A"}
              </div>
              <div>
                <p className="text-xs font-display font-black leading-none text-white uppercase tracking-wider">
                  {latestExperience?.company?.toUpperCase() || "ALGORIZIN"}
                </p>
                <p className="text-[10px] font-mono text-cyan-300 uppercase mt-1 font-bold">
                  {latestExperience?.role || "AI Content Intern"}
                </p>
              </div>
            </div>
            <p className="text-[11px] italic text-indigo-50 leading-relaxed font-sans opacity-95 line-clamp-2">
              "{latestExperience?.bulletPoints?.[0] || 'Automating educational workflows using Gemini & Claude-3.5 Sonnet.'}"
            </p>
          </motion.div>

        </div>

        {/* Fallback Tablet/Mobile Profile picture & Banner card */}
        <div className="lg:col-span-12 flex flex-col items-center sm:hidden mt-12 w-full px-4 animate-fade-in">
          <div className="w-full max-w-sm bg-white border border-slate-200 rounded-2xl shadow-md overflow-hidden text-left">
            <div className="h-28 w-full bg-slate-100 relative overflow-hidden">
              <img 
                src={profile.bannerPhoto || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop"} 
                alt="Profile Banner"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover animate-fade-in"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop";
                }}
              />
            </div>
            <div className="px-5 pb-5 relative">
              <div className="absolute top-[-24px] left-5 w-14 h-14 rounded-full border-2 border-white bg-white overflow-hidden shadow-sm">
                <img 
                  src={profile.profilePhoto || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=500"} 
                  alt="Avatar"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-full animate-fade-in"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=500";
                  }}
                />
              </div>
              <div className="pt-10">
                <h4 className="text-sm font-display font-black text-slate-900 uppercase tracking-tight">{profile.name}</h4>
                <p className="text-[10px] font-mono text-cyan-600 uppercase font-bold mt-0.5">{profile.title}</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
