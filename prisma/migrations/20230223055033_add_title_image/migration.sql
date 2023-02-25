/*
  Warnings:

  - Added the required column `title` to the `images` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "images" ADD COLUMN     "title" VARCHAR(250) NOT NULL;
