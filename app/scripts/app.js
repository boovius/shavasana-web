'use strict';

/**
 * @ngdoc overview
 * @name shavasanaApp
 * @description
 * # shavasanaApp
 *
 * Main module of the application.
 */
angular
  .module('shavasanaApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'env'
  ])
  .config(function ($routeProvider, ENV) {
    $routeProvider
      .when('/', {
        redirectTo: '/weekly'
      })
      .when('/login', {
        resolve: {
          login: ['$q', '$location', '$window', '$cookies', '$http', 'User', function($q, $location, $window, $cookies, $http, User) {
            var token = $location.$$search.token || $cookies.token;
            if (token) {
              $cookies.token = token || $cookies.token;
              window.localStorage.setItem('token', token);
              $http.defaults.headers.common['X-Authorization'] = token;
              User.fetch()
                .then(function(){
                  $location.url('/weekly');
                })
                .catch(function(){
                  $window.location.href = ENV.serverPath;
                });
            }
          }]
        }
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/weekly', {
        templateUrl: 'views/weekly.html',
        controller: 'WeeklyCtrl',
        resolve: {
          activities: ['ActivityService', '$q', function(ActivityService, $q) {
            var deferred = $q.defer();
            ActivityService.fetch()
              .then(function(data) {
                deferred.resolve(data.data);
              }, function(){
                deferred.reject();
              });

              return deferred.promise;
          }]
        }
      })
      .when('/monthly', {
        templateUrl: 'views/monthly.html',
        controller: 'MonthlyCtrl',
        resolve: {
          activities: ['ActivityService', '$q', function(ActivityService, $q) {
            var deferred = $q.defer();
            ActivityService.fetch()
              .then(function(data) {
                deferred.resolve(data.data);
              }, function(){
                deferred.reject();
              });

              return deferred.promise;
          }]
        }
      })
      .otherwise({
        redirectTo: '/weekly'
      });
  });
