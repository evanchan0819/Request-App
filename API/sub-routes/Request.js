const httpRequest = require('../../httpRequest');
const URL = require('url')

module.exports = function(app){
    app.post('/Request', async function(req, res){
      let toReturn = [];
      let ToDo = 0
      let Done = 0
      function DoneSomething(){
        if (Done == ToDo) {
          res.json(toReturn)
         } 
      }
      function forEachRequest(Request){
        var urlString = Request.RequestUrl
        var AdditionalInfo = Request.AdditionalInfo
        var Headers = Request.Headers
        var UrlObj = URL.parse(urlString);
        const options = {
          host: UrlObj.host,
          port: 80, //UrlObj.port,
          path: UrlObj.path,
          method: AdditionalInfo.Method,
          headers: Headers
        };
        ToDo = ToDo + 1
        var Callback = function(header,statusCode, result,statusMessage){
          const RequestCallback = {
            "headers":header,
            "statusCode":statusCode,
            "statusMessage":statusMessage,
            "body":result
          };
          toReturn.push(RequestCallback);
          Done = Done + 1
          DoneSomething()
        }
        httpRequest.getJSON(options,Callback,AdditionalInfo)
      }
      req.body.Requests.forEach(forEachRequest)
    });
}
