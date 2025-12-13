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
    <section className="relative py-24 px-4" aria-labelledby="contact-heading">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 id="contact-heading" className="text-4xl md:text-5xl font-bold mb-4 text-balance">
            {title || t("joinTeam.title")}
          </h2>
          <p className="text-lg text-foreground/70 text-pretty">
            {content || t("joinTeam.subtitle")}
          </p>
        </div>

        <ul
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 list-none p-0"
          role="list"
          aria-label="Contact information"
        >
          <li className="text-center p-6">
            <Mail className="w-8 h-8 mx-auto mb-3 text-primary" aria-hidden="true" />
            <h3 className="font-bold mb-2" id="email-label">{t("contact.emailLabel")}</h3>
            <p className="text-sm text-foreground/70">
              <a
                href="mailto:uml.piers.lab@gmail.com"
                aria-labelledby="email-label"
                className="hover:underline"
              >
                uml.piers.lab@gmail.com
              </a>
            </p>
          </li>
          <li className="text-center p-6">
            <MapPin className="w-8 h-8 mx-auto mb-3 text-primary" aria-hidden="true" />
            <h3 className="font-bold mb-2">{t("contact.location")}</h3>
            <address className="text-sm text-foreground/70 not-italic">Southwick 304</address>
          </li>
          <li className="text-center p-6">
            <Microscope className="w-8 h-8 mx-auto mb-3 text-primary" aria-hidden="true" />
            <h3 className="font-bold mb-2">{t("contact.opportunities")}</h3>
            <p className="text-sm text-foreground/70">{t("contact.phdPositions")}</p>
          </li>
        </ul>

        {showApplyButton && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSeh0IiH955uwzvkvwqBYrdyPA74qm6ue6tT-Kri7cN96JycbA/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
              aria-label={`${t("joinTeam.applyNow")} - opens application form in new tab`}
            >
              {t("joinTeam.applyNow")}
              <span className="sr-only"> (opens in new tab)</span>
            </a>
          </div>
        )}
      </div>
    </section>
  )
}
