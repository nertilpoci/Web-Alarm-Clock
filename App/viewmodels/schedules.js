define(['services/dataservice','durandal/app'], function (dataservice,app) {
    var schedules = ko.observableArray();
    var showInsertModal = function () {
        // newAlarm = ko.observable(new Alarm());
      
        $('#modal1').openModal();

        //   $('.timepicker').wickedpicker();

    };
    var initialized = false;
    var deleteScheduleCmd = ko.asyncCommand({


        execute: function (data,complete) {
           
         
            dataservice.deleteSchedule(data,schedules).always(complete);
         
          //  app.showMessage('This is a message.');
        },

        canExecute: function (isExecuting) {
            return !isExecuting;
        }
    });
    var vm = {
        activate: activate,
        schedules: schedules,
        title: 'Schedules',
        showInsertModal: showInsertModal,
        refresh: refresh,
        deleteScheduleCmd: deleteScheduleCmd

    };
    return vm;

    function activate() {
       
        return refresh();
    }

    function refresh() {
        return dataservice.getSchedules(schedules);
    }

});