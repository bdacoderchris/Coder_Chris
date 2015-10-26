app.controller('HomeController', ['$scope', function ($scope) {
    $scope.dimensions = {
        widthFeet: "",
        widthInches: "",
        depthFeet: "",
        depthInches: ""
    }
    $scope.tileSize = {};
    $scope.tile = [
       { id: 1, name: '12x12', value: 144 },
       { id: 2, name: '18x18', value: 324 },
       { id: 3, name: '24x24', value: 576 }
    ];
    $scope.tileSize.selected = {};

    $scope.roomArea = function () {
        var width = ($scope.dimensions.widthFeet * 12) + ($scope.dimensions.widthInches);
        var depth = (($scope.dimensions.depthFeet * 12) + $scope.dimensions.depthInches);
        $scope.result = ((width * depth) / $scope.tileSize.selected.value) * 1.10;
        console.log($scope.tileSize.selected.value);
    }
}])