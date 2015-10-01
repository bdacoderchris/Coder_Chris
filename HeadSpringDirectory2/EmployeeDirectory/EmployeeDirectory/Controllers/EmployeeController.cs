using EmployeeDirectory.App_Services.Adapters;
using EmployeeDirectory.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Routing;
using Microsoft.AspNet.Identity;
using System.Web.Mvc;
using System.Web;
using EmployeeDirectory.ViewModels;

namespace EmployeeDirectory.Controllers
{
    public class EmployeeController: ApiController
    {
        IEmployee _employee;

        public EmployeeController()
        {
            _employee = new EmployeeDataAdapter();
        }

        public EmployeeController(IEmployee employ)
        {
            _employee = employ;
        }
        [System.Web.Http.HttpGet]
        public IHttpActionResult GetJobTitles()
        {
            var vm = _employee.GetJobTitles();
            return Ok(vm);
        }
        [System.Web.Http.HttpGet]
        public IHttpActionResult GetEmployees()
        {
            var vm = _employee.GetEmployees();
            return Ok(vm);
        }
        [System.Web.Http.HttpGet]
        public IHttpActionResult DeleteEmployee(int id)
        {
            _employee.DeleteEmployee(id);
            return Ok();
        }
        [System.Web.Http.HttpPost]
        public IHttpActionResult UpdateEmployee(EmployeeViewModel model)
        {
            _employee.UpdateEmployee(model);
            return Ok();
        }
        [System.Web.Http.HttpPost]
        public IHttpActionResult CreateEmployee(EmployeeViewModel model)
        {
            _employee.CreateEmployee(model);
            return Ok();
        }
    }
}