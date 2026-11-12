const { Schema, model } = require('mongoose')

const reason_lidSchema  = new Schema ({
    reason_lid: { type:String, require: true}
})

const Reason_lid  =model("reason_lid", reason_lidSchema)
module.exports = {Reason_lid}