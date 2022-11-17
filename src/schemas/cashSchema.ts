import joi from "joi";

const cashSchema = joi.object({
	username: joi.string().required(),
	value: joi.number().required()
});

export default cashSchema;