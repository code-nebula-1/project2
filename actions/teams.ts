'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export type Team = {
  id: string;
  name: string;
  role: string | null;
  contact: string | null;
  description: string | null;
  image: string | null;
  website: string | null;
  createdAt: Date;
};

export type CreateTeamInput = {
  name: string;
  role?: string;
  contact?: string;
  description?: string;
  image?: string;
  website?: string;
};

export type UpdateTeamInput = {
  name?: string;
  role?: string;
  contact?: string;
  description?: string;
  image?: string;
  website?: string;
};

// Get all team members
export async function getTeamMembers(): Promise<Team[]> {
  try {
    const teams = await prisma.team.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return teams;
  } catch (error) {
    console.error('Failed to fetch team members:', error);
    throw new Error('Failed to fetch team members');
  }
}

// Get team member by ID
export async function getTeamMemberById(id: string): Promise<Team | null> {
  try {
    const team = await prisma.team.findUnique({
      where: { id },
    });
    return team;
  } catch (error) {
    console.error('Failed to fetch team member:', error);
    throw new Error('Failed to fetch team member');
  }
}

// Create a new team member
export async function createTeamMember(data: CreateTeamInput) {
  try {
    const team = await prisma.team.create({
      data: {
        name: data.name,
        role: data.role || null,
        contact: data.contact || null,
        description: data.description || null,
        image: data.image || null,
        website: data.website || null,
      },
    });

    revalidatePath('/admin/teams');
    revalidatePath('/teams');
    return { success: true, team };
  } catch (error: any) {
    console.error('Failed to create team member:', error);
    return { success: false, error: 'Failed to create team member' };
  }
}

// Update a team member
export async function updateTeamMember(id: string, data: UpdateTeamInput) {
  try {
    const updateData: any = {};
    
    if (data.name !== undefined) updateData.name = data.name;
    if (data.role !== undefined) updateData.role = data.role;
    if (data.contact !== undefined) updateData.contact = data.contact;
    if (data.description !== undefined) updateData.description = data.description;
    if (data.image !== undefined) updateData.image = data.image;
    if (data.website !== undefined) updateData.website = data.website;

    const team = await prisma.team.update({
      where: { id },
      data: updateData,
    });

    revalidatePath('/admin/teams');
    revalidatePath('/teams');
    return { success: true, team };
  } catch (error: any) {
    console.error('Failed to update team member:', error);
    if (error.code === 'P2025') {
      return { success: false, error: 'Team member not found' };
    }
    return { success: false, error: 'Failed to update team member' };
  }
}

// Delete a team member
export async function deleteTeamMember(id: string) {
  try {
    await prisma.team.delete({
      where: { id },
    });

    revalidatePath('/admin/teams');
    revalidatePath('/teams');
    return { success: true };
  } catch (error: any) {
    console.error('Failed to delete team member:', error);
    if (error.code === 'P2025') {
      return { success: false, error: 'Team member not found' };
    }
    return { success: false, error: 'Failed to delete team member' };
  }
}

