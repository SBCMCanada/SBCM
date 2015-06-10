// For managing users (admin)

var express = require('express');
var router = express.Router();

var models = require('../models');

// Or, you can use it this way:
UserModel = models.User;

/* GET users listing. */
router.get('/', function(req, res, next) {
  UserModel.getUserByEmail('bob@email.com');
  res.send('respond with a resource');
});

/* POST users listing. */
router.post('/', function(req, res, next) {
  var user = new UserModel();
  user.email = 'bob@email.com';
  user.save();

  res.send('respond');
});


module.exports = router;
