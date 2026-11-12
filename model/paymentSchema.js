const { Schema, model } = require("mongoose");
const { Student } = require("./studentSchema")


const paymentSchema = new Schema({
    student_id: { type: Schema.Types.ObjectId, ref: Student, required: true },
    payment_last_date: { type: Date },
    payment_date: { type: Date },
    price: { type: String, required: true },
    is_paid: { type: Boolean },
    total_attent: { type: Number },
});

const Payment = model("payment", paymentSchema);

module.exports = { Payment };