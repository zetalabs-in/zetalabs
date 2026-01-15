import Image from "next/image";
import { Button } from "@/components/ui/button";

export function Hero() {
    return (
        <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background pt-16 md:pt-0">
            <div className="container relative z-10 flex flex-col items-center gap-8 text-center">
                {/* Glow effect */}
                <div className="absolute top-1/2 left-1/2 -z-10 h-[300px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-[100px]" />

                <div className="space-y-4 max-w-4xl">
                    <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-7xl lg:text-8xl bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/50 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200 fill-mode-forwards">
                        ZetaLabs
                    </h1>
                    <p className="mx-auto max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300 fill-mode-forwards">
                        Crafting digital experiences that define the future.
                    </p>
                </div>


            </div>

            {/* Background grid */}
            <div className="absolute inset-0 -z-20 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        </section>
    );
}
