import { findAllTransactions, findTransactionsByDateAndUserId } from "../repositories/trasactionRepository.js";
import { findUserByUserId } from "../repositories/accountRepository.js";

export async function getAllTransactionsByUserId(userId: number) {
	const user = await findUserByUserId(userId);

	if ( user === null) {
		throw {
			response: {
				message: "This account doesn't exist",
				status: 404
			}
		};
	}

	const { accountId } = user

	const transactions = await findAllTransactions(accountId);

  return transactions; 
};

export async function getTransactionsByDateAndUserId(userId: number, date: string) {
	const transactions = await findTransactionsByDateAndUserId(userId, date);

  return transactions; 
};