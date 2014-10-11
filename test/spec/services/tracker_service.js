'use strict';

describe('Service: TrackerService', function () {

  // load the service's module
  beforeEach(module('shavasanaApp'));

  // instantiate service
  var TrackerService;
  beforeEach(inject(function (_TrackerService_) {
    TrackerService = _TrackerService_;
  }));

  it('should do something', function () {
    expect(!!TrackerService).toBe(true);
  });

});
