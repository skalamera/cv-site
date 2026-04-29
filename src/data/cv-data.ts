export interface Job {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string[];
  skills: string[];
  logoFile?: string;
  highlights?: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  metrics?: string;
  github?: string;
  link?: string;
  featured?: boolean;
  logo?: string;
  highlights?: string[];
  kpis?: { value: string; label: string }[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  year: string;
  url: string;
  logo?: string;
}

export const experienceIntro = {
  text: "End-to-end ownership across discovery → prioritization → delivery → adoption, collaborating closely with stakeholders and engineering.",
  cards: [
    {
      title: "Support Operations Strategy",
      description: "Workforce management, live queue health, capacity modeling, and KPI tracking"
    },
    {
      title: "Tooling & Automation Design",
      description: "Custom Python/Flask apps, automated ticket workflows, API integrations (Freshdesk/RingCentral)"
    },
    {
      title: "Cross-Functional Collaboration",
      description: "Incident management (SEV-0/1), customer journey mapping, bug triage with Engineering"
    },
    {
      title: "Agentic AI Implementation",
      description: "LLM-driven QA reviews, ML volume forecasting, custom GPTs, and automated workflows"
    },
    {
      title: "Hybrid Team Leadership",
      description: "Hiring, onboarding, performance reviews, and coaching for global/remote technical teams"
    },
    {
      title: "Data & BI Analytics",
      description: "Power BI dashboards, SQL databases, metrics centralization, and data-driven CSAT improvements"
    }
  ]
};

export const jobs: Job[] = [
  {
    id: "sigma",
    company: "Sigma",
    role: "Technical Support Engineering Manager",
    period: "Sept 2025 - Present",
    description: [
      "Lead the New York–based Technical Support Engineering team, managing hiring, onboarding, coaching, and performance for hybrid TSEs and sustaining a 4.84/5 CSAT across a high-volume enterprise customer base.",
      "Provide hands-on support on complex technical issues and integrations via live chat, email, Slack, and screen-share, owning escalations for strategic accounts and driving a 23-second average live-chat first response time.",
      "Own workforce management for the Support org, building headcount and capacity models and developing a Python-based ML forecasting app that accurately predicted ticket/chat volume and enabled proactive staffing amid rapid customer growth.",
      "Own real-time queue health and staffing strategy, building live operational dashboards and playbooks that stabilize backlog, protect SLAs, and deliver an average time to resolve of ~1.1 hours.",
      "Act as escalation lead for SEV-0/SEV-1 incidents, coordinating with Engineering, Product, and Customer Success to triage issues quickly and deliver clear, timely updates and post-incident summaries to stakeholders.",
      "Design and iterate support processes, runbooks, and AI-/data-powered tooling to reduce manual work, increase TSE productivity, and scale consistent best practices across regions."
    ],
    skills: ["Team Leadership", "Incident Management", "Python ML Forecasting", "Data-Driven Support", "Cross-Functional Collaboration"],
    logoFile: "/Sigma.jpg",
    highlights: ["Sustained 4.84/5 CSAT", "23-second chat FRT", "Built ML staffing model"]
  },
  {
    id: "benchmark",
    company: "Benchmark Education Company",
    role: "Lead, Customer Technical Support & Support Operations",
    period: "March 2022 - August 2025",
    description: [
      "Led a hybrid team of 15 support agents plus a 5-person offshore vendor team, consistently exceeding KPIs and SLAs while reporting to the Director of Technology.",
      "Automated workflows and API integrations (Freshdesk, Zendesk, RingCentral, etc.), reducing resolution time by 38% and improving first response time by 45% and average handling time by 32%, while maintaining CSAT above 98% annually.",
      "Drove the design and launch of an in-house ticketing application and AI-powered performance review platform, achieving department-wide adoption and meaningful cost savings.",
      "Built a Power BI Support Operations Hub with Python integrations and real-time call queue monitoring (RingCentral API + Freshdesk) to centralize metrics and support data-driven decisions.",
      "Led cross-functional customer journey mapping and backlog prioritization, translating support insights into product improvements and better alignment across Product, Engineering, and Customer Success."
    ],
    skills: ["Workflow Automation", "API Integrations", "Power BI", "Support Operations Hub", "Team Leadership"],
    logoFile: "/Benchmark Education Company.jpg",
    highlights: ["Reduced resolution time by 38%", "Improved FRT by 45%", "Maintained 98%+ CSAT"]
  },
  {
    id: "buildinglink",
    company: "BuildingLink",
    role: "Technical Support & Training",
    period: "October 2019 - March 2022",
    description: [
      "Hosted on-site and remote training sessions on our platform to property management companies across the country.",
      "Translated user feedback and insights into actionable bug reports and feature requests for development teams.",
      "Managed a team in adopting a new support ticketing system (Freshdesk).",
      "Assisted with the redesign of the company's help site for enhanced user-friendliness, modernity, and robustness."
    ],
    skills: ["Customer Training", "User Feedback Analysis", "Freshdesk Implementation", "Knowledge Base Redesign"],
    logoFile: "/BuildingLink.jpg" 
  },
  {
    id: "1010data",
    company: "1010 data",
    role: "Customer Experience/Technical Support Lead",
    period: "April 2016 - August 2019",
    description: [
      "Monitored, reviewed, and delivered Customer Experience staff’s KPIs weekly to upper management, including spot checking support tickets.",
      "Managed the interviewing, hiring, training, and expansion of the Customer Experience Team as one of the initial team members and a team leader.",
      "Managed all customer inquiries, and interactions on platform, excelling in conflict resolution to ensure positive customer outcomes.",
      "Constructed the Knowledge Base from the ground up within Confluence, creating a comprehensive resource for customer support."
    ],
    skills: ["KPI Monitoring", "Team Expansion", "Conflict Resolution", "Confluence Knowledge Base"],
    logoFile: "/1010data.jpg" 
  },
  {
    id: "lytx",
    company: "Lytx",
    role: "Senior Technical Support Engineer - Tier 3",
    period: "July 2014 - April 2016",
    description: [
      "Elevated and managed Tech Support incidents as the main point of escalation for the Tier 3 Tech Support team, ensuring prompt resolution for customers.",
      "Confirmed and documented technical issues, delivering rapid and effective technical solutions.",
      "Utilized basic SQL query language to troubleshoot and query large databases.",
      "Interfaced with infrastructure, databases, QA, and development teams as required to address customer issues."
    ],
    skills: ["Tier 3 Escalations", "Technical Troubleshooting", "SQL Databases", "Cross-Team Interface"],
    logoFile: "/Lytx.jpg" 
  }
];

export const projects: Project[] = [
  {
    id: "mycareermax",
    title: "myCareerMax",
    description: "An intelligent, end-to-end career management platform. Enables users to build resumes and receive automated job alerts via a robust Python/Flask backend and Azure cloud integration.",
    techStack: ["Python", "Flask", "Azure", "Docker", "Selenium"],
    metrics: "Top 10 new business app in 17 countries · ~20k global downloads",
    featured: true,
    highlights: [
      "Dynamic Resume Builder with custom templates",
      "Automated Job Alerts via Selenium web scraping",
      "Azure Cloud Integration for seamless scaling",
      "Python/Flask backend architecture",
      "Dockerized container deployment"
    ],
    kpis: [
      { value: "Top 10", label: "in 17 countries" },
      { value: "~20k", label: "global downloads" },
      { value: "5+", label: "core features" }
    ]
  },
  {
    id: "jedana",
    title: "Jedana",
    description: "AI-Powered Freshdesk Analytics Suite offering automated QA reviews (AgentEye), customer sentiment tracking, and weighted multi-channel performance reviews.",
    techStack: ["Python", "Flask", "PostgreSQL", "OpenAI API", "Freshdesk API"],
    logo: "/icons/jedana.png"
  },
  {
    id: "stephen-cv-site",
    title: "stephen-cv-site",
    description: "Interactive CV portfolio with an embedded AI assistant. Features a custom chatbot, modern glassmorphism UI, and responsive animations.",
    techStack: ["React", "Vite", "Tailwind CSS 4", "Framer Motion", "Gemini API"],
    github: "https://github.com/skalamera/stephen-cv",
    link: "http://localhost:5173",
    logo: "/profile.png"
  },
  {
    id: "motiv-proj",
    title: "Motiv",
    description: "AI-powered car maintenance assistant providing diagnostic insights, schedules, news, recalls, and multimodal interaction using Google Gemini.",
    techStack: ["Next.js 16", "Supabase", "Vercel AI SDK", "Tailwind CSS"],
    logo: "/icons/motiv.svg"
  },
  {
    id: "jayobee",
    title: "Jayobee",
    description: "A specialized Chrome extension leveraging generative AI to contextualize web text, construct dynamic CVs, and auto-fill ATS application forms.",
    techStack: ["JavaScript", "Chrome Extension API", "Gemini API", "HTML/CSS"],
    logo: "/icons/jayobee_app_icon.png"
  },
  {
    id: "harry",
    title: "HARry",
    description: "A web application that parses and analyzes HTTP Archive (HAR) files, providing detailed metrics, error tracking, and network insights.",
    techStack: ["Python", "Flask", "Web Technologies"],
    logo: "/icons/HARry.png"
  },
  {
    id: "queuety",
    title: "Queuety",
    description: "Integrated call and queue management system built over the RingCentral API, featuring OAuth2 authentication and Redis caching.",
    techStack: ["Python", "Flask", "RingCentral API", "Redis"],
    logo: "/icons/queuety.png"
  }
];

export const certifications: Certification[] = [
  { id: 'anthropic-1', name: 'Building with the Claude API', issuer: 'Anthropic', year: '2026', url: 'https://verify.skilljar.com/c/392aefqudihm', logo: '/icons/anthropic - white.png' },
  { id: 'anthropic-2', name: 'Claude Code in Action', issuer: 'Anthropic', year: '2026', url: 'https://verify.skilljar.com/c/phtqmceb829q', logo: '/icons/anthropic - white.png' },
  { id: 'anthropic-3', name: 'Introduction to Model Context Protocol', issuer: 'Anthropic', year: '2026', url: 'https://verify.skilljar.com/c/6p4gtj4etexo', logo: '/icons/anthropic - white.png' },
  { id: 'anthropic-4', name: 'AI Fluency: Framework & Foundations', issuer: 'Anthropic', year: '2026', url: 'https://verify.skilljar.com/c/ut6nt2a3jyyw', logo: '/icons/anthropic - white.png' },
  { id: 'anthropic-5', name: 'Teaching AI Fluency', issuer: 'Anthropic', year: '2026', url: 'https://verify.skilljar.com/c/6afe7gseyw3g', logo: '/icons/anthropic - white.png' },
  { id: 'anthropic-6', name: 'AI Fluency for Educators', issuer: 'Anthropic', year: '2026', url: 'https://verify.skilljar.com/c/odt8yxm5wqao', logo: '/icons/anthropic - white.png' },
  { id: 'anthropic-7', name: 'AI Fluency for Students', issuer: 'Anthropic', year: '2026', url: 'https://verify.skilljar.com/c/jieo63qnx596', logo: '/icons/anthropic - white.png' },
  { id: 'anthropic-8', name: 'AI Capability & Limitations', issuer: 'Anthropic', year: '2026', url: 'https://verify.skilljar.com/c/bm7jv8ya2ga5', logo: '/icons/anthropic - white.png' },
  { id: 'anthropic-9', name: 'Claude 101', issuer: 'Anthropic', year: '2026', url: 'https://verify.skilljar.com/c/sdtacnhwbvb4', logo: '/icons/anthropic - white.png' },
  { id: 'anthropic-10', name: 'Claude Code 101', issuer: 'Anthropic', year: '2026', url: 'https://verify.skilljar.com/c/99q7cheozygw', logo: '/icons/anthropic - white.png' },
  { id: 'anthropic-11', name: 'Claude with Amazon Bedrock', issuer: 'Anthropic', year: '2026', url: 'https://verify.skilljar.com/c/vssbp5trjbym', logo: '/icons/anthropic - white.png' },
  { id: 'anthropic-12', name: 'Claude with Google Cloud\'s Vertex AI', issuer: 'Anthropic', year: '2026', url: 'https://verify.skilljar.com/c/vbe5t299c59s', logo: '/icons/anthropic - white.png' },
  { id: 'anthropic-13', name: 'Introduction to Agent Skills', issuer: 'Anthropic', year: '2026', url: 'https://verify.skilljar.com/c/5dep4ndd2ktg', logo: '/icons/anthropic - white.png' },
  { id: 'anthropic-14', name: 'Introduction to Claude Cowork', issuer: 'Anthropic', year: '2026', url: 'https://verify.skilljar.com/c/xwv9jofumz43', logo: '/icons/anthropic - white.png' },
  { id: 'anthropic-15', name: 'Introduction to subagents', issuer: 'Anthropic', year: '2026', url: 'https://verify.skilljar.com/c/cjopo4o3ijef', logo: '/icons/anthropic - white.png' },
  { id: 'anthropic-16', name: 'Model Context Protocol: Advanced Topics', issuer: 'Anthropic', year: '2026', url: 'https://verify.skilljar.com/c/na5n22xpcqhx', logo: '/icons/anthropic - white.png' },
  { id: 'ms-1', name: 'Career Essentials in Generative AI', issuer: 'Microsoft', year: '2025', url: 'https://www.linkedin.com/learning/certificates/1feddb6d5cd67808175f3c2556d5d6a78cf96ec5f70bad1c21e2338a9d572d4c/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BDoV1FPZ1QK2QzUWtxa0I1w%3D%3D', logo: '/icons/microsoft.png' },
  { id: 'ms-2', name: 'Career Essentials in Data Analysis', issuer: 'Microsoft', year: '2023', url: 'https://www.linkedin.com/learning/certificates/569d12cbd607486e938183ef3a413fdfb1145b93163c15a05fdcd3acf1c4c409/?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BDoV1FPZ1QK2QzUWtxa0I1w%3D%3D', logo: '/icons/microsoft.png' },
  { id: 'ms-3', name: 'Career Essentials in Project Management', issuer: 'Microsoft', year: '2024', url: 'https://www.linkedin.com/learning/certificates/e8207c5048f6d23ae915ea143d4e34eb70f097323b3abe08b8e0acc26992d083?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BDoV1FPZ1QK2QzUWtxa0I1w%3D%3D', logo: '/icons/microsoft.png' },
  { id: 'zendesk-1', name: 'Customer Service Professional Certificate', issuer: 'Zendesk', year: '2025', url: 'https://www.linkedin.com/learning/certificates/351aa9290fa4cf96c93cfb308b5649c2f91cc3d5ec6e689fc57fc473c9779fb1?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_certifications_details%3BDoV1FPZ1QK2QzUWtxa0I1w%3D%3D', logo: '/icons/zendesk.png' },
  { id: 'freshdesk-1', name: 'Freshdesk Product Expert', issuer: 'Freshworks', year: '2024', url: 'https://www.freshworks.com/university/', logo: '/icons/freshdesk.png' },
  { id: 'harvard-1', name: 'CS50x - Computer Science for All', issuer: 'Harvard University', year: '2026', url: 'https://courses.edx.org/certificates/d8fbce3a4c394b2ca02cc19d93b096ca', logo: '/icons/harvard.png' },
  { id: 'babson-1', name: 'MIS01x: AI for Leaders', issuer: 'Babson College', year: '2025', url: 'https://courses.edx.org/certificates/05175c4105c4491e8593c31f0a023b8d?_gl=1*bih2k5*_gcl_au*MTYwMDM0OTU1MC4xNzc3MzkwNDgz*_ga*MTEyNDUzMjA3NS4xNzc3MzkwNDgx*_ga_D3KS4KMDT0*czE3Nzc0MTYwMzEkbzIkZzEkdDE3Nzc0MTYwNTQkajM3JGwwJGgw', logo: '/icons/babson.png' }
];

export const techStack = [
  {
    category: "AI / LLM",
    skills: [
      { name: "Gemini", icon: "/icons/gemini.png" },
      { name: "OpenAI", icon: "/icons/chatgpt.png" },
      { name: "Claude API", icon: "/icons/claude.png" },
      { name: "Anthropic / MCP", icon: "/icons/anthropic.png" }
    ]
  },
  {
    category: "SUPPORT / CRM",
    skills: [
      { name: "Freshdesk", icon: "/icons/freshdesk.png" },
      { name: "Zendesk", icon: "/icons/zendesk.png" },
      { name: "Intercom", icon: "/icons/intercom.png" },
      { name: "Salesforce", icon: "/icons/salesforce.png" },
      { name: "RingCentral", icon: "/icons/ringcentral.png" }
    ]
  },
  {
    category: "DATA & BI",
    skills: [
      { name: "Power BI", icon: "/icons/powerbi.png" },
      { name: "Tableau", icon: "/icons/tableau.png" },
      { name: "Snowflake", icon: "/icons/snowflake.png" },
      { name: "Redshift", icon: "/icons/redshift.png" },
      { name: "Sigma", icon: "/icons/sigma.png" }
    ]
  },
  {
    category: "DEV",
    skills: [
      { name: "Python", icon: "/icons/python.png" },
      { name: "JavaScript", icon: "/icons/javascript.png" },
      { name: "React", icon: "/icons/react.png" },
      { name: "Next.js", icon: "/icons/next.js.png" },
      { name: "SQL", icon: "/icons/sql.png" }
    ]
  },
  {
    category: "INFRA & TOOLS",
    skills: [
      { name: "Azure", icon: "/icons/azure.png" },
      { name: "GCP", icon: "/icons/gcp.png" },
      { name: "Vercel", icon: "/icons/vercel.png" },
      { name: "Jira", icon: "/icons/jira.png" },
      { name: "Zapier", icon: "/icons/zapier.png" }
    ]
  }
];

export const sideSkills = {
  operations: [
    "Technical Support Engineering",
    "Incident Management",
    "Customer Journey Mapping",
    "Performance Management",
    "Process Automation Design"
  ],
  leadership: [
    "Team Leadership",
    "Global Support Operations",
    "Cross-Functional Collaboration",
    "Coaching & Mentoring",
    "Conflict Resolution"
  ]
};

export const profileInfo = {
  name: "Stephen Skalamera",
  title: "Technical Support & Operations Leader",
  tagline: "Building and managing hybrid Technical Support Engineering teams that support developer- and product-facing platforms.",
  email: "skalamera@gmail.com",
  github: "https://github.com/skalamera",
  linkedin: "https://linkedin.com/in/skalamera"
};