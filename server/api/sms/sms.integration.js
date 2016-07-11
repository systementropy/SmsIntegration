'use strict';

var app = require('../..');
import request from 'supertest';

var newSms;

describe('Sms API:', function() {

  describe('GET /n', function() {
    var smss;

    beforeEach(function(done) {
      request(app)
        .get('/n')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          smss = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(smss).to.be.instanceOf(Array);
    });

  });

  describe('POST /n', function() {
    beforeEach(function(done) {
      request(app)
        .post('/n')
        .send({
          name: 'New Sms',
          info: 'This is the brand new sms!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newSms = res.body;
          done();
        });
    });

    it('should respond with the newly created sms', function() {
      expect(newSms.name).to.equal('New Sms');
      expect(newSms.info).to.equal('This is the brand new sms!!!');
    });

  });

  describe('GET /n/:id', function() {
    var sms;

    beforeEach(function(done) {
      request(app)
        .get('/n/' + newSms._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          sms = res.body;
          done();
        });
    });

    afterEach(function() {
      sms = {};
    });

    it('should respond with the requested sms', function() {
      expect(sms.name).to.equal('New Sms');
      expect(sms.info).to.equal('This is the brand new sms!!!');
    });

  });

  describe('PUT /n/:id', function() {
    var updatedSms;

    beforeEach(function(done) {
      request(app)
        .put('/n/' + newSms._id)
        .send({
          name: 'Updated Sms',
          info: 'This is the updated sms!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedSms = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedSms = {};
    });

    it('should respond with the updated sms', function() {
      expect(updatedSms.name).to.equal('Updated Sms');
      expect(updatedSms.info).to.equal('This is the updated sms!!!');
    });

  });

  describe('DELETE /n/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/n/' + newSms._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when sms does not exist', function(done) {
      request(app)
        .delete('/n/' + newSms._id)
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
