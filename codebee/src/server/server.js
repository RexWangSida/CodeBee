const express = require('express');
const app = express();
var login = require('./api/login');
var cors = require('cors')

app.use(cors());
app.get('/login', (req, res) => {
  console.log("in");
  if(login.check(req.body.email, req.body.password)){
    return res.send("good");
  }
    return res.send("bad");
})
app.listen(8080);
