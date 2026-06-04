import { initializeApp, getApps } from 'firebase/app';
import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc, 
  collection, 
  getDocs, 
  deleteDoc,
  getDocFromServer
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';
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
  WebsiteSettings,
  AdminUser
} from '../types';
import {
  defaultProfile,
  defaultAbout,
  defaultSkills,
  defaultSkillCategories,
  defaultProjects,
  defaultResearch,
  defaultExperience,
  defaultCourses,
  defaultServices,
  defaultCertifications,
  defaultEducation,
  defaultWebsiteSettings
} from '../data/seedData';

// Check if firebase configuration has been set up with actual credentials
const isFirebaseSetUp = firebaseConfig && firebaseConfig.apiKey && firebaseConfig.apiKey.length > 5;

let db: any = null;
let auth: any = null;
let isFirebaseEnabled = false;

if (isFirebaseSetUp) {
  try {
    const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
    auth = getAuth(app);
    isFirebaseEnabled = true;
    console.log("Firebase initialized successfully inside portfolio!");
  } catch (error) {
    console.warn("Failed to initialize Firebase with provided credentials. Falling back to local state.", error);
  }
} else {
  console.log("No custom Firebase credentials detected. Using highly optimized LocalStorage engine.");
}

// SHA-256 password hashing utility using modern Web Crypto API
export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + "samim_portfolio_salt_2026");
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Sync with Local Storage for quick feedback when Firebase is offline/not initialized
function saveLocal(key: string, data: any) {
  localStorage.setItem(`samim_portfolio_${key}`, JSON.stringify(data));
}

function getLocal(key: string, defaultValue: any) {
  const val = localStorage.getItem(`samim_portfolio_${key}`);
  if (!val) return defaultValue;
  try {
    return JSON.parse(val);
  } catch {
    return defaultValue;
  }
}

// Clean Firestore helper error reporting conforming the guidelines
enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth?.currentUser?.uid || null,
      email: auth?.currentUser?.email || null,
    },
    operationType,
    path
  };
  console.warn('Firestore Operation Synced Locally but Cloud reported details: ', JSON.stringify(errInfo));
  
  // Only throw as a hard blocking error for primary Auth GET actions
  if (path === 'settings/admin' && operationType === OperationType.GET) {
    throw new Error(JSON.stringify(errInfo));
  }
}

