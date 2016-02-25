// Wraps around the Accel library and provides higher-level event stream.
var Bacon = require('./js/vendor/bacon'),
    RxCadence = require('./js/RxCadence').default,
    inspect = require('./js/vendor/objectInspect'),
    Rx = require('./js/vendor/rx.all');

var AccelerometerManager = function(accel, config) {
  this.config = config || {rate: 10, samples: 25};
  this.accel = accel;
};

AccelerometerManager.prototype = {
  init: function() {
    this.accel.config(this.config);
    this.accel.init();
    this._startRecording();
  },

  /**
   * Returns a Stream of events
   * @return Bacon.EventStream Stream of Floats representing cadence counts
   */
  getCadenceStream: function() {
    return this.cadenceStream;
  },

  /**
   * Sets up and connects the accelerometer events to a stream.
   * @param Function callback
   */
  _startRecording: function() {
    var dataStream = Rx.Observable.fromEvent(this.accel, 'data')
    .map(function(v) { return v.accel })
    this.cadenceStream = RxCadence.pipe(dataStream)
    return this.cadenceStream;
  },
};

module.exports = AccelerometerManager;
