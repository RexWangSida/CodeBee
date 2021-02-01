var express = require('express');
var router = express.Router();

var users = [
  {
  uid: 0,
  name: "Sida Wang",
  email : "123",
  password : "456",
  }
];


function check(email, password){
  if(users[0].email == email && users[0].password == password){
    return true;
  }
  return false;
}

//login handler
//return 0 for success, 1 for fail to login authentication
router.post('/', (req, res,next) => {
  if(check(req.body.email, req.body.password)){
    return res.json(0);
  }
    return res.json(1);
});


module.exports = router;
