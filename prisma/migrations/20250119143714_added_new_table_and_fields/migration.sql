-- AlterTable
ALTER TABLE `activities` ADD COLUMN `favorites` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `is_active` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `number_of_sold_items` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `rating` DOUBLE NOT NULL DEFAULT 0.0;

-- AlterTable
ALTER TABLE `events` ADD COLUMN `favorites` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `is_active` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `number_of_sold_items` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `rating` DOUBLE NOT NULL DEFAULT 0.0;

-- AlterTable
ALTER TABLE `hotels` ADD COLUMN `favorites` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `is_active` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `number_of_sold_items` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `rating` DOUBLE NOT NULL DEFAULT 0.0;

-- AlterTable
ALTER TABLE `packages` ADD COLUMN `favorites` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `is_active` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `number_of_sold_items` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `rating` DOUBLE NOT NULL DEFAULT 0.0;

-- AlterTable
ALTER TABLE `transportation` ADD COLUMN `favorites` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `is_active` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `number_of_sold_items` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `rating` DOUBLE NOT NULL DEFAULT 0.0;

-- CreateTable
CREATE TABLE `Favorites` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `itemId` VARCHAR(191) NOT NULL,
    `itemType` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Favorites` ADD CONSTRAINT `Favorites_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Favorites` ADD CONSTRAINT `Favorites_Events_fkey` FOREIGN KEY (`itemId`) REFERENCES `Events`(`event_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Favorites` ADD CONSTRAINT `Favorites_Activities_fkey` FOREIGN KEY (`itemId`) REFERENCES `Activities`(`activity_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Favorites` ADD CONSTRAINT `Favorites_Hotels_fkey` FOREIGN KEY (`itemId`) REFERENCES `Hotels`(`hotel_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Favorites` ADD CONSTRAINT `Favorites_Packages_fkey` FOREIGN KEY (`itemId`) REFERENCES `Packages`(`package_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Favorites` ADD CONSTRAINT `Favorites_Transportation_fkey` FOREIGN KEY (`itemId`) REFERENCES `Transportation`(`transportation_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
