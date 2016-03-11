/**
 * Make get request on url
 * @param url
 * @param headers - object of headers
 * @param success - func will be called on success with response text
 * @param fail - func will be called on fail with response status
 */
function get(url, headers, success, fail) {

    var request = new XMLHttpRequest();

    request.open('GET', url, true);

    for (var header in headers) {
        request.setRequestHeader(header, headers[header]);
    }

    request.onload = function () {
        if (this.status >= 200 && this.status < 400) {
            success(this.response);
        } else {
            fail(this.status);
        }
    };

    request.onerror = function () {
        fail(-100);
    };

    request.send();
}