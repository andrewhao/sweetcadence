// Wraps around the Accel library and provides higher-level event stream.
var Bacon = require('bacon');
var QuickCadence = require('quickcadence');

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
    var dataStream = Bacon.fromEvent(this.accel, 'data');
    var cadenceStream = QuickCadence.pipe(dataStream);

    cadenceStream.onValue(function(cadenceValue) {
      uiCard.subtitle(cadenceValue);
      console.log(cadenceValue);
    });
  }
};

module.exports = AccelerometerManager;
