"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="sticky top-0 z-50 w-full border-b-2 border-black bg-white/80 backdrop-blur-md">
            <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-lg border-2 border-black bg-brand-purple shadow-neubrutalist-sm" />
                    <span className="text-2xl font-black tracking-tighter text-black">
                        ZETALABS
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden items-center gap-8 md:flex">
                    <Link
                        href="/products"
                        className="text-sm font-medium text-brand-dark hover:text-black hover:underline hover:underline-offset-4"
                    >
                        Product
                    </Link>
                </div>

                {/* Desktop Actions */}
                <div className="hidden items-center gap-4 md:flex">
                    <Button variant="neubrutalist" asChild>
                        <Link href="mailto:hello@zetalabs.dev">Contact Sales</Link>
                    </Button>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                >
                    <Menu className="h-8 w-8 text-black" />
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="border-b-2 border-black bg-white px-4 py-8 md:hidden">
                    <div className="flex flex-col gap-6">
                        <Link
                            href="/products"
                            className="text-lg font-medium text-brand-dark"
                            onClick={() => setIsOpen(false)}
                        >
                            Product
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
