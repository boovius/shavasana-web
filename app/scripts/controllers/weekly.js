'use strict';

/**
 * @ngdoc function
 * @name shavasanaApp.controller:WeeklyCtrl
 * @description
 * # WeeklyCtrl
 * Controller of the shavasanaApp
 */
angular.module('shavasanaApp')
  .controller('WeeklyCtrl', function ($scope, activities, TrackerService) {
    $scope.activities = activities;

    $scope.addValue = function(activity){
      var doing = {'activity': activity.id};
      TrackerService.add(doing)
        .success(function(){
          activity.value++;
        });
    };
  });
