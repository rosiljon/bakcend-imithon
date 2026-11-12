const Joi = require("joi")

const studentValidationSchema = Joi.object({
    lid_id: Joi.string().required(),
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    phone_number: Joi.string().required(),
    bithday: Joi.date().required(),
    gender: Joi.string().required(),
})

const updateStudentValidationSchema = Joi.object({
    lid_id: Joi.string().optional(),
    first_name: Joi.string().optional(),
    last_name: Joi.string().optional(),
    phone_number: Joi.string().optional(),
    bithday: Joi.date().optional(),
    gender: Joi.string().optional(),
})

module.exports = {
    studentValidationSchema,
    updateStudentValidationSchema,
};