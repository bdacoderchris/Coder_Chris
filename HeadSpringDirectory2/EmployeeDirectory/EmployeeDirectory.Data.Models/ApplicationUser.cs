using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;

namespace EmployeeDirectory.Data.Models
{
        public class ApplicationUser : IdentityUser
        {
            [Required]
            public string Email { get; set; }
            [Required]
            public string Password { get; set; }
            public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<ApplicationUser> manager, string authenticationType)
            {
                // Note the authenticationType must match the one defined in CookieAuthenticationOptions.AuthenticationType
                var userIdentity = await manager.CreateIdentityAsync(this, authenticationType);
                // Add custom user claims here

                return userIdentity;
            }
        }
}