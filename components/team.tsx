"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { Mail, User2 } from "lucide-react";
import { useState } from "react";
import type { Team as TeamMember } from "@/actions/teams";
import { useTranslation } from "@/lib/i18n";

interface TeamProps {
  members: TeamMember[];
}

export function Team({ members }: TeamProps) {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const { t } = useTranslation();

  const renderMemberCard = (member: TeamMember) => (
    <Dialog key={member.id}>
      <DialogTrigger asChild>
        <Card
          className="py-0 group overflow-hidden hover:shadow-xl transition-all duration-500 border-border/50 bg-card/80 backdrop-blur cursor-pointer hover:scale-[1.02] hover:border-primary/30"
          onClick={() => setSelectedMember(member)}
          role="button"
          tabIndex={0}
          aria-label={`View profile of ${member.name}, ${member.role || t("teams.teamMember")}`}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setSelectedMember(member);
            }
          }}
        >
          <CardContent className="p-0 h-full">
            <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-muted/50 to-muted">
              <Image
                src={member.image || '/placeholder-user.jpg'}
                alt={`Portrait photo of ${member.name}`}
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" aria-hidden="true" />

              {/* Name and Role Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-5 text-white transform translate-y-0 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-xl font-bold mb-1 leading-tight" id={`member-name-${member.id}`}>
                  {member.name}
                </h3>
                <p className="text-sm text-white/90 line-clamp-2 leading-snug">
                  {member.role || t("teams.teamMember")}
                </p>
                <div className="mt-3 flex items-center gap-2 text-xs text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true">
                  <User2 className="w-3.5 h-3.5" />
                  <span>{t("teams.clickToView")}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>

      <DialogContent
        className="max-w-3xl max-h-[90vh] overflow-y-auto"
        aria-labelledby={`dialog-title-${member.id}`}
        aria-describedby={`dialog-desc-${member.id}`}
      >
        <DialogHeader>
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="relative w-full md:w-48 h-64 md:h-64 rounded-lg overflow-hidden bg-gradient-to-br from-muted/50 to-muted flex-shrink-0">
              <Image
                src={member.image || '/placeholder-user.jpg'}
                alt={`Portrait photo of ${member.name}`}
                className="w-full h-full object-cover"
                width={300}
                height={400}
              />
            </div>
            <div className="flex-1 space-y-2">
              <DialogTitle id={`dialog-title-${member.id}`} className="text-2xl font-bold">
                {member.name}
              </DialogTitle>
              <DialogDescription id={`dialog-desc-${member.id}`} className="text-base text-foreground/70">
                {member.role || t("teams.teamMember")}
              </DialogDescription>
              {member.contact && (
                <div className="pt-2 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-primary" aria-hidden="true" />
                  <a
                    href={`mailto:${member.contact}`}
                    className="text-sm text-primary hover:underline"
                    onClick={(e) => e.stopPropagation()}
                    aria-label={`Send email to ${member.name} at ${member.contact}`}
                  >
                    {member.contact}
                  </a>
                </div>
              )}
            </div>
          </div>
        </DialogHeader>

        {member.description && (
          <div className="mt-6">
            <h4 className="text-lg font-semibold mb-3">{t("teams.biography")}</h4>
            <p className="text-foreground/80 leading-relaxed whitespace-pre-wrap">
              {member.description}
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );

  return (
    <section className="relative py-24 px-4" aria-label="Team members">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-16">
          <ul
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 list-none p-0"
            role="list"
            aria-label="Team members list"
          >
            {members.map((member) => (
              <li key={member.id}>{renderMemberCard(member)}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
