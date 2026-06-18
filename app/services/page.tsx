import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Shield, Server, Terminal, Key, Eye, HelpCircle, ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ServicesPage() {
  const details = [
    {
      icon: Shield,
      title: "Penetration Testing & Red Teaming",
      charge: "$699 / audit",
      description: "Comprehensive manual and automated offensive checks simulating black-hat vectors. We target web apps, APIs, mobile endpoints, and database entry points to expose vulnerabilities.",
      deliverables: [
        "OWASP Top 10 vulnerabilities coverage",
        "Custom exploit simulation scripts",
        "Detailed proof-of-concept exploit logs",
        "Executive vulnerability summary PDF"
      ]
    },
    {
      icon: Server,
      title: "Network Auditing & Hardening",
      charge: "$75 / hr (Cap: $1000)",
      description: "Deep audits of network topologies, firewall configurations, VPC boundaries, active ports, and IAM roles. We eliminate unauthorized access points and isolate critical nodes.",
      deliverables: [
        "Port scans and service version audits",
        "Firewall and WAF policy checking",
        "VPC network route security verification",
        "IAM privilege escalation risk logs"
      ]
    },
    {
      icon: Terminal,
      title: "Custom Security Tooling",
      charge: "Bespoke (Cap: $1000)",
      description: "Engineering custom security agents, hardened microservices, decoy honeypots, secure network filters, and dithered logging monitors tailored to your stack.",
      deliverables: [
        "Go / Rust / Python compiled security tools",
        "Optimized network traffic decoders",
        "Decoy services and telemetry trackers",
        "Full unit test suites and source access"
      ]
    },
    {
      icon: Key,
      title: "Secure Code Reviews",
      charge: "$75 / hr (Cap: $1000)",
      description: "Line-by-line inspection of codebase repositories to identify memory safety bugs, authorization bypasses, SQL/Command injections, and encryption flaws.",
      deliverables: [
        "Static and Dynamic analysis (SAST/DAST)",
        "Manual inspection of critical auth logic",
        "Secret leak and hardcoded keys check",
        "Remediation patch recommendations"
      ]
    },
    {
      icon: Eye,
      title: "DevSecOps Pipeline Integration",
      charge: "$999 / month",
      description: "Integrate automated compliance checks, secret scanning, dependency tracking, and vulnerability scanning directly into your GitHub Actions or GitLab CI/CD pipelines.",
      deliverables: [
        "Automated vulnerability checking in build hooks",
        "Software Bill of Materials (SBOM) generation",
        "Secret scanner keys leakage safeguards",
        "Continuous security telemetry stream"
      ]
    },
    {
      icon: HelpCircle,
      title: "Mitigation & Compliance Advisory",
      charge: "$75 / hr (Cap: $1000)",
      description: "Bespoke mitigation guidance to resolve existing audits, security compliance preparation (SOC2, ISO27001, HIPAA), and infrastructure security architecture advising.",
      deliverables: [
        "Post-audit patch verification & retesting",
        "SOC2/ISO27001 readiness review documentation",
        "Hardened network architecture design logs",
        "Direct security consultants on-call access"
      ]
    }
  ];

  return (
    <main className="min-h-screen bg-[#030303] text-gray-100 font-mono selection:bg-terminal-green/30 selection:text-terminal-green">
      <Navbar />

      <section className="px-4 py-20 md:px-6 md:py-32 relative">
        <div className="absolute top-0 right-0 w-72 h-72 bg-terminal-teal/5 blur-3xl rounded-full -z-10" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-terminal-green/5 blur-3xl rounded-full -z-10" />

        <div className="container mx-auto">
          {/* Header */}
          <div className="mb-16">
            <Link href="/" className="inline-flex items-center gap-2 text-xs text-gray-500 hover:text-terminal-green mb-6 transition-colors">
              <ArrowLeft className="h-3.5 w-3.5" /> &gt; return_to_homepage
            </Link>
            <div className="inline-block rounded border border-terminal-teal/30 bg-terminal-teal/5 px-3 py-1.5 text-xs text-terminal-teal mb-4">
              [ SERVICES_CATALOG_INDEX ]
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white md:text-5xl font-sans mb-4">
              Cybersecurity <span className="text-terminal-teal underline decoration-terminal-teal decoration-2 underline-offset-8">Engagement Services</span>
            </h1>
            <p className="text-sm text-gray-400 max-w-2xl leading-relaxed">
              Predictable, flat-rate cybersecurity audits and secure software development tailored for developers and system engineers. All custom services capped at a maximum of $1,000.
            </p>
          </div>

          {/* Catalog Grid */}
          <div className="grid gap-8 lg:grid-cols-2">
            {details.map((service, index) => {
              const Icon = service.icon;
              return (
                <div key={index} className="glow-card rounded-xl p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between mb-6">
                      <div className="inline-flex h-12 w-12 items-center justify-center rounded border border-cyber-border bg-[#050505] text-terminal-green">
                        <Icon className="h-6 w-6" />
                      </div>
                      <span className="rounded border border-terminal-green/20 bg-terminal-green/5 px-3 py-1 text-xs font-bold text-terminal-green">
                        {service.charge}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-3 uppercase tracking-tight">{service.title}</h3>
                    <p className="text-xs text-gray-400 leading-relaxed font-sans mb-6">
                      {service.description}
                    </p>

                    <div className="border-t border-cyber-border pt-4 mb-6">
                      <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">// SCOPE_DELIVERABLES</h4>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[10px] text-gray-400">
                        {service.deliverables.map((item, idx) => (
                          <li key={idx} className="flex items-center gap-1.5">
                            <span className="text-terminal-teal">&gt;</span> {item.toLowerCase()}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-2">
                    <a
                      href={`mailto:hello@zetalabs.dev?subject=Inquiry: ${service.title}`}
                      className="inline-flex items-center gap-1.5 text-xs text-terminal-teal hover:underline hover:text-white transition-colors cursor-pointer"
                    >
                      &gt; Request scope assessment <ArrowRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Banner */}
          <div className="mt-20 border border-cyber-border rounded-xl bg-black p-8 text-center max-w-4xl mx-auto relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,245,255,0.02)_0%,transparent_100%)]" />
            <h3 className="text-xl font-bold text-white mb-2 relative z-10">Ready to Start Your Security Audit?</h3>
            <p className="text-xs text-gray-400 max-w-md mx-auto mb-6 font-sans leading-relaxed relative z-10">
              Connect with our security engineering team directly to scope your network parameters, codebase sizes, and schedule an assessment.
            </p>
            <a
              href="mailto:hello@zetalabs.dev?subject=Requesting Security Audit Assessment"
              className="inline-flex items-center gap-2 rounded bg-terminal-green hover:bg-white text-black font-bold py-3 px-6 transition-colors text-xs cursor-pointer relative z-10 shadow-[0_0_10px_rgba(0,255,102,0.2)]"
            >
              &gt; Contact Security Team <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
