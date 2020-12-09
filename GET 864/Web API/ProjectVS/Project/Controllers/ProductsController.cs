using Project.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Project.Controllers
{
    public class ProductsController : ApiController
    {
        FinanceEntities db = new FinanceEntities();

        [Route("getproducts/{username}")]
        public HttpResponseMessage Get(string username)
        {
            FinanceEntities db = new FinanceEntities();
            int Custid = (from u in db.Users
                          where u.Username == username
                          select u.CustomerID).FirstOrDefault();
            Nullable<int> remaining = (from c in db.CardDetails
                                       where c.CustomerID == Custid
                                       select c.RemainingCredit).FirstOrDefault();
            var prod = db.Products.ToList();
            List<Product> l1 = new List<Product>();
            foreach (var item in prod)
            {
                if (item.ProcessingFee + item.Amount < remaining)
                {
                    l1.Add(item);
                }
            }
            if (l1.Count > 0)
            {
                return Request.CreateResponse(HttpStatusCode.OK, l1);
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, "No Products found");
            }
        }
    }
}
