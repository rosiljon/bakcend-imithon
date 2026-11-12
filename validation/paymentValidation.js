const Joi = require('joi')

const postPaymentValidationSchema = Joi.object({
    student_id: Joi.string().required(),
    payment_last_date: Joi.date().optional(),
    payment_date: Joi.date().optional(),
    price: Joi.string().required(),
    is_paid: Joi.boolean().optional(),
    total_attent: Joi.number().optional(),
})

const updatePaymentValidationSchema = Joi.object({
    price: Joi.string().optional(),
    total_attent: Joi.number().optional(),
})
 
module.exports = {
    postPaymentValidationSchema,
    updatePaymentValidationSchema
};