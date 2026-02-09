import Link from "next/link";
import { Twitter, Linkedin, Instagram } from "lucide-react";

export function Footer() {
    return (
        <footer className="border-t-2 border-black bg-white">
            <div className="container mx-auto px-4 py-16 md:px-6">
                <div className="grid gap-12 md:grid-cols-4">
                    <div className="space-y-4">
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

                    <div>
                        <h4 className="mb-6 text-lg font-bold text-black">Product</h4>
                        <ul className="space-y-4 text-brand-dark">
                            <li><Link href="#" className="font-medium hover:text-black hover:underline">Features</Link></li>
                            <li><Link href="#" className="font-medium hover:text-black hover:underline">Pricing</Link></li>
                            <li><Link href="#" className="font-medium hover:text-black hover:underline">Security</Link></li>
                            <li><Link href="#" className="font-medium hover:text-black hover:underline">API</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="mb-6 text-lg font-bold text-black">Company</h4>
                        <ul className="space-y-4 text-brand-dark">
                            <li><Link href="#" className="font-medium hover:text-black hover:underline">About Us</Link></li>
                            <li><Link href="#" className="font-medium hover:text-black hover:underline">Careers</Link></li>
                            <li><Link href="#" className="font-medium hover:text-black hover:underline">Blog</Link></li>
                            <li><Link href="#" className="font-medium hover:text-black hover:underline">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="mb-6 text-lg font-bold text-black">Legal</h4>
                        <ul className="space-y-4 text-brand-dark">
                            <li><Link href="#" className="font-medium hover:text-black hover:underline">Privacy Policy</Link></li>
                            <li><Link href="#" className="font-medium hover:text-black hover:underline">Terms of Service</Link></li>
                            <li><Link href="#" className="font-medium hover:text-black hover:underline">Cookie Policy</Link></li>
                        </ul>
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
