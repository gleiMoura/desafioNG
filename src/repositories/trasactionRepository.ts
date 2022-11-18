import prisma from "../config/database.js";
import { findUserByUserId } from "./accountRepository.js";

export async function findAllTransactions(userId: number) {
	const user = await findUserByUserId(userId);
	const { accountId } = user

	const debitedTransactions = await prisma.transactions.findMany({
		where: {
			debitedAccountId: accountId,
		}, select: {
			value: true,
			createdAt: true,
			debitedAccountId: true,
			creditedAccountId: true,
			debitedAccount: {
				select:{
					users: {
						select: {
							username: true
						}
					}
				}
			}, creditedAccount: {
				select: {
					users: {
						select: {
							username: true
						}
					}
				}
			}
		}
	});

	const creditedTransactions = await prisma.transactions.findMany({
		where: {
			creditedAccountId: accountId,
		}, select: {
			value: true,
			createdAt: true,
			debitedAccountId: true,
			creditedAccountId: true,
			debitedAccount: {
				select: {
					users: {
						select: {
							username: true
						}
					}
				}
			}, creditedAccount: {
				select: {
					users: {
						select: {
							username: true
						}
					}
				}
			}
		}
	});


	const data = {
		creditedTransactions,
		debitedTransactions,
	}

	return data;
};

export async function findTransactionsByDateAndUserId(userId: number, date: string) {
	const user = await findUserByUserId(userId);
	const { accountId } = user

	const debitedTransactions = await prisma.transactions.findMany({
		where: {
			debitedAccountId: accountId,
			createdAt: {
				contains: date
			}
		}, select: {
			value: true,
			createdAt: true,
			debitedAccountId: true,
			creditedAccountId: true,
			debitedAccount: {
				select: {
					users: {
						select: {
							username: true
						}
					}
				}
			}, creditedAccount: {
				select: {
					users: {
						select: {
							username: true
						}
					}
				}
			}
		}
	})

	const creditedTransactions = await prisma.transactions.findMany({
		where:{
			creditedAccountId: accountId,
			createdAt: {
				contains: date
			}
		}, select: {
			value: true,
			createdAt: true,
			debitedAccountId: true,
			creditedAccountId: true,
			debitedAccount: {
				select: {
					users: {
						select: {
							username: true
						}
					}
				}
			}, creditedAccount: {
				select: {
					users: {
						select: {
							username: true
						}
					}
				}
			}
		}
	});

	const transactions = {
		debitedTransactions,
		creditedTransactions
	}


	return transactions
};