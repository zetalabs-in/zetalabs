import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BookOpen, GraduationCap, Cpu, Lock, Network, Award, Shield, FileText, Download, Code, Terminal } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  const researchAreas = [
    {
      icon: Shield,
      title: "Offensive Security Automation",
      description: "Designing automated fuzzer agents, runtime instrumentation, and semantic analysis to systematically expose logical security flaws in API gateways and microservices.",
    },
    {
      icon: Lock,
      title: "Applied Cryptography & Privacy",
      description: "Researching secure multi-party computation (SMPC), zero-knowledge proving systems, and post-quantum cryptographic schemes for distributed ledgers.",
    },
    {
      icon: Network,
      title: "Protocol Auditing & Formal Verification",
      description: "Analyzing network and transport-layer boundary protocols for state-machine violations and using automated tools to verify cryptographic handshake correctness.",
    },
    {
      icon: Cpu,
      title: "Hardware Security & Firmware Analysis",
      description: "Reverse engineering IoT and embedded device binaries, debugging hardware interfaces (JTAG, UART), and simulating side-channel power analysis attacks.",
    },
  ];

  const projects = [
    {
      name: "peekaboo",
      tag: "Security Tooling / Go & TS",
      description: "Stealth automated web & API vulnerability scanning engine. Employs visual state mapping and automated payload generation to detect access bypasses and SQLi.",
      link: "https://github.com/zetalabs-in",
    },
    {
      name: "packet-fuzz",
      tag: "Network Auditing / Rust",
      description: "A high-performance raw-socket packet injection and mutation testing suite designed to evaluate firewall state-tracking robustness and boundary filters.",
      link: "https://github.com/zetalabs-in",
    },
    {
      name: "ether-shield",
      tag: "Cryptography / Go",
      description: "A decentralized public-key infrastructure (PKI) and key management service utilizing Shamir's secret sharing and threshold cryptography.",
      link: "https://github.com/zetalabs-in",
    },
  ];

  const coursework = [
    "Advanced Cryptography & Number Theory",
    "Network Security Protocols & WAFs",
    "Operating Systems Design & Exploitation",
    "Database Systems & Query Optimization",
    "Penetration Testing & Red Teaming Labs",
    "Distributed Systems & Consensus Protocols",
    "Computer Networks & Packet Analysis",
    "Compiler Design & Static Analysis",
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
              <span>SYSTEM: zetalabs_telemetry // profile_index.sh</span>
            </div>
            <div className="grid gap-2 text-xs md:text-sm">
              <p><span className="text-gray-500">STUDENT_ID :</span> <span className="text-terminal-teal">ZL-2026-MSC</span></p>
              <p><span className="text-gray-500">RESEARCH_FOCUS :</span> <span className="text-terminal-green">Systems Security, Protocol Analysis & Cryptography</span></p>
              <p><span className="text-gray-500">GPA :</span> <span className="text-white">8.87 / 10.0 (Top 5% of Department)</span></p>
              <p><span className="text-gray-500">TARGET :</span> <span className="text-gray-300">Graduate Admissions - MSc Computer Science / Cybersecurity</span></p>
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
              Aspiring graduate student seeking an MSc program in Computer Science and Cybersecurity. I combine solid mathematical foundations in cryptography with practical offensive security capabilities, aiming to research automated verification and security architectures.
            </p>
          </div>

          {/* Grid Layout: Main Bio & Education Card */}
          <div className="grid gap-8 lg:grid-cols-3 mb-16">
            <div className="lg:col-span-2 space-y-6">
              <h3 className="text-xl font-bold text-white uppercase tracking-tight flex items-center gap-2 border-b border-cyber-border pb-2">
                <BookOpen className="h-5 w-5 text-terminal-teal" /> Biography & Research Interests
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed font-sans">
                My passion for security began with exploring protocol layers and firmware implementations. During my undergraduate studies, I focused on identifying systemic vulnerabilities in web services and networks, which led to founding <strong>ZetaLabs</strong>, a security research collective.
              </p>
              <p className="text-xs text-gray-400 leading-relaxed font-sans">
                In my research, I aim to solve the scalability bottleneck of manual vulnerability assessments. By combining static program analysis with runtime instrumentation and fuzzing, I build automated vulnerability scanners (like our active project <em>peekaboo</em>) that map application flow and expose logic-level flaws. My long-term goal is to contribute to formal verification methods for security-critical APIs.
              </p>

              {/* Research Areas */}
              <div className="pt-6">
                <h4 className="text-xs font-bold text-gray-200 uppercase tracking-wider mb-6">// CORE_RESEARCH_DETERMINATIONS</h4>
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

            {/* Education stats card */}
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
                    <p className="text-[10px] text-gray-500 font-sans">Specialization in Cyber Security</p>
                    <p className="text-terminal-green mt-1">GPA: 8.87 / 10.0 (First Class with Distinction)</p>
                  </div>
                  <div className="border-t border-cyber-border/60 pt-3">
                    <h4 className="font-bold text-gray-300 uppercase">// ACADEMIC_AWARDS</h4>
                    <ul className="mt-2 space-y-1.5 text-[10px] text-gray-400 font-sans">
                      <li className="flex items-start gap-1">
                        <Award className="h-3.5 w-3.5 text-terminal-teal shrink-0 mt-0.5" />
                        <span>Winner, Inter-University Capture the Flag (CTF) 2025</span>
                      </li>
                      <li className="flex items-start gap-1">
                        <Award className="h-3.5 w-3.5 text-terminal-teal shrink-0 mt-0.5" />
                        <span>Undergraduate Research Fellowship (Applied Crypto)</span>
                      </li>
                    </ul>
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

          {/* Academic Projects & Open Source */}
          <div className="mb-16">
            <h3 className="text-xl font-bold text-white uppercase tracking-tight flex items-center gap-2 border-b border-cyber-border pb-2 mb-6">
              <Code className="h-5 w-5 text-terminal-green" /> Academic & Security Tools
            </h3>
            <div className="grid gap-6 md:grid-cols-3">
              {projects.map((proj, idx) => (
                <div key={idx} className="border border-cyber-border bg-black/45 rounded-lg p-6 flex flex-col justify-between hover:border-terminal-green/40 transition-colors">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-[9px] text-terminal-green border border-terminal-green/20 bg-terminal-green/5 px-2 py-0.5 rounded uppercase font-mono">
                        {proj.tag}
                      </span>
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2 uppercase">{proj.name}</h4>
                    <p className="text-[11px] text-gray-400 leading-relaxed font-sans mb-4">{proj.description}</p>
                  </div>
                  <Link
                    href={proj.link}
                    target="_blank"
                    className="inline-flex items-center gap-1.5 text-xs text-terminal-teal hover:underline hover:text-white transition-colors mt-2"
                  >
                    &gt; view_source
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* CV Download banner */}
          <div className="border border-cyber-border rounded-xl bg-black p-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,102,0.02)_0%,transparent_100%)]" />
            <FileText className="h-10 w-10 text-terminal-green mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Academic Curriculum Vitae</h3>
            <p className="text-xs text-gray-400 max-w-md mx-auto mb-6 font-sans leading-relaxed">
              Review my comprehensive CV detailing academic publications, graduate research coursework, teaching assistant roles, and technical certifications.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="/resume.pdf"
                download
                className="inline-flex items-center justify-center gap-2 rounded bg-terminal-green hover:bg-white text-black font-bold py-3 px-6 transition-colors text-xs cursor-pointer shadow-[0_0_10px_rgba(0,255,102,0.2)]"
              >
                <Download className="h-4 w-4" /> Download CV (PDF)
              </a>
              <a
                href="mailto:hello@zetalabs.dev?subject=MSc Admissions Inquiry"
                className="inline-flex items-center justify-center gap-2 rounded border border-cyber-border hover:border-terminal-teal text-gray-400 hover:text-terminal-teal font-bold py-3 px-6 transition-colors text-xs cursor-pointer"
              >
                &gt; contact_admissions
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
