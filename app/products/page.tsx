import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductList } from "@/components/products/ProductList";
import { getOrganizationRepos } from "@/lib/github";

// Revalidate every hour
export const revalidate = 3600;

export default async function ProductsPage() {
    // Use default (zetalabs-in)
    const repos = await getOrganizationRepos();

    return (
        <main className="min-h-screen bg-white text-black font-sans selection:bg-brand-purple/30">
            <Navbar />

            <section className="bg-gray-50 px-4 py-20 md:px-6 md:py-32">
                <div className="container mx-auto">
                    <div className="mx-auto mb-16 max-w-3xl text-center">
                        <div className="inline-flex items-center gap-2 rounded-full border-2 border-black bg-brand-purple/10 px-4 py-1.5 font-bold text-brand-purple mb-6">
                            Open Source
                        </div>
                        <h1 className="mb-6 text-5xl font-black leading-tight text-black md:text-6xl">
                            Our <span className="text-brand-purple underline decoration-4 underline-offset-4">Projects</span>
                        </h1>
                        <p className="text-xl font-medium text-brand-dark">
                            Explore our portfolio of work and open source contributions from ZetaLabs.
                        </p>
                    </div>

                    <ProductList repos={repos} />
                </div>
            </section>

            <Footer />
        </main>
    );
}
