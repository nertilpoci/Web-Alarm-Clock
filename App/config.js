define(function () {
    toastr.options.timeOut = 4000;
    toastr.options.positionClass = 'toast-bottom-right';

    var imageSettings = {
        imageBasePath: '../content/images/photos/',
        unknownPersonImageSource: 'unknown_person.jpg'
    };

    var routes = [ 
        {
            url: 'countdown',
            moduleId: 'viewmodels/countdown',
            name: 'Countdown',
            visible: true
        }
        ,
     {
         url: 'schedules',
         moduleId: 'viewmodels/schedules',
         name: 'Schedules',
         visible: true
     },
     {
         url: 'scheduledetails/:id',
         moduleId: 'viewmodels/scheduledetails',
         name: 'Schedule Details',
         visible: false
     }
    ,
     {
         url: 'musics',
         moduleId: 'viewmodels/musics',
         name: 'Tones',
         visible: true
     },
     {
         url: 'uploadTone',
         moduleId: 'viewmodels/musicadd',
         name: 'New Tone',
         visible: false
     },
    {
        url: 'newSchedule',
        moduleId: 'viewmodels/newSchedule',
        name: 'New Tone',
        visible: false
     },
     
    {
        url: 'start',
        moduleId: 'viewmodels/start',
        name: 'Home',
        visible: true
    }];

    var startModule = 'start';

    return {
        imageSettings: imageSettings,
        routes: routes,
        startModule: startModule
    };
});
