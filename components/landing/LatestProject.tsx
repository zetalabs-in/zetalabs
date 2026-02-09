import { getOrganizationRepos } from "@/lib/github";
import { ArrowRight, Github, Star, GitFork } from "lucide-react";
import Link from "next/link";

export async function LatestProject() {
    const repos = await getOrganizationRepos();

    // getOrganizationRepos sorts by pushed, so the first one is the latest
    const latestRepo = repos[0];

    if (!latestRepo) return null;

    return (
        <section className="border-b-2 border-black bg-brand-yellow/10 px-4 py-20 md:px-6">
            <div className="container mx-auto">
                <div className="mb-12 flex flex-col items-center text-center">
                    <div className="inline-flex items-center gap-2 rounded-full border-2 border-black bg-black px-4 py-1.5 font-bold text-white mb-6">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        Latest Release
                    </div>
                    <h2 className="text-4xl font-black text-black md:text-5xl">
                        Fresh from the <span className="text-brand-purple underline decoration-4 underline-offset-4">Lab</span>
                    </h2>
                </div>

                <div className="mx-auto max-w-4xl">
                    <div className="group relative overflow-hidden rounded-3xl border-4 border-black bg-white shadow-neubrutalist transition-all hover:-translate-y-1 hover:shadow-neubrutalist-lg">
                        <div className="grid md:grid-cols-2">
                            <div className="bg-black p-8 flex flex-col justify-center items-center text-center border-b-4 md:border-b-0 md:border-r-4 border-black min-h-[300px]">
                                <div className="mb-4 inline-flex h-20 w-20 items-center justify-center rounded-2xl border-2 border-white/20 bg-white/10 text-4xl font-black text-white">
                                    {latestRepo.language ? latestRepo.language.slice(0, 2).toUpperCase() : "JS"}
                                </div>
                                <h3 className="text-3xl font-black text-white mb-2">{latestRepo.name}</h3>
                                <div className="flex items-center gap-4 text-white/80 font-bold font-mono text-sm">
                                    <span className="flex items-center gap-1">
                                        <Star className="h-4 w-4" /> {latestRepo.stargazers_count}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <GitFork className="h-4 w-4" /> Fork: {latestRepo.fork ? "Yes" : "No"}
                                    </span>
                                </div>
                            </div>
                            <div className="p-8 flex flex-col justify-center">
                                <div className="mb-4">
                                    <span className="inline-block rounded-full border-2 border-black bg-brand-purple px-3 py-1 text-xs font-bold text-white uppercase tracking-wider">
                                        {latestRepo.language || "Project"}
                                    </span>
                                </div>
                                <p className="mb-8 text-lg font-medium text-gray-700 leading-relaxed">
                                    {latestRepo.readme_summary || latestRepo.description || "No description provided."}
                                </p>
                                <div className="flex gap-4">
                                    <Link
                                        href={latestRepo.html_url}
                                        target="_blank"
                                        className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl border-2 border-black bg-brand-yellow px-6 py-4 font-bold text-black transition-all hover:bg-black hover:text-white"
                                    >
                                        <Github className="h-5 w-5" /> View Project
                                    </Link>
                                    <Link
                                        href="/products"
                                        className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-black bg-white px-6 py-4 font-bold text-black transition-all hover:bg-gray-100"
                                    >
                                        See All <ArrowRight className="h-5 w-5" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
