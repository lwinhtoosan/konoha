/*
  Warnings:

  - Made the column `imageUrl` on table `book` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `book` MODIFY `imageUrl` VARCHAR(191) NOT NULL;
