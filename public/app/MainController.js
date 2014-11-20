var app = angular.module('GameMob');

app.controller('MainController', function($scope, mainService) {
   $scope.gameMob_users = [];
   $scope.getListofUsers = function() {
      mainService.getListofUsers().then(function(data) {
         $scope.gameMob_users = data.data;
      })
   };

   $scope.getListofUsers();

   $scope.changeToUser = function(){
      var x = $scope.currentUser;
      for (var i = 0; i < $scope.gameMob_users.length; i++) {
         if ($scope.gameMob_users[i].user_id === $scope.selectedUser.user_id) {
             $scope.currentUser = $scope.gameMob_users[i];
            console.log(x)
            break;
         } else {
            console.log('didnt work')
         }
      }
   };
  // $scope.changeToUser();


   $scope.test = 'this test is working';

   $scope.submitForm = function() {
      mainService.addNewUser($scope.gameMob_user, function(data) {
         $scope.gameMob_users = data;
      })
   }

});


