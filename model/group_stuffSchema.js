const { Schema, model } = require('mongoose')
const { Group } = require("./groupSchema6")
const { Stuff } = require('./stuffSchema2')


const group_stuff = new Schema({
    group_id: {type: Schema.Types.ObjectId, ref: Group},
    stuff_id: {type: Schema.Types.ObjectId, ref: Stuff},
})

const groupStuff  = model('groupStuff', group_stuff)
module.exports = {groupStuff}