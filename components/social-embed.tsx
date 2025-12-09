"use client";

import {
  ExternalLink,
  Facebook,
  Linkedin,
  FileText,
} from "lucide-react";

type SocialEmbedProps = {
  url: string;
  platform: string | null;
  className?: string;
  title?: string;
};

// Helper to extract YouTube video ID
function getYouTubeVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/shorts\/([^&\n?#]+)/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

// Helper to get platform display name
function getPlatformDisplayName(platform: string | null): string {
  const names: Record<string, string> = {
    youtube: "YouTube",
    twitter: "Twitter",
    instagram: "Instagram",
    tiktok: "TikTok",
    facebook: "Facebook",
    linkedin: "LinkedIn",
    medium: "Medium",
    pinterest: "Pinterest",
  };
  return platform ? names[platform] || platform : "external site";
}

export function SocialEmbed({ url, platform, className, title }: SocialEmbedProps) {
  if (!url) return null;

  const platformName = getPlatformDisplayName(platform);

  switch (platform) {
    case "youtube": {
      const videoId = getYouTubeVideoId(url);
      if (videoId) {
        return (
          <div className={`flex justify-center ${className || ""}`}>
            <iframe
              width="550"
              height="310"
              src={`https://www.youtube.com/embed/${videoId}`}
              title={title || `YouTube video from PIERS Lab`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg max-w-full"
              aria-label={title || "Embedded YouTube video"}
            />
          </div>
        );
      }
      break;
    }
    case "twitter": {
      // Use Twitter's oEmbed via blockquote (requires Twitter widget script)
      return (
        <div
          className={`flex justify-center ${className || ""}`}
          role="region"
          aria-label={`Embedded tweet${title ? `: ${title}` : ''}`}
        >
          <blockquote className="twitter-tweet" data-theme="light">
            <a href={url} aria-label="View original tweet on Twitter">Loading tweet...</a>
          </blockquote>
          <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
        </div>
      );
    }
    case "instagram": {
      // Instagram embeds require their embed script
      return (
        <div
          className={`flex justify-center ${className || ""}`}
          role="region"
          aria-label={`Embedded Instagram post${title ? `: ${title}` : ''}`}
        >
          <blockquote
            className="instagram-media"
            data-instgrm-permalink={url}
            data-instgrm-version="14"
            style={{ maxWidth: 550, width: "100%" }}
          >
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View this post on Instagram (opens in new tab)"
            >
              View on Instagram
            </a>
          </blockquote>
          <script async src="//www.instagram.com/embed.js"></script>
        </div>
      );
    }
    case "tiktok": {
      // TikTok embed
      return (
        <div
          className={`flex justify-center ${className || ""}`}
          role="region"
          aria-label={`Embedded TikTok video${title ? `: ${title}` : ''}`}
        >
          <blockquote
            className="tiktok-embed"
            cite={url}
            data-video-id={url.split("/").pop()?.split("?")[0]}
            style={{ maxWidth: 325 }}
          >
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View this video on TikTok (opens in new tab)"
            >
              View on TikTok
            </a>
          </blockquote>
          <script async src="https://www.tiktok.com/embed.js"></script>
        </div>
      );
    }
  }

  // Fallback: show a styled link card
  return (
    <div className={`flex justify-center ${className || ""}`}>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg border hover:bg-muted transition-colors max-w-md w-full"
        aria-label={`View content on ${platformName} (opens in new tab)`}
      >
        <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center" aria-hidden="true">
          {platform === "facebook" && <Facebook className="w-5 h-5 text-blue-600" />}
          {platform === "linkedin" && <Linkedin className="w-5 h-5 text-blue-700" />}
          {platform === "medium" && <FileText className="w-5 h-5 text-gray-800" />}
          {platform === "pinterest" && <ExternalLink className="w-5 h-5 text-red-600" />}
          {!platform && <ExternalLink className="w-5 h-5 text-primary" />}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">View on {platformName}</p>
          <p className="text-xs text-muted-foreground truncate" aria-hidden="true">{url}</p>
        </div>
        <ExternalLink className="w-4 h-4 text-muted-foreground flex-shrink-0" aria-hidden="true" />
      </a>
    </div>
  );
}
