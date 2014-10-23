'use strict';

/**
 * @ngdoc function
 * @name shavasanaApp.controller:WeeklyCtrl
 * @description
 * # WeeklyCtrl
 * Controller of the shavasanaApp
 */
angular.module('shavasanaApp')
  .controller('WeeklyCtrl', function ($scope, trackers, TrackerService) {
    $scope.trackers = trackers;

    $scope.addValue = function(tracker){
      console.log(tracker);
      var doing = {'activity': tracker.id};
      TrackerService.add(doing)
        .success(function(){
          tracker.value++;
        });
    };
  });
