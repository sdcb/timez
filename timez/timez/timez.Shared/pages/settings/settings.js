(function () {
    "use strict";

    function Hms(duration) {
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
        this.duration(duration);
    }

    var mode = {
        edit: 1,
        create: 2
    };

    function ViewModel(tz, data) {
        var me = this;
        this.tz = tz;
        this.mode = data ? mode.edit : mode.create;
        this.item = data ? data : new TimezApp.TimeItem('新的时间', moment.duration(0), this.tz.time);

        this.time = new Hms(this.item.offset());
        this.time.duration.subscribe(function(v) {
            me.item.offset(v);
        });
        this.save = function () {
            if (this.mode === mode.edit) {
            } else if (this.mode === mode.create) {
                me.tz.times.push(me.item);
            }
            me.tz.save();
            WinJS.Navigation.back();
        }
        this.drop = function() {
            var msg = new Windows.UI.Popups.MessageDialog('确定要删除此项吗？');
            msg.commands.push(new Windows.UI.Popups.UICommand('确定', function() {
                me.tz.drop(me.item);
            }));
            msg.commands.push(new Windows.UI.Popups.UICommand('取消'));
            msg.showAsync().then(function() {
                WinJS.Navigation.back();
            });
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
            window.vm = new ViewModel(options.tz, options.data);
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
