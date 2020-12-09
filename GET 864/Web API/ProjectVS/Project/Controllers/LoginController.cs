using Project.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Cryptography;
using System.Text;
using System.Web.Http;

namespace Project.Controllers
{
    public class LoginController : ApiController
    {
        FinanceEntities db = new FinanceEntities();
        [Route("api/login")]
        [HttpPost]
        public HttpResponseMessage PostLogin(string usrname, string password)
        {
            bool Exists = false;
            User u = new User();
            List<User> users = db.Users.ToList();
            foreach (var item in users)
            {
                if (item.Username == usrname)
                {
                    Exists = true;
                    u = item;
                    break;
                }
            }
            if (Exists)
            {
                if (u.Password == password)
                {
                    return Request.CreateResponse(HttpStatusCode.OK, "Success");
                }
                else
                {
                    return Request.CreateResponse(HttpStatusCode.OK, "Wrong Password");
                }
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.OK, "Invalid User");
            }

        }

        
    }
}
