'use strict';

var app = require('../..');
import request from 'supertest';

var newSampleSMS;

describe('SampleSMS API:', function() {

  describe('GET /sendSMS', function() {
    var sampleSMSs;

    beforeEach(function(done) {
      request(app)
        .get('/sendSMS')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          sampleSMSs = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(sampleSMSs).to.be.instanceOf(Array);
    });

  });

  describe('POST /sendSMS', function() {
    beforeEach(function(done) {
      request(app)
        .post('/sendSMS')
        .send({
          name: 'New SampleSMS',
          info: 'This is the brand new sampleSMS!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newSampleSMS = res.body;
          done();
        });
    });

    it('should respond with the newly created sampleSMS', function() {
      expect(newSampleSMS.name).to.equal('New SampleSMS');
      expect(newSampleSMS.info).to.equal('This is the brand new sampleSMS!!!');
    });

  });

  describe('GET /sendSMS/:id', function() {
    var sampleSMS;

    beforeEach(function(done) {
      request(app)
        .get('/sendSMS/' + newSampleSMS._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          sampleSMS = res.body;
          done();
        });
    });

    afterEach(function() {
      sampleSMS = {};
    });

    it('should respond with the requested sampleSMS', function() {
      expect(sampleSMS.name).to.equal('New SampleSMS');
      expect(sampleSMS.info).to.equal('This is the brand new sampleSMS!!!');
    });

  });

  describe('PUT /sendSMS/:id', function() {
    var updatedSampleSMS;

    beforeEach(function(done) {
      request(app)
        .put('/sendSMS/' + newSampleSMS._id)
        .send({
          name: 'Updated SampleSMS',
          info: 'This is the updated sampleSMS!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedSampleSMS = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedSampleSMS = {};
    });

    it('should respond with the updated sampleSMS', function() {
      expect(updatedSampleSMS.name).to.equal('Updated SampleSMS');
      expect(updatedSampleSMS.info).to.equal('This is the updated sampleSMS!!!');
    });

  });

  describe('DELETE /sendSMS/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/sendSMS/' + newSampleSMS._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when sampleSMS does not exist', function(done) {
      request(app)
        .delete('/sendSMS/' + newSampleSMS._id)
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
