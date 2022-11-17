import joi from "joi";

const cashSchema = joi.object({
	creditedAccountId: joi.number().required(),
	value: joi.number().required()
});

export default cashSchema;