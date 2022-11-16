import { Request, Response } from "express";
import getUserIdByToken from "../utils/accountUtil";
import { findBalance } from "../services/accountService";

export async function getBalance(req: Request, res: Response) {
	const { authorization } = req.headers;
	const userId = getUserIdByToken(authorization);

	const cards = await findBalance(userId);

	res.status(200).send(cards)
}