import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/landing/Hero";
import { FeatureGrid } from "@/components/landing/FeatureGrid";
import { Stats } from "@/components/landing/Stats";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black font-sans selection:bg-brand-purple/30">
      <Navbar />
      <Hero />
      <Stats />
      <FeatureGrid />
      <Footer />
    </main>
  );
}
