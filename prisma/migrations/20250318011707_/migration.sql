-- DropForeignKey
ALTER TABLE `accounts` DROP FOREIGN KEY `accounts_userId_fkey`;

-- DropIndex
DROP INDEX `accounts_userId_key` ON `accounts`;