import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BookOpen, GraduationCap, Cpu, Lock, Network, Award, Shield, FileText, Code, Terminal } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  const researchAreas = [
    {
      icon: Network,
      title: "Network Routing & Cloud Infrastructure",
      description: "Implementing and auditing secure hybrid network topologies, VNet peering, ExpressRoute gateways, load balancing policies, and subnet segmentations (aligning with CCNA & AZ-700 principles).",
    },
    {
      icon: Shield,
      title: "Security Operations & Threat Analysis",
      description: "Configuring telemetry logging, auditing security logs with Azure Monitor, and setting up automated incident response filters to block network intrusion (aligning with SC-200).",
    },
    {
      icon: Lock,
      title: "Identity & Secret Management",
      description: "Securing cloud-native services by eliminating plain-text credentials, enforcing zero-trust architectures, and implementing Azure Key Vault with Managed Identities.",
    },
    {
      icon: Cpu,
      title: "Container & Application Hardening",
      description: "Hardening container network namespaces via Docker configurations, isolating microservices messaging layers, and auditing database connection interfaces.",
    },
  ];

  const workExperience = [
    {
      role: "Cloud Network & Infrastructure Engineer",
      company: "Enterprise Cloud & Network Services",
      period: "Sep 2025 - Present",
      bullets: [
        "Architected and secured hybrid network topologies, VNet peerings, and firewall segmentation boundaries for microservices handling 1M+ daily transactions.",
        "Configured traffic routing policies and private endpoints for Azure Service Bus, guaranteeing 99.95% message transit reliability and data isolation.",
        "Optimized network transit paths and database connection pooling, reducing query latencies by 30% and database CPU load by 15%.",
        "Implemented secure CI/CD pipelines in GitHub Actions with automated network-policy checks, accelerating deployments by 40%.",
      ],
    },
    {
      role: "Infrastructure Security Engineer",
      company: "Network Security & Integration Consulting",
      period: "Jan 2025 - Aug 2025",
      bullets: [
        "Enforced zero-trust access control by migrating to Azure Key Vault and Managed Identities, removing all hardcoded credentials from cloud-native infrastructure.",
        "Designed and audited secure API gateway endpoints, applying rate-limiting policies, DDoS protection, and WAF rules to reduce integration latency by 25%.",
        "Configured comprehensive telemetry logging and alert rules using Azure Monitor and Log Analytics to trace traffic anomalies and reduce troubleshooting time by 20%.",
      ],
    },
    {
      role: "Junior Network & Infrastructure Engineer",
      company: "Managed Network & Systems Services",
      period: "Nov 2023 - Jan 2025",
      bullets: [
        "Deployed and segregated staging environments via Docker containers, implementing custom network bridge configurations and namespace isolation rules.",
        "Refactored hosting structures on Azure, optimizing virtual network routing and serverless ingress boundaries to reduce cloud hosting costs by 50%.",
        "Audited database stored procedures and internal query APIs, reducing system query execution times by 3x.",
      ],
    },
  ];

  const projects = [
    {
      name: "AutoPSM - Audit Automation System",
      tag: "Security Auditing / .NET & SQL",
      description: "An automated compliance auditing tool for industrial manufacturing. Handles relational schemas managing 100k+ audit records with secure indexing for real-time compliance logs.",
    },
    {
      name: "SpotLine - Resource Telemetry Agent",
      tag: "Systems / JS & DBus APIs",
      description: "An open-source Linux system resource and telemetry monitoring utility with 600+ active users, optimizing boundary checks via low-level DBus APIs.",
    },
  ];

  const certifications = [
    { name: "Cisco Certified Network Associate (CCNA)", issuer: "Cisco", status: "Scheduling this month" },
    { name: "Azure Network Engineer Associate (AZ-700)", issuer: "Microsoft", status: "Scheduling this month" },
    { name: "Security Operations Analyst (SC-200)", issuer: "Microsoft", status: "Scheduling this month" },
    { name: "Microsoft Certified: Azure Fundamentals (AZ-900)", issuer: "Microsoft", status: "Active" },
    { name: "Microsoft Certified: Azure AI Fundamentals (AI-900)", issuer: "Microsoft", status: "Active" },
    { name: "GitHub Copilot Certified", issuer: "GitHub", status: "Active" },
  ];

  const coursework = [
    "Computer Networks & Packet Routing",
    "Cryptography & Identity Security",
    "Cloud-Native Systems & Resource Management",
    "Operating Systems & Process Isolation",
    "Database Auditing & Query Optimization",
    "CI/CD Pipeline Security & Automation",
    "Subnet Segmentations & Firewall Architecting",
    "Object-Oriented Software Design",
  ];

  return (
    <main className="min-h-screen bg-[#030303] text-gray-100 font-mono selection:bg-terminal-green/30 selection:text-terminal-green">
      <Navbar />

      <section className="px-4 py-20 md:px-6 md:py-32 relative">
        <div className="absolute top-0 left-0 w-72 h-72 bg-terminal-green/5 blur-3xl rounded-full -z-10" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-terminal-teal/5 blur-3xl rounded-full -z-10" />

        <div className="container mx-auto max-w-5xl">
          {/* Terminal Intro Header */}
          <div className="mb-16 border border-cyber-border rounded-xl bg-black/40 p-6 relative overflow-hidden">
            <div className="flex items-center gap-2 border-b border-cyber-border pb-4 mb-4 text-xs text-gray-500">
              <Terminal className="h-4 w-4 text-terminal-green animate-pulse" />
              <span>SYSTEM: zetalabs_telemetry // operator_profile.sh</span>
            </div>
            <div className="grid gap-2 text-xs md:text-sm">
              <p><span className="text-gray-500">ROLE_SPEC :</span> <span className="text-terminal-teal">Network Engineer // Cybersecurity Focus</span></p>
              <p><span className="text-gray-500">QUALIFICATION :</span> <span className="text-white">B.Tech in Computer Science (GPA: 7.98/10)</span></p>
              <p><span className="text-gray-500">TARGET :</span> <span className="text-gray-300">Graduate Admissions - MSc Abroad (Computer Networks & Security)</span></p>
              <p><span className="text-gray-500">CREDENTIALS_STATUS :</span> <span className="text-terminal-green">CCNA, AZ-700 & SC-200 Scheduling Current Month</span></p>
            </div>
          </div>

          {/* Heading */}
          <div className="mb-16">
            <div className="inline-block rounded border border-terminal-green/30 bg-terminal-green/5 px-3 py-1.5 text-xs text-terminal-green mb-4">
              [ ACADEMIC_PORTFOLIO ]
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl font-sans mb-4">
              Academic Profile & <span className="text-terminal-green underline decoration-terminal-green decoration-2 underline-offset-8">Research Statement</span>
            </h1>
            <p className="text-sm text-gray-400 max-w-3xl leading-relaxed">
              Academic candidate seeking enrollment in a graduate MSc program. Focused on **Computer Networks, Infrastructure Design, and Cloud Security**. Transitioning a strong background in software engineering, API architecture, and database auditing into research on secure routing topologies and automated threat analysis.
            </p>
          </div>

          {/* Grid Layout: Main Bio & Education Card */}
          <div className="grid gap-8 lg:grid-cols-3 mb-16">
            <div className="lg:col-span-2 space-y-6">
              <h3 className="text-xl font-bold text-white uppercase tracking-tight flex items-center gap-2 border-b border-cyber-border pb-2">
                <BookOpen className="h-5 w-5 text-terminal-teal" /> Biography & Research Interests
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed font-sans">
                My professional experience has centered around cloud microservices scalability and database optimization. However, my primary research interest lies at the intersection of network architecture and defensive operations. 
              </p>
              <p className="text-xs text-gray-400 leading-relaxed font-sans">
                By pursuing graduate studies, I aim to study secure routing protocols, zero-trust network access (ZTNA), and threat telemetry automation. Having designed systems processing millions of events, I want to explore how traffic profiling and automated firewall policy generation can mitigate DDoS vectors and protect boundary interfaces.
              </p>

              {/* Research Areas */}
              <div className="pt-6">
                <h4 className="text-xs font-bold text-gray-200 uppercase tracking-wider mb-6">// CORE_INFRASTRUCTURE_FOCUS</h4>
                <div className="grid gap-6 sm:grid-cols-2">
                  {researchAreas.map((area, idx) => {
                    const Icon = area.icon;
                    return (
                      <div key={idx} className="border border-cyber-border/60 bg-black/30 rounded-lg p-4 hover:border-terminal-teal/40 transition-colors">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="h-8 w-8 rounded border border-cyber-border bg-[#050505] flex items-center justify-center text-terminal-teal">
                            <Icon className="h-4 w-4" />
                          </div>
                          <h5 className="text-xs font-bold text-white uppercase">{area.title}</h5>
                        </div>
                        <p className="text-[10px] text-gray-400 leading-relaxed font-sans">{area.description}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Education Stats Card */}
            <div className="space-y-6">
              <div className="glow-card rounded-xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-terminal-green/5 blur-xl rounded-full" />
                <h3 className="text-lg font-bold text-white uppercase tracking-tight mb-4 flex items-center gap-2 border-b border-cyber-border pb-2">
                  <GraduationCap className="h-5 w-5 text-terminal-green" /> Education
                </h3>
                <div className="space-y-4 text-xs">
                  <div>
                    <h4 className="font-bold text-gray-200 uppercase">Bachelor of Technology</h4>
                    <p className="text-gray-400 font-sans mt-0.5">Computer Science & Engineering</p>
                    <p className="text-[10px] text-gray-500 font-mono">Aug 2019 – Jul 2023</p>
                    <p className="text-terminal-green mt-1">GPA: 7.98 / 10.0</p>
                  </div>
                  <div className="border-t border-cyber-border/60 pt-3">
                    <h4 className="font-bold text-gray-300 uppercase">// ACADEMIC_SUMMARY</h4>
                    <p className="text-[10px] text-gray-400 font-sans leading-relaxed">
                      Solid foundation in algorithms, networks, database design, and systems. Completed undergraduate thesis on resource optimization.
                    </p>
                  </div>
                </div>
              </div>

              {/* Coursework Card */}
              <div className="border border-cyber-border bg-black/25 rounded-xl p-6">
                <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 border-b border-cyber-border pb-2">// COMPLETED_CORE_COURSES</h3>
                <ul className="grid grid-cols-1 gap-2 text-[10px] text-gray-400">
                  {coursework.map((course, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">
                      <span className="text-terminal-teal">&gt;</span> {course}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Certifications Section */}
          <div className="mb-16">
            <h3 className="text-xl font-bold text-white uppercase tracking-tight flex items-center gap-2 border-b border-cyber-border pb-2 mb-6">
              <Award className="h-5 w-5 text-terminal-green" /> Technical Certifications
            </h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {certifications.map((cert, idx) => (
                <div key={idx} className="border border-cyber-border bg-black/45 rounded-lg p-4 flex flex-col justify-between hover:border-terminal-green/30 transition-colors">
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase">{cert.name}</h4>
                    <p className="text-[10px] text-gray-500 mt-1">Issuer: {cert.issuer}</p>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className={`text-[9px] font-mono border rounded px-1.5 py-0.5 ${
                      cert.status.includes("Scheduling") 
                        ? "border-yellow-500/30 text-yellow-500 bg-yellow-500/5" 
                        : "border-terminal-green/30 text-terminal-green bg-terminal-green/5"
                    }`}>
                      {cert.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Professional Experience Section */}
          <div className="mb-16">
            <h3 className="text-xl font-bold text-white uppercase tracking-tight flex items-center gap-2 border-b border-cyber-border pb-2 mb-6">
              <FileText className="h-5 w-5 text-terminal-teal" /> Professional Experience
            </h3>
            <div className="space-y-8">
              {workExperience.map((exp, idx) => (
                <div key={idx} className="border border-cyber-border/60 bg-black/25 rounded-xl p-6">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4 border-b border-cyber-border/40 pb-3">
                    <div>
                      <h4 className="text-sm font-bold text-white uppercase">{exp.role}</h4>
                      <p className="text-[10px] text-gray-400 font-sans mt-0.5">{exp.company}</p>
                    </div>
                    <span className="text-[10px] text-terminal-teal font-mono bg-terminal-teal/5 border border-terminal-teal/15 px-2.5 py-0.5 rounded">
                      {exp.period}
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {exp.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2 text-xs text-gray-400 font-sans leading-relaxed">
                        <span className="text-terminal-green font-mono select-none mt-0.5">&gt;</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Academic Projects & Open Source */}
          <div className="mb-16">
            <h3 className="text-xl font-bold text-white uppercase tracking-tight flex items-center gap-2 border-b border-cyber-border pb-2 mb-6">
              <Code className="h-5 w-5 text-terminal-green" /> Projects & Tools
            </h3>
            <div className="grid gap-6 md:grid-cols-2">
              {projects.map((proj, idx) => (
                <div key={idx} className="border border-cyber-border bg-black/45 rounded-lg p-6 flex flex-col justify-between hover:border-terminal-green/40 transition-colors">
                  <div>
                    <div className="mb-4">
                      <span className="text-[9px] text-terminal-green border border-terminal-green/20 bg-terminal-green/5 px-2 py-0.5 rounded uppercase font-mono">
                        {proj.tag}
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-white mb-2 uppercase">{proj.name}</h4>
                    <p className="text-[11px] text-gray-400 leading-relaxed font-sans mb-4">{proj.description}</p>
                  </div>
                  <Link
                    href="https://github.com/zetalabs-in"
                    target="_blank"
                    className="inline-flex items-center gap-1.5 text-xs text-terminal-teal hover:underline hover:text-white transition-colors mt-2"
                  >
                    &gt; view_source
                  </Link>
                </div>
              ))}
            </div>
          </div>


        </div>
      </section>

      <Footer />
    </main>
  );
}
