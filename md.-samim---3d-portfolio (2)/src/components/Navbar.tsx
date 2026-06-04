import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { getCv } from '../lib/db';

interface NavbarProps {
  siteName: string;
  logoText: string;
  isAdminLoggedIn: boolean;
  onAdminClick: () => void;
  activeSection: string;
  setActiveSection: (sec: string) => void;
}

export default function Navbar({
  siteName,
  logoText,
  isAdminLoggedIn,
  onAdminClick,
  activeSection,
  setActiveSection
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [hasCv, setHasCv] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    // Initial check of CV status
    getCv().then(cv => {
      setHasCv(!!cv);
    });

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isAdminLoggedIn]);

  const navLinks = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Skills', id: 'skills' },
    { label: 'Projects', id: 'projects' },
    { label: 'Research', id: 'research' },
    { label: 'Experience', id: 'experience' },
    { label: 'Services', id: 'services' },
    { label: 'Courses', id: 'courses' },
    { label: 'Contact', id: 'contact' },
  ];

  const handleDownloadCv = async () => {
    try {
      setDownloading(true);
      const cvFile = await getCv();
      if (cvFile && cvFile.fileData) {
        const link = document.createElement('a');
        link.id = 'download-cv-anchor';
        link.href = cvFile.fileData.startsWith('data:') ? cvFile.fileData : `data:application/pdf;base64,${cvFile.fileData}`;
        link.download = cvFile.fileName || 'Md_Samim_CSE_CV.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        alert("The dynamic CV has not been uploaded by the admin yet! Please enter 'Admin Panel' to upload a PDF resume, or download standard seed CV template.");
        window.print();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setDownloading(false);
    }
  };

  const handleLinkClick = (id: string) => {
    setActiveSection(id);
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav
      id="main-navigation"
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-xl border-b border-slate-200/65 py-3 shadow-md shadow-slate-200/5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          
          {/* Brand Logo */}
          <div className="flex-shrink-0 cursor-pointer animate-fade-in" onClick={() => handleLinkClick('home')}>
            <span className="text-xl font-display font-black tracking-tighter bg-gradient-to-r from-cyan-600 to-indigo-600 bg-clip-text text-transparent">
              {logoText?.toUpperCase() || "MD. SAMIM"}
            </span>
          </div>

          {/* Desktop Navigation Link buttons */}
          <div className="hidden xl:flex items-center gap-1 xl:gap-1.5 animate-fade-in">
            {navLinks.map((link) => (
              <button
                key={link.id}
                id={`nav-link-${link.id}`}
                onClick={() => handleLinkClick(link.id)}
                className={`px-2 xl:px-3 py-1.5 rounded-full text-[9.5px] xl:text-[10.5px] uppercase tracking-wider font-bold transition-all duration-200 cursor-pointer focus:outline-none focus:ring-0 whitespace-nowrap ${
                  activeSection === link.id
                    ? 'text-cyan-700 bg-cyan-500/10 border border-cyan-200/50 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-transparent'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Desktop Utilities */}
          <div className="hidden xl:flex items-center space-x-3">
            <button
              id="nav-btn-download-cv"
              onClick={handleDownloadCv}
              disabled={downloading}
              className="px-5 py-2.5 bg-slate-100 border border-slate-200 rounded-full text-[11px] uppercase tracking-wider text-slate-700 font-bold hover:bg-slate-200/80 transition-colors active:scale-95 disabled:opacity-50 cursor-pointer focus:outline-none"
            >
              {downloading ? "Downloading..." : "Download CV"}
            </button>

            <button
              id="nav-btn-admin-panel"
              onClick={onAdminClick}
              className={`px-5 py-2.5 font-bold rounded-full text-[11px] uppercase tracking-wider transition-all duration-300 active:scale-95 cursor-pointer focus:outline-none ${
                isAdminLoggedIn
                  ? 'bg-indigo-600 text-white hover:bg-indigo-550 shadow-md shadow-indigo-100'
                  : 'bg-cyan-600 text-white hover:bg-cyan-550 shadow-md shadow-cyan-100'
              }`}
            >
              {isAdminLoggedIn ? "Admin Dashboard" : "Admin Panel"}
            </button>
          </div>

          {/* Mobile hamburger toggle button */}
          <div className="flex xl:hidden items-center space-x-2">
            <button
              id="mobile-nav-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-500 hover:text-slate-800 hover:bg-slate-100 focus:outline-none cursor-pointer"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Actions Drawer menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-nav-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="xl:hidden bg-white border-b border-slate-200 overflow-hidden"
          >
            <div className="px-2 pt-2 pb-6 space-y-1 sm:px-3 text-left">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  id={`mobile-link-${link.id}`}
                  onClick={() => handleLinkClick(link.id)}
                  className={`block w-full text-left px-4 py-3 rounded-lg text-xs uppercase tracking-[0.15em] font-bold focus:outline-none ${
                    activeSection === link.id
                      ? 'text-cyan-600 bg-cyan-500/5 font-bold border-l-2 border-cyan-500'
                      : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <div className="pt-4 pb-2 border-t border-slate-150 flex flex-col gap-2 px-3">
                <button
                  id="mobile-btn-download-cv"
                  onClick={handleDownloadCv}
                  className="w-full py-3 bg-slate-100 border border-slate-200 rounded-full text-xs font-bold uppercase tracking-wider text-slate-700 hover:bg-slate-200 transition-all active:scale-95 focus:outline-none"
                >
                  Download CV
                </button>
                <button
                  id="mobile-btn-admin-portal"
                  onClick={() => {
                    setIsOpen(false);
                    onAdminClick();
                  }}
                  className="w-full py-3 bg-cyan-600 text-white text-xs font-black rounded-full uppercase tracking-wider active:scale-95 transition-all text-center focus:outline-none"
                >
                  {isAdminLoggedIn ? "Admin Dashboard" : "Admin Panel"}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
