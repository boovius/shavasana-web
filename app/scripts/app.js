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
  .config(function ($httpProvider, $routeProvider, ENV) {
    $httpProvider.interceptors.push('authInterceptor');

    $routeProvider
      .when('/', {
        redirectTo: '/weekly'
      })
      .when('/login', {
        resolve: {
          login: ['$q', '$location', '$window', '$cookies', '$http', 'UserService', 'TokenService', function($q, $location, $window, $cookies, $http, UserService, TokenService) {
            var deferred = $q.defer();
            var token = $location.$$search.token || $cookies.token;
            if (token) {
              TokenService.set(token);
              UserService.fetch()
                .then(function(userPromise) {
                  UserService.setCurrentUserPromise(userPromise);
                  deferred.resolve(userPromise);
                  $location.url('/weekly');
                }, function(){
                  deferred.reject();
                })

                return deferred.promise;
            } else {
              $window.location.href = ENV.serverPath + 'login';
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
          user: ['UserService', '$q', function(UserService, $q) {
            var deferred = $q.defer();
            UserService.getCurrentUserPromise()
              .then(function(userPromise) {
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
          user: ['UserService', '$q', function(UserService, $q) {
            var deferred = $q.defer();
            UserService.getCurrentUserPromise()
              .then(function(userPromise) {
                deferred.resolve(userPromise.data);
              }, function() {
                deferred.reject();
              });
            return deferred.promise;
          }]
        }
      })
      .when('/unauthorized', {
        resolve: {
          deleteInvalidToken: ['$window', 'TokenService', function($window, TokenService){
            alert('sorry your session is invalid, please sign in again');
            TokenService.clearInvalidToken();
            $window.location.href = ENV.serverPath + 'login';
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
