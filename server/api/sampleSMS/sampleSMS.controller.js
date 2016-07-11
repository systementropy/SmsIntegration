/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /sendSMS              ->  index
 * POST    /sendSMS              ->  create
 * GET     /sendSMS/:id          ->  show
 * PUT     /sendSMS/:id          ->  update
 * DELETE  /sendSMS/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import SampleSMS from './sampleSMS.model';
var accountSid = 'ACf811d26af05c6f23e0f7509bca2ade35'; 
var authToken = 'a13ee97d0efc49eff6627373db49b9f2';
var client = require('twilio')(accountSid, authToken);
var url  = require('url');

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.save()
      .then(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of SampleSMSs
export function index(req, res) {
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;

    console.log(query);
    
    client.sms.messages.create({
       to:'+918882767939',
       from:'+13347210622',
       body: query.msgBody
    }, function(error, message) {
       if (!error) {
           return res.status(200).json({status: 'Successful!'});
       } else {
           return res.status(500).json({status: 'Unsuccessful!'});
       }
    });
    
}

// Gets a single SampleSMS from the DB
export function show(req, res) {
  return SampleSMS.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new SampleSMS in the DB
export function create(req, res) {
  return SampleSMS.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing SampleSMS in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return SampleSMS.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a SampleSMS from the DB
export function destroy(req, res) {
  return SampleSMS.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
