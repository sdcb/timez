(function () {
    "use strict";

    function viewModel() {
        var me = this;
        this.tz = new TimezApp.TimeZ();
    }

    WinJS.UI.Pages.define("/pages/home/home.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            window.vm = new viewModel();
            ko.applyBindings(vm);
        }
    });
})();
