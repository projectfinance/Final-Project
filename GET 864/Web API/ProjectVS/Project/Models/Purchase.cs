using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FinanceTest.Models
{
    public class Purchase
    {
        public int id { get; set; }
        public int amount { get; set; }
        public int scheme { get; set; }
        public string username { get; set; }
        
    }
}