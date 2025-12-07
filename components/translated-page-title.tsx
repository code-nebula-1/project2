"use client";

import { PageTitle } from "./page-title";
import { useTranslation } from "@/lib/i18n";

interface TranslatedPageTitleProps {
  titleKey: string;
  subtitleKey?: string;
  size?: "default" | "large";
  className?: string;
}

export function TranslatedPageTitle({
  titleKey,
  subtitleKey,
  size = "default",
  className = "",
}: TranslatedPageTitleProps) {
  const { t } = useTranslation();

  return (
    <PageTitle
      title={t(titleKey)}
      subtitle={subtitleKey ? t(subtitleKey) : undefined}
      size={size}
      className={className}
    />
  );
}
