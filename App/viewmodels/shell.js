define(['durandal/system', 'services/logger', 'durandal/plugins/router', 'config'],
    function(system, logger, router, config) {
        var shell = {
            activate: activate,
            viewAttached:viewAttached,
            router: router
        };
       

        function activate() {
           
            router.map(config.routes);
            return router.activate(config.startModule);
        }
        function viewAttached()
        {
        
        }
 return shell;
    }
);