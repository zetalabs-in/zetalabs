"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Terminal, Shield, ShieldCheck, Activity, Cpu } from "lucide-react";
import * as motion from "framer-motion/client";

// Simulated raw logs feed
const LOG_POOL = [
  "[INFO] IPS checking packet integrity...",
  "[WARN] Blocked port scan from 185.220.101.44",
  "[OK] SSL/TLS handshake from 10.0.4.92 verified",
  "[SECURE] Cloud VPC nodes synchronized successfully",
  "[INFO] Refreshed firewall rulesets (v6.12)",
  "[INFO] SSH connection attempt from 192.168.1.105 rejected",
  "[INFO] Scanned 12 dependencies: 0 vulnerabilities found",
  "[OK] Database replication transaction complete",
  "[WARN] Integrity check passed: checksum verified",
  "[OK] API gateway token authenticated successfully",
];

export function Hero() {
  const [logs, setLogs] = useState<string[]>([]);
  const [threatLevel, setThreatLevel] = useState("CLEAN");
  const [packetsPerSec, setPacketsPerSec] = useState(1248);

  // Dynamic console scrolling logs simulation
  useEffect(() => {
    // Seed initial logs
    setLogs(LOG_POOL.slice(0, 4));

    const interval = setInterval(() => {
      // Append a random log from the pool
      const nextLog = LOG_POOL[Math.floor(Math.random() * LOG_POOL.length)];
      const timestamp = new Date().toLocaleTimeString();
      setLogs((prev) => [...prev.slice(-5), `[${timestamp}] ${nextLog}`]);

      // Randomize packets per sec slightly
      setPacketsPerSec(Math.floor(1200 + Math.random() * 300));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#030303] border-b border-cyber-border px-4 py-20 md:px-6 md:py-32">
      {/* Glow elements */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-terminal-teal/5 blur-3xl rounded-full -z-10" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-terminal-green/5 blur-3xl rounded-full -z-10" />

      <div className="container mx-auto grid gap-12 lg:grid-cols-2 lg:items-center">
        {/* Left Column: Heading Copy */}
        <div className="flex flex-col items-start gap-6 font-mono">
          <div className="inline-flex items-center gap-2 rounded border border-terminal-green/30 bg-terminal-green/5 px-3 py-1.5 text-xs text-terminal-green">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-terminal-green opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-terminal-green"></span>
            </span>
            [ CORE_ENGINE: ACTIVE ]
          </div>

          <div className="font-mono text-terminal-green text-sm md:text-base font-bold drop-shadow-[0_0_8px_rgba(0,255,102,0.3)] tracking-wider">
            &gt;_ Breaking in to keep them out!
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl font-sans leading-none">
            Secure Your Code.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-terminal-teal to-terminal-green underline decoration-terminal-teal/50 decoration-2 underline-offset-8">
              Defend Your Network.
            </span>
          </h1>

          <p className="max-w-xl text-sm md:text-base text-gray-400 leading-relaxed font-sans">
            ZetaLabs is a boutique offensive engineering and network auditing collective. We perform manual penetration testing, conduct secure architecture reviews, and build custom defensive software pipelines for developers.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row w-full sm:w-auto pt-2">
            <Button 
              asChild
              className="bg-terminal-green text-black font-bold hover:bg-white hover:text-black py-6 px-8 rounded-lg shadow-[0_0_15px_rgba(0,255,102,0.2)] hover:shadow-[0_0_25px_rgba(0,255,102,0.4)] transition-all cursor-pointer text-sm"
            >
              <a href="mailto:Openpages@proton.me?subject=Requesting Security Audit Assessment">
                &gt; Request Audit Quote <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button 
              asChild
              className="bg-white text-black font-bold hover:bg-gray-200 py-6 px-8 rounded-lg text-sm cursor-pointer"
            >
              <Link href="/services">
                Explore Services
              </Link>
            </Button>
          </div>
        </div>

        {/* Right Column: Redesigned Simulated Telemetry Panel */}
        <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
          <div className="relative z-10 rounded-xl border border-cyber-border bg-black/80 backdrop-blur-sm p-6 shadow-2xl font-mono">
            {/* Window Header */}
            <div className="mb-6 flex items-center justify-between border-b border-cyber-border pb-4">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              </div>
              <div className="rounded border border-cyber-border bg-[#0d1214] px-3 py-1 text-[10px] text-terminal-teal">
                monitor@zetalabs.in:~/telemetry
              </div>
            </div>

            {/* Simulated Live Statistics */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="rounded border border-cyber-border bg-[#0d1214]/60 p-3 text-center">
                <div className="flex items-center justify-center gap-1.5 text-gray-500 mb-1">
                  <Shield className="h-3 w-3 text-terminal-teal" />
                  <span className="text-[9px] uppercase tracking-wider">Firewall</span>
                </div>
                <p className="text-xs font-bold text-white uppercase">ACTIVE</p>
              </div>

              <div className="rounded border border-cyber-border bg-[#0d1214]/60 p-3 text-center">
                <div className="flex items-center justify-center gap-1.5 text-gray-500 mb-1">
                  <Activity className="h-3 w-3 text-terminal-green" />
                  <span className="text-[9px] uppercase tracking-wider">Traffic</span>
                </div>
                <p className="text-xs font-bold text-terminal-green font-mono">{packetsPerSec} P/S</p>
              </div>

              <div className="rounded border border-cyber-border bg-[#0d1214]/60 p-3 text-center">
                <div className="flex items-center justify-center gap-1.5 text-gray-500 mb-1">
                  <ShieldCheck className="h-3 w-3 text-terminal-green" />
                  <span className="text-[9px] uppercase tracking-wider">Threats</span>
                </div>
                <p className="text-xs font-bold text-terminal-green">{threatLevel}</p>
              </div>
            </div>

            {/* Dynamic Console Feed */}
            <div className="border border-cyber-border bg-[#050505] rounded p-4 mb-6 min-h-[140px] flex flex-col justify-end">
              <div className="text-[9px] text-gray-600 mb-2 uppercase tracking-wider border-b border-cyber-border/40 pb-1.5">
                // SYSTEM_FIREWALL_AUDIT_STREAM
              </div>
              <div className="space-y-1.5 text-[10px] leading-relaxed text-gray-400 font-mono overflow-y-auto max-h-[110px]">
                {logs.map((log, index) => (
                  <p key={index} className={log.includes("WARN") ? "text-red-400" : log.includes("OK") ? "text-terminal-green" : ""}>
                    {log}
                  </p>
                ))}
                <span className="inline-block w-1.5 h-3 bg-terminal-teal animate-pulse" />
              </div>
            </div>

            {/* Infrastructure Node Matrix */}
            <div className="rounded border border-cyber-border bg-[#0d1214]/40 p-4 font-mono text-[10px]">
              <div className="text-gray-500 mb-2 uppercase tracking-wider">
                // NODE_CLUSTER_HEALTH_INTEGRATION
              </div>
              <div className="grid grid-cols-2 gap-2 text-gray-400">
                <div className="flex items-center justify-between border border-cyber-border bg-[#050505] px-2.5 py-1.5 rounded">
                  <span>NODE_ALPHA_VPC</span>
                  <span className="text-terminal-green font-bold">[ ONLINE ]</span>
                </div>
                <div className="flex items-center justify-between border border-cyber-border bg-[#050505] px-2.5 py-1.5 rounded">
                  <span>NODE_BETA_WAF</span>
                  <span className="text-terminal-green font-bold">[ ONLINE ]</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
