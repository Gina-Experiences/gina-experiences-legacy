/*
  Warnings:

  - You are about to drop the column `customer_id` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the `admin` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `customers` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `Transactions` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `admin` DROP FOREIGN KEY `Admin_userId_fkey`;

-- DropForeignKey
ALTER TABLE `customers` DROP FOREIGN KEY `Customers_userId_fkey`;

-- DropForeignKey
ALTER TABLE `transactions` DROP FOREIGN KEY `Transactions_customer_id_fkey`;

-- DropIndex
DROP INDEX `Transactions_customer_id_idx` ON `transactions`;

-- AlterTable
ALTER TABLE `transactions` DROP COLUMN `customer_id`,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `ltv` DOUBLE NOT NULL DEFAULT 0.0;

-- DropTable
DROP TABLE `admin`;

-- DropTable
DROP TABLE `customers`;

-- CreateIndex
CREATE INDEX `Transactions_userId_idx` ON `Transactions`(`userId`);

-- AddForeignKey
ALTER TABLE `Transactions` ADD CONSTRAINT `Transactions_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
