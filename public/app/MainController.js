var app = angular.module('GameMob');

app.controller('MainController', function($scope, mainService) {
   $scope.gameMobtest_users = [];
   $scope.getListofUsers = function() {
      mainService.getListofUsers().then(function(data) {
         $scope.gameMobtest_users = data.data;
      })
   };

   $scope.getListofUsers();

   $scope.changeToUser = function(){
      var x = $scope.currentUser;
      for (var i = 0; i < $scope.gameMobtest_users.length; i++) {
         if ($scope.gameMobtest_users[i].user_id === $scope.selectedUser.user_id) {
             $scope.currentUser = $scope.gameMobtest_users[i];
            console.log(x);
            break;
         } else {
            console.log('didnt work')
         }
      }
   };
  // $scope.changeToUser();

   $scope.test = 'this test is working';
   $scope.submitForm = function() {
      mainService.addNewUser($scope.gameMobtest_user, function(data) {
         $scope.gameMobtest_users = data;
      })
   }



   $scope.test_sessions = [];
   $scope.getListofsessions = function() {
      mainService.getListofsessions().then(function(data) {
         $scope.test_sessions = data.data;
      })
   };

   $scope.getListofsessions();

   $scope.submitSession = function() {
      mainService.addNewSession($scope.test_session, function(data) {
         $scope.test_sessions = data;
      })
   }
});