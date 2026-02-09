"use client";

import { motion } from "framer-motion";
import { Github, Star } from "lucide-react";
import Link from "next/link";
import { GitHubRepo } from "@/lib/github";

interface ProductCardProps {
    repo: GitHubRepo;
}

const COLORS = [
    "bg-brand-purple",
    "bg-brand-blue",
    "bg-brand-green",
    "bg-orange-500",
    "bg-pink-500",
    "bg-cyan-500",
];

const SHADOWS = [
    "shadow-neubrutalist-purple",
    "shadow-neubrutalist-blue",
    "shadow-neubrutalist-green",
    "hover:shadow-[4px_4px_0px_0px_#F97316]",
    "hover:shadow-[4px_4px_0px_0px_#EC4899]",
    "hover:shadow-[4px_4px_0px_0px_#06B6D4]",
];

export function ProductCard({ repo }: ProductCardProps) {
    // Deterministic color based on repo ID
    const colorIndex = repo.id % COLORS.length;
    const color = COLORS[colorIndex];
    const shadow = SHADOWS[colorIndex];
    const category = repo.language || (repo.topics && repo.topics[0]) || "Project";

    return (
        <motion.div
            whileHover={{ y: -5 }}
            className={`group relative flex flex-col overflow-hidden rounded-2xl border-4 border-black bg-white transition-all hover:shadow-neubrutalist ${shadow}`}
        >
            {/* Header / Banner */}
            <div className={`relative h-32 w-full border-b-4 border-black ${color} flex items-center justify-center p-4`}>
                <span className="text-2xl font-black text-white opacity-25 text-center break-words w-full px-2">
                    {repo.name}
                </span>
            </div>

            <div className="flex flex-1 flex-col p-6">
                <div className="mb-4 flex items-center justify-between">
                    <span className="inline-block rounded-full border-2 border-black bg-gray-100 px-3 py-1 text-xs font-bold text-black uppercase tracking-wider">
                        {category}
                    </span>
                    <div className="flex items-center gap-3">
                        {repo.stargazers_count > 0 && (
                            <div className="flex items-center gap-1 text-sm font-bold">
                                <Star className="w-4 h-4 fill-black" />
                                {repo.stargazers_count}
                            </div>
                        )}
                    </div>
                </div>

                <h3 className="mb-2 text-2xl font-black text-black break-words">{repo.name}</h3>
                <p className="mb-6 flex-1 text-base font-medium text-gray-600 line-clamp-4">
                    {repo.readme_summary || repo.description || "No description provided."}
                </p>

                <Link
                    href={repo.html_url}
                    target="_blank"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-black bg-white px-4 py-3 font-bold text-black transition-colors hover:bg-black hover:text-white"
                >
                    View on GitHub <Github className="h-5 w-5" />
                </Link>
            </div>
        </motion.div>
    );
}
