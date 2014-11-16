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
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
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
      .otherwise({
        redirectTo: '/'
      });
  });
