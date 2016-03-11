var parser = {
    "params": {
        "url": "",
        "token": "",
        "owned": "",
        "starred": "",
        "archived": "",
        "vis": ""
    },
    "fields": {
        "id": "",
        "name": "",
        "description": ""
    },
    "gl-api-url": "/api/v3/projects/",
    "response": "",
    getParams: function () {
        var params = "";

        //Get owned or starred projects
        if (parser.params.owned) {
            params += "owned";
        } else {
            if (parser.params.starred) {
                params += "starred";
            }
        }

        params += "?";

        //Is archived?
        if (parser.params.archived) {
            params += "archived=true&"
        }

        if (parser.params.vis) {
            params += "visibility=" + parser.params.vis;
        }

        return params;
    },
    parse: function () {
        if (parser.params.url === "") {
            notifications.show("Empty url");
            return false;
        }
        if (parser.params.token === "") {
            notifications.show("Empty token");
            return false;
        }

        var params = parser.getParams();
        var url = "https://" + parser.params.url + this["gl-api-url"] + params;
        showLoader();
        get(url,
            {
                "PRIVATE-TOKEN": parser.params.token
            },
            function (data) {
                hideLoader();
                try {
                    parser.response = data;
                    parser.response = JSON.parse(parser.response);
                    var info = [];
                    parser.response.forEach(function (item, index) {
                        var project = {};
                        for (var field in parser.fields) {
                            project[field] = item[field];
                        }
                        info[index] = project;
                    });
                    parser.show(info);
                } catch (err) {
                    console.log(err);
                    notifications.show("Can't parse json from response");
                }
            },
            function (code) {
                hideLoader();
                switch (code) {
                    case -100:
                        notifications.show("Connection error");
                        break;
                    case 401:
                        notifications.show("Bad token [401 error]");
                        break;
                    case 403:
                        notifications.show("Access denied [403 error]");
                        break;
                    case 404:
                        notifications.show("Gitlab api not found [404 error]");
                        break;
                    default:
                        notifications.show("Unknown error [" + code + "]");
                        break;
                }
            }
        )
    },
    show: function (projects) {
        //Check if it's empty response
        if (projects.length < 1) {
            notifications.show("No projects found");
            return false;
        }

        //Clear table
        var table = document.getElementById("result-content");
        while (table.firstChild) {
            table.removeChild(table.firstChild);
        }
        //Create table's head
        var thead = document.createElement('thead');
        var thead_row = document.createElement('tr');
        for (var field in parser.fields) {
            var cell = document.createElement('td');
            cell.textContent = field;
            thead_row.appendChild(cell);
        }
        thead.appendChild(thead_row);
        table.appendChild(thead);

        //Create projects list
        var tbody = document.createElement('tbody');
        projects.forEach(function (project, index) {
            var row = document.createElement('tr');
            for (var field in project) {
                var cell = document.createElement('td');
                cell.textContent = project[field];
                row.appendChild(cell);
            }
            tbody.appendChild(row);
        });
        table.appendChild(tbody);

        //Add close btn
        document.getElementById("result-close").addEventListener("click", parser.hide);

        //Show dark and table
        document.getElementById("result").classList.remove("hidden");
        document.getElementById("inputs-wrap").classList.add("hidden");
    },
    hide: function () {
        document.getElementById("result").classList.add("hidden");
        document.getElementById("inputs-wrap").classList.remove("hidden");
    }
};