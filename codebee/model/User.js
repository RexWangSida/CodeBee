const mongoose = require("mongoose");
var Int32 = require('mongoose-int32');
const UserSchema = new mongoose.Schema({
  _uid:{
    type:Int32,
    required:true,
    unique:true
  },
  username:{
    type:String,
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
  token:{
    type:String,
    required:false,
  }
})

const User = mongoose.model('User',UserSchema);
module.exports = User;
