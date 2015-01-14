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
        return $http.get('http://localhost:9393/activities');
      },
      create: function(activity) {
        return $http.post('http://localhost:9393/activities', activity);
      },
      do: function(doing) {
        return $http.post('http://localhost:9393/doings', doing);
      }
    };
  });
