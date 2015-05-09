// Wraps around the Accel library and provides higher-level event stream.
var Bacon = require('bacon');

var AccelerometerManager = function(config, accel) {
  this.config = config || {rate: 10, samples: 25};
  this.accel = accel;
}

AccelerometerManager.prototype = {
  init: function() {
    this.accel.config(this.config);
    this.accel.init();
  },

  stopRecording: function() {
    this.accel.off();
  }

  startRecording: function(uiCard) {
    var dataStream = Bacon.fromEvent(this.accel, 'data');
    /*
    dataStream.onValue(function(data) {
      uiCard.subtitle(data.accel.x);
      data.accels.forEach(function(a) {
        console.log([a.x, a.y, a.z]);
      });
    });
    */

    var historicalStream = dataStream.slidingWindow(2, 2)

    historicalStream.onValue(function(samples) {
      var first = samples[0];
      var second = samples[1];
      var deltaX = second.accel.x - first.accel.x
      var deltaY = second.accel.y - first.accel.y
      var deltaZ = second.accel.z - first.accel.z
      var deltaTime = second.accel.time - first.accel.time
      console.log([deltaX/deltaTime, deltaY/deltaTime, deltaZ/deltaTime]);
      //console.log("x: " + deltaX + " y: " + deltaY + " z: " + deltaZ);
    });
  }
};

module.exports = AccelerometerManager;
