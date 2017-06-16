define(['services/dataservice'], function (dataservice) {
    var sessions = ko.observableArray();
    var initialized = false;
    var formData = new FormData();
    var musics = ko.observableArray();
    var isUploading = ko.observable(false);
    var removeFile=function (file)
    {
       
        musics.remove(file);

    }
    var formatBytes=  function (bytes, decimals) {
        if (bytes == 0) return '0 Byte';
        var k = 1000;
        var dm = decimals + 1 || 3;
        var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        var i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }
    var vm = {
        activate: activate,
        viewAttached: viewAttached,
        sessions: sessions,
        upload: upload,
        musics: musics,
        bytesFormatter:formatBytes,
        removeFile:removeFile,
        title: 'Audio',
        refresh: refresh,
        isUploading: isUploading
    };
    return vm;

    function activate() {
     
        return refresh();
    }

    function refresh() {
        //return dataservice.getSessionsPartials(sessions);
    }
    function viewAttached(view) {
        $('#uploadFile').change(function () {


            var files = $("#uploadFile").get(0).files;
            for (var i = 0; i < files.length; i++)
            {

                musics.push(files[i]);
            }
          
          
      

           

           



     
        });


    }
    function upload() {
        isUploading(true);
        dataservice.uploadMusics(musics).done(function () {
         
            musics.removeAll();
            isUploading(false);
            window.location = "/#/musics";
        }).fail(function () {
            musics.removeAll();
            isUploading(false);
            window.location = "/#/musics";

        });
    
    }

});