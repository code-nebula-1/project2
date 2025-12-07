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

  // ============================================
  // Seed News
  // ============================================

  const existingNews = await prisma.news.count();

  if (existingNews > 0) {
    console.log('News already exist, skipping seed');
  } else {
    const newsItems = [
      {
        title: 'Breakthrough in Autonomous Navigation Systems',
        content: 'Our research team has achieved a significant milestone in developing next-generation autonomous navigation algorithms that can operate in complex, dynamic environments with unprecedented accuracy. This work opens new possibilities for robotics applications in healthcare, manufacturing, and everyday life.',
        type: 'announcement',
        featured: true,
        status: true,
        addedBy: 'Dr. Sarah Chen',
        publishedAt: new Date('2024-12-01'),
      },
      {
        title: 'New Partnership with TechCorp for Industrial Robotics',
        content: 'We are excited to announce a new collaboration with TechCorp to develop advanced industrial robotics solutions for manufacturing applications. This partnership will accelerate the deployment of our research findings into real-world applications.',
        type: 'announcement',
        featured: true,
        status: true,
        addedBy: 'Dr. Michael Rodriguez',
        publishedAt: new Date('2024-11-28'),
      },
      {
        title: 'PhD Student Sarah Johnson Wins Best Paper Award',
        content: 'Congratulations to Sarah Johnson for receiving the Best Paper Award at the International Conference on Human-Robot Interaction for her work on collaborative manufacturing robots. Her research demonstrates innovative approaches to human-robot collaboration in industrial settings.',
        type: 'announcement',
        featured: false,
        status: true,
        addedBy: 'Research Team',
        publishedAt: new Date('2024-11-20'),
      },
      {
        title: 'Lab Receives $2M Grant for Swarm Robotics Research',
        content: 'The National Science Foundation has awarded our lab a $2 million grant to advance research in swarm robotics and multi-agent coordination systems. This funding will support groundbreaking research over the next three years.',
        type: 'blog',
        featured: false,
        status: true,
        addedBy: 'Dr. Alex Kumar',
        publishedAt: new Date('2024-11-15'),
      },
      {
        title: 'New Publication: Machine Learning for Robotic Manipulation',
        content: 'Our latest research paper on machine learning approaches for robotic manipulation has been accepted for publication in the Journal of Robotics Research. The paper presents novel techniques for improving robot dexterity and adaptability.',
        type: 'blog',
        url: 'https://example.com/publication/ml-robotics',
        featured: false,
        status: true,
        addedBy: 'Dr. James Park',
        publishedAt: new Date('2024-11-10'),
      },
      {
        title: 'Watch: Demo of Our Latest Robot Navigation System',
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        type: 'social_embed',
        platform: 'youtube',
        featured: false,
        status: true,
        addedBy: 'Media Team',
        publishedAt: new Date('2024-11-05'),
      },
      {
        title: 'Robotics Conference 2024: Call for Papers',
        content: 'We are organizing the 2024 International Conference on Advanced Robotics, and we are now accepting paper submissions for the conference program. Join researchers from around the world to share the latest advances in robotics.',
        type: 'announcement',
        featured: false,
        status: true,
        addedBy: 'Conference Committee',
        publishedAt: new Date('2024-11-01'),
      },
      {
        title: 'Behind the Scenes: A Day in Our Research Lab',
        content: 'Take a peek into our daily research activities. From morning brainstorming sessions to late-night experiments, our team works tirelessly to push the boundaries of robotics and human-computer interaction.',
        type: 'blog',
        featured: false,
        status: true,
        addedBy: 'Lab Staff',
        publishedAt: new Date('2024-10-25'),
      },
    ];

    for (const item of newsItems) {
      await prisma.news.create({ data: item });
    }

    console.log(`Created ${newsItems.length} news items`);
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

