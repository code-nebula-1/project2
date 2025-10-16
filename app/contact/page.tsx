"use client";

import { Pill } from "@/components/pill";
import { CTAButton } from "@/components/ui/cta-button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, User, MessageSquare } from "lucide-react";

export default function Contact() {
  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      details: "research@roboticslab.edu",
      description: "General inquiries",
    },
    {
      icon: Phone,
      title: "Phone",
      details: "+1 (555) 123-4567",
      description: "Mon-Fri, 9AM-5PM EST",
    },
    {
      icon: MapPin,
      title: "Address",
      details: "123 Innovation Drive",
      description: "Robotics Research Center, Tech City, TC 12345",
    },
  ];

  const opportunities = [
    "PhD Research Positions",
    "Postdoctoral Fellowships",
    "Undergraduate Internships",
    "Industry Collaborations",
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="flex flex-col h-svh justify-center text-center relative">
        <div className="pb-16">
          <Pill className="mb-6">GET IN TOUCH</Pill>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-sentient">
            Contact Our <i className="font-light">Research Lab</i>
          </h1>
          <p className="font-mono text-sm sm:text-base text-foreground/60 text-balance mt-8 max-w-[440px] mx-auto">
            Ready to collaborate, join our research community, or learn more
            about our work? We'd love to hear from you.
          </p>
          <CTAButton className="mt-14" size="lg" textStyle="bracket">
            Send Message
          </CTAButton>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="relative py-24 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <div className="mb-8">
                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
                  Send us a Message
                </h2>
                <p className="text-lg text-foreground/70 text-pretty">
                  Fill out the form below and we'll get back to you as soon as
                  possible.
                </p>
              </div>

              <div className="p-8 rounded-lg border border-border bg-card">
                <form className="space-y-6">
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
                </form>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div className="mb-8">
                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
                  Contact Information
                </h2>
                <p className="text-lg text-foreground/70 text-pretty">
                  Multiple ways to reach our research lab
                </p>
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

              <div className="p-6 rounded-lg border border-border bg-card">
                <div className="flex items-center space-x-3 mb-4">
                  <User className="w-6 h-6 text-primary" />
                  <h3 className="text-lg font-semibold">
                    Research Opportunities
                  </h3>
                </div>
                <p className="text-foreground/70 mb-4 text-pretty">
                  Interested in joining our research team?
                </p>
                <div className="space-y-2 mb-6">
                  {opportunities.map((opportunity, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-sm">{opportunity}</span>
                    </div>
                  ))}
                </div>
                <CTAButton className="w-full" variant="outline" textStyle="bracket">
                  View Open Positions
                </CTAButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative py-24 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="max-w-4xl mx-auto text-center">
            <div className="p-12 rounded-lg border border-border bg-card">
              <div className="space-y-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <MessageSquare className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-3xl font-bold">Ready to Collaborate?</h2>
                <p className="text-lg text-foreground/70 leading-relaxed text-pretty">
                  Whether you're a researcher, student, or industry partner, we
                  welcome opportunities to collaborate and advance the field of
                  robotics together.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <CTAButton variant="primary" textStyle="bracket">Start Collaboration</CTAButton>
                  <CTAButton variant="outline" textStyle="bracket">Learn More</CTAButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
