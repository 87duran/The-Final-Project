var app = angular.module('GameMob');

app.service('mainService', function($http) {
    this.getListofUsers = function() {
        return $http({
            method: 'GET',
            url: '//localhost:5000/users'
        })
    }

    this.addNewUser = function(gameMobtest_user, callback) {
        console.log('new user function')
        return $http.post('//localhost:5000/users', {gameMobtest_user: gameMobtest_user})
        .success(function(data, status, headers, config){
            console.log(data);
            callback(data);
        })
            .error(function(data, status, headers, config) {
                console.log(status);
            })
    }

    this.getListofsessions = function() {
        return $http({
            method: 'GET',
            url: 'http://localhost:5000/sessions'
        })
    }

    this.addNewSession = function(test_session, callback) {
        console.log('new session function');
        return $http.post('http://localhost:5000/sessions', {test_session: test_session})
            .success(function(data, status, headers, config){
                console.log(data);
                callback(data);
            })
            .error(function(data, status, headers, config) {
                console.log(status);
            })
    }

})