export function Footer() {
    return (
        <footer className="border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 max-w-screen-2xl items-center">
                <div className="mr-4 hidden md:flex">
                    <span className="mr-6 flex items-center space-x-2 font-bold sm:inline-block">
                        ZetaLabs
                    </span>
                </div>
                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                    <p className="text-sm text-muted-foreground">© 2026 ZetaLabs Inc.</p>
                </div>
            </div>
        </footer>
    );
}
