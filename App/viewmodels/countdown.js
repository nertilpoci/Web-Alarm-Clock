define(['services/dataservice', 'durandal/app'], function (dataservice, app) {
    
    
    var initialized = false;

    var vm = {
        activate: activate,
        viewAttached: viewAttached,
        


};

    return vm;
 
   
    function activate() {
      
    }

    function moreThanOneDayDiff(dt1, dt2)
    {
        var timeDiff =dt1.getTime() - dt2.getTime();
       return timeDiff / (1000 * 3600 * 24)>=1; 
    }
    function setClock(date) {
        if (moreThanOneDayDiff(date, new Date())){

            $('.countDown').FlipClock(date, {
                clockFace: 'DailyCounter',
                countdown: true,
                showSeconds: true
            });
            $('.countDown').css("width", "800px");
        }
        else {
            $('.countDown').FlipClock(date, {

                countdown: true,
                showSeconds: true
            });
            $('.countDown').css("width", "500px");
        }
     
    }

    function viewAttached(view)
    {
        var ticks = 0;
        $('.datepicker').pickadate({
            selectMonths: true, 
            onSet: function (context) {
            var time = parseTime($('.timePicker').val())|| new Date(0);
                   
             setClock(new Date(context.select + time.getTime()));
             ticks = context.select;
             Materialize.updateTextFields();
            },
        });
        $('select').material_select();
        $('.timePicker').clockpicker({
            afterDone: function (e) {
                var time = parseTime($('.timePicker').val(),ticks==0);
                
                setClock(new Date(ticks + time.getTime()));
            },
            autoclose: true, placement: 'bottom'
        });
        function parseTime(timeString,includeDate) {
            if (timeString == '') return null;

            var time = timeString.match(/(\d+)(:(\d\d))?\s*(p?)/i);
            if (time == null) return null;

            var hours = parseInt(time[1], 10);
            if (hours == 12 && !time[4]) {
                hours = 0;
            }
            else {
                hours += (hours < 12 && time[4]) ? 12 : 0;
            }
            var d = includeDate ? new Date() : new Date(0);
            d.setUTCHours(hours);
           
            d.setMinutes(parseInt(time[3], 10) || 0);
           
            d.setSeconds(0, 0);
            return d;
        }
     
    }
});