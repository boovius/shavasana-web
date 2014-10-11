'use strict';

/**
 * @ngdoc service
 * @name shavasanaApp.TrackerService
 * @description
 * # TrackerService
 * Service in the shavasanaApp.
 */
angular.module('shavasanaApp')
  .service('TrackerService', function TrackerService($http) {
    return {
      fetch: function() {
        return $http.get('http://localhost:4567')
      }
    };
  });
