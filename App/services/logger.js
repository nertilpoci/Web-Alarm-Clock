define(['durandal/system'],
    function (system) {
        var logger = {
            log: log,
            logError: logError
        };

        return logger;

        function log(message, data, source, showToast) {
            logIt(message, data, source, showToast, 'green darken-1');
        }

        function logError(message, data, source, showToast) {
            logIt(message, data, source, showToast, 'red darken-4');
        }

        function logIt(message, data, source, showToast, toastType) {
            source = source ? '[' + source + '] ' : '';
            if (data) {
                system.log(source, message, data);
            } else {
                system.log(source, message);
            }
            if (showToast) {
                Materialize.toast(message, 4000, toastType);
               

            }

        }
    });