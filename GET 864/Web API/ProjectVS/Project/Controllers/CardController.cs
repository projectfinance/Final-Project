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
    public class CardController : ApiController
    {
        [HttpPost]
        [Route("carddetails")]
        public void Post([FromBody] CardNew cu)
        {

            FinanceEntities db = new FinanceEntities();
            CardDetail c = new CardDetail();
            Random rd = new Random();
            int rno = rd.Next(000000, 999999);
            c.CustomerID = (from a in db.Users where a.Username == cu.Username select a.CustomerID).FirstOrDefault();
            c.CardID = "EMI" + rno;
            c.Validity = cu.Validity;
            c.CardType = cu.CardType;
            c.ActivationStatus = cu.ActivationStatus;
            c.TotalCredit = cu.TotalCredit;
            c.RemainingCredit = cu.RemainingCredit;
            c.EMIPendingStatus = cu.EmiPendingStatus;
            db.CardDetails.Add(c);
            db.SaveChanges();
        }
    }
}
