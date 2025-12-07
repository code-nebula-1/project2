"use client";

import { CTAButton } from "@/components/ui/cta-button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageTitle } from "@/components/page-title";
import { SocialEmbed } from "@/components/social-embed";
import {
  User,
  FileText,
  Megaphone,
  ExternalLink,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Twitter,
  Instagram,
  Facebook,
  Youtube,
  Linkedin,
} from "lucide-react";
import { News as NewsType } from "@/actions/news";
import Link from "next/link";
import { useTranslation, useI18n } from "@/lib/i18n";

type PaginationInfo = {
  currentPage: number;
  totalPages: number;
  totalCount: number;
};

type NewsProps = {
  news: NewsType[];
  pagination?: PaginationInfo;
};

// Get icon for news type
function getTypeIcon(type: string) {
  switch (type) {
    case "blog":
      return FileText;
    case "announcement":
      return Megaphone;
    case "social_embed":
      return Twitter;
    default:
      return FileText;
  }
}

// Get icon for platform
function getPlatformIcon(platform: string | null) {
  switch (platform) {
    case "twitter":
      return Twitter;
    case "instagram":
      return Instagram;
    case "facebook":
      return Facebook;
    case "youtube":
      return Youtube;
    case "linkedin":
      return Linkedin;
    default:
      return ExternalLink;
  }
}

// Get type badge color
function getTypeColor(type: string) {
  switch (type) {
    case "blog":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
    case "announcement":
      return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
    case "social_embed":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
  }
}

// Get platform badge color
function getPlatformColor(platform: string | null) {
  switch (platform) {
    case "twitter":
      return "bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-300";
    case "instagram":
      return "bg-pink-100 text-pink-800 dark:bg-pink-900/30 dark:text-pink-300";
    case "facebook":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
    case "youtube":
      return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
    case "linkedin":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
    case "tiktok":
      return "bg-black text-white dark:bg-white/10 dark:text-white";
    case "medium":
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
  }
}

// Format type for display
function formatType(type: string) {
  return type.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase());
}

// Format date for display
function formatDate(date: Date | string | null, locale: string = "en") {
  if (!date) return null;
  return new Date(date).toLocaleDateString(locale === "es" ? "es-ES" : "en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function NewsComponent({ news, pagination }: NewsProps) {
  const { t } = useTranslation();
  const { locale } = useI18n();

  // Generate page numbers to display
  const getPageNumbers = () => {
    if (!pagination) return [];
    const { currentPage, totalPages } = pagination;
    const pages: (number | "ellipsis")[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("ellipsis");

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) pages.push(i);

      if (currentPage < totalPages - 2) pages.push("ellipsis");
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="min-h-screen">


      {/* All News */}
      <section className="relative  px-4 bg-muted/30">
        <div className="container mx-auto max-w-7xl">

          {news.length === 0 ? (
            <div className="text-center py-12 text-foreground/60">
              {t("news.noNews")}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {news.map((item) => {
                  const Icon = item.type === "social_embed"
                    ? getPlatformIcon(item.platform)
                    : getTypeIcon(item.type);
                  return (
                    <Card
                      key={item.id}
                      className="group overflow-hidden hover:shadow-lg transition-all duration-300 border-border bg-card hover:bg-card/80"
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-2">
                            <Icon className="w-4 h-4 text-primary" />
                            <Badge
                              variant="secondary"
                              className={`text-xs font-medium ${getTypeColor(item.type)}`}
                            >
                              {formatType(item.type)}
                            </Badge>
                          </div>
                          {(item.publishedAt || item.createdAt) && (
                            <span className="text-xs text-foreground/60 font-mono">
                              {formatDate(item.publishedAt || item.createdAt, locale)}
                            </span>
                          )}
                        </div>
                        <h3 className="text-lg font-semibold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                          {item.title}
                        </h3>

                        {/* Show content preview if not social embed */}
                        {item.content && item.type !== "social_embed" && (
                          <p className="text-sm text-foreground/70 mb-4 line-clamp-3 text-pretty">
                            {item.content}
                          </p>
                        )}

                        {/* Show social embed preview */}
                        {item.type === "social_embed" && item.url && (
                          <div className="mb-4 max-h-[300px] overflow-hidden rounded-lg">
                            <SocialEmbed url={item.url} platform={item.platform} />
                          </div>
                        )}

                        <div className="flex items-center justify-between">
                          {item.addedBy && (
                            <span className="text-xs text-foreground/60">
                              {item.addedBy}
                            </span>
                          )}
                          {!item.addedBy && <span />}
                          {item.url && item.type !== "social_embed" && (
                            <CTAButton
                              size="sm"
                              className="group/btn"
                              textStyle="default"
                              href={item.url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {t("common.readMore")}
                              <ArrowRight className="ml-1 w-3 h-3 transition-transform group-hover/btn:translate-x-0.5" />
                            </CTAButton>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Pagination Controls */}
              {pagination && pagination.totalPages > 1 && (
                <div className="flex items-center justify-center gap-1.5 pt-8">
                  {/* Previous Button */}
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-full"
                    disabled={pagination.currentPage === 1}
                    asChild={pagination.currentPage !== 1}
                  >
                    {pagination.currentPage === 1 ? (
                      <span>
                        <ChevronLeft className="h-4 w-4" />
                      </span>
                    ) : (
                      <Link href={`/news?page=${pagination.currentPage - 1}`}>
                        <ChevronLeft className="h-4 w-4" />
                      </Link>
                    )}
                  </Button>

                  {/* Page Numbers */}
                  <div className="flex items-center gap-1">
                    {getPageNumbers().map((page, idx) =>
                      page === "ellipsis" ? (
                        <span
                          key={`ellipsis-${idx}`}
                          className="px-1 text-foreground/50 text-sm"
                        >
                          ...
                        </span>
                      ) : (
                        <Button
                          key={page}
                          variant={
                            pagination.currentPage === page ? "default" : "outline"
                          }
                          size="icon"
                          className="h-8 w-8 rounded-full text-xs"
                          asChild={pagination.currentPage !== page}
                        >
                          {pagination.currentPage === page ? (
                            <span>{page}</span>
                          ) : (
                            <Link href={`/news?page=${page}`}>{page}</Link>
                          )}
                        </Button>
                      )
                    )}
                  </div>

                  {/* Next Button */}
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-full"
                    disabled={
                      pagination.currentPage === pagination.totalPages ||
                      pagination.totalPages === 0
                    }
                    asChild={
                      pagination.currentPage !== pagination.totalPages &&
                      pagination.totalPages > 0
                    }
                  >
                    {pagination.currentPage === pagination.totalPages ||
                      pagination.totalPages === 0 ? (
                      <span>
                        <ChevronRight className="h-4 w-4" />
                      </span>
                    ) : (
                      <Link href={`/news?page=${pagination.currentPage + 1}`}>
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    )}
                  </Button>
                </div>
              )}

              {/* Results Info */}
              {pagination && (
                <div className="text-center text-sm text-foreground/50 pt-2">
                  {t("common.showing")}{" "}
                  {(pagination.currentPage - 1) * 10 + 1}–
                  {Math.min(pagination.currentPage * 10, pagination.totalCount)} {t("common.of")}{" "}
                  {pagination.totalCount} {t("news.newsItems")}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
