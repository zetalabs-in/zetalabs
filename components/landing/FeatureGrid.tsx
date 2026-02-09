"use client";

import { motion } from "framer-motion";
import { Zap, Shield, Globe, Users, Layers, Rocket } from "lucide-react";

const features = [
    {
        icon: Zap,
        title: "Rapid Prototyping",
        description: "We turn concepts into working prototypes in days, not months.",
        color: "bg-brand-purple",
        shadow: "shadow-neubrutalist-purple",
    },
    {
        icon: Layers,
        title: "Scalable Architecture",
        description: "Built on robust tech stacks designed to grow with your user base.",
        color: "bg-brand-blue",
        shadow: "shadow-neubrutalist-blue",
    },
    {
        icon: Users,
        title: "User-Centric Design",
        description: "Interfaces crafted for intuitive and engaging user experiences.",
        color: "bg-brand-green",
        shadow: "shadow-neubrutalist-green",
    },
    {
        icon: Globe,
        title: "Global Standards",
        description: "Compliance and best practices baked into every product we build.",
        color: "bg-orange-500",
        shadow: "hover:shadow-[4px_4px_0px_0px_#F97316]",
    },
    {
        icon: Shield,
        title: "Enterprise Security",
        description: "Bank-grade security protocols to protect your data and users.",
        color: "bg-pink-500",
        shadow: "hover:shadow-[4px_4px_0px_0px_#EC4899]",
    },
    {
        icon: Rocket,
        title: "Growth Strategy",
        description: "We don't just build; we help you launch and acquire your first users.",
        color: "bg-cyan-500",
        shadow: "hover:shadow-[4px_4px_0px_0px_#06B6D4]",
    },
];

export function FeatureGrid() {
    return (
        <section className="bg-gray-50 px-4 py-20 md:px-6 md:py-32">
            <div className="container mx-auto">
                <div className="mx-auto mb-16 max-w-2xl text-center">
                    <h2 className="mb-4 text-4xl font-black text-black">
                        Why Partner with ZetaLabs
                    </h2>
                    <p className="text-lg font-medium text-brand-dark">
                        The modern approach to building and launching digital products.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ y: -5 }}
                            className={`group relative overflow-hidden rounded-2xl border-2 border-black bg-white p-8 transition-all hover:shadow-neubrutalist ${feature.shadow}`}
                        >
                            <div className={`mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl border-2 border-black ${feature.color} text-white shadow-[4px_4px_0px_0px_#000]`}>
                                <feature.icon className="h-6 w-6" />
                            </div>
                            <h3 className="mb-3 text-xl font-bold text-black">
                                {feature.title}
                            </h3>
                            <p className="font-medium text-brand-dark">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
