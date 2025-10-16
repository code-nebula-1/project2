import * as React from "react";
import { Slot, Slottable } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const ctaButtonVariants = cva(
  "inline-flex relative items-center justify-center gap-2 whitespace-nowrap font-medium transition-all duration-300 ease-out cursor-pointer disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg hover:shadow-xl hover:shadow-primary/25 hover:scale-105 hover:from-primary/90 hover:to-primary/70 active:scale-95",
        secondary:
          "bg-gradient-to-r from-muted to-muted/80 text-muted-foreground border border-border shadow-sm hover:shadow-md hover:scale-105 hover:from-muted/90 hover:to-muted/70 active:scale-95",
        outline:
          "bg-transparent border-2 border-primary text-primary shadow-sm hover:bg-primary hover:text-primary-foreground hover:shadow-lg hover:shadow-primary/25 hover:scale-105 active:scale-95",
        ghost:
          "bg-transparent text-foreground hover:bg-muted/50 hover:scale-105 active:scale-95",
        destructive:
          "bg-gradient-to-r from-destructive to-destructive/80 text-destructive-foreground shadow-lg hover:shadow-xl hover:shadow-destructive/25 hover:scale-105 hover:from-destructive/90 hover:to-destructive/70 active:scale-95",
        gradient:
          "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white shadow-lg hover:shadow-xl hover:shadow-purple-500/25 hover:scale-105 hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 active:scale-95",
        modern:
          "bg-white/10 backdrop-blur-sm border border-white/20 text-foreground shadow-lg hover:bg-white/20 hover:shadow-xl hover:scale-105 active:scale-95",
      },
      size: {
        sm: "h-10 px-4 py-2.5 text-xs rounded-lg",
        default: "h-12 px-6 py-3.5 text-sm rounded-xl",
        lg: "h-14 px-8 py-4 text-base rounded-xl",
        xl: "h-16 px-10 py-4.5 text-lg rounded-2xl",
      },
      textStyle: {
        default: "font-sans",
        mono: "font-mono uppercase tracking-wider",
        bracket:
          "font-mono uppercase tracking-wider before:content-['['] after:content-[']']",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
      textStyle: "default",
    },
  }
);

export interface CTAButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof ctaButtonVariants> {
  asChild?: boolean;
  href?: string;
  target?: string;
  rel?: string;
}

const CTAButton = React.forwardRef<HTMLButtonElement, CTAButtonProps>(
  (
    {
      className,
      variant,
      size,
      textStyle,
      asChild = false,
      href,
      target,
      rel,
      children,
      ...props
    },
    ref
  ) => {
    if (href) {
      return (
        <a
          href={href}
          target={target}
          rel={rel}
          data-slot="cta-button"
          className={cn(
            ctaButtonVariants({ variant, size, textStyle, className })
          )}
        >
          <Slottable>{children}</Slottable>
        </a>
      );
    }

    if (asChild) {
      return (
        <Slot
          ref={ref}
          data-slot="cta-button"
          className={cn(
            ctaButtonVariants({ variant, size, textStyle, className })
          )}
          {...props}
        >
          <Slottable>{children}</Slottable>
        </Slot>
      );
    }

    return (
      <button
        ref={ref}
        data-slot="cta-button"
        className={cn(
          ctaButtonVariants({ variant, size, textStyle, className })
        )}
        {...props}
      >
        <Slottable>{children}</Slottable>
      </button>
    );
  }
);

CTAButton.displayName = "CTAButton";

export { CTAButton, ctaButtonVariants };
