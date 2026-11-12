const Joi = require('joi')

const postValidationSchema = Joi.object({
    status: Joi.string().allow("")
})
const updateStatusValidationSchema = Joi.object({
    status: Joi.string().allow("").optional(),
})

module.exports = {
    postValidationSchema,
    updateStatusValidationSchema,
}