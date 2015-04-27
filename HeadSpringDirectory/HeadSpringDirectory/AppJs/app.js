/// <reference path="c:\users\christopher\documents\visual studio 2013\Projects\HeadSpringDirectory\HeadSpringDirectory\index.html" />
/// <reference path="Views/home.html" />
var app = angular.module('app', ['ngRoute', 'firebase']);

app.config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider){
    $routeProvider
    .when('/home',{
        templateUrl: 'AppJs/Views/home.html',
        controller: 'HomeController'
    })
    .when('/directory',{
        templateUrl: 'AppJs/Views/directory.html',
        controller: 'HomeController'
    })
    .otherwise({
        redirectTo: '/home'
    });
}]);