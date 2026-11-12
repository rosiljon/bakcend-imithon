const Joi = require('joi')

const postValidationSchema = Joi.object({
    reason_lid: Joi.string().allow("")
})
const updateReasonValidationSchema = Joi.object({
    reason_lid: Joi.string().allow("").optional(),
})

module.exports = {
    postValidationSchema,
    updateReasonValidationSchema,
}