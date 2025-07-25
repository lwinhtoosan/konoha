/*
  Warnings:

  - You are about to drop the column `published_company` on the `book` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `book` DROP COLUMN `published_company`,
    ADD COLUMN `destribution` VARCHAR(191) NULL;
