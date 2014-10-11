'use strict';

/**
 * @ngdoc function
 * @name shavasanaApp.controller:WeeklyCtrl
 * @description
 * # WeeklyCtrl
 * Controller of the shavasanaApp
 */
angular.module('shavasanaApp')
  .controller('WeeklyCtrl', function ($scope, trackers) {
    $scope.trackers = trackers;

    $scope.addValue = function(tracker){
      tracker.value++;
    };
  });
