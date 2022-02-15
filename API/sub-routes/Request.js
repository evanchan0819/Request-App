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
        var RequestId = Request.RequestId
        var BodyData = null
        try {
            BodyData = JSON.stringify(AdditionalInfo.Body)
        } catch (error) {
            BodyData = AdditionalInfo.Body
        }
        var UrlObj = URL.parse(urlString);
        const options = {
          host: UrlObj.host,
          port: 443, //UrlObj.port,
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
            "body":result,
            "RequestId":RequestId
          };
          toReturn.push(RequestCallback);
          Done = Done + 1
          DoneSomething()
        }
        if (BodyData) {
            BodyData = BodyData
        } else {
            BodyData = null
        }
        httpRequest.getJSON(options,Callback,AdditionalInfo,BodyData)
      }
      req.body.Requests.forEach(forEachRequest)
    });
}
