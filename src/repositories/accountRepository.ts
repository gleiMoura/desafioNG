import prisma from "../config/database.js";

export async function findBalanceByUserId(userId: number) {

	const user = await prisma.users.findUnique({
		where: {
			id: userId
		}
	})

	const account = await prisma.accounts.findFirst({
		where: {
			id: user.accountId
		}
	});

	return account.balance;
}
