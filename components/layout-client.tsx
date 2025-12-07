"use client";

import { Leva } from "leva";
import { I18nProvider } from "@/lib/i18n";

interface LayoutClientProps {
  children: React.ReactNode;
}

export function LayoutClient({ children }: LayoutClientProps) {
  return (
    <I18nProvider>
      <div className="relative">
        <div className="relative z-10">{children}</div>
        <Leva hidden />
      </div>
    </I18nProvider>
  );
}
