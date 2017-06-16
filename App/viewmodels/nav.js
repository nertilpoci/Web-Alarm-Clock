
define(['durandal/system', 'services/logger', 'durandal/plugins/router', 'services/dataservice'],
    function (system, logger, router, dataservice) {
        var userName = ko.observable();
        var logoff = function () {
           
            dataservice.logout();
        }
        var vm = {
            activate: activate,
            viewAttached: viewAttached,
            router: router,
            userName: userName,
            logoff: logoff

        };

     
        var initialized = false;
        function activate() {
            
            return getUserData();
        }

        function getUserData() {
            return dataservice.me(userName);
        }
        function viewAttached(view) {
            $(".button-collapse").sideNav();

            $(".dropdown-button").dropdown();

        }
        return vm;
    }
);