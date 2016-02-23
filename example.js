var nodemailer = require("nodemailer");
// Pipes all messages to stdout
function MyTransport(options){
    this.options = options;
}
MyTransport.prototype.sendMail = function(emailMessage, callback) {
    console.log("Envelope: ", emailMessage.getEnvelope());
    emailMessage.pipe(process.stdout);
    emailMessage.on("error", function(err){
        callback(err);
    });
    emailMessage.on("end", function(){
        callback(null, {
            messageId: emailMessage._messageId
        });
    });
    // everything set up, start streaming
    emailMessage.streamMessage();
};
// Use MyTransport as the transport method
var transport = nodemailer.createTransport(MyTransport, {
    name: "Matrix", // hostname for generating Message-ID values
    host: "smtp.gmail.com", // hostname
    secureConnection: true, // use SSL
    port: 465, // port for secure SMTP
    auth: {
        user: "sittshein.app.developer@gmail.com",
        pass: "repolevedapp"
    }
});
transport.sendMail({
    from: "sittshein.app.developer@gmail.com",
    to: "sittshein@gmail.com",
    subject: "hello",
    text: "world"
}, function(err, response){
    console.log(err || response);
});