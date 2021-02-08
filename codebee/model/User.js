const mongoose = require("mongoose");
var Int32 = require('mongoose-int32');
const UserSchema = new mongoose.Schema({
  uid:{
    type:Int32,
    required:true,
    unique:true
  },
  name:{
    type:String,
    unique:true,
    required:true,
    trim:true,
  },
  email:{
    type:String,
    unique:true,
    required:true,
    trim:true,
  },
  password:{
    type:String,
    required:true,
    trim:true,
  },
})

const User = mongoose.model('User',UserSchema);
module.exports = User;
