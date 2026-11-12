const Joi = require('joi')

const postStudentLessonValidationSchema = Joi.object({
    lesson_id: Joi.string().required(),
    student_id: Joi.string().required(),
    is_there: Joi.boolean(),
    reason: Joi.string().required(),
    be_paid: Joi.boolean(),
})

const updateStudentLessonValidationSchema = Joi.object({
    is_there: Joi.boolean(),
    reason: Joi.string().required(),
    be_paid: Joi.boolean()
})

module.exports = {
    postStudentLessonValidationSchema,
    updateStudentLessonValidationSchema
};