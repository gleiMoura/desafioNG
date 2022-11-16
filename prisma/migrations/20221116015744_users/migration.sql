-- AlterTable
CREATE SEQUENCE "users_accountid_seq";
ALTER TABLE "users" ALTER COLUMN "accountId" SET DEFAULT nextval('users_accountid_seq');
ALTER SEQUENCE "users_accountid_seq" OWNED BY "users"."accountId";
