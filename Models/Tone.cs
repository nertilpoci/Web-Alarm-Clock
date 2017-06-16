using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace AlarmClock.Models
{
    public class Tone
    {
        public Tone()
        {
            Alarms= new HashSet<Alarm>();
        }

        public long Id { get; set; }
        public string Name { get; set; }
        public string FileName { get; set; }
        public string UserId { get; set; }
        [JsonIgnore]
        [IgnoreDataMember]
        public ICollection<Alarm> Alarms { get; set; }
    

}
}
