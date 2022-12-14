-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_accountId_fkey";

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "accountId" DROP NOT NULL,
ALTER COLUMN "accountId" DROP DEFAULT;
DROP SEQUENCE "users_accountid_seq";

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE SET NULL ON UPDATE CASCADE;
