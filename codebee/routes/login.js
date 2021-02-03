var express = require('express');
var router = express.Router();
const User = require('../model/User');


/*
return data: {
  result(int): 0 for good authentication, 1 for email found but password not correct, 2 for email not registered
  name(string): "name" for user name when good authentication, "" for others
}
*/


//login handler
router.post('/', async(req, res) => {
    try{
      const {email,password} = req.body;
      const user = await User.findOne({
        email:email
      });
      if(!user){
        return res.json({
            result: 2,
            name : "",
          }); //email not found
      }
      if(user.password !== password){
        return res.json({
                result: 1,
                name : "",
              }); //email - password not paired
      }
      return res.json({
                result: 0,
                name : result.name,
              }); //good authentication

    }catch(e){
      return res.status(400).json({
        message:e.message,
      })；
    }
});


module.exports = router;
