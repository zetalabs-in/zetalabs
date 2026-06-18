"use client";

import { ProductCard } from "./ProductCard";
import { GitHubRepo } from "@/lib/github";

interface ProductListProps {
    repos: GitHubRepo[];
}

export function ProductList({ repos }: ProductListProps) {
    if (!repos || repos.length === 0) {
        return (
            <div className="text-center py-20 border border-dashed border-cyber-border rounded-xl bg-black font-mono">
                <p className="text-sm font-bold text-gray-500">// No security repositories index parsed at this time.</p>
            </div>
        )
    }

    return (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {repos.map((repo) => (
                <ProductCard key={repo.id} repo={repo} />
            ))}
        </div>
    );
}
