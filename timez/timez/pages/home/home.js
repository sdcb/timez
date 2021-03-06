﻿/// <reference path="../../WinJS/js/WinJS.js" />
// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/home/home.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.
            var vm = new ViewModel();
            ko.applyBindings(vm);
        },

        unload: function () {
            // TODO: Respond to navigations away from this page.
        },

        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

            // TODO: Respond to changes in layout.
        }
    });

    function ViewModel() {
        var me = this;
        this.dowork = function () {
            WinJS.Navigation.navigate('/pages/home2/home2.html');
        }
    }
    
})();
