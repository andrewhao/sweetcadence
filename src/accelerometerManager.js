var Bacon = require('bacon');
var Accel = require('ui/accel');
var AccelerometerManager = {
  init: function() {
    Accel.config({
      rate: 10,
      samples: 25,
    });

    Accel.init();
  },

  startRecording: function(uiCard) {
    var dataStream = Bacon.fromEvent(Accel, 'data');

    dataStream.onValue(function(data) {
      console.log("-----");
      uiCard.subtitle(data.accel.x);
      data.accels.forEach(function(a) {
        console.log([a.x, a.y, a.z]);
      });
    });

    var historicalStream = dataStream.slidingWindow(2, 2)

    historicalStream.onValue(function(samples) {
      var first = samples[0];
      var second = samples[1];
      var deltaX = second.accel.x - first.accel.x
      var deltaY = second.accel.y - first.accel.y
      var deltaZ = second.accel.z - first.accel.z
      //console.log("x: " + deltaX + " y: " + deltaY + " z: " + deltaZ);
    });
  }
};

module.exports = AccelerometerManager;
