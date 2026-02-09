"use client";

export function Stats() {
    return (
        <section className="border-y-2 border-black bg-brand-purple px-4 py-16 text-white">
            <div className="container mx-auto grid gap-8 text-center md:grid-cols-3">
                <div className="space-y-2">
                    <h3 className="text-6xl font-black tracking-tighter">15+</h3>
                    <p className="text-xl font-bold opacity-90">Products Launched</p>
                </div>
                <div className="space-y-2">
                    <h3 className="text-6xl font-black tracking-tighter">$50M+</h3>
                    <p className="text-xl font-bold opacity-90">Value Created</p>
                </div>
                <div className="space-y-2">
                    <h3 className="text-6xl font-black tracking-tighter">100k+</h3>
                    <p className="text-xl font-bold opacity-90">Active Users</p>
                </div>
            </div>
        </section>
    );
}
