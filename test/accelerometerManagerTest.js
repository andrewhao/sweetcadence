var rewire               = require('rewire'),
    AccelerometerManager = rewire('../src/accelerometerManager'),
    assert               = require('assert'),
    EventEmitter         = require('events').EventEmitter,
    sinon                = require('sinon');

describe('AccelerometerManager', function() {
  beforeEach(function() {
    this.fakeAccel = {
      config: function(){},
      init: function(){},
      off: function(){},
      on: function(){}
    };
    this.subject = new AccelerometerManager(this.fakeAccel);
  });

  describe('#init', function() {
    it('initializes the Accel lib', function() {
      var mockAccel = sinon.mock(this.fakeAccel);
      mockAccel.expects('config');
      mockAccel.expects('init');

      this.subject.init();
      assert(mockAccel.verify());
    });

    it('rolls in defaults', function() {
      var defaults = { rate: 10, samples: 25 }
      var mockAccel = sinon.mock(this.fakeAccel);
      mockAccel.expects('config').withArgs(defaults);
      this.subject.init()
      assert(mockAccel.verify());
    });
  });

  describe('#stopRecording', function() {
    it('passes to the Accel lib', function() {
      var mockAccel = sinon.mock(this.fakeAccel);
      mockAccel.expects('off');
      this.subject.stopRecording()
      assert(mockAccel.verify());
    });
  });

  describe('#startRecording', function() {
    it('returns a stream of cadence events through QuickCadence', function() {
      var stubStream = "some stream"
      var stubQuickCadence = {
        pipe: function() { return stubStream; }
      };

      AccelerometerManager.__set__("QuickCadence", stubQuickCadence);

      output = this.subject.startRecording();
      assert.equal(output, stubStream);
    });

    it('sources events from the Accel library data event', function(done) {
      var fakeAccel = new EventEmitter();
      var subject = new AccelerometerManager(fakeAccel);

      var dataOne = { x: 1, y: 1, z: 1 }

      // QuickCadence library becomes a passthru lib, for now.
      var nullQuickCadence = { pipe: function(stream) { return stream; } }
      AccelerometerManager.__set__("QuickCadence", nullQuickCadence)

      var outputStream = subject.startRecording();

      outputStream.onValue(function(v) {
        assert.equal(v, dataOne);
        done();
      });

      fakeAccel.emit('data', { accel: dataOne });
    });
  });
});
