import router from "express";
import { getCashes } from "../controllers/transactionsController.js";

const transactionsRouter = router();

transactionsRouter.get("/cash", getCashes);

export default transactionsRouter;