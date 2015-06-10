var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var docSchema = Schema({
  title: String,
  fileName: String,
  mime: String, //mime type of the doc ie application/pdf
  dataId: Schema.Types.ObjectId, // id to the file stored in mongodb
  previewImage: Buffer, //thumbnail preview of the doc
  createdBy: Schema.Types.ObjectId, //user id
  content: String //string content of document (index this)
});

var Doc = module.exports = mongoose.model('doc', docSchema);

module.exports.getAll = function(callback) {
  console.log('getting all docs...');
  Doc.find({}).exec(callback);
}

module.exports.findDocById = function(id, callback) {

  var objId = mongoose.Types.ObjectId(id);
  console.log('MODEL: getting by id: %j' + objId);
  Doc.findById(objId, callback);
}

module.exports.findByName = function(fileName, callback) {
  var query = {fileName: fileName};
  Doc.findOne(query, callback);
}
