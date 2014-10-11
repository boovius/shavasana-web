'use strict';

describe('Controller: WeeklyCtrl', function () {

  // load the controller's module
  beforeEach(module('shavasanaApp'));

  var WeeklyCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    WeeklyCtrl = $controller('WeeklyCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
