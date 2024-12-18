/*
  Warnings:

  - The primary key for the `accounts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `activities` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `admin` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `customers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `events` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `hotels` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `packages` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `product` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `services` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `transactions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `transportation` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `activities` DROP FOREIGN KEY `Activities_service_id_fkey`;

-- DropForeignKey
ALTER TABLE `admin` DROP FOREIGN KEY `Admin_account_id_fkey`;

-- DropForeignKey
ALTER TABLE `customers` DROP FOREIGN KEY `Customers_account_id_fkey`;

-- DropForeignKey
ALTER TABLE `events` DROP FOREIGN KEY `Events_service_id_fkey`;

-- DropForeignKey
ALTER TABLE `hotels` DROP FOREIGN KEY `Hotels_service_id_fkey`;

-- DropForeignKey
ALTER TABLE `packages` DROP FOREIGN KEY `Packages_product_id_fkey`;

-- DropForeignKey
ALTER TABLE `services` DROP FOREIGN KEY `Services_product_id_fkey`;

-- DropForeignKey
ALTER TABLE `transactions` DROP FOREIGN KEY `Transactions_customer_id_fkey`;

-- DropForeignKey
ALTER TABLE `transactions` DROP FOREIGN KEY `Transactions_product_id_fkey`;

-- DropForeignKey
ALTER TABLE `transportation` DROP FOREIGN KEY `Transportation_service_id_fkey`;

-- AlterTable
ALTER TABLE `accounts` DROP PRIMARY KEY,
    MODIFY `account_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`account_id`);

-- AlterTable
ALTER TABLE `activities` DROP PRIMARY KEY,
    MODIFY `activity_id` VARCHAR(191) NOT NULL,
    MODIFY `service_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`activity_id`);

-- AlterTable
ALTER TABLE `admin` DROP PRIMARY KEY,
    MODIFY `admin_id` VARCHAR(191) NOT NULL,
    MODIFY `account_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`admin_id`);

-- AlterTable
ALTER TABLE `customers` DROP PRIMARY KEY,
    MODIFY `customer_id` VARCHAR(191) NOT NULL,
    MODIFY `account_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`customer_id`);

-- AlterTable
ALTER TABLE `events` DROP PRIMARY KEY,
    MODIFY `event_id` VARCHAR(191) NOT NULL,
    MODIFY `service_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`event_id`);

-- AlterTable
ALTER TABLE `hotels` DROP PRIMARY KEY,
    MODIFY `hotel_id` VARCHAR(191) NOT NULL,
    MODIFY `service_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`hotel_id`);

-- AlterTable
ALTER TABLE `packages` DROP PRIMARY KEY,
    MODIFY `package_id` VARCHAR(191) NOT NULL,
    MODIFY `product_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`package_id`);

-- AlterTable
ALTER TABLE `product` DROP PRIMARY KEY,
    MODIFY `product_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`product_id`);

-- AlterTable
ALTER TABLE `services` DROP PRIMARY KEY,
    MODIFY `service_id` VARCHAR(191) NOT NULL,
    MODIFY `product_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`service_id`);

-- AlterTable
ALTER TABLE `transactions` DROP PRIMARY KEY,
    MODIFY `transaction_id` VARCHAR(191) NOT NULL,
    MODIFY `customer_id` VARCHAR(191) NOT NULL,
    MODIFY `product_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`transaction_id`);

-- AlterTable
ALTER TABLE `transportation` DROP PRIMARY KEY,
    MODIFY `transportation_id` VARCHAR(191) NOT NULL,
    MODIFY `service_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`transportation_id`);

-- AddForeignKey
ALTER TABLE `Customers` ADD CONSTRAINT `Customers_account_id_fkey` FOREIGN KEY (`account_id`) REFERENCES `Accounts`(`account_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Admin` ADD CONSTRAINT `Admin_account_id_fkey` FOREIGN KEY (`account_id`) REFERENCES `Accounts`(`account_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transactions` ADD CONSTRAINT `Transactions_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `Customers`(`customer_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transactions` ADD CONSTRAINT `Transactions_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `Product`(`product_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Packages` ADD CONSTRAINT `Packages_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `Product`(`product_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Services` ADD CONSTRAINT `Services_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `Product`(`product_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transportation` ADD CONSTRAINT `Transportation_service_id_fkey` FOREIGN KEY (`service_id`) REFERENCES `Services`(`service_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Activities` ADD CONSTRAINT `Activities_service_id_fkey` FOREIGN KEY (`service_id`) REFERENCES `Services`(`service_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Events` ADD CONSTRAINT `Events_service_id_fkey` FOREIGN KEY (`service_id`) REFERENCES `Services`(`service_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Hotels` ADD CONSTRAINT `Hotels_service_id_fkey` FOREIGN KEY (`service_id`) REFERENCES `Services`(`service_id`) ON DELETE RESTRICT ON UPDATE CASCADE;