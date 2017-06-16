define(['services/dataservice','durandal/system', 'services/logger' ,'services/model','config'], function (dataservice,system, logger,model,config) {


    
    var Alarm = function () {
        var self = this;
        self.id = ko.observable();
        self.scheduleId = ko.observable();
        self.toneId = ko.observable();
        self.note = ko.observable();
        self.time = ko.observable();
        self.dirtyFlag = new ko.DirtyFlag([self.note]);
        return self;
    };
    var testt = function () {
      
      
    };
    var scheduleId;
    var newAlarm = new Alarm();
    var schedule = ko.observable();
    var initialized = false;
    var editMode = ko.observable(false);
    var alarms = ko.observableArray();
    var tunes = ko.observableArray();
    var edit = function () {
        editMode(true);
     
        $('.timePicker').clockpicker({
            autoclose: true, placement: 'top'
        });

}
    var save = function() {
        editMode(false);
     
       
       
    };
    var addNewItem = function () {
       
        
        newAlarm.scheduleId(scheduleId);
        dataservice.postAlarm(newAlarm, schedule().alarms).then(function () {

            $('.timePicker').clockpicker({
                autoclose: true, placement: 'top'
            });

        });
        
      
        $('select').material_select();

    };
    var modalSelectFixer = {
        init: function () {
            $(".modal .input-field.input--select")
              .off("mouseup")
              .on("mouseup", function () {
                  var modal = $(this).closest(".modal");

                  var y = $(this).offset().top;
                  y -= $(window).scrollTop();
                  var x = $(this).offset().left;

                  var dropDownId = $(this)
                    .find(".select-dropdown")
                    .attr("data-activates");
                  var dropdown = $("ul#" + dropDownId);
                  dropdown.prependTo("body");
                  if ($("body .dropdownWrapper")) {
                      $("body .dropdownWrapper").remove();
                  }
                  dropdown.wrap($("<div class='dropdownWrapper'></div>"));
                  var wrapper = dropdown.closest(".dropdownWrapper");
                  wrapper.css({
                      "position": "absolute",
                      "top": y,
                      "left": x,
                      "z-index": 1004
                  });
              });
        }
    }
    var showInsertModal = function () {

        $('#modal1').openModal();
        modalSelectFixer.init();
        $('.modal-trigger').leanModal();
    
        $('.timePicker').clockpicker({
            autoclose: true,placement:'top'
        });

 
      
    };
    var boolComparison=  function(variable1,variable2) {
     return  variable1 == variable2;
      
     
   }
    var hasChanges = ko.computed(function () {
        return false;
    });
    var dirtyItems = ko.computed(function () {
        return [];
        //return ko.utils.arrayFilter(alarms(), function (item) {
        //    return item.dirtyFlag().isDirty();
        //});
    });
    var isDirty = ko.computed(function () {
        return dirtyItems().length>0;
    }, this);

    var nameFromId = function (id) {
        
        var tone = ko.observable(
            ko.utils.arrayFirst(tunes(), function (option) { return option.id() == id(); })
        );
        if (tone()) {
            return tone().name();
        }
        
        return "";
    };
    function sleep(milliseconds) {
     
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
            if ((new Date().getTime() - start) > milliseconds) {
                break;
            }
        }
    }

    var test = ko.observableArray();
    var saveCmd = ko.asyncCommand({
        execute: function (complete) {
           
            dataservice.putSchedule(schedule).always(function () { editMode(false);
                complete();
            });
           
        },

        canExecute: function (isExecuting) {
            return  !isExecuting;
        }
    });
    var addAlarmCmd = ko.asyncCommand({
        execute: function (complete) {
            newAlarm.scheduleId(scheduleId);
            

          
            $('select').material_select();
            dataservice.postAlarm(newAlarm, schedule().alarms).always(function () {
                editMode(false);
                $('select').material_select();
                $('#modal1').closeModal();
                complete();
            });

        },

        canExecute: function (isExecuting) {
            return !isExecuting;
        }
    });
    var deleteAlarm = function (item) {
        if (item.id()) {
            dataservice.deleteAlarm(item, schedule().alarms);
        } else {
            schedule().alarms.remove(item);
        }
         
    }
    var vm = {
        activate: activate,
        deleteAlarm:deleteAlarm,
        viewAttached: viewAttached,
        isDirty: isDirty,
        schedule:schedule,
        saveCmd:saveCmd,
        title: 'Edit Schedule',
        refresh: refresh,
        testt:testt,
       nameFromId:nameFromId,
        tunes: tunes,
        addNewItem:addNewItem,
       isEditMode:editMode,
       edit: edit,
       newAlarm:newAlarm,
        showInsertModal:showInsertModal,
        save:save,
        boolCompare:boolComparison,

        hasChanges: hasChanges,
        addAlarmCmd: addAlarmCmd
      

    };
    function log(msg, data, showToast) {
        logger.log(msg, data, system.getModuleId(dataservice), showToast);
    }
  


  
   

 
    return vm;

    function activate(routeData) {
       
        var id = parseInt(routeData.id);
        scheduleId = id;
      
        return refresh(id);
    }

    function refresh(id) {
     ;
       
        return $.when(dataservice.getMusics(tunes), dataservice.getScheduleById(scheduleId, true, schedule));
//        return dataservice.getMusics(tunes).then(
//            function () {
           
//                dataservice.getScheduleById(scheduleId, true, schedule);
//}
//            ,
//            function () {
               
//                dataservice.getScheduleById(id, true, schedule);
//            });
    }

    function viewAttached(view) {
        $('select').material_select();
        modalSelectFixer.init();
        $('.modal-trigger').leanModal();
       
    }

});