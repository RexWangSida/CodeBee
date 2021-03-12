const mongoose = require("mongoose");
var Int32 = require('mongoose-int32');
const LevelSchema = new mongoose.Schema({
  _lid:{
    type:Int32,
    required:true,
    unique:true
  },
  description:String,
  
})

const Level = mongoose.model('Level',Level);
module.exports = Level;
