'use strict';

/**
 * @ngdoc service
 * @name shavasanaApp.User
 * @description
 * # User
 * Service in the shavasanaApp.
 */
angular.module('shavasanaApp')
  .service('User', function User($http, ENV, $q) {
    var deferred = $q.defer();
    var currentUser;
    var UserService = {};

    UserService.fetch = function() {
      return $http.get(ENV.serverPath + 'users');
    };

    UserService.getCurrentUser = function() {
      if (currentUser) {
        return currentUser;
      } else {
        UserService.fetch().then(function(userPromise){
          deferred.resolve(userPromise.data);
        });
      }

      return deferred.promise;
    };

    UserService.setCurrentUser = function(user) {
      currentUser = user;
    };

    return UserService;
  });
