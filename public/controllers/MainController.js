var app = angular.module('GameMob');

app.controller('MainController', '$scope', function($scope, $firebase, mainService) {

    //get list of GameMob Users

    $scope.gameMobtest_users = [];
    $scope.getListofUsers = function() {
        mainService.getListofUsers().then(function(data) {
            $scope.gameMobtest_users = data.data;
        })
    };

   $scope.getListofUsers();

    $scope.test = 'this test is working';

    //submit Form for adding a new user

    $scope.submitForm = function() {
      mainService.addNewUser($scope.gameMobtest_user, function(data) {
      })
        $scope.getListofUsers();
   };


    //get list of gaming sessions
   $scope.test_sessions = [];
   $scope.getListofsessions = function() {
      mainService.getListofsessions().then(function(data) {
         $scope.test_sessions = data.data;
          $scope.myData = data.data;
      })
   };

   $scope.getListofsessions();

    //add a gaming session
    $scope.submitSession = function() {
      mainService.addNewSession($scope.test_session, function(data) {
          console.log("i'm here");
          //$scope.test_session.createdBy = $scope.selectedUser.user_id;

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
            var name = $scope.name || $scope.selectedUser.user_id;

            //ADD TO FIREBASE
            $scope.messages.$add({
                from: name,
                body: $scope.msg
            });

            //RESET MESSAGE
            $scope.msg = "";
        }
    }




    //ref.authWithPassword({
    //    email    : "turboPants@yahoo.com",
    //    password : "turbopants"
    //}, function(error, authData) {
    //    if (error) {
    //        console.log("Login Failed!", error);
    //    } else {
    //        console.log("Authenticated successfully with payload:", authData);
    //    }
    //});
});