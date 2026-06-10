"use client";

import React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { VariantProps, cva } from "class-variance-authority";

const buttonVariants = cva(
    "relative group border text-foreground mx-auto text-center rounded-full",
    {
        variants: {
            variant: {
                default: "bg-blue-500/5 hover:bg-blue-500/0 border-blue-500/20",
                solid: "bg-blue-500 hover:bg-blue-600 text-white border-transparent hover:border-foreground/50 transition-all duration-200",
                ghost: "border-transparent bg-transparent hover:border-zinc-600 hover:bg-white/10",
            },
            size: {
                default: "px-7 py-1.5",
                sm: "px-4 py-0.5",
                lg: "px-10 py-2.5",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    neon?: boolean;
    href?: string;
}

const neonTop = (neon: boolean) => (
    <span className={cn(
        "absolute h-px opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out inset-x-0 inset-y-0 bg-gradient-to-r w-3/4 mx-auto from-transparent dark:via-blue-500 via-blue-600 to-transparent hidden",
        neon && "block"
    )} />
);

const neonBottom = (neon: boolean) => (
    <span className={cn(
        "absolute group-hover:opacity-30 transition-all duration-500 ease-in-out inset-x-0 h-px -bottom-px bg-gradient-to-r w-3/4 mx-auto from-transparent dark:via-blue-500 via-blue-600 to-transparent hidden",
        neon && "block"
    )} />
);

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, neon = true, size, variant, children, href, ...props }, ref) => {
        const cls = cn(buttonVariants({ variant, size }), className);

        if (href) {
            const isExternal = href.startsWith("http");
            if (isExternal) {
                return (
                    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
                        {neonTop(neon)}
                        {children}
                        {neonBottom(neon)}
                    </a>
                );
            }
            return (
                <Link href={href} className={cls}>
                    {neonTop(neon)}
                    {children}
                    {neonBottom(neon)}
                </Link>
            );
        }

        return (
            <button className={cls} ref={ref} {...props}>
                {neonTop(neon)}
                {children}
                {neonBottom(neon)}
            </button>
        );
    }
);

Button.displayName = "Button";

export { Button, buttonVariants };
