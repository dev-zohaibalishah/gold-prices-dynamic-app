/*
  Warnings:

  - The primary key for the `Product` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `karat` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `makingCost` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `shop` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `totalCost` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `weight` on the `Product` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - Added the required column `goldWeight` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `manufacturingCost` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `purity` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalPrice` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "productId" TEXT NOT NULL,
    "goldWeight" REAL NOT NULL,
    "purity" REAL NOT NULL,
    "manufacturingCost" REAL NOT NULL,
    "totalPrice" REAL NOT NULL,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Product" ("id", "productId") SELECT "id", "productId" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
CREATE UNIQUE INDEX "Product_productId_key" ON "Product"("productId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
