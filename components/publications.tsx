"use client";

import { CTAButton } from "@/components/ui/cta-button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ExternalLink,
  FileText,
  Calendar,
  Users,
  Quote,
  Download,
  Eye,
  Copy,
  Check,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Publication } from "@/actions/publications";
import { useState } from "react";
import Link from "next/link";
import { useTranslation } from "@/lib/i18n";

type PaginationInfo = {
  currentPage: number;
  totalPages: number;
  totalCount: number;
};

type PublicationsProps = {
  publications: Publication[];
  pagination?: PaginationInfo;
};

export function Publications({ publications, pagination }: PublicationsProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [announcement, setAnnouncement] = useState<string>("");
  const { t } = useTranslation();

  // Get DOI URL from DOI string
  const getDoiUrl = (doi: string | null) => {
    if (!doi) return null;
    // If it's already a full URL, return it
    if (doi.startsWith("http")) return doi;
    // Otherwise, construct the DOI resolver URL
    return `https://doi.org/${doi}`;
  };

  // Get the best available paper URL
  const getPaperUrl = (pub: Publication) => {
    if (pub.url) return pub.url;
    if (pub.pdfUrl) return pub.pdfUrl;
    if (pub.doi) return getDoiUrl(pub.doi);
    return null;
  };

  // Generate citation text
  const generateCitation = (pub: Publication) => {
    const authorsStr = Array.isArray(pub.authors) ? pub.authors.join(", ") : pub.authors;
    const yearStr = pub.year ? ` (${pub.year})` : "";
    const journalStr = pub.journal ? `. ${pub.journal}` : "";
    const doiStr = pub.doi ? `. https://doi.org/${pub.doi}` : "";
    return `${authorsStr}${yearStr}. ${pub.title}${journalStr}${doiStr}`;
  };

  // Copy citation to clipboard
  const handleCopyCitation = async (pub: Publication) => {
    const citation = generateCitation(pub);
    try {
      await navigator.clipboard.writeText(citation);
      setCopiedId(pub.id);
      setAnnouncement(`Citation for ${pub.title} copied to clipboard`);
      setTimeout(() => {
        setCopiedId(null);
        setAnnouncement("");
      }, 2000);
    } catch (err) {
      console.error("Failed to copy citation:", err);
      setAnnouncement("Failed to copy citation");
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      "Quantum Computing":
        "bg-purple-500/10 text-purple-600 border-purple-500/20",
      "Machine Learning": "bg-blue-500/10 text-blue-600 border-blue-500/20",
      "Materials Science": "bg-green-500/10 text-green-600 border-green-500/20",
      Robotics: "bg-orange-500/10 text-orange-600 border-orange-500/20",
      "Distributed Systems": "bg-red-500/10 text-red-600 border-red-500/20",
    };
    return (
      colors[category as keyof typeof colors] ||
      "bg-gray-500/10 text-gray-600 border-gray-500/20"
    );
  };

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
    <section className="relative py-6 px-4 bg-muted/20" aria-label="Publications section">
      {/* Screen reader announcement for copy action */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {announcement}
      </div>

      <div className="container mx-auto max-w-7xl">
        {/* Publications */}
        <section className="relative py-24 px-4">
          <div className="">
            <div className="max-w-4xl mx-auto space-y-6">
              {publications.length === 0 ? (
                <div className="text-center py-12 text-foreground/60" role="status">
                  {t("publications.noPublications")}
                </div>
              ) : (
                <ul role="list" aria-label="Publications list" className="space-y-6 list-none p-0">
                  {publications.map((pub, index) => (
                    <li key={pub.id}>
                      <Card
                        className="group overflow-hidden hover:shadow-lg transition-all duration-300 border-border bg-card hover:bg-card/80"
                        role="article"
                        aria-labelledby={`pub-title-${pub.id}`}
                      >
                        <CardContent className="p-6">
                          <div className="space-y-4">
                            <h3
                              id={`pub-title-${pub.id}`}
                              className="text-lg font-semibold group-hover:text-primary transition-colors"
                            >
                              {pub.title}
                            </h3>
                            {pub.abstract && (
                              <p className="text-foreground/60 text-sm leading-relaxed">
                                {pub.abstract}
                              </p>
                            )}
                            <dl className="space-y-2">
                              <div className="text-foreground/70">
                                <dt className="font-medium inline">{t("publications.authors")}:</dt>{" "}
                                <dd className="inline">
                                  {Array.isArray(pub.authors) ? pub.authors.join(", ") : pub.authors}
                                </dd>
                              </div>
                              {pub.journal && (
                                <div className="text-foreground/70">
                                  <dt className="font-medium inline">{t("publications.journal")}:</dt>{" "}
                                  <dd className="inline">
                                    {pub.journal}{pub.year ? `, ${pub.year}` : ""}
                                  </dd>
                                </div>
                              )}
                              {pub.doi && (
                                <div className="text-sm font-mono">
                                  <dt className="font-medium text-foreground/70 inline">{t("publications.doi")}:</dt>{" "}
                                  <dd className="inline">
                                    <a
                                      href={getDoiUrl(pub.doi) || "#"}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-primary hover:underline"
                                      aria-label={`DOI link for ${pub.title}, opens in new tab`}
                                    >
                                      {pub.doi}
                                    </a>
                                  </dd>
                                </div>
                              )}
                              {pub.citationCount !== null && pub.citationCount > 0 && (
                                <div className="text-foreground/70 text-sm">
                                  <dt className="font-medium inline">{t("publications.citations")}:</dt>{" "}
                                  <dd className="inline">{pub.citationCount}</dd>
                                </div>
                              )}
                            </dl>
                            <div className="flex gap-2 pt-2">
                              {getPaperUrl(pub) && (
                                <CTAButton
                                  size="sm"
                                  className="group/btn"
                                  textStyle="default"
                                  href={getPaperUrl(pub)!}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  aria-label={`View paper: ${pub.title}, opens in new tab`}
                                >
                                  {t("publications.viewPaper")}
                                  <ExternalLink className="ml-2 w-3 h-3 transition-transform group-hover/btn:translate-x-0.5" aria-hidden="true" />
                                </CTAButton>
                              )}
                              <CTAButton
                                size="sm"
                                textStyle="default"
                                variant="secondary"
                                onClick={() => handleCopyCitation(pub)}
                                aria-label={copiedId === pub.id ? `Citation copied for ${pub.title}` : `Copy citation for ${pub.title}`}
                              >
                                {copiedId === pub.id ? (
                                  <>
                                    {t("publications.copied")}
                                    <Check className="ml-2 w-3 h-3" aria-hidden="true" />
                                  </>
                                ) : (
                                  <>
                                    {t("publications.cite")}
                                    <Copy className="ml-2 w-3 h-3" aria-hidden="true" />
                                  </>
                                )}
                              </CTAButton>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </li>
                  ))}
                </ul>
              )}

              {/* Pagination Controls */}
              {pagination && (
                <nav
                  className="flex items-center justify-center gap-1.5 pt-8"
                  role="navigation"
                  aria-label="Publications pagination"
                >
                  {/* Previous Button */}
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded-full"
                    disabled={pagination.currentPage === 1}
                    asChild={pagination.currentPage !== 1}
                    aria-label={`Go to previous page, page ${pagination.currentPage - 1}`}
                  >
                    {pagination.currentPage === 1 ? (
                      <span aria-hidden="true">
                        <ChevronLeft className="h-4 w-4" />
                      </span>
                    ) : (
                      <Link href={`/publications?page=${pagination.currentPage - 1}`}>
                        <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                        <span className="sr-only">Previous page</span>
                      </Link>
                    )}
                  </Button>

                  {/* Page Numbers */}
                  <div className="flex items-center gap-1" role="list" aria-label="Page numbers">
                    {getPageNumbers().map((page, idx) =>
                      page === "ellipsis" ? (
                        <span key={`ellipsis-${idx}`} className="px-1 text-foreground/50 text-sm" aria-hidden="true">
                          ...
                        </span>
                      ) : (
                        <Button
                          key={page}
                          variant={pagination.currentPage === page ? "default" : "outline"}
                          size="icon"
                          className="h-8 w-8 rounded-full text-xs"
                          asChild={pagination.currentPage !== page}
                          aria-label={pagination.currentPage === page ? `Current page, page ${page}` : `Go to page ${page}`}
                          aria-current={pagination.currentPage === page ? "page" : undefined}
                        >
                          {pagination.currentPage === page ? (
                            <span>{page}</span>
                          ) : (
                            <Link href={`/publications?page=${page}`}>{page}</Link>
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
                    disabled={pagination.currentPage === pagination.totalPages || pagination.totalPages === 0}
                    asChild={pagination.currentPage !== pagination.totalPages && pagination.totalPages > 0}
                    aria-label={`Go to next page, page ${pagination.currentPage + 1}`}
                  >
                    {pagination.currentPage === pagination.totalPages || pagination.totalPages === 0 ? (
                      <span aria-hidden="true">
                        <ChevronRight className="h-4 w-4" />
                      </span>
                    ) : (
                      <Link href={`/publications?page=${pagination.currentPage + 1}`}>
                        <ChevronRight className="h-4 w-4" aria-hidden="true" />
                        <span className="sr-only">Next page</span>
                      </Link>
                    )}
                  </Button>
                </nav>
              )}

              {/* Results Info */}
              {pagination && (
                <div
                  className="text-center text-sm text-foreground/50 pt-2"
                  role="status"
                  aria-live="polite"
                >
                  {t("common.showing")} {((pagination.currentPage - 1) * 10) + 1}–{Math.min(pagination.currentPage * 10, pagination.totalCount)} {t("common.of")} {pagination.totalCount} {t("publications.publicationsCount")}
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
