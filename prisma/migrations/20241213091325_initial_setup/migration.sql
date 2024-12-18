-- CreateTable
CREATE TABLE `Accounts` (
    `account_id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `role` ENUM('customer', 'admin') NOT NULL,
    `fname` VARCHAR(191) NOT NULL,
    `lname` VARCHAR(191) NOT NULL,
    `gender` VARCHAR(191) NOT NULL,
    `birthdate` DATETIME(3) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `registration_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `imagelink` VARCHAR(191) NULL,
    `last_active_date` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Accounts_email_key`(`email`),
    UNIQUE INDEX `Accounts_phone_key`(`phone`),
    PRIMARY KEY (`account_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Customers` (
    `customer_id` INTEGER NOT NULL AUTO_INCREMENT,
    `account_id` INTEGER NOT NULL,
    `ltv` DOUBLE NOT NULL,

    UNIQUE INDEX `Customers_account_id_key`(`account_id`),
    PRIMARY KEY (`customer_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Admin` (
    `admin_id` INTEGER NOT NULL AUTO_INCREMENT,
    `account_id` INTEGER NOT NULL,

    UNIQUE INDEX `Admin_account_id_key`(`account_id`),
    PRIMARY KEY (`admin_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Transactions` (
    `transaction_id` INTEGER NOT NULL AUTO_INCREMENT,
    `customer_id` INTEGER NOT NULL,
    `product_id` INTEGER NOT NULL,
    `transaction_date` DATETIME(3) NOT NULL,
    `total_Amount` DOUBLE NOT NULL,
    `payment_status` ENUM('paid', 'pending', 'failed') NOT NULL,
    `transaction_status` ENUM('completed', 'failed', 'pending') NOT NULL,

    INDEX `Transactions_customer_id_idx`(`customer_id`),
    INDEX `Transactions_product_id_idx`(`product_id`),
    PRIMARY KEY (`transaction_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Product` (
    `product_id` INTEGER NOT NULL AUTO_INCREMENT,
    `product_name` VARCHAR(191) NOT NULL,
    `product_type` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`product_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Packages` (
    `package_id` INTEGER NOT NULL AUTO_INCREMENT,
    `product_id` INTEGER NOT NULL,
    `highlights` VARCHAR(191) NOT NULL,
    `what_you_get` VARCHAR(191) NOT NULL,
    `what_to_expect` VARCHAR(191) NOT NULL,
    `best_time_to_visit` VARCHAR(191) NOT NULL,
    `package_duration` VARCHAR(191) NOT NULL,
    `faqs` VARCHAR(191) NOT NULL,
    `package_price` DOUBLE NOT NULL,

    PRIMARY KEY (`package_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Services` (
    `service_id` INTEGER NOT NULL AUTO_INCREMENT,
    `product_id` INTEGER NOT NULL,
    `service_type` VARCHAR(191) NOT NULL,
    `service_price` DOUBLE NOT NULL,

    PRIMARY KEY (`service_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Transportation` (
    `transportation_id` INTEGER NOT NULL AUTO_INCREMENT,
    `service_id` INTEGER NOT NULL,
    `vehicle_type` VARCHAR(191) NOT NULL,
    `vehicle_info` VARCHAR(191) NOT NULL,
    `capacity` INTEGER NOT NULL,
    `schedule` VARCHAR(191) NOT NULL,
    `vehicle_price` DOUBLE NOT NULL,

    PRIMARY KEY (`transportation_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Activities` (
    `activity_id` INTEGER NOT NULL AUTO_INCREMENT,
    `service_id` INTEGER NOT NULL,
    `highlights` VARCHAR(191) NOT NULL,
    `what_you_get` VARCHAR(191) NOT NULL,
    `what_to_expect` VARCHAR(191) NOT NULL,
    `best_time_to_visit` VARCHAR(191) NOT NULL,
    `activity_date` DATETIME(3) NOT NULL,
    `activity_duration` VARCHAR(191) NOT NULL,
    `faqs` VARCHAR(191) NOT NULL,
    `activity_price` DOUBLE NOT NULL,

    PRIMARY KEY (`activity_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Events` (
    `event_id` INTEGER NOT NULL AUTO_INCREMENT,
    `service_id` INTEGER NOT NULL,
    `highlights` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `what_you_get` VARCHAR(191) NOT NULL,
    `what_to_expect` VARCHAR(191) NOT NULL,
    `best_time_to_visit` VARCHAR(191) NOT NULL,
    `event_date` DATETIME(3) NOT NULL,
    `event_duration` VARCHAR(191) NOT NULL,
    `faqs` VARCHAR(191) NOT NULL,
    `event_price` DOUBLE NOT NULL,

    PRIMARY KEY (`event_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Hotels` (
    `hotel_id` INTEGER NOT NULL AUTO_INCREMENT,
    `service_id` INTEGER NOT NULL,
    `hotel_name` VARCHAR(191) NOT NULL,
    `room_type` VARCHAR(191) NOT NULL,
    `what_you_get` VARCHAR(191) NOT NULL,
    `what_to_expect` VARCHAR(191) NOT NULL,
    `amenities` VARCHAR(191) NOT NULL,
    `highlights` VARCHAR(191) NOT NULL,
    `duration` VARCHAR(191) NOT NULL,
    `faqs` VARCHAR(191) NOT NULL,
    `hotel_price` DOUBLE NOT NULL,

    PRIMARY KEY (`hotel_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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