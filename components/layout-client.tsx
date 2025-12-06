"use client";

import { Leva } from "leva";

interface LayoutClientProps {
  children: React.ReactNode;
}

export function LayoutClient({ children }: LayoutClientProps) {
  return (
    <div className="relative">
      <div className="relative z-10">{children}</div>
      <Leva hidden />
    </div>
  );
}
