import joi from "joi";

const regexDate= /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/;

const transactionDateSchema = joi.object({
	date: joi.string().min(8).regex(regexDate).required()
});

export default transactionDateSchema;