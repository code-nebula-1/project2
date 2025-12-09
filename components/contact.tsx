"use client";

import { Mail, MapPin, Microscope } from "lucide-react"
import { useTranslation } from "@/lib/i18n";

interface ContactProps {
  title?: string | null;
  content?: string | null;
  showApplyButton?: boolean;
}

export function Contact({ title, content, showApplyButton = true }: ContactProps = {}) {
  const { t } = useTranslation();

  return (
    <section className="relative py-24 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
            {title || t("joinTeam.title")}
          </h2>
          <p className="text-lg text-foreground/70 text-pretty">
            {content || t("joinTeam.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="text-center p-6">
            <Mail className="w-8 h-8 mx-auto mb-3 text-primary" />
            <h3 className="font-bold mb-2">{t("contact.emailLabel")}</h3>
            <p className="text-sm text-foreground/70">uml.piers.lab@gmail.com</p>
          </div>
          <div className="text-center p-6">
            <MapPin className="w-8 h-8 mx-auto mb-3 text-primary" />
            <h3 className="font-bold mb-2">{t("contact.location")}</h3>
            <p className="text-sm text-foreground/70">Southwick 304</p>
          </div>
          <div className="text-center p-6">
            <Microscope className="w-8 h-8 mx-auto mb-3 text-primary" />
            <h3 className="font-bold mb-2">{t("contact.opportunities")}</h3>
            <p className="text-sm text-foreground/70">{t("contact.phdPositions")}</p>
          </div>
        </div>

        {showApplyButton && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSeh0IiH955uwzvkvwqBYrdyPA74qm6ue6tT-Kri7cN96JycbA/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
            >
              {t("joinTeam.applyNow")}
            </a>
          </div>
        )}
      </div>
    </section>
  )
}
