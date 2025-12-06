import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  // Seed Admin User
  const existingAdmin = await prisma.user.findUnique({
    where: { email: 'admin@admin.com' },
  });

  if (existingAdmin) {
    console.log('Admin user already exists');
  } else {
    const hashedPassword = await bcrypt.hash('admin1234', 10);

    const admin = await prisma.user.create({
      data: {
        email: 'admin@admin.com',
        password: hashedPassword,
        name: 'Admin User',
        role: 'admin',
      },
    });

    console.log('Created admin user:', admin.email);
    console.log('Email: admin@admin.com');
    console.log('Password: admin1234');
  }

  // ============================================
  // Seed Settings
  // ============================================

  // Join Team Settings
  const existingJoinTeam = await prisma.settings.findUnique({
    where: { name: 'join_team' },
  });

  if (existingJoinTeam) {
    console.log('Join Team settings already exist');
  } else {
    await prisma.settings.create({
      data: {
        name: 'join_team',
        status: true,
        data: {
          title: 'Join Our Team',
          content: 'We are always looking for talented individuals to join our research team. If you are passionate about human-computer interaction and robotics, we would love to hear from you.',
        },
      },
    });
    console.log('Created Join Team settings');
  }

  // Map Location Settings
  const existingMapLocation = await prisma.settings.findUnique({
    where: { name: 'map_location' },
  });

  if (existingMapLocation) {
    console.log('Map Location settings already exist');
  } else {
    await prisma.settings.create({
      data: {
        name: 'map_location',
        status: true,
        data: {
          name: 'Research Lab',
          description: 'Visit our research facility where we explore human-computer interaction and robotics.',
          lat: 42.6334,
          lng: -71.3162,
          zoom: 15,
          address: '1 University Ave, Lowell, MA 01854',
        },
      },
    });
    console.log('Created Map Location settings');
  }

  console.log('Seed completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

