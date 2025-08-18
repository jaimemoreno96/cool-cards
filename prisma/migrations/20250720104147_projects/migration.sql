/*
  Warnings:

  - You are about to drop the column `founder` on the `boards` table. All the data in the column will be lost.
  - The `members` column on the `boards` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `founder` on the `cards` table. All the data in the column will be lost.
  - The `members` column on the `cards` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `tags` column on the `cards` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `founder` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `projects` table. All the data in the column will be lost.
  - The `members` column on the `projects` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE `boards` DROP FOREIGN KEY `boards_founder_fkey`;

-- DropForeignKey
ALTER TABLE `cards` DROP FOREIGN KEY `cards_founder_fkey`;

-- DropForeignKey
ALTER TABLE `projects` DROP FOREIGN KEY `projects_founder_fkey`;

-- DropIndex
DROP INDEX `boards_founder_fkey` ON `boards`;

-- DropIndex
DROP INDEX `cards_founder_fkey` ON `cards`;

-- DropIndex
DROP INDEX `projects_founder_fkey` ON `projects`;

-- AlterTable
ALTER TABLE `boards` DROP COLUMN `founder`,
    ADD COLUMN `favorite` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `image` VARCHAR(191) NULL,
    ADD COLUMN `userId` VARCHAR(191) NULL,
    DROP COLUMN `members`,
    ADD COLUMN `members` JSON NULL;

-- AlterTable
ALTER TABLE `cards` DROP COLUMN `founder`,
    ADD COLUMN `userId` VARCHAR(191) NULL,
    DROP COLUMN `members`,
    ADD COLUMN `members` JSON NULL,
    DROP COLUMN `tags`,
    ADD COLUMN `tags` JSON NULL;

-- AlterTable
ALTER TABLE `projects` DROP COLUMN `founder`,
    DROP COLUMN `image`,
    ADD COLUMN `favorite` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `userId` VARCHAR(191) NULL,
    DROP COLUMN `members`,
    ADD COLUMN `members` JSON NULL;

-- AddForeignKey
ALTER TABLE `cards` ADD CONSTRAINT `cards_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `boards` ADD CONSTRAINT `boards_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `projects` ADD CONSTRAINT `projects_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
