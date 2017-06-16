using AlarmClock.DAL;
using AlarmClock.Models;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;

namespace AlarmClock.Controllers
{
    public class MusicController : ApiController
    {
        [HttpPost]
        public async Task<IHttpActionResult> Post()
        {

            
            Guid g;
            string uid = User.Identity.GetUserId();
            if (db.Tones.Count(z => z.UserId == uid) > 10) return BadRequest("You have reached your audio limit. Only 10 are allowed");
            try
            {
                if (!Request.Content.IsMimeMultipartContent())
                {
                    return BadRequest("Not Mime Multipart Content");
                }

                var provider = new MultipartMemoryStreamProvider();

                await Request.Content.ReadAsMultipartAsync(provider);

                var path = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "Musics");

                foreach (var file in provider.Contents)
                {
                    var guid = Guid.NewGuid().ToString();

                    var fileName = Path.GetFileName(file.Headers.ContentDisposition.FileName.Trim('\"'));
                    var extension = Path.GetExtension(fileName);
                    var fullPath = Path.Combine(path, guid + extension);
                    var buffer = await file.ReadAsByteArrayAsync();
                    File.WriteAllBytes(fullPath, buffer);
                    db.Tones.Add(new Tone { Name = fileName.Split('.').First(), FileName = "Musics/" + guid + extension ,UserId=uid});
                    

                }
                db.SaveChanges();
                return Ok();
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        private AlarmClockEntities db = new AlarmClockEntities();

        // GET: api/Tones
        public IQueryable<Tone> GetTones()
        {
            string uid = User.Identity.GetUserId();
            return db.Tones.Where(z=>z.UserId==uid);
        }

        // GET: api/Tones/5
        [ResponseType(typeof(Tone))]
        public IHttpActionResult GetTone(long id)
        {
            string uid = User.Identity.GetUserId();
            Tone tone = db.Tones.Find(id);

            if (tone == null || tone.UserId!=uid)
            {
                return NotFound();
            }

            return Ok(tone);
        }

        // PUT: api/Tones/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutTone(long id, Tone tone)
        {
            string uid = User.Identity.GetUserId();
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != tone.Id)
            {
                return BadRequest();
            }
            var existingtone = db.Tones.Find(id);
            if (tone.UserId != uid) return BadRequest();
            tone.UserId = uid;
            db.Entry(tone).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ToneExists(id))
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

        //// POST: api/Tones
        //[ResponseType(typeof(Tone))]
        //public IHttpActionResult PostTone(Tone tone)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    db.Tones.Add(tone);
        //    db.SaveChanges();

        //    return CreatedAtRoute("DefaultApi", new { id = tone.Id }, tone);
        //}

        // DELETE: api/Tones/5
        [ResponseType(typeof(Tone))]
        public IHttpActionResult DeleteTone(long id)
        {
            string uid = User.Identity.GetUserId();
            Tone tone = db.Tones.Find(id);
            if (tone == null|| tone.UserId!=uid)
            {
                return NotFound();
            }
            try
            {

                if(tone.FileName!="SampleTone.mp3")
                {
                var fullFileName = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, tone.FileName);
               File.Delete(fullFileName);
                }
            }
            catch (Exception)
            {

                return NotFound();
            }
            db.Alarms.RemoveRange(db.Alarms.Where(z=>z.ToneId==tone.Id));
            db.SaveChanges();
            db.Tones.Remove(tone);
            db.SaveChanges();

            return Ok(tone);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ToneExists(long id)
        {
            return db.Tones.Count(e => e.Id == id) > 0;
        }


    }
}
