
if (!String.prototype.format) {
    String.prototype.format = function (...args) {
        return this.replace(/(\{\d+\})/g, function (a) {
            return args[+(a.substr(1, a.length - 2)) || 0];
        });
    };
}

function foo(data) {
    alert(data);
}

function imdb$Indiana_Jones() {
    alert("indiana jones")
}

function showData(form) {
    var query_data = form.inputbox.value;
    query_data = query_data.replace(" ", "%20");
    var formatted_url = "https://sg.media-imdb.com/suggests/{0}/{1}.json".format(query_data[0].toLowerCase(), query_data);

    $.ajax({
        url: formatted_url,
        crossDomain: true,
        dataType: "jsonp",
    });

    // alert(formatted_url);
}