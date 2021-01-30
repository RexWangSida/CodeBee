const express = require('express');
const app = express();
var tools = require('./api/login');

app.get('/login/:userId', (req, res) => {
  if(login.check(userId, req.email, req.password)){
    return res.send("good");
  }
    return res.send("bad");
})
app.listen(8080);
