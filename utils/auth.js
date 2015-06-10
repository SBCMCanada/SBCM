var checkAuth = function(req, res, next) {
    var sess=req.session;
    console.log("Checking auth " + req.url);
    if (sess.loggedIn !== true){
      console.log('not logged in - redirecting');
      return res.redirect('/login');
    }

    //else
    if (next){
      console.log('Logged in - proceeding...');
      next(); // Passing the request to the next handler in the stack.
    }
};

module.exports = {auth:checkAuth};
