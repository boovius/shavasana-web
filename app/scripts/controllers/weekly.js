'use strict';

/**
 * @ngdoc function
 * @name shavasanaApp.controller:WeeklyCtrl
 * @description
 * # WeeklyCtrl
 * Controller of the shavasanaApp
 */
angular.module('shavasanaApp')
  .controller('WeeklyCtrl', function ($scope, activities, ActivityService, user) {
    $scope.user = user;
    $scope.newActivity = null;
    $scope.activities = activities;
    $scope.adding = false;
    $scope.addingMessage = 'Add New Activity';

    $scope.addValue = function(activity){
      var doing = {'activity': activity.id};
      ActivityService.do(doing)
        .success(function(){
          activity.weekly++;
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
      if (activity.weekly === 0) {
        if (activity.doneLastAt === null) {
          return 'not done yet :)';
        }
        var today = new Date();
        var last  = new Date(activity.doneLastAt);
        var daysAgo = Math.floor((today-last)/86400000);
        return daysAgo + ' days ago';
      } else {
        return activity.weekly;
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
