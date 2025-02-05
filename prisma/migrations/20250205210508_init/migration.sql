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
    `ltv` DOUBLE NOT NULL DEFAULT 0.0,

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
CREATE TABLE `Transactions` (
    `transaction_id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `product_id` VARCHAR(191) NOT NULL,
    `start_date` DATETIME(3) NOT NULL,
    `end_date` DATETIME(3) NOT NULL,
    `time` DATETIME(3) NOT NULL,
    `number_of_participants` INTEGER NOT NULL,
    `note` VARCHAR(191) NULL,
    `pickup_dropoff` VARCHAR(191) NULL,
    `receipt_link` VARCHAR(191) NULL,
    `total_Amount` DOUBLE NOT NULL,
    `payment_status` ENUM('paid', 'pending', 'failed') NOT NULL,
    `transaction_status` ENUM('completed', 'failed', 'pending') NOT NULL,

    INDEX `Transactions_userId_idx`(`userId`),
    INDEX `Transactions_product_id_idx`(`product_id`),
    PRIMARY KEY (`transaction_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Product` (
    `product_id` VARCHAR(191) NOT NULL,
    `product_type` ENUM('Hotels', 'Packages', 'Events', 'Activities', 'Transportation') NOT NULL,

    PRIMARY KEY (`product_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Packages` (
    `package_id` VARCHAR(191) NOT NULL,
    `product_id` VARCHAR(191) NOT NULL,
    `package_name` VARCHAR(191) NOT NULL,
    `highlights` VARCHAR(191) NOT NULL,
    `what_to_expect` VARCHAR(191) NOT NULL,
    `best_time_to_visit` VARCHAR(191) NOT NULL,
    `duration_number` INTEGER NOT NULL,
    `duration_unit` ENUM('H', 'D') NOT NULL,
    `faqs` VARCHAR(191) NOT NULL,
    `package_price` DOUBLE NOT NULL,
    `number_of_sold_items` INTEGER NOT NULL DEFAULT 0,
    `favorites` INTEGER NOT NULL DEFAULT 0,
    `rating` DOUBLE NOT NULL DEFAULT 0.0,
    `is_active` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `Packages_product_id_key`(`product_id`),
    PRIMARY KEY (`package_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Activities` (
    `activity_id` VARCHAR(191) NOT NULL,
    `product_id` VARCHAR(191) NOT NULL,
    `activity_name` VARCHAR(191) NOT NULL,
    `highlights` VARCHAR(191) NOT NULL,
    `what_to_expect` VARCHAR(191) NOT NULL,
    `best_time_to_visit` VARCHAR(191) NOT NULL,
    `duration_number` INTEGER NOT NULL,
    `duration_unit` ENUM('H', 'D') NOT NULL,
    `faqs` VARCHAR(191) NOT NULL,
    `activity_price` DOUBLE NOT NULL,
    `number_of_sold_items` INTEGER NOT NULL DEFAULT 0,
    `favorites` INTEGER NOT NULL DEFAULT 0,
    `rating` DOUBLE NOT NULL DEFAULT 0.0,
    `is_active` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `Activities_product_id_key`(`product_id`),
    PRIMARY KEY (`activity_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Events` (
    `event_id` VARCHAR(191) NOT NULL,
    `product_id` VARCHAR(191) NOT NULL,
    `event_name` VARCHAR(191) NOT NULL,
    `highlights` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `what_to_expect` VARCHAR(191) NOT NULL,
    `best_time_to_visit` VARCHAR(191) NOT NULL,
    `duration_number` INTEGER NOT NULL,
    `duration_unit` ENUM('H', 'D') NOT NULL,
    `faqs` VARCHAR(191) NOT NULL,
    `event_price` DOUBLE NOT NULL,
    `number_of_sold_items` INTEGER NOT NULL DEFAULT 0,
    `favorites` INTEGER NOT NULL DEFAULT 0,
    `rating` DOUBLE NOT NULL DEFAULT 0.0,
    `is_active` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `Events_product_id_key`(`product_id`),
    PRIMARY KEY (`event_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Hotels` (
    `hotel_id` VARCHAR(191) NOT NULL,
    `product_id` VARCHAR(191) NOT NULL,
    `hotel_name` VARCHAR(191) NOT NULL,
    `room_type` VARCHAR(191) NOT NULL,
    `what_to_expect` VARCHAR(191) NOT NULL,
    `amenities` VARCHAR(191) NOT NULL,
    `highlights` VARCHAR(191) NOT NULL,
    `faqs` VARCHAR(191) NOT NULL,
    `hotel_price` DOUBLE NOT NULL,
    `duration_number` INTEGER NOT NULL,
    `duration_unit` ENUM('H', 'D') NOT NULL,
    `number_of_sold_items` INTEGER NOT NULL DEFAULT 0,
    `favorites` INTEGER NOT NULL DEFAULT 0,
    `rating` DOUBLE NOT NULL DEFAULT 0.0,
    `is_active` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `Hotels_product_id_key`(`product_id`),
    PRIMARY KEY (`hotel_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Transportation` (
    `transportation_id` VARCHAR(191) NOT NULL,
    `product_id` VARCHAR(191) NOT NULL,
    `transportation_name` VARCHAR(191) NOT NULL,
    `vehicle_type` VARCHAR(191) NOT NULL,
    `vehicle_info` VARCHAR(191) NOT NULL,
    `capacity` INTEGER NOT NULL,
    `vehicle_price` DOUBLE NOT NULL,
    `number_of_sold_items` INTEGER NOT NULL DEFAULT 0,
    `favorites` INTEGER NOT NULL DEFAULT 0,
    `rating` DOUBLE NOT NULL DEFAULT 0.0,
    `is_active` BOOLEAN NOT NULL DEFAULT true,

    UNIQUE INDEX `Transportation_product_id_key`(`product_id`),
    PRIMARY KEY (`transportation_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Favorites` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `itemId` VARCHAR(191) NOT NULL,
    `itemType` ENUM('Hotels', 'Packages', 'Events', 'Activities', 'Transportation') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Account` ADD CONSTRAINT `Account_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Session` ADD CONSTRAINT `Session_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transactions` ADD CONSTRAINT `Transactions_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transactions` ADD CONSTRAINT `Transactions_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `Product`(`product_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Packages` ADD CONSTRAINT `Packages_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `Product`(`product_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Activities` ADD CONSTRAINT `Activities_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `Product`(`product_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Events` ADD CONSTRAINT `Events_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `Product`(`product_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Hotels` ADD CONSTRAINT `Hotels_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `Product`(`product_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Transportation` ADD CONSTRAINT `Transportation_product_id_fkey` FOREIGN KEY (`product_id`) REFERENCES `Product`(`product_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Favorites` ADD CONSTRAINT `Favorites_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Favorites` ADD CONSTRAINT `Favorites_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `Product`(`product_id`) ON DELETE CASCADE ON UPDATE CASCADE;
