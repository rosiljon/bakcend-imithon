const Joi = require('joi')

const postValidationSchema = Joi.object({
    name: Joi.string().allow("")
})
const updateStageValidationSchema = Joi.object({
    name: Joi.string().allow("").optional(),
})

module.exports = {
    postValidationSchema,
    updateStageValidationSchema,
}