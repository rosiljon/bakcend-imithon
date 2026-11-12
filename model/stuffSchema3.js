const { Schema, model } = require('mongoose')

const stuff_role = new Schema({
    role_id: {type: Schema.Types.ObjectId, ref: 'role'},
    stuff_id: {type: Schema.Types.ObjectId, ref: 'stuff'},
})

const StuffRole  = model('suffRole', stuff_role)
module.exports = {StuffRole}