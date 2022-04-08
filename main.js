(function() {
  "use strict";

  this.Datalyse = function(token) {

    let axiosDatalyse = require('axios');

    this.token=token;
    this.debug=false;
    this.onerror = function(error){
      console.log('DEFAULT ONERROR:',error);
    };

    this.api= function(method,params,onresult,onerror) {


      params.token = this.token;
      if (this.debug) {
        console.log("Datalyse: Opening request to https://app.datalyse.io/api/1.0/" +method + ".json");
      }

      axiosDatalyse.post("https://app.datalyse.io/api/1.0/" +method + ".json", params)
          .then(response => {
            return onresult(response.data);
          }).catch(error => {
        return onerror({
          status: 'error',
          message:error.message});
      });
      //console.log('apikey',apikey,' method',method,' vars',vars);
    }
  };
}).call(this);
