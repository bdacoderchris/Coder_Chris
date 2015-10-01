using EmployeeDirectory.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EmployeeDirectory.Models
{
    public class IndexViewModel
    {
        public List<Employee> Employees { get; set; }
        public List<JobTitle> JobTitles { get; set; }
    }
}