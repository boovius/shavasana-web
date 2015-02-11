'use strict';

/**
 * @ngdoc service
 * @name shavasanaApp.User
 * @description
 * # User
 * Service in the shavasanaApp.
 */
angular.module('shavasanaApp')
  .service('UserService', function User($http, ENV, $q) {
    var deferred = $q.defer();
    var currentUserPromise;
    var UserService = {};

    UserService.fetch = function() {
      return $http.get(ENV.serverPath + 'users');
    };

    UserService.getCurrentUserPromise = function() {
      if (currentUserPromise) {
        deferred.resolve(currentUserPromise);
      } else {
        UserService.fetch().then(function(userPromise){
          UserService.setCurrentUserPromise(userPromise);
          deferred.resolve(userPromise);
        });
      }

      return deferred.promise;
    };

    UserService.setCurrentUserPromise = function(userPromise) {
      currentUserPromise = userPromise;
    };

    return UserService;
  });
