using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace AlarmClock.Models
{
    public class Alarm
    {
        public long Id { get; set; }
        public string Note { get; set; }
        [JsonIgnore] 
        [IgnoreDataMember]
        public virtual Schedule Schedule {get;set;}
        public  long ScheduleId { get; set; }
        public  string Time { get; set; }
        [JsonIgnore]
        [IgnoreDataMember]
        public virtual Tone Tone { get; set; }
        public  long? ToneId { get; set; }
        public string UserId { get; set; }

    }
}
