"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import { Logo } from "./logo";
import { MobileMenu } from "./mobile-menu";
import { usePathname } from "next/navigation";

export const Header = () => {
  const [scrollY, setScrollY] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Check if we're on the home page (which has video background)
  const isHomePage = pathname === "/";

  // Calculate scroll-based effects
  const backdropBlur = scrollY > 50 ? "backdrop-blur-md" : "backdrop-blur-none";
  const showLogo = scrollY < 50; // Hide logo when scrolled more than 50px
  const isScrolled = scrollY > 50; // Check if scrolled for height reduction
  const showBackground = scrollY > 50; // Show background when scrolled

  // Navigation color logic: white on home page (video background), black on other pages
  const shouldUseWhiteText = isHomePage && !isScrolled;

  return (
    <div
      className={"fixed z-50 top-0 left-0 w-full transition-all duration-300 ease-out bg-background"}
    >
      <div
        className={`absolute inset-0 ${backdropBlur} transition-all duration-300`}
      />
      <header className="relative flex items-center mx-auto justify-between container">
        <Link
          href="/"
          className={`transition-all duration-300 ${
            showLogo ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <Logo
            className={`transition-all duration-300 ${
              isScrolled ? "w-[70px] md:w-[90px]" : "w-[70px] md:w-[90px]"
            }`}
          />
        </Link>
        <nav className={"flex max-lg:hidden absolute left-1/2 -translate-x-1/2 items-center gap-x-10 p-2 "}>
          {["Home", "Contact", "Teams", "News", "Publication"].map((item) => (
            <Link
              className={"uppercase inline-block font-mono duration-150 transition-colors ease-out text-foreground/60 hover:text-foreground/100"}
              href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              key={item}
            >
              {item}
            </Link>
          ))}
        </nav>
        <div className="flex items-center lg:hidden">
          <MobileMenu
            isScrolled={isScrolled}
            shouldUseWhiteText={shouldUseWhiteText}
          />
        </div>
      </header>
    </div>
  );
};
