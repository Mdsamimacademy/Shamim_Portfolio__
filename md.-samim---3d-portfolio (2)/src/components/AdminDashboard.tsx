import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, 
  LayoutDashboard, 
  User, 
  Compass, 
  Cpu, 
  Briefcase, 
  FolderGit2, 
  GraduationCap, 
  BookOpen, 
  HeartHandshake, 
  Mail, 
  Files, 
  Settings, 
  LogOut, 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  CheckCircle,
  FileDown,
  Clock,
  X
} from 'lucide-react';
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
  ContactMessage, 
  CvFile, 
  WebsiteSettings 
} from '../types';
import {
  getProfile, saveProfile,
  getAbout, saveAbout,
  getSkills, saveAllSkills,
  getProjects, saveProject, deleteProject,
  getResearch, saveResearch,
  getExperiences, saveExperience, deleteExperience,
  getCourses, saveCourse, deleteCourse,
  getServices, saveService, deleteService,
  getCertifications, saveCertification, deleteCertification,
  getEducations, saveEducation, deleteEducation,
  getContactMessages, deleteContactMessage,
  getCv, saveCv,
  getWebsiteSettings, saveWebsiteSettings
} from '../lib/db';
import { compressImage } from '../utils/imageCompressor';

interface AdminDashboardProps {
  onLogout: () => void;
  onRefreshPortfolio: () => void;
}

