using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using AlarmClock.DAL;
using AlarmClock.Models;
using Microsoft.AspNet.Identity;

namespace AlarmClock.Controllers
{
    public class SettingsController : ApiController
    {
        private AlarmClockEntities db = new AlarmClockEntities();

        // GET: api/Settings
     

        // GET: api/Settings/5
        [ResponseType(typeof(ClockSettings))]
        public IHttpActionResult GetClockSettings()
        {
         //   db.Configuration.ProxyCreationEnabled = false;
            string uid = User.Identity.GetUserId();
            ClockSettings clockSettings = db.ClockSettings.SingleOrDefault(z=>z.UserId==uid);
            if (clockSettings == null)
            {
           var cs=new ClockSettings {  UserId = uid };
                db.ClockSettings.Add(cs);
                db.SaveChanges();

            }

            return Ok(db.ClockSettings.SingleOrDefault(z => z.UserId == uid));
        }

        // PUT: api/Settings
        [ResponseType(typeof(void))]
        public IHttpActionResult PutClockSettings(ClockSettings clockSettings)
        {
          
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            clockSettings.UserId =  User.Identity.GetUserId();
            clockSettings.ScheduleId = clockSettings.Schedule.Id;

            db.Entry(clockSettings).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
              
                    throw;
                
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        
        
        // DELETE: api/Settings/5
        [ResponseType(typeof(ClockSettings))]
        public IHttpActionResult DeleteClockSettings(long id)
        {
            ClockSettings clockSettings = db.ClockSettings.Find(id);
            if (clockSettings == null)
            {
                return NotFound();
            }

            db.ClockSettings.Remove(clockSettings);
            db.SaveChanges();

            return Ok(clockSettings);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ClockSettingsExists(long id)
        {
            return db.ClockSettings.Count(e => e.Id == id) > 0;
        }
    }
}