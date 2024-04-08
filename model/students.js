const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentModel = new Schema({
    masv : {type: String, require: true, maxLength: 15, unique: true},
    name : {type: String, require: true},
    point : {type: Number, require: true},
    avatar : {type: String}
},{
    timestamps: true
})

module.exports = mongoose.model('student', StudentModel)
