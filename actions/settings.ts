'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

// Generic setting result with status
export interface SettingResult<T> {
    id: string;
    name: string;
    status: boolean;
    data: T;
    createdAt: Date;
    updatedAt: Date;
}

// Types for specific settings data
export interface JoinTeamData {
    title: string;
    content: string;
}

export interface MapLocationData {
    name: string;
    description: string;
    lat: number;
    lng: number;
    zoom?: number;
    address?: string;
}

// Default values
const DEFAULT_JOIN_TEAM: JoinTeamData = {
    title: 'Join Our Team',
    content: 'We are always looking for talented individuals to join our research team. If you are passionate about human-computer interaction and robotics, we would love to hear from you.',
};

const DEFAULT_MAP_LOCATION: MapLocationData = {
    name: 'Research Lab',
    description: 'Visit our research facility where we explore human-computer interaction and robotics.',
    lat: 42.6334,
    lng: -71.3162,
    zoom: 15,
    address: '1 University Ave, Lowell, MA 01854',
};

/**
 * Get a setting by name, returns null if not found
 */
export async function getSetting<T>(name: string): Promise<SettingResult<T> | null> {
    const setting = await prisma.settings.findUnique({
        where: { name },
    });

    if (!setting) return null;

    return {
        id: setting.id,
        name: setting.name,
        status: setting.status,
        data: setting.data as T,
        createdAt: setting.createdAt,
        updatedAt: setting.updatedAt,
    };
}

/**
 * Get a setting by name, or create it with default data if it doesn't exist
 */
export async function getSettingOrCreate<T>(
    name: string,
    defaultData: T,
    defaultStatus: boolean = true
): Promise<SettingResult<T>> {
    let setting = await prisma.settings.findUnique({
        where: { name },
    });

    if (!setting) {
        setting = await prisma.settings.create({
            data: {
                name,
                data: defaultData as object,
                status: defaultStatus,
            },
        });
    }

    return {
        id: setting.id,
        name: setting.name,
        status: setting.status,
        data: setting.data as T,
        createdAt: setting.createdAt,
        updatedAt: setting.updatedAt,
    };
}

/**
 * Update or create a setting
 */
export async function upsertSetting<T>(
    name: string,
    data: T,
    status?: boolean
): Promise<SettingResult<T>> {
    const updateData: { data: object; status?: boolean } = { data: data as object };
    if (status !== undefined) {
        updateData.status = status;
    }

    const setting = await prisma.settings.upsert({
        where: { name },
        update: updateData,
        create: { name, data: data as object, status: status ?? true },
    });

    // Revalidate common paths
    revalidatePath('/');
    revalidatePath('/teams');
    revalidatePath('/admin/settings');

    return {
        id: setting.id,
        name: setting.name,
        status: setting.status,
        data: setting.data as T,
        createdAt: setting.createdAt,
        updatedAt: setting.updatedAt,
    };
}

/**
 * Toggle a setting's status
 */
export async function toggleSettingStatus(name: string): Promise<SettingResult<unknown> | null> {
    const current = await prisma.settings.findUnique({
        where: { name },
    });

    if (!current) return null;

    const setting = await prisma.settings.update({
        where: { name },
        data: { status: !current.status },
    });

    revalidatePath('/');
    revalidatePath('/teams');
    revalidatePath('/admin/settings');

    return {
        id: setting.id,
        name: setting.name,
        status: setting.status,
        data: setting.data,
        createdAt: setting.createdAt,
        updatedAt: setting.updatedAt,
    };
}

/**
 * Update a setting's status
 */
export async function updateSettingStatus(name: string, status: boolean): Promise<SettingResult<unknown> | null> {
    const setting = await prisma.settings.update({
        where: { name },
        data: { status },
    });

    revalidatePath('/');
    revalidatePath('/teams');
    revalidatePath('/admin/settings');

    return {
        id: setting.id,
        name: setting.name,
        status: setting.status,
        data: setting.data,
        createdAt: setting.createdAt,
        updatedAt: setting.updatedAt,
    };
}

/**
 * Delete a setting by name
 */
export async function deleteSetting(name: string): Promise<void> {
    await prisma.settings.delete({
        where: { name },
    });

    revalidatePath('/');
    revalidatePath('/teams');
    revalidatePath('/admin/settings');
}

/**
 * Get all settings
 */
export async function getAllSettings(): Promise<Array<SettingResult<unknown>>> {
    const settings = await prisma.settings.findMany();
    return settings.map((s) => ({
        id: s.id,
        name: s.name,
        status: s.status,
        data: s.data,
        createdAt: s.createdAt,
        updatedAt: s.updatedAt,
    }));
}

// ============================================
// Convenience functions for specific settings
// ============================================

/**
 * Get Join Team settings
 */
export async function getJoinTeamSettings(): Promise<SettingResult<JoinTeamData>> {
    return getSettingOrCreate<JoinTeamData>('join_team', DEFAULT_JOIN_TEAM);
}

/**
 * Update Join Team settings
 */
export async function updateJoinTeamSettings(
    data: Partial<JoinTeamData>,
    status?: boolean
): Promise<SettingResult<JoinTeamData>> {
    const current = await getJoinTeamSettings();
    return upsertSetting<JoinTeamData>('join_team', { ...current.data, ...data }, status ?? current.status);
}

/**
 * Get Map Location settings
 */
export async function getMapLocationSettings(): Promise<SettingResult<MapLocationData>> {
    return getSettingOrCreate<MapLocationData>('map_location', DEFAULT_MAP_LOCATION);
}

/**
 * Update Map Location settings
 */
export async function updateMapLocationSettings(
    data: Partial<MapLocationData>,
    status?: boolean
): Promise<SettingResult<MapLocationData>> {
    const current = await getMapLocationSettings();
    return upsertSetting<MapLocationData>('map_location', { ...current.data, ...data }, status ?? current.status);
}
