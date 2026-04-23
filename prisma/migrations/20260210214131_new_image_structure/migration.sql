/*
  Warnings:

  - You are about to drop the column `image` on the `boards` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `boards` DROP COLUMN `image`,
    ADD COLUMN `imageName` VARCHAR(191) NULL,
    ADD COLUMN `imageUrl` VARCHAR(191) NULL;
