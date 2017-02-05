console.log('portfolio server controller');
var twiliokeys = require('../config/twiliokeys');
console.log("\n\n\n!!!!\nTWILIO KEYS:")
console.log(twiliokeys.SID, twiliokeys.token)
var client = require('twilio')(twiliokeys.SID, twiliokeys.token);
var mongoose = require('mongoose');//a controller talk to mongoose and get a model
var Subscriber = require('../models/Subscriber');

//we r exporting it to require it in config/routes.js
module.exports = {
  login : function(req, res){
    console.log('Yayyyyyyyyyyyyyyyyyyy');
    res.render('login');
  },
  send_message: function(req, res){
    console.log(req.body)
    if(req.body.user === twiliokeys.user && req.body.password === twiliokeys.password ){
      var admin = true;
      console.log("\n\n\n\n\n admin is", admin);
      res.render('message', { admin : admin });
    }
    else {
      res.redirect('/login');
    }
  },
  msg_portfolio: function(req, res){
    client.sendMessage({
      to : twiliokeys.myphone,
      from : twiliokeys.mytwiliophone,
      body : "This is a Message from your portfolio: Name: " + req.body.name+ " Email: "+ req.body.email+ " says: "+ req.body.message
    }, function(err, data){
      if(err){
        console.log("ERR", err);
      }
      else{
        console.log(data);
      }
    });
    res.send('Thank You, your messge was sent. Kamran will contact you as soon as possible.');
  },


  ////// COMES HERE WHEN SOMEONE TEXTS THE TWILIO NUMBER >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    // Create a function to handle Twilio SMS / MMS webhook requests
  webhook : function(request, response) {
      console.log('\n\n\n\n\n\n\n\n\n\n hi im in webhooks')
      // Get the user's phone number
      var phone = request.body.From;

      var msgFrom = request.body.From;
      var msgBody = request.body.Body;
      res.send(`
           <Response>
             <Message>
               Hello ${msgFrom}. You said: ${msgBody}
             </Message>
           </Response>
         `);

      // Try to find a subscriber with the given phone number
      // Subscriber.findOne({
      //     phone: phone
      // }, function(err, sub) {
      //     if (err) return respond('Derp! Please text back again later.');
      //
      //     if (!sub) {
      //         // If there's no subscriber associated with this phone number,
      //         // create one
      //         var newSubscriber = new Subscriber({
      //             phone: phone
      //         });
      //
      //         newSubscriber.save(function(err, newSub) {
      //             if (err || !newSub)
      //                 return respond('We couldn\'t sign you up - try again.');
      //
      //             // We're signed up but not subscribed - prompt to subscribe
      //             respond('Thanks for contacting us! Text "subscribe" to ' +
      //                 + 'receive updates via text message.');
      //         });
      //     } else {
      //         // For an existing user, process any input message they sent and
      //         // send back an appropriate message
      //         processMessage(sub);
      //     }
      // });
      //
      // // Process any message the user sent to us
      // function processMessage(subscriber) {
      //     // get the text message command sent by the user
      //     var msg = request.body.Body || '';
      //     msg = msg.toLowerCase().trim();
      //
      //     // Conditional logic to do different things based on the command from
      //     // the user
      //     if (msg === 'subscribe' || msg === 'unsubscribe') {
      //         // If the user has elected to subscribe for messages, flip the bit
      //         // and indicate that they have done so.
      //         subscriber.subscribed = msg === 'subscribe';
      //         subscriber.save(function(err) {
      //             if (err)
      //                 return respond('We could not subscribe you - please try '
      //                     + 'again.');
      //
      //             // Otherwise, our subscription has been updated
      //             var responseMessage = 'You are now subscribed for updates.';
      //             if (!subscriber.subscribed)
      //                 responseMessage = 'You have unsubscribed. Text "subscribe"'
      //                     + ' to start receiving updates again.';
      //
      //             respond(responseMessage);
      //         });
      //     } else {
      //         // If we don't recognize the command, text back with the list of
      //         // available commands
      //         var responseMessage = 'Sorry, we didn\'t understand that. '
      //             + 'available commands are: subscribe or unsubscribe';
      //
      //         respond(responseMessage);
      //     }
      // }
      //
      // // Set Content-Type response header and render XML (TwiML) response in a
      // // Jade template - sends a text message back to user
      // function respond(message) {
      //     response.type('text/xml');
      //     response.render('twiml', {
      //         message: message
      //     });
      // }
  },

    // Handle form submission   SEND SUBSCRIBERS MESSAGE>>>>>>>>>>>>>>>>>>>>>
  sendMessages : function(request, response) {
      // Get message info from form submission
      var message = request.body.message;
      var imageUrl = request.body.imageUrl;

      // Use model function to send messages to all subscribers
      Subscriber.sendMessage(message, imageUrl, function(err) {
          if (err) {
              request.flash('errors', err.message);
          } else {
              request.flash('successes', 'Messages on their way!');
          }

          response.redirect('/');
      });
  }

}
