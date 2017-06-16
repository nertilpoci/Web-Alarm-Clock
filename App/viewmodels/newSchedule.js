define(['services/dataservice'], function (dataservice) {
    var schedules = ko.observableArray();
    var initialized = false;
    var Schedule = function() {

        var self = this;
        self.name = ko.observable();
        self.description = ko.observable();
        return self;
    }

    var schedule =new Schedule();
    var createCmd = ko.asyncCommand({
      
        execute: function (complete) {
     
            dataservice.postSchedule(schedule).always(function () {
                $('#modal1').closeModal();
                complete();
            });

        },

        canExecute: function (isExecuting) {
            return !isExecuting;
        }
    });
    var vm = {
        activate: activate,
       
        title: 'New Schedules',
        refresh: refresh,
        createCmd: createCmd,
        schedule:schedule
    };
    return vm;

    function activate() {
        if (initialized) { return; }
        initialized = true;
        return refresh();
    }

    function refresh() {
      
    }

});