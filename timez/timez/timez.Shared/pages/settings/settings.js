(function () {
    "use strict";

    function Hms() {
        var me = this;
        this.hour = ko.observable(0);
        this.minute = ko.observable(0);
        this.second = ko.observable(0);
        this.duration = ko.computed({
            read: function() {
                var h = parseInt(me.hour());
                var m = parseInt(me.minute());
                var s = parseInt(me.second());
                return moment.duration({
                    seconds: s,
                    minutes: m,
                    hours: h
                });
            },
            write: function(v) {
                me.second(v.seconds());
                me.minute(v.minutes());
                me.hour(v.hours());
            }
        });
    }

    function ViewModel(tz) {
        var me = this;
        this.tz = tz;
        this.item = new TimezApp.TimeItem('新的时间', moment.duration(0), this.tz.time);

        this.time = new Hms(this.item.offset());
        this.time.duration.subscribe(function(v) {
            me.item.offset(v);
        });
        this.save = function() {
            me.tz.times.push(me.item);
            WinJS.Navigation.back();
        }

        this.p12 = [];
        this.p60 = [];
        (function () {
            var i;
            for (i = -12; i <= 12; ++i) me.p12.push(i);
            for (i = 0; i < 60; ++i) me.p12.push(i);
        })();
    }

    WinJS.UI.Pages.define("/pages/settings/settings.html", {
        ready: function (element, options) {
            window.vm = new ViewModel(options.tz);
            ko.applyBindings(vm, element);
            document.getElementById("appbar").winControl.disabled = false;
        },

        unload: function () {
            ko.cleanNode(this.element);
        },

        updateLayout: function (element) {
            /// <param name="element" domElement="true" />
        }
    });

})();
