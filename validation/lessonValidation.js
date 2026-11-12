const Joi = require("joi");

const lessonValidationSchema = Joi.object({
    lesson_theme: Joi.string().allow(""),
    lesson_number: Joi.number().optional(),
    group_id: Joi.string().optional(),
    lesson_date: Joi.date() ,
});

const updateLessonValidationSchema = Joi.object({
    lesson_theme: Joi.string().allow(""),
    lesson_number: Joi.number().optional(),
});

module.exports = {
    lessonValidationSchema,
    updateLessonValidationSchema,
};