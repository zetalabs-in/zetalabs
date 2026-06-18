"use client";

import { motion } from "framer-motion";
import { Github, Star, Terminal } from "lucide-react";
import Link from "next/link";
import { GitHubRepo } from "@/lib/github";

interface ProductCardProps {
    repo: GitHubRepo;
}

const GLOWS = [
    "glow-card-green",
    "glow-card",
];

const METAS = [
    "bg-terminal-green/5 text-terminal-green border-terminal-green/30",
    "bg-terminal-teal/5 text-terminal-teal border-terminal-teal/30",
];

export function ProductCard({ repo }: ProductCardProps) {
    // Deterministic style based on repo ID
    const styleIndex = repo.id % 2;
    const glowClass = GLOWS[styleIndex];
    const metaClass = METAS[styleIndex];
    const category = repo.language || (repo.topics && repo.topics[0]) || "Security Tool";

    return (
        <motion.div
            whileHover={{ y: -4 }}
            className={`group relative flex flex-col overflow-hidden rounded-xl border border-cyber-border bg-[#0d1214]/60 transition-all font-mono ${glowClass}`}
        >
            {/* Header / Banner */}
            <div className="relative h-28 w-full border-b border-cyber-border bg-[#050505] flex items-center justify-center p-4">
                <span className="text-lg font-bold text-gray-700 uppercase tracking-widest text-center break-all w-full px-2">
                    {repo.name.toLowerCase()}
                </span>
                <div className="absolute top-2 left-2 flex items-center gap-1">
                    <Terminal className="h-3.5 w-3.5 text-gray-600" />
                </div>
            </div>

            <div className="flex flex-1 flex-col p-6">
                <div className="mb-4 flex items-center justify-between">
                    <span className={`inline-block rounded border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${metaClass}`}>
                        {category}
                    </span>
                    <div className="flex items-center gap-3 text-xs">
                        {repo.stargazers_count > 0 && (
                            <div className="flex items-center gap-1 font-bold text-gray-400">
                                <Star className="w-3.5 h-3.5 text-terminal-green" />
                                {repo.stargazers_count}
                            </div>
                        )}
                    </div>
                </div>

                <h3 className="mb-2 text-lg font-bold text-white break-words uppercase tracking-tight">{repo.name}</h3>
                <p className="mb-6 flex-1 text-xs text-gray-400 leading-relaxed font-sans line-clamp-4">
                    {repo.readme_summary || repo.description || "No public documentation parsed."}
                </p>

                <Link
                    href={repo.html_url}
                    target="_blank"
                    className="inline-flex w-full items-center justify-center gap-2 rounded border border-cyber-border bg-[#050505] hover:bg-terminal-teal hover:text-black py-3 font-bold text-gray-300 hover:text-black transition-colors text-xs cursor-pointer"
                >
                    &gt; View Source <Github className="h-4 w-4" />
                </Link>
            </div>
        </motion.div>
    );
}
