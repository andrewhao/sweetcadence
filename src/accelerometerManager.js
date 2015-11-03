// Wraps around the Accel library and provides higher-level event stream.
var Bacon = require('./js/vendor/bacon'),
    QuickCadence = require('./js/quickCadence'),
    inspect = require('./js/vendor/objectInspect');

var AccelerometerManager = function(accel, config) {
  this.config = config || {rate: 10, samples: 25};
  this.accel = accel;
};

AccelerometerManager.prototype = {
  init: function() {
    this.accel.config(this.config);
    this.accel.init();
  },

  /**
   * Call this once to stop events.
   * @param Function callback
   */
  stopRecording: function() {
    return this.accel.off();
  },

  /**
   * Sets up and connects the accelerometer events to a stream.
   * @param Function callback
   */
  startRecording: function() {
    var dataStream = Bacon.fromEvent(this.accel, 'data').map('.accel')
    this.cadenceStream = QuickCadence.pipe(dataStream);
    return this.cadenceStream;
  },

  /**
   * Register a callback.
   * @param  Function   callback A function callback,
   *                             taking a Float cadence value.
   * @return Observable Bacon.js observable stream
   */
  onCadenceValue: function(callback) {
    return this.cadenceStream.onValue(callback);
  }
};

module.exports = AccelerometerManager;
