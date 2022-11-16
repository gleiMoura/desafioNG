import router from "express";
import { getBalance } from "../controllers/accountController";

const accountRouter = router();

accountRouter.get("/balance", getBalance);

export default accountRouter;