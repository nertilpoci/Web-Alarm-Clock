using AlarmClock.DAL;
using AlarmClock.Models;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;

namespace AlarmClock.Controllers
{
  
    public class HomeController : Controller
    {
      
        public ActionResult Index()
        {
           
            return View();
        }
    }
}
