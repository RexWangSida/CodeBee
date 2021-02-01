var express = require('express');
var router = express.Router();

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://Sida:108740@cluster0.5fddy.mongodb.net/codebee?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });




/*

return data: {
  result(int): 0 for good authentication, 1 for email found but password not correct, 2 for email not registered
  name(string): "name" for user name when good authentication, "" for others
}

*/


//login handler
router.post('/', (req, res,next) => {

    //retrieve user data from database
    client.connect(err => {
        if (err) throw err;
        console.log('Database has been connected successfully...');
        const users = client.db("codebee").collection("users");
        // perform actions on the collection object
        users.findOne({email:req.body.email})
        .then( result => {
          if(result){
              if(result.password === req.body.password){
                res.json({
                  result: 0,
                  name : result.name,
                }); //good authentication
              }
              res.json({
                result: 1,
                name : "",
              }); //email - password not paired
          }
          res.json({
            result: 2,
            name : "",
          }); //email not found
        });

        client.close();
    });
  });


module.exports = router;
