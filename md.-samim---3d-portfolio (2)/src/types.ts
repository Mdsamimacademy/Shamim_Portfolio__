export interface Profile {
  name: string;
  title: string;
  intro: string;
  profilePhoto: string;
  heroBgStyle: 'galaxy' | 'particles' | 'geometric' | 'matrix';
  github: string;
  linkedin: string;
  email: string;
  phone: string;
  bannerPhoto?: string;
}

export interface About {
  biography: string;
  summary: string;
  avatarUrl: string;
  location: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
}

export interface SkillCategory {
  id: string;
  name: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  techStack: string[];
  githubLink: string;
  liveLink: string;
  image: string;
  featured: boolean;
  category?: string; // Optional project category for organization
}

export interface Research {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  reportLink: string;
  githubLink: string;
  liveLink: string;
  image: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  duration: string;
  logo: string;
  bulletPoints: string[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  courseLink: string;
  thumbnail: string;
  category: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string; // Lucide icon name
  pricing?: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  year: string;
  link: string;
  image: string;
}

export interface Education {
  id: string;
  degree: string;
  school: string;
  duration: string;
  cgpa: string;
  coursework: string[];
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
}

export interface CvFile {
  id: string;
  fileName: string;
  fileData: string; // Base64 representation of PDF
  uploadedAt: string;
}

export interface WebsiteSettings {
  siteName: string;
  logoText: string;
  themeColor: string; // primary tailwind color or hex
  footerText: string;
  seoTitle: string;
  seoDescription: string;
}

export interface AdminUser {
  email: string;
  passwordHash: string;
  registeredAt: string;
}
