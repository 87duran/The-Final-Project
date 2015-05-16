var app = angular.module('GameMob');

app.controller('DateController', function ($scope, mainService) {
    $scope.test_session = {};
    $scope.today = function() {
        $scope.dt = new Date();
    };
    $scope.today();


    $scope.toggleMin = function() {
        $scope.minDate = $scope.minDate ? null : new Date();
    };
    $scope.toggleMin();

    $scope.open = function($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $scope.opened = true;
    };

    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
    };


    $scope.getDayClass = function(date, mode) {
        if (mode === 'day') {
            var dayToCheck = new Date(date).setHours(0,0,0,0);

            for (var i=0;i<$scope.events.length;i++){
                var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

                if (dayToCheck === currentDay) {
                    return $scope.events[i].status;
                }
            }
        }

        return '';
    };

    $scope.test_session.date = $scope.dt;
    //add a gaming session
    $scope.submitSession = function() {
        mainService.addNewSession($scope.test_session, function(data) {
            console.log("i'm here");
            //$scope.test_session.createdBy = $scope.selectedUser.user_id;

        })
    };
});