// Wraps around the Accel library and provides higher-level event stream.
var Bacon = require('./js/vendor/bacon');
var QuickCadence = require('./js/quickCadence');
var inspect = require('./js/vendor/objectInspect');

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
  stopRecording: function(callback) {
    this.accel.off();
    callback();
  },

  /**
   * Sets up and connects the accelerometer events to a stream.
   * @param Function callback
   */
  startRecording: function(callback) {
    var dataStream = Bacon.fromEvent(this.accel, 'data').map('.accel')
    dataStream.onValue(function(v) { console.log(inspect(v)) });
    this.cadenceStream = QuickCadence.pipe(dataStream);
    callback();
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
