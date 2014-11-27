var app = angular.module('GameMob');

app.controller('MainController', function($scope, $firebase, mainService) {
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
         //$scope.gameMobtest_user = data;
      })
   };



   $scope.test_sessions = [];
   $scope.getListofsessions = function() {
      mainService.getListofsessions().then(function(data) {
         $scope.test_sessions = data.data;
      })
   };

   $scope.getListofsessions();

    //$scope.test_session.createdBy = $scope.currentUser.user_id;

    $scope.submitSession = function() {
      mainService.addNewSession($scope.test_session, function(data) {
          console.log("i'm here");

      })
    };
    var ref = new Firebase("https://gamermobmessages.firebaseio.com/");
    // GET MESSAGES AS AN ARRAY
    $scope.messages = $firebase(ref).$asArray();

    //ADD MESSAGE METHOD
    $scope.addMessage = function(e) {

        //LISTEN FOR RETURN KEY
        if (e.keyCode === 13 && $scope.msg) {
            //ALLOW CUSTOM OR ANONYMOUS USER NAMES
            var name = $scope.name || 'anonymous';

            //ADD TO FIREBASE
            $scope.messages.$add({
                from: name,
                body: $scope.msg
            });

            //RESET MESSAGE
            $scope.msg = "";
        }
    }
});