'use strict';

/**
 * @ngdoc service
 * @name shavasanaApp.tokenService
 * @description
 * # tokenService
 * Service in the shavasanaApp.
 */
angular.module('shavasanaApp')
  .service('TokenService', function tokenService($http, $location, $cookies, $window, ENV) {
    var token;
    var TokenService = {};

    TokenService.get = function() {
      if (token) {
        return token;
      } else {
        TokenService.set();
        return token;
      }
    };

    TokenService.set = function() {
      token = $location.$$search.token || $cookies.token;
      if (token) {
        $cookies.token = token || $cookies.token;
        window.localStorage.setItem('token', token);
        $http.defaults.headers.common['X-Authorization'] = token;
      } else {
        $window.location.href = ENV.serverPath;
      }
    };

    return TokenService;
  });
