var Bacon = require('bacon');
var Accel = require('ui/accel');
var AccelerometerManager = {
  init: function() {
    Accel.config({
      rate: 10,
      samples: 25,
    });
    
    Accel.init();
    
    Accel.peek(function(e) {
      console.log('Current acceleration on axis are: X=' + e.accel.x + ' Y=' + e.accel.y + ' Z=' + e.accel.z);
    });
    
    Accel.on('tap', function(e) {
      console.log('Tap event on axis: ' + e.axis + ' and direction: ' + e.direction);
    });
    
    var dataStream = Bacon.fromEvent(Accel, 'data');
    var historicalStream = dataStream.slidingWindow(2, 2)
    
    
    historicalStream.onValue(function(samples) {
      var first = samples[0];
      var second = samples[1];
      var deltaX = second.accel.x - first.accel.x
      var deltaY = second.accel.y - first.accel.y
      var deltaZ = second.accel.z - first.accel.z
      console.log("x: " + deltaX + " y: " + deltaY + " z: " + deltaZ);
    });
  }
};

module.exports = AccelerometerManager;