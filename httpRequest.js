const http = require('http');
const https = require('https');

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

module.exports.getJSON = (options, onResult,additionalInfo,BodyData) => {
  const port = options.port == 443 ? https : http;

  let output = '';

  const req = port.request(options, (res) => {
    res.setEncoding('utf8');

    res.on('data', (chunk) => {
      output += chunk;
    });

    res.on('end', () => {
      let obj = null;
      if (testJSON(output) == true) {
        obj = JSON.parse(output);
      }
      if (testJSON(output) == false) {
        obj = output;
      }
      
      onResult(res.headers,res.statusCode, output,res.statusMessage);
    });
  });

  req.on('error', (err) => {
    // res.send('error: ' + err.message);
  });

    if (BodyData) {
        req.write(BodyData);
    }
  
  req.end();
};
