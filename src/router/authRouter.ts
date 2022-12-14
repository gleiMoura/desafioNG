import router from "express";
import schemaValidator from "../middlewares/schemaValidator.js";
import userSchema from "../schemas/userSchema.js";
import { createUser, doLogin } from "../controllers/authController.js";

const authRouter = router();


authRouter.post("/signUp", schemaValidator(userSchema), createUser);
authRouter.post("/signIn", schemaValidator(userSchema), doLogin);

export default authRouter;