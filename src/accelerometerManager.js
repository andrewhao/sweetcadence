// Wraps around the Accel library and provides higher-level event stream.
var Bacon = require('bacon');
var QuickCadence = require('quickCadence');
var inspect = require('objectInspect');

console.log(inspect(QuickCadence));
console.log(inspect(QuickCadence.pipe));

var AccelerometerManager = function(accel, config) {
  this.config = config || {rate: 10, samples: 25};
  this.accel = accel;
};

AccelerometerManager.prototype = {
  init: function() {
    this.accel.config(this.config);
    this.accel.init();
  },

  stopRecording: function() {
    this.accel.off();
  },

  startRecording: function(uiCard) {

    console.log(inspect(uiCard));

    var dataStream = Bacon.fromEvent(this.accel, 'data');

    console.log(inspect(dataStream));

    var cadenceStream = QuickCadence.pipe(dataStream);

    console.log(inspect(cadenceStream));

    cadenceStream.onValue(function(cadenceValue) {
      uiCard.subtitle(cadenceValue);
      console.log(cadenceValue);
    });
  }
};

module.exports = AccelerometerManager;
