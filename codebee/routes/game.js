var express = require('express');
var router = express.Router();
const {PythonShell} = require('python-shell');

//parser handler
router.post('/parse', async(req, res) => {
  let options = {
    args: [JSON.stringify(req.body)]
  };

  // run a simple script
  PythonShell.run('./parser/parser.py', options, (err, results) => {
    // script finished
    return res.json(JSON.parse(results));
  });
});


module.exports = router;
