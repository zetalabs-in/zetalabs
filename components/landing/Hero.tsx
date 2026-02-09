"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export function Hero() {
    return (
        <section className="relative overflow-hidden bg-white px-4 py-20 md:px-6 md:py-32">
            <div className="container mx-auto grid gap-12 lg:grid-cols-2 lg:items-center">
                {/* Left Column: Content */}
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
                        <Button variant="primary" size="lg" className="gap-2">
                            Start Now <ArrowRight className="h-5 w-5" />
                        </Button>
                        <Button variant="outline" size="lg">
                            Book a Demo
                        </Button>
                    </div>

                    <div className="mt-4 flex flex-col gap-2 text-sm font-medium text-gray-500 sm:flex-row sm:items-center sm:gap-6">
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-brand-green" />
                            <span>No credit card required</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-brand-green" />
                            <span>Instant approval</span>
                        </div>
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
                                    <h3 className="text-2xl font-black text-black">E-Commerce App</h3>
                                </div>
                                <div className="flex items-center gap-2 rounded-full border-2 border-black bg-green-100 px-3 py-1">
                                    <div className="h-2 w-2 animate-pulse rounded-full bg-green-500"></div>
                                    <span className="text-xs font-bold text-green-700">LIVE</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="rounded-xl border-2 border-black bg-purple-50 p-4">
                                    <p className="text-xs font-bold text-purple-600">Total Users</p>
                                    <p className="text-2xl font-black text-black">124.5k</p>
                                    <div className="mt-2 h-1 w-full rounded-full bg-purple-200">
                                        <div className="h-1 w-[70%] rounded-full bg-purple-600"></div>
                                    </div>
                                </div>
                                <div className="rounded-xl border-2 border-black bg-blue-50 p-4">
                                    <p className="text-xs font-bold text-blue-600">Uptime</p>
                                    <p className="text-2xl font-black text-black">99.9%</p>
                                    <div className="mt-2 h-1 w-full rounded-full bg-blue-200">
                                        <div className="h-1 w-[95%] rounded-full bg-blue-600"></div>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-xl border-2 border-black bg-gray-50 p-4">
                                <div className="mb-2 flex items-center justify-between">
                                    <span className="text-sm font-bold text-black">Sprint Progress</span>
                                    <span className="text-xs font-bold text-gray-500">82%</span>
                                </div>
                                <div className="flex h-4 w-full overflow-hidden rounded-full border-2 border-black bg-white">
                                    <div className="h-full w-[82%] bg-brand-purple"></div>
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
                                    <p className="text-sm font-black">feat: added auth</p>
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
