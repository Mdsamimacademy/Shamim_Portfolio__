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
  WebsiteSettings
} from '../types';

export const defaultProfile: Profile = {
  name: "Md. Samim",
  title: "CSE Graduate | Machine Learning Enthusiast | Full-Stack Developer",
  intro: "I build intelligent web applications, machine learning solutions, and AI-powered digital content.",
  profilePhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop",
  heroBgStyle: "galaxy",
  github: "https://github.com/MdShamim5669",
  linkedin: "https://linkedin.com/in/md-samim5669",
  email: "tamjidulislamsamim@gmail.com",
  phone: "+8801743597989",
  bannerPhoto: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop"
};

export const defaultAbout: About = {
  biography: "I am a motivated Computer Science & Engineering graduate from Daffodil International University with hands-on experience in Machine Learning, AI, Full-Stack Web Development, and AI-powered content creation. I have experience building ML models, web-based prediction systems, MERN stack applications, and educational AI content.",
  summary: "Driven by curiosity, I specialize in combining data-driven machine learning models with polished, user-friendly full-stack interfaces, enabling the next generation of intelligent tools.",
  avatarUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&auto=format&fit=crop",
  location: "Dhaka, Bangladesh"
};

export const defaultSkillCategories: SkillCategory[] = [
  { id: "lang", name: "Languages" },
  { id: "front", name: "Frontend" },
  { id: "back", name: "Backend" },
  { id: "db", name: "Databases" },
  { id: "ml", name: "Machine Learning & AI" },
  { id: "tools", name: "Tools" },
  { id: "ai", name: "AI Platforms & Workflows" }
];

export const defaultSkills: Skill[] = [
  // Languages
  { id: "s1", name: "Python", category: "lang" },
  { id: "s2", name: "JavaScript", category: "lang" },
  { id: "s3", name: "TypeScript", category: "lang" },
  { id: "s4", name: "C", category: "lang" },
  { id: "s5", name: "C++", category: "lang" },
  // Frontend
  { id: "s6", name: "React.js", category: "front" },
  { id: "s7", name: "Next.js", category: "front" },
  { id: "s8", name: "HTML5", category: "front" },
  { id: "s9", name: "CSS3", category: "front" },
  { id: "s10", name: "Tailwind CSS", category: "front" },
  // Backend
  { id: "s11", name: "Node.js", category: "back" },
  { id: "s12", name: "Express.js", category: "back" },
  { id: "s13", name: "REST APIs", category: "back" },
  // Databases
  { id: "s14", name: "MongoDB", category: "db" },
  { id: "s15", name: "PostgreSQL", category: "db" },
  { id: "s16", name: "Firebase", category: "db" },
  { id: "s17", name: "Prisma ORM", category: "db" },
  // Machine Learning / AI
  { id: "s18", name: "Random Forest", category: "ml" },
  { id: "s19", name: "XGBoost", category: "ml" },
  { id: "s20", name: "LightGBM", category: "ml" },
  { id: "s21", name: "SVM", category: "ml" },
  { id: "s22", name: "Logistic Regression", category: "ml" },
  { id: "s23", name: "Naive Bayes", category: "ml" },
  { id: "s24", name: "SMOTE (Class Balancing)", category: "ml" },
  { id: "s25", name: "Data Analysis", category: "ml" },
  { id: "s26", name: "Feature Engineering", category: "ml" },
  // Tools
  { id: "s27", name: "Git", category: "tools" },
  { id: "s28", name: "GitHub", category: "tools" },
  { id: "s29", name: "Docker", category: "tools" },
  { id: "s30", name: "VS Code", category: "tools" },
  { id: "s31", name: "Google Colab", category: "tools" },
  { id: "s32", name: "MS Office", category: "tools" },
  // AI Platforms
  { id: "s33", name: "ChatGPT", category: "ai" },
  { id: "s34", name: "Claude", category: "ai" },
  { id: "s35", name: "Gemini", category: "ai" },
  { id: "s36", name: "Gamma", category: "ai" },
  { id: "s37", name: "HeyGen", category: "ai" },
  { id: "s38", name: "Cursor AI", category: "ai" },
  { id: "s39", name: "Prompt Engineering", category: "ai" },
  { id: "s40", name: "AI Workflow Automation", category: "ai" }
];

