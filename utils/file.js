var isPdf = function(mimetype){
  if (mimetype=='application/pdf'){
    return true;
  }
};

module.exports = {
  isPdf:isPdf
};
