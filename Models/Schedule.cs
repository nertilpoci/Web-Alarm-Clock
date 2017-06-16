using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace AlarmClock.Models
{
  public  class Schedule
    {
      public Schedule()
      {
          Alarms=new HashSet<Alarm>();
      }
        public long Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string UserId { get; set; }
      
        public ICollection<Alarm> Alarms {get;set;}
    }
}
