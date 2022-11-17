import {
	findAccountIdByUserId,
	findAccountIdByUsername,
	findBalanceByAccountId,
	updateBalance,
	doTransactionCashout
} from "../repositories/accountRepository.js";
import { cashoutInterface } from "../controllers/accountController.js";

export async function findBalance( userId: number ){
	const balance = await findBalanceByAccountId( userId);

	return balance; 
};

export async function doNewCashOut(cashout: cashoutInterface) {
	const {value, userId, username} = cashout;
	const creditedAccountId = await findAccountIdByUsername(username);
	const debitedAccountId = await findAccountIdByUserId(userId);

	if(creditedAccountId === debitedAccountId) {
		throw {
			response: {
				message: "you can't do a transaction to yourself",
				status: 401
			}
		};
	}

	const debitedBalance = await findBalance(debitedAccountId);
	const creditedBalance = await findBalance(creditedAccountId);

	if(debitedBalance < value) {
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

	const transaction = {
		value, 
		creditedAccountId,
		debitedAccountId
	}

	await doTransactionCashout(transaction);
};