'use strict';

/**
 * @ngdoc service
 * @name shavasanaApp.ActivityService
 * @description
 * # ActivityService
 * Service in the shavasanaApp.
 */
angular.module('shavasanaApp')
  .service('ActivityService', function ActivityService($http) {
    return {
      fetch: function() {
        return $http.get('http://localhost:9393');
      },
      add: function(doing) {
        return $http.put('http://localhost:9393', doing);
      },
      create: function(activity) {
        return $http.put('http://localhost:9393', activity);
      }
    };
  });
