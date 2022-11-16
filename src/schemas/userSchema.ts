import joi from "joi";

const regexPassword = /^(?=.*[A-Z])[0-9A-Z]{8,}$/;

const userSchema = joi.object({
	username: joi.string().min(3).required(),
	password: joi.string().min(8).regex(regexPassword).required()
});

export default userSchema;