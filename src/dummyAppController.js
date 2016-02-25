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
      body: "hello"
    });
    
    var cadenceStream = this.accelManager.getCadenceStream();
    cadenceStream.subscribe(function(v) {
      splashCard.body(v);
    });
    
    splashCard.show()
  }
};

module.exports = DummyAppController;
