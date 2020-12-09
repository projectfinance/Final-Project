using Project.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Web.Http.Description;

namespace Project.Controllers
{
    public class DashboardController : ApiController
    {
        private readonly FinanceEntities db = new FinanceEntities();

        [Route("EMICard/{name}")]
        [HttpGet]
        public IHttpActionResult GetCardByName(string name)
        {
            var card = (from user_ob in db.Users
                        join card_ob in db.CardDetails
                        on user_ob.CustomerID equals card_ob.CustomerID
                        where user_ob.Username == name
                        select new
                        {
                            CustomerID = user_ob.CustomerID,
                            Firstname = user_ob.Firstname,
                            LastName = user_ob.LastName,
                            CardID = card_ob.CardID,
                            Validity = card_ob.Validity,
                            CardType = card_ob.CardType,
                            ActivationStatus = card_ob.ActivationStatus,
                            TotalCredit = card_ob.TotalCredit,
                            RemainingCredit = card_ob.RemainingCredit,
                            EMIPendingStatus = card_ob.EMIPendingStatus
                        }).ToList();

            if (card == null)
                return NotFound();

            return Ok(card);
            
        }

        [Route("Purchase")]
        public IHttpActionResult GetPurchase()
        {
            var purchase = (from purch_ob in db.PurchaseDetails 
                            join prod_obj in db.Products
                            on purch_ob.ProductID equals prod_obj.ProductID
                            select new
                            {
                                CustomerID=purch_ob.CustomerID,
                                ProductName = prod_obj.ProductName,
                                Amount = prod_obj.Amount,
                                PurchaseID=purch_ob.PurchaseID,
                                PurchaseDate=purch_ob.PurchaseDate,
                                EmiScheme=purch_ob.EmiScheme,
                                EmiPerMonth=purch_ob.EmiPerMonth,
                                EmiLeft=purch_ob.EmiLeft,
                                EmiPaid = purch_ob.EmiPaid
                            }).ToList();

            if (purchase == null)
                return NotFound();

            return Ok(purchase);
        }

        [Route("Admin")]
        [HttpGet]
        public IHttpActionResult GetAdmin()
        {
            var admin = (from bank_ob in db.BankDetails
                         join user_ob in db.Users
                         on bank_ob.AccountNumber equals user_ob.AccountNumber
                         join card_ob in db.CardDetails
                         on user_ob.CustomerID equals card_ob.CustomerID
                         select new {
                             CustomerID = user_ob.CustomerID,
                             AccountNumber = user_ob.AccountNumber,
                             Firstname = user_ob.Firstname,
                             LastName = user_ob.LastName,
                             Phoneno = user_ob.Phoneno,
                             EmailID = user_ob.EmailID,
                             Address = user_ob.Address,
                             BankName=bank_ob.BankName,
                             BankIFSC=bank_ob.BankIFSC,
                             ActivationStatus = card_ob.ActivationStatus}).ToList();

            if (admin == null)
                return NotFound();

            return Ok(admin);
        }

        [Route("Activate/{id}")]
        [HttpPut]
        public IHttpActionResult PutCardStatus(int id,[FromBody] CardDetail cardDetail)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != cardDetail.CustomerID)
            {
                return BadRequest();
            }

            db.Entry(cardDetail).State = EntityState.Modified;

            try
            {            
                db.SaveChanges();
            }
            catch(DbUpdateConcurrencyException)
            {
                if (!CardDetailExists(id))
                    return NotFound();
                else
                    throw;
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        [Route("Card/{id}")]
        [HttpGet]
        public IHttpActionResult GetCardById(int id)
        {
            CardDetail cd = db.CardDetails.First(idx => idx.CustomerID == id);

            if (cd == null)
                return NotFound();

            return Ok(cd);
        }

        private bool CardDetailExists(int id)
        {
            return db.CardDetails.Count(e => e.CustomerID == id) > 0;
        }

    }
}


