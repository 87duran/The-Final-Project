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

    $scope.mytime = new Date();

    $scope.hstep = 1;
    $scope.mstep = 1;



    $scope.ismeridian = true;
    $scope.toggleMode = function() {
        $scope.ismeridian = ! $scope.ismeridian;
    };

    $scope.update = function() {
        var d = new Date();
        d.setHours( 14 );
        d.setMinutes( 0 );
        $scope.test_session.time = d;
        return d;
    };

    $scope.changed = function () {
        console.log('Time changed to: ' + $scope.test_session.time);
    };

    $scope.clear = function() {
        $scope.test_session.time = null;
    };

    $scope.test_session.date = $scope.d;

    //add a gaming session
    $scope.submitSession = function() {
        mainService.addNewSession($scope.test_session, function(data) {
            console.log("i'm here");
            //$scope.test_session.createdBy = $scope.selectedUser.user_id;

        })
    };


});