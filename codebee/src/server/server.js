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



//login handler
//return 0 for success, 1 for fail to login authentication
app.post('/login', (req, res) => {
  if(login.check(req.body.email, req.body.password)){
    return res.json(0);
  }
    return res.json(1);
});

app.listen(8080);
