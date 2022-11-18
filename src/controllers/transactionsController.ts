import { Request, Response } from "express";
import getUserIdByToken from "../utils/accountUtil.js";
import {
	getAllTransactionsByUserId,
	getTransactionsByDateAndUserId
} from "../services/transactionsService.js";

export async function getTransactions(req: Request, res: Response) {
	const { authorization } = req.headers;
	const userId = getUserIdByToken(authorization);

	const transactions = await getAllTransactionsByUserId(userId);

	res.status(200).send(transactions);
};

export async function getTransactionsByDate(req: Request, res: Response) {
	const { authorization } = req.headers;
	const userId = getUserIdByToken(authorization);
	const { date }:{date:string} = req.body;

	const transactions = await getTransactionsByDateAndUserId(userId, date);

	res.status(200).send(transactions);
};

export async function getCashInByDate(req: Request, res: Response) {
	const { authorization } = req.headers;
	const userId = getUserIdByToken(authorization);
	const { date }:{date:string} = req.body;

	const transactions = await getTransactionsByDateAndUserId(userId, date);

	res.status(200).send(transactions.creditedTransactions);
};

export async function getCashOutByDate(req: Request, res: Response) {
	const { authorization } = req.headers;
	const userId = getUserIdByToken(authorization);
	const { date }:{date:string} = req.body;

	const transactions = await getTransactionsByDateAndUserId(userId, date);

	res.status(200).send(transactions.debitedTransactions);
};

