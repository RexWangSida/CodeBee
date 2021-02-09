var express = require('express');
var router = express.Router();
const User = require('../model/User')

router.post('/create', async(req, res) => {
    try{
      const {name,email,password} = req.body;
      const user = await User.findOne({
        email:email
      });
      if(user !== null){  res.json({result:1, name:""})}; //check if this email is registered, if yes return result as 1
      var decU = await User.find({}).sort({"_uid":-1}).limit(1); // get the user with largest uid
      var num = (decU[0]); // get largest uid
      console.log(num);
      const uInfo = {
        uid: num+1,
        name:name,
        email:email,
        password:password
      };
      const newUser = new User(uInfo);
      await newUser.save();
      res.json({result:0, name:username}); //send a successful message includes the name to be displayed
    }catch(e){
      return res.status(400).json({
        message:e.message,
      })
    }

});

//login handler
router.post('/login', async(req, res) => {
    try{
      const {email,password} = req.body;
      const user = await User.findOne({
        email:email
      })
      if(!user){
        res.json({
            result: 2,
            name : "",
          }); //email not found
      }
      if(user.password !== password){
        res.json({
                result: 1,
                name : "",
              }); //email - password not paired
      }
      res.json({
                result: 0,
                name : user.name,
              }); //good authentication
    }catch(e){
      res.status(400).json({
        message:e.message,
      });
    }
});


module.exports = router;
