app.controller('HomeController', ['$scope', 'AJAXFactory', 'EmployeeFactory', '$location', '$controller', '$http', 'canEdit',
    function ($scope, AJAXFactory, EmployeeFactory, $location, $controller, $http, canEdit) {
    $scope.currEmployee;
    $scope.employees = {};
    $scope.jobTitles = {};
    $scope.jobOptions = [
        "Software Engineer",
        "Web Developer",
        "Recruiter",
        "Human Resources",
        "Web Designer"
    ];
    $scope.canEdit = canEdit;
    $scope.clearSearch = function () {
        $scope.query = "";
        $scope.selected_items = "";
    }

    $scope.getEmployees = function () {
        AJAXFactory.get('api/Employee/GetEmployees').then(function (data) {
            $scope.employees = data;
            EmployeeFactory.getEmployees(data);
        });
    }

    $scope.getJobTitles = function () {
        AJAXFactory.get('api/Employee/GetJobTitles').then(function (data) {
            $scope.jobTitles = data;
            console.log(data);
        });
    }

    $scope.createEmployee = function () {
        AJAXFactory.post('api/Employee/CreateEmployee', {
            FirstName: $scope.firstName,
            LastName: $scope.lastName,
            JobTitle: $scope.jobTitle,
            Location: $scope.location,
            Email: $scope.email,
            PhoneNumber: $scope.phoneNumber
        }).then(function (data) {
            $scope.getEmployees();
            $scope.firstName = "";
            $scope.lastName = "";
            $scope.jobTitle = "";
            $scope.location = "";
            $scope.email = "";
            $scope.phoneNumber = "";
        });
        $('.modal').on('addModal', function () {
            $(this).find('form')[0].reset();
        });
    }

    $scope.updateClick = function (val) {
        $scope.currEmployee = EmployeeFactory.updateClick(val);
        $scope.modelId = $scope.currEmployee.Id;
        $scope.modelFirstName = $scope.currEmployee.FirstName;
        $scope.modelLastName = $scope.currEmployee.LastName;
        $scope.modelJobTitle = $scope.currEmployee.JobTitle;
        $scope.modelLocation = $scope.currEmployee.Location;
        $scope.modelEmail = $scope.currEmployee.Email;
        $scope.modelPhone = $scope.currEmployee.PhoneNumber;

    }

    $scope.updateEmployee = function () {
        
        $scope.currEmployee.Id = $scope.modelId;
        $scope.currEmployee.firstName = $scope.modelFirstName;
        $scope.currEmployee.lastName = $scope.modelLastName;
        $scope.currEmployee.jobTitle = $scope.modelJobTitle;
        $scope.currEmployee.location = $scope.modelLocation;
        $scope.currEmployee.email = $scope.modelEmail;
        $scope.currEmployee.phoneNumber = $scope.modelPhone;
        AJAXFactory.post('api/Employee/UpdateEmployee',
            {
                Id: $scope.modelId,
                FirstName: $scope.modelFirstName,
                LastName: $scope.modelLastName,
                JobTitle: $scope.modelJobTitle,
                Location: $scope.modelLocation,
                Email: $scope.modelEmail,
                PhoneNumber: $scope.modelPhone
            })
        .then(function (val) {
            $scope.getEmployees(val);
            $scope.employees = EmployeeFactory.getEmployees(val);
        })
    }

    $scope.deleteEmployee = function (id) {
        AJAXFactory.get('api/Employee/DeleteEmployee/' + id).then(function (id) {
            alert("Employee Deleted");
            delete $scope.employees.id;
            $scope.getEmployees();
        })
    }

    $scope.getEmployees();
    //$scope.getJobTitles();
}])