export async function seedFirestoreDatabaseIfNecessary(): Promise<void> {
  if (!isFirebaseEnabled || !db) return;
  try {
    const profileDoc = await getDoc(doc(db, 'portfolio', 'profile'));
    if (!profileDoc.exists()) {
      console.log("Seeding Firestore database with default profile singletons...");
      await setDoc(doc(db, 'portfolio', 'profile'), defaultProfile);
      await setDoc(doc(db, 'portfolio', 'about'), defaultAbout);
      await setDoc(doc(db, 'portfolio', 'settings'), defaultWebsiteSettings);
    }

    const projSnap = await getDocs(collection(db, 'projects'));
    if (projSnap.empty) {
      console.log("Seeding Firestore projects...");
      for (const p of defaultProjects) {
        await setDoc(doc(db, 'projects', p.id), {
          name: p.name,
          description: p.description,
          techStack: p.techStack,
          githubLink: p.githubLink,
          liveLink: p.liveLink,
          image: p.image,
          featured: p.featured,
          category: p.category || 'Full-Stack Development'
        });
      }
    }

    const expSnap = await getDocs(collection(db, 'experience'));
    if (expSnap.empty) {
      console.log("Seeding Firestore experiences...");
      for (const exp of defaultExperience) {
        await setDoc(doc(db, 'experience', exp.id), {
          role: exp.role,
          company: exp.company,
          duration: exp.duration,
          bulletPoints: exp.bulletPoints
        });
      }
    }

    const courseSnap = await getDocs(collection(db, 'courses'));
    if (courseSnap.empty) {
      console.log("Seeding Firestore courses...");
      for (const c of defaultCourses) {
        await setDoc(doc(db, 'courses', c.id), {
          title: c.title,
          description: c.description,
          courseLink: c.courseLink,
          thumbnail: c.thumbnail,
          category: c.category
        });
      }
    }

    const srvSnap = await getDocs(collection(db, 'services'));
    if (srvSnap.empty) {
      console.log("Seeding Firestore services...");
      for (const s of defaultServices) {
        await setDoc(doc(db, 'services', s.id), {
          title: s.title,
          description: s.description,
          icon: s.icon,
          pricing: s.pricing || ''
        });
      }
    }

    const certSnap = await getDocs(collection(db, 'certifications'));
    if (certSnap.empty) {
      console.log("Seeding Firestore certifications...");
      for (const cert of defaultCertifications) {
        await setDoc(doc(db, 'certifications', cert.id), {
          title: cert.title,
          issuer: cert.issuer,
          year: cert.year,
          link: cert.link,
          image: cert.image
        });
      }
    }

    const eduSnap = await getDocs(collection(db, 'education'));
    if (eduSnap.empty) {
      console.log("Seeding Firestore education...");
      for (const edu of defaultEducation) {
        await setDoc(doc(db, 'education', edu.id), {
          degree: edu.degree,
          school: edu.school,
          duration: edu.duration,
          cgpa: edu.cgpa,
          coursework: edu.coursework
        });
      }
    }

    const skillsSnap = await getDocs(collection(db, 'skills'));
    if (skillsSnap.empty) {
      console.log("Seeding Firestore skills & categories...");
      for (const cat of defaultSkillCategories) {
        await setDoc(doc(db, 'skillCategories', cat.id), { name: cat.name });
      }
      for (const sk of defaultSkills) {
        await setDoc(doc(db, 'skills', sk.id), { name: sk.name, category: sk.category });
      }
    }
  } catch (err) {
    console.warn("Could not auto-seed database items", err);
  }
}

// ---------------------- DATABASE API INTERFACES ----------------------

// 1. Admin Auth
export async function getAdminUser(): Promise<AdminUser | null> {
  if (isFirebaseEnabled && db) {
    try {
      const docSnap = await getDoc(doc(db, 'settings', 'admin'));
      if (docSnap.exists()) {
        return docSnap.data() as AdminUser;
      }
      return null;
    } catch (e) {
      handleFirestoreError(e, OperationType.GET, 'settings/admin');
    }
  }
  return getLocal('admin_user', null);
}

export async function registerAdminUser(admin: AdminUser): Promise<void> {
  if (isFirebaseEnabled && db) {
    try {
      await setDoc(doc(db, 'settings', 'admin'), admin);
      return;
    } catch (e) {
      handleFirestoreError(e, OperationType.WRITE, 'settings/admin');
    }
  }
  saveLocal('admin_user', admin);
}

// 2. Profile
export async function getProfile(): Promise<Profile> {
  if (isFirebaseEnabled && db) {
    try {
      const d = await getDoc(doc(db, 'portfolio', 'profile'));
      if (d.exists()) return d.data() as Profile;
    } catch (e) {
      console.warn("Firestore error, falling back", e);
    }
  }
  return getLocal('profile', defaultProfile);
}

export async function saveProfile(profile: Profile): Promise<void> {
  if (isFirebaseEnabled && db) {
    try {
      await setDoc(doc(db, 'portfolio', 'profile'), profile);
    } catch (e) {
      handleFirestoreError(e, OperationType.WRITE, 'portfolio/profile');
    }
  }
  saveLocal('profile', profile);
}

// 3. About
export async function getAbout(): Promise<About> {
  if (isFirebaseEnabled && db) {
    try {
      const d = await getDoc(doc(db, 'portfolio', 'about'));
      if (d.exists()) return d.data() as About;
    } catch (e) {
      console.warn("Firestore error, falling back", e);
    }
  }
  return getLocal('about', defaultAbout);
}

