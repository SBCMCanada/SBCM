var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
  username: {type: String, required: false, index: {unique:true}},
  email: {type: String, required: true, index: {unique:true}},
  firstName: {type: String},
  lastName: {type: String},
  password: {type: String, required: true}
});

var User = module.exports = mongoose.model('user', userSchema);

module.exports.getAll = function(callback) {
  User.find({}).exec(callback);
}

module.exports.getUserById = function(id, callback) {
  User.findById(id, callback);
}

module.exports.getUserByEmail = function(email, callback) {
  var query = {email: email};
  User.findOne(query, callback);
}

module.exports.getUserByUsername = function(username, callback) {
  var query = {username: username};
  User.findOne(query, callback);
}
