app.controller('HomeController', ['$scope', function ($scope) {

    $scope.dimensions = {
        widthFeet: "",
        widthInches: 0,
        depthFeet: "",
        depthInches: 0
    }

    $scope.pattern = {};
    $scope.patternType = [
        { id: 1, name: "Traditional", value: 1.10 },
        { id: 2, name: "Diagonal", value: 1.20 }
    ];
    $scope.patternType.selected = {};

    $scope.groutThickness = {};
    $scope.grout = [
        { id: 1, name: "1/4 inch", value: .063 },
        { id: 2, name: "1/8 inch", value: .016 },
        { id: 3, name: "1/16 inch", value: .0040 }
    ];
    $scope.groutThickness.selected = {};

    $scope.tileSize = {};
    $scope.tile = [
       { id: 1, name: '12x12', value: 144 },
       { id: 2, name: '18x18', value: 324 },
       { id: 3, name: '24x24', value: 576 },
       { id: 4, name: '10x16', value: 160 },
       { id: 5, name: '10x20', value: 200 },
       { id: 6, name: '12x24', value: 288 },
    ];
    $scope.tileSize.selected = {};

    $scope.roomArea = function () {
        var width = ($scope.dimensions.widthFeet * 12) + ($scope.dimensions.widthInches);
        var depth = (($scope.dimensions.depthFeet * 12) + $scope.dimensions.depthInches);
        $scope.result = ((width * depth) / (144 - $scope.groutThickness.selected.value)) * $scope.patternType.selected.value;
        $scope.numTiles = ((width * depth) / ($scope.tileSize.selected.value - $scope.groutThickness.selected.value)) * $scope.patternType.selected.value;

        $scope.dimensions = {
            widthFeet: "",
            widthInches: 0,
            depthFeet: "",
            depthInches: 0
        }
        $scope.tileSize = {};
        $scope.groutThickness = {};
        $scope.pattern = {};
    }
}])