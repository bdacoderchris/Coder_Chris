app.controller('HomeController', ['$scope', function ($scope) {
    $scope.widthFeet;
    $scope.depthFeet;
    $scope.widthInches;
    $scope.depthInches;
    

    $scope.roomArea = function () {
        var width = ($scope.widthFeet * 12) + $scope.widthInches;
        var depth = ($scope.depthFeet * 12) + $scope.depthInches;
        $scope.result = width * depth;
        console.log($scope.result);
    }
}])