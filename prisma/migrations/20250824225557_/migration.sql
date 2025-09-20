/*
  Warnings:

  - Made the column `projectId` on table `boards` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `boards` required. This step will fail if there are existing NULL values in that column.
  - Made the column `boardId` on table `cards` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `cards` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `projects` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `boards` DROP FOREIGN KEY `boards_projectId_fkey`;

-- DropForeignKey
ALTER TABLE `boards` DROP FOREIGN KEY `boards_userId_fkey`;

-- DropForeignKey
ALTER TABLE `cards` DROP FOREIGN KEY `cards_boardId_fkey`;

-- DropForeignKey
ALTER TABLE `cards` DROP FOREIGN KEY `cards_userId_fkey`;

-- DropForeignKey
ALTER TABLE `projects` DROP FOREIGN KEY `projects_userId_fkey`;

-- DropIndex
DROP INDEX `boards_projectId_fkey` ON `boards`;

-- DropIndex
DROP INDEX `boards_userId_fkey` ON `boards`;

-- DropIndex
DROP INDEX `cards_boardId_fkey` ON `cards`;

-- DropIndex
DROP INDEX `cards_userId_fkey` ON `cards`;

-- DropIndex
DROP INDEX `projects_userId_fkey` ON `projects`;

-- AlterTable
ALTER TABLE `boards` MODIFY `projectId` VARCHAR(191) NOT NULL,
    MODIFY `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `cards` MODIFY `boardId` VARCHAR(191) NOT NULL,
    MODIFY `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `projects` MODIFY `userId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `cards` ADD CONSTRAINT `cards_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cards` ADD CONSTRAINT `cards_boardId_fkey` FOREIGN KEY (`boardId`) REFERENCES `boards`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `boards` ADD CONSTRAINT `boards_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `projects`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `boards` ADD CONSTRAINT `boards_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `projects` ADD CONSTRAINT `projects_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
