﻿app.factory('EmployeeFactory',['$http', '$q', function ($http, $q) {
    var directory = [];
    var currEmployee;
    var url = "https://headspring.firebaseio.com/directory.json";
    var customUrl = 'https://headspring.firebaseio.com/directory/' + currEmployee + '/.json';

    //General Function to return list of Employees
    var getEmployees = function () {
        return directory;
    }

    //Function to add Employees from Firebase into local Array
    var addEmployees = function (data) {
        directory.push(data);
    }

    //Function to add a new employee record
    var addNewEmployee = function (employee) {
        var def = $q.defer();
        $http({
            url: url,
            method: 'POST',
            data: employee
        }).success(function (data) {
            directory.push(employee);
            def.resolve(data);
        }).error(function (data) {
            console.log(data);
            def.reject();
        })
        return def.promise;
    }
    
    //var addNewEmployee = function () {
    //    $scope.directory.push(new $scope.Employee($scope.employeeName, $scope.employeeJobTitle, $scope.employeeLocation, $scope.employeeEmail, $scope.employeeNumber))
    //}

    //Display full Employee Directory
    var showEmployees = function (data) {
        $http.get(url).success(function (data) {
            if (directory.length > 0) {
                directory = [];
            }
            for (var i in data) {
                data[i].id = i;
                addEmployees(data[i]);
                getEmployees();
            }
        })
    }

    //Function to find which employee is being edited
    var editClick = function (val) {
        currEmployee = directory[val];

        for (var i in directory) {
            if(currEmployee.id = directory[i].id){
                return directory[i];
            }
        };
    }

    //Function to update employee record
    var editEmployee = function (val) {
        currEmployee = directory[val].id;

        var def = $q.defer();
        $http.put(customUrl, directory[val])
        .success(function (data) {
            console.log(directory);
            def.resolve();
        }).error(function () {
            console.log("Error")
            def.reject();
        })
        return def.promise;
    }

    //Function to delete an employee record
    var deleteEmployee = function (val) {
        currEmployee = directory[val].id;
        //var currEmployeeId = currEmployee.id;

        var def = $q.defer();
        $http.delete(customUrl).success(function () {
            directory.splice(val, 1);
            console.log(currEmployee);
        })
    }

    return {
        getEmployees: getEmployees,
        addEmployees: addEmployees,
        showEmployees: showEmployees,
        editClick: editClick,
        editEmployee: editEmployee,
        deleteEmployee: deleteEmployee,
        addNewEmployee: addNewEmployee
    }
}])
