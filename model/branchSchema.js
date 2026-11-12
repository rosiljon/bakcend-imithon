const { Schema, model } = require('mongoose')

const  branchSchema= new Schema ({
    name: {type: String, require: true,},
    address: {type: String, require: true,},
    cal_number: { type: String, require: true,},
    
})

const Branch = model("branch", branchSchema);
module.exports = {Branch}