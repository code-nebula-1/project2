// Helper to detect social media platform from URL
export function detectPlatform(url: string): string | null {
  if (!url) return null;

  const urlLower = url.toLowerCase();

  if (urlLower.includes('twitter.com') || urlLower.includes('x.com')) return 'twitter';
  if (urlLower.includes('instagram.com')) return 'instagram';
  if (urlLower.includes('facebook.com') || urlLower.includes('fb.com')) return 'facebook';
  if (urlLower.includes('medium.com')) return 'medium';
  if (urlLower.includes('youtube.com') || urlLower.includes('youtu.be')) return 'youtube';
  if (urlLower.includes('linkedin.com')) return 'linkedin';
  if (urlLower.includes('tiktok.com')) return 'tiktok';
  if (urlLower.includes('pinterest.com')) return 'pinterest';

  return null;
}