export async function saveAbout(about: About): Promise<void> {
  if (isFirebaseEnabled && db) {
    try {
      await setDoc(doc(db, 'portfolio', 'about'), about);
    } catch (e) {
      handleFirestoreError(e, OperationType.WRITE, 'portfolio/about');
    }
  }
  saveLocal('about', about);
}

// 4. Skills
export async function getSkills(): Promise<{ skills: Skill[]; categories: SkillCategory[] }> {
  if (isFirebaseEnabled && db) {
    try {
      const catSnap = await getDocs(collection(db, 'skillCategories'));
      const skillSnap = await getDocs(collection(db, 'skills'));
      
      const categories: SkillCategory[] = [];
      catSnap.forEach(doc => {
        categories.push({ id: doc.id, ...doc.data() } as SkillCategory);
      });
      
      const skills: Skill[] = [];
      skillSnap.forEach(doc => {
        skills.push({ id: doc.id, ...doc.data() } as Skill);
      });

      if (categories.length > 0) {
        return { skills, categories };
      }
    } catch (e) {
      console.warn("Firestore error reading skills, falling back", e);
    }
  }
  const localCats = getLocal('skill_categories', defaultSkillCategories);
  const localSkills = getLocal('skills', defaultSkills);
  return { skills: localSkills, categories: localCats };
}

export async function saveAllSkills(skills: Skill[], categories: SkillCategory[]): Promise<void> {
  saveLocal('skills', skills);
  saveLocal('skill_categories', categories);
  
  if (isFirebaseEnabled && db) {
    try {
      // For consistency, clear/rebuild collections or save individually
      for (const cat of categories) {
        await setDoc(doc(db, 'skillCategories', cat.id), { name: cat.name });
      }
      for (const sk of skills) {
        await setDoc(doc(db, 'skills', sk.id), { name: sk.name, category: sk.category });
      }
    } catch (e) {
      handleFirestoreError(e, OperationType.WRITE, 'skills');
    }
  }
}

// 5. Projects
export async function getProjects(): Promise<Project[]> {
  if (isFirebaseEnabled && db) {
    try {
      const snap = await getDocs(collection(db, 'projects'));
      const list: Project[] = [];
      snap.forEach(doc => {
        list.push({ id: doc.id, ...doc.data() } as Project);
      });
      if (list.length > 0) return list;
    } catch (e) {
      console.warn("Firestore error reading projects, falling back", e);
    }
  }
  return getLocal('projects', defaultProjects);
}

export async function saveProject(project: Project): Promise<void> {
  const current = await getProjects();
  const idx = current.findIndex(p => p.id === project.id);
  if (idx > -1) {
    current[idx] = project;
  } else {
    current.push(project);
  }
  saveLocal('projects', current);

  if (isFirebaseEnabled && db) {
    try {
      await setDoc(doc(db, 'projects', project.id), {
        name: project.name,
        description: project.description,
        techStack: project.techStack,
        githubLink: project.githubLink,
        liveLink: project.liveLink,
        image: project.image,
        featured: project.featured,
        category: project.category || 'Full-Stack Development'
      });
    } catch (e) {
      handleFirestoreError(e, OperationType.WRITE, `projects/${project.id}`);
    }
  }
}

export async function deleteProject(id: string): Promise<void> {
  const current = await getProjects();
  const filtered = current.filter(p => p.id !== id);
  saveLocal('projects', filtered);

  if (isFirebaseEnabled && db) {
    try {
      await deleteDoc(doc(db, 'projects', id));
    } catch (e) {
      handleFirestoreError(e, OperationType.DELETE, `projects/${id}`);
    }
  }
}

// 6. Research / Thesis
export async function getResearch(): Promise<Research> {
  if (isFirebaseEnabled && db) {
    try {
      const snap = await getDoc(doc(db, 'portfolio', 'research'));
      if (snap.exists()) return snap.data() as Research;
    } catch (e) {
      console.warn("Firestore error, falling back", e);
    }
  }
  return getLocal('research', defaultResearch);
}

