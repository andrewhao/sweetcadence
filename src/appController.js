var UI = require('ui');
var Vector2 = require('vector2');

var AppController = function(accelManager) {
  this.accelManager = accelManager;
};

AppController.prototype = {
  init: function() {
    var self = this;

    var main = new UI.Card({
      title: 'Sweetcadence',
      icon: 'images/menu_icon.png',
      subtitle: 'Click select to start recording',
    });

    main.show();

    main.on('click', 'select', function(e) {
      var card = new UI.Card();
      card.title('Started Recording');
      self.accelManager.startRecording(card);
      card.show();
      card.on('hide', function() {
        main.subtitle("Recording stopped.");
        self.accelManager.stopRecording();
      });
    });
  }
};

module.exports = AppController;
