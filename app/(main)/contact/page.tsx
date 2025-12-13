"use client";

import { CTAButton } from "@/components/ui/cta-button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PageTitle } from "@/components/page-title";
import { Mail, Phone, MapPin, User, MessageSquare } from "lucide-react";
import { useTranslation } from "@/lib/i18n";
import { TranslatedPageTitle } from "@/components/translated-page-title";

export default function Contact() {
  const { t } = useTranslation();

  const contactInfo = [
    {
      icon: Mail,
      title: t("contact.emailLabel"),
      details: "uml.piers.lab@gmail.com",
      description: t("contact.generalInquiries"),
    },
    {
      icon: MapPin,
      title: t("contact.addressLabel"),
      details: "Southwick 304",
      description: "University of Massachusetts Lowell, Lowell, MA 01854-3607",
    },
  ];

  return (
    <div className="py-24 min-h-screen">

      <TranslatedPageTitle
        titleKey="contact.title"
        subtitleKey="contact.pageSubtitle"
        size="large"
      />

      {/* Contact Form & Info */}
      <section className="relative  px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>


              <div>
                <iframe
                  src="https://docs.google.com/forms/d/e/1FAIpQLSfDszT5avdzeiYpIUGmxOGqH0_Rt4pIErqUdT4q8e1BmcQLCA/viewform?embedded=true"
                  width="100%"
                  height="821">
                  Loading…
                </iframe>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <p className="text-foreground/60 mt-1" id="contact-info-subtitle">{t("contact.infoSubtitle")}</p>
              </div>

              <div className="space-y-6">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <div
                      key={index}
                      className="group p-6 rounded-lg border border-border bg-card hover:bg-card/80 transition-all duration-300"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold mb-1">
                            {info.title}
                          </h3>
                          <p className="text-foreground/80 font-medium">
                            {info.details}
                          </p>
                          <p className="text-sm text-foreground/60">
                            {info.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
