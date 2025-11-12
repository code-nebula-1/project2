#!/bin/bash

echo "🚀 Setting up Admin Panel..."

# Check for .env file
if [ ! -f .env ]; then
    echo "⚠️  Warning: .env file not found!"
    echo "Please create a .env file with:"
    echo "  DATABASE_URL=\"your-postgresql-connection-string\""
    echo "  SESSION_SECRET=\"your-secret-key\""
    echo ""
    echo "Generate a session secret with: openssl rand -base64 32"
    echo ""
    read -p "Press Enter to continue or Ctrl+C to exit..."
fi

# Step 1: Install dependencies
echo "📦 Installing dependencies..."
npm install

# Step 2: Generate Prisma Client
echo "🔧 Generating Prisma Client..."
npx prisma generate

# Step 3: Seed the database
echo "🌱 Seeding database with admin user..."
npm run db:seed

echo ""
echo "✅ Setup complete!"
echo ""
echo "🔐 Access the admin panel at: http://localhost:3000/admin"
echo ""
echo "Default login credentials:"
echo "  📧 Email: admin@admin.com"
echo "  🔑 Password: admin1234"
echo ""
echo "⚠️  Remember to change the default password after first login!"

