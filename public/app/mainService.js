var app = angular.module('GameMob');

app.service('mainService', function($http) {
    this.getListofUsers = function() {
        return $http({
            method: 'GET',
            url: 'http://localhost:3000/users'
        })
    }

    this.addNewUser = function(gameMob_user, callback) {
        console.log('new user function')
        return $http.post('http://localhost:3000/users', {gameMob_user: gameMob_user})
        .success(function(data, status, headers, config){
            console.log(data);
            callback(data);
        })
            .error(function(data, status, headers, config) {
                console.log(status);
            })
    }
})