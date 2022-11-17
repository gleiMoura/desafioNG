import { findAllCashes } from "../repositories/trasactionRepository.js";


export async function getAllCashesByUserId(userId: number) {
	const cashes = await findAllCashes(userId);

  return cashes; 
};