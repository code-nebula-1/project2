"use client";

import { useState } from "react";
import { GL } from "./gl";
import { Leva } from "leva";

interface LayoutClientProps {
  children: React.ReactNode;
}

export function LayoutClient({ children }: LayoutClientProps) {
  const [hovering, setHovering] = useState(false);

  return (
    <div className="relative">
      <GL hovering={hovering} />
      <div className="relative z-10">{children}</div>
      <Leva hidden />
    </div>
  );
}
