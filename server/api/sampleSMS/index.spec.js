'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var sampleSMSCtrlStub = {
  index: 'sampleSMSCtrl.index',
  show: 'sampleSMSCtrl.show',
  create: 'sampleSMSCtrl.create',
  update: 'sampleSMSCtrl.update',
  destroy: 'sampleSMSCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var sampleSMSIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './sampleSMS.controller': sampleSMSCtrlStub
});

describe('SampleSMS API Router:', function() {

  it('should return an express router instance', function() {
    expect(sampleSMSIndex).to.equal(routerStub);
  });

  describe('GET /sendSMS', function() {
    console.log("<here></here>");
    return req;
  });

  describe('GET /sendSMS/:id', function() {
    console.log("here");
    it('should route to sampleSMS.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'sampleSMSCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /sendSMS', function() {

    it('should route to sampleSMS.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'sampleSMSCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /sendSMS/:id', function() {

    it('should route to sampleSMS.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'sampleSMSCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /sendSMS/:id', function() {

    it('should route to sampleSMS.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'sampleSMSCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /sendSMS/:id', function() {

    it('should route to sampleSMS.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'sampleSMSCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
