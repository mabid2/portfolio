console.log('portfolio server controller');

var mongoose = require('mongoose');//a controller talk to mongoose and get a model

//we r exporting it to require it in config/routes.js
module.exports = {
  send_message : function(req, res){
    console.log('Yayyyyyyyyyyyyyyyyyyy');
    res.render('./client/message');
  }


}
