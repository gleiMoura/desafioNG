import router from "express";
import transactionDateSchema from "../schemas/transactionDateSchema.js";
import schemaValidator from "../middlewares/schemaValidator.js";
import { getTransactions, getTransactionsByDate } from "../controllers/transactionsController.js";

const transactionsRouter = router();

transactionsRouter.get("/getTransactions", getTransactions);
transactionsRouter.get(
	"/getTransactions/byDate",
	schemaValidator(transactionDateSchema), 
	getTransactionsByDate
)

export default transactionsRouter;