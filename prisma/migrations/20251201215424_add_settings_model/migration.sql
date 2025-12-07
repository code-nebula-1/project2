-- CreateTable
CREATE TABLE "settings" (
    "id" TEXT NOT NULL,
    "show_join_team" BOOLEAN NOT NULL DEFAULT true,
    "join_team_title" TEXT DEFAULT 'Join Our Team',
    "join_team_content" TEXT,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "settings_pkey" PRIMARY KEY ("id")
);
