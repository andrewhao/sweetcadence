var rewire               = require('rewire'),
    AppController        = rewire('../src/appController'),
    AccelerometerManager = require('../src/accelerometerManager'),
    assert               = require('assert'),
    EventEmitter         = require('events').EventEmitter,
    sinon                = require('sinon');


describe('AppController', function() {
  beforeEach(function() {
    this.accelManager = {}
    this.subject = new AppController(this.accelManager);
  });

  describe('#init', function() {
    it("sets up signals", function() {

    });
  });
});
