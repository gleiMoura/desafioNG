import router from "express";
import userSchema from "../schemas/userSchema.js";

const authRouter = router();

authRouter.post("/signUp", schemaValidator(userSchema), createUser);

export default authRouter;