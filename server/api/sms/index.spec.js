'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var smsCtrlStub = {
  index: 'smsCtrl.index',
  show: 'smsCtrl.show',
  create: 'smsCtrl.create',
  update: 'smsCtrl.update',
  destroy: 'smsCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var smsIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './sms.controller': smsCtrlStub
});

describe('Sms API Router:', function() {

  it('should return an express router instance', function() {
    expect(smsIndex).to.equal(routerStub);
  });

  describe('GET /n', function() {

    it('should route to sms.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'smsCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /n/:id', function() {

    it('should route to sms.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'smsCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /n', function() {

    it('should route to sms.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'smsCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /n/:id', function() {

    it('should route to sms.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'smsCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /n/:id', function() {

    it('should route to sms.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'smsCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /n/:id', function() {

    it('should route to sms.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'smsCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
