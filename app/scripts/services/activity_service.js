'use strict';

/**
 * @ngdoc service
 * @name shavasanaApp.ActivityService
 * @description
 * # ActivityService
 * Service in the shavasanaApp.
 */
angular.module('shavasanaApp')
  .service('ActivityService', function ActivityService($http, ENV) {
    return {
      fetch: function() {
        return $http.get(ENV.serverPath + 'activities');
      },
      create: function(activity) {
        return $http.post(ENV.serverPath + 'activities', activity);
      },
      do: function(doing) {
        return $http.post(ENV.serverPath + 'doings', doing);
      }
    };
  });
