"use client";

import { CTAButton } from "@/components/ui/cta-button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PageTitle } from "@/components/page-title";
import { Mail, Phone, MapPin, User, MessageSquare } from "lucide-react";
import { useTranslation } from "@/lib/i18n";

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
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="h-[20svh]">
      </section>

      {/* Contact Form & Info */}
      <section className="relative py-24 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <PageTitle
                title={t("contact.pageTitle")}
                subtitle={t("contact.pageSubtitle")}
                size="large"
              />

              <div className="p-8 rounded-lg border border-border bg-card">
                {/*<form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium mb-2"
                      >
                        Full Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium mb-2"
                      >
                        Email Address
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium mb-2"
                    >
                      Subject
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      placeholder="What's this about?"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium mb-2"
                    >
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell us more about your inquiry..."
                      rows={6}
                      required
                    />
                  </div>
                  <CTAButton type="submit" className="w-full" variant="primary" textStyle="bracket">
                    Send Message
                  </CTAButton>
                </form>*/}
                <iframe
                  src="https://docs.google.com/forms/d/e/1FAIpQLSfDszT5avdzeiYpIUGmxOGqH0_Rt4pIErqUdT4q8e1BmcQLCA/viewform?embedded=true"
                  width="550"
                  height="821">
                  Loading…
                </iframe>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <PageTitle
                title={t("contact.infoTitle")}
                subtitle={t("contact.infoSubtitle")}
                size="large"
              />

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
