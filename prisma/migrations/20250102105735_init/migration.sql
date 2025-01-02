-- CreateTable
CREATE TABLE `Account` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `provider` VARCHAR(191) NOT NULL,
    `providerAccountId` VARCHAR(191) NOT NULL,
    `refresh_token` TEXT NULL,
    `access_token` TEXT NULL,
    `expires_at` INTEGER NULL,
    `token_type` VARCHAR(191) NULL,
    `scope` VARCHAR(191) NULL,
    `id_token` TEXT NULL,
    `session_state` VARCHAR(191) NULL,

    UNIQUE INDEX `Account_provider_providerAccountId_key`(`provider`, `providerAccountId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Session` (
    `id` VARCHAR(191) NOT NULL,
    `sessionToken` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Session_sessionToken_key`(`sessionToken`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `emailVerified` DATETIME(3) NULL,
    `image` VARCHAR(191) NULL,
    `is_complete_information` BOOLEAN NOT NULL DEFAULT false,
    `firstname` VARCHAR(191) NULL,
    `lastname` VARCHAR(191) NULL,
    `gender` VARCHAR(191) NULL,
    `birthdate` DATETIME(3) NULL,
    `phone` VARCHAR(191) NULL,
    `address` VARCHAR(191) NULL,
    `registration_date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `last_active_date` DATETIME(3) NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `role` ENUM('customer', 'admin') NOT NULL DEFAULT 'customer',

    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_phone_key`(`phone`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `VerificationToken` (
    `id` VARCHAR(191) NOT NULL,
    `identifier` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `VerificationToken_token_key`(`token`),
    UNIQUE INDEX `VerificationToken_identifier_token_key`(`identifier`, `token`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Customers` (
    `customer_id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `ltv` DOUBLE NOT NULL,

    UNIQUE INDEX `Customers_userId_key`(`userId`),
    PRIMARY KEY (`customer_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Admin` (
    `admin_id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Admin_userId_key`(`userId`),
    PRIMARY KEY (`admin_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Transactions` (
    `transaction_id` VARCHAR(191) NOT NULL,
    `customer_id` VARCHAR(191) NOT NULL,
    `product_id` VARCHAR(191) NOT NULL,
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
    `product_id` VARCHAR(191) NOT NULL,
    `product_name` VARCHAR(191) NOT NULL,
    `product_type` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`product_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Packages` (
    `package_id` VARCHAR(191) NOT NULL,
    `product_id` VARCHAR(191) NOT NULL,
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
    `service_id` VARCHAR(191) NOT NULL,
    `product_id` VARCHAR(191) NOT NULL,
    `service_type` VARCHAR(191) NOT NULL,
    `service_price` DOUBLE NOT NULL,

    PRIMARY KEY (`service_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Transportation` (
    `transportation_id` VARCHAR(191) NOT NULL,
    `service_id` VARCHAR(191) NOT NULL,
    `vehicle_type` VARCHAR(191) NOT NULL,
    `vehicle_info` VARCHAR(191) NOT NULL,
    `capacity` INTEGER NOT NULL,
    `schedule` VARCHAR(191) NOT NULL,
    `vehicle_price` DOUBLE NOT NULL,

    PRIMARY KEY (`transportation_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Activities` (
    `activity_id` VARCHAR(191) NOT NULL,
    `service_id` VARCHAR(191) NOT NULL,
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
    `event_id` VARCHAR(191) NOT NULL,
    `service_id` VARCHAR(191) NOT NULL,
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
    `hotel_id` VARCHAR(191) NOT NULL,
    `service_id` VARCHAR(191) NOT NULL,
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
ALTER TABLE `Account` ADD CONSTRAINT `Account_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Session` ADD CONSTRAINT `Session_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Customers` ADD CONSTRAINT `Customers_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Admin` ADD CONSTRAINT `Admin_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

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
