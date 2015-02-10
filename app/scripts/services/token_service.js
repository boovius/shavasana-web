'use strict';

/**
 * @ngdoc service
 * @name shavasanaApp.tokenService
 * @description
 * # tokenService
 * Service in the shavasanaApp.
 */
angular.module('shavasanaApp')
  .service('TokenService', function tokenService($http, $cookies) {
    var token;
    var TokenService = {};

    TokenService.get = function() {
      return token;
    };

    TokenService.set = function(token) {
      $cookies.token = token || $cookies.token;
      window.localStorage.setItem('token', token);
      $http.defaults.headers.common['X-Authorization'] = token;
    };

    return TokenService;
  });
