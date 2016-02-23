// get the things we need
var express      = require('express');
var app          = express();
var path         = require('path');
var massMailer   = require('./massMailer');
var listofemails = ['sittshein@gmail.com', 'sittshein.jr@gmail.com'];
var port         = Number(process.env.PORT || 3000);

// set the public folder to serve public assets
app.use(express.static(__dirname + '/public'));

// set up our one route to the index.html file
app.get('*', function(req, res) {
	res.sendFile(path.join(__dirname + '/public/views/index.html'));
});

// setup e-mail data 
var mailOptions  = {
	from: 'sittshein.app.developer@gmail.com',
	to: null,
	subject: 'Hi, This is from Async script',
	text: 'Hello World!',
	html: '<h1>Hello World!<h1>'
};


// var start = new massMailer(listofemails, mailOptions);

// if (start) {
// 	console.log('Success!.');
// } else {
// 	console.log('Operation went wrong. Abort sending!');
// }

app.listen(port);
console.log('Server listens to port ' + port);