function checkPasswords(domId1, domId2){
  var p1Dom = $('#'+domId1);
  var p2Dom = $('#'+domId2);

  if (p1Dom.val() == p2Dom.val()){
    return true;
  }else{
    alert("Passwords don't match.");
    return false;
  }

}
