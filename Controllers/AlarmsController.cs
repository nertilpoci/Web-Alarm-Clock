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
using System.Web;

namespace AlarmClock.Controllers
{
   
    public class AlarmsController : ApiController
    {
        private AlarmClockEntities db = new AlarmClockEntities();
      
        // GET: api/Alarms
        public IHttpActionResult GetAlarms(long id)
        {
            string uid = User.Identity.GetUserId();
            db.Configuration.ProxyCreationEnabled = false;
            var schedule = db.Schedules.Find(id);
            if (schedule == null) return NotFound();

            return Ok(db.Alarms.Include("Tone").Where(z=>z.ScheduleId==id && z.UserId==uid));
        }

        //// GET: api/Alarms/5
        //[ResponseType(typeof(Alarm))]
        //public IHttpActionResult GetAlarm(long id)
        //{
        //    Alarm alarm = db.Alarms.Find(id);
        //    if (alarm == null)
        //    {
        //        return NotFound();
        //    }

        //    return Ok(alarm);
        //}

        // PUT: api/Alarms/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutAlarm(long id, Alarm alarm)
        {
            string uid = User.Identity.GetUserId();
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != alarm.Id )
            {
                return BadRequest();
            }
            var al = db.Alarms.Find(id);
            if (al == null || al.UserId != uid) return BadRequest();
            alarm.UserId = uid;
            db.Entry(alarm).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AlarmExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Alarms
        [ResponseType(typeof(Alarm))]
        public IHttpActionResult PostAlarm(Alarm alarm)
        {
            string uid = User.Identity.GetUserId();
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            alarm.UserId = uid;
            db.Alarms.Add(alarm);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = alarm.Id }, alarm);
        }

        // DELETE: api/Alarms/5
        [ResponseType(typeof(Alarm))]
        public IHttpActionResult DeleteAlarm(long id)
        {
            string uid = User.Identity.GetUserId();
            Alarm alarm = db.Alarms.Find(id);
            if (alarm == null || alarm.UserId!=uid)
            {
                return NotFound();
            }

            db.Alarms.Remove(alarm);
            db.SaveChanges();

            return Ok(alarm);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool AlarmExists(long id)
        {
            return db.Alarms.Count(e => e.Id == id) > 0;
        }
    }
}