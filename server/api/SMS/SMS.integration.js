'use strict';

var app = require('../..');
import request from 'supertest';

var newSMS;

describe('SMS API:', function() {

  describe('GET /Y', function() {
    var SMSs;

    beforeEach(function(done) {
      request(app)
        .get('/Y')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          SMSs = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(SMSs).to.be.instanceOf(Array);
    });

  });

  describe('POST /Y', function() {
    beforeEach(function(done) {
      request(app)
        .post('/Y')
        .send({
          name: 'New SMS',
          info: 'This is the brand new SMS!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newSMS = res.body;
          done();
        });
    });

    it('should respond with the newly created SMS', function() {
      expect(newSMS.name).to.equal('New SMS');
      expect(newSMS.info).to.equal('This is the brand new SMS!!!');
    });

  });

  describe('GET /Y/:id', function() {
    var SMS;

    beforeEach(function(done) {
      request(app)
        .get('/Y/' + newSMS._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          SMS = res.body;
          done();
        });
    });

    afterEach(function() {
      SMS = {};
    });

    it('should respond with the requested SMS', function() {
      expect(SMS.name).to.equal('New SMS');
      expect(SMS.info).to.equal('This is the brand new SMS!!!');
    });

  });

  describe('PUT /Y/:id', function() {
    var updatedSMS;

    beforeEach(function(done) {
      request(app)
        .put('/Y/' + newSMS._id)
        .send({
          name: 'Updated SMS',
          info: 'This is the updated SMS!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedSMS = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedSMS = {};
    });

    it('should respond with the updated SMS', function() {
      expect(updatedSMS.name).to.equal('Updated SMS');
      expect(updatedSMS.info).to.equal('This is the updated SMS!!!');
    });

  });

  describe('DELETE /Y/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/Y/' + newSMS._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when SMS does not exist', function(done) {
      request(app)
        .delete('/Y/' + newSMS._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
