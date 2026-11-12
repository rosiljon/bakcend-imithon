const { Schema, model } = require("mongoose")
const { Lid } = require("./lidSchema")

const studentSchema = new Schema({
    lid_id: { type: Schema.Types.ObjectId, ref: Lid, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    phone_number: { type: String, required: true },
    bithday: { type: Date, required: true },
    gender: { type: String, required: true },
});

const Student = model("student", studentSchema)

module.exports = { Student }
