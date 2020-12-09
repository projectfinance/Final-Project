using FinanceTest.Models;
using Project.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Project.Controllers
{
    public class PurchaseController : ApiController
    {
        [HttpPost]
        [Route("purchaseproduct")]
        public void Post([FromBody] Purchase pur)
        {
            FinanceEntities db = new FinanceEntities();
            PurchaseDetail p = new PurchaseDetail();
        
            p.ProductID = pur.id;
            p.CardID = (from c in db.CardDetails
                        join u in db.Users
                        on c.CustomerID equals u.CustomerID
                        where u.Username == pur.username
                        select c.CardID).FirstOrDefault();
            p.PurchaseDate = DateTime.Now;
            p.CustomerID = (from u in db.Users where u.Username == pur.username select u.CustomerID).FirstOrDefault();
            p.EmiScheme = pur.scheme;
            p.EmiPerMonth = pur.amount / pur.scheme;
            p.EmiPaid = 0;
            p.EmiLeft = pur.amount;
            p.PaidForMonth = "NO";
            db.PurchaseDetails.Add(p);
            db.SaveChanges();

            CardDetail query = (from c in db.CardDetails
                                where c.CustomerID == p.CustomerID
                                select c).FirstOrDefault();

            query.RemainingCredit = query.RemainingCredit - pur.amount;
            db.Entry(query).State = System.Data.Entity.EntityState.Modified;

            db.SaveChanges();
        }
    }
}
