(function() {
"use strict";

this.Datalyse = function() {
    
  var https = require('https'),
  OPTS = {
    host: 'app.datalyse.io',
    port: 443,
    prefix: '/api/1.0/',
    method: 'POST',
    rejectUnauthorized: false,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
     'User-Agent': 'DatalyseNPM-Node/1.0.41'
    }
  },
  req;
  this.debug=false;
  this.onerror = function(error){
  console.log('DEFAULT ONERROR:',error);
  };
    
    this.api= function(method,params,onresult,onerror) {
        
    
      params = new Buffer(JSON.stringify(params), 'utf8');
      if (this.debug) {
        console.log("Datalyse: Opening request to https://" + OPTS.host + OPTS.prefix + method + ".json");
      }
      OPTS.path = "" + OPTS.prefix + method + ".json";
      OPTS.headers['Content-Length'] = params.length;
      req = https.request(OPTS, (function(_this) {
        return function(res) {
          var json;
          res.setEncoding('utf8');
          json = '';
          res.on('data', function(d) {
            return json += d;
          });
          return res.on('end', function() {
            var e;
            try {
              json = JSON.parse(json);
            } catch (_error) {
              e = _error;
              json = {
                status: 'error',
                name: 'GeneralError',
                message: e
              };
            }
            if (json == null) {
              json = {
                status: 'error',
                name: 'GeneralError',
                message: 'An unexpected error occurred'
              };
            }
            if (res.statusCode !== 200) {
              if (onerror) {
                return onerror(json);
              } else {
                return _this.onerror(json);
              }
            } else {
              if (onresult) {
                return onresult(json);
              }
            }
          });
        };
      })(this));
      req.write(params);
      req.end();
      req.on('error', (function(_this) {
        return function(e) {
          if (onerror) {
            return onerror(e);
          } else {
            return _this.onerror({
              status: 'error',
              name: 'GeneralError',
              message: e
            });
          }
        };
      })(this));
      return null;
    //console.log('apikey',apikey,' method',method,' vars',vars);
    }
  };
}).call(this);
