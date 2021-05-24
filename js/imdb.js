
if (!String.prototype.format) {
    String.prototype.format = function (...args) {
        return this.replace(/(\{\d+\})/g, function (a) {
            return args[+(a.substr(1, a.length - 2)) || 0];
        });
    };
}

function CreateTitle(title, div) {
    var title_elem = document.createElement("p");
    title_elem.innerText = title;
    div.appendChild(title_elem);
}

function CreateIMDbLink(id, div) {
    var id_elem = document.createElement("a");
    id_elem.innerText = "IMDb";
    id_elem.href = "https://www.imdb.com/title/{0}".format(id);
    div.appendChild(id_elem);
}

function CreateVidsrcLink(id, div, is_series) {
    var id_elem = document.createElement("a");
    id_elem.innerText = "Vidsrc";
    id_elem.href = "https://v2.vidsrc.me/embed/{0}/{1}".format(id, (is_series) ? "1-1" : "");
    div.appendChild(id_elem);
}

function updateList(json) {
    var div = document.getElementById("text");
    div.innerHTML = "";

    json["d"].forEach(value => {
        var type = value["q"]
        if (type == "feature") {
            CreateTitle(value["l"], div);
            CreateIMDbLink(value["id"], div);
            CreateVidsrcLink(value["id"], div, false);
        }
        else if (type == "TV series" || type == "TV mini-series") {
            CreateTitle(value["l"], div);
            CreateIMDbLink(value["id"], div);
            CreateVidsrcLink(value["id"], div, true);
        }
    });
}

function showData(form) {
    var query_data = form.inputbox.value;
    var formatted_data = query_data.replace(" ", "%20");
    var formatted_url = "https://sg.media-imdb.com/suggests/{0}/{1}.json".format(formatted_data[0].toLowerCase(), formatted_data);

    var function_name = "imdb$" + query_data.replace(" ", "_");
    window[function_name] = function (data) {
        updateList(data);
    }

    $.ajax({
        url: formatted_url,
        crossDomain: true,
        dataType: "jsonp"
    });

    // alert(formatted_url);
}