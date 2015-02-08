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
    var User = {};

    User.fetch = function() {
      $http.get(ENV.serverPath + 'users').
        then(function(userPromise){
          User.setCurrentUser(userPromise.data);
          defered.resolve(userPromise);
        }).
        catch(function(){
          defered.reject();
        });

      return defered.promise;
    };

    User.getCurrentUser = function() {
      console.log("in getCurrentUser");
      console.log(currentUser);
      if (currentUser) {
        defered.resolve(currentUser);
      } else {
        User.fetch().then(function(userPromise){
          defered.resolve(userPromise.data);
        });
      }

      return defered.promise;
    };

    User.setCurrentUser = function(userData) {
      console.log("in setCurrentUser");
      console.log(userData);
      currentUser = userData;
      console.log(currentUser);
    };

    return User;
  });
