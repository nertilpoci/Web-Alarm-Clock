using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AlarmClock.Models;

namespace AlarmClock.DAL
{
  public  class DbInitializer: System.Data.Entity.DropCreateDatabaseIfModelChanges<DbContext>
    {
        protected override void Seed(DbContext dbContext)
        {
       
        }
    }
}
