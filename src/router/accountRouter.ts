import router from "express";
import schemaValidator from "../middlewares/schemaValidator.js";
import cashSchema from "../schemas/cashSchema.js";
import { getBalance, doCashOut } from "../controllers/accountController.js";

const accountRouter = router();

accountRouter.get("/balance", getBalance);
accountRouter.post("/cashout", schemaValidator(cashSchema), doCashOut);

export default accountRouter;