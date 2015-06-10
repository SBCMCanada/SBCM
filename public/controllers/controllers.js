'use strict';

var appControllers = angular.module('appControllers', []);


appControllers.controller('DocumentListCtrl',function($scope,$http,$routeParams){
  var page = $routeParams.page;
  if (page){
    //get pages request
    alert('page:'+page);
  }else{
    $http.get('/rest/documents').success(function(data){

      for(var i = 0; i<data.length; i++){
        var fileName = data[i].fileName;
        var ext =fileName.substr(fileName.lastIndexOf('.')+1,fileName.length);
          data[i].ext = ext.toLowerCase();
      }

      $scope.docs = data;
    });
  }
});

appControllers.controller('DocumentDetailCtrl',function($scope,$http,$routeParams){
  var docId = $routeParams.docId
  $http.get('/rest/documents/'+docId).success(function(data){
    $scope.doc = data;
  });
});

appControllers.controller('DocumentAddCtrl',function($scope,$http,$routeParams){
  $http.post('/rest/documents').success(function(data){
    $scope.docs = data;
  });
});

appControllers.controller('LoginCtrl',function($scope,$http){
  $http.get('/login/checkSession').success(function(data){
    $scope.loggedIn = data.loggedIn;
  });
});
