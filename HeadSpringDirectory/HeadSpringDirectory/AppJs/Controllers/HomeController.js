app.controller('HomeController', ['$scope', '$firebase', 'LoginFactory', '$location', 'EmployeeFactory', '$http',
    function ($scope, $firebase, LoginFactory, $location, EmployeeFactory, $http) {
        $scope.user = {
            email: '', password: ''
        }
        $scope.directory = EmployeeFactory.getEmployees();
        $scope.value;

        $scope.employee = function (name, jobTitle, location, email, phone) {
            this.name = name;
            this.jobTitle = jobTitle;
            this.location = location;
            this.email = email;
            this.phone = phone;
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
            $location.path('/directory');
            (function (user) {

            }, function (error) {
                $scope.message = error.toString();
            });
        }

        $scope.logout = function () {
            LoginFactory.logout();
        }

        //Function to add a new Employee to the directory
        $scope.addNewEmployee = function () {
            $scope.newEmployee = new $scope.employee($scope.employeeName, $scope.employeeJobTitle, $scope.employeeLocation, $scope.employeeEmail, $scope.employeeNumber);
            EmployeeFactory.addNewEmployee($scope.newEmployee).then(function (data) {
                console.log(data);
                $scope.directory = EmployeeFactory.getEmployees();
                console.log($scope.directory);
            })
            $scope.employeeName = "";
            $scope.employeeJobTitle = "";
            $scope.employeeLocation = "";
            $scope.employeeEmail = "";
            $scope.employeeNumber = "";
            $scope.showEmployees();
        }


        //Function to add Employees from Firebase to local Array
        $scope.populateDirectory = function () {
            $http.get("https://headspring.firebaseio.com/directory.json")
            .success(function (data) {
                for (var i in data) {
                    EmployeeFactory.addEmployees[i];
                    //console.log(data);
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
                //console.log(data);
            }).error(function (data) {
                alert(data);
            })
        }

        //Front end function to find correct Employee when HR Rep clicks edit
        $scope.editClick = function (val) {
            $scope.test = val;
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
            $scope.editConfirm = EmployeeFactory.editEmployee(val)
            .then(function () {
                console.log("From HomeController", EmployeeFactory.getEmployees());
                $scope.employeeArray = EmployeeFactory.getEmployees();
            })
        }

        //Front end function to find the Employee record and delete it
        $scope.deleteEmployee = function (val) {
            $scope.deleteConfirm = EmployeeFactory.deleteEmployee(val)
            $scope.directory.splice(val, 1);
            $scope.employeeArray = EmployeeFactory.getEmployees();
        }
        $scope.populateDirectory();
        $scope.showEmployees();
        //console.log($scope.employeeArray);
    }])