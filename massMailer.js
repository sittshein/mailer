var async         = require('async');
var nodemailer    = require('nodemailer');
var auth_user     = 'sittshein.app.developer@gmail.com';
var auth_pass     = 'repolevedapp';
var success_email = [];
var failure_email = [];
var _listofemails = [];
var _mailOptions  = {};


// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport({
	service: 'Gmail',
	auth: {
		user: auth_user,
		pass: auth_pass
	}
});


function massMailer(listofemails, mailOptions) {
	_listofemails = listofemails;
	_mailOptions = mailOptions;
	
	console.log('InvokeOperation started....');
	this.invokeOperation();
};

massMailer.prototype.invokeOperation = function() {
	var self = this;

	async.each(_listofemails, self.send, function() {
		console.log('Succefully sent: ' + success_email);
		console.log('Failure to send: ' + failure_email);
	});
};

massMailer.prototype.send = function(Email, callback) {
	var self = this;
	self.status = false;
	
	console.log('Sending email to ' + Email);
	async.waterfall(
		[
			function(callback) {
				_mailOptions.to = Email;
				setTimeout(
					transporter.sendMail(_mailOptions, function(err, info) {
						if (err) {
							console.log(err);
							failure_email.push(Email);
						} else {
							self.status = true;
							success_email.push(Email);
						}
						callback(null, self.status, Email);
					})
				, 1000);
			},
			function(statusCode, Email, callback) {
				console.log('Will update DB here for '+ Email + ' with ' + statusCode);
				callback();
			}

		], function() {
		callback();
	});
};

module.exports = massMailer;