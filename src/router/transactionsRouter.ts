import router from "express";
import transactionDateSchema from "../schemas/transactionDateSchema.js";
import schemaValidator from "../middlewares/schemaValidator.js";
import {
	getTransactions, 
	getTransactionsByDate,
	getCashInByDate,
	getCashOutByDate
} from "../controllers/transactionsController.js";

const transactionsRouter = router();

transactionsRouter.get(
	"/getTransactions", 
	getTransactions
);
transactionsRouter.get(
	"/getTransactions/byDate",
	schemaValidator(transactionDateSchema), 
	getTransactionsByDate
);
transactionsRouter.get(
	"/getTransactions/byDate/cashIn",
	schemaValidator(transactionDateSchema),
	getCashInByDate
);
transactionsRouter.get(
	"/getTransactions/byDate/cashOut",
	schemaValidator(transactionDateSchema),
	getCashOutByDate
)

export default transactionsRouter;