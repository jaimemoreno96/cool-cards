/*
  Warnings:

  - You are about to drop the column `projectId` on the `cards` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `cards` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `projects` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `cards` DROP FOREIGN KEY `cards_projectId_fkey`;

-- DropIndex
DROP INDEX `cards_projectId_fkey` ON `cards`;

-- AlterTable
ALTER TABLE `cards` DROP COLUMN `projectId`,
    ADD COLUMN `boardId` VARCHAR(191) NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `projects` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- CreateTable
CREATE TABLE `boards` (
    `founder` VARCHAR(191) NULL,
    `id` VARCHAR(191) NOT NULL,
    `projectId` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `description` TEXT NULL,
    `name` VARCHAR(191) NOT NULL,
    `members` LONGBLOB NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `cards` ADD CONSTRAINT `cards_boardId_fkey` FOREIGN KEY (`boardId`) REFERENCES `boards`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `boards` ADD CONSTRAINT `boards_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `projects`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `boards` ADD CONSTRAINT `boards_founder_fkey` FOREIGN KEY (`founder`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
