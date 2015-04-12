(function () {
    "use strict";

    

    function ViewModel(tz) {
        var me = this;
        this.tz = tz;
        this.item = new TimezApp.TimeItem('新的时间', moment.duration(0), this.tz.time);

        this.time = ko.observable('03:00');
        this.time.subscribe(function(v) {
            var diff = moment(v) - moment(moment(v).format('L'));
            var duration = moment.duration(diff);
            me.item.offset(duration);
        });
        this.save = function() {
            me.tz.times.push(me.item);
            WinJS.Navigation.back();
        }
    }

    WinJS.UI.Pages.define("/pages/settings/settings.html", {
        ready: function (element, options) {
            window.vm = new ViewModel(options.tz);
            ko.applyBindings(vm, element);
        },

        unload: function () {
            ko.cleanNode(this.element);
        },

        updateLayout: function (element) {
            /// <param name="element" domElement="true" />
        }
    });

})();
