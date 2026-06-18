import { getOrganizationRepos } from "@/lib/github";
import { ArrowRight, Github, Star, GitFork, Terminal } from "lucide-react";
import Link from "next/link";

export async function LatestProject() {
    const repos = await getOrganizationRepos();

    // getOrganizationRepos sorts by pushed, so the first one is the latest
    const latestRepo = repos[0];

    if (!latestRepo) return null;

    return (
        <section className="border-b border-cyber-border bg-[#030303] px-4 py-20 md:px-6">
            <div className="container mx-auto">
                <div className="mb-12 flex flex-col items-center text-center font-mono">
                    <div className="inline-flex items-center gap-2 rounded-full border border-terminal-green/30 bg-terminal-green/5 px-4 py-1.5 text-xs text-terminal-green mb-6">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-terminal-green opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-terminal-green"></span>
                        </span>
                        [ LIVE_OFFENSIVE_TOOLING ]
                    </div>
                    <h2 className="text-4xl font-bold text-white md:text-5xl font-sans">
                        Latest Security <span className="text-terminal-teal underline decoration-terminal-teal decoration-2 underline-offset-8">Release</span>
                    </h2>
                </div>

                <div className="mx-auto max-w-4xl">
                    <div className="glow-card glow-card-green rounded-xl overflow-hidden">
                        {/* Terminal Header */}
                        <div className="terminal-header px-6 py-4 flex items-center justify-between font-mono">
                            <div className="flex items-center gap-2">
                                <Terminal className="h-4 w-4 text-terminal-green animate-pulse" />
                                <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">
                                    repo_detector.py
                                </span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                                <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 font-mono">
                            {/* Left Pane */}
                            <div className="bg-black/60 p-8 flex flex-col justify-center items-center text-center border-b md:border-b-0 md:border-r border-cyber-border min-h-[300px]">
                                <div className="mb-4 inline-flex h-20 w-20 items-center justify-center rounded-lg border border-cyber-border bg-[#0d1214] text-3xl font-black text-terminal-teal">
                                    {latestRepo.language ? latestRepo.language.slice(0, 2).toUpperCase() : "JS"}
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2 uppercase tracking-tight">{latestRepo.name}</h3>
                                <div className="flex items-center gap-4 text-gray-500 text-xs pt-2">
                                    <span className="flex items-center gap-1 hover:text-terminal-green transition-colors">
                                        <Star className="h-4 w-4 text-terminal-green" /> {latestRepo.stargazers_count}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <GitFork className="h-4 w-4" /> Forked: {latestRepo.fork ? "TRUE" : "FALSE"}
                                    </span>
                                </div>
                            </div>
                            
                            {/* Right Pane */}
                            <div className="p-8 flex flex-col justify-center bg-black/30">
                                <div className="mb-4">
                                    <span className="inline-block rounded border border-terminal-green/30 bg-terminal-green/5 px-3 py-1 text-[10px] font-bold text-terminal-green uppercase tracking-wider">
                                        {latestRepo.language || "Security Tool"}
                                    </span>
                                </div>
                                <p className="mb-8 text-xs text-gray-400 leading-relaxed font-sans">
                                    {latestRepo.readme_summary || latestRepo.description || "No public documentation parsed."}
                                </p>
                                <div className="flex gap-4">
                                    <Link
                                        href={latestRepo.html_url}
                                        target="_blank"
                                        className="flex-1 inline-flex items-center justify-center gap-2 rounded bg-terminal-teal text-black font-bold py-3.5 hover:bg-white hover:text-black transition-colors text-sm cursor-pointer"
                                    >
                                        <Github className="h-4 w-4" /> View Repo
                                    </Link>
                                    <Link
                                        href="/products"
                                        className="inline-flex items-center justify-center gap-2 rounded border border-cyber-border text-gray-400 hover:text-white font-bold px-6 py-3.5 transition-colors text-sm"
                                    >
                                        All Tools <ArrowRight className="h-4 w-4" />
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
