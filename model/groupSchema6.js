const { Schema, model } = require("mongoose");


const groupSchema = new Schema({
    group_name: { type: String, require: true },
    lesson_start_time: { type: String, require: true },
    lesson_continuous: { type: String, require: true },
    lesson_week_day: { type: String, require: true },
    group_stage_idint: {type: Schema.Types.ObjectId, ref: "stage" },
    room_number: { type: String, require: true },
    room_floor: { type: Number, require: true },
    branch_id: { type: Schema.Types.ObjectId, ref: "branch"  },
    lessons_quant: { type: Number, require: true },
    is_active: { type: Boolean, default: true },
});

const Group = model("group", groupSchema);

module.exports = { Group };