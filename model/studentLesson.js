const { Schema, model } = require("mongoose");
const { Lesson } = require("./lessonSchema");
const { Student } = require("./studentSchema");


const studentLessonSchema = new Schema({
    lesson_id: { type: Schema.Types.ObjectId, ref: Lesson, required: true },
    student_id: { type: Schema.Types.ObjectId, ref: Student, required: true },
    is_there: { type: Boolean },
    reason: { type: String, required: true },
    be_paid: { type: Boolean },
});

const StudentLesson = model("student_lesson", studentLessonSchema);

module.exports = { StudentLesson };