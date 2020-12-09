using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Twilio;
using Twilio.Rest.Api.V2010.Account;
using Twilio.Types;
using FinanceTest.Models;
using Project.Models;
using Finance.Models;
using System.Text;
using System.Security.Cryptography;

namespace Project.Controllers
{
    public class ForgotPasswordController : ApiController
    {
        static int otp; //static, because otp will be set in Post() and will be fetched in GetOtpSession()

        [HttpPost]
        public void Post([FromBody] PhoneNum ph)
        {
            FinanceEntities db = new FinanceEntities();

            otp = 0; //reset otp

            string phonexists = (from a in db.Users where a.Phoneno == ph.phone select a.Phoneno).FirstOrDefault();

            if (phonexists != null)
            {
                try
                {
                    int otpValue = new Random().Next(100000, 999999);
                    otp = otpValue;

                    var accountSid = "AC61e058d33da3516c9a3e62538516a21c"; //SID
                    var authToken = ""; //Auth Token
                    TwilioClient.Init(accountSid, authToken);

                    var to = new PhoneNumber("+91" + ph.phone);
                    var from = new PhoneNumber("+12054092684"); //Twilio Phone number
                    var message = MessageResource.Create(
                        to: to,
                        from: from,
                        body: "Finance Management System \n Your OTP for Password Reset is " + otpValue + ".");
                }
                catch
                {
                    //Twilio exceptions like phone not registered or no internet
                }
            }
        }

        [Route("getotpsession")]
        public IHttpActionResult GetOTPSession()
        {
            OTPClass otp_curr = new OTPClass();
            otp_curr.current_otp = otp.ToString();
            return Ok(otp_curr);
        }

        [HttpPost]
        [Route("checkphoneexists")]
        public void PostChangePassword([FromBody] ChangePass cp) //Post to check if phone number exists in database
        {
            FinanceEntities db = new FinanceEntities();

            var query = (from x in db.Users where x.Phoneno == cp.phone select x).FirstOrDefault();
            query.Password = cp.password;
            db.SaveChanges();
        }

    }
}
