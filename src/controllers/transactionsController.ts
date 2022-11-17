import { Request, Response } from "express";
import getUserIdByToken from "../utils/accountUtil.js";
import { getAllCashesByUserId } from "../services/transactionsService.js";

export async function getCashes(req: Request, res: Response) {
	const { authorization } = req.headers;
	const userId = getUserIdByToken(authorization);

	const cashes = getAllCashesByUserId(userId);

	res.status(200).send(cashes)
};