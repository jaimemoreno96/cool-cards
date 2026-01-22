-- DropForeignKey
ALTER TABLE `boards` DROP FOREIGN KEY `boards_projectId_fkey`;

-- DropIndex
DROP INDEX `boards_projectId_fkey` ON `boards`;

-- AlterTable
ALTER TABLE `boards` MODIFY `projectId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `boards` ADD CONSTRAINT `boards_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `projects`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
