using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AlarmClock.Models;
using Microsoft.AspNet.Identity;

namespace AlarmClock.DAL
{
   public class AlarmClockEntities : System.Data.Entity.DbContext
    {
        public AlarmClockEntities() : base("DefaultConnection")
        {
        
        }

        public DbSet<Alarm> Alarms { get; set; }
        public DbSet<Schedule> Schedules { get; set; }
        public DbSet<Tone> Tones { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            //  Database.SetInitializer(new MigrateDatabaseToLatestVersion< AlarmClockEntities, Migrations.Configuration>());
        
        }

        public System.Data.Entity.DbSet<AlarmClock.Models.ClockSettings> ClockSettings { get; set; }
    }
}
