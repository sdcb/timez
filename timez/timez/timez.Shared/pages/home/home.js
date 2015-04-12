(function () {
    "use strict";

    var tz = new TimezApp.TimeZ();

    function viewModel() {
        var me = this;
        this.tz = tz;

        this.add = function() {
            WinJS.Navigation.navigate('/pages/settings/settings.html', {tz: me.tz});
        }
        this.drop = function (data) {
            var popups = Windows.UI.Popups;
            var confirm = new popups.MessageDialog('确定要删除此项吗？', '确认');
            confirm.commands.append(new popups.UICommand('确定', function() {
                me.tz.drop(data);
            }));
            confirm.commands.append(new popups.UICommand('取消'));
            confirm.showAsync();
        }
        this.edit = function(data) {
            WinJS.Navigation.navigate('/pages/settings/settings.html', { tz: me.tz, data: data });
        }
    }

    WinJS.UI.Pages.define("/pages/home/home.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            window.vm = new viewModel();
            ko.applyBindings(vm, element);
            document.getElementById("appbar").winControl.disabled = false;
        },
        unload: function () {
            ko.cleanNode(this.element);
        }
    });
})();
