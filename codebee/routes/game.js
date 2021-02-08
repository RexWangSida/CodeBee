var express = require('express');
var router = express.Router();
const {PythonShell} = require('python-shell');

//parser handler
router.post('/parse', async(req, res) => {
  let options = {
    mode: 'text',
    pythonPath: '/path/to/python/bin/python3.7',
    pythonOptions: ['-u'], // get print results in real-time
    scriptPath: '/absolute/path/to/script/',
    args: ['Bruce Wayne']
  };

  PythonShell.run('numSO1.py', options, function (err, results) {
    if (err) throw err;
    // results is an array consisting of messages collected during execution
    console.log('results: %j', results);
  });
});


module.exports = router;
