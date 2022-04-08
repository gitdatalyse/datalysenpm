# datalysenpm
To install this module type in the ssh console to the directory where you installed NodeJS:

npm install datalysenpm

You can view the account's api_token from Account Settings at https://app.datalyse.io/profile

  
Example for use:
```sh
var datalysenpm = require("datalysenpm"); 
var datalyse = new datalysenpm.Datalyse("YOUR_API_TOKEN_HERE");

    datalyse.api('sendsms/smsmt', {
    "to": "34666222333",
    "from": "Datalyse",
    "text": "hi world",
}, function (result) {
        console.log('Success', result);
    }, function (err) {
        console.log('Error', err);
});

``````
----------------------

More information in https://datalyse.io/en/developers_restapi/#nodejs/leads
