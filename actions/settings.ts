'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

// Server actions for managing website settings

export interface Settings {
    id: string;
    showJoinTeam: boolean;
    joinTeamTitle: string | null;
    joinTeamContent: string | null;
    updatedAt: Date;
}

/**
 * Get or create settings (ensures there's always a settings record)
 */
export async function getSettings(): Promise<Settings> {
    // Try to get the first settings record
    let settings = await prisma.settings.findFirst();

    // If no settings exist, create default settings
    if (!settings) {
        settings = await prisma.settings.create({
            data: {
                showJoinTeam: true,
                joinTeamTitle: 'Join Our Team',
                joinTeamContent: 'We are always looking for talented individuals to join our research team. If you are passionate about human-computer interaction and robotics, we would love to hear from you.',
            },
        });
    }

    return settings;
}

/**
 * Update settings
 */
export async function updateSettings(data: {
    showJoinTeam?: boolean;
    joinTeamTitle?: string | null;
    joinTeamContent?: string | null;
}): Promise<Settings> {
    // Get the current settings
    const currentSettings = await getSettings();

    // Update the settings
    const updatedSettings = await prisma.settings.update({
        where: { id: currentSettings.id },
        data,
    });

    // Revalidate the affected pages
    revalidatePath('/');
    revalidatePath('/teams');
    revalidatePath('/admin/settings');
    revalidatePath('/admin/teams');

    return updatedSettings;
}

