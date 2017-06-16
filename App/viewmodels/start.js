define(['services/dataservice', 'durandal/app'], function (dataservice, app) {
    var schedule = ko.observable();
    var schedules = ko.observableArray();
    var alarm = ko.observable();
    var musics = ko.observableArray();
    var alarms = ko.observableArray();
    var settings = ko.observable();
    var selectedMusic = ko.observable();
    var note = ko.observable();
    var isPlaying = ko.observable(false);
    
    var initialized = false;
    var playManual = function () {
      
        var audio = $("#main_player");
        audio[0].addEventListener('ended', function() {
            isPlaying(false);
            note("");
        });
        $("#mp3_src").attr("src", selectedMusic().fileName());
        /****************/
        audio[0].pause();
        audio[0].load();//suspends and restores all audio element

        //audio[0].play(); changed based on Sprachprofi's comment below
        audio[0].oncanplaythrough = audio[0].play();
        /****************/
        isPlaying(true);
    }
    var stop = function () {
        isPlaying(false);
        var audio = $("#main_player");
        $("#mp3_src").attr("src", selectedMusic().fileName());
        /****************/
        audio[0].pause();
        audio[0].load();//suspends and restores all audio element

        //audio[0].play(); changed based on Sprachprofi's comment below
        audio[0].oncanplaythrough = audio[0].stop();
        /****************/
        isPlaying(false);
    }
    var vm = {
        activate: activate,
        viewAttached: viewAttached,
        schedule: schedule,
        title: 'Home',
        alarm: alarm,
        alarms: alarms,
        musics: musics,
        selectedMusic: selectedMusic,
        schedules: schedules,
        isPlaying: isPlaying,
        playManual: playManual,
        stop: stop,
        note:note


};
    schedule.subscribe(function () {
        //return;
        if(schedule()!=null)
        {
            dataservice.getAlarms(schedule().id(), alarms).then(function () {
                settings().schedule(schedule());

                dataservice.postSettings(settings);
                if (alarms().length > 0) {
                    setNextAlarm();
                } else {
                    alarm(null);
                }
            });
        }
        else {
            alarm(null);
        }

    });
    return vm;
 
    function getNextAlarm()
    {
        var t = moment().format("HH:mm").toString();
        var now = moment(t, "HH:mm:ss");
        var alarm = ko.utils.arrayFirst(alarms(), function (option) {

            var optionTime = moment(option.time(), "HH:mm:ss");
       
            return optionTime.isAfter(now);

        });
        return alarm;
       
    }
    function setNextAlarm() {
        var days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
        if (getNextAlarm() == null)
            {
            var t = moment();
            var firstAlarm = alarms()[0];
            var firstAlarmTime = firstAlarm.time();
            var atime = moment(firstAlarm.time(), "HH:mm");
            atime.add(1, 'days');
            var seconds = moment.duration(atime.diff(now)).asSeconds();//[days, years, months, seconds, ...]
         
            firstAlarm.time("There are no more alarms for today. Next Alarm Tomorrow at : " + firstAlarmTime);
            alarm(firstAlarm)
            var clock = $('.clock2').FlipClock(seconds, {
                countdown: true,
                callbacks: {
                    stop: function () {

                        setNextAlarm();
                        play();

                    }
                }
            });
            }
            else {
                alarm(getNextAlarm());
                
       
        var t = moment().format("HH:mm").toString();
        var now = moment(t, "HH:mm");

        var atime = moment(alarm().time(), "HH:mm");

        var seconds = moment.duration(atime.diff(now)).asSeconds();//[days, years, months, seconds, ...]
      
        var clock = $('.clock2').FlipClock(seconds, {
            countdown: true,
            callbacks: {
                stop: function () {
                    play();
                    setNextAlarm();
                    

                }
            }
        });
        }
    }
    function play() {
        isPlaying(true);
        note(alarm().note());
        var tone = ko.utils.arrayFirst(musics(), function (option) {

          

            return option.id() == alarm().toneId();
           
        });
    
        var audio = $("#main_player");
            $("#mp3_src").attr("src", tone.fileName());
            /****************/
            audio[0].pause();
            audio[0].load();//suspends and restores all audio element

            //audio[0].play(); changed based on Sprachprofi's comment below
            audio[0].oncanplaythrough = audio[0].play();
            /****************/
        
    }
    function activate() {
        isPlaying(false);
        note();
        return refresh();
    }

    function refresh() {
        return $.when(dataservice.getSchedules(schedules), dataservice.getSettings(settings), dataservice.getMusics(musics)).then(function () {
        
            if (settings().schedule()) {
                var defaultSchedule = ko.utils.arrayFirst(schedules(), function (option) {


                    return option.id() == settings().schedule().id();

                });
                schedule(defaultSchedule);
            }
            else {
                //do some stuff here
            }
        });
    
    }
   

    function viewAttached(view)
    {
       

        //function update() {
        //    $('#clock').html(moment().format('D. MMMM YYYY H:mm:ss'));
        //}

        //setInterval(update, 1000);

        var clock = $('.clock').FlipClock({
            clockFace: 'TwentyFourHourClock'
      

        });
       
        $('select').material_select();

     
    }
});