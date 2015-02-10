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
          login: ['$q', '$location', '$window', '$cookies', '$http', 'User', 'TokenService', function($q, $location, $window, $cookies, $http, User, TokenService) {
            var token = $location.$$search.token || $cookies.token;
            if (token) {
              TokenService.set(token);
              User.fetch()
                .then(function() {
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
              .then(function(activitiesPromise) {
                deferred.resolve(activitiesPromise.data);
              }, function(){
                deferred.reject();
              });

              return deferred.promise;
          }],
          user: ['User', '$q', function(User, $q) {
            var deferred = $q.defer();
            User.fetch()
              .then(function(userPromise) {
                User.setCurrentUser(userPromise.data);
                deferred.resolve(userPromise.data);
              }, function() {
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
          }],
          user: ['User', '$q', function(User, $q) {
            var deferred = $q.defer();
            User.fetch()
              .then(function(userPromise) {
                console.log(userPromise.data);
                User.setCurrentUser(userPromise.data);
                deferred.resolve(userPromise.data);
              }, function() {
                deferred.reject();
              });
            return deferred.promise;
          }]
        }
      })
      .otherwise({
        redirectTo: '/weekly'
      });
    })
    .run(['$http', 'TokenService', function($http, TokenService) {
      $http.defaults.headers.common['X-Authorization'] = TokenService.get();
    }]);
