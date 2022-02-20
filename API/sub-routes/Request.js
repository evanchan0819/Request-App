const httpRequest = require('../../httpRequest2');
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
      async function forEachRequest(Request){
        var urlString = Request.RequestUrl
        var AdditionalInfo = Request.AdditionalInfo
        var Headers = Request.Headers
        var RequestId = Request.RequestId
        var BodyData = AdditionalInfo.Body
        ToDo = ToDo + 1
        var result = httpRequest.getJSON(RequestId,urlString,AdditionalInfo.Method,Headers,BodyData)
        result = await result
        toReturn.push(result)
        Done = Done + 1
        DoneSomething()
      }
      req.body.Requests.forEach(forEachRequest)
    });
}
