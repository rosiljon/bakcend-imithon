const Joi = require("joi");

const groupValidationSchema = Joi.object({
    group_name: Joi.string().allow(""),
    lesson_start_time: Joi.string().allow(""),
    lesson_continuous: Joi.string().allow(""),
    lesson_week_day: Joi.string().allow(""),
    group_stage_idint: Joi.string().optional(),
    room_number: Joi.string().allow(""),
    room_floor: Joi.number().optional(),
    branch_id: Joi.string().optional(),
    lessons_quant: Joi.number().optional(),
    is_active: Joi.boolean(),
});

const updateGroupValidationSchema = Joi.object({
    group_name: Joi.string().allow("").optional(),
    lesson_start_time: Joi.string().allow("").optional(),
    lesson_continuous: Joi.string().allow("").optional(),
    lesson_week_day: Joi.string().allow("").optional(),
    room_number: Joi.string().allow("").optional(),
    room_floor: Joi.number().optional(),
    lessons_quant: Joi.number().optional(),

})

module.exports = {
    groupValidationSchema,
    updateGroupValidationSchema,
};