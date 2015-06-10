var express = require('express');

var fs = require('fs');
var Grid = require('gridfs-stream');

var router = express.Router();

router.get('/:id', function(req, res, next){
  try {

    var mongoose = req.mongoose;
    var conn = mongoose.connection;

    var id = req.params.id;
    var objId = mongoose.Types.ObjectId(id);
    console.log('Getting data by id: ' + id);

    Grid.mongo = mongoose.mongo;

    var gfs = Grid(conn.db);


    var fileName = 'unnamed.dat';
    var mimeType = 'application/octet-stream';
    //get file details
    gfs.findOne({_id:objId}, function(err,file){
      console.log('found!');
      mimeType = file.contentType;
      fileName = file.filename;

      console.log("mime: " + mimeType);
      console.log("name: " + fileName);

      res.setHeader('Content-type', mimeType);
      res.setHeader('Content-disposition', 'attachment; filename='+fileName);

      var readStream = gfs.createReadStream({
        _id: objId
      });

      readStream.on('error', function(err){
        console.log(err);
      });

      readStream.pipe(res);
    });

  }catch(e){
    console.log("ERROR:");
    console.log(e);
  }
});

module.exports = router;
