var UI = require('ui'),
Vector2 = require('vector2'),
Bacon = require('./js/vendor/bacon.js'),
inspect = require('./js/vendor/objectInspect');

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

    this.cardBackToggleStream = Bacon.fromEvent(recordingCard, 'hide')
    .onValue(function() {
      mainCard.subtitle("Recording stopped.");
      self.accelManager.stopRecording();
    });

    this.mainRecordToggleStream = Bacon.fromBinder(function(sink) {
      mainCard.on('click', 'select', function(e) { sink(e) } );
    });
    
    // First start, initialize all the right things.
    this.mainRecordToggleStream.onValue(function(e) {
      recordingCard.title('Started Recording');
      recordingCard.show();
      self.accelManager.startRecording();
      self.accelManager.onCadenceValue(function(cadenceValue) {
        recordingCard.subtitle(cadenceValue);
      });
    })
  }
};

module.exports = AppController;
