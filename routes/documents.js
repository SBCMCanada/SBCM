var express = require('express');
var models = require('../models');
var FileUtil = require('../utils/file');
var fs = require('fs');
var Grid = require('gridfs-stream');
var PdfExtractor = require('pdf-text-extract');

var router = express.Router();

var Doc = models.Doc;
var User = models.User;

/* GET documents listing. */
router.get('/', function(req, res, next) {

  console.log('getting docs');

  Doc.getAll(function(err,result){
    if (err)
      console.log(err);
    else
      console.log('no errors');

    //console.log("Result is: %j", result)
    res.json(result);
  });
});

router.get('/:id', function(req, res, next){
  try {
    var id = req.params.id;
    console.log('Getting document by id: ' + id)
    Doc.findDocById(id,function(err,result){
      if (err)
        console.log(err);
      else
        console.log('no errors');

      console.log("Result is: %j", result)
      res.json(result);
    });
  }catch(e){
    console.log("ERROR:");
    console.log(e);
  }
});

router.post('/', function(req, res, next) {
  console.log('in upload post!');
  try {

    var dirname = require('path').dirname(__dirname);

    console.log(req.files);

    var filename = req.files.fileUpload.name;
    console.log("file name: " + filename);
    var path = req.files.fileUpload.path;
    console.log("file path: " + path);
    var type = req.files.fileUpload.mimetype;
    console.log("file type: " + type);

    var fullPath = dirname + '/' + path;

    var readStream =  fs.createReadStream(fullPath);

    var mongoose = req.mongoose;
    var conn = mongoose.connection;
    Grid.mongo = mongoose.mongo;

    var gfs = Grid(conn.db);

    var writestream = gfs.createWriteStream({
        filename: req.files.fileUpload.originalname //generate some unique filename
    });
    readStream.pipe(writestream);

    writestream.on('close', function (file) {
        // do something with `file`
        console.log(file.filename + ' Written To DB');

        var fileId = mongoose.Types.ObjectId(file._id);

        console.log('File id is: %j',fileId);

        //we saved the file to mongodb, now we save the doc
        var newDoc = new Doc(req.body);
        newDoc.fileName=req.files.fileUpload.originalname;
        newDoc.mime=type;
        newDoc.dataId = fileId;

        var creator = User.getUserByEmail(req.session.userEmail);
        if (creator!= null){
          newDoc.createdBy = creator._id;
        }

        //if it's a pdf, try to extract text
        if (FileUtil.isPdf(newDoc.mime)){
          PdfExtractor(fullPath, function (err, pages) {
            if (err) {
              console.dir(err)
              //return;
            }
            console.dir(pages)
          })
          console.log('pdf file');
        }

        console.log('about to save...');

        newDoc.save(function(err,_newDoc){
          console.log("New doc: %j",_newDoc)
        });

        res.redirect('/');
    });

  }catch(e){
    console.log("ERROR:");
    console.log(e);
  }
});


module.exports = router;