export const defaultResearch: Research = {
  id: "thesis_1",
  title: "Survey-Based Machine Learning Analysis of Social Media Influence on Youth Opinion Change in Bangladesh",
  description: "Collected and analyzed survey data from 317 Bangladeshi youths to predict political opinion change driven by social media. Applied preprocessing, feature engineering, class balancing using SMOTE, and hyperparameter optimization. Compared multiple ML models including Random Forest, Gradient Boosting, XGBoost, LightGBM, SVM, Logistic Regression, and Naive Bayes. Achieved 84.4% classification accuracy using optimized ensemble-based models. Designed a web-based prediction system prototype using Flask/FastAPI.",
  techStack: ["Python", "Scikit-learn", "Pandas", "NumPy", "Matplotlib", "Seaborn", "Flask", "FastAPI"],
  reportLink: "https://github.com/MdShamim5669",
  githubLink: "https://github.com/MdShamim5669",
  liveLink: "https://github.com/MdShamim5669",
  image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=600&auto=format&fit=crop"
};

export const defaultProjects: Project[] = [
  {
    id: "p1",
    name: "Baby Club — MERN Stack Kids Fashion E-Commerce Platform",
    description: "Built a full-stack kids fashion e-commerce platform with product listings, shopping cart, user authentication, and order management. Implemented REST APIs using Node.js and Express.js, MongoDB for data storage, and React.js for a responsive frontend UI. Integrated JWT-based authentication, admin dashboard, inventory management, and payment-ready checkout flow.",
    techStack: ["MongoDB", "Express.js", "React.js", "Node.js", "JWT", "Tailwind CSS", "Cursor AI"],
    githubLink: "https://github.com/MdShamim5669",
    liveLink: "https://github.com/MdShamim5669",
    image: "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?q=80&w=600&auto=format&fit=crop",
    featured: true,
    category: "Full-Stack Development"
  },
  {
    id: "p2",
    name: "BARPOST — Sports & Lifestyle Content Portal",
    description: "Manage and grow a Facebook content page focused on sports news, analysis, and lifestyle content. Create engaging written and visual content including match highlights, player insights, and trending sports topics. Apply AI tools for content ideation, copywriting, and post scheduling automation.",
    techStack: ["Facebook API", "AI Copywriting", "Content Strategy", "Prompt Engineering"],
    githubLink: "https://github.com/MdShamim5669",
    liveLink: "https://github.com/MdShamim5669",
    image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=600&auto=format&fit=crop",
    featured: true,
    category: "AI & Content Creation"
  }
];

export const defaultExperience: Experience[] = [
  {
    id: "exp1",
    role: "AI Content Development Intern",
    company: "ALGORIZIN",
    duration: "April 2025 – Present",
    logo: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=300&auto=format&fit=crop",
    bulletPoints: [
      "Developed AI-assisted educational content and structured learning resources for professional online courses.",
      "Used ChatGPT, Claude, Gemini, Gamma, and HeyGen to create course scripts, presentations, and instructional materials.",
      "Contributed to curriculum design, prompt engineering workflows, and AI-driven content production pipelines.",
      "Supported development of courses on AI Agents, Prompt Engineering, Digital Marketing Automation, Python for AI, and No-Code Development."
    ]
  }
];

export const defaultCourses: Course[] = [
  {
    id: "c1",
    title: "Salary Negotiation for Immigrants: H-1B, Green Card & U.S.",
    description: "Learn strategies to effectively negotiate compensations in the U.S. job market highlighting immigrant visas and H-1B credentials.",
    courseLink: "https://algorizin.com",
    thumbnail: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=500&auto=format&fit=crop",
    category: "Career Support"
  },
  {
    id: "c2",
    title: "Python for AI Masterclass in 5 Days",
    description: "An intensive beginner-to-advanced curriculum teaching Core Python, NumPy, Pandas, Scikit-learn, and prompt scripting.",
    courseLink: "https://algorizin.com",
    thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=500&auto=format&fit=crop",
    category: "Programming"
  },
  {
    id: "c3",
    title: "AI for Digital Marketing Strategy & Automation",
    description: "Leverage cutting-edge generative tools to scale content generation, automate email campaigns, and target audiences with precision.",
    courseLink: "https://algorizin.com",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=500&auto=format&fit=crop",
    category: "Digital Marketing"
  },
  {
    id: "c4",
    title: "Low-Code & No-Code Mastery",
    description: "Empower organizations to construct customized internal toolsets and enterprise automations using low-code pipelines without complex backends.",
    courseLink: "https://algorizin.com",
    thumbnail: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=500&auto=format&fit=crop",
    category: "Low-Code"
  },
  {
    id: "c5",
    title: "7 Days Claude Bootcamp: The Prompt Engineering Blueprint",
    description: "In-depth prompt blueprinting using Anthropic Claude for systemic analysis, code generation, and complex creative instruction layout.",
    courseLink: "https://algorizin.com",
    thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=500&auto=format&fit=crop",
    category: "AI Bootcamp"
  },
  {
    id: "c6",
    title: "5-Day AI Agents Bootcamp: Build Autonomous AI Systems",
    description: "Master autonomous architectures using custom system scripts, multi-agent frameworks, task loops, and tool-use endpoints.",
    courseLink: "https://algorizin.com",
    thumbnail: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=500&auto=format&fit=crop",
    category: "AI Bootcamp"
  },
  {
    id: "c7",
    title: "Agentic Organizations: The Future of Work",
    description: "A framework overview highlighting AI multi-agent teamwork, system automation, and autonomous task workers in the enterprise.",
    courseLink: "https://algorizin.com",
    thumbnail: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=500&auto=format&fit=crop",
    category: "Management"
  }
];

