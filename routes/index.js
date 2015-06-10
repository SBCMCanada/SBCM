var express = require('express');
var auth = require('../utils/auth');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  console.log('in routes/index.js');
  auth.auth(req,res, function(){
    res.render('index', { title: 'Home' });
  });
});

module.exports = router;
