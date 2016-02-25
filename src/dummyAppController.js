var UI = require('ui'),
    Vector2 = require('vector2'),
    inspect = require('./js/vendor/objectInspect');

var DummyAppController = function(accelManager) {
  this.accelManager = accelManager;
};

DummyAppController.prototype = {
  init: function() {
    var self = this;
    var splashCard = new UI.Card({
      title: 'Initializing...'
    });
    
    var cadenceStream = this.accelManager.getCadenceStream();
    cadenceStream.subscribe(function(v) {
      splashCard.title(v.toFixed(2));
    });
    
    splashCard.show()
  }
};

module.exports = DummyAppController;
