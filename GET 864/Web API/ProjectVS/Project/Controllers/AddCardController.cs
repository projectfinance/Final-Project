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
    public class AddCardController : ApiController
    {
        [HttpPost]
        [Route("addcard")]
        public void Post([FromBody] Cardadd cu)
        {
            FinanceEntities db = new FinanceEntities();
            CardDetail c = new CardDetail();
            int custid = (from u in db.Users
                          where u.Username == cu.Username
                          select u.CustomerID).FirstOrDefault();
            var entry = (from cd in db.CardDetails
                         where cd.CustomerID == custid
                         select cd);
            foreach (var item in entry)
            {
                //item.RemainingCredit = item.TotalCredit - cu.RemainingCredit;
                item.EMIPendingStatus = true;
            }
            db.SaveChanges();
        }
    }
}
