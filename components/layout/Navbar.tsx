"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Logo } from "@/components/ui/logo";

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isBlogOnlyDomain, setIsBlogOnlyDomain] = useState(false);

    useEffect(() => {
        // Detect domain
        if (typeof window !== "undefined") {
            const hostname = window.location.hostname;
            if (hostname.includes("securitytesting.") || hostname.startsWith("securitytesting.")) {
                setIsBlogOnlyDomain(true);
            }
        }

        // Check session
        const checkSession = async () => {
            try {
                const res = await fetch("/api/auth/session");
                const data = await res.json();
                if (res.ok && data.authenticated) {
                    setIsAdmin(true);
                }
            } catch (error) {
                console.error("Error checking auth session in navbar:", error);
            }
        };
        checkSession();
    }, []);

    // Helper for cross-domain URLs
    const getLinkHref = (path: string) => {
        if (isBlogOnlyDomain) {
            if (path === "/blog") return "/";
            if (path.startsWith("/blog/")) return path.replace("/blog/", "/");
            return `https://zetalabs.in${path}`;
        }
        return path;
    };

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-cyber-border bg-[#050505]/85 backdrop-blur-md">
            <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
                {/* Logo */}
                <Link href={getLinkHref("/")} className="flex items-center gap-2">
                    <div className="w-28 md:w-36 transition-transform hover:scale-105">
                        <Logo variant="text" />
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden items-center gap-6 lg:gap-8 md:flex font-mono text-xs lg:text-sm">
                    <a
                        href={getLinkHref("/#capabilities")}
                        className="text-gray-400 hover:text-terminal-teal hover:underline hover:underline-offset-4 transition-colors"
                    >
                        [ capabilities ]
                    </a>
                    <Link
                        href={getLinkHref("/services")}
                        className="text-gray-400 hover:text-terminal-teal hover:underline hover:underline-offset-4 transition-colors"
                    >
                        [ services_catalog ]
                    </Link>
                    <Link
                        href={getLinkHref("/about")}
                        className="text-gray-400 hover:text-terminal-teal hover:underline hover:underline-offset-4 transition-colors"
                    >
                        [ about_me ]
                    </Link>
                    <Link
                        href={isBlogOnlyDomain ? "/" : "/blog"}
                        className="text-gray-400 hover:text-terminal-teal hover:underline hover:underline-offset-4 transition-colors"
                    >
                        [ hacking_blog ]
                    </Link>
                    {isAdmin && (
                        <Link
                            href="/admin"
                            className="text-terminal-green hover:text-white hover:underline hover:underline-offset-4 transition-colors"
                        >
                            [ admin_console ]
                        </Link>
                    )}
                </div>

                {/* Desktop Actions */}
                <div className="hidden items-center gap-4 md:flex">
                    <Button 
                        asChild
                        className="bg-transparent border border-terminal-green text-terminal-green font-mono font-bold hover:bg-terminal-green hover:text-black hover:shadow-cyber-glow-green transition-all duration-300 rounded-lg cursor-pointer"
                    >
                        <a href="mailto:hello@zetalabs.dev">&gt; Request Audit</a>
                    </Button>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden text-gray-400 hover:text-white"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                >
                    {isOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="border-b border-cyber-border bg-[#050505] px-4 py-8 md:hidden font-mono">
                    <div className="flex flex-col gap-6">
                        <a
                            href={getLinkHref("/#capabilities")}
                            className="text-lg text-gray-400 hover:text-terminal-teal"
                            onClick={() => setIsOpen(false)}
                        >
                            &gt; capabilities
                        </a>
                        <Link
                            href={getLinkHref("/services")}
                            className="text-lg text-gray-400 hover:text-terminal-teal"
                            onClick={() => setIsOpen(false)}
                        >
                            &gt; services_catalog
                        </Link>
                        <Link
                            href={getLinkHref("/about")}
                            className="text-lg text-gray-400 hover:text-terminal-teal"
                            onClick={() => setIsOpen(false)}
                        >
                            &gt; about_me
                        </Link>
                        <Link
                            href={isBlogOnlyDomain ? "/" : "/blog"}
                            className="text-lg text-gray-400 hover:text-terminal-teal"
                            onClick={() => setIsOpen(false)}
                        >
                            &gt; hacking_blog
                        </Link>
                        {isAdmin && (
                            <Link
                                href="/admin"
                                className="text-lg text-terminal-green hover:text-white"
                                onClick={() => setIsOpen(false)}
                            >
                                &gt; admin_console
                            </Link>
                        )}
                        <Button 
                            asChild
                            className="bg-transparent border border-terminal-green text-terminal-green hover:bg-terminal-green hover:text-black font-bold w-full rounded-lg"
                        >
                            <a href="mailto:hello@zetalabs.dev" onClick={() => setIsOpen(false)}>
                                &gt; Request Audit
                            </a>
                        </Button>
                    </div>
                </div>
            )}
        </nav>
    );
}

