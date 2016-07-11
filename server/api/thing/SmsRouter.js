'use strict';

import express from 'express';
import mongoose from 'mongoose';

var accountSid = 'AC31314953aaf04475c4c7b83e45c6f531'; 
var authToken = '[49c6a0b170237c62eed6fd498ce56cc6]'; 
var client = require('twilio')(accountSid, authToken); 
var bodyParser = require('body-parser');

var smsRouter = express.Router();

smsRouter.use(bodyParser.json());

smsRouter.route('/')
.get(function (req, res, next) {
    client.messages.create({ 
	    to: "+918882767939", 
	    from: "+14158141829", 
	    body: "Hey Jenny! Good luck on the bar exam!",
	}, function(err, message) { 
	    console.log(message.sid); 
	});
	res.status(200).json({
		status: 'Login successful!',
		success: true,
	});
})

.post(function (req, res, next) {	 
	client.messages.create({ 
	    to: "+918882767939", 
	    from: "+14158141829", 
	    body: "Hey Jenny! Good luck on the bar exam!",
	}, function(err, message) { 
	    console.log(message.sid); 
	});
})

module.exports = smsRouter;