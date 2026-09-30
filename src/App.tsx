import React, { useState, useEffect, useRef } from 'react';
import {
  Layers,
  Code2,
  Brain,
  Database,
  Building2,
  Users,
  Award,
  GraduationCap,
  Mail,
  Linkedin,
  Github,
  ChevronRight,
  ExternalLink,
  Download,
  FileText,
  CheckCircle2,
  Globe2,
  Briefcase,
  Copy,
  Terminal,
  Cpu,
  Workflow,
  Sparkles,
  Server,
  ShieldCheck,
  ArrowRight,
  ArrowUp,
  Camera,
  RotateCcw,
  X
} from 'lucide-react';

// Executive headshot generated matching Vivek Kumar's likeness
const DEFAULT_PORTRAIT_SRC = '/src/assets/images/vivek_kumar_real_photo_1790766671250.jpg';

interface CaseStudy {
  id: string;
  title: string;
  client: string;
  role: string;
  period: string;
  category: 'bfsi' | 'hybrid' | 'data' | 'bi';
  impactBadge: string;
  problem: string;
  architecture: string;
  techStack: string[];
  outcomes: string[];
  architectureDiagram: {
    input: string;
    processing: string;
    output: string;
    governance: string;
  };
}

export default function App() {
  const [activeTab, setActiveTab] = useState<'all' | 'bfsi' | 'hybrid' | 'data' | 'bi'>('all');
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);
  const [isCvOpen, setIsCvOpen] = useState(false);
  const [isExportHtmlOpen, setIsExportHtmlOpen] = useState(false);
  const [activeTriadNode, setActiveTriadNode] = useState<number>(0);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState<string>(() => {
    return localStorage.getItem('vivek_portfolio_avatar') || DEFAULT_PORTRAIT_SRC;
  });
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Scroll position monitor for floating scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling past hero section (approx 380px)
      if (window.scrollY > 380) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleCustomPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setProfilePhoto(result);
          try {
            localStorage.setItem('vivek_portfolio_avatar', result);
          } catch {
            // ignore quota errors if large
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const resetToDefaultPortrait = () => {
    setProfilePhoto(DEFAULT_PORTRAIT_SRC);
    localStorage.removeItem('vivek_portfolio_avatar');
  };
  
  // Recruiter form state
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    purpose: 'Technical Lead / Solution Architect Role',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Case studies data
  const caseStudies: CaseStudy[] = [
    {
      id: 'dmi-compliance',
      title: 'Automated Financial Compliance & Role-Based Workflows',
      client: 'DMI Finance',
      role: 'Technical Lead',
      period: 'Feb 2026 - Present',
      category: 'bfsi',
      impactBadge: '78% TAT Reduction · 100% Audit Readiness',
      problem:
        'Loan sanctions and high-value financial agreements previously relied on manual reviews across distributed legal and risk teams. Email handoffs resulted in 4.5 day review delays, lack of cryptographic version enforcement, and elevated regulatory audit risks.',
      architecture:
        'Engineered an enterprise SPFx document viewer within secure SharePoint Document Sets. Built multi-tier Power Automate cloud flows that dynamically calculate Delegation of Authority (DOA) matrices against Dataverse security roles with automated PDF watermarking and immutable audit logs.',
      techStack: ['SPFx', 'TypeScript', 'Power Automate', 'Dataverse', 'SharePoint REST', 'Azure Key Vault'],
      outcomes: [
        'Reduced compliance review turnaround time from 4.5 days to under 18 hours.',
        'Eliminated 100% of untracked version discrepancies across 400+ monthly loan contracts.',
        'Passed enterprise BFSI internal compliance audit with zero unauthorized bypass incidents.'
      ],
      architectureDiagram: {
        input: 'Loan Agreement PDF uploaded to SharePoint Document Set',
        processing: 'Power Automate trigger evaluates DOA matrix & user claims against Dataverse',
        output: 'Dynamic approver notification sent with watermark and digital audit stamp',
        governance: 'Strict Row-Level Security (RLS) and Azure Entra ID role-based access'
      }
    },
    {
      id: 'birlasift-hybrid',
      title: 'Custom SPFx & Power Apps Hybrid Modernization',
      client: 'BirlaSoft',
      role: 'Technical Specialist (Team Lead of 7)',
      period: 'Sept 2024 - Jan 2026',
      category: 'hybrid',
      impactBadge: 'Led 7 Developers · 3.2x Faster App Load',
      problem:
        'Client possessed legacy AngularJS web applications embedded into older SharePoint sites that were sluggish, non-responsive on mobile screens, and vulnerable to security token deprecation. Standard Power Apps Canvas forms lacked the granular data-grid controls required by operations teams.',
      architecture:
        'Led an Agile squad of 7 developers building a hybrid architecture: encapsulated React/TypeScript SPFx web parts embedded directly into Canvas Power Apps via custom PCF connectors. Synchronized bidirectional state management while querying SharePoint Online REST APIs with PnPjs.',
      techStack: ['SPFx v1.18', 'React', 'TypeScript', 'Canvas Power Apps', 'PCF Controls', 'PnPjs', 'Azure DevOps'],
      outcomes: [
        'Successfully decommissioned legacy AngularJS applications across 12 business unit portals.',
        'Boosted client grid render speed by 3.2x with responsive fluid layouts across desktop and mobile.',
        'Established reusable enterprise PCF component catalog adopted by multiple internal delivery teams.'
      ],
      architectureDiagram: {
        input: 'User initiates complex record update inside Canvas Power App UI',
        processing: 'Embedded SPFx React component handles high-frequency grid calculations via PnPjs',
        output: 'State synchronized back to host Power App & committed to SharePoint REST API',
        governance: 'Token exchange via Microsoft Entra ID (Azure AD) App Registration'
      }
    },
    {
      id: 'dmi-python-pipeline',
      title: 'Automated Python & M365 REST API Data Pipeline',
      client: 'DMI Finance',
      role: 'Technical Lead',
      period: '2026',
      category: 'data',
      impactBadge: '4 Days → 18 Minutes Month-End Process',
      problem:
        'Month-end reconciliation required manual downloads of hundreds of disbursement spreadsheets uploaded to departmental SharePoint libraries. Finance teams spent 4 full working days executing manual VLOOKUPs, prone to human transposition errors and formula corruptions.',
      architecture:
        'Engineered an automated headless Python data pipeline communicating directly with SharePoint Online REST APIs using OAuth2 client credentials and Azure Key Vault. Pandas workers stream Excel workbooks into memory, validate data structures against strict financial schemas, and commit clean batches to Dataverse.',
      techStack: ['Python', 'Pandas', 'SharePoint REST API', 'Azure Key Vault', 'Dataverse', 'MS Graph API'],
      outcomes: [
        'Cut monthly reconciliation cycle from 4 business days down to 18 automated minutes.',
        'Eliminated 100% of human copy-paste errors and missed discrepancy entries.',
        'Automated real-time error logging with email triggers dispatching validation summaries to branch heads.'
      ],
      architectureDiagram: {
        input: 'Branch managers drop raw monthly loan spreadsheets into designated SharePoint folders',
        processing: 'Headless Python worker wakes via webhook, validates schemas, and flags outliers in Pandas',
        output: 'Clean normalized transactional records inserted into Microsoft Dataverse tables',
        governance: 'Encrypted API secrets stored in Azure Key Vault with automated certificate rotation'
      }
    },
    {
      id: 'ey-kpi-bi',
      title: 'Enterprise BI & Financial KPI Dashboard System',
      client: 'EY & Healthcare Clients',
      role: 'Consulting Specialist',
      period: '2021 - 2024',
      category: 'bi',
      impactBadge: 'Same-Day Decision Turnaround · 350+ Users',
      problem:
        'Executive leaders and engagement partners lacked unified visibility into operational margins and service turnaround across distributed regional practices. Report generation required a full week of manual compilation from disconnected SQL instances.',
      architecture:
        'Architected high-performance star-schema data models in Power BI Premium connected to Azure SQL databases and on-premises gateways. Wrote complex DAX calculations for dynamic currency conversion, YoY growth metrics, and deployed Row-Level Security (RLS) to enforce departmental confidentiality.',
      techStack: ['Power BI Premium', 'Azure SQL', 'DAX', 'Star Schema', 'Data Gateway', 'Power Automate Alerts'],
      outcomes: [
        'Transformed weekly manual reporting lag into sub-second live executive KPI dashboards.',
        'Empowered 350+ senior stakeholders with self-service drill-downs down to line-item transactions.',
        'Configured automated threshold breach alerts in Power Automate triggering when margins deviated by >5%.'
      ],
      architectureDiagram: {
        input: 'Heterogeneous transactions ingested from Azure SQL and legacy databases',
        processing: 'Power BI engine processes star-schema dimension tables with optimized DAX measures',
        output: 'Executive dashboard with interactive KPI cards, heatmaps, and variance forecasts',
        governance: 'Row-Level Security (RLS) strictly isolates sensitive division metrics by user identity'
      }
    }
  ];

  const filteredCases = activeTab === 'all' 
    ? caseStudies 
    : caseStudies.filter(c => c.category === activeTab);

  const triadNodes = [
    {
      title: 'Low-Code Automation & Governance',
      subtitle: 'Speed, Scalability & Guardrails',
      color: 'blue',
      icon: Layers,
      description:
        'Engineering resilient enterprise business applications using Power Apps (Canvas & Model-Driven), Power Automate cloud & desktop flows, and Dataverse schema architecture. Enforcing environment ALM (Dev/Test/Prod) and DLP policies.',
      skills: ['Canvas & Model-Driven Apps', 'Power Automate (Cloud & RPA)', 'Dataverse Solutions ALM', 'Power BI Dashboards (DAX)'],
      metrics: '>99.9% Workflow Execution Reliability'
    },
    {
      title: 'Custom Pro-Code Extension',
      subtitle: 'SPFx, React & Python Pipelines',
      color: 'cyan',
      icon: Code2,
      description:
        'Pushing beyond platform boundaries by writing custom SharePoint Framework (SPFx v1.18+) React web parts, PCF controls, TypeScript libraries, and automated Python data extraction pipelines consuming SharePoint REST & Microsoft Graph APIs.',
      skills: ['SPFx (TypeScript & React)', 'SharePoint Online REST API', 'Python Data Engineering (Pandas)', 'PnPjs & PnP PowerShell'],
      metrics: '3.2x Faster Front-End Data Rendering'
    },
    {
      title: 'Enterprise AI & Data Science',
      subtitle: 'Copilot Studio, RAG & LLMs',
      color: 'emerald',
      icon: Brain,
      description:
        'Integrating cognitive AI into everyday business operations. Deploying enterprise Copilot Studio agents, AI Builder document extraction models, and RAG architectures grounded in enterprise SharePoint documents while strictly preserving security boundaries.',
      skills: ['Microsoft Copilot Studio', 'AI Builder Document OCR', 'RAG over SharePoint Data', 'Claude Certified Architecture'],
      metrics: 'Zero-Leakage Permission-Grounded AI'
    }
  ];

  const copyEmail = () => {
    navigator.clipboard.writeText('vivekaryan432@hotmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 3000);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`[Portfolio Contact] ${formState.purpose} - ${formState.name} (${formState.company || 'Enterprise'})`);
    const body = encodeURIComponent(
      `Hello Vivek,\n\nName: ${formState.name}\nEmail: ${formState.email}\nOrganization: ${formState.company || 'Not Specified'}\nPurpose: ${formState.purpose}\n\nMessage:\n${formState.message}\n\n--\nSent from Portfolio Website`
    );
    window.location.href = `mailto:vivekaryan432@hotmail.com?subject=${subject}&body=${body}`;
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 8000);
  };

  const downloadStandaloneHtml = () => {
    window.open('/standalone-portfolio.html', '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500/20 selection:text-cyan-200">
      
      {/* 1. TOP BAR NAVIGATION (Contract-Compliant 3-Zone Header) */}
      <header className="sticky top-0 z-40 bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Zone 1: Single Brand Element */}
          <a href="#hero" className="flex items-center gap-2 group">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 group-hover:scale-125 transition-transform"></span>
            <span className="text-base sm:text-lg font-bold tracking-tight text-white">
              Vivek Kumar
            </span>
          </a>

          {/* Zone 2: Clean 5 Text Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs lg:text-sm font-medium text-slate-300">
            <a href="#matrix" className="hover:text-cyan-400 transition-colors">Architectural Triad</a>
            <a href="#case-studies" className="hover:text-cyan-400 transition-colors">Case Studies</a>
            <a href="#timeline" className="hover:text-cyan-400 transition-colors">Career & Leadership</a>
            <a href="#credentials" className="hover:text-cyan-400 transition-colors">Certifications & Tech</a>
            <a href="#contact" className="hover:text-cyan-400 transition-colors">Contact</a>
          </nav>

          {/* Zone 3: Primary Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsCvOpen(true)}
              className="px-3.5 py-1.5 text-xs font-semibold text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5 text-blue-400" />
              <span>CV Preview</span>
            </button>

            <a
              href="#contact"
              className="px-4 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors whitespace-nowrap shadow-sm"
            >
              Connect
            </a>
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section id="hero" className="relative pt-12 pb-20 md:pt-20 md:pb-28 border-b border-slate-800/80 overflow-hidden">
        {/* Ambient atmospheric backdrop */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[360px] bg-gradient-to-tr from-blue-600/10 via-cyan-500/10 to-transparent blur-3xl pointer-events-none -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Top Mobility & Relocation Readiness Indicator */}
          <div className="flex flex-wrap items-center gap-2 mb-6 text-xs text-slate-400">
            <span className="inline-flex items-center gap-1.5 text-emerald-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Open to Relocation & Global Roles
            </span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-slate-300">Target Markets: Finland · Denmark · Singapore · UAE · Global Hybrid</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-slate-400">Noida, India (IST / UTC+5:30)</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-8">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.18] text-balance">
                Technical Lead | <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-400">Power Platform, SPFx & AI</span> Solution Architect
              </h1>

              <p className="mt-6 text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
                Enterprise technical leader with 4+ years spearheading BFSI and IT services delivery. Bridging low-code acceleration (Power Apps, Power Automate, Dataverse), pro-code engineering (SharePoint Framework SPFx, TypeScript, Python pipelines), and modern GenAI integrations (Copilot Studio, RAG, AI Builder).
              </p>

              {/* Metrics Cards (Zero-pill, tabular figures) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-slate-800/80">
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="text-2xl lg:text-3xl font-bold font-mono text-cyan-400 tabular-nums">4+ Yrs</div>
                  <div className="text-xs text-slate-400 mt-1 font-medium">Enterprise BFSI & IT</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="text-2xl lg:text-3xl font-bold font-mono text-blue-400 tabular-nums">7+ Devs</div>
                  <div className="text-xs text-slate-400 mt-1 font-medium">Agile Engineering Led</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="text-2xl lg:text-3xl font-bold font-mono text-emerald-400 tabular-nums">8+ Depts</div>
                  <div className="text-xs text-slate-400 mt-1 font-medium">Automated End-to-End</div>
                </div>
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="text-2xl lg:text-3xl font-bold font-mono text-amber-400 tabular-nums">MBA</div>
                  <div className="text-xs text-slate-400 mt-1 font-medium">Data Science (Amity)</div>
                </div>
              </div>

              {/* Direct CTA Buttons */}
              <div className="flex flex-wrap items-center gap-4 mt-8">
                <a
                  href="#case-studies"
                  className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-sm transition-colors flex items-center gap-2"
                >
                  <Workflow className="w-4 h-4" />
                  View Architecture Case Studies
                </a>

                <button
                  onClick={() => setIsCvOpen(true)}
                  className="px-5 py-2.5 text-xs sm:text-sm font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors flex items-center gap-2"
                >
                  <Download className="w-4 h-4 text-cyan-400" />
                  Executive CV Details
                </button>

                <a
                  href="https://linkedin.com/in/vivek-kumara"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 text-xs sm:text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-900 border border-slate-800 rounded-lg transition-colors flex items-center gap-2"
                >
                  <Linkedin className="w-4 h-4 text-blue-400" />
                  LinkedIn
                </a>

                <button
                  onClick={() => setIsExportHtmlOpen(true)}
                  className="px-4 py-2.5 text-xs sm:text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-900 border border-slate-800 rounded-lg transition-colors flex items-center gap-2"
                  title="Export / Download single-file standalone HTML"
                >
                  <Code2 className="w-4 h-4 text-emerald-400" />
                  Single-File HTML
                </button>
              </div>

            </div>

            {/* Right Architecture & Profile Card */}
            <div className="lg:col-span-4">
              <div className="rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 p-6 shadow-2xl relative">
                
                <div className="flex items-center gap-4 pb-5 border-b border-slate-800">
                  <div className="w-16 h-16 rounded-xl bg-slate-800 border border-slate-700 overflow-hidden flex-shrink-0 relative group">
                    <img
                      src={profilePhoto}
                      alt="Vivek Kumar - Technical Lead & Solution Architect"
                      className="w-full h-full object-cover object-top"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        // Resilient fallback container if image fails
                        e.currentTarget.style.display = 'none';
                        const parent = e.currentTarget.parentElement;
                        if (parent) {
                          parent.innerHTML = '<div class="w-full h-full flex items-center justify-center bg-slate-800 text-cyan-400"><i class="fa-solid fa-user-tie text-2xl"></i></div>';
                        }
                      }}
                    />

                    {/* Quick photo update / upload trigger */}
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white"
                      title="Upload or change profile photo"
                      aria-label="Upload custom profile photo"
                    >
                      <Camera className="w-4 h-4 text-cyan-300" />
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleCustomPhotoUpload}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <h3 className="text-base font-bold text-white truncate">Vivek Kumar</h3>
                      {profilePhoto !== DEFAULT_PORTRAIT_SRC && (
                        <button
                          onClick={resetToDefaultPortrait}
                          className="text-[10px] text-slate-400 hover:text-cyan-400 flex items-center gap-1"
                          title="Reset to studio headshot"
                        >
                          <RotateCcw className="w-2.5 h-2.5" />
                          <span>Reset</span>
                        </button>
                      )}
                    </div>
                    <p className="text-xs text-cyan-400 font-medium">Technical Lead & Architect</p>
                    <div className="flex items-center justify-between text-[11px] text-slate-400 mt-0.5">
                      <span>DMI Finance · Ex-BirlaSoft</span>
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="text-[10px] text-cyan-400 hover:underline flex items-center gap-0.5"
                      >
                        <Camera className="w-2.5 h-2.5" />
                        <span>Change Photo</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Architecture Competency Distribution */}
                <div className="mt-5 space-y-3">
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Core Technical Weighting
                  </div>

                  <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800/80">
                    <div className="flex items-center justify-between text-xs text-slate-300 font-medium">
                      <span className="flex items-center gap-2 text-blue-400">
                        <Layers className="w-3.5 h-3.5" /> Power Apps, Automate & Dataverse
                      </span>
                      <span className="font-mono text-slate-400">95%</span>
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                      <div className="bg-blue-500 h-full rounded-full" style={{ width: '95%' }}></div>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800/80">
                    <div className="flex items-center justify-between text-xs text-slate-300 font-medium">
                      <span className="flex items-center gap-2 text-cyan-400">
                        <Code2 className="w-3.5 h-3.5" /> SPFx (TypeScript & React) Pro-Code
                      </span>
                      <span className="font-mono text-slate-400">92%</span>
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                      <div className="bg-cyan-500 h-full rounded-full" style={{ width: '92%' }}></div>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800/80">
                    <div className="flex items-center justify-between text-xs text-slate-300 font-medium">
                      <span className="flex items-center gap-2 text-emerald-400">
                        <Brain className="w-3.5 h-3.5" /> Copilot Studio, RAG & GenAI
                      </span>
                      <span className="font-mono text-slate-400">88%</span>
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                      <div className="bg-emerald-500 h-full rounded-full" style={{ width: '88%' }}></div>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800/80">
                    <div className="flex items-center justify-between text-xs text-slate-300 font-medium">
                      <span className="flex items-center gap-2 text-amber-400">
                        <Database className="w-3.5 h-3.5" /> Python ETL Pipelines & Power BI
                      </span>
                      <span className="font-mono text-slate-400">90%</span>
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                      <div className="bg-amber-500 h-full rounded-full" style={{ width: '90%' }}></div>
                    </div>
                  </div>
                </div>

                {/* Quick Contact & Verified Credentials */}
                <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-slate-500" />
                    vivekaryan432@hotmail.com
                  </span>
                  <button onClick={copyEmail} className="text-cyan-400 hover:underline flex items-center gap-1">
                    {copiedEmail ? 'Copied!' : 'Copy'}
                  </button>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. TECHNICAL VALUE PROPOSITION MATRIX: THE ARCHITECTURAL TRIAD */}
      <section id="matrix" className="py-20 bg-slate-900/40 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto">
            <div className="text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-2">
              Architectural Value Proposition Matrix
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              The Architectural Triad
            </h2>
            <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
              Modern enterprises face a dilemma between slow, expensive custom coding and chaotic, unmanaged low-code proliferation. I architect a unified triad ensuring rapid delivery, strict security governance, and next-generation AI intelligence.
            </p>
          </div>

          {/* 3-Column Architectural Highlight Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14">
            {triadNodes.map((node, index) => {
              const Icon = node.icon;
              const isSelected = activeTriadNode === index;
              return (
                <div
                  key={index}
                  onClick={() => setActiveTriadNode(index)}
                  className={`cursor-pointer rounded-2xl bg-slate-900 border p-6 transition-all flex flex-col justify-between ${
                    isSelected 
                      ? 'border-cyan-400 shadow-lg shadow-cyan-950/40 ring-1 ring-cyan-500/30' 
                      : 'border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        node.color === 'blue' 
                          ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                          : node.color === 'cyan'
                          ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                          : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                      }`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-mono text-slate-400 font-semibold">
                        0{index + 1}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white tracking-tight">{node.title}</h3>
                    <p className={`text-xs font-medium mt-1 ${
                      node.color === 'blue' ? 'text-blue-400' : node.color === 'cyan' ? 'text-cyan-400' : 'text-emerald-400'
                    }`}>
                      {node.subtitle}
                    </p>

                    <p className="mt-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {node.description}
                    </p>

                    <div className="mt-6 space-y-2">
                      {node.skills.map((skill, sIdx) => (
                        <div key={sIdx} className="flex items-center gap-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                          <span>{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
                    <span>Performance Target</span>
                    <span className="font-mono text-cyan-400 font-semibold">{node.metrics}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Interactive Triad Deep-Dive Inspector */}
          <div className="mt-12 p-6 rounded-2xl bg-slate-950 border border-slate-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Workflow className="w-4 h-4 text-cyan-400" />
                  Integrated Enterprise Data & Execution Flow
                </h4>
                <p className="text-xs text-slate-400 mt-1">
                  How Low-Code, Pro-Code SPFx, and GenAI work together in an enterprise BFSI loan compliance pipeline
                </p>
              </div>
              <div className="text-xs font-mono text-slate-400">
                Selected: <span className="text-cyan-400 font-semibold">{triadNodes[activeTriadNode].title}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-6 text-center text-xs">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                <div className="font-bold text-cyan-400 mb-1">1. Presentation</div>
                <p className="text-slate-300">Custom React SPFx Web Parts + Canvas Power Apps</p>
                <div className="text-[11px] text-slate-400 mt-2">Zero-lag responsive UI</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                <div className="font-bold text-blue-400 mb-1">2. Orchestration</div>
                <p className="text-slate-300">Power Automate Multi-Tier Cloud Flows + Python REST</p>
                <div className="text-[11px] text-slate-400 mt-2">DOA matrix verification</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                <div className="font-bold text-emerald-400 mb-1">3. Intelligence</div>
                <p className="text-slate-300">Copilot Studio + AI Builder OCR & Classification</p>
                <div className="text-[11px] text-slate-400 mt-2">RAG with tenant isolation</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                <div className="font-bold text-amber-400 mb-1">4. Intelligence & BI</div>
                <p className="text-slate-300">Dataverse + Azure SQL + Real-time Power BI</p>
                <div className="text-[11px] text-slate-400 mt-2">Sub-second executive insights</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4. DETAILED CASE STUDIES (Interactive Tabs & Deep Dive Layout) */}
      <section id="case-studies" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-slate-800/80">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-800">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-blue-400 mb-2">
              Enterprise Case Studies
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Architectural Breakdown & Verified Outcomes
            </h2>
            <p className="mt-2 text-slate-400 text-sm max-w-xl">
              Concrete breakdown of Problem, Architectural Solution, Technical Stack, and Quantified Business Impact across premier engagements.
            </p>
          </div>

          {/* Interactive Filter Tabs (Button elements with active/inactive states) */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                activeTab === 'all'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All Projects ({caseStudies.length})
            </button>
            <button
              onClick={() => setActiveTab('bfsi')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                activeTab === 'bfsi'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              BFSI & Compliance
            </button>
            <button
              onClick={() => setActiveTab('hybrid')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                activeTab === 'hybrid'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              SPFx Modernization
            </button>
            <button
              onClick={() => setActiveTab('data')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                activeTab === 'data'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Python Pipelines
            </button>
            <button
              onClick={() => setActiveTab('bi')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                activeTab === 'bi'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Power BI Dashboards
            </button>
          </div>
        </div>

        {/* Case Studies Cards */}
        <div className="space-y-8 mt-10">
          {filteredCases.map((study) => (
            <article
              key={study.id}
              className="rounded-2xl bg-slate-900/80 border border-slate-800 p-6 sm:p-8 hover:border-slate-700 transition-all"
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs text-cyan-400 font-semibold">
                    <span>{study.client}</span>
                    <span aria-hidden="true">·</span>
                    <span>{study.role}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-slate-400 font-mono">{study.period}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                    {study.title}
                  </h3>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-2.5 py-1 rounded-md">
                    {study.impactBadge}
                  </span>
                  <button
                    onClick={() => setSelectedCase(study)}
                    className="px-3 py-1 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-md transition-colors flex items-center gap-1.5"
                  >
                    <span>Blueprint</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* 3-Column Problem -> Architecture -> Outcomes */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6 pt-6 border-t border-slate-800/80">
                
                {/* 1. Problem */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                    The Problem & Context
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {study.problem}
                  </p>
                </div>

                {/* 2. Architecture & Stack */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                    Architecture & Engineering
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {study.architecture}
                  </p>
                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {study.techStack.map((tech, tIdx) => (
                      <span key={tIdx} className="text-[11px] font-mono text-cyan-300 bg-slate-950 border border-slate-800 px-2 py-0.5 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 3. Business Outcome */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    Verified Business Outcome
                  </h4>
                  <ul className="text-xs sm:text-sm text-slate-300 space-y-2">
                    {study.outcomes.map((outcome, oIdx) => (
                      <li key={oIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </article>
          ))}
        </div>

      </section>

      {/* 5. CAREER TIMELINE & LEADERSHIP ACCOMPLISHMENTS */}
      <section id="timeline" className="py-20 bg-slate-900/40 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl">
            <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2">
              Career Trajectory & Growth
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Engineering Leadership & Progression
            </h2>
            <p className="mt-3 text-slate-400 text-sm sm:text-base leading-relaxed">
              Consistently progressing from specialized consulting delivery to orchestrating multi-developer teams, standardizing enterprise ALM, and aligning technical roadmaps with executive stakeholders.
            </p>
          </div>

          {/* Timeline Nodes */}
          <div className="mt-12 relative border-l border-slate-800 ml-4 sm:ml-6 space-y-12">
            
            {/* Role 1: DMI Finance */}
            <div className="relative pl-8 sm:pl-10">
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-blue-500 border-4 border-slate-950"></div>

              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-lg sm:text-xl font-bold text-white">Technical Lead</h3>
                <span className="text-xs font-mono text-blue-400 font-semibold bg-blue-950/60 border border-blue-900/60 px-2.5 py-0.5 rounded">
                  Feb 2026 - Present
                </span>
              </div>
              <div className="text-sm font-medium text-cyan-400 mt-0.5">
                DMI Finance · Noida, India (Enterprise BFSI)
              </div>

              <div className="mt-4 p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Leading enterprise SPFx portal development and mission-critical Power Platform architectures for financial loan products and executive management.
                </p>
                <ul className="text-xs sm:text-sm text-slate-300 space-y-2">
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-3.5 h-3.5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <span>Architecting responsive SPFx web parts and modern SharePoint portals for internal operational banking units.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-3.5 h-3.5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <span>Designed end-to-end Power Apps, automated multi-stage Power Automate flows, and executive CXO Power BI dashboards.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-3.5 h-3.5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <span>Engineered automated Python data extraction scripts communicating via SharePoint REST APIs for seamless monthly processing.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-3.5 h-3.5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <span>Enforcing role-based approval matrices, Dataverse security roles, and document preservation rules for regulatory compliance.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Role 2: BirlaSoft */}
            <div className="relative pl-8 sm:pl-10">
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-cyan-500 border-4 border-slate-950"></div>

              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-lg sm:text-xl font-bold text-white">Technical Specialist (Team Lead)</h3>
                <span className="text-xs font-mono text-cyan-400 font-semibold bg-cyan-950/60 border border-cyan-900/60 px-2.5 py-0.5 rounded">
                  Sept 2024 - Jan 2026
                </span>
              </div>
              <div className="text-sm font-medium text-cyan-400 mt-0.5">
                BirlaSoft · IT Services Delivery
              </div>

              <div className="mt-4 p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Directing an Agile squad of 7 software engineers across sprint cycles, technical reviews, and platform modernizations.
                </p>
                <ul className="text-xs sm:text-sm text-slate-300 space-y-2">
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span>Conducted sprint planning, daily scrums, architecture reviews, and pull request sign-offs for 7 developers.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span>Built hybrid architectures integrating custom SPFx React components inside Canvas Power Apps for enriched UX.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span>Decommissioned legacy AngularJS SharePoint web applications, upgrading to clean modern TypeScript and REST APIs.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" />
                    <span>Mentored junior engineers in Power Platform delegation, solution packaging, and Azure DevOps CI/CD pipelines.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Role 3: Enterprise Consulting Engagements */}
            <div className="relative pl-8 sm:pl-10">
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-slate-600 border-4 border-slate-950"></div>

              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-lg sm:text-xl font-bold text-white">Enterprise Consulting Engagements</h3>
                <span className="text-xs font-mono text-slate-400 font-semibold bg-slate-800/80 px-2.5 py-0.5 rounded">
                  2021 - 2024
                </span>
              </div>
              <div className="text-sm font-medium text-slate-400 mt-0.5">
                Assist Asia · Compunnel · Q3 Tech (Adani Domino) · EY · Xoriant · Technogen
              </div>

              <div className="mt-4 p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Delivered rapid enterprise workflow modernization, analytics pipelines, and tenant governance across global clients:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-slate-300">
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                    <strong className="text-white block mb-1">Assist Asia:</strong>
                    Automated approval workflows across 8 enterprise departments; built high-throughput SQL-backed Power Apps.
                  </div>
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                    <strong className="text-white block mb-1">Compunnel & Q3 (Adani Domino):</strong>
                    Built automated SQL-to-Power BI pipelines and clinical platform KPI tracking dashboards.
                  </div>
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                    <strong className="text-white block mb-1">EY (Ernst & Young):</strong>
                    Engineered executive financial dashboards reducing client turnaround from days to same-day delivery.
                  </div>
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                    <strong className="text-white block mb-1">Xoriant & Technogen:</strong>
                    Automated tenant site provisioning via PowerShell scripts; restructured enterprise taxonomy and information architecture.
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Leadership Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-14 pt-10 border-t border-slate-800">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="text-white font-bold text-sm flex items-center gap-2 mb-1">
                <Users className="w-4 h-4 text-blue-400" /> High-Velocity Engineering Squads
              </div>
              <p className="text-xs text-slate-400">Led 7 developers through Agile scrums, rigorous PR reviews, and unblocking complex delivery obstacles.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="text-white font-bold text-sm flex items-center gap-2 mb-1">
                <ShieldCheck className="w-4 h-4 text-cyan-400" /> Enterprise CoE & ALM Governance
              </div>
              <p className="text-xs text-slate-400">Implemented solution lifecycle management (ALM), environment isolation, and strict Data Loss Prevention (DLP) guardrails.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
              <div className="text-white font-bold text-sm flex items-center gap-2 mb-1">
                <Briefcase className="w-4 h-4 text-emerald-400" /> CXO & Stakeholder Advisory
              </div>
              <p className="text-xs text-slate-400">Directly collaborated with C-suite and leadership to translate regulatory requirements into dependable software systems.</p>
            </div>
          </div>

        </div>
      </section>

      {/* 6. EDUCATION, CERTIFICATIONS & TECH BADGES */}
      <section id="credentials" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-slate-800/80">
        
        <div className="text-center max-w-2xl mx-auto">
          <div className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-2">
            Credentials & Formal Qualifications
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Certifications, Education & Tech Taxonomy
          </h2>
          <p className="mt-2 text-slate-400 text-sm">
            Proven mastery validated through professional credentials and rigorous Data Science / Engineering academic degrees.
          </p>
        </div>

        {/* Highlighted Certification Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
          
          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4">
              <Sparkles className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white">Claude Certified Architect</h4>
            <p className="text-xs text-amber-400 font-medium mt-0.5">Anthropic Verified Credential</p>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Enterprise LLM architectures, RAG pipelines, function calling, tool use, and cognitive agent system design.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-blue-500/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-4">
              <Building2 className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white">PL-900 Certified</h4>
            <p className="text-xs text-blue-400 font-medium mt-0.5">Microsoft Certified</p>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Power Platform Fundamentals: Power Apps, Power Automate, Power BI, Dataverse, and security administration.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-cyan-500/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-4">
              <Award className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white">IBM Data Science Professional</h4>
            <p className="text-xs text-cyan-400 font-medium mt-0.5">IBM Professional Certification</p>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Machine learning, Python predictive analytics, data preparation pipelines, and exploratory data analysis.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-emerald-500/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
              <Globe2 className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white">Google Data Analytics</h4>
            <p className="text-xs text-emerald-400 font-medium mt-0.5">Google Professional Certification</p>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Advanced data cleaning, SQL data transformations, structured analytical problem-solving, and data visualization.
            </p>
          </div>

        </div>

        {/* Academic Degrees */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-cyan-400 flex-shrink-0">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-mono text-cyan-400 font-semibold">Postgraduate Degree</span>
              <h4 className="text-base font-bold text-white mt-0.5">MBA in Data Science</h4>
              <p className="text-xs text-slate-400 mt-1">Amity University Online</p>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Advanced academic studies blending quantitative analytical decision-making, predictive data science, business enterprise strategy, and technology management.
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-blue-400 flex-shrink-0">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-mono text-blue-400 font-semibold">Undergraduate Degree</span>
              <h4 className="text-base font-bold text-white mt-0.5">B.Tech in Electronics & Communication</h4>
              <p className="text-xs text-slate-400 mt-1">Engineering Foundation</p>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                Comprehensive engineering foundation in digital logic, microprocessors, distributed signals, algorithms, and computational architecture.
              </p>
            </div>
          </div>

        </div>

        {/* Categorized Tech Taxonomy */}
        <div className="mt-12 p-8 rounded-2xl bg-slate-900 border border-slate-800">
          <h3 className="text-base font-bold text-white mb-6 flex items-center gap-2">
            <Terminal className="w-4 h-4 text-blue-400" />
            Categorized Technical Stack & Skills
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-xs">
            
            <div>
              <h4 className="font-bold text-cyan-400 uppercase tracking-wider mb-3">Power Platform</h4>
              <div className="flex flex-wrap gap-2 text-slate-300">
                <span className="px-2.5 py-1 rounded bg-slate-950 border border-slate-800">Canvas Apps</span>
                <span className="px-2.5 py-1 rounded bg-slate-950 border border-slate-800">Model-Driven Apps</span>
                <span className="px-2.5 py-1 rounded bg-slate-950 border border-slate-800">Power Automate Flows</span>
                <span className="px-2.5 py-1 rounded bg-slate-950 border border-slate-800">Dataverse</span>
                <span className="px-2.5 py-1 rounded bg-slate-950 border border-slate-800">Power BI (DAX)</span>
                <span className="px-2.5 py-1 rounded bg-slate-950 border border-slate-800">ALM Solutions</span>
                <span className="px-2.5 py-1 rounded bg-slate-950 border border-slate-800">DLP Guardrails</span>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-blue-400 uppercase tracking-wider mb-3">SharePoint & M365</h4>
              <div className="flex flex-wrap gap-2 text-slate-300">
                <span className="px-2.5 py-1 rounded bg-slate-950 border border-slate-800">SPFx (TypeScript)</span>
                <span className="px-2.5 py-1 rounded bg-slate-950 border border-slate-800">React for SPFx</span>
                <span className="px-2.5 py-1 rounded bg-slate-950 border border-slate-800">SharePoint REST API</span>
                <span className="px-2.5 py-1 rounded bg-slate-950 border border-slate-800">Microsoft Graph API</span>
                <span className="px-2.5 py-1 rounded bg-slate-950 border border-slate-800">PnPjs & PowerShell</span>
                <span className="px-2.5 py-1 rounded bg-slate-950 border border-slate-800">Document Sets</span>
                <span className="px-2.5 py-1 rounded bg-slate-950 border border-slate-800">Taxonomy & Governance</span>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-emerald-400 uppercase tracking-wider mb-3">AI & Data Engineering</h4>
              <div className="flex flex-wrap gap-2 text-slate-300">
                <span className="px-2.5 py-1 rounded bg-slate-950 border border-slate-800">Copilot Studio</span>
                <span className="px-2.5 py-1 rounded bg-slate-950 border border-slate-800">AI Builder Models</span>
                <span className="px-2.5 py-1 rounded bg-slate-950 border border-slate-800">RAG Pipelines</span>
                <span className="px-2.5 py-1 rounded bg-slate-950 border border-slate-800">LangChain</span>
                <span className="px-2.5 py-1 rounded bg-slate-950 border border-slate-800">Python (Pandas)</span>
                <span className="px-2.5 py-1 rounded bg-slate-950 border border-slate-800">SQL & ETL Pipelines</span>
                <span className="px-2.5 py-1 rounded bg-slate-950 border border-slate-800">Claude 3.5 Sonnet & GPT-4o</span>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-amber-400 uppercase tracking-wider mb-3">Cloud, DevOps & Agile</h4>
              <div className="flex flex-wrap gap-2 text-slate-300">
                <span className="px-2.5 py-1 rounded bg-slate-950 border border-slate-800">Azure DevOps</span>
                <span className="px-2.5 py-1 rounded bg-slate-950 border border-slate-800">CI/CD YAML Pipelines</span>
                <span className="px-2.5 py-1 rounded bg-slate-950 border border-slate-800">Git & GitHub</span>
                <span className="px-2.5 py-1 rounded bg-slate-950 border border-slate-800">Jira & Agile Sprint Lead</span>
                <span className="px-2.5 py-1 rounded bg-slate-950 border border-slate-800">Architecture Reviews</span>
                <span className="px-2.5 py-1 rounded bg-slate-950 border border-slate-800">Azure Key Vault</span>
                <span className="px-2.5 py-1 rounded bg-slate-950 border border-slate-800">Microsoft Entra ID</span>
              </div>
            </div>

          </div>
        </div>

      </section>

      {/* 7. FOOTER & RECRUITER CONTACT FORM */}
      <footer id="contact" className="py-20 bg-slate-900/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left: Contact Info & Relocation Readiness */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-2">
                  Recruiter Inquiries & Hiring
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Initiate a Discussion
                </h2>
                <p className="mt-3 text-slate-300 text-sm leading-relaxed">
                  Actively evaluating positions as <strong>Technical Lead</strong>, <strong>Power Platform Solution Architect</strong>, or <strong>Lead SPFx / M365 Developer</strong>. Available for international relocation (Finland, Denmark, Singapore, UAE) or global hybrid engagements.
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-800">
                <div className="flex items-center gap-3 text-sm text-slate-300">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Direct Email</div>
                    <a href="mailto:vivekaryan432@hotmail.com" className="text-white hover:text-cyan-400 font-medium">
                      vivekaryan432@hotmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm text-slate-300">
                  <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center flex-shrink-0">
                    <Linkedin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">LinkedIn Profile</div>
                    <a
                      href="https://linkedin.com/in/vivek-kumara"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-cyan-400 font-medium"
                    >
                      linkedin.com/in/vivek-kumara
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm text-slate-300">
                  <div className="w-8 h-8 rounded-lg bg-slate-800 text-slate-300 flex items-center justify-center flex-shrink-0">
                    <Github className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">GitHub Profile</div>
                    <a
                      href="https://github.com/Vivektrav5"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-cyan-400 font-medium"
                    >
                      github.com/Vivektrav5
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm text-slate-300">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center flex-shrink-0">
                    <Globe2 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-400">Mobility & Relocation</div>
                    <div className="text-white">
                      Noida, India · Open to Relocation (Nordics, Singapore, UAE, Global)
                    </div>
                  </div>
                </div>
              </div>

              {/* Standalone HTML Feature Callout */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-bold text-white">Standalone Single-File HTML</div>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Self-contained HTML file ready for local offline opening or custom hosting.
                  </p>
                </div>
                <button
                  onClick={downloadStandaloneHtml}
                  className="px-3 py-1.5 text-xs font-semibold text-cyan-400 hover:text-white bg-cyan-950/60 hover:bg-cyan-900 border border-cyan-800/80 rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Open / Save</span>
                </button>
              </div>

            </div>

            {/* Right: Functional Recruiter Inquiry Form */}
            <div className="lg:col-span-7">
              <div className="p-6 sm:p-8 rounded-2xl bg-slate-950 border border-slate-800 shadow-xl">
                <h3 className="text-lg font-bold text-white mb-1">Send an Opportunity Brief</h3>
                <p className="text-xs text-slate-400 mb-6">
                  Provide brief details to generate a formatted direct mail proposal.
                </p>

                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="e.g. Sarah Jenkins"
                        className="w-full px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-cyan-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Your Work Email *</label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="e.g. s.jenkins@enterprise.com"
                        className="w-full px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-cyan-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Organization / Client</label>
                      <input
                        type="text"
                        value={formState.company}
                        onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                        placeholder="e.g. Nordic Financial Group / BFSI"
                        className="w-full px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-cyan-500 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Inquiry Purpose</label>
                      <select
                        value={formState.purpose}
                        onChange={(e) => setFormState({ ...formState, purpose: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs sm:text-sm focus:outline-none focus:border-cyan-500 transition-colors"
                      >
                        <option value="Technical Lead / Solution Architect Role">Technical Lead / Solution Architect Role</option>
                        <option value="Lead SPFx / M365 Development Lead">Lead SPFx / M365 Development Lead</option>
                        <option value="Relocation Offer (Finland / Denmark / Singapore / UAE)">Relocation Offer (Nordics / SG / UAE)</option>
                        <option value="Enterprise Architecture Consulting">Enterprise Architecture Consulting</option>
                        <option value="Technical Exploration / Coffee Chat">Technical Exploration / Coffee Chat</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Role Specifications or Message *</label>
                    <textarea
                      rows={4}
                      required
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Hi Vivek, we reviewed your Power Platform, SPFx, and data pipeline experience and would like to discuss..."
                      className="w-full px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-cyan-500 transition-colors"
                    ></textarea>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                    <button
                      type="submit"
                      className="px-6 py-2.5 text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-sm transition-colors flex items-center gap-2"
                    >
                      <Mail className="w-4 h-4" />
                      Send Opportunity Proposal
                    </button>
                    <span className="text-[11px] text-slate-400">
                      Directly opens mail client with formatted brief.
                    </span>
                  </div>

                  {formSubmitted && (
                    <div className="p-3 rounded-lg bg-emerald-950 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Thank you! Your default email client was initiated. You can also reach out at <strong>vivekaryan432@hotmail.com</strong>.</span>
                    </div>
                  )}
                </form>
              </div>
            </div>

          </div>

          {/* Bottom Copyright & Profile Links */}
          <div className="mt-16 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
            <div>
              &copy; 2026 Vivek Kumar. Technical Lead & Solution Architect.
            </div>
            <div className="flex items-center gap-6">
              <a href="#hero" className="hover:text-slate-200">Back to Top</a>
              <a href="https://linkedin.com/in/vivek-kumara" target="_blank" rel="noopener noreferrer" className="hover:text-slate-200">LinkedIn</a>
              <a href="https://github.com/Vivektrav5" target="_blank" rel="noopener noreferrer" className="hover:text-slate-200">GitHub</a>
              <button onClick={() => setIsExportHtmlOpen(true)} className="hover:text-cyan-400">Download Single-File HTML</button>
            </div>
          </div>

        </div>
      </footer>

      {/* MODAL 1: CASE STUDY BLUEPRINT DETAILS */}
      {selectedCase && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-mono text-cyan-400 font-semibold">{selectedCase.client} · {selectedCase.role}</span>
                <h3 className="text-lg font-bold text-white mt-0.5">{selectedCase.title}</h3>
              </div>
              <button
                onClick={() => setSelectedCase(null)}
                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-6 space-y-6 text-xs sm:text-sm text-slate-300">
              
              <div>
                <h4 className="font-bold text-white text-xs uppercase tracking-wider text-cyan-400 mb-2">
                  System Architecture Pipeline
                </h4>
                <div className="space-y-2.5">
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                    <span className="font-mono text-xs text-slate-400 block mb-1">Input Layer:</span>
                    <span className="text-white">{selectedCase.architectureDiagram.input}</span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                    <span className="font-mono text-xs text-slate-400 block mb-1">Processing & Logic:</span>
                    <span className="text-white">{selectedCase.architectureDiagram.processing}</span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                    <span className="font-mono text-xs text-slate-400 block mb-1">Output & Delivery:</span>
                    <span className="text-white">{selectedCase.architectureDiagram.output}</span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                    <span className="font-mono text-xs text-slate-400 block mb-1">Security & Governance:</span>
                    <span className="text-white">{selectedCase.architectureDiagram.governance}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-white text-xs uppercase tracking-wider text-emerald-400 mb-2">
                  Key Outcomes & Verified Metrics
                </h4>
                <ul className="space-y-1.5 list-disc list-inside">
                  {selectedCase.outcomes.map((out, idx) => (
                    <li key={idx} className="text-slate-300">{out}</li>
                  ))}
                </ul>
              </div>

            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setSelectedCase(null)}
                className="px-4 py-2 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-lg"
              >
                Close Blueprint
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: CV PREVIEW */}
      {isCvOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <h3 className="text-lg font-bold text-white">Curriculum Vitae Details</h3>
                <p className="text-xs text-slate-400">Vivek Kumar · Technical Lead - Power Platform & SPFx</p>
              </div>
              <button
                onClick={() => setIsCvOpen(false)}
                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-6 space-y-4 text-xs sm:text-sm text-slate-300">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <div className="font-bold text-white text-sm">Professional Summary</div>
                <p className="mt-1.5 text-slate-300 leading-relaxed">
                  Technical Lead with 4+ years of hands-on delivery experience across enterprise BFSI and IT consulting. Expert in Microsoft Power Platform (Canvas, Model-Driven, Dataverse, Power Automate, Power BI), SharePoint Framework (SPFx, TypeScript, React), Python ETL pipelines, and GenAI implementations (Copilot Studio, RAG). Proven Agile leader directing teams of up to 7 engineers.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <div className="font-bold text-white text-sm">Target Roles & Mobility</div>
                <div className="mt-1 text-slate-300 space-y-1">
                  <div><strong>Target Roles:</strong> Technical Lead, Power Platform Solution Architect, Lead SPFx / M365 Developer</div>
                  <div><strong>Target Relocation Markets:</strong> Finland, Denmark, Singapore, UAE (and global hybrid/remote)</div>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <div className="font-bold text-white text-sm">Education & Certifications</div>
                <ul className="mt-1.5 space-y-1 list-disc list-inside text-slate-300">
                  <li>MBA in Data Science - Amity University Online</li>
                  <li>B.Tech in Electronics & Communication Engineering</li>
                  <li>Anthropic Claude Certified Architect</li>
                  <li>Microsoft Certified: Power Platform Fundamentals (PL-900)</li>
                  <li>IBM Data Science Professional Certificate</li>
                  <li>Google Data Analytics Professional Certificate</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between gap-4">
              <button
                onClick={() => setIsCvOpen(false)}
                className="px-4 py-2 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 rounded-lg"
              >
                Close Preview
              </button>
              <a
                href="mailto:vivekaryan432@hotmail.com?subject=Request%20Official%20CV%20PDF%20-%20Vivek%20Kumar"
                className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg flex items-center gap-1.5"
              >
                <Mail className="w-3.5 h-3.5" />
                Request PDF via Email
              </a>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: EXPORT STANDALONE HTML MODAL */}
      {isExportHtmlOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                  <Code2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Standalone Single-File HTML Ready</h3>
                  <p className="text-xs text-slate-400">Pure HTML + Tailwind CDN + FontAwesome + Vanilla JS</p>
                </div>
              </div>
              <button
                onClick={() => setIsExportHtmlOpen(false)}
                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-5 space-y-3 text-xs text-slate-300 leading-relaxed">
              <p>
                As requested, a completely self-contained, single-file HTML version has been generated at <code className="text-cyan-400 font-mono">/standalone-portfolio.html</code>.
              </p>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1 text-[11px]">
                <div className="text-slate-400">Features included in single-file HTML:</div>
                <div className="flex items-center gap-1.5 text-white">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Embedded Tailwind CSS script & CDN configuration</span>
                </div>
                <div className="flex items-center gap-1.5 text-white">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>FontAwesome 6 icons + Google Fonts (Plus Jakarta Sans)</span>
                </div>
                <div className="flex items-center gap-1.5 text-white">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Lightweight Vanilla JS for dark-mode toggle, tab switching & drawer menu</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
              <button
                onClick={() => setIsExportHtmlOpen(false)}
                className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white"
              >
                Close
              </button>
              <div className="flex items-center gap-2">
                <a
                  href="/standalone-portfolio.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center gap-1.5"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Open in New Tab
                </a>
                <a
                  href="/standalone-portfolio.html"
                  download="Vivek_Kumar_Portfolio.html"
                  className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download File (.html)
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating 'Scroll-to-Top' Button */}
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className={`fixed bottom-6 right-6 z-40 p-3.5 rounded-xl bg-blue-600/90 hover:bg-blue-500 text-white shadow-xl shadow-blue-950/60 border border-blue-400/40 backdrop-blur-md transition-all duration-300 transform flex items-center justify-center group focus:outline-none focus:ring-2 focus:ring-cyan-400 ${
          showScrollTop
            ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
            : 'opacity-0 translate-y-6 scale-90 pointer-events-none'
        }`}
        title="Scroll to top"
      >
        <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
      </button>

    </div>
  );
}
