var inputs = {
    "forms": {
        "url": "",
        "token": "",
        "owned": "",
        "starred": "",
        "archived": "",
        "vis": {
            "vis-all": "",
            "vis-pub": "",
            "vis-int": "",
            "vis-pr": ""
        }
    },
    init: function () {
        //Parse input forms
        for (var index in this["forms"]) {
            if (index === "vis") {
                for (var vindex in this["forms"]["vis"]) {
                    this["forms"]["vis"][vindex] = document.getElementById(vindex);
                }
            } else {
                this["forms"][index] = document.getElementById(index);
            }
        }

        //Bind event
        document.getElementById("parse").addEventListener("click", this.start);
        document.getElementById("url").addEventListener("keypress", this.key);
        document.getElementById("token").addEventListener("keypress", this.key);
    },
    key: function (event) {
        if (event.which == 13 || event.keyCode == 13) {
            inputs.start();
            return false;
        }
        return true;
    },
    start: function () {
        'use strict';
        for (var index in parser.params) {
            switch (index) {
                case "vis":
                    for (var vindex in inputs["forms"]["vis"]) {
                        if (inputs["forms"]["vis"][vindex].checked) {
                            parser.params.vis = inputs["forms"]["vis"][vindex].value;
                            break;
                        }
                    }
                    break;
                case "token":
                    parser.params[index] = inputs.forms[index].value;
                    break;
                case "url":
                    var url = inputs.forms[index].value;
                    if (url.indexOf("//") > -1) {
                        url = url.substr(url.indexOf("//") + 2, url.length);
                    }
                    parser.params[index] = url;
                    break;
                default:
                    parser.params[index] = inputs.forms[index].checked;
                    break;
            }
        }
        parser.parse();
    }
};