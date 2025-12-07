'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export type News = {
  id: string;
  title: string;
  content: string | null;
  url: string | null;
  type: string;
  platform: string | null;
  featured: boolean;
  status: boolean;
  addedBy: string | null;
  publishedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateNewsInput = {
  title: string;
  content?: string;
  url?: string;
  type?: string; // announcement, blog, social_embed
  platform?: string; // twitter, instagram, facebook, medium, youtube, linkedin, tiktok
  featured?: boolean;
  status?: boolean; // true = visible, false = hidden
  addedBy?: string;
  publishedAt?: Date | string;
};

export type UpdateNewsInput = {
  title?: string;
  content?: string;
  url?: string;
  type?: string;
  platform?: string;
  featured?: boolean;
  status?: boolean;
  addedBy?: string;
  publishedAt?: Date | string | null;
};

// Get all news (for admin - includes inactive)
export async function getNews(): Promise<News[]> {
  try {
    const news = await prisma.news.findMany({
      orderBy: [
        { publishedAt: 'desc' },
        { createdAt: 'desc' },
      ],
    });
    return news;
  } catch (error) {
    console.error('Failed to fetch news:', error);
    throw new Error('Failed to fetch news');
  }
}

// Get active news only (for public pages - only status = true)
export async function getActiveNews(): Promise<News[]> {
  try {
    const news = await prisma.news.findMany({
      where: { status: true },
      orderBy: [
        { publishedAt: 'desc' },
        { createdAt: 'desc' },
      ],
    });
    return news;
  } catch (error) {
    console.error('Failed to fetch news:', error);
    throw new Error('Failed to fetch news');
  }
}

// Get all news sorted by publishedAt (fallback to createdAt)
export async function getNewsSorted(activeOnly: boolean = false): Promise<News[]> {
  try {
    const news = await prisma.news.findMany({
      where: activeOnly ? { status: true } : undefined,
      orderBy: [
        { publishedAt: 'desc' },
        { createdAt: 'desc' },
      ],
    });
    return news;
  } catch (error) {
    console.error('Failed to fetch news:', error);
    throw new Error('Failed to fetch news');
  }
}

export type PaginatedNews = {
  news: News[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
};

// Get paginated news (for public pages - only active by default)
export async function getPaginatedNews(
  page: number = 1,
  pageSize: number = 10,
  activeOnly: boolean = true
): Promise<PaginatedNews> {
  try {
    const skip = (page - 1) * pageSize;
    const whereClause = activeOnly ? { status: true } : undefined;

    const [news, totalCount] = await Promise.all([
      prisma.news.findMany({
        where: whereClause,
        orderBy: [
          { publishedAt: 'desc' },
          { createdAt: 'desc' },
        ],
        skip,
        take: pageSize,
      }),
      prisma.news.count({ where: whereClause }),
    ]);

    return {
      news,
      totalCount,
      totalPages: Math.ceil(totalCount / pageSize),
      currentPage: page,
      pageSize,
    };
  } catch (error) {
    console.error('Failed to fetch paginated news:', error);
    throw new Error('Failed to fetch news');
  }
}

// Get featured news (only active ones for public display)
export async function getFeaturedNews(activeOnly: boolean = true): Promise<News[]> {
  try {
    const news = await prisma.news.findMany({
      where: {
        featured: true,
        ...(activeOnly ? { status: true } : {}),
      },
      orderBy: [
        { publishedAt: 'desc' },
        { createdAt: 'desc' },
      ],
    });
    return news;
  } catch (error) {
    console.error('Failed to fetch featured news:', error);
    throw new Error('Failed to fetch featured news');
  }
}

// Get news by type (only active ones by default)
export async function getNewsByType(type: string, activeOnly: boolean = true): Promise<News[]> {
  try {
    const news = await prisma.news.findMany({
      where: {
        type,
        ...(activeOnly ? { status: true } : {}),
      },
      orderBy: [
        { publishedAt: 'desc' },
        { createdAt: 'desc' },
      ],
    });
    return news;
  } catch (error) {
    console.error('Failed to fetch news by type:', error);
    throw new Error('Failed to fetch news');
  }
}

// Get news by ID
export async function getNewsById(id: string): Promise<News | null> {
  try {
    const news = await prisma.news.findUnique({
      where: { id },
    });
    return news;
  } catch (error) {
    console.error('Failed to fetch news:', error);
    throw new Error('Failed to fetch news');
  }
}

// Create a new news item
export async function createNews(data: CreateNewsInput) {
  try {
    const news = await prisma.news.create({
      data: {
        title: data.title,
        content: data.content || null,
        url: data.url || null,
        type: data.type || 'announcement',
        platform: data.platform || null,
        featured: data.featured || false,
        status: data.status !== undefined ? data.status : true,
        addedBy: data.addedBy || null,
        publishedAt: data.publishedAt ? new Date(data.publishedAt) : null,
      },
    });

    revalidatePath('/admin/news');
    revalidatePath('/news');
    return { success: true, news };
  } catch (error: any) {
    console.error('Failed to create news:', error);
    return { success: false, error: 'Failed to create news' };
  }
}

// Update a news item
export async function updateNews(id: string, data: UpdateNewsInput) {
  try {
    const updateData: any = {};

    if (data.title !== undefined) updateData.title = data.title;
    if (data.content !== undefined) updateData.content = data.content || null;
    if (data.url !== undefined) updateData.url = data.url || null;
    if (data.type !== undefined) updateData.type = data.type;
    if (data.platform !== undefined) updateData.platform = data.platform || null;
    if (data.featured !== undefined) updateData.featured = data.featured;
    if (data.status !== undefined) updateData.status = data.status;
    if (data.addedBy !== undefined) updateData.addedBy = data.addedBy || null;
    if (data.publishedAt !== undefined) {
      updateData.publishedAt = data.publishedAt ? new Date(data.publishedAt) : null;
    }

    const news = await prisma.news.update({
      where: { id },
      data: updateData,
    });

    revalidatePath('/admin/news');
    revalidatePath('/news');
    return { success: true, news };
  } catch (error: any) {
    console.error('Failed to update news:', error);
    if (error.code === 'P2025') {
      return { success: false, error: 'News not found' };
    }
    return { success: false, error: 'Failed to update news' };
  }
}

// Delete a news item
export async function deleteNews(id: string) {
  try {
    await prisma.news.delete({
      where: { id },
    });

    revalidatePath('/admin/news');
    revalidatePath('/news');
    return { success: true };
  } catch (error: any) {
    console.error('Failed to delete news:', error);
    if (error.code === 'P2025') {
      return { success: false, error: 'News not found' };
    }
    return { success: false, error: 'Failed to delete news' };
  }
}

