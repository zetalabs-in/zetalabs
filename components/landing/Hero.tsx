"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import * as motion from "framer-motion/client";

interface HeroProps {
    latestRepo?: {
        name: string;
        description: string | null;
        language: string | null;
    } | null;
    latestCommit?: {
        message: string;
        sha: string;
    } | null;
    languages?: Record<string, number>;
}

export function Hero({ latestRepo, latestCommit, languages }: HeroProps) {
    const topLanguages = languages ? Object.keys(languages).slice(0, 4) : [];

    return (
        <section className="relative overflow-hidden bg-white px-4 py-20 md:px-6 md:py-32">
            <div className="container mx-auto grid gap-12 lg:grid-cols-2 lg:items-center">
                {/* Left Column: Content (Unchanged) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-start gap-6"
                >
                    <div className="inline-flex items-center gap-2 rounded-full border-2 border-black bg-brand-green/10 px-4 py-1.5 font-bold text-brand-green">
                        <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-green opacity-75"></span>
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-green"></span>
                        </span>
                        New: Building the Future
                    </div>

                    <h1 className="text-5xl font-black leading-[1.1] tracking-tight text-black sm:text-6xl md:text-7xl">
                        We Build Products <br />
                        <span className="text-brand-purple underline decoration-4 underline-offset-4">
                            With Market Value
                        </span>
                    </h1>

                    <p className="max-w-xl text-lg font-medium text-brand-dark md:text-xl">
                        ZetaLabs focuses on creating high-impact digital products that solve real problems. From idea to market, we deliver value.
                    </p>

                    <div className="flex flex-col gap-4 sm:flex-row">
                        <Button variant="neubrutalist" size="lg" asChild>
                            <Link href="mailto:hello@zetalabs.dev">
                                Contact Sales <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                    </div>
                </motion.div>

                {/* Right Column: Visual Mockup */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="relative mx-auto w-full max-w-lg lg:max-w-none"
                >
                    {/* Main Card */}
                    <div className="relative z-10 rounded-2xl border-4 border-black bg-white p-6 shadow-neubrutalist md:p-8">
                        <div className="mb-6 flex items-center justify-between border-b-2 border-gray-100 pb-4">
                            <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-red-500 border-2 border-black"></div>
                                <div className="h-3 w-3 rounded-full bg-yellow-500 border-2 border-black"></div>
                                <div className="h-3 w-3 rounded-full bg-green-500 border-2 border-black"></div>
                            </div>
                            <div className="rounded border-2 border-black bg-gray-100 px-3 py-1 text-xs font-bold text-black">
                                dashboard.zetalabs.dev
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-start justify-between">
                                <div className="space-y-1">
                                    <p className="text-sm font-bold text-gray-500">Active Project</p>
                                    <h3 className="text-2xl font-black text-black">{latestRepo?.name || "Loading..."}</h3>
                                </div>
                                <div className="flex items-center gap-2 rounded-full border-2 border-black bg-green-100 px-3 py-1">
                                    <div className="h-2 w-2 animate-pulse rounded-full bg-green-500"></div>
                                    <span className="text-xs font-bold text-green-700">LIVE</span>
                                </div>
                            </div>

                            <div className="bg-gray-50 rounded-xl border-2 border-black p-4">
                                <div className="mb-3 flex items-center justify-between">
                                    <span className="text-sm font-bold text-black">Tech Stack</span>
                                    <span className="text-xs font-bold text-gray-500">Auto-Detected</span>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {topLanguages.length > 0 ? (
                                        topLanguages.map((lang) => (
                                            <span key={lang} className="rounded-lg border-2 border-black bg-white px-3 py-1 text-xs font-bold text-brand-dark shadow-sm">
                                                {lang}
                                            </span>
                                        ))
                                    ) : (
                                        <span className="text-sm text-gray-500 italic">No languages detected</span>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="rounded-xl border-2 border-black bg-yellow-50 p-4">
                                    <p className="text-xs font-bold text-yellow-700">Major Language</p>
                                    <p className="text-lg font-black text-black truncate">
                                        {latestRepo?.language || "N/A"}
                                    </p>
                                </div>
                                <div className="rounded-xl border-2 border-black bg-blue-50 p-4">
                                    <p className="text-xs font-bold text-blue-600">Health</p>
                                    <p className="text-lg font-black text-black">Excellent</p>
                                </div>
                            </div>
                        </div>

                        {/* Floating Elements */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                            className="absolute -right-8 top-20 z-20 hidden rounded-xl border-2 border-black bg-white p-4 shadow-neubrutalist-purple md:block"
                        >
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600 border-2 border-black">
                                    Let
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-500">Deployment</p>
                                    <p className="text-sm font-black">Successful</p>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                            className="absolute -bottom-6 -left-8 z-20 hidden rounded-xl border-2 border-black bg-white p-4 shadow-neubrutalist-green md:block"
                        >
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600 border-2 border-black">
                                    Git
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-500">New Commit</p>
                                    <p className="text-sm font-black truncate max-w-[150px]">{latestCommit?.message || "feat: initial commit"}</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Decorative background blobs */}
                    <div className="absolute -top-12 -right-12 -z-10 h-64 w-64 rounded-full bg-brand-purple/10 blur-3xl"></div>
                    <div className="absolute -bottom-12 -left-12 -z-10 h-64 w-64 rounded-full bg-brand-blue/10 blur-3xl"></div>
                </motion.div>
            </div>
        </section>
    );
}
