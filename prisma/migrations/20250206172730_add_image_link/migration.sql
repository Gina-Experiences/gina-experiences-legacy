/*
  Warnings:

  - Added the required column `image_link` to the `Activities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image_link` to the `Events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image_link` to the `Hotels` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image_link` to the `Packages` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image_link` to the `Transportation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Activities` ADD COLUMN `image_link` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Events` ADD COLUMN `image_link` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Hotels` ADD COLUMN `image_link` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Packages` ADD COLUMN `image_link` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Transportation` ADD COLUMN `image_link` VARCHAR(191) NOT NULL;
