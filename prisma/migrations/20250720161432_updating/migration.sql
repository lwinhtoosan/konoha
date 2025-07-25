/*
  Warnings:

  - Made the column `destribution` on table `book` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `book` MODIFY `description` VARCHAR(191) NULL,
    MODIFY `destribution` VARCHAR(191) NOT NULL;
