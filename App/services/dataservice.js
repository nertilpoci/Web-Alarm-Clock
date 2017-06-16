define(['durandal/system', 'services/model', 'services/logger'],
    function (system, model, logger) {
        var setAccessToken = function (accessToken) {
             localStorage.setItem("accessToken", accessToken);
            window.location = '';
        };

        var getAccessToken = function () {
            return localStorage.getItem("accessToken");
        };
        var getFragment = function () {
            if (window.location.hash.indexOf("#") === 0) {
                return parseQueryString(window.location.hash.substr(1));
            } else {
                return {};
            }
        };

        function parseQueryString(queryString) {
            var data = {},
                pairs, pair, separatorIndex, escapedKey, escapedValue, key, value;

            if (queryString === null) {
                return data;
            }

            pairs = queryString.split("&");

            for (var i = 0; i < pairs.length; i++) {
                pair = pairs[i];
                separatorIndex = pair.indexOf("=");

                if (separatorIndex === -1) {
                    escapedKey = pair;
                    escapedValue = null;
                } else {
                    escapedKey = pair.substr(0, separatorIndex);
                    escapedValue = pair.substr(separatorIndex + 1);
                }

                key = decodeURIComponent(escapedKey);
                value = decodeURIComponent(escapedValue);

                data[key] = value;
            }

            return data;
        }
        var login = function () {
            if (!getAccessToken()) {
                // The following code looks for a fragment in the URL to get the access token which will be
                // used to call the protected Web API resource
                var fragment = getFragment();
               
                if (fragment.access_token) {
                    // returning with access token, restore old hash, or at least hide token

                    setAccessToken(fragment.access_token);
                   
                     
                       window.location.hash = fragment.state || '';
 
                } else {
                    // no token - so bounce to Authorize endpoint in AccountController to sign in or register
                    window.location = "/Account/Authorize?client_id=web&response_type=token&state=" + encodeURIComponent(window.location.hash);
                }
            }


        };
        var logout=function() {
            localStorage.removeItem("accessToken");
            var options = {
                url: '/account/logoff',
                type: 'POST'
              
                
            };

            $.ajax(options).then(function() {
                
                window.location = "/Account/Authorize?client_id=web&response_type=token&state=" + encodeURIComponent(window.location.hash);
            });
        
        }
        var headers = {};
        if (getAccessToken()) {
      
            headers.Authorization = 'Bearer ' + getAccessToken();
        } else {
            login();
        }
        var Alarm = function (alarm) {
            var self = this;
            self.id = ko.observable(alarm.id);

            self.note = ko.observable(alarm.note);
            self.time = ko.observable(alarm.time);

            self.toneId = ko.observable(alarm.toneId);
            self.scheduleId = ko.observable(alarm.scheduleId);
            self.dirtyFlag = new ko.DirtyFlag([self.note]);
            return self;
        };
        var Schedule = function (schedule) {
            var self = this;
            self.id = ko.observable(schedule.id);

            self.name = ko.observable(schedule.name);
            self.description = ko.observable(schedule.description);
            self.alarms = ko.observableArray([]);
            self.dirtyFlag = new ko.DirtyFlag(self);
            return self;
        }
        var Me = function (me) {
            var self = this;
            self.userName = ko.observable(me.userName);

         
            return self;
        };
        var getMusics = function(musicObservable) {
            musicObservable([]);
            var options = {
                url: '/api/music',
                type: 'GET',
                dataType: 'json',
                headers: headers,
            };

            return $.ajax(options).then(querySucceeded).fail(queryFailed);

            function querySucceeded(data) {
               
                var parsed = JSON.parse(JSON.stringify(data));
                for (var i = 0; i < parsed.length; i++) {

                    musicObservable.push(new tone(parsed[i]));
                }
                
              
                log('Retrieved [Songs] from remote data source', parsed, false);
            }
        };
        var getSettings = function (settings) {
           
            var options = {
                url: '/api/settings',
                type: 'GET',
                dataType: 'json',
                headers: headers,
            };

            return $.ajax(options).then(querySucceeded).fail(queryFailed);

            function querySucceeded(data) {

                var parsed = JSON.parse(JSON.stringify(data));
                if (parsed.schedule) {
                   
                    settings({id:parsed.id, schedule: ko.observable(new Schedule(parsed.schedule)) });
                } else {
                    settings({ id: parsed.id, schedule: ko.observable() });
                }
              
              
                log('Retrieved [Settings] from remote data source', parsed, false);
            }
        };
        var postSettings = function (settings) {
            var data = ko.toJSON(settings);
            log('settings to be send to server', data, false);
            var options = {
                url: '/api/settings',
                type: 'PUT',
                data: data,
                contentType: 'application/json',

                processData: false,
                dataType: 'json',
                headers: headers
            };

            return $.ajax(options).then(querySucceeded).fail(queryFailed);

            function querySucceeded(data) {
               
               





                log('Created [ Settings saved ] and persisted to the remote data source', data, false);
            }
        };
        var me = function (meObservable) {
          
            var options = {
                url: '/api/me',
                type: 'GET',
                dataType: 'json',
                headers: headers,
            };

            return $.ajax(options).then(querySucceeded).fail(queryFailed);

            function querySucceeded(data) {

                var parsed = JSON.parse(JSON.stringify(data));


                meObservable(parsed.userName);
                


                log('Retrieved [Personal Information] from remote data source', parsed, false);
            }
        };
        var deleteMusic = function (music,observableMusics) {
          
           


            var options = {
                url: '/api/music/'+music.id(),
                type: 'DELETE',
                data:ko.toJSON(music),
                dataType: 'json',
                headers: headers,
            };

            return $.ajax(options).then(querySucceeded).fail(queryFailed);

            function querySucceeded(data) {

              


              
                log('Audio removed successfully.', music, true);
                observableMusics.remove(music);
            }
           
        }
        var deleteAlarm = function (item, itemCollectionObservable) {


           

            var options = {
                url: '/api/alarms/' + item.id(),
                type: 'DELETE',
                data: ko.toJSON(item),
                dataType: 'json',
                headers: headers,
            };

            return $.ajax(options).then(querySucceeded).fail(queryFailed);

            function querySucceeded(data) {





                log('Alarm removed successfully.', item, true);
                itemCollectionObservable.remove(item);
            }

        }
        var deleteSchedule = function (item, itemCollectionObservable) {




            var options = {
                url: '/api/schedules/' + item.id(),
                type: 'DELETE',
                data: ko.toJSON(item),
                dataType: 'json',
                headers: headers,
            };

            return $.ajax(options).then(querySucceeded).fail(queryFailed);

            function querySucceeded(data) {





                log('Schedule removed successfully.', item, true);
                itemCollectionObservable.remove(item);
            }

        }
      
        var tone=function(tone) {
          var self = this;
          self.id = ko.observable(tone.id);
          self.name = ko.observable(tone.name);
          self.fileName = ko.observable(tone.fileName);
          self.dirtyFlag = new ko.DirtyFlag(self);
          return self;
      }
        var sortFunction = function (a, b) {
            var beginningTime = moment(a.time, "HH:mm");
            var endTime = moment(b.time, "HH:mm");
           
            return endTime.isBefore(beginningTime) ? 1 : -1;

        }
        var getAlarms = function (scheduleId,alarmsObservable) {
          alarmsObservable([]);
          var options = {
              url: '/api/alarms/'+scheduleId,
              type: 'GET',
              dataType: 'json',
              headers:headers
          };

          return $.ajax(options).then(querySucceeded).fail(queryFailed);

          function querySucceeded(data) {
           
              var parsed = JSON.parse(JSON.stringify(data));
           
             parsed.sort(sortFunction);
             
        
              for (var i = 0; i < parsed.length; i++) {
                  
                  alarmsObservable.push(new Alarm(parsed[i]));
              }
         
           
              log('Retrieved [Alarms] from remote data source', parsed, false);
          }
      };
        var getSchedules = function (schedulesObservable) {
          schedulesObservable([]);
          var options = {
              url: '/api/schedules',
              type: 'GET',
              dataType: 'json',
              headers: headers
          };

          return $.ajax(options).then(querySucceeded).fail(queryFailed);

          function querySucceeded(data) {

              var parsed = JSON.parse(JSON.stringify(data));
              for (var i = 0; i < parsed.length; i++) {

                  schedulesObservable.push(new Schedule(parsed[i]));
              }
           
          

              log('Retrieved [Schedules] from remote data source', parsed, false);
          }
      };
        var getScheduleById = function (id,inlcudeAlarms,schedulesObservable) {
          
          var options = {
              url: '/api/schedules/' + id + '?includeAlarms=' + inlcudeAlarms,
              type: 'GET',
              dataType: 'json',
              headers: headers
          };

          return $.ajax(options).then(querySucceeded).fail(queryFailed);

          function querySucceeded(data) {
            
              var parsed = JSON.parse(JSON.stringify(data));
           //   schedulesObservable = ko.mapping.fromJS(parsed);
              schedulesObservable(new Schedule(parsed));
              var temp = ko.observableArray();
              for (var i = 0; i < parsed.alarms.length; i++) {

                  temp.push(new Alarm(parsed.alarms[i]));
              }
              schedulesObservable().alarms = ko.observableArray(temp());
            
              log('Retrieved [Schedule ' + id + '] from remote data source', parsed, false);
          }
      };
        var putSchedule = function (schedulesObservable) {
          var data = ko.toJSON(schedulesObservable);
      
          var options = {
              url: '/api/schedules/' + schedulesObservable().id(),
              type: 'PUT',
              data: data,
              contentType: 'application/json',
              
              processData: false,
              dataType: 'json',
              headers: headers
          };

          return $.ajax(options).then(querySucceeded).fail(queryFailed);

          function querySucceeded(data) {

           

            



              log(' Schedule [ ' + schedulesObservable().name() + ' ] saved successfully', data, true);
          }
      };
        var postSchedule = function (schedulesObservable) {
          var data = ko.toJSON(schedulesObservable);
       
          var options = {
              url: '/api/schedules',
              type: 'POST',
              data: data,
              contentType: 'application/json',

              processData: false,
              dataType: 'json',
              headers: headers
          };

          return $.ajax(options).then(querySucceeded).fail(queryFailed);

          function querySucceeded(data) {

              var parased = JSON.parse(JSON.stringify(data));
             window.location='/#/scheduledetails/' +parased.id;
             




              log('  Schedule [' + data.name + ' ] created successfully', data, true);
          }
        };
        var postAlarm = function (item, itemCollectionObservable) {

            var data = ko.toJSON(item);
          
         
            var options = {
                url: '/api/alarms/',
                type: 'POST',
                data: data,
                dataType: 'json',
                contentType: 'application/json',
                headers:headers,

                processData: false
            };

            return $.ajax(options).then(querySucceeded).fail(queryFailed);

            function querySucceeded(data) {


                var parsed = JSON.parse(JSON.stringify(data));
               

                log('Alarm added successfully.', data, true);
                itemCollectionObservable.push(new Alarm(parsed));
            }

        }
        var uploadMusics=function(musicsObservable)
        {
            var calls = [];
            ko.utils.arrayForEach(musicsObservable(), function (music, index) {
                var data = new FormData();
                data.append("file" + index + 1, music);
               
                
                calls.push($.ajax({
                    type: 'POST',
                    url: 'api/music',
                    data: data,
                    contentType: false,
                    processData: false,
                    headers: headers,
                    success: function () {
                        log('[' + music.name + '] uploaded successfully', {}, true);
                    },
                    error: function (jqXHR) {

                    logger.logError('[' + music.name + '] failed to upload. ' + jqXHR.responseJSON.message, jqXHR, system.getModuleId(dataservice), true);
                    }
                }));
            });
            return $.when.apply($,calls);
           // return $.whenAll.apply($, calls);
         

        }

        var dataservice = {
            getMusics: getMusics,
            deleteMusic: deleteMusic,
            getAlarms: getAlarms,
            getSchedules: getSchedules,
            getScheduleById: getScheduleById,
            putSchedule: putSchedule,
            deleteAlarm: deleteAlarm,
            postSchedule: postSchedule,
            postAlarm: postAlarm,
            deleteSchedule: deleteSchedule,
            setAccessToken: setAccessToken,
            getAccessToken: getAccessToken,
            login: login,
            logout: logout,
            uploadMusics: uploadMusics,
            me: me,
            getSettings: getSettings,
            postSettings:postSettings

    };

        return dataservice;

        //#region Internal methods        
        function queryFailed(jqXHR, textStatus) {
            if (jqXHR.status == 401)
            {
                localStorage.removeItem("accessToken");
                login();
            }
            var msg = 'An error accured trying to complete the action. ' + jqXHR.statusText;
            logger.logError(msg, jqXHR, system.getModuleId(dataservice), true);
        }

        function sortSessions(s1, s2) {
            if (s1.timeSlotStart === s2.timeSlotStart) {
                return (s1.speakerFirstName > s2.speakerFirstName) ? 1 : -1;
            } else {
                return (s1.timeSlotStart > s2.timeSlotStart) ? 1 : -1;
            }
        }

        function sortSpeakers(s1, s2) {
            return (s1.firstName + s1.lastName > s2.firstName + s2.lastName) ? 1 : -1;
        }

        function log(msg, data, showToast) {
            logger.log(msg, data, system.getModuleId(dataservice), showToast);
        }
        //#endregion
});