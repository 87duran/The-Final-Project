var app = angular.module('GameMob');

app.controller('TimeController', function ($scope, $log) {
    //$scope.mytime = new Date();

    $scope.hstep = 1;
    $scope.mstep = 15;



    $scope.ismeridian = true;
    $scope.toggleMode = function() {
        $scope.ismeridian = ! $scope.ismeridian;
    };

    $scope.update = function() {
        var d = new Date();
        d.setHours( 14 );
        d.setMinutes( 0 );
        $scope.mytime = d;
    };

    $scope.changed = function () {
        $log.log('Time changed to: ' + $scope.test_session.time);
    };

    //$scope.clear = function() {
    //    $scope.test_session.time = null;
    //};
});