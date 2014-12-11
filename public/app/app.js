var app = angular.module('GameMob', ['ui.router', 'firebase', 'ui.bootstrap']);

app.config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'public/views/home.html',
                controller: 'MainController'
            })
            .state('signUp', {
                url: '/signup',
                templateUrl: 'public/views/signUp.html',
                controller: 'MainController'
            })
            .state('userHome', {
                url: '/userHome',
                templateUrl: 'public/views/userHome.html',
                controller: 'MainController'
            })
            .state('search', {
                url: '/search',
                templateUrl: 'public/views/search.html',
                controller: 'MainController'
            })
            .state('developer', {
                url: '/developer',
                templateUrl: 'public/views/developer.html',
                controller: 'MainController'
            })
});