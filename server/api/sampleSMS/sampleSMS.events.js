/**
 * SampleSMS model events
 */

'use strict';

import {EventEmitter} from 'events';
import SampleSMS from './sampleSMS.model';
var SampleSMSEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
SampleSMSEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  SampleSMS.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    SampleSMSEvents.emit(event + ':' + doc._id, doc);
    SampleSMSEvents.emit(event, doc);
  }
}

export default SampleSMSEvents;
