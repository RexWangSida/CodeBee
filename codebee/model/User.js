const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
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
