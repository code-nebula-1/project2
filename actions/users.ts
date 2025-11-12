'use server';

import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { revalidatePath } from 'next/cache';

export type User = {
  id: string;
  email: string;
  name: string | null;
  role: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateUserInput = {
  email: string;
  password: string;
  name?: string;
  role?: string;
};

export type UpdateUserInput = {
  email?: string;
  password?: string;
  name?: string;
  role?: string;
};

// Get all users
export async function getUsers(): Promise<User[]> {
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return users;
  } catch (error) {
    console.error('Failed to fetch users:', error);
    throw new Error('Failed to fetch users');
  }
}

// Get user by ID
export async function getUserById(id: string): Promise<User | null> {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return user;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user');
  }
}

// Create a new user
export async function createUser(data: CreateUserInput) {
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
      data: {
        email: data.email,
        password: hashedPassword,
        name: data.name || null,
        role: data.role || 'user',
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    revalidatePath('/admin/users');
    return { success: true, user };
  } catch (error: any) {
    console.error('Failed to create user:', error);
    if (error.code === 'P2002') {
      return { success: false, error: 'A user with this email already exists' };
    }
    return { success: false, error: 'Failed to create user' };
  }
}

// Update a user
export async function updateUser(id: string, data: UpdateUserInput) {
  try {
    const updateData: any = {};
    
    if (data.email !== undefined) updateData.email = data.email;
    if (data.name !== undefined) updateData.name = data.name;
    if (data.role !== undefined) updateData.role = data.role;
    
    // Hash the password if it's being updated
    if (data.password) {
      updateData.password = await bcrypt.hash(data.password, 10);
    }

    const user = await prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    revalidatePath('/admin/users');
    return { success: true, user };
  } catch (error: any) {
    console.error('Failed to update user:', error);
    if (error.code === 'P2002') {
      return { success: false, error: 'A user with this email already exists' };
    }
    if (error.code === 'P2025') {
      return { success: false, error: 'User not found' };
    }
    return { success: false, error: 'Failed to update user' };
  }
}

// Delete a user
export async function deleteUser(id: string) {
  try {
    await prisma.user.delete({
      where: { id },
    });

    revalidatePath('/admin/users');
    return { success: true };
  } catch (error: any) {
    console.error('Failed to delete user:', error);
    if (error.code === 'P2025') {
      return { success: false, error: 'User not found' };
    }
    return { success: false, error: 'Failed to delete user' };
  }
}

// Authenticate user
export async function authenticateUser(email: string, password: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    console.log('user', user);

    if (!user) {
      return { success: false, error: 'Invalid credentials' };
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return { success: false, error: 'Invalid credentials' };
    }

    return {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
  } catch (error) {
    console.error('Authentication failed:', error);
    return { success: false, error: 'Authentication failed' };
  }
}

