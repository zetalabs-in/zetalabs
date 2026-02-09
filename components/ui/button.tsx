"use strict";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost" | "link" | "neubrutalist";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-xl font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-brand-dark text-white hover:bg-black hover:-translate-y-0.5 hover:shadow-neubrutalist active:translate-y-0 active:shadow-none":
              variant === "primary",
            "border-2 border-brand-dark bg-white text-brand-dark hover:-translate-y-0.5 hover:shadow-neubrutalist active:translate-y-0 active:shadow-none":
              variant === "outline",
            "hover:bg-accent hover:text-accent-foreground": variant === "ghost",
            "text-primary underline-offset-4 hover:underline":
              variant === "link",
            "bg-brand-purple text-white border-2 border-black hover:-translate-y-0.5 hover:shadow-neubrutalist-purple active:translate-y-0 active:shadow-none":
              variant === "neubrutalist",
            "h-10 px-4 py-2": size === "default",
            "h-9 rounded-md px-3": size === "sm",
            "h-12 rounded-xl px-8 text-lg": size === "lg",
            "h-10 w-10": size === "icon",
          },
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
