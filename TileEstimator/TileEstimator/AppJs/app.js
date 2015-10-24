var app = angular.module('app', ['ngRoute']);

app.config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider){
    $routeProvider
    .when('/home',{
        templateUrl: 'AppJs/Views/home.html'
    })
    .otherwise({
        redirectTo: '/home'
    });
}]);