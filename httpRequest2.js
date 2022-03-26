const fetch = require('node-fetch')

/**
 * getJSON:  RESTful GET request returning JSON object(s)
 * @param options: http options object
 * @param callback: callback to pass the results JSON object(s) back
 */

async function Request(url, method, headers, body) {
    if (method == "POST") {
        return await fetch(url, {
            method: 'post',
            body: body, //bodyString,
            headers: headers,
        })
    } else {
        return await fetch(url, {
            method: 'GET',
            headers: headers,
        })
    }
}

module.exports.getJSON = async (RequestId, url, method, headers, body) => {
    var response = null
    var Headers = null
    var ResultBody = null
    var Success = null
    try {
        var response = await Request(url, method, headers, body)
        var Headers = await response.headers.raw()
        var ResultBody = await response.text()
        Success = true
    } catch (error) {
        Success = false
    }
    if (Success == true) {
        try {
            var Result = JSON.parse(ResultBody)
            ResultBody = Result
        } catch (error) {
            ResultBody = ResultBody
        }
        return {
            "headers": Headers,
            "success": response.ok,
            "statusCode": response.status,
            "statusMessage": response.statusText,
            "body": ResultBody,
            "RequestId": RequestId
        }
    } else {
        return {
            "headers": null,
            "success": false,
            "statusCode": 0,
            "statusMessage": "ServerError",
            "body": null,
            "RequestId": RequestId
        }
    }
};
