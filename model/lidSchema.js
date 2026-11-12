const { Schema, model } = require("mongoose");
const { Reason_lid } = require('./reason_lidSchema')
const { Lid_status } = require('./lid_statusSchema')
const { Group } = require('./groupSchema6')
const { Stage } = require('./stageRoute')
const lidSchema = new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    phone_number: { type: String, required: true },
    lid_stage_id: { type: Schema.Types.ObjectId, ref: Stage, required: true },
    test_date: { type: String, required: true },
    trial_lesson_date: { type: String, required: true },
    trial_lesson_time: { type: String, required: true },
    trial_lesson_group_id: { type: Schema.Types.ObjectId, ref: Group, required: true },
    lid_status_id: { type: Schema.Types.ObjectId, ref: Lid_status, required: true },
    cancel_reson_id: { type: Schema.Types.ObjectId, ref: Reason_lid, required: true },
});

const Lid = model("lid", lidSchema);

module.exports = { Lid };