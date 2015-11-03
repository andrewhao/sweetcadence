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

    /**
     * Streams
     */

    this.cardBackToggleStream = Bacon.fromEvent(recordingCard, 'hide');
    this.mainRecordToggleStream = Bacon.fromBinder(function(sink) {
      mainCard.on('click', 'select', function(e) { sink(e) } );
    });

    /**
     * Behaviors/side-effects
     */

    // Side effect of clicking back is to stop listening to accelerometer events.
    this.cardBackToggleStream.onValue(function() {
      mainCard.subtitle("Recording stopped.");
      self.accelManager.stopRecording();
    });

    // Side effect of clicking select on the main card is to begin listening to the accelerometer.
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
