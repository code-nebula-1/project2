# PIERS Lab - Research Laboratory Web Platform

A modern, full-stack web application built for a research laboratory, featuring a public-facing website and a protected administrative dashboard for content management.

**Live Site:** https://web-systems-sigma.vercel.app/  
**Admin Panel:** https://web-systems-sigma.vercel.app/admin/login

## Admin Access
- **Email:** admin@admin.com
- **Password:** admin1234

## Project Overview

PIERS Lab is a comprehensive web platform that serves as the digital home for the Piers laboratory in UMAS Lowell. The application provides both a public interface for visitors and a secure admin dashboard for managing all site content.

### Key Features

**Public Website:**
- Team member profiles with photos and contact information
- Publications listing with search and filtering
- News feed with social media integration (Twitter, Instagram, YouTube, LinkedIn)
- Interactive location map showing lab facilities
- Bilingual support (English/Spanish)
- Responsive design optimized for all devices

**Admin Dashboard:**
- User management system
- Publications CRUD with pagination
- News management with support for announcements, blog posts, and social embeds
- Team member management
- Dynamic site settings (location, join team information)
- Secure authentication with session management

## Technology Stack

### Frontend
- **Next.js 15** - React framework with App Router architecture
- **React 19** - UI library
- **TypeScript** - Type safety throughout the application
- **Tailwind CSS** - Utility-first styling
- **Radix UI** - Accessible UI component primitives
- **Lucide React** - Icon library
- **React Hook Form + Zod** - Form handling with validation

### Backend
- **Next.js Server Actions** - Serverless API layer
- **PostgreSQL** - Production database
- **Prisma ORM** - Type-safe database access
- **bcrypt** - Password hashing
- **jose** - JWT token management

## Architecture Highlights

### Application Structure

The project uses Next.js 15's App Router with a clear separation between public and admin sections:

- **`app/(main)/`** - Public-facing pages (homepage, news, publications, team, contact)
- **`app/admin/`** - Admin login and dashboard routes
- **`components/`** - Reusable UI components
- **`actions/`** - Server-side business logic (auth, CRUD operations)
- **`lib/`** - Utilities and configuration (session management, i18n, database client)

### Data Flow

1. **Client-side** pages and components request data
2. **Server Actions** handle business logic and data operations
3. **Prisma ORM** interfaces with the PostgreSQL database
4. **Results** are returned and rendered on the page

### Security Implementation

**Authentication:**
- JWT-based session management with 7-day expiration
- HTTP-only, secure cookies preventing XSS attacks
- Password hashing using bcrypt with 10 salt rounds
- Route protection via Next.js middleware

**Session Flow:**
1. User submits credentials
2. Server verifies against hashed password in database
3. JWT token created and stored in secure cookie
4. Middleware validates token on each admin route access
5. Invalid/expired sessions redirect to login

### Database Schema

The application uses five main entities:

- **Users** - Admin accounts with role-based access
- **Publications** - Research papers with metadata (DOI, citations, PDFs)
- **News** - Announcements, blog posts, and social media embeds
- **Team** - Lab member profiles and information
- **Settings** - Dynamic configuration stored as JSON key-value pairs

Relationships include foreign keys linking publications to their creators and indexes for optimized querying on frequently filtered fields.

### Internationalization

Client-side language switching between English and Spanish using React Context. The system:
- Detects browser language on first visit
- Persists preference in localStorage
- Provides translation function accessible throughout the app
- Supports easy addition of new languages via JSON files

## Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- npm or pnpm package manager

### Installation

1. **Clone and install dependencies:**
```bash
   git clone [repository-url]
   cd project2
   npm install
```

2. **Configure environment variables:**
```bash
   # Create .env file with:
   DATABASE_URL="postgresql://user:password@host:5432/database"
   SESSION_SECRET="your-secure-random-string"
   NODE_ENV="development"
```

3. **Set up database:**
```bash
   npm run db:migrate    # Run migrations
   npm run db:seed       # (Optional) Seed with sample data
```

4. **Start development server:**
```bash
   npm run dev
```

5. **Access the application:**
   - Public site: http://localhost:3000
   - Admin panel: http://localhost:3000/admin

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Run production build
- `npm run db:migrate` - Run database migrations
- `npm run db:studio` - Open Prisma Studio (database GUI)
- `npm run db:seed ` - Seed database with dummy data.

## Project Structure
```
project2/
├── app/                    # Pages and routing
│   ├── (main)/            # Public website routes
│   └── admin/             # Admin panel routes
├── components/            # Reusable UI components
│   └── ui/               # Base component library
├── actions/              # Server actions (backend logic)
├── lib/                  # Utilities and configuration
├── prisma/               # Database schema and migrations
├── locales/              # Translation files
└── public/               # Static assets
```

## Features in Detail

### Dynamic Content Management

Administrators can manage all site content through intuitive forms:
- **Publications**: Add research papers with DOIs, authors, abstracts, and PDFs
- **News**: Create announcements, blog posts, or embed social media content
- **Team**: Update member profiles, roles, and contact information
- **Settings**: Configure lab location, join information, and other site-wide settings

### Social Media Integration

The news section supports embedded content from multiple platforms:
- Twitter/X posts
- Instagram posts
- YouTube videos
- LinkedIn posts
- TikTok videos

Content is rendered using platform-specific embed components with responsive design.

### Responsive Design

The application is fully responsive with:
- Mobile-optimized navigation menu
- Touch-friendly admin interface
- Adaptive layouts for all screen sizes
- Accessible components following WCAG guidelines

## Deployment

The application is deployed on Vercel with:
- Automatic deployments from the main branch
- Environment variables configured in Vercel dashboard
- PostgreSQL database hosted separately
- Edge-optimized serverless functions

## Notes for Evaluation

- Initial database setup available in `setup-db-with-neon` branch
- All admin features require authentication
- Sample data can be loaded using the seed script - npm run db:seed
- The application demonstrates modern full-stack development practices including:
  - Server-side rendering with React Server Components
  - Type-safe database operations
  - Secure authentication implementation
  - Accessibility-first component design
  - Internationalization support