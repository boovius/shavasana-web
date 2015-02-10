'use strict';

/**
 * @ngdoc function
 * @name shavasanaApp.controller:WeeklyCtrl
 * @description
 * # MonthlyCtrl
 * Controller of the shavasanaApp
 */
angular.module('shavasanaApp')
  .controller('MonthlyCtrl', function ($scope, activities, ActivityService, user) {
    $scope.user = user;
    $scope.newActivity = null;
    $scope.activities = activities;
    $scope.adding = false;
    $scope.addingMessage = 'Add New Activity';

    $scope.addValue = function(activity){
      var doing = {'activity': activity.id};
      ActivityService.do(doing)
        .success(function(){
          activity.monthly++;
        });
    };

    $scope.flipAdding = function() {
      $scope.adding = !$scope.adding;
      if ($scope.adding) {
        $scope.addingMessage = 'Cancel';
      } else {
        $scope.addingMessage = 'Add New Activity';
      }
    };

    $scope.value = function(activity) {
      if (activity.monthly === 0) {
        var today = new Date();
        var last  = new Date(activity.doneLastAt);
        var daysAgo = Math.floor((today-last)/86400000);
        return daysAgo + ' days ago';
      } else {
        return activity.monthly;
      }
    };

    $scope.createActivity = function() {
      var newActivity = {'activity': $scope.newActivity};
      ActivityService.create(newActivity)
        .success(function(response){
          $scope.activities.push(response);
          $scope.flipAdding();
          $scope.newActivity = null;
        }).
        error(function(){
          $scope.flipAdding();
          $scope.newActivity = null;
        });
    };
  });
