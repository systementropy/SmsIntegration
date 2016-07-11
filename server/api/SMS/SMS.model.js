'use strict';

import mongoose from 'mongoose';

var SMSSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

export default mongoose.model('SMS', SMSSchema);