export async function saveResearch(research: Research): Promise<void> {
  if (isFirebaseEnabled && db) {
    try {
      await setDoc(doc(db, 'portfolio', 'research'), research);
    } catch (e) {
      handleFirestoreError(e, OperationType.WRITE, 'portfolio/research');
    }
  }
  saveLocal('research', research);
}

// 7. Experiences
export async function getExperiences(): Promise<Experience[]> {
  if (isFirebaseEnabled && db) {
    try {
      const snap = await getDocs(collection(db, 'experience'));
      const list: Experience[] = [];
      snap.forEach(doc => {
        list.push({ id: doc.id, ...doc.data() } as Experience);
      });
      if (list.length > 0) return list;
    } catch (e) {
      console.warn("Firestore error reading experiences, falling back", e);
    }
  }
  return getLocal('experiences', defaultExperience);
}

export async function saveExperience(exp: Experience): Promise<void> {
  const current = await getExperiences();
  const idx = current.findIndex(p => p.id === exp.id);
  if (idx > -1) {
    current[idx] = exp;
  } else {
    current.push(exp);
  }
  saveLocal('experiences', current);

  if (isFirebaseEnabled && db) {
    try {
      await setDoc(doc(db, 'experience', exp.id), {
        role: exp.role,
        company: exp.company,
        duration: exp.duration,
        logo: exp.logo,
        bulletPoints: exp.bulletPoints
      });
    } catch (e) {
      handleFirestoreError(e, OperationType.WRITE, `experience/${exp.id}`);
    }
  }
}

export async function deleteExperience(id: string): Promise<void> {
  const current = await getExperiences();
  const filtered = current.filter(p => p.id !== id);
  saveLocal('experiences', filtered);

  if (isFirebaseEnabled && db) {
    try {
      await deleteDoc(doc(db, 'experience', id));
    } catch (e) {
      handleFirestoreError(e, OperationType.DELETE, `experience/${id}`);
    }
  }
}

// 8. Courses
export async function getCourses(): Promise<Course[]> {
  if (isFirebaseEnabled && db) {
    try {
      const snap = await getDocs(collection(db, 'courses'));
      const list: Course[] = [];
      snap.forEach(doc => {
        list.push({ id: doc.id, ...doc.data() } as Course);
      });
      if (list.length > 0) return list;
    } catch (e) {
      console.warn("Firestore error loading courses, falling back", e);
    }
  }
  return getLocal('courses', defaultCourses);
}

export async function saveCourse(course: Course): Promise<void> {
  const current = await getCourses();
  const idx = current.findIndex(p => p.id === course.id);
  if (idx > -1) {
    current[idx] = course;
  } else {
    current.push(course);
  }
  saveLocal('courses', current);

  if (isFirebaseEnabled && db) {
    try {
      await setDoc(doc(db, 'courses', course.id), {
        title: course.title,
        description: course.description,
        courseLink: course.courseLink,
        thumbnail: course.thumbnail,
        category: course.category
      });
    } catch (e) {
      handleFirestoreError(e, OperationType.WRITE, `courses/${course.id}`);
    }
  }
}

export async function deleteCourse(id: string): Promise<void> {
  const current = await getCourses();
  const filtered = current.filter(p => p.id !== id);
  saveLocal('courses', filtered);

  if (isFirebaseEnabled && db) {
    try {
      await deleteDoc(doc(db, 'courses', id));
    } catch (e) {
      handleFirestoreError(e, OperationType.DELETE, `courses/${id}`);
    }
  }
}

// 9. Services
export async function getServices(): Promise<Service[]> {
  if (isFirebaseEnabled && db) {
    try {
      const snap = await getDocs(collection(db, 'services'));
      const list: Service[] = [];
      snap.forEach(doc => {
        list.push({ id: doc.id, ...doc.data() } as Service);
      });
      if (list.length > 0) return list;
    } catch (e) {
      console.warn("Firestore error loading services, falling back", e);
    }
  }
  return getLocal('services', defaultServices);
}

