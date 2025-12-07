import { ReactNode } from "react";

interface PageTitleProps {
  title: string;
  subtitle?: string | ReactNode;
  size?: "default" | "large";
  className?: string;
}

export function PageTitle({
  title,
  subtitle,
  size = "default",
  className = ""
}: PageTitleProps) {
  const titleSizeClass = size === "large"
    ? "text-4xl md:text-5xl"
    : "text-3xl";

  const subtitleSizeClass = size === "large"
    ? "text-lg"
    : "text-base";

  return (
    <div className={`mb-8 pt-8 text-center ${className}`}>
      <h1 className={`${titleSizeClass} font-bold mb-4 text-balance`}>
        {title}
      </h1>
      {subtitle && (
        <p className={`${subtitleSizeClass} text-foreground/70 text-pretty max-w-2xl mx-auto`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

