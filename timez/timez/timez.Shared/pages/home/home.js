(function () {
    "use strict";

    var tz = new TimezApp.TimeZ();

    function viewModel() {
        var me = this;
        this.tz = tz;

        this.add = function() {
            WinJS.Navigation.navigate('/pages/settings/settings.html', {tz: me.tz});
        }
    }

    WinJS.UI.Pages.define("/pages/home/home.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            window.vm = new viewModel();
            ko.applyBindings(vm, element);
        },
        unload: function () {
            ko.cleanNode(this.element);
        }
    });
})();
