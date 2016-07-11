'use strict';

import mongoose from 'mongoose';

var SmsSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

export default mongoose.model('Sms', SmsSchema);
