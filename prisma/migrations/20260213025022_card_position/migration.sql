/*
  Warnings:

  - Added the required column `position` to the `cards` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `cards` ADD COLUMN `position` INTEGER NOT NULL;
