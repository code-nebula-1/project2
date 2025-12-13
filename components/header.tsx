"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import { Logo } from "./logo";
import { MobileMenu } from "./mobile-menu";
import { LanguageSelector } from "./language-selector";
import { useTranslation } from "@/lib/i18n";

const navItems = [
  { key: "home", href: "/" },
  { key: "contact", href: "/contact" },
  { key: "teams", href: "/teams" },
  { key: "news", href: "/news" },
  { key: "publications", href: "/publications" },
];

export const Header = () => {
  const [scrollY, setScrollY] = useState(0);
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate scroll-based effects
  const backdropBlur = scrollY > 50 ? "backdrop-blur-md" : "backdrop-blur-none";
  const isScrolled = scrollY > 50; // Check if scrolled for height reduction

  return (
    <div
      className={"fixed z-50 top-0 left-0 w-full transition-all duration-300 ease-out bg-background"}
      role="banner"
    >
      {/* Skip to main content link for keyboard users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-primary focus:text-primary-foreground focus:px-4 focus:py-2 focus:rounded-md focus:font-medium"
      >
        Skip to main content
      </a>

      <div
        className={`absolute inset-0 ${backdropBlur} transition-all duration-300`}
        aria-hidden="true"
      />
      <header className="relative flex items-center mx-auto justify-between container">
        <Link
          href="/"
          className="transition-all duration-300"
          aria-label="PIERS Lab - Go to homepage"
        >
          <Logo
            className={`transition-all duration-300 ${isScrolled ? "w-[70px] md:w-[90px]" : "w-[70px] md:w-[90px]"
              }`}
          />
        </Link>
        <nav
          className={"flex max-lg:hidden absolute left-1/2 -translate-x-1/2 items-center gap-x-10 p-2"}
          role="navigation"
          aria-label="Main navigation"
        >
          {navItems.map((item) => (
            <Link
              className={"uppercase inline-block font-mono duration-150 transition-colors ease-out text-foreground/60 hover:text-foreground/100"}
              href={item.href}
              key={item.key}
              aria-label={`Go to ${t(`nav.${item.key}`)} page`}
            >
              {t(`nav.${item.key}`)}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <div className="max-lg:hidden">
            <LanguageSelector />
          </div>
          <div className="lg:hidden">
            <MobileMenu />
          </div>
        </div>
      </header>
    </div>
  );
};
