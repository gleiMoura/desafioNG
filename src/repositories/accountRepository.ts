import prisma from "../config/database.js";

interface transaction {
	value: number,
	creditedAccountId: number,
	debitedAccountId: number
}

export async function findUserByUserId(userId: number) {
	const user = await prisma.users.findUnique({
		where: {
			id: userId
		}
	});

	if(user === null) {
		return null
	}else{
		return user;
	}
};

export async function findAccountIdByUsername(username: string) {
	const user = await prisma.users.findUnique({
		where: {
			username
		}
	});

	if(user === null) {
		return null
	}else{
		return user.accountId;
	}
};

export async function findBalanceByAccountId(userId: number) {
	const user = await findUserByUserId(userId);
	const id = user.accountId;

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

export async function doTransactionCashout(transaction: transaction) {
	const { value, creditedAccountId, debitedAccountId } = transaction;
	const transactionData = await prisma.transactions.create({
		data: {
			value,
			creditedAccountId,
			debitedAccountId
		}
	});

	return transactionData;
};