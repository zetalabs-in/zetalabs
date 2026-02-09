"use client";

import { ProductCard } from "./ProductCard";
import { GitHubRepo } from "@/lib/github";

interface ProductListProps {
    repos: GitHubRepo[];
}

export function ProductList({ repos }: ProductListProps) {
    if (!repos || repos.length === 0) {
        return (
            <div className="text-center py-20 border-2 border-dashed border-black rounded-2xl bg-gray-50">
                <p className="text-xl font-bold text-gray-500">No public projects found for this organization.</p>
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
