var Accel = require ('ui/accel');
var AccelerometerManager = {
  observe: function() {
    console.log('observing');
  },
  init: function() {
    Accel.config({
      rate: 100,
      samples: 25,
    });
    
    Accel.init();
    
    Accel.peek(function(e) {
      console.log('Current acceleration on axis are: X=' + e.accel.x + ' Y=' + e.accel.y + ' Z=' + e.accel.z);
    });
    
    Accel.on('tap', function(e) {
      console.log('Tap event on axis: ' + e.axis + ' and direction: ' + e.direction);
    });
    
    Accel.on('data', function(e) {
      console.log('Just received ' + JSON.stringify(e) + ' from the accelerometer.');
    });
  }
};

module.exports = AccelerometerManager;