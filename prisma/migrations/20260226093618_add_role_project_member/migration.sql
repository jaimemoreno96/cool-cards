/*
  Warnings:

  - Added the required column `role` to the `user_board_is_member` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `user_project_is_member` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user_board_is_member` ADD COLUMN `role` ENUM('ADMIN', 'USER') NOT NULL;

-- AlterTable
ALTER TABLE `user_project_is_member` ADD COLUMN `role` ENUM('ADMIN', 'USER') NOT NULL;
