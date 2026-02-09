import { getOrganizationRepos, getLatestCommit, getRepoLanguages } from "@/lib/github";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/landing/Hero";
import { FeatureGrid } from "@/components/landing/FeatureGrid";
import { Stats } from "@/components/landing/Stats";
import { Footer } from "@/components/layout/Footer";
import { LatestProject } from "@/components/landing/LatestProject";

export default async function Home() {
  const repos = await getOrganizationRepos();
  const latestRepo = repos[0] || null;
  const latestCommit = latestRepo ? await getLatestCommit(latestRepo.full_name) : null;
  const languages = latestRepo ? await getRepoLanguages(latestRepo.full_name) : {};

  return (
    <main className="min-h-screen bg-white text-black font-sans selection:bg-brand-purple/30">
      <Navbar />
      <Hero latestRepo={latestRepo} latestCommit={latestCommit} languages={languages} />
      <LatestProject />
      <Stats />
      <FeatureGrid />
      <Footer />
    </main>
  );
}
