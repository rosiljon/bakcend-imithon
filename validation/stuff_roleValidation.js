const Joi = require('joi')

const postStuff_roleValidateSchema = Joi.object({
    stuff_id: Joi.string().optional(),
    role_id: Joi.string().optional(),

})

module.exports = {
    postStuff_roleValidateSchema,
}