export default function AdminDashboard({ onLogout, onRefreshPortfolio }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [toast, setToast] = useState<{ type: 'success' | 'err'; msg: string } | null>(null);

  // Database states
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
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [cvFile, setCvFile] = useState<CvFile | null>(null);
  const [settings, setSettings] = useState<WebsiteSettings | null>(null);

  // Form Editor Modal state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editorData, setEditorData] = useState<any>({});
  const [showModal, setShowModal] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  useEffect(() => {
    loadAllAdminData();
  }, [activeTab]);

  const loadAllAdminData = async () => {
    try {
      const [
        profRes, aboutRes, skillsRes, projRes, 
        resRes, expRes, courseRes, srvRes, 
        certRes, eduRes, msgRes, cvRes, setRes
      ] = await Promise.all([
        getProfile(), getAbout(), getSkills(), getProjects(),
        getResearch(), getExperiences(), getCourses(), getServices(),
        getCertifications(), getEducations(), getContactMessages(), getCv(), getWebsiteSettings()
      ]);

      setProfile(profRes);
      setAbout(aboutRes);
      setSkills(skillsRes.skills);
      setCategories(skillsRes.categories);
      setProjects(projRes);
      setResearch(resRes);
      setExperiences(expRes);
      setCourses(courseRes);
      setServices(srvRes);
      setCertifications(certRes);
      setEducations(eduRes);
      setMessages(msgRes);
      setCvFile(cvRes);
      setSettings(setRes);
    } catch (e) {
      console.error(e);
      showToast('err', "Failed to pull catalog documents.");
    }
  };

  const showToast = (type: 'success' | 'err', msg: string) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3000);
  };

  const handleEditorChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as any;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setEditorData((p: any) => ({ ...p, [name]: checked }));
    } else {
      setEditorData((p: any) => ({ ...p, [name]: value }));
    }
  };

  const openAddForm = () => {
    setEditingId(null);
    setEditorData({});
    setShowModal(true);
  };

  const openEditForm = (item: any) => {
    setEditingId(item.id);
    setEditorData(item);
    setShowModal(true);
  };

  const handleDeleteItem = (id: string) => {
    setDeleteConfirmId(id);
  };

  const confirmDeleteAction = async () => {
    if (!deleteConfirmId) return;
    const id = deleteConfirmId;
    setDeleteConfirmId(null);
    try {
      if (activeTab === 'projects') await deleteProject(id);
      if (activeTab === 'experience') await deleteExperience(id);
      if (activeTab === 'courses') await deleteCourse(id);
      if (activeTab === 'services') await deleteService(id);
      if (activeTab === 'certifications') await deleteCertification(id);
      if (activeTab === 'education') await deleteEducation(id);
      if (activeTab === 'messages') await deleteContactMessage(id);

      showToast('success', "Record wiped successfully.");
      loadAllAdminData();
      onRefreshPortfolio();
    } catch {
      showToast('err', "Deletion process crashed.");
    }
  };

  const handleSaveCollectionItem = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const finalId = editingId || `${activeTab}_${Date.now()}`;
      const toSave = { ...editorData, id: finalId };

      if (activeTab === 'projects') {
        const stackArr = typeof toSave.techStack === 'string' 
          ? toSave.techStack.split(',').map((t: string) => t.trim()) 
          : toSave.techStack || [];
        await saveProject({ 
          ...toSave, 
          techStack: stackArr,
          category: toSave.category || 'Full-Stack Development'
        });
      }

      if (activeTab === 'experience') {
        const bulletArr = typeof toSave.bulletPoints === 'string'
          ? toSave.bulletPoints.split('\n').map((t: string) => t.trim()).filter(Boolean)
          : toSave.bulletPoints || [];
        await saveExperience({ ...toSave, bulletPoints: bulletArr });
      }

      if (activeTab === 'courses') {
        await saveCourse(toSave);
      }

      if (activeTab === 'services') {
        await saveService(toSave);
      }

      if (activeTab === 'certifications') {
        await saveCertification(toSave);
      }

      if (activeTab === 'education') {
        const courseArr = typeof toSave.coursework === 'string'
          ? toSave.coursework.split(',').map((t: string) => t.trim())
          : toSave.coursework || [];
        await saveEducation({ ...toSave, coursework: courseArr });
      }

      showToast('success', "Record stored correctly.");
      setShowModal(false);
      loadAllAdminData();
      onRefreshPortfolio();
    } catch {
      showToast('err', "Failure recording collection item.");
    }
  };

  // Profile Save
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    try {
      await saveProfile(profile);
      showToast('success', "General Banner saved.");
      onRefreshPortfolio();
    } catch {
      showToast('err', "Save failed.");
    }
  };

  // Biography Save
  const handleSaveAbout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!about) return;
    try {
      await saveAbout(about);
      showToast('success', "Biography saved.");
      onRefreshPortfolio();
    } catch {
      showToast('err', "Save failed.");
    }
  };

  // Thesis Save
  const handleSaveResearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!research) return;
    try {
      const finalStack = typeof research.techStack === 'string'
        ? (research.techStack as string).split(',').map(t => t.trim())
        : research.techStack || [];
      await saveResearch({ ...research, techStack: finalStack });
      showToast('success', "Thesis catalog stored.");
      onRefreshPortfolio();
    } catch {
      showToast('err', "Save failed.");
    }
  };

  // Website Settings Save
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    try {
      await saveWebsiteSettings(settings);
      showToast('success', "Layout variables refreshed.");
      onRefreshPortfolio();
    } catch {
      showToast('err', "Save failed.");
    }
  };

  // Hardened Skills Save
  const handleSaveSkillsBlock = async () => {
    try {
      await saveAllSkills(skills, categories);
      showToast('success', "Static skills database updated.");
      onRefreshPortfolio();
    } catch {
      showToast('err', "Skills save failed.");
    }
  };

  const handleAddSkillNode = () => {
    const name = window.prompt("Enter Skill Node name (e.g., PyTorch):");
    const category = window.prompt(`Select category option keys inside (${categories.map(c => c.id).join(', ')}):`);
    if (!name || !category) return;
    const item: Skill = { id: `skill_${Date.now()}`, name, category };
    setSkills(prev => [...prev, item]);
  };

  const handleAddCategoryNode = () => {
    const name = window.prompt("Enter Category label (e.g., Cloud Platforms):");
    if (!name) return;
    const catId = name.toLowerCase().replace(/[^a-z0-9]/g, '_');
    const item: SkillCategory = { id: catId, name };
    setCategories(prev => [...prev, item]);
  };

  const handleDeleteSkillNode = (id: string) => {
    setSkills(prev => prev.filter(s => s.id !== id));
  };

  const handleDeleteCategoryNode = (id: string) => {
    setCategories(prev => prev.filter(c => c.id !== id));
    setSkills(prev => prev.filter(s => s.category !== id));
  };

  // PDF CV base64 upload converter
  const handleCvPdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
       showToast('err', "Upload PDF documents only!");
       return;
    }

    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64Data = event.target?.result as string;
      try {
        const payload: CvFile = {
          id: 'cv_singleton',
          fileName: file.name,
          fileData: base64Data,
          uploadedAt: new Date().toISOString()
        };
        await saveCv(payload);
        setCvFile(payload);
        showToast('success', "PDF Resume uploaded to database!");
      } catch (err) {
        showToast('err', "Upload failed.");
      }
    };
    reader.readAsDataURL(file);
  };

  const dashboardTabs = [
    { label: 'Overview', id: 'overview', icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: 'Hero / Banner', id: 'hero', icon: <User className="w-4 h-4" /> },
    { label: 'Biography', id: 'about', icon: <Compass className="w-4 h-4" /> },
    { label: 'Skills Db', id: 'skills', icon: <Cpu className="w-4 h-4" /> },
    { label: 'Projects Grid', id: 'projects', icon: <FolderGit2 className="w-4 h-4" /> },
    { label: 'Thesis Research', id: 'research', icon: <BookOpen className="w-4 h-4" /> },
    { label: 'Job Timeline', id: 'experience', icon: <Briefcase className="w-4 h-4" /> },
    { label: 'Authored Courses', id: 'courses', icon: <GraduationCap className="w-4 h-4" /> },
    { label: 'Consult Services', id: 'services', icon: <HeartHandshake className="w-4 h-4" /> },
    { label: 'Academic Edu', id: 'education', icon: <GraduationCap className="w-4 h-4" /> },
    { label: 'Innbound Messages', id: 'messages', icon: <Mail className="w-4 h-4" /> },
    { label: 'CV Manager', id: 'cv', icon: <Files className="w-4 h-4" /> },
    { label: 'Site Settings', id: 'settings', icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 font-sans text-left">
      
      {/* 1. Sidebar Panel */}
      <aside className="w-64 bg-slate-900/60 border-r border-white/5 flex flex-col justify-between p-4 flex-shrink-0">
        <div>
          {/* Logo element */}
          <div className="flex items-center gap-2 px-3 py-4 mb-6 border-b border-white/5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-slate-950 font-bold">
              MS
            </div>
            <div>
              <span className="font-bold block text-sm">Md. Samim</span>
              <span className="text-emerald-400 font-mono text-3xs font-semibold">CMS ADMIN MODE</span>
            </div>
          </div>

          <nav className="space-y-1">
            {dashboardTabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setShowModal(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-emerald-500/10 text-emerald-400 font-bold border-l-2 border-emerald-500 pl-4'
                    : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Logout widget */}
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all border border-transparent hover:border-rose-500/20 cursor-pointer pt-4"
        >
          <LogOut className="w-4 h-4" />
          Logout Panel
        </button>
      </aside>

      {/* 2. Content Center Area */}
      <main className="flex-grow p-8 overflow-y-auto max-h-screen relative">
        
        {/* Floating notifications */}
        {toast && (
          <div id="admin-toast-banner" className={`fixed top-4 right-4 z-50 flex items-center gap-2 px-4 py-3 rounded-xl border text-xs font-semibold shadow-lg ${
            toast.type === 'success' 
              ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
              : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
          }`}>
            <CheckCircle className="w-4 h-4" />
            {toast.msg}
          </div>
        )}

        {/* Headline */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
          <div>
            <h1 className="text-2xl font-black text-white capitalize">{activeTab} Manager</h1>
            <p className="text-slate-500 text-xs font-mono mt-1">{"// MODIFY DYNAMIC LIVE PORTFOLIO DATABASES"}</p>
          </div>
        </div>

        {/* ==================== TAB RENDERING LOGIC ==================== */}

        {/* 1. OVERVIEW Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-5 bg-slate-900/40 border border-white/5 rounded-2xl">
                <span className="text-slate-500 text-2xs font-mono block">TOTAL SHOWCASE PROJECTS</span>
                <span className="text-3xl font-black text-white">{projects.length}</span>
              </div>
              <div className="p-5 bg-slate-900/40 border border-white/5 rounded-2xl">
                <span className="text-slate-500 text-2xs font-mono block">SKILLS DATABASE</span>
                <span className="text-3xl font-black text-white">{skills.length}</span>
              </div>
              <div className="p-5 bg-slate-900/40 border border-white/5 rounded-2xl">
                <span className="text-slate-500 text-2xs font-mono block">DEVELOPED COURSES</span>
                <span className="text-3xl font-black text-white">{courses.length}</span>
              </div>
              <div className="p-5 bg-slate-900/40 border border-white/5 rounded-2xl">
                <span className="text-slate-500 text-2xs font-mono block">VISITOR MESSAGES</span>
                <span className="text-3xl font-black text-white">{messages.length}</span>
              </div>
            </div>

            {/* Quick action advice board */}
            <div className="p-6 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl">
              <h2 className="text-emerald-400 font-bold text-sm tracking-tight flex items-center gap-2 mb-2">
                <ShieldAlert className="w-4 h-4 animate-bounce" />
                Administrative Credentials Operational
              </h2>
              <p className="text-slate-400 text-xs leading-relaxed max-w-2xl">
                All portfolios data modules shown here are synchronized in realtime. If Firebase has been set up inside <span className="font-mono bg-slate-950 px-1 py-0.5 rounded text-slate-300">firebase-applet-config.json</span>, saves write directly to Firestore. Otherwise, values automatically sync into client <span className="font-mono bg-slate-950 px-1 py-0.5 rounded text-orange-400">localStorage</span> state variables.
              </p>
            </div>
          </div>
        )}

        {/* 2. HERO Tab */}
        {activeTab === 'hero' && profile && (
          <form onSubmit={handleSaveProfile} className="space-y-4 max-w-2xl bg-slate-900/40 border border-white/5 p-6 rounded-2xl">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-2xs font-mono text-slate-500 uppercase font-semibold">Branding Name</label>
                <input required type="text" value={profile.name} onChange={e=>setProfile({...profile, name: e.target.value})} className="w-full bg-slate-950 border border-white/5 rounded-xl py-2 px-3 text-xs" />
              </div>
              <div className="space-y-1">
                <label className="text-2xs font-mono text-slate-500 uppercase font-semibold">Hero Background Theme</label>
                <select value={profile.heroBgStyle} onChange={e=>setProfile({...profile, heroBgStyle: e.target.value as any})} className="w-full bg-slate-950 border border-white/5 rounded-xl py-2 px-3 text-xs text-white">
                  <option value="galaxy">Cosmic Galaxy (Floating Nodes)</option>
                  <option value="particles">Interactive Matrix (Classic)</option>
                </select>
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-2xs font-mono text-slate-500 uppercase font-semibold">Professional Headline</label>
              <input required type="text" value={profile.title || ''} onChange={e=>setProfile({...profile, title: e.target.value})} className="w-full bg-slate-950 border border-white/5 rounded-xl py-2 px-3 text-xs" />
            </div>
            <div className="space-y-1">
              <label className="text-2xs font-mono text-slate-500 uppercase font-semibold">Intro Speech</label>
              <textarea required rows={3} value={profile.intro || ''} onChange={e=>setProfile({...profile, intro: e.target.value})} className="w-full bg-slate-950 border border-white/5 rounded-xl py-2 px-3 text-xs resize-none" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950/40 p-4 rounded-xl border border-white/5">
              <div className="space-y-3">
                <label className="text-2xs font-mono text-cyan-400 uppercase font-bold block">[ 1. AVATAR PHOTO ]</label>
                
                {/* Avatar Preview Panel */}
                <div className="flex items-center gap-3 bg-slate-900/60 p-2.5 rounded-xl border border-white/5">
                  <div className="w-12 h-12 rounded-full border border-white/10 overflow-hidden bg-slate-950 shrink-0">
                    {profile.profilePhoto ? (
                      <img 
                        src={profile.profilePhoto} 
                        alt="Avatar Preview" 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[10px] font-mono text-slate-500">Nil</div>
                    )}
                  </div>
                  <div className="flex-1 space-y-1">
                    <span className="text-[10px] text-emerald-400 font-mono block">Status: READY TO COMMIT</span>
                    <span className="text-[9px] text-slate-500 font-mono block truncate max-w-[200px]">
                      {profile.profilePhoto ? (profile.profilePhoto.startsWith('data:') ? 'Custom Base-64' : profile.profilePhoto) : 'Default Unsplash'}
                    </span>
                  </div>
                </div>

                <input type="text" value={profile.profilePhoto || ''} onChange={e=>setProfile({...profile, profilePhoto: e.target.value})} className="w-full bg-slate-950 border border-white/5 rounded-xl py-2 px-3 text-xs" placeholder="Or enter direct image url..." />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    const r = new FileReader();
                    r.onload = async (ev) => {
                      const rawBase64 = ev.target?.result as string;
                      showToast('success', 'Compressing photo...');
                      // Compress to max 256x256
                      const compressed = await compressImage(rawBase64, 256, 256, 0.75);
                      setProfile({ ...profile, profilePhoto: compressed });
                      showToast('success', 'Avatar compressed & staged. Press "Save Banner Changes" below!');
                    };
                    r.readAsDataURL(file);
                  }}
                  className="w-full text-[10px] text-slate-400 font-mono file:mr-2 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-[10px] file:font-bold file:bg-cyan-500/10 file:text-cyan-400 hover:file:bg-cyan-500/20 cursor-pointer"
                />
              </div>

              <div className="space-y-3">
                <label className="text-2xs font-mono text-cyan-400 uppercase font-bold block">[ 2. COVER BANNER ]</label>
                
                {/* Banner Preview Panel */}
                <div className="flex items-center gap-3 bg-slate-900/60 p-2.5 rounded-xl border border-white/5">
                  <div className="w-20 h-10 rounded-md border border-white/10 overflow-hidden bg-slate-950 shrink-0">
                    {profile.bannerPhoto ? (
                      <img 
                        src={profile.bannerPhoto} 
                        alt="Banner Preview" 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[10px] font-mono text-slate-500">Nil</div>
                    )}
                  </div>
                  <div className="flex-1 space-y-1">
                    <span className="text-[10px] text-emerald-400 font-mono block">Status: READY TO COMMIT</span>
                    <span className="text-[9px] text-slate-500 font-mono block truncate max-w-[200px]">
                      {profile.bannerPhoto ? (profile.bannerPhoto.startsWith('data:') ? 'Custom Base-64' : profile.bannerPhoto) : 'Default Unsplash'}
                    </span>
                  </div>
                </div>

                <input type="text" value={profile.bannerPhoto || ''} onChange={e=>setProfile({...profile, bannerPhoto: e.target.value})} className="w-full bg-slate-950 border border-white/5 rounded-xl py-2 px-3 text-xs" placeholder="Or enter direct banner url..." />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    const r = new FileReader();
                    r.onload = async (ev) => {
                      const rawBase64 = ev.target?.result as string;
                      showToast('success', 'Compressing banner...');
                      // Compress to max 800x320
                      const compressed = await compressImage(rawBase64, 800, 320, 0.75);
                      setProfile({ ...profile, bannerPhoto: compressed });
                      showToast('success', 'Banner compressed & staged. Press "Save Banner Changes" below!');
                    };
                    r.readAsDataURL(file);
                  }}
                  className="w-full text-[10px] text-slate-400 font-mono file:mr-2 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-[10px] file:font-bold file:bg-cyan-500/10 file:text-cyan-400 hover:file:bg-cyan-500/20 cursor-pointer"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-2xs font-mono text-slate-500 uppercase font-semibold">GitHub Repository link</label>
                <input type="text" value={profile.github || ''} onChange={e=>setProfile({...profile, github: e.target.value})} className="w-full bg-slate-950 border border-white/5 rounded-xl py-2 px-3 text-xs" />
              </div>
              <div className="space-y-1">
                <label className="text-2xs font-mono text-slate-500 uppercase font-semibold">LinkedIn Profile URL</label>
                <input type="text" value={profile.linkedin || ''} onChange={e=>setProfile({...profile, linkedin: e.target.value})} className="w-full bg-slate-950 border border-white/5 rounded-xl py-2 px-3 text-xs" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-2xs font-mono text-slate-500 uppercase font-semibold">Telephony Contacts</label>
                <input type="text" value={profile.phone || ''} onChange={e=>setProfile({...profile, phone: e.target.value})} className="w-full bg-slate-950 border border-white/5 rounded-xl py-2 px-3 text-xs" />
              </div>
              <div className="space-y-1">
                <label className="text-2xs font-mono text-slate-500 uppercase font-semibold">Mail Inbox</label>
                <input type="text" value={profile.email || ''} onChange={e=>setProfile({...profile, email: e.target.value})} className="w-full bg-slate-950 border border-white/5 rounded-xl py-2 px-3 text-xs" />
              </div>
            </div>
            <button type="submit" className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-lg transition-transform active:scale-95 cursor-pointer">
              <Save className="w-4 h-4" /> Save Banner Changes
            </button>
          </form>
        )}

        {/* 3. BIOGRAPHY Tab */}
        {activeTab === 'about' && about && (
          <form onSubmit={handleSaveAbout} className="space-y-4 max-w-2xl bg-slate-900/40 border border-white/5 p-6 rounded-2xl">
            <div className="space-y-1">
              <label className="text-2xs font-mono text-slate-500 uppercase font-semibold">Biographical Bio-Graph Narrative</label>
              <textarea required rows={5} value={about.biography} onChange={e=>setAbout({...about, biography: e.target.value})} className="w-full bg-slate-950 border border-white/5 rounded-xl py-2.5 px-3.5 text-xs text-slate-200 resize-none font-sans" />
            </div>
            <div className="space-y-1">
              <label className="text-2xs font-mono text-slate-500 uppercase font-semibold">General Summary</label>
              <textarea required rows={3} value={about.summary} onChange={e=>setAbout({...about, summary: e.target.value})} className="w-full bg-slate-950 border border-white/5 rounded-xl py-2.5 px-3.5 text-xs text-slate-400 resize-none" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-2xs font-mono text-slate-500 uppercase font-semibold">General Station/Location</label>
                <input type="text" value={about.location} onChange={e=>setAbout({...about, location: e.target.value})} className="w-full bg-slate-950 border border-white/5 rounded-xl py-2 px-3 text-xs" />
              </div>
              <div className="space-y-1">
                <label className="text-2xs font-mono text-slate-500 uppercase font-semibold">Visual Avatar Placeholder Url</label>
                <input type="text" value={about.avatarUrl} onChange={e=>setAbout({...about, avatarUrl: e.target.value})} className="w-full bg-slate-950 border border-white/5 rounded-xl py-2 px-3 text-xs" />
              </div>
            </div>
            <button type="submit" className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-lg cursor-pointer">
              <Save className="w-4 h-4" /> Save Biography Changes
            </button>
          </form>
        )}

        {/* 4. SKILLS Tab */}
        {activeTab === 'skills' && (
          <div className="space-y-6 max-w-4xl">
            <div className="flex gap-2">
              <button onClick={handleAddSkillNode} className="flex items-center gap-1 bg-slate-900 border border-white/5 py-1.5 px-3 rounded-lg text-xs hover:bg-slate-800 transition-all cursor-pointer">
                <Plus className="w-4 h-4 text-emerald-400" /> Skill Node
              </button>
              <button onClick={handleAddCategoryNode} className="flex items-center gap-1 bg-slate-900 border border-white/5 py-1.5 px-3 rounded-lg text-xs hover:bg-slate-800 transition-all cursor-pointer">
                <Plus className="w-4 h-4 text-emerald-400" /> Category Bracket
              </button>
              <button onClick={handleSaveSkillsBlock} className="flex items-center gap-1 bg-emerald-500 text-slate-950 font-bold py-1.5 px-4 rounded-lg text-xs transition-transform active:scale-95 cursor-pointer">
                <Save className="w-4 h-4" /> Commit Databases Changes
              </button>
            </div>

            <div className="space-y-6 mt-4">
              {categories.map(cat => {
                const subSkills = skills.filter(s => s.category === cat.id);
                return (
                  <div key={cat.id} className="p-5 bg-slate-900/20 border border-white/5 rounded-xl space-y-4">
                    <div className="flex items-center justify-between border-b border-white/5 pb-2">
                      <h4 className="text-sm font-bold text-emerald-400 font-mono tracking-wide">{cat.name} ({cat.id})</h4>
                      <button onClick={()=>handleDeleteCategoryNode(cat.id)} className="p-1 hover:bg-rose-500/10 rounded text-rose-500 cursor-pointer">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    {/* Skills list inside category */}
                    <div className="flex flex-wrap gap-2">
                      {subSkills.map(sk => (
                        <span key={sk.id} className="inline-flex items-center gap-1.5 pl-3.5 pr-2 py-1.5 bg-slate-950 border border-white/5 text-xs text-slate-200 rounded-lg">
                          {sk.name}
                          <button onClick={()=>handleDeleteSkillNode(sk.id)} className="p-0.5 hover:bg-rose-500/10 rounded text-rose-400 cursor-pointer">
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </span>
                      ))}
                      {subSkills.length === 0 && (
                        <p className="text-slate-500 text-xs font-mono font-medium py-1">{"// Category currently vacant. Click Add Node."}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 5. PROJECTS / SERVICES / TIMELINE general listings tabs */}
        {(activeTab === 'projects' || activeTab === 'experience' || activeTab === 'courses' || activeTab === 'services' || activeTab === 'certifications' || activeTab === 'education') && (
          <div className="space-y-4">
            <button
              onClick={openAddForm}
              className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-lg transition-all active:scale-95 cursor-pointer"
            >
              <Plus className="w-4.5 h-4.5" /> Add New {activeTab.replace(/s$/, '')}
            </button>

            {/* Render table checklist list of entries */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {activeTab === 'projects' && projects.map(p => (
                <div key={p.id} className="p-4 bg-slate-900/40 border border-white/5 rounded-xl flex items-center justify-between text-left">
                  <div>
                    <h5 className="text-sm font-bold text-white line-clamp-1">{p.name}</h5>
                    <span className="text-3xs text-slate-500 block font-mono">{p.id}</span>
                  </div>
                  <div className="flex gap-1.5">
                    <button onClick={() => openEditForm(p)} className="p-2 bg-slate-950 hover:bg-slate-800 rounded border border-white/5 text-emerald-400 cursor-pointer"><Edit className="w-4 h-4" /></button>
                    <button onClick={() => handleDeleteItem(p.id)} className="p-2 bg-slate-950 hover:bg-slate-800 rounded border border-white/5 text-rose-400 cursor-pointer"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              ))}

              {activeTab === 'experience' && experiences.map(exp => (
                <div key={exp.id} className="p-4 bg-slate-900/40 border border-white/5 rounded-xl flex items-center justify-between text-left">
                  <div>
                    <h5 className="text-sm font-bold text-white line-clamp-1">{exp.role}</h5>
                    <span className="text-3xs text-slate-500 block font-mono">{exp.company} - {exp.duration}</span>
                  </div>
                  <div className="flex gap-1.5">
                    <button onClick={() => openEditForm(exp)} className="p-2 bg-slate-950 hover:bg-slate-800 rounded border border-white/5 text-emerald-400 cursor-pointer"><Edit className="w-4 h-4" /></button>
                    <button onClick={() => handleDeleteItem(exp.id)} className="p-2 bg-slate-950 hover:bg-slate-800 rounded border border-white/5 text-rose-400 cursor-pointer"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              ))}

              {activeTab === 'courses' && courses.map(c => (
                <div key={c.id} className="p-4 bg-slate-900/40 border border-white/5 rounded-xl flex items-center justify-between text-left">
                  <div>
                    <h5 className="text-sm font-bold text-white line-clamp-1">{c.title}</h5>
                    <span className="text-3xs text-slate-500 block font-mono">{c.category}</span>
                  </div>
                  <div className="flex gap-1.5">
                    <button onClick={() => openEditForm(c)} className="p-2 bg-slate-950 hover:bg-slate-800 rounded border border-white/5 text-emerald-400 cursor-pointer"><Edit className="w-4 h-4" /></button>
                    <button onClick={() => handleDeleteItem(c.id)} className="p-2 bg-slate-950 hover:bg-slate-800 rounded border border-white/5 text-rose-400 cursor-pointer"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              ))}

              {activeTab === 'services' && services.map(s => (
                <div key={s.id} className="p-4 bg-slate-900/40 border border-white/5 rounded-xl flex items-center justify-between text-left">
                  <div>
                    <h5 className="text-sm font-bold text-white line-clamp-1">{s.title}</h5>
                    <span className="text-3xs text-slate-500 block font-mono">{s.pricing || 'No specified pricing'}</span>
                  </div>
                  <div className="flex gap-1.5">
                    <button onClick={() => openEditForm(s)} className="p-2 bg-slate-950 hover:bg-slate-800 rounded border border-white/5 text-emerald-400 cursor-pointer"><Edit className="w-4 h-4" /></button>
                    <button onClick={() => handleDeleteItem(s.id)} className="p-2 bg-slate-950 hover:bg-slate-800 rounded border border-white/5 text-rose-400 cursor-pointer"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              ))}

              {activeTab === 'certifications' && certifications.map(c => (
                <div key={c.id} className="p-4 bg-slate-900/40 border border-white/5 rounded-xl flex items-center justify-between text-left">
                  <div>
                    <h5 className="text-sm font-bold text-white line-clamp-1">{c.title}</h5>
                    <span className="text-3xs text-slate-500 block font-mono">{c.issuer} - {c.year}</span>
                  </div>
                  <div className="flex gap-1.5">
                    <button onClick={() => openEditForm(c)} className="p-2 bg-slate-950 hover:bg-slate-800 rounded border border-white/5 text-emerald-400 cursor-pointer"><Edit className="w-4 h-4" /></button>
                    <button onClick={() => handleDeleteItem(c.id)} className="p-2 bg-slate-950 hover:bg-slate-800 rounded border border-white/5 text-rose-400 cursor-pointer"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              ))}

              {activeTab === 'education' && educations.map(e => (
                <div key={e.id} className="p-4 bg-slate-900/40 border border-white/5 rounded-xl flex items-center justify-between text-left">
                  <div>
                    <h5 className="text-sm font-bold text-white line-clamp-1">{e.degree}</h5>
                    <span className="text-3xs text-slate-500 block font-mono">{e.school} - GPA {e.cgpa}</span>
                  </div>
                  <div className="flex gap-1.5">
                    <button onClick={() => openEditForm(e)} className="p-2 bg-slate-950 hover:bg-slate-800 rounded border border-white/5 text-emerald-400 cursor-pointer"><Edit className="w-4 h-4" /></button>
                    <button onClick={() => handleDeleteItem(e.id)} className="p-2 bg-slate-950 hover:bg-slate-800 rounded border border-white/5 text-rose-400 cursor-pointer"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6. THESIS Tab */}
        {activeTab === 'research' && research && (
          <form onSubmit={handleSaveResearch} className="space-y-4 max-w-2xl bg-slate-900/40 border border-white/5 p-6 rounded-2xl">
            <div className="space-y-1">
              <label className="text-2xs font-mono text-slate-500 uppercase font-semibold">Thesis Title</label>
              <input required type="text" value={research.title} onChange={e=>setResearch({...research, title: e.target.value})} className="w-full bg-slate-950 border border-white/5 rounded-xl py-2 px-3 text-xs" />
            </div>
            <div className="space-y-1">
              <label className="text-2xs font-mono text-slate-500 uppercase font-semibold">Abstract Description</label>
              <textarea required rows={5} value={research.description} onChange={e=>setResearch({...research, description: e.target.value})} className="w-full bg-slate-950 border border-white/5 rounded-xl py-2 px-3 text-xs resize-none" />
            </div>
            <div className="space-y-1">
              <label className="text-2xs font-mono text-slate-500 uppercase font-semibold">Related Tech Stack (Comma separated values)</label>
              <input type="text" value={Array.isArray(research.techStack) ? research.techStack.join(', ') : research.techStack || ''} onChange={e=>setResearch({...research, techStack: e.target.value as any})} className="w-full bg-slate-950 border border-white/5 rounded-xl py-2 px-3 text-xs" />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-2xs font-mono text-slate-500 uppercase font-semibold">Report Doc Link</label>
                <input type="text" value={research.reportLink || ''} onChange={e=>setResearch({...research, reportLink: e.target.value})} className="w-full bg-slate-950 border border-white/5 rounded-xl py-2 px-3 text-xs" />
              </div>
              <div className="space-y-1">
                <label className="text-2xs font-mono text-slate-500 uppercase font-semibold">GitHub URL</label>
                <input type="text" value={research.githubLink || ''} onChange={e=>setResearch({...research, githubLink: e.target.value})} className="w-full bg-slate-950 border border-white/5 rounded-xl py-2 px-3 text-xs" />
              </div>
              <div className="space-y-1">
                <label className="text-2xs font-mono text-slate-500 uppercase font-semibold">Live Prototype Demo URL</label>
                <input type="text" value={research.liveLink || ''} onChange={e=>setResearch({...research, liveLink: e.target.value})} className="w-full bg-slate-950 border border-white/5 rounded-xl py-2 px-3 text-xs" />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-2xs font-mono text-slate-500 uppercase font-semibold">Thumbnail Screenshot Link</label>
              <input type="text" value={research.image || ''} onChange={e=>setResearch({...research, image: e.target.value})} className="w-full bg-slate-950 border border-white/5 rounded-xl py-2 px-3 text-xs" />
            </div>
            <button type="submit" className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-lg cursor-pointer">
              <Save className="w-4 h-4" /> Save Thesis Details
            </button>
          </form>
        )}

        {/* 7. VISITOR MESSAGES */}
        {activeTab === 'messages' && (
          <div className="space-y-4 max-w-4xl text-left">
            {messages && messages.length > 0 ? (
              <div className="space-y-4">
                {messages.map((m) => (
                  <div key={m.id} className="p-5 bg-slate-900/40 border border-white/5 rounded-2xl relative">
                    <button
                      onClick={() => handleDeleteItem(m.id)}
                      className="absolute top-4 right-4 p-1.5 bg-slate-950 border border-white/5 hover:border-rose-500/10 text-slate-500 hover:text-rose-400 rounded-lg cursor-pointer"
                      title="Wipe email thread"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-200">{m.name}</span>
                        <span className="text-slate-500 font-mono text-xs">{"<"}{m.email}{">"}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-3xs font-mono text-slate-400 uppercase tracking-widest leading-none">
                        <Clock className="w-3.5 h-3.5" />
                        {new Date(m.timestamp).toLocaleDateString()} {new Date(m.timestamp).toLocaleTimeString()}
                      </div>
                      <h4 className="text-xs sm:text-sm font-semibold text-emerald-400 pt-2 border-t border-white/5">
                        Subject: {m.subject}
                      </h4>
                      <p className="text-slate-350 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap pt-1 font-serif bg-slate-950/40 p-4 rounded-xl mt-2 border border-white/5">
                        {m.message}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-slate-500 text-xs font-mono">{"// No visitor messages/emails recorded inside database queue yet."}</p>
            )}
          </div>
        )}

        {/* 8. CV MANAGER */}
        {activeTab === 'cv' && (
          <div className="space-y-6 max-w-xl bg-slate-900/40 border border-white/5 p-6 rounded-2xl text-left">
            <div>
              <h4 className="text-sm font-bold text-white mb-2">CV / Resume PDF File Manager</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Upload your latest professional curriculum vitae file here. Visitors clicking the "Download CV" action button in the Navigation banner will fetch and compile this specific file instantly from storage variables.
              </p>
            </div>

            {cvFile ? (
              <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-emerald-400 font-mono text-xs font-bold block">{cvFile.fileName}</span>
                  <span className="text-3xs text-slate-500 font-mono block">Uploaded: {new Date(cvFile.uploadedAt).toLocaleDateString()}</span>
                </div>
                <a
                  href={cvFile.fileData}
                  download={cvFile.fileName}
                  className="flex items-center gap-1 p-2 bg-slate-950 hover:bg-slate-900 border border-white/5 rounded text-xs text-slate-300"
                >
                  <FileDown className="w-4 h-4" /> Download Core
                </a>
              </div>
            ) : (
              <div className="p-4 bg-slate-950 border border-white/5 rounded-xl text-slate-500 text-xs text-center font-mono">
                {"// No overrides uploaded yet. Nav button uses default fallback layout."}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-2xs font-mono text-slate-500 uppercase font-semibold block">Select New Override CV (PDF file only)</label>
              <input
                type="file"
                accept=".pdf"
                onChange={handleCvPdfUpload}
                className="w-full text-xs text-slate-400 font-mono file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-emerald-500/10 file:text-emerald-400 hover:file:bg-emerald-500/20 cursor-pointer"
              />
            </div>
          </div>
        )}

        {/* 9. SITE SETTINGS */}
        {activeTab === 'settings' && settings && (
          <form onSubmit={handleSaveSettings} className="space-y-4 max-w-2xl bg-slate-900/40 border border-white/5 p-6 rounded-2xl">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-2xs font-mono text-slate-500 uppercase font-semibold">Layout Site Title</label>
                <input required type="text" value={settings.siteName} onChange={e=>setSettings({...settings, siteName: e.target.value})} className="w-full bg-slate-950 border border-white/5 rounded-xl py-2 px-3 text-xs" />
              </div>
              <div className="space-y-1">
                <label className="text-2xs font-mono text-slate-500 uppercase font-semibold">Navbar Logo Display Name</label>
                <input required type="text" value={settings.logoText} onChange={e=>setSettings({...settings, logoText: e.target.value})} className="w-full bg-slate-950 border border-white/5 rounded-xl py-2 px-3 text-xs" />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-2xs font-mono text-slate-500 uppercase font-semibold">SEO Title Tag Overrides</label>
              <input type="text" value={settings.seoTitle || ''} onChange={e=>setSettings({...settings, seoTitle: e.target.value})} className="w-full bg-slate-950 border border-white/5 rounded-xl py-2 px-3 text-xs" />
            </div>
            <div className="space-y-1">
              <label className="text-2xs font-mono text-slate-500 uppercase font-semibold">SEO Meta Description Tag Overrides</label>
              <input type="text" value={settings.seoDescription || ''} onChange={e=>setSettings({...settings, seoDescription: e.target.value})} className="w-full bg-slate-950 border border-white/5 rounded-xl py-2 px-3 text-xs" />
            </div>
            <div className="space-y-1">
              <label className="text-2xs font-mono text-slate-500 uppercase font-semibold">Branding Footer credit text</label>
              <input type="text" value={settings.footerText || ''} onChange={e=>setSettings({...settings, footerText: e.target.value})} className="w-full bg-slate-950 border border-white/5 rounded-xl py-2 px-3 text-xs" />
            </div>
            <button type="submit" className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-lg cursor-pointer">
              <Save className="w-4 h-4" /> Commit Layout Settings
            </button>
          </form>
        )}

      </main>

      {/* ==================== CREATE/EDIT MODAL FORM ==================== */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm text-left">
          <div className="bg-slate-950 border border-white/10 rounded-2xl w-full max-w-md overflow-hidden flex flex-col shadow-2xl p-6">
            <h3 className="text-base font-bold text-white mb-4">
              {editingId ? "Edit" : "Add New"} {activeTab.replace(/s$/, '').toUpperCase()}
            </h3>

            <form onSubmit={handleSaveCollectionItem} className="space-y-4">
              {/* Dynamic Projects Form fields */}
              {activeTab === 'projects' && (
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-3xs font-mono text-slate-500 uppercase font-semibold block">Project Label Name</label>
                    <input required type="text" name="name" value={editorData.name || ''} onChange={handleEditorChange} className="w-full bg-slate-900 border border-white/5 rounded-lg py-1.5 px-3 text-xs" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-3xs font-mono text-slate-500 uppercase font-semibold block">Project Category Claffisication</label>
                    <select required name="category" value={editorData.category || 'Full-Stack Development'} onChange={handleEditorChange} className="w-full bg-slate-900 border border-white/5 rounded-lg py-1.5 px-3 text-xs text-white">
                      <option value="Full-Stack Development">Full-Stack Development</option>
                      <option value="Machine Learning & AI">Machine Learning & AI</option>
                      <option value="AI & Content Creation">AI & Content Creation</option>
                      <option value="Other Engineering">Other Engineering</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-3xs font-mono text-slate-500 uppercase font-semibold block">Detail description summary</label>
                    <textarea required rows={4} name="description" value={editorData.description || ''} onChange={handleEditorChange} className="w-full bg-slate-900 border border-white/5 rounded-lg py-1.5 px-3 text-xs resize-none" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-3xs font-mono text-slate-500 uppercase font-semibold block">Tech Stack (comma-separated, e.g. React, Nodejs)</label>
                    <input required type="text" name="techStack" value={Array.isArray(editorData.techStack) ? editorData.techStack.join(', ') : editorData.techStack || ''} onChange={handleEditorChange} className="w-full bg-slate-900 border border-white/5 rounded-lg py-1.5 px-3 text-xs" />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="text-3xs font-mono text-slate-500 uppercase font-semibold block">GitHub link</label>
                      <input type="text" name="githubLink" value={editorData.githubLink || ''} onChange={handleEditorChange} className="w-full bg-slate-900 border border-white/5 rounded-lg py-1.5 px-3 text-xs" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-3xs font-mono text-slate-500 uppercase font-semibold block">Live Demo Url</label>
                      <input type="text" name="liveLink" value={editorData.liveLink || ''} onChange={handleEditorChange} className="w-full bg-slate-900 border border-white/5 rounded-lg py-1.5 px-3 text-xs" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-3xs font-mono text-slate-500 uppercase font-semibold block">Thumbnail Image Url</label>
                    <input type="text" name="image" value={editorData.image || ''} onChange={handleEditorChange} className="w-full bg-slate-900 border border-white/5 rounded-lg py-1.5 px-3 text-xs" />
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" name="featured" id="chk-featured" checked={!!editorData.featured} onChange={handleEditorChange} />
                    <label htmlFor="chk-featured" className="text-xs text-slate-350 select-none cursor-pointer">Mark as Featured Showcase</label>
                  </div>
                </div>
              )}

              {/* Dynamic Job Experience Form fields */}
              {activeTab === 'experience' && (
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="text-3xs font-mono text-slate-500 uppercase font-semibold block">Role Title</label>
                      <input required type="text" name="role" value={editorData.role || ''} onChange={handleEditorChange} className="w-full bg-slate-900 border border-white/5 rounded-lg py-1.5 px-3 text-xs" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-3xs font-mono text-slate-500 uppercase font-semibold block">Company Name</label>
                      <input required type="text" name="company" value={editorData.company || ''} onChange={handleEditorChange} className="w-full bg-slate-900 border border-white/5 rounded-lg py-1.5 px-3 text-xs" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="text-3xs font-mono text-slate-500 uppercase font-semibold block">Working Timeline (e.g., April 2025 - Present)</label>
                      <input required type="text" name="duration" value={editorData.duration || ''} onChange={handleEditorChange} className="w-full bg-slate-900 border border-white/5 rounded-lg py-1.5 px-3 text-xs" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-3xs font-mono text-slate-500 uppercase font-semibold block">Branding logo picture url</label>
                      <input type="text" name="logo" value={editorData.logo || ''} onChange={handleEditorChange} className="w-full bg-slate-900 border border-white/5 rounded-lg py-1.5 px-3 text-xs" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-3xs font-mono text-slate-500 uppercase font-semibold block">Bullet points outcomes (one per line)</label>
                    <textarea rows={4} name="bulletPoints" value={Array.isArray(editorData.bulletPoints) ? editorData.bulletPoints.join('\n') : editorData.bulletPoints || ''} onChange={handleEditorChange} className="w-full bg-slate-900 border border-white/5 rounded-lg py-1.5 px-3 text-xs resize-none" />
                  </div>
                </div>
              )}

              {/* Dynamic Courses fields */}
              {activeTab === 'courses' && (
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-3xs font-mono text-slate-500 uppercase font-semibold block">Course Title</label>
                    <input required type="text" name="title" value={editorData.title || ''} onChange={handleEditorChange} className="w-full bg-slate-900 border border-white/5 rounded-lg py-1.5 px-3 text-xs" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-3xs font-mono text-slate-500 uppercase font-semibold block">Overview brief summary</label>
                    <textarea required rows={3} name="description" value={editorData.description || ''} onChange={handleEditorChange} className="w-full bg-slate-900 border border-white/5 rounded-lg py-1.5 px-3 text-xs resize-none" />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="text-3xs font-mono text-slate-500 uppercase font-semibold block">Platform external link</label>
                      <input required type="text" name="courseLink" value={editorData.courseLink || ''} onChange={handleEditorChange} className="w-full bg-slate-900 border border-white/5 rounded-lg py-1.5 px-3 text-xs" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-3xs font-mono text-slate-500 uppercase font-semibold block">Classification Category</label>
                      <input required type="text" name="category" value={editorData.category || ''} onChange={handleEditorChange} className="w-full bg-slate-900 border border-white/5 rounded-lg py-1.5 px-3 text-xs" placeholder="e.g. AI Bootcamp" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-3xs font-mono text-slate-500 uppercase font-semibold block">Thumbnail picture url</label>
                    <input type="text" name="thumbnail" value={editorData.thumbnail || ''} onChange={handleEditorChange} className="w-full bg-slate-900 border border-white/5 rounded-lg py-1.5 px-3 text-xs" />
                  </div>
                </div>
              )}

              {/* Dynamic Services fields */}
              {activeTab === 'services' && (
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-3xs font-mono text-slate-500 uppercase font-semibold block">Service Title</label>
                    <input required type="text" name="title" value={editorData.title || ''} onChange={handleEditorChange} className="w-full bg-slate-900 border border-white/5 rounded-lg py-1.5 px-3 text-xs" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-3xs font-mono text-slate-500 uppercase font-semibold block">Offering description</label>
                    <textarea required rows={3} name="description" value={editorData.description || ''} onChange={handleEditorChange} className="w-full bg-slate-900 border border-white/5 rounded-lg py-1.5 px-3 text-xs resize-none" />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="text-3xs font-mono text-slate-500 uppercase font-semibold block">Associated Icon (Code, Brain, Tv, layout, etc.)</label>
                      <select name="icon" value={editorData.icon || 'Code'} onChange={handleEditorChange} className="w-full bg-slate-900 border border-white/5 rounded-lg py-1.5 px-3 text-xs text-white">
                        <option value="Code">Web Code Symbol</option>
                        <option value="Brain">AI Brain Neural</option>
                        <option value="BarChart">Analytics Data bar chart</option>
                        <option value="FileText">Technical Copy page</option>
                        <option value="BookOpen">Thesis manual</option>
                        <option value="LineChart">Market strategy</option>
                        <option value="Sparkles">Interactive platform automation</option>
                        <option value="Layout">Full Portfolio developer layout</option>
                        <option value="Tv">Presentations slideshow</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-3xs font-mono text-slate-500 uppercase font-semibold block">Fixed rate Pricing segment</label>
                      <input type="text" name="pricing" value={editorData.pricing || ''} onChange={handleEditorChange} className="w-full bg-slate-900 border border-white/5 rounded-lg py-1.5 px-3 text-xs" placeholder="e.g. $45/hr" />
                    </div>
                  </div>
                </div>
              )}

              {/* Dynamic Certifications fields */}
              {activeTab === 'certifications' && (
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-3xs font-mono text-slate-500 uppercase font-semibold block">Certification Title</label>
                    <input required type="text" name="title" value={editorData.title || ''} onChange={handleEditorChange} className="w-full bg-slate-900 border border-white/5 rounded-lg py-1.5 px-3 text-xs" />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="text-3xs font-mono text-slate-500 uppercase font-semibold block">Issuer organization</label>
                      <input required type="text" name="issuer" value={editorData.issuer || ''} onChange={handleEditorChange} className="w-full bg-slate-900 border border-white/5 rounded-lg py-1.5 px-3 text-xs" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-3xs font-mono text-slate-500 uppercase font-semibold block">Year attained</label>
                      <input required type="text" name="year" value={editorData.year || ''} onChange={handleEditorChange} className="w-full bg-slate-900 border border-white/5 rounded-lg py-1.5 px-3 text-xs" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-3xs font-mono text-slate-500 uppercase font-semibold block">Certification verification url</label>
                    <input type="text" name="link" value={editorData.link || ''} onChange={handleEditorChange} className="w-full bg-slate-900 border border-white/5 rounded-lg py-1.5 px-3 text-xs" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-3xs font-mono text-slate-500 uppercase font-semibold block">Thumbnail certificate image link</label>
                    <input type="text" name="image" value={editorData.image || ''} onChange={handleEditorChange} className="w-full bg-slate-900 border border-white/5 rounded-lg py-1.5 px-3 text-xs" />
                  </div>
                </div>
              )}

              {/* Dynamic Educations fields */}
              {activeTab === 'education' && (
                <div className="space-y-3">
                  <div className="space-y-1">
                    <label className="text-3xs font-mono text-slate-500 uppercase font-semibold block">Degree Label Name</label>
                    <input required type="text" name="degree" value={editorData.degree || ''} onChange={handleEditorChange} className="w-full bg-slate-900 border border-white/5 rounded-lg py-1.5 px-3 text-xs" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-3xs font-mono text-slate-500 uppercase font-semibold block">University school center Name</label>
                    <input required type="text" name="school" value={editorData.school || ''} onChange={handleEditorChange} className="w-full bg-slate-900 border border-white/5 rounded-lg py-1.5 px-3 text-xs" />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <label className="text-3xs font-mono text-slate-500 uppercase font-semibold block">Collegiate Timeline duration</label>
                      <input type="text" name="duration" value={editorData.duration || ''} onChange={handleEditorChange} className="w-full bg-slate-900 border border-white/5 rounded-lg py-1.5 px-3 text-xs" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-3xs font-mono text-slate-500 uppercase font-semibold block">Grade GPAs achieved</label>
                      <input type="text" name="cgpa" value={editorData.cgpa || ''} onChange={handleEditorChange} className="w-full bg-slate-900 border border-white/5 rounded-lg py-1.5 px-3 text-xs" placeholder="e.g. 3.53/4.00" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-3xs font-mono text-slate-500 uppercase font-semibold block">Relational Study Coursework modules (comma separated)</label>
                    <input type="text" name="coursework" value={Array.isArray(editorData.coursework) ? editorData.coursework.join(', ') : editorData.coursework || ''} onChange={handleEditorChange} className="w-full bg-slate-900 border border-white/5 rounded-lg py-1.5 px-3 text-xs" />
                  </div>
                </div>
              )}

              {/* Action buttons */}
              <div className="flex justify-end gap-2 pt-4 border-t border-white/5">
                <button
                  type="button"
                  id="close-admin-crud"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-slate-900 border border-white/5 text-slate-400 font-semibold text-xs rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  id="save-admin-crud"
                  className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl cursor-pointer"
                >
                  Commit Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================== DELETE CONFIRMATION MODAL ==================== */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xs text-left">
          <div className="bg-slate-950 border border-rose-500/30 rounded-2xl w-full max-w-sm overflow-hidden flex flex-col shadow-2xl p-6 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-start gap-3 mb-4">
              <div className="p-2 bg-rose-500/10 text-rose-500 rounded-lg shrink-0">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Permanently Delete?</h3>
                <p className="text-slate-400 text-xs mt-1">
                  Are you sure you want to delete this record? This action is permanent and cannot be undone.
                </p>
              </div>
            </div>
            
            <div className="flex items-center justify-end gap-2 mt-4">
              <button
                type="button"
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 border border-white/10 hover:bg-white/5 text-xs text-slate-350 font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDeleteAction}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-500 active:scale-95 text-xs text-white font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer"
              >
                Destroy Record
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
