var app = angular.module('app', ['ngRoute'])
app.service('_', ['$window', function ($window) {
    return $window._;
}]);

app.value("canEdit", window.MyVariableFromViewBag);

app.config(['$routeProvider', '$httpProvider', '$locationProvider', function ($routeProvider, $httpProvider, $locationProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'App_Js/Views/Home.html',
        controller: 'HomeController'
    })
    .otherwise({ redirectTo: '/' })

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
}]);