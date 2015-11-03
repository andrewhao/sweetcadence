var UI = require('ui'),
    Vector2 = require('vector2'),
    Bacon = require('./js/vendor/bacon.js');

var AppController = function(accelManager) {
  this.accelManager = accelManager;
};

AppController.prototype = {
  init: function() {
    var self = this;

    var mainCard = new UI.Card({
      title: 'Sweetcadence',
      icon: 'images/menu_icon.png',
      subtitle: 'Click select to start recording',
    });
    var recordingCard = new UI.Card();
    mainCard.show();
    
   
    var cardBackToggleStream = Bacon.fromEvent(recordingCard, 'hide')
      .onValue(function() {
        mainCard.subtitle("Recording stopped.");
        self.accelManager.stopRecording();
      })
    
    var mainRecordToggleStream = Bacon.fromBinder(function(sink) {
      mainCard.on('click','select', function(e) { sink(e) } );
    }).onValue(function(e) {
        recordingCard.title('Started Recording');
        self.accelManager.startRecording(recordingCard);
        recordingCard.show();
      });
  }
};

module.exports = AppController;