export async function saveService(service: Service): Promise<void> {
  const current = await getServices();
  const idx = current.findIndex(p => p.id === service.id);
  if (idx > -1) {
    current[idx] = service;
  } else {
    current.push(service);
  }
  saveLocal('services', current);

  if (isFirebaseEnabled && db) {
    try {
      await setDoc(doc(db, 'services', service.id), {
        title: service.title,
        description: service.description,
        icon: service.icon,
        pricing: service.pricing || ''
      });
    } catch (e) {
      handleFirestoreError(e, OperationType.WRITE, `services/${service.id}`);
    }
  }
}

export async function deleteService(id: string): Promise<void> {
  const current = await getServices();
  const filtered = current.filter(p => p.id !== id);
  saveLocal('services', filtered);

  if (isFirebaseEnabled && db) {
    try {
      await deleteDoc(doc(db, 'services', id));
    } catch (e) {
      handleFirestoreError(e, OperationType.DELETE, `services/${id}`);
    }
  }
}

// 10. Certifications
export async function getCertifications(): Promise<Certification[]> {
  if (isFirebaseEnabled && db) {
    try {
      const snap = await getDocs(collection(db, 'certifications'));
      const list: Certification[] = [];
      snap.forEach(doc => {
        list.push({ id: doc.id, ...doc.data() } as Certification);
      });
      if (list.length > 0) return list;
    } catch (e) {
      console.warn("Firestore error loading certs, falling back", e);
    }
  }
  return getLocal('certifications', defaultCertifications);
}

export async function saveCertification(cert: Certification): Promise<void> {
  const current = await getCertifications();
  const idx = current.findIndex(p => p.id === cert.id);
  if (idx > -1) {
    current[idx] = cert;
  } else {
    current.push(cert);
  }
  saveLocal('certifications', current);

  if (isFirebaseEnabled && db) {
    try {
      await setDoc(doc(db, 'certifications', cert.id), {
        title: cert.title,
        issuer: cert.issuer,
        year: cert.year,
        link: cert.link,
        image: cert.image
      });
    } catch (e) {
      handleFirestoreError(e, OperationType.WRITE, `certifications/${cert.id}`);
    }
  }
}

export async function deleteCertification(id: string): Promise<void> {
  const current = await getCertifications();
  const filtered = current.filter(p => p.id !== id);
  saveLocal('certifications', filtered);

  if (isFirebaseEnabled && db) {
    try {
      await deleteDoc(doc(db, 'certifications', id));
    } catch (e) {
      handleFirestoreError(e, OperationType.DELETE, `certifications/${id}`);
    }
  }
}

// 11. Education
export async function getEducations(): Promise<Education[]> {
  if (isFirebaseEnabled && db) {
    try {
      const snap = await getDocs(collection(db, 'education'));
      const list: Education[] = [];
      snap.forEach(doc => {
        list.push({ id: doc.id, ...doc.data() } as Education);
      });
      if (list.length > 0) return list;
    } catch (e) {
      console.warn("Firestore error loading education, falling back", e);
    }
  }
  return getLocal('education', defaultEducation);
}

export async function saveEducation(edu: Education): Promise<void> {
  const current = await getEducations();
  const idx = current.findIndex(p => p.id === edu.id);
  if (idx > -1) {
    current[idx] = edu;
  } else {
    current.push(edu);
  }
  saveLocal('education', current);

  if (isFirebaseEnabled && db) {
    try {
      await setDoc(doc(db, 'education', edu.id), {
        degree: edu.degree,
        school: edu.school,
        duration: edu.duration,
        cgpa: edu.cgpa,
        coursework: edu.coursework
      });
    } catch (e) {
      handleFirestoreError(e, OperationType.WRITE, `education/${edu.id}`);
    }
  }
}

