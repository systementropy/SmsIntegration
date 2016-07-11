'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var SMSCtrlStub = {
  index: 'SMSCtrl.index',
  show: 'SMSCtrl.show',
  create: 'SMSCtrl.create',
  update: 'SMSCtrl.update',
  destroy: 'SMSCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var SMSIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './SMS.controller': SMSCtrlStub
});

describe('SMS API Router:', function() {

  it('should return an express router instance', function() {
    expect(SMSIndex).to.equal(routerStub);
  });

  describe('GET /Y', function() {

    it('should route to SMS.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'SMSCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /Y/:id', function() {

    it('should route to SMS.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'SMSCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /Y', function() {

    it('should route to SMS.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'SMSCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /Y/:id', function() {

    it('should route to SMS.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'SMSCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /Y/:id', function() {

    it('should route to SMS.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'SMSCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /Y/:id', function() {

    it('should route to SMS.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'SMSCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
