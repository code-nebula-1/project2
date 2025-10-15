import * as React from "react";
import { Slot, Slottable } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { px } from "../utils";

const ctaButtonVariants = cva(
  "inline-flex relative uppercase border font-mono cursor-pointer items-center font-medium has-[>svg]:px-3 justify-center gap-2 whitespace-nowrap font-medium ease-out transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive [clip-path:polygon(var(--poly-roundness)_0,calc(100%_-_var(--poly-roundness))_0,100%_0,100%_calc(100%_-_var(--poly-roundness)),calc(100%_-_var(--poly-roundness))_100%,0_100%,0_calc(100%_-_var(--poly-roundness)),0_var(--poly-roundness))]",
  {
    variants: {
      variant: {
        primary:
          "bg-background border-primary text-primary-foreground [&>[data-border]]:bg-primary [box-shadow:inset_0_0_54px_0px_var(--tw-shadow-color)] shadow-[#3B82F6] hover:shadow-[#3B82F6]/80 hover:scale-105",
        secondary:
          "bg-muted border-muted-foreground text-muted-foreground [&>[data-border]]:bg-muted-foreground hover:bg-muted-foreground hover:text-background hover:scale-105",
        outline:
          "bg-transparent border-primary text-primary [&>[data-border]]:bg-primary hover:bg-primary hover:text-primary-foreground hover:scale-105",
        ghost:
          "bg-transparent border-transparent text-foreground hover:bg-muted hover:scale-105",
        destructive:
          "bg-destructive border-destructive text-destructive-foreground [&>[data-border]]:bg-destructive-foreground hover:bg-destructive/90 hover:scale-105",
      },
      size: {
        sm: "h-12 px-4 text-sm",
        default: "h-16 px-6 text-base",
        lg: "h-20 px-8 text-lg",
        xl: "h-24 px-10 text-xl",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
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
      asChild = false,
      href,
      target,
      rel,
      children,
      ...props
    },
    ref
  ) => {
    const polyRoundness = 16;
    const hypotenuse = polyRoundness * 2;
    const hypotenuseHalf = polyRoundness / 2 - 1.5;

    const buttonContent = (
      <>
        <span
          data-border="top-left"
          style={
            {
              "--h": px(hypotenuse),
              "--hh": px(hypotenuseHalf),
            } as React.CSSProperties
          }
          className="absolute inline-block w-[var(--h)] top-[var(--hh)] left-[var(--hh)] h-[2px] -rotate-45 origin-top -translate-x-1/2"
        />
        <span
          data-border="bottom-right"
          style={
            {
              "--h": px(hypotenuse),
              "--hh": px(hypotenuseHalf),
            } as React.CSSProperties
          }
          className="absolute w-[var(--h)] bottom-[var(--hh)] right-[var(--hh)] h-[2px] -rotate-45 translate-x-1/2"
        />
        <Slottable>{children}</Slottable>
      </>
    );

    if (href) {
      return (
        <a
          href={href}
          target={target}
          rel={rel}
          style={
            {
              "--poly-roundness": px(polyRoundness),
            } as React.CSSProperties
          }
          data-slot="cta-button"
          className={cn(ctaButtonVariants({ variant, size, className }))}
        >
          {buttonContent}
        </a>
      );
    }

    if (asChild) {
      return (
        <Slot
          ref={ref}
          style={
            {
              "--poly-roundness": px(polyRoundness),
            } as React.CSSProperties
          }
          data-slot="cta-button"
          className={cn(ctaButtonVariants({ variant, size, className }))}
          {...props}
        >
          {buttonContent}
        </Slot>
      );
    }

    return (
      <button
        ref={ref}
        style={
          {
            "--poly-roundness": px(polyRoundness),
          } as React.CSSProperties
        }
        data-slot="cta-button"
        className={cn(ctaButtonVariants({ variant, size, className }))}
        {...props}
      >
        {buttonContent}
      </button>
    );
  }
);

CTAButton.displayName = "CTAButton";

export { CTAButton, ctaButtonVariants };
