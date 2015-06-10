'use strict';

describe('Controller: IrouteCtrl', function () {

  // load the controller's module
  beforeEach(module('sbcmApp'));

  var IrouteCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    IrouteCtrl = $controller('IrouteCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
