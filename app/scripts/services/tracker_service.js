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
        return $http.get('http://localhost:9393');
      },
      add: function(doing) {
        return $http.post('http://localhost:9393', doing);
      }
    };
  });
