var path = require('path');
var portfolio = require('../controllers/portfolio.js')//we can get functions from portfolio
var twiliokeys = require('./twiliokeys.js')
console.log("\n\n\n!!!!\nTWILIO KEYS:")
console.log(twiliokeys.SID, twiliokeys.token)
var client = require('twilio')(twiliokeys.SID, twiliokeys.token);
module.exports = function(app){
	app.get('/portfolio', function(req, res) {
		console.log('/portfolio')
   		portfolio.index(req,res)

	})

app.get('/', function(req, res){
  res.render('index')
}),

app.post('/msg_portfolio', function(req, res){
  client.sendMessage({
    to : "+15108338227",
    from : "+15102463557",
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
});

app.get('/sendmessage', portfolio.send_message);

// app.get('/test', function(req, res){
//   client.sendMessage({
//     to : "+15108338227",
//     from : "+15102463557",
//     body : "This is Kamran"
//   }, function(err, data){
//     if(err){
//       console.log("ERR", err);
//     }
//     else{
//       console.log(data);
//     }
//   });
// });

app.post('/message', function(req, res){
  console.log(req.body);
  var msgFrom = req.body.From;
  var msgBody = req.body.Body;

  res.send(`
    <Response>
      <Message>
        Hello ${msgFrom}. You said: ${msgBody}
      </Message>
    </Response>
  `);
});



// app.get('/portfolio/new', function(req, res) {
//     // This is where we will retrieve the users from the database and include them in the view page we will be rendering.
//     	console.log('INSIDE OF THE /NEW GET ROUTE')
//     	res.render('new');


// })

app.get('/portfolio/:id', function(req, res) {
    console.log('portfolio/:id GET route. Rendering SHOW page');
   portfolio.show(req,res);
})

}
