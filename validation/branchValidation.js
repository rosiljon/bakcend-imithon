const Joi = require("joi");

const postValidationSchema = Joi.object({
    name: Joi.string().required(),
    address: Joi.string().required(),
    cal_number: Joi.string().required(),
});

const updateBranchValidationSchema = Joi.object({
    name: Joi.string(),
    address: Joi.string(),
    cal_number: Joi.string(),
}).min(1);

module.exports = {
    postValidationSchema,
    updateBranchValidationSchema,
};
