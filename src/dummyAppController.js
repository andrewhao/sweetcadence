var UI = require('ui'),
    Vector2 = require('vector2'),
    Bacon = require('./js/vendor/bacon.js'),
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
    cadenceStream.onValue(function(v) {
      splashCard.body(v);
    });
    
    splashCard.show()
  }
};

module.exports = DummyAppController;