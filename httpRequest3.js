const fetch = require('node-fetch')
const FormData = require('form-data');
const { URLSearchParams } = require('url');

/**
 * getJSON:  RESTful GET request returning JSON object(s)
 * @param options: http options object
 * @param callback: callback to pass the results JSON object(s) back
 */

function testJSON(text){
    if (typeof text!=="string"){
        return false;
    }
    try{
        var json = JSON.parse(text);
        return (typeof json === 'object');
    }
    catch (error){
        return false;
    }
}

var CreateForm = function(body){
  var NewBody = null
  if (body) {
    try {
      NewBody = JSON.parse(body)
    } catch (error){
      NewBody = body
    }
  } else {
    NewBody = null
  }
  try {
    if (body) {
      var form = new URLSearchParams(body);
      //body.forEach(([value, index]) => {
      for (const index in NewBody) {
        var value = NewBody[index]
        console.log("Index: "+index)
        console.log("Value: "+value)
      //body.forEach(([value, index]) => {
	      form.append(index, value);
      };
      return form
    }
  }
  catch (error) {
    console.log("Error Message: "+error.message);
    return null
  }
}

module.exports.getJSON = async (RequestId,url,method,headers,body) => {
  var newBody = null
  try {
    newBody = JSON.stringify(body)
  }
  catch (error) {
    newBody = body
  }
  const Form = CreateForm(body)
  var response = null
  if (method == "GET") {
    response = await fetch(url,{
	    method: method,
      headers: headers,
    })
  }
  else {
    response = await fetch(url,{
	    method: method,
      body:    Form,//newBody,
      headers: headers,
    })
  }
  var Headers = await response.headers.raw()
  var ResultBody = await response.text()
  try {
    var Result = JSON.parse(ResultBody)
    ResultBody = Result
  }
  catch (error) {
    ResultBody = ResultBody
  }
  return {
    "headers":Headers,
    "success":response.ok,
    "statusCode":response.status,
    "statusMessage":response.statusText,
    "body":ResultBody,
    "RequestId":RequestId
  }
};
