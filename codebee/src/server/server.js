const express = require('express');
const app = express();
var login = require('./api/login');
var cors = require('cors')
var bodyParser = require('body-parser')
app.use(cors());

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

app.post('/login', (req, res) => {
  console.log(req.body);
  if(login.check(req.body.email, req.body.password)){
    return res.send("good");
  }
    return res.send("bad");
});

app.listen(8080);
