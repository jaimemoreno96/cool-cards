/*
  Warnings:

  - You are about to alter the column `position` on the `board_columns` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `position` on the `cards` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- AlterTable
ALTER TABLE `board_columns` MODIFY `position` DOUBLE NOT NULL;

-- AlterTable
ALTER TABLE `cards` MODIFY `position` DOUBLE NOT NULL;
