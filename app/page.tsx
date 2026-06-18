import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/landing/Hero";
import { FeatureGrid } from "@/components/landing/FeatureGrid";
import { Stats } from "@/components/landing/Stats";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#030303] text-gray-100 font-mono selection:bg-terminal-green/30 selection:text-terminal-green">
      <Navbar />
      <Hero />
      <Stats />
      <FeatureGrid />
      <Footer />
    </main>
  );
}




