'use strict';

/**
 * @ngdoc function
 * @name shavasanaApp.controller:WeeklyCtrl
 * @description
 * # WeeklyCtrl
 * Controller of the shavasanaApp
 */
angular.module('shavasanaApp')
  .controller('WeeklyCtrl', function ($scope, activities, ActivityService) {
    $scope.activities = activities;
    $scope.adding = false;

    $scope.addValue = function(activity){
      var doing = {'activity': activity.id};
      ActivityService.add(doing)
        .success(function(){
          activity.value++;
        });
    };

    $scope.createActivity = function() {
      $scope.adding = !$scope.adding;
      ActivityService.create()
        .success(function(){

        });
    };
  });
