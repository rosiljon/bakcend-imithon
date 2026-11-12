const Joi = require("joi")

const postStudent_groupValidateSchema = Joi.object({
    student_id: Joi.string().required(),
    group_id: Joi.string().required(),
})

module.exports = {
    postStudent_groupValidateSchema,
}