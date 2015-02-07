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
    'config'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        redirectTo: '/weekly'
      })
      .when('/login', {
        resolve: {
          login: ['$q', '$location', '$cookies', 'User', function($q, $location, $cookies, User) {
            var token = $location.$$search.token || $cookies.token;
            // if no token redirect to ENV['server/login']
            if (token) {
              $cookies.token = token || $cookies.token;
              window.localStorage.setItem('token', token);
              $http.defaults.headers.common['X-Authorization'] = TokenService.sanitize();
              var deferred = $q.defer();
              User.fetch()
                .then(function(){
                  // redirect to home/weekly
                })
                .catch(function(){
                  // redirect back to server login
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
