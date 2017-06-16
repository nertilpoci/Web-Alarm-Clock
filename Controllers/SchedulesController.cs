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
{[Authorize]
    public class SchedulesController : ApiController
    {
        private AlarmClockEntities db = new AlarmClockEntities();
     
        // GET: api/Schedules
        public IQueryable<Schedule> GetSchedules()
        {
            string uid = User.Identity.GetUserId();
            return db.Schedules.Where(z=>z.UserId==uid);
        }

        // GET: api/Schedules/5
        [ResponseType(typeof(Schedule))]
        public IHttpActionResult GetSchedule(long id,bool includeAlarms=false)
        {
            string uid = User.Identity.GetUserId();
         //   db.Configuration.ProxyCreationEnabled = false;
            Schedule schedule = db.Schedules.Find(id);
            if (schedule == null || schedule.UserId!=uid)
            {
                return NotFound();
            }
            if (includeAlarms) return Ok(db.Schedules.Include("Alarms").First(z => z.Id == schedule.Id));

            return Ok(schedule);
        }

        // PUT: api/Schedules/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutSchedule(long id, Schedule schedule)
        {
            string uid = User.Identity.GetUserId();
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var sch = db.Schedules.Find(id);
            if (sch == null || sch.UserId != uid) return NotFound();
            if (id != schedule.Id)
            {
                return BadRequest();
            }


            sch.Description = schedule.Description;
            schedule.Name = sch.Name;
            schedule.UserId = uid;
            foreach (var child in schedule.Alarms)
            {


                var alarm = db.Alarms.Find(child.Id);
                alarm.Note = child.Note;
                alarm.Time = child.Time;
                alarm.ToneId = child.ToneId;

                alarm.UserId = uid;
             
                 


            }

         
            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ScheduleExists(id))
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

        // POST: api/Schedules
        [ResponseType(typeof(Schedule))]
        public IHttpActionResult PostSchedule(Schedule schedule)
        {
            string uid = User.Identity.GetUserId();
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            schedule.UserId = uid;
            db.Schedules.Add(schedule);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = schedule.Id }, schedule);
        }

        // DELETE: api/Schedules/5
        [ResponseType(typeof(Schedule))]
        public IHttpActionResult DeleteSchedule(long id)
        {
            string uid = User.Identity.GetUserId();
            Schedule schedule = db.Schedules.Find(id);
            if (schedule == null|| schedule.UserId!=uid)
            {
                return NotFound();
            }
            var setting = db.ClockSettings.SingleOrDefault(z => z.ScheduleId == id);
            if (setting != null)
            {
                setting.Schedule = null;
            }
            db.Schedules.Remove(schedule);
            db.SaveChanges();

            return Ok(schedule);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ScheduleExists(long id)
        {
            return db.Schedules.Count(e => e.Id == id) > 0;
        }
    }
}