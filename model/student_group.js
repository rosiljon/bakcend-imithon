const { Schema, model } = require('mongoose')
const { Student } = require("./studentSchema")
const { Group } = require("./groupSchema6")

const student_group = new Schema({
    student_id: { type: Schema.Types.ObjectId, ref: Student, required: true },
    group_id: { type: Schema.Types.ObjectId, ref: Group, required: true },
})

const studentGroup = model("studentGroup", student_group)
module.exports = { studentGroup }