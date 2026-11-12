const { string } = require('joi')
const { Schema, model } = require('mongoose')

const lid_statusSchema  = new Schema ({
    status: { type:String, require: true}
})

const Lid_status  =model("lid_status", lid_statusSchema)
module.exports = {Lid_status}