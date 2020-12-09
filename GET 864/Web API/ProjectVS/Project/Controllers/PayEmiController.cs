using Finance.Models;
using Project.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Project.Controllers
{
    public class PayEmiController : ApiController
    {
        FinanceEntities db = new FinanceEntities();

        [Route("getpurchaserecords/{name}")]
        public HttpResponseMessage Get(string name)
        {
            var query = (from u in db.Users
                         where u.Username == name
                         select u.CustomerID);

            var purdet = (from od in db.PurchaseDetails
                          join pd in db.Products on od.ProductID equals pd.ProductID
                          where od.CustomerID == query.FirstOrDefault()
                          select new
                          {
                              od.PurchaseID,
                              od.PurchaseDate,
                              od.EmiScheme,
                              od.EmiPerMonth,
                              od.EmiPaid,
                              od.EmiLeft,
                              pd.ImagePath,
                              pd.ProductDetails,
                              od.PaidForMonth
                          }).ToList();

            if (purdet.Count > 0)
            {
                return Request.CreateResponse(HttpStatusCode.OK, purdet);
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, "No Products found");
            }
        }

        [HttpPost]
        [Route("payemi")]
        public void Post([FromBody] Pay pay)
        {
            FinanceEntities db = new FinanceEntities();

            var query = (from x in db.PurchaseDetails
                         where x.PurchaseID == pay.pur_id
                         select x).FirstOrDefault();


            var query1 = (from a in db.CardDetails
                          where a.CardID.Equals(query.CardID)
                          select a).FirstOrDefault();

            if (query.EmiLeft > 0)
            {
                query.EmiPaid += query.EmiPerMonth;
                query.EmiLeft -= query.EmiPerMonth;
                query.PaidForMonth = "YES";
                query1.RemainingCredit += Convert.ToInt32(query.EmiPerMonth);
            }


            db.SaveChanges();
        }
    }
}
