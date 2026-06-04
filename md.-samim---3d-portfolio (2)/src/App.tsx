import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Award, GraduationCap, ExternalLink, RefreshCw, Layers } from 'lucide-react';

import { 
  Profile, 
  About, 
  Skill, 
  SkillCategory, 
  Project, 
  Research, 
  Experience, 
  Course, 
  Service, 
  Certification, 
  Education, 
  CvFile, 
  WebsiteSettings 
} from './types';

import {
  getProfile,
  getAbout,
  getSkills,
  getProjects,
  getResearch,
  getExperiences,
  getCourses,
  getServices,
  getCertifications,
  getEducations,
  getCv,
  getWebsiteSettings,
  seedFirestoreDatabaseIfNecessary
} from './lib/db';

// Import all custom compiled section view elements
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutSection from './components/About';
import SkillsSection from './components/Skills';
import ResearchSection from './components/Research';
import ProjectsSection from './components/Projects';
import ExperienceSection from './components/Experience';
import CoursesSection from './components/Courses';
import ServicesSection from './components/Services';
import ContactSection from './components/Contact';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import ThreeBackground from './components/ThreeBackground';

export default function App() {
  const [loading, setLoading] = useState(true);
  
  // Database States
  const [profile, setProfile] = useState<Profile | null>(null);
  const [about, setAbout] = useState<About | null>(null);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [categories, setCategories] = useState<SkillCategory[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [research, setResearch] = useState<Research | null>(null);
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [educations, setEducations] = useState<Education[]>([]);
  const [cvFile, setCvFile] = useState<CvFile | null>(null);
  const [settings, setSettings] = useState<WebsiteSettings | null>(null);

  // Authentication & Panel Controls
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('home');

  useEffect(() => {
    // Audit current admin login sessions
    const session = localStorage.getItem("samim_portfolio_admin_session");
    if (session) {
      setIsAdminLoggedIn(true);
    }
    loadAllPortfolioData();
  }, []);

  const loadAllPortfolioData = async () => {
    try {
      setLoading(true);
      await seedFirestoreDatabaseIfNecessary();
      const [
        prof, abt, sks, projs, 
        res, exps, crs, srvs, 
        certs, edus, cv, setts
      ] = await Promise.all([
        getProfile(),
        getAbout(),
        getSkills(),
        getProjects(),
        getResearch(),
        getExperiences(),
        getCourses(),
        getServices(),
        getCertifications(),
        getEducations(),
        getCv(),
        getWebsiteSettings()
      ]);

      setProfile(prof);
      setAbout(abt);
      setSkills(sks.skills);
      setCategories(sks.categories);
      setProjects(projs);
      setResearch(res);
      setExperiences(exps);
      setCourses(crs);
      setServices(srvs);
      setCertifications(certs);
      setEducations(edus);
      setCvFile(cv);
      setSettings(setts);
    } catch (e) {
      console.error("Data ingestion crashed: ", e);
    } finally {
      setLoading(false);
    }
  };

  const handleAdminToggle = () => {
    if (isAdminLoggedIn) {
      // Toggle the full Dashboard view canvas
      setIsAdminPanelOpen(prev => !prev);
    } else {
      // Show registration/login authentication form
      setShowLoginModal(true);
    }
  };

  const handleLoginSuccess = () => {
    setIsAdminLoggedIn(true);
    setShowLoginModal(false);
    setIsAdminPanelOpen(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("samim_portfolio_admin_session");
    setIsAdminLoggedIn(false);
    setIsAdminPanelOpen(false);
  };

  const handleDownloadCv = () => {
    if (cvFile && cvFile.fileData) {
      const link = document.createElement('a');
      link.href = cvFile.fileData;
      link.download = cvFile.fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.open('https://github.com/MdShamim5669', '_blank');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center text-slate-800 font-sans space-y-4">
        <RefreshCw className="w-8 h-8 text-cyan-600 animate-spin" />
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400">
          Syncing Portfolio Core Database...
        </span>
      </div>
    );
  }

  // Render Full Screen Administration Panel Dashboard Mode (if selected)
  if (isAdminLoggedIn && isAdminPanelOpen) {
    return (
      <div className="min-h-screen bg-slate-950 relative">
        {/* Nav Header Row */}
        <header className="bg-slate-900/80 border-b border-white/5 py-3 px-6 flex items-center justify-between backdrop-blur-md">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span className="text-xs font-mono font-bold text-slate-200">
              SECURED PORTFOLIO CMS CONTROLLER
            </span>
          </div>
          <button
            id="back-to-website"
            onClick={() => setIsAdminPanelOpen(false)}
            className="flex items-center gap-1 bg-emerald-500 text-slate-950 font-bold px-4 py-1.5 rounded-lg text-xs uppercase tracking-wider cursor-pointer font-sans transition-all active:scale-95"
          >
            Back to Live Site
          </button>
        </header>

        {/* Dashboard Frame */}
        <AdminDashboard 
          onLogout={handleLogout} 
          onRefreshPortfolio={loadAllPortfolioData} 
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-sans relative overflow-x-hidden selection:bg-cyan-500/10 selection:text-cyan-600">
      
      {/* 3D dynamic constellation matrix background */}
      <ThreeBackground />

      {/* Global Ambient Glows */}
      <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] bg-cyan-400/5 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute top-[40%] right-[-50px] w-[400px] h-[400px] bg-indigo-400/5 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[10%] left-[-100px] w-[400px] h-[400px] bg-purple-400/5 rounded-full blur-[135px] pointer-events-none z-0" />

      {/* 1. Header Navigation elements */}
      <Navbar 
        siteName={settings?.siteName || "Md. Samim"} 
        logoText={settings?.logoText || "Samim.Dev"} 
        isAdminLoggedIn={isAdminLoggedIn} 
        onAdminClick={handleAdminToggle} 
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* 2. Primary Showcase Section Bodies */}
      <main className="relative z-10">
        
        {/* Hero Segment */}
        {profile && (
          <Hero 
            profile={profile} 
            onDownloadCv={handleDownloadCv} 
            latestResearch={research}
            latestExperience={experiences[0]}
          />
        )}

        {/* About Segment */}
        {about && <AboutSection about={about} educationList={educations} />}

        {/* Skill Matrix */}
        <SkillsSection skills={skills} categories={categories} />

        {/* Thesis ML Research paper overview */}
        {research && <ResearchSection research={research} />}

        {/* Projects cards grid */}
        <ProjectsSection projects={projects} />

        {/* Professional career history timeline */}
        <ExperienceSection experiences={experiences} />

        {/* Authored educational curricula */}
        <CoursesSection courses={courses} />

        {/* Freelancing professional services */}
        <ServicesSection services={services} />

        {/* Certifications and credentials list view */}
        <section id="certifications" className="py-24 px-4 bg-transparent border-t border-slate-200/60 relative">
          <div className="max-w-7xl mx-auto">
            
            {/* Section heading */}
            <div className="text-center md:text-left mb-16">
              <span className="text-[11px] font-mono tracking-[0.25em] text-cyan-600 uppercase mb-3 block">[ COMPETENCiES ]</span>
              <h3 className="text-4xl sm:text-5xl font-display font-black tracking-tighter uppercase text-slate-900 leading-none">
                Certifications & <span className="text-outline">Accreditations</span>
              </h3>
            </div>

            {certifications && certifications.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-left">
                {certifications.map((cert) => (
                  <motion.div
                    key={cert.id}
                    id={`cert-node-${cert.id}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="p-6 bg-white/70 border border-slate-200 hover:border-cyan-500/35 hover:bg-white rounded-2xl flex flex-col justify-between h-full group transition-all backdrop-blur-md shadow-xs hover:shadow-md"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center gap-4">
                        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-cyan-600 group-hover:bg-cyan-500/10 group-hover:text-cyan-700 transition-colors">
                          <Award className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-900 tracking-tight leading-snug group-hover:text-cyan-600 transition-colors uppercase">{cert.title}</h4>
                          <span className="text-cyan-600 text-xs font-mono font-bold block mt-1 uppercase tracking-wide">{cert.issuer}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-100">
                      <span className="text-slate-400 text-[10px] font-mono block">ID_YEAR: {cert.year}</span>
                      {cert.link && (
                        <a
                          href={cert.link}
                          target="_blank"
                          referrerPolicy="no-referrer"
                          className="flex items-center gap-1.5 text-cyan-600 hover:text-cyan-750 text-[10px] font-bold uppercase tracking-wider cursor-pointer font-mono"
                        >
                          Verify Record
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-slate-500 text-xs font-mono">{"// No certification records currently stored."}</p>
            )}

          </div>
        </section>

        {/* Mail Contact form feedback submission */}
        {profile && <ContactSection profile={profile} />}

      </main>

      {/* 3. Footer branding credit lines */}
      <footer className="bg-slate-950 py-12 px-6 border-t border-slate-900 text-xs text-slate-400 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 flex items-center justify-center font-black text-xs font-display">
              S
            </div>
            <span className="font-bold tracking-tight text-white font-display text-sm">
              {settings?.logoText?.toUpperCase() || "SAMIM.DEV"}
            </span>
          </div>

          <p className="font-mono text-slate-400 tracking-wide text-center sm:text-right">
            {settings?.footerText || `© ${new Date().getFullYear()} Md. Samim. All rights reserved.`}
          </p>
        </div>
      </footer>

      {/* 4. Credentials Sign-In & Onboarding Modals */}
      <AnimatePresence>
        {showLoginModal && (
          <AdminLogin 
            onClose={() => setShowLoginModal(false)} 
            onLoginSuccess={handleLoginSuccess} 
          />
        )}
      </AnimatePresence>

    </div>
  );
}
