import { findAllTransactions, findTransactionsByDateAndUserId } from "../repositories/trasactionRepository.js";


export async function getAllTransactionsByUserId(userId: number) {
	const transactions = await findAllTransactions(userId);



  return transactions; 
};

export async function getTransactionsByDateAndUserId(userId: number, date: string) {
	const transactions = await findTransactionsByDateAndUserId(userId, date);

  return transactions; 
};