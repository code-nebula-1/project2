"use client";

import { useI18n, Locale, localeNames } from "@/lib/i18n";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Globe } from "lucide-react";

interface LanguageSelectorProps {
  className?: string;
}

export function LanguageSelector({ className }: LanguageSelectorProps) {
  const { locale, setLocale } = useI18n();

  return (
    <Select value={locale} onValueChange={(value) => setLocale(value as Locale)}>
      <SelectTrigger
        className={`w-[130px] h-9 border-none bg-transparent focus:ring-0 focus:ring-offset-0 ${className}`}
      >
        <div className="flex items-center gap-2">
          <Globe className="h-4 w-4 opacity-60" />
          <SelectValue />
        </div>
      </SelectTrigger>
      <SelectContent>
        {(Object.keys(localeNames) as Locale[]).map((loc) => (
          <SelectItem key={loc} value={loc}>
            <span className="flex items-center gap-2">
              <span className="text-base">{loc === "en" ? "🇺🇸" : "🇪🇸"}</span>
              {localeNames[loc]}
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
