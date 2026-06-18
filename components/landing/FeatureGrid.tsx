"use client";

import { motion } from "framer-motion";
import { Shield, Server, Terminal, Key, Eye, HelpCircle } from "lucide-react";

const capabilities = [
    {
        icon: Shield,
        title: "Penetration Testing",
        description: "Simulate advanced persistent threats (APTs) to identify and exploit vulnerabilities before black-hat actors do.",
        color: "text-terminal-green",
        glowClass: "glow-card-green",
        tag: "OFFENSIVE_SEC"
    },
    {
        icon: Server,
        title: "Network Auditing",
        description: "Deep scans of routing, ports, VPC configurations, firewall rules, and IAM policies to eliminate unauthorized entry points.",
        color: "text-terminal-teal",
        glowClass: "glow-card",
        tag: "INFRA_HARDENING"
    },
    {
        icon: Terminal,
        title: "Custom Security Tools",
        description: "Development of custom traffic analyzers, decoy honeypots, secure microservices, and hardened binary wrappers.",
        color: "text-terminal-teal",
        glowClass: "glow-card",
        tag: "TOOL_DEV"
    },
    {
        icon: Key,
        title: "Secure Code Reviews",
        description: "Static and dynamic source code inspection (SAST/DAST) to patch memory safety, injection, and authorization logic flaws.",
        color: "text-terminal-green",
        glowClass: "glow-card-green",
        tag: "APP_SEC"
    },
    {
        icon: Eye,
        title: "DevSecOps Automation",
        description: "Integrate compliance checking, dependency scanning, and secret leak detection directly into your Git CI/CD pipelines.",
        color: "text-terminal-teal",
        glowClass: "glow-card",
        tag: "PIPELINES"
    },
    {
        icon: HelpCircle,
        title: "Mitigation Consulting",
        description: "Step-by-step advisory on emergency patching, security compliance prep (SOC2, ISO27001), and architecture hardening.",
        color: "text-terminal-green",
        glowClass: "glow-card-green",
        tag: "COMPLIANCE"
    },
];

export function FeatureGrid() {
    return (
        <section id="capabilities" className="bg-[#030303] border-t border-cyber-border px-4 py-20 md:px-6 md:py-32">
            <div className="container mx-auto">
                <div className="mx-auto mb-16 max-w-2xl text-center font-mono">
                    <div className="inline-block text-xs font-bold text-terminal-teal uppercase tracking-wider mb-3">
                        // SEC_ENGINE_CAPABILITIES
                    </div>
                    <h2 className="mb-4 text-4xl font-bold text-white font-sans">
                        Our Security <span className="text-terminal-teal underline decoration-terminal-teal decoration-2 underline-offset-8">Capabilities</span>
                    </h2>
                    <p className="text-sm text-gray-400">
                        Bespoke offensive auditing and custom defensive code development built to protect systems.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {capabilities.map((cap, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ y: -4 }}
                            className={`group relative overflow-hidden rounded-xl border border-cyber-border bg-[#0d1214]/60 p-8 transition-all font-mono ${cap.glowClass}`}
                        >
                            <div className="flex items-center justify-between mb-6">
                                <div className={`inline-flex h-12 w-12 items-center justify-center rounded-lg border border-cyber-border bg-[#050505] ${cap.color}`}>
                                    <cap.icon className="h-6 w-6" />
                                </div>
                                <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest border border-cyber-border bg-black/40 px-2 py-0.5 rounded">
                                    {cap.tag}
                                </span>
                            </div>
                            <h3 className="mb-3 text-lg font-bold text-white uppercase tracking-tight">
                                {cap.title}
                            </h3>
                            <p className="text-xs text-gray-400 leading-relaxed font-sans">
                                {cap.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
