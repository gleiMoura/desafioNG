import { findBalanceByUserId } from "../repositories/accountRepository";

export async function findBalance( userId: number ){
	const balance = await findBalanceByUserId( userId);

	return balance; 
}