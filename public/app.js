var mainApp = angular.module('mainApp', [
  'ngRoute', 'ngResource', 'appControllers', 'ui.bootstrap'
]);

mainApp.config(
  ['$routeProvider', function($routeProvider){
    $routeProvider.
    when('/documents', {
       templateUrl: 'partials/documents/list.html',
       controller: 'DocumentListCtrl'
     }).
     when('/documents/add', {
       templateUrl: 'partials/documents/add.html'
     }).
     when('/documents/id/:docId', {
       templateUrl: 'partials/documents/detail.html',
       controller: 'DocumentDetailCtrl'
     }).
     when('/documents/add/submit', {
       templateUrl: 'partials/documents/detail.html',
       controller: 'DocumentAddCtrl'
     }).
     when ('/documents/page/:page',{
       templateUrl:'partials/documents/list.html',
       controller: 'DocumentListCtrl'
     }).
     otherwise({
       redirectTo: '/documents'
     });

 }]);
