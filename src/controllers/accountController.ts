import { Request, Response } from "express";
import getUserIdByToken from "../utils/accountUtil";
import { findBalance, doNewCashOut } from "../services/accountService";

export interface cashoutInterface {
	value: number,
	userId: number,
	username: string
};

export async function getBalance(req: Request, res: Response) {
	const { authorization } = req.headers;
	const userId = getUserIdByToken(authorization);

	const cards = await findBalance(userId);

	res.status(200).send(cards)
};

export async function doCashOut(req: Request, res: Response) {
	const { authorization } = req.headers;
	const { value, username } = req.body;
	const userId = getUserIdByToken(authorization);

	const cashout: cashoutInterface = {value, userId, username};

	const data = await doNewCashOut(cashout);

	res.status(200).send(data)
};
