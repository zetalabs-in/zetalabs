import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export function Grid() {
    const projects = [
        {
            title: "Project Alpha",
            description: "Next-gen AI interface for complex data visualization.",
            tags: ["AI", "React", "Data"],
        },
        {
            title: "Nebula Stream",
            description: "Real-time media processing pipeline at scale.",
            tags: ["Infrastructure", "Go", "Cloud"],
        },
        {
            title: "Quantum UI",
            description: "A design system for the quantum computing era.",
            tags: ["Design System", "Figma"],
        },
        { // Large item
            title: "Hyperion Core",
            description: "The backbone of modern decentralized applications.",
            tags: ["Blockchain", "Rust"],
            large: true,
        },
    ];

    return (
        <section className="container py-24 sm:py-32">
            <div className="flex flex-col items-center gap-4 text-center mb-16">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Selected Works</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                    Innovation delivered through clean code and stunning design.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project, i) => (
                    <Card
                        key={i}
                        className={`group relative overflow-hidden border-border/50 bg-background/50 backdrop-blur-sm transition-all hover:bg-muted/50 hover:border-border ${project.large ? "md:col-span-2 lg:col-span-2" : ""}`}
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <CardTitle className="text-xl">{project.title}</CardTitle>
                                <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                            </div>
                            <CardDescription>{project.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="mt-auto">
                            <div className="flex gap-2 flex-wrap">
                                {project.tags.map(tag => (
                                    <span key={tag} className="inline-flex items-center rounded-md border border-border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                ))}
                {/* Placeholder for "More" */}
                <Card className="flex flex-col items-center justify-center p-6 border-dashed border-border/50 bg-transparent hover:bg-muted/50 hover:border-border transition-colors">
                    <span className="text-muted-foreground font-medium">View All Projects</span>
                </Card>
            </div>
        </section>
    );
}
