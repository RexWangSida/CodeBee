var express = require('express');
var router = express.Router();
const User = require('../model/User')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/', async(req, res) => {
    try{
      const {username,email,password} = req.body;
      const user = await User.findOne({
        email:email
      });
      if(user !== null){  res.json({result:1, name:""})}; //check if this email is registered, if yes return result as 1
      const num = await User.find().sort({uid:-1}).limit(1); // get largest uid
      const uInfo = {
        uid: num+1,
        name:username,
        email:email,
        password:password
      }
      const newUser = new User(uInfo);
      await newUser.save();
      return res.json({
        message:"new user has been added;"
      })
      res.json({result:0, name:username}); //send a successful message includes the name to be displayed
    }catch(e){
      return res.status(400).json({
        message:e.message,
      })
    }
});

module.exports = router;
