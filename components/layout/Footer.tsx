import Link from "next/link";
import { Twitter, Linkedin, Instagram } from "lucide-react";

export function Footer() {
    return (
        <footer className="border-t-2 border-black bg-white">
            <div className="container mx-auto px-4 py-16 md:px-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-12">
                    <div className="space-y-4 max-w-sm">
                        <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-lg border-2 border-black bg-brand-purple shadow-neubrutalist-sm" />
                            <span className="text-2xl font-black tracking-tighter text-black">
                                ZETALABS
                            </span>
                        </div>
                        <p className="font-medium text-brand-dark">
                            Building products that deliver real market value. Innovation meets execution.
                        </p>
                        <div className="flex gap-4">
                            <Link href="#" className="rounded-lg border-2 border-black p-2 hover:bg-black hover:text-white transition-colors">
                                <Twitter className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="rounded-lg border-2 border-black p-2 hover:bg-black hover:text-white transition-colors">
                                <Linkedin className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="rounded-lg border-2 border-black p-2 hover:bg-black hover:text-white transition-colors">
                                <Instagram className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t-2 border-black pt-8 md:flex-row">
                    <p className="font-medium text-brand-dark">
                        © {new Date().getFullYear()} ZetaLabs. All rights reserved.
                    </p>
                    <p className="text-sm font-medium text-gray-500">
                        Designed with ❤️ for ZetaLabs
                    </p>
                </div>
            </div>
        </footer>
    );
}
