const Crypto = require('crypto');
const User = require('../model/User');
const uuid = require('uuid');
var express = require('express');
var router = express.Router();


//SignUp api: create new users
router.post('/create', async(req, res) => {
    try{
      const {username,email,password} = req.body;
      if(!username){return res.json({message:'no username'})}
      if(!email){return res.json({message:'no email'})}
      if(!password){return res.json({messafge:'no password'})}
      const user = await User.findOne({email:email});
      if(user !== null){
        return res.json({result:1, message:"The email has been registered!"})
      }; //check if this email is registered, if yes return result as 1
      var decU = await User.find({}).sort({"_uid":-1}).limit(1); // get the user with largest uid
      var num = (decU.length === 0?-1:(decU[0].toObject()._uid));
      const pwdCryp = Crypto.createHash('sha1').update(password).digest('hex');
      const tokenstr = uuid.v4();
      const token = Crypto.createHash('sha1').update(tokenstr).digest('hex');
      const uInfo = {
        _uid: num+1,
        username:username,
        email:email,
        password:pwdCryp,
        token:token
      };
      const newUser = new User(uInfo);
      await newUser.save();
      return res.json({result:0, username:username,token:token}); //send a successful message includes the username to be displayed
    }catch(e){
      return res.json({
        message:e.message,
      })
    }

});

//login handler
router.post('/login', async(req, res) => {
    try{
      const {email,password} = req.body;
      if(!email){return res.json({message:'no email'})}
      if(!password){return res.json({message:'no password'})}
      const user = await User.findOne({email:email});
      if(!user){
        res.json({
            result: 2,
            message:"The email is not registered with us!"
          }); //email not found
      }
      const pwdCryp = Crypto.createHash('sha1').update(password).digest('hex');
      if(user.password !== pwdCryp){
        res.json({
                result: 1,
                message : "The password does not match the email you registered!",
              }); //email - password not paired
      }
      const tokenstr = uuid.v4();
      const token = Crypto.createHash('sha1').update(tokenstr).digest('hex');
      user.token = token;
      await user.save();
      res.json({
                result: 0,
                username : user.username,
                token:user.token
              }); //good authentication
    }catch(e){
      res.json({
        message:e.message,
      });
    }
});

//authentication api
router.post('/auth', async(req, res) => {
    try{
      const {username,token} = req.body;
      if(!username){return res.json({message:'no username'})}
      if(!token){return res.json({message:'no token'})}
      const user = await User.findOne({username:username});
      if(!user){
        return res.json({result:1,message:"Token is invalid!"})
      }; //check if token is still valid
      return res.json(
        {result:0,
         username:user.username
        }
      ); //send a successful message includes the username to be displayed
    }catch(e){
      return res.json({
        message:e.message,
      })
    }
});

//logOut api
router.post('/logout', async(req, res) => {
    try{
      const {username,token} = req.body;
      if(!username){return res.json({message:'no username'})}
      if(!token){return res.json({message:'no token'})}
      const user = await User.findOne({username:username,token:token});
      if(!user){
        return res.json({result:1,message:"Token is invalid! Please re-Login."})
      }; //check if token is still valid
      user.token = null;
      await user.save();
      return res.json(
        {result:0,
        }//log out successfully
      );
    }catch(e){
      return res.json({
        message:e.message,
      })
    }
});
//access users info
router.post('/:username', async(req, res) => {
    try{
      const {username} = req.params;
      if(!username){return res.json({message:'no username'})}
      const user = await User.findOne({username:username});
      if(!user){
        return res.json({result:1, message:"The user does not exist!"})
      }; //check if user exists
      return res.json(
        {result:0,
         user:user,
        }
      );
    }catch(e){
      return res.json({
        message:e.message,
      })
    }
});
module.exports = router;
