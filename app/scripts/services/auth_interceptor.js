'use strict';

/**
 * @ngdoc service
 * @name shavasanaApp.authInterceptor
 * @description
 * # authInterceptor
 * Service in the shavasanaApp.
 */
angular.module('shavasanaApp')
  .service('authInterceptor', function authInterceptor($q, $location) {
    return {
      response: function(response){
        return response || $q.when(response);
      },
      responseError: function(rejection) {
        if (rejection.status === 0){
          return $q.reject(rejection);
        }else{
          $location.path('/unauthorized');
        }
      }
    };
  });
