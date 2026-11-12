const Joi = require("joi");

const registerValidationSchema = Joi.object({
    name: Joi.string().required().trim().max(20),
})

const updateCarValidationSchema = Joi.object({
    name: Joi.string().required().trim().max(100),
}).min(1);
module.exports = {
    registerValidationSchema,
    updateCarValidationSchema
}