export const defaultServices: Service[] = [
  { id: "srv1", title: "Web Development", description: "Creating highly customized, premium full-stack and front-end user experience applications using React and Next.js.", icon: "Code", pricing: "$40/hr" },
  { id: "srv2", title: "Machine Learning Project Support", description: "Training classifier ensembles, feature preprocessing, hyperparameter fine-tuning, and model-based Flask prediction prototype builds.", icon: "Brain", pricing: "$50/hr" },
  { id: "srv3", title: "Data Analysis", description: "Handling high-volume survey analytics, preprocessing datasets with SMOTE balancing, and creating rich visual data boards.", icon: "BarChart", pricing: "$35/hr" },
  { id: "srv4", title: "Technical Writing", description: "Authoring beautiful development guides, API specifications, technology explainers, and comprehensive project README layout packages.", icon: "FileText", pricing: "$30/hr" },
  { id: "srv5", title: "Research Writing", description: "Detailing methodology chapters, model benchmark analysis reports, academic outlines, and survey predictions accurately.", icon: "BookOpen" },
  { id: "srv6", title: "Content Strategy", description: "Laying out targeted multi-channel distribution calendars, SEO-targeted topical graphs, and programmatic growth formulas.", icon: "LineChart" },
  { id: "srv7", title: "AI-Powered Content Creation", description: "Designing scripts, high-conversion presentations, and AI avatar training loops utilizing Claude, ChatGPT, Gamma, and HeyGen.", icon: "Sparkles" },
  { id: "srv8", title: "System Documentation", description: "Crafting bulletproof installation outlines, architecture flow diagrams, environment blueprints, and code explanations.", icon: "FileCode" },
  { id: "srv9", title: "Presentation Design", description: "Building gorgeous slides, investor-ready pitch materials, and interactive technical presentations styled optimally.", icon: "Tv" },
  { id: "srv10", title: "Portfolio Website Development", description: "Providing bespoke interactive portfolio design packages styled elegant-first with glassmorphism overlays.", icon: "Layout" }
];

export const defaultCertifications: Certification[] = [
  {
    id: "cert1",
    title: "AI Education Content Creator",
    issuer: "ALGORIZIN",
    year: "2026",
    link: "https://algorizin.com",
    image: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=500&auto=format&fit=crop"
  }
];

export const defaultEducation: Education[] = [
  {
    id: "edu1",
    degree: "Bachelor of Science in Computer Science & Engineering",
    school: "Daffodil International University",
    duration: "January 2022 – May 2026",
    cgpa: "3.53 / 4.00",
    coursework: ["Data Structures & Algorithms", "OOP", "Database Management", "Machine Learning", "Computer Networking"]
  }
];

export const defaultWebsiteSettings: WebsiteSettings = {
  siteName: "Md. Samim Portfolio",
  logoText: "Md. Samim",
  themeColor: "emerald", // Default color choice
  footerText: "Designed & Engineered by Md. Samim. All Rights Reserved.",
  seoTitle: "Md. Samim | CSE Graduate & Machine Learning Portfolio",
  seoDescription: "Explore Md. Samim's CSE and Machine Learning thesis background, React & full-stack development, courses authored, and customized services."
};
