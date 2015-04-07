/// <reference path="../../scripts/typings/knockout/knockout.d.ts" />
/// <reference path="../../scripts/typings/moment/moment.d.ts" />
var TimezApp;
(function (TimezApp) {
    var TimeItem = (function () {
        function TimeItem(name, offset, systime) {
            var _this = this;
            this.name = ko.observable(name);
            this.offset = ko.observable(offset);
            this.time = ko.computed(function () { return systime().add(_this.offset()); });
        }
        return TimeItem;
    })();
    TimezApp.TimeItem = TimeItem;
    var TimeZ = (function () {
        function TimeZ() {
            var _this = this;
            this.time = ko.observable(moment());
            this.times = ko.observableArray([]);
            this.load();
            setInterval(function () {
                _this.time(moment());
            }, 1000);
        }
        TimeZ.prototype.load = function () {
            var str = localStorage.getItem('timez');
            if (str) {
                var data = JSON.parse(str);
                this.time(data.time);
                this.times(data.times);
            }
        };
        TimeZ.prototype.save = function () {
            var data = ko.toJSON(this);
            localStorage.setItem('timez', data);
        };
        TimeZ.prototype.add = function (name, offset) {
            var item = new TimeItem(name, offset, this.time);
            this.times.push(item);
            this.save();
        };
        TimeZ.prototype.drop = function (data) {
            this.times.remove(data);
            this.save();
        };
        return TimeZ;
    })();
    TimezApp.TimeZ = TimeZ;
})(TimezApp || (TimezApp = {}));
//# sourceMappingURL=timez.js.map