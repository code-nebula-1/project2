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

export function SocialEmbed({ url, platform, className }: SocialEmbedProps) {
  if (!url) return null;

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
              title="YouTube video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg max-w-full"
            />
          </div>
        );
      }
      break;
    }
    case "twitter": {
      // Use Twitter's oEmbed via blockquote (requires Twitter widget script)
      return (
        <div className={`flex justify-center ${className || ""}`}>
          <blockquote className="twitter-tweet" data-theme="light">
            <a href={url}>Loading tweet...</a>
          </blockquote>
          <script async src="https://platform.twitter.com/widgets.js" charSet="utf-8"></script>
        </div>
      );
    }
    case "instagram": {
      // Instagram embeds require their embed script
      return (
        <div className={`flex justify-center ${className || ""}`}>
          <blockquote
            className="instagram-media"
            data-instgrm-permalink={url}
            data-instgrm-version="14"
            style={{ maxWidth: 550, width: "100%" }}
          >
            <a href={url} target="_blank" rel="noopener noreferrer">
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
        <div className={`flex justify-center ${className || ""}`}>
          <blockquote
            className="tiktok-embed"
            cite={url}
            data-video-id={url.split("/").pop()?.split("?")[0]}
            style={{ maxWidth: 325 }}
          >
            <a href={url} target="_blank" rel="noopener noreferrer">
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
      >
        <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
          {platform === "facebook" && <Facebook className="w-5 h-5 text-blue-600" />}
          {platform === "linkedin" && <Linkedin className="w-5 h-5 text-blue-700" />}
          {platform === "medium" && <FileText className="w-5 h-5 text-gray-800" />}
          {platform === "pinterest" && <ExternalLink className="w-5 h-5 text-red-600" />}
          {!platform && <ExternalLink className="w-5 h-5 text-primary" />}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">View on {platform || "external site"}</p>
          <p className="text-xs text-muted-foreground truncate">{url}</p>
        </div>
        <ExternalLink className="w-4 h-4 text-muted-foreground flex-shrink-0" />
      </a>
    </div>
  );
}
