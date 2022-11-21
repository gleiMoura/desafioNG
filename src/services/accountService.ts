import {
	findUserByUserId,
	findAccountIdByUsername,
	findBalanceByAccountId,
	updateBalance,
	doTransactionCashout
} from "../repositories/accountRepository.js";
import { cashoutInterface } from "../controllers/accountController.js";
import { formatDate } from "../utils/accountUtil.js";

export async function findBalance(userId: number) {
	const balance = await findBalanceByAccountId(userId);

	return balance;
};

export async function doNewCashOut(cashout: cashoutInterface) {
	const { value, userId, username } = cashout;
	const debitedUser = await findUserByUserId(userId);

	if (debitedUser === null) {
		throw {
			response: {
				message: "This account doesn't exist",
				status: 404
			}
		};
	}

	const creditedAccountId = await findAccountIdByUsername(username);
	const debitedAccountId = debitedUser.accountId;

	if (creditedAccountId === null) {
		throw {
			response: {
				message: "This account doesn't exist",
				status: 404
			}
		};
	}

	if (creditedAccountId === debitedAccountId) {
		throw {
			response: {
				message: "you can't do a transaction to yourself",
				status: 401
			}
		};
	}

	const debitedBalance = await findBalance(debitedAccountId);
	const creditedBalance = await findBalance(creditedAccountId);

	if (debitedBalance < value) {
		throw {
			response: {
				message: "Your balance is not enough to do this transaction",
				status: 401
			}
		};
	};

	const newDebitedBalance = debitedBalance - value;
	const newCreditedBalance = creditedBalance + value;

	await updateBalance(debitedAccountId, newDebitedBalance);
	await updateBalance(creditedAccountId, newCreditedBalance);

	const date = new Date();
	const createdAt = formatDate(date);

	const transaction = {
		value,
		creditedAccountId,
		debitedAccountId,
		createdAt
	}

	await doTransactionCashout(transaction);

	const debitedUsername = debitedUser.username;
	const creditedUsername = username;

	const data = {
		value, 
		debitedUsername,
		creditedUsername,
		creditedAccountId,
		debitedAccountId,
		createdAt
	}

	return data;
};