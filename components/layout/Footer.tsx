"use client";

import Link from "next/link";
import { Linkedin, Github } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { useState, useEffect } from "react";

export function Footer() {
    const [isBlogOnlyDomain, setIsBlogOnlyDomain] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const hostname = window.location.hostname;
            if (hostname.includes("securitytesting.") || hostname.startsWith("securitytesting.")) {
                setIsBlogOnlyDomain(true);
            }
        }
    }, []);

    const getLinkHref = (path: string) => {
        if (isBlogOnlyDomain) {
            if (path === "/blog") return "/";
            if (path.startsWith("/blog/")) return path.replace("/blog/", "/");
            return `https://zetalabs.in${path}`;
        }
        return path;
    };

    return (
        <footer className="border-t border-cyber-border bg-[#030303] text-gray-400 font-mono">
            <div className="container mx-auto px-4 py-16 md:px-6">
                <div className="flex flex-col md:flex-row justify-between items-start gap-12">
                    <div className="space-y-4 max-w-md">
                        <div className="flex items-center gap-2">
                            <div className="w-44 md:w-52">
                                <Logo variant="full" />
                            </div>
                        </div>
                        <p className="text-sm text-gray-500 leading-relaxed">
                            Elite offensive security consulting, defensive software architecture, and custom cyber security tooling. Breaking in to keep them out.
                        </p>
                        <div className="flex gap-4">
                            <Link href="https://www.linkedin.com/company/zetalabs-in" target="_blank" rel="noopener noreferrer" className="rounded-lg border border-cyber-border p-2 hover:bg-terminal-green/10 hover:text-terminal-green hover:border-terminal-green transition-colors">
                                <Linkedin className="h-5 w-5" />
                            </Link>
                            <Link href="https://github.com/zetalabs-in" target="_blank" rel="noopener noreferrer" className="rounded-lg border border-cyber-border p-2 hover:bg-terminal-green/10 hover:text-terminal-green hover:border-terminal-green transition-colors">
                                <Github className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-8 sm:gap-16">
                        <div className="space-y-3">
                            <h4 className="text-sm font-bold text-gray-200 uppercase tracking-wider">[ services ]</h4>
                            <ul className="space-y-2 text-sm text-gray-500">
                                <li><a href={getLinkHref("/#capabilities")} className="hover:text-terminal-teal hover:underline">&gt; penetration_testing</a></li>
                                <li><a href={getLinkHref("/#capabilities")} className="hover:text-terminal-teal hover:underline">&gt; network_auditing</a></li>
                                <li><a href={getLinkHref("/#capabilities")} className="hover:text-terminal-teal hover:underline">&gt; secure_devsecops</a></li>
                                <li><a href={getLinkHref("/#capabilities")} className="hover:text-terminal-teal hover:underline">&gt; custom_tooling</a></li>
                            </ul>
                        </div>
                        <div className="space-y-3">
                            <h4 className="text-sm font-bold text-gray-200 uppercase tracking-wider">[ resources ]</h4>
                            <ul className="space-y-2 text-sm text-gray-500">
                                <li><Link href={getLinkHref("/about")} className="hover:text-terminal-teal hover:underline">&gt; about_me</Link></li>
                                <li><Link href={isBlogOnlyDomain ? "/" : "/blog"} className="hover:text-terminal-teal hover:underline">&gt; hacking_blog</Link></li>
                                <li><a href="mailto:Openpages@proton.me" className="hover:text-terminal-teal hover:underline">&gt; contact_sales</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-cyber-border pt-8 md:flex-row text-xs text-gray-600">
                    <p>
                        © {new Date().getFullYear()} ZetaLabs. All systems secured.
                    </p>
                    <p className="hover:text-terminal-green transition-colors">
                        &gt;_ SECURED BY ZETALABS SHIELD
                    </p>
                </div>
            </div>
        </footer>
    );
}

