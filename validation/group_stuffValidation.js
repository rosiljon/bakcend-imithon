const Joi = require('joi')

const postGroup_stuffValidateSchema = Joi.object({
    stuff_id: Joi.string().optional(),
    group_id: Joi.string().optional(),

})

module.exports = {
    postGroup_stuffValidateSchema,
}