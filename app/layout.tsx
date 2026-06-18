import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ZetaLabs | Cyber Security, Penetration Testing & Networking Developers",
  description: "ZetaLabs is an elite boutique cyber security engineering and network auditing collective. We perform penetration testing, build secure DevSecOps pipelines, and develop custom offensive/defensive tools. Breaking in to keep them out.",
  keywords: [
    "cybersecurity developers",
    "penetration testing services",
    "network auditing",
    "ethical hacking agency",
    "custom security tools",
    "DevSecOps automation",
    "vulnerability assessments",
    "secure code audits",
    "zetalabs.in"
  ],
  authors: [{ name: "ZetaLabs Security Team", url: "https://zetalabs.in" }],
  creator: "ZetaLabs",
  publisher: "ZetaLabs",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "ZetaLabs | Advanced Cyber Security & Networking Devs",
    description: "Penetration testing, network infrastructure auditing, and custom security software developers. Breaking in to keep them out.",
    url: "https://zetalabs.in",
    siteName: "ZetaLabs",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ZetaLabs | Advanced Cyber Security & Networking Devs",
    description: "Elite penetration testing, network auditing, and secure tooling developers.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased crt-overlay bg-[#030303] text-gray-100 selection:bg-terminal-green/30 selection:text-terminal-green min-h-screen`}
      >
        <div className="absolute inset-0 -z-50 h-full w-full bg-[#030303] cyber-grid pointer-events-none" />
        {children}
        <Analytics />
      </body>
    </html>
  );
}

