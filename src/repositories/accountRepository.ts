import prisma from "../config/database.js";

interface transaction {
	value: number,
	creditedAccountId: number,
	debitedAccountId: number
}

export async function findAccountIdByUserId(userId: number) {
	const user = await prisma.users.findUnique({
		where: {
			id: userId
		}
	});

	return user.accountId;
};

export async function findAccountIdByUsername(username: string) {
	const user = await prisma.users.findUnique({
		where: {
			username
		}
	});

	return user.accountId;
};

export async function findBalanceByAccountId(userId: number) {
	const id = await findAccountIdByUserId(userId);

	const account = await prisma.accounts.findFirst({
		where: {
			id
		}
	});

	return account.balance;
};

export async function updateBalance(accountId: number, value: number) {
	await prisma.accounts.update({
		where: {
			id: accountId
		},
		data: {
			balance: value
		}
	});
};

export async function doTransactionCashout(transaction) {
	await prisma.transactions.create({
		data:{
				
		}
}); 
};