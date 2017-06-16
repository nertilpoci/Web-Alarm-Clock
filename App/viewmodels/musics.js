define(['services/dataservice'], function (dataservice) {
    var musics = ko.observableArray([{
        Name: "When its all gone",
        FileName: "Musics/60dd7da3-79a3-4afa-98da-28b78173ad02.mp3"

    },
    {
        Name: "We own it",
        FileName: "Musics/87253714-e20d-44f1-b5f7-7946e9b833dc.mp3"

    }]
        );
    var initialized = false;
    var deleteMusic=function(music) {
        return dataservice.deleteMusic(music,musics);

    }
   
    var vm = {
        activate: activate,
        musics: musics,
        deleteMusic:deleteMusic,
        title: 'Audio',
        refresh: refresh,
        viewAttached:viewAttached
    };
    return vm;

    function activate() {
        
       
        return refresh();
    }

    function refresh() {
        return dataservice.getMusics(musics);
    }
    function viewAttached(view) {
     
        $('.tooltipped').tooltip({ delay: 50 });
    }
});