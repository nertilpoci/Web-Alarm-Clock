using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace AlarmClock.Models
{
    // Models returned by MeController actions.
    public class GetViewModel
    {
        public string UserName { get; set; }
    }
}