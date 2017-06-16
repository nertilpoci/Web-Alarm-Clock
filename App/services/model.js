define(['config'], function (config) {
  
    function alarm(data) {
        this.Id = data.Id || 0;
        this.Tune = ko.observable(data.Tune || '');
        this.Note = ko.observable(data.Note || '');
    }

    var model = {
        alarm: alarm
        
    };

    return model;

    //#region Internal Methods
    function mapToObservable(dto) {
        var mapped = {};
        for (prop in dto) {
            if (dto.hasOwnProperty(prop)) {
                mapped[prop] = ko.observable(dto[prop]);
            }
        }
        return mapped;
    };

    function addSessionPartialComputeds(entity) {
        entity.speakerImageName = ko.computed(function () {
            return makeImageName(entity.speakerImageSource());
        });
        entity.speakerFullName = ko.computed(function () {
            return entity.speakerFirstName() + ' ' + entity.speakerLastName();
        });
        entity.timeSlotName = ko.computed(function () {
            return entity.timeSlotStart() ? moment.utc(entity.timeSlotStart()).format('ddd hh:mm a') : '';
        });
        entity.tagsFormatted = ko.computed(function () {
            var text = entity.tags();
            return text ? text.replace(/\|/g, ', ') : text;
        });
        return entity;
    };

    function addSpeakerPartialComputeds(entity) {
        entity.fullName = ko.computed(function () {
            return entity.firstName() + ' ' + entity.lastName();
        });
        entity.imageName = ko.computed(function () {
            return makeImageName(entity.imageSource());
        });
        return entity;
    };
    //#endregion
});