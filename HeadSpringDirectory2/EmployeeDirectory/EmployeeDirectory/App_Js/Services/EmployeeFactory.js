app.factory('EmployeeFactory', ['AJAXFactory', '$http', '$q', '_', function (AJAXFactory, $http, $q, _) {
    var directory = [];
    var currEmployee;

    var getEmployees = function (data) {
        directory = data
    }

    var updateClick = function (val) {
        currEmployee = directory.Employees[val];
        var findEmployee = _.find(directory.Employees, function (val) {
            return (currEmployee.Id == val.Id);
        })
        return findEmployee;
    };

    //var updateEmployee = function (val) {
    //    debugger;
    //    AJAXFactory.post('api/Employee/UpdateEmployee', {
    //    }).then(function (data) {
    //        getEmployees(data);
    //    });
    //}

    return {
        getEmployees: getEmployees,
        updateClick: updateClick,
        //updateEmployee: updateEmployee
    }
}])