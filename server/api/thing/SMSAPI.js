var accountSid = 'AC31314953aaf04475c4c7b83e45c6f531'; 
var authToken = '[49c6a0b170237c62eed6fd498ce56cc6]'; 
 
//require the Twilio module and create a REST client 
var client = require('twilio')(accountSid, authToken); 
 
client.messages.create({ 
    to: "+16518675309", 
    from: "+14158141829", 
    body: "Hey Jenny! Good luck on the bar exam!", 
    mediaUrl: "http://farm2.static.flickr.com/1075/1404618563_3ed9a44a3a.jpg",  
}, function(err, message) { 
    console.log(message.sid); 
});