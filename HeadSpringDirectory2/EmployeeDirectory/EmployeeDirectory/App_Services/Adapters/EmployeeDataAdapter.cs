using EmployeeDirectory.Data;
using EmployeeDirectory.Data.Models;
using EmployeeDirectory.Models;
using EmployeeDirectory.ViewModels;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace EmployeeDirectory.App_Services.Adapters
{
    public class EmployeeDataAdapter : IEmployee
    {
        public IndexViewModel GetJobTitles()
        {
            IndexViewModel vm = new IndexViewModel();
            List<JobTitle> JobTitles = new List<JobTitle>();

            using (var conn = new SqlConnection(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString()))
            {
                SqlCommand cmd = conn.CreateCommand();
                cmd.CommandText = "Select JobTitle From [dbo].[Employee]";
                cmd.CommandTimeout = 120;
                cmd.CommandType = System.Data.CommandType.Text;
                conn.Open();
                SqlDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    JobTitle jobTitles = new JobTitle();
                    jobTitles.Jobtitle = reader.GetString(0);
                    JobTitles.Add(jobTitles);
                }

                List<JobTitle> distinct = JobTitles.Distinct().ToList();
                vm.JobTitles = distinct;
                return vm;
            }
        }

        public IndexViewModel GetEmployees()
        {
            IndexViewModel vm = new IndexViewModel();
            List<Employee> Employees = new List<Employee>();

            using (var conn = new SqlConnection(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString()))
            {
                SqlCommand cmd = conn.CreateCommand();
                cmd.CommandText = "Select * From [dbo].[Employee]";
                cmd.CommandTimeout = 120;
                cmd.CommandType = System.Data.CommandType.Text;
                conn.Open();
                SqlDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    Employee employees = new Employee();
                    employees.Id = reader.GetInt32(0);
                    employees.FirstName = reader.GetString(1);
                    employees.LastName = reader.GetString(2);
                    employees.JobTitle = reader.GetString(3);
                    employees.Location = reader.GetString(4);
                    employees.Email = reader.GetString(5);
                    employees.PhoneNumber = reader.GetString(6);
                    Employees.Add(employees);
                }
                vm.Employees = Employees.ToList();
                return vm;
            }

        }


        public void UpdateEmployee(EmployeeViewModel model)
        {

            using (var conn = new SqlConnection(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString()))
            {
                try
                {
                    SqlCommand cmd = conn.CreateCommand();
                    cmd.CommandText = "Update [dbo].[Employee] Set FirstName=@FirstName, LastName=@LastName, JobTitle=@JobTitle, Location=@Location, Email=@Email, PhoneNumber=@PhoneNumber Where Id=@Id";
                    cmd.CommandTimeout = 120;
                    cmd.CommandType = System.Data.CommandType.Text;
                    conn.Open();

                    cmd.Parameters.AddWithValue("@Id", model.Id);
                    cmd.Parameters.AddWithValue("@FirstName", model.FirstName);
                    cmd.Parameters.AddWithValue("@LastName", model.LastName);
                    cmd.Parameters.AddWithValue("@JobTitle", model.JobTitle);
                    cmd.Parameters.AddWithValue("@Location", model.Location);
                    cmd.Parameters.AddWithValue("@Email", model.Email);
                    cmd.Parameters.AddWithValue("@PhoneNumber", model.PhoneNumber);

                    cmd.ExecuteNonQuery();
                }
                catch (SqlException ex)
                {
                    DisplaySqlErrors(ex);
                }
            }
        }

        public void DeleteEmployee(int id)
        {
            using (var conn = new SqlConnection(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString()))
            {
                try
                {
                    SqlCommand cmd = conn.CreateCommand();
                    cmd.CommandText = "Delete From [dbo].[Employee] Where Id=@Id";
                    cmd.CommandTimeout = 120;
                    cmd.CommandType = System.Data.CommandType.Text;
                    conn.Open();

                    cmd.Parameters.AddWithValue("@Id", id);

                    cmd.ExecuteNonQuery();
                }
                catch(SqlException ex)
                {
                    DisplaySqlErrors(ex);
                }
            }
        }

        public void CreateEmployee(EmployeeViewModel model)
        {
            using (var conn = new SqlConnection(ConfigurationManager.ConnectionStrings["DefaultConnection"].ToString()))
            {
                try
                {
                    SqlCommand cmd = conn.CreateCommand();
                    cmd.CommandText = "Insert Into [dbo].[Employee] ([FirstName], [LastName], [JobTitle], [Location], [Email], [PhoneNumber]) Values (@FirstName, @LastName, @JobTitle, @Location, @Email, @PhoneNumber)";
                    cmd.CommandTimeout = 120;
                    cmd.CommandType = System.Data.CommandType.Text;
                    conn.Open();

                    //cmd.Parameters.AddWithValue("@Id", model.Id);
                    cmd.Parameters.AddWithValue("@FirstName", model.FirstName);
                    cmd.Parameters.AddWithValue("@LastName", model.LastName);
                    cmd.Parameters.AddWithValue("@JobTitle", model.JobTitle);
                    cmd.Parameters.AddWithValue("@Location", model.Location);
                    cmd.Parameters.AddWithValue("@Email", model.Email);
                    cmd.Parameters.AddWithValue("@PhoneNumber", model.PhoneNumber);

                    cmd.ExecuteNonQuery();
                }
                catch(SqlException ex)
                {
                    DisplaySqlErrors(ex);
                }
            }
        }

        private static void DisplaySqlErrors(SqlException exception)
        {
            for (int i = 0; i < exception.Errors.Count; i++)
            {
                Console.WriteLine("Index #" + i + "\n" +
                    "Error: " + exception.Errors[i].ToString() + "\n");
            }
            Console.ReadLine();
        }
    }
}