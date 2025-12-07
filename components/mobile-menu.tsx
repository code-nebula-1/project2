"use client";

import { cn } from "@/lib/utils";
import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useTranslation } from "@/lib/i18n";
import { LanguageSelector } from "./language-selector";

interface MobileMenuProps {
  className?: string;
}

const menuItems = [
  { key: "home", href: "/" },
  { key: "contact", href: "/contact" },
  { key: "teams", href: "/teams" },
  { key: "news", href: "/news" },
  { key: "publications", href: "/publications" },
];

export const MobileMenu = ({
  className,
}: MobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <Dialog.Root modal={false} open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        <button
          className={cn(
            "group lg:hidden p-2 transition-colors text-black",
            className
          )}
          aria-label={t("common.menu")}
        >
          <Menu className="group-[[data-state=open]]:hidden" size={24} />
          <X className="hidden group-[[data-state=open]]:block" size={24} />
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <div
          data-overlay="true"
          className="fixed z-30 inset-0 bg-black/50 backdrop-blur-sm"
        />

        <Dialog.Content
          onInteractOutside={(e) => {
            if (
              e.target instanceof HTMLElement &&
              e.target.dataset.overlay !== "true"
            ) {
              e.preventDefault();
            }
          }}
          className="fixed top-0 left-0 w-full z-40 py-28 md:py-40"
        >
          <Dialog.Title className="sr-only">{t("common.menu")}</Dialog.Title>

          <nav className="flex flex-col space-y-6 container mx-auto bg-white rounded-lg p-6 relative">
            <Dialog.Close asChild>
              <button
                className="absolute top-4 right-4 p-2 text-black/60 hover:text-black transition-colors"
                aria-label={t("common.close")}
              >
                <X size={24} />
              </button>
            </Dialog.Close>
            {menuItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                onClick={handleLinkClick}
                className="text-xl font-mono uppercase transition-colors ease-out duration-150 py-2 text-black/60 hover:text-black"
              >
                {t(`nav.${item.key}`)}
              </Link>
            ))}

            {/* Language selector for mobile */}
            <div className="pt-4 border-t border-black/10">
              <p className="text-sm font-mono mb-2 text-black/40">
                {t("common.language")}
              </p>
              <LanguageSelector />
            </div>
          </nav>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};