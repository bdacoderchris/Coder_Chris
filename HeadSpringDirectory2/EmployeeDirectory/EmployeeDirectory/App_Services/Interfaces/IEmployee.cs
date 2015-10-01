using EmployeeDirectory.Models;
using EmployeeDirectory.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeDirectory
{
    public interface IEmployee
    {
        IndexViewModel GetJobTitles();
        IndexViewModel GetEmployees();
        void CreateEmployee(EmployeeViewModel model);
        void UpdateEmployee(EmployeeViewModel model);
        void DeleteEmployee(int id);
    }
}
