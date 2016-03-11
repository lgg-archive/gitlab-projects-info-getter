var notifications = {
    "elem": "",
    init: function () {
        this.elem = document.getElementById("info");
    },
    show: function (mess) {
        'use strict';
        var data = {message: mess};
        this.elem.MaterialSnackbar.showSnackbar(data);
    }
};