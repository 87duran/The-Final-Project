var app = angular.module('GameMob');

app.controller('searchController', function($scope, mainService){

    //get list of gaming sessions
    $scope.test_sessions = [];
    $scope.getListofsessions = function() {
        mainService.getListofsessions().then(function(data) {
            $scope.test_sessions = data.data;
            $scope.myData = data.data;
        })
    };

    $scope.getListofsessions();



});