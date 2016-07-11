/**
 * SMS model events
 */

'use strict';

import {EventEmitter} from 'events';
import SMS from './SMS.model';
var SMSEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
SMSEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  SMS.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    SMSEvents.emit(event + ':' + doc._id, doc);
    SMSEvents.emit(event, doc);
  }
}

export default SMSEvents;
