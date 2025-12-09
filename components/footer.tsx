"use client";

import { useTranslation } from "@/lib/i18n";

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer
      className="border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="text-center text-sm text-muted-foreground md:text-left">
            <p>© {new Date().getFullYear()} Research Lab. {t("footer.rights")}</p>
          </div>

          <nav
            className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground"
            role="navigation"
            aria-label="Footer navigation"
          >
            <a
              href="/contact"
              className="transition-colors hover:text-foreground"
              aria-label={`Go to ${t("footer.contact")} page`}
            >
              {t("footer.contact")}
            </a>
            <a
              href="/publications"
              className="transition-colors hover:text-foreground"
              aria-label={`Go to ${t("footer.publications")} page`}
            >
              {t("footer.publications")}
            </a>
            <a
              href="/teams"
              className="transition-colors hover:text-foreground"
              aria-label={`Go to ${t("footer.team")} page`}
            >
              {t("footer.team")}
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}

