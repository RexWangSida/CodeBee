var express = require('express');
var router = express.Router();
const User = require('../model/User')

router.post('/create', async(req, res) => {
    try{
      const {username,email,password} = req.body;
      const user = await User.findOne({
        email:email
      });
      if(user !== null){  res.json({result:1, name:""})}; //check if this email is registered, if yes return result as 1
      const maxuser = await User.findOne({$query:{},$orderby:{uid:-1}}); // get the user with largest uid
      const num = maxuser.uid; // get largest uid
      console.log(num);
      const uInfo = {
        uid: 10,
        name:username,
        email:email,
        password:password
      }
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
