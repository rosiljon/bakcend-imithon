const { string } = require('joi')
const { Schema, model } = require('mongoose')

const stageSchema  = new Schema ({
    name: { type:String, require: true}
})

const Stage  =model("stage", stageSchema)
module.exports = {Stage}