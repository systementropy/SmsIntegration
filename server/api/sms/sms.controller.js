/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /n              ->  index
 * POST    /n              ->  create
 * GET     /n/:id          ->  show
 * PUT     /n/:id          ->  update
 * DELETE  /n/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Sms from './sms.model';

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

// Gets a list of Smss
export function index(req, res) {
  return Sms.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Sms from the DB
export function show(req, res) {
  return Sms.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Sms in the DB
export function create(req, res) {
  return Sms.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing Sms in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Sms.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Sms from the DB
export function destroy(req, res) {
  return Sms.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
