var app = angular.module('app', ['ngRoute']);

app.config(['$routeProvider', function($routeProvider){
    $routeProvider
    .when('/home',{
        templateUrl: 'AppJs/Views/home.html'
    })
    .otherwise({
        redirectTo: '/home'
    });
}]);