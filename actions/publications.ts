'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export type Publication = {
  id: string;
  title: string;
  abstract: string | null;
  authors: string[];
  journal: string | null;
  year: number | null;
  doi: string | null;
  url: string | null;
  pdfUrl: string | null;
  citationCount: number | null;
  createdAt: Date;
  updatedAt: Date;
  createdById: string;
  createdBy: {
    id: string;
    email: string;
    name: string | null;
  };
};

export type CreatePublicationInput = {
  title: string;
  abstract?: string;
  authors: string[];
  journal?: string;
  year?: number;
  doi?: string;
  url?: string;
  pdfUrl?: string;
  citationCount?: number;
  createdById: string;
};

export type UpdatePublicationInput = {
  title?: string;
  abstract?: string;
  authors?: string[];
  journal?: string;
  year?: number;
  doi?: string;
  url?: string;
  pdfUrl?: string;
  citationCount?: number;
};

// Get all publications
export async function getPublications(): Promise<Publication[]> {
  try {
    const publications = await prisma.publication.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        createdBy: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
    });
    return publications;
  } catch (error) {
    console.error('Failed to fetch publications:', error);
    throw new Error('Failed to fetch publications');
  }
}

// Get publication by ID
export async function getPublicationById(id: string): Promise<Publication | null> {
  try {
    const publication = await prisma.publication.findUnique({
      where: { id },
      include: {
        createdBy: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
    });
    return publication;
  } catch (error) {
    console.error('Failed to fetch publication:', error);
    throw new Error('Failed to fetch publication');
  }
}

// Create a new publication
export async function createPublication(data: CreatePublicationInput) {
  try {
    const publication = await prisma.publication.create({
      data: {
        title: data.title,
        abstract: data.abstract || null,
        authors: data.authors,
        journal: data.journal || null,
        year: data.year || null,
        doi: data.doi || null,
        url: data.url || null,
        pdfUrl: data.pdfUrl || null,
        citationCount: data.citationCount || 0,
        createdById: data.createdById,
      },
      include: {
        createdBy: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
    });

    revalidatePath('/admin/publications');
    return { success: true, publication };
  } catch (error: any) {
    console.error('Failed to create publication:', error);
    if (error.code === 'P2002') {
      return { success: false, error: 'A publication with this DOI already exists' };
    }
    if (error.code === 'P2003') {
      return { success: false, error: 'Invalid user ID' };
    }
    return { success: false, error: 'Failed to create publication' };
  }
}

// Update a publication
export async function updatePublication(id: string, data: UpdatePublicationInput) {
  try {
    const updateData: any = {};
    
    if (data.title !== undefined) updateData.title = data.title;
    if (data.abstract !== undefined) updateData.abstract = data.abstract;
    if (data.authors !== undefined) updateData.authors = data.authors;
    if (data.journal !== undefined) updateData.journal = data.journal;
    if (data.year !== undefined) updateData.year = data.year;
    if (data.doi !== undefined) updateData.doi = data.doi;
    if (data.url !== undefined) updateData.url = data.url;
    if (data.pdfUrl !== undefined) updateData.pdfUrl = data.pdfUrl;
    if (data.citationCount !== undefined) updateData.citationCount = data.citationCount;

    const publication = await prisma.publication.update({
      where: { id },
      data: updateData,
      include: {
        createdBy: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
    });

    revalidatePath('/admin/publications');
    return { success: true, publication };
  } catch (error: any) {
    console.error('Failed to update publication:', error);
    if (error.code === 'P2002') {
      return { success: false, error: 'A publication with this DOI already exists' };
    }
    if (error.code === 'P2025') {
      return { success: false, error: 'Publication not found' };
    }
    return { success: false, error: 'Failed to update publication' };
  }
}

// Delete a publication
export async function deletePublication(id: string) {
  try {
    await prisma.publication.delete({
      where: { id },
    });

    revalidatePath('/admin/publications');
    return { success: true };
  } catch (error: any) {
    console.error('Failed to delete publication:', error);
    if (error.code === 'P2025') {
      return { success: false, error: 'Publication not found' };
    }
    return { success: false, error: 'Failed to delete publication' };
  }
}

