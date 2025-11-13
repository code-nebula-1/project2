# Database Setup Guide

## Overview
This project uses PostgreSQL via Neon with Prisma ORM.

## Database Schema

### Users Table
- `id`: Unique identifier (CUID)
- `email`: User email (unique)
- `name`: Optional user name
- `role`: User role (default: "user")
- `createdAt`: Timestamp when user was created
- `updatedAt`: Timestamp when user was last updated

### Publications Table
- `id`: Unique identifier (CUID)
- `title`: Publication title
- `abstract`: Publication abstract (text)
- `authors`: Array of author names
- `journal`: Journal name
- `year`: Publication year
- `doi`: Digital Object Identifier (unique)
- `url`: Publication URL
- `pdfUrl`: URL to PDF file
- `citationCount`: Number of citations
- `createdAt`: Timestamp when record was created
- `updatedAt`: Timestamp when record was last updated
- `createdById`: ID of the user who created this publication
- `createdBy`: Relation to User model

## Setup Instructions

### 1. Environment Variables
Make sure your `.env` file exists with the database credentials (already created).

### 2. Generate Prisma Client
```bash
npm run db:generate
```

### 3. Run Migrations
```bash
npm run db:migrate
```

When prompted, enter a name for your migration (e.g., "init" or "initial_schema").

### 4. (Alternative) Push Schema Without Migration
If you don't need migration history:
```bash
npm run db:push
```

### 5. Open Prisma Studio (Optional)
To view and edit your database in a GUI:
```bash
npm run db:studio
```

## Available Scripts

- `npm run db:generate` - Generate Prisma Client
- `npm run db:push` - Push schema changes to database (no migration)
- `npm run db:migrate` - Create and run migrations
- `npm run db:studio` - Open Prisma Studio GUI

## Usage in Code

Import the Prisma client from `lib/prisma.ts`:

```typescript
import { prisma } from '@/lib/prisma'

// Example: Create a user
const user = await prisma.user.create({
  data: {
    email: 'user@example.com',
    name: 'John Doe',
  }
})

// Example: Create a publication
const publication = await prisma.publication.create({
  data: {
    title: 'Research Paper Title',
    abstract: 'This is the abstract...',
    authors: ['John Doe', 'Jane Smith'],
    year: 2025,
    createdById: user.id,
  }
})

// Example: Query publications with creator
const publications = await prisma.publication.findMany({
  include: {
    createdBy: true,
  },
  orderBy: {
    createdAt: 'desc',
  },
})
```

