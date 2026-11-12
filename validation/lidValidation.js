const Joi = require("joi")

const postValidationSchema = Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    phone_number: Joi.string().required(),
    lid_stage_id: Joi.string().required(),
    test_date: Joi.string().required(),
    trial_lesson_date: Joi.string().required(),
    trial_lesson_time: Joi.string().required(),
    trial_lesson_group_id: Joi.string().required(),
    lid_status_id: Joi.string().required(),
    cancel_reson_id: Joi.string().required(),
})

const updateLidValidationSchema = Joi.object({
    first_name: Joi.string().optional(),
    last_name: Joi.string().optional(),
    phone_number: Joi.string().optional(),
    lid_stage_id: Joi.string().optional(),
    test_date: Joi.string().optional(),
    trial_lesson_date: Joi.string().optional(),
    trial_lesson_time: Joi.string().optional(),
    trial_lesson_group_id: Joi.string().optional(),
    lid_status_id: Joi.string().optional(),
    cancel_reson_id: Joi.string().optional(),
})

module.exports = {
    postValidationSchema,
    updateLidValidationSchema,
}