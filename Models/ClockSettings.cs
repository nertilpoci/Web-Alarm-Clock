using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AlarmClock.Models
{
 public   class ClockSettings
    {

        public long Id { get; set; }
     
        public virtual Schedule Schedule { get; set; }
        public long? ScheduleId { get; set; }
      
      
        public string UserId { get; set; }
    }
}
