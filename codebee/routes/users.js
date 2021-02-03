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
      const uInfo = {
        name:username,
        email:email,
        password:password
      }
      const newUser = new User(uInfo);
      await newUser.save();
      return res.json({
        message:"new user has been added;"
      })
    }catch(e){
      return res.status(400).json({
        message:e.message,
      })
    }
});

module.exports = router;
