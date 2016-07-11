/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /Y              ->  index
 * POST    /Y              ->  create
 * GET     /Y/:id          ->  show
 * PUT     /Y/:id          ->  update
 * DELETE  /Y/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import SMS from './SMS.model';

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

// Gets a list of SMSs
export function index(req, res) {
  return SMS.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single SMS from the DB
export function show(req, res) {
  return SMS.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new SMS in the DB
export function create(req, res) {
  return SMS.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Updates an existing SMS in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return SMS.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a SMS from the DB
export function destroy(req, res) {
  return SMS.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
