"use client";

import { motion } from "framer-motion";

export function Stats() {
    return (
        <section className="border-y border-cyber-border bg-black px-4 py-16 text-white font-mono relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,255,102,0.01)_1px,transparent_1px)] bg-[size:100px] pointer-events-none" />
            <div className="container mx-auto grid gap-8 text-center md:grid-cols-3">
                <div className="space-y-2">
                    <h3 className="text-5xl font-bold tracking-tight text-terminal-green drop-shadow-[0_0_8px_rgba(0,255,102,0.3)]">500+</h3>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">// vulnerabilities_patched</p>
                </div>
                <div className="space-y-2">
                    <h3 className="text-5xl font-bold tracking-tight text-terminal-teal drop-shadow-[0_0_8px_rgba(0,245,255,0.3)]">10M+</h3>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">// packets_analyzed</p>
                </div>
                <div className="space-y-2">
                    <h3 className="text-5xl font-bold tracking-tight text-terminal-green drop-shadow-[0_0_8px_rgba(0,255,102,0.3)]">99.9%</h3>
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">// infrastructure_hardened</p>
                </div>
            </div>
        </section>
    );
}
