const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserModel = new Schema({
    username : {type: String, require: true},
    password : {type: String, require: true},
    email : {type: String, require: true},
    fullname : {type: String, require: true},
    avatar : {type: String}
})

module.exports = mongoose.model('user', UserModel)