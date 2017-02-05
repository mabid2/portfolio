var path = require('path');
var portfolio = require('../controllers/portfolio.js')//we can get functions from portfolio

module.exports = function(app){

app.get('/', function(req, res){
  res.render('index')
}),

app.post('/msg_portfolio', portfolio.msg_portfolio);

app.get('/login', portfolio.login);
app.post('/sendmessage', portfolio.send_message);



	//// Send Messages to Subscribers
app.post('/message/send', portfolio.sendMessages);

/// Incoming Message
// app.post('/message', function(req, res){
// console.log("\n\n\n\n\n Working ")
// portfolio.webhook;
// });

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

		// TEST MESSAGE>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
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
