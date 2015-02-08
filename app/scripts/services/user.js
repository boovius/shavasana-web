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
    var defered = $q.defer();
    var currentUser;
    var UserService = {};

    UserService.fetch = function() {
      $http.get(ENV.serverPath + 'users').
        then(function(userPromise){
          UserService.setCurrentUser(userPromise.data);
          defered.resolve(userPromise);
        }).
        catch(function(){
          defered.reject();
        });

      return defered.promise;
    };

    UserService.currentUser = function() {
      if (currentUser) {
        defered.resolve(currentUser);
      } else {
        UserService.fetch().then(function(userPromise){
          defered.resolve(userPromise.data);
        });
      }

      return defered.promise;
    };

    UserService.setCurrentUser = function(userData) {
      currentUser = userData;
    };

    return UserService;
  });