export async function deleteEducation(id: string): Promise<void> {
  const current = await getEducations();
  const filtered = current.filter(p => p.id !== id);
  saveLocal('education', filtered);

  if (isFirebaseEnabled && db) {
    try {
      await deleteDoc(doc(db, 'education', id));
    } catch (e) {
      handleFirestoreError(e, OperationType.DELETE, `education/${id}`);
    }
  }
}

// 12. Contact Messages
export async function getContactMessages(): Promise<ContactMessage[]> {
  if (isFirebaseEnabled && db) {
    try {
      const snap = await getDocs(collection(db, 'messages'));
      const list: ContactMessage[] = [];
      snap.forEach(doc => {
        list.push({ id: doc.id, ...doc.data() } as ContactMessage);
      });
      return list.sort((a,b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    } catch (e) {
      console.warn("Firestore error loading messages, falling back", e);
    }
  }
  return getLocal('messages', []);
}

export async function saveContactMessage(msg: ContactMessage): Promise<void> {
  const current = await getContactMessages();
  current.unshift(msg);
  saveLocal('messages', current);

  if (isFirebaseEnabled && db) {
    try {
      await setDoc(doc(db, 'messages', msg.id), {
        name: msg.name,
        email: msg.email,
        subject: msg.subject,
        message: msg.message,
        timestamp: msg.timestamp
      });
    } catch (e) {
      handleFirestoreError(e, OperationType.WRITE, `messages/${msg.id}`);
    }
  }
}

export async function deleteContactMessage(id: string): Promise<void> {
  const current = await getContactMessages();
  const filtered = current.filter(p => p.id !== id);
  saveLocal('messages', filtered);

  if (isFirebaseEnabled && db) {
    try {
      await deleteDoc(doc(db, 'messages', id));
    } catch (e) {
      handleFirestoreError(e, OperationType.DELETE, `messages/${id}`);
    }
  }
}

// 13. CV File Manager (Base64 storage in Firestore allows pure-client CV downloads)
export async function getCv(): Promise<CvFile | null> {
  if (isFirebaseEnabled && db) {
    try {
      const snap = await getDoc(doc(db, 'portfolio', 'cv'));
      if (snap.exists()) {
        return snap.data() as CvFile;
      }
    } catch (e) {
      console.warn("Firestore error checking CV, falling back", e);
    }
  }
  return getLocal('cv', null);
}

export async function saveCv(cv: CvFile): Promise<void> {
  saveLocal('cv', cv);

  if (isFirebaseEnabled && db) {
    try {
      await setDoc(doc(db, 'portfolio', 'cv'), cv);
    } catch (e) {
      handleFirestoreError(e, OperationType.WRITE, 'portfolio/cv');
    }
  }
}

// 14. Website Settings
export async function getWebsiteSettings(): Promise<WebsiteSettings> {
  if (isFirebaseEnabled && db) {
    try {
      const snap = await getDoc(doc(db, 'portfolio', 'settings'));
      if (snap.exists()) return snap.data() as WebsiteSettings;
    } catch (e) {
      console.warn("Firestore error reading settings, falling back", e);
    }
  }
  return getLocal('website_settings', defaultWebsiteSettings);
}

export async function saveWebsiteSettings(settings: WebsiteSettings): Promise<void> {
  if (isFirebaseEnabled && db) {
    try {
      await setDoc(doc(db, 'portfolio', 'settings'), settings);
    } catch (e) {
      handleFirestoreError(e, OperationType.WRITE, 'portfolio/settings');
    }
  }
  saveLocal('website_settings', settings);
}

// 15. Helper: Validates if Firebase integration is actually up and running
export async function validateFirebaseConnection(): Promise<boolean> {
  if (!isFirebaseEnabled || !db) return false;
  try {
    await getDocFromServer(doc(db, 'portfolio', 'probe_connection_test'));
    return true;
  } catch (error) {
    return false;
  }
}
