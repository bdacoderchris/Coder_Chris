app.controller('HomeController', ['$scope', '$firebase', 'LoginFactory', '$location', 'EmployeeFactory', '$http',
    function ($scope, $firebase, LoginFactory, $location, EmployeeFactory, $http) {
    $scope.user = {
        email: '', password: ''
    }
    $scope.employees;
    $scope.employeeArray = EmployeeFactory.getEmployees();
    EmployeeFactory.showEmployees();

    //Front end login function triggered by user click
    $scope.login = function () {
        $scope.user.email = $scope.email;
        $scope.user.password = $scope.password;
        console.log($scope.user);
        LoginFactory.login($scope.user);
        (function (user) {
            $location.path('/directory');
        }, function (error) {
            $scope.message = error.toString();
        });
    }

    //Function to add Employees from Firebase to local Array
    $scope.populateDirectory = function () {
        $http.get("https://headspring.firebaseio.com/directory.json")
        .success(function (data) {
            for (var i in data) {
                EmployeeFactory.addEmployees[i];
                console.log(data);
            }
        })
    }

    //Function to display list of Employees in Directory
    $scope.showEmployees = function () {
        $http({
            url: "https://headspring.firebaseio.com/directory.json",
            method: "GET"
        }).success(function (data) {
            $scope.employees = EmployeeFactory.getEmployees;
        }).error(function (data) {
            alert(data);
        })
    }

    //Front end function to find correct Employee when HR Rep clicks edit
    $scope.editClick = function (val) {
        $scope.employeeObj = EmployeeFactory.editClick(val);
        $scope.modelName = $scope.employeeObj.name;
        $scope.modelJobTitle = $scope.employeeObj.jobTitle;
        $scope.modelLocation = $scope.employeeObj.location;
        $scope.modelPhone = $scope.employeeObj.phone;
        $scope.modelEmail = $scope.employeeObj.email;
        console.log($scope.employeeObj);
    }

    //Front end function to execute edit to change employee record
    $scope.editEmployee = function (val) {
        $scope.employeeObj.name = $scope.modelName;
        $scope.employeeObj.jobTitle = $scope.modelJobTitle;
        $scope.employeeObj.location = $scope.modelLocation;
        $scope.employeeObj.phone = $scope.modelPhone;
        $scope.employeeObj.email = $scope.modelEmail;
        $scope.editConfirm = EmployeeFactory.editConfirm(val)
        .then(function () {
            console.log("From HomeController", EmployeeFactory.getEmployees());
            $scope.employeeArray = EmployeeFactory.getEmployees();
        })
    }

    //Front end function to find the Employee record and delete it
    $scope.deleteEmployee = function (val) {
        $scope.deleteConfirm = EmployeeFactory.deleteEmployee(val);
        $scope.employeeArray = EmployeeFactory.getEmployees();
    }
}])