import prisma from "../config/database.js";
import { findUserByUserId } from "./accountRepository.js";

export async function findAllCashes(userId: number) {
	const user = await findUserByUserId(userId);
	const { accountId } = user

	const debitedTransactions = await prisma.transactions.findMany({
		where: {
			debitedAccountId: accountId,
		}, include: {
			debitedAccount: {
				include: {
					users: {
						select: {
							username: true
						}
					}
				}
			}, creditedAccount: {
				include: {
					users: {
						select: {
							username: true
						}
					}
				}
			}
		}
	});

	return debitedTransactions;
};